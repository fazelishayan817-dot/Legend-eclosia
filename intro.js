'use strict';
/* ============================================================
   ÉCLOSIA — ouverture : l'aventure, la terre contre l'océan, le ciel
   ============================================================ */
const CINE = { t0: 0, done: null, len: 25000 };
const BIG = {};
function bigMon(id, sz) {
  const k = id + ':' + sz; if (BIG[k]) return BIG[k];
  const c = mkCanvas(sz, sz), g = c.getContext('2d'); g.scale(sz / 48, sz / 48);
  drawCrea(g, ELOOK[id] || autoLook(id), SP[id].types.includes('ombre'));
  return (BIG[k] = c);
}
// version miroir (pour que les rivaux se fassent face)
function bigFlip(id, sz) {
  const k = id + ':' + sz + ':f'; if (BIG[k]) return BIG[k];
  const src = bigMon(id, sz), c = mkCanvas(src.width, src.height), g = c.getContext('2d');
  g.translate(src.width, 0); g.scale(-1, 1); g.drawImage(src, 0, 0);
  if (SP[id] && SP[id].gal && typeof galImage === 'function' && !galImage(id)) return c;
  return (BIG[k] = c);
}
function runIntroCine() {
  return new Promise(res => {
    RT.mode = 'cine'; CINE.t0 = performance.now() + 100; CINE.len = (INTRO_MARKS[2] + 6.5) * 1000;
    const h = { press(b) { if (b === 'a' || b === 'b') end(true); } };
    let fin = false;
    function end(skip) {
      if (fin) return; fin = true; uiPop(h); clearInterval(iv); RT.mode = 'title';
      if (skip && performance.now() - CINE.t0 < INTRO_MARKS[2] * 1000 && SND.ctx) { stopMusic(); playMusic('titre'); }
      res();
    }
    const iv = setInterval(() => { if (performance.now() - CINE.t0 > CINE.len) end(false); }, 100);
    uiPush(h);
  });
}
const ease = t => t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t);
const seg = (t, a, b) => ease((t - a) / (b - a));
function drawCine(x) {
  const ms = performance.now() - CINE.t0, T = Math.max(0, ms / 1000), f = RT.frame;
  const [m1, m2, m3] = INTRO_MARKS;
  if (T < m1) return drawAdventure(x, T, f);
  if (T < m2) return drawClash(x, T - m1, f, m2 - m1);
  if (T < m3) return drawCelestial(x, T - m2, f);
  const t = T < m2 ? (T - m1) * 19.0 / (m2 - m1) : 21.5 + (T - m3);
  x.save();
  let shake = 0;
  if ((t > 9.3 && t < 9.9) || (t > 18.4 && t < 19.4)) shake = 3;
  if (shake) x.translate((Math.random() - .5) * shake * 2, (Math.random() - .5) * shake * 2);
  const W = 240, H = 160;
  const sky = (a, b) => { const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, a); g.addColorStop(1, b); x.fillStyle = g; x.fillRect(-10, -10, W + 20, H + 20); };
  const sea = (y, c1, c2, amp) => {
    for (let k = 0; k < 4; k++) {
      x.fillStyle = k % 2 ? c1 : c2; x.beginPath(); x.moveTo(-10, H + 10);
      for (let xx = -10; xx <= W + 10; xx += 6) x.lineTo(xx, y + k * 9 + Math.sin(xx / 18 + t * (2 + k) + k) * amp);
      x.lineTo(W + 10, H + 10); x.fill();
    }
  };
  const rain = n => { x.strokeStyle = 'rgba(200,220,255,.35)'; x.lineWidth = 1; x.beginPath(); for (let i = 0; i < n; i++) { const rx = (i * 53 + f * 7) % 260 - 10, ry = (i * 97 + f * 11) % 180 - 10; x.moveTo(rx, ry); x.lineTo(rx - 3, ry + 9); } x.stroke(); };
  const glow = (gx, gy, r, c) => { const g = x.createRadialGradient(gx, gy, 1, gx, gy, r); g.addColorStop(0, c); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(gx - r, gy - r, r * 2, r * 2); };
  const speed = (cx, cy, col, n) => { x.fillStyle = col; for (let i = 0; i < n; i++) { const a = i / n * 6.283 + (f >> 2) * 0.01, w = .015; x.beginPath(); x.moveTo(cx + Math.cos(a) * 40, cy + Math.sin(a) * 40); x.lineTo(cx + Math.cos(a - w) * 300, cy + Math.sin(a - w) * 300); x.lineTo(cx + Math.cos(a + w) * 300, cy + Math.sin(a + w) * 300); x.fill(); } };
  if (t < 6.5) {
    // tempête et Germination
    sky('#05070f', '#1a2448');
    const fl = (t > 1.4 && t < 1.55) || (t > 2.6 && t < 2.7) || (t > 4.2 && t < 4.3);
    if (fl) { x.fillStyle = 'rgba(230,240,255,.8)'; x.fillRect(0, 0, W, H); x.strokeStyle = '#ffffff'; x.lineWidth = 2; x.beginPath(); x.moveTo(170, 0); x.lineTo(160, 30); x.lineTo(172, 34); x.lineTo(150, 80); x.stroke(); }
    const rise = seg(t, 3, 6.5);
    if (rise > 0) { glow(120, 120 - rise * 30, 30 + rise * 70, `rgba(255,220,120,${0.25 + rise * 0.6})`); for (let i = 0; i < 7; i++) { x.fillStyle = `rgba(255,230,150,${0.12 * rise})`; const a = -Math.PI / 2 + (i - 3) * 0.22; x.beginPath(); x.moveTo(120, 125); x.lineTo(120 + Math.cos(a - .05) * 200, 125 + Math.sin(a - .05) * 200); x.lineTo(120 + Math.cos(a + .05) * 200, 125 + Math.sin(a + .05) * 200); x.fill(); } }
    if (rise > 0) { const s = rise; x.save(); x.translate(120, 128); x.scale(s, s); x.fillStyle = '#3a2614'; x.fillRect(-6, -40, 12, 44); x.fillStyle = '#1f5a2e'; for (const [cx, cy, r] of [[0, -52, 26], [-22, -40, 16], [22, -40, 16]]) { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); } x.fillStyle = '#4c9e4a'; x.beginPath(); x.arc(-8, -60, 9, 0, 7); x.fill(); glow(0, -48, 16, 'rgba(255,230,140,.9)'); x.restore(); }
    sea(112, '#0e2350', '#173a6a', 4 - rise * 2);
    rain(70);
  } else if (t < 13.5) {
    // apparition des gardiens
    sky('#120a2a', '#3a2a5a'); speed(120, 70, 'rgba(255,255,255,.05)', 30);
    for (let i = 0; i < 40; i++) { x.fillStyle = 'rgba(255,255,255,.7)'; x.fillRect((i * 61) % W, (i * 37) % 90, 1, 1); }
    x.fillStyle = 'rgba(40,30,70,.85)'; for (let i = 0; i < 6; i++) { x.beginPath(); x.ellipse((i * 47 + t * 12) % 300 - 30, 28 + (i % 3) * 10, 40, 10, 0, 0, 7); x.fill(); }
    const zd = seg(t, 6.5, 9.4); const zy = -130 + zd * 120;
    glow(65, zy + 60, 100, 'rgba(190,120,255,.55)'); x.drawImage(bigFlip('auberis', 170), -20, zy - 20, 170, 170);
    const gd = seg(t, 10, 13); const gy = 170 - gd * 140;
    if (t > 10) { x.fillStyle = '#163f22'; x.beginPath(); x.arc(170, 175, 60, 0, 7); x.fill(); glow(170, gy + 50, 70, 'rgba(160,255,140,.5)'); x.drawImage(bigMon('nocturnis', 120), 110, gy); }
    sea(132, '#0e2350', '#173a6a', 2);
  } else if (t < 16.5) {
    // face-à-face
    const p = seg(t, 13.5, 14.1);
    x.save(); x.beginPath(); x.moveTo(0, 0); x.lineTo(150, 0); x.lineTo(90, H); x.lineTo(0, H); x.clip();
    sky('#3a1a6a', '#ff9a4a'); speed(60, 80, 'rgba(255,220,120,.35)', 36); x.drawImage(bigFlip('auberis', 230), -200 + p * 160, -45, 230, 230); x.restore();
    x.save(); x.beginPath(); x.moveTo(150, 0); x.lineTo(W, 0); x.lineTo(W, H); x.lineTo(90, H); x.clip();
    sky('#0a3a1a', '#9af08a'); speed(180, 80, 'rgba(200,255,180,.35)', 36); x.drawImage(bigMon('nocturnis', 170), 240 - p * 160, -10); x.restore();
    x.strokeStyle = '#ffffff'; x.lineWidth = 3; x.beginPath(); x.moveTo(150, 0); x.lineTo(90, H); x.stroke();
    if (t > 14.3) { x.font = 'bold 26px "Pixelify Sans", monospace'; x.textAlign = 'center'; x.fillStyle = '#1a1424'; x.fillText('VS', 122, 88); x.fillStyle = '#ffd060'; x.fillText('VS', 120, 86); }
  } else if (t < 21.5) {
    // le choc, puis l'Éveil
    sky('#0a0814', '#2a1a3a');
    const c = seg(t, 16.5, 18.5);
    const zx = -60 + c * 95, gx = 200 - c * 95;
    if (t < 19.5) {
      x.strokeStyle = 'rgba(255,210,90,.9)'; x.lineWidth = 6 + Math.sin(f / 2) * 2; x.beginPath(); x.moveTo(zx + 50, 70); x.lineTo(120, 75); x.stroke();
      x.strokeStyle = 'rgba(140,255,130,.9)'; x.beginPath(); x.moveTo(gx + 40, 80); x.lineTo(120, 75); x.stroke();
      glow(120, 75, 30 + c * 40, 'rgba(255,255,230,.9)');
      x.drawImage(bigFlip('auberis', 140), zx - 30, -5, 140, 140); x.drawImage(bigMon('nocturnis', 100), gx, 30);
    }
    if (t > 18.5 && t < 19.4) { x.fillStyle = `rgba(255,255,255,${1 - (t - 18.5) / 0.9})`; x.fillRect(0, 0, W, H); }
    if (t > 19.2) {
      const e = seg(t, 19.2, 20.6);
      for (let i = 0; i < 4; i++) { x.strokeStyle = `rgba(255,255,255,${0.5 - i * 0.1})`; x.lineWidth = 2; x.beginPath(); x.arc(120, 75, 20 + e * 60 + i * 14 + (f % 30), 0, 7); x.stroke(); }
      glow(120, 75, 90, `rgba(255,250,220,${0.6 * e})`);
      x.globalAlpha = e; x.drawImage(bigMon('eveillon', 96), 72, 22); x.globalAlpha = 1;
      x.globalAlpha = 1 - e; x.drawImage(bigFlip('auberis', 140), 10 - e * 90, 0, 140, 140); x.drawImage(bigMon('nocturnis', 100), 120 + e * 80, 30); x.globalAlpha = 1;
    }
  } else {
    // titre
    sky('#0b1030', '#e0806a');
    for (let i = 0; i < 50; i++) { x.fillStyle = 'rgba(255,255,255,.7)'; x.fillRect((i * 61) % W, (i * 37) % 80, 1, 1); }
    glow(120, 140, 120, 'rgba(255,220,140,.5)');
    glow(120, 50, 110, 'rgba(190,120,255,.35)'); x.globalAlpha = 0.92; x.drawImage(bigMon('auberis', 210), 15, -40 + Math.sin(t * 1.5) * 4, 210, 210); x.globalAlpha = 1;
    // même titre que l'écran d'accueil (Levi Brush, émeraude → violet), avec un léger zoom d'arrivée
    const s = 1 + (1 - seg(t, 21.5, 22.2)) * 1.6;
    x.save(); x.translate(120, 48); x.scale(s, s); x.translate(-120, -48);
    drawLegendTitle(x);
    x.restore();
  }
  x.restore();
  if (t < 0.8) { x.fillStyle = `rgba(0,0,0,${1 - t / 0.8})`; x.fillRect(0, 0, 240, 160); }
  x.font = '7px sans-serif'; x.textAlign = 'right'; x.fillStyle = 'rgba(255,255,255,.45)'; x.fillText('A : passer', 236, 156); x.textAlign = 'left';
}

