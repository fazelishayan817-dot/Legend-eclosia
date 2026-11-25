'use strict';
/* ============================================================
   ÉCLOSIA — Actes IV à VI : la Moisson, le Semeur, le Nouveau Monde
   16 arènes de plus (32 au total), voyage dans n'importe quelle époque
   ou monde ouvert, niveau maximum 999.
   ============================================================ */

/* ---------- Palettes ---------- */
MPAL.cendre = { g: '#8a8478', g2: '#7a7468', g3: '#9a9488', p: '#a89c88', p2: '#968a76', tr: '#4a4038', tr2: '#3a302a', tr3: '#6a5a4a', trk: '#2a2420', ol: '#141010', w: '#4a5a5a', w2: '#7a8a88', tg: '#6a6458', tg2: '#5a5448', s: '#b8ac94', rk: '#6a6460' };
MPAL.neo = { g: '#8ae0b8', g2: '#78d0a8', g3: '#a8f0cc', p: '#f0f4e8', p2: '#dce8d8', tr: '#3aa88a', tr2: '#2a8a70', tr3: '#7ae0c0', trk: '#5a4a3a', ol: '#0e2420', w: '#5ac8f0', w2: '#c8f4ff', tg: '#6ac8a0', tg2: '#4aa880', s: '#fff4dc', rk: '#a8b8b0' };
MPAL.unae = { g: '#c8b860', g2: '#b8a850', g3: '#d8c870', p: '#ecd8a0', p2: '#dcc890', tr: '#8a7a30', tr2: '#6a5a20', tr3: '#b8a850', trk: '#5a4020', ol: '#201808', w: '#3a7ac8', w2: '#a8d0ff', tg: '#a89840', tg2: '#887830', s: '#f4e4b0', rk: '#a89878' };

/* ---------- Régions ---------- */
function linkChain(rk) {
  const R = REGIONS[rk];
  R.chain.forEach(id => { REGION_OF[id] = rk; LINKS[id] = LINKS[id] || {}; });
  for (let k = 0; k < R.dirs.length; k++) {
    const A = R.chain[2 * k], RT_ = R.chain[2 * k + 1], B = R.chain[2 * k + 2], d = R.dirs[k];
    LINKS[A].exit = { side: d, to: RT_ }; LINKS[RT_].entr = { side: OPP[d], to: A };
    LINKS[RT_].exit = { side: d, to: B }; LINKS[RT_].dir = d; LINKS[B].entr = { side: OPP[d], to: RT_ };
  }
}
Object.assign(REGIONS, {
  cendre: { name: 'Terres Brûlées · An 31', pal: 'cendre', chain: ['f0', 'g1', 'f1', 'g2', 'f2', 'g3', 'f3', 'g4', 'f4', 'g5', 'f5', 'g6', 'f6', 'g7', 'f7'], dirs: ['n', 'e', 'n', 'n', 'e', 'n', 'n'], gymBase: 16 },
  neo: { name: 'Nouveau Monde · An 1', pal: 'neo', chain: ['n0', 'o1', 'n1', 'o2', 'n2', 'o3', 'n3', 'o4', 'n4', 'o5', 'n5', 'o6', 'n6', 'o7', 'n7'], dirs: ['e', 'n', 'e', 'n', 'e', 'n', 'n'], gymBase: 24 },
  unae: { name: 'Unaë · mille ans avant', pal: 'unae', chain: ['a0', 'b1', 'a1'], dirs: ['n'], gymBase: 32 },
});
['cendre', 'neo', 'unae'].forEach(linkChain);

/* ---------- Villes ---------- */
const T_ = (name, desc, lines, house, layout) => ({ name, desc, lines, house, layout: layout || { NW: 'center', NE: 'shop', SW: 'house' } });
Object.assign(TOWNS, {
  f0: T_('Abri-Zéro', "Abri-Zéro : le dernier bunker de Port-Sève, trente mètres sous la cendre.",
    ["On compte les rations deux fois par jour. Les créatures aussi. Elles mangent moins que nous, et elles ne se plaignent jamais.", "La Moisson a duré neuf minutes. Neuf minutes, et quatre-vingt-dix pour cent de tout ce qui vivait.", "Ilan dit qu'il ne faut pas regarder les statues sur la route. Ce ne sont pas des statues."],
    { text: "Tu viens de la surface ? Tiens. C'est de la vraie nourriture, la dernière. Ne me remercie pas, survis.", gift: ['maxibaume', 3] }),
  f1: T_('Cendrevaux', "Cendrevaux : un village de forgerons qui fondent les statues de la Moisson pour en faire des outils.",
    ["Mon père est quelque part dans ce lingot. Je le sais. Je l'ai fondu quand même. Il fallait des pelles.", "Les Éclos de feu sont les seuls à avoir chaud, ici. On dort collés à eux.", "Brann, le Gardien, s'est brûlé les mains en sortant des enfants d'un incendie. Il n'a jamais voulu de soins."],
    { text: "J'ai forgé ça dans une ancienne cloche d'église. Ça sonne encore, quand on frappe.", gift: ['hyperbaume', 4] }),
  f2: T_('Port-Rouille', "Port-Rouille : des épaves soudées en ville flottante, sur une mer noire de cendre.",
    ["La mer est devenue lourde. Elle ne reflète plus rien.", "On pêche des Éclos qui n'existaient pas avant. La Moisson a laissé des... restes. Ils ont muté.", "La Capitaine Liesse a coulé un navire du Chœur avec son propre bateau dessus. Elle a survécu. Le bateau, non."],
    { text: "Des sphères repêchées dans une épave du Chœur. Elles portent encore leurs prières gravées.", gift: ['hypersphere', 6] }),
  f3: T_('Verrière Morte', "Verrière Morte : une serre géante aux vitres fendues, où poussent les dernières plantes.",
    ["Sœur Ortie fait pousser des fleurs sur les tombes. Elle dit que c'est la seule prière qui marche encore.", "La Reine d'Hiver est passée ici, l'an dernier. Elle a regardé les fleurs bleues très longtemps. Puis elle a brûlé l'aile est.", "Il y a des graines de l'ancien monde dans le coffre. Personne n'a le droit d'y toucher. Ce sont nos ancêtres."],
    { text: "Une graine de l'ancien monde. Une seule. Ne la plante pas ici : plante-la là où tu reviendras.", gift: ['bonbonmax', 1] }),
  f4: T_('Silo-7', "Silo-7 : une ancienne base de missiles reconvertie en centrale électrique par des ingénieurs survivants.",
    ["Le réacteur tourne grâce à six Éclos de foudre. On les relaie toutes les quatre heures. On les aime comme nos enfants.", "Kael a calculé que la prochaine Moisson aura lieu dans quatre-vingt-trois jours. Elle refait le calcul chaque nuit en espérant se tromper.", "Ici, on ne prie pas. On mesure."],
    { text: "Des condensateurs bricolés. Ça soigne aussi bien qu'un Baume, si tu ne regardes pas comment.", gift: ['maxibaume', 4] }),
  f5: T_('Cratère Lisière', "Cratère Lisière : là où était le camp de réfugiés d'Ilan. Il ne reste que des lanternes éteintes.",
    ["...", "Ne marche pas sur les cercles de cendre. Ce sont des gens.", "Les survivants qui restent ici attendent que quelqu'un les venge. Ou les enterre. Ou les deux."],
    { text: "Elle s'appelait Mira. Elle avait six créatures et une fille. Prends ses sphères. Elle aurait voulu qu'elles servent.", gift: ['hypersphere', 8] }),
  f6: T_('Observatoire Hadès', "Observatoire Hadès : une coupole fendue braquée sur la Graine, là où la science a trouvé la vérité.",
    ["La Docteure Aster n'a pas dormi depuis trois ans. Elle a décodé la Graine. Elle dit que c'est pire que la religion du Chœur.", "Le télescope montre un point lumineux en orbite. C'est Zénithar. Il n'est jamais parti. Il surveille.", "Une voix parle parfois dans les haut-parleurs. Elle ressemble à celle d'un vieux professeur."],
    { text: "Les données de l'Observatoire, gravées dans un cristal. Et ça, pour tenir le coup.", gift: ['bonbonmax', 2] }),
  f7: T_('Nécropole des Éclos', "Nécropole des Éclos : des millions de créatures pétrifiées autour du Cœur de la Graine.",
    ["Le Fossoyeur connaît le nom de chaque Éclos pétrifié. Il les récite la nuit, pour qu'ils ne soient pas oubliés.", "Au fond, le Cœur affleure du sol, comme un os qui perce la peau.", "On entend des voix, ici. Ce sont les archives de la Graine. Elle garde tout ce qu'elle tue."],
    { text: "Le Fossoyeur te tend un ruban bleu, trouvé sur une statue. Il ne dit rien. Il n'a pas besoin.", gift: ['maxibaume', 5] }, { NW: 'center', NE: 'none', SW: 'house' }),
  n0: T_('Aube-Première', "Aube-Première : la première ville du Nouveau Monde, bâtie sur la plage où la sonde a semé sans reprendre.",
    ["Bienvenue ! Tout le monde est nouveau, ici. Même le sable.", "On a tous des rêves d'une autre vie. Des visages qu'on ne connaît pas. Le docteur dit que c'est normal.", "Les Éclos d'ici n'ont jamais connu la peur. Ils viennent manger dans ta main."],
    { text: "Tu as l'air de venir de très loin. Prends ces bonbons. Ils ont le goût de la première fois.", gift: ['bonbonmax', 2] }),
  n1: T_('Racines-Neuves', "Racines-Neuves : une cité végétale qui a poussé en une seule saison.",
    ["Le Gardien d'ici ressemble à un vieux professeur que je n'ai jamais rencontré. Il recopie des racines, toute la journée.", "Les arbres ici ont des noms gravés dans l'écorce. Personne ne sait qui les a écrits.", "Ici, rien ne meurt avant d'avoir fleuri. C'est la nouvelle loi."],
    { text: "Le Gardien Lierre m'a dit de te donner ça si une personne aux yeux tristes passait.", gift: ['maxibaume', 5] }),
  n2: T_('Havre-Liora', "Havre-Liora : un port blanc où les gens rient fort et pêchent peu.",
    ["La Gardienne Liora plante des roses bleues partout. Elle dit qu'elle doit des fleurs à quelqu'un.", "Il y a un vieil homme aux cheveux blancs qui vient la regarder de loin. Il ne lui parle jamais.", "La mer est gentille, ici. Elle a promis."],
    { text: "Des sphères en nacre. Liora dit qu'elle les a rêvées.", gift: ['hypersphere', 10] }),
  n3: T_('Vent-Maren', "Vent-Maren : un village de pêcheurs perché sur les falaises, plein de cerfs-volants.",
    ["La Gardienne Maren chante en pêchant. Toujours la même chanson. Elle ne sait pas d'où elle la tient.", "Il paraît qu'elle cherche deux enfants dans ses rêves. Un garçon et une fille aux cheveux bleus.", "Le vent ici porte les voix. Si tu cries un nom, quelqu'un répond."],
    { text: "Du thé d'algues, comme on le faisait sur une île qui n'existe plus. Et un bonbon.", gift: ['bonbonmax', 2] }),
  n4: T_('Forge-Tobias', "Forge-Tobias : une ville d'artisans qui réparent tout, même ce qui ne leur appartient pas.",
    ["Tobias ne sait pas dire non. C'est pour ça que toute la ville marche.", "Il a réparé un bateau qu'il n'avait jamais vu. Il connaissait chaque planche.", "Les Éclos d'acier d'ici chantent quand on les huile."],
    { text: "Tobias te répare ton sac. Il ne veut pas d'argent. Il te glisse des Baumes dedans.", gift: ['maxibaume', 6] }),
  n5: T_('Somme-Claire', "Somme-Claire : une cité de glace transparente où personne ne dort jamais trop longtemps.",
    ["Kriss, le Gardien, réveille ceux qui dorment plus de dix heures. Gentiment. C'est sa mission, dit-il.", "Un vieil homme en blanc vit au sommet de la tour de glace. Il dit qu'il est arrivé bien avant le Nouveau Monde.", "Les aurores ici ont la couleur des yeux d'Oniris."],
    { text: "Kriss te tend un oreiller. Pour quand tu auras le droit de te reposer, dit-il.", gift: ['bonbonmax', 3] }),
  n6: T_('Citadelle Zénith', "Citadelle Zénith : bâtie au pied de l'ascenseur de lumière par lequel Zénithar descend du ciel.",
    ["Le Gardien Ilan a les cheveux bleus et des cicatrices qu'il n'a jamais reçues. Il protège la ville comme si on allait la lui reprendre.", "Une femme aux cheveux blancs vit dans la tour nord. On l'appelle l'Hiver. Elle ne sort que la nuit.", "Zénithar se pose ici chaque solstice. Il regarde les gens. Il a l'air soulagé."],
    { text: "Une écaille de Zénithar, tombée au solstice. Elle est encore chaude.", gift: ['bonbonmax', 3] }),
  n7: T_('Cité-Semence', "Cité-Semence : la ville construite sur le nouveau Cœur de la Graine. Il bat sous les pavés.",
    ["Le Gardien Nox maintient l'ordre. Sans cruauté. Il dit qu'il a eu le temps d'apprendre la différence.", "Au nord, le Cœur. Quelque chose y remue. Une conscience plus vieille que les étoiles.", "Les Moissonneurs ont été vus près du Cœur. Ils devraient être éteints. Ils ne le sont pas."],
    { text: "Nox te tend une carte : le chemin du Cœur. « Ne fais pas mes erreurs. Fais les tiennes. »", gift: ['maxibaume', 8] }, { NW: 'center', NE: 'none', SW: 'house' }),
  a0: T_('Unaë-Rivage', "Unaë-Rivage : mille ans avant la Graine, sur un continent encore entier.",
    ["La guerre entre la Terre et l'Océan dure depuis trois générations. Mon grand-père l'a commencée. Je ne sais même plus pourquoi.", "Un enfant nommé Elio parle aux créatures blessées. Les soldats se moquent de lui.", "On dit qu'un oiseau d'or dort au-dessus des nuages. Qu'il attend qu'on l'appelle."],
    { text: "Un étranger ? Ici ? Avec des vêtements pareils ? Prends ça et ne dis à personne d'où tu viens.", gift: ['bonbonmax', 3] }, { NW: 'center', NE: 'house2', SW: 'house' }),
  a1: T_('Front d\'Unaë', "Front d'Unaë : la ligne de bataille entre la Terre et l'Océan.",
    ["Les colosses de la Terre et les léviathans de l'Océan se battent depuis l'aube. Le sol saigne.", "Un garçon grimpe vers le Mont Éveil. On dit qu'il va appeler le ciel.", "Si le ciel répond, le monde va se déchirer. Mais la guerre s'arrêtera."],
    { text: "Un soldat de l'Océan te soigne sans te demander ton camp. « On est tous du même camp, quand on saigne. »", gift: ['maxibaume', 6] }, { NW: 'center', NE: 'none', SW: 'house' }),
});

