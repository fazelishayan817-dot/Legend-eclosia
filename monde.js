'use strict';
/* ============================================================
   ÉCLOSIA — Rêve d'Oniris, zones secrètes, voyage dans le temps,
   habitants nommés, Nova au bout du Lien, Bibliothèque
   ============================================================ */

/* ---------- Palettes ---------- */
MPAL.reve = { g: '#b8a8e8', g2: '#a898d8', g3: '#d0c4f4', p: '#f4e8ff', p2: '#e0d0f4', tr: '#7a5ab8', tr2: '#5a3a98', tr3: '#c8a8f8', trk: '#4a3a6a', ol: '#1a1030', w: '#8ab8f8', w2: '#d8e8ff', tg: '#9a88d8', tg2: '#7a68b8', s: '#f8f0ff', rk: '#a8a0c8' };
MPAL.ruine = { g: '#7a8a7e', g2: '#6a7a70', g3: '#8a9a8e', p: '#b8b0a0', p2: '#a09888', tr: '#3e5a4a', tr2: '#2e4a3a', tr3: '#5a7a6a', trk: '#3a3028', ol: '#141c18', w: '#3a6a88', w2: '#7aa8c8', tg: '#5a7a5e', tg2: '#4a6a4e', s: '#c8c0a8', rk: '#8a8a88' };
MPAL.tour = { g: '#c8c0a8', g2: '#b8b098', g3: '#d8d0b8', p: '#e8dcc0', p2: '#d4c8a8', tr: '#6a7aa8', tr2: '#4a5a88', tr3: '#a8b8e8', trk: '#5a4a3a', ol: '#1a1a28', w: '#5a8ad8', w2: '#b8d0ff', tg: '#a8a088', tg2: '#888068', s: '#f0e8d0', rk: '#9a9aa8' };
MPAL.passe = { g: '#c8c08a', g2: '#b8b07a', g3: '#d8d09a', p: '#ecdcb0', p2: '#dccca0', tr: '#7a8a50', tr2: '#5a6a3a', tr3: '#a8b070', trk: '#6a5038', ol: '#2a2418', w: '#7aa8b0', w2: '#c8dcd8', tg: '#a8a06a', tg2: '#888050', s: '#f0e4c0', rk: '#a89e88' };

/* ---------- Régions ---------- */
Object.assign(REGIONS, {
  reve: { name: "Rêve d'Oniris", pal: 'reve', chain: ['d0', 'e1', 'd1', 'e2', 'd2'], dirs: ['e', 'n'], gymBase: 16, noFly: 1 },
  ruine: { name: 'Nacre en ruine', pal: 'ruine', chain: ['z0'], dirs: [], gymBase: 16 },
  racines: { name: 'Profondeurs de la Graine', pal: 'abysse', chain: ['z1'], dirs: [], gymBase: 16 },
  tour: { name: "Tour d'Elio", pal: 'tour', chain: ['z2'], dirs: [], gymBase: 16 },
  echos: { name: 'Grotte des Échos', pal: 'grotte', chain: ['z3'], dirs: [], gymBase: 16 },
  passe: { name: 'Bourg-Aurore · il y a cinq ans', pal: 'passe', chain: ['p0'], dirs: [], gymBase: 16, noFly: 1 },
});
for (const rk of ['reve', 'ruine', 'racines', 'tour', 'echos', 'passe']) {
  const R = REGIONS[rk];
  R.chain.forEach(id => { REGION_OF[id] = rk; LINKS[id] = LINKS[id] || {}; });
  for (let k = 0; k < R.dirs.length; k++) {
    const A = R.chain[2 * k], RT_ = R.chain[2 * k + 1], B = R.chain[2 * k + 2], d = R.dirs[k];
    LINKS[A].exit = { side: d, to: RT_ }; LINKS[RT_].entr = { side: OPP[d], to: A };
    LINKS[RT_].exit = { side: d, to: B }; LINKS[RT_].dir = d; LINKS[B].entr = { side: OPP[d], to: RT_ };
  }
}

Object.assign(TOWNS, {
  d0: { name: 'Bourg-Sommeil', layout: { NW: 'center', NE: 'house', SW: 'pond', SE: 'house2' }, desc: "Bourg-Sommeil : ici, tout le monde dort et sourit.",
    lines: ["Chut... Si tu parles trop fort, tu vas te réveiller. Ou pire : les réveiller, eux.", "Dans le rêve d'Oniris, il n'y a pas eu de Germination. Personne n'est mort. Personne n'a grandi non plus.", "Les maisons changent de couleur quand on ne les regarde pas. On s'habitue."],
    house: { text: "Tu n'es pas d'ici. Ici, personne n'a faim. Tiens, prends ça pour le monde réel.", gift: ['maxibaume', 3] } },
  d1: { name: 'Cité des Berceuses', layout: { NW: 'center', NE: 'shop', SW: 'house', SE: 'pond' }, desc: "Cité des Berceuses : les rues chantent toutes seules.",
    lines: ["Il y a une berceuse dans chaque pavé. Marche doucement.", "Oniris a construit ce rêve pour qu'on ne souffre plus. Il a oublié qu'on ne vivrait plus, non plus.", "J'ai rêvé que tu viendrais. Ou alors je rêve encore."],
    house: { text: "Prends ces bonbons. Ils ont le goût de ton enfance.", gift: ['bonbon', 3] } },
  d2: { name: 'Palais des Paupières', layout: { NW: 'center', NE: 'none', SW: 'house', SE: 'pond' }, desc: "Palais des Paupières : le cœur du rêve.",
    lines: ["Le palais n'a pas de porte. Juste des paupières qui s'ouvrent quand assez de gens se réveillent.", "Oniris du Rêve attend en haut. Ce n'est pas tout à fait Oniris. C'est ce qu'il voulait être, à son pire moment."],
    house: { text: "Je me suis réveillé tout seul, il y a longtemps. Depuis, j'aide les autres. Prends ça.", gift: ['hyperbaume', 4] } },
  z0: { name: 'Nacre en ruine', layout: { NW: 'none', NE: 'house', SW: 'none', SE: 'pond' }, desc: "Nacre en ruine : l'île d'Aurèle, après la vague.",
    lines: ["Personne n'habite plus ici. Je viens juste... déposer des fleurs, une fois par an.", "Les fondations des maisons sont encore là, sous la mousse. On reconnaît la forme d'un jardin."],
    house: { text: "Cette maison tient encore debout, par miracle. Quelqu'un y a laissé une boîte de graines étiquetées à la main.", gift: ['bonbon', 4] } },
  z1: { name: 'Profondeurs de la Graine', layout: { NW: 'center', NE: 'none', SW: 'none', SE: 'none' }, desc: "Profondeurs de la Graine : sous le Cœur, les racines parlent.",
    lines: ["Les racines bougent quand on ne parle pas. Elles écoutent.", "Ici, la sève remonte à l'envers. Elle remonte vers le ciel, comme si la Graine respirait encore."] },
  z2: { name: "Tour d'Elio", layout: { NW: 'center', NE: 'none', SW: 'house', SE: 'none' }, desc: "Tour d'Elio : là où le premier dresseur gardait le temps.",
    lines: ["Chaque marche de la tour correspond à une année. Il y en a mille.", "En haut, une horloge sans aiguilles. On dit qu'elle montre le moment dont tu as le plus besoin."],
    house: { text: "Elio aimait les visiteurs. Il en a eu sept en mille ans. Prends ce qu'il a laissé pour le huitième.", gift: ['hypersphere', 6] } },
  z3: { name: 'Grotte des Échos', layout: { NW: 'center', NE: 'none', SW: 'none', SE: 'pond' }, desc: "Grotte des Échos : chaque cri revient changé.",
    lines: ["Crie ton nom. La grotte te répondra avec celui que tu portais enfant.", "Un ermite vit au fond. Il dit qu'il entend encore les Quatre Terres avant leur séparation."] },
  p0: { name: 'Bourg-Aurore (il y a cinq ans)', layout: { NW: 'center', NE: 'house2', SW: 'house', SE: 'pond' }, desc: "Bourg-Aurore, il y a cinq ans. Rien n'a encore commencé.",
    lines: ["Tu connais la nouvelle ? Le petit de la maison d'en face part demain. Cinq ans d'études, dans une autre région !", "Le Prof. Sauge a encore oublié de dormir. Il dit que la Graine-Monde lui parle en rêve.", "Il fait beau. Il fait toujours beau, le jour avant un départ."],
    house: { text: "Un voyageur ? Tu ressembles à quelqu'un d'ici. Tiens, des galettes. Et ça.", gift: ['bonbon', 2] } },
});
for (const id of ['d0', 'd1', 'd2', 'z0', 'z1', 'z2', 'z3', 'p0']) { TOWNS[id].reg = REGION_OF[id]; TOWNS[id].id = id; TOWNS[id].noGym = 1; }

