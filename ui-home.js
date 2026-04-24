/* ============================================================
   ui-home.js — Conduta.
   Home, hero, mapa de níveis e card diário.
   ============================================================ */

// ══════════════════════════════════════════════════════════
// HOME — LEVEL MAP
// ══════════════════════════════════════════════════════════
function renderHome() {
  homeSelectedLevelId = null;
  renderHeaderStats();
  renderBottomNav();
  renderHomeHero();
  renderTodayCard();
  renderLevelMap();
  // Default tab = jogar
  document.getElementById('tab-jogar').style.display = 'block';
  document.getElementById('tab-liga').style.display = 'none';
  document.getElementById('tab-quests').style.display = 'none';
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === 'jogar');
  });
  updateHomeHeroVisibility('jogar');
}

function renderBottomNav() {
  const nav = document.getElementById('home-tabs-nav');
  if (!nav) return;
  const tabs = [
    { k: 'jogar',  label: 'Jornada',  ic: 'target' },
    { k: 'liga',   label: 'Liga',     ic: 'trophy' },
    { k: 'quests', label: 'Missões',  ic: 'flame'  },
    { k: 'profile',label: 'Perfil',   ic: 'stethoscope' }
  ];
  nav.innerHTML = tabs.map(t => {
    if (t.k === 'profile') {
      return `<button class="tab-btn" onclick="goProfile()">${icon(t.ic, 20)}<span>${t.label}</span></button>`;
    }
    return `<button class="tab-btn ${t.k === 'jogar' ? 'active' : ''}" data-tab="${t.k}">${icon(t.ic, 20)}<span>${t.label}</span></button>`;
  }).join('');
  nav.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => setTab(btn.dataset.tab));
  });
}

function getTodayCompletions() {
  const today = todayKey();
  return player.levelsCompleted.filter(c => completedOnDay(c, today));
}

function isSeasonComplete() {
  return !todaysLevel() && !getLevelByNumber(player.currentLevel);
}

function formatWeekRange(isoDate) {
  const startKey = isoDate || weekStart();
  const start = new Date(startKey + 'T00:00:00');
  const end = new Date(start.getTime());
  end.setDate(start.getDate() + 6);
  const fmt = { day: '2-digit', month: 'short' };
  return `${start.toLocaleDateString('pt-BR', fmt)} - ${end.toLocaleDateString('pt-BR', fmt)}`;
}

function renderHomeHero() {
  // Usa o container estável .home-hero (em vez de #home-mascot que é substituído)
  const wrap = document.querySelector('#view-home .home-hero');
  if (!wrap) return;

  const info = getLeagueInfo();
  const name = (player.displayName || '').trim() || 'Estudante';
  const firstName = name.split(' ')[0];
  const today = todaysLevel();
  const completed = player.levelsCompleted.length;
  const seasonDone = isSeasonComplete();

  let subIcon = 'target';
  let subLine;
  if (seasonDone) {
    subIcon = 'trophy';
    subLine = `Temporada concluída · ${completed}/${TOTAL_LEVELS} casos`;
  } else if (today) {
    const alreadyDone = player.levelsCompleted.some(c => c.id === today.id);
    subLine = alreadyDone
      ? `Nível ${today.number} em replay · ${today.title}`
      : `Nível ${today.number} te espera · ${today.title}`;
  } else {
    subLine = `${completed}/${TOTAL_LEVELS} casos resolvidos`;
  }

  const progressHtml = buildHeroProgressHtml(info);

  wrap.innerHTML = `
    <div class="hero-card">
      <div class="hero-row">
        <div class="hero-greeting">
          <div class="hero-hi">Olá, ${escapeHtml(firstName)}</div>
          <div class="hero-bubble">${icon(subIcon, 14, 'icn-inline')} ${escapeHtml(subLine)}</div>
        </div>
        <button class="hero-avatar" onclick="goProfile()" aria-label="Perfil">${icon('stethoscope', 22)}</button>
      </div>
      ${progressHtml}
    </div>
  `;

  // Se logado e o hub ainda não foi carregado, busca e re-renderiza
  if (currentUser && _supabase && !leagueHubState.ready && !leagueHubState.loading) {
    loadLeagueHub().then(() => {
      if (currentView === 'home') renderHomeHero();
    });
  }
}

