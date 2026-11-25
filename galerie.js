'use strict';
/* ============================================================
   ÉCLOSIA — Créatures de la Galerie
   80 créatures peintes fournies par le joueur (designs originaux),
   découpées, détourées et agrandies. Familles d'évolution pour les
   designs proches, espèces uniques pour les autres.
   ============================================================ */
// [case, nom, types, rôle]
const GAL = [
  ['00', 'Æthaile', 'dragon/lumiere', 'spec'], ['01', 'Luminhara', 'esprit/eau', 'spec'], ['02', 'Céphalume', 'eau/esprit', 'spec'], ['03', 'Aethelgarde', 'roc/acier', 'tank'],
  ['04', 'Mycélia', 'flore/toxine', 'sptank'], ['05', 'Pyrecœur', 'feu', 'phys'], ['06', 'Givrâme', 'givre', 'fast'], ['07', 'Obsidios', 'ombre/roc', 'phys'],
  ['08', 'Voltara', 'foudre/acier', 'phys'], ['09', 'Sylvaigle', 'flore/vent', 'fast'], ['10', 'Azurpenne', 'vent/eau', 'fast'], ['11', 'Abyssandre', 'eau/dragon', 'bal'],
  ['12', 'Kasrok', 'vent/roc', 'phys'], ['13', 'Koodrak', 'vent/ombre', 'fast'], ['14', 'Roségaïa', 'esprit/toxine', 'spec'], ['15', 'Rapacor', 'vent/ombre', 'phys'],
  ['16', 'Corvanox', 'ombre/vent', 'fast'], ['17', 'Obscolosse', 'roc/ombre', 'tank'], ['18', 'Anguivolt', 'foudre/eau', 'fast'], ['19', 'Sylvanus', 'flore/combat', 'phys'],
  ['20', 'Léoflamme', 'feu/combat', 'phys'], ['21', 'Cristaile', 'givre/vent', 'spec'], ['22', 'Gorillonyx', 'combat/ombre', 'phys'], ['23', 'Tryvolt', 'foudre', 'fast'],
  ['24', 'Aodhima', 'eau/esprit', 'sptank'], ['25', 'Basalthor', 'roc', 'tank'], ['26', 'Brasaltor', 'feu/combat', 'phys'], ['27', 'Fendécaille', 'acier/eau', 'bal'],
  ['28', 'Serpéclair', 'foudre/eau', 'spec'], ['29', 'Cerfylve', 'flore/esprit', 'sptank'], ['30', 'Givreconte', 'givre/dragon', 'spec'], ['31', 'Nyxalis', 'eau/ombre', 'fast'],
  ['32', 'Méduslune', 'eau/toxine', 'sptank'], ['33', 'Sporelle', 'flore/toxine', 'sptank'], ['34', 'Abyscheval', 'eau/ombre', 'bal'], ['35', 'Sphyrax', 'roc/feu', 'bal'],
  ['36', 'Manticor', 'feu/vent', 'phys'], ['37', 'Hydrosaure', 'eau/roc', 'tank'], ['38', 'Ferréquin', 'acier/ombre', 'fast'], ['39', 'Arbréterne', 'flore/roc', 'tank'],
  ['40', 'Griffaube', 'vent/normal', 'fast'], ['41', 'Dracondine', 'dragon/eau', 'spec'], ['42', 'Cervalithe', 'roc/flore', 'tank'], ['43', 'Mécagolem', 'acier/roc', 'tank'],
  ['44', 'Champignâtre', 'flore/toxine', 'tank'], ['45', 'Cerfmousse', 'flore/normal', 'bal'], ['46', 'Ocregolem', 'roc/combat', 'phys'], ['47', 'Aurogarde', 'acier/combat', 'tank'],
  ['48', 'Gazellune', 'normal/vent', 'fast'], ['49', 'Pousselin', 'flore/combat', 'bal'], ['50', 'Violdragon', 'dragon/esprit', 'spec'], ['51', 'Stégoverde', 'flore/roc', 'tank'],
  ['52', 'Prismobre', 'ombre/acier', 'phys'], ['53', 'Pyrelion', 'feu', 'phys'], ['54', 'Plumaré', 'eau/esprit', 'spec'], ['55', 'Azurailes', 'vent/eau', 'fast'],
  ['56', 'Givraile', 'givre/vent', 'fast'], ['57', 'Orvolt', 'roc/foudre', 'tank'], ['58', 'Volturène', 'foudre/eau', 'fast'], ['59', 'Sylvagant', 'flore/combat', 'tank'],
  ['60', 'Pyrémane', 'feu', 'phys'], ['61', 'Céphalarque', 'eau/esprit', 'spec'], ['62', 'Neigelion', 'givre/normal', 'bal'], ['63', 'Furetrail', 'normal/vent', 'fast'],
  ['64', 'Hyénoir', 'ombre/normal', 'phys'], ['65', 'Givrelion', 'givre/roc', 'tank'], ['66', 'Loupnuit', 'ombre/feu', 'fast'], ['67', 'Voltrix', 'foudre/acier', 'bal'],
  ['68', 'Pandiol', 'esprit/vent', 'spec'], ['69', 'Feuildra', 'flore/dragon', 'bal'], ['70', 'Pandioraile', 'esprit/vent', 'spec'], ['71', 'Nyxpanthère', 'eau/ombre', 'phys'],
  ['72', 'Rocgardin', 'roc/acier', 'tank'], ['73', 'Obsidium', 'ombre/feu', 'tank'], ['74', 'Cristogolem', 'givre/roc', 'tank'], ['75', 'Givrelle', 'givre/dragon', 'fast'],
  ['76', 'Sablemane', 'roc/feu', 'phys'], ['77', 'Voltara des Abysses', 'foudre/eau', 'spec'], ['78', 'Arbrancien', 'flore', 'sptank'], ['79', 'Racinâme', 'flore/esprit', 'sptank'],
];
// familles d'évolution (du plus petit au plus grand)
const GAL_FAMILIES = [['53', '05', '60'], ['18', '58', '77'], ['49', '19', '59'], ['04', '44'], ['02', '61'], ['10', '55'], ['56', '21'], ['62', '06'], ['31', '71'], ['72', '03'], ['75', '30'], ['78', '39'], ['68', '70'], ['23', '67', '08'], ['25', '73']];
const GAL_IDS = {};
(function buildGallery() {
  const famOf = {}; GAL_FAMILIES.forEach(f => f.forEach((c, i) => { famOf[c] = { f, i }; }));
  const BST = { '1': 330, '2': 430, '3': 535, 'u': 480, 'u2': 470 };
  for (const [cell] of GAL) GAL_IDS[cell] = 'gal' + cell;
  for (const [cell, n, types, role] of GAL) {
    const id = GAL_IDS[cell], fm = famOf[cell];
    let stage = 'u', next = null, prev = null, evo = 0, line = id;
    if (fm) {
      const L = fm.f.length; stage = L === 2 ? (fm.i === 0 ? '1' : '2') : String(fm.i + 1);
      next = fm.i < L - 1 ? GAL_IDS[fm.f[fm.i + 1]] : null; prev = fm.i ? GAL_IDS[fm.f[fm.i - 1]] : null;
      evo = next ? (L === 2 ? 34 : fm.i === 0 ? 30 : 50) : 0; line = GAL_IDS[fm.f[0]];
    }
    const bst = stage === 'u' ? BST.u : stage === '1' ? BST['1'] : stage === '2' ? (next ? BST['2'] : 495) : BST['3'];
    const r = rng(hashStr(id + ':stats')), w = ROLES[role].map(v => v * (0.9 + r() * 0.2)), sum = w.reduce((a, b) => a + b, 0);
    const s = { id, n, types: types.split('/'), stage, role, evo, plan: 'quad', desc: '', num: DEX.length + 1, line, next, prev, slow: false, img: 'img/galf/g' + cell + '.webp?v=2', gal: 1 };
    s.base = {}; STATK.forEach((k, j) => { s.base[k] = Math.max(20, Math.round(bst * w[j] / sum)); });
    s.bst = bst; s.yield = Math.round(bst * bst / 1600);
    s.rate = { '1': 170, '2': next ? 110 : 70, '3': 45, 'u': 75 }[stage];
    s.desc = `${n}, une créature peinte des contrées sauvages.`;
    SP[id] = s; DEX.push(id);
  }
})();