Object.assign(ROUTES, {
  e1: { name: 'Allée des Songes', tr: 5, cls: ['veilleur', 'archiviste', 'dresseuse'], items: ['maxibaume', 'hypersphere', 'bonbon'],
    enc: { grass: [['oursonge', 80, 83, 25], ['moutonuage', 80, 83, 25], ['libelluna', 80, 83, 20], ['lampionet', 81, 83, 15], ['spectrombre', 81, 84, 15, 'n']] } },
  e2: { name: 'Escalier des Paupières', tr: 6, cls: ['veilleur', 'archiviste', 'dresseur'], items: ['hyperbaume', 'hypersphere', 'ether'], pond: 1,
    enc: { grass: [['masquelin', 82, 85, 25], ['rainelune', 82, 85, 20], ['vesperou', 82, 85, 20], ['sylvecho', 83, 85, 20], ['gongou', 83, 85, 15]], water: [['meduline', 82, 85, 50], ['nacrelle', 82, 85, 50]] } },
});
for (const id of ['e1', 'e2']) { ROUTES[id].reg = REGION_OF[id]; ROUTES[id].id = id; }

const SECRET_ENC = {
  z0: { grass: [['nacrelle', 84, 87, 30], ['spectrolle', 84, 87, 25], ['krakelin', 85, 87, 20], ['murenoire', 85, 88, 15], ['abyssard', 86, 88, 10]] },
  z1: { grass: [['ronceloup', 86, 89, 25], ['epineant', 87, 89, 20], ['champignard', 86, 89, 25], ['fossilou', 86, 89, 15], ['obsidiane', 87, 90, 15]] },
  z3: { grass: [['cristallon', 38, 44, 30], ['gemmouche', 38, 44, 25], ['hiboulin', 38, 44, 20], ['fossilou', 40, 45, 15], ['lucioli', 38, 42, 10, 'n']] },
};

/* ---------- Dresseurs uniques ---------- */
Object.assign(STORY_TRAINERS, {
  reve_oniris: { cls: 'maitre', name: 'Oniris du Rêve', team: [['oursonge', 86], ['spectrombre', 86], ['masquelin', 87], ['lampionet', 87], ['libelluna', 88], ['moutonuage', 90]], intro: "Tu réveilles mes dormeurs un par un. Pourquoi ? Ils ne souffraient plus. Dans ce rêve, personne n'a jamais perdu personne.", lose: "... Le vrai Oniris a fini par ouvrir les yeux, n'est-ce pas ? Alors moi aussi, je peux me réveiller.", music: 'boss', hideAfter: 1, money: 15000, power: 'bloom' },
  ronce_pardon: { cls: 'veteran', name: 'Ronce', team: [['racinol', 88], ['mandracine', 88], ['cervaube', 89], ['tortumousse', 89], ['ronceloup', 90], ['epineant', 91]], intro: "Je viens ici chaque semaine. Je parle à la Graine. Elle ne répond pas. Toi, tu réponds toujours avec un combat. Alors réponds.", lose: "Merci. Je n'ai plus d'excuse pour ne pas vivre, maintenant.", music: 'boss', hideAfter: 0, money: 12000 },
  elio_tour: { cls: 'ancien', name: 'Elio', team: [['draconyx', 90], ['statuon', 89], ['glaciarde', 89], ['phenixel', 90], ['abyssard', 90], ['archipelone', 92]], intro: "Tu as monté mes mille marches. Ici, je ne suis pas un souvenir : je suis le gardien du temps. Si tu veux voir l'horloge, prouve que tu sais ce que tu y chercherais.", lose: "Bien. L'horloge s'ouvrira pour toi. Souviens-toi : on ne change rien en remontant le courant. On tient une main.", music: 'boss', hideAfter: 0, money: 0, power: 'giant' },
  ermite: { cls: 'veteran', name: 'Ermite Sorel', team: [['cristallon', 48], ['gemmouche', 48], ['fossilou', 49], ['hiboulin', 50]], intro: "Un visiteur ! Ça fait dix ans. La grotte m'a dit ton nom avant que tu entres. Battons-nous, j'ai oublié comment ça fait.", lose: "Ha ! Ça fait comme avant. Comme quand les Quatre Terres n'étaient qu'une.", music: 'trainer', hideAfter: 0, money: 3000 },
  gaetan: { cls: 'veteran', name: 'Vieux Gaëtan', team: [['baleinon', 85], ['medusoraire', 86], ['archipelone', 87], ['krakelin', 87]], intro: "J'étais en mer cette nuit-là. Je suis le seul de Nacre à être rentré. Je reviens chaque année. Et je me bats contre ceux qui viennent fouiller.", lose: "Tu ne fouilles pas. Tu te souviens. C'est différent. Va, et salue la tombe pour moi.", music: 'trainer', hideAfter: 0, money: 8000 },
  passe_moi: { cls: 'veteran', name: '{P} (il y a 5 ans)', mirror: 1, team: [], intro: "Hein ? Tu me ressembles. En plus vieux. ... Je pars demain, et je ne sais même pas pourquoi. Si tu veux me parler, bats-toi d'abord.", lose: "Tu te bats exactement comme je le ferais. Mieux, en fait. Qui es-tu ?", music: 'boss', hideAfter: 0, money: 0 },
});
const _buildTeamBase = buildTeam;
buildTeam = function (tr) {
  if (tr.mirror) return G.party.map(m => { const c = makeMon(m.sp, m.lvl, { goodIv: true, shiny: false }); return c; });
  return _buildTeamBase(tr);
};

/* ---------- Dormeurs du rêve ---------- */
const SLEEPERS = [
  ['d0', 'Joran', "Il rêve qu'il remonte ses filets pleins. Sa femme l'attend sur le quai.", "... Joran ouvre les yeux. « Elle n'est plus là. Mais ma fille, si. Merci de m'avoir réveillé. »"],
  ['d0', 'Mila', "Elle rêve d'un examen qu'elle réussit chaque nuit, encore et encore.", "« J'ai dormi combien de temps ? ... Trois ans ? Il faut que je repasse cet examen. Pour de vrai. »"],
  ['d0', 'Tom', "Il rêve qu'il a encore six ans et que la mer est gentille.", "« La mer n'est pas gentille. Mais elle n'est pas méchante non plus. Je crois que je peux vivre avec ça. »"],
  ['d0', 'Bastien', "Il rêve que sa boulangerie n'a jamais fermé.", "« Elle a fermé. Je peux en ouvrir une autre. Avec du vrai pain, cette fois. »"],
  ['d0', 'Iris', "Elle rêve qu'elle écrit à sa sœur Maren, et que Maren lui répond.", "« Maren ne répondra plus. Mais ses enfants sont vivants. Je vais aller voir Nova. »"],
  ['d1', 'Aline', "Elle rêve que la forge de son père est encore sur son île.", "« La forge est à Ferrance maintenant. Elle brûle encore. C'est déjà bien. »"],
  ['d1', 'Siri', "Elle rêve d'une île de glace où personne n'est jamais venu.", "« Le monde est venu à nous. Je vais apprendre à l'aimer. »"],
  ['d1', 'Kriss', "Il dort profondément. Il sourit. Il rêve qu'Oniris est fier de lui.", "« Oniris est fier de moi pour de vrai, maintenant. Pas parce que je dors. Parce que je me suis levé. »"],
  ['d1', 'Pépé Lou', "Il rêve qu'il danse avec sa femme à Valmont.", "« Elle dansait mieux que moi. Je vais apprendre, pour quand je la reverrai. »"],
  ['d1', 'Lina', "Elle rêve d'un monde où personne ne part jamais.", "« Les gens partent. Mais ils peuvent revenir. Toi, tu es revenu·e, non ? »"],
  ['d2', 'Garde Somnis', "Un ancien garde de l'Ordre. Il rêve qu'il protège quelqu'un.", "« J'ai endormi des gens pendant des années. Maintenant, je vais les réveiller. Un par un. »"],
  ['d2', 'Nell', "Elle rêve que sa fille n'a pas pris la mer.", "« Ma fille a allumé une lanterne pour moi, chaque année. Je vais en allumer une pour elle, à Graineval. »"],
  ['d2', 'Capitaine Rhys', "Il rêve d'une tempête qu'il traverse sans perdre personne.", "« J'ai perdu des marins. J'en sauverai d'autres. C'est comme ça qu'on navigue. »"],
  ['d2', 'Petite Ana', "Une petite fille endormie, serrant une peluche en forme de Capousse.", "« Tu m'as réveillée ! Je vais raconter à maman que j'ai vu un·e vrai·e champion·ne ! »"],
  ['d2', 'Ombre de Lierre', "Une silhouette qui ressemble au Prof. Lierre, penchée sur des racines de rêve.", "« Oh ! Je me suis endormi en recopiant les racines. Ça m'arrive. Merci. »"],
];
const wakeCount = () => SLEEPERS.filter((s, i) => G.flags['wake_' + i]).length;
const SLEEPER_PALS = [
  { h: '#6a4a2a', s: '#f0c8a0', c: '#a8c0e8', p: '#5a5a7a' }, { h: '#2a2a2a', s: '#d8a880', c: '#e8a8c8', p: '#4a4a6a', style: 'pony' },
  { h: '#c8a060', s: '#f4d0b0', c: '#c8e8a8', p: '#5a6a4a' }, { h: '#8a6a4a', s: '#e8c0a0', c: '#f4e8c8', p: '#6a5a4a', style: 'bun' },
];

