'use strict';
/* ÉCLOSIA — chargement des images peintes sans « flash » des anciens dessins.
   Tant qu'une image peinte est en route (quelques secondes au plus), on n'affiche rien
   au lieu du dessin vectoriel provisoire ; si elle n'arrive pas, le dessin reprend sa place. */
const ART_WAIT = 4000;
const T_LOAD = performance.now();
const BLANKS = {};
function blankCanvas(w, h) { const k = w + 'x' + (h || w); return BLANKS[k] || (BLANKS[k] = mkCanvas(w, h || w)); }
function imgPending(im) { return !!im && !im._ok && !im._err && performance.now() - (im._t || T_LOAD) < ART_WAIT; }
function trackImg(im) {
  if (!im || im._trk) return im; im._trk = 1;
  if (!im._t) im._t = performance.now();
  if (typeof im.addEventListener !== 'function') return im;   // découpe d'une planche : remplacée une fois prête
  if (im.complete && im.src) { if (im.naturalWidth) im._ok = 1; else im._err = 1; }
  im.addEventListener('load', () => { im._ok = 1; });
  im.addEventListener('error', () => { im._err = 1; });
  return im;
}

/* ---------- Créatures ---------- */
const _galImageCh = galImage;
galImage = function (sp) { const r = _galImageCh(sp); trackImg(GAL_IMG[sp]); return r; };
function monPending(sp) { const s = SP[sp]; if (!s || !s.gal || !s.img) return false; galImage(sp); return imgPending(GAL_IMG[sp]); }
const _monSpriteCh = monSprite;
monSprite = function (sp, shiny) { return monPending(sp) ? blankCanvas(160) : _monSpriteCh(sp, shiny); };
const _monBackCh = monBack;
monBack = function (sp, shiny) { return monPending(sp) ? blankCanvas(160) : _monBackCh(sp, shiny); };
const _battleMonCh = battleMon;
battleMon = function (sp, shiny, back, v) { return monPending(sp) ? blankCanvas(Math.min(1120, Math.max(160, Math.round(80 * SCR)))) : _battleMonCh(sp, shiny, back, v); };
const _bigMonCh = bigMon;
bigMon = function (id, sz) { return monPending(id) ? blankCanvas(sz) : _bigMonCh(id, sz); };

/* ---------- Héros, Nova et personnages ---------- */
for (const im of [HERO_ART.ow, HERO_ART.full, HERO_ART.bike, NOVA_ART.ow, NOVA_ART.bust, NPC_IMG]) trackImg(im);
const _personSpriteCh = personSprite;
personSprite = function (pal, dir, frame) {
  if ((isHeroPal(pal) && imgPending(HERO_ART.ow)) || (pal === PALS.rival && imgPending(NOVA_ART.ow))) return blankCanvas(16 * PS);
  return _personSpriteCh(pal, dir, frame);
};
const _portraitCanvasCh = portraitCanvas;
portraitCanvas = function (name, expr) { return name === 'Nova' && imgPending(NOVA_ART.bust) ? blankCanvas(256) : _portraitCanvasCh(name, expr); };
const _npcImgSpriteCh = npcImgSprite;
npcImgSprite = function (key, dir, frame) {
  const r = _npcImgSpriteCh(key, dir, frame); if (r || !key) return r;
  const im = key.startsWith('vip:') ? VIP_IMG[key.slice(4)] : NPC_IMG;
  return imgPending(trackImg(im)) ? blankCanvas(16 * PS) : null;
};

/* ---------- Légendaires dans le monde ---------- */
const _drawLegendLiveCh = drawLegendLive;
drawLegendLive = function (x, n, sx, sy) {
  if (_drawLegendLiveCh(x, n, sx, sy)) return true;
  const sp = LEGENDS[n.legend] && LEGENDS[n.legend].sp, a = LEG_ART[sp]; if (!a) return false;
  for (const k in LEG_IMG) if (k.startsWith(a) && imgPending(trackImg(LEG_IMG[k]))) return true;
  return false;
};

/* ---------- Attente avant la cinématique ---------- */
const INTRO_SP = ['auberis', 'nocturnis', 'aquoree', 'eveillon', 'clapotin', 'feuillon', 'brasille', 'cervolant'];
function criticalImages() {
  const l = [HERO_ART.ow, HERO_ART.full, HERO_ART.bike, NOVA_ART.ow, NOVA_ART.bust, NPC_IMG];
  for (const k in NOVA_EXPR) l.push(NOVA_EXPR[k]);
  for (const k in LEG_IMG) l.push(LEG_IMG[k]);
  for (const k in VIP_IMG) l.push(VIP_IMG[k]);
  for (const id of INTRO_SP) if (SP[id] && SP[id].img) { galImage(id); l.push(GAL_IMG[id]); }
  for (const id in GAL_IMG) if (/startf\//.test(SP[id].img)) l.push(GAL_IMG[id]);
  return l.filter(im => im && typeof im.addEventListener === 'function');
}
function waitImages(list, ms) {
  const one = im => (im._ok || im._err || im.complete) ? Promise.resolve() :
    new Promise(r => { im.addEventListener('load', r, { once: true }); im.addEventListener('error', r, { once: true }); });
  return Promise.race([Promise.all(list.map(one)), new Promise(r => setTimeout(r, ms))]);
}
// dès le lancement, la cinématique attend ses images (8 s au plus)
const ART_READY = waitImages(criticalImages(), 8000);
