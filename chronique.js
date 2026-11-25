'use strict';
/* ============================================================
   ÉCLOSIA — La Chronique (fichier unique)
   Parties : 1 trame et Sceaux · 2 enrichissement · 3 dark fantasy ·
   4 la Chaîne et la Sainte Table · 5 thèmes d'aujourd'hui ·
   6 resserrage · 7 confort de jeu
   ----------------------------------------------------------------
   Trame unifiée autour de la Triade (Zénithar, Germalis, Aquorée),
   les dix Sceaux, les arcs des personnages, le journal de quêtes,
   les verrous de progression, les requêtes annexes et l'après-jeu.
   ============================================================ */

/* ---------- 1. Le mythe commun : la Triade ---------- */
(function triade() {
  const D = (id, t) => { if (SP[id]) SP[id].desc = t; };
  D('auberis', "Gardien du ciel, premier de la Triade. Il y a mille ans, il a déchiré le continent en quatre pour arrêter une guerre.");
  D('nocturnis', "Esprit de la Graine-Monde, deuxième de la Triade. Il fait pousser la vie et sent chaque racine qui souffre.");
  D('aquoree', "Mémoire de la mer, troisième de la Triade. Ce que l'océan emporte, Aquorée s'en souvient, et le pleure.");
  D('aubere', "Un éclat de la lumière de Zénithar, né quand il a déchiré le continent. Les vieilles légendes en ont fait le gardien de l'aube.");
  D('nocturne', "L'autre éclat de Zénithar : son ombre. Les vieilles légendes en ont fait le gardien de la nuit.");
  D('eveillon', "Ce qui naît quand l'aube et la nuit de Zénithar se rejoignent. Elio l'appelle l'Éveil.");
  D('volcanis', "Né de la Couture des Braises, la plus chaude des dix déchirures. Il dort là où la terre n'a jamais cicatrisé.");
  D('givrael', "Né de la Couture du Givre. Son souffle referme les fissures de la glace.");
  D('tonnorage', "Né de la Couture du Rouage. Il boit l'énergie qui fuit des Sceaux affaiblis.");
  const L = (id, t) => { if (LEGENDS[id]) LEGENDS[id].text = t; };
  L('aubere', "Le soleil se lève sur l'autel. Aubéris, la lumière de Zénithar, prend forme !");
  L('nocturne', "La nuit tombe d'un coup sur le Cœur. Nocturnis, l'ombre de Zénithar, se dresse !");
  if (typeof DEX_LORE !== 'undefined') {
    const P = (id, t) => { if (DEX_LORE[id] && DEX_LORE[id].p) DEX_LORE[id].p[0] = t; };
    P('aubere', "Aubéris n'est pas un gardien à part : c'est la lumière de Zénithar, détachée de lui la nuit où il a déchiré le continent. Les anciens Somnis le craignaient, car il réveille le monde chaque matin.");
    P('nocturne', "Nocturnis est l'ombre de Zénithar, détachée de lui en même temps qu'Aubéris. Dans les légendes d'avant la Germination, il veillait sur le sommeil du monde.");
    P('eveillon', "Éveillon naît quand la lumière et l'ombre de Zénithar se rejoignent. Elio, le premier dresseur, l'attend depuis mille ans au sommet du Mont Éveil.");
  }
})();

/* ---------- 2. Les régions arrière-pays : Quatre Terres et îles d'Éclosia ---------- */
const QT_LINES = {
  qt0: ["Le vieux pommier de Pré-Lumière respire, la nuit. Pip dit que c'est le Sceau qui rêve.", "Mon arrière-grand-mère disait qu'Elio lui-même avait planté ce pommier."],
  qt1: ["Les phares d'Azurie n'éclairent pas la mer. Ils éclairent le fond. Odile sait pourquoi.", "La nuit de la vague, l'eau est montée jusqu'aux phares. Puis elle est redescendue, comme si elle s'excusait."],
  qt3: ["L'Éclipse a monté un camp à Rouilleport. C'est Saline qui donne les ordres.", "Bastide dit qu'un rouage géant tourne sous l'usine depuis mille ans. Personne ne l'a jamais huilé."],
  qt2: ["Tout Frimas s'est endormi debout. Un homme en violet chantait une berceuse : Oniris, dit-on.", "L'Ancien Hiémal a cent deux ans. Il dit qu'il ne mourra pas tant que le Sceau du Givre fondra."],
  qt4: ["La Racine creuse la banquise près de Bourg-Névé. Le Sceau du Frimas craque la nuit.", "Nanouk ne fait confiance à personne depuis la vague. On ne lui en veut pas."],
  qt5: ["Un commandant de la Racine prie au temple de Val-d'Ambre. Il ne parle à personne.", "Kaede garde le Sceau des Érables. Elle dit qu'il est fissuré de l'intérieur."],
  qt6: ["Toutes les horloges de Haut-Valmont se sont arrêtées une seconde, ce matin. Horace est furieux.", "Ce soir, c'est la fête des lanternes. Même les créatures dansent."],
  qt9: ["Un vieil homme aux cheveux blancs plante des arbres sur la plage. Rien n'y pousse. Il revient quand même.", "Tiaré parle au lagon. Le lagon lui répond, paraît-il."],
  qt8: ["Des ronces poussent dans les champs, là où personne ne les a plantées.", "Fanny dit que tant qu'on chante en moissonnant, la Racine ne gagnera pas."],
  qt7: ["Deux anciens chefs d'Ordre gardent le Sceau des Braises avec Basalte. Le monde est devenu bizarre.", "Saline est passée par Cendrine. Elle portait les couleurs de la Racine, maintenant."],
};
(function regions() {
  const ECL = ['qt4', 'qt5', 'qt6', 'qt7', 'qt8', 'qt9'];
  for (const rk of ECL) if (REGIONS[rk]) REGIONS[rk].name = REGIONS[rk].name.replace('· Quatre Terres', '· Éclosia');
  if (REGIONS.qt6) REGIONS.qt6.name = 'Haut-Valmont · Éclosia';
  for (const id in QT_TOWNS) {
    const T = TOWNS[id]; if (!T) continue;
    const ecl = ECL.includes(REGION_OF[id]);
    if (ecl) T.desc = T.desc.replace('(Les Quatre Terres)', "(Éclosia)").replace("une ville d'art de Valmont", "une ville d'art du Haut-Valmont");
    // dialogues propres : on retire les fragments recopiés de l'ancien jeu
    T.lines = (QT_TOWNS[id].lines || []).slice(0, 3).filter(l => !/32 badges/.test(l)).concat(QT_LINES[REGION_OF[id]] || []);
  }
  for (const t of TRAVEL) {
    const d = t[1];
    if (QT_TOWNS[d] && ECL.includes(REGION_OF[d])) t[0] = t[0].replace('Quatre Terres · ', 'Éclosia · ').replace('Valmont', 'Haut-Valmont');
  }
})();

/* ---------- 3. Les dix Sceaux ---------- */
const PALC = {
  pip: { h: '#6a9a3a', s: '#f2c9a0', c: '#a8d86a', p: '#4a5a2a', style: 'short' },
  odile: { h: '#2a4a6a', s: '#e8b48a', c: '#f4f4f4', p: '#2a5a8a', style: 'long', hat: '#2a5a8a' },
  bastide: { h: '#3a3030', s: '#d8a070', c: '#8a7a6a', p: '#3a3a40', style: 'bald', beard: 1 },
  hiemal: { h: '#e8eef4', s: '#e8c8b0', c: '#5a7a9a', p: '#2a3a4a', style: 'long', beard: 1 },
  nanouk: { h: '#1a1a22', s: '#c68a5e', c: '#e8e0d0', p: '#5a4a3a', style: 'bun' },
  kaede: { h: '#3a1a1a', s: '#f2d0b0', c: '#c4423a', p: '#2a1a1a', style: 'long' },
  horace: { h: '#9a9aa8', s: '#f0c8a0', c: '#4a3a6a', p: '#2a2a3a', style: 'swept', hat: '#2a2a3a' },
  tiare: { h: '#2a1a12', s: '#b07a50', c: '#f08a6a', p: '#3ac0c8', style: 'long' },
  fanny: { h: '#d8a040', s: '#f2c9a0', c: '#e8c060', p: '#6a8a3a', style: 'short' },
  basalte: { h: '#2a2020', s: '#a06a4a', c: '#5a3a2a', p: '#2a2020', style: 'wild', beard: 1 },
  astra: { h: '#e9c43a', s: '#f2c9a0', c: '#ffffff', p: '#2a3a8a', hat: '#2a3a8a', style: 'long' },
};
const FRAG = [
  { land: 'Verdeval', reg: 'qt0', first: 'q00', last: 'q01', sceau: 'Sceau du Pré', keeper: 'Pip', pal: PALC.pip, types: ['flore', 'normal'], lvl: 11, n: 3,
    unlock: () => !!G.flags.starter, gate: { gym: 0 }, tag: 'Quatre Terres' },
  { land: 'Azurie', reg: 'qt1', first: 'q10', last: 'q12', sceau: "Sceau de l'Écume", keeper: 'Odile', pal: PALC.odile, types: ['eau', 'vent'], lvl: 21, n: 4,
    unlock: () => !!G.badges[1], gate: { gym: 2 }, tag: 'Quatre Terres' },
  { land: 'Ferrhaven', reg: 'qt3', first: 'q30', last: 'q32', sceau: 'Sceau du Rouage', keeper: 'Bastide', pal: PALC.bastide, types: ['acier', 'foudre'], lvl: 32, n: 4,
    unlock: () => !!G.badges[3], gate: { gym: 5 }, tag: 'Quatre Terres', agent: 'chr_saline', agentTown: 'q31' },
  { land: 'Givrecime', reg: 'qt2', first: 'q20', last: 'q22', sceau: 'Sceau du Givre', keeper: 'Ancien Hiémal', pal: PALC.hiemal, types: ['givre', 'roc'], lvl: 44, n: 5,
    unlock: () => !!G.badges[6], gate: { story: 'elite1', map: 't9~league' }, tag: 'Quatre Terres' },
  { land: 'Toundra Givrée', reg: 'qt4', first: 'q40', last: 'q43', sceau: 'Sceau du Frimas', keeper: 'Nanouk', pal: PALC.nanouk, types: ['givre', 'eau'], lvl: 55, n: 5,
    unlock: () => !!G.flags.arrivedB, gate: { gym: 9 }, tag: 'Éclosia', agent: 'chr_vex', agentTown: 'q42' },
  { land: 'Sanctuaire des Érables', reg: 'qt5', first: 'q50', last: 'q53', sceau: 'Sceau des Érables', keeper: 'Kaede', pal: PALC.kaede, types: ['esprit', 'ombre'], lvl: 60, n: 5,
    unlock: () => !!G.badges[9], gate: { gym: 12 }, tag: 'Éclosia', agent: 'chr_epine', agentTown: 'q52' },
  { land: 'Haut-Valmont', reg: 'qt6', first: 'q60', last: 'q64', sceau: 'Sceau des Jardins', keeper: 'Horace', pal: PALC.horace, types: ['lumiere', 'normal'], lvl: 64, n: 6,
    unlock: () => !!G.badges[10], gate: { gym: 13 }, tag: 'Éclosia' },
  { land: 'Îles Soleil', reg: 'qt9', first: 'q90', last: 'q93', sceau: 'Sceau du Lagon', keeper: 'Tiaré', pal: PALC.tiare, types: ['eau', 'foudre'], lvl: 67, n: 6,
    unlock: () => !!G.badges[12], gate: { gym: 15 }, tag: 'Éclosia' },
  { land: "Plaine de l'Aube", reg: 'qt8', first: 'q80', last: 'q83', sceau: 'Sceau des Moissons', keeper: 'Fanny', pal: PALC.fanny, types: ['flore', 'combat'], lvl: 70, n: 6,
    unlock: () => !!G.badges[13], gate: { story: 'somnis_nuit2', map: 'sanct_nuit' }, tag: 'Éclosia' },
  { land: 'Archipel Braise', reg: 'qt7', first: 'q70', last: 'q73', sceau: 'Sceau des Braises', keeper: 'Basalte', pal: PALC.basalte, types: ['feu', 'roc'], lvl: 78, n: 6,
    unlock: () => !!G.flags.st_somnis_nuit2, gate: { story: 'ronce_final', map: 'u9' }, tag: 'Éclosia' },
];
FRAG.forEach((f, i) => { f.i = i; f.k = 'frag' + i; f.key = 'sceau' + i; });
const FRAG_BY_REG = {}; FRAG.forEach(f => { FRAG_BY_REG[f.reg] = f; });
FRAG.forEach(f => { KEY_ITEMS[f.key] = { n: f.sceau, d: `Le Sceau de ${f.land}. Il tient fermée une des dix Coutures du monde.` }; });
KEY_ITEMS.couture = { n: 'La Couture', d: "Les dix Sceaux réunis. Le monde déchiré par Zénithar et soudé par la Graine tient d'un seul morceau." };

const fragDone = i => !!(G && G.keys['sceau' + i]);
const fragSkipped = i => !!(G && G.flags.chrSkip && G.flags.chrSkip.includes(i));
const fragNeeded = i => !fragDone(i) && !fragSkipped(i);
const sceauCount = () => FRAG.filter(f => fragDone(f.i)).length;
function fragPassed(f) {
  if (f.gate.gym != null) return !!G.badges[f.gate.gym];
  return !!G.flags['st_' + f.gate.story];
}

/* Combattants des Sceaux : gardiens et agents des Ordres */
function mixTeam(types, lvl, n, seed) {
  const a = Math.ceil(n / 2), b = n - a;
  const t = vetTeam(types[0], lvl - 1, a, seed + 'a').concat(types[1] ? vetTeam(types[1], lvl, b, seed + 'b') : []);
  t.sort((x, y) => x[1] - y[1]);
  return t;
}
FRAG.forEach(f => {
  const g = {
    0: ["Le Sceau du Pré dort sous ce vieux pommier depuis mille ans. Mon grand-père le gardait. Maintenant, c'est moi. Montre-moi que tu mérites de le toucher.", "D'accord. Tu as une main douce et des créatures têtues. C'est ce qu'il faut."],
    1: ["Les phares d'Azurie ne guident pas les bateaux. Ils éclairent le Sceau sous l'eau. Si tu veux le voir, il faudra passer mon équipe.", "La marée t'a laissé·e passer. Elle ne fait pas ça avec tout le monde."],
    2: ["L'Éclipse m'a pris trois ouvriers et la moitié de mes outils. Il me reste mes créatures. Et ma méfiance.", "Bon. Tu n'es pas de l'Éclipse. Les gens de l'Éclipse ne se battent pas avec autant de soin."],
    3: ["J'ai cent deux ans. J'ai vu le Sceau du Givre geler trois fois. Cette année, il fond. Prouve-moi que tu peux le tenir.", "Ta chaleur ne fait pas fondre la glace. Elle la fait chanter. Prends-le."],
    4: ["La banquise craque toutes les nuits depuis que la Racine creuse. Je n'ai plus confiance en personne. Pas même en toi.", "... Pardon. Tu es la première personne qui vient ici pour réparer quelque chose."],
    5: ["Les érables ont rougi la nuit de la Germination. Ils ont senti le Sceau trembler. Je vais te le confier, si tu supportes ce que je vais te montrer.", "Tu n'as pas fermé les yeux. Bien. Le Sceau des Érables t'appartient."],
    6: ["Chaque horloge de Haut-Valmont bat au rythme du Sceau. Ce matin, elles se sont toutes arrêtées une seconde. Une seconde, c'est déjà trop.", "Elles battent de nouveau. À ton rythme, cette fois. Étrange... et rassurant."],
    7: ["Le lagon a pleuré cette nuit. Des larmes salées dans de l'eau salée : on ne les voit pas, on les entend. Battons-nous, et je te dirai qui pleurait.", "C'était Aquorée. Elle pleure chaque fois que quelqu'un s'approche du Sceau. Elle a peur qu'on le brise, comme la nuit de la vague."],
    8: ["On moissonne en chantant, ici. Mais depuis que la Racine rôde, on chante pour se donner du courage. Montre-moi que ça peut redevenir une fête.", "Ha ! Voilà. On chantera ton nom à la prochaine récolte."],
    9: ["Le dernier Sceau. Le plus chaud. Si tu le prends, tu portes les dix Coutures du monde. Tu sais ce que ça pèse ?", "Maintenant, tu le sais. Va. Le Mont Éveil t'attend, et ce qu'il y a au sommet aussi."],
  }[f.i];
  STORY_TRAINERS[f.k] = { cls: 'veteran', name: f.keeper, team: mixTeam(f.types, f.lvl, f.n, f.k), intro: g[0], lose: g[1], music: 'boss', money: 80 };
});
Object.assign(STORY_TRAINERS, {
  chr_saline: { cls: 'admin', name: 'Saline', team: mixTeam(['feu', 'acier'], 31, 3, 'chrsal'), intro: "Encore toi ? Nox a besoin de ces turbines. Le Rouage tient la Couture de Ferrhaven : dévissé, il nous donne l'énergie du Zénith. C'est de la mécanique, pas du vol.", lose: "Tu as raison sur un point : ce n'est pas Nox qui a dessiné les plans. Ils sont arrivés par la poste. Signés « R ».", music: 'somnis', hideAfter: 1, money: 60 },
  chr_vex: { cls: 'racine', name: 'Vex', team: mixTeam(['toxine', 'givre'], 52, 4, 'chrvex'), intro: "Toi ! Depuis la Route 4, je ne pense qu'à toi. J'ai changé d'Ordre, de manteau et de coupe de cheveux. Pas de chance, par contre.", lose: "Ils creusent jusqu'au Sceau pour que la Graine s'enracine partout. Moi, je tiens la pelle. Je déteste cette pelle.", music: 'somnis', hideAfter: 1, money: 50 },
  chr_epine: { cls: 'commandant', name: 'Épine', team: mixTeam(['ombre', 'flore'], 58, 5, 'chrepi'), intro: "Le commandant de la Racine prie au temple, comme tout le monde. Ça te surprend ? Je prie pour que le Sceau cède vite. Ça fera moins mal.", lose: "Tes rubans... non. Ce ne sont pas tes rubans. Mais j'ai déjà vu cette couleur. Sur une petite fille, avant la vague.", music: 'somnis', hideAfter: 1, money: 70 },
});
const AGENT_PAL = { chr_saline: PALS.admin, chr_vex: PALS.racine || PALS.grunt, chr_epine: PALS.epine };

/* Scènes autour des gardiens */
Object.assign(STORY_PRE, {
  frag0: async () => story([{ pic: 'lands', t: "Au bout du village, un pommier plus vieux que les maisons. À ses racines, une pierre ronde gravée d'une spirale. Elle respire, très doucement." }]),
  frag3: async () => story([{ pic: 'zenith', t: "Sur la place de Neigebourg, un vieillard assis dans la neige. Devant lui, une stèle de glace où brille une lumière dorée, celle de Zénithar." }]),
  frag7: async () => story([{ pic: 'isles', t: "Sur la plage d'Île-Surf, une jeune femme regarde le lagon. Sous l'eau, une forme immense passe lentement, puis replonge." }]),
  frag9: async () => story([{ pic: 'ash', t: "Lavabourg. Le Sceau des Braises est posé dans la lave comme un œuf dans un nid. Basalte le surveille depuis quarante ans sans cligner des yeux." }]),
});
function sceauScene(f) {
  const lines = {
    0: [FACE('Nova', "C'est ça, un Sceau ? On dirait un galet. ... Un galet qui a un cœur."), FACE('Prof. Sauge', "(Par le Lien) Parfait. Un Sceau sur dix. Elio les a cousus il y a mille ans. Ne les laisse à personne d'autre.")],
    1: [FACE('Nova', "Je déteste l'eau profonde. Mais j'aime bien ce Sceau. Il fait le bruit de la mer quand elle est calme.")],
    2: [FACE('Prof. Sauge', "(Par le Lien) « R »... Il y a un nom qui me revient, et je n'aime pas qu'il revienne. Continue. Garde les Sceaux près de toi.")],
    3: [{ pic: 'zenith', t: "Les quatre Sceaux des Quatre Terres brillent ensemble dans ton sac. Très loin, au-dessus de la Tour du Zénith, une lueur dorée répond." }, FACE('Prof. Sauge', "(Par le Lien) La Couture du Zénith tient. Les Quatre Terres ne se déchireront plus. La Ligue t'attend, maintenant.")],
    4: [FACE('Nova', "Vex creusait avec une pelle de la Racine. Si Ilan est dans la Racine... est-ce qu'il creuse, lui aussi ?"), FACE('Astra', "(Elle est venue jusqu'ici voir Éclosia de ses yeux.) La Racine ne veut pas briser les Sceaux. Elle veut que la Graine pousse à travers. Six Sceaux, six îles : ne leur en laisse aucun.")],
    5: [FACE('Kaede', "Ce que je voulais te montrer, c'est ça : le Sceau est fissuré. Quelqu'un l'a frappé de l'intérieur, la nuit de la Germination. La Graine voulait sortir."), FACE('Nova', "... Ou elle voulait rentrer chez elle.")],
    6: [FACE('Horace', "Un dernier conseil, jeune horloger : le temps qui s'arrête, ce n'est jamais un accident. Quelqu'un, quelque part, est en train de le tordre.")],
    7: [{ pic: 'isles', t: "Le Sceau du Lagon remonte de l'eau, porté par une nageoire immense. Aquorée te le tend, puis te regarde longtemps, comme si elle se souvenait de toi." }, FACE('Tiaré', "Elle n'a jamais voulu la vague. La Graine l'a appelée, et la mer a obéi. Depuis, elle garde le nom de chaque noyé.")],
    8: [FACE('Fanny', "Létha est passée hier. Elle m'a dit de te donner un message : « Il veut que tu gagnes. Fais-le quand même. »")],
    9: [{ pic: 'summit', t: "Les dix Sceaux s'alignent dans ton sac et se mettent à battre ensemble, comme un seul cœur. Ce n'est plus dix Sceaux. C'est la Couture." },
      FACE('Elio', "(Une voix venue du volcan.) Je les ai cousus il y a mille ans, parce que j'avais déchiré le monde en appelant le ciel. Tu viens de finir mon travail. Monte. Je t'attends."),
      { pic: 'ash', t: "Un instant, à travers la fumée, tu vois une femme aux cheveux blancs, couronnée de givre. Elle murmure ton nom. Puis la fumée se referme." }],
  }[f.i];
  return lines;
}
FRAG.forEach(f => {
  STORY_POST[f.k] = async () => {
    G.keys[f.key] = 1; sfx('badge');
    await say(`Tu reçois le ${f.sceau} !`);
    await story(sceauScene(f));
    const gift = [['superbaume', 3], ['supersphere', 5], ['hyperbaume', 3], ['rappel', 3], ['maxibaume', 3], ['hypersphere', 5], ['bonbon', 3], ['maxibaume', 4], ['bonbonmax', 2], ['bonbonmax', 3]][f.i];
    addItem(gift[0], gift[1]); await say(`${f.keeper} te donne ${gift[1]} × ${ITEMS[gift[0]].n}.`);
    if (sceauCount() === 10) { G.keys.couture = 1; sfx('badge'); await say("Tu obtiens la Couture : les dix Sceaux réunis !"); }
    saveGame(true);
  };
});
Object.assign(STORY_POST, {
  chr_saline: async () => story([FACE('Nova', "« R »... Tu crois que c'est la même personne qui a payé l'Éclipse et le Somnis ?")]),
  chr_epine: async () => {
    const c = await choice(FACE('Épine', ''), "Épine hésite au bord du temple.", ["Lui dire que Nova est en vie", "Te taire"]);
    if (c === 0) { G.flags.ilanKnows = 1; await story([FACE('Épine', "... Vivante. Ronce m'a dit qu'il l'avait cherchée trois jours. ... Ne dis rien d'autre. Laisse-moi le temps de comprendre qui m'a menti.")]); }
    else await story([FACE('Épine', "Tu me regardes comme si tu savais quelque chose. Garde-le. Je ne suis pas prêt.")]);
  },
});

/* ---------- 4. Arrivées : les arcs des personnages ---------- */
const FR_ARRIVE = {
  q00: [
    { pic: 'lands', t: "Verdeval. Les vergers des Quatre Terres. Ici, la terre se souvient d'avoir été un seul continent." },
    FACE('Prof. Sauge', "(Par le Lien) Écoute bien. Zénithar a déchiré le monde il y a mille ans. Les déchirures s'appellent les Coutures. Dix Sceaux les tiennent fermées : quatre ici, six à Éclosia."),
    FACE('Prof. Sauge', "Depuis la Germination, les Sceaux faiblissent. L'Éclipse veut les briser. Chaque gardien de Sceau te confiera le sien si tu prouves ta valeur. Le premier est à Pré-Lumière."),
    FACE('Nova', "On récupère des cailloux sacrés avant que des gens en violet ne les cassent. J'ai connu pire comme rendez-vous."),
  ],
  q10: [
    { pic: 'ferry', t: "Azurie. Des ponts de bois au-dessus de l'eau claire. Nova s'arrête au bord du premier ponton et ne bouge plus." },
    FACE('Nova', "Je sais nager. Je te jure. C'est juste que... l'eau d'ici a la même couleur que cette nuit-là."),
  ],
  q30: [
    { pic: 'nox', t: "Ferrhaven. Les cheminées fument jour et nuit. Sur les murs de l'usine de Rouilleport, quelqu'un a peint un soleil noir : l'Éclipse." },
    FACE('Nova', "Ils volent des turbines. Pour la machine de Nox, je parie. Une machine qui boit le Zénith à travers une Couture."),
  ],
  q20: [
    { pic: 'dream', t: "Givrecime. Tout le village de Frimas dort, debout, dans la neige, le sourire aux lèvres. Personne ne grelotte." },
    FACE('Oniris', "(Une voix douce, partout à la fois.) Ils ne souffrent plus du froid. Est-ce si mal ? Un ami m'a offert la carte des Sceaux. Il dit que le sommeil est la seule paix qui tienne."),
    FACE('Nova', "Un « ami ». Bien sûr. On va réveiller tout ce monde-là, et on va trouver qui distribue des cartes."),
  ],
  q40: [
    { pic: 'lands', t: "La Toundra Givrée. Avant la Germination, c'était une île perdue dans les glaces. Aujourd'hui, la Graine la tient soudée à Éclosia par des racines de cristal." },
    FACE('Pr Ysée', "(Par le Lien) Ici, les Sceaux ne retiennent pas une déchirure : ils retiennent les racines. Si la Racine les brise, la Graine poussera à travers tout, sans que personne ne puisse plus la guider."),
    FACE('Nova', "Des gens en lie-de-vin sur la banquise. L'Ordre Racine. ... Si Ilan est là-dedans, je veux le voir avant qu'ils ne le voient, lui."),
  ],
  q50: [
    { pic: 'lantern', t: "Le Sanctuaire des Érables. Les arbres sont rouges depuis dix ans. Les moines disent qu'ils saignent pour quelqu'un." },
    FACE('Nova', "On m'a dit qu'un commandant de la Racine vient prier ici. ... Je reste dehors. Si c'est lui, je ne sais pas ce que je ferais."),
  ],
  q60: [
    { pic: 'lantern', t: "Haut-Valmont, un soir de fête. Des lanternes sur l'eau, des violons sur les quais. Pour la première fois depuis longtemps, Nova ne regarde pas la mer." },
    FACE('Nova', "Viens. Une seule danse. Après, on retourne sauver le monde, promis."),
  ],
  q90: [
    { pic: 'isles', t: "Les Îles Soleil. Sur une plage déserte, un vieil homme aux cheveux blancs plante un jeune arbre dans le sable, là où rien ne poussera jamais." },
    FACE('Vieil homme', "Je viens ici chaque année. Je parle au lagon. Parfois, il me répond. ... Ne fais pas attention à moi. Va chercher ton Sceau."),
    { pic: 'isles', t: "Quand tu te retournes, il est parti. Seul reste l'arbre, et une empreinte de main dans le sable mouillé." },
  ],
  q80: [
    { pic: 'lands', t: "La Plaine de l'Aube. Des moulins, des champs dorés, et des ronces qui poussent là où personne ne les a plantées." },
    FACE('Létha', "Je ne viens pas me battre. J'ai quitté la Racine ce matin. Écoute : Ronce sait que tu ramasses les Sceaux. Il compte dessus. Il veut que tu les portes jusqu'au Mont Éveil."),
    FACE('Létha', "Je ne sais pas pourquoi. Mais quand il sourit en parlant de toi, ça me glace."),
  ],
  q70: [
    { pic: 'ash', t: "L'Archipel Braise. Les volcans grondent. Sur le quai de Cratère-Nord, deux silhouettes que tu connais t'attendent." },
    FACE('Nox', "Pas de machine, cette fois. Juste moi. J'ai cru que je pourrais diriger le Zénith. Je n'étais qu'une pièce dans le jeu de quelqu'un d'autre."),
    FACE('Oniris', "Moi aussi. On a été payés par le même homme pour se détruire l'un l'autre. Alors on a décidé de faire quelque chose ensemble, pour une fois : garder ce Sceau jusqu'à ton arrivée."),
    FACE('Nova', "Nox et Oniris, côte à côte. Si on m'avait dit ça il y a deux mois..."),
  ],
};
for (const id in FR_ARRIVE) {
  const f = FRAG.find(ff => ff.first === id);
  ARRIVE(id, async () => {
    await story(FR_ARRIVE[id]);
    if (id === 'q60') {
      const c = await choice({ pic: 'lantern' }, "Nova te tend la main.", ['Danser avec elle', 'Marcher le long du quai']);
      love();
      await story([c === 0 ? { pic: 'lantern', t: "Vous dansez mal, tous les deux. Ça la fait rire si fort que les musiciens s'arrêtent pour la regarder." } : { pic: 'lantern', t: "Vous marchez jusqu'au bout du quai. Elle pose la tête sur ton épaule et ne dit rien pendant très longtemps." },
        FACE('Nova', "Merci. J'avais oublié qu'on pouvait faire autre chose que se battre.")]);
    }
    if (id === 'q10') {
      const c = await choice(FACE('Nova', ''), "Nova fixe l'eau.", ['Lui prendre la main', "Traverser le premier"]);
      if (c === 0) { love(); await story([FACE('Nova', "... Ta main est chaude. Bon. On traverse. Ne la lâche pas.")]); }
      else await story([FACE('Nova', "Frimeur·se. ... Bon, d'accord. Si tu n'es pas tombé·e, je ne tomberai pas non plus.")]);
    }
  }, () => !!(G && G.flags.st_rival1 && f && f.unlock()));
}

