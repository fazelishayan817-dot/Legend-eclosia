'use strict';
/* ============================================================
   ÉCLOSIA — Biomes des deux continents
   Chaque ville donne son climat aux terres qui l'entourent :
   neige, volcan, plage, jungle, montagne, désert, marais, forêt d'automne, prairie.
   Le décor, les couleurs, la météo et les créatures sauvages suivent le biome.
   ============================================================ */
Object.assign(MPAL, {
  volcan: { g: '#4e4440', g2: '#433a36', g3: '#5c504a', p: '#8a7c6c', p2: '#786a5c', tr: '#4a3428', tr2: '#33241c', tr3: '#6a4a34', trk: '#2a1a14', ol: '#140c0a', w: '#e2521c', w2: '#ffb040', tg: '#7a6a44', tg2: '#5a4c30', s: '#3a3230', rk: '#4e4440' },
  jungle: { g: '#4aa84a', g2: '#3c9640', g3: '#62c060', p: '#b89a62', p2: '#a08450', tr: '#1e7a3a', tr2: '#125a2a', tr3: '#3aa858', trk: '#5a3a1e', ol: '#0a2a14', w: '#2aa0a8', w2: '#7ad8d0', tg: '#2e8a3a', tg2: '#1e6a2a', s: '#d8c890', rk: '#7a8a6a' },
  plage: { g: '#a8d880', g2: '#98c870', g3: '#bce494', p: '#f2e0a8', p2: '#e4cc8a', tr: '#4aa850', tr2: '#348a3e', tr3: '#7ad070', trk: '#a8804a', ol: '#2a3a1a', w: '#2ab4e0', w2: '#9aecff', tg: '#7ab85a', tg2: '#5a9a44', s: '#f6e6b4', rk: '#c8b8a0' },
  desert: { g: '#e2c88a', g2: '#d4b878', g3: '#eed8a0', p: '#d8b070', p2: '#c49a5a', tr: '#6a9a4a', tr2: '#4e7a34', tr3: '#94c060', trk: '#8a6a40', ol: '#4a3218', w: '#3a9ad0', w2: '#8ad0f0', tg: '#b8a058', tg2: '#9a8442', s: '#f0dca8', rk: '#b8946a' },
  montagne: { g: '#8a9a84', g2: '#7a8a76', g3: '#9aaa94', p: '#b0a898', p2: '#9a9284', tr: '#2e5a48', tr2: '#1e4436', tr3: '#4a7a62', trk: '#4a3a2e', ol: '#162420', w: '#5a8ac0', w2: '#9ac0e0', tg: '#6a8a62', tg2: '#506e4a', s: '#c8c4b8', rk: '#7a7a80' },
  marais: { g: '#6a8a5a', g2: '#5a7a4c', g3: '#7a9a68', p: '#8a7a5a', p2: '#76684a', tr: '#3a5a3a', tr2: '#2a442a', tr3: '#5a7a4a', trk: '#3a2e22', ol: '#141e14', w: '#4a6a52', w2: '#7a9a7a', tg: '#4e6e3e', tg2: '#3a562e', s: '#9a8e6a', rk: '#6a6a5a' },
});
const BIOMES = {
  prairie: { name: 'Prairies', pal: null, types: ['normal', 'vent', 'flore'] },
  neige: { name: 'Terres enneigées', pal: 'neige', types: ['givre', 'eau'] },
  volcan: { name: 'Terres volcaniques', pal: 'volcan', types: ['feu', 'roc'] },
  plage: { name: 'Côte ensoleillée', pal: 'plage', types: ['eau', 'vent'] },
  jungle: { name: 'Jungle', pal: 'jungle', types: ['flore', 'toxine'] },
  montagne: { name: 'Montagnes', pal: 'montagne', types: ['roc', 'combat', 'dragon'] },
  desert: { name: 'Désert', pal: 'desert', types: ['roc', 'feu', 'foudre'] },
  marais: { name: 'Marais', pal: 'marais', types: ['toxine', 'eau', 'ombre'] },
  automne: { name: "Forêt d'automne", pal: 'automne', types: ['flore', 'esprit', 'ombre'] },
};
const TOWN_BIOME = {
  t0: 'prairie', t1: 'jungle', t2: 'montagne', t3: 'plage', t4: 'marais', t5: 'volcan', t6: 'desert', t7: 'neige', t8: 'montagne', t9: 'montagne',
  u0: 'plage', u1: 'desert', u2: 'neige', u3: 'automne', u4: 'automne', u5: 'automne', u6: 'jungle', u7: 'plage', u8: 'volcan', u9: 'montagne',
};
// les dix régions des Quatre Terres (Chronoportail) reçoivent aussi leur climat
const QT_BIOME = { qt0: 'prairie', qt1: 'plage', qt2: 'neige', qt3: 'desert', qt4: 'neige', qt5: 'automne', qt6: 'montagne', qt7: 'volcan', qt8: 'prairie', qt9: 'jungle' };
for (const rk in QT_BIOME) { const b = BIOMES[QT_BIOME[rk]]; if (REGIONS[rk] && b.pal) REGIONS[rk].pal = b.pal; }
const BIOME_IDS = Object.keys(BIOMES);
function townBiome(id) { return TOWN_BIOME[id] || QT_BIOME[REGION_OF[id]] || 'prairie'; }
// palette d'une ville : celle de son biome (sauf si la ville en avait déjà une)
function townPal(id) { const d = TOWNS[id]; if (!d || d.pal) return null; const b = BIOMES[townBiome(id)]; return b && b.pal; }

