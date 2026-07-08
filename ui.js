/* ============================================================
   ui.js — Conduta.
   Renderização das views: onboarding, home, arquivo, liga,
   caso, resultado + nav inferior. Estado fica em game.js.
   ============================================================ */

/* ── HELPERS ───────────────────────────────────────────────── */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function $(id) { return document.getElementById(id); }

var VIEW_IDS = ['onboarding', 'home', 'archive', 'league', 'profile', 'case', 'result'];
var NAV_VIEWS = { home: true, archive: true, league: true, profile: true, result: true };

function showView(name) {
  VIEW_IDS.forEach(function (v) {
    var el = $('view-' + v);
    if (el) el.style.display = v === name ? '' : 'none';
  });
  var nav = $('bottom-nav');
  if (nav) {
    if (NAV_VIEWS[name]) { renderBottomNav(); nav.style.display = ''; }
    else nav.style.display = 'none';
  }
  window.scrollTo(0, 0);
}

/* ── NAV INFERIOR (pílula flutuante) ───────────────────────── */
var NAV_TABS = [
  { id: 'home',    label: 'Home',    custom: 'home' },
  { id: 'arquivo', label: 'Arquivo', custom: 'arquivo' },
  { id: 'liga',    label: 'Liga',    custom: 'liga' },
  { id: 'perfil',  label: 'Perfil',  icon: 'user' }
];

function renderBottomNav() {
  var nav = $('bottom-nav');
  if (!nav) return;
  var active = (typeof currentTab !== 'undefined') ? currentTab : 'home';
  nav.innerHTML = '<div class="nav-pill">' +
    NAV_TABS.map(function (t) {
      var glyph = t.custom
        ? '<span class="nav-ic nav-ic-' + t.custom + '"></span>'
        : icon(t.icon, 19);
      return '<button class="nav-item' + (t.id === active ? ' active' : '') + '" onclick="showTab(\'' + t.id + '\')">' +
        glyph + '<span>' + t.label + '</span></button>';
    }).join('') +
    '</div>';
}

/* ── TOAST ─────────────────────────────────────────────────── */
var _toastTimer = null;
function toast(msg) {
  var el = $('toast');
  if (!el) return;
  el.textContent = msg;
  el.style.display = '';
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function () { el.style.display = 'none'; }, 2600);
}

/* ── MODAIS ────────────────────────────────────────────────── */
function openModal(name) {
  var el = $('modal-' + name);
  if (el) el.style.display = 'flex';
}
function closeModal(name) {
  var el = $('modal-' + name);
  if (el) el.style.display = 'none';
}

/* ── HEADER ────────────────────────────────────────────────── */
function renderHeaderStats() {
  var el = $('header-stats');
  if (!el) return;
  var html = '';
  var streak = (typeof player !== 'undefined' && player) ? (player.streak || 0) : 0;
  if (streak > 0) {
    html += '<span class="chip chip-active"><span class="chip-emoji">🔥</span>' + streak + '</span>';
  }
  if (typeof currentUser !== 'undefined' && currentUser) {
    var initial = (currentUser.email || '?').charAt(0).toUpperCase();
    html += '<button class="btn-avatar" onclick="showTab(\'perfil\')" aria-label="Seu perfil">' + esc(initial) + '</button>';
  } else {
    html += '<button class="btn-enter" onclick="showTab(\'perfil\')">Perfil</button>';
  }
  el.innerHTML = html;
}

/* ── SELOS ─────────────────────────────────────────────────── */
var SEAL_NAMES = { diag: 'Diagnóstico', seg: 'Segurança', rap: 'Rapidez', cond: 'Conduta' };
var SEAL_DESCS = {
  diag: 'Você chegou à hipótese certa?',
  seg:  'Alguma decisão colocou o paciente em risco?',
  rap:  'Decidiu no tempo de um plantão de verdade?',
  cond: 'O caminho foi limpo — sem exame inútil, sem etapa pulada?'
};
function sealDot(s, extra) {
  return '<span class="seal-dot seal-' + s + (extra ? ' ' + extra : '') + '"></span>';
}

