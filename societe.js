'use strict';
/* ============================================================
   ÉCLOSIA — Un monde qui vit comme le nôtre
   Histoire et formation de chaque région, influences entre voisins,
   communautés, immigration, discriminations, problèmes de société,
   géopolitique entre les deux continents, partis et opinions.
   Mécaniques : réputation par communauté, laissez-passer au ferry,
   élections dont le résultat change le monde. Chaque débat est
   montré avec ses différents points de vue ; « Dans notre monde »
   relie le jeu à des faits réels, sourcés.
   ============================================================ */

/* ---------- Communautés et réputation ---------- */
const COMMU = {
  qt: { n: 'Quatre-Terriens', d: "Les habitants du vieux continent. Fiers de mille ans d'histoire, inquiets de voir leurs jeunes partir vers Éclosia." },
  ec: { n: 'Éclosiens', d: "Ceux qui vivent sur le jeune continent : pionniers arrivés en premier, travailleurs venus ensuite, enfants nés là-bas." },
  il: { n: 'Îliens', d: "Les rescapés des Six Îles, engloutis par la vague de la Germination. Ils ont tout perdu en une nuit et vivent depuis dix ans entre deux continents." },
};
function repOf(k) { const r = (G.flags.rep = G.flags.rep || {}); return r[k] || 0; }
function repAdd(k, v) {
  const r = (G.flags.rep = G.flags.rep || {}); r[k] = Math.max(-10, Math.min(10, (r[k] || 0) + v));
  if (typeof toast === 'function') toast(`${COMMU[k].n} : réputation ${v > 0 ? '+' : ''}${v}`);
}
function repLabel(v) { return v >= 8 ? 'Admiré·e' : v >= 4 ? 'Apprécié·e' : v >= 1 ? 'Bien vu·e' : v <= -6 ? 'Rejeté·e' : v <= -2 ? 'Mal vu·e' : 'Inconnu·e'; }
const CONT_A = new Set(['solvene', 'qt0', 'qt1', 'qt2', 'qt3', 'echos']);
function contOf(id) { const r = REGION_OF[String(id || '').split('~')[0]] || (RT.map && RT.map.reg); return CONT_A.has(r) ? 'A' : 'B'; }
function hereCont() { const m = RT.map; return m ? contOf(m.kind === 'int' ? m.parent : m.id) : 'A'; }

