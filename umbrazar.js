'use strict';
/* Umbrazar : légendaire Dragon/Eau de l'après-ligue (design du joueur). */
(function addUmbrazar() {
  const id = 'umbrazar', n = 'Umbrazar';
  const s = { id, n, types: ['dragon', 'eau'], stage: 'L', role: 'fast', evo: 0, plan: 'biped',
    desc: "Il nage dans l'ombre comme dans l'eau. Ses rubans de flamme rouge tracent les routes que la Vague a effacées.",
    num: DEX.length + 1, line: id, next: null, prev: null, slow: true, img: 'img/galn/umbre.webp?v=3', gal: 4 };
  const bst = 650, r = rng(hashStr(id + ':stats')), w = ROLES[s.role].map(v => v * (0.9 + r() * 0.2)), sum = w.reduce((a, b) => a + b, 0);
  s.base = {}; STATK.forEach((k, j) => { s.base[k] = Math.max(20, Math.round(bst * w[j] / sum)); });
  s.bst = bst; s.yield = Math.round(bst * bst / 1600); s.rate = 15;
  SP[id] = s; DEX.push(id);
  if (typeof DEX_LORE !== 'undefined') DEX_LORE[id] = {
    h: "On ne le voit qu'à la Nécropole des Éclos, après la Ligue, quand la nuit est la plus noire.",
    cm: 290, kg: 186.4,
    p: ["Les archives interdites de la Première Vague parlent d'une ombre ailée qui marchait devant la marée, il y a mille ans. Les autorités ont effacé ce passage des livres d'école.",
      "Ses rubans de flamme ne sont pas des ornements : ce sont des traces. Chaque fois que la Vague a englouti une ville, Umbrazar en a gardé le chemin, pour que quelqu'un s'en souvienne.",
      "Ses griffes portent des anneaux de pierre noire. On dit qu'il ne les dresse que contre ceux qui mentent sur le passé."],
    soin: "Il dort le jour et refuse la lumière vive. Donnez-lui une pièce sombre et du silence.",
    cb: "En combat, misez sur sa vitesse : il frappe avant qu'on le voie.",
    tem: "« Je l'ai vu une seule fois, sur les tombes. Il ne m'a pas attaqué. Il m'a regardé comme s'il savait ce que j'avais caché. » — un fossoyeur de la Nécropole",
  };
  POST_LEGENDS.push(['umbrazar', 'f7', "Les tombes de la Nécropole s'éteignent une à une. Dans le noir, des rubans de flamme rouge s'allument... Umbrazar apparaît !"]);
  LEGENDS.umbrazar = { sp: 'umbrazar', lvl: 78, flag: 'leg_umbrazar', text: POST_LEGENDS[POST_LEGENDS.length - 1][2] };
  if (typeof SHADOW_LEG !== 'undefined') SHADOW_LEG.umbrazar = '235,90,60';
  // flotte en planant : pas d'écart des jambes, qui dédoublerait ses rubans
  if (typeof ANIM_STYLE !== 'undefined') ANIM_STYLE.umbrazar = { k: 'float', ph: 1.3, sp: 0.9 };
})();