/* ── ONBOARDING (1 tela) ───────────────────────────────────── */
function renderOnboarding() {
  var el = $('view-onboarding');
  el.innerHTML =
    '<div class="ob-wrap">' +
      '<div class="ob-kicker">O caso clínico do dia</div>' +
      '<h1 class="ob-title">Você saberia conduzir esse paciente?</h1>' +
      '<p class="ob-sub">Um caso por dia. Três decisões. O paciente evolui conforme o plantão avança — e no fim você descobre como se saiu em 4 selos.</p>' +
      '<div class="ob-seals">' +
        Object.keys(SEAL_NAMES).map(function (k) {
          return '<div class="ob-seal">' + sealDot('g') +
            '<div><div class="ob-seal-name">' + SEAL_NAMES[k] + '</div>' +
            '<div class="ob-seal-desc">' + SEAL_DESCS[k] + '</div></div></div>';
        }).join('') +
      '</div>' +
      '<div class="ob-legend">' +
        '<span>' + sealDot('g') + ' mandou bem</span>' +
        '<span>' + sealDot('y') + ' dá pra melhorar</span>' +
        '<span>' + sealDot('r') + ' cuidado</span>' +
      '</div>' +
      '<label class="ob-check"><input type="checkbox" id="ob-dontshow" checked> Não mostrar essa explicação de novo</label>' +
      '<button class="btn-primary" onclick="completeOnboarding()">Começar o plantão</button>' +
      '<p class="ob-note">Sem cadastro. O caso é o mesmo pra todo mundo hoje.</p>' +
    '</div>';
  showView('onboarding');
  var hs = $('header-stats');
  if (hs) hs.innerHTML = ''; // sem distrações no onboarding
}

/* ── HOME ──────────────────────────────────────────────────── */
var MONTHS_PT = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
var WEEKDAYS_PT = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
function homeDateLabel() {
  var d = brtNow();
  return WEEKDAYS_PT[d.getUTCDay()] + ' · ' + d.getUTCDate() + ' de ' + MONTHS_PT[d.getUTCMonth()];
}

function difficultyDots(dif) {
  var dots = '';
  for (var i = 1; i <= 3; i++) dots += i <= dif ? '●' : '○';
  return dots;
}

