/* ============================================================
   game.js — Conduta.
   Controller: inicialização, roteamento de views, motor de jogo
   por modo (clássica, imagem, triagem, rapidfire, plantão, caso raro).
   ============================================================ */

// ── ESTADO ATUAL DA VIEW ──────────────────────────────────
var currentView = 'boot';
var playSession = null;  // estado da partida em curso

const STORAGE_KEY_PLAYER = 'conduta_player_v2';

function clearPlayAsyncTasks(session) {
  const target = session || playSession;
  if (!target || !target.subStates) return;
  if (target.subStates.rfInterval) {
    clearInterval(target.subStates.rfInterval);
    target.subStates.rfInterval = null;
  }
  if (target.subStates.rfAdvanceTimeout) {
    clearTimeout(target.subStates.rfAdvanceTimeout);
    target.subStates.rfAdvanceTimeout = null;
  }
}

// ── BOOT ──────────────────────────────────────────────────
async function boot() {
  // Espera DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
    return;
  }

  renderBootMessage('Carregando casos do plantão...');

  try {
    await ensureLevelsLoaded();
  } catch (err) {
    renderBootError(err);
    return;
  }

  // Carrega player do storage
  const saved = loadProgressSync(STORAGE_KEY_PLAYER);
  setPlayer(saved);
  const weeklyReset = syncLeagueWeek();
  refreshHearts();

  // Decide primeira tela
  if (!player.onboarded) {
    showView('onboarding');
    renderOnboarding();
  } else {
    showView('home');
    renderHome();
  }

  renderHeaderStats();

  if (weeklyReset) {
    savePlayer();
  }

  // Recarrega player do Supabase depois do login (async)
  maybeReloadPlayerFromStorage();

  // Tick periódico para refill de corações
  setInterval(() => {
    const before = player.hearts;
    refreshHearts();
    if (player.hearts !== before) {
      renderHeaderStats();
      savePlayer();
    }
  }, 30000);
}

async function maybeReloadPlayerFromStorage() {
  await new Promise(r => setTimeout(r, 350));
  if (!currentUser) return;
  const remote = await loadProgress(STORAGE_KEY_PLAYER);
  if (remote) {
    setPlayer(remote);
    const weeklyReset = syncLeagueWeek();
    refreshHearts();
    renderHeaderStats();
    if (currentView === 'home') renderHome();
    if (currentView === 'profile') renderProfile();
    if (weeklyReset) savePlayer();
  }
}

async function savePlayer() {
  await saveProgress(STORAGE_KEY_PLAYER, player);
}

function renderBootMessage(message) {
  const main = document.getElementById('app-main');
  if (!main) return;
  let el = document.getElementById('boot-state');
  if (!el) {
    el = document.createElement('section');
    el.id = 'boot-state';
    el.className = 'boot';
    main.prepend(el);
  }
  el.innerHTML = `
    <div class="boot-spinner"></div>
    <div>${escapeHtml(message || 'Carregando...')}</div>
  `;
  el.style.display = 'flex';
}

function renderBootError(err) {
  const main = document.getElementById('app-main');
  const msg = err && err.message ? err.message : 'Não foi possível carregar os casos.';
  if (main) {
    let el = document.getElementById('boot-state');
    if (!el) {
      el = document.createElement('section');
      el.id = 'boot-state';
      el.className = 'boot';
      main.prepend(el);
    }
    el.innerHTML = `
      <div class="boot-spinner" style="border-top-color: var(--error);"></div>
      <div style="max-width:360px;text-align:center;line-height:1.5">${escapeHtml(msg)}</div>
      <button class="btn-primary" style="max-width:280px" onclick="boot()">Tentar novamente</button>
    `;
    el.style.display = 'flex';
  }
  toast('Falha ao carregar os níveis.');
}

// ── ROUTING ───────────────────────────────────────────────
function showView(name) {
  currentView = name;
  const bootState = document.getElementById('boot-state');
  if (bootState) bootState.style.display = 'none';
  ['onboarding', 'home', 'play', 'complete', 'profile'].forEach(v => {
    const el = document.getElementById('view-' + v);
    if (el) el.style.display = (v === name) ? 'block' : 'none';
  });
  document.getElementById('app-header').style.display = (name === 'onboarding') ? 'none' : 'block';
  window.scrollTo(0, 0);
}

function goHome() {
  if (!player.onboarded) {
    showView('onboarding');
    renderOnboarding();
    return;
  }
  showView('home');
  renderHome();
}

