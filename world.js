'use strict';
/* ============================================================
   AWAKENING — le monde : régions, villes, routes, lore, dresseurs
   ============================================================ */
const OPP = { n: 's', s: 'n', e: 'w', w: 'e' };
const DXY = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const SIDE_DIR = { n: 'up', s: 'down', e: 'right', w: 'left' };

const REGIONS = {
  solvene: {
    name: 'Quatre Terres', pal: 'solvene',
    chain: ['t0', 'r1', 't1', 'r2', 't2', 'r3', 't3', 'r4', 't4', 'r5', 't5', 'r6', 't6', 'r7', 't7', 'r8', 't8', 'r9', 't9'],
    dirs: ['n', 'n', 'e', 'n', 'e', 'n', 'e', 'n', 'n'],
    gymBase: 0,
  },
  brumaire: {
    name: 'Éclosia', pal: 'brumaire',
    chain: ['u0', 's1', 'u1', 's2', 'u2', 's3', 'u3', 's4', 'u4', 's5', 'u5', 's6', 'u6', 's7', 'u7', 's8', 'u8', 's9', 'u9'],
    dirs: ['e', 'n', 'e', 'e', 'n', 'e', 'n', 'e', 'n'],
    gymBase: 8,
  },
  envers: {
    name: 'Éclosia-Envers', pal: 'envers',
    chain: ['v0', 'w1', 'v1', 'w2', 'v2', 'w3', 'v3'],
    dirs: ['e', 'n', 'e'],
    gymBase: 16,
  },
  avant: {
    name: 'Les Six Îles · dix ans plus tôt', pal: 'avant',
    chain: ['x0', 'y1', 'x1', 'y2', 'x2', 'y3', 'x3'],
    dirs: ['n', 'e', 'n'],
    gymBase: 16,
  },
};
const LINKS = {};      // id -> {entr:{side,to}, exit:{side,to}}
const REGION_OF = {};
for (const rk in REGIONS) {
  const R = REGIONS[rk];
  R.chain.forEach(id => { REGION_OF[id] = rk; LINKS[id] = LINKS[id] || {}; });
  for (let k = 0; k < R.dirs.length; k++) {
    const A = R.chain[2 * k], RT = R.chain[2 * k + 1], B = R.chain[2 * k + 2], d = R.dirs[k];
    LINKS[A].exit = { side: d, to: RT };
    LINKS[RT].entr = { side: OPP[d], to: A };
    LINKS[RT].exit = { side: d, to: B };
    LINKS[RT].dir = d;
    LINKS[B].entr = { side: OPP[d], to: RT };
  }
}

// ---------- Lore ----------
const LORE = {
  intro: [
    "Ah, te voilà enfin de retour à Bourg-Aurore. Cinq ans, déjà...",
    "Je suis toujours le même vieux Prof. Sauge. Les créatures, le Zénith, la Graine : j'y consacre ma vie.",
    "Les anciens parlaient d'une Triade. Zénithar, qui tient le ciel. Germalis, qui fait pousser la vie. Aquorée, qui garde la mémoire de la mer.",
    "Il y a mille ans, Zénithar a déchiré notre continent en quatre pour arrêter une guerre. Les déchirures, les Coutures, sont tenues fermées par dix Sceaux.",
    "Il y a dix ans, la Graine-Monde a germé à l'est et soudé six îles : Éclosia. Depuis, les Sceaux faiblissent.",
    "L'Ordre Éclipse veut briser les Sceaux pour réveiller Zénithar. L'Ordre Racine convoite les Pétales de la Graine. Et quelqu'un, derrière eux, tire les fils.",
    "Il me faut quelqu'un sur le terrain. Quelqu'un en qui j'ai confiance.",
  ],
  introEnd: [
    "Ton aventure recommence ici, à Bourg-Aurore.",
    "Les Quatre Terres, leurs dix Sceaux, puis Éclosia au-delà de la mer.",
    "Ouvre ta Chronique dans le menu Écrits : elle te dira toujours où va l'histoire. Passe me voir au labo !",
  ],
};

// ---------- Arènes ----------
const GYMS = [
  { town: 't1', type: 'flore', leader: 'Sylve', badge: 'Badge Feuille', team: [['mousseron', 10], ['larvelin', 10], ['tortumousse', 12]], field: 'Tes créatures de type Flore peuvent maintenant couper les arbustes hors combat.', intro: "Je suis Sylve. Ici, la nature est reine. Mes créatures ne plieront pas !", lose: "Tu as la force d'un vieux chêne. Ce badge est à toi." },
  { town: 't2', type: 'roc', leader: 'Opaline', badge: 'Badge Galet', team: [['galet', 14], ['taupiron', 14], ['rochelourd', 16]], intro: "Les pierres de Mousselande ont mille ans. Ma patience aussi.", lose: "Tu as fendu la roche. Admirable." },
  { town: 't3', type: 'eau', leader: 'Marin', badge: 'Badge Vague', team: [['mareluche', 18], ['pincelot', 19], ['ranaqua', 21]], field: 'Tes créatures de type Eau peuvent maintenant te porter sur l\'eau.', intro: "Ahoy ! Ici, les vagues sont imprévisibles. Tiens bon la barre !", lose: "Quelle tempête ! Tu as le pied marin." },
  { town: 't4', type: 'foudre', leader: 'Volta', badge: 'Badge Volt', team: [['etincelot', 22], ['ovinvolt', 23], ['laineclair', 22], ['voltigre', 25]], field: 'Tes créatures de type Vent peuvent maintenant t\'emmener dans les villes déjà visitées. Ouvre la Carte !', intro: "Ici, tout fonctionne à l'électricité. Même mon cœur ! Prêt·e pour la décharge ?", lose: "Court-circuit total ! Bravo." },
  { town: 't5', type: 'feu', leader: 'Ignis', badge: 'Badge Braise', team: [['cendrelle', 26], ['taurignis', 27], ['fournex', 27], ['lavarelle', 29]], intro: "Merci d'avoir chassé l'Ordre Éclipse de mon volcan. Maintenant, voyons si ta flamme brûle aussi fort que la mienne !", lose: "Mes flammes s'éteignent... Tu as gagné." },
  { town: 't6', type: 'esprit', leader: 'Mirage', badge: 'Badge Mirage', team: [['songeot', 30], ['chouettine', 30], ['aurelys', 32], ['revemage', 34]], intro: "Tu vois ce que tu veux voir. Moi, je vois ta défaite.", lose: "Hm... Tu n'étais pas une illusion." },
  { town: 't7', type: 'givre', leader: 'Bruma', badge: 'Badge Givre', team: [['flocinel', 34], ['gelapin', 35], ['banquiseau', 35], ['glaciarde', 38]], intro: "Le froid de Givrecime endurcit les cœurs. Le tien est-il prêt ?", lose: "Tu as fait fondre ma glace. Respect." },
  { town: 't8', type: 'dragon', leader: 'Aldric', badge: 'Badge Écaille', team: [['draconelle', 39], ['wyvernel', 40], ['sablarque', 41], ['draconelle', 43]], intro: "Les dragons ne servent que les dresseurs dignes d'eux. Prouve que tu l'es !", lose: "Les dragons t'ont reconnu·e. Va. La Tour du Zénith t'attend." },
  { town: 'u1', type: 'acier', leader: 'Gaspard', badge: 'Badge Rouage', team: [['cliquetan', 51], ['horlogon', 52], ['scarabronze', 52], ['taupiron', 51], ['engrenor', 54]], intro: "Un·e champion·ne des Quatre Terres, hein ? Le métal d'Éclosia ne plie pas aussi facilement.", lose: "Mes rouages ont sauté. Joli travail." },
  { town: 'u2', type: 'givre', leader: 'Gardienne Sigrid', badge: 'Pétale Blanc', petal: '#dff6ff', team: [['flocinel', 53], ['banquiseau', 54], ['frimousse', 55], ['givrelame', 55], ['empereglace', 57]], intro: "Le froid révèle la vérité des dresseurs. Les faibles gèlent sur place. Et toi ?", lose: "... Tu n'as pas tremblé une seule fois. Prends le Pétale Blanc." },
  { town: 'u3', type: 'vent', leader: 'Gardienne Céleste', badge: 'Pétale Azur', petal: '#7fb8ff', team: [['ventrelle', 55], ['rubanelle', 56], ['zapillon', 56], ['phenixel', 57], ['cieloraptor', 59]], intro: "À Valmont, on se bat avec élégance, très cher. Ne me déçois pas, j'ai mis mes plus beaux rubans.", lose: "Magnifique ! Quel style ! Le Pétale Azur est à toi." },
  { town: 'u4', type: 'combat', leader: 'Brune', badge: 'Badge Poing', team: [['ranaqua', 57], ['lievrigel', 58], ['lupaladin', 59], ['pantharcane', 59], ['pugilarque', 61]], intro: "Pas de discours. Juste le combat.", lose: "... Bien joué. Vraiment." },
  { town: 'u5', type: 'ombre', leader: 'Gardien Aoki', badge: "Pétale d'Ambre", petal: '#f2a03a', team: [['spectrombre', 59], ['encrelot', 60], ['lanterneau', 60], ['brumelin', 61], ['pantharcane', 63]], intro: "Merci d'avoir chassé l'Ordre Racine de mon sanctuaire. Toute lumière projette une ombre. Voyons laquelle gouverne ton cœur.", lose: "L'équilibre est en toi. Le Pétale d'Ambre te revient." },
  { town: 'u6', type: 'flore', leader: 'Gardienne Maëlle', badge: 'Pétale Vert', petal: '#5cb85c', team: [['petalimace', 61], ['champignard', 62], ['mandracine', 62], ['voltacoco', 63], ['cervaube', 65]], intro: "Les plantes poussent lentement, mais rien ne les arrête. Montre-moi la force de ton lien !", lose: "Ton cœur est solide comme un vieux chêne. Le Pétale Vert est à toi." },
  { town: 'u7', type: 'eau', leader: 'Gardien Noa', badge: 'Pétale Doré', petal: '#ffd23a', team: [['coraline', 63], ['surfouine', 64], ['baleinon', 64], ['ranaqua', 64], ['medusoraire', 66]], intro: "Les vagues ne combattent pas la mer : elles sont la mer. Allez, surfe avec moi !", lose: "Tu as trouvé ton courant. Voici le Pétale Doré." },
  { town: 'u8', type: 'feu', leader: 'Gardien Tavi', badge: 'Pétale Rouge', petal: '#ff6a3a', team: [['magmoule', 65], ['brasaile', 66], ['lavarelle', 66], ['magmorne', 67], ['volcanthe', 67], ['ignivern', 69]], intro: "Bienvenue sur mon volcan ! Ici, la lave coule comme une rivière. Si ta flamme vacille, repars tout de suite !", lose: "Ha ! Tu brûles plus fort que mon volcan ! Le Pétale Rouge est à toi." },
];

