/* ============================================================
   ui.js — Conduta.
   Responsabilidade: renderização de DOM, modais, autocomplete,
   toast e todas as funções que tocam diretamente na interface.
   Depende de: variáveis globais definidas em game.js
               (gs, stats, amState, MAX, CASES, ALL_DIAGNOSES)
   ============================================================ */

/* ── UTILITÁRIO: normalizar texto ─────────────────────────── */
// Exposta globalmente para ser usada em game.js também
function norm(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .trim();
}

/* ── JOGO PRINCIPAL: dots de progresso ───────────────────── */
function renderDots() {
  var el = document.getElementById('dots');
  el.innerHTML = '';
  for (var i = 0; i < MAX; i++) {
    var d = document.createElement('div');
    d.className = 'dot';
    if (i < gs.attempts) {
      d.classList.add(gs.guesses[i] && gs.guesses[i].correct ? 'correct' : 'wrong');
    } else if (i === gs.attempts && !gs.done) {
      d.classList.add('current');
    }
    el.appendChild(d);
  }
}

/* ── JOGO PRINCIPAL: card do caso ────────────────────────── */
function renderCase() {
  var c = CASES[gs.idx];
  document.getElementById('case-text').textContent = c.clues[0];
  document.getElementById('clue-counter').textContent =
    'Pista ' + Math.min(gs.attempts + 1, MAX) + ' de ' + MAX;

  var cl = document.getElementById('clues');
  cl.innerHTML = '';
  for (var i = 1; i <= Math.min(gs.attempts, MAX - 1); i++) {
    if (!c.clues[i]) continue;
    var b = document.createElement('div');
    b.className = 'clue-box';
    b.innerHTML =
      '<div class="clue-label">' + (c.clue_labels && c.clue_labels[i] || 'Pista ' + (i + 1)) + '</div>' +
      '<div class="clue-text">' + c.clues[i] + '</div>';
    cl.appendChild(b);
  }
}

/* ── JOGO PRINCIPAL: histórico de palpites ───────────────── */
function renderGuesses() {
  var el = document.getElementById('guesses');
  el.innerHTML = '';
  gs.guesses.forEach(function(g) {
    var r = document.createElement('div');
    r.className = 'guess-row' + (g.correct ? '' : ' wrong');
    r.innerHTML =
      '<span class="guess-icon">' + (g.correct ? '✓' : '✗') + '</span>' +
      '<span class="guess-text">' + g.text + '</span>';
    el.appendChild(r);
  });
}

/* ── JOGO PRINCIPAL: card de resultado ───────────────────── */
function renderResult() {
  var c = CASES[gs.idx];
  var el = document.getElementById('result-card');
  el.classList.add('show');

  var share = buildShare();
  window._shareText = share;

  el.innerHTML =
    '<div class="result-badge ' + (gs.won ? 'win' : 'lose') + '">' +
      (gs.won
        ? '✅ Acertou em ' + gs.attempts + ' tentativa' + (gs.attempts > 1 ? 's' : '')
        : '❌ Não foi dessa vez') +
    '</div>' +
    '<div class="result-diagnosis">' + c.diagnosis + '</div>' +
    '<div class="result-meta">CID-10 ' + c.cid + ' · ' + c.category + '</div>' +
    '<div class="result-divider"></div>' +
    '<div class="result-section-label">Discussão Clínica</div>' +
    '<div class="result-body">' + c.explanation + '</div>' +
    '<div class="result-divider"></div>' +
    '<div class="result-section-label">Referências</div>' +
    '<div class="result-refs">' + c.reference + '</div>' +
    '<div class="share-area">' +
      '<div class="result-section-label" style="margin-bottom:10px">Compartilhar</div>' +
      '<div class="share-preview">' + share + '</div>' +
      '<div class="share-btns">' +
        '<button class="share-btn whatsapp" onclick="shareWhatsApp()">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
          ' WhatsApp' +
        '</button>' +
        '<button class="share-btn telegram" onclick="shareTelegram()">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>' +
          ' Telegram' +
        '</button>' +
        '<button class="share-btn twitter" onclick="shareTwitter()">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
        '</button>' +
        '<button class="share-btn copy" onclick="copyShare()" id="copy-btn">📋 Copiar</button>' +
      '</div>' +
    '</div>';
}