function goProfile() {
  if (!player.onboarded) return;
  // Toggle: se já está no perfil, volta pro home
  if (currentView === 'profile') {
    goHome();
    return;
  }
  showView('profile');
  renderProfile();
}

function setTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === name);
  });
  ['jogar', 'liga', 'quests'].forEach(t => {
    const el = document.getElementById('tab-' + t);
    if (el) el.style.display = (t === name) ? 'block' : 'none';
  });
  if (name === 'liga')   renderLeague();
  if (name === 'quests') renderQuests();
}

// ══════════════════════════════════════════════════════════
// PLAY: iniciar nível
// ══════════════════════════════════════════════════════════
function startLevel(levelId) {
  clearPlayAsyncTasks(playSession);
  const access = canPlayLevel(levelId);
  if (!access.ok) {
    if (access.reason === 'daily-limit') {
      openModal('pro');
      return;
    }
    if (access.reason === 'locked') {
      toast('Esse nível ainda está bloqueado.');
      return;
    }
    toast('Nível não disponível.');
    return;
  }

  refreshHearts();
  if (player.hearts <= 0 && !player.isPro) {
    openModal('nohearts');
    updateHeartTimer();
    return;
  }

  const level = getLevel(levelId);
  playSession = {
    levelId,
    level,
    mode: level.mode,
    step: 0,
    correctCount: 0,
    totalCount: 0,
    heartsUsed: 0,
    comboMax: 0,
    comboCur: 0,
    startTime: Date.now(),
    subStates: {},
    failed: false,
    isReplay: !!access.replay
  };

  showView('play');
  renderPlay();
}

function quitLevel() {
  if (!playSession) { goHome(); return; }
  if (confirm('Sair do nível? Seu progresso será perdido.')) {
    clearPlayAsyncTasks(playSession);
    playSession = null;
    goHome();
  }
}

// ══════════════════════════════════════════════════════════
// PLAY: render principal (dispatch por modo)
// ══════════════════════════════════════════════════════════
function renderPlay() {
  const { mode } = playSession;
  updatePlayProgress();
  renderPlayHearts();

  if (mode === 'classica' || mode === 'casoraro') return renderClassica();
  if (mode === 'imagem')     return renderImagem();
  if (mode === 'triagem')    return renderTriagem();
  if (mode === 'rapidfire')  return renderRapidFire();
  if (mode === 'plantao')    return renderPlantao();

  document.getElementById('play-body').innerHTML = '<p>Modo não implementado.</p>';
}

function updatePlayProgress() {
  const { level, step } = playSession;
  const total = getModeTotalSteps(level);
  const pct = Math.min(100, Math.round((step / total) * 100));
  const fill = document.getElementById('play-progress-fill');
  if (fill) fill.style.width = pct + '%';
}

function getModeTotalSteps(level) {
  if (level.mode === 'imagem')    return level.images.length;
  if (level.mode === 'triagem')   return level.patients.length;
  if (level.mode === 'rapidfire') return level.statements.length;
  if (level.mode === 'plantao')   return level.steps.length;
  return level.questions.length;
}

function renderPlayHearts() {
  const el = document.getElementById('play-hearts-n');
  if (el) el.textContent = player.isPro ? '∞' : player.hearts;
}

// ══════════════════════════════════════════════════════════
// MODO: CLÁSSICA / CASO RARO
// ══════════════════════════════════════════════════════════
function renderClassica() {
  const { level, step } = playSession;
  const body = document.getElementById('play-body');
  const footer = document.getElementById('play-footer');
  const modeIcon = icon(MODES[level.mode].icon, 20, 'icn-inline');

  // Primeira tela: mostra o caso
  if (step === 0 && !playSession.subStates.caseShown) {
    const isRare = level.mode === 'casoraro';
    body.innerHTML = `
      ${isRare ? `<div class="rare-banner">💀 Caso Raro — ${Math.round((level.globalPassRate||0.2)*100)}% dos jogadores acertam.</div>` : ''}
      <div class="play-prompt">${modeIcon} ${escapeHtml(level.title)}</div>
      <div class="case-block">
        <div class="patient">${escapeHtml(level.intro.patient)}</div>
        <div class="complaint">${escapeHtml(level.intro.complaint)}</div>
        <div class="vitals">${escapeHtml(level.intro.vitals)}</div>
        ${level.intro.extra ? `<div class="extra">${escapeHtml(level.intro.extra)}</div>` : ''}
      </div>
    `;
    footer.innerHTML = `
      <div class="play-footer-inner">
        <button class="btn-primary" onclick="proceedClassica()">Começar perguntas</button>
      </div>
    `;
    playSession.subStates.caseShown = true;
    return;
  }

  const q = level.questions[step];
  if (!q) return finishLevel();

  if (q.type === 'mc')       return renderMcQuestion(q);
  if (q.type === 'ordering') return renderOrderingQuestion(q);
  if (q.type === 'tf')       return renderTfQuestion(q);

  body.innerHTML = '<p>Tipo de pergunta não suportado.</p>';
}

