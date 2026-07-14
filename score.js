/* ============================================================
   score.js — Conduta.
   Pontuação sobre o MOTOR DE ETAPAS.

   computeScore(caseData, stageAnswers) → { composite, grade, seals, breakdown }
     - stageAnswers é paralelo a caseData.stages (reveal = {type:'reveal'}).
     - Cada eixo é normalizado 0–1; os pesos dos eixos PRESENTES são
       renormalizados pra somar 1. Assim composite = "fração da
       performance alcançável do dia" (percentil/liga coerentes).
   ============================================================ */

var SCORE_TIME_FLOOR_S  = 5;    // piso anti-clique-no-escuro
var SCORE_TIME_CAP_S    = 120;  // teto por decisão
var SCORE_TIME_TARGET_S = 25;   // alvo default por decisão
var SCORE_D1_WEIGHT     = 2;    // 1ª conduta pesa 2x na rapidez

var AXIS_WEIGHTS = { diag: 0.25, cond: 0.35, seg: 0.20, prio: 0.10, rap: 0.10 };

function qualityPoints(opt) {
  if (!opt) return 0;
  if (opt.quality === 'best') return 2;
  if (opt.quality === 'acceptable') return 1;
  return 0;
}
function bandFromScore(s, hi, mid) {
  return s >= (hi != null ? hi : 0.75) ? 'g' : s >= (mid != null ? mid : 0.5) ? 'y' : 'r';
}

function computeScore(caseData, stageAnswers) {
  var stages = caseData.stages || [];
  var ans = stageAnswers || [];

  // agrupa por tipo, preservando o stage e sua resposta
  var decisions = [];   // { stage, a }
  var diagPair = null;  // { stage, a }
  var seqPair = null;   // { stage, a }
  stages.forEach(function (s, i) {
    var a = ans[i];
    if (s.type === 'decision') decisions.push({ stage: s, a: a });
    else if (s.type === 'diagnosis') diagPair = { stage: s, a: a };
    else if (s.type === 'sequence') seqPair = { stage: s, a: a };
  });

  var chosen = decisions.map(function (d) {
    return (d.a && typeof d.a.optionIdx === 'number') ? d.stage.options[d.a.optionIdx] : null;
  });

  var present = {};   // eixo → score 0–1
  var seals = {};

  /* ── DIAGNÓSTICO ──────────────────────────────────────────
     Da etapa digitada (se houver). Senão, fallback das decisões
     de interpretação + final (compatibilidade com casos antigos). */
  if (diagPair) {
    var da = diagPair.a || {};
    var ds;
    if (da.correct) ds = da.attemptsUsed <= 1 ? 1 : da.attemptsUsed === 2 ? 0.75 : 0.5;
    else ds = 0;
    present.diag = ds;
    seals.diag = (da.correct && da.attemptsUsed <= 1) ? 'g' : da.correct ? 'y' : 'r';
  } else if (decisions.length >= 3) {
    var d2 = qualityPoints(chosen[1]);
    var d3 = qualityPoints(chosen[2]);
    present.diag = (d2 + d3) / 4;
    seals.diag = bandFromScore(present.diag);
  }

  /* ── CONDUTA ──────────────────────────────────────────────
     Qualidade média das decisões, menos penalidades de processo. */
  if (decisions.length) {
    var q = chosen.reduce(function (acc, o) { return acc + qualityPoints(o); }, 0);
    var base = q / (2 * decisions.length);
    var penalty = 0;
    chosen.forEach(function (o, i) {
      if (o && o.redundant) penalty += 0.15;
      if (i === 0 && qualityPoints(o) === 0) penalty += 0.15; // 1ª conduta ruim
    });
    var cond = Math.max(0, Math.min(1, base - penalty));
    present.cond = cond;
    seals.cond = bandFromScore(cond);
  }

  /* ── SEGURANÇA (binário) ──────────────────────────────────
     Qualquer decisão perigosa OU chute de diagnóstico perigoso. */
  var danger = chosen.some(function (o) { return o && o.dangerous; });
  if (diagPair && diagPair.a && diagPair.a.dangerousGuess) danger = true;
  present.seg = danger ? 0 : 1;
  seals.seg = danger ? 'r' : 'g';

  /* ── RAPIDEZ ──────────────────────────────────────────────
     Tempo ponderado das decisões cronometradas vs alvo. Só
     decisão ≥ acceptable ganha crédito (erro rápido não premia). */
  var timed = decisions.filter(function (d) { return d.stage.timeTarget != null || true; });
  if (timed.length) {
    var wSum = 0, tSum = 0, targetSum = 0;
    decisions.forEach(function (d, i) {
      var w = (d.stage.kind === 'initial' || i === 0) ? SCORE_D1_WEIGHT : 1;
      var target = d.stage.timeTarget || SCORE_TIME_TARGET_S;
      var ms = d.a ? d.a.ms : 0;
      var secs;
      if (qualityPoints(chosen[i]) >= 1) {
        secs = Math.max(SCORE_TIME_FLOOR_S, Math.min((ms || 0) / 1000, SCORE_TIME_CAP_S));
      } else {
        secs = SCORE_TIME_CAP_S;
      }
      wSum += w; tSum += w * secs; targetSum += w * target;
    });
    var ratio = targetSum > 0 ? tSum / targetSum : 99;
    var rap = ratio <= 1 ? 1 : ratio <= 2 ? 0.5 : 0;
    present.rap = rap;
    seals.rap = rap >= 1 ? 'g' : rap >= 0.5 ? 'y' : 'r';
  }

  /* ── PRIORIZAÇÃO (Fase 2 — sequência) ─────────────────────── */
  if (seqPair && seqPair.a && typeof seqPair.a.score === 'number') {
    present.prio = Math.max(0, Math.min(1, seqPair.a.score));
    seals.prio = bandFromScore(present.prio);
  }

  /* ── COMPOSITE (renormalizado sobre os eixos presentes) ──── */
  var wTotal = 0, wScore = 0;
  Object.keys(present).forEach(function (k) {
    var w = AXIS_WEIGHTS[k] || 0;
    wTotal += w;
    wScore += w * present[k];
  });
  var composite = wTotal > 0 ? Math.round(100 * wScore / wTotal) : 0;

  // grade de selos das decisões (share/home) + resumo do diagnóstico
  var perDecision = chosen.map(function (o) {
    if (!o) return 'r';
    if (o.dangerous) return 'r';
    return o.quality === 'best' ? 'g' : o.quality === 'acceptable' ? 'y' : 'r';
  });
  var dx = diagPair ? {
    correct: !!(diagPair.a && diagPair.a.correct),
    attemptsUsed: (diagPair.a && diagPair.a.attemptsUsed) || 0,
    maxAttempts: diagPair.stage.maxAttempts || 3
  } : null;

  return {
    composite: composite,
    grade: composite / 10,
    seals: seals,                 // { diag, seg, rap, cond, (prio) }
    perDecision: perDecision,     // seals das decisões (share/home)
    dx: dx,                       // { correct, attemptsUsed, maxAttempts } | null
    breakdown: present            // eixo → 0–1 (resultado detalhado)
  };
}

