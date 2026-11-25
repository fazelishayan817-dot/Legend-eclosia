'use strict';
/* ============================================================
   ÉCLOSIA — GPS : mini-carte sous l'écran, objectif et flèche
   ============================================================ */
const GPS = { el: null, cv: null, last: 0, info: null };

function gpsGoal() {
  const T = (id, txt, extra) => Object.assign({ map: id, txt }, extra || {});
  if (!G.flags.starter) return T('t0', "Va chercher ta première créature au labo du Prof. Sauge.", { door: 'lab' });
  for (let i = 0; i < 8; i++) if (!G.badges[i]) { const g = GYMS[i]; return T(g.town, `Arène de ${TOWNS[g.town].name} : ${g.leader}, type ${TN[g.type]}.`, { door: 'gym' }); }
  if (!G.keys.ticket) return T('t9', "Plateau de la Ligue : deviens champion·ne des Quatre Terres.", { door: 'league' });
  if (!G.flags.arrivedB) return T('t3', "Port-Corail : prends le ferry pour Éclosia.", { npc: 'dock' });
  for (let i = 8; i < 16; i++) if (!G.badges[i]) { const g = GYMS[i]; return T(g.town, `Arène de ${TOWNS[g.town].name} : ${g.leader}, type ${TN[g.type]}.`, { door: 'gym' }); }
  if (!G.flags.st_somnis_nuit2) return T('s7', "Le Cœur de la Graine, par la Route 7 d'Éclosia. Maître Ronce y attend.", { side: 1 });
  if (!G.flags.ending) return T('u9', "Mont Éveil : grimpe au sommet et termine l'histoire.", { top: 1 });
  if (!G.flags.envDone || !G.flags.avantDone) return T('u9', "Mont Éveil : traverse les Failles vers les mondes parallèles.", { npc: 'faille' });
  if (!G.flags.reveDone) return T('u6', "Graineval : Oniris t'ouvre la porte du Rêve.", { npc: 'reveEntree' });
  if (!G.flags.passeDone) return T('u9', "Mont Éveil : l'escalier de la Tour d'Elio mène à l'horloge du temps.", { npc: 'tourElio' });
  if (!G.flags.st_ronce_pardon) return T('sanct_nuit', "Cœur de la Graine : une racine mène aux Profondeurs.", { npc: 'profondeurs' });
  return T(null, `Libre ! Codex ${Object.keys(G.caught).length}/${DEX.length} · Écrits ${Object.keys(G.read || {}).length}/${LORE_TEXTS.length}.`);
}
// Objectif propre aux mondes à part (Envers, Avant, Rêve, zones secrètes, passé)
function gpsLocalGoal(rk, cur) {
  const R = REGIONS[rk];
  if (rk === 'reve') {
    if (wakeCount() < 12) return { txt: `Rêve d'Oniris : réveille les dormeurs (${wakeCount()}/12).`, local: 'sleeper' };
    if (!G.flags.reveDone) return { map: 'd2', txt: "Palais des Paupières : affronte Oniris du Rêve.", trainer: 'reve_oniris' };
    return { map: 'd0', txt: "Le rêve est apaisé. La porte du rêve te ramène à Graineval.", npc: 'retour' };
  }
  if (rk === 'envers') return G.flags.envDone ? { map: 'v0', txt: "Retourne à la Faille de Port-Épine.", npc: 'failleRetour' } : { map: R.chain[R.chain.length - 1], txt: "Monte jusqu'au Trône des Racines.", trainer: 'roi_ronce' };
  if (rk === 'avant') return G.flags.avantDone ? { map: 'x0', txt: "Retourne à la Faille de Nacre.", npc: 'failleRetour' } : { map: 'x3', txt: "Rejoins le Gouffre de la Graine avant la nuit.", legend: 1 };
  if (rk === 'passe') return G.flags.st_passe_moi ? { map: 'p0', txt: "L'horloge te ramène dans ton temps.", npc: 'horlogeRetour' } : { map: 'p0', txt: "Parle à ton toi de seize ans.", trainer: 'passe_moi' };
  const tr = { tour: 'elio_tour', racines: 'ronce_pardon', ruine: 'gaetan', echos: 'ermite' }[rk];
  if (tr && !G.flags['st_' + tr]) return { map: cur, txt: `${REGIONS[rk].name} : un adversaire t'attend.`, trainer: tr };
  if (rk === 'tour' && !G.flags.passeDone) return { map: cur, txt: "L'horloge sans aiguilles mène au passé.", npc: 'horloge' };
  return { map: cur, txt: `${REGIONS[rk].name} : explore, lis les écrits, puis parle à la Sortie.`, npc: 'retour' };
}
const MAIN_REG = { solvene: 1, brumaire: 1 };
function gpsPoint(m, goal) {
  // point visé sur la carte courante quand on est déjà sur la carte cible
  if (goal.door) { const b = m.buildings.find(bb => bb.kind === goal.door); if (b) return [b.door[0], b.door[1], goal.door === 'gym' ? 'Porte de l\'arène' : goal.door === 'lab' ? 'Porte du labo' : 'Entrée de la Ligue']; }
  const find = f => RT.npcs.find(f) || m.npcs.find(n => f(n) && visibleNpc(n));
  if (goal.npc) { const n = find(n => n.script === goal.npc); if (n) return [n.x, n.y, n.speaker || 'Point de passage']; }
  if (goal.trainer) { const n = find(n => n.story === goal.trainer); if (n) return [n.x, n.y, 'Adversaire']; }
  if (goal.local === 'sleeper') { const P = RT.P; const n = RT.npcs.filter(n => n.sleep != null && n.sleep < 99 && !G.flags['wake_' + n.sleep]).sort((a, b) => (Math.abs(a.x - P.x) + Math.abs(a.y - P.y)) - (Math.abs(b.x - P.x) + Math.abs(b.y - P.y)))[0]; if (n) return [n.x, n.y, 'Dormeur le plus proche']; }
  if (goal.legend) { const n = find(n => n.kind === 'legend'); if (n) return [n.x, n.y, 'Présence légendaire']; }
  if (goal.top) return [8, 3, 'Sommet'];
  if (goal.side) { const w = m.warps.find(w => w.to && w.to.startsWith('sanct')); if (w) return [w.x, w.y, 'Passage du sanctuaire']; }
  return null;
}
function gateXY(m, side) { const g = m.gates[side]; if (!g) return null; return side === 'n' ? [g.p, 0] : side === 's' ? [g.p, m.h - 1] : side === 'w' ? [0, g.p] : [m.w - 1, g.p]; }
function gpsRoute() {
  const m = RT.map; let goal;
  const sp = !TOWNS[m.id] && !ROUTES[m.id] && m.kind !== 'int';
  let cur = m.kind === 'int' ? m.parent : sp && SPECIAL_RET[m.id] ? SPECIAL_RET[m.id].map : m.id;
  const rk = REGION_OF[cur];
  goal = MAIN_REG[rk] ? gpsGoal() : gpsLocalGoal(rk, cur);
  const out = { txt: goal.txt, pt: null, label: '' };
  if (m.kind === 'int') {
    const w = m.warps.find(w => w.exit) || m.warps[0];
    if (w) { out.pt = [w.x, w.y]; out.label = 'Sortie du bâtiment'; }
    return out;
  }
  if (!goal.map) {
    if (goal.local) { const p = gpsPoint(m, goal); if (p) { out.pt = p; out.label = p[2]; } }
    return out;
  }
  if (goal.map === m.id) { const p = gpsPoint(m, goal); if (p) { out.pt = p; out.label = p[2]; } return out; }
  if (sp) { // sanctuaire : ressortir
    const w = m.warps.find(w => w.to === cur) || m.warps[0];
    if (w) { out.pt = [w.x, w.y]; out.label = 'Sortie du sanctuaire'; } return out;
  }
  let target = goal.map;
  if (SPECIAL_RET[target]) target = SPECIAL_RET[target].map;
  if (target === cur) { // le sanctuaire est accessible depuis cette route
    const w = m.warps.find(w => w.to === goal.map); if (w) { out.pt = [w.x, w.y]; out.label = 'Passage du sanctuaire'; } return out;
  }
  let rt = REGION_OF[target];
  if (rk !== rt) {
    const TIME = { cendre: 1, neo: 1, unae: 1 };
    if (TIME[rk] || TIME[rt]) { const n = m.npcs.find(n => n.script === 'chrono' && visibleNpc(n)); if (n) { out.pt = [n.x, n.y]; out.label = 'Faille du Temps'; } else out.label = 'Ouvre le menu > Voyager (Chronoportail)'; return out; }
    if (MAIN_REG[rk] && MAIN_REG[rt]) target = rk === 'solvene' ? 't3' : 'u0';
    else if (!MAIN_REG[rk]) { const n = m.npcs.find(n => /retour|failleRetour|horlogeRetour/.test(n.script || '') && visibleNpc(n)); if (n) { out.pt = [n.x, n.y]; out.label = 'Retour vers Éclosia'; } else { out.label = 'Reviens au point d\'arrivée'; } return out; }
    else { // cible dans un monde à part : rejoindre son point d'accès
      const access = { reve: 'u6', ruine: 'u0', racines: 's7', tour: 'u9', echos: 't7', passe: 'u9', envers: 'u9', avant: 'u9' }[rt] || 'u9';
      target = access; rt = REGION_OF[target];
      if (rk !== rt) target = rk === 'solvene' ? 't3' : 'u0';
    }
    if (target === cur) { const n = m.npcs.find(n => n.script === 'dock'); if (n) { out.pt = [n.x, n.y]; out.label = 'Ferry'; } return out; }
  }
  const ch = REGIONS[REGION_OF[cur]].chain, ci = ch.indexOf(cur), ti = ch.indexOf(target);
  if (ci < 0 || ti < 0) return out;
  const L = LINKS[cur], link = ti > ci ? L.exit : L.entr;
  if (link) { out.pt = gateXY(m, link.side); const nm = (TOWNS[link.to] || ROUTES[link.to] || {}).name || link.to; out.label = `Vers ${nm}`; }
  return out;
}

