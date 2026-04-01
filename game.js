/* ============================================================
   game.js — Conduta.
   Responsabilidade: estado do jogo, lógica de validação,
   localStorage, seleção do caso do dia, compartilhamento
   e inicialização geral.
   Depende de: CASES e ALL_DIAGNOSES (cases.js)
               funções de UI (ui.js)
   ============================================================ */

/* ── CONSTANTES ──────────────────────────────────────────── */
var MAX = 5;                     // máximo de tentativas
var EPOCH = '2026-01-01';        // dia #1 do Conduta.

/* ── ESTADO GLOBAL — JOGO PRINCIPAL ─────────────────────── */
var gs = {
  idx:      0,
  attempts: 0,
  guesses:  [],
  won:      false,
  done:     false
};

var stats = {
  played: 0,
  wins:   0,
  streak: 0,
  best:   0,
  dist:   { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 0: 0 }
};

var acSel = -1;   // índice selecionado no autocomplete principal

/* ── ESTADO GLOBAL — JOGO DO ARQUIVO ────────────────────── */
var amState = {
  globalDay: 0,
  cIdx:      0,
  attempts:  0,
  guesses:   [],
  won:       false,
  done:      false
};

var amAcSel = -1; // índice selecionado no autocomplete do arquivo

/* ── VARIÁVEL COMPARTILHADA ENTRE JS E UI ────────────────── */
var todayGlobal = 0; // dia global de hoje (calculado em init)

/* ── FUNÇÕES DE DATA ─────────────────────────────────────── */
function globalDay(date) {
  var d0  = new Date(2026, 0, 1); // meia-noite LOCAL — evita bug de fuso horário
  var now = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((now - d0) / 86400000);
}

function dateFromGlobalDay(n) {
  var d = new Date(2026, 0, 1); // meia-noite LOCAL
  d.setDate(d.getDate() + n);
  return d;
}

function dayKey() {
  var d = new Date();
  return d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
}

function keyFromDate(d) {
  return d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
}

function dayIdx() {
  return globalDay(new Date()) % CASES.length;
}

/* ── PERSISTÊNCIA ────────────────────────────────────────── */
function loadState() {
  // Carregamento síncrono inicial (localStorage) — rápido e sem bloqueio
  try {
    var s = loadProgressSync('conduta_stats');
    if (s) stats = s;

    var g = loadProgressSync('conduta_game_' + dayKey());
    if (g) gs = g;
  } catch(e) {}
}

// Carregamento assíncrono (Supabase se logado)
async function loadStateAsync() {
  try {
    var s = await loadProgress('conduta_stats');
    if (s) stats = s;

    var g = await loadProgress('conduta_game_' + dayKey());
    if (g) gs = g;
  } catch(e) {}
}

function saveState() {
  // Fire-and-forget: salva no localStorage imediatamente + Supabase em background
  saveProgress('conduta_stats', stats);
  saveProgress('conduta_game_' + dayKey(), gs);
}

/* ── LÓGICA DE VALIDAÇÃO ─────────────────────────────────── */
// norm() está definida em ui.js (compartilhada)
function checkGuessFor(input, cIdx) {
  var c    = CASES[cIdx];
  var inp  = norm(input);
  var diag = norm(c.diagnosis);

  if (inp === diag) return true;

  for (var i = 0; i < c.aliases.length; i++) {
    var na = norm(c.aliases[i]);
    if (inp === na)                            return true;
    if (na.includes(inp) && inp.length > 5)   return true;
  }

  if (diag.includes(inp) && inp.length > 8) return true;

  return false;
}

/* ── CONFETTI ────────────────────────────────────────────── */
function launchConfetti() {
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  var colors = ['#c8ff00','#9b4dca','#ff6b6b','#4ecdc4','#ffe66d','#ffffff','#a78bfa'];
  var pieces = [];
  for (var i = 0; i < 120; i++) {
    pieces.push({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height - canvas.height,
      w:  Math.random() * 9 + 4,
      h:  Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 4 + 2,
      angle: Math.random() * 360,
      va: (Math.random() - 0.5) * 7
    });
  }

  var frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(function(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = frame < 90 ? 1 : Math.max(0, 1 - (frame - 90) / 30);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.x += p.vx; p.y += p.vy; p.angle += p.va;
    });
    frame++;
    if (frame < 120) requestAnimationFrame(draw);
    else canvas.remove();
  }
  draw();
}

/* ── COMPARTILHAMENTO ────────────────────────────────────── */
function buildGrid() {
  var grid = gs.guesses.map(function(g) { return g.correct ? '🟩' : '🟥'; }).join('');
  if (!gs.won) grid += '⬜'.repeat(MAX - gs.attempts);
  return grid;
}