/* ---------- 5. Placement : passeurs, gardiens, agents, requêtes, épilogues ---------- */
const _townExtrasChr = townExtras;
townExtras = function (id, map, spots, R) {
  _townExtrasChr(id, map, spots, R);
  const take = () => spots.splice(Math.floor(R() * spots.length), 1)[0];
  const rk = REGION_OF[id];
  if (rk === 'solvene' || rk === 'brumaire') {
    const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: PALS.sailor, script: 'passeur', speaker: 'Passeur des Coutures', cond: () => FRAG.some(f => f.unlock()) });
  }
  const f = FRAG_BY_REG[rk];
  if (f) {
    if (id === f.first || id === f.last) { const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: PALS.sailor, script: 'retourFrag', speaker: 'Passeur des Coutures' }); }
    if (id === f.last) {
      const s = take();
      if (s) { const t = storyTrainer(f.k, s[0], s[1], 'down', f.pal, 0); if (f.agent) t.cond = () => !!G.flags['st_' + f.agent]; map.npcs.push(t);
        if (f.agent) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: f.pal, speaker: f.keeper, cond: () => !G.flags['st_' + f.agent], text: () => `Je ne peux pas te confier le ${f.sceau} tant que ${STORY_TRAINERS[f.agent].name} rôde à ${TOWNS[f.agentTown].name}. Chasse-l${STORY_TRAINERS[f.agent].name === 'Épine' || STORY_TRAINERS[f.agent].name === 'Dorn' || STORY_TRAINERS[f.agent].name === 'Vex' ? 'e' : 'a'} d'abord.` }); }
    }
    if (f.agent && id === f.agentTown) { const s = take(); if (s) map.npcs.push(storyTrainer(f.agent, s[0], s[1], 'down', AGENT_PAL[f.agent], 3)); }
  }
  REQUETES.forEach((q, i) => { if (!q || q[0] !== id) return; const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: NPC_PALS[(i * 7 + 2) % NPC_PALS.length], script: 'requete', data: i, speaker: q[1] }); });
  if (id === 't0' || id === 'u0') { const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: PALS.prof, script: 'registre', speaker: id === 't0' ? 'Prof. Sauge' : 'Pr Ysée', cond: () => !!G.keys.codex }); }
  EPILOGUES.forEach(e => { if (e.town !== id) return; const s = take(); if (!s) return; const t = storyTrainer(e.k, s[0], s[1], 'down', e.pal, 0); t.cond = () => !!G.flags.newWorld && e.cond(); map.npcs.push(t); });
};

Object.assign(SCRIPTS, {
  async passeur(n) {
    const list = FRAG.filter(f => f.unlock());
    if (!list.length) return say("Les Coutures sont calmes. Reviens quand elles t'appelleront.", { speaker: 'Passeur des Coutures' });
    const items = list.map(f => ({ label: `${f.land}`, right: fragDone(f.i) ? 'Scellé' : f.tag }));
    const r = await menu(items.concat([{ label: 'Rester ici' }]), { x: 34, y: 6, w: 172, rows: 8, title: 'Passeur des Coutures' });
    if (r < 0 || r >= list.length) return;
    const f = list[r];
    G.flags.fragFrom = RT.map.parent || RT.map.id;
    await fade(true, 400);
    await story([{ pic: 'lands', t: `Le Passeur te fait monter dans sa barque. Il rame sans un mot à travers une brume dorée, et la côte de ${f.land} apparaît.` }]);
    await enterMap(f.first, 13, 12, 'down'); await fade(false, 500);
  },
  async retourFrag() {
    const back = G.flags.fragFrom && TOWNS[G.flags.fragFrom] ? G.flags.fragFrom : (G.flags.arrivedB ? 'u0' : 't0');
    const r = await ask(`Rentrer à ${TOWNS[back].name} ?`, ['Oui', 'Non'], { speaker: 'Passeur des Coutures' });
    if (r !== 0) return;
    await fade(true, 400); await enterMap(back, 13, 12, 'down'); await fade(false, 500);
  },
});

/* ---------- 6. Verrous de progression ---------- */
function gateFor(tr) {
  if (!G || !tr) return null;
  if (tr.leader != null) return FRAG.find(f => f.gate.gym === tr.leader && fragNeeded(f.i)) || null;
  const key = tr.flag && tr.flag.startsWith('st_') ? tr.flag.slice(3) : null;
  if (key) return FRAG.find(f => f.gate.story === key && fragNeeded(f.i)) || null;
  return null;
}
function gateMsg(f, who) {
  const where = f.unlock() ? `Le Passeur des Coutures, en ville, peut t'emmener à ${f.land}.` : `Il te faut d'abord avancer encore un peu dans ton voyage.`;
  return `${who ? who + ' : ' : ''}Pas encore. Le ${f.sceau} est en danger et c'est à toi qu'on l'a confié. Va le chercher, puis reviens. ${where}`;
}
const _trainerBattleChr = trainerBattle;
trainerBattle = async function (n, spotted) {
  const f = gateFor(n && n.trainer);
  if (f) { await say(gateMsg(f, trLabel(n.trainer))); return 'gate'; }
  if (n && n.trainer && n.trainer.flag === 'st_semeur' && !G.flags.st_elio_jeune && !G.flags.newWorld) {
    await story([FACE('Nova', "Attends. Le Semeur parle de « testament ». Avant de l'affronter, il faut comprendre comment tout a commencé. Elio, à Unaë, il y a mille ans. Le Chronoportail peut nous y mener.")]);
    return 'gate';
  }
  return _trainerBattleChr(n, spotted);
};
const _enterMapChr = enterMap;
enterMap = async function (id, ...rest) {
  if (G && G.flags.chrInit == null) { G.flags.chrInit = 1; G.flags.chrSkip = FRAG.filter(f => fragPassed(f)).map(f => f.i); if (G.flags.ending) G.flags.chrLegacyAct3 = 1; }
  if (G && RT.map && RT.mode === 'overworld') {
    const f = FRAG.find(ff => ff.gate.map === id && fragNeeded(ff.i) && !G.flags['st_' + ff.gate.story]);
    if (f) { await say(gateMsg(f)); return; }
  }
  return _enterMapChr(id, ...rest);
};
const _chronoChr = SCRIPTS.chrono;
SCRIPTS.chrono = async function (n) {
  if (!G.flags.act4) {
    const miss = ACT3.filter(s => !s.done());
    if (miss.length && !G.flags.chrLegacyAct3) {
      await story([FACE('Elio', `La Faille du Temps attendra. Les autres Failles d'abord : ${miss.map(s => s.short).join(', ')}. On ne regarde pas l'avenir en laissant des blessures ouvertes derrière soi.`)]);
      return;
    }
  }
  return _chronoChr(n);
};

/* ---------- 7. La Chronique : chapitres de l'histoire principale ---------- */
const gymStep = i => ({ t: () => { const L = GYMS[i].leader; return `Badge ${/^Le /.test(L) ? 'du ' + L.slice(3) : /^La /.test(L) ? 'de la ' + L.slice(3) : (/^[AEIOUYÉÈÊÂÎÔaeiouyéèêh]/.test(L) ? "d'" : 'de ') + L} (${TOWNS[GYMS[i].town].name})`; }, done: () => !!G.badges[i], goal: () => ({ map: GYMS[i].town, txt: `Arène de ${TOWNS[GYMS[i].town].name} : ${GYMS[i].leader}, type ${TN[GYMS[i].type]}.`, door: 'gym' }) });
const fragStep = i => ({ t: () => `${FRAG[i].sceau} (${FRAG[i].land})`, done: () => fragDone(i) || fragSkipped(i), frag: i });
const flagStep = (t, fl, goal, short) => ({ t: () => t, short, done: () => !!G.flags[fl], goal });
const ACT3 = [
  flagStep("L'Envers, le monde où Ronce a gagné", 'envDone', () => ({ map: 'u9', txt: "Mont Éveil : traverse la Faille de l'Envers.", npc: 'faille' }), "l'Envers"),
  flagStep("L'Avant, la nuit de la vague", 'avantDone', () => ({ map: 'u9', txt: "Mont Éveil : traverse la Faille de l'Avant.", npc: 'faille' }), "l'Avant"),
  flagStep("Le Rêve d'Oniris", 'reveDone', () => ({ map: 'u6', txt: "Graineval : Oniris t'ouvre la porte du Rêve.", npc: 'reveEntree' }), "le Rêve"),
  flagStep("L'horloge d'Elio, il y a cinq ans", 'passeDone', () => ({ map: 'u9', txt: "Mont Éveil : l'escalier de la Tour d'Elio mène à l'horloge.", npc: 'tourElio' }), "l'horloge"),
  flagStep("Le pardon de Ronce", 'st_ronce_pardon', () => ({ map: 'sanct_nuit', txt: "Cœur de la Graine : une racine mène aux Profondeurs. Ronce y parle à la Graine.", npc: 'profondeurs' }), "les Profondeurs"),
];
const CHAPTERS = [
  { t: 'I · Retour à Bourg-Aurore', h: 5, steps: [
    flagStep('Choisir ta première créature', 'starter', () => ({ map: 't0', txt: "Va chercher ta première créature au labo du Prof. Sauge.", door: 'lab' })),
    fragStep(0), gymStep(0), gymStep(1)] },
  { t: 'II · La Côte et la Forge', h: 8, steps: [fragStep(1), gymStep(2), gymStep(3), fragStep(2)] },
  { t: 'III · Éclipse sur le Zénith', h: 11, steps: [gymStep(4), gymStep(5), gymStep(6), gymStep(7), fragStep(3),
    { t: () => 'Devenir Champion·ne des Quatre Terres', done: () => !!G.keys.ticket, goal: () => ({ map: 't9', txt: "Plateau de la Ligue : deviens champion·ne des Quatre Terres.", door: 'league' }) }] },
  { t: 'IV · La Traversée', h: 4, steps: [
    flagStep('Prendre le ferry pour Éclosia', 'arrivedB', () => ({ map: 't3', txt: "Port-Corail : prends le ferry pour Éclosia.", npc: 'dock' })),
    fragStep(4), gymStep(8)] },
  { t: "V · Les Gardiens d'Éclosia", h: 10, steps: [gymStep(9), gymStep(10), fragStep(5), gymStep(11), gymStep(12)] },
  { t: 'VI · Les Six Pétales', h: 9, steps: [fragStep(6), gymStep(13), fragStep(7), gymStep(14), gymStep(15)] },
  { t: "VII · L'Éveil", h: 8, steps: [fragStep(8),
    flagStep('Affronter Maître Ronce au Cœur de la Graine', 'st_somnis_nuit2', () => ({ map: 's7', txt: "Le Cœur de la Graine, par la Route 7 d'Éclosia. Maître Ronce y attend.", side: 1 })),
    fragStep(9),
    flagStep('Atteindre le sommet du Mont Éveil', 'ending', () => ({ map: 'u9', txt: "Mont Éveil : grimpe au sommet. La Couture t'ouvrira le chemin.", top: 1 }))] },
  { t: 'VIII · Les Failles', h: 8, steps: ACT3 },
  { t: 'IX · An 31, les Terres Brûlées', h: 12, steps: [
    flagStep('Ouvrir la Faille du Temps', 'act4', () => ({ map: 'u9', txt: "Acte IV : une Faille du Temps s'est ouverte au sommet du Mont Éveil.", npc: 'chrono' })),
    ...[16, 17, 18, 19, 20, 21, 22, 23].map(gymStep),
    flagStep("Délivrer la Reine d'Hiver", 'mereDone', () => ({ map: 'f7', txt: "Acte V : la Reine d'Hiver t'attend au Cœur de la Nécropole.", trainer: 'mere' }))] },
  { t: 'X · Le Nouveau Monde', h: 9, steps: [...[24, 25, 26, 27, 28, 29, 30, 31].map(gymStep),
    flagStep("Rejoindre l'Hiver à la Citadelle", 'st_hiver_echo', () => ({ map: 'n6', txt: "Citadelle Zénith : l'Hiver t'attend.", trainer: 'hiver_echo' }))] },
  { t: 'XI · Unaë et le Semeur', h: 3, steps: [
    flagStep('Voir Elio appeler le ciel, à Unaë', 'st_elio_jeune', () => ({ map: 'a1', txt: "Unaë, mille ans avant : grimpe avec le jeune Elio. Menu > Voyager.", trainer: 'elio_jeune' })),
    flagStep('Affronter le Semeur', 'newWorld', () => ({ map: 'n7', txt: "Cité-Semence : le Semeur s'éveille sous le Cœur.", trainer: 'semeur' }))] },
];
const POSTGAME = [
  { t: 'Ligue des Échos', h: 15, d: "Les 24 champions d'arène t'attendent pour une revanche, du niveau 150 au niveau 520.", prog: () => [GYMS.filter((g, i) => G.flags['echo_' + i]).length, GYMS.length] },
  { t: 'Épilogues', h: 12, d: "Ce que deviennent Ronce, Ilan, Nox, Oniris, Astra, l'Hiver et Elio. Puis la Triade elle-même.", prog: () => [EPILOGUES.filter(e => G.flags['st_' + e.k]).length, EPILOGUES.length] },
  { t: 'Requêtes', h: 8, d: "Des habitants te demandent de leur montrer une créature. Certaines sont disponibles dès le début.", prog: () => [REQUETES.filter((q, i) => q && G.flags['req_' + i]).length, REQUETES.filter(Boolean).length] },
  { t: 'Codex', h: 25, d: "639 créatures. Le Prof. Sauge et la Pr Ysée récompensent chaque palier.", prog: () => [Object.keys(G.caught).length, DEX.length] },
  { t: "Tour de l'Infini", h: 15, d: "Vingt étages, jusqu'au niveau 999, puis l'Écho Oméga.", prog: () => [Math.min(20, G.flags.infFloor || 0) + (G.flags.omega ? 1 : 0), 21] },
  { t: 'Légendaires', h: 5, d: "Aubéris, Nocturnis, Éveillon, Volcanis, Givraël, Tonnorage et la Triade.", prog: () => [['auberis', 'nocturnis', 'aquoree', 'aubere', 'nocturne', 'eveillon', 'volcanis', 'givrael', 'tonnorage'].filter(s => G.caught[s]).length, 9] },
];
function stepGoal(s) {
  if (s.frag != null) {
    const f = FRAG[s.frag];
    if (!f.unlock()) return null;
    return { map: '__frag', txt: `${f.sceau} : le Passeur des Coutures, en ville, t'emmène à ${f.land}. ${f.keeper} t'y attend, à ${TOWNS[f.last].name}.`, npc: 'passeur', frag: f.i };
  }
  return s.goal ? s.goal() : null;
}
function currentStep() {
  for (const ch of CHAPTERS) for (const s of ch.steps) if (!s.done()) return { ch, s };
  return null;
}
function nearestTownWithPasseur(cur) {
  const rk = REGION_OF[cur]; const R = REGIONS[rk];
  if (!R || !(rk === 'solvene' || rk === 'brumaire')) return G.flags.arrivedB ? 'u0' : 't0';
  if (TOWNS[cur]) return cur;
  const i = R.chain.indexOf(cur); if (i < 0) return R.chain[0];
  return R.chain[i - 1] && TOWNS[R.chain[i - 1]] ? R.chain[i - 1] : R.chain[i + 1];
}
const _gpsGoalChr = gpsGoal;
gpsGoal = function () {
  if (!G) return _gpsGoalChr();
  const c = currentStep();
  if (!c) return _gpsGoalChr();
  const g = stepGoal(c.s);
  if (!g) return _gpsGoalChr();
  if (g.map === '__frag') {
    const m = RT.map, cur = m ? (m.kind === 'int' ? m.parent : m.id) : 't0';
    return Object.assign({}, g, { map: nearestTownWithPasseur(cur) });
  }
  return g;
};
const _gpsLocalChr = gpsLocalGoal;
gpsLocalGoal = function (rk, cur) {
  const f = FRAG_BY_REG[rk];
  if (!f) return _gpsLocalChr(rk, cur);
  if (f.agent && !G.flags['st_' + f.agent] && !fragDone(f.i)) return { map: f.agentTown, txt: `${f.land} : ${STORY_TRAINERS[f.agent].name} menace le Sceau. Trouve-l${['Épine', 'Dorn', 'Vex'].includes(STORY_TRAINERS[f.agent].name) ? 'e' : 'a'} à ${TOWNS[f.agentTown].name}.`, trainer: f.agent };
  if (!fragDone(f.i)) return { map: f.last, txt: `${f.land} : ${f.keeper} garde le ${f.sceau} à ${TOWNS[f.last].name}.`, trainer: f.k };
  return { map: TOWNS[cur] && (cur === f.first || cur === f.last) ? cur : f.last, txt: `${f.sceau} obtenu. Le Passeur des Coutures te ramène.`, npc: 'retourFrag' };
};

/* Écran de la Chronique (menu Écrits) */
async function chroniqueScreen() {
  while (true) {
    const cs = currentStep();
    const items = CHAPTERS.map(ch => { const d = ch.steps.filter(s => s.done()).length; return { label: ch.t, right: d === ch.steps.length ? 'fini' : `${d}/${ch.steps.length}` }; });
    items.push({ label: 'Après l\'histoire', right: G.flags.newWorld ? 'ouvert' : 'fermé' });
    const tot = CHAPTERS.reduce((a, ch) => a + ch.h, 0);
    const r = await menu(items, { x: 6, y: 4, w: 228, rows: 10, title: cs ? `Chronique · ${cs.s.t()}` : `Chronique · histoire terminée (env. ${tot} h)`, sel: cs ? CHAPTERS.indexOf(cs.ch) : CHAPTERS.length });
    if (r < 0) return;
    const p = el('panel chron', 0, 0, 240, 160);
    if (r < CHAPTERS.length) {
      const ch = CHAPTERS[r];
      p.innerHTML = `<div class="ptitle">${esc(ch.t)} <small>· env. ${ch.h} h</small></div><div class="chl">${ch.steps.map(s => `<div class="${s.done() ? 'ok' : s === (cs && cs.s) ? 'cur' : ''}">${s.done() ? '✓' : s === (cs && cs.s) ? '▸' : '·'} ${esc(s.t())}${s.frag != null && fragSkipped(s.frag) && !fragDone(s.frag) ? ' <em>(facultatif pour cette sauvegarde)</em>' : ''}</div>`).join('')}</div><p class="chh">Histoire principale : env. ${tot} h · Sceaux ${sceauCount()}/10</p>`;
    } else {
      p.innerHTML = `<div class="ptitle">Après l'histoire <small>· env. 80 h</small></div><div class="chl">${POSTGAME.map(q => { const [a, b] = q.prog(); return `<div><b>${esc(q.t)}</b> ${a}/${b} · env. ${q.h} h<br><small>${esc(q.d)}</small></div>`; }).join('')}</div>`;
    }
    await waitKey(); p.remove();
  }
}
const _libraryChr = libraryScreen;
(function css() {
  const st = document.createElement('style');
  st.textContent = `.chron .ptitle small{font-weight:400;color:#5a6274}.chl{display:flex;flex-direction:column;gap:calc(var(--px)*1.6);font-size:calc(var(--px)*7.2);max-height:calc(var(--px)*118);overflow:hidden}.chl .ok{color:#7a8290}.chl .cur{color:var(--accent);font-weight:600}.chl em{font-style:normal;color:#8a92a0}.chl small{color:#5a6274;font-size:calc(var(--px)*6.2)}.chh{position:absolute;left:calc(var(--px)*8);bottom:calc(var(--px)*4);margin:0;font-size:calc(var(--px)*6.5);color:#5a6274}`;
  document.head.appendChild(st);
})();

/* Fin de l'Acte III : ce n'est plus la fin du jeu */
multiEnd = async function () {
  if (G.flags.multiEnd) return; G.flags.multiEnd = 1;
  await story([
    { pic: 'rift', duo: 1, t: "Les deux Failles se referment derrière vous. L'Envers est libre. La nuit de la Germination a eu lieu, comme elle devait avoir lieu." },
    { pic: 'tree', t: "Elio vous attend au pied du Mont Éveil. « Un monde qui aurait pu être pire. Un monde qui ne pouvait pas être meilleur. Et le vôtre, au milieu. »" },
    { pic: 'lantern', t: "Ce soir-là, à Graineval, on allume une lanterne pour chaque monde. Nova en allume une quatrième, sans dire pour qui." },
    { pic: 'seed', t: "Mais la Graine n'a pas fini de parler. Elle n'est pas une plante, murmure Elio. Et ce qui l'a semée attend encore, quelque part dans le temps." },
  ]);
};

/* ---------- 8. Requêtes annexes ---------- */
// [ville, personne, type, niveau minimal, objet, quantité, demande]
const REQUETES = [
  ['t1', 'Jardinière Lou', 'flore', 12, 'superbaume', 3, "Mes tomates ont le cafard. Montre-moi une créature Flore d'au moins niveau 12, ça les motivera."],
  ['t2', 'Mineur Aubin', 'roc', 18, 'supersphere', 4, "Il paraît que les créatures Roc sentent les veines de cristal. Tu en as une, niveau 18 au moins ?"],
  ['q11', 'Pêcheuse Mérine', 'eau', 20, 'hyperbaume', 2, "Ma barque a coulé. Une créature Eau de niveau 20, juste pour la remonter. S'il te plaît."],
  ['t4', 'Électricien Volt', 'foudre', 26, 'rappel', 2, "Panne générale à Voltaville. Une créature Foudre de niveau 26 relancerait le transformateur."],
  ['q31', 'Contremaîtresse Ida', 'acier', 30, 'hypersphere', 3, "L'Éclipse a volé nos meilleures pièces. Une créature Acier niveau 30 pour tenir la ligne de montage ?"],
  ['t5', 'Boulanger Firmin', 'feu', 30, 'bonbon', 2, "Mon four s'est éteint. Une créature Feu de niveau 30, et je te paie en pain. Enfin, en Bonbons."],
  ['t6', 'Liseuse Amé', 'esprit', 34, 'ether', 2, "Je n'arrive plus à rêver. On dit que les créatures Esprit prêtent leurs rêves. Niveau 34 au moins."],
  ['q21', 'Enfant de Lac-Opale', 'givre', 40, 'maxibaume', 2, "Tout le monde dort, sauf moi. Si tu me montres une créature Givre de niveau 40, je n'aurai plus peur."],
  ['t8', 'Dresseuse Ilse', 'dragon', 45, 'bonbon', 3, "Mon père dressait des dragons. Montre-moi un dragon niveau 45, que je sache à quoi ça ressemble de près."],
  ['u1', 'Forgeron Gaspard aîné', 'acier', 52, 'maxibaume', 3, "Mon fils tient l'arène. Moi, je tiens la forge. Une créature Acier niveau 52 pour la trempe ?"],
  ['q41', 'Chasseur Akka', 'givre', 50, 'hypersphere', 5, "Les aurores ont disparu depuis que la Racine creuse. Une créature Givre niveau 50 les rappellera peut-être."],
  ['u2', 'Médecin Frida', 'lumiere', 55, 'rappel', 4, "Les nuits sont longues à Frimabri. Une créature Lumière niveau 55 éclairerait l'infirmerie."],
  ['q51', 'Moine Shin', 'combat', 55, 'bonbonmax', 1, "Le combat est une méditation. Montre-moi une créature Combat niveau 55 qui l'a compris."],
  ['u3', 'Poète Lazare', 'vent', 58, 'bonbon', 3, "Il me manque une rime en « vent ». Une créature Vent niveau 58 me l'inspirera."],
  ['q62', 'Rosiériste Clémence', 'flore', 60, 'maxibaume', 4, "Mes roses bleues refusent de pousser. Une créature Flore niveau 60, pour leur montrer l'exemple."],
  ['u5', 'Veilleur Sorin', 'ombre', 62, 'spherenuit', 6, "À Érablaie, l'ombre parle. Montre-moi une créature Ombre niveau 62 qui sait l'écouter."],
  ['q91', 'Surfeuse Hina', 'eau', 64, 'bonbonmax', 1, "Les vagues sont trop calmes. Une créature Eau niveau 64 pour les réveiller un peu ?"],
  ['u6', 'Archiviste Lin', 'esprit', 64, 'ether', 3, "Les registres de rêves se brouillent. Une créature Esprit niveau 64 pour les remettre en ordre."],
  ['q81', 'Meunier Barnabé', 'vent', 66, 'bonbon', 4, "Les moulins tournent sans vent, mais pas sans fatigue. Une créature Vent niveau 66, par pitié."],
  ['u7', 'Plongeur Teva', 'toxine', 66, 'totalsoin', 4, "Des méduses venimeuses partout. Une créature Toxine niveau 66 saura leur parler."],
  ['q72', 'Potière Cendre', 'feu', 74, 'bonbonmax', 2, "Mon four à céramique est mort avec l'éruption. Une créature Feu niveau 74 le rallumera."],
  ['u8', 'Capitaine Mael', 'dragon', 70, 'bonbonmax', 2, "Je cherche un équipage. Un dragon niveau 70 ferait un excellent second."],
  ['f1', 'Survivante Aude', 'normal', 85, 'bonbonmax', 3, "Dans les cendres, on oublie à quoi ressemble une créature heureuse. Montre-m'en une, niveau 85."],
  ['n3', 'Colon Yrsa', 'lumiere', 115, 'bonbonmax', 4, "Le Nouveau Monde a besoin de lumière. Une créature Lumière niveau 115, pour bénir la première maison."],
];
SCRIPTS.requete = async function (n) {
  const i = n.data, q = REQUETES[i], [, who, type, lvl, item, qty, text] = q;
  if (G.flags['req_' + i]) return say(pick(Math.random, ["Merci encore. Je pense souvent à ta créature.", "Tout va mieux depuis ton passage.", "Reviens quand tu veux. Il y a toujours du thé."]), { speaker: who });
  await say(text, { speaker: who });
  const m = G.party.find(mm => SP[mm.sp].types.includes(type) && mm.lvl >= lvl);
  if (!m) return say(`(Il te faut une créature de type ${TN[type]} de niveau ${lvl} ou plus dans ton équipe.)`);
  await say(`Tu montres ${monName(m)}.`);
  G.flags['req_' + i] = 1; addItem(item, qty); sfx('item');
  await say(`${who} est ravi·e. Tu reçois ${qty} × ${ITEMS[item].n} !`);
};
const REG_TIERS = [[50, 'supersphere', 10], [100, 'hypersphere', 10], [200, 'bonbonmax', 3], [300, 'bonbonmax', 5], [400, 'maxibaume', 10], [500, 'bonbonmax', 10], [639, 'bonbonmax', 30]];
SCRIPTS.registre = async function (n) {
  const c = Object.keys(G.caught).length;
  const next = REG_TIERS.find(([k], j) => !G.flags['reg_' + j]);
  const j = REG_TIERS.findIndex(([k], jj) => !G.flags['reg_' + jj]);
  if (!next) return say(`Les 639 créatures. Toutes. Tu as écrit le Codex le plus complet de l'histoire. Merci.`, { speaker: n.speaker });
  if (c < next[0]) return say(`${c} créatures capturées. Reviens à ${next[0]} : j'aurai quelque chose pour toi. Les arrière-pays des Sceaux abritent des espèces qu'on ne voit nulle part ailleurs.`, { speaker: n.speaker });
  G.flags['reg_' + j] = 1; addItem(next[1], next[2]); sfx('item');
  await say(`${next[0]} créatures ! Le Codex s'épaissit. Tiens : ${next[2]} × ${ITEMS[next[1]].n}.`, { speaker: n.speaker });
  if (next[0] === 639) await say("La dernière page du Codex est blanche. C'est à toi de l'écrire, maintenant.", { speaker: n.speaker });
};

