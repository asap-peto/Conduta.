/* ============================================================
   share.js — Conduta.
   Card compartilhável: texto estilo Wordle + imagem via canvas.
   Nunca revela o conteúdo do caso — só tema, selos e percentil.
   ============================================================ */

var SHARE_URL = 'conduta.cc';

function sealEmoji(s) {
  return s === 'g' ? '🟩' : s === 'y' ? '🟨' : '🟥';
}

/* ── TEXTO ─────────────────────────────────────────────────
   Conduta 🫀 #23
   🟩🟨🟩 ⏱️🟩
   Dx 🟩  Seg 🟩  Rap 🟨  Cond 🟩
   Top 18% · 🔥 12 dias
   conduta.cc
   ──────────────────────────────────────────────────────── */
function buildShareText(opts) {
  // opts: { themeIcon, dayNumber, perDecision, seals, percentile, streak }
  var lines = [];
  lines.push('Conduta ' + opts.themeIcon + ' #' + opts.dayNumber);
  lines.push(opts.perDecision.map(sealEmoji).join('') + ' ⏱️' + sealEmoji(opts.seals.rap));
  lines.push(
    'Dx ' + sealEmoji(opts.seals.diag) +
    '  Seg ' + sealEmoji(opts.seals.seg) +
    '  Rap ' + sealEmoji(opts.seals.rap) +
    '  Cond ' + sealEmoji(opts.seals.cond)
  );
  var line4 = [];
  if (typeof opts.percentile === 'number') line4.push('Top ' + opts.percentile + '%');
  if (opts.streak > 0) line4.push('🔥 ' + opts.streak + (opts.streak === 1 ? ' dia' : ' dias'));
  if (line4.length) lines.push(line4.join(' · '));
  lines.push(SHARE_URL);
  return lines.join('\n');
}

/* ── IMAGEM (canvas 1080×1080) ─────────────────────────────── */
var SHARE_COLORS = { g: '#cefc8a', y: '#f7e96b', r: '#ff6b6b' };

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function buildShareImage(opts) {
  var W = 1080, H = 1080;
  var cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  var ctx = cv.getContext('2d');

  // fundo roxo Conduta com brilho suave no topo
  ctx.fillStyle = '#260429';
  ctx.fillRect(0, 0, W, H);
  var glow = ctx.createRadialGradient(W / 2, -100, 50, W / 2, -100, 700);
  glow.addColorStop(0, 'rgba(94,41,101,0.85)');
  glow.addColorStop(1, 'rgba(38,4,41,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, 700);

  // wordmark "Conduta." com ponto lima
  ctx.textAlign = 'center';
  ctx.font = '800 64px "DM Sans", system-ui, sans-serif';
  var wm = 'Conduta.';
  var wmWidth = ctx.measureText(wm).width;
  var dotWidth = ctx.measureText('.').width;
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Conduta', W / 2 - dotWidth / 2, 120);
  ctx.fillStyle = '#cefc8a';
  ctx.fillText('.', W / 2 + wmWidth / 2 - dotWidth / 2, 120);

  // ícone do tema + número do dia
  ctx.font = '170px system-ui';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(opts.themeIcon, W / 2, 330);
  ctx.fillStyle = '#d2cbfe';
  ctx.font = '700 44px "DM Sans", system-ui, sans-serif';
  ctx.fillText('Caso #' + opts.dayNumber, W / 2, 410);

  // grid de 3 selos grandes (decisões)
  var s = 150, gap = 36;
  var total = 3 * s + 2 * gap;
  var x0 = (W - total) / 2, y0 = 470;
  for (var i = 0; i < 3; i++) {
    ctx.fillStyle = SHARE_COLORS[opts.perDecision[i]] || '#D3D6DA';
    roundRect(ctx, x0 + i * (s + gap), y0, s, s, 28);
    ctx.fill();
  }

  // linha dos 4 eixos com rótulos
  var axes = [
    ['Dx', opts.seals.diag], ['Seg', opts.seals.seg],
    ['Rap', opts.seals.rap], ['Cond', opts.seals.cond]
  ];
  var s2 = 64, gap2 = 130;
  var total2 = 4 * s2 + 3 * gap2;
  var x1 = (W - total2) / 2, y1 = 710;
  axes.forEach(function (ax, i) {
    var x = x1 + i * (s2 + gap2);
    ctx.fillStyle = SHARE_COLORS[ax[1]];
    roundRect(ctx, x, y1, s2, s2, 16);
    ctx.fill();
    ctx.fillStyle = '#d2cbfe';
    ctx.font = '700 30px "DM Sans", system-ui, sans-serif';
    ctx.fillText(ax[0], x + s2 / 2, y1 + s2 + 44);
  });

  // percentil
  if (typeof opts.percentile === 'number') {
    ctx.fillStyle = '#cefc8a';
    ctx.font = '800 52px "DM Sans", system-ui, sans-serif';
    ctx.fillText('Top ' + opts.percentile + '% de hoje', W / 2, 930);
  }

  // rodapé: streak + url
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 38px "DM Sans", system-ui, sans-serif';
  var footer = (opts.streak > 0 ? '🔥 ' + opts.streak + '  ·  ' : '') + SHARE_URL;
  ctx.fillText(footer, W / 2, 1010);

  return cv;
}

/* ── CADEIA DE COMPARTILHAMENTO ────────────────────────────── */
async function shareResult(opts) {
  var text = buildShareText(opts);

  // 1) Web Share com imagem
  try {
    var canvas = buildShareImage(opts);
    var blob = await new Promise(function (res) { canvas.toBlob(res, 'image/png'); });
    if (blob && navigator.canShare) {
      var file = new File([blob], 'conduta-' + opts.dayNumber + '.png', { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: text });
        return;
      }
    }
  } catch (e) {
    if (e && e.name === 'AbortError') return; // usuário cancelou
  }

  // 2) Web Share só texto
  try {
    if (navigator.share) { await navigator.share({ text: text }); return; }
  } catch (e) {
    if (e && e.name === 'AbortError') return;
  }

  // 3) Clipboard
  copyShareText(opts);
}

async function copyShareText(opts) {
  var text = buildShareText(opts);
  try {
    await navigator.clipboard.writeText(text);
    toast('Resultado copiado!');
  } catch (e) {
    toast('Não foi possível copiar.');
  }
}

window.buildShareText = buildShareText;
window.buildShareImage = buildShareImage;
window.shareResult = shareResult;
window.copyShareText = copyShareText;
