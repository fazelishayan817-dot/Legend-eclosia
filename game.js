'use strict';
/* ============================================================
   AWAKENING — exploration, menus, scénario, sauvegarde
   ============================================================ */
const SAVE_KEY_BASE = 'awakening-save-1'; // conservée pour ne pas perdre les parties en cours
let SAVE_SLOT = 1;
const saveKey = () => SAVE_SLOT === 1 ? SAVE_KEY_BASE : SAVE_KEY_BASE + '-emplacement' + SAVE_SLOT;
let G = null;
const RT = { mode: 'title', map: null, P: null, npcs: [], busy: 0, frame: 0, bubble: null, layers: null, lastTick: 0, acc: 0 };

function newState(name, rival, look) {
  return {
    v: 1, name, rival, look: look || 'player', money: 3000, badges: new Array(32).fill(false), party: [], box: [], bag: { baume: 1 },
    keys: {}, flags: {}, seen: {}, caught: {}, visited: {}, map: 't0~home', x: 4, y: 3, dir: 'down', surf: false,
    lastCenter: { map: 't0~home', x: 4, y: 4 }, repel: 0, time: 0, opts: { speed: 1, music: true, sfx: true, share: true },
  };
}
function saveGame(silent) {
  try {
    G.map = RT.map.id; G.x = RT.P.x; G.y = RT.P.y; G.dir = RT.P.dir; G.surf = RT.P.surf;
    localStorage.setItem(saveKey(), JSON.stringify(G));
    if (!silent) sfx('save');
    return true;
  } catch (e) { return false; }
}
const OLD_KEY = 'eclosia-v1';
function loadOldRaw() { try { const s = localStorage.getItem(OLD_KEY); return s ? JSON.parse(s) : null; } catch (e) { return null; } }
const BAK = 'awakening-save-bak-';
function listBackups() {
  const out = [];
  try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith(BAK)) { try { out.push({ k, s: JSON.parse(localStorage.getItem(k)), t: +k.slice(BAK.length) }); } catch (e) { } } } } catch (e) { }
  return out.filter(b => b.s && b.s.name).sort((a, b) => b.t - a.t);
}
function backupSave() {
  try {
    const s = localStorage.getItem(saveKey()); if (!s) return;
    const l = listBackups(); if (l[0] && localStorage.getItem(l[0].k) === s) return;
    localStorage.setItem(BAK + Date.now(), s);
    listBackups().slice(5).forEach(b => localStorage.removeItem(b.k));
  } catch (e) { }
}
function loadOldEclosia() { try { if (localStorage.getItem('eclosia-imported')) return null; const s = localStorage.getItem(OLD_KEY); return s ? JSON.parse(s) : null; } catch (e) { return null; } }
const OLD_MAP = { capousse: 'feuillon', capoforet: 'sylvorn', cendrolin: 'brasille', pyrolin: 'fournex', narvalou: 'clapotin', narvaleon: 'marevor', germalis: 'nocturnis' };
function convertOldMon(m) {
  const sp = OLD_MAP[m.s] || m.s; if (!SP[sp]) return null;
  const mon = makeMon(sp, Math.max(2, Math.min(100, m.lv | 0)), { goodIv: true, shiny: false });
  return mon;
}
function importOldEclosia(old) {
  const have = G.party.concat(G.box);
  const dup = m => have.some(h => h.sp === m.sp && h.lvl >= m.lvl) || (G.flags.impSig || []).includes(m.sp + ':' + m.lvl);
  const party = (old.party || []).map(convertOldMon).filter(m => m && !dup(m)), box = (old.box || []).map(convertOldMon).filter(m => m && !dup(m));
  G.flags.impSig = (G.flags.impSig || []).concat(party.concat(box).map(m => m.sp + ':' + m.lvl));
  const nb = Math.min(8, old.petals | 0); let gained = 0;
  for (let i = 0; i < nb; i++) if (!G.badges[i]) { G.badges[i] = true; gained++; }
  G.flags.oldBadges = gained;
  for (const m of party) giveMon(m);
  for (const m of box) { G.seen[m.sp] = 1; G.caught[m.sp] = 1; G.box.push(m); }
  const it = old.items || {};
  if (it.seve) addItem('baume', it.seve); if (it.superseve) addItem('superbaume', it.superseve);
  if (it.capsule) addItem('sphere', it.capsule); if (it.supercapsule) addItem('supersphere', it.supercapsule);
  G.money = Math.max(G.money, old.money | 0);
  const st = OLD_MAP[old.starter] || old.starter;
  if (st && SP[st]) G.flags.starter = st; else if (G.party[0]) G.flags.starter = ['feuillon', 'brasille', 'clapotin'].includes(G.party[0].sp) ? G.party[0].sp : 'feuillon';
  G.keys.codex = 1; G.keys.partage = 1; addItem('sphere', 5);
  G.flags.imported = 1; G.flags.oldPetals = old.petals | 0; if (old.f && old.f.done) G.flags.oldDone = 1;
  try { localStorage.setItem('eclosia-imported', '1'); } catch (e) { }
  return party.concat(box);
}
function loadSave() { try { const s = localStorage.getItem(saveKey()); return s ? JSON.parse(s) : null; } catch (e) { return null; } }

function timeOfDay() {
  const h = new Date().getHours();
  if (h >= 5 && h < 10) return 'morning';
  if (h >= 10 && h < 18) return 'day';
  if (h >= 18 && h < 20) return 'evening';
  return 'night';
}
const TOD_NAME = { morning: 'Matin', day: 'Jour', evening: 'Soir', night: 'Nuit' };
function run(fn) {
  RT.busy++;
  return Promise.resolve().then(fn).catch(e => console.error(e)).finally(() => { RT.busy--; });
}
function mapMusic(m) { SND.night = timeOfDay() === 'night'; return m.music; }
function healAll() { G.party.forEach(healMon); }
function hasType(t) { return G.party.some(m => SP[m.sp].types.includes(t)); }
function canCut() { return G.badges[0] && hasType('flore'); }
function canSurf() { return G.badges[2] && hasType('eau'); }
function canFly() { return G.badges[3] && hasType('vent'); }
function addItem(id, n = 1) { G.bag[id] = (G.bag[id] || 0) + n; }
function giveMon(m) {
  G.seen[m.sp] = 1; G.caught[m.sp] = 1;
  if (G.party.length < 6) { G.party.push(m); return false; }
  G.box.push(m); return true;
}

// ---------- Cartes : chargement et rendu ----------
function buildLayers(map) {
  if (map.big) { map.layers = []; const bc = tileHD(map.border, map.pal, 0, 0); map.pattern = mkCanvas(TS, TS).getContext('2d').createPattern(bc, 'repeat'); try { map.pattern.setTransform(new DOMMatrix([1 / HD, 0, 0, 1 / HD, 0, 0])); } catch (e) { } return; }
  if (map.tilesKey === undefined) {
    for (const k in G.flags) if (k.startsWith('cut:' + map.id + ':')) { const [x, y] = k.split(':')[2].split(',').map(Number); if (map.t[y]) map.t[y][x] = '.'; }
  }
  const hasWater = map.t.some(r => r.includes('~') || r.includes('='));
  const frames = hasWater ? 2 : 1;
  map.layers = [];
  for (let f = 0; f < frames; f++) {
    const c = mkCanvas(map.w * TS * HD, map.h * TS * HD), x = c.getContext('2d');
    x.scale(HD, HD);
    for (let y = 0; y < map.h; y++) for (let xx = 0; xx < map.w; xx++) {
      const ch = map.t[y][xx];
      const v = (hashStr(xx + ',' + y) % 4);
      x.drawImage(tileHD(ch, map.pal, v, f), xx * TS, y * TS, TS, TS);
    }
    if (map.kind !== 'int') softenEdges(x, map, getPal(map.pal));
    decorate(x, map);
    for (const b of map.buildings) { x.fillStyle = 'rgba(20,24,40,.18)'; x.beginPath(); x.roundRect((b.x + b.w) * TS, b.y * TS + 10, 4, b.h * TS - 8, 2); x.fill(); }
    for (const b of map.buildings) drawBuilding(x, b);
    map.layers.push(c);
  }
  map.tilesKey = 1;
  const bc = tileHD(map.border, map.pal, 0, 0);
  map.pattern = mkCanvas(TS, TS).getContext('2d').createPattern(bc, 'repeat');
  try { map.pattern.setTransform(new DOMMatrix([1 / HD, 0, 0, 1 / HD, 0, 0])); } catch (e) { }
}
// Décor : ombres portées, touffes, cailloux, fleurs et lumière douce
function decorate(x, map) {
  const R = rng(hashStr(map.id + ':deco'));
  const P = getPal(map.pal);
  for (let y = 0; y < map.h; y++) for (let xx = 0; xx < map.w; xx++) {
    const ch = map.t[y][xx], px = xx * TS, py = y * TS;
    if (ch === 'T' && y + 1 < map.h && map.t[y + 1][xx] !== 'T') { x.fillStyle = 'rgba(15,25,20,.25)'; x.beginPath(); x.ellipse(px + 9, py + 17, 8, 3.2, 0, 0, 7); x.fill(); }
    if (ch === '.' && map.outdoor !== false && map.kind !== 'int') {
      const r = R();
      if (r < 0.18) { x.fillStyle = dhex(P.g, 0.18); const bx = px + ri(R, 2, 12), by = py + ri(R, 4, 13); x.fillRect(bx, by, 1, 2); x.fillRect(bx + 2, by - 1, 1, 3); x.fillRect(bx + 4, by, 1, 2); x.fillStyle = lhex(P.g, 0.25); x.fillRect(bx + 2, by - 1, 1, 1); }
      else if (r < 0.24) { x.fillStyle = '#8a8478'; const bx = px + ri(R, 3, 12), by = py + ri(R, 3, 12); x.fillRect(bx, by, 2, 1); x.fillStyle = '#b8b2a4'; x.fillRect(bx, by - 1, 1, 1); }
      else if (r < 0.29) { const cs = ['#ff8fb5', '#ffe066', '#ffffff', '#b28cff', '#ff9a5a']; x.fillStyle = cs[ri(R, 0, 4)]; const bx = px + ri(R, 3, 12), by = py + ri(R, 3, 12); x.fillRect(bx, by, 1, 1); x.fillRect(bx - 1, by + 1, 3, 1); x.fillRect(bx, by + 2, 1, 1); x.fillStyle = '#5a8a3a'; x.fillRect(bx, by + 3, 1, 2); }
    }
  }
  if (map.kind !== 'int' && map.kind !== 'cave') {
    const lg = x.createLinearGradient(0, 0, map.w * TS, map.h * TS);
    lg.addColorStop(0, 'rgba(255,240,200,.07)'); lg.addColorStop(1, 'rgba(20,30,60,.07)');
    x.fillStyle = lg; x.fillRect(0, 0, map.w * TS, map.h * TS);
  }
}
let VIGNETTE = null;
function vignette() {
  if (VIGNETTE) return VIGNETTE;
  const c = mkCanvas(240, 160), g = c.getContext('2d'), r = g.createRadialGradient(120, 80, 60, 120, 80, 150);
  r.addColorStop(0, 'rgba(0,0,0,0)'); r.addColorStop(1, 'rgba(10,8,20,.32)'); g.fillStyle = r; g.fillRect(0, 0, 240, 160);
  return (VIGNETTE = c);
}
function visibleNpc(n) {
  if (n.cond && !n.cond()) return false;
  if (n.kind === 'item' && G.flags[n.flag]) return false;
  if (n.trainer && n.trainer.hideAfter && G.flags[n.trainer.flag]) return false;
  return true;
}
function buildNpcs() {
  RT.npcs = RT.map.npcs.map((n, i) => Object.assign({}, n, { src: i, hx: n.x, hy: n.y, px: n.x * TS, py: n.y * TS, mv: null, frame: 0, step: 0 })).filter(visibleNpc);
}
function refreshNpcs() {
  const keep = new Map(RT.npcs.map(n => [n.src, n]));
  const out = [];
  RT.map.npcs.forEach((n, i) => {
    if (!visibleNpc(n)) return;
    out.push(keep.get(i) || Object.assign({}, n, { src: i, hx: n.x, hy: n.y, px: n.x * TS, py: n.y * TS, mv: null, frame: 0, step: 0 }));
  });
  RT.npcs = out;
}
async function enterMap(id, x, y, dir, opts = {}) {
  const prevReg = RT.map ? RT.map.reg : null;
  const prevId = RT.map ? RT.map.id : null;
  const map = getMap(id);
  if (!map.layers) buildLayers(map);
  RT.map = map;
  RT.P = { x, y, px: x * TS, py: y * TS, dir: dir || 'down', moving: false, prog: 0, step: 0, turn: 0, surf: !!opts.surf };
  buildNpcs();
  if (map.kind === 'town') { G.visited[id] = 1; }
  playMusic(mapMusic(map));
  if (prevId !== id && typeof onEnterStory === 'function' && MAP_EVENTS[id]) setTimeout(() => { if (!RT.busy && RT.map === map) run(() => onEnterStory(id)); else if (RT.map === map) { const t = setInterval(() => { if (RT.map !== map) return clearInterval(t); if (!RT.busy) { clearInterval(t); run(() => onEnterStory(id)); } }, 200); } }, 300);
  if (map.kind !== 'int' && (prevId !== id) && !opts.quiet) showLocation(map.name + (prevReg && prevReg !== map.reg && REGIONS[map.reg].name !== map.name && REGIONS[map.reg].chain.length > 1 ? ' · ' + REGIONS[map.reg].name : ''));
  if (prevId && prevId.endsWith('~league') && id !== prevId) for (const k of ['elite1', 'elite2', 'elite3', 'elite4', 'champion']) delete G.flags['st_' + k];
}
async function warp(id, x, y, dir, opts = {}) {
  sfx('door');
  await fade(true, 180);
  await enterMap(id, x, y, dir, opts);
  await fade(false, 180);
}
function npcAt(x, y) { return RT.npcs.find(n => (n.x === x && n.y === y) || (n.mv && n.mv.tx === x && n.mv.ty === y)); }
function tileAt(x, y) { const m = RT.map; if (x < 0 || y < 0 || x >= m.w || y >= m.h) return m.border; return m.t[y][x]; }
function blockedFor(x, y, who) {
  const t = tileAt(x, y);
  if (x < 0 || y < 0 || x >= RT.map.w || y >= RT.map.h) return true;
  if (SOLID.has(t)) return true;
  if (t === '~') { if (who !== 'player' || !RT.P.surf) return true; }
  else if (who === 'player' && RT.P.surf && t !== '=' && t !== 's' && t !== ',' && t !== '.' && t !== 'f' && t !== '"' && t !== 'q') return true;
  if (npcAt(x, y)) return true;
  if (who !== 'player' && ((RT.P.x === x && RT.P.y === y) || (RT.P.moving && RT.P.tx === x && RT.P.ty === y))) return true;
  return false;
}