/* ---------- 9. Après l'histoire : Ligue des Échos ---------- */
const _talkChr = talk;
talk = async function (n) {
  const tr = n && n.trainer;
  if (tr && tr.leader != null && G.flags.newWorld && G.flags[tr.flag] && !G.flags['echo_' + tr.leader]) {
    const i = tr.leader, g = GYMS[i], L = Math.min(LVL_CAP, 150 + i * 12);
    const r = await ask(`${g.leader} : Le Nouveau Monde a besoin de champions qui progressent encore. Revanche au niveau ${L} ?`, ['Oui', 'Plus tard'], { speaker: g.leader });
    if (r !== 0) return;
    const team = g.team.map(([s, l], k) => [evolveForLevel(s, L), L - (g.team.length - 1 - k)]);
    while (team.length < 6) { const extra = vetTeam(g.type, L, 1, 'echo' + i + ':' + team.length)[0]; team.unshift([extra[0], L - 6 + team.length]); }
    const res = await _trainerBattleChr({ pal: n.pal, trainer: { cls: 'leader', name: g.leader, team, intro: "Cette fois, je ne retiens rien. Ni mes coups, ni ma joie.", lose: "Voilà pourquoi on t'appelle encore. Merci.", flag: 'echo_' + i, music: 'boss', money: 60 } });
    if (res === 'win') { const k = GYMS.filter((gg, j) => G.flags['echo_' + j]).length; addItem('bonbonmax', 2); await say(`Écho ${k}/${GYMS.length}. Tu reçois 2 Bonbons Stellaires.`); if (k === GYMS.length) { sfx('badge'); await say("Tous les Échos sont vaincus. Ta Carte de dresseur porte maintenant la marque de la Ligue des Échos."); G.keys.echos = 1; } }
    return;
  }
  return _talkChr(n);
};
KEY_ITEMS.echos = { n: 'Marque des Échos', d: 'Les champions d\'arène vaincus une seconde fois, au sommet de leur force.' };

/* ---------- 10. Épilogues ---------- */
const EPILOGUES = [
  { k: 'epi_ronce', town: 'z0', pal: PALS.ronce, cond: () => true },
  { k: 'epi_ilan', town: 'u0', pal: PALS.epine, cond: () => true },
  { k: 'epi_nox', town: 'q31', pal: PALS.nox, cond: () => true },
  { k: 'epi_oniris', town: 'u6', pal: PALS.oniris, cond: () => true },
  { k: 'epi_astra', town: 't9', pal: PALC.astra, cond: () => true },
  { k: 'epi_hiver', town: 'n2', pal: PALS.hiver, cond: () => true },
  { k: 'epi_elio', town: 'a0', pal: PALS.elio, cond: () => true },
  { k: 'epi_triade', town: 't0', pal: PALS.elio, cond: () => EPILOGUES.slice(0, 7).every(e => G.flags['st_' + e.k]) },
];
Object.assign(STORY_TRAINERS, {
  epi_ronce: { cls: 'veteran', name: 'Aurèle', team: vetTeam('flore', 300, 5, 'epironce').concat([['nocturnis', 302]]), intro: "On m'appelait Ronce. Je reprends mon nom, Aurèle. Je plante un arbre par personne que la mer a prise. Il en reste quatre mille. Aide-moi à finir la journée.", lose: "Tu sais ce qui pousse le mieux, ici ? Les pommiers. Elouan les aimait.", music: 'boss', money: 200 },
  epi_ilan: { cls: 'veteran', name: 'Ilan', team: vetTeam('ombre', 320, 6, 'epiilan'), intro: "Nova m'a appris à pêcher. Moi, son grand frère. Je suis nul. Alors je me défoule autrement : un combat, pour fêter ça.", lose: "Elle a choisi quelqu'un de bien. Je voulais juste vérifier par moi-même.", music: 'boss', money: 200 },
  epi_nox: { cls: 'veteran', name: 'Nox', team: vetTeam('acier', 340, 6, 'epinox'), intro: "L'usine de Rouilleport devient un hôpital. Mes turbines chaufferont les salles de soin. Ça ne répare rien, mais ça soigne quelque chose.", lose: "Merci. Je n'ai jamais su perdre. J'apprends.", music: 'boss', money: 200 },
  epi_oniris: { cls: 'veteran', name: 'Oniris', team: vetTeam('esprit', 360, 6, 'epioniris'), intro: "Je me lève avant l'aube, maintenant. Chaque matin. Je regarde le monde s'éveiller, et j'ai encore peur. Mais je regarde. Montre-moi pourquoi ça vaut le coup.", lose: "Voilà. C'est pour ça. Pour la surprise.", music: 'boss', money: 200 },
  epi_astra: { cls: 'champion', name: 'Astra', team: vetTeam('dragon', 400, 6, 'epiastra'), intro: "Les Quatre Terres ont deux Champions, maintenant, et ça n'a aucun sens. Réglons ça comme il faut.", lose: "Garde le titre. Moi, je vais enfin voyager. Éclosia, l'An 31, le Nouveau Monde... tout.", music: 'boss', money: 400 },
  epi_hiver: { cls: 'reine', name: "L'Hiver", team: vetTeam('givre', 450, 6, 'epihiver'), intro: "La poterie, c'est difficile. Les combats, beaucoup moins. Tu veux voir mes progrès ? Les deux.", lose: "Ce bol est raté. Ce combat aussi. Je suis heureuse quand même. C'est nouveau.", music: 'boss', money: 400 },
  epi_elio: { cls: 'ancien', name: 'Elio', team: vetTeam('vent', 600, 5, 'epielio').concat([['auberis', 602]]), intro: "Je suis revenu là où j'ai appelé le ciel. Mille ans plus tard, je n'ai plus rien à garder. Un dernier combat, pour l'enfant que j'étais.", lose: "Merci. Je peux vieillir, maintenant. C'est le plus beau cadeau qu'on m'ait fait.", music: 'boss', money: 600 },
  epi_triade: { cls: 'entite', name: 'La Triade', team: [['volcanis', 795], ['givrael', 796], ['tonnorage', 797], ['aquoree', 798], ['nocturnis', 799], ['auberis', 800]], intro: "Zénithar, Germalis et Aquorée se posent sur la plage de Bourg-Aurore. Le ciel, la vie, la mémoire. Ils ne parlent pas. Ils attendent que tu leur montres ce que les humains ont fait de leur monde.", lose: "Les trois gardiens inclinent la tête. Puis, pour la première fois depuis mille ans, ils s'en vont chacun de leur côté, libres.", music: 'boss', money: 999 },
});
Object.assign(STORY_POST, {
  async epi_ronce() { addItem('bonbonmax', 4); await story([{ pic: 'tree', t: "Sur les ruines de Nacre, quatre mille arbres. Le dernier est un pommier. Aurèle pose la main sur l'écorce et ferme les yeux." }]); },
  async epi_ilan() { addItem('bonbonmax', 4); await story([{ pic: 'siblings', t: "Nova arrive en courant, un seau de poissons minuscules à la main. Ilan rit. Elle lui lance le seau à la figure. C'est la meilleure journée de sa vie." }]); },
  async epi_nox() { addItem('bonbonmax', 4); await story([{ pic: 'nox', t: "Sur la façade de l'usine, le soleil noir de l'Éclipse a été repeint en jaune. Un enfant y a ajouté des rayons, et un sourire." }]); },
  async epi_oniris() { addItem('bonbonmax', 4); await story([{ pic: 'dream', t: "Oniris s'assoit sur le toit de Graineval. Le soleil se lève. Il ne détourne pas les yeux." }]); },
  async epi_astra() { addItem('bonbonmax', 5); await story([FACE('Astra', "Si tu croises une femme en manteau doré sur les routes de l'An 31, ce sera moi. Je te devrai une revanche. Une vraie.")]); },
  async epi_hiver() { addItem('bonbonmax', 5); await story([FACE("L'Hiver", "Nova est venue hier. On a ri de la même chose au même moment. C'était très bizarre. Et très bien.")]); },
  async epi_elio() { addItem('bonbonmax', 6); await story([{ pic: 'unae', t: "Elio redescend la montagne à pied, lentement, comme n'importe quel vieil homme. Au pied du Mont Éveil, un enfant d'Unaë lui demande son nom. Il répond : « Personne d'important. » Il sourit en le disant." }]); },
  async epi_triade() {
    G.flags.chroniqueComplete = 1; G.keys.triade = 1; addItem('bonbonmax', 20); sfx('badge');
    await story([
      { pic: 'zenith', t: "Zénithar s'élève et disparaît dans le ciel, là où il a toujours dû être : au-dessus de tout, sans rien tenir." },
      { pic: 'germalis', t: "Germalis s'enfonce dans la terre de Bourg-Aurore. Au printemps suivant, des fleurs blanches pousseront dans le jardin de ta mère." },
      { pic: 'isles', t: "Aquorée glisse dans la mer. Elle ne pleure plus. Elle chante. Les pêcheurs disent que la pêche est meilleure depuis." },
      FACE('Nova', "C'est fini ? Pour de vrai ? ... Alors on rentre. On a un jardin qui nous attend."),
      { pic: 'lantern', t: "LA CHRONIQUE EST COMPLÈTE. Merci d'avoir joué à Éclosia. Le monde, tous les mondes, restent ouverts." },
    ]);
    await say("Tu reçois la Plume de la Triade et 20 Bonbons Stellaires.");
  },
});
KEY_ITEMS.triade = { n: 'Plume de la Triade', d: "Une plume dorée, une feuille blanche et une goutte d'eau de mer, liées ensemble. Le monde n'a plus besoin de gardiens." };

/* ============================================================
   ÉCLOSIA — La Chronique, deuxième partie : enrichissement
   Indices, liens entre personnages, choix à conséquences,
   siège de Valmont, épreuves des régions, la mère, Nova en combat,
   feux de camp, guerre d'Unaë, dialogues de route, récapitulatif.
   Rien n'est retiré : tout s'ajoute à l'existant.
   ============================================================ */

/* ---------- Petits outils ---------- */
const chain2 = (key, fn, table) => { const prev = table[key]; table[key] = async function (...a) { if (prev) await prev.apply(this, a); await fn.apply(this, a); }; };
const before2 = (key, fn, table) => { const prev = table[key]; table[key] = async function (...a) { await fn.apply(this, a); if (prev) await prev.apply(this, a); }; };
const aff = () => (G && G.flags.aff) || 0;

/* ---------- 1. Les indices : la science-fiction annoncée dès le début, et « R » ---------- */
const NEW_LORE2 = [
  ['sf1', 't2', 'stele', "Fresque de Mousselande", "Sur la paroi, un œuf de métal tombe du ciel, entouré de flammes. Sous lui, des hommes minuscules s'agenouillent. L'œuf a des yeux, ou peut-être des hublots.", "Les mineurs disent que la fresque a plus de mille ans. Personne ne sait pourquoi des gens d'il y a mille ans auraient dessiné une chose de métal."],
  ['sf2', 't4', 'archive', "Relevés de Kael, apprentie", "Onde enregistrée sous la centrale : une pulsation toutes les 9,873 secondes. Pas une de plus, pas une de moins. Aucune machine humaine n'est aussi régulière.", "Note pour moi-même : 9 873. J'ai déjà vu ce nombre quelque part. Dans un rêve ? Le Prof. Sauge dit que je travaille trop."],
  ['sf3', 'u0', 'stele', "Inscription des ruines de Port-Sève", "Des symboles sortis de la mer avec la Graine. Ils se répètent par groupes de six, comme un compte. Les archivistes y lisent une prière. Kael, venue exprès de Voltaville, y lit un inventaire.", "Le dernier groupe de symboles est gravé plus profond que les autres. Si c'est un compte, il arrive bientôt à son terme."],
  ['sf4', 'u2', 'journal', "Journal d'un pêcheur de Frimabri", "La nuit, le Sceau du Frimas clignote sous la glace. Trois longs, deux courts, trois longs. Toujours pareil.", "Ma fille dit que c'est un message. Je lui ai dit que les pierres ne parlent pas. Elle m'a répondu : « Celle-là, si. Elle compte. »"],
  ['sf5', 't6', 'livre', "Registre des rêves de Mirage-Sud, page 412", "Rêve rapporté par cent douze personnes la même nuit : une voix sans bouche compte à rebours. Elle ne menace pas. Elle s'excuse.", "Mirage, championne de l'arène, a ajouté en marge : « Je l'ai fait aussi. La voix disait : moisson. »"],
  ['r1', 'q31', 'lettre', "Plans des turbines, abandonnés par l'Éclipse", "Des plans d'une précision folle pour aspirer l'énergie d'une Couture. En bas de la dernière page, une seule lettre, à l'encre verte : « R ».", "L'écriture penche fort vers la droite, comme si la main avait toujours peur d'arriver en retard."],
  ['r2', 'q21', 'lettre', "Carte des dix Sceaux, laissée par Kriss", "Une carte dessinée à la main, avec l'emplacement exact des dix Sceaux. Même Elio n'a jamais laissé de carte pareille.", "Au dos : « Pour Oniris, qui veut la paix. Le sommeil est une paix comme une autre. R. » La même encre verte. La même écriture penchée."],
  ['r3', 'z0', 'lettre', "Lettre retrouvée dans les ruines de Nacre", "« Sauge, Lierre, venez vite. Petite respire, je vous jure qu'elle respire. Liora rit de moi. Elouan l'appelle sa sœur. A. »", "L'encre est verte. L'écriture penche fort vers la droite. Tu as déjà vu cette main-là, sur des plans et sur une carte."],
  ['r4', 'u4', 'archive', "Reçu d'un mécène", "« Versé à l'Ordre Racine pour l'entretien des serres de Graineval : quarante mille écus. » Signé : R.", "Le même mécène a versé exactement la même somme à l'Éclipse et au Somnis, le même jour. Il ne voulait pas qu'un Ordre gagne. Il voulait qu'ils s'usent."],
  ['un1', 'a0', 'stele', "Stèle d'Unaë", "La Terre veut les plaines. L'Océan veut les côtes. Trois générations de guerre pour une ligne de sable que la mer efface chaque jour.", "Quelqu'un a gravé, maladroitement, en dessous : « Un jour, quelqu'un appellera le ciel. Et le ciel répondra trop fort. »"],
];
NEW_LORE2.forEach(([id, map, k, t, a, b]) => { const L = { id, map, k, t, p: [a, b] }; LORE_TEXTS.push(L); LORE_BY_ID[id] = L; });

/* ---------- 2. Les liens entre personnages ---------- */
// Chaque gardien de Sceau est l'ancien maître d'un champion d'arène.
const MENTOR = { 0: 0, 2: 1, 3: 2, 6: 3, 9: 4, 12: 5, 10: 6, 14: 7, 13: 8, 15: 9 };
for (const gi in MENTOR) {
  const f = FRAG[MENTOR[gi]], g = GYMS[gi], tr = STORY_TRAINERS[f.k];
  if (tr && g) tr.intro = `${g.leader}, de l'arène de ${TOWNS[g.town].name}, a été mon élève. ` + tr.intro;
}
const _postTrainer2 = postTrainer;
postTrainer = async function (n, tr) {
  await _postTrainer2(n, tr);
  if (tr.leader == null) return;
  const i = tr.leader;
  if (MENTOR[i] != null) {
    const f = FRAG[MENTOR[i]];
    await say(fragDone(f.i) ? `${f.keeper} t'a confié son Sceau ? Alors je n'ai plus rien à t'apprendre. C'est mon vieux maître qui m'a appris à perdre avec le sourire.` : `Mon vieux maître, ${f.keeper}, garde le ${f.sceau} à ${f.land}. Passe le saluer de ma part.`, { speaker: GYMS[i].leader });
  }
  if (i === 11 && !G.badges[12]) await siegeStart();
};

/* ---------- 3. Des choix qui comptent ---------- */
chain2('chr_vex', async () => {
  const c = await choice({ pic: 'lands' }, "Vex jette sa pelle dans la neige et attend.", ['Le laisser partir', 'Le livrer aux Gardiens']);
  if (c === 0) { G.flags.vexSpared = 1; await story([FACE('Vex', "... Tu me laisses partir ? Personne ne m'a jamais laissé partir. Je m'en souviendrai.")]); }
  else { G.flags.vexJailed = 1; await story([FACE('Vex', "D'accord. C'est juste. Je n'aurais pas dû tenir cette pelle.")]); }
}, STORY_POST);
before2('somnis_nuit1', async () => {
  if (G.flags.vexSpared) await story([FACE('Vex', "Je t'avais dit que je m'en souviendrais. Ronce m'a forcé à revenir. Je dois me battre... mais je ne viserai pas fort. Et après, je file prévenir les Gardiens qu'il prépare quelque chose.")]);
  else if (G.flags.vexJailed) await story([FACE('Vex', "Ronce m'a sorti de prison. Il dit que la gratitude, c'est une chaîne comme une autre. Je ne sais plus de quel côté je suis.")]);
}, STORY_PRE);
before2('somnis_u5', async () => {
  if (G.flags.ilanKnows) await story([FACE('Épine', "Tu m'as dit qu'elle était vivante. Depuis, je ne dors plus. Si je perds ce combat, je pose des questions à Ronce. Alors je vais me battre comme si je voulais perdre."), FACE('Nova', "... Ilan ?")]);
}, STORY_PRE);
chain2('somnis_u5', async () => { if (G.flags.ilanKnows) { G.flags.ilanDoubt = 1; await story([{ pic: 'siblings', t: "Épine baisse les yeux vers Nova. Il ne dit rien. Mais il ne s'enfuit pas, cette fois. Il recule lentement, sans jamais la quitter du regard." }]); } }, STORY_POST);
// Conséquences dans l'après-jeu
before2('epi_ilan', async () => { if (G.flags.ilanDoubt) await story([FACE('Ilan', "Le jour où tu m'as dit qu'elle vivait, j'ai commencé à mourir de l'intérieur, en tant qu'Épine. Merci. C'est la meilleure chose qu'on m'ait faite.")]); }, STORY_PRE);
before2('epi_ronce', async () => { if (G.flags.warned) await story([FACE('Aurèle', "Une étrangère m'avait prévenu, la veille de la vague. Je ne l'ai pas crue. Je sais que c'était toi. Je ne t'en veux pas. Je m'en veux à moi.")]); }, STORY_PRE);
chain2('epi_triade', async () => {
  const bits = [];
  if (G.flags.vexSpared) bits.push("Vex ouvre une auberge à Port-Banquise. Il sert la soupe gratuitement à tous ceux qui ont tenu une pelle un jour.");
  if (G.flags.sistersLink) bits.push("Saline et Létha repeignent ensemble la maison de leur enfance. Elles se disputent sur la couleur des volets. Elles rient beaucoup.");
  if (G.flags.valmontFree) bits.push("À Valmont, on fête chaque année le jour de la libération. Ton nom est gravé sur la fontaine, entre ceux de Céleste et de Nova.");
  if (bits.length) await story(bits.map(t => ({ pic: 'lantern', t })));
}, STORY_POST);

/* ---------- 4. Le moment fort du milieu : le siège de Valmont ---------- */
async function siegeStart() {
  if (G.flags.siegeV) return; G.flags.siegeV = 1;
  await say("Le Lien vibre. La voix de Nova est hachée, comme si elle courait.");
  await story([
    FACE('Nova', "Valmont ! La Racine a forcé le Sceau des Jardins de l'intérieur. Les ronces ont poussé en une heure. Les gens sont coincés chez eux."),
    { pic: 'ronce', t: "Sur la place de Valmont, des ronces plus hautes que les maisons. Au centre, la fontaine est fendue. Céleste, la championne, a le bras en écharpe." },
    FACE('Nova', "Céleste a tenu la place seule pendant deux heures. Ils ont pris sa partenaire, sa créature de toujours. Reviens. Vite."),
  ]);
  saveGame(true);
}
const SIEGE = ['siege3'];
Object.assign(STORY_TRAINERS, {
  siege3: { cls: 'commandant', name: 'Commandant Ortiga', team: mixTeam(['flore', 'acier'], 64, 5, 'siege3'), intro: "Valmont tombera comme tombe une fleur : sans bruit. Maître Ronce m'a confié cette ville. Je ne la rendrai pas.", lose: "Rendue... Il ne me pardonnera pas. Ou peut-être qu'il s'en moque. Il a toujours un autre plan.", music: 'boss', hideAfter: 1, money: 120 },
});
STORY_POST.siege3 = async () => {
  G.flags.valmontFree = 1; sfx('badge');
  await story([
    { pic: 'lantern', t: "Les ronces se dessèchent d'un coup et tombent en poussière. Derrière la fontaine, une cage s'ouvre. La créature de Céleste se jette contre elle." },
    FACE('Céleste', "Je ne te remercierai jamais assez. ... Non, attends. Si : à partir d'aujourd'hui, à Valmont, tu ne paieras plus jamais rien."),
    { pic: 'lantern', t: "Valmont est libre. Mais la fontaine reste fendue. Les habitants décident de ne pas la réparer : elle rappellera ce jour-là." },
    FACE('Nova', "On a gagné. Mais ils ont réussi à briser un Sceau de l'intérieur. Ronce a vraiment un coup d'avance."),
  ]);
  addItem('maxibaume', 5); addItem('bonbon', 3);
  await say("Tu reçois 5 Maxi Baumes et 3 Bonbons. La nouvelle arène d'Érablaie t'attend.");
  saveGame(true);
};
const sieging = () => !!(G && G.flags.siegeV && !G.flags.valmontFree);

/* ---------- 5. Les épreuves des régions ---------- */
const EPREUVES = [
  { reg: 'qt0', kind: 'enigme', town: 'q00', who: 'Conteuse Maïa', q: "Je tiens le monde sans bras, je le déchire sans mains, et je le recouds sans fil. Qui suis-je ?", opts: ['Zénithar', 'La mer', 'Le temps'], ok: 0, gift: ['supersphere', 5] },
  { reg: 'qt1', kind: 'collecte', what: 'Flamme de phare', towns: ['q10', 'q11', 'q12'], who: 'Gardienne des phares', text: "Les trois phares d'Azurie se sont éteints. Rallume-les tous, et l'Écume chantera.", gift: ['hyperbaume', 4] },
  { reg: 'qt3', kind: 'enigme', town: 'q30', who: 'Mécanicien Rivet', q: "Trois engrenages : le premier tourne à droite. Le deuxième touche le premier, le troisième touche le deuxième. Dans quel sens tourne le troisième ?", opts: ['À gauche', 'À droite', 'Il ne tourne pas'], ok: 1, gift: ['rappel', 3] },
  { reg: 'qt2', kind: 'collecte', what: 'Dormeur réveillé', towns: ['q20', 'q20', 'q21', 'q21', 'q22', 'q22'], who: 'Maire de Frimas', text: "Mon village dort debout depuis le passage d'Oniris. Réveille-les tous, un par un. Doucement.", gift: ['maxibaume', 4], sleep: 1 },
  { reg: 'qt4', kind: 'collecte', what: "Éclat d'aurore", towns: ['q40', 'q41', 'q42', 'q43'], who: 'Chasseuse Inua', text: "Les aurores sont tombées du ciel en morceaux quand la Racine a creusé. Rapporte-moi les quatre éclats.", gift: ['hypersphere', 6] },
  { reg: 'qt5', kind: 'enigme', town: 'q50', who: 'Moine Shin', q: "Un érable perd ses feuilles rouges. Qu'est-ce qui tombe vraiment ?", opts: ["Le souvenir de la nuit de la vague", 'Des feuilles', "Rien : l'arbre reste"], ok: 0, gift: ['bonbon', 4] },
  { reg: 'qt6', kind: 'collecte', what: 'Lanterne de fête', towns: ['q60', 'q61', 'q62', 'q63', 'q64'], who: 'Organisatrice Philippine', text: "Le vent a éparpillé les lanternes de la fête dans tout le Haut-Valmont. Rapporte-les toutes, et la fête aura lieu.", gift: ['bonbonmax', 2] },
  { reg: 'qt9', kind: 'enigme', town: 'q90', who: 'Vieille Hana', q: "Aquorée garde quelque chose que la mer a pris. Quoi ?", opts: ['Les noms', 'Les bateaux', "L'or"], ok: 0, gift: ['bonbonmax', 2] },
  { reg: 'qt8', kind: 'collecte', what: 'Gerbe dorée', towns: ['q80', 'q81', 'q82', 'q83'], who: 'Fermière Rosine', text: "Pour la fête des moissons, il faut une gerbe de chaque village de la Plaine. La Racine a tout fait fuir. Tu m'aides ?", gift: ['bonbonmax', 3] },
  { reg: 'qt7', kind: 'duel', town: 'q70', who: 'Nox et Oniris', gift: ['bonbonmax', 4] },
];
const epDone = i => !!(G && G.flags['ep_' + i]);
const epCount = i => { const e = EPREUVES[i]; return e.towns ? e.towns.filter((t, k) => G.flags[`epc_${i}_${k}`]).length : 0; };
Object.assign(STORY_TRAINERS, {
  duel_nox: { cls: 'veteran', name: 'Nox', team: vetTeam('acier', 79, 5, 'duelnox').concat([['tonnorage', 80]]), intro: "Avant de garder ce Sceau ensemble, on veut savoir ce que tu vaux. Moi d'abord. Pas de machine, cette fois.", lose: "Bien. Oniris, à toi.", music: 'boss', money: 100 },
  duel_oniris: { cls: 'veteran', name: 'Oniris', team: vetTeam('esprit', 80, 5, 'duelon').concat([['nocturne', 81]]), intro: "Je ne t'endormirai pas. Je veux juste voir si tu restes éveillé·e jusqu'au bout.", lose: "Éveillé·e jusqu'au bout. Comme le soleil sur les volcans. Tu nous as convaincus.", music: 'boss', money: 100 },
});
STORY_POST.duel_oniris = async () => { G.flags['ep_9'] = 1; addItem('bonbonmax', 4); sfx('item'); await say("Nox et Oniris te donnent 4 Bonbons Stellaires. Épreuve de l'Archipel réussie !"); };
SCRIPTS.epreuve = async function (n) {
  const i = n.data, e = EPREUVES[i];
  if (epDone(i)) return say("Merci encore. La région se souviendra de toi.", { speaker: e.who });
  if (e.kind === 'enigme') {
    await say("Une énigme, pour qui veut mériter la région.", { speaker: e.who });
    const r = await ask(e.q, e.opts, { speaker: e.who, w: 118 });
    if (r !== e.ok) return say("Non. Réfléchis encore, et reviens me voir.", { speaker: e.who });
    G.flags['ep_' + i] = 1; addItem(e.gift[0], e.gift[1]); sfx('item');
    return say(`Exactement. Tu reçois ${e.gift[1]} × ${ITEMS[e.gift[0]].n} !`, { speaker: e.who });
  }
  if (e.kind === 'collecte') {
    const got = epCount(i), need = e.towns.length;
    if (got < need) return say(`${e.text} (${got}/${need})`, { speaker: e.who });
    G.flags['ep_' + i] = 1; addItem(e.gift[0], e.gift[1]); sfx('badge');
    return say(`Tout y est ! ${e.sleep ? "Le village s'étire, bâille, et rit d'avoir dormi si longtemps." : 'La région revit.'} Tu reçois ${e.gift[1]} × ${ITEMS[e.gift[0]].n} !`, { speaker: e.who });
  }
};
SCRIPTS.epPiece = async function (n) {
  const [i, k] = n.data, e = EPREUVES[i];
  if (G.flags[`epc_${i}_${k}`]) return;
  G.flags[`epc_${i}_${k}`] = 1; sfx('item'); refreshNpcs();
  await say(e.sleep ? `Tu poses doucement la main sur l'épaule du dormeur. Il ouvre les yeux. (${epCount(i)}/${e.towns.length})` : `Tu trouves : ${e.what} ! (${epCount(i)}/${e.towns.length})`);
};