// ---------- Villes ----------
const TOWNS = {
  t0: { name: 'Bourg-Aurore', layout: { NW: 'home', NE: 'lab', SW: 'house', SE: 'pond' }, desc: "Bourg-Aurore : chez toi.",
    lines: ["Le Prof. Sauge étudie le lien entre le Zénith et la Graine-Monde.", "La nuit de la Germination, la mer est montée jusqu'au moulin. On ne l'a pas oublié.", "Les hautes herbes sont dangereuses sans créature. Va voir le Prof. Sauge !"],
    house: { text: "Ma grand-mère disait qu'avant, les Quatre Terres ne formaient qu'un seul pays. Tiens, prends ça.", gift: ['baume', 2] } },
  t1: { name: 'Clairsemis', gym: 0, desc: "Clairsemis : un village sous les feuillages.",
    lines: ["Sylve, la championne d'arène, parle aux arbres. Et parfois, ils répondent.", "Les Larvelin évoluent très vite. Garde un œil sur eux !", "Les arbustes bloquent certains chemins. Avec le badge de Sylve, une créature Flore pourra les couper."],
    house: { text: "Tu pars pour un long voyage ? Tiens, ça te servira.", gift: ['baume', 3] } },
  t2: { name: 'Mousselande', gym: 1, desc: "Mousselande : la cité taillée dans la roche.",
    lines: ["Les mineurs ont trouvé des fresques : un grand oiseau doré qui tient quatre terres dans ses serres.", "Opaline a fondé son arène dans une ancienne carrière.", "Les types Roc craignent l'Eau et la Flore."],
    house: { text: "Les Super Sphères capturent mieux. Prends-en quelques-unes.", gift: ['supersphere', 3] } },
  t3: { name: 'Port-Corail', gym: 2, layout: { NW: 'center', NE: 'shop', SW: 'gym', SE: 'dock' }, desc: "Port-Corail : la porte vers le large.",
    lines: ["Le ferry pour Éclosia n'accepte que les champions de la Ligue.", "Des gens habillés de violet rôdent sur le port. L'Ordre Éclipse, à ce qu'on dit...", "Avec le badge de Marin, une créature Eau pourra te porter sur l'eau."],
    house: { text: "Je ne peux plus m'occuper de cette créature. Elle sera mieux avec toi.", giftMon: ['tortumousse', 15] } },
  t4: { name: 'Voltaville', gym: 3, desc: "Voltaville : la ville qui ne s'éteint jamais.",
    lines: ["La centrale de Voltaville éclaire toutes les Quatre Terres.", "Avec le Badge Volt, une créature de type Vent peut te ramener dans les villes déjà visitées.", "L'Ordre Éclipse veut réveiller Zénithar. Pour régner, paraît-il."],
    house: { text: "Un Rappel peut sauver un combat. En voilà deux.", gift: ['rappel', 2] } },
  t5: { name: 'Cendrecap', gym: 4, desc: "Cendrecap : au pied du volcan.",
    lines: ["L'Ordre Éclipse bloque l'entrée de l'arène ! Quelqu'un doit les chasser.", "Le volcan gronde plus fort depuis que l'Éclipse fouille les cratères.", "Leur chef s'appelle Nox. Il dit que le monde a besoin d'un maître. Moi, j'aime ma liberté."],
    house: { text: "Cette petite lumière me suit partout depuis des jours. Je crois qu'elle t'a choisi.", giftMon: ['lucibulle', 22] } },
  t6: { name: 'Mirage-Sud', gym: 5, desc: "Mirage-Sud : la cité des songes.",
    lines: ["Ici, on écrit ses rêves dans de grands registres. Les plus anciens parlent d'Éveillon.", "Mirage lit l'avenir dans le reflet de l'eau.", "Certaines créatures n'apparaissent que la nuit. Reviens après le coucher du soleil !"],
    house: { text: "J'ai trouvé ces bonbons dans un rêve. Enfin, je crois.", gift: ['bonbon', 2] } },
  t7: { name: 'Givrecime', gym: 6, pal: 'neige', desc: "Givrecime : où l'hiver ne finit jamais.",
    lines: ["Le long de la Route 8 se trouve le Sanctuaire du Zénith. Personne n'ose y entrer.", "Bruma s'entraîne chaque nuit sur le lac gelé.", "Des gens de l'Éclipse sont passés hier. Ils cherchaient le chemin du sanctuaire."],
    house: { text: "Il fait froid dehors. Prends ces Hyper Baumes.", gift: ['hyperbaume', 3] } },
  t8: { name: 'Pic-Venteux', gym: 7, desc: "Pic-Venteux : le village des dragons.",
    lines: ["Aldric descend d'une lignée de dresseurs de dragons.", "Au-delà de la Grotte de l'Aube se dresse la Tour du Zénith, siège de la Ligue.", "Les dragons craignent la Glace, la Lumière et les autres dragons."],
    house: { text: "Ce Dracolin est né ici. Il a besoin d'un dresseur qui ira loin.", giftMon: ['dracolin', 30] } },
  t9: { name: 'Tour du Zénith', layout: { NW: 'center', NE: 'shop', SW: 'house', SE: 'league' }, desc: "Tour du Zénith : siège de la Ligue des Quatre Terres.",
    lines: ["Seuls ceux qui ont réuni les seize badges peuvent défier la Ligue.", "Il n'y a aucune pause entre les combats de la Ligue. Prépare bien ton sac.", "La Championne Astra n'a pas perdu depuis six ans."],
    house: { text: "Pour la Ligue, il faut être prêt. Tiens.", gift: ['rappel', 3] } },
  u0: { name: 'Port-Sève', layout: { NW: 'center', NE: 'shop', SW: 'house', SE: 'dock' }, desc: "Port-Sève : l'entrée d'Éclosia.",
    lines: ["Bienvenue à Éclosia ! Il y a dix ans, ici, il n'y avait que la mer.", "La nuit de la Germination, la mer s'est soulevée et six terres se sont soudées. Moi, j'ai perdu ma maison. Comme beaucoup.", "Six Gardiens, six Pétales. Et au milieu de tout ça, l'Ordre Racine."],
    house: { text: "Un·e champion·ne des Quatre Terres ! Les créatures d'ici sont coriaces. Prends ça.", gift: ['hypersphere', 5] } },
  u1: { name: 'Ferrance', gym: 8, desc: "Ferrance : la ville des forges.",
    lines: ["Gaspard forge lui-même les rouages de ses créatures. Enfin, c'est ce qu'il dit.", "Les types Acier craignent le Feu, le Combat et le Roc."],
    house: { text: "Un Éther rend des PP à toutes les capacités. Très utile en ligue.", gift: ['ether', 2] } },
  u2: { name: 'Frimabri', pal: 'neige', gym: 9, desc: "Frimabri : au cœur de la Toundra Givrée.",
    lines: ["Avant la Germination, cette toundra était une île perdue dans les glaces.", "La Gardienne Sigrid ne parle presque jamais. Son Pétale non plus.", "Des gens en tenue lie-de-vin creusent la banquise. L'Ordre Racine..."],
    house: { text: "Ce coffre bougeait tout seul dans ma cave. Je te le laisse !", giftMon: ['mimicoffre', 45] } },
  u3: { name: 'Valmont', gym: 10, pal: 'automne', desc: "Valmont : la cité la plus élégante d'Éclosia.",
    lines: ["À Valmont, même les créatures ont du style.", "La Gardienne Céleste se bat en rubans. Ne la sous-estime pas.", "Les canaux de Valmont sont beaux la nuit. On y fait des feux, au bord de l'eau."],
    house: { text: "Les Bonbons Éveil viennent d'ici, tu le savais ?", gift: ['bonbon', 2] } },
  u4: { name: 'Combrecœur', gym: 11, pal: 'automne', desc: "Combrecœur : la cité des combattants.",
    lines: ["Brune ne parle presque jamais. Elle se bat.", "Le Combat craint le Vent, l'Esprit et la Lumière."],
    house: { text: "Les combats sont durs ici. Prends ces Maxi Baumes.", gift: ['maxibaume', 2] } },
  u5: { name: 'Érablaie', pal: 'automne', gym: 12, desc: "Érablaie : le Sanctuaire des Érables.",
    lines: ["L'Ordre Racine a pris le sanctuaire ! Le Gardien Aoki est retenu à l'intérieur.", "Les érables ont rougi la nuit de la Germination. Ils ne sont jamais redevenus verts.", "Leur commandant s'appelle Épine. Il a des cheveux bleus, comme quelqu'un que je connais..."],
    house: { text: "Ces sphères capturent mieux la nuit. Ici, il fait toujours un peu nuit.", gift: ['spherenuit', 5] } },
  u6: { name: 'Graineval', gym: 13, pal: 'automne', desc: "Graineval : la ville aux lanternes de sève.",
    lines: ["Chaque lanterne porte un vœu. Les plus anciennes ont été allumées pour les disparus de la Germination.", "Le Cœur de la Graine est le long de la Route 7. Il ne s'ouvre qu'aux six Pétales."],
    house: { text: "Ce cerf lumineux vient chaque soir à ma fenêtre. Il veut partir avec toi.", giftMon: ['cervaube', 55] } },
  u7: { name: 'Solmarina', gym: 14, desc: "Solmarina : la perle des Îles Soleil.",
    lines: ["Ici, on surfe avec les Surfouines du matin au soir.", "Le Gardien Noa dit que les vagues ne combattent pas la mer. Je n'ai jamais compris."],
    house: { text: "Des Bonbons Éveil ! Pour aller plus vite vers le sommet.", gift: ['bonbon', 3] } },
  u8: { name: 'Braise-Port', gym: 15, desc: "Braise-Port : au pied des volcans de l'Archipel.",
    lines: ["Les volcans grondent plus fort depuis que l'Ordre Racine fouille les cratères.", "Au-delà des Racines du Monde se dresse le Mont Éveil. On dit que le premier dresseur y attend."],
    house: { text: "Pour le Mont Éveil, il te faudra tout ça.", gift: ['maxibaume', 3] } },
  u9: { name: 'Mont Éveil', special: 'summit', desc: "Mont Éveil" },
  v0: { name: 'Port-Épine', layout: { NW: 'center', NE: 'shop', SW: 'house', SE: 'none' }, desc: "Port-Épine : là où la Racine accoste.",
    lines: ["Ici, personne ne t'a jamais vu·e. Normal : dans ce monde, tu n'as jamais quitté Bourg-Aurore. Tu y es mort·e de la fièvre, à douze ans.", "Le Roi Ronce gouverne depuis dix ans. Tous les Éclos portent un anneau de ronce autour du cou.", "La mer n'a plus jamais tué personne depuis que le Roi la tient. Plus personne n'ose la regarder, non plus.", "On murmure qu'une résistance se cache à Frimabri-l'Ombre. Ne le répète pas."],
    house: { text: "Prends ça, étranger·e. Ici, on en a plus besoin que toi... mais toi, tu as encore l'air d'espérer quelque chose.", gift: ['hyperbaume', 4] } },
  v1: { name: 'Graineval-sous-Ronces', layout: { NW: 'center', NE: 'shop', SW: 'house', SE: 'none' }, desc: "Graineval-sous-Ronces : les lanternes y sont interdites.",
    lines: ["Les lanternes sont interdites depuis dix ans. On pleure en silence, ici.", "La Gardienne Maëlle sert le Roi, maintenant. Elle n'a pas eu le choix : il tenait sa fille.", "Une femme aux cheveux bleus commande la garde. On l'appelle la Lame Bleue. Elle ne sourit jamais.", "Mon fils a disparu dans la Forêt Asservie. On dit que les Éclos sauvages y obéissent encore au Roi."],
    house: { text: "J'ai caché cette lanterne sous mon lit pendant dix ans. Si tu la libères, ce monde... rallume-la pour nous.", gift: ['bonbon', 3] } },
  v2: { name: "Frimabri-l'Ombre", pal: 'neige', layout: { NW: 'center', NE: 'shop', SW: 'house', SE: 'none' }, desc: "Frimabri-l'Ombre : le dernier refuge.",
    lines: ["Bienvenue dans la résistance. On n'est pas nombreux, mais on est têtus.", "Oniris nous a rejoints il y a trois ans. Dans ce monde, il n'a jamais voulu endormir personne : il voulait juste qu'on se réveille.", "Le Général Nox garde la route du Trône. Il a obtenu ce qu'il voulait, un maître pour ce monde. On dit qu'il ne dort plus.", "Si tu viens d'un monde où Ronce a perdu... raconte-nous comment c'est."],
    house: { text: "La résistance n'a pas grand-chose, mais elle partage tout.", gift: ['maxibaume', 3] } },
  v3: { name: 'Trône des Racines', layout: { NW: 'center', NE: 'none', SW: 'none', SE: 'none' }, desc: "Trône des Racines : le cœur de l'Envers.",
    lines: ["Les racines du Trône descendent jusqu'au cœur de la Graine. Elle ne germe plus : elle obéit.", "Le Roi Ronce reçoit tous ceux qui osent monter. Aucun n'est redescendu."] },
  x0: { name: 'Nacre', layout: { NW: 'center', NE: 'shop', SW: 'house', SE: 'pond' }, desc: "Nacre : une île de pêcheurs et de jardiniers.",
    lines: ["Bienvenue sur Nacre ! Les Six Îles sont loin les unes des autres, mais on s'entend bien.", "Aurèle, le botaniste, fait pousser des fleurs que personne n'a jamais vues. Sa femme Liora dit qu'il parle aux graines.", "La mer est calme depuis des semaines. Trop calme, dit le vieux Gaëtan.", "Les Éclos ? Jamais entendu ce mot. Tu viens d'où, toi ?"],
    house: { text: "Tu as l'air perdu·e. Tiens, du pain de Nacre. Et des Baumes, au cas où.", gift: ['maxibaume', 2] } },
  x1: { name: 'Île-Bleue', layout: { NW: 'center', NE: 'shop', SW: 'house', SE: 'pond' }, desc: "Île-Bleue : la maison des Maren.",
    lines: ["Les petits Maren ? Ilan et Nova. Lui veut devenir dresseur, elle veut juste le battre.", "Tobias Maren répare les bateaux de toute l'île. Maren, sa femme, chante en pêchant.", "Cette nuit, il paraît qu'il y aura une lumière sous la mer. Les anciens disent que c'est mauvais signe."],
    house: { text: "Les enfants sont sortis jouer. Tu veux du thé ? ... Tu pleures ? Ça va ?", gift: ['bonbon', 2] } },
  x2: { name: 'Atelier du Trio', layout: { NW: 'center', NE: 'shop', SW: 'house', SE: 'none' }, desc: "Atelier du Trio : trois chercheurs et une graine.",
    lines: ["Trois chercheurs travaillent ici : Sauge, Lierre et Aurèle. Ils étudient une graine trouvée au fond de la mer.", "Sauge et Lierre se disputent tout le temps. Aurèle les réconcilie avec du thé.", "Ils disent que la graine respire. Moi, je dis qu'ils manquent de sommeil."],
    house: { text: "Le jeune Sauge m'a laissé ça pour les visiteurs. Il est toujours en avance sur tout, celui-là.", gift: ['hypersphere', 5] } },
  x3: { name: 'Gouffre de la Graine', layout: { NW: 'center', NE: 'none', SW: 'none', SE: 'none' }, desc: "Gouffre de la Graine : la nuit de la Germination.",
    lines: ["La mer gronde. La lumière sous l'eau grandit à chaque minute.", "Si tu dois faire quelque chose, c'est maintenant."] },
};
for (const id in TOWNS) { TOWNS[id].reg = REGION_OF[id]; TOWNS[id].id = id; }
for (const id of ['v0', 'v1', 'v2', 'v3', 'x0', 'x1', 'x2', 'x3']) TOWNS[id].noGym = 1;
GYMS.forEach((g, i) => { TOWNS[g.town].gym = i; g.idx = i; });