// ---------- Déplacements ----------
function npcStep(n, dir) {
  return new Promise(res => {
    n.dir = dir;
    const [dx, dy] = DXY[dir];
    const tx = n.x + dx, ty = n.y + dy;
    if (blockedFor(tx, ty, 'npc')) { res(false); return; }
    n.mv = { tx, ty, prog: 0, res };
  });
}
function updateNpcs() {
  for (const n of RT.npcs) {
    if (n.mv) {
      n.mv.prog += 2;
      const [dx, dy] = DXY[n.dir];
      n.px = n.x * TS + dx * n.mv.prog; n.py = n.y * TS + dy * n.mv.prog;
      n.frame = n.mv.prog >= 4 && n.mv.prog < 12 ? (n.step ? 1 : 2) : 0;
      if (n.mv.prog >= 16) { n.x = n.mv.tx; n.y = n.mv.ty; n.px = n.x * TS; n.py = n.y * TS; const r = n.mv.res; n.mv = null; n.step ^= 1; n.frame = 0; r(true); }
    } else if (n.wander && !RT.busy && !UI.stack.length && Math.random() < 0.008) {
      const d = pick(Math.random, ['up', 'down', 'left', 'right']);
      const [dx, dy] = DXY[d];
      if (Math.abs(n.x + dx - n.hx) <= n.wander && Math.abs(n.y + dy - n.hy) <= n.wander) npcStep(n, d);
      else n.dir = d;
    }
  }
}
function owTick() {
  updateNpcs();
  const P = RT.P;
  if (!P) return;
  if (P.moving) {
    const sp = P.surf ? 3 : P.bike ? 6 : ((!!Input.held.b !== !!(G && G.opts && G.opts.autoRun)) ? 4 : 2);
    const p0 = P.prog; P.prog = Math.min(16, P.prog + sp); P.dist = (P.dist || 0) + (P.prog - p0);
    const [dx, dy] = DXY[P.dir];
    P.px = P.x * TS + dx * P.prog; P.py = P.y * TS + dy * P.prog;
    if (P.prog >= 16) {
      P.x = P.tx; P.y = P.ty; P.px = P.x * TS; P.py = P.y * TS; P.moving = false; P.step ^= 1;
      onArrive();
    }
    return;
  }
  if (RT.busy || UI.stack.length || RT.mode !== 'overworld') return;
  const d = heldDir();
  if (!d) { P.turn = 0; return; }
  if (P.dir !== d) { P.dir = d; P.turn = 5; return; }
  if (P.turn > 0) { P.turn--; return; }
  tryStep(d);
}
function tryStep(d) {
  const P = RT.P, m = RT.map;
  const [dx, dy] = DXY[d];
  const tx = P.x + dx, ty = P.y + dy;
  // sortie de carte
  if (tx < 0 || ty < 0 || tx >= m.w || ty >= m.h) {
    const side = tx < 0 ? 'w' : tx >= m.w ? 'e' : ty < 0 ? 'n' : 's';
    const g = m.gates[side];
    const along = side === 'n' || side === 's' ? P.x : P.y;
    if (g && along >= g.p && along <= g.p + 1) { run(() => gateExit(side, along - g.p)); return; }
    bump(); return;
  }
  for (const gd of m.guards) {
    if (gd.cells.some(([x, y]) => x === tx && y === ty) && !gd.cond()) { run(async () => { await say(gd.text); }); return; }
  }
  if (blockedFor(tx, ty, 'player')) {
    const t = tileAt(tx, ty);
    if (P.surf && !npcAt(tx, ty) && !SOLID.has(t) && t !== '~') { /* débarquer */ }
    else { bump(); return; }
  }
  if (P.surf && tileAt(tx, ty) !== '~' && tileAt(tx, ty) !== '=') P.surf = false;
  P.tx = tx; P.ty = ty; P.moving = true; P.prog = 0;
}
let bumpT = 0;
function bump() { if (RT.frame - bumpT > 20) { sfx('bump'); bumpT = RT.frame; } }
async function gateExit(side, k) {
  const g = RT.map.gates[side];
  const M2 = getMap(g.to);
  const g2 = M2.gates[OPP[side]];
  let x, y;
  if (side === 'n') { x = g2.p + k; y = M2.h - 1; }
  else if (side === 's') { x = g2.p + k; y = 0; }
  else if (side === 'e') { x = 0; y = g2.p + k; }
  else { x = M2.w - 1; y = g2.p + k; }
  await fade(true, 150);
  await enterMap(g.to, x, y, SIDE_DIR[side]);
  await fade(false, 150);
}
function onArrive() {
  const P = RT.P, m = RT.map;
  const w = m.warps.find(w => w.x === P.x && w.y === P.y);
  if (w) {
    run(async () => {
      if (w.enter) { const e = interiorEntry(w.to); await warp(w.to, e[0], e[1], 'up'); }
      else await warp(w.to, w.tx, w.ty, w.dir);
    });
    return;
  }
  for (const lt of (m.lineTriggers || [])) {
    if ((lt.y != null && P.y === lt.y) || (lt.x != null && P.x === lt.x)) {
      const n = RT.npcs.find(nn => nn.src === lt.npc);
      if (n && n.trainer && !G.flags[n.trainer.flag]) { run(() => trainerBattle(n, true)); return; }
    }
  }
  for (const n of RT.npcs) {
    if (!n.trainer || G.flags[n.trainer.flag] || !n.trainer.sight) continue;
    const [dx, dy] = DXY[n.dir];
    for (let s = 1; s <= n.trainer.sight; s++) {
      const cx = n.x + dx * s, cy = n.y + dy * s;
      if (cx === P.x && cy === P.y) { run(() => trainerBattle(n, true)); return; }
      if (SOLID.has(tileAt(cx, cy)) || npcAt(cx, cy)) break;
    }
  }
  if (G.repel > 0) { G.repel--; if (G.repel === 0) { run(() => say("L'effet de la Repousse est terminé.")); return; } }
  const t = tileAt(P.x, P.y);
  let table = null, rate = 0;
  const EN = m.encAt ? m.encAt(P.x, P.y) : m.enc;
  if (t === '"' && EN.grass) { table = EN.grass; rate = 1 / 9; }
  else if (P.surf && t === '~' && EN.water) { table = EN.water; rate = 1 / 12; }
  else if (m.kind === 'cave' && t === 'm' && m.enc.cave) { table = m.enc.cave; rate = 1 / 13; }
  if (table && Math.random() < rate) {
    const tod = timeOfDay();
    const pool = table.filter(e => !e[4] || (e[4] === 'n' ? tod === 'night' : tod !== 'night'));
    const tot = pool.reduce((a, e) => a + (e[3] || 20), 0);
    let r = Math.random() * tot, e = pool[0];
    for (const p of pool) { r -= (p[3] || 20); if (r <= 0) { e = p; break; } }
    const lvl = rnd(e[1], e[2]);
    const lead = G.party.find(mm => mm.hp > 0);
    if (G.repel > 0 && lead && lvl < lead.lvl) return;
    run(() => wildBattle(e[0], lvl));
  }
}
function envHere() {
  const m = RT.map;
  if (m.env) return m.env;
  if (m.kind === 'cave') return 'cave';
  if (RT.P.surf) return 'water';
  if (m.pal === 'neige') return 'snow';
  return 'grass';
}
async function wildBattle(sp, lvl) {
  const foe = makeMon(sp, lvl);
  const res = await runBattle({ kind: 'wild', foes: [foe], env: envHere() });
  if (res === 'lose') await whiteout();
}
async function whiteout() {
  await fade(true, 400);
  for (const k of ['elite1', 'elite2', 'elite3', 'elite4', 'champion']) delete G.flags['st_' + k];
  healAll();
  const c = G.lastCenter;
  await enterMap(c.map, c.x, c.y, 'down', { quiet: true });
  await fade(false, 400);
  await say(c.map.endsWith('home') ? "Tu te réveilles à la maison. Tes créatures se sont bien reposées." : "Tu te réveilles au Centre de Soin. Tes créatures ont été soignées.");
}