/* ── NOTA 0–10 (exibida) ──────────────────────────────────── */
function gradeBand(grade) { return grade >= 7 ? 'g' : grade >= 5 ? 'y' : 'r'; }
function gradeWord(grade) {
  if (grade >= 9) return 'Excelente';
  if (grade >= 8) return 'Muito bom';
  if (grade >= 7) return 'Bom';
  if (grade >= 5) return 'Regular';
  return 'Conduta de risco';
}
function formatGrade(grade) { return grade.toFixed(1).replace('.', ','); }

/* ── MATCHING do diagnóstico digitado ─────────────────────── */
function normalizeDx(s) {
  return String(s == null ? '' : s)
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")   // remove acentos
    .replace(/[^a-z0-9 ]/g, ' ')                         // pontuação → espaço
    .replace(/\s+/g, ' ')
    .trim();
}
/* → 'correct' | 'partial' | 'wrong' */
function matchDiagnosis(stage, guess) {
  var g = normalizeDx(guess);
  if (!g) return 'wrong';
  var accepted = (stage.acceptedAnswers || []).concat([stage.canonical || '']).map(normalizeDx);
  if (accepted.indexOf(g) !== -1) return 'correct';
  var partial = (stage.partialAnswers || []).map(normalizeDx);
  if (partial.indexOf(g) !== -1) return 'partial';
  return 'wrong';
}
function isDangerousGuess(stage, guess) {
  var g = normalizeDx(guess);
  return (stage.dangerousAnswers || []).map(normalizeDx).indexOf(g) !== -1;
}

window.computeScore = computeScore;
window.qualityPoints = qualityPoints;
window.gradeBand = gradeBand;
window.gradeWord = gradeWord;
window.formatGrade = formatGrade;
window.normalizeDx = normalizeDx;
window.matchDiagnosis = matchDiagnosis;
window.isDangerousGuess = isDangerousGuess;
