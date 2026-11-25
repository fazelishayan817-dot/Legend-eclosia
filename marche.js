'use strict';
/* ============================================================
   ÉCLOSIA — démarche
   Marche et course réalistes : cycle de pas continu d'une case à
   l'autre, rebond du corps, appui et poussée, inclinaison en
   courant, poussière et herbe soulevées, respiration à l'arrêt.
   Les PNJ remarquent le joueur, le compagnon trotte au rythme
   de ses pattes. Sert aussi à l'intro.
   ============================================================ */

/* Cycle de pas. dist = distance parcourue en pixels de sprite (16 = une case).
   Marche : un pas par case. Course : une foulée longue pour deux cases. */
function gaitOf(dist, moving, run) {
  if (!moving) return { moving: false, frame: 0, bob: 0, sq: 0, lean: 0, ph: 0 };
  const ph = dist * Math.PI / (run ? 32 : 16), s = Math.sin(ph), a = Math.abs(s);
  const frame = a > (run ? 0.2 : 0.38) ? (s > 0 ? 1 : 2) : 0;
  let bob, sq, lean;
  if (run) {
    // en course, le corps s'envole quand les jambes sont écartées et s'écrase à l'appui
    bob = -a * 1.25 + 0.25;
    sq = Math.max(0, 0.35 - a) * 0.16;
    lean = 0.11;
  } else {
    // en marche, le corps descend un peu quand les jambes sont écartées
    bob = a * 0.55 - 0.1;
    sq = Math.max(0, a - 0.75) * 0.06;
    lean = 0.035;
  }
  return { moving: true, frame, bob, sq, lean, ph, run: !!run };
}

/* Dessine un personnage (sprite 16×16 avec ses pieds en bas) avec la démarche :
   rebond, écrasement à l'appui, inclinaison vers l'avant, respiration à l'arrêt. */
function drawWalker(x, img, sx, sy, w, h, gt, dir, idleT) {
  const k = h / 16, fx = sx + w / 2, fy = sy + h * 0.97;
  let sxk = 1, syk = 1, skew = 0, by = 0;
  if (gt && gt.moving) {
    by = gt.bob * k; syk = 1 - gt.sq; sxk = 1 + gt.sq * 0.7;
    skew = gt.lean * (dir === 'right' ? 1 : dir === 'left' ? -1 : 0);
    if (dir === 'down') syk *= 1 - gt.lean * 0.12;           // de face, le buste se penche vers nous
  } else if (idleT != null) {
    const b = Math.sin(idleT) * 0.016; syk = 1 + b; sxk = 1 - b * 0.4;   // respiration
  }
  x.save(); x.translate(fx, fy + by);
  if (skew) x.transform(1, 0, -skew, 1, 0, 0);
  x.scale(sxk, syk);
  x.drawImage(img, -w / 2, -(fy - sy), w, h);
  x.restore();
}

/* ---------- Poussière, herbe, éclaboussures ---------- */
const DUST = [];
function dustPuff(wx, wy, kind, dir) {
  if (DUST.length > 40) DUST.shift();
  const back = { right: -1, left: 1 }[dir] || 0, n = kind === 'grass' ? 3 : 2;
  for (let i = 0; i < n; i++) DUST.push({ x: wx + (Math.random() - 0.5) * 5, y: wy + (Math.random() - 0.5) * 2, vx: back * (0.15 + Math.random() * 0.2) + (Math.random() - 0.5) * 0.15, vy: kind === 'grass' ? -0.35 - Math.random() * 0.3 : -0.08 - Math.random() * 0.08, t0: RT.frame, life: kind === 'grass' ? 20 : 22, kind });
}
function drawDust(x, camX, camY) {
  for (let i = DUST.length - 1; i >= 0; i--) {
    const d = DUST[i], a = (RT.frame - d.t0) / d.life;
    if (a >= 1 || a < 0) { DUST.splice(i, 1); continue; }
    const t = RT.frame - d.t0, px = d.x + d.vx * t - camX, py = d.y + d.vy * t + (d.kind === 'grass' ? 0.02 * t * t : 0) - camY;
    if (d.kind === 'grass') { x.fillStyle = `rgba(86,170,70,${0.9 * (1 - a)})`; x.fillRect(px, py, 1.4, 1); }
    else { x.fillStyle = `rgba(235,225,205,${0.5 * (1 - a)})`; x.beginPath(); x.arc(px, py, 0.8 + a * 2.2, 0, 7); x.fill(); }
  }
}

