'use strict';
/* ============================================================
   ÉCLOSIA — Nova d'après les dessins fournis par le joueur
   Sprites de marche (4 directions × 3 étapes) et buste pour les
   portraits et les combats. Si les images ne chargent pas, le
   dessin vectoriel d'origine reste utilisé.
   ============================================================ */
const NOVA_ART = { ow: new Image(), bust: new Image(), ok: 0 };
NOVA_ART.ow.onload = () => { NOVA_ART.ok |= 1; for (const k in PERSON_CACHE) if (k.startsWith('nv')) delete PERSON_CACHE[k]; for (const k in URL_CACHE) if (k.startsWith('p:')) delete URL_CACHE[k]; };
NOVA_ART.bust.onload = () => { NOVA_ART.ok |= 2; for (const k in PORTRAIT_CACHE) if (k.startsWith('Nova|')) delete PORTRAIT_CACHE[k]; };
NOVA_ART.ow.src = 'img/nova_ow.png';
NOVA_ART.bust.src = 'img/novaf/nova_bust.webp';
const NOVA_DIR = { down: 0, up: 3, right: 6, left: 9 };
// Expressions dessinées à partir du buste fourni
const NOVA_EXPR = {};
for (const e of ['smile', 'laugh', 'tender', 'sad', 'cry', 'angry', 'surprised']) { const im = new Image(); im.onload = () => { im._ok = 1; for (const k in PORTRAIT_CACHE) if (k.startsWith('Nova|')) delete PORTRAIT_CACHE[k]; }; im.src = 'img/novaf/nova_' + e + '.webp'; NOVA_EXPR[e] = im; }
const NOVA_MAP = { neutral: 'smile', smirk: 'smile', smile: 'smile', stern: 'smile', laugh: 'laugh', tender: 'tender', sad: 'sad', cry: 'cry', angry: 'angry', surprised: 'surprised' };
function novaSprite(dir, frame) {
  const key = 'nv' + PS + dir + frame;
  if (PERSON_CACHE[key]) return PERSON_CACHE[key];
  const S = 16 * PS, c = mkCanvas(S, S), g = c.getContext('2d');
  const i = NOVA_DIR[dir] + (frame === 1 ? 1 : frame === 2 ? 2 : 0), CW = 56, CH = 96;
  const h = S * 1.0, w = h * CW / CH;
  g.fillStyle = 'rgba(0,0,0,.2)'; g.beginPath(); g.ellipse(S / 2, S * 0.95, S * 0.22, S * 0.06, 0, 0, 7); g.fill();
  g.imageSmoothingEnabled = false;
  g.drawImage(NOVA_ART.ow, i * CW, 0, CW, CH, (S - w) / 2, S - h, w, h);
  return (PERSON_CACHE[key] = c);
}
function novaBust(size, expr) {
  if (!(NOVA_ART.ok & 2)) return null;
  const S = size || 256, c = mkCanvas(S, S), g = c.getContext('2d');
  const ei = NOVA_EXPR[NOVA_MAP[expr] || 'smile'];
  const b = ei && ei._ok ? ei : NOVA_ART.bust, k = Math.min(S / b.width, S / b.height);
  g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
  g.drawImage(b, (S - b.width * k) / 2, S - b.height * k, b.width * k, b.height * k);
  return c;
}
const _personSpriteNova = personSprite;
personSprite = function (pal, dir, frame) {
  if (pal === PALS.rival && (NOVA_ART.ok & 1)) return novaSprite(dir, frame);
  return _personSpriteNova(pal, dir, frame);
};
const _portraitCanvasNova = portraitCanvas;
portraitCanvas = function (name, expr) {
  if (name === 'Nova' && (NOVA_ART.ok & 2)) {
    const e = NOVA_MAP[expr] || 'smile', key = 'Nova|img|' + e;
    return PORTRAIT_CACHE[key] || (PORTRAIT_CACHE[key] = novaBust(256, e));
  }
  return _portraitCanvasNova(name, expr);
};
