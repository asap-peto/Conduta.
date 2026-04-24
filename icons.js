/* ============================================================
   icons.js — Conduta.
   Biblioteca inline de ícones SVG (monoline stroke, 24x24).
   Uso: icon('name', size=24, extraClass='')
   ============================================================ */

const ICONS = {
  // Header stats
  flame: '<path d="M12 3c.9 2.3 3.9 4.5 3.9 8 0 3.6-2.4 6.3-5.9 6.3S4.1 14.6 4.1 11c0-2.4 1.1-4.4 3-6 .1 2 1.2 3.4 2.6 4.1.5-1.6.7-3.4.3-5.1.8.4 1.5.9 2 .0z"/><path d="M12 11.1c.9 1.1 1.8 2.1 1.8 3.7 0 1.4-1 2.5-2.3 2.5s-2.3-1.1-2.3-2.5c0-1 .4-1.9 1.2-2.8.1.9.6 1.5 1.1 1.9.3-.8.5-1.8.5-2.8z" fill="currentColor" stroke="none"/>',
  heart: '<path d="M12 21s-7-4.5-9-9c-1.5-3.5.5-7 4-7 2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.5 0 5.5 3.5 4 7-2 4.5-9 9-9 9z"/>',
  gem: '<path d="M6 3h12l3 6-9 12L3 9z"/><path d="M6 3l3 6M18 3l-3 6M3 9h18M12 21V9"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',

  // Nav / actions
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  play: '<path d="M6 4l14 8-14 8V4z"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>',
  check: '<path d="M5 12l5 5L20 7"/>',
  chevron: '<path d="M9 6l6 6-6 6"/>',
  back: '<path d="M15 6l-6 6 6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',

  // Mascot / profile
  owl: '<circle cx="12" cy="13" r="8"/><circle cx="9" cy="12" r="2" fill="currentColor"/><circle cx="15" cy="12" r="2" fill="currentColor"/><path d="M12 15l-1.5 2h3z" fill="currentColor"/><path d="M6 7l2 3M18 7l-2 3"/>',
  stethoscope: '<path d="M6 3v6a4 4 0 008 0V3"/><path d="M10 15a5 5 0 005 5 5 5 0 005-5v-3"/><circle cx="20" cy="9" r="2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>',

  // Stats / gamification
  trophy: '<path d="M8 4h8v5a4 4 0 01-8 0V4z"/><path d="M8 6H5a2 2 0 002 4M16 6h3a2 2 0 01-2 4"/><path d="M10 13v3h4v-3M8 20h8"/>',
  star: '<path d="M12 3l2.6 5.8 6.4.6-4.8 4.4 1.4 6.2L12 17l-5.6 3 1.4-6.2L3 9.4l6.4-.6L12 3z"/>',
  fire: '<path d="M12 3c1 3 4 5 4 9a4 4 0 01-8 0c0-2 1-3 2-4 0 2 1 3 2 3-1-2 0-5 0-8z"/>',
  shield: '<path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z"/>',
  crown: '<path d="M3 17h18l-2-9-4 4-4-7-4 7-4-4z"/>',

  // Modes
  hospital: '<rect x="4" y="7" width="16" height="14" rx="1"/><path d="M10 11h4M12 9v6"/><path d="M8 21v-4h8v4"/>',
  image: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M3 17l5-5 5 5 3-3 5 5"/>',
  triage: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/>',
  flash: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
  moon: '<path d="M20 14a8 8 0 11-10-10 6 6 0 0010 10z"/>',
  pill: '<rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-35 12 12)"/><path d="M8.5 7.5l7 7" transform="rotate(-35 12 12)"/>',
  microscope: '<path d="M9 5l4-2 3 5-4 2z"/><path d="M10 10l2 4M6 19h12M8 19v-4h6v4"/>',
  syringe: '<path d="M3 21l4-4M7 17l3 3M14 4l6 6-8 8-6-6 8-8z"/><path d="M13 3l8 8"/>',

  // UI
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
  book: '<path d="M4 4h7a3 3 0 013 3v13a2 2 0 00-2-2H4zM20 4h-7a3 3 0 00-3 3v13a2 2 0 012-2h8z"/>',
  share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>',
  logout: '<path d="M10 4H5a2 2 0 00-2 2v12a2 2 0 002 2h5M15 12h7M19 8l4 4-4 4" transform="translate(-3,0)"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.8v2.1M12 19.1v2.1M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M2.8 12h2.1M19.1 12h2.1M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5"/><circle cx="12" cy="12" r="7.2"/>',

  // Feedback
  thumbUp: '<path d="M7 10v10H4V10zM7 10l4-7a2 2 0 014 2v3h5a2 2 0 012 2l-2 7a2 2 0 01-2 2H7"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',

  // Medal / league
  medal: '<circle cx="12" cy="14" r="6"/><path d="M9 2l3 6 3-6M12 14l-1 3h2z" fill="currentColor"/>',

  // Target / goal
  dumbbell: '<path d="M3 9v6M21 9v6M6 7v10M18 7v10M6 12h12"/>'
};

function icon(name, size = 24, extraClass = '') {
  const body = ICONS[name] || ICONS.star;
  return `<svg class="icn icn-${name} ${extraClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

window.icon = icon;
window.ICONS = ICONS;
