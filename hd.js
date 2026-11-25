'use strict';
/* ============================================================
   ÉCLOSIA — Rendu HD : personnages détaillés et plus humains,
   décors arrondis (arbres, herbes, chemins, maisons). L'écran
   est rendu en 480×320 ; la logique du jeu reste en 240×160.
   ============================================================ */
/* Compatibilité : anciens navigateurs sans roundRect (iOS < 16, etc.) */
(function () {
  const add = proto => {
    if (!proto || proto.roundRect) return;
    proto.roundRect = function (x, y, w, h, r) {
      let a = Array.isArray(r) ? r : [r == null ? 0 : r];
      const [tl, tr, br, bl] = a.length === 1 ? [a[0], a[0], a[0], a[0]] : a.length === 2 ? [a[0], a[1], a[0], a[1]] : a.length === 3 ? [a[0], a[1], a[2], a[1]] : a;
      const m = v => Math.max(0, Math.min(v || 0, Math.abs(w) / 2, Math.abs(h) / 2));
      const A = m(tl), B = m(tr), C = m(br), D = m(bl);
      this.moveTo(x + A, y); this.lineTo(x + w - B, y); this.arcTo(x + w, y, x + w, y + B, B);
      this.lineTo(x + w, y + h - C); this.arcTo(x + w, y + h, x + w - C, y + h, C);
      this.lineTo(x + D, y + h); this.arcTo(x, y + h, x, y + h - D, D);
      this.lineTo(x, y + A); this.arcTo(x, y, x + A, y, A); this.closePath();
      return this;
    };
  };
  if (typeof CanvasRenderingContext2D !== 'undefined') add(CanvasRenderingContext2D.prototype);
  if (typeof OffscreenCanvasRenderingContext2D !== 'undefined') add(OffscreenCanvasRenderingContext2D.prototype);
  if (typeof Path2D !== 'undefined') add(Path2D.prototype);
})();
let HD = 2;    // décors : 16 × HD px par case (2 ou 4)
let SCR = 4;   // écran : 240 × SCR px de large (jusqu'à 3840, la 4K)
let PS = 4;    // personnages : 16 × PS px (jusqu'à 128)
function computeScale() {
  const cv = document.getElementById('cv'); if (!cv) return;
  const r = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
  const want = Math.max(480, Math.min(3840, Math.round((cv.clientWidth || r.width || 480) * dpr / 240) * 240));
  if (cv.width !== want) { cv.width = want; cv.height = want * 2 / 3; }
  SCR = cv.width / 240;
  const ps = Math.max(2, Math.min(16, Math.round(SCR))), hd = SCR >= 6 ? 4 : 2;
  if (ps !== PS) { PS = ps; for (const k in PERSON_CACHE) if (k.startsWith('hdp')) delete PERSON_CACHE[k]; if (typeof URL_CACHE !== 'undefined') for (const k in URL_CACHE) if (k.startsWith('p:')) delete URL_CACHE[k]; }
  if (hd !== HD) { HD = hd; for (const k in TILE_HD) delete TILE_HD[k]; if (typeof MAPS !== 'undefined') for (const id in MAPS) if (MAPS[id] && MAPS[id] !== (RT && RT.map)) MAPS[id].layers = null; if (RT && RT.map) { RT.map.layers = null; buildLayers(RT.map); } if (typeof CHUNK_CACHE !== 'undefined') CHUNK_CACHE.clear(); }
}
window.addEventListener('resize', () => setTimeout(computeScale, 60));
window.addEventListener('DOMContentLoaded', () => { computeScale(); try { new ResizeObserver(() => computeScale()).observe(document.getElementById('screen')); } catch (e) { } });

