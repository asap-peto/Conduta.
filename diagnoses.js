/* ============================================================
   diagnoses.js — Conduta.
   Dicionário de diagnósticos para o autocomplete da etapa de
   hipótese. NÃO é o gabarito — a correção é sempre contra o
   acceptedAnswers do caso. Isto só ajuda a digitar (evita
   sinônimo/acento errado) e sugere alternativas plausíveis.
   Cresce com o tempo. `searchDiagnoses(q)` filtra por prefixo/
   substring normalizada.
   ============================================================ */

var DIAGNOSES = [
  // cardio
  'Insuficiência cardíaca com fração de ejeção reduzida',
  'Insuficiência cardíaca com fração de ejeção preservada',
  'Infarto agudo do miocárdio',
  'Síndrome coronariana aguda',
  'Angina instável',
  'Doença arterial coronariana',
  'Fibrilação atrial',
  'Tromboembolismo pulmonar',
  'Dissecção de aorta',
  'Pericardite aguda',
  'Miocardite',
  'Estenose aórtica',
  // pneumo
  'Pneumonia adquirida na comunidade',
  'Bronquiolite viral aguda',
  'Asma',
  'DPOC exacerbada',
  'Pneumotórax hipertensivo',
  'Derrame pleural',
  'Edema agudo de pulmão',
  // GO
  'Endometriose',
  'Doença inflamatória pélvica',
  'Gravidez ectópica',
  'Miomatose uterina',
  'Cisto ovariano hemorrágico',
  'Torção anexial',
  // ped
  'Acidose tubular renal',
  'Cetoacidose diabética',
  'Estenose hipertrófica de piloro',
  'Invaginação intestinal',
  'Bronquiolite',
  // infecto
  'Choque séptico',
  'Sepse',
  'Neutropenia febril',
  'Dengue',
  'Leptospirose',
  'Meningite bacteriana',
  'Endocardite infecciosa',
  'Malária',
  // neuro
  'Acidente vascular cerebral isquêmico',
  'Acidente vascular cerebral hemorrágico',
  'Hemorragia subaracnóidea',
  'Crise convulsiva',
  'Meningite',
  'Distonia aguda',
  'Discinesia tardia',
  'Acatisia',
  // trauma / emergência
  'Traumatismo cranioencefálico',
  'Choque hipovolêmico',
  'Tamponamento cardíaco',
  'Fratura exposta',
  // endo
  'Cetoacidose diabética',
  'Estado hiperglicêmico hiperosmolar',
  'Crise tireotóxica',
  'Insuficiência adrenal aguda',
  'Hipotireoidismo',
  // GI
  'Hemorragia digestiva alta',
  'Pancreatite aguda',
  'Apendicite aguda',
  'Colecistite aguda',
  'Cirrose hepática',
  // reumato
  'Artrite reumatoide',
  'Lúpus eritematoso sistêmico',
  'Gota',
  'Osteoartrite',
  'Espondilite anquilosante',
  'Esclerose sistêmica',
  // psiq / tox
  'Intoxicação por antidepressivo tricíclico',
  'Síndrome serotoninérgica',
  'Síndrome neuroléptica maligna',
  'Abstinência alcoólica'
];

/* filtra o dicionário por consulta normalizada (usa normalizeDx do score.js) */
function searchDiagnoses(q, limit) {
  limit = limit || 6;
  var nq = (typeof normalizeDx === 'function') ? normalizeDx(q) : String(q || '').toLowerCase().trim();
  if (!nq || nq.length < 2) return [];
  var starts = [], contains = [];
  for (var i = 0; i < DIAGNOSES.length; i++) {
    var n = (typeof normalizeDx === 'function') ? normalizeDx(DIAGNOSES[i]) : DIAGNOSES[i].toLowerCase();
    if (n.indexOf(nq) === 0) starts.push(DIAGNOSES[i]);
    else if (n.indexOf(nq) !== -1) contains.push(DIAGNOSES[i]);
    if (starts.length >= limit) break;
  }
  return starts.concat(contains).slice(0, limit);
}

window.DIAGNOSES = DIAGNOSES;
window.searchDiagnoses = searchDiagnoses;