function proceedClassica() { renderPlay(); }

function renderMcQuestion(q) {
  const body = document.getElementById('play-body');
  const footer = document.getElementById('play-footer');
  playSession.subStates.mcSelected = null;
  playSession.subStates.mcAnswered = false;

  body.innerHTML = `
    <div class="play-prompt">Pergunta ${playSession.step + 1}</div>
    <div class="question-title">${escapeHtml(q.prompt)}</div>
    <div class="choice-list">
      ${q.options.map((opt, i) => `
        <button class="choice" data-i="${i}" onclick="selectMc(${i})">
          <span>${escapeHtml(opt)}</span>
          <span class="check">✓</span>
        </button>
      `).join('')}
    </div>
  `;
  footer.innerHTML = `
    <div class="play-footer-inner">
      <button class="btn-primary" id="confirm-btn" disabled onclick="confirmMc()">Confirmar</button>
    </div>
  `;
}

function selectMc(i) {
  if (playSession.subStates.mcAnswered) return;
  playSession.subStates.mcSelected = i;
  document.querySelectorAll('#play-body .choice').forEach(el => {
    el.classList.toggle('selected', Number(el.dataset.i) === i);
  });
  document.getElementById('confirm-btn').disabled = false;
}

function confirmMc() {
  const q = playSession.level.questions[playSession.step];
  const sel = playSession.subStates.mcSelected;
  if (sel === null) return;
  playSession.subStates.mcAnswered = true;

  const isCorrect = sel === q.correct;
  playSession.totalCount++;
  if (isCorrect) { playSession.correctCount++; bumpCombo(); }
  else          { resetCombo(); chargeHeart(); }

  document.querySelectorAll('#play-body .choice').forEach((el, i) => {
    el.disabled = true;
    el.classList.remove('selected');
    if (i === q.correct) el.classList.add('correct');
    if (i === sel && !isCorrect) el.classList.add('wrong');
  });

  showFeedback(isCorrect, q.explanation, () => {
    playSession.step++;
    renderPlay();
  });
}

// ── ORDERING ────────────────────────────────────────────
function renderOrderingQuestion(q) {
  const body = document.getElementById('play-body');
  const footer = document.getElementById('play-footer');
  if (!playSession.subStates.orderIdx) {
    // Ordem inicial: embaralha
    const shuffled = q.items.map((_, i) => i).sort(() => Math.random() - 0.5);
    playSession.subStates.orderIdx = shuffled;
    playSession.subStates.orderAnswered = false;
  }
  const current = playSession.subStates.orderIdx;

  body.innerHTML = `
    <div class="play-prompt">Pergunta ${playSession.step + 1}</div>
    <div class="question-title">${escapeHtml(q.prompt)}</div>
    <div class="order-list" id="order-list">
      ${current.map((origI, pos) => `
        <div class="order-item" data-pos="${pos}">
          <span class="order-index">${pos + 1}</span>
          <span class="order-text">${escapeHtml(q.items[origI])}</span>
          <span class="order-arrows">
            <button class="order-arrow" onclick="moveOrder(${pos}, -1)" ${pos === 0 ? 'disabled' : ''}>▲</button>
            <button class="order-arrow" onclick="moveOrder(${pos}, 1)" ${pos === current.length - 1 ? 'disabled' : ''}>▼</button>
          </span>
        </div>
      `).join('')}
    </div>
  `;
  footer.innerHTML = `
    <div class="play-footer-inner">
      <button class="btn-primary" onclick="confirmOrder()">Confirmar</button>
    </div>
  `;
}

function moveOrder(pos, dir) {
  if (playSession.subStates.orderAnswered) return;
  const arr = playSession.subStates.orderIdx.slice();
  const newPos = pos + dir;
  if (newPos < 0 || newPos >= arr.length) return;
  [arr[pos], arr[newPos]] = [arr[newPos], arr[pos]];
  playSession.subStates.orderIdx = arr;
  renderOrderingQuestion(playSession.level.questions[playSession.step]);
}

