'use strict';
/* ============================================================
   ÉCLOSIA — planches manga, Nova, Ordre Racine, romance
   ============================================================ */
let STORY = null;
const SW = 228, SH = 104;
let sx = null;
function sHash(x, y, s) { let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(s | 0, 982451653) | 0; h = Math.imul(h ^ h >>> 13, 1274126177); h ^= h >>> 16; return (h >>> 0) / 4294967296; }
function sCirc(x, y, r) { sx.beginPath(); sx.arc(x, y, r, 0, 7); sx.fill(); }
function sOval(x, y, rx, ry, a = 0) { sx.beginPath(); sx.ellipse(x, y, rx, ry, a, 0, 7); sx.fill(); }
function sGrad(a, b, y0 = 0, y1 = SH) { const g = sx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, a); g.addColorStop(1, b); return g; }
function sGlow(x, y, r, c) { const g = sx.createRadialGradient(x, y, 1, x, y, r); g.addColorStop(0, c); g.addColorStop(1, 'rgba(0,0,0,0)'); sx.fillStyle = g; sx.fillRect(x - r, y - r, r * 2, r * 2); }
function sSpeed(cx, cy, col, n, f) { sx.fillStyle = col; for (let i = 0; i < n; i++) { const a = i / n * 6.283 + sHash(i, f >> 3, 1) * .08, w = .012 + sHash(i, 7, 2) * .02, r0 = 48 + sHash(i, 3, 3) * 24; sx.beginPath(); sx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); sx.lineTo(cx + Math.cos(a - w) * 300, cy + Math.sin(a - w) * 300); sx.lineTo(cx + Math.cos(a + w) * 300, cy + Math.sin(a + w) * 300); sx.fill(); } }
function sStars(n = 34) { sx.fillStyle = 'rgba(255,255,255,.75)'; for (let i = 0; i < n; i++) sx.fillRect(sHash(i, 1, 9) * SW | 0, sHash(i, 2, 9) * 56 | 0, 1, 1); }
function sFig(x, y, pal, dir, s) { sx.drawImage(personSprite(pal, dir || 'down', 0), x, y, 16 * s, 16 * s); }
function sMon(id, x, y, sz, flip) { const c = monSprite(id, false); sx.save(); if (flip) { sx.translate(x + sz, y); sx.scale(-1, 1); sx.drawImage(c, 0, 0, sz, sz); } else sx.drawImage(c, x, y, sz, sz); sx.restore(); }
function sPortrait(name, x, y, sz, text) { const c = portraitCanvas(name, typeof moodOf === 'function' ? moodOf(text) : null); if (!c) return; sx.save(); sx.imageSmoothingEnabled = true; sx.drawImage(c, x, y, sz, sz); sx.restore(); }
function sTree(cx, cy, f) {
  sx.fillStyle = '#4a3020'; sx.fillRect(cx - 12, cy, 24, 30); sx.fillRect(cx - 18, cy + 24, 8, 6); sx.fillRect(cx + 10, cy + 24, 8, 6);
  sx.fillStyle = '#6b4a2b'; sx.fillRect(cx - 8, cy, 8, 28);
  sx.fillStyle = '#163f22'; sCirc(cx, cy - 16, 34); sCirc(cx - 26, cy - 2, 20); sCirc(cx + 26, cy - 2, 20);
  sx.fillStyle = '#2f7d3c'; sCirc(cx, cy - 18, 31); sCirc(cx - 26, cy - 4, 17); sCirc(cx + 26, cy - 4, 17);
  sx.fillStyle = '#4c9e4a'; sCirc(cx - 10, cy - 30, 12); sCirc(cx + 16, cy - 20, 9);
  sGlow(cx, cy - 12, 22, `rgba(255,230,140,${.6 + .4 * Math.sin(f / 20)})`);
  sx.fillStyle = '#f2c14e'; sOval(cx, cy - 12, 4, 6); sx.fillStyle = '#fff6d0'; sOval(cx - 1, cy - 14, 1.5, 2);
}
function sHouse(x, y, c) { sx.fillStyle = '#f5ead2'; sx.fillRect(x, y, 30, 20); sx.fillStyle = c; sx.fillRect(x - 3, y - 10, 36, 11); sx.fillStyle = '#5a3a24'; sx.fillRect(x + 11, y + 8, 8, 12); }
function sTower(x, top, c) { sx.fillStyle = c; sx.beginPath(); sx.moveTo(x - 16, SH); sx.lineTo(x - 8, top); sx.lineTo(x + 8, top); sx.lineTo(x + 16, SH); sx.fill(); sx.fillRect(x - 12, top - 4, 24, 6); }
function drawPic(p, f) {
  const k = p.pic;
  if (k === 'lands') {
    sx.fillStyle = sGrad('#0b1838', '#2a4f8a'); sx.fillRect(0, 0, SW, SH); sStars(); sx.fillStyle = '#f4f0d0'; sCirc(196, 20, 9); sx.fillStyle = '#173a6a'; sx.fillRect(0, 60, SW, 44);
    for (const [x, y, c] of [[22, 72, '#8ccf6c'], [46, 90, '#e4cc95'], [70, 70, '#e6eff5'], [86, 94, '#c9b46a'], [132, 74, '#e6eef5'], [156, 90, '#a9b86a'], [178, 68, '#86c97a'], [196, 94, '#8d7a6a'], [212, 78, '#7cc464'], [150, 100, '#f0dc9a']]) { sx.fillStyle = '#0c2240'; sOval(x, y + 2, 14, 4.5); sx.fillStyle = c; sOval(x, y, 12, 4.5); }
    sx.fillStyle = 'rgba(255,255,255,.3)'; for (let i = 0; i < 8; i++) sx.fillRect((i * 37 + f / 2) % SW, 80 + (i % 3) * 8, 8, 1);
  } else if (k === 'flood') {
    sx.fillStyle = sGrad('#05081a', '#1a2a5a'); sx.fillRect(0, 0, SW, SH); sStars(20); sGlow(186, 88, 60, 'rgba(255,230,140,.9)');
    sx.fillStyle = '#0d1c3e'; sx.fillRect(0, 84, SW, 20); for (const [x, c] of [[10, '#8a3a32'], [44, '#3a5a8a'], [78, '#6a5a3a']]) { sx.fillStyle = '#c8bca0'; sx.fillRect(x, 84, 22, 14); sx.fillStyle = c; sx.fillRect(x - 2, 77, 26, 8); }
    const w = Math.sin(f / 18) * 4; sx.fillStyle = '#16306a'; sx.beginPath(); sx.moveTo(0, SH); sx.lineTo(0, 30 + w); sx.quadraticCurveTo(70, -6 + w, 128, 40); sx.quadraticCurveTo(108, 30, 104, 56); sx.quadraticCurveTo(140, 70, 150, SH); sx.fill();
    sx.fillStyle = '#e8f2ff'; sx.beginPath(); sx.moveTo(40, 14 + w); sx.quadraticCurveTo(96, 2 + w, 128, 40); sx.quadraticCurveTo(100, 22, 60, 24 + w); sx.fill();
  } else if (k === 'zenith') {
    sx.fillStyle = sGrad('#2c2458', '#ff9a6a'); sx.fillRect(0, 0, SW, SH); sx.fillStyle = '#ffd060'; sCirc(114, 26, 17); sx.fillStyle = '#2c2458'; sCirc(119, 23, 15); sGlow(114, 26, 30, 'rgba(255,208,96,.35)');
    sTower(114, 42, '#1a1430'); sx.fillStyle = '#b28cff'; sx.fillRect(112, 52, 4, 6); sx.fillRect(112, 70, 4, 6);
    ['#8ccf6c', '#4a8fe0', '#e6eff5', '#c9b46a'].forEach((c, i) => { sx.fillStyle = c; sx.fillRect(i * 57, 94, 57, 10); });
    if (p.mon) sMon(p.mon, 150, 20, 64);
  } else if (k === 'seed') {
    sx.fillStyle = '#08080f'; sx.fillRect(0, 0, SW, SH); sSpeed(114, 52, 'rgba(242,193,78,.35)', 40, f); sGlow(114, 52, 60, 'rgba(255,230,140,1)');
    sx.fillStyle = '#1c1424'; sOval(114, 54, 12, 16); sx.fillStyle = '#f2c14e'; sOval(114, 54, 10, 14); sx.fillStyle = '#fff6d0'; sOval(110, 48, 3, 5); sx.fillStyle = '#3fa34d'; sx.fillRect(113, 32, 2, 9); sOval(108, 34, 6, 3, -.4); sOval(120, 32, 6, 3, .4);
  } else if (k === 'tree') {
    sx.fillStyle = sGrad('#ff9a6a', '#ffe7b8'); sx.fillRect(0, 0, SW, SH); sx.fillStyle = '#4a8a4a'; sx.fillRect(0, 80, SW, 24);
    ['#e6eef5', '#a9b86a', '#86c97a', '#8d7a6a', '#7cc464', '#f0dc9a'].forEach((c, i) => { sx.fillStyle = c; sx.fillRect(i * 38, 92, 38, 12); }); sTree(114, 58, f);
  } else if (k === 'eclos') {
    sx.fillStyle = '#fdf3d0'; sx.fillRect(0, 0, SW, SH); sSpeed(114, 52, 'rgba(242,160,60,.25)', 36, f); sMon('feuillon', 14, 30, 64); sMon('brasille', 82, 18, 64); sMon('clapotin', 150, 30, 64);
  } else if (k === 'village') {
    sx.fillStyle = sGrad('#8fd0ff', '#e6f6ff'); sx.fillRect(0, 0, SW, SH); sx.fillStyle = '#5aa850'; sOval(60, 96, 90, 30); sx.fillStyle = '#78c060'; sOval(180, 100, 100, 32);
    sHouse(36, 70, '#c45a4a'); sHouse(98, 68, '#2f9e94'); sHouse(160, 70, '#5a7ac4'); sFig(100, 64, PALS[G && G.look] || PALS.player, 'down', 1.8);
  } else if (k === 'ferry') {
    sx.fillStyle = sGrad('#1a2a5a', '#f09a6a'); sx.fillRect(0, 0, SW, SH); sx.fillStyle = '#2a4f8a'; sx.fillRect(0, 70, SW, 34);
    sx.fillStyle = 'rgba(255,255,255,.3)'; for (let i = 0; i < 10; i++) sx.fillRect((i * 31 + f / 2) % SW, 76 + (i % 4) * 7, 10, 1);
    sx.fillStyle = '#5a3a24'; sx.beginPath(); sx.moveTo(40, 70); sx.lineTo(190, 70); sx.lineTo(176, 88); sx.lineTo(54, 88); sx.fill(); sx.fillStyle = '#f4f4f0'; sx.fillRect(110, 30, 4, 40); sx.beginPath(); sx.moveTo(114, 32); sx.lineTo(150, 62); sx.lineTo(114, 62); sx.fill();
    sFig(70, 38, PALS[G && G.look] || PALS.player, 'right', 2); sFig(88, 38, PALS.rival, 'right', 2); sTree(212, 66, f);
  } else if (k === 'clash') {
    sx.fillStyle = '#ffcf4a'; sx.fillRect(0, 0, SW, SH); sSpeed(114, 52, 'rgba(255,255,255,.75)', 50, f); const me = G && G.party[0]; if (me) sMon(me.sp, 30, 20, 64, true); if (p.foe) sMon(p.foe, 134, 20, 64);
  } else if (k === 'nova' || k === 'epine') {
    const n = k === 'nova'; sx.fillStyle = n ? '#14204a' : '#1a0710'; sx.fillRect(0, 0, SW, SH); sSpeed(114, 50, n ? 'rgba(127,184,255,.35)' : 'rgba(196,58,90,.35)', 44, f); sPortrait(n ? 'Nova' : 'Épine', 54, -6, 120);
  } else if (k === 'ronce' || k === 'nox' || k === 'oniris') {
    const r = k === 'ronce';
    sx.fillStyle = r ? '#1a0710' : '#140e26'; sx.fillRect(0, 0, SW, SH); sSpeed(114, 46, r ? 'rgba(196,58,90,.35)' : 'rgba(163,92,198,.35)', 44, f);
    const who = k === 'nox' ? 'Nox' : k === 'oniris' ? 'Oniris' : (p.who === 'Maître Ronce' ? 'Maître Ronce' : null);
    if (k === 'nox' && p.who === 'Oniris') { sPortrait('Oniris', 54, -6, 120); }
    else if (who) sPortrait(who, 54, -6, 120);
    else { sx.fillStyle = '#000'; sx.beginPath(); sx.moveTo(84, SH); sx.lineTo(100, 46); sx.lineTo(128, 46); sx.lineTo(144, SH); sx.fill(); sCirc(114, 40, 13);
    sx.fillStyle = r ? '#ff3a4a' : '#d6a8ff'; sx.fillRect(107, 38, 4, 2); sx.fillRect(117, 38, 4, 2); }
    if (r) { sx.strokeStyle = '#3a6a2a'; sx.lineWidth = 3; for (let i = 0; i < 4; i++) { sx.beginPath(); sx.moveTo(i < 2 ? 0 : SW, 20 + i * 22); sx.quadraticCurveTo(114, 58 + Math.sin(f / 30 + i) * 10, i < 2 ? 60 : 168, SH); sx.stroke(); } }
    else { sx.fillStyle = '#ffd060'; sCirc(180, 24, 12); sx.fillStyle = '#140e26'; sCirc(184, 21, 11); }
  } else if (k === 'camp') {
    sx.fillStyle = sGrad('#0a1028', '#24305a', 0, 78); sx.fillRect(0, 0, SW, SH); sStars(); sx.fillStyle = '#1a2a1a'; sx.fillRect(0, 78, SW, 26);
    const fl = Math.sin(f / 4) * 2; sGlow(114, 80, 46, 'rgba(255,150,60,.55)'); sx.fillStyle = '#5a3a24'; sx.fillRect(104, 88, 20, 3); sx.fillStyle = '#ff7a2a'; sOval(114, 82, 6, 9 + fl); sx.fillStyle = '#ffd060'; sOval(114, 85, 3, 5 + fl / 2);
    sFig(62, 46, PALS[G && G.look] || PALS.player, 'right', 2.5); sFig(126, 46, PALS.rival, 'left', 2.5);
  } else if (k === 'lantern' || k === 'summit') {
    const t = k === 'summit'; sx.fillStyle = sGrad(t ? '#4a6ab8' : '#2a1f4a', t ? '#ffd8a8' : '#f09a6a'); sx.fillRect(0, 0, SW, SH);
    if (t) { sx.fillStyle = '#f4f8ff'; sx.beginPath(); sx.moveTo(120, 18); sx.lineTo(200, SH); sx.lineTo(40, SH); sx.fill(); }
    else for (let i = 0; i < 16; i++) { const x = sHash(i, 8, 8) * SW, y = (106 - ((f * .25 + i * 29) % 116)); sGlow(x, y, 7, 'rgba(255,200,100,.6)'); sx.fillStyle = '#ffb050'; sx.fillRect(x - 2, y - 3, 4, 5); }
    sx.fillStyle = t ? '#c8d6e2' : '#24301e'; sOval(110, 108, 150, 32); sFig(84, 42, PALS[G && G.look] || PALS.player, 'right', 2.5); sFig(108, 42, PALS.rival, 'left', 2.5);
  } else if (k === 'siblings') {
    sx.fillStyle = sGrad('#3a1a1a', '#f0a060'); sx.fillRect(0, 0, SW, SH); sSpeed(114, 52, 'rgba(255,230,180,.18)', 30, f); sPortrait('Nova', 6, -2, 110); sPortrait('Épine', 112, -2, 110);
  } else if (k === 'petal') {
    const col = p.col || '#fff'; sx.fillStyle = '#10202a'; sx.fillRect(0, 0, SW, SH); sSpeed(114, 52, 'rgba(255,255,255,.18)', 36, f); sGlow(114, 52, 50, col);
    sx.fillStyle = '#1c1424'; sOval(114, 52, 13, 24, .5); sx.fillStyle = col; sOval(114, 52, 11, 22, .5); sx.fillStyle = 'rgba(255,255,255,.6)'; sOval(110, 46, 3, 8, .5);
  } else if (k === 'germalis') {
    sx.fillStyle = sGrad('#fff7d8', '#d8f5c8'); sx.fillRect(0, 0, SW, SH); sSpeed(114, 52, 'rgba(242,193,78,.35)', 40, f); sMon('nocturnis', 66, 4, 96);
  }
}
function drawStory(x) {
  if (!STORY) return;
  sx = x; const f = RT.frame;
  x.imageSmoothingEnabled = false; x.fillStyle = '#000'; x.fillRect(0, 0, 240, 160);
  x.save(); x.translate(6, 4); x.beginPath(); x.rect(0, 0, SW, SH); x.clip(); drawPic(STORY, f); x.restore();
  x.strokeStyle = '#fff'; x.lineWidth = 2; x.strokeRect(5, 3, SW + 2, SH + 2);
}
async function story(pages) { for (const p of pages) { STORY = p; await say(p.t, { speaker: p.who }); } STORY = null; }
async function choice(pic, text, opts, who) { STORY = pic; let r = await ask(text, opts, { w: 118, speaker: who }); STORY = null; return r < 0 ? opts.length - 1 : r; }
const love = () => { G.flags.aff = (G.flags.aff || 0) + 1; };
const ME = () => G.name;

