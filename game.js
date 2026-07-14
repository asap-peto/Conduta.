/* ============================================================
   game.js — Conduta.
   Controller: boot, caso do dia (BRT), máquina de estados,
   timer, streak, lock diário e ponte com auth/percentil.
   ============================================================ */

/* ── CHAVES DE STORAGE ─────────────────────────────────────── */
var KEY_PLAYER  = 'conduta_player_v3';
var KEY_DAILY   = 'conduta_daily_v1';
var KEY_SESSION = 'conduta_session_v2'; // v2: motor de stages (v1 antiga é descartada)
var KEY_ONBOARD = 'conduta_onboarded_v1';

/* ── RELÓGIO BRT (UTC-3 fixo, sem horário de verão) ────────── */
var EPOCH_BRT = Date.UTC(2026, 6, 1); // lançamento: 1 jul 2026 = Caso #1

function brtNow() { return new Date(Date.now() - 3 * 3600 * 1000); }
function dayKey() { return brtNow().toISOString().slice(0, 10); }
function dayIndex() {
  return Math.floor((Date.now() - 3 * 3600 * 1000 - EPOCH_BRT) / 86400000);
}
function dayNumber() { return dayIndex() + 1; }
function msUntilMidnightBRT() {
  var sinceEpoch = Date.now() - 3 * 3600 * 1000 - EPOCH_BRT;
  return 86400000 - (sinceEpoch % 86400000);
}
function todaysCase() {
  var q = activeQueue();
  if (!q.length) return null;
  var idx = ((dayIndex() % q.length) + q.length) % q.length;
  return getCaseById(q[idx]);
}

/* ── ESTADO ────────────────────────────────────────────────── */
var player = null;   // { streak, bestStreak, lastPlayedDay, freezesUsedMonth, monthKey, xp }
var daily = null;    // { [dayKey]: resultado }
var session = null;  // partida em curso (ou null)

function defaultPlayer() {
  return { streak: 0, bestStreak: 0, lastPlayedDay: null, freezesUsedMonth: 0, monthKey: null, xp: 0, name: null };
}

/* nome exibido na saudação (default "Estudante"); persiste no player.
   Quando logado, é o display_name da conta. */
function getPlayerName() {
  return (player && player.name) ? player.name : 'Estudante';
}
function getUsername() { return (player && player.username) ? player.username : null; }
function isLoggedIn() { return typeof currentUser !== 'undefined' && !!currentUser; }
function hasCustomName() { return !!(player && player.name); }
function setPlayerName(name) {
  name = (name || '').trim().slice(0, 24);
  player.name = name || null;
  saveProgress(KEY_PLAYER, player);
  // logado: o display_name também vai pra conta (propaga p/ o ranking)
  if (name && isLoggedIn() && typeof updateDisplayNameRemote === 'function') {
    updateDisplayNameRemote(name);
  }
  renderHeaderStats();
}
function playedCount() { return daily ? Object.keys(daily).length : 0; }
/* aplica o perfil da conta (username imutável + display_name) no cache local */
function applyProfile(username, displayName) {
  if (username) player.username = username;
  if (displayName) player.name = displayName;
  saveProgress(KEY_PLAYER, player);
  renderHeaderStats();
}

function loadStateSync() {
  player = loadProgressSync(KEY_PLAYER) || defaultPlayer();
  daily = loadProgressSync(KEY_DAILY) || {};
  session = loadProgressSync(KEY_SESSION) || null;
  // sessão de outro dia não vale mais
  if (session && session.dayKey !== dayKey()) {
    session = null;
    saveProgress(KEY_SESSION, null);
  }
}