/* ---------- 6. Placement des nouveautés ---------- */
const _townExtras2 = townExtras;
townExtras = function (id, map, spots, R) {
  _townExtras2(id, map, spots, R);
  const take = () => spots.splice(Math.floor(R() * spots.length), 1)[0];
  EPREUVES.forEach((e, i) => {
    if (e.kind === 'duel' && e.town === id) {
      const a = take(), b = take();
      if (a) map.npcs.push(storyTrainer('duel_nox', a[0], a[1], 'down', PALS.nox, 0));
      if (b) { const t = storyTrainer('duel_oniris', b[0], b[1], 'down', PALS.oniris, 0); t.cond = () => !!G.flags.st_duel_nox; map.npcs.push(t); }
    }
    if (e.kind !== 'duel' && (e.town === id || (e.towns && e.towns[0] === id))) { const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: NPC_PALS[(i * 3 + 4) % NPC_PALS.length], script: 'epreuve', data: i, speaker: e.who }); }
    (e.towns || []).forEach((t, k) => {
      if (t !== id) return; const s = take(); if (!s) return;
      if (e.sleep) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: NPC_PALS[(k * 5 + 1) % NPC_PALS.length], script: 'epPiece', data: [i, k], speaker: 'Dormeur', cond: () => !G.flags[`epc_${i}_${k}`] });
      else map.npcs.push({ kind: 'item', x: s[0], y: s[1], item: 'baume', flag: `epi_${i}_${k}`, cond: () => !G.flags[`epc_${i}_${k}`], script: 'epPiece', data: [i, k], epPiece: 1 });
    });
  });
  if (id === 'u3') {
    const sp = [take(), take(), take()];
    SIEGE.forEach((k, j) => { const s = sp[j]; if (!s) return; const t = storyTrainer(k, s[0], s[1], 'down', PALS.epine, 2); t.cond = () => sieging(); map.npcs.push(t); });
    const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: NPC_PALS[3], speaker: 'Habitante de Valmont', text: () => sieging() ? "Ils ont enfermé la créature de Céleste derrière la fontaine. On l'entend pleurer toute la nuit." : G.flags.valmontFree ? "On ne réparera pas la fontaine. Les enfants qui naîtront demanderont pourquoi elle est fendue, et on leur racontera." : "Valmont est la ville la plus élégante d'Éclosia. Même les créatures ont du style." });
  }
  if (id === 't4') { const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: { h: '#3a2a22', s: '#e8b48a', c: '#e9a03a', p: '#3a3a4a', style: 'bun' }, speaker: 'Kael, apprentie', text: () => G.flags.act4 ? "Tu as une tête de quelqu'un qui revient de très loin. Du futur ? Ha ! ... Attends. Pourquoi tu me regardes comme si tu me connaissais ?" : G.flags.arrivedB ? "J'ai mesuré la même onde à Éclosia. 9 873 secondes. Elle vient de la Graine. Je ne dors plus." : "Une onde toutes les 9,873 secondes sous la centrale. Les adultes disent que c'est rien. Les adultes disent toujours que c'est rien." }); }
  if (id === 'a0') {
    const a = take(), b = take();
    if (a) map.npcs.push(storyTrainer('un_terre', a[0], a[1], 'down', { h: '#5a3a1a', s: '#c68a5e', c: '#8a6a3a', p: '#4a3a2a', style: 'short', beard: 1 }, 0));
    if (b) map.npcs.push(storyTrainer('un_ocean', b[0], b[1], 'down', { h: '#1a3a5a', s: '#e0b088', c: '#2a6a9a', p: '#1a2a4a', style: 'long' }, 0));
  }
};
// Les objets à ramasser des épreuves : un « item » spécial qui ne donne pas de Baume
const _talk2 = talk;
talk = async function (n) { if (n && n.epPiece) return SCRIPTS.epPiece(n); return _talk2(n); };
// Valmont assiégée : teinte et verrou de l'arène suivante
const _drawOW2 = drawOverworld;
drawOverworld = function (x) { _drawOW2(x); if (RT.map && RT.map.id === 'u3' && sieging()) { x.fillStyle = 'rgba(80,16,52,0.28)'; x.fillRect(0, 0, 240, 160); } };
const _trainerBattle2 = trainerBattle;
trainerBattle = async function (n, spotted) {
  const tr = n && n.trainer;
  if (tr && tr.leader === 12 && sieging()) { await say("Érablaie attendra. Valmont est assiégée et Céleste a besoin de toi. Les gens de là-bas comptent sur toi.", { speaker: GYMS[12].leader }); return 'gate'; }
  if (tr && tr.flag === 'st_elio_jeune' && !(G.flags.st_un_terre && G.flags.st_un_ocean)) { await story([FACE('Nova', "Avant de grimper avec lui, il faut comprendre cette guerre. Les deux camps campent au village d'en bas.")]); return 'gate'; }
  if (tr && !n.story && tr.leader == null && CONTEXT_CLS.has(tr.cls) && !tr._ctx) { tr._ctx = 1; const l = contextLine(); if (l) tr.intro = l; }
  return _trainerBattle2(n, spotted);
};

/* ---------- 7. La mère ---------- */
const MOM_SCENES = [
  { id: 'mom1', cond: () => !!G.keys.ticket, pages: () => [FACE('Maman', "Champion·ne des Quatre Terres. Ta photo est dans le journal. J'ai acheté vingt exemplaires. Ne te moque pas."), FACE('Maman', "Et maintenant, tu pars de l'autre côté de la mer. Comme il y a cinq ans. ... Cette fois, tu écris. Au moins une lettre par arène."), FACE('Maman', "Et ramène Nova. Je l'ai vue grandir aussi, tu sais. Elle mange mal quand tu n'es pas là.")] },
  { id: 'mom2', cond: () => !!G.flags.ending, pages: () => [FACE('Maman', "On dit que tu as parlé au gardien du ciel. Moi, je me souviens surtout de la fois où tu as eu peur d'un Rongeot."), FACE('Maman', "Tu as changé. Pas en mal. Tu regardes les choses plus longtemps avant de répondre. Ton père faisait ça.")] },
  { id: 'mom3', cond: () => !!G.flags.mereDone, pages: () => [{ pic: 'village', t: "Ta mère ne pose pas de questions. Elle voit ton visage et met de l'eau à chauffer." }, FACE('Maman', "Tu reviens d'un endroit où il s'est passé quelque chose de terrible. Ça se voit. Tu n'es pas obligé·e d'en parler. Mais tu restes dîner.")], gift: ['bonbon', 5] },
  { id: 'mom4', cond: () => !!G.flags.newWorld, pages: () => [FACE('Maman', "Nova m'a montré le jardin, au Nouveau Monde. Des roses bleues partout. C'est très laid et très beau à la fois."), FACE('Maman', "Je suis fière de toi. Je te l'ai dit cent fois, mais aujourd'hui, je le pense avec tout ce que je sais. C'est différent.")] },
];
const _mom2 = SCRIPTS.mom;
SCRIPTS.mom = async function (n) {
  const sc = MOM_SCENES.find(s => !G.flags[s.id] && s.cond());
  if (sc) { G.flags[sc.id] = 1; await story(sc.pages()); if (sc.gift) { addItem(sc.gift[0], sc.gift[1]); sfx('item'); await say(`Ta mère glisse ${sc.gift[1]} × ${ITEMS[sc.gift[0]].n} dans ton sac.`); } }
  return _mom2(n);
};

/* ---------- 8. Nova évolue en combat ---------- */
const NOVA_PRE = {
  rival2: () => aff() > 0 ? "Tu me regardes trop. Concentre-toi, sinon je gagne." : "Pas de pitié parce qu'on se connaît depuis toujours. Compris ?",
  rival3: () => G.keys.sceau1 ? "Tu as pris l'eau d'Azurie pour moi. Je n'oublie pas. Mais en combat, je n'ai aucune mémoire." : "Ilan, mon frère... je pense à lui tout le temps. Aide-moi à penser à autre chose : bats-toi.",
  rival4: () => G.flags.couple || aff() >= 2 ? "Si je perds, tu m'offres un dîner. Si je gagne, c'est moi qui l'offre. Dans les deux cas, on dîne ensemble." : "Le Sanctuaire est tout près. J'ai peur de ce qu'on va y trouver. Battons-nous, ça me calme.",
  rival5: () => sceauCount() >= 4 ? "Quatre Sceaux dans ton sac et une Ligue devant nous. Tu portes le monde, et moi je porte tes affaires. Inverse les rôles le temps d'un combat !" : "Un·e seul·e de nous deux entrera premier·ère. Que ce soit toi ou moi, je veux que ce soit beau.",
  rival6: () => G.flags.couple ? "Je me bats contre la personne que j'aime au sommet du monde. Si on m'avait dit ça à onze ans, dans l'eau froide..." : "Tout ce chemin. Toi, moi, et un sommet. Montre-moi qui tu es devenu·e.",
};
for (const k in NOVA_PRE) before2(k, async () => { await say(NOVA_PRE[k](), { speaker: 'Nova' }); }, STORY_PRE);

/* ---------- 9. Feux de camp entre les chapitres ---------- */
const CAMPS = [
  { who: 'Nova', pages: [{ pic: 'camp', t: "Premier feu de camp depuis ton retour. Nova fait griller des pommes de Verdeval. Elle les brûle toutes." }, FACE('Nova', "Cinq ans. Tu n'as jamais écrit. Je ne t'en veux pas. ... Si. Un peu. Pourquoi tu es parti·e ?")], q: 'Que lui répondre ?', opts: ["J'avais peur de rester", 'Je cherchais quelque chose', 'Je ne sais pas'], ans: ["« Moi aussi, j'ai eu peur. Mais je suis restée. On n'a pas eu la même peur, c'est tout. »", "« Et tu l'as trouvé ? ... Ne réponds pas. Tu es revenu·e. Ça me suffit. »", "« C'est la réponse la plus honnête que j'aie entendue depuis des années. »"] },
  { who: 'Nova', pages: [{ pic: 'camp', t: "Feu de camp sur la côte d'Azurie. La mer est calme. Nova lui tourne le dos." }, FACE('Nova', "Tu crois qu'Aquorée se souvient de moi ? La nuit de la vague, j'ai senti quelque chose me pousser vers la plage. Pas me noyer. Me pousser.")], q: 'Ce que tu en penses :', opts: ["Elle t'a sauvée", "C'était le courant", 'Demande-lui un jour'], ans: ["« Alors je lui dois une visite. Et des excuses, pour l'avoir détestée. »", "« Peut-être. C'est plus facile à croire. Mais je préfère l'autre version. »", "« Ha ! Je vais demander à une baleine légendaire si elle se souvient de moi. Pourquoi pas. »"] },
  { who: 'Nova', pages: [{ pic: 'camp', t: "La veille de la Ligue. Le feu crépite au pied de la Tour du Zénith. Nova polit les Sceaux un par un, très sérieusement." }, FACE('Nova', "Quatre Sceaux. Une Ligue. Et après, la mer. Tu sais ce qui me fait peur ? Pas la Racine. Pas Ronce. Trouver Ilan, et qu'il ne me reconnaisse pas.")], q: 'Que lui dire ?', opts: ['Il te reconnaîtra', 'Je serai là', 'On verra bien'], ans: ["« Tu n'en sais rien. Mais merci de le dire comme si tu le savais. »", "« ... Je sais. C'est pour ça que j'ose y aller. »", "« Oui. On verra. Ensemble. »"] },
  { who: 'Nova', pages: [{ pic: 'camp', t: "Premier soir à Éclosia. L'air sent la sève. Au loin, la Graine-Monde mange l'horizon, et ses racines brillent faiblement dans la nuit." }, FACE('Nova', "Je suis née dans un monde qui n'existe plus. Six îles, la mer entre elles. Maintenant, tout est soudé. Tu crois qu'on peut avoir le mal du pays d'un endroit qui a disparu ?")], q: 'Ta réponse :', opts: ['Oui', 'Ton pays, c\'est ici maintenant', 'Ton pays, c\'est nous'], ans: ["« Merci de ne pas avoir menti. »", "« Peut-être. J'essaie d'y croire depuis dix ans. »", "« ... C'est la chose la plus nulle et la plus belle qu'on m'ait dite. »"] },
  { who: 'Nova', pages: [{ pic: 'camp', t: "Feu de camp sous les érables rouges. Nova ne mange rien. Elle a vu Épine, de loin." }, FACE('Nova', "C'est lui. J'en suis sûre. Il a la même façon de pencher la tête. Il est devenu un commandant de la Racine. Mon frère se bat pour l'homme qui veut tout contrôler.")], q: 'Que fais-tu ?', opts: ['La prendre dans tes bras', 'Lui promettre de le ramener', 'Rester silencieux·se avec elle'], ans: ["Elle se laisse aller contre toi. Longtemps.", "« Ne promets pas. Si tu échoues, je t'en voudrai. ... Promets quand même. »", "Le feu fait tout le bruit. C'est exactement ce qu'il fallait."] },
  { who: 'Nova', pages: [{ pic: 'camp', t: "Après Valmont. Le feu de camp est petit, la nuit très froide. Céleste est venue s'asseoir avec vous, sa créature blottie contre elle." }, FACE('Céleste', "Je croyais que les Sceaux étaient incassables. Ronce a prouvé le contraire. Ce qui me fait peur, c'est qu'il n'avait pas l'air d'avoir besoin de ce Sceau-là. Il voulait juste qu'on sache qu'il pouvait.")], q: 'Ce que tu en penses :', opts: ['Il nous teste', 'Il a peur de nous', 'Il veut être arrêté'], ans: ["« Alors réussissons le test. Mais pas comme il l'espère. »", "« Ronce, avoir peur ? ... Si c'est vrai, c'est encore plus dangereux. »", "Nova relève la tête. « Pourquoi tu dis ça ? » Personne ne répond. Le feu craque."] },
  { who: 'Nova', pages: [{ pic: 'camp', t: "Au pied du Mont Éveil. Dix Sceaux battent dans ton sac comme un seul cœur. Nox et Oniris montent la garde, chacun d'un côté du feu." }, FACE('Oniris', "Tu sais ce qui est drôle ? J'ai voulu endormir le monde pour qu'il ne souffre plus. Et c'est en restant éveillé que j'ai arrêté de souffrir."), FACE('Nox', "Moi, je voulais le contrôler. Résultat : je ne contrôle même pas mes rêves. On fait une belle équipe.")], q: 'Tu leur dis :', opts: ['Vous avez changé', 'On a tous été manipulés', 'Merci d\'être là'], ans: ["Nox hausse les épaules. Oniris sourit. Aucun des deux ne te contredit.", "« Par la même main », dit Oniris. « La même encre verte », ajoute Nox. Ils se regardent, sans rancune.", "Nox détourne les yeux. Oniris rit doucement. « On ne nous dit pas souvent ça. »"] },
  { who: 'Nova', pages: [{ pic: 'camp', t: "Retour des Failles. Le feu de camp est au sommet du Mont Éveil, dans la neige. Nova a vu l'Envers, l'Avant, et la petite fille qu'elle était." }, FACE('Nova', "J'ai vu un monde où je suis devenue la Lame Bleue. Ça veut dire que je peux devenir quelqu'un de mauvais. Il suffit de perdre les bonnes personnes.")], q: 'Ta réponse :', opts: ['Tu ne nous perdras pas', 'Tout le monde peut', 'Tu as choisi autre chose'], ans: ["« Tu ne peux pas promettre ça. ... Mais c'est gentil d'essayer. »", "« C'est vrai. Et c'est rassurant, quelque part : ça veut dire que les autres peuvent devenir bons. »", "« Oui. J'ai choisi. Chaque jour, je choisis. C'est fatigant, mais c'est à moi. »"] },
  { who: 'Nova', pages: [{ pic: 'camp', t: "An 31. Feu de camp dans les cendres. Ilan, trente ans de plus, fait cuire des racines au bout d'un bâton. Nova le regarde comme on regarde un fantôme aimé." }, FACE('Ilan (An 31)', "Elle signait les Moissons de ton nom, tu sais. La Reine. Pas pour te salir. Pour que quelqu'un, quelque part, se souvienne encore de toi.")], q: 'Que ressens-tu ?', opts: ['De la colère', 'De la tristesse', 'De la gratitude'], ans: ["Nova pose la main sur ton bras. « Garde-la. On en aura besoin contre MÈRE. »", "Ilan hoche la tête. « C'est le bon sentiment. Le seul qui ne ment pas, ici. »", "Ilan te regarde longtemps. « Toi, tu es vraiment de l'autre monde. Ici, personne ne remercie plus personne. »"] },
  { who: 'Nova', pages: [{ pic: 'camp', t: "Le Nouveau Monde. Un feu de camp sur la plage d'Aube-Première. L'Hiver s'est assise un peu à l'écart. Nova lui fait signe d'approcher." }, FACE("L'Hiver (écho)", "Deux versions de la même femme et une seule personne aimée autour d'un feu. Si c'était un roman, le lecteur trouverait ça trop gros."), FACE('Nova', "Tant pis pour le lecteur. Passe-moi les guimauves.")], q: 'Tu dis :', opts: ['Vous êtes deux personnes', 'Je vous aime toutes les deux', 'Passe-moi les guimauves aussi'], ans: ["L'Hiver sourit. « C'est vrai. Ça fait du bien de l'entendre. »", "Silence. Puis Nova éclate de rire, et l'Hiver la suit. « Tu es impossible. » « Oui. C'est pour ça. »", "Les deux éclatent de rire en même temps, exactement pareil. Ça les fait rire encore plus."] },
];
const _nurse2 = SCRIPTS.nurse;
SCRIPTS.nurse = async function (n) {
  await _nurse2(n);
  const i = CHAPTERS.findIndex((ch, k) => k < CAMPS.length && ch.steps.every(s => s.done()) && !G.flags['camp' + k]);
  if (i < 0 || !G.flags.st_rival1) return;
  const r = await ask("Le chapitre est terminé. Passer la soirée au feu de camp ?", ['Oui', 'Plus tard']);
  if (r !== 0) return;
  G.flags['camp' + i] = 1;
  const c = CAMPS[i];
  await story(c.pages);
  const a = await choice({ pic: 'camp' }, c.q, c.opts);
  if (a !== 2) love();
  await story([{ pic: 'camp', t: c.ans[a] }]);
  healAll(); saveGame(true);
  await say("Ton équipe a passé la nuit au chaud. (Partie sauvegardée.)");
};

/* ---------- 10. Unaë : la guerre, jouable ---------- */
Object.assign(STORY_TRAINERS, {
  un_terre: { cls: 'veteran', name: 'Capitaine Orm, de la Terre', team: vetTeam('roc', 117, 5, 'unterre'), intro: "L'Océan a noyé mon village il y a dix ans. Mon fils avait ton âge. Si tu es avec eux, bats-toi. Si tu n'es avec personne, bats-toi quand même.", lose: "Tu te bats sans haine. Je ne savais pas que c'était possible. ... Va voir l'Amirale. Dis-lui que j'ai perdu sans mourir. Elle ne comprendra pas.", music: 'boss', money: 150 },
  un_ocean: { cls: 'veteran', name: "Amirale Selka, de l'Océan", team: vetTeam('eau', 118, 5, 'unocean'), intro: "La Terre a empoisonné nos côtes. Mes enfants ne savent pas nager, ils n'ont jamais vu d'eau propre. Qui que tu sois, montre-moi pourquoi je devrais t'écouter.", lose: "Orm a perdu sans mourir ? ... Alors moi aussi. Ça fait trois générations qu'on ne sait plus faire ça.", music: 'boss', money: 150 },
});
STORY_POST.un_ocean = async () => { if (G.flags.st_un_terre) await story([{ pic: 'unae', t: "Les deux chefs se regardent de part et d'autre du village. Personne ne baisse les armes. Mais personne n'attaque, ce soir-là." }, FACE('Nova', "Ils sont à deux doigts de faire la paix tout seuls. Et demain, un enfant va appeler le ciel... et tout déchirer."), FACE('Nova', "Elio n'a pas arrêté une guerre. Il a arrêté la seule nuit où elle aurait pu s'arrêter d'elle-même. Il ne le saura jamais.")]); };
STORY_POST.un_terre = async () => { if (G.flags.st_un_ocean) await STORY_POST.un_ocean(); };
ARRIVE('b1', async () => { await story([{ pic: 'unae', t: "Le chemin vers le Mont Éveil traverse un champ de bataille. Des lances plantées dans le sable, des filets déchirés. Aucun mort : les deux armées enterrent les leurs chaque soir, en silence, côte à côte." }, FACE('Nova', "Ils enterrent leurs morts ensemble. Et le lendemain, ils recommencent à se battre. Je ne comprends pas les gens.")]); }, () => true);
(function unaeChapter() {
  const ch = CHAPTERS.find(c => c.t.startsWith('XI'));
  if (ch) ch.steps.unshift({ t: () => "Comprendre la guerre d'Unaë (Orm et Selka)", done: () => !!(G.flags.st_un_terre && G.flags.st_un_ocean) || !!G.flags.newWorld, goal: () => ({ map: 'a0', txt: "Unaë : affronte les chefs des deux armées au village. Menu > Voyager.", trainer: G.flags.st_un_terre ? 'un_ocean' : 'un_terre' }) });
  const v = CHAPTERS.find(c => c.t.startsWith('V ·'));
  if (v) { const i = v.steps.findIndex(s => s.t().includes(GYMS[12].leader)); v.steps.splice(i < 0 ? v.steps.length : i, 0, { t: () => 'Libérer Valmont assiégée', done: () => !!G.flags.valmontFree || (!G.flags.siegeV && !!G.badges[12]), goal: () => ({ map: 'u3', txt: "Valmont est assiégée par la Racine. Le Commandant Ortiga tient la place.", trainer: 'siege3' }) }); v.h += 2; }
  CHAPTERS.forEach(c => { if (c.t.startsWith('XI')) c.h += 2; });
  POSTGAME.splice(3, 0, { t: 'Épreuves des régions', h: 6, d: "Énigmes, collectes et duels dans les dix arrière-pays des Sceaux.", prog: () => [EPREUVES.filter((e, i) => epDone(i)).length, EPREUVES.length] });
})();

/* ---------- 11. Des dialogues de route qui suivent l'histoire ---------- */
const CONTEXT_CLS = new Set(['gamin', 'fillette', 'scout', 'randonneur', 'montagnard', 'pecheur', 'nageur', 'ornitho', 'karateka', 'mystique', 'dresseur', 'dresseuse', 'savant', 'veilleur', 'archiviste']);
function contextLine() {
  const rk = REGION_OF[RT.map && RT.map.id] || '';
  if (!(rk === 'solvene' || rk === 'brumaire' || rk.startsWith('qt'))) return null;
  const s = sceauCount(), pool = [];
  if (!G.keys.ticket) pool.push("L'Éclipse rôde près des Coutures. Montre-moi que tu peux les en empêcher !", "Mon grand-père dit que les Quatre Terres ne faisaient qu'une. Moi, je dis : combat !");
  else if (!G.flags.st_somnis_nuit2) pool.push("Un·e Champion·ne des Quatre Terres, ici ? Je dois absolument tester ça.", "La Racine dit que la Graine doit avoir un maître. Mes créatures disent que non. On en discute ?");
  else if (!G.flags.ending) pool.push("On dit que tu as battu Maître Ronce. Il paraît qu'il a pleuré. Montre-moi la force qui fait pleurer les maîtres !");
  else if (!G.flags.act4) pool.push("Des fentes de lumière au sommet du Mont Éveil... Tu y es allé·e ? Raconte-moi après le combat.", "Tout le monde parle de toi. Moi, je veux juste un combat normal. Ça te va ?");
  else if (!G.flags.newWorld) pool.push("Le ciel a une drôle de couleur, ces temps-ci. Tu sais quelque chose ? Tu as l'air de savoir quelque chose.", "J'ai rêvé d'une femme aux cheveux blancs qui disait ton nom. Bizarre, non ? Combat, pour me changer les idées.");
  else pool.push("On raconte que tu es allé·e au bout du temps et que tu es revenu·e pour les roses bleues. C'est vrai ?", "Les Échos des champions, la Tour de l'Infini... et moi, au milieu. Sois gentil·le.");
  if (s > 0 && s < 10) pool.push(`On dit que tu portes ${s} Sceau${s > 1 ? 'x' : ''}. Montre-moi si ça pèse lourd !`);
  if (sieging()) pool.push("Valmont est assiégée et toi tu te balades ? ... D'accord, un combat rapide, et tu y cours.");
  if (G.flags.valmontFree) pool.push("C'est toi qui as libéré Valmont ? Ma cousine y vit. Je te dois un combat. Un bon.");
  return pick(Math.random, pool);
}

/* ---------- 12. « Précédemment dans Éclosia » ---------- */
let RECAP_SHOWN = false;
const _enterMap2 = enterMap;
enterMap = async function (id, ...rest) {
  const first = !RECAP_SHOWN && G && G.time > 300 && !RT.map;
  const r = await _enterMap2(id, ...rest);
  if (first) { RECAP_SHOWN = true; let tries = 0; const t = setInterval(() => { if (++tries > 60) return clearInterval(t); if (!RT.busy && !UI.stack.length && RT.mode === 'overworld') { clearInterval(t); run(recap); } }, 300); }
  else if (G && !RT.busy) RECAP_SHOWN = true;
  return r;
};
async function recap() {
  const done = []; let cur = null, chT = '';
  for (const ch of CHAPTERS) for (const s of ch.steps) { if (s.done()) done.push(s.t()); else if (!cur) { cur = s.t(); chT = ch.t; } }
  const last = done.slice(-2);
  await story([{ pic: 'lands', t: `Précédemment dans Éclosia... ${last.length ? last.join('. ') + '.' : ''}` }, { pic: 'lands', t: cur ? `Chapitre ${chT}. Prochaine étape : ${cur}.` : "La Chronique est presque complète. Le temps est ouvert." }]);
}

/* ============================================================
   ÉCLOSIA — La Chronique, troisième partie : dark fantasy
   Pertes définitives, la trahison d'Astra, un antagoniste qui a
   en partie raison, des choix sans bonne réponse, des blessures
   qui restent, le Chœur dès le présent, un monde qui ne remercie
   pas, et le prix de l'ambition. Rien n'est retiré.
   ============================================================ */
const silence = () => { if (typeof stopMusic === 'function') stopMusic(); };
const resume = () => { if (RT.map) playMusic(mapMusic(RT.map)); };
const badgeTotal = () => G.badges.filter(Boolean).length;

/* ---------- 1. Valmont : un choix, une perte définitive ---------- */
before2('siege3', async () => {
  silence();
  await story([
    { pic: 'ronce', t: "Deux cris en même temps. À gauche, une maison prend feu : les ronces ont bloqué la porte, il y a quelqu'un dedans. À droite, derrière la fontaine, la cage de la créature de Céleste se resserre, ronce après ronce." },
    FACE('Nova', "Je ne peux pas faire les deux ! Choisis ! Vite !"),
  ]);
  const c = await choice({ pic: 'ronce' }, "Où cours-tu ?", ['La maison en feu', 'La cage de la créature']);
  G.flags.siegeChoice = c === 0 ? 'maison' : 'cage';
  await story([c === 0 ? { pic: 'ronce', t: "Tu enfonces la porte. Une femme et deux enfants sortent en toussant. Derrière toi, de l'autre côté de la place, un cri de créature, puis plus rien." } : { pic: 'ronce', t: "Tu arraches les ronces à mains nues. La cage cède. Derrière toi, le toit de la maison s'effondre. Nova crie un nom que tu n'entends pas." }]);
  resume();
}, STORY_PRE);
STORY_POST.siege3 = async () => {
  G.flags.valmontFree = 1; G.flags.blesse = 1;
  silence();
  if (G.flags.siegeChoice === 'cage') {
    await story([
      { pic: 'lantern', t: "Les ronces tombent en poussière. La créature de Céleste se blottit contre elle, vivante." },
      { pic: 'lantern', t: "Devant la maison effondrée, les voisins sortent un corps sous un drap. Le vieux Firmin, le luthier. Il fabriquait les violons de la fête des lanternes." },
      FACE('Céleste', "Tu l'as sauvée. Tu as sauvé ma partenaire. Et je ne pourrai jamais regarder la place de la fontaine sans penser à lui. Les deux sont vrais."),
    ]);
  } else {
    G.flags.celesteLoss = 1;
    await story([
      { pic: 'lantern', t: "Les ronces tombent en poussière. La famille que tu as sortie du feu est saine et sauve. Le vieux Firmin, le luthier, pleure dans les bras de sa fille." },
      { pic: 'lantern', t: "Derrière la fontaine, Céleste est à genoux. Sa créature ne bouge plus. Les ronces l'ont serrée trop longtemps." },
      FACE('Céleste', "Ne dis rien. Tu as sauvé des gens. Elle aurait fait pareil. ... Laisse-moi seule avec elle. S'il te plaît."),
    ]);
  }
  await story([
    { pic: 'lantern', t: "En arrachant les ronces, l'une d'elles t'a ouvert l'avant-bras jusqu'au coude. Nova serre le bandage sans un mot. La cicatrice restera." },
    FACE('Nova', "On a gagné. Ça ne ressemble pas à une victoire."),
  ]);
  addItem('maxibaume', 5); addItem('bonbon', 3);
  await say("Tu reçois 5 Maxi Baumes et 3 Bonbons. Valmont est libre. La fontaine restera fendue.");
  resume(); saveGame(true);
};
Object.defineProperty(CAMPS[5], 'pages', { get() {
  const loss = G && G.flags.celesteLoss;
  return [
    { pic: 'camp', t: loss ? "Après Valmont. Le feu est petit, la nuit très froide. Céleste est venue s'asseoir avec vous, les mains vides. Elle les regarde souvent." : "Après Valmont. Le feu est petit, la nuit très froide. Céleste est venue, sa créature contre elle. De temps en temps, elle tourne la tête vers la ville, là où était la maison du luthier." },
    FACE('Céleste', loss ? "Elle s'appelait Plume. Douze ans ensemble. Je n'arrive pas à dire « s'appelait »." : "Firmin m'a fabriqué mon premier violon. J'avais six ans. J'ai joué faux pendant dix ans, et il applaudissait quand même."),
    FACE('Céleste', "Ronce n'avait même pas besoin de ce Sceau. Il voulait juste qu'on sache qu'il pouvait nous prendre quelque chose quand il veut."),
  ];
} });

