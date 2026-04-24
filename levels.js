/* ============================================================
   levels.js — Conduta.
   Motor leve de níveis. O conteúdo é carregado em chunks
   separados para o app crescer sem inflar o JS principal.
   ============================================================ */

const MODES = {
  classica:  { icon: 'hospital',   label: 'Conduta Clássica',  color: '#cefc8a' },
  imagem:    { icon: 'image',      label: 'Dia da Imagem',     color: '#fca5f1' },
  triagem:   { icon: 'triage',     label: 'Triagem',           color: '#ffb86c' },
  rapidfire: { icon: 'flash',      label: 'Rapid Fire',        color: '#f7e96b' },
  plantao:   { icon: 'moon',       label: 'Plantão Simulado',  color: '#6ad1ff' },
  casoraro:  { icon: 'microscope', label: 'Caso Raro',         color: '#ff6b6b' },
  prescricao:{ icon: 'pill',       label: 'Prescrição',        color: '#b5a7ff' }
};

const DIFFICULTY = {
  1: { starsN: 1, label: 'Fácil',    xpMult: 1.0, get stars(){ return starIcons(1); } },
  2: { starsN: 2, label: 'Médio',    xpMult: 1.3, get stars(){ return starIcons(2); } },
  3: { starsN: 3, label: 'Difícil',  xpMult: 1.7, get stars(){ return starIcons(3); } },
  4: { starsN: 4, label: 'Expert',   xpMult: 2.2, get stars(){ return starIcons(4); } }
};

const LEVEL_DATA_FILES = ['levels-data.js?v=2'];

function starIcons(n) {
  if (typeof window === 'undefined' || typeof window.icon !== 'function') return '★'.repeat(n);
  return Array.from({ length: n }, () => window.icon('star', 12, 'icn-star')).join('');
}

var LEVELS = [];
var TOTAL_LEVELS = 0;
var levelsReadyPromise = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-level-chunk="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === 'true') {
        resolve();
      } else {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Falha ao carregar ' + src)), { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.dataset.levelChunk = src;
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      resolve();
    }, { once: true });
    script.addEventListener('error', () => reject(new Error('Falha ao carregar ' + src)), { once: true });
    document.head.appendChild(script);
  });
}

function flattenLevelChunks() {
  const chunks = Array.isArray(window.CONDUTA_LEVEL_CHUNKS) ? window.CONDUTA_LEVEL_CHUNKS : [];
  return chunks.flatMap(chunk => Array.isArray(chunk) ? chunk : []);
}

function syncLevelGlobals(levels) {
  LEVELS = levels;
  TOTAL_LEVELS = LEVELS.length;
  window.LEVELS = LEVELS;
  window.TOTAL_LEVELS = TOTAL_LEVELS;
  return LEVELS;
}

async function ensureLevelsLoaded() {
  if (LEVELS.length) return LEVELS;
  if (levelsReadyPromise) return levelsReadyPromise;

  levelsReadyPromise = (async function() {
    if (!flattenLevelChunks().length) {
      await Promise.all(LEVEL_DATA_FILES.map(loadScript));
    }

    const loaded = flattenLevelChunks();
    if (!loaded.length) {
      throw new Error('Nenhum nível foi carregado.');
    }

    return syncLevelGlobals(loaded);
  })();

  try {
    return await levelsReadyPromise;
  } catch (err) {
    levelsReadyPromise = null;
    throw err;
  }
}

function getLevel(id) {
  return LEVELS.find(l => l.id === id);
}

function getLevelByNumber(n) {
  return LEVELS.find(l => l.number === n);
}

const WEEKDAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const WEEKDAY_FULL  = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

window.LEVELS = LEVELS;
window.MODES = MODES;
window.DIFFICULTY = DIFFICULTY;
window.TOTAL_LEVELS = TOTAL_LEVELS;
window.LEVEL_DATA_FILES = LEVEL_DATA_FILES;
window.ensureLevelsLoaded = ensureLevelsLoaded;
window.getLevel = getLevel;
window.getLevelByNumber = getLevelByNumber;
window.WEEKDAY_NAMES = WEEKDAY_NAMES;
window.WEEKDAY_FULL = WEEKDAY_FULL;
