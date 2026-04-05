-- ============================================================
-- schema.sql — Conduta.
-- Schema do Supabase para persistência de progresso.
-- Executar no SQL Editor do Supabase Dashboard.
-- ============================================================

CREATE TABLE user_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  key text NOT NULL,
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, key)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access own data"
ON user_progress FOR ALL
USING (auth.uid() = user_id);

-- Índice para busca rápida por user_id + key
CREATE INDEX idx_user_progress_user_key ON user_progress(user_id, key);

-- ============================================================
-- Tabela de leads (captura após 1º caso concluído)
-- ============================================================

CREATE TABLE leads (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  email         text        NOT NULL,
  faculdade     text,
  ano_formatura integer,
  created_at    timestamptz DEFAULT now()
);

-- Acesso público para insert (anon key), sem leitura pública
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer um pode enviar lead"
ON leads FOR INSERT
WITH CHECK (true);

-- Índice para evitar emails duplicados na análise
CREATE INDEX idx_leads_email ON leads(email);
