/* ============================================================
   ui-onboarding.js — Conduta.
   Fluxo de onboarding.
   ============================================================ */

// ══════════════════════════════════════════════════════════
// ONBOARDING
// ══════════════════════════════════════════════════════════
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
    <div class="onb-sub">Sem meta artificial e sem cronômetro. A ideia é simples: um caso novo por dia.</div>
    <div class="takeaway-card">
      <div class="takeaway-title">Seu ritmo no Conduta</div>
      <ul class="takeaway-list">
        <li>1 nível novo por dia para manter o hábito</li>
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