/* ── JOGO PRINCIPAL: autocomplete ────────────────────────── */
function onInput(e) {
  var val = norm(e.target.value);
  if (val.length < 2) { hideAC(); return; }

  var matches = ALL_DIAGNOSES.filter(function(d) {
    return norm(d).includes(val);
  }).slice(0, 7);

  if (!matches.length) { hideAC(); return; }

  var ac = document.getElementById('autocomplete');
  ac.innerHTML = '';
  ac.style.display = 'block';
  acSel = -1;

  matches.forEach(function(m) {
    var item = document.createElement('div');
    item.className = 'ac-item';
    item.textContent = m;
    item.addEventListener('mousedown', function() {
      document.getElementById('diagnosis-input').value = m;
      hideAC();
    });
    item.addEventListener('touchstart', function(e) {
      e.preventDefault(); // evita blur antes do valor ser aplicado (iOS)
      document.getElementById('diagnosis-input').value = m;
      hideAC();
    });
    ac.appendChild(item);
  });
}

function onKey(e) {
  var ac = document.getElementById('autocomplete');
  var items = ac.querySelectorAll('.ac-item');

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    acSel = Math.min(acSel + 1, items.length - 1);
    updateACSelection(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    acSel = Math.max(acSel - 1, -1);
    updateACSelection(items);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (acSel >= 0 && items[acSel]) {
      document.getElementById('diagnosis-input').value = items[acSel].textContent;
      hideAC();
    } else {
      submitGuess();
    }
  } else if (e.key === 'Escape') {
    hideAC();
  }
}

function updateACSelection(items) {
  items.forEach(function(it, i) { it.classList.toggle('sel', i === acSel); });
  if (acSel >= 0 && items[acSel]) {
    document.getElementById('diagnosis-input').value = items[acSel].textContent;
  }
}

function hideAC() {
  document.getElementById('autocomplete').style.display = 'none';
  acSel = -1;
}

/* ── ARQUIVO: dots ────────────────────────────────────────── */
function archiveRenderDots() {
  var el = document.getElementById('am-dots');
  el.innerHTML = '';
  for (var i = 0; i < MAX; i++) {
    var d = document.createElement('div');
    d.className = 'dot';
    if (i < amState.attempts) {
      d.classList.add(amState.guesses[i] && amState.guesses[i].correct ? 'correct' : 'wrong');
    } else if (i === amState.attempts && !amState.done) {
      d.classList.add('current');
    }
    el.appendChild(d);
  }
}

/* ── ARQUIVO: card do caso ───────────────────────────────── */
function archiveRenderCase() {
  var c = CASES[amState.cIdx];
  document.getElementById('am-case-text').textContent = c.clues[0];
  document.getElementById('am-clue-counter').textContent =
    'Pista ' + Math.min(amState.attempts + 1, MAX) + ' de ' + MAX;

  var cl = document.getElementById('am-clues');
  cl.innerHTML = '';
  for (var i = 1; i <= Math.min(amState.attempts, MAX - 1); i++) {
    if (!c.clues[i]) continue;
    var b = document.createElement('div');
    b.className = 'clue-box';
    b.innerHTML =
      '<div class="clue-label">' + (c.clue_labels && c.clue_labels[i] || 'Pista ' + (i + 1)) + '</div>' +
      '<div class="clue-text">' + c.clues[i] + '</div>';
    cl.appendChild(b);
  }
}