function renderHome() {
  var el = $('view-home');
  var c = todaysCase();
  var streak = player.streak || 0;

  /* card de saudação (sempre no topo) — streak como badge à direita */
  var streakBadge = streak > 0
    ? '<div class="streak-badge"><span class="flame">🔥</span><span class="streak-n">' + streak + '</span><span class="streak-cap">' + (streak === 1 ? 'dia' : 'dias') + '</span></div>'
    : '<div class="streak-badge muted"><span class="flame">🔥</span><span class="streak-n">0</span><span class="streak-cap">dias</span></div>';
  var greetCard =
    '<div class="greet-card">' +
      '<div class="greet-hello">' +
        '<span class="greet-oi">Olá,</span>' +
        '<span class="greet-name">' + esc(getPlayerName()) + ' <span class="wave">👋</span></span>' +
      '</div>' +
      streakBadge +
    '</div>';

  /* faixa de stats: últimos 7 dias + XP + recorde (dá sinal ao painel) */
  var week = (typeof lastSevenDays === 'function') ? lastSevenDays() : [];
  var weekDots = week.map(function (d) {
    var cls = d.played ? ('day-' + d.seal) : (d.isToday ? 'day-today' : 'day-empty');
    return '<span class="week-dot ' + cls + '"></span>';
  }).join('');
  var statsStrip =
    '<div class="home-stats">' +
      '<div class="week-strip">' +
        '<span class="week-label">Últimos 7 dias</span>' +
        '<div class="week-dots">' + weekDots + '</div>' +
      '</div>' +
      '<div class="quick-stats">' +
        '<span class="qstat">⚡ <b>' + (player.xp || 0) + '</b> XP</span>' +
        '<span class="qstat">🏅 <b>' + (player.bestStreak || 0) + '</b> recorde</span>' +
      '</div>' +
    '</div>';

  if (!c) {
    el.innerHTML = '<div class="home-wrap">' +
        '<div class="home-header">' + greetCard + statsStrip + '</div>' +
        '<div class="home-play">' +
          '<div class="home-date">' + homeDateLabel() + '</div>' +
          '<div class="patient-card"><div class="patient-kicker">Sem caso hoje</div>' +
          '<div class="patient-name">Volte amanhã 🌙</div></div>' +
        '</div>' +
      '</div>';
    showView('home');
    return;
  }

  var theme = THEMES[c.theme] || { icon: '🩺', label: '' };
  var inProgress = typeof hasOpenSession === 'function' && hasOpenSession();
  var played = typeof playedToday === 'function' && playedToday();
  var entry = (typeof daily !== 'undefined' && daily) ? daily[dayKey()] : null;

  /* cabeçalho do card do paciente (comum) */
  var patientHead =
    '<div class="patient-kicker">' +
      (played ? 'Plantão concluído' : inProgress ? 'Plantão em andamento' : 'Seu paciente te espera…') +
    '</div>' +
    '<div class="patient-row">' +
      '<div class="patient-emoji">' + theme.icon + '</div>' +
      '<div class="patient-info">' +
        '<div class="patient-label">Caso de hoje</div>' +
        '<div class="patient-name">' + esc(theme.label) + '</div>' +
        '<div class="patient-meta">Caso #' + dayNumber() + ' · <span class="dots">' + difficultyDots(c.difficulty) + '</span></div>' +
      '</div>' +
    '</div>';

  var patientBody;
  if (played && entry) {
    patientBody =
      '<div class="home-recap">' +
        ['diag', 'seg', 'rap', 'cond'].map(function (k) { return sealDot(entry.seals[k]); }).join('') +
      '</div>' +
      '<button class="btn-primary" onclick="showSavedResult()">Ver seu resultado</button>' +
      '<button class="btn-ghost btn-practice" onclick="startPractice(\'' + c.id + '\')">Jogar de novo (treino)</button>' +
      '<div class="home-countdown">Próximo caso em <b id="countdown-timer">—</b></div>';
  } else {
    patientBody =
      '<button class="btn-primary" onclick="startCase()">' +
        (inProgress ? 'Continuar plantão' : 'Iniciar plantão') +
      '</button>';
  }

  el.innerHTML =
    '<div class="home-wrap">' +
      '<div class="home-header">' + greetCard + statsStrip + '</div>' +
      '<div class="home-play">' +
        '<div class="home-date">' + homeDateLabel() + '</div>' +
        '<div class="patient-card">' + patientHead + patientBody + '</div>' +
      '</div>' +
    '</div>';
  showView('home');
  if (played && entry) startCountdown();
}

/* ── PERFIL ────────────────────────────────────────────────── */
function statCard(emoji, value, label) {
  return '<div class="stat-card">' +
    '<div class="stat-emoji">' + emoji + '</div>' +
    '<div class="stat-value">' + value + '</div>' +
    '<div class="stat-label">' + label + '</div>' +
  '</div>';
}

function renderProfile() {
  var el = $('view-profile');
  var name = getPlayerName();
  var initial = name.charAt(0).toUpperCase();
  var loggedIn = (typeof currentUser !== 'undefined' && currentUser);

  var account = loggedIn
    ? '<div class="account-card"><div class="account-line">Conta: <b>' + esc(currentUser.email || '') + '</b></div>' +
        '<button class="btn-ghost" onclick="logout()">Sair da conta</button></div>'
    : '<div class="account-card"><div class="account-line">Entre pra salvar seu streak e histórico em qualquer dispositivo.</div>' +
        '<button class="btn-primary btn-slim" onclick="openLoginModal()">Entrar / criar conta</button></div>';

  el.innerHTML =
    '<div class="tab-wrap">' +
      '<div class="tab-kicker">Perfil</div>' +
      '<div class="profile-head">' +
        '<div class="profile-avatar">' + esc(initial) + '</div>' +
        '<div class="profile-id" id="profile-id">' +
          '<div class="profile-name">' + esc(name) + '</div>' +
          '<button class="btn-link" onclick="uiEditName()">editar nome</button>' +
        '</div>' +
      '</div>' +
      '<div class="stat-grid">' +
        statCard('⚡', player.xp || 0, 'XP total') +
        statCard('🔥', player.streak || 0, 'streak atual') +
        statCard('🏅', player.bestStreak || 0, 'melhor streak') +
        statCard('🗂️', playedCount(), 'casos jogados') +
      '</div>' +
      '<button class="row-btn" onclick="openArchive()">' +
        '<span class="row-btn-ic">' + icon('book', 20) + '</span>' +
        '<span class="row-btn-label">Casos anteriores</span>' +
        '<span class="row-btn-chev">' + icon('chevron', 18) + '</span>' +
      '</button>' +
      account +
    '</div>';
  showView('profile');
}