/* ---------- Personnages ---------- */
function personSpriteHD(pal, dir, frame) {
  const key = 'hdp' + PS + JSON.stringify(pal) + dir + frame;
  if (PERSON_CACHE[key]) return PERSON_CACHE[key];
  const S = 16 * PS, k2 = PS / 2, c = mkCanvas(S, S), g = c.getContext('2d');
  const flip = dir === 'left', d = flip ? 'right' : dir;
  const body = mkCanvas(S, S), b = body.getContext('2d');
  if (flip) { b.translate(S, 0); b.scale(-1, 1); }
  b.scale(k2, k2);
  const sk = pal.s, hair = pal.h, cl = pal.c, pa = pal.p;
  const skD = dhex(sk, 0.16), clD = dhex(cl, 0.24), clL = lhex(cl, 0.2), paD = dhex(pa, 0.3), hairL = lhex(hair, 0.35), hairD = dhex(hair, 0.28);
  const E = (x, y, rx, ry, col) => { b.fillStyle = col; b.beginPath(); b.ellipse(x, y, rx, ry, 0, 0, 7); b.fill(); };
  const RR = (x, y, w, h, r, col) => { b.fillStyle = col; b.beginPath(); b.roundRect(x, y, w, h, r); b.fill(); };
  const sty = pal.style || (pal.long ? 'long' : 'short');
  const step = frame === 1 ? 1 : frame === 2 ? -1 : 0;
  // cheveux longs derrière le corps
  if (sty === 'long' && d !== 'up') RR(d === 'right' ? 8.5 : 8, 6, d === 'right' ? 11 : 16, 15, 6, hairD);
  // jambes et chaussures
  if (d === 'right') {
    RR(15 - step * 2.5, 21, 4, 8, 2, paD); RR(13 + step * 2.5, 21, 4, 8, 2, pa);
    RR(14.5 - step * 2.5, 27, 6, 3, 1.5, '#3a3238'); RR(12.5 + step * 2.5, 27, 6, 3, 1.5, '#2a2228');
  } else {
    const l1 = frame === 1 ? -1.2 : 0, l2 = frame === 2 ? -1.2 : 0;
    RR(11.5, 21, 4, 8 + l1, 2, pa); RR(16.5, 21, 4, 8 + l2, 2, pa);
    RR(11, 27 + l1, 5, 3, 1.5, '#2a2228'); RR(16, 27 + l2, 5, 3, 1.5, '#2a2228');
  }
  if (pal.shorts) { // jambes nues sous le short, bottes
    if (d === 'right') { RR(15 - step * 2.5, 24.5, 4, 3.6, 1.6, skD); RR(13 + step * 2.5, 24.5, 4, 3.6, 1.6, sk); }
    else { const l1 = frame === 1 ? -1.2 : 0, l2 = frame === 2 ? -1.2 : 0; RR(11.5, 24.5, 4, 3 + l1, 1.6, sk); RR(16.5, 24.5, 4, 3 + l2, 1.6, sk); }
  }
  if (pal.boots) {
    if (d === 'right') { RR(14.5 - step * 2.5, 26.4, 6, 3.6, 1.5, dhex(pal.boots, 0.2)); RR(12.5 + step * 2.5, 26.4, 6, 3.6, 1.5, pal.boots); }
    else { const l1 = frame === 1 ? -1.2 : 0, l2 = frame === 2 ? -1.2 : 0; RR(11, 26.4 + l1, 5, 3.6, 1.5, pal.boots); RR(16, 26.4 + l2, 5, 3.6, 1.5, pal.boots); }
  }
  if (pal.pack && d === 'up') RR(11, 13.5, 10, 8.5, 3, pal.pack);
  if (pal.pack && d === 'right') RR(8.6, 14, 4, 7.5, 2, pal.pack);
  // torse
  if (d === 'right') { RR(11, 13, 10, 10, 4, cl); RR(17, 14, 3, 8, 2, clD); RR(12, 14, 3, 5, 2, clL); }
  else {
    RR(9.5, 13, 13, 10, 4.5, cl); RR(19, 14, 3, 8, 2, clD); RR(11, 14, 3, 6, 2, clL);
    b.fillStyle = paD; b.fillRect(10.5, 21, 11, 1.4);
    if (d === 'down') { b.fillStyle = dhex(cl, 0.35); b.beginPath(); b.moveTo(14, 13.2); b.lineTo(16, 16); b.lineTo(18, 13.2); b.fill(); }
  }
  // bras et mains
  if (d === 'right') { const a = step * 2.2; RR(14.5 + a, 14, 4, 8, 2, clD); E(16.5 + a, 22.6, 2, 2, sk); }
  else { const a1 = frame === 1 ? 1.4 : 0, a2 = frame === 2 ? 1.4 : 0; RR(7, 14 + a1, 4, 8, 2, cl); RR(21, 14 + a2, 4, 8, 2, clD); E(9, 22.6 + a1, 2, 2, sk); E(23, 22.6 + a2, 2, 2, skD); }
  if (pal.stripe && d !== 'up') { // bandes sportives rouge et blanc
    if (d === 'down') { b.fillStyle = '#f4f4f0'; b.fillRect(10, 16.2, 12, 1); b.fillStyle = pal.stripe; b.fillRect(10, 17.2, 12, 1.1); b.fillStyle = '#9aa0aa'; b.fillRect(14.6, 14.2, 2.8, 5.8); b.fillStyle = '#c8ccd2'; for (const yy of [14.8, 16.6, 18.4]) b.fillRect(14.6, yy, 2.8, 0.7); }
    else { b.fillStyle = '#f4f4f0'; b.fillRect(11, 16.2, 10, 1); b.fillStyle = pal.stripe; b.fillRect(11, 17.2, 10, 1.1); }
  }
  if (pal.gloves) { if (d === 'right') { const a = step * 2.2; E(16.5 + a, 22.6, 2.1, 2.1, pal.gloves); } else if (d === 'down' || d === 'up') { const a1 = frame === 1 ? 1.4 : 0, a2 = frame === 2 ? 1.4 : 0; E(9, 22.6 + a1, 2.1, 2.1, pal.gloves); E(23, 22.6 + a2, 2.1, 2.1, pal.gloves); E(9, 23.2 + a1, 1.2, 1, sk); E(23, 23.2 + a2, 1.2, 1, skD); } }
  if (pal.pack && d === 'down') { b.fillStyle = dhex(pal.pack, 0.1); b.fillRect(10.4, 13.5, 1.2, 7); b.fillRect(20.4, 13.5, 1.2, 7); }
  // cou et tête
  RR(14, 11, 4, 3, 1, skD);
  if (d === 'right') { E(16.5, 8, 6.2, 6.6, sk); E(22.4, 9.2, 1.1, 1.3, sk); E(13.4, 9, 1.3, 1.8, skD); E(17.5, 12.2, 3.5, 1.4, skD); E(17.5, 11.6, 3.5, 1.4, sk); }
  else { E(16, 8.2, 6.6, 6.8, sk); if (d === 'down') { E(9.6, 9, 1.3, 1.8, sk); E(22.4, 9, 1.3, 1.8, skD); E(16, 13.2, 4.6, 1.6, skD); E(16, 12.6, 4.8, 1.8, sk); } }
  // barbe
  if (pal.beard && d !== 'up') { b.fillStyle = hair; b.beginPath(); if (d === 'down') b.ellipse(16, 12.6, 4.8, 2.8, 0, 0, Math.PI); else b.ellipse(19, 12.2, 3.4, 2.4, 0, 0, Math.PI); b.fill(); }
  // chevelure
  if (sty !== 'bald' && sty !== 'scarf' && sty !== 'curly') {
    b.fillStyle = hair; b.beginPath();
    if (d === 'right') { b.ellipse(15.6, 5.8, 6.7, 5.2, 0, Math.PI * 0.92, Math.PI * 2.06); b.fill(); RR(9.6, 4, 5.6, 9, 2.8, hair); }
    else if (d === 'up') { b.ellipse(16, 8, 6.9, 7.1, 0, 0, 7); b.fill(); }
    else {
      b.ellipse(16, 5.6, 7.1, 5, 0, Math.PI, Math.PI * 2); b.fill();
      RR(9.1, 4, 2.6, 7, 1.3, hair); RR(20.3, 4, 2.6, 7, 1.3, hair);
      b.beginPath(); b.moveTo(9.4, 5.2); b.quadraticCurveTo(12.5, 8.6, 15.6, 6); b.quadraticCurveTo(18.8, 8.4, 22.6, 5.2); b.lineTo(22.6, 3); b.lineTo(9.4, 3); b.fill();
    }
  }
  if (sty === 'long') { if (d === 'down') { RR(8.6, 6, 3, 14, 1.5, hair); RR(20.4, 6, 3, 14, 1.5, hair); } else if (d === 'up') RR(9, 6, 14, 15, 5, hair); else RR(9.2, 6, 5, 14, 2.5, hair); }
  else if (sty === 'spiky' || sty === 'wild') { b.fillStyle = hair; b.beginPath(); for (const [x0, h] of [[10, 3], [13, 4.6], [16, 5.2], [19, 4.6], [22, 3]]) { b.moveTo(x0 - 2.2, 4.4); b.lineTo(x0, 4.4 - h + 1); b.lineTo(x0 + 2.2, 4.4); } b.fill(); }
  else if (sty === 'pony') { if (d === 'up') RR(14.5, 8, 3, 10, 1.5, hair); else if (d === 'right') RR(7.6, 5, 4, 10, 2, hair); else RR(21.6, 5, 2.6, 8, 1.3, hair); }
  else if (sty === 'braid') { for (let i = 0; i < 4; i++) { const col = i % 2 ? hairD : hair; if (d !== 'right') { E(9.4, 11 + i * 2.6, 1.5, 1.3, col); E(22.6, 11 + i * 2.6, 1.5, 1.3, col); } else E(10.4, 11 + i * 2.6, 1.6, 1.3, col); } }
  else if (sty === 'bun') E(16, 1.9, 3.1, 2.4, hair);
  else if (sty === 'bob') { if (d === 'down') { RR(8.6, 5, 3.4, 10, 1.7, hair); RR(20, 5, 3.4, 10, 1.7, hair); } else if (d === 'right') RR(9, 5, 6, 10, 3, hair); else RR(9, 5, 14, 10, 4, hair); }
  else if (sty === 'curly') { const cc = [[10, 4], [13, 2.4], [16, 1.8], [19, 2.4], [22, 4], [9.4, 7], [22.6, 7], [11.6, 2.8], [20.4, 2.8]]; for (const [hx, hy] of cc) E(d === 'right' ? hx - 0.5 : hx, hy, 2.4, 2.2, hair); if (d !== 'down') E(16, 7, 6.8, 5.5, hair); for (const [hx, hy] of cc.slice(0, 5)) E(hx - 0.6, hy - 0.6, 0.8, 0.6, hairL); }
  else if (sty === 'locs') { const xs = d === 'down' ? [9.2, 11, 21, 22.8] : d === 'up' ? [10, 12.5, 15, 17.5, 20, 22] : [9.4, 11.2, 13]; for (const lx of xs) RR(lx - 0.9, 5, 1.8, 13 + (lx % 2), 0.9, hair); }
  else if (sty === 'scarf') { const sc = pal.hat || '#4a8fe0'; b.fillStyle = sc; b.beginPath(); if (d === 'up') b.ellipse(16, 8, 7.4, 7.8, 0, 0, 7); else if (d === 'right') { b.ellipse(15.6, 6.8, 7, 6.8, 0, Math.PI * 0.85, Math.PI * 2.1); } else { b.ellipse(16, 6.8, 7.6, 6.4, 0, Math.PI, Math.PI * 2); } b.fill(); if (d === 'down') { RR(8.2, 6, 3, 9, 1.5, sc); RR(20.8, 6, 3, 9, 1.5, sc); RR(10, 13.2, 12, 2.4, 1.2, sc); } else if (d === 'right') RR(8.6, 6, 6, 10, 3, sc); else RR(9, 8, 14, 9, 4, sc); b.globalAlpha = 0.3; E(13, 3.4, 3, 1, '#ffffff'); b.globalAlpha = 1; }
  else if (sty === 'swept') { b.fillStyle = hair; b.beginPath(); b.ellipse(d === 'right' ? 15 : 16, 3.6, 6.2, 2.7, -0.2, 0, 7); b.fill(); }
  if (pal.spiky && sty === 'pony') { b.fillStyle = hair; b.beginPath(); const px = d === 'right' ? 10 : d === 'up' ? 16 : 20.5, py = d === 'up' ? 5 : 4.6; for (const [ax, ay] of [[-2.6, -3.6], [0, -4.4], [2.6, -3.6], [4, -1.6]]) { b.moveTo(px - 1.6, py); b.lineTo(px + ax * (d === 'right' ? -1 : 1), py + ay); b.lineTo(px + 1.6, py); } b.fill(); if (d === 'down') { for (const [x0, y0] of [[11, 4.2], [14.5, 3.6], [18, 3.8]]) { b.beginPath(); b.moveTo(x0 - 1.5, y0); b.lineTo(x0 + 0.4, y0 + 3.6); b.lineTo(x0 + 1.8, y0); b.fill(); } } }
  if (pal.band && sty !== 'bald') { b.fillStyle = pal.band; if (d === 'down') { b.beginPath(); b.ellipse(16, 3.6, 7, 1.6, 0, Math.PI, Math.PI * 2); b.fill(); b.fillRect(9, 3.2, 14, 1.1); } else if (d === 'up') b.fillRect(9.2, 5.2, 13.6, 1.2); else { b.fillRect(10, 3.4, 11.5, 1.1); } }
  if (sty !== 'bald' && sty !== 'scarf') { b.globalAlpha = 0.75; E(d === 'right' ? 14 : 13.4, 3.4, 2.5, 0.9, hairL); b.globalAlpha = 1; }
  // visage
  if (d === 'down') {
    E(13.2, 9.5, 1.35, 1.7, '#1b1b2a'); E(18.8, 9.5, 1.35, 1.7, '#1b1b2a');
    b.fillStyle = '#ffffff'; b.fillRect(12.9, 8.5, 0.95, 0.95); b.fillRect(18.5, 8.5, 0.95, 0.95);
    b.fillStyle = hairD; b.fillRect(11.8, 6.9, 2.9, 0.9); b.fillRect(17.3, 6.9, 2.9, 0.9);
    E(11.4, 11.6, 1.4, 0.8, 'rgba(255,110,110,.28)'); E(20.6, 11.6, 1.4, 0.8, 'rgba(255,110,110,.28)');
    b.fillStyle = dhex(sk, 0.4); b.beginPath(); b.ellipse(16, 12.1, 1.4, 0.65, 0, 0, Math.PI); b.fill();
    if (pal.glasses) { b.strokeStyle = '#2a2a3a'; b.lineWidth = 0.8; b.beginPath(); b.arc(13.2, 9.5, 2.2, 0, 7); b.moveTo(21, 9.5); b.arc(18.8, 9.5, 2.2, 0, 7); b.moveTo(15.4, 9.3); b.lineTo(16.6, 9.3); b.stroke(); }
  } else if (d === 'right') {
    E(19.7, 9.1, 1.1, 1.55, '#1b1b2a'); b.fillStyle = '#ffffff'; b.fillRect(19.6, 8.2, 0.75, 0.75);
    b.fillStyle = hairD; b.fillRect(18.4, 6.7, 2.6, 0.9);
    E(20.4, 11.4, 1.2, 0.7, 'rgba(255,110,110,.28)');
    b.fillStyle = dhex(sk, 0.4); b.fillRect(20.2, 12.3, 1.6, 0.7);
    if (pal.glasses) { b.strokeStyle = '#2a2a3a'; b.lineWidth = 0.8; b.beginPath(); b.arc(19.8, 9.1, 2.1, 0, 7); b.stroke(); }
  }
  // chapeau
  if (pal.hat) {
    const hc = pal.hat;
    if (d === 'up') E(16, 4.6, 7.3, 4.5, hc);
    else if (d === 'right') { E(15.5, 4, 6.7, 3.9, hc); RR(16, 5.2, 9, 1.8, 0.9, dhex(hc, 0.25)); }
    else { E(16, 4, 7.1, 3.9, hc); RR(8.4, 5.6, 15.2, 1.8, 0.9, dhex(hc, 0.25)); }
    b.globalAlpha = 0.8; E(14, 2.6, 2.4, 0.8, lhex(hc, 0.3)); b.globalAlpha = 1;
  }
  // détails fins (visibles en 64 × 64)
  const L = (x1, y1, x2, y2, col, w) => { b.strokeStyle = col; b.lineWidth = w || 0.5; b.lineCap = 'round'; b.beginPath(); b.moveTo(x1, y1); b.lineTo(x2, y2); b.stroke(); };
  const Q = (x1, y1, cx, cy, x2, y2, col, w) => { b.strokeStyle = col; b.lineWidth = w || 0.5; b.lineCap = 'round'; b.beginPath(); b.moveTo(x1, y1); b.quadraticCurveTo(cx, cy, x2, y2); b.stroke(); };
  const iris = pal.e || (pal.h === '#2a5fd0' || pal.h === '#e8f0ff' ? '#3a8ae0' : '#5a3a28');
  const fem = sty === 'long' || sty === 'pony' || sty === 'braid' || sty === 'bun' || sty === 'bob';
  // mèches
  if (sty !== 'bald' && sty !== 'scarf' && sty !== 'curly') {
    if (d === 'down') { Q(12, 3.2, 13.5, 5.5, 12.6, 7.4, hairD, 0.45); Q(16, 2.4, 16.8, 5, 15.6, 6.6, hairD, 0.45); Q(19.8, 3.2, 18.6, 5.6, 19.4, 7.2, hairD, 0.45); }
    else if (d === 'up') { for (const xx of [12, 14.5, 17, 19.5]) Q(xx, 3, xx + 0.6, 8, xx - 0.2, 12.5, hairD, 0.45); }
    else { Q(11, 3, 13.5, 4.5, 15, 3.6, hairD, 0.45); Q(10.5, 6, 11.5, 9, 11, 11.5, hairD, 0.45); }
    if (sty === 'long') { if (d === 'down') { L(9.6, 9, 9.8, 19, hairD, 0.4); L(22.2, 9, 22, 19, hairD, 0.4); } else if (d === 'up') { L(13, 10, 13.2, 20, hairD, 0.4); L(19, 10, 18.8, 20, hairD, 0.4); } else L(11, 9, 11.2, 19, hairD, 0.4); }
  }
  if (d === 'down') {
    // yeux : iris, pupille, reflets, cils
    E(13.2, 9.7, 0.85, 1.05, iris); E(18.8, 9.7, 0.85, 1.05, iris);
    E(13.2, 9.9, 0.45, 0.55, '#0a0a14'); E(18.8, 9.9, 0.45, 0.55, '#0a0a14');
    E(12.85, 9.0, 0.38, 0.38, '#ffffff'); E(18.45, 9.0, 0.38, 0.38, '#ffffff'); E(13.55, 10.4, 0.18, 0.18, '#ffffff'); E(19.15, 10.4, 0.18, 0.18, '#ffffff');
    if (fem) { L(11.7, 8.2, 11.2, 7.6, '#1b1b2a', 0.4); L(20.3, 8.2, 20.8, 7.6, '#1b1b2a', 0.4); }
    Q(11.9, 8.1, 13.2, 7.4, 14.5, 8.1, '#1b1b2a', 0.45); Q(17.5, 8.1, 18.8, 7.4, 20.1, 8.1, '#1b1b2a', 0.45);
    // nez, lèvres, menton
    Q(16.1, 10.2, 16.6, 11, 16, 11.2, dhex(sk, 0.22), 0.4);
    b.fillStyle = fem ? '#d46a72' : dhex(sk, 0.32); b.beginPath(); b.ellipse(16, 12.2, fem ? 1.3 : 1.2, 0.45, 0, 0, 7); b.fill();
    b.fillStyle = 'rgba(255,255,255,.35)'; b.beginPath(); b.ellipse(16.3, 12.35, 0.5, 0.18, 0, 0, 7); b.fill();
    // vêtements : col, fermeture, boutons, ceinture, poignets
    L(16, 16, 16, 20.6, dhex(cl, 0.32), 0.45);
    for (const yy of [17, 18.7]) E(16.7, yy, 0.32, 0.32, lhex(cl, 0.45));
    Q(13.4, 13.4, 14.6, 15.4, 16, 16, lhex(cl, 0.35), 0.45); Q(18.6, 13.4, 17.4, 15.4, 16, 16, dhex(cl, 0.35), 0.45);
    RR(15, 20.7, 2, 1.6, 0.4, '#e9c43a');
    RR(7, 20.6 + (frame === 1 ? 1.4 : 0), 4, 1, 0.5, dhex(cl, 0.35)); RR(21, 20.6 + (frame === 2 ? 1.4 : 0), 4, 1, 0.5, dhex(cl, 0.45));
    L(13.5, 23, 13.5, 26.5, dhex(pa, 0.25), 0.35); L(18.5, 23, 18.5, 26.5, dhex(pa, 0.25), 0.35);
  } else if (d === 'right') {
    E(19.8, 9.3, 0.7, 1, iris); E(20, 9.4, 0.35, 0.5, '#0a0a14'); E(19.55, 8.6, 0.3, 0.3, '#ffffff');
    if (fem) L(20.6, 8.1, 21.3, 7.6, '#1b1b2a', 0.4);
    Q(18.7, 8.1, 19.8, 7.5, 20.9, 8.2, '#1b1b2a', 0.45);
    b.fillStyle = fem ? '#d46a72' : dhex(sk, 0.32); b.beginPath(); b.ellipse(21, 12.4, 0.8, 0.4, 0, 0, 7); b.fill();
    L(13, 16, 13, 21, dhex(cl, 0.32), 0.4); RR(12, 20.7, 2, 1.6, 0.4, '#e9c43a');
  } else {
    L(16, 14.5, 16, 21, dhex(cl, 0.3), 0.4); Q(12, 14, 16, 15.5, 20, 14, dhex(cl, 0.3), 0.4);
  }
  // semelles et lacets
  b.fillStyle = 'rgba(255,255,255,.28)';
  if (d === 'right') { b.fillRect(13 + step * 2.5, 29.3, 5, 0.5); } else { b.fillRect(11.4, 29.3 + (frame === 1 ? -1.2 : 0), 4.2, 0.5); b.fillRect(16.4, 29.3 + (frame === 2 ? -1.2 : 0), 4.2, 0.5); }
  // ombrage doux du visage
  const fg = b.createRadialGradient(13, 6, 1, 16, 9, 8); fg.addColorStop(0, 'rgba(255,255,255,.10)'); fg.addColorStop(1, 'rgba(0,0,0,0)');
  if (d !== 'up') { b.fillStyle = fg; b.beginPath(); b.ellipse(d === 'right' ? 16.5 : 16, 8.2, 6.4, 6.6, 0, 0, 7); b.fill(); }
  // contour doux et ombre au sol
  const sil = mkCanvas(S, S), sg = sil.getContext('2d');
  sg.drawImage(body, 0, 0); sg.globalCompositeOperation = 'source-in'; sg.fillStyle = '#1e1a24'; sg.fillRect(0, 0, S, S);
  g.fillStyle = 'rgba(0,0,0,.2)'; g.beginPath(); g.ellipse(16 * k2, 30.2 * k2, 7 * k2, 1.9 * k2, 0, 0, 7); g.fill();
  const o = Math.max(1, k2 * 0.9), od = o * 0.7;
  for (const [ox, oy] of [[-o, 0], [o, 0], [0, -o], [0, o], [-od, -od], [od, -od], [-od, od], [od, od]]) g.drawImage(sil, ox, oy);
  g.drawImage(body, 0, 0);
  PERSON_CACHE[key] = c; return c;
}
personSprite = function (pal, dir, frame) { return (typeof personSpriteV2 === 'function' ? personSpriteV2 : personSpriteHD)(pal, dir, frame); };