/* Titre « Légendes Éclosia » dessiné sur la toile, calé sur celui de l'écran d'accueil.
   La police n'a pas d'accents : ceux de LÉGENDES et d'Éclosia sont tracés à la main. */
if (document.fonts && document.fonts.load) document.fonts.load('44px "Levi Brush Titre"').catch(() => { });
function legendAccent(x, cx, cy, w, h, col) {
  x.save(); x.translate(cx, cy); x.rotate(-32 * Math.PI / 180); x.fillStyle = col;
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2); x.fill(); x.restore();
}
function drawLegendTitle(x) {
  const F = '"Levi Brush Titre", "Pixelify Sans", monospace';
  x.save(); x.textAlign = 'left'; x.textBaseline = 'alphabetic';
  // LÉGENDES : blanc, lettres espacées
  x.font = '12px ' + F;
  const word = 'LEGENDES', sp = 3, ws = [...word].map(c => x.measureText(c).width);
  let lx = 120 - (ws.reduce((a, b) => a + b, 0) + sp * word.length) / 2 + sp;
  x.shadowColor = 'rgba(255,255,255,.35)'; x.shadowBlur = 6;
  [...word].forEach((c, i) => {
    x.fillStyle = '#1a1030'; x.fillText(c, lx, 27); x.fillStyle = '#ffffff'; x.fillText(c, lx, 26);
    if (i === 1) legendAccent(x, lx + ws[i] * 0.22 + 1.8, 13.3, 3.6, 1.32, '#ffffff');
    lx += ws[i] + sp;
  });
  // Éclosia : dégradé émeraude → violet
  x.font = '44px ' + F;
  const w = x.measureText('Eclosia').width, x0 = 120 - w / 2;
  const gr = x.createLinearGradient(x0, 0, x0 + w, 0);
  gr.addColorStop(0, '#1fd88f'); gr.addColorStop(0.22, '#2bc48a'); gr.addColorStop(0.46, '#a855f7'); gr.addColorStop(0.58, '#8a5cf4'); gr.addColorStop(0.74, '#3d74f2'); gr.addColorStop(1, '#2a62e8');
  x.shadowColor = 'rgba(140,90,255,.45)'; x.shadowBlur = 6;
  x.fillStyle = '#140a2a'; x.fillText('Eclosia', x0, 68.5);
  x.shadowBlur = 0; x.fillStyle = gr; x.fillText('Eclosia', x0, 67);
  legendAccent(x, x0 + 8.8 + 6.6, 27.1, 13.2, 3.74, '#1fd88f');
  x.restore();
}

