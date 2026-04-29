/* ============================================================
   ui.js — Conduta.
   Renderização das views: header stats, onboarding, home,
   level map, league, quests, complete, profile, SVGs médicos.
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

// ══════════════════════════════════════════════════════════
// ONBOARDING
// ══════════════════════════════════════════════════════════
let onbState = { step: 0, sampleAnswer: null };
let homeSelectedLevelId = null;
let leagueComposerOpen = false; // legado — mantém compat
let leagueModalMode = null; // 'create' | 'join' | 'edit' | null
let leagueEditingLeagueId = null;
let leagueRequestsOpen = false;
let profileSettingsOpen = false;
// Estado do feedback inline do username no modal de perfil. Mantido fora
// do DOM pra sobreviver a re-renders durante a digitação.
let profileUsernameState = {
  value: '',
  status: 'idle', // idle | checking | available | invalid
  errorCode: null,
  lastQuery: ''
};
let profileUsernameDebounce = null;
let levelMapExpanded = false;
let leagueSearchDebounce = null;

function renderOnboarding() {
  const view = document.getElementById('view-onboarding');
  onbState = { step: 0, sampleAnswer: null };

  view.innerHTML = `
    <div class="onb">
      <div class="onb-step active" data-step="0">
        ${onbStep1Html()}
      </div>
      <div class="onb-step" data-step="1">
        ${onbStep2Html()}
      </div>
      <div class="onb-step" data-step="2">
        ${onbStep3Html()}
      </div>
      <div class="onb-step" data-step="3">
        ${onbStep4Html()}
      </div>
      <div class="onb-step" data-step="4">
        ${onbStep5Html()}
      </div>
    </div>
  `;
}

function onbStep1Html() {
  return `
    <div class="onb-mascot">
      <div class="face">🦉</div>
      <div class="bubble">Oi! Sou o Dr. Coruja. Vamos começar com um caso rápido — sem cadastro, sem enrolação.</div>
    </div>
    <div class="onb-title">Conduta.</div>
    <div class="onb-sub">Treine sua conduta clínica todo dia. 3 minutos por dia. Como o Duolingo, mas para medicina.</div>
    <div class="onb-case-card">
      <span class="onb-case-tag">Caso demo</span>
      <div style="font-weight:600;margin-bottom:6px">Mulher, 28 anos, gestante de 32 semanas.</div>
      <div>Chega à emergência com cefaleia intensa, escotomas visuais e PA 165x110 mmHg. Proteinúria +++.</div>
    </div>
    <div class="question-title" style="font-size:16px;margin-bottom:14px">Qual a primeira conduta?</div>
    <div class="choice-list" id="onb-choices">
      ${renderOnbChoices()}
    </div>
    <button class="btn-big" id="onb-confirm" disabled onclick="onbConfirmDemo()">Confirmar</button>
  `;
}

function renderOnbChoices() {
  const opts = [
    'Alta com orientação de repouso e controle ambulatorial',
    'Sulfato de magnésio IV + controle pressórico + avaliar parto',
    'Captopril 25 mg VO e liberar',
    'Apenas analgesia e observação por 6h'
  ];
  return opts.map((o, i) => `
    <button class="choice" data-i="${i}" onclick="onbSelectDemo(${i})">
      <span>${escapeHtml(o)}</span>
      <span class="check">✓</span>
    </button>
  `).join('');
}

function onbSelectDemo(i) {
  onbState.sampleAnswer = i;
  document.querySelectorAll('#onb-choices .choice').forEach(el => {
    el.classList.toggle('selected', Number(el.dataset.i) === i);
  });
  document.getElementById('onb-confirm').disabled = false;
}

function onbConfirmDemo() {
  const correct = 1;
  const sel = onbState.sampleAnswer;
  document.querySelectorAll('#onb-choices .choice').forEach((el, i) => {
    el.disabled = true;
    el.classList.remove('selected');
    if (i === correct) el.classList.add('correct');
    if (i === sel && sel !== correct) el.classList.add('wrong');
  });
  const btn = document.getElementById('onb-confirm');
  btn.textContent = sel === correct ? 'Acertou! Continuar →' : 'Foi perto. Continuar →';
  btn.disabled = false;
  btn.onclick = () => { onbGoToStep(1); fireConfetti(); };
}

function onbStep2Html() {
  return `
    <div class="onb-mascot">
      <div class="face">🦉</div>
      <div class="bubble">Pré-eclâmpsia grave é emergência obstétrica. Sulfato de magnésio salva vida.</div>
    </div>
    <div class="onb-title">Você acabou de fazer o que o app faz.</div>
    <div class="onb-sub">Um caso por dia. Você decide a conduta. O app te ensina.</div>
    <div class="takeaway-card">
      <div class="takeaway-title">O que vem por aí</div>
      <ul class="takeaway-list">
        <li>7 modos diferentes — Conduta Clássica, Triagem, Imagem, Rapid Fire e mais</li>
        <li>Streak diário — mantenha o hábito como no Duolingo</li>
        <li>XP, gemas e liga semanal contra outros médicos e estudantes</li>
        <li>Casos raros toda semana</li>
      </ul>
    </div>
    <button class="btn-big" onclick="onbGoToStep(2)">Quero começar</button>
  `;
}

function onbStep3Html() {
  return `
    <div class="onb-title">Como a jornada funciona</div>
    <div class="onb-sub">Sem meta artificial e sem cronômetro. A ideia é simples: avance no seu ritmo.</div>
    <div class="takeaway-card">
      <div class="takeaway-title">Seu ritmo no Conduta</div>
      <ul class="takeaway-list">
        <li>Níveis novos liberados em sequência, sem limite diário por enquanto</li>
        <li>Replay liberado para revisar casos antigos quando quiser</li>
        <li>Streak, XP e liga semanal para dar contexto ao progresso</li>
      </ul>
    </div>
    <button class="btn-big" onclick="onbGoToStep(3)">Continuar</button>
  `;
}

function onbStep4Html() {
  return `
    <div class="onb-title">Conta é opcional</div>
    <div class="onb-sub">Você pode começar agora e decidir depois se quer salvar tudo na nuvem.</div>
    <div class="takeaway-card">
      <div class="takeaway-title">O que muda com conta</div>
      <ul class="takeaway-list">
        <li>Seu progresso fica salvo em qualquer dispositivo</li>
        <li>Seu streak e suas gemas acompanham você</li>
        <li>Entrar leva poucos segundos quando você quiser</li>
      </ul>
    </div>
    <button class="btn-big" onclick="onbGoToStep(4)">Continuar</button>
  `;
}

function onbStep5Html() {
  return `
    <div class="onb-mascot">
      <div class="face">🦉</div>
      <div class="bubble">Tudo pronto. Seu primeiro nível oficial está esperando.</div>
    </div>
    <div class="onb-title">Seu plantão começa agora.</div>
    <div class="onb-sub">Você pode criar conta quando quiser para salvar seu progresso em qualquer dispositivo.</div>
    <div class="takeaway-card">
      <div class="takeaway-title">O que você vai encontrar</div>
      <ul class="takeaway-list">
        <li>Um caso novo por dia</li>
        <li>Revisão livre dos casos anteriores</li>
        <li>7 níveis disponíveis nesta beta</li>
      </ul>
    </div>
    <button class="btn-big" onclick="finishOnboarding()">Começar nível 1</button>
    <button class="btn-link" onclick="openLoginModal()">Já tenho conta · entrar</button>
  `;
}

function onbGoToStep(n) {
  onbState.step = n;
  document.querySelectorAll('.onb-step').forEach(el => {
    el.classList.toggle('active', Number(el.dataset.step) === n);
  });
  window.scrollTo(0, 0);
}

function finishOnboarding() {
  player.onboarded = true;
  player.displayName = player.displayName || 'Você';
  savePlayer();
  renderHeaderStats();
  // Vai direto para o primeiro nível
  startLevel(1);
}

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
    { k: 'jogar',   label: 'Jornada', ic: 'target' },
    { k: 'liga',    label: 'Liga',    ic: 'trophy' },
    { k: 'quests',  label: 'Missões', ic: 'flame'  },
    { k: 'profile', label: 'Perfil',  ic: 'stethoscope' }
  ];
  nav.innerHTML = tabs.map(t =>
    `<button class="tab-btn" data-tab="${t.k}">${icon(t.ic, 20)}<span>${t.label}</span></button>`
  ).join('');
  nav.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.tab === 'profile') goProfile();
      else setTab(btn.dataset.tab);
    });
  });
  if (typeof refreshNavActive === 'function') refreshNavActive();
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

  // Sem liga ativa — em vez de uma CTA fraca, mostramos o streak do
  // usuário com destaque. Streak é o gancho principal de habit-building
  // (Duolingo style) e merece o espaço nobre da home.
  return buildHeroStreakHtml();
}

function buildHeroStreakHtml() {
  const streak = Math.max(0, player.streak || 0);
  const best = Math.max(0, player.bestStreak || 0);
  const freezes = Math.max(0, player.streakFreeze || 0);
  const playedToday = player.lastPlayedDay === todayKey();
  const hasStreak = streak > 0;
  // "Em chamas" a partir de 7 dias — UI ganha glow extra e copy diferente.
  const onFire = streak >= 7;

  let title;
  let subline;
  let stateClass;
  if (!hasStreak) {
    stateClass = 'is-empty';
    title = 'Comece seu streak';
    subline = 'Termine um nível hoje pra acender a chama';
  } else if (playedToday) {
    stateClass = onFire ? 'is-active is-fire' : 'is-active';
    title = `${streak} ${streak === 1 ? 'dia' : 'dias'} seguidos`;
    subline = onFire ? 'Você está em chamas — volte amanhã' : 'Mandou bem hoje · volte amanhã';
  } else {
    stateClass = 'is-pending';
    title = `${streak} ${streak === 1 ? 'dia' : 'dias'} seguidos`;
    subline = 'Jogue hoje pra não quebrar';
  }

  const flameDigits = hasStreak ? streak : '·';

  // Chips secundários: melhor streak + freezes disponíveis (só se relevantes).
  const chips = [];
  if (best > 0 && best !== streak) chips.push(`<span class="hero-streak-chip" title="Melhor streak">🏆 ${best}</span>`);
  if (freezes > 0) chips.push(`<span class="hero-streak-chip" title="Streak freezes disponíveis">❄️ ${freezes}</span>`);

  // Click leva pro perfil — onde mora o histórico de streak.
  return `
    <button class="hero-streak ${stateClass}" onclick="goProfile()" aria-label="Seu streak: ${title}">
      <div class="hero-streak-flame" aria-hidden="true">
        <div class="flame-glow"></div>
        <div class="flame-emoji">${hasStreak ? '🔥' : '🕯️'}</div>
        <div class="flame-number">${flameDigits}</div>
      </div>
      <div class="hero-streak-body">
        <div class="hero-streak-title">${escapeHtml(title)}</div>
        <div class="hero-streak-sub">${escapeHtml(subline)}</div>
        ${chips.length ? `<div class="hero-streak-chips">${chips.join('')}</div>` : ''}
      </div>
    </button>
  `;
}

function buildMascotMessage() {
  if (isSeasonComplete()) return 'Você zerou a temporada beta. Hora de revisar seus casos favoritos.';
  if (!player.lastPlayedDay) return 'Pronto pro seu primeiro plantão? Toque no nível abaixo.';
  if (player.lastPlayedDay === todayKey()) {
    return 'Plantão de hoje concluído. Se quiser, já dá pra seguir para o próximo caso.';
  }
  const today = todaysLevel();
  return `Paciente esperando! Nível ${today ? today.number : player.currentLevel} está pronto.`;
}

function renderTodayCard() {
  const today = todaysLevel();
  const card = document.getElementById('today-card');
  const tabJogar = document.getElementById('tab-jogar');
  // Card aparece SOMENTE quando o usuário toca em um nível no mapa.
  // Sem clique = sem card (volta a ser bottom-sheet contextual).
  const selectedLevel = homeSelectedLevelId ? getLevel(homeSelectedLevelId) : null;

  if (!selectedLevel) {
    if (card) {
      card.classList.add('is-hidden');
      card.innerHTML = '';
    }
    if (tabJogar) tabJogar.classList.remove('with-today-card');
    return;
  }
  card.classList.remove('is-hidden');
  if (tabJogar) tabJogar.classList.add('with-today-card');
  const mode = MODES[selectedLevel.mode];
  const completion = player.levelsCompleted.find(c => c.id === selectedLevel.id);
  const alreadyDone = !!completion;
  const nextPlayable = Math.max(1, player.currentLevel || 1);
  const isUpcoming = !alreadyDone && selectedLevel.number > nextPlayable;
  const isCurrent = !alreadyDone && selectedLevel.number === nextPlayable;
  const firstOfDay = !hasCompletionOnDay(todayKey());
  const xpReward = previewLevelXp(selectedLevel, { firstOfDay, isReplay: alreadyDone });
  const gemsReward = alreadyDone ? 0 : (GEMS.levelComplete + GEMS.perfectScore);
  const xpBadge = alreadyDone ? 'Sem XP no replay' : `Ate +${xpReward} XP`;
  const gemBadge = alreadyDone ? 'Sem gemas no replay' : `Ate +${gemsReward}`;
  const scoreBadge = completion
    ? (completion.perfect ? 'Perfeito · 100%' : `${completion.score}/${getLevelStepCount(selectedLevel)} acertos`)
    : null;
  const kicker = isUpcoming
    ? `Nível ${selectedLevel.number} · em breve`
    : (isCurrent
      ? (today && selectedLevel.id === today.id ? 'Nível de hoje' : 'Próximo nível')
      : `Nível ${selectedLevel.number}`);
  const actionLabel = alreadyDone ? 'Praticar novamente' : 'Começar nível';
  // Botão fica desabilitado em upcoming — aviso explica como liberar.
  const lockedNote = isUpcoming
    ? `<div class="today-locked-note">${icon('lock', 14, 'icn-inline')} Conclua o nível ${nextPlayable} para liberar este caso.</div>`
    : '';
  const actionBtn = isUpcoming
    ? `<button class="btn-big" disabled>${icon('lock', 20, 'icn-inline')} Bloqueado</button>`
    : `<button class="btn-big" onclick="startLevel(${selectedLevel.id})">${icon('play', 20, 'icn-inline')} ${actionLabel}</button>`;

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
    ${lockedNote}
    ${actionBtn}
  `;
}

// Ping-pong zig-zag: [0,1,2,3,4,3,2,1] — serpenteia suavemente sem reset abrupto
const SNAKE_PATTERN = [0, 1, 2, 3, 4, 3, 2, 1];
function snakeSide(idx) {
  return SNAKE_PATTERN[((idx % SNAKE_PATTERN.length) + SNAKE_PATTERN.length) % SNAKE_PATTERN.length];
}

function renderLevelMap() {
  const map = document.getElementById('level-map');
  if (!map) return;
  // Caminho em ordem DECRESCENTE — sobe de baixo pra cima (Duolingo).
  // Por padrão, exibe apenas uma janela compacta ao redor do nível atual:
  // se o aluno tiver 37 níveis, ele não precisa rolar até o fim pra ver
  // o que importa agora. Pode expandir o caminho completo se quiser.
  const all = LEVELS.slice().sort((a, b) => b.number - a.number);
  const totalLevels = all.length;
  const current = Math.max(1, (player && player.currentLevel) || 1);

  // Janela: 2 acima + atual + 2 abaixo. Se compactarmos, mostra também o
  // último nível concluído logo antes pra dar continuidade visual.
  const WINDOW = 2;
  const visible = levelMapExpanded
    ? all
    : all.filter(lv => Math.abs(lv.number - current) <= WINDOW);

  const items = visible.map((lv) => {
    // Recalcula o índice no caminho original pra preservar o zigzag
    // (snakeSide depende da posição global).
    const globalIdx = all.findIndex(x => x.id === lv.id);
    return renderLevelNode(lv, globalIdx);
  }).join('');

  const hiddenCount = totalLevels - visible.length;
  const expandLabel = levelMapExpanded
    ? 'Ver menos ↑'
    : `Ver caminho completo · ${totalLevels} níveis ↓`;
  const expandBtn = totalLevels > visible.length || levelMapExpanded
    ? `<button type="button" class="path-expand" onclick="toggleLevelMapExpanded()">${expandLabel}</button>`
    : '';

  map.innerHTML = `
    <div class="snake-path ${levelMapExpanded ? 'is-expanded' : 'is-compact'}">
      <div class="snake-title">Caminho do plantão</div>
      ${items}
      ${expandBtn}
    </div>
  `;

  // Quando expandido, leva o aluno até o nível atual.
  if (levelMapExpanded) {
    requestAnimationFrame(() => {
      const currentNode = map.querySelector('.snake-node.current');
      if (currentNode && typeof currentNode.scrollIntoView === 'function') {
        try { currentNode.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (_) {}
      }
    });
  }
}

function toggleLevelMapExpanded() {
  levelMapExpanded = !levelMapExpanded;
  renderLevelMap();
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

  const isCompleted = !!completion;
  // O "atual" agora segue o próximo nível jogável do player — não a virada
  // diária. Quem completou o N de hoje vê o avatar pular pro N+1.
  const nextPlayable = Math.max(1, player.currentLevel || 1);
  const isCurrent   = !isCompleted && lv.number === nextPlayable;
  const isUpcoming  = !isCompleted && !isCurrent && lv.number > nextPlayable;

  const classes = ['snake-node', `side-${snakeSide(idx)}`];
  if (isCompleted) classes.push('completed');
  if (isCurrent)   classes.push('current');
  if (isUpcoming)  classes.push('upcoming');
  if (homeSelectedLevelId === lv.id) classes.push('is-selected');

  const ariaLabel = `Nível ${lv.number}: ${lv.title}${isUpcoming ? ' (complete o anterior primeiro)' : ''}`;

  // Completo → só número dentro do tile, sem label ao lado, abre revisão
  if (isCompleted) {
    return `
      <button class="snake-node side-${snakeSide(idx)} completed minimal${homeSelectedLevelId === lv.id ? ' is-selected' : ''}" onclick="toggleTodayCard(${lv.id})" aria-label="${escapeHtml(ariaLabel)}" aria-pressed="${homeSelectedLevelId === lv.id ? 'true' : 'false'}">
        <div class="node-btn"><span class="node-num-big">${lv.number}</span></div>
      </button>
    `;
  }

  // Current → tile + label completo + avatar (a "pessoa" vai aqui)
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

  // Upcoming → visível, clicável (abre preview no today-card), sem avatar
  return `
    <button class="${classes.join(' ')} minimal" onclick="toggleTodayCard(${lv.id})" aria-label="${escapeHtml(ariaLabel)}" aria-pressed="${homeSelectedLevelId === lv.id ? 'true' : 'false'}">
      <div class="node-btn"><span class="node-num-big">${lv.number}</span></div>
    </button>
  `;
}

function toggleTodayCard(levelId) {
  const level = getLevel(levelId);
  if (!level) return;
  // Permitimos preview de qualquer nível — o today-card mostra o estado
  // (jogável, replay ou aguardando o anterior).
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

// ══════════════════════════════════════════════════════════
// LIGA
// ══════════════════════════════════════════════════════════
function leagueJoinModeCopy(mode) {
  return mode === 'auto' ? 'Senha libera entrada imediata' : 'Senha envia pedido para aprovação';
}

function leagueJoinModeLabel(mode) {
  return mode === 'auto' ? 'Entrada direta' : 'Precisa aprovação';
}

function leagueStatusLabel(status) {
  if (status === 'active') return 'Ativa';
  if (status === 'pending') return 'Pendente';
  if (status === 'rejected') return 'Recusada';
  return status || '—';
}

function leagueRoleLabel(role) {
  if (role === 'owner') return 'Admin';
  if (role === 'admin') return 'Moderador';
  return 'Membro';
}

// Quando entra via convite (link/colado), guardamos o code aqui pra
// pré-preencher o input de senha no próximo render do modal.
let pendingInviteCode = null;

function buildLeagueInviteUrl(leagueId, code) {
  const origin = (typeof location !== 'undefined' && location.origin) ? location.origin : 'https://conduta.cc';
  const base = `${origin}/?join=${encodeURIComponent(leagueId)}`;
  return code ? `${base}&code=${encodeURIComponent(code)}` : base;
}

function buildLeagueInviteText(leagueName, code, link) {
  const lines = [
    `Bora competir comigo na liga "${leagueName}" no Conduta?`,
    code ? `Código: ${code}` : '',
    link
  ].filter(Boolean);
  return lines.join('\n');
}

async function copyLeagueInvite(leagueId) {
  const membership = (typeof findLeagueMembership === 'function') ? findLeagueMembership(leagueId) : null;
  if (!membership) { toast('Liga não encontrada.'); return; }
  const code = (typeof getLeagueInviteCode === 'function') ? getLeagueInviteCode(leagueId) : '';
  const link = buildLeagueInviteUrl(leagueId, code);
  const text = buildLeagueInviteText(membership.league_name, code, link);

  // Mobile: Web Share API (WhatsApp, Telegram, Mail, etc).
  if (navigator.share) {
    try {
      await navigator.share({ title: `Liga ${membership.league_name}`, text });
      return;
    } catch (_) { /* usuário cancelou — cai no fallback */ }
  }
  // Desktop fallback: clipboard.
  try {
    await navigator.clipboard.writeText(text);
    toast(code
      ? 'Convite copiado! Cole no WhatsApp e mande pro pessoal.'
      : 'Link copiado. Compartilhe a senha à parte.');
    return;
  } catch (_) {}
  // Último fallback: prompt manual.
  try { window.prompt('Copie o convite abaixo:', text); } catch (_) {}
}

