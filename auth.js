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
var _loginMode = 'login'; // 'login' ou 'signup'

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
    // Logado: mostra badge com email
    if (btnLogin) btnLogin.style.display = 'none';
    if (userBadge) {
      userBadge.style.display = 'flex';
      var emailEl = document.getElementById('user-email');
      if (emailEl) emailEl.textContent = currentUser.email;
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

/* ── ABRIR MODAL DE LOGIN ──────────────────────────────────── */
function openLoginModal() {
  if (currentUser) {
    // Se já logado, abre modal de conta
    var emailDisplay = document.getElementById('account-email-display');
    if (emailDisplay) emailDisplay.textContent = currentUser.email;
    openModal('account');
  } else {
    setLoginMode('login');
    openModal('login');
  }
}

/* ── ALTERNAR ENTRE LOGIN / CADASTRO ──────────────────────── */
function setLoginMode(mode) {
  _loginMode = mode;
  var title    = document.getElementById('login-modal-title');
  var btn      = document.getElementById('login-submit-btn');
  var toggle   = document.getElementById('login-toggle');
  var noteEl   = document.getElementById('login-note');

  if (mode === 'signup') {
    if (title)  title.textContent  = 'Criar conta';
    if (btn)    btn.textContent    = 'Criar conta';
    if (toggle) toggle.innerHTML   = 'Já tem conta? <a href="#" onclick="setLoginMode(\'login\'); return false;">Entrar</a>';
    if (noteEl) noteEl.textContent = 'Mínimo de 6 caracteres na senha.';
  } else {
    if (title)  title.textContent  = 'Entrar no Conduta';
    if (btn)    btn.textContent    = 'Entrar';
    if (toggle) toggle.innerHTML   = 'Não tem conta? <a href="#" onclick="setLoginMode(\'signup\'); return false;">Criar conta</a>';
    if (noteEl) noteEl.textContent = '';
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
