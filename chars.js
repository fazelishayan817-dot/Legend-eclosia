'use strict';
/* ============================================================
   ÉCLOSIA — tous les personnages au style du héros
   Chibi élancé (tête ≈ 1/3), veste ouverte bicolore, contour
   sombre épais, ombrage en aplats, chaussures à semelle blanche.
   Dessiné dans une grille de 60 × 72 comme les sprites du héros.
   ============================================================ */
function personSpriteV2(pal, dir, frame) {
  const key = 'v2' + PS + JSON.stringify(pal) + dir + frame;
  if (PERSON_CACHE[key]) return PERSON_CACHE[key];
  const S = 16 * PS, c = mkCanvas(S, S), g = c.getContext('2d');
  const U = 4, W = 60 * U, H = 72 * U;                 // dessin interne en haute résolution
  const body = mkCanvas(W, H), b = body.getContext('2d');
  const flip = dir === 'left', d = flip ? 'right' : dir;
  if (flip) { b.translate(W, 0); b.scale(-1, 1); }
  b.scale(U, U);
  const sk = pal.s, hair = pal.h, cl = pal.c, pa = pal.p;
  const skD = dhex(sk, 0.18), clD = dhex(cl, 0.28), clDD = dhex(cl, 0.45), clL = lhex(cl, 0.22), paD = dhex(pa, 0.3), paL = lhex(pa, 0.18);
  const hairD = dhex(hair, 0.3), hairL = lhex(hair, 0.35);
  const band = pal.band2 || (hashStr(cl + pa) % 2 ? dhex(pa, 0.05) : lhex(cl, 0.45));   // bande de poitrine bicolore
  const shirt = pal.shirt || (cl === '#ffffff' || cl === '#f4f4f0' || cl === '#f4f4f4' ? '#c8d2dc' : '#f4f4f0');
  const E = (x, y, rx, ry, col) => { b.fillStyle = col; b.beginPath(); b.ellipse(x, y, Math.max(0.01, rx), Math.max(0.01, ry), 0, 0, 7); b.fill(); };
  const RR = (x, y, w, h, r, col) => { b.fillStyle = col; b.beginPath(); b.roundRect(x, y, w, h, r); b.fill(); };
  const P = (pts, col) => { b.fillStyle = col; b.beginPath(); b.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) b.lineTo(pts[i], pts[i + 1]); b.closePath(); b.fill(); };
  const L = (x1, y1, x2, y2, col, w) => { b.strokeStyle = col; b.lineWidth = w || 0.8; b.lineCap = 'round'; b.beginPath(); b.moveTo(x1, y1); b.lineTo(x2, y2); b.stroke(); };
  const Q = (x1, y1, cx, cy, x2, y2, col, w) => { b.strokeStyle = col; b.lineWidth = w || 0.8; b.lineCap = 'round'; b.beginPath(); b.moveTo(x1, y1); b.quadraticCurveTo(cx, cy, x2, y2); b.stroke(); };
  let sty = pal.style || (pal.long ? 'long' : 'short');
  if (sty === 'short' && /^#(c8c8c8|e0e0f0|e8e8f0|e8e8f8|f6e7a1)$/i.test(pal.h) && (pal.beard || pal.glasses)) sty = 'swept';
  const HR = rng(hashStr(JSON.stringify(pal) + 'hair'));
  const SPK = Array.from({ length: 8 }, () => 0.75 + HR() * 0.5);
  const fem = ['long', 'pony', 'braid', 'bun', 'bob'].includes(sty);
  const step = frame === 1 ? 1 : frame === 2 ? -1 : 0;
  const bobY = frame ? -0.8 : 0;                         // léger rebond pendant la marche
  b.translate(0, bobY); b.translate(30, 69); b.scale(0.84, 0.84); b.translate(-30, -69);
  const iris = pal.e || (hair === '#2a5fd0' || hair === '#e8f0ff' ? '#3a8ae0' : '#6a4028');
  const shoe = pal.boots || dhex(cl, 0.15), shoeD = dhex(shoe, 0.3);

  /* ---------- cheveux longs derrière ---------- */
  if (d !== 'up') {
    if (sty === 'long') RR(d === 'right' ? 18 : 17, 14, d === 'right' ? 17 : 26, 28, 9, hairD);
    if (sty === 'bob') RR(d === 'right' ? 18 : 18, 12, d === 'right' ? 18 : 24, 17, 7, hairD);
    if (sty === 'locs') for (const lx of (d === 'right' ? [20, 23, 26] : [19, 22, 38, 41])) RR(lx - 1.5, 14, 3, 22, 1.5, hairD);
  }
  /* ---------- jambes ---------- */
  const legs = () => {
    if (d === 'right') {
      const a = step * 4;
      RR(28 - a, 46, 7, 17, 3, paD); RR(26 + a, 46, 7, 17, 3, pa);
      if (pal.shorts) { RR(28.5 - a, 52, 6, 9, 2.5, skD); RR(26.5 + a, 52, 6, 9, 2.5, sk); }
      RR(27 - a, 61, 11, 6.5, 3, shoeD); RR(25 + a, 61, 11, 6.5, 3, shoe);
      RR(25 + a, 66, 11, 1.8, 0.9, '#f4f4f0'); RR(27 - a, 66, 11, 1.8, 0.9, '#d8d8d4');
    } else {
      const l1 = frame === 1 ? -2 : 0, l2 = frame === 2 ? -2 : 0;
      RR(22.5, 46, 7.5, 17 + l1, 3, pa); RR(30, 46, 7.5, 17 + l2, 3, d === 'up' ? pa : paD);
      L(30, 48, 30, 60, paD, 0.6);
      if (pal.shorts) { RR(23, 52, 6.5, 9 + l1, 2.5, sk); RR(30.5, 52, 6.5, 9 + l2, 2.5, skD); }
      RR(21.5, 61 + l1, 9, 6.5, 3, shoe); RR(29.5, 61 + l2, 9, 6.5, 3, shoeD);
      RR(21.5, 66 + l1, 9, 1.8, 0.9, '#f4f4f0'); RR(29.5, 66 + l2, 9, 1.8, 0.9, '#e4e4e0');
      if (d === 'down') { L(24, 63 + l1, 28, 63 + l1, '#f4f4f0', 0.7); L(32, 63 + l2, 36, 63 + l2, '#f4f4f0', 0.7); }
    }
  };
  legs();
  /* ---------- sac à dos ---------- */
  if (pal.pack && d === 'up') RR(21, 31, 18, 15, 5, pal.pack);
  if (pal.pack && d === 'right') RR(17, 31, 7, 14, 3, pal.pack);
  /* ---------- torse : veste ouverte ---------- */
  b.save(); b.beginPath();
  if (d === 'right') b.roundRect(22.5, 29.5, 16.5, 19.5, [6, 6, 2.5, 2.5]); else b.roundRect(17.5, 29.5, 25, 19.5, [8, 8, 3, 3]);
  b.clip();
  if (d === 'right') {
    b.fillStyle = cl; b.fillRect(22, 29, 18, 21);
    b.fillStyle = clD; b.fillRect(33, 29, 7, 21);
    RR(23, 38, 15.5, 3.4, 1, band);
    RR(23, 46, 15.5, 2.6, 1, clDD);
    RR(25, 29, 10, 3.5, 1.5, clD);                      // col montant
    L(35, 31, 35.5, 46, clDD, 0.6);
  } else if (d === 'up') {
    b.fillStyle = cl; b.fillRect(17, 29, 26, 21);
    b.fillStyle = clD; b.fillRect(30, 29, 13, 21);
    RR(18, 38, 24, 3.4, 1, band);
    RR(18, 46, 24, 2.6, 1, clDD);
    RR(23, 28.5, 14, 4, 2, clD);
    L(30, 33, 30, 46, clDD, 0.6);
  } else {
    b.fillStyle = cl; b.fillRect(17, 29, 26, 21);
    b.fillStyle = clD; b.fillRect(34, 29, 9, 21);           // côté ombré
    P([26.5, 31, 33.5, 31, 33, 47, 27, 47], shirt);      // t-shirt sous la veste ouverte
    P([30.5, 31, 33.5, 31, 33, 47, 31, 47], dhex(shirt, 0.12));
    RR(18, 38, 8.5, 3.4, 1, band); RR(33.5, 38, 8.5, 3.4, 1, dhex(band, 0.15));
    RR(18, 46, 24, 2.6, 1, clDD);
    L(26.6, 32, 27, 46.5, clDD, 0.7); L(33.4, 32, 33, 46.5, clDD, 0.7);   // fermeture éclair
    RR(36, 34, 2.5, 6, 1, clDD);                          // poche poitrine
    if (pal.stripe) { RR(18, 41.6, 8.5, 1.4, 0.6, pal.stripe); RR(33.5, 41.6, 8.5, 1.4, 0.6, pal.stripe); }
  }
  b.restore();
  if (d === 'down') { P([20, 28.5, 27, 31, 27.5, 37, 23, 33], clL); P([40, 28.5, 33, 31, 32.5, 37, 37, 33], clD); }
  if (pal.pack && d === 'down') { L(21.5, 31, 23, 46, dhex(pal.pack, 0.1), 1.6); L(38.5, 31, 37, 46, dhex(pal.pack, 0.1), 1.6); }
  if (pal.bag !== 0 && !pal.pack && d === 'down' && hashStr(JSON.stringify(pal)) % 3 === 0) {
    L(21, 31, 38, 45, '#2a2a34', 1.4);                   // bandoulière en diagonale
  }
  /* ---------- bras ---------- */
  const arm = (x, y, sw, col, colD, hand) => {
    RR(x - 3, y, 6, 14, 3, col); RR(x - 3, y + 11, 6, 3, 1.4, colD);
    E(x, y + 15.5, 2.8, 2.8, pal.gloves || hand);
  };
  if (d === 'right') { const a = step * 3; arm(30 + a, 31, 0, clD, clDD, sk); }
  else {
    const a1 = frame === 1 ? 2 : 0, a2 = frame === 2 ? 2 : 0;
    arm(16, 31.5 + a1, 0, cl, clD, sk); arm(44, 31.5 + a2, 0, clD, clDD, skD);
  }
  /* ---------- cou et tête (agrandie, style chibi) ---------- */
  RR(27, 26, 6, 5, 2, skD);
  b.save(); b.translate(30, 29); b.scale(1.3, 1.3); b.translate(-30, -29);
  if (d === 'right') { E(31.5, 18.5, 10.5, 11, sk); E(40.5, 21.5, 2, 2.6, sk); E(26.5, 20, 2, 3, skD); }
  else { E(30, 18.8, 11, 11.2, sk); if (d === 'down') { E(19.2, 20, 2, 3, sk); E(40.8, 20, 2, 3, skD); E(30, 28, 6, 2, skD); } }
  if (d !== 'up') { b.globalAlpha = 0.18; E(d === 'right' ? 34 : 35, 22, 6, 7, '#7a3a2a'); b.globalAlpha = 1; }   // ombre de joue
  if (pal.beard && d !== 'up') { b.fillStyle = hair; b.beginPath(); if (d === 'down') b.ellipse(30, 26, 8.5, 5, 0, 0, Math.PI); else b.ellipse(35, 25.5, 6, 4.4, 0, 0, Math.PI); b.fill(); }
  /* ---------- visage ---------- */
  if (d === 'down') {
    for (const ex of [25.2, 34.8]) {
      E(ex, 21, 2.5, 3.1, '#1b1626'); E(ex, 21.5, 1.8, 2.3, iris); E(ex, 21.9, 0.9, 1.2, '#0a0a14');
      E(ex - 0.8, 20, 0.75, 0.75, '#ffffff'); E(ex + 0.8, 22.6, 0.35, 0.35, '#ffffff');
    }
    Q(22.2, 17.4, 25.2, 16.1, 28, 17.4, hairD, 1.1); Q(32, 17.4, 34.8, 16.1, 37.8, 17.4, hairD, 1.1);
    if (fem) { L(22.6, 19, 21.7, 18, '#1b1626', 0.7); L(37.4, 19, 38.3, 18, '#1b1626', 0.7); }
    Q(30.3, 22.6, 31, 24, 30, 24.4, skD, 0.6);
    Q(28.2, 26.2, 30, 27.4, 31.8, 26.2, fem ? '#c85a64' : dhex(sk, 0.42), 0.8);
    E(22.8, 24.4, 1.8, 0.9, 'rgba(255,110,110,.25)'); E(37.2, 24.4, 1.8, 0.9, 'rgba(255,110,110,.25)');
    if (pal.glasses) { b.strokeStyle = '#2a2a3a'; b.lineWidth = 0.9; b.beginPath(); b.roundRect(21.6, 18.4, 7.2, 5.8, 1.6); b.roundRect(31.2, 18.4, 7.2, 5.8, 1.6); b.moveTo(28.8, 20.6); b.lineTo(31.2, 20.6); b.stroke(); }
  } else if (d === 'right') {
    E(37, 20.8, 2, 2.9, '#1b1626'); E(37.3, 21.3, 1.4, 2.1, iris); E(37.5, 21.6, 0.7, 1, '#0a0a14'); E(36.6, 19.9, 0.6, 0.6, '#ffffff');
    Q(34.6, 17.2, 37, 16, 39.4, 17.4, hairD, 1.1);
    if (fem) L(39, 18.6, 40.2, 17.8, '#1b1626', 0.7);
    Q(38.6, 26, 40, 26.6, 40.8, 25.8, fem ? '#c85a64' : dhex(sk, 0.42), 0.8);
    E(36.5, 24.3, 1.6, 0.8, 'rgba(255,110,110,.25)');
    if (pal.glasses) { b.strokeStyle = '#2a2a3a'; b.lineWidth = 0.9; b.beginPath(); b.roundRect(33.6, 18.2, 7, 5.8, 1.6); b.moveTo(33.6, 20.4); b.lineTo(27, 19.6); b.stroke(); }
  }
  /* ---------- chevelure ---------- */
  const spikes = (cx, top, n, spread, len, col, lean) => {
    b.fillStyle = col; b.beginPath();
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0 : i / (n - 1) - 0.5, x = cx + t * spread, a = t * 1.4 + (lean || 0);
      const ln = len * (1 - Math.abs(t) * 0.45) * SPK[i % 8];
      b.moveTo(x - 4, top + 4); b.lineTo(x + Math.sin(a) * ln, top + 3 - Math.cos(a) * ln); b.lineTo(x + 4, top + 4);
    }
    b.fill();
  };
  if (sty !== 'bald' && sty !== 'scarf') {
    if (d === 'up') {
      E(30, 17.5, 12, 12.2, hair);
      if ((sty === 'short' || sty === 'spiky' || sty === 'wild') && !pal.hat) { spikes(30, 6, 5, 20, 7, hair); for (const xx of [21, 26, 31, 36]) Q(xx, 9, xx + 1, 18, xx - 0.5, 27, hairD, 0.9); }
      else for (const xx of [22, 27, 33, 38]) Q(xx, 9, xx + 1, 18, xx - 0.5, 27, hairD, 0.9);
      if (sty === 'long') RR(18.5, 18, 23, 24, 8, hair);
      if (sty === 'bob') RR(18.5, 16, 23, 14, 6, hair);
      if (sty === 'pony') RR(27.5, 20, 5, 16, 2.5, hair);
      if (sty === 'braid') for (let i = 0; i < 6; i++) E(30, 26 + i * 3.2, 2.4, 2, i % 2 ? hairD : hair);
      if (sty === 'locs') for (const lx of [20, 24, 28, 32, 36, 40]) RR(lx - 1.5, 18, 3, 22, 1.5, hair);
    } else if (d === 'right') {
      b.fillStyle = hair; b.beginPath(); b.ellipse(30.5, 14, 11.6, 9, 0, Math.PI * 0.88, Math.PI * 2.08); b.fill();
      RR(19.5, 10, 10, 18, 5, hair);
      if ((sty === 'short' || sty === 'spiky' || sty === 'wild') && !pal.hat) { spikes(28, 4.5, 5, 18, sty === 'wild' ? 10 : 8, hair, -0.5); P([36, 8, 44, 13, 39, 17, 41, 21, 35, 16], hair); }
      else P([34, 8, 42, 13, 40, 19, 35, 14], hair);
      Q(26, 7, 33, 9, 38, 8, hairD, 0.9); Q(22, 14, 23.5, 20, 22.5, 25, hairD, 0.9);
      if (sty === 'long') RR(19, 14, 9, 26, 4.5, hair);
      if (sty === 'pony') RR(15, 12, 7, 18, 3.5, hair);
      if (sty === 'bun') E(23, 6, 5, 4.4, hair);
      if (sty === 'braid') for (let i = 0; i < 6; i++) E(21.5, 26 + i * 3.2, 2.4, 2, i % 2 ? hairD : hair);
      if (sty === 'curly') for (const [hx, hy] of [[22, 8], [27, 4.5], [33, 4], [38, 7], [20, 14], [21, 21]]) E(hx, hy, 4.4, 4, hair);
    } else {
      b.fillStyle = hair; b.beginPath(); b.ellipse(30, 14.5, 12.2, 9.5, 0, Math.PI, Math.PI * 2); b.fill();
      RR(17.8, 10, 4.8, 15, 2.4, hair); RR(37.4, 10, 4.8, 15, 2.4, hair);
      if (sty === 'short' || sty === 'spiky' || sty === 'wild') {
        if (!pal.hat) spikes(30, 4, 6, 22, sty === 'wild' ? 10 : 8, hair);
        // mèches de frange en pointes
        P([18.5, 11, 24, 12, 21.5, 19], hair); P([23, 11, 29, 12, 25.5, 18.5], hair); P([28, 11, 33.5, 12, 31, 17.5], hair); P([32.5, 11, 38, 12, 35.5, 18], hair); P([36, 11, 41.5, 11, 40, 19.5], hair);
      } else if (sty === 'curly') {
        for (const [hx, hy] of [[19, 13], [22, 7.5], [27, 5], [33, 5], [38, 7.5], [41, 13], [18, 19], [42, 19]]) E(hx, hy, 4.4, 4, hair);
      } else {
        b.beginPath(); b.moveTo(18, 12); b.quadraticCurveTo(24, 19, 30, 13.5); b.quadraticCurveTo(36, 19, 42, 12); b.lineTo(42, 7); b.lineTo(18, 7); b.fill();
      }
      if (sty === 'long') { RR(16.5, 12, 6, 28, 3, hair); RR(37.5, 12, 6, 28, 3, hair); }
      if (sty === 'bob') { RR(16.5, 11, 7, 17, 3.4, hair); RR(36.5, 11, 7, 17, 3.4, hair); }
      if (sty === 'pony') { RR(40, 10, 5, 16, 2.5, hair); }
      if (sty === 'bun') E(30, 4.4, 5.4, 4.4, hair);
      if (sty === 'braid') for (let i = 0; i < 6; i++) { E(17.8, 25 + i * 3.2, 2.4, 2, i % 2 ? hairD : hair); E(42.2, 25 + i * 3.2, 2.4, 2, i % 2 ? hairD : hair); }
      if (sty === 'locs') for (const lx of [17.5, 21, 39, 42.5]) RR(lx - 1.5, 12, 3, 24, 1.5, hair);
      if (sty === 'swept') { b.fillStyle = hair; b.beginPath(); b.ellipse(28, 8, 11, 4.4, -0.25, 0, 7); b.fill(); }
      Q(23, 8, 25, 12, 23.5, 15, hairD, 0.9); Q(30, 6, 31.5, 10, 29.5, 13, hairD, 0.9); Q(36.5, 8, 35.5, 12, 37, 15, hairD, 0.9);
    }
    // reflet de lumière sur les cheveux
    b.globalAlpha = 0.6; b.fillStyle = hairL; b.beginPath(); b.ellipse(d === 'right' ? 28 : 25, 9.5, 5, 1.6, -0.35, 0, 7); b.fill(); b.globalAlpha = 1;
    if (pal.spiky && sty === 'pony') spikes(d === 'right' ? 26 : 30, 4, 4, 14, 8, hair, d === 'right' ? -0.5 : 0);
  }
  if (sty === 'scarf') {
    const sc = pal.hat || '#4a8fe0';
    if (d === 'up') E(30, 16.5, 12.8, 13, sc);
    else if (d === 'right') { b.fillStyle = sc; b.beginPath(); b.ellipse(30.5, 16, 12, 11.5, 0, Math.PI * 0.82, Math.PI * 2.12); b.fill(); RR(18, 13, 11, 18, 5, sc); }
    else { b.fillStyle = sc; b.beginPath(); b.ellipse(30, 16, 12.6, 11, 0, Math.PI, Math.PI * 2); b.fill(); RR(16.5, 12, 5.5, 17, 2.7, sc); RR(38, 12, 5.5, 17, 2.7, sc); RR(19, 26.5, 22, 4, 2, sc); }
    b.globalAlpha = 0.3; E(25, 8, 5, 1.6, '#ffffff'); b.globalAlpha = 1;
  }
  if (pal.band && sty !== 'bald') { b.fillStyle = pal.band; if (d === 'right') b.fillRect(20, 9, 20, 2.2); else if (d === 'up') b.fillRect(18.5, 11.5, 23, 2.2); else { b.fillRect(18, 9.5, 24, 2.2); } }
  /* ---------- chapeau / casquette ---------- */
  if (pal.hat && sty !== 'scarf') {
    const hc = pal.hat, hD = dhex(hc, 0.25);
    if (d === 'up') { E(30, 10.5, 12.6, 7.6, hc); RR(19, 13, 22, 3, 1.5, hD); }
    else if (d === 'right') { E(30, 9.5, 11.8, 6.8, hc); RR(32, 12, 14, 3, 1.5, hD); RR(19, 12, 18, 2.4, 1.2, hD); }
    else { E(30, 9.5, 12.4, 6.8, hc); RR(17, 12.4, 26, 3.2, 1.6, hD); RR(27, 6, 6, 3.4, 1.5, lhex(hc, 0.35)); }
    b.globalAlpha = 0.7; E(25, 6.5, 4, 1.3, lhex(hc, 0.4)); b.globalAlpha = 1;
  }
  b.restore();
  b.setTransform(1, 0, 0, 1, 0, 0);
  /* ---------- ombrage global (lumière venant de la gauche) ---------- */
  const sh = b.createLinearGradient(0, 0, W, 0);
  sh.addColorStop(0, 'rgba(255,255,255,0.10)'); sh.addColorStop(0.55, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(10,0,30,0.22)');
  b.globalCompositeOperation = 'source-atop'; b.fillStyle = sh; b.fillRect(0, 0, W, H); b.globalCompositeOperation = 'source-over';
  /* ---------- passage en pixel art 60 × 72 + contour net d'1 pixel ---------- */
  const PW = 60, PH = 72, px = mkCanvas(PW, PH), pg = px.getContext('2d');
  pg.imageSmoothingEnabled = true; pg.imageSmoothingQuality = 'high'; pg.drawImage(body, 0, 0, PW, PH);
  const id = pg.getImageData(0, 0, PW, PH), D = id.data;
  for (let i = 3; i < D.length; i += 4) D[i] = D[i] > 110 ? 255 : 0;
  const A = new Uint8Array(PW * PH); for (let i = 0; i < PW * PH; i++) A[i] = D[i * 4 + 3] ? 1 : 0;
  for (let y = 0; y < PH; y++) for (let x = 0; x < PW; x++) {
    const i = y * PW + x; if (A[i]) continue;
    if ((x > 0 && A[i - 1]) || (x < PW - 1 && A[i + 1]) || (y > 0 && A[i - PW]) || (y < PH - 1 && A[i + PW])) { D[i * 4] = 26; D[i * 4 + 1] = 20; D[i * 4 + 2] = 34; D[i * 4 + 3] = 255; }
  }
  pg.putImageData(id, 0, 0);
  const h = S * 1.0, w = h * PW / PH;
  g.fillStyle = 'rgba(0,0,0,.2)'; g.beginPath(); g.ellipse(S / 2, S * 0.95, S * 0.2, S * 0.055, 0, 0, 7); g.fill();
  g.imageSmoothingEnabled = false;
  g.drawImage(px, (S - w) / 2, S * 0.99 - h, w, h);
  return (PERSON_CACHE[key] = c);
}
for (const k in URL_CACHE) if (k.startsWith('p:')) delete URL_CACHE[k];