/* ---------- Habitants nommés : une réplique par étape de l'histoire ---------- */
// [ville, nom, avant Éclosia, pendant Éclosia, après la fin]
const HABITANTS = [
  ['t0', 'Mamie Odette', "Tu as grandi, toi ! Cinq ans... Ta mère a gardé ta chambre exactement comme tu l'as laissée.", "Ta mère lit chaque lettre que tu envoies trois fois. La troisième fois, elle pleure. Écris plus souvent.", "Toute la ville parle de toi. Moi, je me souviens surtout de l'enfant qui volait mes cerises."],
  ['t0', 'Paul le meunier', "Le moulin a tenu, la nuit de la Germination. L'eau est montée jusqu'à la deuxième marche.", "Nova est passée me voir avant de partir. Elle m'a demandé si tu étais toujours aussi têtu·e. J'ai dit oui.", "J'ai gravé ton nom sur la poutre du moulin. À côté de celui de Nova. Ça vous va bien."],
  ['t1', 'Léon, apprenti', "Sylve m'a refusé comme apprenti. Trois fois. Je reviendrai une quatrième.", "Sylve m'a pris comme apprenti ! Il dit que tu lui as montré que les débutants peuvent surprendre.", "J'ai ma propre petite serre maintenant. Je fais pousser des Capousses. Enfin, j'essaie."],
  ['t1', 'Rosalie', "Les fleurs de Clairsemis s'ouvrent quand un dresseur gentil passe. C'est une légende. Regarde, elles s'ouvrent.", "Une jeune femme aux cheveux bleus est passée. Elle a demandé si quelqu'un t'avait vu·e. Elle rougissait.", "Les fleurs ne se ferment plus du tout, depuis la fin. Même la nuit."],
  ['t2', 'Professeur Hector', "J'étudie les fresques de Mousselande. Le grand oiseau doré, c'est Zénithar. J'en suis sûr à 82 %.", "Les fresques ont changé ! Une nouvelle silhouette est apparue, tendant la main vers la mer. Je ne comprends pas.", "La silhouette des fresques, c'est toi. Je l'ai mesurée. Elle a ta taille exacte. 97 %."],
  ['t2', 'Sacha', "Je collectionne les cailloux qui brillent. Tu en veux un ? Non ? Tant pis.", "Un homme en noir m'a acheté tous mes cailloux brillants. Il a dit qu'ils venaient du Zénith.", "J'ai rendu l'argent du monsieur en noir. Il y avait un « R » sur l'enveloppe. Je l'ai brûlée."],
  ['t3', 'Capitaine Morgane', "Je pilote le ferry pour Éclosia. Il faut le Billet pour embarquer. C'est la règle de la Ligue.", "Tu as fait la traversée dans les deux sens ! Peu de gens reviennent d'Éclosia aussi vite.", "Le ferry transporte maintenant des touristes qui veulent voir « là où tout s'est passé ». Je te dois une fortune."],
  ['t3', 'Fil, docker', "Les caisses de l'Ordre Éclipse arrivent la nuit. Moi, je ne vois rien. Je suis payé pour ne rien voir.", "J'ai arrêté de ne rien voir. J'ai témoigné. Les caisses ont arrêté d'arriver.", "Je porte des caisses de fleurs, maintenant. Pour Nacre. C'est Ronce qui les commande. Bizarre, non ?"],
  ['t4', 'Ondine', "Le registre des rêves dit qu'un·e voyageur·se viendra « de l'avenir et du passé à la fois ».", "Les dormeurs de l'Ordre Somnis se réveillent un par un. Oniris est passé s'excuser. En personne.", "J'ai lu ton nom dans le vieux registre. Écrit il y a trois cents ans. Explique-moi ça."],
  ['t4', 'Barnabé', "Je vends des oreillers. Depuis que l'Ordre Somnis est là, je ne vends plus rien. Tout le monde dort déjà.", "Les gens se réveillent ! Ils ont besoin d'oreillers neufs ! Les affaires reprennent !", "J'ai appelé mon meilleur oreiller « le Champion ». Il se vend très bien."],
  ['t5', 'Hugo le mineur', "Le volcan gronde depuis que l'Éclipse creuse. Saline dit que c'est « acceptable ».", "On a rebouché les galeries de l'Éclipse. Le volcan s'est calmé. Il ronronne, presque.", "Le volcan crache des pierres de lave en forme de cœur depuis la fin. Nova en a pris une. Pour toi, je crois."],
  ['t5', 'Juliette', "Ma sœur a rejoint l'Éclipse. Elle dit que Nox va réparer le monde.", "Ma sœur est revenue. Elle dit que Nox voulait juste que personne ne meure plus. Elle dit que c'est triste.", "Ma sœur et moi, on tient une auberge maintenant. Chambre gratuite pour toi. À vie."],
  ['t6', 'Mireille', "Les mirages du désert montrent parfois des villes qui n'existent pas. Ou pas encore.", "Hier, le mirage montrait une île avec des maisons blanches et une femme qui riait. Nacre, je crois.", "Le mirage montre maintenant un arbre sur une côte, et un vieil homme qui plante. Il a l'air apaisé."],
  ['t6', 'Fennec, conteur', "Tu veux une histoire ? Celle du premier dresseur ? Il avait une créature blessée, et...", "Je raconte maintenant l'histoire d'un·e jeune dresseur·se qui traverse la mer pour une femme aux cheveux bleus.", "Je raconte la fin de ton histoire. Mais je change toujours un détail. Pour que tu restes un mystère."],
  ['t7', 'Gunnar', "Givrecime garde ceux qui tombent. Ne monte pas sans corde.", "On a trouvé une grotte qui résonne derrière la ville. L'ermite Sorel dit qu'il t'attend.", "J'ai gravé ta silhouette dans la glace du col. Elle fond un peu chaque été. Je la regrave."],
  ['t7', 'Petra', "Givraël apparaît les nuits de grand froid. Il ne fait de mal à personne. Il regarde, c'est tout.", "Givraël est passé au-dessus de la ville hier. Il volait vers l'est, vers Éclosia.", "Givraël s'est posé sur mon toit cet hiver. Il avait l'air de chercher quelqu'un. Toi, peut-être."],
  ['t8', 'Archiviste Basile', "La bibliothèque de Pierre-Haute a perdu toutes ses archives sur Unaë. Un incendie. Ou pas.", "Nox avait volé nos archives. On les a retrouvées dans son repaire, annotées de sa main. Il cherchait une solution.", "On a ajouté une salle à la bibliothèque : « Les Écrits du Champion ». Tu as des textes à nous confier ?"],
  ['t8', 'Clémence', "La Ligue approche. Les dresseurs s'entraînent jour et nuit sur la route 9.", "Une dresseuse aux cheveux bleus a battu tout le monde sur la route 9 en une matinée. Elle te cherchait.", "Nova et toi, vous êtes sur toutes les affiches de la Ligue. Elle a demandé qu'on agrandisse ton nom."],
  ['t9', 'Gardien Edmond', "Au-delà, le Plateau de la Ligue. Seuls les détenteurs des seize badges entrent : les huit des Quatre Terres et les huit des Terres voisines.", "Le Sanctuaire du Zénith est calme depuis ta victoire. Zénithar dort. Pour de vrai, cette fois.", "Les champions passent leur vie ici. Toi, tu as choisi de voyager. C'est plus rare."],
  ['u0', 'Marie-Sève', "Bienvenue à Port-Sève ! Ici, la sève de la Graine coule dans les fontaines. Ne la bois pas.", "Les Racines fouillent les quais la nuit. Elles cherchent des « anomalies ». Comme toi, peut-être.", "Ronce plante un arbre chaque matin sur la côte. Les enfants l'aident. Il leur apprend leurs prénoms."],
  ['u0', 'Théo le passeur', "Je connais toutes les îles autour d'Éclosia. Même celles qui n'existent plus.", "Il y a une île morte au large. Nacre. Je n'y emmène personne. Pas encore.", "Tu veux voir Nacre ? Je t'emmène. Tu as le droit, maintenant. Tu fais partie de son histoire."],
  ['u1', 'Aline la forgeronne', "Ferrance est née autour de la forge de mon père. Elle brûle encore.", "J'ai forgé un ruban de métal pour Nova. Elle l'a pris en disant que c'était « pour une amie ». Menteuse.", "Je forge des pelles pour Ronce. Il en casse une par semaine. Il creuse beaucoup."],
  ['u1', 'Gaspard junior', "Mon père est champion. Moi, je veux être forgeron. On ne s'entend pas sur grand-chose.", "Mon père t'a perdu le badge et il a souri. Il ne sourit jamais. Merci.", "Je suis forgeron ET dresseur. Mon père dit que c'est ta faute. Il le dit en souriant."],
  ['u2', 'Siri', "La toundra était une île avant. Grand-mère dit que le monde est venu à nous.", "J'ai vu une femme aux cheveux bleus pleurer sur le lac gelé. Elle disait un nom. Ilan.", "Ilan et Nova sont venus patiner sur le lac. Ils riaient comme des enfants. Ils en étaient, avant."],
  ['u2', 'Vieux Bjorn', "Le froid conserve tout. Même les souvenirs qu'on voudrait perdre.", "Les Racines sont passées. Elles cherchaient un Pétale sous la glace. Je leur ai menti.", "J'ai enfin raconté à mes petits-enfants la nuit de la Germination. Ça m'a fait du bien."],
  ['u3', 'Comtesse Mirabelle', "Valmont, la cité où l'on danse pour oublier. Tu danses, toi ?", "J'ai vu Nova danser seule au bord du canal, hier soir. Elle s'est arrêtée quand je l'ai regardée.", "Bal ce soir. Nova a demandé que tu viennes. Elle a dit « s'il veut bien ». Ou « si elle veut bien ». Je ne sais plus."],
  ['u3', 'Tobias le gondolier', "Les canaux de Valmont suivent les anciennes rivières d'une île engloutie.", "Une silhouette en manteau noir prend ma gondole chaque soir. Elle descend toujours à l'atelier de Lierre.", "Le manteau noir, c'était Ronce. Il allait s'excuser auprès de Lierre. Il n'a jamais réussi. Si, une fois."],
  ['u4', 'Brune', "La vague, je l'ai combattue. On ne combat pas une vague. Je l'ai fait quand même.", "Tu m'as battue. Ça fait du bien de perdre contre quelque chose qui n'est pas une vague.", "J'ai appris à nager. À trente ans. Ne te moque pas."],
  ['u4', 'Nils', "La championne Brune ne sourit jamais. On l'aime quand même.", "La championne Brune a souri après ton combat. Toute la ville en parle.", "La championne Brune nage tous les matins. Elle dit que c'est ta faute."],
  ['u5', 'Hana', "Les érables ont rougi la nuit de la Germination. Ils ne sont jamais redevenus verts.", "Une commandante de la Racine est passée. Épine. Elle a touché un érable et elle est restée longtemps immobile.", "Un érable a reverdi. Un seul. Celui qu'Épine avait touché. Elle s'appelle Nova, en fait, non ?"],
  ['u5', 'Moine Kaito', "Les érables se souviennent pour nous. C'est ce que dit le Gardien Aoki.", "Les érables ont bruissé quand tu es passé·e. Ils ne font ça que pour les gens qui portent un deuil.", "Je médite sous l'érable vert. Il me dit que le deuil peut devenir une graine."],
  ['u6', 'Mère Hélène', "Chaque lanterne de Graineval porte un nom. La mienne porte celui de ma fille.", "Nova a allumé une lanterne. Elle n'a pas voulu me dire pour qui. Elle a juste dit : « Pour celle que j'étais. »", "Nova a éteint sa lanterne. Elle a dit qu'elle n'en avait plus besoin. Que celle qu'elle était est vivante."],
  ['u6', 'Petit Sam', "Je compte les lanternes. Il y en a 4 812. Plus une ce soir.", "Il y en a 4 813. La nouvelle est bleue.", "Il y en a 4 813. La bleue est éteinte. Mais personne ne l'enlève. On la garde, au cas où."],
  ['u7', 'Kai le surfeur', "Règle n° 1 : ne jamais tourner le dos à la mer. Règle n° 2 : lui sourire quand même.", "Nova a essayé le surf. Elle est tombée vingt fois. Elle a refusé d'arrêter. Elle t'a vu·e regarder, je crois.", "Nova surfe mieux que moi, maintenant. Je ne m'en remettrai pas."],
  ['u7', 'Lou', "Les Îles Soleil sont nées de la Germination. Avant, il n'y avait que la mer.", "Le Gardien Noa dit que tu es comme une vague : on ne t'arrête pas, on surfe avec.", "Noa a appelé sa nouvelle planche « le Champion ». Tout le monde fait ça. C'est gênant ?"],
  ['u8', 'Tavi junior', "Les volcans attendaient, dit mon père. Attendaient quoi ? Il ne sait pas.", "Les Racines fouillent les cratères. Mon père les a chassées avec trois Volcandres.", "Les volcans attendaient toi, dit mon père maintenant. Il exagère toujours."],
  ['u8', 'Cendre, ancienne Racine', "...", "J'étais dans l'Ordre Racine. Ronce m'a sauvée d'un toit, à Île-Bleue. Je l'ai suivi par reconnaissance. Ça ne suffit pas.", "J'aide Ronce à planter ses arbres. On ne parle pas beaucoup. On creuse."],
];
const habStage = () => G.flags.ending ? 2 : G.flags.arrivedB ? 1 : 0;

