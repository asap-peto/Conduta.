/* ============================================================
   ui-shell.js — Conduta.
   Header e elementos globais de interface.
   ============================================================ */

// ══════════════════════════════════════════════════════════
// HEADER STATS (streak, hearts, gems)
// ══════════════════════════════════════════════════════════
function renderHeaderStats() {
  const wrap = document.getElementById('header-stats');
  if (!wrap) return;
  if (!player.onboarded) {
    wrap.style.visibility = 'hidden';
    wrap.innerHTML = '';
    return;
  }
  wrap.style.visibility = 'visible';
  const cold = player.streak === 0 ? ' cold' : '';
  const heartsVal = player.isPro ? '∞' : player.hearts;
  wrap.innerHTML = `
    <div class="stat-pill pill-streak${cold}" title="Streak">
      ${icon('flame', 18)}<span class="pill-val">${player.streak}</span>
    </div>
    <div class="stat-pill pill-hearts" title="Vidas">
      ${icon('heart', 18)}<span class="pill-val">${heartsVal}</span>
    </div>
    <div class="stat-pill pill-gems" title="Gemas">
      ${icon('gem', 18)}<span class="pill-val">${player.gems}</span>
    </div>
    <button class="avatar-btn" onclick="goProfile()" title="Perfil">
      ${icon('stethoscope', 20)}
    </button>
  `;
}
