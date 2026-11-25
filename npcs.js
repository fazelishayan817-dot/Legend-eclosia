'use strict';
/* ÉCLOSIA — PNJ dessinés (planches du joueur) + vie : marche, respiration, regards */
const NPC_ATLAS = {"cw":56,"ch":72,"lib":{"boy":{"down":0,"left":1,"up":2,"side":"L"},"girl":{"down":3,"left":4,"up":5,"side":"L"},"fisher":{"down":6,"left":7,"up":8,"side":"L"},"school":{"down":9,"left":10,"up":11,"side":"L"},"hiker":{"down":12,"left":13,"up":14,"side":"L"},"cheer":{"down":15,"left":16,"up":17,"side":"L"},"twin":{"down":18,"left":19,"up":20,"side":"L"},"black":{"down":21,"left":22,"up":23,"side":"L"},"karate":{"down":24,"left":25,"up":26,"side":"L"},"sci":{"down":27,"up":28,"left":29,"side":"R"},"blond":{"down":30,"up":31,"left":32,"side":"R"},"police":{"down":33,"up":34,"left":35,"side":"R"},"worker":{"down":36,"up":37,"side":"L"},"goggles":{"down":38,"left":39,"side":"R"},"camper":{"down":40,"up":41,"side":"L"},"cyclist":{"down":42,"up":43,"side":"L"},"sailor":{"down":44,"up":45,"left":46,"side":"L"},"bugman":{"down":47,"up":48,"side":"L"},"tank":{"down":49,"up":50,"side":"L"},"redshirt":{"down":51,"up":52,"left":53,"side":"R"},"kid":{"down":54,"up":55,"side":"L"},"punk":{"down":56,"left":57,"side":"R"},"olive":{"down":58,"side":"L"},"vest":{"down":59,"side":"L"},"pinkgirl":{"down":60,"side":"L"},"greendress":{"down":61,"side":"L"},"camera":{"down":62,"side":"L"},"greenwoman":{"down":63,"side":"L"},"brownman":{"down":64,"side":"L"},"baldsuit":{"down":65,"side":"L"},"suit":{"down":66,"side":"L"},"reddress":{"down":67,"side":"L"},"blouse":{"down":68,"side":"L"},"lady":{"down":69,"side":"L"},"clerk":{"down":70,"side":"L"},"swimmer":{"down":71,"side":"L"},"swimgirl":{"down":72,"side":"L"},"waitress":{"down":73,"side":"L"},"maid":{"down":74,"side":"L"},"cowboy":{"down":75,"side":"L"},"suit2":{"down":76,"side":"L"},"blondsuit":{"down":77,"side":"L"},"goggles2":{"down":78,"side":"L"},"glasses":{"down":79,"side":"L"},"suit3":{"down":80,"side":"L"},"dancer":{"down":81,"side":"L"}},"h":[48,45,47,46,47,46,47,47,47,47,47,47,45,44,45,42,42,46,43,43,44,44,44,45,49,51,49,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,64,66,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70]};

