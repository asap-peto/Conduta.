/* ============================================================
   gamification.js — Conduta.
   Motor de gamificação: XP, hearts, gems, streaks, leagues.
   ============================================================ */

// ── CONSTANTES DE ECONOMIA ────────────────────────────────
const XP = {
  baseLevelComplete: 10,
  perfectScoreBonus: 5,
  firstOfDay: 2,
  comboMaxBonus: 3
};

const HEARTS = {
  max: 5,
  refillMinutes: 45 // 1 coração a cada 45 min
};

const GEMS = {
  levelComplete: 5,
  perfectScore: 10,
  dailyQuest: 25,
  streakFreezeCost: 200,
  streakRepairCost: 400,
  heartRefillCost: 350
};

const LEAGUES = [
  { id: 'bronze',    name: 'Bronze',    emoji: '🥉', minXp: 0 },
  { id: 'prata',     name: 'Prata',     emoji: '🥈', minXp: 200 },
  { id: 'ouro',      name: 'Ouro',      emoji: '🥇', minXp: 500 },
  { id: 'platina',   name: 'Platina',   emoji: '💎', minXp: 1000 },
  { id: 'diamante',  name: 'Diamante',  emoji: '💠', minXp: 2000 },
  { id: 'rubi',      name: 'Rubi',      emoji: '❤️‍🔥', minXp: 3500 },
  { id: 'esmeralda', name: 'Esmeralda', emoji: '💚', minXp: 5500 },
  { id: 'safira',    name: 'Safira',    emoji: '💙', minXp: 8000 },
  { id: 'obsidiana', name: 'Obsidiana', emoji: '🖤', minXp: 12000 },
  { id: 'lenda',     name: 'Lenda',     emoji: '👑', minXp: 20000 }
];

// ── ESTADO DO JOGADOR ─────────────────────────────────────
// Defaults — merged com o que vier do storage
function defaultPlayer() {
  return {
    // Progresso
    currentLevel: 1,
    totalXp: 0,
    levelsCompleted: [],   // [{id, score, perfect, attempts, xp, completedAt}]

    // Economia
    gems: 0,
    hearts: HEARTS.max,
    heartsRefillAt: null,  // ISO timestamp quando próximo coração volta

    // Streak
    streak: 0,
    bestStreak: 0,
    streakFreeze: 2,
    lastPlayedDay: null,   // YYYY-MM-DD
    streakBreaks: 0,

    // Liga
    league: 'bronze',
    leagueXpWeek: 0,
    leagueWeekStart: null,

    // Assinatura
    isPro: false,

    // Onboarding
    onboarded: false,
    displayName: null,
    avatar: '🩺',

    // Badges (migrado do badges.js antigo)
    badges: {}
  };
}

// Player atual (carregado e salvo via storage.js)
var player = defaultPlayer();

// ── HELPERS DE DATA ───────────────────────────────────────
function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function daysBetween(a, b) {
  if (!a || !b) return 0;
  const ms = new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00');
  return Math.round(ms / 86400000);
}