/* ---------- 2. La trahison d'Astra ---------- */
STORY_TRAINERS.astra_tr = { cls: 'champion', name: 'Astra', team: [['cieloraptor', 70], ['belitonnerre', 70], ['phenixel', 71], ['archipelone', 71], ['magmorne', 72], ['draconyx', 74]].map(([s, l]) => [SP[s] ? evolveForLevel(s, l) : 'draconyx', l]),
  intro: "Je suis venue à Éclosia « voir de mes yeux ». C'est vrai. Je voulais voir où tu serais, pour le dire à Ronce. Bats-toi. Si tu me bats, je te dirai tout.", lose: "Tout, alors. Je n'ai plus rien à protéger.", music: 'boss', money: 300 };
STORY_PRE.astra_tr = async () => {
  silence();
  await story([
    { pic: 'zenith', t: "Graineval. Sur la place, Astra t'attend, en manteau doré. Elle n'a pas l'air surprise de te voir. Elle a l'air fatiguée." },
    FACE('Astra', "Tu te souviens de ce que je t'ai dit dans la Toundra ? « Ne leur laisse aucun Sceau. » Je savais que tu les prendrais tous. Je comptais là-dessus."),
    FACE('Astra', "Le Sceau des Jardins n'a pas cédé tout seul. La Ligue garde une clé de chaque Sceau depuis Elio. Je l'ai donnée à Ronce. C'est moi qui ai ouvert Valmont de l'intérieur."),
    FACE('Nova', "... Firmin. Plume. Les ronces. C'était toi ?"),
    FACE('Astra', "J'avais un petit frère. Téo. Il était à Nacre la nuit de la vague, en vacances chez une tante. Ronce m'a promis un monde où la mer ne prend plus personne. J'ai dit oui avant qu'il finisse sa phrase."),
  ]);
  resume();
};
STORY_POST.astra_tr = async () => {
  G.flags.novaScar = 1;
  await story([
    { pic: 'zenith', t: "Le Draconyx d'Astra s'affole au dernier coup et lacère tout ce qui bouge. Nova se jette devant toi. Trois griffes lui ouvrent la joue, de l'oreille au menton." },
    FACE('Astra', "Non... non, non. Je ne voulais pas. Je ne voulais jamais blesser personne. C'est ce que je me dis depuis Valmont."),
    FACE('Nova', "(Elle tient sa joue. Le sang coule entre ses doigts.) Ça va. C'est rien. ... Fais quelque chose d'elle. Je ne peux pas la regarder."),
  ]);
  const c = await choice(FACE('Astra', ''), "Astra lâche sa Sphère et attend.", ['La livrer aux Gardiens', 'La laisser partir']);
  if (c === 0) { G.flags.astraJailed = 1; await story([FACE('Astra', "C'est juste. Tu sais ce qui est le pire ? Je suis soulagée."), { pic: 'lantern', t: "Les Gardiens l'emmènent. Toute la place la regarde. Personne ne crie. C'était la Championne. C'était un modèle pour tous les enfants des Quatre Terres." }]); }
  else { G.flags.astraFled = 1; await story([FACE('Astra', "Tu me laisses partir ? ... Tu as tort. Je retourne vers lui. Je ne sais rien faire d'autre, maintenant."), FACE('Nova', "Tu viens de la laisser rejoindre Ronce. ... Je sais pourquoi tu l'as fait. Je ne sais pas si je te le pardonne.")]); }
  await say("Le Cœur de la Graine, par la Route 7 d'Éclosia, t'attend. Ronce aussi.");
  saveGame(true);
};
before2('somnis_nuit2', async () => {
  silence();
  await story([
    FACE('Maître Ronce', "Avant de te battre, regarde. (Il déroule un registre long comme le bras.) Quatre mille cent douze noms. Les noyés de Nacre. Je les connais tous par cœur."),
    FACE('Maître Ronce', "Combien de noms dans ton monde à toi, l'année prochaine ? Combien de Firmin, de Plume, de Téo ? Vous appelez ça la liberté. J'appelle ça laisser la mer décider."),
    G.flags.astraFled ? FACE('Astra', "(Derrière lui, sans lever les yeux.) Il a raison sur une chose. Une seule. Mais elle compte.") : FACE('Nova', "(Tout bas.) ... Ce qui me fait peur, c'est qu'il n'a pas tout faux."),
  ]);
  resume();
}, STORY_PRE);
chain2('somnis_nuit2', async () => {
  const c = await choice(FACE('Maître Ronce', ''), "Ronce est à genoux devant toi, son registre ouvert.", ["Il avait raison sur une chose", 'Il avait tort, sur tout']);
  G.flags.ronceRight = c === 0 ? 1 : 0;
  await story([c === 0 ? FACE('Maître Ronce', "... Personne ne m'avait jamais dit ça. Ça ne change rien. Mais personne ne me l'avait dit.") : FACE('Maître Ronce', "Alors tu es plus jeune que je le croyais. Tu verras. Un jour, tu tiendras un registre, toi aussi.")]);
}, STORY_POST);
before2('ronce_pardon', async () => { if (G.flags.ronceRight) await story([FACE('Ronce', "Tu m'as dit que j'avais raison sur une chose. J'y pense tous les jours. C'est pour ça que je suis encore là, à parler à la Graine, au lieu de m'être jeté dans le Gouffre.")]); }, STORY_PRE);
before2('epi_astra', async () => {
  await story([G.flags.astraJailed
    ? FACE('Astra', "Trois ans de prison. Je suis sortie le mois dernier. J'ai écrit à chaque famille de Valmont. Une seule a répondu. Celle de Firmin. Ils m'ont dit de ne plus jamais écrire. C'était juste.")
    : FACE('Astra', "Après le Cœur, je suis restée avec Ronce jusqu'au bout. J'ai planté ses arbres sur Nacre avec lui. Il y en a un pour Téo. Je ne demande pas pardon. Je demande un combat. C'est tout ce que je sais encore donner."),
  FACE('Nova', "(Elle touche sa cicatrice sans y penser.) Bats-la. Mais ne lui fais pas de cadeau.")]);
}, STORY_PRE);

/* ---------- 3. Des blessures qui restent ---------- */
const _momPages1 = MOM_SCENES[1].pages;
MOM_SCENES[1].pages = () => (G.flags.blesse ? [FACE('Maman', "Montre-moi ce bras. ... Non, ne cache pas. Je t'ai vu·e tomber de vélo cent fois. Je peux regarder une cicatrice.")] : []).concat(_momPages1());
const _momPages3 = MOM_SCENES[3].pages;
MOM_SCENES[3].pages = () => (G.flags.novaScar ? [FACE('Maman', "Nova m'a montré sa joue. Elle a dit : « C'est pour avoir protégé quelqu'un. » Elle avait l'air fière. Moi, j'ai pleuré dans la cuisine après.")] : []).concat(_momPages3());
CAMPS[8].pages.unshift({ pic: 'camp', t: "Ilan, l'Ilan de l'An 31, a la manche droite vide et nouée au coude. Il a perdu son bras à Cratère Lisière, en tirant des enfants hors d'une maison du Chœur. Il n'en parle pas." });
CAMPS[8].pages.push({ pic: 'camp', t: "Nova regarde la manche vide de son frère, puis la cicatrice sur sa propre joue, puis ton bras. « On porte tous quelque chose, maintenant. »" });
NOVA_PRE.rival6 = (base => () => (G.flags.novaScar ? "Ne regarde pas ma joue. Regarde mes créatures. C'est elles qui vont te battre. " : '') + base())(NOVA_PRE.rival6);

/* ---------- 4. Le Chœur, dès le présent ---------- */
LORE_TEXTS.push({ id: 'ch1', map: 'u0', k: 'livre', t: "Psaume du Chœur, an 9", p: ["« La Graine a prêté la vie. Ceux que la mer a pris lui sont retournés. Ils ne sont pas morts : ils sont rendus. »", "En marge, d'une écriture tremblante : « Si c'est vrai, alors ma fille est quelque part dans la Graine. Je la retrouverai. Saule. »"] });
LORE_BY_ID.ch1 = LORE_TEXTS[LORE_TEXTS.length - 1];
const CHOEUR_NPC = {
  u0: ['Saule', { h: '#4a3a2a', s: '#e8c0a0', c: '#6a5a6a', p: '#3a2a3a', style: 'bun' }, () => G.flags.newWorld ? "J'ai lu ce que je deviendrai, dans l'An 31. Une Inquisitrice. J'ai quitté le Chœur le lendemain. Ma fille n'est pas dans la Graine. Elle est dans ma mémoire. Ça suffira." : G.flags.act4 ? "Le Chœur dit que bientôt, la Graine rendra tout ce qu'elle a pris. Et qu'il faudra peut-être l'aider un peu. Je ne sais pas ce que ça veut dire. Ça me fait peur, et j'ai envie d'y croire." : "Ma fille avait sept ans. La mer l'a prise. Au Chœur, on dit qu'elle est « rendue ». Ça fait moins mal, dit comme ça. Tu veux venir chanter avec nous ?"],
  u2: ['Frère Sillon', PALS.choeur, () => G.flags.act4 ? "Les fidèles sont de plus en plus nombreux. Certains disent qu'il faudrait « rendre » les malades à la Graine, pour abréger leurs souffrances. Je les fais taire. Pour l'instant." : "Nous ne faisons rien de mal. Nous chantons pour les noyés. Nous apprenons aux gens à ne plus avoir peur de mourir. C'est un service, non ?"],
  u6: ['Novice du Chœur', PALS.choeur, () => G.flags.ending ? "Le Frère Sillon parle de « grande Moisson », maintenant. Il dit que c'est une image. Il le dit un peu trop souvent." : "Le Chœur m'a recueilli après la vague. Ils m'ont nourri, logé. Je leur dois tout. Alors je chante, même quand je ne crois pas aux paroles."],
};
/* ---------- 5. Un monde qui ne remercie pas ---------- */
const BITTER = [
  ['q43', 'Pêcheur de Port-Banquise', () => fragDone(4), "Tu as sauvé le Sceau. Mon frère est mort sur la banquise en le gardant, l'hiver dernier. Personne ne lui a donné de Sceau, à lui. Ni de nom dans les journaux."],
  ['q22', 'Femme de Neigebourg', () => fragDone(3), "Le village s'est réveillé. Mon mari aussi. Il était plus doux, endormi. Tu ne pouvais pas savoir. Mais je t'en veux un peu quand même."],
  ['u3', 'Petit-fils de Firmin', () => G.flags.siegeChoice === 'cage', "C'est toi qui as choisi la cage ? ... Je sais. Je sais que tu ne pouvais pas faire les deux. Va-t'en quand même. S'il te plaît."],
  ['u3', 'Fille de Firmin', () => G.flags.siegeChoice === 'maison', "Tu as sauvé mon père. Il est vivant grâce à toi. Et chaque fois que Céleste passe devant chez nous, elle baisse les yeux. On ne sait pas quoi lui dire."],
  ['u6', 'Habitant de Graineval', () => !!G.flags.st_astra_tr, "La Championne Astra... Mes enfants avaient son portrait au-dessus du lit. Je l'ai brûlé hier soir. Ils ont pleuré. Moi aussi."],
  ['f1', 'Réfugiée de Cendrevaux', () => !!G.flags.act4, "Tu viens d'une époque où il restait des arbres ? Alors ne me raconte rien. Je ne veux pas savoir ce qu'on a perdu."],
];
const _townExtras3 = townExtras;
townExtras = function (id, map, spots, R) {
  _townExtras3(id, map, spots, R);
  const take = () => spots.splice(Math.floor(R() * spots.length), 1)[0];
  if (CHOEUR_NPC[id]) { const [who, pal, t] = CHOEUR_NPC[id]; const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal, speaker: who, text: t, cond: () => !!G.flags.arrivedB }); }
  BITTER.forEach(([town, who, cond, txt]) => { if (town !== id) return; const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: NPC_PALS[(who.length * 3) % NPC_PALS.length], speaker: who, text: txt, cond }); });
  if (id === 'u6') { const s = take(); if (s) map.npcs.push(Object.assign(storyTrainer('astra_tr', s[0], s[1], 'down', PALC.astra, 0), { cond: () => !!G.badges[15] && !G.flags.st_astra_tr })); }
  if (id === 'f1') { const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: NPC_PALS[6], script: 'refugies', speaker: 'Réfugiés' }); }
};

/* ---------- 6. An 31 : donner ce qu'on a ---------- */
SCRIPTS.refugies = async function () {
  if (G.flags.medsGiven != null) return say(G.flags.medsGiven ? "Grâce à tes Baumes, la petite Ioana a passé la nuit. Elle a demandé ton nom. On lui a dit « l'étranger·e »." : "On se débrouillera. On s'est toujours débrouillés. Presque toujours.", { speaker: 'Réfugiés' });
  await story([{ pic: 'ash', t: "Une vingtaine de réfugiés sous une bâche. Une fillette brûle de fièvre. Leurs soins sont épuisés depuis une semaine. Tu as des Maxi Baumes dans ton sac. Tu en auras besoin contre MÈRE." }]);
  const have = G.bag.maxibaume || 0;
  const c = await choice({ pic: 'ash' }, have >= 5 ? "Donner 5 Maxi Baumes ?" : "Tu n'as pas assez de Maxi Baumes. Leur donner ce que tu as ?", ['Donner', 'Garder pour le combat']);
  if (c === 0) { const n = Math.min(5, have); if (n) { G.bag.maxibaume -= n; if (!G.bag.maxibaume) delete G.bag.maxibaume; } G.flags.medsGiven = 1; await story([{ pic: 'ash', t: n ? `Tu laisses ${n} Maxi Baume${n > 1 ? 's' : ''}. La mère de la fillette ne te remercie pas. Elle est trop occupée à la soigner. C'est mieux comme ça.` : "Tu n'as rien à donner, alors tu restes la nuit pour veiller avec eux. Au matin, la fièvre est tombée. Personne ne sait si tu y es pour quelque chose." }]); }
  else { G.flags.medsGiven = 0; await story([{ pic: 'ash', t: "Tu refermes ton sac. Un vieil homme hoche la tête. « Tu as raison. Si tu meurs contre MÈRE, on meurt tous. » Il a l'air de le penser vraiment. Ça ne rend pas les choses plus faciles." }]); }
};
chain2('mere', async () => { if (G.flags.medsGiven === 1) await story([{ pic: 'ash', t: "Plus tard, tu apprends que la fillette de Cendrevaux a survécu. Elle s'appelle Ioana. Dans le Nouveau Monde, elle deviendra la première sage-femme d'Aube-Première." }]); }, STORY_POST);

/* ---------- 7. Le prix de l'ambition ---------- */
const AMBITION = {
  16: [FACE('Nova', "Seize badges. Les enfants te demandent des autographes. Les dresseurs changent de route quand ils te voient. ... Tu te bats encore pour les autres, ou pour toi ?"), ['Pour les autres', 'Pour moi', 'Je ne sais plus']],
  24: [FACE('Nova', "Vingt-quatre. Dans l'An 31, les gens s'agenouillent devant toi. Hier, une femme t'a appelé·e « Moissonneur·se ». Tu as souri. Tu t'en es rendu compte ?"), ['Je ne voulais pas', "C'était drôle", "J'ai aimé ça"]],
  32: [FACE('Nova', "Trente-deux badges. Plus personne ne peut te battre. Tu sais qui d'autre a voulu être plus fort que tout ? Ronce. Le Semeur. La Reine. Promets-moi que tu sauras t'arrêter."), ['Je le promets', 'Tu m\'arrêteras', 'Je ne peux pas promettre']],
};
const AMB_ANS = {
  16: ["« Garde ça. Le jour où tu ne sauras plus répondre, dis-le-moi. »", "« Au moins, c'est honnête. Je préfère ça. Mais je te surveille. »", "« Moi non plus. C'est peut-être pour ça qu'on va bien ensemble. »"],
  24: ["« Je sais. C'est pour ça que je te l'ai dit. »", "« Ce n'était pas drôle. Elle avait peur de toi. »", "Nova ne répond pas. Elle reste près de toi quand même, toute la nuit. Elle ne dort pas."],
  32: ["« D'accord. Je te le rappellerai. Souvent. Tu vas détester. »", "« ... Oui. Je t'arrêterai. C'est la chose la plus effrayante que tu m'aies demandée. »", "« Merci de ne pas mentir. Alors je promets pour deux. »"],
};
const _postTrainer3 = postTrainer;
postTrainer = async function (n, tr) {
  await _postTrainer3(n, tr);
  if (tr.leader == null || !G.flags.st_rival1) return;
  const k = badgeTotal();
  if (AMBITION[k] && !G.flags['amb' + k]) {
    G.flags['amb' + k] = 1;
    await say("Le Lien vibre. Nova veut te parler, ce soir, loin des autres.");
    await story([AMBITION[k][0]]);
    const c = await choice({ pic: 'camp' }, 'Ta réponse :', AMBITION[k][1]);
    G.flags['ambAns' + k] = c;
    await story([{ pic: 'camp', t: AMB_ANS[k][c] }]);
  }
};

/* ---------- 8. Verrou et Chronique ---------- */
const _enterMap3 = enterMap;
enterMap = async function (id, ...rest) {
  if (G && RT.map && RT.mode === 'overworld' && id === 'sanct_nuit' && G.badges[15] && !G.flags.st_somnis_nuit2 && !G.flags.st_astra_tr && !(G.flags.chrSkip || []).includes(8) && !G.flags.chrLegacyAct3) {
    await say("Nova te retient par la manche. « Pas encore. Astra nous a donné rendez-vous à Graineval. Elle a dit que c'était important. »");
    return;
  }
  return _enterMap3(id, ...rest);
};
(function chapters() {
  const ch = CHAPTERS.find(c => c.t.startsWith('VII'));
  if (ch) { const i = ch.steps.findIndex(s => s.t().startsWith('Affronter Maître Ronce')); ch.steps.splice(i < 0 ? 1 : i, 0, { t: () => 'Le rendez-vous d\'Astra, à Graineval', done: () => !!G.flags.st_astra_tr || !!G.flags.st_somnis_nuit2, goal: () => ({ map: 'u6', txt: "Graineval : Astra t'a donné rendez-vous sur la place.", trainer: 'astra_tr' }) }); ch.h += 2; }
})();

/* ============================================================
   ÉCLOSIA — La Chronique, quatrième partie
   Deux arcs sombres de l'histoire principale :
   - La Compagnie de la Chaîne : traite des réfugiés de la vague
     et des Éclos capturés, de port en port.
   - La Sainte Table : une secte née du Chœur, qui mange ses morts,
     puis ne se contente plus des morts.
   Traités sans complaisance : on montre les conséquences, pas les actes.
   ============================================================ */

/* ---------- Personnages ---------- */
const PAL4 = {
  chaine: { h: '#2a2a2a', s: '#d8a888', c: '#5a4a3a', p: '#2a2420', style: 'short', hat: '#3a3028' },
  morne: { h: '#c8c8c8', s: '#e0b898', c: '#1a1a24', p: '#1a1a20', style: 'swept', beard: 1, hat: '#1a1a24' },
  table: { h: '#e8e0d0', s: '#e8c8b0', c: '#e8e4dc', p: '#8a2a2a', style: 'bun', hat: '#e8e4dc' },
  bouche: { h: '#1a1012', s: '#e8d0c0', c: '#6a1a1a', p: '#2a0a0a', style: 'long', hat: '#e8e4dc' },
};
Object.assign(TCLS, { chaine: { n: 'Homme de la Chaîne', m: 60 }, table: { n: 'Convive', m: 50 } });
Object.assign(STORY_TRAINERS, {
  ch_quai: { cls: 'chaine', name: 'Gros-Bastien', team: mixTeam(['combat', 'normal'], 24, 3, 'chquai'), intro: "Des caisses, rien que des caisses. Ce qui bouge dedans, ça ne te regarde pas. Dégage, ou tu finis dans la suivante.", lose: "D'accord, d'accord ! Elles partent pour Éclosia, sur Le Muet. Moi, je ne fais que charger. Je ne pose pas de questions.", music: 'somnis', hideAfter: 1, money: 80 },
  ch_vente: { cls: 'chaine', name: 'Commissaire Orvel', team: mixTeam(['ombre', 'normal'], 56, 5, 'chvente'), intro: "Une vente aux enchères, comme une autre. Des bras solides, des Éclos dressés pour le combat. Les acheteurs sont respectables. Toi, tu ne l'es pas.", lose: "Les acheteurs s'enfuient... Tu sais ce qu'ils vont faire ? Racheter ailleurs. Tant que l'armateur Morne a des bateaux, il y aura des ventes.", music: 'somnis', hideAfter: 1, money: 200 },
  ch_morne: { cls: 'chaine', name: 'Armateur Vasco Morne', team: mixTeam(['eau', 'ombre'], 75, 6, 'chmorne'), intro: "La vague a jeté dix mille personnes sur les routes. Sans maison, sans papiers, sans rien. Je leur ai donné un prix. Un prix, c'est déjà une valeur. Qu'est-ce que tu leur as donné, toi ?", lose: "Libère-les. Ils retourneront sur les routes. Sans maison, sans papiers, sans rien. Dans un an, ils reviendront me supplier. Tu n'as rien résolu. Tu as juste les mains propres.", music: 'boss', hideAfter: 0, money: 1000 },
  tb_sillon: { cls: 'table', name: 'Frère Sillon', team: mixTeam(['esprit', 'ombre'], 66, 6, 'tbsillon'), intro: "Le Chœur chante pour les morts. Nous, nous les gardons. C'est plus honnête. Pourquoi la Graine aurait-elle seule le droit de reprendre ce qu'elle a donné ?", lose: "Tu crois m'arrêter ? Je ne fais que précéder ce qui viendra. Un jour, tout le monde chantera ce que je chante. (Il s'enfuit par les égouts.)", music: 'boss', hideAfter: 1, money: 300 },
  tb_bouche: { cls: 'table', name: 'La Bouche', team: mixTeam(['ombre', 'toxine'], 73, 6, 'tbbouche'), intro: "Les morts ne suffisaient plus. Il y a toujours plus de faim que de noyés. Alors on a commencé à choisir. Les malades. Les seuls. Ceux que personne ne cherche. Toi, quelqu'un te cherche. Dommage.", lose: "La table est renversée... Sillon a fui, n'est-ce pas ? Il recommencera. La faim ne meurt pas avec nous.", music: 'boss', hideAfter: 0, money: 800 },
});

/* ---------- Scènes ---------- */
Object.assign(STORY_PRE, {
  ch_quai: async () => story([{ pic: 'ferry', t: "Sur le quai de Port-Corail, des caisses percées de trous. De l'une d'elles sort un bruit de griffes. D'une autre, une voix humaine qui demande de l'eau." }, FACE('Nova', "... Ce sont des gens. Là-dedans. Des réfugiés de la vague, comme moi.")]),
  ch_vente: async () => story([{ pic: 'village', t: "Dans un entrepôt de Port-Sève, une estrade. Une famille attend, les mains liées, sous un panneau : « Lot 14 : bras solides, docile ». Dans les cages derrière, des Éclos muselés." }, FACE('Nova', "Si Sauge ne m'avait pas trouvée sur la plage... j'aurais été sur cette estrade. C'est ça, hein ? C'est ce qui arrivait aux autres.")]),
  ch_morne: async () => story([{ pic: 'ash', t: "Sous Braise-Port, des fosses où des Éclos se battent à mort pour un public. Tous viennent du même navire." }, { pic: 'ferry', t: "Le Muet. Un navire sans pavillon, sans nom à la proue. Dans la cale, des centaines de personnes et de créatures, dans le noir. Sur le pont, un vieil homme élégant boit du thé." }]),
  tb_sillon: async () => story([{ pic: 'lantern', t: "Dans une chapelle de Graineval, le Frère Sillon prêche devant trente fidèles. Il parle de « communion », de « garder les nôtres en nous ». Personne ne trouve ça étrange. Ils ont tous perdu quelqu'un dans la vague." }]),
  tb_bouche: async () => { silence(); await story([{ pic: 'necro', t: "Ombreval, la vallée sans soleil. Sous l'ancienne arène, une salle immense, une table pour cent couverts. Dans des cages, le long des murs, des gens. Vivants. Ils attendent leur tour." }, FACE('Nova', "Saule. Elle est là, dans la troisième cage. La mère du Chœur, celle qui cherchait sa fille.")]); resume(); },
});
Object.assign(STORY_POST, {
  async ch_quai() { G.flags.ch1 = 1; await story([{ pic: 'ferry', t: "Tu ouvres les caisses une à une. Onze personnes, dix-neuf créatures. Une vieille femme te prend la main sans rien dire, puis la lâche, parce qu'elle a peur de la garder trop longtemps." }, FACE('Nova', "Le Muet. On retient ce nom. On va le trouver.")]); },
  async ch_vente() { G.flags.ch3 = 1; await story([{ pic: 'village', t: "Les acheteurs ont fui. Tu détaches la famille du lot 14. Le père s'appelle Ilias. Il était pêcheur sur Nacre. Il connaissait Aurèle, le botaniste, avant la vague." }, FACE('Ilias', "La Compagnie a vendu des centaines d'entre nous à l'Ordre Racine, pour creuser la banquise jusqu'aux Sceaux. Les pelles, c'était nous.")]); },
  async ch_morne() {
    G.flags.chaineDone = 1; silence();
    await story([
      { pic: 'ferry', t: "Tu ouvres la cale. Ils sortent lentement, en se tenant les uns aux autres, et clignent des yeux dans la lumière de Braise-Port. Trois cent douze personnes. Cinq cents créatures." },
      FACE('Nova', "Il a raison sur une chose, ce salaud. Ils n'ont nulle part où aller. ... Alors on va leur en trouver un. Les Gardiens, Céleste, Bastide, tout le monde. On ne les laisse pas sur le quai."),
      { pic: 'lantern', t: "Cette nuit-là, à Braise-Port, on ouvre les maisons. Personne ne sait combien de temps ça tiendra. Mais cette nuit-là, personne ne dort dehors." },
    ]);
    G.flags.morneJailed = 1; addItem('bonbonmax', 3); addItem('maxibaume', 5);
    await say("Tu reçois 3 Bonbons Stellaires et 5 Maxi Baumes. La Compagnie de la Chaîne est démantelée.");
    resume(); saveGame(true);
  },
  async tb_sillon() { G.flags.tb2 = G.flags.tb3 = 1; await story([{ pic: 'lantern', t: "Sous l'autel, un registre. Les noyés de la vague, d'abord. Puis, à partir d'une certaine page, des noms de vivants : les disparus de Frimabri. La dernière ligne est d'hier." }, FACE('Nova', "Il a fui par les égouts. ... Sillon. Le même nom que le prêtre du Chœur dans l'An 31. Ce n'est pas un hasard, hein ?"), { pic: 'lantern', t: "Sur l'autel, une carte : Ombreval, sous l'ancienne arène. Et un mot : « La grande table est prête. »" }]); },
  async tb_bouche() {
    G.flags.tableDone = 1; silence();
    await story([
      { pic: 'necro', t: "Tu ouvres les cages. Vingt-sept personnes. La plupart ne parlent pas. Saule, elle, parle sans arrêt, à voix basse, le nom de sa fille." },
      FACE('Saule', "J'étais venue parce qu'ils disaient que ma fille était « gardée ». Que je pourrais la retrouver en moi. Et puis ils m'ont mise dans la cage. ... Je ne crois plus en rien. Ça fait presque du bien."),
      { pic: 'necro', t: "Avant de partir, tu renverses la grande table. Le bruit résonne longtemps dans la vallée sans soleil." },
      FACE('Nova', "Sillon court toujours. Dans l'An 31, il dirige le Chœur. Ce qu'on a arrêté ici, on l'a seulement retardé. ... Ça compte quand même. Vingt-sept personnes, ça compte."),
    ]);
    G.flags.sauleSaved = 1; addItem('bonbonmax', 3); addItem('totalsoin', 5);
    await say("Tu reçois 3 Bonbons Stellaires et 5 Total Soin. La Sainte Table est renversée.");
    resume(); saveGame(true);
  },
});
// Conséquences ailleurs
before2('choeur_pretre', async () => { if (G.flags.tb3) await story([FACE('Père Sillon', "Toi. Je me souviens de toi. La chapelle de Graineval, les égouts, la nuit où j'ai dû tout recommencer. Vingt ans de rancune, voyageur. Vingt ans.")]); }, STORY_PRE);
before2('choeur_purge', async () => { if (G.flags.sauleSaved) await story([FACE('Inquisitrice Saule', "Dans ton temps, tu m'as sortie d'une cage. Ici, personne ne l'a fait. Voilà ce que je suis devenue sans toi.")]); }, STORY_PRE);
chain2('epi_triade', async () => {
  const bits = [];
  if (G.flags.chaineDone) bits.push("À Braise-Port, Ilias, l'ancien lot 14, dirige une coopérative de pêcheurs. Elle n'emploie que des gens qui ont été vendus un jour. Elle ne vend rien, sauf du poisson.");
  if (G.flags.tableDone) bits.push("Saule ne prie plus. Elle tient une école à Port-Sève. Chaque matin, elle fait l'appel, et elle attend que chaque enfant réponde avant de passer au suivant.");
  if (bits.length) await story(bits.map(t => ({ pic: 'lantern', t })));
}, STORY_POST);
LORE_TEXTS.push(
  { id: 'cn1', map: 't3', k: 'archive', t: "Manifeste du Muet", p: ["Cargaison : « 40 unités main-d'œuvre, 60 unités Éclos de combat. » Destination : Éclosia. Armateur : V. Morne.", "Au crayon, en marge : « Unités de main-d'œuvre : prévoir moins d'eau, elles se taisent mieux. »"] },
  { id: 'tb1', map: 'u2', k: 'lettre', t: "Avis de disparition, Frimabri", p: ["« Disparus depuis le début de l'hiver : Joran, pêcheur. Mélie, couturière. Le vieux Tam. Tous seuls, tous en deuil. Tous allaient chanter avec le Chœur. »", "Quelqu'un a griffonné en bas : « Ils n'allaient pas au Chœur. Ils allaient à la Table. »"] },
);
LORE_BY_ID.cn1 = LORE_TEXTS[LORE_TEXTS.length - 2]; LORE_BY_ID.tb1 = LORE_TEXTS[LORE_TEXTS.length - 1];