const NPC_IMG = new Image(); NPC_IMG.onload = () => { NPC_IMG._ok = 1; for (const k in NPC_SPR_CACHE) delete NPC_SPR_CACHE[k]; }; NPC_IMG.src = 'img/npc_atlas.png';
const NPC_SPR_CACHE = {};
// rôles importants
const NPC_ROLE = () => new Map([[PALS.prof, 'sci'], [PALS.nurse, 'maid'], [PALS.sailor, 'sailor'], [PALS.guard, 'police'], [PALS.mom, 'blouse'], [PALS.clerk, 'clerk']]);
const NPC_CLS = { gamin: 'boy', fillette: 'girl', scout: 'camper', randonneur: 'hiker', montagnard: 'tank', pecheur: 'fisher', nageur: ['swimmer', 'swimgirl'], ornitho: 'bugman', karateka: 'karate', mystique: 'black', dresseur: ['blond', 'redshirt', 'goggles', 'boy'], dresseuse: ['school', 'twin', 'cheer', 'punk'], savant: 'glasses', veilleur: 'black', archiviste: 'baldsuit' };
const NPC_POOL = ['boy', 'girl', 'fisher', 'school', 'hiker', 'cheer', 'twin', 'blond', 'worker', 'goggles', 'camper', 'cyclist', 'bugman', 'redshirt', 'kid', 'punk', 'olive', 'vest', 'pinkgirl', 'greendress', 'camera', 'greenwoman', 'brownman', 'baldsuit', 'suit', 'reddress', 'blouse', 'lady', 'waitress', 'cowboy', 'suit2', 'blondsuit', 'goggles2', 'glasses', 'suit3', 'dancer', 'tank'];
let NPC_ROLES = null;
function npcKey(n) {
  if (n._sk !== undefined) return n._sk;
  if (!NPC_ROLES) NPC_ROLES = NPC_ROLE();
  let k = null;
  if (NPC_ROLES.has(n.pal)) k = NPC_ROLES.get(n.pal);
  else if (n.trainer && NPC_CLS[n.trainer.cls] && (!n.pal || NPC_PALS.includes(n.pal))) { const v = NPC_CLS[n.trainer.cls]; k = Array.isArray(v) ? v[hashStr(n.trainer.name || '') % v.length] : v; }
  else if (!n.pal || NPC_PALS.includes(n.pal)) {
    const id = (RT.map && RT.map.id || '') + ':' + (n.src != null ? n.src : '') + ':' + n.hx + ',' + n.hy + (n.speaker || '');
    k = NPC_POOL[hashStr(id) % NPC_POOL.length];
  }
  return (n._sk = k);
}
// image d'une direction : left/right/up repliés sur les vues existantes
function npcCell(key, dir) {
  const e = NPC_ATLAS.lib[key]; if (!e) return null;
  let cell = e.down, flip = false;
  if (dir === 'up' && e.up != null) cell = e.up;
  else if ((dir === 'left' || dir === 'right') && e.left != null) { cell = e.left; flip = (e.side === 'L') !== (dir === 'left'); }
  return { cell, flip };
}
function npcImgSprite(key, dir, frame) {
  if (!NPC_IMG._ok) return null;
  const ck = key + dir + frame + PS; if (NPC_SPR_CACHE[ck]) return NPC_SPR_CACHE[ck];
  const r = npcCell(key, dir); if (!r) return null;
  const S = 16 * PS, c = mkCanvas(S, S), g = c.getContext('2d'), CW = NPC_ATLAS.cw, CH = NPC_ATLAS.ch;
  const hh = NPC_ATLAS.h[r.cell] || CH, small = key === 'kid' ? 0.86 : 1;
  const k = (S * 1.02 * small) / hh;                     // tout le monde à la même taille
  const w = CW * k, h = CH * k;
  g.fillStyle = 'rgba(0,0,0,.2)'; g.beginPath(); g.ellipse(S / 2, S * 0.95, S * 0.2, S * 0.055, 0, 0, 7); g.fill();
  g.save(); g.translate(S / 2, S * 0.985);
  if (r.flip) g.scale(-1, 1);
  g.imageSmoothingEnabled = false;
  if (typeof stepDraw === 'function') stepDraw(g, NPC_IMG, (r.cell % 16) * CW, Math.floor(r.cell / 16) * CH, CW, CH, -w / 2, -h, w, h, frame);
  else g.drawImage(NPC_IMG, (r.cell % 16) * CW, Math.floor(r.cell / 16) * CH, CW, CH, -w / 2, -h, w, h);
  g.restore();
  return (NPC_SPR_CACHE[ck] = c);
}
// dessin d'un PNJ dans le monde, avec respiration
let drawNpcLive; // version définitive : marche.js
// les PNJ ordinaires flânent et regardent autour d'eux
const _buildNpcsLive = buildNpcs;
buildNpcs = function () {
  _buildNpcsLive();
  for (const n of RT.npcs) if (n.kind === 'npc' && !n.trainer && !n.script && n.wander == null && !n.sleep) { const h = hashStr((RT.map.id || '') + n.x + ',' + n.y); if (h % 3 !== 0) n.wander = 1; }
};
const _updateNpcsLive = updateNpcs;
updateNpcs = function () {
  _updateNpcsLive();
  if (RT.busy || UI.stack.length) return;
  for (const n of RT.npcs) {
    if (n.mv || n.kind !== 'npc' || n.trainer || n.sleep != null) continue;
    if (Math.random() < 0.004) n.dir = pick(Math.random, ['up', 'down', 'left', 'right']);
  }
};
/* ---------- Légendaires dessinés ---------- */
const LEG_ART = { nocturnis: 'stag', auberis: 'phoenix', aquoree: 'whale' };
const LEG_IMG = {};
function legImg(name) { let im = LEG_IMG[name]; if (!im) { im = LEG_IMG[name] = new Image(); im.onload = () => { im._ok = 1; for (const sp in LEG_ART) { delete MON_CACHE[sp]; delete MON_CACHE[sp + '*']; delete MON_CACHE['b:' + sp]; delete MON_CACHE['b:' + sp + '*']; for (const k in URL_CACHE) if (k.startsWith(sp) || k === 'sil:' + sp) delete URL_CACHE[k]; for (const k in BMON) if (k.startsWith(sp)) delete BMON[k]; for (const k in BIG) if (k.startsWith(sp + ':')) delete BIG[k]; } }; im.src = 'img/leg/' + name + '.png'; } return im._ok ? im : null; }
for (const sp in LEG_ART) {
  const a = LEG_ART[sp];
  SP[sp].img = 'img/leg/' + a + '_front.png'; SP[sp].gal = 3;
  if (a !== 'whale') SP[sp].imgBack = 'img/leg/' + a + '_back_s.png';
  legImg(a + '_front'); if (a !== 'whale') { legImg(a + '_back_s'); for (let i = 0; i < 4; i++) legImg(a + '_f' + i + '_s'); }
}
// dos dessiné pour le cerf et le phénix
const _galCanvasLeg = galCanvas;
galCanvas = function (sp, size, shiny, back) {
  const s = SP[sp];
  if (back && s && s.imgBack) {
    const im = legImg(s.imgBack.replace('img/leg/', '').replace('.png', '')); if (!im) return _galCanvasLeg(sp, size, shiny, back);
    const c = mkCanvas(size, size), x = c.getContext('2d'); x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high';
    if (shiny) x.filter = 'hue-rotate(150deg) saturate(1.2)';
    const k = Math.min(size * 0.94 / im.width, size * 0.9 / im.height), w = im.width * k, h = im.height * k;
    x.fillStyle = 'rgba(0,0,0,.22)'; x.beginPath(); x.ellipse(size / 2, size * 0.95, w * 0.38, size * 0.035, 0, 0, 7); x.fill();
    x.drawImage(im, (size - w) / 2, size * 0.96 - h, w, h); return c;
  }
  return _galCanvasLeg(sp, size, shiny, back);
};
// dans le monde : le cerf marche, le phénix bat des ailes, la baleine ondule
function drawLegendLive(x, n, sx, sy) {
  const sp = LEGENDS[n.legend] && LEGENDS[n.legend].sp, a = LEG_ART[sp]; if (!a) return false;
  const t = RT.frame / 60, glow = 0.35 + 0.15 * Math.sin(t * 3);
  const gr = x.createRadialGradient(sx + 8, sy + 2, 2, sx + 8, sy + 2, 30);
  gr.addColorStop(0, `rgba(${a === 'stag' ? '140,255,200' : a === 'phoenix' ? '190,120,255' : '120,200,255'},${glow})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = gr; x.fillRect(sx - 24, sy - 28, 64, 60);
  if (a === 'whale') { const im = legImg('whale_front'); if (!im) return false; galAnim(x, im, sx - 22, sy - 14 + Math.sin(t * 1.6) * 2, 60, 30, t, { sp }); return true; }
  const fi = Math.floor(RT.frame / (a === 'phoenix' ? 7 : 10)) % 4, im = legImg(a + '_f' + fi + '_s'); if (!im) return false;
  const H = a === 'phoenix' ? 40 : 38, W = im.width * H / im.height, fly = a === 'phoenix' ? Math.sin(t * 2.5) * 3 - 6 : 0;
  x.fillStyle = 'rgba(0,0,0,.22)'; x.beginPath(); x.ellipse(sx + 8, sy + 13, 12, 3, 0, 0, 7); x.fill();
  x.save(); if (Math.floor(t / 4) % 2) { x.translate(sx + 8, 0); x.scale(-1, 1); x.translate(-(sx + 8), 0); }
  x.drawImage(im, sx + 8 - W / 2, sy + 14 - H + fly, W, H); x.restore();
  return true;
}
ANIM_STYLE.aquoree = { k: 'snake', ph: 0.4, sp: 0.7 };
