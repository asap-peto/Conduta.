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

function withStorageTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    let done = false;
    const timer = setTimeout(() => {
      if (done) return;
      done = true;
      reject(new Error('Tempo esgotado ao acessar o Supabase.'));
    }, ms);

    Promise.resolve(promise)
      .then(value => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve(value);
      })
      .catch(err => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        reject(err);
      });
  });
}

function userCacheKey(userId, key) {
  if (!userId) return key;
  return `conduta_cache:${userId}:${key}`;
}

async function ensureCurrentUser() {
  if (currentUser || !_supabase || !_supabase.auth || typeof _supabase.auth.getSession !== 'function') {
    return currentUser;
  }

  try {
    const { data } = await withStorageTimeout(_supabase.auth.getSession(), 1200);
    if (data && data.session && data.session.user) {
      currentUser = data.session.user;
    }
  } catch (e) {}

  return currentUser;
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

function stampProgressForSave(key, data) {
  if (key !== 'conduta_player_v2' || !data) return data;
  return Object.assign({}, data, { _savedAt: new Date().toISOString() });
}

function progressTimestamp(data, fallback) {
  const candidates = [
    data && data._savedAt,
    data && data.updatedAt,
    data && data.updated_at,
    fallback
  ];
  for (let i = 0; i < candidates.length; i++) {
    const t = candidates[i] ? new Date(candidates[i]).getTime() : NaN;
    if (!Number.isNaN(t)) return t;
  }
  return 0;
}

function latestCompletionDay(data) {
  const list = data && Array.isArray(data.levelsCompleted) ? data.levelsCompleted : [];
  let latest = null;
  list.forEach(c => {
    if (!c || !c.completedAt) return;
    const d = new Date(c.completedAt);
    if (Number.isNaN(d.getTime())) return;
    const day = [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, '0'),
      String(d.getDate()).padStart(2, '0')
    ].join('-');
    if (!latest || day > latest) latest = day;
  });
  return latest;
}

function completedLevelNumber(completion) {
  if (!completion) return 0;
  if (typeof getLevel === 'function') {
    const lv = getLevel(completion.id);
    if (lv && Number.isFinite(lv.number)) return lv.number;
  }
  return Number.isFinite(Number(completion.id)) ? Number(completion.id) : 0;
}

function mergeLevelCompletions(a, b) {
  const byId = new Map();

  function put(record) {
    if (!record || record.id === undefined || record.id === null) return;
    const key = String(record.id);
    const existing = byId.get(key);
    if (!existing) {
      byId.set(key, Object.assign({}, record));
      return;
    }

    existing.score = Math.max(existing.score || 0, record.score || 0);
    existing.total = Math.max(existing.total || 0, record.total || 0);
    existing.perfect = !!(existing.perfect || record.perfect);
    existing.attempts = Math.max(existing.attempts || 0, record.attempts || 0);
    existing.xp = Math.max(existing.xp || 0, record.xp || 0);
    if (!existing.completedAt || (record.completedAt && record.completedAt < existing.completedAt)) {
      existing.completedAt = record.completedAt;
    }
  }

  (Array.isArray(a) ? a : []).forEach(put);
  (Array.isArray(b) ? b : []).forEach(put);

  return Array.from(byId.values()).sort((x, y) => completedLevelNumber(x) - completedLevelNumber(y));
}