/* ---------- Carte des biomes du continent ---------- */
const _genWorldBio = genWorld;
genWorld = function (id) {
  const m = _genWorldBio(id);
  const rk = id.slice(3), towns = Object.keys(m.plots || {}); if (!towns.length) return m;
  const W = m.w, H = m.h, N = vnoise(hashStr(id + ':biome') % 977 + 3), grid = new Uint8Array(W * H);
  const centers = towns.map(t => [m.plots[t].cx, m.plots[t].cy, BIOME_IDS.indexOf(townBiome(t))]);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const wx = x + (N(x, y, 9) - 0.5) * 26, wy = y + (N(x + 300, y + 300, 9) - 0.5) * 26;
    let best = 0, bd = 1e12; for (const c of centers) { const d = (c[0] - wx) ** 2 + (c[1] - wy) ** 2; if (d < bd) { bd = d; best = c[2]; } }
    grid[y * W + x] = best;
  }
  m.biomeGrid = grid;
  m.biomeAt = (x, y) => BIOME_IDS[grid[Math.max(0, Math.min(H - 1, y)) * W + Math.max(0, Math.min(W - 1, x))]];
  m.palAt = (x, y) => BIOMES[m.biomeAt(x, y)].pal || m.pal;
  // le terrain prend le caractère du biome (on n'échange que praticable contre praticable, obstacle contre obstacle)
  const t = m.t, R = rng(hashStr(id + ':biomeT')), busy = new Set();
  for (const b of m.buildings) for (let y = b.y; y < b.y + b.h; y++) for (let x = b.x; x < b.x + b.w; x++) busy.add(x + ',' + y);
  for (const w of m.warps) busy.add(w.x + ',' + w.y);
  const nearWater = (x, y, r) => { for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const q = t[y + dy] && t[y + dy][x + dx]; if (q === '~') return true; } return false; };
  for (let y = 2; y < H - 2; y++) for (let x = 2; x < W - 2; x++) {
    if (busy.has(x + ',' + y)) continue;
    const c = t[y][x], b = m.biomeAt(x, y), r = R(), n = N(x * 3, y * 3, 5);
    if (b === 'volcan') {
      if (c === 'T') t[y][x] = r < 0.55 ? 'R' : 'T'; else if (c === 'b') t[y][x] = 'r';
      else if (c === 'f') t[y][x] = '.'; else if (c === '.' && n > 0.62) t[y][x] = 's';
    } else if (b === 'desert') {
      if (c === 'T') t[y][x] = r < 0.18 ? 'T' : r < 0.75 ? 'r' : 'R'; else if (c === 'b') t[y][x] = 'r';
      else if (c === '"') t[y][x] = r < 0.45 ? '"' : '.'; else if (c === 'f') t[y][x] = '.';
      else if (c === '.' && n > 0.55) t[y][x] = 's';
    } else if (b === 'plage') {
      if ((c === '.' || c === 'f') && nearWater(x, y, 3)) t[y][x] = 's';
    } else if (b === 'jungle') {
      if (c === '.' && r < 0.42) t[y][x] = '"'; else if (c === 'f' && r < 0.5) t[y][x] = '"';
    } else if (b === 'montagne') {
      if (c === 'T') t[y][x] = r < 0.5 ? 'R' : 'T'; else if (c === 'b') t[y][x] = 'r';
    } else if (b === 'neige') {
      if (c === 'f') t[y][x] = '.';
    } else if (b === 'marais') {
      if (c === '.' && r < 0.3) t[y][x] = '"'; else if (c === 'f') t[y][x] = '.';
    }
  }
  shapeCoast(m, id);
  // noms de zone avec le climat
  const zn = m.zoneName;
  if (zn) m.zoneName = (x, y) => zn(x, y) + ' · ' + BIOMES[m.biomeAt(x, y)].name;
  // créatures sauvages : le climat attire ses propres espèces
  const enc0 = m.encAt, ZB = {};
  if (enc0) m.encAt = (x, y) => {
    const base = enc0(x, y) || {}, b = m.biomeAt(x, y), z = m.zoneAt ? m.zoneAt(x, y) : null, k = b + '|' + (z ? z.r : '');
    if (ZB[k]) return ZB[k];
    const add = (tab, share) => {
      if (!tab || !tab.length) return tab;
      const lo = Math.min(...tab.map(e => e[1])), hi = Math.max(...tab.map(e => e[2])), tot = tab.reduce((a, e) => a + (e[3] || 20), 0);
      const pool = biomeSpecies(b, hi); if (!pool.length) return tab;
      const w = Math.max(1, Math.round(tot * share / pool.length));
      return tab.concat(pool.map(sp => [typeof evolveForLevel === 'function' ? evolveForLevel(sp, lo) : sp, lo, hi, w]));
    };
    return (ZB[k] = Object.assign({}, base, { grass: add(base.grass, 0.6), water: add(base.water, 0.4) }));
  };
  return m;
};
/* ---------- Côtes naturelles : la terre n'est plus un rectangle ---------- */
// silhouettes inspirées du vrai monde, sans le copier (coordonnées de 0 à 1)
const LAND_SHAPES = {
  // Quatre Terres : un vieux continent fendu, fjords au nord, botte au sud-est, golfe à l'ouest
  solvene: [[[0.18, 0.06], [0.34, 0.02], [0.5, 0.07], [0.62, 0.02], [0.8, 0.05], [0.94, 0.14], [0.86, 0.24], [0.97, 0.33], [0.9, 0.44], [0.98, 0.56], [0.9, 0.62], [0.95, 0.74], [0.86, 0.8], [0.9, 0.93], [0.78, 0.98], [0.68, 0.88], [0.56, 0.96], [0.42, 0.9], [0.3, 0.98], [0.16, 0.92], [0.06, 0.8], [0.12, 0.7], [0.03, 0.6], [0.2, 0.55], [0.08, 0.46], [0.04, 0.34], [0.12, 0.25], [0.05, 0.14]]],
  // Éclosia : un jeune continent large, péninsule au sud-est, grand golfe au sud, langue de terre au sud-ouest
  brumaire: [[[0.04, 0.22], [0.16, 0.08], [0.34, 0.03], [0.52, 0.06], [0.7, 0.02], [0.88, 0.1], [0.97, 0.26], [0.9, 0.4], [0.97, 0.54], [0.9, 0.66], [0.86, 0.97], [0.76, 0.8], [0.66, 0.84], [0.58, 0.7], [0.46, 0.74], [0.38, 0.86], [0.26, 0.98], [0.16, 0.86], [0.08, 0.72], [0.03, 0.52], [0.09, 0.38]]],
  qt2: [[[0.12, 0.94], [0.2, 0.6], [0.3, 0.3], [0.48, 0.08], [0.72, 0.03], [0.9, 0.14], [0.8, 0.34], [0.66, 0.52], [0.6, 0.78], [0.42, 0.97]]],
  qt0: [[[0.22, 0.06], [0.62, 0.03], [0.8, 0.28], [0.62, 0.48], [0.9, 0.72], [0.72, 0.97], [0.32, 0.92], [0.4, 0.62], [0.12, 0.42]], [[0.02, 0.5], [0.12, 0.46], [0.16, 0.66], [0.04, 0.7]]],
  qt3: [[[0.04, 0.12], [0.5, 0.04], [0.94, 0.1], [0.96, 0.42], [0.74, 0.6], [0.64, 0.96], [0.34, 0.84], [0.12, 0.54]]],
  qt1: [[[0.04, 0.08], [0.96, 0.05], [0.88, 0.34], [0.72, 0.3], [0.78, 0.62], [0.56, 0.96], [0.46, 0.56], [0.3, 0.9], [0.2, 0.5], [0.04, 0.44]], [[0.84, 0.72], [0.96, 0.7], [0.94, 0.86], [0.82, 0.88]]],
  qt4: [[[0.08, 0.06], [0.5, 0.02], [0.92, 0.1], [0.97, 0.5], [0.78, 0.96], [0.54, 0.76], [0.32, 0.96], [0.06, 0.62]]],
  qt6: [[[0.3, 0.03], [0.72, 0.05], [0.95, 0.4], [0.82, 0.97], [0.52, 0.9], [0.22, 0.7], [0.06, 0.3]]],
  qt5: [[[0.52, 0.02], [0.84, 0.1], [0.72, 0.36], [0.48, 0.3]], [[0.42, 0.36], [0.78, 0.42], [0.62, 0.7], [0.32, 0.62]], [[0.26, 0.66], [0.58, 0.74], [0.42, 0.98], [0.12, 0.86]]],
  qt7: [[[0.08, 0.04], [0.92, 0.08], [0.86, 0.46], [0.14, 0.42]], [[0.18, 0.5], [0.84, 0.54], [0.72, 0.97], [0.28, 0.92]]],
  qt8: [[[0.1, 0.08], [0.9, 0.04], [0.96, 0.6], [0.72, 0.97], [0.3, 0.95], [0.04, 0.56]]],
  qt9: [[[0.06, 0.08], [0.46, 0.04], [0.52, 0.36], [0.12, 0.42]], [[0.56, 0.12], [0.94, 0.18], [0.88, 0.5], [0.6, 0.46]], [[0.16, 0.54], [0.56, 0.58], [0.52, 0.96], [0.12, 0.9]], [[0.64, 0.58], [0.94, 0.64], [0.86, 0.94], [0.6, 0.88]]],
};
function shapeCoast(m, id) {
  const W = m.w, H = m.h, t = m.t, N = vnoise(hashStr(id + ':coast') % 991 + 5), sea = new Uint8Array(W * H), orig = t.map(r => r.slice());
  const keep = new Uint8Array(W * H), mark = (x, y, r) => { for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const X = x + dx, Y = y + dy; if (X >= 0 && Y >= 0 && X < W && Y < H) keep[Y * W + X] = 1; } };
  const OPEN = !!OPEN_REG[m.reg];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const c = t[y][x]; if (c === ',' || c === '=') mark(x, y, OPEN ? 2 : 0); else if (c === 'x' || c === 'D' || c === 'F' || c === 'S' || c === 'L') mark(x, y, OPEN ? 3 : 2); }
  if (OPEN_REG[m.reg]) { for (const w of m.warps) mark(w.x, w.y, 2); for (const n of m.npcs) mark(n.x, n.y, 1); }
  const SIL = LAND_SHAPES[m.reg], N2 = vnoise(hashStr(id + ':sil') % 983 + 9);
  const inPoly = (P, px, py) => { let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) c = !c; } return c; };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const d = Math.min(x, y, W - 1 - x, H - 1 - y);
    let out;
    if (SIL) { const jx = (N2(x, y, 9) - 0.5) * 0.09 + (N(x * 2, y * 2, 4) - 0.5) * 0.03, jy = (N2(x + 40, y + 40, 9) - 0.5) * 0.09 + (N(x * 2 + 9, y * 2, 4) - 0.5) * 0.03; out = !SIL.some(P => inPoly(P, x / W + jx, y / H + jy)) || d < 2; }
    else { const thr = 2.5 + N(x, y, 13) * 13 + N(x + 77, y + 31, 4) * 5; out = d < thr; }
    if ((out && !keep[y * W + x]) || d < 1) { sea[y * W + x] = 1; t[y][x] = '~'; }
  }
  const WALK = new Set(['.', '"', 'f', ',', '=', 's', 'D']);
  // îlots minuscules sans rien dessus : rendus à la mer
  { const seen = new Uint8Array(W * H);
    for (let i0 = 0; i0 < W * H; i0++) { if (sea[i0] || seen[i0]) continue; const comp = [i0], st = [i0]; seen[i0] = 1; let busy = false;
      while (st.length) { const i = st.pop(), x = i % W, y = (i / W) | 0; if (keep[i]) busy = true; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= W || Y >= H) continue; const k = Y * W + X; if (!sea[k] && !seen[k]) { seen[k] = 1; st.push(k); comp.push(k); } } }
      if (!busy && comp.length < 60) for (const i of comp) { sea[i] = 1; t[(i / W) | 0][i % W] = '~'; } } }
  // un monde qu'on parcourt à pied : on rouvre un petit isthme vers ce qui serait isolé
  if (OPEN_REG[m.reg] && m.plots) {
    const first = Object.values(m.plots)[0];
    for (let pass = 0; pass < 6 && first; pass++) {
      const reach = new Uint8Array(W * H), st = first.out.s, q = [st]; reach[st[1] * W + st[0]] = 1;
      while (q.length) { const [x, y] = q.pop(); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= W || Y >= H || reach[Y * W + X] || !WALK.has(t[Y][X])) continue; reach[Y * W + X] = 1; q.push([X, Y]); } }
      const lost = m.npcs.filter(n => !reach[n.y * W + n.x] && ![[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => reach[(n.y + dy) * W + n.x + dx]) && WALK.has(orig[n.y][n.x]));
      if (!lost.length) break;
      for (const n of lost) {
        const prev = new Int32Array(W * H).fill(-1), q2 = [n.y * W + n.x]; prev[q2[0]] = q2[0]; let end = -1;
        for (let qi = 0; qi < q2.length && end < 0; qi++) { const i = q2[qi], x = i % W, y = (i / W) | 0; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = x + dx, Y = y + dy; if (X < 1 || Y < 1 || X >= W - 1 || Y >= H - 1) continue; const k = Y * W + X; if (prev[k] >= 0 || !WALK.has(orig[Y][X])) continue; prev[k] = i; if (reach[k]) { end = k; break; } q2.push(k); } }
        for (let i = end; i >= 0 && prev[i] !== i; i = prev[i]) { const x = i % W, y = (i / W) | 0; for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1]]) { const k = (y + dy) * W + x + dx; if (sea[k]) { sea[k] = 0; t[y + dy][x + dx] = orig[y + dy][x + dx]; } } }
      }
    }
  }
  // plages le long de la mer
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    if (sea[y * W + x]) continue; const c = t[y][x], nb = sea[y * W + x - 1] || sea[y * W + x + 1] || sea[(y - 1) * W + x] || sea[(y + 1) * W + x];
    if (!nb) continue;
    if (c === '.' || c === '"' || c === 'f') t[y][x] = 's'; else if (c === 'T' || c === 'b') t[y][x] = 'r';
  }
  m.seaMask = sea;
  const pa = m.palAt; if (pa) m.palAt = (x, y) => (sea[Math.max(0, Math.min(H - 1, y)) * W + Math.max(0, Math.min(W - 1, x))] ? (BIOMES.plage.pal) : pa(x, y));
}
const BIO_SP = {}, STARTER_LINES = new Set(['feuillon', 'brasille', 'clapotin']);
function biomeSpecies(b, lvl) {
  const k = b + ':' + (lvl > 30 ? 2 : lvl > 15 ? 1 : 0); if (BIO_SP[k]) return BIO_SP[k];
  const types = BIOMES[b].types, out = [];
  for (const id of DEX) {
    const s = SP[id]; if (!s || s.prev || !s.types || !(s.stage === '1' || s.stage === 'u') || STARTER_LINES.has(s.line)) continue;
    if (s.types[0] === types[0] || (types[1] && s.types.includes(types[1]) && s.types[0] === types[1])) out.push(id);
  }
  // un échantillon stable de quelques espèces par biome
  const R = rng(hashStr(k)), pick = [];
  while (out.length && pick.length < 6) pick.push(out.splice(Math.floor(R() * out.length), 1)[0]);
  return (BIO_SP[k] = pick);
}

