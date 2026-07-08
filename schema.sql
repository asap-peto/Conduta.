-- ============================================================
-- schema.sql — Conduta.
-- Schema completo do Supabase. IDEMPOTENTE: pode colar e rodar
-- o arquivo INTEIRO no SQL Editor quantas vezes quiser — blocos
-- já aplicados não quebram e versões antigas são substituídas.
--
-- Guia de setup passo a passo (incluindo login Google/magic
-- link no painel): ver SUPABASE.md.
--
-- Blocos:
--   1. user_progress  — progresso do jogador logado (auth)
--   2. daily_results  — percentil do caso do dia (anônimo)
--   3. profiles       — perfil do jogador (nome editável,
--                       identidade pública p/ social futuro)
--   4. liga           — grupos de amigos por código de convite
--
-- Modelo de identidade (importante):
--   client_id  = uuid gerado no dispositivo. É o "segredo" do
--                jogador anônimo — NUNCA sai do servidor em
--                consultas de terceiros.
--   public_id  = uuid público do perfil, seguro de expor —
--                é ele que viabiliza "adicionar amigos" depois.
--   user_id    = conta Supabase (opcional), vincula o perfil
--                quando a pessoa faz login.
-- ============================================================


-- ════════════════════════════════════════════════════════════
-- 1. PROGRESSO DO JOGADOR LOGADO
--    Espelho das chaves conduta_* do localStorage após login.
--    Só o próprio usuário lê/escreve as próprias linhas.
-- ════════════════════════════════════════════════════════════

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
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_progress_user_key
  ON user_progress(user_id, key);


-- ════════════════════════════════════════════════════════════
-- 2. PERCENTIL DO DIA
--    Resultados anônimos do caso do dia, identificados pelo
--    client_id do dispositivo (não requer login).
--    - anon INSERE, e só com day_key = hoje (BRT);
--    - NINGUÉM lê linhas cruas — leitura só via RPC agregada;
--    - UNIQUE(client_id, day_key) = 1 resultado/dia/dispositivo.
-- ════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS daily_results (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  day_key text NOT NULL,
  case_id text NOT NULL,
  client_id uuid NOT NULL,
  composite smallint NOT NULL CHECK (composite BETWEEN 0 AND 100),
  seals jsonb,
  created_at timestamptz DEFAULT now(),
  UNIQUE (client_id, day_key)
);

ALTER TABLE daily_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "insert today only" ON daily_results;
CREATE POLICY "insert today only"
ON daily_results FOR INSERT
TO anon, authenticated
WITH CHECK (day_key = to_char(now() AT TIME ZONE 'America/Sao_Paulo', 'YYYY-MM-DD'));

CREATE OR REPLACE FUNCTION daily_percentile(p_day text, p_score int)
RETURNS json
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT json_build_object(
    'total', count(*),
    'below', count(*) FILTER (WHERE composite < p_score)
  ) FROM daily_results WHERE day_key = p_day;
$$;

GRANT EXECUTE ON FUNCTION daily_percentile TO anon, authenticated;

CREATE INDEX IF NOT EXISTS idx_daily_results_day ON daily_results(day_key);