function updateHomeHeroVisibility(activeTab) {
  const wrap = document.querySelector('#view-home .home-hero');
  if (!wrap) return;
  wrap.style.display = (activeTab === 'jogar' || activeTab === 'quests') ? 'block' : 'none';
}

function buildHeroProgressHtml(info) {
  const activeMemberships = (leagueHubState.memberships || [])
    .filter(m => m.membership_status === 'active');

  if (currentUser && activeMemberships.length) {
    const preferred =
      activeMemberships.find(m => m.league_id === leagueHubState.selectedLeagueId) ||
      activeMemberships[0];
    const standings = leagueHubState.standings || [];
    const standingsMatch = preferred.league_id === leagueHubState.selectedLeagueId && standings.length > 0;
    const myIdx = standingsMatch ? standings.findIndex(s => s.user_id === currentUser.id) : -1;
    const myRank = myIdx >= 0 ? myIdx + 1 : null;
    const totalMembers = preferred.active_members || standings.length || 0;
    const extra = activeMemberships.length - 1;

    // Progresso = quão perto de passar quem está acima; #1 = 100%
    let pct = 40;
    if (myRank === 1) pct = 100;
    else if (myRank && myIdx > 0) {
      const me = standings[myIdx];
      const above = standings[myIdx - 1];
      const aboveXp = Math.max(1, above.weekly_xp);
      const diff = Math.max(0, above.weekly_xp - me.weekly_xp);
      pct = Math.max(15, Math.min(95, 100 - Math.round((diff / aboveXp) * 100)));
    }

    const rankLabel = myRank
      ? `#${myRank} de ${totalMembers || myRank}`
      : (standingsMatch ? 'Entre no rank' : 'Carregando rank...');
    const xpLabel = `${player.leagueXpWeek} XP semanal`;

    return `
      <button class="hero-progress" onclick="setTab('liga')" aria-label="Ver liga privada">
        <div class="hero-progress-head">
          <span class="hero-progress-label">
            <span class="hero-league-emoji">🏟️</span>
            ${escapeHtml(preferred.league_name)}
            ${extra > 0 ? `<span class="hero-league-extra">+${extra}</span>` : ''}
          </span>
          <span class="hero-progress-value">${escapeHtml(rankLabel)} · ${escapeHtml(xpLabel)}</span>
        </div>
        <div class="hero-progress-bar"><div class="hero-progress-fill" style="width:${pct}%"></div></div>
      </button>
    `;
  }

  // Fallback — liga global por XP total
  const pct = Math.max(0, Math.min(100, Math.round((info.progress || 0) * 100)));
  const xpInLeague = Math.max(0, player.totalXp - info.current.minXp);
  const xpToNext = info.next ? (info.next.minXp - info.current.minXp) : 0;
  const progressLine = info.next
    ? `${xpInLeague}/${xpToNext} XP · ${info.next.emoji} ${info.next.name}`
    : `${player.totalXp} XP · liga máxima`;

  return `
    <button class="hero-progress" onclick="setTab('liga')" aria-label="Ver liga">
      <div class="hero-progress-head">
        <span class="hero-progress-label">
          <span class="hero-league-emoji">${info.current.emoji}</span>
          Liga ${escapeHtml(info.current.name)}
        </span>
        <span class="hero-progress-value">${escapeHtml(progressLine)}</span>
      </div>
      <div class="hero-progress-bar"><div class="hero-progress-fill" style="width:${pct}%"></div></div>
    </button>
  `;
}

