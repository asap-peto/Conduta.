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

  /* card slim: saudação + métricas inline em cima, semana embaixo */
  var week = (typeof lastSevenDays === 'function') ? lastSevenDays() : [];
  var weekDots = week.map(function (d) {
    var cls = d.played ? ('day-' + d.seal) : (d.isToday ? 'day-today' : 'day-empty');
    return '<span class="week-dot ' + cls + '"></span>';
  }).join('');
  var streakChip =
    '<span class="metric metric-streak' + (streak > 0 ? '' : ' is-off') + '">' +
      '<span class="flame">🔥</span>' +
      '<b>' + streak + '</b>' +
      '<span class="m-unit">' + (streak === 1 ? 'dia' : 'dias') + '</span>' +
    '</span>';
  var greetCard =
    '<div class="greet-card">' +
      '<div class="greet-top">' +
        '<div class="greet-hello">' +
          '<span class="greet-oi">Olá,</span>' +
          '<span class="greet-name">' + esc(getPlayerName()) + ' <span class="wave">👋</span></span>' +
        '</div>' +
        streakChip +
      '</div>' +
      '<div class="greet-week">' +
        '<div class="greet-metrics">' +
          '<span class="metric"><span class="m-ico">⚡</span><b>' + (player.xp || 0) + '</b><span class="m-unit">XP</span></span>' +
          '<span class="metric"><span class="m-ico">🏅</span><b>' + (player.bestStreak || 0) + '</b><span class="m-unit">rec</span></span>' +
        '</div>' +
        '<div class="week-dots">' + weekDots + '</div>' +
      '</div>' +
    '</div>';

  if (!c) {
    el.innerHTML = '<div class="home-wrap">' +
        '<div class="home-header">' + greetCard + '</div>' +
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
      '<div class="home-header">' + greetCard + '</div>' +
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
  var loggedIn = isLoggedIn();
  var username = getUsername();

  // identidade: @username (imutável, se houver) + display name editável
  var idBlock =
    (loggedIn && username ? '<div class="profile-username">@' + esc(username) + '</div>' : '') +
    '<div class="profile-id" id="profile-id">' +
      '<span class="profile-name">' + esc(name) + '</span>' +
      '<button class="btn-link" onclick="uiEditName()">editar nome</button>' +
    '</div>';

  var account;
  if (!loggedIn) {
    account =
      '<div class="account-card"><div class="account-line">Entre pra salvar seu progresso e participar de ligas.</div>' +
      '<button class="btn-primary btn-slim" onclick="openLoginModal()">Entrar / criar conta</button></div>';
  } else if (!username) {
    account =
      '<div class="account-card">' +
        '<div class="account-line">Escolha seu <b>@username</b> — <b>definitivo</b> e único. É ele que aparece nas ligas.</div>' +
        '<div class="league-actions">' +
          '<input class="text-input" id="uname-input" maxlength="20" placeholder="username" autocapitalize="none" spellcheck="false" style="text-transform:lowercase">' +
          '<button class="btn-primary btn-slim" onclick="uiCreateUsername()">Criar</button>' +
        '</div>' +
        '<div class="account-line" style="margin-top:12px">' + esc(currentUser.email || '') + ' · <button class="btn-link" onclick="logout()">sair</button></div>' +
      '</div>';
  } else {
    account =
      '<div class="account-card"><div class="account-line">Conta: <b>' + esc(currentUser.email || '') + '</b></div>' +
      '<button class="btn-ghost" onclick="logout()">Sair da conta</button></div>';
  }

  el.innerHTML =
    '<div class="tab-wrap">' +
      '<div class="tab-kicker">Perfil</div>' +
      '<div class="profile-head">' +
        '<div class="profile-avatar">' + esc(initial) + '</div>' +
        '<div class="profile-idwrap">' + idBlock + '</div>' +
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

async function uiCreateUsername() {
  var inp = $('uname-input');
  var u = (inp ? inp.value : '').trim().toLowerCase();
  if (!/^[a-z0-9_]{3,20}$/.test(u)) { toast('Username: 3–20 caracteres (a–z, 0–9, _).'); return; }
  toast('Criando…');
  var res = await createProfile(u, getPlayerName());
  if (res.error) { toast('Não deu: ' + res.error); return; }
  applyProfile(res.username, res.display_name);
  renderProfile();
  toast('Username @' + res.username + ' criado!');
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

/* ── LIGA (por conta, com admin) ───────────────────────────── */
var currentLeague = null;   // liga aberta no detalhe (ou null = hub)
var _myLeaguesCache = [];

function renderLeague() {
  var el = $('view-league');

  // exige conta
  if (!isLoggedIn()) {
    el.innerHTML =
      '<div class="tab-wrap">' +
        '<div class="tab-kicker">Liga</div>' +
        '<h1 class="tab-title">Jogue contra<br>quem você conhece.</h1>' +
        '<p class="tab-sub">As ligas comparam sua pontuação da semana com a turma.</p>' +
        '<div class="empty-card">Você precisa de uma conta pra criar ou participar de ligas.' +
          '<div style="height:14px"></div>' +
          '<button class="btn-primary btn-slim" onclick="openLoginModal()">Entrar / criar conta</button>' +
        '</div>' +
      '</div>';
    showView('league');
    return;
  }
  // exige username
  if (!getUsername()) {
    el.innerHTML =
      '<div class="tab-wrap">' +
        '<div class="tab-kicker">Liga</div>' +
        '<h1 class="tab-title">Falta seu username.</h1>' +
        '<p class="tab-sub">Nas ligas você aparece pelo seu @username. Crie o seu no Perfil pra continuar.</p>' +
        '<button class="btn-primary" onclick="showTab(\'perfil\')">Ir pro Perfil</button>' +
      '</div>';
    showView('league');
    return;
  }
  // detalhe de uma liga
  if (currentLeague) { renderLeagueDetail(); return; }

  // HUB: minhas ligas + criar/entrar
  el.innerHTML =
    '<div class="tab-wrap">' +
      '<div class="tab-kicker">Liga</div>' +
      '<h1 class="tab-title">Suas ligas</h1>' +
      '<div id="my-leagues"><div class="league-loading">Carregando…</div></div>' +
      '<div class="card-dark league-form">' +
        '<label class="fld-label">Entrar por código</label>' +
        '<div class="league-actions">' +
          '<input class="text-input" id="lg-code" maxlength="6" placeholder="CÓDIGO" style="text-transform:uppercase" autocapitalize="characters">' +
          '<button class="btn-ghost" onclick="uiJoinLeague()">Entrar</button>' +
        '</div>' +
        '<div class="login-divider"><span>ou</span></div>' +
        '<label class="fld-label">Criar uma liga (você vira admin)</label>' +
        '<div class="league-actions">' +
          '<input class="text-input" id="lg-name" maxlength="40" placeholder="Nome (ex.: Turma 74)">' +
          '<button class="btn-primary btn-slim" onclick="uiCreateLeague()">Criar</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  showView('league');

  myLeagues().then(function (list) {
    var box = $('my-leagues');
    if (!box) return;
    if (!list) { box.innerHTML = '<div class="empty-card">Ligas indisponíveis agora.</div>'; return; }
    _myLeaguesCache = list;
    if (!list.length) { box.innerHTML = '<div class="empty-card">Você ainda não está em nenhuma liga — crie uma ou entre com um código.</div>'; return; }
    box.innerHTML = list.map(function (l, i) {
      var tag = l.is_owner ? ' <span class="lg-you-tag">dono</span>' : (l.role === 'admin' ? ' <span class="lg-you-tag">admin</span>' : '');
      return '<button class="arch-item" onclick="uiOpenLeague(' + i + ')">' +
        '<div class="arch-icon">🏆</div>' +
        '<div class="arch-info">' +
          '<div class="arch-title">' + esc(l.name) + tag + '</div>' +
          '<div class="arch-sub">' + l.members + (l.members === 1 ? ' membro' : ' membros') + ' · ' + esc(l.code) + '</div>' +
        '</div>' +
        '<div class="arch-chev">' + icon('chevron', 18) + '</div>' +
      '</button>';
    }).join('');
  });
}

function uiOpenLeague(i) { currentLeague = _myLeaguesCache[i]; renderLeagueDetail(); }
function uiCloseLeague() { currentLeague = null; renderLeague(); }

function renderLeagueDetail() {
  var l = currentLeague;
  var el = $('view-league');
  var isAdmin = l.role === 'admin' || l.is_owner;

  el.innerHTML =
    '<div class="tab-wrap">' +
      '<button class="back-btn" onclick="uiCloseLeague()">' + icon('back', 18) + ' Ligas</button>' +
      '<div class="tab-kicker">Liga · semana atual</div>' +
      '<h1 class="tab-title">' + esc(l.name) + '</h1>' +
      '<div class="league-invite">Código: <b>' + esc(l.code) + '</b>' +
        '<button class="btn-link" onclick="uiCopyInvite()">convidar</button></div>' +
      '<div id="league-board"><div class="league-loading">Carregando ranking…</div></div>' +
      (isAdmin ? '<div class="debrief-h">Membros (admin)</div><div id="league-admin"><div class="league-loading">…</div></div>' : '') +
      '<div class="league-foot">' +
        (isAdmin ? '<button class="btn-link" onclick="uiRenameLeague()">renomear</button> · ' : '') +
        (l.is_owner
          ? '<button class="btn-link danger" onclick="uiDeleteLeague()">excluir liga</button>'
          : '<button class="btn-link" onclick="uiLeaveLeague()">sair da liga</button>') +
      '</div>' +
    '</div>';
  showView('league');

  leagueLeaderboard(l.id).then(function (rows) {
    var board = $('league-board');
    if (!board) return;
    if (!rows) { board.innerHTML = '<div class="empty-card">Ranking indisponível agora.</div>'; return; }
    if (!rows.length) { board.innerHTML = '<div class="empty-card">Ninguém pontuou ainda esta semana. Joguem o caso de hoje!</div>'; return; }
    board.innerHTML = rows.map(function (r, i) {
      return '<div class="lg-row' + (r.is_you ? ' you' : '') + '">' +
        '<div class="lg-rank">' + (i + 1) + '</div>' +
        '<div class="lg-name">' + esc(r.display_name) + ' <span class="lg-handle">@' + esc(r.username) + '</span>' + (r.is_you ? ' <span class="lg-you-tag">você</span>' : '') + '</div>' +
        '<div class="lg-days">' + r.days + (r.days === 1 ? ' caso' : ' casos') + '</div>' +
        '<div class="lg-pts">' + r.pts + ' pts</div>' +
      '</div>';
    }).join('');
  });

  if (isAdmin) {
    leagueMembers(l.id).then(function (members) {
      var box = $('league-admin');
      if (!box) return;
      if (!members || !members.length) { box.innerHTML = '<div class="empty-card">—</div>'; return; }
      box.innerHTML = members.map(function (m) {
        var canRemove = !m.is_you && m.role !== 'admin';
        return '<div class="mem-row">' +
          '<span class="mem-name">' + esc(m.display_name) + ' <span class="lg-handle">@' + esc(m.username) + '</span>' + (m.role === 'admin' ? ' <span class="lg-you-tag">admin</span>' : '') + '</span>' +
          (canRemove ? '<button class="btn-link danger" onclick="uiRemoveMember(\'' + m.member_id + '\')">remover</button>' : '') +
        '</div>';
      }).join('');
    });
  }
}

async function uiCreateLeague() {
  var name = ($('lg-name').value || '').trim();
  if (!name) { toast('Dê um nome à liga.'); return; }
  toast('Criando…');
  var res = await createLeague(name);
  if (res.error) { toast('Não deu: ' + res.error); return; }
  toast('Liga criada! Código ' + res.code);
  currentLeague = { id: res.id, name: res.name, code: res.code, role: 'admin', is_owner: true, members: 1 };
  renderLeagueDetail();
}

async function uiJoinLeague() {
  var code = ($('lg-code').value || '').trim().toUpperCase();
  if (code.length !== 6) { toast('O código tem 6 caracteres.'); return; }
  toast('Entrando…');
  var res = await joinLeague(code);
  if (res.error) { toast('Não deu: ' + res.error); return; }
  toast('Você entrou em ' + res.name + '!');
  currentLeague = { id: res.id, name: res.name, code: code, role: 'member', is_owner: false, members: 0 };
  renderLeagueDetail();
}

async function uiCopyInvite() {
  if (!currentLeague) return;
  var text = 'Entra na minha liga no Conduta — um caso clínico por dia. Código: ' + currentLeague.code + ' · conduta.cc';
  try { await navigator.clipboard.writeText(text); toast('Convite copiado!'); }
  catch (e) { toast('Código: ' + currentLeague.code); }
}

async function uiLeaveLeague() {
  if (!currentLeague) return;
  var ok = await leaveLeague(currentLeague.id);
  toast(ok ? 'Você saiu da liga.' : 'Não deu pra sair.');
  currentLeague = null; renderLeague();
}

async function uiDeleteLeague() {
  if (!currentLeague) return;
  var ok = await deleteLeague(currentLeague.id);
  toast(ok ? 'Liga excluída.' : 'Não deu pra excluir.');
  currentLeague = null; renderLeague();
}

async function uiRenameLeague() {
  if (!currentLeague) return;
  var name = window.prompt('Novo nome da liga:', currentLeague.name);
  if (name == null) return;
  name = name.trim();
  if (!name) return;
  var res = await renameLeague(currentLeague.id, name);
  if (res.error) { toast('Não deu: ' + res.error); return; }
  currentLeague.name = res.name;
  toast('Renomeada!');
  renderLeagueDetail();
}

async function uiRemoveMember(memberId) {
  if (!currentLeague) return;
  var res = await removeMember(currentLeague.id, memberId);
  if (res.error) { toast('Não deu: ' + res.error); return; }
  toast('Membro removido.');
  renderLeagueDetail();
}

/* ── TELA DO CASO (motor de stages) ────────────────────────── */
function renderCase() {
  var el = $('view-case');
  var c = getCaseById(session.caseId);
  var stages = c.stages;
  var idx = session.stageIndex;

  el.innerHTML = renderCaseTop(c, stages, idx) + renderStageBody(c, stages, idx);
  showView('case');

  var stage = idx >= 0 ? stages[idx] : null;
  if (stage && stage.type === 'decision') startTimerUI(stage); else stopTimerUI();
  if (stage && stage.type === 'diagnosis' && !session.stageAnswers[idx]) {
    var di = $('dx-input'); if (di) di.focus();
  }
}

/* topo: sair + stepper (só milestones, sem contar reveals) + tema */
function renderCaseTop(c, stages, idx) {
  var theme = THEMES[c.theme] || { icon: '🩺', label: '' };
  var segs = '';
  stages.forEach(function (s, i) {
    if (s.type === 'reveal') return;
    var cls = i < idx ? 'done' : i === idx ? 'current' : '';
    segs += '<div class="step-seg ' + cls + '"></div>';
  });
  return '<div class="case-top">' +
    '<button class="case-quit" onclick="quitCase()" aria-label="Sair">✕</button>' +
    '<div class="stepper">' + segs + '</div>' +
    '<div class="case-tag">' +
      (session.practice ? '<span class="practice-tag">Treino</span> ' : '') +
      theme.icon + '<span class="case-tag-label"> ' + esc(theme.label) + '</span>' +
    '</div>' +
  '</div>';
}

function renderStageBody(c, stages, idx) {
  if (idx < 0) return renderPresentation(c);
  var stage = stages[idx];
  if (!stage) return '';
  if (stage.type === 'diagnosis') return renderDiagnosisStage(c, stage, idx);
  if (stage.type === 'decision')  return renderDecisionStage(c, stage, idx);
  if (stage.type === 'reveal')    return renderRevealStage(c, stage, idx);
  return '';
}

function renderPresentation(c) {
  return '<div class="chart-paper">' +
      '<div class="case-setting">' + esc(c.setting) + '</div>' +
      '<p class="vignette">' + esc(c.presentation.vignette) + '</p>' +
      (c.presentation.vitals ? '<div class="vitals">' + esc(c.presentation.vitals) + '</div>' : '') +
    '</div>' +
    '<button class="btn-primary" onclick="assumeCase()">Assumir o caso</button>';
}

/* diagnóstico digitado — input + autocomplete + pistas */
function renderDiagnosisStage(c, stage, idx) {
  var answered = session.stageAnswers[idx];
  var head =
    '<div class="chart-paper">' +
      '<div class="case-setting">' + esc(c.setting) + '</div>' +
      '<p class="vignette">' + esc(c.presentation.vignette) + '</p>' +
      (c.presentation.vitals ? '<div class="vitals">' + esc(c.presentation.vitals) + '</div>' : '') +
    '</div>';

  if (answered) {
    var msg = answered.correct
      ? (answered.attemptsUsed <= 1
          ? '✔ Você reconheceu a hipótese de primeira.'
          : '✔ Você chegou lá — em ' + answered.attemptsUsed + ' tentativa(s).')
      : '✗ A principal hipótese era:';
    return head +
      '<div class="dx-result ' + (answered.correct ? 'ok' : 'miss') + '">' +
        '<div class="dx-result-msg">' + msg + '</div>' +
        '<div class="dx-result-answer">' + esc(stage.canonical) + '</div>' +
      '</div>' +
      '<button class="btn-primary" onclick="advanceStage()">Continuar</button>';
  }

  var attemptN = session.dxAttempts.length + 1;
  var max = stage.maxAttempts || 3;
  var hints = stage.hints || [];
  var shown = Math.min(session.dxAttempts.length, hints.length);
  var pistas = '';
  for (var h = 0; h < shown; h++) {
    pistas += '<div class="dx-hint">💡 ' + esc(hints[h]) + '</div>';
  }
  var partial = session.dxPartial
    ? '<div class="dx-partial">Você reconheceu a síndrome — tente especificar melhor.</div>'
    : '';

  return head +
    '<div class="dx-prompt">Qual é a principal hipótese diagnóstica?</div>' +
    '<div class="dx-attempts">Tentativa ' + attemptN + ' de ' + max + '</div>' +
    pistas +
    partial +
    '<div class="dx-field">' +
      '<input class="text-input" id="dx-input" autocomplete="off" autocapitalize="none" spellcheck="false" ' +
        'placeholder="Digite o diagnóstico…" oninput="uiDxInput()" onkeydown="uiDxKey(event)">' +
      '<div class="dx-suggest" id="dx-suggest" style="display:none"></div>' +
    '</div>' +
    '<button class="btn-primary" onclick="uiSubmitDx()">Confirmar hipótese</button>';
}

/* decisão de múltipla escolha */
function renderDecisionStage(c, stage, idx) {
  var order = session.order[idx];
  return '<div class="timer-track"><div class="timer-fill" id="timer-fill"></div></div>' +
    '<div class="decision-prompt">' + esc(stage.prompt) + '</div>' +
    '<div class="options">' +
      order.map(function (optIdx) {
        var sel = session.selected === optIdx ? ' selected' : '';
        return '<button class="option' + sel + '" data-opt="' + optIdx + '" onclick="selectOption(' + optIdx + ')">' +
          esc(stage.options[optIdx].text) + '</button>';
      }).join('') +
    '</div>' +
    '<button class="btn-primary" id="btn-confirm" onclick="confirmDecision()"' +
      (session.selected == null ? ' disabled' : '') + '>Confirmar</button>';
}

/* revelação */
function renderRevealStage(c, stage, idx) {
  return '<div class="noted">Anotado. O plantão continua…</div>' +
    '<div class="reveal-card">' +
      '<div class="reveal-kicker">Nova informação</div>' +
      '<div class="reveal-title">' + esc(stage.title) + '</div>' +
      '<p class="reveal-body">' + esc(stage.body) + '</p>' +
    '</div>' +
    '<button class="btn-primary" onclick="advanceReveal()">Continuar</button>';
}

/* autocomplete do diagnóstico */
var _dxSug = [];
function uiDxInput() {
  var inp = $('dx-input'); var box = $('dx-suggest');
  if (!inp || !box) return;
  _dxSug = (typeof searchDiagnoses === 'function') ? searchDiagnoses(inp.value) : [];
  if (!_dxSug.length) { box.style.display = 'none'; box.innerHTML = ''; return; }
  box.innerHTML = _dxSug.map(function (d, i) {
    return '<button type="button" class="dx-sug" onclick="uiPickDx(' + i + ')">' + esc(d) + '</button>';
  }).join('');
  box.style.display = '';
}
function uiPickDx(i) {
  var inp = $('dx-input'); var box = $('dx-suggest');
  if (inp && _dxSug[i] != null) inp.value = _dxSug[i];
  if (box) box.style.display = 'none';
  if (inp) inp.focus();
}
function uiDxKey(e) {
  if (e.key === 'Enter') { e.preventDefault(); uiSubmitDx(); }
}
function uiSubmitDx() {
  var inp = $('dx-input');
  submitDiagnosis(inp ? inp.value : '');
}

/* timer visual — traço fino, muda de cor após o alvo */
var _timerInterval = null;
function startTimerUI(decision) {
  stopTimerUI();
  var target = (decision.timeTarget || SCORE_TIME_TARGET_S) * 1000;
  var fill = $('timer-fill');
  if (!fill) return;
  function tick() {
    var elapsed = Date.now() - session.stageStartedAt;
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

  /* linha da hipótese diagnóstica (quando houve etapa) */
  var hypoBlock = '';
  if (r.dx) {
    var hSeal = r.dx.correct ? (r.dx.attemptsUsed <= 1 ? 'g' : 'y') : 'r';
    var hMsg = r.dx.correct
      ? (r.dx.attemptsUsed <= 1 ? 'Reconheceu na 1ª tentativa' : 'Acertou em ' + r.dx.attemptsUsed + ' tentativas')
      : 'Não reconheceu (' + esc(c.diagnosis) + ')';
    hypoBlock =
      '<div class="skill-line">' + sealDot(hSeal) +
        '<span class="skill-label">Hipótese diagnóstica</span>' +
        '<span class="skill-val">' + hMsg + '</span></div>';
  }

  /* gabarito por decisão (a partir dos stages) */
  var acc = (r.decisions || []).map(function (d, i) {
    var chosen = d.chosen, best = d.best, seal = d.seal;
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
      (hypoBlock ? '<div class="skill-block">' + hypoBlock + '</div>' : '') +
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
window.renderProfile = renderProfile;
window.uiEditName = uiEditName;
window.uiSaveName = uiSaveName;
window.uiCreateUsername = uiCreateUsername;
window.uiDxInput = uiDxInput;
window.uiPickDx = uiPickDx;
window.uiDxKey = uiDxKey;
window.uiSubmitDx = uiSubmitDx;
window.uiOpenLeague = uiOpenLeague;
window.uiCloseLeague = uiCloseLeague;
window.uiCreateLeague = uiCreateLeague;
window.uiJoinLeague = uiJoinLeague;
window.uiCopyInvite = uiCopyInvite;
window.uiLeaveLeague = uiLeaveLeague;
window.uiDeleteLeague = uiDeleteLeague;
window.uiRenameLeague = uiRenameLeague;
window.uiRemoveMember = uiRemoveMember;