/* ---------- Nova au bout du Lien ---------- */
const NOVA_TOWN = {
  t1: "Clairsemis... Tu te souviens quand on volait les fraises du marché ? Non ? Moi si. Tu courais moins vite que moi.",
  t2: "Mousselande. Les fresques me donnent la chair de poule. Le grand oiseau doré a l'air triste, tu trouves pas ?",
  t4: "Mirage-Nord. Les gens d'ici notent leurs rêves. Moi, je ne raconte jamais les miens. Surtout pas à toi.",
  t5: "Cendrecap. Ça sent le soufre et l'ambition. Fais attention à l'Éclipse, ici.",
  t6: "Mirage-Sud. Un conteur m'a dit que je venais de la mer. Je lui ai dit de se mêler de ses fables.",
  t7: "Givrecime. Couvre-toi. Je ne vais pas te tenir chaud. ... Enfin, pas tout de suite.",
  t8: "Pierre-Haute. La Ligue est juste là. Si tu gagnes, je te paie un repas. Si tu perds, c'est toi qui paies.",
  t9: "Le Plateau. On y est. Respire. Je suis juste derrière toi, d'accord ?",
  u1: "Ferrance. La forgeronne m'a fait un ruban en métal. Ne pose pas de questions.",
  u2: "La toundra. J'ai rêvé d'un toit dans l'eau, cette nuit. Et d'une main qui me tenait. C'était chaud.",
  u3: "Valmont. On y danse pour oublier, paraît-il. Moi je n'ai pas envie d'oublier ce voyage.",
  u4: "Brune est championne ici. Elle s'est battue contre la vague. Je crois que je l'admire.",
  u5: "Les érables rouges... J'ai l'impression qu'ils me connaissent. C'est idiot.",
  u7: "Solmarina ! Je vais essayer le surf. Si tu ris, je te noie. Gentiment.",
  u8: "Braise-Port. Le Mont Éveil est juste derrière. Quoi qu'il se passe là-haut... reste près de moi.",
  v1: "Il y a une femme aux cheveux bleus qui garde cette ville. Elle a mes yeux. Je n'aime pas ça du tout.",
  v2: "Une résistance. Même dans le pire monde, il y a des gens qui rallument des lanternes. Ça me plaît.",
  x1: "Île-Bleue. Je... je reconnais l'odeur. Les filets. Le thé. Ne me demande pas de parler maintenant.",
  x2: "Le Prof en jeune. Il a déjà des cernes. Certaines choses ne changent jamais.",
  d0: "Tout le monde dort et sourit. C'est beau et horrible à la fois. Réveille-les. Moi, j'aurais voulu qu'on me réveille.",
  z0: "C'est ici que tout a commencé pour lui. Aurèle. Je n'arrive pas à le détester ici.",
  z1: "Les racines disent « Je suis désolée ». Moi aussi, je suis désolée pour plein de choses. On en parlera.",
  z2: "Une tour qui garde le temps. Si tu remontes dans le passé, ne me laisse pas en plan, d'accord ?",
  z3: "Crie mon nom dans la grotte. Pour voir ce qu'elle répond. ... Elle a répondu « Maren ». C'est mon vrai nom de famille.",
  p0: "C'est Bourg-Aurore, la veille de ton départ. Et c'est moi, à seize ans. Ne lui dis rien d'idiot.",
};
const NOVA_GYM = {
  0: "Premier badge ! Je l'ai eu en deux jours, moi. Mais c'est bien. Pour toi.",
  1: "Deux badges. Tu progresses. Ça m'énerve un peu, mais ça me fait plaisir aussi.",
  2: "Opaline t'a donné du fil à retordre ? Elle m'a battue trois fois. Bravo.",
  3: "Quatre badges. On est à égalité, maintenant. Ça ne va pas durer.",
  4: "Ignis a dit que tu avais du feu dans le regard. Je lui ai dit que c'était juste de l'entêtement.",
  5: "Six badges. Le Plateau se rapproche. J'ai un peu peur pour toi, tu sais.",
  6: "Bruma était coriace. Tu as gagné quand même. Évidemment.",
  7: "Huit badges. On se retrouve à la Ligue. Ne me fais pas attendre.",
  8: "Premier Pétale ! Il brille comme une larme. C'est joli et triste.",
  9: "Gaspard a souri ? Tu fais sourire tout le monde, c'est agaçant.",
  10: "La toundra est derrière toi. Moi, je suis devant. Rattrape-moi.",
  11: "Céleste dit que les étoiles t'aiment bien. Elle n'a pas tort.",
  12: "Brune t'a serré la main. Elle ne serre la main de personne.",
  13: "Aoki m'a demandé si je portais un deuil. Je ne sais pas quoi répondre.",
  14: "Noa t'a appris à surfer sur la défaite ? Moi, il m'a juste fait tomber dans l'eau.",
  15: "Le dernier badge d'Éclosia. Le Mont Éveil nous attend. Ensemble, d'accord ?",
};
function novaOk() { return !!(G && G.flags.st_rival1); }
async function novaLink(t) { if (!novaOk()) return; sfx('select'); await say(t, { speaker: 'Nova' }); }
function novaCapture(f, isNew) {
  if (!novaOk()) return null;
  const s = SP[f.sp], n = Object.keys(G.caught).length;
  if (s.stage === 'L') return `Nova (Lien) : « ${s.n} ! Tu as capturé une légende. J'en ai les mains qui tremblent. »`;
  if (f.shiny) return `Nova (Lien) : « Il a une couleur rare ! Garde-le précieusement. Comme... non, rien. »`;
  if (isNew && n % 50 === 0) return `Nova (Lien) : « ${n} espèces capturées. Le Prof va pleurer de joie. »`;
  if (isNew && SP[f.sp].types.includes('eau') && hashStr(f.sp) % 4 === 0) return `Nova (Lien) : « Une créature de la mer... Elle a l'air gentille. Je crois que la mer aussi, parfois. »`;
  return null;
}
const NOVA_CALL = [
  [() => G.flags.passeDone, ["Tu as vu la petite moi de seize ans ? Elle avait l'air si sûre d'elle. Je l'envie un peu.", "Alors c'est toi qui t'es dit de partir, il y a cinq ans ? Le temps est vraiment un drôle de bonhomme."]],
  [() => G.flags.reveDone, ["Oniris m'a dit merci pour toi. Il a dit que tu avais réveillé des gens qu'il aimait. Moi aussi, tu m'as réveillée, d'une certaine façon."]],
  [() => G.flags.couple, ["Tu manges bien, au moins ? Ne réponds pas, je sais que non.", "J'ai rêvé de nous deux, vieux, sur un banc à Bourg-Aurore. C'était bien. Ne te moque pas.", "Ilan me demande si tu es sérieux·se avec moi. Je lui ai dit de s'occuper de ses Ronceloups.", "Reviens vite. Le Lien, c'est bien. Ta voix en vrai, c'est mieux."]],
  [() => G.flags.ending, ["Le monde est calme. Bizarre, non ? On s'habitue à courir.", "Ilan et moi, on a dîné ensemble. Il a fait brûler le poisson. Comme quand on était petits."]],
  [() => G.flags.arrivedB, ["Éclosia est magnifique et étrange. Comme si j'y avais déjà vécu.", "Fais attention à l'Ordre Racine. Ils sourient trop.", "Épine me fixe à chaque fois qu'on se croise. Elle a mes yeux. Ça me fait peur."]],
  [() => true, ["Tu m'appelles déjà ? Je te manque ? ... Moi non plus. Enfin.", "Je suis sur la route 4. Je bats tout le monde. Comme d'habitude.", "N'oublie pas de soigner tes créatures. Et toi aussi, au passage."]],
];
async function novaCall() {
  const set = NOVA_CALL.find(c => c[0]())[1];
  G.flags.calls = (G.flags.calls || 0) + 1;
  await say("Le Lien grésille. Une voix familière répond...");
  await novaLink(set[G.flags.calls % set.length]);
}
for (const id in NOVA_TOWN) {
  if (MAP_EVENTS[id]) continue;
  MAP_EVENTS[id] = { flag: 'nv_' + id, cond: () => novaOk(), async run() { await say("Le Lien vibre dans ta poche."); await novaLink(NOVA_TOWN[id]); } };
}
const _postTrainerBase = postTrainer;
postTrainer = async function (n, tr) {
  await _postTrainerBase(n, tr);
  if (tr.leader != null && NOVA_GYM[tr.leader] && novaOk()) { await say("Le Lien vibre dans ta poche."); await novaLink(NOVA_GYM[tr.leader]); }
};