/* ---------- Histoire, formation, influences, enjeux de chaque région ---------- */
const REGION_INFO = {
  solvene: { peuple: 'qt',
    geo: "Un vieux continent. Il y a mille ans, il formait avec Éclosia-sous-la-mer un seul bloc, Unaë. Quand Zénithar l'a fendu pour arrêter la guerre, les failles ont dessiné des fjords au nord, une botte au sud-est et le grand golfe de l'ouest.",
    hist: ["Après la fracture, quatre royaumes sont nés sur les quatre terres. Ils se sont fait la guerre pendant trois siècles, puis ont signé la Paix du Zénith et fondé la Ligue : depuis, on règle les conflits par des combats d'Éclos plutôt que par les armes.", "Il y a dix ans, la vague de la Germination a frappé les côtes. Port-Corail a été reconstruit, et le Conseil des Quatre Terres s'est installé à la Tour du Zénith."],
    infl: ["Exporte vers Éclosia ses Sphères, ses champions et ses lois : le règlement des arènes d'Éclosia est copié sur celui de la Ligue.", "Reçoit d'Éclosia de la sève, du bois d'érable et une jeunesse qui revient avec de nouvelles idées."],
    enjeux: ["Les villages se vident : les jeunes partent travailler à Éclosia.", "Le Conseil hésite entre fermer le ferry pour garder ses habitants et l'ouvrir pour commercer."] },
  qt0: { peuple: 'qt',
    geo: "Une terre basse et fertile, faite des alluvions que les rivières de Givrecime charrient depuis des millénaires.",
    hist: ["Le grenier des Quatre Terres. Les vergers de Verdeval ont nourri les quatre royaumes, même pendant les guerres.", "Les fermes familiales sont rachetées une à une par des coopératives de Voltaville."],
    infl: ["Nourrit Ferrhaven et Azurie ; dépend de l'eau des glaciers de Givrecime.", "Ses chansons de moisson se chantent jusque dans la Plaine de l'Aube, à Éclosia."],
    enjeux: ["L'exode rural : il reste surtout des anciens dans les hameaux.", "Les saisonniers îliens font les récoltes, sans toujours avoir de contrat."] },
  qt1: { peuple: 'qt',
    geo: "Une côte découpée de golfes et de presqu'îles, née de l'effondrement du bord du continent lors de la fracture.",
    hist: ["Peuple de marins et de marchands. Les ports d'Azurie ont relié les quatre royaumes quand les routes étaient coupées.", "Port-Corail a été le premier port touché par la vague. C'est aussi là que sont arrivés les premiers bateaux de rescapés îliens."],
    infl: ["Sa cuisine de la mer s'est répandue jusqu'aux Îles Soleil.", "Subit la pollution des usines de Ferrhaven, que les courants ramènent sur ses plages."],
    enjeux: ["Faut-il rouvrir les quais aux bateaux de rescapés, ou les dérouter vers Éclosia ?", "Les pêcheurs accusent Ferrhaven de tuer les poissons."] },
  qt2: { peuple: 'qt',
    geo: "Une chaîne de montagnes née de la collision des terres lors de la fracture : les roches ont été poussées vers le ciel, et les glaciers s'y sont installés.",
    hist: ["Montagnards et dresseurs de dragons, longtemps restés à l'écart. La Tour du Zénith a été bâtie sur ses sommets pour être loin des querelles des plaines.", "Le Sanctuaire du Zénith garde, dit-on, la mémoire de la fracture."],
    infl: ["Ses glaciers alimentent les rivières de Verdeval : sans eux, pas de récoltes.", "Ses dresseurs de dragons forment les meilleurs champions de la Ligue."],
    enjeux: ["Les glaciers reculent un peu plus chaque été.", "Les montagnards se sentent moqués par les gens des plaines, qui les trouvent rustres."] },
  qt3: { peuple: 'qt',
    geo: "Un plateau sec, riche en fer et en charbon : l'ancien fond d'une mer intérieure, asséchée après la fracture.",
    hist: ["Il y a un siècle, les premières usines de Ferrhaven ont transformé des villages en villes-usines. C'est l'âge du fer des Quatre Terres.", "Les syndicats d'ouvriers y sont nés, après de longues grèves."],
    infl: ["Fournit l'acier de tout le continent et les Sphères de la Ligue.", "Ses fumées et ses rejets touchent Azurie ; son modèle d'usine a été exporté à Ferrance, à Éclosia."],
    enjeux: ["Les emplois contre la pollution : fermer une usine, c'est mettre une ville au chômage.", "Les ouvriers îliens sont payés moins que les autres pour le même travail."] },
  echos: { peuple: 'qt', geo: "Une grotte creusée par l'eau de fonte de Givrecime.", hist: ["Lieu de pèlerinage. On y vient entendre la voix de son enfance."], infl: ["Les ermites de la grotte inspirent les poètes des Quatre Terres."], enjeux: ["Trop de visiteurs abîment les parois."] },
  brumaire: { peuple: 'ec',
    geo: "Un continent tout jeune. Il y a dix ans, la Graine-Monde a germé au fond de la mer et soulevé le plancher océanique : en une nuit, des montagnes, des plaines et des lacs sont sortis des eaux. Les géologues le comparent aux îles volcaniques qui naissent dans notre monde, mais en mille fois plus grand.",
    hist: ["Les premiers à s'y installer ont été des pionniers venus des Quatre Terres, puis des rescapés îliens, puis des travailleurs attirés par les forges et les chantiers.", "En dix ans, Port-Sève est passé d'un ponton à une ville. L'Assemblée d'Éclosia siège à Valmont."],
    infl: ["Attire les jeunes des Quatre Terres : son économie grandit vite.", "Ses idées neuves (égalité des Éclos, assemblées ouvertes) reviennent influencer le vieux continent."],
    enjeux: ["Qui est « d'ici » sur une terre qui n'existait pas il y a dix ans ?", "Le logement manque : les villes grandissent plus vite que les maisons."] },
  qt4: { peuple: 'ec',
    geo: "Une ancienne île glaciaire, soudée au continent par la Germination. Son sol gelé en permanence commence à dégeler.",
    hist: ["Avant la Germination, quelques chasseurs vivaient là sous les aurores. Ils ont vu le continent se souder à leur île en une nuit.", "Frimabri est devenue une ville de chercheurs autour de la Professeure Ysée."],
    infl: ["Ses chercheurs partagent leurs études avec Givrecime, de l'autre côté de la mer.", "La fonte de ses glaces fait monter le niveau des lacs de la Plaine de l'Aube."],
    enjeux: ["Les anciens chasseurs sont devenus minoritaires sur leur propre île.", "Le dégel fait s'effondrer des maisons."] },
  qt5: { peuple: 'ec',
    geo: "Une guirlande d'îles et de presqu'îles volcaniques, née des cheminées de sève de la Graine.",
    hist: ["Des moines venus des Quatre Terres y ont bâti des temples dès la deuxième année. Ils disent que les érables ont rougi pour pleurer les disparus.", "L'Ordre Racine a occupé le sanctuaire, avant d'en être chassé."],
    infl: ["Ses temples, ses jardins et ses lanternes ont inspiré l'architecture de Valmont.", "Sa sève alimente les lanternes de Graineval et les distilleries."],
    enjeux: ["Trop de touristes dans les temples.", "Faut-il exploiter la sève, ou la protéger comme un lieu sacré ?"] },
  qt6: { peuple: 'ec',
    geo: "Une longue chaîne de montagnes : la Graine, en sortant de l'eau, a plissé le plancher océanique comme une nappe qu'on pousse.",
    hist: ["Les familles les plus riches des Quatre Terres s'y sont installées, attirées par la vue et l'air pur. Valmont est devenue la capitale de l'art et de la politique d'Éclosia.", "Combrecœur, elle, est née d'un camp de mineurs et en garde l'esprit combatif."],
    infl: ["Ses écoles d'art imitent les temples des Érables ; ses banques financent les chantiers de tout le continent.", "Son eau descend vers la Plaine de l'Aube."],
    enjeux: ["L'écart entre les villas de Valmont et les cités ouvrières de Combrecœur.", "On y loue des maisons à des prix que personne d'autre ne peut payer."] },
  qt7: { peuple: 'ec',
    geo: "Des îles de basalte nées des volcans de la Graine, encore en pleine formation : chaque éruption agrandit l'archipel.",
    hist: ["Des familles de pêcheurs s'y sont installées malgré le danger. Cendrine a été reconstruite trois fois.", "Un mouvement réclame l'autonomie de l'archipel, qui se sent oublié par l'Assemblée de Valmont."],
    infl: ["Ses minerais volcaniques alimentent les forges de Ferrance.", "Ses habitants déplacés par les éruptions partent vers la Plaine de l'Aube."],
    enjeux: ["Les déplacés des éruptions : où les reloger ?", "L'Ordre Racine fouille les cratères, et l'Assemblée tarde à réagir."] },
  qt8: { peuple: 'ec',
    geo: "Une immense plaine faite de cendres volcaniques fertiles, où la Graine a fait pousser les premières herbes d'Éclosia.",
    hist: ["Les premiers fermiers venaient de Verdeval. Ils ont apporté leurs semences, leurs moulins et leurs chansons.", "Au nord, la clairière du Cœur de la Graine est un lieu sacré, et un sujet de dispute."],
    infl: ["Nourrit tout Éclosia ; garde des liens de famille avec Verdeval.", "Accueille les déplacés de l'Archipel Braise, et les tensions qui vont avec."],
    enjeux: ["Les nouveaux arrivants de l'archipel cherchent des terres que les fermiers ne veulent pas céder.", "Faut-il exploiter l'énergie du Cœur de la Graine ?"] },
  qt9: { peuple: 'il',
    geo: "Des îles coralliennes sur les pentes de volcans éteints : les plus anciennes terres d'Éclosia, déjà là avant la Germination, mais agrandies par elle.",
    hist: ["Ici vivaient déjà des Îliens, cousins de ceux des Six Îles. Ils ont accueilli les rescapés de la vague, puis vu arriver les touristes.", "Le surf et le tourisme font vivre les villages, mais les terrains au bord de l'eau se vendent aux gens de Valmont."],
    infl: ["Sa musique et sa cuisine ont conquis les deux continents.", "Ses récifs protègent la côte sud d'Éclosia des tempêtes."],
    enjeux: ["Les habitants n'ont plus les moyens de vivre au bord de leur propre mer.", "La montée des eaux menace les îles les plus basses."] },
  racines: { peuple: 'ec', geo: "Le réseau de racines de la Graine, sous le continent.", hist: ["Seuls quelques chercheurs et l'Ordre Racine y sont descendus."], infl: ["Ses racines tiennent tout Éclosia : si elles bougent, la terre tremble."], enjeux: ["Doit-on les étudier, les exploiter ou les laisser en paix ?"] },
  tour: { peuple: 'ec', geo: "Une tour plus ancienne que le continent, remontée avec lui du fond de la mer.", hist: ["Elio, le premier dresseur, y aurait gardé le temps pendant mille ans."], infl: ["Les deux continents la revendiquent comme patrimoine."], enjeux: ["À qui appartient un monument plus vieux que les pays qui se le disputent ?"] },
  ruine: { peuple: 'il', geo: "Une île engloutie à moitié par la vague.", hist: ["Nacre, l'île d'Aurèle, était la plus peuplée des Six Îles. Personne n'y vit plus."], infl: ["Ses rescapés vivent aujourd'hui dans les deux continents."], enjeux: ["Les deux continents revendiquent l'île et les éclats de Graine qu'elle contient. Les Îliens demandent qu'on leur rende."] },
};