// ---------- Routes ----------
// enc: [espèce, niv min, niv max, poids, 'd' (jour) | 'n' (nuit)]
const ROUTES = {
  r1: { name: 'Route 1', tr: 2, cls: ['gamin', 'fillette'], items: ['baume', 'sphere'], enc: { grass: [['rongeot', 2, 4, 35], ['piouly', 2, 4, 35], ['larvelin', 2, 3, 20], ['ombrelin', 3, 4, 15, 'n'], ['songeot', 3, 4, 8, 'n']] } },
  r2: { name: 'Route 2', tr: 4, cls: ['gamin', 'fillette', 'scout'], items: ['sphere', 'baume', 'antidote'], cut: 1, special: ['rival2'],
    enc: { grass: [['rongeot', 4, 6, 25], ['piouly', 4, 6, 25], ['larvelin', 4, 6, 15], ['mousseron', 4, 6, 15], ['laineclair', 5, 7, 12, 'd'], ['songeot', 5, 6, 12, 'n'], ['ombrelin', 5, 6, 10, 'n']] } },
  r3: { name: 'Route 3', tr: 5, cls: ['randonneur', 'scout', 'montagnard'], items: ['superbaume', 'antidote', 'sphere'],
    enc: { grass: [['galet', 7, 10, 25], ['taupiron', 7, 10, 20], ['rongeot', 8, 10, 15], ['piouly', 8, 10, 15], ['etincelot', 8, 11, 15], ['ombrelin', 8, 10, 12, 'n'], ['dunelot', 8, 10, 5]] } },
  r4: { name: 'Route 4', tr: 5, cls: ['pecheur', 'nageur', 'ornitho'], items: ['supersphere', 'reveil'], pond: 1, special: ['somnis_r4'],
    enc: { grass: [['mareluche', 11, 14, 25], ['pincelot', 11, 14, 20], ['abeillon', 11, 13, 25], ['piouly', 12, 14, 10], ['chouettine', 11, 13, 20, 'n']], water: [['mareluche', 11, 15, 50], ['meduvenin', 12, 15, 40], ['corailette', 14, 16, 5]] } },
  r5: { name: 'Route 5', tr: 6, cls: ['karateka', 'scout', 'savant'], items: ['bonbon', 'superbaume', 'reveil'], cut: 1, special: ['rival3'],
    enc: { grass: [['etincelot', 15, 18, 20], ['laineclair', 15, 17, 20], ['abeillon', 15, 18, 15], ['boxillon', 16, 18, 15], ['vipereau', 16, 19, 15], ['ombrelin', 16, 18, 15, 'n'], ['songeot', 16, 18, 12, 'n']] } },
  r6: { name: 'Route 6', tr: 6, cls: ['karateka', 'mystique', 'dresseur'], items: ['rappel', 'superbaume', 'supersphere'], pond: 1,
    enc: { grass: [['vipereau', 19, 22, 20], ['boxillon', 19, 22, 20], ['mousseron', 19, 21, 15], ['cendrelle', 20, 23, 15], ['taurignis', 21, 23, 5], ['songeot', 20, 22, 15, 'n'], ['lucibulle', 20, 22, 15, 'n']], water: [['mareluche', 19, 22, 50], ['ranaqua', 21, 23, 30], ['meduvenin', 20, 23, 20]] } },
  r7: { name: 'Route 7', tr: 7, cls: ['mystique', 'dresseur', 'dresseuse', 'veilleur'], items: ['supersphere', 'rappel', 'totalsoin'], pond: 1, cut: 1,
    enc: { grass: [['lucibulle', 23, 26, 20], ['songeot', 23, 26, 20], ['ventrelle', 24, 27, 15], ['rongemaitre', 24, 27, 15], ['flocinel', 23, 25, 10], ['ombrelin', 24, 26, 15, 'n'], ['spectrombre', 27, 28, 5, 'n'], ['chouettine', 24, 26, 10, 'n']], water: [['ranaqua', 23, 27, 50], ['meduvenin', 23, 27, 40], ['corailette', 25, 27, 10]] } },
  r8: { name: 'Route 8', pal: 'neige', tr: 7, cls: ['montagnard', 'dresseuse', 'dresseur', 'veilleur'], items: ['hyperbaume', 'bonbon', 'hypersphere'], special: ['rival4'], side: 'sanct_aube',
    enc: { grass: [['flocinel', 27, 31, 20], ['gelapin', 27, 31, 20], ['rochelourd', 28, 31, 15], ['banquiseau', 27, 30, 20], ['lievrigel', 30, 31, 5], ['brumelin', 29, 31, 8, 'n']] } },
  r9: { name: "Grotte de l'Aube", cave: 1, tr: 6, cls: ['montagnard', 'dresseur', 'dresseuse', 'savant'], items: ['rappel', 'hypersphere', 'bonbon', 'maxibaume'], special: ['rival5'],
    enc: { cave: [['rochelourd', 33, 37, 20], ['foretaupe', 34, 37, 15], ['spectrombre', 33, 36, 15], ['taupiron', 32, 35, 20], ['statuon', 34, 36, 8], ['dracolin', 31, 33, 4], ['galet', 32, 34, 15]] } },
  s1: { name: "Route 1 d'Éclosia", tr: 6, cls: ['dresseur', 'dresseuse', 'archiviste'], items: ['hyperbaume', 'hypersphere'],
    enc: { grass: [['cervolant', 41, 44, 18], ['taupiquet', 41, 44, 15], ['galetin', 42, 44, 12], ['noctelle', 41, 44, 20], ['cliquetan', 41, 44, 20], ['felinuit', 41, 44, 20], ['racinol', 41, 44, 20], ['chouettine', 42, 44, 15, 'n'], ['noctelle', 42, 45, 15, 'n']] } },
  s2: { name: "Route 2 d'Éclosia", pal: 'neige', tr: 6, cls: ['pecheur', 'nageur', 'dresseuse'], items: ['maxibaume', 'totalsoin'], pond: 1,
    enc: { grass: [['frimousse', 44, 47, 18], ['givrelame', 45, 47, 12], ['meduvenin', 44, 47, 20], ['cobracre', 44, 47, 20], ['racinol', 44, 47, 20], ['tortumousse', 44, 47, 20], ['mandracine', 46, 47, 5, 'n']], water: [['meduvenin', 44, 47, 40], ['corailette', 45, 48, 30], ['baleinon', 46, 48, 10], ['archipelone', 46, 48, 5]] } },
  s3: { name: "Route 3 d'Éclosia", pal: 'automne', tr: 7, cls: ['ornitho', 'dresseur', 'montagnard'], items: ['bonbon', 'hypersphere', 'rappel'], cut: 1,
    enc: { grass: [['rubanelle', 47, 50, 15], ['zapillon', 47, 50, 15], ['horlogon', 48, 50, 10], ['cendrelle', 47, 50, 20], ['nyctaile', 47, 50, 20], ['noctelys', 48, 50, 15], ['reinapic', 47, 50, 20], ['chouettine', 47, 49, 15, 'n'], ['phenixel', 50, 50, 3]] } },
  s4: { name: "Route 4 d'Éclosia", pal: 'automne', tr: 7, cls: ['karateka', 'dresseuse', 'dresseur'], items: ['maxibaume', 'ether'],
    enc: { grass: [['encrelot', 50, 53, 15], ['lanterneau', 50, 53, 12, 'n'], ['felinuit', 50, 53, 20], ['louvaube', 50, 53, 20], ['pugilarque', 51, 53, 15], ['taurignis', 51, 53, 15], ['dunelot', 50, 53, 15], ['gelapin', 50, 52, 10]] } },
  s5: { name: "Route 5 d'Éclosia", tr: 7, cls: ['veilleur', 'mystique', 'racine'], items: ['spherenuit', 'maxibaume', 'bonbon'], special: ['somnis_s5a', 'somnis_s5b'],
    enc: { grass: [['ronceloup', 53, 56, 15], ['champignard', 53, 56, 15], ['brumelin', 53, 56, 15], ['spectrombre', 53, 56, 20], ['felinuit', 53, 56, 20], ['mimicoffre', 54, 56, 5], ['noctelle', 53, 55, 15, 'n'], ['nyctaile', 54, 56, 15, 'n'], ['ombrelin', 53, 55, 15]] } },
  s6: { name: "Route 6 d'Éclosia", tr: 7, cls: ['pecheur', 'nageur', 'dresseuse', 'mystique'], items: ['hypersphere', 'totalsoin', 'rappel'], pond: 1,
    enc: { grass: [['petalimace', 56, 59, 15], ['voltacoco', 56, 59, 12], ['louvaube', 56, 59, 25], ['cervaube', 57, 59, 5], ['aurelys', 56, 59, 20], ['corailette', 56, 59, 20], ['lucibulle', 56, 58, 15, 'n']], water: [['baleinon', 56, 60, 30], ['corailette', 56, 59, 30], ['empereglace', 57, 59, 15], ['medusoraire', 57, 60, 25]] } },
  s7: { name: "Route 7 d'Éclosia", tr: 7, cls: ['montagnard', 'dresseur', 'archiviste'], items: ['maxibaume', 'bonbon', 'ether'], side: 'sanct_nuit', cut: 1,
    enc: { grass: [['surfouine', 59, 62, 15], ['coraline', 59, 62, 15], ['chimerion', 59, 62, 20], ['dunelot', 59, 61, 20], ['taurignis', 59, 62, 20], ['lavarelle', 59, 62, 20], ['sablarque', 61, 63, 10], ['felinuit', 59, 61, 10, 'n']] } },
  s8: { name: "Route 8 d'Éclosia", tr: 7, cls: ['dresseur', 'dresseuse', 'savant'], items: ['hypersphere', 'maxibaume', 'bonbon'],
    enc: { grass: [['magmoule', 62, 65, 15], ['brasaile', 62, 65, 15], ['arcfoudre', 62, 65, 15], ['wyvernel', 62, 65, 20], ['lavarelle', 62, 64, 20], ['scarabronze', 62, 65, 20], ['magmorne', 63, 65, 10], ['nyctaile', 62, 64, 15, 'n']] } },
  w1: { name: 'Sentier des Ronces', tr: 6, cls: ['racine', 'dresseur', 'dresseuse'], items: ['maxibaume', 'hypersphere'], enc: { grass: [['ronceloup', 72, 75, 25], ['epineant', 74, 76, 8], ['encrelot', 72, 75, 20], ['champignard', 72, 75, 20], ['spectrombre', 72, 75, 15, 'n']] } },
  w2: { name: 'Forêt Asservie', pal: 'envers', tr: 7, cls: ['racine', 'veilleur', 'mystique'], items: ['bonbon', 'maxibaume', 'ether'], cut: 1, enc: { grass: [['ronceloup', 75, 78, 20], ['brasaile', 75, 78, 15], ['magmoule', 75, 78, 15], ['felinuit', 75, 78, 20], ['pantharcane', 76, 78, 15, 'n']] } },
  w3: { name: 'Allée du Trône', tr: 7, cls: ['racine', 'dresseur', 'dresseuse', 'veilleur'], items: ['maxibaume', 'bonbon', 'hypersphere'], enc: { grass: [['epineant', 78, 81, 15], ['ronceloup', 78, 81, 20], ['nyctaile', 78, 81, 15], ['draconyx', 79, 81, 8], ['spectrombre', 78, 81, 20]] } },
  y1: { name: 'Mer des Six Îles', tr: 5, cls: ['pecheur', 'nageur', 'ornitho'], items: ['hypersphere', 'maxibaume'], pond: 1, enc: { grass: [['piouly', 74, 77, 20], ['mareluche', 74, 77, 20], ['corailette', 74, 77, 20], ['ventrelle', 75, 77, 15]], water: [['baleinon', 75, 78, 30], ['medusoraire', 75, 78, 30], ['archipelone', 76, 78, 15], ['abyssard', 76, 78, 10]] } },
  y2: { name: "Récif d'Avant", tr: 6, cls: ['nageur', 'pecheur', 'dresseuse'], items: ['bonbon', 'ether', 'maxibaume'], pond: 1, enc: { grass: [['tortumousse', 77, 80, 20], ['ranaqua', 77, 80, 20], ['laineclair', 77, 80, 15], ['cervaube', 78, 80, 8]], water: [['baleinon', 77, 80, 30], ['empereglace', 78, 80, 20], ['corailette', 77, 80, 30]] } },
  y3: { name: 'Courant Profond', tr: 7, cls: ['nageur', 'dresseur', 'dresseuse', 'savant'], items: ['maxibaume', 'bonbon', 'hypersphere'], pond: 1, enc: { grass: [['phenixel', 80, 83, 10], ['cieloraptor', 80, 83, 15], ['statuon', 80, 83, 15], ['magmorne', 80, 83, 15]], water: [['archipelone', 80, 83, 20], ['baleinon', 80, 83, 30], ['medusoraire', 80, 83, 30]] } },
  s9: { name: 'Racines du Monde', cave: 1, pal: 'abysse', tr: 7, cls: ['dresseur', 'dresseuse', 'montagnard', 'racine'], items: ['bonbon', 'maxibaume', 'ether', 'bonbon'],
    enc: { cave: [['magmorne', 65, 68, 15], ['sablarque', 65, 68, 15], ['ignivern', 66, 68, 8], ['statuon', 65, 67, 15], ['foretaupe', 65, 68, 15], ['draconelle', 65, 67, 8], ['spectrombre', 65, 68, 15], ['brumelin', 65, 67, 9]] } },
};
for (const id in ROUTES) { ROUTES[id].reg = REGION_OF[id]; ROUTES[id].id = id; }

// ---------- Dresseurs ----------
const TCLS = {
  gamin: { n: 'Gamin', m: 16 }, fillette: { n: 'Fillette', m: 16 }, scout: { n: 'Scout', m: 20 },
  randonneur: { n: 'Randonneur', m: 24 }, montagnard: { n: 'Montagnard', m: 28 }, pecheur: { n: 'Pêcheur', m: 26 },
  nageur: { n: 'Nageuse', m: 24 }, ornitho: { n: 'Ornithologue', m: 28 }, karateka: { n: 'Karatéka', m: 30 },
  mystique: { n: 'Mystique', m: 32 }, dresseur: { n: 'Dresseur', m: 40 }, dresseuse: { n: 'Dresseuse', m: 40 },
  savant: { n: 'Savant', m: 40 }, veilleur: { n: 'Veilleur', m: 32 }, archiviste: { n: 'Archiviste', m: 40 },
  somnis: { n: 'Sbire Éclipse', m: 24 }, admin: { n: 'Admin Éclipse', m: 60 }, boss: { n: 'Chef Éclipse', m: 100 },
  racine: { n: 'Sbire Racine', m: 30 }, veteran: { n: '', m: 90 }, commandant: { n: 'Commandant', m: 90 }, maitre: { n: 'Maître', m: 140 },
  rival: { n: '', m: 40 }, leader: { n: '', m: 100 }, elite: { n: 'Élite', m: 120 }, champion: { n: 'Championne', m: 160 }, ancien: { n: 'Le Premier Dresseur', m: 200 },
};
const TCLS_PAL = { gamin: 0, fillette: 1, scout: 2, randonneur: 4, montagnard: 6, pecheur: 8, nageur: 9, ornitho: 5, karateka: 3, mystique: 7, dresseur: 2, dresseuse: 1, savant: 4, veilleur: 7, archiviste: 8 };
const TR_TYPES = { pecheur: ['eau'], nageur: ['eau'], ornitho: ['vent'], karateka: ['combat'], mystique: ['esprit', 'ombre', 'lumiere'], veilleur: ['ombre', 'esprit'], montagnard: ['roc', 'acier', 'givre'], savant: ['foudre', 'acier', 'toxine'], archiviste: ['esprit', 'roc', 'acier'] };
const NAMES = ['Léo', 'Inès', 'Hugo', 'Lina', 'Nolan', 'Jade', 'Malo', 'Rose', 'Sacha', 'Elsa', 'Timéo', 'Zoé', 'Louis', 'Anna', 'Gabin', 'Mila', 'Noé', 'Lou', 'Axel', 'Iris', 'Baptiste', 'Camille', 'Yanis', 'Margot', 'Théo', 'Lucie', 'Enzo', 'Chloé', 'Kenji', 'Amara', 'Soren', 'Nadia', 'Pablo', 'Yuna', 'Idris', 'Maëlys', 'Jules', 'Alma', 'Basile', 'Céleste', 'Eliott', 'Lisa', 'Nathan', 'Ambre', 'Robin', 'Salomé', 'Aaron', 'Capucine', 'Marius', 'Romy'];
const TR_INTRO = {
  _: ["Hé ! Nos regards se sont croisés. On se bat !", "Tu as l'air fort. Montre-moi ça !", "Personne ne passe sans un combat !", "Mes créatures s'ennuyaient. Merci de passer !", "On va voir si tu mérites tes badges !", "Je m'entraîne ici depuis des jours. À toi de jouer !"],
  gamin: ["J'ai attrapé ma créature tout seul ! Regarde !", "Mon grand frère m'a tout appris. Enfin, presque."],
  fillette: ["Ma créature est la plus mignonne. Et la plus forte !", "Tu veux voir mes créatures ? Elles mordent !"],
  pecheur: ["Ça ne mord pas... Alors c'est toi qui vas mordre la poussière !", "Le calme de l'eau cache des surprises."],
  karateka: ["Hah ! Mon poing et mes créatures ne font qu'un !", "L'entraînement ne s'arrête jamais !"],
  mystique: ["Les esprits m'ont annoncé ta venue.", "Je vois ton avenir... Il contient une défaite."],
  veilleur: ["La nuit est mon royaume. Tu y es entré.", "Je veille pendant que le monde dort."],
  somnis: ["L'Ordre Éclipse donnera un maître à ce monde !", "Quand le Zénith s'éveillera, tu plieras !"],
  racine: ["Les racines finissent toujours par tout reprendre.", "Maître Ronce a vu la mer engloutir son île. Toi, tu n'as rien vu."],
  archiviste: ["Les ruines d'Éclosia sont sorties de la mer il y a dix ans. Elles ont tant à révéler.", "J'étudie les anciens textes. Et les anciens combats."],
};
const TR_LOSE = ["Perdu... Tu es vraiment doué.", "Incroyable ! Je dois m'entraîner encore.", "Bien joué. Continue comme ça.", "Mes créatures ont tout donné...", "Je me souviendrai de ce combat.", "D'accord, d'accord, tu as gagné !"];
const TR_AFTER = ["Il y a encore beaucoup de dresseurs plus loin. Bonne chance !", "Soigne tes créatures avant d'aller plus loin.", "Un jour, je te battrai.", "Tu vas jusqu'à la Ligue ? Je crois en toi."];