function mergePlayerProgress(remoteData, localData, remoteUpdatedAt) {
  if (!remoteData) return localData || null;
  if (!localData) return remoteData;

  const remoteTs = progressTimestamp(remoteData, remoteUpdatedAt);
  const localTs = progressTimestamp(localData);
  const newest = localTs > remoteTs ? localData : remoteData;
  const oldest = newest === localData ? remoteData : localData;
  const merged = Object.assign({}, oldest, newest);

  merged.levelsCompleted = mergeLevelCompletions(remoteData.levelsCompleted, localData.levelsCompleted);

  const highestCompleted = merged.levelsCompleted.reduce((max, c) => {
    return Math.max(max, completedLevelNumber(c));
  }, 0);
  const derivedCurrentLevel = highestCompleted > 0 ? highestCompleted + 1 : 1;
  merged.currentLevel = Math.max(
    Number(remoteData.currentLevel) || 1,
    Number(localData.currentLevel) || 1,
    derivedCurrentLevel
  );

  merged.totalXp = Math.max(Number(remoteData.totalXp) || 0, Number(localData.totalXp) || 0);
  merged.gems = Math.max(Number(remoteData.gems) || 0, Number(localData.gems) || 0);
  merged.bestStreak = Math.max(Number(remoteData.bestStreak) || 0, Number(localData.bestStreak) || 0);
  merged.streakBreaks = Math.max(Number(remoteData.streakBreaks) || 0, Number(localData.streakBreaks) || 0);
  merged.questClaims = Object.assign({}, remoteData.questClaims || {}, localData.questClaims || {});

  const remoteDay = remoteData.lastPlayedDay || latestCompletionDay(remoteData);
  const localDay = localData.lastPlayedDay || latestCompletionDay(localData);
  if (remoteDay && localDay) {
    if (remoteDay === localDay) {
      merged.lastPlayedDay = remoteDay;
      merged.streak = Math.max(Number(remoteData.streak) || 0, Number(localData.streak) || 0);
    } else if (localDay > remoteDay) {
      merged.lastPlayedDay = localDay;
      merged.streak = Number(localData.streak) || Number(merged.streak) || 0;
    } else {
      merged.lastPlayedDay = remoteDay;
      merged.streak = Number(remoteData.streak) || Number(merged.streak) || 0;
    }
  } else {
    merged.lastPlayedDay = remoteDay || localDay || merged.lastPlayedDay || null;
    merged.streak = Math.max(Number(remoteData.streak) || 0, Number(localData.streak) || 0);
  }

  if (remoteData.leagueWeekStart === localData.leagueWeekStart) {
    merged.leagueXpWeek = Math.max(Number(remoteData.leagueXpWeek) || 0, Number(localData.leagueXpWeek) || 0);
  }

  return merged;
}

function shouldHealRemotePlayer(remoteData, localData, mergedData, remoteUpdatedAt) {
  if (!remoteData || !localData || !mergedData) return false;

  const remoteTs = progressTimestamp(remoteData, remoteUpdatedAt);
  const localTs = progressTimestamp(localData);
  if (localTs && remoteTs && localTs > remoteTs) return true;

  const remoteCompleted = Array.isArray(remoteData.levelsCompleted) ? remoteData.levelsCompleted.length : 0;
  const mergedCompleted = Array.isArray(mergedData.levelsCompleted) ? mergedData.levelsCompleted.length : 0;

  return mergedCompleted > remoteCompleted ||
    (Number(mergedData.currentLevel) || 1) > (Number(remoteData.currentLevel) || 1) ||
    (Number(mergedData.totalXp) || 0) > (Number(remoteData.totalXp) || 0) ||
    (Number(mergedData.bestStreak) || 0) > (Number(remoteData.bestStreak) || 0) ||
    (
      mergedData.lastPlayedDay &&
      (!remoteData.lastPlayedDay || mergedData.lastPlayedDay > remoteData.lastPlayedDay)
    );
}