/* ---------- Rendu du continent : chaque case avec la palette de son biome ---------- */
chunkCanvas = function (m, cx, cy, f) {
  const key = HD + ':' + m.id + ':' + cx + ':' + cy + ':' + f;
  if (CHUNK_CACHE.has(key)) { const c = CHUNK_CACHE.get(key); CHUNK_CACHE.delete(key); CHUNK_CACHE.set(key, c); return c; }
  const px = CHUNK * TS * HD, c = mkCanvas(px, px), x = c.getContext('2d');
  x.scale(HD, HD); x.translate(-cx * CHUNK * TS, -cy * CHUNK * TS);
  const x0 = cx * CHUNK, y0 = cy * CHUNK, x1 = Math.min(m.w, x0 + CHUNK), y1 = Math.min(m.h, y0 + CHUNK), pa = m.palAt || (() => m.pal);
  for (let y = y0; y < y1; y++) for (let xx = x0; xx < x1; xx++) x.drawImage(tileHD(m.t[y][xx], pa(xx, y), hashStr(xx + ',' + y) % 4, f), xx * TS, y * TS, TS, TS);
  if (m.palAt) { for (let y = y0; y < y1; y++) for (let xx = x0; xx < x1; xx++) softenEdges(x, m, getPal(pa(xx, y)), xx, y, xx + 1, y + 1); }
  else softenEdges(x, m, getPal(m.pal), x0, y0, x1, y1);
  for (const b of m.buildings) if (b.x < x1 + 1 && b.x + b.w > x0 - 1 && b.y < y1 + 1 && b.y + b.h > y0 - 1) drawBuilding(x, b);
  CHUNK_CACHE.set(key, c);
  while (CHUNK_CACHE.size > (HD >= 4 ? 16 : 48)) CHUNK_CACHE.delete(CHUNK_CACHE.keys().next().value);
  return c;
};

