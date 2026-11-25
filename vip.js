'use strict';
/* ÉCLOSIA — personnages importants dessinés par le joueur : sprites + visages de conversation (Nova et le héros gardent les leurs) */
const FACE_META = {"ilan": [["neutral", "ilan_neutral.png"], ["stern", "ilan_stern.png"]], "ronce": [["neutral", "ronce_neutral.png"], ["smirk", "ronce_smirk.png"], ["laugh", "ronce_laugh.png"], ["sad", "ronce_sad.png"], ["angry", "ronce_angry.png"]], "nox": [["neutral", "nox_neutral.png"], ["smile", "nox_smile.png"], ["angry", "nox_angry.png"]], "oniris": [["neutral", "oniris_neutral.png"], ["sad", "oniris_sad.png"]], "elio": [["neutral", "elio_neutral.png"], ["smile", "elio_smile.png"], ["tender", "elio_tender.png"], ["sad", "elio_sad.png"], ["laugh", "elio_laugh.png"]], "hiver": [["neutral", "hiver_neutral.png"], ["sad", "hiver_sad.png"], ["angry", "hiver_angry.png"]], "lame": [["neutral", "lame_neutral.png"], ["angry", "lame_angry.png"], ["laugh", "lame_laugh.png"]], "aurele": [["neutral", "aurele_neutral.png"], ["smile", "aurele_smile.png"], ["tender", "aurele_tender.png"], ["laugh", "aurele_laugh.png"]], "epine": [["neutral", "epine_neutral.png"]], "ilan31": [["neutral", "ilan31_neutral.png"]], "semeur": [["neutral", "semeur_neutral.png"]], "mere": [["neutral", "mere_neutral.png"]], "rocco": [["neutral", "rocco_neutral.png"]], "sel": [["neutral", "sel_neutral.png"]], "lune": [["neutral", "lune_neutral.png"]], "vael": [["neutral", "vael_neutral.png"]]};