// Lê ?join=<id>&code=<plain> da URL na entrada do app. Se logado,
// abre o modal de entrada já com a liga selecionada e a senha pronta.
// Se não logado, guarda e retoma após o login.
function processLeagueDeepLink() {
  if (typeof URLSearchParams !== 'function') return;
  let params;
  try { params = new URLSearchParams(location.search || ''); } catch (_) { return; }
  let leagueId = params.get('join');
  let code = params.get('code') || '';

  // Se não tem na URL, tenta retomar do sessionStorage (caso pós-login).
  if (!leagueId) {
    try {
      const raw = sessionStorage.getItem('conduta_pending_join');
      if (raw) {
        const stash = JSON.parse(raw) || {};
        leagueId = stash.leagueId || '';
        code = stash.code || code;
      }
    } catch (_) {}
  }
  if (!leagueId) return;

  // Limpa pra não reabrir o modal a cada navegação/refresh.
  try {
    const newUrl = location.pathname + (location.hash || '');
    history.replaceState(null, '', newUrl);
  } catch (_) {}
  try { sessionStorage.removeItem('conduta_pending_join'); } catch (_) {}

  if (!currentUser) {
    // Salva pra retomar depois do login + abre modal de auth.
    try {
      sessionStorage.setItem('conduta_pending_join', JSON.stringify({ leagueId, code }));
    } catch (_) {}
    if (typeof openLoginModal === 'function') openLoginModal();
    toast('Faça login para entrar na liga do convite.');
    return;
  }

  // Já é membro? Não chama RPC — só pula pra liga e mostra um toast.
  const existing = (typeof findLeagueMembership === 'function')
    ? findLeagueMembership(leagueId)
    : null;
  if (existing) {
    if (typeof setTab === 'function') setTab('liga');
    if (typeof setSelectedLeagueHubLeague === 'function') {
      setSelectedLeagueHubLeague(leagueId);
    }
    renderLeague();
    toast(existing.membership_status === 'pending'
      ? 'Você já tem um pedido nessa liga.'
      : `Você já está em "${existing.league_name}".`);
    return;
  }

  // Caminho rápido: link com code → confirma e entra direto, 1 toque.
  if (code) {
    showLeagueInviteConfirm(leagueId, code);
    return;
  }

  // Caminho lento (link sem code): cai no modal de busca pré-selecionado
  // pra usuário digitar a senha manualmente.
  pendingInviteCode = null;
  if (typeof setSelectedJoinLeague === 'function') setSelectedJoinLeague(leagueId);
  if (typeof setTab === 'function') setTab('liga');
  openLeagueModal('join');
  toast('Liga selecionada — digite a senha pra entrar.');
}