/* ── ARQUIVO: palpites ───────────────────────────────────── */
function archiveRenderGuesses() {
  var el = document.getElementById('am-guesses');
  el.innerHTML = '';
  amState.guesses.forEach(function(g) {
    var r = document.createElement('div');
    r.className = 'guess-row' + (g.correct ? '' : ' wrong');
    r.innerHTML =
      '<span class="guess-icon">' + (g.correct ? '✓' : '✗') + '</span>' +
      '<span class="guess-text">' + g.text + '</span>';
    el.appendChild(r);
  });
}

/* ── ARQUIVO: resultado ──────────────────────────────────── */
function archiveRenderResult() {
  var c = CASES[amState.cIdx];
  var el = document.getElementById('am-result-card');
  el.classList.add('show');
  el.innerHTML =
    '<div class="result-badge ' + (amState.won ? 'win' : 'lose') + '">' +
      (amState.won
        ? '✅ Acertou em ' + amState.attempts + ' tentativa' + (amState.attempts > 1 ? 's' : '')
        : '❌ Não foi dessa vez') +
    '</div>' +
    '<div class="result-diagnosis">' + c.diagnosis + '</div>' +
    '<div class="result-meta">CID-10 ' + c.cid + ' · ' + c.category + '</div>' +
    '<div class="result-divider"></div>' +
    '<div class="result-section-label">Discussão Clínica</div>' +
    '<div class="result-body">' + c.explanation + '</div>' +
    '<div class="result-divider"></div>' +
    '<div class="result-section-label">Referências</div>' +
    '<div class="result-refs">' + c.reference + '</div>';
}

/* ── ARQUIVO: autocomplete ───────────────────────────────── */
function archiveOnInput(e) {
  var val = norm(e.target.value);
  if (val.length < 2) { hideArchiveAC(); return; }

  var matches = ALL_DIAGNOSES.filter(function(d) {
    return norm(d).includes(val);
  }).slice(0, 7);

  if (!matches.length) { hideArchiveAC(); return; }

  var ac = document.getElementById('am-autocomplete');
  ac.innerHTML = '';
  ac.style.display = 'block';
  amAcSel = -1;

  matches.forEach(function(m) {
    var item = document.createElement('div');
    item.className = 'ac-item';
    item.textContent = m;
    item.addEventListener('mousedown', function() {
      document.getElementById('am-input').value = m;
      hideArchiveAC();
    });
    item.addEventListener('touchstart', function(e) {
      e.preventDefault(); // evita blur antes do valor ser aplicado (iOS)
      document.getElementById('am-input').value = m;
      hideArchiveAC();
    });
    ac.appendChild(item);
  });
}

function archiveOnKey(e) {
  var ac = document.getElementById('am-autocomplete');
  var items = ac.querySelectorAll('.ac-item');

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    amAcSel = Math.min(amAcSel + 1, items.length - 1);
    updateArchiveACSelection(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    amAcSel = Math.max(amAcSel - 1, -1);
    updateArchiveACSelection(items);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (amAcSel >= 0 && items[amAcSel]) {
      document.getElementById('am-input').value = items[amAcSel].textContent;
      hideArchiveAC();
    } else {
      archiveSubmitGuess();
    }
  } else if (e.key === 'Escape') {
    hideArchiveAC();
  }
}

function updateArchiveACSelection(items) {
  items.forEach(function(it, i) { it.classList.toggle('sel', i === amAcSel); });
  if (amAcSel >= 0 && items[amAcSel]) {
    document.getElementById('am-input').value = items[amAcSel].textContent;
  }
}

function hideArchiveAC() {
  document.getElementById('am-autocomplete').style.display = 'none';
  amAcSel = -1;
}