// Início da semana (segunda-feira) para a liga
function weekStart() {
  const d = new Date();
  const day = d.getDay(); // 0=dom, 1=seg...
  const diff = (day === 0 ? -6 : 1 - day);
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function syncLeagueWeek() {
  const currentWeek = weekStart();
  if (player.leagueWeekStart !== currentWeek) {
    player.leagueWeekStart = currentWeek;
    player.leagueXpWeek = 0;
    return true;
  }
  return false;
}

// ── LEVEL / XP ────────────────────────────────────────────
function getLevelStepCount(level) {
  if (!level) return 0;
  if (Array.isArray(level.questions)) return level.questions.length;
  if (Array.isArray(level.images)) return level.images.length;
  if (Array.isArray(level.patients)) return level.patients.length;
  if (Array.isArray(level.statements)) return level.statements.length;
  if (Array.isArray(level.steps)) return level.steps.length;
  return 0;
}

function comboBonusForRun({ comboMax, total }) {
  const safeTotal = Math.max(1, total);
  if (comboMax <= 2 || safeTotal < 3) return 0;

  const ratio = comboMax / safeTotal;
  if (ratio >= 1) return XP.comboMaxBonus;
  if (ratio >= 0.75) return 2;
  if (ratio >= 0.5) return 1;
  return 0;
}

function awardLevelXp({ correct, total, perfectRun, firstOfDay, comboMax, difficultyMult, isReplay }) {
  if (isReplay) return 0;

  const safeTotal = Math.max(1, total);
  let total_xp = Math.round(XP.baseLevelComplete * (correct / safeTotal));
  if (perfectRun) total_xp += XP.perfectScoreBonus;
  if (firstOfDay) total_xp += XP.firstOfDay;
  total_xp += comboBonusForRun({ comboMax, total: safeTotal });
  total_xp = Math.round(total_xp * (difficultyMult || 1));
  return total_xp;
}

function previewLevelXp(level, options) {
  const opts = options || {};
  const total = getLevelStepCount(level);
  const diffMult = DIFFICULTY[level?.difficulty]?.xpMult || 1;

  return awardLevelXp({
    correct: total,
    total,
    perfectRun: total > 0,
    firstOfDay: !!opts.firstOfDay,
    comboMax: total,
    difficultyMult: diffMult,
    isReplay: !!opts.isReplay
  });
}

function addXp(amount) {
  syncLeagueWeek();
  player.totalXp += amount;
  player.leagueXpWeek += amount;
  updateLeague();
}

function updateLeague() {
  // Promoção baseada em XP total (simplificado para MVP)
  let newLeague = 'bronze';
  for (let i = LEAGUES.length - 1; i >= 0; i--) {
    if (player.totalXp >= LEAGUES[i].minXp) {
      newLeague = LEAGUES[i].id;
      break;
    }
  }
  player.league = newLeague;
}

function getLeagueInfo() {
  syncLeagueWeek();
  const idx = LEAGUES.findIndex(l => l.id === player.league);
  const current = LEAGUES[idx];
  const next = LEAGUES[idx + 1] || null;
  return {
    current,
    next,
    progress: next ? (player.totalXp - current.minXp) / (next.minXp - current.minXp) : 1
  };
}

// ── STREAK ────────────────────────────────────────────────
// Chama-se quando o jogador completa qualquer nível (com vitória ou não)
function tickStreak() {
  const today = todayKey();
  if (player.lastPlayedDay === today) {
    // Já jogou hoje — streak não muda
    return { changed: false, streak: player.streak };
  }

  if (!player.lastPlayedDay) {
    // Primeiro dia
    player.streak = 1;
    player.bestStreak = Math.max(player.bestStreak, 1);
    player.lastPlayedDay = today;
    return { changed: true, streak: 1, started: true };
  }

  const gap = daysBetween(player.lastPlayedDay, today);
  if (gap === 1) {
    // Dia seguinte — streak +1
    player.streak += 1;
    player.bestStreak = Math.max(player.bestStreak, player.streak);
    player.lastPlayedDay = today;
    return { changed: true, streak: player.streak };
  }

  if (gap === 2 && player.streakFreeze > 0) {
    // Perdeu 1 dia mas tem freeze — usa um
    player.streakFreeze -= 1;
    player.streak += 1;
    player.bestStreak = Math.max(player.bestStreak, player.streak);
    player.lastPlayedDay = today;
    return { changed: true, streak: player.streak, freezeUsed: true };
  }

  // Perdeu o streak
  const previousStreak = player.streak;
  player.streakBreaks += 1;
  player.streak = 1;
  player.lastPlayedDay = today;
  return { changed: true, streak: 1, broken: true, previousStreak };
}

// ── HEARTS ────────────────────────────────────────────────
function loseHeart() {
  if (player.isPro) return player.hearts;
  // Se está cheio, começa o cronômetro
  if (player.hearts === HEARTS.max) {
    const refillAt = new Date(Date.now() + HEARTS.refillMinutes * 60 * 1000);
    player.heartsRefillAt = refillAt.toISOString();
  }
  player.hearts = Math.max(0, player.hearts - 1);
  return player.hearts;
}

function refreshHearts() {
  if (player.isPro) {
    player.hearts = HEARTS.max;
    return player.hearts;
  }
  if (player.hearts >= HEARTS.max) return player.hearts;
  if (!player.heartsRefillAt) return player.hearts;

  const now = Date.now();
  const refillTime = new Date(player.heartsRefillAt).getTime();
  if (now >= refillTime) {
    // Calcula quantos corações voltaram
    const elapsed = now - refillTime;
    const extraHearts = Math.floor(elapsed / (HEARTS.refillMinutes * 60 * 1000)) + 1;
    player.hearts = Math.min(HEARTS.max, player.hearts + extraHearts);
    if (player.hearts < HEARTS.max) {
      const nextRefill = new Date(refillTime + extraHearts * HEARTS.refillMinutes * 60 * 1000);
      player.heartsRefillAt = nextRefill.toISOString();
    } else {
      player.heartsRefillAt = null;
    }
  }
  return player.hearts;
}

function timeUntilNextHeart() {
  if (player.isPro || player.hearts >= HEARTS.max || !player.heartsRefillAt) return 0;
  return Math.max(0, new Date(player.heartsRefillAt).getTime() - Date.now());
}

function fillHeartsWithGems() {
  if (player.gems < GEMS.heartRefillCost) return false;
  player.gems -= GEMS.heartRefillCost;
  player.hearts = HEARTS.max;
  player.heartsRefillAt = null;
  return true;
}

// ── GEMS ──────────────────────────────────────────────────
function addGems(amount) {
  player.gems = Math.max(0, player.gems + amount);
}

// ── ACESSO AO NÍVEL ATUAL ─────────────────────────────────
// Regra: free = 1 nível novo por dia; pro = ilimitado
function canPlayLevel(levelId) {
  const level = getLevel(levelId);
  if (!level) return { ok: false, reason: 'not-found' };
  if (level.number > player.currentLevel) {
    return { ok: false, reason: 'locked' };
  }

  const already = player.levelsCompleted.find(c => c.id === levelId);
  if (already) {
    return { ok: true, replay: true };
  }

  // Se for o nível atual e já jogou outro hoje, precisa de pro
  if (!player.isPro) {
    const playedToday = player.levelsCompleted.some(
      c => c.completedAt && c.completedAt.slice(0, 10) === todayKey()
    );
    if (playedToday && level.number === player.currentLevel) {
      return { ok: false, reason: 'daily-limit' };
    }
  }

  return { ok: true };
}

function todaysLevel() {
  // O "nível de hoje" é o currentLevel (próximo a completar).
  return getLevelByNumber(player.currentLevel);
}

function markLevelComplete(levelId, payload) {
  const existing = player.levelsCompleted.find(c => c.id === levelId);
  const completedAt = new Date().toISOString();
  let record;

  if (existing) {
    existing.attempts = (existing.attempts || 0) + 1;
    existing.score = Math.max(existing.score || 0, payload.score || 0);
    existing.perfect = !!(existing.perfect || payload.perfect);
    existing.xp = Math.max(existing.xp || 0, payload.xp || 0);
    if (!existing.completedAt) existing.completedAt = completedAt;
    record = existing;
  } else {
    record = {
      id: levelId,
      score: payload.score,
      perfect: payload.perfect,
      attempts: 1,
      xp: payload.xp,
      completedAt
    };
    player.levelsCompleted.push(record);
  }
  // Avança currentLevel se ainda não passou desse nível
  const level = getLevel(levelId);
  if (level && level.number === player.currentLevel) {
    player.currentLevel = Math.min(TOTAL_LEVELS + 1, player.currentLevel + 1);
  }
  return record;
}

// ── LIGA SEMANAL (mock de concorrentes para MVP) ──────────
function mockLeagueParticipants() {
  syncLeagueWeek();
  // 29 bots + você = 30 vagas
  const baseNames = [
    'Ana','Bruno','Carla','Diego','Eduarda','Fábio','Gabi','Henrique',
    'Isabela','João','Karina','Lucas','Mariana','Natan','Olívia','Pedro',
    'Quésia','Rafael','Sofia','Tiago','Ursula','Vinícius','Wanda','Xavier',
    'Yara','Zeca','Bia','Caio','Duda'
  ];
  // Gera XP distribuído em torno do jogador
  const you = player.leagueXpWeek;
  const rng = (seed) => {
    let s = seed;
    return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  };
  const seeded = rng(42 + (player.totalXp || 1));
  const participants = baseNames.map(name => {
    const r = seeded();
    const variance = Math.floor((r - 0.5) * 180);
    return { name, xp: Math.max(0, you + variance), you: false };
  });
  participants.push({ name: player.displayName || 'Você', xp: you, you: true });
  participants.sort((a, b) => b.xp - a.xp);
  return participants;
}

// ── HUB DE LIGAS PRIVADAS ────────────────────────────────
function emptyLeagueHubState() {
  return {
    catalog: [],
    memberships: [],
    standings: [],
    requests: [],
    selectedLeagueId: null,
    selectedJoinLeagueId: null,
    loading: false,
    ready: false,
    error: ''
  };
}

var leagueHubState = emptyLeagueHubState();

function syncLeagueHubWindowState() {
  window.leagueHubState = leagueHubState;
  return leagueHubState;
}

function getLeagueMembershipLimit() {
  return player.isPro ? Infinity : 2;
}

function getJoinedLeagueCount() {
  return (leagueHubState.memberships || []).filter(m => ['active', 'pending'].includes(m.membership_status)).length;
}

function findLeagueMembership(leagueId) {
  return (leagueHubState.memberships || []).find(m => m.league_id === leagueId) || null;
}

function isLeagueAdminMembership(leagueId) {
  const membership = findLeagueMembership(leagueId);
  return !!membership &&
    membership.membership_status === 'active' &&
    ['owner', 'admin'].includes(membership.membership_role);
}

function setSelectedLeagueHubLeague(leagueId) {
  leagueHubState.selectedLeagueId = leagueId;
  syncLeagueHubWindowState();
}

function setSelectedJoinLeague(leagueId) {
  leagueHubState.selectedJoinLeagueId = leagueId;
  syncLeagueHubWindowState();
}

async function leagueRpc(fn, params) {
  if (!currentUser) throw new Error('Entre na sua conta para usar ligas.');
  if (!_supabase) throw new Error('Supabase indisponível. Confira a configuração antes de usar ligas.');
  const { data, error } = await _supabase.rpc(fn, params || {});
  if (error) throw error;
  return data || [];
}

async function loadLeagueHub(options = {}) {
  const force = !!options.force;

  if (!currentUser || !_supabase) {
    leagueHubState = emptyLeagueHubState();
    return syncLeagueHubWindowState();
  }

  if (leagueHubState.loading && !force) {
    return leagueHubState;
  }

  leagueHubState.loading = true;
  leagueHubState.error = '';

  try {
    const [catalog, memberships] = await Promise.all([
      leagueRpc('get_public_leagues'),
      leagueRpc('get_my_leagues')
    ]);

    leagueHubState.catalog = catalog;
    leagueHubState.memberships = memberships;

    const selectableMembership =
      findLeagueMembership(leagueHubState.selectedLeagueId) ||
      memberships.find(m => m.membership_status === 'active') ||
      memberships[0] ||
      null;

    leagueHubState.selectedLeagueId = selectableMembership ? selectableMembership.league_id : null;

    const joinTargetStillExists = (catalog || []).some(l => l.league_id === leagueHubState.selectedJoinLeagueId);
    if (!joinTargetStillExists) {
      const firstJoinable = (catalog || []).find(l => !findLeagueMembership(l.league_id));
      leagueHubState.selectedJoinLeagueId = firstJoinable ? firstJoinable.league_id : ((catalog || [])[0]?.league_id || null);
    }

    const selectedMembership = findLeagueMembership(leagueHubState.selectedLeagueId);
    if (selectedMembership && selectedMembership.membership_status === 'active') {
      leagueHubState.standings = await leagueRpc('get_league_standings', { p_league_id: selectedMembership.league_id });
      leagueHubState.requests = isLeagueAdminMembership(selectedMembership.league_id)
        ? await leagueRpc('get_league_pending_requests', { p_league_id: selectedMembership.league_id })
        : [];
    } else {
      leagueHubState.standings = [];
      leagueHubState.requests = [];
    }

    leagueHubState.ready = true;
  } catch (err) {
    leagueHubState.error = err?.message || 'Não foi possível carregar as ligas.';
  } finally {
    leagueHubState.loading = false;
  }

  return syncLeagueHubWindowState();
}

async function createLeagueHubLeague({ name, accessCode, joinMode }) {
  const result = await leagueRpc('create_league', {
    p_name: name,
    p_access_code: accessCode,
    p_join_mode: joinMode
  });

  const createdLeagueId = result && result[0] ? result[0].league_id : null;
  if (createdLeagueId) {
    leagueHubState.selectedLeagueId = createdLeagueId;
    leagueHubState.selectedJoinLeagueId = createdLeagueId;
  }
  await loadLeagueHub({ force: true });
  syncLeagueHubWindowState();
  return result;
}

async function joinLeagueHubLeague({ leagueId, accessCode }) {
  const result = await leagueRpc('request_join_league', {
    p_league_id: leagueId,
    p_access_code: accessCode
  });

  leagueHubState.selectedLeagueId = leagueId;
  leagueHubState.selectedJoinLeagueId = leagueId;
  await loadLeagueHub({ force: true });
  syncLeagueHubWindowState();
  return result;
}

async function reviewLeagueHubMembership({ membershipId, action }) {
  const result = await leagueRpc('review_league_member', {
    p_membership_id: membershipId,
    p_action: action
  });
  await loadLeagueHub({ force: true });
  return result;
}

async function leaveLeagueHubLeague({ leagueId }) {
  await leagueRpc('leave_league', { p_league_id: leagueId });
  await loadLeagueHub({ force: true });
}

// ── EXPOSIÇÃO GLOBAL ──────────────────────────────────────
window.XP = XP;
window.HEARTS = HEARTS;
window.GEMS = GEMS;
window.LEAGUES = LEAGUES;
window.player = player;
window.defaultPlayer = defaultPlayer;
window.setPlayer = function(p) { window.player = Object.assign(defaultPlayer(), p || {}); player = window.player; };
window.awardLevelXp = awardLevelXp;
window.previewLevelXp = previewLevelXp;
window.addXp = addXp;
window.tickStreak = tickStreak;
window.loseHeart = loseHeart;
window.refreshHearts = refreshHearts;
window.timeUntilNextHeart = timeUntilNextHeart;
window.fillHeartsWithGems = fillHeartsWithGems;
window.addGems = addGems;
window.canPlayLevel = canPlayLevel;
window.todaysLevel = todaysLevel;
window.markLevelComplete = markLevelComplete;
window.todayKey = todayKey;
window.updateLeague = updateLeague;
window.getLeagueInfo = getLeagueInfo;
window.mockLeagueParticipants = mockLeagueParticipants;
window.weekStart = weekStart;
window.syncLeagueWeek = syncLeagueWeek;
window.leagueHubState = syncLeagueHubWindowState();
window.getLeagueMembershipLimit = getLeagueMembershipLimit;
window.getJoinedLeagueCount = getJoinedLeagueCount;
window.findLeagueMembership = findLeagueMembership;
window.isLeagueAdminMembership = isLeagueAdminMembership;
window.setSelectedLeagueHubLeague = setSelectedLeagueHubLeague;
window.setSelectedJoinLeague = setSelectedJoinLeague;
window.loadLeagueHub = loadLeagueHub;
window.createLeagueHubLeague = createLeagueHubLeague;
window.joinLeagueHubLeague = joinLeagueHubLeague;
window.reviewLeagueHubMembership = reviewLeagueHubMembership;
window.leaveLeagueHubLeague = leaveLeagueHubLeague;