function uiEditName() {
  var box = $('profile-id');
  if (!box) return;
  box.innerHTML =
    '<div class="name-edit">' +
      '<input class="text-input" id="name-input" maxlength="24" placeholder="Seu nome" value="' + esc(hasCustomName() ? getPlayerName() : '') + '">' +
      '<button class="btn-primary btn-slim" onclick="uiSaveName()">Salvar</button>' +
    '</div>';
  var inp = $('name-input');
  if (inp) { inp.focus(); inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') uiSaveName(); }); }
}

function uiSaveName() {
  var inp = $('name-input');
  setPlayerName(inp ? inp.value : '');
  renderProfile();
  toast('Nome salvo!');
}

/* ── ARQUIVO ───────────────────────────────────────────────── */
function archiveDateLabel(dk) {
  var p = dk.split('-');
  return parseInt(p[2], 10) + ' de ' + MONTHS_PT[parseInt(p[1], 10) - 1];
}

function renderArchive() {
  var el = $('view-archive');
  var list = archiveList();

  var rows = list.map(function (item) {
    var theme = THEMES[item.caseData.theme] || { icon: '🩺', label: '' };
    var seals = item.entry
      ? '<div class="arch-seals">' + item.entry.perDecision.map(function (s) { return sealDot(s); }).join('') + '</div>'
      : '<div class="arch-unplayed">novo</div>';
    return '<button class="arch-item" onclick="startPractice(\'' + item.caseData.id + '\')">' +
      '<div class="arch-icon">' + theme.icon + '</div>' +
      '<div class="arch-info">' +
        '<div class="arch-title">Caso #' + item.n + ' · ' + esc(theme.label) + '</div>' +
        '<div class="arch-sub">' + archiveDateLabel(item.dayKey) + ' · <span class="dots">' + difficultyDots(item.caseData.difficulty) + '</span></div>' +
      '</div>' +
      seals +
      '<div class="arch-chev">' + icon('chevron', 18) + '</div>' +
    '</button>';
  }).join('');

  el.innerHTML =
    '<div class="tab-wrap">' +
      '<div class="tab-kicker">Arquivo</div>' +
      '<h1 class="tab-title">Casos anteriores</h1>' +
      '<p class="tab-sub">Jogue em modo treino — não conta pra streak nem pro ranking.</p>' +
      (rows || '<div class="empty-card">O arquivo abre amanhã, depois do seu primeiro plantão. 🌙</div>') +
    '</div>';
  showView('archive');
}

/* ── LIGA ──────────────────────────────────────────────────── */
function renderLeague() {
  var el = $('view-league');
  var code = getGroupCode();

  if (!code) {
    el.innerHTML =
      '<div class="tab-wrap">' +
        '<div class="tab-kicker">Liga</div>' +
        '<h1 class="tab-title">Jogue contra<br>quem você conhece.</h1>' +
        '<p class="tab-sub">Crie um grupo com sua turma ou entre com um código de convite. O ranking soma a pontuação dos casos da semana.</p>' +
        '<div class="league-form card-dark">' +
          '<label class="fld-label" for="lg-name">Seu nome no ranking</label>' +
          '<input class="text-input" id="lg-name" maxlength="24" placeholder="ex.: João (T4)" value="' + esc(getDisplayName() || (hasCustomName() ? getPlayerName() : '')) + '">' +
          '<div class="league-actions">' +
            '<input class="text-input" id="lg-code" maxlength="6" placeholder="CÓDIGO" style="text-transform:uppercase">' +
            '<button class="btn-ghost" onclick="uiJoinGroup()">Entrar</button>' +
          '</div>' +
          '<div class="login-divider"><span>ou</span></div>' +
          '<div class="league-actions">' +
            '<input class="text-input" id="lg-group-name" maxlength="40" placeholder="Nome do grupo (ex.: Turma 74)">' +
            '<button class="btn-primary btn-slim" onclick="uiCreateGroup()">Criar</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    showView('league');
    return;
  }

  el.innerHTML =
    '<div class="tab-wrap">' +
      '<div class="tab-kicker">Liga · semana atual</div>' +
      '<h1 class="tab-title">' + esc(getGroupName() || 'Seu grupo') + '</h1>' +
      '<div class="league-invite">' +
        'Código: <b>' + esc(code) + '</b>' +
        '<button class="btn-link" onclick="uiCopyInvite()">convidar amigos</button>' +
      '</div>' +
      '<div id="league-board"><div class="league-loading">Carregando ranking…</div></div>' +
      '<button class="btn-link league-leave" onclick="uiLeaveGroup()">Sair do grupo</button>' +
    '</div>';
  showView('league');

  fetchLeagueLeaderboard().then(function (rows) {
    var board = $('league-board');
    if (!board) return;
    if (!rows) {
      board.innerHTML = '<div class="empty-card">Ranking indisponível agora. Verifique a conexão e tente de novo.</div>';
      return;
    }
    if (!rows.length) {
      board.innerHTML = '<div class="empty-card">Ninguém pontuou ainda esta semana. Joguem o caso de hoje!</div>';
      return;
    }
    board.innerHTML = rows.map(function (r, i) {
      return '<div class="lg-row' + (r.is_you ? ' you' : '') + '">' +
        '<div class="lg-rank">' + (i + 1) + '</div>' +
        '<div class="lg-name">' + esc(r.display_name) + (r.is_you ? ' <span class="lg-you-tag">você</span>' : '') + '</div>' +
        '<div class="lg-days">' + r.days + (r.days === 1 ? ' caso' : ' casos') + '</div>' +
        '<div class="lg-pts">' + r.pts + ' pts</div>' +
      '</div>';
    }).join('');
  });
}

async function uiCreateGroup() {
  var name = ($('lg-name').value || '').trim();
  var groupName = ($('lg-group-name').value || '').trim();
  if (!name) { toast('Diga seu nome pro ranking.'); return; }
  if (!groupName) { toast('Dê um nome pro grupo.'); return; }
  toast('Criando grupo…');
  var res = await createLeagueGroup(groupName, name);
  if (res.error) { toast('Não deu: ' + res.error); return; }
  toast('Grupo criado! Código ' + res.code);
  renderLeague();
}

async function uiJoinGroup() {
  var name = ($('lg-name').value || '').trim();
  var code = ($('lg-code').value || '').trim().toUpperCase();
  if (!name) { toast('Diga seu nome pro ranking.'); return; }
  if (code.length !== 6) { toast('Código tem 6 caracteres.'); return; }
  toast('Entrando…');
  var res = await joinLeagueGroup(code, name);
  if (res.error) { toast('Não deu: ' + res.error); return; }
  toast('Você entrou em ' + res.name + '!');
  renderLeague();
}

function uiLeaveGroup() {
  leaveLeagueGroup();
  renderLeague();
}

async function uiCopyInvite() {
  var text = 'Entra na minha liga no Conduta — um caso clínico por dia. Código: ' + getGroupCode() + ' · conduta.cc';
  try {
    await navigator.clipboard.writeText(text);
    toast('Convite copiado!');
  } catch (e) {
    toast('Código: ' + getGroupCode());
  }
}

/* ── TELA DO CASO ──────────────────────────────────────────── */
/* Steps: intro(0) d1(1) reveal1(2) d2(3) reveal2(4) d3(5) */
var DECISION_STEPS = { 1: 0, 3: 1, 5: 2 }; // step → índice da decisão
var REVEAL_STEPS = { 2: 0, 4: 1 };         // step → índice do reveal

function renderCase() {
  var el = $('view-case');
  var c = getCaseById(session.caseId);
  var theme = THEMES[c.theme] || { icon: '🩺', label: '' };
  var step = session.step;

  /* stepper: 4 segmentos = apresentação + 3 decisões */
  var segIdx = step === 0 ? 0 : (DECISION_STEPS[step] !== undefined ? DECISION_STEPS[step] + 1 : REVEAL_STEPS[step] + 1);
  var segs = '';
  for (var i = 0; i < 4; i++) {
    var cls = i < segIdx ? 'done' : i === segIdx ? 'current' : '';
    segs += '<div class="step-seg ' + cls + '"></div>';
  }

  var html =
    '<div class="case-top">' +
      '<button class="case-quit" onclick="quitCase()" aria-label="Sair">✕</button>' +
      '<div class="stepper">' + segs + '</div>' +
      '<div class="case-tag">' +
        (session.practice ? '<span class="practice-tag">Treino</span> ' : '') +
        theme.icon + '<span class="case-tag-label"> ' + esc(theme.label) + '</span>' +
      '</div>' +
    '</div>';

  if (step === 0) {
    /* apresentação — prontuário de papel */
    html +=
      '<div class="chart-paper">' +
        '<div class="case-setting">' + esc(c.setting) + '</div>' +
        '<p class="vignette">' + esc(c.presentation.vignette) + '</p>' +
        (c.presentation.vitals ? '<div class="vitals">' + esc(c.presentation.vitals) + '</div>' : '') +
      '</div>' +
      '<button class="btn-primary" onclick="advanceStep()">Assumir o caso</button>';
  } else if (DECISION_STEPS[step] !== undefined) {
    /* decisão */
    var dIdx = DECISION_STEPS[step];
    var d = c.decisions[dIdx];
    var order = session.order[dIdx];
    html += '<div class="timer-track"><div class="timer-fill" id="timer-fill"></div></div>';
    html += '<div class="decision-prompt">' + esc(d.prompt) + '</div>';
    html += '<div class="options">' +
      order.map(function (optIdx) {
        var sel = session.selected === optIdx ? ' selected' : '';
        return '<button class="option' + sel + '" data-opt="' + optIdx + '" onclick="selectOption(' + optIdx + ')">' +
          esc(d.options[optIdx].text) + '</button>';
      }).join('') +
      '</div>';
    html += '<button class="btn-primary" id="btn-confirm" onclick="confirmDecision()"' +
      (session.selected == null ? ' disabled' : '') + '>Confirmar</button>';
  } else {
    /* revelação */
    var rIdx = REVEAL_STEPS[step];
    var r = c.reveals[rIdx];
    html += '<div class="noted">Anotado. O plantão continua…</div>';
    html +=
      '<div class="reveal-card">' +
        '<div class="reveal-kicker">Nova informação</div>' +
        '<div class="reveal-title">' + esc(r.title) + '</div>' +
        '<p class="reveal-body">' + esc(r.body) + '</p>' +
      '</div>' +
      '<button class="btn-primary" onclick="advanceStep()">Continuar</button>';
  }

  el.innerHTML = html;
  showView('case');
  if (DECISION_STEPS[step] !== undefined) startTimerUI(c.decisions[DECISION_STEPS[step]]);
  else stopTimerUI();
}

/* timer visual — traço fino, muda de cor após o alvo */
var _timerInterval = null;
function startTimerUI(decision) {
  stopTimerUI();
  var target = (decision.timeTarget || SCORE_TIME_TARGET_S) * 1000;
  var fill = $('timer-fill');
  if (!fill) return;
  function tick() {
    var elapsed = Date.now() - session.stepStartedAt;
    var pct = Math.min(100, (elapsed / target) * 100);
    fill.style.width = pct + '%';
    if (elapsed > target) fill.classList.add('over');
  }
  tick();
  _timerInterval = setInterval(tick, 1000);
}
function stopTimerUI() {
  if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; }
}