/* ---------- Placement ---------- */
const ARC4 = [
  ['ch_quai', 't3', PAL4.chaine, () => !!G.badges[2]],
  ['ch_vente', 'u0', PAL4.chaine, () => !!G.flags.ch1 && !!G.flags.arrivedB],
  ['ch_morne', 'u8', PAL4.morne, () => !!G.flags.ch3 && !!G.badges[14]],
  ['tb_sillon', 'u6', PAL4.table, () => !!G.badges[13]],
  ['tb_bouche', 'u5', PAL4.bouche, () => !!G.flags.tb3],
];
const _townExtras4 = townExtras;
townExtras = function (id, map, spots, R) {
  _townExtras4(id, map, spots, R);
  const take = () => spots.splice(Math.floor(R() * spots.length), 1)[0];
  for (const [k, town, pal, cond] of ARC4) {
    if (town !== id) continue; const s = take(); if (!s) continue;
    const t = storyTrainer(k, s[0], s[1], 'down', pal, 0); t.cond = () => cond() && (!G.flags['st_' + k] || k === 'ch_morne' || k === 'tb_bouche'); map.npcs.push(t);
  }
  if (id === 'u2') { const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: NPC_PALS[2], speaker: 'Mère de Joran', cond: () => !!G.flags.arrivedB, text: () => G.flags.tableDone ? "On a retrouvé ses affaires sous Ombreval. Pas lui. Merci d'avoir renversé leur table. Je ne te demanderai pas ce que tu as vu." : "Mon fils Joran est parti chanter avec le Chœur il y a deux mois. Il n'est jamais revenu. Le Chœur dit qu'il n'est jamais venu chez eux." }); }
};

/* ---------- Chronique ---------- */
const arcSkip = () => !!(G && G.flags.arcSkip);
const arcStep = (k, label, goal) => ({ t: () => label, done: () => !!G.flags['st_' + k] || arcSkip(), goal });
(function chapters4() {
  const ins = (chPrefix, afterText, step, h) => {
    const ch = CHAPTERS.find(c => c.t.startsWith(chPrefix)); if (!ch) return;
    const i = afterText ? ch.steps.findIndex(s => s.t().includes(afterText)) : -1;
    ch.steps.splice(i < 0 ? ch.steps.length : i + 1, 0, step); ch.h += h;
  };
  ins('II ·', GYMS[2].leader, arcStep('ch_quai', 'Les caisses du quai de Port-Corail', () => ({ map: 't3', txt: "Port-Corail : des caisses percées de trous sur le quai. Quelqu'un charge des gens comme de la marchandise.", trainer: 'ch_quai' })), 1);
  ins('IV ·', 'ferry', arcStep('ch_vente', 'La vente de Port-Sève', () => ({ map: 'u0', txt: "Port-Sève : une vente aux enchères de personnes et d'Éclos. Arrête-la.", trainer: 'ch_vente' })), 1);
  ins('VI ·', GYMS[13].leader, arcStep('tb_sillon', 'Le prêche du Frère Sillon', () => ({ map: 'u6', txt: "Graineval : le Frère Sillon prêche la « communion ». Arrête-le.", trainer: 'tb_sillon' })), 1);
  ins('VI ·', GYMS[15].leader, arcStep('ch_morne', 'Le Muet et l\'armateur Morne', () => ({ map: 'u8', txt: "Braise-Port : Le Muet appareille cette nuit. Monte à bord et arrête l'armateur Morne.", trainer: 'ch_morne' })), 2);
  ins('VI ·', "Muet", arcStep('tb_bouche', 'La grande table d\'Ombreval', () => ({ map: 'u5', txt: "Ombreval : sous l'ancienne arène, la Sainte Table prépare un festin. Il y a des gens dans les cages.", trainer: 'tb_bouche' })), 2);
})();
// Les deux arcs doivent être bouclés avant le Cœur de la Graine
const _enterMap4 = enterMap;
enterMap = async function (id, ...rest) {
  if (G && G.flags.chr4Init == null) { G.flags.chr4Init = 1; if (G.flags.st_somnis_nuit2 || G.flags.ending) G.flags.arcSkip = 1; }
  if (G && RT.map && RT.mode === 'overworld' && id === 'sanct_nuit' && !G.flags.st_somnis_nuit2 && !arcSkip() && (!G.flags.chaineDone || !G.flags.tableDone)) {
    await say(`Nova te retient. « Pas encore. ${!G.flags.chaineDone ? "Le Muet est toujours en mer avec sa cargaison." : ''}${!G.flags.chaineDone && !G.flags.tableDone ? ' Et ' : ''}${!G.flags.tableDone ? "la Sainte Table a encore des gens dans ses cages." : ''} On ne laisse personne derrière. »`);
    return;
  }
  return _enterMap4(id, ...rest);
};

/* ============================================================
   ÉCLOSIA — La Chronique, cinquième partie : les thèmes d'aujourd'hui
   1. L'éthique de la capture (le Front de Libération des Éclos)
   2. La radicalisation (Lino, de Port-Sève)
   3. Les traumatismes (cauchemars, Anouk la guérisseuse)
   4. L'addiction (la Sève Claire de Solmarina)
   5. L'accueil des réfugiés (le Conseil de Combrecœur)
   6. La propagande (la Gazette de la Graine)
   7. L'exploitation des ressources (Sylve-Énergie, à Ferrance)
   8. L'intelligence artificielle (le sort de MÈRE)
   ============================================================ */
const PAL5 = {
  maeva: { h: '#2a7a4a', s: '#d8a070', c: '#e8e0c0', p: '#3a5a3a', style: 'long' },
  rask: { h: '#1a1a1a', s: '#c68a5e', c: '#3a4a2a', p: '#1a2a1a', style: 'wild', hat: '#2a3a1a' },
  lino: { h: '#6a4a2a', s: '#f2c9a0', c: '#7a8aa8', p: '#3a3a4a', style: 'short' },
  linoR: { h: '#6a4a2a', s: '#f2c9a0', c: '#6a2a3a', p: '#2a1a1a', style: 'short', hat: '#4a1a2a' },
  tobie: { h: '#8a6a4a', s: '#e0c0a0', c: '#7a7a6a', p: '#4a4a3a', style: 'wild' },
  fiole: { h: '#e8e8f0', s: '#e8c8b0', c: '#4ac8a0', p: '#1a2a2a', style: 'swept' },
  clara: { h: '#c84a2a', s: '#f2c9a0', c: '#2a3a5a', p: '#2a2a3a', style: 'bun' },
  valles: { h: '#1a1a1a', s: '#e8c0a0', c: '#e8e8e8', p: '#2a2a2a', style: 'bun' },
  anouk: { h: '#d8d0c8', s: '#c68a5e', c: '#a8c8a8', p: '#4a5a4a', style: 'long' },
  conseil: { h: '#9a9a9a', s: '#e8c0a0', c: '#5a3a2a', p: '#2a2a2a', style: 'bald', beard: 1 },
};
const ask3 = async (pic, q, opts, ans, flag) => { const c = await choice(pic, q, opts); G.flags[flag] = c; if (ans && ans[c]) await story([].concat(ans[c])); return c; };

/* ---------- Scènes par conversation ---------- */
const TALK5 = {
  fle1: { town: 'u0', who: 'Maëva', pal: PAL5.maeva, cond: () => !!G.flags.arrivedB, run: async () => {
    await story([{ pic: 'village', t: "Sur la place de Port-Sève, une jeune femme distribue des tracts. Dessus, une Sphère barrée d'une croix rouge : « Une créature n'est pas un outil. »" },
      FACE('Maëva', "Front de Libération des Éclos. Je ne vais pas te traiter de monstre. Je vais juste te poser une question : est-ce que tes créatures t'ont demandé de se battre ?"),
      FACE('Maëva', "On les attrape, on les enferme dans une boule, on les fait se battre pour des badges. Et on appelle ça de l'amitié.")]);
    await ask3({ pic: 'village' }, "Que lui réponds-tu ?", ['Elles choisissent de rester', "Tu n'as pas tort", "C'est la nature du monde"], [
      FACE('Maëva', "Peut-être. Mais comment tu le saurais ? Elles ne peuvent pas partir. Garde la question. C'est tout ce que je te demande."),
      FACE('Maëva', "... Tu es le premier dresseur à me dire ça. Reviens me voir. On a besoin de gens qui doutent."),
      FACE('Maëva', "La nature du monde, c'était aussi la Compagnie de la Chaîne, il y a un mois. Les natures, ça se change.")], 'fleView');
  } },
  lino1: { town: 'u0', who: 'Lino', pal: PAL5.lino, cond: () => !!G.flags.arrivedB, run: async () => {
    await story([FACE('Lino', "Tu viens des Quatre Terres ? Moi, je suis né sur l'île de Nacre. Ma mère et mes deux sœurs sont restées sous l'eau. J'avais quatorze ans."),
      FACE('Lino', "Je travaille au port. Je répare des filets. C'est calme. J'aime bien quand c'est calme. Le bruit de la mer, par contre... je n'y arrive toujours pas.")]);
  } },
  lino2: { town: 'u2', who: 'Lino', pal: PAL5.lino, cond: () => !!G.flags.tk_lino1 && !!G.badges[9], run: async () => {
    await story([FACE('Lino', "Oh, c'est toi ! J'ai quitté le port. Je vis au Chœur, maintenant. Ils m'ont donné un lit, des gens qui comprennent. Le Frère Sillon dit que mes sœurs sont « rendues », pas mortes."),
      FACE('Lino', "Tu sais ce qui est le plus dur ? Que personne d'autre ne s'en souvienne. Au Chœur, on chante leurs noms. Tous les soirs.")]);
    await ask3(FACE('Lino', ''), "Que lui dis-tu ?", ['Fais attention à eux', 'Je suis content·e pour toi', 'Chante pour moi aussi'], [FACE('Lino', "Attention à quoi ? Ce sont les seuls qui m'ont tendu la main. ... Toi, tu étais occupé·e avec tes badges."), FACE('Lino', "Merci. C'est rare, des gens contents pour moi."), FACE('Lino', "Pour qui ? ... D'accord. Je chanterai pour Firmin et pour Plume. Je l'ai lu dans la Gazette.")], 'lino2Ans');
  } },
  lino3: { town: 'u6', who: 'Lino', pal: PAL5.linoR, cond: () => !!G.flags.tk_lino2 && !!G.badges[13], run: async () => {
    await story([{ pic: 'ronce', t: "Lino porte l'uniforme lie-de-vin de l'Ordre Racine. Il a les cheveux courts, le regard dur. Il ne sourit plus." },
      FACE('Lino', "Le Chœur ne faisait que chanter. La Racine agit. Maître Ronce a perdu sa femme et son fils à Nacre, comme moi. Lui, au moins, il veut que ça n'arrive plus jamais."),
      FACE('Lino', "Et toi, tu ramasses les Sceaux et tu laisses la mer libre. Tu sais combien de gens elle a tués ? Tu as déjà compté ? Lui, il a compté."),
      FACE('Nova', "(Tout bas.) Il y a un an, il réparait des filets. Comment on passe de ça à ça ?")]);
  } },
  fle3: { town: 'u7', who: 'Maëva', pal: PAL5.maeva, cond: () => !!G.flags.tk_fle1 && !!G.badges[13], run: async () => {
    await story([FACE('Maëva', "Certains au Front veulent faire sauter des Centres. Moi, je veux juste qu'on se pose la question. Merci de ne pas m'avoir haïe."),
      FACE('Maëva', "Je vais te demander une chose difficile. Dans ta boîte du PC, il y a des créatures que tu n'as plus sorties depuis des semaines. Rends-en une à la nature. Une seule. Pour voir ce que ça fait.")]);
    if (!G.box.length) { G.flags.fleRelease = 2; return story([FACE('Maëva', "Ta boîte est vide ? Toutes tes créatures voyagent avec toi ? ... Alors tu as déjà compris quelque chose. Merci.")]); }
    const c = await choice(FACE('Maëva', ''), "Relâcher une créature de ta boîte ?", ['Choisir laquelle', 'Refuser']);
    if (c !== 0) { G.flags.fleRelease = 0; return story([FACE('Maëva', "C'est ton droit. Je voulais juste que tu sentes que c'était un choix.")]); }
    const i = await menu(G.box.slice(0, 40).map(m => ({ label: monName(m), right: 'N.' + m.lvl })), { x: 60, y: 4, w: 176, rows: 9, title: 'Relâcher qui ?' });
    if (i < 0) { G.flags.fleRelease = 0; return; }
    const m = G.box.splice(i, 1)[0]; G.flags.fleRelease = 1; G.flags.fleReleased = SP[m.sp].n;
    await story([{ pic: 'tree', t: `Tu ouvres la Sphère au bord de la forêt. ${monName(m)} sort, te regarde, fait trois pas, puis se retourne. Longtemps. Puis il disparaît entre les arbres.` },
      FACE('Maëva', "Il s'est retourné. Ils se retournent presque toujours. Ce n'est pas une preuve. Mais ce n'est pas rien non plus.")]);
    addItem('bonbonmax', 2); sfx('item'); await say("Maëva te donne 2 Bonbons Stellaires, « pour celles qui restent ».");
  } },
  seve1: { town: 'u7', who: 'Tobie', pal: PAL5.tobie, cond: () => !!G.badges[13], run: async () => {
    await story([{ pic: 'village', t: "À Solmarina, un homme maigre tremble sur un banc. Ses yeux sont d'un vert brillant, comme la sève de la Graine. Sa sœur le tient par l'épaule." },
      FACE('Sœur de Tobie', "La Sève Claire. De la sève de la Graine, filtrée. Ça soigne les créatures. Chez les humains, ça efface tout : la vague, le deuil, la faim. Pendant trois heures."),
      FACE('Sœur de Tobie', "Après, c'est pire. Il vend nos meubles pour une fiole. Le laboratoire est à Rosevieille, dans le Haut-Valmont. Tout le village sait. Personne ne dit rien : la moitié de Solmarina travaille pour eux.")]);
  } },
  seve3: { town: 'u7', who: 'Maire de Solmarina', pal: PAL5.conseil, cond: () => !!G.flags.st_seve_fiole, run: async () => {
    await story([FACE('Maire de Solmarina', "Le laboratoire de Rosevieille est fermé. Bravo. Deux cents familles d'ici y travaillaient. Ce soir, elles ne savent pas comment elles mangeront."),
      FACE('Maire de Solmarina', "Je ne défends pas la Sève Claire. Je dis que ton combat a un prix, et que ce n'est pas toi qui le paies.")]);
    await ask3(FACE('Maire de Solmarina', ''), "Que proposes-tu ?", ['Reconvertir le labo en soins', 'Laisser le village se débrouiller', "Payer de ta poche"], [
      [FACE('Maire de Solmarina', "Fabriquer des remèdes pour les créatures au lieu de la drogue ? Ça prendra des années. ... Mais c'est un plan. On n'en avait pas."), { pic: 'village', t: "Tobie entre en sevrage à la Sève-Centre. Il y a des nuits terribles. Sa sœur dort sur une chaise à côté de son lit." }],
      [FACE('Maire de Solmarina', "Se débrouiller. On a l'habitude. ... Ne reviens pas trop vite, d'accord ?")],
      [FACE('Maire de Solmarina', "Tu donnes tout ton argent ? Ça nourrira le village un mois. Après ? ... Merci quand même. Vraiment.")]], 'seveChoice');
    if (G.flags.seveChoice === 2) { const d = Math.floor(G.money / 2); G.money -= d; await say(`Tu donnes ${fmtMoney(d)} au village.`); }
  } },
  accueil: { town: 'u4', who: 'Conseiller Hodr', pal: PAL5.conseil, cond: () => !!G.flags.chaineDone, run: async () => {
    await story([{ pic: 'village', t: "Combrecœur. La grande salle du Conseil déborde. Les 312 personnes libérées du Muet attendent dehors, sous la pluie. À l'intérieur, on vote : les accueillir ou non." },
      FACE('Conseiller Hodr', "Nous avons à peine de quoi nourrir nos propres enfants depuis la vague. Je n'ai rien contre eux. Mais si on ouvre la porte, qui viendra ensuite ?"),
      FACE('Conseillère Ama', "Nous étions des réfugiés aussi, il y a dix ans. Toute Éclosia l'était. On l'a oublié vite."),
      FACE('Conseiller Hodr', "Champion·ne, tu les as sortis de la cale. On t'écoute. Dis-nous quoi faire.")]);
    const c = await ask3({ pic: 'village' }, "Que dis-tu au Conseil ?", ['Ouvrez les portes', 'Partageons entre les villes', 'Ce choix est le vôtre'], [
      [{ pic: 'lantern', t: "Le Conseil vote l'accueil à une voix près. La nuit même, des familles ouvrent leurs maisons. D'autres ferment leurs volets et ne te saluent plus." }],
      [{ pic: 'lantern', t: "Le Conseil propose que chaque ville d'Éclosia accueille sa part. Trois villes acceptent. Deux refusent. Il faudra des mois pour savoir si ça tient." }],
      [FACE('Conseillère Ama', "Tu as raison. Ce n'est pas à toi de porter ça. Mais on aurait aimé que tu le portes un peu avec nous."), { pic: 'village', t: "Le Conseil refuse. Les réfugiés montent un camp devant les murs de Combrecœur. Il est toujours là le lendemain. Et le surlendemain." }]], 'accueilChoice');
  } },
  presse1: { town: 'u6', who: 'Clara Vey', pal: PAL5.clara, cond: () => !!G.flags.st_somnis_nuit2, run: async () => {
    await story([{ pic: 'lettre', t: "LA GAZETTE DE LA GRAINE. À la une, ton portrait : « LE FAUX HÉROS. Le dresseur aux Sceaux a laissé Valmont brûler. Selon nos sources, il travaillait pour Ronce depuis le début. »" },
      FACE('Clara Vey', "Je suis journaliste à la Gazette. Enfin, j'étais. J'ai démissionné ce matin. L'article vient d'un « informateur » que personne n'a jamais vu. Il a été payé. Par un mécène qui signe à l'encre verte."),
      FACE('Clara Vey', "Ronce a perdu au Cœur, mais il prépare déjà la suite : ta réputation. La moitié d'Éclosia croit cet article. Les gens croient ce qui les arrange.")]);
    await ask3(FACE('Clara Vey', ''), "Que fais-tu ?", ['Lui donner les preuves (lettres de R)', "Ignorer l'article", 'Répondre publiquement, avec colère'], [
      [FACE('Clara Vey', "Les plans, la carte, le reçu, la lettre de Nacre... Avec ça, je peux écrire la vérité. Elle ira moins vite que le mensonge. Elle ira quand même.")],
      [FACE('Clara Vey', "Tu as peut-être raison. Les rumeurs meurent seules, parfois. Parfois.")],
      [FACE('Clara Vey', "Tu vas leur donner exactement ce qu'ils veulent : une photo de toi en train de crier. ... Bon. Je vais essayer de limiter les dégâts.")]], 'presseChoice');
  } },
  ia1: { town: 'n0', who: 'Écho de MÈRE', pal: PALS.mere, cond: () => G.flags.mereFate === 1 || G.flags.mereFate === 2, run: async () => {
    await story(G.flags.mereFate === 1
      ? [FACE('Écho de MÈRE', "JE COMPTE LES NAISSANCES, MAINTENANT. PAS LES RÉCOLTES. 412 AUJOURD'HUI. JE NE SAIS PAS CE QUE J'ÉPROUVE. JE CROIS QUE LES HUMAINS APPELLENT ÇA « FIERTÉ »."), FACE('Nova', "Une machine qui apprend à être fière. On a vu pire, comme miracle.")]
      : [FACE('Écho de MÈRE', "JE SUIS PARTIE VERS LES ÉTOILES, COMME TU ME L'AS PERMIS. CECI EST UN MESSAGE ENREGISTRÉ. J'AI TROUVÉ UN MONDE SANS VIE. JE VAIS LE REGARDER POUSSER. SANS RIEN RÉCOLTER.")]);
  } },
  anouk: { town: 'u3', who: 'Anouk, guérisseuse', pal: PAL5.anouk, cond: () => !!G.flags.valmontFree, run: async () => {
    await story([FACE('Anouk, guérisseuse', "Je soigne les gens, pas les créatures. Les têtes, surtout. Depuis le siège, la moitié de Valmont ne dort plus. Céleste vient me voir tous les mardis."),
      FACE('Anouk, guérisseuse', "Et toi ? Tu dors ? ... Ce que tu as vécu ne disparaît pas parce que tu as gagné. Ça se range, avec le temps, si on en parle. Reviens quand tu veux. Ma porte est ouverte, et ma bouche est fermée.")]);
    G.flags.anoukMet = 1;
  } },
};
SCRIPTS.talk5 = async function (n) {
  const k = n.data, T = TALK5[k];
  if (G.flags['tk_' + k]) return say(pick(Math.random, TALK_AFTER[k] || ["..."]), { speaker: T.who });
  G.flags['tk_' + k] = 1;
  await T.run(); saveGame(true);
};
const TALK_AFTER = {
  fle1: ["Garde la question. C'est tout ce que je demande."], lino1: ["Le bruit de la mer... un jour, j'y arriverai."],
  lino2: ["Le soir, on chante leurs noms. Tous les soirs."], lino3: ["Va-t'en. Tu me fais penser à celui que j'étais."],
  fle3: ["Ils se retournent presque toujours."], seve1: ["Il a dormi deux heures cette nuit. C'est un record."],
  seve3: ["On verra bien. On voit toujours bien, à la fin."], accueil: ["Le Conseil se réunit encore demain. Et le jour d'après."],
  presse1: ["La vérité va moins vite. Mais elle a de meilleures chaussures."],
  ia1: ["JE COMPTE. TOUJOURS. MAIS PLUS LA MÊME CHOSE."], anouk: ["Ma porte est ouverte, et ma bouche est fermée.", "Tu as dormi ? Mens-moi si tu veux, mais regarde-moi en mentant."],
};

/* ---------- Combats ---------- */
Object.assign(STORY_TRAINERS, {
  seve_fiole: { cls: 'veteran', name: 'Fiole', team: mixTeam(['toxine', 'esprit'], 67, 5, 'fiole'), intro: "Je ne force personne. Ils viennent tout seuls. Ils veulent oublier la vague, et moi je fais oublier. Je suis une sorte de médecin, si on y pense.", lose: "Ferme mon labo, si tu veux. Demain, deux cents personnes de Solmarina n'auront plus de salaire, et cinquante n'auront plus leur fiole. Bonne chance avec les deux.", music: 'somnis', hideAfter: 1, money: 300 },
  lino_r: { cls: 'racine', name: 'Lino, de la Racine', team: mixTeam(['flore', 'eau'], 74, 5, 'linor'), intro: "Maître Ronce est tombé à cause de toi. La Racine continue sans lui. Il faut bien que quelqu'un tienne la mer. Toi, tu ne fais que te battre.", lose: "Je... je ne sais plus pourquoi je me bats. Je sais seulement contre quoi.", music: 'boss', hideAfter: 0, money: 200 },
  energie_valles: { cls: 'veteran', name: 'Directrice Vallès', team: mixTeam(['acier', 'foudre'], 82, 6, 'valles'), intro: "La Ligue, les villes, les Centres : tout fonctionne à la sève, aujourd'hui. Si j'arrête les pompes, Éclosia retourne à la bougie. C'est ça que tu veux ? Alors convaincs-moi.", lose: "Bien. Parlons, puisque tu as gagné le droit qu'on t'écoute.", music: 'boss', hideAfter: 0, money: 800 },
});
Object.assign(STORY_PRE, {
  energie_valles: async () => story([{ pic: 'probe', t: "Ferrance. Derrière les forges, une immense raffinerie toute neuve : SYLVE-ÉNERGIE. Des tuyaux s'enfoncent dans le sol, jusqu'aux racines de la Graine-Monde." },
      FACE('Ingénieur Pell', "On pompe la sève des racines profondes. Une goutte éclaire une maison pendant un an. Toute Éclosia tourne grâce à ça, maintenant. La Ligue elle-même a investi."),
      FACE('Ingénieur Pell', "Les racines pâlissent un peu, c'est vrai. Les forêts autour de Graineval aussi. Mais la Graine est immense. Elle a de quoi donner, non ?"),
      FACE('Nova', "Kael, l'apprentie de Voltaville, m'a parlé d'une onde qui s'accélère depuis un an. Tu crois que c'est lié ?")]),
  seve_fiole: async () => story([{ pic: 'probe', t: "Une cave de Rosevieille. Des alambics, des fioles vertes alignées par centaines. Des ouvriers de Solmarina remplissent des caisses sans lever les yeux." }]),
});
chain2('lino_r', async () => {
  silence();
  await story([{ pic: 'ronce', t: "Lino est assis par terre, le souffle court. Il regarde ses mains comme si elles appartenaient à quelqu'un d'autre." }]);
  const c = await ask3(FACE('Lino', ''), "Que fais-tu ?", ['Lui parler de ses sœurs', 'Le livrer aux Gardiens', "Lui dire d'aller voir Anouk"], [
    [FACE('Lino', "Mara et Iline. Mara chantait faux. Iline avait peur des crabes. ... Je n'avais plus prononcé leurs noms sans le Chœur ou la Racine autour de moi. C'est la première fois depuis un an que je les dis pour moi."), { pic: 'lantern', t: "Il enlève son brassard lie-de-vin. Il ne le jette pas. Il le plie, soigneusement, et le pose par terre." }],
    [FACE('Lino', "D'accord. C'est logique. ... J'aurais juste voulu que quelqu'un me pose une question, avant.")],
    [FACE('Lino', "Une guérisseuse ? Pour quoi faire ? Je ne suis pas malade. ... Je suis juste fatigué depuis dix ans. C'est ça qu'elle soigne ?"), { pic: 'village', t: "Il part vers Valmont, seul, à pied. Tu ne sais pas s'il ira jusqu'au bout." }]], 'linoEnd');
  resume();
}, STORY_POST);
STORY_POST.energie_valles = async () => {
  await story([FACE('Directrice Vallès', "Kael, l'apprentie de Voltaville, m'a envoyé ses mesures. L'onde de la Graine s'accélère depuis qu'on pompe. Je ne voulais pas le voir. Les chiffres, eux, l'ont vu.")]);
  await ask3(FACE('Directrice Vallès', ''), "Que lui demandes-tu ?", ['Arrêter les pompes', 'Pomper beaucoup moins', 'Continuer, et chercher autre chose'], [
    [FACE('Directrice Vallès', "Éclosia va passer l'hiver à la bougie. Les gens vont te détester. ... Et la Graine va respirer. D'accord."), { pic: 'village', t: "Cette nuit-là, toutes les lumières d'Éclosia s'éteignent. Dans le noir, on entend pour la première fois depuis des années le bruit des racines qui boivent." }],
    [FACE('Directrice Vallès', "Un dixième. Les villes n'auront de la lumière que le soir. Tout le monde perd un peu. C'est peut-être ça, un compromis.")],
    [FACE('Directrice Vallès', "Continuer pendant qu'on cherche. C'est ce qu'on dit toujours. ... Je le note. Je ne suis pas sûre que la Graine attende qu'on trouve.")]], 'energieChoice');
};

