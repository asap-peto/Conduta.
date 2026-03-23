/* ============================================================
   badges.js — Conduta.
   Sistema de streak diário e conquistas (badges).
   Depende de: stats, dayKey(), toast() — definidos antes.
   ============================================================ */

/* ── DEFINIÇÃO DOS BADGES ─────────────────────────────────── */
var BADGES = [
  // Eixo 1 — Streak (consistência médica)
  { id: 'streak_3',     emoji: '🩺', name: 'Interno',              desc: '3 dias consecutivos acertando' },
  { id: 'streak_7',     emoji: '📋', name: 'R1',                   desc: '7 dias consecutivos acertando' },
  { id: 'streak_14',    emoji: '🔬', name: 'R2',                   desc: '14 dias consecutivos acertando' },
  { id: 'streak_30',    emoji: '🏥', name: 'Residente',            desc: '30 dias consecutivos acertando' },
  { id: 'streak_60',    emoji: '🧠', name: 'Especialista',         desc: '60 dias consecutivos acertando' },
  { id: 'streak_100',   emoji: '👨‍⚕️', name: 'Staff',              desc: '100 dias consecutivos acertando' },
  { id: 'streak_365',   emoji: '🥇', name: 'Professor',            desc: '365 dias consecutivos acertando' },

  // Eixo 2 — Habilidade (qualidade do diagnóstico)
  { id: 'first_try',    emoji: '⚡', name: 'Diagnóstico Imediato', desc: 'Acertou na 1ª tentativa' },
  { id: 'olho_clinico', emoji: '🎯', name: 'Olho Clínico',         desc: '5 acertos seguidos na 1ª tentativa' },
  { id: 'clinico_geral',emoji: '📚', name: 'Clínico Geral',        desc: 'Acertou em 10 especialidades diferentes' },
  { id: 'plantonista',  emoji: '🌙', name: 'Plantonista',          desc: 'Acertou após as 23h em 7 dias' },
  { id: 'pre_visita',   emoji: '☕', name: 'Pré-Visita',           desc: 'Acertou antes das 7h em 5 dias' },
  { id: 'resiliencia',  emoji: '💀', name: 'Resiliência',          desc: 'Quebrou o streak 3 vezes e voltou' },
];

/* ── INICIALIZAÇÃO DOS CAMPOS (retrocompatível) ───────────── */
function ensureBadgeFields() {
  if (typeof stats.dayStreak          === 'undefined') stats.dayStreak          = 0;
  if (typeof stats.dayStreakBest      === 'undefined') stats.dayStreakBest      = 0;
  if (typeof stats.lastWinDate        === 'undefined') stats.lastWinDate        = '';
  if (typeof stats.lastFreezeWeek     === 'undefined') stats.lastFreezeWeek     = '';
  if (typeof stats.firstTryStreak     === 'undefined') stats.firstTryStreak     = 0;
  if (typeof stats.bestFirstTryStreak === 'undefined') stats.bestFirstTryStreak = 0;
  if (typeof stats.firstTryWins       === 'undefined') stats.firstTryWins       = 0;
  if (!Array.isArray(stats.specialtiesWon)) stats.specialtiesWon = [];
  if (!Array.isArray(stats.lateNightDays))  stats.lateNightDays  = [];
  if (!Array.isArray(stats.earlyMornDays))  stats.earlyMornDays  = [];
  if (typeof stats.streakBreaks       === 'undefined') stats.streakBreaks       = 0;
  if (typeof stats.badges             === 'undefined') stats.badges             = {};
}

/* ── UTILITÁRIOS DE DATA ─────────────────────────────────── */
function daysBetweenKeys(k1, k2) {
  var p1 = k1.split('-'), p2 = k2.split('-');
  var d1 = new Date(+p1[0], +p1[1] - 1, +p1[2]);
  var d2 = new Date(+p2[0], +p2[1] - 1, +p2[2]);
  return Math.round((d2 - d1) / 86400000);
}

