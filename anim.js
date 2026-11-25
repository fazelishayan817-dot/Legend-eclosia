'use strict';
/* ============================================================
   ÉCLOSIA — animation des créatures peintes + compagnon qui suit
   ============================================================ */
// Style de mouvement selon la créature
const ANIM_STYLE = {};
function animStyle(sp) {
  if (ANIM_STYLE[sp]) return ANIM_STYLE[sp];
  const s = SP[sp], t = s.types, n = s.n.toLowerCase(), h = hashStr(sp);
  let k = 'beast';
  if (t.includes('vent') || /aile|griff|plum|hibou|aigl|corax|libell|phal|orphal|vouivre|avis/.test(n)) k = 'fly';
  else if (/serp|nehrbe|ondul|anguiv|voltur|aquaserp|spiral|rocserp|serpentr/.test(n)) k = 'snake';
  else if (/méd|medu|tentac|pieuvr|spectre|céphal|lumin|éthér|ethér|wisp|aquaglyph|abstin/.test(n) || (t.includes('esprit') && h % 3 === 0)) k = 'float';
  else if (t.includes('dragon')) k = 'wing';
  else if (/golem|géant|geant|titan|colosse|olosse|rok|roc|mécan|mechan|crâne|lith|arbr|chêne|bois|tortue|dos|carap|garde/.test(n)) k = 'heavy';
  return (ANIM_STYLE[sp] = { k, ph: (h % 628) / 100, sp: 0.85 + (h % 30) / 100 });
}
/* Dessine une image en tranches horizontales déformées :
   respiration, balancement, battements d'ailes, ondulation, flottement. */