// ---------- Rendu ----------
function drawOverworld(x) {
  const m = RT.map, P = RT.P;
  const camX = Math.round(P.px - 112), camY = Math.round(P.py - 72);
  if (m.kind === 'int') { x.fillStyle = '#0c0d12'; x.fillRect(0, 0, 240, 160); }
  else { x.save(); x.translate(-camX, -camY); x.fillStyle = m.pattern; x.fillRect(camX, camY, 240, 160); x.restore(); }
  if (m.big) drawBig(x, m, camX, camY);
  else { const layer = m.layers[m.layers.length > 1 ? (Math.floor(RT.frame / 30) % 2) : 0]; x.drawImage(layer, -camX, -camY, m.w * TS, m.h * TS); }
  const ents = RT.npcs.slice().map(n => ({ n, y: n.py })); ents.push({ n: null, y: P.py });
  ents.sort((a, b) => a.y - b.y);
  for (const e of ents) {
    if (!e.n) {
      const fr = P.moving && P.prog >= 4 && P.prog < 12 ? (P.step ? 1 : 2) : 0;
      const sx = P.px - camX, sy = P.py - camY - 4;
      if (P.surf) { x.fillStyle = '#2a6aa8'; x.beginPath(); x.ellipse(sx + 8, sy + 14, 9, 5, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8ac8f2'; x.fillRect(sx + 1, sy + 12, 14, 2); }
      if (P.bike && !P.surf && typeof heroBike === 'function' && heroBike(P.dir, RT.frame)) { const bk = heroBike(P.dir, P.moving ? RT.frame : 0); x.drawImage(bk, sx - 5, sy - 7, 26, 26); }
      else if (!P.surf && typeof drawPlayerWalk === 'function') drawPlayerWalk(x, P, sx, sy, camX, camY);
      else x.drawImage(personSprite(PALS[G.look] || PALS.player, P.dir, P.surf ? 0 : fr), sx, sy, 16, 16);
      if (!P.surf && tileAt(P.x, P.y) === '"' && !P.moving) x.drawImage(tileHD('"', m.pal, 0, 0), 0, 20, 32, 12, sx, P.py - camY + 10, 16, 6);
      continue;
    }
    const n = e.n;
    const sx = n.px - camX, sy = n.py - camY;
    if (sx < -48 || sy < -48 || sx > 260 || sy > 180) continue;
    if (n.kind === 'item') { drawSphere(x, sx + 8, sy + 9, 4); continue; }
    if (n.kind === 'ball') { drawSphere(x, sx + 8, sy + 6, 4); continue; }
    if (n.kind === 'legend') {
      if (typeof drawLegendLive === 'function' && drawLegendLive(x, n, sx, sy)) continue;
      const img = monSprite(LEGENDS[n.legend].sp, false);
      const bob = Math.sin(RT.frame / 20) * 2;
      x.globalAlpha = 0.9; x.drawImage(img, sx - 12, sy - 24 + bob, 40, 40); x.globalAlpha = 1;
      continue;
    }
    if (n.kind === 'lore') { drawLoreObj(x, n, sx, sy); continue; }
    if (n.draw) { n.draw(x, sx, sy); continue; }
    if (!(typeof drawNpcLive === 'function' && drawNpcLive(x, n, sx, sy))) x.drawImage(personSprite(n.pal || NPC_PALS[0], n.dir, n.frame), sx, sy - 4, 16, 16);
    if (n.sleep != null) drawSleep(x, n, sx, sy);
  }
  if (RT.bubble) {
    const n = RT.bubble.npc; const sx = n.px - camX, sy = n.py - camY - 18;
    x.fillStyle = '#ffffff'; x.fillRect(sx + 3, sy, 10, 11); x.strokeStyle = '#22202a'; x.strokeRect(sx + 3.5, sy + 0.5, 9, 10);
    x.fillStyle = '#d84a3a'; x.fillRect(sx + 7, sy + 2, 2, 5); x.fillRect(sx + 7, sy + 8, 2, 1);
  }
  if (m.outdoor && !m.env) {
    const tod = timeOfDay();
    const tint = { morning: 'rgba(255,214,170,0.12)', day: null, evening: 'rgba(255,140,80,0.22)', night: 'rgba(30,40,110,0.42)' }[tod];
    if (tint) { x.fillStyle = tint; x.fillRect(0, 0, 240, 160); }
  }
  x.drawImage(vignette(), 0, 0);
}
function drawTitle(x) {
  const t = RT.frame / 60, f = RT.frame;
  // coucher de soleil derrière le phénix
  const g = x.createLinearGradient(0, 0, 0, 160);
  g.addColorStop(0, '#0d0a24'); g.addColorStop(0.35, '#3a1f52'); g.addColorStop(0.58, '#b0485a'); g.addColorStop(0.74, '#f08a4a'); g.addColorStop(1, '#ffc070');
  x.fillStyle = g; x.fillRect(0, 0, 240, 160);
  const r = rng(3); for (let i = 0; i < 40; i++) { const sx = r() * 240, sy = r() * 44; if ((i + Math.floor(t * 2)) % 9) { x.fillStyle = `rgba(255,255,255,${0.75 - sy / 70})`; x.fillRect(sx, sy, 1, 1); } }
  const gl = (gx, gy, rr, c) => { const q = x.createRadialGradient(gx, gy, 2, gx, gy, rr); q.addColorStop(0, c); q.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = q; x.fillRect(gx - rr, gy - rr, rr * 2, rr * 2); };
  // aura des légendaires : halo qui respire autour de la silhouette + étincelles qui montent
  const aura = (im, dx, dy, w, h, col, ph) => {
    const b = 0.5 + 0.5 * Math.sin(t * 1.8 + ph);
    x.save(); x.shadowColor = `rgba(${col},${0.8 + 0.2 * b})`;
    for (const bl of [26 + 14 * b, 14 + 6 * b, 6]) { x.shadowBlur = bl * (x.getTransform().a || 1); x.drawImage(im, dx, dy, w, h); }
    x.restore();
    for (let i = 0; i < 7; i++) { const life = (t * 0.35 + i / 7 + ph) % 1, px = dx + w * (0.2 + 0.6 * ((i * 0.618 + ph) % 1)) + Math.sin(t * 2 + i) * 3, py = dy + h * 0.85 - life * h * 0.9;
      x.fillStyle = `rgba(${col},${(1 - life) * 0.8})`; x.fillRect(px, py, 1.2, 1.2); }
  };
  const SX = 120, SY = 128;
  gl(SX, SY, 120, 'rgba(255,170,90,.55)'); gl(SX, SY, 55, 'rgba(255,220,140,.7)');
  const sd = x.createLinearGradient(0, SY - 36, 0, SY + 10); sd.addColorStop(0, '#fff3c0'); sd.addColorStop(1, '#ff8a3a');
  x.fillStyle = sd; x.beginPath(); x.arc(SX, SY, 36, 0, 7); x.fill();
  x.fillStyle = 'rgba(176,72,90,.35)'; for (let k = 0; k < 3; k++) x.fillRect(SX - 38, SY - 6 + k * 6, 76, 1 + k);
  x.fillStyle = 'rgba(60,24,60,.55)'; for (let i = 0; i < 4; i++) { x.beginPath(); x.ellipse((i * 71 + t * 6) % 320 - 40, 70 + (i % 2) * 14, 38, 4, 0, 0, 7); x.fill(); }
  // le phénix plane haut au-dessus du combat, plus grand que les deux autres
  const PY = 55 + Math.sin(t * 1.3) * 2.5; gl(120, PY + 36, 56, 'rgba(255,200,120,.35)');
  aura(bigMon('auberis', 74), 83, PY, 74, 74, '205,140,255', 0);
  // combat inachevé : l'océan vient battre la rive de la terre
  for (let k = 0; k < 3; k++) { x.fillStyle = k === 0 ? '#2a3a7a' : k % 2 ? '#0e2350' : '#173a6a'; x.beginPath(); x.moveTo(60, 165); for (let xx = 60; xx <= 245; xx += 5) x.lineTo(xx, 132 + k * 8 + Math.sin(xx / 14 + t * (2 + k)) * 3); x.lineTo(245, 165); x.fill(); }
  // reflet du soleil sur l'eau
  for (let k = 0; k < 7; k++) { const w = 26 - k * 3 + Math.sin(t * 3 + k) * 3, y = 136 + k * 4; x.fillStyle = `rgba(255,${160 + k * 6},80,${0.85 - k * 0.09})`; x.fillRect(SX - w / 2 + Math.sin(t * 2 + k * 1.7) * 2, y, w, 2); }
  x.fillStyle = '#2a1e16'; x.beginPath(); x.moveTo(-5, 165); x.lineTo(-5, 128); x.lineTo(66, 133); x.lineTo(88, 139); x.lineTo(100, 165); x.fill();
  x.strokeStyle = 'rgba(220,235,255,.55)'; x.lineWidth = 1.5; x.beginPath(); for (let k = 0; k < 3; k++) { const yy = 140 + k * 8, xx = 88 + (yy - 139) * 12 / 26 + Math.sin(t * 2.4 + k) * 2; x.moveTo(xx, yy); x.lineTo(xx + 7, yy + 1); } x.stroke();
  gl(24, 128, 28, 'rgba(150,255,120,.35)'); gl(216, 132, 28, 'rgba(90,190,255,.35)');
  aura(bigMon('nocturnis', 50), -2, 102 + Math.cos(t * 1.1) * 2, 50, 50, '150,255,140', 2.1);
  x.save(); x.translate(242, 0); x.scale(-1, 1); aura(bigMon('aquoree', 50), 8, 102 + Math.sin(t * 1.2) * 2, 50, 50, '90,170,255', 4.2); x.restore();
  if ((f % 90) < 40) { x.strokeStyle = 'rgba(150,255,120,.35)'; x.lineWidth = 2; x.beginPath(); x.moveTo(44, 126); x.lineTo(120, 130); x.stroke(); x.strokeStyle = 'rgba(90,190,255,.35)'; x.beginPath(); x.moveTo(196, 128); x.lineTo(120, 130); x.stroke(); }
}

// ---------- Interactions ----------
function facing() { const [dx, dy] = DXY[RT.P.dir]; return [RT.P.x + dx, RT.P.y + dy]; }
async function interact() {
  const [fx, fy] = facing();
  let n = RT.npcs.find(nn => nn.x === fx && nn.y === fy && !nn.mv);
  const t = tileAt(fx, fy);
  if (!n && t === 'c') { const [dx, dy] = DXY[RT.P.dir]; n = RT.npcs.find(nn => nn.x === fx + dx && nn.y === fy + dy); }
  if (n) return talk(n);
  if (t === 'S') { const s = RT.map.signs[fx + ',' + fy]; if (s) return say(s); return; }
  if (t === 'C') return pcScreen();
  if (t === 'B') return say(pick(Math.random, ["Des livres sur les créatures. « Le Zénith et la Graine », par le Prof. Sauge.", "Un vieux livre : « La nuit de la Germination : témoignages ». Tu le refermes doucement.", "Un manuel de combat. Les types se répondent comme un cercle."]));
  if (t === '~' && !RT.P.surf) {
    if (!canSurf()) return say(G.badges[2] ? "L'eau est calme. Une créature de type Eau pourrait te porter." : "L'eau est profonde et calme.");
    const r = await ask("L'eau est calme. Veux-tu nager ?");
    if (r === 0) { sfx('surf'); RT.P.surf = true; RT.P.bike = false; const P = RT.P; P.tx = fx; P.ty = fy; P.moving = true; P.prog = 0; }
    return;
  }
  if (t === 'b') {
    if (!canCut()) return say(G.badges[0] ? "Un arbuste épais. Une créature de type Flore pourrait le couper." : "Un arbuste épais bloque le passage.");
    const r = await ask("Cet arbuste peut être coupé. Le couper ?");
    if (r === 0) {
      sfx('cut'); RT.map.t[fy][fx] = '.'; G.flags['cut:' + RT.map.id + ':' + fx + ',' + fy] = 1; buildLayers(RT.map);
    }
  }
}
async function talk(n) {
  if (n.kind === 'item') {
    G.flags[n.flag] = 1; addItem(n.item); sfx('item');
    refreshNpcs();
    return say(`Tu trouves : ${ITEMS[n.item].n} !`);
  }
  if (n.kind === 'legend') return legendEvent(n);
  if (n.kind === 'lore') return talkLore(n);
  if (n.kind !== 'ball') {
    const opp = { up: 'down', down: 'up', left: 'right', right: 'left' }[RT.P.dir];
    n.dir = opp;
  }
  if (n.trainer && !G.flags[n.trainer.flag]) return trainerBattle(n, false);
  if (n.script) return SCRIPTS[n.script](n);
  if (n.trainer) return say(fmt(n.trainer.after || n.trainer.lose), { speaker: trLabel(n.trainer) });
  if (n.text) return say(typeof n.text === 'function' ? n.text() : n.text, n.speaker ? { speaker: n.speaker } : undefined);
}
function trLabel(t) {
  if (t.cls === 'rival') return G.rival;
  if (t.cls === 'leader') return t.name;
  return (TCLS[t.cls].n ? TCLS[t.cls].n + ' ' : '') + fmt(t.name);
}
async function approach(n) {
  for (let i = 0; i < 40; i++) {
    const dx = RT.P.x - n.x, dy = RT.P.y - n.y;
    if (Math.abs(dx) + Math.abs(dy) <= 1) break;
    const prim = Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
    const sec = Math.abs(dx) >= Math.abs(dy) ? (dy > 0 ? 'down' : dy < 0 ? 'up' : null) : (dx > 0 ? 'right' : dx < 0 ? 'left' : null);
    let ok = await npcStep(n, prim);
    if (!ok && sec) ok = await npcStep(n, sec);
    if (!ok) break;
  }
  const dx = RT.P.x - n.x, dy = RT.P.y - n.y;
  n.dir = Math.abs(dx) >= Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
  RT.P.dir = { up: 'down', down: 'up', left: 'right', right: 'left' }[n.dir];
}
function buildTeam(tr) {
  const strong = ['leader', 'elite', 'champion', 'ancien', 'boss', 'admin', 'rival', 'commandant', 'maitre', 'veteran'].includes(tr.cls);
  return tr.team.map(([sp, l]) => {
    const s = sp === '$S' ? evolveForLevel(RIVAL_COUNTER[G.flags.starter] || 'brasille', l) : sp;
    return makeMon(s, l, { shiny: false, goodIv: strong });
  });
}
async function trainerBattle(n, spotted) {
  const tr = n.trainer;
  if (spotted) {
    RT.bubble = { npc: n }; sfx('exclaim');
    await wait(650); RT.bubble = null;
    await approach(n);
  }
  const mus = tr.music || (['somnis', 'admin', 'racine', 'commandant'].includes(tr.cls) ? 'somnis' : 'trainer');
  playMusic(mus);
  if (n.story && STORY_PRE[n.story]) await STORY_PRE[n.story]();
  await say(fmt(tr.intro), { speaker: trLabel(tr) });
  const res = await runBattle({ kind: 'trainer', foes: buildTeam(tr), trainer: Object.assign({ pal: n.pal, sprKey: typeof npcKey === 'function' ? npcKey(n) : null }, tr), env: envHere(), music: mus, noLoss: tr.noLoss });
  if (res === 'lose' && !tr.noLoss) { await whiteout(); return 'lose'; }
  if (res === 'lose') healAll();
  G.flags[tr.flag] = 1;
  await postTrainer(n, tr);
  return 'win';
}
async function postTrainer(n, tr) {
  if (tr.leader != null) {
    const gym = GYMS[tr.leader];
    G.badges[tr.leader] = true;
    sfx('badge'); await wait(200);
    await say(`Tu reçois le ${gym.badge} de la part de ${gym.leader} !`);
    if (gym.field) await say(gym.field);
    if (gym.petal) await petalScene(gym);
    if (giveCrystal(gym.type)) await say(`Le Bracelet d'Éclat vibre : tu obtiens l'Éclat ${TN[gym.type]} !`);
    if (tr.leader === 7) await say("Aldric : Tu as les huit badges des Quatre Terres. Avec ceux des Terres voisines, la Tour du Zénith t'ouvrira ses portes.", { speaker: 'Aldric' });
  }
  if (n.story === 'champion') return championEnding();
  if (n.story && STORY_POST[n.story]) await STORY_POST[n.story]();
  if (n.story === 'elio') { await say("Elio s'écarte lentement. Le ciel au-dessus de l'autel se fend en deux : moitié jour, moitié nuit."); refreshNpcs(); }
  if (tr.after && !tr.hideAfter) await say(fmt(tr.after), { speaker: trLabel(tr) });
  else if (tr.after && tr.cls === 'rival') await say(fmt(tr.after), { speaker: trLabel(tr) });
  if (tr.hideAfter) {
    await fade(true, 150);
    refreshNpcs();
    await fade(false, 150);
  }
  if (RT.map) playMusic(mapMusic(RT.map));
}
async function legendEvent(n) {
  const L = LEGENDS[n.legend];
  sfx('exclaim');
  await legendPre(n.legend);
  await say(L.text);
  const res = await runBattle({ kind: 'wild', foes: [makeMon(L.sp, L.lvl, { goodIv: true, shiny: false })], legend: n.legend, env: 'sacred', music: 'boss' });
  if (res === 'lose') { await whiteout(); return; }
  if (res === 'caught') { refreshNpcs(); }
  else if (res === 'win') await say("Le gardien se dissout dans la lumière... Il reviendra peut-être, si tu reviens le voir.");
  else await say("Le gardien te regarde partir. Il t'attendra.");
  if (n.legend === 'nocturnis' && (res === 'caught' || res === 'win')) await romance();
  if (n.legend === 'echo' && (res === 'caught' || res === 'win') && !G.flags.avantDone) await avantFinale();
  if (n.legend === 'eveillon' && !G.flags.ending) await finalEnding();
}
async function championEnding() {
  playMusic('title');
  await say("Astra : C'est fini. Par la présente, tu deviens Champion·ne des Quatre Terres.", { speaker: 'Astra' });
  await hallOfFame("Ligue des Quatre Terres");
  G.flags.champion1 = 1;
  await say("Astra : Le Prof. Sauge m'a confié ceci pour toi. Éclosia, au-delà de la mer, garde la Graine-Monde. Et l'Ordre Racine y prépare quelque chose.", { speaker: 'Astra' });
  await say("Astra : Une jeune femme aux cheveux bleus attend déjà au port de Port-Corail. Elle a dit que tu saurais.", { speaker: 'Astra' });
  G.keys.ticket = 1; sfx('item');
  await say("Tu reçois le Billet Éclosia ! Le ferry de Port-Corail peut maintenant t'emmener à Éclosia.");
  healAll();
  const town = getMap('t9');
  const c = town.buildings.find(b => b.kind === 'center');
  G.lastCenter = { map: 't9~center', x: 5, y: 3 };
  await warp('t9', c.door[0], c.door[1] + 1, 'down');
  saveGame(true);
}
async function finalEnding() {
  G.flags.ending = 1;
  playMusic('title');
  await fade(true, 600);
  const fin = G.flags.couple ? "Nova t'attendait en bas du sentier. Vous avez repris ensemble, main dans la main, le chemin de Graineval." : G.flags.friend ? "Nova t'attendait en bas du sentier. « Revanche ? » a-t-elle demandé. Évidemment." : "Nova t'attendait en bas du sentier. Elle n'a rien dit. Elle a juste souri.";
  const lines = [
    "Le jour et la nuit se rejoignent au sommet du Mont Éveil.",
    "Zénithar veille sur les Quatre Terres. Germalis dort dans la Graine. Et entre les deux, chaque jour, le monde s'éveille.",
    `${G.name} a traversé les Quatre Terres et Éclosia, réuni ${G.badges.filter(Boolean).length} badges et rencontré les trois gardiens.`,
    fin,
    "Ilan aide les Gardiens à rebâtir ce que l'Ordre Racine a brisé. Maître Ronce, dit-on, plante chaque matin un arbre sur la côte de Nacre.",
    "Merci d'avoir joué à Éclosia.",
    "Le monde reste ouvert : complète le Codex, affronte de nouveau la Ligue, explore la nuit.",
  ];
  await fade(false, 600);
  for (const l of lines) await say(l);
  await postEnding();
  saveGame(true);
}
async function hallOfFame(title) {
  const p = el('panel hof', 0, 0, 240, 160);
  p.innerHTML = `<h2>${esc(title)}</h2><p>Temple de la Renommée</p><div class="hofg">${G.party.map(m => `<div><img src="${monURL(m.sp, m.shiny)}" alt=""><span>${esc(monName(m))}</span><small>N.${m.lvl}</small></div>`).join('')}</div><p class="hint">${esc(G.name)} · ${fmtTime(G.time)}</p>`;
  sfx('badge');
  await wait(600);
  await waitKey();
  p.remove();
}
function fmtTime(s) { const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60; return `${h} h ${String(m).padStart(2, '0')}`; }

// ---------- Scripts ----------
const SCRIPTS = {
  async nurse() {
    const nurse = RT.map && RT.map.reg === 'brumaire' ? 'Infirmière Lila' : 'Infirmière';
    const r = await ask(nurse === 'Infirmière Lila' ? "Bienvenue au Sève-Centre ! Je soigne tes Éclos avec la sève de la Graine-Monde ?" : "Bienvenue au Centre de Soin ! Je soigne tes créatures ?", ['Oui', 'Non'], { speaker: nurse });
    if (r !== 0) return say("À bientôt !");
    await say("Je m'occupe d'elles. Un instant...", { speaker: 'Infirmière', auto: 700 });
    healAll(); sfx('heal'); await wait(900);
    G.lastCenter = { map: RT.map.id, x: 5, y: 3 };
    const ok = saveGame(true);
    await say(`Tes créatures sont en pleine forme ! ${ok ? '(Partie sauvegardée.)' : ''} À bientôt !`, { speaker: 'Infirmière' });
  },
  async shop() {
    while (true) {
      const r = await ask("Bienvenue ! Que puis-je faire pour toi ?", ['Acheter', 'Vendre', 'Quitter'], { speaker: 'Vendeur', w: 60 });
      if (r === 0) await shopBuy();
      else if (r === 1) await shopSell();
      else return say("Merci, et à bientôt !");
    }
  },
  async mom() {
    if (!G.flags.starter) return say("Le Prof. Sauge te cherchait ! Son labo est juste en face. Et Nova est passée deux fois ce matin.", { speaker: 'Maman' });
    healAll(); sfx('heal');
    G.lastCenter = { map: 't0~home', x: 4, y: 4 };
    return say(pick(Math.random, ["Tu as l'air fatigué. Repose-toi un peu. Voilà, tes créatures sont en forme !", "Je suis fière de toi. Tiens, tes créatures sont soignées.", "Cinq ans loin d'ici, et te revoilà déjà sur les routes. Repose-toi un peu."]), { speaker: 'Maman' });
  },
  async prof() {
    if (!G.flags.starter) {
      if (!G.flags.metProf) {
        G.flags.metProf = 1;
        await say(["Ah, te voilà ! J'ai trois créatures qui attendent un dresseur.", "Elles sont dans ces Sphères, sur la table. Des Éclos d'Éclosia : Capousse, de type Flore. Cendrolin, de type Feu. Narvalou, de type Eau.", "Approche-toi de la table et choisis celle qui te ressemble."], { speaker: 'Prof. Sauge' });
      } else await say("Choisis une des trois Sphères sur la table.", { speaker: 'Prof. Sauge' });
      return;
    }
    if (G.flags.champion1 && !G.flags.sauge1) {
      G.flags.sauge1 = 1;
      await story([
        FACE('Prof. Sauge', "Champion·ne... Avant que tu partes pour Éclosia, je te dois une vérité. Assieds-toi."),
        FACE('Prof. Sauge', "Il y a vingt ans, nous étions trois chercheurs : Lierre, moi, et un botaniste de l'île de Nacre. Aurèle. Le plus doux de nous trois."),
        FACE('Prof. Sauge', "La nuit de la Germination, il a perdu sa femme et son fils. Le lendemain, il a cessé de s'appeler Aurèle. Là-bas, on l'appelle Maître Ronce."),
        FACE('Prof. Sauge', "Je n'ai pas su le retenir. Toi, tu le croiseras. Ne le hais pas trop vite. Et ramène Nova en vie."),
      ]);
      return;
    }
    if (G.flags.avantDone && !G.flags.sauge2) {
      G.flags.sauge2 = 1;
      await story([
        FACE('Prof. Sauge', "Nova m'a tout raconté. La plage. La silhouette. ... C'était toi."),
        FACE('Prof. Sauge', "Dix ans que je me demande qui m'a tendu cette enfant. Et c'était l'enfant que j'avais vu grandir dans la maison d'en face."),
        FACE('Prof. Sauge', "Le temps est une drôle de bête. Merci. Pour elle. Pour moi."),
      ]);
      return;
    }
    const seen = Object.keys(G.seen).length, caught = Object.keys(G.caught).length;
    await say(`Voyons ton Codex... ${seen} créatures vues, ${caught} capturées sur ${DEX.length}.`, { speaker: 'Prof. Sauge' });
    await say(caught < 10 ? "C'est un bon début ! Les hautes herbes, l'eau et les grottes abritent des créatures différentes." : caught < 40 ? "Tu progresses bien ! N'oublie pas d'explorer la nuit." : caught < 80 ? "Impressionnant ! Il en reste encore quelques-unes, bien cachées." : "Tu as presque tout vu... Il ne te reste que les gardiens, peut-être ?", { speaker: 'Prof. Sauge' });
  },
  async starter(n) {
    const sp = n.data;
    const prev = el('panel preview', 70, 10, 100, 90);
    prev.innerHTML = `<img src="${monURL(sp)}" alt=""><div>${esc(SP[sp].n)}</div><div>${SP[sp].types.map(typePill).join('')}</div>`;
    const r = await ask(`${SP[sp].n}, de type ${SP[sp].types.map(t => TN[t]).join('/')}. Tu le choisis ?`);
    prev.remove();
    if (r !== 0) return;
    const m = makeMon(sp, 5, { goodIv: true, shiny: false });
    giveMon(m); G.flags.starter = sp; sfx('item');
    await say(`Tu reçois ${SP[sp].n} !`);
    G.flags.rivalPick = 1;
    refreshNpcs();
    const rv = RIVAL_COUNTER[sp];
    await say(`Moi, je prends ${SP[rv].n} ! Il est fort contre le tien, désolée !`, { speaker: G.rival });
    const rn = RT.npcs.find(nn => nn.pal === PALS.rival);
    if (rn) await approach(rn);
    const tr = Object.assign({ flag: 'st_rival1' }, STORY_TRAINERS.rival1);
    await say(fmt(tr.intro), { speaker: G.rival });
    const res = await runBattle({ kind: 'trainer', foes: buildTeam(tr), trainer: Object.assign({ pal: PALS.rival }, tr), env: 'indoor', music: 'trainer', noLoss: true });
    healAll();
    G.flags.st_rival1 = 1;
    await say(res === 'win' ? "Bon. Tu n'as pas perdu la main. Ça fait plaisir de te revoir, tu sais." : "Ha ! Cinq ans d'absence, ça se paie. Content... contente de te revoir, quand même.", { speaker: G.rival });
    await fade(true, 200); refreshNpcs(); await fade(false, 200);
    await say(["Excellent combat ! Tes créatures sont soignées.", "Voici le Codex. Il enregistre chaque créature que tu vois et que tu captures.", "Et ce Partage Exp : il fait progresser toute ton équipe, même celles qui ne combattent pas.", "Prends aussi ces cinq Sphères pour capturer des créatures sauvages. Affaiblis-les d'abord !", "La première arène est à Clairsemis, au nord. Bon voyage !"], { speaker: 'Prof. Sauge' });
    G.keys.codex = 1; G.keys.partage = 1; addItem('sphere', 5); addItem('baume', 3); sfx('item');
    await say("Tu reçois le Codex, le Partage Exp, 5 Sphères et 3 Baumes !");
  },
  async ysee(n) {
    const sp = 'Pr Ysée';
    if (!G.flags.ysee) {
      await say(["Tu viens des Quatre Terres ? Alors tu connais Nova. C'est moi qui l'ai fait sortir de l'eau, cette nuit-là, avant qu'on l'emmène à Bourg-Aurore.", "Je suis la Professeure Ysée. J'étudie les Éclos depuis la Germination. Ils sont nés de la sève de la Graine, tu sais.", "Je rêve souvent d'un homme aux cheveux blancs qui regarde par-dessus ton épaule. Méfie-toi de ceux qui t'aident sans rien demander.", "Tiens. La sève de la Graine soigne mieux que n'importe quel baume."], { speaker: sp });
      addItem('hyperbaume', 4); sfx('item'); G.flags.ysee = 1;
      return say("Tu reçois 4 Hyper Baumes !");
    }
    return say(G.flags.couple ? "Prends soin de Nova. Et laisse-la prendre soin de toi." : "Nova a toujours eu du mal à dire ce qu'elle ressent. Sois patient·e avec elle.", { speaker: sp });
  },
  async lierre(n) {
    const sp = 'Prof. Lierre';
    if (!G.flags.lierre) {
      await say(["Ah ! Un·e champion·ne des Quatre Terres. Je suis le Prof. Lierre. Sauge et moi avons étudié ensemble.", "J'ai quitté les Quatre Terres pour comprendre Éclosia. Le Zénith, la Graine... et Éveillon, le gardien de l'Éveil, qui fait passer le monde du rêve au réel.", "Les vieilles légendes parlent aussi d'Aubéris, qui appelle le jour, et de Nocturnis, qui veille sur la nuit. Je crois qu'ils se cachent encore quelque part.", "Si l'Ordre Racine cherche Éveillon, il faut que tu atteignes le Mont Éveil avant lui. Prends ceci."], { speaker: sp });
      addItem('hypersphere', 5); addItem('bonbon', 2); sfx('item'); G.flags.lierre = 1;
      await say("Tu reçois 5 Hyper Sphères et 2 Bonbons !");
      await say("Et ceci : un Bracelet d'Éclat. Il réagit aux cristaux de chaque type. Les champions d'arène en gardent un, sans le savoir.", { speaker: sp });
      G.keys.bracelet = 1; sfx('badge');
      const got = [...new Set(GYMS.filter((gy, i) => G.badges[i]).map(gy => gy.type))].filter(t => giveCrystal(t, true));
      return say(`Tu reçois le Bracelet d'Éclat !${got.length ? ' Tes badges se changent en Éclats : ' + got.map(t => TN[t]).join(', ') + '.' : ''}`);
    }
    if (G.flags.ending && !G.flags.lierre2) {
      G.flags.lierre2 = 1;
      return story([
        FACE('Prof. Lierre', "Sauge t'a parlé d'Aurèle, je suppose. Il oublie toujours la meilleure partie."),
        FACE('Prof. Lierre', "Aurèle chantait faux, cultivait des roses bleues et appelait chaque graine par un prénom. Celle du fond de la mer, il l'appelait « Petite »."),
        FACE('Prof. Lierre', "Ce que la mer lui a pris, aucune graine ne le rendra. Mais toi, tu lui as rendu une chose : le droit de s'arrêter."),
      ]);
    }
    return say(G.flags.ending ? "On dit qu'Aubéris et Nocturnis sont réapparus dans les sanctuaires. Va voir !" : "Le Zénith est la clé, la Graine la serrure... et l'Éveil, la porte. Qui a écrit ça, déjà ?", { speaker: sp });
  },
  async gift(n) {
    const { town, h } = n.data;
    const flag = 'gift_' + town;
    if (G.flags[flag]) return say(pick(Math.random, TOWNS[town].lines || ["Bonne route !"]));
    await say(h.text);
    if (h.gift) { addItem(h.gift[0], h.gift[1]); sfx('item'); await say(`Tu reçois ${h.gift[1] > 1 ? h.gift[1] + ' × ' : ''}${ITEMS[h.gift[0]].n} !`); }
    if (h.giftMon) {
      const m = makeMon(h.giftMon[0], h.giftMon[1], { goodIv: true });
      const boxed = giveMon(m); sfx('item');
      await say(`Tu reçois ${SP[m.sp].n} !${boxed ? ' Il est envoyé dans la boîte du PC.' : ''}`);
    }
    G.flags[flag] = 1;
  },
  async faille() {
    if (!G.flags.rifts) return say("L'air tremble, mais rien ne s'ouvre.");
    const opts = ["L'Envers (Ronce a gagné)", "L'Avant (il y a dix ans)", 'Rester ici'];
    const r = await ask("Deux Failles palpitent. Laquelle traverser ?", opts, { w: 130 });
    if (r === 0) await warp('v0', 13, 12, 'down');
    if (r === 1) await warp('x0', 13, 12, 'down');
  },
  async failleRetour() {
    const r = await ask("La Faille te ramène vers le Mont Éveil. Rentrer ?", ['Oui', 'Non']);
    if (r === 0) { await warp('u9', 8, 20, 'up'); if (G.flags.envDone && G.flags.avantDone) await multiEnd(); }
  },
  async dock() {
    if (RT.map.id === 't3') {
      if (!G.keys.ticket) return say("Le ferry pour Éclosia part d'ici. Seuls les champions de la Ligue des Quatre Terres peuvent embarquer.", { speaker: 'Marin' });
      const r = await ask("Tu as le Billet Éclosia ! On embarque pour Port-Sève ?", ['Oui', 'Non'], { speaker: 'Marin' });
      if (r !== 0) return;
      await fade(true, 500); if (G.flags.arrivedB) await say("Le ferry traverse la mer pendant toute une nuit...", { auto: 1400 });
      const m = getMap('u0'); const d = m.npcs.find(nn => nn.script === 'dock');
      await enterMap('u0', d.x, d.y - 1, 'up');
      await fade(false, 500);
      if (!G.flags.arrivedB) { G.flags.arrivedB = 1; await arrivalEclosia(); await say("Bienvenue à Éclosia ! Huit arènes, six Gardiens et leurs Pétales t'attendent. Au bout se dresse le Mont Éveil.", { speaker: 'Marin' }); }
    } else {
      const r = await ask("Retourner à Port-Corail, dans les Quatre Terres ?", ['Oui', 'Non'], { speaker: 'Marin' });
      if (r !== 0) return;
      await fade(true, 500);
      const m = getMap('t3'); const d = m.npcs.find(nn => nn.script === 'dock');
      await enterMap('t3', d.x, d.y - 1, 'up');
      await fade(false, 500);
    }
  },
};

// ---------- Objets ----------
function useItemOn(id, m, dry) {
  const it = ITEMS[id], mx = maxHp(m), n = monName(m);
  if (it.k === 'heal') { if (m.hp <= 0 || m.hp >= mx) return null; const h = Math.min(mx - m.hp, it.hp); if (!dry) m.hp += h; return `${n} récupère ${h} PV.`; }
  if (it.k === 'cure') { if (!m.status || !it.st.includes(m.status) || m.hp <= 0) return null; if (!dry) { m.status = null; m.slp = 0; } return `${n} est soigné !`; }
  if (it.k === 'revive') { if (m.hp > 0) return null; if (!dry) m.hp = Math.floor(mx / 2); return `${n} reprend des forces !`; }
  if (it.k === 'pp') { if (m.moves.every(mv => mv.pp >= MOVES[mv.id].pp)) return null; if (!dry) m.moves.forEach(mv => mv.pp = Math.min(MOVES[mv.id].pp, mv.pp + 10)); return `Les PP de ${n} sont restaurés.`; }
  if (it.k === 'candy') { if (m.lvl >= LVL_CAP) return null; return 'ok'; }
  return null;
}
async function learnMove(m, id, inBattle) {
  const M = MOVES[id], n = monName(m);
  const sy = t => inBattle ? bsay(t, 1500) : say(t);
  if (m.moves.some(mv => mv.id === id)) return;
  if (m.moves.length < 4) { m.moves.push({ id, pp: M.pp }); sfx('item'); await sy(`${n} apprend ${M.n} !`); return; }
  await sy(`${n} veut apprendre ${M.n}, mais connaît déjà quatre capacités.`);
  const r = await ask(`Oublier une capacité pour apprendre ${M.n} ?`);
  if (r === 0) {
    const i = await menu(m.moves.map(mv => ({ label: MOVES[mv.id].n, right: TN[MOVES[mv.id].t] })).concat([{ label: M.n, right: 'Nouv.' }]), { x: 112, y: 20, w: 124, title: 'Oublier quelle capacité ?' });
    if (i >= 0 && i < 4) {
      const old = MOVES[m.moves[i].id].n;
      m.moves[i] = { id, pp: M.pp };
      await sy(`1, 2 et... hop ! ${n} oublie ${old} et apprend ${M.n} !`);
      return;
    }
  }
  await sy(`${n} n'a pas appris ${M.n}.`);
}
async function evolveCheck(list) {
  for (const m of new Set(list)) {
    const s = SP[m.sp];
    if (s.next && m.lvl >= s.evo && m.hp > 0) await evolveScene(m);
  }
}
async function evolveScene(m) {
  const from = m.sp, to = SP[m.sp].next;
  const p = el('panel evo', 0, 0, 240, 160);
  const name = monName(m);
  p.innerHTML = `<div class="evos"><img class="a" src="${monURL(from, m.shiny)}" alt=""><img class="b" src="${monURL(to, m.shiny)}" alt=""></div>`;
  const dl = el('dlg', 4, 112, 232, 44, `<div class="txt">Quoi ? ${esc(name)} évolue !</div>`);
  sfx('evolve');
  let cancelled = false;
  const h = { press(b) { if (b === 'b') cancelled = true; } };
  uiPush(h);
  const a = p.querySelector('.a'), b = p.querySelector('.b');
  for (let i = 0; i < 14 && !cancelled; i++) {
    const on = i % 2 === 1;
    a.style.opacity = on ? 0 : 1; b.style.opacity = on ? 1 : 0;
    await wait(Math.max(90, 380 - i * 22));
  }
  uiPop(h); dl.remove();
  if (cancelled) {
    a.style.opacity = 1; b.style.opacity = 0;
    await say(`Hein ? ${name} a arrêté d'évoluer.`);
    p.remove(); return;
  }
  a.style.opacity = 0; b.style.opacity = 1;
  const oldMax = maxHp(m);
  m.sp = to;
  m.hp = Math.min(maxHp(m), m.hp + maxHp(m) - oldMax);
  G.seen[to] = 1; G.caught[to] = 1;
  sfx('level');
  await say(`Félicitations ! ${name} a évolué en ${SP[to].n} !`);
  for (const mv of movesLearnedAt(to, m.lvl)) await learnMove(m, mv, false);
  p.remove();
}

// ---------- Écrans ----------
function monRow(m, i, sel) {
  const st = calcStats(m), f = m.hp / st.hp;
  return `<div class="pslot${sel ? ' sel' : ''}${m.hp <= 0 ? ' ko' : ''}"><img src="${monURL(m.sp, m.shiny)}" alt=""><div class="pn"><span>${esc(monName(m))}</span><small>N.${m.lvl} ${statusPill(m.status)}</small></div><div class="ph"><div class="bar"><i style="width:${f * 100}%;background:${hpColor(f)}"></i></div><small>${m.hp}/${st.hp}</small></div></div>`;
}
function partyScreen(o = {}) {
  return new Promise(res => {
    const p = el('panel party', 0, 0, 240, 160);
    let sel = o.force ? Math.max(0, G.party.findIndex(m => m.hp > 0)) : 0, swapFrom = -1;
    const render = () => {
      p.innerHTML = `<div class="ptitle">${esc(swapFrom >= 0 ? 'Échanger avec quelle créature ?' : (o.title || 'Équipe'))}</div><div class="plist">${G.party.map((m, i) => monRow(m, i, i === sel).replace('pslot', 'pslot' + (i === swapFrom ? ' swap' : ''))).join('')}</div>`;
    };
    render();
    const h = {
      async press(b) {
        if (h.lock) return;
        if (b === 'up') { sel = (sel - 1 + G.party.length) % G.party.length; sfx('move'); render(); }
        else if (b === 'down') { sel = (sel + 1) % G.party.length; sfx('move'); render(); }
        else if (b === 'b') {
          if (swapFrom >= 0) { swapFrom = -1; render(); return; }
          if (o.force) return;
          sfx('cancel'); close(-1);
        } else if (b === 'a') {
          sfx('select');
          if (swapFrom >= 0) { const t = G.party[swapFrom]; G.party[swapFrom] = G.party[sel]; G.party[sel] = t; swapFrom = -1; render(); return; }
          if (o.mode === 'pick') {
            if (o.force && G.party[sel].hp <= 0) { sfx('bump'); return; }
            close(sel); return;
          }
          h.lock = true;
          const r = await menu(['Résumé', 'Déplacer', 'Retour'], { x: 168, y: 96, w: 68 });
          h.lock = false;
          if (r === 0) { h.lock = true; await summaryScreen(sel); h.lock = false; render(); }
          if (r === 1) { swapFrom = sel; render(); }
        }
      },
    };
    function close(v) { uiPop(h); p.remove(); res(v); }
    uiPush(h);
  });
}
function summaryScreen(idx) {
  return new Promise(res => {
    const p = el('panel summ', 0, 0, 240, 160);
    let i = idx;
    const render = () => {
      const m = G.party[i], s = SP[m.sp], st = calcStats(m);
      const nx = m.lvl >= LVL_CAP ? 0 : xpAt(m.sp, m.lvl + 1) - m.xp;
      p.innerHTML = `<div class="sl"><img src="${monURL(m.sp, m.shiny)}" alt=""><div class="sn">${esc(monName(m))}${m.shiny ? ' <em>chromatique</em>' : ''}</div><div>N° ${String(s.num).padStart(3, '0')} · N.${m.lvl}</div><div>${s.types.map(typePill).join('')} ${statusPill(m.status)}</div><div class="sx">Exp. avant niveau suivant : ${nx}</div>${s.next ? `<div class="sx">Évolue au niveau ${s.evo}</div>` : ''}</div>
      <div class="sr"><table>${STATK.map(k => `<tr><td>${STAT_NAME[k]}</td><td>${k === 'hp' ? m.hp + '/' : ''}${st[k]}</td></tr>`).join('')}</table>
      <div class="smv">${m.moves.map(mv => { const M = MOVES[mv.id]; return `<div>${typePill(M.t)}<span>${esc(M.n)}</span><b>${mv.pp}/${M.pp}</b></div>`; }).join('')}</div></div>`;
    };
    render();
    const h = {
      press(b) {
        if (b === 'up' || b === 'left') { i = (i - 1 + G.party.length) % G.party.length; sfx('move'); render(); }
        else if (b === 'down' || b === 'right') { i = (i + 1) % G.party.length; sfx('move'); render(); }
        else if (b === 'a' || b === 'b') { sfx('cancel'); uiPop(h); p.remove(); res(); }
      },
    };
    uiPush(h);
  });
}
async function bagScreen(ctx) {
  const tabs = ctx === 'battle' ? ['Soins', 'Sphères'] : ['Soins', 'Sphères', 'Objets rares'];
  let tab = 0;
  const p = el('panel bag', 0, 0, 240, 160);
  try {
    while (true) {
      const list = tab === 2 ? Object.keys(KEY_ITEMS).filter(k => G.keys[k]) : ITEM_ORDER.filter(k => G.bag[k] > 0 && ((ITEMS[k].k === 'ball') === (tab === 1)));
      if (ctx === 'battle' && tab === 0) for (let k = list.length - 1; k >= 0; k--) if (['repel', 'candy'].includes(ITEMS[list[k]].k)) list.splice(k, 1);
      p.innerHTML = `<div class="btabs">${tabs.map((t, i) => `<span class="${i === tab ? 'on' : ''}">${t}</span>`).join('')}<small>Gauche / droite</small></div><div class="bdesc" id="bdesc"></div>`;
      const desc = p.querySelector('#bdesc');
      const items = list.length ? list.map(k => tab === 2 ? { label: KEY_ITEMS[k].n, right: k === 'partage' ? (G.opts.share !== false ? 'Actif' : 'Inactif') : '' } : { label: ITEMS[k].n, right: '× ' + G.bag[k] }) : [{ label: '(vide)', disabled: true }];
      const r = await new Promise(resolve => {
        let sel = 0, top = 0; const rows = 7;
        const box = el('menu bagl', 6, 18, 150, 104);
        const render = () => {
          if (sel < top) top = sel; if (sel >= top + rows) top = sel - rows + 1;
          box.innerHTML = items.slice(top, top + rows).map((it, j) => `<div class="mi${top + j === sel ? ' sel' : ''}${it.disabled ? ' dis' : ''}"><span>${esc(it.label)}</span><b>${esc(it.right || '')}</b></div>`).join('');
          const k = list[sel];
          desc.textContent = k ? (tab === 2 ? KEY_ITEMS[k].d : ITEMS[k].d) : '';
        };
        render();
        const h = {
          press(b) {
            if (b === 'up') { sel = (sel - 1 + items.length) % items.length; sfx('move'); render(); }
            else if (b === 'down') { sel = (sel + 1) % items.length; sfx('move'); render(); }
            else if (b === 'left' || b === 'right') { tab = (tab + (b === 'left' ? tabs.length - 1 : 1)) % tabs.length; sfx('move'); done('tab'); }
            else if (b === 'b') { sfx('cancel'); done(null); }
            else if (b === 'a') { if (!list.length) return; sfx('select'); done(list[sel]); }
          },
        };
        function done(v) { uiPop(h); box.remove(); resolve(v); }
        uiPush(h);
      });
      if (r === 'tab') continue;
      if (!r) return null;
      if (tab === 2) {
        if (r === 'partage') { G.opts.share = G.opts.share === false; toast(`Partage Exp ${G.opts.share ? 'activé' : 'désactivé'}`); }
        else if (r === 'codex') await livingCodex();
        continue;
      }
      const it = ITEMS[r];
      if (ctx === 'battle') {
        if (it.k === 'ball') return { item: r };
        const ti = await partyScreen({ mode: 'pick', title: `Utiliser ${it.n} sur quelle créature ?` });
        if (ti < 0) continue;
        if (!useItemOn(r, G.party[ti], true)) { await say("Ça n'aura aucun effet."); continue; }
        return { item: r, target: ti };
      }
      if (it.k === 'ball') { await say("Les Sphères s'utilisent pendant un combat contre une créature sauvage."); continue; }
      if (it.k === 'repel') { G.repel = it.steps; G.bag[r]--; if (!G.bag[r]) delete G.bag[r]; sfx('item'); await say(`Tu utilises ${it.n}. Les créatures faibles vont t'éviter.`); continue; }
      const ti = await partyScreen({ mode: 'pick', title: `Utiliser ${it.n} sur quelle créature ?` });
      if (ti < 0) continue;
      const m = G.party[ti];
      if (it.k === 'candy') {
        if (m.lvl >= LVL_CAP) { await say("Ça n'aura aucun effet."); continue; }
        G.bag[r]--; if (!G.bag[r]) delete G.bag[r];
        p.hidden = true;
        RT.leveled = [];
        await gainXP(m, xpAt(m.sp, Math.min(LVL_CAP, m.lvl + (it.lv || 1))) - m.xp, false);
        await evolveCheck([m]);
        p.hidden = false;
        continue;
      }
      const msg = useItemOn(r, m, false);
      if (!msg) { await say("Ça n'aura aucun effet."); continue; }
      G.bag[r]--; if (!G.bag[r]) delete G.bag[r];
      sfx('heal'); await say(msg);
    }
  } finally { p.remove(); }
}
function shopList() {
  const reg = RT.map.reg;
  const total = G.badges.filter(Boolean).length;
  const out = [];
  for (const [n, items] of SHOP_TIERS) if (total >= n || (reg === 'brumaire' && n <= 8)) out.push(...items);
  return out;
}
async function shopBuy() {
  const list = shopList();
  while (true) {
    const mb = el('menu money', 4, 4, 90, 18, `<div class="mi"><span>Argent</span><b>${fmtMoney(G.money)}</b></div>`);
    const desc = el('menu sdesc', 4, 122, 232, 34);
    const i = await menu(list.map(k => ({ label: ITEMS[k].n, right: fmtMoney(ITEMS[k].p) })), { x: 100, y: 4, w: 136, rows: 8, onMove: j => desc.textContent = ITEMS[list[j]].d });
    if (i < 0) { mb.remove(); desc.remove(); return; }
    const it = ITEMS[list[i]];
    const max = Math.min(99, Math.floor(G.money / it.p));
    if (max < 1) { mb.remove(); desc.remove(); await say("Tu n'as pas assez d'argent."); continue; }
    const q = await pickQty(max, it.p);
    mb.remove(); desc.remove();
    if (!q) continue;
    G.money -= it.p * q; addItem(list[i], q); sfx('item');
    let bonus = '';
    if (list[i] === 'sphere' && q >= 10) { addItem('sphere', 1); bonus = ' Et voici une Sphère en cadeau !'; }
    await say(`Tu achètes ${q} × ${it.n}. Merci !${bonus}`);
  }
}
async function shopSell() {
  while (true) {
    const list = ITEM_ORDER.filter(k => G.bag[k] > 0 && ITEMS[k].p > 0);
    if (!list.length) return say("Tu n'as rien à vendre.");
    const i = await menu(list.map(k => ({ label: ITEMS[k].n + ' × ' + G.bag[k], right: fmtMoney(Math.floor(ITEMS[k].p / 2)) })), { x: 60, y: 4, w: 176, rows: 8 });
    if (i < 0) return;
    const k = list[i];
    const q = await pickQty(G.bag[k], Math.floor(ITEMS[k].p / 2));
    if (!q) continue;
    G.bag[k] -= q; if (!G.bag[k]) delete G.bag[k];
    G.money += Math.floor(ITEMS[k].p / 2) * q; sfx('item');
  }
}
async function pcScreen() {
  sfx('select');
  await say(`${G.name} allume le PC.`, { auto: 600 });
  while (true) {
    const r = await menu(['Retirer', 'Déposer', 'Quitter'], { x: 4, y: 4, w: 70, title: `Boîte : ${G.box.length}` });
    if (r === 0) {
      if (!G.box.length) { await say("La boîte est vide."); continue; }
      if (G.party.length >= 6) { await say("Ton équipe est complète."); continue; }
      const prev = el('panel pcprev', 4, 60, 70, 70);
      const i = await menu(G.box.map(m => ({ label: monName(m), right: 'N.' + m.lvl })), { x: 80, y: 4, w: 156, rows: 10, onMove: j => { const m = G.box[j]; prev.innerHTML = `<img src="${monURL(m.sp, m.shiny)}" alt="">`; } });
      prev.remove();
      if (i < 0) continue;
      const m = G.box.splice(i, 1)[0]; G.party.push(m);
      await say(`${monName(m)} rejoint l'équipe.`);
    } else if (r === 1) {
      if (G.party.length <= 1) { await say("Tu ne peux pas déposer ta dernière créature !"); continue; }
      const i = await partyScreen({ mode: 'pick', title: 'Déposer quelle créature ?' });
      if (i < 0) continue;
      if (G.party.filter((m, j) => j !== i && m.hp > 0).length === 0) { await say("Il te faut au moins une créature en forme dans l'équipe."); continue; }
      const m = G.party.splice(i, 1)[0]; healMon(m); G.box.push(m);
      await say(`${monName(m)} est déposé dans la boîte.`);
    } else return;
  }
}
function cardScreen() {
  const p = el('panel card', 0, 0, 240, 160);
  const badges = GYMS.map((g, i) => `<span class="bdg${G.badges[i] ? ' on' : ''}" style="--tc:${TC[g.type]}" title="${esc(g.badge)}"></span>`);
  p.innerHTML = `<div class="ctop"><img src="${(typeof heroFullURL === 'function' && heroFullURL()) || personURL(PALS[G.look] || PALS.player)}" alt="" style="object-fit:contain"><div><div class="cn">${esc(G.name)}</div><div>Argent : ${fmtMoney(G.money)}</div><div>Codex : ${Object.keys(G.caught).length} capturées</div><div>Temps de jeu : ${fmtTime(G.time)}</div><div>Heure : ${TOD_NAME[timeOfDay()]}</div></div></div>
  <div class="cb"><small>Quatre Terres · Éclosia</small><div class="bdr">${badges.slice(0, 16).join('')}</div><small>An 31 · Nouveau Monde</small><div class="bdr">${badges.slice(16, 32).join('')}</div></div>`;
  return waitKey().then(() => p.remove());
}
function regionLayout(rk) {
  const R = REGIONS[rk];
  const pos = {}; let x = 0, y = 0;
  pos[R.chain[0]] = [0, 0];
  for (let k = 0; k < R.dirs.length; k++) {
    const d = R.dirs[k];
    const [dx, dy] = d === 'n' ? [0, -1] : [1, 0];
    pos[R.chain[2 * k + 1]] = [x + dx * 0.5, y + dy * 0.5];
    x += dx; y += dy;
    pos[R.chain[2 * k + 2]] = [x, y];
  }
  return pos;
}
async function optionsScreen() {
  while (true) {
    const items = [
      { label: 'Texte', right: ['Lent', 'Normal', 'Rapide'][G.opts.speed] },
      { label: 'Musique', right: G.opts.music ? 'Oui' : 'Non' },
      { label: 'Sons', right: G.opts.sfx ? 'Oui' : 'Non' },
      { label: 'Retour' },
    ];
    const r = await menu(items, { x: 120, y: 4, w: 116 });
    if (r === 0) G.opts.speed = (G.opts.speed + 1) % 3;
    else if (r === 1) { G.opts.music = !G.opts.music; setMusicOn(G.opts.music); }
    else if (r === 2) { G.opts.sfx = !G.opts.sfx; setSfxOn(G.opts.sfx); }
    else return;
  }
}
async function startMenu() {
  sfx('select');
  let sel = 0;
  while (true) {
    const items = [];
    if (G.keys.codex) items.push('Codex');
    items.push('Équipe', 'Boîte', 'Sac', 'Carte');
    if (G.flags.st_rival1) items.push('Lien');
    if (G.keys.chrono) items.push('Voyager');
    if (typeof mondeScreen === 'function') items.push('Monde');
    if (RT.map && RT.map.kind !== 'int' && !RT.P.surf) items.push(RT.P.bike ? 'Descendre' : 'Vélo');
    items.push('Écrits', G.name, 'Sauver', 'Options', 'Fermer');
    const r = await menu(items, { x: 164, y: 4, w: 72, sel });
    if (r < 0) return;
    sel = r;
    const k = items[r];
    if (k === 'Codex') await livingCodex();
    else if (k === 'Équipe') await partyScreen({});
    else if (k === 'Boîte') await pcScreen();
    else if (k === 'Sac') await bagScreen('field');
    else if (k === 'Carte') { const flew = await atlasScreen(); if (flew) return; }
    else if (k === 'Lien') { await novaCall(); return; }
    else if (k === 'Voyager') { await voyager(); return; }
    else if (k === 'Monde') await mondeScreen();
    else if (k === 'Vélo' || k === 'Descendre') { RT.P.bike = k === 'Vélo'; sfx('select'); if (RT.P.bike) await say(`${G.name} enfourche son vélo.`); return; }
    else if (k === 'Écrits') await libraryScreen();
    else if (k === G.name) await cardScreen();
    else if (k === 'Sauver') {
      const a = await ask('Sauvegarder la partie ?');
      if (a === 0) await say(saveGame() ? `${G.name} a sauvegardé la partie.` : "La sauvegarde a échoué : le stockage du navigateur n'est pas disponible ici.");
    } else if (k === 'Options') await optionsScreen();
    else return;
  }
}

// ---------- Titre et nouvelle partie ----------
async function titleScreen() {
  RT.mode = 'pre';
  const t0 = el('panel title pre', 0, 0, 240, 160);
  t0.innerHTML = `<div class="press">Appuie sur A</div>`;
  await waitKey();
  audioInit();
  if (typeof ART_READY !== 'undefined') { t0.querySelector('.press').textContent = 'Chargement…'; await ART_READY; }
  t0.remove(); playMusic('intro');
  await runIntroCine();
  RT.mode = 'title';
  const t = el('panel title', 0, 0, 240, 160);
  t.innerHTML = `<div class="lgd"><div class="top" aria-hidden="true">L<span class="ea">E</span>GENDES</div><div class="ttl"><h1 aria-label="Légendes Éclosia">Eclosia</h1><i class="acc" aria-hidden="true"></i></div></div><div class="press">Appuie sur A</div>`;
  await waitKey();
  t.querySelector('.press').remove();
  if (typeof chooseSlot === 'function') await chooseSlot();
  for (;;) {
    const save = loadSave();
    const old = loadOldEclosia(), oldRaw = loadOldRaw(), baks = listBackups();
    const items = (save ? ['Continuer'] : []).concat(old && !save ? ['Reprendre ma partie'] : [], (oldRaw || baks.length) ? ['Restaurer une sauvegarde'] : [], ['Nouvelle partie']);
    if (old && !save) el('menu saveinfo', 50, 52, 140, 34, `<div>Partie d'Éclosia trouvée : ${esc(old.name || '?')}</div><div>${(old.party || []).length} Éclos · ${old.petals | 0} Pétales</div>`);
    if (save) el('menu saveinfo', 60, 58, 120, 34, `<div>${esc(save.name)} · ${save.badges.filter(Boolean).length} badges</div><div>Codex ${Object.keys(save.caught).length} · ${fmtTime(save.time)}</div>`);
    const r = await menu(items, { x: 50, y: 160 - 14 - items.length * 13, w: 140, cancel: false });
    document.querySelectorAll('.saveinfo').forEach(e => e.remove());
    const k = items[r];
    if (k === 'Continuer') { t.remove(); backupSave(); return continueSave(save); }
    if (k === 'Restaurer une sauvegarde') { const done = await restoreMenu(save, oldRaw, baks, t); if (done) return; continue; }
    t.remove();
    if (save) backupSave();
    return newGame(k === 'Reprendre ma partie' ? old : null);
  }
}
async function continueSave(save, after) {
  G = Object.assign(newState(save.name, 'Nova', save.look), save); G.rival = 'Nova';
  while (G.badges.length < GYMS.length) G.badges.push(false);
  G.opts = Object.assign({ speed: 1, music: true, sfx: true, share: true }, save.opts || {});
  setMusicOn(G.opts.music); setSfxOn(G.opts.sfx);
  RT.mode = 'overworld';
  await fade(true, 1);
  await enterMap(G.map, G.x, G.y, G.dir, { surf: G.surf });
  await fade(false, 400);
  if (after) await after();
}
const fmtDate = t => { const d = new Date(t); return `${d.getDate()}/${d.getMonth() + 1} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
async function restoreMenu(save, oldRaw, baks, titleEl) {
  const opts = [], acts = [];
  if (oldRaw) { opts.push(`Éclosia d'origine · ${(oldRaw.name || '?').slice(0, 8)} · ${(oldRaw.party || []).length + (oldRaw.box || []).length} Éclos`); acts.push({ old: 1 }); }
  for (const b of baks) { opts.push(`${fmtDate(b.t)} · ${b.s.name} · ${b.s.badges.filter(Boolean).length} badges`); acts.push({ bak: b }); }
  opts.push('Retour'); acts.push(null);
  const r = await menu(opts, { x: 14, y: 160 - 14 - opts.length * 13, w: 212, cancel: true });
  const a = acts[r]; if (!a) return false;
  if (a.bak) {
    const ok = await ask(`Revenir à la sauvegarde du ${fmtDate(a.bak.t)} ? Ta partie actuelle sera gardée en copie.`, ['Oui', 'Non'], { w: 50 });
    if (ok !== 0) return false;
    backupSave();
    try { localStorage.setItem(saveKey(), JSON.stringify(a.bak.s)); } catch (e) { }
    titleEl.remove(); await continueSave(a.bak.s, () => say("Sauvegarde restaurée. Tout est revenu comme à ce moment-là.")); return true;
  }
  if (!save) { titleEl.remove(); await newGame(oldRaw); return true; }
  const c = await ask("Que faire de ta partie d'Éclosia d'origine ?", ['Fusionner avec ma partie', 'Recommencer depuis Éclosia', 'Annuler'], { w: 150 });
  if (c === 2 || c < 0) return false;
  backupSave();
  titleEl.remove();
  if (c === 1) { await newGame(oldRaw); return true; }
  await continueSave(save, async () => {
    const got = importOldEclosia(oldRaw);
    sfx('item');
    if (got.length) await say(`Tes Éclos d'origine t'ont rejoint·e : ${got.map(m => monName(m) + ' (N.' + m.lvl + ')').slice(0, 6).join(', ')}${got.length > 6 ? '...' : ''}. Les autres sont dans la boîte du PC.`);
    else await say("Tes Éclos d'origine sont déjà tous avec toi.");
    if (G.flags.oldBadges) await say(`Tes Pétales d'Éclosia comptent pour ${G.flags.oldBadges} badge(s) des Quatre Terres.`);
    saveGame(true);
  });
  return true;
}
function nameScreen() {
  return new Promise(res => {
    const p = el('panel namep', 0, 0, 240, 160);
    p.innerHTML = `<div class="ptitle">Nouvelle partie</div>
      <label for="nm">Ton nom</label><input id="nm" maxlength="10" value="Aube" autocomplete="off">
      <div class="looks" role="radiogroup" aria-label="Apparence">${['player', 'player2', 'player3'].map((k, i) => `<button type="button" data-look="${k}" class="${i === 0 ? 'on' : ''}" aria-label="Apparence ${i + 1}"><img src="${personURL(PALS[k])}" alt=""></button>`).join('')}</div>
      <button type="button" id="go">Commencer l'aventure</button>`;
    let look = 'player';
    p.querySelectorAll('[data-look]').forEach(b => b.addEventListener('click', () => { look = b.dataset.look; p.querySelectorAll('[data-look]').forEach(x => x.classList.toggle('on', x === b)); }));
    const go = () => {
      const n = p.querySelector('#nm').value.trim() || 'Aube';
      const r = 'Nova';
      uiPop(h); p.remove(); res({ name: n, rival: r, look });
    };
    p.querySelector('#go').addEventListener('click', go);
    p.querySelectorAll('input').forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); go(); } }));
    const h = { press(b) { if (b === 'a' && document.activeElement && document.activeElement.tagName !== 'INPUT') go(); } };
    uiPush(h);
    setTimeout(() => { const i = p.querySelector('#nm'); i.focus(); i.select(); }, 50);
  });
}
async function newGame(old) {
  const { name, rival, look } = old ? { name: (old.name || 'Sol').slice(0, 10), rival: 'Nova', look: 'player' } : await nameScreen();
  G = newState(name, rival, look);
  setMusicOn(G.opts.music); setSfxOn(G.opts.sfx);
  RT.mode = 'intro';
  await introStory();
  const prof = el('panel intro', 0, 0, 240, 160, `<img src="${personURL(PALS.prof)}" alt="">`);
  await say(LORE.intro, { speaker: 'Prof. Sauge' });
  await say(`${name}... Et Nova sera du voyage, bien sûr. Elle n'a parlé que de ton retour depuis une semaine.`, { speaker: 'Prof. Sauge' });
  await say(LORE.introEnd, { speaker: 'Prof. Sauge' });
  prof.remove();
  RT.mode = 'overworld';
  await fade(true, 1);
  await enterMap('t0~home', 4, 3, 'down');
  await fade(false, 500);
  await say(`Maman : ${name}, tu es enfin levé·e ! Le Prof. Sauge te cherchait. Son labo est juste en face.`);
  if (old) {
    const got = importOldEclosia(old);
    sfx('item');
    await say(`Tes Éclos t'ont suivi·e depuis Éclosia : ${got.map(m => monName(m) + ' (N.' + m.lvl + ')').slice(0, 6).join(', ')}${got.length > 6 ? '...' : ''} !`);
    if (got.length > G.party.length) await say(`Les autres t'attendent dans la boîte du PC.`);
    if (G.flags.oldBadges) await say(`Tes Pétales d'Éclosia comptent pour ${G.flags.oldBadges} badge(s) des Quatre Terres : tes pouvoirs de terrain sont débloqués.`);
    await say("Tu as ramené toute ta bande ? Bon. Alors je vais devoir m'entraîner deux fois plus.", { speaker: 'Nova' });
    saveGame(true);
  }
}