// Mini-prompt estilo Discord: "Entrar em 'Liga X'?" → 1 toque entra.
// Quando o catálogo público ainda não carregou, mostramos placeholder e
// atualizamos o nome assim que vier. Sem campo de senha, sem busca.
let _inviteConfirmState = null;
function showLeagueInviteConfirm(leagueId, code) {
  _inviteConfirmState = { leagueId, code, submitting: false };

  // Garante que o catálogo seja buscado em background pra mostrar o nome.
  if (typeof loadPublicLeaguesIndex === 'function') {
    loadPublicLeaguesIndex({ onUpdate: () => renderLeagueInviteConfirm() });
  }
  if (typeof setTab === 'function') setTab('liga');
  renderLeagueInviteConfirm();
}

function renderLeagueInviteConfirm() {
  if (!_inviteConfirmState) {
    const old = document.getElementById('league-invite-confirm');
    if (old) old.remove();
    return;
  }
  const { leagueId, submitting } = _inviteConfirmState;
  const fullIndex = (leagueHubState && leagueHubState.publicLeaguesIndex) || [];
  const match = fullIndex.find(l => l.league_id === leagueId) || null;
  const indexLoading = !!(leagueHubState && leagueHubState.publicLeaguesLoading);

  const name = match ? match.league_name : '';
  const sub = match
    ? `${leagueJoinModeLabel(match.join_mode)} · ${match.active_members} membros`
    : (indexLoading ? 'Confirmando convite…' : 'Liga privada');
  const isApproval = match && match.join_mode === 'approval';
  const primaryLabel = submitting
    ? 'Entrando…'
    : (isApproval ? 'Solicitar entrada' : 'Entrar na liga');

  const html = `
    <div class="modal-backdrop league-modal-backdrop" id="league-invite-confirm" onclick="if(event.target===this)dismissLeagueInviteConfirm()">
      <div class="modal-card league-invite-card">
        <button class="modal-close" onclick="dismissLeagueInviteConfirm()" aria-label="Fechar" ${submitting ? 'disabled' : ''}>✕</button>
        <div class="league-invite-emoji">🔗</div>
        <div class="league-invite-kicker">Convite recebido</div>
        <h2 class="league-invite-name">${name ? escapeHtml(name) : 'Liga do convite'}</h2>
        <div class="league-invite-sub">${escapeHtml(sub)}</div>
        ${isApproval ? `<div class="league-note league-note-soft">Esta liga exige aprovação — seu pedido vai pra fila do admin.</div>` : ''}
        <div class="league-modal-actions league-invite-actions">
          <button type="button" class="btn-ghost" onclick="dismissLeagueInviteConfirm()" ${submitting ? 'disabled' : ''}>Cancelar</button>
          <button type="button" class="btn-primary" onclick="acceptLeagueInvite()" ${submitting ? 'disabled' : ''}>${primaryLabel}</button>
        </div>
      </div>
    </div>
  `;

  const existing = document.getElementById('league-invite-confirm');
  if (existing) {
    existing.outerHTML = html;
  } else {
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    document.body.appendChild(wrap.firstElementChild);
  }
}

function dismissLeagueInviteConfirm() {
  if (_inviteConfirmState && _inviteConfirmState.submitting) return;
  _inviteConfirmState = null;
  const el = document.getElementById('league-invite-confirm');
  if (el) el.remove();
}

async function acceptLeagueInvite() {
  if (!_inviteConfirmState || _inviteConfirmState.submitting) return;
  const { leagueId, code } = _inviteConfirmState;
  _inviteConfirmState.submitting = true;
  renderLeagueInviteConfirm();
  try {
    const result = await joinLeagueHubLeague({ leagueId, accessCode: code });
    const status = result?.[0]?.membership_status;
    const fullIndex = (leagueHubState && leagueHubState.publicLeaguesIndex) || [];
    const match = fullIndex.find(l => l.league_id === leagueId);
    const name = match ? match.league_name : 'liga';
    toast(status === 'pending'
      ? `Pedido enviado pra "${name}".`
      : `Você entrou em "${name}"!`);
    _inviteConfirmState = null;
    const el = document.getElementById('league-invite-confirm');
    if (el) el.remove();
    if (typeof setSelectedLeagueHubLeague === 'function') {
      setSelectedLeagueHubLeague(leagueId);
    }
    renderLeague();
  } catch (err) {
    _inviteConfirmState.submitting = false;
    renderLeagueInviteConfirm();
    toast(err?.message || 'Não foi possível aceitar o convite.');
  }
}

function openLeagueModal(mode, leagueId) {
  leagueModalMode = mode;
  leagueEditingLeagueId = leagueId || null;
  if (mode === 'join') {
    if (typeof clearLeagueSearch === 'function') clearLeagueSearch();
    // Limpa seleção pendente para o modal abrir sem nenhuma liga marcada
    // — exceto quando estamos vindo de um convite (deep-link).
    if (!pendingInviteCode && typeof setSelectedJoinLeague === 'function') {
      setSelectedJoinLeague(null);
    }
  }
  renderLeagueModal();
  if (mode === 'join' && typeof loadPublicLeaguesIndex === 'function') {
    // Não lista todas as ligas ao abrir. A busca chama o Supabase sob demanda
    // quando houver pelo menos 2 caracteres.
    loadPublicLeaguesIndex({ query: leagueHubState.searchQuery || '', onUpdate: () => renderLeagueJoinResults() });
  }
}

function closeLeagueModal() {
  leagueModalMode = null;
  leagueEditingLeagueId = null;
  if (typeof clearLeagueSearch === 'function') clearLeagueSearch();
  renderLeagueModal();
}

