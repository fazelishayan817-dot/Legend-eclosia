'use strict';
/* ÉCLOSIA — Registre d'Origine : 150 créatures peintes choisies parmi les planches du joueur (designs originaux). */
const GAL2 = [["b00", "Terrachide", "flore/roc", "tank"], ["b01", "Voltavis", "foudre/vent", "fast"], ["b02", "Aquaglyphe", "eau/esprit", "spec"], ["b03", "Pyrocorax", "feu/ombre", "phys"], ["b04", "Aérorid", "vent/esprit", "fast"], ["b05", "Mécanoïde", "acier/esprit", "tank"], ["b06", "Aquoanoïde", "acier/esprit", "bal"], ["b07", "Mécharox", "acier/esprit", "phys"], ["b10", "Tunchide", "flore/roc", "phys"], ["b11", "Valovis", "vent/ombre", "fast"], ["b12", "Mécanéon", "acier/esprit", "spec"], ["b13", "Shorid", "givre/esprit", "fast"], ["b14", "Mécharide", "eau/ombre", "tank"], ["b15", "Aqunoïde", "feu/ombre", "phys"], ["b16", "Varrenpide", "eau/esprit", "fast"], ["b17", "Sanonoïde", "roc/ombre", "phys"], ["e00", "Dryadra", "flore/dragon", "bal"], ["e01", "Pyrochléide", "feu/combat", "phys"], ["e02", "Aquavolt", "eau/foudre", "spec"], ["e03", "Ursatek", "acier/foudre", "tank"], ["e04", "Géonaute", "roc/esprit", "tank"], ["e05", "Éthérelle", "esprit/vent", "spec"], ["e06", "Chimèrevex", "normal/dragon", "phys"], ["e07", "Moussedos", "flore/roc", "tank"], ["e08", "Crânefer", "acier/ombre", "phys"], ["e09", "Valkyrios", "acier/vent", "fast"], ["e11", "Brasefauve", "feu/ombre", "phys"], ["e12", "Ondulisse", "eau/dragon", "fast"], ["e15", "Voilombre", "ombre/esprit", "spec"], ["e16", "Griffonuit", "ombre/combat", "phys"], ["e20", "Serpentin", "flore/toxine", "bal"], ["e21", "Nehrbe", "eau/toxine", "bal"], ["e22", "Tentaclys", "esprit/eau", "spec"], ["e23", "Moustek", "flore/acier", "phys"], ["e24", "Dorsemousse", "flore/ombre", "tank"], ["e25", "Sylphide", "vent/toxine", "fast"], ["e31", "Spiraldra", "roc/dragon", "bal"], ["e32", "Inseitanod", "ombre/vent", "fast"], ["e33", "Méduspectre", "esprit/toxine", "sptank"], ["e35", "Arachnor", "acier/ombre", "phys"], ["e36", "Abstinact", "esprit/ombre", "spec"], ["e40", "Cristortue", "eau/givre", "tank"], ["e42", "Hydrasylve", "flore/dragon", "phys"], ["e9a", "Givrolosse", "givre/combat", "phys"], ["e9b", "Chimérondine", "eau/dragon", "spec"], ["sa00", "Rochegéant", "roc", "tank"], ["sa01", "Glacigolem", "givre/roc", "tank"], ["sa02", "Lavagéant", "feu/roc", "phys"], ["sa03", "Moussegéant", "flore/roc", "tank"], ["sa04", "Azurvouivre", "dragon/vent", "fast"], ["sb00", "Sylvebois", "flore/roc", "bal"], ["sa10", "Jadebrute", "flore/combat", "phys"], ["sa11", "Ondinelle", "eau/esprit", "fast"], ["sa13", "Violoraptor", "ombre/toxine", "fast"], ["sa14", "Ambrefauve", "roc/feu", "phys"], ["sa21", "Cristape", "givre/combat", "phys"], ["sa24", "Plumegivre", "givre/vent", "spec"], ["sb20", "Étinçarde", "feu/esprit", "spec"], ["sb21", "Aquaserpe", "eau/dragon", "fast"], ["sa32", "Feuillerin", "flore/esprit", "spec"], ["sa34", "Rouillard", "roc/combat", "phys"], ["sb30", "Noirgolem", "ombre/roc", "tank"], ["sc00", "Argentrok", "acier/roc", "tank"], ["sc01", "Mousselet", "flore/roc", "bal"], ["sc02", "Vieilchêne", "flore/roc", "tank"], ["sc04", "Sylvivre", "flore/dragon", "spec"], ["sc10", "Ronceterne", "flore/ombre", "phys"], ["sc11", "Braiseroc", "feu/roc", "phys"], ["sc12", "Turquarbre", "flore/eau", "sptank"], ["sc13", "Pyrogobe", "flore/feu", "phys"], ["sc14", "Feuilvouivre", "flore/dragon", "fast"], ["sd11", "Bourgeline", "flore", "bal"], ["sc20", "Ombracier", "ombre/acier", "phys"], ["sc22", "Lamefeuille", "flore/combat", "fast"], ["sc24", "Nocturdrac", "ombre/dragon", "phys"], ["sd21", "Lézarmousse", "flore/normal", "fast"], ["sd0", "Tempestrion", "dragon/eau", "spec"], ["sd1", "Crépuscaile", "dragon/feu", "phys"], ["se10", "Pourprinet", "dragon/ombre", "bal"], ["se21", "Orvert", "dragon/flore", "bal"], ["c01", "Arachnobleu", "eau/ombre", "fast"], ["c02", "Rouagehibou", "acier/vent", "spec"], ["c04", "Aiglerude", "vent/normal", "phys"], ["c05", "Cristolithe", "roc/givre", "tank"], ["c08", "Lotichat", "flore/eau", "bal"], ["c09", "Félisarcelle", "eau/normal", "fast"], ["c11", "Hiboumarron", "vent/ombre", "fast"], ["c12", "Gardépine", "roc/acier", "tank"], ["c14", "Bronzotitan", "acier/combat", "phys"], ["c16", "Cristalion", "givre/roc", "phys"], ["c18", "Minoir", "ombre", "fast"], ["c21", "Araignac", "acier/toxine", "phys"], ["c24", "Givrotitan", "givre/combat", "tank"], ["c26", "Lionpierre", "roc/normal", "tank"], ["c28", "Lotusphinx", "flore/eau", "sptank"], ["c32", "Grifouine", "ombre/vent", "fast"], ["c33", "Phalénuit", "lumiere/vent", "spec"], ["c35", "Sablaile", "roc/vent", "fast"], ["c38", "Pantharuit", "ombre/combat", "fast"], ["c39", "Florlion", "eau/flore", "phys"], ["c43", "Ourspic", "roc/combat", "phys"], ["c44", "Orphalène", "lumiere/vent", "spec"], ["c48", "Nénuphoque", "eau/flore", "sptank"], ["c51", "Cristarbre", "givre/flore", "sptank"], ["c55", "Prismagivre", "givre", "spec"], ["c59", "Mosaïgre", "eau/ombre", "fast"], ["c75", "Blanclézard", "givre/normal", "fast"], ["c76", "Renardambre", "feu/normal", "fast"], ["c78", "Nymphélis", "eau/lumiere", "spec"], ["c85", "Hippocrin", "eau/dragon", "spec"], ["l02", "Verdégriffe", "flore/vent", "fast"], ["l04", "Mariwyrm", "eau/dragon", "bal"], ["l05", "Griffauve", "vent/normal", "phys"], ["l06", "Violouvre", "esprit/dragon", "spec"], ["l07", "Glaçonin", "givre/dragon", "spec"], ["l08", "Champicerf", "flore/esprit", "sptank"], ["l09", "Matounoir", "ombre/feu", "fast"], ["l12", "Rocailleux", "roc/acier", "tank"], ["l13", "Carapamousse", "flore/roc", "tank"], ["l15", "Glaçolosse", "givre/roc", "tank"], ["l18", "Griffazur", "vent/eau", "phys"], ["l20", "Brumegéant", "eau/combat", "phys"], ["l24", "Griffonoir", "ombre/vent", "phys"], ["l27", "Hupperaile", "vent/foudre", "fast"], ["l28", "Mycoméduse", "flore/esprit", "sptank"], ["l31", "Griffeneige", "givre/vent", "phys"], ["l33", "Lionpourpre", "ombre/combat", "phys"], ["l34", "Loupacier", "ombre/acier", "fast"], ["l36", "Yétigris", "givre/normal", "tank"], ["l38", "Sylvestre", "flore/combat", "bal"], ["r00", "Bourdonyx", "vent/toxine", "fast"], ["r01", "Hibounuit", "ombre/vent", "fast"], ["r04", "Neigeau", "givre/vent", "bal"], ["r05", "Libellune", "vent/esprit", "spec"], ["r08", "Serpentrelle", "flore/dragon", "fast"], ["r09", "Pieuvrine", "eau/esprit", "spec"], ["r11", "Aurolaile", "lumiere/vent", "spec"], ["r14", "Azurlin", "vent/eau", "fast"], ["r15", "Spectrelune", "esprit/eau", "spec"], ["r16", "Givrechine", "givre/esprit", "fast"], ["r17", "Sablézard", "roc/foudre", "fast"], ["r20", "Vaguéfauve", "eau/vent", "phys"], ["r21", "Rocserpent", "roc/dragon", "tank"], ["r23", "Dinofeuille", "flore/roc", "tank"], ["r24", "Trèflent", "flore/esprit", "sptank"], ["r26", "Cerfpourpre", "esprit/feu", "fast"], ["r27", "Orarmure", "acier/foudre", "phys"], ["r29", "Escargorne", "roc/eau", "tank"], ["r32", "Améthyroc", "roc/esprit", "spec"], ["r36", "Cervidrac", "dragon/normal", "fast"]];
const GAL2_FAMILIES = [["sd11", "sb00", "sc02"], ["sa04", "sd0"], ["se10", "sc24"], ["sc01", "sa03"], ["e20", "e21"], ["c18", "c38"], ["c08", "c28"], ["c09", "c39"], ["r04", "l31"], ["r14", "l18"], ["b06", "b05", "b07"], ["b00", "b10"]];
const GAL2_IDS = {};
(function buildGallery2() {
  const famOf = {}; GAL2_FAMILIES.forEach(f => f.forEach((c, i) => { famOf[c] = { f, i }; }));
  for (const [k] of GAL2) GAL2_IDS[k] = 'org_' + k;
  for (const [k, n, types, role] of GAL2) {
    const id = GAL2_IDS[k], fm = famOf[k];
    let stage = 'u', next = null, prev = null, evo = 0, line = id;
    if (fm) {
      const L = fm.f.length; stage = L === 2 ? (fm.i === 0 ? '1' : '2') : String(fm.i + 1);
      next = fm.i < L - 1 ? GAL2_IDS[fm.f[fm.i + 1]] : null; prev = fm.i ? GAL2_IDS[fm.f[fm.i - 1]] : null;
      evo = next ? (L === 2 ? 32 : fm.i === 0 ? 28 : 48) : 0; line = GAL2_IDS[fm.f[0]];
    }
    const bst = stage === 'u' ? 470 : stage === '1' ? 320 : stage === '2' ? (next ? 425 : 500) : 535;
    const r = rng(hashStr(id + ':stats')), w = ROLES[role].map(v => v * (0.9 + r() * 0.2)), sum = w.reduce((a, b) => a + b, 0);
    const s = { id, n, types: types.split('/'), stage, role, evo, plan: 'quad', desc: `${n}, une créature du Registre d'Origine.`, num: DEX.length + 1, line, next, prev, slow: false, img: 'img/gal2f/' + k + '.webp?v=3', gal: 2 };
    s.base = {}; STATK.forEach((kk, j) => { s.base[kk] = Math.max(20, Math.round(bst * w[j] / sum)); });
    s.bst = bst; s.yield = Math.round(bst * bst / 1600);
    s.rate = { '1': 170, '2': next ? 110 : 65, '3': 45, 'u': 70 }[stage];
    SP[id] = s; DEX.push(id);
  }
})();
// fiches du Codex
(function lore2() {
  const TRAIT = ['fier', 'curieux', 'calme', 'joueur', 'méfiant', 'loyal', 'solitaire', 'farouche'];
  const ORIG = [
    n => `${n} figure dans le Registre d'Origine, le grand catalogue que les expéditions de l'An 31 ont rapporté des terres sauvages au-delà de Brumaire.`,
    n => `Les premières observations de ${n} viennent des carnets d'une cartographe disparue. Ses croquis étaient si précis qu'on les a d'abord crus inventés.`,
    n => `${n} n'a été décrit qu'après la Germination. Les anciens disent pourtant qu'il existait avant, caché là où personne ne regardait.`,
  ];
  for (const k in GAL2_IDS) {
    const id = GAL2_IDS[k], s = SP[id], t1 = s.types[0], t2 = s.types[1], h = hashStr(id);
    const evo = s.next ? ` Il évolue en ${SP[s.next].n} vers le niveau ${s.evo}.` : s.prev ? ` C'est l'évolution de ${SP[s.prev].n}.` : '';
    DEX_LORE[id] = {
      h: `On le trouve dans ${GAL_HAB[t1]}${t2 ? `, et parfois dans ${GAL_HAB[t2]}` : ''}`,
      cm: 40 + (h % 170) + (s.stage === '3' ? 110 : 0), kg: Math.round((6 + (hashStr(id + 'k') % 140) + (s.stage === '3' ? 120 : 0)) * 10) / 10,
      p: [ORIG[h % 3](s.n) + evo,
        `Son type ${TN[t1]}${t2 ? ` et ${TN[t2]}` : ''} se voit au premier coup d'œil. On le dit ${TRAIT[h % 8]}, et il observe longtemps un dresseur avant de s'en approcher.`,
        `Le Registre note une chose étrange à son sujet : chaque spécimen observé semble se souvenir d'un endroit où il n'est jamais allé.`],
      soin: `Laissez-lui un coin à lui : les créatures du Registre ont besoin de repères fixes.`,
      cb: `En combat, misez sur son style ${({ phys: 'physique', spec: 'spécial', tank: 'défensif', sptank: 'endurant', fast: 'rapide', bal: 'équilibré' })[s.role]}.`,
      tem: `« Je pensais que ${s.n} n'était qu'un dessin du Registre. Puis il est sorti des hautes herbes. » — une randonneuse de Brumaire`,
    };
  }
})();
// répartition dans la nature
(function placeGallery2() {
  const routes = Object.keys(ROUTES).filter(r => ROUTES[r].enc && ROUTES[r].enc.grass && !ROUTES[r].cave && !/^(a|b|f|g|n|o)\d/.test(r) || ['g1', 'g3', 'g4', 'g6', 'o1', 'o3', 'o4', 'o6'].includes(r)).filter(r => ROUTES[r].enc && ROUTES[r].enc.grass);
  const bases = Object.values(GAL2_IDS).filter(id => !SP[id].prev);
  bases.forEach((id, i) => {
    const r = routes[(i * 11 + 3) % routes.length], G0 = ROUTES[r].enc.grass;
    const lo = Math.min(...G0.map(e => e[1])), hi = Math.max(...G0.map(e => e[2]));
    G0.push([evolveForLevel(id, lo), lo, hi, 6]);
  });
})();
setTimeout(() => { let i = 0; const ids = Object.values(GAL2_IDS); const tick = () => { for (let k = 0; k < 4 && i < ids.length; k++, i++) galImage(ids[i]); if (i < ids.length) setTimeout(tick, 500); }; tick(); }, 9000);