/* ---------- Images : chargement à la demande ---------- */
const GAL_IMG = {};
function galImage(sp) {
  const s = SP[sp]; if (!s || !s.img) return null;
  let im = GAL_IMG[sp];
  if (!im) {
    im = GAL_IMG[sp] = new Image();
    im.onload = () => { im._ok = 1; delete MON_CACHE[sp]; delete MON_CACHE[sp + '*']; delete MON_CACHE['b:' + sp]; delete MON_CACHE['b:' + sp + '*']; for (const k in URL_CACHE) if (k.startsWith(sp) || k === 'sil:' + sp) delete URL_CACHE[k]; for (const k in BMON) if (k.startsWith(sp)) delete BMON[k]; if (typeof BIG !== 'undefined') for (const k in BIG) if (k.startsWith(sp + ':')) delete BIG[k]; };
    im.src = s.img;
  }
  return im._ok ? im : null;
}
function galCanvas(sp, size, shiny, back) {
  const im = galImage(sp); if (!im) return null;
  const c = mkCanvas(size, size), x = c.getContext('2d');
  let k = Math.min(size * 0.94 / im.width, size * 0.9 / im.height);
  const pix = SP[sp].gal !== 3 && !/(galf|gal2f|startf|galn|galm)[\/:]/.test(SP[sp].img) && k >= 1; x.imageSmoothingEnabled = !pix; x.imageSmoothingQuality = 'high';
  if (shiny) x.filter = 'hue-rotate(150deg) saturate(1.2)';
  if (pix) k = k >= 2 ? Math.floor(k) : Math.floor(k * 4) / 4;
  const w = Math.round(im.width * k), h = Math.round(im.height * k);
  x.fillStyle = 'rgba(0,0,0,.22)'; x.beginPath(); x.ellipse(size / 2, size * 0.95, w * 0.38, size * 0.035, 0, 0, 7); x.fill();
  if (back) { x.translate(size, 0); x.scale(-1, 1); }
  x.drawImage(im, Math.round((size - w) / 2), Math.round(size * 0.96 - h), w, h);
  if (back) { x.setTransform(1, 0, 0, 1, 0, 0); x.filter = 'none'; x.globalCompositeOperation = 'source-atop'; x.fillStyle = 'rgba(20,10,40,0.12)'; x.fillRect(0, 0, size, size); }
  return c;
}
const _monSpriteGal = monSprite;
monSprite = function (sp, shiny) {
  if (SP[sp] && SP[sp].gal) { const k = sp + (shiny ? '*' : ''); if (MON_CACHE[k]) return MON_CACHE[k]; const c = galCanvas(sp, 160, shiny, false); if (c) return (MON_CACHE[k] = c); }
  return _monSpriteGal(sp, shiny);
};
const _monBackGal = monBack;
monBack = function (sp, shiny) {
  if (SP[sp] && SP[sp].gal) { const k = 'b:' + sp + (shiny ? '*' : ''); if (MON_CACHE[k]) return MON_CACHE[k]; const c = galCanvas(sp, 160, shiny, true); if (c) return (MON_CACHE[k] = c); }
  return _monBackGal(sp, shiny);
};
const _battleMonGal = battleMon;
battleMon = function (sp, shiny, back, v) {
  if (SP[sp] && SP[sp].gal) {
    const sz = Math.min(1120, Math.max(160, Math.round(80 * SCR))), key = sp + (shiny ? '*' : '') + (back ? 'b' : '') + sz + 'g';
    if (BMON[key]) return BMON[key];
    const c = galCanvas(sp, sz, shiny, back); if (c) { const ks = Object.keys(BMON); if (ks.length > 16) delete BMON[ks[0]]; return (BMON[key] = c); }
  }
  return _battleMonGal(sp, shiny, back, v);
};
const _bigMonGal = bigMon;
bigMon = function (id, sz) {
  if (SP[id] && SP[id].gal) { const k = id + ':' + sz; if (BIG[k]) return BIG[k]; const c = galCanvas(id, sz, false, false); if (c) return (BIG[k] = c); }
  return _bigMonGal(id, sz);
};
// tant que l'image n'est pas chargée, un dessin provisoire est généré
// préchargement discret après le démarrage
setTimeout(() => { let i = 0; const ids = Object.values(GAL_IDS); const tick = () => { for (let k = 0; k < 4 && i < ids.length; k++, i++) galImage(ids[i]); if (i < ids.length) setTimeout(tick, 400); }; tick(); }, 4000);