function confirmOrder() {
  const q = playSession.level.questions[playSession.step];
  const user = playSession.subStates.orderIdx;
  const right = q.correctOrder;
  const isCorrect = JSON.stringify(user) === JSON.stringify(right);

  playSession.subStates.orderAnswered = true;
  playSession.totalCount++;
  if (isCorrect) { playSession.correctCount++; bumpCombo(); }
  else          { resetCombo(); chargeHeart(); }

  const items = document.querySelectorAll('.order-item');
  items.forEach((el, pos) => {
    const origIdx = user[pos];
    const expectedAt = right[pos];
    el.classList.add(origIdx === expectedAt ? 'correct' : 'wrong');
  });

  showFeedback(isCorrect, q.explanation, () => {
    playSession.step++;
    renderPlay();
  });
}

// ── TRUE/FALSE ──────────────────────────────────────────
function renderTfQuestion(q) {
  const body = document.getElementById('play-body');
  const footer = document.getElementById('play-footer');
  if (!playSession.subStates.tfAnswers) {
    playSession.subStates.tfAnswers = new Array(q.statements.length).fill(null);
    playSession.subStates.tfAnswered = false;
  }

  body.innerHTML = `
    <div class="play-prompt">Pergunta ${playSession.step + 1} — Verdadeiro ou Falso</div>
    <div class="question-title">${escapeHtml(q.prompt)}</div>
    <div class="tf-list">
      ${q.statements.map((s, i) => `
        <div class="tf-card" data-i="${i}">
          <div class="tf-text">${escapeHtml(s.text)}</div>
          <div class="tf-buttons">
            <button class="tf-btn cert" onclick="setTf(${i}, true)">✅ Certo</button>
            <button class="tf-btn err"  onclick="setTf(${i}, false)">❌ Errado</button>
          </div>
          <div class="tf-note-slot"></div>
        </div>
      `).join('')}
    </div>
  `;
  footer.innerHTML = `
    <div class="play-footer-inner">
      <button class="btn-primary" id="confirm-tf" onclick="confirmTf()" disabled>Confirmar</button>
    </div>
  `;
  refreshTfVisual();
}

function setTf(i, val) {
  if (playSession.subStates.tfAnswered) return;
  playSession.subStates.tfAnswers[i] = val;
  refreshTfVisual();
}

function refreshTfVisual() {
  const answers = playSession.subStates.tfAnswers;
  document.querySelectorAll('.tf-card').forEach((card, i) => {
    const ans = answers[i];
    const certo = card.querySelector('.cert');
    const errado = card.querySelector('.err');
    certo.classList.toggle('selected', ans === true);
    errado.classList.toggle('selected', ans === false);
  });
  const allSet = answers.every(a => a !== null);
  const btn = document.getElementById('confirm-tf');
  if (btn) btn.disabled = !allSet;
}

function confirmTf() {
  const q = playSession.level.questions[playSession.step];
  const answers = playSession.subStates.tfAnswers;
  let rightCount = 0;
  q.statements.forEach((s, i) => { if (answers[i] === s.answer) rightCount++; });
  const isCorrect = rightCount === q.statements.length;

  playSession.subStates.tfAnswered = true;
  playSession.totalCount++;
  if (isCorrect) { playSession.correctCount++; bumpCombo(); }
  else          { resetCombo(); chargeHeart(); }

  document.querySelectorAll('.tf-card').forEach((card, i) => {
    const s = q.statements[i];
    const certo = card.querySelector('.cert');
    const errado = card.querySelector('.err');
    certo.disabled = true; errado.disabled = true;
    certo.classList.remove('selected'); errado.classList.remove('selected');
    if (s.answer === true) certo.classList.add('correct'); else errado.classList.add('correct');
    if (answers[i] !== s.answer) {
      (answers[i] === true ? certo : errado).classList.add('wrong');
    }
    const slot = card.querySelector('.tf-note-slot');
    if (s.note) {
      const wrongNote = answers[i] !== s.answer;
      slot.innerHTML = `<div class="tf-note ${wrongNote ? 'wrong' : ''}">${escapeHtml(s.note)}</div>`;
    }
  });

  const summary = isCorrect
    ? 'Acertou todas! ✅'
    : `Acertos: ${rightCount}/${q.statements.length}. Revise as notas.`;

  showFeedback(isCorrect, summary, () => {
    playSession.step++;
    renderPlay();
  });
}

