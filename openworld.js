'use strict';
/* ============================================================
   ÉCLOSIA — Monde ouvert
   Les Quatre Terres et Éclosia deviennent deux grands continents
   d'un seul tenant. Chaque ville s'ouvre aux quatre points
   cardinaux sur la nature ; les anciennes routes deviennent des
   chemins balisés (avec leurs dresseurs et leurs scènes).
   Bandes rivales, mythologie, voyageurs, rumeurs, diversité.
   ============================================================ */
const OPEN_REG = { solvene: 1, brumaire: 1 };
const WORLD_ID = rk => 'mo_' + rk;
const WS = 24; // cases par unité de la carte de région

/* ---------- Bruit doux pour le relief ---------- */
function vnoise(seed) {
  const h = (x, y) => { let n = x * 374761393 + y * 668265263 + seed * 2147483647; n = (n ^ (n >>> 13)) * 1274126177; return ((n ^ (n >>> 16)) >>> 0) / 4294967295; };
  const s = t => t * t * (3 - 2 * t);
  return (x, y, sc) => {
    x /= sc; y /= sc; const xi = Math.floor(x), yi = Math.floor(y), xf = s(x - xi), yf = s(y - yi);
    const a = h(xi, yi), b = h(xi + 1, yi), c = h(xi, yi + 1), d = h(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  };
}

/* ---------- Bandes ---------- */
const GANGS = [
  { id: 'crocs', reg: 'solvene', near: 't1', name: 'Les Crocs du Moulin', col: '#c8553a', types: ['normal', 'combat'], boss: 'Rocco', bpal: { h: '#3a2a22', s: '#c68a5e', c: '#c8553a', p: '#2a2a2a', style: 'spiky' },
    intro: "Ce champ, c'était à mon grand-père. L'Éclipse l'a racheté pour trois sous. Maintenant on prend ce qu'on veut, comme eux.", lose: "T'as pas pris notre argent. T'as juste gagné. C'est bizarre, ça fait moins mal.",
    post: ["Rocco : Tu sais ce qu'on a trouvé dans les caisses de l'Éclipse ? Des lettres. Signées « R ». Quelqu'un les paie pour nous chasser.", "Rocco : On rendra les sacs de grain aux fermes. Pas pour toi. Pour ma grand-mère, qui aurait honte."] },
  { id: 'maree', reg: 'solvene', near: 't3', name: 'La Marée Basse', col: '#2f7d9a', types: ['eau', 'toxine'], boss: 'Capitaine Sel', bpal: { h: '#e8e8e8', s: '#a0694a', c: '#2f4f6f', p: '#1a2a3a', beard: 1, hat: '#1a2a3a' },
    intro: "La Marée Basse fait passer ce que les douanes refusent. Médicaments, eau douce... et parfois des gens. Ne juge pas avant de savoir.", lose: "Bien. Peut-être que c'est toi qui devrais savoir, maintenant.",
    post: ["Capitaine Sel : J'ai vendu trois gamins à la Racine, il y a sept ans. Contre de l'eau potable pour tout un quartier. L'un d'eux s'appelait Ilan.", "Capitaine Sel : Je le revois parfois, de loin. Il porte un manteau de commandant. Il ne me reconnaît pas. Ou il fait semblant. Je ne sais pas ce qui est pire."] },
  { id: 'lanternes', reg: 'solvene', near: 't6', name: 'Les Lanternes Rouges', col: '#b8324a', types: ['ombre', 'feu'], boss: 'Madame Lune', bpal: { h: '#1a1a22', s: '#7a4a32', c: '#b8324a', p: '#2a1a22', style: 'locs' },
    intro: "La nuit appartient aux Lanternes. On tient le marché, les jeux et les secrets. Toi, tu as l'air d'en porter un gros.", lose: "Tu brilles plus fort que mes lanternes. Garde ça pour les nuits difficiles.",
    post: ["Madame Lune : Je tiens la nuit pour que les gens ordinaires puissent dormir. Personne ne me remercie. C'est normal.", "Madame Lune : Une petite aux cheveux bleus a passé une nuit ici, il y a des années. Elle refusait de pleurer. Je lui ai offert une lanterne. Elle l'a gardée."] },
  { id: 'drakes', reg: 'solvene', near: 't7', name: 'Les Drakes', col: '#7a4ac8', types: ['dragon', 'vent'], boss: 'Vael', bpal: { h: '#c8c8d8', s: '#e0b088', c: '#4a2a6a', p: '#2a1a3a', style: 'wild' },
    intro: "Les Drakes chevauchent les vents de Givrecime depuis cinq générations. Mon dragon, Ombrage, est le plus vieux de tous. Il veut un dernier vrai combat. Donne-le-lui.", lose: "Il a ronronné. Tu as entendu ? Il n'avait pas ronronné depuis dix ans.",
    post: ["Vael : Ombrage ne passera pas l'hiver. Il le sait. Il voulait partir en ayant volé une dernière fois au-dessus d'un vrai adversaire.", "Vael : Au printemps, je l'enterrerai au sommet, face au vent. Si tu passes par Givrecime, viens. Les Drakes chantent pour leurs morts. On aimerait que tu sois là."] },
  { id: 'ronces', reg: 'brumaire', near: 'u0', name: 'Les Ronces Libres', col: '#5a3a5a', types: ['flore', 'ombre'], boss: 'Sorrel', bpal: { h: '#2a1f2e', s: '#d8b090', c: '#5a3a5a', p: '#2a1f2e', style: 'scarf', hat: '#6a2a3a' },
    intro: "On a déserté l'Ordre Racine. Ronce nous a sauvés d'un toit, puis il nous a appris à mordre. On mord encore. On ne sait plus faire autre chose.", lose: "Alors c'est vrai. On peut perdre sans mourir. Il nous avait dit le contraire.",
    post: ["Sorrel : Chaque nuit, je rêve de la vague. Ronce dit que c'est une faiblesse. Je commence à croire que c'est la seule chose de vrai en moi.", "Sorrel : Si tu le croises, demande-lui pourquoi il pleure quand il croit que personne ne le regarde."] },
  { id: 'fils', reg: 'brumaire', near: 'u4', name: 'Les Fils de la Vague', col: '#3a6ab8', types: ['eau', 'combat'], boss: 'Mako', bpal: { h: '#1a1a1a', s: '#5a3424', c: '#3a6ab8', p: '#1a2a4a', style: 'curly' },
    intro: "Nous sommes les orphelins de la Germination. Personne ne nous a adoptés, alors on s'est adoptés entre nous. On protège les plus petits. Prouve que tu n'es pas une menace.", lose: "Tu te bats comme quelqu'un qui a déjà protégé quelqu'un. D'accord. Tu peux passer.",
    post: ["Mako : J'étais sur le toit, à Île-Bleue. Avec Ilan et sa petite sœur. Et ma sœur à moi, Ama. La vague a pris Ama. Elle a laissé Nova.", "Mako : Pendant des années, j'en ai voulu à Nova d'être vivante. Ce soir, je crois que je vais lui écrire. Pour lui dire que je suis content qu'elle soit là. C'est tout."] },
  { id: 'forges', reg: 'brumaire', near: 'u1', name: 'Les Forges Noires', col: '#4a4a4a', types: ['acier', 'feu'], boss: 'Hilde', bpal: { h: '#c84a2a', s: '#f2c9a0', c: '#3a3a3a', p: '#2a2a2a', style: 'braid' },
    intro: "Les Forges Noires fabriquent des armes pour qui paie. L'Ordre Racine paie bien. Toi, tu paies en combats ?", lose: "J'ai forgé des chaînes pour la Racine. Tu viens de me rappeler que je sais aussi forger des clés.",
    post: ["Hilde : J'ai trouvé une commande signée « R » pour mille colliers de contrôle. Pour des Éclos. Je l'ai refusée. Je l'ai gardée, aussi, au cas où quelqu'un voudrait des preuves.", "Hilde : Tiens. C'est une copie. Si un jour tu dois prouver qui tire les ficelles, montre-la."] },
  { id: 'muet', reg: 'brumaire', near: 'u6', name: 'Le Chœur Muet', col: '#6a5a8a', types: ['esprit', 'ombre'], boss: 'Frère Silence', bpal: { h: '#3a2a3a', s: '#e8c0a0', c: '#6a5a8a', p: '#2a1a3a', style: 'bald' },
    intro: "(Il parle sans ouvrir la bouche.) Nous écoutons la Graine. Elle chante, la nuit. Elle dit qu'un jour, elle reprendra tout ce qu'elle a donné.", lose: "(Un long silence.) Tu as raison de te battre. Mais elle ne se trompe pas. Elle reprendra. Un jour.",
    post: ["Frère Silence : Nous n'avons pas de chef. Seulement une partition. Un jour, quelqu'un la chantera à voix haute, et nous deviendrons un Chœur.", "(Un frisson te traverse. Dans trente et un ans, à la Nécropole, tu as déjà entendu cette partition.)"] },
];
const gangDone = id => !!G.flags['gang_' + id];
const gangCount = rk => GANGS.filter(g => g.reg === rk && gangDone(g.id)).length;

/* ---------- Mythologie ---------- */
const MYTHS = [
  ['my1', 'mo_solvene', 'livre', "Le Livre des Trois Âges, I", "Au commencement, il n'y avait que la Pierre et l'Eau, et elles ne se parlaient pas. Puis une étoile tomba dans la mer, et la mer eut de la fièvre.", "De cette fièvre naquirent les premières créatures. Les anciens les appelaient « les enfants de l'étoile ». Les savants, plus tard, diront « les Éclos »."],
  ['my2', 'mo_solvene', 'livre', "Le Livre des Trois Âges, II", "L'Âge de Bronze fut celui d'Unaë : un seul continent, deux peuples, la Terre et l'Océan. Ils se disputèrent l'étoile tombée, chacun jurant qu'elle lui appartenait.", "L'Âge de Fer commença quand Zénithar déchira le continent pour arrêter la guerre. L'Âge de Sève commença la nuit où la Graine germa. Le quatrième âge n'a pas encore de nom."],
  ['my3', 'mo_solvene', 'stele', "Stèle de Zénithar, le Ciel", "Zénithar ne descend que trois fois par millénaire. La première fois, il sépara les terres. La deuxième, il ferma ses ailes sur une enfant qui se noyait.", "La troisième fois, disent les prêtres, il descendra pour juger. Personne ne sait qui."],
  ['my4', 'mo_brumaire', 'stele', "Stèle de Germalis, la Graine", "Germalis n'est ni bon ni mauvais. Il est le jardinier. Il plante, il arrose, il taille. Parfois, il taille trop.", "Les mères de Graineval lui adressent une seule prière : « Taille ailleurs. »"],
  ['my5', 'mo_solvene', 'stele', "Stèle d'Aquorée, la Mer", "Aquorée était la gardienne de l'Océan pendant la guerre d'Unaë. Quand Zénithar sépara les terres, elle pleura si fort que les mers montèrent d'une coudée.", "Les marins de Port-Corail versent encore une goutte d'eau douce à la mer avant de partir. Pour qu'elle pleure moins."],
  ['my6', 'mo_solvene', 'stele', "Stèle de Volcanis, le Feu", "Volcanis dort sous Cendrecap. Il n'est pas en colère : il a froid. Quand il se retourne dans son sommeil, la montagne gronde.", "Les forgerons lui laissent du charbon à l'entrée des galeries. Il ne le mange pas. Il apprécie l'attention."],
  ['my7', 'mo_solvene', 'stele', "Stèle de Givraël, le Froid", "Givraël garde les morts de la montagne dans la glace, pour que leurs familles puissent les revoir un jour. C'est sa façon d'aimer.", "Les Drakes disent que Givraël a appris le chant des funérailles aux premiers dragons."],
  ['my8', 'mo_brumaire', 'stele', "Stèle de Tonnorage, la Foudre", "Tonnorage est né de la première dispute entre deux frères. Chaque éclair est une phrase qu'ils n'ont jamais osé se dire.", "Les enfants d'Éclosia comptent les secondes entre l'éclair et le tonnerre. Ils disent que c'est le temps qu'il faut pour pardonner."],
  ['my9', 'mo_brumaire', 'stele', "Stèle d'Éveillon, l'Éveil", "Éveillon fait passer le monde du rêve au réel, chaque matin. S'il oubliait un seul jour, tout le monde resterait endormi, heureux et immobile.", "Oniris a voulu l'endormir, une fois. Éveillon n'a pas protesté. Il a juste attendu que quelqu'un vienne le réveiller."],
  ['my10', 'mo_brumaire', 'livre', "Prophétie de l'Enfant des Deux Temps", "« Il viendra un enfant qui aura deux âges à la fois. Il marchera sur la plage de la vague avant d'être né à sa propre histoire. »", "« Il tendra une enfant à un vieil homme, et le vieil homme ne verra pas son visage. Ce jour-là, la boucle se fermera, et le temps pourra enfin avancer. »"],
  ['my11', 'mo_brumaire', 'livre', "Les Jardiniers d'Étoiles", "Les conteurs de Valmont parlent de jardiniers venus d'au-delà du ciel, qui semaient des graines dans les mondes vides et revenaient récolter tous les dix mille ans.", "On raconte cette histoire aux enfants pour qu'ils rangent leur chambre. Personne ne la prend au sérieux. Personne, sauf la Docteure Aster, dans un futur que tu as vu."],
  ['my12', 'mo_solvene', 'livre', "Chants des Bandes", "Les Crocs chantent le blé volé. La Marée Basse chante les noyés. Les Lanternes chantent la nuit qui protège. Les Drakes chantent le vent qui emporte.", "Il existe un cinquième chant, que toutes les bandes connaissent et qu'aucune n'avoue : celui des enfants trouvés sur les toits, la nuit de la vague."],
  ['my13', 'mo_brumaire', 'stele', "Le Calendrier de Sève", "En Éclosia, on compte les années depuis la Germination. An 0, la vague. An 1, les premières fleurs. An 3, la première naissance. An 10, la première fête.", "Personne n'a encore osé fixer la date de la fin. Le Chœur Muet dit qu'elle est déjà écrite dans la Graine."],
  ['my14', 'mo_solvene', 'stele', "La Pierre des Serments", "Ici, les champions des Quatre Terres prêtent serment : « Je me battrai pour que le combat ne soit jamais nécessaire. »", "Quelqu'un a gravé dessous : « Belle phrase. Dommage qu'il faille se battre pour la tenir. » Signé : N."],
];
MYTHS.forEach(([id, map, k, t, a, b]) => { const L = { id, map, k, t, p: [a, b] }; LORE_TEXTS.push(L); LORE_BY_ID[id] = L; });

/* ---------- Voyageurs, diversité ---------- */
NPC_PALS.push(
  { h: '#1a1a1a', s: '#5a3424', c: '#e9c43a', p: '#2a2a3a', style: 'curly' }, { h: '#2a1a1a', s: '#7a4a32', c: '#3aa88a', p: '#3a2a2a', style: 'locs' },
  { h: '#1a1a22', s: '#c68a5e', c: '#e88aa8', p: '#4a3a5a', style: 'scarf', hat: '#4a8fe0' }, { h: '#e8e8e8', s: '#a0694a', c: '#8a5a3a', p: '#3a3a3a', beard: 1 },
  { h: '#3a2a1a', s: '#e8c8a8', c: '#6a8ac8', p: '#2a3a4a', style: 'bun' }, { h: '#1a1a1a', s: '#8a5a3a', c: '#c8553a', p: '#2a2a2a', style: 'braid' },
);
const WANDERERS = [
  ['mo_solvene', 'Amadou, berger', "Mes Laineclair broutent ici depuis trois générations. Les bandes ne nous embêtent pas : on leur donne de la laine en hiver.", null],
  ['mo_solvene', 'Yuki, cartographe', "Je redessine les Quatre Terres. Tous les ans, une rivière change de lit. Le monde bouge plus vite que mes cartes.", null],
  ['mo_solvene', 'Fatima et sa fille', "On marche jusqu'à Port-Corail. Ma fille veut voir la mer. Moi, je veux juste qu'elle la voie gentille.", 'day'],
  ['mo_solvene', 'Lev, marchand de nuit', "Psst. Des Sphères Nuit, des cartes des Lanternes, des rumeurs fraîches. Je ne vends qu'après le coucher du soleil.", 'night'],
  ['mo_solvene', 'Grand-père Tomas', "J'ai connu les Quatre Terres avant la Germination. On ne fermait pas les portes, à l'époque. On n'avait rien à voler.", null],
  ['mo_solvene', 'Kiri, coureuse', "Je livre le courrier entre les villes. À pied. Les créatures volantes, c'est pour les riches. Et pour les paresseux.", 'day'],
  ['mo_brumaire', 'Oumar, chercheur de sève', "La sève remonte par endroits dans les prés. Je la récolte pour les guérisseurs. La Racine voudrait l'interdire.", null],
  ['mo_brumaire', 'Sœur Agathe', "J'enterre ceux que personne ne réclame. Il y en a moins chaque année. C'est un bon métier, quand il diminue.", null],
  ['mo_brumaire', 'Ji-woo, musicienne', "Je joue pour les créatures sauvages. Elles écoutent mieux que les gens. Elles applaudissent moins.", 'evening'],
  ['mo_brumaire', 'Les jumeaux Okoro', "On cherche notre père. Il était pêcheur à Nacre. On sait qu'il est mort. On cherche quand même.", null],
  ['mo_brumaire', 'Veilleur Hamid', "La nuit, je compte les lanternes de Graineval depuis la colline. Quand il y en a une de plus, je vais voir si quelqu'un a besoin d'aide.", 'night'],
  ['mo_brumaire', 'Rosa, ancienne Racine', "J'ai quitté l'Ordre avec rien. Je plante des arbres le long des chemins. Un jour, quelqu'un se reposera à l'ombre sans savoir qui les a plantés.", null],
];
const AMBIENT = {
  any: ["Un vol de Piouly passe au-dessus de toi en piaillant.", "Le vent porte une odeur d'herbe coupée et de pluie lointaine.", "Au loin, quelqu'un chante. La chanson s'arrête quand tu t'approches.", "Une créature sauvage te regarde depuis les hautes herbes, puis disparaît."],
  night: ["Les lucioles s'allument une à une, comme si quelqu'un comptait.", "Une lanterne flotte au loin, sur la colline. Puis une autre."],
  gang: ["Des tags aux couleurs d'une bande couvrent un rocher. Quelqu'un a barré le mot « paix » et l'a réécrit dessous.", "Tu croises deux membres de bandes rivales qui partagent une cigarette, en silence. Ils te regardent passer sans rien dire."],
};

/* ---------- Génération du continent ---------- */
function genWorld(id) {
  const rk = id.slice(3), R0 = REGIONS[rk], R = rng(hashStr(id + ':world'));
  const pos = regionLayout(rk);
  const xs = Object.values(pos).map(p => p[0]), ys = Object.values(pos).map(p => p[1]);
  const minx = Math.min(...xs), miny = Math.min(...ys), M = 20;
  const W = Math.round((Math.max(...xs) - minx) * WS + 2 * M), H = Math.round((Math.max(...ys) - miny) * WS + 2 * M);
  const P = idd => { const j = rng(hashStr(idd + ':jit')); return [Math.round(M + (pos[idd][0] - minx) * WS + (j() - 0.5) * 6), Math.round(M + (pos[idd][1] - miny) * WS + (j() - 0.5) * 6)]; };
  const t = newGrid(W, H, '.');
  const lock = newGrid(W, H, 0); // 1 = route/place réservée
  const map = { id, name: rk === 'solvene' ? 'Quatre Terres' : rk === 'brumaire' ? 'Éclosia' : REGIONS[rk].name, kind: 'world', world: 1, big: 1, reg: rk, pal: R0.pal, w: W, h: H, t, border: 'T', buildings: [], warps: [], npcs: [], signs: {}, gates: {}, guards: [], enc: {}, music: rk === 'solvene' ? 'route' : 'route2', outdoor: true, wpos: {}, plots: {}, arches: {} };
  const N1 = vnoise(hashStr(id) % 997 + 1), N2 = vnoise(hashStr(id) % 991 + 7), N3 = vnoise(hashStr(id) % 983 + 13);
  // relief
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (x < 2 || y < 2 || x >= W - 2 || y >= H - 2) { t[y][x] = 'T'; continue; }
    const f = N1(x, y, 11) * 0.7 + N1(x + 99, y + 99, 4) * 0.3, g = N2(x, y, 7), w = N3(x, y, 14);
    if (w > 0.74) t[y][x] = '~'; else if (w > 0.7) t[y][x] = 's';
    else if (f > 0.63) t[y][x] = 'T'; else if (f > 0.6 && R() < 0.5) t[y][x] = 'b';
    else if (g > 0.58) t[y][x] = '"'; else if (R() < 0.025) t[y][x] = 'f';
  }
  const carve = (x, y, ch) => { if (x < 2 || y < 2 || x >= W - 2 || y >= H - 2) return; t[y][x] = t[y][x] === '~' && ch === ',' ? '=' : ch; lock[y][x] = 1; };
  const road = (a, b) => {
    let [x, y] = a; const [x2, y2] = b, horizFirst = R() < 0.5;
    const stepX = () => { while (x !== x2) { carve(x, y, ','); carve(x, y + 1, ','); x += Math.sign(x2 - x); } };
    const stepY = () => { while (y !== y2) { carve(x, y, ','); carve(x + 1, y, ','); y += Math.sign(y2 - y); } };
    if (horizFirst) { stepX(); stepY(); } else { stepY(); stepX(); }
    carve(x, y, ','); carve(x + 1, y, ','); carve(x, y + 1, ',');
  };
  const clearArea = (x0, y0, x1, y1, ch) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (x >= 2 && y >= 2 && x < W - 2 && y < H - 2) { t[y][x] = ch || '.'; lock[y][x] = 1; } };
  const towns = R0.chain.filter((c, i) => i % 2 === 0 && !TOWNS[c].special);
  const routes = R0.chain.filter((c, i) => i % 2 === 1);
  // villes : enclos ouvert aux quatre points cardinaux
  for (const tid of towns) {
    const [cx, cy] = P(tid), rx = 6, ry = 4;
    clearArea(cx - rx - 2, cy - ry - 2, cx + rx + 3, cy + ry + 3);
    for (let x = cx - rx; x <= cx + rx + 1; x++) { t[cy - ry][x] = 'F'; t[cy + ry][x] = 'F'; }
    for (let y = cy - ry; y <= cy + ry; y++) { t[y][cx - rx] = 'F'; t[y][cx + rx + 1] = 'F'; }
    const open = { n: [cx, cy - ry], s: [cx, cy + ry], w: [cx - rx, cy], e: [cx + rx + 1, cy] };
    const out = { n: [cx, cy - ry - 1], s: [cx, cy + ry + 1], w: [cx - rx - 1, cy], e: [cx + rx + 2, cy] };
    const [TW, TH] = typeof cityDims === 'function' ? cityDims(tid) : [28, 22];
    const entry = { n: [[13, 0], [14, 0], 'down'], s: [[13, TH - 1], [14, TH - 1], 'up'], w: [[0, 10], [0, 11], 'right'], e: [[TW - 1, 10], [TW - 1, 11], 'left'] };
    for (const s of ['n', 's', 'w', 'e']) {
      const [ox, oy] = open[s], horiz = s === 'n' || s === 's';
      for (let k = 0; k < 2; k++) {
        const x = ox + (horiz ? k : 0), y = oy + (horiz ? 0 : k);
        t[y][x] = ','; const [tx, ty] = entry[s][k];
        map.warps.push({ x, y, to: tid, tx, ty, dir: entry[s][2] });
      }
    }
    // maisonnettes et place
    const def = TOWNS[tid];
    const houses = [[cx - rx + 2, cy - ry + 1, 3, 2], [cx + 2, cy - ry + 1, 3, 2], [cx - rx + 2, cy + 1, 3, 2]];
    if (def.gym != null) houses.push([cx + 2, cy + 1, 4, 2]);
    houses.forEach(([bx, by, bw, bh], i) => {
      for (let y = by; y < by + bh; y++) for (let x = bx; x < bx + bw; x++) t[y][x] = 'x';
      const g = i === 3 && def.gym != null;
      map.buildings.push({ x: bx, y: by, w: bw, h: bh, kind: g ? 'gym' : 'house', roof: g ? dhex(TC[GYMS[def.gym].type], 0.15) : ['#4a8a6a', '#b85a3a', '#5a7ab8', '#a87a3a'][i % 4], emblem: g ? TC[GYMS[def.gym].type] : null, door: [bx + 1, by + bh - 1] });
    });
    for (let x = cx - rx + 1; x <= cx + rx; x++) if (t[cy][x] !== 'x') { t[cy][x] = ','; }
    for (let y = cy - ry + 1; y < cy + ry; y++) if (t[y][cx] !== 'x') { t[y][cx] = ','; t[y][cx + 1] = t[y][cx + 1] === 'x' ? 'x' : ','; }
    map.npcs.push({ kind: 'npc', x: cx - 1, y: cy + ry + 2, dir: 'down', pal: PALS.guard, speaker: def.name, text: () => `Bienvenue à ${def.name}. ${def.desc ? def.desc.split(' : ').slice(1).join(' : ') : ''}` });
    map.plots[tid] = { cx, cy, out };
    map.wpos[tid] = out.s;
  }
  // chemins balisés (anciennes routes)
  for (const rid of routes) {
    const [ax, ay] = P(rid);
    clearArea(ax - 3, ay - 3, ax + 3, ay + 4);
    for (let y = ay - 1; y <= ay; y++) for (let x = ax - 1; x <= ax + 1; x++) t[y][x] = 'x';
    map.buildings.push({ x: ax - 1, y: ay - 1, w: 3, h: 2, kind: 'house', roof: '#8a8478', door: [ax, ay] });
    t[ay + 1][ax] = ',';
    const RM = getMap(rid), L = LINKS[rid], gs = L.entr.side, g = RM.gates[gs];
    const tx = gs === 'w' ? 0 : gs === 'e' ? RM.w - 1 : g.p, ty = gs === 'n' ? 0 : gs === 's' ? RM.h - 1 : g.p;
    map.warps.push({ x: ax, y: ay + 1, to: rid, tx, ty, dir: { n: 'down', s: 'up', w: 'right', e: 'left' }[gs] });
    map.arches[rid] = [ax, ay + 2];
    map.wpos[rid] = [ax, ay + 2];
    const def = ROUTES[rid], lv = def.enc && def.enc.grass ? def.enc.grass.map(e => e[1]) : [5];
    map.npcs.push({ kind: 'npc', x: ax + 2, y: ay + 1, dir: 'down', pal: { h: '#6a4a2a', s: '#e0b088', c: '#8a7a5a', p: '#4a3a2a', hat: '#5a4a2a' }, speaker: 'Garde-chemin', text: () => `${def.name}. Créatures du niveau ${Math.min(...lv)} environ. ${(def.special || []).length ? "Des gens dangereux ont été vus sur ce chemin." : "Le chemin est calme, en ce moment."}` });
  }
  // routes entre les villes, plus quelques raccourcis
  for (let i = 0; i < R0.chain.length - 2; i += 2) {
    const a = R0.chain[i], r = R0.chain[i + 1], b = R0.chain[i + 2];
    const arch = map.arches[r];
    const near = (tid, to) => { const pl = map.plots[tid]; if (!pl) return null; const [cx, cy] = [pl.cx, pl.cy]; const dx = to[0] - cx, dy = to[1] - cy; return Math.abs(dx) > Math.abs(dy) ? pl.out[dx > 0 ? 'e' : 'w'] : pl.out[dy > 0 ? 's' : 'n']; };
    const pa = near(a, arch), pb = near(b, arch);
    if (pa) road(pa, arch); if (pb) road(arch, pb);
  }
  for (let i = 0; i < towns.length; i++) for (let j = i + 2; j < towns.length; j++) {
    const A = map.plots[towns[i]], B = map.plots[towns[j]];
    const d = Math.hypot(A.cx - B.cx, A.cy - B.cy);
    if (d < WS * 1.6 && R() < 0.7) road(A.out[B.cy > A.cy ? 's' : 'n'], B.out[A.cy > B.cy ? 's' : 'n']);
  }
  // zones : nom et créatures selon le chemin le plus proche
  const zoneOf = (x, y) => { let best = null, bd = 1e9; for (const r of routes) { const [ax, ay] = map.arches[r]; const d = (ax - x) ** 2 + (ay - y) ** 2; if (d < bd) { bd = d; best = r; } } return best; };
  const townOf = (x, y) => { let best = null, bd = 1e9; for (const tid of towns) { const p = map.plots[tid]; const d = (p.cx - x) ** 2 + (p.cy - y) ** 2; if (d < bd) { bd = d; best = tid; } } return best; };
  const ZC = {};
  map.zoneAt = (x, y) => { const k = (x >> 3) + ',' + (y >> 3); return ZC[k] || (ZC[k] = { r: zoneOf(x, y), t: townOf(x, y) }); };
  map.encAt = (x, y) => { const z = map.zoneAt(x, y); return (ROUTES[z.r] && ROUTES[z.r].enc) || {}; };
  map.zoneName = (x, y) => { const z = map.zoneAt(x, y); return 'Environs de ' + TOWNS[z.t].name; };
  // territoires des bandes (tracés avant le calcul des zones accessibles)
  const GPOS = {};
  GANGS.filter(g => g.reg === rk).forEach(g => {
    const pl = map.plots[g.near]; if (!pl) return;
    const cx = pl.cx + (R() < 0.5 ? -14 : 14), cy = pl.cy + (R() < 0.5 ? -8 : 8);
    clearArea(cx - 4, cy - 3, cx + 4, cy + 3, '.');
    road([cx, cy + 3], pl.out[cy > pl.cy ? 's' : 'n']);
    GPOS[g.id] = [cx, cy];
  });
  // zones accessibles à pied depuis la première ville
  const reach = newGrid(W, H, 0), WALK = new Set(['.', '"', 'f', ',', '=', 's']);
  { const st = map.plots[towns[0]].out.s, q = [st]; reach[st[1]][st[0]] = 1;
    while (q.length) { const [x, y] = q.pop(); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H || reach[ny][nx] || !WALK.has(t[ny][nx])) continue; reach[ny][nx] = 1; q.push([nx, ny]); } } }
  // emplacements libres
  const free = [];
  for (let y = 4; y < H - 4; y++) for (let x = 4; x < W - 4; x++) if ((t[y][x] === '.' || t[y][x] === '"') && !lock[y][x] && reach[y][x]) free.push([x, y]);
  const takeNear = (cx, cy, rad) => { for (let k = 0; k < 80; k++) { const x = cx + Math.round((R() - 0.5) * 2 * rad), y = cy + Math.round((R() - 0.5) * 2 * rad); if (x > 3 && y > 3 && x < W - 4 && y < H - 4 && (t[y][x] === '.' || t[y][x] === '"' || t[y][x] === ',') && reach[y][x] && !map.npcs.some(n => n.x === x && n.y === y) && !map.warps.some(w => w.x === x && w.y === y)) return [x, y]; } return null; };
  const takeAny = () => { for (let k = 0; k < 60; k++) { const p = free[Math.floor(R() * free.length)]; if (p && !map.npcs.some(n => n.x === p[0] && n.y === p[1])) return p; } return null; };
  // dresseurs itinérants
  routes.forEach((rid, ri) => {
    const def = ROUTES[rid]; if (!def.enc) return; const [ax, ay] = map.arches[rid];
    for (let k = 0; k < 3; k++) {
      const p = takeNear(ax, ay, 10); if (!p) continue;
      const cls = pick(R, def.cls), team = encTeam(R, def.enc, cls, 2);
      const npc = trainerNPC(R, cls, team, { x: p[0], y: p[1], dir: pick(R, ['down', 'left', 'right', 'up']) });
      npc.trainer.sight = 3; npc.trainer.flag = `tr:${id}:${ri}:${k}`;
      map.npcs.push(npc);
    }
  });
  // objets
  for (let k = 0; k < 16; k++) { const p = takeAny(); if (p) map.npcs.push({ kind: 'item', x: p[0], y: p[1], item: pick(R, ['superbaume', 'hyperbaume', 'supersphere', 'hypersphere', 'bonbon', 'rappel', 'maxibaume']), flag: `it:${id}:${k}` }); }
  // stèles et livres de mythologie
  for (const L of LORE_TEXTS.filter(l => l.map === id)) { const p = takeAny(); if (p) { t[p[1]][p[0]] = '.'; map.npcs.push({ kind: 'lore', x: p[0], y: p[1], lore: L.id, k: L.k }); } }
  // voyageurs
  WANDERERS.filter(w => w[0] === id).forEach(([, name, line, tod], i) => {
    const p = takeAny(); if (!p) return;
    map.npcs.push({ kind: 'npc', x: p[0], y: p[1], dir: 'down', pal: NPC_PALS[(10 + i) % NPC_PALS.length], speaker: name, text: line, wander: 2, cond: tod ? () => (tod === 'night' ? timeOfDay() === 'night' : tod === 'evening' ? timeOfDay() === 'evening' || timeOfDay() === 'night' : timeOfDay() !== 'night') : null });
  });
  // bandes : territoire, bannières, membres, chef
  GANGS.filter(g => g.reg === rk).forEach(g => {
    if (!GPOS[g.id]) return; const [cx, cy] = GPOS[g.id];
    for (const [bx, by] of [[cx - 4, cy - 3], [cx + 4, cy - 3], [cx - 4, cy + 2], [cx + 4, cy + 2]]) map.npcs.push({ kind: 'deco', x: bx, y: by, dir: 'down', draw: (x, sx, sy) => drawBanner(x, sx, sy, g.col), text: `Une bannière des ${g.name.replace(/^(Les|La|Le) /, '')}. Le tissu est usé, mais quelqu'un le recoud souvent.` });
    const lvl = gangLevel(g);
    for (let k = 0; k < 3; k++) {
      const p = takeNear(cx, cy, 3); if (!p) continue;
      const tp = pick(R, g.types);
      map.npcs.push({ kind: 'trainer', x: p[0], y: p[1], dir: pick(R, ['down', 'left', 'right']), pal: Object.assign({}, pick(R, NPC_PALS), { c: g.col }), trainer: { cls: 'gang', name: pick(R, NAMES), team: vetTeam(tp, lvl - 2, 3, g.id + k), intro: pick(R, ["Tu es sur notre territoire.", "Les " + g.name.replace(/^(Les|La|Le) /, '') + " ne reculent pas.", "Le chef ne reçoit pas les inconnus. Sauf s'ils gagnent."]), lose: "D'accord, d'accord. Le chef est au centre.", flag: `gm:${g.id}:${k}`, sight: 3, money: 60 * lvl } });
    }
    map.npcs.push({ kind: 'trainer', x: cx, y: cy, dir: 'down', pal: g.bpal, gang: g.id, trainer: { cls: 'gangboss', name: g.boss, team: vetTeam(g.types[0], lvl + 2, 5, g.id + 'boss').concat(g.id === 'drakes' ? [['draconyx', lvl + 4]] : []), intro: g.intro, lose: g.lose, flag: 'gang_' + g.id, sight: 0, money: 120 * lvl, music: 'boss' } });
    map.wpos['gang_' + g.id] = [cx, cy + 1];
  });
  return map;
}
function gangLevel(g) { const gi = TOWNS[g.near] && TOWNS[g.near].gym; const team = gi != null ? GYMS[gi].team : [[0, 20]]; return Math.max(...team.map(e => e[1])) + 3; }
function drawBanner(x, sx, sy, col) {
  x.fillStyle = '#4a3a2a'; x.fillRect(sx + 7, sy - 6, 2, 21);
  x.fillStyle = col; x.beginPath(); x.moveTo(sx + 9, sy - 6); x.lineTo(sx + 16, sy - 4 + Math.sin(RT.frame / 15) * 1); x.lineTo(sx + 9, sy + 2); x.fill();
  x.fillStyle = 'rgba(255,255,255,.5)'; x.beginPath(); x.arc(sx + 12, sy - 2, 1.2, 0, 7); x.fill();
}
Object.assign(TCLS, { gang: { n: 'Membre de bande', m: 50 }, gangboss: { n: 'Chef de bande', m: 120 } });

