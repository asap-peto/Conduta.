/* ============================================================
   auth.js — Conduta.
   Autenticação via Supabase (magic link).
   Depende de: storage.js (currentUser, _supabase, saveProgress)
               supabase-js CDN carregado antes
   ============================================================ */

/* ── CONFIGURAÇÃO DO SUPABASE ──────────────────────────────── */
var SUPABASE_URL      = 'https://mxsraulcvabarpaxealh.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14c3JhdWxjdmFiYXJwYXhlYWxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5OTQ0ODQsImV4cCI6MjA5MDU3MDQ4NH0.UTkENx_TFnNXxjOV-jF03JYziliQcZyQmk5Cd1iEh3I';
var APP_BASE_URL      = window.CONDUTA_APP_URL || 'https://conduta.cc/';

// Inicializa cliente — protege contra CDN não carregado
try {
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (e) {
  _supabase = null;
}

function authRedirectUrl() {
  if (window.location.protocol === 'https:' || window.location.protocol === 'http:') {
    return window.location.origin + window.location.pathname;
  }
  return APP_BASE_URL;
}

function authCanRunHere() {
  return window.location.protocol === 'https:' ||
    (window.location.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(window.location.hostname));
}

function applyLoggedOutState() {
  currentUser = null;

  if (typeof setPlayer === 'function') {
    setPlayer(loadProgressSync('conduta_player_v2'));
    if (typeof hasVisitedConduta === 'function' && hasVisitedConduta() && typeof player !== 'undefined' && !player.onboarded) {
      player.onboarded = true;
    }
    if (typeof syncLeagueWeek === 'function') syncLeagueWeek();
    if (typeof refreshHearts === 'function') refreshHearts();
  }

  updateAuthUI();
  setAuthStatus('', '');

  if (typeof player !== 'undefined') {
    if (player.onboarded && typeof goHome === 'function') {
      goHome();
    } else if (typeof showView === 'function' && typeof renderOnboarding === 'function') {
      showView('onboarding');
      renderOnboarding();
    }
  }
}

function setAuthStatus(message, tone) {
  const el = document.getElementById('auth-status');
  if (!el) return;
  if (!message) {
    el.style.display = 'none';
    el.textContent = '';
    el.className = 'auth-status';
    return;
  }
  el.style.display = 'block';
  el.textContent = message;
  el.className = 'auth-status' + (tone ? ' ' + tone : '');
}

function setAuthButtonsDisabled(disabled) {
  const ids = ['lg-submit', 'login-submit-btn'];
  ids.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.disabled = !!disabled;
  });
  const googleBtn = document.querySelector('.btn-google');
  if (googleBtn) googleBtn.disabled = !!disabled;
}

function refreshAuthModalState() {
  if (!authCanRunHere()) {
    setAuthButtonsDisabled(true);
    setAuthStatus('Login funciona no app publicado em https ou em localhost. Evite usar file:// para autenticação.', 'warn');
    return;
  }
  if (!_supabase) {
    setAuthButtonsDisabled(true);
    setAuthStatus('Login indisponível no momento. Recarregue a página e tente novamente.', 'warn');
    return;
  }
  setAuthButtonsDisabled(false);
  setAuthStatus('', '');
}

/* ── GOOGLE OAUTH ──────────────────────────────────────────── */
async function loginWithGoogle() {
  if (!authCanRunHere()) { toast('Abra o app em https ou localhost para entrar.'); return; }
  if (!_supabase) { toast('Erro de conexão.'); return; }
  try {
    const { error } = await _supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: authRedirectUrl() }
    });
    if (error) toast('Erro ao iniciar login com Google.');
  } catch (e) {
    toast('Erro de conexão.');
  }
}