/* ---------- Placement dans le monde ---------- */
const _townExtrasBase = townExtras;
townExtras = function (id, map, spots, R) {
  _townExtrasBase(id, map, spots, R);
  const take = () => spots.splice(Math.floor(R() * spots.length), 1)[0];
  for (const L of LORE_TEXTS.filter(l => l.map === id)) { const s = take(); if (s) map.npcs.push({ kind: 'lore', x: s[0], y: s[1], lore: L.id, k: L.k }); }
  HABITANTS.forEach((h, i) => {
    if (h[0] !== id) return; const s = take(); if (!s) return;
    map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: NPC_PALS[(i * 5 + 3) % NPC_PALS.length], speaker: h[1], text: () => h[2 + habStage()], wander: 1 });
  });
  if (REGION_OF[id] === 'reve') {
    map.music = 'sacred';
    SLEEPERS.forEach((sl, i) => { if (sl[0] !== id) return; const ok = spots.map((q, j) => q[1] > 6 && q[1] < 19 ? j : -1).filter(j => j >= 0), k = ok.length ? ok[Math.floor(R() * ok.length)] : -1; const s = k >= 0 ? spots.splice(k, 1)[0] : take(); if (!s) return; map.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: 'down', pal: SLEEPER_PALS[i % 4], sleep: i, script: 'sleeper', data: i, speaker: sl[1] }); });
    if (id === 'd0') map.npcs.push({ kind: 'npc', x: 12, y: 13, dir: 'down', pal: PALS.oniris, script: 'retour', data: ['u6', 13, 12], speaker: 'Porte du rêve' });
    if (id === 'd2') {
      const b = storyTrainer('reve_oniris', 13, 4, 'down', PALS.oniris, 0); b.cond = () => wakeCount() >= 12; map.npcs.push(b);
      map.npcs.push({ kind: 'npc', x: 13, y: 4, dir: 'down', pal: PALS.oniris, sleep: 99, speaker: 'Oniris du Rêve', cond: () => wakeCount() < 12, text: () => `(Il dort, debout, au seuil du palais.) Les paupières restent closes. Réveille au moins 12 dormeurs : ${wakeCount()}/12.` });
      map.npcs.push({ kind: 'npc', x: 16, y: 13, dir: 'down', pal: PALS.oniris, script: 'retour', data: ['u6', 13, 12], speaker: 'Porte du rêve', cond: () => !!G.flags.reveDone });
    }
  }
  const back = { z0: ['u0', 13, 12], z1: ['sanct_nuit', 7, 14], z2: ['u9', 10, 5], z3: ['t7', 13, 12], p0: null };
  if (id in back) {
    if (id !== 'p0') map.npcs.push({ kind: 'npc', x: 12, y: 13, dir: 'down', pal: id === 'z2' ? PALS.elio : PALS.sailor, script: 'retour', data: back[id], speaker: 'Sortie' });
    if (SECRET_ENC[id]) {
      map.enc = SECRET_ENC[id];
      for (let y = 13; y < 20; y++) for (let x = 3; x < 12; x++) if (map.t[y][x] === '.' && R() < 0.75 && !map.npcs.some(n => n.x === x && n.y === y)) map.t[y][x] = '"';
      map.music = id === 'z3' ? 'cave' : 'sacred';
    }
  }
  if (id === 'z0') { const s = take(); if (s) map.npcs.push(storyTrainer('gaetan', s[0], s[1], 'down', PALS.sailor, 0)); }
  if (id === 'z1') { map.npcs.push(storyTrainer('ronce_pardon', 13, 4, 'down', PALS.ronce, 0)); map.npcs.push({ kind: 'npc', x: 16, y: 6, dir: 'left', pal: TOWN_NPCS[1].pal, speaker: 'Prof. Lierre', text: () => G.flags.st_ronce_pardon ? "Il est venu me voir après votre combat. On a bu un thé. Il chante toujours aussi faux." : "Je recopie les racines. Ronce vient chaque semaine. On ne se parle pas. Pas encore." }); }
  if (id === 'z2') {
    map.npcs.push(storyTrainer('elio_tour', 13, 4, 'down', PALS.elio, 0));
    map.npcs.push({ kind: 'npc', x: 15, y: 4, dir: 'down', pal: { h: '#d8c890', s: '#d8c890', c: '#a89860', p: '#786840', style: 'bald' }, script: 'horloge', speaker: 'Horloge', cond: () => !!G.flags.st_elio_tour });
  }
  if (id === 'z3') { const s = take(); if (s) map.npcs.push(storyTrainer('ermite', s[0], s[1], 'down', PALS.elio, 0)); }
  if (id === 'p0') {
    map.music = 'town1';
    map.npcs.push(storyTrainer('passe_moi', 14, 13, 'down', PALS[G && G.look] || PALS.player, 0));
    map.npcs.push({ kind: 'npc', x: 16, y: 13, dir: 'left', pal: PALS.rival, speaker: 'Nova, 16 ans', text: () => G.flags.st_passe_moi ? "Tu as battu... l'autre ? Vous vous ressemblez trop. C'est flippant. Bon. Je vais lui dire au revoir correctement, demain." : "Qui tu es, toi ? Tu as les yeux de quelqu'un que je connais. Bizarre. Bon, je dois battre ce crâneur avant qu'il parte." });
    map.npcs.push({ kind: 'npc', x: 9, y: 9, dir: 'down', pal: PALS.prof, speaker: 'Prof. Sauge', text: "Un voyageur ? Tu as l'air de quelqu'un qui revient de loin. Très loin. Tu veux un thé ? J'en fais toujours trop." });
    map.npcs.push({ kind: 'npc', x: 20, y: 9, dir: 'down', pal: PALS.mom, speaker: 'Maman', text: "Mon enfant part demain. Je fais semblant d'être forte. Vous avez des enfants ? Vous avez l'air... gentil·le." });
    map.npcs.push({ kind: 'npc', x: 12, y: 13, dir: 'down', pal: PALS.elio, script: 'horlogeRetour', speaker: 'Horloge' });
  }
};
const _getMapBase = getMap;
getMap = function (id) {
  const fresh = !MAPS[id];
  const m = _getMapBase(id);
  if (fresh && m) {
    if (id === 'u0') m.npcs.push({ kind: 'npc', x: 4, y: 12, dir: 'right', pal: PALS.sailor, script: 'passeur', speaker: 'Théo le passeur', cond: () => !!G.flags.ending });
    if (id === 'u6') m.npcs.push({ kind: 'npc', x: 23, y: 12, dir: 'left', pal: PALS.oniris, script: 'reveEntree', speaker: 'Oniris', cond: () => !!G.flags.ending });
    if (id === 'u9') m.npcs.push({ kind: 'npc', x: 11, y: 4, dir: 'down', pal: PALS.elio, script: 'tourElio', speaker: 'Escalier', cond: () => !!G.flags.ending });
    if (id === 'sanct_nuit') m.npcs.push({ kind: 'npc', x: 4, y: 6, dir: 'down', pal: PALS.elio, script: 'profondeurs', speaker: 'Racine', cond: () => !!G.flags.ending });
    if (id === 't7') m.npcs.push({ kind: 'npc', x: 4, y: 12, dir: 'right', pal: PALS.elio, script: 'grotte', speaker: 'Fissure' });
  }
  return m;
};