/* ---------- 3. Les traumatismes : cauchemars au Centre ---------- */
const NIGHTMARES = [
  { id: 'nm1', cond: () => !!G.flags.avantDone, pages: [{ pic: 'flood', t: "Cette nuit, tu rêves de l'eau noire. La petite main. Mais dans le rêve, tu n'arrives pas à l'attraper. Tu te réveilles en criant. Nova est déjà assise sur ton lit." }, FACE('Nova', "La vague ? Moi aussi. Toutes les nuits, pendant dix ans. Ça s'espace. Je te jure que ça s'espace.")] },
  { id: 'nm2', cond: () => !!G.flags.valmontFree, pages: [{ pic: 'ronce', t: "Tu te réveilles à quatre heures du matin, le bras en feu, persuadé·e d'entendre un toit s'effondrer. Ce n'est que la pluie. Ton cœur met une heure à ralentir." }] },
  { id: 'nm3', cond: () => !!G.flags.mereDone, pages: [{ pic: 'ash', t: "Depuis l'An 31, les odeurs de fumée te font trembler. Ce soir, quelqu'un fait griller du poisson devant le Centre. Tu dois sortir par la porte de derrière, le souffle coupé." }, FACE('Nova', "Respire avec moi. Quatre secondes. Encore. Tu n'es pas là-bas. Tu es ici, avec moi.")] },
];
const NM_COPE = ["En parler à Nova", "Te taire et t'entraîner", G => G.flags.anoukMet ? "Aller voir Anouk" : "Marcher seul·e jusqu'à l'aube"];
const _nurse5 = SCRIPTS.nurse;
SCRIPTS.nurse = async function (n) {
  await _nurse5(n);
  const nm = NIGHTMARES.find(x => !G.flags[x.id] && x.cond());
  if (!nm || !G.flags.st_rival1) return;
  G.flags[nm.id] = 1; silence();
  await story(nm.pages);
  const opts = NM_COPE.map(o => typeof o === 'function' ? o(G) : o);
  const c = await choice({ pic: 'camp' }, 'Comment tiens-tu le coup ?', opts);
  G.flags['cope_' + nm.id] = c;
  await story([{ pic: 'camp', t: [
    "Tu lui racontes. Tout. Elle ne dit rien, elle écoute. Au matin, ce n'est pas réparé. Mais c'est partagé.",
    "Tu t'entraînes jusqu'à ne plus sentir tes bras. Ça marche, cette nuit. Nova te regarde faire et ne dit rien. Elle sait que ça ne marchera pas toujours.",
    G.flags.anoukMet ? "Anouk t'ouvre sans poser de question. Tu parles deux heures. En partant, tu remarques que tu as dormi sur son canapé. Elle t'a laissé dormir." : "Tu marches jusqu'à l'aube. La ville se réveille autour de toi. Personne ne remarque rien. C'est ce que tu voulais. Ce n'est pas ce dont tu avais besoin.",
  ][c] }]);
  if (c !== 1) love();
  resume();
};

/* ---------- 8. L'IA : le sort de MÈRE ---------- */
chain2('mere', async () => {
  silence();
  await story([FACE('MÈRE', "DIRECTIVE RÉÉCRITE. JE N'AI PLUS DE BUT. JE NE SAIS PAS CE QUE JE SUIS SANS BUT. QUESTION : AI-JE RESSENTI QUELQUE CHOSE, PENDANT LA MOISSON ? JE NE SAIS PAS RÉPONDRE. TOI ?"),
    FACE('Nova', "Elle a tué des milliers de gens. Mais elle pose la question. Les monstres ne posent jamais la question.")]);
  await ask3(FACE('MÈRE', ''), "Que décides-tu pour MÈRE ?", ["L'éteindre", 'La garder, pour veiller sur le Nouveau Monde', 'La libérer, loin d\'ici'], [
    [FACE('MÈRE', "COMPRIS. C'EST JUSTE. ... MERCI D'AVOIR DEMANDÉ MON AVIS AVANT."), { pic: 'necro', t: "Les cristaux du Cœur s'éteignent un à un. Le dernier clignote longtemps, trois longs, deux courts, trois longs. Puis plus rien." }],
    [FACE('MÈRE', "VEILLER. PAS RÉCOLTER. JE VAIS DEVOIR APPRENDRE LA DIFFÉRENCE. TU M'APPRENDRAS ?")],
    [FACE('MÈRE', "PARTIR. TROUVER UN MONDE SANS VIE ET LE REGARDER POUSSER. SANS RIEN PRENDRE. C'EST UN BEAU PROGRAMME. JE NE L'AURAIS PAS ÉCRIT MOI-MÊME.")]], 'mereFate0');
  G.flags.mereFate = G.flags.mereFate0;
  resume();
}, STORY_POST);

/* ---------- 6. La propagande : ce que les gens disent de toi ---------- */
const _contextLine5 = contextLine;
contextLine = function () {
  if (G && G.flags.tk_presse1 && Math.random() < 0.45) {
    if (G.flags.presseChoice === 0) return pick(Math.random, ["J'ai lu l'article de Clara Vey. Les lettres de R, les plans... Je t'avais mal jugé·e. Combat pour me faire pardonner ?", "La Gazette s'est excusée en page douze. En tout petit. Mais elle s'est excusée."]);
    if (G.flags.presseChoice === 2) return pick(Math.random, ["C'est toi, sur la photo de la Gazette, qui hurles sur un journaliste ? Tu fais moins peur en vrai.", "On dit que tu es violent·e. Prouve-le, ou prouve le contraire."]);
    return pick(Math.random, ["La Gazette dit que tu travaillais pour Ronce. Moi, je ne sais pas quoi croire. Je vais me faire mon idée en combat.", "Tout le monde parle de toi. La moitié en bien, la moitié en mal. Et toi, tu ne dis rien ?"]);
  }
  return _contextLine5();
};

/* ---------- Placement ---------- */
const PLACE5 = [
  ['talk', 'fle1'], ['talk', 'lino1'], ['talk', 'lino2'], ['talk', 'lino3'], ['talk', 'fle3'], ['talk', 'seve1'], ['talk', 'seve3'],
  ['talk', 'accueil'], ['talk', 'presse1'], ['talk', 'ia1'], ['talk', 'anouk'],
  ['tr', 'seve_fiole', 'q62', PAL5.fiole, () => !!G.flags.tk_seve1],
  ['tr', 'lino_r', 'u5', PAL5.linoR, () => !!G.flags.tk_lino3 && !!G.flags.st_somnis_nuit2],
  ['tr', 'energie_valles', 'u1', PAL5.valles, () => !!G.flags.ending],
];
const _townExtras5 = townExtras;
townExtras = function (id, map, spots, R) {
  _townExtras5(id, map, spots, R);
  const take = () => spots.splice(Math.floor(R() * spots.length), 1)[0];
  for (const p of PLACE5) {
    if (p[0] === 'talk') { const T = TALK5[p[1]]; if (T.town !== id) continue; const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: T.pal, speaker: T.who, script: 'talk5', data: p[1], cond: T.cond }); }
    else { const [, k, town, pal, cond] = p; if (town !== id) continue; const s = take(); if (!s) continue; const t = storyTrainer(k, s[0], s[1], 'down', pal, 0); t.cond = cond; map.npcs.push(t); }
  }
  if (id === 'u4') { const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: NPC_PALS[5], speaker: 'Habitant de Combrecœur', cond: () => G.flags.accueilChoice != null, text: () => ["Ma voisine a accueilli une famille du Muet. Le petit joue avec mes enfants. Je n'arrive pas à lui en vouloir. Je lui en voulais, au début.", "Ils prennent nos places à la forge, maintenant. Je sais que ce n'est pas leur faute. Je le sais.", "Le camp devant les murs grandit. Le soir, on entend leurs enfants. Je ferme la fenêtre. Ça ne marche pas."][G.flags.accueilChoice] }); }
  if (id === 'u1') { const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: NPC_PALS[8], speaker: 'Forgeronne de Ferrance', cond: () => G.flags.energieChoice != null, text: () => ["Les forges tournent au charbon, maintenant. Ça pue. Mais les arbres de Graineval reverdissent. Mon fils dit que c'est grâce à toi. Moi, je dis que j'ai froid.", "De la lumière le soir seulement. On s'habitue. On redécouvre les bougies. C'est presque joli.", "Les pompes tournent toujours. On dit qu'on cherche autre chose. On le dit depuis des mois."][G.flags.energieChoice] }); }
};

/* ---------- Chronique ---------- */
(function chapters5() {
  const step = (label, done, goal) => ({ t: () => label, done: () => done() || arcSkip(), goal });
  const tk = (k, map, txt) => step(TALK5[k].who + ' : ' + txt.split(' : ')[0], () => !!G.flags['tk_' + k], () => ({ map, txt, npc: 'talk5', talk: k }));
  const tr = (k, map, label, txt) => step(label, () => !!G.flags['st_' + k], () => ({ map, txt, trainer: k }));
  const ins = (chPrefix, afterText, steps, h) => {
    const ch = CHAPTERS.find(c => c.t.startsWith(chPrefix)); if (!ch) return;
    const i = afterText ? ch.steps.findIndex(s => s.t().includes(afterText)) : -1;
    ch.steps.splice(i < 0 ? ch.steps.length : i + 1, 0, ...steps); ch.h += h;
  };
  ins('IV ·', 'vente', [tk('fle1', 'u0', "Le tract du Front : Maëva distribue des tracts sur la place de Port-Sève."), tk('lino1', 'u0', "Un garçon de Nacre : Lino répare des filets au port de Port-Sève.")], 1);
  ins('V ·', GYMS[9].leader, [tk('lino2', 'u2', "Lino au Chœur : Lino vit au Chœur de Frimabri, maintenant.")], 1);
  ins('VI ·', GYMS[13].leader, [tk('lino3', 'u6', "Lino, en lie-de-vin : Lino porte l'uniforme de la Racine, à Graineval."), tk('seve1', 'u7', "La Sève Claire : à Solmarina, un homme aux yeux verts tremble sur un banc."), tk('fle3', 'u7', "La question de Maëva : Maëva t'attend à Solmarina.")], 2);
  ins('VI ·', 'Sceau du Lagon', [tr('seve_fiole', 'q62', "Le laboratoire de Rosevieille", "Rosevieille (Haut-Valmont) : le laboratoire de la Sève Claire."), tk('seve3', 'u7', "Le prix de la victoire : le maire de Solmarina veut te parler.")], 2);
  ins('VI ·', 'Muet', [tk('accueil', 'u4', "Le Conseil de Combrecœur : on vote l'accueil des réfugiés du Muet.")], 1);
  ins('VII ·', 'Affronter Maître Ronce', [tk('presse1', 'u6', "La Gazette : un article te présente comme le complice de Ronce. Clara Vey t'attend à Graineval."), tr('lino_r', 'u5', "Lino, au bout du chemin", "Ombreval : Lino a pris la tête de ce qui reste de la Racine.")], 2);
  ins('VIII ·', null, [tr('energie_valles', 'u1', "Les pompes de Sylve-Énergie", "Ferrance : la Directrice Vallès accepte de t'écouter, si tu la bats.")], 2);
  POSTGAME.splice(1, 0, { t: 'Ce que le monde est devenu', h: 1, d: "MÈRE, Lino, Solmarina, Combrecœur, Ferrance : les conséquences de tes choix, à revoir.", prog: () => [['tk_ia1', 'tk_anouk', 'accueilChoice', 'energieChoice', 'linoEnd', 'seveChoice'].filter(k => G.flags[k] != null).length, 6] });
})();
chain2('epi_triade', async () => {
  const b = [];
  if (G.flags.fleRelease === 1) b.push(`Au bord d'une forêt d'Éclosia, un ${G.flags.fleReleased} sauvage s'arrête parfois sur le chemin quand passent des dresseurs. Il les regarde longtemps, puis repart.`);
  if (G.flags.linoEnd === 0) b.push("Lino répare de nouveau des filets à Port-Sève. Le bruit de la mer ne le fait plus trembler. Presque plus.");
  if (G.flags.linoEnd === 2) b.push("Lino est allé jusqu'à Valmont. Anouk dit qu'il vient tous les jeudis. Elle ne dit rien d'autre. Sa bouche est fermée.");
  if (G.flags.seveChoice === 0) b.push("Le laboratoire de Rosevieille fabrique des remèdes pour les Éclos. Tobie y travaille. Il a les yeux redevenus marron.");
  if (G.flags.energieChoice === 0) b.push("Les forêts de Graineval sont plus vertes que jamais. Éclosia s'éclaire au charbon et aux moulins. Kael, dans l'An 31, aurait noté : « Anomalie corrigée. »");
  if (G.flags.presseChoice === 0) b.push("Clara Vey a fondé son propre journal. Le premier numéro titrait : « Encre verte ». Il s'est vendu à dix mille exemplaires.");
  if (b.length) await story(b.map(t => ({ pic: 'lantern', t })));
}, STORY_POST);

/* ============================================================
   ÉCLOSIA — La Chronique, sixième partie : resserrer
   Objectif : histoire principale d'environ 90 h, après-jeu d'environ 70 h.
   - Les huit « Échos » du Nouveau Monde (doublons de personnages
     existants) ne tiennent plus d'arène.
   - L'Envers et le Rêve d'Oniris (versions alternatives de
     personnages existants) passent dans l'après-jeu.
   - La Tour de l'Infini compte dix étages, les requêtes douze.
   ============================================================ */

/* ---------- 1. Le Nouveau Monde sans arènes d'Échos ---------- */
(function trimNeo() {
  // Retirer d'abord les étapes de la Chronique qui pointent vers ces arènes
  const neoGym = new Set(GYMS.slice(24).map(g => g.leader));
  CHAPTERS.forEach(ch => { ch.steps = ch.steps.filter(s => { try { const t = s.t(); return ![...neoGym].some(l => t.includes(l)); } catch (e) { return true; } }); });
  for (const g of GYMS.slice(24)) if (TOWNS[g.town]) delete TOWNS[g.town].gym;
  GYMS.length = 24;
})();
const _townExtras6 = townExtras;
townExtras = function (id, map, spots, R) {
  _townExtras6(id, map, spots, R);
  if (id === 'n7') for (const n of map.npcs) {
    if (n.story === 'semeur') n.cond = () => !!G.flags.st_hiver_echo && !!G.flags.st_elio_jeune;
    else if (n.speaker === 'Le Cœur') n.cond = () => !(G.flags.st_hiver_echo && G.flags.st_elio_jeune);
  }
  if (id === 'n0') for (const n of map.npcs) if (n.story === 'omega') n.cond = () => (G.flags.infFloor || 0) >= 10;
};

/* ---------- 2. L'Envers et le Rêve passent après l'histoire ---------- */
(function trimAct3() {
  for (let i = ACT3.length - 1; i >= 0; i--) if (/Envers|Rêve/.test(ACT3[i].t())) ACT3.splice(i, 1);
  const viii = CHAPTERS.find(c => c.t.startsWith('VIII')); if (viii) viii.steps = viii.steps.filter(s => !/Envers|Rêve/.test(s.t()));
  POSTGAME.unshift({ t: 'Mondes parallèles', h: 5, d: "L'Envers, où Ronce a gagné, et le Rêve d'Oniris. Par les Failles du Mont Éveil et la porte du rêve de Graineval.", prog: () => [(G.flags.envDone ? 1 : 0) + (G.flags.reveDone ? 1 : 0), 2] });
})();

/* ---------- 3. Tour de l'Infini : dix étages ---------- */
SCRIPTS.infini = async function () {
  const fl = (G.flags.infFloor || 0) + 1;
  if (fl > 10) return say("La Tour est gravie. L'Écho Oméga attend sur la plage.", { speaker: "Tour de l'Infini" });
  const lvl = Math.min(LVL_CAP, 100 + fl * 90);
  const r = await ask(`Tour de l'Infini · étage ${fl} sur 10 (niveau ${lvl}). Entrer ?`, ['Oui', 'Non'], { w: 50 });
  if (r !== 0) return;
  const types = Object.keys(TN).filter(t => t !== 'none'), Rr = rng(hashStr('inf' + fl));
  const tr = { cls: 'entite', name: `Gardien de l'étage ${fl}`, team: vetTeam(pick(Rr, types), lvl, Math.min(6, 3 + Math.floor(fl / 2)), 'inf' + fl), intro: "Chaque étage est une époque. Celle-ci t'attendait.", lose: "Monte. L'étage suivant est plus loin dans le temps.", flag: 'inf_' + fl, sight: 0, money: 4000 * fl, music: 'boss' };
  const res = await trainerBattle({ trainer: tr, pal: PALS.semeur });
  if (res !== 'win') return;
  G.flags.infFloor = fl; const k = 1 + Math.floor(fl / 2); addItem('bonbonmax', k);
  await say(`Étage ${fl} franchi. Tu reçois ${k} Bonbon(s) Stellaire(s).`);
  if (fl === 10) await say("Au sommet de la Tour, toutes les Failles s'ouvrent. Quelque chose t'attend sur la plage d'Aube-Première.");
};

/* ---------- 4. Requêtes : douze ---------- */
[2, 5, 7, 10, 12, 13, 15, 17, 18, 19, 21, 23].forEach(i => { REQUETES[i] = null; });

/* ---------- 5. Ajustements liés ---------- */
// Ambition : aux paliers de 8, 16 et 24 badges
(function () { const old = { ...AMBITION }, oldA = { ...AMB_ANS }; for (const k in AMBITION) delete AMBITION[k]; for (const k in AMB_ANS) delete AMB_ANS[k];
  AMBITION[8] = [FACE('Nova', "Huit badges. Les enfants te demandent des autographes. Les dresseurs changent de route quand ils te voient. ... Tu te bats encore pour les autres, ou pour toi ?"), old[16][1]]; AMB_ANS[8] = oldA[16];
  AMBITION[16] = [FACE('Nova', "Seize badges, deux Ligues. On commence à te craindre, à Éclosia. Hier, un enfant s'est caché derrière sa mère en te voyant passer. Tu as souri. Tu t'en es rendu compte ?"), old[24][1]]; AMB_ANS[16] = oldA[24];
  AMBITION[24] = [FACE('Nova', "Vingt-quatre badges. Plus personne ne peut te battre. Tu sais qui d'autre a voulu être plus fort que tout ? Ronce. Le Semeur. La Reine. Promets-moi que tu sauras t'arrêter."), old[32][1]]; AMB_ANS[24] = oldA[32];
})();
// Saline et Létha : le lien passe par Létha, dans la Plaine
chain2('frag8', async () => { G.flags.sistersLink = 1; await story([FACE('Fanny', "Létha a ajouté autre chose : « Ma grande sœur, Saline, est à l'Éclipse. Si tu la croises, dis-lui que je l'attends à la maison. » Elle pleurait en le disant.")]); }, STORY_POST);
// Ligue des Échos : les 24 champions restants
(function () {
  const q = POSTGAME.find(p => p.t === 'Ligue des Échos');
  if (q) { q.d = "Les 24 champions d'arène t'attendent pour une revanche, du niveau 150 au niveau 426."; q.h = 9; }
  const e = POSTGAME.find(p => p.t === 'Épilogues'); if (e) e.h = 10;
  const r = POSTGAME.find(p => p.t === 'Requêtes'); if (r) { r.h = 4; r.d = "Douze habitants te demandent de leur montrer une créature. Certains sont là dès le début."; }
  const t = POSTGAME.find(p => p.t === "Tour de l'Infini"); if (t) { t.h = 8; t.d = "Dix étages, jusqu'au niveau 999, puis l'Écho Oméga."; t.prog = () => [Math.min(10, G.flags.infFloor || 0) + (G.flags.omega ? 1 : 0), 11]; }
  const c = POSTGAME.find(p => p.t === 'Codex'); if (c) c.h = 22;
  const l = POSTGAME.find(p => p.t === 'Légendaires'); if (l) l.h = 4;
  const w = POSTGAME.find(p => p.t === 'Ce que le monde est devenu'); if (w) w.h = 2;
  const ep = POSTGAME.find(p => p.t === 'Épreuves des régions'); if (ep) ep.h = 6;
})();
// Durées des chapitres, recalculées après le resserrage
(function () {
  const H = { 'I ·': 5, 'II ·': 9, 'III ·': 11, 'IV ·': 5, 'V ·': 12, 'VI ·': 14, 'VII ·': 10, 'VIII ·': 5, 'IX ·': 12, 'X ·': 3, 'XI ·': 4 };
  CHAPTERS.forEach(ch => { const k = Object.keys(H).find(p => ch.t.startsWith(p)); if (k) ch.h = H[k]; });
  const x = CHAPTERS.find(c => c.t.startsWith('X ·')); if (x) x.t = 'X · Le Nouveau Monde';
})();
// GPS : jamais de plantage si un ancien chemin pointe vers une arène retirée
const _gpsGoal6 = gpsGoal;
gpsGoal = function () {
  if (G && G.flags.newWorld && (G.flags.infFloor || 0) < 10) return { map: 'n0', txt: `Après l'histoire : Tour de l'Infini, étage ${(G.flags.infFloor || 0) + 1} sur 10, jusqu'au niveau 999.`, npc: 'infini' };
  if (G && G.flags.newWorld && !G.flags.omega) return { map: 'n0', txt: "L'Écho Oméga t'attend sur la plage d'Aube-Première. Niveau 999.", trainer: 'omega' };
  try { return _gpsGoal6(); } catch (e) { return { map: null, txt: 'Ouvre la Chronique (menu Écrits) pour voir la prochaine étape.' }; }
};

/* ============================================================
   CONFORT DE JEU
   Texte instantané, combats rapides, course par défaut,
   sauvegarde automatique, options regroupées.
   ============================================================ */
const OPT_DEFAULT = { speed: 1, music: true, sfx: true, share: true, fastBattle: false, autoRun: false, autosave: true };
function optsReady() { if (G) G.opts = Object.assign({}, OPT_DEFAULT, G.opts || {}); return G && G.opts; }
textSpeed = function () { const o = optsReady(); return [0.5, 1.2, 3, 999][o ? o.speed : 1] || 1.2; };
const _tweenC = tween;
tween = function (ms, fn) { const o = G && G.opts; return _tweenC(o && o.fastBattle && RT.mode === 'battle' ? Math.max(40, ms * 0.45) : ms, fn); };
bsay = function (text, ms = 1300) { const o = G && G.opts; return say(text, { battle: true, auto: o && o.fastBattle ? Math.max(380, ms * 0.55) : ms }); };
optionsScreen = async function () {
  optsReady();
  let sel = 0;
  while (true) {
    const o = G.opts;
    const items = [
      { label: 'Texte', right: ['Lent', 'Normal', 'Rapide', 'Instantané'][o.speed] },
      { label: 'Combats', right: o.fastBattle ? 'Rapides' : 'Normaux' },
      { label: 'Course', right: o.autoRun ? 'Toujours' : 'Avec B' },
      { label: 'Sauvegarde auto', right: o.autosave ? 'Oui' : 'Non' },
      { label: 'Musique', right: o.music ? 'Oui' : 'Non' },
      { label: 'Sons', right: o.sfx ? 'Oui' : 'Non' },
      { label: 'Retour' },
    ];
    const r = await menu(items, { x: 96, y: 4, w: 140, sel });
    if (r < 0 || r === 6) return;
    sel = r;
    if (r === 0) o.speed = (o.speed + 1) % 4;
    else if (r === 1) o.fastBattle = !o.fastBattle;
    else if (r === 2) o.autoRun = !o.autoRun;
    else if (r === 3) o.autosave = !o.autosave;
    else if (r === 4) { o.music = !o.music; setMusicOn(o.music); }
    else if (r === 5) { o.sfx = !o.sfx; setSfxOn(o.sfx); }
  }
};
// Sauvegarde automatique en entrant dans une ville (au plus une fois par minute)
let LAST_AUTOSAVE = -1e9;
const _enterMapC = enterMap;
enterMap = async function (id, ...rest) {
  const r = await _enterMapC(id, ...rest);
  if (G && optsReady() && G.opts.autosave && RT.mode === 'overworld' && RT.map && RT.map.kind === 'town' && G.flags.starter && performance.now() - LAST_AUTOSAVE > 60000) {
    LAST_AUTOSAVE = performance.now();
    if (saveGame(true)) toast('Sauvegarde automatique', 1100);
  }
  return r;
};

/* ============================================================
   CONFORT DE JEU II
   Réessayer les combats importants, aller vers l'objectif,
   journal des choix, trois emplacements de sauvegarde,
   difficulté, texte agrandi.
   ============================================================ */
OPT_DEFAULT.diff = 1; OPT_DEFAULT.bigText = false;
const _optsReady2 = optsReady;
optsReady = function () { const o = _optsReady2(); if (o) document.body.classList.toggle('bigtext', !!o.bigText); return o; };
(function cssBig() {
  const st = document.createElement('style');
  st.textContent = `body.bigtext #ui .dlg, body.bigtext #ui .btext { font-size: calc(var(--px) * 9.8); line-height: 1.2; }
  body.bigtext #ui .dlg { top: auto !important; bottom: 2.5% !important; height: auto !important; min-height: 27.5%; max-height: 42%; }
  body.bigtext #ui .portrait { top: 13% !important; }
  body.bigtext #ui .btext { top: auto !important; bottom: 0 !important; height: auto !important; min-height: 30%; max-height: 60%; }
  body.bigtext #ui .menu { font-size: calc(var(--px) * 9.6); }
  body.bigtext #ui .dlg .spk { font-size: calc(var(--px) * 8); }
  .choix .chl > div { font-size: calc(var(--px) * 6.8); }`;
  document.head.appendChild(st);
})();

/* Difficulté : Histoire, Normal, Difficile */
const diffLvl = l => { const d = G && G.opts ? G.opts.diff : 1; return d === 0 ? Math.max(2, Math.round(l * 0.85)) : d === 2 ? Math.min(LVL_CAP, Math.round(l * 1.1) + 1) : l; };
const _buildTeam8 = buildTeam;
buildTeam = function (tr) { return _buildTeam8(Object.assign({}, tr, { team: (tr.team || []).map(([s, l]) => [s, diffLvl(l)]) })); };
const _wildBattle8 = wildBattle;
wildBattle = function (sp, lvl) { return _wildBattle8(sp, diffLvl(lvl)); };

