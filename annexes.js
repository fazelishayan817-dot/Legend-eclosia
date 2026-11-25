'use strict';
/* ============================================================
   ÉCLOSIA — Mondes annexes fidèles à la carte du monde
   L'Envers, les Six Îles, les Terres Brûlées et Unaë deviennent
   de vrais mondes ouverts, bâtis sur la géographie réelle :
   - Éclosia-Envers : les côtes d'Éclosia, assombries, envahies de ronces
   - Les Six Îles : Éclosia avant la Germination, coupée en six îles
     autour du Gouffre de la Graine (passerelles de pêcheurs)
   - Terres Brûlées : Éclosia sous la cendre, trente et un ans plus tard
   - Unaë : les Quatre Terres encore soudées en un seul continent
   La progression de l'histoire est conservée : un lieu ne s'ouvre
   que lorsque les épreuves des lieux précédents sont passées.
   ============================================================ */
const SIDE_WORLDS = {
  envers: { base: 'brumaire', pal: 'envers', music: 'somnis',
    at: { v0: 'u0', v1: 'u6', v2: 'u2', v3: [4.4, -2.75] },
    lock: "Des ronces noires ferment le passage. Elles ne s'écarteront que lorsque la route précédente sera libérée." },
  avant: { base: 'brumaire', music: 'route2', split: 6,
    at: { x0: 'u0', x1: [1.15, -2.7], x2: [3.85, -1.15], x3: '@c' },
    lock: "Les passerelles de cordes ne sont pas encore tendues. Un pêcheur te fait signe : « Pas avant d'avoir fini ce que tu as à faire ici. »" },
  cendre: { base: 'brumaire', pal: 'cendre', music: 'cave',
    at: { f0: 'u0', f1: 'u1', f2: 'u3', f3: 'u5', f4: 'u4', f5: 'u8', f6: 'u9', f7: [4.4, -2.6] },
    lock: "Un mur de cendre et de ferraille barre la route. Les survivants plus loin ne t'ouvriront qu'une fois la route précédente sécurisée." },
  unae: { composite: ['solvene', 'qt0', 'qt1', 'qt2', 'qt3'], music: 'sacred', scale: 0.62,
    lock: "Les colosses de la Terre et les léviathans de l'Océan se battent devant toi. Impossible de passer pour l'instant." },
};
for (const rk in SIDE_WORLDS) if (REGIONS[rk]) OPEN_REG[rk] = 1;