/* ---------- Scripts ---------- */
Object.assign(SCRIPTS, {
  async retour(n) { const [m, x, y] = n.data; const r = await ask("Repartir d'ici ?", ['Oui', 'Non']); if (r === 0) await warp(m, x, y, 'down'); },
  async passeur() {
    const r = await ask("Nacre. L'île d'Aurèle. Tu veux y aller ?", ['Oui', 'Non'], { speaker: 'Théo le passeur' });
    if (r !== 0) return;
    await fade(true, 500); await say("La barque glisse sur une mer étrangement calme...", { auto: 1400 }); await enterMap('z0', 13, 12, 'up'); await fade(false, 500);
    if (!G.flags.ev_z0) { G.flags.ev_z0 = 1; await story([{ pic: 'ruins', t: "Des fondations sous la mousse. Un jardin devenu forêt. Des roses bleues qui ne fanent jamais." }, FACE('Nova', "C'est ici qu'il vivait. Avec sa femme et son fils. Avant moi, avant tout ça.")]); }
  },
  async reveEntree() {
    if (!G.flags.ev_reve0) {
      G.flags.ev_reve0 = 1;
      await story([FACE('Oniris', "Champion·ne. J'ai un aveu à te faire. Le rêve que j'avais construit pour le monde... il existe encore."),
        FACE('Oniris', "Quelque part, des gens s'y sont réfugiés. Ils dorment depuis des années. Je n'arrive pas à les réveiller : ils ne m'écoutent plus."),
        FACE('Oniris', "Toi, ils t'écouteront. Tu viens d'un monde qui a continué.")]);
    }
    const r = await ask("Entrer dans le Rêve d'Oniris ?", ['Oui', 'Non'], { speaker: 'Oniris' });
    if (r !== 0) return;
    await fade(true, 600); await story([{ pic: 'dream', t: "Tu fermes les yeux. Le monde se plie comme une page. Tout devient doux, mauve et silencieux." }]);
    await enterMap('d0', 13, 12, 'down'); await fade(false, 600);
  },
  async sleeper(n) {
    const i = n.data, sl = SLEEPERS[i];
    if (G.flags['wake_' + i]) return say(sl[3], { speaker: sl[1] });
    await say(sl[2]);
    const r = await ask(`Réveiller ${sl[1]} ?`, ['Oui', 'Non']);
    if (r !== 0) return;
    if (i % 3 === 0) {
      await say("Un cauchemar s'accroche au dormeur et se jette sur toi !");
      const res = await runBattle({ kind: 'wild', foes: [makeMon(['spectrombre', 'masquelin', 'oursonge', 'lampionet', 'vesperou'][i % 5], 82, {})], env: 'sacred', music: 'battle', noCatch: true });
      if (res !== 'win') return;
    }
    G.flags['wake_' + i] = 1; sfx('item');
    await say(sl[3], { speaker: sl[1] });
    await say(`Dormeurs réveillés : ${wakeCount()} / ${SLEEPERS.length}.`);
  },
  async tourElio() {
    const r = await ask("Un escalier de lumière monte vers une tour invisible. Monter les mille marches ?", ['Oui', 'Non']);
    if (r !== 0) return;
    await fade(true, 600); await story([{ pic: 'tower', t: "Mille marches. Mille années. À chaque palier, une date gravée, et parfois un prénom." }]);
    await enterMap('z2', 13, 12, 'up'); await fade(false, 600);
  },
  async horloge() {
    if (!G.flags.ev_horloge) {
      G.flags.ev_horloge = 1;
      await story([{ pic: 'tower', t: "Une horloge sans aiguilles. Au centre, un reflet : Bourg-Aurore, un matin d'été, il y a cinq ans." },
        FACE('Elio', "C'est le jour qui a précédé ton départ. Tu n'as jamais su pourquoi tu étais parti·e, n'est-ce pas ?"),
        FACE('Elio', "Va. Tu ne pourras rien changer. Mais tu pourras peut-être comprendre.")]);
    }
    const r = await ask("Remonter le temps jusqu'à Bourg-Aurore, il y a cinq ans ?", ['Oui', 'Non'], { speaker: 'Horloge' });
    if (r !== 0) return;
    await fade(true, 700); await story([{ pic: 'past', t: "Le monde se décolore, puis se recolore en sépia. Les arbres rapetissent. Le moulin est neuf." }]);
    await enterMap('p0', 13, 12, 'down'); await fade(false, 700);
  },
  async horlogeRetour() { const r = await ask("Rentrer dans ton propre temps ?", ['Oui', 'Non'], { speaker: 'Horloge' }); if (r === 0) await warp('z2', 13, 12, 'down'); },
  async profondeurs() {
    const r = await ask("Une racine s'écarte et dévoile un passage sous l'autel. Descendre ?", ['Oui', 'Non']);
    if (r !== 0) return;
    await fade(true, 600); await story([{ pic: 'depths', t: "Sous le Cœur de la Graine, des racines luminescentes forment des mots dans une langue oubliée." }]);
    await enterMap('z1', 13, 12, 'up'); await fade(false, 600);
  },
  async grotte() {
    if (badgeCount('solvene') < 6) return say("Une fissure dans la roche. Un vent tiède en sort. Il faudrait être plus aguerri·e pour s'y glisser.");
    const r = await ask("Une fissure résonne de voix lointaines. Entrer dans la Grotte des Échos ?", ['Oui', 'Non']);
    if (r === 0) await warp('z3', 13, 12, 'down');
  },
});