// ══════════════════════════════════════════════════════════
// MODO: IMAGEM
// ══════════════════════════════════════════════════════════
function renderImagem() {
  const { level, step } = playSession;
  if (step >= level.images.length) return finishLevel();
  const img = level.images[step];
  const body = document.getElementById('play-body');
  const footer = document.getElementById('play-footer');
  const modeIcon = icon(MODES[level.mode].icon, 20, 'icn-inline');
  playSession.subStates.imgSel = null;
  playSession.subStates.imgAnswered = false;

  body.innerHTML = `
    <div class="play-prompt">${modeIcon} Imagem ${step + 1} de ${level.images.length}</div>
    <div class="img-counter">
      ${level.images.map((_, i) => `
        <span class="dot ${i < step ? 'done' : i === step ? 'current' : ''}"></span>
      `).join('')}
    </div>
    <div class="img-viewer">
      ${renderMedicalSvg(img.svg)}
      <div class="img-caption">${escapeHtml(img.caption)}</div>
    </div>
    <div class="question-title">${escapeHtml(img.question)}</div>
    <div class="choice-list">
      ${img.options.map((opt, i) => `
        <button class="choice" data-i="${i}" onclick="selectImg(${i})">
          <span>${escapeHtml(opt)}</span>
          <span class="check">✓</span>
        </button>
      `).join('')}
    </div>
  `;
  footer.innerHTML = `
    <div class="play-footer-inner">
      <button class="btn-primary" id="confirm-img" disabled onclick="confirmImg()">Confirmar</button>
    </div>
  `;
}

function selectImg(i) {
  if (playSession.subStates.imgAnswered) return;
  playSession.subStates.imgSel = i;
  document.querySelectorAll('#play-body .choice').forEach(el => {
    el.classList.toggle('selected', Number(el.dataset.i) === i);
  });
  document.getElementById('confirm-img').disabled = false;
}

function confirmImg() {
  const { level, step } = playSession;
  const img = level.images[step];
  const sel = playSession.subStates.imgSel;
  if (sel === null) return;
  playSession.subStates.imgAnswered = true;

  const isCorrect = sel === img.correct;
  playSession.totalCount++;
  if (isCorrect) { playSession.correctCount++; bumpCombo(); }
  else          { resetCombo(); chargeHeart(); }

  document.querySelectorAll('#play-body .choice').forEach((el, i) => {
    el.disabled = true;
    el.classList.remove('selected');
    if (i === img.correct) el.classList.add('correct');
    if (i === sel && !isCorrect) el.classList.add('wrong');
  });

  showFeedback(isCorrect, img.explanation, () => {
    playSession.step++;
    renderPlay();
  });
}

// ══════════════════════════════════════════════════════════
// MODO: TRIAGEM
// ══════════════════════════════════════════════════════════
function renderTriagem() {
  const { level, step } = playSession;
  if (step >= level.patients.length) return finishLevel();
  const p = level.patients[step];
  const body = document.getElementById('play-body');
  const footer = document.getElementById('play-footer');
  const modeIcon = icon(MODES[level.mode].icon, 20, 'icn-inline');

  playSession.subStates.trSel = null;
  playSession.subStates.trAnswered = false;

  body.innerHTML = `
    <div class="play-prompt">${modeIcon} Triagem — ${step + 1} de ${level.patients.length}</div>
    ${step === 0 ? `<p style="font-size:14px;color:var(--muted);margin-bottom:14px;line-height:1.4">${escapeHtml(level.briefing)}</p>` : ''}
    <div class="patient-card">
      <div class="patient-head"><span>${escapeHtml(p.name)}</span></div>
      <div class="patient-summary">${escapeHtml(p.summary)}</div>
      <div class="patient-options">
        ${level.colors.map(c => `
          <button class="patient-opt" data-id="${c.id}" onclick="selectColor('${c.id}')">
            <span class="opt-emoji">${c.emoji}</span>
            ${c.label}
          </button>
        `).join('')}
      </div>
    </div>
  `;
  footer.innerHTML = `
    <div class="play-footer-inner">
      <button class="btn-primary" id="confirm-tr" disabled onclick="confirmTriagem()">Confirmar</button>
    </div>
  `;
}