function renderLeagueModal() {
  let backdrop = document.getElementById('league-modal');
  if (!leagueModalMode) {
    if (backdrop) backdrop.remove();
    return;
  }

  const canJoinMore = player.isPro || getJoinedLeagueCount() < getLeagueMembershipLimit();

  let body = '';
  let title = '';

  if (leagueModalMode === 'create') {
    title = 'Criar liga';
    body = `
      <p class="league-modal-desc">Dê um nome, defina uma senha e escolha se os membros entram direto ou precisam de aprovação.</p>
      <form class="league-form" onsubmit="submitCreateLeague(event)">
        <label class="league-field">
          <span class="league-field-label">Nome da liga</span>
          <input id="league-create-name" class="text-input" type="text" maxlength="80" placeholder="Ex: R1 Clínica Médica" required>
        </label>
        <label class="league-field">
          <span class="league-field-label">Senha</span>
          <input id="league-create-password" class="text-input" type="text" minlength="4" placeholder="Mínimo 4 caracteres" autocomplete="off" autocapitalize="off" spellcheck="false" required>
        </label>
        <div class="league-mode-group" role="radiogroup" aria-label="Modo de entrada">
          <label class="league-mode-option">
            <input type="radio" name="league-create-mode" value="auto" checked>
            <span><strong>Entrada direta</strong><small>Quem tem a senha entra na hora</small></span>
          </label>
          <label class="league-mode-option">
            <input type="radio" name="league-create-mode" value="approval">
            <span><strong>Com aprovação</strong><small>Você aprova cada pedido</small></span>
          </label>
        </div>
        ${!canJoinMore ? `<div class="league-note">Plano Free permite até 2 ligas ativas/pendentes.</div>` : ''}
        <div class="league-modal-actions">
          <button type="button" class="btn-ghost" onclick="closeLeagueModal()">Cancelar</button>
          <button type="submit" class="btn-primary" ${canJoinMore ? '' : 'disabled'}>Criar liga</button>
        </div>
      </form>
    `;
  } else if (leagueModalMode === 'join') {
    title = 'Entrar em uma liga';
    const rawQuery = leagueHubState.searchQuery || '';
    body = `
      <p class="league-modal-desc">Tem um link de convite? Cole no navegador e a liga abre direto. Senão, busque pelo nome abaixo.</p>
      <label class="league-field">
        <span class="league-field-label">Buscar liga</span>
        <input id="league-search-input" class="text-input" type="text" placeholder="Digite o nome da liga…" autocomplete="off" autocapitalize="off" spellcheck="false" value="${escapeHtml(rawQuery)}" oninput="handleLeagueSearchInput(event)">
      </label>
      <div id="league-search-results" class="league-search-results"></div>
      <form class="league-form" onsubmit="submitJoinLeague(event)">
        <label class="league-field">
          <span class="league-field-label">Senha da liga</span>
          <input id="league-join-password" class="text-input" type="text" minlength="4" placeholder="Senha que o admin compartilhou" autocomplete="off" autocapitalize="off" spellcheck="false" disabled required>
        </label>
        ${!canJoinMore ? `<div class="league-note">Faça upgrade para Pro ou saia de uma liga para abrir espaço.</div>` : ''}
        <div class="league-modal-actions">
          <button type="button" class="btn-ghost" onclick="closeLeagueModal()">Cancelar</button>
          <button type="submit" id="league-join-submit" class="btn-primary" disabled>Entrar</button>
        </div>
      </form>
    `;
  } else if (leagueModalMode === 'edit') {
    const membership = findLeagueMembership(leagueEditingLeagueId);
    if (!membership) { closeLeagueModal(); return; }
    title = 'Editar liga';
    body = `
      <form class="league-form" onsubmit="submitLeagueSettingsUpdate(event, '${membership.league_id}')">
        <label class="league-field">
          <span class="league-field-label">Nome da liga</span>
          <input id="league-edit-name" class="text-input" type="text" maxlength="80" value="${escapeHtml(membership.league_name)}" required>
        </label>
        <label class="league-field">
          <span class="league-field-label">Nova senha <small>(opcional)</small></span>
          <input id="league-edit-password" class="text-input" type="text" minlength="4" placeholder="Deixe em branco para manter" autocomplete="off" autocapitalize="off" spellcheck="false">
        </label>
        <div class="league-mode-group" role="radiogroup" aria-label="Modo de entrada">
          <label class="league-mode-option">
            <input type="radio" name="league-edit-mode" value="auto" ${membership.join_mode === 'auto' ? 'checked' : ''}>
            <span><strong>Entrada direta</strong><small>Senha libera o acesso</small></span>
          </label>
          <label class="league-mode-option">
            <input type="radio" name="league-edit-mode" value="approval" ${membership.join_mode !== 'auto' ? 'checked' : ''}>
            <span><strong>Com aprovação</strong><small>Admin aprova cada pedido</small></span>
          </label>
        </div>
        <div class="league-modal-actions">
          <button type="button" class="btn-ghost" onclick="closeLeagueModal()">Cancelar</button>
          <button type="submit" class="btn-primary">Salvar alterações</button>
        </div>
      </form>
      ${membership.membership_role === 'owner' ? `
        <div class="league-danger-zone">
          <div class="league-danger-title">Zona de risco</div>
          <div class="league-danger-copy">Excluir a liga remove todos os membros e não pode ser desfeito.</div>
          <button type="button" class="btn-ghost league-danger-btn" onclick="confirmDeleteLeague('${membership.league_id}')">Excluir liga</button>
        </div>
      ` : ''}
    `;
  }

  const html = `
    <div class="modal-backdrop league-modal-backdrop" id="league-modal" onclick="if(event.target===this)closeLeagueModal()">
      <div class="modal-card league-modal-card">
        <button class="modal-close" onclick="closeLeagueModal()" aria-label="Fechar">✕</button>
        <h2 class="modal-title">${escapeHtml(title)}</h2>
        ${body}
      </div>
    </div>
  `;

  // Captura foco/caret do elemento ativo dentro do modal — evita perder
  // a posição do cursor enquanto o usuário digita na busca de ligas.
  const prevActive = document.activeElement;
  const prevInModal = prevActive && backdrop && backdrop.contains(prevActive);
  const prevId = prevInModal && prevActive.id ? prevActive.id : null;
  const prevSelStart = prevInModal && 'selectionStart' in prevActive ? prevActive.selectionStart : null;
  const prevSelEnd = prevInModal && 'selectionEnd' in prevActive ? prevActive.selectionEnd : null;

  if (backdrop) {
    backdrop.outerHTML = html;
  } else {
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    document.body.appendChild(wrap.firstElementChild);
  }

  // Restaura foco/caret se possível; senão aplica foco inicial padrão.
  setTimeout(() => {
    if (prevId) {
      const restored = document.getElementById(prevId);
      if (restored) {
        try { restored.focus({ preventScroll: true }); } catch (_) { restored.focus(); }
        if (prevSelStart != null && typeof restored.setSelectionRange === 'function') {
          try { restored.setSelectionRange(prevSelStart, prevSelEnd); } catch (_) {}
        }
        return;
      }
    }
    const focusTarget = document.querySelector('#league-modal input:not([disabled]), #league-modal button.btn-primary');
    if (focusTarget) focusTarget.focus();
  }, 30);

  // Modo "join": pinta os resultados com o que já temos em memória.
  // Não toca no input — a função abaixo só atualiza a área de resultados
  // e o botão de submeter, então digitar fica fluido.
  if (leagueModalMode === 'join') {
    renderLeagueJoinResults();
    // Pré-preenche a senha quando o usuário veio de um convite.
    if (pendingInviteCode) {
      const passwordInput = document.getElementById('league-join-password');
      if (passwordInput) {
        passwordInput.value = pendingInviteCode;
        passwordInput.disabled = false;
      }
      const submitBtn = document.getElementById('league-join-submit');
      if (submitBtn) submitBtn.disabled = !leagueHubState.selectedJoinLeagueId;
      pendingInviteCode = null; // consumido — não vaza pra próximo render
    }
  }
}

// ── Render parcial: só mexe na área de resultados + botão de submit.
// Crucial pra estabilidade da busca — o input nunca é tocado.
function renderLeagueJoinResults() {
  const resultsEl = document.getElementById('league-search-results');
  const submitBtn = document.getElementById('league-join-submit');
  const passwordInput = document.getElementById('league-join-password');
  if (!resultsEl) return;

  const canJoinMore = player.isPro || getJoinedLeagueCount() < getLeagueMembershipLimit();
  const query = (leagueHubState.searchQuery || '').trim();
  const indexLoading = !!leagueHubState.publicLeaguesLoading;
  const indexError = leagueHubState.publicLeaguesError || '';
  const indexLoaded = !!leagueHubState.publicLeaguesLoadedAt;

  const filtered = (typeof filterPublicLeagues === 'function')
    ? filterPublicLeagues(query)
    : [];

  // Limita o que mostramos pra não estourar o modal — quem busca refina o termo.
  const MAX_RESULTS = 30;
  const visible = filtered.slice(0, MAX_RESULTS);
  const overflow = Math.max(0, filtered.length - visible.length);

  const selectedId = leagueHubState.selectedJoinLeagueId;
  const fullIndex = leagueHubState.publicLeaguesIndex || [];
  const selectedJoin = visible.find(l => l.league_id === selectedId)
    || filtered.find(l => l.league_id === selectedId)
    || fullIndex.find(l => l.league_id === selectedId)
    || null;

  // Caso deep-link: tem ID selecionado mas não está no catálogo (ainda
  // carregando ou filtrado). Mostra um card "convite recebido" pra
  // confirmar a entrada sem depender da busca.
  const isInviteOnly = selectedId && !selectedJoin;

  let html = '';
  if (isInviteOnly) {
    html = `
      <div class="league-catalog">
        <button type="button" class="league-catalog-card selected" disabled>
          <span class="league-catalog-name">🔗 Liga do convite</span>
          <span class="league-catalog-sub">Confirmando o convite${indexLoading ? '… carregando dados' : ''}</span>
        </button>
      </div>
    `;
  } else if (!indexLoaded && indexLoading) {
    html = `<div class="league-note">Carregando ligas disponíveis…</div>`;
  } else if (indexError && !indexLoaded) {
    html = `<div class="league-note league-note-error">${escapeHtml(indexError)}</div>`;
  } else if (!filtered.length) {
    if (query.length < 2) {
      html = `<div class="league-note">Digite pelo menos 2 letras para buscar ligas.</div>`;
    } else if (indexLoading) {
      html = `<div class="league-note">Buscando ligas para "${escapeHtml(query)}"...</div>`;
    } else {
      html = `<div class="league-note">Nenhuma liga encontrada para "${escapeHtml(query)}".</div>`;
    }
  } else {
    html = `
      <div class="league-catalog" role="radiogroup" aria-label="Ligas disponíveis">
        ${visible.map(league => `
          <button type="button" class="league-catalog-card ${selectedJoin && selectedJoin.league_id === league.league_id ? 'selected' : ''}" data-league-id="${league.league_id}" onclick="chooseJoinLeague('${league.league_id}')">
            <span class="league-catalog-name">${escapeHtml(league.league_name)}</span>
            <span class="league-catalog-sub">${leagueJoinModeLabel(league.join_mode)} · ${league.active_members} membros</span>
          </button>
        `).join('')}
        ${overflow ? `<div class="league-note league-note-soft">+${overflow} ligas — refine sua busca para ver as outras.</div>` : ''}
      </div>
    `;
  }
  resultsEl.innerHTML = html;

  // Atualiza submit + password sem re-renderizar o input de busca.
  // Em fluxo de convite (selectedId sem catálogo) o input fica habilitado
  // pra usuário só digitar a senha (caso o link não trouxesse).
  const hasSelection = !!(selectedJoin || isInviteOnly);
  if (passwordInput) {
    passwordInput.disabled = !hasSelection;
  }
  if (submitBtn) {
    submitBtn.disabled = !(hasSelection && canJoinMore);
    submitBtn.textContent = (selectedJoin && selectedJoin.join_mode === 'approval')
      ? 'Entrar (solicitar)'
      : 'Entrar';
  }
}

function handleLeagueSearchInput(event) {
  const value = (event && event.target) ? event.target.value : '';
  if (typeof setLeagueSearchQuery === 'function') setLeagueSearchQuery(value);
  // Apenas atualiza a área de resultados — input fica intacto, sem perder foco.
  renderLeagueJoinResults();

  if (leagueSearchDebounce) clearTimeout(leagueSearchDebounce);
  leagueSearchDebounce = setTimeout(() => {
    if (typeof loadPublicLeaguesIndex === 'function') {
      loadPublicLeaguesIndex({
        query: value,
        force: true,
        onUpdate: () => renderLeagueJoinResults()
      });
    }
  }, 280);
}

async function submitCreateLeague(event) {
  if (event) event.preventDefault();
  const name = (document.getElementById('league-create-name')?.value || '').trim();
  const accessCode = document.getElementById('league-create-password')?.value || '';
  const joinMode = document.querySelector('input[name="league-create-mode"]:checked')?.value || 'auto';

  if (!name || name.length < 3) { toast('Dê um nome com ao menos 3 caracteres para a liga.'); return; }
  if (accessCode.length < 4)    { toast('A senha da liga precisa ter ao menos 4 caracteres.'); return; }

  const submitBtn = event?.target?.querySelector('button[type="submit"]');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Criando...'; }

  try {
    await createLeagueHubLeague({ name, accessCode, joinMode });
    toast('Liga criada com sucesso.');
    closeLeagueModal();
    renderLeague();
  } catch (err) {
    toast(err?.message || 'Não foi possível criar a liga.');
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Criar liga'; }
  }
}

function chooseJoinLeague(leagueId) {
  setSelectedJoinLeague(leagueId);
  // Atualização parcial: highlight do card + estado do botão/senha.
  // Evita full re-render que apagaria o que o usuário já digitou na senha.
  renderLeagueJoinResults();
}

async function submitJoinLeague(event) {
  if (event) event.preventDefault();
  const leagueId = leagueHubState.selectedJoinLeagueId;
  const accessCode = document.getElementById('league-join-password')?.value || '';

  if (!leagueId)              { toast('Escolha uma liga primeiro.'); return; }
  if (accessCode.length < 4)  { toast('Digite a senha da liga.');    return; }

  const submitBtn = event?.target?.querySelector('button[type="submit"]');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Enviando...'; }

  try {
    const result = await joinLeagueHubLeague({ leagueId, accessCode });
    const status = result?.[0]?.membership_status;
    toast(status === 'pending' ? 'Pedido enviado para aprovação.' : 'Você entrou na liga.');
    closeLeagueModal();
    renderLeague();
  } catch (err) {
    toast(err?.message || 'Não foi possível entrar na liga.');
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Entrar'; }
  }
}