Object.assign(STORY_PRE, {
  async reve_oniris() { await story([{ pic: 'dream', t: "Les paupières du palais s'ouvrent. Au sommet, un Oniris plus jeune, vêtu de nuit, berce le vide." }, FACE('Oniris', "Je suis ce qu'il voulait devenir, la nuit où il a tout perdu. Un berceau pour le monde entier.", '#1a1030', '#4a3a7a')]); },
  async ronce_pardon() { await story([{ pic: 'depths', t: "Un vieil homme est assis contre une racine, les mains pleines de terre." }, FACE('Maître Ronce', "Ne m'appelle plus Maître. Ronce suffit. Ou Aurèle, si tu es d'humeur généreuse.")]); },
  async passe_moi() { await story([{ pic: 'past', t: "Devant la maison d'en face, un·e adolescent·e de seize ans fait ses valises en traînant les pieds. C'est toi." }]); },
});
Object.assign(STORY_POST, {
  async reve_oniris() {
    G.flags.reveDone = 1;
    await story([{ pic: 'dream', t: "Le palais se dissout en plumes. Partout dans le rêve, des gens bâillent, s'étirent, et ouvrent les yeux." },
      FACE('Oniris', "Tu les as ramenés. Tous. Même celui que j'étais.", '#1a1030', '#4a3a7a'),
      FACE('Nova', "Tu sais ce qui est bizarre ? Moi aussi, j'ai l'impression de m'être réveillée. Depuis que tu es revenu·e à Bourg-Aurore.")]);
    addItem('bonbon', 5); sfx('item'); await say("Tu reçois 5 Bonbons Éveil !");
  },
  async ronce_pardon() {
    await story([FACE('Maître Ronce', "Elle s'appelait Liora. Il s'appelait Elouan. Je ne les avais plus dits à voix haute depuis dix ans."),
      FACE('Maître Ronce', "La Graine ne m'a jamais répondu. Mais toi, tu m'as écouté. C'est peut-être la même chose."),
      { pic: 'depths', t: "Les racines frémissent. Une fleur bleue s'ouvre entre les doigts du vieil homme." }]);
  },
  async elio_tour() { await say("L'horloge, derrière Elio, se met à tourner à l'envers.", { auto: 1600 }); },
  async passe_moi() {
    G.flags.passeDone = 1;
    await story([{ pic: 'past', t: "Ton toi de seize ans reprend son souffle, assis sur une valise." },
      { pic: 'past', t: "« Tu sais pourquoi je pars, toi ? » Tu réfléchis. Puis tu dis : « Va voir le monde. Tu reviendras quand Bourg-Aurore aura besoin de toi. Et quand elle aussi. »" },
      { pic: 'past', t: "Ton toi du passé regarde Nova, plus loin, qui fait semblant de ne pas écouter. Il rougit. « D'accord. Je reviendrai. »" },
      FACE('Nova', "(Dans ton temps, plus tard, au bout du Lien :) Alors c'était toi, l'étranger·e qui t'avait convaincu·e de partir ? Tu t'es manqué·e à toi-même. Et tu m'as manqué. Voilà, c'est dit.")]);
    addItem('hypersphere', 5); sfx('item'); await say("Tu reçois 5 Hyper Sphères. Le temps se referme doucement.");
  },
});

/* ---------- Images de récit ---------- */
const _drawPicSaga = drawPic;
drawPic = function (p, f) {
  const k = p.pic;
  if (k === 'dream') {
    sx.fillStyle = sGrad('#2a1a4a', '#c8b0f0'); sx.fillRect(0, 0, SW, SH);
    for (let i = 0; i < 26; i++) { sx.fillStyle = `rgba(255,255,255,${0.3 + (i % 3) * 0.2})`; sx.fillRect((i * 37 + f / 3) % SW, (i * 23 + Math.sin(f / 40 + i) * 6) % 70, 2, 2); }
    for (let i = 0; i < 5; i++) { sx.fillStyle = 'rgba(255,240,255,.35)'; sOval((i * 60 + f / 2) % (SW + 60) - 30, 80 + (i % 2) * 12, 34, 10); }
    sx.fillStyle = '#f4e8ff'; sCirc(170, 30, 14); sx.fillStyle = '#2a1a4a'; sCirc(176, 26, 12);
  } else if (k === 'ruins') {
    sx.fillStyle = sGrad('#4a6a7a', '#c0ccc8'); sx.fillRect(0, 0, SW, SH); sx.fillStyle = '#3a6a88'; sx.fillRect(0, 70, SW, 34);
    sx.fillStyle = '#6a7a6e'; sOval(114, 76, 90, 14);
    for (const [x, h] of [[60, 14], [86, 22], [130, 18], [160, 10]]) { sx.fillStyle = '#8a8a88'; sx.fillRect(x, 70 - h, 14, h); sx.fillStyle = '#4a6a4e'; sx.fillRect(x - 2, 70 - h - 3, 18, 4); }
    for (let i = 0; i < 9; i++) { sx.fillStyle = '#4a7ae8'; sCirc(70 + i * 12, 82 + (i % 2) * 3, 2.2); }
  } else if (k === 'tower') {
    sx.fillStyle = sGrad('#1a2a5a', '#a8c0f0'); sx.fillRect(0, 0, SW, SH);
    sx.fillStyle = '#d8d0b8'; sx.fillRect(98, 6, 32, 98); for (let y = 10; y < 104; y += 8) { sx.fillStyle = '#b8b098'; sx.fillRect(98, y, 32, 1); }
    sx.strokeStyle = '#f4e8c0'; sx.lineWidth = 2; sx.beginPath(); sx.arc(114, 24, 10, 0, 7); sx.stroke();
    sx.save(); sx.translate(114, 24); sx.rotate(-f / 30); sx.fillStyle = '#f4e8c0'; sx.fillRect(-1, -8, 2, 8); sx.restore(); sGlow(114, 24, 26, 'rgba(255,240,200,.4)');
  } else if (k === 'past') {
    sx.fillStyle = sGrad('#e8d4a0', '#a88a58'); sx.fillRect(0, 0, SW, SH); sx.fillStyle = '#b8a070'; sx.fillRect(0, 74, SW, 30);
    sx.fillStyle = '#8a6a48'; sx.fillRect(40, 48, 30, 26); sx.fillStyle = '#6a4a30'; sx.beginPath(); sx.moveTo(36, 50); sx.lineTo(55, 34); sx.lineTo(74, 50); sx.fill();
    sx.fillStyle = '#9a7a50'; sx.fillRect(150, 40, 8, 34); sx.save(); sx.translate(154, 40); sx.rotate(f / 50); sx.fillStyle = '#c8b080'; for (let i = 0; i < 4; i++) { sx.rotate(Math.PI / 2); sx.fillRect(-2, 0, 4, 20); } sx.restore();
    if (G) { sFig(96, 74, PALS[G.look] || PALS.player, 'right', 2); sFig(120, 74, PALS[G.look] || PALS.player, 'left', 1.6); }
    sx.fillStyle = 'rgba(80,50,20,.15)'; sx.fillRect(0, 0, SW, SH);
  } else if (k === 'depths') {
    sx.fillStyle = sGrad('#0a0a1a', '#2a2a4a'); sx.fillRect(0, 0, SW, SH);
    for (let i = 0; i < 10; i++) { sx.strokeStyle = `rgba(120,240,180,${0.3 + (i % 3) * 0.15})`; sx.lineWidth = 2; sx.beginPath(); sx.moveTo(i * 26, 0); sx.bezierCurveTo(i * 26 + 30, 40 + Math.sin(f / 30 + i) * 8, i * 22, 70, 114, SH); sx.stroke(); }
    sGlow(114, 90, 30, 'rgba(120,240,180,.5)');
  } else _drawPicSaga(p, f);
};
PORTRAITS['Ronce'] = PORTRAITS['Maître Ronce'];

