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

// Inicializa auth quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', initAuth);