/* ---------- Villes ouvertes aux quatre vents ---------- */
const _getMapApo = getMap;
getMap = function (id) {
  if (id.startsWith('mo_')) { if (!MAPS[id]) MAPS[id] = genWorld(id); return MAPS[id]; }
  const fresh = !MAPS[id];
  const m = _getMapApo(id);
  if (fresh && m) openPatch(id, m);
  return m;
};
function openPatch(id, m) {
  const rk = REGION_OF[id]; if (!OPEN_REG[rk]) return;
  const wid = WORLD_ID(rk);
  if (TOWNS[id] && !TOWNS[id].special && m.kind === 'town') {
    const W = m.w, H = m.h, t = m.t;
    // on retire les gardes « badge » : le monde est ouvert
    m.guards = m.guards.filter(g => !/La route suivante est dangereuse/.test(g.text));
    m.npcs = m.npcs.filter(n => !(n.pal === PALS.guard && typeof n.text === 'function' && /Reviens quand|Bonne route/.test(n.text())));
    for (const s of ['n', 's', 'w', 'e']) {
      if (s === 'n') for (let y = 0; y < 2; y++) { t[y][13] = ','; t[y][14] = ','; }
      if (s === 's') for (let y = H - 2; y < H; y++) { t[y][13] = ','; t[y][14] = ','; }
      if (s === 'w') for (let x = 0; x < 2; x++) { t[10][x] = ','; t[11][x] = ','; }
      if (s === 'e') for (let x = W - 2; x < W; x++) { t[10][x] = ','; t[11][x] = ','; }
      m.gates[s] = { p: s === 'n' || s === 's' ? 13 : 10, to: wid, world: 1, town: id };
      if (id === 't0') m.guards.push({ cells: s === 'n' ? [[13, 1], [14, 1]] : s === 's' ? [[13, H - 2], [14, H - 2]] : s === 'w' ? [[1, 10], [1, 11]] : [[W - 2, 10], [W - 2, 11]], cond: () => !!G.flags.starter, text: "Attends ! Sortir sans créature, c'est de la folie. Passe d'abord au labo du Prof. Sauge !" });
    }
  } else if (ROUTES[id] && m.gates) {
    for (const s in m.gates) { const g = m.gates[s]; if (TOWNS[g.to] && !TOWNS[g.to].special) Object.assign(g, { to: wid, world: 1, route: id }); }
  }
}
const _gateExitBase = gateExit;
gateExit = async function (side, k) {
  const g = RT.map.gates[side];
  if (!g || !g.world) return _gateExitBase(side, k);
  const W = getMap(g.to);
  let x, y;
  if (g.town) { const o = W.plots[g.town].out[side]; x = o[0] + (side === 'n' || side === 's' ? k : 0); y = o[1] + (side === 'w' || side === 'e' ? k : 0); }
  else { [x, y] = W.arches[g.route]; }
  await fade(true, 150);
  await enterMap(g.to, x, y, SIDE_DIR[side] || 'down');
  await fade(false, 150);
};