function galAnim(g, img, dx, dy, w, h, t, o) {
  if (!img) return;
  o = o || {};
  const st = animStyle(o.sp), T = t * st.sp + st.ph, N = 28;
  const _sm = g.imageSmoothingEnabled; if (!(SP[o.sp] && SP[o.sp].gal)) g.imageSmoothingEnabled = false; else g.imageSmoothingQuality = 'high';
  const iw = img.width, ih = img.height;
  let bob = 0, breath = Math.sin(T * 2.4) * 0.032, sway = 0.024, flap = 0, wave = 0, tilt = 0;
  // petit geste périodique (s'étire, gronde) toutes les ~5 s
  const ph = (T % 5.2), burst = ph < 0.7 ? Math.sin(ph / 0.7 * Math.PI) : 0;
  if (st.k === 'wing') { flap = Math.sin(T * 4) * 0.045 + burst * Math.sin(T * 14) * 0.06; bob = Math.sin(T * 2) * h * 0.012; }
  if (st.k === 'fly') { bob = Math.sin(T * 3.2) * h * 0.05; flap = Math.sin(T * 9) * 0.09; breath *= 0.6; }
  else if (st.k === 'float') { bob = Math.sin(T * 1.8) * h * 0.045; wave = 0.035; sway = 0.01; }
  else if (st.k === 'snake') { wave = 0.05; sway = 0.012; }
  else if (st.k === 'heavy') { breath *= 0.7; sway = 0.01; bob = Math.abs(Math.sin(T * 1.2)) * -h * 0.006; }
  if (!o.act && !o.hurt) { breath += burst * 0.035; sway += burst * 0.02; }
  if (o.act) { breath = 0; tilt = (o.back ? 1 : -1) * 0.12 * (o.pop || 0.6); flap *= 2.2; wave *= 1.6; }
  if (o.hurt) { breath = 0; flap = 0; wave = 0; sway = 0; tilt = (o.back ? -1 : 1) * 0.08; }
  const H = h * (1 + breath), Wb = w * (1 - breath * 0.6), top = dy + (h - H) + bob;
  g.save();
  if (tilt) { g.translate(dx + w / 2, dy + h); g.rotate(tilt); g.translate(-(dx + w / 2), -(dy + h)); }
  // Tête : petit hochement avec la respiration, et un regard de côté de temps en temps
  const grounded = st.k === 'beast' || st.k === 'heavy' || st.k === 'wing';
  const lookPh = (T + st.ph * 3) % 6.5, look = lookPh < 1.6 ? Math.sin(lookPh / 1.6 * Math.PI) : 0;
  const lookDir = (Math.floor((T + st.ph * 3) / 6.5) % 2) ? 1 : -1;
  const headX = (o.hurt || o.walk ? 0 : look * lookDir * w * 0.055) * (o.back ? -1 : 1);
  const nod = (o.hurt ? 0.035 : o.walk ? 0.012 + Math.abs(Math.sin(o.walkPh || 0)) * 0.03 : Math.sin(T * 2.4 + 0.6) * 0.02 + look * 0.014 + (o.act ? 0.035 : 0)) * H;
  // Pattes : appui d'une patte sur l'autre au repos, piétinement en attaque
  const stepPh = (T + st.ph) % 3.6, stepping = !o.act && !o.hurt && !o.walk && stepPh < 1.2;   // de temps en temps, deux petits pas sur place
  const legAmp = grounded ? (o.walk ? 0.07 : o.act ? 0.06 : o.hurt ? 0 : (stepping ? 0.045 : 0.022) + burst * 0.02) : 0;
  const legT = o.walk ? (o.walkPh || 0) : o.act ? T * 9 : stepping ? stepPh * 2 * Math.PI / 0.6 : T * 2.6, legSplit = grounded && legAmp > 0;
  const smooth = (e0, e1, x) => { const k = Math.max(0, Math.min(1, (x - e0) / (e1 - e0))); return k * k * (3 - 2 * k); };
  const yAt = v => top + v * H + nod * (1 - smooth(0.22, 0.46, v));       // la tête descend, le cou s'étire, le corps reste
  for (let i = 0; i < N; i++) {
    const v0 = i / N, v1 = (i + 1) / N, u = 1 - (i + 0.5) / N;           // u : hauteur au-dessus des pieds (0 en bas, 1 en haut)
    const sy = v0 * ih, sh = ih / N;
    let sx = Math.sin(T * 2 + u * 1.6) * w * sway * u * u;
    sx += Math.sin(T * 3.4 - u * 7) * w * wave * (0.3 + u * 0.7);
    sx += headX * smooth(0.55, 0.8, u);
    const fw = Wb * (1 + flap * Math.max(0, u - 0.25));
    const y0 = yAt(v0), hh = yAt(v1) - y0 + 0.7, x0 = dx + (w - fw) / 2 + sx;
    if (legSplit && u < 0.3) {            // bas du corps : moitié gauche et moitié droite bougent en alternance
      const k = 1 - u / 0.3, a = Math.sin(legT) * legAmp * k, lift = Math.max(0, Math.sin(legT)) * H * 0.04 * k, lift2 = Math.max(0, -Math.sin(legT)) * H * 0.04 * k;
      // les deux moitiés se chevauchent un peu au centre pour ne jamais laisser de fente
      const ov = 0.12, sw2 = iw * (0.5 + ov), dw2 = fw * (0.5 + ov);
      g.drawImage(img, iw * (0.5 - ov), sy, sw2, sh, x0 + fw * (0.5 - ov) - a * w, y0 - lift2, dw2, hh);
      g.drawImage(img, 0, sy, sw2, sh, x0 + a * w, y0 - lift, dw2, hh);
    } else g.drawImage(img, 0, sy, iw, sh, x0, y0, fw, hh);
  }
  if (o.act && !o.hurt) {   // halo d'énergie pendant l'attaque
    const c = TYPE_GLOW[SP[o.sp].types[0]] || '255,255,255', a = 0.28 * (o.pop || 0.5);
    const gr = g.createRadialGradient(dx + w / 2, dy + h * 0.55, 2, dx + w / 2, dy + h * 0.55, w * 0.55);
    gr.addColorStop(0, `rgba(${c},${a})`); gr.addColorStop(1, `rgba(${c},0)`);
    g.globalCompositeOperation = 'lighter'; g.fillStyle = gr; g.fillRect(dx, dy, w, h);
  }
  g.restore(); g.imageSmoothingEnabled = _sm;
}
const TYPE_GLOW = { feu: '255,140,60', eau: '90,170,255', flore: '120,230,110', foudre: '255,230,80', roc: '220,180,120', vent: '200,240,255', givre: '170,240,255', esprit: '220,140,255', ombre: '160,90,220', lumiere: '255,250,190', toxine: '190,110,230', acier: '210,220,235', combat: '255,120,90', dragon: '140,120,255', normal: '255,255,255' };