function buildShare() {
  var date = new Date().toLocaleDateString('pt-BR');
  var res  = gs.won ? (gs.attempts + '/' + MAX) : ('X/' + MAX);
  return '🩺 Conduta — ' + date + '\nCaso #' + (todayGlobal + 1) + ' — ' + res + '\n\n' + buildGrid() + '\n\nhttps://conduta.cc/';
}

function shareWhatsApp() {
  window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(window._shareText), '_blank');
}

function shareTelegram() {
  window.open('https://t.me/share/url?url=https://conduta.cc/&text=' + encodeURIComponent(window._shareText), '_blank');
}

function shareTwitter() {
  window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(window._shareText), '_blank');
}

function copyShare() {
  navigator.clipboard.writeText(window._shareText).then(function() {
    toast('Copiado!');
    var b = document.getElementById('copy-btn');
    if (b) b.textContent = '✓ Copiado';
  });
}

/* ── SUBMIT — JOGO PRINCIPAL ─────────────────────────────── */
function submitGuess() {
  if (gs.done) return;

  var inp = document.getElementById('diagnosis-input');
  var val = inp.value.trim();
  if (!val || val.length < 2) return;

  hideAC();

  var correct = checkGuessFor(val, gs.idx);
  gs.guesses.push({ text: val, correct: correct });
  gs.attempts++;

  if (correct) {
    gs.won  = true;
    gs.done = true;
    stats.played++;
    stats.wins++;
    stats.streak++;
    stats.best = Math.max(stats.best, stats.streak);
    stats.dist[gs.attempts] = (stats.dist[gs.attempts] || 0) + 1;
    processBadgesOnWin(gs.attempts, CASES[gs.idx].category);
    setTimeout(launchConfetti, 400);
  } else {
    // animação de erro
    inp.classList.add('shake');
    setTimeout(function() { inp.classList.remove('shake'); }, 400);

    if (gs.attempts >= MAX) {
      gs.done = true;
      stats.played++;
      stats.streak = 0;
      stats.dist[0] = (stats.dist[0] || 0) + 1;
    }
  }

  inp.value = '';
  renderDots();
  renderCase();
  renderGuesses();

  if (gs.done) {
    setTimeout(function() {
      renderResult();
      document.getElementById('input-wrap').style.display = 'none';
    }, 400);
  }

  saveState();
}

/* ── SUBMIT — JOGO DO ARQUIVO ────────────────────────────── */
function archiveSubmitGuess() {
  if (amState.done) return;

  var inp = document.getElementById('am-input');
  var val = inp.value.trim();
  if (!val || val.length < 2) return;

  hideArchiveAC();

  var correct = checkGuessFor(val, amState.cIdx);
  amState.guesses.push({ text: val, correct: correct });
  amState.attempts++;

  if (correct) {
    amState.won  = true;
    amState.done = true;
  } else {
    if (amState.attempts >= MAX) amState.done = true;
  }

  inp.value = '';
  archiveRenderDots();
  archiveRenderCase();
  archiveRenderGuesses();

  if (amState.done) {
    setTimeout(function() {
      archiveRenderResult();
      document.getElementById('am-input-wrap').style.display = 'none';
    }, 400);
  }

  archiveSaveGame();
}

/* ── PERSISTÊNCIA — ARQUIVO ──────────────────────────────── */
function archiveSaveGame() {
  try {
    var cDate = dateFromGlobalDay(amState.globalDay);
    var key   = keyFromDate(cDate);
    // Fire-and-forget: localStorage + Supabase
    saveProgress('conduta_am_' + key, amState);
  } catch(e) {}
}