function isoWeekKey(dateStr) {
  var p   = dateStr.split('-');
  var d   = new Date(+p[0], +p[1] - 1, +p[2]);
  var day = (d.getDay() + 6) % 7;      // 0 = segunda, 6 = domingo
  var thu = new Date(d);
  thu.setDate(d.getDate() - day + 3);  // quinta-feira da semana ISO
  var jan1 = new Date(thu.getFullYear(), 0, 1);
  var wk   = Math.ceil(((thu - jan1) / 86400000 + 1) / 7);
  return thu.getFullYear() + '-W' + String(wk).padStart(2, '0');
}

/* ── ATUALIZAÇÃO DO STREAK DIÁRIO ─────────────────────────── */
// Regras: janela de 24h, freeze de 1 dia por semana ISO
function updateDayStreak() {
  var today = dayKey();

  if (!stats.lastWinDate) {
    // Primeiro acerto de todos os tempos
    stats.dayStreak = 1;
  } else if (stats.lastWinDate === today) {
    // Já acertou hoje — idempotente
    return;
  } else {
    var diff = daysBetweenKeys(stats.lastWinDate, today);

    if (diff === 1) {
      // Acertou ontem — streak continua
      stats.dayStreak++;

    } else if (diff === 2) {
      // Pulou exatamente 1 dia — tenta aplicar freeze
      var thisWeek = isoWeekKey(today);
      if (stats.lastFreezeWeek !== thisWeek) {
        stats.lastFreezeWeek = thisWeek;
        stats.dayStreak++;
        setTimeout(function() { toast('🧊 Freeze aplicado — streak salvo!'); }, 900);
      } else {
        // Freeze já usado nesta semana
        if (stats.dayStreak > 1) stats.streakBreaks++;
        stats.dayStreak = 1;
      }

    } else {
      // Missed 2+ dias — reseta
      if (stats.dayStreak > 1) stats.streakBreaks++;
      stats.dayStreak = 1;
    }
  }

  stats.lastWinDate   = today;
  stats.dayStreakBest = Math.max(stats.dayStreakBest, stats.dayStreak);
}

/* ── MÉTRICAS DE BADGE ───────────────────────────────────── */
function updateBadgeMetrics(wonOnFirstTry, caseCategory) {
  var hour  = new Date().getHours();
  var today = dayKey();

  // First-try streak
  if (wonOnFirstTry) {
    stats.firstTryWins++;
    stats.firstTryStreak++;
    stats.bestFirstTryStreak = Math.max(stats.bestFirstTryStreak, stats.firstTryStreak);
  } else {
    stats.firstTryStreak = 0;
  }

  // Especialidades vencidas
  if (caseCategory && stats.specialtiesWon.indexOf(caseCategory) === -1) {
    stats.specialtiesWon.push(caseCategory);
  }

  // Plantonista: acertou após 23h
  if (hour >= 23 && stats.lateNightDays.indexOf(today) === -1) {
    stats.lateNightDays.push(today);
  }

  // Pré-Visita: acertou antes das 7h
  if (hour < 7 && stats.earlyMornDays.indexOf(today) === -1) {
    stats.earlyMornDays.push(today);
  }
}

/* ── VERIFICAÇÃO E DESBLOQUEIO ────────────────────────────── */
var BADGE_CHECKS = {
  streak_3:     function() { return stats.dayStreak >= 3; },
  streak_7:     function() { return stats.dayStreak >= 7; },
  streak_14:    function() { return stats.dayStreak >= 14; },
  streak_30:    function() { return stats.dayStreak >= 30; },
  streak_60:    function() { return stats.dayStreak >= 60; },
  streak_100:   function() { return stats.dayStreak >= 100; },
  streak_365:   function() { return stats.dayStreak >= 365; },
  first_try:    function() { return stats.firstTryWins >= 1; },
  olho_clinico: function() { return stats.bestFirstTryStreak >= 5; },
  clinico_geral:function() { return stats.specialtiesWon.length >= 10; },
  plantonista:  function() { return stats.lateNightDays.length >= 7; },
  pre_visita:   function() { return stats.earlyMornDays.length >= 5; },
  resiliencia:  function() { return stats.streakBreaks >= 3; },
};

