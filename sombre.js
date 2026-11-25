'use strict';
/* ============================================================
   ÉCLOSIA — intro mystère : les légendaires ne sont que des ombres
   (couleurs, lumière et image d'origine conservées).
   ============================================================ */
const SHADOW_LEG = { auberis: '190,120,255', nocturnis: '140,255,190', aquoree: '110,190,255', eveillon: '255,240,200' };
let CINE_SHADOW = false;
const SHADOW_CACHE = {};
function shadowOf(src, rim, key) {
  if (SHADOW_CACHE[key]) return SHADOW_CACHE[key];
  const w = src.width, h = src.height, c = mkCanvas(w, h), g = c.getContext('2d');
  const m = mkCanvas(w, h), mg = m.getContext('2d');
  mg.drawImage(src, 0, 0); mg.globalCompositeOperation = 'source-in';
  // liseré de lumière : la silhouette décalée en couleur, puis le noir par-dessus
  mg.fillStyle = `rgb(${rim})`; mg.fillRect(0, 0, w, h);
  const d = Math.max(1, w / 90);
  g.globalAlpha = 0.85; for (const [ox, oy] of [[-d, -d], [d, -d], [0, -d * 1.4]]) g.drawImage(m, ox, oy);
  g.globalAlpha = 1;
  const k = mkCanvas(w, h), kg = k.getContext('2d'); kg.drawImage(src, 0, 0); kg.globalCompositeOperation = 'source-in';
  const gr = kg.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#120c1e'); gr.addColorStop(1, '#030206'); kg.fillStyle = gr; kg.fillRect(0, 0, w, h);
  g.drawImage(k, 0, 0);
  // deux yeux qui luisent dans l'ombre, en haut de la silhouette
  return (SHADOW_CACHE[key] = c);
}
const _bigMonShadow = bigMon;
bigMon = function (id, sz) {
  const img = _bigMonShadow(id, sz);
  if (!CINE_SHADOW || !SHADOW_LEG[id] || !img) return img;
  const ok = !SP[id].gal || (typeof galImage === 'function' && galImage(id));
  return ok ? shadowOf(img, SHADOW_LEG[id], id + ':' + sz) : shadowOf(img, SHADOW_LEG[id], id + ':' + sz + ':tmp');
};
const _bigFlipShadow = bigFlip;
bigFlip = function (id, sz) {
  if (!CINE_SHADOW || !SHADOW_LEG[id]) return _bigFlipShadow(id, sz);
  const k = 'f:' + id + ':' + sz; if (SHADOW_CACHE[k]) return SHADOW_CACHE[k];
  const s = bigMon(id, sz), c = mkCanvas(s.width, s.height), g = c.getContext('2d');
  g.translate(s.width, 0); g.scale(-1, 1); g.drawImage(s, 0, 0);
  if (!SP[id].gal || galImage(id)) SHADOW_CACHE[k] = c;
  return c;
};
const _drawCineSombre = drawCine;
drawCine = function (x) {
  CINE_SHADOW = true;
  try { _drawCineSombre(x); } finally { CINE_SHADOW = false; }
  // ombres seules : pas d'étalonnage sombre
};
// l'écran titre garde aussi le mystère
const _drawTitleSombre = drawTitle;
drawTitle = function (x) {
  CINE_SHADOW = true;
  try { _drawTitleSombre(x); } finally { CINE_SHADOW = false; }
};