/* ---------- Tuiles arrondies ---------- */
const TILE_HD = {};
function tileHD(ch, palKey, v, f) {
  const key = HD + '|' + palKey + '|' + ch + '|' + v + '|' + f;
  if (TILE_HD[key]) return TILE_HD[key];
  const c = mkCanvas(16 * HD, 16 * HD), x = c.getContext('2d'); x.scale(HD / 2, HD / 2);
  if (!paintTileHD(x, ch, getPal(palKey), v, f, palKey)) { x.imageSmoothingEnabled = false; x.drawImage(tileCanvas(ch, palKey, v, f), 0, 0, 32, 32); }
  TILE_HD[key] = c; return c;
}
function paintTileHD(x, ch, P, v, f, palKey) {
  const R = rng(v * 7919 + ch.charCodeAt(0) * 131 + 23);
  const C = (cx, cy, r, col) => { x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); };
  const ground = () => {
    x.fillStyle = P.g; x.fillRect(0, 0, 32, 32);
    for (let i = 0; i < 9; i++) C(R() * 32, R() * 32, 0.7 + R() * 1.1, R() < 0.5 ? P.g2 : P.g3);
  };
  switch (ch) {
    case '.': ground(); return true;
    case ',': {
      x.fillStyle = P.p; x.fillRect(0, 0, 32, 32);
      for (let i = 0; i < 8; i++) { const px = R() * 32, py = R() * 32, r = 0.8 + R() * 1.6; C(px, py + 0.4, r, P.p2); C(px, py, r * 0.8, lhex(P.p, 0.18)); }
      return true;
    }
    case 's': {
      x.fillStyle = P.s || P.p; x.fillRect(0, 0, 32, 32);
      for (let i = 0; i < 12; i++) C(R() * 32, R() * 32, 0.5 + R() * 0.8, dhex(P.s || P.p, 0.1));
      return true;
    }
    case '"': {
      ground();
      for (let q = 0; q < 6; q++) {
        const bx = 3 + (q % 3) * 10 + R() * 3, by = 12 + Math.floor(q / 3) * 14 + R() * 3;
        for (let k = -2; k <= 2; k++) {
          x.strokeStyle = k === 0 ? lhex(P.tg, 0.25) : (k < 0 ? P.tg : P.tg2); x.lineWidth = 2.2; x.lineCap = 'round';
          x.beginPath(); x.moveTo(bx + k * 1.6, by + 4); x.quadraticCurveTo(bx + k * 2.6, by - 3, bx + k * 3.2 + (f ? 0.6 : 0), by - 8 + Math.abs(k)); x.stroke();
        }
      }
      return true;
    }
    case 'T': {
      ground();
      x.fillStyle = 'rgba(15,25,20,.28)'; x.beginPath(); x.ellipse(17, 29, 11, 3.4, 0, 0, 7); x.fill();
      x.fillStyle = P.ol; x.beginPath(); x.roundRect(12, 19, 8, 11, 3); x.fill();
      x.fillStyle = P.trk; x.beginPath(); x.roundRect(13, 19, 6, 10, 2.5); x.fill();
      x.fillStyle = lhex(P.trk, 0.2); x.fillRect(14, 20, 1.5, 7);
      const blobs = [[16, 12, 11.5], [10, 15, 7.5], [22, 15, 7.5], [16, 7, 8]];
      for (const [bx, by, r] of blobs) C(bx, by, r + 1, P.ol);
      for (const [bx, by, r] of blobs) { const gr = x.createRadialGradient(bx - r * 0.35, by - r * 0.45, 1, bx, by, r); gr.addColorStop(0, P.tr3); gr.addColorStop(0.55, P.tr); gr.addColorStop(1, P.tr2); x.fillStyle = gr; x.beginPath(); x.arc(bx, by, r, 0, 7); x.fill(); }
      for (let i = 0; i < 6; i++) C(9 + R() * 14, 5 + R() * 12, 1 + R() * 1.2, lhex(P.tr3, 0.15));
      if (palKey === 'neige') { x.fillStyle = '#ffffff'; x.beginPath(); x.ellipse(15, 3.5, 7, 2.4, 0, 0, 7); x.fill(); x.beginPath(); x.ellipse(9, 9.5, 4, 1.6, 0, 0, 7); x.fill(); }
      return true;
    }
    case 'b': {
      ground();
      x.fillStyle = 'rgba(15,25,20,.25)'; x.beginPath(); x.ellipse(16, 27, 11, 3, 0, 0, 7); x.fill();
      C(16, 17, 11.5, P.ol);
      const gr = x.createRadialGradient(12, 12, 1, 16, 17, 11); gr.addColorStop(0, P.tr3); gr.addColorStop(0.6, P.tr); gr.addColorStop(1, P.tr2); x.fillStyle = gr; x.beginPath(); x.arc(16, 17, 10.5, 0, 7); x.fill();
      C(12, 14, 1.4, '#f6e7a1'); C(20, 20, 1.4, '#f6e7a1'); C(18, 12, 1.2, '#f08aa8');
      return true;
    }
    case 'f': {
      ground();
      const cols = ['#f4f4f4', '#f08aa8', '#f6d05a', '#b48ae8'];
      const fl = (fx, fy, col) => { x.strokeStyle = '#5a8a3a'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(fx, fy + 2); x.lineTo(fx, fy + 6); x.stroke(); for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; C(fx + Math.cos(a) * 1.9, fy + Math.sin(a) * 1.9, 1.5, col); } C(fx, fy, 1.2, '#e8a020'); };
      fl(8, 8, cols[v % 4]); fl(23, 20, cols[(v + 1) % 4]); fl(24, 6, cols[(v + 2) % 4]); fl(8, 24, cols[(v + 3) % 4]);
      return true;
    }
    case '~': {
      x.fillStyle = P.w; x.fillRect(0, 0, 32, 32);
      for (let i = 0; i < 4; i++) C(R() * 32, R() * 32, 2 + R() * 3, lhex(P.w, 0.05));
      x.strokeStyle = P.w2; x.lineWidth = 1.4; x.lineCap = 'round';
      for (let i = 0; i < 3; i++) { const yy = (i * 11 + 5 + (v % 3) * 2) % 32, xx = (i * 12 + f * 6 + v * 5) % 32; x.beginPath(); x.moveTo(xx - 5, yy); x.quadraticCurveTo(xx, yy - 3, xx + 5, yy); x.stroke(); }
      return true;
    }
  }
  return false;
}
const GRASSY = new Set(['.', '"', 'f', 'T', 'b', 'x', 'D']);
function softenEdges(x, map, P, bx0, by0, bx1, by1) {
  const W = map.w, H = map.h, t = map.t;
  bx0 = bx0 || 0; by0 = by0 || 0; bx1 = bx1 == null ? W : bx1; by1 = by1 == null ? H : by1;
  const at = (xx, yy) => (yy < 0 || yy >= H || xx < 0 || xx >= W) ? null : t[yy][xx];
  const C = (cx, cy, r, col) => { x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); };
  for (let y = by0; y < by1; y++) for (let xx = bx0; xx < bx1; xx++) {
    const ch = t[y][xx];
    if (ch === '.' || ch === '"' || ch === 'f') {
      const pxx = xx * TS, pyy = y * TS, isP = (dx, dy) => { const q = at(xx + dx, y + dy); return q === ',' || q === 's'; };
      const rc = (cx, cy, dx, dy) => {
        if (!(isP(dx, 0) && isP(0, dy))) return;
        const q = at(xx + dx, y); x.fillStyle = q === 's' ? (P.s || P.p) : P.p; x.fillRect(cx - (dx < 0 ? 0 : 6), cy - (dy < 0 ? 0 : 6), 6, 6);
        x.fillStyle = P.g; x.beginPath(); x.arc(cx + (dx < 0 ? 6 : -6), cy + (dy < 0 ? 6 : -6), 6, 0, 7); x.fill();
      };
      rc(pxx, pyy, -1, -1); rc(pxx + 16, pyy, 1, -1); rc(pxx, pyy + 16, -1, 1); rc(pxx + 16, pyy + 16, 1, 1);
      continue;
    }
    if (ch !== ',' && ch !== '~' && ch !== 's') continue;
    const px = xx * TS, py = y * TS;
    const g = (dx, dy) => GRASSY.has(at(xx + dx, y + dy));
    const col = P.g, edge = ch === '~' ? lhex(P.s || P.p, 0.1) : ch === ',' ? dhex(P.p, 0.08) : dhex(P.s || P.p, 0.06);
    // coins arrondis
    const corner = (cx, cy, dx, dy) => {
      if (!(g(dx, 0) && g(0, dy))) return;
      x.fillStyle = col; x.fillRect(cx - (dx < 0 ? 0 : 5), cy - (dy < 0 ? 0 : 5), 5, 5);
      x.fillStyle = ch === '~' ? P.w : ch === ',' ? P.p : (P.s || P.p);
      x.beginPath(); x.arc(cx + (dx < 0 ? 5 : -5), cy + (dy < 0 ? 5 : -5), 5, 0, 7); x.fill();
    };
    corner(px, py, -1, -1); corner(px + 16, py, 1, -1); corner(px, py + 16, -1, 1); corner(px + 16, py + 16, 1, 1);
    // bordures festonnées
    const bumps = (x0, y0, horiz) => { for (let k = 2; k < 16; k += 4) C(horiz ? x0 + k : x0, horiz ? y0 : y0 + k, 1.7, col); };
    if (g(0, -1)) bumps(px, py, true); if (g(0, 1)) bumps(px, py + 16, true);
    if (g(-1, 0)) bumps(px, py, false); if (g(1, 0)) bumps(px + 16, py, false);
    if (ch === '~') { x.strokeStyle = edge; x.lineWidth = 1; if (g(0, -1)) { x.beginPath(); x.moveTo(px, py + 2.2); x.lineTo(px + 16, py + 2.2); x.stroke(); } }
  }
}