/* ---------- Positions des lieux, d'après la vraie carte ---------- */
const _regionLayoutSide = regionLayout;
const SIDE_GEO = {};
function sideGeo(rk) {
  if (SIDE_GEO[rk]) return SIDE_GEO[rk];
  const S = SIDE_WORLDS[rk], R0 = REGIONS[rk], pos = {}, M = 20;
  let polys = [], centers = [];
  if (S.base) {
    const base = _regionLayoutSide(S.base), B = getMap(WORLD_ID(S.base));
    Object.values(base).forEach((v, i) => { pos['§' + i] = v.slice(); });
    const vals = Object.values(base), cx = vals.reduce((a, v) => a + v[0], 0) / vals.length, cy = vals.reduce((a, v) => a + v[1], 0) / vals.length;
    const ref = r => r === '@c' ? [cx, cy] : typeof r === 'string' ? base[r].slice() : r.slice();
    for (const tid in S.at) pos[tid] = ref(S.at[tid]);
    polys = LAND_SHAPES[S.base];
    // climats : ceux de la vraie carte, ville par ville
    for (const tid in B.plots) centers.push([B.plots[tid].cx, B.plots[tid].cy, BIOME_IDS.indexOf(townBiome(tid))]);
    const minx = Math.min(...vals.map(v => v[0])), miny = Math.min(...vals.map(v => v[1]));
    SIDE_GEO[rk] = { pos, polys, centers, center: [Math.round(M + (cx - minx) * WS), Math.round(M + (cy - miny) * WS)], biomeSeed: WORLD_ID(S.base) };
  } else {
    // Unaë : les Quatre Terres posées comme sur la carte du monde, puis soudées
    const parts = S.composite.map(prk => { const m = getMap(WORLD_ID(prk)), [ox, oy] = WORLD_LAYOUT[prk]; return { prk, m, ox, oy }; });
    const X0 = Math.min(...parts.map(p => p.ox)), Y0 = Math.min(...parts.map(p => p.oy));
    const X1 = Math.max(...parts.map(p => p.ox + p.m.w)), Y1 = Math.max(...parts.map(p => p.oy + p.m.h));
    const W = Math.round((X1 - X0) * S.scale), H = Math.round((Y1 - Y0) * S.scale);
    const toU = (wx, wy) => [((wx - X0) / (X1 - X0) * W - M) / WS, ((wy - Y0) / (Y1 - Y0) * H - M) / WS];
    const nrm = (wx, wy) => [(wx - X0) / (X1 - X0), (wy - Y0) / (Y1 - Y0)];
    pos['§0'] = [0, 0]; pos['§1'] = [(W - 2 * M) / WS, (H - 2 * M) / WS];
    for (const p of parts) for (const P of LAND_SHAPES[p.prk] || []) polys.push(P.map(([px, py]) => nrm(p.ox + px * p.m.w, p.oy + py * p.m.h)));
    const ctr = p => [p.ox + p.m.w / 2, p.oy + p.m.h / 2], main = parts[0], mc = ctr(main);
    // isthmes : le continent n'a pas encore été déchiré
    for (const p of parts.slice(1)) {
      const c = ctr(p), dx = c[0] - mc[0], dy = c[1] - mc[1], L = Math.hypot(dx, dy), w = 18, nx = -dy / L * w, ny = dx / L * w;
      polys.push([[mc[0] + nx, mc[1] + ny], [c[0] + nx, c[1] + ny], [c[0] - nx, c[1] - ny], [mc[0] - nx, mc[1] - ny]].map(([a, b]) => nrm(a, b)));
    }
    for (const p of parts) for (const tid in p.m.plots) { const pl = p.m.plots[tid], u = toU(p.ox + pl.cx, p.oy + pl.cy); centers.push([M + u[0] * WS, M + u[1] * WS, BIOME_IDS.indexOf(townBiome(tid))]); }
    const pc = main.m.plots.t3 || Object.values(main.m.plots)[0];
    pos.a0 = toU(main.ox + pc.cx, main.oy + pc.cy);
    const q3 = parts.find(p => p.prk === 'qt3') || parts[1], c3 = ctr(q3);
    pos.a1 = toU((mc[0] + c3[0]) / 2, (mc[1] + c3[1]) / 2);
    SIDE_GEO[rk] = { pos, polys, centers, biomeSeed: WORLD_ID(rk) };
  }
  // les chemins se placent à mi-distance entre deux lieux
  const ch = R0.chain;
  for (let i = 1; i < ch.length; i += 2) { const a = SIDE_GEO[rk].pos[ch[i - 1]], b = SIDE_GEO[rk].pos[ch[i + 1]]; if (a && b) SIDE_GEO[rk].pos[ch[i]] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; }
  LAND_SHAPES[rk] = SIDE_GEO[rk].polys;
  return SIDE_GEO[rk];
}

/* ---------- Gardiens de progression ---------- */
const SIDE_GUARDS = {};
const _openPatchSide = openPatch;
openPatch = function (id, m) {
  if (SIDE_WORLDS[REGION_OF[id]] && TOWNS[id]) SIDE_GUARDS[id] = m.guards.filter(g => !/Sortir sans créature/.test(g.text || ''));
  return _openPatchSide(id, m);
};
function sideTownClear(tid) {
  if (!SIDE_GUARDS[tid]) getMap(tid);
  return (SIDE_GUARDS[tid] || []).every(g => { try { return !!g.cond(); } catch (e) { return true; } });
}
function sideOpenAt(rk, idx) { const ch = REGIONS[rk].chain; for (let i = 0; i < idx; i++) if (TOWNS[ch[i]] && !sideTownClear(ch[i])) return false; return true; }