function checkAndUnlockBadges() {
  var newBadges = [];
  BADGES.forEach(function(b) {
    if (!stats.badges[b.id] && BADGE_CHECKS[b.id] && BADGE_CHECKS[b.id]()) {
      stats.badges[b.id] = dayKey();
      newBadges.push(b);
    }
  });
  return newBadges;
}

/* ── PONTO DE ENTRADA: chamado em submitGuess() ───────────── */
// Síncrono — modifica stats antes do saveState() em submitGuess
function processBadgesOnWin(attempts, caseCategory) {
  ensureBadgeFields();
  updateDayStreak();
  updateBadgeMetrics(attempts === 1, caseCategory);
  var newBadges = checkAndUnlockBadges();
  // UI é assíncrona para dar tempo do card de resultado aparecer
  if (newBadges.length > 0) {
    setTimeout(function() { showBadgeUnlock(newBadges[0]); }, 1200);
  }
}

/* ── TEXTO DO CARD COMPARTILHÁVEL ─────────────────────────── */
function badgeShareText(badge) {
  return badge.emoji + ' Desbloqueei "' + badge.name + '" no Conduta.\n— ' + badge.desc + '.\n\nconduta.cc';
}

/* ── MODAL DE BADGE DESBLOQUEADO ─────────────────────────── */
function showBadgeUnlock(badge) {
  var overlay = document.getElementById('badge-unlock-overlay');
  if (!overlay) return;

  var text = badgeShareText(badge);
  document.getElementById('bul-emoji').textContent   = badge.emoji;
  document.getElementById('bul-name').textContent    = badge.name;
  document.getElementById('bul-desc').textContent    = badge.desc;
  document.getElementById('bul-preview').textContent = text;
  document.getElementById('bul-copy').setAttribute('data-share', text);
  document.getElementById('bul-copy').textContent    = '📋 Copiar e compartilhar';

  overlay.classList.add('open');
}

function closeBadgeUnlock() {
  var overlay = document.getElementById('badge-unlock-overlay');
  if (overlay) overlay.classList.remove('open');
}

function copyBadgeShare() {
  var btn  = document.getElementById('bul-copy');
  var text = btn.getAttribute('data-share');
  navigator.clipboard.writeText(text).then(function() {
    toast('Copiado!');
    btn.textContent = '✓ Copiado';
    setTimeout(function() { btn.textContent = '📋 Copiar e compartilhar'; }, 2000);
  });
}

/* ── PAINEL DE CONQUISTAS (modal de stats) ────────────────── */
function renderBadgesPanel() {
  ensureBadgeFields();

  // Streak diário
  var dsEl = document.getElementById('s-day-streak');
  var dbEl = document.getElementById('s-day-streak-best');
  if (dsEl) dsEl.textContent = stats.dayStreak     || 0;
  if (dbEl) dbEl.textContent = stats.dayStreakBest || 0;

  // Status do freeze
  var fEl = document.getElementById('s-freeze');
  if (fEl) {
    var thisWeek   = isoWeekKey(dayKey());
    var freezeUsed = stats.lastFreezeWeek === thisWeek;
    fEl.textContent = freezeUsed
      ? '🧊 Freeze usado esta semana'
      : '🧊 Freeze disponível (1 dia por semana)';
    fEl.className = 'freeze-status' + (freezeUsed ? ' used' : ' available');
  }

  // Grid de badges
  var el = document.getElementById('badges-panel');
  if (!el) return;

  el.innerHTML = '';
  BADGES.forEach(function(badge) {
    var unlocked = !!stats.badges[badge.id];
    var item     = document.createElement('div');
    item.className = 'badge-item' + (unlocked ? ' unlocked' : ' locked');
    item.title     = badge.name + ' — ' + badge.desc;
    item.innerHTML =
      '<div class="badge-emoji">' + (unlocked ? badge.emoji : '🔒') + '</div>' +
      '<div class="badge-name">' + badge.name + '</div>' +
      (unlocked ? '<div class="badge-desc">' + badge.desc + '</div>' : '');

    if (unlocked) {
      item.addEventListener('click', function() {
        navigator.clipboard.writeText(badgeShareText(badge)).then(function() {
          toast('Copiado!');
        });
      });
    }

    el.appendChild(item);
  });
}
