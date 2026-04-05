/* ============================================================
   auth.js — Conduta.
   Autenticação via Supabase (email + senha).
   Depende de: storage.js (currentUser, _supabase, saveProgress)
               supabase-js CDN carregado antes
   ============================================================ */

/* ── CONFIGURAÇÃO DO SUPABASE ──────────────────────────────── */
var SUPABASE_URL      = 'https://mxsraulcvabarpaxealh.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14c3JhdWxjdmFiYXJwYXhlYWxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5OTQ0ODQsImV4cCI6MjA5MDU3MDQ4NH0.UTkENx_TFnNXxjOV-jF03JYziliQcZyQmk5Cd1iEh3I';

// Inicializa cliente — protege contra CDN não carregado
try {
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (e) {
  _supabase = null;
}

/* ── ESTADO DO MODAL ──────────────────────────────────────── */
var _loginMode  = 'login'; // 'login' ou 'signup'
var userProfile = { username: '' };

/* ── LOGIN (email + senha) ─────────────────────────────────── */
async function loginWithPassword(email, password) {
  if (!_supabase) {
    toast('Erro de conexão. Tente novamente mais tarde.');
    return false;
  }

  try {
    var res = await _supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (res.error) {
      toast(res.error.message === 'Invalid login credentials'
        ? 'Email ou senha incorretos.'
        : res.error.message);
      return false;
    }

    return true;
  } catch (e) {
    toast('Erro de conexão. Tente novamente.');
    return false;
  }
}

/* ── CADASTRO (email + senha) ──────────────────────────────── */
async function signUpWithPassword(email, password) {
  if (!_supabase) {
    toast('Erro de conexão. Tente novamente mais tarde.');
    return false;
  }

  if (password.length < 6) {
    toast('A senha deve ter no mínimo 6 caracteres.');
    return false;
  }

  try {
    var res = await _supabase.auth.signUp({
      email: email,
      password: password
    });

    if (res.error) {
      if (res.error.message.includes('already registered')) {
        toast('Este email já está cadastrado. Faça login.');
      } else {
        toast(res.error.message);
      }
      return false;
    }

    // Supabase pode exigir confirmação de email
    if (res.data.user && !res.data.session) {
      toast('Conta criada! Verifique seu email para confirmar.');
      return 'confirm';
    }

    toast('Conta criada com sucesso!');
    return true;
  } catch (e) {
    toast('Erro de conexão. Tente novamente.');
    return false;
  }
}

/* ── LOGOUT ────────────────────────────────────────────────── */
async function logout() {
  if (!_supabase) return;

  try {
    await _supabase.auth.signOut();
  } catch (e) {}

  currentUser = null;
  updateAuthUI();
  toast('Você saiu da conta.');
}

/* ── MIGRAR LOCALSTORAGE → SUPABASE ────────────────────────── */
async function migrateLocalToSupabase(user) {
  if (!_supabase || !user) return;

  var keysToMigrate = [];

  // Coleta todas as chaves do Conduta no localStorage
  for (var i = 0; i < localStorage.length; i++) {
    var k = localStorage.key(i);
    if (k && k.indexOf('conduta_') === 0 && k !== 'conduta_visited') {
      keysToMigrate.push(k);
    }
  }

  if (keysToMigrate.length === 0) return;

  // Upsert cada chave no Supabase
  for (var j = 0; j < keysToMigrate.length; j++) {
    var key = keysToMigrate[j];
    try {
      var data = JSON.parse(localStorage.getItem(key));
      if (data !== null) {
        await _supabase
          .from('user_progress')
          .upsert({
            user_id:    user.id,
            key:        key,
            data:       data,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id,key' });
      }
    } catch (e) {
      // Falha silenciosa — continua com o próximo
    }
  }

  // Limpa localStorage (exceto conduta_visited)
  for (var m = keysToMigrate.length - 1; m >= 0; m--) {
    localStorage.removeItem(keysToMigrate[m]);
  }
}

/* ── ATUALIZAR UI DE AUTH ──────────────────────────────────── */
function updateAuthUI() {
  var btnLogin   = document.getElementById('btn-login');
  var userBadge  = document.getElementById('user-badge');
  var banner     = document.getElementById('streak-banner');

  if (currentUser) {
    // Logado: mostra badge com nome/email
    if (btnLogin) btnLogin.style.display = 'none';
    if (userBadge) {
      userBadge.style.display = 'flex';
      var nameDisplay = _getDisplayName() || currentUser.email.split('@')[0];
      var emailEl  = document.getElementById('user-email');
      var avatarEl = document.getElementById('user-avatar-mini');
      if (emailEl)  emailEl.textContent  = nameDisplay;
      if (avatarEl) avatarEl.textContent = _getAvatarChar();
    }
    // Esconde banner de streak
    if (banner) banner.style.display = 'none';
  } else {
    // Deslogado: mostra botão de login
    if (btnLogin) btnLogin.style.display = 'flex';
    if (userBadge) userBadge.style.display = 'none';
    // Mostra banner se streak >= 3
    showStreakBannerIfNeeded();
  }
}

/* ── BANNER DE STREAK ──────────────────────────────────────── */
function showStreakBannerIfNeeded() {
  var banner = document.getElementById('streak-banner');
  if (!banner || currentUser) return;

  // Carrega stats do localStorage para checar streak
  try {
    var s = JSON.parse(localStorage.getItem('conduta_stats'));
    if (s && s.dayStreak >= 3) {
      document.getElementById('streak-banner-text').textContent =
        'Seu streak de ' + s.dayStreak + ' dias não está salvo. Faça login para não perder.';
      banner.style.display = 'flex';
    } else {
      banner.style.display = 'none';
    }
  } catch (e) {
    banner.style.display = 'none';
  }
}

/* ── LISTENER DE MUDANÇA DE AUTH ───────────────────────────── */
function initAuth() {
  if (!_supabase) return;

  _supabase.auth.onAuthStateChange(async function(event, session) {
    if (session && session.user) {
      var isNewLogin = !currentUser;
      currentUser = session.user;

      if (isNewLogin) {
        // Migra dados locais para Supabase
        await migrateLocalToSupabase(session.user);

        // Recarrega estado do jogo com dados do Supabase
        await reloadStateFromStorage();
      }

      updateAuthUI();
      closeModal('login');
    } else {
      currentUser = null;
      updateAuthUI();
    }
  });
}

/* ── RECARREGAR ESTADO APÓS LOGIN ──────────────────────────── */
async function reloadStateFromStorage() {
  try {
    var s = await loadProgress('conduta_stats');
    if (s) stats = s;

    var g = await loadProgress('conduta_game_' + dayKey());
    if (g) gs = g;

    var p = await loadProgress('conduta_profile');
    if (p) userProfile = p;

    // Re-renderiza tudo
    ensureBadgeFields();
    renderDots();
    renderCase();
    renderGuesses();
    if (gs.done) {
      renderResult();
      document.getElementById('input-wrap').style.display = 'none';
    }
  } catch (e) {}
}

/* ── ABRIR MODAL DE LOGIN / PERFIL ────────────────────────── */
function openLoginModal() {
  if (currentUser) {
    openProfileModal();
  } else {
    setLoginMode('login');
    openModal('login');
  }
}

function openProfileModal() {
  cancelEditUsername();

  // Username e avatar
  _refreshProfileHeader();

  // Email
  var emailDisplay = document.getElementById('account-email-display');
  if (emailDisplay) emailDisplay.textContent = currentUser.email;

  // Estatísticas de desempenho
  ensureBadgeFields();
  var winPct = stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0;
  var set = function(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; };
  set('p-played',     stats.played);
  set('p-wins',       winPct + '%');
  set('p-streak',     stats.streak);
  set('p-best',       stats.best);
  set('p-day-streak', stats.dayStreak     || 0);
  set('p-day-best',   stats.dayStreakBest || 0);

  // Status do freeze
  var fEl = document.getElementById('p-freeze');
  if (fEl) {
    var thisWeek   = isoWeekKey(dayKey());
    var freezeUsed = stats.lastFreezeWeek === thisWeek;
    fEl.textContent = freezeUsed
      ? '🧊 Freeze usado esta semana'
      : '🧊 Freeze disponível (1 dia por semana)';
    fEl.className = 'freeze-status' + (freezeUsed ? ' used' : ' available');
  }

  // Badges
  var badgesEl = document.getElementById('p-badges');
  if (badgesEl) {
    badgesEl.innerHTML = '';
    BADGES.forEach(function(badge) {
      var unlocked = !!stats.badges[badge.id];
      var item = document.createElement('div');
      item.className = 'profile-badge-item ' + (unlocked ? 'unlocked' : 'locked');
      item.title = badge.name + ' — ' + badge.desc;
      item.innerHTML =
        '<div class="profile-badge-emoji">' + (unlocked ? badge.emoji : '🔒') + '</div>' +
        '<div class="profile-badge-name">' + badge.name + '</div>';
      badgesEl.appendChild(item);
    });
  }

  openModal('account');
}

/* ── USERNAME: HELPERS ────────────────────────────────────── */
function _getDisplayName() {
  return (userProfile && userProfile.username) || '';
}

function _getAvatarChar() {
  var name = _getDisplayName();
  if (name) return name.charAt(0).toUpperCase();
  return currentUser ? currentUser.email.charAt(0).toUpperCase() : '?';
}

function _refreshProfileHeader() {
  var name = _getDisplayName();
  var avatarEl = document.getElementById('profile-avatar');
  var nameEl   = document.getElementById('profile-username-display');
  if (avatarEl) avatarEl.textContent = _getAvatarChar();
  if (nameEl)   nameEl.textContent   = name || 'Sem nome definido';
}

/* ── USERNAME: EDITAR / SALVAR ────────────────────────────── */
function startEditUsername() {
  document.getElementById('profile-edit-btn').style.display      = 'none';
  document.getElementById('profile-username-form').style.display = 'block';
  var inp = document.getElementById('profile-username-input');
  inp.value = _getDisplayName();
  inp.focus();
}

function cancelEditUsername() {
  var editBtn = document.getElementById('profile-edit-btn');
  var form    = document.getElementById('profile-username-form');
  if (editBtn) editBtn.style.display = 'inline-flex';
  if (form)    form.style.display    = 'none';
}

function saveUsername() {
  var inp  = document.getElementById('profile-username-input');
  var name = inp ? inp.value.trim() : '';

  if (!name) { toast('Digite um nome.'); return; }
  if (name.length > 30) { toast('Máximo 30 caracteres.'); return; }

  userProfile.username = name;
  saveProgress('conduta_profile', userProfile);

  cancelEditUsername();
  _refreshProfileHeader();
  updateAuthUI();
  toast('Nome salvo!');
}

/* ── ALTERNAR ENTRE LOGIN / CADASTRO ──────────────────────── */
function setLoginMode(mode) {
  _loginMode = mode;
  var title    = document.getElementById('login-modal-title');
  var btn      = document.getElementById('login-submit-btn');
  var toggle   = document.getElementById('login-toggle');
  var noteEl   = document.getElementById('login-note');
  var forgotEl = document.getElementById('login-forgot');

  if (mode === 'signup') {
    if (title)    title.textContent  = 'Criar conta';
    if (btn)      btn.textContent    = 'Criar conta';
    if (toggle)   toggle.innerHTML   = 'Já tem conta? <a href="#" onclick="setLoginMode(\'login\'); return false;">Entrar</a>';
    if (noteEl)   noteEl.textContent = 'Mínimo de 6 caracteres na senha.';
    if (forgotEl) forgotEl.style.display = 'none';
  } else {
    if (title)    title.textContent  = 'Entrar no Conduta';
    if (btn)      btn.textContent    = 'Entrar';
    if (toggle)   toggle.innerHTML   = 'Não tem conta? <a href="#" onclick="setLoginMode(\'signup\'); return false;">Criar conta</a>';
    if (noteEl)   noteEl.textContent = '';
    if (forgotEl) forgotEl.style.display = 'block';
  }
}

/* ── ESQUECI MINHA SENHA ───────────────────────────────────── */
async function handleForgotPassword() {
  var emailInput = document.getElementById('login-email');
  var email      = emailInput ? emailInput.value.trim() : '';

  if (!email || email.indexOf('@') === -1) {
    toast('Digite seu email primeiro.');
    if (emailInput) emailInput.focus();
    return;
  }

  if (!_supabase) {
    toast('Erro de conexão. Tente novamente.');
    return;
  }

  try {
    var res = await _supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://conduta.cc/'
    });

    if (res.error) {
      toast('Erro ao enviar. Verifique o email.');
    } else {
      toast('Email de redefinição enviado!');
    }
  } catch (e) {
    toast('Erro de conexão. Tente novamente.');
  }
}

/* ── SUBMIT DO FORM DE LOGIN ───────────────────────────────── */
function handleLoginSubmit(e) {
  if (e) e.preventDefault();
  var emailInput = document.getElementById('login-email');
  var passInput  = document.getElementById('login-password');
  var email      = emailInput ? emailInput.value.trim() : '';
  var password   = passInput  ? passInput.value : '';

  if (!email || email.indexOf('@') === -1) {
    toast('Digite um email válido.');
    return;
  }

  if (!password || password.length < 6) {
    toast('A senha deve ter no mínimo 6 caracteres.');
    return;
  }

  var btn = document.getElementById('login-submit-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Aguarde...';
  }

  var action = _loginMode === 'signup'
    ? signUpWithPassword(email, password)
    : loginWithPassword(email, password);

  action.then(function(result) {
    if (btn) {
      btn.disabled = false;
      btn.textContent = _loginMode === 'signup' ? 'Criar conta' : 'Entrar';
    }
    if (result === true) {
      if (emailInput) emailInput.value = '';
      if (passInput) passInput.value = '';
    }
    if (result === 'confirm') {
      setLoginMode('login');
    }
  });
}

// Inicializa auth quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', initAuth);
