-- ============================================================
-- schema.sql — Conduta.
-- Schema completo do Supabase. IDEMPOTENTE: pode colar e rodar
-- o arquivo INTEIRO no SQL Editor quantas vezes quiser — blocos
-- já aplicados não quebram.
--
-- Guia de setup passo a passo (incluindo login Google/magic
-- link no painel): ver SUPABASE.md.
--
-- Blocos:
--   1. user_progress  — progresso do jogador logado (auth)
--   2. daily_results  — percentil do caso do dia (anônimo)
--   3. liga           — grupos de amigos por código de convite
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
--    Resultados anônimos do caso do dia, identificados por um
--    client_id gerado no dispositivo (não requer login).
--    Modelo de acesso:
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
-- 3. LIGA COM AMIGOS
--    Grupos fechados por código de convite de 6 caracteres.
--    Membros identificados pelo client_id do dispositivo.
--    Modelo de acesso (o CÓDIGO é o segredo do convite):
--    - anon pode CRIAR grupo e ENTRAR como membro;
--    - ninguém lê grupos nem membros direto (sem SELECT):
--      validação de convite via RPC league_group_info, ranking
--      via RPC league_leaderboard — ambas agregadas;
--    - o ranking NUNCA devolve client_id de ninguém: o "é você"
--      é calculado no servidor comparando com o p_client enviado;
--    - sem UPDATE/DELETE pra anon: entrar de novo no mesmo grupo
--      é um INSERT que conflita (23505) e o app trata como
--      "já sou membro". Ninguém renomeia ninguém.
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
  SELECT json_build_object('code', code, 'name', name)
  FROM league_groups WHERE code = upper(p_code);
$$;

GRANT EXECUTE ON FUNCTION league_group_info TO anon, authenticated;

-- remove a assinatura antiga (sem p_client), se existir
DROP FUNCTION IF EXISTS league_leaderboard(text, text, text);

-- ranking semanal agregado; is_you calculado no servidor
CREATE OR REPLACE FUNCTION league_leaderboard(p_code text, p_from text, p_to text, p_client uuid)
RETURNS json
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json) FROM (
    SELECT m.display_name,
           (m.client_id = p_client) AS is_you,
           COALESCE(SUM(r.composite), 0) AS pts,
           COUNT(r.id) AS days
    FROM league_members m
    LEFT JOIN daily_results r
      ON r.client_id = m.client_id
     AND r.day_key BETWEEN p_from AND p_to
    WHERE m.group_code = upper(p_code)
    GROUP BY m.client_id, m.display_name
    ORDER BY pts DESC, days DESC, m.display_name
  ) t;
$$;

GRANT EXECUTE ON FUNCTION league_leaderboard TO anon, authenticated;