async function openLeagueDetails(leagueId) {
  setSelectedLeagueHubLeague(leagueId);
  leagueRequestsOpen = false;
  renderLeague();
  // refresca só as standings desta liga em background
  if (typeof refreshLeagueStandings === 'function') {
    refreshLeagueStandings().then(() => renderLeague());
  }
}

function toggleLeagueCard(leagueId) {
  if (leagueHubState.selectedLeagueId === leagueId) {
    setSelectedLeagueHubLeague(null);
    leagueRequestsOpen = false;
    renderLeague();
    return;
  }
  openLeagueDetails(leagueId);
}

function toggleLeagueRequests(event) {
  if (event && typeof event.stopPropagation === 'function') event.stopPropagation();
  leagueRequestsOpen = !leagueRequestsOpen;
  renderLeague();
}

async function handleLeagueRequest(membershipId, action) {
  try {
    await reviewLeagueHubMembership({ membershipId, action });
    toast(action === 'approve' ? 'Pedido aprovado.' : 'Pedido recusado.');
    renderLeague();
  } catch (err) {
    toast(err?.message || 'Não foi possível processar o pedido.');
  }
}

async function leaveLeagueMembership(leagueId) {
  const membership = findLeagueMembership(leagueId);
  const name = membership ? membership.league_name : 'esta liga';
  if (!confirm(`Sair de "${name}"? Você perde seu lugar no ranking semanal.`)) return;
  try {
    await leaveLeagueHubLeague({ leagueId });
    toast('Você saiu da liga.');
    closeLeagueModal();
    renderLeague();
  } catch (err) {
    toast(err?.message || 'Não foi possível sair da liga.');
  }
}

async function confirmDeleteLeague(leagueId) {
  const membership = findLeagueMembership(leagueId);
  const name = membership ? membership.league_name : 'esta liga';
  if (!confirm(`Excluir "${name}"? Todos os membros serão removidos. Esta ação não pode ser desfeita.`)) return;
  try {
    await deleteLeagueHubLeague({ leagueId });
    toast('Liga excluída.');
    closeLeagueModal();
    renderLeague();
  } catch (err) {
    toast(err?.message || 'Não foi possível excluir a liga.');
  }
}

async function submitLeagueSettingsUpdate(event, leagueId) {
  if (event) event.preventDefault();
  const form = event?.target;
  const name = (form?.querySelector('#league-edit-name')?.value || '').trim();
  const accessCode = form?.querySelector('#league-edit-password')?.value || '';
  const joinMode = form?.querySelector('input[name="league-edit-mode"]:checked')?.value || null;

  if (!name || name.length < 3) { toast('O nome da liga precisa ter ao menos 3 caracteres.'); return; }
  if (accessCode && accessCode.length < 4) { toast('A nova senha precisa ter ao menos 4 caracteres.'); return; }

  const submitBtn = form?.querySelector('button[type="submit"]');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Salvando...'; }

  try {
    await updateLeagueHubLeague({ leagueId, name, accessCode, joinMode });
    toast(accessCode ? 'Liga atualizada com nova senha.' : 'Liga atualizada.');
    closeLeagueModal();
    renderLeague();
  } catch (err) {
    toast(err?.message || 'Não foi possível atualizar a liga.');
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Salvar alterações'; }
  }
}

function toggleLeagueComposer() {
  openLeagueModal(getJoinedLeagueCount() > 0 ? 'join' : 'create');
}

// Action sheet quando o usuário tem ≥1 liga e quer entrar/criar outra.
// Evita FAB ambíguo — escolha clara entre "entrar com convite" (mais
// frequente) e "criar nova".
function openLeagueAddSheet() {
  // Reaproveita o modal-backdrop genérico.
  let backdrop = document.getElementById('league-add-sheet');
  if (backdrop) { backdrop.remove(); return; }
  backdrop = document.createElement('div');
  backdrop.id = 'league-add-sheet';
  backdrop.className = 'modal-backdrop league-modal-backdrop';
  backdrop.onclick = (e) => { if (e.target === backdrop) backdrop.remove(); };
  backdrop.innerHTML = `
    <div class="modal-card league-add-sheet">
      <button class="modal-close" onclick="document.getElementById('league-add-sheet')?.remove()" aria-label="Fechar">✕</button>
      <h2 class="modal-title">Adicionar liga</h2>
      <button class="league-add-option" onclick="document.getElementById('league-add-sheet')?.remove(); openLeagueModal('join')">
        <span class="league-add-icon">🔑</span>
        <span class="league-add-text">
          <strong>Entrar com convite</strong>
          <small>Cole um link ou peça a senha pro admin</small>
        </span>
      </button>
      <button class="league-add-option" onclick="document.getElementById('league-add-sheet')?.remove(); openLeagueModal('create')">
        <span class="league-add-icon">＋</span>
        <span class="league-add-text">
          <strong>Criar nova liga</strong>
          <small>Você vira o admin e compartilha o convite</small>
        </span>
      </button>
    </div>
  `;
  document.body.appendChild(backdrop);
}

function leagueSkeletonHtml() {
  return `
    <div class="league-skeleton">
      <div class="skel-row skel-row-lg"></div>
      <div class="skel-row skel-row-md"></div>
      <div class="skel-row"></div>
      <div class="skel-row"></div>
    </div>
  `;
}

function renderLeague(forceReload = false) {
  const pane = document.getElementById('tab-liga');
  if (!pane) return;

  if (!currentUser) {
    pane.innerHTML = `
      <div class="league-shell-card">
        <div class="league-hero">
          <div class="league-emoji">🏟️</div>
          <div class="league-name">Ligas privadas</div>
          <div class="league-sub">Crie sua liga ou entre em uma com senha.</div>
        </div>
        <div class="league-empty">
          <div class="league-empty-title">Entre para começar</div>
          <div class="league-empty-copy">Seu progresso semanal vira ranking compartilhado com quem você joga.</div>
          <button class="btn-primary" onclick="openLoginModal()">Entrar / Criar conta</button>
        </div>
      </div>
    `;
    return;
  }

  if (!_supabase) {
    pane.innerHTML = `
      <div class="league-shell-card">
        <div class="league-empty">
          <div class="league-empty-title">Supabase indisponível</div>
          <div class="league-empty-copy">Confira a configuração do projeto antes de usar ligas privadas.</div>
        </div>
      </div>
    `;
    return;
  }

  // Stale-while-revalidate: se já temos dados (memória ou localStorage),
  // pinta imediatamente e revalida em background. A primeira pintura é
  // instantânea entre sessões.
  if (!leagueHubState.ready && currentUser && _supabase) {
    hydrateLeagueHubFromStorage();
  }

  // Estamos sempre prontos pra pintar — paintLeague é uma máquina de
  // estados sobre lastLoadedAt + memberships + error + loading. Nunca
  // mais zeramos memberships antes da carga (causa raiz do "saí da liga").
  paintLeague(pane);

  const hasFreshData = leagueHubState.lastLoadedAt > 0 &&
    (Date.now() - leagueHubState.lastLoadedAt) < LEAGUE_HUB_FRESH_MS;

  if (forceReload || !hasFreshData) {
    loadLeagueHub({ force: forceReload, onRefresh: () => paintLeague(pane) });
  }
}

// Estado renderizável do hub de ligas. Quatro casos disjuntos — nunca
// mais misturamos "ainda não carregou" com "carregou e está vazio".
//   skeleton  → carregando pela primeira vez, sem dados em cache
//   error     → carga falhou e não temos nada pra mostrar
//   empty     → carregou com sucesso e o usuário realmente não tem ligas
//   list      → carregou com sucesso e tem ligas (pode estar revalidando)
function leagueHubViewState(state) {
  const memberships = state.memberships || [];
  const hasData = state.lastLoadedAt > 0;

  if (memberships.length > 0) return 'list';
  if (state.error && !hasData) return 'error';
  if (!hasData) return 'skeleton';
  return 'empty';
}

function paintLeague(pane) {
  if (!pane) pane = document.getElementById('tab-liga');
  if (!pane) return;

  const state = leagueHubState;
  const view = leagueHubViewState(state);

  if (view === 'skeleton') {
    pane.innerHTML = `
      <div class="league-shell-card is-loading" aria-busy="true">
        <div class="league-hero league-hero-compact league-hero-skeleton">
          <div class="league-hero-inner">
            <div class="league-hero-text">
              <div class="skel-line skel-line-md"></div>
              <div class="skel-line skel-line-sm"></div>
            </div>
            <div class="skel-circle"></div>
          </div>
        </div>
        <div class="league-memberships">
          <div class="league-membership-card skeleton">
            <div class="skel-line skel-line-lg"></div>
            <div class="skel-line skel-line-sm"></div>
          </div>
          <div class="league-membership-card skeleton">
            <div class="skel-line skel-line-lg"></div>
            <div class="skel-line skel-line-sm"></div>
          </div>
        </div>
      </div>
    `;
    if (leagueModalMode) renderLeagueModal();
    return;
  }

  if (view === 'error') {
    pane.innerHTML = `
      <div class="league-shell-card">
        <div class="league-error-state">
          <div class="league-error-icon" aria-hidden="true">📡</div>
          <div class="league-empty-title">Não foi possível carregar as ligas</div>
          <div class="league-empty-copy">${escapeHtml(state.error || 'Verifique sua conexão e tente de novo.')}</div>
          <button class="btn-primary" onclick="renderLeague(true)">Tentar novamente</button>
        </div>
      </div>
    `;
    if (leagueModalMode) renderLeagueModal();
    return;
  }

  if (view === 'empty') {
    pane.innerHTML = `
      <div class="league-shell-card">
        <div class="league-empty-v2">
          <div class="league-empty-emoji">🏟️</div>
          <div class="league-empty-title">Compete com seus colegas</div>
          <div class="league-empty-copy">Ranking semanal de XP entre quem joga junto. Entre com um link de convite ou crie sua própria liga.</div>
          <button class="btn-primary league-empty-primary" onclick="openLeagueModal('join')">
            🔑 Entrar com convite
          </button>
          <button class="btn-link league-empty-secondary" onclick="openLeagueModal('create')">
            ou criar uma nova liga
          </button>
        </div>
      </div>
    `;
    if (leagueModalMode) renderLeagueModal();
    return;
  }

  // view === 'list'
  const limit = getLeagueMembershipLimit();
  const joinedCount = getJoinedLeagueCount();
  const canJoinMore = player.isPro || joinedCount < limit;
  const memberships = state.memberships || [];

  const totalPending = memberships.reduce((sum, m) => {
    return sum + (isLeagueAdminMembership(m.league_id) ? (m.pending_members || 0) : 0);
  }, 0);

  // Erro tolerável: tem dados em cache mas a última revalidação falhou.
  // Mostra um aviso discreto sem destruir a interface.
  const softErrorBar = state.error
    ? `<div class="league-soft-error" role="status">
         <span class="league-soft-error-text">Sem internet ou servidor lento — mostrando última versão salva.</span>
         <button class="league-soft-error-btn" onclick="renderLeague(true)" aria-label="Recarregar agora">↻</button>
       </div>`
    : '';

  pane.innerHTML = `
    <div class="league-shell-card ${state.refreshing ? 'is-refreshing' : ''}">
      <div class="league-hero league-hero-compact">
        <div class="league-hero-inner">
          <div class="league-hero-text">
            <div class="league-name">Suas ligas</div>
            <div class="league-sub">${player.leagueXpWeek} XP esta semana${player.isPro ? ' · Pro' : ` · ${joinedCount}/${limit}`}${totalPending ? ` · ⏳ ${totalPending} pedido${totalPending === 1 ? '' : 's'}` : ''}</div>
          </div>
          <button class="league-hero-add" onclick="openLeagueAddSheet()" ${canJoinMore ? '' : 'disabled'} aria-label="Entrar ou criar liga">＋</button>
        </div>
        ${state.refreshing ? `<div class="league-refresh-indicator" aria-hidden="true"></div>` : ''}
      </div>

      ${softErrorBar}

      <div class="league-memberships">
        ${memberships.map(membership => renderMembershipCard(membership, state)).join('')}
      </div>
    </div>
  `;

  // Mantém o modal renderizado consistente com o estado atual
  if (leagueModalMode) renderLeagueModal();
}

