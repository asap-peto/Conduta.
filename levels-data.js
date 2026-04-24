/* ============================================================
   levels-data.js — Conduta.
   Conteúdo dos níveis carregado separadamente do motor do app.
   ============================================================ */

window.CONDUTA_LEVEL_CHUNKS = window.CONDUTA_LEVEL_CHUNKS || [];
window.CONDUTA_LEVEL_CHUNKS.push(
[

/* ═══════════════════════════════════════════════════════════
   NÍVEL 1 — SEGUNDA — CONDUTA CLÁSSICA
   Tema: IAM com supradesnivelamento. Dificuldade: ⭐ Fácil.
   ═══════════════════════════════════════════════════════════ */
{
  id: 1,
  number: 1,
  dayOfWeek: 1, // segunda
  mode: 'classica',
  title: 'Dor Torácica no PS',
  emoji: '🫀',
  specialty: 'Cardiologia',
  difficulty: 1,
  estimatedMinutes: 2,

  intro: {
    patient: 'Homem, 58 anos, tabagista, hipertenso.',
    complaint: 'Chega ao PS com dor torácica há 2 horas, em aperto, irradiando para MSE, acompanhada de sudorese intensa e náuseas.',
    vitals: 'PA: 138x85 mmHg · FC: 96 bpm · FR: 20 irpm · SatO₂: 96% · Tax: 36.7°C',
    extra: 'Dor não cede com repouso nem com nitrato sublingual administrado pelo SAMU.'
  },

  questions: [
    {
      type: 'mc',
      prompt: 'Qual a primeira conduta?',
      options: [
        'Solicitar troponina e aguardar resultado para definir conduta',
        'ECG de 12 derivações imediatamente',
        'Radiografia de tórax PA e perfil',
        'Iniciar trombolítico empiricamente'
      ],
      correct: 1,
      explanation: 'ECG de 12 derivações em até 10 minutos é a prioridade absoluta na dor torácica sugestiva de SCA. Ele define se há supra de ST (IAMCSST — indicação de reperfusão imediata) ou não. Troponina é importante mas não pode atrasar o ECG.'
    },
    {
      type: 'mc',
      prompt: 'ECG mostra supradesnivelamento de ST em parede anterior (V1-V4). O hospital tem hemodinâmica 24h. Qual a conduta?',
      options: [
        'Trombólise química imediata',
        'Angioplastia primária em até 90 minutos',
        'AAS + clopidogrel e aguardar evolução',
        'Transferir para hospital terciário sem reperfusão inicial'
      ],
      correct: 1,
      explanation: 'Angioplastia primária é a reperfusão de escolha quando disponível em até 90 min (porta-balão). Trombólise só se ICP não estiver disponível nesse tempo.'
    },
    {
      type: 'ordering',
      prompt: 'Antes do cateterismo, ordene as medicações obrigatórias:',
      items: [
        'Monitorização + acesso venoso + O₂ se SatO₂ < 90%',
        'AAS 200-300 mg mastigado',
        'Clopidogrel 600 mg (ou ticagrelor 180 mg) VO',
        'Anticoagulação (HNF ou enoxaparina) conforme protocolo'
      ],
      correctOrder: [0, 1, 2, 3],
      explanation: 'MOV (Monitor-Oxigênio-Venoso) vem sempre primeiro. Depois dupla antiagregação (AAS + inibidor P2Y12) e anticoagulação. O "MONABICHA" clássico organiza a memória.'
    },
    {
      type: 'tf',
      prompt: 'Verdadeiro ou falso?',
      statements: [
        {
          text: 'Nitrato sublingual está indicado mesmo com PA sistólica de 85 mmHg.',
          answer: false,
          note: 'Contraindicado se PAS < 90 mmHg (risco de hipotensão grave).'
        },
        {
          text: 'Morfina pode ser usada se dor refratária ao nitrato.',
          answer: true,
          note: 'Sim, 2-4 mg IV. Atentar para depressão respiratória.'
        },
        {
          text: 'β-bloqueador IV deve ser dado rotineiramente nas primeiras horas.',
          answer: false,
          note: 'Não rotineiro — evitar se sinais de ICC, bradicardia ou hipotensão.'
        }
      ]
    }
  ],

  takeaway: [
    'ECG em até 10 minutos é a prioridade absoluta na dor torácica.',
    'Angioplastia primária em até 90 minutos bate trombólise quando disponível.',
    'AAS + inibidor P2Y12 + anticoagulação antes da reperfusão.',
    'Cuidado com nitrato e β-bloqueador se PA baixa ou sinais de ICC.'
  ],
  reference: 'Diretriz SBC de IAM com supradesnivelamento do segmento ST, 2021.'
},

/* ═══════════════════════════════════════════════════════════
   NÍVEL 7 — DOMINGO — DIA DA IMAGEM
   5 imagens rápidas. Dificuldade: ⭐ Fácil.
   ═══════════════════════════════════════════════════════════ */
{
  id: 2,
  number: 7,
  dayOfWeek: 0, // domingo
  mode: 'imagem',
  title: 'Dia da Imagem',
  emoji: '🩻',
  specialty: 'Multi-especialidade',
  difficulty: 1,
  estimatedMinutes: 2,

  images: [
    {
      svg: 'ecg-stemi',
      caption: 'ECG — derivações precordiais V1 a V4',
      question: 'Qual o achado principal?',
      options: [
        'Bloqueio de ramo direito',
        'Supradesnivelamento de ST anterior',
        'Fibrilação atrial com resposta rápida',
        'Hipertrofia ventricular esquerda'
      ],
      correct: 1,
      explanation: 'Supra de ST nas derivações V1-V4 = IAM anterior. Indica oclusão aguda da artéria descendente anterior. Reperfusão imediata.'
    },
    {
      svg: 'xray-pneumothorax',
      caption: 'Radiografia de tórax PA',
      question: 'Qual o diagnóstico mais provável?',
      options: [
        'Derrame pleural volumoso à direita',
        'Pneumotórax hipertensivo à direita',
        'Consolidação lobar inferior direita',
        'Massa mediastinal'
      ],
      correct: 1,
      explanation: 'Hipertransparência, colapso pulmonar e desvio do mediastino para o lado oposto = pneumotórax hipertensivo. Conduta: drenagem torácica IMEDIATA (não espera exame).'
    },
    {
      svg: 'ct-sah',
      caption: 'Tomografia de crânio sem contraste',
      question: 'Qual o achado hiperdenso mais provável?',
      options: [
        'Hematoma subdural',
        'Hemorragia subaracnoide',
        'Infarto isquêmico recente',
        'Edema cerebral difuso'
      ],
      correct: 1,
      explanation: 'Sangue nas cisternas basais em formato de "estrela" ou "aranha" = HSA. Causa mais comum: ruptura de aneurisma. Urgência neurológica.'
    },
    {
      svg: 'derm-erisipela',
      caption: 'Lesão em membro inferior, evolução de 48h',
      question: 'Qual o diagnóstico?',
      options: [
        'Erisipela',
        'Trombose venosa profunda',
        'Celulite necrotizante',
        'Dermatite de contato'
      ],
      correct: 0,
      explanation: 'Placa eritematosa bem delimitada, brilhante, com bordos elevados e quentes = erisipela. Agente: Streptococcus pyogenes. Tratamento: penicilina.'
    },
    {
      svg: 'ecg-bradicardia',
      caption: 'ECG ritmo — derivação DII longa',
      question: 'Qual o ritmo?',
      options: [
        'Taquicardia ventricular',
        'Bloqueio AV de 3º grau (BAVT)',
        'Fibrilação atrial',
        'Ritmo sinusal normal'
      ],
      correct: 1,
      explanation: 'Ondas P dissociadas dos QRS, com frequência atrial maior que ventricular = BAVT. Conduta: marcapasso transcutâneo imediato se instável, definitivo na sequência.'
    }
  ],

  takeaway: [
    'ECG sempre: V1-V4 = anterior (DA), DII/DIII/aVF = inferior (CD).',
    'Pneumotórax hipertensivo é diagnóstico clínico — drene antes de pedir mais imagem.',
    'Sangue em cisternas basais = HSA até prova em contrário.',
    'Erisipela: placa eritematosa com borda nítida. Celulite: menos delimitada e mais profunda.',
    'BAVT é emergência — marcapasso transcutâneo até definitivo.'
  ],
  reference: 'Consenso brasileiro de leitura de ECG · Radiopaedia · Diretrizes SBD.'
},

/* ═══════════════════════════════════════════════════════════
   NÍVEL 3 — QUARTA — CONDUTA CLÁSSICA
   Tema: Crise asmática grave. Dificuldade: ⭐⭐ Médio.
   ═══════════════════════════════════════════════════════════ */
{
  id: 3,
  number: 3,
  dayOfWeek: 3, // quarta
  mode: 'classica',
  title: 'Crise Asmática Grave',
  emoji: '🫁',
  specialty: 'Pneumologia',
  difficulty: 2,
  estimatedMinutes: 3,

  intro: {
    patient: 'Mulher, 24 anos, asmática desde a infância, em uso irregular de budesonida/formoterol.',
    complaint: 'Chega à UPA com dispneia intensa há 6 horas, sibilância audível, fala entrecortada (frases curtas), usa musculatura acessória.',
    vitals: 'PA: 130x80 mmHg · FC: 128 bpm · FR: 32 irpm · SatO₂: 88% em ar ambiente · Tax: 36.8°C',
    extra: 'Peak flow: 30% do previsto. Sem febre, sem dor torácica.'
  },

  questions: [
    {
      type: 'mc',
      prompt: 'Qual a primeira intervenção?',
      options: [
        'Corticoide IV imediato e aguardar ação',
        'β₂-agonista inalatório de curta ação em alta dose + O₂ para SatO₂ ≥ 94%',
        'Intubação orotraqueal imediata',
        'Sulfato de magnésio IV em bolus'
      ],
      correct: 1,
      explanation: 'β₂ de curta (salbutamol/fenoterol) nebulizado ou com espaçador em alta dose + oxigênio é o primeiro passo. Broncodilatação é a emergência aqui — corticoide demora a agir.'
    },
    {
      type: 'mc',
      prompt: 'Após 3 nebulizações seguidas sem resposta, qual o próximo passo?',
      options: [
        'Sulfato de magnésio IV 2 g em 20 min',
        'Adrenalina IM',
        'Epinefrina em spray nasal',
        'Corticoide VO'
      ],
      correct: 0,
      explanation: 'MgSO₄ 1-2 g IV em 20 min é a próxima linha em crise grave que não responde. Também já deve estar rodando corticoide sistêmico (prednisolona 1 mg/kg ou hidrocortisona IV).'
    },
    {
      type: 'ordering',
      prompt: 'Ordene as condutas paralelas nos primeiros 60 minutos:',
      items: [
        'O₂ + β₂ de curta inalatório em alta dose (3 doses em 1h)',
        'Corticoide sistêmico (prednisolona 40-60 mg VO ou hidrocortisona IV)',
        'Sulfato de magnésio IV se má resposta após 1h',
        'Reavaliar peak flow, SatO₂, ausculta e decidir sobre internação/VNI/IOT'
      ],
      correctOrder: [0, 1, 2, 3],
      explanation: 'Broncodilatação primeiro, corticoide logo em seguida (efeito em 4-6h), magnésio se refratário, e reavaliação constante. Ipratrópio pode ser associado ao β₂.'
    },
    {
      type: 'tf',
      prompt: 'Verdadeiro ou falso?',
      statements: [
        {
          text: 'Sedação com benzodiazepínico é indicada para reduzir a ansiedade da paciente.',
          answer: false,
          note: 'CONTRAINDICADO — deprime o drive respiratório e mata o paciente asmático.'
        },
        {
          text: 'β-bloqueador não seletivo pode ser usado se taquicardia associada.',
          answer: false,
          note: 'CONTRAINDICADO — broncoespasmo paradoxal. A taquicardia da crise é fisiológica.'
        },
        {
          text: 'VNI pode ser tentada antes de intubar se paciente colaborativo.',
          answer: true,
          note: 'Sim, em centros experientes. IOT se rebaixamento, exaustão ou hipercapnia progressiva.'
        }
      ]
    }
  ],

  takeaway: [
    'Broncodilatação (β₂ inalatório + O₂) vem SEMPRE primeiro.',
    'Corticoide sistêmico precoce — efeito só aparece em 4-6h.',
    'MgSO₄ IV se refratariedade.',
    'NUNCA sedar um asmático em crise. NUNCA β-bloqueador.',
    'Sinais de gravidade: fala entrecortada, tórax silencioso, confusão, pulso paradoxal.'
  ],
  reference: 'GINA 2024 · Diretriz SBPT de Asma, 2023.'
},

/* ═══════════════════════════════════════════════════════════
   NÍVEL 4 — QUINTA — TRIAGEM (MANCHESTER)
   5 pacientes. Dificuldade: ⭐⭐ Médio.
   ═══════════════════════════════════════════════════════════ */
{
  id: 4,
  number: 4,
  dayOfWeek: 4, // quinta
  mode: 'triagem',
  title: 'Triagem na Porta',
  emoji: '🚑',
  specialty: 'Emergência',
  difficulty: 2,
  estimatedMinutes: 3,

  briefing: 'Você é o médico da triagem. Cinco pacientes chegam simultaneamente. Atribua a classificação de risco (Manchester) correta para cada um.',

  colors: [
    { id: 'vermelho', emoji: '🔴', label: 'Vermelho', desc: 'Emergência · Atendimento imediato' },
    { id: 'laranja',  emoji: '🟠', label: 'Laranja',  desc: 'Muito urgente · até 10 min' },
    { id: 'amarelo',  emoji: '🟡', label: 'Amarelo',  desc: 'Urgente · até 60 min' },
    { id: 'verde',    emoji: '🟢', label: 'Pouco urgente', desc: 'até 120 min' },
    { id: 'azul',     emoji: '🔵', label: 'Não urgente',   desc: 'até 240 min' }
  ],

  patients: [
    {
      id: 'p1',
      name: 'Paciente 1',
      summary: 'Homem, 58a, dor torácica em aperto + sudorese intensa há 30 min. PA 88/55, FC 110, SatO₂ 93%.',
      correct: 'vermelho',
      reason: 'Suspeita de SCA com instabilidade hemodinâmica → atendimento imediato.'
    },
    {
      id: 'p2',
      name: 'Paciente 2',
      summary: 'Mulher, 34a, dispneia súbita + dor pleurítica. PA 120/80, FC 118, SatO₂ 89% em ar ambiente.',
      correct: 'laranja',
      reason: 'Dispneia + SatO₂ baixa sugere TEP/pneumotórax — muito urgente, mas não em parada.'
    },
    {
      id: 'p3',
      name: 'Paciente 3',
      summary: 'Mulher, 28a, cefaleia intensa há 2h ("pior da vida") + vômitos, sem déficit focal. PA 150/95, FC 88.',
      correct: 'amarelo',
      reason: 'Cefaleia súbita ("thunderclap") levanta HSA — precisa investigação em até 1h.'
    },
    {
      id: 'p4',
      name: 'Paciente 4',
      summary: 'Criança, 2a, febre 38.5°C + coriza há 2 dias. Ativa, aceitando líquidos, sem sinais de alarme.',
      correct: 'verde',
      reason: 'Quadro viral de vias aéreas superiores sem gravidade — atendimento em até 2h.'
    },
    {
      id: 'p5',
      name: 'Paciente 5',
      summary: 'Homem, 72a, dor lombar mecânica há 3 dias, sem febre, sem déficit. Pede atestado.',
      correct: 'azul',
      reason: 'Queixa crônica sem sinais de gravidade — encaixe conforme disponibilidade.'
    }
  ],

  takeaway: [
    'Instabilidade hemodinâmica + dor torácica = vermelho, sem discussão.',
    'SatO₂ < 92% sem causa óbvia = no mínimo laranja.',
    '"Pior cefaleia da vida" = investigar HSA (TC de crânio sem contraste primeiro).',
    'Febre alta + criança hígida sem sinais de alarme = verde.',
    'Dor crônica sem gravidade = azul. Não é desprezar — é priorizar.'
  ],
  reference: 'Protocolo de Manchester · Manual de Acolhimento e Classificação de Risco (MS).'
},

/* ═══════════════════════════════════════════════════════════
   NÍVEL 5 — SEXTA — RAPID FIRE
   10 afirmações. Dificuldade: ⭐ Fácil.
   ═══════════════════════════════════════════════════════════ */
{
  id: 5,
  number: 5,
  dayOfWeek: 5, // sexta
  mode: 'rapidfire',
  title: 'Rapid Fire: Farmacologia',
  emoji: '💊',
  specialty: 'Farmacologia · Vitais',
  difficulty: 1,
  estimatedMinutes: 1,

  briefing: '10 afirmações. Toque CERTO ou ERRADO. Velocidade é XP.',
  timePerStatement: 8, // segundos

  statements: [
    {
      text: 'Metformina é contraindicada em pacientes com TFG < 30 mL/min/1.73m².',
      answer: true,
      note: 'Risco de acidose lática. Suspender também na descompensação aguda.'
    },
    {
      text: 'AAS em dose analgésica é seguro no 3º trimestre de gestação.',
      answer: false,
      note: 'Risco de fechamento precoce do canal arterial. Dose baixa (100 mg) pode ser usada em indicação obstétrica.'
    },
    {
      text: 'Glasgow ≤ 8 é indicação formal de proteção de via aérea.',
      answer: true,
      note: 'Risco alto de aspiração. IOT recomendada se não houver melhora rápida.'
    },
    {
      text: 'Nitrato sublingual pode ser dado em IAM com PA sistólica 85 mmHg.',
      answer: false,
      note: 'Contraindicado se PAS < 90 mmHg ou uso recente de sildenafil.'
    },
    {
      text: 'Epinefrina IM é o tratamento de 1ª linha na anafilaxia.',
      answer: true,
      note: '0,3-0,5 mg IM na coxa (vasto lateral). Repetir em 5-15 min se necessário.'
    },
    {
      text: 'Warfarina é segura durante toda a gestação.',
      answer: false,
      note: 'Teratogênica no 1º trimestre e causa hemorragia fetal perto do parto. Heparina é a escolha.'
    },
    {
      text: 'Oxigênio suplementar em alta FiO₂ é seguro em DPOC exacerbada sem monitorização.',
      answer: false,
      note: 'Pode abolir o drive respiratório em retentores de CO₂. Alvo: SatO₂ 88-92%.'
    },
    {
      text: 'Sulfato de magnésio IV é o tratamento de escolha na eclâmpsia.',
      answer: true,
      note: '4-6 g em ataque, depois 1-2 g/h. Monitorar reflexos, FR e diurese.'
    },
    {
      text: 'Haloperidol está contraindicado em delirium hiperativo no idoso.',
      answer: false,
      note: 'É uma opção em baixa dose (0,5-1 mg) quando medidas não-farmacológicas falham. Atentar para QT longo.'
    },
    {
      text: 'Em PCR com ritmo chocável, a adrenalina é administrada após o 2º choque.',
      answer: true,
      note: 'FV/TV sem pulso: choque → RCP 2 min → choque → adrenalina 1 mg IV + amiodarona 300 mg.'
    }
  ],

  takeaway: [
    'Metformina fora em IRC grave e descompensação aguda.',
    'Epinefrina IM na coxa — não IV, não SC — é o que salva em anafilaxia.',
    'SatO₂ alvo em DPOC: 88-92%. Cuidado com o "quanto mais O₂, melhor".',
    'PCR chocável: choque vem ANTES da adrenalina.'
  ],
  reference: 'ACLS AHA 2020 · UpToDate · Manual SBIM.'
},

/* ═══════════════════════════════════════════════════════════
   NÍVEL 6 — SÁBADO — PLANTÃO SIMULADO
   Caso evolutivo. Dificuldade: ⭐⭐⭐ Difícil.
   ═══════════════════════════════════════════════════════════ */
{
  id: 6,
  number: 6,
  dayOfWeek: 6, // sábado
  mode: 'plantao',
  title: 'Plantão: O Idoso Confuso',
  emoji: '🧠',
  specialty: 'Endocrinologia · Neurologia',
  difficulty: 3,
  estimatedMinutes: 6,

  setup: '02h40 da madrugada. O SAMU chega com um homem de 72 anos trazido pela esposa. Diabético, em uso de insulina e metformina.',

  steps: [
    {
      step: 1,
      scene: 'Paciente sonolento, sudoreico, responde lentamente ao chamado. Glasgow 13 (abertura ocular ao estímulo, verbal confusa, motora obedece comandos). PA 140/80, FC 102, Tax 36.5°C, FR 18.',
      prompt: 'Qual o exame imediato que mais muda sua conduta AGORA?',
      options: [
        'Tomografia de crânio',
        'Glicemia capilar',
        'Hemograma completo',
        'Eletrocardiograma'
      ],
      correct: 1,
      feedbackOk: 'Em todo paciente com rebaixamento agudo, HGT em 30 segundos resolve ou exclui uma das causas mais comuns e reversíveis.',
      feedbackKo: 'TC/ECG/HMG podem vir em seguida, mas HGT é o teste mais barato, rápido e de maior impacto imediato.'
    },
    {
      step: 2,
      scene: 'HGT: 34 mg/dL.',
      prompt: 'Qual a conduta imediata?',
      options: [
        'Aguardar 15 min e reavaliar',
        'Glicose hipertônica IV (50 mL de SG 50%)',
        'SG 5% 500 mL em 1h',
        'Iniciar soro fisiológico isolado'
      ],
      correct: 1,
      feedbackOk: 'Hipoglicemia sintomática em paciente com rebaixamento = glicose hipertônica IV agora. Se sem acesso, glucagon IM 1 mg.',
      feedbackKo: 'Paciente com Glasgow rebaixado não toma via oral. Precisa glicose IV imediata.'
    },
    {
      step: 3,
      scene: 'Após 50 mL de SG 50%, paciente melhora parcialmente: Glasgow 14, HGT 96. Ainda sonolento.',
      prompt: 'Qual a continuidade?',
      options: [
        'Alta com orientação, já que HGT normalizou',
        'Manter SG 5% em BIC + investigar causa da hipoglicemia + reavaliar função renal',
        'Nova dose de insulina regular',
        'Transferir para UTI imediatamente'
      ],
      correct: 1,
      feedbackOk: 'Hipoglicemia em diabético com insulina/sulfonilureia costuma recidivar — manter infusão de glicose e investigar (IRA? sepse? dose errada?).',
      feedbackKo: 'Alta é prematura. Hipoglicemia pode recidivar nas próximas 12-24h, especialmente se sulfonilureia ou IRA.'
    },
    {
      step: 4,
      scene: 'Enquanto você solicita exames, o paciente apresenta CRISE CONVULSIVA TÔNICO-CLÔNICA generalizada, durando 2 minutos.',
      prompt: 'Conduta imediata durante a crise?',
      options: [
        'Conter o paciente fisicamente e abrir a boca para evitar mordedura',
        'Proteger a cabeça, lateralizar, O₂, monitorizar e administrar diazepam 10 mg IV',
        'Intubação orotraqueal imediata',
        'Aguardar a crise terminar sem intervir'
      ],
      correct: 1,
      feedbackOk: 'Proteção + O₂ + BZD IV (diazepam 10 mg ou midazolam 10 mg IM se sem acesso). Não abrir a boca nem conter fisicamente.',
      feedbackKo: 'Nunca colocar nada na boca de paciente em crise. Conter fisicamente aumenta risco de lesões.'
    },
    {
      step: 5,
      scene: 'Crise cede após diazepam. Paciente em período pós-ictal. HGT 88. Exames: creatinina 2.8 mg/dL (basal 1.1), Na 128, K 5.2.',
      prompt: 'Qual a hipótese que conecta o quadro?',
      options: [
        'AVC isquêmico com hipoglicemia incidental',
        'Descompensação renal aguda com acúmulo de hipoglicemiantes → hipoglicemia prolongada → convulsão secundária',
        'Crise epiléptica idiopática',
        'Sepse sem foco aparente'
      ],
      correct: 1,
      feedbackOk: 'Quadro clássico: idoso diabético com IRA → metformina/sulfonilureia acumulam → hipoglicemia recorrente → neuroglicopenia → convulsão. Investigar causa da IRA (desidratação? AINH? contraste?).',
      feedbackKo: 'A ligação entre IRA + hipoglicemia + convulsão é o fio da meada. A convulsão foi consequência da hipoglicemia prolongada.'
    }
  ],

  takeaway: [
    'HGT é o exame mais custo-efetivo em qualquer rebaixamento agudo.',
    'Hipoglicemia + sulfonilureia/IRA = fica internado, recidiva é regra.',
    'Crise convulsiva: proteger, lateralizar, O₂, BZD. Nunca abrir a boca.',
    'Metformina + IRA = acidose lática. Sulfonilureia + IRA = hipoglicemia prolongada.',
    'Idoso confuso não é só "demência descompensada" — sempre procurar causa orgânica.'
  ],
  reference: 'Diretrizes SBD 2023 · Protocolo de Status Epilepticus (AAN).'
},

/* ═══════════════════════════════════════════════════════════
   NÍVEL 2 — TERÇA — CASO RARO
   Tema: Takotsubo. Dificuldade: 💀 Expert.
   ═══════════════════════════════════════════════════════════ */
{
  id: 7,
  number: 2,
  dayOfWeek: 2, // terça
  mode: 'casoraro',
  title: 'O Coração Quebrado',
  emoji: '💔',
  specialty: 'Cardiologia',
  difficulty: 4,
  estimatedMinutes: 4,
  globalPassRate: 0.21, // exibido na tela

  intro: {
    patient: 'Mulher, 67 anos, hipertensa, sem coronariopatia conhecida.',
    complaint: 'Procura o PS com dor precordial em aperto há 4 horas, iniciada após receber notícia da morte súbita do marido.',
    vitals: 'PA: 108x70 mmHg · FC: 96 bpm · FR: 20 irpm · SatO₂: 97% · Tax: 36.6°C',
    extra: 'ECG: supradesnivelamento de ST em V2-V6 e DI/aVL. Troponina T: 0,48 ng/mL (elevada).'
  },

  warning: '⚠️ Atenção: menos de 25% dos jogadores acertam este caso.',

  questions: [
    {
      type: 'mc',
      prompt: 'Diante deste quadro, a primeira hipótese é IAM com supra. O que fazer?',
      options: [
        'Trombólise química imediatamente',
        'Angioplastia primária — levar à hemodinâmica',
        'Ecocardiograma antes de qualquer conduta',
        'Observação e nova troponina em 3h'
      ],
      correct: 1,
      explanation: 'Mesmo que você suspeite de outra coisa, o protocolo de IAMCSST manda: ECG com supra + clínica compatível + tempo de ouro → ICP primária. A angiografia vai esclarecer.'
    },
    {
      type: 'mc',
      prompt: 'Na coronariografia: artérias coronárias ANGIOGRAFICAMENTE NORMAIS. Ventriculografia mostra balonamento apical e hipercinesia basal. Qual o diagnóstico?',
      options: [
        'Miocardite aguda',
        'Dissecção coronariana espontânea não visível',
        'Cardiomiopatia de Takotsubo',
        'IAM por embolia coronária resolvida'
      ],
      correct: 2,
      explanation: 'Mulher pós-menopausa + gatilho emocional intenso + supra ST + troponina positiva + coronárias normais + balonamento apical = Takotsubo ("síndrome do coração partido"). É uma forma de disfunção ventricular transitória por surto catecolaminérgico.'
    },
    {
      type: 'mc',
      prompt: 'Qual o manejo inicial?',
      options: [
        'Dupla antiagregação + β-bloqueador + estatina como SCA típica',
        'Suporte clínico: IECA/ARA + β-bloqueador com cautela + diurético se congestão + afastar gatilho',
        'Alta com orientação, já que coronárias estão livres',
        'Implante imediato de CDI'
      ],
      correct: 1,
      explanation: 'Não é SCA aterotrombótica — não precisa de dupla antiagregação crônica. O manejo é de ICFER transitória: IECA/ARA, β-bloqueador (cautela se BRE/arritmia), diurético se congestão. Acompanhar eco seriado.'
    },
    {
      type: 'tf',
      prompt: 'Verdadeiro ou falso sobre Takotsubo?',
      statements: [
        {
          text: 'A maioria dos pacientes recupera função ventricular em semanas.',
          answer: true,
          note: 'Recuperação típica em 4-8 semanas. Por isso também é chamado "miocardiopatia transitória".'
        },
        {
          text: 'O diagnóstico exige sempre biópsia endomiocárdica.',
          answer: false,
          note: 'Diagnóstico clínico + imagem (coronariografia + eco). Biópsia só se dúvida com miocardite.'
        },
        {
          text: 'Pode complicar com choque cardiogênico e obstrução dinâmica da via de saída do VE.',
          answer: true,
          note: 'Até 10% evoluem com choque. Cuidado com inotrópicos — podem piorar se houver obstrução dinâmica. Preferir suporte mecânico (balão/ECMO) se necessário.'
        }
      ]
    }
  ],

  takeaway: [
    'Takotsubo = supra + troponina + coronárias limpas + balonamento apical.',
    'Gatilho típico: estresse emocional agudo em mulher pós-menopausa.',
    'Não é SCA aterotrombótica — não entra no protocolo crônico de DAC.',
    'Recuperação em semanas, mas fase aguda pode ter choque e arritmias.',
    'Inotrópico pode piorar se houver obstrução dinâmica — pensar em suporte mecânico.'
  ],
  reference: 'Critérios de Mayo · InterTAK Registry · Diretriz ESC Cardiomiopatias 2023.'
}

]);
