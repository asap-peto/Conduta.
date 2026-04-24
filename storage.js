/* ============================================================
   storage.js — Conduta.
   Camada de abstração de persistência.
   Decide onde salvar/ler: Supabase (se logado) ou localStorage.
   Carregado ANTES de auth.js, ui.js, game.js e badges.js.
   ============================================================ */

/* ── ESTADO DE AUTENTICAÇÃO ────────────────────────────────── */
var currentUser = null;   // null = deslogado → usa localStorage
var _supabase   = null;   // referência ao cliente Supabase (setada em auth.js)
var CONDUTA_VISITED_KEY = 'conduta_visited';

function userCacheKey(userId, key) {
  if (!userId) return key;
  return `conduta_cache:${userId}:${key}`;
}

function hasVisitedConduta() {
  try {
    return localStorage.getItem(CONDUTA_VISITED_KEY) === '1';
  } catch (e) {
    return false;
  }
}

function rememberCondutaVisit() {
  try {
    localStorage.setItem(CONDUTA_VISITED_KEY, '1');
  } catch (e) {}
}

function normalizePlayerProgress(key, data) {
  if (key !== 'conduta_player_v2') return data;

  const normalized = data ? Object.assign({}, data) : null;
  if (normalized && normalized.onboarded) {
    rememberCondutaVisit();
    return normalized;
  }

  if (hasVisitedConduta()) {
    return Object.assign({}, normalized || {}, { onboarded: true });
  }

  return normalized;
}

/* ── SALVAR PROGRESSO ──────────────────────────────────────── */
async function saveProgress(key, data) {
  const normalized = normalizePlayerProgress(key, data);

  // Mantém cache local separado para convidado vs usuário autenticado
  try {
    localStorage.setItem(currentUser ? userCacheKey(currentUser.id, key) : key, JSON.stringify(normalized));
  } catch (e) {}

  // Se logado, também persiste no Supabase
  if (currentUser && _supabase) {
    try {
      await _supabase
        .from('user_progress')
        .upsert({
          user_id:    currentUser.id,
          key:        key,
          data:       normalized,
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
        return normalizePlayerProgress(key, res.data.data);
      }
    } catch (e) {
      // Falha silenciosa — cai para cache local do usuário
    }

    try {
      var cachedRaw = localStorage.getItem(userCacheKey(currentUser.id, key));
      return normalizePlayerProgress(key, cachedRaw ? JSON.parse(cachedRaw) : null);
    } catch (e) {
      return null;
    }
  }

  // Fallback convidado: localStorage simples
  try {
    var raw = localStorage.getItem(key);
    return normalizePlayerProgress(key, raw ? JSON.parse(raw) : null);
  } catch (e) {
    return null;
  }
}

/* ── CARREGAR PROGRESSO SÍNCRONO (localStorage only) ───────── */
// Usado internamente para leitura rápida quando não logado
function loadProgressSync(key) {
  try {
    var raw = localStorage.getItem(key);
    return normalizePlayerProgress(key, raw ? JSON.parse(raw) : null);
  } catch (e) {
    return null;
  }
}

window.hasVisitedConduta = hasVisitedConduta;
window.rememberCondutaVisit = rememberCondutaVisit;