const RIVAL_COUNTER = { feuillon: 'brasille', brasille: 'clapotin', clapotin: 'feuillon' };
const STORY_TRAINERS = {
  rival1: { cls: 'rival', name: 'Nova', team: [['$S', 5]], intro: "Cinq ans que tu es parti·e, et tu crois que j'allais te laisser le dernier mot ? On a nos créatures : combat !", lose: "Bon. Tu n'as pas perdu la main.", music: 'trainer', noLoss: true, money: 300 },
  rival2: { cls: 'rival', name: 'Nova', team: [['piouly', 9], ['$S', 11]], intro: "Hé ! Je t'attendais. Mon équipe a grandi depuis le labo. La tienne, pas tellement !", lose: "Encore perdu ? C'est pas possible... La prochaine fois, je serai prête.", after: "On se reverra. Et je gagnerai.", music: 'trainer', hideAfter: 1, money: 600 },
  rival3: { cls: 'rival', name: 'Nova', team: [['ventrelle', 19], ['ombrelin', 18], ['$S', 21]], intro: "L'Ordre Éclipse cherche Zénithar. Moi, je cherche autre chose. Mais d'abord : toi !", lose: "Tu deviens vraiment fort·e...", music: 'trainer', hideAfter: 1, money: 1500 },
  rival4: { cls: 'rival', name: 'Nova', team: [['ventrelle', 29], ['spectrombre', 30], ['dracolin', 29], ['$S', 32]], intro: "Le Sanctuaire du Zénith est tout près. L'Éclipse y est déjà. Si tu veux passer, prouve que tu es à la hauteur !", lose: "D'accord. Vas-y. Moi, je reste ici pour couvrir tes arrières.", music: 'trainer', hideAfter: 1, money: 2500 },
  rival5: { cls: 'rival', name: 'Nova', team: [['cieloraptor', 39], ['spectrombre', 39], ['draconelle', 40], ['voltigre', 39], ['$S', 42]], intro: "La Ligue est juste derrière cette grotte. Un·e seul·e de nous deux y entrera en premier !", lose: "... Vas-y. Deviens Champion·ne.", music: 'boss', hideAfter: 1, money: 4000 },
  rival6: { cls: 'rival', name: 'Nova', team: [['cieloraptor', 68], ['spectrombre', 67], ['draconyx', 69], ['pantharcane', 67], ['voltigre', 67], ['$S', 71]], intro: "On a traversé deux mondes, toi et moi. Ce sommet, on l'atteindra ensemble... mais d'abord, un dernier combat. Le vrai.", lose: "Tu m'as toujours devancée. Et pour la première fois, ça me fait plaisir. Va. Il t'attend là-haut.", music: 'boss', hideAfter: 1, money: 8000 },
  somnis_r4: { cls: 'somnis', name: 'Vex', team: [['vipereau', 12], ['ombrelin', 12]], intro: "Hé ! L'Ordre Somnis va endormir Zénithar pour toujours. Plus de guerres, plus de douleur. Tu n'as rien vu, compris ?", lose: "Grr... Le monde finira par s'endormir, que tu le veuilles ou non !", music: 'somnis', hideAfter: 1 },
  somnis_t5a: { cls: 'somnis', name: 'Gorm', team: [['vipereau', 24], ['ombrelin', 24]], intro: "L'arène est fermée. Ordre de l'Admin Saline !", lose: "L'Admin ne va pas être contente...", music: 'somnis', hideAfter: 1 },
  somnis_t5b: { cls: 'somnis', name: 'Pell', team: [['mousseron', 24], ['noctelle', 25]], intro: "Tu veux entrer ? Il faudra passer sur mes créatures.", lose: "Bon, bon, je m'écarte...", music: 'somnis', hideAfter: 1 },
  somnis_t5c: { cls: 'admin', name: 'Saline', team: [['cobracre', 27], ['spectrombre', 27], ['champitox', 28]], intro: "Je suis Saline, Admin de l'Ordre Éclipse. Ce volcan dort sur une veine d'énergie du Zénith. Elle nous appartient.", lose: "Intéressant. Nox voudra entendre parler de toi. Nous partons... pour l'instant.", music: 'somnis', hideAfter: 1 },
  somnis_aube1: { cls: 'somnis', name: 'Kriss', team: [['cobracre', 36], ['spectrombre', 36], ['noctelle', 36]], intro: "Personne n'entre ! Oniris va endormir Zénithar avant que l'Éclipse ne le réveille !", lose: "Oniris va me tuer... Enfin, m'endormir.", music: 'somnis', hideAfter: 1 },
  somnis_aube2: { cls: 'boss', name: 'Nox', team: [['pantharcane', 39], ['cobracre', 39], ['spectrombre', 40], ['champitox', 40]], intro: "Oniris délire. Je suis Nox, chef de l'Ordre Éclipse. Zénithar a uni les Quatre Terres une fois. Sous mes ordres, il les unira pour de bon. Écarte-toi.", lose: "Non... Ma machine... Qui nous a vraiment envoyés ici, Oniris et moi ?", music: 'boss', hideAfter: 1, money: 5000 },
  somnis_oniris: { cls: 'boss', name: 'Oniris', team: [['songeot', 38], ['spectrombre', 38], ['chouettine', 38], ['revemage', 40]], intro: "Je suis Oniris, de l'Ordre Somnis. Nox veut réveiller Zénithar pour régner. Moi, je veux qu'il dorme à jamais, et le monde avec lui. Un mécène nous a offert ce sanctuaire... à tous les deux. Curieux, non ?", lose: "Un mécène aux cheveux blancs, qui signait ses lettres d'un « R ». Il nous a montés l'un contre l'autre... Nox ! Écoute-moi !", music: 'boss', hideAfter: 1, money: 4500 },
  ronce_final: { cls: 'maitre', name: 'Ronce', team: [['epineant', 76], ['ronceloup', 73], ['magmorne', 73], ['pantharcane', 74], ['nyctaile', 73], ['draconyx', 75]], intro: "Le Zénith était la clé. La Graine, la serrure. L'Éveil est la porte. Tu as tout ouvert pour moi. Éveillon m'obéira, et plus jamais la mer ne prendra personne.", lose: "... Ma femme. Mon fils. Je voulais seulement que ça ne recommence jamais.", music: 'boss', hideAfter: 1, money: 15000 },
  somnis_s5a: { cls: 'racine', name: 'Dorn', team: [['ronceloup', 53], ['encrelot', 53], ['nyctaile', 54]], intro: "Un·e champion·ne des Quatre Terres ? Ici ? Maître Ronce avait raison, tu es tenace.", lose: "Tu ne pourras pas tous nous arrêter !", music: 'somnis', hideAfter: 1 },
  somnis_s5b: { cls: 'admin', name: 'Létha', team: [['champignard', 54], ['felinuit', 54], ['ronceloup', 54]], intro: "Je suis Létha. L'Ordre Somnis est mort au Sanctuaire du Zénith. Maître Ronce m'a offert une nouvelle place. Il a toujours un coup d'avance.", lose: "Fais attention. Il veut que tu gagnes. Tout ce que tu fais, il l'avait prévu.", music: 'somnis', hideAfter: 1 },
  somnis_u5: { cls: 'commandant', name: 'Épine', team: [['ronceloup', 57], ['brasaile', 57], ['encrelot', 58], ['pantharcane', 58]], intro: "Je suis Épine, commandant de l'Ordre Racine. Tu as les yeux de quelqu'un qui n'a jamais rien perdu. Voyons si ça tient.", lose: "... Tu te bats comme elle. Comme ma petite sœur. Si tu la croises, ne lui dis pas que tu m'as vu.", music: 'somnis', hideAfter: 1, money: 6000 },
  somnis_nuit1: { cls: 'racine', name: 'Vex', team: [['ronceloup', 60], ['spectrombre', 60], ['nyctaile', 61]], intro: "Encore toi ?! J'ai changé d'Ordre, mais pas de malchance. Depuis la Route 4, je n'ai pensé qu'à cette revanche !", lose: "Toujours pas... Je vais vraiment changer de métier.", music: 'somnis', hideAfter: 1 },
  somnis_nuit2: { cls: 'maitre', name: 'Ronce', team: [['ronceloup', 62], ['brasaile', 62], ['magmoule', 63], ['encrelot', 63], ['epineant', 66]], intro: "Alors c'est toi, le dresseur aux six Pétales. Nox, Oniris, Épine... et toi. Vous avez tous travaillé pour moi. La nuit de la Germination, la mer a englouti l'île de Nacre. Ma femme. Mon fils. La Graine n'a demandé la permission à personne. Je ne laisserai plus jamais une force pareille sans maître. Écarte-toi !", lose: "Impossible... Ce lien entre toi et tes créatures... Ou peut-être que tout se passe exactement comme prévu.", music: 'boss', hideAfter: 1, money: 10000 },
  m_nova: { cls: 'veteran', name: 'Lame Bleue', team: [['zapillon', 78], ['galetin', 77], ['brasaile', 78], ['ronceloup', 79], ['$S', 82]], intro: "Je suis la Lame Bleue, capitaine de la garde du Roi. Mon frère et moi servons Ronce depuis qu'il nous a trouvés sur ce toit. Pourquoi tu me regardes comme ça ?", lose: "... Tu me regardes comme si tu me connaissais. Comme si, quelque part, j'avais été quelqu'un d'autre.", music: 'boss', hideAfter: 1, money: 9000 },
  m_nox: { cls: 'veteran', name: 'Général Nox', team: [['fantorbe', 79], ['pantharcane', 80], ['spectrombre', 80], ['magmorne', 80], ['karatour', 82]], intro: "Général Nox, au service du Roi. Ici, j'ai obtenu ce que je voulais : un maître pour ce monde. Je le regrette chaque matin. Mais je ne sais plus rien faire d'autre que garder cette porte.", lose: "Va. Délivre-nous de lui. Et dis à l'autre Nox, celui de ton monde, qu'il a eu de la chance de perdre.", music: 'boss', hideAfter: 1, money: 10000, power: 'bloom' },
  m_ilan: { cls: 'commandant', name: 'Épine', team: [['ronceloup', 80], ['brasaile', 80], ['encrelot', 81], ['pantharcane', 81], ['epineant', 83]], intro: "Je suis Épine. Ici, ma sœur n'a jamais fui. Elle est devenue ce que je suis. Tu veux voir le Roi ? Il faudra passer sur ce qu'il reste de moi.", lose: "Dans ton monde... on s'en sort, Nova et moi ? ... Ne réponds pas. Laisse-moi l'imaginer.", music: 'boss', hideAfter: 1, money: 11000 },
  roi_ronce: { cls: 'veteran', name: 'Roi Ronce', team: [['ronceloup', 84], ['magmorne', 84], ['draconyx', 85], ['pantharcane', 85], ['nocturnis', 86], ['epineant', 88]], intro: "Un voyageur d'un autre monde. Dans le tien, j'ai perdu, n'est-ce pas ? Ici, la mer n'a plus jamais tué personne. Plus personne n'ose même respirer. C'est le prix. Montre-moi si ton monde vaut mieux.", lose: "... Dans ton monde, est-ce que quelqu'un plante encore des arbres sur Nacre ?", music: 'boss', hideAfter: 1, money: 20000, power: 'giant' },
  a_aurele: { cls: 'veteran', name: 'Aurèle', team: [['cervaube', 76], ['mandracine', 77], ['racinol', 77], ['tortumousse', 78]], intro: "Aurèle, botaniste de Nacre. Un·e dresseur·se qui vient de nulle part et qui me regarde avec ces yeux-là ? Un combat, pour faire connaissance !", lose: "Tu te bats comme quelqu'un qui a déjà perdu beaucoup. Viens dîner, Liora fera des galettes.", music: 'trainer', hideAfter: 0, money: 6000 },
  a_trio: { cls: 'veteran', name: 'Jeune Sauge', team: [['ventrelle', 78], ['statuon', 79], ['aurelys', 79], ['cieloraptor', 80]], intro: "Sauge, chercheur. Lierre dit que je suis trop sérieux. Toi, tu as l'air de savoir quelque chose sur notre graine. Prouve-le.", lose: "Tu connais mon nom avant que je te le dise. Et tu m'appelles « Professeur ». C'est étrange... et flatteur.", music: 'trainer', hideAfter: 0, money: 6000 },
  elite1: { cls: 'elite', name: 'Corvin', team: [['cobracre', 44], ['spectrombre', 45], ['champitox', 44], ['nyctaile', 46], ['cobracre', 47]], intro: "Je suis Corvin, premier membre de la Ligue. Le poison et l'ombre... deux choses qu'on ne voit pas venir.", lose: "Tu as vu clair dans mon jeu. Passe.", music: 'boss', hideAfter: 1 },
  elite2: { cls: 'elite', name: 'Thalia', team: [['pugilarque', 46], ['ranaqua', 46], ['lievrigel', 47], ['pantharcane', 48], ['pugilarque', 49]], intro: "Thalia, deuxième membre. Mes créatures et moi, on s'entraîne depuis le lever du soleil. Chaque jour.", lose: "Ta force est réelle. Continue !", music: 'boss', hideAfter: 1 },
  elite3: { cls: 'elite', name: 'Orso', team: [['montagrok', 48], ['engrenor', 48], ['foretaupe', 49], ['carapinc', 49], ['montagrok', 50]], intro: "Orso. Troisième membre. Ma défense n'a jamais été percée.", lose: "Jusqu'à aujourd'hui. Bravo.", music: 'boss', hideAfter: 1 },
  elite4: { cls: 'elite', name: 'Séléné', team: [['revemage', 50], ['aurelys', 50], ['glaciarde', 51], ['noctelys', 51], ['revemage', 52]], intro: "Séléné, dernière des Élites. J'ai vu ce combat en rêve. Je n'ai pas vu sa fin.", lose: "Astra t'attend au sommet de la tour. Elle a fait le même rêve que moi.", music: 'boss', hideAfter: 1 },
  champion: { cls: 'champion', name: 'Astra', team: [['cieloraptor', 52], ['belitonnerre', 52], ['phenixel', 53], ['archipelone', 53], ['magmorne', 54], ['draconyx', 56]], intro: "Bienvenue au sommet de la Tour du Zénith. Je suis Astra, Championne des Quatre Terres. Tu as chassé l'Éclipse du sanctuaire et rencontré Zénithar. Montre-moi la force qui t'a porté·e jusqu'ici !", lose: "Magnifique. Les Quatre Terres ont un nouveau Champion.", music: 'boss', hideAfter: 1 },
  elio: { cls: 'ancien', name: 'Elio', team: [['draconyx', 72], ['statuon', 70], ['glaciarde', 70], ['phenixel', 71], ['abyssard', 71], ['archipelone', 72]], intro: "Mille ans que j'attends au sommet. Je fus le premier dresseur. J'ai vu Zénithar unir les terres, et j'ai rêvé la Graine bien avant qu'elle germe. Montre-moi qui tu es devenu·e en chemin.", lose: "Je peux enfin me reposer. Écoute... Il arrive.", music: 'boss', hideAfter: 0 },
};
const LEGENDS = {
  auberis: { sp: 'auberis', lvl: 42, flag: 'leg_auberis', text: "Zénithar, le gardien du Zénith, ouvre les yeux. Une lumière dorée emplit le sanctuaire !" },
  nocturnis: { sp: 'nocturnis', lvl: 62, flag: 'leg_nocturnis', text: "La Graine-Monde s'ouvre dans un éclat de lumière. Germalis, l'esprit de la Graine, apparaît !" },
  eveillon: { sp: 'eveillon', lvl: 70, flag: 'leg_eveillon', text: "Le ciel se fend entre le jour et la nuit. Éveillon apparaît !" },
};

// ---------- Génération de cartes ----------
const MAPS = {};
const INT = {};
const SPECIAL_RET = {};
function newGrid(w, h, ch) { const g = []; for (let y = 0; y < h; y++) g.push(new Array(w).fill(ch)); return g; }
function getMap(id) {
  if (MAPS[id]) return MAPS[id];
  let m;
  if (id.includes('~')) {
    const parent = id.split('~')[0];
    if (!INT[id]) getMap(parent);
    m = genInterior(id, INT[id]);
  } else if (TOWNS[id]) m = TOWNS[id].special === 'summit' ? genSummit(id) : genTown(id);
  else if (ROUTES[id]) m = ROUTES[id].cave ? genCave(id) : genRoute(id);
  else if (id === 'sanct_aube' || id === 'sanct_nuit') m = genSanctuary(id);
  MAPS[id] = m;
  return m;
}
function petalCount() { return GYMS.filter((g, i) => g.petal && G.badges[i]).length; }
function badgeCount(reg) { const b = REGIONS[reg].gymBase; let n = 0; for (let i = b; i < b + 8; i++) if (G.badges[i]) n++; return n; }

function trainerNPC(R, cls, team, extra = {}) {
  const name = pick(R, NAMES);
  const intro = pick(R, (TR_INTRO[cls] || []).concat(TR_INTRO._));
  return Object.assign({ kind: 'trainer', pal: NPC_PALS[(TCLS_PAL[cls] != null ? TCLS_PAL[cls] : 0) + (R() < 0.3 ? 1 : 0)] || NPC_PALS[0], trainer: { cls, name, team, intro, lose: pick(R, TR_LOSE), after: pick(R, TR_AFTER), money: TCLS[cls].m } }, extra);
}
function encTeam(R, enc, cls, boost) {
  const pool = (enc.grass || enc.cave || []).filter(e => e[4] !== 'n');
  const water = enc.water || [];
  let src = pool;
  if ((cls === 'pecheur' || cls === 'nageur') && water.length) src = water;
  const pref = TR_TYPES[cls];
  const n = 1 + Math.floor(R() * 3);
  const team = [];
  for (let i = 0; i < n; i++) {
    let e = pick(R, src);
    if (pref && R() < 0.6) {
      const cands = DEX.filter(sp => SP[sp].stage !== 'L' && SP[sp].stage !== 'M' && SP[sp].stage !== 'P' && !SP[sp].prev && pref.some(t => SP[sp].types.includes(t)) && !['feuillon', 'brasille', 'clapotin', 'dracolin'].includes(sp));
      if (cands.length) e = [pick(R, cands), e[1], e[2]];
    }
    const lvl = e[2] + Math.floor(R() * 2) + boost;
    team.push([evolveForLevel(e[0], lvl), lvl]);
  }
  return team;
}

