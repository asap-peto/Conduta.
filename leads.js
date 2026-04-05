/* ============================================================
   leads.js — Conduta.
   Modal de captura de leads disparado após o 1º caso concluído.
   Salva email, faculdade e ano_formatura na tabela `leads`
   do Supabase. Não bloqueia a experiência — fechar descarta
   permanentemente sem incomodar o usuário novamente.
   ============================================================ */

var LEAD_KEY = 'conduta_lead_done'; // localStorage: já respondeu ou dispensou

/* ── VERIFICAR SE DEVE EXIBIR ─────────────────────────────── */
function maybeShowLeadModal() {
  // Só mostra uma vez, nunca mais após submeter ou dispensar
  if (localStorage.getItem(LEAD_KEY)) return;

  // Pré-preenche o email se o usuário estiver logado
  var emailInput = document.getElementById('lead-email');
  if (emailInput && currentUser && currentUser.email) {
    emailInput.value = currentUser.email;
  }

  // Abre com leve delay para não competir com o confetti/resultado
  setTimeout(function() {
    document.getElementById('overlay-lead').classList.add('open');
  }, 1800);
}

/* ── FECHAR / DISPENSAR ───────────────────────────────────── */
function closeLeadModal() {
  document.getElementById('overlay-lead').classList.remove('open');
  // Marca como dispensado — nunca mais aparece
  localStorage.setItem(LEAD_KEY, 'dismissed');
}

/* ── SUBMIT DO FORMULÁRIO ─────────────────────────────────── */
async function submitLead(e) {
  if (e) e.preventDefault();

  var emailVal    = document.getElementById('lead-email').value.trim();
  var faculdadeVal = document.getElementById('lead-faculdade').value.trim();
  var anoVal      = document.getElementById('lead-ano').value.trim();

  if (!emailVal || emailVal.indexOf('@') === -1) {
    toast('Digite um email válido.');
    return;
  }

  var btn = document.getElementById('lead-submit-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }

  var payload = {
    email:         emailVal,
    faculdade:     faculdadeVal || null,
    ano_formatura: anoVal ? parseInt(anoVal, 10) : null
  };

  var saved = false;

  if (_supabase) {
    try {
      var res = await _supabase.from('leads').insert(payload);
      if (!res.error) saved = true;
    } catch (err) {}
  }

  // Mesmo que o Supabase falhe, marca localmente para não incomodar
  localStorage.setItem(LEAD_KEY, 'submitted');

  if (btn) { btn.disabled = false; btn.textContent = 'Enviar'; }

  document.getElementById('overlay-lead').classList.remove('open');
  toast('Obrigado! Bons estudos 🩺');
}