function buildMascotMessage() {
  if (isSeasonComplete()) return 'Você zerou a temporada beta. Hora de revisar seus casos favoritos.';
  if (!player.lastPlayedDay) return 'Pronto pro seu primeiro plantão? Toque no nível abaixo.';
  if (player.lastPlayedDay === todayKey()) {
    return player.isPro
      ? 'Já jogou hoje, Pro. Quer mais um caso?'
      : 'Plantão de hoje concluído. Você ainda pode revisar níveis passados.';
  }
  const today = todaysLevel();
  return `Paciente esperando! Nível ${today ? today.number : player.currentLevel} está pronto.`;
}

function renderTodayCard() {
  const today = todaysLevel();
  const card = document.getElementById('today-card');
  const jogarTab = document.getElementById('tab-jogar');
  const selectedLevel = homeSelectedLevelId ? getLevel(homeSelectedLevelId) : null;

  if (!today && !selectedLevel) {
    if (jogarTab) jogarTab.classList.add('with-today-card');
    if (card) card.classList.remove('is-hidden');
    const lastCompletion = player.levelsCompleted[player.levelsCompleted.length - 1];
    const lastLevel = lastCompletion ? getLevel(lastCompletion.id) : null;
    card.innerHTML = `
      <div class="today-top">
      <div class="today-art"><span class="case-emoji lg" aria-hidden="true">🏆</span></div>
        <div class="today-head">
          <div class="today-kicker">Temporada concluída</div>
          <div class="today-title">Você fechou os ${TOTAL_LEVELS} níveis da beta</div>
          <div class="today-meta">
            <span>Seu progresso continua salvo</span>
            <span class="dot">·</span>
            <span>Novos casos podem entrar aqui depois</span>
          </div>
        </div>
      </div>
      <div class="today-badges">
        <span class="mini-badge">${icon('bolt', 14, 'icn-inline')} ${player.totalXp} XP total</span>
        <span class="mini-badge">${icon('flame', 14, 'icn-inline')} ${player.bestStreak} melhor streak</span>
        <span class="mini-badge">${icon('book', 14, 'icn-inline')} ${player.levelsCompleted.length} casos resolvidos</span>
      </div>
      <div class="today-note">
        ${lastLevel ? `Último caso concluído: ${escapeHtml(lastLevel.title)}.` : 'Escolha um caso anterior para revisar.'}
      </div>
      <button class="btn-big" onclick="${lastLevel ? `openPastLevel(${lastLevel.id})` : 'goProfile()'}">
        ${icon('play', 20, 'icn-inline')} ${lastLevel ? 'Revisar último caso' : 'Ver meu perfil'}
      </button>
    `;
    return;
  }

  const shouldShow = !!selectedLevel;
  if (jogarTab) jogarTab.classList.toggle('with-today-card', shouldShow);
  if (!shouldShow) {
    card.classList.add('is-hidden');
    card.innerHTML = '';
    return;
  }

  card.classList.remove('is-hidden');
  const mode = MODES[selectedLevel.mode];
  const completion = player.levelsCompleted.find(c => c.id === selectedLevel.id);
  const alreadyDone = !!completion;
  const isCurrent = !!today && selectedLevel.id === today.id;
  const firstOfDay = !hasCompletionOnDay(todayKey());
  const xpReward = previewLevelXp(selectedLevel, { firstOfDay, isReplay: alreadyDone });
  const gemsReward = alreadyDone ? 0 : (GEMS.levelComplete + GEMS.perfectScore);
  const xpBadge = alreadyDone ? 'Sem XP no replay' : `Ate +${xpReward} XP`;
  const gemBadge = alreadyDone ? 'Sem gemas no replay' : `Ate +${gemsReward}`;
  const scoreBadge = completion
    ? (completion.perfect ? 'Perfeito · 100%' : `${completion.score}/${getLevelStepCount(selectedLevel)} acertos`)
    : null;
  const kicker = isCurrent
    ? (alreadyDone ? 'Repetir de hoje' : 'Nível de hoje')
    : `Nível ${selectedLevel.number}`;
  const actionLabel = alreadyDone ? 'Praticar novamente' : 'Começar nível';
  card.innerHTML = `
    <div class="today-top">
      <div class="today-art mode-${selectedLevel.mode}">${levelEmojiHtml(selectedLevel, 'case-emoji lg')}</div>
      <div class="today-head">
        <div class="today-kicker">${escapeHtml(kicker)}</div>
        <div class="today-title">${escapeHtml(selectedLevel.title)}</div>
        <div class="today-meta">
          <span>${mode.label}</span>
          <span class="dot">·</span>
          <span>${escapeHtml(selectedLevel.specialty)}</span>
        </div>
      </div>
    </div>
    <div class="today-badges">
      <span class="mini-badge">${icon('clock', 14, 'icn-inline')} ${selectedLevel.estimatedMinutes} min</span>
      ${scoreBadge ? `<span class="mini-badge">${icon(completion.perfect ? 'star' : 'check', 14, 'icn-inline')} ${escapeHtml(scoreBadge)}</span>` : ''}
      <span class="mini-badge badge-reward">${icon('bolt', 14, 'icn-inline')} ${xpBadge}</span>
      <span class="mini-badge badge-reward">${icon('gem', 14, 'icn-inline')} ${gemBadge}</span>
    </div>
    <button class="btn-big" onclick="startLevel(${selectedLevel.id})">
      ${icon('play', 20, 'icn-inline')} ${actionLabel}
    </button>
  `;
}