/* Recarrega do Supabase após login (chamado por auth.js). */
async function maybeReloadPlayerFromStorage() {
  player = (await loadProgress(KEY_PLAYER)) || defaultPlayer();
  daily = (await loadProgress(KEY_DAILY)) || {};
  session = (await loadProgress(KEY_SESSION)) || null;
  if (session && session.dayKey !== dayKey()) session = null;
  // restaura o gate do onboarding do servidor pro localStorage
  // (num aparelho novo logado, evita re-mostrar a explicação)
  var onb = await loadProgress(KEY_ONBOARD);
  if (onb) {
    onboardingSeenSession = true;
    try { localStorage.setItem(KEY_ONBOARD, JSON.stringify(true)); } catch (e) {}
  }
  // perfil da conta: username (imutável) + display_name viram cache local
  if (typeof getMyProfile === 'function') {
    var prof = await getMyProfile();
    if (prof && prof.username) {
      player.username = prof.username;
      if (prof.display_name) player.name = prof.display_name;
      saveProgress(KEY_PLAYER, player);
    }
  }
}

function playedToday() { return !!(daily && daily[dayKey()]); }
function hasOpenSession() { return !!(session && session.dayKey === dayKey()); }

/* ── ROTEAMENTO / ABAS ─────────────────────────────────────── */
var currentTab = 'home'; // 'home' | 'arquivo' | 'liga' | 'perfil'
var onboardingSeenSession = false; // deixa avançar mesmo sem salvar a flag

function renderApp() {
  renderHeaderStats();
  if (!onboardingSeenSession && !loadProgressSync(KEY_ONBOARD)) { renderOnboarding(); return; }
  if (hasOpenSession()) { renderCase(); return; }
  showTab(currentTab);
}

function showTab(name) {
  stopTimerUI();
  stopCountdown();
  currentTab = name;
  if (name === 'arquivo') { renderArchive(); return; }
  if (name === 'liga') { renderLeague(); return; }
  if (name === 'perfil') { renderProfile(); return; }
  // 'home' — adapta ao estado (novo / em andamento / concluído)
  renderHome();
}

function openArchive() { showTab('arquivo'); }

function goHome() {
  showTab('home');
}

function completeOnboarding() {
  onboardingSeenSession = true; // não reaparece nesta sessão
  var chk = document.getElementById('ob-dontshow');
  var dontShow = chk ? chk.checked : true;
  // salva permanentemente (localStorage + Supabase se logado) só se marcado
  if (dontShow) saveProgress(KEY_ONBOARD, true);
  renderApp();
}