/* ---------- Scènes ---------- */
const INTRO_PAGES = () => [
  { pic: 'lands', t: "Il y a longtemps, les Quatre Terres ne formaient qu'un seul continent. Une créature, Zénithar, les tenait ensemble." },
  { pic: 'germalis', t: "Les anciens parlaient de trois gardiens : Zénithar, qui tient le ciel ; Germalis, qui fait pousser la vie ; Aquorée, qui garde la mémoire de la mer. On les appelait la Triade." },
  { pic: 'flood', t: "Il y a dix ans, la nuit de la Germination, la mer s'est soulevée. À l'est, la Graine-Monde soudait six terres en une seule : Éclosia." },
  { pic: 'flood', t: "Cette nuit-là, des milliers de gens ont tout perdu. Les vagues ont frappé jusqu'aux côtes des Quatre Terres." },
  { pic: 'eclos', t: "Avec la Graine sont nés les Éclos. Le monde a appris à vivre avec eux, et avec ses deuils." },
  { pic: 'nova', t: "Cette nuit-là, une fille de onze ans aux cheveux bleus a été repêchée près de Bourg-Aurore. Elle s'appelait Nova. Vous avez grandi ensemble." },
  { pic: 'zenith', t: "Aujourd'hui, l'Ordre Éclipse veut réveiller Zénithar. Et à l'est, l'Ordre Racine convoite les Pétales de la Graine." },
  { pic: 'village', t: `${ME()} a vingt et un ans. Après cinq ans loin de chez soi, ${ME()} revient à Bourg-Aurore. Son ancien mentor, le Professeur Sauge, l'a fait appeler.` },
];
async function introStory() { await story(INTRO_PAGES()); }

