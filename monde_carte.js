'use strict';
/* ============================================================
   ÉCLOSIA — Carte du monde
   Les seize régions du présent réunies sur une seule carte :
   chaque terre est dessinée à partir de sa vraie carte en jeu
   (relief, biomes, chemins, villes), à sa place autour de son
   continent. On touche une région pour la lire, puis on l'ouvre
   pour voir sa carte détaillée (et s'y envoler).
   ============================================================ */
// position de chaque région sur la carte du monde, en cases
const WORLD_LAYOUT = {
  solvene: [100, 60], qt2: [124, 4], qt0: [64, 112], qt3: [206, 96], qt1: [124, 236],
  brumaire: [330, 92], qt4: [340, 8], qt6: [402, 8], qt5: [484, 22], qt7: [484, 118], qt8: [350, 222], qt9: [432, 226],
};
const WORLD_CONT = { solvene: 'A', qt0: 'A', qt1: 'A', qt2: 'A', qt3: 'A' };
const WORLD_SPECIAL = { echos: ['solvene', 't7', "Grotte des Échos"], ruine: ['brumaire', 'u0', 'Nacre en ruine', -26, 12], racines: ['brumaire', 's7', 'Profondeurs de la Graine'], tour: ['brumaire', 's9', "Tour d'Elio"] };
const REGION_LORE = {
  solvene: "La grande route du héros : de Bourg-Aurore jusqu'à la Tour du Zénith, à travers les quatre terres et leurs huit arènes.",
  qt0: "Verdeval : prairies, vergers et villages paisibles. On y répète que les Quatre Terres ne formaient autrefois qu'un seul continent.",
  qt1: "Azurie : une côte de ports aux pontons de bois, où les filets sèchent au soleil. Les créatures Eau adorent ses quais.",
  qt2: "Givrecime : des hameaux de montagne battus par la neige, où l'hiver ne finit jamais.",
  qt3: "Ferrhaven : la terre des usines au milieu des dunes, où les cheminées ne dorment jamais.",
  brumaire: "Le continent né il y a dix ans de la Graine-Monde. La route va de Port-Sève jusqu'au Mont Éveil. Ici, les créatures s'appellent des Éclos.",
  qt4: "Toundra Givrée : avant la Germination, une île perdue dans les glaces. Les bourgs vivent sous les aurores.",
  qt5: "Sanctuaire des Érables : des temples aux toits rouges. Les érables ont rougi la nuit de la Germination et ne sont jamais redevenus verts.",
  qt6: "Haut-Valmont : les villes d'art d'Éclosia, pleines de musique et de jardins, accrochées aux montagnes.",
  qt7: "Archipel Braise : des cités bâties sur la roche volcanique. Les volcans grondent depuis que l'Ordre Racine fouille les cratères.",
  qt8: "Plaine de l'Aube : des champs dorés et des moulins. Au nord, une clairière garde le Cœur de la Graine.",
  qt9: "Îles Soleil : lagons, cocotiers et surf du matin au soir. Le Lagon-Bleu cacherait une créature légendaire.",
  echos: "Une grotte où chaque cri revient changé : elle te renvoie ton nom avec ta voix d'enfant. Accès : une fissure près de Givrecime.",
  ruine: "L'île d'Aurèle après la vague de la Germination. Personne n'y vit plus. Accès : une barque depuis Port-Sève.",
  racines: "Sous le Cœur de la Graine, des racines qui écoutent et chuchotent. Accès : les Racines du Monde.",
  tour: "Mille marches, une par année : là où Elio, le premier dresseur, gardait le temps. Accès : le sommet du Mont Éveil.",
};
const WMAP_PX = 3; // pixels par case de la carte du monde
let WMAP = null;
function worldMapBase() {
  if (WMAP) return WMAP;
  const regs = Object.keys(WORLD_LAYOUT).filter(rk => REGIONS[rk]);
  let W = 0, H = 0; const box = {};
  for (const rk of regs) { const b = illBase(rk), [ox, oy] = WORLD_LAYOUT[rk]; box[rk] = { x: ox, y: oy, w: b.m.w, h: b.m.h, b }; W = Math.max(W, ox + b.m.w + 10); H = Math.max(H, oy + b.m.h + 10); }
  const S = WMAP_PX, c = mkCanvas(W * S, H * S), x = c.getContext('2d'), R = rng(77);
  x.fillStyle = '#2a6aa2'; x.fillRect(0, 0, W * S, H * S);
  x.strokeStyle = 'rgba(255,255,255,.16)'; x.lineWidth = 1.5; for (let i = 0; i < 260; i++) { const sx = R() * W * S, sy = R() * H * S; x.beginPath(); x.moveTo(sx, sy); x.quadraticCurveTo(sx + 5, sy - 3, sx + 10, sy); x.stroke(); }
  const tint = (mask, col) => { const c2 = mkCanvas(mask.width, mask.height), g2 = c2.getContext('2d'); g2.drawImage(mask, 0, 0); g2.globalCompositeOperation = 'source-in'; g2.fillStyle = col; g2.fillRect(0, 0, c2.width, c2.height); return c2; };
  for (const rk of regs) {
    const bx = box[rk], { b, x: ox, y: oy } = bx, m = b.m, MGp = b.MG * ILL_PX, lw = m.w * ILL_PX, lh = m.h * ILL_PX;
    // masque de la terre (côtes adoucies)
    const small = mkCanvas(m.w, m.h), sg = small.getContext('2d'), id = sg.createImageData(m.w, m.h);
    for (let i = 0; i < m.w * m.h; i++) { const land = !(m.seaMask && m.seaMask[i]); id.data[i * 4] = id.data[i * 4 + 1] = id.data[i * 4 + 2] = 255; id.data[i * 4 + 3] = land ? 255 : 0; }
    sg.putImageData(id, 0, 0);
    const mask = mkCanvas(m.w * S, m.h * S), mg = mask.getContext('2d'); mg.imageSmoothingEnabled = true; mg.imageSmoothingQuality = 'high'; mg.drawImage(small, 0, 0, m.w * S, m.h * S);
    const land = mkCanvas(m.w * S, m.h * S), lg = land.getContext('2d'); lg.drawImage(b.c, MGp, MGp, lw, lh, 0, 0, m.w * S, m.h * S); lg.globalCompositeOperation = 'destination-in'; lg.drawImage(mask, 0, 0);
    x.save(); x.shadowColor = 'rgba(255,250,230,.75)'; x.shadowBlur = 5; x.drawImage(land, ox * S, oy * S); x.restore();
    bx.hl = tint(mask, 'rgba(255,111,89,1)'); bx.dark = tint(mask, 'rgba(18,28,44,1)');
  }
  // liaison du ferry : Port-Corail → Port-Sève
  const pt = (rk, id) => { const bx = box[rk]; if (!bx) return null; const m = bx.b.m, p = m.plots[id] ? [m.plots[id].cx, m.plots[id].cy] : m.wpos[id] || (m.arches && m.arches[id]); return p ? [bx.x + p[0], bx.y + p[1]] : null; };
  const a = pt('solvene', 't3'), z = pt('brumaire', 'u0');
  if (a && z) { x.strokeStyle = 'rgba(255,255,255,.85)'; x.lineWidth = 3; x.setLineDash([4, 8]); x.lineCap = 'round'; x.beginPath(); x.moveTo(a[0] * S, a[1] * S); x.quadraticCurveTo((a[0] + z[0]) / 2 * S, Math.max(a[1], z[1]) * S + 40, z[0] * S, z[1] * S); x.stroke(); x.setLineDash([]); }
  const spec = {};
  for (const sk in WORLD_SPECIAL) { const [rk, id, , dx, dy] = WORLD_SPECIAL[sk], p = pt(rk, id) || pt(rk, 'u8'); if (p && REGIONS[sk]) spec[sk] = [p[0] + (dx || 3), p[1] + (dy || -3)]; }
  return (WMAP = { c, W, H, box, regs, spec, pt, ferry: a && z ? [a, z] : null });
}
function regionOfHere() {
  const m = RT.map; if (!m) return null; const id = m.kind === 'int' ? m.parent : m.id;
  if (m.world) return m.reg; return REGION_OF[id] || m.reg || null;
}
function worldOverview() {
  return new Promise(res => {
    const WM = worldMapBase(), S = WMAP_PX;
    const p = el('panel galar', 0, 0, 240, 160);
    p.innerHTML = `<canvas></canvas><div class="gtitle">Carte du monde</div><div class="ginfo"></div>
      <div class="gbtn"><button type="button" data-z="1" aria-label="Zoomer">+</button><button type="button" data-z="o">Ouvrir</button><button type="button" data-z="-1" aria-label="Dézoomer">−</button><button type="button" data-z="x">Fermer</button></div>`;
    const cv = p.querySelector('canvas'), info = p.querySelector('.ginfo'), dpr = Math.min(3, window.devicePixelRatio || 1);
    let vw = 0, vh = 0;
    const fit = () => { const r = p.getBoundingClientRect(); vw = r.width; vh = r.height; cv.width = Math.round(vw * dpr); cv.height = Math.round(vh * dpr); cv.style.width = vw + 'px'; cv.style.height = vh + 'px'; };
    fit();
    const here = regionOfHere(), hereRk = WM.box[here] ? here : (WORLD_SPECIAL[here] ? WORLD_SPECIAL[here][0] : null);
    const side = Math.min(90, vw * 0.14);
    let zoom = Math.min((vw - side) / WM.W, (vh - 96) / WM.H) * 0.98, minZ = zoom * 0.9, maxZ = zoom * 8, cx = WM.W / 2 + side / 2 / zoom, cy = WM.H / 2 + 6 / zoom;
    const items = WM.regs.concat(Object.keys(WM.spec));
    let sel = here && items.includes(here) ? here : hereRk;
    const W2S = (wx, wy) => [(wx - cx) * zoom + vw / 2, (wy - cy) * zoom + vh / 2];
    const FF = getComputedStyle(document.body).fontFamily;
    const label = (g, t, x0, y0, size, col, al) => { g.font = `700 ${size}px ${FF}`; g.textAlign = al || 'center'; g.lineWidth = Math.max(2.5, size / 3.5); g.strokeStyle = 'rgba(16,22,30,.9)'; g.strokeText(t, x0, y0); g.fillStyle = col || '#fff8e8'; g.fillText(t, x0, y0); };
    const centerOf = rk => { if (WM.spec[rk]) return WM.spec[rk]; const b = WM.box[rk]; return [b.x + b.w / 2, b.y + b.h / 2]; };
    const meAt = () => {
      if (!hereRk) return null; const b = WM.box[hereRk], m = b.b.m;
      if (RT.map.world && RT.map.reg === hereRk) return [b.x + RT.P.x, b.y + RT.P.y];
      const id = RT.map.kind === 'int' ? RT.map.parent : RT.map.id, q = m.plots[id] ? [m.plots[id].cx, m.plots[id].cy] : m.wpos[id];
      return q ? [b.x + q[0], b.y + q[1]] : [b.x + b.w / 2, b.y + b.h / 2];
    };
    const me = meAt();
    const draw = () => {
      const g = cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.fillStyle = '#2a6aa2'; g.fillRect(0, 0, vw, vh);
      const k = zoom / S, [bx, by] = W2S(0, 0); g.imageSmoothingEnabled = true; g.drawImage(WM.c, bx, by, WM.c.width * k, WM.c.height * k);
      const t = performance.now() / 1000;
      // continents
      const [ax, ay] = W2S(46, -3), [ex, ey] = W2S(WM.W - 140, -3);
      label(g, 'Les Quatre Terres', ax, ay, 14, '#f2c14e', 'left'); label(g, 'Éclosia', ex, ey, 14, '#f2c14e', 'right');
      // villes principales quand on zoome
      if (zoom > minZ * 2.2) for (const rk of WM.regs) { const b = WM.box[rk], m = b.b.m; for (const tid in m.plots) { const [sx, sy] = W2S(b.x + m.plots[tid].cx, b.y + m.plots[tid].cy); g.fillStyle = G.visited[tid] ? '#fff8e8' : '#c8c0b0'; g.beginPath(); g.arc(sx, sy, 3.5, 0, 7); g.fill(); g.strokeStyle = '#3a2a18'; g.lineWidth = 1.2; g.stroke(); if (zoom > minZ * 3.5) label(g, TOWNS[tid].name, sx, sy + 13, 10); } }
      // régions
      for (const rk of WM.regs) {
        const b = WM.box[rk], [x0, y0] = W2S(b.x, b.y), w = b.w * zoom, h = b.h * zoom, vis = REGIONS[rk].chain.some(id => G.visited[id]);
        if (!vis) { g.globalAlpha = 0.38; g.drawImage(b.dark, x0, y0, w, h); g.globalAlpha = 1; }
        if (sel === rk) { g.globalAlpha = 0.22 + 0.1 * Math.sin(t * 5); g.drawImage(b.hl, x0, y0, w, h); g.globalAlpha = 1; }
        const nm = REGIONS[rk].name.split(' · ')[0], [lx, ly] = W2S(b.x + b.w / 2, b.y + b.h / 2);
        label(g, nm, lx, ly, Math.max(10, Math.min(16, zoom * 6)), vis ? '#fff8e8' : '#d8d0c0');
      }
      // lieux uniques
      for (const sk in WM.spec) { const [sx, sy] = W2S(...WM.spec[sk]), r = Math.max(6, zoom * 2.4); g.fillStyle = '#2a2238'; g.beginPath(); g.arc(sx, sy, r, 0, 7); g.fill(); g.strokeStyle = sel === sk ? '#ff6f59' : '#c8a8ff'; g.lineWidth = 2.5; g.stroke(); g.fillStyle = '#c8a8ff'; g.beginPath(); g.arc(sx, sy, r * 0.35, 0, 7); g.fill(); if (zoom > minZ * 1.6 || sel === sk) label(g, WORLD_SPECIAL[sk][2], sx, sy - r - 4, 10, '#e8d8ff'); }
      if (WM.ferry && zoom > minZ * 1.3) { const [fx, fy] = W2S((WM.ferry[0][0] + WM.ferry[1][0]) / 2, Math.max(WM.ferry[0][1], WM.ferry[1][1]) + 10); label(g, 'Ferry', fx, fy, 10); }
      // toi
      if (me) { const [sx, sy] = W2S(me[0], me[1]); g.fillStyle = 'rgba(255,111,89,.3)'; g.beginPath(); g.arc(sx, sy, 8 + (t * 18) % 12, 0, 7); g.fill(); g.fillStyle = '#ff6f59'; g.beginPath(); g.arc(sx, sy, 5, 0, 7); g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 2; g.stroke(); }
    };
    const showInfo = () => {
      if (!sel) { info.innerHTML = 'Touche une région pour la découvrir, puis « Ouvrir » pour sa carte détaillée.'; return; }
      const r = REGIONS[sel], vis = r.chain.some(id => G.visited[id]), nt = r.chain.filter(id => TOWNS[id]).length;
      const bio = WORLD_SPECIAL[sel] ? 'Lieu unique' : (typeof BIOMES !== 'undefined' && sel.startsWith('qt') ? BIOMES[QT_BIOME[sel]].name : 'Tous les climats');
      info.innerHTML = `<b>${esc(r.name.split(' · ')[0])}</b> · ${esc(bio)} · ${nt > 1 ? nt + ' villes' : 'lieu unique'}${vis ? '' : ' · inexplorée'}${sel === hereRk || sel === here ? ' · tu es ici' : ''}<br>${esc(REGION_LORE[sel] || '')}`;
    };
    showInfo();
    let raf = 0; const loop = () => { draw(); raf = requestAnimationFrame(loop); }; loop();
    const clampC = () => { cx = Math.max(0, Math.min(WM.W, cx)); cy = Math.max(0, Math.min(WM.H, cy)); };
    const setZoom = (f, ax, ay) => { const wx = ax != null ? (ax - vw / 2) / zoom + cx : cx, wy = ay != null ? (ay - vh / 2) / zoom + cy : cy; zoom = Math.max(minZ, Math.min(maxZ, zoom * f)); if (ax != null) { cx = wx - (ax - vw / 2) / zoom; cy = wy - (ay - vh / 2) / zoom; } clampC(); };
    const pick = (px, py) => {
      const wx = (px - vw / 2) / zoom + cx, wy = (py - vh / 2) / zoom + cy;
      for (const sk in WM.spec) { const [sx, sy] = W2S(...WM.spec[sk]); if ((sx - px) ** 2 + (sy - py) ** 2 < Math.max(14, zoom * 3) ** 2) { sel = sk; sfx('select'); showInfo(); return; } }
      let hit = null, bd = 1e9;
      for (const rk of WM.regs) { const b = WM.box[rk], lx = Math.floor(wx - b.x), ly = Math.floor(wy - b.y), m = b.b.m; if (lx >= 0 && ly >= 0 && lx < b.w && ly < b.h && !(m.seaMask && m.seaMask[ly * m.w + lx])) { hit = rk; break; } const d = (wx - b.x - b.w / 2) ** 2 + (wy - b.y - b.h / 2) ** 2; if (d < bd) { bd = d; if (d < (Math.min(b.w, b.h) * 0.6) ** 2) hit = hit || rk; } }
      if (hit) { if (sel === hit) { open(); return; } sel = hit; sfx('select'); showInfo(); }
    };
    const pts = new Map(); let moved = 0, pinch0 = 0;
    cv.addEventListener('pointerdown', e => { cv.setPointerCapture(e.pointerId); pts.set(e.pointerId, [e.offsetX, e.offsetY]); moved = 0; if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch0 = Math.hypot(a[0] - b[0], a[1] - b[1]); } });
    cv.addEventListener('pointermove', e => {
      if (!pts.has(e.pointerId)) return; const pr = pts.get(e.pointerId), nx = e.offsetX, ny = e.offsetY;
      if (pts.size === 1) { cx -= (nx - pr[0]) / zoom; cy -= (ny - pr[1]) / zoom; moved += Math.abs(nx - pr[0]) + Math.abs(ny - pr[1]); clampC(); }
      pts.set(e.pointerId, [nx, ny]);
      if (pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (pinch0) setZoom(d / pinch0, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); pinch0 = d; moved = 99; }
    });
    cv.addEventListener('pointerup', e => { if (pts.size === 1 && moved < 6) pick(e.offsetX, e.offsetY); pts.delete(e.pointerId); pinch0 = 0; });
    cv.addEventListener('pointercancel', e => pts.delete(e.pointerId));
    cv.addEventListener('wheel', e => { e.preventDefault(); setZoom(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.offsetX, e.offsetY); }, { passive: false });
    const close = v => { cancelAnimationFrame(raf); uiPop(h); p.remove(); res(v); };
    const open = () => { if (!sel) return; sfx('select'); close({ open: sel }); };
    p.querySelector('.gbtn').addEventListener('click', e => {
      const z = e.target.dataset && e.target.dataset.z; if (z == null) return;
      if (z === '1') setZoom(1.4); else if (z === '-1') setZoom(1 / 1.4); else if (z === 'o') open(); else if (z === 'x') close(false);
    });
    const h = { press(b) {
      if (b === 'left' || b === 'right' || b === 'up' || b === 'down') {
        const i = Math.max(0, items.indexOf(sel)); sel = items[(i + (b === 'right' || b === 'down' ? 1 : items.length - 1)) % items.length];
        const c0 = centerOf(sel); if (zoom > minZ * 1.5) { cx = c0[0]; cy = c0[1]; } sfx('select'); showInfo();
      } else if (b === 'a') open(); else if (b === 'b') close(false);
    } };
    uiPush(h);
  });
}
// le menu « Carte » ouvre d'abord le monde, puis la région choisie
atlasScreen = async function () {
  for (;;) {
    const r = await worldOverview();
    if (!r || !r.open) return false;
    if (!REGIONS[r.open]) continue;
    const flew = await illustratedMap(r.open);
    if (flew) return true;
  }
};