/* ── PARTIDA ───────────────────────────────────────────────── */
function shuffled(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

/* ── MOTOR DE ETAPAS (stages) ──────────────────────────────── */
/* stageIndex -1 = apresentação; 0..N-1 = stages; N = fim.       */
function newSession(c, practice) {
  return {
    dayKey: dayKey(),
    caseId: c.id,
    stageIndex: -1,
    stageAnswers: [],   // paralelo a stages (preenchido ao concluir)
    order: {},          // stageIndex → ordem embaralhada (decisão)
    selected: null,     // seleção corrente (decisão)
    dxAttempts: [],     // tentativas da hipótese corrente
    dxPartial: null,    // último palpite "parcial" (feedback)
    stageStartedAt: null,
    practice: !!practice
  };
}

function saveSession() { if (session && !session.practice) saveProgress(KEY_SESSION, session); }

function startCase() {
  if (playedToday()) { showSavedResult(); return; }
  var c = todaysCase();
  if (!c) { toast('Nenhum caso disponível hoje.'); return; }
  if (!hasOpenSession()) {
    session = newSession(c, false);
    saveSession();
  }
  renderCase();
}

/* Modo treino: replay do caso do dia ou do arquivo (só em memória). */
function startPractice(caseId) {
  var c = getCaseById(caseId);
  if (!c) { toast('Caso não encontrado.'); return; }
  session = newSession(c, true);
  renderCase();
}

function quitCase() {
  stopTimerUI();
  if (session && session.practice) session = null;
  showTab(currentTab);
}

/* entra numa etapa: reseta o estado transitório e marca o relógio */
function enterStage(idx) {
  session.stageIndex = idx;
  session.selected = null;
  session.dxPartial = null;
  var c = getCaseById(session.caseId);
  var stage = c.stages[idx];
  if (!stage) { finishCase(); return; }
  if (stage.type === 'diagnosis') session.dxAttempts = [];
  if (stage.type === 'decision' && !session.order[idx]) {
    session.order[idx] = shuffled(stage.options.map(function (_, i) { return i; }));
  }
  session.stageStartedAt = Date.now();
  saveSession();
  renderCase();
}

function assumeCase() { enterStage(0); }         // apresentação → 1ª etapa
function advanceStage() { enterStage(session.stageIndex + 1); }

/* diagnóstico digitado */
function submitDiagnosis(guess) {
  guess = (guess || '').trim();
  if (!guess) return;
  var c = getCaseById(session.caseId);
  var idx = session.stageIndex;
  var stage = c.stages[idx];
  if (session.stageAnswers[idx]) return; // já resolvido

  var res = matchDiagnosis(stage, guess);
  if (res === 'partial') { session.dxPartial = guess; saveSession(); renderCase(); return; }

  session.dxPartial = null;
  session.dxAttempts.push(guess);
  var max = stage.maxAttempts || 3;
  var correct = (res === 'correct');
  if (correct || session.dxAttempts.length >= max) {
    session.stageAnswers[idx] = {
      type: 'diagnosis',
      attempts: session.dxAttempts.slice(),
      correct: correct,
      attemptsUsed: session.dxAttempts.length,
      dangerousGuess: session.dxAttempts.some(function (a) { return isDangerousGuess(stage, a); }),
      answer: correct ? guess : null,
      ms: session.stageStartedAt ? Date.now() - session.stageStartedAt : 0
    };
  }
  saveSession();
  renderCase();
}

/* decisão de múltipla escolha */
function selectOption(optIdx) {
  session.selected = optIdx;
  var btns = document.querySelectorAll('#view-case .option');
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.toggle('selected', parseInt(btns[i].getAttribute('data-opt'), 10) === optIdx);
  }
  var confirmBtn = document.getElementById('btn-confirm');
  if (confirmBtn) confirmBtn.disabled = false;
}

function confirmDecision() {
  if (session.selected == null) return;
  var idx = session.stageIndex;
  var ms = session.stageStartedAt ? Date.now() - session.stageStartedAt : 0;
  session.stageAnswers[idx] = { type: 'decision', optionIdx: session.selected, ms: ms };
  session.selected = null;
  advanceStage();
}

/* revelação (não interativa) */
function advanceReveal() {
  session.stageAnswers[session.stageIndex] = { type: 'reveal' };
  advanceStage();
}

/* ── STREAK (tick só ao finalizar o caso do dia) ───────────── */
function daysBetween(k1, k2) {
  var a = k1.split('-'), b = k2.split('-');
  var d1 = Date.UTC(+a[0], +a[1] - 1, +a[2]);
  var d2 = Date.UTC(+b[0], +b[1] - 1, +b[2]);
  return Math.round((d2 - d1) / 86400000);
}

function tickStreak() {
  var today = dayKey();
  var mk = today.slice(0, 7);
  var froze = false;

  if (player.monthKey !== mk) {
    player.monthKey = mk;
    player.freezesUsedMonth = 0;
  }

  if (!player.lastPlayedDay) {
    player.streak = 1;
  } else {
    var gap = daysBetween(player.lastPlayedDay, today);
    if (gap <= 0) {
      return { froze: false }; // já contou hoje
    } else if (gap === 1) {
      player.streak += 1;
    } else if (gap === 2 && player.freezesUsedMonth < 2) {
      player.freezesUsedMonth += 1;
      player.streak += 1;
      froze = true;
    } else {
      player.streak = 1;
    }
  }

  player.lastPlayedDay = today;
  if (player.streak > player.bestStreak) player.bestStreak = player.streak;
  return { froze: froze };
}

