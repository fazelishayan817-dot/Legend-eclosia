'use strict';
/* ============================================================
   ÉCLOSIA — portraits détaillés (visage, cheveux, buste)
   ============================================================ */
const PORTRAITS = {
  'Nova': { skin: '#e8b890', hair: '#2a5fd0', style: 'pony', eyes: '#3a8ae0', outfit: '#1f2f5a', outfit2: '#d8303a', band: '#1a1a22', collar: 'jacket', lashes: 1, expr: 'smirk', acc: ['headband', 'sportstripe', 'earring'] },
  'Épine': { skin: '#e2b088', hair: '#2a5fd0', style: 'wild', eyes: '#3a8ae0', outfit: '#3a2440', outfit2: '#6a2a3a', collar: 'coat', expr: 'stern', acc: ['scar'] },
  'Maître Ronce': { skin: '#c8a080', hair: '#e8e8f0', style: 'long', eyes: '#c43a3a', outfit: '#2a0f1a', outfit2: '#3a6a2a', collar: 'robe', expr: 'stern', age: 2, acc: ['thorncrown', 'stubble'] },
  'Prof. Sauge': { skin: '#f0c8a0', hair: '#cfcfcf', style: 'swept', eyes: '#5a7a4a', outfit: '#f4f4f0', outfit2: '#4a6a8a', collar: 'coat', expr: 'smile', age: 2, acc: ['glasses', 'beard'] },
  'Prof. Lierre': { skin: '#f2c9a0', hair: '#8a8a7a', style: 'short', eyes: '#6a5a3a', outfit: '#e8e2d0', outfit2: '#4a5a3a', collar: 'coat', expr: 'smile', age: 1, acc: ['glasses'] },
  'Nox': { skin: '#e8c8a8', hair: '#e8e8f8', style: 'swept', eyes: '#8a5cf0', outfit: '#3a1e5a', outfit2: '#d6a8ff', collar: 'coat', expr: 'smirk' },
  'Oniris': { skin: '#e8c0a0', hair: '#2a1a3a', style: 'long', eyes: '#b070e0', outfit: '#1a1424', outfit2: '#a35cc6', collar: 'robe', expr: 'sad', lashes: 1, acc: ['hood'] },
  'Létha': { skin: '#f2c9a0', hair: '#e0e0f0', style: 'bob', eyes: '#a35cc6', outfit: '#5a2a6a', outfit2: '#2a1a3a', collar: 'uniform', expr: 'stern', lashes: 1 },
  'Saline': { skin: '#f0c8a0', hair: '#e0e0f0', style: 'pony', eyes: '#6a4ac0', outfit: '#3b2f5c', outfit2: '#d6a8ff', collar: 'uniform', expr: 'smirk', lashes: 1 },
  'Astra': { skin: '#f2c9a0', hair: '#f2c46a', style: 'long', eyes: '#4ab0e0', outfit: '#ffffff', outfit2: '#2a3a8a', collar: 'uniform', expr: 'smile', lashes: 1, acc: ['circlet'] },
  'Maman': { skin: '#f2c9a0', hair: '#7a4a2a', style: 'bun', eyes: '#6a4a2a', outfit: '#e88aa8', outfit2: '#ffffff', collar: 'hoodie', expr: 'smile', lashes: 1, age: 1 },
  'Infirmière': { skin: '#f8d8b8', hair: '#f08aa8', style: 'bun', eyes: '#e05080', outfit: '#ffffff', outfit2: '#f08aa8', collar: 'uniform', expr: 'smile', lashes: 1, acc: ['nursecap'] },
  'Vendeur': { skin: '#e8b48a', hair: '#3a2a22', style: 'short', eyes: '#4a3a2a', outfit: '#2f6fb0', outfit2: '#ffffff', collar: 'jacket', expr: 'smile' },
  'Marin': { skin: '#e0b088', hair: '#3a2a22', style: 'short', eyes: '#3a6a9a', outfit: '#f4f4f4', outfit2: '#2f4f8f', collar: 'uniform', expr: 'smile', acc: ['cap', 'stubble'] },
  'Elio': { skin: '#f2c9a0', hair: '#f6e7a1', style: 'long', eyes: '#c9a845', outfit: '#ffffff', outfit2: '#c9a845', collar: 'robe', expr: 'smile', age: 2, acc: ['beard'] },
  'Néo': { skin: '#f6d0a8', hair: '#e06a2a', style: 'spiky', eyes: '#3a8a4a', outfit: '#3a3a48', outfit2: '#e06a2a', collar: 'hoodie', expr: 'smirk' },
  'Sylve': { skin: '#f2c9a0', hair: '#3a8a3a', style: 'long', eyes: '#3a9a4a', outfit: '#58b35a', outfit2: '#2a5a2a', collar: 'robe', expr: 'smile', lashes: 1, acc: ['flower'] },
  'Opaline': { skin: '#e0b088', hair: '#6a5a4a', style: 'bob', eyes: '#8a6a4a', outfit: '#a98557', outfit2: '#5a4a3a', collar: 'jacket', expr: 'neutral', lashes: 1 },
  'Volta': { skin: '#f6d0a8', hair: '#f2e14c', style: 'spiky', eyes: '#e9c43a', outfit: '#2b3a6b', outfit2: '#f2e14c', collar: 'jacket', expr: 'smirk', lashes: 1, acc: ['headband'] },
  'Ignis': { skin: '#c89070', hair: '#c0392b', style: 'wild', eyes: '#ee7b3a', outfit: '#3a1a1a', outfit2: '#ee7b3a', collar: 'jacket', expr: 'smirk' },
  'Mirage': { skin: '#e8c0a0', hair: '#e46aa8', style: 'long', eyes: '#e46aa8', outfit: '#3a2a4a', outfit2: '#e46aa8', collar: 'robe', expr: 'smirk', lashes: 1, acc: ['hood'] },
  'Bruma': { skin: '#f2dcc8', hair: '#d6f6ff', style: 'braid', eyes: '#5fb8d8', outfit: '#8fd8ea', outfit2: '#ffffff', collar: 'coat', expr: 'neutral', lashes: 1, acc: ['scarf'] },
  'Aldric': { skin: '#d8a880', hair: '#3a2a3a', style: 'swept', eyes: '#6a63db', outfit: '#3a3a6a', outfit2: '#6a63db', collar: 'coat', expr: 'stern', age: 1, acc: ['beard'] },
  'Gaspard': { skin: '#d8a880', hair: '#5a4a3a', style: 'short', eyes: '#5a5a6a', outfit: '#94a3ad', outfit2: '#4a4a5a', collar: 'jacket', expr: 'smile', acc: ['beard'] },
  'Gardienne Sigrid': { skin: '#f6e2d0', hair: '#eef8ff', style: 'braid', eyes: '#7fd8ec', outfit: '#cfe8f5', outfit2: '#4a7fa8', collar: 'coat', expr: 'stern', lashes: 1, acc: ['circlet'] },
  'Gardienne Céleste': { skin: '#f6d0a8', hair: '#7fb8ff', style: 'pony', eyes: '#7fb8ff', outfit: '#f4a6c8', outfit2: '#8a5cf0', collar: 'robe', expr: 'smile', lashes: 1, acc: ['ribbon'] },
  'Brune': { skin: '#c89070', hair: '#5a3a2a', style: 'short', eyes: '#c4553e', outfit: '#c4553e', outfit2: '#2a2a2a', collar: 'jacket', expr: 'stern', lashes: 1, acc: ['headband'] },
  'Gardien Aoki': { skin: '#f1c7a0', hair: '#1a1a1a', style: 'pony', eyes: '#f2a03a', outfit: '#e07a3a', outfit2: '#8a2f1e', collar: 'robe', expr: 'neutral' },
  'Gardienne Maëlle': { skin: '#f2c9a0', hair: '#5cb85c', style: 'long', eyes: '#5cb85c', outfit: '#f4f0dc', outfit2: '#3fa34d', collar: 'robe', expr: 'smile', lashes: 1, acc: ['flower'] },
  'Gardien Noa': { skin: '#c89070', hair: '#2a2a2a', style: 'wild', eyes: '#3cc0d0', outfit: '#3cc0d0', outfit2: '#f0dc9a', collar: 'hoodie', expr: 'smile' },
  'Gardien Tavi': { skin: '#b07850', hair: '#ff6a3a', style: 'spiky', eyes: '#ffd23a', outfit: '#3a1a1a', outfit2: '#ff6a3a', collar: 'jacket', expr: 'smirk' },
  'Corvin': { skin: '#e0c0a0', hair: '#1a1a22', style: 'swept', eyes: '#a35cc6', outfit: '#2a2238', outfit2: '#a35cc6', collar: 'coat', expr: 'smirk' },
  'Thalia': { skin: '#c89070', hair: '#c4553e', style: 'pony', eyes: '#c4553e', outfit: '#f4f4f0', outfit2: '#c4553e', collar: 'jacket', expr: 'smile', lashes: 1, acc: ['headband'] },
  'Orso': { skin: '#d8a880', hair: '#6a5a4a', style: 'bald', eyes: '#6a5a4a', outfit: '#a98557', outfit2: '#5a4a3a', collar: 'coat', expr: 'neutral', age: 1, acc: ['beard'] },
  'Pr Ysée': { skin: '#f1c7a0', hair: '#9a9aaa', style: 'bob', eyes: '#8a5cf0', outfit: '#f4f4f0', outfit2: '#4a5a3a', collar: 'coat', expr: 'smile', lashes: 1, age: 1, acc: ['glasses'] },
  'Infirmière Lila': { skin: '#f8d8b8', hair: '#f08aa8', style: 'bun', eyes: '#3fa34d', outfit: '#ffffff', outfit2: '#3fa34d', collar: 'uniform', expr: 'smile', lashes: 1, acc: ['nursecap'] },
  'Séléné': { skin: '#f6e2d0', hair: '#d0d0f0', style: 'long', eyes: '#8a8adf', outfit: '#2a2a5a', outfit2: '#d0d0f0', collar: 'robe', expr: 'sad', lashes: 1, acc: ['circlet'] },
};
Object.assign(PORTRAITS, {
  'Lame Bleue': { skin: '#e2b088', hair: '#2a5fd0', style: 'long', eyes: '#3a8ae0', outfit: '#5a1a2a', outfit2: '#3a6a2a', collar: 'uniform', lashes: 1, expr: 'stern', acc: ['scar', 'thorncrown'] },
  'Roi Ronce': { skin: '#c8a080', hair: '#f4f4fa', style: 'long', eyes: '#e04040', outfit: '#1a0a12', outfit2: '#c9a845', collar: 'robe', expr: 'sad', age: 2, acc: ['thorncrown', 'beard'] },
  'Général Nox': { skin: '#e0c0a0', hair: '#e8e8f8', style: 'swept', eyes: '#8a5cf0', outfit: '#2a1a3a', outfit2: '#c43a5a', collar: 'uniform', expr: 'sad', age: 1, acc: ['scar'] },
  'Aurèle': { skin: '#e0b088', hair: '#5a3a2a', style: 'swept', eyes: '#5a9a4a', outfit: '#5a8a4a', outfit2: '#f2e8c8', collar: 'jacket', expr: 'smile', acc: ['flower'] },
  'Liora': { skin: '#f2c9a0', hair: '#c8703a', style: 'long', eyes: '#3a7a9a', outfit: '#7ac0d0', outfit2: '#ffffff', collar: 'hoodie', expr: 'smile', lashes: 1, acc: ['freckles'] },
  'Elouan': { skin: '#f2c9a0', hair: '#c8703a', style: 'short', eyes: '#5a9a4a', outfit: '#e8c060', outfit2: '#4a6a3a', collar: 'hoodie', expr: 'smile', acc: ['freckles'] },
  'Petite Nova': { skin: '#e8b890', hair: '#2a5fd0', style: 'pony', eyes: '#3a8ae0', outfit: '#e8455e', outfit2: '#ffffff', collar: 'hoodie', expr: 'smile', lashes: 1 },
  'Petit Ilan': { skin: '#e8b890', hair: '#2a5fd0', style: 'wild', eyes: '#3a8ae0', outfit: '#3a5a8a', outfit2: '#ffffff', collar: 'hoodie', expr: 'smirk' },
  'Maren': { skin: '#e8b890', hair: '#2a5fd0', style: 'bun', eyes: '#3a8ae0', outfit: '#f0e0b0', outfit2: '#4a4a6a', collar: 'hoodie', expr: 'smile', lashes: 1, age: 1 },
  'Jeune Sauge': { skin: '#f0c8a0', hair: '#5a4a3a', style: 'swept', eyes: '#5a7a4a', outfit: '#f4f4f0', outfit2: '#4a6a8a', collar: 'coat', expr: 'neutral', acc: ['glasses'] },
  'Jeune Lierre': { skin: '#f2c9a0', hair: '#6a5a3a', style: 'short', eyes: '#6a5a3a', outfit: '#e8e2d0', outfit2: '#4a5a3a', collar: 'coat', expr: 'smirk', acc: ['glasses'] },
  'Ilan': { skin: '#e2b088', hair: '#2a5fd0', style: 'wild', eyes: '#3a8ae0', outfit: '#3a4a6a', outfit2: '#ffffff', collar: 'coat', expr: 'neutral', acc: ['scar'] },
});
PORTRAITS['Commandant Épine'] = PORTRAITS['Épine'];
PORTRAITS['Ronce'] = PORTRAITS['Maître Ronce']; PORTRAITS['Maître Ronce'] = PORTRAITS['Maître Ronce'];
PORTRAITS['Admin Saline'] = PORTRAITS['Saline']; PORTRAITS['Admin Létha'] = PORTRAITS['Létha'];
const FEM = new Set(['Anna', 'Skieuse Ilka', 'Pèlerine Aya', 'Surfeuse Lani', 'Mira', 'Pip', 'Nérée', 'Maïa', 'Ysée', 'Solveig', 'Aéla', 'Orane', 'Vesna', 'Rosalie', 'Kaede', 'Clarté', 'Clarisse', 'Fanny']);
function portraitSpec(name) {
  if (!name) return null;
  if (PORTRAITS[name]) return PORTRAITS[name];
  const base = name.replace(/^(Admin|Commandant|Maître|Gardienne|Gardien|Championne|Champion|Élite)\s+/, '');
  if (PORTRAITS[base]) return PORTRAITS[base];
  if (typeof VETS !== 'undefined') {
    const v = VETS.find(v => v.name === name || v.name === base);
    if (v) {
      const p = v.pal, acc = [];
      if (p.glasses) acc.push('glasses'); if (p.beard) acc.push('beard');
      return (PORTRAITS[name] = { skin: p.s, hair: p.h, style: p.style || 'short', eyes: TC[v.type] || '#4a4a6a', outfit: p.c, outfit2: p.p, collar: ['jacket', 'coat', 'robe', 'hoodie', 'uniform'][hashStr(v.id) % 5], expr: ['smile', 'smirk', 'neutral'][hashStr(v.id) % 3], lashes: FEM.has(v.name) ? 1 : 0, acc, age: p.beard ? 1 : 0 });
    }
  }
  if (typeof TOWN_NPCS !== 'undefined') {
    const n = TOWN_NPCS.find(n => n.name === name);
    if (n && PORTRAITS[n.name]) return PORTRAITS[n.name];
  }
  return null;
}
const PORTRAIT_CACHE = {};
function portraitCanvas(name, expr) {
  const spec = portraitSpec(name); if (!spec) return null;
  const key = name + '|' + (expr || '');
  if (PORTRAIT_CACHE[key]) return PORTRAIT_CACHE[key];
  const c = mkCanvas(256, 256), g = c.getContext('2d'); g.scale(2, 2); drawPortrait(g, expr ? Object.assign({}, spec, { expr }) : spec);
  return (PORTRAIT_CACHE[key] = c);
}
function portraitURL(name, expr) { const c = portraitCanvas(name, expr); if (!c) return null; if (!c._url) c._url = c.toDataURL(); return c._url; }
// Expression lue dans la réplique
function moodOf(t) {
  if (!t) return null; const s = String(t).toLowerCase();
  if (/pleur|larme|sanglot|en pleurant|yeux rouges/.test(s)) return 'cry';
  if (/tais-toi|je te hais|je le hais|traître|maudit|finis-en|comment as-tu|ne me touche pas|assez !|menteur|menteuse/.test(s)) return 'angry';
  if (/\?!|!\?|impossible|quoi \?|hein \?|c'est toi \?|qu'est-ce que|comment c'est possible/.test(s)) return 'surprised';
  if (/je t'aime|embrass|rougi|mon cœur|reste près|blottit|baiser|ta main|tes bras|avec toi\b/.test(s)) return 'tender';
  if (/haha|ha !|hihi|je rigole|je plaisante|ne te moque|c'est gênant/.test(s)) return 'laugh';
  if (/désolé|pardon|me manque|perdu|mort|enterr|adieu|seule?\b|vide/.test(s)) return 'sad';
  if (/merci|bravo|bien joué|content|heureu|génial|super|enfin/.test(s)) return 'smile';
  return null;
}

function drawPortrait(g, P) {
  const L = (h, t) => lhex(h, t), D = (h, t) => dhex(h, t);
  const acc = P.acc || [], has = a => acc.includes(a);
  const st = P.style || 'short', age = P.age || 0;
  const path = (pts, close = true) => { g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) { const p = pts[i]; if (p.length === 4) g.quadraticCurveTo(p[0], p[1], p[2], p[3]); else g.lineTo(p[0], p[1]); } if (close) g.closePath(); };
  const lg = (y0, y1, a, b) => { const gr = g.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, a); gr.addColorStop(1, b); return gr; };
  const ink = '#2a1e22';
  g.lineJoin = 'round'; g.lineCap = 'round';
  // ---- cheveux arrière ----
  const hairG = lg(18, 120, L(P.hair, 0.12), D(P.hair, 0.28));
  g.fillStyle = hairG;
  if (has('hood')) { g.fillStyle = lg(10, 120, L(P.outfit2 || P.outfit, 0.1), D(P.outfit, 0.3)); path([[22, 128], [26, 54], [64, 8, 102, 54], [106, 128]]); g.fill(); g.fillStyle = hairG; }
  if (st === 'long') { path([[30, 112], [28, 60], [32, 22, 64, 20], [96, 22, 100, 60], [98, 112], [64, 118, 30, 112]]); g.fill(); }
  if (st === 'bob') { path([[33, 88], [30, 52], [34, 22, 64, 21], [94, 22, 98, 52], [95, 88], [64, 92, 33, 88]]); g.fill(); }
  if (st === 'pony') { path([[84, 30], [104, 40, 104, 70], [108, 96, 96, 108], [98, 80, 90, 56]]); g.fill(); }
  if (st === 'braid') { for (let i = 0; i < 6; i++) { g.beginPath(); g.ellipse(88 + i * 1.5, 70 + i * 9, 6, 5.5, 0.3, 0, 7); g.fill(); g.strokeStyle = D(P.hair, 0.35); g.lineWidth = 1; g.stroke(); } }
  if (st === 'bun') { g.beginPath(); g.arc(64, 18, 12, 0, 7); g.fill(); g.strokeStyle = D(P.hair, 0.3); g.lineWidth = 1.2; g.beginPath(); g.arc(64, 18, 7, 0.4, 2.6); g.stroke(); }
  if (st === 'wild') { path([[30, 70], [22, 40], [34, 44], [32, 18], [48, 28], [56, 8], [66, 24], [80, 8], [84, 28], [100, 18], [96, 42], [108, 40], [98, 72]]); g.fill(); }
  // ---- buste ----
  const oc = P.outfit;
  g.fillStyle = lg(92, 128, L(oc, 0.08), D(oc, 0.22));
  path([[8, 128], [14, 108, 40, 100], [56, 94], [72, 94], [88, 100], [114, 108, 120, 128]]); g.fill();
  g.fillStyle = 'rgba(0,0,0,.14)'; path([[64, 96], [88, 100], [114, 108, 120, 128], [70, 128]]); g.fill();
  g.strokeStyle = D(oc, 0.45); g.lineWidth = 1.4; path([[8, 128], [14, 108, 40, 100], [56, 94]], false); g.stroke(); path([[72, 94], [88, 100], [114, 108, 120, 128]], false); g.stroke();
  const o2 = P.outfit2 || D(oc, 0.3);
  // cou
  g.fillStyle = lg(76, 100, D(P.skin, 0.06), D(P.skin, 0.22)); path([[54, 76], [74, 76], [75, 99], [64, 104], [53, 99]]); g.fill();
  g.fillStyle = 'rgba(80,40,30,.22)'; g.beginPath(); g.ellipse(64, 82, 12, 5, 0, 0, 7); g.fill();
  // cols
  if (P.collar === 'jacket') { g.fillStyle = o2; path([[52, 96], [64, 116], [48, 128], [36, 104]]); g.fill(); path([[76, 96], [64, 116], [80, 128], [92, 104]]); g.fill(); g.fillStyle = L(o2, 0.25); path([[52, 96], [58, 104], [44, 108]]); g.fill(); g.strokeStyle = D(o2, 0.4); g.lineWidth = 1; path([[52, 96], [64, 116], [76, 96]], false); g.stroke(); }
  if (has('sportstripe')) { g.fillStyle = '#f4f4f0'; path([[14, 116], [52, 106], [54, 111], [16, 121]]); g.fill(); path([[114, 116], [76, 106], [74, 111], [112, 121]]); g.fill(); g.fillStyle = P.outfit2; path([[16, 121], [54, 111], [55, 115], [17, 125]]); g.fill(); path([[112, 121], [74, 111], [73, 115], [111, 125]]); g.fill(); g.fillStyle = '#9aa0aa'; for (let i = 0; i < 3; i++) g.fillRect(58, 108 + i * 6, 12, 2.4); g.strokeStyle = '#d8d8d8'; g.lineWidth = 1.2; path([[64, 104], [64, 128]], false); g.stroke(); }
  else if (P.collar === 'coat') { g.fillStyle = D(oc, 0.12); path([[50, 94], [62, 128], [30, 128], [34, 104]]); g.fill(); path([[78, 94], [66, 128], [98, 128], [94, 104]]); g.fill(); g.fillStyle = o2; path([[58, 100], [64, 112], [70, 100], [64, 98]]); g.fill(); g.strokeStyle = D(oc, 0.5); g.lineWidth = 1.2; path([[50, 94], [62, 128]], false); g.stroke(); path([[78, 94], [66, 128]], false); g.stroke(); }
  else if (P.collar === 'robe') { g.fillStyle = o2; path([[46, 98], [64, 108], [82, 98], [80, 92], [64, 100], [48, 92]]); g.fill(); g.strokeStyle = L(o2, 0.3); g.lineWidth = 1; path([[64, 108], [64, 128]], false); g.stroke(); for (let i = 0; i < 5; i++) { g.fillStyle = L(o2, 0.2); g.beginPath(); g.arc(30 + i * 17, 120, 1.6, 0, 7); g.fill(); } }
  else if (P.collar === 'hoodie') { g.fillStyle = D(oc, 0.15); path([[38, 100], [64, 112], [90, 100], [86, 92], [64, 104], [42, 92]]); g.fill(); g.strokeStyle = o2; g.lineWidth = 1.6; path([[58, 106], [57, 120]], false); g.stroke(); path([[70, 106], [71, 120]], false); g.stroke(); }
  else if (P.collar === 'uniform') { g.fillStyle = o2; g.fillRect(14, 112, 100, 4); path([[54, 95], [64, 104], [74, 95], [72, 92], [64, 99], [56, 92]]); g.fill(); g.fillStyle = '#f2c14e'; g.beginPath(); g.arc(40, 108, 2.4, 0, 7); g.fill(); g.beginPath(); g.arc(88, 108, 2.4, 0, 7); g.fill(); }
  if (has('scarf')) { g.fillStyle = o2; path([[46, 92], [64, 100], [82, 92], [84, 100], [64, 108], [44, 100]]); g.fill(); path([[70, 104], [78, 124], [70, 126], [64, 106]]); g.fill(); g.strokeStyle = D(o2, 0.35); g.lineWidth = 1; path([[46, 96], [64, 104], [82, 96]], false); g.stroke(); }
  // ---- oreilles ----
  for (const s of [-1, 1]) { g.fillStyle = P.skin; g.beginPath(); g.ellipse(64 + s * 25, 58, 4.5, 7, s * 0.2, 0, 7); g.fill(); g.fillStyle = D(P.skin, 0.18); g.beginPath(); g.ellipse(64 + s * 25.5, 59, 2, 4, s * 0.2, 0, 7); g.fill(); }
  if (has('earring')) { g.fillStyle = '#f2c14e'; g.beginPath(); g.arc(39, 67, 2, 0, 7); g.fill(); g.beginPath(); g.arc(89, 67, 2, 0, 7); g.fill(); }
  // ---- visage ----
  const face = () => path([[40, 50], [40, 24, 64, 22], [88, 24, 88, 50], [88, 68, 78, 80], [70, 89, 64, 89], [58, 89, 50, 80], [40, 68, 40, 50]]);
  const fg = g.createRadialGradient(56, 48, 4, 64, 58, 40); fg.addColorStop(0, L(P.skin, 0.12)); fg.addColorStop(0.7, P.skin); fg.addColorStop(1, D(P.skin, 0.14));
  g.fillStyle = fg; face(); g.fill();
  g.save(); face(); g.clip(); g.fillStyle = 'rgba(90,40,30,.10)'; g.fillRect(76, 20, 20, 80); g.fillStyle = 'rgba(90,40,30,.08)'; g.beginPath(); g.ellipse(64, 92, 24, 8, 0, 0, 7); g.fill(); g.restore();
  g.strokeStyle = D(P.skin, 0.38); g.lineWidth = 1.1; face(); g.stroke();
  // joues
  g.fillStyle = 'rgba(240,110,110,.20)'; g.beginPath(); g.ellipse(49, 70, 6, 3.2, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(79, 70, 6, 3.2, 0, 0, 7); g.fill();
  if (has('freckles')) { g.fillStyle = D(P.skin, 0.3); for (let i = 0; i < 6; i++) { g.beginPath(); g.arc(46 + (i % 3) * 3, 67 + (i >> 1) % 2 * 2, .7, 0, 7); g.fill(); g.beginPath(); g.arc(76 + (i % 3) * 3, 67 + (i >> 1) % 2 * 2, .7, 0, 7); g.fill(); } }
  // barbe
  if (has('beard') || has('stubble')) { g.fillStyle = has('beard') ? D(P.hair, 0.05) : 'rgba(60,40,40,.18)'; path([[42, 66], [50, 82, 64, 90], [78, 82, 86, 66], [80, 78, 72, 80], [64, 78], [56, 80, 48, 78]]); g.fill(); if (has('beard')) { g.fillStyle = D(P.hair, 0.05); path([[48, 82], [64, 98], [80, 82], [64, 90]]); g.fill(); g.strokeStyle = L(P.hair, 0.2); g.lineWidth = .8; for (let i = 0; i < 5; i++) { path([[52 + i * 6, 84], [53 + i * 6, 92]], false); g.stroke(); } } }
  // ---- yeux ----
  const ex = P.expr || 'neutral';
  for (const [cx, s] of [[52, -1], [76, 1]]) {
    const cy = 60;
    if (ex === 'laugh' || ex === 'tender') {
      g.strokeStyle = ink; g.lineWidth = 2.1; g.beginPath();
      if (ex === 'laugh') { g.moveTo(cx - 6, cy + 1.5); g.quadraticCurveTo(cx, cy - 5, cx + 6, cy + 1.5); }
      else { g.moveTo(cx - 6, cy - 0.5); g.quadraticCurveTo(cx, cy + 3.5, cx + 6, cy - 0.5); }
      g.stroke();
      if (P.lashes) { g.lineWidth = 1.1; g.beginPath(); g.moveTo(cx + s * 6, cy + (ex === 'laugh' ? 1.5 : -0.5)); g.lineTo(cx + s * 8, cy + (ex === 'laugh' ? 0 : -2)); g.stroke(); }
      g.strokeStyle = D(P.hair, 0.25); g.lineWidth = 2.3; g.beginPath(); g.moveTo(cx - s * 6.5, cy - 9); g.quadraticCurveTo(cx, cy - 12.5, cx + s * 7, cy - 10); g.stroke();
      continue;
    }
    const wy = ex === 'surprised' ? 5.8 : ex === 'angry' ? 3.6 : 4.3, ir = ex === 'surprised' ? 3.3 : 4.1;
    g.fillStyle = '#fdfbf6'; g.beginPath(); g.ellipse(cx, cy, 6.6, wy, 0, 0, 7); g.fill();
    const ig = g.createRadialGradient(cx - 1, cy - 1, .5, cx, cy, 4.4); ig.addColorStop(0, L(P.eyes, 0.45)); ig.addColorStop(0.6, P.eyes); ig.addColorStop(1, D(P.eyes, 0.45));
    g.fillStyle = ig; g.beginPath(); g.arc(cx + s * 0.4, cy + 0.3, ir, 0, 7); g.fill();
    g.fillStyle = '#140c14'; g.beginPath(); g.arc(cx + s * 0.4, cy + 0.4, 1.8, 0, 7); g.fill();
    g.fillStyle = '#ffffff'; g.beginPath(); g.arc(cx - 1.4 + s * 0.4, cy - 1.4, 1.2, 0, 7); g.fill(); g.beginPath(); g.arc(cx + 1.5 + s * 0.4, cy + 1.4, 0.6, 0, 7); g.fill();
    // paupières
    if (ex === 'cry' || ex === 'sad') { g.fillStyle = 'rgba(255,255,255,.55)'; g.beginPath(); g.ellipse(cx, cy + 2.8, 4.6, 1.1, 0, 0, 7); g.fill(); }
    if (ex === 'stern' || ex === 'angry' || age >= 2) { g.fillStyle = D(P.skin, 0.05); path([[cx - 7.5, cy - 4.5], [cx + 7.5, cy - 4.5 + s * 0], [cx + 7, cy - 1.2], [cx, cy - 2.2, cx - 7, cy - 1.2]]); g.fill(); }
    g.strokeStyle = ink; g.lineWidth = 1.9; g.beginPath(); g.moveTo(cx - 7, cy + (ex === 'stern' || ex === 'angry' ? -1 : 0.2)); g.quadraticCurveTo(cx, cy - (ex === 'stern' || ex === 'angry' ? 3.4 : ex === 'surprised' ? 7.4 : 5.4), cx + 7, cy + (ex === 'stern' || ex === 'angry' ? -1 : 0.2)); g.stroke();
    if (P.lashes) { g.lineWidth = 1.2; g.beginPath(); g.moveTo(cx + s * 6.6, cy - 0.5); g.lineTo(cx + s * 8.6, cy - 2.6); g.moveTo(cx + s * 5.2, cy - 2.4); g.lineTo(cx + s * 6.8, cy - 4.6); g.stroke(); }
    g.strokeStyle = D(P.skin, 0.32); g.lineWidth = 0.8; g.beginPath(); g.moveTo(cx - 5, cy + 3.6); g.quadraticCurveTo(cx, cy + 5, cx + 5, cy + 3.6); g.stroke();
    if (age >= 1) { g.strokeStyle = D(P.skin, 0.28); g.lineWidth = .7; g.beginPath(); g.moveTo(cx + s * 8, cy + 1); g.lineTo(cx + s * 10.5, cy + 2.5); g.moveTo(cx + s * 8, cy + 3); g.lineTo(cx + s * 10, cy + 5); g.stroke(); }
    // sourcils
    const bIn = ex === 'angry' ? 5.5 : ex === 'stern' ? 3 : ex === 'sad' || ex === 'cry' ? -3 : 0, bUp = (ex === 'smirk' && s > 0) ? -2 : ex === 'surprised' ? -3.5 : 0;
    g.strokeStyle = D(P.hair, 0.25); g.lineWidth = 2.3; g.beginPath(); g.moveTo(cx - s * 6.5, cy - 8 + bIn + bUp); g.quadraticCurveTo(cx, cy - 11 + bUp, cx + s * 7, cy - 9 + bUp); g.stroke();
  }
  // nez
  g.strokeStyle = D(P.skin, 0.32); g.lineWidth = 1.1; g.beginPath(); g.moveTo(66, 60); g.quadraticCurveTo(68, 68, 64, 71); g.stroke();
  g.fillStyle = D(P.skin, 0.25); g.beginPath(); g.ellipse(61.5, 71, 1.2, .7, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(66.5, 71, 1.2, .7, 0, 0, 7); g.fill();
  g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.ellipse(63, 64, 0.9, 2.8, 0, 0, 7); g.fill();
  // bouche
  const lip = D('#d88a7a', 0.05);
  g.strokeStyle = D(P.skin, 0.55); g.lineWidth = 1.5; g.beginPath();
  if (ex === 'smile') { g.moveTo(57, 77); g.quadraticCurveTo(64, 82.5, 71, 77); g.stroke(); g.fillStyle = 'rgba(255,255,255,.75)'; g.beginPath(); g.moveTo(58.5, 77.6); g.quadraticCurveTo(64, 80.6, 69.5, 77.6); g.closePath(); g.fill(); }
  else if (ex === 'smirk') { g.moveTo(58, 79); g.quadraticCurveTo(65, 80, 71, 76); g.stroke(); }
  else if (ex === 'sad') { g.moveTo(58, 80); g.quadraticCurveTo(64, 77, 70, 80); g.stroke(); }
  else if (ex === 'cry') { g.moveTo(57, 81); g.quadraticCurveTo(60, 77.5, 64, 79); g.quadraticCurveTo(68, 77.5, 71, 81); g.stroke(); }
  else if (ex === 'angry') { g.stroke(); g.fillStyle = '#5a2a2a'; g.beginPath(); g.roundRect(57, 76.5, 14, 5, 2); g.fill(); g.fillStyle = '#fff'; g.fillRect(58.5, 77.2, 11, 1.8); g.strokeStyle = D(P.skin, 0.55); g.lineWidth = 1.2; g.beginPath(); g.roundRect(57, 76.5, 14, 5, 2); g.stroke(); }
  else if (ex === 'surprised') { g.stroke(); g.fillStyle = '#5a2a2a'; g.beginPath(); g.ellipse(64, 79, 3.2, 4, 0, 0, 7); g.fill(); }
  else if (ex === 'laugh') { g.stroke(); g.fillStyle = '#6a2a2a'; g.beginPath(); g.moveTo(56, 76); g.quadraticCurveTo(64, 88, 72, 76); g.closePath(); g.fill(); g.fillStyle = '#e88a9a'; g.beginPath(); g.ellipse(64, 82, 4, 2.2, 0, 0, 7); g.fill(); g.fillStyle = '#fff'; g.fillRect(58, 76, 12, 1.6); }
  else if (ex === 'tender') { g.moveTo(58, 77.5); g.quadraticCurveTo(64, 81, 70, 77.5); g.stroke(); }
  else if (ex === 'stern') { g.moveTo(58, 79); g.lineTo(70, 79); g.stroke(); }
  else { g.moveTo(58, 78.5); g.quadraticCurveTo(64, 80, 70, 78.5); g.stroke(); }
  if (ex === 'cry') { for (const [tx, s] of [[48, -1], [80, 1]]) { const tg = g.createLinearGradient(0, 63, 0, 92); tg.addColorStop(0, 'rgba(150,210,255,.95)'); tg.addColorStop(1, 'rgba(150,210,255,0)'); g.fillStyle = tg; g.beginPath(); g.moveTo(tx - 1.6, 63); g.quadraticCurveTo(tx + s * 1.5, 78, tx + s * 1, 92); g.lineTo(tx + s * 3, 92); g.quadraticCurveTo(tx + s * 3, 76, tx + 1.6, 63); g.fill(); g.fillStyle = 'rgba(200,235,255,.95)'; g.beginPath(); g.ellipse(tx + s * 2, 84, 1.6, 2.2, 0, 0, 7); g.fill(); } }
  if (ex === 'tender' || ex === 'laugh' || ex === 'surprised') { g.fillStyle = `rgba(240,90,110,${ex === 'tender' ? 0.38 : 0.22})`; g.beginPath(); g.ellipse(48, 70, 7, 3.6, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(80, 70, 7, 3.6, 0, 0, 7); g.fill(); if (ex === 'tender') { g.strokeStyle = 'rgba(200,60,80,.4)'; g.lineWidth = .8; for (const bx of [44, 48, 52, 76, 80, 84]) { g.beginPath(); g.moveTo(bx, 72); g.lineTo(bx + 1.5, 69); g.stroke(); } } }
  if (ex === 'angry') { g.strokeStyle = 'rgba(200,40,40,.7)'; g.lineWidth = 1.4; for (const [a, b] of [[94, 30], [100, 34]]) { g.beginPath(); g.moveTo(a - 3, b); g.lineTo(a + 3, b); g.moveTo(a, b - 3); g.lineTo(a, b + 3); g.stroke(); } }
  g.fillStyle = lip; g.globalAlpha = 0.35; g.beginPath(); g.ellipse(64, 81.5, 4.2, 1.3, 0, 0, 7); g.fill(); g.globalAlpha = 1;
  if (age >= 1) { g.strokeStyle = D(P.skin, 0.25); g.lineWidth = .8; g.beginPath(); g.moveTo(56, 70); g.quadraticCurveTo(53, 76, 55, 80); g.moveTo(72, 70); g.quadraticCurveTo(75, 76, 73, 80); g.stroke(); }
  if (age >= 2) { g.beginPath(); g.moveTo(54, 40); g.lineTo(74, 40); g.moveTo(56, 44); g.lineTo(72, 44); g.stroke(); }
  if (has('scar')) { g.strokeStyle = 'rgba(150,60,60,.65)'; g.lineWidth = 1.4; g.beginPath(); g.moveTo(79, 52); g.lineTo(84, 70); g.stroke(); g.lineWidth = .8; for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(79 + i * 1.6, 56 + i * 5); g.lineTo(83 + i * 1.6, 55 + i * 5); g.stroke(); } }
  // ---- cheveux avant ----
  g.fillStyle = hairG;
  const fringe = (tips, spiky) => {
    g.beginPath(); g.moveTo(37, 56); g.quadraticCurveTo(34, 18, 64, 15); g.quadraticCurveTo(94, 18, 91, 56);
    for (let i = tips.length - 1; i >= 0; i--) { const [x, y] = tips[i], px = i < tips.length - 1 ? tips[i + 1][0] : 91; g.quadraticCurveTo((x + px) / 2 + (spiky ? 3 : 0), y - (spiky ? 12 : 8), x, y); }
    g.quadraticCurveTo(38, 44, 37, 56); g.fill();
  };
  if (st === 'bald') {
    g.fillStyle = lg(14, 40, L(P.skin, 0.1), P.skin); path([[40, 48], [40, 22, 64, 20], [88, 22, 88, 48]]); g.fill();
    g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.ellipse(56, 28, 8, 3, -0.3, 0, 7); g.fill();
    g.fillStyle = hairG; path([[38, 58], [38, 44], [43, 46], [42, 60]]); g.fill(); path([[90, 58], [90, 44], [85, 46], [86, 60]]); g.fill();
  } else if (st === 'swept') {
    path([[37, 58], [32, 16, 66, 14], [98, 16, 92, 52], [88, 36, 72, 34], [56, 34, 46, 46], [42, 52, 37, 58]]); g.fill();
    path([[60, 16], [40, 30, 44, 48], [52, 34, 70, 30]]); g.fill();
  } else if (st === 'spiky' || st === 'wild') {
    fringe([[40, 50], [46, 40], [52, 50], [58, 38], [64, 48], [70, 38], [76, 50], [82, 40], [88, 50]], true);
    path([[40, 26], [30, 8], [52, 18]]); g.fill(); path([[60, 16], [64, 0], [72, 16]]); g.fill(); path([[80, 20], [100, 8], [90, 30]]); g.fill();
  } else {
    const tips = st === 'short' ? [[40, 46], [47, 40], [54, 45], [61, 38], [68, 44], [75, 38], [82, 44], [88, 46]] : [[40, 52], [46, 44], [53, 50], [60, 40], [66, 47], [73, 40], [80, 48], [87, 52]];
    fringe(tips, false);
    if (st === 'long' || st === 'bob' || st === 'braid') { path([[37, 50], [33, 72, 36, 96], [40, 88], [41, 64]]); g.fill(); path([[91, 50], [95, 72, 92, 96], [88, 88], [87, 64]]); g.fill(); }
  }
  // reflets et mèches
  if (st !== 'bald') {
    g.strokeStyle = L(P.hair, 0.4); g.lineWidth = 2.2; g.globalAlpha = 0.7; g.beginPath(); g.moveTo(46, 26); g.quadraticCurveTo(58, 18, 74, 22); g.stroke();
    g.lineWidth = 1; g.beginPath(); g.moveTo(50, 30); g.quadraticCurveTo(60, 24, 70, 27); g.stroke(); g.globalAlpha = 1;
    g.strokeStyle = D(P.hair, 0.4); g.lineWidth = .8; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(44 + i * 8, 22 + (i % 2) * 2); g.quadraticCurveTo(46 + i * 8, 34, 44 + i * 8 + (i < 3 ? -2 : 2), 42); g.stroke(); }
  }
  // ---- accessoires ----
  if (has('glasses')) { g.strokeStyle = '#2a2a3a'; g.lineWidth = 1.3; g.beginPath(); g.ellipse(52, 61, 8.5, 6.5, 0, 0, 7); g.stroke(); g.beginPath(); g.ellipse(76, 61, 8.5, 6.5, 0, 0, 7); g.stroke(); g.beginPath(); g.moveTo(60.5, 60); g.lineTo(67.5, 60); g.stroke(); g.fillStyle = 'rgba(200,230,255,.18)'; g.beginPath(); g.ellipse(52, 61, 8, 6, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(76, 61, 8, 6, 0, 0, 7); g.fill(); }
  if (has('headband')) { g.fillStyle = P.band || P.outfit2 || '#c4553e'; path([[37, 40], [64, 32], [91, 40], [91, 45], [64, 37], [37, 45]]); g.fill(); path([[90, 42], [102, 50], [98, 54], [88, 46]]); g.fill(); }
  if (has('circlet')) { g.strokeStyle = '#f2c14e'; g.lineWidth = 1.6; g.beginPath(); g.moveTo(38, 40); g.quadraticCurveTo(64, 30, 90, 40); g.stroke(); g.fillStyle = P.eyes; g.beginPath(); g.arc(64, 34, 2.4, 0, 7); g.fill(); }
  if (has('flower')) { for (let i = 0; i < 5; i++) { const a = i / 5 * 6.283; g.fillStyle = '#ff8fb5'; g.beginPath(); g.ellipse(84 + Math.cos(a) * 4, 30 + Math.sin(a) * 4, 3, 2, a, 0, 7); g.fill(); } g.fillStyle = '#ffe066'; g.beginPath(); g.arc(84, 30, 2, 0, 7); g.fill(); }
  if (has('ribbon')) { g.fillStyle = '#8a5cf0'; path([[86, 28], [98, 20], [98, 36]]); g.fill(); path([[86, 28], [76, 18], [78, 34]]); g.fill(); g.beginPath(); g.arc(86, 28, 2.5, 0, 7); g.fill(); }
  if (has('cap')) { g.fillStyle = P.outfit2 || '#2f4f8f'; path([[36, 40], [38, 14, 64, 12], [90, 14, 92, 40]]); g.fill(); g.fillStyle = D(P.outfit2 || '#2f4f8f', 0.25); path([[34, 40], [64, 34], [96, 40], [96, 44], [64, 40], [34, 44]]); g.fill(); g.fillStyle = '#ffffff'; g.beginPath(); g.arc(64, 26, 3.5, 0, 7); g.fill(); }
  if (has('nursecap')) { g.fillStyle = '#ffffff'; path([[46, 24], [64, 14], [82, 24], [80, 32], [48, 32]]); g.fill(); g.fillStyle = '#e05080'; g.fillRect(62, 18, 4, 10); g.fillRect(59, 21, 10, 4); }
  if (has('thorncrown')) { g.strokeStyle = '#3a6a2a'; g.lineWidth = 2.2; g.beginPath(); g.moveTo(38, 38); g.quadraticCurveTo(64, 26, 90, 38); g.stroke(); g.fillStyle = '#5a8a3a'; for (let i = 0; i < 8; i++) { const x = 40 + i * 7, y = 36 - Math.sin(i / 7 * Math.PI) * 6; path([[x - 1.5, y], [x + 1.5, y], [x + (i % 2 ? 3 : -3), y - 6]]); g.fill(); } g.fillStyle = '#c43a5a'; g.beginPath(); g.arc(64, 30, 2, 0, 7); g.fill(); }
  if (has('hood')) { g.strokeStyle = D(P.outfit, 0.4); g.lineWidth = 3; g.beginPath(); g.moveTo(30, 100); g.quadraticCurveTo(26, 30, 64, 12); g.quadraticCurveTo(102, 30, 98, 100); g.stroke(); g.fillStyle = '#ffd060'; for (let i = 0; i < 6; i++) { g.beginPath(); g.arc(34 + (i % 2) * 58, 40 + i * 10, 1.2, 0, 7); g.fill(); } }
}
function hidePortrait() { document.querySelectorAll('.portrait').forEach(e => e.remove()); }
function showPortrait(name, text) {
  hidePortrait();
  if (!name) return;
  if (STORY && STORY.who === name && ['nova', 'epine', 'nox', 'oniris', 'ronce'].includes(STORY.pic)) return;
  const url = portraitURL(name, moodOf(text)); if (!url) return;
  const right = !!STORY;
  el('portrait', right ? 172 : 4, 46, 64, 64, `<img src="${url}" alt="">`);
}
