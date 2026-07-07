/* ============================================================
   percentile.js — Conduta.
   Percentil REAL do dia via Supabase (insert anônimo + RPC).
   Regras:
   - client_id fica FORA do prefixo conduta_ de propósito: a
     migração pós-login apaga as chaves conduta_* do localStorage,
     e o client_id precisa permanecer no dispositivo.
   - Degradação honesta: pouca gente → "Você e mais N jogaram";
     rede falhou → retorna null e a UI omite a linha. Nunca
     inventa número.
   ============================================================ */

var CLIENT_ID_KEY = 'cnd_client_id';
var PERCENTILE_MIN_N = 25; // abaixo disso, percentil é ruído

function getClientId() {
  try {
    var id = localStorage.getItem(CLIENT_ID_KEY);
    if (!id) {
      id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
        : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
          });
      localStorage.setItem(CLIENT_ID_KEY, id);
    }
    return id;
  } catch (e) {
    return null;
  }
}

/* Envia o resultado do dia (fire-and-forget; falha silenciosa). */
async function submitDailyResult(dayKey, caseId, composite, seals) {
  if (!_supabase) return false;
  var clientId = getClientId();
  if (!clientId) return false;
  try {
    var res = await _supabase.from('daily_results').insert({
      day_key: dayKey,
      case_id: caseId,
      client_id: clientId,
      composite: composite,
      seals: seals
    });
    // conflito UNIQUE(client_id, day_key) = já enviou hoje: ok
    return !res.error || (res.error.code === '23505');
  } catch (e) {
    return false;
  }
}

/* Busca o agregado do dia.
   → { percentile: number } | { few: n } | null (indisponível) */
async function fetchPercentile(dayKey, composite) {
  if (!_supabase) return null;
  try {
    var res = await _supabase.rpc('daily_percentile', {
      p_day: dayKey,
      p_score: composite
    });
    if (res.error || !res.data) return null;
    var total = res.data.total || 0;
    var below = res.data.below || 0;
    if (total < PERCENTILE_MIN_N) return { few: total };
    // "Top X%": fração de jogadores com score >= o seu
    var top = Math.max(1, Math.round(100 * (1 - below / total)));
    return { percentile: top };
  } catch (e) {
    return null;
  }
}

/* ══ PERFIL NA PLATAFORMA ══════════════════════════════════
   Nome editável salvo no Supabase (RPC upsert_profile).
   Funciona sem login; com login o perfil é vinculado à conta.
   Falha silenciosa: sem rede/SQL, o nome continua local. */

async function syncProfileName(name) {
  if (!_supabase) return false;
  var clientId = getClientId();
  if (!clientId || !name) return false;
  try {
    var res = await _supabase.rpc('upsert_profile', { p_client: clientId, p_name: name });
    return !!(res.data && res.data.ok);
  } catch (e) {
    return false;
  }
}

/* recupera o nome salvo na plataforma (ex.: aparelho novo logado) */
async function fetchProfile() {
  if (!_supabase) return null;
  var clientId = getClientId();
  if (!clientId) return null;
  try {
    var res = await _supabase.rpc('get_profile', { p_client: clientId });
    return res.data || null;
  } catch (e) {
    return null;
  }
}

/* ══ LIGA COM AMIGOS ═══════════════════════════════════════
   Grupo fechado por código de convite. Membros identificados
   pelo client_id (sem login). Ranking semanal = soma do
   composite dos dias da semana ISO corrente (seg–dom), via
   RPC agregada — ninguém lê linhas cruas de daily_results.
   Chaves cnd_* ficam fora da migração de login de propósito. */

var GROUP_CODE_KEY = 'cnd_group_code';
var GROUP_NAME_KEY = 'cnd_group_name';
var DISPLAY_NAME_KEY = 'cnd_display_name';

function getGroupCode() { try { return localStorage.getItem(GROUP_CODE_KEY); } catch (e) { return null; } }
function getGroupName() { try { return localStorage.getItem(GROUP_NAME_KEY); } catch (e) { return null; } }
function getDisplayName() { try { return localStorage.getItem(DISPLAY_NAME_KEY); } catch (e) { return null; } }