/* ── EMAIL + SENHA ─────────────────────────────────────────── */
async function loginEmailPassword(email, password) {
  if (!authCanRunHere()) { toast('Abra o app em https ou localhost para entrar.'); return false; }
  if (!_supabase) { toast('Erro de conexão.'); return false; }
  const { error } = await _supabase.auth.signInWithPassword({ email, password });
  if (error) {
    if (/invalid/i.test(error.message)) toast('Email ou senha incorretos.');
    else toast(error.message);
    return false;
  }
  return true;
}

async function signupEmailPassword(email, password) {
  if (!authCanRunHere()) { toast('Abra o app em https ou localhost para criar conta.'); return false; }
  if (!_supabase) { toast('Erro de conexão.'); return false; }
  const { data, error } = await _supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: authRedirectUrl() }
  });
  if (error) { toast(error.message); return false; }
  if (data?.session) { toast('Conta criada!'); return true; }
  toast('Enviamos um link de confirmação pro seu email.');
  return true;
}

/* ── ENVIAR MAGIC LINK ─────────────────────────────────────── */
async function sendMagicLink(email) {
  if (!authCanRunHere()) {
    toast('Abra o app em https ou localhost para receber magic link.');
    return false;
  }
  if (!_supabase) {
    toast('Erro de conexão. Tente novamente mais tarde.');
    return false;
  }

  try {
    var res = await _supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: authRedirectUrl()
      }
    });

    if (res.error) {
      toast('Erro ao enviar link. Verifique o email.');
      return false;
    }

    toast('Link enviado para seu email!');
    return true;
  } catch (e) {
    toast('Erro de conexão. Tente novamente.');
    return false;
  }
}

/* ── LOGOUT ────────────────────────────────────────────────── */
async function logout() {
  try {
    if (_supabase) await _supabase.auth.signOut();
  } catch (e) {}

  applyLoggedOutState();
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

  var migratedKeys = [];

  // Upsert cada chave no Supabase
  for (var j = 0; j < keysToMigrate.length; j++) {
    var key = keysToMigrate[j];
    try {
      var data = JSON.parse(localStorage.getItem(key));
      if (data !== null) {
        var res = await _supabase
          .from('user_progress')
          .upsert({
            user_id:    user.id,
            key:        key,
            data:       data,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id,key' });
        if (res && res.error) throw res.error;
        migratedKeys.push(key);
      }
    } catch (e) {
      // Falha silenciosa — continua com o próximo
    }
  }

  // Limpa somente o que entrou no Supabase com sucesso.
  for (var m = migratedKeys.length - 1; m >= 0; m--) {
    localStorage.removeItem(migratedKeys[m]);
  }
}

/* ── ATUALIZAR UI DE AUTH ──────────────────────────────────── */
function updateAuthUI() {
  // Header/avatar são atualizados por renderHeaderStats().
  if (typeof renderHeaderStats === 'function') {
    try { renderHeaderStats(); } catch (e) {}
  }
}

async function hydrateExistingSession() {
  if (!_supabase || !authCanRunHere()) return;

  try {
    const { data, error } = await _supabase.auth.getSession();
    if (error) return;

    const session = data && data.session;
    if (session && session.user) {
      currentUser = session.user;
    } else {
      currentUser = null;
    }
  } catch (e) {
    // Se falhar, o app segue com o estado local.
  }
}

var authBootstrapPromise = null;
function withAuthTimeout(promise, ms) {
  return new Promise(resolve => {
    var done = false;
    var timer = setTimeout(function() {
      if (done) return;
      done = true;
      resolve(null);
    }, ms);

    Promise.resolve(promise)
      .then(function(value) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve(value);
      })
      .catch(function() {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve(null);
      });
  });
}

function startAuthBootstrap() {
  if (authBootstrapPromise) return authBootstrapPromise;
  authBootstrapPromise = (async function() {
    refreshAuthModalState();
    initAuth();
    await withAuthTimeout(hydrateExistingSession(), 1200);
  })();
  return authBootstrapPromise;
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
      setAuthStatus('', '');

      // Se havia um convite de liga aguardando login, retoma o fluxo agora.
      if (isNewLogin && typeof processLeagueDeepLink === 'function') {
        setTimeout(() => { try { processLeagueDeepLink(); } catch (_) {} }, 400);
      }
    } else {
      if (event === 'SIGNED_OUT') applyLoggedOutState();
      else {
        currentUser = null;
        updateAuthUI();
      }
    }
  });
}