/* ---------- La lave ne se traverse pas ---------- */
function lavaAt(x, y) { const m = RT.map; return !!(m && m.biomeAt && m.biomeAt(x, y) === 'volcan' && tileAt(x, y) === '~' && !(m.seaMask && m.seaMask[y * m.w + x])); }
const _interactBio = interact;
interact = async function () {
  const [fx, fy] = facing();
  if (lavaAt(fx, fy) && !RT.P.surf) return say("De la lave en fusion. Même une créature Eau n'oserait pas s'y aventurer.");
  return _interactBio();
};
const _tryStepBio = tryStep;
tryStep = function (d) {
  const P = RT.P, [dx, dy] = DXY[d];
  if (P.surf && lavaAt(P.x + dx, P.y + dy)) { bump(); return; }
  return _tryStepBio(d);
};
// combats : décor neigeux dans les terres enneigées
const _envHereBio = envHere;
envHere = function () { const m = RT.map; if (m && m.biomeAt && !RT.P.surf && m.biomeAt(RT.P.x, RT.P.y) === 'neige') return 'snow'; return _envHereBio(); };

/* ---------- À l'arrivée : jamais dans la mer, jamais coincé dans une époque du Sablier (retiré) ---------- */
const _enterMapBio = enterMap;
enterMap = async function (id, x, y, ...rest) {
  if (G && G.era && G.era.gen) G.era = null;
  const m = getMap(id);
  if (m && m.seaMask && x != null && y != null && m.seaMask[y * m.w + x]) {
    const WALK = new Set(['.', '"', 'f', ',', 's']); let best = null, bd = 1e9;
    for (let yy = 0; yy < m.h; yy++) for (let xx = 0; xx < m.w; xx++) if (!m.seaMask[yy * m.w + xx] && WALK.has(m.t[yy][xx])) { const d = (xx - x) ** 2 + (yy - y) ** 2; if (d < bd) { bd = d; best = [xx, yy]; } }
    if (best) [x, y] = best;
  }
  return _enterMapBio(id, x, y, ...rest);
};
