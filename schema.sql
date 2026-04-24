-- ============================================================
-- schema.sql — Conduta.
-- Schema do Supabase para persistência de progresso.
-- Executar no SQL Editor do Supabase Dashboard.
-- ============================================================

CREATE TABLE IF NOT EXISTS user_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  key text NOT NULL,
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, key)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can only access own data" ON user_progress;
CREATE POLICY "Users can only access own data"
ON user_progress FOR ALL
USING (auth.uid() = user_id);

-- Índice para busca rápida por user_id + key
CREATE INDEX IF NOT EXISTS idx_user_progress_user_key ON user_progress(user_id, key);

-- ============================================================
-- Ligas privadas
-- MVP seguro o suficiente para app beta:
-- - senha armazenada como hash
-- - entrada validada via RPC
-- - free: até 2 ligas ativas/pendentes
-- - pro: ilimitado
-- - compatível com projetos Supabase em que pgcrypto fica em extensions
-- ============================================================

CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

CREATE TABLE IF NOT EXISTS leagues (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (char_length(trim(name)) BETWEEN 3 AND 80),
  join_mode text NOT NULL DEFAULT 'approval' CHECK (join_mode IN ('auto', 'approval')),
  access_code_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS league_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  league_id uuid NOT NULL REFERENCES leagues(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (league_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_leagues_owner_id ON leagues(owner_id);
CREATE INDEX IF NOT EXISTS idx_league_members_league_id ON league_members(league_id);
CREATE INDEX IF NOT EXISTS idx_league_members_user_id ON league_members(user_id);
CREATE INDEX IF NOT EXISTS idx_league_members_league_status ON league_members(league_id, status);

ALTER TABLE leagues ENABLE ROW LEVEL SECURITY;
ALTER TABLE league_members ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION is_league_admin(p_league_id uuid, p_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM league_members lm
    WHERE lm.league_id = p_league_id
      AND lm.user_id = p_user_id
      AND lm.status = 'active'
      AND lm.role IN ('owner', 'admin')
  );
$$;

DROP POLICY IF EXISTS "League owners can view own leagues" ON leagues;
CREATE POLICY "League owners can view own leagues"
ON leagues FOR SELECT
USING (owner_id = auth.uid());

DROP POLICY IF EXISTS "League owners can update own leagues" ON leagues;
CREATE POLICY "League owners can update own leagues"
ON leagues FOR UPDATE
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

DROP POLICY IF EXISTS "Users can view own memberships" ON league_members;
CREATE POLICY "Users can view own memberships"
ON league_members FOR SELECT
USING (user_id = auth.uid() OR is_league_admin(league_id));

CREATE OR REPLACE FUNCTION current_user_is_pro()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  SELECT COALESCE(
    (
      SELECT (up.data ->> 'isPro')::boolean
      FROM user_progress up
      WHERE up.user_id = auth.uid()
        AND up.key = 'conduta_player_v2'
      LIMIT 1
    ),
    false
  );
$$;

CREATE OR REPLACE FUNCTION create_league(
  p_name text,
  p_access_code text,
  p_join_mode text DEFAULT 'approval'
)
RETURNS TABLE (
  league_id uuid,
  league_name text,
  membership_status text,
  membership_role text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_league_id uuid;
  v_join_mode text := COALESCE(p_join_mode, 'approval');
  v_limit int;
  v_active_or_pending_count int;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'É preciso estar autenticado para criar uma liga.';
  END IF;

  IF char_length(trim(COALESCE(p_name, ''))) < 3 THEN
    RAISE EXCEPTION 'Nome da liga precisa ter ao menos 3 caracteres.';
  END IF;

  IF char_length(COALESCE(p_access_code, '')) < 4 THEN
    RAISE EXCEPTION 'A senha da liga precisa ter ao menos 4 caracteres.';
  END IF;

  IF v_join_mode NOT IN ('auto', 'approval') THEN
    RAISE EXCEPTION 'Modo de entrada inválido.';
  END IF;

  v_limit := CASE WHEN current_user_is_pro() THEN NULL ELSE 2 END;

  IF v_limit IS NOT NULL THEN
    SELECT COUNT(*)
      INTO v_active_or_pending_count
    FROM league_members lm
    WHERE lm.user_id = v_user
      AND lm.status IN ('active', 'pending');

    IF v_active_or_pending_count >= v_limit THEN
      RAISE EXCEPTION 'Usuários Free podem participar de até 2 ligas.';
    END IF;
  END IF;

  INSERT INTO leagues (owner_id, name, join_mode, access_code_hash)
  VALUES (
    v_user,
    trim(p_name),
    v_join_mode,
    extensions.crypt(p_access_code, extensions.gen_salt('bf'))
  )
  RETURNING id INTO v_league_id;

  INSERT INTO league_members (league_id, user_id, role, status)
  VALUES (v_league_id, v_user, 'owner', 'active');

  RETURN QUERY
  SELECT v_league_id, trim(p_name), 'active'::text, 'owner'::text;
END;
$$;

CREATE OR REPLACE FUNCTION request_join_league(
  p_league_id uuid,
  p_access_code text
)
RETURNS TABLE (
  league_id uuid,
  league_name text,
  membership_status text,
  requires_approval boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_league leagues%ROWTYPE;
  v_existing league_members%ROWTYPE;
  v_status text;
  v_limit int;
  v_active_or_pending_count int;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'É preciso estar autenticado para entrar em uma liga.';
  END IF;

  SELECT * INTO v_league
  FROM leagues
  WHERE id = p_league_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Liga não encontrada.';
  END IF;

  IF extensions.crypt(COALESCE(p_access_code, ''), v_league.access_code_hash) <> v_league.access_code_hash THEN
    RAISE EXCEPTION 'Senha da liga incorreta.';
  END IF;

  SELECT * INTO v_existing
  FROM league_members
  WHERE league_id = p_league_id
    AND user_id = v_user;

  IF FOUND AND v_existing.status IN ('active', 'pending') THEN
    RETURN QUERY
    SELECT v_league.id, v_league.name, v_existing.status, (v_league.join_mode = 'approval');
    RETURN;
  END IF;

  v_limit := CASE WHEN current_user_is_pro() THEN NULL ELSE 2 END;

  IF v_limit IS NOT NULL THEN
    SELECT COUNT(*)
      INTO v_active_or_pending_count
    FROM league_members lm
    WHERE lm.user_id = v_user
      AND lm.status IN ('active', 'pending')
      AND (v_existing.id IS NULL OR lm.league_id <> p_league_id);

    IF v_active_or_pending_count >= v_limit THEN
      RAISE EXCEPTION 'Usuários Free podem participar de até 2 ligas.';
    END IF;
  END IF;

  v_status := CASE WHEN v_league.join_mode = 'auto' THEN 'active' ELSE 'pending' END;

  INSERT INTO league_members (league_id, user_id, role, status)
  VALUES (p_league_id, v_user, 'member', v_status)
  ON CONFLICT (league_id, user_id)
  DO UPDATE SET
    status = EXCLUDED.status,
    role = 'member',
    updated_at = now();

  RETURN QUERY
  SELECT v_league.id, v_league.name, v_status, (v_league.join_mode = 'approval');
END;
$$;

CREATE OR REPLACE FUNCTION review_league_member(
  p_membership_id uuid,
  p_action text
)
RETURNS TABLE (
  membership_id uuid,
  membership_status text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_membership league_members%ROWTYPE;
  v_new_status text;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'É preciso estar autenticado.';
  END IF;

  SELECT * INTO v_membership
  FROM league_members
  WHERE id = p_membership_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Pedido de entrada não encontrado.';
  END IF;

  IF NOT is_league_admin(v_membership.league_id, v_user) THEN
    RAISE EXCEPTION 'Apenas admins da liga podem revisar pedidos.';
  END IF;

  IF v_membership.status <> 'pending' THEN
    RAISE EXCEPTION 'Esse pedido já foi processado.';
  END IF;

  v_new_status := CASE
    WHEN lower(COALESCE(p_action, '')) IN ('approve', 'approved', 'accept') THEN 'active'
    WHEN lower(COALESCE(p_action, '')) IN ('reject', 'rejected', 'deny') THEN 'rejected'
    ELSE NULL
  END;

  IF v_new_status IS NULL THEN
    RAISE EXCEPTION 'Ação inválida.';
  END IF;

  UPDATE league_members
  SET status = v_new_status,
      updated_at = now()
  WHERE id = p_membership_id;

  RETURN QUERY
  SELECT p_membership_id, v_new_status;
END;
$$;

CREATE OR REPLACE FUNCTION leave_league(
  p_league_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_membership league_members%ROWTYPE;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'É preciso estar autenticado.';
  END IF;

  SELECT * INTO v_membership
  FROM league_members
  WHERE league_id = p_league_id
    AND user_id = v_user;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Você não participa dessa liga.';
  END IF;

  IF v_membership.role = 'owner' THEN
    RAISE EXCEPTION 'O criador da liga não pode sair sem transferir a administração.';
  END IF;

  DELETE FROM league_members
  WHERE id = v_membership.id;
END;
$$;

CREATE OR REPLACE FUNCTION update_league_settings(
  p_league_id uuid,
  p_name text,
  p_access_code text DEFAULT NULL,
  p_join_mode text DEFAULT NULL
)
RETURNS TABLE (
  league_id uuid,
  league_name text,
  join_mode text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_league leagues%ROWTYPE;
  v_new_name text;
  v_new_mode text;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'É preciso estar autenticado.';
  END IF;

  SELECT * INTO v_league
  FROM leagues
  WHERE id = p_league_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Liga não encontrada.';
  END IF;

  IF NOT is_league_admin(p_league_id, v_user) THEN
    RAISE EXCEPTION 'Apenas admins da liga podem editar a liga.';
  END IF;

  v_new_name := trim(COALESCE(NULLIF(p_name, ''), v_league.name));

  IF char_length(v_new_name) < 3 THEN
    RAISE EXCEPTION 'Nome da liga precisa ter ao menos 3 caracteres.';
  END IF;

  IF p_access_code IS NOT NULL AND p_access_code <> '' AND char_length(p_access_code) < 4 THEN
    RAISE EXCEPTION 'A nova senha da liga precisa ter ao menos 4 caracteres.';
  END IF;

  v_new_mode := COALESCE(NULLIF(p_join_mode, ''), v_league.join_mode);
  IF v_new_mode NOT IN ('auto', 'approval') THEN
    RAISE EXCEPTION 'Modo de entrada inválido.';
  END IF;

  UPDATE leagues
  SET name = v_new_name,
      join_mode = v_new_mode,
      access_code_hash = CASE
        WHEN p_access_code IS NOT NULL AND p_access_code <> '' THEN extensions.crypt(p_access_code, extensions.gen_salt('bf'))
        ELSE access_code_hash
      END
  WHERE id = p_league_id;

  RETURN QUERY
  SELECT v_league.id, v_new_name, v_new_mode;
END;
$$;

CREATE OR REPLACE FUNCTION delete_league(
  p_league_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_league leagues%ROWTYPE;
BEGIN
  IF v_user IS NULL THEN
    RAISE EXCEPTION 'É preciso estar autenticado.';
  END IF;

  SELECT * INTO v_league
  FROM leagues
  WHERE id = p_league_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Liga não encontrada.';
  END IF;

  IF v_league.owner_id <> v_user THEN
    RAISE EXCEPTION 'Apenas o criador da liga pode excluí-la.';
  END IF;

  DELETE FROM leagues WHERE id = p_league_id;
END;
$$;

CREATE OR REPLACE FUNCTION get_public_leagues()
RETURNS TABLE (
  league_id uuid,
  league_name text,
  join_mode text,
  owner_name text,
  active_members bigint,
  pending_members bigint,
  created_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  SELECT
    l.id AS league_id,
    l.name AS league_name,
    l.join_mode,
    COALESCE(
      (
        SELECT up.data ->> 'displayName'
        FROM user_progress up
        WHERE up.user_id = l.owner_id
          AND up.key = 'conduta_player_v2'
        LIMIT 1
      ),
      'Admin'
    ) AS owner_name,
    COUNT(*) FILTER (WHERE lm.status = 'active') AS active_members,
    COUNT(*) FILTER (WHERE lm.status = 'pending') AS pending_members,
    l.created_at
  FROM leagues l
  LEFT JOIN league_members lm ON lm.league_id = l.id
  GROUP BY l.id
  ORDER BY l.created_at DESC;
$$;

CREATE OR REPLACE FUNCTION get_my_leagues()
RETURNS TABLE (
  membership_id uuid,
  league_id uuid,
  league_name text,
  join_mode text,
  membership_role text,
  membership_status text,
  active_members bigint,
  pending_members bigint,
  is_owner boolean,
  created_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  WITH mine AS (
    SELECT lm.id, lm.league_id, lm.role, lm.status, lm.created_at
    FROM league_members lm
    WHERE lm.user_id = auth.uid()
  ),
  counts AS (
    SELECT
      lm.league_id,
      COUNT(*) FILTER (WHERE lm.status = 'active')  AS active_members,
      COUNT(*) FILTER (WHERE lm.status = 'pending') AS pending_members
    FROM league_members lm
    WHERE lm.league_id IN (SELECT league_id FROM mine)
    GROUP BY lm.league_id
  )
  SELECT
    mine.id         AS membership_id,
    l.id            AS league_id,
    l.name          AS league_name,
    l.join_mode,
    mine.role       AS membership_role,
    mine.status     AS membership_status,
    COALESCE(counts.active_members,  0) AS active_members,
    COALESCE(counts.pending_members, 0) AS pending_members,
    (l.owner_id = auth.uid()) AS is_owner,
    mine.created_at
  FROM mine
  JOIN leagues l ON l.id = mine.league_id
  LEFT JOIN counts ON counts.league_id = mine.league_id
  ORDER BY
    CASE mine.status WHEN 'active' THEN 0 WHEN 'pending' THEN 1 ELSE 2 END,
    mine.created_at DESC;
$$;

CREATE OR REPLACE FUNCTION get_league_standings(
  p_league_id uuid
)
RETURNS TABLE (
  membership_id uuid,
  user_id uuid,
  display_name text,
  avatar text,
  weekly_xp int,
  total_xp int,
  streak int,
  role text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  SELECT
    lm.id AS membership_id,
    lm.user_id,
    COALESCE(up.data ->> 'displayName', 'Jogador') AS display_name,
    COALESCE(up.data ->> 'avatar', '🩺') AS avatar,
    COALESCE((up.data ->> 'leagueXpWeek')::int, 0) AS weekly_xp,
    COALESCE((up.data ->> 'totalXp')::int, 0) AS total_xp,
    COALESCE((up.data ->> 'streak')::int, 0) AS streak,
    lm.role
  FROM league_members lm
  LEFT JOIN user_progress up
    ON up.user_id = lm.user_id
   AND up.key = 'conduta_player_v2'
  WHERE lm.league_id = p_league_id
    AND lm.status = 'active'
    AND EXISTS (
      SELECT 1
      FROM league_members self
      WHERE self.league_id = p_league_id
        AND self.user_id = auth.uid()
        AND self.status = 'active'
    )
  ORDER BY weekly_xp DESC, total_xp DESC, display_name ASC;
$$;

CREATE OR REPLACE FUNCTION get_league_pending_requests(
  p_league_id uuid
)
RETURNS TABLE (
  membership_id uuid,
  user_id uuid,
  display_name text,
  avatar text,
  requested_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  SELECT
    lm.id AS membership_id,
    lm.user_id,
    COALESCE(up.data ->> 'displayName', 'Jogador') AS display_name,
    COALESCE(up.data ->> 'avatar', '🩺') AS avatar,
    lm.created_at AS requested_at
  FROM league_members lm
  LEFT JOIN user_progress up
    ON up.user_id = lm.user_id
   AND up.key = 'conduta_player_v2'
  WHERE lm.league_id = p_league_id
    AND lm.status = 'pending'
    AND is_league_admin(p_league_id, auth.uid())
  ORDER BY lm.created_at ASC;
$$;
