// ============================================================
//  cases.js — Banco de casos do Conduta.
//  Para adicionar um novo caso: copie o bloco abaixo e cole
//  antes do "];" final do array CASES.
//
//  Estrutura de cada caso:
//  {
//    diagnosis: "Nome do diagnóstico",
//    aliases: ["variação 1", "variação 2"],  // termos aceitos como resposta
//    cid: "X00",
//    category: "Especialidade",
//    clues: [
//      "Pista 1 — vaga (queixa/idade/sexo)",
//      "Pista 2 — evolução dos sintomas",
//      "Pista 3 — história prévia / exposição",
//      "Pista 4 — imagem e labs",
//      "Pista 5 — exame confirmatório (mata-mata)"
//    ],
//    clue_labels: ["Label1","Label2","Label3","Label4","Label5"],
//    explanation: "Discussão clínica resumida.",
//    reference: "Referência bibliográfica.",
//    difficulty: 1  // 1=Fácil, 2=Médio, 3=Difícil
//  }
// ============================================================

const CASES = [
  {id:1,diagnosis:"Dengue",aliases:["dengue clássica","febre do dengue","dengue com sinais de alarme"],cid:"A90",category:"Infectologia",
  clues:[
    "Mulher, 28 anos, previamente hígida, procura UBS referindo febre há 3 dias, cansaço intenso e dor de cabeça que piora ao movimentar os olhos. Não consegue trabalhar.",
    "A febre atinge 39,5°C com pouca resposta a antitérmicos. Surgem dores musculares intensas e articulares difusas. Sem tosse, sem coriza, sem sintomas urinários.",
    "Mora em Campinas-SP. Vizinhos com quadro semelhante nas últimas 2 semanas. Município em alerta epidemiológico. Não viajou recentemente. Sem histórico de doença prévia relevante.",
    "Hemograma: leucócitos 3.200/mm³, plaquetas 98.000/mm³, hematócrito 38%. Exame físico revela rubor facial e exantema maculopapular em tronco. Prova do laço: positiva.",
    "NS1 Ag positivo no 3º dia de doença. IgM anti-dengue reagente. PCR confirma sorotipo DENV-3 em circulação no município."
  ],
  clue_labels:["Apresentação inespecífica","Evolução dos sintomas","História epidemiológica","Exame físico e hemograma","Confirmação sorológica"],
  explanation:"Dengue é arbovirose transmitida pelo Aedes aegypti. O quadro inicial é inespecífico — febre, mialgia e cefaleia — o que dificulta o diagnóstico precoce. A dor retro-orbital e o exantema aparecem depois. Leucopenia e trombocitopenia são marcadores laboratoriais característicos. A classificação de risco do MS orienta o manejo. Tratamento sintomático.",
  reference:"Ministério da Saúde. Dengue: diagnóstico e manejo clínico. 5ª ed. 2016. PAHO/WHO Guidelines 2009.",difficulty:1},

  {id:2,diagnosis:"Leptospirose",aliases:["doença de weil","febre dos arrozais"],cid:"A27",category:"Infectologia",
  clues:[
    "Homem, 34 anos, atendido no PS com febre, cefaleia intensa e mialgia há 5 dias, com piora progressiva. Está prostrado e mal consegue caminhar.",
    "No 6º dia surgem icterícia leve e oligúria. Dor lombar bilateral. Paciente refere que a urina ficou escura. Febre persiste em 39,8°C.",
    "Trabalha como gari em São Paulo. Há 8 dias, atuou na remoção de entulho após enchente, com contato direto com água de inundação por horas. Sem uso de EPI.",
    "Creatinina 2,8 → 4,1 mg/dL em 24h. Bilirrubina total 4,2 mg/dL (direta). CPK 2.400 U/L. Plaquetas 68.000/mm³. Urina: cilindros granulosos, piúria. Rx tórax: infiltrado bilateral.",
    "MAT (microaglutinação) reagente 1:400 para sorogrupo Icterohaemorrhagiae. Sufusão hemorrágica conjuntival ao exame — achado patognomônico. Hemocultura positiva em fase aguda."
  ],
  clue_labels:["Síndrome febril inespecífica","Evolução com disfunção orgânica","Exposição ocupacional","Imagem e laboratório","Sorologia confirmatória"],
  explanation:"Leptospirose é zoonose endêmica no Brasil, especialmente em períodos chuvosos. A forma grave (Síndrome de Weil) cursa com insuficiência renal, icterícia e diátese hemorrágica. A sufusão conjuntival é achado patognomônico. Diagnóstico confirmado pela MAT. Tratamento: penicilina cristalina (grave) ou doxiciclina (leve).",
  reference:"MS Brasil. Guia de Vigilância em Saúde: Leptospirose, 2017. Bharti AR et al. Lancet Infect Dis 2003.",difficulty:2},

  {id:3,diagnosis:"Doença de Chagas",aliases:["tripanossomíase americana","chagas agudo","chagas"],cid:"B57",category:"Infectologia",
  clues:[
    "Criança, 6 anos, levada à UBS por febre persistente há 15 dias, cansaço fácil e inchaço ao redor do olho esquerdo. Mãe acha que foi picada de inseto.",
    "O edema palpebral esquerdo é indolor, não pruriginoso, sem sinais de celulite. A febre é vespertina e irregular. A criança está cada vez mais prostrada.",
    "Família mora no interior da Bahia, em casa de adobe. Há 3 semanas encontraram um inseto grande e achatado (barbeiro) no quarto. Sem histórico de doença prévia.",
    "Ao exame: hepatoesplenomegalia, adenopatia generalizada, ECG com bloqueio de ramo direito de 1º grau. Esfregaço de sangue periférico: formas tripomastigotas visualizadas.",
    "Sorologia: IgG e IgM por imunofluorescência indireta e ELISA ambos reagentes para Trypanosoma cruzi. Xenodiagnóstico positivo."
  ],
  clue_labels:["Febre e edema palpebral","Caracterização do edema","Histórico e exposição vetorial","Exame físico e parasitoscopia","Sorologia confirmatória"],
  explanation:"Doença de Chagas aguda tem como marca o sinal de Romaña (edema bipalpebral unilateral indolor) quando a porta de entrada é conjuntival. É doença de notificação compulsória. O diagnóstico agudo é feito pelo encontro do parasita no sangue. Tratamento com benznidazol indicado na fase aguda.",
  reference:"Rassi A Jr et al. Chagas disease. Lancet 2010. MS Brasil - Consensus on Chagas Disease. Rev Soc Bras Med Trop 2020.",difficulty:2},

  {id:4,diagnosis:"Tuberculose Pulmonar",aliases:["tuberculose","tb pulmonar","tb"],cid:"A15",category:"Pneumologia / Infectologia",
  clues:[
    "Homem, 42 anos, procura UBS com tosse há 3 semanas. Refere que a tosse começou seca e agora é produtiva. Está muito cansado e sem apetite.",
    "Perde peso sem fazer dieta — emagreceu 7 kg em 2 meses. Tosse noturna com sudorese que molha o lençol. Expectoração com estrias avermelhadas esporadicamente.",
    "Etilista, mora em albergue no centro de São Paulo com 40 pessoas. Contato com colega de quarto que teve diagnóstico de TB há 4 meses e foi transferido para hospital.",
    "Radiografia de tórax: infiltrado em lobo superior direito com área de cavitação. Adenopatia hilar discreta. PPD = 18 mm. BAAR em escarro: 2+ em 2 de 3 amostras.",
    "Cultura em Löwenstein-Jensen: crescimento de Mycobacterium tuberculosis. Teste de sensibilidade: sensível a rifampicina, isoniazida, pirazinamida e etambutol."
  ],
  clue_labels:["Tosse inespecífica","Síndrome consuntiva","Histórico e contato","Imagem e baciloscopia","Cultura confirmatória"],
  explanation:"Tuberculose pulmonar é a forma mais comum (85% dos casos). A tríade tosse > 3 semanas + sudorese noturna + emagrecimento deve sempre levantar suspeita. Cavitação em lobo superior é clássica. O diagnóstico definitivo é pela cultura. Tratamento: RHZE por 2 meses, depois RH por 4 meses. Notificação compulsória.",
  reference:"MS Brasil - Manual de Recomendações para o Controle da Tuberculose, 2019. WHO Treatment Guidelines 2022.",difficulty:1},

  {id:5,diagnosis:"Infarto Agudo do Miocárdio com Supra de ST",aliases:["iamcsst","iam com supra","infarto","iamcst"],cid:"I21",category:"Cardiologia",
  clues:[
    "Homem, 58 anos, acorda às 3h com desconforto no peito descrito como 'peso' e 'aperto'. Tomou omeprazol achando que era azia, mas a dor não passou.",
    "Após 40 minutos a dor irradia para o braço esquerdo e mandíbula. Surge sudorese fria, palidez e náusea intensa. Chama o SAMU.",
    "Hipertenso há 10 anos, diabético tipo 2, tabagista (30 maços-ano). Pai faleceu de infarto aos 55 anos. PA: 145/92 mmHg. FC: 102 bpm. SatO₂: 94%.",
    "ECG imediato: supradesnivelamento de ST ≥ 2mm em V1–V4, com imagem em espelho em derivações inferiores. Bloqueio de ramo esquerdo novo. Troponina I ultrassensível: 8.200 pg/mL.",
    "Cateterismo de urgência: oclusão total trombótica da artéria descendente anterior proximal. ICP primária com stent farmacológico. FEVE pós-procedimento: 42%."
  ],
  clue_labels:["Desconforto torácico noturno","Irradiação e sintomas vegetativos","Fatores de risco e vitais","ECG e biomarcadores","Cateterismo (diagnóstico definitivo)"],
  explanation:"IAM com supra é emergência médica. O diagnóstico é eletrocardiográfico — supra de ST em derivações contíguas ou BRE novo. A reperfusão de escolha é ICP primária em até 90 min do primeiro contato médico (door-to-balloon). Anticoagulação e dupla antiagregação são pilares do tratamento.",
  reference:"SBC - Diretriz de Síndromes Coronarianas Agudas, 2021. Ibanez B et al. ESC Guidelines 2017.",difficulty:1},

  {id:6,diagnosis:"Acidente Vascular Cerebral Isquêmico",aliases:["avc isquêmico","avc","avci","isquemia cerebral"],cid:"I63",category:"Neurologia",
  clues:[
    "Mulher, 67 anos, é encontrada pelo marido pela manhã com dificuldade para falar e braço direito caído. Estava bem quando foram dormir às 23h.",
    "A fala é incompreensível — não consegue nomear objetos nem repetir frases. O marido percebe que o canto direito da boca está caído. Chega ao PS às 8h20.",
    "Histórico de fibrilação atrial diagnosticada há 2 anos, em uso irregular de warfarina ('tomo quando lembro'). Hipertensa. PA: 185/100 mmHg. Sem trauma recente.",
    "TC de crânio sem contraste: sem hemorragia. Hipodensidade incipiente em território de ACM esquerda (sinal precoce). NIHSS = 14. INR colhido: 1,3.",
    "Angiotomografia cerebral: oclusão de artéria cerebral média esquerda no segmento M1. Tempo porta-imagem: 28 min. Janela de 4h30 disponível. rt-PA administrado."
  ],
  clue_labels:["Déficit focal ao acordar","Caracterização do déficit","Histórico e anticoagulação","Neuroimagem e NIHSS","Angiotomografia (oclusão)"],
  explanation:"AVC isquêmico é emergência tempo-dependente. O onset ao acordar dificulta o cálculo da janela — considera-se o último momento visto normal. A FA com anticoagulação inadequada é fator de risco maior. A trombólise IV deve ser feita em até 4h30 se critérios preenchidos. Trombectomia mecânica até 24h em casos selecionados.",
  reference:"Pontes-Neto OM et al. Diretrizes Brasileiras de AVC. Arq Neuropsiquiatr 2009. Powers WJ et al. AHA/ASA 2019.",difficulty:2},

  {id:7,diagnosis:"Meningite Bacteriana",aliases:["meningite meningocócica","meningite por pneumococo","meningite"],cid:"G00",category:"Neurologia / Infectologia",
  clues:[
    "Adolescente, 17 anos, é trazido pelos pais ao PS às 2h da manhã com febre e 'a pior dor de cabeça da vida'. Vômitou duas vezes no caminho.",
    "Ao chegar: febre 40°C, fotofobia intensa, não consegue dobrar o pescoço. Está confuso e responde mal às perguntas. Glasgow 12.",
    "Estudante do 2º ano do ensino médio. Dois colegas de turma tiveram febre e internaram na semana passada. Nenhum foi vacinado contra meningococo B.",
    "Exame de pele: petéquias em pernas e tronco que aumentam de tamanho durante a avaliação. Punção lombar: LCR turvo, 2.400 células (98% neutrófilos), glicose 22 mg/dL, proteína 380 mg/dL.",
    "Gram do LCR: diplococos gram-negativos intracelulares. Cultura: Neisseria meningitidis sorogrupo B. PCR positivo. Hemocultura também positiva."
  ],
  clue_labels:["Cefaleia e febre aguda","Sinais meníngeos","Contexto epidemiológico","Exantema e liquor","Microbiologia confirmatória"],
  explanation:"Meningite meningocócica é emergência com risco de vida. A tríade febre + cefaleia + rigidez de nuca é clássica. A púrpura extensiva sugere meningococcemia com risco de choque. Penicilina cristalina deve ser iniciada imediatamente após a PL. Quimioprofilaxia dos contatos com rifampicina. Notificação imediata.",
  reference:"MS Brasil - Protocolo de Tratamento da Doença Meningocócica, 2019. van de Beek D et al. NEJM 2006.",difficulty:1},

  {id:8,diagnosis:"Apendicite Aguda",aliases:["apendicite","apendicite perfurada"],cid:"K35",category:"Cirurgia / Abdome Agudo",
  clues:[
    "Homem, 22 anos, procura UPA com dor abdominal que começou difusa há 18 horas. 'Parece cólica, mas não passa.' Sem diarreia, sem vômito até o momento.",
    "Nas últimas 6 horas a dor migrou para o lado direito do abdome e ficou localizada. Qualquer movimento piora. Surgem náuseas e vômito bilioso. Temperatura 38,1°C.",
    "Sem doenças prévias, sem cirurgias anteriores. Última refeição normal foi 24h atrás, mas perdeu o apetite. Nega ingesta de alimentos suspeitos.",
    "Exame: ponto de McBurney positivo, sinal de Blumberg positivo, psoas positivo. Leucócitos 14.800/mm³ com bastões 12%. PCR 48 mg/L. Score de Alvarado: 9.",
    "Ultrassonografia: apêndice com 12 mm de diâmetro, paredes espessadas, incompressível, com líquido livre periapendicular. TC confirmou sem perfuração."
  ],
  clue_labels:["Dor abdominal inespecífica","Migração e localização da dor","Histórico negativo relevante","Exame físico e laboratório","Imagem confirmatória"],
  explanation:"Apendicite aguda é a causa mais comum de abdome agudo cirúrgico. A migração da dor periumbilical para FID em horas é clássica. O escore de Alvarado ≥ 7 tem alta sensibilidade. A ultrassonografia é o primeiro exame de imagem; TC para casos duvidosos. Tratamento: apendicectomia laparoscópica com antibioticoprofilaxia.",
  reference:"Di Saverio S. WSES Guidelines 2020. Ferris M et al. Cochrane Review 2017.",difficulty:1},

  {id:9,diagnosis:"Cetoacidose Diabética",aliases:["cad","cetoacidose","descompensação diabética"],cid:"E11.1",category:"Endocrinologia",
  clues:[
    "Mulher, 19 anos, é trazida ao PS pelo namorado em estado de confusão e dificuldade para responder. Estava bem ontem à noite mas acordou muito mal.",
    "Ao exame: respiração rápida, profunda e ruidosa. Hálito com odor adocicado incomum. Mucosas secas, turgor cutâneo diminuído. PA 90/60 mmHg, FC 128 bpm, FR 32 irpm.",
    "Diabética tipo 1 desde os 12 anos. Namorado conta que ela ficou sem insulina por 3 dias por dificuldades financeiras. Não usou análogos alternativos.",
    "Glicemia: 487 mg/dL. Gasometria: pH 7,12, HCO₃ 8 mEq/L, pCO₂ 22 mmHg. Ânion gap: 24. Cetonúria 3+ na fita. Potássio sérico: 5,8 mEq/L.",
    "Cetonemia (beta-hidroxibutirato): 6,2 mmol/L. Diagnóstico de CAD grave confirmado pelos três critérios: hiperglicemia + acidose metabólica + cetonemia."
  ],
  clue_labels:["Rebaixamento de consciência","Respiração e exame físico","Histórico de omissão de insulina","Gasometria e glicemia","Cetonemia confirmatória"],
  explanation:"CAD é complicação aguda grave do DM tipo 1. A respiração de Kussmaul é compensação respiratória da acidose metabólica. Tríade: hiperglicemia + acidose + cetonemia. Tratamento: hidratação EV vigorosa, insulina regular EV após K > 3,5, reposição de K e tratar causa precipitante.",
  reference:"SBD - Diretrizes da Sociedade Brasileira de Diabetes 2022-2023. Kitabchi AE et al. Diabetes Care 2009.",difficulty:2},

  {id:10,diagnosis:"Pré-eclâmpsia",aliases:["pre-eclampsia","préeclâmpsia","hipertensão na gravidez"],cid:"O14",category:"Ginecologia e Obstetrícia",
  clues:[
    "Gestante, 24 anos, primigesta, 34 semanas, comparece ao pré-natal com queixa de inchaço nas mãos e rosto que piorou muito nos últimos 5 dias.",
    "Relata cefaleia occipital persistente 'como uma pressão na nuca' e episódios de 'luzes piscando' na visão. Pressão arterial: 158/102 mmHg em duas medições com 6h de intervalo.",
    "Gestação sem intercorrências até a 30ª semana. Sem histórico de hipertensão prévia. Mãe teve pré-eclâmpsia. Ganho de 4 kg na última semana.",
    "Proteinúria 24h: 780 mg. TGO/TGP 3x o limite. LDH 680 U/L. Plaquetas 98.000/mm³. Haptoglobina diminuída. Critérios de síndrome HELLP presentes.",
    "Doppler obstétrico: índice de resistência elevado em artérias uterinas e umbilicais. Crescimento fetal abaixo do percentil 10. Conduta: sulfato de magnésio e resolução da gestação."
  ],
  clue_labels:["Edema gestacional","Sintomas de alerta e PA","Histórico e fatores de risco","Laboratório (HELLP)","Doppler e conduta"],
  explanation:"Pré-eclâmpsia é definida por PA ≥ 140/90 mmHg após 20 semanas + proteinúria ou disfunção de órgão-alvo. A HELLP é complicação grave. Sintomas como cefaleia e escotomas indicam eminência de eclâmpsia. Tratamento definitivo: parto. Sulfato de magnésio para profilaxia de convulsões.",
  reference:"FEBRASGO - Pré-eclâmpsia. Diretrizes Clínicas 2018. ACOG Practice Bulletin 2020.",difficulty:2},

  {id:11,diagnosis:"Pneumonia Comunitária",aliases:["pneumonia","pac","pneumonia adquirida na comunidade"],cid:"J18",category:"Pneumologia",
  clues:[
    "Homem, 55 anos, procura UPA com febre e tosse produtiva há 4 dias. Inicialmente achava que era gripe mas piorou, com dor no peito que piora ao respirar fundo.",
    "Febre 38,8°C. Tosse com expectoração amarelo-esverdeada. Dispneia aos pequenos esforços desde ontem. Ausculta: crepitações em base direita com egofonia.",
    "Diabético tipo 2 há 8 anos, tabagista (20 maços-ano). FR 26 irpm, SatO₂ 93% em ar ambiente, FC 110 bpm. Está confuso e desorientado no tempo.",
    "Radiografia de tórax: consolidação lobar em lobo inferior direito com broncograma aéreo. Leucócitos 18.400/mm³ com desvio. PCR 148 mg/L. Ureia 52 mg/dL.",
    "Score CURB-65 = 3 (confusão + ureia > 50 + FR ≥ 30). Antígeno urinário de Streptococcus pneumoniae: positivo. Hemocultura coletada antes dos antibióticos."
  ],
  clue_labels:["Tosse e febre","Achados pulmonares","Comorbidades e gravidade","Imagem e laboratório","Score e agente etiológico"],
  explanation:"PAC é a 4ª causa de morte no Brasil. O CURB-65 estratifica a gravidade: ≥ 3 indica internação e possível UTI. O antígeno urinário de pneumococo é rápido e específico. Tratamento em internados: beta-lactâmico + macrolídeo. Iniciar antibiótico em até 4h do diagnóstico.",
  reference:"SBPT - Diretrizes Brasileiras de Pneumonia, 2009. Mandell LA et al. Clin Infect Dis 2007.",difficulty:1},

  {id:12,diagnosis:"Insuficiência Cardíaca Descompensada",aliases:["insuficiência cardíaca","ic descompensada","icc"],cid:"I50",category:"Cardiologia",
  clues:[
    "Homem, 72 anos, chega ao PS com falta de ar progressiva há 5 dias, piora ao deitar e inchaço nas pernas. Diz que 'o coração já era fraco antes'.",
    "Ganhou 4 kg na última semana. Precisa de 3 travesseiros para dormir. Acorda sufocando à noite. Em uso de enalapril e furosemida — mas parou de pesar diariamente.",
    "Histórico de doença de Chagas diagnosticada há 15 anos. Miocardiopatia dilatada chagásica conhecida. Ex-morador de zona rural no Nordeste. Nega etilismo.",
    "Exame: B3 presente, crepitações bibasais, turgência jugular a 45°, hepatomegalia dolorosa, edema 3+ em MMII. Rx tórax: cardiomegalia, linhas B de Kerley, derrame pleural bilateral. BNP = 1.840 pg/mL.",
    "Ecocardiograma: FEVE 28% (reduzida), dilatação de VE, insuficiência mitral funcional moderada, padrão diastólico restritivo — compatível com miocardiopatia dilatada avançada."
  ],
  clue_labels:["Dispneia progressiva","Retenção de fluidos","Histórico de cardiopatia chagásica","Exame físico e imagem","Ecocardiograma confirmatório"],
  explanation:"IC com FE reduzida é síndrome frequente. A etiologia chagásica é prevalente no Norte e Nordeste brasileiro. BNP > 400 pg/mL confirma descompensação. Tratamento: furosemida EV, IECA/BRA, betabloqueador, ARM e SGLT2i conforme tolerância. Monitorar balanço hídrico.",
  reference:"Rohde LE et al. Diretriz Brasileira de IC, 2018. McDonagh TA et al. ESC Guidelines 2021.",difficulty:2},

  {id:13,diagnosis:"Tromboembolia Pulmonar",aliases:["tep","embolia pulmonar","tromboembolismo pulmonar"],cid:"I26",category:"Pneumologia / Cardiologia",
  clues:[
    "Mulher, 45 anos, chega ao PS com falta de ar súbita que iniciou há 2 horas enquanto assistia TV. Nega febre. Refere dor no lado direito do peito que piora ao respirar.",
    "Tosse seca com escarros com sangue. SatO₂ 89% em ar ambiente. FC 118 bpm. Dor e inchaço em panturrilha esquerda há 3 dias, que ignorou.",
    "Submetida a artroplastia total de quadril há 8 dias. Ficou 5 dias no leito hospitalar sem profilaxia anticoagulante adequada por 'contraindicação documentada'.",
    "ECG: taquicardia sinusal, padrão S1Q3T3. Gasometria: PaO₂ 62 mmHg, hipocapnia. D-dímero > 4.000 ng/mL. Score de Wells: 7,5 (alta probabilidade). Eco: VD dilatado com McConnell positivo.",
    "Angiotomografia de tórax: defeitos de enchimento em artéria pulmonar principal direita e ramos lobares bilaterais. Doppler de MMII: TVP em veia poplítea esquerda confirmada."
  ],
  clue_labels:["Dispneia súbita","Hemoptise e sinais clínicos","Fator de risco cirúrgico","ECG, gasometria e escores","Angiotomografia (padrão-ouro)"],
  explanation:"TEP é emergência com mortalidade elevada se não tratada. A tríade clássica (dispneia + dor pleurítica + hemoptise) está presente em < 30% dos casos. O Wells estratifica probabilidade pré-teste. A angio-TC é o padrão-ouro. Tratamento: anticoagulação plena; trombólise em instabilidade hemodinâmica.",
  reference:"SBC - Diretriz de Embolia Pulmonar, 2016. Konstantinides SV et al. ESC Guidelines 2019.",difficulty:2},

  {id:14,diagnosis:"Malária por Plasmodium falciparum",aliases:["malária","malária falciparum","malária grave"],cid:"B50",category:"Infectologia",
  clues:[
    "Homem, 31 anos, dá entrada no PS com febre há 5 dias, calafrios, dor de cabeça intensa e vômitos repetidos. Está muito fraco e confuso.",
    "A febre não segue padrão fixo — não é terçã nem quartã, é contínua e alta (40°C). Está com icterícia discreta. Baço palpável a 3 cm do rebordo costal.",
    "Trabalhou em garimpo clandestino no interior do Pará nos últimos 2 meses. Retornou há 8 dias. Não realizou profilaxia antimalárica. Sem viagem internacional.",
    "Glasgow 12. Urina com coloração escura ('coca-cola'). Glicemia 48 mg/dL. Plaquetas 28.000/mm³. Bilirrubinas elevadas. Esfregaço de sangue: parasitemia > 5%.",
    "Teste rápido imunocromatográfico positivo para Plasmodium falciparum (HRP-2). PCR confirmatório positivo. Critérios OMS de malária grave presentes: malária cerebral + hipoglicemia + hiperparasitemia."
  ],
  clue_labels:["Síndrome febril inespecífica","Febre sem padrão e hepatoesplenomegalia","Exposição em área endêmica","Rebaixamento e hemoglobinúria","Teste rápido e PCR"],
  explanation:"Malária por P. falciparum é a forma mais grave, podendo causar morte em horas. A urina escura ('coca-cola') indica hemoglobinúria por hemólise grave. Critérios de gravidade OMS: coma, hiperparasitemia, hipoglicemia, IRA, edema pulmonar. Tratamento: artesunato EV. Notificação compulsória.",
  reference:"MS Brasil - Manual de Diagnóstico e Tratamento da Malária, 2020. WHO Guidelines, 3ª ed. 2015.",difficulty:3},

  {id:15,diagnosis:"Leishmaniose Visceral",aliases:["calazar","kala-azar","leishmaniose"],cid:"B55.0",category:"Infectologia",
  clues:[
    "Criança, 3 anos, levada à UPA com febre há 45 dias e barriga crescendo progressivamente. A mãe acha que está com 'verme no fígado'.",
    "A febre é irregular, às vezes sumia por dias e voltava. A criança está cada vez mais pálida, sem energia, e perdeu peso. Chora muito.",
    "Mora em município do interior do Maranhão. Cão da família morreu há 2 meses com feridas na pele e emagrecimento. Área com casos conhecidos de 'barriga d'água'.",
    "Exame físico: palidez 3+/4+, baço a 9 cm do RCE, fígado a 6 cm do RCD, adenopatia inguinal. Hemoglobina 5,8 g/dL, leucópenia, plaquetopenia. Albumina 2,2 g/dL. Hipergamaglobulinemia.",
    "Teste rápido rK39: positivo. Pesquisa de Leishmania em medula óssea: formas amastigotas intracelulares identificadas. Diagnóstico parasitológico confirmado."
  ],
  clue_labels:["Febre prolongada e hepatomegalia","Evolução da síndrome","Exposição em área endêmica","Pancitopenia e hipoalbuminemia","Mielograma confirmatório"],
  explanation:"Leishmaniose visceral (calazar) é endêmica no Nordeste. A tríade: febre prolongada + esplenomegalia + pancitopenia. O diagnóstico definitivo é parasitológico (aspirado de medula). O rK39 tem alta sensibilidade. Tratamento de 1ª linha: Anfotericina B lipossomal. Alta letalidade sem tratamento.",
  reference:"MS Brasil - Manual de Vigilância e Controle da LV, 2014. Chappuis F et al. Nat Rev Microbiol 2007.",difficulty:2},

  {id:16,diagnosis:"Hipotireoidismo Primário",aliases:["hipotireoidismo","tireoidite de hashimoto"],cid:"E03",category:"Endocrinologia",
  clues:[
    "Mulher, 38 anos, procura clínico geral com 'cansaço que não passa'. Há 8 meses acorda cansada, mesmo dormindo bem. Engordou 6 kg sem mudar a alimentação.",
    "Cabelo caindo em mechas, pele cada vez mais seca e áspera ao toque. Intestino preso há meses — evacuava diariamente, agora a cada 3–4 dias. Ciclo menstrual irregular.",
    "Sem doenças prévias. Mãe tem 'problema de tireoide'. Sensação constante de frio mesmo em ambiente quente. Raciocínio mais lento — sente que 'o pensamento trava'.",
    "FC 54 bpm. Reflexos tendinosos com relaxamento lentificado. Pele fria e pastosa. Edema facial não compressível. TSH = 28,4 mUI/L. T4 livre = 0,52 ng/dL.",
    "Anti-TPO: 1.200 U/mL (fortemente positivo). Ultrassonografia de tireoide: glândula hipotrófica, heterogênea, padrão pseudonodular difuso — compatível com tireoidite de Hashimoto."
  ],
  clue_labels:["Cansaço e ganho de peso","Sintomas sistêmicos","Histórico familiar e intolerância ao frio","Exame físico e TSH","Anti-TPO e imagem"],
  explanation:"Hipotireoidismo é a disfunção endócrina mais prevalente, mais comum em mulheres. O TSH é o exame mais sensível para triagem. Anti-TPO elevado confirma etiologia autoimune (Hashimoto). Tratamento: levotiroxina oral, com ajuste de dose a cada 4–6 semanas pelo TSH.",
  reference:"SBEM - Diretriz Brasileira para o Manejo do Hipotireoidismo, 2020. Jonklaas J et al. Thyroid 2014.",difficulty:1},

  {id:17,diagnosis:"Chikungunya",aliases:["febre chikungunya","artralgias chikungunya"],cid:"A92.0",category:"Infectologia",
  clues:[
    "Mulher, 52 anos, procura UBS com febre alta de início abrupto há 3 dias. Diz que 'veio do nada'. Está muito fraca e mal consegue andar.",
    "As articulações das mãos, punhos, tornozelos e pés estão dolorosas, com edema e rubor — bilateralmente. A dor é 10/10 e não cede com dipirona. Prefere ficar imóvel no leito.",
    "Mora no Rio de Janeiro. Município em surto de arbovirose declarado há 3 semanas. Vizinha com quadro semelhante. Nega viagem.",
    "Hemograma: leucopenia 2.800/mm³, linfocitose relativa. Plaquetas: 140.000/mm³ (não tão baixas quanto na dengue). Surgimento de exantema maculopapular no 3º dia, com áreas de pele poupada.",
    "IgM anti-chikungunya: positivo. RT-PCR em fase aguda positivo para vírus chikungunya. Dengue e Zika descartados por sorologia e PCR."
  ],
  clue_labels:["Febre aguda com incapacidade","Artralgia intensa e simétrica","Contexto de surto","Hemograma e exantema","Sorologia e PCR confirmatório"],
  explanation:"Chikungunya significa 'aquele que se dobra' — a artralgia é tão intensa que altera a postura. O diferencial com dengue é a poliartralgia incapacitante simétrica e as plaquetas menos afetadas. A forma crônica (artralgia > 3 meses) ocorre em 30–40%. Tratamento sintomático. Notificação compulsória.",
  reference:"MS Brasil - Chikungunya: manejo clínico, 2017. Burt FJ et al. Lancet 2017.",difficulty:2},

  {id:18,diagnosis:"Cirrose Hepática",aliases:["cirrose","cirrose descompensada","hepatopatia crônica"],cid:"K74",category:"Gastroenterologia",
  clues:[
    "Homem, 55 anos, admitido com barriga crescendo progressivamente há 3 semanas e amarelamento da pele. Está confuso e agitado à noite.",
    "Familiares relatam que ele bebe cachaça diariamente há mais de 20 anos, pelo menos uma garrafa por dia. Nas últimas semanas parou de beber mas piorou.",
    "Ao exame físico: eritema palmar, múltiplas telangiectasias em tórax, ginecomastia, circulação colateral abdominal visível ('cabeça de medusa'). Ascite volumosa com piparote positivo.",
    "Flapping tremor presente. Desorientado no tempo. Albumina 2,0 g/dL. Bilirrubina total 8,2 mg/dL. INR 2,4. Sódio 128 mEq/L. Child-Pugh C. MELD-Na = 22.",
    "Endoscopia: varizes esofágicas de grosso calibre com sinais de sangramento recente. Ultrassonografia: fígado nodular heterogêneo, esplenomegalia, hipertensão portal confirmada por Doppler."
  ],
  clue_labels:["Ascite e icterícia","Etiologia alcoólica","Estigmas hepáticos crônicos","Encefalopatia e scores de gravidade","Endoscopia e imagem"],
  explanation:"Cirrose hepática alcóolica é causa frequente no Brasil. As complicações maiores: hemorragia varicosa, encefalopatia, PBE, síndrome hepatorrenal e CHC. O MELD-Na estratifica urgência no transplante. Transplante hepático é o tratamento definitivo em casos selecionados.",
  reference:"SBH - Diretrizes Brasileiras de Cirrose Hepática, 2019. EASL Clinical Practice Guidelines 2018.",difficulty:2},

  {id:19,diagnosis:"Pancreatite Aguda",aliases:["pancreatite","pancreatite grave"],cid:"K85",category:"Cirurgia / Gastroenterologia",
  clues:[
    "Mulher, 44 anos, obesa, chega ao PS com dor intensa em região do estômago que iniciou súbito há 6 horas após jantar farto. É a pior dor que já sentiu.",
    "A dor se irradia 'em faixa' para o dorso e melhora um pouco quando ela se senta curvada para frente. Náuseas e vômitos que não aliviam a dor. Febre baixa: 37,8°C.",
    "Histórico de cálculos na vesícula diagnosticados há 6 meses — estava aguardando cirurgia. Não bebe álcool. Sem medicamentos novos recentemente.",
    "Amilase 1.840 U/L, lipase 2.200 U/L (> 3x o normal). Leucócitos 16.200/mm³. PCR 210 mg/L. Cálcio 7,8 mg/dL. Sinal de Cullen ausente mas Grey Turner discreto nos flancos.",
    "TC de abdome com contraste (protocolo de pâncreas): necrose em corpo e cauda, coleção peripancreática. Score CTSI (Balthazar) = 7 — pancreatite grave. UTI indicada."
  ],
  clue_labels:["Dor epigástrica súbita intensa","Irradiação e posição de alívio","Histórico de litíase biliar","Amilase, lipase e sinais físicos","Tomografia de gravidade"],
  explanation:"Pancreatite aguda: causas mais comuns são litíase biliar (60%) e álcool. Diagnóstico por 2 de 3 critérios: dor típica, enzimas > 3x, TC com achados. A lipase é mais específica que a amilase. O CTSI ≥ 7 indica necrose e alto risco. Tratamento: hidratação EV agressiva, analgesia, jejum.",
  reference:"Tenner S et al. Am J Gastroenterol 2013. IAP/APA Evidence-based Guidelines 2013.",difficulty:2},

  {id:20,diagnosis:"HIV / AIDS",aliases:["hiv","aids","síndrome da imunodeficiência adquirida","infecção por hiv"],cid:"B24",category:"Infectologia",
  clues:[
    "Homem, 32 anos, procura UBS com diarreia crônica há 2 meses, perda de peso importante e cansaço. 'Não tenho força para nada.'",
    "Perdeu 12 kg em 3 meses sem fazer dieta. Suores noturnos abundantes há 6 semanas. Apareceram manchas brancas na língua que raspam mas voltam.",
    "Relata relações sexuais sem preservativo com múltiplos parceiros. Não tem parceiro fixo. Nega uso de drogas injetáveis. Nunca testou para HIV.",
    "Adenopatia cervical e inguinal bilateral. Radiografia de tórax: infiltrado intersticial bilateral difuso. SpO₂ 91% em repouso. LDH 820 U/L. Teste rápido para HIV: positivo em dois algoritmos diferentes.",
    "Western Blot confirmatório: reagente. Carga viral HIV RNA: 480.000 cópias/mL. CD4: 78 células/mm³ (< 200 = AIDS). Lavado broncoalveolar: Pneumocystis jirovecii — pneumocistose confirmada."
  ],
  clue_labels:["Síndrome consuntiva","Candida oral e suores","Histórico comportamental","Achados radiológicos e teste rápido","CD4 e infecção oportunista"],
  explanation:"HIV/AIDS com CD4 < 200 células/mm³ define AIDS. A PCP é a infecção oportunista mais comum nesse estágio. Diagnóstico de HIV por teste rápido em algoritmo duplo + confirmação por Western Blot. A TARV deve ser iniciada o mais cedo possível. Profilaxia primária com SMX-TMP quando CD4 < 200.",
  reference:"MS Brasil - PCDT para Manejo da Infecção pelo HIV em Adultos, 2022. WHO Consolidated Guidelines 2021.",difficulty:2},

  {id:21,diagnosis:"Febre Tifoide",aliases:["tifoide","febre entérica"],cid:"A01.0",category:"Infectologia",
  clues:[
    "Jovem de 19 anos, retornou há 10 dias de viagem a município rural no Nordeste. Febre há 8 dias que foi aumentando gradualmente — começou com 37,8°C e agora atinge 39,5°C.",
    "Apesar da febre alta, o coração está lento (FC 64 bpm) — o médico estranha essa 'bradicardia relativa'. Diarreia com 4–5 episódios/dia na 1ª semana, substituída por constipação.",
    "Bebeu água de poço e comeu alimentos de barraquinha durante a viagem. Não foi vacinado contra febre tifoide. Familiares em casa estão bem.",
    "Exame físico: esplenomegalia palpável, manchas róseas no tronco (roséolas tíficas). Leucócitos 3.100/mm³ (leucopenia com eosinopenia). TGO/TGP levemente elevadas.",
    "Hemocultura (coletada na 1ª semana): positiva para Salmonella enterica sorovar Typhi. Coprocultura também positiva. Widal com soroaglutininas O e H em títulos significativos."
  ],
  clue_labels:["Febre gradual pós-viagem","Dissociação pulso-temperatura","Exposição hídrica e alimentar","Roséolas tíficas e leucopenia","Hemocultura confirmatória"],
  explanation:"Febre tifoide é causada por Salmonella Typhi — transmissão fecal-oral por água ou alimento contaminado. A dissociação pulso-temperatura (bradicardia relativa) é clássica. Roséolas tíficas são patognomônicas. A hemocultura na 1ª semana tem a maior sensibilidade. Tratamento: ciprofloxacino ou azitromicina.",
  reference:"Bhutta ZA et al. Typhoid fever. N Engl J Med 2006. MS Brasil - Manual de Controle das DTAs.",difficulty:2},

  {id:22,diagnosis:"Acidente Vascular Cerebral Hemorrágico",aliases:["avc hemorrágico","avch","hemorragia cerebral","hemorragia intraparenquimatosa"],cid:"I61",category:"Neurologia",
  clues:[
    "Homem, 61 anos, cai repentinamente em casa durante uma discussão acalorada. Esposa chama SAMU — ele está com braço e perna esquerdos sem movimento e não reconhece onde está.",
    "Relata ter tido 'a pior dor de cabeça da vida' antes de cair. PA na chegada: 210/120 mmHg. Glasgow 10. Desvio do olhar conjugado para a direita.",
    "Hipertenso há 15 anos, em uso irregular de losartana. Parou de medir a pressão há 6 meses. Nega anticoagulantes, nega trauma. Etilista social.",
    "TC de crânio sem contraste: hiperdensidade espontânea em núcleo lentiforme direito, volume 35 mL. Sem hidrocefalia. NIHSS 18. Sem desvio de linha média.",
    "Angiotomografia cerebral: sem malformação arteriovenosa ou aneurisma rotos. Sinal do ponto (spot sign) presente no hematoma — prediz expansão ativa e pior prognóstico."
  ],
  clue_labels:["Déficit focal súbito","Cefaleia e PA extrema","Histórico de HAS não controlada","Neuroimagem e NIHSS","Angiotomografia (spot sign)"],
  explanation:"Hemorragia intraparenquimatosa representa 15–20% dos AVCs. A HAS não controlada é o principal fator de risco (localização clássica: núcleos da base). O controle pressórico imediato (< 140 mmHg) reduz expansão. O spot sign na angiotomografia prediz crescimento do hematoma e pior desfecho.",
  reference:"AHA/ASA Guidelines for ICH 2022. Pontes-Neto OM. Arq Neuropsiquiatr 2009.",difficulty:3},

  {id:23,diagnosis:"Síndrome de Burnout",aliases:["burnout","esgotamento profissional"],cid:"Z73.0",category:"Saúde Mental / Medicina do Trabalho",
  clues:[
    "Médico residente de 2º ano, 27 anos, procura psiquiatra com 'cansaço que não passa'. Há 4 meses acorda exausto, mesmo nos dias de folga. Insônia de manutenção.",
    "Dificuldade de concentração crescente. Choro sem motivo aparente. Sente que 'não se importa mais com os pacientes' — algo que o perturba profundamente.",
    "Faz 3 plantões de 24h por semana além das atividades ambulatoriais. Sente que o trabalho 'não faz diferença'. Recentemente cometeu erro de prescrição — nunca havia acontecido.",
    "Questionário de Maslach (MBI): escore 48/54 em Exaustão Emocional (muito alto), 22/30 em Despersonalização (alto), 12/48 em Realização Pessoal (muito baixo). Sem episódio depressivo maior anterior.",
    "Avaliação psiquiátrica: ausência de transtorno depressivo maior, bipolar ou ansioso — os sintomas estão estritamente vinculados ao contexto ocupacional. CID-11 Z73.0: Síndrome de Burnout — fenômeno ocupacional."
  ],
  clue_labels:["Exaustão persistente","Despersonalização","Carga de trabalho e impacto funcional","Escala de Maslach (MBI)","Diagnóstico diferencial e CID-11"],
  explanation:"Burnout tem prevalência de 30–50% entre médicos residentes no Brasil. A CID-11 (2019) classificou como fenômeno ocupacional — não é transtorno mental, mas requer intervenção. O MBI avalia 3 dimensões: exaustão, despersonalização e realização pessoal. Tratamento: redução de carga, psicoterapia, suporte institucional.",
  reference:"CFM - Resolução 2.232/2019. WHO CID-11. West CP et al. JAMA 2018.",difficulty:3},

  {id:24,diagnosis:"Síndrome Coronariana Aguda sem Supra de ST",aliases:["scassst","angina instável","iam sem supra","iamssst"],cid:"I21.4",category:"Cardiologia",
  clues:[
    "Mulher, 62 anos, procura PS com 'aperto no peito' que ocorreu 3 vezes nas últimas 24h, durando 15–20 minutos cada episódio. Entre os episódios se sente bem.",
    "A dor aparece em repouso, sem esforço precipitante. Cede espontaneamente. Associada à falta de ar. Nega febre, nega tosse. PA: 150/90 mmHg. FC: 88 bpm. Ausculta normal.",
    "Hipertensa há 10 anos, dislipidêmica em uso de sinvastatina. Menopausada. Mãe faleceu de infarto aos 68 anos. Nega tabagismo. Sedentária.",
    "ECG: infradesnivelamento de ST de 1,5 mm em V4–V6 que retorna ao normal entre os episódios. Troponina T ultrassensível admissão: 52 ng/L; 3h depois: 128 ng/L (delta positivo). Score GRACE: 142.",
    "Coronariografia: lesão obstrutiva de 85% em artéria circunflexa proximal — culprit lesion identificada. ICP com stent farmacológico. Ecocardiograma pós: FEVE 58%, sem alterações segmentares."
  ],
  clue_labels:["Dor torácica episódica em repouso","Características da dor","Fatores de risco cardiovascular","ECG e troponina seriada","Coronariografia confirmatória"],
  explanation:"SCA sem supra engloba angina instável (sem elevação de troponina) e IAM sem supra (troponina elevada). O delta de troponina confirma lesão miocárdica. Score GRACE > 140 = alto risco: coronariografia em < 24h. Tratamento: dupla antiagregação + anticoagulação + estatina de alta intensidade.",
  reference:"SBC - Diretriz de SCA sem Supra de ST, 2021. Collet JP et al. ESC Guidelines 2020.",difficulty:3},

  {id:25,diagnosis:"Hipertensão Arterial Sistêmica",aliases:["has","hipertensão arterial","hipertensão","pressão alta"],cid:"I10",category:"Cardiologia",
  clues:[
    "Mulher, 48 anos, vai ao médico para check-up anual. Não tem queixas. A pressão medida na consulta é 158/98 mmHg — técnica correta, após 5 min de repouso.",
    "Médico repete a medição antes de sair: 155/96 mmHg. Há 3 meses, em outra consulta, foi registrada 152/94 mmHg. A paciente dizia que 'pressão alta é coisa de velho'.",
    "Sedentária, IMC 32 kg/m², tabagista (10 cigarros/dia há 15 anos). Pai faleceu de IAM aos 55 anos. Mãe hipertensa. Ingere sal em excesso. Bebe álcool socialmente.",
    "ECG: índice de Sokolow-Lyon > 35 mm (sobrecarga ventricular esquerda). Ecocardiograma: hipertrofia concêntrica de VE (espessura de parede posterior 12 mm). Fundo de olho: cruzamentos AV grau II.",
    "Laboratório: microalbuminúria positiva (68 mg/g de creatinina), creatinina 0,9 mg/dL, glicemia 108 mg/dL, colesterol total 218 mg/dL. Lesão de órgão-alvo em 3 sítios: coração, olho e rim."
  ],
  clue_labels:["PA elevada assintomática","Confirmação da elevação","Fatores de risco múltiplos","Lesão cardíaca e ocular","Microalbuminúria renal"],
  explanation:"HAS afeta 36% dos adultos brasileiros e é a principal causa de morte cardiovascular. O diagnóstico requer 2 medidas elevadas em 2 ocasiões. A presença de lesão de órgão-alvo (coração, rim, olho) classifica como risco cardiovascular alto. Tratamento: mudança de estilo de vida + farmacoterapia (tiazídico, IECA/BRA, BCC).",
  reference:"SBC - 7ª Diretriz Brasileira de HAS, 2016. SBH/SBC - Diretriz Brasileira de HAS, 2020.",difficulty:1}

  {id:26,diagnosis:"Febre Maculosa Brasileira",aliases:["fmb","febre maculosa","rickettsia"],cid:"A77.0",category:"Infectologia",
  clues:[
    "Homem, 38 anos, chega ao PS com febre alta há 4 dias, cefaleia intensa e mialgia. Muito prostrado, procurou duas UBS antes e recebeu diagnóstico de virose.",
    "No 5º dia surgem manchas avermelhadas nas palmas das mãos e planta dos pés que se espalharam para o tronco. Febre persiste em 40°C. Confusão mental leve.",
    "Mora em zona rural de Minas Gerais. Há 10 dias fez trilha em mata ciliar com presença de capivaras. Encontrou carrapato grudado na virilha, que removeu sem luvas.",
    "Hemograma: plaquetas 42.000/mm³, leucocitose com desvio à esquerda, elevação de transaminases (AST 180 U/L, ALT 140 U/L). PCR: 18 mg/dL. Hematócrito em queda.",
    "PCR em tempo real para Rickettsia rickettsii positivo. Sorologia IFI: IgM ≥ 1:64 (fase aguda). Biópsia de lesão cutânea: vasculite com infiltrado perivascular confirmando rickettsiose."
  ],
  clue_labels:["Síndrome febril aguda","Exantema petequial palmoplantar","Exposição a carrapato","Laboratório com plaquetopenia","Confirmação por PCR/sorologia"],
  explanation:"A Febre Maculosa Brasileira é a rickettsiose mais letal das Américas, com mortalidade de até 80% sem tratamento. O exantema nas palmas e plantas é clássico mas surge tardiamente. O tratamento deve ser iniciado por suspeita clínica — doxiciclina 100 mg 12/12h — sem aguardar confirmação laboratorial. Atraso no tratamento é a principal causa de óbito.",
  reference:"MS Brasil. Guia de Vigilância em Saúde: Febre Maculosa Brasileira, 2019. Labruna MB. Ann NY Acad Sci 2009.",difficulty:3},

  {id:27,diagnosis:"Endocardite Infecciosa",aliases:["endocardite","endocardite bacteriana","eiab"],cid:"I33.0",category:"Cardiologia / Infectologia",
  clues:[
    "Homem, 45 anos, usuário de drogas injetáveis, atendido no PS com febre há 3 semanas, emagrecimento de 5 kg e cansaço progressivo. Refere calafrios diários.",
    "Surgem nódulos dolorosos nas polpas dos dedos e manchas avermelhadas não dolorosas nas palmas. Febre oscila entre 38–39,5°C. Sopro cardíaco novo na ausculta.",
    "Histórico de endocardite há 2 anos tratada com antibiótico. Uso de heroína IV sem material estéril compartilhado. Sem cobertura vacinal. PA: 110/70 mmHg, FC: 98 bpm.",
    "Hemoculturas (3 pares): crescimento de Staphylococcus aureus sensível à oxacilina. Ecocardiograma transesofágico: vegetação de 14 mm na cúspide anterior da válvula tricúspide com insuficiência moderada.",
    "Critérios de Duke preenchidos: 2 maiores (hemoculturas positivas + vegetação ao eco) + 2 menores (febre + uso de drogas IV). TC de tórax: êmbolos sépticos pulmonares bilaterais."
  ],
  clue_labels:["Febre prolongada em UDIV","Fenômenos embólicos periféricos","Histórico e fator de risco","Hemocultura e ecocardiograma","Critérios de Duke completos"],
  explanation:"Endocardite infecciosa em usuários de drogas IV acomete predominantemente a tricúspide e é causada principalmente por S. aureus. Os critérios de Duke orientam o diagnóstico. Tratamento: oxacilina 12 g/dia por 4–6 semanas. Indicação cirúrgica quando há insuficiência cardíaca, vegetação > 10 mm com embolias recorrentes ou falha terapêutica.",
  reference:"SBC - Diretrizes de Endocardite Infecciosa, 2011. Habib G et al. ESC Guidelines 2023.",difficulty:3},

  {id:28,diagnosis:"Síndrome de Guillain-Barré",aliases:["guillain barré","sgb","polirradiculoneuropatia","guillain-barré"],cid:"G61.0",category:"Neurologia",
  clues:[
    "Homem, 32 anos, atendido na UPA com formigamento nos pés e nas mãos há 5 dias. Estava bem até então. Acha que pode ser 'circulação ruim'.",
    "Progressivamente a fraqueza sobe: em 48 horas não consegue subir escadas. As pernas cedem ao sentar. Os braços começam a enfraquecer. Perda de reflexos em membros inferiores.",
    "Há 3 semanas teve episódio de diarreia com fezes líquidas por 4 dias, resolvida sem antibiótico. Sem outras doenças. Sem uso de medicamentos. Viajou ao interior do Ceará.",
    "LCR: dissociação albumino-citológica (proteínas 180 mg/dL, células 4/mm³). Eletroneuromiografia: redução da velocidade de condução motora e sensitiva, bloqueio de condução — padrão desmielinizante.",
    "Anticorpo anti-gangliosídeo GM1 positivo (associado à forma motora pura). Campylobacter jejuni identificado em coprocultura de amostra retroativa. Internado em UTI: capacidade vital 800 mL."
  ],
  clue_labels:["Parestesia distal insidiosa","Paralisia ascendente progressiva","Infecção precedente","LCR e eletroneuromiografia","Anticorpo e agente desencadeante"],
  explanation:"Síndrome de Guillain-Barré é a causa mais comum de paralisia flácida aguda em adultos imunocompetentes. A dissociação albumino-citológica do LCR é o achado cardinal. O monitoramento da capacidade vital é essencial — queda < 20 mL/kg indica IOT. Tratamento: imunoglobulina IV 0,4 g/kg/dia por 5 dias ou plasmaférese. Campylobacter é o principal agente precipitante.",
  reference:"ABN - Diretrizes para SGB, 2015. van den Berg B et al. Nat Rev Neurol 2014.",difficulty:2},

  {id:29,diagnosis:"Miastenia Gravis",aliases:["miastenia","mg","miastenia ocular","crise miastênica"],cid:"G70.0",category:"Neurologia",
  clues:[
    "Mulher, 28 anos, procura oftalmologista com queixa de pálpebra caída no olho direito que piora ao longo do dia. Pela manhã está melhor, à tarde mal consegue abrir o olho.",
    "Percebe que ao falar por tempo prolongado a voz fica 'anasalada' e que fica com dificuldade de mastigar alimentos sólidos no fim das refeições. Às vezes engasga com líquidos.",
    "Avó materna com tireoidite de Hashimoto. A paciente não tem outras doenças autoimunes conhecidas. Está em uso de anticoncepcional oral. Sem exposição recente a medicamentos novos.",
    "Teste do gelo: melhora da ptose após 2 minutos de aplicação de bolsa de gelo na pálpebra. ENMG repetitiva: decremento > 10% na amplitude do potencial de ação muscular a 3 Hz.",
    "Anticorpos anti-receptor de acetilcolina (anti-AChR): positivos em título elevado. TC de tórax: timoma anterior de 3,2 cm × 2,8 cm identificado no mediastino anterior."
  ],
  clue_labels:["Ptose palpebral flutuante","Fadigabilidade da musculatura bulbar","Contexto autoimune familiar","Teste do gelo e ENMG","Anticorpo anti-AChR e timoma"],
  explanation:"Miastenia Gravis é doença da junção neuromuscular por anticorpos anti-AChR (85%) ou anti-MuSK. A fadigabilidade — piora com esforço e melhora com repouso — é a marca clínica. Timoma está associado em 10–15% dos casos e exige timectomia. Tratamento de base: piridostigmina. Imunossupressão: prednisona ± azatioprina. Crise miastênica: IVIG ou plasmaférese.",
  reference:"ABN - Diretriz de Miastenia Gravis, 2016. Gilhus NE. N Engl J Med 2016.",difficulty:2},

  {id:30,diagnosis:"Hemorragia Subaracnóidea",aliases:["hsa","hemorragia subaracnóidea","aneurisma roto","cefaleia em trovoada"],cid:"I60",category:"Neurologia",
  clues:[
    "Mulher, 47 anos, acorda às 4h com cefaleia descrita como 'a pior dor de cabeça da minha vida', de início súbito, como 'uma martelada na nuca'. Nunca teve dor assim.",
    "A cefaleia atinge intensidade máxima em menos de 1 minuto. Associa-se a vômito em jato e rigidez de nuca. Fotofobia intensa. Sem déficit motor, sem alteração de fala.",
    "Sem histórico de enxaqueca. Tabagista há 20 anos. PA atual: 178/106 mmHg. Temperatura 37°C. Não faz uso de anticoagulantes. Parente de 1º grau com aneurisma cerebral.",
    "TC de crânio sem contraste: hiperdensidade nas cisternas da base, sulcos inter-hemisféricos e fissura silviana bilateralmente — padrão típico de sangue subaracnóideo. Score Fisher 3.",
    "Angiotomografia cerebral: aneurisma sacular de 7 mm na artéria comunicante anterior. Paciente encaminhada para serviço de neurocirurgia para clipagem ou embolização em caráter de urgência."
  ],
  clue_labels:["Cefaleia thunderclap súbita","Síndrome meníngea associada","Fatores de risco vascular","TC com sangue nas cisternas","Angiotomografia confirmatória"],
  explanation:"A cefaleia em trovoada (thunderclap) deve sempre levantar suspeita de HSA por aneurisma roto até prova em contrário. A TC tem sensibilidade de 98% nas primeiras 12h — se negativa, punção lombar é obrigatória. O vasoespasmo é complicação temida (dias 4–14). Tratamento: nimodipino oral para prevenção de vasoespasmo, controle pressórico e clipagem/embolização precoce.",
  reference:"Connolly ES et al. AHA/ASA Guidelines for HSA 2012. ABN - Consenso sobre HSA Aneurismática.",difficulty:3},

  {id:31,diagnosis:"Doença de Crohn",aliases:["crohn","doença inflamatória intestinal","dii crohn"],cid:"K50",category:"Gastroenterologia",
  clues:[
    "Mulher, 24 anos, encaminhada pelo clínico com diarreia intermitente há 8 meses — 4 a 6 evacuações diárias sem sangue vivo. Dor abdominal em cólica no quadrante inferior direito. Emagrecimento de 8 kg.",
    "Relata episódios de febre baixa vespertina. Percebe nodosidades dolorosas nas pernas ('caroços vermelhos'). A dor piora após refeições, o que a faz comer menos.",
    "Mãe com diagnóstico de retocolite ulcerativa. A paciente não tem viagens recentes, não fez uso de antibióticos nos últimos 6 meses. Ex-tabagista. Sem uso de AINEs.",
    "Hemograma: anemia normocítica normocrômica, leucocitose leve. PCR 32 mg/dL, VHS 68 mm/h. Calprotectina fecal: 980 µg/g (VR < 50). Albumina: 2,9 g/dL. Colonoscopia: lesões aftosas saltadas, empedrado na região ileocecal, fístula perianal.",
    "Histopatologia da biópsia ileocecal: granulomas epitelioides não caseosos em lâmina própria — achado patognomônico de Doença de Crohn. Entero-RNM: espessamento transmural do íleo terminal com realce após contraste."
  ],
  clue_labels:["Diarreia crônica sem sangue","Manifestações extraintestinais","História familiar e fatores de risco","Inflamação e colonoscopia","Histopatologia confirmatória"],
  explanation:"Doença de Crohn é doença inflamatória intestinal transmural que pode acometer todo o TGI da boca ao ânus. A distribuição em saltos, o acometimento do íleo terminal e os granulomas não caseosos são características. Manifestações extraintestinais incluem eritema nodoso, artrite e uveíte. Tratamento de indução: corticosteroides; manutenção: azatioprina, metotrexato ou imunobiológicos (anti-TNF).",
  reference:"ECCO Guidelines on Crohn's Disease 2023. SBH - Consenso Brasileiro em DII, 2022.",difficulty:2},

  {id:32,diagnosis:"Retocolite Ulcerativa",aliases:["rcu","retocolite","colite ulcerativa","proctocolite"],cid:"K51",category:"Gastroenterologia",
  clues:[
    "Homem, 31 anos, procura gastroenterologista com diarreia com sangue há 6 semanas — 8 a 10 evacuações por dia, inclusive à noite. Cólicas abdominais. Urgência para evacuar.",
    "Fezes sempre com muco e sangue vivo. Tenesmo intenso. Perdeu 6 kg no período. Relata olho vermelho com dor que foi tratado como conjuntivite mas não melhorou com colírio.",
    "Sem viagens recentes. Coprocultura negativa para patógenos. Sem uso de antibióticos recentes. Pai com artrite reumatoide. Não fuma (parou há 1 ano — coincide com início dos sintomas).",
    "Hemograma: Hb 9,2 g/dL, leucocitose. PCR: 28 mg/dL. Calprotectina fecal: > 1.800 µg/g. Sigmoidoscopia: mucosa friável, eritematosa, com ulcerações contínuas desde o reto, sem skip lesions. Score de Mayo endoscópico: 3.",
    "Histopatologia: abcessos de cripta, distorção arquitetural da mucosa e infiltrado inflamatório difuso limitado à mucosa — padrão de RCU. Ausência de granulomas. Colonoscopia completa: acometimento contínuo até o ângulo esplênico (colite esquerda)."
  ],
  clue_labels:["Diarreia sanguinolenta com urgência","Sintomas sistêmicos e extraintestinais","Contexto e diagnóstico diferencial","Endoscopia e marcadores inflamatórios","Histopatologia e extensão da doença"],
  explanation:"Retocolite Ulcerativa é doença inflamatória limitada à mucosa do cólon, de distribuição contínua a partir do reto. Distingue-se do Crohn pela ausência de granulomas, acometimento contínuo e sem fístulas. O tabagismo tem efeito paradoxalmente protetor. O score de Mayo orienta a gravidade. Tratamento: 5-ASA (leve-moderado), corticoides (moderado-grave), imunobiológicos (grave/refratário). Colectomia curativa nos refratários.",
  reference:"ECCO Guidelines on Ulcerative Colitis 2023. SBH - Consenso Brasileiro em DII, 2022.",difficulty:2},

  {id:33,diagnosis:"Insuficiência Renal Aguda",aliases:["ira","lesão renal aguda","lra","necrose tubular aguda","injúria renal aguda"],cid:"N17",category:"Nefrologia",
  clues:[
    "Homem, 68 anos, internado após cirurgia de revascularização miocárdica eletiva. No 2º dia pós-operatório, equipe de enfermagem nota que a diurese nas últimas 8 horas foi de apenas 120 mL.",
    "Paciente refere que está se sentindo 'inchado'. Edema de membros inferiores que não existia antes da cirurgia. Peso aumentou 3,5 kg em relação ao pré-operatório. PA: 152/96 mmHg.",
    "Recebeu contraste iodado durante o cateterismo pré-operatório (6 dias atrás). Usou aminoglicosídeo (gentamicina) por 5 dias no pré-operatório por infecção de ferida. Diabético e hipertenso em uso de IECA.",
    "Creatinina: subiu de 1,0 (basal) → 1,8 → 2,9 → 4,2 mg/dL em 72h. Ureia: 98 mg/dL. Potássio: 5,8 mEq/L. Sódio urinário > 40 mEq/L, fração de excreção de sódio > 2%. Sedimento urinário: cilindros granulosos e epiteliais.",
    "Biópsia renal: necrose tubular aguda — vacuolização e descamação de células tubulares proximais, sem acometimento glomerular. Diagnóstico: LRA multifatorial (isquêmica + nefrotóxica). Iniciada terapia de substituição renal."
  ],
  clue_labels:["Oligúria no pós-operatório","Retenção hídrica e hipertensão","Fatores de risco nefrotóxicos múltiplos","Elevação progressiva de creatinina","Biópsia e padrão de NTA"],
  explanation:"A Lesão Renal Aguda (LRA) é definida pelos critérios KDIGO: creatinina ≥ 1,5× a basal em 7 dias ou aumento ≥ 0,3 mg/dL em 48h ou diurese < 0,5 mL/kg/h por ≥ 6h. Causas pré-renal, renal e pós-renal devem ser afastadas. A NTA isquêmica e nefrotóxica é a causa mais comum de LRA hospitalar. Tratamento: remoção da causa, suporte hemodinâmico e terapia renal substitutiva nos casos graves.",
  reference:"KDIGO Clinical Practice Guideline for AKI 2012. SBN - Diretrizes de LRA, 2021.",difficulty:2},

  {id:34,diagnosis:"Síndrome Nefrótica",aliases:["síndrome nefrótica","nefrótica","glomeruloesclerose","lesão mínima"],cid:"N04",category:"Nefrologia",
  clues:[
    "Criança, 5 anos, levada à pediatra por inchaço no rosto ao acordar — 'olho inchado como se tivesse chorado'. Os pais notaram as pálpebras muito edemaciadas pela manhã que melhoram ao longo do dia.",
    "Após 2 semanas o inchaço se generalizou: edema de membros inferiores, abdome aumentado. A criança está letárgica e inapetente. Ganhou 3 kg em 3 semanas.",
    "Sem infecções recentes, sem uso de medicamentos. Sem histórico familiar de doenças renais. Pressão arterial: 90/60 mmHg (normal para a idade). Sem hematúria macroscópica.",
    "Urina de fita: proteína 4+. Proteinúria de 24h: 4,8 g/dia. Albumina sérica: 1,6 g/dL. Colesterol total: 380 mg/dL, triglicerídeos: 280 mg/dL. Creatinina: 0,4 mg/dL. Complemento C3 e C4 normais.",
    "Biópsia renal (realizada após falha terapêutica): microscopia eletrônica com fusão de processos podocitários difusa, microscopia óptica sem alterações — padrão de Doença de Lesão Mínima. Resposta completa ao corticoide após 6 semanas."
  ],
  clue_labels:["Edema palpebral matinal em criança","Anasarca progressiva","Contexto clínico e pressão normal","Proteinúria maciça e hipoalbuminemia","Biópsia com lesão mínima"],
  explanation:"Síndrome Nefrótica = proteinúria > 3,5 g/dia + hipoalbuminemia + edema + hiperlipidemia/lipidúria. Em crianças de 1–8 anos, a causa mais comum é Doença de Lesão Mínima (DLM), corticossensível em 90%. A biópsia é reservada para corticorresistentes ou apresentações atípicas. Complicações: infecção (Streptococcus pneumoniae), tromboses, desnutrição.",
  reference:"KDIGO Glomerulonephritis Guideline 2021. SBN - Consenso de Síndrome Nefrótica Pediátrica.",difficulty:2},

  {id:35,diagnosis:"Lúpus Eritematoso Sistêmico",aliases:["les","lúpus","lupus","doença do tecido conjuntivo"],cid:"M32",category:"Reumatologia",
  clues:[
    "Mulher, 22 anos, procura reumatologista com histórico de 6 meses de artrite nas mãos e punhos — dor e inchaço que migram entre as articulações. Muito cansada, diz que 'não é mais a mesma'.",
    "No verão, após dia de praia, surgiu eritema nas bochechas e no nariz — 'parecia uma borboleta no rosto'. Sensível ao sol. Tem aftas orais recorrentes e queda de cabelo difusa há 3 meses.",
    "Mãe com síndrome de Sjögren. Menstruação irregular. Episódio prévio de pleurite diagnosticado como 'virose' há 1 ano com melhora espontânea. Sem uso de medicamentos crônicos.",
    "FAN: positivo 1:640, padrão homogêneo. Anti-dsDNA: > 1.000 UI/mL. Anti-Sm: positivo. Complemento C3: 52 mg/dL (↓), C4: 6 mg/dL (↓). Hemograma: anemia hemolítica (Coombs direto +), leucopenia 2.800/mm³, plaquetas 98.000/mm³. Proteína urinária: 1,2 g/dia.",
    "Biópsia renal: nefrite lúpica classe III (focal proliferativa) — depósitos de IgG, IgA, IgM, C3 e C1q subendoteliais e mesangiais (padrão 'full house'). Critérios SLICC: 7 de 11 presentes. Tratamento: hidroxicloroquina + micofenolato mofetila + prednisona."
  ],
  clue_labels:["Artrite migratória em mulher jovem","Eritema malar e fotossensibilidade","Manifestações multissistêmicas","Sorologias e consumo de complemento","Nefrite lúpica e critérios diagnósticos"],
  explanation:"LES é doença autoimune sistêmica com predomínio em mulheres jovens (proporção 9:1). O diagnóstico segue os critérios SLICC 2012 ou EULAR/ACR 2019. O FAN positivo é sensível (≥ 95%) mas pouco específico; o anti-dsDNA e anti-Sm são específicos. A nefrite lúpica determina o prognóstico. Hidroxicloroquina é pilar do tratamento e reduz mortalidade.",
  reference:"Aringer M et al. EULAR/ACR SLE Classification Criteria 2019. SBR - Consenso LES, 2020.",difficulty:2},

  {id:36,diagnosis:"Artrite Reumatoide",aliases:["artrite reumatoide","ar","poliartrite reumatoide"],cid:"M05",category:"Reumatologia",
  clues:[
    "Mulher, 52 anos, refere dor e rigidez nas mãos e punhos que duram mais de 1 hora pela manhã — 'preciso de 2 horas para conseguir abrir as mãos'. Sintomas há 8 meses.",
    "As articulações afetadas são simétricas: metacarpofalangianas e interfalangianas proximais bilateralmente. Pulsos também acometidos. Percebe caroços macios nas cotovelas ('nódulos'). Fadiga intensa.",
    "Histórico familiar de artrite reumatoide (irmã). Sem psoríase, sem uveíte, sem diarreia crônica. Menopausa há 3 anos. Sem tabagismo. Em uso de anti-inflamatório com alívio parcial.",
    "Fator reumatoide: 124 UI/mL (positivo). Anti-CCP: 890 U/mL (fortemente positivo). VHS: 78 mm/h, PCR: 22 mg/dL. RX de mãos: erosões ósseas periarticulares nas MCF II e III, osteopenia justa-articular, desvio ulnar incipiente.",
    "Ultrassom de articulações: sinovite com sinal Doppler ativo em MCF bilaterais — confirmando inflamação sinovial ativa. Score DAS-28 = 6,2 (atividade alta). Iniciados MTX 15 mg/semana + hidroxicloroquina + prednisona para ponte."
  ],
  clue_labels:["Rigidez matinal prolongada","Poliartrite simétrica com nódulos","Histórico familiar e contexto","Sorologias e radiografia com erosões","Atividade inflamatória ao Doppler"],
  explanation:"Artrite Reumatoide é poliartrite inflamatória crônica simétrica. A rigidez matinal > 1h é sinal cardinal de inflamação sinovial ativa. O anti-CCP tem alta especificidade (> 95%) e prediz doença erosiva. Os critérios ACR/EULAR 2010 orientam o diagnóstico. O objetivo do tratamento é remissão ou baixa atividade (treat-to-target). MTX é âncora terapêutica; falha indica biológicos anti-TNF.",
  reference:"Smolen JS et al. EULAR Recommendations AR 2022. SBR - Consenso Brasileiro AR, 2021.",difficulty:1},

  {id:37,diagnosis:"Esclerose Múltipla",aliases:["em","esclerose múltipla","desmielinização","surto de esclerose"],cid:"G35",category:"Neurologia",
  clues:[
    "Mulher, 28 anos, procura oftalmologista com dor ao movimentar o olho direito e perda progressiva da visão central nesse olho há 4 dias. Visão 'embaçada como névoa'.",
    "A perda visual atingiu nadir em 3 dias (acuidade visual: conta dedos a 1 metro no OD). Ao exame: defeito pupilar aferente relativo no OD, disco óptico levemente hiperemiado. Resolução espontânea parcial em 2 semanas.",
    "Há 1 ano teve episódio de fraqueza em membro inferior direito e sensação de choque ao fletir o pescoço (sinal de Lhermitte), que melhorou em 6 semanas sem tratamento. Mora no Sul do Brasil.",
    "RNM de crânio com gadolínio: múltiplas lesões hiperintensas em T2/FLAIR periventriculares, calosas ('dedos de Dawson') e infratentoriais. Uma lesão justa-cortical capta gadolínio (lesão ativa). RNM de órbita: realce do nervo óptico direito.",
    "Potenciais evocados visuais: latência aumentada no olho direito. Análise do LCR: bandas oligoclonais de IgG em 8 faixas (padrão 2 — exclusivo do LCR). Critérios de McDonald 2017 preenchidos: disseminação no espaço e no tempo. Diagnóstico de EM remitente-recorrente."
  ],
  clue_labels:["Neurite óptica unilateral","Curso e recuperação parcial","Surto prévio (sinal de Lhermitte)","RNM com lesões desmielinizantes","LCR com bandas oligoclonais"],
  explanation:"Esclerose Múltipla é doença desmielinizante do SNC, com predomínio em mulheres jovens de regiões temperadas. A forma RRMS é a mais comum. A neurite óptica é a apresentação inicial em 25% dos casos. Os critérios de McDonald 2017 exigem disseminação espacial e temporal. O tratamento modificador da doença (interferona, natalizumabe, ocrelizumabe) reduz surtos e progressão.",
  reference:"Thompson AJ et al. McDonald Criteria 2017. ABN - Diretriz de EM, 2022.",difficulty:2},

  {id:38,diagnosis:"Epilepsia",aliases:["epilepsia","crise epiléptica","epilepsia do lobo temporal","convulsão"],cid:"G40",category:"Neurologia",
  clues:[
    "Mulher, 19 anos, trazida ao PS pela família após episódio de 'desmaio com tremores' em casa. Estava em pé quando subitamente caiu, ficou rígida e depois apresentou movimentos rítmicos em todos os membros por 2 minutos.",
    "Após o episódio ficou confusa e sonolenta por 30 minutos (estado pós-ictal). Mordeu a língua durante a crise. Urinou involuntariamente. A família relata que há 6 meses ela tem episódios de 'ausência' de segundos, olhando fixo.",
    "Há 3 anos teve TCE leve em acidente de bicicleta. Não usa medicamentos. Sem uso de álcool ou drogas. Sem febre ou cefaleia atualmente. Sem histórico familiar de epilepsia. Dormiu mal nas últimas noites.",
    "TC de crânio: sem lesões estruturais agudas. Glicemia, eletrólitos e função renal normais. EEG intercrítico: descargas de ponta-onda generalizada 3 Hz durante hiperventilação. RNM de crânio: sem malformações corticais ou esclerose hipocampal.",
    "EEG de sono: surtos de ponta-onda generalizados. O padrão EEG associado às crises tônico-clônicas generalizadas e às ausências configura Epilepsia Generalizada Idiopática. Iniciado valproato de sódio com controle de crises após 4 semanas."
  ],
  clue_labels:["Crise tônico-clônica presenciada","Estado pós-ictal e história de ausências","Fatores precipitantes e contexto","Neuroimagem e EEG","Classificação e tratamento"],
  explanation:"Epilepsia é diagnóstico clínico-eletroencefalográfico: ≥ 2 crises não provocadas com intervalo > 24h. O EEG é essencial para classificar a síndrome epiléptica. A deprivação de sono é fator precipitante importante. A escolha do antiepiléptico depende da síndrome: valproato é eficaz nas epilepsias generalizadas. A RNM é obrigatória na primeira crise para afastar causa estrutural.",
  reference:"Fisher RS et al. ILAE Definition of Epilepsy 2014. SBE - Diretrizes de Tratamento, 2022.",difficulty:1},

  {id:39,diagnosis:"Doença de Parkinson",aliases:["parkinson","doença de parkinson","parkinsonismo","tremor parkinsoniano"],cid:"G20",category:"Neurologia",
  clues:[
    "Homem, 68 anos, trazido pelo filho à consulta neurológica. O filho percebeu que o pai tem o braço direito 'tremendo quando está parado' há 1 ano. O pai minimiza, diz que é 'nervoso'.",
    "O tremor é em repouso, desaparece ao movimento voluntário. O paciente também anda mais devagar, com passos pequenos. A letra ficou muito pequena ('micrografia'). A expressão facial está diminuída.",
    "Sem uso de antipsicóticos, metoclopramida ou outros bloqueadores dopaminérgicos. Sem episódios de tontura ao levantar, sem quedas frequentes, sem alterações oculares. Irmão com diagnóstico de Parkinson aos 72 anos.",
    "Exame neurológico: tremor de repouso em 'conta moedas' no MSD, rigidez em roda denteada no MSD e MSE, bradicinesia ao teste de diadococinesia. Ausência de instabilidade postural. RNM de crânio: sem lesões estruturais. DaTSCAN (SPECT de DAT): redução assimétrica da captação no putâmen direito.",
    "Critérios MDS: 2 critérios cardinais presentes (tremor de repouso + bradicinesia), critérios de suporte presentes (micrografia, hipomimia, resposta excelente a levodopa), sem red flags. Diagnóstico de Doença de Parkinson Idiopática. Iniciado levodopa + carbidopa com melhora significativa em 4 semanas."
  ],
  clue_labels:["Tremor de repouso unilateral","Bradicinesia e marcha festinante","Ausência de causas secundárias","Exame neurológico e neuroimagem funcional","Critérios diagnósticos MDS"],
  explanation:"Doença de Parkinson é a segunda doença neurodegenerativa mais comum. O diagnóstico é clínico: bradicinesia obrigatória + tremor de repouso e/ou rigidez. A resposta à levodopa é critério de suporte. Os red flags (quedas precoces, oftalmoplegia, simetria desde o início) sugerem parkinsonismo atípico. O DaTSCAN confirma disfunção dopaminérgica. Levodopa permanece o tratamento mais eficaz.",
  reference:"Postuma RB et al. MDS Criteria for Parkinson's Disease 2015. ABN - Diretriz de DP, 2022.",difficulty:1},

  {id:40,diagnosis:"Sepse",aliases:["sepse","sépsis","septicemia","infecção sistêmica grave"],cid:"A41.9",category:"Emergência / UTI",
  clues:[
    "Mulher, 78 anos, levada ao PS pela filha com febre há 2 dias, sonolência crescente e recusa alimentar. Em casa já estava 'diferente, confusa'. Histórico de ITU de repetição.",
    "Ao exame está torporosa, desorientada no tempo e espaço. Febre 38,8°C, FR 24 ipm, FC 118 bpm, PA 96/58 mmHg. Murmúrio vesicular diminuído na base direita. Dor à palpação do flanco direito.",
    "Diabética tipo 2, hipertensa, em uso de metformina e losartana. Sonda vesical de demora há 3 semanas (após internação por fratura de quadril). Urina com aspecto turvo e odor fétido na bolsa coletora.",
    "SOFA score = 6 (∆ de 2 pontos em relação ao basal). Lactato: 3,8 mmol/L. Leucocitose 22.000/mm³ com 18% de bastões. Creatinina: 2,1 mg/dL (basal 0,8). PCR: 148 mg/dL. Hemocultura: 2/2 positivas para E. coli produtora de ESBL.",
    "Urocultura: > 100.000 UFC/mL de E. coli ESBL. Ultrassom de rins: hidronefrose leve à direita, sem abscesso. Diagnóstico: sepse de foco urinário (urossepse) em paciente com instrumentação prolongada. Iniciado meropeném conforme antibiograma."
  ],
  clue_labels:["Alteração do estado mental em idosa","Hipotensão e taquicardia","Foco infeccioso e fator de risco","SOFA elevado e lactato aumentado","Confirmação microbiológica e foco"],
  explanation:"Sepse é disfunção orgânica ameaçadora à vida causada por resposta desregulada à infecção (Sepsis-3, 2016). O SOFA score ≥ 2 define a disfunção. Lactato > 2 mmol/L indica hipoperfusão tecidual. O bundle de 1 hora do SSC inclui: hemoculturas, lactato, antibiótico, 30 mL/kg de SF se hipotensão. A identificação do foco e do agente orienta a desescalonada antibiótica.",
  reference:"Singer M et al. Sepsis-3 Definition 2016. SSC - Surviving Sepsis Campaign Bundles 2018.",difficulty:2},

  {id:41,diagnosis:"Anafilaxia",aliases:["anafilaxia","choque anafilático","reação anafilática","alergia grave"],cid:"T78.2",category:"Emergência / Alergia",
  clues:[
    "Homem, 34 anos, atendido pelo SAMU após colapso na rua. Estava bem quando iniciou quadro abrupto de prurido generalizado, urticária difusa e sensação de 'garganta fechando' após almoço em restaurante.",
    "Rapidamente evolui com estridor, rouquidão e dificuldade respiratória grave. Vômito em jato. Na ambulância: rebaixamento de consciência, cianose central, diaforese intensa.",
    "Alérgico a amendoim (anafilaxia prévia aos 12 anos, tratada com epinefrina). O restaurante serviu prato com amendoim não identificado no cardápio. Sem uso de beta-bloqueadores. Não portava adrenalina auto-injetável.",
    "Ao chegar ao PS: PA 60/40 mmHg, FC 140 bpm, SatO₂ 82% em ar ambiente. Estridor audível. Urticária confluente no tronco e membros. Angioedema de lábios e língua. Ausculta: sibilos difusos bilaterais.",
    "Diagnóstico clínico imediato: anafilaxia grau IV (choque + colapso respiratório). Epinefrina 0,5 mg IM na face lateral da coxa. Decúbito dorsal com membros elevados. Soro fisiológico 1000 mL em bolus. Intubação orotraqueal de sequência rápida. Completa resolução em 4h."
  ],
  clue_labels:["Início súbito com urticária e angioedema","Colapso respiratório e vômitos","Alérgeno desencadeante","Choque e hipoxemia graves","Diagnóstico clínico e epinefrina imediata"],
  explanation:"Anafilaxia é reação alérgica sistêmica grave e potencialmente fatal. O diagnóstico é clínico. A epinefrina IM é o tratamento de primeira linha e não deve ser atrasada — anti-histamínicos e corticoides são adjuvantes. A dose é 0,01 mg/kg (máx. 0,5 mg) na face anterolateral da coxa. Todo paciente após anafilaxia deve receber prescrição de adrenalina auto-injetável e orientação sobre alérgenos.",
  reference:"Simons FER et al. WAO Anaphylaxis Guidelines 2015. SBAI - Consenso em Anafilaxia, 2021.",difficulty:1},

  {id:42,diagnosis:"Diabetes Mellitus Tipo 2",aliases:["dm2","diabetes tipo 2","diabetes mellitus tipo 2","dm não insulinodependente"],cid:"E11",category:"Endocrinologia",
  clues:[
    "Homem, 54 anos, vai à consulta médica anual assintomático. Ao exame: PA 138/88 mmHg, peso 98 kg, altura 1,72 m (IMC 33,1), circunferência abdominal 108 cm. Nenhuma queixa.",
    "Refere que nos últimos 6 meses acorda 2–3 vezes por noite para urinar e está bebendo muita água ('nunca satisfaço a sede'). Visão um pouco embaçada. Acha que está 'ficando velho'.",
    "Pai faleceu de infarto aos 62 anos, tinha 'açúcar alto'. Sedentário, alimentação rica em carboidratos refinados. Ex-tabagista. Etilista social. Em uso de losartana para HAS há 2 anos.",
    "Glicemia de jejum: 178 mg/dL. HbA1c: 9,2%. Colesterol total: 228 mg/dL, LDL: 148 mg/dL, triglicerídeos: 310 mg/dL, HDL: 32 mg/dL. Creatinina: 1,1 mg/dL. Microalbuminúria: 85 mg/g — nefropatia incipiente.",
    "Fundo de olho: microaneurismas e exsudatos duros no polo posterior bilateral — retinopatia diabética não proliferativa leve. Eletrocardiograma com sinais de hipertrofia ventricular esquerda. Critérios diagnósticos ADA: 2 glicemias de jejum > 126 mg/dL e HbA1c > 6,5%."
  ],
  clue_labels:["Achado em consulta de rotina","Sintomas cardinais do diabetes","Histórico familiar e fatores de risco","Hiperglicemia confirmada e complicações","Retinopatia e lesão de órgão-alvo"],
  explanation:"DM2 acomete > 16 milhões de brasileiros e é frequentemente assintomático em fases iniciais. O rastreio é recomendado a partir de 35 anos com fatores de risco. O diagnóstico requer 2 critérios alterados ou 1 critério em sintomáticos. A abordagem inclui mudança de estilo de vida + metformina de primeira linha. Controle de risco cardiovascular é prioritário — ISGLT2 e GLP-1 reduzem eventos cardiovasculares.",
  reference:"SBD - Diretrizes de Diabetes Mellitus, 2023. ADA Standards of Care 2024.",difficulty:1},

  {id:43,diagnosis:"Doença de Graves",aliases:["graves","hipertireoidismo autoimune","bócio difuso tóxico","tireotoxicose autoimune"],cid:"E05.0",category:"Endocrinologia",
  clues:[
    "Mulher, 31 anos, procura clínico com palpitações, nervosismo intenso e insônia há 3 meses. Acha que está 'ansiosa' e veio pedir ansiolítico. Emagreceu 7 kg sem fazer dieta.",
    "Relata intolerância ao calor — dorme com ventilador ligado mesmo no inverno. Mãos trêmulas, às vezes com sensação de coração 'disparando'. Menstruação irregular há 2 meses. Evacua 3–4 vezes por dia.",
    "Irmã com hipotireoidismo por Hashimoto. Sem uso de hormônio tireoidiano. Sem ingestão excessiva de alimentos ricos em iodo. Ao exame: tremor fino de extremidades, pele quente e úmida.",
    "TSH: < 0,01 μUI/mL (suprimido). T4 livre: 4,8 ng/dL (VR: 0,8–1,8). T3 total: 380 ng/dL. Anti-receptor de TSH (TRAb): 28 UI/L (muito elevado). ECG: taquicardia sinusal 118 bpm. Cintilografia de tireoide: captação difusa e aumentada.",
    "Exoftalmia bilateral com quemose — oftalmopatia de Graves grau 2. Bócio difuso grau 2 à palpação com sopro sobre a tireoide. Diagnóstico confirmado: Doença de Graves com oftalmopatia. Iniciado metimazol + propranolol. Radioiodoterapia planejada."
  ],
  clue_labels:["Hiperatividade simpática em mulher jovem","Sintomas catabólicos e tireotoxicose","Histórico familiar autoimune","TSH suprimido e TRAb elevado","Oftalmopatia e bócio difuso"],
  explanation:"Doença de Graves é a causa mais comum de hipertireoidismo (70–80% dos casos), mediada por anticorpos TRAb que estimulam o receptor de TSH. A oftalmopatia ocorre em 25–50% dos casos e pode ser grave. As três opções terapêuticas são: drogas antitireoidanas (1ª linha), radioiodoterapia e tireoidectomia. A oftalmopatia é tratada independentemente do hipertireoidismo.",
  reference:"SBEM - Diretrizes de Doenças da Tireoide, 2020. Ross DS et al. ATA Hyperthyroidism Guidelines 2016.",difficulty:2},

  {id:44,diagnosis:"Paracoccidioidomicose",aliases:["paracoccidioidomicose","pcm","blastomicose sul-americana","doença de lutz"],cid:"B41",category:"Infectologia",
  clues:[
    "Homem, 55 anos, trabalhador rural de Minas Gerais, encaminhado ao pneumologista com tosse produtiva há 4 meses e emagrecimento de 12 kg. Foi tratado com antibiótico por 'pneumonia' sem melhora.",
    "Surgem lesões na mucosa oral — úlceras com bordas moriformes (semelhante a amora) no palato e gengiva que dificultam a alimentação e a fala. Rouquidão progressiva.",
    "Lavoura de café por 30 anos, com exposição a solo. Tabagista (40 maços-ano). Etilista moderado. Sem HIV. Sem uso de imunossupressores. Sem viagens internacionais recentes.",
    "Radiografia de tórax: infiltrado bilateral em 'asa de borboleta', com padrão reticulonodular difuso predominando nos terços médios. LDH: 480 U/L. Hemograma: eosinofilia (12%). IgE total: 840 UI/mL. Tomografia: cavitações bilaterais.",
    "Pesquisa de fungo em escarro: elementos leveduriformes com brotamentos múltiplos em 'roda de leme' — padrão patognomônico de Paracoccidioides brasiliensis. Sorologia por imunodifusão: positiva 1:128. Biópsia de lesão oral confirma o diagnóstico. Iniciado itraconazol."
  ],
  clue_labels:["Tosse crônica sem resposta a antibiótico","Lesões orais moriformes","Trabalhador rural e fatores de risco","Infiltrado bilateral em asa de borboleta","'Roda de leme' — achado patognomônico"],
  explanation:"Paracoccidioidomicose é a micose sistêmica mais prevalente da América Latina, endêmica no Brasil. Afeta predominantemente trabalhadores rurais do sexo masculino. A lesão oral com bordas moriformes e o padrão radiológico em 'asa de borboleta' são clássicos. O agente P. brasiliensis produz leveduras com brotamentos múltiplos em 'roda de leme'. Tratamento: itraconazol 12–18 meses (forma moderada/grave).",
  reference:"SBMT - Consenso Brasileiro em Paracoccidioidomicose, 2017. Shikanai-Yasuda MA et al. Rev Soc Bras Med Trop 2017.",difficulty:2},

  {id:45,diagnosis:"Febre Amarela",aliases:["febre amarela","yellow fever","flavivírus hepático","fa silvestre"],cid:"A95",category:"Infectologia",
  clues:[
    "Homem, 28 anos, chega ao PS de Campinas com febre há 4 dias, cefaleia intensa, mialgia e lombalgia. Retornou há 5 dias de acampamento em área rural no interior de São Paulo.",
    "No 4º dia ocorre 'período de remissão' — a febre cede por 24 horas e o paciente acha que está melhorando. No 5º dia retorna com febre mais alta, dor abdominal e icterícia progressiva.",
    "Não vacinado para febre amarela ('esqueceu de tomar antes da viagem'). Sem histórico de hepatite ou cirrose. Sem uso de medicamentos hepatotóxicos. Área de origem com registro recente de casos em macacos.",
    "Bilirrubina total: 8,4 mg/dL (direta 5,2). TGO: 2.800 U/L, TGP: 1.400 U/L (padrão de lesão hepatocelular). INR: 2,8. Creatinina: 3,1 mg/dL. Plaquetas: 48.000/mm³. Hematúria ao EAS: oligoanúria.",
    "PCR para vírus amarílico: positivo no sangue (fase virémica). IgM por ELISA: reagente. Diagnóstico: Febre Amarela Silvestre — forma grave com tríade de Faget (bradicardia relativa com febre alta), insuficiência hepática e renal. Transferido para UTI. Suporte hepático e renal. Notificação compulsória imediata."
  ],
  clue_labels:["Síndrome febril aguda após área endêmica","Período de remissão e recrudescência","Não vacinado e exposição a área de risco","Citólise hepática e coagulopatia","PCR confirmatório — forma grave"],
  explanation:"Febre Amarela Silvestre é endêmica no Brasil, com surtos periódicos. A tríade clínica clássica: febre, icterícia e insuficiência renal. O sinal de Faget (bradicardia relativa com febre) é característico. A forma grave tem mortalidade > 50%. A vacina é a única prevenção eficaz — dose única com proteção por toda a vida (OMS, 2013). Notificação compulsória imediata.",
  reference:"MS Brasil - Nota Informativa sobre Febre Amarela, 2018. Vasconcelos PFC. Rev Soc Bras Med Trop 2003.",difficulty:3},

  {id:46,diagnosis:"Tuberculose Meníngea",aliases:["meningite tuberculosa","tb meníngea","meningite por bacilo de koch","neurotuberculose"],cid:"A17.0",category:"Infectologia / Neurologia",
  clues:[
    "Homem, 38 anos, imigrante boliviano, internado com cefaleia há 3 semanas de intensidade progressiva, febre baixa e emagrecimento de 10 kg em 2 meses. 'A cabeça dói o tempo todo'.",
    "Evolui com rigidez de nuca e fotofobia. Há 4 dias apresentou diplopia — ptose palpebral e desvio do olho esquerdo (paralisia do III nervo craniano). Rebaixamento do nível de consciência progressivo.",
    "PVHIV positivo, em uso irregular de ARV — CD4 atual: 68 células/mm³. Contato domiciliar com primo em tratamento de tuberculose pulmonar. BAAR em escarro: negativo.",
    "Punção lombar (após TC — sem herniação): LCR xantocrômico, pressão de abertura 32 cmH₂O. Células: 240 (90% mononucleares). Proteínas: 380 mg/dL. Glicose: 22 mg/dL (glicemia simultânea: 98 mg/dL — razão < 0,3). ADA: 18 U/L.",
    "PCR para M. tuberculosis no LCR: positivo. Cultura de Löwenstein-Jensen do LCR: crescimento em 28 dias. TC de crânio com contraste: realce meníngeo basal e hidrocefalia comunicante. Score de Lancet meningite TB: 12 pontos. Iniciado RHZE + dexametasona."
  ],
  clue_labels:["Cefaleia subaguda em imunossuprimido","Paralisia de nervo craniano","Imunossupressão e contato TB","LCR com padrão linfomononuclear","PCR e cultura confirmatórios"],
  explanation:"Meningite tuberculosa é a forma mais grave de TB extrapulmonar, com mortalidade de 20–50% e sequelas em sobreviventes. O LCR clássico: linfocitose, hiperproteinorraquia e hipoglicorraquia. A ADA > 10 U/L tem boa sensibilidade. Tratamento: RHZE por 2 meses + RH por 7–10 meses. A dexametasona reduz mortalidade nos casos confirmados. É de notificação compulsória.",
  reference:"MS Brasil - Manual de TB, 2019. Thwaites GE et al. Lancet 2009. WHO TB Guidelines 2022.",difficulty:3},

  {id:47,diagnosis:"Pneumocistose",aliases:["pneumocistose","pcp","pneumocystis","pneumonia por pneumocystis jirovecii"],cid:"B59",category:"Infectologia / Pneumologia",
  clues:[
    "Homem, 32 anos, chega ao PS com dispneia progressiva há 3 semanas — começou ao subir escadas, agora está em repouso. Tosse seca persistente. Febre baixa.",
    "O paciente está emagrecido, com candidíase oral extensa. SatO₂ em repouso: 88% (ar ambiente), cai para 80% ao deambular 6 metros. FR: 28 ipm. Ausculta pulmonar: murmúrio presente, sem crepitações.",
    "Nunca fez teste para HIV. Relata comportamento sexual de risco sem proteção. Sem uso de imunossupressores. Sem contato com aves ou animais exóticos. Não tabagista.",
    "Radiografia de tórax: infiltrado intersticial bilateral difuso em vidro fosco, simétrico, poupando os ápices ('asa de borboleta'). TC de tórax: padrão em vidro fosco difuso. LDH: 780 U/L. CD4: 42 células/mm³, carga viral HIV: 680.000 cópias/mL.",
    "Lavado broncoalveolar: pesquisa de Pneumocystis jirovecii por imunofluorescência direta — positiva. β-D-glucana sérica: 480 pg/mL (muito elevada). Diagnóstico: PCP grave. Iniciado sulfametoxazol-trimetoprim 15–20 mg/kg/dia + prednisona (PaO₂ < 70 mmHg) + ARV após 2 semanas."
  ],
  clue_labels:["Dispneia progressiva em imunocomprometido","Candidiase oral e hipoxemia grave","Primeiro diagnóstico de HIV","Infiltrado bilateral em vidro fosco","LBA confirmatório"],
  explanation:"Pneumocistose (PCP) é a infecção oportunista mais comum em PVHIV com CD4 < 200 células/mm³. A dissociação entre sintomas intensos e ausculta pobre é característica. A LDH elevada reflete dano alveolar. O TMP-SMX 15–20 mg/kg/dia por 21 dias é o tratamento padrão. A profilaxia primária (TMP-SMX 1 cp/dia) é recomendada quando CD4 < 200.",
  reference:"MS Brasil - Protocolo Clínico e Diretrizes Terapêuticas para HIV, 2022. Thomas CF, Limper AH. N Engl J Med 2004.",difficulty:2},

  {id:48,diagnosis:"Criptococose",aliases:["criptococose","cryptococcus","meningite criptocócica","criptococose meníngea"],cid:"B45",category:"Infectologia",
  clues:[
    "Homem, 29 anos, levado ao PS com cefaleia há 4 semanas de forte intensidade e visão borrada há 1 semana. Em uso irregular de ARV para HIV. 'Não aguentava mais a dor de cabeça'.",
    "Ao exame: rigidez de nuca leve. Papiledema bilateral ao fundo de olho. Sem sinais focais. Temperatura 38,1°C. Sem lesões cutâneas. SatO₂: 97%. Pescoço sem linfonodomegalias palpáveis.",
    "CD4 atual: 28 células/mm³, carga viral: 420.000 cópias/mL. Mora em apartamento com pombos no telhado. Último CD4 há 8 meses: 110 células/mm³ (perda de adesão ao tratamento).",
    "Punção lombar: pressão de abertura 38 cmH₂O. LCR límpido. Células: 12 (90% mononucleares). Proteínas: 85 mg/dL. Glicose: 28 mg/dL. Tinta da China no LCR: leveduras encapsuladas visualizadas. Antígeno criptocócico (CrAg) no soro: 1:2048.",
    "Cultura de LCR: crescimento de Cryptococcus neoformans em 48h. CrAg no LCR: 1:4096. TC de crânio: sem lesões expansivas; sinal do 'bolhas de sabão' no gânglio da base. Hipertensão intracraniana manejada com punções lombares de alívio seriadas. Anfotericina B lipossomal + flucitosina por 2 semanas."
  ],
  clue_labels:["Cefaleia subaguda em PVHIV","Hipertensão intracraniana e papiledema","Imunossupressão grave e exposição","Tinta da China e antígeno sérico","Cultura confirmatória e tratamento"],
  explanation:"Criptococose meníngea é a principal causa de meningite fúngica em PVHIV. C. neoformans tem afinidade pelo SNC por causa das condições do LCR. A tinta da China visualiza as cápsulas polissacarídeas. O antígeno sérico > 1:512 tem alta sensibilidade. A hipertensão intracraniana é a principal causa de mortalidade precoce. Indução: anfotericina B + flucitosina; manutenção: fluconazol por 1 ano.",
  reference:"MS Brasil - PCDT para Criptococose, 2022. Perfect JR et al. Clin Infect Dis 2010.",difficulty:3},

  {id:49,diagnosis:"Pielonefrite Aguda",aliases:["pielonefrite","pielonefrite aguda","itu alta","infecção do trato urinário alto"],cid:"N10",category:"Nefrologia / Infectologia",
  clues:[
    "Mulher, 26 anos, vai à UPA com febre há 2 dias (38,9°C), dor lombar à direita intensa e mal-estar geral. Estava 'bem' há 4 dias.",
    "Refere ardência ao urinar há 5 dias — 'queimação que nem melhorou com muito líquido'. Urina turva e de odor forte. Náuseas sem vômitos. Sem sangue na urina.",
    "Sexualmente ativa, troca parceiros com frequência. Não usa contraceptivo hormonal (usa DIU). Sem cateterismo vesical. Sem internações recentes. Sem diagnóstico prévio de ITU. Sem malformação urinária conhecida.",
    "Ao exame: dor à punho-percussão lombar direita positiva. Temperatura 38,9°C. PA: 110/72 mmHg. Urina com fita: nitritos positivos, leucocitúria 4+, proteínas 2+. Hemograma: leucocitose 18.400/mm³ com 22% de bastões. PCR: 82 mg/dL.",
    "Urocultura: > 100.000 UFC/mL de E. coli sensível à ciprofloxacina. Hemocultura: negativa. Ultrassom de rins: rim direito aumentado, com edema perirrenal, sem abscesso ou cálculo obstrutivo. Ciprofloxacina oral 500 mg 12/12h por 7 dias com melhora completa."
  ],
  clue_labels:["Febre e dor lombar","Sintomas urinários baixos precedentes","Contexto e fatores de risco","Urinálise e marcadores inflamatórios","Urocultura e ultrassom renal"],
  explanation:"Pielonefrite aguda é infecção bacteriana do parênquima renal, predominantemente em mulheres jovens. A E. coli é responsável por 80% dos casos. A punho-percussão lombar positiva é o achado clínico mais específico. O tratamento ambulatorial com fluorquinolona oral é eficaz nos casos sem sepse ou complicações. Hemocultura é indicada nos casos graves ou hospitalizados.",
  reference:"SBU - Diretrizes de ITU, 2020. Gupta K et al. Clin Infect Dis 2011.",difficulty:1},

  {id:50,diagnosis:"Nefrolitíase",aliases:["nefrolitíase","cálculo renal","litíase renal","cólica renal","urolitíase"],cid:"N20",category:"Nefrologia / Urologia",
  clues:[
    "Homem, 42 anos, chega ao PS em sofrimento, curvado de dor, incapaz de encontrar posição que alivie. Dor em flanco esquerdo de início súbito há 3 horas.",
    "A dor irradia para a virilha e genitais. Está agitado, em sudorese. Náusea e dois episódios de vômito. Temperatura 37,2°C. Sem disúria, sem febre. A dor é de caráter cólico — vai e vem.",
    "Episódio semelhante há 2 anos — resolveu espontaneamente sem diagnóstico confirmado. Bebe pouca água — menos de 1 litro por dia. Trabalha ao sol (operário de construção). Pai com histórico de 'pedra no rim'.",
    "EAS: hematúria macroscópica (100 hemácias/campo). Urina com aspecto avermelhado. Leucocitúria ausente. Creatinina: 1,0 mg/dL. Radiografia simples de abdome: opacidade de 6 mm em projeção do ureter esquerdo no terço médio.",
    "Uro-TC sem contraste: cálculo de 6 mm no ureter esquerdo justavesical com dilatação do sistema coletor proximal (hidronefrose grau 2). Sem abscesso. Composição provável: oxalato de cálcio (hiperdensidade de 1.200 UH). Analgesia com cetorolaco + escopolamina. Alpha-bloqueador (tansulosina) para expulsão."
  ],
  clue_labels:["Dor cólica em flanco de início súbito","Irradiação para virilha e agitação","Fatores de risco e recorrência","Hematúria e opacidade radiológica","Uro-TC confirmatória — cálculo ureteral"],
  explanation:"Nefrolitíase afeta 10–15% da população adulta e tende a recorrer. O cálculo de oxalato de cálcio é o mais comum (70%). O diagnóstico de escolha é a uro-TC sem contraste (sensibilidade > 95%). Cálculos ≤ 6 mm têm chance de expulsão espontânea > 80%; alpha-bloqueadores facilitam a passagem. Cálculos > 10 mm geralmente requerem intervenção (ESWL, ureteroscopia ou PCNL).",
  reference:"SBU - Diretrizes de Litíase Urinária, 2022. Pearle MS et al. AUA Guidelines 2014.",difficulty:1},

  {id:51,diagnosis:"Trombose Venosa Profunda",aliases:["tvp","trombose venosa profunda","trombose de mmii","flebotrombose"],cid:"I80.2",category:"Angiologia / Medicina Interna",
  clues:[
    "Mulher, 38 anos, retorna de viagem de 16 horas (Brasil–Japão) e 2 dias depois percebe que a panturrilha esquerda está inchada e dolorida. Não lembra de ter batido a perna.",
    "O edema progrediu para todo o membro inferior esquerdo em 24 horas. A pele está quente e avermelhada. Dor à dorsiflexão do pé. Não consegue caminhar normalmente.",
    "Em uso de anticoncepcional oral combinado há 3 anos. Fumante (10 cigarros/dia). Tia com trombose durante gravidez. Score de Wells para TVP: 3 pontos (probabilidade alta).",
    "D-dímero: 2.800 ng/mL (VR < 500). Hemograma normal. Ecocolordoppler venoso de MMII: trombo oclusivo na veia femoral comum esquerda estendendo-se até veia ilíaca externa — sem compressibilidade venosa.",
    "Pesquisa de trombofilia (coletada antes de anticoagulação): fator V de Leiden heterozigoto positivo — trombofilia hereditária confirmada. Anticoagulação iniciada com rivaroxabana 15 mg 12/12h por 21 dias, depois 20 mg/dia. Anticoncepcional suspenso."
  ],
  clue_labels:["Edema de MMII após viagem prolongada","Progressão e sinais flogísticos","Fatores de risco combinados","D-dímero e ecocolordoppler","Trombofilia hereditária identificada"],
  explanation:"TVP é componente do tromboembolismo venoso (TEV). Os fatores de Virchow (estase, hipercoagulabilidade, lesão endotelial) orientam os fatores de risco. O score de Wells estratifica a probabilidade. D-dímero negativo exclui TVP em casos de baixa probabilidade. O Doppler venoso é o exame de escolha. Anticoagulação por ≥ 3 meses; em caso de trombofilia, avaliar duração estendida.",
  reference:"SBA - Consenso Brasileiro de TEV, 2020. Kearon C et al. Chest 2016.",difficulty:1},

  {id:52,diagnosis:"Dissecção Aórtica",aliases:["dissecção aórtica","dissecção de aorta","tipo a","tipo b","síndrome aórtica aguda"],cid:"I71.0",category:"Cardiologia / Cirurgia Vascular",
  clues:[
    "Homem, 62 anos, chega ao PS com dor torácica de início súbito descrita como 'rasgando' ou 'cortando', irradiando para as costas desde o início. Intensidade máxima imediata — diferente de qualquer dor anterior.",
    "Está pálido, agitado, em sudorese profusa. PA no braço direito: 180/100 mmHg. PA no braço esquerdo: 130/80 mmHg — assimetria de 50 mmHg. Pulsos radiais assimétricos. Sopro diastólico novo no foco aórtico.",
    "Hipertenso não controlado há 20 anos ('tomo quando lembro'). Síndrome de Marfan não diagnosticada previamente. Sem uso de cocaína. Sem história de trauma. Marcador de aterosclerose ausente.",
    "Radiografia de tórax: alargamento do mediastino superior. ECG: sem supradesnivelamento de ST — importante para diagnóstico diferencial com IAM. Troponina: negativa. D-dímero: 4.200 ng/mL. Glicemia: 98 mg/dL.",
    "Angiotomografia de aorta: flap de dissecção na aorta ascendente comprometendo a raiz aórtica, extendendo-se até a ilíaca direita — Dissecção Tipo A (DeBakey I). Pericárdio: derrame moderado sem tamponamento. Transferência imediata para cirurgia cardíaca: substituição de aorta ascendente em caráter de urgência."
  ],
  clue_labels:["Dor torácica 'em rasgo' de início abrupto","Assimetria de pulsos e PA","Fatores de risco: HAS e Marfan","Alargamento de mediastino — sem IAM","Angiotomografia confirmatória — Tipo A"],
  explanation:"Dissecção Aórtica Tipo A (ascendente) é emergência cirúrgica com mortalidade de 1–2% por hora sem tratamento. A dor de início instantâneo com intensidade máxima, irradiando para as costas, e a assimetria de pulsos/PA são claves diagnósticas. A angiotomografia é o exame de escolha. O diagnóstico diferencial com IAM é crítico — trombólise em uma dissecção é fatal.",
  reference:"SBC - Diretrizes de Doenças da Aorta, 2020. Erbel R et al. ESC Guidelines Aortic Diseases 2014.",difficulty:3},

  {id:53,diagnosis:"Tamponamento Cardíaco",aliases:["tamponamento cardíaco","tamponamento","derrame pericárdico com tamponamento","tamponamento pericárdico"],cid:"I31.9",category:"Cardiologia / Emergência",
  clues:[
    "Mulher, 55 anos com câncer de mama metastático em quimioterapia, atendida no PS com dispneia em repouso de início em 2 dias, piora progressiva. Não consegue deitar — só melhora sentada.",
    "Ao exame: taquidispneia (FR 28 ipm), FC 128 bpm, PA 88/72 mmHg — pressão de pulso estreita (16 mmHg). Veia jugular distendida a 45°. Sons cardíacos muito abafados à ausculta. Sem edema de MMII.",
    "Em quimioterapia com doxorrubicina. Relata que já estava 'cansada há um mês, mas achava que era da quimio'. Histórico de pericardite há 3 meses tratada como viral. Sem febre atual.",
    "Radiografia de tórax: cardiomegalia com silhueta cardíaca em 'moringa d'água'. ECG: taquicardia sinusal com baixa voltagem em todos os derivações, alternância elétrica (sinal patognomônico). ECO à beira do leito: derrame pericárdico circunferencial de 3 cm com colapso de átrio direito.",
    "Tríade de Beck completa: hipotensão + turgência jugular + bulhas abafadas. Pulsus paradoxus: 22 mmHg (> 10 mmHg = significativo). Ecocardiograma: colapso diastólico de ventrículo direito. Pericardiocentese de urgência: 620 mL de líquido hemático. Citologia: células neoplásicas — derrame maligno."
  ],
  clue_labels:["Dispneia progressiva em paciente oncológica","Tríade de Beck e ortopneia","Câncer e pericardite prévia","Silhueta em moringa e alternância elétrica","Pulsus paradoxus e ecocardiograma"],
  explanation:"Tamponamento cardíaco é emergência com compressão das câmaras cardíacas pelo líquido pericárdico sob pressão. A tríade de Beck (hipotensão + bulhas abafadas + turgência jugular) é clássica. O pulsus paradoxus > 10 mmHg e a alternância elétrica ao ECG são sinais específicos. Causas: maligna, pericardite, uremia, IAM. A pericardiocentese de urgência é o tratamento definitivo.",
  reference:"Imazio M et al. ESC Guidelines on Pericardial Diseases 2015. SBC Nota de Especialidade.",difficulty:3},

  {id:54,diagnosis:"Fibrilação Atrial",aliases:["fa","fibrilação atrial","arritmia atrial","fa paroxística","fa crônica"],cid:"I48",category:"Cardiologia",
  clues:[
    "Homem, 67 anos, vai à UPA com palpitações há 6 horas — 'coração batendo de forma irregular, rápida, parece que vai sair do peito'. Está ansioso e dispneico ao esforço leve.",
    "Já teve episódio semelhante há 3 meses que passou sozinho em 30 minutos. Agora não passa. Sem dor torácica, sem síncope. Nauseia leve. Tolera deitar.",
    "Hipertenso há 15 anos. Etilista: 'bebeu muito' na véspera (partido de futebol). Apneia do sono não tratada. Tireóide normal há 1 ano. Sem uso de anticoagulantes. CHADS₂-VASc = 2 (HAS + idade ≥ 65).",
    "ECG: ausência de ondas P identificáveis, intervalos R-R irregulares, frequência ventricular 138 bpm. QRS estreito. Sem sinais de pré-excitação. Ecocardiograma: AE = 4,8 cm, FE = 58%, sem trombo à ecotransesofágico.",
    "TSH: normal. Eletrólitos: K⁺ 3,2 mEq/L (hipopotassemia — corrigido). FA com < 48h de início: cardioversão elétrica sincronizada 200 J com reversão a ritmo sinusal. Iniciado amiodarona e anticoagulação com rivaroxabana. Encaminhado para ablação por cateter."
  ],
  clue_labels:["Palpitações irregulares de início agudo","Paroxismos anteriores e gatilhos","Fatores de risco e score CHA₂DS₂-VASc","ECG com FA — frequência ventricular alta","Cardioversão e anticoagulação"],
  explanation:"FA é a arritmia sustentada mais comum, com prevalência de 1–2% na população. O diagnóstico é eletrocardiográfico: ausência de ondas P + irregularidade R-R. O score CHA₂DS₂-VASc guia a anticoagulação (≥ 2 pontos em homens = anticoagulante indicado). FA < 48h: cardioversão elétrica ou farmacológica é segura; > 48h: excluir trombo antes ou anticoagular por 3 semanas.",
  reference:"SBC - Diretriz de FA, 2020. Hindricks G et al. ESC Guidelines on AF 2020.",difficulty:1},

  {id:55,diagnosis:"DPOC Agudizado",aliases:["dpoc","dpoc agudizado","exacerbação de dpoc","doença pulmonar obstrutiva crônica exacerbada"],cid:"J44.1",category:"Pneumologia",
  clues:[
    "Homem, 71 anos, tabagista há 50 anos (60 maços-ano), trazido pelo filho ao PS com piora da falta de ar há 3 dias. Geralmente tem 'bronquite crônica' — tosse com catarro todo dia.",
    "O catarro ficou mais espesso, amarelo-esverdeado, em volume maior que o habitual. Dispneia agora em repouso, não consegue completar uma frase. Febre baixa (37,8°C). Cianose labial discreta.",
    "Internado 3 vezes no último ano por 'crise de bronquite'. Em uso de salbutamol spray SOS e budesonida/formoterol. Não faz fisioterapia nem tem espirometria recente. SpO₂ em casa: habitualmente 91%.",
    "Gasometria arterial com ar ambiente: pH 7,28, PaCO₂ 72 mmHg, PaO₂ 48 mmHg, HCO₃ 32 mEq/L — acidose respiratória com compensação metabólica (hipercapnia crônica agudizada). SpO₂: 84%. Radiografia: hiperinsuflação, diafragma rebaixado, infiltrado em base direita.",
    "Espirometria anterior: VEF₁/CVF = 0,58, VEF₁ = 38% do previsto — GOLD IV (muito grave). Iniciado: oxigenoterapia controlada (SpO₂ alvo 88–92%), broncodilatador inalatório nebulizado, corticoide sistêmico, antibiótico (amoxicilina-clavulanato) e ventilação não invasiva. Internação em UTI."
  ],
  clue_labels:["Piora da dispneia em DPOC grave","Mudança no escarro — exacerbação infecciosa","Histórico de múltiplas internações","Gasometria com hipercapnia agudizada","GOLD IV e VNI indicada"],
  explanation:"A exacerbação de DPOC é definida como piora aguda dos sintomas respiratórios além da variação diária, exigindo mudança de tratamento. As causas mais comuns são infecção (viral ou bacteriana) e poluição. A gasometria é fundamental: hipercapnia com acidose indica suporte ventilatório. A VNI reduz mortalidade, necessidade de IOT e duração da internação. O alvo de SpO₂ é 88–92% (evitar hiperoxia).",
  reference:"GOLD Report 2024. SBP - Consenso DPOC, 2022. Wedzicha JA et al. Eur Respir J 2017.",difficulty:2},

  {id:56,diagnosis:"Asma Aguda Grave",aliases:["crise de asma","asma grave","estado asmático","asma aguda grave"],cid:"J45.901",category:"Pneumologia / Emergência",
  clues:[
    "Adolescente, 16 anos, chega ao PS em crise respiratória há 2 horas. Estava bem quando começou dispneia súbita ao jogar futebol. Usou salbutamol spray 10 vezes sem melhora.",
    "Está sentado, inclinado para frente, com uso intenso de musculatura acessória. Fala em palavras isoladas. Cianose perioral. Sibilância audível sem estetoscópio. SatO₂: 89%. FR: 34 ipm. FC: 132 bpm.",
    "Asmático desde os 3 anos, mal controlado. Interrompeu budesonida há 1 mês 'porque estava se sentindo bem'. Alérgico a pelos de gato — casa nova tem gato. Sem uso de beta-bloqueadores.",
    "Peak flow: 25% do previsto (< 150 L/min — crise muito grave). Gasometria: pH 7,32, PaCO₂ 52 mmHg, PaO₂ 62 mmHg — normocapnia em asmático = exaustão iminente (sinal de gravidade). Radiografia: hiperinsuflação, sem pneumotórax.",
    "Score de Pulmonary Score: 8/9 (muito grave). Tratamento: salbutamol nebulizado contínuo + ipratrópio + metilprednisolona IV 2 mg/kg + oxigênio. Sem melhora após 1h: aminofilina EV. Melhora progressiva após 3h. Iniciado corticoide oral e budesonida/formoterol na alta. Plano de ação escrito."
  ],
  clue_labels:["Crise refratária ao broncodilatador","Taquipneia grave com uso de acessórios","Asma mal controlada e gatilho identificado","Peak flow e gasometria — normocapnia = mau sinal","Escore de gravidade e tratamento escalonado"],
  explanation:"O estado asmático é emergência com risco de parada respiratória. A normocapnia (PaCO₂ normal) em plena crise asmática é sinal de fadiga muscular iminente. O peak flow < 40% indica crise grave. O tratamento de base são beta-2 agonistas inalatórios em altas doses + corticoide sistêmico precoce. A IOT deve ser evitada sempre que possível (alto risco de barotrauma). Identificar e tratar o gatilho é fundamental.",
  reference:"GINA Report 2024. SBP - IV Diretrizes Brasileiras de Asma, 2022.",difficulty:2},

  {id:57,diagnosis:"Pneumotórax Espontâneo",aliases:["pneumotórax","ptx","pneumotórax espontâneo primário","pneumotórax hipertensivo"],cid:"J93.1",category:"Pneumologia / Cirurgia",
  clues:[
    "Homem, 22 anos, estudante de medicina, chega ao PS com dor pleurítica súbita no hemitórax esquerdo e falta de ar leve ao esforço. Iniciou enquanto estava sentado estudando — sem esforço.",
    "A dor piora ao inspirar fundo. Não tem febre. Tosse seca discreta. SatO₂: 96% em ar ambiente. FR: 18 ipm. Está ansioso mas hemodinamicamente estável.",
    "Alto, magro (IMC 18,5). Tabagista — 5 cigarros por dia há 3 anos. Sem asma, sem DPOC, sem trauma recente. Sem histórico de pneumotórax. Sem uso de medicamentos. Família sem história de doença pulmonar.",
    "Ausculta: murmúrio vesicular abolido no hemitórax esquerdo. Percussão: timpanismo. Traqueia na linha média. Radiografia de tórax: linha de pleura visceral visível com > 2 cm de separação do ápice esquerdo — pneumotórax grande (> 20%).",
    "TC de tórax: pneumotórax esquerdo com colapso pulmonar de 35% + blebs subpleurais apicais bilaterais (bolhas enfisematosas pequenas). Drenagem torácica com dreno 24 Fr — expansão pulmonar em 24h. Encaminhado para pleurodese cirúrgica por vídeo (VATS) pela bilateralidade das blebs."
  ],
  clue_labels:["Dor pleurítica súbita em jovem magro","Dispneia leve — sem instabilidade","Perfil de risco: alto, magro, tabagista","Abolição do MV e radiografia confirmatória","TC com blebs — indicação cirúrgica"],
  explanation:"Pneumotórax Espontâneo Primário acomete jovens altos e magros, frequentemente por ruptura de blebs subpleurais apicais. O tabagismo aumenta o risco 22 vezes. O tamanho determina o tratamento: < 20% + estável = aspiração simples ou observação; > 20% ou sintomático = drenagem. Recidiva em 30–50% — pleurodese é indicada após 2º episódio ou blebs visíveis à TC.",
  reference:"SBP - Consenso de Pneumotórax, 2021. MacDuff A et al. Thorax 2010.",difficulty:1},

  {id:58,diagnosis:"Derrame Pleural",aliases:["derrame pleural","pleurite","pleurisia","líquido pleural"],cid:"J90",category:"Pneumologia",
  clues:[
    "Homem, 70 anos, é internado com dispneia progressiva há 1 mês — piora ao deitar do lado direito. Tosse não produtiva. Emagrecimento de 10 kg em 3 meses. Ex-tabagista (40 anos-maço).",
    "Ao exame: macicez à percussão no hemitórax direito até o ângulo da escápula. Murmúrio vesicular abolido. Frêmito tátil ausente. Egofonia presente na transição (sinal de Garland). Sem edema.",
    "Sem insuficiência cardíaca, sem cirrose, sem síndrome nefrótica. Sem febre. Hemoglobina: 10,2 g/dL (anemia normocítica). Sem sangue na tosse. Trabalhador aposentado de siderúrgica (exposição a asbesto por 20 anos).",
    "Radiografia: velamento homogêneo do hemitórax direito com desvio da traqueia para o lado oposto. TC de tórax: derrame pleural direito volumoso + espessamento pleural nodular + nódulo pulmonar em lobo superior direito de 2,8 cm.",
    "Toracocentese diagnóstica: líquido hemorrágico. Exsudato pelos critérios de Light (proteínas líquido/soro > 0,5, LDH líquido/soro > 0,6). Citologia: células malignas — adenocarcinoma. Biópsia pleural guiada por TC: mesotelioma maligno pleural. Estadiamento: estágio IV."
  ],
  clue_labels:["Dispneia progressiva com preferência postural","Macicez e abolição de MV unilateral","Ex-tabagista com exposição ao asbesto","TC com espessamento pleural nodular","Citologia do líquido — exsudato maligno"],
  explanation:"O derrame pleural pode ser transudato (insuficiência cardíaca, cirrose, síndrome nefrótica) ou exsudato (neoplasia, infecção, TEP). Os critérios de Light diferenciam com acurácia de 94%. Derrame unilateral volumoso em idoso com exposição a asbesto deve sempre levantar hipótese de mesotelioma. O derrame hemorrágico com citologia positiva confirma etiologia maligna. A toracocentese é diagnóstica e terapêutica.",
  reference:"SBP - Consenso de Derrame Pleural, 2020. Light RW. Clin Chest Med 2013.",difficulty:2},

  {id:59,diagnosis:"Hepatite B Crônica",aliases:["hepatite b crônica","hbsag","portador de hepatite b","hepatite b"],cid:"B18.1",category:"Gastroenterologia / Infectologia",
  clues:[
    "Mulher, 35 anos, imigrante chinesa, encaminhada após exame pré-natal com HBsAg positivo. Assintomática. Nunca foi avaliada para hepatite. Refere que 'na China todo mundo tem isso'.",
    "Nega sinais de doença hepática: sem icterícia, sem ascite, sem sangramento. Ao exame: fígado palpável a 2 cm do rebordo costal, consistência aumentada, sem esplenomegalia. Sem eritema palmar. PA: 118/76 mmHg.",
    "Mãe com 'doença no fígado' e faleceu de cirrose. HBsAg positivo desde que tem memória. Nunca foi vacinada, nunca recebeu imunoglobulina anti-hepatite B ao nascer. Parceiro testado: negativo.",
    "HBsAg +, Anti-HBs –, HBeAg +, Anti-HBe –, Anti-HBc total +. HBV DNA: 8,4 × 10⁷ UI/mL (alta replicação). TGO: 78 U/L, TGP: 92 U/L. Plaquetas: 148.000/mm³. Elastografia hepática (FibroScan): 9,8 kPa — fibrose F3 (avançada).",
    "Alfa-fetoproteína: 12 ng/mL (levemente elevada). Ultrassom com Doppler: textura hepática heterogênea, sem nódulos. Biópsia hepática: hepatite crônica ativa, fibrose grau 3 de 4. Genotipagem: genótipo B. Indicado tenofovir desoproxila 300 mg/dia. Profilaxia para filho: imunoglobulina + vacina ao nascer."
  ],
  clue_labels:["HBsAg positivo em imigrante assintomática","Exame físico com hepatomegalia","Transmissão vertical e histórico familiar","HBeAg positivo com alta viremia","Fibrose avançada e indicação de tratamento"],
  explanation:"Hepatite B crônica afeta 290 milhões de pessoas no mundo. A transmissão vertical (mãe-filho) é a principal via em países de alta endemia. A fase HBeAg positivo com alta viremia é altamente infectante. A elastografia substituiu parcialmente a biópsia para avaliação da fibrose. O tratamento com análogos de nucleotídeos (tenofovir, entecavir) suprime a replicação viral mas raramente erradica o vírus. A profilaxia ao recém-nascido é mandatória.",
  reference:"SBH - Protocolo de Hepatite B, 2022. EASL Clinical Practice Guidelines on HBV 2017.",difficulty:2},

  {id:60,diagnosis:"Hepatite C Crônica",aliases:["hepatite c crônica","hcv","hepatite c","vírus c"],cid:"B18.2",category:"Gastroenterologia / Infectologia",
  clues:[
    "Homem, 52 anos, ex-usuário de drogas injetáveis, vai ao clínico com 'cansaço crônico' há anos. Descobriu em doação de sangue há 10 anos que era 'hepatite C' mas nunca tratou.",
    "Sem icterícia atual. Queixa de artralgia em múltiplas articulações. Discreta confusão mental em situações de estresse. Ao exame: eritema palmar bilateral, aranhas vasculares em tronco (5), fígado não palpável, baço 2 cm abaixo do rebordo.",
    "Ex-UDIV (parou há 15 anos). Fez tatuagem com material não estéril. Transfusão de sangue em 1985. Parceira negativa. Nunca fez tratamento por 'medo dos efeitos colaterais do interferon'.",
    "Anti-HCV: positivo. HCV RNA: 2,4 × 10⁶ UI/mL. Genotipagem: genótipo 1b. Plaquetas: 88.000/mm³. TGO: 68, TGP: 54. Bilirrubinas normais. INR: 1,3. MELD: 10. Elastografia hepática: 18,4 kPa — cirrose (F4). EGDS: varizes esofágicas de calibre médio grau II.",
    "AFP: 8 ng/mL. Ultrassom: fígado heterogêneo de contornos irregulares — cirrose estabelecida. Ausência de nódulos (rastreio semestral). Tratamento com AADs (antivirais de ação direta): sofosbuvir/velpatasvir por 12 semanas → RVS (resposta virológica sustentada) 12 semanas após — considerado curado."
  ],
  clue_labels:["Cansaço crônico em ex-UDIV","Sinais de hepatopatia crônica","Vias de transmissão múltiplas","Genotipagem e cirrose avançada","Cura com antivirais de ação direta"],
  explanation:"Hepatite C crônica é 'silent killer' — 75% dos pacientes são assintomáticos por décadas. A cirrose se desenvolve em 20–30% após 20–30 anos. Os antivirais de ação direta (AADs) alcançam RVS > 95% em todos os genótipos em 8–12 semanas com mínimos efeitos adversos — verdadeira cura virológica. O rastreio semestral para hepatocarcinoma com USG + AFP é mandatório na cirrose, mesmo após cura.",
  reference:"SBH - PCDT de Hepatite C, 2023. EASL Recommendations on HCV 2022.",difficulty:2},

  {id:61,diagnosis:"Colangite Aguda",aliases:["colangite","colangite aguda","tríade de charcot","síndrome de reynolds"],cid:"K83.0",category:"Gastroenterologia / Cirurgia",
  clues:[
    "Mulher, 68 anos, é trazida ao PS em estado grave com febre alta (39,8°C), dor intensa no hipocôndrio direito e icterícia progressiva nas últimas 12 horas. Marido diz que ela 'ficou amarela do nada'.",
    "A icterícia é evidente nas escleróticas e pele. A dor é constante, com irradiação para o ombro direito. Calafrios intensos. Rebaixamento do nível de consciência — confusa, desorientada.",
    "Histórico de colelitíase conhecida há 5 anos, sem cirurgia. Já teve 2 episódios de 'cólica' tratados na UPA. Não diabética, sem hepatite. Colesterol alto. Toma estatina. PA: 90/60 mmHg.",
    "Hemograma: leucocitose 28.000/mm³ com desvio à esquerda. Bilirrubina total: 12,4 mg/dL (direta 9,8). Fosfatase alcalina: 680 U/L. GGT: 420 U/L. TGO: 280 U/L. Lipase: normal. Ultrassom: coledocolitíase — cálculo de 1,2 cm impactado na papila com dilatação da via biliar intra e extra-hepática.",
    "Tríade de Charcot completa: febre + icterícia + dor em HD. Pêntade de Reynolds: + hipotensão + alteração mental. Hemocultura: E. coli produtora de ESBL. Diagnóstico: colangite aguda grave. CPRE de urgência com papilotomia e extração do cálculo. Piperacilina-tazobactam iniciado."
  ],
  clue_labels:["Febre + icterícia + dor — tríade de Charcot","Rebaixamento mental e instabilidade","Colelitíase de longa data","Obstrução biliar com dilatação ao USG","Pêntade de Reynolds — CPRE urgente"],
  explanation:"Colangite Aguda é infecção bacteriana da via biliar por obstrução (cálculo, estenose, tumor). A Tríade de Charcot (febre + icterícia + dor em HD) e a Pêntade de Reynolds (+ hipotensão + alteração mental) são marcadores clínicos clássicos. O escore de Tokyo guia a gravidade. O tratamento é antibiótico + drenagem biliar urgente via CPRE. A mortalidade sem drenagem chega a 50%.",
  reference:"Miura F et al. Tokyo Guidelines 2018. SBC Cirurgia Biliar - Colangite Aguda.",difficulty:2},

  {id:62,diagnosis:"Úlcera Péptica",aliases:["úlcera péptica","úlcera gástrica","úlcera duodenal","doença ulcerosa péptica"],cid:"K25",category:"Gastroenterologia",
  clues:[
    "Homem, 48 anos, procura gastroenterologista com dor epigástrica recorrente há 6 meses — 'queimação no meio do estômago' que piora com jejum e alivia com alimentação. Acorda às 2h com dor.",
    "A dor cede com leite ou antiácido, mas volta horas depois. Perdeu 4 kg. Nega vômitos. Sem sangue nas fezes visível. Episódio de fezes escurecidas há 3 semanas que atribuiu a 'comida'.",
    "Usa ibuprofeno diariamente há 2 anos por artrose de joelho — 'sem isso não ando'. Fuma 1 maço/dia há 25 anos. Não bebe. Sem história de úlcera. Pai com câncer gástrico operado.",
    "Hemoglobina: 9,8 g/dL (anemia ferropriva). Plaquetas: 380.000. Pesquisa de H. pylori pelo teste respiratório com C¹³: positiva. Endoscopia digestiva alta: úlcera duodenal de 1,2 cm em bulbo duodenal, fundo limpo (Forrest IIC). Mucosa gástrica com gastrite antral difusa.",
    "Biópsia de mucosa gástrica: urease positiva, histologia confirmando H. pylori. Biópsia de bordas da úlcera: sem malignidade. Tratamento: terapia erradicadora (omeprazol + amoxicilina + claritromicina por 14 dias) + suspensão de AINE + proteção gástrica continuada."
  ],
  clue_labels:["Dor epigástrica noturna que alivia com alimento","Padrão típico de úlcera duodenal","AINEs crônico e tabagismo","Anemia e H. pylori positivo","Endoscopia e histologia confirmatórias"],
  explanation:"A úlcera péptica tem duas causas principais: H. pylori (70–90% das duodenais) e AINEs. A dor noturna que alivia com alimento é clássica da úlcera duodenal. Hemoglobina baixa + fezes escurecidas sugere sangramento oculto. A erradicação do H. pylori é curativa na maioria dos casos. Confirmar erradicação com teste respiratório 4 semanas após o término do tratamento.",
  reference:"SBH - Consenso de Infecção por H. pylori, 2018. Malfertheiner P et al. Gut 2022.",difficulty:1},

  {id:63,diagnosis:"Hemorragia Digestiva Alta",aliases:["hda","hemorragia digestiva alta varicosa","sangramento de varizes","varizes esofágicas rotas","hematêmese"],cid:"K92.0",category:"Gastroenterologia / Emergência",
  clues:[
    "Homem, 55 anos, etilista há 30 anos, é trazido pelo SAMU após episódio de hematêmese volumosa — 'vomitou sangue vermelho vivo, quase 1 litro'. Consciente mas muito agitado.",
    "Segundo episódio hoje. Fezes pretas e fétidas há 3 dias. PA: 90/58 mmHg, FC: 128 bpm. Hb: 7,1 g/dL. Está suando, pálido. Turgência jugular ausente. Abdome tenso.",
    "Cirrose alcoólica diagnosticada há 2 anos, sem acompanhamento regular. Nunca fez EGDS de rastreio. Em uso irregular de propranolol. Sem internações anteriores por sangramento. MELD calculado: 18.",
    "Escleróticas ictéricas. Circulação colateral abdominal (cabeça de medusa). Ascite moderada. Eritema palmar. Encefalopatia hepática grau 1 (confusão leve). INR: 1,9. Creatinina: 1,4. Na: 131 mEq/L. Bilirrubina: 4,2 mg/dL.",
    "Após reposição volêmica e transfusão: EDA de urgência — varizes esofágicas de grande calibre (grau III) rotas com estigma de sangramento ativo. Ligadura elástica de 4 varizes. Terlipressina IV + ceftriaxona (profilaxia antibiótica). Nadolol iniciado na alta. Avaliação para transplante hepático."
  ],
  clue_labels:["Hematêmese volumosa em etilista","Choque hemorrágico — instabilidade","Cirrose sem rastreio de varizes","Descompensação hepática múltipla","EDA com ligadura elástica de varizes"],
  explanation:"A hemorragia por varizes esofágicas é a complicação mais temida da hipertensão portal, com mortalidade de 15–25% por episódio. O tratamento envolve ressuscitação volêmica (cautela para não piorar hipertensão portal), drogas vasoativas (terlipressina/octeotride), antibioticoprofilaxia e endoscopia de urgência em < 12h. O MELD > 20 indica alto risco cirúrgico. Transplante é considerado nos Child-Pugh C.",
  reference:"EASL Clinical Practice Guidelines on Prevention and Management of Bleeding in Cirrhosis 2018. SBH Consenso.",difficulty:3},

  {id:64,diagnosis:"Síndrome HELLP",aliases:["hellp","síndrome hellp","hemólise plaquetopenia","complicação da pré-eclâmpsia"],cid:"O14.2",category:"Ginecologia e Obstetrícia",
  clues:[
    "Mulher, 29 anos, 32 semanas de gestação, atendida no PS com dor epigástrica intensa e no hipocôndrio direito há 6 horas. Muito mal-estar geral. Refere cefaleia forte.",
    "Náusea e vômito intensos. PA: 162/108 mmHg (hipertensão grave). Edema de face e mãos. Sinal de Murphy: negativo. Sem icterícia visível. Reflexos patelares hiperativos.",
    "Pré-natal sem intercorrências até 28 semanas. Ganho de peso excessivo nas últimas 3 semanas (+8 kg). Sem doenças prévias. Primigesta. Sem uso de anti-inflamatórios. Nega cefaleia recorrente antes de hoje.",
    "Hemograma: Hb 9,2 g/dL (queda de 3 g em 48h), plaquetas 68.000/mm³. Esfregaço: esquizócitos presentes (hemólise microangiopática). TGO: 280 U/L, TGP: 210 U/L. Bilirrubina total: 2,8 mg/dL. LDH: 820 U/L. Proteinúria: 4,8 g/24h.",
    "Critérios de Sibai para HELLP: Hemólise (LDH > 600 + esquizócitos), Elevação de Enzimas Hepáticas (TGO > 70), plaquetopenia < 100.000. Tríade completa — HELLP completa. Sulfato de magnésio iniciado (profilaxia de eclâmpsia). Resolução imediata da gestação — cesárea de emergência em 34 semanas. CTI neonatal. Plaquetas normalizaram em 48h pós-parto."
  ],
  clue_labels:["Dor epigástrica e cefaleia na gestação","PA grave e reflexos hiperativos","Pré-natal sem intercorrências até recentemente","Hemólise + enzimas hepáticas + plaquetopenia","Critérios de Sibai — HELLP completa"],
  explanation:"Síndrome HELLP é complicação grave da pré-eclâmpsia: Hemolysis + Elevated Liver enzymes + Low Platelets. Pode ocorrer sem hipertensão prévia. Mortalidade materna de 1–3,5%. O tratamento definitivo é a resolução da gestação. Corticosteroides podem ser usados para maturidade pulmonar fetal em < 34 semanas. Sulfato de magnésio é mandatório para profilaxia de eclâmpsia.",
  reference:"FEBRASGO - Protocolo HELLP, 2022. Sibai BM. Am J Obstet Gynecol 1990.",difficulty:3},

  {id:65,diagnosis:"Eclâmpsia",aliases:["eclâmpsia","convulsão na gravidez","eclampsia"],cid:"O15",category:"Ginecologia e Obstetrícia",
  clues:[
    "Mulher, 23 anos, primigesta, 36 semanas, é trazida ao PS pelo marido após crise convulsiva tônico-clônica em casa — 'caiu no chão e ficou tremendo por 2 minutos'. Estava em pré-natal regular.",
    "Na última consulta (3 dias atrás): PA 158/102 mmHg, proteinúria 3+ na fita. Foi orientada a retornar em 1 semana. Hoje chegou com cefaleia frontal intensa e visão embaçada — 'luzes piscando'.",
    "Sem histórico de epilepsia, sem febre, sem TCE. Não usou sulfato de magnésio profilático. Sem diabetes, sem cardiopatia. Movimentação fetal normal segundo ela.",
    "PA ao chegar: 184/118 mmHg. Após a crise ficou confusa por 15 minutos (período pós-ictal). Segunda crise durante a avaliação. Proteinúria de fita: 4+. Reflexos hiperativos +++. Edema maciço de face e MMII.",
    "Exames: plaquetas 112.000/mm³, creatinina 1,1 mg/dL, TGO 68 U/L, proteinúria de 24h: 6,2 g. CTG: desacelerações tardias. Diagnóstico: Eclâmpsia. Sulfato de magnésio 4g IV em bolus → 1g/h. Hidralazina 5 mg IV para crise hipertensiva. Cesárea de emergência em 45 minutos. RN ativo, Apgar 8/9."
  ],
  clue_labels:["Crise convulsiva em gestante no 3º trimestre","Sintomas prodrômicos de pré-eclâmpsia grave","Sem epilepsia prévia — primeira crise","Hipertensão grave e proteinúria maciça","Sulfato de magnésio e resolução imediata"],
  explanation:"Eclâmpsia é convulsão em paciente com pré-eclâmpsia, na ausência de outra causa neurológica. Os sintomas prodrômicos (cefaleia, escotomas, epigastralgia) devem ser reconhecidos. O sulfato de magnésio é superior à fenitoína para prevenção e tratamento. A resolução imediata da gestação é o único tratamento definitivo. A mortalidade materna é de 1–2% mesmo com tratamento adequado.",
  reference:"FEBRASGO - Protocolo de Eclâmpsia, 2022. Magee LA et al. SOGC Guidelines 2022.",difficulty:2},

  {id:66,diagnosis:"Gravidez Ectópica",aliases:["gravidez ectópica","gravidez tubária","ectópica","gestação ectópica"],cid:"O00",category:"Ginecologia e Obstetrícia",
  clues:[
    "Mulher, 26 anos, atendida na UPA com dor abdominal baixa à esquerda há 12 horas — 'cólica fraca que foi ficando mais forte'. Teste de gravidez em farmácia positivo há 2 semanas.",
    "Menstruação atrasada há 6 semanas. Hoje sangramento vaginal escasso, diferente do fluxo normal — 'manchinha marrom'. A dor aumenta ao movimento. Sem febre.",
    "Episódio de doença inflamatória pélvica há 3 anos tratada com antibióticos. DIU removido há 4 meses. Tabagista. Sem gestações anteriores.",
    "Ultrassom transvaginal: útero vazio, sem saco gestacional intrauterino. Estrutura tubária esquerda com imagem anecoica de 3,2 cm × 2,8 cm com anel de fogo ao Doppler (sinal de pseudosaco). Líquido livre na pelve. β-hCG: 3.800 mUI/mL.",
    "Paciente estabilizada: PA 108/70 mmHg, FC 92 bpm. Laparoscopia de urgência: gravidez tubária esquerda íntegra + hemoperitoneu de 300 mL. Salpingectomia esquerda. β-hCG declínio adequado no pós-operatório. Orientação: risco aumentado de nova ectópica na tuba contralateral."
  ],
  clue_labels:["Dor pélvica em mulher com atraso menstrual","Sangramento atípico e localização da dor","Histórico de DIP e fatores de risco","USG sem embrião intrauterino — anel de fogo","Laparoscopia confirmatória"],
  explanation:"Gravidez Ectópica é emergência ginecológica com risco de rotura e choque hemorrágico. A tríade clássica: dor abdominal + sangramento + amenorreia. O diagnóstico precoce baseia-se na β-hCG + USG transvaginal: β-hCG > 2.000 mUI/mL sem saco intrauterino sugere ectópica. Fatores de risco: DIP, cirurgia tubária, tabagismo, DIU. Tratamento: metotrexato (selecionados) ou cirurgia.",
  reference:"FEBRASGO - Gravidez Ectópica, 2022. ACOG Practice Bulletin 2018.",difficulty:2},

  {id:67,diagnosis:"Doença Inflamatória Pélvica",aliases:["dip","doença inflamatória pélvica","salpingite","ooforite","anexite"],cid:"N70",category:"Ginecologia e Obstetrícia / Infectologia",
  clues:[
    "Mulher, 21 anos, procura a ginecologista com dor abdominal baixa bilateral há 4 dias, associada a corrimento amarelo-esverdeado com odor. Piora ao caminhar e ao exame.",
    "Febre de 38,4°C. Dor à palpação bimanual — especialmente nos anexos. Dor ao movimento do colo uterino ao toque ginecológico (sinal do 'amolecimento' do colo). Corrimento mucopurulento pelo orifício cervical.",
    "Inicio da vida sexual aos 16 anos, múltiplos parceiros sem preservativo. Parceiro atual com 'ferida no pênis' há 3 semanas. DIU de cobre inserido há 8 meses. Sem gravidez prévia.",
    "Clamídia (pesquisa por PCR em swab cervical): positiva. Gonorreia: negativa. Leucocitose 14.200/mm³, PCR 38 mg/dL. Ultrassom pélvico transvaginal: espessamento de trompas bilateralmente, líquido livre em fundo de saco — sem abscesso tubo-ovariano.",
    "Critérios mínimos do CDC preenchidos: dor anexial + dor à mobilização do colo. Score de Fitz-Hugh-Curtis negativo (sem dor em HD). Ceftriaxona 500 mg IM dose única + doxiciclina 100 mg 12/12h por 14 dias + metronidazol 500 mg 8/8h por 14 dias. DIU mantido. Parceiro tratado."
  ],
  clue_labels:["Dor pélvica e corrimento mucopurulento","Febre e dor à mobilização do colo","Fatores de risco para IST","Clamídia positiva ao PCR","Critérios CDC e tratamento ambulatorial"],
  explanation:"DIP é infecção do trato genital superior feminino, geralmente ascendente, causada por C. trachomatis, N. gonorrhoeae ou flora vaginal polimicrobiana. Os critérios mínimos do CDC (dor anexial ou à mobilização do colo) permitem tratamento empírico sem aguardar cultura. Complicações: abscesso tubo-ovariano (indica internação + antibiótico IV), infertilidade, gravidez ectópica, dor pélvica crônica. O DIU não precisa ser removido.",
  reference:"CDC STI Treatment Guidelines 2021. FEBRASGO - DIP, 2022.",difficulty:2},

  {id:68,diagnosis:"Depressão Maior",aliases:["depressão","depressão maior","depressão unipolar","episódio depressivo maior","transtorno depressivo maior"],cid:"F32",category:"Psiquiatria / Saúde Mental",
  clues:[
    "Mulher, 36 anos, encaminhada pelo clínico geral após relatar 'não sentir mais vontade de nada' há 3 meses. Não está indo trabalhar. Chora sem motivo. Marido está preocupado.",
    "Dorme 11–12 horas por dia mas acorda cansada. Não come — perdeu 8 kg sem dieta. Não sente prazer em nada que antes gostava (pintava aquarelas, cuidava do jardim — parou tudo). Concentração prejudicada.",
    "Episódio semelhante há 5 anos que durou 6 meses — tratou com antidepressivo por 1 ano, melhorou. Sem histórico de euforia ou mania. Sem uso de álcool ou drogas. Tireóide normal no último exame.",
    "Nega ideação suicida ativa no momento, mas relata que 'às vezes pensa que seria melhor não estar aqui'. Sem plano. Rastreio PHQ-9: escore 22 (depressão grave). Exames físicos e laboratoriais normais: TSH, hemograma, glicemia — sem causa orgânica.",
    "Critérios DSM-5 preenchidos: ≥ 5 sintomas em ≥ 2 semanas incluindo humor deprimido e anedonia + prejuízo funcional. Diagnóstico: Episódio Depressivo Maior grave sem características psicóticas. Iniciado sertralina 50 mg/dia (titulada até 150 mg) + psicoterapia cognitivo-comportamental. Avaliação de risco semanal."
  ],
  clue_labels:["Anedonia e tristeza persistente por > 2 semanas","Hipersônia, apetite reduzido e anedonia","Episódio anterior — recorrência","Ideação passiva e PHQ-9 grave","Critérios DSM-5 e tratamento bimodal"],
  explanation:"Depressão Maior é a principal causa de incapacidade no mundo (OMS). Os dois sintomas cardinais são humor deprimido e anedonia. O DSM-5 exige ≥ 5 sintomas por ≥ 2 semanas. O rastreio com PHQ-9 é validado e guia a gravidade. ISRS são a primeira linha farmacológica. A combinação de psicofármaco + psicoterapia tem maior eficácia que qualquer modalidade isolada. Avaliação de risco de suicídio é sempre necessária.",
  reference:"APA - DSM-5, 2013. CFM - Resolução sobre Saúde Mental. NICE Guidelines Depression 2022.",difficulty:1},

  {id:69,diagnosis:"Transtorno Bipolar Tipo I",aliases:["transtorno bipolar","bipolar","mania","episódio maníaco","tb tipo 1"],cid:"F31",category:"Psiquiatria / Saúde Mental",
  clues:[
    "Homem, 25 anos, trazido pela família ao PS. Há 2 semanas está dormindo 2–3 horas por noite sem sentir cansaço, falando muito e rápido, 'cheio de planos grandiosos para ficar rico'.",
    "Gastou R$ 45.000 do fundo de emergência familiar em investimentos duvidosos e compras impulsivas. Está irritável quando contrariado. Hipersexualidade — infidelidade conjugal recente. Grandiosidade: 'vou ser o próximo Steve Jobs'.",
    "Episódio de depressão grave há 3 anos (tratado com antidepressivo isolado). Nunca teve mania antes. Sem uso de estimulantes, cocaína ou anfetaminas (confirmado pelo familiar). Sem uso de corticoide. Sem insônia prévia.",
    "Ao exame: psicomotricidade acelerada, fuga de ideias, taquipsiquismo, hiperatividade. Distraibilidade intensa — não consegue terminar uma frase. Sem alucinações. Sem comprometimento de realidade grave. Exames laboratoriais, TC de crânio e EEG: normais.",
    "Critérios DSM-5 de episódio maníaco: ≥ 7 dias + ≥ 3 dos 7 critérios (grandiosidade, redução do sono, logorréia, fuga de ideias, distratibilidade, agitação, comportamento de risco). Diagnóstico: Transtorno Bipolar Tipo I, episódio atual maníaco. Internação psiquiátrica. Lítio + olanzapina iniciados. Antidepressivo suspendido."
  ],
  clue_labels:["Redução do sono sem cansaço — sinal cardinal","Comportamento impulsivo e grandiosidade","Episódio depressivo anterior sem mania","Psicomotricidade acelerada e taquipsiquismo","Critérios DSM-5 de mania — internação"],
  explanation:"Transtorno Bipolar Tipo I é caracterizado por ≥ 1 episódio maníaco (com ou sem depressão). A mania clássica inclui euforia ou irritabilidade + redução do sono + grandiosidade + comportamentos de risco. Antidepressivos isolados podem desencadear mania. Estabilizadores de humor (lítio, valproato) são a base do tratamento. O lítio é o único fármaco com evidência de redução de suicídio no TB.",
  reference:"APA - DSM-5, 2013. Malhi GS et al. Bipolar Disorder. Nat Rev Dis Primers 2020.",difficulty:2},

  {id:70,diagnosis:"Esquizofrenia",aliases:["esquizofrenia","psicose esquizofrênica","primeiro episódio psicótico","psicose"],cid:"F20",category:"Psiquiatria / Saúde Mental",
  clues:[
    "Jovem, 20 anos, trazido pela mãe ao PS. Há 4 meses está isolado no quarto, não vai à faculdade, parou de tomar banho e falar com amigos. A mãe acha que 'está com depressão'.",
    "Quando conversa com a mãe, diz que 'as pessoas na rua o observam' e que a vizinha coloca 'ondas no apartamento para roubar seus pensamentos'. Às vezes ri sozinho sem motivo aparente.",
    "Sem uso de álcool, maconha, cocaína ou outra droga (confirmado com toxicológico urinário negativo). Sem febre, sem cefaleia, sem convulsões. Pai com 'problema nervoso' tratado com remédio por anos.",
    "Ao exame: afeto embotado, alogia (respostas monossilábicas), avolição. Delírios de referência e perseguição estruturados. Alucinações auditivas — 'vozes que comentam o que estou fazendo'. Sem comprometimento de memória ou orientação. RNM de crânio: normal. EEG: normal.",
    "Critérios DSM-5: sintoma A (2+ dos seguintes por ≥ 1 mês): delírios + alucinações + fala desorganizada. Disfunção social/ocupacional > 6 meses. Sem causa orgânica identificada. Diagnóstico: Esquizofrenia, primeiro episódio psicótico. Iniciado risperidona 2 mg/dia com titulação + reabilitação psicossocial. Internação psiquiátrica voluntária."
  ],
  clue_labels:["Isolamento social e abandono das atividades","Delírios de perseguição e passividade","Ausência de causa orgânica ou tóxica","Sintomas positivos e negativos ao exame","Critérios DSM-5 — primeiro episódio"],
  explanation:"Esquizofrenia tem pico de início no final da adolescência/início da vida adulta. Os sintomas positivos (alucinações, delírios, pensamento desorganizado) e negativos (alogia, anedonia, avolição) coexistem. O diagnóstico requer ≥ 2 sintomas A por ≥ 1 mês + disfunção por ≥ 6 meses sem causa orgânica ou tóxica. Os antipsicóticos de 2ª geração são a primeira escolha. A detecção precoce melhora o prognóstico.",
  reference:"APA - DSM-5, 2013. Leucht S et al. Lancet 2017.",difficulty:2},

  {id:71,diagnosis:"Síndrome de Abstinência Alcoólica",aliases:["abstinência alcoólica","delirium tremens","saa","síndrome de abstinência do álcool","abstinência de álcool"],cid:"F10.3",category:"Psiquiatria / Emergência",
  clues:[
    "Homem, 48 anos, é trazido ao PS por vizinhos com tremores generalizados, sudorese profusa e agitação há 6 horas. Ficou internado 3 dias por pneumonia e voltou para casa ontem.",
    "Está confuso, desorientado, com alucinações visuais ('estou vendo bichos na parede'). Temperatura: 38,2°C. FC: 128 bpm. PA: 168/102 mmHg. Tremores visíveis em mãos e língua. Hiperreflexia.",
    "Etilista pesado há 20 anos — bebia aproximadamente 1 litro de cachaça por dia. Durante a internação ficou abstinente abruptamente sem nenhum suporte farmacológico para síndrome de abstinência.",
    "Na internação anterior, teve convulsão generalizada no 2º dia sem diagnóstico claro (possível início da SAA). Lúcido nos intervalos de agitação. CIWA-Ar: 32 pontos (abstinência grave). Glicemia: 62 mg/dL (hipoglicemia).",
    "Diagnóstico: Delirium Tremens (forma mais grave da SAA). Iniciado diazepam 10 mg IV a cada 15 min (protocolo de titulação sintomática) + tiamina 500 mg IV (antes da glicose para evitar Wernicke) + hidratação + monitorização contínua. Transferência para UTI. CIWA-Ar reduzido para 8 em 24h."
  ],
  clue_labels:["Tremores e agitação após suspensão abrupta","Alucinações e instabilidade autonômica","Etilismo pesado — abstinência iatrogênica","Convulsão prévia e CIWA-Ar grave","Delirium Tremens — BDZ + tiamina urgente"],
  explanation:"A Síndrome de Abstinência Alcoólica inicia 6–24h após a última dose e o Delirium Tremens se instala em 48–72h. A tríade do DT: alucinações + tremores + instabilidade autonômica. O CIWA-Ar quantifica a gravidade. Os benzodiazepínicos são o tratamento padrão (protocolo de titulação sintomática). A tiamina DEVE preceder a glicose para evitar Encefalopatia de Wernicke. Mortalidade do DT sem tratamento: 15–35%.",
  reference:"MS Brasil - SUPERA - Tratamento do Abuso de Álcool. ASAM Clinical Practice Guideline 2020.",difficulty:2},

  {id:72,diagnosis:"Intoxicação por Organofosforado",aliases:["intoxicação por organofosforado","intoxicação por agrotóxico","organofosforado","inibidor de colinesterase"],cid:"T60.0",category:"Emergência / Toxicologia",
  clues:[
    "Homem, 45 anos, trabalhador rural do Mato Grosso, é trazido inconsciente pelo irmão após ser encontrado no plantio de soja. Ao redor, frascos de inseticida organofosforado (metamidofós).",
    "Miose bilateral puntiforme. Sialorreia copiosa, lacrimejamento intenso, broncoespasmo audível. Bradicardia: 42 bpm. Sudorese profusa. Vômito de conteúdo alimentar. Fezes líquidas involuntárias.",
    "Trabalhava sem EPI. Aplicação de pesticida com vento favorável (exposição inalatória + cutânea). Sem histórico de intoxicação anterior. Família relata que 'não lembrava de lavar as mãos'.",
    "GCS: 8 (E2V2M4). Fasciculações musculares visíveis em face e membros. Hiperestimulação colinérgica clássica: SLUDGE (Salivação, Lacrimejamento, Urinação, Defecação, GI distress, Emese). DUMBELS também presentes. Colinesterase eritrocitária: 20% do valor normal.",
    "Diagnóstico: Intoxicação grave por organofosforado. Atropina 2–4 mg IV a cada 5–10 min até secagem das secreções (atropinização — não é para corrigir bradicardia isolada). Pralidoxima 1–2 g IV em 15–30 min (dentro de 24h para ser eficaz). Intubação orotraqueal por insuficiência respiratória. Descontaminação com lavagem da pele e vômito induzido não indicado."
  ],
  clue_labels:["Inconsciência após exposição a agrotóxico","Síndrome muscarínica — miose e bradicardia","Exposição cutânea e inalatória sem EPI","SLUDGE e colinesterase suprimida","Atropina + pralidoxima — tratamento específico"],
  explanation:"Os organofosforados inibem a acetilcolinesterase, causando acúmulo de acetilcolina. Os efeitos são muscarínicos (SLUDGE/DUMBELS), nicotínicos (fasciculações, paralisia) e centrais (convulsão, coma). O diagnóstico é clínico. A atropina antagoniza os efeitos muscarínicos (secretomotores e cardíacos). A pralidoxima reativa a colinesterase se usada precocemente (< 24–48h). Notificação ao SINAN obrigatória.",
  reference:"MS Brasil - Protocolo de Intoxicações Exógenas, 2020. Eddleston M et al. Lancet 2008.",difficulty:3},

  {id:73,diagnosis:"Traumatismo Cranioencefálico Grave",aliases:["tce grave","traumatismo cranioencefálico","tce","trauma crânio","trauma cranioencefálico grave"],cid:"S06.3",category:"Emergência / Neurocirurgia",
  clues:[
    "Homem, 28 anos, motociclista envolvido em colisão com caminhão a 80 km/h. Trazido pelo SAMU com GCS 6 (E1V2M3). Capacete parcialmente destruído. Sangramento pelo ouvido esquerdo.",
    "Ao chegar ao PS: anisocoria — pupila esquerda 7 mm, não reativa. Pupila direita 3 mm, reagente. Taquicardia 118 bpm, PA 158/96 mmHg. Respiração irregular (Cheyne-Stokes).",
    "Colegas relatam que inicialmente estava consciente e falava ('intervalo lúcido') — perdeu a consciência progressivamente em 45 minutos. Sem uso de anticoagulantes. Sem histórico de doenças.",
    "TC de crânio: hematoma epidural temporoparietal esquerdo biconvexo de 40 mL com desvio de linha média de 8 mm para a direita. Fratura temporal esquerda (ruptura da artéria meníngea média). Edema cerebral difuso.",
    "Protocolo HTC: intubação imediata, manitol 1 g/kg IV, decúbito 30°, PA alvo < 180/110. Neurocirurgia de emergência: craniectomia descompressiva e drenagem do hematoma em < 2h do trauma. Monitorização de PIC: atingiu 45 mmHg — manitol adicional. Sobrevivente com sequela motora."
  ],
  clue_labels:["GCS 6 após trauma de alta energia","Anisocoria — herniação uncal","Intervalo lúcido clássico de HED","TC com hematoma epidural biconvexo","Cirurgia de emergência — craniectomia"],
  explanation:"O TCE Grave (GCS ≤ 8) tem mortalidade de 30–40%. O hematoma epidural clássico: intervalo lúcido + deterioração progressiva + anisocoria ipsilateral (herniação). É causado pela ruptura da artéria meníngea média por fratura temporal. A TC é mandatória. A cirurgia em < 4h é determinante do prognóstico. O monitoramento da PIC com alvo < 20 mmHg e PPC > 60 mmHg é padrão de UTI neurocirúrgica.",
  reference:"Brain Trauma Foundation Guidelines 2016. SBNS - Protocolo TCE Grave.",difficulty:3},

  {id:74,diagnosis:"Câncer de Mama",aliases:["câncer de mama","adenocarcinoma de mama","carcinoma de mama","tumor de mama","neoplasia mamária"],cid:"C50",category:"Oncologia / Cirurgia",
  clues:[
    "Mulher, 52 anos, descobre nódulo na mama direita ao se examinar no banho. 'Duro como uma pedra, não dói'. Não percebeu há 3 meses quando fez exame sozinha.",
    "Ao exame: nódulo de 2,5 cm no quadrante súpero-externo direito, endurecido, de bordas irregulares, fixo aos planos profundos, sem mobilidade. Pele sobrejacente com sinal da casca de laranja. Linfonodo palpável na axila direita.",
    "Menopausa há 3 anos. Menarca aos 11 anos, sem filhos (nulípara). Usou TRH por 5 anos. Mãe e tia materna com câncer de mama. Nunca fez mamografia. Sem tabagismo, sem álcool.",
    "Mamografia: nódulo hiperdenso BIRADS 5 (suspeita de malignidade > 95%) com microcalcificações agrupadas. Ultrassom: nódulo sólido hipoecoico de bordas espiculadas, vascularização aumentada ao Doppler. Core biopsy: carcinoma ductal invasivo grau 3.",
    "Imunohistoquímica: RE + 90%, RP + 80%, HER-2 negativo, Ki-67 35% (luminal B). Estadiamento: T2N1M0 — estágio IIA. BRCA1/2: mutação BRCA2 identificada. Tratamento: quimioterapia neoadjuvante → cirurgia (mastectomia ou quadrantectomia) → radioterapia → hormonioterapia por 10 anos."
  ],
  clue_labels:["Nódulo mamário endurecido de bordas irregulares","Sinal da casca de laranja e linfonodo axilar","Fatores de risco múltiplos incluindo BRCA","BIRADS 5 e biópsia de core confirmatória","Imunohistoquímica — luminal B — estadiamento"],
  explanation:"Câncer de mama é o mais incidente em mulheres no Brasil (exceto pele não melanoma). O rastreio com mamografia é recomendado a partir dos 40 anos (INCA) ou 50 anos (WHO) — debate em andamento. O subtipo molecular (luminal A/B, HER-2 enriquecido, triplo negativo) determina o tratamento. A mutação BRCA indica rastreio familiar e possível mastectomia profilática contralateral. A sobrevida em estágio I/II é > 90% em 5 anos.",
  reference:"INCA - Manual de Câncer de Mama, 2021. NCCN Guidelines Breast Cancer 2024.",difficulty:1},

  {id:75,diagnosis:"Câncer Colorretal",aliases:["câncer colorretal","câncer de cólon","câncer de reto","adenocarcinoma colorretal","tumor de cólon"],cid:"C18",category:"Oncologia / Cirurgia",
  clues:[
    "Homem, 58 anos, encaminhado pela UBS após teste de sangue oculto nas fezes positivo em rastreamento. Assintomático até 3 meses atrás. Agora nota 'mudança no hábito intestinal' — alternância de diarreia e constipação.",
    "Fezes mais finas que o habitual ('em fita'). Sensação de evacuação incompleta. Sangue nas fezes uma vez por semana — misturado com as fezes, não no papel. Emagrecimento de 5 kg sem tentar.",
    "Pai com câncer de cólon operado aos 55 anos. Dieta rica em carnes vermelhas e processadas. Sedentário. IMC: 31. Fumante (15 maços-ano). Sem uso de AAS crônico. Colonoscopia nunca realizada.",
    "CEA: 18,4 ng/mL (VR < 5). Hemograma: anemia microcítica hipocrómica (Hb 9,8 g/dL). Colonoscopia: lesão vegetante ulcerada de 4 cm no cólon sigmoide com obstrução parcial. Biópsia: adenocarcinoma bem diferenciado.",
    "TC de tórax, abdome e pelve: espessamento parietal sigmoide + 3 linfonodos mesentéricos suspeitos + ausência de metástases à distância. Estadiamento: T3N1M0 — estágio IIIb. MSI/RAS/BRAF testados: RAS mutado, pMMR. Tratamento: cirurgia laparoscópica (sigmoidectomia) + quimioterapia adjuvante (FOLFOX)."
  ],
  clue_labels:["Sangue oculto positivo em assintomático","Mudança do hábito intestinal e fezes em fita","Histórico familiar e fatores de risco","CEA elevado e adenocarcinoma à biópsia","Estadiamento IIIb — cirurgia + quimioterapia"],
  explanation:"Câncer colorretal é o 3º mais incidente no mundo e 2º em mortalidade. O rastreio com colonoscopia a partir dos 45–50 anos (ou 40 anos com risco familiar) permite detecção precoce e remoção de pólipos precursores. O CEA não é diagnóstico mas tem valor prognóstico e de seguimento. O rastreio de instabilidade de microssatélites (MSI) e mutação RAS/BRAF guia o tratamento sistêmico. Sobrevida em estágio I: > 90%; estágio IV: < 15% em 5 anos.",
  reference:"INCA - Câncer Colorretal, 2022. NCCN Guidelines Colorectal Cancer 2024.",difficulty:1},

  {id:76,diagnosis:"Leucemia Mieloide Aguda",aliases:["lma","leucemia mieloide aguda","leucemia aguda mielóide","leucemia aguda"],cid:"C91.0",category:"Hematologia / Oncologia",
  clues:[
    "Homem, 65 anos, vai ao clínico com fadiga intensa há 3 semanas, equimoses espontâneas no corpo ('aparecem do nada') e sangramento gengival ao escovar os dentes. 'Não estou conseguindo trabalhar'.",
    "Febres recorrentes sem foco identificado. Pele e conjuntivas pálidas. Equimoses em membros inferiores. Gengiva hipertrofiada e sangrante ao toque. Baço palpável 3 cm abaixo do rebordo. Sem linfonodomegalia.",
    "Ex-tabagista. Tratou linfoma há 10 anos com quimioterapia (agentes alquilantes). Sem histórico de síndrome mielodisplásica. Não usa anticoagulantes. Sem etilismo. Trabalhador exposto a benzeno por 15 anos.",
    "Hemograma: Leucócitos 84.000/mm³ com 75% de blastos na diferencial. Hb: 6,8 g/dL. Plaquetas: 18.000/mm³. LDH: 1.200 U/L. Ácido úrico: 11 mg/dL. Coagulograma: TAP alargado, fibrinogênio baixo — CIVD associada.",
    "Mielograma: 82% de blastos mieloides com bastonetes de Auer — patognomônicos de LMA. Imunofenotipagem: CD13+, CD33+, CD117+, MPO+. Citogenética: t(15;17) — LMA-M3 (promielocítica). FISH: gene PML-RARα positivo. Tratamento: ATRA (ácido all-trans-retinóico) + trióxido de arsênio — maior taxa de cura."
  ],
  clue_labels:["Fadiga, equimoses e sangramento em idoso","Hipertrofia gengival — sugestivo de M4/M5","Exposição a benzeno e quimioterapia prévia","Leucocitose com blastos e CIVD","Bastonetes de Auer e t(15;17) — LMA-M3"],
  explanation:"Leucemia Mieloide Aguda é emergência hematológica com proliferação clonal de blastos mieloides. Os bastonetes de Auer são patognomônicos. A LMA-M3 (promielocítica) é a única LMA com ATRA como base do tratamento — altamente curável (> 90% de remissão). A CIVD é complicação frequente na M3. A exposição ao benzeno e quimioterapia prévia com agentes alquilantes são fatores de risco. O mielograma confirma o diagnóstico.",
  reference:"ABH - Diretrizes de LMA, 2021. Döhner H et al. Blood 2017.",difficulty:3},

  {id:77,diagnosis:"Linfoma de Hodgkin",aliases:["linfoma de hodgkin","doença de hodgkin","hodgkin","linfoma hodgkin"],cid:"C81",category:"Hematologia / Oncologia",
  clues:[
    "Jovem, 22 anos, nota caroço no pescoço direito há 3 meses — 'endurecido, não dói, não sumiu'. Perdeu 8 kg em 3 meses sem dieta. Suor noturno que molha o pijama toda noite.",
    "Após banho quente, percebe prurido intenso em todo o corpo. Febre vespertina de 38,3°C sem causa identificada. Múltiplas adenopatias cervicais e supraclaviculares direitas palpáveis (maiores 3,5 cm), elásticas, indolores.",
    "Sem uso de antibióticos recente. Mononucleose há 2 anos (EBV positivo). Nunca fumou. Sem histórico familiar de neoplasia. Sem imunodeficiência conhecida.",
    "Hemograma: leucocitose leve com eosinofilia (8%), VHS 88 mm/h, LDH 420 U/L, albumina 2,8 g/dL. LDH elevada. Biópsia excisional de linfonodo cervical: presença de células de Reed-Sternberg binucleadas com halos claros ('olho de coruja') — diagnóstico patognomônico de Doença de Hodgkin.",
    "PET-CT: captação aumentada em linfonodos cervicais e mediastinais bilaterais, baço + nódulo pulmonar. Estadiamento Ann Arbor: estágio IIIs-B (B = febre + sudorese + perda de peso; s = baço). Tratamento: ABVD (adriamicina, bleomicina, vimblastina, dacarbazina) 6 ciclos + radioterapia consolidação. Taxa de cura > 85%."
  ],
  clue_labels:["Linfonodomegalia cervical indolor em jovem","Sintomas B + prurido após banho quente","Exposição prévia ao EBV","Célula de Reed-Sternberg — diagnóstico patognomônico","PET-CT e estadiamento Ann Arbor"],
  explanation:"Linfoma de Hodgkin tem distribuição bimodal (jovens 15–34 e > 55 anos). Os sintomas B (febre + sudorese noturna + perda de peso > 10%) têm valor prognóstico. O prurido após calor é característica peculiar. A célula de Reed-Sternberg é patognomônica — diagnóstico requer biópsia excisional. O PET-CT é o exame de estadiamento de escolha. Linfoma de Hodgkin clássico é altamente curável (> 80%) mesmo em estágios avançados.",
  reference:"ABH - Diretrizes de Linfoma de Hodgkin, 2022. Ansell SM. N Engl J Med 2015.",difficulty:2},

  {id:78,diagnosis:"Anemia Falciforme",aliases:["anemia falciforme","drepanocitose","crise falcêmica","falcização","doença falciforme"],cid:"D57.0",category:"Hematologia",
  clues:[
    "Criança, 8 anos, trazida ao PS em crise de dor intensa em membros inferiores — 'a perna tá doendo muito, ela fica assim desde pequena'. Chorar de dor. Mãe diz que é a 3ª vez este mês.",
    "A criança tem mãos e pés inchados ao mesmo tempo (dactilite). Febre de 38,6°C. Pálida, conjuntivas levemente ictéricas. Esplenomegalia. Dor à palpação dos ossos longos bilateralmente.",
    "Diagnóstico de anemia falciforme aos 3 meses (triagem neonatal HbSS). Em uso de hidroxiureia e penicilina profilática. Não recebeu transfusão este mês. Morou em área fria esta semana — irmão com gripe.",
    "Hemograma: Hb 6,2 g/dL (basal 8,0 g/dL), reticulócitos 14%, leucocitose 22.000/mm³, plaquetas 480.000/mm³. Bilirrubina indireta: 3,8 mg/dL. Esfregaço: drepanócitos (células em foice) e corpúsculos de Howell-Jolly. Rx ossos: sem osteomielite.",
    "Diagnóstico: Crise vaso-oclusiva em anemia falciforme HbSS, precipitada por infecção viral e hipotermia. Tratamento: hidratação IV + analgesia com morfina (protocolo de dor falciforme) + monitorização da saturação + transfusão simples (Hb alvo 10 g/dL). Discutido aumento de dose de hidroxiureia. Vacinação em dia verificada."
  ],
  clue_labels:["Crise dolorosa recorrente em criança","Dactilite e febre — crise vaso-oclusiva","Diagnóstico prévio e tratamento de base","Drepanócitos e anemia hemolítica","Fatores precipitantes e manejo da crise"],
  explanation:"Anemia Falciforme (HbSS) é a doença monogênica mais prevalente no Brasil — 3.500 nascidos/ano. A triagem neonatal permite diagnóstico precoce e profilaxia com penicilina. As crises vaso-oclusivas são precipitadas por infecção, desidratação, frio e estresse. A hidroxiureia aumenta HbF e reduz crises em 50%. Complicações: AVC, síndrome torácica aguda, necrose avascular, retinopatia. O transplante de medula é a única cura disponível.",
  reference:"MS Brasil - PNTN - Triagem Neonatal. SBH - Consenso de Hemoglobinopatias, 2021.",difficulty:2},

  {id:79,diagnosis:"Anemia Ferropriva",aliases:["anemia ferropriva","anemia por deficiência de ferro","anemia carencial","anemia microcítica","anemia por falta de ferro"],cid:"D50",category:"Hematologia",
  clues:[
    "Mulher, 32 anos, refere cansaço há 4 meses — 'fico sem fôlego ao subir escadas'. Palpitações leves ao esforço. Fica 'branca como papel'. Acorda cansada mesmo dormindo 9 horas.",
    "Menstruação intensa há 2 anos — troca absorvente a cada 2 horas nos primeiros 3 dias. Relata vontade de comer gelo o tempo todo (pagofagia) e terra (pica). Unhas quebradiças e côncavas.",
    "Vegetariana há 3 anos. Sem sangramento gastrointestinal. Sem doenças inflamatórias crônicas. Sem uso de IBP crônico. Menarca aos 12 anos, ciclos regulares mas muito intensos há 2 anos.",
    "Hemograma: Hb 7,4 g/dL, VCM 68 fL (microcitose), HCM 20 pg (hipocromia), RDW 18% (anisocitose). Ferro sérico: 22 µg/dL (↓). Ferritina: 4 ng/mL (depleção dos estoques). TIBC: 520 µg/dL (↑). Saturação de transferrina: 4% (↓). Esfregaço: microcitose e hipocromia acentuadas.",
    "Investigação de causa: USG transvaginal — útero com múltiplos miomas (miomatose). Sem sangramento digestivo oculto (pesquisa negativa). Suplementação: sulfato ferroso 200 mg 3x/dia por via oral. Reticulocitose em 7–10 dias (resposta terapêutica). Encaminhada para ginecologista para tratamento da causa."
  ],
  clue_labels:["Fadiga e dispneia ao esforço","Menstruação intensa e pica/pagofagia","Vegetariana sem suplementação","Ferritina baixa e microcitose hipocromica","Miomatose como causa identificada"],
  explanation:"Anemia ferropriva é a anemia mais comum no mundo. No Brasil, afeta 20% das mulheres em idade reprodutiva. A ferritina baixa é o marcador mais precoce e específico de depleção de ferro. O RDW elevado reflete anisocitose — mistura de células normais e microcíticas. A pica e pagofagia são sintomas característicos. O tratamento oral é eficaz mas lento (2–3 meses para normalizar estoques); a causa deve sempre ser identificada.",
  reference:"SBH - Consenso de Anemias, 2021. WHO Worldwide Prevalence of Anaemia 2008.",difficulty:1},

  {id:80,diagnosis:"Coagulação Intravascular Disseminada",aliases:["civd","coagulação intravascular disseminada","coagulopatia de consumo","civd aguda"],cid:"D65",category:"Hematologia / Emergência",
  clues:[
    "Mulher, 28 anos, em pós-operatório imediato de cesariana de emergência por descolamento prematuro de placenta. Apresenta sangramento ativo nos curativos, hematúria e sangramento pelo cateter venoso.",
    "Útero tônico, sem atonia. O sangramento nos curativos é coagulo-free — sangue não coagula no curativo. Equimoses espontâneas nos locais de venopunção. Sangramento gengival. PA: 96/60 mmHg, FC: 128 bpm.",
    "Descolamento prematuro com hematoma retroplacentário de 400 mL identificado na cirurgia. Concepto nasceu com Apgar 4/7. Recebeu misoprostol e oxitocina intraoperatória. Sem febre.",
    "Hemograma: Hb 8,2 g/dL, plaquetas 38.000/mm³. TAP: 38% (INR 2,8). TTPa: 68s (relação 2,2). Fibrinogênio: 0,8 g/L (↓↓). D-dímero: > 20.000 ng/mL. Esfregaço: esquizócitos presentes (hemólise microangiopática).",
    "Score ISTH de CIVD: 6 pontos (CIVD evidente). Diagnóstico: CIVD aguda secundária ao DPP — 'consumo' de fatores de coagulação e plaquetas + fibrinólise excessiva. Tratamento: plasma fresco congelado 15 mL/kg, crioprecipitado (fibrinogênio), concentrado de plaquetas, trombina tópica nos sítios cirúrgicos. Suporte com vasopressores."
  ],
  clue_labels:["Sangramento difuso no pós-operatório obstétrico","Sangue sem coagulação — coagulopatia","Descolamento de placenta como gatilho","Consumo de plaquetas e fatores — D-dímero elevado","Score ISTH e reposição de hemoderivados"],
  explanation:"CIVD é síndrome de consumo de fatores de coagulação e plaquetas com ativação simultânea de coagulação e fibrinólise. Causas: sepse, trauma grave, complicações obstétricas (DPP, embolia amniótica, placenta prévia), neoplasias. O Score ISTH distingue CIVD evidente (≥ 5 pontos) da não-evidente. O tratamento é da causa + reposição guiada (alvo fibrinogênio > 1,5 g/L, plaquetas > 50.000, INR < 1,5).",
  reference:"ISTH Scientific Standardization Committee Guidelines 2013. FEBRASGO - Coagulopatias Obstétricas 2022.",difficulty:3},

  {id:81,diagnosis:"Neurocisticercose",aliases:["neurocisticercose","cisticercose cerebral","cisticercose","tenia solium cerebral"],cid:"B69.0",category:"Infectologia / Neurologia",
  clues:[
    "Homem, 35 anos, atendido no PS após 2 crises convulsivas tônico-clônicas nos últimos 3 meses — primeira vez na vida. Sem perda de consciência fora das crises. Cefaleia crônica há 6 meses.",
    "As convulsões têm início focal (mão esquerda) e depois generalização secundária. Período pós-ictal de 20 minutos. Sem febre, sem rigidez de nuca. Exame neurológico interictal: normal.",
    "Mora em zona rural de Minas Gerais. Trabalhou em criação de suínos sem higiene rigorosa. Consome carne de porco 'mal passada'. Sem diagnóstico prévio de epilepsia. Irmão com quadro semelhante.",
    "TC de crânio com contraste: múltiplas lesões hipodensas com halo de edema no parênquima cerebral, algumas com ponto hiperdenso central ('escólex') — 'aspecto de olho de sapo'. Algumas calcificadas.",
    "ELISA para cisticercose no LCR: positivo com título 1:64. Eletroencefalograma: foco irritativo temporal esquerdo. Diagnóstico: Neurocisticercose parenquimatosa múltipla — fase coloidovesicular. Tratamento: albendazol 15 mg/kg/dia por 28 dias + dexametasona 8 mg/dia (reduzir inflamação) + valproato (antiepiléptico)."
  ],
  clue_labels:["Epilepsia focal de início na vida adulta","Crises focais com generalização secundária","Exposição a suíno e zona rural endêmica","Lesões com escólex — 'olho de sapo'","ELISA positivo no LCR — tratamento antiparasitário"],
  explanation:"Neurocisticercose é a causa mais comum de epilepsia adquirida no Brasil e na América Latina. O homem é hospedeiro acidental de Taenia solium ao ingerir ovos (fezes humanas/suínas). A TC mostra lesões em diferentes fases (viva, coloidovesicular, granulonodular, calcificada). O diagnóstico é combinado: clínica + neuroimagem + sorologia (LCR > soro). O tratamento com albendazol é eficaz nas lesões viáveis; calcificadas não precisam de antiparasitário.",
  reference:"ABN - Diretriz de Neurocisticercose, 2019. Garcia HH et al. N Engl J Med 2018.",difficulty:2},

  {id:82,diagnosis:"Síndrome de Cushing",aliases:["síndrome de cushing","cushing","hipercortisolismo","doença de cushing"],cid:"E24",category:"Endocrinologia",
  clues:[
    "Mulher, 38 anos, atendida pelo clínico com ganho de peso de 18 kg em 1 ano — 'engordo no barrigão mas os braços e pernas ficaram finos'. Hipertensão nova que não controlava com 3 medicamentos.",
    "Surgimento de estrias arroxeadas largas (> 1 cm) no abdome, quadril e coxas. Pelos no rosto ('bigodinho'). Acne em adulta. Pele fina com hematomas fáceis. Fraqueza para levantar de cadeiras sem apoio.",
    "Em uso de corticoide inalatório para asma há 5 anos (dose alta). Não usa corticoide oral ou injetável. Menstruação irregular há 6 meses. Paciente acha que 'é a menopausa'. Mãe diabética.",
    "Cortisol salivar noturno: 2× elevado (11,4 nmol/L). Cortisol urinário livre de 24h: 4× acima do normal. Teste de supressão com 1 mg de dexametasona: cortisol matinal 8,2 µg/dL (não suprimido — VR < 1,8). ACTH: 98 pg/mL (normal-alto).",
    "RNM de hipófise com gadolínio: microadenoma hipofisário de 6 mm na região paraselar esquerda — Doença de Cushing (ACTH-dependente de origem hipofisária). Cateterismo dos seios petrosos inferiores confirma origem central. Cirurgia trans-esfenoidal com remoção do adenoma."
  ],
  clue_labels:["Obesidade central com extremidades finas","Estrias arroxeadas e hirsutismo","Uso crônico de corticoide — descartado como causa","Hipercortisolismo confirmado em 3 testes","RNM com microadenoma — Doença de Cushing"],
  explanation:"Síndrome de Cushing pode ser exógena (corticoide iatrogênico — causa mais comum) ou endógena. A causa endógena mais comum é o adenoma hipofisário secretor de ACTH (Doença de Cushing, 70%). O diagnóstico laboratorial requer 2 testes confirmatórios (cortisol urinário + cortisol noturno + supressão com 1 mg de dexametasona). A Doença de Cushing é tratada por cirurgia trans-esfenoidal com taxa de cura de 70–90%.",
  reference:"SBEM - Consenso de Síndrome de Cushing, 2021. Nieman LK et al. J Clin Endocrinol Metab 2015.",difficulty:3},

  {id:83,diagnosis:"Insuficiência Adrenal Aguda",aliases:["crise adrenal","insuficiência adrenal aguda","crise addisoniana","insuficiência adrenal","addison"],cid:"E27.1",category:"Endocrinologia / Emergência",
  clues:[
    "Mulher, 45 anos, é trazida ao PS em estado grave com náusea, vômitos e diarreia intensa há 2 dias. Muito prostrada, mal consegue ficar sentada. Hipotensão que não responde a soro.",
    "PA: 78/50 mmHg. FC: 118 bpm. Temperatura: 38,1°C. Pele hiperpigmentada — bronzeado intenso nas palmas das mãos, cotovelos e mucosa oral. Apesar de ser março, 'nunca pegou sol suficiente para isso'.",
    "Diagnóstico de Doença de Addison há 3 anos, em uso regular de hidrocortisona 20 mg/dia + fludrocortisona 0,1 mg/dia. Há 3 dias está com gastroenterite — 'não conseguiu tomar o remédio de jeito nenhum'.",
    "Na: 121 mEq/L (hiponatremia grave). K⁺: 6,4 mEq/L (hipercalemia). Glicemia: 48 mg/dL (hipoglicemia). Creatinina: 2,1 mg/dL. Cortisol aleatório: 2,1 µg/dL (muito baixo — < 18 µg/dL sugere insuficiência). ACTH: > 1.250 pg/mL (muito elevado).",
    "Diagnóstico: Crise Adrenal precipitada por infecção gastrointestinal + impossibilidade de tomar corticoide oral. Tratamento de emergência: Hidrocortisona 100 mg IV em bolus → 200 mg nas primeiras 24h. SF 0,9% 1000 mL na 1ª hora. Glicose 50% IV para hipoglicemia. Monitorização de Na+ (correção gradual). Alta com orientação para triplicar dose oral em situações de estresse."
  ],
  clue_labels:["Colapso hemodinâmico refratário a volume","Hiperpigmentação — insuficiência adrenal primária","Addison prévio + vômitos impedindo corticoide","Hiponatremia + hipercalemia + hipoglicemia","Cortisol baixo — hidrocortisona IV de emergência"],
  explanation:"Crise Adrenal é emergência com mortalidade de até 15% se não tratada. Precipitantes: infecção, cirurgia, trauma, incapacidade de tomar corticoide oral. A tríade clínica: hipotensão + hiponatremia + hiperpigmentação. A hiperpigmentação indica insuficiência primária (ACTH elevado estimulando melanócitos). O tratamento NÃO deve ser retardado para confirmação laboratorial — hidrocortisona em bolus é salvadora. Orientar paciente sobre 'sick day rules'.",
  reference:"SBEM - Consenso de Insuficiência Adrenal, 2021. Bornstein SR et al. J Clin Endocrinol Metab 2016.",difficulty:3},

  {id:84,diagnosis:"Feocromocitoma",aliases:["feocromocitoma","feo","paraganglioma","tumor de medula adrenal","crise adrenérgica"],cid:"C74.1",category:"Endocrinologia",
  clues:[
    "Mulher, 42 anos, atendida no PS com episódio de cefaleia pulsátil intensa, palpitações e sudorese profusa em 'crise' de 20 minutos de duração — depois passou tudo. '3ª vez esse mês, sempre do nada'.",
    "Durante a crise: PA de 230/140 mmHg (emergência hipertensiva). FC: 148 bpm. Palidez intensa da face. Tremor de mãos. Ansiedade intensa. Entre as crises: assintomática com PA normal.",
    "Hipertensa há 2 anos, refratária a múltiplas combinações de anti-hipertensivos. Às vezes a pressão sobe muito ao dobrar o corpo ou apertar o abdome. Sem histórico familiar de tumor adrenal. Sem uso de simpaticomiméticos.",
    "Catecolaminas urinárias de 24h: adrenalina 2.800 µg/24h (VR < 20), noradrenalina 1.400 µg/24h (VR < 90). Metanefrinas plasmáticas: metanefrina 4× o limite superior. Normetanefrina: 8× o limite superior.",
    "TC de abdome com contraste: massa adrenal direita heterogênea de 4,5 cm com área de necrose central — hipervascular ao contraste. PET-CT com DOTATATE: captação intensa na adrenal direita. Adrenalectomia laparoscópica após preparo com bloqueio alfa-adrenérgico (fenoxibenzamina) por 14 dias."
  ],
  clue_labels:["Crises paroxísticas de hipertensão com tríade","PA 230/140 mmHg — emergência episódica","Hipertensão refratária com crises","Metanefrinas muito elevadas — diagnóstico bioquímico","TC com massa adrenal — cirurgia após bloqueio alfa"],
  explanation:"Feocromocitoma é tumor neuroendócrino da medula adrenal (90%) ou de gânglios simpáticos extraadrenais (paraganglioma, 10%). A regra dos 10%: 10% bilateral, 10% extraadrenal, 10% maligno, 10% familiar. A tríade clínica: cefaleia pulsátil + palpitações + sudorese. O diagnóstico bioquímico é pelas metanefrinas plasmáticas (maior sensibilidade). O bloqueio alfa-adrenérgico pré-operatório é mandatório para evitar crise cirúrgica.",
  reference:"SBEM - Consenso de Feocromocitoma, 2022. Lenders JW et al. J Clin Endocrinol Metab 2014.",difficulty:3},

  {id:85,diagnosis:"Doença de Graves com Crise Tireotóxica",aliases:["crise tireotóxica","tempestade tireoidiana","tirotoxicose grave","storm tireoidiano","crise de graves"],cid:"E05.5",category:"Endocrinologia / Emergência",
  clues:[
    "Mulher, 35 anos com Doença de Graves conhecida, é internada após parar metimazol há 2 semanas ('por conta própria'). Febre alta (39,8°C), agitação extrema, taquicardia de 168 bpm.",
    "Delirante, não reconhece a família. Diarreia profusa. Vômitos. Sudorese intensa. Extremidades quentes. Tremor generalizado. 'Parece que o coração vai explodir'. Icterícia leve.",
    "Diagnosticada há 6 meses. Parou metimazol porque estava com náusea. Há 5 dias foi ao dentista para extração de dente — cirurgia como fator precipitante. Não estava em uso de betabloqueador.",
    "TSH: < 0,01 μUI/mL. T4 livre: 7,8 ng/dL (VR: 0,8–1,8). T3: 620 ng/dL. Score de Burch-Wartofsky: 75 pontos (> 45 = crise tireotóxica). TRAb: 42 UI/L. ECG: fibrilação atrial com resposta ventricular rápida 158 bpm.",
    "Diagnóstico: Tempestade Tireoidiana (Crise Tireotóxica). Tratamento escalonado: propiltiouracila (PTU) 600 mg NG → propranolol IV → solução de Lugol (1h após PTU) → hidrocortisona IV (inibe conversão T4→T3) → resfriamento ativo. Internação em UTI. Melhora progressiva em 72h."
  ],
  clue_labels:["Taquicardia extrema e febre em Graves não controlada","Delirium e instabilidade hemodinâmica","Precipitante: cirurgia + parada do antitireoidiano","Score de Burch-Wartofsky > 45 — diagnóstico","PTU + Lugol + betabloqueador + corticoide — sequência crítica"],
  explanation:"Crise Tireotóxica (Tempestade Tireoidiana) é complicação rara mas potencialmente fatal do hipertireoidismo mal controlado. Fatores precipitantes: infecção, cirurgia, parto, suspensão do antitireoidiano. Mortalidade de 8–25%. O Score de Burch-Wartofsky define o diagnóstico quando > 45. A sequência do tratamento importa: PTU antes do iodo (PTU bloqueia síntese; iodo inibe liberação). O PTU é preferido ao metimazol por inibir também a conversão periférica.",
  reference:"SBEM - Consenso de Hipertireoidismo, 2020. Burch HB, Wartofsky L. Endocrinol Metab Clin 1993.",difficulty:3},
];