// ---- Ville ----
function genTown(id) {
  const def = TOWNS[id], reg = def.reg, R = rng(hashStr(id + ':town'));
  const W = 28, H = 22;
  const t = newGrid(W, H, '.');
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (x < 2 || y < 2 || x >= W - 2 || y >= H - 2) t[y][x] = 'T';
  const map = { id, name: def.name, kind: 'town', reg, pal: def.pal || REGIONS[reg].pal, w: W, h: H, t, border: 'T', buildings: [], warps: [], npcs: [], signs: {}, gates: {}, guards: [], enc: {}, music: reg === 'brumaire' ? 'town2' : 'town1', outdoor: true };
  // chemins
  for (let x = 2; x < W - 2; x++) { t[10][x] = ','; t[11][x] = ','; }
  for (let y = 2; y < H - 2; y++) { t[y][13] = ','; t[y][14] = ','; }
  const L = LINKS[id];
  const openGate = (side, to) => {
    if (side === 'n') { for (let y = 0; y < 2; y++) { t[y][13] = ','; t[y][14] = ','; } map.gates.n = { p: 13, to }; }
    if (side === 's') { for (let y = H - 2; y < H; y++) { t[y][13] = ','; t[y][14] = ','; } map.gates.s = { p: 13, to }; }
    if (side === 'w') { for (let x = 0; x < 2; x++) { t[10][x] = ','; t[11][x] = ','; } map.gates.w = { p: 10, to }; }
    if (side === 'e') { for (let x = W - 2; x < W; x++) { t[10][x] = ','; t[11][x] = ','; } map.gates.e = { p: 10, to }; }
  };
  if (L.entr) openGate(L.entr.side, L.entr.to);
  if (L.exit) {
    openGate(L.exit.side, L.exit.to);
    const s = L.exit.side;
    const cells = s === 'n' ? [[13, 1], [14, 1]] : s === 's' ? [[13, H - 2], [14, H - 2]] : s === 'w' ? [[1, 10], [1, 11]] : [[W - 2, 10], [W - 2, 11]];
    let cond, text;
    if (id === 't0') { cond = () => !!G.flags.starter; text = "Attends ! Sortir sans créature, c'est de la folie. Passe d'abord au labo du Prof. Sauge !"; }
    else if (def.gym != null) {
      const need = def.gym - REGIONS[reg].gymBase + 1;
      cond = () => badgeCount(reg) >= need;
      text = `La route suivante est dangereuse. Reviens quand tu auras le badge de l'arène de ${def.name}.`;
    }
    if (cond) map.guards.push({ cells, cond, text });
    if (cond) {
      const gx = s === 'n' || s === 's' ? 12 : (s === 'w' ? 2 : W - 3);
      const gy = s === 'n' ? 2 : s === 's' ? H - 3 : 9;
      if (t[gy][gx] === '.' || t[gy][gx] === ',') map.npcs.push({ kind: 'npc', x: gx, y: gy, dir: 'down', pal: PALS.guard, text: () => cond() ? "Bonne route, et prends soin de tes créatures !" : text });
    }
  }
  // bâtiments
  const lay = Object.assign({ NW: 'center', NE: 'shop', SW: 'house', SE: def.gym != null ? 'gym' : 'house2' }, def.layout || {});
  const Q = { NW: [2, 2], NE: [15, 2], SW: [2, 12], SE: [15, 12] };
  const SIZE = { center: [6, 4], shop: [5, 4], house: [5, 4], house2: [5, 4], home: [5, 4], gym: [7, 5], lab: [7, 5], league: [9, 5] };
  const doorFronts = [];
  let houseN = 0;
  const addBuilding = (kind, bx, by, bw, bh, roof) => {
    const dx = bx + Math.floor(bw / 2), dy = by + bh - 1;
    for (let y = by; y < by + bh; y++) for (let x = bx; x < bx + bw; x++) t[y][x] = 'x';
    t[dy][dx] = 'D';
    const b = { kind: kind.startsWith('house') ? 'house' : kind, x: bx, y: by, w: bw, h: bh, door: [dx, dy], roof };
    if (kind === 'gym') { b.emblem = TC[GYMS[def.gym].type]; b.roof = dhex(TC[GYMS[def.gym].type], 0.15); }
    map.buildings.push(b);
    const intId = `${id}~${kind}`;
    INT[intId] = { kind: kind.startsWith('house') ? 'house' : kind, parent: id, door: [dx, dy], sub: kind };
    map.warps.push({ x: dx, y: dy, to: intId, enter: true });
    doorFronts.push([dx, dy + 1]);
    // relier au chemin
    if (dy + 1 < 10) { for (let y = dy + 1; y < 10; y++) if (t[y][dx] === '.') t[y][dx] = ','; }
    else { const y = dy + 1; const tx = dx < 13 ? 13 : 14; for (let x = Math.min(dx, tx); x <= Math.max(dx, tx); x++) if (t[y][x] === '.') t[y][x] = ','; }
    return b;
  };
  for (const q of ['NW', 'NE', 'SW', 'SE']) {
    const kind = lay[q];
    const [qx, qy] = Q[q];
    if (kind === 'pond') {
      for (let y = qy + 1; y < qy + 7; y++) for (let x = qx + 1; x < qx + 10; x++) t[y][x] = (y === qy + 1 || y === qy + 6 || x === qx + 1 || x === qx + 9) ? 's' : '~';
      continue;
    }
    if (kind === 'dock') {
      for (let y = qy + 1; y < H; y++) for (let x = qx; x < W; x++) t[y][x] = '~';
      for (let x = qx; x < W - 2; x++) t[qy + 1][x] = 's';
      for (let y = qy + 1; y < qy + 7; y++) { t[y][qx + 5] = '='; t[y][qx + 6] = '='; }
      map.npcs.push({ kind: 'npc', x: qx + 6, y: qy + 6, dir: 'up', pal: PALS.sailor, script: 'dock' });
      continue;
    }
    if (!kind || kind === 'none') continue;
    const [bw, bh] = SIZE[kind];
    const bx = qx + Math.floor((11 - bw) / 2), by = qy + 1;
    let roof = ROOF[kind];
    if (kind.startsWith('house')) roof = HOUSE_ROOFS[(hashStr(id) + houseN++) % HOUSE_ROOFS.length];
    addBuilding(kind, bx, by, bw, bh, roof);
  }
  // panneau
  t[12][12] = 'S'; map.signs['12,12'] = def.desc;
  // lampadaires et fleurs
  for (const [lx, ly] of [[12, 9], [15, 9], [12, 12 + 0], [15, 12]]) if (t[ly][lx] === '.') t[ly][lx] = 'L';
  const isFront = (x, y) => doorFronts.some(([a, b]) => a === x && (b === y || b + 1 === y));
  for (let i = 0; i < 26; i++) {
    const x = ri(R, 2, W - 3), y = ri(R, 2, H - 3);
    if (t[y][x] === '.' && !isFront(x, y)) t[y][x] = 'f';
  }
  // habitants
  const lines = (def.lines || []).slice();
  if (def.gym != null) {
    const gt = GYMS[def.gym].type;
    lines.push(`L'arène de ${def.name} est spécialisée dans le type ${TN[gt]}. Les types ${strongAgainst(gt).map(t => TN[t]).join(', ')} y sont efficaces.`);
  }
  const spots = [];
  for (let y = 3; y < H - 3; y++) for (let x = 3; x < W - 3; x++) if ((t[y][x] === '.' || t[y][x] === ',') && !isFront(x, y) && !map.npcs.some(n => n.x === x && n.y === y)) spots.push([x, y]);
  lines.forEach((line, i) => {
    const s = spots.splice(Math.floor(R() * spots.length), 1)[0]; if (!s) return;
    map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: pick(R, ['down', 'left', 'right', 'up']), pal: NPC_PALS[(hashStr(id) + i * 3) % NPC_PALS.length], text: line, wander: 2 });
  });
  townExtras(id, map, spots, R);
  // événements de ville
  if (id === 't5') {
    const [dx, dy] = map.buildings.find(b => b.kind === 'gym').door;
    map.npcs.push(storyTrainer('somnis_t5c', dx, dy + 1, 'down', PALS.admin, 1));
    map.npcs.push(storyTrainer('somnis_t5a', dx - 1, dy + 2, 'down', PALS.grunt, 1));
    map.npcs.push(storyTrainer('somnis_t5b', dx + 1, dy + 2, 'down', PALS.grunt, 1));
  }
  if (id === 'u5') {
    const [dx, dy] = map.buildings.find(b => b.kind === 'gym').door;
    map.npcs.push(storyTrainer('somnis_u5', dx, dy + 1, 'down', PALS.epine, 1));
  }
  return map;
}
function storyTrainer(key, x, y, dir, pal, sight) {
  const d = STORY_TRAINERS[key];
  return { kind: 'trainer', x, y, dir, pal, story: key, trainer: Object.assign({ sight: sight != null ? sight : 4, flag: 'st_' + key }, d) };
}

// ---- Route ----
function genRoute(id) {
  const def = ROUTES[id], L = LINKS[id], dir = L.dir, R = rng(hashStr(id + ':route'));
  const A = def.len || 52, C = dir === 'n' ? 22 : 20;
  const Gd = newGrid(C, A, '.');            // Gd[a][c]
  for (let a = 0; a < A; a++) for (let c = 0; c < C; c++) if (c < 2 || c >= C - 2 || a === 0 || a === A - 1) Gd[a][c] = 'T';
  const ge = ri(R, 4, C - 6), gx = ri(R, 4, C - 6);
  const path = new Set();
  const carve = (a, c) => { Gd[a][c] = ','; path.add(a * 100 + c); };
  let c = ge;
  const pcol = [];
  for (let a = 0; a < A; a++) {
    if (a > 3 && a < A - 10 && R() < 0.2) {
      const nc = Math.max(3, Math.min(C - 5, c + (R() < 0.5 ? -1 : 1) * ri(R, 2, 5)));
      for (let k = Math.min(c, nc); k <= Math.max(c, nc) + 1; k++) carve(a, k);
      c = nc;
    }
    if (a >= A - 10 && c !== gx) {
      const nc = c + Math.sign(gx - c) * Math.min(Math.abs(gx - c), 2);
      for (let k = Math.min(c, nc); k <= Math.max(c, nc) + 1; k++) carve(a, k);
      c = nc;
    }
    carve(a, c); carve(a, c + 1);
    pcol[a] = c;
  }
  const isPath = (a, cc) => path.has(a * 100 + cc);
  const interior = (a, cc) => a > 0 && a < A - 1 && cc >= 2 && cc < C - 2;
  // bosquets
  const nTrees = def.cave ? 0 : 10 + Math.floor(R() * 6);
  for (let i = 0; i < nTrees; i++) {
    const a0 = ri(R, 2, A - 3), c0 = ri(R, 2, C - 3), ra = 1 + R() * 3, rc = 1 + R() * 2.5;
    for (let a = Math.floor(a0 - ra); a <= a0 + ra; a++) for (let cc = Math.floor(c0 - rc); cc <= c0 + rc; cc++) {
      if (!interior(a, cc) || isPath(a, cc)) continue;
      if (((a - a0) / ra) ** 2 + ((cc - c0) / rc) ** 2 <= 1 && !isPath(a, cc - 1) && !isPath(a, cc + 1)) Gd[a][cc] = 'T';
    }
  }
  // hautes herbes
  const nGrass = 6 + Math.floor(R() * 4);
  for (let i = 0; i < nGrass; i++) {
    const a0 = ri(R, 3, A - 6), c0 = ri(R, 2, C - 7), ha = ri(R, 3, 7), wc = ri(R, 3, 8);
    for (let a = a0; a < a0 + ha && a < A - 1; a++) for (let cc = c0; cc < c0 + wc && cc < C - 2; cc++) if (Gd[a][cc] === '.' || Gd[a][cc] === ',') Gd[a][cc] = '"';
  }
  // étang
  if (def.pond) {
    const a0 = ri(R, 12, A - 18);
    const pc = pcol[a0];
    const leftRoom = pc - 2, rightRoom = C - 2 - (pc + 2);
    const w = 6, h = 6;
    const c0 = leftRoom > rightRoom ? Math.max(2, pc - 1 - w) : pc + 3;
    let ok = true;
    for (let a = a0; a < a0 + h; a++) for (let cc = c0; cc < c0 + w; cc++) if (!interior(a, cc) || isPath(a, cc)) ok = false;
    if (ok) for (let a = a0; a < a0 + h; a++) for (let cc = c0; cc < c0 + w; cc++) Gd[a][cc] = '~';
  }
  // fleurs
  for (let a = 1; a < A - 1; a++) for (let cc = 2; cc < C - 2; cc++) if (Gd[a][cc] === '.' && R() < 0.035) Gd[a][cc] = 'f';
  const toXY = (a, cc) => dir === 'n' ? [cc, A - 1 - a] : [a, cc];
  const W = dir === 'n' ? C : A, H = dir === 'n' ? A : C;
  const faceC = s => dir === 'n' ? (s > 0 ? 'right' : 'left') : (s > 0 ? 'down' : 'up');
  const npcs = [];
  const used = new Set();
  const free = (a, cc) => interior(a, cc) && !used.has(a * 100 + cc) && Gd[a][cc] !== '~';
  const clear = (a, cc) => { if (Gd[a][cc] === 'T' || Gd[a][cc] === 'f') Gd[a][cc] = '.'; };
  // dresseurs
  const n = def.tr || 3;
  const reserved = new Set();
  for (let k = 0; k < n; k++) {
    const a = Math.floor(8 + (A - 18) * (k + 0.5) / n) + ri(R, -1, 1);
    const pc = pcol[a];
    let side = R() < 0.5 ? -1 : 1;
    let cc = side < 0 ? pc - 2 : pc + 3;
    if (!free(a, cc) || cc < 2 || cc >= C - 2) { side = -side; cc = side < 0 ? pc - 2 : pc + 3; }
    if (!free(a, cc) || cc < 2 || cc >= C - 2) continue;
    clear(a, cc); clear(a, side < 0 ? pc - 1 : pc + 2);
    used.add(a * 100 + cc); reserved.add(a);
    const cls = pick(R, def.cls);
    const team = encTeam(R, def.enc, cls, 1);
    const [x, y] = toXY(a, cc);
    npcs.push(trainerNPC(R, cls, team, { x, y, dir: faceC(-side), trainer: undefined }));
    const npc = npcs[npcs.length - 1];
    const tr = trainerNPC(R, cls, team).trainer; tr.sight = 4; tr.flag = `tr:${id}:${k}`;
    npc.trainer = tr;
  }
  // personnages scénarisés (déclenchés en traversant la route)
  const lineTriggers = [];
  (def.special || []).forEach((key, i) => {
    const a = Math.floor(A * (0.35 + 0.3 * i)) + (i ? 2 : 0);
    const pc = pcol[a];
    const [x, y] = toXY(a, pc);
    const isR = key.startsWith('rival');
    used.add(a * 100 + pc); reserved.add(a);
    npcs.push(storyTrainer(key, x, y, dir === 'n' ? 'down' : 'left', isR ? PALS.rival : (def.reg === 'brumaire' ? PALS.racine : PALS.grunt), 3));
    const [lx, ly] = toXY(a - 1, 0);
    lineTriggers.push(dir === 'n' ? { y: ly, npc: npcs.length - 1 } : { x: lx, npc: npcs.length - 1 });
  });
  // objets
  (def.items || []).forEach((it, i) => {
    for (let tries = 0; tries < 30; tries++) {
      const a = ri(R, 4, A - 5), pc = pcol[a];
      const cc = R() < 0.5 ? pc - 1 : pc + 2;
      if (!free(a, cc) || isPath(a, cc)) continue;
      clear(a, cc); used.add(a * 100 + cc);
      const [x, y] = toXY(a, cc);
      npcs.push({ kind: 'item', x, y, item: it, flag: `it:${id}:${i}` });
      break;
    }
  });
  // arbuste à couper avec trésor
  if (def.cut) {
    for (let tries = 0; tries < 40; tries++) {
      const a = ri(R, 8, A - 8), pc = pcol[a];
      const s = R() < 0.5 ? -1 : 1;
      const c1 = s < 0 ? pc - 1 : pc + 2, c2 = c1 + s, c3 = c2 + s;
      if (!interior(a, c3) || [c1, c2].some(k => !free(a, k) || isPath(a, k)) || reserved.has(a)) continue;
      if ([[a - 1, c1], [a + 1, c1], [a - 1, c2], [a + 1, c2], [a, c3]].some(([aa, kk]) => used.has(aa * 100 + kk))) continue;
      Gd[a][c1] = 'b'; Gd[a][c2] = '.';
      for (const [aa, kk] of [[a - 1, c1], [a + 1, c1], [a - 1, c2], [a + 1, c2], [a, c3]]) if (interior(aa, kk) && !isPath(aa, kk)) Gd[aa][kk] = 'T';
      used.add(a * 100 + c2);
      const [x, y] = toXY(a, c2);
      npcs.push({ kind: 'item', x, y, item: pick(R, ['bonbon', 'rappel', 'hyperbaume', 'supersphere']), flag: `it:${id}:cut` });
      break;
    }
  }
  // entrée de sanctuaire
  let sideWarp = null;
  if (def.side) {
    for (let tries = 0; tries < 40; tries++) {
      const a = Math.floor(A / 2) + ri(R, -6, 6), pc = pcol[a];
      const s = (pc - 2 > C - 4 - pc) ? -1 : 1;
      const c1 = s < 0 ? pc - 1 : pc + 2, c2 = c1 + s, c3 = c2 + s;
      if (!interior(a, c3) || reserved.has(a) || used.has(a * 100 + c1) || used.has(a * 100 + c2) || [[a - 1, c3], [a + 1, c3], [a, c3 + s]].some(([aa, kk]) => used.has(aa * 100 + kk))) continue;
      Gd[a][c1] = ','; Gd[a][c2] = ','; Gd[a][c3] = 'O';
      for (const [aa, kk] of [[a - 1, c3], [a + 1, c3], [a, c3 + s]]) if (interior(aa, kk) && !isPath(aa, kk)) Gd[aa][kk] = 'V';
      used.add(a * 100 + c2);
      const [ox, oy] = toXY(a, c3), [bx, by] = toXY(a, c2);
      sideWarp = { ox, oy, bx, by, back: faceC(-s) };
      break;
    }
  }
  // panneau
  {
    const a = 2, pc = pcol[a], cc = pc - 1 >= 2 ? pc - 1 : pc + 2;
    Gd[a][cc] = 'S';
    var signXY = toXY(a, cc);
  }
  // promeneur
  {
    const a = ri(R, 10, A - 10), pc = pcol[a], cc = pc + 2;
    if (free(a, cc) && !isPath(a, cc)) { clear(a, cc); const [x, y] = toXY(a, cc); npcs.push({ kind: 'npc', x, y, dir: 'down', pal: NPC_PALS[ri(R, 0, 9)], text: pick(R, HINTS[def.reg]) }); }
  }
  // conversion
  const t = newGrid(W, H, '.');
  for (let a = 0; a < A; a++) for (let cc = 0; cc < C; cc++) { const [x, y] = toXY(a, cc); t[y][x] = Gd[a][cc]; }
  const map = { id, name: def.name, kind: 'route', reg: def.reg, pal: def.pal || REGIONS[def.reg].pal, w: W, h: H, t, border: 'T', buildings: [], warps: [], npcs, signs: {}, gates: {}, guards: [], enc: def.enc, music: def.reg === 'brumaire' ? 'route2' : 'route', outdoor: true, lineTriggers };
  map.signs[signXY.join(',')] = `${def.name}. ${def.reg === 'solvene' ? 'Les Quatre Terres' : 'Éclosia'}.`;
  const entrSide = L.entr.side, exitSide = L.exit.side;
  map.gates[entrSide] = { p: ge, to: L.entr.to };
  map.gates[exitSide] = { p: gx, to: L.exit.to };
  if (sideWarp) {
    map.warps.push({ x: sideWarp.ox, y: sideWarp.oy, to: def.side, tx: 7, ty: 16, dir: 'up' });
    SPECIAL_RET[def.side] = { map: id, x: sideWarp.bx, y: sideWarp.by, dir: sideWarp.back };
  }
  return map;
}
const HINTS = {
  envers: ["Ne parle pas trop fort. Les Éclos du Roi entendent tout.", "Dans ce monde, les lanternes sont interdites. Moi, j'en cache une sous mon lit.", "Le Roi n'est pas cruel, tu sais. Il a juste peur. Depuis dix ans.", "Si tu vois la Lame Bleue, baisse les yeux. C'est plus prudent."],
  avant: ["Les Six Îles se parlent par pigeons. Lents, mais fiables.", "Le jeune Sauge de l'Atelier dit que la graine respire. Il dort trop peu.", "Cette nuit, il y aura une lumière sous la mer. Ma grand-mère dit que c'est mauvais signe.", "On ne connaît pas de créatures qui naissent des graines, ici. Quelle drôle d'idée !"],
  solvene: ["Les créatures sauvages changent selon l'heure. Certaines ne sortent que la nuit.", "Garde toujours des Baumes sur toi. On ne sait jamais.", "Courir ? Maintiens le bouton B en marchant.", "Les créatures endormies ou paralysées sont plus faciles à capturer.", "Les Sphères marchent mieux quand la créature a peu de PV.", "Un Partage Exp fait progresser toute ton équipe en même temps.", "Les types se répondent : l'Eau éteint le Feu, la Flore boit l'Eau, le Feu brûle la Flore.", "Tu as vu ces gens en violet ? L'Ordre Éclipse. Ils me donnent des frissons."],
  brumaire: ["À Éclosia, les créatures s'appellent des Éclos. Elles sont nées avec la Graine.", "Les Sphères Nuit sont redoutables dans le noir.", "Les anciens disent que le premier dresseur attend toujours au sommet du Mont Éveil.", "Certaines créatures n'apparaissent que dans l'eau. Nage un peu !", "Les ruines d'Éclosia sont sorties de la mer la nuit de la Germination.", "Tout le monde ici a perdu quelqu'un, cette nuit-là. On n'en parle pas beaucoup."],
};

