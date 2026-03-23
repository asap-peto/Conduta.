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

var CASES = [
  {id:1,diagnosis:"Dengue",aliases:["dengue clássica","febre do dengue","dengue com sinais de alarme"],cid:"A90",category:"Infectologia",
  clues:[
    "Mulher, 28 anos, previamente hígida, procura UBS referindo febre há 3 dias, cansaço intenso e dor de cabeça que piora ao movimentar os olhos. Não consegue trabalhar.",
    "A febre atinge 39,5°C com pouca resposta a antitérmicos. Surgem dores musculares intensas e articulares difusas. Sem tosse, sem coriza, sem sintomas urinários.",
    "Mora em Campinas-SP. Vizinhos com quadro semelhante nas últimas 2 semanas. Município em alerta epidemiológico. Não viajou recentemente. Sem histórico de doença prévia relevante.",
    "Hemograma: leucócitos 3.200/mm³, plaquetas 98.000/mm³, hematócrito 38%. Exame físico revela rubor facial e exantema maculopapular em tronco. Prova do laço: positiva.",
    "NS1 Ag positivo no 3º dia de doença. IgM anti-dengue reagente. PCR confirma sorotipo DENV-3 em circulação no município."
  ],
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
  explanation:"Leptospirose é zoonose endêmica no Brasil, especialmente em períodos chuvosos. A forma grave (Síndrome de Weil) cursa com insuficiência renal, icterícia e diátese hemorrágica. A sufusão conjuntival é achado patognomônico. Diagnóstico confirmado pela MAT. Tratamento: penicilina cristalina (grave) ou doxiciclina (leve).",
  reference:"MS Brasil. Guia de Vigilância em Saúde: Leptospirose, 2017. Bharti AR et al. Lancet Infect Dis 2003.",difficulty:2},

  {id:3,diagnosis:"Doença de Chagas",aliases:["tripanossomíase americana","chagas agudo","chagas"],cid:"B57",category:"Infectologia",
  clues:[
    "Criança, 6 anos, levada à UBS por febre persistente há 15 dias, cansaço fácil e inchaço ao redor do olho esquerdo. Mãe acha que foi picada de inseto.",
    "O edema palpebral esquerdo é indolor, não pruriginoso, sem sinais de celulite. A febre é vespertina e irregular. A criança está cada vez mais prostrada.",
    "Família mora no interior da Bahia, em casa de adobe. Há 3 semanas encontraram um inseto grande e achatado (barbeiro) no quarto. Sem histórico de doença prévia.",
    "Ao exame: hepatoesplenomegalia, adenopatia generalizada, ECG com bloqueio de ramo direito. Esfregaço de sangue periférico: formas tripomastigotas visualizadas.",
    "Sorologia: IgG e IgM por imunofluorescência indireta e ELISA ambos reagentes para Trypanosoma cruzi. Xenodiagnóstico positivo."
  ],
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
  explanation:"HAS afeta 36% dos adultos brasileiros e é a principal causa de morte cardiovascular. O diagnóstico requer 2 medidas elevadas em 2 ocasiões. A presença de lesão de órgão-alvo (coração, rim, olho) classifica como risco cardiovascular alto. Tratamento: mudança de estilo de vida + farmacoterapia (tiazídico, IECA/BRA, BCC).",
  reference:"SBC - 7ª Diretriz Brasileira de HAS, 2016. SBH/SBC - Diretriz Brasileira de HAS, 2020.",difficulty:1},

  {id:26,diagnosis:"Febre Maculosa Brasileira",aliases:["fmb","febre maculosa","rickettsia"],cid:"A77.0",category:"Infectologia",
  clues:[
    "Homem, 38 anos, chega ao PS com febre alta há 4 dias, cefaleia intensa e mialgia. Muito prostrado, procurou duas UBS antes e recebeu diagnóstico de virose.",
    "No 5º dia surgem manchas avermelhadas nas palmas das mãos e planta dos pés que se espalharam para o tronco. Febre persiste em 40°C. Confusão mental leve.",
    "Mora em zona rural de Minas Gerais. Há 10 dias fez trilha em mata ciliar com presença de capivaras. Encontrou carrapato grudado na virilha, que removeu sem luvas.",
    "Hemograma: plaquetas 42.000/mm³, leucocitose com desvio à esquerda, elevação de transaminases (AST 180 U/L, ALT 140 U/L). PCR: 18 mg/dL. Hematócrito em queda.",
    "PCR em tempo real para Rickettsia rickettsii positivo. Sorologia IFI: IgM ≥ 1:64 (fase aguda). Biópsia de lesão cutânea: vasculite com infiltrado perivascular confirmando rickettsiose."
  ],
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
  explanation:"Meningite tuberculosa é a forma mais grave de TB extrapulmonar, com mortalidade de 20–50% e sequelas em sobreviventes. O LCR clássico: linfocitose, hiperproteinorraquia e hipoglicorraquia. A ADA > 10 U/L tem boa sensibilidade. Tratamento: RHZE por 2 meses + RH por 7–10 meses. A dexametasona reduz mortalidade nos casos confirmados. É de notificação compulsória.",
  reference:"MS Brasil - Manual de TB, 2019. Thwaites GE et al. Lancet 2009. WHO TB Guidelines 2022.",difficulty:3},

  {id:47,diagnosis:"Histoplasmose Disseminada",aliases:["histoplasmose","histoplasmose disseminada"],cid:"B39.3",category:"Infectologia",
  clues:[
    "Homem, 38 anos, trabalhador rural do Mato Grosso, internado com febre há 4 semanas, perda de 9 kg, tosse seca e cansaço progressivo. Já recebeu dois cursos de antibiótico sem melhora. Nunca testou para HIV.",
    "Hepatoesplenomegalia palpável. Adenopatia cervical e inguinal bilateral. Lesões cutâneas papulosas com centro umbilicado em face e tronco — apareceram na última semana. Mucosa oral com úlceras rasas não dolorosas. Tax 38,6°C.",
    "Hemograma: pancitopenia (Hb 8,2, leucócitos 2.800, plaquetas 68.000). Fosfatase alcalina 5× o limite. LDH 1.840 U/L. Ferritina 12.400 ng/mL. Trabalha em cavernas e minas de garimpo. Teste rápido de HIV: reagente. CD4: 62 células/mm³.",
    "Antígeno de Histoplasma capsulatum na urina: positivo com título alto (> 10 ng/mL — método MiraVista). β-D-glucana sérica: 340 pg/mL. Hemocultura em meio fúngico: crescimento de Histoplasma capsulatum em 10 dias.",
    "Anfotericina B lipossomal 3 mg/kg/dia por 2 semanas (indução) — seguida de itraconazol 200 mg 2×/dia por no mínimo 12 meses (manutenção). TARV iniciada após 2 semanas de antifúngico. Resposta clínica evidente em 72h."
  ],
  explanation:"Histoplasmose disseminada é infecção oportunista grave por Histoplasma capsulatum, fungo dimórfico endêmico no Brasil (especialmente Centro-Oeste e Nordeste). Em imunossuprimidos (CD4 < 150), pode se disseminar amplamente — pulmões, baço, fígado, MO e pele. O antígeno urinário é o método diagnóstico de maior sensibilidade (> 90%) na forma disseminada. A ferritina muito elevada e a pancitopenia sugerem síndrome hemofagocítica associada. Indução com anfotericina B lipossomal; manutenção longa com itraconazol.",
  reference:"MS Brasil - PCDT para Histoplasmose, 2022. Wheat LJ et al. Clin Infect Dis 2007. IDSA Guidelines for Histoplasmosis. Clin Infect Dis 2007.",difficulty:3},

  {id:48,diagnosis:"Criptococose",aliases:["criptococose","cryptococcus","meningite criptocócica","criptococose meníngea"],cid:"B45",category:"Infectologia",
  clues:[
    "Homem, 29 anos, levado ao PS com cefaleia há 4 semanas de forte intensidade e visão borrada há 1 semana. Em uso irregular de ARV para HIV. 'Não aguentava mais a dor de cabeça'.",
    "Ao exame: rigidez de nuca leve. Papiledema bilateral ao fundo de olho. Sem sinais focais. Temperatura 38,1°C. Sem lesões cutâneas. SatO₂: 97%. Pescoço sem linfonodomegalias palpáveis.",
    "CD4 atual: 28 células/mm³, carga viral: 420.000 cópias/mL. Mora em apartamento com pombos no telhado. Último CD4 há 8 meses: 110 células/mm³ (perda de adesão ao tratamento).",
    "Punção lombar: pressão de abertura 38 cmH₂O. LCR límpido. Células: 12 (90% mononucleares). Proteínas: 85 mg/dL. Glicose: 28 mg/dL. Tinta da China no LCR: leveduras encapsuladas visualizadas. Antígeno criptocócico (CrAg) no soro: 1:2048.",
    "Cultura de LCR: crescimento de Cryptococcus neoformans em 48h. CrAg no LCR: 1:4096. TC de crânio: sem lesões expansivas; sinal do 'bolhas de sabão' no gânglio da base. Hipertensão intracraniana manejada com punções lombares de alívio seriadas. Anfotericina B lipossomal + flucitosina por 2 semanas."
  ],
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
  explanation:"DIP é infecção do trato genital superior feminino, geralmente ascendente, causada por C. trachomatis, N. gonorrhoeae ou flora vaginal polimicrobiana. Os critérios mínimos do CDC (dor anexial ou à mobilização do colo) permitem tratamento empírico sem aguardar cultura. Complicações: abscesso tubo-ovariano (indica internação + antibiótico IV), infertilidade, gravidez ectópica, dor pélvica crônica. O DIU não precisa ser removido.",
  reference:"CDC STI Treatment Guidelines 2021. FEBRASGO - DIP, 2022.",difficulty:2},

  {id:68,diagnosis:"Febre Reumática Aguda",aliases:["febre reumatica aguda","febre reumatica","FRA"],cid:"I00",category:"Pediatria / Cardiologia",
  clues:[
    "Menino, 10 anos, trazido pela mãe com dor e inchaço nas articulações há 5 dias — começou no joelho direito, que melhorou, e agora está no tornozelo esquerdo. Febre de 38,5°C. Há 3 semanas teve dor de garganta intensa que melhorou sem antibiótico.",
    "Artrite migratória assimétrica: tornozelo esquerdo quente, edemaciado e com dor intensa ao movimento — joelho direito já sem sinais inflamatórios. Ausculta cardíaca: sopro sistólico em foco mitral 2+/6+ — novo, não havia em consulta anterior há 6 meses.",
    "ASLO (antiestreptolisina O): 840 UI/mL (ref < 200 UI/mL). Anti-DNAse B: positivo. PCR: 48 mg/L. VHS: 88 mm/h. Leucocitose 14.200. Swab de orofaringe negativo — infecção estreptocócica já resolvida.",
    "Ecocardiograma: insuficiência mitral leve com espessamento de folheto anterior — cardite reumática confirmada. ECG: intervalo PR 0,22 s — bloqueio AV de 1º grau. Critérios de Jones revisados (2015): 2 critérios maiores (artrite migratória + cardite) + evidência de infecção estreptocócica prévia.",
    "Penicilina benzatina 1.200.000 UI IM dose única para erradicação estreptocócica. AAS 80–100 mg/kg/dia para artrite e cardite leve. Profilaxia secundária com penicilina benzatina 1.200.000 UI IM a cada 21 dias por 10 anos (ou até 21 anos) — prevenção obrigatória de recorrência e progressão valvar."
  ],
  explanation:"A Febre Reumática Aguda é complicação não supurativa da faringite por Streptococcus pyogenes (grupo A), mediada por mimetismo molecular. Os critérios de Jones revisados (2015) orientam o diagnóstico: critérios maiores (cardite, artrite migratória, coreia de Sydenham, eritema marginado, nódulos subcutâneos) + evidência de infecção estreptocócica prévia. A cardite reumática é a principal causa de cardiopatia valvar adquirida em crianças e jovens no Brasil. A profilaxia secundária com penicilina benzatina é obrigatória para prevenir novos episódios e progressão do dano valvar.",
  reference:"Gewitz MH et al. AHA Scientific Statement on Rheumatic Fever. Circulation 2015. MS Brasil - Febre Reumática: manejo clínico, 2020.",difficulty:2},

  {id:69,diagnosis:"Transtorno Bipolar Tipo I",aliases:["transtorno bipolar","bipolar","mania","episódio maníaco","tb tipo 1"],cid:"F31",category:"Psiquiatria / Saúde Mental",
  clues:[
    "Homem, 25 anos, trazido pela família ao PS. Há 2 semanas está dormindo 2–3 horas por noite sem sentir cansaço, falando muito e rápido, 'cheio de planos grandiosos para ficar rico'.",
    "Gastou R$ 45.000 do fundo de emergência familiar em investimentos duvidosos e compras impulsivas. Está irritável quando contrariado. Hipersexualidade — infidelidade conjugal recente. Grandiosidade: 'vou ser o próximo Steve Jobs'.",
    "Episódio de depressão grave há 3 anos (tratado com antidepressivo isolado). Nunca teve mania antes. Sem uso de estimulantes, cocaína ou anfetaminas (confirmado pelo familiar). Sem uso de corticoide. Sem insônia prévia.",
    "Ao exame: psicomotricidade acelerada, fuga de ideias, taquipsiquismo, hiperatividade. Distraibilidade intensa — não consegue terminar uma frase. Sem alucinações. Sem comprometimento de realidade grave. Exames laboratoriais, TC de crânio e EEG: normais.",
    "Critérios DSM-5 de episódio maníaco: ≥ 7 dias + ≥ 3 dos 7 critérios (grandiosidade, redução do sono, logorréia, fuga de ideias, distratibilidade, agitação, comportamento de risco). Diagnóstico: Transtorno Bipolar Tipo I, episódio atual maníaco. Internação psiquiátrica. Lítio + olanzapina iniciados. Antidepressivo suspendido."
  ],
  explanation:"Transtorno Bipolar Tipo I é caracterizado por ≥ 1 episódio maníaco (com ou sem depressão). A mania clássica inclui euforia ou irritabilidade + redução do sono + grandiosidade + comportamentos de risco. Antidepressivos isolados podem desencadear mania. Estabilizadores de humor (lítio, valproato) são a base do tratamento. O lítio é o único fármaco com evidência de redução de suicídio no TB.",
  reference:"APA - DSM-5, 2013. Malhi GS et al. Bipolar Disorder. Nat Rev Dis Primers 2020.",difficulty:2},

  {
    id: 80,
    diagnosis: "Síndrome de Fournier",
    aliases: ["sindrome de fournier", "gangrena de fournier"],
    cid: "N49.3",
    category: "Cirurgia / Urologia",
    clues: [
      "Homem, 61 anos, diabético tipo 2 com controle irregular, procura UPA com dor perineal intensa há 4 dias, que começou como 'assadeira' e foi piorando. Febre 38,9°C desde ontem. Dificuldade para sentar. Nega trauma local recente.",
      "Exame perineal: edema importante em escroto e região perianal, pele com área de necrose central enegrecida de 3 cm, eritema que avança visivelmente para região inguinal bilateral durante a avaliação. Crepitação subcutânea à palpação. Odor fétido intenso.",
      "Leucócitos 28.400 com 18% de bastões. PCR 340 mg/L. Lactato 3,8 mmol/L. Creatinina 1,9 mg/dL. HbA1c 11,2%. TC de pelve com contraste: gás dissecando os planos fasciais perineais, escroto e parede abdominal inferior — extensão muito além do visível ao exame.",
      "LRINEC score: 11 pontos (>6 = alto risco de fasciíte necrosante). Hemocultura: Escherichia coli e Bacteroides fragilis — infecção polimicrobiana confirmada.",
      "Cirurgia de emergência em menos de 6h: desbridamento radical com ressecção de todo tecido necrótico até margens viáveis. Colostomia derivativa. Antibioticoterapia tríplice (piperacilina-tazobactam + metronidazol + vancomicina). Segunda cirurgia em 48h."
    ],
    explanation: "A Síndrome de Fournier é fasciíte necrosante polimicrobiana da genitália e períneo, com mortalidade de 20–40%. O gás dissecando planos fasciais na TC confirma a extensão real — geralmente muito maior que o visível externamente. O desbridamento cirúrgico radical e precoce é o tratamento definitivo; cada hora de atraso aumenta a mortalidade. Diabetes é o principal fator de risco.",
    differentials: "Orquiepididimite Aguda: dor testicular + febre, mas sem necrose cutânea, sem crepitação, sem gás na TC — tratada com antibióticos orais. Abscesso Perianal Simples: coleção localizada, sem extensão fascial, sem gás — drenagem simples. Celulite sem Necrose: eritema sem crepitação, LRINEC baixo — antibióticos EV sem cirurgia.",
    reference: "Sorensen MD et al. J Urol. 2009;182:2742. Thwaini A et al. Surgeon. 2006;4:167.",
    difficulty: 3
  },

  {
    id: 70,
    diagnosis: "Síndrome de Boerhaave",
    aliases: ["sindrome de boerhaave", "rotura esofagica espontanea", "ruptura esofagica espontanea"],
    cid: "K22.3",
    category: "Cirurgia / Emergência",
    clues: [
      "Homem, 54 anos, etilista, chega ao PS com dor torácica intensa após episódio de vômitos em confraternização. Descreve a dor como 'rasgando' do tórax em direção ao dorso. PA 98/68 mmHg, FC 122 bpm. Tomou omeprazol em casa sem alívio.",
      "Crepitação subcutânea fina ao palpar o pescoço e a parte superior do tórax — sensação de 'neve' sob os dedos. Murmúrio vesicular abolido à esquerda. Dor intensa à deglutição. Paciente em estado de angústia evidente.",
      "RX de tórax: derrame pleural esquerdo de grande monta, pneumomediastino evidente, enfisema subcutâneo cervical. ECG sem alterações isquêmicas. Troponina negativa. Leucócitos 14.200/mm³.",
      "TC de tórax com contraste oral: extravasamento de contraste do esôfago distal para o espaço pleural esquerdo. Coleção mediastinal com gás. Fragmentos alimentares identificados na cavidade pleural esquerda.",
      "Cirurgia torácica de emergência: drenagem pleural com saída de líquido turvo com resíduos alimentares e odor fecaloide. Reparo esofágico primário realizado dentro de 12h — janela crítica para sobrevida. Mortalidade > 50% quando diagnóstico atrasa mais de 24h."
    ],
    explanation: "A Síndrome de Boerhaave é a rotura transmural espontânea do esôfago causada por aumento abrupto da pressão intraluminal durante vômitos de alto esforço. A tríade de Mackler (vômito + dor torácica + enfisema subcutâneo) está presente em apenas 50% dos casos. O pneumomediastino e o derrame pleural esquerdo são os achados radiológicos mais frequentes. É uma das emergências cirúrgicas mais letais do tubo digestivo — mortalidade > 50% com diagnóstico tardio.",
    differentials: "Dissecção Aórtica: dor em rasgo irradiando para o dorso, mas sem enfisema subcutâneo, sem pneumomediastino e sem relação causal com vômitos — diagnóstico pela angiotomografia de aorta. Síndrome de Mallory-Weiss: laceração mucosa esofágica por vômitos que causa hematêmese, mas sem rotura transmural e sem pneumomediastino. IAM: dor torácica intensa, mas ECG e troponina alterados e sem contexto de vômitos precedendo a dor.",
    reference: "Søreide JA & Viste A. Scand J Trauma Resusc Emerg Med. 2011;19:66. Vallböhmer D et al. J Gastrointest Surg. 2010;14:1475.",
    difficulty: 4
  },

  {
    id: 71,
    diagnosis: "Trombose de Seio Venoso Cerebral",
    aliases: ["trombose de seio venoso cerebral", "TSVC", "trombose venosa cerebral"],
    cid: "G08",
    category: "Neurologia / Emergência",
    clues: [
      "Mulher, 27 anos, em uso de anticoncepcional oral há 2 meses, queixa-se de cefaleia progressiva há 12 dias — 'a mais forte que já tive', mas de início insidioso com piora contínua. Sem febre. Vômito em jato na véspera. Procurou UPA há 5 dias e foi liberada com analgésico.",
      "Papiledema bilateral ao exame de fundo de olho. Durante a triagem, crise convulsiva tônico-clônica generalizada seguida de pós-ictal com déficit motor em membro superior direito que regride em 30 minutos. TC de crânio sem contraste: laudo 'sem alterações agudas'.",
      "Punção lombar (após TC): pressão de abertura 34 cmH₂O. LCR límpido, acellular, proteína 52 mg/dL, glicorraquia normal. Criptococo negativo. D-dímero 1.840 ng/mL. Hemograma e coagulograma sem alterações.",
      "RM de crânio com venografia (ARM venosa): ausência completa de sinal de fluxo no seio sagital superior e no seio transverso esquerdo. Pequeno foco hemorrágico venoso em córtex parietal esquerdo.",
      "Anticoagulação plena iniciada com heparina EV — conduta correta mesmo na presença do foco hemorrágico venoso. Anticoncepcional suspenso imediatamente. Investigação de trombofilia hereditária solicitada. Acenocumarol para manutenção por 6–12 meses."
    ],
    explanation: "A TSVC acomete predominantemente mulheres jovens em uso de ACO, puérperas ou portadoras de trombofilias. Apresentação insidiosa com cefaleia progressiva e hipertensão intracraniana sem meningite é clássica. A TC sem contraste é normal em até 30% dos casos — a venografia por RM é o padrão-ouro. Paradoxalmente, a anticoagulação plena é indicada mesmo na presença de infarto hemorrágico venoso, pois o mecanismo é trombótico e não arterial.",
    differentials: "Hipertensão Intracraniana Idiopática (pseudotumor cerebri): mesma apresentação com papiledema e cefaleia progressiva, mas venografia normal — tratada com acetazolamida. Meningite Viral ou Bacteriana: LCR alterado com pleocitose e glicorraquia baixa. HSA: cefaleia em trovoada de início súbito e não progressiva, sangue nas cisternas na TC.",
    reference: "Ferro JM et al. Stroke. 2004;35:664. Saposnik G et al. AHA/ASA Guidelines. Stroke. 2011;42:1158. Coutinho JM et al. Stroke. 2015;46:1983.",
    difficulty: 4
  },

  {
    id: 72,
    diagnosis: "Angioedema Hereditário por Deficiência de C1-Inibidor",
    aliases: ["angioedema hereditario", "AEH", "deficiencia de c1 inibidor"],
    cid: "D84.1",
    category: "Imunologia / Emergência",
    clues: [
      "Mulher, 31 anos, chega ao PS com edema progressivo de lábio inferior e língua iniciado há 3 horas. Sem urticária. Sem prurido. Nega uso de IECA. Adrenalina IM e anti-histamínico IV administrados na triagem — sem resposta após 40 minutos de observação.",
      "Revisão da história: desde os 18 anos tem episódios recorrentes de edema assimétrico de extremidades sem cacifo, resolução espontânea em 2–4 dias. Relata crises de dor abdominal intensa com vômitos — submetida a laparotomia exploradora aos 24 anos sem achados cirúrgicos.",
      "IgE total normal. Triptase sérica negativa. Eosinófilos normais. Complemento C3 normal. C4: indetectável (< 2 mg/dL). Corticoide EV administrado — sem melhora após 1h. Edema progredindo para região glótica.",
      "C1-inibidor funcional: 8% do valor normal (referência > 70%). Irmão materno relata edemas recorrentes desde a adolescência. Avó paterna faleceu de asfixia por 'inchaço na garganta' em circunstâncias não investigadas.",
      "Concentrado de C1-inibidor humano administrado IV — regressão completa do edema em 90 minutos. Icatibanto disponibilizado como resgate domiciliar para crises futuras. Profilaxia de longo prazo com lanadelumabe discutida com imunologista."
    ],
    explanation: "O Angioedema Hereditário (AEH) é causado por deficiência quantitativa (tipo I, 85%) ou funcional (tipo II, 15%) de C1-inibidor, levando ao acúmulo de bradicinina. Diferencia-se do angioedema alérgico pela ausência de urticária e ausência de resposta a adrenalina, anti-histamínico e corticoide. O C4 cronicamente suprimido — mesmo fora das crises — é o melhor teste de rastreio. Dor abdominal recorrente por edema de mucosa intestinal é causa frequente de laparotomias desnecessárias.",
    differentials: "Angioedema Alérgico: urticária presente, prurido, resposta à adrenalina, IgE elevada — mecanismo IgE-dependente e não por bradicinina. Angioedema por IECA: clinicamente indistinguível, mas mediado por bradicinina pelo mesmo mecanismo — excluído pela ausência do medicamento. Angioedema Adquirido: C1-inibidor baixo, mas sem história familiar e associado a linfoma ou doença autoimune subjacente.",
    reference: "Cicardi M et al. Allergy. 2014;69:602 (WAO/EAACI Guidelines). Zuraw BL. N Engl J Med. 2008;359:1027. Longhurst HJ & Cicardi M. Lancet. 2012;379:474.",
    difficulty: 4
  },

  {
    id: 73,
    diagnosis: "Síndrome de Embolia Gordurosa",
    aliases: ["embolia gordurosa", "sindrome de embolia gordurosa"],
    cid: "T79.1",
    category: "Ortopedia / Terapia Intensiva",
    clues: [
      "Homem, 23 anos, vítima de acidente motociclístico, internado com fratura fechada de fêmur direito e fratura de tíbia esquerda. Estável hemodinamicamente na chegada. Imobilizado provisoriamente, cirurgia ortopédica programada para o dia seguinte. 38 horas após a admissão, enfermagem aciona médico: paciente confuso e com falta de ar súbita.",
      "SpO₂ 82% em ar ambiente, FC 128 bpm, FR 34 irpm. Crepitações difusas bilaterais à ausculta. Glasgow que era 15 caiu para 11. Petéquias puntiformes em região axilar bilateral e conjuntiva palpebral — ausentes no exame de admissão.",
      "RX de tórax: infiltrado bilateral difuso em 'tempestade de neve'. Gasometria: PaO₂ 56 mmHg, pH 7,45. TC de tórax: sem tromboembolismo. Hemoglobina caiu de 13,8 para 9,2 g/dL em 24h sem sangramento visível. Plaquetas: de 310.000 para 74.000/mm³.",
      "Fundoscopia: êmbolos lipídicos em artérias retinianas (achado de Purtscher). Exame de urina: fita reagente com 3+ para 'sangue' mas ausência de hemácias no sedimento — lipúria confirmada pela coloração Sudan III. Doppler de MMII: sem TVP.",
      "UTI com ventilação mecânica protetora (protocolo SARA). Ortopedia indica fixação cirúrgica precoce das fraturas — principal medida preventiva documentada para esse quadro. Corticoide sem indicação estabelecida. Resolução esperada em 3–7 dias com suporte."
    ],
    explanation: "A Síndrome de Embolia Gordurosa ocorre tipicamente 24–72h após fraturas de ossos longos ou pelve, por liberação de glóbulos de gordura da medula óssea para a circulação. A tríade de Gurd — hipoxemia, alterações neurológicas e petéquias — é diagnóstica quando completa. As petéquias em axila e conjuntiva são o achado mais específico. Não há tratamento específico além de suporte; a fixação cirúrgica precoce das fraturas é a principal medida preventiva.",
    differentials: "TEP: hipoxemia súbita pós-cirurgia ortopédica similar, mas sem petéquias, sem queda de Hb/plaquetas e com defeito de enchimento na angiotomografia — D-dímero isolado não diferencia. SARA por outra causa: infiltrado bilateral e hipoxemia, mas sem contexto de fratura recente, sem petéquias e sem lipúria. TRALI: associado a transfusão recente de hemocomponentes.",
    reference: "Akhtar S. Anesth Analg. 2009;109:185. Georgopoulos D & Bouros D. Chest. 2003;123:982. Mellor A & Soni N. Anaesthesia. 2001;56:145.",
    difficulty: 3
  },

  {
    id: 74,
    diagnosis: "Hematoma Epidural Traumático",
    aliases: ["hematoma epidural traumatico", "hematoma extradural"],
    cid: "S06.4",
    category: "Neurocirurgia / Emergência",
    clues: [
      "Adolescente, 16 anos, levado ao PS após bater a cabeça na lateral do gol durante partida de futebol. Perdeu a consciência por 2 minutos, acordou e conversou normalmente com os colegas. Foi pra casa. Quatro horas depois os pais o encontraram sonolento com dificuldade para mover o braço esquerdo.",
      "Na chegada: Glasgow 10, antes estava 15 em contato telefônico 1h atrás. Pupila direita midriática e arreativa — assimetria pupilar nova. Hemiparesia esquerda com Babinski esquerdo. PA 148/90 mmHg, FC 52 bpm — equipe reconhece a tríade.",
      "TC de crânio sem contraste em caráter de emergência: imagem hiperdensa biconvexa (lenticular) em região temporoparietal direita, volume estimado de 35 mL. Desvio de linha média de 7 mm para a esquerda. Fratura linear de escama temporal direita identificada.",
      "Neurocirurgia acionada: intervalo lúcido documentado pela história — período de consciência normal entre o trauma e a deterioração progressiva. Midríase ipsilateral ao hematoma por herniação uncal incipiente confirmada. Tríade de Cushing completa (hipertensão + bradicardia + irregularidade respiratória).",
      "Craniotomia de emergência realizada em menos de 1h do diagnóstico: evacuação do hematoma com hemostasia da artéria meníngea média lacerada. Evolução favorável com recuperação neurológica completa após reabilitação."
    ],
    explanation: "O hematoma epidural traumático é sangramento entre o crânio e a dura-máter, classicamente por ruptura da artéria meníngea média após fratura de escama temporal. O intervalo lúcido — período de consciência normal entre o trauma e a deterioração — ocorre em 20–50% dos casos e é patognomônico quando presente. A TC mostra imagem lenticular (biconvexa) hiperdensa. A craniotomia de emergência é o tratamento definitivo — o tempo é o principal determinante do prognóstico.",
    differentials: "Hematoma Subdural Agudo: imagem em crescente (côncava) na TC, mais comum em idosos e etilistas, raramente com intervalo lúcido claro — origem venosa. Contusão Cerebral: sangramento intraparenquimatoso sem coleção epidural, sem o padrão lenticular e sem intervalo lúcido característico. HSA Traumática: sangue nas cisternas, cefaleia intensa, sem efeito de massa biconvexo.",
    reference: "Brain Trauma Foundation. Guidelines for the Surgical Management of TBI. Neurosurgery. 2016;79(Suppl 1). Bullock MR et al. Neurosurgery. 2006;58(3 Suppl):S7.",
    difficulty: 3
  },

  {
    id: 75,
    diagnosis: "Encefalopatia de Wernicke",
    aliases: ["encefalopatia de wernicke", "wernicke", "sindrome de wernicke"],
    cid: "E51.2",
    category: "Neurologia / Emergência",
    clues: [
      "Homem, 44 anos, etilista crônico, trazido pelo irmão ao PS com 'olhos tortos e confusão mental' há 2 dias. O irmão conta que ele parou de beber abruptamente há 5 dias e desde ontem 'não fica de pé direito'. Sem febre. Sem histórico de trauma recente.",
      "Oftalmoplegia com paralisia do reto lateral bilateral — limitação do olhar conjugado lateral. Nistagmo horizontal ao olhar para os lados. Marcha amplamente alargada, atáxica, sem conseguir caminhar em linha reta. Confuso, desorientado em tempo e espaço, sem agitação psicomotora.",
      "Glicemia 118 mg/dL. Sódio 131 mEq/L. Tiamina plasmática 18 nmol/L (ref: 70–180 nmol/L) — colhida antes da reposição. Albumina 2,4 g/dL. CIWA-Ar: 4 pontos (abstinência leve). TC de crânio: sem hemorragia, sem lesão focal.",
      "RM de crânio com sequência FLAIR: hipersinal simétrico em corpos mamilares, tálamo dorsomedial e substância cinzenta periaquedutal — padrão de sinal específico dessa encefalopatia.",
      "Tiamina 500 mg EV 3×/dia iniciada imediatamente — sempre antes de qualquer oferta de glicose. Melhora da oftalmoplegia em 48h. Ataxia parcialmente revertida em 72h. Confusão persiste — risco de evolução para síndrome amnéstica de Korsakoff irreversível se não tratado."
    ],
    explanation: "A Encefalopatia de Wernicke é emergência neurológica causada por deficiência aguda de tiamina (vitamina B1), classicamente em etilistas crônicos, mas também em desnutrição grave, hiperemese gravídica e pós-bariátrico. A tríade clássica (oftalmoplegia + ataxia + confusão) está completa em apenas 16–38% dos casos. A RM com FLAIR mostra hipersinal simétrico em corpos mamilares e periaquedutal. Tiamina DEVE preceder qualquer infusão de glicose — a glicose sem tiamina pode precipitar ou agravar o quadro.",
    differentials: "Síndrome de Abstinência Alcoólica: confusão + agitação + tremores + CIWA elevado, mas sem oftalmoplegia nem ataxia cerebelar — tratada com benzodiazepínicos. Encefalopatia Hepática: asterixis, foetor hepático, amônia elevada, sem a tríade oftalmológica. Meningite Bacteriana: febre, rigidez de nuca, LCR alterado — sem oftalmoplegia bilateral simétrica.",
    reference: "Sechi G & Serra A. Lancet Neurol. 2007;6:442. Harper C. Pract Neurol. 2006;6:284. EFNS Guidelines on Wernicke Encephalopathy. Eur J Neurol. 2010;17:1408.",
    difficulty: 3
  },

  {
    id: 76,
    diagnosis: "Cetoacidose Euglicêmica por Inibidor de SGLT2",
    aliases: ["cetoacidose euglicemica", "cetoacidose por sglt2", "CAE por SGLT2i"],
    cid: "E13.1",
    category: "Endocrinologia / Emergência",
    clues: [
      "Mulher, 52 anos, diabética tipo 2 há 8 anos, chega ao PS com náuseas, vômitos e mal-estar progressivo há 2 dias. Refere inapetência intensa e ingestão muito reduzida. Em uso regular de metformina, empagliflozina e linagliptina. Glicemia capilar na triagem: 162 mg/dL.",
      "Lúcida, orientada. Respiração de Kussmaul presente — profunda e ruidosa. PA 108/72 mmHg, FC 104 bpm, mucosas ressecadas. Equipe questiona se realmente é descompensação diabética dado a glicemia 'quase normal'.",
      "Gasometria arterial: pH 7,10, HCO₃ 8 mEq/L, pCO₂ 20 mmHg. Ânion gap: 26 mEq/L. Cetonúria 3+ na fita. Beta-hidroxibutirato sérico: 5,8 mmol/L (ref < 0,3). Potássio 4,2 mEq/L. Função renal normal.",
      "Revisão farmacológica: empagliflozina é inibidor de SGLT2 — classe que causa cetoacidose com glicemia normal ou levemente elevada por desvio do metabolismo hepático para cetogênese. Gatilhos identificados: jejum prolongado por inapetência e atividade física intensa nos 3 dias anteriores.",
      "Empagliflozina suspensa. Insulina regular EV com reposição concomitante de glicose EV para manter glicemia > 150 mg/dL — particularidade desse protocolo. Alta após 36h com orientação formal para não reintroduzir SGLT2i sem reavaliação endocrinológica."
    ],
    explanation: "A Cetoacidose Euglicêmica (CAE) é complicação dos inibidores de SGLT2 (empagliflozina, dapagliflozina, canagliflozina), caracterizada pela tríade: acidose metabólica com ânion gap elevado + cetonemia/cetonúria elevadas + glicemia < 250 mg/dL. O mecanismo envolve aumento do glucagon relativo e desvio hepático para cetogênese. Gatilhos: jejum, cirurgia, infecção, exercício intenso. A glicemia 'normal' frequentemente atrasa o diagnóstico. O SGLT2i deve ser suspenso e não reintroduzido.",
    differentials: "CAD Clássica por DM1: glicemia geralmente > 250 mg/dL, sem uso de SGLT2i — tratada sem reposição concomitante de glicose. Acidose Lática por Metformina: pH baixo, lactato > 5 mmol/L, sem cetonemia significativa — metformina também pode estar presente mas não causa cetose primária. Cetoacidose Alcoólica: etilismo pesado, glicemia baixa ou normal, sem uso de SGLT2i, melhora com glicose e tiamina.",
    reference: "Goldenberg RM et al. Diabetes Care. 2016;39:1378. FDA Drug Safety Communication on SGLT2 Inhibitors. 2015. Handelsman Y et al. Diabetes Metab Res Rev. 2020;36:e3262.",
    difficulty: 4
  },

  {
    id: 77,
    diagnosis: "Rabdomiólise por Esforço Físico",
    aliases: ["rabdomiolise", "rabdomiolise por esforco"],
    cid: "T79.6",
    category: "Medicina de Urgência / Nefrologia",
    clues: [
      "Jovem, 21 anos, militar, procura a enfermaria após exercício de resistência de 8 horas em dia de calor intenso (38°C). Relata urina escura 'cor de coca-cola' desde a manhã e dor muscular intensa em coxas e panturrilhas. Não urina desde o almoço.",
      "PA 98/64 mmHg, FC 118 bpm. Musculatura das coxas indurada e muito dolorosa à palpação, com leve edema. Oligúria confirmada na observação: 15 mL em 2h de monitorização. Sem febre. Sem déficits neurológicos.",
      "Urina: cor marrom-escura, fita reagente 3+ para 'hemoglobina', mas ausência de hemácias no sedimento urinário — sinal de mioglobinúria. CK total: 87.000 U/L (ref < 200 U/L). Creatinina 2,8 mg/dL. Potássio: 6,1 mEq/L. Cálcio: 7,2 mg/dL. Fósforo: 7,4 mg/dL.",
      "LDH 4.200 U/L. AST 820 U/L (elevação de origem muscular, não hepática — ALT normal). ECG: ondas T apiculadas em precordiais (hipercalemia). Coagulograma sem alterações. Sem evidência de síndrome compartimental ao exame.",
      "Hidratação EV vigorosa com SF 0,9% — meta de débito urinário 200–300 mL/h. Monitorização cardíaca contínua pela hipercalemia. UTI para suporte renal. CK e eletrólitos diários até normalização. Alta após resolução da oligúria e estabilização do potássio."
    ],
    explanation: "Rabdomiólise é a destruição do músculo esquelético com liberação de mioglobina, eletrólitos e enzimas intracelulares na circulação. A mioglobinúria causa urina marrom e nefrotoxicidade direta nos túbulos renais. O diagnóstico é pela tríade: mialgia + urina escura + CK elevada (geralmente > 1.000 U/L, frequentemente > 10.000). Complicações: IRA (25–33%), hipercalemia, hipocalcemia, CIVD. A hidratação EV agressiva é a pedra angular do tratamento.",
    differentials: "Síndrome Compartimental: dor muscular + edema tenso localizado + déficit neurovascular distal — requer fasciotomia de urgência. Hematúria Macroscópica: hemácias presentes no sedimento urinário. IRA por outra causa: sem CK extremamente elevada e sem contexto de exercício intenso ou trauma muscular.",
    reference: "Bosch X et al. N Engl J Med. 2009;361:62. Petejova N & Martinek A. Eur J Intern Med. 2014;25:7. Chavez LO et al. Crit Care. 2016;20:135.",
    difficulty: 2
  },

  {
    id: 78,
    diagnosis: "Compressão Medular Epidural Neoplásica",
    aliases: ["compressao medular neoplasica", "compressao medular por metastase"],
    cid: "G99.2",
    category: "Oncologia / Neurologia",
    clues: [
      "Homem, 67 anos, tabagista pesado (45 maços-ano), procura UPA com dor lombar de início há 3 semanas, com piora acentuada nos últimos 4 dias. 'Nunca tive dor nas costas antes.' A dor não melhora em nenhuma posição — nem deitado. Perdeu 8 kg nos últimos 2 meses.",
      "Nos últimos 2 dias: dormência nos dois pés que sobe pelas pernas e dificuldade para caminhar. Dificuldade para urinar — bexiga globo presente. Exame neurológico: paraparesia espástica grau 3/5 bilateral, nível sensitivo em T10, hiper-reflexia patelar, Babinski bilateral.",
      "RX de coluna torácica: colapso de corpo vertebral em T10 com erosão de pedículo direito. TC de tórax-abdome-pelve: massa pulmonar de 4,5 cm em lobo superior direito, múltiplos nódulos pulmonares bilaterais, lesões líticas em T10, T12 e L2.",
      "RM de coluna torácica com contraste (urgência): massa epidural posterior em T10 com compressão medular grave, realce heterogêneo. Fragmento de corpo vertebral invadindo o canal medular. Biópsia guiada por TC: adenocarcinoma de pulmão com mutação EGFR.",
      "Dexametasona 10 mg EV em bolus, seguida de 4 mg 6/6h — iniciada imediatamente ao diagnóstico. Radioterapia emergencial em 24h. Avaliação para descompressão cirúrgica. Prognóstico funcional depende diretamente da velocidade de tratamento — cada hora conta."
    ],
    explanation: "A Compressão Medular Epidural Neoplásica (CMEN) é complicação oncológica de emergência, mais comum em cânceres de pulmão, mama e próstata. Dor lombar nova, de caráter não mecânico, em tabagista com perda de peso deve levantar suspeita imediata. Paraparesia + nível sensitivo + disfunção vesical definem a síndrome medular. A dexametasona EV deve ser iniciada imediatamente; a radioterapia é o tratamento definitivo. A janela para preservação da deambulação é de horas.",
    differentials: "Abscesso Epidural Espinhal: mesma apresentação neurológica, mas com febre, leucocitose e fator de risco para bacteremia — tratamento é cirúrgico com antibióticos. Hérnia de Disco Lombar com Cauda Equina: lesão abaixo de L1, arreflexia aquiliana, anestesia em sela, sem imagem de colapso vertebral. Mielite Transversa: desmielinização inflamatória, sem massa na RM, sem contexto oncológico.",
    reference: "Loblaw DA et al. J Clin Oncol. 2005;23:2028. Patchell RA et al. Lancet. 2005;366:643. Schiff D. N Engl J Med. 2009;361:e12.",
    difficulty: 3
  },

  {
    id: 79,
    diagnosis: "Síndrome de Ogilvie",
    aliases: ["sindrome de ogilvie", "pseudo-obstrucao colonica aguda"],
    cid: "K59.3",
    category: "Cirurgia / Gastroenterologia",
    clues: [
      "Homem, 71 anos, internado há 6 dias no pós-operatório de artroplastia total de quadril. Evoluiu bem até ontem quando referiu distensão abdominal progressiva e parou de evacuar. Hoje está com dor abdominal difusa e ausência completa de ruídos hidroaéreos. Não elimina flatus há 48h.",
      "Abdome muito distendido, timpânico, mas sem sinal de peritonite — sem defesa, sem rebound, sem rigidez. Temperatura 37,4°C. Em uso de morfina EV para analgesia pós-operatória e restrição ao leito desde a cirurgia. Sem obstipação prévia relevante.",
      "RX de abdome: cólon extremamente dilatado desde o ceco até o sigmoide, diâmetro cecal estimado em 12 cm. Sem ponto de transição evidente. Sem ar livre subdiafragmático. TC de abdome com contraste: dilatação maciça de cólon direito e transverso, sem lesão obstrutiva mecânica, sem isquemia de parede.",
      "Colonoscopia diagnóstica urgente: mucosa íntegra, rósea, sem obstrução mecânica, sem isquemia, sem torção. Diâmetro cecal confirmado em 12 cm — limiar crítico de risco de perfuração espontânea.",
      "Neostigmina 2 mg EV em 3–5 minutos sob monitorização cardíaca contínua — resolução da distensão em 30 minutos com eliminação de grande quantidade de flatus e fezes. Morfina suspensa e substituída por AINE. Deambulação precoce estimulada."
    ],
    explanation: "A Síndrome de Ogilvie (pseudo-obstrução colônica aguda) é dilatação maciça do cólon sem obstrução mecânica, tipicamente em pacientes hospitalizados com uso de opioides, imobilização prolongada, distúrbios eletrolíticos ou pós-operatório de cirurgia ortopédica ou cardíaca. O risco de perfuração cecal aumenta significativamente quando o diâmetro supera 12 cm. A neostigmina EV (inibidor da acetilcolinesterase) é o tratamento farmacológico de primeira linha com eficácia de 80–90%.",
    differentials: "Vólvulo de Sigmoide: torção com ponto de transição claro na TC e imagem em 'grão de café' — colonoscopia descompressiva urgente. Íleo Adinâmico Pós-operatório: acomete tanto delgado quanto grosso, sem predomínio em cólon direito, sem dilatação cecal tão proeminente. Obstrução Colônica Mecânica por Neoplasia: ponto de transição abrupto na TC, massa identificável — cirurgia ou colonoscopia oncológica.",
    reference: "Vanek VW & Al-Salti M. Dis Colon Rectum. 1986;29:203. Saunders MD & Kimmey MB. N Engl J Med. 2004;341:233. Mehta R et al. Clin Gastroenterol Hepatol. 2021;19:2148.",
    difficulty: 3
  },

{
    id: 81,
    diagnosis: "Miocardite Aguda",
    aliases: ["miocardite aguda", "miocardite"],
    cid: "I40.0",
    category: "Cardiologia / Emergência",
    clues: [
      "Jovem, 22 anos, previamente hígido, procura UPA com dor precordial há 2 dias e falta de ar aos esforços. Há 10 dias teve quadro gripal com febre, mialgia e coriza que resolveu sem tratamento. Nega uso de cocaína ou outros estimulantes.",
      "PA 108/72 mmHg, FC 108 bpm, FR 20 irpm, Tax 37,4°C. Ausculta: ritmo regular sem sopros, sem B3 audível. Sem edema em membros. Sem turgência jugular. Dor torácica piora ao deitar e melhora sentado — componente pleurítico.",
      "Troponina I ultrassensível: 4.200 pg/mL — muito elevada para a idade. ECG: supradesnivelamento difuso de ST côncavo em múltiplas derivações sem imagem em espelho, sem Q patológico. Sem padrão de território coronariano definido. BNP: 380 pg/mL.",
      "Ecocardiograma: função sistólica levemente reduzida (FEVE 48%), sem alteração segmentar de contratilidade, sem derrame pericárdico significativo. Coronariografia de urgência (pela troponina elevada): coronárias normais — afasta síndrome coronariana aguda.",
      "RM cardíaca com gadolínio: realce tardio não isquêmico subepicárdico em parede lateral e inferior — padrão diagnóstico de miocardite. Critérios de Lake Louise preenchidos. Repouso, AINE para componente pericárdico, suporte clínico. Biópsia endomiocárdica reservada para casos graves ou refratários."
    ],
    explanation: "A Miocardite Aguda é inflamação do miocárdio, predominantemente de etiologia viral (enterovírus, parvovírus B19, SARS-CoV-2). Acomete classicamente adultos jovens após síndrome gripal. A apresentação varia de dor torácica leve a choque cardiogênico fulminante. A troponina elevada em jovem sem fatores de risco coronariano, sem alteração segmentar e coronárias normais é o padrão clássico. A RM com gadolínio é o padrão diagnóstico não invasivo — realce tardio subepicárdico ou mesocárdico.",
    differentials: "IAM com Supra de ST: supradesnivelamento com imagem em espelho, padrão de território coronariano, coronárias obstruídas — sempre excluir primeiro pela coronariografia. Síndrome de Takotsubo: disfunção apical em mulher pós-estresse emocional, sem realce tardio na RM e coronárias normais. Pericardite Aguda: dor pleurítica com atrito pericárdico, sem troponina muito elevada e sem disfunção sistólica.",
    reference: "Caforio AL et al. ESC Scientific Statement on Myocarditis. Eur Heart J. 2013;34:2636. Lassner D et al. Circulation. 2022;146:521.",
    difficulty: 2
  },

  {
    id: 82,
    diagnosis: "Úlcera Péptica Perfurada",
    aliases: ["ulcera peptica perfurada", "perfuracao de ulcera duodenal"],
    cid: "K25.1",
    category: "Cirurgia / Abdome Agudo",
    clues: [
      "Homem, 47 anos, tabagista, usuário crônico de ibuprofeno por lombalgia, chega ao PS com dor abdominal de início súbito há 3 horas — 'como se tivessem me dado uma facada no estômago'. Estava bem e a dor surgiu em plena atividade. Antecedente de 'azia frequente' não investigada.",
      "Abdome em tábua — rigidez generalizada à palpação, sem conseguir relaxar a musculatura. Dor à descompressão brusca difusa. Paciente em posição antálgica, imóvel, com respiração superficial. Tax 37,8°C, FC 108 bpm.",
      "Leucócitos 16.400/mm³. PCR 88 mg/L. Amilase 280 U/L (levemente elevada, inespecífica). Gasometria: pH 7,34, levemente acidótico. Radiografia de tórax em PA: pneumoperitônio — ar livre subdiafragmático bilateral visível.",
      "TC de abdome com contraste: ar livre peritoneal abundante, maior concentração em região subdiafragmática direita e goteira parietocólica. Solução de continuidade em parede de bulbo duodenal anterior. Líquido livre peritoneal moderado.",
      "Cirurgia de emergência: rafia da perfuração duodenal com epiploplastia de Graham. Lavagem peritoneal abundante. Erradicação de H. pylori no pós-operatório — confirmado por biópsia intraoperatória. IBP em dose plena por 8 semanas."
    ],
    explanation: "A úlcera péptica perfurada é abdome agudo cirúrgico com mortalidade de 6–30% dependendo do tempo de diagnóstico. O pneumoperitônio ao RX em PA é o achado diagnóstico mais rápido — presente em 75% dos casos. A rigidez abdominal em tábua por peritonite química é a apresentação clínica mais dramática. Os principais fatores de risco são uso de AINEs, tabagismo e H. pylori. A cirurgia deve ser realizada em menos de 12h do início dos sintomas.",
    differentials: "Pancreatite Aguda Grave: dor em faixa irradiando para dorso, amilase/lipase muito elevadas, sem pneumoperitônio — sem indicação cirúrgica imediata. Perfuração de Cólon por Diverticulite: ar livre também presente, mas com história de dor em fossa ilíaca esquerda precedendo a perfuração. IAM de Parede Inferior: pode simular dor abdominal alta, mas ECG alterado e sem rigidez abdominal.",
    reference: "Søreide K et al. Lancet. 2015;386:1288. Lanas A & Chan FKL. Lancet. 2017;390:613.",
    difficulty: 2
  },

  {
    id: 83,
    diagnosis: "Erisipela",
    aliases: ["erisipela", "erisipela de mmii"],
    cid: "A46",
    category: "Infectologia / Dermatologia",
    clues: [
      "Mulher, 64 anos, obesa, hipertensa, procura UPA com dor e vermelhidão intensa na perna esquerda há 2 dias. Febre de 38,8°C desde ontem. Refere que tinha uma 'frieira' entre os dedos há semanas.",
      "Placa eritematosa bem delimitada com bordas elevadas e nítidas, quente, tensa e muito dolorosa à palpação, ocupando toda a face anterior da perna esquerda. Linfonodo inguinal esquerdo palpável e doloroso. Sem crepitação. Sem necrose cutânea.",
      "Leucócitos 18.400/mm³ com 14% de bastões. PCR 128 mg/L. Glicemia 118 mg/dL. Creatinina 0,9 mg/dL. Ultrassonografia de partes moles: espessamento dérmico e subdérmico difuso sem coleção — sem abscesso, sem gás.",
      "Porta de entrada identificada: intertrigo micótico entre 3º e 4º dedos do pé esquerdo — fissura com maceração. Linfedema crônico bilateral de membros inferiores documentado. Sem histórico de TVP ou cirurgia vascular. Hemoculturas colhidas: resultado negativo.",
      "Penicilina G cristalina 4 milhões UI EV 6/6h por 7–10 dias — Streptococcus pyogenes (grupo A) é o agente principal. Alternativa: amoxicilina EV ou oral nos casos leves. Tratamento da tinea pedis com antifúngico tópico — eliminação da porta de entrada é fundamental para prevenção de recorrência. Membros inferiores elevados."
    ],
    explanation: "A Erisipela é infecção bacteriana da derme e tecido subcutâneo superficial, causada principalmente pelo Streptococcus pyogenes. A placa eritematosa de bordas nítidas e elevadas é o achado clínico diferencial da celulite. A porta de entrada mais comum nos membros inferiores é a tinea pedis — sua identificação e tratamento são essenciais para prevenir recorrências. O linfedema é fator de risco importante. A penicilina é o antibiótico de escolha.",
    differentials: "Celulite Bacteriana: eritema sem bordas bem delimitadas, acomete tecido subcutâneo mais profundo, frequentemente por S. aureus — penicilina pode ser insuficiente, requer cobertura para estafilococo. Trombose Venosa Profunda: edema e dor em membro inferior, mas sem eritema delimitado, sem febre e com diagnóstico pelo Doppler venoso. Fasciíte Necrotizante: início similar mas com progressão rápida, crepitação, necrose e toxemia grave — gás nos planos fasciais na TC.",
    reference: "Stevens DL et al. IDSA Guidelines for Skin and Soft Tissue Infections. Clin Infect Dis. 2014;59:e10. Bisno AL & Stevens DL. N Engl J Med. 1996;334:240.",
    difficulty: 1
  },

  {
    id: 84,
    diagnosis: "Artrite Gotosa Aguda",
    aliases: ["artrite gotosa aguda", "gota aguda", "crise de gota"],
    cid: "M10.0",
    category: "Reumatologia",
    clues: [
      "Homem, 52 anos, acorda às 3h com dor insuportável no pé direito — 'como se tivesse quebrando o osso'. Nega trauma. Fez festa na noite anterior com cerveja e frutos do mar. Em uso de hidroclorotiazida para hipertensão. Já teve episódio semelhante que durou 4 dias e resolveu sozinho.",
      "Articulação metatarsofalângica do hálux direito: eritema intenso, calor, edema e dor à palpação mínima — o paciente não tolera nem o peso do lençol. Temperatura 37,6°C. Demais articulações normais. Sem outros focos infecciosos.",
      "Ácido úrico sérico: 9,8 mg/dL. Leucócitos 11.200/mm³. PCR 68 mg/L. VHS 74 mm/h. Creatinina 1,3 mg/dL. RX do pé direito: partes moles aumentadas em MF do hálux, sem erosões ósseas, sem fratura.",
      "Artrocentese da articulação MF: líquido turvo amarelo-ouro. Análise: leucócitos 48.000/mm³ (predomínio de neutrófilos). Microscopia com luz polarizada: cristais de urato monossódico, aciculares, birrefringência negativa — diagnóstico confirmado.",
      "Colchicina 1 mg seguida de 0,5 mg 1h depois — protocolo de dose baixa com eficácia equivalente à dose alta e menos efeitos GI. Alternativa: AINE em dose plena por 5–7 dias. Corticoide para casos com contraindicação às duas primeiras opções. Alopurinol diferido para fora da crise aguda."
    ],
    explanation: "A gota é a artrite inflamatória mais comum em homens adultos, causada por deposição de cristais de urato monossódico. A artrite de MF do hálux (podagra) é a localização mais clássica. O diagnóstico definitivo é pela identificação de cristais birrefringentes negativos no líquido sinovial. Gatilhos: álcool (especialmente cerveja), frutos do mar, diuréticos tiazídicos e carnes vermelhas. O alopurinol deve ser iniciado somente após resolução completa da crise aguda.",
    differentials: "Artrite Séptica: também monoartrite aguda com calor e eritema, mas febre mais alta, comprometimento do estado geral — cristais ausentes no líquido, cultura positiva. Pseudogota (Artrite por Pirofosfato de Cálcio): cristais romboidais com birrefringência positiva, acomete joelho e punho — não podagra. Celulite: infecção de partes moles sem comprometimento articular, sem artrocentese necessária.",
    reference: "FitzGerald JD et al. ACR Guidelines for Gout. Arthritis Care Res. 2020;72:879. Richette P & Bardin T. Lancet. 2010;375:318.",
    difficulty: 1
  },

  {
    id: 85,
    diagnosis: "Pneumonia por Pneumocystis jirovecii",
    aliases: ["pneumocistose", "PCP", "pneumonia por pneumocystis"],
    cid: "B59",
    category: "Infectologia / Pneumologia",
    clues: [
      "Homem, 35 anos, procura UBS com tosse seca persistente há 3 semanas, cansaço progressivo e perda de 7 kg em 2 meses. Febre baixa vespertina. Sem expectoração purulenta. Nega tabagismo.",
      "SpO₂ 91% em repouso que cai para 84% após caminhar 50 metros — dessaturação ao esforço desproporcional à ausculta discreta. Crepitações finas difusas bilaterais leves. Linfócitos 480/mm³. Sem linfonodomegalia.",
      "RX de tórax: infiltrado intersticial bilateral difuso de predomínio peri-hilar, sem derrame pleural, sem cavitação. LDH 980 U/L. Gasometria: PaO₂ 62 mmHg, gradiente alvéolo-arterial de O₂ 42 mmHg. Teste rápido para HIV: reagente em dois algoritmos.",
      "CD4: 58 células/mm³. Carga viral HIV-RNA: 320.000 cópias/mL. Beta-D-glucana sérica: 780 pg/mL (ref < 60 pg/mL) — fortemente positiva.",
      "Lavado broncoalveolar: coloração de Gomori-Grocott positiva para cistos de Pneumocystis jirovecii. Sulfametoxazol-trimetoprim 15–20 mg/kg/dia de TMP EV por 21 dias. Prednisona 40 mg 2×/dia pelo gradiente A-a > 35 mmHg. TARV iniciada após 2 semanas de tratamento."
    ],
    explanation: "A Pneumocistose é a infecção oportunista pulmonar mais frequente em AIDS com CD4 < 200 células/mm³. A tríade clássica é tosse seca + dispneia progressiva + infiltrado intersticial bilateral. A dessaturação ao esforço desproporcional à ausculta é achado característico. LDH elevado e beta-D-glucana positiva têm alta sensibilidade. A prednisona adjuvante é indicada quando o gradiente alvéolo-arterial de O₂ for > 35 mmHg.",
    differentials: "Tuberculose Pulmonar: infiltrado em lobos superiores + cavitações + BAAR no escarro — raramente bilateral intersticial peri-hilar difuso. Histoplasmose Disseminada: infiltrado bilateral em imunossuprimido, antígeno urinário de Histoplasma positivo. Sarcoidose: adenopatia hilar bilateral, CD4 normal, sem contexto de imunossupressão.",
    reference: "Panel on Opportunistic Infections in Adults with HIV — HHS Guidelines. 2023. Thomas CF Jr & Limper AH. N Engl J Med. 2004;350:2487.",
    difficulty: 2
  },

  {
    id: 86,
    diagnosis: "Rotura de Aneurisma de Aorta Abdominal",
    aliases: ["rotura de aneurisma de aorta abdominal", "ruptura de AAA"],
    cid: "I71.3",
    category: "Cirurgia Vascular / Emergência",
    clues: [
      "Homem, 72 anos, tabagista pesado, hipertenso, chega ao PS carregado pelos filhos com dor lombar de início súbito há 2 horas — 'nunca tive uma dor assim nas costas'. PA 88/54 mmHg. Sem trauma. Plantonista cogita cólica renal ou hérnia de disco.",
      "Dor irradia para flanco esquerdo e virilha ipsilateral. Ao examinar o abdome com atenção: massa pulsátil e expansiva em região periumbilical. FC 118 bpm. Extremidades frias e úmidas. Sondagem vesical: hematúria microscópica.",
      "Hematócrito 28% em queda. Ultrassonografia POCUS à beira do leito: aorta abdominal com 7,2 cm de diâmetro e coleção retroperitoneal adjacente — confirmado em 3 minutos.",
      "TC de abdome com contraste: extravasamento ativo de contraste para retroperitônio. Aneurisma sacular infrarrenal roto com diâmetro máximo de 7,8 cm, extensão para artéria ilíaca comum esquerda.",
      "Cirurgia vascular emergencial sem aguardar estabilização hemodinâmica. Reparo endovascular (EVAR) com exclusão do aneurisma. Hipotensão permissiva mantida até o clampeamento aórtico. Mortalidade global da rotura: 80–90%."
    ],
    explanation: "A rotura de AAA tem mortalidade de 80–90% no total, incluindo os que morrem antes de chegar ao hospital. A tríade clássica (dor lombar + hipotensão + massa pulsátil) está completa em apenas 50% dos casos. O POCUS à beira do leito confirma a dilatação aórtica em minutos e deve ser o primeiro exame. O diagnóstico firmado requer cirurgia imediata — qualquer atraso para estabilizar hemodinamicamente é fatal.",
    differentials: "Cólica Renal: dor em flanco irradiando para virilha, sem hipotensão e sem massa pulsátil — TC mostra cálculo. Dissecção Aórtica: dor em rasgo com assimetria de pulsos, aorta ascendente ou descendente na TC, sem aneurisma sacular. Lombociatalgia Aguda: dor lombar irradiante, mas sem hipotensão e sem massa — jamais dispensar a palpação abdominal em idoso tabagista.",
    reference: "Wanhainen A et al. Eur J Vasc Endovasc Surg. 2019;57:8 (ESVS Guidelines). Lederle FA et al. N Engl J Med. 2002;346:1437.",
    difficulty: 2
  },

  {
    id: 87,
    diagnosis: "Estenose Mitral Reumática",
    aliases: ["estenose mitral", "estenose mitral reumatica"],
    cid: "I05.0",
    category: "Cardiologia",
    clues: [
      "Mulher, 42 anos, nordestina, migrante para São Paulo há 15 anos, queixa-se de piora progressiva de falta de ar aos esforços nos últimos 6 meses. Antes subia 3 andares sem dificuldade; agora cansa no 1º. Nota palpitação irregular esporadicamente.",
      "Ausculta cardíaca: ritmo irregular, B1 hiperfonética, estalido de abertura após B2 e ruflar diastólico em foco mitral — melhor ouvido em decúbito lateral esquerdo com campânula. Rubor malar bilateral (fácies mitral). Cianose perioral discreta.",
      "ECG: fibrilação atrial com resposta ventricular de 92 bpm. RX de tórax: configuração mitral do coração, duplo contorno à direita, elevação de brônquio principal esquerdo, linhas B de Kerley.",
      "Ecocardiograma: folhetos mitrais espessados e calcificados, fusão comissural bilateral, mobilidade muito reduzida. Área valvar mitral 0,9 cm² (ref > 4 cm²) — estenose grave. Gradiente médio 14 mmHg. Átrio esquerdo 5,8 cm. Trombo em apêndice atrial esquerdo.",
      "Anticoagulação com varfarina (INR alvo 2,5–3,5 pela FA + trombo). Valvuloplastia mitral por balão (comissurotomia percutânea) indicada pelo escore de Wilkins favorável — alternativa à troca valvar cirúrgica."
    ],
    explanation: "A Estenose Mitral é quase exclusivamente reumática no Brasil — sequela da cardite reumática em populações sem acesso à penicilina na infância. A tríade auscultatória (B1 hiper + estalido de abertura + ruflar diastólico) é patognomônica. A FA é complicação frequente com risco alto de tromboembolismo. Área valvar < 1,5 cm² indica estenose significativa; < 1 cm², grave. A comissurotomia percutânea por balão é o tratamento de escolha quando a anatomia valvar é favorável.",
    differentials: "IC por Miocardiopatia Dilatada: dispneia progressiva e FA, mas sem a tríade auscultatória e sem a morfologia mitral no RX. Mixoma Atrial Esquerdo: pode simular estenose mitral com sopro diastólico posicional e FA, mas com massa no ecocardiograma e sem fusão comissural. Regurgitação Mitral: sopro sistólico em foco mitral irradiando para axila — não diastólico.",
    reference: "Vahanian A et al. ESC/EACTS Guidelines on Valvular Heart Disease. Eur Heart J. 2022;43:561. Nishimura RA et al. AHA/ACC Guidelines. JACC. 2014;63:e57.",
    difficulty: 2
  },

  {
    id: 88,
    diagnosis: "Acidente Isquêmico Transitório",
    aliases: ["acidente isquemico transitorio", "AIT", "mini-AVC"],
    cid: "G45.9",
    category: "Neurologia",
    clues: [
      "Homem, 66 anos, hipertenso e diabético, procura UPA após episódio de 'boca torta e braço esquerdo sem força' que durou cerca de 20 minutos e resolveu completamente antes de chegar ao hospital. Está assintomático agora. Família insiste em consultar mesmo com melhora.",
      "Exame neurológico completamente normal no momento da avaliação. PA 168/102 mmHg. FC 82 bpm irregular. Ausculta: sem sopros carotídeos. Sem déficits motores, sensitivos ou de linguagem. NIHSS = 0. ECG: fibrilação atrial de início indeterminado.",
      "Glicemia 142 mg/dL. Colesterol total 228 mg/dL, LDL 158 mg/dL. Hemograma normal. INR 1,1 — sem anticoagulação prévia. TC de crânio sem contraste: sem hemorragia, sem hipodensidade aguda. Score ABCD²: 6 pontos (alto risco).",
      "RM de crânio com difusão (DWI): sem restrição de difusão — sem infarto estabelecido. Ecocardiograma: átrio esquerdo dilatado (5,2 cm), sem trombo visível. Doppler de carótidas: placa ateromatosa em bifurcação carotídea direita com estenose de 45% — não significativa.",
      "Internação imediata para investigação e tratamento — risco de AVC nas próximas 48–72h é de 10–15% sem intervenção. Anticoagulação com heparina para FA. AAS 300 mg dose de ataque. Estatina de alta intensidade. Controle pressórico. Monitorização cardíaca contínua."
    ],
    explanation: "O AIT é déficit neurológico focal de origem isquêmica com resolução completa, geralmente em menos de 1 hora. É uma emergência neurológica — o risco de AVC isquêmico nas 48h seguintes sem tratamento é de 10–15%. O score ABCD² (≥ 4 = alto risco) orienta a urgência da internação. A FA é causa embólica frequente. A RM com DWI diferencia AIT de infarto silencioso. O início imediato de antiagregação, estatina e controle de fatores de risco reduz o risco de AVC em até 80%.",
    differentials: "AVC Isquêmico Estabelecido: déficit neurológico persistente > 24h com infarto visível na RM-DWI — tratamento com trombólise se dentro da janela. Enxaqueca com Aura: sintomas neurológicos focais precedendo cefaleia, sem FA ou aterosclerose como contexto — mais comum em jovens. Hipoglicemia: pode simular déficit focal, mas glicemia baixa e resolução com glicose IV — sempre dosar glicemia antes.",
    reference: "Johnston SC et al. ABCD² Score. Lancet. 2007;369:283. Rothwell PM et al. EXPRESS Study. Lancet. 2007;370:1432. AHA/ASA Guidelines for TIA. Stroke. 2009;40:2276.",
    difficulty: 2
  },

  {
    id: 89,
    diagnosis: "Colangite Esclerosante Primária",
    aliases: ["colangite esclerosante primaria", "CEP"],
    cid: "K83.0",
    category: "Gastroenterologia / Hepatologia",
    clues: [
      "Homem, 38 anos, com retocolite ulcerativa há 6 anos, encaminhado ao hepatologista por alterações persistentes em enzimas hepáticas de rotina. Queixa-se de fadiga há 4 meses e prurido cutâneo sem lesão visível. Icterícia leve ao exame. Nega alcoolismo e uso de hepatotóxicos.",
      "Fosfatase alcalina 4× o limite. GGT 6× o limite. TGO/TGP 1,5× o limite. Bilirrubina direta 2,8 mg/dL. Albumina 3,2 g/dL. Ultrassonografia: ductos biliares intra-hepáticos com parede espessada e calibre irregular.",
      "ANA e AML negativos. p-ANCA positivo 1:160. IgG4 sérica 42 mg/dL (normal — exclui colangite por IgG4). Biópsia hepática: fibrose periductal concêntrica em 'casca de cebola' ao redor de ductos de pequeno calibre.",
      "Colangiopancreatografia por RM (CPRM): estenoses multifocais alternadas com dilatações segmentares em ductos biliares intra e extra-hepáticos — padrão em 'colar de pérolas'. Sem lesão de massa identificada.",
      "Colonoscopia anual obrigatória pela associação com câncer colorretal (risco aumentado com RCU + CEP). Ácido ursodesoxicólico sintomático. Transplante hepático é o único tratamento curativo — indicado quando MELD ≥ 15."
    ],
    explanation: "A CEP é colangiopatia inflamatória fibrosante de ductos biliares intra e extra-hepáticos. Associa-se a DII em 70–80% dos casos, predominantemente RCU. O padrão em 'colar de pérolas' na CPRM é diagnóstico. Evolui para cirrose biliar e tem risco de vida de 10–15% para colangiocarcinoma. Não há tratamento medicamentoso eficaz — o transplante é a única opção curativa.",
    differentials: "Colangite por IgG4: clinicamente idêntica mas com IgG4 sérica > 135 mg/dL e resposta dramática ao corticoide — diagnóstico crucial pois é tratável. Colangiocarcinoma: estenose biliar focal, CA 19-9 elevado, sem DII — difícil diferenciar da CEP em fase avançada. Hepatite Autoimune: ANA e AML positivos, hepatite de interface na biópsia, sem estenoses ductais na imagem.",
    reference: "Chapman MH et al. Gut. 2019;68:778 (BSG/UEG Guidelines). Karlsen TH et al. Hepatology. 2017;67:1643.",
    difficulty: 3
  },

  {
    id: 90,
    diagnosis: "Síndrome de Stevens-Johnson",
    aliases: ["sindrome de stevens-johnson", "SSJ"],
    cid: "L51.1",
    category: "Dermatologia / Emergência",
    clues: [
      "Jovem, 24 anos, iniciou alopurinol há 18 dias por hiperuricemia. Há 3 dias desenvolveu febre, mal-estar e lesões na boca que dificultam alimentação. Hoje apresenta manchas avermelhadas no tronco que começaram a formar bolhas.",
      "Lesões em alvo atípicas (máculas eritematosas com centro purpúrico, sem o terceiro anel característico do eritema multiforme) disseminadas em tronco e face. Erosões dolorosas em mucosa oral, labial e conjuntival bilateral. Sinal de Nikolsky positivo nas áreas eritematosas.",
      "Área de destacamento epidérmico estimada em 12% da superfície corporal. Febre 38,8°C. Leucócitos 14.200. Função hepática e renal normais. Biópsia de borda de lesão ativa: necrose de queratinócitos em toda espessura da epiderme com infiltrado linfocitário na junção dermoepidérmica.",
      "Score SCORTEN calculado: 2 pontos (mortalidade estimada 12%). Ophthalmology e otorrinolaringologia chamados pelo acometimento mucoso. Alopurinol suspenso imediatamente — agente causal identificado.",
      "Internação em UTI ou unidade de queimados. Cuidados locais com curativos não aderentes. Ciclosporina EV como imunomodulador de primeira linha em centros especializados — evidência crescente. Corticoide sistêmico controverso. Antibiótico profilático não recomendado de rotina."
    ],
    explanation: "A SSJ é reação cutânea medicamentosa grave com necrose epidérmica e acometimento mucoso, definida por destacamento < 10% da superfície corporal (10–30% = sobreposição SSJ/NET; > 30% = NET). Os agentes mais frequentes são alopurinol, anticonvulsivantes (carbamazepina, fenitoína), sulfonamidas e AINEs. O sinal de Nikolsky positivo confirma a fragilidade epidérmica. A suspensão imediata do agente causal é a medida mais importante.",
    differentials: "Eritema Multiforme Maior: lesões em alvo típicas (3 zonas), acometimento mucoso leve, associado a HSV — sem destacamento epidérmico e sem Nikolsky. Pênfigo Vulgar: bolhas flácidas por autoanticorpos anti-desmogleína, Nikolsky positivo, mas sem fármaco precipitante e sem as lesões em alvo. Síndrome da Pele Escaldada Estafilocócica: recém-nascidos e imunossuprimidos, toxina estafilocócica, sem acometimento mucoso — biópsia diferencia.",
    reference: "Bastuji-Garin S et al. Arch Dermatol. 1993;129:92 (SCORTEN). Creamer D et al. Br J Dermatol. 2016;174:1194 (UK guidelines).",
    difficulty: 3
  },

  {
    id: 91,
    diagnosis: "Doença de Wilson",
    aliases: ["doenca de wilson", "degeneracao hepatolenticular"],
    cid: "E83.0",
    category: "Gastroenterologia / Neurologia",
    clues: [
      "Jovem, 19 anos, encaminhado ao hepatologista por transaminases elevadas há 6 meses em exames de rotina. Sem etilismo. Sem medicamentos hepatotóxicos. Pais e irmãos saudáveis. Queixa de leve tremor em mãos nos últimos meses que 'atrapalha a letra'.",
      "TGO 98 U/L, TGP 112 U/L, fosfatase alcalina surpreendentemente normal — padrão incomum para hepatite. Bilirrubina direta 1,8 mg/dL. Albumina 3,4 g/dL. Hemograma: anemia hemolítica Coombs negativa (Hb 9,2 g/dL).",
      "Ceruloplasmina sérica: 8 mg/dL (ref: 20–40 mg/dL) — muito baixa. Cobre sérico livre: elevado. Cuprúria de 24h: 180 mcg/dia (ref < 40 mcg/dia) — significativamente aumentada. Ultrassonografia: fígado heterogêneo com ecotextura grosseira.",
      "Exame com lâmpada de fenda: anel de Kayser-Fleischer bilateral presente — anel dourado-acastanhado na periferia da córnea, patognomônico. RM de crânio: hipersinal nos núcleos da base bilateralmente.",
      "D-penicilamina iniciada como quelante de cobre — monitorização rigorosa de efeitos adversos. Dieta com restrição de alimentos ricos em cobre (fígado, mariscos, chocolate). Triagem de familiares de 1º grau com ceruloplasmina e cuprúria obrigatória."
    ],
    explanation: "A Doença de Wilson é erro inato do metabolismo do cobre por mutação no gene ATP7B, com acúmulo hepático, cerebral e corneal. Deve ser sempre considerada em jovens com hepatopatia inexplicada, especialmente quando a fosfatase alcalina é normalmente baixa ou normal. O anel de Kayser-Fleischer é patognomônico quando presente, mas pode estar ausente na forma hepática isolada. O diagnóstico precoce é fundamental — a doença é tratável e os danos são reversíveis.",
    differentials: "Hepatite Autoimune: TGP elevada em jovem, mas com ANA/AML positivos, IgG elevada, sem alteração de cobre e sem anel de KF — responde a corticoide. Hepatite B ou C Crônica: sorologias positivas, sem alteração do metabolismo do cobre. Hemocromatose Hereditária: acúmulo de ferro (ferritina e saturação de transferrina elevadas), não de cobre — acomete adultos mais velhos.",
    reference: "European Association for Study of Liver. EASL Clinical Practice Guidelines: Wilson's Disease. J Hepatol. 2012;56:671. Bandmann O et al. Lancet Neurol. 2015;14:103.",
    difficulty: 3
  },

  {
    id: 92,
    diagnosis: "Síndrome da Secreção Inapropriada de ADH",
    aliases: ["SIADH", "sindrome de secrecao inapropriada de ADH", "hiponatremia por SIADH"],
    cid: "E22.2",
    category: "Endocrinologia / Nefrologia",
    clues: [
      "Homem, 68 anos, internado há 5 dias por pneumonia comunitária. Evolução satisfatória dos sintomas respiratórios com antibióticos. Hoje a enfermagem nota que está mais confuso e com cefaleia intensa. Sem vômito, sem febre nova.",
      "Sódio sérico: 121 mEq/L — estava 138 mEq/L na admissão. Potássio normal. Glicemia normal. Função renal normal. Osmolalidade plasmática: 252 mOsm/kg (baixa). Paciente eupneico, sem sinais de desidratação, sem edema, sem ascite.",
      "Osmolalidade urinária: 580 mOsm/kg (inapropriadamente concentrada para uma osmolalidade plasmática baixa). Sódio urinário: 68 mEq/L (alto, > 20). TSH e cortisol normais. Sem uso de diuréticos. Sem medicamentos que causem SIADH.",
      "TC de crânio sem contraste: sem edema cerebral, sem lesão focal. RX de tórax: pneumonia em resolução em lobo inferior direito. Diagnóstico estabelecido pelos critérios de Bartter e Schwartz: hiponatremia hiposmolar + urina concentrada + sódio urinário alto + euvolemia + função tireoidiana e adrenal normais.",
      "Restrição hídrica 800 mL/dia como medida inicial. NaCl 3% EV somente pelos sintomas neurológicos agudos — correção máxima de 10–12 mEq/L nas primeiras 24h para evitar mielinólise pontina. Tolvaptana reservada para casos refratários."
    ],
    explanation: "A SIADH é a causa mais comum de hiponatremia em pacientes hospitalizados. Causas frequentes: pneumonia, neoplasias (SCLC), SNC, medicamentos (SSRIs, carbamazepina, ciclofosfamida). Os critérios diagnósticos incluem: hiponatremia hiposmolar + urina inapropriadamente concentrada + sódio urinário > 20 + euvolemia + tireoide e adrenal normais. A correção deve ser lenta para evitar mielinólise osmótica pontina — máximo 10–12 mEq/L/24h.",
    differentials: "Hiponatremia Hipovolêmica: sódio urinário baixo (< 20 mEq/L) se causa extrarrenal, sinais de desidratação — tratada com SF 0,9% e não com restrição hídrica. Hipotireoidismo: TSH elevado, associado a hiponatremia por mecanismo semelhante — excluído pelo TSH normal. Insuficiência Adrenal: cortisol baixo, hipercalemia associada — excluída pelo cortisol normal.",
    reference: "Spasovski G et al. Hyponatraemia Guideline. Eur J Endocrinol. 2014;170:G1 (European Guidelines). Sterns RH. N Engl J Med. 2015;372:55.",
    difficulty: 2
  },

  {
    id: 93,
    diagnosis: "Mieloma Múltiplo",
    aliases: ["mieloma multiplo", "mieloma", "doenca de kahler"],
    cid: "C90.0",
    category: "Hematologia / Oncologia",
    clues: [
      "Homem, 64 anos, procura ortopedista com dor lombar intensa há 3 meses, de caráter contínuo, sem melhora com analgésicos comuns, sem irradiação para membros. Perdeu 8 kg. Muito cansado. Nega trauma.",
      "Hemograma: Hb 8,4 g/dL (normocítica/normocrômica), leucócitos e plaquetas normais. VHS 110 mm/h. Proteínas totais 11,2 g/dL com albumina 2,8 g/dL — hiperproteinemia com hipoalbuminemia. Cálcio 11,8 mg/dL. Creatinina 2,4 mg/dL.",
      "RX de coluna lombar: vértebras com aspecto osteoporótico difuso e lesão lítica em L2 sem esclerose periférica. RX de crânio: lesões líticas em 'soco de bala' (punch-out) múltiplas no calvário. Proteínas de Bence-Jones: positivas na urina.",
      "Eletroforese de proteínas séricas: pico monoclonal (pico M) na faixa gama — IgG kappa por imunofixação. Quantificação: IgG 6.800 mg/dL. Beta-2-microglobulina: 8,4 mg/L. Mielograma: 35% de plasmócitos com morfologia atípica.",
      "Estadiamento ISS III (beta-2-microglobulina + albumina). Painel citogenético: del17p — alto risco. Tratamento com tripla terapia (bortezomibe + lenalidomida + dexametasona) seguido de transplante autólogo de células-tronco em pacientes elegíveis."
    ],
    explanation: "O Mieloma Múltiplo é neoplasia de plasmócitos que se apresenta com a tétrade CRAB: hipercalcemia (C), insuficiência Renal (R), Anemia (A) e lesões ósseas (Bone lesions). As lesões líticas sem esclerose em 'soco de bala' no crânio são características. O diagnóstico é confirmado pela associação de pico monoclonal + plasmocitose medular > 10% + critérios de dano de órgão-alvo. O ISS estadifica o prognóstico.",
    differentials: "Metástases Ósseas: lesões líticas múltiplas, mas com tumor primário identificável, sem pico monoclonal e sem plasmocitose medular. Osteoporose com Fraturas por Compressão: VHS normal, sem hipercalcemia, sem pico M, sem anemia desproporcional. Doença de Waldenström: paraproteína IgM (não IgG/IgA), sem lesões ósseas líticas — linfadenomegalia e esplenomegalia.",
    reference: "Rajkumar SV et al. International Myeloma Working Group Updated Criteria. Lancet Oncol. 2014;15:e538. Kumar SK et al. Nat Rev Dis Primers. 2017;3:17046.",
    difficulty: 2
  },

  {
    id: 94,
    diagnosis: "Hemorragia Digestiva Baixa por Divertículo",
    aliases: ["hemorragia digestiva baixa", "HDB por diverticulo", "sangramento diverticular"],
    cid: "K57.3",
    category: "Gastroenterologia / Cirurgia",
    clues: [
      "Homem, 68 anos, hipertenso, em uso de AAS 100 mg/dia, procura PS após evacuar 'um vaso cheio de sangue vermelho vivo' sem dor abdominal. Assustou-se com o volume. Nega sangramento prévio. Sem alteração do hábito intestinal recente.",
      "PA 108/72 mmHg (era 140/90 em consulta anterior), FC 102 bpm. Mucosas levemente descoradas. Abdome sem dor à palpação. Toque retal: sangue vivo no dedo de luva, sem massa palpável. Sem hemorragia visível externamente.",
      "Hemoglobina 9,4 g/dL (era 13,8 há 6 meses). Plaquetas 218.000. Coagulograma normal. Ureia 38 mg/dL — relação ureia/creatinina normal, afasta sangramento digestivo alto. Colonoscopia não foi realizada nos últimos 5 anos.",
      "Colonoscopia de urgência (após preparo rápido): divertículos em cólon sigmoide e descendente. Divertículo em cólon ascendente com coto vascular visível — estigma de sangramento recente. Sem pólipos ou lesão neoplásica identificada.",
      "Hemostasia endoscópica com clipe metálico sobre o coto vascular — sucesso imediato. AAS suspenso temporariamente. Transfusão de 2 concentrados de hemácias. Alta após 48h de observação. Colonoscopia de vigilância programada para 3 meses."
    ],
    explanation: "A Hemorragia Digestiva Baixa (HDB) por divertículo é a causa mais comum de sangramento retal volumoso em idosos, respondendo por 30–50% dos casos. O sangramento é geralmente indolor, volumoso e de sangue vivo — por ruptura de vaso reto no colo de divertículo. Cessa espontaneamente em 80% dos casos, mas recorre em 25%. A colonoscopia após preparo adequado é o exame de escolha — diagnóstica e terapêutica. A relação ureia/creatinina ajuda a excluir origem alta.",
    differentials: "Hemorragia Digestiva Alta com Trânsito Rápido: hematêmese ou melena são mais típicas, relação ureia/creatinina > 30 — endoscopia alta confirma. Angiodisplasia de Cólon: sangramento indolor em idoso similar, mas lesão vascular plana na colonoscopia — tratamento endoscópico também eficaz. Câncer Colorretal: sangramento geralmente em menor volume, misturado às fezes, com alteração do hábito intestinal — colonoscopia identifica a massa.",
    reference: "Strate LL & Gralnek IM. ACG Clinical Guideline: Lower GI Bleeding. Am J Gastroenterol. 2016;111:459. Laine L & Shah A. N Engl J Med. 2010;362:823.",
    difficulty: 2
  },

  {
    id: 95,
    diagnosis: "Espondilite Anquilosante",
    aliases: ["espondilite anquilosante", "EA", "espondiloartrite axial"],
    cid: "M45",
    category: "Reumatologia",
    clues: [
      "Homem, 26 anos, procura reumatologista com lombalgia há 18 meses que piora com repouso e melhora com exercício — 'de manhã fico travado por mais de 1 hora'. Acorda durante a noite pela dor. Rigidez matinal intensa. Sem melhora com analgésicos.",
      "Limitação progressiva de mobilidade lombar. Teste de Schober < 4 cm (normal ≥ 5 cm). Tórax com expansão reduzida. Dor à compressão lateral da pelve (sinal de Patrick positivo bilateral). Episódio prévio de uveíte anterior aguda há 8 meses — tratado com colírio.",
      "VHS 62 mm/h. PCR 38 mg/L. Hemograma normal. Fator reumatoide negativo. ANA negativo. HLA-B27 positivo. Radiografia de pelve: esclerose e borramento das margens articulares sacroilíacas bilaterais — aspecto de pseudoalargamento.",
      "RM de sacroilíacas: edema ósseo subcondral bilateral (sinal de inflamação ativa) com erosões precoces. RX de coluna lombar: sindesmófitos incipientes em L3-L4 — ossificação de fibras externas do ânulo fibroso.",
      "AINE em dose plena como tratamento de primeira linha. Fisioterapia intensiva obrigatória para manutenção de mobilidade. Anti-TNF indicado se falha a 2 AINEs ou doença com manifestações extraesqueléticas — critérios ASAS preenchidos."
    ],
    explanation: "A Espondilite Anquilosante é espondiloartrite axial inflamatória crônica com forte associação ao HLA-B27 (90–95% dos casos). O critério clínico mais importante é a lombalgia inflamatória: início < 45 anos, duração > 3 meses, piora com repouso e melhora com exercício. A sacroileíte na RM é o achado mais precoce. Em estágios avançados, a coluna assume aspecto de 'bambu' por sindesmófitos confluentes. As manifestações extraesqueléticas incluem uveíte anterior, psoríase e DII.",
    differentials: "Lombalgia Mecânica Inespecífica: piora com movimento e melhora com repouso — oposto da lombalgia inflamatória. HLA-B27 geralmente negativo e sem sacroileíte. DISH: ossificação anterior de vértebras em idoso diabético, sem sacroileíte e sem HLA-B27 positivo. Artrite Reativa: oligoartrite + uretrite + conjuntivite após infecção GI ou geniturinária, HLA-B27 positivo possível — sem sacroileíte bilateral.",
    reference: "van der Linden S et al. Modified New York Criteria. Arthritis Rheum. 1984;27:361. Ward MM et al. ACR Guidelines for AS. Arthritis Rheumatol. 2016;68:282.",
    difficulty: 2
  },

  {
    id: 96,
    diagnosis: "Polimialgia Reumática",
    aliases: ["polimialgia reumatica", "PMR"],
    cid: "M35.3",
    category: "Reumatologia",
    clues: [
      "Mulher, 72 anos, procura reumatologista com dor e rigidez intensa nos ombros e quadris há 6 semanas — 'não consigo levantar os braços pela manhã'. A rigidez matinal dura mais de 1 hora. Perdeu 4 kg. Cansaço importante. Pensou que era artrose piorando.",
      "Sem artrite periférica evidente. Mobilidade de ombros e quadris reduzida pela dor, mas sem limitação articular intrínseca. Sem fraqueza muscular objetiva — força preservada quando a dor cede. Fundo de olho normal. Sem cefaleia. Sem espessamento de artéria temporal à palpação.",
      "VHS 88 mm/h. PCR 64 mg/L. Hemograma: anemia normocítica leve (Hb 10,8 g/dL). Fosfatase alcalina levemente elevada. Fator reumatoide negativo. ANA negativo. CK normal — afasta miosite. TSH normal.",
      "Ultrassonografia de ombros e quadris: bursites subacromiais bilaterais e trocanteriana bilateral — padrão de distribuição simétrica característico. Ausência de sinovite articular significativa. PET-CT não realizado — reservado para casos complicados.",
      "Prednisona 15 mg/dia — resposta dramática em 24–48h com melhora > 70% dos sintomas. Essa resposta ao corticoide em dose baixa é tão característica que funciona como teste diagnóstico. Redução gradual ao longo de 12–24 meses. Cálcio, vitamina D e bifosfonato para proteção óssea."
    ],
    explanation: "A Polimialgia Reumática (PMR) é a doença reumatológica inflamatória mais comum em idosos acima de 50 anos, com pico entre 70–80 anos. A tríade clínica é dor e rigidez de cintura escapular e pélvica + VHS/PCR elevados + resposta dramática à prednisona em dose baixa. Associa-se à Arterite de Células Gigantes (ACG) em 15–30% — sempre avaliar sintomas de ACG (cefaleia temporal, claudicação de mandíbula, amaurose transitória). A ausência de miosite é importante: a CK é normal.",
    differentials: "Arterite de Células Gigantes: pode coexistir com PMR, mas com cefaleia temporal, espessamento da artéria temporal, claudicação de mandíbula e risco de cegueira — biópsia de artéria temporal confirma. Miosite Inflamatória (Polimiosite): fraqueza muscular objetiva + CK muito elevada + padrão eletromiográfico específico — sem bursites bilaterais no ultrassom. Hipotireoidismo: mialgia, fadiga e VHS levemente elevado, mas com TSH elevado e CK aumentada — responde à levotiroxina.",
    reference: "Dejaco C et al. ACR/EULAR Guidelines for PMR. Arthritis Rheumatol. 2015;67:2569. Salvarani C et al. N Engl J Med. 2002;347:261.",
    difficulty: 2
  },

  {
    id: 97,
    diagnosis: "Crise Miastênica",
    aliases: ["crise miastenica", "crise miastenia gravis", "insuficiencia respiratoria por miastenia"],
    cid: "G70.01",
    category: "Neurologia / Emergência",
    clues: [
      "Mulher, 48 anos, com diagnóstico de miastenia gravis há 3 anos, em uso regular de piridostigmina, trazida ao PS com piora progressiva de fraqueza muscular há 48h. Relata dificuldade para engolir — está engasgando com líquidos desde ontem. Voz com timbre 'abafado'.",
      "FR 28 irpm. Voz nasal, fraqueza facial bilateral, ptose palpebral bilateral piorando com o olhar sustentado. Fraqueza de musculatura cervical — não consegue sustentar a cabeça contra resistência. Reflexos miotáticos preservados. Sem fasciculações.",
      "Capacidade vital forçada (CVF): 1,1 L (18 mL/kg) — abaixo do limiar de 20 mL/kg para suporte ventilatório. Pressão inspiratória máxima (PiMáx): -22 cmH₂O (ref < -30 cmH₂O). Gasometria: pH 7,38, PaCO₂ 48 mmHg — retenção incipiente de CO₂.",
      "Anticorpos anti-AChR: positivos com títulos em elevação em relação ao último exame. Fator precipitante identificado: infecção urinária tratada com ciprofloxacino há 5 dias — quinolonas são medicamentos que agravam miastenia. Piridostigmina suspensa temporariamente.",
      "Intubação orotraqueal eletiva antes da piora — CVF < 20 mL/kg + retenção de CO₂. Imunoglobulina IV 2 g/kg em 5 dias ou plasmaférese como resgate imunológico. Investigação de timoma por TC de tórax obrigatória. Ciprofloxacino substituído."
    ],
    explanation: "A Crise Miastênica é a emergência mais grave da miastenia gravis, caracterizada por fraqueza respiratória que requer suporte ventilatório. A regra dos 20/30 orienta a intubação: CVF < 20 mL/kg ou PiMáx > -30 cmH₂O indicam suporte imediato. A disfagia com risco de aspiração também é indicação. Precipitantes frequentes: infecções, medicamentos (aminoglicosídeos, quinolonas, betabloqueadores, cloroquina), cirurgia. O tratamento é IgIV ou plasmaférese.",
    differentials: "Crise Colinérgica (por excesso de piridostigmina): também fraqueza muscular, mas com miose, bradicardia, sialorreia e fasciculações — piora com piridostigmina, melhora com atropina. Síndrome de Guillain-Barré: fraqueza ascendente arreflexiva com dissociação albuminocitológica no LCR — sem histórico de MG e sem ptose/diplopia. DPOC Agudizado com Insuficiência Respiratória: sem a fraqueza muscular faringeolaríngea e sem o contexto de doença de junção neuromuscular.",
    reference: "Wendell LC & Levine JM. Neurohospitalist. 2011;1:16. Sanders DB et al. Neurology. 2016;87:419.",
    difficulty: 3
  },

  {
    id: 98,
    diagnosis: "Colecistite Aguda Calculosa",
    aliases: ["colecistite aguda", "colecistite calculosa"],
    cid: "K80.0",
    category: "Cirurgia / Gastroenterologia",
    clues: [
      "Mulher, 44 anos, obesa, com histórico de cólicas biliares recorrentes nos últimos 2 anos sempre após refeições gordurosas, procura UPA com dor em hipocôndrio direito há 18 horas — desta vez sem melhora espontânea. Náuseas e vômito bilioso. Temperatura 38,2°C.",
      "Dor em hipocôndrio direito com irradiação para escápula direita. Sinal de Murphy positivo — interrupção da inspiração profunda à palpação do ponto de Murphy. Vesícula palpável como massa dolorosa sob o rebordo costal direito. Sem icterícia. Sem defesa abdominal difusa.",
      "Leucócitos 16.800/mm³ com 14% de bastões. PCR 148 mg/L. Bilirrubina total 1,8 mg/dL (levemente elevada). Amilase e lipase normais. Fosfatase alcalina 1,5× o limite. Ultrassonografia de abdome: vesícula distendida (12 cm), paredes espessadas (6 mm), múltiplos cálculos, líquido pericolecístico.",
      "Sinal de Murphy ecográfico positivo. TC de abdome: vesícula com paredes hipercaptantes, estriação da gordura pericolecística, sem pneumobilia, sem perfuração, sem abscesso pericólecístico identificado. Score de Tokyo III: grau II (moderada).",
      "Antibióticoterapia EV (ceftriaxona + metronidazol). Colecistectomia laparoscópica indicada nas primeiras 72h de internação (padrão atual — cirurgia precoce superior ao tratamento conservador seguido de cirurgia eletiva). Jejum e analgesia."
    ],
    explanation: "A Colecistite Aguda Calculosa ocorre por obstrução do ducto cístico por cálculo com inflamação da parede vesicular. Os 5 F clássicos de risco são: Female, Fat, Fertile, Forty, Fair. O sinal de Murphy é o achado clínico mais específico. A ultrassonografia é o exame de escolha. As diretrizes atuais (Tokyo Guidelines) recomendam colecistectomia laparoscópica nas primeiras 72h, pois reduz complicações e internação total em comparação à abordagem conservadora seguida de cirurgia eletiva.",
    differentials: "Coledocolitíase com Colangite: icterícia + febre + dor (tríade de Charcot), bilirrubina muito elevada, ducto biliar dilatado na US — requer CPRE urgente. Apendicite Retrocecal: localização alta similar, mas sem sinal de Murphy e vesícula normal. Úlcera Péptica Perfurada: pneumoperitônio ao RX, rigidez abdominal em tábua, sem vesícula distendida.",
    reference: "Yokoe M et al. Tokyo Guidelines 2018 (TG18). J Hepatobiliary Pancreat Sci. 2018;25:41.",
    difficulty: 1
  },

  {
    id: 99,
    diagnosis: "Pancreatite Crônica Alcoólica",
    aliases: ["pancreatite cronica", "pancreatite cronica alcoolica"],
    cid: "K86.0",
    category: "Gastroenterologia",
    clues: [
      "Homem, 46 anos, etilista pesado (150 g de álcool/dia há 20 anos), procura ambulatório com dor epigástrica recorrente há 3 anos — episódios de 3 a 5 dias que antes cediam com analgésico e agora são quase diários. Perdeu 12 kg no último ano.",
      "Fezes volumosas, pálidas, com aspecto gorduroso e odor fétido — 3 a 4 episódios por dia. Dificuldade de absorção visível: ingere bem mas não retém peso. Sem icterícia atual. Exame abdominal: dor à palpação em epigástrio sem peritonismo.",
      "Amilase e lipase normais — não estão elevadas na pancreatite crônica fora de agudização. Glicemia de jejum 182 mg/dL — diabetes de início recente. Vitamina B12 e D baixas. Albumina 2,8 g/dL. Elastase fecal: 78 mcg/g (ref > 200 mcg/g) — confirma insuficiência pancreática exócrina.",
      "TC de abdome com protocolo pancreático: pâncreas com calcificações intraductais múltiplas ao longo do ducto de Wirsung, atrofia do parênquima, dilatação do ducto principal (8 mm). Sem massa sólida identificada. Sem dilatação de via biliar.",
      "Abstinência alcoólica absoluta — principal fator modificável. Reposição de enzimas pancreáticas (pancreatina) com as refeições. Insulina para diabetes pancreatogênico. Analgesia escalonada — opioides se necessário. Endoscopia/litotripsia para cálculos ductais obstrutivos."
    ],
    explanation: "A Pancreatite Crônica Alcoólica é a causa mais comum de insuficiência pancreática exócrina e endócrina em adultos. A tríade clássica é dor abdominal crônica + esteatorreia + diabetes. As calcificações intraductais à TC são patognomônicas. A amilase/lipase podem ser normais na fase crônica por esgotamento do parênquima funcionante. A abstinência alcoólica é a única intervenção que reduz a progressão — mas não cura a fibrose já instalada.",
    differentials: "Pancreatite Aguda Recidivante: episódios com amilase/lipase elevadas sem as alterações crônicas de calcificação e atrofia na TC. Adenocarcinoma de Pâncreas: massa sólida com dilatação do ducto biliar e pancreático (sinal do duplo ducto), CA 19-9 elevado — a pancreatite crônica é fator de risco. Doença Celíaca: esteatorreia sem calcificações pancreáticas, anticorpos anti-transglutaminase positivos.",
    reference: "Löhr JM et al. United European Gastroenterol J. 2017;5:153 (HaPanEU/UEG Guidelines). Kleeff J et al. Nat Rev Dis Primers. 2017;3:17060.",
    difficulty: 2
  },

  {
    id: 100,
    diagnosis: "Diverticulite Aguda Complicada",
    aliases: ["diverticulite aguda complicada", "diverticulite com abscesso"],
    cid: "K57.2",
    category: "Cirurgia / Gastroenterologia",
    clues: [
      "Homem, 62 anos, com diverticulose conhecida, chega ao PS com dor em fossa ilíaca esquerda há 4 dias, progressiva. Febre de 38,6°C. Alteração do hábito intestinal — obstipação nos últimos 3 dias após período de diarreia. Sem sangramento retal.",
      "Dor à palpação profunda em fossa ilíaca esquerda com discreta defesa muscular localizada. Sinal de Blumberg localizado em FIE. Ausência de dor em FID. Peristalse reduzida. Temperatura 39,1°C, FC 104 bpm.",
      "Leucócitos 18.600/mm³ com 16% de bastões. PCR 280 mg/L. Creatinina normal. Lipase normal. Urina sem alterações. Radiografia de abdome: sem pneumoperitônio, sem distensão de alças.",
      "TC de abdome com contraste: espessamento mural do sigmoide com divertículos, estriação da gordura pericolônica, coleção pericólica de 4,5 cm adjacente — abscesso pericólico. Sem perfuração livre. Sem fístula identificada. Classificação de Hinchey II.",
      "Antibioticoterapia EV (piperacilina-tazobactam). Drenagem percutânea guiada por TC do abscesso de 4,5 cm. Dieta zero e hidratação. Colonoscopia eletiva após 6–8 semanas de resolução para excluir neoplasia. Sigmoidectomia eletiva discutida após resolução do episódio agudo."
    ],
    explanation: "A Diverticulite Aguda Complicada inclui formação de abscesso (Hinchey I e II), fístula, obstrução ou perfuração livre (Hinchey III e IV). A TC com contraste é o exame padrão para estadiamento e guia o tratamento. Abscessos < 3 cm respondem a antibióticos; ≥ 4 cm requerem drenagem percutânea. A colonoscopia após 6–8 semanas é obrigatória para excluir neoplasia colorretal subjacente. A sigmoidectomia eletiva é considerada após dois episódios ou complicação.",
    differentials: "Apendicite Aguda: FID, não FIE — localizações opostas. Câncer de Cólon Perfurado: TC com massa identificável, sem padrão diverticular típico, CA 19-9 elevado. Doença de Crohn Colônica: história de DII, lesões transmurais segmentares, jovem — biópsia diferencia.",
    reference: "Sartelli M et al. World J Emerg Surg. 2020;15:32 (WSES Guidelines). Hall J et al. Dis Colon Rectum. 2020;63:728 (ASCRS Guidelines).",
    difficulty: 2
  },
];

var ALL_DIAGNOSES = [
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