/* ---------- Maisons aux formes douces ---------- */
drawBuilding = function (x, b) {
  const X = b.x * TS, Y = b.y * TS, W = b.w * TS, H = b.h * TS;
  const roofC = b.roof, roofH = Math.round(H * 0.52), ol = '#2a2228';
  x.fillStyle = 'rgba(0,0,0,0.2)'; x.beginPath(); x.ellipse(X + W / 2 + 2, Y + H, W / 2 + 2, 3.5, 0, 0, 7); x.fill();
  const wallC = b.kind === 'gym' || b.kind === 'league' ? '#ece6dc' : '#f4ecda';
  x.fillStyle = ol; x.beginPath(); x.roundRect(X + 1.5, Y + roofH - 3.5, W - 3, H - roofH + 3.5, 3); x.fill();
  const wg = x.createLinearGradient(X, 0, X + W, 0); wg.addColorStop(0, lhex(wallC, 0.3)); wg.addColorStop(1, dhex(wallC, 0.08));
  x.fillStyle = wg; x.beginPath(); x.roundRect(X + 2.5, Y + roofH - 3, W - 5, H - roofH + 2, 2.5); x.fill();
  x.fillStyle = '#d8ccb4'; x.beginPath(); x.roundRect(X + 2.5, Y + H - 4.5, W - 5, 3.5, 1.5); x.fill();
  // toit arrondi à écailles
  x.fillStyle = ol; x.beginPath(); x.roundRect(X - 1, Y, W + 2, roofH + 1, [8, 8, 4, 4]); x.fill();
  const rg = x.createLinearGradient(0, Y, 0, Y + roofH); rg.addColorStop(0, lhex(roofC, 0.3)); rg.addColorStop(0.5, roofC); rg.addColorStop(1, dhex(roofC, 0.2));
  x.fillStyle = rg; x.beginPath(); x.roundRect(X, Y + 1, W, roofH - 1, [7, 7, 3.5, 3.5]); x.fill();
  x.save(); x.beginPath(); x.roundRect(X, Y + 1, W, roofH - 1, [7, 7, 3.5, 3.5]); x.clip();
  x.strokeStyle = dhex(roofC, 0.22); x.lineWidth = 0.8;
  for (let yy = Y + 6, row = 0; yy < Y + roofH - 2; yy += 4.5, row++) for (let xx = X + (row % 2) * 3; xx < X + W + 3; xx += 6) { x.beginPath(); x.arc(xx, yy, 3, 0.1, Math.PI - 0.1); x.stroke(); }
  x.fillStyle = 'rgba(255,255,255,.18)'; x.beginPath(); x.ellipse(X + W * 0.3, Y + 4, W * 0.25, 2, 0, 0, 7); x.fill();
  x.restore();
  x.fillStyle = dhex(roofC, 0.38); x.beginPath(); x.roundRect(X - 1.5, Y + roofH - 3, W + 3, 3, 1.5); x.fill();
  // fenêtres arrondies avec jardinière
  const doorCol = b.door[0] - b.x;
  for (let c = 0; c < b.w; c++) {
    if (Math.abs(c - doorCol) < 1 || c === 0 && b.w > 4 && b.kind === 'gym') continue;
    const wx = X + c * TS + 4, wy = Y + roofH + 3;
    if (wy + 7 > Y + H - 6) continue;
    x.fillStyle = ol; x.beginPath(); x.roundRect(wx - 1, wy - 1, 10, 8.5, [4, 4, 1, 1]); x.fill();
    const gg = x.createLinearGradient(0, wy, 0, wy + 6); gg.addColorStop(0, '#c8ecff'); gg.addColorStop(1, '#7ac0e8');
    x.fillStyle = gg; x.beginPath(); x.roundRect(wx, wy, 8, 6.5, [3.5, 3.5, 0.5, 0.5]); x.fill();
    x.fillStyle = 'rgba(255,255,255,.7)'; x.fillRect(wx + 1.2, wy + 1.2, 1, 3);
    x.fillStyle = '#8a5a3a'; x.beginPath(); x.roundRect(wx - 1, wy + 7, 10, 2, 1); x.fill();
    for (let k = 0; k < 3; k++) { x.fillStyle = ['#f08aa8', '#f6d05a', '#ffffff'][(c + k) % 3]; x.beginPath(); x.arc(wx + 1.5 + k * 3, wy + 6.6, 1.1, 0, 7); x.fill(); }
  }
  // porte en arc
  const dx = X + doorCol * TS + 3, dy = Y + H - 14;
  x.fillStyle = ol; x.beginPath(); x.roundRect(dx - 1, dy - 1, 12, 15, [6, 6, 0, 0]); x.fill();
  if (b.kind === 'center' || b.kind === 'shop' || b.kind === 'league') {
    x.fillStyle = '#9fd8ec'; x.beginPath(); x.roundRect(dx, dy, 10, 14, [5, 5, 0, 0]); x.fill(); x.fillStyle = '#5a8aa0'; x.fillRect(dx + 4.5, dy, 1, 14);
  } else {
    const dg = x.createLinearGradient(dx, 0, dx + 10, 0); dg.addColorStop(0, '#8a5a34'); dg.addColorStop(1, '#6a4024');
    x.fillStyle = dg; x.beginPath(); x.roundRect(dx, dy, 10, 14, [5, 5, 0, 0]); x.fill();
    x.fillStyle = '#e9c43a'; x.beginPath(); x.arc(dx + 7.5, dy + 8, 0.9, 0, 7); x.fill();
  }
  // emblèmes
  const ex = X + W / 2, ey = Y + Math.round(roofH * 0.45);
  if (b.kind === 'center') { x.fillStyle = '#ffffff'; x.beginPath(); x.arc(ex, ey, 6, 0, 7); x.fill(); x.fillStyle = '#2f9e94'; x.beginPath(); x.roundRect(ex - 1.2, ey - 4, 2.4, 8, 1); x.roundRect(ex - 4, ey - 1.2, 8, 2.4, 1); x.fill(); }
  else if (b.kind === 'shop') { x.fillStyle = '#ffffff'; x.beginPath(); x.roundRect(ex - 6, ey - 4, 12, 9, 2.5); x.fill(); x.fillStyle = '#e2a23a'; x.beginPath(); x.roundRect(ex - 4, ey - 2, 8, 6, 1.5); x.fill(); }
  else if (b.kind === 'gym' || b.kind === 'league') {
    x.fillStyle = '#ffffff'; x.beginPath(); x.arc(ex, ey, 7, 0, 7); x.fill();
    x.fillStyle = b.emblem || '#e9c43a'; x.beginPath(); x.moveTo(ex, ey - 4.5); x.lineTo(ex + 4.5, ey); x.lineTo(ex, ey + 4.5); x.lineTo(ex - 4.5, ey); x.closePath(); x.fill();
    if (b.kind === 'league') { x.fillStyle = '#c9a845'; for (let i = 0; i < b.w; i++) { x.beginPath(); x.roundRect(X + i * TS + 6, Y + roofH, 4, H - roofH - 4, 2); x.fill(); } }
  } else if (b.kind === 'lab') { x.fillStyle = '#ffffff'; x.beginPath(); x.roundRect(ex - 8, ey - 3, 16, 6, 3); x.fill(); x.fillStyle = '#4a8fe0'; x.beginPath(); x.roundRect(ex - 6, ey - 1, 12, 2, 1); x.fill(); }
};