// ---- Grotte ----
function genCave(id) {
  const def = ROUTES[id], L = LINKS[id], dir = L.dir, R = rng(hashStr(id + ':cave'));
  const A = 56, C = 24;
  const Gd = newGrid(C, A, 'R');
  const ge = ri(R, 5, C - 8), gx = ri(R, 5, C - 8);
  const path = new Set();
  const carve = (a, cc) => { if (a >= 0 && a < A && cc >= 1 && cc < C - 1) { Gd[a][cc] = 'm'; path.add(a * 100 + cc); } };
  let c = ge; const pcol = [];
  for (let a = 0; a < A; a++) {
    if (a > 3 && a < A - 10 && R() < 0.22) {
      const nc = Math.max(3, Math.min(C - 6, c + (R() < 0.5 ? -1 : 1) * ri(R, 2, 6)));
      for (let k = Math.min(c, nc); k <= Math.max(c, nc) + 2; k++) carve(a, k);
      c = nc;
    }
    if (a >= A - 10 && c !== gx) { const nc = c + Math.sign(gx - c) * Math.min(Math.abs(gx - c), 2); for (let k = Math.min(c, nc); k <= Math.max(c, nc) + 2; k++) carve(a, k); c = nc; }
    carve(a, c); carve(a, c + 1); if (a > 0 && a < A - 1) carve(a, c + 2);
    pcol[a] = c;
  }
  // salles
  const rooms = [];
  for (let i = 0; i < 8; i++) {
    const a0 = ri(R, 4, A - 10), pc = pcol[a0];
    const s = R() < 0.5 ? -1 : 1;
    const w = ri(R, 4, 7), h = ri(R, 4, 7);
    const c0 = s < 0 ? pc - w : pc + 3;
    if (c0 < 2 || c0 + w > C - 2) continue;
    for (let a = a0; a < a0 + h && a < A - 1; a++) for (let cc = c0; cc < c0 + w; cc++) Gd[a][cc] = 'm';
    rooms.push([a0, c0, w, h]);
  }
  for (let a = 1; a < A - 1; a++) for (let cc = 2; cc < C - 2; cc++) if (Gd[a][cc] === 'm' && !path.has(a * 100 + cc) && R() < 0.08) Gd[a][cc] = 'r';
  const toXY = (a, cc) => dir === 'n' ? [cc, A - 1 - a] : [a, cc];
  const W = dir === 'n' ? C : A, H = dir === 'n' ? A : C;
  const faceC = s => dir === 'n' ? (s > 0 ? 'right' : 'left') : (s > 0 ? 'down' : 'up');
  const npcs = []; const used = new Set();
  const n = def.tr || 4;
  for (let k = 0; k < n; k++) {
    const a = Math.floor(8 + (A - 18) * (k + 0.5) / n);
    const pc = pcol[a];
    const s = R() < 0.5 ? -1 : 1;
    const cc = s < 0 ? pc - 2 : pc + 4;
    if (cc < 2 || cc >= C - 2) continue;
    Gd[a][cc] = 'm'; Gd[a][s < 0 ? pc - 1 : pc + 3] = 'm';
    used.add(a * 100 + cc);
    const cls = pick(R, def.cls);
    const team = encTeam(R, def.enc, cls, 2);
    const [x, y] = toXY(a, cc);
    const tr = trainerNPC(R, cls, team);
    tr.x = x; tr.y = y; tr.dir = faceC(-s); tr.trainer.sight = 4; tr.trainer.flag = `tr:${id}:${k}`;
    if (cls === 'somnis') tr.pal = PALS.grunt;
    if (cls === 'racine') tr.pal = PALS.racine;
    npcs.push(tr);
  }
  const lineTriggers = [];
  (def.special || []).forEach(key => {
    const a = Math.floor(A * 0.7), pc = pcol[a];
    const [x, y] = toXY(a, pc + 1);
    npcs.push(storyTrainer(key, x, y, dir === 'n' ? 'down' : 'left', PALS.rival, 3));
    const [lx, ly] = toXY(a - 1, 0);
    lineTriggers.push(dir === 'n' ? { y: ly, npc: npcs.length - 1 } : { x: lx, npc: npcs.length - 1 });
  });
  (def.items || []).forEach((it, i) => {
    const room = rooms[i % Math.max(1, rooms.length)];
    if (!room) return;
    const [a0, c0, w, h] = room;
    const a = a0 + Math.floor(h / 2), cc = c0 + Math.floor(w / 2);
    if (a >= A - 1) return;
    Gd[a][cc] = 'm';
    const [x, y] = toXY(a, cc);
    npcs.push({ kind: 'item', x, y, item: it, flag: `it:${id}:${i}` });
  });
  const t = newGrid(W, H, 'R');
  for (let a = 0; a < A; a++) for (let cc = 0; cc < C; cc++) { const [x, y] = toXY(a, cc); t[y][x] = Gd[a][cc]; }
  const map = { id, name: def.name, kind: 'cave', reg: def.reg, pal: def.pal || 'grotte', w: W, h: H, t, border: 'R', buildings: [], warps: [], npcs, signs: {}, gates: {}, guards: [], enc: def.enc, music: 'cave', outdoor: false, lineTriggers };
  map.gates[L.entr.side] = { p: ge, to: L.entr.to };
  map.gates[L.exit.side] = { p: gx, to: L.exit.to };
  return map;
}

// ---- Sanctuaires ----
function genSanctuary(id) {
  const ret = SPECIAL_RET[id] || null;
  if (!ret) { getMap(id === 'sanct_aube' ? 'r8' : 's7'); }
  const back = SPECIAL_RET[id];
  const isAube = id === 'sanct_aube';
  const W = 15, H = 18;
  const t = newGrid(W, H, 'T');
  for (let y = 1; y < H - 1; y++) for (let x = 3; x < W - 3; x++) t[y][x] = '.';
  for (let y = 1; y < H; y++) t[y][7] = 'q';
  for (let y = 1; y < 6; y++) for (let x = 4; x < 11; x++) t[y][x] = 'q';
  for (let y = 2; y < 5; y++) for (let x = 6; x < 9; x++) t[y][x] = 'a';
  for (let y = 7; y < H - 1; y++) { t[y][6] = 'T'; t[y][8] = 'T'; }
  for (const [x, y] of [[4, 2], [10, 2], [4, 5], [10, 5]]) t[y][x] = 'L';
  for (let y = 7; y < H - 1; y += 2) { t[y][4] = 'f'; t[y][10] = 'f'; }
  t[H - 1][7] = 'O';
  const map = { id, name: isAube ? 'Sanctuaire du Zénith' : 'Cœur de la Graine', kind: 'special', reg: isAube ? 'solvene' : 'brumaire', pal: isAube ? 'neige' : 'brumaire', w: W, h: H, t, border: 'T', buildings: [], warps: [], npcs: [], signs: {}, gates: {}, guards: [], enc: {}, music: 'sacred', outdoor: true, env: 'sacred' };
  map.warps.push({ x: 7, y: H - 1, to: back.map, tx: back.x, ty: back.y, dir: back.dir });
  if (isAube) {
    map.npcs.push(storyTrainer('somnis_aube1', 7, 12, 'down', PALS.grunt, 4));
    map.npcs.push(storyTrainer('somnis_oniris', 7, 10, 'down', PALS.oniris, 1));
    map.npcs.push(storyTrainer('somnis_aube2', 7, 7, 'down', PALS.nox, 1));
    map.npcs.push({ kind: 'legend', x: 7, y: 3, legend: 'auberis', cond: () => !G.flags.leg_auberis });
    map.npcs.push({ kind: 'legend', x: 5, y: 3, legend: 'aubere', cond: () => !!G.flags.ending && !G.flags.leg_aubere });
  } else {
    map.npcs.push(storyTrainer('somnis_nuit1', 7, 11, 'down', PALS.racine, 4));
    map.npcs.push(storyTrainer('somnis_nuit2', 7, 7, 'down', PALS.ronce, 3));
    map.guards.push({ cells: [[7, 15]], cond: () => petalCount() >= 6, text: "Des ronces épaisses ferment le chemin du Cœur. Elles ne s'ouvriront qu'aux six Pétales." });
    map.npcs.push({ kind: 'legend', x: 7, y: 3, legend: 'nocturnis', cond: () => !!G.flags.st_somnis_nuit2 && !G.flags.leg_nocturnis });
    map.npcs.push({ kind: 'legend', x: 9, y: 3, legend: 'nocturne', cond: () => !!G.flags.ending && !G.flags.leg_nocturne });
  }
  return map;
}

// ---- Sommet ----
function genSummit(id) {
  const W = 17, H = 26;
  const t = newGrid(W, H, 'V');
  for (let y = 0; y < H; y++) t[y][8] = 'q';
  t[H - 1][7] = 'q'; t[H - 2][7] = 'q'; t[H - 1][9] = 'q';
  for (let y = 1; y < 7; y++) for (let x = 4; x < 13; x++) t[y][x] = '.';
  for (let y = 2; y < 5; y++) for (let x = 7; x < 10; x++) t[y][x] = 'a';
  for (let y = 9; y < 13; y++) for (let x = 6; x < 11; x++) t[y][x] = '.';
  for (let y = 17; y < 22; y++) for (let x = 5; x < 12; x++) t[y][x] = '.';
  for (let y = 0; y < H; y++) t[y][8] = 'q';
  t[0][8] = 'V';
  for (const [x, y] of [[5, 2], [11, 2], [6, 18], [10, 18]]) t[y][x] = 'L';
  const map = { id, name: 'Mont Éveil', kind: 'special', reg: 'brumaire', pal: 'neige', w: W, h: H, t, border: 'V', buildings: [], warps: [], npcs: [], signs: {}, gates: { s: { p: 7, to: LINKS[id].entr.to } }, guards: [], enc: {}, music: 'sacred', outdoor: true, env: 'snow' };
  t[H - 1][7] = 'q'; t[H - 1][8] = 'q';
  map.guards.push({ cells: [[8, 23], [7, 23], [9, 23]], cond: () => !!G.flags.st_somnis_nuit2, text: "Des racines noires barrent le sentier. Tant que Maître Ronce tient le Cœur de la Graine, le sommet reste fermé." });
  map.npcs.push(storyTrainer('rival6', 8, 15, 'down', PALS.rival, 3));
  { const rf = storyTrainer('ronce_final', 8, 11, 'down', PALS.ronce, 2); rf.cond = () => !!G.flags.st_rival6; map.npcs.push(rf); }
  { const el = storyTrainer('elio', 8, 8, 'down', PALS.elio, 2); el.cond = () => !!G.flags.st_ronce_final; map.npcs.push(el); }
  map.npcs.push({ kind: 'npc', x: 10, y: 10, dir: 'left', pal: PALS.elio, cond: () => !!G.flags.st_elio, text: "Le dernier gardien t'attend devant l'autel. Il est rare qu'il se montre deux fois." });
  map.npcs.push({ kind: 'npc', x: 5, y: 4, dir: 'down', pal: PALS.elio, script: 'faille', speaker: 'Faille', cond: () => !!G.flags.rifts });
  map.npcs.push({ kind: 'legend', x: 8, y: 3, legend: 'eveillon', cond: () => !!G.flags.st_elio && !G.flags.leg_eveillon });
  return map;
}