/* ── RESULTADO ─────────────────────────────────────────────── */
function renderResult(ctx) {
  /* ctx: { caseData, result, streak, frozeNote, dayNumber,
            practice, xpGained, xpTotal, percentileInfo } */
  var el = $('view-result');
  var c = ctx.caseData;
  var r = ctx.result;
  var theme = THEMES[c.theme] || { icon: '🩺', label: '' };

  var sealsRow = ['diag', 'seg', 'rap', 'cond'].map(function (k) {
    return '<div class="seal-card">' +
      '<div class="seal-big seal-' + r.seals[k] + '"></div>' +
      '<div class="seal-name">' + SEAL_NAMES[k] + '</div></div>';
  }).join('');

  /* nota geral 0–10 (destaque palpável no card do diagnóstico) */
  var gradeBlock = '';
  if (typeof ctx.composite === 'number') {
    var grade = ctx.composite / 10;
    var band = gradeBand(grade);
    gradeBlock =
      '<div class="grade-hero grade-' + band + '">' +
        '<div class="grade-num">' + formatGrade(grade) + '<span class="grade-max"> / 10</span></div>' +
        '<div class="grade-word">' + gradeWord(grade) + '</div>' +
      '</div>';
  }

  /* pontuação: XP sempre visível; percentil quando houver dado real */
  var scoreLines = '';
  if (!ctx.practice) {
    scoreLines += '<div class="result-xp">+' + ctx.xpGained + ' XP <span class="result-xp-total">· total ' + ctx.xpTotal + '</span></div>';
  }
  if (ctx.percentileInfo && typeof ctx.percentileInfo.percentile === 'number') {
    scoreLines += '<div class="result-percentile" id="result-pct">Top ' + ctx.percentileInfo.percentile + '% de hoje</div>';
  } else if (ctx.percentileInfo && typeof ctx.percentileInfo.few === 'number') {
    scoreLines += '<div class="result-percentile muted" id="result-pct">Você e mais ' + ctx.percentileInfo.few + ' pessoas jogaram hoje</div>';
  } else if (!ctx.practice) {
    scoreLines += '<div class="result-percentile muted" id="result-pct">Comparando com os plantões de hoje…</div>';
  }

  /* gabarito por decisão */
  var acc = c.decisions.map(function (d, i) {
    var a = r.answers[i] || {};
    var chosen = d.options[a.optionIdx];
    var best = d.options.filter(function (o) { return o.quality === 'best'; })[0];
    var seal = r.perDecision[i];
    var body =
      '<span class="you"><span class="lbl">Você:</span> ' + esc(chosen ? chosen.text : '—') + '</span>' +
      (chosen && chosen.feedback ? '<span class="you">' + esc(chosen.feedback) + '</span>' : '') +
      (chosen !== best && best
        ? '<span class="best"><span class="lbl">Melhor conduta:</span> ' + esc(best.text) + '</span>' +
          (best.feedback ? '<span class="best">' + esc(best.feedback) + '</span>' : '')
        : '');
    return '<details class="acc"' + (seal !== 'g' ? ' open' : '') + '>' +
      '<summary>' + sealDot(seal) + 'Decisão ' + (i + 1) + ' — ' +
        (d.kind === 'initial' ? 'Primeira conduta' : d.kind === 'interpretation' ? 'Interpretação' : 'Conduta final') +
        '<span class="acc-chev">›</span></summary>' +
      '<div class="acc-body">' + body + '</div></details>';
  }).join('');

  /* ações + rodapé variam entre oficial e treino */
  var actions, footer;
  if (ctx.practice) {
    actions =
      '<div class="practice-note">Modo treino — este resultado não conta pra streak, XP nem ranking.</div>' +
      '<button class="btn-primary" onclick="quitCase()">Voltar</button>';
    footer = '';
  } else {
    actions =
      '<button class="btn-primary" onclick="shareCurrentResult()">Compartilhar resultado</button>' +
      '<button class="btn-ghost" onclick="copyCurrentResult()">Copiar texto</button>' +
      '<button class="btn-ghost btn-practice" onclick="startPractice(\'' + c.id + '\')">Jogar de novo (treino)</button>';
    footer =
      '<div class="result-footer">' +
        (ctx.streak > 0
          ? '<div class="result-streak">🔥 ' + ctx.streak + (ctx.streak === 1 ? ' dia' : ' dias') + ' de streak</div>'
          : '') +
        (ctx.frozeNote ? '<div class="result-freeze-note">' + esc(ctx.frozeNote) + '</div>' : '') +
        '<div class="countdown">Próximo caso em <b id="countdown-timer">—</b></div>' +
      '</div>';
  }

  el.innerHTML =
    '<div class="result-wrap">' +
      '<div class="result-kicker">' +
        (ctx.practice ? 'Treino concluído' : 'Plantão encerrado · Caso #' + ctx.dayNumber) +
      '</div>' +
      '<div class="seals-row">' + sealsRow + '</div>' +
      '<div class="result-dx">' +
        gradeBlock +
        '<div class="result-dx-label">' + theme.icon + ' Diagnóstico</div>' +
        '<div class="result-dx-name">' + esc(c.diagnosis) + '</div>' +
        scoreLines +
      '</div>' +
      '<div class="result-actions">' + actions + '</div>' +
      '<div class="debrief-h">Gabarito comentado</div>' +
      acc +
      '<div class="debrief-h">Discussão</div>' +
      '<div class="debrief-card">' +
        '<p>' + esc(c.debrief.summary) + '</p>' +
        '<ul class="pearls">' + c.debrief.pearls.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' +
        '<div class="debrief-ref">' + esc(c.debrief.reference) + '</div>' +
      '</div>' +
      footer +
    '</div>';
  showView('result');
  if (!ctx.practice) startCountdown();
  else stopCountdown();
}