/* ---------- Rendu par blocs du grand continent ---------- */
const CHUNK = 16, CHUNK_CACHE = new Map();
function chunkCanvas(m, cx, cy, f) {
  const key = HD + ':' + m.id + ':' + cx + ':' + cy + ':' + f;
  if (CHUNK_CACHE.has(key)) { const c = CHUNK_CACHE.get(key); CHUNK_CACHE.delete(key); CHUNK_CACHE.set(key, c); return c; }
  const px = CHUNK * TS * HD, c = mkCanvas(px, px), x = c.getContext('2d');
  x.scale(HD, HD); x.translate(-cx * CHUNK * TS, -cy * CHUNK * TS);
  const x0 = cx * CHUNK, y0 = cy * CHUNK, x1 = Math.min(m.w, x0 + CHUNK), y1 = Math.min(m.h, y0 + CHUNK);
  for (let y = y0; y < y1; y++) for (let xx = x0; xx < x1; xx++) x.drawImage(tileHD(m.t[y][xx], m.pal, hashStr(xx + ',' + y) % 4, f), xx * TS, y * TS, TS, TS);
  softenEdges(x, m, getPal(m.pal), x0, y0, x1, y1);
  for (const b of m.buildings) if (b.x < x1 + 1 && b.x + b.w > x0 - 1 && b.y < y1 + 1 && b.y + b.h > y0 - 1) drawBuilding(x, b);
  CHUNK_CACHE.set(key, c);
  while (CHUNK_CACHE.size > (HD >= 4 ? 16 : 48)) CHUNK_CACHE.delete(CHUNK_CACHE.keys().next().value);
  return c;
}
function drawBig(x, m, camX, camY) {
  const f = Math.floor(RT.frame / 30) % 2, sz = CHUNK * TS;
  for (let cy = Math.floor(camY / sz); cy <= Math.floor((camY + 160) / sz); cy++) for (let cx = Math.floor(camX / sz); cx <= Math.floor((camX + 240) / sz); cx++) {
    if (cx < 0 || cy < 0 || cx * CHUNK >= m.w || cy * CHUNK >= m.h) continue;
    x.drawImage(chunkCanvas(m, cx, cy, f), cx * sz - camX, cy * sz - camY, sz, sz);
  }
}