/* ---------- Bibliothèque ---------- */
const LORE_BY_ID = {}; LORE_TEXTS.forEach(l => { LORE_BY_ID[l.id] = l; });
const LORE_KIND = { livre: 'Livre', journal: 'Journal', stele: 'Stèle', lettre: 'Lettre', archive: 'Archive' };
function placeName(id) { return (TOWNS[id] && TOWNS[id].name) || (ROUTES[id] && ROUTES[id].name) || id; }
function readLore(id) {
  const L = LORE_BY_ID[id];
  G.read = G.read || {};
  const first = !G.read[id]; G.read[id] = 1;
  return new Promise(res => {
    const p = el('panel lorebook', 8, 6, 224, 148); let pg = 0;
    const render = () => { p.innerHTML = `<div class="lk">${esc(LORE_KIND[L.k] || 'Écrit')} · ${esc(placeName(L.map))}</div><div class="lt">${esc(L.t)}</div><div class="lp">${esc(L.p[pg])}</div><div class="chint">${pg + 1}/${L.p.length} · A ${pg < L.p.length - 1 ? 'suite' : 'fermer'} · B fermer</div>`; };
    render(); sfx('select');
    const h = { press(b) { if (b === 'a' && pg < L.p.length - 1) { pg++; sfx('move'); render(); return; } if (b === 'a' || b === 'b') { uiPop(h); p.remove(); res(first); } } };
    uiPush(h);
  });
}
async function talkLore(n) {
  const first = await readLore(n.lore);
  if (first) { const c = Object.keys(G.read).length; await say(`Écrit ajouté à la Bibliothèque (${c}/${LORE_TEXTS.length}).`); if (c === LORE_TEXTS.length) { addItem('bonbon', 10); sfx('badge'); await say("Tu as tout lu. Quelque part, un vieil homme aux cheveux blancs sourit. Tu reçois 10 Bonbons Éveil."); } }
}
function libraryScreen() {
  return new Promise(res => {
    G.read = G.read || {};
    const list = LORE_TEXTS.filter(l => G.read[l.id]);
    const p = el('panel codex', 0, 0, 240, 160); let sel = 0, top = 0; const rows = 11;
    const render = () => {
      if (sel < top) top = sel; if (sel >= top + rows) top = sel - rows + 1;
      const L = list[sel];
      p.innerHTML = `<div class="cl"><div class="ptitle">Bibliothèque · ${list.length}/${LORE_TEXTS.length}</div>${list.length ? list.slice(top, top + rows).map((l, j) => `<div class="mi${top + j === sel ? ' sel' : ''}"><span>${esc(l.t)}</span></div>`).join('') : '<div class="mi"><span>Aucun écrit pour l\'instant.</span></div>'}</div>
        <div class="cr">${L ? `<div class="cn">${esc(LORE_KIND[L.k])}</div><p>${esc(placeName(L.map))}</p><p>${esc(L.p[0].slice(0, 90))}...</p><p>A : lire</p>` : '<p>Livres, journaux, stèles et lettres sont cachés dans tous les mondes.</p>'}</div>`;
    };
    render();
    const h = { async press(b) {
      if (b === 'b') { sfx('cancel'); uiPop(h); p.remove(); res(); return; }
      if (!list.length) return;
      if (b === 'up') sel = (sel - 1 + list.length) % list.length; else if (b === 'down') sel = (sel + 1) % list.length;
      else if (b === 'a') { uiPop(h); await readLore(list[sel].id); uiPush(h); }
      sfx('move'); render();
    } };
    uiPush(h);
  });
}
function drawLoreObj(x, n, sx, sy) {
  const unread = !(G.read && G.read[n.lore]);
  if (n.k === 'stele') {
    x.fillStyle = '#4a4a52'; x.fillRect(sx + 3, sy - 2, 10, 15); x.fillStyle = '#8a8a96'; x.fillRect(sx + 4, sy - 1, 8, 13);
    x.fillStyle = '#6a6a76'; for (let i = 0; i < 4; i++) x.fillRect(sx + 5, sy + 1 + i * 3, 6, 1);
  } else {
    x.fillStyle = '#5a3a22'; x.fillRect(sx + 7, sy + 5, 2, 9); x.fillRect(sx + 4, sy + 13, 8, 2);
    x.fillStyle = '#7a5232'; x.fillRect(sx + 2, sy + 2, 12, 4);
    x.fillStyle = n.k === 'lettre' ? '#f4ecd8' : n.k === 'archive' ? '#3a3a5a' : n.k === 'journal' ? '#6a2a2a' : '#2a5a3a'; x.fillRect(sx + 3, sy, 10, 4);
    x.fillStyle = '#f4ecd8'; x.fillRect(sx + 7, sy, 1, 4);
  }
  if (unread) { const a = 0.5 + Math.sin(RT.frame / 12) * 0.4; x.fillStyle = `rgba(255,240,150,${a})`; x.fillRect(sx + 7, sy - 6, 2, 2); x.fillRect(sx + 6, sy - 5, 4, 1); }
}
function drawSleep(x, n, sx, sy) {
  if (G.flags['wake_' + n.sleep]) return;
  x.font = 'bold 8px monospace'; x.lineWidth = 2; x.strokeStyle = '#2a1a4a'; x.fillStyle = '#ffffff';
  const k = (RT.frame / 30) % 3;
  for (let i = 0; i < 3; i++) if (i <= k) { x.globalAlpha = 1 - i * 0.2; x.strokeText('z', sx + 12 + i * 3, sy - 4 - i * 5); x.fillText('z', sx + 12 + i * 3, sy - 4 - i * 5); }
  x.globalAlpha = 1;
}
HINTS.reve = ["Ici, les arbres poussent vers le bas quand personne ne regarde.", "Si tu entends ton nom murmuré, ne te retourne pas. C'est juste le rêve qui s'ennuie.", "Les dresseurs du rêve combattent en dormant. Ils sont redoutables.", "Le Palais des Paupières est au nord. Il ne s'ouvre que quand assez de dormeurs sont réveillés."];
HINTS.ruine = ["Les murs gardent l'odeur de la mer.", "Quelqu'un a nettoyé cette maison récemment. Ronce, peut-être."];
HINTS.racines = ["Les racines chuchotent. Ne réponds pas trop vite."];
HINTS.tour = ["Mille marches. Tu en as monté combien ? Toutes. Bravo.", "Elio rangeait ses souvenirs par saison."];
HINTS.echos = ["L'écho répète ton nom avec la voix d'un enfant."];
HINTS.passe = ["Il fait beau. Il fait toujours beau, le jour avant un départ.", "Ta mère a préparé une valise trop lourde. Elle le sait."];