/* atualiza a linha do percentil quando o fetch async resolve */
function updatePercentileLine(info) {
  var el = $('result-pct');
  if (!el) return;
  if (info && typeof info.percentile === 'number') {
    el.className = 'result-percentile';
    el.textContent = 'Top ' + info.percentile + '% de hoje';
  } else if (info && typeof info.few === 'number') {
    el.className = 'result-percentile muted';
    el.textContent = 'Você e mais ' + info.few + ' pessoas jogaram hoje';
  } else {
    el.className = 'result-percentile muted';
    el.textContent = 'Percentil do dia indisponível agora';
  }
}

/* countdown até a próxima meia-noite BRT */
var _countdownInterval = null;
function startCountdown() {
  stopCountdown();
  var el = $('countdown-timer');
  if (!el) return;
  function fmt(n) { return n < 10 ? '0' + n : '' + n; }
  function tick() {
    var ms = msUntilMidnightBRT();
    if (ms <= 0) { location.reload(); return; }
    var h = Math.floor(ms / 3600000);
    var m = Math.floor((ms % 3600000) / 60000);
    var s = Math.floor((ms % 60000) / 1000);
    el.textContent = fmt(h) + ':' + fmt(m) + ':' + fmt(s);
  }
  tick();
  _countdownInterval = setInterval(tick, 1000);
}
function stopCountdown() {
  if (_countdownInterval) { clearInterval(_countdownInterval); _countdownInterval = null; }
}

window.showView = showView;
window.toast = toast;
window.openModal = openModal;
window.closeModal = closeModal;
window.renderHeaderStats = renderHeaderStats;
window.uiCreateGroup = uiCreateGroup;
window.uiJoinGroup = uiJoinGroup;
window.uiLeaveGroup = uiLeaveGroup;
window.uiCopyInvite = uiCopyInvite;
window.renderProfile = renderProfile;
window.uiEditName = uiEditName;
window.uiSaveName = uiSaveName;