function parseLocalProgress(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function loadUserCachedProgress(key) {
  try {
    return currentUser ? parseLocalProgress(localStorage.getItem(userCacheKey(currentUser.id, key))) : null;
  } catch (e) {
    return null;
  }
}

function loadGuestProgress(key) {
  try {
    return parseLocalProgress(localStorage.getItem(key));
  } catch (e) {
    return null;
  }
}

function localProgressForSignedInUser(key) {
  const userCached = loadUserCachedProgress(key);
  if (key !== 'conduta_player_v2') return userCached;

  // Se o usuário completou algo enquanto a sessão ainda hidratava, esse
  // progresso pode ter caído na chave de convidado. Mesclamos uma vez e
  // depois curamos o Supabase.
  const guest = loadGuestProgress(key);
  return mergePlayerProgress(userCached, guest);
}

/* ── SALVAR PROGRESSO ──────────────────────────────────────── */
async function saveProgress(key, data) {
  await ensureCurrentUser();
  const normalized = stampProgressForSave(key, normalizePlayerProgress(key, data));

  // Usuário logado: Supabase é a fonte da verdade por usuário.
  // O cache local por usuário só é atualizado após sucesso remoto, ou como
  // fallback pendente se a rede/RLS falhar.
  if (currentUser && _supabase) {
    try {
      const { error } = await withStorageTimeout(_supabase
        .from('user_progress')
        .upsert({
          user_id:    currentUser.id,
          key:        key,
          data:       normalized,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id,key' }), 4000);
      if (error) throw error;
      try {
        localStorage.setItem(userCacheKey(currentUser.id, key), JSON.stringify(normalized));
        if (key === 'conduta_player_v2') localStorage.removeItem(key);
      } catch (e) {}
      return { ok: true, remote: true, fallback: false };
    } catch (e) {
      // Não vira fonte da verdade, mas evita perder a jogada localmente
      // enquanto o app tenta reconciliar no próximo carregamento.
      try {
        localStorage.setItem(userCacheKey(currentUser.id, key), JSON.stringify(normalized));
      } catch (_) {}
      console.warn('[saveProgress] falha ao sincronizar com Supabase:', key, e?.message || e);
      return { ok: false, remote: false, fallback: true };
    }
  }

  // Convidado: localStorage é o armazenamento esperado.
  try {
    localStorage.setItem(key, JSON.stringify(normalized));
    return { ok: true, remote: false, fallback: false };
  } catch (e) {
    console.warn('[saveProgress] falha ao salvar localmente:', key, e?.message || e);
    return { ok: false, remote: false, fallback: false };
  }
}

/* ── CARREGAR PROGRESSO ────────────────────────────────────── */
async function loadProgress(key) {
  await ensureCurrentUser();

  // Se logado, tenta ler do Supabase primeiro
  if (currentUser && _supabase) {
    try {
      var res = await withStorageTimeout(_supabase
        .from('user_progress')
        .select('data,updated_at')
        .eq('user_id', currentUser.id)
        .eq('key', key)
        .single(), 2500);

      const local = normalizePlayerProgress(key, localProgressForSignedInUser(key));

      if (res.data && res.data.data) {
        const remote = normalizePlayerProgress(key, res.data.data);
        const merged = key === 'conduta_player_v2'
          ? mergePlayerProgress(remote, local, res.data.updated_at)
          : remote;

        try {
          localStorage.setItem(userCacheKey(currentUser.id, key), JSON.stringify(merged));
        } catch (e) {}

        if (key === 'conduta_player_v2' && shouldHealRemotePlayer(remote, local, merged, res.data.updated_at)) {
          saveProgress(key, merged);
        }

        return normalizePlayerProgress(key, merged);
      }
    } catch (e) {
      // Falha silenciosa — cai para cache local do usuário
    }

    try {
      const fallback = normalizePlayerProgress(key, localProgressForSignedInUser(key));
      if (fallback) saveProgress(key, fallback);
      return fallback;
    } catch (e) {
      return null;
    }
  }

  // Fallback convidado: localStorage simples
  try {
    return normalizePlayerProgress(key, loadGuestProgress(key));
  } catch (e) {
    return null;
  }
}

/* ── CARREGAR PROGRESSO SÍNCRONO (localStorage only) ───────── */
// Usado internamente para leitura rápida quando não logado
function loadProgressSync(key) {
  try {
    return normalizePlayerProgress(key, loadGuestProgress(key));
  } catch (e) {
    return null;
  }
}

window.hasVisitedConduta = hasVisitedConduta;
window.rememberCondutaVisit = rememberCondutaVisit;