function selectColor(id) {
  if (playSession.subStates.trAnswered) return;
  playSession.subStates.trSel = id;
  document.querySelectorAll('.patient-opt').forEach(el => {
    el.classList.toggle('selected', el.dataset.id === id);
  });
  document.getElementById('confirm-tr').disabled = false;
}

function confirmTriagem() {
  const { level, step } = playSession;
  const p = level.patients[step];
  const sel = playSession.subStates.trSel;
  if (!sel) return;
  playSession.subStates.trAnswered = true;

  const isCorrect = sel === p.correct;
  playSession.totalCount++;
  if (isCorrect) { playSession.correctCount++; bumpCombo(); }
  else          { resetCombo(); chargeHeart(); }

  document.querySelectorAll('.patient-opt').forEach(el => {
    el.disabled = true;
    el.classList.remove('selected');
    if (el.dataset.id === p.correct) el.classList.add('correct');
    if (el.dataset.id === sel && !isCorrect) el.classList.add('wrong');
  });

  showFeedback(isCorrect, p.reason, () => {
    playSession.step++;
    renderPlay();
  });
}

// ══════════════════════════════════════════════════════════
// MODO: RAPID FIRE
// ══════════════════════════════════════════════════════════
function renderRapidFire() {
  const { level, step } = playSession;
  if (step >= level.statements.length) return finishLevel();
  clearPlayAsyncTasks(playSession);
  const s = level.statements[step];
  const body = document.getElementById('play-body');
  const footer = document.getElementById('play-footer');

  playSession.subStates.rfAnswered = false;

  const combo = playSession.comboCur;
  body.innerHTML = `
    <div class="rf-wrap">
      <div class="rf-counter">Afirmação ${step + 1} de ${level.statements.length}</div>
      <div class="rf-timer"><div class="rf-timer-fill" id="rf-timer-fill" style="width:100%"></div></div>
      <div class="rf-combo">${combo >= 3 ? '🔥 COMBO x' + combo : ''}</div>
      <div class="rf-card">${escapeHtml(s.text)}</div>
      <div class="rf-buttons">
        <button class="rf-btn certo"  onclick="answerRf(true)">✅ Certo</button>
        <button class="rf-btn errado" onclick="answerRf(false)">❌ Errado</button>
      </div>
    </div>
  `;
  footer.innerHTML = '';

  const sessionRef = playSession;
  const timeLimit = level.timePerStatement * 1000;
  const startTime = Date.now();
  playSession.subStates.rfInterval = setInterval(() => {
    if (!playSession || playSession !== sessionRef) {
      clearPlayAsyncTasks(sessionRef);
      return;
    }
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, timeLimit - elapsed);
    const pct = (remaining / timeLimit) * 100;
    const fill = document.getElementById('rf-timer-fill');
    if (fill) fill.style.width = pct + '%';
    if (remaining <= 0) {
      clearInterval(playSession.subStates.rfInterval);
      if (!playSession.subStates.rfAnswered) answerRf(null);
    }
  }, 50);
}

function answerRf(userAnswer) {
  if (!playSession) return;
  if (playSession.subStates.rfAnswered) return;
  playSession.subStates.rfAnswered = true;
  clearPlayAsyncTasks(playSession);

  const { level, step } = playSession;
  const sessionRef = playSession;
  const s = level.statements[step];
  const isCorrect = userAnswer === s.answer;

  playSession.totalCount++;
  if (isCorrect) { playSession.correctCount++; bumpCombo(); }
  else          { resetCombo(); chargeHeart(); }

  const wrap = document.querySelector('.rf-wrap');
  if (wrap) {
    const noteHtml = `<div class="tf-note ${isCorrect ? '' : 'wrong'}" style="margin-top:16px">${escapeHtml((isCorrect ? '✅ ' : '❌ ') + (s.note || (isCorrect ? 'Correto.' : 'A resposta era ' + (s.answer ? 'CERTO' : 'ERRADO') + '.')))}</div>`;
    wrap.insertAdjacentHTML('beforeend', noteHtml);
  }

  playSession.subStates.rfAdvanceTimeout = setTimeout(() => {
    if (!playSession || playSession !== sessionRef) return;
    playSession.step++;
    renderPlay();
  }, 1600);
}