const STORY_PRE = {
  async somnis_aube2() { await story([{ pic: 'nox', t: "Au fond du sanctuaire, un homme en manteau violet se tient devant l'autel. Nox, le chef de l'Ordre Éclipse." }]); },
  async somnis_u5() { await story([{ pic: 'epine', t: "Devant le sanctuaire d'Érablaie, un homme t'attend. Ses cheveux ont exactement la couleur de ceux de Nova." }]); },
  async somnis_nuit2() {
    const first = !G.flags.ronceIntro; G.flags.ronceIntro = 1;
    if (first) await story([{ pic: 'tree', t: "Au centre de la clairière, la Graine-Monde bat comme un cœur. Maître Ronce t'attend." }]);
    await story([{ pic: 'nova', who: 'Nova', t: `${ME()} ! Je t'avais promis d'être là. Laisse-moi soigner ton équipe.` }]);
    healAll(); sfx('heal');
    if (first) await story([
      { pic: 'nova', who: 'Nova', t: "Ronce. Où est mon frère ?" },
      { pic: 'ronce', who: 'Maître Ronce', t: "Ilan a fait son devoir. Il t'a cherchée toute sa vie, tu sais. Toi, tu as fui." },
      { pic: 'nova', who: 'Nova', t: `... ${ME()}. Finis-en.` },
    ]);
  },
  async somnis_oniris() { await story([{ pic: 'oniris', t: "Plus loin dans le sanctuaire, un homme en robe de nuit étoilée t'attend. Oniris, chef de l'Ordre Somnis." }]); },
  async ronce_final() {
    await story([
      { pic: 'ronce', t: "Devant l'autel du Mont Éveil, une silhouette t'attend. Maître Ronce. Libre." },
      { pic: 'ronce', who: 'Maître Ronce', t: "Les Gardiens ? Ilan a voulu les aider à me retenir. Il a eu tort. Ta Nova le soigne, en bas." },
      { pic: 'ronce', who: 'Maître Ronce', t: "Tout ce que tu as fait depuis Bourg-Aurore, je l'avais prévu. Même ta victoire au Cœur de la Graine." },
    ]);
  },
  async rival6() { await story([{ pic: 'summit', t: "Au milieu du sentier enneigé, Nova t'attend, les cheveux pleins de givre." }]); },
};