/* ---------- Partis politiques ---------- */
const PARTIES = {
  A: [
    { k: 'racines', n: 'Les Racines Anciennes', col: '#8a5a3a', idee: "Protéger les traditions et les emplois des Quatre-Terriens, limiter les arrivées par le ferry.", pour: "« On ne peut pas accueillir tout le monde sans moyens. D'abord nos villages, nos écoles, nos anciens. »", contre: "Leurs adversaires leur reprochent de désigner les Îliens comme responsables de problèmes qui ont d'autres causes." },
    { k: 'ateliers', n: 'Le Front des Ateliers', col: '#c8503a', idee: "Augmenter les salaires, construire des logements publics, donner les mêmes droits aux travailleurs îliens.", pour: "« Un ouvrier est un ouvrier, d'où qu'il vienne. Si on paie moins les Îliens, c'est tout le monde qu'on paie moins. »", contre: "Leurs adversaires disent que leurs promesses coûtent trop cher et feraient fuir les usines." },
    { k: 'verte', n: "L'Alliance Verte", col: '#3a9a5a', idee: "Réduire la pollution de Ferrhaven, protéger les glaciers et les Éclos sauvages.", pour: "« Sans glaciers, plus d'eau. Sans eau, plus de récoltes. L'économie dépend de la nature. »", contre: "Leurs adversaires les accusent de menacer des milliers d'emplois dans les usines." },
    { k: 'large', n: "L'Union du Large", col: '#3a7ac8', idee: "Ouvrir le ferry, baisser les taxes, commercer librement avec Éclosia.", pour: "« Le commerce enrichit les deux rives. Fermer le ferry, c'est s'appauvrir. »", contre: "Leurs adversaires disent que le libre-échange profite surtout aux grandes compagnies de Port-Corail." },
  ],
  B: [
    { k: 'pionniers', n: 'Les Pionniers', col: '#d8a03a', idee: "Construire vite : routes, villes, usines. Faire d'Éclosia une puissance.", pour: "« Il y a dix ans, ici, il n'y avait que la mer. Regardez ce qu'on a bâti. Continuons. »", contre: "Leurs adversaires disent qu'ils bâtissent trop vite, sans logements abordables ni respect de la nature." },
    { k: 'natifs', n: 'Les Natifs de la Graine', col: '#8a4a6a', idee: "Réserver les terres et les emplois à ceux qui sont arrivés en premier, contrôler strictement le ferry.", pour: "« Nous avons défriché cette terre les premiers. Nous voulons garder ce que nous avons construit. »", contre: "Leurs adversaires rappellent qu'aucun Éclosien n'est « né ici » depuis plus de dix ans, et qu'ils divisent des voisins." },
    { k: 'commune', n: 'La Maison Commune', col: '#c8503a', idee: "Accueillir les rescapés et les déplacés, les mêmes droits pour tous les habitants, des loyers encadrés.", pour: "« Nous sommes tous arrivés ici un jour. Éclosia est une terre d'arrivants. »", contre: "Leurs adversaires disent qu'ils ignorent les tensions réelles et le manque de place." },
    { k: 'gardiens', n: 'Les Gardiens de la Graine', col: '#3a9a5a', idee: "Protéger le Cœur de la Graine, interdire son exploitation, limiter les chantiers.", pour: "« La Graine nous a tout donné. Si on l'épuise, le continent retournera sous la mer. »", contre: "Leurs adversaires leur reprochent de freiner l'économie au nom de croyances." },
  ],
};
const GOV_NAME = { A: 'Conseil des Quatre Terres', B: "Assemblée d'Éclosia" };
const GOV_SEAT = { A: 'la Tour du Zénith', B: 'Valmont' };
function govOf(c) { const e = (G.flags.elec = G.flags.elec || {}); e.gov = e.gov || { A: 'large', B: 'pionniers' }; return e.gov[c]; }
function partyOf(c, k) { return PARTIES[c].find(p => p.k === k); }

/* ---------- Géopolitique ---------- */
const GEOPOL = [
  { t: 'Le statut de Nacre', x: "Les deux continents revendiquent l'île en ruine et les éclats de Graine qu'elle contient.", v: ["Le Conseil des Quatre Terres : l'île dépendait de Port-Corail avant la vague.", "L'Assemblée d'Éclosia : l'île touche désormais nos eaux.", "Les Îliens : c'est notre île, et nos morts y reposent. Personne ne nous a demandé notre avis."] },
  { t: 'La guerre des tarifs du ferry', x: "Chaque continent taxe les marchandises de l'autre. Les prix montent des deux côtés.", v: ["Les uns veulent protéger leurs producteurs.", "Les autres répondent que les taxes punissent d'abord les familles qui achètent."] },
  { t: "L'autonomie de l'Archipel Braise", x: "Un mouvement réclame que l'archipel gère seul ses volcans et ses minerais.", v: ["Les autonomistes : Valmont décide sans jamais venir voir nos éruptions.", "Les opposants : un archipel seul n'aura pas les moyens de faire face à une catastrophe."] },
  { t: 'Les fumées de Ferrhaven', x: "La pollution de Ferrhaven descend sur les plages d'Azurie. Les deux terres s'accusent au Conseil.", v: ["Azurie : nos pêcheurs paient pour vos usines.", "Ferrhaven : nos usines font vivre tout le continent, Azurie comprise."] },
  { t: "L'eau des glaciers", x: "Givrecime veut construire des barrages ; Verdeval craint de manquer d'eau.", v: ["Givrecime : c'est notre eau, et nous avons besoin d'énergie.", "Verdeval : l'eau descend chez nous depuis toujours, elle appartient à tout le monde."] },
  { t: "L'énergie de la Graine", x: "Le Cœur de la Graine pourrait éclairer les deux continents pendant des siècles. Ou les détruire.", v: ["Les Pionniers et l'Union du Large y voient la fin des pénuries.", "Les Gardiens et l'Alliance Verte y voient un danger mortel.", "L'Ordre Racine veut s'en emparer seul."] },
  { t: 'Les Ordres', x: "L'Ordre Éclipse dans les Quatre Terres et l'Ordre Racine à Éclosia recrutent parmi les gens qui se sentent abandonnés.", v: ["Pour certains, ils répondent par la violence à de vraies injustices.", "Pour d'autres, ils exploitent la colère pour prendre le pouvoir."] },
];