-- ════════════════════════════════════════════════════════════
-- 3. PERFIL DO JOGADOR
--    Nome editável salvo na plataforma + identidade pública.
--    Funciona SEM login (via client_id); com login, vincula
--    o user_id e o perfil acompanha a conta.
--    - Sem SELECT/INSERT/UPDATE diretos: tudo via RPC validada;
--    - handle (@apelido) opcional e único — é a base para
--      busca de amigos no futuro, sem expor o client_id.
-- ════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS profiles (
  client_id uuid PRIMARY KEY,
  public_id uuid UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  display_name text NOT NULL CHECK (char_length(display_name) BETWEEN 1 AND 24),
  handle text UNIQUE CHECK (handle ~ '^[a-z0-9_]{3,20}$'),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- (sem policies = sem acesso direto; só via RPCs SECURITY DEFINER)

CREATE INDEX IF NOT EXISTS idx_profiles_user ON profiles(user_id);

-- cria/edita o próprio perfil (nome e, opcionalmente, handle).
-- Vincula auth.uid() quando logado. Erros voltam como json.
CREATE OR REPLACE FUNCTION upsert_profile(p_client uuid, p_name text, p_handle text DEFAULT NULL)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_name   text := left(btrim(coalesce(p_name, '')), 24);
  v_handle text := nullif(lower(btrim(coalesce(p_handle, ''))), '');
  v_row    profiles;
BEGIN
  IF char_length(v_name) < 1 THEN
    RETURN json_build_object('error', 'nome inválido');
  END IF;
  IF v_handle IS NOT NULL AND v_handle !~ '^[a-z0-9_]{3,20}$' THEN
    RETURN json_build_object('error', 'handle inválido — 3 a 20 caracteres: a–z, 0–9 e _');
  END IF;

  INSERT INTO profiles (client_id, user_id, display_name, handle)
  VALUES (p_client, auth.uid(), v_name, v_handle)
  ON CONFLICT (client_id) DO UPDATE
    SET display_name = excluded.display_name,
        handle       = coalesce(excluded.handle, profiles.handle),
        user_id      = coalesce(profiles.user_id, excluded.user_id),
        updated_at   = now()
  RETURNING * INTO v_row;

  RETURN json_build_object(
    'ok', true,
    'display_name', v_row.display_name,
    'handle', v_row.handle,
    'public_id', v_row.public_id
  );
EXCEPTION WHEN unique_violation THEN
  RETURN json_build_object('error', 'esse handle já está em uso');
END;
$$;

GRANT EXECUTE ON FUNCTION upsert_profile TO anon, authenticated;

-- lê o próprio perfil: pelo client_id do dispositivo ou, se
-- logado, pelo user_id (recupera o nome em um aparelho novo).
CREATE OR REPLACE FUNCTION get_profile(p_client uuid)
RETURNS json
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT json_build_object(
    'display_name', display_name,
    'handle', handle,
    'public_id', public_id
  )
  FROM profiles
  WHERE client_id = p_client
     OR (auth.uid() IS NOT NULL AND user_id = auth.uid())
  ORDER BY (client_id = p_client) DESC, updated_at DESC
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION get_profile TO anon, authenticated;

-- busca pública por handle (base do "adicionar amigo" futuro).
-- Expõe SÓ nome, handle e public_id — nunca o client_id.
CREATE OR REPLACE FUNCTION find_profile_by_handle(p_handle text)
RETURNS json
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT json_build_object(
    'display_name', display_name,
    'handle', handle,
    'public_id', public_id
  )
  FROM profiles
  WHERE handle = lower(btrim(p_handle));
$$;

GRANT EXECUTE ON FUNCTION find_profile_by_handle TO anon, authenticated;


-- ════════════════════════════════════════════════════════════
-- 4. LIGA COM AMIGOS
--    Grupos fechados por código de convite de 6 caracteres.
--    O CÓDIGO é o segredo do convite:
--    - anon pode CRIAR grupo e ENTRAR como membro;
--    - ninguém lê grupos/membros direto (sem SELECT): validação
--      via league_group_info, ranking via league_leaderboard;
--    - o ranking usa o nome do PERFIL quando existir (editou o
--      nome no perfil → atualiza no ranking) e NUNCA devolve
--      client_id de ninguém — o "é você" vem calculado;
--    - sair do grupo via RPC league_leave (só remove a si mesmo);
--    - sem UPDATE/DELETE diretos pra anon.
-- ════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS league_groups (
  code text PRIMARY KEY CHECK (code ~ '^[A-Z0-9]{6}$'),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 40),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS league_members (
  group_code text REFERENCES league_groups(code) ON DELETE CASCADE,
  client_id uuid NOT NULL,
  display_name text NOT NULL CHECK (char_length(display_name) BETWEEN 1 AND 24),
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (group_code, client_id)
);

-- AUTO-CURA: se as tabelas foram criadas por uma versão anterior sem
-- alguma coluna, CREATE TABLE IF NOT EXISTS não as adiciona. Estes
-- ALTERs garantem as colunas (não-destrutivo; seguro de re-rodar).
ALTER TABLE league_groups  ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE league_groups  ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
ALTER TABLE league_members ADD COLUMN IF NOT EXISTS group_code   text;
ALTER TABLE league_members ADD COLUMN IF NOT EXISTS client_id    uuid;
ALTER TABLE league_members ADD COLUMN IF NOT EXISTS display_name text;
ALTER TABLE league_members ADD COLUMN IF NOT EXISTS joined_at    timestamptz DEFAULT now();
-- garante a unicidade (grupo, membro) mesmo se o PK antigo diferir
CREATE UNIQUE INDEX IF NOT EXISTS uq_league_members_group_client
  ON league_members (group_code, client_id);

ALTER TABLE league_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE league_members ENABLE ROW LEVEL SECURITY;

-- limpa policies de versões anteriores deste arquivo (mais abertas)
DROP POLICY IF EXISTS "read groups by code" ON league_groups;
DROP POLICY IF EXISTS "update own membership" ON league_members;
DROP POLICY IF EXISTS "create groups" ON league_groups;
DROP POLICY IF EXISTS "join groups" ON league_members;

CREATE POLICY "create groups" ON league_groups FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE POLICY "join groups" ON league_members FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- valida um código de convite e devolve o nome do grupo
-- (sem expor a lista de grupos — precisa saber o código)
CREATE OR REPLACE FUNCTION league_group_info(p_code text)
RETURNS json
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT json_build_object(
    'code', g.code,
    'name', g.name,
    'members', (SELECT count(*) FROM league_members m WHERE m.group_code = g.code)
  )
  FROM league_groups g WHERE g.code = upper(p_code);
$$;

GRANT EXECUTE ON FUNCTION league_group_info TO anon, authenticated;

-- remove a assinatura antiga (sem p_client), se existir
DROP FUNCTION IF EXISTS league_leaderboard(text, text, text);

-- ranking semanal agregado; nome vem do perfil (se existir),
-- is_you calculado no servidor — client_id nunca sai daqui.
CREATE OR REPLACE FUNCTION league_leaderboard(p_code text, p_from text, p_to text, p_client uuid)
RETURNS json
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json) FROM (
    SELECT COALESCE(p.display_name, m.display_name) AS display_name,
           p.handle,
           (m.client_id = p_client) AS is_you,
           COALESCE(SUM(r.composite), 0) AS pts,
           COUNT(r.id) AS days
    FROM league_members m
    LEFT JOIN profiles p
      ON p.client_id = m.client_id
    LEFT JOIN daily_results r
      ON r.client_id = m.client_id
     AND r.day_key BETWEEN p_from AND p_to
    WHERE m.group_code = upper(p_code)
    GROUP BY m.client_id, p.display_name, p.handle, m.display_name
    ORDER BY pts DESC, days DESC, display_name
  ) t;