function renderMembershipCard(membership, state) {
  const expanded = membership.league_id === state.selectedLeagueId;
  const statusLabel = leagueStatusLabel(membership.membership_status);
  const isOwner = membership.membership_role === 'owner';
  const isAdmin = isLeagueAdminMembership(membership.league_id);
  const isActive = membership.membership_status === 'active';
  const isPending = membership.membership_status === 'pending';
  const requests = state.requests || [];
  const standings = state.standings || [];
  const pendingCount = isAdmin
    ? (expanded ? requests.length : (membership.pending_members || 0))
    : 0;

  // Posição do usuário no ranking semanal — só faz sentido pro card expandido
  // (standings só carrega da liga selecionada). No card colapsado mostramos
  // o XP semanal direto do player como referência rápida.
  let myRank = null;
  let xpToBeat = null;
  if (expanded && isActive && currentUser && standings.length) {
    const myIdx = standings.findIndex(m => m.user_id === currentUser.id);
    if (myIdx >= 0) {
      myRank = myIdx + 1;
      const ahead = standings[myIdx - 1];
      if (ahead) xpToBeat = Math.max(0, (ahead.weekly_xp || 0) - (standings[myIdx].weekly_xp || 0)) + 1;
    }
  }

  // Status pill: pendente (laranja), pedidos novos (badge), ativo (oculto).
  const statusPillHtml = isPending
    ? `<span class="league-pill pending">${statusLabel}</span>`
    : (pendingCount > 0
        ? `<span class="league-pill alert">⏳ ${pendingCount} pedido${pendingCount === 1 ? '' : 's'}</span>`
        : '');

  // Subtítulo enxuto: 1 linha só com o que importa.
  const subParts = [
    `👥 ${membership.active_members}`,
    isOwner ? 'admin' : (isAdmin ? 'mod' : null),
    leagueJoinModeLabel(membership.join_mode)
  ].filter(Boolean);

  return `
    <div class="league-membership-card ${expanded ? 'expanded' : ''} ${isPending ? 'is-pending' : ''}">
      <button class="league-membership-main" onclick="toggleLeagueCard('${membership.league_id}')" aria-expanded="${expanded ? 'true' : 'false'}">
        <div class="league-membership-top">
          <span class="league-membership-name">${escapeHtml(membership.league_name)}</span>
          ${statusPillHtml}
          <span class="league-detail-caret" aria-hidden="true">${expanded ? '▾' : '▸'}</span>
        </div>
        <div class="league-membership-sub">${subParts.map(escapeHtml).join(' · ')}</div>
      </button>
      <div class="league-membership-actions">
        ${isActive ? `<button class="league-icon-btn invite" onclick="event.stopPropagation(); copyLeagueInvite('${membership.league_id}')" aria-label="Compartilhar convite" title="Compartilhar convite">↗</button>` : ''}
        ${isAdmin ? `<button class="league-icon-btn" onclick="event.stopPropagation(); openLeagueModal('edit', '${membership.league_id}')" aria-label="Editar liga" title="Editar liga">✎</button>` : ''}
        ${!isOwner ? `<button class="league-icon-btn danger" onclick="event.stopPropagation(); leaveLeagueMembership('${membership.league_id}')" aria-label="Sair da liga" title="Sair da liga">↪</button>` : ''}
      </div>

      ${expanded ? `
        <div class="league-card-body">
          ${isPending ? `
            <div class="league-empty-inline">⏳ Seu pedido está aguardando aprovação do admin.</div>
          ` : `
            ${myRank ? `
              <div class="league-rank-chip">
                <span class="rank-num">#${myRank}</span>
                <span class="rank-text">
                  <strong>${player.leagueXpWeek} XP</strong> esta semana
                  ${xpToBeat != null ? `· faltam <strong>${xpToBeat} XP</strong> pro ${myRank - 1}º` : '· você está na frente!'}
                </span>
              </div>
            ` : ''}
            <div class="section-title section-title-inline">RANKING DA SEMANA</div>
            <div class="leaderboard">
              ${standings.length ? standings.map((member, i) => `
                <div class="leader-row ${member.user_id === currentUser.id ? 'you' : ''}">
                  <span class="leader-rank ${i === 0 ? 'top1' : i === 1 ? 'top2' : i === 2 ? 'top3' : ''}">${i + 1}</span>
                  <span class="leader-avatar">${escapeHtml(member.avatar || '🩺')}</span>
                  <span class="leader-name">${escapeHtml(member.display_name)}${member.role === 'owner' ? ' <span class="leader-chip">admin</span>' : member.role === 'admin' ? ' <span class="leader-chip">mod</span>' : ''}</span>
                  <span class="leader-xp">${member.weekly_xp} XP</span>
                </div>
              `).join('') : `<div class="league-empty-inline">Ainda não há membros ativos aqui.</div>`}
            </div>

            ${isAdmin ? `
              <button type="button" class="league-requests-toggle ${leagueRequestsOpen ? 'open' : ''} ${requests.length ? 'has-pending' : ''}" onclick="toggleLeagueRequests(event)" aria-expanded="${leagueRequestsOpen ? 'true' : 'false'}">
                <span>Solicitações${requests.length ? ` <span class="league-req-count">${requests.length}</span>` : ''}</span>
                <span class="league-requests-caret" aria-hidden="true">${leagueRequestsOpen ? '▾' : '▸'}</span>
              </button>
              ${leagueRequestsOpen ? `
                <div class="league-requests">
                  ${requests.length ? requests.map(request => `
                    <div class="league-request-card">
                      <div class="league-request-user">${escapeHtml(request.avatar || '🩺')} ${escapeHtml(request.display_name)}</div>
                      <div class="league-request-actions">
                        <button class="btn-ghost league-mini-btn" onclick="handleLeagueRequest('${request.membership_id}', 'reject')">Recusar</button>
                        <button class="btn-primary league-mini-btn" onclick="handleLeagueRequest('${request.membership_id}', 'approve')">Aprovar</button>
                      </div>
                    </div>
                  `).join('') : `<div class="league-empty-inline">Nenhum pedido pendente.</div>`}
                </div>
              ` : ''}
            ` : ''}
          `}
        </div>
      ` : ''}
    </div>
  `;
}

// ══════════════════════════════════════════════════════════
// QUESTS (MISSÕES)
// ══════════════════════════════════════════════════════════
function renderQuests() {
  const pane = document.getElementById('tab-quests');
  const quests = getActiveQuests();

  pane.innerHTML = `
    <div class="section-title" style="margin-top:0">MISSÕES ATIVAS</div>
    ${quests.map(q => `
      <div class="quest-card ${q.complete ? 'complete' : ''} ${q.claimed ? 'claimed' : ''}">
        <div class="quest-icon" style="color:${q.color}">${icon(q.ic, 26)}</div>
        <div class="quest-body">
          <div class="quest-title">${escapeHtml(q.title)}</div>
          <div class="quest-desc">${escapeHtml(q.desc)} · ${q.have}/${q.need}${q.claimed ? ' · recebido' : ''}</div>
          <div class="quest-prog"><div class="quest-prog-fill" style="width:${Math.min(100, (q.have/q.need)*100)}%"></div></div>
        </div>
        <div class="quest-reward">${q.claimed ? 'OK' : `${icon('bolt', 14, 'icn-inline')} +${q.xp}`}</div>
      </div>
    `).join('')}
  `;
}