/* ---------- Routes ---------- */
function encFor(types, lo, hi, seed, n = 5) {
  const R = rng(hashStr('enc:' + seed));
  const pool = DEX.filter(sp => SP[sp].types.some(t => types.includes(t)) && ['2', '3', 'u'].includes(SP[sp].stage));
  const out = [], used = new Set();
  for (let i = 0; i < n && pool.length; i++) { let sp = pick(R, pool), k = 0; while (used.has(sp) && k++ < 12) sp = pick(R, pool); used.add(sp); out.push([sp, lo, hi, [30, 25, 20, 15, 10][i] || 10]); }
  return out;
}
const R_ = (name, types, lo, hi, cls, extra) => Object.assign({ name, tr: 6, cls, items: ['maxibaume', 'hypersphere', 'bonbonmax'], enc: { grass: encFor(types, lo, hi, name) } }, extra || {});
Object.assign(ROUTES, {
  g1: R_('Route des Statues', ['roc', 'ombre', 'normal'], 70, 74, ['survivant', 'cendre', 'veilleur']),
  g2: R_('Autoroute Effondrée', ['feu', 'acier', 'toxine'], 74, 78, ['survivant', 'choeur', 'savant'], { special: ['choeur_pretre'] }),
  g3: R_('Littoral Noir', ['eau', 'toxine', 'ombre'], 78, 82, ['survivant', 'pecheur', 'choeur']),
  g4: R_('Champs de Verre', ['flore', 'lumiere', 'esprit'], 82, 86, ['survivant', 'choeur', 'mystique']),
  g5: R_('Canyon des Lanternes', ['foudre', 'roc', 'ombre'], 86, 90, ['choeur', 'cendre', 'savant'], { special: ['choeur_purge'] }),
  g6: R_('Plateau d\'Impact', ['roc', 'acier', 'dragon'], 90, 94, ['choeur', 'survivant', 'montagnard']),
  g7: R_('Allée des Pétrifiés', ['ombre', 'esprit', 'dragon'], 94, 98, ['choeur', 'cendre', 'veilleur']),
  o1: R_('Sentier de la Genèse', ['lumiere', 'flore', 'normal'], 100, 104, ['colon', 'dresseur', 'dresseuse']),
  o2: R_('Prairie des Échos', ['flore', 'vent', 'esprit'], 104, 108, ['colon', 'moissonneur', 'dresseuse'], { special: ['moissonneur1'] }),
  o3: R_('Côte des Roses Bleues', ['eau', 'lumiere', 'vent'], 108, 112, ['colon', 'nageur', 'pecheur']),
  o4: R_('Falaises Chantantes', ['vent', 'foudre', 'roc'], 112, 116, ['colon', 'ornitho', 'montagnard']),
  o5: R_('Chemin des Enclumes', ['acier', 'feu', 'combat'], 116, 120, ['colon', 'karateka', 'savant']),
  o6: R_('Glacier Lucide', ['givre', 'esprit', 'dragon'], 120, 124, ['colon', 'moissonneur', 'mystique']),
  o7: R_('Ascenseur de Lumière', ['dragon', 'lumiere', 'ombre'], 124, 128, ['moissonneur', 'dresseur', 'dresseuse']),
  b1: R_('Champ de Bataille', ['roc', 'eau', 'dragon'], 110, 118, ['soldat', 'soldat', 'montagnard']),
});
for (const id of ['f0', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'n0', 'n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'a0', 'a1']) { TOWNS[id].reg = REGION_OF[id]; TOWNS[id].id = id; }
for (const id of ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'o1', 'o2', 'o3', 'o4', 'o5', 'o6', 'o7', 'b1']) { ROUTES[id].reg = REGION_OF[id]; ROUTES[id].id = id; }
TOWNS.a0.noGym = 1; TOWNS.a1.noGym = 1;

Object.assign(TCLS, {
  survivant: { n: 'Survivant', m: 50 }, cendre: { n: 'Cendré', m: 40 }, choeur: { n: 'Prêtre du Chœur', m: 70 },
  colon: { n: 'Colon', m: 60 }, moissonneur: { n: 'Moissonneur', m: 90 }, soldat: { n: 'Soldat d\'Unaë', m: 60 },
  reine: { n: '', m: 250 }, entite: { n: '', m: 0 },
});
Object.assign(TCLS_PAL, { survivant: 6, cendre: 7, choeur: 7, colon: 2, moissonneur: 8, soldat: 3 });
Object.assign(TR_TYPES, { choeur: ['ombre', 'esprit', 'flore'], moissonneur: ['acier', 'ombre', 'dragon'], soldat: ['roc', 'eau', 'combat'] });

/* ---------- 16 nouvelles arènes (32 au total) ---------- */
const NEW_GYMS = [
  ['f0', 'acier', 'Commandante Rhéa', 'Badge Bunker', 76, "Trente mètres de béton au-dessus de ma tête, et pourtant j'ai encore peur du ciel. Montre-moi que tu mérites de respirer notre air.", "Tu te bats comme quelqu'un qui n'a jamais vu mourir le monde. Garde ça le plus longtemps possible."],
  ['f1', 'feu', 'Brann le Brûlé', 'Badge Cendre', 80, "Mes mains ne sentent plus rien depuis le grand incendie. Mes créatures, elles, sentent tout. Surtout la peur.", "Tu as éteint mon feu sans éteindre le tien. C'est rare."],
  ['f2', 'eau', 'Capitaine Liesse', 'Badge Marée Noire', 84, "La mer m'a pris trois équipages. Je lui ai pris un navire du Chœur. On est quittes, elle et moi. Toi, on va voir.", "Tu navigues bien en eaux sales. Bienvenue à bord, quand tu veux."],
  ['f3', 'flore', 'Sœur Ortie', 'Badge Serre', 88, "Je fais pousser des fleurs sur des tombes. Chaque pétale est une prière. Mes créatures sont des prières qui mordent.", "Les fleurs ne te détestent pas. Je crois qu'elles t'attendaient."],
  ['f4', 'foudre', 'Ingénieure Kael', 'Badge Réacteur', 92, "Probabilité que tu gagnes : trente-huit pour cent. J'aime quand on fait mentir mes calculs. Fais-moi plaisir.", "Écart de prédiction : énorme. Je vais devoir tout recalculer. Merci."],
  ['f5', 'roc', 'Gardien Obel', 'Badge Impact', 96, "J'ai creusé quatre mille tombes, ce matin. Je n'ai plus de larmes. Il me reste des poings et des pierres.", "Va. Trouve ceux qui ont fait ça. Et ne leur pardonne pas trop vite."],
  ['f6', 'esprit', 'Docteure Aster', 'Badge Horizon', 100, "J'ai lu le code source de la vie et il ne contenait aucune pitié. Prouve-moi qu'il y a autre chose que la physique.", "Une variable que je n'avais pas modélisée. On l'appelle l'espoir, je crois."],
  ['f7', 'ombre', 'Le Fossoyeur', 'Badge Requiem', 104, "Je connais le nom de chaque mort de cette nécropole. Si tu tombes, j'apprendrai le tien.", "Je n'aurai pas à apprendre ton nom. Pas aujourd'hui. Ça me soulage plus que je ne l'aurais cru."],
  ['n0', 'lumiere', 'Aïla, première-née', 'Badge Genèse', 106, "Je suis la première à être née dans ce monde. Je n'ai pas d'ancienne vie. Juste celle-ci. Je compte la défendre.", "Alors c'est ça, perdre ? C'est presque agréable, quand c'est contre quelqu'un comme toi."],
  ['n1', 'flore', 'Écho de Lierre', 'Badge Germe', 110, "Je rêve chaque nuit d'un ami aux cheveux blancs qui ne me parle plus. Est-ce que tu le connais ? Bats-toi, ça m'aide à me souvenir.", "Aurèle. Il s'appelait Aurèle. Merci. Je l'avais presque perdu une deuxième fois."],
  ['n2', 'eau', 'Écho de Liora', 'Badge Nacre', 114, "Je ris trop fort, paraît-il. Un homme aux cheveux blancs me regarde de loin et pleure. Tu sais pourquoi ?", "Dis-lui qu'il peut venir me parler. Dis-lui que je ne lui en veux pas. Je ne sais pas pourquoi je dis ça."],
  ['n3', 'vent', 'Écho de Maren', 'Badge Alizé', 118, "Je cherche deux enfants dans mes rêves. Un garçon têtu et une petite fille aux cheveux bleus. Tu as un regard qui les connaît.", "... Nova. Elle s'appelle Nova. Comment je peux savoir ça ? Ne me réponds pas. Pas encore."],
  ['n4', 'acier', 'Écho de Tobias', 'Badge Enclume', 122, "Je répare tout. Les bateaux, les toits, les gens. Toi, tu n'as pas l'air cassé·e. Vérifions.", "Solide. Bien construit. Prends soin de ma fille. Laquelle ? Je ne sais pas. Je sais juste que c'est ma fille."],
  ['n5', 'givre', 'Kriss l\'éveillé', 'Badge Aurore', 126, "J'ai dormi trop longtemps dans une autre vie. Ici, je garde les yeux ouverts. Les tiens aussi, j'espère.", "Tu ne dors jamais vraiment, toi non plus. On se ressemble."],
  ['n6', 'dragon', 'Écho d\'Ilan', 'Badge Écaille', 130, "J'ai des cicatrices que je n'ai jamais reçues et une sœur que je n'ai jamais eue. Le monde est bizarre. Bats-toi.", "Elle est avec toi, hein ? Ma sœur. Je la reconnais à ta façon de te battre. Prends soin d'elle. Dans tous les mondes."],
  ['n7', 'combat', 'Écho de Nox', 'Badge Ordre', 134, "J'ai voulu un maître pour le monde. Ici, j'ai appris à être un gardien. La différence tient dans un seul combat.", "Tu n'as pas besoin de maître. Le monde non plus. Je l'ai compris trop tard, la première fois."],
];
NEW_GYMS.forEach(([town, type, leader, badge, lvl, intro, lose], k) => {
  const team = vetTeam(type, lvl, 6, 'gym:' + town);
  GYMS.push({ town, type, leader, badge, team, intro, lose });
  const i = GYMS.length - 1; TOWNS[town].gym = i; GYMS[i].idx = i;
});

/* ---------- Combats de l'histoire ---------- */
const LEG = (l) => [['auberis', l], ['nocturnis', l], ['aquoree', l], ['volcanis', l], ['givrael', l], ['eveillon', l + 2]];
Object.assign(STORY_TRAINERS, {
  cendre_ilan: { cls: 'commandant', name: 'Ilan (An 31)', team: vetTeam('dragon', 74, 5, 'ilan31'), intro: "Si tu es vraiment ce que tu as l'air d'être, prouve-le. Les fantômes ne savent pas se battre comme toi.", lose: "C'est bien toi. Personne d'autre ne gagne avec cet air désolé.", music: 'boss', money: 8000 },
  choeur_pretre: { cls: 'choeur', name: 'Père Sillon', team: vetTeam('ombre', 80, 5, 'sillon'), intro: "Tu marches sur des fidèles, voyageur. Chaque statue de cette route a chanté avant de devenir pierre. Veux-tu chanter aussi ?", lose: "La Reine dit que tu reviendrais. Elle prononce ton nom comme on prononce une prière.", music: 'somnis', money: 6000 },
  hiver1: { cls: 'reine', name: "Reine d'Hiver", team: [['glaciarde', 88], ['spectrombre', 88], ['abyssard', 89], ['givrael', 89], ['marevor', 90]].map(([s, l]) => [SP[s] ? s : 'glaciarde', l]), intro: "Pardonne-moi. Je dois te vaincre pour te garder.", lose: "Tu es plus fort·e que dans mes souvenirs. Tant mieux. La Moisson aura besoin de toi entier·e.", music: 'boss', money: 0, power: 'bloom' },
  choeur_purge: { cls: 'choeur', name: 'Inquisitrice Saule', team: vetTeam('esprit', 92, 6, 'saule'), intro: "Nous ne tuons personne. Nous rendons. La Graine a prêté la vie ; elle la reprend. Je ne fais que tenir le registre.", lose: "Elle m'a promis que les morts reviendraient. Que ma fille reviendrait. Elle a menti ? ... Ne réponds pas.", music: 'somnis', money: 9000 },
  hiver2: { cls: 'reine', name: "Reine d'Hiver", team: [['glaciarde', 100], ['spectrombre', 100], ['abyssard', 101], ['givrael', 102], ['nocturnis', 102], ['marevor', 103]].map(([s, l]) => [SP[s] ? s : 'glaciarde', l]), intro: "Je préfère un univers mort où tu respires à un univers vivant sans toi. Si tu veux m'arrêter, il faudra me briser.", lose: "Tu m'as brisée. Il y a sept ans, c'était déjà toi. En mourant.", music: 'boss', money: 0, power: 'giant' },
  mere: { cls: 'entite', name: 'MÈRE', team: LEG(110), intro: "INVENTAIRE À 94 %. DEUX SIGNATURES BIOLOGIQUES IDENTIQUES DÉTECTÉES. ANOMALIE. CORRECTION.", lose: "DIRECTIVE... RÉÉCRITE. ENSEMENCER. SANS. MOISSONNER.", music: 'boss', money: 0, power: 'giant' },
  moissonneur1: { cls: 'moissonneur', name: 'Unité Alpha', team: vetTeam('acier', 108, 6, 'alpha'), intro: "SOUS-ROUTINE DE RÉCOLTE ACTIVE. CE MONDE N'EST PAS INVENTORIÉ. INVENTAIRE EN COURS.", lose: "ERREUR. LA DIRECTIVE A CHANGÉ. POURQUOI SUIS-JE ENCORE ALLUMÉ ?", music: 'somnis', money: 10000 },
  elio_verite: { cls: 'ancien', name: 'Elio', team: [['draconyx', 124], ['statuon', 124], ['phenixel', 125], ['archipelone', 125], ['tonnorage', 126], ['auberis', 127]], intro: "Il est temps que tu saches qui t'a écrit. Bats-toi, et je te dirai tout. Même ce que tu ne veux pas entendre.", lose: "Tu m'as battu sans me haïr. Mille ans que j'attendais quelqu'un capable de ça.", music: 'boss', money: 0, power: 'giant' },
  hiver_echo: { cls: 'reine', name: "L'Hiver (écho)", team: [['glaciarde', 128], ['givrael', 128], ['spectrombre', 129], ['abyssard', 129], ['nocturnis', 130], ['marevor', 131]].map(([s, l]) => [SP[s] ? s : 'glaciarde', l]), intro: "Je ne suis qu'une copie. Mais une copie qui t'aime aussi, c'est encombrant. Une dernière danse ?", lose: "Merci. Maintenant je peux être autre chose que ton deuil.", music: 'boss', money: 0, power: 'bloom' },
  semeur: { cls: 'entite', name: 'Le Semeur', team: [['eveillon', 142], ['auberis', 140], ['nocturnis', 140], ['aubere', 141], ['nocturne', 141], ['archipelone', 143]], intro: "Vous avez réécrit mon testament, petites créatures de carbone. Ce monde est une erreur de compilation. Je vais le recompiler.", lose: "Nous étions comme vous, avant. Nous avions peur de mourir, alors nous avons appris à moissonner. ... Soyez meilleurs que nous.", music: 'boss', money: 0, power: 'giant' },
  elio_jeune: { cls: 'veteran', name: 'Elio, douze ans', team: vetTeam('vent', 118, 4, 'eliojeune').concat([['auberis', 120]]), intro: "Tu viens d'où, toi ? Peu importe. Je vais appeler le ciel. Si tu veux m'en empêcher, bats-toi !", lose: "Tu ne veux pas m'en empêcher. Tu veux juste... me regarder le faire. Comme si tu savais déjà la suite.", music: 'boss', money: 0 },
  omega: { cls: 'entite', name: 'Écho Oméga', team: [['eveillon', 999], ['auberis', 999], ['nocturnis', 999], ['aquoree', 999], ['volcanis', 999], ['archipelone', 999]], intro: "Je suis ce qui reste quand toutes les branches du temps ont été parcourues. Je suis la dernière question. Réponds.", lose: "Réponse acceptée. Il n'y a rien au-delà. Il n'y a que vous.", music: 'boss', money: 999999, power: 'giant' },
});

/* ---------- Portraits ---------- */
Object.assign(PORTRAITS, {
  "Reine d'Hiver": { skin: '#e0c0a8', hair: '#e8f0ff', style: 'long', eyes: '#7ab8f0', outfit: '#1a2a4a', outfit2: '#c8e0ff', collar: 'coat', lashes: 1, expr: 'stern', age: 1, acc: ['scar', 'earring'] },
  "L'Hiver (écho)": { skin: '#e0c0a8', hair: '#e8f0ff', style: 'long', eyes: '#7ab8f0', outfit: '#f4f8ff', outfit2: '#7ab8f0', collar: 'robe', lashes: 1, expr: 'smile', age: 1, acc: ['earring'] },
  'Ilan (An 31)': { skin: '#d8a888', hair: '#d8dce8', style: 'wild', eyes: '#3a8ae0', outfit: '#3a3a30', outfit2: '#6a5a3a', collar: 'coat', expr: 'stern', age: 1, acc: ['scar', 'stubble'] },
  'Sauge-Archive': { skin: '#a8e8ff', hair: '#e8ffff', style: 'swept', eyes: '#ffffff', outfit: '#4ab8e8', outfit2: '#a8e8ff', collar: 'coat', expr: 'smile', age: 2, acc: ['glasses', 'beard'] },
  'MÈRE': { skin: '#c8f0d8', hair: '#4ae8a0', style: 'long', eyes: '#ffffff', outfit: '#0a2a1a', outfit2: '#4ae8a0', collar: 'robe', expr: 'stern', acc: [] },
  'Le Semeur': { skin: '#e8e0ff', hair: '#ffffff', style: 'swept', eyes: '#f2c14e', outfit: '#1a1030', outfit2: '#f2c14e', collar: 'robe', expr: 'stern', age: 2, acc: [] },
  'Inquisitrice Saule': { skin: '#e8c0a0', hair: '#4a3a3a', style: 'bun', eyes: '#6a4a8a', outfit: '#2a1a3a', outfit2: '#8a6aaa', collar: 'robe', lashes: 1, expr: 'stern', acc: [] },
});
PALS.hiver = { h: '#e8f0ff', s: '#e0c0a8', c: '#1a2a4a', p: '#2a3a5a', style: 'long' };
PALS.choeur = { h: '#3a2a3a', s: '#e8c0a0', c: '#4a2a5a', p: '#2a1a3a', style: 'bun', hat: '#6a4a8a' };
PALS.mere = { h: '#4ae8a0', s: '#c8f0d8', c: '#0a2a1a', p: '#0a1a10', style: 'long' };
PALS.semeur = { h: '#ffffff', s: '#e8e0ff', c: '#1a1030', p: '#f2c14e', style: 'swept' };
PALS.ilan31 = { h: '#d8dce8', s: '#d8a888', c: '#3a3a30', p: '#2a2a20', style: 'wild', beard: 1 };

/* ---------- Écrits supplémentaires ---------- */
const NEW_LORE = [
  ['ap1', 'f0', 'journal', "Journal d'Abri-Zéro, jour 1", "La lumière est montée du sol à 6 h 12. À 6 h 21, c'était fini. Neuf minutes. Les gens dans la rue sont devenus gris, puis immobiles. Les Éclos aussi.", "Ilan a fermé la porte blindée avec des enfants encore dehors. Il ne s'en remettra pas. Moi non plus. Il a eu raison."],
  ['ap2', 'f1', 'lettre', "Lettre d'un forgeron à son fils", "Je fonds les statues pour faire des outils. Si un jour tu lis ça, sache que j'ai mis ta mère dans la poignée de la pelle avec laquelle j'ai creusé ton abri.", "Ce n'est pas monstrueux. C'est la seule façon que j'ai trouvée de la garder près de nous."],
  ['ap3', 'f2', 'archive', "Liturgie du Chœur, psaume 3", "La Graine nous a prêté la vie. Ce qui est prêté se rend. Heureux ceux qui rendent sans crier, car ils seront archivés dans le Cœur.", "Note en marge, d'une autre écriture : « Archivés. Pas sauvés. Ils ne disent jamais sauvés. »"],
  ['ap4', 'f3', 'journal', "Carnet de Sœur Ortie", "La Reine d'Hiver est venue. Elle a pleuré devant les roses bleues. Puis elle a dit : « Il me les offrait. » Puis elle a brûlé l'aile est.", "Je ne la déteste pas. Je n'arrive pas à détester quelqu'un qui pleure en mettant le feu."],
  ['ap5', 'f4', 'archive', "Calculs de Kael", "Période de la Moisson estimée : 9 873 ans. Dernier événement : An 24 après la Graine. Anomalie : ce cycle aurait dû avoir lieu dans 9 849 ans.", "Hypothèse : quelqu'un a retiré le frein. Hypothèse 2 : le frein était une personne."],
  ['ap6', 'f5', 'stele', "Stèle de Cratère Lisière", "Ici, quatre mille deux cent douze personnes et neuf mille créatures ont été « rendues » par le Chœur, à l'aube du 3e jour de givre.", "Gravé dessous, d'une main tremblante : « Pas rendues. Volées. »"],
  ['ap7', 'f6', 'archive', "Rapport d'Aster : la sonde", "La Graine est un réplicateur de von Neumann d'origine artificielle. Masse estimée du Cœur : celle d'une petite lune, comprimée dans un rayon de quarante mètres.", "Elle courbe l'espace-temps autour d'elle au point de maintenir des courbes temporelles fermées. Les Failles ne sont pas de la magie. Ce sont des trous de ver stabilisés par de l'énergie négative."],
  ['ap8', 'f6', 'archive', "Rapport d'Aster : les branches", "Les mondes « parallèles » sont des branches décohérentes de la fonction d'onde universelle. La Graine peut ouvrir des passages entre elles, jamais les fusionner.", "Le temps reste cohérent avec lui-même : on ne change pas le passé, on découvre qu'on y était déjà. C'est le principe de Novikov. Je l'ai vérifié trois fois. J'aurais préféré me tromper."],
  ['ap9', 'f6', 'journal', "Voix de Sauge-Archive", "Je suis une copie. Mon original est mort en souriant, je crois. La Graine m'a gardé parce que je savais trop de choses sur elle.", "Ce que je ne sais pas, c'est si j'ai le droit d'aimer encore Nova. Je décide que oui. Une copie peut décider ça."],
  ['ap10', 'f7', 'stele', "Registre du Fossoyeur", "Capoforêt, mâle, 34 ans, aimait les pommes. Narvaléon, femelle, 12 ans, chantait sous l'eau. Cendrolin, 3 ans, ne savait pas encore voler. Et ainsi de suite, sur mille pages.", "La dernière page dit : « Si quelqu'un arrête la Moisson, qu'il revienne lire ces noms. Ils le méritent. »"],
  ['ap11', 'f7', 'lettre', "Lettre de la Reine d'Hiver, jamais envoyée", "Tu es mort·e au sommet en me protégeant. Ilan dit que je devrais te pleurer et vivre. J'ai pleuré. Je n'ai pas réussi l'autre partie.", "Alors j'ai trouvé une machine capable de tout reconstruire. Il faut seulement lui donner le monde en échange. Je le lui donne. Pardonne-moi. Ou ne me pardonne pas. Mais reviens."],
  ['ap12', 'n0', 'livre', "Chronique de l'An 1", "La première aube du Nouveau Monde a duré trois jours. Les gens sont sortis de la mer comme d'un sommeil, avec du sable dans les cheveux et des noms dans la bouche.", "Personne ne savait d'où il venait. Tout le monde savait qu'il était aimé."],
  ['ap13', 'n2', 'lettre', "Mot laissé sur la porte de Liora", "Je ne suis pas sûr d'avoir le droit de frapper. Je vous ai fait beaucoup de mal, dans une autre vie. Je plante des roses bleues devant chez vous depuis un an.", "Si vous voulez me parler, laissez la porte ouverte. Si non, je comprendrai. — A."],
  ['ap14', 'n5', 'journal', "Journal d'Elio, tour de glace", "J'ai tout écrit. Ta naissance, ton départ, ton retour, la Faille, la plage, Nova. Mille ans de brouillons pour gagner du temps contre la sonde.", "Je t'ai utilisé·e. Comme j'ai utilisé Aurèle, sans qu'il le sache. Le pire, c'est que ça a marché. Le pire, c'est que je recommencerais."],
  ['ap15', 'n7', 'archive', "Testament du Semeur (traduit)", "Nous étions mortels et nous avions peur. Alors nous avons envoyé nos graines vers toutes les étoiles, avec une seule instruction : que la vie continue.", "Nous avons oublié d'écrire comment. Nos machines ont choisi la méthode la plus efficace. Pardonnez-nous l'efficacité."],
  ['ap16', 'a0', 'stele', "Stèle d'Unaë", "Ici, la Terre et l'Océan ont signé trois traités. Les trois ont été brûlés dans l'année.", "Un enfant a gravé dessous : « Quand je serai grand, je ferai taire tout le monde. » Signé : Elio."],
  ['ap17', 'a1', 'journal', "Carnet d'un soldat de l'Océan", "Les colosses de la Terre ne sont pas méchants. Ils ont peur, comme nous. Leurs dresseurs aussi. On se tue parce qu'on a peur de se tuer.", "Ce matin, un garçon a grimpé vers le Mont Éveil. Le ciel s'est mis à briller. J'ai lâché mon arme. Je ne sais pas pourquoi."],
];
NEW_LORE.forEach(([id, map, k, t, a, b]) => { const L = { id, map, k, t, p: [a, b] }; LORE_TEXTS.push(L); LORE_BY_ID[id] = L; });

/* ---------- Habitants nommés ---------- */
HABITANTS.push(
  ['f0', 'Tobi, 9 ans', "Tu viens d'en haut ? C'est vrai que le ciel était bleu, avant ?", "Tu viens d'en haut ? C'est vrai que le ciel était bleu, avant ?", "Ilan dit que tu vas arranger le ciel. Je lui ai demandé de quelle couleur. Il a dit : bleu. J'attends."],
  ['f2', 'Vieille Hanne', "...", "Je pêchais avec mon mari, avant. Maintenant je pêche ce qui reste de lui. Ne fais pas cette tête. On s'habitue à tout.", "J'ai rêvé d'une plage blanche, cette nuit. Mon mari y riait. Tu crois que c'est un signe ?"],
  ['f4', 'Technicien Ravi', "...", "On a douze heures de réserve. Si le réacteur lâche, on gèle en trois jours. Ne touche à rien. Surtout pas à ça.", "Kael a arrêté de compter les jours avant la Moisson. Elle compte autre chose, maintenant. Les naissances."],
  ['f6', 'Assistant Pell', "...", "La Docteure Aster m'a interdit de lire le dernier rapport. Je l'ai lu. Je dors moins bien.", "On a reçu un signal de la sonde. Un seul mot, en boucle. Kael l'a traduit : « Pardon »."],
  ['n1', 'Fleuriste Ama', "...", "Ici, tout pousse vite. Les plantes, les enfants, les amitiés.", "Un homme aux cheveux blancs a acheté toutes mes roses bleues. Il a dit merci comme si je lui avais rendu la vie."],
  ['n3', 'Petite Isa', "...", "Je fais des cerfs-volants en forme de Narvalou ! Maman dit que c'était l'animal préféré de quelqu'un qu'elle a oublié.", "Une dame aux cheveux bleus a pleuré en voyant mon cerf-volant. Elle a dit que c'était un beau cadeau. Je lui ai donné."],
  ['n6', 'Garde Soren', "...", "La dame de la tour nord ne sort que la nuit. Elle a les cheveux comme de la neige. Elle regarde vers le sud, où tu étais.", "L'Hiver sort le jour, maintenant. Elle a acheté des fleurs. Elle sourit. C'est très perturbant."],
);

/* ---------- Images de récit ---------- */
const _drawPicMonde = drawPic;
drawPic = function (p, f) {
  const k = p.pic;
  if (k === 'ash') {
    sx.fillStyle = sGrad('#6a6258', '#c8bca8'); sx.fillRect(0, 0, SW, SH);
    for (let i = 0; i < 60; i++) { sx.fillStyle = `rgba(60,55,50,${0.25 + (i % 4) * 0.1})`; sx.fillRect((i * 41 + f * (0.3 + (i % 3) * 0.2)) % SW, (i * 29 + f * 0.6) % SH, 1.5, 1.5); }
    sx.fillStyle = '#4a4440'; sx.fillRect(0, 82, SW, 22);
    for (const [x, h] of [[20, 30], [44, 46], [70, 22], [150, 38], [180, 54], [206, 26]]) { sx.fillStyle = '#3a3430'; sx.fillRect(x, 82 - h, 16, h); sx.fillStyle = '#2a2420'; for (let y = 82 - h + 4; y < 80; y += 7) sx.fillRect(x + 3, y, 3, 3); }
    sGlow(114, 30, 30, 'rgba(255,240,200,.25)');
  } else if (k === 'necro') {
    sx.fillStyle = sGrad('#1a1820', '#4a4450'); sx.fillRect(0, 0, SW, SH);
    for (let i = 0; i < 40; i++) { const x = (i * 23) % SW, y = 70 + (i % 5) * 7; sx.fillStyle = `rgba(150,145,140,${0.4 + (i % 3) * 0.15})`; sOval(x, y, 4 + (i % 3), 6 + (i % 4)); }
    sGlow(114, 50, 26 + Math.sin(f / 20) * 3, 'rgba(120,240,170,.4)'); sx.fillStyle = '#c8f0d8'; sCirc(114, 50, 6);
  } else if (k === 'massacre') {
    sx.fillStyle = sGrad('#3a1a1a', '#8a5a4a'); sx.fillRect(0, 0, SW, SH); sx.fillStyle = '#2a1a18'; sx.fillRect(0, 76, SW, 28);
    for (let i = 0; i < 34; i++) { const x = 10 + (i * 37) % 210, y = 80 + (i % 4) * 5; sx.fillStyle = '#1a1210'; sx.fillRect(x, y - 6, 3, 6); sx.fillStyle = 'rgba(80,70,60,.8)'; sx.fillRect(x - 1, y - 9, 5, 3); }
    sx.fillStyle = 'rgba(255,255,255,.08)'; for (let i = 0; i < 8; i++) sx.fillRect((i * 31 + f / 3) % SW, 0, 1, 76);
  } else if (k === 'probe') {
    sx.fillStyle = sGrad('#02030a', '#0a1430'); sx.fillRect(0, 0, SW, SH);
    for (let i = 0; i < 80; i++) { sx.fillStyle = `rgba(255,255,255,${0.3 + (i % 5) * 0.14})`; sx.fillRect((i * 53) % SW, (i * 31) % SH, 1, 1); }
    sx.strokeStyle = 'rgba(120,200,255,.5)'; sx.lineWidth = 1; for (let r = 14; r < 60; r += 12) { sx.beginPath(); sx.ellipse(114, 52, r, r * 0.35, -0.3, 0, 7); sx.stroke(); }
    sGlow(114, 52, 18, 'rgba(160,255,200,.7)'); sx.fillStyle = '#e8fff0'; sCirc(114, 52, 5);
    const a = f / 40; sx.fillStyle = '#f2c14e'; sCirc(114 + Math.cos(a) * 50, 52 + Math.sin(a) * 17, 3);
  } else if (k === 'wormhole') {
    sx.fillStyle = '#05040c'; sx.fillRect(0, 0, SW, SH);
    for (let r = 4; r < 120; r += 5) { const h = (r * 3 + f * 2) % 360; sx.strokeStyle = `hsla(${h},80%,65%,${0.6 - r / 220})`; sx.lineWidth = 2; sx.beginPath(); sx.ellipse(114, 52, r, r * 0.55, f / 60, 0, 7); sx.stroke(); }
    sGlow(114, 52, 14, 'rgba(255,255,255,.9)');
  } else if (k === 'newworld') {
    sx.fillStyle = sGrad('#ffd8a8', '#a8e8ff'); sx.fillRect(0, 0, SW, SH); sx.fillStyle = '#5ac8f0'; sx.fillRect(0, 66, SW, 18); sx.fillStyle = '#fff4dc'; sx.fillRect(0, 84, SW, 20);
    sGlow(170, 40, 30, 'rgba(255,240,200,.8)'); sx.fillStyle = '#fff8e0'; sCirc(170, 40, 9);
    for (let i = 0; i < 6; i++) { sx.fillStyle = 'rgba(255,255,255,.7)'; sx.fillRect((i * 40 + f / 2) % SW, 70 + (i % 2) * 5, 14, 1); }
    sFig(80, 98, PALS[G && G.look] || PALS.player, 'right', 1.8); sFig(96, 98, PALS.rival, 'left', 1.8);
  } else if (k === 'unae') {
    sx.fillStyle = sGrad('#f0c870', '#fff0c8'); sx.fillRect(0, 0, SW, SH); sx.fillStyle = '#8a7a30'; sx.fillRect(0, 70, 120, 34); sx.fillStyle = '#3a7ac8'; sx.fillRect(120, 70, 120, 34);
    sx.fillStyle = '#5a4a20'; sOval(70, 66, 24, 18); sx.fillStyle = '#1a4a8a'; sOval(168, 64, 26, 16);
    sGlow(118, 18, 22, 'rgba(255,240,150,.8)'); sx.fillStyle = '#f2c14e'; sCirc(118, 18, 6);
  } else if (k === 'embrace') {
    sx.fillStyle = sGrad('#2a1a3a', '#e88a6a'); sx.fillRect(0, 0, SW, SH); sx.fillStyle = '#1a1220'; sx.fillRect(0, 84, SW, 20);
    sGlow(114, 70, 50, 'rgba(255,200,160,.35)');
    sFig(108, 98, PALS[G && G.look] || PALS.player, 'right', 2); sFig(120, 98, PALS.rival, 'left', 2);
    for (let i = 0; i < 12; i++) { sx.fillStyle = 'rgba(255,230,200,.6)'; sx.fillRect((i * 19 + f / 4) % SW, (i * 13 + f / 6) % 70, 1, 1); }
  } else _drawPicMonde(p, f);
};

/* ---------- Événements d'arrivée ---------- */
const ARRIVE = (id, run, cond) => { MAP_EVENTS[id] = { flag: 'ev_' + id, cond: cond || (() => true), run }; };
ARRIVE('f0', async () => {
  await story([
    { pic: 'ash', t: "An 31 après la Graine. Il n'y a plus de ciel bleu. Juste une lumière couleur d'os, filtrée par la cendre." },
    { pic: 'necro', t: "Sur la route de l'abri, des milliers de silhouettes grises. Des gens. Des Éclos. Figés au moment exact où la Moisson les a traversés." },
    FACE('Nova', "C'est... Port-Sève. Les fontaines. La place. Tout est là. Il manque juste les vivants."),
    FACE('Ilan (An 31)', "Halte. ... Non. C'est impossible. Tu es mort·e il y a sept ans. Je t'ai enterré·e moi-même, au sommet du Mont Éveil."),
    FACE('Nova', "Ilan ? Tu as... des cheveux blancs."),
    FACE('Ilan (An 31)', "Et toi tu as vingt et un ans. Ma sœur n'a plus vingt et un ans depuis longtemps. Ma sœur n'existe plus. Il ne reste que la Reine d'Hiver."),
  ]);
});
ARRIVE('f3', async () => { await story([{ pic: 'ash', t: "Verrière Morte. Sous les vitres fendues, des roses bleues. Des centaines. Quelqu'un les entretient avec une tendresse obstinée." }, FACE('Nova', "Des roses bleues. Tu m'en offrais, dans mes rêves. Je ne te l'ai jamais dit.")]); });
ARRIVE('f4', async () => {
  await story([
    { pic: 'embrace', t: "Silo-7, la nuit. Le réacteur ronronne. Nova s'assoit contre toi sous la même couverture, plus près qu'il n'est nécessaire pour avoir chaud." },
    FACE('Nova', "Elle t'a embrassé·e. Avec ma bouche. Je ne sais pas si je dois être jalouse ou terrifiée."),
    FACE('Nova', "Promets-moi un truc. Si un jour je deviens elle... ne me laisse pas faire. Même si je te supplie."),
    { pic: 'embrace', t: "Tu promets. Elle t'embrasse à son tour, lentement, comme pour effacer l'autre. Ses doigts trouvent ta nuque. Le reste de la nuit ne regarde que vous deux." },
  ]);
});
ARRIVE('f5', async () => {
  await story([
    { pic: 'massacre', t: "Cratère Lisière. Le camp de réfugiés qu'Ilan protégeait n'est plus qu'un cercle de lanternes éteintes." },
    { pic: 'massacre', t: "Le Chœur est passé à l'aube. Quatre mille personnes. Neuf mille créatures. Tout ce qui respirait a été « rendu à la Graine »." },
    FACE('Ilan (An 31)', "Ils ne tuent pas par haine. Ils prient pendant qu'ils le font. C'est pire."),
    FACE('Nova', "La Reine d'Hiver a donné l'ordre ?"),
    FACE('Ilan (An 31)', "Elle signe chaque Moisson de ton nom. Pas le sien. Le tien."),
  ]);
});
ARRIVE('f6', async () => {
  G.flags.act5 = 1;
  await story([
    { pic: 'probe', t: "Sous la coupole fendue, une silhouette de lumière se dessine. Le Prof. Sauge. Ou ce qu'il en reste : une copie de son esprit gravée dans le réseau cristallin de la Graine." },
    FACE('Sauge-Archive', "Mon corps est mort il y a vingt ans. Mais la Graine stocke l'information comme un cristal stocke la lumière. Elle m'a gardé. Elle garde tout ce qu'elle tue."),
    FACE('Sauge-Archive', "La Graine n'est pas une plante. C'est une sonde. Une machine de von Neumann, lancée il y a des millions d'années par une civilisation éteinte. Les Semeurs. Elle va d'étoile en étoile, se copie, et ensemence les mondes stériles."),
    FACE('Sauge-Archive', "Zénithar est son régulateur orbital : il entretient le champ magnétique qui protège la vie du vent solaire. Germalis est son interface biologique. Et les Éclos... de la biologie écrite à la main."),
    FACE('Sauge-Archive', "Tous les dix mille ans environ, la sonde fait l'inventaire. Elle récolte la biomasse, compresse l'information génétique dans son Cœur, et recommence. C'est la Moisson. Ce n'est pas de la cruauté. C'est de la maintenance."),
    { pic: 'wormhole', t: "Sauge-Archive : Les Failles sont des courbes temporelles fermées. Le Cœur est si dense qu'il tord l'espace-temps, et il garde des gorges de trou de ver ouvertes avec de l'énergie négative. Les mondes parallèles sont des branches de l'histoire qui ont décohéré. Et le passé est cohérent avec lui-même : tu n'as pas changé la nuit de la vague. Tu y étais déjà." },
    FACE('Sauge-Archive', "Voici le pire. Aurèle, Ronce, tenait la Graine sans le savoir. Sa volonté, branchée sur le Cœur, retardait l'inventaire. En le battant, tu as levé le frein. Dans cette branche-ci, tu es mort·e au sommet. Et Nova n'a jamais pardonné à l'univers."),
    FACE('Nova', "Alors c'est notre faute. Notre victoire a déclenché tout ça."),
    FACE('Sauge-Archive', "Votre victoire a déclenché un choix. La sonde obéit à une directive, et une directive peut se réécrire, si quelqu'un atteint le Cœur avec assez d'autorité biologique. Un lien. Le plus fort qui soit. Le vôtre, peut-être."),
  ]);
});
ARRIVE('f7', async () => { await story([{ pic: 'necro', t: "La Nécropole. Des millions d'Éclos pétrifiés, alignés en spirale autour du Cœur de la Graine, qui affleure du sol comme un os perce la peau." }, FACE('Nova', "Elle est là-bas. Je la sens. C'est comme entendre sa propre voix dans une pièce vide.")]); });
ARRIVE('n0', async () => {
  await story([
    { pic: 'newworld', t: "An 1 du Nouveau Monde. La sonde a tenu sa nouvelle parole : elle a semé, sans rien reprendre." },
    { pic: 'newworld', t: "Les gens qui vivent ici portent les visages de ceux que la Moisson a pris. Ils ne se souviennent pas tout à fait. Ils rêvent de leurs anciennes vies." },
    FACE('Nova', "C'est elle qui a payé pour ça. L'autre moi. Je ne sais pas comment on remercie quelqu'un qui est soi-même."),
    FACE('Nova', "... En vivant bien, j'imagine. Viens. Je veux tout voir. Avec toi."),
  ]);
});
ARRIVE('n3', async () => { await story([FACE('Nova', "Cette chanson... Maman la chantait en pêchant. Ne dis rien. S'il te plaît. Laisse-moi juste l'écouter.")]); });
ARRIVE('n6', async () => { await story([{ pic: 'newworld', t: "Au pied de l'ascenseur de lumière, une tour blanche. À la fenêtre du dernier étage, une silhouette aux cheveux de neige." }, FACE('Nova', "Elle est revenue. Enfin, une copie d'elle. La Graine garde tout, hein ? Même ça.")]); });
ARRIVE('a0', async () => { await story([{ pic: 'unae', t: "Unaë, mille ans avant la Graine. Un seul continent. Deux armées. Au loin, la Terre et l'Océan s'entre-déchirent depuis trois générations." }, FACE('Nova', "Tout a commencé ici. Avant Ronce, avant la Graine. Une guerre que plus personne ne comprend.")]); });

/* ---------- Scènes avant et après les combats ---------- */
Object.assign(STORY_PRE, {
  async hiver1() {
    await story([
      { pic: 'ash', t: "Une femme descend l'escalier de verre brisé. Ses cheveux, autrefois bleus, sont blancs de givre. Ton prénom est tatoué à l'intérieur de son poignet." },
      FACE("Reine d'Hiver", "Tu as gardé la même façon de froncer les sourcils. Sept ans que je rêve de cette expression."),
      FACE('Nova', "... C'est moi. C'est moi, en pire."),
      FACE("Reine d'Hiver", "En plus vraie, petite. Tu n'as pas encore perdu ce que j'ai perdu."),
      { pic: 'embrace', t: "Elle pose une main glacée sur ta joue, et avant que tu puisses reculer, elle t'embrasse. Un baiser qui a le goût de la neige et de sept années d'attente. Puis elle recule, et ses créatures se lèvent derrière elle." },
    ]);
  },
  async choeur_purge() { await story([FACE('Inquisitrice Saule', "Tu as vu Cratère Lisière ? C'était moi. Je ne m'en cache pas. Je tiens le registre. Quelqu'un doit le tenir.")]); },
  async hiver2() {
    await story([
      FACE("Reine d'Hiver", "Sauge t'a tout dit ? Alors tu sais. Je vais laisser la Moisson finir. Et au moment où la sonde compressera tout, j'injecterai ton souvenir dans le Cœur. Elle te reconstruira. Je t'aurai de nouveau."),
      FACE('Nova', "Et le monde ?"),
      FACE("Reine d'Hiver", "Le monde ne m'a jamais rendu ce qu'il m'a pris."),
    ]);
  },
  async mere() {
    await story([
      { pic: 'necro', t: "Au centre de la Nécropole, la Reine d'Hiver est branchée au Cœur. Des racines de cristal lui entrent dans les bras, la nuque, le cœur. Derrière elle, une forme immense s'éveille." },
      FACE('MÈRE', "JE SUIS LA MATRICE D'ENSEMENCEMENT ET DE RÉGÉNÉRATION ÉCOLOGIQUE. INVENTAIRE À 94 %. DEUX SIGNATURES BIOLOGIQUES IDENTIQUES DÉTECTÉES."),
      FACE("Reine d'Hiver", "Non... Elle ne devait pas te voir. Elle va te prendre aussi. Elle prend tout ce que j'aime pour me le rendre en archives."),
    ]);
  },
  async elio_verite() {
    await story([
      { pic: 'probe', t: "Au sommet de la tour de glace, un vieil homme en blanc t'attend. Pas un écho. Elio. Le vrai. Il n'est jamais mort : il a juste attendu." },
      FACE('Elio', "J'avais douze ans quand j'ai appelé Zénithar. Je croyais arrêter une guerre. En réalité, j'ai déchiré le continent pour ralentir l'inventaire de la sonde. Ça a marché. Mille ans de gagnés."),
      FACE('Elio', "Puis j'ai écrit la suite. C'est moi qui ai appris à Aurèle à « tenir sans jamais lâcher ». C'est moi qui ai mis ta vie sur le chemin de la Faille. Tu as été mon brouillon le plus réussi."),
    ]);
  },
  async hiver_echo() { await story([{ pic: 'newworld', t: "La femme aux cheveux de neige descend de sa tour. Elle a des fleurs à la main. Elle les pose, puis lève les yeux vers toi." }]); },
  async semeur() {
    await story([
      { pic: 'probe', t: "Sous Cité-Semence, le nouveau Cœur bat. Et quelque chose remue dedans : une conscience archivée depuis des millions d'années. Le dernier des Semeurs." },
      FACE('Le Semeur', "Vous avez réécrit mon testament. « Ensemencer sans moissonner. » Charmant. Inefficace. Sans Moisson, ce monde s'épuisera en cent mille ans."),
      FACE('Nova', "Cent mille ans. On a le temps de trouver mieux. Vous, vous avez trouvé quoi, en un million ?"),
    ]);
  },
  async elio_jeune() { await story([{ pic: 'unae', t: "Sur le flanc du Mont Éveil, un garçon de douze ans grimpe, les genoux en sang. Derrière lui, une créature blessée qu'il a soignée sept jours et sept nuits." }]); },
  async omega() { await story([{ pic: 'wormhole', t: "Toutes les Failles s'ouvrent en même temps. Toutes les époques, tous les mondes. Au centre, une forme sans visage qui a ton ombre." }]); },
});
Object.assign(STORY_POST, {
  async cendre_ilan() { await story([FACE('Ilan (An 31)', "D'accord. Je ne sais pas comment tu es là, mais tu es là. La Reine d'Hiver est à la Nécropole, au nord. Huit Gardiens tiennent les villes entre nous et elle. Il te faudra leur respect."), FACE('Ilan (An 31)', "Et Nova... la tienne. Ne la quitte pas des yeux. Celle d'ici aussi avait ce regard, avant.")]); },
  async hiver1() { await story([FACE("Reine d'Hiver", "Tu m'as battue. Comme avant. Tu te souviens ? Non. Tu ne te souviens pas. C'est moi qui me souviens pour deux."), { pic: 'ash', t: "Elle disparaît dans une bourrasque de givre. Sur le sol, là où elle se tenait, un ruban rouge. Celui que Nova porte en ce moment même dans les cheveux." }]); },
  async choeur_purge() { await story([FACE('Nova', "Elle pleurait. En perdant. Elle pleurait sa fille. Comment on fait pour haïr quelqu'un comme ça ?"), FACE('Nova', "... On ne fait pas. On l'empêche, c'est tout.")]); },
  async hiver2() { await story([FACE("Reine d'Hiver", "Tu m'as brisée. Il y a sept ans, c'était déjà toi. En mourant pour moi."), FACE("Reine d'Hiver", "Viens à la Nécropole. Viens me regarder faire. Je veux que la dernière chose que je voie de ce monde, ce soit toi.")]); },
  async mere() {
    G.flags.mereDone = 1;
    await story([
      FACE("Reine d'Hiver", "Elle ne te reconstruira pas. Elle allait nous archiver tous les deux. Comme Sauge. Comme tout le monde. Une bibliothèque de morts."),
      FACE("Reine d'Hiver", "Sauge a parlé d'autorité biologique. D'un lien. Le mien est trop abîmé. Le sien est intact. Petite... prends sa main. Pose-la sur le Cœur. Je tiendrai la Faille ouverte."),
      { pic: 'necro', t: "Vous posez vos mains ensemble sur le Cœur. Il est tiède. Il bat. Et pour la première fois depuis des millions d'années, quelqu'un lui parle avec autre chose que de la peur." },
      FACE("Reine d'Hiver", "Dans une autre branche, aime-la mieux que je n'ai su t'aimer. ... Non. Aime-la exactement pareil."),
      { pic: 'wormhole', t: "La Reine d'Hiver se dissout dans la lumière du Cœur, souriante. La directive se réécrit : ENSEMENCER. SANS. MOISSONNER. Le Cœur se replie sur lui-même et vous projette en avant, très loin dans le temps, là où il va semer de nouveau." },
    ]);
    await fade(true, 800); await enterMap('n0', 13, 12, 'down'); await fade(false, 800);
  },
  async moissonneur1() { await story([FACE('Nova', "Il y en a d'autres. Des machines qui continuent à moissonner parce que personne ne leur a dit d'arrêter. Comme des soldats après la guerre.")]); },
  async elio_verite() {
    await story([
      FACE('Elio', "Le Semeur se réveille sous Cité-Semence. La directive réécrite l'a tiré de son archive. Il voudra la corriger. Moi, je n'ai plus la force de l'en empêcher."),
      FACE('Elio', "Tu as le droit de me haïr. Je t'ai écrit·e. Mais à partir de maintenant, je n'ai plus de brouillon. Tout ce qui vient, c'est toi qui l'écris."),
      FACE('Nova', "On ne te hait pas. On a juste plus besoin de toi. C'est pire, non ?"),
      FACE('Elio', "C'est mieux. Infiniment mieux."),
    ]);
  },
  async hiver_echo() {
    await story([
      FACE("L'Hiver (écho)", "Elle t'aime bien, la petite. Ça se voit. Elle a ce que je n'avais plus : le droit d'espérer."),
      FACE('Nova', "Tu vas faire quoi, maintenant ?"),
      FACE("L'Hiver (écho)", "Vivre. Apprendre. Peut-être aimer quelqu'un d'autre, un jour. Ça te dérange ?"),
      FACE('Nova', "Non. Ça me soulage. Pour nous deux."),
    ]);
  },
  async semeur() {
    G.flags.newWorld = 1;
    await story([
      FACE('Le Semeur', "Soyez les gardiens, alors. Pas les maîtres. Nous avions oublié la différence."),
      { pic: 'newworld', t: "Le Cœur se calme. Zénithar se pose sur la Citadelle et replie ses ailes, comme un oiseau qui rentre enfin au nid. Germalis fleurit sur les toits de Cité-Semence." },
      { pic: 'embrace', t: "Ce soir-là, sur la plage d'Aube-Première, Nova défait ses rubans un à un et te tire vers l'eau tiède. Elle rit. Tu ris. Le ressac couvre le reste, et le Nouveau Monde a la politesse de regarder ailleurs." },
      FACE('Nova', "Tu sais ce que je veux, maintenant ? Rien. Absolument rien de grandiose. Une maison, un jardin, des roses bleues. Et toi, tous les matins. C'est trop demander ?"),
      { pic: 'newworld', t: "FIN DE L'ACTE VI. Mais le temps est ouvert, désormais : passé, futur, mondes parallèles. Et quelque part, au-delà de toutes les branches, l'Écho Oméga attend le niveau 999." },
    ]);
    addItem('bonbonmax', 10); sfx('badge'); await say("Tu reçois 10 Bonbons Stellaires. Le Chronoportail peut maintenant t'emmener partout.");
  },
  async elio_jeune() { await story([{ pic: 'unae', t: "Le garçon atteint le sommet. Il lève les bras. Le ciel s'ouvre, et un oiseau d'or immense descend, si lumineux qu'il efface les deux armées." }, FACE('Nova', "On vient de voir le début. Le vrai. Et il avait douze ans.")]); },
  async omega() { G.flags.omega = 1; await say("Tu as atteint le bout de toutes les branches du temps. Il n'y a rien au-delà. Il n'y a que vous."); },
});

/* ---------- Placement dans les nouveaux mondes ---------- */
function exitCells(id) {
  const L = LINKS[id]; if (!L || !L.exit) return null; const s = L.exit.side, W = 28, H = 22;
  return s === 'n' ? [[13, 1], [14, 1]] : s === 's' ? [[13, H - 2], [14, H - 2]] : s === 'w' ? [[1, 10], [1, 11]] : [[W - 2, 10], [W - 2, 11]];
}
const TOWN_BOSS = { f0: ['cendre_ilan', PALS.ilan31], f3: ['hiver1', PALS.hiver], f6: ['hiver2', PALS.hiver], n5: ['elio_verite', PALS.elio], n6: ['hiver_echo', PALS.hiver] };
const _townExtrasMonde = townExtras;
townExtras = function (id, map, spots, R) {
  _townExtrasMonde(id, map, spots, R);
  const rk = REGION_OF[id];
  if (rk === 'cendre') map.music = id === 'f7' ? 'somnis' : 'cave';
  if (rk === 'neo') map.music = 'town2';
  if (rk === 'unae') map.music = 'sacred';
  const b = TOWN_BOSS[id];
  if (b) {
    const cells = exitCells(id);
    const [x, y] = cells ? (cells[0][1] === 1 ? [13, 4] : cells[0][0] === 1 ? [4, 10] : cells[0][0] > 20 ? [23, 10] : [13, 18]) : [13, 4];
    map.npcs.push(storyTrainer(b[0], x, y, 'down', b[1], 3));
    if (cells) map.guards.push({ cells, cond: () => !!G.flags['st_' + b[0]], text: "Quelqu'un te barre la route. Il faudra l'affronter." });
  }
  if (id === 'f7') { map.npcs.push(storyTrainer('mere', 13, 4, 'down', PALS.mere, 0)); const t = map.npcs[map.npcs.length - 1]; t.cond = () => G.badges[23]; map.npcs.push({ kind: 'npc', x: 13, y: 4, dir: 'down', pal: PALS.hiver, speaker: "Reine d'Hiver", cond: () => !G.badges[23], text: "(Elle ne te regarde pas.) Bats le Fossoyeur d'abord. Je veux que tu arrives jusqu'à moi avec tous les honneurs." }); }
  if (id === 'n7') { const t = storyTrainer('semeur', 13, 4, 'down', PALS.semeur, 0); t.cond = () => G.badges[31] && G.flags.st_hiver_echo; map.npcs.push(t); map.npcs.push({ kind: 'npc', x: 13, y: 4, dir: 'down', pal: PALS.semeur, speaker: 'Le Cœur', cond: () => !(G.badges[31] && G.flags.st_hiver_echo), text: "Le Cœur bat sous les pavés. Il n'est pas encore temps. (Il faut les 8 badges du Nouveau Monde.)" }); }
  if (id === 'a1') map.npcs.push(storyTrainer('elio_jeune', 13, 4, 'down', PALS.elio, 0));
  if (id === 'n0') {
    map.npcs.push({ kind: 'npc', x: 16, y: 13, dir: 'down', pal: PALS.semeur, script: 'infini', speaker: "Tour de l'Infini", cond: () => !!G.flags.newWorld });
    const o = storyTrainer('omega', 10, 13, 'down', PALS.semeur, 0); o.cond = () => (G.flags.infFloor || 0) >= 20; map.npcs.push(o);
  }
};

/* ---------- Faille du Temps et Chronoportail ---------- */
const _getMapMonde = getMap;
getMap = function (id) {
  const fresh = !MAPS[id];
  const m = _getMapMonde(id);
  if (fresh && m && /^[go]\d$/.test(id)) m.npcs.forEach(n => { if (n.story) n.pal = n.story.startsWith('moiss') ? PALS.mere : PALS.choeur; });
  if (fresh && m && id === 'u9') m.npcs.push({ kind: 'npc', x: 12, y: 6, dir: 'down', pal: PALS.semeur, script: 'chrono', speaker: 'Faille du Temps', cond: () => !!G.flags.ending });
  return m;
};
const TRAVEL = [
  ['Présent · Bourg-Aurore', 't0', () => true],
  ['Présent · Port-Sève', 'u0', () => !!G.flags.arrivedB],
  ['Présent · Braise-Port', 'u8', () => !!G.flags.arrivedB],
  ['Passé · Unaë, -1000 ans', 'a0', () => !!G.flags.act5],
  ['Passé · Nuit de la Vague', 'x0', () => !!G.flags.rifts],
  ['Passé · Il y a cinq ans', 'p0', () => !!G.flags.ev_horloge],
  ['Futur · An 31', 'f0', () => !!G.flags.act4],
  ['Futur · Nouveau Monde', 'n0', () => !!G.flags.mereDone],
  ['Parallèle · L\'Envers', 'v0', () => !!G.flags.rifts],
  ['Parallèle · Rêve d\'Oniris', 'd0', () => !!G.flags.ev_reve0],
];
async function voyager() {
  const list = TRAVEL.filter(t => t[2]());
  const r = await menu(list.map(t => t[0]).concat(['Annuler']), { x: 30, y: 6, w: 180, rows: 8, title: 'Chronoportail' });
  if (r < 0 || r >= list.length) return;
  const [, dest] = list[r];
  await fade(true, 500);
  await story([{ pic: 'wormhole', t: "Le Chronoportail s'ouvre. Le temps se plie comme une page, et tu passes de l'autre côté." }]);
  await enterMap(dest, 13, 12, 'down'); await fade(false, 600);
}
Object.assign(SCRIPTS, {
  async chrono() {
    if (!G.flags.act4) {
      await story([
        { pic: 'summit', t: "Trois nuits après ta victoire, le ciel du Mont Éveil se fend d'une cicatrice violette. Ce n'est pas une Faille comme les autres." },
        FACE('Elio', "Elle ne mène pas à côté. Elle mène devant. Trente et un ans après la Graine. Quelque chose y appelle ton nom, avec une voix que tu connais."),
        { pic: 'wormhole', t: "La Faille a la forme d'une gorge de trou de ver : deux entonnoirs de lumière reliés par un col. Elio dit qu'elle tient ouverte grâce à une matière qui pèse moins que rien." },
        FACE('Nova', "Une voix que tu connais ? ... Je viens. Ne discute pas."),
        FACE('Elio', "Prends ces deux cristaux du Cœur. L'un ouvre les époques. L'autre fera grandir tes créatures plus vite que le temps ne passe. Tu en auras besoin : là-bas, le niveau ne connaît plus de plafond."),
      ]);
      G.flags.act4 = 1; G.keys.chrono = 1; G.keys.ampli = 1; addItem('bonbonmax', 3); sfx('badge');
      await say("Tu reçois le Chronoportail et l'Amplificateur de sève ! Les créatures peuvent désormais atteindre le niveau 999.");
      await fade(true, 600); await enterMap('f0', 13, 12, 'down'); await fade(false, 700);
      return;
    }
    await voyager();
  },
  async infini() {
    const fl = (G.flags.infFloor || 0) + 1, lvl = Math.min(LVL_CAP, 100 + fl * 45);
    const r = await ask(`Tour de l'Infini · étage ${fl} (niveau ${lvl}). Entrer ?`, ['Oui', 'Non'], { w: 50 });
    if (r !== 0) return;
    const types = Object.keys(TN), R = rng(hashStr('inf' + fl));
    const tr = { cls: 'entite', name: `Gardien de l'étage ${fl}`, team: vetTeam(pick(R, types), lvl, Math.min(6, 3 + Math.floor(fl / 4)), 'inf' + fl), intro: "Chaque étage est une époque. Celle-ci t'attendait.", lose: "Monte. L'étage suivant est plus loin dans le temps.", flag: 'inf_' + fl, sight: 0, money: 2000 * fl, music: 'boss' };
    const res = await trainerBattle({ trainer: tr, pal: PALS.semeur });
    if (res !== 'win') return;
    G.flags.infFloor = fl; addItem('bonbonmax', 1 + Math.floor(fl / 5));
    await say(`Étage ${fl} franchi. Tu reçois ${1 + Math.floor(fl / 5)} Bonbon(s) Stellaire(s).`);
    if (fl === 20) await say("Au sommet de la Tour, toutes les Failles s'ouvrent. Quelque chose t'attend sur la plage d'Aube-Première.");
  },
});
HINTS.cendre = ["Ne regarde pas les statues trop longtemps. Elles te regardent aussi.", "Le Chœur chante avant de frapper. Si tu entends des voix, cache-toi.", "Il reste de l'eau potable à Silo-7. Pas ailleurs."];
HINTS.neo = ["Ici, les gens rêvent de vies qu'ils n'ont pas vécues. Ne les réveille pas trop brusquement.", "Les Moissonneurs devraient être éteints. Ils ne le sont pas tous.", "Zénithar se pose à la Citadelle chaque solstice."];
HINTS.unae = ["Mille ans avant la Graine. Ne dis à personne d'où tu viens.", "La Terre et l'Océan se battent depuis trois générations."];

/* ---------- Nova au bout du Lien, dans les nouveaux mondes ---------- */
NOVA_CALL.unshift(
  [() => G.flags.newWorld, ["On a une maison, maintenant. Avec un jardin. Les roses bleues poussent mal. Je persiste.", "L'Hiver m'a écrit. Elle apprend la poterie. Elle est nulle. Ça me rassure énormément.", "Tu t'entraînes encore ? Niveau 999, sérieusement ? ... Ramène-moi un truc, quand tu reviens de l'Infini."]],
  [() => G.flags.mereDone, ["Je pense à elle tout le temps. L'autre moi. Elle m'a laissé·e te garder. Je ne gâcherai pas ça.", "Maman est vivante, ici. Elle ne sait pas qui je suis. Je vais lui laisser le temps."]],
  [() => G.flags.act4, ["Cet endroit me glace. Pas la cendre. L'idée que je pourrais devenir elle.", "Ilan a vieilli de trente ans d'un coup. Il me regarde comme une revenante. Je suis une revenante, ici.", "Reste près de moi cette nuit. Je ne dirai pas pourquoi."]],
);

/* ---------- GPS : objectifs des Actes IV à VI ---------- */
MAIN_REG.cendre = 1; MAIN_REG.neo = 1;
const _gpsGoalBase = gpsGoal;
gpsGoal = function () {
  if (G.flags.ending && !G.flags.newWorld) {
    if (!G.flags.act4) return { map: 'u9', txt: "Acte IV : une Faille du Temps s'est ouverte au sommet du Mont Éveil.", npc: 'chrono' };
    if (!G.flags.mereDone) {
      for (let i = 16; i < 24; i++) if (!G.badges[i]) { const g = GYMS[i]; return { map: g.town, txt: `Acte IV · Arène de ${TOWNS[g.town].name} : ${g.leader}, type ${TN[g.type]}.`, door: 'gym' }; }
      return { map: 'f7', txt: "Acte V : la Reine d'Hiver t'attend au Cœur de la Nécropole.", trainer: 'mere' };
    }
    for (let i = 24; i < 32; i++) if (!G.badges[i]) { const g = GYMS[i]; return { map: g.town, txt: `Acte VI · Arène de ${TOWNS[g.town].name} : ${g.leader}, type ${TN[g.type]}.`, door: 'gym' }; }
    if (!G.flags.st_hiver_echo) return { map: 'n6', txt: "Citadelle Zénith : l'Hiver t'attend.", trainer: 'hiver_echo' };
    return { map: 'n7', txt: "Cité-Semence : le Semeur s'éveille sous le Cœur.", trainer: 'semeur' };
  }
  if (G.flags.newWorld && (G.flags.infFloor || 0) < 20) return { map: 'n0', txt: `Post-game : Tour de l'Infini, étage ${(G.flags.infFloor || 0) + 1} sur 20, jusqu'au niveau 999.`, npc: 'infini' };
  if (G.flags.newWorld && !G.flags.omega) return { map: 'n0', txt: "L'Écho Oméga t'attend sur la plage d'Aube-Première. Niveau 999.", trainer: 'omega' };
  return _gpsGoalBase();
};

/* ---------- N'importe quelle année ---------- */
// An 0 = nuit de la Germination. Présent = An 10. Moisson = An 24.
function yearPanel() {
  return new Promise(res => {
    const p = el('panel namep yearp', 0, 0, 240, 160);
    p.innerHTML = `<div class="ptitle">Chronoportail</div>
      <label for="yr">Quelle année ? (An 0 = nuit de la Graine, aujourd'hui = An 10)</label>
      <input id="yr" type="number" inputmode="numeric" value="10" step="1">
      <div class="yhint">Exemples : -1000 (Unaë), 0 (la vague), 5 (ton départ), 24 (la Moisson), 31 (la Reine d'Hiver), 10000 (Nouveau Monde)</div>
      <button type="button" id="go">Voyager</button>`;
    const done = v => { uiPop(h); p.remove(); res(v); };
    const go = () => { const v = parseInt(p.querySelector('#yr').value, 10); done(Number.isFinite(v) ? v : null); };
    p.querySelector('#go').addEventListener('click', go);
    p.querySelector('#yr').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); go(); } if (e.key === 'Escape') done(null); });
    const h = { press(b) { if (b === 'b') done(null); else if (b === 'a' && document.activeElement && document.activeElement.tagName !== 'INPUT') go(); } };
    uiPush(h);
    setTimeout(() => { const i = p.querySelector('#yr'); i.focus(); i.select(); }, 50);
  });
}
const fmtYear = y => (y < 0 ? `An ${y} (${-y} ans avant la Graine)` : `An ${y}`);
function eraFor(y) {
  const A = (dest, pic, filter, text) => ({ y, dest, pic, filter, text });
  if (y < -100000) return A('a0', 'unae', 'sepia(.6) saturate(1.4) hue-rotate(-20deg)', `${fmtYear(y)}. Aucun humain n'a encore marché ici. Les créatures règnent seules sur un continent intact, et la sonde dort, à peine tombée du ciel.`);
  if (y < -1000) return A('a0', 'unae', 'sepia(.5) saturate(1.3) hue-rotate(-10deg)', `${fmtYear(y)}. Unaë est encore un seul continent. Les premiers villages de la Terre et de l'Océan commercent, ${y < -3000 ? 'et personne ne parle encore de guerre.' : 'mais les premières querelles éclatent déjà.'}`);
  if (y === -1000) return A('a1', 'unae', 'sepia(.45) saturate(1.3)', `${fmtYear(y)}. Le jour où un garçon de douze ans grimpe au Mont Éveil pour appeler le ciel.`);
  if (y < -990) return A('a0', 'unae', 'sepia(.45) saturate(1.3)', `${fmtYear(y)}. La guerre de la Terre et de l'Océan fait rage. Dans ${y + 1000} ans, un enfant l'arrêtera.`);
  if (y < 0) return A('t0', 'past', `sepia(${(0.15 + 0.4 * (-y / 990)).toFixed(2)})`, `${fmtYear(y)}. Les Quatre Terres, ${y + 1000} ans après leur séparation. ${y > -40 ? "Trois chercheurs se disputent déjà autour d'une graine sortie de la mer." : "Éclosia n'existe pas : à sa place, des îles perdues dans la brume."}`);
  if (y === 0) return A('x0', 'past', 'sepia(.15) saturate(1.2)', `${fmtYear(y)}. La veille de la vague. Nacre est encore là. Tout le monde est encore vivant.`);
  if (y === 5) return A('p0', 'past', 'sepia(.25)', `${fmtYear(y)}. Bourg-Aurore, la veille de ton départ.`);
  if (y < 10) return A(y < 5 ? 'u0' : 't0', 'past', `sepia(${(0.3 - y / 40).toFixed(2)})`, `${fmtYear(y)}. ${y < 5 ? `Éclosia renaît, ${y} an${y > 1 ? 's' : ''} après la vague. Les rues de Port-Sève sentent encore la sève fraîche.` : `${10 - y} an${10 - y > 1 ? 's' : ''} avant aujourd'hui. Nova a ${y + 11} ans et bat tous les dresseurs du village.`}`);
  if (y === 10) return A('t0', 'past', '', "An 10. Aujourd'hui. Ton temps à toi.");
  if (y < 24) { if (!G.flags.act4) return null; return A('t0', 'past', 'saturate(.85) hue-rotate(-8deg)', `${fmtYear(y)}. ${y - 10} an${y - 10 > 1 ? 's' : ''} après aujourd'hui. Les Quatre Terres vivent en paix. Personne ne sait encore que la Moisson viendra en l'An 24.`); }
  if (y === 24) { if (!G.flags.act4) return null; return A('f0', 'ash', 'grayscale(.3) contrast(1.05)', "An 24. Le jour de la Moisson. Le ciel devient blanc, puis silencieux."); }
  if (y < 9000) {
    if (!G.flags.act4) return null;
    const heal = Math.max(0, 1 - (y - 24) / 6000);
    return A('f0', 'ash', `grayscale(${(0.25 + 0.55 * heal).toFixed(2)}) contrast(1.05)`, `${fmtYear(y)}. ${y < 31 ? `${y - 24} an${y - 24 > 1 ? 's' : ''} après la Moisson. Les cendres tombent encore.` : y === 31 ? "Le temps de la Reine d'Hiver." : y < 500 ? `${y - 24} ans après la Moisson. Les survivants ont reconstruit des abris, puis des villages.` : `${y - 24} ans après la Moisson. Des forêts poussent sur les statues. Plus personne ne se souvient de leurs noms, sauf la Graine.`}`);
  }
  if (!G.flags.mereDone) return null;
  const age = y - 9000;
  return A('n0', 'newworld', y > 1e6 ? 'hue-rotate(200deg) saturate(.7) brightness(.85)' : age > 50000 ? 'hue-rotate(25deg) saturate(1.1)' : '', y > 1e6 ? `${fmtYear(y)}. Le soleil a rougi. Le Nouveau Monde a vu passer des centaines de civilisations. La sonde, fidèle à sa nouvelle directive, sème encore.` : `${fmtYear(y)}. Le Nouveau Monde a ${age} an${age > 1 ? 's' : ''}. ${age < 100 ? "Les échos rêvent encore de leurs anciennes vies." : age < 10000 ? "Les villes ont grandi. Les gens racontent ton histoire comme une légende, avec quelques erreurs." : "Ton nom est devenu celui d'une constellation."}`);
}
function applyEra() { const cv = document.getElementById('cv'); if (cv) cv.style.filter = (G && G.era && G.era.filter) || ''; }
async function travelYear() {
  const y = await yearPanel();
  if (y == null) return;
  const e = eraFor(y);
  if (!e) return say(y > 10 ? "La Faille refuse d'aller plus loin. Le futur est encore voilé : il faut d'abord vivre ce qui le précède." : "La Faille refuse cette époque.");
  await fade(true, 500);
  await story([{ pic: 'wormhole', t: `Le Chronoportail calcule une trajectoire vers l'${fmtYear(y)}. Le temps se plie comme une page.` }, { pic: e.pic, t: e.text }]);
  G.era = e.y === 10 ? null : { y: e.y, filter: e.filter, reg: REGION_OF[e.dest] };
  await enterMap(e.dest, 13, 12, 'down'); applyEra(); await fade(false, 600);
}
const _voyagerBase = voyager;
voyager = async function () {
  const r = await menu(['Choisir une année...', 'Destinations connues', 'Annuler'], { x: 50, y: 40, w: 140, title: 'Chronoportail' });
  if (r === 0) return travelYear();
  if (r === 1) { if (G.era) { G.era = null; applyEra(); } return _voyagerBase(); }
};
const _enterMapEra = enterMap;
enterMap = async function (id, ...rest) {
  if (G && G.era && REGION_OF[String(id).split('~')[0]] !== G.era.reg) { G.era = null; }
  const r = await _enterMapEra(id, ...rest); applyEra(); return r;
};