const STORY_POST = {
  async rival1() { },
  async rival3() {
    await say("J'avais onze ans la nuit de la Germination. Dix ans plus tard, je cherche encore à comprendre ce qu'elle nous a pris.", { speaker: 'Nova' });
    const c = await choice({ pic: 'nova' }, "Nova regarde vers l'est, vers la mer.", ['Raconte-moi.', 'On se reverra.'], 'Nova');
    if (c === 0) {
      love();
      await story([
        { pic: 'flood', who: 'Nova', t: "La mer est montée jusqu'au toit de notre maison, à Éclosia. Mes parents ne sont pas remontés. Mon frère et moi, si." },
        { pic: 'flood', who: 'Nova', t: "On m'a repêchée ici. Lui, je ne l'ai jamais revu. Il s'appelle Ilan." },
        { pic: 'nova', who: 'Nova', t: "... Je ne raconte jamais ça. Bizarre. Bon. Je file vers Cendrecap. Ne traîne pas !" },
      ]);
    } else await say("Ça me va. La prochaine fois, je ne retiendrai pas mes coups. Je file vers Cendrecap !", { speaker: 'Nova' });
  },
  async rival5() {
    await story([{ pic: 'camp', t: "Avant de partir, Nova s'assoit sur un rocher à l'entrée de la grotte." }, { pic: 'camp', who: 'Nova', t: "Après la Ligue, je retourne à Éclosia. J'ai entendu dire qu'Ilan était vivant. Dans l'Ordre Racine." }]);
    const c = await choice({ pic: 'camp' }, "Tu viendras avec moi ?", ['Je viens avec toi.', 'On verra.'], 'Nova');
    if (c === 0) { love(); await story([{ pic: 'camp', who: 'Nova', t: "... Ne dis pas des choses comme ça avant une bataille. Je vais perdre mes moyens." }]); }
    else await story([{ pic: 'camp', who: 'Nova', t: "D'accord. Je trouverai mon propre chemin, alors." }]);
  },
  async somnis_aube2() {
    await story([
      { pic: 'nox', who: 'Oniris', t: "Nox ! Ton argent, d'où venait-il ? Des lettres signées « R » ?" },
      { pic: 'nox', who: 'Nox', t: "... Comment le sais-tu ?" },
      { pic: 'nox', who: 'Oniris', t: "Parce que j'ai reçu les mêmes. Il m'a promis que tu échouerais. Et à toi, que j'échouerais." },
      { pic: 'nox', who: 'Nox', t: "On nous a joués. Tous les deux. Pour qu'un champion vienne réveiller le Zénith à notre place." },
      { pic: 'ronce', t: "Pendant ce temps, à Éclosia, sous les racines du monde..." },
      { pic: 'ronce', who: 'Maître Ronce', t: "Nox voulait régner. Oniris voulait dormir. Je leur ai donné à chacun ce qu'il voulait." },
      { pic: 'ronce', who: 'Commandant Épine', t: "Et ce champion des Quatre Terres ? S'il traverse la mer ?" },
      { pic: 'ronce', who: 'Maître Ronce', t: "Alors il m'apportera les Pétales. Les racines finissent toujours par tout reprendre." },
    ]);
    await say("Sur l'autel, une forme dorée respire doucement...");
  },
  async somnis_u5() {
    await story([
      { pic: 'epine', t: "Épine s'éloigne entre les érables rouges, sans se retourner." },
      { pic: 'camp', t: "Le soir, au bord du canal, Nova te retrouve et allume un feu. Elle reste longtemps silencieuse." },
      { pic: 'camp', who: 'Nova', t: "On m'a dit que tu avais battu le Commandant Épine. Les cheveux bleus... Tu l'as vu, toi aussi." },
      { pic: 'epine', who: 'Nova', t: "C'est Ilan. Mon grand frère. Après la Germination, Ronce l'a trouvé sur un toit, affamé, et lui a donné un but." },
      { pic: 'camp', who: 'Nova', t: "Je lui en veux. Et je m'en veux de l'avoir laissé seul avec cet homme. Tu dois me trouver pathétique." },
    ]);
    const c = await choice({ pic: 'camp' }, 'Que lui réponds-tu ?', ['Je suis là pour toi.', 'Il a fait ses choix.']);
    if (c === 0) { love(); await story([{ pic: 'camp', who: 'Nova', t: "... Merci. Vraiment." }, { pic: 'camp', t: "Pour la première fois, elle sourit sans se moquer de toi. Vous parlez jusqu'à ce que le feu s'éteigne." }]); }
    else await story([{ pic: 'camp', who: 'Nova', t: "Tu as raison. Ça fait mal quand même." }]);
  },
  async somnis_nuit2() {
    G.flags.somnisDone = 1;
    await story([
      { pic: 'epine', t: "Une silhouette sort d'entre les ronces. Le Commandant Épine. Ilan." },
      { pic: 'siblings', who: 'Épine', t: "Nova... J'ai obéi à un homme qui confondait le deuil et le pouvoir. Je ne savais pas faire autrement." },
      { pic: 'siblings', who: 'Nova', t: "Tu aurais pu revenir. N'importe quand." },
      { pic: 'siblings', who: 'Épine', t: "Je sais. Je vais conduire Ronce aux Gardiens. Après... si tu veux encore de moi comme frère, je serai là." },
      { pic: 'siblings', t: "Nova ne répond rien. Mais elle le serre dans ses bras, longtemps." },
      { pic: 'ronce', t: "Les Gardiens emmènent Maître Ronce. En passant devant toi, il sourit. Juste un peu trop." },
    ]);
    await say("Au fond de la clairière, la Graine-Monde se met à briller...");
  },
  async ronce_final() {
    await story([
      { pic: 'ronce', who: 'Maître Ronce', t: "La mer a pris ma famille. Et moi, j'ai pris celle des autres. Ilan. Nova. Toi." },
      { pic: 'siblings', t: "Nova arrive en courant, Ilan appuyé sur son épaule, le bras en écharpe." },
      { pic: 'siblings', who: 'Épine', t: "C'est fini, Ronce. Pour de vrai, cette fois." },
      { pic: 'ronce', who: 'Maître Ronce', t: "... Oui. Emmenez-moi. Je n'ai plus rien à prévoir." },
      { pic: 'summit', t: "Plus haut sur le sentier, un vieil homme en blanc vous regarde. Il attendait ce moment depuis mille ans." },
    ]);
  },
  async rival6() {
    if (G.flags.couple) await story([{ pic: 'summit', who: 'Nova', t: "Quoi qu'il arrive là-haut... je t'attends ici. Comme toujours." }]);
    else if (G.flags.later) {
      await story([{ pic: 'summit', who: 'Nova', t: "Tu m'avais promis de reposer la question. Avant que tu montes." }]);
      const c = await choice({ pic: 'summit' }, 'Le moment est venu.', ['Reste avec moi ?', 'Restons rivaux.']);
      if (c === 0) { G.flags.couple = 1; G.flags.later = 0; await story([{ pic: 'summit', who: 'Nova', t: "Oui. Mille fois oui." }, { pic: 'summit', t: "Elle t'embrasse, là, dans la neige. Le vent se tait une seconde." }]); }
      else { G.flags.friend = 1; G.flags.later = 0; await story([{ pic: 'summit', who: 'Nova', t: "... D'accord. Alors je compte bien te battre, un jour." }]); }
    } else await story([{ pic: 'summit', who: 'Nova', t: "Va, rival·e. Et redescends en un seul morceau." }]);
  },
};

