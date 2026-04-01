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