/* ---------- Société ---------- */
const SOCIETY = [
  { t: 'Immigration et rescapés', x: "Depuis la vague, des milliers d'Îliens vivent entre les deux continents. Des Quatre-Terriens partent chaque année vers Éclosia, et des déplacés de l'Archipel Braise arrivent dans la Plaine de l'Aube. Les uns parlent de solidarité, les autres de manque de place et de travail." },
  { t: 'Discriminations', x: "Les Îliens sont souvent moins payés et moins bien logés. On se moque de l'accent des montagnards de Givrecime, et certains se méfient des dresseurs d'Éclos de type Ombre. Plusieurs habitants le vivent au quotidien ; d'autres essaient de le combattre." },
  { t: 'Logement', x: "Les villes grandissent vite, mais les loyers montent plus vite encore. À Valmont et aux Îles Soleil, les habitants n'ont plus les moyens de vivre dans leur propre quartier." },
  { t: 'Travail et usines', x: "Les usines donnent du travail et polluent. Les Éclos qui travaillent aux côtés des ouvriers font craindre des suppressions d'emplois." },
  { t: 'Climat et déplacés', x: "Les glaciers de Givrecime reculent, la toundra dégèle, les volcans de l'archipel chassent des familles entières. Ces changements poussent des gens à partir." },
  { t: 'Inégalités', x: "Les villas de Valmont et les quartiers de Port-Rouille ne vivent pas dans le même monde. Les uns parlent de réussite méritée, les autres d'injustice héritée." },
];

/* ---------- Dans notre monde (faits réels, sourcés) ---------- */
const REAL_WORLD = [
  { t: 'Les migrations', x: "Selon l'ONU (Département des affaires économiques et sociales), il y avait 304 millions de migrants internationaux en 2024, soit environ 3,7 % de la population mondiale. Leur nombre a presque doublé depuis 1990.", s: "ONU DESA, International Migrant Stock 2024" },
  { t: 'Les réfugiés et déplacés', x: "Selon le HCR, 117,8 millions de personnes étaient déplacées de force dans le monde fin 2025, dont 41,6 millions de réfugiés. La plupart restent dans leur propre pays ou dans un pays voisin.", s: 'HCR, Global Trends 2025' },
  { t: 'Le climat et les déplacements', x: "En 2024, les catastrophes ont provoqué 45,8 millions de déplacements à l'intérieur des pays, un record depuis 2008. Presque tous étaient liés à des phénomènes météorologiques.", s: "IDMC, Rapport mondial sur les déplacements internes 2025" },
  { t: 'Le droit face au racisme', x: "La Déclaration universelle des droits de l'homme (1948) reconnaît le droit de quitter tout pays et de chercher asile ailleurs. En 1965, l'ONU a adopté une convention internationale contre toutes les formes de discrimination raciale.", s: 'ONU' },
  { t: "Le débat sur l'immigration", x: "Dans de nombreux pays, l'immigration est au cœur des élections. Une partie de l'opinion veut réduire et contrôler davantage les arrivées, au nom de la cohésion, de la sécurité ou du coût des services publics. Une autre partie défend l'accueil et l'intégration, au nom des droits humains, des besoins de main-d'œuvre ou du vieillissement de la population. Les études sur les effets économiques donnent des résultats différents selon les pays et les époques.", s: '' },
  { t: 'Des continents qui bougent', x: "Il y a environ 300 millions d'années, les continents actuels formaient un seul bloc, la Pangée, qui s'est ensuite fragmenté. Des terres neuves naissent encore : l'île de Surtsey, au large de l'Islande, est sortie de la mer lors d'une éruption en 1963.", s: '' },
  { t: "L'âge des usines", x: "La révolution industrielle a commencé à la fin du XVIIIe siècle en Grande-Bretagne. Elle a créé des villes-usines, de la pollution, et a fait naître les syndicats et le droit du travail.", s: '' },
];