/* ---------- Joueur ---------- */
function playerRunning(P) {
  return !P.bike && !P.surf && (!!Input.held.b !== !!(G && G.opts && G.opts.autoRun));
}
function drawPlayerWalk(x, P, sx, sy, camX, camY) {
  const run = playerRunning(P), gt = gaitOf(P.dist || 0, P.moving, run);
  // un appui au sol : poussière en courant, herbe qui vole dans les hautes herbes
  if (P.moving && gt.frame !== (P._lastFr || 0)) {
    const tile = tileAt(Math.round(P.px / TS), Math.round(P.py / TS));
    if (gt.frame === 0 && run) dustPuff(P.px + 8, P.py + 14, tile === '"' ? 'grass' : 'dust', P.dir);
    else if (gt.frame && tile === '"') dustPuff(P.px + 8, P.py + 13, 'grass', P.dir);
  }
  P._lastFr = gt.frame;
  drawDust(x, camX, camY);
  const idle = P.moving ? null : RT.frame / 30;
  drawWalker(x, personSprite(PALS[G.look] || PALS.player, P.dir, gt.frame), sx, sy, 16, 16, gt, P.dir, idle);
}

/* ---------- PNJ : même démarche, et ils remarquent le joueur ---------- */
const _updateNpcsGait = updateNpcs;
updateNpcs = function () {
  const was = [];
  for (const n of RT.npcs) if (n.mv) was.push(n);
  _updateNpcsGait();
  for (const n of was) { n.dist = (n.dist || 0) + 2; n.frame = n.mv ? gaitOf(n.dist, true, false).frame : 0; }
  for (const n of RT.npcs) if (n.mv && n.mv.prog === 0 && !was.includes(n)) n.frame = 0;
  // quelqu'un qui passe près d'eux : les gens tournent la tête vers lui un moment
  const P = RT.P;
  if (!P || RT.busy || UI.stack.length) return;
  for (const n of RT.npcs) {
    if (n.mv || n.kind !== 'npc' || n.trainer || n.sleep != null || n.script === 'story') continue;
    const dx = P.x - n.x, dy = P.y - n.y, d = Math.abs(dx) + Math.abs(dy);
    if (d >= 1 && d <= 2 && Math.random() < 0.03) {
      n.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
      n._seen = RT.frame;
    }
  }
};
drawNpcLive = function (x, n, sx, sy) {
  const key = typeof npcKey === 'function' ? npcKey(n) : null;
  const img = (key && npcImgSprite(key, n.dir, n.frame || 0)) || personSprite(n.pal || NPC_PALS[0], n.dir, n.frame || 0);
  if (!img) return false;
  const gt = n.mv ? gaitOf(n.dist || 0, true, false) : null;
  const ph = (hashStr(String(n.hx) + n.hy) % 100) / 16;
  drawWalker(x, img, sx, sy - 4, 16, 16, gt, n.dir, n.mv ? null : RT.frame / 26 + ph);
  return true;
};

