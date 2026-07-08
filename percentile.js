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

/* Envia o resultado do dia (fire-and-forget; falha silenciosa).
   Se logado, grava user_id → é o que pontua na liga. */
async function submitDailyResult(dayKey, caseId, composite, seals) {
  if (!_supabase) return false;
  var clientId = getClientId();
  if (!clientId) return false;
  try {
    var row = { day_key: dayKey, case_id: caseId, client_id: clientId, composite: composite, seals: seals };
    if (typeof currentUser !== 'undefined' && currentUser) row.user_id = currentUser.id;
    var res = await _supabase.from('daily_results').insert(row);
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

/* helper: chama RPC e devolve { data } | { error } de forma uniforme */
async function rpc(fn, args) {
  if (!_supabase) return { error: 'offline' };
  if (typeof currentUser === 'undefined' || !currentUser) {
    // funções de perfil/liga exigem conta; a UI já bloqueia, mas garantimos
  }
  try {
    var res = await _supabase.rpc(fn, args || {});
    if (res.error) return { error: res.error.message || 'erro' };
    return { data: res.data };
  } catch (e) {
    return { error: 'sem conexão' };
  }
}

/* ══ PERFIL (conta) ════════════════════════════════════════
   username: escolhido 1x, imutável, único — aparece nas ligas.
   display_name: editável. Ambos exigem estar logado. */

async function usernameAvailable(username) {
  var r = await rpc('username_available', { p_username: username });
  return r.data === true;
}

async function createProfile(username, displayName) {
  var r = await rpc('create_profile', { p_username: username, p_display_name: displayName });
  if (r.error) return { error: r.error };
  if (r.data && r.data.error) return { error: r.data.error };
  return r.data; // { ok, username, display_name }
}

async function updateDisplayNameRemote(name) {
  var r = await rpc('update_display_name', { p_display_name: name });
  if (r.error || (r.data && r.data.error)) return false;
  return !!(r.data && r.data.ok);
}

async function getMyProfile() {
  var r = await rpc('get_my_profile');
  return r.data || null; // { username, display_name } | null
}

/* ══ LIGAS (conta, com admin) ══════════════════════════════ */

/* semana corrente em BRT: [segunda, domingo] como day_keys */
function currentWeekRange() {
  var now = brtNow();
  var dow = (now.getUTCDay() + 6) % 7; // 0 = segunda
  var mon = new Date(now.getTime() - dow * 86400000);
  var sun = new Date(mon.getTime() + 6 * 86400000);
  return { from: mon.toISOString().slice(0, 10), to: sun.toISOString().slice(0, 10) };
}

async function createLeague(name) {
  var r = await rpc('create_league', { p_name: name });
  if (r.error) return { error: r.error };
  if (r.data && r.data.error) return { error: r.data.error };
  return r.data; // { ok, id, code, name }
}

async function joinLeague(code) {
  var r = await rpc('join_league', { p_code: String(code || '').trim().toUpperCase() });
  if (r.error) return { error: r.error };
  if (r.data && r.data.error) return { error: r.data.error };
  return r.data; // { ok, id, name }
}

async function leagueInfo(code) {
  var r = await rpc('league_info', { p_code: String(code || '').trim().toUpperCase() });
  return r.data || null; // { id, name, members } | null
}

async function myLeagues() {
  var r = await rpc('my_leagues');
  return r.error ? null : (r.data || []);
}

async function leagueLeaderboard(leagueId) {
  var range = currentWeekRange();
  var r = await rpc('league_leaderboard', { p_league: leagueId, p_from: range.from, p_to: range.to });
  return r.error ? null : (r.data || []);
}

async function leagueMembers(leagueId) {
  var r = await rpc('league_members_list', { p_league: leagueId });
  return r.error ? null : (r.data || []);
}

async function leaveLeague(leagueId) {
  var r = await rpc('leave_league', { p_league: leagueId });
  return !r.error && !(r.data && r.data.error);
}

async function removeMember(leagueId, memberId) {
  var r = await rpc('remove_member', { p_league: leagueId, p_target: memberId });
  if (r.error) return { error: r.error };
  if (r.data && r.data.error) return { error: r.data.error };
  return { ok: true };
}

async function renameLeague(leagueId, name) {
  var r = await rpc('rename_league', { p_league: leagueId, p_name: name });
  if (r.error) return { error: r.error };
  if (r.data && r.data.error) return { error: r.data.error };
  return r.data; // { ok, name }
}

async function deleteLeague(leagueId) {
  var r = await rpc('delete_league', { p_league: leagueId });
  return !r.error && !(r.data && r.data.error);
}

window.getClientId = getClientId;
window.submitDailyResult = submitDailyResult;
window.fetchPercentile = fetchPercentile;
window.usernameAvailable = usernameAvailable;
window.createProfile = createProfile;
window.updateDisplayNameRemote = updateDisplayNameRemote;
window.getMyProfile = getMyProfile;
window.createLeague = createLeague;
window.joinLeague = joinLeague;
window.leagueInfo = leagueInfo;
window.myLeagues = myLeagues;
window.leagueLeaderboard = leagueLeaderboard;
window.leagueMembers = leagueMembers;
window.leaveLeague = leaveLeague;
window.removeMember = removeMember;
window.renameLeague = renameLeague;
window.deleteLeague = deleteLeague;