/* ---------- Combat contre les chefs de bande ---------- */
const _postTrainerOW = postTrainer;
postTrainer = async function (n, tr) {
  await _postTrainerOW(n, tr);
  if (!n.gang) return;
  const g = GANGS.find(gg => gg.id === n.gang);
  for (const line of g.post) await say(line, { speaker: line.startsWith('(') ? undefined : g.boss });
  const c = gangCount(g.reg);
  await say(`${g.name} reconnaissent ta force. Bandes apaisées dans cette région : ${c}/4.`);
  if (c === 4) await say(g.reg === 'solvene' ? "Toutes les bandes des Quatre Terres ont baissé les armes. La médiatrice Inès, à Mousselande, voudra te voir." : "Toutes les bandes d'Éclosia ont baissé les armes. La médiatrice Anouk, à Valmont, voudra te voir.");
};

/* ---------- Médiatrices, crieurs et habitants des villes ---------- */
const CRIER = {
  early: ["Oyez ! Les Crocs du Moulin ont encore pillé une ferme près de Clairsemis !", "Oyez ! La Marée Basse fait monter le prix de l'eau douce à Port-Corail !", "Oyez ! Un dresseur de Bourg-Aurore est revenu après cinq ans. On dit qu'il a battu un champion."],
  mid: ["Oyez ! On a vu des caisses marquées d'un « R » dans les entrepôts de l'Éclipse !", "Oyez ! Les Drakes ont survolé Givrecime en formation de deuil. Un vieux dragon est malade.", "Oyez ! Les Lanternes Rouges offrent le thé à qui en a besoin, ce soir, au marché de nuit."],
  late: ["Oyez ! Les bandes ont signé une trêve ! Du jamais-vu depuis la Germination !", "Oyez ! Le Champion des Quatre Terres a été vu en Éclosia, avec une femme aux cheveux bleus. Ils se tenaient la main.", "Oyez ! Maître Ronce aurait été aperçu en train de planter des arbres. Personne n'y croit."],
};
const _townExtrasApo = townExtras;
townExtras = function (id, map, spots, R) {
  _townExtrasApo(id, map, spots, R);
  const rk = REGION_OF[id]; if (!OPEN_REG[rk]) return;
  const take = () => spots.splice(Math.floor(R() * spots.length), 1)[0];
  const s = take();
  if (s) map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: { h: '#6a3a22', s: pick(R, ['#f2c9a0', '#c68a5e', '#7a4a32']), c: '#c8a040', p: '#4a3a2a', hat: '#8a2a2a' }, speaker: 'Crieur', text: () => { const set = G.flags.ending ? CRIER.late : (G.flags.arrivedB || gangCount('solvene') >= 2) ? CRIER.mid : CRIER.early; return pick(Math.random, set); } });
  if (id === 't2') map.npcs.push({ kind: 'npc', x: 16, y: 8, dir: 'down', pal: { h: '#1a1a1a', s: '#a0694a', c: '#e8e2d0', p: '#3a3a4a', style: 'curly' }, script: 'mediation', data: 'solvene', speaker: 'Inès, médiatrice' });
  if (id === 'u3') map.npcs.push({ kind: 'npc', x: 16, y: 8, dir: 'down', pal: { h: '#e8e8e8', s: '#7a4a32', c: '#6a5a8a', p: '#2a2a3a', style: 'scarf', hat: '#c8a040' }, script: 'mediation', data: 'brumaire', speaker: 'Anouk, médiatrice' });
};
SCRIPTS.mediation = async function (n) {
  const rk = n.data, c = gangCount(rk), who = n.speaker.split(',')[0];
  const names = GANGS.filter(g => g.reg === rk).map(g => `${g.name}${gangDone(g.id) ? ' (apaisés)' : ''}`).join(', ');
  if (c < 4) return say(`Quatre bandes se disputent ${rk === 'solvene' ? 'les Quatre Terres' : 'Éclosia'} : ${names}. Leurs territoires sont hors des villes. Si leurs chefs te respectent, ils m'écouteront. (${c}/4)`, { speaker: who });
  if (!G.flags['treve_' + rk]) {
    G.flags['treve_' + rk] = 1;
    await story(rk === 'solvene' ? [
      { pic: 'village', t: "Sur la place de Mousselande, quatre chefs de bande s'assoient à la même table pour la première fois. Rocco, Sel, Madame Lune, Vael." },
      FACE('Nova', "Ils ont tous la même tête que des gamins qu'on aurait grondés. C'est presque mignon."),
      { pic: 'village', t: "Inès pose quatre lettres sur la table. Toutes signées « R ». Toutes promettant de l'argent pour semer le désordre près des sanctuaires." },
      { pic: 'village', t: "Le silence dure longtemps. Puis Vael déchire la sienne. Les autres l'imitent. La trêve des Quatre Terres est signée avec de l'encre, du thé, et un peu de rancune." },
    ] : [
      { pic: 'lantern', t: "À Valmont, au bord des canaux, Sorrel, Mako, Hilde et Frère Silence se font face. Anouk a posé une lanterne au centre de la table." },
      FACE('Nova', "Mako m'a écrit. Il est là. Il ne me regarde pas. Il a les yeux rouges."),
      { pic: 'lantern', t: "Hilde sort la commande signée « R » : mille colliers de contrôle pour Éclos. Sorrel la reconnaît. C'est l'écriture de Ronce. Celle qui lui écrivait des mots doux, enfant, quand il était malade." },
      FACE('Nova', "Il a utilisé tout le monde. Les bandes, l'Éclipse, Somnis. Et nous. Je ne sais plus si je le hais ou si j'ai pitié."),
      { pic: 'lantern', t: "Frère Silence parle enfin à voix haute, pour la première fois depuis dix ans : « Alors nous chanterons autre chose. » La trêve d'Éclosia est scellée." },
    ]);
    addItem('bonbon', 5); sfx('badge'); await say("Tu reçois 5 Bonbons Éveil. Les bandes deviennent des alliées : leurs membres te salueront désormais.");
    return;
  }
  return say("Les bandes tiennent la trêve. Pour l'instant. La paix, c'est un combat qu'on gagne tous les matins.", { speaker: who });
};