/* ---------- Fiches du Codex ---------- */
const GAL_HAB = { feu: "les pentes chaudes près des volcans", eau: "les rivages et les lacs profonds", flore: "les forêts anciennes et les prairies humides", vent: "les falaises et les grands ciels ouverts", roc: "les montagnes et les carrières abandonnées", acier: "les ruines de forges et les mines", givre: "les sommets enneigés et la toundra", foudre: "les plaines balayées par l'orage", ombre: "les bois sombres et les grottes", lumiere: "les clairières baignées de soleil", esprit: "les lieux anciens où l'on dit que le temps est mince", toxine: "les marais et les sous-bois humides", combat: "les arènes sauvages et les cols difficiles", normal: "presque partout où vivent des humains", dragon: "les gorges escarpées loin des villes" };
for (const cell in GAL_IDS) {
  const id = GAL_IDS[cell], s = SP[id], t1 = s.types[0], t2 = s.types[1];
  const evo = s.next ? ` Il évolue en ${SP[s.next].n} vers le niveau ${s.evo}.` : s.prev ? ` C'est l'évolution de ${SP[s.prev].n}.` : '';
  DEX_LORE[id] = {
    h: `On le trouve dans ${GAL_HAB[t1]}${t2 ? `, et parfois dans ${GAL_HAB[t2]}` : ''}`,
    cm: 40 + (hashStr(id) % 160) + (s.stage === '3' ? 120 : 0), kg: Math.round((8 + (hashStr(id + 'k') % 120) + (s.stage === '3' ? 140 : 0)) * 10) / 10,
    p: [
      `${s.n} fait partie des créatures « de la Galerie » : des espèces que l'on croyait légendaires, peintes sur les murs d'un vieux musée de Valmont, jusqu'à ce qu'on les observe vraiment dans la nature après la Germination.${evo}`,
      `Son type ${TN[t1]}${t2 ? ` et ${TN[t2]}` : ''} se lit dans chaque détail de son corps. Les dresseurs qui en possèdent un disent qu'il a un caractère ${['fier', 'curieux', 'calme', 'joueur', 'méfiant', 'loyal'][hashStr(id) % 6]}, et qu'il ne se laisse approcher qu'après plusieurs rencontres.`,
      `La conservatrice du musée de Valmont tient à jour la liste des créatures peintes déjà aperçues. Elle affirme que le peintre inconnu ne les a pas inventées : il les avait déjà vues, bien avant tout le monde.`,
    ],
    soin: `Donnez-lui de l'espace et du calme : comme toutes les créatures de la Galerie, il supporte mal d'être enfermé.`, cb: `En combat, misez sur son style ${({ phys: 'physique', spec: 'spécial', tank: 'défensif', sptank: 'endurant', fast: 'rapide', bal: 'équilibré' })[s.role]}.`, tem: `« J'ai reconnu ${s.n} grâce au tableau du musée. Il était exactement pareil. Ça m'a fait froid dans le dos. » — un visiteur de Valmont`,
  };
}

/* ---------- Où les trouver ---------- */
(function placeGallery() {
  const routes = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 'w1', 'w2', 'e1', 'e2', 'g1', 'g3', 'g4', 'g6', 'o1', 'o3', 'o4', 'o6', 'b1'].filter(r => ROUTES[r] && ROUTES[r].enc && ROUTES[r].enc.grass);
  const bases = Object.values(GAL_IDS).filter(id => !SP[id].prev);
  bases.forEach((id, i) => {
    const t = SP[id].types;
    // route dont les créatures partagent un type, sinon répartition régulière
    let r = routes.find((rr, k) => (k + i) % 3 === 0 && ROUTES[rr].enc.grass.some(e => SP[e[0]] && SP[e[0]].types.some(x => t.includes(x))) && !ROUTES[rr]._gal);
    if (!r) r = routes[(i * 7) % routes.length];
    const G0 = ROUTES[r].enc.grass, lo = Math.min(...G0.map(e => e[1])), hi = Math.max(...G0.map(e => e[2]));
    G0.push([evolveForLevel(id, lo), lo, hi, 10]);
    ROUTES[r]._gal = (ROUTES[r]._gal || 0) + 1;
  });
})();