/* ---------- Créatures en combat à la résolution de l'écran ---------- */
const BMON = {};
function battleMon(sp, shiny, back, v) {
  if (typeof ELOOK === 'undefined') return back ? monBack(sp, shiny) : monSprite(sp, shiny);
  const sz = Math.min(640, Math.max(160, Math.ceil(80 * SCR / 32) * 32));
  const key = sp + (shiny ? '*' : '') + (back ? 'b' : '') + sz + (v || '');
  if (BMON[key]) return BMON[key];
  const c = mkCanvas(sz, sz), x = c.getContext('2d'), k = sz / 160;
  if (shiny) x.filter = 'hue-rotate(150deg) saturate(1.2)';
  if (back) { x.translate(sz, 0); x.scale(-1, 1); }
  x.translate(8 * k, 16 * k); x.scale(3 * k, 3 * k);
  const L0 = ELOOK[sp] || autoLook(sp);
  drawCrea(x, v ? Object.assign({}, L0, { blink: v === 'blink', open: v === 'open', hurt: v === 'hurt' }) : L0, SP[sp].types.includes('ombre'));
  if (back) { x.setTransform(1, 0, 0, 1, 0, 0); x.filter = 'none'; x.globalCompositeOperation = 'source-atop'; x.fillStyle = 'rgba(20,10,40,0.12)'; x.fillRect(0, 0, sz, sz); }
  const keys = Object.keys(BMON); if (keys.length > 64) delete BMON[keys[0]];
  return (BMON[key] = c);
}