/* ---------- Génération ---------- */
const _genWorldSide = genWorld;
genWorld = function (id) {
  const rk = id.slice(3), S = SIDE_WORLDS[rk];
  if (!S || !REGIONS[rk]) return _genWorldSide(id);
  const geo = sideGeo(rk);
  // les lieux annexes ne gardent pas le climat grossier : on recalcule celui de la vraie carte
  const savedTB = {}; for (const tid of REGIONS[rk].chain) { savedTB[tid] = TOWN_BIOME[tid]; TOWN_BIOME[tid] = 'prairie'; }
  const prevRL = regionLayout;
  regionLayout = r => (r === rk ? geo.pos : prevRL(r));
  let m;
  if (S.composite) delete OPEN_REG[rk]; // pas de jetées artificielles : on replace plutôt ce qui serait isolé
  try { m = _genWorldSide(id); } finally { OPEN_REG[rk] = 1; regionLayout = prevRL; for (const tid in savedTB) { if (savedTB[tid] === undefined) delete TOWN_BIOME[tid]; else TOWN_BIOME[tid] = savedTB[tid]; } }
  sideBiomes(m, geo);
  if (S.split) splitIslands(m, geo.center, S.split, id);
  if (S.pal) { const pal = S.pal; m.pal = pal; m.palAt = () => pal; }
  if (S.music) m.music = S.music;
  sideRelocate(m);
  // progression : chaque lieu attend que les épreuves précédentes soient passées
  const ch = REGIONS[rk].chain;
  ch.forEach((cid, i) => {
    if (i === 0) return;
    const cells = m.warps.filter(w => w.to === cid).map(w => [w.x, w.y]);
    if (cells.length) m.guards.push({ cells, cond: () => sideOpenAt(rk, i), text: S.lock });
  });
  m.sideWorld = rk;
  return m;
};

// climats placés comme sur la vraie carte
function sideBiomes(m, geo) {
  const W = m.w, H = m.h, t = m.t, N = vnoise(hashStr(geo.biomeSeed + ':biome') % 977 + 3), grid = m.biomeGrid;
  if (!grid || !geo.centers.length) return;
  const busy = new Set();
  for (const b of m.buildings) for (let y = b.y; y < b.y + b.h; y++) for (let x = b.x; x < b.x + b.w; x++) busy.add(x + ',' + y);
  for (const w of m.warps) busy.add(w.x + ',' + w.y);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const wx = x + (N(x, y, 9) - 0.5) * 26, wy = y + (N(x + 300, y + 300, 9) - 0.5) * 26;
    let best = 0, bd = 1e12; for (const c of geo.centers) { const d = (c[0] - wx) ** 2 + (c[1] - wy) ** 2; if (d < bd) { bd = d; best = c[2]; } }
    grid[y * W + x] = best;
  }
  const R = rng(hashStr(m.id + ':sideT')), Nn = vnoise(hashStr(m.id + ':sideN') % 911 + 5), sea = m.seaMask;
  for (let y = 2; y < H - 2; y++) for (let x = 2; x < W - 2; x++) {
    if (busy.has(x + ',' + y) || (sea && sea[y * W + x])) continue;
    const c = t[y][x], b = m.biomeAt(x, y), r = R(), n = Nn(x * 3, y * 3, 5);
    if (b === 'volcan') { if (c === 'T') t[y][x] = r < 0.55 ? 'R' : 'T'; else if (c === 'b') t[y][x] = 'r'; else if (c === 'f') t[y][x] = '.'; else if (c === '.' && n > 0.62) t[y][x] = 's'; }
    else if (b === 'desert') { if (c === 'T') t[y][x] = r < 0.18 ? 'T' : r < 0.75 ? 'r' : 'R'; else if (c === 'b') t[y][x] = 'r'; else if (c === '"') t[y][x] = r < 0.45 ? '"' : '.'; else if (c === 'f') t[y][x] = '.'; else if (c === '.' && n > 0.55) t[y][x] = 's'; }
    else if (b === 'jungle') { if (c === '.' && r < 0.42) t[y][x] = '"'; else if (c === 'f' && r < 0.5) t[y][x] = '"'; }
    else if (b === 'montagne') { if (c === 'T') t[y][x] = r < 0.5 ? 'R' : 'T'; else if (c === 'b') t[y][x] = 'r'; }
    else if (b === 'neige' || b === 'marais') { if (c === 'f') t[y][x] = '.'; }
  }
}

