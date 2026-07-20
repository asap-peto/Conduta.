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
  reumato: { icon: '🦴', label: 'Reumatologia' },
  geriatria: { icon: '🧓', label: 'Geriatria' }
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
        prompt: 'Como você interpreta a gasometria?',
        options: [
          { text: 'Acidose metabólica hiperclorêmica, com ânion gap normal.',
            quality: 'best',
            feedback: 'pH e bicarbonato baixos, cloro alto e ânion gap calculado normal — o padrão que a perda tubular de bicarbonato produz.' },
          { text: 'Acidose metabólica que já posso corrigir com álcali e potássio.',
            quality: 'acceptable',
            feedback: 'A direção terapêutica está certa, mas falta caracterizar o padrão: é uma acidose hiperclorêmica de ânion gap normal — e é isso que orienta a investigação.' },
          { text: 'Acidose de ânion gap elevado, provavelmente por lactato ou sepse.',
            quality: 'poor',
            feedback: 'O ânion gap calculado aqui é normal (cloro alto). Lê-lo como gap elevado joga a investigação na direção errada.' },
          { text: 'Alteração inespecífica da desidratação; basta reidratar e reavaliar.',
            quality: 'poor',
            feedback: 'Acidose com cloro alto e potássio baixo aponta doença tubular — o distúrbio não desaparece só com hidratação.' }
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
        prompt: 'O ultrassom veio sem alterações. O que isso muda?',
        options: [
          { text: 'Ultrassom normal não afasta a hipótese; mantenho a conduta guiada pela clínica.',
            quality: 'best',
            feedback: 'A imagem pode ser normal, sobretudo nas formas iniciais e sem endometrioma. A hipótese é clínica — um exame negativo não a derruba.' },
          { text: 'Solicito ressonância pélvica antes de definir qualquer tratamento.',
            quality: 'acceptable',
            feedback: 'A RM ajuda a mapear doença profunda em casos selecionados, mas não é obrigatória para iniciar o tratamento — o exame normal já não muda a hipótese.' },
          { text: 'O exame normal torna o quadro improvável; reconsidero dor de origem funcional.',
            quality: 'poor',
            feedback: 'Abandonar a hipótese por um ultrassom negativo é o erro clássico aqui — a imagem normal não exclui a doença.' },
          { text: 'Peço CA-125 para confirmar o diagnóstico antes de conduzir.',
            quality: 'poor', redundant: true,
            feedback: 'O CA-125 tem baixa acurácia e não confirma nem exclui o quadro; não muda a conduta e só atrasa.' }
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
        prompt: 'A ausência de febre e de rigidez generalizada afasta principalmente o quê?',
        options: [
          { text: 'Síndrome neuroléptica maligna — sem febre alta, rigidez difusa e disautonomia, fica improvável.',
            quality: 'best',
            feedback: 'A SNM é o diferencial que mata: febre alta, rigidez em cano de chumbo e instabilidade autonômica a caracterizam — todas ausentes aqui.' },
          { text: 'Uma reação grave ao antipsicótico, o que tranquiliza quanto ao risco imediato.',
            quality: 'acceptable',
            feedback: 'Certo em afastar gravidade sistêmica, mas o ponto-chave é nomear que os achados descartam a síndrome neuroléptica maligna.' },
          { text: 'Uma crise convulsiva focal — solicitar EEG de urgência.',
            quality: 'poor',
            feedback: 'Contratura sustentada com consciência preservada não é crise convulsiva; EEG de rotina só atrasa o alívio.' },
          { text: 'Tétano — iniciar imunoglobulina e isolamento sensorial.',
            quality: 'poor',
            feedback: 'Sem porta de entrada nem trismo/disfagia progressivos, e com relação temporal ao haloperidol, o tétano é improvável.' }
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
        prompt: 'O padrão é inflamatório crônico. Qual achado sorológico você espera para confirmar?',
        options: [
          { text: 'Fator reumatoide e anti-CCP positivos — o anti-CCP com maior especificidade',
            quality: 'best',
            feedback: 'No padrão simétrico e erosivo com rigidez matinal prolongada, o FR tende a ser positivo e o anti-CCP acrescenta especificidade e valor prognóstico.' },
          { text: 'VHS e PCR elevados, ainda inespecíficos — associar FR e anti-CCP para confirmar',
            quality: 'acceptable',
            feedback: 'As provas inflamatórias sustentam a atividade da doença, mas são inespecíficas; a confirmação vem da sorologia (FR e anti-CCP).' },
          { text: 'FAN positivo como o achado que confirma o quadro',
            quality: 'poor',
            feedback: 'O FAN aponta para colagenoses como o lúpus; sem manifestações sistêmicas típicas, ancorar a confirmação no FAN desvia da hipótese mais provável.' },
          { text: 'Fator reumatoide negativo praticamente exclui o diagnóstico',
            quality: 'poor',
            feedback: 'Existe artrite reumatoide soronegativa — um FR negativo não afasta a doença quando o quadro clínico é típico.' }
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
        prompt: 'Os sinais de gravidade mudam a urgência. Como você os lê?',
        options: [
          { text: 'Há hipoperfusão — trato com urgência de choque, sem esperar novos exames.',
            quality: 'best',
            feedback: 'Hipotensão para a idade, lactato elevado e acidose são hipoperfusão: a resposta é reanimação imediata e escalonamento, não observação.' },
          { text: 'Quadro grave que exige manter a ressuscitação e reavaliar de perto.',
            quality: 'acceptable',
            feedback: 'A leitura de gravidade está certa; o ponto é reconhecer que já há disfunção cardiovascular e agir com a urgência de um choque.' },
          { text: 'Ainda é possível aguardar culturas e imagem antes de escalonar.',
            quality: 'poor',
            feedback: 'Esperar exames diante de hipoperfusão atrasa o que decide o desfecho — aqui o tempo é crítico.' },
          { text: 'Provável reação febril da própria quimioterapia; manter observação.',
            quality: 'poor',
            feedback: 'Hipotensão, lactato e acidose em paciente imunossuprimido não são "reação da quimio" — subestimar isso é o erro grave.' }
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
  },

  /* ── 9. Doença de Parkinson — tratamento inicial ─────────── */
  {
    id: 'neuro-parkinson-inicial',
    theme: 'neuro',
    difficulty: 2,
    setting: 'Ambulatório de neurologia',
    diagnosis: 'Doença de Parkinson',
    acceptedDifferentials: ['Doença de Parkinson', 'Parkinsonismo idiopático'],
    presentation: {
      vignette: 'Mulher de 65 anos com lentidão dos movimentos há 6 meses — dificuldade para abotoar roupas, amarrar sapatos e digitar. Anda em passos curtos, com instabilidade e um episódio de queda. Associadamente, tem tremor de repouso nas mãos, rigidez e alteração do sono. Nega alterações de memória ou cognição. Ao exame, fácies em máscara, marcha em pequenos passos, tremor assimétrico e hipertonia em roda dentada.',
      vitals: 'FC 88 · PA 130/80 · tremor de repouso assimétrico · rigidez em roda dentada'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Reconhecer o parkinsonismo clinicamente e revisar fármacos que possam causá-lo (neurolépticos, metoclopramida) antes de firmar doença de Parkinson',
            quality: 'best',
            feedback: 'O diagnóstico é clínico: a tríade tremor de repouso + rigidez + bradicinesia, assimétrica, define o parkinsonismo. Antes de rotular como doença de Parkinson, é essencial excluir causa medicamentosa.' },
          { text: 'Solicitar ressonância de crânio para afastar causas estruturais',
            quality: 'acceptable',
            feedback: 'A neuroimagem ajuda a afastar parkinsonismo secundário/atípico, mas não confirma a doença de Parkinson — que é diagnóstico clínico. É um apoio, não o passo definidor.' },
          { text: 'Iniciar haloperidol para controlar o tremor',
            quality: 'poor', dangerous: true,
            feedback: 'Antipsicóticos típicos bloqueiam a dopamina e agravam o parkinsonismo — dar haloperidol aqui piora diretamente o quadro.' },
          { text: 'Atribuir os sintomas ao envelhecimento e apenas observar',
            quality: 'poor',
            feedback: 'Tremor de repouso, rigidez em roda dentada e bradicinesia não são do envelhecimento normal — observar sem conduzir retarda um tratamento que melhora muito a funcionalidade.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'A RM é normal e não há sinais atípicos. O que isso indica?',
        options: [
          { text: 'Parkinsonismo primário — a boa resposta esperada à levodopa reforça o diagnóstico',
            quality: 'best',
            feedback: 'RM sem lesões estruturais e ausência de sinais de alarme (disautonomia precoce grave, oftalmoparesia, ataxia) apontam parkinsonismo primário; a resposta à levodopa é confirmatória.' },
          { text: 'Parkinsonismo provavelmente primário — a resposta ao tratamento vai confirmar',
            quality: 'acceptable',
            feedback: 'A direção está certa; falta apenas explicitar que a resposta à levodopa é o teste que sela o diagnóstico.' },
          { text: 'Parkinsonismo secundário a lesão estrutural, apesar da RM normal',
            quality: 'poor',
            feedback: 'Uma RM normal fala contra causa estrutural — insistir em lesão sem substrato de imagem não se sustenta.' },
          { text: 'Doença de Alzheimer, dado o quadro motor',
            quality: 'poor',
            feedback: 'O quadro é motor e a paciente nega declínio cognitivo; Alzheimer é uma demência, não explica tremor de repouso e rigidez.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Tratamento medicamentoso inicial recomendado?',
        options: [
          { text: 'Levodopa associada a carbidopa',
            quality: 'best',
            feedback: 'A levodopa (com carbidopa para reduzir efeitos periféricos) é o tratamento sintomático mais eficaz da doença de Parkinson e a melhor escolha em pacientes idosos com sintomas incapacitantes.' },
          { text: 'Agonista dopaminérgico (ex.: pramipexol) como alternativa inicial',
            quality: 'acceptable',
            feedback: 'Agonistas dopaminérgicos são uma alternativa inicial válida, sobretudo em pacientes mais jovens; aos 65 anos, com incapacidade funcional, a levodopa costuma ser preferida.' },
          { text: 'Donepezila e memantina',
            quality: 'poor',
            feedback: 'São fármacos para a doença de Alzheimer — não tratam os sintomas motores do parkinsonismo.' },
          { text: 'Propranolol e amantadina',
            quality: 'poor',
            feedback: 'O propranolol trata tremor essencial, não o de repouso; a amantadina tem efeito modesto e não é o tratamento inicial de escolha.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Avaliação clínica',
        body: 'O exame confirma tremor de repouso assimétrico, rigidez em roda dentada, bradicinesia e instabilidade postural, sem sinais de alarme para parkinsonismo atípico. A ressonância não mostra lesões estruturais (atrofia compatível com a idade).' },
      { kind: 'evolution', title: 'Definição terapêutica',
        body: 'Firmado o diagnóstico de doença de Parkinson idiopática. Os sintomas já limitam atividades diárias (abotoar, digitar) e houve queda — indica-se iniciar tratamento sintomático.' }
    ],
    debrief: {
      summary: 'A doença de Parkinson é diagnóstico clínico: bradicinesia associada a tremor de repouso e/ou rigidez, de início assimétrico e insidioso. Antes de rotular, exclua parkinsonismo secundário — sobretudo o medicamentoso (neurolépticos, metoclopramida) — e sinais de parkinsonismo atípico. A neuroimagem afasta causas estruturais, mas não confirma a doença; a resposta à levodopa é confirmatória. O tratamento sintomático mais eficaz é a levodopa/carbidopa, preferida em idosos com incapacidade; agonistas dopaminérgicos são alternativa inicial em selecionados. Evite antipsicóticos típicos, que bloqueiam a dopamina e agravam o quadro.',
      pearls: [
        'Parkinson é clínico: bradicinesia + tremor de repouso/rigidez, assimétrico.',
        'Sempre exclua parkinsonismo medicamentoso (neurolépticos, metoclopramida).',
        'Levodopa/carbidopa é o mais eficaz — preferida em idosos incapacitados.'
      ],
      reference: 'Academia Brasileira de Neurologia — Doença de Parkinson; MDS Clinical Diagnostic Criteria, 2015.'
    }
  },

  /* ── 10. AVC isquêmico — contraindicação à trombólise ────── */
  {
    id: 'neuro-avci-trombolise-contraindicada',
    theme: 'neuro',
    difficulty: 3,
    setting: 'UPA',
    diagnosis: 'AVC isquêmico extenso (território da ACM direita)',
    acceptedDifferentials: ['AVC isquêmico', 'AVCi de ACM'],
    presentation: {
      vignette: 'Homem de 68 anos, com HAS, diabetes e fibrilação atrial em tratamento irregular, admitido com rebaixamento e déficit neurológico à esquerda, de predomínio braquiofacial. Foi se deitar há 90 minutos, sem sintomas, e foi encontrado com o déficit; chegou ao hospital 30 minutos após o déficit ser constatado. Glasgow 9, hemiparesia acentuada à esquerda, ritmo cardíaco irregular.',
      vitals: 'Glasgow 9 · PA 170/100 · FA ~96 bpm · glicemia 285 · déficit braquiofacial à esquerda'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 22,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Acionar o protocolo de AVC: glicemia capilar, TC de crânio sem contraste imediata e definição do último momento assintomático',
            quality: 'best',
            feedback: 'Déficit focal agudo é AVC até prova em contrário: a TC sem contraste (afasta hemorragia), a glicemia e o horário de início guiam toda a decisão de reperfusão.' },
          { text: 'Estabilizar via aérea e oximetria e solicitar a TC de crânio',
            quality: 'acceptable',
            feedback: 'O suporte e a imagem estão corretos; falta explicitar a definição do tempo de instalação, que é decisiva para a trombólise.' },
          { text: 'Reduzir a pressão arterial agressivamente por via endovenosa antes da imagem',
            quality: 'poor', dangerous: true,
            feedback: 'Na fase aguda do AVC isquêmico, baixar a PA de forma agressiva reduz a perfusão da penumbra e piora o desfecho — e 170/100 está abaixo do limite que exigiria tratamento para trombólise (185/110).' },
          { text: 'Iniciar AAS imediatamente, antes da neuroimagem',
            quality: 'poor',
            feedback: 'Antiagregar antes de excluir hemorragia na TC é inseguro — o antiplaquetário espera o resultado da imagem.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Como a TC e o tempo de evolução pesam na decisão de trombolisar?',
        options: [
          { text: 'A hipoatenuação em mais de 1/3 do território da ACM indica isquemia já estabelecida — contraindica a trombólise pelo alto risco de transformação hemorrágica',
            quality: 'best',
            feedback: 'Área extensa de isquemia precoce (> 1/3 da ACM) é contraindicação clássica ao trombolítico: o tecido já está infartado e o risco de sangramento supera o benefício.' },
          { text: 'O horário de início é incerto e possivelmente fora da janela, o que já limita a trombólise',
            quality: 'acceptable',
            feedback: 'É verdade que o tempo é incerto (déficit percebido só ao ser encontrado); mas o dado que sela a contraindicação aqui é a isquemia extensa já estabelecida na TC.' },
          { text: 'A PA de 170/100 é a principal contraindicação e impede o trombolítico',
            quality: 'poor',
            feedback: 'A PA só contraindica a trombólise acima de 185/110 (e pode ser tratada até esse alvo) — 170/100 não é a barreira aqui.' },
          { text: 'A glicemia de 285 é a contraindicação determinante',
            quality: 'poor',
            feedback: 'Hiperglicemia isolada não é contraindicação absoluta à trombólise (o limite crítico é hipoglicemia < 50) — não é o fator decisivo.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Conduta definitiva?',
        options: [
          { text: 'Não trombolisar; internar em unidade de AVC com controle permissivo da PA, antiagregação após a TC e suporte',
            quality: 'best',
            feedback: 'Com isquemia extensa já estabelecida, o manejo é clínico: unidade de AVC, PA permissiva, antiagregação (após excluída a hemorragia) e prevenção de complicações.' },
          { text: 'Internar em unidade de AVC com PA em nível permissivo e monitorização',
            quality: 'acceptable',
            feedback: 'A internação em unidade de AVC é adequada; falta detalhar a antiagregação e a meta permissiva de pressão.' },
          { text: 'Administrar o trombolítico mesmo com a área extensa de isquemia estabelecida',
            quality: 'poor', dangerous: true,
            feedback: 'Trombolisar um infarto extenso já estabelecido tem altíssimo risco de transformação hemorrágica fatal — é exatamente a contraindicação do caso.' },
          { text: 'Reduzir a PA rapidamente ao normal com nitroprussiato',
            quality: 'poor',
            feedback: 'Normalizar a PA de forma abrupta compromete a perfusão cerebral na fase aguda — o controle deve ser permissivo, não agressivo.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Tomografia de crânio',
        body: 'A TC sem contraste mostra hipoatenuação já estabelecida em cerca de 40% do território da artéria cerebral média direita (mais de 1/3), sem sangramento. O laudo sai cerca de 3 horas após o último momento em que o paciente foi visto sem déficit.' },
      { kind: 'evolution', title: 'Definição da conduta',
        body: 'Confirmada isquemia extensa estabelecida em território da ACM direita. A trombólise está contraindicada; opta-se por manejo clínico em unidade de AVC, com controle permissivo da pressão e antiagregação.' }
    ],
    debrief: {
      summary: 'A trombólise no AVC isquêmico tem contraindicações que protegem o paciente do risco de sangramento. A hipoatenuação precoce em mais de 1/3 do território da ACM sinaliza infarto já estabelecido e é contraindicação clássica. Vale separar os distratores: a PA só é barreira acima de 185/110 (e é tratável até esse alvo), e a hiperglicemia isolada não contraindica (o limite crítico é a hipoglicemia). O tempo importa — janela de 4,5 h a partir do último momento assintomático — mas, neste caso de horário incerto e isquemia extensa, é a imagem que decide. Sem indicação de reperfusão, o cuidado é clínico em unidade de AVC.',
      pearls: [
        'Isquemia > 1/3 do território da ACM na TC contraindica a trombólise.',
        'PA só barra a trombólise acima de 185/110; hiperglicemia isolada não contraindica.',
        'Na fase aguda, controle permissivo da PA — não normalize agressivamente.'
      ],
      reference: 'Sociedade Brasileira de Doenças Cerebrovasculares; AHA/ASA — Acute Ischemic Stroke Guidelines, 2019.'
    }
  },

  /* ── 11. Neoplasia de cabeça de pâncreas — Courvoisier ───── */
  {
    id: 'gi-neoplasia-cabeca-pancreas',
    theme: 'gi',
    difficulty: 2,
    setting: 'Hospital de médio porte',
    diagnosis: 'Neoplasia de cabeça de pâncreas (tumor periampular)',
    acceptedDifferentials: ['Câncer de cabeça de pâncreas', 'Tumor periampular'],
    presentation: {
      vignette: 'Mulher de 72 anos com emagrecimento e dor abdominal irradiada para o dorso há 3 meses. Há 1 mês, a urina ficou escura e surgiram prurido intenso e icterícia. Ao exame, ictérica +++/4+, emagrecida, com fígado palpável e uma massa bem definida, de consistência cística e indolor, no hipocôndrio direito.',
      vitals: 'Icterícia +++/4+ · vesícula palpável indolor (Courvoisier) · colúria · prurido'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Solicitar tomografia de abdome com contraste para avaliar vias biliares e pâncreas, com provas de colestase',
            quality: 'best',
            feedback: 'Icterícia indolor + emagrecimento + vesícula palpável indolor (Courvoisier) sugerem obstrução maligna: a TC com contraste avalia vias biliares e pâncreas e já estadia a doença.' },
          { text: 'Solicitar colangiopancreatografia por ressonância para detalhar as vias biliares',
            quality: 'acceptable',
            feedback: 'A colangio-RM detalha bem as vias biliares, mas a TC com contraste é preferida por avaliar o pâncreas e estadiar a lesão — a colangio-RM fica como complemento.' },
          { text: 'Ultrassonografia para avaliar colecistite crônica calculosa',
            quality: 'poor',
            feedback: 'O quadro é de obstrução maligna, não de colecistite calculosa; enquadrar assim desvia a investigação e atrasa o diagnóstico.' },
          { text: 'Biópsia percutânea com agulha da massa palpada',
            quality: 'poor', dangerous: true,
            feedback: 'Puncionar por via percutânea uma lesão potencialmente ressecável arrisca disseminação tumoral e sangramento — não é o primeiro passo.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'A TC mostra massa na cabeça do pâncreas com dilatação de vias biliares e ducto pancreático. Qual o próximo passo?',
        options: [
          { text: 'Estadiar e encaminhar a um centro especializado (cirurgia hepatobiliar/oncologia) para avaliar a ressecabilidade',
            quality: 'best',
            feedback: 'O sinal do duplo ducto com massa na cabeça do pâncreas é típico de tumor periampular: o próximo passo é estadiar e definir ressecabilidade em serviço especializado.' },
          { text: 'Complementar com CA 19-9 e discutir em equipe multidisciplinar antes de definir',
            quality: 'acceptable',
            feedback: 'Dosar o marcador e discutir em equipe é razoável; o essencial é não retardar o encaminhamento para o serviço especializado.' },
          { text: 'Iniciar antibiótico para colecistite e reavaliar em algumas semanas',
            quality: 'poor',
            feedback: 'Não há colecistite — tratar como tal e adiar o encaminhamento perde tempo num tumor potencialmente ressecável.' },
          { text: 'Tranquilizar a paciente, assumir coledocolitíase e liberar para retorno ambulatorial',
            quality: 'poor',
            feedback: 'A massa pancreática com duplo ducto não é coledocolitíase; liberar sem investigar posterga um diagnóstico grave.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Conduta definitiva?',
        options: [
          { text: 'Encaminhar para estadiamento e avaliação de duodenopancreatectomia (Whipple) se ressecável, controlando prurido e estado nutricional',
            quality: 'best',
            feedback: 'O tratamento com intenção curativa do tumor de cabeça de pâncreas é a duodenopancreatectomia (Whipple) quando ressecável, com suporte nutricional e alívio da colestase.' },
          { text: 'Encaminhar à cirurgia/oncologia para estadiamento e definição terapêutica',
            quality: 'acceptable',
            feedback: 'O encaminhamento está correto; falta explicitar a avaliação de ressecabilidade e o suporte (prurido, nutrição) enquanto isso.' },
          { text: 'Programar colecistectomia por provável colecistopatia calculosa',
            quality: 'poor',
            feedback: 'Operar a vesícula por um diagnóstico equivocado não trata o tumor e atrasa a conduta correta.' },
          { text: 'Solicitar novas ultrassonografias seriadas antes de qualquer encaminhamento',
            quality: 'poor', redundant: true,
            feedback: 'Repetir exames de baixa acurácia para esse cenário só adia o encaminhamento que muda o prognóstico.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Tomografia de abdome',
        body: 'Massa sólida na cabeça do pâncreas, com dilatação das vias biliares intra e extra-hepáticas e do ducto pancreático (sinal do duplo ducto), sem doença metastática à distância evidente.' },
      { kind: 'evolution', title: 'Definição da conduta',
        body: 'Confirmado tumor de cabeça de pâncreas/periampular. A paciente é encaminhada a serviço especializado para estadiamento e avaliação de ressecabilidade, com suporte para o prurido e a nutrição.' }
    ],
    debrief: {
      summary: 'O sinal de Courvoisier — vesícula palpável e indolor com icterícia — aponta obstrução biliar maligna, não litiásica. A tomografia de abdome com contraste é o melhor exame inicial: avalia vias biliares e pâncreas e estadia a lesão (o achado clássico é o "duplo ducto"). A biópsia percutânea deve ser evitada em tumores potencialmente ressecáveis pelo risco de disseminação. O tratamento com intenção curativa do tumor de cabeça de pâncreas é a duodenopancreatectomia (cirurgia de Whipple), quando ressecável, sempre com suporte nutricional e controle da colestase.',
      pearls: [
        'Courvoisier (vesícula palpável indolor + icterícia) = obstrução maligna até prova em contrário.',
        'TC de abdome com contraste avalia pâncreas e vias biliares e estadia — melhor que US/colangio-RM aqui.',
        'Evite biópsia percutânea em tumor potencialmente ressecável (risco de disseminação).'
      ],
      reference: 'Sociedade Brasileira de Cirurgia Oncológica; NCCN — Pancreatic Adenocarcinoma.'
    }
  },

  /* ── 12. Febre reumática aguda ───────────────────────────── */
  {
    id: 'ped-febre-reumatica',
    theme: 'ped',
    difficulty: 2,
    setting: 'Pronto-atendimento',
    diagnosis: 'Febre reumática aguda',
    acceptedDifferentials: ['Febre reumática', 'Febre reumática aguda'],
    presentation: {
      vignette: 'Menino de 10 anos com dor no cotovelo direito há 1 dia. Há 1 semana, iniciou febre (38,5 °C, 1–2 picos ao dia) com artrite que migrou: começou no joelho direito, melhorou e passou ao tornozelo, e agora ao cotovelo. Há 3 semanas teve dor de garganta. Ao exame, taquicárdico e com sopro sistólico 3+/6+.',
      vitals: 'FC 110 · sopro sistólico 3+/6+ · poliartrite migratória · faringite há 3 semanas'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Investigar febre reumática pelos critérios de Jones: ASLO, provas inflamatórias (VHS/PCR), ECG e ecocardiograma',
            quality: 'best',
            feedback: 'Poliartrite migratória + sopro novo semanas após faringite é o quadro clássico de febre reumática — os critérios de Jones, com ASLO, provas inflamatórias e ecocardiograma, confirmam e avaliam a cardite.' },
          { text: 'Solicitar provas inflamatórias e ecocardiograma e observar a evolução',
            quality: 'acceptable',
            feedback: 'A investigação está na direção certa; falta enquadrar formalmente nos critérios de Jones e documentar a infecção estreptocócica (ASLO).' },
          { text: 'Tratar como artrite séptica com antibiótico empírico e punção/drenagem articular',
            quality: 'poor', dangerous: true,
            feedback: 'Artrite migratória com cardite após faringite não é séptica; conduzir como tal expõe a criança a procedimentos invasivos desnecessários e desvia da febre reumática.' },
          { text: 'Prescrever apenas analgésico e alta, atribuindo a dor a trauma',
            quality: 'poor',
            feedback: 'Um sopro novo com febre e poliartrite migratória não é trauma — dar alta perde uma cardite reumática que precisa de tratamento e profilaxia.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Com ASLO alto, cardite e poliartrite migratória, qual agente e mecanismo você assume?',
        options: [
          { text: 'Streptococcus pyogenes (estreptococo beta-hemolítico do grupo A), por resposta imune pós-faríngea',
            quality: 'best',
            feedback: 'A febre reumática é uma sequela imunomediada da faringite pelo Streptococcus pyogenes — o ASLO elevado documenta a infecção estreptocócica prévia.' },
          { text: 'Provável etiologia estreptocócica pós-faringite — confirmar pelo ASLO e critérios',
            quality: 'acceptable',
            feedback: 'A leitura está correta; falta nomear o agente (S. pyogenes) e o mecanismo imunomediado que define a doença.' },
          { text: 'Staphylococcus aureus por disseminação hematogênica',
            quality: 'poor',
            feedback: 'S. aureus causa artrite séptica e endocardite aguda, não a poliartrite migratória imunomediada pós-faringite.' },
          { text: 'Borrelia burgdorferi (doença de Lyme)',
            quality: 'poor',
            feedback: 'A doença de Lyme depende de exposição a carrapato e tem outro padrão; não explica a artrite migratória com cardite pós-faringite.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Tratamento de escolha?',
        options: [
          { text: 'Penicilina G benzatina para erradicar o estreptococo, anti-inflamatório (naproxeno; o salicilato é a alternativa clássica) para a artrite e início da profilaxia secundária',
            quality: 'best',
            feedback: 'A penicilina G benzatina erradica o estreptococo; o anti-inflamatório controla a artrite (naproxeno ou ibuprofeno são preferidos ao AAS em crianças, pela menor toxicidade e risco de Reye); e a profilaxia secundária com penicilina benzatina periódica previne recorrências e a cardiopatia reumática.' },
          { text: 'Penicilina benzatina e anti-inflamatório, com seguimento cardiológico',
            quality: 'acceptable',
            feedback: 'O tratamento está correto; falta explicitar o início da profilaxia secundária, que é o que protege a longo prazo.' },
          { text: 'Oxacilina para cobrir Staphylococcus aureus',
            quality: 'poor',
            feedback: 'A oxacilina cobre estafilococo, agente de artrite séptica — não é o tratamento da febre reumática.' },
          { text: 'Doxiciclina para doença de Lyme',
            quality: 'poor',
            feedback: 'Doxiciclina trata a doença de Lyme, que não é o diagnóstico aqui — não aborda o estreptococo nem a cardite reumática.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Exames iniciais',
        body: 'ASLO elevado, VHS e PCR aumentados; ECG com intervalo PR prolongado e ecocardiograma com regurgitação mitral (cardite). A poliartrite migratória está documentada.' },
      { kind: 'evolution', title: 'Definição da conduta',
        body: 'Critérios de Jones preenchidos (cardite + poliartrite migratória + febre e provas inflamatórias, com evidência de infecção estreptocócica): febre reumática aguda com cardite. Indica-se erradicar o estreptococo, tratar a inflamação e iniciar profilaxia secundária.' }
    ],
    debrief: {
      summary: 'A febre reumática aguda é uma sequela imunomediada da faringite pelo Streptococcus pyogenes, diagnosticada pelos critérios de Jones (maiores: cardite, poliartrite migratória, coreia, eritema marginado, nódulos subcutâneos; menores: febre, artralgia, provas inflamatórias, PR alargado), com evidência de infecção estreptocócica prévia. O tratamento tem três pilares: erradicar o estreptococo com penicilina G benzatina, controlar a inflamação com anti-inflamatório (naproxeno ou ibuprofeno são preferidos ao AAS em crianças; a cardite grave pode exigir corticoide), e iniciar a profilaxia secundária com penicilina benzatina periódica para prevenir recorrências e a cardiopatia reumática crônica.',
      pearls: [
        'Poliartrite migratória + cardite semanas após faringite = febre reumática (critérios de Jones).',
        'Agente é o Streptococcus pyogenes; a lesão é imunomediada, não infecção ativa da articulação.',
        'Trate com penicilina G benzatina e inicie a profilaxia secundária.'
      ],
      reference: 'Sociedade Brasileira de Cardiologia / SBP — Febre Reumática; AHA — Revised Jones Criteria, 2015.'
    }
  },

  /* ── 13. Anorexia nervosa — instabilidade clínica ────────── */
  {
    id: 'psiq-anorexia-instabilidade',
    theme: 'psiq',
    difficulty: 3,
    setting: 'UBS',
    diagnosis: 'Anorexia nervosa',
    acceptedDifferentials: ['Anorexia nervosa', 'Transtorno alimentar restritivo'],
    presentation: {
      vignette: 'Mulher de 21 anos com amenorreia há 4 meses (gravidez descartada). Iniciou dieta há 10 meses e emagreceu cerca de 30 kg; ainda quer perder peso e mantém a restrição. Há 2 dias, desmaiou durante exercício e um ECG mostrou alterações de ST e onda T. Nega diagnóstico psiquiátrico prévio, mora sozinha. Ao exame, palidez de mucosas e turgor cutâneo diminuído.',
      vitals: 'IMC 14,7 · PA 80/60 · FC 55 · ECG com alterações de ST/T · turgor diminuído'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Reconhecer a instabilidade clínica grave (IMC 14,7, hipotensão, bradicardia, alterações no ECG, desidratação) e indicar internação hospitalar para estabilização',
            quality: 'best',
            feedback: 'Desnutrição grave com hipotensão, bradicardia e alterações no ECG são critérios de instabilidade clínica — a prioridade é a internação para estabilização médica.' },
          { text: 'Solicitar eletrólitos, ECG e função renal e definir o nível de cuidado com monitorização',
            quality: 'acceptable',
            feedback: 'Investigar os distúrbios hidroeletrolíticos é necessário, mas os achados já indicam instabilidade — a decisão de internar não deve esperar todos os exames.' },
          { text: 'Liberar para casa com orientação dietética, já que está deambulando e sem queixa aguda',
            quality: 'poor', dangerous: true,
            feedback: 'Dar alta a uma paciente com hipotensão, bradicardia e alterações no ECG por desnutrição grave ignora um risco real de arritmia e morte súbita.' },
          { text: 'Continuar a investigação da amenorreia na UBS',
            quality: 'poor',
            feedback: 'A amenorreia é consequência da desnutrição; focar nela na UBS deixa passar a emergência clínica que exige internação.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Diante desses achados, qual é a prioridade do cuidado agora?',
        options: [
          { text: 'A instabilidade clínica tem prioridade — estabilização médica em enfermaria antes do cuidado psiquiátrico isolado',
            quality: 'best',
            feedback: 'Com risco cardiovascular iminente, a estabilização clínica em enfermaria vem primeiro; o cuidado psiquiátrico é essencial, mas conjunto, não substitui a internação clínica.' },
          { text: 'Internação com suporte clínico e psiquiátrico conjunto, priorizando a estabilização',
            quality: 'acceptable',
            feedback: 'A abordagem conjunta é correta; o ponto é deixar claro que a estabilização clínica é o que define o local de internação agora.' },
          { text: 'Encaminhar diretamente à enfermaria de saúde mental',
            quality: 'poor',
            feedback: 'Uma enfermaria de saúde mental não oferece a monitorização e o suporte clínico que a instabilidade hemodinâmica exige neste momento.' },
          { text: 'Manter acompanhamento ambulatorial no CAPS',
            quality: 'poor',
            feedback: 'O CAPS é ambulatorial e não dá conta de uma paciente clinicamente instável que precisa de internação.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Conduta definitiva?',
        options: [
          { text: 'Internar em enfermaria de clínica médica: realimentação gradual monitorizando fósforo/potássio/magnésio, reposição hidroeletrolítica e acompanhamento psiquiátrico conjunto',
            quality: 'best',
            feedback: 'A internação clínica permite corrigir os distúrbios e realimentar de forma gradual e monitorizada, prevenindo a síndrome de realimentação, com a equipe de saúde mental acompanhando.' },
          { text: 'Internar para estabilização clínica com equipe multidisciplinar e seguimento de saúde mental',
            quality: 'acceptable',
            feedback: 'A internação está correta; falta detalhar a realimentação gradual monitorizada e a correção hidroeletrolítica.' },
          { text: 'Iniciar realimentação com alta oferta calórica rápida para recuperar o peso logo',
            quality: 'poor', dangerous: true,
            feedback: 'Realimentar de forma agressiva precipita a síndrome de realimentação (queda de fósforo, potássio e magnésio), com arritmias e insuficiência cardíaca — a oferta deve ser gradual e monitorizada.' },
          { text: 'Dar alta com orientação dietética e retorno ambulatorial',
            quality: 'poor',
            feedback: 'A alta não estabiliza os parâmetros de risco; a paciente precisa de internação e monitorização, não apenas de orientação.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Avaliação clínica',
        body: 'Confirmam-se desnutrição grave (IMC 14,7), hipotensão (80/60), bradicardia (55) e alterações de repolarização (ST/T) no ECG, com sinais de desidratação — critérios de instabilidade clínica que indicam cuidado hospitalar.' },
      { kind: 'evolution', title: 'Definição da conduta',
        body: 'Indicada internação em enfermaria de clínica médica para correção hidroeletrolítica e realimentação cuidadosa (prevenção da síndrome de realimentação), com monitorização cardíaca e envolvimento da equipe de saúde mental.' }
    ],
    debrief: {
      summary: 'A anorexia nervosa com critérios de instabilidade clínica — IMC muito baixo (< 15), hipotensão, bradicardia, alterações no ECG e distúrbios hidroeletrolíticos — é uma emergência que exige internação hospitalar para estabilização médica, e não apenas cuidado psiquiátrico ambulatorial. A estabilização clínica tem prioridade, com a saúde mental atuando de forma conjunta. A realimentação deve ser gradual e monitorizada pelo risco de síndrome de realimentação, marcada pela queda de fósforo, potássio e magnésio, que pode causar arritmias e insuficiência cardíaca.',
      pearls: [
        'IMC < 15 com hipotensão, bradicardia e ECG alterado = instabilidade → internação clínica.',
        'Estabilização médica vem antes do cuidado psiquiátrico isolado (que é conjunto).',
        'Realimente devagar e monitore fósforo/potássio/magnésio (síndrome de realimentação).'
      ],
      reference: 'Associação Brasileira de Psiquiatria — Transtornos Alimentares; MARSIPAN / APA Guidelines.'
    }
  },

  /* ── 14. Hipertensão crônica na gestação ─────────────────── */
  {
    id: 'go-hipertensao-cronica-gestacao',
    theme: 'go',
    difficulty: 2,
    setting: 'Pré-natal na UBS',
    diagnosis: 'Hipertensão arterial crônica na gestação',
    acceptedDifferentials: ['HAS crônica na gestação', 'Hipertensão crônica'],
    presentation: {
      vignette: 'Gestante G5P3C1, 35 anos, idade gestacional de 15 semanas, hipertensa crônica em uso de enalapril, com antecedente de pré-eclâmpsia. Comparece à consulta de pré-natal na UBS assintomática, com pressão arterial de 140 x 90 mmHg.',
      vitals: 'IG 15 semanas · PA 140/90 · em uso de enalapril (IECA) · antecedente de pré-eclâmpsia'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Suspender o enalapril (IECA é teratogênico/fetotóxico) e substituir por anti-hipertensivo seguro na gestação, como a alfametildopa',
            quality: 'best',
            feedback: 'IECA e BRA são contraindicados na gravidez (fetotoxicidade renal, oligoâmnio, malformações) — o passo imediato é trocar o enalapril por um anti-hipertensivo seguro.' },
          { text: 'Suspender o enalapril e reavaliar a necessidade de anti-hipertensivo conforme os níveis pressóricos',
            quality: 'acceptable',
            feedback: 'Suspender o IECA está correto; a ressalva é que, com HAS crônica e PA 140/90, costuma-se já iniciar um agente seguro em vez de apenas observar.' },
          { text: 'Manter o enalapril e associar losartana para melhorar o controle',
            quality: 'poor', dangerous: true,
            feedback: 'Associar um BRA (losartana) a um IECA na gestação soma dois fármacos teratogênicos — é justamente o que se deve evitar.' },
          { text: 'Atribuir a PA à ansiedade da consulta e não modificar a conduta',
            quality: 'poor',
            feedback: 'Manter um IECA numa gestante por assumir "hipertensão do jaleco" mantém o feto exposto a um fármaco contraindicado.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Pelo antecedente de pré-eclâmpsia e a hipertensão crônica, o que a profilaxia exige?',
        options: [
          { text: 'Iniciar ácido acetilsalicílico em baixa dose e suplementação de cálcio para reduzir o risco de pré-eclâmpsia',
            quality: 'best',
            feedback: 'HAS crônica com antecedente de pré-eclâmpsia é alto risco: AAS em baixa dose (idealmente iniciado antes de 16 semanas) e cálcio reduzem a incidência de pré-eclâmpsia.' },
          { text: 'Iniciar AAS em baixa dose e reforçar o seguimento no pré-natal de alto risco',
            quality: 'acceptable',
            feedback: 'O AAS e o alto risco estão certos; vale acrescentar a suplementação de cálcio, que compõe a profilaxia.' },
          { text: 'Iniciar anticoagulação plena de rotina para gestantes hipertensas',
            quality: 'poor',
            feedback: 'Anticoagulação plena não é profilaxia de pré-eclâmpsia e não está indicada de rotina — expõe a gestante a risco de sangramento sem benefício.' },
          { text: 'Nenhuma profilaxia é necessária neste momento',
            quality: 'poor',
            feedback: 'Deixar de indicar AAS e cálcio numa gestante de alto risco desperdiça uma intervenção que comprovadamente reduz a pré-eclâmpsia.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Conduta medicamentosa indicada?',
        options: [
          { text: 'Alfametildopa (anti-hipertensivo seguro), ácido acetilsalicílico em baixa dose e carbonato de cálcio',
            quality: 'best',
            feedback: 'Alfametildopa é anti-hipertensivo de escolha na gestação; somada ao AAS e ao cálcio, cobre o controle pressórico e a profilaxia de pré-eclâmpsia nesta paciente de alto risco.' },
          { text: 'Anti-hipertensivo compatível (alfametildopa ou nifedipino) com AAS e cálcio, conforme tolerância',
            quality: 'acceptable',
            feedback: 'A combinação está correta; o nifedipino também é seguro, e a escolha final considera tolerância e níveis pressóricos.' },
          { text: 'Captopril, varfarina e ácido acetilsalicílico',
            quality: 'poor', dangerous: true,
            feedback: 'Captopril (IECA) e varfarina são teratogênicos e contraindicados na gestação — essa combinação é justamente a que expõe o feto.' },
          { text: 'Furosemida, varfarina e carbonato de cálcio',
            quality: 'poor',
            feedback: 'Diurético de alça não é anti-hipertensivo de escolha na gravidez e a varfarina é teratogênica — a combinação é inadequada.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Revisão da gestação',
        body: 'Gestante de 15 semanas, hipertensa crônica e com antecedente de pré-eclâmpsia — perfil de alto risco. IECA e BRA (enalapril, losartana) são contraindicados na gravidez.' },
      { kind: 'evolution', title: 'Definição da conduta',
        body: 'Suspenso o enalapril e trocado por alfametildopa; indicados AAS em baixa dose e cálcio para profilaxia de pré-eclâmpsia, com seguimento no pré-natal de alto risco.' }
    ],
    debrief: {
      summary: 'Na hipertensão crônica em gestantes, IECA e BRA (enalapril, losartana, captopril) são contraindicados por fetotoxicidade e devem ser trocados por anti-hipertensivos seguros — alfametildopa, nifedipino ou labetalol. Como esta gestante tem alto risco de pré-eclâmpsia (HAS crônica + antecedente), indica-se profilaxia com ácido acetilsalicílico em baixa dose (idealmente antes de 16 semanas) e suplementação de cálcio. A varfarina também é teratogênica e deve ser evitada. A combinação adequada é, portanto, alfametildopa + AAS + cálcio.',
      pearls: [
        'IECA/BRA são proibidos na gestação — troque por alfametildopa, nifedipino ou labetalol.',
        'Alto risco de pré-eclâmpsia: AAS em baixa dose (< 16 sem) + cálcio.',
        'Evite varfarina na gravidez (teratogênica).'
      ],
      reference: 'FEBRASGO — Síndromes Hipertensivas na Gestação; ACOG — Chronic Hypertension in Pregnancy.'
    }
  },

  /* ── 15. Insensibilidade androgênica (síndrome de Morris) ── */
  {
    id: 'endo-insensibilidade-androgenica',
    theme: 'endo',
    difficulty: 3,
    setting: 'Ambulatório de endocrinologia',
    diagnosis: 'Síndrome de insensibilidade androgênica completa',
    acceptedDifferentials: ['Insensibilidade androgênica', 'Síndrome de Morris'],
    presentation: {
      vignette: 'Adolescente de 16 anos procura o ambulatório porque ainda não menstruou, enquanto as colegas da mesma idade já menstruaram. Tem fenótipo feminino, mamas desenvolvidas e pelos pubianos e axilares esparsos. Ao exame, genitália externa feminina; a ultrassonografia pélvica prévia não identificou útero.',
      vitals: 'Fenótipo feminino · mamas desenvolvidas · pelos pubianos/axilares esparsos · útero ausente à US'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta na investigação da amenorreia primária?',
        options: [
          { text: 'Investigar de forma completa: dosagens hormonais (FSH, LH, testosterona), cariótipo e avaliação da anatomia',
            quality: 'best',
            feedback: 'A amenorreia primária com útero ausente e pelos sexuais escassos exige hormônios e cariótipo — é o que distingue as causas (insensibilidade androgênica, disgenesia gonadal, malformação mülleriana).' },
          { text: 'Solicitar dosagens hormonais e repetir a avaliação de imagem da pelve',
            quality: 'acceptable',
            feedback: 'Os hormônios e a imagem ajudam, mas sem o cariótipo não se fecha o diagnóstico neste cenário — ele é peça central aqui.' },
          { text: 'Prescrever progesterona para induzir a menstruação e reavaliar',
            quality: 'poor',
            feedback: 'Sem útero, não há endométrio para responder — induzir menstruação não faz sentido e adia a investigação.' },
          { text: 'Tranquilizar e orientar aguardar, atribuindo a atraso constitucional da puberdade',
            quality: 'poor',
            feedback: 'Mamas desenvolvidas com útero ausente e pelos escassos não são atraso constitucional — é preciso investigar.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Testosterona em nível masculino, FSH normal e útero ausente num fenótipo feminino — o que isso distingue?',
        options: [
          { text: 'Gônadas funcionantes (testosterona alta) com fenótipo feminino indicam resistência ao androgênio — não falência gonadal',
            quality: 'best',
            feedback: 'A produção de testosterona em nível masculino com fenótipo feminino mostra que o problema é a resposta ao androgênio (receptor não funcionante), não a produção — é a insensibilidade androgênica.' },
          { text: 'Aponta resistência androgênica; o cariótipo vai confirmar o quadro',
            quality: 'acceptable',
            feedback: 'A leitura está correta; falta apenas confirmar com o cariótipo (46,XY) para selar a insensibilidade androgênica.' },
          { text: 'Sugere disgenesia gonadal, com gônadas em fita',
            quality: 'poor',
            feedback: 'Na disgenesia gonadal a gônada não produz hormônios — o FSH costuma estar elevado e a testosterona baixa, o oposto do que se vê aqui.' },
          { text: 'Sugere malformação mülleriana (síndrome de MRKH)',
            quality: 'poor',
            feedback: 'Na MRKH o cariótipo é 46,XX, com testosterona feminina e pelos sexuais normais — não explica testosterona masculina e pelos escassos.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Confirmada a insensibilidade androgênica completa, qual a conduta?',
        options: [
          { text: 'Manejo multidisciplinar: acompanhamento das gônadas (gonadectomia geralmente após a puberdade), reposição estrogênica depois da retirada, suporte psicológico e comunicação cuidadosa do diagnóstico',
            quality: 'best',
            feedback: 'O cuidado é multidisciplinar: as gônadas costumam ser mantidas até após a puberdade (feminização espontânea por aromatização), com estrogênio após a gonadectomia, apoio psicológico e revelação cuidadosa.' },
          { text: 'Encaminhar para equipe multidisciplinar (endócrino, ginecologia, psicologia) para planejar gônadas e reposição hormonal',
            quality: 'acceptable',
            feedback: 'O encaminhamento multidisciplinar é adequado; falta explicitar o plano de gônadas, a reposição estrogênica e o suporte à paciente.' },
          { text: 'Prescrever testosterona para promover a virilização',
            quality: 'poor', dangerous: true,
            feedback: 'Há insensibilidade ao androgênio — dar testosterona não viriliza e desconsidera o fenótipo e a identidade femininos da paciente.' },
          { text: 'Realizar histerossalpingografia e tentar desobstruir o trato genital',
            quality: 'poor',
            feedback: 'Não há útero nem obstrução a desobstruir — esse não é o mecanismo do quadro.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Resultados hormonais',
        body: 'FSH normal e testosterona sérica em níveis compatíveis com o sexo masculino, num fenótipo feminino com útero ausente.' },
      { kind: 'exam', title: 'Cariótipo',
        body: 'Cariótipo 46,XY. Configura-se a síndrome de insensibilidade androgênica completa: gônadas (testículos) produzem testosterona e hormônio antimülleriano (por isso não há útero), mas o receptor androgênico não funcionante gera fenótipo feminino.' }
    ],
    debrief: {
      summary: 'A síndrome de insensibilidade androgênica completa (síndrome de Morris) é um indivíduo 46,XY cujo receptor de androgênio não funciona: os testículos produzem testosterona em nível masculino e hormônio antimülleriano (que regride os ductos de Müller, deixando o útero ausente), mas a ausência de resposta androgênica resulta em fenótipo feminino, com mamas (por aromatização) e pelos sexuais escassos. Distingue-se da disgenesia gonadal (FSH alto, testosterona baixa), da malformação mülleriana/MRKH (46,XX, testosterona feminina, pelos normais) e da obstrução do trato genital (útero presente). O manejo é multidisciplinar: gônadas geralmente mantidas até após a puberdade, reposição estrogênica, suporte psicológico e revelação cuidadosa do diagnóstico. O momento da gonadectomia é hoje uma decisão compartilhada — o risco tumoral é baixo antes da vida adulta, e há a opção de manter as gônadas sob vigilância.',
      pearls: [
        'Amenorreia primária + fenótipo feminino + útero ausente + testosterona masculina (46,XY) = insensibilidade androgênica.',
        'Disgenesia gonadal tem FSH alto/testosterona baixa; MRKH é 46,XX com pelos normais.',
        'Manejo multidisciplinar: gônadas após a puberdade, estrogênio e suporte psicológico.'
      ],
      reference: 'SBEM — Distúrbios da Diferenciação Sexual; Consenso de manejo de DDS (ESPE/LWPES).'
    }
  },

  /* ── 16. Hipertensão estágio 1 no muito idoso ────────────── */
  {
    id: 'cardio-has-idoso-expectante',
    theme: 'cardio',
    difficulty: 1,
    setting: 'UBS',
    diagnosis: 'Hipertensão arterial estágio 1 (muito idoso)',
    acceptedDifferentials: ['Hipertensão estágio 1'],
    presentation: {
      vignette: 'Mulher de 82 anos, sem hipertensão prévia, comparece preocupada porque aferiu a pressão na farmácia há 1 semana (146x86) e, há 2 semanas, na unidade (144x88). Na consulta de hoje, está em 146x88. Está assintomática e não tem outros agravos em acompanhamento.',
      vitals: 'PA 146/88 hoje · 144/88 e 146/86 prévias · assintomática · sem comorbidades ou lesão de órgão-alvo'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Confirmar o diagnóstico com aferições padronizadas, orientar mudanças no estilo de vida e monitorar a PA na unidade, sem iniciar medicamento agora',
            quality: 'best',
            feedback: 'Estágio 1, assintomática, sem lesão de órgão-alvo e com mais de 80 anos: a conduta inicial é confirmar, orientar estilo de vida e monitorar — o medicamento não é o primeiro passo.' },
          { text: 'Reforçar medidas de estilo de vida e reavaliar a PA em consultas seguidas antes de decidir sobre medicação',
            quality: 'acceptable',
            feedback: 'A abordagem conservadora está correta; vale explicitar a monitorização programada e os critérios que indicariam medicar.' },
          { text: 'Iniciar losartana 50 mg à noite de imediato',
            quality: 'poor', dangerous: true,
            feedback: 'Medicar de imediato um estágio 1 numa paciente de 82 anos sem lesão de órgão-alvo arrisca hipotensão e quedas — no muito idoso reserva-se o fármaco para PAS ≥ 160 ou risco elevado.' },
          { text: 'Encaminhar ao cardiologista para manejo específico',
            quality: 'poor',
            feedback: 'Um estágio 1 não complicado é manejado na atenção primária — o encaminhamento não agrega e fragmenta o cuidado.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Perfil ≥ 80 anos, estágio 1, PAS < 160, sem lesão de órgão-alvo — o que orienta a decisão?',
        options: [
          { text: 'Priorizar estilo de vida e monitorização — no muito idoso, o medicamento costuma ser reservado para PAS ≥ 160 ou risco elevado',
            quality: 'best',
            feedback: 'A idade avançada e a ausência de lesão de órgão-alvo, com PAS < 160, favorecem começar por medidas não medicamentosas e acompanhar.' },
          { text: 'Acompanhar com medidas não medicamentosas e medicar se houver elevação ou lesão de órgão-alvo',
            quality: 'acceptable',
            feedback: 'A conduta está correta; é o mesmo raciocínio, faltando apenas nomear o alvo (PAS ≥ 160) que dispararia o tratamento.' },
          { text: 'Ampliar a investigação com holter e ecocardiograma antes de qualquer conduta',
            quality: 'poor',
            feedback: 'Um estágio 1 não complicado não exige holter nem ecocardiograma — são exames desnecessários que não mudam a conduta.' },
          { text: 'Iniciar dois anti-hipertensivos para atingir a meta rapidamente',
            quality: 'poor',
            feedback: 'Terapia dupla de início neste perfil é excessiva e perigosa pelo risco de hipotensão e quedas.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Conduta definitiva?',
        options: [
          { text: 'Conduta expectante com estilo de vida e monitorização periódica da PA na unidade, reavaliando a necessidade de medicamento na evolução',
            quality: 'best',
            feedback: 'A conduta expectante com estilo de vida e monitorização é a adequada para o estágio 1 não complicado no muito idoso — medica-se depois, se necessário.' },
          { text: 'Seguimento com medidas não medicamentosas e reavaliação programada da PA',
            quality: 'acceptable',
            feedback: 'Correto; falta apenas deixar explícito o acompanhamento na unidade e os gatilhos para medicar.' },
          { text: 'Iniciar anti-hipertensivo em dose plena para normalizar rapidamente a PA',
            quality: 'poor',
            feedback: 'Normalizar a PA rapidamente numa paciente de 82 anos expõe a hipotensão e quedas — não é a meta neste perfil.' },
          { text: 'Encaminhar ao cardiologista e encerrar o acompanhamento na UBS',
            quality: 'poor',
            feedback: 'Não há motivo para encaminhar nem para encerrar o vínculo com a atenção primária, que conduz bem este caso.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Estratificação',
        body: 'Hipertensão estágio 1 (PAS 140–159 / PAD 90–99), assintomática, sem lesão de órgão-alvo nem comorbidades. Somados a idade ≥ 80 anos e PAS < 160, o perfil favorece iniciar por estilo de vida e monitorização.' },
      { kind: 'evolution', title: 'Evolução',
        body: 'Orientadas medidas de estilo de vida (redução de sódio, atividade física, controle de peso) e monitorização periódica da PA na unidade, sem sinais de lesão de órgão-alvo.' }
    ],
    debrief: {
      summary: 'Em pessoas com 80 anos ou mais, com hipertensão estágio 1 (PAS 140–159), assintomáticas e sem lesão de órgão-alvo, a conduta inicial é confirmar o diagnóstico com aferições padronizadas, instituir mudanças no estilo de vida e monitorar — reservando o anti-hipertensivo para PAS ≥ 160 mmHg ou risco cardiovascular alto. Iniciar medicamento precocemente nesse perfil expõe a hipotensão e quedas, complicações relevantes no idoso. Encaminhamento ao especialista e exames como holter/ecocardiograma não são necessários para um estágio 1 não complicado.',
      pearls: [
        'Idoso ≥ 80 anos, estágio 1, PAS < 160, sem lesão de órgão-alvo: estilo de vida e monitorização.',
        'Reserve o anti-hipertensivo para PAS ≥ 160 ou risco cardiovascular alto no muito idoso.',
        'Cuidado com hipotensão e quedas ao tratar a PA no idoso.'
      ],
      reference: 'Diretriz Brasileira de Hipertensão Arterial — SBC/SBH/SBN, 2020.'
    }
  },

  /* ── 17. Profilaxia HIV — PEP e PrEP ─────────────────────── */
  {
    id: 'infecto-prep-pep-exposicao',
    theme: 'infecto',
    difficulty: 2,
    setting: 'UBS',
    diagnosis: 'Exposição sexual de risco ao HIV',
    acceptedDifferentials: ['Exposição de risco ao HIV'],
    presentation: {
      vignette: 'Mulher travesti de 28 anos, profissional do sexo, procura a UBS em demanda espontânea. Relata relações frequentes com diferentes parceiros e uso inconsistente de preservativo, sobretudo em relações anais receptivas. Há 2 dias teve uma relação desprotegida com um cliente. Nunca usou PrEP nem PEP. Está assintomática.',
      vitals: 'Exposição sexual desprotegida há 48 h · assintomática · nunca usou PrEP/PEP · risco contínuo'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Oferecer testagem rápida para HIV e sífilis e avaliar a profilaxia conforme o resultado',
            quality: 'best',
            feedback: 'A profilaxia depende do status de HIV: o teste rápido é o passo inicial e define, com a janela de exposição, entre PEP e PrEP.' },
          { text: 'Solicitar sorologias e orientar retorno com os resultados para definir a profilaxia',
            quality: 'acceptable',
            feedback: 'Testar é correto, mas aguardar sorologia convencional pode perder a janela — o teste rápido permite decidir na hora, o que importa numa exposição de 48 h.' },
          { text: 'Iniciar PrEP imediatamente, sem testar para HIV',
            quality: 'poor', dangerous: true,
            feedback: 'Iniciar profilaxia sem excluir HIV pode expor um paciente já infectado a esquema inadequado e resistência — além de ignorar que a exposição recente pede PEP, não PrEP.' },
          { text: 'Tranquilizar e orientar apenas o uso de preservativo, sem profilaxia',
            quality: 'poor',
            feedback: 'Há uma exposição de risco dentro da janela de 72 h — deixar de oferecer PEP perde uma janela de prevenção importante.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Exposição de risco há 48 h e HIV não reagente — qual profilaxia se aplica agora?',
        options: [
          { text: 'PEP (profilaxia pós-exposição) — indicada em exposição de risco há menos de 72 horas, iniciada o quanto antes',
            quality: 'best',
            feedback: 'A exposição desprotegida há 48 h está dentro da janela de 72 h: a PEP é a profilaxia indicada agora, quanto mais precoce, melhor.' },
          { text: 'Profilaxia pós-exposição, dada a exposição recente dentro da janela',
            quality: 'acceptable',
            feedback: 'Correto; é a PEP — falta apenas explicitar a janela de 72 h e a importância de iniciar o mais cedo possível.' },
          { text: 'PrEP de início imediato é o que se aplica a esta exposição recente',
            quality: 'poor',
            feedback: 'A PrEP protege o risco contínuo/futuro; para a exposição aguda das últimas 72 h, a profilaxia correta é a PEP.' },
          { text: 'Nenhuma profilaxia — apenas rastrear ISTs a cada 3 meses',
            quality: 'poor',
            feedback: 'Deixar de oferecer a PEP numa exposição recente de risco desperdiça a janela de prevenção.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Melhor estratégia de prevenção para esta paciente?',
        options: [
          { text: 'Prescrever PEP mediante HIV não reagente e programar o início da PrEP após o término da PEP, com rastreamento de ISTs e imunizações',
            quality: 'best',
            feedback: 'A sequência correta: PEP agora (exposição < 72 h), transição para PrEP ao término (risco contínuo), com rastreio de ISTs e imunizações do SUS.' },
          { text: 'Iniciar PEP agora e agendar retorno para transição à PrEP e revisão de ISTs',
            quality: 'acceptable',
            feedback: 'A conduta está certa; falta detalhar o rastreamento de ISTs e a oferta de imunizações no seguimento.' },
          { text: 'Prescrever PEP e PrEP de forma concomitante',
            quality: 'poor', redundant: true,
            feedback: 'PEP e PrEP concomitantes não são recomendadas — sobrepõem esquemas; o correto é a PEP agora e a PrEP depois.' },
          { text: 'Prescrever PrEP de início imediato como estratégia principal, sem PEP',
            quality: 'poor',
            feedback: 'Começar pela PrEP ignora a exposição aguda das últimas 72 h, que é justamente o cenário da PEP.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Testagem rápida',
        body: 'Teste rápido não reagente para HIV. A exposição desprotegida ocorreu há 48 horas — dentro da janela de 72 horas para a profilaxia pós-exposição (PEP).' },
      { kind: 'evolution', title: 'Plano de prevenção',
        body: 'Iniciada a PEP por 28 dias; programa-se a transição para a PrEP ao término (risco contínuo), com testagem de HIV/ISTs e orientação sobre as imunizações disponíveis no SUS.' }
    ],
    debrief: {
      summary: 'Na exposição sexual de risco ao HIV, o tempo define a conduta. Exposição há menos de 72 horas indica PEP (profilaxia pós-exposição) por 28 dias, sempre após teste rápido não reagente para HIV. A PrEP (pré-exposição) protege o risco contínuo e futuro e não substitui a PEP na exposição aguda: o correto é iniciar a PEP e, ao término, transicionar para a PrEP em quem mantém risco. Iniciar PrEP sem testar HIV arrisca resistência numa infecção não diagnosticada, e PEP e PrEP concomitantes não são recomendadas. A consulta é oportunidade para rastrear ISTs (HIV, sífilis, hepatites) e oferecer imunizações do SUS.',
      pearls: [
        'Exposição < 72 h → PEP (após teste rápido de HIV não reagente).',
        'PrEP é para risco contínuo/futuro — entra após a PEP, não junto.',
        'Nunca inicie profilaxia sem excluir HIV; aproveite para rastrear ISTs e vacinar.'
      ],
      reference: 'Ministério da Saúde — PCDT de Profilaxia Pós-Exposição (PEP) e Pré-Exposição (PrEP) ao HIV.'
    }
  },

  /* ── 18. Lombalgia mecânica sem sinais de alarme ─────────── */
  {
    id: 'reumato-lombalgia-mecanica',
    theme: 'reumato',
    difficulty: 1,
    setting: 'UBS',
    diagnosis: 'Lombalgia mecânica inespecífica',
    acceptedDifferentials: ['Lombalgia inespecífica'],
    presentation: {
      vignette: 'Homem de 48 anos, auxiliar de pedreiro, com dor lombar há 6 semanas, de início insidioso, sem irradiação. A dor piora ao fim do dia e melhora parcialmente com repouso e paracetamol. Nega perda de peso, febre, incontinência ou fraqueza nos membros inferiores. Ao exame, dor à palpação paravertebral lombar, sem alterações neurológicas.',
      vitals: 'Dor lombar mecânica há 6 semanas · sem sinais de alarme · exame neurológico normal'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual o primeiro passo na condução?',
        options: [
          { text: 'Explicar a natureza benigna, orientar analgesia e manutenção de atividade física leve, com reavaliação em 4 a 6 semanas',
            quality: 'best',
            feedback: 'Lombalgia mecânica sem sinais de alarme tem manejo conservador: educação, analgesia simples, manter-se ativo e reavaliar — a maioria melhora nesse período.' },
          { text: 'Otimizar a analgesia e orientar retorno se surgirem sinais de alarme',
            quality: 'acceptable',
            feedback: 'A conduta é adequada; vale reforçar a manutenção da atividade física e a reavaliação programada.' },
          { text: 'Solicitar ressonância magnética da coluna e encaminhar à ortopedia',
            quality: 'poor', redundant: true,
            feedback: 'Sem sinais de alarme, a imagem precoce só gera achados incidentais e intervenções desnecessárias — não é indicada agora.' },
          { text: 'Prescrever corticoide sistêmico e radiografia, com retorno em 10 dias',
            quality: 'poor', dangerous: true,
            feedback: 'Corticoide sistêmico não tem benefício na lombalgia mecânica inespecífica e acrescenta efeitos adversos reais — é intervenção de risco sem indicação.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Sem sinais de alarme, o que isso indica sobre a investigação?',
        options: [
          { text: 'Não há indicação de imagem nem de encaminhamento agora — o manejo é conservador com reavaliação programada',
            quality: 'best',
            feedback: 'A ausência de red flags (trauma, febre, perda de peso, déficit neurológico, alteração esfincteriana) define lombalgia inespecífica, que não requer imagem inicial.' },
          { text: 'Manter conduta conservadora e reservar exames para se surgirem sinais de alarme',
            quality: 'acceptable',
            feedback: 'Correto; é a mesma lógica — só falta explicitar quais sinais de alarme disparariam a investigação.' },
          { text: 'Solicitar ressonância para descartar hérnia, mesmo sem sinais de alarme',
            quality: 'poor',
            feedback: 'Imagem sem red flags encontra achados incidentais frequentes e leva a intervenções desnecessárias.' },
          { text: 'Encaminhar à neurocirurgia pela cronicidade de 6 semanas',
            quality: 'poor',
            feedback: 'Seis semanas de dor mecânica sem déficit não é indicação cirúrgica — o encaminhamento é desnecessário.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Conduta definitiva?',
        options: [
          { text: 'Manejo conservador: educação, analgesia (AINE de primeira linha; paracetamol isolado tem eficácia limitada), manter-se ativo e reavaliar em 4 a 6 semanas',
            quality: 'best',
            feedback: 'É o núcleo do tratamento: educação sobre a natureza benigna, AINE como analgésico de primeira linha (o paracetamol isolado é pouco eficaz na lombalgia aguda), atividade física mantida e reavaliação — evitando repouso no leito.' },
          { text: 'Analgesia e orientação de atividade, com retorno programado',
            quality: 'acceptable',
            feedback: 'Correto; falta apenas detalhar a educação sobre o prognóstico benigno e o prazo de reavaliação.' },
          { text: 'Repouso no leito prolongado e atestado por tempo indeterminado',
            quality: 'poor',
            feedback: 'O repouso prolongado piora o prognóstico (descondicionamento) — a recomendação é manter-se ativo.' },
          { text: 'Iniciar opioide de rotina para a dor lombar inespecífica',
            quality: 'poor',
            feedback: 'Opioides não são primeira linha na lombalgia inespecífica — acrescentam risco de dependência sem melhor desfecho.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Sinais de alarme',
        body: 'Ausência de red flags: sem trauma grave, febre, perda de peso, déficit neurológico, alteração esfincteriana ou imunossupressão. Trata-se de lombalgia mecânica inespecífica, que não requer imagem inicial.' },
      { kind: 'evolution', title: 'Evolução',
        body: 'Orientadas analgesia simples, manutenção da atividade física e retorno em 4–6 semanas (ou antes, se surgirem sinais de alarme). O paciente compreende a natureza benigna do quadro.' }
    ],
    debrief: {
      summary: 'A lombalgia mecânica inespecífica, sem sinais de alarme (trauma, febre, perda de peso, déficit neurológico, alteração esfincteriana, imunossupressão), tem manejo conservador: educação sobre a natureza benigna e autolimitada, analgesia simples, manutenção da atividade física — evitando repouso no leito — e reavaliação em 4 a 6 semanas. Imagem (radiografia/ressonância) e encaminhamento não são indicados sem red flags, pois geram achados incidentais e intervenções desnecessárias. Corticoide sistêmico e opioides de rotina não trazem benefício e acrescentam risco.',
      pearls: [
        'Lombalgia sem red flags = manejo conservador, sem imagem inicial.',
        'Mantenha o paciente ativo — repouso prolongado piora o prognóstico.',
        'Evite corticoide sistêmico e opioides de rotina.'
      ],
      reference: 'Diretrizes de lombalgia — ACP / NICE; Protocolos da Atenção Primária à Saúde.'
    }
  },

  /* ── 19. Fimose patológica ───────────────────────────────── */
  {
    id: 'ped-fimose-patologica',
    theme: 'ped',
    difficulty: 1,
    setting: 'UBS',
    diagnosis: 'Fimose patológica',
    acceptedDifferentials: ['Fimose patológica', 'Fimose cicatricial'],
    presentation: {
      vignette: 'Menino de 6 anos levado à UBS por fimose. A mãe relata balanopostites frequentes, a primeira ainda com 1 ano de vida. Nega infecções urinárias. Ao exame, o prepúcio cobre toda a glande e, ao ser tracionado, expõe o meato uretral e revela um anel fibrótico prepucial.',
      vitals: 'Anel prepucial fibrótico · balanopostites de repetição · sem ITU'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Reconhecer fimose patológica (anel fibrótico + balanopostites de repetição) e diferenciá-la da fimose fisiológica',
            quality: 'best',
            feedback: 'O anel prepucial fibrótico somado a balanopostites de repetição caracteriza fimose patológica (cicatricial), distinta da fisiológica do lactente.' },
          { text: 'Avaliar o prepúcio e a história de balanopostites para classificar a fimose',
            quality: 'acceptable',
            feedback: 'A avaliação está correta; o achado do anel fibrótico com balanopostites recorrentes já aponta a fimose patológica.' },
          { text: 'Assumir fimose fisiológica e orientar apenas higiene e retração progressiva',
            quality: 'poor',
            feedback: 'A fisiológica resolve sozinha e não tem anel fibrótico nem balanopostites de repetição — aqui o quadro é patológico.' },
          { text: 'Orientar a retração forçada do prepúcio para romper as aderências',
            quality: 'poor', dangerous: true,
            feedback: 'A retração forçada causa fissuras, cicatrização e piora a fimose, além do risco de parafimose — é contraindicada.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Anel fibrótico com balanopostites de repetição — o que isso muda?',
        options: [
          { text: 'É fimose patológica: há indicação de tratamento, não é a fisiológica que resolve sozinha',
            quality: 'best',
            feedback: 'O anel cicatricial e as balanopostites recorrentes definem a fimose patológica, que tem indicação terapêutica — diferente da fisiológica.' },
          { text: 'Trata-se de fimose com complicações — indicar tratamento e não apenas observar',
            quality: 'acceptable',
            feedback: 'A leitura está certa; a complicação (balanopostites de repetição + anel fibrótico) é o que muda a conduta para tratamento.' },
          { text: 'Continua sendo fimose fisiológica, pois expõe o meato uretral',
            quality: 'poor',
            feedback: 'Expor o meato ao tracionar não afasta a fimose patológica — o anel fibrótico e as balanopostites definem o quadro.' },
          { text: 'É apenas uma variação anatômica sem repercussão',
            quality: 'poor',
            feedback: 'Balanopostites de repetição com anel fibrótico têm repercussão clínica e indicação de tratamento.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Conduta definitiva?',
        options: [
          { text: 'Indicar postectomia (circuncisão), pela fimose patológica com balanopostites de repetição e anel fibrótico',
            quality: 'best',
            feedback: 'A fimose patológica com balanopostites recorrentes e anel cicatricial tem indicação de postectomia — é o tratamento definitivo aqui.' },
          { text: 'Encaminhar à cirurgia pediátrica/urologia para postectomia',
            quality: 'acceptable',
            feedback: 'O encaminhamento para a cirurgia é adequado; a conduta é a postectomia pela fimose patológica.' },
          { text: 'Prescrever betametasona tópica por 4 semanas',
            quality: 'poor',
            feedback: 'O corticoide tópico ajuda na fimose fisiológica persistente, não no anel cicatricial com balanopostites de repetição deste caso.' },
          { text: 'Adiar qualquer conduta para a adolescência',
            quality: 'poor',
            feedback: 'Com balanopostites recorrentes e anel fibrótico, adiar mantém as complicações — há indicação de tratar agora.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Achado-chave',
        body: 'O anel prepucial fibrótico e as balanopostites de repetição caracterizam fimose patológica (cicatricial), diferente da fimose fisiológica do lactente, que costuma resolver espontaneamente.' },
      { kind: 'evolution', title: 'Definição da conduta',
        body: 'Fimose patológica com balanopostites recorrentes e anel fibrótico — indicação de postectomia (circuncisão). O corticoide tópico é opção na fimose fisiológica persistente, não neste cenário cicatricial complicado.' }
    ],
    debrief: {
      summary: 'A fimose fisiológica é comum e costuma resolver espontaneamente até a idade escolar, manejada com higiene e retração suave (nunca forçada) e, quando persiste, corticoide tópico. Já a fimose patológica — anel prepucial fibrótico/cicatricial, balanopostites de repetição, infecções urinárias ou dificuldade miccional — tem indicação cirúrgica (postectomia). A retração forçada é contraindicada, pois provoca fissuras, cicatrização e piora a fimose, além do risco de parafimose. Neste menino, o anel fibrótico com balanopostites recorrentes define a indicação de postectomia.',
      pearls: [
        'Anel fibrótico + balanopostites de repetição = fimose patológica → postectomia.',
        'Fimose fisiológica: higiene, retração suave e, se persistir, corticoide tópico.',
        'Nunca oriente retração forçada — causa cicatriz e piora a fimose.'
      ],
      reference: 'Sociedade Brasileira de Pediatria / Urologia Pediátrica — Fimose.'
    }
  },

  /* ── 20. Tuberculose — retorno após abandono ─────────────── */
  {
    id: 'pneumo-tuberculose-retratamento',
    theme: 'pneumo',
    difficulty: 2,
    setting: 'UBS',
    diagnosis: 'Tuberculose — retorno após abandono (retratamento)',
    acceptedDifferentials: ['Tuberculose', 'Retratamento de tuberculose'],
    presentation: {
      vignette: 'Homem de 48 anos procura a UBS para reiniciar o tratamento de tuberculose. Iniciou o esquema há 6 meses, mas interrompeu o acompanhamento há 2 meses por uso de substâncias psicoativas. Mudou-se para o território da unidade há 15 dias e foi orientado pelo agente comunitário a retomar o tratamento. Foram solicitados TRM-TB, baciloscopia de escarro e radiografia de tórax.',
      vitals: 'Retorno após abandono (> 30 dias) · TRM-TB, baciloscopia e RX solicitados'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta ao paciente que retorna após abandono?',
        options: [
          { text: 'Confirmar a atividade da doença com baciloscopia e cultura antes de reintroduzir, usando o TRM-TB para avaliar resistência à rifampicina',
            quality: 'best',
            feedback: 'O retorno após abandono é retratamento: confirma-se a doença ativa com baciloscopia e cultura (com TSA) e o TRM-TB avalia a resistência à rifampicina antes de reintroduzir.' },
          { text: 'Reavaliar clínica e radiologicamente e coletar escarro para confirmar a doença ativa',
            quality: 'acceptable',
            feedback: 'A reavaliação está correta; falta explicitar a cultura com teste de sensibilidade, essencial no retratamento.' },
          { text: 'Reiniciar imediatamente o esquema básico sem reavaliação diagnóstica',
            quality: 'poor',
            feedback: 'No retratamento é preciso reconfirmar a atividade — em quem já tratou, o TRM-TB pode ficar positivo por DNA residual, sem doença ativa.' },
          { text: 'Assumir cura e apenas acompanhar, sem reiniciar tratamento',
            quality: 'poor',
            feedback: 'Interromper o esquema no meio (abandono) não é cura — é necessário reavaliar e, confirmada a doença, retratar.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Como o resultado do TRM-TB quanto à rifampicina direciona a conduta?',
        options: [
          { text: 'Se detecta resistência à rifampicina, não se reinicia o esquema básico — encaminha-se à referência para conduta de TB resistente',
            quality: 'best',
            feedback: 'Resistência à rifampicina no TRM-TB é marcador de TB resistente: não se usa o esquema básico (RHZE); encaminha-se à unidade de referência.' },
          { text: 'A resistência à rifampicina muda o esquema — não se usa o esquema básico nesse caso',
            quality: 'acceptable',
            feedback: 'Correto; a resistência à rifampicina contraindica o esquema básico — falta apenas apontar o encaminhamento à referência.' },
          { text: 'Mesmo com resistência à rifampicina, pode-se reiniciar o esquema básico enquanto se aguarda a cultura',
            quality: 'poor',
            feedback: 'Reiniciar o esquema básico diante de resistência à rifampicina é justamente o erro — amplifica a resistência.' },
          { text: 'A resistência à rifampicina não altera a conduta inicial',
            quality: 'poor',
            feedback: 'Altera, e muito: define TB resistente e muda todo o esquema e o local de tratamento.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Conduta adequada?',
        options: [
          { text: 'Confirmada a atividade e sem resistência à rifampicina, reiniciar o esquema básico (RHZE), com cultura e TSA solicitados e apoio à adesão/uso de substâncias',
            quality: 'best',
            feedback: 'Sem resistência à rifampicina e com doença ativa confirmada, reinicia-se o esquema básico, sempre com cultura/TSA no retratamento e estratégia de adesão (TDO, apoio psicossocial).' },
          { text: 'Reiniciar o esquema básico com cultura/TSA e tratamento diretamente observado',
            quality: 'acceptable',
            feedback: 'A conduta está correta; o tratamento diretamente observado é especialmente importante em quem já abandonou.' },
          { text: 'Reiniciar o esquema básico mesmo com resistência à rifampicina detectada, aguardando a cultura',
            quality: 'poor', dangerous: true,
            feedback: 'Tratar TB resistente à rifampicina com o esquema básico amplifica a resistência e compromete o desfecho — deve ir à referência para esquema de TB resistente.' },
          { text: 'Prescrever apenas um fármaco para "recomeçar aos poucos"',
            quality: 'poor',
            feedback: 'Monoterapia na tuberculose seleciona resistência — o tratamento é sempre com esquema combinado.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Por que confirmar antes?',
        body: 'Em quem já tratou, o TRM-TB pode permanecer positivo por DNA residual, mesmo sem doença ativa. Por isso o retratamento exige confirmar a atividade com baciloscopia e cultura, e a cultura com teste de sensibilidade (TSA) orienta a resistência.' },
      { kind: 'evolution', title: 'Definição da conduta',
        body: 'Confirmada a doença ativa: sem resistência à rifampicina no TRM-TB, reinicia-se o esquema básico (RHZE), sempre com cultura e TSA solicitados; com resistência à rifampicina, encaminha-se à referência (TB resistente).' }
    ],
    debrief: {
      summary: 'O retorno após abandono (interrupção ≥ 30 dias) é um retratamento e exige reavaliar a atividade da doença com baciloscopia e cultura antes de reintroduzir — em quem já tratou, o TRM-TB pode ficar positivo por DNA residual. O TRM-TB avalia a resistência à rifampicina: sem resistência, reinicia-se o esquema básico (RHZE), com cultura e teste de sensibilidade solicitados; com resistência à rifampicina, não se usa o esquema básico — encaminha-se à referência para o tratamento de TB resistente. A adesão é central: em quem abandonou (aqui, por uso de substâncias), o tratamento diretamente observado e o apoio psicossocial são essenciais.',
      pearls: [
        'Retorno após abandono = retratamento: confirme atividade com baciloscopia + cultura/TSA.',
        'TRM-TB pode ser falso-positivo por DNA residual em quem já tratou.',
        'Resistência à rifampicina → referência (não reinicie o esquema básico).'
      ],
      reference: 'Ministério da Saúde — Manual de Recomendações para o Controle da Tuberculose no Brasil, 2019.'
    }
  },

  /* ── 21. Luto — reação aguda de pesar ────────────────────── */
  {
    id: 'psiq-luto-agudo',
    theme: 'psiq',
    difficulty: 1,
    setting: 'UBS',
    diagnosis: 'Luto (reação aguda de pesar)',
    acceptedDifferentials: ['Luto', 'Reação de luto'],
    presentation: {
      vignette: 'Mulher de 52 anos chega ao acolhimento da UBS muito chorosa: há 3 dias perdeu o filho, vítima de atropelamento, e o encontrou na rua. Relata dificuldade para dormir e para se alimentar e dor emocional intensa. Após o acolhimento, fica mais calma, diz que não pensa em se matar, nunca foi atendida por psiquiatra nem usou medicamentos, mas sente que precisa de ajuda.',
      vitals: 'Perda do filho há 3 dias · sem ideação suicida · sem transtorno psiquiátrico prévio'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Acolher, validar o sofrimento e oferecer acompanhamento longitudinal pela equipe da UBS, sem medicalizar um luto agudo',
            quality: 'best',
            feedback: 'O luto agudo é uma reação normal; o cuidado é o acolhimento e o acompanhamento longitudinal na atenção primária, sem medicalizar.' },
          { text: 'Oferecer escuta e retorno próximo na UBS, monitorando a evolução do luto',
            quality: 'acceptable',
            feedback: 'A conduta é adequada; vale explicitar o acompanhamento longitudinal e os sinais de alarme que mudariam o plano.' },
          { text: 'Prescrever um inibidor de recaptação de serotonina para os sintomas',
            quality: 'poor',
            feedback: 'Poucos dias após a perda, os sintomas são de luto normal — antidepressivo não está indicado e medicaliza um processo esperado.' },
          { text: 'Prescrever benzodiazepínico contínuo para o sofrimento',
            quality: 'poor', dangerous: true,
            feedback: 'Benzodiazepínico de rotina no luto arrisca dependência e pode prejudicar o processo de elaboração — não trata o luto.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Sem ideação suicida nem transtorno prévio, como interpretar o quadro?',
        options: [
          { text: 'Luto agudo normal — a prioridade é o suporte e o acompanhamento, não a medicalização',
            quality: 'best',
            feedback: 'Insônia, inapetência e dor emocional poucos dias após uma perda são esperados; a resposta é suporte, não medicação.' },
          { text: 'Reação de luto esperada; acompanhar de perto e reavaliar a evolução',
            quality: 'acceptable',
            feedback: 'Correto; é luto normal — falta apenas nomear os sinais de alarme (ideação suicida, sintomas psicóticos, luto complicado) que indicariam encaminhar.' },
          { text: 'Episódio depressivo maior que exige antidepressivo imediato',
            quality: 'poor',
            feedback: 'Três dias após a perda não configuram depressão maior — os sintomas são compatíveis com o luto agudo.' },
          { text: 'Quadro que demanda seguimento psiquiátrico intensivo desde já',
            quality: 'poor',
            feedback: 'Sem risco nem transtorno prévio, o seguimento intensivo é desproporcional — o cuidado é na atenção primária.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Conduta adequada?',
        options: [
          { text: 'Acompanhar longitudinalmente na UBS, com apoio da equipe, encaminhando apenas se surgirem sinais de luto complicado ou risco',
            quality: 'best',
            feedback: 'O acompanhamento longitudinal pela equipe da atenção primária, com escuta e reavaliação, é a conduta — reservando encaminhamento para sinais de alarme.' },
          { text: 'Seguimento na UBS com escuta qualificada e reavaliação programada',
            quality: 'acceptable',
            feedback: 'Correto; falta apenas definir os critérios (risco, luto prolongado) que indicariam encaminhamento.' },
          { text: 'Encaminhar ao CAPS para seguimento intensivo com psiquiatra',
            quality: 'poor',
            feedback: 'O CAPS destina-se a transtornos mentais graves — para um luto agudo normal, é um encaminhamento desproporcional.' },
          { text: 'Encaminhar à psicologia da atenção secundária e encerrar o vínculo na UBS',
            quality: 'poor',
            feedback: 'Encerrar o vínculo com a atenção primária fragmenta o cuidado — é justamente a UBS que deve acompanhar de perto.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Avaliação do risco',
        body: 'Não há ideação suicida, sintomas psicóticos nem história psiquiátrica prévia. Os sintomas (insônia, inapetência, dor emocional intensa) são compatíveis com um luto agudo normal, poucos dias após uma perda traumática.' },
      { kind: 'evolution', title: 'Plano de cuidado',
        body: 'Combinado o acompanhamento longitudinal pela equipe da UBS, com escuta qualificada e reavaliação. Sinais de alerta — ideação suicida, sintomas psicóticos, luto prolongado/complicado — indicariam encaminhamento.' }
    ],
    debrief: {
      summary: 'O luto agudo é uma reação normal a uma perda: poucos dias após um óbito traumático, sintomas como insônia, inapetência e dor emocional intensa são esperados e não configuram, por si, um transtorno mental. A conduta é o acolhimento e o acompanhamento longitudinal pela equipe da atenção primária, com escuta qualificada — sem medicalizar (antidepressivos ou benzodiazepínicos de rotina não estão indicados e podem prejudicar a elaboração). O encaminhamento (CAPS/psiquiatria) reserva-se a sinais de alarme: ideação suicida, sintomas psicóticos ou luto complicado/prolongado.',
      pearls: [
        'Luto agudo normal → acolhimento e acompanhamento longitudinal na UBS.',
        'Não medicalize o luto: antidepressivo/benzodiazepínico de rotina não estão indicados.',
        'Encaminhe só diante de risco, sintomas psicóticos ou luto complicado.'
      ],
      reference: 'Ministério da Saúde — Saúde Mental na Atenção Básica; distinção luto normal vs. depressão (DSM-5).'
    }
  },

  /* ── 22. Polifarmácia e quedas no idoso ──────────────────── */
  {
    id: 'geriatria-polifarmacia-quedas',
    theme: 'geriatria',
    difficulty: 2,
    setting: 'Ambulatório de clínica médica',
    diagnosis: 'Quedas por hipotensão postural / polifarmácia',
    acceptedDifferentials: ['Hipotensão ortostática', 'Quedas no idoso'],
    presentation: {
      vignette: 'Mulher de 86 anos levada pela filha por quedas frequentes, mais na madrugada, ao levantar para o banheiro. Tem HAS, DM2, dislipidemia, depressão, déficit cognitivo leve e constipação. Usa losartana, hidroclorotiazida, atenolol, metformina, gliclazida, rosuvastatina, escitalopram, donepezila e lactulose. Ao exame, leve bradipsiquismo e sarcopenia; PA 138/92 deitada e 110/70 sentada.',
      vitals: 'PA 138/92 deitada → 110/70 sentada (hipotensão postural) · 9 medicamentos · sarcopenia'
    },
    decisions: [
      {
        id: 'd1', kind: 'initial', timeTarget: 25,
        prompt: 'Qual sua primeira conduta?',
        options: [
          { text: 'Reconhecer a hipotensão postural e revisar a polifarmácia, identificando os fármacos indutores de hipotensão e quedas',
            quality: 'best',
            feedback: 'A queda da PA ao mudar de posição, num paciente com 9 medicamentos, aponta causa iatrogênica — a prioridade é revisar a polifarmácia.' },
          { text: 'Avaliar as quedas e medir a PA em decúbito e ortostase para caracterizar a hipotensão postural',
            quality: 'acceptable',
            feedback: 'A caracterização está correta; o passo seguinte, que muda o desfecho, é revisar os fármacos que favorecem a hipotensão.' },
          { text: 'Solicitar avaliação oftalmológica para catarata como causa das quedas',
            quality: 'poor',
            feedback: 'A visão pode contribuir, mas a hipotensão postural iatrogênica é a causa evidente aqui — focar só na catarata deixa passar o principal.' },
          { text: 'Manter todos os medicamentos e apenas orientar a levantar-se devagar',
            quality: 'poor',
            feedback: 'Orientar cautela ajuda, mas manter intacta uma polifarmácia que causa a hipotensão não resolve a causa das quedas.' }
        ]
      },
      {
        id: 'd2', kind: 'interpretation', timeTarget: 25,
        prompt: 'Hipotensão postural num idoso com 9 medicamentos — o que direciona a conduta?',
        options: [
          { text: 'A causa é multifatorial e iatrogênica — a prioridade é desprescrever/ajustar os fármacos indutores de hipotensão',
            quality: 'best',
            feedback: 'Diurético, betabloqueador, anti-hipertensivos e ISRS favorecem a hipotensão postural; a desprescrição criteriosa é a conduta central.' },
          { text: 'Rever a necessidade e as doses dos anti-hipertensivos e psicotrópicos que favorecem a hipotensão',
            quality: 'acceptable',
            feedback: 'Correto; é a mesma direção — revisar os fármacos que reduzem a PA e sedam, ajustando doses e indicações.' },
          { text: 'Encaminhar ao neurologista para investigar disautonomia antes de qualquer ajuste',
            quality: 'poor',
            feedback: 'Investigar disautonomia antes de rever a polifarmácia inverte a ordem — a causa iatrogênica é a mais provável e reversível.' },
          { text: 'Adicionar um fármaco para elevar a PA e compensar as quedas',
            quality: 'poor',
            feedback: 'Somar um fármaco a uma polifarmácia que já causa o problema trata o sintoma e aumenta a iatrogenia.' }
        ]
      },
      {
        id: 'd3', kind: 'final', timeTarget: 25,
        prompt: 'Plano terapêutico apropriado?',
        options: [
          { text: 'Rever a polifarmácia para reduzir os fármacos indutores de hipotensão, com metas de PA e glicemia individualizadas para a idade e medidas de prevenção de quedas',
            quality: 'best',
            feedback: 'A desprescrição criteriosa, metas individualizadas no muito idoso e prevenção de quedas atacam a causa e reduzem o risco.' },
          { text: 'Desprescrever/ajustar os anti-hipertensivos e psicotrópicos que favorecem a hipotensão e reforçar a prevenção de quedas',
            quality: 'acceptable',
            feedback: 'Correto; falta apenas explicitar a individualização das metas de PA e glicemia para a idade.' },
          { text: 'Adicionar fludrocortisona para elevar os níveis tensionais',
            quality: 'poor', dangerous: true,
            feedback: 'Adicionar fludrocortisona a uma polifarmácia causa retenção hídrica, piora a HAS deitada e soma iatrogenia — trata o sintoma e ignora a causa.' },
          { text: 'Encaminhar ao oftalmologista e manter todos os medicamentos',
            quality: 'poor',
            feedback: 'Manter a polifarmácia que causa a hipotensão perpetua as quedas — o eixo do cuidado é a desprescrição.' }
        ]
      }
    ],
    reveals: [
      { kind: 'exam', title: 'Caracterização',
        body: 'A queda da PA de 138/92 (deitada) para 110/70 (sentada) confirma hipotensão postural. A paciente usa vários fármacos que a favorecem (diurético, betabloqueador, outro anti-hipertensivo, ISRS), e as quedas na madrugada ao levantar são típicas.' },
      { kind: 'evolution', title: 'Plano terapêutico',
        body: 'Iniciada a revisão da polifarmácia (desprescrição) — reavaliar diurético, betabloqueador e a intensidade do controle pressórico e glicêmico no muito idoso —, com medidas não farmacológicas para a hipotensão postural e prevenção de quedas.' }
    ],
    debrief: {
      summary: 'As quedas no idoso são multifatoriais, e a polifarmácia é uma das causas mais importantes e reversíveis. Nesta paciente, a hipotensão postural (queda da PA da posição deitada para sentada) explica as quedas ao levantar, favorecida por diurético, betabloqueador, anti-hipertensivos e ISRS. A conduta é revisar a polifarmácia (desprescrição), reduzindo os fármacos indutores de hipotensão e individualizando as metas de PA e glicemia para a idade, além de medidas de prevenção de quedas. Adicionar fármacos como a fludrocortisona para "elevar a pressão" trata o sintoma, soma iatrogenia (retenção hídrica, piora da HAS) e ignora a causa.',
      pearls: [
        'Quedas no idoso: pense em hipotensão postural e polifarmácia (causa reversível).',
        'A conduta é desprescrever os fármacos indutores de hipotensão, não adicionar outro.',
        'Individualize as metas de PA e glicemia no muito idoso.'
      ],
      reference: 'Sociedade Brasileira de Geriatria e Gerontologia — Quedas e Desprescrição; Critérios de Beers.'
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
  'infecto-choque-septico-neutropenico',
  'neuro-parkinson-inicial',
  'neuro-avci-trombolise-contraindicada',
  'gi-neoplasia-cabeca-pancreas',
  'ped-febre-reumatica',
  'psiq-anorexia-instabilidade',
  'go-hipertensao-cronica-gestacao',
  'endo-insensibilidade-androgenica',
  'cardio-has-idoso-expectante',
  'infecto-prep-pep-exposicao',
  'reumato-lombalgia-mecanica',
  'ped-fimose-patologica',
  'pneumo-tuberculose-retratamento',
  'psiq-luto-agudo',
  'geriatria-polifarmacia-quedas'
];

/* ── DIAGNÓSTICO DIGITADO (por caso) ──────────────────────────
   Dados da etapa de hipótese. Correção editorial: canonical +
   acceptedAnswers (aceitos), partialAnswers (reconhece mas pede
   especificar) e pistas progressivas. Casos sem entrada aqui não
   têm etapa de diagnóstico (ex.: prevenção pós-IAM, cujo dx já
   vem na vinheta). */
var DX_BY_CASE = {
  'cardio-icfer-gdmt': {
    canonical: 'insuficiência cardíaca com fração de ejeção reduzida',
    acceptedAnswers: ['icfer', 'ic fer', 'insuficiência cardíaca sistólica', 'ic sistólica', 'ic com fração de ejeção reduzida', 'insuficiência cardíaca com fe reduzida'],
    partialAnswers: ['insuficiência cardíaca', 'ic'],
    hints: ['Pense em uma síndrome cardíaca estrutural.', 'A fração de ejeção vai classificar o quadro.']
  },
  'ped-atr-lactente': {
    canonical: 'acidose tubular renal',
    acceptedAnswers: ['atr', 'acidose tubular renal distal', 'atr distal', 'atr tipo 1'],
    partialAnswers: ['acidose metabólica'],
    hints: ['Lactente com acidose, potássio baixo e crescimento ruim.', 'Um raquitismo que não melhora com vitamina D aponta para a origem renal.']
  },
  'trauma-tce-queda': {
    canonical: 'traumatismo cranioencefálico',
    acceptedAnswers: ['tce', 'trauma cranioencefálico', 'traumatismo craniano'],
    partialAnswers: ['trauma'],
    hints: ['Mecanismo de alto risco com rebaixamento.', 'Amnésia do evento é um achado importante.']
  },
  'go-endometriose': {
    canonical: 'endometriose',
    acceptedAnswers: ['endometriose pélvica'],
    partialAnswers: ['dor pélvica crônica'],
    dangerousAnswers: [],
    hints: ['Pense numa dor pélvica com padrão cíclico, ligada ao ciclo menstrual.', 'A dispareunia profunda e a dor à mobilização do colo sugerem tecido endometrial fora do útero.']
  },
  'psiq-distonia-aguda': {
    canonical: 'distonia aguda',
    acceptedAnswers: ['reação distônica aguda', 'distonia', 'reação extrapiramidal aguda'],
    partialAnswers: ['reação extrapiramidal'],
    hints: ['Efeito do antipsicótico, poucos dias após a troca.', 'Torcicolo com desvio do olhar (crise oculógira).']
  },
  'reumato-artrite-reumatoide': {
    canonical: 'artrite reumatoide',
    acceptedAnswers: ['ar', 'poliartrite reumatoide'],
    partialAnswers: ['artrite', 'poliartrite'],
    hints: ['Poliartrite simétrica com rigidez matinal prolongada.', 'Acomete pequenas articulações das mãos.']
  },
  'infecto-choque-septico-neutropenico': {
    canonical: 'choque séptico',
    acceptedAnswers: ['sepse com choque', 'choque septico'],
    partialAnswers: ['sepse', 'sepse grave'],
    hints: ['Neutropenia febril com hipotensão e lactato alto.', 'Sepse com disfunção cardiovascular.']
  },
  'neuro-parkinson-inicial': {
    canonical: 'doença de parkinson',
    acceptedAnswers: ['parkinson', 'doenca de parkinson', 'parkinsonismo idiopatico'],
    partialAnswers: ['parkinsonismo', 'sindrome parkinsoniana'],
    hints: ['Distúrbio do movimento assimétrico e de início insidioso num idoso.', 'Tremor de repouso, rigidez e bradicinesia juntos são a marca da doença.']
  },
  'gi-neoplasia-cabeca-pancreas': {
    canonical: 'neoplasia de cabeça de pâncreas',
    acceptedAnswers: ['cancer de cabeca de pancreas', 'tumor de cabeca de pancreas', 'neoplasia periampular', 'adenocarcinoma de pancreas', 'cancer de pancreas'],
    partialAnswers: ['ictericia obstrutiva', 'neoplasia de pancreas', 'tumor periampular'],
    hints: ['Idoso com icterícia indolor, colúria e emagrecimento — pense em obstrução maligna.', 'Vesícula palpável e indolor com icterícia (sinal de Courvoisier) aponta tumor periampular.']
  },
  'ped-febre-reumatica': {
    canonical: 'febre reumática',
    acceptedAnswers: ['febre reumatica aguda', 'doenca reumatica'],
    partialAnswers: ['poliartrite migratoria', 'cardite reumatica'],
    hints: ['Criança com poliartrite migratória e febre após dor de garganta.', 'Artrite migratória com sopro cardíaco novo semanas depois de uma faringite.']
  },
  'psiq-anorexia-instabilidade': {
    canonical: 'anorexia nervosa',
    acceptedAnswers: ['anorexia', 'transtorno alimentar restritivo'],
    partialAnswers: ['transtorno alimentar', 'disturbio alimentar'],
    hints: ['Jovem com perda de peso intensa e voluntária, ainda querendo emagrecer.', 'Restrição alimentar com IMC muito baixo, amenorreia e medo de ganhar peso.']
  },
  'endo-insensibilidade-androgenica': {
    canonical: 'insensibilidade androgenica',
    acceptedAnswers: ['sindrome de insensibilidade androgenica', 'sindrome de morris', 'insensibilidade androgenica completa', 'sindrome de insensibilidade aos androgenos'],
    partialAnswers: ['disturbio da diferenciacao sexual', 'dds'],
    hints: ['Amenorreia primária com mamas desenvolvidas, mas pelos sexuais muito escassos.', 'Fenótipo feminino sem útero e com pouca resposta androgênica, apesar de gônadas presentes.']
  }
};

/* Converte o formato {decisions, reveals} em stages[] genérico.
   Ordem: diagnóstico → d1 → reveal0 → d2 → reveal1 → d3. */
function toStages(c) {
  if (c.stages) return c.stages;
  var stages = [];
  var dx = DX_BY_CASE[c.id];
  if (dx) {
    var d = { type: 'diagnosis', maxAttempts: 3 };
    for (var k in dx) if (dx.hasOwnProperty(k)) d[k] = dx[k];
    stages.push(d);
  }
  var reveals = c.reveals || [];
  (c.decisions || []).forEach(function (dec, i) {
    var st = { type: 'decision' };
    for (var kk in dec) if (dec.hasOwnProperty(kk)) st[kk] = dec[kk];
    stages.push(st);
    if (reveals[i]) {
      var rv = { type: 'reveal' };
      for (var rk in reveals[i]) if (reveals[i].hasOwnProperty(rk)) rv[rk] = reveals[i][rk];
      stages.push(rv);
    }
  });
  return stages;
}

function getCaseById(id) {
  for (var i = 0; i < DAILY_CASES.length; i++) {
    if (DAILY_CASES[i].id === id) {
      var c = DAILY_CASES[i];
      if (!c.stages) c.stages = toStages(c); // converte 1x e cacheia no objeto
      return c;
    }
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
window.DX_BY_CASE = DX_BY_CASE;
window.toStages = toStages;
window.getCaseById = getCaseById;
window.activeQueue = activeQueue;