// ══════════════════════════════════════════════════════════
// MODO: PLANTÃO SIMULADO
// ══════════════════════════════════════════════════════════
function renderPlantao() {
  const { level, step } = playSession;
  if (step >= level.steps.length) return finishLevel();
  const s = level.steps[step];
  const body = document.getElementById('play-body');
  const footer = document.getElementById('play-footer');
  const modeIcon = icon(MODES[level.mode].icon, 20, 'icn-inline');
  playSession.subStates.plSel = null;
  playSession.subStates.plAnswered = false;

  body.innerHTML = `
    <div class="play-prompt">${modeIcon} ${escapeHtml(level.title)}</div>
    ${step === 0 ? `<div class="plantao-scene">${escapeHtml(level.setup)}</div>` : ''}
    <div class="plantao-step">Etapa ${s.step}</div>
    <div class="plantao-scene">${escapeHtml(s.scene)}</div>
    <div class="question-title">${escapeHtml(s.prompt)}</div>
    <div class="choice-list">
      ${s.options.map((opt, i) => `
        <button class="choice" data-i="${i}" onclick="selectPl(${i})">
          <span>${escapeHtml(opt)}</span>
          <span class="check">✓</span>
        </button>
      `).join('')}
    </div>
  `;
  footer.innerHTML = `
    <div class="play-footer-inner">
      <button class="btn-primary" id="confirm-pl" disabled onclick="confirmPl()">Confirmar</button>
    </div>
  `;
}

function selectPl(i) {
  if (playSession.subStates.plAnswered) return;
  playSession.subStates.plSel = i;
  document.querySelectorAll('#play-body .choice').forEach(el => {
    el.classList.toggle('selected', Number(el.dataset.i) === i);
  });
  document.getElementById('confirm-pl').disabled = false;
}

function confirmPl() {
  const { level, step } = playSession;
  const s = level.steps[step];
  const sel = playSession.subStates.plSel;
  if (sel === null) return;
  playSession.subStates.plAnswered = true;

  const isCorrect = sel === s.correct;
  playSession.totalCount++;
  if (isCorrect) { playSession.correctCount++; bumpCombo(); }
  else          { resetCombo(); chargeHeart(); }

  document.querySelectorAll('#play-body .choice').forEach((el, i) => {
    el.disabled = true;
    el.classList.remove('selected');
    if (i === s.correct) el.classList.add('correct');
    if (i === sel && !isCorrect) el.classList.add('wrong');
  });

  const msg = isCorrect ? s.feedbackOk : s.feedbackKo;
  showFeedback(isCorrect, msg, () => {
    playSession.step++;
    renderPlay();
  });
}

// ══════════════════════════════════════════════════════════
// SISTEMAS: COMBO, HEARTS, FEEDBACK, FINAL
// ══════════════════════════════════════════════════════════
function bumpCombo() {
  playSession.comboCur++;
  playSession.comboMax = Math.max(playSession.comboMax, playSession.comboCur);
}
function resetCombo() { playSession.comboCur = 0; }

function chargeHeart() {
  if (player.isPro) return;
  if (playSession.isReplay) return;
  loseHeart();
  playSession.heartsUsed++;
  renderPlayHearts();
  renderHeaderStats();
  savePlayer();
}

function showFeedback(isOk, text, onContinue) {
  const prev = document.querySelector('.feedback');
  if (prev) prev.remove();

  const el = document.createElement('div');
  el.className = 'feedback ' + (isOk ? 'ok' : 'wrong');
  el.innerHTML = `
    <div class="feedback-inner">
      <div class="feedback-head">${isOk ? '✅ Correto!' : '❌ Não foi dessa vez'}</div>
      <div class="feedback-body">${escapeHtml(text || '')}</div>
      <button class="btn-primary" id="fb-continue">Continuar</button>
    </div>
  `;
  document.body.appendChild(el);
  document.getElementById('fb-continue').addEventListener('click', () => {
    el.remove();
    onContinue && onContinue();
  });
}

