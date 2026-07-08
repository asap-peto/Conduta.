/* ============================================================
   auth.js — Conduta.
   Autenticação via Supabase (magic link).
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

/* ── GOOGLE OAUTH ──────────────────────────────────────────── */
async function loginWithGoogle() {
  if (!_supabase) { toast('Erro de conexão.'); return; }
  try {
    const { error } = await _supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + window.location.pathname }
    });
    if (error) toast('Erro ao iniciar login com Google.');
  } catch (e) {
    toast('Erro de conexão.');
  }
}

/* ── EMAIL + SENHA ─────────────────────────────────────────── */
async function loginEmailPassword(email, password) {
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
  if (!_supabase) { toast('Erro de conexão.'); return false; }
  const { data, error } = await _supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: window.location.origin + window.location.pathname }
  });
  if (error) { toast(error.message); return false; }
  if (data?.session) { toast('Conta criada!'); return true; }
  toast('Enviamos um link de confirmação pro seu email.');
  return true;
}

/* ── ENVIAR MAGIC LINK ─────────────────────────────────────── */
async function sendMagicLink(email) {
  if (!_supabase) {
    toast('Erro de conexão. Tente novamente mais tarde.');
    return false;
  }

  try {
    var res = await _supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: window.location.origin + window.location.pathname
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

/* ── ESQUECI A SENHA (envia link de REDEFINIÇÃO) ───────────── */
async function sendPasswordReset(email) {
  if (!_supabase) { toast('Erro de conexão. Tente mais tarde.'); return false; }
  try {
    var res = await _supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });
    if (res.error) { toast('Não foi possível enviar. Verifique o email.'); return false; }
    toast('Enviamos um link pra redefinir sua senha!');
    return true;
  } catch (e) {
    toast('Erro de conexão. Tente novamente.');
    return false;
  }
}

/* define a nova senha (após clicar no link do email — recovery) */
async function submitNewPassword(e) {
  if (e) e.preventDefault();
  var inp = document.getElementById('np-password');
  var pw = inp ? inp.value : '';
  if (!pw || pw.length < 6) { toast('Senha com ao menos 6 caracteres.'); return; }
  if (!_supabase) { toast('Erro de conexão.'); return; }
  var btn = document.getElementById('np-submit');
  if (btn) { btn.disabled = true; btn.textContent = 'Salvando...'; }
  try {
    var res = await _supabase.auth.updateUser({ password: pw });
    if (res.error) { toast(res.error.message || 'Não deu pra salvar a senha.'); }
    else { toast('Senha atualizada! Você já está logado.'); closeModal('newpass'); }
  } catch (err) {
    toast('Erro de conexão.');
  }
  if (btn) { btn.disabled = false; btn.textContent = 'Salvar nova senha'; }
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

  // Limpa localStorage — mas mantém flags que o boot lê de forma
  // síncrona (o gate do onboarding vem do localStorage no arranque)
  var keepLocal = { 'conduta_visited': 1, 'conduta_onboarded_v1': 1 };
  for (var m = keysToMigrate.length - 1; m >= 0; m--) {
    if (keepLocal[keysToMigrate[m]]) continue;
    localStorage.removeItem(keysToMigrate[m]);
  }
}

/* ── ATUALIZAR UI DE AUTH ──────────────────────────────────── */
function updateAuthUI() {
  // Header/avatar são atualizados por renderHeaderStats().
  if (typeof renderHeaderStats === 'function') {
    try { renderHeaderStats(); } catch (e) {}
  }
}

/* ── LISTENER DE MUDANÇA DE AUTH ───────────────────────────── */
function initAuth() {
  if (!_supabase) return;

  _supabase.auth.onAuthStateChange(async function(event, session) {
    // chegou pelo link de redefinição → pede a nova senha
    if (event === 'PASSWORD_RECOVERY') {
      currentUser = session ? session.user : currentUser;
      closeModal('login');
      openModal('newpass');
      return;
    }
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

  sendPasswordReset(email).then(function(success) {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Enviar link de redefinição';
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
  if (title) title.textContent =
    mode === 'signup' ? 'Criar conta' :
    mode === 'magic'  ? 'Redefinir senha' : 'Entrar';
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
window.setLoginMode = setLoginMode;
window.sendPasswordReset = sendPasswordReset;
window.submitNewPassword = submitNewPassword;

// Inicializa auth quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', initAuth);