/* ---------- Vie ambiante sur le continent ---------- */
const RECENT = [];
const _enterMapOW = enterMap;
enterMap = async function (id, ...rest) {
  const prev = RT.map && RT.map.id;
  RECENT.unshift(id); while (RECENT.length > 4) { const old = RECENT.pop(); if (!RECENT.includes(old) && MAPS[old] && MAPS[old].layers && !MAPS[old].big) MAPS[old].layers = null; }
  const r = await _enterMapOW(id, ...rest);
  const m = RT.map;
  if (m && m.world && prev !== id && Math.random() < 0.35) setTimeout(() => {
    if (RT.busy || RT.map !== m || UI.stack.length) return;
    const pool = AMBIENT.any.concat(timeOfDay() === 'night' ? AMBIENT.night : [], AMBIENT.gang);
    run(() => say(pick(Math.random, pool), { auto: 2200 }));
  }, 1400);
  return r;
};

/* ---------- GPS dans le monde ouvert ---------- */
const _gpsRouteOW = gpsRoute;
gpsRoute = function () {
  const m = RT.map;
  if (m.kind === 'int') return _gpsRouteOW();
  const cur = m.world ? null : m.id, rk = m.world ? m.reg : REGION_OF[cur];
  if (!OPEN_REG[rk] || (!m.world && !TOWNS[cur] && !ROUTES[cur]) || (cur && TOWNS[cur] && TOWNS[cur].special)) return _gpsRouteOW();
  const goal = MAIN_REG[rk] ? gpsGoal() : null;
  if (!goal || !goal.map) return _gpsRouteOW();
  let target = goal.map;
  if (SPECIAL_RET[target]) target = SPECIAL_RET[target].map;
  if (target === 'u9') target = 's9';
  const trg = REGION_OF[target];
  if (trg !== rk) { if (!(MAIN_REG[rk] && MAIN_REG[trg]) || !OPEN_REG[trg]) return _gpsRouteOW(); target = rk === 'solvene' ? 't3' : 'u0'; }
  if (target === cur) return _gpsRouteOW();
  const W = getMap(WORLD_ID(rk));
  if (m.world) { const p = W.wpos[target]; return { txt: goal.txt, pt: p || null, label: `Vers ${(TOWNS[target] || ROUTES[target] || {}).name || target}` }; }
  // en ville ou sur un chemin : rejoindre le continent par la sortie la plus logique
  const tp = W.wpos[target], here = TOWNS[cur] ? W.plots[cur] : null;
  let best = null, bd = 1e9;
  for (const s in m.gates) {
    const g = m.gates[s]; if (!g.world) continue;
    let d = 0;
    if (here && tp) { const o = here.out[s]; d = (o[0] - tp[0]) ** 2 + (o[1] - tp[1]) ** 2; }
    else { const p = gateXY(m, s); d = (p[0] - RT.P.x) ** 2 + (p[1] - RT.P.y) ** 2; }
    if (d < bd) { bd = d; best = s; }
  }
  return { txt: goal.txt, pt: best ? gateXY(m, best) : null, label: 'Sortie vers le continent' };
};
