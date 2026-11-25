'use strict';
/* ============================================================
   ÉCLOSIA — arcs des personnages, après-jeu et mondes parallèles
   ============================================================ */
const _drawPicBase = drawPic;
drawPic = function (p, f) {
  const k = p.pic;
  if (k === 'rift') {
    sx.fillStyle = '#0a0614'; sx.fillRect(0, 0, SW, SH);
    for (let i = 0; i < 9; i++) { sx.strokeStyle = `hsla(${(f * 2 + i * 40) % 360},80%,65%,${0.55 - i * 0.05})`; sx.lineWidth = 3; sx.beginPath(); sx.ellipse(114, 52, 12 + i * 9 + Math.sin(f / 10 + i) * 3, 6 + i * 5, f / 60 + i * 0.3, 0, 7); sx.stroke(); }
    sGlow(114, 52, 40, 'rgba(255,255,255,.8)');
    if (p.who !== undefined || p.duo) { sFig(70, 60, PALS[G && G.look] || PALS.player, 'up', 2.4); sFig(124, 60, PALS.rival, 'up', 2.4); }
  } else if (k === 'envers') {
    sx.fillStyle = sGrad('#1a0a14', '#4a2a3a'); sx.fillRect(0, 0, SW, SH);
    sx.fillStyle = '#2a1a1e'; sx.fillRect(0, 80, SW, 24);
    sx.strokeStyle = '#3a6a2a'; sx.lineWidth = 3; for (let i = 0; i < 8; i++) { sx.beginPath(); sx.moveTo(i * 30, SH); sx.quadraticCurveTo(i * 30 + 20, 40 + Math.sin(f / 30 + i) * 6, 114, 30); sx.stroke(); }
    sx.fillStyle = '#1a0a10'; sx.fillRect(108, 20, 12, 70); sx.fillStyle = '#c43a5a'; sCirc(114, 26, 6);
    sGlow(114, 26, 30, 'rgba(196,58,90,.5)');
  } else if (k === 'isles') {
    sx.fillStyle = sGrad('#7fd8ff', '#f0fcff', 0, 60); sx.fillRect(0, 0, SW, SH); sx.fillStyle = '#3ac0e8'; sx.fillRect(0, 56, SW, 48);
    sx.fillStyle = 'rgba(255,255,255,.5)'; for (let i = 0; i < 10; i++) sx.fillRect((i * 31 + f / 2) % SW, 64 + (i % 4) * 9, 10, 1);
    for (const [x, y] of [[28, 66], [72, 84], [112, 64], [150, 90], [186, 70], [214, 92]]) { sx.fillStyle = '#e8d098'; sOval(x, y + 2, 16, 5); sx.fillStyle = '#5ab858'; sOval(x, y - 1, 12, 5); sx.fillStyle = '#2a8040'; sx.fillRect(x - 1, y - 12, 2, 10); sOval(x, y - 13, 6, 3); }
    sx.fillStyle = '#fff6c8'; sCirc(200, 18, 10);
  } else if (k === 'portrait') {
    sx.fillStyle = sGrad(p.bg || '#14204a', p.bg2 || '#3a5a9a'); sx.fillRect(0, 0, SW, SH); sSpeed(114, 50, 'rgba(255,255,255,.12)', 36, f);
    if (p.who2) { sPortrait(p.who, 6, -2, 110, p.t); sPortrait(p.who2, 112, -2, 110, p.t); } else sPortrait(p.face || p.who, 54, -6, 120, p.t);
  } else _drawPicBase(p, f);
};
const FACE = (who, t, bg, bg2) => ({ pic: 'portrait', who, t, bg, bg2 });