/* ---------- Habitants : opinions et situations, avec des choix ---------- */
const SOC_VOICES = {
  prejuge_il: { sp: 'Habitant', t: "Les Îliens, encore eux. Ils arrivent par bateaux entiers, ils prennent le travail et ils ne parlent même pas comme nous.", q: 'Que réponds-tu ?', c: [["Ils ont tout perdu dans la vague. Ils travaillent comme tout le monde.", "Hmm. Ma grand-mère aussi a dû partir, un jour. Je n'y pensais plus.", { il: 1 }], ["Il y a peut-être trop de monde, c'est vrai.", "Tu vois ! Je ne suis pas le seul à le penser.", { il: -1, qt: 1 }], ["Je préfère ne pas m'en mêler.", "Comme tu veux.", {}]] },
  ilienne: { sp: 'Îlienne', t: "Sur Nacre, j'étais institutrice. Ici, on ne reconnaît pas mon diplôme : je fais le ménage dans les tours. Mes enfants, eux, parlent déjà comme les gens d'ici.", q: null },
  saisonnier: { sp: 'Saisonnier îlien', t: "On fait les récoltes de Verdeval depuis dix ans, sans contrat. Si on tombe malade, on n'est pas payés. Mais sans nous, les pommes resteraient sur les arbres.", q: 'Que fais-tu ?', c: [["Lui donner un Baume.", "Merci. Ça ira mieux demain.", { il: 1 }, 'baume'], ["L'écouter jusqu'au bout.", "Ça fait du bien qu'on écoute, pour une fois.", { il: 1 }], ["Passer ton chemin.", "...", {}]] },
  ouvrier: { sp: 'Ouvrière', t: "On m'a dit que les Éclos allaient remplacer la moitié de l'atelier. Moi, je veux bien travailler avec eux. Mais pas être jetée à cause d'eux.", q: null },
  patron: { sp: "Directeur d'usine", t: "On me demande de polluer moins, de payer plus et d'embaucher plus. Je veux bien, mais qui paiera ? Si je ferme, trois cents familles n'ont plus rien.", q: null },
  pecheur: { sp: 'Pêcheur', t: "Les fumées de Ferrhaven tombent sur nos plages. Les poissons partent. Personne au Conseil ne vient voir.", q: null },
  montagnard: { sp: 'Montagnarde', t: "En ville, on imite mon accent pour rire. Moi je ris aussi. Mais quand on refuse de me louer un appartement à cause de lui, je ne ris plus.", q: null },
  pionnier: { sp: 'Pionnier', t: "Je suis arrivé le premier jour, quand la terre fumait encore. J'ai tout construit de mes mains. Alors quand on me dit que je n'ai pas plus de droits que ceux qui arrivent aujourd'hui, ça me fait mal.", q: 'Que réponds-tu ?', c: [["Ton travail compte. Celui des nouveaux aussi.", "Peut-être. On était tous nouveaux, un jour.", { ec: 1 }], ["Les premiers arrivés devraient passer en priorité.", "Merci. Enfin quelqu'un qui comprend.", { ec: 1, il: -1 }], ["Personne n'est d'ici depuis plus de dix ans.", "... C'est vrai. Ça ne me plaît pas, mais c'est vrai.", {}]] },
  natif: { sp: 'Militante des Natifs', t: "Nous voulons juste qu'on garde un peu de place pour nos enfants. On nous traite de racistes dès qu'on ouvre la bouche.", q: null },
  commune: { sp: 'Bénévole de la Maison Commune', t: "On aide les familles déplacées à trouver un toit. Les gens d'ici sont souvent plus généreux qu'on ne le dit. Tu veux donner quelque chose ?", q: 'Tu donnes ?', c: [["Donner 300 pièces.", "Merci, vraiment. Ça paiera un mois de loyer pour une famille de l'archipel.", { il: 1, ec: 1 }, null, 300], ["Pas maintenant.", "Pas de souci. Merci d'avoir écouté.", {}]] },
  deplace: { sp: "Déplacé de l'archipel", t: "Le volcan a pris notre maison. Ici, les fermiers nous regardent comme des voleurs de terres. On ne voulait pas partir. On n'a pas eu le choix.", q: null },
  fermier: { sp: 'Fermier de la Plaine', t: "Je n'ai rien contre eux. Mais l'Assemblée leur promet nos terres sans nous demander. Moi aussi, j'ai une famille à nourrir.", q: null },
  riche: { sp: 'Habitante de Valmont', t: "On dit que nous vivons dans notre bulle. Nous finançons les écoles et les hôpitaux du continent. Mais c'est vrai que je ne connais pas le prix d'un loyer à Combrecœur.", q: null },
  locataire: { sp: 'Locataire', t: "Mon loyer a doublé depuis que les tours sont arrivées. Le propriétaire dit que c'est le marché. Moi je dis que c'est mon quartier.", q: null },
  ombre: { sp: "Dresseur d'Ombre", t: "Mon Éclos est de type Ombre. Les gens changent de trottoir. Il est plus gentil que la plupart des gens que je connais.", q: 'Que fais-tu ?', c: [["Caresser son Éclos.", "Il ronronne ! Tu vois, il t'aime bien.", { ec: 1 }], ["Garder tes distances.", "Comme les autres...", {}]] },
  surfeur: { sp: 'Îlien des Îles Soleil', t: "Mon grand-père pêchait ici. Aujourd'hui, la plage appartient à un hôtel de Valmont, et je dois payer pour y surfer.", q: null },
  chercheuse: { sp: 'Chercheuse', t: "La toundra dégèle. Les maisons s'enfoncent, et les anciens chasseurs ne reconnaissent plus leur terre. Les chiffres sont clairs, c'est la décision qui est difficile.", q: null },
  autonomiste: { sp: 'Autonomiste de Braise', t: "Valmont décide de tout pour nous. Nous voulons voter nos propres lois, sur nos propres volcans.", q: 'Ton avis ?', c: [["Vous devriez décider pour vous-mêmes.", "Merci. Dis-le à Valmont !", { ec: 1 }], ["Seuls, vous serez plus fragiles.", "Peut-être. Mais ensemble, on n'est pas écoutés.", {}]] },
  douanier: { sp: 'Douanier', t: "Je contrôle les papiers au ferry. Je vois des fraudeurs, et je vois des familles qui ont tout perdu. Le règlement ne fait pas la différence. Moi, j'essaie.", q: null },
};
// qui parle où, selon la région (en plus de deux voix communes à chaque ville)
const REGION_VOICES = {
  solvene: ['prejuge_il', 'ouvrier', 'pecheur', 'douanier'], qt0: ['saisonnier', 'prejuge_il'], qt1: ['pecheur', 'ilienne', 'douanier'], qt2: ['montagnard', 'chercheuse'], qt3: ['ouvrier', 'patron'],
  brumaire: ['pionnier', 'natif', 'commune', 'ilienne', 'locataire', 'ombre'], qt4: ['chercheuse', 'pionnier'], qt5: ['ombre', 'commune'], qt6: ['riche', 'locataire'], qt7: ['autonomiste', 'deplace'], qt8: ['deplace', 'fermier', 'commune'], qt9: ['surfeur', 'ilienne'],
};

/* ---------- Placement dans les villes ---------- */
const _genTownSoc = genTown;
genTown = function (id) {
  const m = _genTownSoc(id);
  if (typeof isCity !== 'function' || !isCity(id)) return m;
  const reg = REGION_OF[id], pool = (REGION_VOICES[reg] || []).slice(), R = rng(hashStr(id + ':soc'));
  const spots = [];
  for (let y = 3; y < m.h - 3; y++) for (let x = 3; x < m.w - 3; x++) if ((x >= 28 || y >= 22) && (m.t[y][x] === ',' || m.t[y][x] === '.') && !m.npcs.some(n => n.x === x && n.y === y) && !m.warps.some(w => w.x === x && (w.y === y || w.y === y - 1))) spots.push([x, y]);
  const take = () => spots.splice(Math.floor(R() * spots.length), 1)[0];
  const picks = [];
  while (pool.length && picks.length < 3) picks.push(pool.splice(Math.floor(R() * pool.length), 1)[0]);
  for (const v of picks) { const s = take(); if (s) m.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: NPC_PALS[(hashStr(id + v)) % NPC_PALS.length], script: 'soc', data: v, speaker: SOC_VOICES[v].sp, wander: 1 }); }
  const k = take(); if (k) { m.npcs.push({ kind: 'npc', x: k[0], y: k[1], dir: 'down', pal: { h: '#3a3a3a', s: '#e0b088', c: '#3a6aa8', p: '#2a2a3a', hat: '#3a6aa8' }, script: 'kiosque', speaker: 'Kiosque à journaux' }); }
  const p = take(); if (p) { m.npcs.push({ kind: 'npc', x: p[0], y: p[1], dir: 'down', pal: NPC_PALS[(hashStr(id) + 4) % NPC_PALS.length], script: 'opinion', data: id, speaker: 'Passant', wander: 2 }); }
  return m;
};
// bureau de vote au Centre des affaires
const _genInteriorSoc = genInterior;
genInterior = function (id, def) {
  const m = _genInteriorSoc(id, def);
  if (def.kind === 'office' && def.sub === 'office2') m.npcs.push({ kind: 'npc', x: 8, y: 3, dir: 'down', pal: { h: '#2a2a2a', s: '#c89070', c: '#e8e0d0', p: '#3a3a4a' }, script: 'vote', speaker: 'Bureau de vote' });
  return m;
};