// ---- Intérieurs ----
const INT_TPL = {
  center: { w: 11, h: 8, rows: ['wwwwwwwwwww', 'wwwwwwwwwww', 'ooocccccoCo', 'ooooooooooo', 'ooooooooooo', 'ooooooooooo', 'poooooooooo', 'ooooookoooo'], mat: [5, 7] },
  shop: { w: 11, h: 8, rows: ['wwwwwwwwwww', 'wwwwwwwwwww', 'cccoooBBBBo', 'ooooooooooo', 'ooBBooooBBo', 'ooooooooooo', 'ooooooooooo', 'ooooookoooo'], mat: [5, 7] },
  house: { w: 9, h: 7, rows: ['wwwwwwwww', 'wwwwwwwww', 'oBBoooopo', 'ooooooooo', 'ooottoooo', 'ooooooooo', 'ooookoooo'], mat: [4, 6] },
  home: { w: 9, h: 7, rows: ['wwwwwwwww', 'wwwwwwwww', 'oBBoooCpo', 'ooooooooo', 'ooottoooo', 'ooooooooo', 'ooookoooo'], mat: [4, 6] },
  lab: { w: 11, h: 10, rows: ['wwwwwwwwwww', 'wwwwwwwwwww', 'BBBoooooBBB', 'ooooooooooo', 'oooooottttoo'.slice(0, 11), 'ooooooooooo', 'oCooooooooC', 'ooooooooooo', 'poooooooooo', 'ooooookoooo'], mat: [5, 9] },
};
function genInterior(id, def) {
  const town = TOWNS[def.parent];
  const reg = town.reg;
  const kind = def.kind;
  let t, W, H, mat, pal = 'int', npcs = [], music = 'center', name = town.name;
  if (INT_TPL[kind]) {
    const tp = INT_TPL[kind]; W = tp.w; H = tp.h; t = tp.rows.map(r => r.split('')); mat = tp.mat;
  }
  if (kind === 'center') {
    name = 'Centre de Soin';
    npcs.push({ kind: 'npc', x: 5, y: 1, dir: 'down', pal: PALS.nurse, script: 'nurse' });
    npcs.push({ kind: 'npc', x: 2, y: 4, dir: 'right', pal: NPC_PALS[hashStr(id) % 10], text: pick(rng(hashStr(id)), HINTS[reg]), wander: 1 });
  } else if (kind === 'shop') {
    name = 'Boutique'; music = 'town1';
    npcs.push({ kind: 'npc', x: 1, y: 1, dir: 'down', pal: PALS.clerk, script: 'shop' });
    npcs.push({ kind: 'npc', x: 7, y: 5, dir: 'up', pal: NPC_PALS[(hashStr(id) + 3) % 10], text: pick(rng(hashStr(id) + 1), ["Je fais toujours le plein de Baumes avant de partir.", "Les Repousses éloignent les créatures plus faibles que ta première créature.", "Plus tu as de badges, plus la boutique propose d'articles !"]) });
  } else if (kind === 'house') {
    name = town.name; music = reg === 'brumaire' ? 'town2' : 'town1';
    const h = town.house || { text: "Bienvenue chez nous !" };
    npcs.push({ kind: 'npc', x: 6, y: 4, dir: 'left', pal: NPC_PALS[(hashStr(id) + 5) % 10], script: 'gift', data: { town: def.parent, h } });
    npcs.push({ kind: 'npc', x: 2, y: 5, dir: 'right', pal: NPC_PALS[(hashStr(id) + 7) % 10], text: pick(rng(hashStr(id) + 9), town.lines || ["Il fait bon vivre ici."]), wander: 1 });
  } else if (kind === 'home') {
    name = 'Maison'; music = 'town1';
    npcs.push({ kind: 'npc', x: 2, y: 4, dir: 'right', pal: PALS.mom, script: 'mom' });
  } else if (kind === 'lab') {
    name = 'Labo du Prof. Sauge'; music = 'town1';
    npcs.push({ kind: 'npc', x: 5, y: 2, dir: 'down', pal: PALS.prof, script: 'prof' });
    ['feuillon', 'brasille', 'clapotin'].forEach((sp, i) => npcs.push({ kind: 'ball', x: 6 + i, y: 4, script: 'starter', data: sp, cond: () => !G.flags.starter && !G.flags.rivalPick }));
    npcs.push({ kind: 'npc', x: 3, y: 5, dir: 'right', pal: PALS.rival, cond: () => !G.flags.st_rival1, text: () => `${G.rival} : Le prof m'a dit d'attendre que tu choisisses en premier. Allez, dépêche-toi !` });
    npcs.push({ kind: 'npc', x: 9, y: 7, dir: 'left', pal: NPC_PALS[8], text: "Je suis l'assistant du prof. Il étudie depuis des années pourquoi les créatures se réveillent toutes au même moment chaque matin." });
  } else if (kind === 'gym') {
    const gym = GYMS[town.gym];
    W = 11; H = 17; pal = 'gym:' + gym.type; music = 'route'; name = 'Arène de ' + town.name;
    t = newGrid(W, H, 'g');
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (y < 2 || x === 0 || x === W - 1) t[y][x] = 'w';
    mat = [5, H - 1]; t[H - 1][5] = 'k';
    for (const [x, y] of [[3, 15], [7, 15], [3, 3], [7, 3]]) t[y][x] = 'G';
    const R = rng(hashStr(id));
    const leader = { kind: 'trainer', x: 5, y: 2, dir: 'down', pal: { h: dhex(TC[gym.type], 0.4), s: '#f2c9a0', c: TC[gym.type], p: '#2a2a3a' }, gym: town.gym,
      trainer: { cls: 'leader', name: gym.leader, team: gym.team, intro: gym.intro, lose: gym.lose, sight: 0, flag: 'gym' + town.gym, money: 100, music: 'boss', leader: town.gym } };
    npcs.push(leader);
    const nTr = town.gym < 2 ? 2 : town.gym < 8 ? 3 : 4;
    const pos = [[2, 13, 'right'], [8, 10, 'left'], [2, 7, 'right'], [8, 5, 'left']];
    const pool = gym.team.map(e => e[0]);
    for (let k = 0; k < nTr; k++) {
      const [x, y, d] = pos[k];
      const lv = gym.team[0][1] - 3 + k;
      const team = [];
      const cnt = 1 + (k % 2) + (town.gym >= 8 ? 1 : 0);
      for (let j = 0; j < cnt; j++) { const sp = SP[pick(R, pool)]; let root = sp.id; while (SP[root].prev) root = SP[root].prev; team.push([evolveForLevel(root, lv), lv]); }
      const cls = k % 2 ? 'dresseuse' : 'dresseur';
      const tr = trainerNPC(R, cls, team);
      tr.x = x; tr.y = y; tr.dir = d; tr.trainer.sight = 6; tr.trainer.flag = `tr:${id}:${k}`;
      tr.trainer.intro = pick(R, [`Tu veux défier ${gym.leader} ? Passe d'abord par moi !`, `Le type ${TN[gym.type]}, c'est toute ma vie !`, `Ici, on s'entraîne au type ${TN[gym.type]} jour et nuit.`]);
      npcs.push(tr);
    }
    npcs.push({ kind: 'npc', x: 6, y: 14, dir: 'left', pal: NPC_PALS[4], text: () => G.badges[town.gym] ? `Bravo pour le ${gym.badge} ! Tu iras loin.` : `Conseil d'ami : ${gym.leader} utilise le type ${TN[gym.type]}${gym.prism ? ', mais pas seulement. Son équipe couvre toutes les faiblesses' : ''}. Les types ${strongAgainst(gym.type).map(x => TN[x]).join(', ')} sont efficaces.` });
  } else if (kind === 'league') {
    W = 11; H = 34; pal = 'gym:lumiere'; music = 'sacred'; name = 'Ligue des Quatre Terres';
    t = newGrid(W, H, 'w');
    for (let y = 2; y < H; y++) for (let x = 4; x <= 6; x++) t[y][x] = 'g';
    mat = [5, H - 1]; t[H - 1][5] = 'k';
    const rows = [28, 22, 16, 10];
    ['elite1', 'elite2', 'elite3', 'elite4'].forEach((k, i) => {
      const y = rows[i]; t[y][4] = 'G'; t[y][6] = 'G';
      npcs.push(storyTrainer(k, 5, y, 'down', NPC_PALS[(i * 3 + 1) % 10], 3));
    });
    t[4][4] = 'G'; t[4][6] = 'G';
    npcs.push(storyTrainer('champion', 5, 4, 'down', { h: '#e9c43a', s: '#f2c9a0', c: '#ffffff', p: '#2a3a8a', hat: '#2a3a8a' }, 2));
    npcs.push({ kind: 'npc', x: 4, y: 31, dir: 'right', pal: PALS.guard, text: "Une fois entré, tu ne pourras plus te soigner au Centre. Si tu perds, il faudra tout recommencer." });
  }
  const map = { id, name, kind: 'int', reg, pal, w: W, h: H, t, border: 'w', buildings: [], warps: [], npcs, signs: {}, gates: {}, guards: [], enc: {}, music, outdoor: false, env: 'indoor', parent: def.parent, sub: kind };
  const [dx, dy] = def.door;
  map.warps.push({ x: mat[0], y: mat[1], to: def.parent, tx: dx, ty: dy + 1, dir: 'down', exit: true });
  map.entry = [mat[0], mat[1] - 1];
  return map;
}
function interiorEntry(id) { const m = getMap(id); return m.entry; }