/* ---------- Arcs dans l'aventure principale ---------- */
const MAP_EVENTS = {
  t3: { flag: 'ev_port', cond: () => badgeCount('solvene') >= 3, async run() {
    await story([
      { pic: 'ferry', t: "Sur le quai de Port-Corail, Nova regarde la mer, les bras serrés autour d'elle." },
      FACE('Nova', "C'est ici que Sauge m'a trouvée, il y a dix ans. Enfin... c'est ce qu'il raconte."),
      FACE('Nova', "Il dit qu'une silhouette sortie des vagues m'a mise dans ses bras. Puis qu'elle a disparu. Personne ne l'a jamais revue."),
      FACE('Nova', "Je ne me souviens que du froid. Et d'une main. Chaude. Ridicule, hein ?"),
    ]);
    const c = await choice(FACE('Nova', ''), 'Que lui dis-tu ?', ['Pas du tout ridicule.', 'Une main chaude ?']);
    if (c === 0) { love(); await story([FACE('Nova', "... Merci. Tu es la seule personne à qui je l'ai raconté sans qu'on me regarde bizarrement.")]); }
    else await story([FACE('Nova', "Oui. Comme la tienne, tiens. Bon, j'arrête, je deviens sentimentale.")]);
  } },
  u6: { flag: 'ev_lant', cond: () => petalCount() >= 4 && !G.flags.st_somnis_nuit2, async run() {
    await story([
      { pic: 'lantern', t: "À la nuit tombée, Nova allume deux lanternes de sève au bord de l'eau. Elle te fait signe d'approcher." },
      FACE('Nova', "Une pour Maren. Une pour Tobias. Mes parents. Je ne l'avais jamais fait. Je ne voulais pas que ce soit vrai."),
      FACE('Nova', "Maman chantait en pêchant. Papa réparait tous les bateaux de l'île. Ils me manquent tellement que ça fait du bruit."),
    ]);
    const c = await choice({ pic: 'lantern' }, 'Tu...', ['Allumer une lanterne avec elle', 'Rester à côté d\'elle en silence']);
    love();
    await story([{ pic: 'lantern', t: c === 0 ? "Tu allumes une troisième lanterne. « Pour qui ? » demande Nova. « Pour toi. Pour que tu ne portes plus ça toute seule. »" : "Tu restes là. Au bout d'un long moment, sa tête vient se poser sur ton épaule." }, FACE('Nova', "... Merci d'être là. Vraiment.")]);
  } },
  u0: { flag: 'ev_ilan', cond: () => !!G.flags.st_somnis_nuit2, async run() {
    await story([
      { pic: 'siblings', t: "Au port, Ilan attend, sans uniforme pour la première fois. Il a l'air plus jeune, et plus fatigué." },
      FACE('Ilan', "Je voulais te parler. À toi, pas à Nova. Elle me pardonnera ou pas, c'est son droit."),
      FACE('Ilan', "J'ai fait du mal à des gens pour un homme qui me donnait l'impression d'avoir un but. Je ne vais pas me cacher derrière la Germination."),
      FACE('Ilan', "Prends soin d'elle. Je n'ai pas su le faire. Toi, tu l'as fait sans même t'en rendre compte."),
    ]);
  } },
  v0: { flag: 'ev_envers', cond: () => true, async run() {
    await story([
      { pic: 'rift', duo: 1, t: "La Faille vous recrache, Nova et toi, sur un quai couvert de ronces noires." },
      { pic: 'envers', t: "Le ciel est rouge sombre. Au loin, un arbre immense est enserré de racines comme un prisonnier. Ici, Ronce a gagné." },
      FACE('Nova', "C'est Éclosia... mais en pire. Le monde où personne ne l'a arrêté."),
      FACE('Nova', "Si je n'avais pas été repêchée cette nuit-là... est-ce que je serais quelque part, ici ?"),
    ]);
  } },
  x0: { flag: 'ev_avant', cond: () => true, async run() {
    await story([
      { pic: 'rift', duo: 1, t: "La Faille s'ouvre sur une lumière de plein été. Le vent sent le sel et l'herbe coupée." },
      { pic: 'isles', t: "Six îles séparées par la mer. Pas de Graine-Monde. Pas encore. Vous êtes dix ans en arrière, le dernier jour avant la Germination." },
      FACE('Nova', "C'est... avant. Avant tout. Mes parents sont vivants, quelque part sur ces îles."),
      FACE('Nova', "On ne peut rien changer, hein ? ... Dis-moi qu'on peut au moins les voir."),
    ]);
  } },
};
async function onEnterStory(id) {
  const E = MAP_EVENTS[id]; if (!E || !G || G.flags[E.flag] || !E.cond()) return;
  G.flags[E.flag] = 1; await wait(400); await E.run(); saveGame(true);
}

