// validate-cases.js — checagem estrutural dos casos do Conduta.
// Ferramenta de desenvolvimento (Node, sem dependências). NÃO é carregada
// pelo app — não entra no index.html. Uso: `node validate-cases.js`.
// Documentação das regras: AGENTE-CASOS.md.
const fs = require('fs'), vm = require('vm');
const CASES = process.argv[2] || (__dirname + '/cases.js');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(CASES, 'utf8'), ctx);
const { DAILY_CASES, DX_BY_CASE, THEMES, DAILY_QUEUE } = ctx.window;

let errs = [], warns = [];
const push = (id, m) => errs.push(`✗ [${id}] ${m}`);

for (const c of DAILY_CASES) {
  const id = c.id || '(sem id)';
  if (!id || /[^a-z0-9-]/.test(id)) push(id, 'id deve ser kebab-case sem acento');
  if (!THEMES[c.theme]) push(id, `theme "${c.theme}" não existe em THEMES`);
  if (![1,2,3].includes(c.difficulty)) warns.push(`? [${id}] difficulty fora de 1–3`);
  if (!DAILY_QUEUE.includes(id)) push(id, 'não está em DAILY_QUEUE');
  if (!c.presentation || !c.presentation.vignette) push(id, 'sem presentation.vignette');
  if (!c.debrief || !c.debrief.reference) warns.push(`? [${id}] debrief.reference vazio`);

  const decs = c.decisions || [];
  if (decs.length !== 3) push(id, `esperado 3 decisões, achou ${decs.length}`);
  const kinds = decs.map(d => d.kind).join(',');
  if (kinds !== 'initial,interpretation,final') push(id, `kinds errados: ${kinds}`);

  let dangerCount = 0;
  decs.forEach((d, i) => {
    const ops = d.options || [];
    if (ops.length !== 4) push(id, `d${i+1} tem ${ops.length} opções (esperado 4)`);
    const best = ops.filter(o => o.quality === 'best').length;
    const acc  = ops.filter(o => o.quality === 'acceptable').length;
    if (best !== 1) push(id, `d${i+1} tem ${best} 'best' (esperado 1)`);
    if (acc > 1)    push(id, `d${i+1} tem ${acc} 'acceptable' (máx 1)`);
    ops.forEach((o, j) => {
      if (!o.feedback) push(id, `d${i+1} opção ${j+1} sem feedback`);
      if (o.dangerous && o.quality !== 'poor') push(id, `d${i+1} dangerous fora de 'poor'`);
      if (o.dangerous) dangerCount++;
    });
  });
  if (dangerCount < 1 || dangerCount > 2) warns.push(`? [${id}] ${dangerCount} dangerous (ideal 1–2)`);

  const reveals = c.reveals || [];
  if (reveals.length < 2) warns.push(`? [${id}] ${reveals.length} reveals (esperado 2)`);

  const dx = DX_BY_CASE[id];
  if (dx && decs[1]) {
    const p = (decs[1].prompt || '').toLowerCase();
    if (/hip[óo]tese|diagn[óo]stico|o que o caso apresenta|qual a doen/.test(p))
      push(id, `d2 parece re-perguntar o diagnóstico: "${decs[1].prompt}"`);
    if (!dx.hints || dx.hints.length < 2) warns.push(`? [${id}] <2 hints`);
    (dx.acceptedAnswers || []).concat(dx.partialAnswers || []).forEach(a => {
      if (a !== a.toLowerCase()) push(id, `resposta aceita não-minúscula: "${a}"`);
    });
  }
}

console.log(`\nCasos: ${DAILY_CASES.length} · Erros: ${errs.length} · Avisos: ${warns.length}\n`);
errs.forEach(e => console.log(e));
warns.forEach(w => console.log(w));
process.exit(errs.length ? 1 : 0);
