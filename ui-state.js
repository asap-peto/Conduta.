/* ============================================================
   ui-state.js — Conduta.
   Estado compartilhado entre módulos de UI.
   ============================================================ */

var onbState = { step: 0, sampleAnswer: null };
var homeSelectedLevelId = null;
var leagueComposerOpen = false; // legado — mantém compat
var leagueModalMode = null; // 'create' | 'join' | 'edit' | null
var leagueEditingLeagueId = null;
var leagueRequestsOpen = false;
var profileSettingsOpen = false;
