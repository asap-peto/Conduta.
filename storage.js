/* ============================================================
   storage.js — Conduta.
   Camada de abstração de persistência.
   Decide onde salvar/ler: Supabase (se logado) ou localStorage.
   Carregado ANTES de auth.js, ui.js, game.js e badges.js.
   ============================================================ */

/* ── ESTADO DE AUTENTICAÇÃO ────────────────────────────────── */
var currentUser = null;   // null = deslogado → usa localStorage
var _supabase   = null;   // referência ao cliente Supabase (setada em auth.js)

/* ── SALVAR PROGRESSO ──────────────────────────────────────── */
async function saveProgress(key, data) {
  // Sempre salva no localStorage como fallback
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {}

  // Se logado, também persiste no Supabase
  if (currentUser && _supabase) {
    try {
      await _supabase
        .from('user_progress')
        .upsert({
          user_id:    currentUser.id,
          key:        key,
          data:       data,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id,key' });
    } catch (e) {
      // Falha silenciosa — localStorage já tem os dados
    }
  }
}

/* ── CARREGAR PROGRESSO ────────────────────────────────────── */
async function loadProgress(key) {
  // Se logado, tenta ler do Supabase primeiro
  if (currentUser && _supabase) {
    try {
      var res = await _supabase
        .from('user_progress')
        .select('data')
        .eq('user_id', currentUser.id)
        .eq('key', key)
        .single();

      if (res.data && res.data.data) {
        return res.data.data;
      }
    } catch (e) {
      // Falha silenciosa — cai para localStorage
    }
  }

  // Fallback: localStorage
  try {
    var raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/* ── CARREGAR PROGRESSO SÍNCRONO (localStorage only) ───────── */
// Usado internamente para leitura rápida quando não logado
function loadProgressSync(key) {
  try {
    var raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