/* ---------- Combats des mondes parallèles ---------- */
Object.assign(STORY_PRE, {
  async m_nova() { await story([FACE('Lame Bleue', "Halte. Tu n'es pas d'ici. Personne ne porte de couleurs aussi vives dans ce monde.", '#2a0a14', '#6a2a3a'), FACE('Nova', "... C'est moi. Avec dix ans de Ronce dans le regard.")]); },
  async roi_ronce() { await story([{ pic: 'envers', t: "Au sommet du Trône, un vieil homme couronné de ronces vous attend. Il a l'air infiniment las." }, FACE('Roi Ronce', "Approche. Tu as le visage de quelqu'un qui m'a déjà vaincu. Dans un autre monde, je suppose.", '#1a0a14', '#4a2a3a')]); },
});
Object.assign(STORY_POST, {
  async m_nova() {
    await story([
      { pic: 'portrait', who: 'Nova', who2: 'Lame Bleue', bg: '#2a0a14', bg2: '#4a5a9a', t: "Les deux Nova se font face. L'une a des rubans rouges, l'autre une cicatrice." },
      FACE('Lame Bleue', "Tu as eu quelqu'un, toi. Moi, j'ai eu Ronce. Il m'a appris que l'amour, c'est ce qui te fait couler.", '#2a0a14', '#6a2a3a'),
      FACE('Nova', "Il t'a menti. L'amour, c'est la main qui te sort de l'eau."),
    ]);
    const c = await choice({ pic: 'portrait', who: 'Nova', who2: 'Lame Bleue', bg: '#2a0a14', bg2: '#4a5a9a' }, 'La Lame Bleue hésite.', ['Elle peut encore changer.', "Ce n'est pas toi, Nova."]);
    if (c === 0) { love(); await story([FACE('Lame Bleue', "... Changer. Dans ce monde-ci ? ... Va voir le Roi. Si tu le bats, je retire mon anneau.", '#2a0a14', '#6a2a3a')]); G.flags.mnovaHope = 1; }
    else await story([FACE('Nova', "Si. C'est moi. C'est pour ça que ça fait si mal."), FACE('Lame Bleue', "Va-t'en. Avant que je change d'avis.", '#2a0a14', '#6a2a3a')]);
  },
  async m_nox() { await story([FACE('Général Nox', "Dans ton monde, je suis libre ? ... Alors il y a une version de moi qui a eu de la chance. Ça me suffit.", '#140e26', '#3a2a5a')]); },
  async m_ilan() { await story([FACE('Épine', "Si tu bats le Roi... dis à ma sœur, celle d'ici, que je l'attends en bas. Que je suis désolé."), FACE('Nova', "Je lui dirai. Promis.")]); },
  async roi_ronce() {
    G.flags.envDone = 1;
    await story([
      FACE('Roi Ronce', "Dix ans à tenir la mer. Dix ans sans que personne ne meure noyé. Et sans que personne ne rie. J'ai cru que c'était le même prix.", '#1a0a14', '#4a2a3a'),
      { pic: 'envers', t: "Les racines du Trône se relâchent une à une. Au loin, la Graine de ce monde prend une grande inspiration." },
      { pic: 'lantern', t: "Dans les rues de Graineval-sous-Ronces, une première lanterne s'allume. Puis dix. Puis des centaines." },
      G.flags.mnovaHope ? { pic: 'siblings', t: "En bas du Trône, la Lame Bleue arrache son anneau de ronce et court vers son frère. Nova détourne les yeux, en pleurant et en souriant." } : { pic: 'siblings', t: "En bas du Trône, Épine attend. Personne ne vient. Puis, très tard, une silhouette aux cheveux bleus." },
      FACE('Nova', "On peut rentrer. Ce monde-là va s'en sortir. Je le sens."),
    ]);
    addItem('bonbon', 5); addItem('maxibaume', 5); G.keys.eclat_ombre = 1; sfx('item');
    await say("Tu reçois 5 Bonbons, 5 Maxi Baumes et l'Éclat Ombre !");
  },
  async a_aurele() {
    await story([
      FACE('Aurèle', "Tu sais, je trouve une graine au fond de la mer et tout le monde me dit que je suis fou. Toi, tu me regardes comme si tu savais qu'elle allait éclore."),
      FACE('Aurèle', "Liora et Elouan sont tout pour moi. Si un jour cette graine pouvait leur faire du mal, je la brûlerais de mes mains."),
    ]);
    const c = await choice(FACE('Aurèle', ''), "Le prévenir de ce qui arrive cette nuit ?", ['Le prévenir', 'Te taire']);
    if (c === 0) { G.flags.warned = 1; await story([FACE('Aurèle', "Une vague... cette nuit ? ... Tu as l'air sérieux·se. Mais Nacre a toujours tenu. Je... j'y penserai. Merci, étranger·e."), FACE('Nova', "Il ne te croit pas. Personne n'aurait cru. Ce n'est pas ta faute.")]); }
    else await story([FACE('Nova', "Tu as bien fait. Ou pas. Je ne sais pas. Je ne sais plus ce qui est juste, ici.")]);
  },
  async a_trio() {
    await story([
      FACE('Jeune Sauge', "Lierre, Aurèle et moi, on étudie cette graine depuis deux ans. Lierre pense qu'elle rêve. Aurèle pense qu'elle aime. Moi, je pense qu'elle a peur."),
      FACE('Jeune Sauge', "Si elle germe, toutes les îles seront soudées. Ce sera un miracle... ou une catastrophe. Les deux, sans doute."),
      FACE('Nova', "Prof... Vous allez sauver une petite fille, cette nuit. Sur la plage de Bourg-Aurore."),
      FACE('Jeune Sauge', "Bourg-Aurore ? C'est à l'autre bout de la mer ! ... Pourquoi tu pleures ?"),
    ]);
  },
});

