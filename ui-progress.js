/* ============================================================
   ui-progress.js — Conduta.
   Missões e tela de conclusão de nível.
   ============================================================ */

// ══════════════════════════════════════════════════════════
// QUESTS (MISSÕES)
// ══════════════════════════════════════════════════════════
function renderQuests() {
  const pane = document.getElementById('tab-quests');
  const today = todayKey();
  const levelsToday = player.levelsCompleted.filter(c => completedOnDay(c, today)).length;
  const perfectToday = player.levelsCompleted.filter(c => completedOnDay(c, today) && c.perfect).length;

  const quests = [
    { ic: 'target', color: 'var(--lime)',   title: 'Complete 1 nível hoje',   desc: 'Missão diária', have: Math.min(1, levelsToday), need: 1, reward: 10 },
    { ic: 'star',   color: 'var(--yellow)', title: 'Um acerto perfeito hoje', desc: '100% de acertos em um nível', have: Math.min(1, perfectToday), need: 1, reward: 15 },
    { ic: 'flame',  color: 'var(--orange)', title: 'Mantenha streak 7 dias',  desc: 'Missão semanal', have: Math.min(7, player.streak), need: 7, reward: 30 },
    { ic: 'trophy', color: 'var(--lilac)',  title: 'Alcance Liga Prata',      desc: 'Acumule 200 XP no total', have: Math.min(200, player.totalXp), need: 200, reward: 50 }
  ];

  pane.innerHTML = `
    <div class="section-title" style="margin-top:0">MISSÕES ATIVAS</div>
    ${quests.map(q => `
      <div class="quest-card">
        <div class="quest-icon" style="color:${q.color}">${icon(q.ic, 26)}</div>
        <div class="quest-body">
          <div class="quest-title">${escapeHtml(q.title)}</div>
          <div class="quest-desc">${escapeHtml(q.desc)} · ${q.have}/${q.need}</div>
          <div class="quest-prog"><div class="quest-prog-fill" style="width:${Math.min(100, (q.have/q.need)*100)}%"></div></div>
        </div>
        <div class="quest-reward">${icon('gem', 14, 'icn-inline')} +${q.reward}</div>
      </div>
    `).join('')}
  `;
}

// ══════════════════════════════════════════════════════════
// LEVEL COMPLETE
// ══════════════════════════════════════════════════════════
function renderComplete({ level, correctCount, totalCount, perfect, xpGained, gemsGained, streakInfo, heartsUsed, elapsedSec }) {
  const view = document.getElementById('view-complete');
  const shareText = shareResult(level, correctCount, totalCount, xpGained);
  const nextLevel = getLevelByNumber(player.currentLevel);
  const seasonDone = !nextLevel;

  let streakMsg = '';
  if (streakInfo.started)      streakMsg = 'Streak iniciado!';
  else if (streakInfo.broken)  streakMsg = 'Streak reiniciado';
  else if (streakInfo.freezeUsed) streakMsg = 'Streak freeze usado!';
  else if (streakInfo.changed) streakMsg = `Streak de ${streakInfo.streak} dias`;

  const title = perfect ? 'Perfeito!' : (correctCount === 0 ? 'Tudo bem, errar faz parte.' : 'Bem feito!');
  const heroIcon = perfect ? 'trophy' : (correctCount/totalCount >= 0.7 ? 'star' : (correctCount > 0 ? 'thumbUp' : 'shield'));
  const heroColor = perfect ? 'var(--lime)' : (correctCount/totalCount >= 0.7 ? 'var(--yellow)' : (correctCount > 0 ? 'var(--cyan)' : 'var(--orange)'));
  const nextCta = seasonDone
    ? {
        kicker: 'Temporada beta concluída',
        title: 'Você zerou o mapa atual',
        body: 'Revisite os níveis passados enquanto novos casos chegam.',
        action: `<button class="btn-ghost" onclick="goHome()">Revisar jornada</button>`
      }
    : player.isPro
      ? {
          kicker: 'Próximo plantão disponível',
          title: `Nível ${nextLevel.number} · ${escapeHtml(nextLevel.title)}`,
          body: 'Você é Pro, então pode continuar agora mesmo.',
          action: `<button class="btn-primary" onclick="startLevel(${nextLevel.id})">${icon('play', 16, 'icn-inline')} Continuar agora</button>`
        }
      : {
          kicker: 'Próximo plantão',
          title: `${escapeHtml(nextLevel.title)}`,
          body: 'Seu próximo caso novo fica reservado para amanhã. Hoje você ainda pode revisar níveis anteriores.',
          action: `<button class="btn-ghost" onclick="goHome()">Voltar ao mapa</button>`
        };

  view.innerHTML = `
    <div class="complete-wrap">
      <div class="complete-emoji" style="color:${heroColor}">${icon(heroIcon, 72)}</div>
      <div class="complete-title">${title}</div>
      <div class="complete-sub">Nível ${level.number} — ${escapeHtml(level.title)}${streakMsg ? ' · ' + streakMsg : ''}</div>

      <div class="complete-stats">
        <div class="cstat">
          <div class="cstat-val">+${xpGained}</div>
          <div class="cstat-lbl">${icon('bolt', 12, 'icn-inline')} XP</div>
        </div>
        <div class="cstat">
          <div class="cstat-val">+${gemsGained}</div>
          <div class="cstat-lbl">${icon('gem', 12, 'icn-inline')} Gemas</div>
        </div>
        <div class="cstat">
          <div class="cstat-val">${correctCount}/${totalCount}</div>
          <div class="cstat-lbl">Acertos</div>
        </div>
      </div>

      <div class="next-step-card">
        <div class="takeaway-title">${escapeHtml(nextCta.kicker)}</div>
        <div class="next-step-title">${escapeHtml(nextCta.title)}</div>
        <div class="next-step-body">${escapeHtml(nextCta.body)}</div>
        <div class="next-step-badges">
          <span class="mini-badge">${icon('book', 14, 'icn-inline')} ${player.levelsCompleted.length} níveis completos</span>
          <span class="mini-badge">${icon('flame', 14, 'icn-inline')} ${player.streak} dias de streak</span>
          <span class="mini-badge">${icon('heart', 14, 'icn-inline')} ${player.isPro ? '∞' : Math.max(0, player.hearts)} corações</span>
        </div>
        ${nextCta.action}
      </div>

      <div class="takeaway-card">
        <div class="takeaway-title">Pontos-chave</div>
        <ul class="takeaway-list">
          ${(level.takeaway || []).map(t => `<li>${escapeHtml(t)}</li>`).join('')}
        </ul>
        ${level.reference ? `<div class="reference-line">Fonte: ${escapeHtml(level.reference)}</div>` : ''}
      </div>

      <button class="btn-big" onclick="goHome()">Voltar ao mapa</button>
      <div class="share-row">
        <button class="share-btn" onclick='shareWhatsapp(${JSON.stringify(shareText)})'>${icon('share', 16, 'icn-inline')} WhatsApp</button>
        <button class="share-btn" onclick='copyShare(${JSON.stringify(shareText)})'>Copiar</button>
      </div>

      ${!currentUser ? `
        <div style="margin-top:26px;padding:14px;background:var(--bg2);border:1px solid var(--border);border-radius:12px;font-size:13px;color:var(--muted);text-align:center">
          Quer salvar seu progresso? <button class="btn-link" onclick="openLoginModal()" style="padding:0">Criar conta</button>
        </div>
      ` : ''}
    </div>
  `;
}