/* ---------- Compagnon : trot synchronisé sur ses pattes ---------- */
const _followerUpdateGait = followerUpdate;
followerUpdate = function () {
  const ox = FOL.x, oy = FOL.y;
  _followerUpdateGait();
  const d = Math.hypot(FOL.x - ox, FOL.y - oy);
  if (d < 20) FOL.dist = (FOL.dist || 0) + d;
};
drawFollower = function (x, sx, sy) {
  const mon = followerMon(); if (!mon || RT.P.surf) return;
  const s = SP[mon.sp], t = RT.frame / 60, st = animStyle(mon.sp).k;
  const big = s.stage === '3' || s.stage === 'L' || s.stage === 'M' || (s.bst || 0) >= 500;
  const sz = big ? 28 : s.stage === '1' ? 20 : 24;
  const mv = FOL.moving > 0, run = playerRunning(RT.P);
  // les petits bondissent, les moyens trottent, les lourds avancent pesamment
  const stride = big ? 18 : s.stage === '1' ? 10 : 14, ph = (FOL.dist || 0) * Math.PI / stride;
  let hop = 0, sq = 0, hover = 0;
  if (st === 'fly' || st === 'float') hover = 5 + Math.sin(t * (st === 'fly' ? 3.4 : 1.8)) * 1.6 + (mv ? 1 : 0);
  else if (st === 'snake') { hop = 0; }
  else if (mv) {
    const a = Math.abs(Math.sin(ph)), amp = st === 'heavy' ? 0.7 : big ? 1.4 : s.stage === '1' ? 3.2 : 2.2;
    hop = a * amp * (run ? 1.35 : 1);
    sq = a < 0.25 ? (0.25 - a) * (st === 'heavy' ? 0.2 : 0.36) : 0;        // s'écrase à l'atterrissage
  }
  const lift = hop + hover, w = sz * (1 + sq * 0.8), h = sz * (1 - sq);
  const ox = sx + 8 - w / 2, oy = sy + 14 - h - lift;
  const shw = sz * 0.32 * (1 - Math.min(0.45, lift / 18));
  x.fillStyle = `rgba(0,0,0,${0.22 - Math.min(0.1, lift / 60)})`; x.beginPath(); x.ellipse(sx + 8, sy + 14, shw, 2.4 * (1 - Math.min(0.4, lift / 20)), 0, 0, 7); x.fill();
  const flip = FOL.dir === 'right';
  x.save();
  if (flip) { x.translate(sx + 8, 0); x.scale(-1, 1); x.translate(-(sx + 8), 0); }
  const img = mon.shiny && !s.gal ? monSprite(mon.sp, true) : bigMon(mon.sp, Math.round(sz * SCR));
  galAnim(x, img, ox, oy, w, h, t * (mv ? 1.4 : 1), { sp: mon.sp, walk: mv && st !== 'fly' && st !== 'float', walkPh: ph });
  x.restore();
};

/* ---------- Intro : les personnages et les créatures marchent vraiment ---------- */
function introWalker(x, pal, dir, X, Y, size, dist, idleT) {
  const gt = dist == null ? null : gaitOf(dist, true, false);
  // ombre au sol, fixe : le corps rebondit au-dessus
  x.fillStyle = 'rgba(0,0,0,.18)'; x.beginPath(); x.ellipse(X + size / 2, Y + size * 0.95, size * 0.2, size * 0.05, 0, 0, 7); x.fill();
  drawWalker(x, personSprite(pal, dir, gt ? gt.frame : 0), X, Y, size, size, gt, dir, idleT);
}
function introCritter(x, sp, img, X, Y, size, dist, t, stride) {
  const st = animStyle(sp).k, ph = dist * Math.PI / (stride || 9);
  let hop = 0, sq = 0;
  if (st === 'fly' || st === 'float') hop = 6 + Math.sin(t * 3) * 2;
  else { const a = Math.abs(Math.sin(ph)); hop = a * size * 0.16; sq = a < 0.22 ? (0.22 - a) * 0.5 : 0; }
  const w = size * (1 + sq * 0.8), h = size * (1 - sq);
  x.fillStyle = 'rgba(0,0,0,.18)'; x.beginPath(); x.ellipse(X + size / 2, Y + size * 0.96, size * 0.3 * (1 - Math.min(0.4, hop / 20)), size * 0.06, 0, 0, 7); x.fill();
  galAnim(x, img, X + (size - w) / 2, Y + size - h - hop, w, h, t, { sp, walk: st !== 'fly' && st !== 'float', walkPh: ph });
}