// Les Six Îles : la mer coupe Éclosia en six, autour du Gouffre de la Graine
function splitIslands(m, center, n, id) {
  const W = m.w, H = m.h, t = m.t, sea = m.seaMask || (m.seaMask = new Uint8Array(W * H));
  const [cx, cy] = center, N = vnoise(hashStr(id + ':split') % 887 + 11);
  const keep = new Uint8Array(W * H), mark = (x, y, r) => { for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const X = x + dx, Y = y + dy; if (X >= 0 && Y >= 0 && X < W && Y < H) keep[Y * W + X] = 1; } };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const c = t[y][x]; if (c === 'x' || c === 'D' || c === 'F' || c === 'S' || c === 'L') mark(x, y, 2); }
  for (const w of m.warps) mark(w.x, w.y, 2);
  // angle de départ choisi pour que les rivages passent loin des villages
  const pts = Object.values(m.plots || {}).filter(p => Math.hypot(p.cx - cx, p.cy - cy) > 14).map(p => Math.atan2(p.cy - cy, p.cx - cx));
  let a0 = 0, bestGap = -1;
  for (let k = 0; k < 60; k++) {
    const a = k / 60 * (Math.PI * 2 / n);
    let g = 9; for (const p of pts) for (let i = 0; i < n; i++) { let d = Math.abs(((p - (a + i * Math.PI * 2 / n)) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI); g = Math.min(g, d); }
    if (g > bestGap) { bestGap = g; a0 = a; }
  }
  const ROAD = new Set([',', '=']);
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    const i = y * W + x; if (sea[i]) continue;
    const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy);
    let water = d < 11 + N(x, y, 5) * 4; // le Gouffre
    if (!water && d > 6) {
      const ang = Math.atan2(dy, dx);
      for (let k = 0; k < n && !water; k++) {
        const ra = a0 + k * Math.PI * 2 / n + (N(d * 0.6 + k * 50, k * 31, 7) - 0.5) * 0.5;
        let da = Math.abs(((ang - ra) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI);
        if (da < Math.PI / 2 && d * Math.sin(da) < 3.4 + N(x * 2, y * 2, 4) * 2) water = true;
      }
    }
    if (!water) continue;
    if (ROAD.has(t[y][x])) { t[y][x] = '='; continue; }
    if (keep[i]) continue;
    t[y][x] = '~'; sea[i] = 1;
  }
  // rivages : sable et rochers
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    if (sea[y * W + x]) continue; const c = t[y][x];
    if (!(sea[y * W + x - 1] || sea[y * W + x + 1] || sea[(y - 1) * W + x] || sea[(y + 1) * W + x])) continue;
    if (c === '.' || c === '"' || c === 'f') t[y][x] = 's'; else if (c === 'T' || c === 'b') t[y][x] = 'r';
  }
}

// tout ce qui serait resté isolé (objets, voyageurs, dresseurs) revient sur la terre accessible
function sideRelocate(m) {
  const W = m.w, H = m.h, t = m.t, WALK = new Set(['.', '"', 'f', ',', '=', 's', 'D']), first = Object.values(m.plots || {})[0];
  if (!first) return;
  const reach = new Uint8Array(W * H), st = first.out.s, q = [st]; reach[st[1] * W + st[0]] = 1;
  while (q.length) { const [x, y] = q.pop(); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= W || Y >= H || reach[Y * W + X] || !WALK.has(t[Y][X])) continue; reach[Y * W + X] = 1; q.push([X, Y]); } }
  const ok = (x, y) => reach[y * W + x] || [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => reach[(y + dy) * W + x + dx]);
  const free = []; for (let y = 4; y < H - 4; y++) for (let x = 4; x < W - 4; x++) if (reach[y * W + x] && (t[y][x] === '.' || t[y][x] === '"')) free.push([x, y]);
  const R = rng(hashStr(m.id + ':reloc'));
  m.npcs = m.npcs.filter(n => {
    if (ok(n.x, n.y)) return true;
    if (n.kind === 'deco' || !free.length) return false;
    for (let k = 0; k < 40; k++) { const p = free[Math.floor(R() * free.length)]; if (!m.npcs.some(o => o.x === p[0] && o.y === p[1])) { n.x = p[0]; n.y = p[1]; return true; } }
    return false;
  });
  m.sideReach = reach;
}

// même dentelle de côte que la vraie carte
const _shapeCoastSide = shapeCoast;
shapeCoast = function (m, id) { const S = SIDE_WORLDS[m.reg]; return _shapeCoastSide(m, S && S.base ? WORLD_ID(S.base) : id); };