/* ---------- La nuit de la Germination ---------- */
async function avantFinale() {
  G.flags.avantDone = 1;
  await story([
    { pic: 'seed', t: "L'Écho de la Vague s'effondre dans l'écume. Sous la mer, la Graine s'ouvre. Rien ne peut plus l'arrêter." },
    { pic: 'flood', t: "La mer se soulève. Les six îles hurlent. La Faille vous aspire, Nova et toi, au cœur de la vague." },
    { pic: 'flood', t: "Dans l'eau noire, une petite main. Des cheveux bleus. Tu tends le bras sans réfléchir." },
    { pic: 'village', t: "Une plage. Bourg-Aurore. Un jeune homme en blouse blanche court vers toi. Tu lui tends l'enfant. Le jeune Sauge la serre contre lui." },
    { pic: 'rift', t: "Avant qu'il puisse te demander ton nom, la Faille te reprend." },
    FACE('Nova', "... C'était toi. La silhouette. La main chaude. Depuis dix ans, c'était toi."),
  ]);
  const c = await choice(FACE('Nova', ''), 'Nova te regarde comme si elle te voyait pour la première fois.', ['La serrer dans tes bras', 'Lui reprendre la main']);
  love();
  await story([
    { pic: 'lantern', t: c === 0 ? "Tu la serres contre toi. Elle tremble, puis rit, puis pleure, puis rit encore." : "Tu reprends sa main. Elle est chaude. Comme cette nuit-là." },
    G.flags.couple ? FACE('Nova', "Tu m'as sauvée deux fois, alors. Je crois que je vais devoir te garder toute ma vie.") : FACE('Nova', "Tu m'as sauvée avant même qu'on se rencontre. Je ne sais pas comment on remercie quelqu'un pour ça... mais je trouverai."),
  ]);
  if (G.flags.warned) await story([{ pic: 'ronce', t: "Dans ton monde, à Port-Sève, un vieil homme aux cheveux blancs plante un arbre. Il murmure : « Une étrangère m'avait prévenu. Je ne l'ai pas crue. »" }]);
  addItem('bonbon', 5); G.keys.eclat_eau = 1; sfx('item');
  await say("Tu reçois 5 Bonbons et l'Éclat Eau !");
  if (G.flags.envDone) await multiEnd();
  saveGame(true);
}
let multiEnd; // version définitive : chronique.js
async function postEnding() {
  if (G.flags.rifts) return; G.flags.rifts = 1;
  await story([
    { pic: 'summit', t: "Avant de redescendre, Elio t'arrête. Derrière lui, l'air se déchire en deux fentes de lumière." },
    { pic: 'rift', t: "Elio : L'Éveil a ouvert plus qu'une porte. Voici l'Envers, le monde où Ronce a gagné. Et voici l'Avant, la nuit où tout a commencé." },
    { pic: 'rift', t: "Elio : Prends cette couronne. Je l'ai forgée il y a mille ans pour ceux qui devraient affronter plus grand qu'eux." },
  ]);
  G.keys.couronne = 1; sfx('badge');
  await say("Tu reçois la Couronne Colossale ! En combat, une créature peut devenir colossale pendant trois tours.");
  await say("Les Failles se trouvent au sommet du Mont Éveil. Parle-leur pour voyager entre les mondes.");
}
function giveCrystal(type, silent) {
  if (!G.keys.bracelet || G.keys['eclat_' + type]) return false;
  G.keys['eclat_' + type] = 1; if (!silent) { sfx('item'); }
  return true;
}