const VIP_KEYS = ['ronce', 'ilan', 'nox', 'oniris', 'elio', 'ilan31', 'nox31', 'hiver', 'lame', 'semeur', 'aurele', 'sauge', 'lierre_j', 'liora', 'lierre', 'lune', 'rocco', 'sel'];
const VIP_IMG = {};
for (const k of VIP_KEYS) { const im = new Image(); im.onload = () => { im._ok = 1; for (const c in NPC_SPR_CACHE) if (c.startsWith(k)) delete NPC_SPR_CACHE[c]; }; im.src = 'img/vip/' + k + '.png'; VIP_IMG[k] = im; }
// qui est qui
const VIP_BY_PAL = () => new Map([[PALS.ronce, 'ronce'], [PALS.epine, 'ilan'], [PALS.nox, 'nox'], [PALS.oniris, 'oniris'], [PALS.elio, 'elio'], [PALS.ilan31, 'ilan31'], [PALS.hiver, 'hiver'], [PALS.lame, 'lame'], [PALS.semeur, 'semeur'], [PALS.aurele, 'aurele']]);
const VIP_BY_NAME = { 'Prof. Lierre': 'lierre', 'Jeune Lierre': 'lierre_j', 'Liora': 'liora', 'Jeune Sauge': 'sauge', 'Madame Lune': 'lune', 'Rocco': 'rocco', 'Capitaine Sel': 'sel', 'Général Nox': 'nox31', 'Gardien Nox': 'nox31', 'Maître Ronce': 'ronce', 'Roi Ronce': 'ronce', 'Ronce': 'ronce', 'Elio': 'elio', 'Oniris': 'oniris', "Reine d'Hiver": 'hiver', 'Aurèle': 'aurele', 'Le Semeur': 'semeur', 'Ilan (An 31)': 'ilan31', 'Commandant Épine': 'ilan', 'Épine': 'ilan', 'Ilan': 'ilan' };
let VIP_PALMAP = null;
function vipKey(n) {
  if (!VIP_PALMAP) VIP_PALMAP = VIP_BY_PAL();
  if (n.pal === PALS.rival || n.pal === PALS.player) return null;
  if (n.story === 'a_trio') return 'sauge';
  const nm = (n.trainer && n.trainer.name) || n.speaker;
  if (nm && VIP_BY_NAME[nm]) return VIP_BY_NAME[nm];
  if (n.pal && VIP_PALMAP.has(n.pal)) return VIP_PALMAP.get(n.pal);
  return null;
}
// le sprite : dessin de face, le corps pivote un peu selon la direction
function vipSprite(key, dir, frame) {
  const im = VIP_IMG[key]; if (!im || !im._ok) return null;
  const ck = key + dir + frame + PS; if (NPC_SPR_CACHE[ck]) return NPC_SPR_CACHE[ck];
  const S = 16 * PS, c = mkCanvas(S, S), g = c.getContext('2d');
  const h = S * 1.04, w = im.width * h / im.height;
  g.fillStyle = 'rgba(0,0,0,.2)'; g.beginPath(); g.ellipse(S / 2, S * 0.95, S * 0.2, S * 0.055, 0, 0, 7); g.fill();
  g.save(); g.translate(S / 2, S * 0.985);
  if (dir === 'left' || dir === 'right') g.scale(dir === 'left' ? -0.86 : 0.86, 1);   // de trois quarts
  g.imageSmoothingEnabled = false;
  if (dir === 'up') { g.filter = 'brightness(0.55) saturate(0.7)'; }               // vu de dos : silhouette sombre
  if (typeof stepDraw === 'function') stepDraw(g, im, 0, 0, im.width, im.height, -w / 2, -h, w, h, frame); else g.drawImage(im, -w / 2, -h, w, h);
  g.restore();
  return (NPC_SPR_CACHE[ck] = c);
}
const _npcKeyVip = npcKey;
npcKey = function (n) { if (n._vk === undefined) n._vk = vipKey(n); return n._vk ? 'vip:' + n._vk : _npcKeyVip(n); };
const _npcImgSpriteVip = npcImgSprite;
npcImgSprite = function (key, dir, frame) { if (key && key.startsWith('vip:')) return vipSprite(key.slice(4), dir, frame); return _npcImgSpriteVip(key, dir, frame); };
/* ---------- Visages de conversation ---------- */
const FACE_NAME = Object.assign({}, VIP_BY_NAME, { 'Ilan': 'ilan', 'Épine': 'epine', 'Commandant Épine': 'epine', 'Nox': 'nox', 'Général Nox': 'nox', 'Lame Bleue': 'lame', "L'Hiver (écho)": 'hiver', 'MÈRE': 'mere', 'Vael': 'vael', 'Rocco': 'rocco', 'Capitaine Sel': 'sel', 'Madame Lune': 'lune', 'Le Semeur': 'semeur', 'Ilan (An 31)': 'ilan31' });
const FACE_FALL = { smirk: ['smirk', 'smile', 'neutral'], smile: ['smile', 'tender', 'laugh', 'neutral'], laugh: ['laugh', 'smile', 'neutral'], tender: ['tender', 'smile', 'neutral'], sad: ['sad', 'tender', 'neutral'], cry: ['sad', 'tender', 'neutral'], angry: ['angry', 'stern', 'neutral'], stern: ['stern', 'angry', 'neutral'], surprised: ['neutral'], neutral: ['neutral'] };
const FACE_IMG = {};
function faceImg(fn) { let im = FACE_IMG[fn]; if (!im) { im = FACE_IMG[fn] = new Image(); im.onload = () => { im._ok = 1; for (const k in PORTRAIT_CACHE) if (k.startsWith('face|')) delete PORTRAIT_CACHE[k]; if (typeof URL_CACHE !== 'undefined') for (const k in URL_CACHE) if (k.startsWith('pt:')) delete URL_CACHE[k]; }; im.src = 'img/facef/' + fn.replace(/\.png$/, '.webp'); } return im._ok ? im : null; }
setTimeout(() => { for (const k in FACE_META) for (const [, fn] of FACE_META[k]) faceImg(fn); }, 3500);
function faceFor(name, expr) {
  let k = FACE_NAME[name]; if (!k && name) { const b = name.replace(/^(Commandant|Général|Gardien|Gardienne|Maître|Roi)\s+/, ''); k = FACE_NAME[b]; }
  if (!k || !FACE_META[k]) return null;
  const list = FACE_META[k], want = FACE_FALL[expr || 'neutral'] || ['neutral'];
  for (const e of want) { const f = list.find(x => x[0] === e); if (f) return faceImg(f[1]); }
  return faceImg(list[0][1]);
}
const _portraitCanvasVip = portraitCanvas;
portraitCanvas = function (name, expr) {
  if (name !== 'Nova') {
    const im = faceFor(name, expr);
    if (im) {
      const key = 'face|' + name + '|' + expr; if (PORTRAIT_CACHE[key]) return PORTRAIT_CACHE[key];
      const c = mkCanvas(256, 256), g = c.getContext('2d'); g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
      g.drawImage(im, 0, 0, 256, 256);
      return (PORTRAIT_CACHE[key] = c);
    }
  }
  return _portraitCanvasVip(name, expr);
};
// aussi dans les scènes de l'histoire et partout où le jeu dessine ces personnages
const _personSpriteVip = personSprite;
personSprite = function (pal, dir, frame) {
  if (!VIP_PALMAP) VIP_PALMAP = VIP_BY_PAL();
  const k = pal && VIP_PALMAP.get(pal);
  if (k) { const s = vipSprite(k, dir, frame || 0); if (s) return s; }
  return _personSpriteVip(pal, dir, frame);
};