function randomGroupCode() {
  var chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // sem 0/O/1/I/L
  var code = '';
  for (var i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

/* semana ISO corrente em BRT: [segunda, domingo] como day_keys */
function currentWeekRange() {
  var now = brtNow();
  var dow = (now.getUTCDay() + 6) % 7; // 0 = segunda
  var mon = new Date(now.getTime() - dow * 86400000);
  var sun = new Date(mon.getTime() + 6 * 86400000);
  return { from: mon.toISOString().slice(0, 10), to: sun.toISOString().slice(0, 10) };
}

async function createLeagueGroup(groupName, displayName) {
  if (!_supabase) return { error: 'offline' };
  for (var attempt = 0; attempt < 3; attempt++) {
    var code = randomGroupCode();
    var res = await _supabase.from('league_groups').insert({ code: code, name: groupName });
    if (!res.error) {
      var joined = await joinLeagueGroup(code, displayName);
      return joined.error ? joined : { code: code, name: groupName };
    }
    if (res.error.code !== '23505') return { error: res.error.message }; // 23505 = código repetido, tenta outro
  }
  return { error: 'não foi possível gerar um código' };
}

async function joinLeagueGroup(code, displayName) {
  if (!_supabase) return { error: 'offline' };
  code = String(code || '').trim().toUpperCase();

  // valida o convite via RPC (a tabela de grupos não tem SELECT aberto)
  var g = await _supabase.rpc('league_group_info', { p_code: code });
  if (g.error || !g.data) return { error: 'grupo não encontrado' };

  // sem UPDATE pra anon: conflito (23505) = já sou membro, segue o jogo
  var res = await _supabase.from('league_members').insert({
    group_code: code,
    client_id: getClientId(),
    display_name: displayName
  });
  if (res.error && res.error.code !== '23505') return { error: res.error.message };

  try {
    localStorage.setItem(GROUP_CODE_KEY, code);
    localStorage.setItem(GROUP_NAME_KEY, g.data.name);
    localStorage.setItem(DISPLAY_NAME_KEY, displayName);
  } catch (e) {}
  syncProfileName(displayName); // nome também vira perfil na plataforma
  return { code: code, name: g.data.name };
}

function leaveLeagueGroup() {
  var code = getGroupCode();
  // remove a linha no servidor (fire-and-forget) e limpa o local
  if (_supabase && code) {
    try {
      _supabase.rpc('league_leave', { p_code: code, p_client: getClientId() });
    } catch (e) {}
  }
  try {
    localStorage.removeItem(GROUP_CODE_KEY);
    localStorage.removeItem(GROUP_NAME_KEY);
  } catch (e) {}
}

/* → [{ display_name, pts, days, is_you }] | null (indisponível)
   O is_you vem calculado do servidor — client_id de outros
   membros nunca chega ao navegador. */
async function fetchLeagueLeaderboard() {
  if (!_supabase) return null;
  var code = getGroupCode();
  if (!code) return null;
  var range = currentWeekRange();
  try {
    var res = await _supabase.rpc('league_leaderboard', {
      p_code: code, p_from: range.from, p_to: range.to, p_client: getClientId()
    });
    if (res.error || !res.data) return null;
    return res.data;
  } catch (e) {
    return null;
  }
}

window.getClientId = getClientId;
window.submitDailyResult = submitDailyResult;
window.fetchPercentile = fetchPercentile;
window.syncProfileName = syncProfileName;
window.fetchProfile = fetchProfile;
window.getGroupCode = getGroupCode;
window.getGroupName = getGroupName;
window.getDisplayName = getDisplayName;
window.createLeagueGroup = createLeagueGroup;
window.joinLeagueGroup = joinLeagueGroup;
window.leaveLeagueGroup = leaveLeagueGroup;
window.fetchLeagueLeaderboard = fetchLeagueLeaderboard;