/* ---------- Compagnon : la créature de tête suit le joueur ---------- */
const FOL = { trail: [], map: null, x: 0, y: 0, dir: 'down', moving: 0, last: 0 };
function followerMon() {
  if (!G || !G.party || (G.flags && G.flags.noFollow)) return null;
  return G.party.find(m => m.hp > 0) || null;
}
function followerUpdate() {
  const P = RT.P, m = RT.map; if (!P || !m) return;
  const px = P.px, py = P.py;
  const T = FOL.trail;
  if (FOL.map !== m || !T.length || Math.hypot(px - T[T.length - 1][0], py - T[T.length - 1][1]) > 40) {
    FOL.map = m; T.length = 0;
    const d = { up: [0, 16], down: [0, -16], left: [16, 0], right: [-16, 0] }[P.dir] || [0, -16];
    T.push([px + d[0], py + d[1]]); FOL.x = px + d[0]; FOL.y = py + d[1];
  }
  const L = T[T.length - 1];
  if (L[0] !== px || L[1] !== py) T.push([px, py]);
  // garde le point situé ~16 px derrière le joueur, le long du chemin
  let dist = 0, k = T.length - 1;
  while (k > 0 && dist < 16) { dist += Math.hypot(T[k][0] - T[k - 1][0], T[k][1] - T[k - 1][1]); k--; }
  if (k > 0) T.splice(0, k);
  const nx = T[0][0], ny = T[0][1], dx = nx - FOL.x, dy = ny - FOL.y;
  FOL.moving = Math.abs(dx) + Math.abs(dy) > 0.01 ? 8 : Math.max(0, FOL.moving - 1);
  if (Math.abs(dx) > Math.abs(dy)) FOL.dir = dx > 0 ? 'right' : 'left'; else if (Math.abs(dy) > 0.01) FOL.dir = dy > 0 ? 'down' : 'up';
  FOL.x = nx; FOL.y = ny;
}
let drawFollower; // version définitive : marche.js
const _drawOverworldFol = drawOverworld;
drawOverworld = function (x) {
  try {
    if (RT.map && RT.P && followerMon()) {
      followerUpdate();
      let f = RT.npcs.find(n => n.kind === 'follower');
      if (!f) { f = { kind: 'follower', x: -999, y: -999, px: 0, py: 0, dir: 'down', draw: (g, sx, sy) => drawFollower(g, sx, sy) }; RT.npcs.push(f); }
      f.px = FOL.x; f.py = FOL.y;
    } else if (RT.npcs) { const i = RT.npcs.findIndex(n => n.kind === 'follower'); if (i >= 0) RT.npcs.splice(i, 1); }
  } catch (e) { }
  return _drawOverworldFol(x);
};

/* ---------- Pas de marche pour les personnages dessinés d'une seule pièce ----------
   Le haut du corps rebondit, le bas est coupé en deux : une jambe se lève et avance,
   puis l'autre. Utilisé pour les PNJ de l'atlas et les personnages importants. */
function stepDraw(g, img, sx, sy, sw, sh, dx, dy, dw, dh, frame) {
  if (!frame) { g.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh); return; }
  const cut = 0.62, bob = -dh * 0.025, stride = dw * 0.05, lift = dh * 0.045, side = frame === 1 ? 1 : -1;
  // haut du corps, légèrement penché dans le sens du pas
  g.drawImage(img, sx, sy, sw, sh * cut, dx + side * dw * 0.01, dy + bob, dw, dh * cut + 0.6);
  const ly = sy + sh * cut, lh = sh * (1 - cut), dly = dy + dh * cut;
  // jambe gauche puis jambe droite : celle qui avance se lève
  const ov = 0.1, sw2 = sw * (0.5 + ov), dw2 = dw * (0.5 + ov);
  g.drawImage(img, sx + sw * (0.5 - ov), ly, sw2, lh, dx + dw * (0.5 - ov) + (side < 0 ? -stride : stride * 0.4), dly + bob * 0.5 - (side < 0 ? lift : 0), dw2, dh * (1 - cut));
  g.drawImage(img, sx, ly, sw2, lh, dx + (side > 0 ? stride : -stride * 0.4), dly + bob * 0.5 - (side > 0 ? lift : 0), dw2, dh * (1 - cut));
}