function finishLevel() {
  if (!playSession) return;
  clearPlayAsyncTasks(playSession);
  const { level, correctCount, totalCount, comboMax, heartsUsed, startTime } = playSession;
  const perfect = correctCount === totalCount && totalCount > 0;
  const firstOfDay = !player.levelsCompleted.some(c => c.completedAt && c.completedAt.slice(0,10) === todayKey());
  const diffMult = DIFFICULTY[level.difficulty]?.xpMult || 1;

  const xpGained = awardLevelXp({
    correct: correctCount,
    total: totalCount,
    perfectRun: perfect,
    firstOfDay,
    comboMax,
    difficultyMult: diffMult,
    isReplay: playSession.isReplay
  });
  const gemsGained = playSession.isReplay ? 0 : (GEMS.levelComplete + (perfect ? GEMS.perfectScore : 0));

  if (xpGained > 0) addXp(xpGained);
  if (gemsGained > 0) addGems(gemsGained);
  const streakInfo = tickStreak();
  markLevelComplete(level.id, { score: correctCount, total: totalCount, perfect, xp: xpGained });

  const elapsedSec = Math.round((Date.now() - startTime) / 1000);
  savePlayer();

  showView('complete');
  renderHeaderStats();
  renderComplete({ level, correctCount, totalCount, perfect, xpGained, gemsGained, streakInfo, heartsUsed, elapsedSec });

  if (perfect) fireConfetti();
  playSession = null;
}

// ══════════════════════════════════════════════════════════
// MODAIS E HEART REFILL UI
// ══════════════════════════════════════════════════════════
function openModal(name) {
  const m = document.getElementById('modal-' + name);
  if (m) m.style.display = 'flex';
  if (name === 'nohearts') updateHeartTimer();
}
function closeModal(name) {
  const m = document.getElementById('modal-' + name);
  if (m) m.style.display = 'none';
}

function updateHeartTimer() {
  const el = document.getElementById('next-heart-timer');
  if (!el) return;
  const ms = timeUntilNextHeart();
  if (ms <= 0) { el.textContent = 'agora!'; return; }
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000);
  el.textContent = `${min}min ${sec}s`;
  setTimeout(updateHeartTimer, 1000);
}

function buyHeartsWithGems() {
  if (fillHeartsWithGems()) {
    toast('Corações cheios!');
    renderHeaderStats();
    savePlayer();
    closeModal('nohearts');
    if (playSession) renderPlay();
  } else {
    toast('Gemas insuficientes.');
  }
}

// ══════════════════════════════════════════════════════════
// CONFETTI + SHARE + HELPERS
// ══════════════════════════════════════════════════════════
function fireConfetti() {
  const layer = document.createElement('div');
  layer.className = 'confetti';
  const colors = ['#cefc8a', '#d2cbfe', '#ffb86c', '#fca5f1', '#6ad1ff'];
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('i');
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDelay = (Math.random() * 0.3) + 's';
    p.style.animationDuration = (1 + Math.random() * 0.6) + 's';
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    layer.appendChild(p);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 2000);
}

function shareResult(level, correctCount, totalCount, xp) {
  const lines = [
    `🏥 CONDUTA · Nível ${level.number} — ${level.title}`,
    `${MODES[level.mode].label} · ${DIFFICULTY[level.difficulty].label}`,
    `Acertos: ${correctCount}/${totalCount} · +${xp} XP`,
    `🔥 Streak: ${player.streak} dias`,
    `Treine sua conduta clínica → conduta.cc`
  ];
  return lines.join('\n');
}

function shareWhatsapp(text) {
  const url = 'https://wa.me/?text=' + encodeURIComponent(text);
  window.open(url, '_blank');
}

function copyShare(text) {
  navigator.clipboard?.writeText(text).then(
    () => toast('Copiado!'),
    () => toast('Não foi possível copiar.')
  );
}

function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { t.style.display = 'none'; }, 2400);
}

function escapeHtml(s) {
  if (s === undefined || s === null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Expor globalmente
window.boot = boot;
window.goHome = goHome;
window.goProfile = goProfile;
window.setTab = setTab;
window.startLevel = startLevel;
window.quitLevel = quitLevel;
window.selectMc = selectMc;
window.confirmMc = confirmMc;
window.proceedClassica = proceedClassica;
window.moveOrder = moveOrder;
window.confirmOrder = confirmOrder;
window.setTf = setTf;
window.confirmTf = confirmTf;
window.selectImg = selectImg;
window.confirmImg = confirmImg;
window.selectColor = selectColor;
window.confirmTriagem = confirmTriagem;
window.answerRf = answerRf;
window.selectPl = selectPl;
window.confirmPl = confirmPl;
window.openModal = openModal;
window.closeModal = closeModal;
window.buyHeartsWithGems = buyHeartsWithGems;
window.shareResult = shareResult;
window.shareWhatsapp = shareWhatsapp;
window.copyShare = copyShare;
window.toast = toast;
window.savePlayer = savePlayer;
window.escapeHtml = escapeHtml;
window.renderBootMessage = renderBootMessage;
window.renderBootError = renderBootError;

boot();