/* ---------- Scripts ---------- */
SCRIPTS.soc = async function (n) {
  const v = SOC_VOICES[n.data]; if (!v) return;
  const seen = (G.flags.socSeen = G.flags.socSeen || {}), key = RT.map.id + ':' + n.data;
  await say(v.t, { speaker: v.sp });
  if (!v.q || seen[key]) return;
  const r = await ask(v.q, v.c.map(c => c[0]), { speaker: v.sp, w: 170 });
  if (r < 0) return;
  const [, rep, eff, item, cost] = v.c[r];
  if (cost) { if (G.money < cost) return say("Tu n'as pas assez d'argent sur toi.", { speaker: v.sp }); G.money -= cost; }
  if (item) { if (!G.bag[item]) return say("Tu n'en as pas sur toi.", { speaker: v.sp }); G.bag[item]--; }
  seen[key] = 1;
  await say(rep, { speaker: v.sp });
  for (const k in eff) repAdd(k, eff[k]);
};
SCRIPTS.opinion = async function (n) {
  const c = contOf(n.data), R = rng(hashStr(n.data + ':op' + ((G.flags.elec && G.flags.elec.done) || 0))), P = PARTIES[c][Math.floor(R() * 4)], gov = partyOf(c, govOf(c));
  const like = P.k === gov.k;
  await say(`Moi, je vote pour ${P.n}. ${P.pour}`, { speaker: 'Passant' });
  await say(like ? `Le ${GOV_NAME[c]} est entre leurs mains, et franchement, je trouve que ça va mieux.` : `En ce moment, c'est ${gov.n} qui gouverne. Je ne suis pas d'accord avec eux, mais on en discute, c'est ça la démocratie.`, { speaker: 'Passant' });
};
SCRIPTS.kiosque = async function () {
  const c = hereCont(), e = G.flags.elec || {}, gov = partyOf(c, govOf(c)), i = (e.done || 0) + (G.badges.filter(Boolean).length % 3);
  const H = [
    `${GOV_NAME[c]} : ${gov.n} au pouvoir. ${gov.idee}`,
    GEOPOL[i % GEOPOL.length].t + ' : ' + GEOPOL[i % GEOPOL.length].x,
    SOCIETY[(i + 2) % SOCIETY.length].t + ' : ' + SOCIETY[(i + 2) % SOCIETY.length].x,
  ];
  const open = electionOpen();
  if (open) H.unshift(`Élections ! Le ${GOV_NAME[c]} sera renouvelé. Le bureau de vote est au Centre des affaires de chaque ville.`);
  if (e.last && e.last[c]) H.unshift(`Résultats : ${e.last[c].map(([k, v]) => `${partyOf(c, k).n} ${v} %`).join(', ')}.`);
  await say('Les gros titres du jour :', { speaker: 'Kiosque à journaux' });
  for (const h of H.slice(0, 3)) await say(h, { speaker: 'Journal' });
};

/* ---------- Élections ---------- */
const ELECT_AT = [3, 7, 12, 18];
function electionIndex() { const b = G.badges.filter(Boolean).length; let i = -1; ELECT_AT.forEach((t, k) => { if (b >= t) i = k; }); return i; }
function electionOpen() { const e = (G.flags.elec = G.flags.elec || {}), i = electionIndex(); return i >= 0 && (e.done || 0) <= i ? i : null; }
function runElection(i, voteFor, cVote) {
  const e = (G.flags.elec = G.flags.elec || {}); e.gov = e.gov || { A: 'large', B: 'pionniers' }; e.last = {};
  for (const c of ['A', 'B']) {
    const R = rng(hashStr('elec' + i + c)), sc = {};
    for (const p of PARTIES[c]) sc[p.k] = 18 + R() * 14;
    // l'humeur du pays dépend de ce que tu as vécu
    sc[c === 'A' ? 'racines' : 'natifs'] += Math.max(0, -repOf('il')) * 2;
    sc[c === 'A' ? 'ateliers' : 'commune'] += Math.max(0, repOf('il')) * 1.5;
    sc[c === 'A' ? 'large' : 'pionniers'] += (c === 'A' ? repOf('qt') : repOf('ec')) * 0.8 + i * 2;
    sc[c === 'A' ? 'verte' : 'gardiens'] += i >= 2 ? 6 : 0;
    sc[e.gov[c]] -= 3; // l'usure du pouvoir
    if (voteFor && cVote === c) sc[voteFor] += 10;
    const tot = Object.values(sc).reduce((a, v) => a + v, 0), res = Object.entries(sc).map(([k, v]) => [k, Math.round(v / tot * 100)]).sort((a, b) => b[1] - a[1]);
    e.gov[c] = res[0][0]; e.last[c] = res;
  }
  e.done = i + 1;
}
SCRIPTS.vote = async function () {
  const i = electionOpen(), c = hereCont();
  if (i == null) { const gov = partyOf(c, govOf(c)); return say(`Aucune élection en ce moment. Le ${GOV_NAME[c]}, à ${GOV_SEAT[c]}, est dirigé par ${gov.n}. Prochain scrutin quand la région aura vu de nouveaux champions.`, { speaker: 'Bureau de vote' }); }
  await say(`Élection du ${GOV_NAME[c]}. Tu peux lire les programmes, puis voter. Ton vote compte, mais tu n'es pas seul·e à voter.`, { speaker: 'Bureau de vote' });
  for (;;) {
    const r = await menu(PARTIES[c].map(p => p.n).concat(['Voter', 'Plus tard']), { x: 40, y: 20, w: 160, title: 'Programmes' });
    if (r < 0 || r === 5) return;
    if (r < 4) { const p = PARTIES[c][r]; await say(p.idee, { speaker: p.n }); await say(p.pour, { speaker: p.n }); await say(p.contre, { speaker: 'Leurs adversaires' }); continue; }
    const v = await menu(PARTIES[c].map(p => p.n).concat(['Vote blanc']), { x: 40, y: 20, w: 160, title: 'Ton bulletin' });
    if (v < 0) continue;
    runElection(i, v < 4 ? PARTIES[c][v].k : null, c);
    const res = G.flags.elec.last[c], w = partyOf(c, res[0][0]);
    sfx('item');
    await say(`Dépouillement terminé. ${res.map(([k, s]) => `${partyOf(c, k).n} : ${s} %`).join(' · ')}.`, { speaker: 'Bureau de vote' });
    await say(`${w.n} dirigera le ${GOV_NAME[c]}. ${govEffectText(c, w.k)}`, { speaker: 'Bureau de vote' });
    const o = c === 'A' ? 'B' : 'A';
    await say(`De l'autre côté de la mer, ${partyOf(o, G.flags.elec.gov[o]).n} a gagné l'élection du ${GOV_NAME[o]}.`, { speaker: 'Bureau de vote' });
    return;
  }
};
// une élection laissée ouverte se tient sans toi au scrutin suivant
const _enterMapSoc = enterMap;
enterMap = async function (...a) {
  const e = G && G.flags ? (G.flags.elec = G.flags.elec || {}) : null, i = G ? electionIndex() : -1;
  if (e && i >= 0 && (e.done || 0) < i) runElection(i - 1, null, null);
  return _enterMapSoc(...a);
};
function govEffectText(c, k) {
  return ({
    racines: "Le ferry sera plus contrôlé, et les produits importés coûteront plus cher dans les Quatre Terres.",
    natifs: "Le ferry sera plus contrôlé, et les produits importés coûteront plus cher à Éclosia.",
    ateliers: "Les Baumes et les soins de base baissent de prix dans les Quatre Terres.",
    commune: "Les Baumes et les soins de base baissent de prix à Éclosia.",
    verte: "Les Repousses et les objets naturels baissent de prix ; les usines installent des filtres.",
    gardiens: "Les Repousses et les objets naturels baissent de prix ; les chantiers ralentissent près de la Graine.",
    large: "Le passage du ferry devient gratuit et les prix baissent un peu partout dans les Quatre Terres.",
    pionniers: "Les Sphères baissent de prix et les chantiers accélèrent à Éclosia.",
  })[k] || '';
}