/* ── FINALIZAÇÃO ───────────────────────────────────────────── */
var currentResultCtx = null; // contexto do share

function finishCase() {
  stopTimerUI();
  var c = getCaseById(session.caseId);
  var score = computeScore(c, session.stageAnswers);

  if (session.practice) {
    var practiceEntry = {
      caseId: c.id,
      stageAnswers: session.stageAnswers,
      seals: score.seals,
      perDecision: score.perDecision,
      dx: score.dx,
      breakdown: score.breakdown,
      composite: score.composite,
      percentile: null
    };
    session = null;
    showResult(practiceEntry, c, null, { practice: true });
    return;
  }

  var streakInfo = tickStreak();
  var xpGained = 10 * (c.difficulty || 1);
  player.xp += xpGained;

  var entry = {
    caseId: c.id,
    stageAnswers: session.stageAnswers,
    seals: score.seals,
    perDecision: score.perDecision,
    dx: score.dx,
    breakdown: score.breakdown,
    composite: score.composite,
    xp: xpGained,
    percentile: null,
    finishedAt: Date.now()
  };
  daily[dayKey()] = entry;

  session = null;
  saveProgress(KEY_DAILY, daily);
  saveProgress(KEY_PLAYER, player);
  saveProgress(KEY_SESSION, null);
  renderHeaderStats();

  showResult(entry, c, streakInfo.froze
    ? '🧊 Seu streak foi protegido (' + player.freezesUsedMonth + '/2 este mês)'
    : null);

  // percentil: envia e busca em background
  var dk = dayKey();
  submitDailyResult(dk, c.id, entry.composite, entry.seals).then(function () {
    return fetchPercentile(dk, entry.composite);
  }).then(function (info) {
    if (info && typeof info.percentile === 'number') {
      entry.percentile = info.percentile;
      saveProgress(KEY_DAILY, daily);
    }
    updatePercentileLine(info);
  });
}

/* resultado já salvo (reabriu a página depois de jogar) */
function showSavedResult() {
  var entry = daily[dayKey()];
  if (!entry) { renderHome(); return; }
  var c = getCaseById(entry.caseId);
  if (!c) { renderHome(); return; }
  showResult(entry, c, null);

  if (entry.percentile == null) {
    fetchPercentile(dayKey(), entry.composite).then(function (info) {
      if (info && typeof info.percentile === 'number') {
        entry.percentile = info.percentile;
        saveProgress(KEY_DAILY, daily);
      }
      updatePercentileLine(info);
    });
  }
}

/* monta o gabarito das decisões a partir dos stages + respostas */
function reviewFromStages(caseData, stageAnswers) {
  var out = [];
  (caseData.stages || []).forEach(function (s, i) {
    if (s.type !== 'decision') return;
    var a = stageAnswers ? stageAnswers[i] : null;
    var chosen = (a && typeof a.optionIdx === 'number') ? s.options[a.optionIdx] : null;
    var best = s.options.filter(function (o) { return o.quality === 'best'; })[0];
    var seal = chosen ? (chosen.dangerous ? 'r' : chosen.quality === 'best' ? 'g' : chosen.quality === 'acceptable' ? 'y' : 'r') : 'r';
    out.push({ prompt: s.prompt, kind: s.kind, chosen: chosen, best: best, seal: seal });
  });
  return out;
}