// ══════════════════════════════════════════════════════════
// LEVEL COMPLETE
// ══════════════════════════════════════════════════════════
function renderComplete({ level, correctCount, totalCount, perfect, xpGained, questReward, gemsGained, streakInfo, heartsUsed, elapsedSec }) {
  const view = document.getElementById('view-complete');
  const questXp = questReward?.xp || 0;
  const totalXpGained = xpGained + questXp;
  const shareText = shareResult(level, correctCount, totalCount, totalXpGained);
  const nextLevel = getLevelByNumber(player.currentLevel);
  const seasonDone = !nextLevel;
  const questSummary = questReward?.quests?.length
    ? questReward.quests.map(q => `${q.title} +${q.xp} XP`).join(' · ')
    : '';

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
    : {
        kicker: 'Próximo plantão disponível',
        title: `Nível ${nextLevel.number} · ${escapeHtml(nextLevel.title)}`,
        body: 'Você pode continuar agora ou voltar ao mapa para revisar.',
        action: `<button class="btn-primary" onclick="startLevel(${nextLevel.id})">${icon('play', 16, 'icn-inline')} Continuar agora</button>`
      };

  view.innerHTML = `
    <div class="complete-wrap">
      <div class="complete-emoji" style="color:${heroColor}">${icon(heroIcon, 72)}</div>
      <div class="complete-title">${title}</div>
      <div class="complete-sub">Nível ${level.number} — ${escapeHtml(level.title)}${streakMsg ? ' · ' + streakMsg : ''}</div>

      <div class="complete-stats">
        <div class="cstat">
          <div class="cstat-val">+${totalXpGained}</div>
          <div class="cstat-lbl">${icon('bolt', 12, 'icn-inline')} XP total</div>
        </div>
        <div class="cstat">
          <div class="cstat-val">+${questXp}</div>
          <div class="cstat-lbl">${icon('flame', 12, 'icn-inline')} Missões</div>
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
      ${questSummary ? `<div class="complete-sub">${escapeHtml(questSummary)}</div>` : ''}

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

// ══════════════════════════════════════════════════════════
// PROFILE
// ══════════════════════════════════════════════════════════
async function saveProfileSettings(e) {
  if (e) e.preventDefault();
  const nameInput = document.getElementById('profile-display-name');
  const avatarInput = document.querySelector('input[name="profile-avatar"]:checked');
  const submitBtn = document.getElementById('profile-save-btn');
  const rawName = (nameInput?.value || '').trim();
  const previousUsername = player.username || player.displayName || '';

  // Username inalterado (case-sensitive) → só salva avatar e fecha.
  if (rawName && rawName === previousUsername) {
    player.avatar = avatarInput?.value || player.avatar || '🩺';
    profileSettingsOpen = false;
    renderHeaderStats();
    if (currentView === 'profile') renderProfile();
    if (player.onboarded && currentView === 'home') renderHome();
    await savePlayer();
    toast('Ajustes salvos.');
    return;
  }

  // Sem nome — mantém o que já tinha (ou default).
  if (!rawName) {
    player.avatar = avatarInput?.value || player.avatar || '🩺';
    profileSettingsOpen = false;
    renderHeaderStats();
    if (currentView === 'profile') renderProfile();
    if (player.onboarded && currentView === 'home') renderHome();
    await savePlayer();
    toast('Ajustes salvos.');
    return;
  }

  // Validação local antes de qualquer round-trip.
  if (typeof validateUsernameLocal === 'function') {
    const localErr = validateUsernameLocal(rawName);
    if (localErr) {
      profileUsernameState = { value: rawName, status: 'invalid', errorCode: localErr, lastQuery: rawName };
      paintUsernameFeedback();
      toast(usernameErrorMessage(localErr));
      return;
    }
  }

  if (!currentUser || !_supabase) {
    // Convidado — só persiste localmente como antes (compat).
    player.displayName = rawName;
    player.username = null;
    player.avatar = avatarInput?.value || player.avatar || '🩺';
    profileSettingsOpen = false;
    renderHeaderStats();
    if (currentView === 'profile') renderProfile();
    if (player.onboarded && currentView === 'home') renderHome();
    await savePlayer();
    toast('Ajustes salvos.');
    return;
  }

  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Reservando username…'; }

  const result = typeof claimUsername === 'function'
    ? await claimUsername(rawName)
    : { ok: false, error: 'network' };

  if (!result.ok) {
    profileUsernameState = { value: rawName, status: 'invalid', errorCode: result.error || 'network', lastQuery: rawName };
    paintUsernameFeedback();
    toast(usernameErrorMessage(result.error || 'network'));
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Salvar ajustes'; }
    return;
  }

  player.avatar = avatarInput?.value || player.avatar || '🩺';
  profileSettingsOpen = false;
  profileUsernameState = { value: '', status: 'idle', errorCode: null, lastQuery: '' };

  renderHeaderStats();
  if (currentView === 'profile') renderProfile();
  if (player.onboarded && currentView === 'home') renderHome();
  await savePlayer();
  toast('Username salvo.');
}

// Pinta só o helper inline do username (✓/✗/loading) sem re-renderizar
// o modal inteiro — preserva foco e caret enquanto o usuário digita.
function paintUsernameFeedback() {
  const helper = document.getElementById('profile-username-helper');
  const submit = document.getElementById('profile-save-btn');
  if (!helper) return;

  const s = profileUsernameState;
  let cls = 'username-helper';
  let text = 'Use 3–20 caracteres: letras, números ou _.';

  if (s.status === 'checking') {
    cls += ' is-checking';
    text = 'Conferindo disponibilidade…';
  } else if (s.status === 'available') {
    cls += ' is-ok';
    text = `✓ @${s.value} está disponível`;
  } else if (s.status === 'invalid') {
    cls += ' is-error';
    text = '✗ ' + (typeof usernameErrorMessage === 'function'
      ? usernameErrorMessage(s.errorCode)
      : 'Username inválido.');
  }

  helper.className = cls;
  helper.textContent = text;

  if (submit) {
    // Bloqueia o submit quando temos certeza de que é inválido. Estados
    // idle/checking permitem submeter (servidor é a autoridade final).
    const definitelyInvalid = s.status === 'invalid';
    submit.disabled = definitelyInvalid;
  }
}

function handleUsernameInput(event) {
  const raw = (event && event.target ? event.target.value : '') || '';
  const value = raw.trim();
  profileUsernameState.value = value;
  profileUsernameState.lastQuery = value;

  // Vazio → volta pra idle (o save sem nome só salva avatar).
  if (!value) {
    profileUsernameState.status = 'idle';
    profileUsernameState.errorCode = null;
    paintUsernameFeedback();
    if (profileUsernameDebounce) { clearTimeout(profileUsernameDebounce); profileUsernameDebounce = null; }
    return;
  }

  // Validação local imediata — feedback instantâneo.
  if (typeof validateUsernameLocal === 'function') {
    const localErr = validateUsernameLocal(value);
    if (localErr) {
      profileUsernameState.status = 'invalid';
      profileUsernameState.errorCode = localErr;
      paintUsernameFeedback();
      if (profileUsernameDebounce) { clearTimeout(profileUsernameDebounce); profileUsernameDebounce = null; }
      return;
    }
  }

  // É o que o usuário já tem? Sem round-trip.
  const current = player.username || player.displayName || '';
  if (value === current) {
    profileUsernameState.status = 'available';
    profileUsernameState.errorCode = null;
    paintUsernameFeedback();
    return;
  }

  profileUsernameState.status = 'checking';
  profileUsernameState.errorCode = null;
  paintUsernameFeedback();

  if (profileUsernameDebounce) clearTimeout(profileUsernameDebounce);
  profileUsernameDebounce = setTimeout(async () => {
    if (typeof checkUsernameAvailable !== 'function') return;
    const result = await checkUsernameAvailable(value);
    // Race: usuário pode ter digitado outra coisa enquanto a checagem rodava.
    if (profileUsernameState.lastQuery !== value) return;
    if (result.available) {
      profileUsernameState.status = 'available';
      profileUsernameState.errorCode = null;
    } else {
      profileUsernameState.status = 'invalid';
      profileUsernameState.errorCode = result.error || 'taken';
    }
    paintUsernameFeedback();
  }, 350);
}

function renderProfile() {
  const view = document.getElementById('view-profile');
  const info = getLeagueInfo();
  const completed = player.levelsCompleted.length;
  const perfect = player.levelsCompleted.filter(c => c.perfect).length;
  const seasonComplete = isSeasonComplete();
  const currentLevelLabel = seasonComplete ? 'MAX' : player.currentLevel;
  const avatar = player.avatar || '🩺';
  const avatarOptions = ['🩺', '🧠', '❤️', '🫁', '🦴', '🔬', '💊', '🩻'];

  const allBadges = [
    { id: 'streak_3',     ic: 'stethoscope', col: 'var(--cyan)',   n: 'Interno',    unlock: player.streak >= 3 || player.bestStreak >= 3 },
    { id: 'streak_7',     ic: 'book',        col: 'var(--lilac)',  n: 'R1',         unlock: player.streak >= 7 || player.bestStreak >= 7 },
    { id: 'streak_30',    ic: 'hospital',    col: 'var(--lime)',   n: 'Residente',  unlock: player.streak >= 30 || player.bestStreak >= 30 },
    { id: 'streak_100',   ic: 'crown',       col: 'var(--yellow)', n: 'Staff',      unlock: player.streak >= 100 || player.bestStreak >= 100 },
    { id: 'first_perfect',ic: 'star',        col: 'var(--yellow)', n: '1º Perfeito',unlock: perfect >= 1 },
    { id: 'five_perfect', ic: 'medal',       col: 'var(--yellow)', n: '5 Perfeitos',unlock: perfect >= 5 },
    { id: 'all_modes',    ic: 'target',      col: 'var(--pink)',   n: 'Versátil',   unlock: new Set(player.levelsCompleted.map(c => getLevel(c.id)?.mode)).size >= 5 },
    { id: 'league_prata', ic: 'trophy',      col: 'var(--lilac)',  n: 'Prata',      unlock: player.totalXp >= 200 },
    { id: 'league_ouro',  ic: 'trophy',      col: 'var(--yellow)', n: 'Ouro',       unlock: player.totalXp >= 500 },
    { id: 'caso_raro',    ic: 'microscope',  col: 'var(--error)',  n: 'Caso Raro',  unlock: player.levelsCompleted.some(c => getLevel(c.id)?.mode === 'casoraro') },
    { id: 'rapid_master', ic: 'bolt',        col: 'var(--yellow)', n: 'Relâmpago',  unlock: player.levelsCompleted.some(c => getLevel(c.id)?.mode === 'rapidfire' && c.perfect) },
    { id: 'plantonista',  ic: 'moon',        col: 'var(--cyan)',   n: 'Plantonista',unlock: player.levelsCompleted.some(c => { const h = new Date(c.completedAt).getHours(); return h >= 22 || h < 6; }) }
  ];

  view.innerHTML = `
    <div class="profile-shell">
      <div class="profile-toolbar">
        <button class="profile-settings-btn" onclick="openProfileSettings()" aria-label="Abrir ajustes">
          ${icon('settings', 20)}
        </button>
      </div>

    <div class="profile-head">
      <div class="profile-avatar">${escapeHtml(avatar)}</div>
      <div class="profile-name">${player.username ? `<span class="profile-username">@${escapeHtml(player.username)}</span>` : escapeHtml(player.displayName || 'Estudante')}</div>
      <div class="profile-sub">${currentUser ? escapeHtml(currentUser.email) : 'Sem conta — <button class="btn-link" style="padding:0" onclick="openLoginModal()">entrar</button>'}</div>
    </div>

    <div class="profile-grid">
      <div class="profile-card">
        <div class="pc-label">Nível atual</div>
        <div class="pc-val">${currentLevelLabel}</div>
        <div class="pc-sub">${seasonComplete ? 'Temporada concluída' : `${completed} níveis completos`}</div>
      </div>
      <div class="profile-card">
        <div class="pc-label">XP Total</div>
        <div class="pc-val">${player.totalXp}</div>
        <div class="pc-sub">${icon('trophy', 12, 'icn-inline')} ${info.current.name}</div>
      </div>
      <div class="profile-card">
        <div class="pc-label">Streak</div>
        <div class="pc-val">${player.streak} ${icon('flame', 18, 'icn-inline')}</div>
        <div class="pc-sub">Recorde: ${player.bestStreak}</div>
      </div>
      <div class="profile-card">
        <div class="pc-label">Perfeitos</div>
        <div class="pc-val">${perfect} ${icon('star', 16, 'icn-inline')}</div>
        <div class="pc-sub">de ${completed} níveis</div>
      </div>
    </div>

    <div class="section-title">CONQUISTAS</div>
    <div class="badge-grid">
      ${allBadges.map(b => `
        <div class="badge-item ${b.unlock ? '' : 'locked'}">
          <div class="be" style="color:${b.col}">${icon(b.ic, 28)}</div>
          <div class="bn">${escapeHtml(b.n)}</div>
        </div>
      `).join('')}
    </div>

    <div class="section-title">CONTA</div>
    <div class="account-actions">
      ${currentUser
        ? `<button class="btn-ghost" onclick="logout()">Sair</button>`
        : `<button class="btn-primary" onclick="openLoginModal()">Entrar / Criar conta</button>`
      }
      <button class="btn-ghost" onclick="openModal('pro')">${icon('crown', 16, 'icn-inline')} Conhecer Conduta Pro</button>
      <button class="btn-ghost" onclick="goHome()">Voltar ao mapa</button>
    </div>
    </div>

    ${profileSettingsOpen ? `
      <div class="modal-backdrop profile-settings-backdrop" onclick="if(event.target===this)closeProfileSettings()">
        <div class="modal-card profile-settings-modal">
          <button class="modal-close" onclick="closeProfileSettings()" aria-label="Fechar">✕</button>
          <h2 class="modal-title">Ajustes do perfil</h2>
          <p class="modal-desc">Seu username é único — outros jogadores te encontram por ele em rankings e convites.</p>
          <form class="settings-card settings-modal-card" onsubmit="saveProfileSettings(event)">
            <label class="settings-field">
              <span class="settings-label">Username</span>
              <div class="username-input-wrap">
                <span class="username-prefix" aria-hidden="true">@</span>
                <input
                  id="profile-display-name"
                  class="text-input username-input"
                  type="text"
                  maxlength="20"
                  minlength="3"
                  pattern="[A-Za-z0-9_]{3,20}"
                  inputmode="text"
                  autocomplete="username"
                  autocapitalize="off"
                  spellcheck="false"
                  value="${escapeHtml(player.username || player.displayName || '')}"
                  placeholder="seu_username"
                  oninput="handleUsernameInput(event)">
              </div>
              <div id="profile-username-helper" class="username-helper">Use 3–20 caracteres: letras, números ou _.</div>
            </label>
            <div class="settings-field">
              <span class="settings-label">Avatar em emoji</span>
              <div class="avatar-picker">
                ${avatarOptions.map(option => `
                  <label class="avatar-option ${option === avatar ? 'selected' : ''}">
                    <input type="radio" name="profile-avatar" value="${option}" ${option === avatar ? 'checked' : ''}>
                    <span>${option}</span>
                  </label>
                `).join('')}
              </div>
            </div>
            <button id="profile-save-btn" class="btn-primary" type="button" onclick="saveProfileSettings(event)">Salvar ajustes</button>
          </form>
        </div>
      </div>
    ` : ''}
  `;
}

function openProfileSettings() {
  profileSettingsOpen = true;
  // Inicializa o helper com base no username atual: se já tem, mostra
  // como "disponível" (é o teu mesmo). Senão, idle com a dica de formato.
  const current = player.username || player.displayName || '';
  if (current && (typeof validateUsernameLocal !== 'function' || !validateUsernameLocal(current))) {
    profileUsernameState = { value: current, status: 'available', errorCode: null, lastQuery: current };
  } else {
    profileUsernameState = { value: current, status: 'idle', errorCode: null, lastQuery: current };
  }
  if (currentView === 'profile') renderProfile();
  // Pinta o feedback após o DOM existir.
  setTimeout(() => paintUsernameFeedback(), 0);
}

function closeProfileSettings() {
  profileSettingsOpen = false;
  if (profileUsernameDebounce) { clearTimeout(profileUsernameDebounce); profileUsernameDebounce = null; }
  profileUsernameState = { value: '', status: 'idle', errorCode: null, lastQuery: '' };
  if (currentView === 'profile') renderProfile();
}

// ══════════════════════════════════════════════════════════
// SVGs MÉDICOS (esquemáticos, para Dia da Imagem)
// ══════════════════════════════════════════════════════════
function renderMedicalSvg(name) {
  const svgs = {
    'ecg-stemi': `
      <svg class="img-svg" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="#0e0210"/>
        <g stroke="#3c183d" stroke-width="0.5">
          ${Array.from({length: 20}, (_, i) => `<line x1="${i*20}" y1="0" x2="${i*20}" y2="200"/>`).join('')}
          ${Array.from({length: 10}, (_, i) => `<line x1="0" y1="${i*20}" x2="400" y2="${i*20}"/>`).join('')}
        </g>
        <path d="M0,100 L30,100 L35,95 L40,130 L45,70 L50,100 L55,60 L65,100 L100,100 L130,100 L135,95 L140,130 L145,70 L150,100 L155,60 L165,100 L200,100 L230,100 L235,95 L240,130 L245,70 L250,100 L255,60 L265,100 L300,100 L330,100 L335,95 L340,130 L345,70 L350,100 L355,60 L365,100 L400,100" fill="none" stroke="#cefc8a" stroke-width="1.8"/>
        <text x="14" y="18" font-family="monospace" font-size="11" fill="#d2cbfe">V1  ST ↑</text>
      </svg>
    `,
    'xray-pneumothorax': `
      <svg class="img-svg" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="240" fill="#0a0208"/>
        <!-- caixa torácica -->
        <ellipse cx="200" cy="130" rx="160" ry="90" fill="#1a0a1e" stroke="#3c183d" stroke-width="1"/>
        <!-- pulmão esquerdo (para o paciente) -->
        <path d="M 200 60 C 260 60, 340 80, 340 140 C 340 200, 260 220, 200 210 Z" fill="#2a0f2c" opacity="0.85"/>
        <!-- colapso à direita da imagem (lado direito do paciente) -->
        <path d="M 200 60 C 140 60, 80 80, 70 140 C 65 200, 140 210, 200 210 Z" fill="#1a0612" opacity="0.4"/>
        <path d="M 145 80 C 120 90, 105 120, 108 170 C 112 200, 145 200, 165 190 L 165 90 Z" fill="#4a2050" opacity="0.6"/>
        <!-- linha do pulmão colapsado -->
        <path d="M 165 85 C 155 130, 155 170, 165 195" stroke="#cefc8a" stroke-width="1.5" fill="none" stroke-dasharray="3,2"/>
        <!-- desvio do mediastino -->
        <line x1="210" y1="60" x2="235" y2="210" stroke="#ff6b6b" stroke-width="1.5" stroke-dasharray="4,3"/>
        <text x="260" y="40" font-family="monospace" font-size="10" fill="#d2cbfe">D</text>
        <text x="130" y="40" font-family="monospace" font-size="10" fill="#d2cbfe">E</text>
      </svg>
    `,
    'ct-sah': `
      <svg class="img-svg" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="240" fill="#0a0208"/>
        <!-- crânio -->
        <ellipse cx="200" cy="120" rx="130" ry="100" fill="#1a0a1e" stroke="#4a2050" stroke-width="2"/>
        <ellipse cx="200" cy="120" rx="118" ry="88" fill="#2a0f2c"/>
        <!-- sangue nas cisternas basais - formato estrela -->
        <g fill="#ffffff" opacity="0.85">
          <path d="M 200 100 L 220 85 L 245 95 L 230 120 L 250 145 L 220 150 L 200 175 L 180 150 L 150 145 L 170 120 L 155 95 L 180 85 Z"/>
        </g>
        <circle cx="200" cy="120" r="5" fill="#3c183d"/>
        <text x="180" y="230" font-family="monospace" font-size="10" fill="#d2cbfe">TC sem contraste · basal</text>
      </svg>
    `,
    'derm-erisipela': `
      <svg class="img-svg" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="240" fill="#1a0a1e"/>
        <!-- pele -->
        <rect x="40" y="40" width="320" height="160" rx="18" fill="#f4dbc0"/>
        <!-- placa eritematosa -->
        <ellipse cx="200" cy="120" rx="110" ry="55" fill="#c63b3b" opacity="0.95"/>
        <ellipse cx="200" cy="120" rx="100" ry="48" fill="#e85757" opacity="0.85"/>
        <!-- borda mais elevada/brilhante -->
        <ellipse cx="200" cy="120" rx="110" ry="55" fill="none" stroke="#ff9a9a" stroke-width="3"/>
        <!-- reflexo brilhante -->
        <ellipse cx="170" cy="100" rx="30" ry="12" fill="#ffffff" opacity="0.18"/>
        <text x="40" y="225" font-family="monospace" font-size="10" fill="#d2cbfe">Lesão em MI · 48h</text>
      </svg>
    `,
    'ecg-bradicardia': `
      <svg class="img-svg" viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="180" fill="#0e0210"/>
        <g stroke="#3c183d" stroke-width="0.5">
          ${Array.from({length: 20}, (_, i) => `<line x1="${i*20}" y1="0" x2="${i*20}" y2="180"/>`).join('')}
          ${Array.from({length: 9}, (_, i) => `<line x1="0" y1="${i*20}" x2="400" y2="${i*20}"/>`).join('')}
        </g>
        <!-- Ondas P isoladas (mais frequentes) -->
        <g stroke="#fca5f1" stroke-width="1.5" fill="none">
          <path d="M20,90 Q25,80 30,90"/>
          <path d="M70,90 Q75,80 80,90"/>
          <path d="M120,90 Q125,80 130,90"/>
          <path d="M170,90 Q175,80 180,90"/>
          <path d="M220,90 Q225,80 230,90"/>
          <path d="M270,90 Q275,80 280,90"/>
          <path d="M320,90 Q325,80 330,90"/>
          <path d="M370,90 Q375,80 380,90"/>
        </g>
        <!-- QRS dissociados, mais esparsos -->
        <path d="M0,90 L40,90 L42,80 L46,140 L50,50 L54,90 L150,90 L152,80 L156,140 L160,50 L164,90 L260,90 L262,80 L266,140 L270,50 L274,90 L360,90 L362,80 L366,140 L370,50 L374,90 L400,90" fill="none" stroke="#cefc8a" stroke-width="1.8"/>
        <text x="12" y="18" font-family="monospace" font-size="10" fill="#d2cbfe">DII longa · P roxa, QRS verde</text>
      </svg>
    `
  };

  return svgs[name] || `<div class="img-svg" style="display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:13px">Imagem: ${name}</div>`;
}

// Exposições globais

window.renderHeaderStats = renderHeaderStats;
window.renderOnboarding = renderOnboarding;
window.renderHome = renderHome;
window.updateHomeHeroVisibility = updateHomeHeroVisibility;
window.renderLevelMap = renderLevelMap;
window.toggleLevelMapExpanded = toggleLevelMapExpanded;
window.toggleTodayCard = toggleTodayCard;
window.renderLeague = renderLeague;
window.toggleLeagueComposer = toggleLeagueComposer;
window.renderQuests = renderQuests;
window.renderComplete = renderComplete;
window.renderProfile = renderProfile;
window.openProfileSettings = openProfileSettings;
window.closeProfileSettings = closeProfileSettings;
window.renderMedicalSvg = renderMedicalSvg;
window.openPastLevel = openPastLevel;
window.submitCreateLeague = submitCreateLeague;
window.chooseJoinLeague = chooseJoinLeague;
window.submitJoinLeague = submitJoinLeague;
window.submitLeagueSettingsUpdate = submitLeagueSettingsUpdate;
window.openLeagueDetails = openLeagueDetails;
window.handleLeagueRequest = handleLeagueRequest;
window.leaveLeagueMembership = leaveLeagueMembership;
window.openLeagueModal = openLeagueModal;
window.copyLeagueInvite = copyLeagueInvite;
window.processLeagueDeepLink = processLeagueDeepLink;
window.openLeagueAddSheet = openLeagueAddSheet;
window.showLeagueInviteConfirm = showLeagueInviteConfirm;
window.renderLeagueInviteConfirm = renderLeagueInviteConfirm;
window.dismissLeagueInviteConfirm = dismissLeagueInviteConfirm;
window.acceptLeagueInvite = acceptLeagueInvite;
window.closeLeagueModal = closeLeagueModal;
window.renderLeagueModal = renderLeagueModal;
window.handleLeagueSearchInput = handleLeagueSearchInput;
window.renderLeagueJoinResults = renderLeagueJoinResults;
window.confirmDeleteLeague = confirmDeleteLeague;
window.toggleLeagueCard = toggleLeagueCard;
window.toggleLeagueRequests = toggleLeagueRequests;
window.paintLeague = paintLeague;
window.saveProfileSettings = saveProfileSettings;
window.handleUsernameInput = handleUsernameInput;
window.paintUsernameFeedback = paintUsernameFeedback;
window.onbSelectDemo = onbSelectDemo;
window.onbConfirmDemo = onbConfirmDemo;
window.onbGoToStep = onbGoToStep;
window.finishOnboarding = finishOnboarding;
