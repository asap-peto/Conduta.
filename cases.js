/* ============================================================
   cases.js — Conduta.
   Banco de casos do jogo diário.
   Casos reconstruídos a partir de cenários do ENAMED 2025,
   com condutas ancoradas em diretrizes atuais.

   REGRAS EDITORIAIS (por decisão):
   - Exatamente 4 opções, sempre embaralhadas no render.
   - Exatamente 1 opção `quality: 'best'`.
   - 0 ou 1 opção `quality: 'acceptable'`; as demais são 'poor'.
   - `dangerous: true` só em opção 'poor' — é a "pegadinha de
     segurança" do caso (no máximo 1–2 por caso).
   - `redundant: true` marca exame/etapa desnecessária que atrasa
     a conduta (alimenta o eixo Qualidade).
   - `feedback`: 1–2 frases; aparece no gabarito comentado.

   ESTRUTURA DO CASO:
   - decisions[0] = primeira conduta (kind 'initial', cronometrada
     com peso 2x), decisions[1] = interpretação, decisions[2] =
     conduta final. `timeTarget` em segundos (default 25).
   - reveals[0] entra entre D1→D2, reveals[1] entre D2→D3.
     O caso é LINEAR: a revelação descreve o caso avançando
     (equipe/protocolo/tempo), coerente com qualquer escolha.
   ============================================================ */

var THEMES = {
  cardio:  { icon: '🫀', label: 'Cardiologia' },
  pneumo:  { icon: '🫁', label: 'Pneumologia' },
  go:      { icon: '🤰', label: 'GO' },
  ped:     { icon: '🧒', label: 'Pediatria' },
  infecto: { icon: '🦟', label: 'Infectologia' },
  neuro:   { icon: '🧠', label: 'Neurologia' },
  trauma:  { icon: '🚑', label: 'Emergência' },
  endo:    { icon: '🧪', label: 'Endocrinologia' },
  gi:      { icon: '🩸', label: 'Gastroenterologia' },
  psiq:    { icon: '💊', label: 'Psiquiatria' },
  reumato: { icon: '🦴', label: 'Reumatologia' }
};

