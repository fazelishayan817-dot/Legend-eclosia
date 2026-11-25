'use strict';
/* Codex vivant : fiches détaillées de chaque créature */
const DEX_LORE = {
"feuillon": {
"h": "les prairies hautes et les lisières de forêt",
"p": [
"Capousse est un Éclo calme et têtu. Il fait pousser des fleurs partout où il s'endort, ce qui le rend très populaire auprès des jardiniers.",
"Les Gardiens d'Éclosia le confient souvent aux jeunes dresseurs, car il ne trahit jamais celui qui le respecte.",
"Aurèle, avant la Germination, rêvait d'une créature exactement comme lui. Il ne l'a jamais vue."
],
"cm": 57,
"kg": 4.1,
"soin": "Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Capousse pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — Théo le passeur"
},
"sylvorn": {
"h": "les sous-bois humides et les jardins abandonnés",
"p": [
"Une couronne de feuilles pousse sur son crâne. Il protège les jeunes Éclos. Ses quatre pattes robustes lui permettent de grimper sur des terrains difficiles. Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre.",
"Il dort des semaines entières sans bouger, puis disparaît en une nuit. Il est équilibré en combat et s'adapte à toutes les situations. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Capousse. Bien entraîné, il deviendra Sylvérable.",
"Les habitants d'Éclosia le considèrent comme un enfant de la Graine : le blesser sans raison porte malheur. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 79,
"kg": 36.3,
"soin": "Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Capoforêt a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — Capitaine Morgane"
},
"arbrasaure": {
"h": "les prairies hautes et les lisières de forêt, ainsi que les ruines de murs anciens",
"p": [
"On dit qu'une graine de la Graine-Monde dort dans sa couronne. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre.",
"Il dort des semaines entières sans bouger, puis disparaît en une nuit. Sa résistance est légendaire : on se fatigue avant lui. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Capoforêt.",
"Comme tous les Éclos, il est né la nuit de la Germination, quand la sève de la Graine-Monde s'est répandue sur les six terres. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 90,
"kg": 31.5,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Sylvérable a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — Kai le surfeur"
},
"brasille": {
"h": "les pentes volcaniques et les cendres tièdes",
"p": [
"Cendrolin est un Éclo aux écailles brûlantes. Quand il a peur, il se roule en boule de braise et dévale les pentes.",
"Il est né près des volcans de l'Archipel Braise, et garde une chaleur constante même sous la neige.",
"Il s'attache très fort à son dresseur et le réchauffe la nuit, quitte à brûler les couvertures."
],
"cm": 79,
"kg": 11.3,
"soin": "Prévoyez toujours une pierre plate pour qu'il puisse dormir sans brûler le sol. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Cendrolin m'a tenu chaud toute une nuit de blizzard. Je lui dois peut-être la vie. » — Mamie Odette, Bourg-Aurore"
},
"fournex": {
"h": "les pentes volcaniques et les cendres tièdes",
"p": [
"Ses épines de braise crépitent quand il est prêt à se battre. Il se tient debout sur deux pattes et utilise ses membres avant comme des mains. Il ne supporte pas la pluie et se réfugie sous les rochers à la moindre goutte.",
"Il recrache des étincelles quand il éternue, ce qui a déjà déclenché plusieurs incendies. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Cendrolin. Bien entraîné, il deviendra Volcandre.",
"Avant la Germination, aucune créature comme lui n'existait. Les savants se demandent encore d'où vient son apparence. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 139,
"kg": 118.2,
"soin": "Les jours de pluie, gardez-le à l'abri : sa flamme vacille et son humeur aussi. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Pyrécaille a brûlé le gâteau d'anniversaire de ma fille. Elle a trouvé ça génial. » — le jeune Léo, dresseur débutant"
},
"volcanthe": {
"h": "les plages de sable noir près des coulées, ainsi que les grottes sèches et les mines oubliées",
"p": [
"Né la nuit de la Germination, au pied d'un volcan. Il ne craint rien. Il se tient debout sur deux pattes et utilise ses membres avant comme des mains. Il ne supporte pas la pluie et se réfugie sous les rochers à la moindre goutte.",
"Sa carapace porte les marques de chaque chute qu'il a survécue. En combat, il préfère le contact direct et frappe fort. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Pyrécaille.",
"Les habitants d'Éclosia le considèrent comme un enfant de la Graine : le blesser sans raison porte malheur. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 185,
"kg": 567.3,
"soin": "Il mange beaucoup de charbon doux et de baies séchées ; l'eau froide est à proscrire pendant les repas. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il supporte mal l'humidité prolongée qui fissure sa carapace.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Les Volcandre sauvages dansent autour des feux de camp. Si tu chantes, ils restent. » — Hana, de la Vallée Érable"
},
"clapotin": {
"h": "les lagons tièdes et les récifs",
"p": [
"Narvalou est un Éclo marin dont la corne en spirale sent les courants à des kilomètres.",
"Les pêcheurs d'Éclosia le suivent pour trouver les bancs de poissons.",
"On dit qu'il a guidé des survivants de la Germination jusqu'à la côte. Nova en est persuadée."
],
"cm": 40,
"kg": 2.3,
"soin": "Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Narvalou a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Théo le passeur"
},
"marevor": {
"h": "les lagons tièdes et les récifs",
"p": [
"Il guide les navires perdus à travers les brumes. Ses nageoires puissantes le propulsent à grande vitesse. Il se nourrit de petites algues et filtre l'eau des étangs où il vit.",
"Il fabrique de petites sculptures de glace que personne ne comprend. En combat, il canalise son énergie à distance. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Narvalou. Bien entraîné, il deviendra Abyssorne.",
"Avant la Germination, aucune créature comme lui n'existait. Les savants se demandent encore d'où vient son apparence. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 86,
"kg": 33.7,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Un bol de neige fraîche ou de glace pilée le matin suffit à son bonheur.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Narvaléon qui m'a réappris à nager. » — Mamie Odette, Bourg-Aurore"
},
"abyssard": {
"h": "les lagons tièdes et les récifs, ainsi que les toundras balayées par le blizzard",
"p": [
"Il a vu la mer se soulever. Il garde les côtes depuis ce jour. Il glisse sans un bruit et surprend souvent les promeneurs. Il guide parfois les nageurs perdus vers la rive.",
"Il ne boit que de la neige fondue, jamais d'eau courante. Il préfère les attaques spéciales et garde ses distances. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Narvaléon.",
"Les habitants d'Éclosia le considèrent comme un enfant de la Graine : le blesser sans raison porte malheur. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 253,
"kg": 323.9,
"soin": "Il adore les algues fraîches et les petits crustacés, mais il faut varier son alimentation. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Un bol de neige fraîche ou de glace pilée le matin suffit à son bonheur.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Abyssorne qui m'a réappris à nager. » — la Comtesse Mirabelle"
},
"piouly": {
"h": "les jardins et les fermes",
"p": [
"Il réveille tout le village à l'aube, sans exception. Il se pose rarement au sol, qu'il trouve trop dangereux. Curieux, il suit les dresseurs sur des kilomètres.",
"Il suit les tempêtes à distance, comme un chien suit son maître. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Ventrelle.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 51,
"kg": 2.5,
"soin": "Les jeux de balle sont le meilleur moyen de gagner sa confiance. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Lissez ses plumes dans le sens du vent après chaque vol ; il apprécie ce rituel.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Piouly m'attend chaque soir au bout du chemin. Il n'est pas à moi. Il vient quand même. » — Léon, apprenti de Clairsemis"
},
"ventrelle": {
"h": "les champs, les villages et les routes",
"p": [
"Il plane des heures sans battre des ailes. Ses ailes larges lui permettent de planer longtemps. Curieux, il suit les dresseurs sur des kilomètres.",
"Il nidifie au sommet des falaises, là où rien ne peut l'atteindre. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Piouly. Bien entraîné, il deviendra Cieloraptor.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 77,
"kg": 6.8,
"soin": "Il s'adapte à presque tout ; une routine régulière lui suffit. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il a besoin d'espace pour déployer ses ailes chaque jour, sinon il devient nerveux.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Ventrelle n'a rien d'extraordinaire. C'est pour ça que je l'aime. » — Hana, de la Vallée Érable"
},
"cieloraptor": {
"h": "à peu près partout où l'on vit, ainsi que les falaises côtières et les phares",
"p": [
"Il fond sur sa proie depuis les nuages. Son plumage change légèrement de teinte selon les saisons. Il dort beaucoup, et partout.",
"Il suit les tempêtes à distance, comme un chien suit son maître. Sa vitesse est son arme principale. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Ventrelle.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 98,
"kg": 9.9,
"soin": "Il s'adapte à presque tout ; une routine régulière lui suffit. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Ne le tenez jamais par les ailes : il ne vous le pardonnerait pas.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Les Cieloraptor sont les premiers à revenir après une catastrophe. Ils reconstruisent avec nous. » — le jeune Léo, dresseur débutant"
},
"rongeot": {
"h": "à peu près partout où l'on vit",
"p": [
"Il ronge tout ce qui traîne. Même les panneaux. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Il vit en petits groupes très soudés.",
"Il vit en petits groupes très soudés. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Rongemaître.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 66,
"kg": 13.2,
"soin": "Il mange de tout, ce qui ne veut pas dire qu'il faut lui donner n'importe quoi. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Rongeot n'a rien d'extraordinaire. C'est pour ça que je l'aime. » — Tavi junior"
},
"rongemaitre": {
"h": "les bords de chemin et les fossés",
"p": [
"Ses incisives ne s'arrêtent jamais de pousser. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Curieux, il suit les dresseurs sur des kilomètres.",
"Il dort beaucoup, et partout. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Rongeot.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 100,
"kg": 27.0,
"soin": "Il s'adapte à presque tout ; une routine régulière lui suffit. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Rongemaître m'attend chaque soir au bout du chemin. Il n'est pas à moi. Il vient quand même. » — Kai le surfeur"
},
"larvelin": {
"h": "les clairières où la rosée tient jusqu'à midi",
"p": [
"Il mange trois fois son poids en feuilles chaque jour. Il se déplace par petits bonds rapides. Il se cache sous les feuilles mortes dès qu'un prédateur approche.",
"Au printemps, il disperse des graines qui germent en quelques jours. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Cocoride.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 30,
"kg": 1.2,
"soin": "Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« J'ai trouvé un Larvelin endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — Mère Hélène, de Graineval"
},
"cocoride": {
"h": "les sous-bois humides et les jardins abandonnés, ainsi que les usines et les ateliers",
"p": [
"Sa coque est plus dure que l'acier. Il attend. Ses antennes captent les vibrations à plusieurs mètres. Il passe des heures immobile au soleil, et l'on dit que les fleurs poussent plus vite autour de lui.",
"Son corps tinte comme une cloche quand il marche. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Larvelin. Bien entraîné, il deviendra Papiluxe.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 58,
"kg": 9.7,
"soin": "Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Il tinte doucement quand il est content. Apprenez à reconnaître ce son.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Cocoride pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — Théo le passeur"
},
"papiluxe": {
"h": "les crêtes battues par les vents, ainsi que les temples et les sanctuaires",
"p": [
"La poudre de ses ailes brille dans le noir. Ses antennes captent les vibrations à plusieurs mètres. Il suit les tempêtes à distance, comme un chien suit son maître.",
"Il brille doucement quand il est en confiance, et s'éteint quand il a peur. Il préfère les attaques spéciales et garde ses distances. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Cocoride.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 73,
"kg": 4.3,
"soin": "Il a besoin d'espace pour déployer ses ailes chaque jour, sinon il devient nerveux. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Évitez de le regarder fixement quand il brille fort, pour vos yeux comme pour sa pudeur.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Un Papiluxe m'a volé mon écharpe. Je l'ai retrouvée au sommet d'un clocher, pliée. » — une infirmière de Port-Sève"
},
"mousseron": {
"h": "les prairies hautes et les lisières de forêt, ainsi que les décharges oubliées",
"p": [
"Il se cache parmi les champignons de la forêt. Il roule plus qu'il ne marche, et rebondit quand il est content. Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas.",
"Il nettoie les marais en absorbant les eaux polluées. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Champitox.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 40,
"kg": 2.8,
"soin": "Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il nettoie lui-même les marais : laissez-le patauger dans les eaux stagnantes.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mousseron a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — Théo le passeur"
},
"champitox": {
"h": "les clairières où la rosée tient jusqu'à midi, ainsi que les marais et les tourbières",
"p": [
"Ses spores endorment ceux qui l'approchent. Son corps mou et arrondi peut changer légèrement de forme. Il passe des heures immobile au soleil, et l'on dit que les fleurs poussent plus vite autour de lui.",
"Il sécrète un poison léger qui le protège des prédateurs. Il résiste remarquablement bien aux attaques spéciales. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Mousseron.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 78,
"kg": 22.3,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il nettoie lui-même les marais : laissez-le patauger dans les eaux stagnantes.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Champitox a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — Ondine, de Mirage-Nord"
},
"etincelot": {
"h": "les plateaux exposés aux orages",
"p": [
"Il charge sa fourrure en se frottant contre l'écorce des arbres. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Les jours de grand orage, des dizaines d'entre eux se rassemblent sur les collines.",
"Il ne supporte pas l'eau, mais adore l'air humide d'avant la pluie. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Voltigre.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 52,
"kg": 6.5,
"soin": "Les orages l'excitent énormément ; prévoyez une longe isolée les nuits de tempête. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Étincelot m'a coiffé·e sans le vouloir. J'ai gardé la coupe trois semaines. » — le Professeur Hector"
},
"voltigre": {
"h": "les champs d'herbes sèches avant la pluie",
"p": [
"Ses rayures s'illuminent avant chaque bond. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Il communique par de petites décharges qui crépitent dans l'air.",
"Ses poils se hérissent plusieurs heures avant un orage. Sa vitesse est son arme principale. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Étincelot.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 84,
"kg": 10.7,
"soin": "Une brosse en bois, jamais en métal, pour démêler son pelage chargé. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Voltigre m'a coiffé·e sans le vouloir. J'ai gardé la coupe trois semaines. » — Gunnar, de Givrecime"
},
"galet": {
"h": "les ruines de murs anciens",
"p": [
"On le confond souvent avec une pierre de rivière. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Sa carapace porte les marques de chaque chute qu'il a survécue.",
"Il dort des semaines entières sans bouger, puis disparaît en une nuit. Sa résistance est légendaire : on se fatigue avant lui. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Rochelourd.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 51,
"kg": 4.9,
"soin": "Un massage avec une pierre ponce le détend après les longues marches. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Les Galet retiennent les éboulements, sur la route. Personne ne le leur a demandé. » — Capitaine Morgane"
},
"rochelourd": {
"h": "les grottes sèches et les mines oubliées",
"p": [
"Il roule le long des pentes pour se déplacer. Sa posture droite lui donne un air étonnamment humain. Il peut rester immobile si longtemps que la mousse pousse sur son dos.",
"Il mange des cailloux riches en minéraux et recrache les autres. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Galet. Bien entraîné, il deviendra Montagrok.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 135,
"kg": 196.8,
"soin": "Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Rochelourd a creusé un puits dans mon jardin. On a trouvé de l'eau. Et une pièce ancienne. » — l'archiviste Basile"
},
"montagrok": {
"h": "les champs de pierres où rien ne pousse",
"p": [
"Sa carapace contient des veines de métal pur. Il marche en se dandinant, ce qui fait beaucoup rire les enfants. Il se roule en boule et dévale les pentes pour se déplacer plus vite.",
"Son corps tinte comme une cloche quand il marche. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Rochelourd.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 140,
"kg": 171.2,
"soin": "Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Huilez ses articulations une fois par mois avec une huile végétale.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Un Montagrok a dormi trois jours devant ma porte. Je n'ai pas pu sortir. Je ne lui en veux pas. » — Kai le surfeur"
},
"mareluche": {
"h": "les estuaires où l'eau douce rencontre la mer",
"p": [
"Il saute de nénuphar en nénuphar toute la journée. Son corps mou et arrondi peut changer légèrement de forme. Il guide parfois les nageurs perdus vers la rive.",
"Il garde toujours un peu d'eau dans sa bouche, au cas où. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Ranaqua.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 48,
"kg": 2.9,
"soin": "Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Mareluche qui m'a réappris à nager. » — la Comtesse Mirabelle"
},
"ranaqua": {
"h": "les côtes rocheuses et les bancs de sable, ainsi que les cols venteux où l'on s'endurcit",
"p": [
"Il nage à contre-courant pour forger ses muscles. Sa posture droite lui donne un air étonnamment humain. Il se nourrit de petites algues et filtre l'eau des étangs où il vit.",
"Il médite au sommet des montagnes avant chaque saison. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Mareluche.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 122,
"kg": 96.2,
"soin": "Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Un repas riche en protéines et en céréales après chaque séance.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Ranaqua qui m'a réappris à nager. » — le jeune Léo, dresseur débutant"
},
"lucibulle": {
"h": "les champs de fleurs blanches",
"p": [
"Il flotte la nuit comme une petite lanterne. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Les voyageurs perdus suivent sa lueur jusqu'aux villages.",
"Il se lève toujours avant le soleil, comme pour l'appeler. Il préfère les attaques spéciales et garde ses distances. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Aurélys.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. On allume une lanterne à son effigie lors de la fête de l'aube, à Graineval."
],
"cm": 38,
"kg": 2.0,
"soin": "Il apprécie le miel doré et les fleurs blanches. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Lucibulle a éclairé ma barque toute la nuit, jusqu'au port. » — Hugo le mineur"
},
"aurelys": {
"h": "les plages à l'aube",
"p": [
"Sa lumière apaise les esprits troublés. Sa posture droite lui donne un air étonnamment humain. Il fuit les lieux trop sombres et dépérit dans les grottes.",
"Il collectionne les souvenirs des lieux qu'il traverse. Il préfère les attaques spéciales et garde ses distances. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Lucibulle.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. On allume une lanterne à son effigie lors de la fête de l'aube, à Graineval."
],
"cm": 123,
"kg": 85.6,
"soin": "Évitez de le regarder fixement quand il brille fort, pour vos yeux comme pour sa pudeur. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il fait parfois des cauchemars ; parlez-lui doucement, il se rendort aussitôt.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Aurélys brille plus fort quand ma fille rit. On la fait rire souvent. » — le jeune Léo, dresseur débutant"
},
"ombrelin": {
"h": "les grottes où personne ne s'aventure",
"p": [
"Il se glisse dans l'ombre des passants. Il roule plus qu'il ne marche, et rebondit quand il est content. Il imite les ombres des objets pour passer inaperçu.",
"On le reconnaît à ses yeux brillants dans le noir, et à rien d'autre. En combat, il canalise son énergie à distance. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Spectrombre.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les grands-mères disent aux enfants qui ne dorment pas qu'il viendra chercher leurs rêves."
],
"cm": 40,
"kg": 2.3,
"soin": "Il dort le jour et s'active à la nuit tombée ; adaptez vos entraînements. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Ombrelin m'a suivi tout le long de la forêt. Il voulait juste s'assurer que je rentrais bien. » — la Comtesse Mirabelle"
},
"spectrombre": {
"h": "les lisières entre le crépuscule et la nuit, ainsi que les brumes des matins calmes",
"p": [
"Il apparaît dans les miroirs à minuit. Il se love en spirale pour dormir et pour se protéger. Il suit parfois les voyageurs solitaires, sans jamais leur faire de mal.",
"Il prédit, dit-on, les grands changements quelques jours à l'avance. En combat, il canalise son énergie à distance. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Ombrelin.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les grands-mères disent aux enfants qui ne dorment pas qu'il viendra chercher leurs rêves."
],
"cm": 197,
"kg": 336.4,
"soin": "Il aime les recoins sombres et les sacs à dos fermés ; laissez-lui une cachette. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Il adore les livres, même s'il ne sait pas lire. Il aime le bruit des pages.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Spectrombre vole mes chaussettes. Uniquement la gauche. Je ne sais pas pourquoi. » — l'archiviste Basile"
},
"boxillon": {
"h": "les dojos et les terrains d'entraînement",
"p": [
"Il s'entraîne sans relâche contre les troncs. Il marche en se dandinant, ce qui fait beaucoup rire les enfants. Il ne recule jamais, même face à plus fort que lui.",
"Il s'entraîne du lever au coucher du soleil, sans jamais se lasser. En combat, il préfère le contact direct et frappe fort. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Pugilarque.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les dojos de Combrecœur accrochent son portrait au-dessus de la porte."
],
"cm": 79,
"kg": 24.7,
"soin": "Il respecte les dresseurs qui s'entraînent avec lui : courez à ses côtés. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Boxillon a défendu ma boutique contre des voleurs. Il a refusé toute récompense. » — Mère Hélène, de Graineval"
},
"pugilarque": {
"h": "les villages de lutteurs",
"p": [
"Un seul de ses coups peut fendre un rocher. Il se tient debout sur deux pattes et utilise ses membres avant comme des mains. Il imite les mouvements des dresseurs qui s'entraînent près de lui.",
"Il salue toujours son adversaire avant un combat, et après. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Boxillon.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les dojos de Combrecœur accrochent son portrait au-dessus de la porte."
],
"cm": 133,
"kg": 65.9,
"soin": "Ne le laissez pas trop gagner contre les autres, il deviendrait insupportable. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Pugilarque a défendu ma boutique contre des voleurs. Il a refusé toute récompense. » — Marie-Sève, de Port-Sève"
},
"vipereau": {
"h": "les rives des lacs stagnants",
"p": [
"Il mord tout ce qui bouge, même son reflet. Son long corps ondule avec grâce, sur terre comme dans l'eau. Il sécrète un poison léger qui le protège des prédateurs.",
"Certains guérisseurs utilisent son venin, très dilué, comme remède. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Cobrâcre.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Un dicton des marais : « Beau à regarder, mauvais à toucher, bon à connaître. »"
],
"cm": 150,
"kg": 121.5,
"soin": "Il nettoie lui-même les marais : laissez-le patauger dans les eaux stagnantes. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« On dit que les Vipéreau sont dangereux. Le mien dort sur mon oreiller. » — la Comtesse Mirabelle"
},
"cobracre": {
"h": "les rives des lacs stagnants, ainsi que les lisières entre le crépuscule et la nuit",
"p": [
"Son venin change de couleur selon sa colère. Il glisse sans un bruit et surprend souvent les promeneurs. Ses couleurs vives servent d'avertissement : ne pas toucher.",
"Il suit parfois les voyageurs solitaires, sans jamais leur faire de mal. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Vipéreau.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Un dicton des marais : « Beau à regarder, mauvais à toucher, bon à connaître. »"
],
"cm": 234,
"kg": 499.7,
"soin": "Il apprécie les champignons, même ceux qui vous rendraient malade. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Il aime les recoins sombres et les sacs à dos fermés ; laissez-lui une cachette.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Cobrâcre sent mauvais, d'accord. Mais il est loyal comme personne. » — Tavi junior"
},
"taupiron": {
"h": "les gorges profondes creusées par les rivières",
"p": [
"Il creuse des galeries avec ses griffes de métal. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Sa carapace porte les marques de chaque chute qu'il a survécue.",
"Il se sent attiré par les aimants et peut rester collé à un portail toute une nuit. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Forétaupe.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 55,
"kg": 13.3,
"soin": "Il ronge des cailloux pour entretenir ses dents ; un sac de graviers propres est indispensable. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il ne craint pas le froid mais déteste la rouille : séchez-le après la pluie.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Taupiron a creusé un puits dans mon jardin. On a trouvé de l'eau. Et une pièce ancienne. » — Aline la forgeronne"
},
"foretaupe": {
"h": "les ruines de murs anciens",
"p": [
"Il traverse une montagne en une seule nuit. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Il dort des semaines entières sans bouger, puis disparaît en une nuit.",
"Il se polit le blindage avec du sable, pendant des heures. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Taupiron.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 76,
"kg": 28.8,
"soin": "Un massage avec une pierre ponce le détend après les longues marches. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il mange des minéraux et de la limaille ; les forgerons lui gardent leurs chutes.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Forétaupe a dormi trois jours devant ma porte. Je n'ai pas pu sortir. Je ne lui en veux pas. » — Théo le passeur"
},
"flocinel": {
"h": "les grottes de glace bleue",
"p": [
"Il naît des premiers flocons de l'hiver. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il fabrique de petites sculptures de glace que personne ne comprend.",
"Il hiberne pendant les étés trop chauds, au fond des grottes de glace. En combat, il canalise son énergie à distance. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Glaciarde.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 45,
"kg": 2.7,
"soin": "Il préfère dormir dehors, même en hiver ; une couverture le vexe. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Flocinel m'a apporté un flocon parfait, sans fondre, sur le bout de son nez. » — le Prof. Lierre"
},
"glaciarde": {
"h": "les sommets où l'hiver ne finit jamais, ainsi que les plages à l'aube",
"p": [
"Elle danse sur la glace sous les aurores. Sa posture droite lui donne un air étonnamment humain. Les voyageurs perdus dans le blizzard racontent qu'il les a guidés jusqu'à un abri.",
"Les sanctuaires l'accueillent : sa présence apaiserait les cœurs troublés. En combat, il canalise son énergie à distance. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Flocinel.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 132,
"kg": 112.7,
"soin": "Par grande chaleur, il faut l'emmener près d'un lac ou d'une grotte froide. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il apprécie le miel doré et les fleurs blanches.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Glaciarde chantent la nuit, dans la toundra. Ça ressemble à du verre qui tinte. » — Théo le passeur"
},
"songeot": {
"h": "les bibliothèques et les observatoires",
"p": [
"Il rêve éveillé et voit parfois l'avenir. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Il flotte à quelques centimètres du sol quand il se concentre.",
"Il semble lire dans les pensées, et répond parfois à des questions qu'on n'a pas posées. En combat, il canalise son énergie à distance. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Rêvemage.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les devins de Mirage-Sud prétendent comprendre ses rêves. Personne ne les croit vraiment."
],
"cm": 68,
"kg": 13.5,
"soin": "Il ressent les émotions de son dresseur : restez calme pendant ses soins. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Songeot savait que j'allais pleurer avant moi. Il était déjà là. » — Fennec le conteur"
},
"revemage": {
"h": "les bibliothèques et les observatoires",
"p": [
"Il peut entrer dans les rêves des autres. Il marche en se dandinant, ce qui fait beaucoup rire les enfants. Il semble lire dans les pensées, et répond parfois à des questions qu'on n'a pas posées.",
"Il collectionne les souvenirs des lieux qu'il traverse. En combat, il canalise son énergie à distance. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Songeot.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les devins de Mirage-Sud prétendent comprendre ses rêves. Personne ne les croit vraiment."
],
"cm": 107,
"kg": 60.0,
"soin": "La méditation partagée, cinq minutes par jour, renforce votre lien de façon spectaculaire. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Rêvemage s'assoient près des gens tristes, dans les gares. Ils ne disent rien. Ça aide. » — Gunnar, de Givrecime"
},
"pincelot": {
"h": "les marais tranquilles et les fontaines de village, ainsi que les grottes sèches et les mines oubliées",
"p": [
"Ses pinces brisent les coquillages. Ses antennes captent les vibrations à plusieurs mètres. Il garde toujours un peu d'eau dans sa bouche, au cas où.",
"Sa carapace porte les marques de chaque chute qu'il a survécue. Sa résistance est légendaire : on se fatigue avant lui. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Carapinc.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 37,
"kg": 1.9,
"soin": "Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Il ronge des cailloux pour entretenir ses dents ; un sac de graviers propres est indispensable.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Pincelot qui m'a réappris à nager. » — Siri, de la toundra"
},
"carapinc": {
"h": "les marais tranquilles et les fontaines de village, ainsi que les grottes sèches et les mines oubliées",
"p": [
"Sa carapace résiste aux vagues les plus fortes. Sa carapace légère le protège sans l'alourdir. Il guide parfois les nageurs perdus vers la rive.",
"Les mineurs le considèrent comme un porte-bonheur : là où il creuse, on trouve des filons. En combat, il encaisse les coups sans broncher et use l'adversaire. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Pincelot.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 43,
"kg": 6.9,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Il supporte mal l'humidité prolongée qui fissure sa carapace.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Carapinc qui m'a réappris à nager. » — Siri, de la toundra"
},
"abeillon": {
"h": "les nuages bas des matins d'automne, ainsi que les sous-bois aux champignons colorés",
"p": [
"Il butine en groupe et défend sa ruche. Sa carapace légère le protège sans l'alourdir. Il siffle en volant, et chaque individu a sa propre mélodie.",
"Il est beaucoup plus doux qu'il n'en a l'air, une fois apprivoisé. Sa vitesse est son arme principale. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Reinapic.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 32,
"kg": 0.7,
"soin": "Ne le tenez jamais par les ailes : il ne vous le pardonnerait pas. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Il nettoie lui-même les marais : laissez-le patauger dans les eaux stagnantes.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Les Abeillon volent en V au-dessus du port avant les tempêtes. Les pêcheurs les écoutent. » — Brune"
},
"reinapic": {
"h": "les clochers et les tours de guet, ainsi que les égouts des grandes villes",
"p": [
"Elle commande un essaim de mille Abeillon. Sa carapace légère le protège sans l'alourdir. Il plane des heures sans battre des ailes, porté par les courants chauds.",
"Il nettoie les marais en absorbant les eaux polluées. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Abeillon.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 48,
"kg": 1.3,
"soin": "Il a besoin d'espace pour déployer ses ailes chaque jour, sinon il devient nerveux. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Son humeur se lit à la couleur de ses taches : plus elles sont vives, plus il est content.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Reinapic me rapporte des lettres de ma sœur, de l'autre côté de la mer. » — Siri, de la toundra"
},
"laineclair": {
"h": "les toits des villes et les antennes",
"p": [
"Sa laine se charge d'électricité au moindre frottement. Ses quatre pattes robustes lui permettent de grimper sur des terrains difficiles. Les jours de grand orage, des dizaines d'entre eux se rassemblent sur les collines.",
"Il recharge son corps en se postant sous les lignes électriques, au grand désespoir des techniciens. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Ovinvolt.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 46,
"kg": 2.9,
"soin": "Les orages l'excitent énormément ; prévoyez une longe isolée les nuits de tempête. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Laineclair a rallumé tout le quartier pendant la panne. Le maire l'a décoré. » — Mère Hélène, de Graineval"
},
"ovinvolt": {
"h": "les plateaux exposés aux orages",
"p": [
"Ses cornes crépitent par temps d'orage. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Il communique par de petites décharges qui crépitent dans l'air.",
"Il ne supporte pas l'eau, mais adore l'air humide d'avant la pluie. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Laineclair. Bien entraîné, il deviendra Bélitonnerre.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 85,
"kg": 29.5,
"soin": "Il se calme en touchant le sol pieds nus, ou pattes nues : laissez-le se décharger après un combat. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Ovinvolt m'a coiffé·e sans le vouloir. J'ai gardé la coupe trois semaines. » — Siri, de la toundra"
},
"belitonnerre": {
"h": "les collines où la foudre tombe souvent, ainsi que à peu près partout où l'on vit",
"p": [
"Il appelle la foudre d'un coup de corne. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Il recharge son corps en se postant sous les lignes électriques, au grand désespoir des techniciens.",
"Il mange de tout, y compris ce qu'on oublie sur les tables de pique-nique. En combat, il canalise son énergie à distance. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Ovinvolt.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 115,
"kg": 27.4,
"soin": "Une brosse en bois, jamais en métal, pour démêler son pelage chargé. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il s'adapte à presque tout ; une routine régulière lui suffit.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Quand l'orage approche, mon Bélitonnerre se met à la fenêtre et attend comme un enfant. » — Marie-Sève, de Port-Sève"
},
"dracolin": {
"h": "les pics inaccessibles",
"p": [
"Il ne se montre qu'aux dresseurs patients. Il se love en spirale pour dormir et pour se protéger. Il dort enroulé autour des sommets, et les nuages le recouvrent.",
"Il vit très longtemps : certains auraient connu le premier dresseur. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Draconelle.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Le premier dresseur, dit-on, en avait un à ses côtés."
],
"cm": 124,
"kg": 57.2,
"soin": "Il mange énormément ; prévoyez un budget conséquent. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon grand-père disait qu'un Dracolin l'avait porté au-dessus de la vague. Personne ne le croyait. Moi si. » — Théo le passeur"
},
"draconelle": {
"h": "les vieilles cavernes aux parois brûlées",
"p": [
"On dit qu'il contrôle la météo d'une vallée entière. Il glisse sans un bruit et surprend souvent les promeneurs. Il ne se montre qu'aux dresseurs qu'il juge dignes.",
"Il change de repaire à chaque siècle. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Dracolin. Bien entraîné, il deviendra Draconyx.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Le premier dresseur, dit-on, en avait un à ses côtés."
],
"cm": 177,
"kg": 149.7,
"soin": "Il mange énormément ; prévoyez un budget conséquent. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« J'ai vu un Draconelle une seule fois. Il m'a regardé comme si j'étais une question. » — Gunnar, de Givrecime"
},
"draconyx": {
"h": "les pics inaccessibles, ainsi que les crêtes battues par les vents",
"p": [
"Il fait le tour de la région en une heure. Il se tient debout sur deux pattes et utilise ses membres avant comme des mains. Il garde jalousement un trésor dont personne ne connaît la nature.",
"Il annonce les changements de temps en tournoyant au-dessus des villages. En combat, il préfère le contact direct et frappe fort.  Il évolue à partir de Draconelle.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Le premier dresseur, dit-on, en avait un à ses côtés."
],
"cm": 132,
"kg": 42.5,
"soin": "Les dragons vivent longtemps : il se souviendra de chaque geste que vous aurez eu pour lui. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Ne le tenez jamais par les ailes : il ne vous le pardonnerait pas.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon grand-père disait qu'un Draconyx l'avait porté au-dessus de la vague. Personne ne le croyait. Moi si. » — Capitaine Morgane"
},
"noctelle": {
"h": "les forêts denses où le jour n'entre pas",
"p": [
"Elle ne vole qu'à la lumière de la lune. Ses antennes captent les vibrations à plusieurs mètres. Il suit parfois les voyageurs solitaires, sans jamais leur faire de mal.",
"Il siffle en volant, et chaque individu a sa propre mélodie. Sa vitesse est son arme principale. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Nyctaile.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les grands-mères disent aux enfants qui ne dorment pas qu'il viendra chercher leurs rêves."
],
"cm": 39,
"kg": 1.0,
"soin": "Il mange peu, mais il vole parfois la nourriture des autres pour jouer. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Ne le tenez jamais par les ailes : il ne vous le pardonnerait pas.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Noctelle vole mes chaussettes. Uniquement la gauche. Je ne sais pas pourquoi. » — un pêcheur anonyme de Solmarina"
},
"nyctaile": {
"h": "les lisières entre le crépuscule et la nuit, ainsi que les clochers et les tours de guet",
"p": [
"Son vol silencieux surprend même les hiboux. Son plumage change légèrement de teinte selon les saisons. Il n'apparaît qu'à la tombée de la nuit, et disparaît au premier rayon de soleil.",
"Il annonce les changements de temps en tournoyant au-dessus des villages. Sa vitesse est son arme principale. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Noctelle.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les grands-mères disent aux enfants qui ne dorment pas qu'il viendra chercher leurs rêves."
],
"cm": 71,
"kg": 6.3,
"soin": "Il mange peu, mais il vole parfois la nourriture des autres pour jouer. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il a besoin d'espace pour déployer ses ailes chaque jour, sinon il devient nerveux.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Nyctaile se cachent dans les ombres des lanternes, à Graineval. Ils veillent, je crois. » — Marie-Sève, de Port-Sève"
},
"corailette": {
"h": "les estuaires où l'eau douce rencontre la mer",
"p": [
"Elle brille au fond des lagons. Son corps mou et arrondi peut changer légèrement de forme. Il garde toujours un peu d'eau dans sa bouche, au cas où.",
"Il brille doucement quand il est en confiance, et s'éteint quand il a peur. Il résiste remarquablement bien aux attaques spéciales. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 68,
"kg": 10.4,
"soin": "Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il se recharge au soleil levant ; un réveil matinal lui fait du bien.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Corailette refuse de nager quand la mer est trop calme. Il dit que ce n'est pas normal. » — le Professeur Hector"
},
"cliquetan": {
"h": "les mines de fer et les filons de cuivre",
"p": [
"Ses engrenages tournent en cliquetant. Il roule plus qu'il ne marche, et rebondit quand il est content. Les ouvriers lui confient les tâches les plus lourdes, qu'il accomplit sans broncher.",
"Son corps tinte comme une cloche quand il marche. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Engrenor.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 48,
"kg": 4.8,
"soin": "Il mange des minéraux et de la limaille ; les forgerons lui gardent leurs chutes. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Cliquetan a réparé la grille du jardin avec son propre corps. Il est resté une heure, fier. » — une infirmière de Port-Sève"
},
"engrenor": {
"h": "les ruines industrielles",
"p": [
"Il répare lui-même ses rouages usés. Sa posture droite lui donne un air étonnamment humain. Il se polit le blindage avec du sable, pendant des heures.",
"Les ouvriers lui confient les tâches les plus lourdes, qu'il accomplit sans broncher. En combat, il encaisse les coups sans broncher et use l'adversaire. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Cliquetan.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 127,
"kg": 121.3,
"soin": "Il mange des minéraux et de la limaille ; les forgerons lui gardent leurs chutes. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Engrenor a réparé la grille du jardin avec son propre corps. Il est resté une heure, fier. » — Gunnar, de Givrecime"
},
"felinuit": {
"h": "les ruelles et les greniers la nuit",
"p": [
"Il chasse en silence, les yeux brillants. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Il se nourrit, dit-on, des cauchemars des gens qui dorment près de lui.",
"Il vole de petits objets brillants et les cache dans des recoins introuvables. Sa vitesse est son arme principale. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Pantharcane.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les grands-mères disent aux enfants qui ne dorment pas qu'il viendra chercher leurs rêves."
],
"cm": 60,
"kg": 8.6,
"soin": "Ne braquez jamais une lampe sur lui : il le prend comme une insulte. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Les Félinuit se cachent dans les ombres des lanternes, à Graineval. Ils veillent, je crois. » — Brune"
},
"pantharcane": {
"h": "les ruelles et les greniers la nuit, ainsi que les dojos et les terrains d'entraînement",
"p": [
"Il frappe depuis l'ombre sans un bruit. Ses quatre pattes robustes lui permettent de grimper sur des terrains difficiles. Il n'apparaît qu'à la tombée de la nuit, et disparaît au premier rayon de soleil.",
"Il protège les plus faibles de son groupe avec un courage étonnant. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Félinuit.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les grands-mères disent aux enfants qui ne dorment pas qu'il viendra chercher leurs rêves."
],
"cm": 77,
"kg": 22.8,
"soin": "Ne braquez jamais une lampe sur lui : il le prend comme une insulte. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Ne le laissez pas trop gagner contre les autres, il deviendrait insupportable.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Pantharcane se cachent dans les ombres des lanternes, à Graineval. Ils veillent, je crois. » — le Prof. Lierre"
},
"gelapin": {
"h": "les forêts de pins sous la neige, ainsi que les places de marché",
"p": [
"Ses oreilles gèlent l'air autour de lui. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Il se cache sous la neige fraîche et n'en sort qu'à la nuit tombée.",
"Il est souvent la première créature que les enfants rencontrent. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Lièvrigel.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 60,
"kg": 4.5,
"soin": "Par grande chaleur, il faut l'emmener près d'un lac ou d'une grotte froide. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il mange de tout, ce qui ne veut pas dire qu'il faut lui donner n'importe quoi.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Les Gelapin chantent la nuit, dans la toundra. Ça ressemble à du verre qui tinte. » — Hana, de la Vallée Érable"
},
"lievrigel": {
"h": "les toundras balayées par le blizzard, ainsi que les montagnes escarpées",
"p": [
"Il bondit sur la neige sans laisser de traces. Il se tient debout sur deux pattes et utilise ses membres avant comme des mains. Il hiberne pendant les étés trop chauds, au fond des grottes de glace.",
"Il salue toujours son adversaire avant un combat, et après. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Gelapin.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 126,
"kg": 78.0,
"soin": "Ses cristaux tombent au printemps ; ramassez-les, les forgerons les achètent à bon prix. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Ne le laissez pas trop gagner contre les autres, il deviendrait insupportable.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Lièvrigel a gelé la rivière pour que les enfants puissent la traverser. » — une infirmière de Port-Sève"
},
"taurignis": {
"h": "les cratères éteints et les sources chaudes, ainsi que les places de marché",
"p": [
"Il charge tête baissée, les cornes en flammes. Ses quatre pattes robustes lui permettent de grimper sur des terrains difficiles. Sa température interne ne descend jamais sous les quarante degrés, même en hiver.",
"Il s'adapte à tous les terrains et à presque tous les climats. Il mise tout sur l'attaque physique et ne craint pas les coups. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 81,
"kg": 16.5,
"soin": "Il mange beaucoup de charbon doux et de baies séchées ; l'eau froide est à proscrire pendant les repas. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Les jeux de balle sont le meilleur moyen de gagner sa confiance.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Les Taurignis sauvages dansent autour des feux de camp. Si tu chantes, ils restent. » — Siri, de la toundra"
},
"cendrelle": {
"h": "les déserts de pierre brûlés par le soleil",
"p": [
"Ses plumes laissent une traînée de cendres. Son plumage change légèrement de teinte selon les saisons. Il dort roulé autour des braises et grogne si on éteint le feu.",
"Il siffle en volant, et chaque individu a sa propre mélodie. En combat, il canalise son énergie à distance. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Phénixel.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 60,
"kg": 2.7,
"soin": "Il mange beaucoup de charbon doux et de baies séchées ; l'eau froide est à proscrire pendant les repas. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il a besoin d'espace pour déployer ses ailes chaque jour, sinon il devient nerveux.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Cendrelle m'a tenu chaud toute une nuit de blizzard. Je lui dois peut-être la vie. » — Mère Hélène, de Graineval"
},
"phenixel": {
"h": "les plages de sable noir près des coulées",
"p": [
"On le dit capable de renaître de ses braises. Il se pose rarement au sol, qu'il trouve trop dangereux. Il ne supporte pas la pluie et se réfugie sous les rochers à la moindre goutte.",
"Il nidifie au sommet des falaises, là où rien ne peut l'atteindre. Il préfère les attaques spéciales et garde ses distances. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Cendrelle.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 87,
"kg": 11.5,
"soin": "Il mange beaucoup de charbon doux et de baies séchées ; l'eau froide est à proscrire pendant les repas. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il a besoin d'espace pour déployer ses ailes chaque jour, sinon il devient nerveux.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Phénixel sauvages dansent autour des feux de camp. Si tu chantes, ils restent. » — Aline la forgeronne"
},
"tortumousse": {
"h": "les prairies hautes et les lisières de forêt, ainsi que les côtes rocheuses et les bancs de sable",
"p": [
"De la mousse pousse sur sa carapace humide. Ses quatre pattes robustes lui permettent de grimper sur des terrains difficiles. Au printemps, il disperse des graines qui germent en quelques jours.",
"Il nage à contre-courant pour se muscler et peut remonter des cascades entières. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Archipélone.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 48,
"kg": 4.4,
"soin": "Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« J'ai trouvé un Tortumousse endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — Fennec le conteur"
},
"archipelone": {
"h": "les prairies hautes et les lisières de forêt, ainsi que les côtes rocheuses et les bancs de sable",
"p": [
"On a déjà pris son dos pour une île. Ses quatre pattes robustes lui permettent de grimper sur des terrains difficiles. Il boit la rosée à l'aube, puis s'endort jusqu'à midi.",
"Il se nourrit de petites algues et filtre l'eau des étangs où il vit. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Tortumousse.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 80,
"kg": 21.0,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Archipélone pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — Marie-Sève, de Port-Sève"
},
"meduvenin": {
"h": "les marais tranquilles et les fontaines de village",
"p": [
"Ses filaments piquent même hors de l'eau. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il garde toujours un peu d'eau dans sa bouche, au cas où.",
"Il sécrète un poison léger qui le protège des prédateurs. Il résiste remarquablement bien aux attaques spéciales. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Médusoraire.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 43,
"kg": 1.7,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il nettoie lui-même les marais : laissez-le patauger dans les eaux stagnantes.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Méduvenin a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — le Professeur Hector"
},
"medusoraire": {
"h": "les estuaires où l'eau douce rencontre la mer",
"p": [
"Des bancs entiers fuient à son passage. Il roule plus qu'il ne marche, et rebondit quand il est content. Il garde toujours un peu d'eau dans sa bouche, au cas où.",
"Il sécrète un poison léger qui le protège des prédateurs. Il tient bon face aux attaques élémentaires. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Méduvenin.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 76,
"kg": 23.3,
"soin": "Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Son humeur se lit à la couleur de ses taches : plus elles sont vives, plus il est content.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Médusoraire a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — le Prof. Lierre"
},
"statuon": {
"h": "les carrières, les éboulis et les falaises",
"p": [
"Il garde des ruines depuis mille ans. Il marche en se dandinant, ce qui fait beaucoup rire les enfants. Il se roule en boule et dévale les pentes pour se déplacer plus vite.",
"Il semble lire dans les pensées, et répond parfois à des questions qu'on n'a pas posées. Il résiste remarquablement bien aux attaques spéciales. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 115,
"kg": 104.6,
"soin": "Il ronge des cailloux pour entretenir ses dents ; un sac de graviers propres est indispensable. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il fait parfois des cauchemars ; parlez-lui doucement, il se rendort aussitôt.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Les Statuon retiennent les éboulements, sur la route. Personne ne le leur a demandé. » — Aline la forgeronne"
},
"arcfoudre": {
"h": "les collines où la foudre tombe souvent",
"p": [
"Il se recharge sur les pylônes en altitude. Ses ailes larges lui permettent de planer longtemps. Les jours de grand orage, des dizaines d'entre eux se rassemblent sur les collines.",
"Il mange de la ferraille et rejette une poussière de rouille. En combat, il canalise son énergie à distance. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 75,
"kg": 36.5,
"soin": "Une brosse en bois, jamais en métal, pour démêler son pelage chargé. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Huilez ses articulations une fois par mois avec une huile végétale.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Un Arcfoudre m'a coiffé·e sans le vouloir. J'ai gardé la coupe trois semaines. » — le jeune Léo, dresseur débutant"
},
"racinol": {
"h": "les sous-bois humides et les jardins abandonnés",
"p": [
"Il chuchote la nuit sous les vieux arbres. Son corps mou et arrondi peut changer légèrement de forme. Il se cache sous les feuilles mortes dès qu'un prédateur approche.",
"Il se nourrit, dit-on, des cauchemars des gens qui dorment près de lui. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Mandracine.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 51,
"kg": 6.5,
"soin": "Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il aime les recoins sombres et les sacs à dos fermés ; laissez-lui une cachette.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« J'ai trouvé un Racinol endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — une infirmière de Port-Sève"
},
"mandracine": {
"h": "les vergers sauvages et les haies anciennes",
"p": [
"Son cri fait faner les fleurs alentour. Il marche en se dandinant, ce qui fait beaucoup rire les enfants. Il se cache sous les feuilles mortes dès qu'un prédateur approche.",
"Il n'apparaît qu'à la tombée de la nuit, et disparaît au premier rayon de soleil. En combat, il canalise son énergie à distance. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Racinol.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 102,
"kg": 31.8,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il dort le jour et s'active à la nuit tombée ; adaptez vos entraînements.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« J'ai trouvé un Mandracine endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — Hugo le mineur"
},
"louvaube": {
"h": "les villages de lutteurs, ainsi que les temples et les sanctuaires",
"p": [
"Il hurle au lever du soleil, jamais à la lune. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Il ne recule jamais, même face à plus fort que lui.",
"Les sanctuaires l'accueillent : sa présence apaiserait les cœurs troublés. En combat, il préfère le contact direct et frappe fort. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Lupaladin.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les dojos de Combrecœur accrochent son portrait au-dessus de la porte."
],
"cm": 48,
"kg": 4.6,
"soin": "Ne le laissez pas trop gagner contre les autres, il deviendrait insupportable. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il apprécie le miel doré et les fleurs blanches.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Louvaube s'entraîne même quand je dors. Je l'entends frapper le poteau du jardin. » — Brune"
},
"lupaladin": {
"h": "les cols venteux où l'on s'endurcit, ainsi que les sommets au lever du jour",
"p": [
"Il protège les voyageurs perdus. Sa posture droite lui donne un air étonnamment humain. Il imite les mouvements des dresseurs qui s'entraînent près de lui.",
"Il brille doucement quand il est en confiance, et s'éteint quand il a peur. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Louvaube.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les dojos de Combrecœur accrochent son portrait au-dessus de la porte."
],
"cm": 99,
"kg": 54.3,
"soin": "Ne le laissez pas trop gagner contre les autres, il deviendrait insupportable. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il apprécie le miel doré et les fleurs blanches.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Lupaladin a défendu ma boutique contre des voleurs. Il a refusé toute récompense. » — le Professeur Hector"
},
"chouettine": {
"h": "les ruines anciennes et les cercles de pierres",
"p": [
"Elle tourne la tête pour lire les pensées. Son plumage change légèrement de teinte selon les saisons. Il semble lire dans les pensées, et répond parfois à des questions qu'on n'a pas posées.",
"Il nidifie au sommet des falaises, là où rien ne peut l'atteindre. Il préfère les attaques spéciales et garde ses distances. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Noctélys.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les devins de Mirage-Sud prétendent comprendre ses rêves. Personne ne les croit vraiment."
],
"cm": 55,
"kg": 2.4,
"soin": "Il adore les livres, même s'il ne sait pas lire. Il aime le bruit des pages. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Ne le tenez jamais par les ailes : il ne vous le pardonnerait pas.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Chouettine m'a montré en rêve où j'avais perdu mon alliance. Elle y était. » — Hugo le mineur"
},
"noctelys": {
"h": "les lieux où l'on a beaucoup rêvé",
"p": [
"Elle veille sur les forêts endormies. Son plumage change légèrement de teinte selon les saisons. Il collectionne les souvenirs des lieux qu'il traverse.",
"Il suit les tempêtes à distance, comme un chien suit son maître. En combat, il canalise son énergie à distance. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Chouettine.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les devins de Mirage-Sud prétendent comprendre ses rêves. Personne ne les croit vraiment."
],
"cm": 88,
"kg": 10.9,
"soin": "Il fait parfois des cauchemars ; parlez-lui doucement, il se rendort aussitôt. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il a besoin d'espace pour déployer ses ailes chaque jour, sinon il devient nerveux.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Noctélys s'assoient près des gens tristes, dans les gares. Ils ne disent rien. Ça aide. » — le Professeur Hector"
},
"banquiseau": {
"h": "les toundras balayées par le blizzard, ainsi que les estuaires où l'eau douce rencontre la mer",
"p": [
"Il glisse sur le ventre pour aller plus vite. Il se pose rarement au sol, qu'il trouve trop dangereux. Son souffle givre les vitres, même en plein été.",
"Il se nourrit de petites algues et filtre l'eau des étangs où il vit. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Empereglace.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 46,
"kg": 2.6,
"soin": "Il préfère dormir dehors, même en hiver ; une couverture le vexe. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Les Banquiseau chantent la nuit, dans la toundra. Ça ressemble à du verre qui tinte. » — Mère Hélène, de Graineval"
},
"empereglace": {
"h": "les toundras balayées par le blizzard, ainsi que les marais tranquilles et les fontaines de village",
"p": [
"Il règne sur les banquises du nord. Il se pose rarement au sol, qu'il trouve trop dangereux. Les voyageurs perdus dans le blizzard racontent qu'il les a guidés jusqu'à un abri.",
"Il devient nerveux quand la mer est trop calme, comme s'il sentait quelque chose venir. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Banquiseau.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 70,
"kg": 9.9,
"soin": "Il préfère dormir dehors, même en hiver ; une couverture le vexe. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Empereglace chantent la nuit, dans la toundra. Ça ressemble à du verre qui tinte. » — Brune"
},
"scarabronze": {
"h": "les ruines industrielles",
"p": [
"Sa carapace de bronze sonne comme une cloche. Sa carapace légère le protège sans l'alourdir. Il se sent attiré par les aimants et peut rester collé à un portail toute une nuit.",
"Il se cache sous les feuilles mortes dès qu'un prédateur approche. En combat, il préfère le contact direct et frappe fort. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 58,
"kg": 6.9,
"soin": "Huilez ses articulations une fois par mois avec une huile végétale. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Scarabronze a réparé la grille du jardin avec son propre corps. Il est resté une heure, fier. » — Capitaine Morgane"
},
"brumelin": {
"h": "les cimetières de bateaux et les épaves, ainsi que les toundras balayées par le blizzard",
"p": [
"Il apparaît dans la brume des matins d'hiver. Son corps est si souple qu'il peut se glisser dans des fissures étroites. On le reconnaît à ses yeux brillants dans le noir, et à rien d'autre.",
"Son souffle givre les vitres, même en plein été. En combat, il canalise son énergie à distance. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les grands-mères disent aux enfants qui ne dorment pas qu'il viendra chercher leurs rêves."
],
"cm": 56,
"kg": 6.0,
"soin": "Il aime les recoins sombres et les sacs à dos fermés ; laissez-lui une cachette. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Ses cristaux tombent au printemps ; ramassez-les, les forgerons les achètent à bon prix.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Brumelin vole mes chaussettes. Uniquement la gauche. Je ne sais pas pourquoi. » — Brune"
},
"lavarelle": {
"h": "les déserts de pierre brûlés par le soleil, ainsi que les carrières, les éboulis et les falaises",
"p": [
"Elle se baigne dans la lave tiède. Il se love en spirale pour dormir et pour se protéger. Il dort roulé autour des braises et grogne si on éteint le feu.",
"Sa carapace porte les marques de chaque chute qu'il a survécue. Sa résistance est légendaire : on se fatigue avant lui. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Magmorne.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 117,
"kg": 82.0,
"soin": "Il mange beaucoup de charbon doux et de baies séchées ; l'eau froide est à proscrire pendant les repas. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Il ronge des cailloux pour entretenir ses dents ; un sac de graviers propres est indispensable.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Les Lavarelle sauvages dansent autour des feux de camp. Si tu chantes, ils restent. » — l'archiviste Basile"
},
"magmorne": {
"h": "les cratères éteints et les sources chaudes",
"p": [
"Son dos fume comme un volcan endormi. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Il recrache des étincelles quand il éternue, ce qui a déjà déclenché plusieurs incendies.",
"Il mange des cailloux riches en minéraux et recrache les autres. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Lavarelle.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 78,
"kg": 22.0,
"soin": "Un bain de cendres tièdes une fois par semaine entretient l'éclat de ses écailles. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Magmorne sauvages dansent autour des feux de camp. Si tu chantes, ils restent. » — le Prof. Lierre"
},
"dunelot": {
"h": "les gorges profondes creusées par les rivières",
"p": [
"Il se cache sous le sable chaud. Son corps mou et arrondi peut changer légèrement de forme. Il peut rester immobile si longtemps que la mousse pousse sur son dos.",
"Sa carapace porte les marques de chaque chute qu'il a survécue. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Sablarque.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 36,
"kg": 2.2,
"soin": "Un massage avec une pierre ponce le détend après les longues marches. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Dunelot a creusé un puits dans mon jardin. On a trouvé de l'eau. Et une pièce ancienne. » — Hana, de la Vallée Érable"
},
"sablarque": {
"h": "les carrières, les éboulis et les falaises, ainsi que les pics inaccessibles",
"p": [
"Il soulève des tempêtes de sable en ondulant. Il se love en spirale pour dormir et pour se protéger. Sa carapace porte les marques de chaque chute qu'il a survécue.",
"Il garde jalousement un trésor dont personne ne connaît la nature. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Dunelot.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 183,
"kg": 529.5,
"soin": "Un massage avec une pierre ponce le détend après les longues marches. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Il aime dormir en hauteur, sur un rocher ou un toit.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Sablarque retiennent les éboulements, sur la route. Personne ne le leur a demandé. » — Siri, de la toundra"
},
"wyvernel": {
"h": "les îles battues par les tempêtes, ainsi que les cratères éteints et les sources chaudes",
"p": [
"Il s'exerce à cracher du feu sur les falaises. Il se pose rarement au sol, qu'il trouve trop dangereux. Il change de repaire à chaque siècle.",
"Sa température interne ne descend jamais sous les quarante degrés, même en hiver. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Ignivern.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Le premier dresseur, dit-on, en avait un à ses côtés."
],
"cm": 59,
"kg": 10.1,
"soin": "Les dragons vivent longtemps : il se souviendra de chaque geste que vous aurez eu pour lui. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Prévoyez toujours une pierre plate pour qu'il puisse dormir sans brûler le sol.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« J'ai vu un Wyvernel une seule fois. Il m'a regardé comme si j'étais une question. » — l'archiviste Basile"
},
"ignivern": {
"h": "les pics inaccessibles, ainsi que les plages de sable noir près des coulées",
"p": [
"Ses ailes chauffent l'air au point de le faire trembler. Ses ailes larges lui permettent de planer longtemps. Il vit très longtemps : certains auraient connu le premier dresseur.",
"Sa température interne ne descend jamais sous les quarante degrés, même en hiver. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Wyvernel.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Le premier dresseur, dit-on, en avait un à ses côtés."
],
"cm": 77,
"kg": 26.0,
"soin": "Il exige le respect avant l'affection ; ne le brusquez jamais. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Les jours de pluie, gardez-le à l'abri : sa flamme vacille et son humeur aussi.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon grand-père disait qu'un Ignivern l'avait porté au-dessus de la vague. Personne ne le croyait. Moi si. » — Aline la forgeronne"
},
"cervaube": {
"h": "les clairières baignées de soleil",
"p": [
"Des fleurs s'ouvrent sur son passage. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Il fuit les lieux trop sombres et dépérit dans les grottes.",
"Il se cache sous les feuilles mortes dès qu'un prédateur approche. Il tient bon face aux attaques élémentaires. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. On allume une lanterne à son effigie lors de la fête de l'aube, à Graineval."
],
"cm": 69,
"kg": 12.8,
"soin": "Évitez de le regarder fixement quand il brille fort, pour vos yeux comme pour sa pudeur. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Cervaube brille plus fort quand ma fille rit. On la fait rire souvent. » — Marie-Sève, de Port-Sève"
},
"mimicoffre": {
"h": "les ponts métalliques et les voies ferrées, ainsi que les cimetières de bateaux et les épaves",
"p": [
"Il imite un coffre au trésor pour piéger les curieux. Son corps mou et arrondi peut changer légèrement de forme. Les ouvriers lui confient les tâches les plus lourdes, qu'il accomplit sans broncher.",
"Il vole de petits objets brillants et les cache dans des recoins introuvables. En combat, il préfère le contact direct et frappe fort. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 61,
"kg": 16.3,
"soin": "Il ne craint pas le froid mais déteste la rouille : séchez-le après la pluie. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Ne braquez jamais une lampe sur lui : il le prend comme une insulte.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Les Mimicoffre sauvages collectionnent les clés perdues. Si tu cherches la tienne, demande-leur. » — Hana, de la Vallée Érable"
},
"baleinon": {
"h": "les lagons tièdes et les récifs",
"p": [
"Son chant porte à travers tout l'océan. Son corps fuselé fend l'eau sans un bruit. Il nage à contre-courant pour se muscler et peut remonter des cascades entières.",
"Il garde toujours un peu d'eau dans sa bouche, au cas où. En combat, il encaisse les coups sans broncher et use l'adversaire. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 108,
"kg": 31.5,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Un Baleinon a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — l'archiviste Basile"
},
"chimerion": {
"h": "à peu près partout où l'on vit",
"p": [
"Il possède les traits de plusieurs créatures. Ses quatre pattes robustes lui permettent de grimper sur des terrains difficiles. Il dort beaucoup, et partout.",
"Il s'adapte à tous les terrains et à presque tous les climats. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 70,
"kg": 9.6,
"soin": "Il s'adapte à presque tout ; une routine régulière lui suffit. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Les Chimérion sont les premiers à revenir après une catastrophe. Ils reconstruisent avec nous. » — Brune"
},
"cervolant": {
"h": "les crêtes battues par les vents",
"p": [
"Un cerf-volant vivant. Il ne se pose que quand le vent tombe. Ses ailes larges lui permettent de planer longtemps. Il adore jouer avec les cerfs-volants des enfants, quitte à les emporter.",
"Il plane des heures sans battre des ailes, porté par les courants chauds. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Les habitants d'Éclosia le considèrent comme un enfant de la Graine : le blesser sans raison porte malheur. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 81,
"kg": 5.0,
"soin": "Lissez ses plumes dans le sens du vent après chaque vol ; il apprécie ce rituel. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Les Cervolant volent en V au-dessus du port avant les tempêtes. Les pêcheurs les écoutent. » — Théo le passeur"
},
"taupiquet": {
"h": "les ruines de murs anciens",
"p": [
"Sa foreuse creuse des tunnels sous les champs d'Éclosia. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Il dort des semaines entières sans bouger, puis disparaît en une nuit.",
"Les mineurs le considèrent comme un porte-bonheur : là où il creuse, on trouve des filons. Sa résistance est légendaire : on se fatigue avant lui. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Comme tous les Éclos, il est né la nuit de la Germination, quand la sève de la Graine-Monde s'est répandue sur les six terres. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 97,
"kg": 58.4,
"soin": "Un massage avec une pierre ponce le détend après les longues marches. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Les Taupiquet retiennent les éboulements, sur la route. Personne ne le leur a demandé. » — Ondine, de Mirage-Nord"
},
"petalimace": {
"h": "les sous-bois humides et les jardins abandonnés",
"p": [
"Elle laisse derrière elle une traînée de pétales. Il se love en spirale pour dormir et pour se protéger. Il passe des heures immobile au soleil, et l'on dit que les fleurs poussent plus vite autour de lui.",
"Au printemps, il disperse des graines qui germent en quelques jours. Il tient bon face aux attaques élémentaires. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Les habitants d'Éclosia le considèrent comme un enfant de la Graine : le blesser sans raison porte malheur. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 210,
"kg": 509.4,
"soin": "Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« J'ai trouvé un Pétalimace endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — Ondine, de Mirage-Nord"
},
"champignard": {
"h": "les vergers sauvages et les haies anciennes, ainsi que les lisières entre le crépuscule et la nuit",
"p": [
"Il pousse la nuit, au pied des racines de la Graine. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas.",
"Il vole de petits objets brillants et les cache dans des recoins introuvables. Il résiste remarquablement bien aux attaques spéciales. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Les habitants d'Éclosia le considèrent comme un enfant de la Graine : le blesser sans raison porte malheur. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 57,
"kg": 10.4,
"soin": "Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il aime les recoins sombres et les sacs à dos fermés ; laissez-lui une cachette.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« J'ai trouvé un Champignard endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — Mamie Odette, Bourg-Aurore"
},
"magmoule": {
"h": "les forges abandonnées et les fours à pain",
"p": [
"Sa coquille garde la lave tiède pendant des jours. Son corps mou et arrondi peut changer légèrement de forme. Il dort roulé autour des braises et grogne si on éteint le feu.",
"Sa carapace porte les marques de chaque chute qu'il a survécue. Sa résistance est légendaire : on se fatigue avant lui. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Les habitants d'Éclosia le considèrent comme un enfant de la Graine : le blesser sans raison porte malheur. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 54,
"kg": 12.1,
"soin": "Prévoyez toujours une pierre plate pour qu'il puisse dormir sans brûler le sol. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il supporte mal l'humidité prolongée qui fissure sa carapace.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Un Magmoule m'a tenu chaud toute une nuit de blizzard. Je lui dois peut-être la vie. » — le Professeur Hector"
},
"coraline": {
"h": "les rivières claires et les étangs profonds, ainsi que les ruines de murs anciens",
"p": [
"Ses pinces de corail repoussent quand elles cassent. Sa carapace légère le protège sans l'alourdir. Il garde toujours un peu d'eau dans sa bouche, au cas où.",
"Il mange des cailloux riches en minéraux et recrache les autres. Il mise tout sur l'attaque physique et ne craint pas les coups. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Comme tous les Éclos, il est né la nuit de la Germination, quand la sève de la Graine-Monde s'est répandue sur les six terres. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 44,
"kg": 4.1,
"soin": "Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Il supporte mal l'humidité prolongée qui fissure sa carapace.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Coraline refuse de nager quand la mer est trop calme. Il dit que ce n'est pas normal. » — Capitaine Morgane"
},
"brasaile": {
"h": "les forges abandonnées et les fours à pain",
"p": [
"Sa crête s'enflamme quand elle plonge en piqué. Son plumage change légèrement de teinte selon les saisons. Ses flammes changent de couleur selon son humeur : orange s'il est calme, bleu s'il est en colère.",
"Il adore jouer avec les cerfs-volants des enfants, quitte à les emporter. Sa vitesse est son arme principale. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Avant la Germination, aucune créature comme lui n'existait. Les savants se demandent encore d'où vient son apparence. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 75,
"kg": 8.2,
"soin": "Il mange beaucoup de charbon doux et de baies séchées ; l'eau froide est à proscrire pendant les repas. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Lissez ses plumes dans le sens du vent après chaque vol ; il apprécie ce rituel.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Un Brasaile m'a tenu chaud toute une nuit de blizzard. Je lui dois peut-être la vie. » — un pêcheur anonyme de Solmarina"
},
"galetin": {
"h": "les champs de pierres où rien ne pousse",
"p": [
"Il se fond dans les galets des rivières. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il mange des cailloux riches en minéraux et recrache les autres.",
"Il se roule en boule et dévale les pentes pour se déplacer plus vite. Sa résistance est légendaire : on se fatigue avant lui. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Comme tous les Éclos, il est né la nuit de la Germination, quand la sève de la Graine-Monde s'est répandue sur les six terres. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 57,
"kg": 16.6,
"soin": "Un massage avec une pierre ponce le détend après les longues marches. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Galetin a creusé un puits dans mon jardin. On a trouvé de l'eau. Et une pièce ancienne. » — le Prof. Lierre"
},
"frimousse": {
"h": "les toundras balayées par le blizzard",
"p": [
"Sa couronne de givre fond quand on la câline. Ses quatre pattes robustes lui permettent de grimper sur des terrains difficiles. Il hiberne pendant les étés trop chauds, au fond des grottes de glace.",
"Les voyageurs perdus dans le blizzard racontent qu'il les a guidés jusqu'à un abri. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Les habitants d'Éclosia le considèrent comme un enfant de la Graine : le blesser sans raison porte malheur. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 80,
"kg": 20.5,
"soin": "Par grande chaleur, il faut l'emmener près d'un lac ou d'une grotte froide. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Un Frimousse m'a apporté un flocon parfait, sans fondre, sur le bout de son nez. » — Mère Hélène, de Graineval"
},
"givrelame": {
"h": "les forêts de pins sous la neige, ainsi que les carrières, les éboulis et les falaises",
"p": [
"Sa corne de glace tranche la banquise. Ses antennes captent les vibrations à plusieurs mètres. Il fabrique de petites sculptures de glace que personne ne comprend.",
"Il mange des cailloux riches en minéraux et recrache les autres. Il mise tout sur l'attaque physique et ne craint pas les coups. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Avant la Germination, aucune créature comme lui n'existait. Les savants se demandent encore d'où vient son apparence. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 46,
"kg": 3.7,
"soin": "Il préfère dormir dehors, même en hiver ; une couverture le vexe. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Il supporte mal l'humidité prolongée qui fissure sa carapace.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Un Givrelame m'a apporté un flocon parfait, sans fondre, sur le bout de son nez. » — le jeune Léo, dresseur débutant"
},
"lanterneau": {
"h": "les sommets au lever du jour, ainsi que les déserts de pierre brûlés par le soleil",
"p": [
"On l'accroche aux fenêtres les soirs de fête. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il fuit les lieux trop sombres et dépérit dans les grottes.",
"Il recrache des étincelles quand il éternue, ce qui a déjà déclenché plusieurs incendies. Il préfère les attaques spéciales et garde ses distances. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Comme tous les Éclos, il est né la nuit de la Germination, quand la sève de la Graine-Monde s'est répandue sur les six terres. On allume une lanterne à son effigie lors de la fête de l'aube, à Graineval."
],
"cm": 76,
"kg": 24.1,
"soin": "Dans l'obscurité totale, il devient anxieux ; une veilleuse le rassure. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Prévoyez toujours une pierre plate pour qu'il puisse dormir sans brûler le sol.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Un Lanterneau a éclairé ma barque toute la nuit, jusqu'au port. » — Tavi junior"
},
"encrelot": {
"h": "les grottes où personne ne s'aventure",
"p": [
"Il laisse des traces d'encre là où il a eu peur. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. On le reconnaît à ses yeux brillants dans le noir, et à rien d'autre.",
"Il n'apparaît qu'à la tombée de la nuit, et disparaît au premier rayon de soleil. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Comme tous les Éclos, il est né la nuit de la Germination, quand la sève de la Graine-Monde s'est répandue sur les six terres. Les grands-mères disent aux enfants qui ne dorment pas qu'il viendra chercher leurs rêves."
],
"cm": 87,
"kg": 37.5,
"soin": "Il aime les recoins sombres et les sacs à dos fermés ; laissez-lui une cachette. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Encrelot vole mes chaussettes. Uniquement la gauche. Je ne sais pas pourquoi. » — Marie-Sève, de Port-Sève"
},
"rubanelle": {
"h": "les crêtes battues par les vents",
"p": [
"Elle danse dans les rues de Valmont au crépuscule. Ses antennes captent les vibrations à plusieurs mètres. Il adore jouer avec les cerfs-volants des enfants, quitte à les emporter.",
"Il se lève toujours avant le soleil, comme pour l'appeler. En combat, il canalise son énergie à distance. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Les habitants d'Éclosia le considèrent comme un enfant de la Graine : le blesser sans raison porte malheur. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 51,
"kg": 2.4,
"soin": "Il a besoin d'espace pour déployer ses ailes chaque jour, sinon il devient nerveux. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Évitez de le regarder fixement quand il brille fort, pour vos yeux comme pour sa pudeur.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Un Rubanelle m'a volé mon écharpe. Je l'ai retrouvée au sommet d'un clocher, pliée. » — Théo le passeur"
},
"horlogon": {
"h": "les collines où la foudre tombe souvent, ainsi que les ponts métalliques et les voies ferrées",
"p": [
"Son engrenage bat la seconde. Il n'est jamais en retard. Il se déplace par petits bonds rapides. Il communique par de petites décharges qui crépitent dans l'air.",
"Son corps tinte comme une cloche quand il marche. Sa résistance est légendaire : on se fatigue avant lui. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Avant la Germination, aucune créature comme lui n'existait. Les savants se demandent encore d'où vient son apparence. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 42,
"kg": 4.7,
"soin": "Il se calme en touchant le sol pieds nus, ou pattes nues : laissez-le se décharger après un combat. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Huilez ses articulations une fois par mois avec une huile végétale.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Quand l'orage approche, mon Horlogon se met à la fenêtre et attend comme un enfant. » — Aline la forgeronne"
},
"zapillon": {
"h": "les champs d'herbes sèches avant la pluie",
"p": [
"Il attire les orages en battant des ailes. Son plumage change légèrement de teinte selon les saisons. Une seule de ses décharges peut alimenter une maison pendant une soirée.",
"Il nidifie au sommet des falaises, là où rien ne peut l'atteindre. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Comme tous les Éclos, il est né la nuit de la Germination, quand la sève de la Graine-Monde s'est répandue sur les six terres. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 71,
"kg": 4.8,
"soin": "Une brosse en bois, jamais en métal, pour démêler son pelage chargé. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Ne le tenez jamais par les ailes : il ne vous le pardonnerait pas.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Un Zapillon m'a coiffé·e sans le vouloir. J'ai gardé la coupe trois semaines. » — Brune"
},
"surfouine": {
"h": "les estuaires où l'eau douce rencontre la mer",
"p": [
"Elle surfe sur les vagues des Îles Soleil. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps.",
"Les voyageurs perdus dans le blizzard racontent qu'il les a guidés jusqu'à un abri. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Comme tous les Éclos, il est né la nuit de la Germination, quand la sève de la Graine-Monde s'est répandue sur les six terres. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 76,
"kg": 15.4,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Ses cristaux tombent au printemps ; ramassez-les, les forgerons les achètent à bon prix.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Un Surfouine a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Kai le surfeur"
},
"voltacoco": {
"h": "les plateaux exposés aux orages, ainsi que les clairières où la rosée tient jusqu'à midi",
"p": [
"Il tombe des palmiers en plein orage. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Les jours de grand orage, des dizaines d'entre eux se rassemblent sur les collines.",
"Il passe des heures immobile au soleil, et l'on dit que les fleurs poussent plus vite autour de lui. Sa résistance est légendaire : on se fatigue avant lui. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Les habitants d'Éclosia le considèrent comme un enfant de la Graine : le blesser sans raison porte malheur. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 78,
"kg": 15.7,
"soin": "Ne le laissez pas près des appareils électriques : il les recharge, puis les grille. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Un Voltacoco m'a coiffé·e sans le vouloir. J'ai gardé la coupe trois semaines. » — le Professeur Hector"
},
"ronceloup": {
"h": "les lisières entre le crépuscule et la nuit",
"p": [
"Ronceloup est le chien de garde de l'Ordre Racine. Ses épines piquent dans le noir.",
"À l'état sauvage, il est beaucoup plus doux : il protège les jeunes arbres des herbivores.",
"Les sbires de la Racine le dressaient à la peur. Libéré, il redevient joueur en quelques jours."
],
"cm": 58,
"kg": 7.8,
"soin": "Il mange peu, mais il vole parfois la nourriture des autres pour jouer. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Ronceloup vole mes chaussettes. Uniquement la gauche. Je ne sais pas pourquoi. » — Mère Hélène, de Graineval"
},
"epineant": {
"h": "les grottes où personne ne s'aventure",
"p": [
"Épinéant était le compagnon de Maître Ronce. Il ne pardonne rien.",
"Sa carapace de ronces noires a, dit-on, poussé sur la colère de son dresseur.",
"Depuis la chute de Ronce, on en voit parfois à Port-Sève, assis près d'un vieil homme qui plante des arbres."
],
"cm": 81,
"kg": 29.8,
"soin": "Il aime les recoins sombres et les sacs à dos fermés ; laissez-lui une cachette. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il ronge des cailloux pour entretenir ses dents ; un sac de graviers propres est indispensable.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Épinéant se cachent dans les ombres des lanternes, à Graineval. Ils veillent, je crois. » — Brune"
},
"feuillonq": {
"h": "les prairies hautes et les lisières de forêt",
"p": [
"Il se nourrit de lumière et de rosée. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Il boit la rosée à l'aube, puis s'endort jusqu'à midi.",
"Il se cache sous les feuilles mortes dès qu'un prédateur approche. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Sylvarbre.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 51,
"kg": 2.9,
"soin": "Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« J'ai trouvé un Feuillon endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — le Professeur Hector"
},
"sylvarbre": {
"h": "les prairies hautes et les lisières de forêt",
"p": [
"Il se nourrit de lumière et de rosée. Il se déplace par petits bonds rapides. Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre.",
"Il passe des heures immobile au soleil, et l'on dit que les fleurs poussent plus vite autour de lui. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Feuillon. Bien entraîné, il deviendra Chênegard.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 48,
"kg": 2.1,
"soin": "Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« J'ai trouvé un Sylvarbre endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — Ondine, de Mirage-Nord"
},
"chenegard": {
"h": "les talus fleuris le long des routes, ainsi que les gorges profondes creusées par les rivières",
"p": [
"Il se nourrit de lumière et de rosée. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Il boit la rosée à l'aube, puis s'endort jusqu'à midi.",
"Il dort des semaines entières sans bouger, puis disparaît en une nuit. Sa résistance est légendaire : on se fatigue avant lui. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Sylvarbre.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 126,
"kg": 112.0,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il ronge des cailloux pour entretenir ses dents ; un sac de graviers propres est indispensable.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« J'ai trouvé un Chênegard endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — un pêcheur anonyme de Solmarina"
},
"braisette": {
"h": "les forges abandonnées et les fours à pain",
"p": [
"Il dort roulé en boule près des braises. Il marche en se dandinant, ce qui fait beaucoup rire les enfants. Il recrache des étincelles quand il éternue, ce qui a déjà déclenché plusieurs incendies.",
"Sa température interne ne descend jamais sous les quarante degrés, même en hiver. En combat, il préfère le contact direct et frappe fort. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Flambrume.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 85,
"kg": 27.0,
"soin": "Prévoyez toujours une pierre plate pour qu'il puisse dormir sans brûler le sol. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Les Braisette sauvages dansent autour des feux de camp. Si tu chantes, ils restent. » — Hana, de la Vallée Érable"
},
"flambrume": {
"h": "les pentes volcaniques et les cendres tièdes",
"p": [
"Il dort roulé en boule près des braises. Il glisse sans un bruit et surprend souvent les promeneurs. Il dort roulé autour des braises et grogne si on éteint le feu.",
"Sa température interne ne descend jamais sous les quarante degrés, même en hiver. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Braisette. Bien entraîné, il deviendra Pyrolion.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 165,
"kg": 134.8,
"soin": "Prévoyez toujours une pierre plate pour qu'il puisse dormir sans brûler le sol. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Flambrume a brûlé le gâteau d'anniversaire de ma fille. Elle a trouvé ça génial. » — Mamie Odette, Bourg-Aurore"
},
"pyrolion": {
"h": "les déserts de pierre brûlés par le soleil",
"p": [
"Sa queue rougeoie quand il est content. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Sa température interne ne descend jamais sous les quarante degrés, même en hiver.",
"Il salue toujours son adversaire avant un combat, et après. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Flambrume.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 123,
"kg": 85.6,
"soin": "Il mange beaucoup de charbon doux et de baies séchées ; l'eau froide est à proscrire pendant les repas. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Ne le laissez pas trop gagner contre les autres, il deviendrait insupportable.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Les Pyrolion sauvages dansent autour des feux de camp. Si tu chantes, ils restent. » — Tavi junior"
},
"ondelin": {
"h": "les estuaires où l'eau douce rencontre la mer",
"p": [
"On l'entend chanter les soirs de pluie. Son corps fuselé fend l'eau sans un bruit. Il se nourrit de petites algues et filtre l'eau des étangs où il vit.",
"Il guide parfois les nageurs perdus vers la rive. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Marévan.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 68,
"kg": 8.5,
"soin": "Il adore les algues fraîches et les petits crustacés, mais il faut varier son alimentation. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Ondelin a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — l'archiviste Basile"
},
"marevan": {
"h": "les estuaires où l'eau douce rencontre la mer",
"p": [
"Il nage à contre-courant pour se muscler. Il peut sauter hors de l'eau sur plusieurs mètres. Il devient nerveux quand la mer est trop calme, comme s'il sentait quelque chose venir.",
"Il nage à contre-courant pour se muscler et peut remonter des cascades entières. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Ondelin. Bien entraîné, il deviendra Abyssard.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 85,
"kg": 27.6,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Marévan a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — l'archiviste Basile"
},
"abyssardq": {
"h": "les marais tranquilles et les fontaines de village, ainsi que les grottes de glace bleue",
"p": [
"On l'entend chanter les soirs de pluie. Son corps fuselé fend l'eau sans un bruit. Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps.",
"Il ne boit que de la neige fondue, jamais d'eau courante. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Marévan.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 114,
"kg": 51.9,
"soin": "Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Par grande chaleur, il faut l'emmener près d'un lac ou d'une grotte froide.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Un Abyssard a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Léon, apprenti de Clairsemis"
},
"piouli": {
"h": "les places de marché",
"p": [
"Il s'adapte à tous les terrains. Il se pose rarement au sol, qu'il trouve trop dangereux. Curieux, il suit les dresseurs sur des kilomètres.",
"Il plane des heures sans battre des ailes, porté par les courants chauds. Sa vitesse est son arme principale. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Ventaile.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 54,
"kg": 3.1,
"soin": "Les jeux de balle sont le meilleur moyen de gagner sa confiance. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Lissez ses plumes dans le sens du vent après chaque vol ; il apprécie ce rituel.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Piouli n'a rien d'extraordinaire. C'est pour ça que je l'aime. » — Marie-Sève, de Port-Sève"
},
"ventaile": {
"h": "les champs, les villages et les routes, ainsi que les clochers et les tours de guet",
"p": [
"Il s'adapte à tous les terrains. Ses ailes larges lui permettent de planer longtemps. Il est souvent la première créature que les enfants rencontrent.",
"Il suit les tempêtes à distance, comme un chien suit son maître. Sa vitesse est son arme principale. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Piouli.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 83,
"kg": 15.2,
"soin": "Il aime les caresses derrière les oreilles, ou ce qui en tient lieu. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Les graines de tournesol et les baies acides sont ses friandises préférées.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Ventaile n'a rien d'extraordinaire. C'est pour ça que je l'aime. » — Kai le surfeur"
},
"chenillou": {
"h": "les talus fleuris le long des routes",
"p": [
"Des feuilles poussent sur son dos au printemps. Il se tient debout sur deux pattes et utilise ses membres avant comme des mains. Au printemps, il disperse des graines qui germent en quelques jours.",
"Il passe des heures immobile au soleil, et l'on dit que les fleurs poussent plus vite autour de lui. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Cocoffre.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 64,
"kg": 10.5,
"soin": "Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Chenillou a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — le Professeur Hector"
},
"cocoffre": {
"h": "les talus fleuris le long des routes",
"p": [
"Des feuilles poussent sur son dos au printemps. Il roule plus qu'il ne marche, et rebondit quand il est content. Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas.",
"Il boit la rosée à l'aube, puis s'endort jusqu'à midi. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Chenillou. Bien entraîné, il deviendra Papillune.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 59,
"kg": 6.6,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Cocoffre a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — un pêcheur anonyme de Solmarina"
},
"papillune": {
"h": "les clairières où la rosée tient jusqu'à midi, ainsi que les falaises côtières et les phares",
"p": [
"Il se nourrit de lumière et de rosée. Son plumage change légèrement de teinte selon les saisons. Il boit la rosée à l'aube, puis s'endort jusqu'à midi.",
"Il adore jouer avec les cerfs-volants des enfants, quitte à les emporter. Sa vitesse est son arme principale. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Cocoffre.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 117,
"kg": 20.0,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Lissez ses plumes dans le sens du vent après chaque vol ; il apprécie ce rituel.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« J'ai trouvé un Papillune endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — Théo le passeur"
},
"mousseau": {
"h": "les clairières où la rosée tient jusqu'à midi",
"p": [
"Il se nourrit de lumière et de rosée. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas.",
"Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Mousserond.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 56,
"kg": 3.7,
"soin": "Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mousseau a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — Hugo le mineur"
},
"mousserond": {
"h": "les vergers sauvages et les haies anciennes",
"p": [
"Des feuilles poussent sur son dos au printemps. Il marche en se dandinant, ce qui fait beaucoup rire les enfants. Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre.",
"Il se nourrit, dit-on, des cauchemars des gens qui dorment près de lui. Il est équilibré en combat et s'adapte à toutes les situations. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Mousseau.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 103,
"kg": 61.2,
"soin": "Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il aime les recoins sombres et les sacs à dos fermés ; laissez-lui une cachette.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Mousserond pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — Fennec le conteur"
},
"lucioli": {
"h": "les clairières où la rosée tient jusqu'à midi, ainsi que les plateaux exposés aux orages",
"p": [
"Des feuilles poussent sur son dos au printemps. Il se tient debout sur deux pattes et utilise ses membres avant comme des mains. Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre.",
"Les jours de grand orage, des dizaines d'entre eux se rassemblent sur les collines. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 130,
"kg": 76.9,
"soin": "Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il se calme en touchant le sol pieds nus, ou pattes nues : laissez-le se décharger après un combat.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Lucioli a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — Mère Hélène, de Graineval"
},
"terrier": {
"h": "les champs de pierres où rien ne pousse",
"p": [
"Il dort des semaines sans bouger. Il glisse sans un bruit et surprend souvent les promeneurs. Il mange des cailloux riches en minéraux et recrache les autres.",
"Il mange des cailloux riches en minéraux et recrache les autres. En combat, il préfère le contact direct et frappe fort. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Taupelin.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 117,
"kg": 71.8,
"soin": "Il supporte mal l'humidité prolongée qui fissure sa carapace. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Terrier a creusé un puits dans mon jardin. On a trouvé de l'eau. Et une pièce ancienne. » — Tavi junior"
},
"taupelin": {
"h": "les gorges profondes creusées par les rivières, ainsi que les montagnes riches en minerai",
"p": [
"Sa carapace porte les traces de mille chutes. Sa carapace légère le protège sans l'alourdir. Les mineurs le considèrent comme un porte-bonheur : là où il creuse, on trouve des filons.",
"Il ne rouille jamais, tant qu'on l'entretient avec un peu d'huile. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Terrier.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 46,
"kg": 8.9,
"soin": "Un massage avec une pierre ponce le détend après les longues marches. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Il ne craint pas le froid mais déteste la rouille : séchez-le après la pluie.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Taupelin a creusé un puits dans mon jardin. On a trouvé de l'eau. Et une pièce ancienne. » — Hugo le mineur"
},
"crabulle": {
"h": "les côtes rocheuses et les bancs de sable",
"p": [
"Il nage à contre-courant pour se muscler. Il peut sauter hors de l'eau sur plusieurs mètres. Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps.",
"Il guide parfois les nageurs perdus vers la rive. Sa résistance est légendaire : on se fatigue avant lui. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Pincecrabe.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 63,
"kg": 6.5,
"soin": "Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Crabulle qui m'a réappris à nager. » — Théo le passeur"
},
"pincecrabe": {
"h": "les lagons tièdes et les récifs, ainsi que les mines de fer et les filons de cuivre",
"p": [
"Il nage à contre-courant pour se muscler. Son corps fuselé fend l'eau sans un bruit. Il guide parfois les nageurs perdus vers la rive.",
"Il se polit le blindage avec du sable, pendant des heures. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Crabulle.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 109,
"kg": 93.2,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Il tinte doucement quand il est content. Apprenez à reconnaître ce son.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Pincecrabe qui m'a réappris à nager. » — le Professeur Hector"
},
"mouettine": {
"h": "les rivières claires et les étangs profonds",
"p": [
"Il nage à contre-courant pour se muscler. Son plumage change légèrement de teinte selon les saisons. Il nage à contre-courant pour se muscler et peut remonter des cascades entières.",
"Il plane des heures sans battre des ailes, porté par les courants chauds. Sa vitesse est son arme principale. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 80,
"kg": 10.8,
"soin": "Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Les graines de tournesol et les baies acides sont ses friandises préférées.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Un Mouettine a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Siri, de la toundra"
},
"braisillon": {
"h": "les pentes volcaniques et les cendres tièdes",
"p": [
"Il dort roulé en boule près des braises. Ses antennes captent les vibrations à plusieurs mètres. Il dort roulé autour des braises et grogne si on éteint le feu.",
"Ses flammes changent de couleur selon son humeur : orange s'il est calme, bleu s'il est en colère. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Magmor.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 34,
"kg": 1.1,
"soin": "Les jours de pluie, gardez-le à l'abri : sa flamme vacille et son humeur aussi. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Braisillon a brûlé le gâteau d'anniversaire de ma fille. Elle a trouvé ça génial. » — Siri, de la toundra"
},
"magmor": {
"h": "les forges abandonnées et les fours à pain, ainsi que les grottes sèches et les mines oubliées",
"p": [
"Il dort roulé en boule près des braises. Il se tient debout sur deux pattes et utilise ses membres avant comme des mains. Ses flammes changent de couleur selon son humeur : orange s'il est calme, bleu s'il est en colère.",
"Il se roule en boule et dévale les pentes pour se déplacer plus vite. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Braisillon.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 113,
"kg": 80.8,
"soin": "Les jours de pluie, gardez-le à l'abri : sa flamme vacille et son humeur aussi. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il ronge des cailloux pour entretenir ses dents ; un sac de graviers propres est indispensable.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Magmor m'a tenu chaud toute une nuit de blizzard. Je lui dois peut-être la vie. » — le Professeur Hector"
},
"coralin": {
"h": "les lagons tièdes et les récifs, ainsi que les champs de pierres où rien ne pousse",
"p": [
"Il nage à contre-courant pour se muscler. Ses nageoires puissantes le propulsent à grande vitesse. Il nage à contre-courant pour se muscler et peut remonter des cascades entières.",
"Sa carapace porte les marques de chaque chute qu'il a survécue. Sa résistance est légendaire : on se fatigue avant lui. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 82,
"kg": 37.9,
"soin": "Il adore les algues fraîches et les petits crustacés, mais il faut varier son alimentation. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Il supporte mal l'humidité prolongée qui fissure sa carapace.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Coralin qui m'a réappris à nager. » — Théo le passeur"
},
"meduzen": {
"h": "les rivières claires et les étangs profonds",
"p": [
"Il nage à contre-courant pour se muscler. Ses nageoires puissantes le propulsent à grande vitesse. Il se nourrit de petites algues et filtre l'eau des étangs où il vit.",
"On le reconnaît à ses yeux brillants dans le noir, et à rien d'autre. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 90,
"kg": 18.2,
"soin": "Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Ne braquez jamais une lampe sur lui : il le prend comme une insulte.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Un Méduzen a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Kai le surfeur"
},
"palmio": {
"h": "les talus fleuris le long des routes",
"p": [
"Il se nourrit de lumière et de rosée. Son plumage change légèrement de teinte selon les saisons. Au printemps, il disperse des graines qui germent en quelques jours.",
"Il suit les tempêtes à distance, comme un chien suit son maître. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 86,
"kg": 10.8,
"soin": "Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Lissez ses plumes dans le sens du vent après chaque vol ; il apprécie ce rituel.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Palmio a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — l'archiviste Basile"
},
"volticot": {
"h": "les abords des centrales et des lignes électriques",
"p": [
"Ses poils crépitent avant l'orage. Il roule plus qu'il ne marche, et rebondit quand il est content. Il recharge son corps en se postant sous les lignes électriques, au grand désespoir des techniciens.",
"Les jours de grand orage, des dizaines d'entre eux se rassemblent sur les collines. Sa vitesse est son arme principale. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Tesladon.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 48,
"kg": 2.8,
"soin": "Une brosse en bois, jamais en métal, pour démêler son pelage chargé. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Volticot a rallumé tout le quartier pendant la panne. Le maire l'a décoré. » — Mère Hélène, de Graineval"
},
"tesladon": {
"h": "les abords des centrales et des lignes électriques",
"p": [
"Ses poils crépitent avant l'orage. Sa posture droite lui donne un air étonnamment humain. Il recharge son corps en se postant sous les lignes électriques, au grand désespoir des techniciens.",
"Ses poils se hérissent plusieurs heures avant un orage. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Volticot.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 117,
"kg": 30.4,
"soin": "Il se calme en touchant le sol pieds nus, ou pattes nues : laissez-le se décharger après un combat. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Tesladon m'a coiffé·e sans le vouloir. J'ai gardé la coupe trois semaines. » — Gunnar, de Givrecime"
},
"sablard": {
"h": "les carrières, les éboulis et les falaises",
"p": [
"Il dort des semaines sans bouger. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il se roule en boule et dévale les pentes pour se déplacer plus vite.",
"Il peut rester immobile si longtemps que la mousse pousse sur son dos. En combat, il préfère le contact direct et frappe fort. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Dunarok.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 48,
"kg": 5.3,
"soin": "Il supporte mal l'humidité prolongée qui fissure sa carapace. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Sablard a dormi trois jours devant ma porte. Je n'ai pas pu sortir. Je ne lui en veux pas. » — la Comtesse Mirabelle"
},
"dunarok": {
"h": "les carrières, les éboulis et les falaises",
"p": [
"Sa carapace porte les traces de mille chutes. Sa carapace légère le protège sans l'alourdir. Sa carapace porte les marques de chaque chute qu'il a survécue.",
"Il dort des semaines entières sans bouger, puis disparaît en une nuit. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Sablard.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 41,
"kg": 3.7,
"soin": "Il supporte mal l'humidité prolongée qui fissure sa carapace. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Dunarok retiennent les éboulements, sur la route. Personne ne le leur a demandé. » — Tavi junior"
},
"spectrolle": {
"h": "les cimetières de bateaux et les épaves",
"p": [
"On le reconnaît à ses yeux brillants dans le noir. Son long corps ondule avec grâce, sur terre comme dans l'eau. Il suit parfois les voyageurs solitaires, sans jamais leur faire de mal.",
"Il imite les ombres des objets pour passer inaperçu. Sa vitesse est son arme principale. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Fantorbe.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les grands-mères disent aux enfants qui ne dorment pas qu'il viendra chercher leurs rêves."
],
"cm": 129,
"kg": 53.7,
"soin": "Il aime les recoins sombres et les sacs à dos fermés ; laissez-lui une cachette. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Spectrolle vole mes chaussettes. Uniquement la gauche. Je ne sais pas pourquoi. » — Gunnar, de Givrecime"
},
"fantorbe": {
"h": "les lisières entre le crépuscule et la nuit",
"p": [
"On le reconnaît à ses yeux brillants dans le noir. Son corps mou et arrondi peut changer légèrement de forme. Il n'apparaît qu'à la tombée de la nuit, et disparaît au premier rayon de soleil.",
"Il dort roulé autour des braises et grogne si on éteint le feu. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Spectrolle.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les grands-mères disent aux enfants qui ne dorment pas qu'il viendra chercher leurs rêves."
],
"cm": 79,
"kg": 20.2,
"soin": "Il mange peu, mais il vole parfois la nourriture des autres pour jouer. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Prévoyez toujours une pierre plate pour qu'il puisse dormir sans brûler le sol.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Fantorbe m'a suivi tout le long de la forêt. Il voulait juste s'assurer que je rentrais bien. » — un pêcheur anonyme de Solmarina"
},
"givrinou": {
"h": "les toundras balayées par le blizzard",
"p": [
"Il ne vit que là où la neige ne fond jamais. Sa posture droite lui donne un air étonnamment humain. Il hiberne pendant les étés trop chauds, au fond des grottes de glace.",
"Il se cache sous la neige fraîche et n'en sort qu'à la nuit tombée. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Blizzaure.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 66,
"kg": 11.8,
"soin": "Un bol de neige fraîche ou de glace pilée le matin suffit à son bonheur. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Les Givrinou chantent la nuit, dans la toundra. Ça ressemble à du verre qui tinte. » — Brune"
},
"blizzaure": {
"h": "les forêts de pins sous la neige, ainsi que les nuages bas des matins d'automne",
"p": [
"Son souffle givre les vitres en plein été. Son plumage change légèrement de teinte selon les saisons. Les voyageurs perdus dans le blizzard racontent qu'il les a guidés jusqu'à un abri.",
"Il adore jouer avec les cerfs-volants des enfants, quitte à les emporter. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Givrinou.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 81,
"kg": 6.4,
"soin": "Par grande chaleur, il faut l'emmener près d'un lac ou d'une grotte froide. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Lissez ses plumes dans le sens du vent après chaque vol ; il apprécie ce rituel.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Blizzaure a gelé la rivière pour que les enfants puissent la traverser. » — Mamie Odette, Bourg-Aurore"
},
"combattor": {
"h": "les dojos et les terrains d'entraînement",
"p": [
"Il salue toujours son adversaire avant un combat. Il se déplace par petits bonds rapides. Il ne recule jamais, même face à plus fort que lui.",
"Il imite les mouvements des dresseurs qui s'entraînent près de lui. En combat, il préfère le contact direct et frappe fort. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Karatour.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les dojos de Combrecœur accrochent son portrait au-dessus de la porte."
],
"cm": 30,
"kg": 1.0,
"soin": "Il a besoin d'un entraînement physique quotidien, sinon il le cherchera ailleurs. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Les Combattor se saluent avant chaque combat. On devrait faire pareil. » — Léon, apprenti de Clairsemis"
},
"karatour": {
"h": "les montagnes escarpées",
"p": [
"Il salue toujours son adversaire avant un combat. Il se tient debout sur deux pattes et utilise ses membres avant comme des mains. Il médite au sommet des montagnes avant chaque saison.",
"Il médite au sommet des montagnes avant chaque saison. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Combattor.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les dojos de Combrecœur accrochent son portrait au-dessus de la porte."
],
"cm": 130,
"kg": 120.8,
"soin": "Un repas riche en protéines et en céréales après chaque séance. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Karatour s'entraîne même quand je dors. Je l'entends frapper le poteau du jardin. » — Léon, apprenti de Clairsemis"
},
"yetiou": {
"h": "les grottes de glace bleue, ainsi que les villages de lutteurs",
"p": [
"Il ne vit que là où la neige ne fond jamais. Ses antennes captent les vibrations à plusieurs mètres. Il fabrique de petites sculptures de glace que personne ne comprend.",
"Il salue toujours son adversaire avant un combat, et après. Il mise tout sur l'attaque physique et ne craint pas les coups. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 43,
"kg": 4.5,
"soin": "Ses cristaux tombent au printemps ; ramassez-les, les forgerons les achètent à bon prix. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Ne le laissez pas trop gagner contre les autres, il deviendrait insupportable.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Un Yetiou m'a apporté un flocon parfait, sans fondre, sur le bout de son nez. » — Kai le surfeur"
},
"aiglace": {
"h": "les forêts de pins sous la neige, ainsi que les clochers et les tours de guet",
"p": [
"Son souffle givre les vitres en plein été. Son plumage change légèrement de teinte selon les saisons. Les voyageurs perdus dans le blizzard racontent qu'il les a guidés jusqu'à un abri.",
"Il nidifie au sommet des falaises, là où rien ne peut l'atteindre. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 88,
"kg": 10.6,
"soin": "Un bol de neige fraîche ou de glace pilée le matin suffit à son bonheur. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il a besoin d'espace pour déployer ses ailes chaque jour, sinon il devient nerveux.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Un Aiglace m'a apporté un flocon parfait, sans fondre, sur le bout de son nez. » — Siri, de la toundra"
},
"corapince": {
"h": "les côtes rocheuses et les bancs de sable, ainsi que les gorges profondes creusées par les rivières",
"p": [
"Il nage à contre-courant pour se muscler. Il peut sauter hors de l'eau sur plusieurs mètres. Il garde toujours un peu d'eau dans sa bouche, au cas où.",
"Il peut rester immobile si longtemps que la mousse pousse sur son dos. Il mise tout sur l'attaque physique et ne craint pas les coups. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 89,
"kg": 53.0,
"soin": "Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Il ronge des cailloux pour entretenir ses dents ; un sac de graviers propres est indispensable.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Corapince qui m'a réappris à nager. » — une infirmière de Port-Sève"
},
"grillou": {
"h": "les vergers sauvages et les haies anciennes",
"p": [
"Il se nourrit de lumière et de rosée. Sa carapace légère le protège sans l'alourdir. Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas.",
"Au printemps, il disperse des graines qui germent en quelques jours. Sa vitesse est son arme principale. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Grillardon.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 29,
"kg": 0.7,
"soin": "Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« J'ai trouvé un Grillou endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — une infirmière de Port-Sève"
},
"grillardon": {
"h": "les clairières où la rosée tient jusqu'à midi",
"p": [
"Il se nourrit de lumière et de rosée. Il se love en spirale pour dormir et pour se protéger. Il boit la rosée à l'aube, puis s'endort jusqu'à midi.",
"Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas. Sa vitesse est son arme principale. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Grillou. Bien entraîné, il deviendra Grillamor.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 163,
"kg": 233.9,
"soin": "Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« J'ai trouvé un Grillardon endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — Tavi junior"
},
"grillamor": {
"h": "les talus fleuris le long des routes",
"p": [
"Des feuilles poussent sur son dos au printemps. Son corps mou et arrondi peut changer légèrement de forme. Au printemps, il disperse des graines qui germent en quelques jours.",
"Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas. Sa vitesse est son arme principale. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Grillardon.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 92,
"kg": 24.1,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Grillamor a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — Mère Hélène, de Graineval"
},
"pommelet": {
"h": "les vergers sauvages et les haies anciennes",
"p": [
"Des feuilles poussent sur son dos au printemps. Ses quatre pattes robustes lui permettent de grimper sur des terrains difficiles. Il passe des heures immobile au soleil, et l'on dit que les fleurs poussent plus vite autour de lui.",
"Au printemps, il disperse des graines qui germent en quelques jours. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Pommerain.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 66,
"kg": 14.4,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Pommelet pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — le Prof. Lierre"
},
"pommerain": {
"h": "les clairières où la rosée tient jusqu'à midi",
"p": [
"Il se nourrit de lumière et de rosée. Il se tient debout sur deux pattes et utilise ses membres avant comme des mains. Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre.",
"Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Pommelet.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 95,
"kg": 30.9,
"soin": "Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Pommerain pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — le Prof. Lierre"
},
"lapissou": {
"h": "les places de marché",
"p": [
"Il s'adapte à tous les terrains. Il se love en spirale pour dormir et pour se protéger. Il vit en petits groupes très soudés.",
"Curieux, il suit les dresseurs sur des kilomètres. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Lapivent.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 113,
"kg": 34.6,
"soin": "Il aime les caresses derrière les oreilles, ou ce qui en tient lieu. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Lapissou m'attend chaque soir au bout du chemin. Il n'est pas à moi. Il vient quand même. » — Marie-Sève, de Port-Sève"
},
"lapivent": {
"h": "les jardins et les fermes",
"p": [
"Curieux, il suit les dresseurs sur des kilomètres. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Il mange de tout, y compris ce qu'on oublie sur les tables de pique-nique.",
"Il vit en petits groupes très soudés. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Lapissou.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 79,
"kg": 20.7,
"soin": "Il s'adapte à presque tout ; une routine régulière lui suffit. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Lapivent n'a rien d'extraordinaire. C'est pour ça que je l'aime. » — Tavi junior"
},
"fourmiton": {
"h": "les prairies hautes et les lisières de forêt, ainsi que les champs de pierres où rien ne pousse",
"p": [
"Des feuilles poussent sur son dos au printemps. Il se love en spirale pour dormir et pour se protéger. Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre.",
"Il dort des semaines entières sans bouger, puis disparaît en une nuit. Sa résistance est légendaire : on se fatigue avant lui. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Fourmarque.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 146,
"kg": 119.5,
"soin": "Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Un massage avec une pierre ponce le détend après les longues marches.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« J'ai trouvé un Fourmiton endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — Théo le passeur"
},
"fourmarque": {
"h": "les talus fleuris le long des routes, ainsi que les carrières, les éboulis et les falaises",
"p": [
"Des feuilles poussent sur son dos au printemps. Il glisse sans un bruit et surprend souvent les promeneurs. Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre.",
"Il dort des semaines entières sans bouger, puis disparaît en une nuit. En combat, il encaisse les coups sans broncher et use l'adversaire. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Fourmiton.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 236,
"kg": 799.2,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Fourmarque a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — Marie-Sève, de Port-Sève"
},
"hiboulin": {
"h": "les bords de chemin et les fossés, ainsi que les nuages bas des matins d'automne",
"p": [
"Il s'adapte à tous les terrains. Ses ailes larges lui permettent de planer longtemps. Il dort beaucoup, et partout.",
"Il suit les tempêtes à distance, comme un chien suit son maître. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Hiboulune.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 47,
"kg": 2.1,
"soin": "Les jeux de balle sont le meilleur moyen de gagner sa confiance. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Ne le tenez jamais par les ailes : il ne vous le pardonnerait pas.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Hiboulin n'a rien d'extraordinaire. C'est pour ça que je l'aime. » — l'archiviste Basile"
},
"hiboulune": {
"h": "à peu près partout où l'on vit",
"p": [
"Curieux, il suit les dresseurs sur des kilomètres. Ses ailes larges lui permettent de planer longtemps. Il mange de tout, y compris ce qu'on oublie sur les tables de pique-nique.",
"Il plane des heures sans battre des ailes, porté par les courants chauds. Sa vitesse est son arme principale. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Hiboulin. Bien entraîné, il deviendra Hibouléon.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 69,
"kg": 6.7,
"soin": "Les jeux de balle sont le meilleur moyen de gagner sa confiance. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Lissez ses plumes dans le sens du vent après chaque vol ; il apprécie ce rituel.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Hiboulune sont les premiers à revenir après une catastrophe. Ils reconstruisent avec nous. » — Théo le passeur"
},
"hibouleon": {
"h": "les places de marché, ainsi que les hauts plateaux sans arbres",
"p": [
"Curieux, il suit les dresseurs sur des kilomètres. Son plumage change légèrement de teinte selon les saisons. Il dort beaucoup, et partout.",
"Il plane des heures sans battre des ailes, porté par les courants chauds. Sa vitesse est son arme principale. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Hiboulune.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 93,
"kg": 15.7,
"soin": "Il mange de tout, ce qui ne veut pas dire qu'il faut lui donner n'importe quoi. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Ne le tenez jamais par les ailes : il ne vous le pardonnerait pas.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Les Hibouléon sont les premiers à revenir après une catastrophe. Ils reconstruisent avec nous. » — Gunnar, de Givrecime"
},
"treflet": {
"h": "les prairies hautes et les lisières de forêt",
"p": [
"Des feuilles poussent sur son dos au printemps. Son corps mou et arrondi peut changer légèrement de forme. Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre.",
"Au printemps, il disperse des graines qui germent en quelques jours. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 60,
"kg": 4.3,
"soin": "Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Trèflet a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — une infirmière de Port-Sève"
},
"bourdonix": {
"h": "les talus fleuris le long des routes, ainsi que les plateaux exposés aux orages",
"p": [
"Il se nourrit de lumière et de rosée. Ses antennes captent les vibrations à plusieurs mètres. Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas.",
"Ses poils se hérissent plusieurs heures avant un orage. En combat, il préfère le contact direct et frappe fort. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Bourdoral.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 38,
"kg": 2.7,
"soin": "Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Une brosse en bois, jamais en métal, pour démêler son pelage chargé.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Bourdonix a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — Marie-Sève, de Port-Sève"
},
"bourdoral": {
"h": "les prairies hautes et les lisières de forêt",
"p": [
"Il se nourrit de lumière et de rosée. Il se love en spirale pour dormir et pour se protéger. Au printemps, il disperse des graines qui germent en quelques jours.",
"Ses poils se hérissent plusieurs heures avant un orage. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Bourdonix.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 208,
"kg": 431.9,
"soin": "Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Une brosse en bois, jamais en métal, pour démêler son pelage chargé.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Bourdoral a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — Kai le surfeur"
},
"coquelime": {
"h": "les sous-bois humides et les jardins abandonnés, ainsi que les grottes sèches et les mines oubliées",
"p": [
"Il se nourrit de lumière et de rosée. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas.",
"Il se roule en boule et dévale les pentes pour se déplacer plus vite. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Coquelorme.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 53,
"kg": 7.9,
"soin": "Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il ronge des cailloux pour entretenir ses dents ; un sac de graviers propres est indispensable.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« J'ai trouvé un Coquelime endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — Marie-Sève, de Port-Sève"
},
"coquelorme": {
"h": "les prairies hautes et les lisières de forêt, ainsi que les ruines de murs anciens",
"p": [
"Il se nourrit de lumière et de rosée. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il passe des heures immobile au soleil, et l'on dit que les fleurs poussent plus vite autour de lui.",
"Les mineurs le considèrent comme un porte-bonheur : là où il creuse, on trouve des filons. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Coquelime.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 55,
"kg": 15.2,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il ronge des cailloux pour entretenir ses dents ; un sac de graviers propres est indispensable.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Coquelorme pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — un pêcheur anonyme de Solmarina"
},
"mulotte": {
"h": "les bords de chemin et les fossés",
"p": [
"Il s'adapte à tous les terrains. Il se tient debout sur deux pattes et utilise ses membres avant comme des mains. Il s'adapte à tous les terrains et à presque tous les climats.",
"Curieux, il suit les dresseurs sur des kilomètres. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Mulobrave.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 84,
"kg": 31.4,
"soin": "Il mange de tout, ce qui ne veut pas dire qu'il faut lui donner n'importe quoi. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Les Mulotte sont les premiers à revenir après une catastrophe. Ils reconstruisent avec nous. » — Fennec le conteur"
},
"mulobrave": {
"h": "les jardins et les fermes",
"p": [
"Curieux, il suit les dresseurs sur des kilomètres. Sa posture droite lui donne un air étonnamment humain. Curieux, il suit les dresseurs sur des kilomètres.",
"Il dort beaucoup, et partout. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Mulotte.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 116,
"kg": 81.2,
"soin": "Les jeux de balle sont le meilleur moyen de gagner sa confiance. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Mulobrave sont les premiers à revenir après une catastrophe. Ils reconstruisent avec nous. » — le Prof. Lierre"
},
"brindille": {
"h": "les sous-bois humides et les jardins abandonnés",
"p": [
"Des feuilles poussent sur son dos au printemps. Son plumage change légèrement de teinte selon les saisons. Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre.",
"Il annonce les changements de temps en tournoyant au-dessus des villages. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 81,
"kg": 12.5,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Les graines de tournesol et les baies acides sont ses friandises préférées.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Brindille a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — Aline la forgeronne"
},
"pucerin": {
"h": "les prairies hautes et les lisières de forêt",
"p": [
"Il se nourrit de lumière et de rosée. Sa posture droite lui donne un air étonnamment humain. Il passe des heures immobile au soleil, et l'on dit que les fleurs poussent plus vite autour de lui.",
"Au printemps, il disperse des graines qui germent en quelques jours. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Pucerage.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 68,
"kg": 12.9,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« J'ai trouvé un Pucerin endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — Mère Hélène, de Graineval"
},
"pucerage": {
"h": "les sous-bois humides et les jardins abandonnés",
"p": [
"Il se nourrit de lumière et de rosée. Il roule plus qu'il ne marche, et rebondit quand il est content. Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas.",
"Il passe des heures immobile au soleil, et l'on dit que les fleurs poussent plus vite autour de lui. Sa vitesse est son arme principale. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Pucerin.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 80,
"kg": 29.2,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Pucerage a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — la Comtesse Mirabelle"
},
"noisetou": {
"h": "les bords de chemin et les fossés, ainsi que les talus fleuris le long des routes",
"p": [
"Il s'adapte à tous les terrains. Il se déplace par petits bonds rapides. Il mange de tout, y compris ce qu'on oublie sur les tables de pique-nique.",
"Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Noisetor.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 37,
"kg": 2.0,
"soin": "Les jeux de balle sont le meilleur moyen de gagner sa confiance. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Les Noisetou sont les premiers à revenir après une catastrophe. Ils reconstruisent avec nous. » — un pêcheur anonyme de Solmarina"
},
"noisetor": {
"h": "les champs, les villages et les routes",
"p": [
"Curieux, il suit les dresseurs sur des kilomètres. Il se tient debout sur deux pattes et utilise ses membres avant comme des mains. Il est souvent la première créature que les enfants rencontrent.",
"Il boit la rosée à l'aube, puis s'endort jusqu'à midi. Sa vitesse est son arme principale. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Noisetou.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 95,
"kg": 26.6,
"soin": "Il mange de tout, ce qui ne veut pas dire qu'il faut lui donner n'importe quoi. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Noisetor n'a rien d'extraordinaire. C'est pour ça que je l'aime. » — le jeune Léo, dresseur débutant"
},
"gyrinou": {
"h": "les rivières claires et les étangs profonds",
"p": [
"On l'entend chanter les soirs de pluie. Son corps fuselé fend l'eau sans un bruit. Il guide parfois les nageurs perdus vers la rive.",
"Il nage à contre-courant pour se muscler et peut remonter des cascades entières. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Grenouillard.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 75,
"kg": 22.8,
"soin": "Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Gyrinou refuse de nager quand la mer est trop calme. Il dit que ce n'est pas normal. » — Gunnar, de Givrecime"
},
"grenouillard": {
"h": "les côtes rocheuses et les bancs de sable",
"p": [
"Il nage à contre-courant pour se muscler. Il peut sauter hors de l'eau sur plusieurs mètres. Il devient nerveux quand la mer est trop calme, comme s'il sentait quelque chose venir.",
"Il nage à contre-courant pour se muscler et peut remonter des cascades entières. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Gyrinou. Bien entraîné, il deviendra Crapaudor.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 85,
"kg": 31.3,
"soin": "Il adore les algues fraîches et les petits crustacés, mais il faut varier son alimentation. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Grenouillard a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — un pêcheur anonyme de Solmarina"
},
"crapaudor": {
"h": "les rivières claires et les étangs profonds",
"p": [
"On l'entend chanter les soirs de pluie. Ses nageoires puissantes le propulsent à grande vitesse. Il garde toujours un peu d'eau dans sa bouche, au cas où.",
"Il nage à contre-courant pour se muscler et peut remonter des cascades entières. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Grenouillard.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 135,
"kg": 73.8,
"soin": "Il adore les algues fraîches et les petits crustacés, mais il faut varier son alimentation. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Crapaudor qui m'a réappris à nager. » — l'archiviste Basile"
},
"crevetin": {
"h": "les estuaires où l'eau douce rencontre la mer",
"p": [
"Il nage à contre-courant pour se muscler. Ses nageoires puissantes le propulsent à grande vitesse. Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps.",
"Il nage à contre-courant pour se muscler et peut remonter des cascades entières. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Crevettor.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 69,
"kg": 10.5,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Crevetin refuse de nager quand la mer est trop calme. Il dit que ce n'est pas normal. » — Hana, de la Vallée Érable"
},
"crevettor": {
"h": "les lagons tièdes et les récifs",
"p": [
"Il nage à contre-courant pour se muscler. Ses nageoires puissantes le propulsent à grande vitesse. Il devient nerveux quand la mer est trop calme, comme s'il sentait quelque chose venir.",
"Il guide parfois les nageurs perdus vers la rive. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Crevetin.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 85,
"kg": 30.1,
"soin": "Il adore les algues fraîches et les petits crustacés, mais il faut varier son alimentation. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Crevettor a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Hugo le mineur"
},
"bigornot": {
"h": "les estuaires où l'eau douce rencontre la mer, ainsi que les grottes sèches et les mines oubliées",
"p": [
"Il nage à contre-courant pour se muscler. Ses nageoires puissantes le propulsent à grande vitesse. Il se nourrit de petites algues et filtre l'eau des étangs où il vit.",
"Sa carapace porte les marques de chaque chute qu'il a survécue. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Bigornard.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 60,
"kg": 8.6,
"soin": "Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Un massage avec une pierre ponce le détend après les longues marches.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Bigornot a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Léon, apprenti de Clairsemis"
},
"bigornard": {
"h": "les lagons tièdes et les récifs",
"p": [
"Il nage à contre-courant pour se muscler. Son corps fuselé fend l'eau sans un bruit. Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps.",
"Il peut rester immobile si longtemps que la mousse pousse sur son dos. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Bigornot. Bien entraîné, il deviendra Bigornax.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 99,
"kg": 49.7,
"soin": "Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Bigornard a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Tavi junior"
},
"bigornax": {
"h": "les marais tranquilles et les fontaines de village",
"p": [
"Il nage à contre-courant pour se muscler. Son corps fuselé fend l'eau sans un bruit. Il devient nerveux quand la mer est trop calme, comme s'il sentait quelque chose venir.",
"Il dort des semaines entières sans bouger, puis disparaît en une nuit. Sa résistance est légendaire : on se fatigue avant lui. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Bigornard.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 125,
"kg": 106.2,
"soin": "Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Il supporte mal l'humidité prolongée qui fissure sa carapace.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Bigornax qui m'a réappris à nager. » — Hugo le mineur"
},
"meduline": {
"h": "les marais tranquilles et les fontaines de village",
"p": [
"On l'entend chanter les soirs de pluie. Ses nageoires puissantes le propulsent à grande vitesse. Il se nourrit de petites algues et filtre l'eau des étangs où il vit.",
"Ses poils se hérissent plusieurs heures avant un orage. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 81,
"kg": 18.1,
"soin": "Il adore les algues fraîches et les petits crustacés, mais il faut varier son alimentation. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Ne le laissez pas près des appareils électriques : il les recharge, puis les grille.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Méduline refuse de nager quand la mer est trop calme. Il dit que ce n'est pas normal. » — Fennec le conteur"
},
"lezardune": {
"h": "les pentes volcaniques et les cendres tièdes",
"p": [
"Sa queue rougeoie quand il est content. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Il recrache des étincelles quand il éternue, ce qui a déjà déclenché plusieurs incendies.",
"Il mange des cailloux riches en minéraux et recrache les autres. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Lézardor.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 53,
"kg": 4.3,
"soin": "Il mange beaucoup de charbon doux et de baies séchées ; l'eau froide est à proscrire pendant les repas. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il ronge des cailloux pour entretenir ses dents ; un sac de graviers propres est indispensable.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Lézardune a brûlé le gâteau d'anniversaire de ma fille. Elle a trouvé ça génial. » — Fennec le conteur"
},
"lezardor": {
"h": "les plages de sable noir près des coulées, ainsi que les gorges profondes creusées par les rivières",
"p": [
"Il dort roulé en boule près des braises. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il recrache des étincelles quand il éternue, ce qui a déjà déclenché plusieurs incendies.",
"Sa carapace porte les marques de chaque chute qu'il a survécue. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Lézardune.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 65,
"kg": 11.4,
"soin": "Il mange beaucoup de charbon doux et de baies séchées ; l'eau froide est à proscrire pendant les repas. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il ronge des cailloux pour entretenir ses dents ; un sac de graviers propres est indispensable.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Lézardor sauvages dansent autour des feux de camp. Si tu chantes, ils restent. » — Mère Hélène, de Graineval"
},
"pelicot": {
"h": "les côtes rocheuses et les bancs de sable, ainsi que les hauts plateaux sans arbres",
"p": [
"Il nage à contre-courant pour se muscler. Il se pose rarement au sol, qu'il trouve trop dangereux. Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps.",
"Il nidifie au sommet des falaises, là où rien ne peut l'atteindre. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Pélicampe.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 48,
"kg": 1.4,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il a besoin d'espace pour déployer ses ailes chaque jour, sinon il devient nerveux.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Pélicot a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Siri, de la toundra"
},
"pelicampe": {
"h": "les marais tranquilles et les fontaines de village",
"p": [
"Il nage à contre-courant pour se muscler. Son plumage change légèrement de teinte selon les saisons. Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps.",
"Il nidifie au sommet des falaises, là où rien ne peut l'atteindre. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Pélicot.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 90,
"kg": 18.2,
"soin": "Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Lissez ses plumes dans le sens du vent après chaque vol ; il apprécie ce rituel.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Pélicampe a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Ondine, de Mirage-Nord"
},
"tortulave": {
"h": "les forges abandonnées et les fours à pain",
"p": [
"Sa queue rougeoie quand il est content. Sa posture droite lui donne un air étonnamment humain. Les anciens forgerons l'élevaient pour garder leurs fours allumés toute la nuit.",
"Il dort des semaines entières sans bouger, puis disparaît en une nuit. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Tortumagma.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 65,
"kg": 24.6,
"soin": "Les jours de pluie, gardez-le à l'abri : sa flamme vacille et son humeur aussi. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il supporte mal l'humidité prolongée qui fissure sa carapace.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Tortulave m'a tenu chaud toute une nuit de blizzard. Je lui dois peut-être la vie. » — Marie-Sève, de Port-Sève"
},
"tortumagma": {
"h": "les plages de sable noir près des coulées, ainsi que les ruines de murs anciens",
"p": [
"Il dort roulé en boule près des braises. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il dort roulé autour des braises et grogne si on éteint le feu.",
"Il se roule en boule et dévale les pentes pour se déplacer plus vite. En combat, il encaisse les coups sans broncher et use l'adversaire. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Tortulave.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 68,
"kg": 21.1,
"soin": "Les jours de pluie, gardez-le à l'abri : sa flamme vacille et son humeur aussi. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Tortumagma m'a tenu chaud toute une nuit de blizzard. Je lui dois peut-être la vie. » — Marie-Sève, de Port-Sève"
},
"algueline": {
"h": "les rivières claires et les étangs profonds, ainsi que les sous-bois humides et les jardins abandonnés",
"p": [
"Il nage à contre-courant pour se muscler. Ses nageoires puissantes le propulsent à grande vitesse. Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps.",
"Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Alguemère.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 55,
"kg": 6.2,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Algueline a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Aline la forgeronne"
},
"alguemere": {
"h": "les estuaires où l'eau douce rencontre la mer, ainsi que les clairières où la rosée tient jusqu'à midi",
"p": [
"Il nage à contre-courant pour se muscler. Ses nageoires puissantes le propulsent à grande vitesse. Il guide parfois les nageurs perdus vers la rive.",
"Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre. Il est équilibré en combat et s'adapte à toutes les situations. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Algueline.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 105,
"kg": 59.0,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Alguemère refuse de nager quand la mer est trop calme. Il dit que ce n'est pas normal. » — l'archiviste Basile"
},
"sablotin": {
"h": "les carrières, les éboulis et les falaises",
"p": [
"Sa carapace porte les traces de mille chutes. Il glisse sans un bruit et surprend souvent les promeneurs. Il peut rester immobile si longtemps que la mousse pousse sur son dos.",
"Les mineurs le considèrent comme un porte-bonheur : là où il creuse, on trouve des filons. En combat, il encaisse les coups sans broncher et use l'adversaire. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 216,
"kg": 596.6,
"soin": "Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Les Sablotin retiennent les éboulements, sur la route. Personne ne le leur a demandé. » — le jeune Léo, dresseur débutant"
},
"hippocorne": {
"h": "les estuaires où l'eau douce rencontre la mer",
"p": [
"On l'entend chanter les soirs de pluie. Son corps fuselé fend l'eau sans un bruit. Il nage à contre-courant pour se muscler et peut remonter des cascades entières.",
"Il garde toujours un peu d'eau dans sa bouche, au cas où. Sa vitesse est son arme principale. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Hippocéan.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 75,
"kg": 11.0,
"soin": "Il adore les algues fraîches et les petits crustacés, mais il faut varier son alimentation. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Hippocorne qui m'a réappris à nager. » — Tavi junior"
},
"hippocean": {
"h": "les rivières claires et les étangs profonds",
"p": [
"On l'entend chanter les soirs de pluie. Son corps fuselé fend l'eau sans un bruit. Il devient nerveux quand la mer est trop calme, comme s'il sentait quelque chose venir.",
"Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Hippocorne.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 104,
"kg": 57.4,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Hippocéan refuse de nager quand la mer est trop calme. Il dit que ce n'est pas normal. » — Tavi junior"
},
"fumerolle": {
"h": "les déserts de pierre brûlés par le soleil",
"p": [
"Il dort roulé en boule près des braises. Ses antennes captent les vibrations à plusieurs mètres. Sa température interne ne descend jamais sous les quarante degrés, même en hiver.",
"Il imite les ombres des objets pour passer inaperçu. Il est équilibré en combat et s'adapte à toutes les situations. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 58,
"kg": 10.5,
"soin": "Un bain de cendres tièdes une fois par semaine entretient l'éclat de ses écailles. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Il aime les recoins sombres et les sacs à dos fermés ; laissez-lui une cachette.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Les Fumerolle sauvages dansent autour des feux de camp. Si tu chantes, ils restent. » — Brune"
},
"nacrelle": {
"h": "les côtes rocheuses et les bancs de sable",
"p": [
"Il nage à contre-courant pour se muscler. Il peut sauter hors de l'eau sur plusieurs mètres. Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps.",
"Il se lève toujours avant le soleil, comme pour l'appeler. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Nacrelune.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 78,
"kg": 23.3,
"soin": "Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Il apprécie le miel doré et les fleurs blanches.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Nacrelle a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Fennec le conteur"
},
"nacrelune": {
"h": "les rivières claires et les étangs profonds",
"p": [
"On l'entend chanter les soirs de pluie. Son corps fuselé fend l'eau sans un bruit. Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps.",
"Sa lumière soigne, dit-on, les petites blessures des autres créatures. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Nacrelle.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 102,
"kg": 21.2,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Dans l'obscurité totale, il devient anxieux ; une veilleuse le rassure.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Nacrelune a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — l'archiviste Basile"
},
"vesperou": {
"h": "les crêtes battues par les vents",
"p": [
"Il suit les courants d'air chaud au-dessus des falaises. Ses ailes larges lui permettent de planer longtemps. Il siffle en volant, et chaque individu a sa propre mélodie.",
"On le reconnaît à ses yeux brillants dans le noir, et à rien d'autre. Sa vitesse est son arme principale. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Vespéral.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 55,
"kg": 2.6,
"soin": "Ne le tenez jamais par les ailes : il ne vous le pardonnerait pas. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il dort le jour et s'active à la nuit tombée ; adaptez vos entraînements.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Vespérou me rapporte des lettres de ma sœur, de l'autre côté de la mer. » — Kai le surfeur"
},
"vesperal": {
"h": "les clochers et les tours de guet",
"p": [
"Il plane des heures sans battre des ailes. Ses ailes larges lui permettent de planer longtemps. Il nidifie au sommet des falaises, là où rien ne peut l'atteindre.",
"Il n'apparaît qu'à la tombée de la nuit, et disparaît au premier rayon de soleil. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Vespérou.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 68,
"kg": 5.7,
"soin": "Ne le tenez jamais par les ailes : il ne vous le pardonnerait pas. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Ne braquez jamais une lampe sur lui : il le prend comme une insulte.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Vespéral volent en V au-dessus du port avant les tempêtes. Les pêcheurs les écoutent. » — Siri, de la toundra"
},
"oursinou": {
"h": "les rivières claires et les étangs profonds",
"p": [
"Il nage à contre-courant pour se muscler. Ses nageoires puissantes le propulsent à grande vitesse. Il devient nerveux quand la mer est trop calme, comme s'il sentait quelque chose venir.",
"Il se polit le blindage avec du sable, pendant des heures. Sa résistance est légendaire : on se fatigue avant lui. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Oursinax.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 60,
"kg": 11.8,
"soin": "Il adore les algues fraîches et les petits crustacés, mais il faut varier son alimentation. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Il mange des minéraux et de la limaille ; les forgerons lui gardent leurs chutes.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Oursinou a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — le Prof. Lierre"
},
"oursinax": {
"h": "les côtes rocheuses et les bancs de sable, ainsi que les ruines industrielles",
"p": [
"On l'entend chanter les soirs de pluie. Son corps fuselé fend l'eau sans un bruit. Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps.",
"Il se sent attiré par les aimants et peut rester collé à un portail toute une nuit. En combat, il encaisse les coups sans broncher et use l'adversaire. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Oursinou.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 93,
"kg": 27.0,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Il ne craint pas le froid mais déteste la rouille : séchez-le après la pluie.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Oursinax refuse de nager quand la mer est trop calme. Il dit que ce n'est pas normal. » — l'archiviste Basile"
},
"fossilou": {
"h": "les grottes sèches et les mines oubliées",
"p": [
"Sa carapace porte les traces de mille chutes. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il peut rester immobile si longtemps que la mousse pousse sur son dos.",
"Les mineurs le considèrent comme un porte-bonheur : là où il creuse, on trouve des filons. Sa résistance est légendaire : on se fatigue avant lui. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Fossilarque.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 54,
"kg": 7.6,
"soin": "Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Fossilou a dormi trois jours devant ma porte. Je n'ai pas pu sortir. Je ne lui en veux pas. » — Aline la forgeronne"
},
"fossilarque": {
"h": "les grottes sèches et les mines oubliées",
"p": [
"Sa carapace porte les traces de mille chutes. Il se tient debout sur deux pattes et utilise ses membres avant comme des mains. Il peut rester immobile si longtemps que la mousse pousse sur son dos.",
"Il mange des cailloux riches en minéraux et recrache les autres. En combat, il encaisse les coups sans broncher et use l'adversaire. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Fossilou.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 119,
"kg": 151.0,
"soin": "Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Fossilarque a creusé un puits dans mon jardin. On a trouvé de l'eau. Et une pièce ancienne. » — Fennec le conteur"
},
"vissou": {
"h": "les montagnes riches en minerai",
"p": [
"Il se polit le blindage avec du sable. Sa carapace légère le protège sans l'alourdir. Il se sent attiré par les aimants et peut rester collé à un portail toute une nuit.",
"Son corps tinte comme une cloche quand il marche. Sa résistance est légendaire : on se fatigue avant lui. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Vissard.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 36,
"kg": 2.8,
"soin": "Il ne craint pas le froid mais déteste la rouille : séchez-le après la pluie. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Vissou m'a aidé·e à forger ma première lame. Il a corrigé mes gestes. » — Fennec le conteur"
},
"vissard": {
"h": "les usines et les ateliers",
"p": [
"Son corps tinte comme une cloche quand il marche. Son corps mou et arrondi peut changer légèrement de forme. Les ouvriers lui confient les tâches les plus lourdes, qu'il accomplit sans broncher.",
"Il ne rouille jamais, tant qu'on l'entretient avec un peu d'huile. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Vissou. Bien entraîné, il deviendra Vissaurus.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 69,
"kg": 22.1,
"soin": "Il ne craint pas le froid mais déteste la rouille : séchez-le après la pluie. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Vissard sauvages collectionnent les clés perdues. Si tu cherches la tienne, demande-leur. » — le Professeur Hector"
},
"vissaurus": {
"h": "les mines de fer et les filons de cuivre",
"p": [
"Il se polit le blindage avec du sable. Il se tient debout sur deux pattes et utilise ses membres avant comme des mains. Il mange de la ferraille et rejette une poussière de rouille.",
"Les ouvriers lui confient les tâches les plus lourdes, qu'il accomplit sans broncher. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Vissard.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 165,
"kg": 194.1,
"soin": "Il tinte doucement quand il est content. Apprenez à reconnaître ce son. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Un Vissaurus m'a aidé·e à forger ma première lame. Il a corrigé mes gestes. » — Mamie Odette, Bourg-Aurore"
},
"cablino": {
"h": "les abords des centrales et des lignes électriques",
"p": [
"Il recharge son corps en se postant sous les lignes électriques. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Ses poils se hérissent plusieurs heures avant un orage.",
"Il communique par de petites décharges qui crépitent dans l'air. Sa vitesse est son arme principale. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Câblodon.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 60,
"kg": 6.0,
"soin": "Il se calme en touchant le sol pieds nus, ou pattes nues : laissez-le se décharger après un combat. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Câblino m'a coiffé·e sans le vouloir. J'ai gardé la coupe trois semaines. » — Marie-Sève, de Port-Sève"
},
"cablodon": {
"h": "les champs d'herbes sèches avant la pluie",
"p": [
"Il recharge son corps en se postant sous les lignes électriques. Il marche en se dandinant, ce qui fait beaucoup rire les enfants. Il recharge son corps en se postant sous les lignes électriques, au grand désespoir des techniciens.",
"Il ne supporte pas l'eau, mais adore l'air humide d'avant la pluie. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Câblino.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 138,
"kg": 131.4,
"soin": "Il se calme en touchant le sol pieds nus, ou pattes nues : laissez-le se décharger après un combat. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Câblodon a rallumé tout le quartier pendant la panne. Le maire l'a décoré. » — Ondine, de Mirage-Nord"
},
"dardune": {
"h": "les prairies hautes et les lisières de forêt, ainsi que les carrières, les éboulis et les falaises",
"p": [
"Des feuilles poussent sur son dos au printemps. Son corps mou et arrondi peut changer légèrement de forme. Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas.",
"Il se roule en boule et dévale les pentes pour se déplacer plus vite. En combat, il préfère le contact direct et frappe fort. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Dardélite.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 36,
"kg": 1.6,
"soin": "Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Dardune a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — la Comtesse Mirabelle"
},
"dardelite": {
"h": "les talus fleuris le long des routes",
"p": [
"Il se nourrit de lumière et de rosée. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas.",
"Il mange des cailloux riches en minéraux et recrache les autres. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Dardune.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 60,
"kg": 11.4,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Un massage avec une pierre ponce le détend après les longues marches.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Dardélite a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — Fennec le conteur"
},
"rouillot": {
"h": "les usines et les ateliers",
"p": [
"Son corps tinte comme une cloche quand il marche. Son long corps ondule avec grâce, sur terre comme dans l'eau. Il se sent attiré par les aimants et peut rester collé à un portail toute une nuit.",
"Il se nourrit, dit-on, des cauchemars des gens qui dorment près de lui. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Rouillemort.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 110,
"kg": 102.2,
"soin": "Il ne craint pas le froid mais déteste la rouille : séchez-le après la pluie. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Il aime les recoins sombres et les sacs à dos fermés ; laissez-lui une cachette.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Rouillot a réparé la grille du jardin avec son propre corps. Il est resté une heure, fier. » — la Comtesse Mirabelle"
},
"rouillemort": {
"h": "les usines et les ateliers",
"p": [
"Son corps tinte comme une cloche quand il marche. Son corps mou et arrondi peut changer légèrement de forme. Il se polit le blindage avec du sable, pendant des heures.",
"Il vole de petits objets brillants et les cache dans des recoins introuvables. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Rouillot.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 67,
"kg": 24.1,
"soin": "Il tinte doucement quand il est content. Apprenez à reconnaître ce son. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Ne braquez jamais une lampe sur lui : il le prend comme une insulte.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Rouillemort sauvages collectionnent les clés perdues. Si tu cherches la tienne, demande-leur. » — une infirmière de Port-Sève"
},
"cactillon": {
"h": "les talus fleuris le long des routes",
"p": [
"Des feuilles poussent sur son dos au printemps. Sa posture droite lui donne un air étonnamment humain. Au printemps, il disperse des graines qui germent en quelques jours.",
"Sa carapace porte les marques de chaque chute qu'il a survécue. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Cactorne.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 91,
"kg": 56.7,
"soin": "Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il ronge des cailloux pour entretenir ses dents ; un sac de graviers propres est indispensable.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Cactillon pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — Aline la forgeronne"
},
"cactorne": {
"h": "les vergers sauvages et les haies anciennes, ainsi que les grottes sèches et les mines oubliées",
"p": [
"Des feuilles poussent sur son dos au printemps. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre.",
"Les mineurs le considèrent comme un porte-bonheur : là où il creuse, on trouve des filons. En combat, il encaisse les coups sans broncher et use l'adversaire. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Cactillon.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 99,
"kg": 80.7,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il supporte mal l'humidité prolongée qui fissure sa carapace.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Cactorne a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — Hugo le mineur"
},
"ampoulon": {
"h": "les toits des villes et les antennes, ainsi que les champs de fleurs blanches",
"p": [
"Il recharge son corps en se postant sous les lignes électriques. Il glisse sans un bruit et surprend souvent les promeneurs. Une seule de ses décharges peut alimenter une maison pendant une soirée.",
"Les voyageurs perdus suivent sa lueur jusqu'aux villages. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 236,
"kg": 617.8,
"soin": "Il se calme en touchant le sol pieds nus, ou pattes nues : laissez-le se décharger après un combat. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Il apprécie le miel doré et les fleurs blanches.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Quand l'orage approche, mon Ampoulon se met à la fenêtre et attend comme un enfant. » — Aline la forgeronne"
},
"vautourne": {
"h": "les hauts plateaux sans arbres, ainsi que les gorges profondes creusées par les rivières",
"p": [
"Il suit les courants d'air chaud au-dessus des falaises. Son plumage change légèrement de teinte selon les saisons. Il annonce les changements de temps en tournoyant au-dessus des villages.",
"Il mange des cailloux riches en minéraux et recrache les autres. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Vautoros.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 46,
"kg": 3.2,
"soin": "Les graines de tournesol et les baies acides sont ses friandises préférées. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Vautourne me rapporte des lettres de ma sœur, de l'autre côté de la mer. » — Tavi junior"
},
"vautoros": {
"h": "les hauts plateaux sans arbres, ainsi que les ruines de murs anciens",
"p": [
"Il suit les courants d'air chaud au-dessus des falaises. Il se pose rarement au sol, qu'il trouve trop dangereux. Il adore jouer avec les cerfs-volants des enfants, quitte à les emporter.",
"Il peut rester immobile si longtemps que la mousse pousse sur son dos. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Vautourne.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 66,
"kg": 8.7,
"soin": "Les graines de tournesol et les baies acides sont ses friandises préférées. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Vautoros m'a volé mon écharpe. Je l'ai retrouvée au sommet d'un clocher, pliée. » — une infirmière de Port-Sève"
},
"gecklair": {
"h": "les abords des centrales et des lignes électriques",
"p": [
"Ses poils crépitent avant l'orage. Son corps mou et arrondi peut changer légèrement de forme. Ses poils se hérissent plusieurs heures avant un orage.",
"Une seule de ses décharges peut alimenter une maison pendant une soirée. Sa vitesse est son arme principale. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Geckodard.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 37,
"kg": 1.4,
"soin": "Ne le laissez pas près des appareils électriques : il les recharge, puis les grille. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Gecklair a rallumé tout le quartier pendant la panne. Le maire l'a décoré. » — un pêcheur anonyme de Solmarina"
},
"geckodard": {
"h": "les toits des villes et les antennes",
"p": [
"Ses poils crépitent avant l'orage. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Il ne supporte pas l'eau, mais adore l'air humide d'avant la pluie.",
"Les jours de grand orage, des dizaines d'entre eux se rassemblent sur les collines. Sa vitesse est son arme principale. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Gecklair.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 74,
"kg": 11.8,
"soin": "Il se calme en touchant le sol pieds nus, ou pattes nues : laissez-le se décharger après un combat. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Quand l'orage approche, mon Geckodard se met à la fenêtre et attend comme un enfant. » — Hugo le mineur"
},
"chacalune": {
"h": "les gorges profondes creusées par les rivières, ainsi que les grottes où personne ne s'aventure",
"p": [
"Sa carapace porte les traces de mille chutes. Ses quatre pattes robustes lui permettent de grimper sur des terrains difficiles. Sa carapace porte les marques de chaque chute qu'il a survécue.",
"Il imite les ombres des objets pour passer inaperçu. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Chacalor.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 56,
"kg": 7.9,
"soin": "Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il mange peu, mais il vole parfois la nourriture des autres pour jouer.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Chacalune a dormi trois jours devant ma porte. Je n'ai pas pu sortir. Je ne lui en veux pas. » — une infirmière de Port-Sève"
},
"chacalor": {
"h": "les champs de pierres où rien ne pousse",
"p": [
"Il dort des semaines sans bouger. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il peut rester immobile si longtemps que la mousse pousse sur son dos.",
"Il imite les ombres des objets pour passer inaperçu. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Chacalune.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 68,
"kg": 9.6,
"soin": "Il ronge des cailloux pour entretenir ses dents ; un sac de graviers propres est indispensable. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Ne braquez jamais une lampe sur lui : il le prend comme une insulte.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Chacalor retiennent les éboulements, sur la route. Personne ne le leur a demandé. » — Mamie Odette, Bourg-Aurore"
},
"pistonne": {
"h": "les mines de fer et les filons de cuivre, ainsi que les déserts de pierre brûlés par le soleil",
"p": [
"Son corps tinte comme une cloche quand il marche. Son long corps ondule avec grâce, sur terre comme dans l'eau. Il ne rouille jamais, tant qu'on l'entretient avec un peu d'huile.",
"Il recrache des étincelles quand il éternue, ce qui a déjà déclenché plusieurs incendies. Il mise tout sur l'attaque physique et ne craint pas les coups. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 195,
"kg": 284.7,
"soin": "Il ne craint pas le froid mais déteste la rouille : séchez-le après la pluie. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Prévoyez toujours une pierre plate pour qu'il puisse dormir sans brûler le sol.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Les Pistonne sauvages collectionnent les clés perdues. Si tu cherches la tienne, demande-leur. » — Théo le passeur"
},
"scarabol": {
"h": "les sous-bois humides et les jardins abandonnés, ainsi que les ponts métalliques et les voies ferrées",
"p": [
"Des feuilles poussent sur son dos au printemps. Il roule plus qu'il ne marche, et rebondit quand il est content. Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre.",
"Il ne rouille jamais, tant qu'on l'entretient avec un peu d'huile. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Scarabolide.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 39,
"kg": 2.0,
"soin": "Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Huilez ses articulations une fois par mois avec une huile végétale.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« J'ai trouvé un Scarabol endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — Marie-Sève, de Port-Sève"
},
"scarabolide": {
"h": "les vergers sauvages et les haies anciennes, ainsi que les usines et les ateliers",
"p": [
"Des feuilles poussent sur son dos au printemps. Son long corps ondule avec grâce, sur terre comme dans l'eau. Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre.",
"Son corps tinte comme une cloche quand il marche. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Scarabol.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 230,
"kg": 1031.8,
"soin": "Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Il tinte doucement quand il est content. Apprenez à reconnaître ce son.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« J'ai trouvé un Scarabolide endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — Léon, apprenti de Clairsemis"
},
"dynamouse": {
"h": "les abords des centrales et des lignes électriques, ainsi que les places de marché",
"p": [
"Il recharge son corps en se postant sous les lignes électriques. Ses antennes captent les vibrations à plusieurs mètres. Les jours de grand orage, des dizaines d'entre eux se rassemblent sur les collines.",
"Curieux, il suit les dresseurs sur des kilomètres. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Dynamoteur.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 29,
"kg": 1.0,
"soin": "Il se calme en touchant le sol pieds nus, ou pattes nues : laissez-le se décharger après un combat. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Les jeux de balle sont le meilleur moyen de gagner sa confiance.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Dynamouse a rallumé tout le quartier pendant la panne. Le maire l'a décoré. » — Kai le surfeur"
},
"dynamoteur": {
"h": "les toits des villes et les antennes",
"p": [
"Ses poils crépitent avant l'orage. Sa carapace légère le protège sans l'alourdir. Il ne supporte pas l'eau, mais adore l'air humide d'avant la pluie.",
"Il mange de tout, y compris ce qu'on oublie sur les tables de pique-nique. Sa vitesse est son arme principale. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Dynamouse.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. À Voltaville, on dit qu'un enfant né un jour d'orage aura un de ces compagnons toute sa vie."
],
"cm": 52,
"kg": 5.3,
"soin": "Il se calme en touchant le sol pieds nus, ou pattes nues : laissez-le se décharger après un combat. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Il mange de tout, ce qui ne veut pas dire qu'il faut lui donner n'importe quoi.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Dynamoteur m'a coiffé·e sans le vouloir. J'ai gardé la coupe trois semaines. » — Léon, apprenti de Clairsemis"
},
"ferraillon": {
"h": "les usines et les ateliers, ainsi que les montagnes escarpées",
"p": [
"Son corps tinte comme une cloche quand il marche. Son long corps ondule avec grâce, sur terre comme dans l'eau. Il mange de la ferraille et rejette une poussière de rouille.",
"Il s'entraîne du lever au coucher du soleil, sans jamais se lasser. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Ferraillard.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 162,
"kg": 387.7,
"soin": "Il ne craint pas le froid mais déteste la rouille : séchez-le après la pluie. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Il a besoin d'un entraînement physique quotidien, sinon il le cherchera ailleurs.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Ferraillon m'a aidé·e à forger ma première lame. Il a corrigé mes gestes. » — un pêcheur anonyme de Solmarina"
},
"ferraillard": {
"h": "les usines et les ateliers, ainsi que les arènes abandonnées",
"p": [
"Son corps tinte comme une cloche quand il marche. Il se love en spirale pour dormir et pour se protéger. Les ouvriers lui confient les tâches les plus lourdes, qu'il accomplit sans broncher.",
"Il protège les plus faibles de son groupe avec un courage étonnant. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Ferraillon. Bien entraîné, il deviendra Ferrailtitan.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 234,
"kg": 1045.5,
"soin": "Huilez ses articulations une fois par mois avec une huile végétale. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Il respecte les dresseurs qui s'entraînent avec lui : courez à ses côtés.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Ferraillard a réparé la grille du jardin avec son propre corps. Il est resté une heure, fier. » — une infirmière de Port-Sève"
},
"ferrailtitan": {
"h": "les mines de fer et les filons de cuivre",
"p": [
"Il se polit le blindage avec du sable. Son long corps ondule avec grâce, sur terre comme dans l'eau. Son corps tinte comme une cloche quand il marche.",
"Il salue toujours son adversaire avant un combat, et après. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Ferraillard.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 221,
"kg": 967.1,
"soin": "Huilez ses articulations une fois par mois avec une huile végétale. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Il respecte les dresseurs qui s'entraînent avec lui : courez à ses côtés.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Les Ferrailtitan sauvages collectionnent les clés perdues. Si tu cherches la tienne, demande-leur. » — Siri, de la toundra"
},
"morsegel": {
"h": "les grottes de glace bleue",
"p": [
"Son souffle givre les vitres en plein été. Ses quatre pattes robustes lui permettent de grimper sur des terrains difficiles. Les voyageurs perdus dans le blizzard racontent qu'il les a guidés jusqu'à un abri.",
"Il devient nerveux quand la mer est trop calme, comme s'il sentait quelque chose venir. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Morsegrand.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 46,
"kg": 4.5,
"soin": "Par grande chaleur, il faut l'emmener près d'un lac ou d'une grotte froide. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Morsegel a gelé la rivière pour que les enfants puissent la traverser. » — Brune"
},
"morsegrand": {
"h": "les toundras balayées par le blizzard, ainsi que les lagons tièdes et les récifs",
"p": [
"Son souffle givre les vitres en plein été. Son corps mou et arrondi peut changer légèrement de forme. Les voyageurs perdus dans le blizzard racontent qu'il les a guidés jusqu'à un abri.",
"Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Morsegel.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 68,
"kg": 17.3,
"soin": "Il préfère dormir dehors, même en hiver ; une couverture le vexe. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Morsegrand m'a apporté un flocon parfait, sans fondre, sur le bout de son nez. » — Tavi junior"
},
"chamoisette": {
"h": "les grottes sèches et les mines oubliées, ainsi que les montagnes escarpées",
"p": [
"Sa carapace porte les traces de mille chutes. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il dort des semaines entières sans bouger, puis disparaît en une nuit.",
"Il imite les mouvements des dresseurs qui s'entraînent près de lui. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Chamoiroc.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 44,
"kg": 4.0,
"soin": "Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il respecte les dresseurs qui s'entraînent avec lui : courez à ses côtés.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Chamoisette a creusé un puits dans mon jardin. On a trouvé de l'eau. Et une pièce ancienne. » — Kai le surfeur"
},
"chamoiroc": {
"h": "les ruines de murs anciens, ainsi que les villages de lutteurs",
"p": [
"Il dort des semaines sans bouger. Son corps mou et arrondi peut changer légèrement de forme. Il dort des semaines entières sans bouger, puis disparaît en une nuit.",
"Il imite les mouvements des dresseurs qui s'entraînent près de lui. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Chamoisette.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 61,
"kg": 17.1,
"soin": "Un massage avec une pierre ponce le détend après les longues marches. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Ne le laissez pas trop gagner contre les autres, il deviendrait insupportable.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Chamoiroc a dormi trois jours devant ma porte. Je n'ai pas pu sortir. Je ne lui en veux pas. » — Marie-Sève, de Port-Sève"
},
"floconnet": {
"h": "les toundras balayées par le blizzard",
"p": [
"Son souffle givre les vitres en plein été. Sa posture droite lui donne un air étonnamment humain. Il hiberne pendant les étés trop chauds, au fond des grottes de glace.",
"Son souffle givre les vitres, même en plein été. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Floconil.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 82,
"kg": 17.1,
"soin": "Il préfère dormir dehors, même en hiver ; une couverture le vexe. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Floconnet m'a apporté un flocon parfait, sans fondre, sur le bout de son nez. » — la Comtesse Mirabelle"
},
"floconil": {
"h": "les forêts de pins sous la neige",
"p": [
"Son souffle givre les vitres en plein été. Il roule plus qu'il ne marche, et rebondit quand il est content. Il ne boit que de la neige fondue, jamais d'eau courante.",
"Son souffle givre les vitres, même en plein été. Sa vitesse est son arme principale. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Floconnet.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 58,
"kg": 4.3,
"soin": "Il préfère dormir dehors, même en hiver ; une couverture le vexe. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Floconil m'a apporté un flocon parfait, sans fondre, sur le bout de son nez. » — le Prof. Lierre"
},
"rapacime": {
"h": "les nuages bas des matins d'automne",
"p": [
"Il plane des heures sans battre des ailes. Il se pose rarement au sol, qu'il trouve trop dangereux. Il adore jouer avec les cerfs-volants des enfants, quitte à les emporter.",
"Sa carapace porte les marques de chaque chute qu'il a survécue. Sa vitesse est son arme principale. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 75,
"kg": 10.8,
"soin": "Il a besoin d'espace pour déployer ses ailes chaque jour, sinon il devient nerveux. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il supporte mal l'humidité prolongée qui fissure sa carapace.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Rapacime me rapporte des lettres de ma sœur, de l'autre côté de la mer. » — le Prof. Lierre"
},
"yakouni": {
"h": "à peu près partout où l'on vit, ainsi que les toundras balayées par le blizzard",
"p": [
"Il s'adapte à tous les terrains. Sa posture droite lui donne un air étonnamment humain. Il mange de tout, y compris ce qu'on oublie sur les tables de pique-nique.",
"Les voyageurs perdus dans le blizzard racontent qu'il les a guidés jusqu'à un abri. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Yakolosse.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 83,
"kg": 16.6,
"soin": "Il s'adapte à presque tout ; une routine régulière lui suffit. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Par grande chaleur, il faut l'emmener près d'un lac ou d'une grotte froide.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Yakouni m'attend chaque soir au bout du chemin. Il n'est pas à moi. Il vient quand même. » — Marie-Sève, de Port-Sève"
},
"yakolosse": {
"h": "les bords de chemin et les fossés",
"p": [
"Il s'adapte à tous les terrains. Ses antennes captent les vibrations à plusieurs mètres. Il est souvent la première créature que les enfants rencontrent.",
"Il hiberne pendant les étés trop chauds, au fond des grottes de glace. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Yakouni.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 45,
"kg": 2.8,
"soin": "Il aime les caresses derrière les oreilles, ou ce qui en tient lieu. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Par grande chaleur, il faut l'emmener près d'un lac ou d'une grotte froide.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Yakolosse n'a rien d'extraordinaire. C'est pour ça que je l'aime. » — l'archiviste Basile"
},
"cristallon": {
"h": "les toundras balayées par le blizzard, ainsi que les gorges profondes creusées par les rivières",
"p": [
"Il ne vit que là où la neige ne fond jamais. Il se tient debout sur deux pattes et utilise ses membres avant comme des mains. Il se cache sous la neige fraîche et n'en sort qu'à la nuit tombée.",
"Les mineurs le considèrent comme un porte-bonheur : là où il creuse, on trouve des filons. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Cristallix.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 93,
"kg": 66.9,
"soin": "Un bol de neige fraîche ou de glace pilée le matin suffit à son bonheur. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il supporte mal l'humidité prolongée qui fissure sa carapace.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Cristallon a gelé la rivière pour que les enfants puissent la traverser. » — Brune"
},
"cristallix": {
"h": "les sommets où l'hiver ne finit jamais",
"p": [
"Il ne vit que là où la neige ne fond jamais. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Il se cache sous la neige fraîche et n'en sort qu'à la nuit tombée.",
"Il dort des semaines entières sans bouger, puis disparaît en une nuit. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Cristallon. Bien entraîné, il deviendra Cristalgore.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 70,
"kg": 19.2,
"soin": "Ses cristaux tombent au printemps ; ramassez-les, les forgerons les achètent à bon prix. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il supporte mal l'humidité prolongée qui fissure sa carapace.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Cristallix m'a apporté un flocon parfait, sans fondre, sur le bout de son nez. » — Ondine, de Mirage-Nord"
},
"cristalgore": {
"h": "les forêts de pins sous la neige",
"p": [
"Il ne vit que là où la neige ne fond jamais. Il marche en se dandinant, ce qui fait beaucoup rire les enfants. Les voyageurs perdus dans le blizzard racontent qu'il les a guidés jusqu'à un abri.",
"Les mineurs le considèrent comme un porte-bonheur : là où il creuse, on trouve des filons. Sa résistance est légendaire : on se fatigue avant lui. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Cristallix.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 126,
"kg": 131.2,
"soin": "Par grande chaleur, il faut l'emmener près d'un lac ou d'une grotte froide. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Mon Cristalgore a gelé la rivière pour que les enfants puissent la traverser. » — le jeune Léo, dresseur débutant"
},
"bonzou": {
"h": "les dojos et les terrains d'entraînement",
"p": [
"Il salue toujours son adversaire avant un combat. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il ne recule jamais, même face à plus fort que lui.",
"Il se lève toujours avant le soleil, comme pour l'appeler. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Bonzaïr.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les dojos de Combrecœur accrochent son portrait au-dessus de la porte."
],
"cm": 36,
"kg": 2.2,
"soin": "Il respecte les dresseurs qui s'entraînent avec lui : courez à ses côtés. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Dans l'obscurité totale, il devient anxieux ; une veilleuse le rassure.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Bonzou a défendu ma boutique contre des voleurs. Il a refusé toute récompense. » — Brune"
},
"bonzair": {
"h": "les montagnes escarpées, ainsi que les temples et les sanctuaires",
"p": [
"Il salue toujours son adversaire avant un combat. Il se déplace par petits bonds rapides. Il imite les mouvements des dresseurs qui s'entraînent près de lui.",
"Il se lève toujours avant le soleil, comme pour l'appeler. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Bonzou.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les dojos de Combrecœur accrochent son portrait au-dessus de la porte."
],
"cm": 52,
"kg": 7.3,
"soin": "Il a besoin d'un entraînement physique quotidien, sinon il le cherchera ailleurs. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Dans l'obscurité totale, il devient anxieux ; une veilleuse le rassure.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Bonzaïr se saluent avant chaque combat. On devrait faire pareil. » — Capitaine Morgane"
},
"avalanchon": {
"h": "les glaciers et les lacs gelés, ainsi que les champs de pierres où rien ne pousse",
"p": [
"Il ne vit que là où la neige ne fond jamais. Il se déplace par petits bonds rapides. Il hiberne pendant les étés trop chauds, au fond des grottes de glace.",
"Il mange des cailloux riches en minéraux et recrache les autres. En combat, il encaisse les coups sans broncher et use l'adversaire. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 51,
"kg": 8.5,
"soin": "Ses cristaux tombent au printemps ; ramassez-les, les forgerons les achètent à bon prix. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Un massage avec une pierre ponce le détend après les longues marches.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Avalanchon a gelé la rivière pour que les enfants puissent la traverser. » — Ondine, de Mirage-Nord"
},
"pingouille": {
"h": "les grottes de glace bleue, ainsi que les montagnes escarpées",
"p": [
"Son souffle givre les vitres en plein été. Il se love en spirale pour dormir et pour se protéger. Son souffle givre les vitres, même en plein été.",
"Il ne recule jamais, même face à plus fort que lui. En combat, il préfère le contact direct et frappe fort. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Pingoucap.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 111,
"kg": 52.0,
"soin": "Ses cristaux tombent au printemps ; ramassez-les, les forgerons les achètent à bon prix. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Un repas riche en protéines et en céréales après chaque séance.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Pingouille m'a apporté un flocon parfait, sans fondre, sur le bout de son nez. » — Marie-Sève, de Port-Sève"
},
"pingoucap": {
"h": "les grottes de glace bleue, ainsi que les dojos et les terrains d'entraînement",
"p": [
"Son souffle givre les vitres en plein été. Ses antennes captent les vibrations à plusieurs mètres. Il hiberne pendant les étés trop chauds, au fond des grottes de glace.",
"Il s'entraîne du lever au coucher du soleil, sans jamais se lasser. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Pingouille.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 46,
"kg": 2.0,
"soin": "Un bol de neige fraîche ou de glace pilée le matin suffit à son bonheur. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Un repas riche en protéines et en céréales après chaque séance.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Pingoucap a gelé la rivière pour que les enfants puissent la traverser. » — Brune"
},
"glaconnet": {
"h": "les glaciers et les lacs gelés",
"p": [
"Il ne vit que là où la neige ne fond jamais. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Les voyageurs perdus dans le blizzard racontent qu'il les a guidés jusqu'à un abri.",
"Il vole de petits objets brillants et les cache dans des recoins introuvables. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Glaciaire.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 59,
"kg": 6.6,
"soin": "Par grande chaleur, il faut l'emmener près d'un lac ou d'une grotte froide. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Ne braquez jamais une lampe sur lui : il le prend comme une insulte.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Glaçonnet a gelé la rivière pour que les enfants puissent la traverser. » — Hana, de la Vallée Érable"
},
"glaciaire": {
"h": "les forêts de pins sous la neige, ainsi que les grottes où personne ne s'aventure",
"p": [
"Il ne vit que là où la neige ne fond jamais. Il roule plus qu'il ne marche, et rebondit quand il est content. Les voyageurs perdus dans le blizzard racontent qu'il les a guidés jusqu'à un abri.",
"Il suit parfois les voyageurs solitaires, sans jamais leur faire de mal. Il est équilibré en combat et s'adapte à toutes les situations. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Glaçonnet.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 74,
"kg": 21.5,
"soin": "Il préfère dormir dehors, même en hiver ; une couverture le vexe. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Ne braquez jamais une lampe sur lui : il le prend comme une insulte.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Glaciaire chantent la nuit, dans la toundra. Ça ressemble à du verre qui tinte. » — Marie-Sève, de Port-Sève"
},
"oursonge": {
"h": "les forêts de pins sous la neige, ainsi que les champs, les villages et les routes",
"p": [
"Son souffle givre les vitres en plein été. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Il fabrique de petites sculptures de glace que personne ne comprend.",
"Il est souvent la première créature que les enfants rencontrent. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Oursaurore.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 47,
"kg": 5.9,
"soin": "Ses cristaux tombent au printemps ; ramassez-les, les forgerons les achètent à bon prix. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il aime les caresses derrière les oreilles, ou ce qui en tient lieu.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Oursonge a gelé la rivière pour que les enfants puissent la traverser. » — Mère Hélène, de Graineval"
},
"oursaurore": {
"h": "les glaciers et les lacs gelés, ainsi que les places de marché",
"p": [
"Il ne vit que là où la neige ne fond jamais. Ses antennes captent les vibrations à plusieurs mètres. Il se cache sous la neige fraîche et n'en sort qu'à la nuit tombée.",
"Curieux, il suit les dresseurs sur des kilomètres. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Oursonge.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 51,
"kg": 7.0,
"soin": "Ses cristaux tombent au printemps ; ramassez-les, les forgerons les achètent à bon prix. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Il aime les caresses derrière les oreilles, ou ce qui en tient lieu.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Oursaurore chantent la nuit, dans la toundra. Ça ressemble à du verre qui tinte. » — Kai le surfeur"
},
"herminou": {
"h": "les sommets où l'hiver ne finit jamais",
"p": [
"Il ne vit que là où la neige ne fond jamais. Ses antennes captent les vibrations à plusieurs mètres. Les voyageurs perdus dans le blizzard racontent qu'il les a guidés jusqu'à un abri.",
"Il se cache sous la neige fraîche et n'en sort qu'à la nuit tombée. Sa vitesse est son arme principale. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Herminelle.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 32,
"kg": 1.5,
"soin": "Un bol de neige fraîche ou de glace pilée le matin suffit à son bonheur. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Herminou a gelé la rivière pour que les enfants puissent la traverser. » — une infirmière de Port-Sève"
},
"herminelle": {
"h": "les grottes de glace bleue",
"p": [
"Il ne vit que là où la neige ne fond jamais. Ses antennes captent les vibrations à plusieurs mètres. Il se cache sous la neige fraîche et n'en sort qu'à la nuit tombée.",
"Les voyageurs perdus dans le blizzard racontent qu'il les a guidés jusqu'à un abri. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Herminou.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 42,
"kg": 3.0,
"soin": "Un bol de neige fraîche ou de glace pilée le matin suffit à son bonheur. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Herminelle a gelé la rivière pour que les enfants puissent la traverser. » — Mère Hélène, de Graineval"
},
"aurorien": {
"h": "les clairières baignées de soleil",
"p": [
"Les voyageurs perdus suivent sa lueur. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Sa lumière soigne, dit-on, les petites blessures des autres créatures.",
"Son souffle givre les vitres, même en plein été. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. On allume une lanterne à son effigie lors de la fête de l'aube, à Graineval."
],
"cm": 79,
"kg": 10.4,
"soin": "Évitez de le regarder fixement quand il brille fort, pour vos yeux comme pour sa pudeur. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Par grande chaleur, il faut l'emmener près d'un lac ou d'une grotte froide.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Aurorien brille plus fort quand ma fille rit. On la fait rire souvent. » — Tavi junior"
},
"phoquet": {
"h": "les marais tranquilles et les fontaines de village",
"p": [
"Il nage à contre-courant pour se muscler. Ses nageoires puissantes le propulsent à grande vitesse. Il guide parfois les nageurs perdus vers la rive.",
"Il ne boit que de la neige fondue, jamais d'eau courante. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Phocalot.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 58,
"kg": 10.1,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Un bol de neige fraîche ou de glace pilée le matin suffit à son bonheur.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Phoquet qui m'a réappris à nager. » — Aline la forgeronne"
},
"phocalot": {
"h": "les marais tranquilles et les fontaines de village, ainsi que les glaciers et les lacs gelés",
"p": [
"Il nage à contre-courant pour se muscler. Ses nageoires puissantes le propulsent à grande vitesse. Il devient nerveux quand la mer est trop calme, comme s'il sentait quelque chose venir.",
"Les voyageurs perdus dans le blizzard racontent qu'il les a guidés jusqu'à un abri. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Phoquet.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 91,
"kg": 14.3,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Il préfère dormir dehors, même en hiver ; une couverture le vexe.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Phocalot a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Hugo le mineur"
},
"mammouton": {
"h": "les forêts de pins sous la neige",
"p": [
"Il ne vit que là où la neige ne fond jamais. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Son souffle givre les vitres, même en plein été.",
"Il dort des semaines entières sans bouger, puis disparaît en une nuit. Sa résistance est légendaire : on se fatigue avant lui. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Mammoutitan.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 38,
"kg": 5.0,
"soin": "Par grande chaleur, il faut l'emmener près d'un lac ou d'une grotte froide. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Mammouton m'a apporté un flocon parfait, sans fondre, sur le bout de son nez. » — Fennec le conteur"
},
"mammoutitan": {
"h": "les toundras balayées par le blizzard, ainsi que les champs de pierres où rien ne pousse",
"p": [
"Son souffle givre les vitres en plein été. Il se déplace par petits bonds rapides. Il fabrique de petites sculptures de glace que personne ne comprend.",
"Sa carapace porte les marques de chaque chute qu'il a survécue. En combat, il encaisse les coups sans broncher et use l'adversaire. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Mammouton.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 52,
"kg": 6.3,
"soin": "Il préfère dormir dehors, même en hiver ; une couverture le vexe. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Il ronge des cailloux pour entretenir ses dents ; un sac de graviers propres est indispensable.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Mammoutitan chantent la nuit, dans la toundra. Ça ressemble à du verre qui tinte. » — une infirmière de Port-Sève"
},
"lichenou": {
"h": "les vergers sauvages et les haies anciennes",
"p": [
"Des feuilles poussent sur son dos au printemps. Il glisse sans un bruit et surprend souvent les promeneurs. Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre.",
"Il hiberne pendant les étés trop chauds, au fond des grottes de glace. Il est équilibré en combat et s'adapte à toutes les situations. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 230,
"kg": 255.5,
"soin": "Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Ses cristaux tombent au printemps ; ramassez-les, les forgerons les achètent à bon prix.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Lichenou pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — Kai le surfeur"
},
"lynxor": {
"h": "les sommets où l'hiver ne finit jamais",
"p": [
"Son souffle givre les vitres en plein été. Il roule plus qu'il ne marche, et rebondit quand il est content. Les voyageurs perdus dans le blizzard racontent qu'il les a guidés jusqu'à un abri.",
"Il salue toujours son adversaire avant un combat, et après. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Lynxéclat.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 40,
"kg": 3.6,
"soin": "Un bol de neige fraîche ou de glace pilée le matin suffit à son bonheur. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il a besoin d'un entraînement physique quotidien, sinon il le cherchera ailleurs.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Lynxor m'a apporté un flocon parfait, sans fondre, sur le bout de son nez. » — Ondine, de Mirage-Nord"
},
"lynxeclat": {
"h": "les grottes de glace bleue, ainsi que les montagnes escarpées",
"p": [
"Son souffle givre les vitres en plein été. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Il fabrique de petites sculptures de glace que personne ne comprend.",
"Il ne recule jamais, même face à plus fort que lui. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Lynxor.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. À Givrecime, on raconte qu'il garde les âmes des voyageurs morts dans la neige jusqu'au printemps."
],
"cm": 74,
"kg": 18.2,
"soin": "Ses cristaux tombent au printemps ; ramassez-les, les forgerons les achètent à bon prix. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Un repas riche en protéines et en céréales après chaque séance.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Lynxéclat chantent la nuit, dans la toundra. Ça ressemble à du verre qui tinte. » — Mamie Odette, Bourg-Aurore"
},
"nordvol": {
"h": "les falaises côtières et les phares, ainsi que les grottes de glace bleue",
"p": [
"Il plane des heures sans battre des ailes. Ses ailes larges lui permettent de planer longtemps. Il annonce les changements de temps en tournoyant au-dessus des villages.",
"Il se cache sous la neige fraîche et n'en sort qu'à la nuit tombée. Sa vitesse est son arme principale. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 82,
"kg": 13.5,
"soin": "Ne le tenez jamais par les ailes : il ne vous le pardonnerait pas. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Un bol de neige fraîche ou de glace pilée le matin suffit à son bonheur.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Un Nordvol m'a volé mon écharpe. Je l'ai retrouvée au sommet d'un clocher, pliée. » — une infirmière de Port-Sève"
},
"sapinou": {
"h": "les talus fleuris le long des routes, ainsi que les forêts de pins sous la neige",
"p": [
"Des feuilles poussent sur son dos au printemps. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas.",
"Il se cache sous la neige fraîche et n'en sort qu'à la nuit tombée. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Sapinroi.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 48,
"kg": 5.3,
"soin": "Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il préfère dormir dehors, même en hiver ; une couverture le vexe.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Sapinou pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — Léon, apprenti de Clairsemis"
},
"sapinroi": {
"h": "les sous-bois humides et les jardins abandonnés",
"p": [
"Des feuilles poussent sur son dos au printemps. Il roule plus qu'il ne marche, et rebondit quand il est content. Il boit la rosée à l'aube, puis s'endort jusqu'à midi.",
"Il hiberne pendant les étés trop chauds, au fond des grottes de glace. En combat, il encaisse les coups sans broncher et use l'adversaire. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Sapinou.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 55,
"kg": 6.0,
"soin": "Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il préfère dormir dehors, même en hiver ; une couverture le vexe.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Sapinroi pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — Brune"
},
"carpeclat": {
"h": "les marais tranquilles et les fontaines de village",
"p": [
"On l'entend chanter les soirs de pluie. Il peut sauter hors de l'eau sur plusieurs mètres. Il guide parfois les nageurs perdus vers la rive.",
"Les sanctuaires l'accueillent : sa présence apaiserait les cœurs troublés. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Carpélune.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 72,
"kg": 14.9,
"soin": "Il adore les algues fraîches et les petits crustacés, mais il faut varier son alimentation. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Dans l'obscurité totale, il devient anxieux ; une veilleuse le rassure.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Carpéclat a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Siri, de la toundra"
},
"carpelune": {
"h": "les côtes rocheuses et les bancs de sable, ainsi que les champs de fleurs blanches",
"p": [
"On l'entend chanter les soirs de pluie. Il peut sauter hors de l'eau sur plusieurs mètres. Il nage à contre-courant pour se muscler et peut remonter des cascades entières.",
"Sa lumière soigne, dit-on, les petites blessures des autres créatures. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Carpéclat.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 100,
"kg": 21.0,
"soin": "Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Il se recharge au soleil levant ; un réveil matinal lui fait du bien.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Carpélune qui m'a réappris à nager. » — Siri, de la toundra"
},
"gruelune": {
"h": "les crêtes battues par les vents, ainsi que les clairières baignées de soleil",
"p": [
"Il suit les courants d'air chaud au-dessus des falaises. Son plumage change légèrement de teinte selon les saisons. Il nidifie au sommet des falaises, là où rien ne peut l'atteindre.",
"Il brille doucement quand il est en confiance, et s'éteint quand il a peur. Sa vitesse est son arme principale. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 89,
"kg": 7.0,
"soin": "Il a besoin d'espace pour déployer ses ailes chaque jour, sinon il devient nerveux. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il se recharge au soleil levant ; un réveil matinal lui fait du bien.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Les Gruelune volent en V au-dessus du port avant les tempêtes. Les pêcheurs les écoutent. » — Fennec le conteur"
},
"bambouton": {
"h": "les vergers sauvages et les haies anciennes",
"p": [
"Des feuilles poussent sur son dos au printemps. Ses quatre pattes robustes lui permettent de grimper sur des terrains difficiles. Il se cache sous les feuilles mortes dès qu'un prédateur approche.",
"Il salue toujours son adversaire avant un combat, et après. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Bambouclier.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 64,
"kg": 5.0,
"soin": "Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il respecte les dresseurs qui s'entraînent avec lui : courez à ses côtés.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« J'ai trouvé un Bambouton endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — Capitaine Morgane"
},
"bambouclier": {
"h": "les sous-bois humides et les jardins abandonnés, ainsi que les montagnes escarpées",
"p": [
"Des feuilles poussent sur son dos au printemps. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Au printemps, il disperse des graines qui germent en quelques jours.",
"Il salue toujours son adversaire avant un combat, et après. En combat, il encaisse les coups sans broncher et use l'adversaire. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Bambouton.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 91,
"kg": 41.4,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il a besoin d'un entraînement physique quotidien, sinon il le cherchera ailleurs.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« J'ai trouvé un Bambouclier endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — un pêcheur anonyme de Solmarina"
},
"origamine": {
"h": "les champs, les villages et les routes, ainsi que les crêtes battues par les vents",
"p": [
"Curieux, il suit les dresseurs sur des kilomètres. Son plumage change légèrement de teinte selon les saisons. Curieux, il suit les dresseurs sur des kilomètres.",
"Il siffle en volant, et chaque individu a sa propre mélodie. Sa vitesse est son arme principale. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Origalame.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 52,
"kg": 1.3,
"soin": "Il aime les caresses derrière les oreilles, ou ce qui en tient lieu. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Ne le tenez jamais par les ailes : il ne vous le pardonnerait pas.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Origamine n'a rien d'extraordinaire. C'est pour ça que je l'aime. » — Capitaine Morgane"
},
"origalame": {
"h": "les places de marché",
"p": [
"Curieux, il suit les dresseurs sur des kilomètres. Son plumage change légèrement de teinte selon les saisons. Il s'adapte à tous les terrains et à presque tous les climats.",
"Il nidifie au sommet des falaises, là où rien ne peut l'atteindre. Sa vitesse est son arme principale. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Origamine.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 77,
"kg": 7.1,
"soin": "Il aime les caresses derrière les oreilles, ou ce qui en tient lieu. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Lissez ses plumes dans le sens du vent après chaque vol ; il apprécie ce rituel.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Origalame sont les premiers à revenir après une catastrophe. Ils reconstruisent avec nous. » — Tavi junior"
},
"encensou": {
"h": "les ruelles et les greniers la nuit, ainsi que les déserts de pierre brûlés par le soleil",
"p": [
"Il n'apparaît qu'à la tombée de la nuit. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il imite les ombres des objets pour passer inaperçu.",
"Sa température interne ne descend jamais sous les quarante degrés, même en hiver. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les grands-mères disent aux enfants qui ne dorment pas qu'il viendra chercher leurs rêves."
],
"cm": 59,
"kg": 6.6,
"soin": "Ne braquez jamais une lampe sur lui : il le prend comme une insulte. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Prévoyez toujours une pierre plate pour qu'il puisse dormir sans brûler le sol.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Les Encensou se cachent dans les ombres des lanternes, à Graineval. Ils veillent, je crois. » — Mamie Odette, Bourg-Aurore"
},
"lampionet": {
"h": "les pentes volcaniques et les cendres tièdes, ainsi que les champs de fleurs blanches",
"p": [
"Il dort roulé en boule près des braises. Son corps mou et arrondi peut changer légèrement de forme. Il recrache des étincelles quand il éternue, ce qui a déjà déclenché plusieurs incendies.",
"Sa lumière soigne, dit-on, les petites blessures des autres créatures. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Lampiorage.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 53,
"kg": 6.1,
"soin": "Les jours de pluie, gardez-le à l'abri : sa flamme vacille et son humeur aussi. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Évitez de le regarder fixement quand il brille fort, pour vos yeux comme pour sa pudeur.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Lampionet m'a tenu chaud toute une nuit de blizzard. Je lui dois peut-être la vie. » — la Comtesse Mirabelle"
},
"lampiorage": {
"h": "les cratères éteints et les sources chaudes",
"p": [
"Il dort roulé en boule près des braises. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Les anciens forgerons l'élevaient pour garder leurs fours allumés toute la nuit.",
"Les voyageurs perdus suivent sa lueur jusqu'aux villages. Sa vitesse est son arme principale. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Lampionet.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 90,
"kg": 13.1,
"soin": "Prévoyez toujours une pierre plate pour qu'il puisse dormir sans brûler le sol. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il se recharge au soleil levant ; un réveil matinal lui fait du bien.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Lampiorage m'a tenu chaud toute une nuit de blizzard. Je lui dois peut-être la vie. » — le Prof. Lierre"
},
"ombrelame": {
"h": "les ruelles et les greniers la nuit, ainsi que les mines de fer et les filons de cuivre",
"p": [
"Il n'apparaît qu'à la tombée de la nuit. Sa posture droite lui donne un air étonnamment humain. Il suit parfois les voyageurs solitaires, sans jamais leur faire de mal.",
"Il mange de la ferraille et rejette une poussière de rouille. En combat, il préfère le contact direct et frappe fort. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les grands-mères disent aux enfants qui ne dorment pas qu'il viendra chercher leurs rêves."
],
"cm": 116,
"kg": 102.4,
"soin": "Il mange peu, mais il vole parfois la nourriture des autres pour jouer. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Huilez ses articulations une fois par mois avec une huile végétale.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Les Ombrelame se cachent dans les ombres des lanternes, à Graineval. Ils veillent, je crois. » — Léon, apprenti de Clairsemis"
},
"sylvecho": {
"h": "les talus fleuris le long des routes",
"p": [
"Des feuilles poussent sur son dos au printemps. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il boit la rosée à l'aube, puis s'endort jusqu'à midi.",
"Il vole de petits objets brillants et les cache dans des recoins introuvables. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 78,
"kg": 24.7,
"soin": "Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Ne braquez jamais une lampe sur lui : il le prend comme une insulte.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Sylvécho a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — une infirmière de Port-Sève"
},
"gongou": {
"h": "les ponts métalliques et les voies ferrées",
"p": [
"Il se polit le blindage avec du sable. Il glisse sans un bruit et surprend souvent les promeneurs. Il se polit le blindage avec du sable, pendant des heures.",
"Il vit en petits groupes très soudés. Sa résistance est légendaire : on se fatigue avant lui. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Gongrave.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 124,
"kg": 112.9,
"soin": "Il tinte doucement quand il est content. Apprenez à reconnaître ce son. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Les jeux de balle sont le meilleur moyen de gagner sa confiance.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Gongou a réparé la grille du jardin avec son propre corps. Il est resté une heure, fier. » — Gunnar, de Givrecime"
},
"gongrave": {
"h": "les ruines industrielles",
"p": [
"Il se polit le blindage avec du sable. Ses quatre pattes robustes lui permettent de grimper sur des terrains difficiles. Il ne rouille jamais, tant qu'on l'entretient avec un peu d'huile.",
"Il vit en petits groupes très soudés. En combat, il encaisse les coups sans broncher et use l'adversaire. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Gongou.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 101,
"kg": 31.3,
"soin": "Huilez ses articulations une fois par mois avec une huile végétale. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il aime les caresses derrière les oreilles, ou ce qui en tient lieu.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Gongrave a réparé la grille du jardin avec son propre corps. Il est resté une heure, fier. » — Hana, de la Vallée Érable"
},
"lotusine": {
"h": "les lagons tièdes et les récifs, ainsi que les vergers sauvages et les haies anciennes",
"p": [
"On l'entend chanter les soirs de pluie. Il peut sauter hors de l'eau sur plusieurs mètres. Il nage à contre-courant pour se muscler et peut remonter des cascades entières.",
"Il boit la rosée à l'aube, puis s'endort jusqu'à midi. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Lotusacré.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 65,
"kg": 14.3,
"soin": "Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Lotusine refuse de nager quand la mer est trop calme. Il dit que ce n'est pas normal. » — un pêcheur anonyme de Solmarina"
},
"lotusacre": {
"h": "les estuaires où l'eau douce rencontre la mer, ainsi que les vergers sauvages et les haies anciennes",
"p": [
"Il nage à contre-courant pour se muscler. Son corps fuselé fend l'eau sans un bruit. Il devient nerveux quand la mer est trop calme, comme s'il sentait quelque chose venir.",
"Il passe des heures immobile au soleil, et l'on dit que les fleurs poussent plus vite autour de lui. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Lotusine.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 93,
"kg": 19.3,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Lotusacré qui m'a réappris à nager. » — le Prof. Lierre"
},
"pianotin": {
"h": "les champs, les villages et les routes, ainsi que les clairières baignées de soleil",
"p": [
"Il s'adapte à tous les terrains. Il se déplace par petits bonds rapides. Il s'adapte à tous les terrains et à presque tous les climats.",
"Sa lumière soigne, dit-on, les petites blessures des autres créatures. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Pianoclef.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 31,
"kg": 0.7,
"soin": "Il aime les caresses derrière les oreilles, ou ce qui en tient lieu. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Évitez de le regarder fixement quand il brille fort, pour vos yeux comme pour sa pudeur.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Pianotin m'attend chaque soir au bout du chemin. Il n'est pas à moi. Il vient quand même. » — l'archiviste Basile"
},
"pianoclef": {
"h": "les jardins et les fermes, ainsi que les temples et les sanctuaires",
"p": [
"Curieux, il suit les dresseurs sur des kilomètres. Son long corps ondule avec grâce, sur terre comme dans l'eau. Curieux, il suit les dresseurs sur des kilomètres.",
"Il se lève toujours avant le soleil, comme pour l'appeler. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Pianotin.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 212,
"kg": 533.6,
"soin": "Les jeux de balle sont le meilleur moyen de gagner sa confiance. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Il apprécie le miel doré et les fleurs blanches.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Pianoclef n'a rien d'extraordinaire. C'est pour ça que je l'aime. » — Siri, de la toundra"
},
"rosette": {
"h": "les vergers sauvages et les haies anciennes",
"p": [
"Il se nourrit de lumière et de rosée. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas.",
"Il brille doucement quand il est en confiance, et s'éteint quand il a peur. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Rosaline.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 43,
"kg": 3.6,
"soin": "Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Évitez de le regarder fixement quand il brille fort, pour vos yeux comme pour sa pudeur.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Rosette pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — le jeune Léo, dresseur débutant"
},
"rosaline": {
"h": "les sous-bois humides et les jardins abandonnés, ainsi que les plages à l'aube",
"p": [
"Des feuilles poussent sur son dos au printemps. Il se déplace par petits bonds rapides. Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas.",
"Il brille doucement quand il est en confiance, et s'éteint quand il a peur. Sa vitesse est son arme principale. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Rosette. Bien entraîné, il deviendra Rosalbe.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 43,
"kg": 3.7,
"soin": "Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Dans l'obscurité totale, il devient anxieux ; une veilleuse le rassure.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Rosaline pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — Siri, de la toundra"
},
"rosalbe": {
"h": "les prairies hautes et les lisières de forêt",
"p": [
"Il se nourrit de lumière et de rosée. Son corps mou et arrondi peut changer légèrement de forme. Il boit la rosée à l'aube, puis s'endort jusqu'à midi.",
"Les sanctuaires l'accueillent : sa présence apaiserait les cœurs troublés. Sa vitesse est son arme principale. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Rosaline.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 97,
"kg": 34.7,
"soin": "Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Évitez de le regarder fixement quand il brille fort, pour vos yeux comme pour sa pudeur.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Rosalbe a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — le Prof. Lierre"
},
"pinceline": {
"h": "les bords de chemin et les fossés",
"p": [
"Curieux, il suit les dresseurs sur des kilomètres. Ses antennes captent les vibrations à plusieurs mètres. Curieux, il suit les dresseurs sur des kilomètres.",
"Il s'adapte à tous les terrains et à presque tous les climats. Sa vitesse est son arme principale. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Pincémoir.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 33,
"kg": 1.4,
"soin": "Il mange de tout, ce qui ne veut pas dire qu'il faut lui donner n'importe quoi. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Les Pinceline sont les premiers à revenir après une catastrophe. Ils reconstruisent avec nous. » — Hugo le mineur"
},
"pincemoir": {
"h": "les places de marché",
"p": [
"Il s'adapte à tous les terrains. Il marche en se dandinant, ce qui fait beaucoup rire les enfants. Il s'adapte à tous les terrains et à presque tous les climats.",
"Il mange de tout, y compris ce qu'on oublie sur les tables de pique-nique. Sa vitesse est son arme principale. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Pinceline.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 139,
"kg": 80.6,
"soin": "Il aime les caresses derrière les oreilles, ou ce qui en tient lieu. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Pincémoir n'a rien d'extraordinaire. C'est pour ça que je l'aime. » — Léon, apprenti de Clairsemis"
},
"gemmouche": {
"h": "les mines de fer et les filons de cuivre, ainsi que les clairières baignées de soleil",
"p": [
"Son corps tinte comme une cloche quand il marche. Il roule plus qu'il ne marche, et rebondit quand il est content. Il mange de la ferraille et rejette une poussière de rouille.",
"Les sanctuaires l'accueillent : sa présence apaiserait les cœurs troublés. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Gemmétal.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 51,
"kg": 10.0,
"soin": "Il ne craint pas le froid mais déteste la rouille : séchez-le après la pluie. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il apprécie le miel doré et les fleurs blanches.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Gemmouche m'a aidé·e à forger ma première lame. Il a corrigé mes gestes. » — un pêcheur anonyme de Solmarina"
},
"gemmetal": {
"h": "les mines de fer et les filons de cuivre",
"p": [
"Son corps tinte comme une cloche quand il marche. Ses antennes captent les vibrations à plusieurs mètres. Il ne rouille jamais, tant qu'on l'entretient avec un peu d'huile.",
"Sa lumière soigne, dit-on, les petites blessures des autres créatures. En combat, il encaisse les coups sans broncher et use l'adversaire. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Gemmouche.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les ouvriers de Voltaville le surnomment « le collègue qui ne prend jamais de pause »."
],
"cm": 45,
"kg": 7.7,
"soin": "Il ne craint pas le froid mais déteste la rouille : séchez-le après la pluie. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Évitez de le regarder fixement quand il brille fort, pour vos yeux comme pour sa pudeur.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Gemmétal m'a aidé·e à forger ma première lame. Il a corrigé mes gestes. » — Ondine, de Mirage-Nord"
},
"cygnebene": {
"h": "les nuages bas des matins d'automne, ainsi que les estuaires où l'eau douce rencontre la mer",
"p": [
"Il suit les courants d'air chaud au-dessus des falaises. Il se pose rarement au sol, qu'il trouve trop dangereux. Il suit les tempêtes à distance, comme un chien suit son maître.",
"Il guide parfois les nageurs perdus vers la rive. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 74,
"kg": 10.5,
"soin": "Lissez ses plumes dans le sens du vent après chaque vol ; il apprécie ce rituel. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Cygnébène me rapporte des lettres de ma sœur, de l'autre côté de la mer. » — le Prof. Lierre"
},
"libelluna": {
"h": "les sous-bois humides et les jardins abandonnés, ainsi que les crêtes battues par les vents",
"p": [
"Il se nourrit de lumière et de rosée. Ses ailes larges lui permettent de planer longtemps. Au printemps, il disperse des graines qui germent en quelques jours.",
"Il suit les tempêtes à distance, comme un chien suit son maître. Sa vitesse est son arme principale. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Libellustre.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 54,
"kg": 2.0,
"soin": "Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il a besoin d'espace pour déployer ses ailes chaque jour, sinon il devient nerveux.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Libelluna a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — Capitaine Morgane"
},
"libellustre": {
"h": "les vergers sauvages et les haies anciennes, ainsi que les clochers et les tours de guet",
"p": [
"Des feuilles poussent sur son dos au printemps. Son plumage change légèrement de teinte selon les saisons. Certains jardiniers l'invitent dans leurs potagers : il chasse les parasites et adoucit la terre.",
"Il suit les tempêtes à distance, comme un chien suit son maître. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Libelluna.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 70,
"kg": 4.8,
"soin": "Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Lissez ses plumes dans le sens du vent après chaque vol ; il apprécie ce rituel.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Libellustre pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — Marie-Sève, de Port-Sève"
},
"masquelin": {
"h": "les grottes où personne ne s'aventure",
"p": [
"On le reconnaît à ses yeux brillants dans le noir. Il se love en spirale pour dormir et pour se protéger. Il suit parfois les voyageurs solitaires, sans jamais leur faire de mal.",
"Curieux, il suit les dresseurs sur des kilomètres. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Masquebal.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les grands-mères disent aux enfants qui ne dorment pas qu'il viendra chercher leurs rêves."
],
"cm": 151,
"kg": 106.7,
"soin": "Il aime les recoins sombres et les sacs à dos fermés ; laissez-lui une cachette. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Les jeux de balle sont le meilleur moyen de gagner sa confiance.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Les Masquelin se cachent dans les ombres des lanternes, à Graineval. Ils veillent, je crois. » — Mamie Odette, Bourg-Aurore"
},
"masquebal": {
"h": "les lisières entre le crépuscule et la nuit",
"p": [
"On le reconnaît à ses yeux brillants dans le noir. Il glisse sans un bruit et surprend souvent les promeneurs. On le reconnaît à ses yeux brillants dans le noir, et à rien d'autre.",
"Il est souvent la première créature que les enfants rencontrent. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Masquelin.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les grands-mères disent aux enfants qui ne dorment pas qu'il viendra chercher leurs rêves."
],
"cm": 187,
"kg": 287.7,
"soin": "Il mange peu, mais il vole parfois la nourriture des autres pour jouer. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Il s'adapte à presque tout ; une routine régulière lui suffit.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Masquebal se cachent dans les ombres des lanternes, à Graineval. Ils veillent, je crois. » — Ondine, de Mirage-Nord"
},
"parfumette": {
"h": "les talus fleuris le long des routes, ainsi que les nuages bas des matins d'automne",
"p": [
"Des feuilles poussent sur son dos au printemps. Ses ailes larges lui permettent de planer longtemps. Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas.",
"Il adore jouer avec les cerfs-volants des enfants, quitte à les emporter. Il est équilibré en combat et s'adapte à toutes les situations. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 75,
"kg": 5.3,
"soin": "Arrosez-le avec de l'eau de pluie plutôt qu'avec l'eau des fontaines : la sève des villes l'irrite. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Lissez ses plumes dans le sens du vent après chaque vol ; il apprécie ce rituel.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Parfumette pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — Léon, apprenti de Clairsemis"
},
"fontainou": {
"h": "les côtes rocheuses et les bancs de sable, ainsi que les plages à l'aube",
"p": [
"On l'entend chanter les soirs de pluie. Il peut sauter hors de l'eau sur plusieurs mètres. Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps.",
"Les sanctuaires l'accueillent : sa présence apaiserait les cœurs troublés. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Fontainelle.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 55,
"kg": 5.0,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Évitez de le regarder fixement quand il brille fort, pour vos yeux comme pour sa pudeur.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Fontainou a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Mamie Odette, Bourg-Aurore"
},
"fontainelle": {
"h": "les marais tranquilles et les fontaines de village",
"p": [
"On l'entend chanter les soirs de pluie. Il peut sauter hors de l'eau sur plusieurs mètres. Il devient nerveux quand la mer est trop calme, comme s'il sentait quelque chose venir.",
"Sa lumière soigne, dit-on, les petites blessures des autres créatures. Il est équilibré en combat et s'adapte à toutes les situations. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Fontainou.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 118,
"kg": 87.1,
"soin": "Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Évitez de le regarder fixement quand il brille fort, pour vos yeux comme pour sa pudeur.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Fontainelle a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Mère Hélène, de Graineval"
},
"tortulagon": {
"h": "les rivières claires et les étangs profonds",
"p": [
"On l'entend chanter les soirs de pluie. Il peut sauter hors de l'eau sur plusieurs mètres. Il garde toujours un peu d'eau dans sa bouche, au cas où.",
"Il se cache sous les feuilles mortes dès qu'un prédateur approche. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Tortuocéan.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 59,
"kg": 10.7,
"soin": "Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Tortulagon a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — un pêcheur anonyme de Solmarina"
},
"tortuocean": {
"h": "les marais tranquilles et les fontaines de village",
"p": [
"Il nage à contre-courant pour se muscler. Son corps fuselé fend l'eau sans un bruit. Il nage à contre-courant pour se muscler et peut remonter des cascades entières.",
"Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Tortulagon.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 113,
"kg": 66.4,
"soin": "Il adore les algues fraîches et les petits crustacés, mais il faut varier son alimentation. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Tortuocéan a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — l'archiviste Basile"
},
"perrocolor": {
"h": "les clochers et les tours de guet",
"p": [
"Il suit les courants d'air chaud au-dessus des falaises. Il se pose rarement au sol, qu'il trouve trop dangereux. Il plane des heures sans battre des ailes, porté par les courants chauds.",
"Il est souvent la première créature que les enfants rencontrent. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Perrocalypso.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 48,
"kg": 1.4,
"soin": "Les graines de tournesol et les baies acides sont ses friandises préférées. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il s'adapte à presque tout ; une routine régulière lui suffit.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Perrocolor me rapporte des lettres de ma sœur, de l'autre côté de la mer. » — Hana, de la Vallée Érable"
},
"perrocalypso": {
"h": "les nuages bas des matins d'automne",
"p": [
"Il suit les courants d'air chaud au-dessus des falaises. Son plumage change légèrement de teinte selon les saisons. Il plane des heures sans battre des ailes, porté par les courants chauds.",
"Curieux, il suit les dresseurs sur des kilomètres. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Perrocolor.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 67,
"kg": 8.0,
"soin": "Lissez ses plumes dans le sens du vent après chaque vol ; il apprécie ce rituel. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il s'adapte à presque tout ; une routine régulière lui suffit.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Perrocalypso m'a volé mon écharpe. Je l'ai retrouvée au sommet d'un clocher, pliée. » — Mère Hélène, de Graineval"
},
"squalou": {
"h": "les rivières claires et les étangs profonds",
"p": [
"Il nage à contre-courant pour se muscler. Il peut sauter hors de l'eau sur plusieurs mètres. Il nage à contre-courant pour se muscler et peut remonter des cascades entières.",
"Il s'entraîne du lever au coucher du soleil, sans jamais se lasser. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Squalorde.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 69,
"kg": 14.5,
"soin": "Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Ne le laissez pas trop gagner contre les autres, il deviendrait insupportable.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Squalou refuse de nager quand la mer est trop calme. Il dit que ce n'est pas normal. » — Fennec le conteur"
},
"squalorde": {
"h": "les marais tranquilles et les fontaines de village, ainsi que les montagnes escarpées",
"p": [
"Il nage à contre-courant pour se muscler. Il peut sauter hors de l'eau sur plusieurs mètres. Il nage à contre-courant pour se muscler et peut remonter des cascades entières.",
"Il s'entraîne du lever au coucher du soleil, sans jamais se lasser. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Squalou.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 95,
"kg": 37.7,
"soin": "Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Il a besoin d'un entraînement physique quotidien, sinon il le cherchera ailleurs.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Squalorde refuse de nager quand la mer est trop calme. Il dit que ce n'est pas normal. » — Marie-Sève, de Port-Sève"
},
"hibiscune": {
"h": "les sous-bois humides et les jardins abandonnés",
"p": [
"Il se nourrit de lumière et de rosée. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il boit la rosée à l'aube, puis s'endort jusqu'à midi.",
"Il fuit les lieux trop sombres et dépérit dans les grottes. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 71,
"kg": 19.7,
"soin": "Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Dans l'obscurité totale, il devient anxieux ; une veilleuse le rassure.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Hibiscune a fait fleurir mon balcon en une nuit. Ma voisine ne me parle plus depuis. » — le jeune Léo, dresseur débutant"
},
"raiellume": {
"h": "les marais tranquilles et les fontaines de village, ainsi que les toits des villes et les antennes",
"p": [
"Il nage à contre-courant pour se muscler. Ses nageoires puissantes le propulsent à grande vitesse. Il devient nerveux quand la mer est trop calme, comme s'il sentait quelque chose venir.",
"Ses poils se hérissent plusieurs heures avant un orage. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Raiéclair.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 75,
"kg": 8.4,
"soin": "Il adore les algues fraîches et les petits crustacés, mais il faut varier son alimentation. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Ne le laissez pas près des appareils électriques : il les recharge, puis les grille.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Raiellume a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — le Professeur Hector"
},
"raieclair": {
"h": "les lagons tièdes et les récifs, ainsi que les plateaux exposés aux orages",
"p": [
"Il nage à contre-courant pour se muscler. Il peut sauter hors de l'eau sur plusieurs mètres. Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps.",
"Les jours de grand orage, des dizaines d'entre eux se rassemblent sur les collines. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Raiellume.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 116,
"kg": 51.5,
"soin": "Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Une brosse en bois, jamais en métal, pour démêler son pelage chargé.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Raiéclair a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Hana, de la Vallée Érable"
},
"toteclat": {
"h": "les gorges profondes creusées par les rivières, ainsi que les cratères éteints et les sources chaudes",
"p": [
"Sa carapace porte les traces de mille chutes. Ses antennes captent les vibrations à plusieurs mètres. Il se roule en boule et dévale les pentes pour se déplacer plus vite.",
"Il ne supporte pas la pluie et se réfugie sous les rochers à la moindre goutte. En combat, il encaisse les coups sans broncher et use l'adversaire. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 50,
"kg": 5.0,
"soin": "Il supporte mal l'humidité prolongée qui fissure sa carapace. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Il mange beaucoup de charbon doux et de baies séchées ; l'eau froide est à proscrire pendant les repas.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Totéclat a creusé un puits dans mon jardin. On a trouvé de l'eau. Et une pièce ancienne. » — le Professeur Hector"
},
"iguaflamme": {
"h": "les cratères éteints et les sources chaudes, ainsi que les vergers sauvages et les haies anciennes",
"p": [
"Sa queue rougeoie quand il est content. Il se tient debout sur deux pattes et utilise ses membres avant comme des mains. Il dort roulé autour des braises et grogne si on éteint le feu.",
"Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Iguasolaire.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 82,
"kg": 17.1,
"soin": "Prévoyez toujours une pierre plate pour qu'il puisse dormir sans brûler le sol. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Iguaflamme a brûlé le gâteau d'anniversaire de ma fille. Elle a trouvé ça génial. » — Mère Hélène, de Graineval"
},
"iguasolaire": {
"h": "les forges abandonnées et les fours à pain",
"p": [
"Il dort roulé en boule près des braises. Il marche en se dandinant, ce qui fait beaucoup rire les enfants. Ses flammes changent de couleur selon son humeur : orange s'il est calme, bleu s'il est en colère.",
"Il boit la rosée à l'aube, puis s'endort jusqu'à midi. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Iguaflamme.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 116,
"kg": 35.9,
"soin": "Il mange beaucoup de charbon doux et de baies séchées ; l'eau froide est à proscrire pendant les repas. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Iguasolaire a brûlé le gâteau d'anniversaire de ma fille. Elle a trouvé ça génial. » — Mamie Odette, Bourg-Aurore"
},
"mangrovin": {
"h": "les prairies hautes et les lisières de forêt",
"p": [
"Des feuilles poussent sur son dos au printemps. Ses quatre pattes robustes lui permettent de grimper sur des terrains difficiles. Il passe des heures immobile au soleil, et l'on dit que les fleurs poussent plus vite autour de lui.",
"Il devient nerveux quand la mer est trop calme, comme s'il sentait quelque chose venir. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Mangrovore.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 58,
"kg": 6.4,
"soin": "Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il adore les algues fraîches et les petits crustacés, mais il faut varier son alimentation.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Mangrovin pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — Capitaine Morgane"
},
"mangrovore": {
"h": "les sous-bois humides et les jardins abandonnés, ainsi que les lagons tièdes et les récifs",
"p": [
"Il se nourrit de lumière et de rosée. Sa posture droite lui donne un air étonnamment humain. Il boit la rosée à l'aube, puis s'endort jusqu'à midi.",
"Il garde toujours un peu d'eau dans sa bouche, au cas où. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Mangrovin.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 107,
"kg": 29.4,
"soin": "Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Mangrovore pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — Brune"
},
"tambouri": {
"h": "les places de marché, ainsi que les champs de pierres où rien ne pousse",
"p": [
"Curieux, il suit les dresseurs sur des kilomètres. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Il mange de tout, y compris ce qu'on oublie sur les tables de pique-nique.",
"Sa carapace porte les marques de chaque chute qu'il a survécue. En combat, il préfère le contact direct et frappe fort. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Tambourdon.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 67,
"kg": 22.1,
"soin": "Il mange de tout, ce qui ne veut pas dire qu'il faut lui donner n'importe quoi. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Un massage avec une pierre ponce le détend après les longues marches.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Tambouri n'a rien d'extraordinaire. C'est pour ça que je l'aime. » — une infirmière de Port-Sève"
},
"tambourdon": {
"h": "à peu près partout où l'on vit",
"p": [
"Curieux, il suit les dresseurs sur des kilomètres. Sa posture droite lui donne un air étonnamment humain. Curieux, il suit les dresseurs sur des kilomètres.",
"Il se roule en boule et dévale les pentes pour se déplacer plus vite. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Tambouri.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 99,
"kg": 80.7,
"soin": "Il s'adapte à presque tout ; une routine régulière lui suffit. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Tambourdon sont les premiers à revenir après une catastrophe. Ils reconstruisent avec nous. » — Gunnar, de Givrecime"
},
"poulpinet": {
"h": "les estuaires où l'eau douce rencontre la mer, ainsi que les lisières entre le crépuscule et la nuit",
"p": [
"Il nage à contre-courant pour se muscler. Ses nageoires puissantes le propulsent à grande vitesse. Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps.",
"Il vole de petits objets brillants et les cache dans des recoins introuvables. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Poulpiarque.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 58,
"kg": 10.1,
"soin": "Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Ne braquez jamais une lampe sur lui : il le prend comme une insulte.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Poulpinet a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — l'archiviste Basile"
},
"poulpiarque": {
"h": "les marais tranquilles et les fontaines de village, ainsi que les lisières entre le crépuscule et la nuit",
"p": [
"On l'entend chanter les soirs de pluie. Ses nageoires puissantes le propulsent à grande vitesse. Il garde toujours un peu d'eau dans sa bouche, au cas où.",
"Il n'apparaît qu'à la tombée de la nuit, et disparaît au premier rayon de soleil. Il est équilibré en combat et s'adapte à toutes les situations. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Poulpinet.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 106,
"kg": 48.8,
"soin": "Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Ne braquez jamais une lampe sur lui : il le prend comme une insulte.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Poulpiarque qui m'a réappris à nager. » — Hana, de la Vallée Érable"
},
"moutonuage": {
"h": "à peu près partout où l'on vit",
"p": [
"Il s'adapte à tous les terrains. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Il s'adapte à tous les terrains et à presque tous les climats.",
"Il communique par de petites décharges qui crépitent dans l'air. Il est équilibré en combat et s'adapte à toutes les situations. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Moutonimbus.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 54,
"kg": 6.5,
"soin": "Il s'adapte à presque tout ; une routine régulière lui suffit. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Les orages l'excitent énormément ; prévoyez une longe isolée les nuits de tempête.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Mon Moutonuage n'a rien d'extraordinaire. C'est pour ça que je l'aime. » — Hana, de la Vallée Érable"
},
"moutonimbus": {
"h": "les jardins et les fermes",
"p": [
"Il s'adapte à tous les terrains. Sa posture droite lui donne un air étonnamment humain. Il est souvent la première créature que les enfants rencontrent.",
"Il recharge son corps en se postant sous les lignes électriques, au grand désespoir des techniciens. Il est équilibré en combat et s'adapte à toutes les situations. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Moutonuage.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 97,
"kg": 38.3,
"soin": "Il aime les caresses derrière les oreilles, ou ce qui en tient lieu. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Les orages l'excitent énormément ; prévoyez une longe isolée les nuits de tempête.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Moutonimbus n'a rien d'extraordinaire. C'est pour ça que je l'aime. » — Hugo le mineur"
},
"epillon": {
"h": "les vergers sauvages et les haies anciennes",
"p": [
"Des feuilles poussent sur son dos au printemps. Ses quatre pattes robustes lui permettent de grimper sur des terrains difficiles. Il se cache sous les feuilles mortes dès qu'un prédateur approche.",
"Il vit en petits groupes très soudés. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Épiseigneur.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 57,
"kg": 7.2,
"soin": "Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il mange de tout, ce qui ne veut pas dire qu'il faut lui donner n'importe quoi.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« J'ai trouvé un Épillon endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — Brune"
},
"episeigneur": {
"h": "les sous-bois humides et les jardins abandonnés, ainsi que les jardins et les fermes",
"p": [
"Il se nourrit de lumière et de rosée. Sa carapace légère le protège sans l'alourdir. Il communique avec ses congénères par des parfums que l'odorat humain ne perçoit pas.",
"Il mange de tout, y compris ce qu'on oublie sur les tables de pique-nique. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Épillon.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 55,
"kg": 7.3,
"soin": "Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Les jeux de balle sont le meilleur moyen de gagner sa confiance.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« J'ai trouvé un Épiseigneur endormi dans mon potager. Le lendemain, mes tomates avaient doublé de taille. » — Aline la forgeronne"
},
"coqueret": {
"h": "les hauts plateaux sans arbres, ainsi que les plages de sable noir près des coulées",
"p": [
"Il plane des heures sans battre des ailes. Ses ailes larges lui permettent de planer longtemps. Il annonce les changements de temps en tournoyant au-dessus des villages.",
"Il recrache des étincelles quand il éternue, ce qui a déjà déclenché plusieurs incendies. En combat, il préfère le contact direct et frappe fort. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Coqardent.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 41,
"kg": 1.9,
"soin": "Il a besoin d'espace pour déployer ses ailes chaque jour, sinon il devient nerveux. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Prévoyez toujours une pierre plate pour qu'il puisse dormir sans brûler le sol.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Coqueret m'a volé mon écharpe. Je l'ai retrouvée au sommet d'un clocher, pliée. » — Hana, de la Vallée Érable"
},
"coqardent": {
"h": "les falaises côtières et les phares",
"p": [
"Il suit les courants d'air chaud au-dessus des falaises. Son plumage change légèrement de teinte selon les saisons. Il nidifie au sommet des falaises, là où rien ne peut l'atteindre.",
"Il dort roulé autour des braises et grogne si on éteint le feu. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Coqueret.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 75,
"kg": 9.7,
"soin": "Les graines de tournesol et les baies acides sont ses friandises préférées. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Prévoyez toujours une pierre plate pour qu'il puisse dormir sans brûler le sol.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Coqardent me rapporte des lettres de ma sœur, de l'autre côté de la mer. » — Brune"
},
"rainelune": {
"h": "les rivières claires et les étangs profonds",
"p": [
"On l'entend chanter les soirs de pluie. Son corps fuselé fend l'eau sans un bruit. Il garde toujours un peu d'eau dans sa bouche, au cas où.",
"Les voyageurs perdus suivent sa lueur jusqu'aux villages. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Rainegrand.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 66,
"kg": 5.5,
"soin": "Il adore les algues fraîches et les petits crustacés, mais il faut varier son alimentation. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Il se recharge au soleil levant ; un réveil matinal lui fait du bien.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Rainelune qui m'a réappris à nager. » — le Professeur Hector"
},
"rainegrand": {
"h": "les estuaires où l'eau douce rencontre la mer, ainsi que les plages à l'aube",
"p": [
"On l'entend chanter les soirs de pluie. Son corps fuselé fend l'eau sans un bruit. Il nage à contre-courant pour se muscler et peut remonter des cascades entières.",
"Les sanctuaires l'accueillent : sa présence apaiserait les cœurs troublés. Sans point faible évident, il convient aux dresseurs débutants comme aux experts. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Rainelune.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 97,
"kg": 39.2,
"soin": "Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Dans l'obscurité totale, il devient anxieux ; une veilleuse le rassure.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Rainegrand refuse de nager quand la mer est trop calme. Il dit que ce n'est pas normal. » — Léon, apprenti de Clairsemis"
},
"abeillor": {
"h": "les talus fleuris le long des routes, ainsi que les temples et les sanctuaires",
"p": [
"Il se nourrit de lumière et de rosée. Il se déplace à quatre pattes, avec une démarche souple et silencieuse. Il se cache sous les feuilles mortes dès qu'un prédateur approche.",
"Il se lève toujours avant le soleil, comme pour l'appeler. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 84,
"kg": 32.6,
"soin": "Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il apprécie le miel doré et les fleurs blanches.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Abeillor pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — Fennec le conteur"
},
"epouvantrou": {
"h": "les ruelles et les greniers la nuit, ainsi que les clairières où la rosée tient jusqu'à midi",
"p": [
"Il n'apparaît qu'à la tombée de la nuit. Il se déplace par petits bonds rapides. On le reconnaît à ses yeux brillants dans le noir, et à rien d'autre.",
"Il passe des heures immobile au soleil, et l'on dit que les fleurs poussent plus vite autour de lui. Il est équilibré en combat et s'adapte à toutes les situations. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les grands-mères disent aux enfants qui ne dorment pas qu'il viendra chercher leurs rêves."
],
"cm": 41,
"kg": 1.7,
"soin": "Ne braquez jamais une lampe sur lui : il le prend comme une insulte. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Il a besoin de lumière directe au moins quatre heures par jour ; un rebord de fenêtre orienté à l'est lui convient parfaitement.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Épouvantrou vole mes chaussettes. Uniquement la gauche. Je ne sais pas pourquoi. » — Hana, de la Vallée Érable"
},
"gerbillon": {
"h": "à peu près partout où l'on vit, ainsi que les grottes sèches et les mines oubliées",
"p": [
"Il s'adapte à tous les terrains. Sa posture droite lui donne un air étonnamment humain. Il vit en petits groupes très soudés.",
"Sa carapace porte les marques de chaque chute qu'il a survécue. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Gerbolide.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 91,
"kg": 53.1,
"soin": "Il aime les caresses derrière les oreilles, ou ce qui en tient lieu. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Un massage avec une pierre ponce le détend après les longues marches.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Les Gerbillon sont les premiers à revenir après une catastrophe. Ils reconstruisent avec nous. » — un pêcheur anonyme de Solmarina"
},
"gerbolide": {
"h": "les champs, les villages et les routes, ainsi que les carrières, les éboulis et les falaises",
"p": [
"Curieux, il suit les dresseurs sur des kilomètres. Il se déplace par petits bonds rapides. Il vit en petits groupes très soudés.",
"Sa carapace porte les marques de chaque chute qu'il a survécue. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Gerbillon.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Il apparaît dans presque toutes les comptines des Quatre Terres."
],
"cm": 54,
"kg": 6.6,
"soin": "Les jeux de balle sont le meilleur moyen de gagner sa confiance. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Un massage avec une pierre ponce le détend après les longues marches.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Gerbolide n'a rien d'extraordinaire. C'est pour ça que je l'aime. » — Aline la forgeronne"
},
"tournesoleil": {
"h": "les clairières où la rosée tient jusqu'à midi, ainsi que les champs de fleurs blanches",
"p": [
"Des feuilles poussent sur son dos au printemps. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Au printemps, il disperse des graines qui germent en quelques jours.",
"Il se lève toujours avant le soleil, comme pour l'appeler. En combat, il encaisse les coups sans broncher et use l'adversaire. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Une comptine d'Éclosia dit : « Là où il dort, demain fleurira. »"
],
"cm": 76,
"kg": 13.2,
"soin": "Taillez délicatement ses feuilles mortes à l'automne, il vous en sera reconnaissant pendant des semaines. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Évitez de le regarder fixement quand il brille fort, pour vos yeux comme pour sa pudeur.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Tournesoleil pleure quand on coupe un arbre. Alors on n'en coupe plus, à la maison. » — un pêcheur anonyme de Solmarina"
},
"moulinou": {
"h": "les hauts plateaux sans arbres",
"p": [
"Il plane des heures sans battre des ailes. Son plumage change légèrement de teinte selon les saisons. Il adore jouer avec les cerfs-volants des enfants, quitte à les emporter.",
"Il se sent attiré par les aimants et peut rester collé à un portail toute une nuit. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Moulinvent.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 55,
"kg": 5.7,
"soin": "Ne le tenez jamais par les ailes : il ne vous le pardonnerait pas. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il tinte doucement quand il est content. Apprenez à reconnaître ce son.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Moulinou m'a volé mon écharpe. Je l'ai retrouvée au sommet d'un clocher, pliée. » — Kai le surfeur"
},
"moulinvent": {
"h": "les hauts plateaux sans arbres",
"p": [
"Il suit les courants d'air chaud au-dessus des falaises. Il se pose rarement au sol, qu'il trouve trop dangereux. Il suit les tempêtes à distance, comme un chien suit son maître.",
"Il mange de la ferraille et rejette une poussière de rouille. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Moulinou.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Un proverbe des crêtes dit : « Quand il tourne trois fois, rentre tes moutons. »"
],
"cm": 81,
"kg": 15.3,
"soin": "Lissez ses plumes dans le sens du vent après chaque vol ; il apprécie ce rituel. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il tinte doucement quand il est content. Apprenez à reconnaître ce son.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Moulinvent volent en V au-dessus du port avant les tempêtes. Les pêcheurs les écoutent. » — Capitaine Morgane"
},
"basaltin": {
"h": "les grottes sèches et les mines oubliées, ainsi que les plages de sable noir près des coulées",
"p": [
"Sa carapace porte les traces de mille chutes. Il se déplace par petits bonds rapides. Il mange des cailloux riches en minéraux et recrache les autres.",
"Ses flammes changent de couleur selon son humeur : orange s'il est calme, bleu s'il est en colère. Sa résistance est légendaire : on se fatigue avant lui. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Basaltor.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 33,
"kg": 1.5,
"soin": "Un massage avec une pierre ponce le détend après les longues marches. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Un bain de cendres tièdes une fois par semaine entretient l'éclat de ses écailles.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Basaltin a dormi trois jours devant ma porte. Je n'ai pas pu sortir. Je ne lui en veux pas. » — Brune"
},
"basaltor": {
"h": "les champs de pierres où rien ne pousse, ainsi que les déserts de pierre brûlés par le soleil",
"p": [
"Sa carapace porte les traces de mille chutes. Il se déplace par petits bonds rapides. Il mange des cailloux riches en minéraux et recrache les autres.",
"Les anciens forgerons l'élevaient pour garder leurs fours allumés toute la nuit. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Basaltin. Bien entraîné, il deviendra Basaltitan.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 46,
"kg": 8.9,
"soin": "Un massage avec une pierre ponce le détend après les longues marches. Il se nourrit de nectar, de feuilles tendres et de sève ; une simple fleur peut lui suffire pour la journée. Un bain de cendres tièdes une fois par semaine entretient l'éclat de ses écailles.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Basaltor a dormi trois jours devant ma porte. Je n'ai pas pu sortir. Je ne lui en veux pas. » — Brune"
},
"basaltitan": {
"h": "les gorges profondes creusées par les rivières, ainsi que les cratères éteints et les sources chaudes",
"p": [
"Il dort des semaines sans bouger. Il roule plus qu'il ne marche, et rebondit quand il est content. Sa carapace porte les marques de chaque chute qu'il a survécue.",
"Il ne supporte pas la pluie et se réfugie sous les rochers à la moindre goutte. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme accomplie, rare à l'état sauvage, qui inspire le respect. Il évolue à partir de Basaltor.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 81,
"kg": 30.6,
"soin": "Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Un bain de cendres tièdes une fois par semaine entretient l'éclat de ses écailles.",
"cb": "En combat, c'est un pilier d'équipe : il peut retourner un match à lui seul s'il est bien soutenu.",
"tem": "« Un Basaltitan a dormi trois jours devant ma porte. Je n'ai pas pu sortir. Je ne lui en veux pas. » — Siri, de la toundra"
},
"obsidiane": {
"h": "les carrières, les éboulis et les falaises, ainsi que les cimetières de bateaux et les épaves",
"p": [
"Sa carapace porte les traces de mille chutes. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Il peut rester immobile si longtemps que la mousse pousse sur son dos.",
"On le reconnaît à ses yeux brillants dans le noir, et à rien d'autre. En combat, il encaisse les coups sans broncher et use l'adversaire. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les mineurs de Mousselande lui laissent toujours le premier caillou brillant de la journée."
],
"cm": 98,
"kg": 61.7,
"soin": "Il supporte mal l'humidité prolongée qui fissure sa carapace. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Il dort le jour et s'active à la nuit tombée ; adaptez vos entraînements.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Obsidiane a creusé un puits dans mon jardin. On a trouvé de l'eau. Et une pièce ancienne. » — Capitaine Morgane"
},
"soufrelin": {
"h": "les plages de sable noir près des coulées, ainsi que les ruines de murs anciens",
"p": [
"Il dort roulé en boule près des braises. Il marche en se dandinant, ce qui fait beaucoup rire les enfants. Ses flammes changent de couleur selon son humeur : orange s'il est calme, bleu s'il est en colère.",
"Il se roule en boule et dévale les pentes pour se déplacer plus vite. En combat, il préfère le contact direct et frappe fort. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Soufrebête.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 86,
"kg": 50.9,
"soin": "Un bain de cendres tièdes une fois par semaine entretient l'éclat de ses écailles. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il supporte mal l'humidité prolongée qui fissure sa carapace.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Soufrelin m'a tenu chaud toute une nuit de blizzard. Je lui dois peut-être la vie. » — Capitaine Morgane"
},
"soufrebete": {
"h": "les déserts de pierre brûlés par le soleil",
"p": [
"Il dort roulé en boule près des braises. Son corps mou et arrondi peut changer légèrement de forme. Il dort roulé autour des braises et grogne si on éteint le feu.",
"Il peut rester immobile si longtemps que la mousse pousse sur son dos. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Soufrelin.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 67,
"kg": 17.8,
"soin": "Les jours de pluie, gardez-le à l'abri : sa flamme vacille et son humeur aussi. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Les Soufrebête sauvages dansent autour des feux de camp. Si tu chantes, ils restent. » — Brune"
},
"murenoire": {
"h": "les rivières claires et les étangs profonds, ainsi que les ruelles et les greniers la nuit",
"p": [
"Il nage à contre-courant pour se muscler. Son corps fuselé fend l'eau sans un bruit. Il devient nerveux quand la mer est trop calme, comme s'il sentait quelque chose venir.",
"Il imite les ombres des objets pour passer inaperçu. En combat, il préfère le contact direct et frappe fort. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Murénide.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 55,
"kg": 7.2,
"soin": "Il doit pouvoir se baigner au moins une fois par jour ; un baquet suffit en voyage. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Il mange peu, mais il vole parfois la nourriture des autres pour jouer.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Murenoire a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — Fennec le conteur"
},
"murenide": {
"h": "les côtes rocheuses et les bancs de sable, ainsi que les cimetières de bateaux et les épaves",
"p": [
"On l'entend chanter les soirs de pluie. Son corps fuselé fend l'eau sans un bruit. Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps.",
"On le reconnaît à ses yeux brillants dans le noir, et à rien d'autre. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Murenoire.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 106,
"kg": 56.0,
"soin": "Par temps sec, humidifiez-le avec un linge mouillé avant chaque combat. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Ne braquez jamais une lampe sur lui : il le prend comme une insulte.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Murénide refuse de nager quand la mer est trop calme. Il dit que ce n'est pas normal. » — Tavi junior"
},
"cendrabeille": {
"h": "les déserts de pierre brûlés par le soleil, ainsi que les clairières où la rosée tient jusqu'à midi",
"p": [
"Sa queue rougeoie quand il est content. Il court vite, mais préfère marcher en reniflant tout ce qu'il croise. Il recrache des étincelles quand il éternue, ce qui a déjà déclenché plusieurs incendies.",
"Au printemps, il disperse des graines qui germent en quelques jours. En combat, il frappe avant que l'adversaire ait compris ce qui arrive. Il n'évolue pas, mais sa force grandit avec l'expérience.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 93,
"kg": 21.7,
"soin": "Les jours de pluie, gardez-le à l'abri : sa flamme vacille et son humeur aussi. Côté alimentation, il broute ou chasse selon les saisons et apprécie particulièrement les baies sauvages. Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs.",
"cb": "En combat, il compte sur sa polyvalence : ses capacités variées surprennent souvent l'adversaire.",
"tem": "« Mon Cendrabeille a brûlé le gâteau d'anniversaire de ma fille. Elle a trouvé ça génial. » — Marie-Sève, de Port-Sève"
},
"volcanuche": {
"h": "les plages de sable noir près des coulées",
"p": [
"Sa queue rougeoie quand il est content. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Sa température interne ne descend jamais sous les quarante degrés, même en hiver.",
"Il dort des semaines entières sans bouger, puis disparaît en une nuit. En combat, il encaisse les coups sans broncher et use l'adversaire. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Volcanarque.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 54,
"kg": 5.3,
"soin": "Il mange beaucoup de charbon doux et de baies séchées ; l'eau froide est à proscrire pendant les repas. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Un massage avec une pierre ponce le détend après les longues marches.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Volcanuche m'a tenu chaud toute une nuit de blizzard. Je lui dois peut-être la vie. » — le Prof. Lierre"
},
"volcanarque": {
"h": "les plages de sable noir près des coulées",
"p": [
"Il dort roulé en boule près des braises. Son long corps ondule avec grâce, sur terre comme dans l'eau. Les anciens forgerons l'élevaient pour garder leurs fours allumés toute la nuit.",
"Il dort des semaines entières sans bouger, puis disparaît en une nuit. Sa résistance est légendaire : on se fatigue avant lui. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Volcanuche.",
"Il fait partie des espèces qui ont survécu à la grande vague en se réfugiant sur les hauteurs. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 185,
"kg": 476.1,
"soin": "Les jours de pluie, gardez-le à l'abri : sa flamme vacille et son humeur aussi. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Il ronge des cailloux pour entretenir ses dents ; un sac de graviers propres est indispensable.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Volcanarque a brûlé le gâteau d'anniversaire de ma fille. Elle a trouvé ça génial. » — Mamie Odette, Bourg-Aurore"
},
"krakelin": {
"h": "les estuaires où l'eau douce rencontre la mer, ainsi que les cimetières de bateaux et les épaves",
"p": [
"On l'entend chanter les soirs de pluie. Ses nageoires puissantes le propulsent à grande vitesse. Il chante sous l'eau ; les pêcheurs disent que son chant annonce le beau temps.",
"Il imite les ombres des objets pour passer inaperçu. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Krakenoir.",
"Les anciens racontent qu'il s'est montré plus nerveux pendant les semaines qui ont précédé la Germination. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 60,
"kg": 5.4,
"soin": "Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Il mange peu, mais il vole parfois la nourriture des autres pour jouer.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Un Krakelin a ramené mon chapeau tombé à l'eau. Il l'a gardé une heure avant, pour voir si j'y tenais. » — le Professeur Hector"
},
"krakenoir": {
"h": "les estuaires où l'eau douce rencontre la mer, ainsi que les grottes où personne ne s'aventure",
"p": [
"Il nage à contre-courant pour se muscler. Son corps fuselé fend l'eau sans un bruit. Il garde toujours un peu d'eau dans sa bouche, au cas où.",
"Il n'apparaît qu'à la tombée de la nuit, et disparaît au premier rayon de soleil. Il mise tout sur l'attaque physique et ne craint pas les coups. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Krakelin.",
"Après la Germination, certains individus ont traversé la mer pour s'installer à Éclosia. Les marins de Port-Corail jettent une pièce à l'eau quand ils en aperçoivent un : c'est le prix d'une traversée sans tempête."
],
"cm": 105,
"kg": 20.8,
"soin": "Évitez l'eau trop chlorée des centres urbains, elle ternit sa peau. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Ne braquez jamais une lampe sur lui : il le prend comme une insulte.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Krakenoir refuse de nager quand la mer est trop calme. Il dit que ce n'est pas normal. » — le Professeur Hector"
},
"lavachon": {
"h": "les forges abandonnées et les fours à pain",
"p": [
"Sa queue rougeoie quand il est content. Son corps est si souple qu'il peut se glisser dans des fissures étroites. Il dort roulé autour des braises et grogne si on éteint le feu.",
"Il vit en petits groupes très soudés. Il mise tout sur l'attaque physique et ne craint pas les coups. C'est une forme jeune, encore fragile, qui évoluera au contact d'un dresseur attentif. Bien entraîné, il deviendra Lavaurochs.",
"Depuis la Germination, sa population a beaucoup augmenté sur les côtes d'Éclosia. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 50,
"kg": 5.4,
"soin": "Prévoyez toujours une pierre plate pour qu'il puisse dormir sans brûler le sol. Il absorbe sa nourriture par toute la surface de son corps ; une soupe tiède lui convient très bien. Il s'adapte à presque tout ; une routine régulière lui suffit.",
"cb": "En combat, c'est un débutant prometteur : misez sur sa vitesse d'apprentissage plutôt que sur sa force brute.",
"tem": "« Les Lavachon sauvages dansent autour des feux de camp. Si tu chantes, ils restent. » — Brune"
},
"lavaurochs": {
"h": "les forges abandonnées et les fours à pain",
"p": [
"Sa queue rougeoie quand il est content. Il glisse sans un bruit et surprend souvent les promeneurs. Sa température interne ne descend jamais sous les quarante degrés, même en hiver.",
"Il mange de tout, y compris ce qu'on oublie sur les tables de pique-nique. En combat, il préfère le contact direct et frappe fort. Cette forme intermédiaire est plus sûre d'elle et commence à montrer sa vraie puissance. Il évolue à partir de Lavachon.",
"La nuit de la Germination, des témoins l'ont vu fuir les côtes plusieurs heures avant la vague. Les forgerons de Ferrance gravent sa silhouette sur leurs enclumes pour porter chance."
],
"cm": 238,
"kg": 242.7,
"soin": "Il mange beaucoup de charbon doux et de baies séchées ; l'eau froide est à proscrire pendant les repas. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Il mange de tout, ce qui ne veut pas dire qu'il faut lui donner n'importe quoi.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Un Lavaurochs m'a tenu chaud toute une nuit de blizzard. Je lui dois peut-être la vie. » — l'archiviste Basile"
},
"aquoree": {
"h": "les lagons tièdes et les récifs",
"p": [
"Aquorée est la colère et la tendresse de l'océan. Certains disent que la vague de la Germination, c'était elle.",
"Elle ne déteste pas les humains : elle les oublie, simplement, comme la mer oublie les bateaux.",
"Les pêcheurs de Solmarina lui chantent une berceuse chaque soir de grande marée."
],
"cm": 189,
"kg": 351.1,
"soin": "Il adore les algues fraîches et les petits crustacés, mais il faut varier son alimentation. Il se nourrit de plancton et de petites baies aquatiques, de préférence à l'aube. Dans l'obscurité totale, il devient anxieux ; une veilleuse le rassure.",
"cb": "En combat, sa puissance est telle que les dresseurs prudents le gardent pour les affrontements décisifs.",
"tem": "« Après la Germination, j'avais peur de l'eau. C'est un Aquorée qui m'a réappris à nager. » — le Prof. Lierre"
},
"volcanis": {
"h": "les pentes volcaniques et les cendres tièdes, ainsi que les champs de pierres où rien ne pousse",
"p": [
"Volcanis dort sous les volcans de l'Archipel Braise. Chaque éruption serait un de ses rêves.",
"Le Gardien Tavi prétend lui avoir parlé une fois. Il n'a jamais voulu dire ce qu'il avait entendu.",
"Sa chaleur a façonné les îles bien avant la Germination."
],
"cm": 158,
"kg": 170.4,
"soin": "Un bain de cendres tièdes une fois par semaine entretient l'éclat de ses écailles. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il dort très profondément : ne le réveillez pas brusquement, il pourrait rouler sur vous.",
"cb": "En combat, sa puissance est telle que les dresseurs prudents le gardent pour les affrontements décisifs.",
"tem": "« Mon Volcanis a brûlé le gâteau d'anniversaire de ma fille. Elle a trouvé ça génial. » — Léon, apprenti de Clairsemis"
},
"givrael": {
"h": "les sommets où l'hiver ne finit jamais",
"p": [
"Givraël veille sur les glaces de Givrecime. Le blizzard serait son souffle.",
"Les alpinistes disparus seraient ses invités, endormis dans des palais de glace.",
"Il n'apparaît qu'à ceux qui ont froid au cœur, dit-on, pour le réchauffer ou le geler tout à fait."
],
"cm": 124,
"kg": 30.5,
"soin": "Par grande chaleur, il faut l'emmener près d'un lac ou d'une grotte froide. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Ne le tenez jamais par les ailes : il ne vous le pardonnerait pas.",
"cb": "En combat, sa puissance est telle que les dresseurs prudents le gardent pour les affrontements décisifs.",
"tem": "« Un Givraël m'a apporté un flocon parfait, sans fondre, sur le bout de son nez. » — Léon, apprenti de Clairsemis"
},
"tonnorage": {
"h": "les collines où la foudre tombe souvent",
"p": [
"Tonnorage descend des orages au-dessus de Voltaville. La centrale aurait été construite sur son ancien nid.",
"Chaque éclair serait un battement de son cœur.",
"Volta, la championne, dit l'avoir vu une fois, enfant. Depuis, elle n'a plus jamais eu peur de l'orage."
],
"cm": 192,
"kg": 419.0,
"soin": "Ne le laissez pas près des appareils électriques : il les recharge, puis les grille. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il tinte doucement quand il est content. Apprenez à reconnaître ce son.",
"cb": "En combat, sa puissance est telle que les dresseurs prudents le gardent pour les affrontements décisifs.",
"tem": "« Un Tonnorage m'a coiffé·e sans le vouloir. J'ai gardé la coupe trois semaines. » — Capitaine Morgane"
},
"aubere": {
"h": "les clairières baignées de soleil, ainsi que les pics inaccessibles",
"p": [
"Aubéris est le gardien de l'aube des vieilles légendes. Les anciens Somnis le craignaient : il réveille le monde chaque matin.",
"On raconte qu'il est l'ombre lumineuse de Zénithar, ou peut-être son ancêtre.",
"Il ne se montre qu'à l'aube, quand le ciel hésite encore entre la nuit et le jour."
],
"cm": 129,
"kg": 118.1,
"soin": "Évitez de le regarder fixement quand il brille fort, pour vos yeux comme pour sa pudeur. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il aime dormir en hauteur, sur un rocher ou un toit.",
"cb": "En combat, sa puissance est telle que les dresseurs prudents le gardent pour les affrontements décisifs.",
"tem": "« Les Aubéris sauvages se rassemblent sur les toits au lever du soleil. On dirait une fête. » — l'archiviste Basile"
},
"nocturne": {
"h": "les grottes où personne ne s'aventure",
"p": [
"Nocturnis est le gardien de la nuit. Dans les légendes d'avant la Germination, il veillait sur le sommeil du monde.",
"Oniris l'admirait plus que tout. Il voulait offrir au monde le sommeil sans fin de Nocturnis.",
"Il est doux pour qui dort, terrible pour qui veut empêcher les autres de rêver."
],
"cm": 332,
"kg": 805.1,
"soin": "Ne braquez jamais une lampe sur lui : il le prend comme une insulte. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Il aime dormir en hauteur, sur un rocher ou un toit.",
"cb": "En combat, sa puissance est telle que les dresseurs prudents le gardent pour les affrontements décisifs.",
"tem": "« Mon Nocturnis vole mes chaussettes. Uniquement la gauche. Je ne sais pas pourquoi. » — Tavi junior"
},
"auberis": {
"h": "les clairières baignées de soleil, ainsi que les pics inaccessibles",
"p": [
"Zénithar est le gardien du Zénith. Les fresques de Mousselande le montrent tenant les Quatre Terres dans ses serres, avant qu'elles ne se séparent.",
"On dit qu'il dort au-dessus des nuages et ne descend que lorsque le monde menace de se briser. Il s'est réveillé deux fois en mille ans.",
"Nox voulait le réveiller pour régner, Oniris voulait l'endormir pour toujours. Ni l'un ni l'autre n'avait compris qu'il ne s'éveille que pour arrêter les combats."
],
"cm": 128,
"kg": 62.9,
"soin": "Il se recharge au soleil levant ; un réveil matinal lui fait du bien. Il picore graines et insectes, et ramène parfois des cadeaux brillants à son dresseur. Il aime dormir en hauteur, sur un rocher ou un toit.",
"cb": "En combat, sa puissance est telle que les dresseurs prudents le gardent pour les affrontements décisifs.",
"tem": "« Un Zénithar a éclairé ma barque toute la nuit, jusqu'au port. » — Théo le passeur"
},
"nocturnis": {
"h": "les champs de fleurs blanches",
"p": [
"Germalis est l'esprit de la Graine-Monde. Il est né la nuit de la Germination, en même temps que les Éclos.",
"Les Gardiens disent qu'il ressent la douleur de chaque arbre d'Éclosia. Les lanternes de Graineval lui seraient secrètement adressées.",
"Maître Ronce voulait le dompter. Aurèle, avant lui, l'appelait « Petite » et lui parlait chaque matin."
],
"cm": 399,
"kg": 1461.0,
"soin": "Évitez de le regarder fixement quand il brille fort, pour vos yeux comme pour sa pudeur. Il mange rarement mais beaucoup, puis digère pendant des jours en somnolant au soleil. Ne le laissez jamais dans une pièce fermée trop longtemps : il s'étiole et perd ses couleurs.",
"cb": "En combat, sa puissance est telle que les dresseurs prudents le gardent pour les affrontements décisifs.",
"tem": "« Les Germalis sauvages se rassemblent sur les toits au lever du soleil. On dirait une fête. » — Fennec le conteur"
},
"eveillon": {
"h": "les brumes des matins calmes",
"p": [
"Éveillon est le gardien de l'Éveil, le passage entre le rêve et le réel. Elio, le premier dresseur, l'attend depuis mille ans au sommet du Mont Éveil.",
"On dit que chaque matin, en ouvrant les yeux, chaque être vivant lui doit un instant.",
"Ronce voyait en lui une porte. Elio y voit un témoin. Personne ne sait ce qu'Éveillon y voit lui-même."
],
"cm": 133,
"kg": 129.4,
"soin": "La méditation partagée, cinq minutes par jour, renforce votre lien de façon spectaculaire. Il mange avec ses mains, ou ce qui y ressemble, et imite souvent les gestes de son dresseur à table. Il apprécie le miel doré et les fleurs blanches.",
"cb": "En combat, il a trouvé son équilibre : il encaisse mieux et commence à imposer son rythme.",
"tem": "« Mon Éveillon savait que j'allais pleurer avant moi. Il était déjà là. » — la Comtesse Mirabelle"
}
};