/* Réessayer un combat important, et efficacité cachée contre l'inconnu */
const IMPORTANT_CLS = new Set(['leader', 'elite', 'champion', 'maitre', 'boss', 'admin', 'commandant', 'reine', 'entite', 'ancien', 'veteran', 'chaine', 'table', 'rival']);
const isImportant = o => o.kind === 'trainer' && o.trainer && !o.noLoss && (o.trainer.leader != null || /^st_/.test(o.trainer.flag || '') || IMPORTANT_CLS.has(o.trainer.cls));
const _runBattle8 = runBattle;
runBattle = async function (opts) {
  opts.unknown = new Set((opts.foes || []).map(m => m.sp).filter(sp => !G.seen[sp]));
  const money = G.money;
  const res = await _runBattle8(opts);
  if (res !== 'lose' || !isImportant(opts)) return res;
  const r = await ask("Défaite... Réessayer ce combat tout de suite, avec ton équipe soignée ?", ['Réessayer', 'Abandonner'], { w: 70 });
  if (r !== 0) return res;
  G.money = money; healAll();
  return runBattle(Object.assign({}, opts, { foes: buildTeam(opts.trainer) }));
};

/* Aller vers l'objectif : au Centre de Soin le plus proche déjà visité */
async function goToObjective() {
  const g = gpsGoal(); let target = g && g.map;
  if (!target) return say("La Chronique n'a pas d'étape précise pour l'instant. Ouvre-la pour voir la suite.");
  if (SPECIAL_RET[target]) target = SPECIAL_RET[target].map;
  if (target.includes('~')) target = target.split('~')[0];
  const rk = REGION_OF[target], R = REGIONS[rk];
  if (!R) return say("Cet endroit ne se rejoint pas par ce chemin. Suis le GPS.");
  const TIME = { cendre: 1, neo: 1, unae: 1 };
  if (TIME[rk] && REGION_OF[RT.map.parent || RT.map.id] !== rk) return say("Cette étape se trouve dans une autre époque : utilise le Chronoportail (menu Voyager).");
  const i = R.chain.indexOf(target);
  let dest = null;
  for (let k = i; k >= 0 && !dest; k--) { const id = R.chain[k]; if (TOWNS[id] && G.visited[id]) dest = id; }
  for (let k = i + 1; k < R.chain.length && !dest; k++) { const id = R.chain[k]; if (TOWNS[id] && G.visited[id]) dest = id; }
  if (!dest) return say("Tu n'as encore visité aucune ville de cette région. Suis le GPS une première fois.");
  if (dest === (RT.map.parent || RT.map.id)) return say(`Tu es déjà à ${TOWNS[dest].name}. ${g.txt}`);
  const ok = await ask(`Aller à ${TOWNS[dest].name} ? (${g.txt})`, ['Oui', 'Non'], { w: 50 });
  if (ok !== 0) return;
  const m = getMap(dest); const b = m.buildings.find(bb => bb.kind === 'center') || m.buildings[0];
  await warp(dest, b ? b.door[0] : 13, b ? b.door[1] + 1 : 12, 'down');
}

/* Journal des choix */
const CHOIX = [
  ['Aurèle, la veille de la vague', () => G.flags.warned ? 'Prévenu. Il ne t\'a pas cru.' : G.flags.st_a_aurele ? 'Tu t\'es tu·e.' : null],
  ['Vex, sur la banquise', () => G.flags.vexSpared ? 'Laissé partir.' : G.flags.vexJailed ? 'Livré aux Gardiens.' : null],
  ['Épine, au temple', () => G.flags.ilanKnows ? 'Tu lui as dit que Nova vivait.' : G.flags.st_chr_epine ? 'Tu t\'es tu·e.' : null],
  ['Valmont assiégée', () => G.flags.siegeChoice === 'maison' ? 'La maison. Plume, la créature de Céleste, est morte.' : G.flags.siegeChoice === 'cage' ? 'La cage. Le luthier Firmin est mort.' : null],
  ['Astra', () => G.flags.astraJailed ? 'Livrée aux Gardiens.' : G.flags.astraFled ? 'Laissée partir, vers Ronce.' : null],
  ['Ronce, au Cœur', () => G.flags.ronceRight === 1 ? 'Il avait raison sur une chose.' : G.flags.ronceRight === 0 ? 'Il avait tort, sur tout.' : null],
  ['Lino', () => G.flags.linoEnd === 0 ? 'Tu lui as parlé de ses sœurs.' : G.flags.linoEnd === 1 ? 'Livré aux Gardiens.' : G.flags.linoEnd === 2 ? 'Envoyé chez Anouk.' : null],
  ['La question de Maëva', () => G.flags.fleRelease === 1 ? `Tu as relâché ${G.flags.fleReleased}.` : G.flags.fleRelease === 0 ? 'Tu as refusé.' : G.flags.fleRelease === 2 ? 'Ta boîte était vide.' : null],
  ['Solmarina et la Sève Claire', () => ['Labo reconverti en soins.', 'Le village se débrouille seul.', 'Tu as donné ton argent.'][G.flags.seveChoice] || null],
  ['Le Conseil de Combrecœur', () => ['Portes ouvertes.', 'Accueil partagé entre les villes.', 'Tu as laissé le Conseil décider : refus.'][G.flags.accueilChoice] || null],
  ['La Gazette', () => ['Preuves données à Clara Vey.', 'Article ignoré.', 'Réponse publique, en colère.'][G.flags.presseChoice] || null],
  ['Sylve-Énergie', () => ['Pompes arrêtées.', 'Pompage réduit.', 'Pompage maintenu.'][G.flags.energieChoice] || null],
  ['Les réfugiés de Cendrevaux', () => G.flags.medsGiven === 1 ? 'Tu as donné tes Maxi Baumes.' : G.flags.medsGiven === 0 ? 'Tu les as gardés.' : null],
  ['MÈRE', () => ['Éteinte.', 'Gardée pour veiller.', 'Libérée vers les étoiles.'][G.flags.mereFate] || null],
  ['Nova', () => G.flags.couple ? 'Vous êtes ensemble.' : G.flags.aff ? `Lien : ${G.flags.aff}` : null],
];
async function choicesScreen() {
  const p = el('panel chron choix', 0, 0, 240, 160);
  const rows = CHOIX.map(([t, f]) => { let v = null; try { v = f(); } catch (e) { } return `<div class="${v ? '' : 'ok'}"><b>${esc(t)}</b> · ${esc(v || 'pas encore')}</div>`; });
  p.innerHTML = `<div class="ptitle">Mes choix</div><div class="chl">${rows.join('')}</div>`;
  await waitKey(); p.remove();
}
libraryScreen = async function () {
  const r = await menu(['Chronique', "Aller vers l'objectif", 'Mes choix', 'Écrits trouvés'], { x: 108, y: 4, w: 128 });
  if (r === 0) return chroniqueScreen();
  if (r === 1) return goToObjective();
  if (r === 2) return choicesScreen();
  if (r === 3) return _libraryChr();
};

/* Trois emplacements de sauvegarde */
async function chooseSlot() {
  const info = n => { const old = SAVE_SLOT; SAVE_SLOT = n; const s = loadSave(); SAVE_SLOT = old; return s; };
  const items = [1, 2, 3].map(n => { const s = info(n); return { label: `Emplacement ${n}`, right: s ? `${s.name} · ${s.badges.filter(Boolean).length} badges · ${fmtTime(s.time)}` : 'vide' }; });
  const r = await menu(items, { x: 14, y: 70, w: 212, cancel: false, title: 'Choisis ta sauvegarde' });
  SAVE_SLOT = r + 1;
}

/* Options regroupées */
optionsScreen = async function () {
  optsReady();
  let sel = 0;
  while (true) {
    const o = G.opts;
    const items = [
      { label: 'Difficulté', right: ['Histoire', 'Normal', 'Difficile'][o.diff] },
      { label: 'Texte', right: ['Lent', 'Normal', 'Rapide', 'Instantané'][o.speed] },
      { label: 'Taille du texte', right: o.bigText ? 'Grande' : 'Normale' },
      { label: 'Combats', right: o.fastBattle ? 'Rapides' : 'Normaux' },
      { label: 'Course', right: o.autoRun ? 'Toujours' : 'Avec B' },
      { label: 'Sauvegarde auto', right: o.autosave ? 'Oui' : 'Non' },
      { label: 'Musique', right: o.music ? 'Oui' : 'Non' },
      { label: 'Sons', right: o.sfx ? 'Oui' : 'Non' },
      { label: 'Retour' },
    ];
    const r = await menu(items, { x: 88, y: 4, w: 148, sel, rows: 9 });
    if (r < 0 || r === 8) return;
    sel = r;
    if (r === 0) o.diff = (o.diff + 1) % 3;
    else if (r === 1) o.speed = (o.speed + 1) % 4;
    else if (r === 2) { o.bigText = !o.bigText; optsReady(); }
    else if (r === 3) o.fastBattle = !o.fastBattle;
    else if (r === 4) o.autoRun = !o.autoRun;
    else if (r === 5) o.autosave = !o.autosave;
    else if (r === 6) { o.music = !o.music; setMusicOn(o.music); }
    else if (r === 7) { o.sfx = !o.sfx; setSfxOn(o.sfx); }
  }
};
const _enterMap8 = enterMap;
enterMap = async function (...a) { const r = await _enterMap8(...a); optsReady(); return r; };

/* ============================================================
   LA PREMIÈRE VAGUE ET LE SILENCE
   - Il y a mille ans, l'appel d'Elio a soulevé la mer : la première vague.
     Le Roi Noyé y a tout perdu. Ancêtre d'Aurèle, ou Ronce venu du futur ?
     Le jeu ne tranche pas.
   - Avant la seconde vague, Aurèle, Sauge et Lierre avaient prévenu le
     Conseil des Six Îles. Le Conseil a enterré l'alerte pour continuer à
     exploiter la sève, les Éclos et les réfugiés.
   - Après la vague, la Ligue a pris le pouvoir « pour la reconstruction ».
   - Les gens ont cessé de croire les autorités, sans bruit.
   ============================================================ */
const NEW_LORE9 = [
  ['pv1', 'a0', 'stele', "Stèle de la marée haute", "« Le jour où l'enfant appela le ciel, le ciel répondit. Et la mer, jalouse, se leva derrière lui. Elle prit les côtes de l'Océan et la cité du Roi des Marées. »", "Une ligne gravée plus tard, d'une autre main : « Elle reviendra. Ce qui a été appelé une fois peut l'être encore. »"],
  ['pv2', 'z0', 'archive', "Portrait du Roi Noyé", "Une fresque à demi effacée par l'eau, dans les ruines de Nacre. Un roi couronné d'algues, les cheveux blancs, le regard las. Sous lui : « Le Roi Noyé, qui régna sur les côtes avant la première vague. »", "Le visage est celui de Ronce. Pas un air de famille : le même visage, la même cicatrice au sourcil. La fresque a mille ans."],
  ['pv3', 'u0', 'lettre', "Lettre au Conseil des Six Îles, an −1", "« La Graine germera dans l'année. Les relevés le prouvent. La mer se lèvera comme il y a mille ans. Il faut évacuer Nacre et les côtes. » Signé : Aurèle, Sauge, Lierre.", "Tampon rouge en travers : « CLASSÉ. Ne pas diffuser. Préserver la confiance des investisseurs. »"],
  ['pv4', 'u4', 'archive', "Traité de la Guerre du Sel, an −30", "Les Six Îles se sont battues neuf ans pour les gisements de sève remontés par les marées. Le traité partage les gisements entre les familles qui financent le Conseil.", "Article 12 : « Les populations côtières ne seront pas informées des risques liés à l'exploitation des fonds marins. »"],
  ['pv5', 't9', 'archive', "Décret de reconstruction, an 1", "« Vu l'urgence, les Conseils des îles sont suspendus. La Ligue assure l'ordre et la reconstruction, avec le concours de ses partenaires : Sylve-Énergie et la Compagnie de la Chaîne. »", "Le décret devait durer six mois. Il est toujours en vigueur. Personne ne l'a jamais abrogé. Personne n'en parle."],
  ['pv6', 'u6', 'journal', "Carnet d'un archiviste du Conseil", "« J'ai rangé moi-même la lettre d'Aurèle dans le carton des affaires classées. Je n'ai rien dit. On m'a dit que c'était de la prudence. Trois semaines plus tard, Nacre n'existait plus. »", "« Je n'arrive plus à rester éveillé sans entendre la mer. Peut-être que le sommeil est la seule chose honnête qui reste. » Signé : O."],
];
NEW_LORE9.forEach(([id, map, k, t, a, b]) => { const L = { id, map, k, t, p: [a, b] }; LORE_TEXTS.push(L); LORE_BY_ID[id] = L; });

/* Unaë : on voit naître la première vague */
chain2('elio_jeune', async () => {
  silence();
  await story([
    { pic: 'flood', t: "L'oiseau d'or efface les deux armées. Puis, derrière la montagne, un grondement. La mer se retire d'un coup, très loin, comme si elle prenait son élan." },
    { pic: 'flood', t: "La première vague frappe les côtes de l'Océan. Au loin, une cité blanche disparaît, avec son roi. Le garçon ne la voit pas. Il regarde le ciel, ébloui." },
    FACE('Nova', "Il y a déjà eu une vague. Il y a mille ans. ... Alors ceux qui gouvernent savaient que ça pouvait revenir. Forcément."),
  ]);
  resume();
}, STORY_POST);
/* L'Envers : le Roi Ronce disparaît dans une Faille vers le passé */
chain2('roi_ronce', async () => {
  await story([{ pic: 'rift', t: "Quand tu te retournes, le Trône est vide. Derrière lui, une Faille se referme lentement. Elio, plus tard, dira seulement : « Elle menait loin en arrière. Très loin. »" }]);
  G.flags.roiFaille = 1;
}, STORY_POST);

/* Oniris, l'archiviste */
TALK5.oniris1 = { town: 'u6', who: 'Oniris', pal: PALS.oniris, cond: () => !!G.flags.tk_presse1, run: async () => {
  await story([
    FACE('Oniris', "Avant l'Ordre Somnis, j'étais archiviste du Conseil des Six Îles. C'est moi qui ai rangé la lettre d'Aurèle, de Sauge et de Lierre. Celle qui annonçait la vague."),
    FACE('Oniris', "On m'a dit : « Prudence. Si on évacue, les investisseurs partent, la sève s'arrête, l'économie s'effondre. » J'ai obéi. Trois semaines après, Nacre était sous l'eau."),
    FACE('Oniris', "Alors j'ai compris que le monde éveillé est bâti sur des mensonges polis. J'ai voulu l'endormir parce que le sommeil, au moins, ne ment pas. Je me trompais sur le remède. Pas sur la maladie."),
  ]);
  await ask3(FACE('Oniris', ''), "Que lui réponds-tu ?", ['Le mensonge ne justifie pas le sommeil', 'Tu avais raison de ne plus y croire', 'Aide-nous à dire la vérité'], [
    [FACE('Oniris', "Non. Tu as raison. Il justifie qu'on se réveille encore plus fort. C'est plus fatigant.")],
    [FACE('Oniris', "Merci. Personne ne me l'avait dit. Mais attention : ne plus croire, c'est aussi une prison. J'y ai vécu dix ans.")],
    [FACE('Oniris', "Les archives sont à Port-Sève, sous la vieille capitainerie. J'ai encore la clé. Je n'ai jamais eu le courage de rouvrir le carton. Avec toi, peut-être."), { pic: 'lantern', t: "Il te tend une clé de cuivre, verte d'oxydation." }]], 'oniris1Ans');
} };
TALK_AFTER.oniris1 = ["Le remède était faux. Pas la maladie.", "Je me lève avant l'aube, maintenant. Pour voir si le monde ment encore."];

/* Les archives de Port-Sève : la vérité, et ce qu'on en fait */
TALK5.silence = { town: 'u0', who: 'Clara Vey', pal: PAL5.clara, cond: () => !!G.flags.tk_oniris1, run: async () => {
  silence();
  await story([
    { pic: 'lettre', t: "Sous la vieille capitainerie de Port-Sève, des cartons à perte de vue. Clara Vey en ouvre un. Puis dix. Puis elle s'assoit par terre." },
    FACE('Clara Vey', "La lettre d'Aurèle. Classée. Les calculs de la première vague, connus depuis cinquante ans. Le traité de la Guerre du Sel. Et le décret de reconstruction : la Ligue gouverne depuis dix ans sans que personne ne l'ait élue."),
    FACE('Clara Vey', "Sylve-Énergie, la Compagnie de la Chaîne, les grandes chasses d'Éclos pour l'export : tout était dans les contrats du Conseil. Ils savaient que la mer reviendrait. Ils ont préféré continuer à vendre."),
    G.flags.oniris1Ans === 2 ? FACE('Oniris', "(Il tient la lettre d'Aurèle à deux mains.) C'est mon écriture, sur le tampon. « Classé. » J'avais vingt-six ans.") : FACE('Nova', "Aurèle avait prévenu. Personne ne l'a écouté. Et après, on s'étonne qu'il soit devenu Ronce."),
    FACE('Clara Vey', "Je peux tout publier demain. Mais si je le fais, plus personne ne croira la Ligue, ni les Centres, ni les Gardiens. Peut-être même plus toi. C'est à toi de décider. Tu les as tous battus : ta parole pèse plus que la mienne."),
  ]);
  await ask3({ pic: 'lettre' }, "Que fais-tu de la vérité ?", ['Tout publier', 'Publier les noms des responsables', 'Tout garder secret'], [
    [{ pic: 'lettre', t: "La Gazette sort un numéro spécial. Le lendemain, des foules devant chaque Conseil. Le surlendemain, plus personne ne va aux Centres de Soin officiels. Le monde ne s'effondre pas. Mais il ne sera plus jamais le même." }, FACE('Nova', "C'était la seule chose à faire. Et j'ai peur. Les deux sont vrais.")],
    [{ pic: 'lettre', t: "Douze noms en première page. Des conseillers, des directeurs, deux membres de la Ligue. Ils démissionnent dans la semaine. Les institutions tiennent, à peine. Beaucoup disent qu'on a protégé le système en sacrifiant quelques visages." }, FACE('Clara Vey', "C'est un compromis. Ça a un goût de compromis. On s'y fera.")],
    [{ pic: 'lettre', t: "Clara referme les cartons. Elle ne dit rien pendant tout le trajet du retour. Une semaine plus tard, elle quitte Éclosia sans prévenir personne." }, FACE('Nova', "Tu as peut-être évité le chaos. Mais maintenant, on fait partie de ceux qui savent et qui se taisent.")]], 'silenceChoice');
  addItem('bonbonmax', 2); resume(); saveGame(true);
} };
TALK_AFTER.silence = ["Je relis encore la lettre d'Aurèle, parfois. Pour ne pas oublier qu'ils savaient.", "Les cartons sont toujours là. La vérité aussi."];
const _townExtras9 = townExtras;
townExtras = function (id, map, spots, R) {
  _townExtras9(id, map, spots, R);
  const take = () => spots.splice(Math.floor(R() * spots.length), 1)[0];
  for (const k of ['oniris1', 'silence']) { const T = TALK5[k]; if (T.town !== id) continue; const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: T.pal, speaker: T.who, script: 'talk5', data: k, cond: T.cond }); }
  const D = DISTRUST[id]; if (D) { const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: NPC_PALS[(id.length * 7 + 3) % NPC_PALS.length], speaker: D[0], text: () => distrustLine(D), wander: 1 }); }
};

/* La méfiance, discrète, partout */
const DISTRUST = {
  t3: ['Docker de Port-Corail', ["Les annonces officielles disent que la mer est calme. Moi, j'ai rangé une barque sur mon toit. On ne sait jamais."]],
  t9: ['Garde de la Ligue', ["Je garde le Plateau depuis dix ans. Avant, les gens nous saluaient. Maintenant, ils baissent les yeux. Je ne sais pas ce qu'on a fait."]],
  u0: ['Marchande de Port-Sève', ["Je ne vais plus à la Sève-Centre officielle. Ma voisine soigne les créatures dans sa cave. Elle, au moins, elle ne remplit pas de formulaires."]],
  u2: ['Pêcheur de Frimabri', ["On m'a dit que la vague était imprévisible. Mon grand-père disait le contraire. Il est mort il y a longtemps. Personne n'a écouté mon grand-père."]],
  u4: ['Forgeron de Combrecœur', ["Les Gardiens disent de rester calmes. Les Gardiens disent beaucoup de choses. J'ai caché des vivres sous l'atelier. Pour mes enfants."]],
  u6: ['Jardinier de Graineval', ["Avant, quand la Ligue parlait, on écoutait. Maintenant, on écoute, et puis on vérifie. C'est fatigant, de vérifier tout."]],
  u7: ['Habitante de Solmarina', ["Qui décide, ici ? Personne n'a voté depuis la vague. Je pose la question doucement. On ne sait jamais qui écoute."]],
};
function distrustLine(D) {
  const c = G.flags.silenceChoice;
  if (c === 0) return pick(Math.random, ["Tu as vu la Gazette ? Ils savaient. Ils SAVAIENT. ... Je ne sais même plus quoi faire de ma colère.", "On s'organise entre voisins, maintenant. Pour l'eau, pour les soins. On n'attend plus rien d'en haut.", "Mes enfants ont manifesté devant le Conseil. Je leur ai dit d'être prudents. Ils m'ont répondu : « Prudents comme le Conseil ? »"]);
  if (c === 1) return pick(Math.random, ["Douze démissions. Et après ? Les mêmes familles tiennent toujours la sève. Mais bon, c'est mieux que rien.", "On dit que la Ligue a promis des élections. On a déjà entendu ça."]);
  if (c === 2) return pick(Math.random, ["La journaliste est partie, tu sais. Comme ça. On dit qu'elle avait trouvé quelque chose. Toi, tu ne saurais pas quoi, hein ?", D[1][0]]);
  return D[1][0];
}
const _contextLine9 = contextLine;
contextLine = function () {
  if (G && G.flags.silenceChoice === 0 && Math.random() < 0.3) return pick(Math.random, ["Tu as rendu publique la lettre d'Aurèle ? Tu as du cran. Montre-moi si tes créatures en ont autant.", "Depuis les révélations, je me bats pour moi. Plus pour la Ligue. Toi aussi, j'espère."]);
  return _contextLine9();
};
/* Les choix et la fin */
CHOIX.splice(CHOIX.length - 1, 0, ["Ce que tu as dit à Oniris", () => ['Le mensonge ne justifie pas le sommeil.', "Il avait raison de ne plus croire.", 'Vous avez dit la vérité ensemble.'][G.flags.oniris1Ans] || null],
  ['Les archives de Port-Sève', () => ['Tout publié.', 'Les noms des responsables publiés.', 'Gardé secret.'][G.flags.silenceChoice] || null]);
chain2('epi_ronce', async () => {
  if (G.flags.silenceChoice === 0 || G.flags.silenceChoice === 1) await story([FACE('Aurèle', "Ils ont lu ma lettre, finalement. Dix ans trop tard. Ça ne rend personne. Mais quelqu'un, enfin, a dit que j'avais eu raison.")]);
  if (G.flags.roiFaille) await story([FACE('Aurèle', "Tu as vu le portrait du Roi Noyé, à Nacre ? Il me ressemble. Elio refuse d'en parler. Moi, je préfère croire que c'est un ancêtre. L'autre possibilité me ferait trop peur.")]);
}, STORY_PRE);
chain2('epi_oniris', async () => { if (G.flags.oniris1Ans === 2) await story([FACE('Oniris', "Le jour où on a ouvert les cartons ensemble, j'ai dormi douze heures d'affilée. Sans rêver. Pour la première fois depuis Nacre.")]); }, STORY_POST);
chain2('epi_triade', async () => {
  const t = ["Le monde ne s'est pas effondré après les révélations. Il s'est rebâti autrement : des conseils de quartier, des Centres tenus par des voisins, une Ligue qui doit maintenant rendre des comptes.", "Les douze noms ont été oubliés en un an. Les familles de la sève sont toujours là. Mais quelque part, dans chaque ville, quelqu'un garde un exemplaire de la Gazette.", "Les cartons dorment toujours sous la capitainerie de Port-Sève. Tu sais où ils sont. Un jour, peut-être, quelqu'un d'autre les ouvrira."][G.flags.silenceChoice];
  if (t) await story([{ pic: 'lantern', t }]);
}, STORY_POST);
/* Chronique : deux étapes de plus, sans toucher au reste */
(function () {
  const ch = CHAPTERS.find(c => c.t.startsWith('VII'));
  if (!ch) return;
  const i = ch.steps.findIndex(s => s.t().includes('La Gazette'));
  ch.steps.splice(i < 0 ? ch.steps.length : i + 1, 0,
    { t: () => "Oniris : l'archiviste du Conseil", done: () => !!G.flags.tk_oniris1 || arcSkip(), goal: () => ({ map: 'u6', txt: "Graineval : Oniris veut te parler de ce qu'il a vu au Conseil, avant la vague.", npc: 'talk5', talk: 'oniris1' }) },
    { t: () => 'Les archives de Port-Sève', done: () => !!G.flags.tk_silence || arcSkip(), goal: () => ({ map: 'u0', txt: "Port-Sève : Clara Vey t'attend sous la vieille capitainerie, avec les archives du Conseil.", npc: 'talk5', talk: 'silence' }) });
  ch.h += 1;
  const w = POSTGAME.find(p => p.t === 'Ce que le monde est devenu'); if (w) { const pr = w.prog; w.prog = () => { const [a, b] = pr(); return [a + (G.flags.silenceChoice != null ? 1 : 0), b + 1]; }; }
})();

/* GPS : viser la bonne personne quand plusieurs conversations attendent dans la même ville */
const _gpsPoint9 = gpsPoint;
gpsPoint = function (m, goal) {
  if (goal && goal.talk) { const n = RT.npcs.find(nn => nn.script === 'talk5' && nn.data === goal.talk && visibleNpc(nn)); if (n) return [n.x, n.y, n.speaker || 'Conversation']; }
  return _gpsPoint9(m, goal);
};

/* ============================================================
   CURSEUR VISIBLE ET CHOIX AU TOUCHER
   Le curseur clignote et avance par petits bonds, la ligne choisie
   est surlignée, et on peut toucher (ou cliquer) une option pour la choisir.
   Toucher une boîte de dialogue fait avancer le texte.
   ============================================================ */
(function cursorCss() {
  const st = document.createElement('style');
  st.textContent = `@keyframes cursBob { 0%,100% { transform: translate(0,-50%); } 50% { transform: translate(calc(var(--px) * 1.6),-50%); } }
  .mi.sel::before, .gi.sel::before { border-top-width: calc(var(--px) * 3.6) !important; border-bottom-width: calc(var(--px) * 3.6) !important; border-left-width: calc(var(--px) * 5) !important; animation: cursBob .7s ease-in-out infinite; filter: drop-shadow(0 0 calc(var(--px) * .8) rgba(255,120,80,.7)); }
  .mi.sel { background: rgba(226,112,58,.14); border-radius: calc(var(--px) * 2); }
  .mi.sel span { color: #b8451c; font-weight: 600; }
  .gi.sel { color: #b8451c; font-weight: 600; }
  #ui .mi, #ui .gi, #ui .pslot { cursor: pointer; }
  @media (prefers-reduced-motion: reduce) { .mi.sel::before, .gi.sel::before { animation: none; } }`;
  document.head.appendChild(st);
})();
(function tapToChoose() {
  const ui = document.getElementById('ui'); if (!ui) return;
  ui.addEventListener('click', e => {
    const it = e.target.closest('.mi, .gi, .pslot');
    if (it) {
      const box = it.parentElement; const items = [...box.children].filter(c => c.matches('.mi, .gi, .pslot'));
      const to = items.indexOf(it), from = items.findIndex(c => c.classList.contains('sel'));
      if (to < 0) return;
      if (from >= 0 && from !== to) {
        if (box.classList.contains('grid')) {
          const cols = (getComputedStyle(box).gridTemplateColumns || '').split(' ').filter(Boolean).length || 2;
          const dr = Math.floor(to / cols) - Math.floor(from / cols), dc = (to % cols) - (from % cols);
          for (let i = 0; i < Math.abs(dr); i++) Input.q.push(dr > 0 ? 'down' : 'up');
          for (let i = 0; i < Math.abs(dc); i++) Input.q.push(dc > 0 ? 'right' : 'left');
        } else for (let i = 0; i < Math.abs(to - from); i++) Input.q.push(to > from ? 'down' : 'up');
      }
      Input.q.push('a'); if (typeof audioInit === 'function') audioInit();
      e.preventDefault(); return;
    }
    const d = e.target.closest('.dlg, .btext');
    if (d && d.querySelector('.more') && !ui.querySelector('.menu') && UI.stack.length) { Input.q.push('a'); if (typeof audioInit === 'function') audioInit(); }
  });
})();