// ---------- Personnages des autres récits (Awakening, Quatre Terres) ----------
function vetTeam(type, lvl, n, seed) {
  const R = rng(hashStr(seed));
  const pool = DEX.filter(sp => SP[sp].types.includes(type) && !['L', 'M', 'P'].includes(SP[sp].stage) && !['feuillon', 'brasille', 'clapotin'].includes(sp));
  const t = [];
  for (let i = 0; i < n; i++) { const l = lvl - (n - 1 - i); t.push([evolveForLevel(pick(R, pool), l), l]); }
  return t;
}
const VETS = [
  { town: 't0', id: 'neo', name: 'Néo', type: 'vent', lvl: 56, n: 5, pal: { h: '#e06a2a', s: '#f6d0a8', c: '#3a3a48', p: '#2a2a36', style: 'spiky' }, cond: () => !!G.flags.champion1, intro: "Néo, de Bourg-Aurore. On jouait ensemble, petits, toi, Nova et moi. J'ai fait le tour des Quatre Terres pendant ton absence. Voyons ce que tu vaux !", lose: "Toujours aussi fort·e. Dis à Nova que je la salue." },
  { town: 't1', id: 'mira', name: 'Mira', type: 'flore', lvl: 18, n: 3, pal: { h: '#4a8a3a', s: '#f2c9a0', c: '#7ac45a', p: '#3a5a2a', style: 'long' }, intro: "Je suis Mira. J'ai tenu l'arène avant Sylve. Mes créatures parlent encore aux arbres.", lose: "La relève est assurée." },
  { town: 't1', id: 'pip', name: 'Pip', type: 'flore', lvl: 16, n: 3, pal: { h: '#e8c860', s: '#f6d0a8', c: '#90a820', p: '#3a3a5a', style: 'short' }, intro: "Salut ! Mes insectes sont petits, mais ils piquent fort !", lose: "Bzzz... Bien joué !" },
  { town: 't2', id: 'bastien', name: 'Bastien', type: 'roc', lvl: 22, n: 3, pal: { h: '#5a4030', s: '#c89070', c: '#a98557', p: '#4a3a2a', style: 'short' }, intro: "Bastien. La roche est patiente. Moi aussi.", lose: "Tu as fendu la pierre. Respect." },
  { town: 't2', id: 'sirocco', name: 'Sirocco', type: 'roc', lvl: 23, n: 3, pal: { h: '#2a1a10', s: '#b07850', c: '#e4cc95', p: '#8a6a40', style: 'wild' }, intro: "Les dunes avalent les imprudents. Avance avec prudence !", lose: "Le sable s'est retourné contre moi..." },
  { town: 't3', id: 'neree', name: 'Nérée', type: 'eau', lvl: 26, n: 3, pal: { h: '#1a4a8a', s: '#e0b088', c: '#4a8fe0', p: '#2a3a5a', style: 'long' }, intro: "Les courants ont englouti plus d'un dresseur. Pas moi.", lose: "Tu nages mieux que mes requins." },
  { town: 't4', id: 'ezra', name: 'Ezra', type: 'foudre', lvl: 30, n: 4, pal: { h: '#f2e14c', s: '#f2c9a0', c: '#2b3a6b', p: '#1a1a2a', style: 'spiky' }, intro: "Ezra, ancien champion de Voltaville. Même mon cœur tourne à l'électricité.", lose: "Court-circuit total. Comme au bon vieux temps." },
  { town: 't5', id: 'ignace', name: 'Ignace', type: 'feu', lvl: 34, n: 4, pal: { h: '#c0392b', s: '#e0b088', c: '#3a1a1a', p: '#2a1a1a', style: 'spiky' }, intro: "Ignace. Avant l'Éclipse, ce volcan était à moi. Montre-moi ta flamme.", lose: "Une flamme pareille, je n'en avais pas vu depuis longtemps." },
  { town: 't5', id: 'maia', name: 'Maïa', type: 'feu', lvl: 33, n: 3, pal: { h: '#f08a3a', s: '#c89070', c: '#ffd060', p: '#a04a2a', style: 'pony' }, intro: "Le soleil brûle plus fort qu'on ne croit !", lose: "Coucher de soleil sur mon équipe..." },
  { town: 't7', id: 'solveig', name: 'Solveig', type: 'givre', lvl: 42, n: 4, pal: { h: '#e8f4ff', s: '#f2c9a0', c: '#8fd8ea', p: '#3a5a7a', style: 'braid' }, intro: "Solveig. Le froid ralentit tout. Sauf mes créatures.", lose: "Tu as fait fondre ma glace." },
  { town: 't8', id: 'aela', name: 'Aéla', type: 'vent', lvl: 45, n: 4, pal: { h: '#f2c46a', s: '#f6d0a8', c: '#86b4e6', p: '#3a4a6a', style: 'pony' }, intro: "Le vent porte mes créatures. Sauras-tu les rattraper ?", lose: "Tu voles plus haut que moi !" },
  { town: 't8', id: 'boree', name: 'Borée', type: 'vent', lvl: 46, n: 4, pal: { h: '#c8c8d0', s: '#e0b088', c: '#4a6a8a', p: '#2a3a4a', style: 'wild', beard: 1 }, intro: "Le vent du nord ne connaît pas la pitié !", lose: "Tu as tenu face au blizzard." },
  { town: 't9', id: 'celestin', name: 'Célestin', type: 'dragon', lvl: 60, n: 6, pal: { h: '#f2c46a', s: '#f2c9a0', c: '#ffffff', p: '#2a3a8a', style: 'swept' }, cond: () => !!G.flags.champion1, intro: "Célestin, ancien Champion. J'ai perdu mon titre contre Astra. Elle dit que tu l'as battue. Prouve-le-moi.", lose: "Les Quatre Terres sont entre de bonnes mains." },
  { town: 'u0', id: 'ulric', name: 'Ulric', type: 'acier', lvl: 50, n: 4, pal: { h: '#3a3a3a', s: '#d8a880', c: '#94a3ad', p: '#3a3a4a', style: 'short', beard: 1 }, intro: "Je forge mes créatures comme des lames. Prêt·e à plier ?", lose: "Du bel ouvrage." },
  { town: 'u1', id: 'orane', name: 'Orane', type: 'acier', lvl: 53, n: 4, pal: { h: '#d6f6ff', s: '#f2c9a0', c: '#a8b8d8', p: '#4a5a7a', style: 'bob' }, intro: "Orane. Le cristal reflète toutes les couleurs. Montre-moi la tienne.", lose: "Ta lumière est sincère." },
  { town: 'u1', id: 'rivet', name: 'Admin Rivet', type: 'acier', lvl: 52, n: 4, pal: { h: '#e0e0f0', s: '#f2c9a0', c: '#5a2a6a', p: '#2a1a3a', style: 'short' }, once: 1, intro: "Rivet, ex-Admin de l'Éclipse. Nox est tombé, alors je sers l'Ordre Racine. Les mêmes lettres signées « R », depuis le début.", lose: "Ronce payait Nox. Il payait Oniris. Tu comprends ? On était tous ses pions." },
  { town: 'u2', id: 'vesna', name: 'Vesna', type: 'toxine', lvl: 55, n: 4, pal: { h: '#6a2a6a', s: '#e8c0a0', c: '#a35cc6', p: '#2a1a3a', style: 'long' }, intro: "Vesna. Les marais cachent leurs poisons. Moi, je les montre.", lose: "Tu as résisté à tout." },
  { town: 'u2', id: 'glacis', name: 'Admin Glacis', type: 'givre', lvl: 55, n: 4, pal: { h: '#e0e0f0', s: '#f2c9a0', c: '#5a2a6a', p: '#2a1a3a', style: 'swept' }, once: 1, intro: "Glacis. L'Éclipse est morte, vive la Racine. Maître Ronce voit loin. Bien plus loin que toi.", lose: "Il savait que tu viendrais ici. Il le sait toujours." },
  { town: 'u3', id: 'rafael', name: 'Rafaël', type: 'vent', lvl: 57, n: 4, pal: { h: '#2a1a10', s: '#c89070', c: '#86b4e6', p: '#2a3a5a', style: 'wild' }, intro: "Là-haut, le vent ne pardonne pas. Accroche-toi !", lose: "Tu as volé plus haut que moi." },
  { town: 'u3', id: 'rosalie', name: 'Rosalie', type: 'flore', lvl: 57, n: 4, pal: { h: '#f4a6c8', s: '#f6d0a8', c: '#ff8fb5', p: '#5a3a6a', style: 'bun' }, intro: "Mes papillons dansent, et ta défense s'effeuille.", lose: "Quelle grâce dans ta victoire." },
  { town: 'u4', id: 'shin', name: 'Shin', type: 'combat', lvl: 60, n: 4, pal: { h: '#1a1a1a', s: '#e8c0a0', c: '#e07a3a', p: '#8a2f1e', style: 'bald' }, intro: "Un combat est une méditation en mouvement.", lose: "Ta technique est pure." },
  { town: 'u5', id: 'kaede', name: 'Kaede', type: 'flore', lvl: 62, n: 4, pal: { h: '#a03020', s: '#f2c9a0', c: '#c8502e', p: '#3a2a1a', style: 'long' }, intro: "Les feuilles rouges tombent, mais l'arbre reste debout.", lose: "Ton esprit est calme et fort." },
  { town: 'u5', id: 'clarte', name: 'Clarté', type: 'lumiere', lvl: 62, n: 4, pal: { h: '#fff4c8', s: '#f6d0a8', c: '#f1d77a', p: '#c9a845', style: 'long' }, intro: "La première lumière du jour révèle les cœurs sincères.", lose: "Ton cœur brille." },
  { town: 'u6', id: 'clarisse', name: 'Clarisse', type: 'lumiere', lvl: 64, n: 5, pal: { h: '#f2c14e', s: '#f2c9a0', c: '#fff4d6', p: '#c9a845', style: 'bun' }, intro: "Chaque lanterne de Graineval porte un vœu. Le mien : un beau combat.", lose: "Ton vœu à toi s'est réalisé." },
  { town: 'u6', id: 'fanny', name: 'Fanny', type: 'normal', lvl: 63, n: 4, pal: { h: '#c88a3a', s: '#e0b088', c: '#e8d070', p: '#4a6a3a', style: 'pony' }, intro: "Ici, on travaille dur et on se bat dur !", lose: "Belle récolte pour toi aujourd'hui." },
  { town: 'u7', id: 'paulin', name: 'Paulin', type: 'normal', lvl: 66, n: 5, pal: { h: '#6a4a2a', s: '#f2c9a0', c: '#b9ad8f', p: '#4a4a4a', style: 'short' }, intro: "Normal ne veut pas dire faible.", lose: "Ah. Tu as tout compris." },
  { town: 'u7', id: 'kai', name: 'Kai', type: 'foudre', lvl: 66, n: 5, pal: { h: '#1a1a1a', s: '#b07850', c: '#e9c43a', p: '#2a4a6a', style: 'wild' }, intro: "Les orages des îles sont les plus beaux du monde. Et les plus violents !", lose: "Tu as détourné la foudre." },
  { town: 'u6', id: 'leo', name: 'Léo', type: 'vent', lvl: 60, n: 3, pal: { h: '#6b4a2b', s: '#f1c7a0', c: '#5cb85c', p: '#3a5a8a', hat: '#3a7bd5' }, intro: "Hé ! Nos regards se sont croisés : c'est un combat ! J'ai grandi, tu sais, depuis la Plaine d'Aurore.", lose: "Ouah... T'es trop fort·e. Je retourne m'entraîner dans les hautes herbes." },
  { town: 'u6', id: 'anna', name: 'Anna', type: 'flore', lvl: 63, n: 3, pal: { h: '#c0503a', s: '#e8b890', c: '#f2a0c0', p: '#5a3a6a', style: 'pony' }, intro: "Tu reviens des Îles Soleil ? Montre-moi ce que tu as appris !", lose: "Tu es devenu·e une légende, en fait." },
  { town: 'u8', id: 'pablo', name: 'Marin Pablo', type: 'eau', lvl: 66, n: 4, pal: { h: '#2a2a2a', s: '#c89070', c: '#f4f4f4', p: '#2b3a6b', hat: '#2b3a6b' }, intro: "Ahoy ! Avant la Germination, je naviguais ici. Maintenant, je me bats !", lose: "Tu as le pied marin, moussaillon." },
  { town: 'u2', id: 'ilka', name: 'Skieuse Ilka', type: 'givre', lvl: 55, n: 3, pal: { h: '#c0503a', s: '#e8b890', c: '#8fd8ea', p: '#5a3a6a', style: 'braid' }, intro: "Tu glisses sur la neige comme un pingouin. Combat !", lose: "Brrr... je me suis fait geler sur place." },
  { town: 'u5', id: 'aya', name: 'Pèlerine Aya', type: 'lumiere', lvl: 61, n: 3, pal: { h: '#1a1a1a', s: '#f1c7a0', c: '#e07a3a', p: '#8a2f1e', style: 'bun' }, intro: "Les lanternes du sanctuaire m'ont annoncé ta venue.", lose: "Ta flamme est sincère. Va en paix." },
  { town: 'u3', id: 'felix', name: 'Artiste Félix', type: 'vent', lvl: 57, n: 3, pal: { h: '#f2c14e', s: '#f1c7a0', c: '#8a5cf0', p: '#2a2238', hat: '#e5483a' }, intro: "Ne bouge pas ! Je peins ton portrait... après t'avoir battu·e !", lose: "Mon chef-d'œuvre... il s'appellera « Défaite en bleu »." },
  { town: 'u7', id: 'lani', name: 'Surfeuse Lani', type: 'eau', lvl: 65, n: 4, pal: { h: '#4a3020', s: '#d8a880', c: '#3cc0d0', p: '#f0dc9a', style: 'long' }, intro: "Belle vague aujourd'hui ! Parfaite pour un combat !", lose: "Wipe-out total. Bien joué !" },
  { town: 'u8', id: 'basalte', name: 'Basalte', type: 'roc', lvl: 68, n: 5, pal: { h: '#3a3a3a', s: '#a87050', c: '#5a4a46', p: '#2a2020', style: 'bald', beard: 1 }, intro: "Ma volonté est plus dure que la lave refroidie.", lose: "Tu m'as brisé. Proprement." },
];
const TOWN_NPCS = [
  { town: 'u6', name: 'Pr Ysée', pal: { h: '#9a9aaa', s: '#f1c7a0', c: '#f4f4f0', p: '#4a5a3a', style: 'bob' }, script: 'ysee' },
  { town: 'u0', name: 'Prof. Lierre', pal: { h: '#8a8a7a', s: '#f2c9a0', c: '#e8e2d0', p: '#4a5a3a', style: 'swept', glasses: 1 }, script: 'lierre' },
  { town: 'u6', name: 'Oniris', pal: { h: '#2a1a3a', s: '#e8c0a0', c: '#1a1424', p: '#3a2a4a', style: 'long' }, cond: () => !!G.flags.st_ronce_final, text: "Oniris : Je me lève chaque matin pour voir le soleil, maintenant. Ronce nous a tous utilisés. Toi, tu l'as arrêté. Merci." },
  { town: 't7', name: 'Nox', pal: { h: '#e8e8f8', s: '#e8c8a8', c: '#3a1e5a', p: '#1a1028' }, cond: () => !!G.flags.ending, text: "Nox : Je voulais un maître pour ce monde. J'en avais un, sans le savoir. Ça calme." },
];
LEGENDS.echo = { sp: 'aquoree', lvl: 92, flag: 'leg_echo', text: "La mer se dresse comme un mur. L'Écho de la Vague, la colère de l'océan, te barre la route !" };
TOWN_NPCS.push(
  { town: 'v2', name: 'Oniris', pal: { h: '#2a1a3a', s: '#e8c0a0', c: '#1a1424', p: '#3a2a4a', style: 'long' }, text: "Oniris : Dans ce monde, je n'ai jamais voulu endormir personne. Je veux juste réveiller ceux que Ronce a brisés. Tu es la première bonne nouvelle depuis dix ans." },
  { town: 'v1', name: 'Gardienne Maëlle', pal: { h: '#5cb85c', s: '#f2c9a0', c: '#3a2440', p: '#2a1f2e', style: 'long' }, text: "Gardienne Maëlle : Il tient ma fille dans le Trône. Si tu le bats... ne me regarde pas comme ça. Je sais ce que j'ai fait." },
  { town: 'x0', name: 'Liora', pal: { h: '#c8703a', s: '#f2c9a0', c: '#7ac0d0', p: '#4a5a6a', style: 'long' }, text: "Liora : Aurèle dit que la graine sous la mer est vivante. Moi, je dis que c'est lui qui est vivant quand il en parle. Tu restes dîner ?" },
  { town: 'x0', name: 'Elouan', pal: { h: '#c8703a', s: '#f2c9a0', c: '#e8c060', p: '#4a6a3a', style: 'short' }, text: "Elouan : Papa m'a promis qu'un jour, je verrai des créatures sortir de la graine ! Tu crois que c'est vrai ?" },
  { town: 'x1', name: 'Petite Nova', pal: { h: '#2a5fd0', s: '#e8b890', c: '#e8455e', p: '#3a3a48', style: 'long' }, text: "Petite Nova : Je m'appelle Nova ! Mon frère dit que je suis trop petite pour avoir un Éclo. C'est quoi, un Éclo ? ... Tu as l'air triste, madame. Ou monsieur." },
  { town: 'x1', name: 'Petit Ilan', pal: { h: '#2a5fd0', s: '#e8b890', c: '#3a5a8a', p: '#2a2a3a', style: 'wild' }, text: "Petit Ilan : Quand je serai grand, je protégerai ma sœur. Toujours. C'est promis." },
  { town: 'x1', name: 'Maren', pal: { h: '#2a5fd0', s: '#e8b890', c: '#f0e0b0', p: '#4a4a6a', style: 'bun' }, text: "Maren : Tu connais mes enfants ? Tu les regardes comme si tu les avais déjà vus grandir." },
  { town: 'x2', name: 'Jeune Lierre', pal: { h: '#6a5a3a', s: '#f2c9a0', c: '#e8e2d0', p: '#4a5a3a', style: 'short', glasses: 1 }, text: "Jeune Lierre : Aurèle pense que la graine va germer. Sauge pense qu'il faut prévenir les îles. Moi, je pense qu'il faut finir ce thé." },
  { town: 'u0', name: 'Ronce', pal: { h: '#e8e8f0', s: '#c8a080', c: '#5a4a3a', p: '#2a2a2a', style: 'long', beard: 1 }, cond: () => !!G.flags.avantDone, text: "Ronce : Une voyageuse m'avait prévenu, cette nuit-là. Je ne l'ai pas crue. Je plante un arbre pour chaque jour où je ne l'ai pas crue." },
);
const POST_LEGENDS = [
  ['aquoree', 'u7', "Une aura légendaire monte du lagon... Aquorée se dresse devant toi !"],
  ['volcanis', 'u8', "La terre tremble. Volcanis surgit du cratère !"],
  ['givrael', 't7', "Le blizzard se fige. Givraël apparaît dans la neige !"],
  ['tonnorage', 't4', "Le ciel gronde au-dessus de Voltaville. Tonnorage descend de l'orage !"],
  ['aubere', 'sanct_aube', "Le soleil se lève sur l'autel. Aubéris, le gardien de l'aube des vieilles légendes, apparaît !"],
  ['nocturne', 'sanct_nuit', "La nuit tombe d'un coup sur le Cœur. Nocturnis, le gardien de la nuit, se dresse !"],
];
POST_LEGENDS.forEach(([sp, , text]) => { LEGENDS[sp] = { sp, lvl: 75, flag: 'leg_' + sp, text }; });
function townExtras(id, map, spots, R) {
  const take = () => spots.splice(Math.floor(R() * spots.length), 1)[0];
  const at = (k, pal, dx, dy, sight) => { const n = storyTrainer(k, 13 + (dx || 0), 13 + (dy || 0), 'down', pal, sight || 2); map.npcs.push(n); return n; };
  const gateOut = (cond, text) => { const L = LINKS[id]; if (!L || !L.exit) return; const s = L.exit.side; const cells = s === 'n' ? [[13, 1], [14, 1]] : s === 's' ? [[13, 20], [14, 20]] : s === 'w' ? [[1, 10], [1, 11]] : [[26, 10], [26, 11]]; map.guards.push({ cells, cond, text }); };
  if (id === 'v1') { at('m_nova', PALS.lame, 0, -9); gateOut(() => !!G.flags.st_m_nova, "La Lame Bleue garde la sortie nord. Personne ne passe sans l'affronter."); }
  if (id === 'v2') { const n = storyTrainer('m_nox', 24, 11, 'right', PALS.nox, 2); map.npcs.push(n); gateOut(() => !!G.flags.st_m_nox, "Le Général Nox garde la route du Trône."); }
  if (id === 'v3') { at('m_ilan', PALS.epine, 0, -1); const rr = at('roi_ronce', PALS.ronce, 0, -4, 1); rr.cond = () => !!G.flags.st_m_ilan; }
  if (id === 'x0') { const a = storyTrainer('a_aurele', 16, 13, 'down', PALS.aurele, 0); map.npcs.push(a); gateOut(() => !!G.flags.st_a_aurele, "Aurèle t'interpelle avant que tu partes : « Hé, l'étranger·e ! Pas sans un combat ! »"); }
  if (id === 'x2') { const a = storyTrainer('a_trio', 16, 13, 'down', PALS.prof, 0); map.npcs.push(a); gateOut(() => !!G.flags.st_a_trio, "Le jeune Sauge te barre la route : « Avant d'aller au Gouffre, j'ai des questions. »"); }
  if (id === 'x3') { const s = take(); if (s) map.npcs.push({ kind: 'legend', x: 13, y: 6, legend: 'echo', cond: () => !G.flags.leg_echo }); }
  if (id === 'v0' || id === 'x0') { const s = take(); if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: PALS.elio, script: 'failleRetour', speaker: 'Faille' }); }
  for (const v of VETS.filter(v => v.town === id)) {
    const s = take(); if (!s) continue;
    const tr = { cls: 'veteran', name: v.name, team: vetTeam(v.type, v.lvl, v.n, v.id), intro: v.intro, lose: v.lose, after: v.lose, flag: 'vet_' + v.id, money: 60, sight: 0 };
    if (v.once) tr.hideAfter = 1;
    map.npcs.push({ kind: 'trainer', x: s[0], y: s[1], dir: 'down', pal: v.pal, trainer: tr, cond: v.cond });
  }
  for (const n of TOWN_NPCS.filter(n => n.town === id)) {
    const s = take(); if (!s) continue;
    map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: n.pal, text: n.text, script: n.script, cond: n.cond, speaker: n.name });
  }
  for (const [sp, town] of POST_LEGENDS) if (town === id) {
    const s = take(); if (!s) continue;
    map.npcs.push({ kind: 'legend', x: s[0], y: s[1], legend: sp, cond: () => !!G.flags.ending && !G.flags['leg_' + sp] });
  }
}
// ---------- Créatures des Quatre Terres dans les routes ----------
(function () {
  const BASES = ['feuillonq', 'braisette', 'ondelin', 'piouli', 'chenillou', 'mousseau', 'lucioli', 'terrier', 'crabulle', 'mouettine', 'braisillon', 'coralin', 'meduzen', 'palmio', 'volticot', 'sablard', 'spectrolle', 'givrinou', 'combattor', 'yetiou', 'aiglace', 'corapince', 'grillou', 'pommelet', 'lapissou', 'fourmiton', 'hiboulin', 'treflet', 'bourdonix', 'coquelime', 'mulotte', 'brindille', 'pucerin', 'noisetou', 'gyrinou', 'crevetin', 'bigornot', 'meduline', 'lezardune', 'pelicot', 'tortulave', 'algueline', 'sablotin', 'hippocorne', 'fumerolle', 'nacrelle', 'vesperou', 'oursinou', 'fossilou', 'vissou', 'cablino', 'dardune', 'rouillot', 'cactillon', 'ampoulon', 'vautourne', 'gecklair', 'chacalune', 'pistonne', 'scarabol', 'dynamouse', 'ferraillon', 'morsegel', 'chamoisette', 'floconnet', 'rapacime', 'yakouni', 'cristallon', 'bonzou', 'avalanchon', 'pingouille', 'glaconnet', 'oursonge', 'herminou', 'aurorien', 'phoquet', 'mammouton', 'lichenou', 'lynxor', 'nordvol', 'sapinou', 'carpeclat', 'gruelune', 'bambouton', 'origamine', 'encensou', 'lampionet', 'ombrelame', 'sylvecho', 'gongou', 'lotusine', 'pianotin', 'rosette', 'pinceline', 'gemmouche', 'cygnebene', 'libelluna', 'masquelin', 'parfumette', 'fontainou', 'tortulagon', 'perrocolor', 'squalou', 'hibiscune', 'raiellume', 'toteclat', 'iguaflamme', 'mangrovin', 'tambouri', 'poulpinet', 'moutonuage', 'epillon', 'coqueret', 'rainelune', 'abeillor', 'epouvantrou', 'gerbillon', 'tournesoleil', 'moulinou', 'basaltin', 'obsidiane', 'soufrelin', 'murenoire', 'cendrabeille', 'volcanuche', 'krakelin', 'lavachon'];
  const order = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9'];
  BASES.forEach((sp, i) => {
    if (!SP[sp]) return;
    const r = ROUTES[order[i % order.length]];
    const e = r.enc.grass || r.enc.cave; if (!e) return;
    const lo = Math.min(...e.map(x => x[1])), hi = Math.max(...e.map(x => x[2]));
    e.push([evolveForLevel(sp, hi), lo, hi, 7]);
  });
})();