function showResult(entry, caseData, frozeNote, opts) {
  opts = opts || {};
  var theme = THEMES[caseData.theme] || { icon: '🩺' };
  currentResultCtx = {
    themeIcon: theme.icon,
    dayNumber: dayNumber(),
    perDecision: entry.perDecision,
    seals: entry.seals,
    dx: entry.dx,
    percentile: entry.percentile,
    streak: player.streak || 0
  };
  renderResult({
    caseData: caseData,
    result: {
      seals: entry.seals,
      perDecision: entry.perDecision,
      dx: entry.dx,
      decisions: reviewFromStages(caseData, entry.stageAnswers)
    },
    streak: player.streak || 0,
    frozeNote: frozeNote,
    dayNumber: dayNumber(),
    practice: !!opts.practice,
    composite: entry.composite,
    xpGained: opts.practice ? 0 : (entry.xp || 10 * (caseData.difficulty || 1)),
    xpTotal: player.xp || 0,
    percentileInfo: typeof entry.percentile === 'number' ? { percentile: entry.percentile } : null
  });
}

/* últimos 7 dias (mais antigo → hoje): { dayKey, isToday, played, seal }
   'seal' = pior selo do dia (verde/amarelo/vermelho) como resumo visual */
function lastSevenDays() {
  var out = [];
  var todayMs = brtNow().setUTCHours(0, 0, 0, 0);
  for (var i = 6; i >= 0; i--) {
    var dk = new Date(todayMs - i * 86400000).toISOString().slice(0, 10);
    var e = daily && daily[dk];
    var seal = null;
    if (e && e.seals) {
      var order = ['g', 'y', 'r'];
      seal = ['diag', 'seg', 'rap', 'cond']
        .map(function (k) { return e.seals[k]; })
        .sort(function (a, b) { return order.indexOf(b) - order.indexOf(a); })[0];
    }
    out.push({ dayKey: dk, isToday: i === 0, played: !!e, seal: seal });
  }
  return out;
}

/* ── ARQUIVO (casos de dias anteriores) ────────────────────── */
function archiveList() {
  var q = activeQueue();
  if (!q.length) return [];
  var list = [];
  for (var n = dayNumber() - 1; n >= 1; n--) {
    var dk = new Date(EPOCH_BRT + (n - 1) * 86400000).toISOString().slice(0, 10);
    var c = getCaseById(q[(((n - 1) % q.length) + q.length) % q.length]);
    list.push({ n: n, dayKey: dk, caseData: c, entry: daily[dk] || null });
  }
  return list;
}

function shareCurrentResult() {
  if (!currentResultCtx) return;
  currentResultCtx.percentile = (daily[dayKey()] || {}).percentile;
  shareResult(currentResultCtx);
}
function copyCurrentResult() {
  if (!currentResultCtx) return;
  currentResultCtx.percentile = (daily[dayKey()] || {}).percentile;
  copyShareText(currentResultCtx);
}

/* ── BOOT ──────────────────────────────────────────────────── */
function boot() {
  loadStateSync();
  renderApp();
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('service-worker.js').catch(function () {});
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

window.goHome = goHome;
window.showTab = showTab;
window.openArchive = openArchive;
window.startCase = startCase;
window.startPractice = startPractice;
window.showSavedResult = showSavedResult;
window.archiveList = archiveList;
window.lastSevenDays = lastSevenDays;
window.getPlayerName = getPlayerName;
window.getUsername = getUsername;
window.isLoggedIn = isLoggedIn;
window.hasCustomName = hasCustomName;
window.setPlayerName = setPlayerName;
window.applyProfile = applyProfile;
window.playedCount = playedCount;
window.quitCase = quitCase;
window.assumeCase = assumeCase;
window.advanceStage = advanceStage;
window.advanceReveal = advanceReveal;
window.submitDiagnosis = submitDiagnosis;
window.selectOption = selectOption;
window.confirmDecision = confirmDecision;
window.completeOnboarding = completeOnboarding;
window.maybeReloadPlayerFromStorage = maybeReloadPlayerFromStorage;
window.shareCurrentResult = shareCurrentResult;
window.copyCurrentResult = copyCurrentResult;
window.brtNow = brtNow;
window.dayKey = dayKey;
window.dayNumber = dayNumber;
window.msUntilMidnightBRT = msUntilMidnightBRT;
window.todaysCase = todaysCase;
window.hasOpenSession = hasOpenSession;