function cineGlow(x, gx, gy, r, c) { const g = x.createRadialGradient(gx, gy, 1, gx, gy, r); g.addColorStop(0, c); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(gx - r, gy - r, r * 2, r * 2); }
function cineSky(x, a, b) { const g = x.createLinearGradient(0, 0, 0, 160); g.addColorStop(0, a); g.addColorStop(1, b); x.fillStyle = g; x.fillRect(-10, -10, 260, 180); }
function hillLayer(x, y, amp, per, off, col) { x.fillStyle = col; x.beginPath(); x.moveTo(-10, 170); for (let xx = -10; xx <= 250; xx += 4) x.lineTo(xx, y + Math.sin((xx + off) / per) * amp + Math.sin((xx + off) / (per * 0.37)) * amp * 0.35); x.lineTo(250, 170); x.fill(); }
// Partie 1 : départ à l'aventure sous le soleil
function drawAdventure(x, t, f) {
  const sp = t * 60;
  const dusk = Math.max(0.6, ease((t - 10.6) / 2));
  cineSky(x, dusk > 0 ? `rgb(${Math.round(110 - 80 * dusk)},${Math.round(190 - 140 * dusk)},${Math.round(250 - 150 * dusk)})` : '#6ec0fa', dusk > 0 ? '#c8b8a8' : '#fff4d0');
  // soleil et rayons
  x.save(); x.globalAlpha = 1 - dusk; cineGlow(x, 200, 26, 70, 'rgba(255,240,170,.85)'); x.fillStyle = '#fff6c8'; x.beginPath(); x.arc(200, 26, 13, 0, 7); x.fill();
  for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283 + t * 0.2; x.fillStyle = 'rgba(255,245,190,.12)'; x.beginPath(); x.moveTo(200, 26); x.lineTo(200 + Math.cos(a - .06) * 160, 26 + Math.sin(a - .06) * 160); x.lineTo(200 + Math.cos(a + .06) * 160, 26 + Math.sin(a + .06) * 160); x.fill(); }
  x.restore();
  // nuages
  x.fillStyle = dusk > 0 ? `rgba(${90 - 40 * dusk},${90 - 40 * dusk},${110 - 30 * dusk},.9)` : 'rgba(255,255,255,.92)';
  for (let i = 0; i < 5; i++) { const cx = ((i * 70 - sp * 0.15) % 320 + 320) % 320 - 40, cy = 18 + (i % 3) * 12; x.beginPath(); x.ellipse(cx, cy, 22, 7, 0, 0, 7); x.ellipse(cx + 12, cy - 4, 12, 7, 0, 0, 7); x.ellipse(cx - 10, cy - 2, 10, 6, 0, 0, 7); x.fill(); }
  if (t < 8.2) {
    hillLayer(x, 78, 10, 40, sp * 0.2, '#8fb8d8');
    hillLayer(x, 92, 8, 30, sp * 0.45, '#5aa850');
    hillLayer(x, 104, 5, 22, sp * 0.8, '#78c060');
    // chemin
    x.fillStyle = '#e4cc95'; x.fillRect(0, 118, 240, 22); x.fillStyle = '#d2b77c'; for (let i = 0; i < 16; i++) x.fillRect(((i * 23 - sp) % 260 + 260) % 260 - 10, 124 + (i % 3) * 5, 6, 1);
    x.fillStyle = '#5aa850'; x.fillRect(0, 140, 240, 20);
    for (let i = 0; i < 18; i++) { const fx = ((i * 17 - sp * 1.2) % 260 + 260) % 260 - 10; x.fillStyle = ['#ff8fb5', '#ffe066', '#ffffff'][i % 3]; x.fillRect(fx, 144 + (i % 4) * 4, 2, 2); }
    // héros, Nova et Éclos
    // héros et Nova marchent au même pas que le décor qui défile (deux pas par seconde)
    if (typeof introWalker === 'function') {
      const d = t * 30;
      introWalker(x, PALS[G && G.look] || PALS.player, 'right', 84, 84, 32, d);
      introWalker(x, PALS.rival, 'right', 112, 84, 32, d + 9);
      introCritter(x, 'clapotin', bigFlip('clapotin', 128), 22, 98, 24, t * 34 + 3, t, 8);
      introCritter(x, 'feuillon', bigFlip('feuillon', 128), 48, 96, 26, t * 34, t, 9);
      introCritter(x, 'brasille', bigFlip('brasille', 128), 150, 96, 26, t * 34 + 5, t, 9);
      const bx = 140 + Math.sin(t * 2) * 20, by = 30 + Math.cos(t * 3) * 6;
      galAnim(x, bigFlip('cervolant', 128), bx, by, 30, 30, t, { sp: 'cervolant' });
    } else {
      const fr = (f >> 3) % 2 ? 1 : 2, bob = (f >> 3) % 2;
      x.drawImage(personSprite(PALS[G && G.look] || PALS.player, 'right', fr), 84, 84 + bob, 32, 32);
      x.drawImage(personSprite(PALS.rival, 'right', 3 - fr), 112, 84 + (1 - bob), 32, 32);
    }
    // gros plan manga : portraits qui glissent
    if (t > 4.4 && t < 8.2) {
      const k = ease((t - 4.4) / 0.4) - ease((t - 7.8) / 0.4);
      x.fillStyle = `rgba(20,24,48,${0.55 * k})`; x.fillRect(0, 0, 240, 160);
      const a = portraitCanvas('Nova');
      x.save(); x.beginPath(); x.moveTo(120, 0); x.lineTo(240, 0); x.lineTo(240, 160); x.lineTo(90, 160); x.clip();
      x.fillStyle = '#2a5fd0'; x.fillRect(0, 0, 240, 160); for (let i = 0; i < 30; i++) { x.fillStyle = 'rgba(255,255,255,.12)'; x.fillRect(90 + ((i * 37 + f * 6) % 160), (i * 23) % 160, 40, 1); }
      if (a) x.drawImage(a, 240 - 140 * k, 10, 150, 150); x.restore();
      x.save(); x.beginPath(); x.moveTo(0, 0); x.lineTo(118, 0); x.lineTo(88, 160); x.lineTo(0, 160); x.clip();
      x.fillStyle = '#e2703a'; x.fillRect(0, 0, 240, 160); for (let i = 0; i < 30; i++) { x.fillStyle = 'rgba(255,255,255,.12)'; x.fillRect(((i * 41 + f * 6) % 160) - 40, (i * 29) % 160, 40, 1); }
      x.drawImage(bigFlip(G && G.flags && G.flags.starter ? G.flags.starter : 'feuillon', 480), -130 + 140 * k, 20, 120, 120); x.restore();
      x.strokeStyle = '#fff'; x.lineWidth = 3; x.beginPath(); x.moveTo(119, 0); x.lineTo(89, 160); x.stroke();
    }
  } else {
    // la colline : au loin, la Graine-Monde
    const z = ease((t - 8.2) / 3);
    hillLayer(x, 96 - z * 6, 4, 60, 0, '#7a9ab8');
    x.save(); x.translate(176, 92 - z * 6); x.scale(0.6 + z * 0.3, 0.6 + z * 0.3); x.fillStyle = '#3a2614'; x.fillRect(-4, -26, 8, 28); x.fillStyle = '#1f5a2e'; for (const [cx, cy, r] of [[0, -34, 18], [-14, -26, 11], [14, -26, 11]]) { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); } x.restore();
    cineGlow(x, 176, 66, 30, `rgba(255,230,140,${0.5 + 0.3 * Math.sin(t * 4)})`);
    hillLayer(x, 120, 6, 50, 0, '#4a8a40');
    // arrivés en haut : ils reprennent leur souffle
    const sw = Math.max(0, 1 - (t - 8.2) / 2.5);
    if (typeof drawWalker === 'function') {
      drawWalker(x, personSprite(PALS[G && G.look] || PALS.player, 'up', 0), 70, 92, 40, 40, null, 'up', t * (3 + 3 * sw));
      drawWalker(x, personSprite(PALS.rival, 'up', 0), 102, 92, 40, 40, null, 'up', t * (3 + 3 * sw) + 1.3);
    } else {
      x.drawImage(personSprite(PALS[G && G.look] || PALS.player, 'up', 0), 70, 92, 40, 40);
      x.drawImage(personSprite(PALS.rival, 'up', 0), 102, 92, 40, 40);
    }
    if (dusk > 0) { x.fillStyle = `rgba(10,12,30,${0.45 * dusk})`; x.fillRect(0, 0, 240, 160); if (t > 11.9 && t < 12.05) { x.fillStyle = 'rgba(255,255,255,.8)'; x.fillRect(0, 0, 240, 160); } }
  }
  if (t < 0.6) { x.fillStyle = `rgba(0,0,0,${1 - t / 0.6})`; x.fillRect(0, 0, 240, 160); }
  x.font = '7px sans-serif'; x.textAlign = 'right'; x.fillStyle = 'rgba(255,255,255,.6)'; x.fillText('A : passer', 236, 156); x.textAlign = 'left';
}
// Partie 3 : intervention céleste
function drawCelestial(x, t, f) {
  const W = 240, H = 160;
  const desc = ease((t - 4.6) / 3.2), rel = ease((t - 8) / 3);
  x.save();
  if (t < 5) x.translate((Math.random() - .5) * (1 + t), (Math.random() - .5) * (1 + t));
  cineSky(x, rel > 0 ? `rgb(${Math.round(10 + 90 * rel)},${Math.round(8 + 150 * rel)},${Math.round(20 + 210 * rel)})` : '#0a0814', rel > 0 ? '#ffe7b8' : '#2a1a3a');
  if (rel < 1) { x.fillStyle = `rgba(40,30,60,${0.9 * (1 - rel)})`; for (let i = 0; i < 7; i++) { x.beginPath(); x.ellipse((i * 41 + t * 30 * (i % 2 ? 1 : -1)) % 300 - 30 + rel * (i % 2 ? 160 : -160), 24 + (i % 3) * 12, 46, 12, 0, 0, 7); x.fill(); } }
  if (t < 5 && ((t * 3) % 1) < 0.08) { x.fillStyle = 'rgba(230,240,255,.6)'; x.fillRect(0, 0, W, H); }
  // la colonne de lumière
  if (desc > 0) { const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, `rgba(255,255,230,${0.7 * desc})`); g.addColorStop(1, 'rgba(255,255,230,0)'); x.fillStyle = g; x.fillRect(100 - desc * 20, 0, 40 + desc * 40, H); }
  // les deux géants
  const push = Math.sin(t * 9) * 3 * (1 - rel);
  x.globalAlpha = 1; x.drawImage(bigMon('nocturnis', 100), 6 + push - rel * 30, 30 + rel * 6, 100, 100); x.drawImage(bigFlip('aquoree', 100), 134 - push + rel * 30, 34 + rel * 6, 100, 100);
  if (rel < 1 && t < 8.5) { x.strokeStyle = `rgba(140,255,130,${0.9 * (1 - desc)})`; x.lineWidth = 5 + Math.sin(f / 2) * 2; x.beginPath(); x.moveTo(90, 72); x.lineTo(120, 74); x.stroke(); x.strokeStyle = `rgba(90,190,255,${0.9 * (1 - desc)})`; x.beginPath(); x.moveTo(150, 78); x.lineTo(120, 74); x.stroke(); cineGlow(x, 120, 74, 26 + t * 4, `rgba(255,255,230,${0.8 * (1 - desc)})`); }
  // Éveillon descend
  if (desc > 0) {
    const ey = -100 + desc * 108;
    cineGlow(x, 120, ey + 40, 120, 'rgba(210,160,255,.7)');
    for (let i = 0; i < 3; i++) { x.strokeStyle = `rgba(255,255,255,${0.45 - i * 0.12})`; x.lineWidth = 2; x.beginPath(); x.arc(120, ey + 48, 34 + i * 14 + (f % 40) * rel, 0, 7); x.stroke(); }
    x.drawImage(bigMon('auberis', 220), 10, ey - 70, 220, 220);
  }
  if (rel > 0) { for (let i = 0; i < 12; i++) { const a = -Math.PI / 2 + (i - 5.5) * 0.18; x.fillStyle = `rgba(255,250,210,${0.1 * rel})`; x.beginPath(); x.moveTo(120, -10); x.lineTo(120 + Math.cos(a - .04) * 260, -10 + Math.sin(a - .04) * -260 * -1); x.lineTo(120 + Math.cos(a + .04) * 260, -10 + Math.sin(a + .04) * -260 * -1); x.fill(); }
    for (let i = 0; i < 26; i++) { x.fillStyle = `rgba(255,255,255,${0.8 * rel})`; x.fillRect((i * 53 + f) % W, (i * 31 + f * 0.7) % H, 1, 1); } }
  x.restore();
  if (t > 4.5 && t < 4.75) { x.fillStyle = 'rgba(255,255,255,.85)'; x.fillRect(0, 0, W, H); }
  x.font = '7px sans-serif'; x.textAlign = 'right'; x.fillStyle = 'rgba(255,255,255,.6)'; x.fillText('A : passer', 236, 156); x.textAlign = 'left';
}

