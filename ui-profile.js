/* ============================================================
   ui-profile.js — Conduta.
   Perfil, ajustes e SVGs médicos.
   ============================================================ */

// ══════════════════════════════════════════════════════════
// PROFILE
// ══════════════════════════════════════════════════════════
async function saveProfileSettings(e) {
  if (e) e.preventDefault();
  const nameInput = document.getElementById('profile-display-name');
  const avatarInput = document.querySelector('input[name="profile-avatar"]:checked');
  const cleanedName = (nameInput?.value || '').trim().replace(/\s+/g, ' ');

  player.displayName = cleanedName || 'Estudante';
  player.avatar = avatarInput?.value || player.avatar || '🩺';
  profileSettingsOpen = false;

  renderHeaderStats();
  if (currentView === 'profile') renderProfile();
  if (player.onboarded && currentView === 'home') renderHome();
  await savePlayer();
  toast('Ajustes salvos.');
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
      <div class="profile-name">${escapeHtml(player.displayName || 'Estudante')}</div>
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
          <p class="modal-desc">Atualize como você aparece no app.</p>
          <form class="settings-card settings-modal-card" onsubmit="saveProfileSettings(event)">
            <label class="settings-field">
              <span class="settings-label">Como quer aparecer no app</span>
              <input id="profile-display-name" class="text-input" type="text" maxlength="24" autocomplete="name" value="${escapeHtml(player.displayName || '')}" placeholder="Seu nome ou apelido">
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
            <button class="btn-primary" type="button" onclick="saveProfileSettings(event)">Salvar ajustes</button>
          </form>
        </div>
      </div>
    ` : ''}
  `;
}

function openProfileSettings() {
  profileSettingsOpen = true;
  if (currentView === 'profile') renderProfile();
}

function closeProfileSettings() {
  profileSettingsOpen = false;
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