/* ---------- Effets sur les prix ---------- */
function priceOf(k) {
  const it = ITEMS[k], c = hereCont(), g = govOf(c), base = it.p; let f = 1;
  const rep = c === 'A' ? repOf('qt') : repOf('ec');
  if (rep >= 5) f -= 0.1; else if (rep <= -5) f += 0.1;
  const basic = /baume|antidote|reveil|soin/.test(k), ball = /sphere/.test(k), nat = /repousse|rappel/.test(k), imp = /hyper|maxi/.test(k);
  if ((g === 'ateliers' || g === 'commune') && basic) f -= 0.2;
  if ((g === 'verte' || g === 'gardiens') && nat) f -= 0.3;
  if (g === 'large') f -= 0.08;
  if (g === 'pionniers' && ball) f -= 0.15;
  if ((g === 'racines' || g === 'natifs') && imp) f += 0.15;
  return Math.max(1, Math.round(base * f));
}
shopBuy = async function () {
  const list = shopList();
  while (true) {
    const mb = el('menu money', 4, 4, 90, 18, `<div class="mi"><span>Argent</span><b>${fmtMoney(G.money)}</b></div>`);
    const desc = el('menu sdesc', 4, 122, 232, 34);
    const i = await menu(list.map(k => ({ label: ITEMS[k].n, right: fmtMoney(priceOf(k)) })), { x: 100, y: 4, w: 136, rows: 8, onMove: j => desc.textContent = ITEMS[list[j]].d + (priceOf(list[j]) !== ITEMS[list[j]].p ? ` (prix normal : ${fmtMoney(ITEMS[list[j]].p)})` : '') });
    if (i < 0) { mb.remove(); desc.remove(); return; }
    const it = ITEMS[list[i]], p = priceOf(list[i]);
    const max = Math.min(99, Math.floor(G.money / p));
    if (max < 1) { mb.remove(); desc.remove(); await say("Tu n'as pas assez d'argent."); continue; }
    const q = await pickQty(max, p);
    mb.remove(); desc.remove();
    if (!q) continue;
    G.money -= p * q; addItem(list[i], q); sfx('item');
    let bonus = '';
    if (list[i] === 'sphere' && q >= 10) { addItem('sphere', 1); bonus = ' Et voici une Sphère en cadeau !'; }
    await say(`Tu achètes ${q} × ${it.n}. Merci !${bonus}`);
  }
};

/* ---------- Le ferry : contrôle et laissez-passer ---------- */
KEY_ITEMS.passe = { n: 'Laissez-passer', d: "Un papier tamponné par la douane du ferry. Il permet de passer d'un continent à l'autre. Beaucoup attendent encore le leur." };
const _dockSoc = SCRIPTS.dock;
SCRIPTS.dock = async function (...a) {
  const going = RT.map.id === 't3' ? !!G.keys.ticket : true;
  if (going && !G.keys.passe) {
    const c = hereCont(), g = govOf(c), strict = g === 'racines' || g === 'natifs', fee = g === 'large' ? 0 : strict ? 400 : 150;
    await say(`Contrôle avant l'embarquement. Pour traverser, il faut un laissez-passer du ${GOV_NAME[c]}.`, { speaker: 'Douanière' });
    const r = await ask('Pourquoi veux-tu traverser ?', ['Pour défier les arènes', 'Pour aider des gens', 'Ça ne vous regarde pas'], { speaker: 'Douanière', w: 150 });
    if (r === 2) { await say("Je fais mon travail. Sans réponse, pas de tampon. Reviens quand tu voudras bien me parler.", { speaker: 'Douanière' }); repAdd(c === 'A' ? 'qt' : 'ec', -1); return; }
    await say(r === 0 ? "Une dresseuse ou un dresseur de passage. Ça, on connaît." : "Il en faudrait plus, des gens comme toi. On voit tellement de détresse sur ce quai.", { speaker: 'Douanière' });
    if (fee) {
      const p = await ask(`Les frais de laissez-passer sont de ${fmtMoney(fee)}${strict ? ' (les règles se sont durcies depuis les dernières élections)' : ''}.`, ['Payer', 'Pas maintenant'], { speaker: 'Douanière' });
      if (p !== 0) return;
      if (G.money < fee) return say("Il te manque de quoi payer. Les règles sont les règles. Désolée.", { speaker: 'Douanière' });
      G.money -= fee;
    } else await say("Avec le nouveau gouvernement, le laissez-passer est gratuit.", { speaker: 'Douanière' });
    G.keys.passe = 1; sfx('item');
    await say("Tampon. Ton laissez-passer est valable dans les deux sens, pour toujours. Derrière toi, une famille îlienne attend depuis trois jours le même papier.", { speaker: 'Douanière' });
    if (r === 1) repAdd('il', 1);
  }
  return _dockSoc.apply(this, a);
};

