'use strict';
/* ============================================================
   ÉCLOSIA — le héros d'après les dessins fournis par le joueur
   Marche 4 directions × 3 étapes + illustration en pied.
   ============================================================ */
const HERO_ART = { ow: new Image(), full: new Image(), ok: 0 };
HERO_ART.ow.onload = () => { HERO_ART.ok |= 1; for (const k in PERSON_CACHE) if (k.startsWith('hero')) delete PERSON_CACHE[k]; for (const k in URL_CACHE) if (k.startsWith('p:')) delete URL_CACHE[k]; };
HERO_ART.full.onload = () => { HERO_ART.ok |= 2; };
HERO_ART.ow.src = 'img/hero_ow.png';
HERO_ART.full.src = 'img/hero_full.png';
const HERO_DIR = { down: 0, up: 3, right: 6, left: 9 };
function isHeroPal(pal) { return pal && (pal === PALS.player || (typeof G !== 'undefined' && G && pal === PALS[G.look])); }
function heroSprite(dir, frame) {
  const key = 'hero' + PS + dir + frame;
  if (PERSON_CACHE[key]) return PERSON_CACHE[key];
  const S = 16 * PS, c = mkCanvas(S, S), g = c.getContext('2d');
  const i = (HERO_DIR[dir] || 0) + (frame === 1 ? 1 : frame === 2 ? 2 : 0), CW = 60, CH = 72;
  const h = S * 1.08, w = h * CW / CH;
  g.fillStyle = 'rgba(0,0,0,.2)'; g.beginPath(); g.ellipse(S / 2, S * 0.95, S * 0.2, S * 0.055, 0, 0, 7); g.fill();
  g.imageSmoothingEnabled = false;
  g.drawImage(HERO_ART.ow, i * CW, 0, CW, CH, (S - w) / 2, S * 0.99 - h, w, h);
  return (PERSON_CACHE[key] = c);
}
function heroFullURL() {
  if (!(HERO_ART.ok & 2)) return null;
  if (HERO_ART._url) return HERO_ART._url;
  const im = HERO_ART.full, c = mkCanvas(im.width, im.height); c.getContext('2d').drawImage(im, 0, 0);
  try { HERO_ART._url = c.toDataURL(); } catch (e) { HERO_ART._url = 'img/hero_full.png'; }
  return HERO_ART._url;
}
const _personSpriteHero = personSprite;
personSprite = function (pal, dir, frame) {
  if ((HERO_ART.ok & 1) && isHeroPal(pal)) return heroSprite(dir, frame);
  return _personSpriteHero(pal, dir, frame);
};
/* ---------- Vélo ---------- */
HERO_ART.bike = new Image(); HERO_ART.bike.onload = () => { HERO_ART.ok |= 4; }; HERO_ART.bike.src = 'img/hero_bike.png';
const BIKE_CACHE = {};
function heroBike(dir, frame) {
  if (!(HERO_ART.ok & 4)) return null;
  const i = Math.floor(frame / 5) % 3, flip = dir === 'right' || (dir === 'down' && HERO_ART._lastH === 'right') || (dir === 'up' && HERO_ART._lastH !== 'right');
  if (dir === 'left' || dir === 'right') HERO_ART._lastH = dir;
  const key = i + (flip ? 'r' : 'l') + PS;
  if (BIKE_CACHE[key]) return BIKE_CACHE[key];
  const S = 26 * PS, c = mkCanvas(S, S), g = c.getContext('2d');
  g.fillStyle = 'rgba(0,0,0,.2)'; g.beginPath(); g.ellipse(S / 2, S * 0.93, S * 0.34, S * 0.05, 0, 0, 7); g.fill();
  g.imageSmoothingEnabled = false;
  if (flip) { g.translate(S, 0); g.scale(-1, 1); }
  g.drawImage(HERO_ART.bike, i * 64, 0, 64, 64, 0, 0, S, S);
  return (BIKE_CACHE[key] = c);
}
const _enterMapBike = enterMap;
enterMap = async function (...a) { const r = await _enterMapBike(...a); if (RT.map && RT.map.kind === 'int' && RT.P) RT.P.bike = false; return r; };