// Ping-pong zig-zag: [0,1,2,3,4,3,2,1] — serpenteia suavemente sem reset abrupto
const SNAKE_PATTERN = [0, 1, 2, 3, 4, 3, 2, 1];
function snakeSide(idx) {
  return SNAKE_PATTERN[((idx % SNAKE_PATTERN.length) + SNAKE_PATTERN.length) % SNAKE_PATTERN.length];
}

function renderLevelMap() {
  const map = document.getElementById('level-map');
  // Atual no topo + passados descendo; sem preview de futuros, sem gaps de recompensa
  const visible = LEVELS
    .filter(lv => lv.number <= unlockedLevelNumber())
    .sort((a, b) => b.number - a.number);

  const items = visible.map((lv, idx) => renderLevelNode(lv, idx)).join('');
  map.innerHTML = `
    <div class="snake-path">
      <div class="snake-title">Caminho do plantão</div>
      ${items}
    </div>
  `;
}

function renderRewardGap(side, completed, upcomingCurrent) {
  const cls = completed ? 'completed' : (upcomingCurrent ? 'current' : 'locked');
  const ic  = completed ? 'check' : (upcomingCurrent ? 'bolt' : 'gem');
  return `
    <div class="snake-gap side-${side}">
      <div class="reward-mini ${cls}">${icon(ic, 14)}</div>
      <div class="reward-mini ${cls}">${icon(completed ? 'gem' : 'bolt', 14)}</div>
    </div>
  `;
}

