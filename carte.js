'use strict';
/* ============================================================
   ÉCLOSIA — Carte illustrée du continent
   Une grande carte peinte, qu'on fait glisser et qu'on zoome :
   relief, forêts, lacs, villes en médaillons, chemins, bandes,
   ta position et ton objectif. Dessin original.
   ============================================================ */
const ILL_CACHE = {};
const ILL_PX = 10; // pixels par case dans l'image de base
function illBase(rk) {
  if (ILL_CACHE[rk]) return ILL_CACHE[rk];
  const m = getMap(WORLD_ID(rk)), P = getPal(m.pal), MG = 18, ILL_P0 = P;
  const W = (m.w + MG * 2) * ILL_PX, H = (m.h + MG * 2) * ILL_PX;
  const c = mkCanvas(W, H), x = c.getContext('2d');
  const N = vnoise(hashStr(rk + ':ill')), R = rng(hashStr(rk + ':illr'));
  // océan
  const SEA = { cendre: ['#8a8478', '#3a3430', '#b8ac94'], neo: ['#9af0ff', '#3ab8d8', '#fff4dc'], unae: ['#7ab8e8', '#2a5a9a', '#f4e4b0'], envers: ['#5a3a4a', '#1a0a1a', '#8a7068'], reve: ['#d8c0ff', '#4a3a8a', '#f4e8ff'], passe: ['#d8c8a0', '#8a7a5a', '#ecdcb0'], ruine: ['#5a7a8a', '#1a3a4a', '#b8b0a0'], racines: ['#2a3a3a', '#0a1414', '#5a6a5a'], tour: ['#a8b8e8', '#3a4a8a', '#f0e8d0'], echos: ['#6a6a7a', '#2a2a3a', '#a8a098'] }[rk] || ['#6ab8d8', '#2a5a8a', '#e8dcb0'];
  const sea = x.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.2, W / 2, H / 2, Math.max(W, H) * 0.75);
  sea.addColorStop(0, SEA[0]); sea.addColorStop(1, SEA[1]); x.fillStyle = sea; x.fillRect(0, 0, W, H);
  x.strokeStyle = 'rgba(255,255,255,.18)'; x.lineWidth = 2;
  for (let i = 0; i < 160; i++) { const sx = R() * W, sy = R() * H; x.beginPath(); x.moveTo(sx, sy); x.quadraticCurveTo(sx + 8, sy - 4, sx + 16, sy); x.stroke(); }
  const ox = MG * ILL_PX, oy = MG * ILL_PX, S = ILL_PX;
  // côte : halo de sable et d'écume autour du continent
  if (!m.seaMask) { x.save(); x.shadowColor = 'rgba(255,255,255,.7)'; x.shadowBlur = 30; x.fillStyle = SEA[2];
  x.beginPath(); x.roundRect(ox - 14, oy - 14, m.w * S + 28, m.h * S + 28, 60); x.fill(); x.restore(); }
  if (!m.seaMask) for (let k = 0; k < 90; k++) { const a = k / 90 * Math.PI * 2, rx = m.w * S / 2 + 14, ry = m.h * S / 2 + 14; const px = ox + m.w * S / 2 + Math.cos(a) * rx * (0.98 + R() * 0.06), py = oy + m.h * S / 2 + Math.sin(a) * ry * (0.98 + R() * 0.06); x.fillStyle = SEA[2]; x.beginPath(); x.arc(px, py, 18 + R() * 16, 0, 7); x.fill(); }
  // sol avec relief ombré
  const SEAM = m.seaMask;
  for (let y = 0; y < m.h; y++) for (let xx = 0; xx < m.w; xx++) {
    if (SEAM && SEAM[y * m.w + xx]) continue;
    const ch = m.t[y][xx], h = N(xx, y, 9), sh = (N(xx + 1, y + 1, 9) - h) * 120, Q = m.palAt ? getPal(m.palAt(xx, y)) : P;
    let col = Q.g;
    if (ch === '~') col = Q === MPAL.volcan ? '#e2521c' : '#4a9ad0'; else if (ch === 's') col = '#e8d8a0'; else if (ch === ',' || ch === '=') col = '#e8d4a0'; else if (ch === 'x' || ch === 'F') col = lhex(P.g, 0.2);
    else if (ch === 'r' || ch === 'R') col = dhex(Q.rk || Q.g, 0.05);
    else col = h > 0.6 ? dhex(Q.g, 0.08) : h < 0.35 ? lhex(Q.g, 0.1) : Q.g;
    if (ch === 'x' || ch === 'F') col = lhex(Q.g, 0.2);
    x.fillStyle = col; x.fillRect(ox + xx * S, oy + y * S, S + 0.5, S + 0.5);
    if (ch !== '~' && ch !== ',' && ch !== '=') { x.fillStyle = sh > 0 ? `rgba(255,255,230,${Math.min(0.25, sh / 30)})` : `rgba(20,30,20,${Math.min(0.25, -sh / 30)})`; x.fillRect(ox + xx * S, oy + y * S, S + 0.5, S + 0.5); }
  }
  // eau : reflets
  for (let y = 0; y < m.h; y++) for (let xx = 0; xx < m.w; xx++) if (m.t[y][xx] === '~' && !(SEAM && SEAM[y * m.w + xx]) && R() < 0.12) { x.strokeStyle = 'rgba(255,255,255,.45)'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(ox + xx * S, oy + y * S + 5); x.quadraticCurveTo(ox + xx * S + 5, oy + y * S + 2, ox + xx * S + 10, oy + y * S + 5); x.stroke(); }
  // forêts : couronnes d'arbres
  for (let y = 0; y < m.h; y++) for (let xx = 0; xx < m.w; xx++) {
    const ch = m.t[y][xx]; if (ch !== 'T' && ch !== 'b') continue;
    const P = m.palAt ? getPal(m.palAt(xx, y)) : ILL_P0;
    if (xx < 2 || y < 2 || xx >= m.w - 2 || y >= m.h - 2) { x.fillStyle = dhex(P.tr2, 0.1); x.fillRect(ox + xx * S, oy + y * S, S + 0.5, S + 0.5); continue; }
    const cx = ox + xx * S + S / 2 + (R() - 0.5) * 3, cy = oy + y * S + S / 2 + (R() - 0.5) * 3, r = S * (0.55 + R() * 0.25);
    x.fillStyle = 'rgba(0,20,0,.25)'; x.beginPath(); x.ellipse(cx + 2, cy + 3, r, r * 0.6, 0, 0, 7); x.fill();
    const gr = x.createRadialGradient(cx - r * 0.4, cy - r * 0.4, 1, cx, cy, r); gr.addColorStop(0, P.tr3); gr.addColorStop(0.6, P.tr); gr.addColorStop(1, P.tr2);
    x.fillStyle = gr; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
  }
  // herbes hautes : petites touffes
  for (let y = 0; y < m.h; y++) for (let xx = 0; xx < m.w; xx++) if (m.t[y][xx] === '"' && R() < 0.5) { x.strokeStyle = (m.palAt ? getPal(m.palAt(xx, y)) : P).tg2; x.lineWidth = 1; const bx = ox + xx * S + 5, by = oy + y * S + 8; x.beginPath(); x.moveTo(bx - 2, by); x.lineTo(bx - 1, by - 4); x.moveTo(bx, by); x.lineTo(bx, by - 5); x.moveTo(bx + 2, by); x.lineTo(bx + 1, by - 4); x.stroke(); }
  // chemins : trait clair bordé
  x.lineCap = 'round';
  for (const [w, col] of [[S * 0.9, 'rgba(120,90,50,.35)'], [S * 0.55, '#f6ead0']]) {
    x.strokeStyle = col; x.lineWidth = w; x.beginPath();
    for (let y = 0; y < m.h; y++) for (let xx = 0; xx < m.w; xx++) {
      if (m.t[y][xx] !== ',' && m.t[y][xx] !== '=') continue;
      const px = ox + xx * S + S / 2, py = oy + y * S + S / 2;
      if (xx + 1 < m.w && (m.t[y][xx + 1] === ',' || m.t[y][xx + 1] === '=')) { x.moveTo(px, py); x.lineTo(px + S, py); }
      if (y + 1 < m.h && (m.t[y + 1][xx] === ',' || m.t[y + 1][xx] === '=')) { x.moveTo(px, py); x.lineTo(px, py + S); }
    }
    x.stroke();
  }
  // ambiance d'époque
  if (rk === 'cendre') { for (let i = 0; i < 900; i++) { x.fillStyle = `rgba(60,50,45,${0.15 + R() * 0.25})`; x.beginPath(); x.arc(R() * W, R() * H, 1 + R() * 2.5, 0, 7); x.fill(); } }
  if (rk === 'reve') { for (let i = 0; i < 400; i++) { x.fillStyle = `rgba(255,255,255,${0.3 + R() * 0.6})`; x.fillRect(R() * W, R() * H, 2, 2); } }
  if (rk === 'unae' || rk === 'passe') { x.fillStyle = 'rgba(160,110,40,.14)'; x.fillRect(0, 0, W, H); }
  if (rk === 'envers') { x.fillStyle = 'rgba(80,0,30,.18)'; x.fillRect(0, 0, W, H); }
  return (ILL_CACHE[rk] = { c, m, MG, bg: SEA[1] });
}
function illustratedMap(rk0) {
  return new Promise(res => {
    const regs = Object.keys(REGIONS).filter(r => REGIONS[r].chain.some(id => G.visited[id]) || r === rk0);
    let rk = rk0;
    let { c: base, m, MG } = illBase(rk); const S = ILL_PX;
    const p = el('panel galar', 0, 0, 240, 160);
    p.innerHTML = `<canvas></canvas><div class="gtitle">${esc(REGIONS[rk].name)}</div><div class="ginfo"></div>
      <div class="gbtn"><button type="button" data-z="1" aria-label="Zoomer">+</button><button type="button" data-z="r" aria-label="Région suivante">Région ›</button><button type="button" data-z="-1" aria-label="Dézoomer">−</button><button type="button" data-z="0">Atlas</button><button type="button" data-z="x">Fermer</button></div>`;
    const cv = p.querySelector('canvas'), info = p.querySelector('.ginfo');
    const dpr = Math.min(3, window.devicePixelRatio || 1);
    let vw = 0, vh = 0;
    const fit = () => { const r = p.getBoundingClientRect(); vw = r.width; vh = r.height; cv.width = Math.round(vw * dpr); cv.height = Math.round(vh * dpr); cv.style.width = vw + 'px'; cv.style.height = vh + 'px'; };
    fit();
    // position du joueur sur le continent
    const cur = RT.map;
    const locateMe = () => { if (cur.world && cur.reg === rk) return [RT.P.x, RT.P.y]; const id = cur.kind === 'int' ? cur.parent : cur.id; if (m.wpos[id]) return m.wpos[id]; if (m.plots[id]) return [m.plots[id].cx, m.plots[id].cy]; return null; };
    let me = locateMe();
    let goal = null; try { const gg = gpsGoal(); let gm = gg.map; if (SPECIAL_RET[gm]) gm = SPECIAL_RET[gm].map; if (gm === 'u9') gm = 's9'; if (gm && m.wpos[gm]) goal = { p: m.wpos[gm], txt: gg.txt }; } catch (e) { }
    let zoom = Math.max(4, Math.min(vw / (m.w + MG), vh / (m.h + MG))), minZ = zoom * 0.9, maxZ = 34;
    let cx = me ? me[0] : m.w / 2, cy = me ? me[1] : m.h / 2;
    if (!me) zoom = minZ;
    let sel = null;
    const towns = Object.keys(m.plots);
    const W2S = (wx, wy) => [(wx - cx) * zoom + vw / 2, (wy - cy) * zoom + vh / 2];
    const FF = getComputedStyle(document.body).fontFamily;
    const label = (g, t, x0, y0, size, col) => { g.font = `600 ${size}px ${FF}`; g.textAlign = 'center'; g.lineWidth = Math.max(2, size / 4); g.strokeStyle = 'rgba(20,24,30,.85)'; g.strokeText(t, x0, y0); g.fillStyle = col || '#fff8e8'; g.fillText(t, x0, y0); };
    const draw = () => {
      const g = cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.imageSmoothingEnabled = true;
      g.fillStyle = ILL_CACHE[rk].bg; g.fillRect(0, 0, vw, vh);
      const k = zoom / S, [bx, by] = W2S(-MG, -MG);
      g.drawImage(base, bx, by, base.width * k, base.height * k);
      const t = performance.now() / 1000;
      // chemins balisés
      if (zoom > 7) for (const r in m.arches) { const [sx, sy] = W2S(m.arches[r][0], m.arches[r][1] - 2); g.fillStyle = '#8a7a5a'; g.beginPath(); g.roundRect(sx - zoom * 0.8, sy - zoom * 0.6, zoom * 1.6, zoom * 1.2, zoom * 0.3); g.fill(); if (zoom > 11) label(g, ROUTES[r].name, sx, sy - zoom * 0.9, Math.min(14, zoom * 0.55)); }
      // bandes
      for (const gg of GANGS.filter(q => q.reg === rk)) { const wp = m.wpos['gang_' + gg.id]; if (!wp) continue; const [sx, sy] = W2S(wp[0], wp[1] - 1); g.fillStyle = '#4a3a2a'; g.fillRect(sx - 1, sy - zoom * 1.6, 2, zoom * 1.6); g.fillStyle = gg.col; g.beginPath(); g.moveTo(sx + 1, sy - zoom * 1.6); g.lineTo(sx + zoom * 1.1, sy - zoom * 1.25); g.lineTo(sx + 1, sy - zoom * 0.9); g.fill(); if (zoom > 9) label(g, gg.name + (gangDone(gg.id) ? ' · trêve' : ''), sx, sy + zoom * 0.7, Math.min(13, zoom * 0.5), gangDone(gg.id) ? '#c8f0c8' : '#ffd0c8'); }
      // villes en médaillons
      for (const tid of towns) {
        const pl = m.plots[tid], [sx, sy] = W2S(pl.cx + 0.5, pl.cy), r = Math.max(9, zoom * 3.2), def = TOWNS[tid], vis = G.visited[tid];
        g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.arc(sx + 2, sy + 3, r, 0, 7); g.fill();
        g.fillStyle = vis ? '#fff8e8' : '#c8c0b0'; g.beginPath(); g.arc(sx, sy, r, 0, 7); g.fill();
        g.lineWidth = Math.max(2, r * 0.18); g.strokeStyle = def.gym != null ? TC[GYMS[def.gym].type] : '#5a7a6a'; g.stroke();
        g.fillStyle = def.gym != null && G.badges[def.gym] ? '#f2c14e' : '#7a5a3a';
        g.beginPath(); g.moveTo(sx - r * 0.45, sy + r * 0.3); g.lineTo(sx - r * 0.45, sy - r * 0.05); g.lineTo(sx, sy - r * 0.45); g.lineTo(sx + r * 0.45, sy - r * 0.05); g.lineTo(sx + r * 0.45, sy + r * 0.3); g.closePath(); g.fill();
        if (sel === tid) { g.strokeStyle = '#ff6f59'; g.lineWidth = 3; g.beginPath(); g.arc(sx, sy, r + 4 + Math.sin(t * 5) * 2, 0, 7); g.stroke(); }
        label(g, def.name, sx, sy + r + Math.min(16, Math.max(11, zoom * 0.6)) + 2, Math.min(16, Math.max(11, zoom * 0.6)));
      }
      // objectif
      if (goal) { const [sx, sy] = W2S(goal.p[0], goal.p[1]); g.strokeStyle = '#f2c14e'; g.lineWidth = 3; g.setLineDash([6, 4]); g.beginPath(); g.arc(sx, sy, 12 + Math.sin(t * 4) * 3, 0, 7); g.stroke(); g.setLineDash([]); }
      // toi
      if (me) { const [sx, sy] = W2S(me[0] + 0.5, me[1] + 0.5); g.fillStyle = 'rgba(255,111,89,.3)'; g.beginPath(); g.arc(sx, sy, 10 + (t * 20) % 14, 0, 7); g.fill(); g.fillStyle = '#ff6f59'; g.beginPath(); g.moveTo(sx, sy); g.arc(sx, sy - 14, 7, Math.PI * 0.8, Math.PI * 2.2); g.closePath(); g.fill(); g.fillStyle = '#fff'; g.beginPath(); g.arc(sx, sy - 14, 3, 0, 7); g.fill(); }
      // rose des vents
      const rx = vw - 34, ry = vh - 70; g.fillStyle = 'rgba(255,248,232,.85)'; g.beginPath(); g.arc(rx, ry, 18, 0, 7); g.fill(); g.fillStyle = '#c8553a'; g.beginPath(); g.moveTo(rx, ry - 15); g.lineTo(rx + 5, ry); g.lineTo(rx - 5, ry); g.fill(); g.fillStyle = '#3a4a5a'; g.beginPath(); g.moveTo(rx, ry + 15); g.lineTo(rx + 5, ry); g.lineTo(rx - 5, ry); g.fill(); label(g, 'N', rx, ry - 20, 11);
    };
    const showInfo = () => {
      if (!sel) { info.innerHTML = goal ? `<b>Objectif</b> ${esc(goal.txt)}` : 'Fais glisser la carte, zoome, et touche une ville.'; return; }
      const def = TOWNS[sel], gi = def.gym, here = (RT.map.kind === 'int' ? RT.map.parent : RT.map.id) === sel;
      const canGo = canFly() && G.visited[sel] && !here && RT.mode === 'overworld' && !REGIONS[rk].noFly;
      info.innerHTML = `<b>${esc(def.name)}</b> ${esc((def.desc || '').split(' : ').slice(1).join(' : '))}${gi != null ? `<br>${esc(GYMS[gi].leader)} · ${esc(GYMS[gi].badge)} ${G.badges[gi] ? '(obtenu)' : ''}` : ''}${canGo ? '<br><span class="go">A : s\'envoler ici</span>' : ''}`;
    };
    showInfo();
    let raf = 0; const loop = () => { draw(); raf = requestAnimationFrame(loop); }; loop();
    const clampC = () => { cx = Math.max(-MG / 2, Math.min(m.w + MG / 2, cx)); cy = Math.max(-MG / 2, Math.min(m.h + MG / 2, cy)); };
    const setZoom = (f, ax, ay) => { const wx = ax != null ? (ax - vw / 2) / zoom + cx : cx, wy = ay != null ? (ay - vh / 2) / zoom + cy : cy; zoom = Math.max(minZ, Math.min(maxZ, zoom * f)); if (ax != null) { cx = wx - (ax - vw / 2) / zoom; cy = wy - (ay - vh / 2) / zoom; } clampC(); };
    const pick = (px, py) => { let best = null, bd = 1e9; for (const tid of towns) { const [sx, sy] = W2S(m.plots[tid].cx, m.plots[tid].cy); const d = (sx - px) ** 2 + (sy - py) ** 2; if (d < bd) { bd = d; best = tid; } } if (bd < Math.max(40, zoom * 4) ** 2) { sel = best; sfx('select'); showInfo(); } };
    // toucher, glisser, pincer
    const pts = new Map(); let moved = 0, pinch0 = 0;
    cv.addEventListener('pointerdown', e => { cv.setPointerCapture(e.pointerId); pts.set(e.pointerId, [e.offsetX, e.offsetY]); moved = 0; if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch0 = Math.hypot(a[0] - b[0], a[1] - b[1]); } });
    cv.addEventListener('pointermove', e => {
      if (!pts.has(e.pointerId)) return; const pr = pts.get(e.pointerId), nx = e.offsetX, ny = e.offsetY;
      if (pts.size === 1) { cx -= (nx - pr[0]) / zoom; cy -= (ny - pr[1]) / zoom; moved += Math.abs(nx - pr[0]) + Math.abs(ny - pr[1]); clampC(); }
      pts.set(e.pointerId, [nx, ny]);
      if (pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (pinch0) setZoom(d / pinch0, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); pinch0 = d; moved = 99; }
    });
    const up = e => { if (pts.size === 1 && moved < 6) pick(e.offsetX, e.offsetY); pts.delete(e.pointerId); pinch0 = 0; };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', e => pts.delete(e.pointerId));
    cv.addEventListener('wheel', e => { e.preventDefault(); setZoom(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.offsetX, e.offsetY); }, { passive: false });
    const close = v => { cancelAnimationFrame(raf); uiPop(h); p.remove(); res(v); };
    const fly = async () => {
      if (!sel || !(canFly() && G.visited[sel] && RT.mode === 'overworld' && !REGIONS[rk].noFly)) return;
      cancelAnimationFrame(raf); uiPop(h); sfx('select');
      await fade(true, 300); p.remove(); await enterMap(sel, 13, 12, 'down'); await fade(false, 300); res(true);
    };
    p.querySelector('.gbtn').addEventListener('click', async e => {
      const z = e.target.dataset && e.target.dataset.z; if (z == null) return;
      if (z === 'r') { rk = regs[(regs.indexOf(rk) + 1) % regs.length]; ({ c: base, m, MG } = illBase(rk)); towns.length = 0; towns.push(...Object.keys(m.plots)); p.querySelector('.gtitle').textContent = REGIONS[rk].name; me = locateMe(); try { goal = null; const gg = gpsGoal(); let gm = gg.map; if (SPECIAL_RET[gm]) gm = SPECIAL_RET[gm].map; if (gm === 'u9') gm = 's9'; if (gm && m.wpos[gm]) goal = { p: m.wpos[gm], txt: gg.txt }; } catch (er) { } zoom = minZ = Math.max(3, Math.min(vw / (m.w + MG), vh / (m.h + MG))); cx = m.w / 2; cy = m.h / 2; sel = null; showInfo(); return; }
      if (z === '1') setZoom(1.4); else if (z === '-1') setZoom(1 / 1.4);
      else if (z === 'x') close(false);
      else if (z === '0') { close(false); await _atlasBase(); }
    });
    const h = { press(b) {
      const st = 40 / zoom;
      if (b === 'up') cy -= st; else if (b === 'down') cy += st; else if (b === 'left') cx -= st; else if (b === 'right') cx += st;
      else if (b === 'a') { if (sel && canFly() && G.visited[sel]) fly(); else pick(vw / 2, vh / 2); }
      else if (b === 'b') close(false);
      clampC();
    } };
    uiPush(h);
  });
}
const _atlasBase = atlasScreen;
atlasScreen = function () {
  const m = RT.map, id = m.kind === 'int' ? m.parent : m.id;
  const rk = m.world ? m.reg : REGION_OF[id] || m.reg;
  if (REGIONS[rk]) return illustratedMap(rk);
  return _atlasBase();
};