/* ---------- Mini-carte ---------- */
function tileColor(ch, P, int) {
  if (int) return ch === 'w' ? '#7a5a3e' : ch === 'B' || ch === 'c' || ch === 'C' || ch === 't' ? '#a07850' : '#d8b484';
  switch (ch) {
    case 'T': return P.tr2 || P.tr; case 'R': case 'V': return P.rk || '#777';
    case '~': return P.w; case '=': return '#a07040'; case 's': return P.s || P.p;
    case ',': case 'q': case 'S': return P.p; case '"': return P.tg || P.g2; case 'a': return '#f2e2b0';
    case 'x': return '#6a4a3a'; case 'F': return '#8a6a4a'; case 'D': return '#3a2418'; case 'L': return '#f2d070';
    default: return P.g;
  }
}
function gpsDraw() {
  const m = RT.map, cv = GPS.cv; if (!m || !cv) return;
  const S = 4; if (cv.width !== m.w * S || cv.height !== m.h * S) { cv.width = m.w * S; cv.height = m.h * S; }
  const g = cv.getContext('2d'), P = MPAL[m.pal] || MPAL.solvene, int = m.kind === 'int';
  if (m.big) {
    if (!m._mini) { const c = mkCanvas(m.w * S, m.h * S), mg = c.getContext('2d'); for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) { mg.fillStyle = tileColor(m.t[y][x], P, false); mg.fillRect(x * S, y * S, S, S); } for (const b of m.buildings) { mg.fillStyle = b.roof || '#b84a3a'; mg.fillRect(b.x * S, b.y * S, b.w * S, b.h * S); } m._mini = c; }
    g.drawImage(m._mini, 0, 0);
  } else for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) { g.fillStyle = tileColor(m.t[y][x], P, int); g.fillRect(x * S, y * S, S, S); }
  if (!m.big) for (const b of m.buildings) { g.fillStyle = b.roof || '#b84a3a'; g.fillRect(b.x * S, b.y * S, b.w * S, (b.h - 1) * S); if (b.emblem) { g.fillStyle = b.emblem; g.fillRect((b.x + b.w / 2 - 1) * S, (b.y + 1) * S, 2 * S, 2 * S); } g.fillStyle = '#2a1a12'; g.fillRect(b.door[0] * S + 1, b.door[1] * S, S - 2, S); }
  const t = performance.now() / 1000;
  const dot = (x, y, c, r) => { g.fillStyle = c; g.beginPath(); g.arc(x * S + S / 2, y * S + S / 2, r, 0, 7); g.fill(); };
  for (const n of RT.npcs) {
    if (n.kind === 'lore') { if (!(G.read && G.read[n.lore])) dot(n.x, n.y, '#ffd84a', 2.4); continue; }
    if (n.kind === 'item') { dot(n.x, n.y, '#5ae0ff', 2); continue; }
    if (n.kind === 'legend') { dot(n.x, n.y, '#c07aff', 3 + Math.sin(t * 4)); continue; }
    if (n.trainer && !G.flags[n.trainer.flag]) { dot(n.x, n.y, '#ff4a4a', 2.2); continue; }
    if (n.sleep != null && !G.flags['wake_' + n.sleep]) { dot(n.x, n.y, '#b8a8ff', 2.2); continue; }
    if (n.script) { dot(n.x, n.y, '#ffffff', 1.8); continue; }
  }
  const info = GPS.info;
  if (info && info.pt) { const r = 3 + (Math.sin(t * 5) + 1) * 2; g.strokeStyle = '#ff6f59'; g.lineWidth = 2; g.beginPath(); g.arc(info.pt[0] * S + S / 2, info.pt[1] * S + S / 2, r, 0, 7); g.stroke(); }
  const p = RT.P; if (p) { const px = p.px / TS, py = p.py / TS; g.fillStyle = '#1a1424'; g.beginPath(); g.arc(px * S + S / 2, py * S + S / 2, 4, 0, 7); g.fill(); g.fillStyle = Math.sin(t * 6) > -0.3 ? '#ffffff' : '#ff6f59'; g.beginPath(); g.arc(px * S + S / 2, py * S + S / 2, 2.6, 0, 7); g.fill(); }
}
const DIR8 = ['Est', 'Sud-Est', 'Sud', 'Sud-Ouest', 'Ouest', 'Nord-Ouest', 'Nord', 'Nord-Est'];
function gpsUpdate() {
  const el = GPS.el; if (!el) return;
  const live = typeof G !== 'undefined' && G && RT.map && RT.P && (RT.mode === 'overworld' || RT.mode === 'battle');
  el.classList.toggle('off', !live);
  if (!live) return;
  const now = performance.now();
  if (now - GPS.last > 400) {
    GPS.last = now;
    try { GPS.info = gpsRoute(); } catch (e) { GPS.info = { txt: '', pt: null, label: '' }; }
    const m = RT.map, rk = REGION_OF[m.kind === 'int' ? m.parent : m.id] || m.reg, I = GPS.info;
    el.querySelector('.gn').textContent = m.world && m.zoneName ? m.zoneName(RT.P.x, RT.P.y) : m.name;
    el.querySelector('.gr').textContent = (G.era ? ((REGIONS[rk] || REGIONS[m.reg] || {}).name || '').replace(/ · (An|il y a|onze|mille).*$/, '') + ` · An ${G.era.y}` : ((REGIONS[rk] || REGIONS[m.reg] || {}).name || ''));
    el.querySelector('.gg').textContent = I.txt || '';
    const ar = el.querySelector('.garr'), gd = el.querySelector('.gd');
    if (I.pt) {
      const dx = I.pt[0] - RT.P.x, dy = I.pt[1] - RT.P.y, d = Math.abs(dx) + Math.abs(dy);
      const ang = Math.atan2(dy, dx);
      ar.style.transform = `rotate(${ang}rad)`; ar.style.opacity = d ? 1 : 0.3;
      gd.textContent = d ? `${I.label} · ${DIR8[((Math.round(ang / (Math.PI / 4)) % 8) + 8) % 8]} · ${d} pas` : `${I.label} · tu y es`;
    } else { ar.style.opacity = 0; gd.textContent = I.label || ''; }
  }
  gpsDraw();
}
function gpsInit() {
  const screen = document.getElementById('screen'); if (!screen || GPS.el) return;
  const el = document.createElement('div'); el.id = 'gps'; el.setAttribute('role', 'button'); el.setAttribute('aria-label', 'GPS : ouvrir la carte');
  el.innerHTML = `<canvas class="gmap" width="112" height="88"></canvas><div class="gi2"><div class="gtop"><span class="gn"></span><span class="gr"></span></div><div class="gg"></div><div class="gnav"><svg class="garr" viewBox="-10 -10 20 20"><path d="M-7 -5 L8 0 L-7 5 L-4 0 Z" fill="currentColor"/></svg><span class="gd"></span></div></div>`;
  screen.insertAdjacentElement('afterend', el);
  GPS.el = el; GPS.cv = el.querySelector('canvas');
  el.addEventListener('click', () => { if (RT.mode === 'overworld' && !RT.busy && typeof atlasScreen === 'function' && G) run(() => atlasScreen()); });
  const loop = () => { gpsUpdate(); setTimeout(() => requestAnimationFrame(loop), 120); };
  loop();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', gpsInit); else gpsInit();