// Partie 2 : la terre contre l'océan, dans la tempête
function drawClash(x, t, f, D) {
  const W = 240, H = 160, p = t / D, beat = (t * 138 / 60) % 1, pulse = Math.max(0, 1 - beat * 4);
  x.save();
  const sh = p > 0.5 ? 2.5 * pulse + 0.6 : 1.2 * pulse;
  x.translate((Math.random() - .5) * sh * 2, (Math.random() - .5) * sh * 2);
  const flash = (beat < 0.06 && ((t * 138 / 60) | 0) % 4 === 0);
  const rain = n => { x.strokeStyle = 'rgba(200,220,255,.35)'; x.lineWidth = 1; x.beginPath(); for (let i = 0; i < n; i++) { const rx = (i * 53 + f * 8) % 270 - 15, ry = (i * 97 + f * 13) % 180 - 10; x.moveTo(rx, ry); x.lineTo(rx - 4, ry + 10); } x.stroke(); };
  const waves = (y, amp, x0 = 110) => { for (let k = 0; k < 4; k++) { x.fillStyle = k % 2 ? '#0e2350' : '#173a6a'; x.beginPath(); x.moveTo(x0, H + 10); for (let xx = x0; xx <= W + 10; xx += 5) x.lineTo(xx, y + k * 8 + Math.sin(xx / 14 + t * (3 + k) + k) * amp); x.lineTo(W + 10, H + 10); x.fill(); } };
  if (p < 0.27) {
    const q = p / 0.27;
    cineSky(x, '#06060e', '#22283a');
    for (let i = 0; i < 6; i++) { x.fillStyle = 'rgba(30,30,50,.9)'; x.beginPath(); x.ellipse((i * 53 + t * 20) % 300 - 30, 20 + (i % 3) * 9, 46, 11, 0, 0, 7); x.fill(); }
    // la terre se fend à gauche
    waves(118 - q * 10, 4 + q * 6, 88);   // l'océan vient lécher la rive
    x.fillStyle = '#2a1e16'; x.beginPath(); x.moveTo(-10, H + 10); x.lineTo(-10, 112); x.lineTo(60, 106); x.lineTo(112, 116); x.lineTo(124, H + 10); x.fill();
    x.strokeStyle = `rgba(150,255,120,${0.5 + 0.5 * q})`; x.lineWidth = 2; x.beginPath(); x.moveTo(10, 112); x.lineTo(30, 126); x.lineTo(24, 140); x.moveTo(60, 108); x.lineTo(70, 130); x.lineTo(92, 136); x.stroke();
    cineGlow(x, 50, 120 - q * 30, 40 + q * 30, 'rgba(150,255,120,.45)');
    x.drawImage(bigMon('nocturnis', 110), -6, 150 - q * 128, 110, 110);
    // l'océan se lève à droite
    cineGlow(x, 186, 120 - q * 30, 40 + q * 30, 'rgba(90,190,255,.45)');
    x.drawImage(bigFlip('aquoree', 110), 134, 150 - q * 124, 110, 110);
    x.fillStyle = 'rgba(220,240,255,.5)'; for (let i = 0; i < 20; i++) x.fillRect(130 + (i * 37 + f * 2) % 110, 110 - (i * 23 + f * 3) % (40 * q + 1), 2, 2);
  } else if (p < 0.5) {
    const q = ease((p - 0.27) / 0.05);
    x.save(); x.beginPath(); x.moveTo(-10, -10); x.lineTo(150, -10); x.lineTo(90, H + 10); x.lineTo(-10, H + 10); x.clip();
    cineSky(x, '#2a1a0a', '#6a8a3a');
    for (let i = 0; i < 26; i++) { x.fillStyle = 'rgba(160,255,120,.25)'; const a = i / 26 * 6.283 + f * 0.01; x.beginPath(); x.moveTo(60 + Math.cos(a) * 40, 80 + Math.sin(a) * 40); x.lineTo(60 + Math.cos(a - .02) * 260, 80 + Math.sin(a - .02) * 260); x.lineTo(60 + Math.cos(a + .02) * 260, 80 + Math.sin(a + .02) * 260); x.fill(); }
    for (let i = 0; i < 8; i++) { x.fillStyle = '#5a4030'; const rx = (i * 29 + f) % 150, ry = 140 - (i * 19 + f * 2) % 150; x.fillRect(rx, ry, 4, 3); }
    x.drawImage(bigMon('nocturnis', 170), -170 + q * 160, -14, 170, 170); x.restore();
    x.save(); x.beginPath(); x.moveTo(150, -10); x.lineTo(W + 10, -10); x.lineTo(W + 10, H + 10); x.lineTo(90, H + 10); x.clip();
    cineSky(x, '#051a3a', '#2a7ad0');
    for (let i = 0; i < 26; i++) { x.fillStyle = 'rgba(160,220,255,.25)'; const a = i / 26 * 6.283 - f * 0.01; x.beginPath(); x.moveTo(180 + Math.cos(a) * 40, 80 + Math.sin(a) * 40); x.lineTo(180 + Math.cos(a - .02) * 260, 80 + Math.sin(a - .02) * 260); x.lineTo(180 + Math.cos(a + .02) * 260, 80 + Math.sin(a + .02) * 260); x.fill(); }
    x.drawImage(bigFlip('aquoree', 170), 250 - q * 170, -8, 170, 170); x.restore();
    x.strokeStyle = '#ffffff'; x.lineWidth = 3; x.beginPath(); x.moveTo(150, -10); x.lineTo(90, H + 10); x.stroke();
  } else {
    const q = ease((p - 0.5) / 0.15);
    cineSky(x, '#04040a', '#1a1428');
    for (let i = 0; i < 7; i++) { x.fillStyle = 'rgba(26,24,40,.95)'; x.beginPath(); x.ellipse((i * 43 - t * 30) % 300 + 20, 18 + (i % 3) * 10, 44, 12, 0, 0, 7); x.fill(); }
    waves(124, 7, 70);
    x.fillStyle = '#2a1e16'; x.beginPath(); x.moveTo(-10, H + 10); x.lineTo(-10, 120); x.lineTo(90, 126); x.lineTo(110, H + 10); x.fill();
    const gx = 14 + q * 12, ax = 126 - q * 12;
    const cx = 120, cy = 76;
    x.lineCap = 'round';
    x.strokeStyle = 'rgba(150,255,120,.9)'; x.lineWidth = 7 + 3 * pulse; x.beginPath(); x.moveTo(gx + 70, 72); x.lineTo(cx, cy); x.stroke();
    x.strokeStyle = 'rgba(90,190,255,.9)'; x.beginPath(); x.moveTo(ax + 30, 80); x.lineTo(cx, cy); x.stroke();
    cineGlow(x, cx, cy, 26 + 20 * pulse + 30 * q, 'rgba(255,255,230,.95)');
    for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283 + t * 4; x.fillStyle = i % 2 ? '#9af08a' : '#8ad0ff'; x.fillRect(cx + Math.cos(a) * (20 + 30 * pulse), cy + Math.sin(a) * (20 + 30 * pulse), 3, 3); }
    x.drawImage(bigMon('nocturnis', 100), gx, 36 + Math.sin(t * 6) * 2, 100, 100);
    x.drawImage(bigFlip('aquoree', 100), ax, 40 + Math.cos(t * 6) * 2, 100, 100);
  }
  rain(p < 0.27 || p >= 0.5 ? 90 : 0);
  if (flash) { x.fillStyle = 'rgba(235,240,255,.75)'; x.fillRect(-10, -10, W + 20, H + 20); x.strokeStyle = '#ffffff'; x.lineWidth = 2; x.beginPath(); x.moveTo(60 + (f % 120), 0); x.lineTo(50 + (f % 120), 30); x.lineTo(64 + (f % 120), 34); x.lineTo(44 + (f % 120), 84); x.stroke(); }
  x.restore();
  x.font = '7px sans-serif'; x.textAlign = 'right'; x.fillStyle = 'rgba(255,255,255,.6)'; x.fillText('A : passer', 236, 156); x.textAlign = 'left';
}
