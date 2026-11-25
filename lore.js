'use strict';
/* Bibliothèque : livres, journaux, stèles et lettres à trouver */
const LORE_TEXTS = [
 {
  "id": "aur1",
  "map": "x0",
  "k": "journal",
  "t": "Carnet d'Aurèle, n° 1",
  "p": [
   "Jour 1. Liora dit que je parle plus aux graines qu'aux gens. Elle n'a pas tort. Mais les graines, au moins, ne me demandent pas quand je vais réparer le toit.",
   "Elouan a planté son premier haricot aujourd'hui. Il l'a appelé « Capitaine ». Il a deux ans et demi. Je crois que je n'ai jamais été aussi fier de quoi que ce soit."
  ]
 },
 {
  "id": "aur2",
  "map": "x0",
  "k": "journal",
  "t": "Carnet d'Aurèle, n° 2",
  "p": [
   "Les pêcheurs ont remonté une graine dans leurs filets, à six cents mètres de profondeur. Grosse comme un melon, chaude comme une main. Personne n'en veut. Je l'ai ramenée à la maison.",
   "Liora a ri en la voyant. « Encore une ? » Oui, mais celle-ci respire. Je le jure. Quand je pose l'oreille dessus, j'entends quelque chose. Comme une mer, mais à l'intérieur."
  ]
 },
 {
  "id": "aur3",
  "map": "x2",
  "k": "journal",
  "t": "Carnet d'Aurèle, n° 3",
  "p": [
   "J'ai écrit à Sauge et à Lierre. Ils sont arrivés le lendemain, ce qui prouve qu'ils n'avaient rien de mieux à faire. Nous avons installé l'atelier sur l'îlot entre Nacre et Île-Bleue.",
   "Sauge pense qu'il faut prévenir les autorités des Six Îles. Lierre pense qu'il faut d'abord comprendre. Moi, je pense qu'il faut lui donner un nom. Je l'appelle « Petite »."
  ]
 },
 {
  "id": "aur4",
  "map": "x2",
  "k": "journal",
  "t": "Carnet d'Aurèle, n° 4",
  "p": [
   "Petite pousse. Lentement. Nous l'avons rendue à la mer, dans le Gouffre, là où on l'a trouvée. Elle y était mieux. Elle a besoin de pression, d'obscurité, de froid.",
   "Lierre a mesuré une onde qui part du Gouffre toutes les nuits à la même heure. Sauge dit que c'est un battement de cœur. Je n'aime pas quand Sauge dit des choses poétiques. Ça veut dire qu'il a peur."
  ]
 },
 {
  "id": "aur5",
  "map": "x3",
  "k": "journal",
  "t": "Carnet d'Aurèle, n° 5",
  "p": [
   "La mer est trop calme. Les créatures marines ont quitté la côte depuis trois jours. Les pêcheurs rentrent bredouilles et disent que l'eau « ne veut pas d'eux ».",
   "Ce matin, une étrangère est venue me parler. Elle disait que la mer allait se lever cette nuit. Elle avait l'air de savoir. Je lui ai offert à dîner. Je n'ai rien fait d'autre. Pourquoi est-ce que je n'arrive pas à oublier son regard ?"
  ]
 },
 {
  "id": "aur6",
  "map": "z0",
  "k": "journal",
  "t": "Carnet d'Aurèle, page déchirée",
  "p": [
   "Il n'y a plus de Nacre. Il n'y a plus de maison. Il n'y a plus de Liora. Il n'y a plus d'Elouan. Il y a une montagne là où était la mer et un arbre là où était mon fils.",
   "Petite a germé. Elle a soudé les îles. Elle a fait naître des créatures merveilleuses. Et elle a tout pris. Comment une chose peut-elle être un miracle et un meurtre à la fois ?"
  ]
 },
 {
  "id": "aur7",
  "map": "z0",
  "k": "journal",
  "t": "Carnet d'Aurèle, sans date",
  "p": [
   "Sauge m'a écrit. Il a recueilli une petite fille aux cheveux bleus, repêchée sur une plage des Quatre Terres. Il dit qu'une silhouette la lui a tendue. Il veut que je vienne. Je ne viendrai pas.",
   "J'ai trouvé deux enfants sur un toit, à Île-Bleue. Un garçon et sa sœur. Non. Juste le garçon. La sœur, je l'ai cherchée trois jours. Ilan dit qu'elle est morte. Il ne pleure pas. Je lui ai promis un but."
  ]
 },
 {
  "id": "aur8",
  "map": "z1",
  "k": "journal",
  "t": "Carnet de Maître Ronce, 1",
  "p": [
   "Je ne m'appelle plus Aurèle. Aurèle était un homme qui laissait les choses pousser. Je suis la ronce qui pousse là où rien ne devrait.",
   "Si la Graine peut germer une fois, elle peut germer encore. Il faut quelqu'un pour la tenir. Il faut une main assez dure pour ne jamais lâcher. Je serai cette main."
  ]
 },
 {
  "id": "aur9",
  "map": "z1",
  "k": "journal",
  "t": "Carnet de Maître Ronce, 2",
  "p": [
   "Nox veut un maître pour le monde. Oniris veut un monde qui dort. Je leur ai écrit à tous les deux. Je signe « R ». Ils ne se doutent de rien. Les gens qui veulent quelque chose très fort ne regardent jamais qui leur tend la main.",
   "Il me faut un champion. Quelqu'un d'assez fort pour réveiller le Zénith et réunir les Pétales. Quelqu'un d'assez naïf pour croire que c'est sa propre aventure."
  ]
 },
 {
  "id": "aur10",
  "map": "z1",
  "k": "journal",
  "t": "Carnet de Maître Ronce, 3",
  "p": [
   "Le champion est arrivé à Port-Sève. Avec Nova. La petite aux cheveux bleus. Celle que j'ai cherchée trois jours sur les toits d'Île-Bleue. Elle est vivante. Elle a toujours été vivante.",
   "Ilan ne doit pas le savoir. Pas encore. ... Pourquoi est-ce que mes mains tremblent ? Je n'ai pas tremblé depuis dix ans."
  ]
 },
 {
  "id": "aur11",
  "map": "u0",
  "k": "lettre",
  "t": "Lettre de Ronce (après tout)",
  "p": [
   "Champion·ne, je plante un arbre chaque matin sur la côte. J'ai planté le trois-cent-douzième aujourd'hui. Je ne sais pas si ça compense quoi que ce soit. Probablement pas.",
   "Une étrangère m'avait prévenu, cette nuit-là. Elle avait ta voix. Je ne sais pas comment c'est possible, et je ne veux pas le savoir. Je voulais juste te dire : je t'ai crue, finalement. Trop tard. Mais je t'ai crue."
  ]
 },
 {
  "id": "lame1",
  "map": "v0",
  "k": "journal",
  "t": "Journal de la Lame Bleue, 1",
  "p": [
   "Le Roi m'a trouvée sur un toit, à onze ans. Il m'a dit : « La mer ne te reprendra jamais. » Il a tenu parole. La mer ne reprend plus personne, ici. Elle n'ose pas.",
   "Ilan dit que je suis devenue dure. Il a raison. Mais dure, c'est mieux que noyée."
  ]
 },
 {
  "id": "lame2",
  "map": "v1",
  "k": "journal",
  "t": "Journal de la Lame Bleue, 2",
  "p": [
   "On m'appelle la Lame Bleue. Les enfants baissent les yeux quand je passe. Avant, je voulais que les gens me regardent. Maintenant, je préfère qu'ils regardent ailleurs.",
   "J'ai trouvé une lanterne cachée dans une maison. J'aurais dû la briser. Je l'ai remise sous le lit. Je n'en parlerai à personne."
  ]
 },
 {
  "id": "lame3",
  "map": "v1",
  "k": "journal",
  "t": "Journal de la Lame Bleue, 3",
  "p": [
   "Cette nuit, j'ai rêvé d'une plage que je ne connais pas. Un vieil homme en blouse blanche me portait. Quelqu'un me tenait la main. Une main chaude.",
   "Je me suis réveillée en pleurant. Ridicule. Je ne pleure jamais."
  ]
 },
 {
  "id": "lame4",
  "map": "v2",
  "k": "journal",
  "t": "Journal de la Lame Bleue, 4",
  "p": [
   "La résistance de Frimabri devient audacieuse. Oniris est avec eux. Le Roi dit de les laisser faire, qu'ils s'useront tout seuls. Je crois qu'il est fatigué.",
   "Je crois que je suis fatiguée aussi."
  ]
 },
 {
  "id": "lame5",
  "map": "v3",
  "k": "journal",
  "t": "Journal de la Lame Bleue, 5",
  "p": [
   "Un·e étranger·e est arrivé·e par la Faille. Avec... moi. Une autre moi, qui rit. Qui a des rubans rouges dans les cheveux. Qui regarde cet·te étranger·e comme si c'était la chose la plus précieuse au monde.",
   "Si j'avais été repêchée sur cette plage... est-ce que je rirais comme ça ?"
  ]
 },
 {
  "id": "ecl1",
  "map": "t3",
  "k": "archive",
  "t": "Archives de l'Éclipse, 1",
  "p": [
   "Ordre Éclipse, rapport n° 14. Les dons de notre mécène « R » sont arrivés. De quoi financer trois ans de recherches sur le Zénith. Le chef Nox est satisfait. Le chef Nox est toujours satisfait quand on lui donne de l'argent.",
   "Note manuscrite en marge : « Qui est R ? Personne ne pose la question. C'est bizarre. »"
  ]
 },
 {
  "id": "ecl2",
  "map": "t5",
  "k": "archive",
  "t": "Archives de l'Éclipse, 2",
  "p": [
   "Ordre Éclipse, rapport n° 27. Le volcan de Cendrecap repose sur une veine d'énergie du Zénith. L'Admin Saline propose d'en extraire une partie. Risque d'éruption : modéré. Risque pour la population : « acceptable ».",
   "Qui a écrit « acceptable » ? Ma sœur vit à Cendrecap. — signé : un sbire qui démissionne demain."
  ]
 },
 {
  "id": "ecl3",
  "map": "t7",
  "k": "archive",
  "t": "Archives de l'Éclipse, 3",
  "p": [
   "Ordre Éclipse, journal de Nox. Les gens ont besoin d'un maître. J'ai vu la Germination de loin, depuis les falaises. Des milliers de morts parce que personne ne tenait la barre.",
   "Si Zénithar m'obéit, plus jamais une telle catastrophe ne frappera sans que quelqu'un l'ait décidé. C'est ça, l'ordre. C'est ça, la paix."
  ]
 },
 {
  "id": "ecl4",
  "map": "t9",
  "k": "archive",
  "t": "Archives de l'Éclipse, 4",
  "p": [
   "Ordre Éclipse, dernier rapport. Le chef Nox a été vaincu au Sanctuaire du Zénith par un·e dresseur·se de Bourg-Aurore. L'Ordre est dissous.",
   "Les dernières lettres de « R » ont été brûlées. Une seule a survécu. On y lit : « Merci de m'avoir ouvert la porte. »"
  ]
 },
 {
  "id": "som1",
  "map": "t4",
  "k": "archive",
  "t": "Registre Somnis, 1",
  "p": [
   "Registre Somnis. Le sommeil est la seule paix véritable. Dans le sommeil, personne ne perd personne. Personne ne se souvient de la vague.",
   "Oniris dit que nous endormirons Zénithar, puis le monde, doucement, comme on borde un enfant."
  ]
 },
 {
  "id": "som2",
  "map": "t6",
  "k": "archive",
  "t": "Registre Somnis, 2",
  "p": [
   "Registre Somnis, témoignage de Kriss. J'ai rejoint l'Ordre après la Germination. Je ne dormais plus. Oniris m'a appris à dormir de nouveau. Je lui dois tout.",
   "Mais endormir le monde entier ? ... Je n'ose pas le dire tout haut."
  ]
 },
 {
  "id": "som3",
  "map": "t8",
  "k": "archive",
  "t": "Registre Somnis, 3",
  "p": [
   "Registre Somnis, lettre d'Oniris. Notre mécène « R » nous offre le Sanctuaire du Zénith. Il dit que l'Éclipse le veut aussi. Il faut faire vite.",
   "Note d'Oniris, plus tard, d'une écriture tremblante : « Il a écrit la même lettre à Nox. »"
  ]
 },
 {
  "id": "elio1",
  "map": "t1",
  "k": "stele",
  "t": "Stèle : le premier dresseur, I",
  "p": [
   "Légende du premier dresseur, I. Il y a mille ans, un enfant nommé Elio trouva une créature blessée au pied d'une montagne. Il la soigna sept jours et sept nuits. Au huitième jour, la créature ne partit pas.",
   "C'est ainsi, dit-on, que naquit le premier lien entre un humain et une créature."
  ]
 },
 {
  "id": "elio2",
  "map": "t2",
  "k": "stele",
  "t": "Stèle : le premier dresseur, II",
  "p": [
   "Légende du premier dresseur, II. Elio parcourut les terres avec sa compagne. Partout où il passait, il apprenait aux gens à écouter les créatures plutôt qu'à les chasser.",
   "Certains l'appelaient le Fou des Bêtes. D'autres l'appelaient l'Ami. Il répondait aux deux noms."
  ]
 },
 {
  "id": "elio3",
  "map": "t6",
  "k": "stele",
  "t": "Stèle : le premier dresseur, III",
  "p": [
   "Légende du premier dresseur, III. Un jour, deux grandes puissances se firent la guerre : la terre et l'océan. Le monde trembla. Elio grimpa au sommet du Mont Éveil et appela le ciel.",
   "Zénithar descendit et sépara les combattants. Mais pour les séparer, il dut déchirer le continent en quatre."
  ]
 },
 {
  "id": "elio4",
  "map": "t8",
  "k": "stele",
  "t": "Stèle : le premier dresseur, IV",
  "p": [
   "Légende du premier dresseur, IV. Elio forgea une couronne pour ceux qui auraient un jour à affronter plus grand qu'eux. Il la cacha au sommet du monde.",
   "« Celui qui la portera, dit-il, devra se souvenir qu'on ne devient pas grand en écrasant, mais en tenant debout. »"
  ]
 },
 {
  "id": "elio5",
  "map": "u3",
  "k": "stele",
  "t": "Stèle : le premier dresseur, V",
  "p": [
   "Légende du premier dresseur, V. Quand Elio devint vieux, il refusa de mourir avant d'avoir vu « la suite ». Les gardiens lui accordèrent de veiller au sommet du Mont Éveil, entre le rêve et le réel.",
   "On dit qu'il y attend toujours quelqu'un. Personne ne sait qui."
  ]
 },
 {
  "id": "elio6",
  "map": "u8",
  "k": "stele",
  "t": "Stèle : le premier dresseur, VI",
  "p": [
   "Légende du premier dresseur, VI. Elio disait : « Un jour, une graine viendra du fond de la mer. Elle réunira ce que Zénithar a séparé. Elle donnera la vie. Et elle demandera un prix. »",
   "« Ce jour-là, il faudra quelqu'un pour tendre la main. Pas pour prendre. Pour tendre. »"
  ]
 },
 {
  "id": "tem1",
  "map": "u0",
  "k": "livre",
  "t": "Témoignage de la Germination, 1",
  "p": [
   "Témoignage de Joran, pêcheur. J'étais en mer quand la lumière est montée du fond. Tout est devenu blanc. Puis le silence. Puis la vague.",
   "Je me suis réveillé accroché à un mât, sur une colline qui n'existait pas la veille. C'était Éclosia."
  ]
 },
 {
  "id": "tem2",
  "map": "u1",
  "k": "livre",
  "t": "Témoignage de la Germination, 2",
  "p": [
   "Témoignage d'Aline, forgeronne. La forge de mon père était sur une île. Le lendemain, elle était au pied d'une montagne. Elle tenait encore debout. Mon père, non.",
   "J'ai rallumé le feu. C'est ce qu'il aurait voulu. Ferrance est née autour de ce feu."
  ]
 },
 {
  "id": "tem3",
  "map": "u2",
  "k": "livre",
  "t": "Témoignage de la Germination, 3",
  "p": [
   "Témoignage de Siri, enfant de la toundra. Nous vivions sur une île de glace, seuls au monde. Une nuit, la glace s'est soudée à d'autres terres. Le matin, il y avait des inconnus sur notre lac gelé.",
   "Grand-mère a dit : « Le monde est venu à nous. » Je ne sais pas encore si c'est une bonne chose."
  ]
 },
 {
  "id": "tem4",
  "map": "u4",
  "k": "livre",
  "t": "Témoignage de la Germination, 4",
  "p": [
   "Témoignage de Brune, avant qu'elle devienne championne. Je me suis battue contre la vague. On ne se bat pas contre une vague. Je l'ai fait quand même.",
   "Depuis, je me bats contre tout ce qui ressemble à une vague. Ça fait de moi une bonne championne. Pas une personne heureuse."
  ]
 },
 {
  "id": "tem5",
  "map": "u5",
  "k": "livre",
  "t": "Témoignage de la Germination, 5",
  "p": [
   "Témoignage du Gardien Aoki. Les érables ont rougi cette nuit-là. En une heure. Comme s'ils saignaient.",
   "Je les soigne depuis dix ans. Ils ne redeviennent pas verts. Je crois qu'ils se souviennent pour nous."
  ]
 },
 {
  "id": "tem6",
  "map": "u6",
  "k": "livre",
  "t": "Témoignage de la Germination, 6",
  "p": [
   "Témoignage d'une mère de Graineval. J'ai perdu ma fille dans la vague. J'ai allumé une lanterne. Puis mes voisins aussi. Puis toute la ville.",
   "On dit que Germalis les voit. Moi, je dis que ce sont les vivants qui les voient. Et c'est déjà beaucoup."
  ]
 },
 {
  "id": "tem7",
  "map": "u7",
  "k": "livre",
  "t": "Témoignage de la Germination, 7",
  "p": [
   "Témoignage de Noa, Gardien. La mer nous a pris beaucoup. Elle nous a aussi donné les Surfouines, les Coralines, les vagues des Îles Soleil.",
   "Je ne lui pardonne pas. Mais je surfe dessus tous les matins. C'est ma façon de lui dire qu'elle ne m'a pas eu."
  ]
 },
 {
  "id": "tem8",
  "map": "t0",
  "k": "livre",
  "t": "Témoignage de la Germination, 8",
  "p": [
   "Témoignage du Prof. Sauge. Cette nuit-là, une silhouette est sortie des vagues sur la plage de Bourg-Aurore. Elle m'a tendu une enfant. Je n'ai pas vu son visage.",
   "Elle portait une sacoche comme celle des dresseurs. Je l'ai cherchée pendant des mois. Je la cherche encore, parfois, dans la foule."
  ]
 },
 {
  "id": "let1",
  "map": "t0",
  "k": "lettre",
  "t": "Lettre de Lierre à Sauge",
  "p": [
   "Sauge, vieux bougre. Éclosia est extraordinaire. Les Éclos naissent de la sève comme des rêves qui prendraient corps. Je reste ici. Ne me demande pas de revenir.",
   "Aurèle est vivant. Il se fait appeler Ronce. Il ne m'a pas reconnu, ou il a fait semblant. J'ai peur pour lui. J'ai peur de lui."
  ]
 },
 {
  "id": "let2",
  "map": "u0",
  "k": "lettre",
  "t": "Lettre de Sauge à Lierre",
  "p": [
   "Lierre. La petite a dix-sept ans maintenant. Elle s'appelle Nova, elle a un sale caractère et elle bat tous les gamins du village. Elle demande parfois d'où elle vient. Je ne sais pas quoi lui dire.",
   "Si tu croises Aurèle... dis-lui qu'on ne lui en veut pas. Ou ne lui dis rien. Je ne sais plus ce qui est juste."
  ]
 },
 {
  "id": "let3",
  "map": "x1",
  "k": "lettre",
  "t": "Lettre de Maren à sa sœur",
  "p": [
   "Ma chère Iris, les enfants grandissent trop vite. Ilan veut devenir dresseur — il dit que c'est un métier, je lui dis que ça n'existe pas. Nova veut le battre à tout, même à la course de crabes.",
   "Tobias répare encore le bateau des voisins. Il ne sait pas dire non. C'est pour ça que je l'ai épousé. Viens nous voir avant l'hiver. La mer est si calme, en ce moment."
  ]
 },
 {
  "id": "let4",
  "map": "p0",
  "k": "lettre",
  "t": "Lettre de Nova, jamais envoyée",
  "p": [
   "Tu pars demain. Tout le monde dit que c'est pour tes études. Moi, je sais que tu en avais marre de Bourg-Aurore. Ce n'est pas grave. Moi aussi, j'en ai marre.",
   "Reviens quand même. Qui je vais battre à la course de crabes, sinon ? Le Prof dit que tu reviendras plus fort·e. Tant mieux. Moi aussi, je serai plus forte. ... Je ne l'enverrai jamais, cette lettre."
  ]
 },
 {
  "id": "let5",
  "map": "u6",
  "k": "lettre",
  "t": "Lettre d'Ilan à Nova (brouillon)",
  "p": [
   "Nova. Je t'ai crue morte pendant dix ans. Ronce m'a dit qu'il t'avait cherchée trois jours. Je l'ai cru. Je l'ai remercié.",
   "Il savait. Il a toujours su où tu étais. Je ne sais pas comment on pardonne ça. Ni à lui, ni à moi."
  ]
 },
 {
  "id": "let6",
  "map": "v2",
  "k": "lettre",
  "t": "Message de la résistance de l'Envers",
  "p": [
   "À ceux qui viendront : nous sommes encore là. Nous rallumons une lanterne par mois, dans une cave différente. Le Roi le sait. Il ne fait rien. Je crois qu'il veut qu'on continue.",
   "Signé : les dormeurs réveillés."
  ]
 },
 {
  "id": "st1",
  "map": "t2",
  "k": "stele",
  "t": "Stèle des Quatre Terres",
  "p": [
   "Avant la séparation, le continent s'appelait Unaë. Les fresques de Mousselande montrent un grand oiseau doré tenant le monde entier.",
   "Une inscription ajoutée plus tard dit : « Il nous a séparés pour nous sauver. Ne le maudissez pas. »"
  ]
 },
 {
  "id": "st2",
  "map": "t4",
  "k": "livre",
  "t": "Traité sur les types, chapitre 1",
  "p": [
   "Les créatures obéissent à des affinités élémentaires. L'eau éteint le feu, la flore boit l'eau, le feu brûle la flore. Le savant Lierre a recensé quinze affinités.",
   "Il note en marge : « Les Éclos d'Éclosia brouillent tout. Certains semblent appartenir à deux mondes à la fois. »"
  ]
 },
 {
  "id": "st3",
  "map": "t6",
  "k": "livre",
  "t": "Le Livre des Rêves",
  "p": [
   "Dans les rêves, les créatures parlent. C'est ce que croient les habitants de Mirage-Sud. Ils notent leurs rêves dans de grands registres depuis trois siècles.",
   "Le registre le plus ancien contient une seule phrase, répétée sur cent pages : « Éveillon attend. »"
  ]
 },
 {
  "id": "st4",
  "map": "t7",
  "k": "stele",
  "t": "Stèle de Givrecime",
  "p": [
   "Ici reposent les alpinistes que la montagne a gardés. Le blizzard leur chante des berceuses.",
   "Gravé plus bas, d'une main maladroite : « Givraël, rends-nous mon frère au printemps. »"
  ]
 },
 {
  "id": "st5",
  "map": "u1",
  "k": "livre",
  "t": "Manuel de forge de Ferrance",
  "p": [
   "Pour forger avec une créature Acier, il faut d'abord gagner sa confiance. Aucun métal ne plie pour un dresseur qui crie.",
   "Le Champion Gaspard a ajouté : « Et aucun dresseur ne plie pour un métal qui ment. »"
  ]
 },
 {
  "id": "st6",
  "map": "u2",
  "k": "stele",
  "t": "Stèle de la Toundra",
  "p": [
   "Avant la Germination, cette île de glace s'appelait Hvit. Ses habitants n'avaient jamais vu un arbre.",
   "Aujourd'hui, un pin pousse près de la stèle. Les enfants l'appellent « l'étranger »."
  ]
 },
 {
  "id": "st7",
  "map": "u3",
  "k": "livre",
  "t": "Guide de Valmont",
  "p": [
   "Valmont est la cité la plus élégante d'Éclosia. On y danse au bord des canaux, on y porte des rubans, on y oublie un peu.",
   "Note manuscrite : « On y oublie, oui. C'est même pour ça qu'on l'a construite. »"
  ]
 },
 {
  "id": "st8",
  "map": "u7",
  "k": "livre",
  "t": "Carnet de surf de Solmarina",
  "p": [
   "Règle n° 1 : ne jamais tourner le dos à la mer. Règle n° 2 : lui sourire quand même. Règle n° 3 : remonter sur la planche.",
   "Le Gardien Noa a souligné la règle n° 3 trois fois."
  ]
 },
 {
  "id": "st9",
  "map": "u8",
  "k": "stele",
  "t": "Stèle de l'Archipel Braise",
  "p": [
   "Les volcans de l'Archipel dormaient avant la Germination. La sève de la Graine les a réveillés.",
   "Le Gardien Tavi a écrit dessous : « Ils ne dormaient pas. Ils attendaient. Comme nous tous. »"
  ]
 },
 {
  "id": "st10",
  "map": "z2",
  "k": "livre",
  "t": "Registre de la Tour d'Elio",
  "p": [
   "Visiteurs de la tour depuis mille ans : sept. Un roi, deux voleurs, une poétesse, un enfant perdu, un chercheur aux cheveux blancs nommé Aurèle.",
   "Le septième nom est le tien. Il est écrit de ta main. Tu ne te souviens pas de l'avoir écrit."
  ]
 },
 {
  "id": "st11",
  "map": "z2",
  "k": "livre",
  "t": "Horloge d'Elio",
  "p": [
   "Le temps n'est pas une ligne. C'est une rivière qui revient parfois sur ses propres berges.",
   "« Ceux qui remontent le courant ne peuvent rien changer. Mais ils peuvent tenir une main. »"
  ]
 },
 {
  "id": "st12",
  "map": "z1",
  "k": "stele",
  "t": "Paroi des Profondeurs",
  "p": [
   "Sous la Graine, les racines forment des mots dans une langue que personne ne connaît. Lierre a passé un an à les recopier.",
   "Il pense qu'elles disent : « Je suis désolée. » Il n'en est pas sûr. Il aimerait en être sûr."
  ]
 },
 {
  "id": "st13",
  "map": "z0",
  "k": "stele",
  "t": "Pierre tombale de Nacre",
  "p": [
   "Liora et Elouan. Une femme qui riait. Un enfant qui plantait des haricots.",
   "Quelqu'un a planté des roses bleues tout autour. Elles ne fanent jamais."
  ]
 },
 {
  "id": "st14",
  "map": "d0",
  "k": "livre",
  "t": "Rêve écrit sur un mur",
  "p": [
   "Si tu lis ceci, tu es dans le rêve d'Oniris. Tout le monde dort. Personne ne souffre. Personne ne vit non plus.",
   "Réveille-les. Un par un. Ils t'en voudront peut-être. Ils te remercieront plus tard."
  ]
 },
 {
  "id": "st15",
  "map": "d2",
  "k": "livre",
  "t": "Journal d'un dormeur",
  "p": [
   "Je rêve que je suis heureux depuis dix ans. Ma femme est vivante dans mon rêve. Pourquoi voudrais-je me réveiller ?",
   "... Parce que mon fils, lui, est vivant de l'autre côté. Et qu'il m'attend."
  ]
 },
 {
  "id": "st16",
  "map": "p0",
  "k": "livre",
  "t": "Affiche de la fête de Bourg-Aurore",
  "p": [
   "Grande fête du solstice ! Course de crabes, concours de cerfs-volants, combat amical des jeunes dresseurs.",
   "Écrit au crayon par-dessus : « Nova gagnera la course. Comme d'habitude. »"
  ]
 }
];
