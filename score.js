/* ============================================================
   score.js — Conduta.
   Cálculo puro dos 4 eixos → selos 'g' | 'y' | 'r'.
   Sem DOM: testável direto no console.

   computeScore(caseData, answers)
     answers = [{ optionIdx, ms }, ×3]  (optionIdx no array
     ORIGINAL de options do caso, ms = tempo da decisão)
   → {
       seals:       { diag, seg, rap, cond },
       perDecision: ['g'|'y'|'r', ×3],
       composite:   0–100
     }
   ============================================================ */

var SCORE_TIME_FLOOR_S = 5;    // piso anti-clique-no-escuro
var SCORE_TIME_CAP_S   = 120;  // teto por decisão
var SCORE_TIME_TARGET_S = 25;  // alvo default por decisão
var SCORE_D1_WEIGHT    = 2;    // D1 (primeira conduta) pesa 2x

function qualityPoints(opt) {
  if (!opt) return 0;
  if (opt.quality === 'best') return 2;
  if (opt.quality === 'acceptable') return 1;
  return 0;
}

/* selo de uma decisão isolada (grid do card compartilhável) */
function decisionSeal(opt) {
  if (!opt) return 'r';
  if (opt.dangerous) return 'r';
  if (opt.quality === 'best') return 'g';
  if (opt.quality === 'acceptable') return 'y';
  return 'r';
}

function computeScore(caseData, answers) {
  var chosen = caseData.decisions.map(function (d, i) {
    var a = answers[i] || {};
    return d.options[a.optionIdx] || null;
  });

  /* ── Diagnóstico: qualidade de D2 (hipótese) + D3 (conduta final) ── */
  var diagPts = qualityPoints(chosen[1]) + qualityPoints(chosen[2]); // 0–4
  var diagSeal = diagPts >= 3 ? 'g' : diagPts === 2 ? 'y' : 'r';

  /* ── Segurança: binário de propósito — perigo não tem meio-termo ── */
  var dangerCount = chosen.filter(function (o) { return o && o.dangerous; }).length;
  var segSeal = dangerCount === 0 ? 'g' : 'r';

  /* ── Qualidade da conduta: pontos de "processo ruim" ── */
  var condPts = 0;
  chosen.forEach(function (o, i) {
    if (!o) { condPts += 1; return; }
    if (o.redundant) condPts += 1;
    if (o.dangerous) condPts += 1;
    if (i === 0 && qualityPoints(o) === 0) condPts += 1; // primeira conduta errada
  });
  var condSeal = condPts === 0 ? 'g' : condPts === 1 ? 'y' : 'r';

  /* ── Rapidez: média ponderada do tempo ajustado vs alvo ──
     Só decisão ≥ acceptable ganha crédito de rapidez; errada
     entra como teto (chutar rápido e errar não premia). */
  var wSum = 0, tSum = 0, targetSum = 0;
  caseData.decisions.forEach(function (d, i) {
    var w = i === 0 ? SCORE_D1_WEIGHT : 1;
    var target = d.timeTarget || SCORE_TIME_TARGET_S;
    var a = answers[i] || {};
    var secs;
    if (qualityPoints(chosen[i]) >= 1) {
      secs = Math.max(SCORE_TIME_FLOOR_S, Math.min((a.ms || 0) / 1000, SCORE_TIME_CAP_S));
    } else {
      secs = SCORE_TIME_CAP_S;
    }
    wSum += w;
    tSum += w * secs;
    targetSum += w * target;
  });
  var ratio = targetSum > 0 ? tSum / targetSum : 99;
  var rapSeal = ratio <= 1 ? 'g' : ratio <= 2 ? 'y' : 'r';

  /* ── Composto 0–100 ──
     Pesos: diagnóstico 40 (é o cerne), segurança 25 (decisão
     perigosa zera esse bloco), qualidade da conduta 20, rapidez
     15 (modificador). Mesma escala que alimenta percentil e liga
     — a NOTA exibida (0–10) é este composto / 10, então nota,
     ranking e percentil são coerentes por construção. */
  var sealNorm = function (s) { return s === 'g' ? 1 : s === 'y' ? 0.5 : 0; };
  var composite = Math.round(
    40 * (diagPts / 4) +
    25 * (segSeal === 'g' ? 1 : 0) +
    20 * sealNorm(condSeal) +
    15 * sealNorm(rapSeal)
  );

  return {
    seals: { diag: diagSeal, seg: segSeal, rap: rapSeal, cond: condSeal },
    perDecision: chosen.map(decisionSeal),
    composite: composite,
    grade: composite / 10
  };
}

/* ── NOTA 0–10 (exibida no resultado; palpável tipo nota de prova) ──
   Faixas alinhadas à intuição de nota escolar BR: ≥7 aprova com
   folga (verde), 5–7 limítrofe (amarelo), <5 reprova / de risco
   (vermelho). O selo de cada eixo continua sendo o próprio selo. */
function gradeBand(grade) {
  return grade >= 7 ? 'g' : grade >= 5 ? 'y' : 'r';
}
function gradeWord(grade) {
  if (grade >= 9) return 'Excelente';
  if (grade >= 8) return 'Muito bom';
  if (grade >= 7) return 'Bom';
  if (grade >= 5) return 'Regular';
  return 'Conduta de risco';
}
function formatGrade(grade) {
  return grade.toFixed(1).replace('.', ',');
}

window.computeScore = computeScore;
window.decisionSeal = decisionSeal;
window.qualityPoints = qualityPoints;
window.gradeBand = gradeBand;
window.gradeWord = gradeWord;
window.formatGrade = formatGrade;