/* ── ABRIR / FECHAR CASO DO ARQUIVO ─────────────────────── */
function openArchiveCase(gDay) {
  if (gDay >= todayGlobal) return; // proteção: não revela o caso de hoje

  var cDate = dateFromGlobalDay(gDay);
  var key   = keyFromDate(cDate);
  var cIdx  = gDay % CASES.length;
  var c     = CASES[cIdx];

  amState = {
    globalDay: gDay,
    cIdx:      cIdx,
    attempts:  0,
    guesses:   [],
    won:       false,
    done:      false
  };

  try {
    var savedSync = loadProgressSync('conduta_am_' + key);
    if (savedSync) amState = Object.assign(amState, savedSync);
  } catch(e) {}

  var dateStr = cDate.toLocaleDateString('pt-BR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  document.getElementById('am-title').textContent = 'Caso #' + (gDay + 1);
  document.getElementById('am-sub').textContent   = dateStr + ' · ' + c.category;

  var modal = document.getElementById('archive-modal');
  modal.classList.add('open');
  modal.scrollTop = 0;

  archiveRenderDots();
  archiveRenderCase();
  archiveRenderGuesses();

  var amResult = document.getElementById('am-result-card');
  var amInputW = document.getElementById('am-input-wrap');
  var amInp    = document.getElementById('am-input');

  if (amState.done) {
    archiveRenderResult();
    amInputW.style.display = 'none';
  } else {
    amResult.classList.remove('show');
    amResult.innerHTML = '';
    amInputW.style.display = 'block';
  }

  amInp.value    = '';
  amInp.oninput  = archiveOnInput;
  amInp.onkeydown = archiveOnKey;
}

function closeArchiveModal() {
  document.getElementById('archive-modal').classList.remove('open');
  renderArchiveList();
}

/* ── TOGGLE ARQUIVO ──────────────────────────────────────── */
var _currentTab = 'hoje';

function toggleArquivo() {
  switchTab(_currentTab === 'hoje' ? 'arquivo' : 'hoje');
}

/* ── TROCAR TABS (hoje / arquivo) ────────────────────────── */
function switchTab(tab) {
  _currentTab = tab;
  var gameView    = document.getElementById('game-view');
  var archiveView = document.getElementById('archive-view');
  var archiveHdr  = document.querySelector('.archive-header');
  var btnArquivo  = document.getElementById('btn-arquivo');

  if (tab === 'hoje') {
    gameView.classList.remove('hidden');
    archiveView.classList.remove('show');
    if (archiveHdr) archiveHdr.style.display = 'none';
    if (btnArquivo) {
      btnArquivo.style.background   = '';
      btnArquivo.style.borderColor  = '';
      btnArquivo.style.color        = '';
    }
  } else {
    gameView.classList.add('hidden');
    archiveView.classList.add('show');
    if (archiveHdr) archiveHdr.style.display = 'flex';
    if (btnArquivo) {
      btnArquivo.style.background   = 'var(--bg3)';
      btnArquivo.style.borderColor  = 'var(--lilac)';
      btnArquivo.style.color        = 'var(--lime)';
    }
    renderArchiveList();
  }
}

/* ── INICIALIZAÇÃO ───────────────────────────────────────── */
function init() {
  // Oculta o cabeçalho do arquivo ao carregar
  var archiveHdr = document.querySelector('.archive-header');
  if (archiveHdr) archiveHdr.style.display = 'none';

  loadState();

  todayGlobal = globalDay(new Date());
  gs.idx      = dayIdx();

  // Preenche cabeçalho
  document.getElementById('case-num').textContent = '#' + (todayGlobal + 1);
  document.getElementById('case-tag').textContent = '🩺 Caso #' + (todayGlobal + 1);
  document.getElementById('today-date').textContent = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  // Renderiza estado inicial
  renderDots();
  renderCase();
  renderGuesses();

  // Se o jogo de hoje já foi concluído, exibe resultado direto
  if (gs.done) {
    renderResult();
    document.getElementById('input-wrap').style.display = 'none';
  }

  // Registra eventos do input principal
  var inp = document.getElementById('diagnosis-input');
  inp.addEventListener('input',   onInput);
  inp.addEventListener('keydown', onKey);

  // Esconde input section se o jogo já acabou
  if (gs.done) {
    var inputSection = document.getElementById('input-wrap').closest('.input-section');
    if (inputSection) inputSection.querySelector('.input-hint').style.display = 'none';
  }

  // Auto-abrir "Como jogar" na primeira visita
  if (!localStorage.getItem('conduta_visited')) {
    localStorage.setItem('conduta_visited', '1');
    setTimeout(function() { openModal('how'); }, 800);
  }
}

/* ── TIMER COUNTDOWN PARA O PRÓXIMO CASO ─────────────────── */
function startTimer() {
  function updateTimer() {
    var el = document.getElementById('timer-badge');
    if (!el) return;
    var now      = new Date();
    var midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    var diff = midnight - now;
    var h    = Math.floor(diff / 3600000);
    var m    = Math.floor((diff % 3600000) / 60000);
    var s    = Math.floor((diff % 60000) / 1000);
    var pad  = function(n) { return n < 10 ? '0' + n : '' + n; };
    var time = h > 0
      ? pad(h) + ':' + pad(m) + ':' + pad(s)
      : pad(m) + ':' + pad(s);
    el.textContent = '🔥 ' + time + ' restando';
  }
  updateTimer();
  setInterval(updateTimer, 1000);
}

// Inicia quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);

/* ── PWA: registro do service worker ────────────────────── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').catch(function() {});
  });
}