/* ── RECARREGAR ESTADO APÓS LOGIN ──────────────────────────── */
async function reloadStateFromStorage() {
  try {
    if (typeof maybeReloadPlayerFromStorage === 'function') {
      await maybeReloadPlayerFromStorage();
    }
    if (typeof renderHeaderStats === 'function') renderHeaderStats();
    if (typeof goHome === 'function') goHome();
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
    setLoginMode('signin');
    var emailInput = document.getElementById('lg-email');
    var passwordInput = document.getElementById('lg-password');
    var magicInput = document.getElementById('login-email');
    if (emailInput) emailInput.value = '';
    if (passwordInput) passwordInput.value = '';
    if (magicInput) magicInput.value = '';
    refreshAuthModalState();
    openModal('login');
  }
}

/* ── SUBMIT DO FORM DE LOGIN ───────────────────────────────── */
function handleLoginSubmit(e) {
  if (e) e.preventDefault();
  var input = document.getElementById('login-email');
  var email = input ? input.value.trim() : '';

  if (!email || email.indexOf('@') === -1) {
    toast('Digite um email válido.');
    return;
  }

  var btn = document.getElementById('login-submit-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Enviando...';
  }

  sendMagicLink(email).then(function(success) {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Entrar com magic link';
    }
    if (success && input) {
      input.value = '';
    }
  });
}

/* ── HANDLERS DO MODAL ─────────────────────────────────────── */
var loginMode = 'signin'; // 'signin' | 'signup' | 'magic'

function setLoginMode(mode) {
  loginMode = mode;
  document.querySelectorAll('[data-login-mode]').forEach(el => {
    el.style.display = el.dataset.loginMode === mode ? '' : 'none';
  });
  const title = document.getElementById('login-title');
  const submit = document.getElementById('lg-submit');
  if (title) title.textContent =
    mode === 'signup' ? 'Criar conta' :
    mode === 'magic'  ? 'Entrar por magic link' : 'Entrar';
  if (submit) submit.textContent = mode === 'signup' ? 'Criar conta' : 'Entrar';
}

async function handleEmailPasswordSubmit(e) {
  if (e) e.preventDefault();
  const email = document.getElementById('lg-email').value.trim();
  const pw    = document.getElementById('lg-password').value;
  if (!email || !pw) { toast('Preencha email e senha.'); return; }
  if (pw.length < 6 && loginMode === 'signup') { toast('Senha com ao menos 6 caracteres.'); return; }

  const btn = document.getElementById('lg-submit');
  if (btn) { btn.disabled = true; btn.textContent = 'Aguarde...'; }

  const ok = loginMode === 'signup'
    ? await signupEmailPassword(email, pw)
    : await loginEmailPassword(email, pw);

  if (btn) {
    btn.disabled = false;
    btn.textContent = loginMode === 'signup' ? 'Criar conta' : 'Entrar';
  }
  if (ok) {
    document.getElementById('lg-password').value = '';
  }
}

window.loginWithGoogle = loginWithGoogle;
window.loginEmailPassword = loginEmailPassword;
window.signupEmailPassword = signupEmailPassword;
window.handleEmailPasswordSubmit = handleEmailPasswordSubmit;
window.handleLoginSubmit = handleLoginSubmit;
window.setLoginMode = setLoginMode;
window.openLoginModal = openLoginModal;
window.logout = logout;
window.startAuthBootstrap = startAuthBootstrap;

// Inicializa auth quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  startAuthBootstrap();
});