/* ── ARQUIVO: lista de casos ─────────────────────────────── */
function renderArchiveList() {
  var list = document.getElementById('archive-list');

  if (todayGlobal <= 0) {
    list.innerHTML =
      '<div style="text-align:center;color:var(--muted);padding:40px 0;font-size:14px">' +
      'Ainda não há casos anteriores.<br>Volte amanhã!</div>';
    return;
  }

  list.innerHTML = '';

  var diffLabels = { 1: 'Fácil', 2: 'Médio', 3: 'Difícil', 4: 'Expert' };
  var diffClass  = { 1: 'easy',  2: 'medium', 3: 'hard',   4: 'hard'   };

  for (var d = todayGlobal - 1; d >= 0; d--) {
    var caseDate = dateFromGlobalDay(d);
    var key      = keyFromDate(caseDate);
    var cIdx     = d % CASES.length;
    var c        = CASES[cIdx];
    var saved    = null;

    try { saved = JSON.parse(localStorage.getItem('conduta_am_' + key)); } catch(e) {}

    var statusIcon  = '○';
    var statusColor = 'var(--muted)';
    if (saved && saved.done) {
      statusIcon  = saved.won ? '✓' : '✗';
      statusColor = saved.won ? 'var(--lime)' : 'var(--error)';
    }

    var dateStr = caseDate.toLocaleDateString('pt-BR', {
      day: 'numeric', month: 'short', year: 'numeric'
    });

    var item = document.createElement('div');
    item.className = 'archive-item';
    (function(day) {
      item.onclick = function() { openArchiveCase(day); };
    })(d);

    item.innerHTML =
      '<div class="archive-num">#' + (d + 1) + '</div>' +
      '<div class="archive-info">' +
        '<div class="archive-date">' + dateStr + '</div>' +
        '<div class="archive-diag">' + (saved && saved.done ? c.diagnosis : '???') + '</div>' +
        '<div class="archive-cat">' + c.category + '</div>' +
      '</div>' +
      '<div class="archive-diff ' + (diffClass[c.difficulty] || 'medium') + '">' +
        (diffLabels[c.difficulty] || 'Médio') +
      '</div>' +
      '<div class="archive-status" style="color:' + statusColor + '">' + statusIcon + '</div>';

    list.appendChild(item);
  }
}

/* ── MODAIS ───────────────────────────────────────────────── */
function openModal(type) {
  if (type === 'stats') {
    // Preenche dados de estatísticas antes de abrir
    var winPct = stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0;
    document.getElementById('s-played').textContent = stats.played;
    document.getElementById('s-wins').textContent   = winPct + '%';
    document.getElementById('s-streak').textContent = stats.streak;
    document.getElementById('s-best').textContent   = stats.best;

    var db  = document.getElementById('dist-bars');
    db.innerHTML = '';
    var cur = (gs.done && gs.won) ? gs.attempts : -1;

    [1, 2, 3, 4, 5].forEach(function(n) {
      var count = stats.dist[n] || 0;
      var maxV  = Math.max.apply(null, [1,2,3,4,5].map(function(x) { return stats.dist[x] || 0; }).concat([1]));
      var pct   = Math.max(Math.round((count / maxV) * 100), 8);
      db.innerHTML +=
        '<div class="dist-row">' +
          '<span class="dist-num">' + n + '</span>' +
          '<div class="dist-bar-wrap">' +
            '<div class="dist-bar ' + (n === cur ? 'active' : '') + '" style="width:' + pct + '%">' +
              '<span>' + count + '</span>' +
            '</div>' +
          '</div>' +
        '</div>';
    });
  }

  if (type === 'stats') renderBadgesPanel();

  document.getElementById('overlay-' + type).classList.add('open');
}

function closeModal(type) {
  document.getElementById('overlay-' + type).classList.remove('open');
}

function closeOnBg(e, type) {
  if (e.target === e.currentTarget) closeModal(type);
}

/* ── TOAST ────────────────────────────────────────────────── */
function toast(msg) {
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 2000);
}

/* ── FECHAR AUTOCOMPLETE AO CLICAR FORA ───────────────────── */
document.addEventListener('click', function(e) {
  if (!e.target.closest('.input-wrap')) {
    hideAC();
    hideArchiveAC();
  }
});