const ALL_DIAGNOSES = [
  // ── INFECTOLOGIA ──────────────────────────────────────────────
  "Dengue","Dengue Grave","Leptospirose","Doença de Chagas","Doença de Chagas Aguda",
  "Tuberculose Pulmonar","Tuberculose Miliar","Tuberculose Extrapulmonar","Tuberculose Ganglionar",
  "Tuberculose Meníngea","Tuberculose Óssea","Tuberculose Intestinal",
  "HIV / AIDS","Síndrome Retroviral Aguda","Pneumocistose","Toxoplasmose Cerebral",
  "Criptococose","Histoplasmose","Paracoccidioidomicose","Candidíase Invasiva","Candidemia",
  "Aspergilose Invasiva","Mucormicose","Coccidioidomicose","Esporotricose",
  "Malária por Plasmodium falciparum","Malária por Plasmodium vivax","Malária por Plasmodium malariae",
  "Leishmaniose Visceral","Leishmaniose Tegumentar","Leishmaniose Cutânea","Leishmaniose Mucocutânea",
  "Febre Tifoide","Febre Amarela","Febre Maculosa Brasileira","Febre de Chikungunya",
  "Chikungunya","Zika","Dengue com Sinais de Alarme",
  "Linfadenite Tuberculosa","Mononucleose Infecciosa","Citomegalovirose","Herpes Simples",
  "Herpes Zóster","Herpes Zóster Oftálmico","Varicela","Sarampo","Rubéola","Caxumba",
  "Coqueluche","Difteria","Tétano","Tétano Neonatal","Raiva","Hantavirose",
  "Leptospirose Grave (Síndrome de Weil)","Brucelose","Rickettsiose",
  "Febre por Arranhadura de Gato","Bartonela","Toxoplasmose",
  "Neurocisticercose","Equinococose","Esquistossomose","Esquistossomose Hepatoesplênica",
  "Ascaridíase","Estrongiloidíase","Ancilostomíase","Tricuríase","Enterobíase",
  "Giardíase","Amebíase","Criptosporidiose","Microsporidiose","Isosporíase",
  "Meningite Bacteriana","Meningite Tuberculosa","Meningite Viral","Meningite Fúngica",
  "Meningococcemia","Sepse Meningocócica","Encefalite Herpética","Encefalite por Arbovírus",
  "Endocardite Infecciosa","Osteomielite","Artrite Séptica","Celulite","Erisipela",
  "Fasciite Necrotizante","Abscesso de Partes Moles","Síndrome do Choque Tóxico",
  "Pneumonia Comunitária","Pneumonia Hospitalar","Pneumonia por Aspiração",
  "Pneumonia por Pneumocystis jirovecii","Empiema Pleural",
  "Pielonefrite","Cistite","Uretrite","Uretrite Gonocócica","Uretrite Não Gonocócica",
  "Sífilis","Sífilis Primária","Sífilis Secundária","Sífilis Terciária","Neurossífilis",
  "Gonorreia","Clamídia","Cancro Mole","Linfogranuloma Venéreo","Donovanose",
  "Hepatite A","Hepatite B","Hepatite C","Hepatite D","Hepatite E",
  "Hepatite B Crônica","Hepatite C Crônica","Hepatite Autoimune",
  "Infecção por HTLV","Infecção por EBV","Infecção por CMV",
  "Gripe (Influenza)","COVID-19","COVID-19 Grave","Síndrome Pós-COVID",
  "Infecção por VSR","Bronquiolite Viral","Laringite Viral","Sinusite Bacteriana",
  "Otite Média Aguda","Mastoidite","Abscesso Peritonsilar","Amigdalite Bacteriana",
  "Abscessos Hepáticos Amebianos","Abscesso Hepático Piogênico",
  "Peritonite Bacteriana Espontânea","Colangite Aguda","Colecistite Aguda",
  "Diverticulite","Tifo Murino","Leptospirose Pulmonar","Síndrome Pulmonar por Hantavírus",

  // ── CARDIOLOGIA ───────────────────────────────────────────────
  "Infarto Agudo do Miocárdio com Supra de ST","Infarto Agudo do Miocárdio sem Supra de ST",
  "Síndrome Coronariana Aguda sem Supra de ST","Angina Instável","Angina Estável",
  "Angina de Prinzmetal","Insuficiência Cardíaca Aguda","Insuficiência Cardíaca Crônica",
  "Insuficiência Cardíaca Descompensada","Insuficiência Cardíaca com FE Reduzida",
  "Insuficiência Cardíaca com FE Preservada",
  "Hipertensão Arterial Sistêmica","Crise Hipertensiva","Emergência Hipertensiva",
  "Urgência Hipertensiva","Hipertensão Resistente","Hipertensão Secundária",
  "Dissecção Aórtica","Dissecção Aórtica Tipo A","Dissecção Aórtica Tipo B",
  "Aneurisma de Aorta Abdominal","Aneurisma de Aorta Torácica","Rotura de Aneurisma de Aorta",
  "Fibrilação Atrial","Flutter Atrial","Taquicardia Supraventricular",
  "Taquicardia Ventricular","Fibrilação Ventricular","Torsades de Pointes",
  "Bradiarritmia","Bloqueio Atrioventricular Total","Bloqueio AV de 2º Grau","BAVT",
  "Síndrome do Seio Doente","Bloqueio de Ramo Esquerdo","Bloqueio de Ramo Direito",
  "Síndrome de Wolff-Parkinson-White","Síndrome de Brugada","Síndrome do QT Longo",
  "Parada Cardiorrespiratória","Morte Súbita Cardíaca",
  "Estenose Aórtica","Insuficiência Aórtica","Estenose Mitral","Insuficiência Mitral",
  "Prolapso de Válvula Mitral","Estenose Tricúspide","Insuficiência Tricúspide",
  "Insuficiência Pulmonar","Estenose Pulmonar",
  "Miocardite","Miocardiopatia Dilatada","Miocardiopatia Hipertrófica",
  "Miocardiopatia Restritiva","Miocardiopatia Chagásica","Miocardiopatia Periparto",
  "Miocardiopatia Alcoólica","Miocardiopatia por Estresse (Takotsubo)",
  "Pericardite Aguda","Pericardite Constritiva","Tamponamento Cardíaco",
  "Derrame Pericárdico","Endocardite de Libman-Sacks",
  "Tromboembolia Pulmonar","Hipertensão Pulmonar","Cor Pulmonale",
  "Mixoma Atrial","Trombo Intracardíaco","Doença de Kawasaki",
  "Coarctação da Aorta","Comunicação Interatrial","Comunicação Interventricular",
  "Persistência do Canal Arterial","Tetralogia de Fallot","Síndrome de Eisenmenger",
  "Doença de Buerger","Arterite de Takayasu","Arterite de Células Gigantes",
  "Trombose Venosa Profunda","Tromboflebite Superficial","Síndrome Pós-Trombótica",
  "Insuficiência Venosa Crônica","Úlcera Venosa","Isquemia Arterial Aguda dos Membros",
  "Doença Arterial Periférica","Claudicação Intermitente",

  // ── NEUROLOGIA ────────────────────────────────────────────────
  "Acidente Vascular Cerebral Isquêmico","Acidente Vascular Cerebral Hemorrágico",
  "Hemorragia Subaracnóidea","Hematoma Subdural","Hematoma Epidural",
  "Hematoma Subdural Crônico","Hemorragia Intraparenquimatosa",
  "Ataque Isquêmico Transitório","AIT","Trombose Venosa Cerebral",
  "Epilepsia","Estado de Mal Epiléptico","Crise Convulsiva Febril","Epilepsia Focal",
  "Epilepsia Generalizada","Síndrome de West","Síndrome de Lennox-Gastaut",
  "Esclerose Múltipla","Neuromielite Óptica","Síndrome Clínica Isolada",
  "Doença de Parkinson","Parkinsonismo Secundário","Tremor Essencial",
  "Doença de Alzheimer","Demência Vascular","Demência com Corpos de Lewy",
  "Demência Frontotemporal","Demência por HIV","Doença de Creutzfeldt-Jakob",
  "Síndrome de Guillain-Barré","Miastenia Gravis","Crise Miastênica",
  "Esclerose Lateral Amiotrófica","Atrofia Muscular Espinal",
  "Neuropatia Diabética","Polineuropatia","Mononeuropatia","Síndrome do Túnel do Carpo",
  "Síndrome do Túnel Cubital","Neuropatia por Hanseníase",
  "Meningite","Encefalite","Abscesso Cerebral","Empiema Subdural",
  "Neurossífilis","Neurocisticercose","Neuroesquistossomose",
  "Enxaqueca","Cefaleia em Salvas","Cefaleia Tensional",
  "Cefaleia por Uso Excessivo de Medicamento","Cefaleia Intracraniana Idiopática",
  "Hipertensão Intracraniana Idiopática","Síndrome de Hipertensão Intracraniana",
  "Hidrocefalia","Hidrocefalia de Pressão Normal",
  "Síndrome de Horner","Paralisia de Bell","Paralisia Facial Periférica",
  "Oftalmoplegia Internuclear","Síndrome de Miller Fisher",
  "Síndrome Cerebelar","Ataxia","Ataxia de Friedreich","Doença de Huntington",
  "Distonia","Coréia de Sydenham","Síndrome das Pernas Inquietas",
  "Narcolepsia","Síndrome da Apneia Obstrutiva do Sono","Insônia Crônica",
  "Delirium","Delirium Hiperativo","Delirium Hipoativo","Coma",
  "Morte Encefálica","Síndrome do Encarceramento","Estado Vegetativo",
  "Síndrome de Wernicke-Korsakoff","Encefalopatia Hepática","Encefalopatia Urêmica",
  "Encefalopatia Hipertensiva","Encefalopatia de Hashimoto",
  "Mielite Transversa","Siringomielia","Síndrome da Cauda Equina",
  "Compressão Medular","Hérnia de Disco Cervical","Hérnia de Disco Lombar",
  "Estenose de Canal Lombar","Radiculopatia Cervical","Radiculopatia Lombar",

  // ── PNEUMOLOGIA ───────────────────────────────────────────────
  "DPOC","DPOC Agudizado","Asma","Asma Grave","Asma Aguda",
  "Bronquiectasia","Fibrose Cística","Bronquite Crônica","Enfisema Pulmonar",
  "Pneumotórax","Pneumotórax Hipertensivo","Hemotórax","Derrame Pleural",
  "Pneumonia Comunitária","Pneumonia Atípica","Legionela","Pneumonia por Micoplasma",
  "Fibrose Pulmonar Idiopática","Pneumonia Intersticial","Pneumonia Eosinofílica",
  "Sarcoidose","Silicose","Asbestose","Pneumoconiose","Beriliose",
  "Doença Pulmonar Ocupacional","Pneumonite por Hipersensibilidade","Pulmão de Fazendeiro",
  "Síndrome do Desconforto Respiratório Agudo","SDRA","Insuficiência Respiratória Aguda",
  "Edema Agudo de Pulmão","Hipertensão Pulmonar","Cor Pulmonale",
  "Embolia Pulmonar","Infarto Pulmonar","Vasculite Pulmonar",
  "Câncer de Pulmão","Adenocarcinoma de Pulmão","Carcinoma de Células Escamosas",
  "Carcinoma de Pequenas Células","Mesotelioma","Nódulo Pulmonar Solitário",
  "Derrame Pleural Maligno","Tumor de Pancoast",
  "Rinite Alérgica","Sinusite Crônica","Polipose Nasal","Apneia do Sono",
  "Doença Pulmonar por Micobactéria Não Tuberculosa",

  // ── GASTROENTEROLOGIA ─────────────────────────────────────────
  "Úlcera Péptica","Úlcera Duodenal","Úlcera Gástrica","Gastrite Crônica",
  "Gastrite por H. pylori","Doença do Refluxo Gastroesofágico","Esofagite Erosiva",
  "Esôfago de Barrett","Acalasia","Espasmo Esofágico Difuso",
  "Doença de Crohn","Retocolite Ulcerativa","Colite Isquêmica","Colite Microscópica",
  "Colite por Clostridioides difficile","Íleo Paralítico","Oclusão Intestinal",
  "Intussuscepção","Vólvulo","Doença Diverticular","Diverticulite Aguda",
  "Hemorragia Digestiva Alta","Hemorragia Digestiva Baixa","Varizes Esofágicas",
  "Síndrome de Mallory-Weiss","Síndrome de Boerhaave",
  "Cirrose Hepática","Cirrose Biliar Primária","Colangite Esclerosante Primária",
  "Hepatite Alcoólica","Doença Hepática Gordurosa Não Alcoólica","Esteatohepatite Não Alcoólica",
  "Insuficiência Hepática Aguda","Encefalopatia Hepática","Síndrome Hepatorrenal",
  "Ascite","Peritonite Bacteriana Espontânea","Síndrome Hepatopulmonar",
  "Hipertensão Portal","Esplenomegalia Congestiva",
  "Pancreatite Aguda","Pancreatite Crônica","Pseudocisto Pancreático",
  "Necrose Pancreática","Câncer de Pâncreas","Insulinoma","Gastrinoma",
  "Colecistite Aguda","Colecistite Crônica","Colelitíase","Coledocolitíase",
  "Colangite Aguda","Colangite Esclerosante","Colestase",
  "Apendicite Aguda","Peritonite","Hérnia Inguinal","Hérnia Femoral",
  "Hérnia Umbilical","Hérnia Incisional","Hérnia Encarcerada","Hérnia Estrangulada",
  "Câncer Gástrico","Câncer Colorretal","Câncer de Esôfago","Câncer Hepatocelular",
  "Adenoma Hepático","Hemangioma Hepático","Cisto Hepático",
  "Síndrome do Intestino Irritável","Constipação Crônica","Megacólon Tóxico",
  "Isquemia Mesentérica","Angiodisplasia","Pólipo Colônico","Polipose Adenomatosa Familiar",
  "Doença Celíaca","Intolerância à Lactose","Má Absorção Intestinal",
  "Síndrome de Dumping","Síndrome do Intestino Curto",
  "Hemorroidas","Fissura Anal","Fístula Anal","Abscesso Perianal","Prolapso Retal",

  // ── ENDOCRINOLOGIA ────────────────────────────────────────────
  "Diabetes Mellitus Tipo 1","Diabetes Mellitus Tipo 2","Diabetes LADA","Diabetes MODY",
  "Diabetes Gestacional","Cetoacidose Diabética","Estado Hiperglicêmico Hiperosmolar",
  "Hipoglicemia","Hipoglicemia Grave","Insulinoma",
  "Hipotireoidismo Primário","Hipotireoidismo Secundário","Hipotireoidismo Congênito",
  "Hipotireoidismo Subclínico","Hipertireoidismo","Doença de Graves",
  "Tireoidite de Hashimoto","Tireoidite de De Quervain","Tireoidite Silenciosa",
  "Bócio Multinodular","Nódulo Tireoidiano","Câncer de Tireoide","Carcinoma Papilífero",
  "Carcinoma Folicular de Tireoide","Carcinoma Medular de Tireoide",
  "Carcinoma Anaplásico de Tireoide","Tempestade Tireoidiana","Coma Mixedematoso",
  "Hiperparatireoidismo Primário","Hiperparatireoidismo Secundário","Hipoparatireoidismo",
  "Hipercalcemia","Hipocalcemia","Osteoporose","Osteomalácia","Raquitismo",
  "Doença de Paget Óssea",
  "Síndrome de Cushing","Doença de Cushing","Insuficiência Adrenal","Doença de Addison",
  "Hiperplasia Adrenal Congênita","Feocromocitoma","Paraganglioma",
  "Hiperaldosteronismo Primário","Síndrome de Conn","Hiperaldosteronismo Secundário",
  "Acromegalia","Gigantismo","Nanismo Hipofisário","Deficiência de GH",
  "Hiperprolactinemia","Prolactinoma","Adenoma Hipofisário","Craniofaringioma",
  "Pan-hipopituitarismo","Diabetes Insipidus","SIADH","Hiponatremia",
  "Hipernatremia","Hipopotassemia","Hiperpotassemia","Síndrome de Realimentação",
  "Obesidade","Síndrome Metabólica","Dislipidemia","Hipertrigliceridemia",
  "Hipercolesterolemia Familiar","Síndrome dos Ovários Policísticos",
  "Ginecomastia","Amenorreia Primária","Amenorreia Secundária","Menopausa Precoce",
  "Hipogonadismo Masculino","Criptorquidia",

  // ── NEFROLOGIA ────────────────────────────────────────────────
  "Insuficiência Renal Aguda","Necrose Tubular Aguda","Nefrite Intersticial Aguda",
  "Nefrotoxicidade por Contraste","Insuficiência Renal Crônica","Doença Renal Crônica",
  "Doença Renal Crônica Estágio 5","Síndrome Nefrótica","Síndrome Nefrítica",
  "Glomerulonefrite","Glomerulonefrite por IgA","Doença de Berger",
  "Glomerulonefrite Rapidamente Progressiva","Glomerulonefrite Membranosa",
  "Glomerulonefrite Membranoproliferativa","Doença de Lesão Mínima",
  "Glomeruloesclerose Segmentar e Focal","Amiloidose Renal","Nefropatia Lúpica",
  "Nefropatia Diabética","Nefroesclerose Hipertensiva",
  "Pielonefrite Aguda","Pielonefrite Crônica","Pielonefrite Xantogranulomatosa",
  "Cistite","Cistite Intersticial","Prostatite","Epididimite","Orquite",
  "Cólica Renal","Nefrolitíase","Urolitíase","Obstrução Ureteral",
  "Hidronefrose","Bexiga Neurogênica","Incontinência Urinária",
  "Hiperplasia Prostática Benigna","Câncer de Próstata","Câncer de Rim",
  "Carcinoma de Células Renais","Câncer de Bexiga","Tumor de Wilms",
  "Doença Renal Policística","Doença Renal Policística Autossômica Dominante",
  "Síndrome de Alport","Síndrome de Bartter","Síndrome de Gitelman",
  "Acidose Tubular Renal","Hipercalciúria","Acidose Metabólica","Alcalose Metabólica",
  "Acidose Respiratória","Alcalose Respiratória",
  "Síndrome Urêmica","Pericardite Urêmica","Encefalopatia Urêmica",

  // ── REUMATOLOGIA ──────────────────────────────────────────────
  "Lúpus Eritematoso Sistêmico","Artrite Reumatoide","Espondiloartrite Anquilosante",
  "Espondilite Anquilosante","Artrite Psoriásica","Artrite Reativa","Síndrome de Reiter",
  "Artrite Enteropática","Síndrome de Sjögren","Esclerose Sistêmica","Esclerodermia",
  "Polimiosite","Dermatomiosite","Miosite por Corpos de Inclusão",
  "Síndrome Antifosfolipídeo","Vasculite","Poliarterite Nodosa",
  "Granulomatose com Poliangiite","Doença de Wegener","Poliangiite Microscópica",
  "Granulomatose Eosinofílica com Poliangiite","Síndrome de Churg-Strauss",
  "Arterite de Takayasu","Arterite de Células Gigantes","Arterite Temporal",
  "Doença de Behçet","Policondrite Recidivante","Síndrome de Cogan",
  "Gota","Pseudogota","Artrite por Cristais de Pirofosfato",
  "Artrose","Osteoartrite","Artropatia por Cristais","Artrite Gotosa",
  "Fibromialgia","Síndrome de Fadiga Crônica","Polimialgia Reumática",
  "Síndrome de Raynaud","Fenômeno de Raynaud","Miopatia Inflamatória",
  "Síndrome Hipereosinofílica","Mastocitose Sistêmica","Sarcoidose",
  "Síndrome Overlap","Doença Mista do Tecido Conjuntivo",

  // ── HEMATOLOGIA / ONCOLOGIA ───────────────────────────────────
  "Anemia Ferropriva","Anemia por Deficiência de Vitamina B12","Anemia por Deficiência de Folato",
  "Anemia Hemolítica Autoimune","Anemia Aplásica","Anemia de Doença Crônica",
  "Anemia Falciforme","Talassemia","Talassemia Maior","Talassemia Minor",
  "Esferocitose Hereditária","Deficiência de G6PD","Hemoglobinúria Paroxística Noturna",
  "Policitemia Vera","Trombocitemia Essencial","Mielofibrose","Síndrome Mielodisplásica",
  "Leucemia Mieloide Aguda","Leucemia Mieloide Crônica","Leucemia Linfoide Aguda",
  "Leucemia Linfoide Crônica","Leucemia de Células Pilosas","Leucemia Pró-linfocítica",
  "Linfoma de Hodgkin","Linfoma Não Hodgkin","Linfoma Difuso de Grandes Células B",
  "Linfoma Folicular","Linfoma de Burkitt","Linfoma de Células do Manto",
  "Linfoma de Células T","Linfoma Anaplásico","Linfoma Primário do SNC",
  "Mieloma Múltiplo","Plasmocitoma","Macroglobulinemia de Waldenström",
  "Amiloidose","Coagulação Intravascular Disseminada","CIVD",
  "Púrpura Trombocitopênica Imune","Trombocitopenia Induzida por Heparina",
  "Síndrome Hemolítico-Urêmica","Púrpura Trombocitopênica Trombótica",
  "Hemofilia A","Hemofilia B","Doença de Von Willebrand",
  "Trombocitopenia","Trombocitose","Neutropenia Febril","Agranulocitose",
  "Pancitopenia","Esplenomegalia","Linfadenopatia",
  "Câncer de Mama","Câncer de Colo do Útero","Câncer de Endométrio","Câncer de Ovário",
  "Câncer de Próstata","Câncer de Rim","Câncer de Bexiga","Câncer Testicular",
  "Câncer de Pulmão","Câncer Gástrico","Câncer Colorretal","Câncer de Esôfago",
  "Câncer Hepatocelular","Câncer de Pâncreas","Câncer de Tireoide","Câncer de Pele",
  "Melanoma","Carcinoma Basocelular","Carcinoma Espinocelular",
  "Glioblastoma","Glioma","Meningioma","Neurinoma do Acústico","Schwannoma",
  "Tumor Carcinoide","Tumor Neuroendócrino","Feocromocitoma","Neuroblastoma",
  "Sarcoma de Ewing","Osteossarcoma","Condrossarcoma","Sarcoma de Partes Moles",
  "Câncer de Cabeça e Pescoço","Carcinoma de Nasofaringe","Câncer de Laringe",
  "Síndrome da Veia Cava Superior","Compressão Medular Maligna",
  "Hipercalcemia Maligna","Síndrome de Lise Tumoral",

  // ── GINECOLOGIA E OBSTETRÍCIA ─────────────────────────────────
  "Pré-eclâmpsia","Eclâmpsia","Síndrome HELLP","Hipertensão Gestacional",
  "Diabetes Gestacional","Colestase Intra-hepática da Gravidez",
  "Gravidez Ectópica","Descolamento Prematuro de Placenta","Placenta Prévia",
  "Rotura Uterina","Vasa Prévia","Acretismo Placentário",
  "Aborto Espontâneo","Aborto Retido","Gravidez Molar","Doença Trofoblástica Gestacional",
  "Coriocarcinoma","Parto Prematuro","Ruptura Prematura de Membranas",
  "Oligoâmnio","Polidrâmnio","Restrição do Crescimento Intrauterino",
  "Morte Fetal","Hemorragia Pós-Parto","Atonia Uterina","Inversão Uterina",
  "Endometrite Pós-Parto","Mastite","Mastite Puerperal","Abscesso Mamário",
  "Síndrome dos Ovários Policísticos","Endometriose","Adenomiose",
  "Miomatose Uterina","Pólipo Endometrial","Hiperplasia Endometrial",
  "Vaginite Bacteriana","Candidíase Vaginal","Tricomoníase","Vaginose Bacteriana",
  "Doença Inflamatória Pélvica","Salpingite","Ooforite","Abscesso Tubo-Ovariano",
  "Torção de Ovário","Cisto Ovariano","Cisto Ovariano Roto","Torção de Pedículo",
  "Infertilidade Feminina","Insuficiência Ovariana Prematura","Menopausa",
  "Síndrome Climatérica","Osteoporose Pós-Menopausa",
  "Prolapso Uterino","Prolapso de Órgão Pélvico","Incontinência Urinária de Esforço",
  "Vulvodínia","Dispareunia","Vaginismo",

  // ── PSIQUIATRIA ───────────────────────────────────────────────
  "Depressão","Depressão Maior","Depressão Bipolar","Transtorno Depressivo Persistente",
  "Transtorno Bipolar Tipo I","Transtorno Bipolar Tipo II","Ciclotimia",
  "Esquizofrenia","Transtorno Esquizoafetivo","Transtorno Delirante","Psicose Breve",
  "Transtorno Obsessivo-Compulsivo","TOC","Transtorno de Ansiedade Generalizada",
  "Transtorno do Pânico","Fobia Social","Fobia Específica","Agorafobia",
  "Transtorno de Estresse Pós-Traumático","TEPT","Transtorno de Estresse Agudo",
  "Transtorno de Adaptação","Transtorno de Somatização","Transtorno Conversivo",
  "Hipocondria","Transtorno de Sintomas Somáticos",
  "Anorexia Nervosa","Bulimia Nervosa","Transtorno de Compulsão Alimentar",
  "Transtorno de Déficit de Atenção e Hiperatividade","TDAH",
  "Transtorno do Espectro Autista","Deficiência Intelectual",
  "Transtorno de Personalidade Borderline","Transtorno de Personalidade Antissocial",
  "Transtorno de Personalidade Narcisista","Transtorno de Personalidade Histriônica",
  "Dependência de Álcool","Síndrome de Abstinência Alcoólica","Delirium Tremens",
  "Dependência de Benzodiazepínico","Dependência de Opioide","Síndrome de Abstinência de Opioide",
  "Dependência de Cocaína","Dependência de Crack","Dependência de Cannabis",
  "Intoxicação por Substâncias","Síndrome Serotoninérgica","Síndrome Neuroléptica Maligna",
  "Síndrome de Burnout","Esgotamento Profissional","Luto Patológico",
  "Insônia Crônica","Hipersonia","Narcolepsia","Parassonias","Sonambulismo",
  "Ideação Suicida","Tentativa de Suicídio","Automutilação",
  "Delirium","Demência","Transtorno Neurocognitivo Maior","Transtorno Neurocognitivo Leve",

  // ── DERMATOLOGIA ──────────────────────────────────────────────
  "Psoríase","Psoríase em Placas","Psoríase Pustulosa","Psoríase Eritrodérmica",
  "Dermatite Atópica","Dermatite de Contato","Dermatite Seborreica",
  "Urticária","Angioedema","Urticária Crônica","Urticária Aguda",
  "Eritema Multiforme","Síndrome de Stevens-Johnson","Necrólise Epidérmica Tóxica",
  "Pênfigo Vulgar","Penfigoide Bolhoso","Dermatite Herpetiforme",
  "Acne Vulgar","Acne Rosácea","Rosácea","Perioral Dermatitis",
  "Celulite","Erisipela","Impetigo","Foliculite","Furúnculo","Carbúnculo",
  "Tinea Corporis","Tinea Pedis","Tinea Unguium","Tinea Capitis","Tinea Versicolor",
  "Candidíase Cutânea","Paroníquia","Onicomicose",
  "Herpes Simples","Herpes Zóster","Molusco Contagioso","Verruga Vulgar",
  "Condiloma Acuminado","Molluscum Contagiosum",
  "Vitiligo","Melasma","Hiperpigmentação Pós-Inflamatória","Albinismo",
  "Alopecia Androgenética","Alopecia Areata","Alopecia Cicatricial",
  "Escabiose","Pediculose","Larva Migrans","Miíase",
  "Carcinoma Basocelular","Carcinoma Espinocelular","Ceratose Actínica","Melanoma",
  "Nevo Displásico","Hemangioma","Queloide","Fibroma",
  "Eritema Nodoso","Vasculite Cutânea","Livedo Reticular","Fenômeno de Raynaud",
  "Esclerodermia Localizada","Morfeia","Líquen Plano","Líquen Escleroso",
  "Pitiríase Rósea","Pitiríase Versicolor","Eritema Migratório (Doença de Lyme)",

  // ── ORTOPEDIA / REUMATOLOGIA MUSCULOESQUELÉTICA ───────────────
  "Fratura de Quadril","Fratura de Fêmur","Fratura de Coluna","Fratura de Úmero",
  "Fratura de Rádio Distal","Fratura de Tornozelo","Fratura por Estresse",
  "Fratura Patológica","Luxação de Ombro","Luxação de Quadril","Luxação de Joelho",
  "Ruptura de Ligamento Cruzado Anterior","Ruptura de Menisco","Síndrome Femoropatelar",
  "Síndrome do Impacto do Ombro","Ruptura do Manguito Rotador","Tendinite",
  "Tendinite do Calcâneo","Tendinite Patelar","Síndrome de Iliotibial",
  "Epicondilite Lateral","Epicondilite Medial","Bursite","Bursite Subdeltóidea",
  "Bursite Trocantérica","Bursite Olecraniana","Bursite Pré-patelar",
  "Artrose de Joelho","Artrose de Quadril","Artrose de Coluna","Artrose de Mãos",
  "Espondiloartrose","Espondilose Cervical","Espondilose Lombar",
  "Lombalgia Inespecífica","Lombociatalgia","Ciática","Cervicalgia",
  "Síndrome de Lash","Síndrome do Piriforme","Síndrome de Piriformis",
  "Osteomielite Hematogênica","Osteomielite Crônica","Artrite Séptica",
  "Necrose Avascular","Necrose Avascular de Quadril","Doença de Legg-Calvé-Perthes",
  "Osteossarcoma","Condrossarcoma","Tumor de Células Gigantes","Encondroma",
  "Escoliose","Cifose","Lordose","Espondilolistese","Discopatia",
  "Síndrome do Túnel do Carpo","Síndrome do Canal de Guyon",
  "Dedo em Gatilho","Doença de Dupuytren","Doença de De Quervain",
  "Hallux Valgus","Fasciite Plantar","Esporão de Calcâneo",
  "Síndrome Compartimental","Síndrome de Esmagamento","Rabdomiólise",

  // ── UROLOGIA ──────────────────────────────────────────────────
  "Hiperplasia Prostática Benigna","Câncer de Próstata","Prostatite Aguda",
  "Prostatite Crônica","Abscesso Prostático","Prostatite Bacteriana",
  "Câncer de Rim","Câncer de Bexiga","Câncer Testicular","Tumor de Wilms",
  "Orquite","Epididimite","Orquiepididimite","Torção Testicular",
  "Varicocele","Hidrocele","Espermatocele","Fimose","Parafimose",
  "Priapismo","Disfunção Erétil","Ejaculação Precoce","Hipogonadismo",
  "Urolitíase","Nefrolitíase","Cálculo Ureteral","Cálculo Vesical",
  "Incontinência Urinária","Bexiga Hiperativa","Retenção Urinária Aguda",
  "Estenose Uretral","Extrofia Vesical","Hipospádia","Epispádia",

  // ── OFTALMOLOGIA ──────────────────────────────────────────────
  "Glaucoma","Glaucoma Agudo de Ângulo Fechado","Glaucoma Crônico de Ângulo Aberto",
  "Catarata","Descolamento de Retina","Oclusão de Artéria Central da Retina",
  "Oclusão de Veia Central da Retina","Retinopatia Diabética","Degeneração Macular",
  "Degeneração Macular Relacionada à Idade","Neuropatia Óptica Isquêmica",
  "Neurite Óptica","Papilite","Papiledema","Celulite Orbitária","Celulite Pré-septal",
  "Uveíte","Uveíte Anterior","Uveíte Posterior","Pan-uveíte",
  "Conjuntivite Bacteriana","Conjuntivite Viral","Conjuntivite Alérgica",
  "Queratite","Úlcera de Córnea","Ceratocone","Hordéolo","Calázio","Dacriocistite",
  "Estrabismo","Ambliopia","Miastenia Gravis Ocular",

  // ── OTORRINOLARINGOLOGIA ──────────────────────────────────────
  "Otite Média Aguda","Otite Média Crônica","Otite Média com Efusão",
  "Otite Externa","Mastoidite","Colesteatoma","Perfuração Timpânica",
  "Surdez Súbita","Perda Auditiva Neurossensorial","Presbiacusia",
  "Síndrome de Ménière","Vertigem Posicional Paroxística Benigna",
  "Neurite Vestibular","Labirintite","Zumbido",
  "Sinusite Aguda","Sinusite Crônica","Rinossinusite","Polipose Nasal",
  "Rinite Alérgica","Rinite Vasomotora","Epistaxe",
  "Amigdalite Aguda","Amigdalite Crônica","Abscesso Peritonsilar",
  "Adenoidite","Laringite","Laringite Epiglótica","Epiglotite","Crupe Viral",
  "Paralisia de Pregas Vocais","Nódulo de Corda Vocal","Pólipo de Corda Vocal",
  "Câncer de Laringe","Câncer de Faringe","Câncer de Nasofaringe",

  // ── PEDIATRIA ─────────────────────────────────────────────────
  "Bronquiolite Viral","Bronquiolite por VSR","Laringite Viral","Crupe",
  "Pneumonia em Crianças","Otite Média Aguda em Crianças","Febre sem Foco",
  "Doença de Kawasaki","Síndrome de Reye","Doença de Hirschsprung",
  "Enterocolite Necrosante","Atresia de Esôfago","Atresia de Duodeno",
  "Estenose Hipertrófica do Piloro","Invaginação Intestinal","Volvo Neonatal",
  "Anemia Hemolítica Neonatal","Icterícia Neonatal","Sepse Neonatal",
  "Meningite Neonatal","Síndrome do Desconforto Respiratório Neonatal",
  "Displasia Broncopulmonar","Apneia do Prematuro","Síndrome da Morte Súbita do Lactente",
  "Doença Celíaca em Crianças","Síndrome de Beckwith-Wiedemann",
  "Diabetes Mellitus Tipo 1 em Crianças","Fibrose Cística em Crianças",
  "Síndrome de Down","Síndrome de Turner","Síndrome de Klinefelter",
  "Fenilcetonúria","Hipotireoidismo Congênito","Galactosemia",
  "Talassemia em Crianças","Anemia Falciforme em Crianças",
  "Tumor de Wilms","Neuroblastoma","Retinoblastoma","Leucemia Aguda em Crianças",
  "Meningite Bacteriana em Crianças","Sepse em Crianças",
  "Coqueluche","Sarampo","Caxumba","Varicela em Crianças","Rubéola",
  "Escarlatina","Impetigo em Crianças","Síndrome de Mão Pé Boca",
  "Gastroenterite Viral","Diarreia Aguda em Crianças","Desidratação em Crianças",
  "Desnutrição","Kwashiorkor","Marasmo",
  "Doenças do Refluxo em Lactentes","Constipação em Crianças",
  "Asma em Crianças","Rinite Alérgica em Crianças","Dermatite Atópica em Crianças",

  // ── EMERGÊNCIA / UTI ──────────────────────────────────────────
  "Sepse","Sepse Grave","Choque Séptico","Choque Hipovolêmico","Choque Hemorrágico",
  "Choque Cardiogênico","Choque Distributivo","Choque Anafilático","Anafilaxia",
  "Parada Cardiorrespiratória","Ressuscitação Cardiopulmonar",
  "Politrauma","Traumatismo Cranioencefálico","TCE Leve","TCE Grave",
  "Traumatismo Raquimedular","Lesão Medular","Pneumotórax Traumático",
  "Hemotórax","Tamponamento Cardíaco Traumático","Contusão Pulmonar",
  "Contusão Miocárdica","Rotura de Diafragma","Trauma Abdominal",
  "Trauma Esplênico","Laceração Hepática","Trauma Renal","Ruptura de Bexiga",
  "Queimadura","Queimadura Grave","Síndrome de Inalação",
  "Afogamento","Hipotermia","Hipertermia","Golpe de Calor",
  "Intoxicação por Organofosforado","Intoxicação por Carbono",
  "Intoxicação por Paracetamol","Intoxicação por Benzodiazepínico",
  "Intoxicação por Antidepressivo Tricíclico","Intoxicação por Opioide",
  "Intoxicação por Álcool Metílico","Intoxicação por Etilenoglicol",
  "Rabdomiólise Traumática","Síndrome do Esmagamento",
  "Embolia Gasosa","Embolia Gordurosa","Embolia por Líquido Amniótico",
  "Síndrome Compartimental Abdominal","Hipertensão Intra-abdominal",
  "Síndrome de Disfunção de Múltiplos Órgãos","SDMO",

  // ── MEDICINA DO TRABALHO / MEDICINA DE FAMÍLIA ────────────────
  "Lombalgia Ocupacional","LER / DORT","Síndrome do Impacto","Tendinite Ocupacional",
  "Surdez Ocupacional","Pneumoconiose","Silicose","Asbestose","Bissinose",
  "Dermatite Ocupacional","Intoxicação por Metais Pesados","Saturnismo",
  "Hipertensão Arterial","Síndrome Metabólica","Obesidade",
  "Tabagismo","Alcoolismo","Dependência de Nicotina",

  // ── DOENÇAS RARAS / MISCELÂNEA ────────────────────────────────
  "Síndrome de Marfan","Síndrome de Ehlers-Danlos","Osteogênese Imperfeita",
  "Neurofibromatose","Esclerose Tuberosa","Síndrome de Von Hippel-Lindau",
  "Síndrome de Li-Fraumeni","Síndrome de Lynch","Doença de Wilson","Hemocromatose",
  "Doença de Gaucher","Doença de Niemann-Pick","Doença de Fabry",
  "Mucopolissacaridose","Glicogenose","Porfiria","Amiloidose Sistêmica",
  "Síndrome de Good","Imunodeficiência Comum Variável","Agamaglobulinemia de Bruton",
  "Síndrome de DiGeorge","Síndrome de Wiskott-Aldrich","Ataxia-Telangiectasia",
  "Síndrome de Chediak-Higashi","Doença Granulomatosa Crônica",
  "Síndrome POEMS","Síndrome de Sweet","Síndrome de Still do Adulto",
  "Doença de Kikuchi-Fujimoto","Doença de Rosai-Dorfman",
  "Síndrome de Hamman-Rich","Síndrome de Goodpasture","Síndrome de Alport",
  "Doença de Erdheim-Chester","Doença de Castleman",
  "Síndrome de Fanconi","Síndrome de Bloom","Anemia Diamond-Blackfan",
  "Doença de Hirschsprung","Síndrome de Alagille","Síndrome de Crigler-Najjar",
  "Síndrome de Gilbert","Síndrome de Dubin-Johnson","Síndrome de Rotor",
  "Doença de Whipple","Doença de Ménétrier","Gastroenteropatia Perdedora de Proteína",
  "Síndrome de Ogilvie","Síndrome de Zollinger-Ellison","Síndrome de Verner-Morrison",
  "Síndrome Carcinoide","Mastocitose","Histiocitose de Células de Langerhans",
  "Síndrome de Löfgren","Neurossarcoidose","Sarcoidose Cardíaca"
];