function renderLevelNode(lv, idx) {
  const mode = MODES[lv.mode];
  const completion = player.levelsCompleted.find(c => c.id === lv.id);
  const today = todaysLevel();
  const unlocked = unlockedLevelNumber();

  const isCompleted = !!completion;
  const isCurrent   = !!today && lv.id === today.id && !isCompleted;
  const isLocked    = lv.number > unlocked;

  const classes = ['snake-node', `side-${snakeSide(idx)}`];
  if (isCompleted) classes.push('completed');
  if (isCurrent)   classes.push('current');
  if (isLocked)    classes.push('locked');
  if (homeSelectedLevelId === lv.id) classes.push('is-selected');

  const ariaLabel = `Nível ${lv.number}: ${lv.title}${isLocked ? ' (bloqueado)' : ''}`;

  // Completo → só número dentro do tile, sem label ao lado, abre modal de revisão
  if (isCompleted) {
    return `
      <button class="snake-node side-${snakeSide(idx)} completed minimal${homeSelectedLevelId === lv.id ? ' is-selected' : ''}" onclick="toggleTodayCard(${lv.id})" aria-label="${escapeHtml(ariaLabel)}" aria-pressed="${homeSelectedLevelId === lv.id ? 'true' : 'false'}">
        <div class="node-btn"><span class="node-num-big">${lv.number}</span></div>
      </button>
    `;
  }

  // Current → tile + label completo
  if (isCurrent) {
    const subLine = `${mode.label} · ${lv.estimatedMinutes} min`;
    return `
      <button class="${classes.join(' ')}" onclick="toggleTodayCard(${lv.id})" aria-label="${escapeHtml(ariaLabel)}" aria-pressed="${homeSelectedLevelId === lv.id ? 'true' : 'false'}">
        <div class="node-btn" style="border-color:${mode.color}; color:${mode.color};">
          ${levelEmojiHtml(lv, 'case-emoji node')}
          <span class="node-pulse"></span>
          <span class="node-start">COMEÇAR</span>
          <span class="char-avatar">${icon('stethoscope', 20)}</span>
        </div>
        <div class="node-label">
          <span class="node-num">N${lv.number}</span>
          <span class="node-title">${escapeHtml(lv.title)}</span>
          <span class="node-sub">${escapeHtml(subLine)}</span>
        </div>
      </button>
    `;
  }

  // Locked → fallback (não deve acontecer com filtro atual)
  return `
    <button class="${classes.join(' ')}" disabled aria-label="${escapeHtml(ariaLabel)}">
      <div class="node-btn">${icon('lock', 26)}</div>
    </button>
  `;
}

function toggleTodayCard(levelId) {
  const level = getLevel(levelId);
  if (!level || level.number > unlockedLevelNumber()) return;
  homeSelectedLevelId = homeSelectedLevelId === levelId ? null : levelId;
  renderTodayCard();
  renderLevelMap();
}

function openPastLevel(levelId) {
  const lv = getLevel(levelId);
  if (!lv) return;
  if (currentView === 'home') {
    homeSelectedLevelId = lv.id;
    renderTodayCard();
    renderLevelMap();
    return;
  }
  const completion = player.levelsCompleted.find(c => c.id === levelId);
  const mode = MODES[lv.mode];
  const scoreLine = completion
    ? (completion.perfect ? 'Perfeito — 100% de acertos' : `${completion.score} acertos`)
    : '';

  const modal = document.getElementById('modal-pastlevel');
  const body = document.getElementById('modal-pastlevel-body');
  body.innerHTML = `
    <div class="past-head">
      <div class="past-art mode-${lv.mode}">${levelEmojiHtml(lv, 'case-emoji md')}</div>
      <div class="past-info">
        <div class="past-kicker">Nível ${lv.number}</div>
        <div class="past-title">${escapeHtml(lv.title)}</div>
        <div class="past-meta">${mode.label} · ${escapeHtml(lv.specialty)}</div>
      </div>
    </div>
    <div class="past-badges">
      <span class="mini-badge">${icon('clock', 14, 'icn-inline')} ${lv.estimatedMinutes} min</span>
      ${scoreLine ? `<span class="mini-badge badge-reward">${icon('check', 14, 'icn-inline')} ${escapeHtml(scoreLine)}</span>` : ''}
    </div>
    <button class="btn-primary" onclick="closeModal('pastlevel'); startLevel(${levelId})">
      ${icon('play', 16, 'icn-inline')} Praticar novamente
    </button>
    <button class="btn-ghost" onclick="closeModal('pastlevel')">Fechar</button>
  `;
  modal.style.display = 'flex';
}