var DAILY_CASES = [

  /* ── 1. ICFEr hipertensiva — GDMT ────────────────────────── */
  {
    id: 'cardio-icfer-gdmt',
    theme: 'cardio',
    difficulty: 2,
    setting: 'Ambulatório de cardiologia',
    diagnosis: 'Insuficiência cardíaca com fração de ejeção reduzida (ICFEr)',
    acceptedDifferentials: ['ICFEr', 'Insuficiência cardíaca sistólica'],
    presentation: {
      vignette: 'Mulher, 58 anos, hipertensa em tratamento irregular, encaminhada por fadiga e dispneia aos esforços com piora progressiva. À ausculta, ritmo em 4 tempos (B3 + B4), sem sopros, com crepitações em bases pulmonares.',
      vitals: 'PA 148/90 · ritmo regular · crepitações bibasais'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Solicitar BNP e ecocardiograma para confirmar e classificar a insuficiência cardíaca, mantendo o controle pressórico',
            quality: 'best',
            feedback: 'B3 + crepitações + dispneia progressiva sugerem IC: o ecocardiograma define a fração de ejeção e direciona toda a terapia. O BNP apoia o diagnóstico.' },
          { text: 'Iniciar diurético de alça para a congestão pulmonar e reavaliar os sintomas',
            quality: 'acceptable',
            feedback: 'O diurético alivia a congestão e é razoável, mas é sintomático — não substitui a investigação que define a conduta com impacto em sobrevida.' },
          { text: 'Associar verapamil ao esquema para melhorar o controle pressórico',
            quality: 'poor', dangerous: true,
            feedback: 'Bloqueadores de canal de cálcio não di-hidropiridínicos (verapamil, diltiazem) são inotrópicos negativos e contraindicados na suspeita de ICFEr — podem descompensar a paciente.' },
          { text: 'Atribuir a dispneia apenas ao descontrole pressórico e reforçar a adesão, sem investigar',
            quality: 'poor',
            feedback: 'Os achados apontam disfunção cardíaca estrutural — reforçar adesão sem investigar deixa passar uma IC que exige terapia específica.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'O que o ecocardiograma define?',
        options: [
          { text: 'ICFEr — além do controle pressórico, o foco passa a ser a terapia com benefício de mortalidade (GDMT)',
            quality: 'best',
            feedback: 'FE 38% define insuficiência cardíaca com fração de ejeção reduzida: o objetivo deixa de ser só a pressão e passa a ser modificar o prognóstico.' },
          { text: 'IC com fração de ejeção reduzida — manter o IECA e otimizar a volemia',
            quality: 'acceptable',
            feedback: 'A leitura da FE está certa e manter o IECA é correto, mas falta nomear o alvo central: introduzir as drogas que reduzem mortalidade.' },
          { text: 'Insuficiência cardíaca com FE preservada (diastólica) — controlar apenas a HAS e a frequência',
            quality: 'poor',
            feedback: 'FE de 38% é reduzida, não preservada. Tratar como IC diastólica ignora a terapia que muda a sobrevida na ICFEr.' },
          { text: 'Disfunção provavelmente transitória — repetir o eco em 6 meses antes de mudar a conduta',
            quality: 'poor',
            feedback: 'Adiar a terapia otimizada por meses em uma ICFEr sintomática perde a janela de reduzir mortalidade e remodelamento.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Qual fármaco associar pelo benefício de sobrevida?',
        options: [
          { text: 'Antagonista do receptor mineralocorticoide (espironolactona), com monitorização de potássio e função renal',
            quality: 'best',
            feedback: 'A espironolactona reduz mortalidade na ICFEr sintomática (é um dos quatro pilares). Exige vigiar potássio e creatinina pelo risco de hipercalemia.' },
          { text: 'Inibidor de SGLT2 (ex.: dapagliflozina), outro pilar com redução de mortalidade',
            quality: 'acceptable',
            feedback: 'Também correto e moderno — iSGLT2 é um dos quatro pilares. Na lógica da questão, o fármaco esperado era a espironolactona, mas ambos compõem a terapia otimizada.' },
          { text: 'Clortalidona para intensificar o controle pressórico',
            quality: 'poor',
            feedback: 'O tiazídico ajuda a pressão, mas não tem benefício de mortalidade na ICFEr — não é o fármaco que muda o prognóstico.' },
          { text: 'Clonidina para reduzir a pressão arterial',
            quality: 'poor',
            feedback: 'A clonidina não tem benefício prognóstico na IC e traz risco de efeito rebote e sedação — não é a escolha aqui.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Ecocardiograma + laboratório',
        body: 'Hipertrofia ventricular esquerda concêntrica e fração de ejeção de 38% (Simpson). BNP elevado; demais exames normais.' },
      { kind: 'evolution', title: 'Otimização em curso',
        body: 'IECA mantido e betabloqueador iniciado e titulado, com boa tolerância. Potássio e função renal normais. O especialista quer associar um fármaco com impacto em sobrevida.' }
    ],
    debrief: {
      summary: 'A ICFEr sintomática se trata com os "quatro pilares" da terapia otimizada baseada em evidências: IECA/BRA ou ARNI, betabloqueador, antagonista do receptor mineralocorticoide (espironolactona) e inibidor de SGLT2 — todos com redução de mortalidade. A espironolactona (estudo RALES) reduz mortalidade na IC sintomática, exigindo monitorização de potássio e função renal. Fármacos como clortalidona e clonidina controlam a pressão, mas não mudam o prognóstico, e o verapamil é contraindicado por ser inotrópico negativo.',
      pearls: [
        'ICFEr: o alvo é mortalidade — quatro pilares, não só a pressão.',
        'Espironolactona reduz mortalidade; monitore potássio e creatinina.',
        'Evite BCC não di-hidropiridínico (verapamil/diltiazem) na ICFEr.'
      ],
      reference: 'SBC — Diretriz Brasileira de Insuficiência Cardíaca Crônica; ESC Heart Failure Guidelines, 2021.'
    }
  },

  /* ── 2. Acidose tubular renal (lactente) ─────────────────── */
  {
    id: 'ped-atr-lactente',
    theme: 'ped',
    difficulty: 3,
    setting: 'Emergência pediátrica',
    diagnosis: 'Acidose tubular renal distal (tipo 1)',
    acceptedDifferentials: ['Acidose tubular renal', 'ATR distal'],
    presentation: {
      vignette: 'Lactente de 4 meses trazido com vômitos, poliúria, episódios de fraqueza intensa e febre. Ao exame, desidratação grave e déficit de crescimento importante. Radiografias mostram osteopenia e raquitismo que não responde à vitamina D.',
      vitals: 'Desidratação grave · déficit de crescimento · raquitismo vitamina-D-resistente'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Reidratação venosa e coleta de gasometria, eletrólitos (Na, K, Cl) e função renal',
            quality: 'best',
            feedback: 'Desidratação grave exige reposição venosa, e a gasometria com eletrólitos é o que revela o distúrbio ácido-básico que fecha o diagnóstico.' },
          { text: 'Reidratação venosa e dosagem apenas dos eletrólitos, adiando a gasometria',
            quality: 'acceptable',
            feedback: 'Reidratar está certo, mas deixar a gasometria de fora atrasa o reconhecimento do distúrbio ácido-básico, que é a chave do caso.' },
          { text: 'Administrar altas doses de vitamina D presumindo raquitismo carencial',
            quality: 'poor', redundant: true,
            feedback: 'O raquitismo é resistente à vitamina D: repor vitamina D não corrige a causa e adia o diagnóstico do distúrbio tubular.' },
          { text: 'Repor potássio venoso em push rápido para tratar a fraqueza',
            quality: 'poor', dangerous: true,
            feedback: 'Potássio em bólus rápido — ainda mais sem conhecer o valor sérico e sob monitorização — pode causar arritmia fatal. Repõe-se diluído e controlado.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Qual o distúrbio ácido-básico e a hipótese?',
        options: [
          { text: 'Acidose metabólica hiperclorêmica (ânion gap normal) — compatível com acidose tubular renal',
            quality: 'best',
            feedback: 'Perda de bicarbonato pelo túbulo gera acidose metabólica com ânion gap normal e cloro alto. Somada a raquitismo e fraqueza (hipocalemia), aponta ATR.' },
          { text: 'Acidose metabólica — iniciar álcali e repor potássio',
            quality: 'acceptable',
            feedback: 'A conduta de alcalinizar e repor potássio está correta, mas falta caracterizar que é uma acidose hiperclorêmica de ânion gap normal — o que define a ATR.' },
          { text: 'Acidose metabólica com ânion gap elevado por sepse e lactato — investigar choque',
            quality: 'poor',
            feedback: 'Na ATR o ânion gap é normal (hiperclorêmica). Interpretar como acidose com ânion gap elevado leva a investigação na direção errada.' },
          { text: 'Quadro de desidratação simples — apenas hidratar e reavaliar',
            quality: 'poor',
            feedback: 'Chamar de desidratação simples ignora a doença tubular de base: sem tratá-la, a acidose, a hipocalemia e o raquitismo persistem.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Conduta definitiva?',
        options: [
          { text: 'Repor potássio e iniciar terapia alcalinizante (citrato/bicarbonato), com acompanhamento nefrológico',
            quality: 'best',
            feedback: 'A ATR distal cursa com hipocalemia: repõe-se o potássio junto com o álcali (citrato de potássio), corrigindo acidose e prevenindo complicações ósseas e renais.' },
          { text: 'Internar para alcalinização e reposição, reavaliando os eletrólitos a cada turno',
            quality: 'acceptable',
            feedback: 'Internar e tratar é adequado; a ressalva é apenas a monitorização, que na fase aguda costuma exigir intervalos mais curtos que um turno.' },
          { text: 'Iniciar bicarbonato de sódio imediatamente, antes de repor o potássio',
            quality: 'poor', dangerous: true,
            feedback: 'Alcalinizar antes de corrigir o potássio desloca o K⁺ para dentro da célula e agrava a hipocalemia — risco de arritmia. Potássio primeiro.' },
          { text: 'Solicitar tomografia e biópsia renal antes de iniciar qualquer tratamento',
            quality: 'poor', redundant: true,
            feedback: 'Investigação invasiva de imediato apenas atrasa o tratamento — a correção do distúrbio ácido-básico e do potássio não pode esperar.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Gasometria e eletrólitos',
        body: 'pH 7,28 · bicarbonato 14 mEq/L · Na⁺ 138 · Cl⁻ 116 · K⁺ 2,8 mEq/L. O pH urinário está em 6,5, inapropriadamente alto diante da acidose sistêmica.' },
      { kind: 'evolution', title: 'Evolução após reidratação',
        body: 'Com a reidratação, a criança se estabiliza. Persistem bicarbonato baixo, cloro alto e potássio de 2,8 mEq/L; o ultrassom evidencia nefrocalcinose.' }
    ],
    debrief: {
      summary: 'Vômitos, poliúria, fraqueza (hipocalemia), déficit de crescimento e raquitismo resistente à vitamina D em lactente apontam acidose tubular renal. O distúrbio ácido-básico é uma acidose metabólica hiperclorêmica (ânion gap normal), por perda renal de bicarbonato. Na ATR distal (tipo 1) há hipocalemia e nefrocalcinose. O tratamento é a alcalinização (citrato/bicarbonato) com reposição de potássio — e o potássio deve ser corrigido antes/junto do bicarbonato, pois alcalinizar agrava a hipocalemia.',
      pearls: [
        'ATR = acidose metabólica hiperclorêmica (ânion gap normal).',
        'ATR distal: hipocalemia + nefrocalcinose + raquitismo.',
        'Corrija o potássio antes de alcalinizar — bicarbonato baixa o K⁺.'
      ],
      reference: 'Sociedade Brasileira de Pediatria / Nefrologia Pediátrica — Acidose Tubular Renal.'
    }
  },

  /* ── 3. TCE por queda ────────────────────────────────────── */
  {
    id: 'trauma-tce-queda',
    theme: 'trauma',
    difficulty: 2,
    setting: 'Pronto-socorro',
    diagnosis: 'Traumatismo cranioencefálico com indicação de neuroimagem e observação',
    acceptedDifferentials: ['TCE', 'Trauma cranioencefálico'],
    presentation: {
      vignette: 'Homem de 45 anos, encontrado inconsciente junto a uma escada e levado por familiares em carro próprio, sem atendimento pré-hospitalar. Tempo de inconsciência e história desconhecidos. Chega sem resposta ao comando verbal, respirando espontaneamente, com equimoses periorbitárias à direita e escoriações cervicais posteriores e em membros à direita.',
      vitals: 'PA 140/90 · pupilas isocóricas · respiração espontânea, FR normal'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 22,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Avaliação primária ABCDE com imobilização da coluna cervical e proteção da via aérea conforme o nível de consciência',
            quality: 'best',
            feedback: 'Trauma com rebaixamento e sinais cervicais: o paciente chegou sem imobilização, então proteger a coluna e a via aérea vem antes de qualquer exame.' },
          { text: 'Garantir via aérea e monitorização, com avaliação seriada da escala de Glasgow',
            quality: 'acceptable',
            feedback: 'A monitorização e o Glasgow seriado são corretos, mas falta explicitar a imobilização cervical — mandatória diante do mecanismo e das lesões.' },
          { text: 'Sentar o paciente e mobilizá-lo livremente, já que respira bem e está estável',
            quality: 'poor', dangerous: true,
            feedback: 'Mobilizar sem imobilização um politraumatizado com lesões cervicais pode converter uma lesão medular instável em déficit definitivo.' },
          { text: 'Aguardar o paciente melhorar espontaneamente antes de qualquer exame',
            quality: 'poor',
            feedback: 'Esperar em um TCE com rebaixamento flutuante desperdiça a janela de identificar lesão intracraniana com indicação de intervenção.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Como interpretar e o que solicitar?',
        options: [
          { text: 'TCE de alto risco (mecanismo, rebaixamento e amnésia) — solicitar TC de crânio, face e coluna cervical',
            quality: 'best',
            feedback: 'Queda com perda de consciência, Glasgow flutuante e amnésia do evento indicam neuroimagem; os sinais cervicais obrigam a avaliar a coluna por tomografia.' },
          { text: 'TCE — solicitar TC de crânio e avaliar a coluna cervical na sequência',
            quality: 'acceptable',
            feedback: 'A TC de crânio está indicada; a ressalva é não deixar a coluna cervical para depois, dado o mecanismo e as escoriações cervicais.' },
          { text: 'Provável síncope simples — apenas ECG e observação curta',
            quality: 'poor',
            feedback: 'Rebaixamento com trauma craniofacial e amnésia não é síncope simples; tratar assim ignora o risco de lesão intracraniana e cervical.' },
          { text: 'Solicitar radiografia de crânio para afastar fratura antes de decidir',
            quality: 'poor', redundant: true,
            feedback: 'A radiografia de crânio não avalia adequadamente lesão intracraniana — a TC é o exame indicado, e o RX só atrasa a conduta.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Conduta definitiva?',
        options: [
          { text: 'TC de crânio, face e coluna cervical + radiografia de membros; manter em observação (≥12 h) com Glasgow seriado',
            quality: 'best',
            feedback: 'Cobre o crânio, a face e a coluna por tomografia, avalia os membros lesionados e mantém observação seriada pelo risco de deterioração tardia.' },
          { text: 'Internar para observação com neuroimagem e reavaliação neurológica seriada',
            quality: 'acceptable',
            feedback: 'Observação com reavaliação é adequada; só falta detalhar a imagem da coluna cervical e dos membros no plano.' },
          { text: 'Após a TC, liberar para observação domiciliar, apesar do rebaixamento e da amnésia',
            quality: 'poor', dangerous: true,
            feedback: 'Alta domiciliar de um paciente que teve rebaixamento e amnésia, com mecanismo de alto risco, expõe a piora neurológica não monitorada.' },
          { text: 'Solicitar ressonância e angiografia de crânio de rotina antes de qualquer conduta',
            quality: 'poor', redundant: true,
            feedback: 'RM e angiografia de rotina não são o exame inicial no trauma agudo — apenas atrasam a avaliação, que começa pela TC.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Evolução na sala',
        body: 'Durante a avaliação o paciente abre os olhos e se movimenta, mas não responde a perguntas. Após 30 minutos passa a responder, referindo não se lembrar da queda (amnésia do evento). Chegou sem colar cervical.' },
      { kind: 'exam', title: 'Definição da conduta',
        body: 'Mecanismo de alto risco (queda de altura), rebaixamento transitório e amnésia; equimoses periorbitárias e lesões cervicais e de membros à direita. Coluna cervical ainda não liberada.' }
    ],
    debrief: {
      summary: 'No trauma, a sequência ABCDE com imobilização da coluna cervical precede qualquer exame — e este paciente chegou sem as medidas pré-hospitalares, aumentando o risco. Rebaixamento de consciência, amnésia do evento e mecanismo de alto risco indicam TC de crânio, e as lesões cervicais obrigam a TC de coluna cervical (não radiografia). A face lesionada motiva TC de face, e os membros, radiografia. Pela possibilidade de deterioração tardia, mantém-se observação com Glasgow seriado — não se dá alta domiciliar.',
      pearls: [
        'ABCDE + imobilização cervical vêm antes da imagem.',
        'Rebaixamento + amnésia + mecanismo de risco = TC (crânio/face/coluna), não RX.',
        'TCE com perda de consciência não recebe alta domiciliar precoce.'
      ],
      reference: 'ATLS — Advanced Trauma Life Support, 10ª edição, 2018.'
    }
  },

  /* ── 4. Endometriose ─────────────────────────────────────── */
  {
    id: 'go-endometriose',
    theme: 'go',
    difficulty: 1,
    setting: 'Consultório de ginecologia',
    diagnosis: 'Endometriose',
    acceptedDifferentials: ['Endometriose pélvica'],
    presentation: {
      vignette: 'Mulher de 30 anos com fadiga, dismenorreia progressiva e dispareunia de profundidade. Ao toque vaginal, útero de volume normal, em retroversoflexão, com dor à mobilização do colo.',
      vitals: 'Útero normal, retroversofletido · dor à mobilização do colo'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Anamnese dirigida à dor pélvica cíclica e solicitar ultrassonografia transvaginal',
            quality: 'best',
            feedback: 'A dor cíclica progressiva com dispareunia profunda orienta a hipótese; a ultrassonografia transvaginal é o primeiro exame de imagem para investigar endometriose.' },
          { text: 'Iniciar anti-inflamatório para a dismenorreia e programar a investigação',
            quality: 'acceptable',
            feedback: 'O AINE ajuda no controle da dor e é razoável, mas não substitui a investigação dirigida que confirma a hipótese e guia o tratamento.' },
          { text: 'Tratar empiricamente como doença inflamatória pélvica com antibiótico',
            quality: 'poor', redundant: true,
            feedback: 'Sem febre, corrimento ou dor aguda de DIP, antibiótico empírico é conduta na direção errada e apenas atrasa o diagnóstico correto.' },
          { text: 'Solicitar CA-125 e indicar laparoscopia diagnóstica imediatamente',
            quality: 'poor', redundant: true,
            feedback: 'CA-125 tem baixa acurácia para rastreio e a laparoscopia não é o primeiro passo — começa-se pela avaliação clínica e ultrassonográfica.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Qual a principal hipótese diagnóstica?',
        options: [
          { text: 'Endometriose — dor cíclica progressiva, dispareunia profunda e dor à mobilização do colo',
            quality: 'best',
            feedback: 'A tríade dismenorreia progressiva, dispareunia de profundidade e dor à mobilização do colo em útero de volume normal é clássica de endometriose.' },
          { text: 'Dor pélvica crônica de provável origem endometriótica — investigar e tratar',
            quality: 'acceptable',
            feedback: 'A direção está certa; falta apenas nomear a hipótese específica (endometriose), que orienta a terapêutica de primeira linha.' },
          { text: 'Doença inflamatória pélvica — iniciar antibioticoterapia',
            quality: 'poor',
            feedback: 'A ausência de sinais infecciosos agudos e o padrão cíclico tornam DIP improvável; antibiótico não trata a causa.' },
          { text: 'Miomatose uterina — programar miomectomia',
            quality: 'poor',
            feedback: 'O útero é de volume normal, sem massa palpável; a hipótese de mioma não explica a dor cíclica e a dispareunia profunda.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Conduta de primeira linha?',
        options: [
          { text: 'Terapia hormonal de primeira linha (contraceptivo combinado contínuo ou progestagênio) associada a AINE para a dor',
            quality: 'best',
            feedback: 'O tratamento inicial da endometriose é clínico: suprimir a menstruação com hormônio (combinado contínuo ou progestagênio) e controlar a dor, preservando a fertilidade.' },
          { text: 'Progestagênio isolado (ex.: dienogeste) para controle da dor',
            quality: 'acceptable',
            feedback: 'Também é primeira linha e eficaz — a diferença é apenas de opção terapêutica dentro da mesma estratégia hormonal.' },
          { text: 'Indicar histerectomia como primeira conduta para resolver a dor',
            quality: 'poor', dangerous: true,
            feedback: 'Cirurgia radical e irreversível em uma mulher de 30 anos, antes de qualquer tratamento clínico, é conduta desproporcional e compromete a fertilidade.' },
          { text: 'Solicitar laparoscopia diagnóstica antes de qualquer tratamento clínico',
            quality: 'poor', redundant: true,
            feedback: 'A laparoscopia fica reservada aos casos refratários ou para tratamento — não precede o tratamento clínico empírico de primeira linha.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Ultrassonografia transvaginal',
        body: 'Ultrassonografia transvaginal sem alterações significativas — achado que não afasta a hipótese, já que a imagem pode ser normal nas formas iniciais. O eixo da investigação segue clínico.' },
      { kind: 'evolution', title: 'Definição terapêutica',
        body: 'Definida a hipótese clínica, a paciente deseja controlar a dor e preservar a possibilidade de gestar no futuro.' }
    ],
    debrief: {
      summary: 'Endometriose é uma hipótese clínica sustentada por dismenorreia progressiva, dispareunia de profundidade e dor à mobilização do colo. A investigação inicial é clínica e por ultrassonografia transvaginal; a laparoscopia fica para casos refratários ou tratamento, não como primeiro passo. O tratamento de primeira linha é clínico — supressão hormonal (contraceptivo combinado contínuo ou progestagênio) associada a AINE — com preservação da fertilidade. Cirurgia radical não é conduta inicial.',
      pearls: [
        'Dismenorreia progressiva + dispareunia profunda + dor à mobilização do colo = endometriose.',
        'Primeira linha é clínica: hormônio supressor + AINE.',
        'Laparoscopia e cirurgia radical não são o primeiro passo.'
      ],
      reference: 'FEBRASGO — Endometriose; ESHRE Endometriosis Guideline, 2022.'
    }
  },

  /* ── 5. Pós-IAM — prevenção secundária ───────────────────── */
  {
    id: 'cardio-pos-iam-prevencao',
    theme: 'cardio',
    difficulty: 2,
    setting: 'Ambulatório de cardiologia',
    diagnosis: 'Cardiopatia isquêmica pós-IAM — prevenção secundária',
    acceptedDifferentials: ['Doença arterial coronariana', 'Pós-infarto do miocárdio'],
    presentation: {
      vignette: 'Homem de 56 anos, com cardiopatia isquêmica e infarto agudo do miocárdio há 3 meses, encaminhado para conduta preventiva. Tem indicação de antiagregação, mas história de úlcera péptica e reação alérgica ao clopidogrel e à ticlopidina.',
      vitals: 'IAM há 3 meses · úlcera péptica prévia · alergia a clopidogrel e ticlopidina'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Manter AAS em dose baixa associado a inibidor de bomba de prótons para proteção gástrica',
            quality: 'best',
            feedback: 'O AAS é a base da prevenção secundária pós-IAM; a história de úlcera não o contraindica — associa-se um IBP para proteger a mucosa.' },
          { text: 'Manter o AAS e otimizar a prevenção secundária global (estatina, IECA, betabloqueador)',
            quality: 'acceptable',
            feedback: 'Otimizar a prevenção é correto e desejável, mas a decisão imediata sobre a antiagregação e a proteção gástrica precisa ser resolvida primeiro.' },
          { text: 'Reintroduzir clopidogrel em dose reduzida, apesar do relato de alergia',
            quality: 'poor', dangerous: true,
            feedback: 'Reexpor a um fármaco ao qual o paciente é alérgico é conduta perigosa — reduzir a dose não previne reação de hipersensibilidade.' },
          { text: 'Suspender toda a antiagregação pelo risco de sangramento da úlcera',
            quality: 'poor',
            feedback: 'Suspender a antiagregação poucos meses após um IAM eleva muito o risco de novo evento coronariano — a proteção gástrica com IBP resolve o dilema sem retirar o AAS.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Como completar a antiagregação, considerando a alergia?',
        options: [
          { text: 'Associar ticagrelor (não é tienopiridínico) ao AAS, com IBP',
            quality: 'best',
            feedback: 'A alergia é aos tienopiridínicos (clopidogrel, ticlopidina). O ticagrelor tem outra classe química e permite completar a dupla antiagregação com segurança.' },
          { text: 'Manter AAS isolado com IBP e reavaliar o segundo antiagregante conforme o risco de sangramento',
            quality: 'acceptable',
            feedback: 'Em alto risco hemorrágico, AAS isolado pode ser aceitável; mas, sem contraindicação, completar a dupla antiagregação com ticagrelor é preferível no período pós-IAM.' },
          { text: 'Usar prasugrel no lugar do clopidogrel',
            quality: 'poor', dangerous: true,
            feedback: 'O prasugrel também é um tienopiridínico — mesma classe do fármaco que causou a alergia, com risco de reação cruzada.' },
          { text: 'Substituir a antiagregação por anticoagulação oral',
            quality: 'poor',
            feedback: 'Anticoagulação não substitui a antiagregação na prevenção da trombose de placa/stent pós-IAM e ainda aumenta o risco de sangramento da úlcera.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Conduta de prevenção secundária completa?',
        options: [
          { text: 'AAS + ticagrelor + IBP, estatina de alta intensidade, IECA e betabloqueador, com mudança de estilo de vida',
            quality: 'best',
            feedback: 'A prevenção secundária pós-IAM combina dupla antiagregação (aqui com ticagrelor), estatina de alta intensidade, IECA e betabloqueador, além do controle de fatores de risco.' },
          { text: 'AAS + ticagrelor + estatina, agendando a otimização dos demais fármacos',
            quality: 'acceptable',
            feedback: 'Cobre o essencial da antiagregação e da estatina; só falta garantir IECA e betabloqueador, que também compõem a prevenção pós-IAM.' },
          { text: 'Apenas estatina e controle de fatores de risco, sem antiagregação',
            quality: 'poor',
            feedback: 'Retirar a antiagregação da prevenção secundária pós-IAM deixa o paciente desprotegido contra novos eventos trombóticos.' },
          { text: 'Solicitar nova cinecoronariografia de rotina antes de definir a prevenção',
            quality: 'poor', redundant: true,
            feedback: 'Sem sintomas ou isquemia demonstrada, repetir a cinecoronariografia de rotina não muda a prevenção secundária e só a atrasa.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Revisando a prevenção pós-IAM',
        body: 'Após um IAM, a dupla antiagregação costuma ser mantida por cerca de 12 meses. A alergia é aos tienopiridínicos (clopidogrel e ticlopidina); a úlcera péptica é manejável com inibidor de bomba de prótons.' },
      { kind: 'evolution', title: 'Nível de atenção e prevenção',
        body: 'O paciente é assistido pelo cardiologista na atenção secundária. Como já sofreu o infarto, a conduta é de prevenção secundária — evitar novos eventos na doença já estabelecida.' }
    ],
    debrief: {
      summary: 'A prevenção secundária pós-IAM se apoia em dupla antiagregação (habitualmente por ~12 meses), estatina de alta intensidade, IECA e betabloqueador, além de mudança de estilo de vida. A história de úlcera péptica não contraindica o AAS — associa-se um inibidor de bomba de prótons. Como a alergia é aos tienopiridínicos (clopidogrel e ticlopidina), o segundo antiagregante deve ser de outra classe: o ticagrelor. Reexpor a clopidogrel ou usar prasugrel (mesma classe) são condutas perigosas. O atendimento pelo cardiologista ocorre na atenção secundária, e a prevenção, por se tratar de doença já estabelecida, é secundária.',
      pearls: [
        'Úlcera prévia não proíbe AAS — associe IBP.',
        'Alergia a tienopiridínicos: troque por ticagrelor (classe diferente); evite prasugrel.',
        'Pós-IAM = prevenção secundária; o especialista atua na atenção secundária.'
      ],
      reference: 'SBC — Diretrizes de Doença Arterial Coronariana e Síndromes Coronarianas; ESC ACS Guidelines, 2023.'
    }
  },

  /* ── 6. Distonia aguda por antipsicótico ─────────────────── */
  {
    id: 'psiq-distonia-aguda',
    theme: 'psiq',
    difficulty: 1,
    setting: 'UPA',
    diagnosis: 'Distonia aguda induzida por antipsicótico',
    acceptedDifferentials: ['Reação distônica aguda', 'Reação extrapiramidal aguda'],
    presentation: {
      vignette: 'Homem de 20 anos, com esquizofrenia, chega à UPA com a família, que relata que ele acordou "torto". Há 5 dias, a risperidona foi trocada por haloperidol por falta na farmácia. Nega outras queixas. Ao exame, contratura da região cervical e fácies de dor.',
      vitals: 'Contratura cervical (torcicolo) · fácies de dor · sem outras queixas'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 22,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Reconhecer reação distônica aguda ao antipsicótico e avaliar a via aérea e a deglutição',
            quality: 'best',
            feedback: 'A contratura cervical dias após troca por um antipsicótico de alta potência é uma distonia aguda; checar via aérea afasta a temida distonia laríngea.' },
          { text: 'Monitorizar e avaliar sinais vitais e nível de consciência',
            quality: 'acceptable',
            feedback: 'A avaliação geral é sempre válida, mas sem reconhecer a distonia aguda como o problema central, a conduta específica se atrasa.' },
          { text: 'Atribuir o quadro à esquizofrenia e aumentar a dose do antipsicótico',
            quality: 'poor', dangerous: true,
            feedback: 'Aumentar o antipsicótico agrava a distonia, que é justamente um efeito extrapiramidal do fármaco — pode evoluir para distonia laríngea.' },
          { text: 'Solicitar tomografia de crânio e punção lombar de urgência antes de qualquer conduta',
            quality: 'poor', redundant: true,
            feedback: 'O quadro é típico e temporalmente ligado ao haloperidol; investigação neurológica invasiva de rotina só atrasa o alívio do paciente.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 22,
        prompt: 'Qual a hipótese diagnóstica mais provável?',
        options: [
          { text: 'Distonia aguda induzida por antipsicótico (reação extrapiramidal precoce)',
            quality: 'best',
            feedback: 'Início poucos dias após a troca por haloperidol, com torcicolo e contratura — o padrão clássico da distonia aguda por bloqueadores dopaminérgicos.' },
          { text: 'Reação extrapiramidal aguda ao haloperidol',
            quality: 'acceptable',
            feedback: 'Correto de forma genérica; nomear especificamente a distonia aguda direciona melhor a conduta (anticolinérgico).' },
          { text: 'Discinesia tardia',
            quality: 'poor',
            feedback: 'A discinesia tardia surge após uso prolongado (meses a anos) e é hipercinética — não corresponde a um quadro agudo dias após a troca.' },
          { text: 'Acatisia',
            quality: 'poor',
            feedback: 'A acatisia é a inquietação motora com necessidade de se mover, não a contratura muscular sustentada descrita aqui.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 22,
        prompt: 'Conduta mais adequada?',
        options: [
          { text: 'Anticolinérgico (biperideno) intramuscular e ajuste/suspensão do antipsicótico desencadeante',
            quality: 'best',
            feedback: 'O anticolinérgico (biperideno) reverte rapidamente a distonia aguda; revisar o antipsicótico previne recorrência.' },
          { text: 'Anti-histamínico (prometazina) intramuscular como alternativa',
            quality: 'acceptable',
            feedback: 'A prometazina/difenidramina é alternativa válida pela ação anticolinérgica, embora o biperideno seja a escolha mais específica.' },
          { text: 'Administrar nova dose de haloperidol intramuscular',
            quality: 'poor', dangerous: true,
            feedback: 'Dar mais haloperidol intensifica o bloqueio dopaminérgico e piora a distonia — é o oposto do tratamento.' },
          { text: 'Diazepam isolado como primeira linha para a distonia aguda',
            quality: 'poor',
            feedback: 'O benzodiazepínico é adjuvante; a primeira linha da distonia aguda é o anticolinérgico, não o diazepam isolado.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Exame dirigido',
        body: 'Além do torcicolo, nota-se desvio tônico do olhar para cima em alguns momentos. Sem febre, sem rigidez generalizada e sem rebaixamento do nível de consciência. O quadro começou poucos dias após a troca para o haloperidol.' },
      { kind: 'evolution', title: 'Avaliação na sala',
        body: 'O paciente segue desconfortável, com a contratura cervical mantida, mas sem comprometimento respiratório no momento.' }
    ],
    debrief: {
      summary: 'A distonia aguda é um efeito extrapiramidal precoce dos antagonistas dopaminérgicos, mais frequente com antipsicóticos de alta potência (como o haloperidol) e nos primeiros dias de uso. Manifesta-se por contrações musculares sustentadas — torcicolo, crise oculógira, trismo — e a distonia laríngea é uma emergência de via aérea. O tratamento é um anticolinérgico intramuscular (biperideno), tendo o anti-histamínico (prometazina) como alternativa; deve-se revisar o antipsicótico. Não confundir com discinesia tardia (tardia, hipercinética) nem com acatisia (inquietação motora).',
      pearls: [
        'Distonia aguda: dias após antipsicótico de alta potência (haloperidol).',
        'Tratamento é anticolinérgico IM (biperideno); prometazina é alternativa.',
        'Nunca dar mais antipsicótico — atenção à distonia laríngea (via aérea).'
      ],
      reference: 'Associação Brasileira de Psiquiatria — Emergências Psiquiátricas; manejo de efeitos extrapiramidais.'
    }
  },

  /* ── 7. Artrite reumatoide ───────────────────────────────── */
  {
    id: 'reumato-artrite-reumatoide',
    theme: 'reumato',
    difficulty: 2,
    setting: 'Ambulatório de clínica médica',
    diagnosis: 'Artrite reumatoide',
    acceptedDifferentials: ['Artrite reumatoide', 'Poliartrite reumatoide'],
    presentation: {
      vignette: 'Mulher de 20 anos com quadro de 3 meses de dor e edema articular simétricos em mãos (interfalangeanas proximais, metacarpofalangeanas e punhos), cotovelos, joelhos e tornozelos, com rigidez matinal por mais de 2 horas. Ao exame, artrite nas articulações descritas e mucosas hipocoradas.',
      vitals: 'Poliartrite simétrica · rigidez matinal > 2 h · mucosas hipocoradas (++/4+)'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Investigar artrite inflamatória: fator reumatoide, anti-CCP, VHS/PCR, hemograma e função hepática e renal',
            quality: 'best',
            feedback: 'Poliartrite simétrica com rigidez matinal prolongada pede confirmação sorológica e provas inflamatórias — e os exames pré-DMARD já preparam o tratamento.' },
          { text: 'Iniciar anti-inflamatório para a dor e solicitar as provas inflamatórias',
            quality: 'acceptable',
            feedback: 'O AINE alivia os sintomas e a investigação está correta, mas o AINE isolado não modifica a doença — o passo que muda o prognóstico é o DMARD.' },
          { text: 'Tratar como artrite viral autolimitada e prescrever apenas sintomáticos, sem investigar',
            quality: 'poor',
            feedback: 'Um quadro simétrico e persistente por 3 meses com rigidez matinal prolongada não é viral autolimitado — não investigar retarda o diagnóstico.' },
          { text: 'Iniciar corticoide sistêmico em dose alta e por tempo prolongado como tratamento definitivo',
            quality: 'poor', dangerous: true,
            feedback: 'Corticoide em dose alta e prolongada não é tratamento definitivo e acumula efeitos adversos graves — não substitui o DMARD, que é a base do tratamento.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Hipótese e achado laboratorial esperado?',
        options: [
          { text: 'Artrite reumatoide; fator reumatoide (e anti-CCP) positivo',
            quality: 'best',
            feedback: 'Poliartrite simétrica de pequenas e grandes articulações com rigidez matinal > 1 h por semanas é o padrão da AR; o FR (e o anti-CCP, mais específico) tende a ser positivo.' },
          { text: 'Artrite inflamatória crônica, provável AR — confirmar com anti-CCP e FR',
            quality: 'acceptable',
            feedback: 'A direção está certa; nomear a AR e o achado sorológico esperado torna a interpretação mais precisa.' },
          { text: 'Lúpus eritematoso sistêmico — solicitar apenas FAN',
            quality: 'poor',
            feedback: 'Sem manifestações sistêmicas típicas de lúpus, a poliartrite simétrica erosiva aponta mais para AR; reduzir a investigação ao FAN é insuficiente.' },
          { text: 'Osteoartrite — conduta conservadora',
            quality: 'poor',
            feedback: 'A rigidez matinal prolongada e o padrão inflamatório simétrico em uma jovem não correspondem à osteoartrite.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Primeira linha de tratamento?',
        options: [
          { text: 'Metotrexato (DMARD) com ácido fólico, podendo usar corticoide em ponte de baixa dose por curto período',
            quality: 'best',
            feedback: 'O metotrexato é o DMARD de primeira linha na AR; iniciar cedo (janela de oportunidade) evita dano articular, e um corticoide em ponte controla os sintomas até a ação do DMARD.' },
          { text: 'Iniciar o DMARD (metotrexato) e coordenar o seguimento reumatológico',
            quality: 'acceptable',
            feedback: 'Iniciar o metotrexato e encaminhar é adequado; a ressalva é apenas detalhar o ácido fólico e a estratégia de ponte.' },
          { text: 'Manter apenas AINE e corticoide crônico, adiando o DMARD',
            quality: 'poor', dangerous: true,
            feedback: 'Postergar o DMARD e manter corticoide crônico deixa a doença progredir com dano articular irreversível e expõe aos efeitos do corticoide.' },
          { text: 'Solicitar ressonância de todas as articulações antes de iniciar o tratamento',
            quality: 'poor', redundant: true,
            feedback: 'Imagem extensa de rotina não deve atrasar o início do DMARD — o tratamento precoce é o que muda o desfecho.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Padrão do quadro',
        body: 'Poliartrite simétrica de pequenas e grandes articulações por mais de 6 semanas, com rigidez matinal prolongada e anemia (mucosas hipocoradas) — um padrão inflamatório crônico.' },
      { kind: 'exam', title: 'Resultados laboratoriais',
        body: 'Fator reumatoide e anti-CCP positivos, VHS e PCR elevados, sem contraindicações ao início de um DMARD.' }
    ],
    debrief: {
      summary: 'Poliartrite simétrica de pequenas e grandes articulações, com rigidez matinal prolongada por mais de 6 semanas, é o quadro típico da artrite reumatoide. O achado laboratorial esperado é o fator reumatoide positivo — o anti-CCP acrescenta especificidade. O tratamento de primeira linha é o metotrexato, um DMARD sintético, iniciado precocemente (a "janela de oportunidade") para prevenir dano articular; um corticoide em ponte de baixa dose alivia sintomas até a ação do DMARD. Manter apenas AINE/corticoide e adiar o DMARD compromete o prognóstico.',
      pearls: [
        'Poliartrite simétrica + rigidez matinal > 1 h por semanas = artrite reumatoide.',
        'FR positivo (anti-CCP mais específico) é o achado esperado.',
        'Primeira linha é metotrexato precoce — não adie o DMARD.'
      ],
      reference: 'Sociedade Brasileira de Reumatologia — Artrite Reumatoide; EULAR RA Recommendations, 2023.'
    }
  },

  /* ── 8. Choque séptico (neutropenia febril) ──────────────── */
  {
    id: 'infecto-choque-septico-neutropenico',
    theme: 'infecto',
    difficulty: 3,
    setting: 'Hospital terciário',
    diagnosis: 'Choque séptico (neutropenia febril)',
    acceptedDifferentials: ['Choque séptico', 'Sepse com disfunção cardiovascular'],
    presentation: {
      vignette: 'Criança de 7 anos, na 4ª semana de quimioterapia para leucemia linfocítica aguda, admitida com febre há 12 horas (39 °C), tosse e dispneia. Após 24 h, segue febril apesar da dipirona. Pálida, orientada, com murmúrio vesicular diminuído e crepitações em base direita e hepatoesplenomegalia.',
      vitals: 'FC 130 · FR 36 · PA 90/60 · Tax 39 °C · lactato aumentado, acidose metabólica'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 22,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Tratar como neutropenia febril/sepse: coletar culturas sem atrasar e iniciar antibiótico de amplo espectro na 1ª hora, com acesso e reanimação volêmica',
            quality: 'best',
            feedback: 'Febre em paciente quimioterápico é neutropenia febril até prova em contrário — o antibiótico de amplo espectro na primeira hora e o suporte hemodinâmico salvam vidas.' },
          { text: 'Coletar culturas, iniciar antibiótico e monitorizar',
            quality: 'acceptable',
            feedback: 'A antibioticoterapia precoce está certa; falta enfatizar a reanimação volêmica imediata diante dos sinais de hipoperfusão.' },
          { text: 'Aguardar o resultado das culturas e da radiografia antes de iniciar o antibiótico',
            quality: 'poor', dangerous: true,
            feedback: 'Esperar exames para antibiotizar uma neutropenia febril com sinais de choque atrasa o tratamento que determina a sobrevida — o antibiótico não espera.' },
          { text: 'Apenas antitérmico e observação, atribuindo a febre à quimioterapia',
            quality: 'poor',
            feedback: 'Atribuir a febre à quimioterapia e apenas observar ignora uma emergência infecciosa em paciente imunossuprimido com sinais de choque.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 22,
        prompt: 'Qual o diagnóstico?',
        options: [
          { text: 'Choque séptico — sepse com disfunção cardiovascular (hipotensão e hipoperfusão, com lactato elevado)',
            quality: 'best',
            feedback: 'Infecção com disfunção orgânica e sinais de hipoperfusão (hipotensão para a idade, lactato aumentado e acidose) caracteriza choque séptico, não apenas sepse.' },
          { text: 'Sepse evoluindo para choque — manter a ressuscitação',
            quality: 'acceptable',
            feedback: 'A leitura de gravidade está certa; o dado que define o choque séptico é a disfunção cardiovascular com hipoperfusão já presente.' },
          { text: 'Síndrome da resposta inflamatória sistêmica sem infecção definida — apenas observar',
            quality: 'poor',
            feedback: 'Há foco infeccioso e disfunção orgânica com hipoperfusão — chamar de SIRS sem infecção e observar subestima um choque séptico.' },
          { text: 'Pneumonia comunitária simples — antibiótico oral e alta',
            quality: 'poor',
            feedback: 'Em paciente neutropênico com hipotensão, lactato e acidose, tratar como pneumonia simples com alta é perigoso — trata-se de choque séptico.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Conduta definitiva?',
        options: [
          { text: 'Antibiótico antipseudomonas de amplo espectro na 1ª hora, ressuscitação volêmica com bólus reavaliados, lactato seriado e UTI; vasoativo se choque refratário a volume',
            quality: 'best',
            feedback: 'O pacote do choque séptico pediátrico: antibiótico precoce, expansão com bólus reavaliados, controle do lactato e vasoativo (adrenalina/noradrenalina) se refratário a volume.' },
          { text: 'Manter antibiótico e volume e transferir para a UTI para monitorização',
            quality: 'acceptable',
            feedback: 'A internação em UTI é adequada; só falta explicitar a reavaliação da resposta ao volume e a introdução de vasoativo se necessário.' },
          { text: 'Expandir com grandes volumes de forma agressiva e ilimitada, sem reavaliar sinais de sobrecarga',
            quality: 'poor', dangerous: true,
            feedback: 'Na sepse pediátrica, a expansão é feita em bólus reavaliados — volume ilimitado sem checar sobrecarga (hepatomegalia, estertores) pode precipitar edema pulmonar.' },
          { text: 'Aguardar tomografia de tórax e mielograma antes de escalonar o tratamento',
            quality: 'poor', redundant: true,
            feedback: 'Exames complementares não devem atrasar o antibiótico e a ressuscitação em um choque séptico — o tempo é crítico.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Sinais de gravidade',
        body: 'Lactato elevado, acidose metabólica, hipotensão para a idade (90/60), taquicardia e taquipneia, com foco pulmonar à direita — sinais de hipoperfusão apesar do estado geral relativamente preservado.' },
      { kind: 'evolution', title: 'Ressuscitação em curso',
        body: 'Iniciada expansão volêmica com bólus reavaliados e antibiótico de amplo espectro antipseudomonas na primeira hora. Considera-se suporte em UTI e vasoativo caso o choque não responda ao volume.' }
    ],
    debrief: {
      summary: 'Febre em criança em quimioterapia é neutropenia febril, uma emergência que exige culturas sem atraso e antibiótico de amplo espectro (antipseudomonas) na primeira hora. Quando há disfunção cardiovascular com hipoperfusão — hipotensão para a idade, lactato elevado e acidose — o diagnóstico é choque séptico, e não apenas sepse ou SIRS. A ressuscitação volêmica é feita em bólus reavaliados (evitando sobrecarga, sobretudo com hepatomegalia/estertores), com lactato seriado e vasoativo (adrenalina/noradrenalina) se o choque for refratário ao volume, em ambiente de UTI.',
      pearls: [
        'Febre em quimioterapia = neutropenia febril: antibiótico de amplo espectro na 1ª hora.',
        'Sepse + disfunção cardiovascular/hipoperfusão = choque séptico.',
        'Volume em bólus reavaliados — cuidado com sobrecarga na sepse pediátrica.'
      ],
      reference: 'Surviving Sepsis Campaign — Pediatric, 2020; IDSA — Neutropenia Febril.'
    }
  }

];

/* Fila editorial explícita: a ordem dos dias. Ids ainda não
   escritos são ignorados até o caso existir em DAILY_CASES. */
var DAILY_QUEUE = [
  'cardio-icfer-gdmt',
  'ped-atr-lactente',
  'trauma-tce-queda',
  'go-endometriose',
  'cardio-pos-iam-prevencao',
  'psiq-distonia-aguda',
  'reumato-artrite-reumatoide',
  'infecto-choque-septico-neutropenico'
];

function getCaseById(id) {
  for (var i = 0; i < DAILY_CASES.length; i++) {
    if (DAILY_CASES[i].id === id) return DAILY_CASES[i];
  }
  return null;
}

/* Fila efetiva = só os casos já escritos, na ordem editorial. */
function activeQueue() {
  return DAILY_QUEUE.filter(function (id) { return !!getCaseById(id); });
}

window.THEMES = THEMES;
window.DAILY_CASES = DAILY_CASES;
window.DAILY_QUEUE = DAILY_QUEUE;
window.getCaseById = getCaseById;
window.activeQueue = activeQueue;