$$;

GRANT EXECUTE ON FUNCTION league_leaderboard TO anon, authenticated;

-- sair do grupo: cada um só consegue remover a própria linha
-- (exige conhecer o próprio client_id — o segredo do device)
CREATE OR REPLACE FUNCTION league_leave(p_code text, p_client uuid)
RETURNS json
LANGUAGE sql
SECURITY DEFINER
VOLATILE
SET search_path = public
AS $$
  WITH del AS (
    DELETE FROM league_members
    WHERE group_code = upper(p_code) AND client_id = p_client
    RETURNING 1
  )
  SELECT json_build_object('ok', count(*) > 0) FROM del;
$$;

GRANT EXECUTE ON FUNCTION league_leave TO anon, authenticated;

-- lista os grupos de que o jogador participa (suporta a UI
-- de múltiplas ligas no futuro)
CREATE OR REPLACE FUNCTION league_my_groups(p_client uuid)
RETURNS json
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json) FROM (
    SELECT g.code, g.name,
           (SELECT count(*) FROM league_members x WHERE x.group_code = g.code) AS members
    FROM league_members m
    JOIN league_groups g ON g.code = m.group_code
    WHERE m.client_id = p_client
    ORDER BY m.joined_at DESC
  ) t;
$$;

GRANT EXECUTE ON FUNCTION league_my_groups TO anon, authenticated;