// ---------- Boucle principale ----------
let CTX = null;
function frame(now) {
  const dt = Math.min(100, now - (RT.lastTick || now));
  RT.lastTick = now;
  RT.acc += dt;
  inputUpdate();
  while (Input.q.length) {
    const b = Input.q.shift();
    const top = uiTop();
    if (top) top.press(b === 'menu' ? 'b' : b);
    else if (RT.mode === 'overworld' && !RT.busy && RT.P && !RT.P.moving) {
      if (b === 'a') run(interact);
      else if (b === 'menu') run(startMenu);
    }
  }
  let steps = 0;
  while (RT.acc >= 1000 / 60 && steps < 4) {
    RT.acc -= 1000 / 60; steps++;
    RT.frame++;
    for (const t of UI.tickers) t();
    if (RT.mode === 'overworld' && RT.map) owTick();
  }
  if (G && RT.mode !== 'title') G.time += dt / 1000;
  const x = CTX;
  x.setTransform(SCR, 0, 0, SCR, 0, 0);
  x.imageSmoothingEnabled = false;
  if (RT.mode === 'cine') drawCine(x);
  else if (RT.mode === 'pre') { x.fillStyle = '#000'; x.fillRect(0, 0, 240, 160); }
  else if (RT.mode === 'battle') drawBattle(x);
  else if (RT.mode === 'overworld' && RT.map) drawOverworld(x);
  else if (RT.mode === 'title' || RT.mode === 'intro') drawTitle(x);
  if (STORY) drawStory(x);
  requestAnimationFrame(frame);
}
function boot() {
  const cv = document.getElementById('cv');
  CTX = cv.getContext('2d');
  UI.root = document.getElementById('ui');
  setupTouch();
  requestAnimationFrame(frame);
  run(titleScreen);
  if (window.claude && window.claude.hot) {
    try { window.claude.hot.snapshot(() => ({})); } catch (e) { }
  }
}
window.addEventListener('beforeunload', () => { });
document.addEventListener('visibilitychange', () => { if (document.hidden && SND.ctx) SND.ctx.suspend(); else if (SND.ctx) SND.ctx.resume(); });
window.addEventListener('DOMContentLoaded', boot);