/* ---------- Encyclopédie du monde (menu « Monde ») ---------- */
const REG_ORDER = ['solvene', 'qt0', 'qt1', 'qt2', 'qt3', 'echos', 'brumaire', 'qt4', 'qt5', 'qt6', 'qt7', 'qt8', 'qt9', 'racines', 'tour', 'ruine'];
function readPanel(title, html) {
  return new Promise(res => {
    const p = el('panel lib', 6, 6, 228, 148);
    p.innerHTML = `<div class="ptitle">${esc(title)}</div><div class="soc-body" style="position:absolute;left:calc(var(--px)*5);right:calc(var(--px)*5);top:calc(var(--px)*16);bottom:calc(var(--px)*12);overflow:auto;font-size:calc(var(--px)*6.2);line-height:1.45">${html}</div><div style="position:absolute;right:calc(var(--px)*5);bottom:calc(var(--px)*3);font-size:calc(var(--px)*5);opacity:.7">B : retour · ↑↓ : défiler</div>`;
    const body = p.querySelector('.soc-body');
    const h = { press(b) { if (b === 'b' || b === 'a') { uiPop(h); p.remove(); res(); } else if (b === 'down') body.scrollTop += 40; else if (b === 'up') body.scrollTop -= 40; } };
    p.addEventListener('click', e => { if (e.target === p) { uiPop(h); p.remove(); res(); } });
    uiPush(h);
  });
}
const H2 = t => `<p style="margin:.6em 0 .2em;font-weight:800;color:#c8553a">${esc(t)}</p>`, P_ = t => `<p style="margin:0 0 .4em">${esc(t)}</p>`;
async function mondeScreen() {
  for (;;) {
    const r = await menu(['Les régions', 'Société', 'Géopolitique', 'Partis et élections', 'Ta réputation', 'Dans notre monde', 'Retour'], { x: 50, y: 14, w: 140, title: 'Le monde' });
    if (r < 0 || r === 6) return;
    if (r === 0) {
      const names = REG_ORDER.filter(k => REGIONS[k]).map(k => REGIONS[k].name.split(' · ')[0]);
      for (;;) {
        const j = await menu(names.concat(['Retour']), { x: 40, y: 4, w: 160, rows: 9, title: 'Les régions' });
        if (j < 0 || j === names.length) break;
        const k = REG_ORDER.filter(q => REGIONS[q])[j], I = REGION_INFO[k];
        const bio = k.startsWith('qt') && typeof QT_BIOME !== 'undefined' ? BIOMES[QT_BIOME[k]].name : '';
        await readPanel(names[j], (bio ? P_(`Climat : ${bio}. Peuple : ${COMMU[I.peuple].n}. Continent : ${CONT_A.has(k) ? 'les Quatre Terres' : 'Éclosia'}.`) : P_(`Peuple : ${COMMU[I.peuple].n}. Continent : ${CONT_A.has(k) ? 'les Quatre Terres' : 'Éclosia'}.`)) + H2('Formation') + P_(I.geo) + H2('Histoire') + I.hist.map(P_).join('') + H2('Influences sur ses voisins') + I.infl.map(P_).join('') + H2('Enjeux d’aujourd’hui') + I.enjeux.map(P_).join(''));
      }
    } else if (r === 1) await readPanel('Société', SOCIETY.map(s => H2(s.t) + P_(s.x)).join('') + H2('Les communautés') + Object.values(COMMU).map(c => P_(`${c.n} : ${c.d}`)).join(''));
    else if (r === 2) await readPanel('Géopolitique', P_(`Deux gouvernements se partagent le monde : le ${GOV_NAME.A}, qui siège à ${GOV_SEAT.A}, et l'${GOV_NAME.B}, qui siège à ${GOV_SEAT.B}. Les Îliens, eux, n'ont plus de pays.`) + GEOPOL.map(g => H2(g.t) + P_(g.x) + g.v.map(v => P_('· ' + v)).join('')).join(''));
    else if (r === 3) {
      const e = G.flags.elec || {}, open = electionOpen();
      await readPanel('Partis et élections', ['A', 'B'].map(c => H2(`${GOV_NAME[c]} : ${partyOf(c, govOf(c)).n} au pouvoir`) + (e.last && e.last[c] ? P_('Dernier scrutin : ' + e.last[c].map(([k, v]) => `${partyOf(c, k).n} ${v} %`).join(', ') + '.') : '') + PARTIES[c].map(p => P_(`${p.n} — ${p.idee} ${p.pour} ${p.contre}`)).join('')).join('') + H2('Prochaines élections') + P_(open != null ? 'Des élections sont ouvertes ! Vote au Centre des affaires de n’importe quelle ville.' : `Les élections ont lieu quand les champions se multiplient : après ${ELECT_AT.join(', ')} badges.`));
    } else if (r === 4) await readPanel('Ta réputation', Object.keys(COMMU).map(k => H2(`${COMMU[k].n} : ${repLabel(repOf(k))} (${repOf(k) > 0 ? '+' : ''}${repOf(k)})`) + P_(COMMU[k].d)).join('') + H2('Ce qu’elle change') + P_("Bien vu·e d'un continent, tu y paies moins cher ; mal vu·e, plus cher. L'humeur de chaque communauté pèse aussi sur les élections."));
    else if (r === 5) await readPanel('Dans notre monde', P_("Le monde d'Éclosia est imaginaire, mais ses problèmes ressemblent aux nôtres. Quelques repères réels :") + REAL_WORLD.map(w => H2(w.t) + P_(w.x) + (w.s ? `<p style="margin:0 0 .4em;opacity:.65;font-size:.9em">Source : ${esc(w.s)}</p>` : '')).join(''));
  }
}
if (typeof SM_ICONS !== 'undefined') { SM_ICONS['Monde'] = '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c3 3 3 14 0 17M12 3.5c-3 3-3 14 0 17"/>'; SM_COLORS['Monde'] = '#4aa8c8'; }