async function petalScene(gym) {
  const n = petalCount();
  await story([{ pic: 'petal', col: gym.petal, t: `${ME()} obtient le ${gym.badge} ! (${n}/6 Pétales)` }]);
  if (n === 1) await story([{ pic: 'ronce', t: "Sous les racines du monde..." }, { pic: 'ronce', who: 'Commandant Épine', t: "Le dresseur des Quatre Terres a pris le Pétale Blanc. Laissez-moi l'arrêter." }, { pic: 'ronce', who: 'Maître Ronce', t: "Va l'attendre au sanctuaire d'Érablaie, Épine. Et si c'est l'ami de ta sœur... ne tremble pas." }]);
  if (n === 3) await story([{ pic: 'ronce', who: 'Maître Ronce', t: "Trois Pétales. Épine a perdu, et il a hésité. Il n'a jamais su choisir entre moi et sa sœur." }, { pic: 'ronce', who: 'Maître Ronce', t: "Peu importe. L'étranger rassemble les Pétales pour nous. Les racines finissent toujours par tout reprendre." }]);
  if (n === 6) await story([{ pic: 'ronce', who: 'Maître Ronce', t: "Six Pétales réunis. Le Cœur de la Graine s'ouvre enfin. Viens. Apporte-les-moi." }, { pic: 'tree', t: "Partout dans Éclosia, les ronces se retirent. Sur la Route 7, le chemin du Cœur de la Graine est ouvert." }]);
}
async function legendPre(id) {
  if (id === 'auberis') await story([{ pic: 'zenith', mon: 'auberis', t: "Sur l'autel, Zénithar ouvre les yeux. Le gardien qui tenait les Quatre Terres ensemble te regarde." }]);
  if (id === 'nocturnis') await story([{ pic: 'germalis', t: "La Graine-Monde s'ouvre dans un éclat de lumière. Germalis, l'esprit de la Graine, se dresse devant toi." }]);
}
async function romance() {
  if (G.flags.romanceDone) return; G.flags.romanceDone = 1;
  await story([
    { pic: 'seed', t: "La lumière de la Graine se répand sur les six terres d'Éclosia. L'Ordre Racine est dispersé." },
    { pic: 'seed', t: "Mais la Graine a germé une fois. Elle peut germer encore. Les racines du monde sont profondes." },
    { pic: 'lantern', t: "Le soir, à Graineval, des lanternes de sève montent vers le ciel. Nova te rejoint, à l'écart de la fête." },
    { pic: 'lantern', who: 'Nova', t: "Ilan est parti avec les Gardiens. Pour la première fois depuis dix ans, je n'ai plus de colère. Juste... de la place." },
    { pic: 'lantern', who: 'Nova', t: "Et dans cette place, il y a toi. Depuis un moment, je crois." },
  ]);
  const c = await choice({ pic: 'lantern' }, 'Nova te regarde, sans détourner les yeux.', ['Prendre sa main', 'Avouer tes sentiments', 'Rester rivaux']);
  if (c < 2 && (G.flags.aff || 0) >= 2) {
    G.flags.couple = 1;
    await story([{ pic: 'lantern', t: c === 0 ? "Tu prends sa main. Elle entrelace ses doigts aux tiens, sans un mot." : "Tu lui dis tout. Nova rit, les yeux brillants : « Enfin. Moi aussi, idiot·e. »" }, { pic: 'lantern', t: "Elle pose son front contre le tien. Au-dessus de vous, les lanternes continuent de monter." }]);
  } else if (c < 2) {
    G.flags.later = 1;
    await story([{ pic: 'lantern', who: 'Nova', t: "... J'en ai envie. Vraiment. Mais tout va trop vite depuis ce matin. J'ai besoin d'un peu de temps." }, { pic: 'lantern', who: 'Nova', t: "Repose-moi la question au Mont Éveil. Je t'y attendrai." }]);
  } else { G.flags.friend = 1; await story([{ pic: 'lantern', who: 'Nova', t: "Meilleurs rivaux. Ça me va... pour l'instant." }]); }
  await say("On se retrouve au Mont Éveil, au-delà des Racines du Monde. Il paraît que le premier dresseur y attend.", { speaker: 'Nova' });
  await story([{ pic: 'lantern', who: 'Nova', t: "Attends. Tiens. C'est le pendentif de ma mère. Une graine de sève, dedans. Je veux que tu l'aies." }]);
  G.keys.pendentif = 1; sfx('badge');
  await say("Tu reçois le Pendentif de Sève ! En combat, une créature au stade final peut entrer en Floraison.");
  saveGame(true);
}
async function arrivalEclosia() {
  await story([
    { pic: 'ferry', t: "Le ferry traverse la mer toute la nuit. À l'aube, Nova est accoudée au bastingage, à côté de toi." },
    { pic: 'ferry', who: 'Nova', t: "Dix ans que je n'ai pas vu cette côte. Avant, il n'y avait que de l'eau. Maintenant, regarde : la Graine." },
    { pic: 'tree', t: "Au loin, un arbre immense mange l'horizon. La Graine-Monde." },
    { pic: 'ferry', who: 'Nova', t: "Je vais chercher Ilan. Toi, gagne les Pétales avant l'Ordre Racine. On se retrouvera, promis." },
  ]);
}
