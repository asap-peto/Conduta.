/* ============================================================
   ui-league.js — Conduta.
   Liga privada, catálogo, convites e ranking.
   ============================================================ */

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

function openLeagueModal(mode, leagueId) {
  leagueModalMode = mode;
  leagueEditingLeagueId = leagueId || null;
  renderLeagueModal();
}

function closeLeagueModal() {
  leagueModalMode = null;
  leagueEditingLeagueId = null;
  renderLeagueModal();
}

function renderLeagueModal() {
  let backdrop = document.getElementById('league-modal');
  if (!leagueModalMode) {
    if (backdrop) backdrop.remove();
    return;
  }

  const canJoinMore = player.isPro || getJoinedLeagueCount() < getLeagueMembershipLimit();
  const catalog = (leagueHubState.catalog || []).filter(l => {
    const m = findLeagueMembership(l.league_id);
    return !m || m.membership_status === 'rejected';
  });
  const selectedJoin = catalog.find(l => l.league_id === leagueHubState.selectedJoinLeagueId) || catalog[0] || null;

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
    body = `
      <p class="league-modal-desc">Escolha uma liga da lista e digite a senha que o admin compartilhou.</p>
      <div class="league-catalog" role="radiogroup" aria-label="Ligas disponíveis">
        ${catalog.length ? catalog.map(league => `
          <button type="button" class="league-catalog-card ${selectedJoin?.league_id === league.league_id ? 'selected' : ''}" onclick="chooseJoinLeague('${league.league_id}')">
            <span class="league-catalog-name">${escapeHtml(league.league_name)}</span>
            <span class="league-catalog-sub">${leagueJoinModeLabel(league.join_mode)} · ${league.active_members} membros</span>
          </button>
        `).join('') : `<div class="league-note">Nenhuma liga pública disponível. Peça para o admin criar uma.</div>`}
      </div>
      <form class="league-form" onsubmit="submitJoinLeague(event)">
        <label class="league-field">
          <span class="league-field-label">Senha da liga</span>
          <input id="league-join-password" class="text-input" type="text" minlength="4" placeholder="Senha compartilhada pelo admin" autocomplete="off" autocapitalize="off" spellcheck="false" ${selectedJoin ? '' : 'disabled'} required>
        </label>
        ${!canJoinMore ? `<div class="league-note">Faça upgrade para Pro ou saia de uma liga para abrir espaço.</div>` : ''}
        <div class="league-modal-actions">
          <button type="button" class="btn-ghost" onclick="closeLeagueModal()">Cancelar</button>
          <button type="submit" class="btn-primary" ${(selectedJoin && canJoinMore) ? '' : 'disabled'}>Entrar${selectedJoin && selectedJoin.join_mode === 'approval' ? ' (solicitar)' : ''}</button>
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

  if (backdrop) {
    backdrop.outerHTML = html;
  } else {
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    document.body.appendChild(wrap.firstElementChild);
  }

  // foco inicial
  setTimeout(() => {
    const focusTarget = document.querySelector('#league-modal input:not([disabled]), #league-modal button.btn-primary');
    if (focusTarget) focusTarget.focus();
  }, 30);
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
  renderLeagueModal();
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

  // Stale-while-revalidate: se já temos dados, pinta imediatamente e atualiza em background.
  if (leagueHubState.ready) {
    paintLeague(pane);
    if (forceReload || (Date.now() - leagueHubState.lastLoadedAt) > 30_000) {
      loadLeagueHub({ force: forceReload, onRefresh: () => paintLeague(pane) });
    }
    return;
  }

  // Primeira carga: skeleton + fetch.
  pane.innerHTML = `
    <div class="league-shell-card">
      <div class="league-hero league-hero-skel">
        <div class="skel-title"></div>
        <div class="skel-sub"></div>
      </div>
      ${leagueSkeletonHtml()}
    </div>
  `;
  loadLeagueHub({ force: forceReload }).then(() => paintLeague(pane));
}

function paintLeague(pane) {
  if (!pane) pane = document.getElementById('tab-liga');
  if (!pane) return;

  const state = leagueHubState;

  if (state.error && !state.ready) {
    pane.innerHTML = `
      <div class="league-shell-card">
        <div class="league-empty">
          <div class="league-empty-title">Não foi possível carregar as ligas</div>
          <div class="league-empty-copy">${escapeHtml(state.error)}</div>
          <button class="btn-primary" onclick="renderLeague(true)">Tentar novamente</button>
        </div>
      </div>
    `;
    return;
  }

  const limit = getLeagueMembershipLimit();
  const joinedCount = getJoinedLeagueCount();
  const canJoinMore = player.isPro || joinedCount < limit;
  const memberships = state.memberships || [];
  const catalogAvailable = (state.catalog || []).some(l => {
    const m = findLeagueMembership(l.league_id);
    return !m || m.membership_status === 'rejected';
  });

  const limitLabel = player.isPro
    ? 'Pro · ligas ilimitadas'
    : `Free · ${joinedCount}/${limit} ligas`;

  pane.innerHTML = `
    <div class="league-shell-card ${state.refreshing ? 'is-refreshing' : ''}">
      <div class="league-hero">
        <div class="league-hero-inner">
          <div class="league-emoji">🏟️</div>
          <div class="league-hero-text">
            <div class="league-name">Suas ligas</div>
            <div class="league-sub">${escapeHtml(limitLabel)} · ${player.leagueXpWeek} XP nesta semana</div>
          </div>
        </div>
        <div class="league-quick-actions">
          <button class="league-chip league-chip-primary" onclick="openLeagueModal('create')" ${canJoinMore ? '' : 'disabled'} title="${canJoinMore ? 'Criar uma nova liga' : 'Limite de ligas atingido'}">
            <span class="league-chip-icon">＋</span> Criar
          </button>
          <button class="league-chip" onclick="openLeagueModal('join')" ${canJoinMore && catalogAvailable ? '' : 'disabled'} title="${catalogAvailable ? 'Entrar numa liga existente' : 'Nenhuma liga disponível'}">
            <span class="league-chip-icon">🔑</span> Entrar
          </button>
        </div>
        ${state.refreshing ? `<div class="league-refresh-indicator" aria-hidden="true"></div>` : ''}
      </div>

      ${memberships.length ? `
        <div class="section-title section-title-row">
          <span>MINHAS LIGAS</span>
          <button class="league-link-btn" onclick="renderLeague(true)" title="Atualizar">${state.refreshing ? 'Atualizando…' : '↻ Atualizar'}</button>
        </div>
        <div class="league-memberships">
          ${memberships.map(membership => renderMembershipCard(membership, state)).join('')}
        </div>
      ` : `
        <div class="league-empty league-empty-compact">
          <div class="league-empty-title">Você ainda não está em nenhuma liga</div>
          <div class="league-empty-copy">Crie a sua ou peça a senha de um colega para entrar.</div>
          <div class="league-empty-cta">
            <button class="btn-primary" onclick="openLeagueModal('create')">Criar liga</button>
            ${catalogAvailable ? `<button class="btn-ghost" onclick="openLeagueModal('join')">Entrar em uma liga</button>` : ''}
          </div>
        </div>
      `}
    </div>
  `;

  // Mantém o modal renderizado consistente com o estado atual
  if (leagueModalMode) renderLeagueModal();
}

function renderMembershipCard(membership, state) {
  const expanded = membership.league_id === state.selectedLeagueId;
  const statusLabel = leagueStatusLabel(membership.membership_status);
  const roleLabel = leagueRoleLabel(membership.membership_role);
  const isOwner = membership.membership_role === 'owner';
  const isAdmin = isLeagueAdminMembership(membership.league_id);
  const isPending = membership.membership_status === 'pending';
  const requests = state.requests || [];
  const standings = state.standings || [];
  const pendingCount = isAdmin ? (expanded ? requests.length : membership.pending_members) : 0;

  return `
    <div class="league-membership-card ${expanded ? 'expanded' : ''}">
      <button class="league-membership-main" onclick="toggleLeagueCard('${membership.league_id}')" aria-expanded="${expanded ? 'true' : 'false'}">
        <div class="league-membership-top">
          <span class="league-membership-name">${escapeHtml(membership.league_name)}</span>
          <span class="league-pill ${membership.membership_status}">${statusLabel}</span>
          <span class="league-detail-caret" aria-hidden="true">${expanded ? '▾' : '▸'}</span>
        </div>
        <div class="league-membership-sub">
          <span class="league-role-badge ${isAdmin ? 'is-admin' : ''}">${roleLabel}</span>
          · ${leagueJoinModeLabel(membership.join_mode)}
        </div>
        <div class="league-membership-meta">
          <span>👥 ${membership.active_members} ativos</span>
          ${pendingCount > 0 ? `<span class="badge-warn">⏳ ${pendingCount} pendentes</span>` : ''}
        </div>
      </button>
      <div class="league-membership-actions">
        ${isAdmin ? `<button class="league-icon-btn" onclick="event.stopPropagation(); openLeagueModal('edit', '${membership.league_id}')" aria-label="Editar liga" title="Editar liga">✎</button>` : ''}
        ${!isOwner ? `<button class="league-icon-btn danger" onclick="event.stopPropagation(); leaveLeagueMembership('${membership.league_id}')" aria-label="Sair da liga" title="Sair da liga">↪</button>` : ''}
      </div>

      ${expanded ? `
        <div class="league-card-body">
          ${isPending ? `
            <div class="league-empty-inline">⏳ Seu pedido está aguardando aprovação do admin.</div>
          ` : `
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
              <button type="button" class="league-requests-toggle ${leagueRequestsOpen ? 'open' : ''}" onclick="toggleLeagueRequests(event)" aria-expanded="${leagueRequestsOpen ? 'true' : 'false'}">
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
