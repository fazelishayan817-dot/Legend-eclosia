'use strict';
/* ============================================================
   AWAKENING — graphismes générés (tuiles, personnages, créatures)
   ============================================================ */
const TS = 16;
function mkCanvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function hex2rgb(h) { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
function rgb2hex(c) { return '#' + c.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join(''); }
function mixc(a, b, t) { return a.map((v, i) => v + (b[i] - v) * t); }
function lighten(c, t) { return mixc(c, [255, 255, 255], t); }
function darken(c, t) { return mixc(c, [0, 0, 0], t); }
function lhex(h, t) { return rgb2hex(lighten(hex2rgb(h), t)); }
function dhex(h, t) { return rgb2hex(darken(hex2rgb(h), t)); }
function rgb2hsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b); let h = 0, s = 0; const l = (mx + mn) / 2;
  if (mx !== mn) {
    const d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    if (mx === r) h = (g - b) / d + (g < b ? 6 : 0); else if (mx === g) h = (b - r) / d + 2; else h = (r - g) / d + 4;
    h *= 60;
  }
  return [h, s, l];
}
function hsl2rgb([h, s, l]) {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2;
  let r, g, b;
  if (h < 60) [r, g, b] = [c, x, 0]; else if (h < 120) [r, g, b] = [x, c, 0]; else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c]; else if (h < 300) [r, g, b] = [x, 0, c]; else [r, g, b] = [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

// ---------- Palettes des cartes ----------
const MPAL = {
  envers: { g: '#56664e', g2: '#4a5a44', g3: '#62735a', p: '#77685e', p2: '#665850', tr: '#2e3e2c', tr2: '#1e2c20', tr3: '#6a2a3a', trk: '#2a1a1a', ol: '#0e140e', w: '#2e3e60', w2: '#4e5e80', tg: '#3e4e2e', tg2: '#2e3e22', s: '#8a8070', rk: '#5e5e66' },
  avant: { g: '#9ad86a', g2: '#88c85a', g3: '#b2e884', p: '#f4e4b0', p2: '#e4d098', tr: '#3aa050', tr2: '#2a8040', tr3: '#6ad070', trk: '#8a6a40', ol: '#1a3a2a', w: '#3ac0e8', w2: '#9ae8ff', tg: '#5ab858', tg2: '#3a9840', s: '#fff0c0', rk: '#b0a898' },
  solvene: { g: '#8ccf6c', g2: '#7bbd5d', g3: '#a3dc84', p: '#e4cc95', p2: '#d2b77c', tr: '#3d8b4b', tr2: '#2c6a39', tr3: '#5cad60', trk: '#7a5532', ol: '#1f3d2a', w: '#4f9de0', w2: '#8ac8f2', tg: '#4a9a48', tg2: '#357a35', s: '#ecd9a0', rk: '#a39a8f' },
  brumaire: { g: '#86bfa6', g2: '#75ad95', g3: '#9ccfb8', p: '#cfc6ad', p2: '#bab096', tr: '#2f7a6a', tr2: '#215a4f', tr3: '#4a9a86', trk: '#5e4a3c', ol: '#173a33', w: '#4a86c8', w2: '#7fb2e0', tg: '#3f8f78', tg2: '#2d6e5c', s: '#ddd2b0', rk: '#8f949a' },
  neige: { g: '#e6eff5', g2: '#d3e1ea', g3: '#f6fbfd', p: '#c9d6df', p2: '#b4c3cd', tr: '#3f7a74', tr2: '#2c5a56', tr3: '#cfe8ea', trk: '#5e4a3c', ol: '#1f3a3a', w: '#5a9bd0', w2: '#a9d4f0', tg: '#9ec2bd', tg2: '#7ea6a1', s: '#eef3f6', rk: '#9aa6ae' },
  automne: { g: '#c9b46a', g2: '#b8a35a', g3: '#d8c47e', p: '#e2c99a', p2: '#cfb27e', tr: '#c0642e', tr2: '#94481f', tr3: '#e08a3e', trk: '#6a4a30', ol: '#3a2214', w: '#4f8fcf', w2: '#8abbe6', tg: '#a8923e', tg2: '#86742c', s: '#ead6a4', rk: '#a08e7e' },
  grotte: { g: '#8a7560', g2: '#7b6754', g3: '#9a8670', p: '#9a8670', p2: '#8a7560', tr: '#4d4038', tr2: '#3a3029', tr3: '#66574c', trk: '#3a3029', ol: '#231c18', w: '#3f6f9a', w2: '#6a9ac0', tg: '#6a5a48', tg2: '#55473a', s: '#a8957c', rk: '#6e6258' },
  abysse: { g: '#5d5a74', g2: '#4f4c66', g3: '#6d6a86', p: '#6d6a86', p2: '#5d5a74', tr: '#2e2b40', tr2: '#211f30', tr3: '#45405e', trk: '#211f30', ol: '#141220', w: '#36508a', w2: '#5a78b0', tg: '#4a4660', tg2: '#3a364e', s: '#7a7690', rk: '#55526a' },
  int: { g: '#d8b484', g2: '#c9a271', g3: '#e3c494', p: '#d8b484', p2: '#c9a271', tr: '#e9e1cf', tr2: '#c8bca3', tr3: '#f4efe2', trk: '#8a5a3c', ol: '#3a2a20', w: '#4f9de0', w2: '#8ac8f2', tg: '#4a9a48', tg2: '#357a35', s: '#ecd9a0', rk: '#a39a8f' },
};
function getPal(key) {
  if (MPAL[key]) return MPAL[key];
  if (key.startsWith('gym:')) {
    const t = key.slice(4), c = TC[t] || '#999999';
    const P = Object.assign({}, MPAL.int);
    P.gf = lhex(c, 0.55); P.gf2 = lhex(c, 0.35); P.gfl = dhex(c, 0.2);
    MPAL[key] = P; return P;
  }
  return MPAL.solvene;
}

// ---------- Tuiles ----------
const TILE_CACHE = {};
const SOLID = new Set('T~bSFrRxwcCBtpGVL'.split(''));
function tileCanvas(ch, palKey, v, f) {
  const key = palKey + '|' + ch + '|' + v + '|' + f;
  if (TILE_CACHE[key]) return TILE_CACHE[key];
  const c = mkCanvas(TS, TS), x = c.getContext('2d');
  paintTile(x, ch, getPal(palKey), v, f, palKey);
  TILE_CACHE[key] = c; return c;
}
function P1(x, px, py, col) { x.fillStyle = col; x.fillRect(px, py, 1, 1); }
function R1(x, px, py, w, h, col) { x.fillStyle = col; x.fillRect(px, py, w, h); }
function circ(x, cx, cy, r, fn) {
  for (let yy = 0; yy < 16; yy++) for (let xx = 0; xx < 16; xx++) {
    const d = Math.hypot(xx + 0.5 - cx, yy + 0.5 - cy);
    if (d <= r) fn(xx, yy, d);
  }
}
function paintTile(x, ch, P, v, f, palKey) {
  const R = rng(v * 7919 + ch.charCodeAt(0) * 131 + 17);
  const ground = () => { R1(x, 0, 0, 16, 16, P.g); for (let i = 0; i < 7; i++) P1(x, ri(R, 0, 15), ri(R, 0, 15), R() < 0.5 ? P.g2 : P.g3); };
  const floor = () => {
    R1(x, 0, 0, 16, 16, P.g);
    for (let y = 3; y < 16; y += 4) R1(x, 0, y, 16, 1, P.g2);
    const off = (v % 2) * 8; R1(x, off + 3, 0, 1, 3, P.g2); R1(x, (off + 11) % 16, 4, 1, 3, P.g2); R1(x, (off + 6) % 16, 8, 1, 3, P.g2); R1(x, (off + 13) % 16, 12, 1, 3, P.g2);
    R1(x, 0, 0, 16, 1, P.g3);
  };
  switch (ch) {
    case '.': case 'x': case 'D': ground(); break;
    case ',': {
      R1(x, 0, 0, 16, 16, P.p);
      for (let i = 0; i < 6; i++) P1(x, ri(R, 0, 15), ri(R, 0, 15), P.p2);
      for (let i = 0; i < 2; i++) P1(x, ri(R, 0, 15), ri(R, 0, 15), lhex(P.p, 0.25));
      break;
    }
    case '"': {
      ground();
      const T = ['..1...1.', '.121.121', '.122.122', '12221222', '12222222', '22232223', '23333333', '33333333'];
      const cols = { 1: lhex(P.tg, 0.28), 2: P.tg, 3: P.tg2 };
      for (let q = 0; q < 4; q++) {
        const bx = (q % 2) * 8, by = (q >> 1) * 8;
        for (let yy = 0; yy < 8; yy++) for (let xx = 0; xx < 8; xx++) { const k = T[yy][xx]; if (k !== '.') P1(x, bx + xx, by + yy, cols[k]); }
      }
      break;
    }
    case 'T': {
      ground();
      const ol = P.ol;
      circ(x, 8, 7, 7.4, (xx, yy, d) => {
        let col = P.tr;
        const s = (xx - 8) + (yy - 7);
        if (s < -5) col = P.tr3; else if (s > 4) col = P.tr2;
        if (d > 6.6) col = ol;
        else if ((xx * 7 + yy * 13 + v) % 11 === 0) col = s < 0 ? P.tr3 : P.tr2;
        P1(x, xx, yy, col);
      });
      R1(x, 6, 13, 4, 3, P.trk); R1(x, 6, 13, 1, 3, ol); R1(x, 9, 13, 1, 3, ol); R1(x, 6, 15, 4, 1, ol);
      if (palKey === 'neige') { R1(x, 4, 1, 6, 2, '#ffffff'); R1(x, 3, 3, 3, 1, '#ffffff'); }
      break;
    }
    case '~': {
      R1(x, 0, 0, 16, 16, P.w);
      const o = f * 4;
      for (let i = 0; i < 3; i++) {
        const yy = (i * 5 + 2 + (v % 3)) % 16, xx = (i * 6 + o + v * 3) % 16;
        R1(x, xx, yy, 4, 1, P.w2); R1(x, (xx + 4) % 16, yy + 1 > 15 ? 0 : yy + 1, 2, 1, P.w2);
      }
      R1(x, 0, 0, 16, 1, lhex(P.w, 0.1));
      break;
    }
    case 'f': {
      ground();
      const cols = ['#f4f4f4', '#f08aa8', '#f6d05a', '#b48ae8'];
      const fl = (fx, fy, c) => { P1(x, fx, fy - 1, c); P1(x, fx - 1, fy, c); P1(x, fx + 1, fy, c); P1(x, fx, fy + 1, c); P1(x, fx, fy, '#e8a020'); };
      fl(4, 4, cols[v % 4]); fl(11, 10, cols[(v + 1) % 4]); fl(12, 3, cols[(v + 2) % 4]); fl(4, 12, cols[(v + 3) % 4]);
      break;
    }
    case 'b': {
      ground();
      circ(x, 8, 9, 6.6, (xx, yy, d) => {
        let col = dhex(P.tr, 0.05);
        if (d > 5.8) col = P.ol; else if ((xx + yy) % 4 === 0) col = P.tr3; else if (xx + yy > 18) col = P.tr2;
        P1(x, xx, yy, col);
      });
      P1(x, 6, 7, '#f6e7a1'); P1(x, 10, 10, '#f6e7a1');
      break;
    }
    case 'S': {
      ground();
      R1(x, 7, 9, 2, 7, '#7a5532'); R1(x, 2, 3, 12, 7, P.ol); R1(x, 3, 4, 10, 5, '#d9b27a');
      R1(x, 4, 5, 8, 1, '#8a6a40'); R1(x, 4, 7, 6, 1, '#8a6a40');
      break;
    }
    case 'F': {
      ground();
      R1(x, 0, 5, 16, 2, '#f0e6d0'); R1(x, 0, 10, 16, 2, '#f0e6d0'); R1(x, 0, 7, 16, 1, '#9a8a70'); R1(x, 0, 12, 16, 1, '#9a8a70');
      R1(x, 2, 3, 3, 12, '#f8f2e4'); R1(x, 11, 3, 3, 12, '#f8f2e4'); R1(x, 4, 3, 1, 12, '#9a8a70'); R1(x, 13, 3, 1, 12, '#9a8a70');
      break;
    }
    case 'r': {
      if (palKey === 'grotte' || palKey === 'abysse') { R1(x, 0, 0, 16, 16, P.g); } else ground();
      const base = P.rk;
      circ(x, 8, 9, 6.5, (xx, yy, d) => {
        let col = base; const s = (xx - 8) + (yy - 9);
        if (d > 5.7) col = '#3b3631'; else if (s < -4) col = lhex(base, 0.3); else if (s > 3) col = dhex(base, 0.25);
        P1(x, xx, yy, col);
      });
      break;
    }
    case 's': R1(x, 0, 0, 16, 16, P.s); for (let i = 0; i < 6; i++) P1(x, ri(R, 0, 15), ri(R, 0, 15), dhex(P.s, 0.12)); break;
    case '=': {
      R1(x, 0, 0, 16, 16, P.w);
      R1(x, 1, 0, 14, 16, '#b88a56');
      for (let yy = 0; yy < 16; yy += 4) R1(x, 1, yy, 14, 1, '#7a5532');
      R1(x, 1, 0, 1, 16, '#5a3e24'); R1(x, 14, 0, 1, 16, '#5a3e24');
      break;
    }
    case 'm': {
      R1(x, 0, 0, 16, 16, P.g);
      for (let i = 0; i < 8; i++) P1(x, ri(R, 0, 15), ri(R, 0, 15), R() < 0.5 ? P.g2 : P.g3);
      if (v % 5 === 0) { R1(x, 5, 9, 3, 2, P.g2); R1(x, 5, 9, 3, 1, P.g3); }
      break;
    }
    case 'R': {
      R1(x, 0, 0, 16, 16, P.tr);
      for (let i = 0; i < 5; i++) {
        const bx = ri(R, 0, 12), by = ri(R, 0, 12), bw = ri(R, 3, 6), bh = ri(R, 3, 5);
        R1(x, bx, by, bw, bh, P.tr3); R1(x, bx, by + bh - 1, bw, 1, P.tr2); R1(x, bx + bw - 1, by, 1, bh, P.tr2);
      }
      R1(x, 0, 15, 16, 1, P.tr2);
      break;
    }
    case 'O': {
      R1(x, 0, 0, 16, 16, P.rk);
      for (let i = 0; i < 6; i++) P1(x, ri(R, 0, 15), ri(R, 0, 15), dhex(P.rk, 0.2));
      circ(x, 8, 16, 7, (xx, yy) => P1(x, xx, yy, '#120e10'));
      break;
    }
    case 'q': {
      R1(x, 0, 0, 16, 16, '#b8b4ac');
      R1(x, 0, 7, 16, 1, '#8e8a84'); R1(x, 0, 15, 16, 1, '#8e8a84'); R1(x, 7, 0, 1, 7, '#8e8a84'); R1(x, 12, 8, 1, 7, '#8e8a84');
      R1(x, 0, 0, 16, 1, '#d2cec6'); R1(x, 0, 8, 16, 1, '#d2cec6');
      break;
    }
    case 'a': {
      R1(x, 0, 0, 16, 16, '#d6cfbf'); R1(x, 1, 1, 14, 14, '#ece6d6');
      R1(x, 3, 3, 10, 10, '#e2c56a'); R1(x, 4, 4, 8, 8, '#f3dc8a'); R1(x, 7, 5, 2, 6, '#c9a845'); R1(x, 5, 7, 6, 2, '#c9a845');
      break;
    }
    case 'o': floor(); break;
    case 'g': {
      R1(x, 0, 0, 16, 16, P.gf || P.g);
      R1(x, 0, 0, 8, 8, P.gf2 || P.g2); R1(x, 8, 8, 8, 8, P.gf2 || P.g2);
      R1(x, 0, 0, 16, 1, '#ffffff33');
      break;
    }
    case 'w': {
      R1(x, 0, 0, 16, 16, P.tr);
      for (let xx = 2; xx < 16; xx += 4) R1(x, xx, 0, 1, 16, P.tr2);
      R1(x, 0, 12, 16, 4, P.trk); R1(x, 0, 12, 16, 1, dhex(P.trk, 0.3));
      break;
    }
    case 'c': {
      floor();
      R1(x, 0, 2, 16, 13, '#8a5a3c'); R1(x, 0, 2, 16, 4, '#c08a5a'); R1(x, 0, 2, 16, 1, '#e0b080'); R1(x, 0, 14, 16, 1, '#4a2e1c');
      break;
    }
    case 'C': {
      floor();
      R1(x, 2, 1, 12, 13, '#3a4450'); R1(x, 3, 2, 10, 7, '#5fd0e8'); R1(x, 4, 3, 5, 1, '#c8f4ff'); R1(x, 3, 10, 10, 3, '#9aa7b0'); R1(x, 4, 11, 2, 1, '#e05050');
      break;
    }
    case 'B': {
      R1(x, 0, 0, 16, 16, '#6a4a30'); R1(x, 1, 1, 14, 14, '#4a3020');
      const bc = ['#c4553e', '#4a8fe0', '#58b35a', '#e9c43a', '#a35cc6'];
      for (let row = 0; row < 2; row++) for (let i = 0; i < 6; i++) R1(x, 2 + i * 2, 2 + row * 7, 2, 5, bc[(i + row + v) % 5]);
      R1(x, 1, 7, 14, 1, '#6a4a30');
      break;
    }
    case 't': {
      floor();
      R1(x, 1, 3, 14, 9, '#a8784a'); R1(x, 1, 3, 14, 2, '#c8986a'); R1(x, 2, 12, 2, 4, '#6a4a30'); R1(x, 12, 12, 2, 4, '#6a4a30');
      break;
    }
    case 'p': {
      floor();
      R1(x, 5, 10, 6, 5, '#b0603a'); R1(x, 5, 10, 6, 1, '#d08050');
      circ(x, 8, 6, 5, (xx, yy, d) => P1(x, xx, yy, d > 4.2 ? '#1f5a2a' : ((xx + yy) % 3 ? '#3a9a48' : '#5cc060')));
      break;
    }
    case 'k': {
      floor();
      R1(x, 2, 4, 12, 9, '#b84a3a'); R1(x, 3, 5, 10, 7, '#d8664e'); for (let xx = 3; xx < 13; xx += 2) P1(x, xx, 13, '#b84a3a');
      break;
    }
    case 'G': {
      const base = (P.gf || P.g);
      R1(x, 0, 0, 16, 16, base);
      R1(x, 3, 11, 10, 5, '#7a7a86'); R1(x, 3, 11, 10, 1, '#9a9aa6');
      R1(x, 5, 2, 6, 9, '#a0a0ac'); R1(x, 6, 1, 4, 2, '#b8b8c4'); R1(x, 5, 2, 1, 9, '#6a6a76'); R1(x, 7, 5, 2, 2, P.gfl || '#e9c43a');
      break;
    }
    case 'V': { // falaise / roche de montagne
      R1(x, 0, 0, 16, 16, P.rk);
      for (let i = 0; i < 4; i++) { const bx = ri(R, 0, 11), by = ri(R, 0, 11); R1(x, bx, by, 5, 4, lhex(P.rk, 0.2)); R1(x, bx, by + 3, 5, 1, dhex(P.rk, 0.3)); }
      R1(x, 0, 15, 16, 1, dhex(P.rk, 0.4));
      break;
    }
    case 'L': { // lampadaire
      ground(); R1(x, 7, 4, 2, 12, '#3a3a44'); R1(x, 5, 1, 6, 4, '#3a3a44'); R1(x, 6, 2, 4, 2, '#ffe69a'); R1(x, 5, 14, 6, 2, '#3a3a44');
      break;
    }
    default: ground();
  }
}

// ---------- Bâtiments ----------
const ROOF = { center: '#2f9e94', shop: '#e2a23a', lab: '#8a9aa8', home: '#c45a4a', league: '#d8b84a' };
const HOUSE_ROOFS = ['#c45a4a', '#5a7ac4', '#7a5ac4', '#4a9a5a', '#c4844a', '#4a8a9a'];
let drawBuilding; // version définitive : hd.js

// ---------- Personnages ----------
const PERSON_CACHE = {};
const PALS = {
  player: { h: '#3a2a22', s: '#f2c9a0', c: '#e76f51', p: '#2f4858', hat: '#2a9d8f' },
  player2: { h: '#6a3a22', s: '#e8b48a', c: '#4a8fe0', p: '#3a3a4a', hat: '#e9c43a' },
  player3: { h: '#1a1a22', s: '#c68a5e', c: '#58b35a', p: '#4a3a2a', hat: '#c4553e' },
  rival: { h: '#2a5fd0', s: '#e8b890', c: '#1f2f5a', p: '#1e1e24', style: 'pony', spiky: 1, band: '#1a1a22', stripe: '#d8303a', shorts: 1, boots: '#7a4a2a', gloves: '#1a1a22', pack: '#26385e' },
  epine: { h: '#2a5fd0', s: '#e8b890', c: '#3a2440', p: '#2a1f2e', style: 'wild' },
  nox: { h: '#e8e8f8', s: '#e8c8a8', c: '#3a1e5a', p: '#1a1028', style: 'bob' },
  oniris: { h: '#2a1a3a', s: '#e8c0a0', c: '#1a1424', p: '#3a2a4a', style: 'long', hat: '#3a2a5a' },
  racine: { h: '#2a1f2e', s: '#d8b090', c: '#3a2440', p: '#2a1f2e', hat: '#6a2a3a' },
  lame: { h: '#2a5fd0', s: '#e8b890', c: '#5a1a2a', p: '#2a1a1a', style: 'long' },
  aurele: { h: '#5a3a2a', s: '#e0b088', c: '#5a8a4a', p: '#3a3a2a', style: 'swept' },
  ronce: { h: '#e8e8f0', s: '#c8a080', c: '#2a0f1a', p: '#1a0a10', style: 'long', beard: 1 },
  prof: { h: '#c8c8c8', s: '#f2c9a0', c: '#f4f4f0', p: '#5a5a6a', glasses: 1, beard: 1 },
  mom: { h: '#7a4a2a', s: '#f2c9a0', c: '#e88aa8', p: '#6a4a6a', style: 'bun' },
  nurse: { h: '#f08aa8', s: '#f8d8b8', c: '#ffffff', p: '#e0e0e8', hat: '#ffffff' },
  clerk: { h: '#3a2a22', s: '#e8b48a', c: '#2f6fb0', p: '#2a2a3a' },
  grunt: { h: '#1a1a1a', s: '#e8c0a0', c: '#3b2f5c', p: '#2a2240', hat: '#5a4a8a' },
  admin: { h: '#e0e0f0', s: '#f2c9a0', c: '#5a2a6a', p: '#2a1a3a' },
  boss: { h: '#2a1a3a', s: '#e8c0a0', c: '#1a1424', p: '#3a2a4a', hat: '#a35cc6' },
  elio: { h: '#f6e7a1', s: '#f2c9a0', c: '#ffffff', p: '#c9a845', style: 'long', beard: 1 },
  sailor: { h: '#3a2a22', s: '#e0b088', c: '#f4f4f4', p: '#2f4f8f', hat: '#ffffff' },
  guard: { h: '#3a2a22', s: '#e0b088', c: '#3a5a8a', p: '#2a3a5a', hat: '#2a3a5a' },
};
const NPC_PALS = [
  { h: '#3a2a22', s: '#f2c9a0', c: '#58b35a', p: '#4a3a2a' }, { h: '#e9c43a', s: '#f2c9a0', c: '#e46aa8', p: '#4a4a6a' },
  { h: '#8a4a2a', s: '#d8a070', c: '#4a8fe0', p: '#3a3a4a' }, { h: '#1a1a22', s: '#a06a4a', c: '#e9c43a', p: '#5a3a2a' },
  { h: '#c8c8c8', s: '#f2c9a0', c: '#a98557', p: '#5a5a5a' }, { h: '#c0392b', s: '#f2c9a0', c: '#86b4e6', p: '#2a3a4a' },
  { h: '#4a2a1a', s: '#8a5a3a', c: '#ee7b3a', p: '#3a2a2a' }, { h: '#2a2a3a', s: '#f2c9a0', c: '#a35cc6', p: '#2a2a3a', hat: '#a35cc6' },
  { h: '#6a4a2a', s: '#e8b48a', c: '#94a3ad', p: '#3a4450' }, { h: '#f6e7a1', s: '#f8d8b8', c: '#8fd8ea', p: '#4a6a8a' },
];
let personSprite; // version définitive : hd.js

// ---------- Créatures (générées) ----------
const MON_CACHE = {};
const MATS = { 4: '#ffffff', 5: '#1b1626', 6: '#ffb43a', 7: '#f0a030', 8: '#4caf50', 9: '#f5d142', 10: '#d6f6ff', 11: '#ff5fa2', 12: '#ffd75e', 13: '#c8d0d8', 14: '#d84a3a', 15: '#e8f4ff', 16: '#1b1626' };
function monSprite(sp, shiny) {
  const key = sp + (shiny ? '*' : '');
  if (MON_CACHE[key]) return MON_CACHE[key];
  const s = SP[sp];
  if (typeof ELOOK !== 'undefined') {
    const t = mkCanvas(192, 192), tg = t.getContext('2d'); tg.scale(4, 4); drawCrea(tg, ELOOK[sp] || autoLook(sp), s.types.includes('ombre'));
    const c = mkCanvas(160, 160), cx2 = c.getContext('2d'); cx2.imageSmoothingEnabled = true;
    if (shiny) cx2.filter = 'hue-rotate(150deg) saturate(1.2)';
    cx2.drawImage(t, 8, 16, 144, 144);
    MON_CACHE[key] = c; return c;
  }
  const N = 40;
  const g = new Uint8Array(N * N);
  const R = rng(hashStr(s.line + ':look'));
  const R2 = rng(hashStr(sp + ':detail'));
  const stScale = { '1': 0.64, '2': s.next ? 0.8 : 0.9, '3': 1, 'u': 0.88, 'P': 1, 'L': 1.04, 'M': 0.96 }[s.stage];
  const sc = stScale * 1.2;
  const cx = (N - 1) / 2;
  const gy = N - 2;
  const inb = (x, y) => x >= 0 && y >= 0 && x < N && y < N;
  const set = (x, y, m, under) => { x = Math.round(x); y = Math.round(y); if (!inb(x, y)) return; const i = y * N + x; if (under && g[i]) return; g[i] = m; };
  const E = (ex, ey, rx, ry, m, under) => {
    rx = Math.max(0.6, rx); ry = Math.max(0.6, ry);
    for (let y = Math.floor(ey - ry); y <= Math.ceil(ey + ry); y++) for (let x = Math.floor(ex - rx); x <= Math.ceil(ex + rx); x++) {
      const dx = (x - ex) / rx, dy = (y - ey) / ry; if (dx * dx + dy * dy <= 1) set(x, y, m, under);
    }
  };
  const ES = (dx, ey, rx, ry, m, under) => { E(cx - dx, ey, rx, ry, m, under); E(cx + dx, ey, rx, ry, m, under); };
  const TRI = (x1, y1, x2, y2, x3, y3, m) => {
    const minx = Math.floor(Math.min(x1, x2, x3)), maxx = Math.ceil(Math.max(x1, x2, x3));
    const miny = Math.floor(Math.min(y1, y2, y3)), maxy = Math.ceil(Math.max(y1, y2, y3));
    const ar = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1);
    if (Math.abs(ar) < 0.01) return;
    for (let y = miny; y <= maxy; y++) for (let x = minx; x <= maxx; x++) {
      const w1 = ((x2 - x) * (y3 - y) - (x3 - x) * (y2 - y)) / ar;
      const w2 = ((x3 - x) * (y1 - y) - (x1 - x) * (y3 - y)) / ar;
      const w3 = 1 - w1 - w2;
      if (w1 >= -0.05 && w2 >= -0.05 && w3 >= -0.05) set(x, y, m);
    }
  };
  const TRIS = (x1, y1, x2, y2, x3, y3, m) => { TRI(x1, y1, x2, y2, x3, y3, m); TRI(2 * cx - x1, y1, 2 * cx - x2, y2, 2 * cx - x3, y3, m); };
  const LINE = (x0, y0, x1, y1, m, th = 1) => {
    const n = Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 2) + 1;
    for (let i = 0; i <= n; i++) { const t = i / n; E(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, th / 2, th / 2, m); }
  };
  const LINES = (x0, y0, x1, y1, m, th) => { LINE(x0, y0, x1, y1, m, th); LINE(2 * cx - x0, y0, 2 * cx - x1, y1, m, th); };

  const bw = 0.85 + R() * 0.35, hf = 0.88 + R() * 0.28;
  const earType = Math.floor(R() * 4), tailType = Math.floor(R() * 3), crest = R() < 0.4, mane = R() < 0.35, spots = R() < 0.35;
  const types = s.types;
  const has = t => types.includes(t);
  const st = s.stage;
  const big = st === '3' || st === 'P' || st === 'L' || st === 'M' || (st === '2' && !s.next);
  let eyeX = 3, eyeY = 15, eyeR = 1.4, single = false, mouthY = null;
  let headTop = 10, headCX = cx, headR = 5;
  let tailTip = null;
  const plan = s.plan;

  if (plan === 'biped') {
    const bodyRy = 6 * sc, bodyRx = 5.6 * sc * bw;
    const bodyCY = gy - 3.2 * sc - bodyRy;
    if (tailType > 0 || has('feu') || has('dragon')) {
      const tx = cx + bodyRx + 6 * sc, ty = bodyCY - 3 * sc;
      LINE(cx + bodyRx * 0.4, bodyCY + bodyRy * 0.5, tx, ty, 1, 2.4 * sc);
      tailTip = [tx, ty];
    }
    ES(3 * sc * bw, gy - 2.4 * sc, 2.2 * sc, 2.8 * sc, 1);
    E(cx, bodyCY, bodyRx, bodyRy, 1);
    E(cx, bodyCY + 1.4 * sc, bodyRx * 0.6, bodyRy * 0.66, 2);
    ES(bodyRx + 0.8 * sc, bodyCY - 0.8 * sc, 1.9 * sc, 3.6 * sc, 1);
    headR = 5.4 * sc * hf;
    const hcy = bodyCY - bodyRy * 0.8 - headR * 0.6;
    if (mane) E(cx, hcy + 1, headR * 1.35, headR * 1.15, 2);
    E(cx, hcy, headR * 1.05, headR, 1);
    headTop = hcy - headR; eyeY = hcy + 0.3 * sc; eyeX = headR * 0.42; eyeR = Math.max(1, 1.3 * sc);
    mouthY = hcy + headR * 0.55;
    if (has('combat')) { ES(bodyRx + 0.8 * sc, bodyCY + 1.2 * sc, 2 * sc, 0.8 * sc, 14); E(cx, headTop + 2 * sc, headR * 0.9, 0.8 * sc, 14); }
  } else if (plan === 'quad') {
    const bcy = gy - 6.6 * sc;
    if (tailType > 0) { const tx = cx + 9 * sc, ty = bcy - 7 * sc; LINE(cx + 5 * sc, bcy - 2 * sc, tx, ty, 1, (tailType === 2 ? 3.2 : 2) * sc); if (tailType === 2) E(tx, ty, 2.4 * sc, 2.4 * sc, 2); tailTip = [tx, ty]; }
    E(cx, bcy, 8.2 * sc * bw, 5.4 * sc, 1);
    ES(5.6 * sc * bw, gy - 2.2 * sc, 2.1 * sc, 2.6 * sc, 1);
    ES(2.3 * sc * bw, gy - 1.6 * sc, 2 * sc, 2.4 * sc, 1);
    headR = 5 * sc * hf;
    const hcy = bcy - 5.6 * sc;
    if (mane) E(cx, hcy + 1, headR * 1.45, headR * 1.25, 2);
    E(cx, hcy, headR * 1.12, headR, 1);
    E(cx, hcy + headR * 0.55, headR * 0.5, headR * 0.36, 2);
    headTop = hcy - headR; eyeY = hcy - 0.4 * sc; eyeX = headR * 0.48; eyeR = Math.max(1, 1.25 * sc);
    mouthY = hcy + headR * 0.75;
  } else if (plan === 'bird') {
    const bcy = gy - 7.4 * sc;
    ES(7.6 * sc, bcy - 1.5 * sc, 5.2 * sc, 2.8 * sc, 1);
    TRIS(cx - 7 * sc, bcy - 2 * sc, cx - 14 * sc, bcy - 6 * sc, cx - 12 * sc, bcy + 1 * sc, 1);
    TRIS(cx - 2 * sc, gy - 3 * sc, cx - 6 * sc, gy + 0.5, cx - 1 * sc, gy - 1, 2);
    E(cx, bcy, 5 * sc * bw, 6.6 * sc, 1);
    E(cx, bcy + 1.2 * sc, 3.5 * sc * bw, 4.6 * sc, 2);
    ES(2 * sc, gy - 0.6, 1.6 * sc, 1, 7);
    headR = 4.5 * sc * hf;
    const hcy = bcy - 7.4 * sc;
    E(cx, hcy, headR, headR * 0.95, 1);
    TRI(cx - 1.6 * sc, hcy + 1 * sc, cx + 1.6 * sc, hcy + 1 * sc, cx, hcy + 4 * sc, 7);
    if (crest) { TRI(cx - 1.5 * sc, hcy - headR + 1, cx + 1.5 * sc, hcy - headR + 1, cx + 1 * sc, hcy - headR - 5 * sc, 2); }
    headTop = hcy - headR; eyeY = hcy - 0.5 * sc; eyeX = headR * 0.45; eyeR = Math.max(1, 1.2 * sc);
  } else if (plan === 'fish') {
    const fcx = 21, fcy = N / 2 + 1;
    TRI(fcx + 9 * sc, fcy, fcx + 16 * sc, fcy - 7 * sc, fcx + 16 * sc, fcy + 7 * sc, 1);
    TRI(fcx - 3 * sc, fcy - 5 * sc, fcx + 5 * sc, fcy - 5 * sc, fcx + 3 * sc, fcy - 11 * sc, 2);
    E(fcx, fcy, 11 * sc, 7 * sc, 1);
    E(fcx + 1, fcy + 3 * sc, 9 * sc, 3.4 * sc, 2);
    E(fcx - 2 * sc, fcy + 2 * sc, 3 * sc, 1.6 * sc, 2);
    single = true; eyeX = 0; headCX = fcx - 6.5 * sc; eyeY = fcy - 1.5 * sc; eyeR = Math.max(1.1, 1.5 * sc); headTop = fcy - 7 * sc; headR = 6 * sc;
  } else if (plan === 'blob') {
    const bcy = gy - 8 * sc;
    ES(4 * sc, gy - 0.8, 2.2 * sc, 1.4 * sc, 1);
    E(cx, bcy, 8.4 * sc * bw, 8 * sc, 1);
    if (!spots) E(cx, bcy + 2.4 * sc, 5.2 * sc * bw, 4.8 * sc, 2);
    headR = 8 * sc; headTop = bcy - 8 * sc; eyeY = bcy - 1.6 * sc; eyeX = 3.2 * sc; eyeR = Math.max(1.1, 1.6 * sc);
    mouthY = bcy + 2.2 * sc;
    if (has('eau') && R2() < 0.6) { for (let i = 0; i < 5; i++) LINE(cx - 6 * sc + i * 3 * sc, bcy + 6 * sc, cx - 6 * sc + i * 3 * sc + (i % 2 ? 1 : -1), gy + 1, 2, 1.4); }
  } else if (plan === 'serpent') {
    E(cx, gy - 3 * sc, 9 * sc * bw, 3.3 * sc, 1);
    E(cx, gy - 2.4 * sc, 7 * sc * bw, 1.4 * sc, 2);
    E(cx - 1 * sc, gy - 8 * sc, 7 * sc * bw, 3 * sc, 1);
    E(cx - 1 * sc, gy - 7.6 * sc, 5 * sc * bw, 1.2 * sc, 2);
    E(cx + 1.5 * sc, gy - 13 * sc, 2.8 * sc, 4.4 * sc, 1);
    headR = 5 * sc * hf;
    const hcy = gy - 18.5 * sc;
    if (mane || has('ombre')) E(cx + 1 * sc, hcy + 1.5 * sc, 7.2 * sc, 5.6 * sc, 2);
    E(cx + 1 * sc, hcy, headR * 1.1, headR * 0.85, 1);
    headCX = cx + 1 * sc; headTop = hcy - headR * 0.85; eyeY = hcy - 0.5 * sc; eyeX = headR * 0.45; eyeR = Math.max(1, 1.2 * sc);
    mouthY = hcy + headR * 0.55;
  } else if (plan === 'bug') {
    if (has('vent') || has('lumiere') || big) { ES(7 * sc, gy - 14 * sc, 5.4 * sc, 7.4 * sc, 15); ES(6 * sc, gy - 7 * sc, 4 * sc, 4 * sc, 15); }
    for (let i = 0; i < 3; i++) LINES(cx - 3 * sc, gy - 4 * sc - i * 3 * sc, cx - 8 * sc, gy - 1 * sc - i * 3.2 * sc, 3, 1.2);
    E(cx, gy - 5 * sc, 5.6 * sc * bw, 4.6 * sc, 1);
    E(cx, gy - 4.4 * sc, 3.6 * sc * bw, 2.6 * sc, 2);
    E(cx, gy - 11 * sc, 4.6 * sc, 3.6 * sc, 1);
    headR = 4 * sc * hf;
    const hcy = gy - 16.5 * sc;
    LINES(cx - 1.4 * sc, hcy - headR + 1, cx - 5 * sc, hcy - headR - 5 * sc, 3, 1);
    ES(5 * sc, hcy - headR - 5 * sc, 1.1, 1.1, 2);
    E(cx, hcy, headR, headR * 0.9, 1);
    headTop = hcy - headR; eyeY = hcy; eyeX = headR * 0.5; eyeR = Math.max(1, 1.4 * sc);
  }
  const hy = headTop;
  // oreilles / cornes
  if (!single && plan !== 'bird') {
    const ex = headR * 0.6;
    if (earType === 1) TRIS(headCX - ex - 1.6 * sc, hy + 2, headCX - ex + 1.6 * sc, hy + 2, headCX - ex - 0.6 * sc, hy - 4.5 * sc, 1);
    else if (earType === 2) ES(ex, hy + 0.5, 2 * sc, 2 * sc, 1, true);
    else if (earType === 3) LINES(headCX - ex * 0.7, hy + 1, headCX - ex - 2 * sc, hy - 6 * sc, 1, 2.2 * sc);
  }
  if (has('dragon') || (big && R2() < 0.4)) { LINES(headCX - headR * 0.5, hy + 1.5, headCX - headR * 0.9, hy - 4 * sc, 3, 1.6 * sc); }
  if (has('dragon') && plan !== 'bird' && plan !== 'bug') ES(headR + 4 * sc, gy - 13 * sc, 4 * sc, 2.4 * sc, 2, true);
  // détails de type
  if (has('feu')) {
    const [fx, fy] = tailTip || [headCX, hy - 1];
    E(fx, fy - 1, 2.2 * sc, 3 * sc, 6); TRI(fx - 2 * sc, fy - 1, fx + 2 * sc, fy - 1, fx, fy - 6 * sc, 6); E(fx, fy, 1.1 * sc, 1.4 * sc, 9);
  }
  if (has('flore')) { LINE(headCX, hy + 1, headCX + 1, hy - 3 * sc, 8, 1); E(headCX + 2.5 * sc, hy - 3.6 * sc, 2.6 * sc, 1.5 * sc, 8); E(headCX - 2 * sc, hy - 2.6 * sc, 2 * sc, 1.2 * sc, 8); }
  if (has('foudre')) {
    const [tx, ty] = tailTip || [headCX + headR * 0.6, hy];
    LINE(tx, ty, tx + 3 * sc, ty - 3 * sc, 9, 1.6); LINE(tx + 3 * sc, ty - 3 * sc, tx + 0.5 * sc, ty - 5 * sc, 9, 1.6); LINE(tx + 0.5 * sc, ty - 5 * sc, tx + 4 * sc, ty - 8 * sc, 9, 1.8);
  }
  if (has('givre')) { for (let i = -1; i <= 1; i++) TRI(headCX + i * 3 * sc - 1.2 * sc, hy + 2, headCX + i * 3 * sc + 1.2 * sc, hy + 2, headCX + i * 3 * sc, hy - (i === 0 ? 5 : 3) * sc, 10); }
  if (has('esprit') && !single) { E(headCX, hy + headR * 0.45, 1.3 * sc, 1.3 * sc, 11); }
  if (has('acier')) { E(headCX, hy + 2.2 * sc, headR * 0.7, 1.2 * sc, 13); }
  if (has('roc')) { for (let i = 0; i < 4; i++) E(cx + (R2() - 0.5) * 12 * sc, gy - (4 + R2() * 8) * sc, 1.8 * sc, 1.3 * sc, 3); }
  if (has('toxine') || spots) { for (let i = 0; i < 5; i++) { const px = cx + (R2() - 0.5) * 10 * sc, py = gy - (3 + R2() * 9) * sc; if (g[Math.round(py) * N + Math.round(px)] === 1) E(px, py, 1.1 * sc, 1.1 * sc, 2); } }
  if (has('vent') && plan !== 'bird' && plan !== 'bug') ES(headR + 3 * sc, gy - 11 * sc, 4.4 * sc, 2.4 * sc, 15, true);
  if (has('lumiere')) {
    const hcx = headCX, hcy2 = hy - 3.2 * sc;
    for (let a = 0; a < 40; a++) { const t = a / 40 * Math.PI * 2; set(hcx + Math.cos(t) * 4.4 * sc, hcy2 + Math.sin(t) * 1.4 * sc, 12); }
  }
  if (has('ombre')) { for (let i = 0; i < 4; i++) TRI(cx - 8 * sc + i * 5 * sc, gy - 1, cx - 6 * sc + i * 5 * sc, gy - 1, cx - 7 * sc + i * 5 * sc, gy + 1.5, 1); }
  if (has('eau') && !single && plan !== 'blob') { TRIS(headCX - headR - 0.5, hy + headR, headCX - headR - 3.5 * sc, hy + headR - 2 * sc, headCX - headR - 0.5, hy + headR + 2.5 * sc, 2); }
  // yeux
  const eyes = single ? [headCX] : [headCX - eyeX, headCX + eyeX];
  const fierce = big || has('ombre') || has('combat');
  for (const exx of eyes) {
    const er = eyeR;
    E(exx, eyeY, er + (single ? 0.2 : 0), er + 0.3, 4);
    E(exx + (single ? -0.6 : 0), eyeY + 0.3, Math.max(0.6, er * 0.55), Math.max(0.8, er * 0.7), 5);
    set(exx - 0.4, eyeY - 0.5, 4);
    if (fierce && !single) {
      const dir = exx < headCX ? 1 : -1;
      LINE(exx - er * 1.2 * dir, eyeY - er - 1.2, exx + er * 1.1 * dir, eyeY - er - 0.2, 16, 1);
    }
  }
  if (mouthY != null && !single) { set(headCX - 1, mouthY, 16); set(headCX, mouthY + 0.5, 16); set(headCX + 1, mouthY, 16); }

  // couleurs
  let main = hex2rgb(TC[types[0]]);
  let [h0, s0, l0] = rgb2hsl(main);
  h0 += (R() - 0.5) * 34; s0 = Math.min(0.85, Math.max(0.25, s0 + (R() - 0.5) * 0.25)); l0 = Math.min(0.68, Math.max(0.36, l0 + (R() - 0.5) * 0.18 - (big ? 0.05 : 0)));
  if (shiny) h0 += 150;
  main = hsl2rgb([h0, s0, l0]);
  let sec;
  if (types[1]) { const [h1, s1, l1] = rgb2hsl(hex2rgb(TC[types[1]])); sec = hsl2rgb([h1 + (shiny ? 150 : 0) + (R() - 0.5) * 20, Math.min(0.85, s1), Math.min(0.72, Math.max(0.4, l1))]); }
  else sec = lighten(hsl2rgb([h0 + (R() - 0.5) * 40, s0 * 0.7, l0]), 0.45);
  const detail = R() < 0.5 ? [239, 230, 207] : [70, 62, 80];
  const colOf = m => m === 1 ? main : m === 2 ? sec : m === 3 ? detail : hex2rgb(MATS[m]);

  // recadrage vertical : poser au sol (sauf poissons)
  let minY = N, maxY = -1, minX = N, maxX = -1;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (g[y * N + x]) { if (y < minY) minY = y; if (y > maxY) maxY = y; if (x < minX) minX = x; if (x > maxX) maxX = x; }
  let shiftY = plan === 'fish' ? Math.round((N - 1 - maxY - minY) / 2) : (N - 2 - maxY);
  if (minY + shiftY < 1) shiftY = 1 - minY;
  const shiftX = Math.round((N - 1 - maxX - minX) / 2);
  const c = mkCanvas(N, N), x = c.getContext('2d');
  const img = x.createImageData(N, N);
  const at = (xx, yy) => (xx < 0 || yy < 0 || xx >= N || yy >= N) ? 0 : g[yy * N + xx];
  for (let y = 0; y < N; y++) for (let xx = 0; xx < N; xx++) {
    const sx = xx - shiftX, sy = y - shiftY;
    const m = at(sx, sy);
    let col = null;
    if (m) {
      col = colOf(m === 16 ? 5 : m);
      if (m === 16) col = darken(main, 0.7);
      else if (m !== 4 && m !== 5) {
        const ul = at(sx - 1, sy - 1), dr = at(sx + 1, sy + 1), up = at(sx, sy - 1);
        if (!ul || !up) col = lighten(col, 0.22);
        else if (!dr || !at(sx + 1, sy) || !at(sx, sy + 1)) col = darken(col, 0.22);
        if (m === 6) col = mixc(hex2rgb('#ff6a20'), hex2rgb('#ffe066'), Math.max(0, Math.min(1, 1 - (sy - minY) / 30)));
        if (m === 15) col = mixc(col, [255, 255, 255], 0.25);
      }
    } else {
      const nb = [at(sx - 1, sy), at(sx + 1, sy), at(sx, sy - 1), at(sx, sy + 1)].find(v => v);
      if (nb) col = darken(nb === 1 ? main : colOf(nb === 16 ? 1 : nb), 0.72);
    }
    if (col) { const i = (y * N + xx) * 4; img.data[i] = col[0]; img.data[i + 1] = col[1]; img.data[i + 2] = col[2]; img.data[i + 3] = 255; }
  }
  x.putImageData(img, 0, 0);
  MON_CACHE[key] = c;
  return c;
}
function monBack(sp, shiny) {
  const key = 'b:' + sp + (shiny ? '*' : '');
  if (MON_CACHE[key]) return MON_CACHE[key];
  const f = monSprite(sp, shiny), c = mkCanvas(f.width, f.height), x = c.getContext('2d');
  x.translate(f.width, 0); x.scale(-1, 1); x.drawImage(f, 0, 0);
  x.setTransform(1, 0, 0, 1, 0, 0);
  x.globalCompositeOperation = 'source-atop'; x.fillStyle = 'rgba(20,10,40,0.12)'; x.fillRect(0, 0, f.width, f.height);
  MON_CACHE[key] = c; return c;
}
const URL_CACHE = {};
function monURL(sp, shiny) {
  const k = sp + (shiny ? '*' : '');
  if (!URL_CACHE[k]) URL_CACHE[k] = monSprite(sp, shiny).toDataURL();
  return URL_CACHE[k];
}
function silhouetteURL(sp) {
  const k = 'sil:' + sp;
  if (URL_CACHE[k]) return URL_CACHE[k];
  const f = monSprite(sp, false), c = mkCanvas(f.width, f.height), x = c.getContext('2d');
  x.drawImage(f, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = '#3a4250'; x.fillRect(0, 0, c.width, c.height);
  return (URL_CACHE[k] = c.toDataURL());
}
function personURL(pal, scale = 1) {
  const k = 'p:' + JSON.stringify(pal);
  if (URL_CACHE[k]) return URL_CACHE[k];
  return (URL_CACHE[k] = personSprite(pal, 'down', 0).toDataURL());
}

// ---------- Décor de combat ----------
const BG_CACHE = {};
function battleBG(env, tod, reg) {
  const key = env + tod + reg;
  if (BG_CACHE[key]) return BG_CACHE[key];
  const c = mkCanvas(240, 160), x = c.getContext('2d');
  let sky1 = '#bfe6ff', sky2 = '#f4fbff', gr = '#a8dc8a', gr2 = '#8cc870', plat = '#7cbc5e';
  if (reg === 'brumaire') { sky1 = '#c8dde6'; sky2 = '#eef4f2'; gr = '#a6cfba'; gr2 = '#8cbca4'; plat = '#7aae94'; }
  if (reg === 'envers') { sky1 = '#2a1a2a'; sky2 = '#5a3a4a'; gr = '#5a6a52'; gr2 = '#4a5a44'; plat = '#6a3a44'; }
  if (reg === 'avant') { sky1 = '#7fd8ff'; sky2 = '#f0fcff'; gr = '#b2e884'; gr2 = '#9ad86a'; plat = '#f4e4b0'; }
  if (reg === 'cendre') { sky1 = '#5a5048'; sky2 = '#b8a890'; gr = '#7a7468'; gr2 = '#6a6458'; plat = '#5a5448'; }
  if (reg === 'neo') { sky1 = '#ffd8b0'; sky2 = '#e8fbff'; gr = '#9ae8c0'; gr2 = '#84d8ac'; plat = '#f0f4e8'; }
  if (reg === 'unae') { sky1 = '#f0c870'; sky2 = '#fff4d8'; gr = '#c8b860'; gr2 = '#b8a850'; plat = '#d8c888'; }
  if (env === 'cave') { sky1 = '#3a3029'; sky2 = '#5a4a3e'; gr = '#7a6754'; gr2 = '#6a5948'; plat = '#5a4a3c'; }
  if (env === 'water') { gr = '#6aaee8'; gr2 = '#4f96d6'; plat = '#8cc6f0'; }
  if (env === 'snow') { sky1 = '#d8e6f0'; sky2 = '#f6fbff'; gr = '#eef4f8'; gr2 = '#dde8f0'; plat = '#c8d8e4'; }
  if (env === 'indoor') { sky1 = '#d8cbb0'; sky2 = '#efe6d2'; gr = '#e0d0b0'; gr2 = '#cfbe9c'; plat = '#bca986'; }
  if (env === 'sacred') { sky1 = '#2a2450'; sky2 = '#6a5aa0'; gr = '#8a80b0'; gr2 = '#7a70a0'; plat = '#c9a845'; }
  if (env !== 'cave' && env !== 'indoor' && env !== 'sacred') {
    if (tod === 'night') { sky1 = '#1c2448'; sky2 = '#3a4a7a'; gr = rgb2hex(darken(hex2rgb(gr), 0.45)); gr2 = rgb2hex(darken(hex2rgb(gr2), 0.45)); plat = rgb2hex(darken(hex2rgb(plat), 0.4)); }
    else if (tod === 'evening') { sky1 = '#f0a070'; sky2 = '#ffe0b0'; }
  }
  const gd = x.createLinearGradient(0, 0, 0, 80); gd.addColorStop(0, sky1); gd.addColorStop(1, sky2);
  x.fillStyle = gd; x.fillRect(0, 0, 240, 80);
  if (tod === 'night' && env !== 'cave' && env !== 'indoor') { x.fillStyle = '#ffffff'; const r = rng(7); for (let i = 0; i < 30; i++) x.fillRect(Math.floor(r() * 240), Math.floor(r() * 60), 1, 1); }
  if (env === 'cave') { x.fillStyle = '#2a221d'; for (let i = 0; i < 12; i++) { const r = rng(i + 3); x.beginPath(); x.moveTo(i * 22, 0); x.lineTo(i * 22 + 10, 10 + r() * 25); x.lineTo(i * 22 + 20, 0); x.fill(); } }
  if (env === 'grass' || env === 'snow') { x.fillStyle = rgb2hex(darken(hex2rgb(gr2), 0.15)); for (let i = 0; i < 8; i++) { x.beginPath(); x.arc(i * 34 + 10, 80, 22, Math.PI, 0); x.fill(); } }
  x.fillStyle = gr; x.fillRect(0, 76, 240, 84);
  x.fillStyle = gr2; for (let y = 84; y < 160; y += 6) x.fillRect(0, y, 240, 2);
  const ell = (ex, ey, rx, ry, col, rim) => { x.fillStyle = rim; x.beginPath(); x.ellipse(ex, ey + 2, rx, ry, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.ellipse(ex, ey, rx, ry, 0, 0, Math.PI * 2); x.fill(); };
  ell(178, 66, 50, 11, plat, rgb2hex(darken(hex2rgb(plat), 0.25)));
  ell(62, 110, 56, 12, plat, rgb2hex(darken(hex2rgb(plat), 0.25)));
  BG_CACHE[key] = c; return c;
}

function drawSphere(x, cx, cy, r, open) {
  x.fillStyle = '#22202a'; x.beginPath(); x.arc(cx, cy, r + 1, 0, Math.PI * 2); x.fill();
  x.fillStyle = '#2a9d8f'; x.beginPath(); x.arc(cx, cy, r, Math.PI, 0); x.fill();
  x.fillStyle = '#f4f4f0'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI); x.fill();
  x.fillStyle = '#22202a'; x.fillRect(cx - r, cy - 0.5, r * 2, 1);
  x.fillStyle = '#f4f4f0'; x.beginPath(); x.arc(cx, cy, Math.max(1, r * 0.35), 0, Math.PI * 2); x.fill();
  x.fillStyle = '#8af0e0'; x.fillRect(cx - r * 0.5, cy - r * 0.7, 1, 1);
}
