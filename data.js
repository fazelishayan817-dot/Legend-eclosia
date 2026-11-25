'use strict';
/* ============================================================
   AWAKENING — données : types, capacités, créatures, objets
   ============================================================ */

// ---------- Aléatoire déterministe ----------
function rng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function ri(r, a, b) { return a + Math.floor(r() * (b - a + 1)); }
function pick(r, arr) { return arr[Math.floor(r() * arr.length)]; }
function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }

// ---------- Types ----------
const TYPES = ['normal', 'feu', 'eau', 'flore', 'foudre', 'roc', 'vent', 'givre', 'esprit', 'ombre', 'lumiere', 'toxine', 'acier', 'combat', 'dragon'];
const TN = { normal: 'Normal', feu: 'Feu', eau: 'Eau', flore: 'Flore', foudre: 'Foudre', roc: 'Roc', vent: 'Vent', givre: 'Givre', esprit: 'Esprit', ombre: 'Ombre', lumiere: 'Lumière', toxine: 'Toxine', acier: 'Acier', combat: 'Combat', dragon: 'Dragon', none: '???' };
const TC = { normal: '#b9ad8f', feu: '#ee7b3a', eau: '#4a8fe0', flore: '#58b35a', foudre: '#e9c43a', roc: '#a98557', vent: '#86b4e6', givre: '#8fd8ea', esprit: '#e46aa8', ombre: '#6c5b8e', lumiere: '#f1d77a', toxine: '#a35cc6', acier: '#94a3ad', combat: '#c4553e', dragon: '#6a63db', none: '#888888' };
const CHART = {
  normal: { h: [], r: ['roc', 'acier'], i: ['ombre'] },
  feu: { h: ['flore', 'givre', 'acier'], r: ['feu', 'eau', 'roc', 'dragon'], i: [] },
  eau: { h: ['feu', 'roc'], r: ['eau', 'flore', 'dragon'], i: [] },
  flore: { h: ['eau', 'roc'], r: ['feu', 'flore', 'vent', 'toxine', 'acier', 'dragon'], i: [] },
  foudre: { h: ['eau', 'vent'], r: ['foudre', 'flore', 'dragon'], i: ['roc'] },
  roc: { h: ['feu', 'foudre', 'givre', 'vent'], r: ['combat', 'acier'], i: [] },
  vent: { h: ['flore', 'combat'], r: ['foudre', 'roc', 'acier'], i: [] },
  givre: { h: ['flore', 'vent', 'dragon', 'roc'], r: ['feu', 'eau', 'givre', 'acier'], i: [] },
  esprit: { h: ['combat', 'toxine'], r: ['esprit', 'acier'], i: ['ombre'] },
  ombre: { h: ['esprit', 'ombre'], r: ['lumiere', 'combat'], i: ['normal'] },
  lumiere: { h: ['ombre', 'dragon', 'combat'], r: ['feu', 'toxine', 'acier'], i: [] },
  toxine: { h: ['flore', 'lumiere'], r: ['toxine', 'roc', 'ombre'], i: ['acier'] },
  acier: { h: ['givre', 'roc', 'lumiere'], r: ['feu', 'eau', 'foudre', 'acier'], i: [] },
  combat: { h: ['normal', 'givre', 'roc', 'acier', 'ombre'], r: ['vent', 'toxine', 'esprit', 'lumiere'], i: [] },
  dragon: { h: ['dragon'], r: ['acier'], i: ['lumiere'] },
};
function typeEff(atk, defTypes) {
  if (atk === 'none') return 1;
  let m = 1;
  const c = CHART[atk];
  for (const d of defTypes) {
    if (c.i.includes(d)) m *= 0;
    else if (c.h.includes(d)) m *= 2;
    else if (c.r.includes(d)) m *= 0.5;
  }
  return m;
}
function strongAgainst(def) { return TYPES.filter(t => typeEff(t, [def]) > 1); }

// ---------- Capacités ----------
// c: p = physique, s = spéciale, x = statut. ac 0 = ne rate jamais.
// fx: st/ch (statut + chance), foe/fch (stats adverses), self/sch (stats du lanceur), heal, drain, recoil, flinch, crit
const MOVES = {
  // Normal
  charge: { n: 'Charge', t: 'normal', c: 'p', pw: 40, ac: 100, pp: 35 },
  griffe: { n: 'Griffe', t: 'normal', c: 'p', pw: 40, ac: 100, pp: 35 },
  grondement: { n: 'Grondement', t: 'normal', c: 'x', ac: 100, pp: 40, fx: { foe: [['atk', -1]] } },
  regard: { n: 'Regard Dur', t: 'normal', c: 'x', ac: 100, pp: 30, fx: { foe: [['def', -1]] } },
  elan: { n: 'Élan', t: 'normal', c: 'p', pw: 40, ac: 100, pp: 30, pri: 1 },
  coupdetete: { n: 'Coup de Tête', t: 'normal', c: 'p', pw: 70, ac: 100, pp: 15, fx: { flinch: 30 } },
  ecrasement: { n: 'Écrasement', t: 'normal', c: 'p', pw: 85, ac: 100, pp: 15, fx: { st: 'par', ch: 30 } },
  assautfurieux: { n: 'Assaut Furieux', t: 'normal', c: 'p', pw: 100, ac: 100, pp: 15, fx: { recoil: 0.25 } },
  frappetotale: { n: 'Frappe Totale', t: 'normal', c: 's', pw: 130, ac: 85, pp: 5 },
  reposbref: { n: 'Repos Bref', t: 'normal', c: 'x', ac: 0, pp: 10, tgt: 'self', fx: { heal: 0.5 } },
  lutte: { n: 'Lutte', t: 'none', c: 'p', pw: 50, ac: 0, pp: 1, fx: { recoil: 0.25 } },
  // Feu
  braise: { n: 'Braise', t: 'feu', c: 's', pw: 40, ac: 100, pp: 25, fx: { st: 'brn', ch: 10 } },
  crocsbrulants: { n: 'Crocs Brûlants', t: 'feu', c: 'p', pw: 65, ac: 95, pp: 15, fx: { st: 'brn', ch: 10, flinch: 10 } },
  jetdebraise: { n: 'Jet de Braise', t: 'feu', c: 's', pw: 90, ac: 100, pp: 15, fx: { st: 'brn', ch: 10 } },
  fournaise: { n: 'Fournaise', t: 'feu', c: 's', pw: 110, ac: 85, pp: 5, fx: { st: 'brn', ch: 30 } },
  danseardente: { n: 'Danse Ardente', t: 'feu', c: 'x', ac: 0, pp: 20, tgt: 'self', fx: { self: [['spa', 1], ['spe', 1]] } },
  lueurbrulante: { n: 'Lueur Brûlante', t: 'feu', c: 'x', ac: 85, pp: 15, fx: { st: 'brn' } },
  // Eau
  bulles: { n: 'Bulles', t: 'eau', c: 's', pw: 40, ac: 100, pp: 30, fx: { foe: [['spe', -1]], fch: 10 } },
  jetdonde: { n: "Jet d'Onde", t: 'eau', c: 's', pw: 60, ac: 100, pp: 20 },
  vaguelourde: { n: 'Vague Lourde', t: 'eau', c: 'p', pw: 80, ac: 100, pp: 15, fx: { flinch: 20 } },
  torrent: { n: 'Torrent', t: 'eau', c: 's', pw: 110, ac: 80, pp: 5 },
  coquille: { n: 'Coquille', t: 'eau', c: 'x', ac: 0, pp: 40, tgt: 'self', fx: { self: [['def', 1]] } },
  sourcevive: { n: 'Source Vive', t: 'eau', c: 'x', ac: 0, pp: 10, tgt: 'self', fx: { heal: 0.5 } },
  // Flore
  fouetronce: { n: 'Fouet Ronce', t: 'flore', c: 'p', pw: 45, ac: 100, pp: 25 },
  sevedrain: { n: 'Sève Drain', t: 'flore', c: 's', pw: 50, ac: 100, pp: 15, fx: { drain: 0.5 } },
  feuillelame: { n: 'Feuille Lame', t: 'flore', c: 'p', pw: 60, ac: 95, pp: 25, fx: { crit: 1 } },
  grandsiphon: { n: 'Grand Siphon', t: 'flore', c: 's', pw: 75, ac: 100, pp: 10, fx: { drain: 0.5 } },
  rayonsylvestre: { n: 'Rayon Sylvestre', t: 'flore', c: 's', pw: 100, ac: 95, pp: 10 },
  poudresommeil: { n: 'Poudre Sommeil', t: 'flore', c: 'x', ac: 75, pp: 15, fx: { st: 'slp' } },
  sporesvenin: { n: 'Spores Vénéneuses', t: 'flore', c: 'x', ac: 90, pp: 20, fx: { st: 'psn' } },
  // Foudre
  etincelle: { n: 'Étincelle', t: 'foudre', c: 's', pw: 40, ac: 100, pp: 30, fx: { st: 'par', ch: 10 } },
  choc: { n: 'Choc', t: 'foudre', c: 'p', pw: 65, ac: 100, pp: 20, fx: { st: 'par', ch: 20 } },
  arcelectrique: { n: 'Arc Électrique', t: 'foudre', c: 's', pw: 90, ac: 100, pp: 15, fx: { st: 'par', ch: 10 } },
  foudreceleste: { n: 'Foudre Céleste', t: 'foudre', c: 's', pw: 110, ac: 70, pp: 10, fx: { st: 'par', ch: 30 } },
  ondestatique: { n: 'Onde Statique', t: 'foudre', c: 'x', ac: 90, pp: 20, fx: { st: 'par' } },
  recharge: { n: 'Recharge', t: 'foudre', c: 'x', ac: 0, pp: 20, tgt: 'self', fx: { self: [['spa', 1], ['spd', 1]] } },
  // Roc
  jetdepierres: { n: 'Jet de Pierres', t: 'roc', c: 'p', pw: 50, ac: 90, pp: 15 },
  avalanche: { n: 'Avalanche', t: 'roc', c: 'p', pw: 75, ac: 90, pp: 10, fx: { flinch: 30 } },
  fracas: { n: 'Fracas Tellurique', t: 'roc', c: 'p', pw: 100, ac: 100, pp: 10 },
  picrocheux: { n: 'Pic Rocheux', t: 'roc', c: 'p', pw: 100, ac: 80, pp: 5, fx: { crit: 1 } },
  durcissement: { n: 'Durcissement', t: 'roc', c: 'x', ac: 0, pp: 30, tgt: 'self', fx: { self: [['def', 1]] } },
  // Vent
  becvif: { n: 'Bec Vif', t: 'vent', c: 'p', pw: 35, ac: 100, pp: 35 },
  rafale: { n: 'Rafale', t: 'vent', c: 's', pw: 40, ac: 100, pp: 35 },
  ailetranchante: { n: 'Aile Tranchante', t: 'vent', c: 'p', pw: 60, ac: 100, pp: 35 },
  lamedevent: { n: 'Lame de Vent', t: 'vent', c: 's', pw: 75, ac: 95, pp: 15, fx: { flinch: 30 } },
  tornade: { n: 'Tornade', t: 'vent', c: 's', pw: 110, ac: 70, pp: 10 },
  ventarriere: { n: 'Vent Arrière', t: 'vent', c: 'x', ac: 0, pp: 30, tgt: 'self', fx: { self: [['spe', 2]] } },
  // Givre
  poudreuse: { n: 'Poudreuse', t: 'givre', c: 's', pw: 40, ac: 100, pp: 25, fx: { st: 'frz', ch: 10 } },
  crocsgivre: { n: 'Crocs Givre', t: 'givre', c: 'p', pw: 65, ac: 95, pp: 15, fx: { st: 'frz', ch: 10 } },
  rayongele: { n: 'Rayon Gelé', t: 'givre', c: 's', pw: 90, ac: 100, pp: 10, fx: { st: 'frz', ch: 10 } },
  tempeteblanche: { n: 'Tempête Blanche', t: 'givre', c: 's', pw: 110, ac: 70, pp: 5, fx: { st: 'frz', ch: 10 } },
  brumefroide: { n: 'Brume Froide', t: 'givre', c: 'x', ac: 95, pp: 20, fx: { foe: [['spe', -2]] } },
  // Esprit
  chocmental: { n: 'Choc Mental', t: 'esprit', c: 's', pw: 50, ac: 100, pp: 25 },
  ondepsy: { n: 'Onde Psychique', t: 'esprit', c: 's', pw: 65, ac: 100, pp: 20, fx: { foe: [['spd', -1]], fch: 10 } },
  espritpur: { n: 'Esprit Pur', t: 'esprit', c: 's', pw: 90, ac: 100, pp: 10, fx: { foe: [['spd', -1]], fch: 10 } },
  hypnose: { n: 'Hypnose', t: 'esprit', c: 'x', ac: 60, pp: 20, fx: { st: 'slp' } },
  meditation: { n: 'Méditation', t: 'esprit', c: 'x', ac: 0, pp: 20, tgt: 'self', fx: { self: [['spa', 1], ['spd', 1]] } },
  // Ombre
  morsure: { n: 'Morsure', t: 'ombre', c: 'p', pw: 60, ac: 100, pp: 25, fx: { flinch: 30 } },
  griffeombre: { n: 'Griffe Ombre', t: 'ombre', c: 'p', pw: 70, ac: 100, pp: 15, fx: { crit: 1 } },
  spheredombre: { n: "Sphère d'Ombre", t: 'ombre', c: 's', pw: 80, ac: 100, pp: 15, fx: { foe: [['spd', -1]], fch: 20 } },
  abimenoir: { n: 'Abîme Noir', t: 'ombre', c: 's', pw: 100, ac: 90, pp: 10 },
  regardsombre: { n: 'Regard Sombre', t: 'ombre', c: 'x', ac: 100, pp: 20, fx: { foe: [['spd', -2]] } },
  // Lumière
  eclat: { n: 'Éclat', t: 'lumiere', c: 's', pw: 40, ac: 100, pp: 30 },
  rayonaurore: { n: 'Rayon Aurore', t: 'lumiere', c: 's', pw: 65, ac: 100, pp: 20 },
  lamelumineuse: { n: 'Lame Lumineuse', t: 'lumiere', c: 'p', pw: 80, ac: 100, pp: 15, fx: { crit: 1 } },
  jugementsolaire: { n: 'Jugement Solaire', t: 'lumiere', c: 's', pw: 100, ac: 100, pp: 10 },
  lueurapaisante: { n: 'Lueur Apaisante', t: 'lumiere', c: 'x', ac: 0, pp: 10, tgt: 'self', fx: { heal: 0.5 } },
  eblouir: { n: 'Éblouir', t: 'lumiere', c: 'x', ac: 90, pp: 20, fx: { foe: [['atk', -1], ['spa', -1]] } },
  // Toxine
  dardvenin: { n: 'Dard Venin', t: 'toxine', c: 'p', pw: 40, ac: 100, pp: 35, fx: { st: 'psn', ch: 30 } },
  acide: { n: 'Acide', t: 'toxine', c: 's', pw: 50, ac: 100, pp: 30, fx: { foe: [['spd', -1]], fch: 10 } },
  bombeboue: { n: 'Bombe Boue', t: 'toxine', c: 's', pw: 90, ac: 100, pp: 10, fx: { st: 'psn', ch: 30 } },
  gaztoxique: { n: 'Gaz Toxique', t: 'toxine', c: 'x', ac: 90, pp: 40, fx: { st: 'psn' } },
  // Acier
  griffeacier: { n: 'Griffe Acier', t: 'acier', c: 'p', pw: 50, ac: 95, pp: 35, fx: { self: [['atk', 1]], sch: 10 } },
  tetedefer: { n: 'Tête de Fer', t: 'acier', c: 'p', pw: 80, ac: 100, pp: 15, fx: { flinch: 30 } },
  canonmetal: { n: 'Canon Métal', t: 'acier', c: 's', pw: 100, ac: 95, pp: 10, fx: { foe: [['spd', -1]], fch: 10 } },
  murdefer: { n: 'Mur de Fer', t: 'acier', c: 'x', ac: 0, pp: 15, tgt: 'self', fx: { self: [['def', 2]] } },
  // Combat
  poingrapide: { n: 'Poing Rapide', t: 'combat', c: 'p', pw: 40, ac: 100, pp: 30, pri: 1 },
  doublepied: { n: 'Double Pied', t: 'combat', c: 'p', pw: 60, ac: 100, pp: 30 },
  frappecroisee: { n: 'Frappe Croisée', t: 'combat', c: 'p', pw: 85, ac: 90, pp: 10, fx: { crit: 1 } },
  assauttotal: { n: 'Assaut Total', t: 'combat', c: 'p', pw: 120, ac: 100, pp: 5, fx: { self: [['def', -1], ['spd', -1]] } },
  concentration: { n: 'Concentration', t: 'combat', c: 'x', ac: 0, pp: 20, tgt: 'self', fx: { self: [['atk', 2]] } },
  // Dragon
  souffledraco: { n: 'Souffle Draco', t: 'dragon', c: 's', pw: 60, ac: 100, pp: 20, fx: { st: 'par', ch: 30 } },
  griffedraco: { n: 'Griffe Draco', t: 'dragon', c: 'p', pw: 80, ac: 100, pp: 15 },
  cometedraconique: { n: 'Comète Draconique', t: 'dragon', c: 's', pw: 120, ac: 90, pp: 5, fx: { self: [['spa', -2]] } },
  dansedraco: { n: 'Danse Draco', t: 'dragon', c: 'x', ac: 0, pp: 20, tgt: 'self', fx: { self: [['atk', 1], ['spe', 1]] } },
};
for (const k in MOVES) MOVES[k].id = k;
const CAT_NAME = { p: 'Physique', s: 'Spéciale', x: 'Statut' };

// ---------- Créatures ----------
// id, nom, types, stade (1/2/3/u=unique/P=pseudo/L=légende/M=mythe), rôle, niveau d'évolution vers la suivante, silhouette, description
const SPECIES_LIST = [
  ['feuillon', 'Capousse', 'flore', '1', 'bal', 16, 'quad', "Calme et têtu, il fait pousser des fleurs partout où il s'endort."],
  ['sylvorn', 'Capoforêt', 'flore/roc', '2', 'bal', 34, 'quad', "Une couronne de feuilles pousse sur son crâne. Il protège les jeunes Éclos."],
  ['arbrasaure', 'Sylvérable', 'flore/roc', '3', 'tank', 0, 'quad', "On dit qu'une graine de la Graine-Monde dort dans sa couronne."],
  ['brasille', 'Cendrolin', 'feu', '1', 'phys', 16, 'biped', "Ses écailles brûlantes rougeoient. Quand il a peur, il se roule en boule de braise."],
  ['fournex', 'Pyrécaille', 'feu', '2', 'phys', 36, 'biped', "Ses épines de braise crépitent quand il est prêt à se battre."],
  ['volcanthe', 'Volcandre', 'feu/roc', '3', 'phys', 0, 'biped', "Né la nuit de la Germination, au pied d'un volcan. Il ne craint rien."],
  ['clapotin', 'Narvalou', 'eau', '1', 'spec', 16, 'blob', "Sa corne en spirale sent les courants marins à des kilomètres."],
  ['marevor', 'Narvaléon', 'eau/givre', '2', 'spec', 36, 'fish', "Il guide les navires perdus à travers les brumes."],
  ['abyssard', 'Abyssorne', 'eau/givre', '3', 'spec', 0, 'serpent', "Il a vu la mer se soulever. Il garde les côtes depuis ce jour."],
  ['piouly', 'Piouly', 'normal/vent', '1', 'fast', 14, 'bird', "Il réveille tout le village à l'aube, sans exception."],
  ['ventrelle', 'Ventrelle', 'normal/vent', '2', 'fast', 32, 'bird', "Il plane des heures sans battre des ailes."],
  ['cieloraptor', 'Cieloraptor', 'normal/vent', '3', 'fast', 0, 'bird', "Il fond sur sa proie depuis les nuages."],
  ['rongeot', 'Rongeot', 'normal', '1', 'fast', 18, 'quad', "Il ronge tout ce qui traîne. Même les panneaux."],
  ['rongemaitre', 'Rongemaître', 'normal', '2', 'phys', 0, 'quad', "Ses incisives ne s'arrêtent jamais de pousser."],
  ['larvelin', 'Larvelin', 'flore', '1', 'bal', 7, 'bug', "Il mange trois fois son poids en feuilles chaque jour."],
  ['cocoride', 'Cocoride', 'flore/acier', '2', 'tank', 12, 'bug', "Sa coque est plus dure que l'acier. Il attend."],
  ['papiluxe', 'Papiluxe', 'vent/lumiere', '3', 'spec', 0, 'bug', "La poudre de ses ailes brille dans le noir."],
  ['mousseron', 'Mousseron', 'flore/toxine', '1', 'tank', 24, 'blob', "Il se cache parmi les champignons de la forêt."],
  ['champitox', 'Champitox', 'flore/toxine', '2', 'sptank', 0, 'blob', "Ses spores endorment ceux qui l'approchent."],
  ['etincelot', 'Étincelot', 'foudre', '1', 'fast', 22, 'quad', "Il charge sa fourrure en se frottant contre l'écorce des arbres."],
  ['voltigre', 'Voltigre', 'foudre', '2', 'fast', 0, 'quad', "Ses rayures s'illuminent avant chaque bond."],
  ['galet', 'Galet', 'roc', '1', 'tank', 25, 'blob', "On le confond souvent avec une pierre de rivière."],
  ['rochelourd', 'Rochelourd', 'roc', '2', 'tank', 40, 'biped', "Il roule le long des pentes pour se déplacer."],
  ['montagrok', 'Montagrok', 'roc/acier', '3', 'tank', 0, 'biped', "Sa carapace contient des veines de métal pur."],
  ['mareluche', 'Mareluche', 'eau', '1', 'bal', 20, 'blob', "Il saute de nénuphar en nénuphar toute la journée."],
  ['ranaqua', 'Ranaqua', 'eau/combat', '2', 'phys', 0, 'biped', "Il nage à contre-courant pour forger ses muscles."],
  ['lucibulle', 'Lucibulle', 'lumiere', '1', 'spec', 26, 'blob', "Il flotte la nuit comme une petite lanterne."],
  ['aurelys', 'Aurélys', 'lumiere/esprit', '2', 'spec', 0, 'biped', "Sa lumière apaise les esprits troublés."],
  ['ombrelin', 'Ombrelin', 'ombre', '1', 'spec', 27, 'blob', "Il se glisse dans l'ombre des passants."],
  ['spectrombre', 'Spectrombre', 'ombre/esprit', '2', 'spec', 0, 'serpent', "Il apparaît dans les miroirs à minuit."],
  ['boxillon', 'Boxillon', 'combat', '1', 'phys', 28, 'biped', "Il s'entraîne sans relâche contre les troncs."],
  ['pugilarque', 'Pugilarque', 'combat', '2', 'phys', 0, 'biped', "Un seul de ses coups peut fendre un rocher."],
  ['vipereau', 'Vipéreau', 'toxine', '1', 'phys', 22, 'serpent', "Il mord tout ce qui bouge, même son reflet."],
  ['cobracre', 'Cobrâcre', 'toxine/ombre', '2', 'phys', 0, 'serpent', "Son venin change de couleur selon sa colère."],
  ['taupiron', 'Taupiron', 'roc/acier', '1', 'phys', 26, 'quad', "Il creuse des galeries avec ses griffes de métal."],
  ['foretaupe', 'Forétaupe', 'roc/acier', '2', 'phys', 0, 'quad', "Il traverse une montagne en une seule nuit."],
  ['flocinel', 'Flocinel', 'givre', '1', 'spec', 30, 'blob', "Il naît des premiers flocons de l'hiver."],
  ['glaciarde', 'Glaciarde', 'givre/lumiere', '2', 'spec', 0, 'biped', "Elle danse sur la glace sous les aurores."],
  ['songeot', 'Songeot', 'esprit', '1', 'spec', 25, 'quad', "Il rêve éveillé et voit parfois l'avenir."],
  ['revemage', 'Rêvemage', 'esprit', '2', 'spec', 0, 'biped', "Il peut entrer dans les rêves des autres."],
  ['pincelot', 'Pincelot', 'eau/roc', '1', 'tank', 28, 'bug', "Ses pinces brisent les coquillages."],
  ['carapinc', 'Carapinc', 'eau/roc', '2', 'tank', 0, 'bug', "Sa carapace résiste aux vagues les plus fortes."],
  ['abeillon', 'Abeillon', 'vent/toxine', '1', 'fast', 20, 'bug', "Il butine en groupe et défend sa ruche."],
  ['reinapic', 'Reinapic', 'vent/toxine', '2', 'fast', 0, 'bug', "Elle commande un essaim de mille Abeillon."],
  ['laineclair', 'Laineclair', 'foudre', '1', 'bal', 15, 'quad', "Sa laine se charge d'électricité au moindre frottement."],
  ['ovinvolt', 'Ovinvolt', 'foudre', '2', 'bal', 30, 'quad', "Ses cornes crépitent par temps d'orage."],
  ['belitonnerre', 'Bélitonnerre', 'foudre/normal', '3', 'spec', 0, 'quad', "Il appelle la foudre d'un coup de corne."],
  ['dracolin', 'Dracolin', 'dragon', '1', 'bal', 30, 'serpent', "Il ne se montre qu'aux dresseurs patients."],
  ['draconelle', 'Draconelle', 'dragon', '2', 'bal', 55, 'serpent', "On dit qu'il contrôle la météo d'une vallée entière."],
  ['draconyx', 'Draconyx', 'dragon/vent', 'P', 'phys', 0, 'biped', "Il fait le tour de la région en une heure."],
  ['noctelle', 'Noctelle', 'ombre/vent', '1', 'fast', 24, 'bug', "Elle ne vole qu'à la lumière de la lune."],
  ['nyctaile', 'Nyctaile', 'ombre/vent', '2', 'fast', 0, 'bird', "Son vol silencieux surprend même les hiboux."],
  ['corailette', 'Corailette', 'eau/lumiere', 'u', 'sptank', 0, 'blob', "Elle brille au fond des lagons."],
  ['cliquetan', 'Cliquetan', 'acier', '1', 'tank', 30, 'blob', "Ses engrenages tournent en cliquetant."],
  ['engrenor', 'Engrenor', 'acier', '2', 'tank', 0, 'biped', "Il répare lui-même ses rouages usés."],
  ['felinuit', 'Félinuit', 'ombre', '1', 'fast', 28, 'quad', "Il chasse en silence, les yeux brillants."],
  ['pantharcane', 'Pantharcane', 'ombre/combat', '2', 'phys', 0, 'quad', "Il frappe depuis l'ombre sans un bruit."],
  ['gelapin', 'Gelapin', 'givre/normal', '1', 'fast', 26, 'quad', "Ses oreilles gèlent l'air autour de lui."],
  ['lievrigel', 'Lièvrigel', 'givre/combat', '2', 'phys', 0, 'biped', "Il bondit sur la neige sans laisser de traces."],
  ['taurignis', 'Taurignis', 'feu/normal', 'u', 'phys', 0, 'quad', "Il charge tête baissée, les cornes en flammes."],
  ['cendrelle', 'Cendrelle', 'feu/vent', '1', 'spec', 30, 'bird', "Ses plumes laissent une traînée de cendres."],
  ['phenixel', 'Phénixel', 'feu/vent', '2', 'spec', 0, 'bird', "On le dit capable de renaître de ses braises."],
  ['tortumousse', 'Tortumousse', 'flore/eau', '1', 'tank', 32, 'quad', "De la mousse pousse sur sa carapace humide."],
  ['archipelone', 'Archipélone', 'flore/eau', '2', 'tank', 0, 'quad', "On a déjà pris son dos pour une île."],
  ['meduvenin', 'Méduvenin', 'eau/toxine', '1', 'sptank', 30, 'blob', "Ses filaments piquent même hors de l'eau."],
  ['medusoraire', 'Médusoraire', 'eau/toxine', '2', 'sptank', 0, 'blob', "Des bancs entiers fuient à son passage."],
  ['statuon', 'Statuon', 'roc/esprit', 'u', 'sptank', 0, 'biped', "Il garde des ruines depuis mille ans."],
  ['arcfoudre', 'Arcfoudre', 'foudre/acier', 'u', 'spec', 0, 'bird', "Il se recharge sur les pylônes en altitude."],
  ['racinol', 'Racinol', 'flore/ombre', '1', 'bal', 30, 'blob', "Il chuchote la nuit sous les vieux arbres."],
  ['mandracine', 'Mandracine', 'flore/ombre', '2', 'spec', 0, 'biped', "Son cri fait faner les fleurs alentour."],
  ['louvaube', 'Louvaube', 'combat/lumiere', '1', 'phys', 32, 'quad', "Il hurle au lever du soleil, jamais à la lune."],
  ['lupaladin', 'Lupaladin', 'combat/lumiere', '2', 'phys', 0, 'biped', "Il protège les voyageurs perdus."],
  ['chouettine', 'Chouettine', 'esprit/vent', '1', 'spec', 20, 'bird', "Elle tourne la tête pour lire les pensées."],
  ['noctelys', 'Noctélys', 'esprit/vent', '2', 'spec', 0, 'bird', "Elle veille sur les forêts endormies."],
  ['banquiseau', 'Banquiseau', 'givre/eau', '1', 'bal', 32, 'bird', "Il glisse sur le ventre pour aller plus vite."],
  ['empereglace', 'Empereglace', 'givre/eau', '2', 'tank', 0, 'bird', "Il règne sur les banquises du nord."],
  ['scarabronze', 'Scarabronze', 'acier/flore', 'u', 'phys', 0, 'bug', "Sa carapace de bronze sonne comme une cloche."],
  ['brumelin', 'Brumelin', 'ombre/givre', 'u', 'spec', 0, 'blob', "Il apparaît dans la brume des matins d'hiver."],
  ['lavarelle', 'Lavarelle', 'feu/roc', '1', 'tank', 38, 'serpent', "Elle se baigne dans la lave tiède."],
  ['magmorne', 'Magmorne', 'feu/roc', '2', 'phys', 0, 'quad', "Son dos fume comme un volcan endormi."],
  ['dunelot', 'Dunelot', 'roc', '1', 'bal', 34, 'blob', "Il se cache sous le sable chaud."],
  ['sablarque', 'Sablarque', 'roc/dragon', '2', 'phys', 0, 'serpent', "Il soulève des tempêtes de sable en ondulant."],
  ['wyvernel', 'Wyvernel', 'dragon/feu', '1', 'phys', 35, 'bird', "Il s'exerce à cracher du feu sur les falaises."],
  ['ignivern', 'Ignivern', 'dragon/feu', '2', 'phys', 0, 'bird', "Ses ailes chauffent l'air au point de le faire trembler."],
  ['cervaube', 'Cervaube', 'lumiere/flore', 'u', 'sptank', 0, 'quad', "Des fleurs s'ouvrent sur son passage."],
  ['mimicoffre', 'Mimicoffre', 'acier/ombre', 'u', 'phys', 0, 'blob', "Il imite un coffre au trésor pour piéger les curieux."],
  ['baleinon', 'Baleinon', 'eau', 'u', 'tank', 0, 'fish', "Son chant porte à travers tout l'océan."],
  ['chimerion', 'Chimérion', 'normal', 'u', 'bal', 0, 'quad', "Il possède les traits de plusieurs créatures."],
  ['cervolant', 'Cervolant', 'vent', 'u', 'fast', 0, 'bird', "Un cerf-volant vivant. Il ne se pose que quand le vent tombe."],
  ['taupiquet', 'Taupiquet', 'roc', 'u', 'tank', 0, 'quad', "Sa foreuse creuse des tunnels sous les champs d'Éclosia."],
  ['petalimace', 'Pétalimace', 'flore', 'u', 'sptank', 0, 'serpent', "Elle laisse derrière elle une traînée de pétales."],
  ['champignard', 'Champignard', 'flore/ombre', 'u', 'sptank', 0, 'blob', "Il pousse la nuit, au pied des racines de la Graine."],
  ['magmoule', 'Magmoule', 'feu/roc', 'u', 'tank', 0, 'blob', "Sa coquille garde la lave tiède pendant des jours."],
  ['coraline', 'Coraline', 'eau/roc', 'u', 'phys', 0, 'bug', "Ses pinces de corail repoussent quand elles cassent."],
  ['brasaile', 'Brasaile', 'feu/vent', 'u', 'fast', 0, 'bird', "Sa crête s'enflamme quand elle plonge en piqué."],
  ['galetin', 'Galetin', 'roc', 'u', 'tank', 0, 'blob', "Il se fond dans les galets des rivières."],
  ['frimousse', 'Frimousse', 'givre', 'u', 'fast', 0, 'quad', "Sa couronne de givre fond quand on la câline."],
  ['givrelame', 'Givrelame', 'givre/roc', 'u', 'phys', 0, 'bug', "Sa corne de glace tranche la banquise."],
  ['lanterneau', 'Lanterneau', 'lumiere/feu', 'u', 'spec', 0, 'blob', "On l'accroche aux fenêtres les soirs de fête."],
  ['encrelot', 'Encrelot', 'ombre', 'u', 'fast', 0, 'quad', "Il laisse des traces d'encre là où il a eu peur."],
  ['rubanelle', 'Rubanelle', 'vent/lumiere', 'u', 'spec', 0, 'bug', "Elle danse dans les rues de Valmont au crépuscule."],
  ['horlogon', 'Horlogon', 'foudre/acier', 'u', 'tank', 0, 'bug', "Son engrenage bat la seconde. Il n'est jamais en retard."],
  ['zapillon', 'Zapillon', 'foudre/vent', 'u', 'fast', 0, 'bird', "Il attire les orages en battant des ailes."],
  ['surfouine', 'Surfouine', 'eau/givre', 'u', 'fast', 0, 'quad', "Elle surfe sur les vagues des Îles Soleil."],
  ['voltacoco', 'Voltacoco', 'foudre/flore', 'u', 'tank', 0, 'blob', "Il tombe des palmiers en plein orage."],
  ['ronceloup', 'Ronceloup', 'ombre/flore', '1', 'phys', 45, 'quad', "Le chien de garde de l'Ordre Racine. Ses épines piquent dans le noir."],
  ['epineant', 'Épinéant', 'ombre/roc', '2', 'phys', 0, 'quad', "Le compagnon de Maître Ronce. Il ne pardonne rien."],
  ['feuillonq', 'Feuillon', 'flore', '1', 'tank', 16, 'quad', "Il se nourrit de lumière et de rosée."],
  ['sylvarbre', 'Sylvarbre', 'flore', '2', 'tank', 34, 'bug', "Il se nourrit de lumière et de rosée."],
  ['chenegard', 'Chênegard', 'flore/roc', '3', 'tank', 0, 'quad', "Il se nourrit de lumière et de rosée."],
  ['braisette', 'Braisette', 'feu', '1', 'phys', 16, 'biped', "Il dort roulé en boule près des braises."],
  ['flambrume', 'Flambrume', 'feu', '2', 'phys', 34, 'serpent', "Il dort roulé en boule près des braises."],
  ['pyrolion', 'Pyrolion', 'feu/combat', '3', 'phys', 0, 'quad', "Sa queue rougeoie quand il est content."],
  ['ondelin', 'Ondelin', 'eau', '1', 'bal', 16, 'fish', "On l'entend chanter les soirs de pluie."],
  ['marevan', 'Marévan', 'eau', '2', 'bal', 34, 'fish', "Il nage à contre-courant pour se muscler."],
  ['abyssardq', 'Abyssard', 'eau/givre', '3', 'bal', 0, 'fish', "On l'entend chanter les soirs de pluie."],
  ['piouli', 'Piouli', 'normal/vent', '1', 'fast', 18, 'bird', "Il s'adapte à tous les terrains."],
  ['ventaile', 'Ventaile', 'normal/vent', '2', 'fast', 0, 'bird', "Il s'adapte à tous les terrains."],
  ['chenillou', 'Chenillou', 'flore', '1', 'tank', 7, 'biped', "Des feuilles poussent sur son dos au printemps."],
  ['cocoffre', 'Cocoffre', 'flore', '2', 'tank', 12, 'blob', "Des feuilles poussent sur son dos au printemps."],
  ['papillune', 'Papillune', 'flore/vent', '3', 'fast', 0, 'bird', "Il se nourrit de lumière et de rosée."],
  ['mousseau', 'Mousseau', 'flore', '1', 'bal', 22, 'quad', "Il se nourrit de lumière et de rosée."],
  ['mousserond', 'Mousserond', 'flore/ombre', '2', 'bal', 0, 'biped', "Des feuilles poussent sur son dos au printemps."],
  ['lucioli', 'Lucioli', 'flore/foudre', 'u', 'fast', 0, 'biped', "Des feuilles poussent sur son dos au printemps."],
  ['terrier', 'Terrier', 'roc', '1', 'phys', 24, 'serpent', "Il dort des semaines sans bouger."],
  ['taupelin', 'Taupelin', 'roc/acier', '2', 'phys', 0, 'bug', "Sa carapace porte les traces de mille chutes."],
  ['crabulle', 'Crabulle', 'eau', '1', 'tank', 28, 'fish', "Il nage à contre-courant pour se muscler."],
  ['pincecrabe', 'Pincecrabe', 'eau/acier', '2', 'phys', 0, 'fish', "Il nage à contre-courant pour se muscler."],
  ['mouettine', 'Mouettine', 'eau/vent', 'u', 'fast', 0, 'bird', "Il nage à contre-courant pour se muscler."],
  ['braisillon', 'Braisillon', 'feu', '1', 'phys', 30, 'bug', "Il dort roulé en boule près des braises."],
  ['magmor', 'Magmor', 'feu/roc', '2', 'tank', 0, 'biped', "Il dort roulé en boule près des braises."],
  ['coralin', 'Coralin', 'eau/roc', 'u', 'tank', 0, 'fish', "Il nage à contre-courant pour se muscler."],
  ['meduzen', 'Méduzen', 'eau/ombre', 'u', 'bal', 0, 'fish', "Il nage à contre-courant pour se muscler."],
  ['palmio', 'Palmio', 'flore/vent', 'u', 'fast', 0, 'bird', "Il se nourrit de lumière et de rosée."],
  ['volticot', 'Volticot', 'foudre', '1', 'fast', 32, 'blob', "Ses poils crépitent avant l'orage."],
  ['tesladon', 'Tesladon', 'foudre', '2', 'phys', 0, 'biped', "Ses poils crépitent avant l'orage."],
  ['sablard', 'Sablard', 'roc', '1', 'phys', 34, 'blob', "Il dort des semaines sans bouger."],
  ['dunarok', 'Dunarok', 'roc', '2', 'phys', 0, 'bug', "Sa carapace porte les traces de mille chutes."],
  ['spectrolle', 'Spectrolle', 'ombre', '1', 'fast', 36, 'serpent', "On le reconnaît à ses yeux brillants dans le noir."],
  ['fantorbe', 'Fantorbe', 'ombre/feu', '2', 'phys', 0, 'blob', "On le reconnaît à ses yeux brillants dans le noir."],
  ['givrinou', 'Givrinou', 'givre', '1', 'bal', 40, 'biped', "Il ne vit que là où la neige ne fond jamais."],
  ['blizzaure', 'Blizzaure', 'givre/vent', '2', 'fast', 0, 'bird', "Son souffle givre les vitres en plein été."],
  ['combattor', 'Combattor', 'combat', '1', 'phys', 40, 'bug', "Il salue toujours son adversaire avant un combat."],
  ['karatour', 'Karatour', 'combat', '2', 'phys', 0, 'biped', "Il salue toujours son adversaire avant un combat."],
  ['yetiou', 'Yetiou', 'givre/combat', 'u', 'phys', 0, 'bug', "Il ne vit que là où la neige ne fond jamais."],
  ['aiglace', 'Aiglace', 'givre/vent', 'u', 'fast', 0, 'bird', "Son souffle givre les vitres en plein été."],
  ['corapince', 'Corapince', 'eau/roc', 'u', 'phys', 0, 'fish', "Il nage à contre-courant pour se muscler."],
  ['grillou', 'Grillou', 'flore', '1', 'fast', 10, 'bug', "Il se nourrit de lumière et de rosée."],
  ['grillardon', 'Grillardon', 'flore', '2', 'fast', 30, 'serpent', "Il se nourrit de lumière et de rosée."],
  ['grillamor', 'Grillamor', 'flore', '3', 'fast', 0, 'blob', "Des feuilles poussent sur son dos au printemps."],
  ['pommelet', 'Pommelet', 'flore', '1', 'bal', 18, 'quad', "Des feuilles poussent sur son dos au printemps."],
  ['pommerain', 'Pommerain', 'flore', '2', 'bal', 0, 'biped', "Il se nourrit de lumière et de rosée."],
  ['lapissou', 'Lapissou', 'normal', '1', 'fast', 20, 'serpent', "Il s'adapte à tous les terrains."],
  ['lapivent', 'Lapivent', 'normal', '2', 'fast', 0, 'quad', "Curieux, il suit les dresseurs sur des kilomètres."],
  ['fourmiton', 'Fourmiton', 'flore/roc', '1', 'tank', 22, 'serpent', "Des feuilles poussent sur son dos au printemps."],
  ['fourmarque', 'Fourmarque', 'flore/roc', '2', 'tank', 0, 'serpent', "Des feuilles poussent sur son dos au printemps."],
  ['hiboulin', 'Hiboulin', 'normal/vent', '1', 'fast', 14, 'bird', "Il s'adapte à tous les terrains."],
  ['hiboulune', 'Hiboulune', 'normal/vent', '2', 'fast', 32, 'bird', "Curieux, il suit les dresseurs sur des kilomètres."],
  ['hibouleon', 'Hibouléon', 'normal/vent', '3', 'fast', 0, 'bird', "Curieux, il suit les dresseurs sur des kilomètres."],
  ['treflet', 'Trèflet', 'flore', 'u', 'bal', 0, 'blob', "Des feuilles poussent sur son dos au printemps."],
  ['bourdonix', 'Bourdonix', 'flore/foudre', '1', 'phys', 24, 'bug', "Il se nourrit de lumière et de rosée."],
  ['bourdoral', 'Bourdoral', 'flore/foudre', '2', 'phys', 0, 'serpent', "Il se nourrit de lumière et de rosée."],
  ['coquelime', 'Coquelime', 'flore/roc', '1', 'tank', 25, 'blob', "Il se nourrit de lumière et de rosée."],
  ['coquelorme', 'Coquelorme', 'flore/roc', '2', 'tank', 0, 'blob', "Il se nourrit de lumière et de rosée."],
  ['mulotte', 'Mulotte', 'normal', '1', 'phys', 16, 'biped', "Il s'adapte à tous les terrains."],
  ['mulobrave', 'Mulobrave', 'normal', '2', 'phys', 0, 'biped', "Curieux, il suit les dresseurs sur des kilomètres."],
  ['brindille', 'Brindille', 'flore/vent', 'u', 'fast', 0, 'bird', "Des feuilles poussent sur son dos au printemps."],
  ['pucerin', 'Pucerin', 'flore', '1', 'fast', 12, 'biped', "Il se nourrit de lumière et de rosée."],
  ['pucerage', 'Pucerage', 'flore', '2', 'fast', 0, 'blob', "Il se nourrit de lumière et de rosée."],
  ['noisetou', 'Noisetou', 'normal/flore', '1', 'fast', 18, 'bug', "Il s'adapte à tous les terrains."],
  ['noisetor', 'Noisetor', 'normal/flore', '2', 'fast', 0, 'biped', "Curieux, il suit les dresseurs sur des kilomètres."],
  ['gyrinou', 'Gyrinou', 'eau', '1', 'bal', 15, 'fish', "On l'entend chanter les soirs de pluie."],
  ['grenouillard', 'Grenouillard', 'eau', '2', 'bal', 36, 'fish', "Il nage à contre-courant pour se muscler."],
  ['crapaudor', 'Crapaudor', 'eau', '3', 'bal', 0, 'fish', "On l'entend chanter les soirs de pluie."],
  ['crevetin', 'Crevetin', 'eau', '1', 'phys', 30, 'fish', "Il nage à contre-courant pour se muscler."],
  ['crevettor', 'Crevettor', 'eau', '2', 'phys', 0, 'fish', "Il nage à contre-courant pour se muscler."],
  ['bigornot', 'Bigornot', 'eau/roc', '1', 'tank', 24, 'fish', "Il nage à contre-courant pour se muscler."],
  ['bigornard', 'Bigornard', 'eau/roc', '2', 'tank', 40, 'fish', "Il nage à contre-courant pour se muscler."],
  ['bigornax', 'Bigornax', 'eau/roc', '3', 'tank', 0, 'fish', "Il nage à contre-courant pour se muscler."],
  ['meduline', 'Méduline', 'eau/foudre', 'u', 'fast', 0, 'fish', "On l'entend chanter les soirs de pluie."],
  ['lezardune', 'Lézardune', 'feu/roc', '1', 'phys', 32, 'quad', "Sa queue rougeoie quand il est content."],
  ['lezardor', 'Lézardor', 'feu/roc', '2', 'phys', 0, 'blob', "Il dort roulé en boule près des braises."],
  ['pelicot', 'Pélicot', 'eau/vent', '1', 'fast', 30, 'bird', "Il nage à contre-courant pour se muscler."],
  ['pelicampe', 'Pélicampe', 'eau/vent', '2', 'fast', 0, 'bird', "Il nage à contre-courant pour se muscler."],
  ['tortulave', 'Tortulave', 'feu/roc', '1', 'tank', 34, 'biped', "Sa queue rougeoie quand il est content."],
  ['tortumagma', 'Tortumagma', 'feu/roc', '2', 'tank', 0, 'blob', "Il dort roulé en boule près des braises."],
  ['algueline', 'Algueline', 'eau/flore', '1', 'bal', 30, 'fish', "Il nage à contre-courant pour se muscler."],
  ['alguemere', 'Alguemère', 'eau/flore', '2', 'bal', 0, 'fish', "Il nage à contre-courant pour se muscler."],
  ['sablotin', 'Sablotin', 'roc', 'u', 'tank', 0, 'serpent', "Sa carapace porte les traces de mille chutes."],
  ['hippocorne', 'Hippocorne', 'eau', '1', 'fast', 28, 'fish', "On l'entend chanter les soirs de pluie."],
  ['hippocean', 'Hippocéan', 'eau', '2', 'fast', 0, 'fish', "On l'entend chanter les soirs de pluie."],
  ['fumerolle', 'Fumerolle', 'feu/ombre', 'u', 'bal', 0, 'bug', "Il dort roulé en boule près des braises."],
  ['nacrelle', 'Nacrelle', 'eau/lumiere', '1', 'bal', 34, 'fish', "Il nage à contre-courant pour se muscler."],
  ['nacrelune', 'Nacrelune', 'eau/lumiere', '2', 'bal', 0, 'fish', "On l'entend chanter les soirs de pluie."],
  ['vesperou', 'Vespérou', 'vent/ombre', '1', 'fast', 26, 'bird', "Il suit les courants d'air chaud au-dessus des falaises."],
  ['vesperal', 'Vespéral', 'vent/ombre', '2', 'fast', 0, 'bird', "Il plane des heures sans battre des ailes."],
  ['oursinou', 'Oursinou', 'eau/acier', '1', 'tank', 32, 'fish', "Il nage à contre-courant pour se muscler."],
  ['oursinax', 'Oursinax', 'eau/acier', '2', 'tank', 0, 'fish', "On l'entend chanter les soirs de pluie."],
  ['fossilou', 'Fossilou', 'roc', '1', 'tank', 30, 'blob', "Sa carapace porte les traces de mille chutes."],
  ['fossilarque', 'Fossilarque', 'roc', '2', 'tank', 0, 'biped', "Sa carapace porte les traces de mille chutes."],
  ['vissou', 'Vissou', 'acier', '1', 'tank', 30, 'bug', "Il se polit le blindage avec du sable."],
  ['vissard', 'Vissard', 'acier', '2', 'tank', 44, 'blob', "Son corps tinte comme une cloche quand il marche."],
  ['vissaurus', 'Vissaurus', 'acier', '3', 'tank', 0, 'biped', "Il se polit le blindage avec du sable."],
  ['cablino', 'Câblino', 'foudre', '1', 'fast', 36, 'quad', "Il recharge son corps en se postant sous les lignes électriques."],
  ['cablodon', 'Câblodon', 'foudre', '2', 'fast', 0, 'biped', "Il recharge son corps en se postant sous les lignes électriques."],
  ['dardune', 'Dardune', 'flore/roc', '1', 'phys', 34, 'blob', "Des feuilles poussent sur son dos au printemps."],
  ['dardelite', 'Dardélite', 'flore/roc', '2', 'phys', 0, 'blob', "Il se nourrit de lumière et de rosée."],
  ['rouillot', 'Rouillot', 'acier/ombre', '1', 'bal', 38, 'serpent', "Son corps tinte comme une cloche quand il marche."],
  ['rouillemort', 'Rouillemort', 'acier/ombre', '2', 'bal', 0, 'blob', "Son corps tinte comme une cloche quand il marche."],
  ['cactillon', 'Cactillon', 'flore/roc', '1', 'tank', 35, 'biped', "Des feuilles poussent sur son dos au printemps."],
  ['cactorne', 'Cactorne', 'flore/roc', '2', 'tank', 0, 'quad', "Des feuilles poussent sur son dos au printemps."],
  ['ampoulon', 'Ampoulon', 'foudre/lumiere', 'u', 'fast', 0, 'serpent', "Il recharge son corps en se postant sous les lignes électriques."],
  ['vautourne', 'Vautourne', 'vent/roc', '1', 'phys', 38, 'bird', "Il suit les courants d'air chaud au-dessus des falaises."],
  ['vautoros', 'Vautoros', 'vent/roc', '2', 'phys', 0, 'bird', "Il suit les courants d'air chaud au-dessus des falaises."],
  ['gecklair', 'Gecklair', 'foudre', '1', 'fast', 33, 'blob', "Ses poils crépitent avant l'orage."],
  ['geckodard', 'Geckodard', 'foudre', '2', 'fast', 0, 'quad', "Ses poils crépitent avant l'orage."],
  ['chacalune', 'Chacalune', 'roc/ombre', '1', 'phys', 36, 'quad', "Sa carapace porte les traces de mille chutes."],
  ['chacalor', 'Chacalor', 'roc/ombre', '2', 'phys', 0, 'blob', "Il dort des semaines sans bouger."],
  ['pistonne', 'Pistonne', 'acier/feu', 'u', 'phys', 0, 'serpent', "Son corps tinte comme une cloche quand il marche."],
  ['scarabol', 'Scarabol', 'flore/acier', '1', 'tank', 36, 'blob', "Des feuilles poussent sur son dos au printemps."],
  ['scarabolide', 'Scarabolide', 'flore/acier', '2', 'tank', 0, 'serpent', "Des feuilles poussent sur son dos au printemps."],
  ['dynamouse', 'Dynamouse', 'foudre/normal', '1', 'fast', 34, 'bug', "Il recharge son corps en se postant sous les lignes électriques."],
  ['dynamoteur', 'Dynamoteur', 'foudre/normal', '2', 'fast', 0, 'bug', "Ses poils crépitent avant l'orage."],
  ['ferraillon', 'Ferraillon', 'acier/combat', '1', 'phys', 30, 'serpent', "Son corps tinte comme une cloche quand il marche."],
  ['ferraillard', 'Ferraillard', 'acier/combat', '2', 'phys', 50, 'serpent', "Son corps tinte comme une cloche quand il marche."],
  ['ferrailtitan', 'Ferrailtitan', 'acier/combat', '3', 'phys', 0, 'serpent', "Il se polit le blindage avec du sable."],
  ['morsegel', 'Morsegel', 'givre/eau', '1', 'bal', 42, 'quad', "Son souffle givre les vitres en plein été."],
  ['morsegrand', 'Morsegrand', 'givre/eau', '2', 'bal', 0, 'blob', "Son souffle givre les vitres en plein été."],
  ['chamoisette', 'Chamoisette', 'roc/combat', '1', 'phys', 42, 'blob', "Sa carapace porte les traces de mille chutes."],
  ['chamoiroc', 'Chamoiroc', 'roc/combat', '2', 'phys', 0, 'blob', "Il dort des semaines sans bouger."],
  ['floconnet', 'Floconnet', 'givre', '1', 'fast', 40, 'biped', "Son souffle givre les vitres en plein été."],
  ['floconil', 'Floconil', 'givre', '2', 'fast', 0, 'blob', "Son souffle givre les vitres en plein été."],
  ['rapacime', 'Rapacime', 'vent/roc', 'u', 'fast', 0, 'bird', "Il plane des heures sans battre des ailes."],
  ['yakouni', 'Yakouni', 'normal/givre', '1', 'tank', 44, 'biped', "Il s'adapte à tous les terrains."],
  ['yakolosse', 'Yakolosse', 'normal/givre', '2', 'tank', 0, 'bug', "Il s'adapte à tous les terrains."],
  ['cristallon', 'Cristallon', 'givre/roc', '1', 'tank', 38, 'biped', "Il ne vit que là où la neige ne fond jamais."],
  ['cristallix', 'Cristallix', 'givre/roc', '2', 'tank', 52, 'quad', "Il ne vit que là où la neige ne fond jamais."],
  ['cristalgore', 'Cristalgore', 'givre/roc', '3', 'tank', 0, 'biped', "Il ne vit que là où la neige ne fond jamais."],
  ['bonzou', 'Bonzou', 'combat/lumiere', '1', 'phys', 44, 'blob', "Il salue toujours son adversaire avant un combat."],
  ['bonzair', 'Bonzaïr', 'combat/lumiere', '2', 'phys', 0, 'bug', "Il salue toujours son adversaire avant un combat."],
  ['avalanchon', 'Avalanchon', 'givre/roc', 'u', 'tank', 0, 'bug', "Il ne vit que là où la neige ne fond jamais."],
  ['pingouille', 'Pingouille', 'givre/combat', '1', 'phys', 40, 'serpent', "Son souffle givre les vitres en plein été."],
  ['pingoucap', 'Pingoucap', 'givre/combat', '2', 'phys', 0, 'bug', "Son souffle givre les vitres en plein été."],
  ['glaconnet', 'Glaçonnet', 'givre/ombre', '1', 'bal', 44, 'quad', "Il ne vit que là où la neige ne fond jamais."],
  ['glaciaire', 'Glaciaire', 'givre/ombre', '2', 'bal', 0, 'blob', "Il ne vit que là où la neige ne fond jamais."],
  ['oursonge', 'Oursonge', 'givre/normal', '1', 'bal', 50, 'quad', "Son souffle givre les vitres en plein été."],
  ['oursaurore', 'Oursaurore', 'givre/normal', '2', 'bal', 0, 'bug', "Il ne vit que là où la neige ne fond jamais."],
  ['herminou', 'Herminou', 'givre', '1', 'fast', 48, 'bug', "Il ne vit que là où la neige ne fond jamais."],
  ['herminelle', 'Herminelle', 'givre', '2', 'fast', 0, 'bug', "Il ne vit que là où la neige ne fond jamais."],
  ['aurorien', 'Aurorien', 'lumiere/givre', 'u', 'fast', 0, 'blob', "Les voyageurs perdus suivent sa lueur."],
  ['phoquet', 'Phoquet', 'eau/givre', '1', 'bal', 50, 'fish', "Il nage à contre-courant pour se muscler."],
  ['phocalot', 'Phocalot', 'eau/givre', '2', 'bal', 0, 'fish', "Il nage à contre-courant pour se muscler."],
  ['mammouton', 'Mammouton', 'givre/roc', '1', 'tank', 52, 'blob', "Il ne vit que là où la neige ne fond jamais."],
  ['mammoutitan', 'Mammoutitan', 'givre/roc', '2', 'tank', 0, 'bug', "Son souffle givre les vitres en plein été."],
  ['lichenou', 'Lichenou', 'flore/givre', 'u', 'bal', 0, 'serpent', "Des feuilles poussent sur son dos au printemps."],
  ['lynxor', 'Lynxor', 'givre/combat', '1', 'phys', 46, 'blob', "Son souffle givre les vitres en plein été."],
  ['lynxeclat', 'Lynxéclat', 'givre/combat', '2', 'phys', 0, 'quad', "Son souffle givre les vitres en plein été."],
  ['nordvol', 'Nordvol', 'vent/givre', 'u', 'fast', 0, 'bird', "Il plane des heures sans battre des ailes."],
  ['sapinou', 'Sapinou', 'flore/givre', '1', 'tank', 48, 'quad', "Des feuilles poussent sur son dos au printemps."],
  ['sapinroi', 'Sapinroi', 'flore/givre', '2', 'tank', 0, 'blob', "Des feuilles poussent sur son dos au printemps."],
  ['carpeclat', 'Carpéclat', 'eau/lumiere', '1', 'bal', 54, 'fish', "On l'entend chanter les soirs de pluie."],
  ['carpelune', 'Carpélune', 'eau/lumiere', '2', 'bal', 0, 'fish', "On l'entend chanter les soirs de pluie."],
  ['gruelune', 'Gruelune', 'vent/lumiere', 'u', 'fast', 0, 'bird', "Il suit les courants d'air chaud au-dessus des falaises."],
  ['bambouton', 'Bambouton', 'flore/combat', '1', 'tank', 54, 'quad', "Des feuilles poussent sur son dos au printemps."],
  ['bambouclier', 'Bambouclier', 'flore/combat', '2', 'tank', 0, 'quad', "Des feuilles poussent sur son dos au printemps."],
  ['origamine', 'Origamine', 'normal/vent', '1', 'fast', 52, 'bird', "Curieux, il suit les dresseurs sur des kilomètres."],
  ['origalame', 'Origalame', 'normal/vent', '2', 'fast', 0, 'bird', "Curieux, il suit les dresseurs sur des kilomètres."],
  ['encensou', 'Encensou', 'ombre/feu', 'u', 'bal', 0, 'blob', "Il n'apparaît qu'à la tombée de la nuit."],
  ['lampionet', 'Lampionet', 'feu/lumiere', '1', 'fast', 55, 'blob', "Il dort roulé en boule près des braises."],
  ['lampiorage', 'Lampiorage', 'feu/lumiere', '2', 'fast', 0, 'quad', "Il dort roulé en boule près des braises."],
  ['ombrelame', 'Ombrelame', 'ombre/acier', 'u', 'phys', 0, 'biped', "Il n'apparaît qu'à la tombée de la nuit."],
  ['sylvecho', 'Sylvécho', 'flore/ombre', 'u', 'bal', 0, 'blob', "Des feuilles poussent sur son dos au printemps."],
  ['gongou', 'Gongou', 'acier/normal', '1', 'tank', 54, 'serpent', "Il se polit le blindage avec du sable."],
  ['gongrave', 'Gongrave', 'acier/normal', '2', 'tank', 0, 'quad', "Il se polit le blindage avec du sable."],
  ['lotusine', 'Lotusine', 'eau/flore', '1', 'bal', 54, 'fish', "On l'entend chanter les soirs de pluie."],
  ['lotusacre', 'Lotusacré', 'eau/flore', '2', 'bal', 0, 'fish', "Il nage à contre-courant pour se muscler."],
  ['pianotin', 'Pianotin', 'normal/lumiere', '1', 'bal', 58, 'bug', "Il s'adapte à tous les terrains."],
  ['pianoclef', 'Pianoclef', 'normal/lumiere', '2', 'bal', 0, 'serpent', "Curieux, il suit les dresseurs sur des kilomètres."],
  ['rosette', 'Rosette', 'flore/lumiere', '1', 'fast', 40, 'blob', "Il se nourrit de lumière et de rosée."],
  ['rosaline', 'Rosaline', 'flore/lumiere', '2', 'fast', 60, 'bug', "Des feuilles poussent sur son dos au printemps."],
  ['rosalbe', 'Rosalbe', 'flore/lumiere', '3', 'fast', 0, 'blob', "Il se nourrit de lumière et de rosée."],
  ['pinceline', 'Pinceline', 'normal', '1', 'fast', 58, 'bug', "Curieux, il suit les dresseurs sur des kilomètres."],
  ['pincemoir', 'Pincémoir', 'normal', '2', 'fast', 0, 'biped', "Il s'adapte à tous les terrains."],
  ['gemmouche', 'Gemmouche', 'acier/lumiere', '1', 'tank', 58, 'blob', "Son corps tinte comme une cloche quand il marche."],
  ['gemmetal', 'Gemmétal', 'acier/lumiere', '2', 'tank', 0, 'bug', "Son corps tinte comme une cloche quand il marche."],
  ['cygnebene', 'Cygnébène', 'vent/eau', 'u', 'fast', 0, 'bird', "Il suit les courants d'air chaud au-dessus des falaises."],
  ['libelluna', 'Libelluna', 'flore/vent', '1', 'fast', 60, 'bird', "Il se nourrit de lumière et de rosée."],
  ['libellustre', 'Libellustre', 'flore/vent', '2', 'fast', 0, 'bird', "Des feuilles poussent sur son dos au printemps."],
  ['masquelin', 'Masquelin', 'ombre/normal', '1', 'fast', 58, 'serpent', "On le reconnaît à ses yeux brillants dans le noir."],
  ['masquebal', 'Masquebal', 'ombre/normal', '2', 'fast', 0, 'serpent', "On le reconnaît à ses yeux brillants dans le noir."],
  ['parfumette', 'Parfumette', 'flore/vent', 'u', 'bal', 0, 'bird', "Des feuilles poussent sur son dos au printemps."],
  ['fontainou', 'Fontainou', 'eau/lumiere', '1', 'bal', 58, 'fish', "On l'entend chanter les soirs de pluie."],
  ['fontainelle', 'Fontainelle', 'eau/lumiere', '2', 'bal', 0, 'fish', "On l'entend chanter les soirs de pluie."],
  ['tortulagon', 'Tortulagon', 'eau/flore', '1', 'tank', 64, 'fish', "On l'entend chanter les soirs de pluie."],
  ['tortuocean', 'Tortuocéan', 'eau/flore', '2', 'tank', 0, 'fish', "Il nage à contre-courant pour se muscler."],
  ['perrocolor', 'Perrocolor', 'vent/normal', '1', 'fast', 64, 'bird', "Il suit les courants d'air chaud au-dessus des falaises."],
  ['perrocalypso', 'Perrocalypso', 'vent/normal', '2', 'fast', 0, 'bird', "Il suit les courants d'air chaud au-dessus des falaises."],
  ['squalou', 'Squalou', 'eau/combat', '1', 'phys', 66, 'fish', "Il nage à contre-courant pour se muscler."],
  ['squalorde', 'Squalorde', 'eau/combat', '2', 'phys', 0, 'fish', "Il nage à contre-courant pour se muscler."],
  ['hibiscune', 'Hibiscune', 'flore/lumiere', 'u', 'bal', 0, 'blob', "Il se nourrit de lumière et de rosée."],
  ['raiellume', 'Raiellume', 'eau/foudre', '1', 'fast', 66, 'fish', "Il nage à contre-courant pour se muscler."],
  ['raieclair', 'Raiéclair', 'eau/foudre', '2', 'fast', 0, 'fish', "Il nage à contre-courant pour se muscler."],
  ['toteclat', 'Totéclat', 'roc/feu', 'u', 'tank', 0, 'bug', "Sa carapace porte les traces de mille chutes."],
  ['iguaflamme', 'Iguaflamme', 'feu/flore', '1', 'phys', 65, 'biped', "Sa queue rougeoie quand il est content."],
  ['iguasolaire', 'Iguasolaire', 'feu/flore', '2', 'phys', 0, 'biped', "Il dort roulé en boule près des braises."],
  ['mangrovin', 'Mangrovin', 'flore/eau', '1', 'tank', 64, 'quad', "Des feuilles poussent sur son dos au printemps."],
  ['mangrovore', 'Mangrovore', 'flore/eau', '2', 'tank', 0, 'biped', "Il se nourrit de lumière et de rosée."],
  ['tambouri', 'Tambouri', 'normal/roc', '1', 'phys', 64, 'quad', "Curieux, il suit les dresseurs sur des kilomètres."],
  ['tambourdon', 'Tambourdon', 'normal/roc', '2', 'phys', 0, 'biped', "Curieux, il suit les dresseurs sur des kilomètres."],
  ['poulpinet', 'Poulpinet', 'eau/ombre', '1', 'bal', 66, 'fish', "Il nage à contre-courant pour se muscler."],
  ['poulpiarque', 'Poulpiarque', 'eau/ombre', '2', 'bal', 0, 'fish', "On l'entend chanter les soirs de pluie."],
  ['moutonuage', 'Moutonuage', 'normal/foudre', '1', 'bal', 70, 'quad', "Il s'adapte à tous les terrains."],
  ['moutonimbus', 'Moutonimbus', 'normal/foudre', '2', 'bal', 0, 'biped', "Il s'adapte à tous les terrains."],
  ['epillon', 'Épillon', 'flore/normal', '1', 'phys', 70, 'quad', "Des feuilles poussent sur son dos au printemps."],
  ['episeigneur', 'Épiseigneur', 'flore/normal', '2', 'phys', 0, 'bug', "Il se nourrit de lumière et de rosée."],
  ['coqueret', 'Coqueret', 'vent/feu', '1', 'phys', 70, 'bird', "Il plane des heures sans battre des ailes."],
  ['coqardent', 'Coqardent', 'vent/feu', '2', 'phys', 0, 'bird', "Il suit les courants d'air chaud au-dessus des falaises."],
  ['rainelune', 'Rainelune', 'eau/lumiere', '1', 'bal', 70, 'fish', "On l'entend chanter les soirs de pluie."],
  ['rainegrand', 'Rainegrand', 'eau/lumiere', '2', 'bal', 0, 'fish', "On l'entend chanter les soirs de pluie."],
  ['abeillor', 'Abeillor', 'flore/lumiere', 'u', 'fast', 0, 'quad', "Il se nourrit de lumière et de rosée."],
  ['epouvantrou', 'Épouvantrou', 'ombre/flore', 'u', 'bal', 0, 'bug', "Il n'apparaît qu'à la tombée de la nuit."],
  ['gerbillon', 'Gerbillon', 'normal/roc', '1', 'fast', 68, 'biped', "Il s'adapte à tous les terrains."],
  ['gerbolide', 'Gerbolide', 'normal/roc', '2', 'fast', 0, 'bug', "Curieux, il suit les dresseurs sur des kilomètres."],
  ['tournesoleil', 'Tournesoleil', 'flore/lumiere', 'u', 'tank', 0, 'quad', "Des feuilles poussent sur son dos au printemps."],
  ['moulinou', 'Moulinou', 'vent/acier', '1', 'tank', 70, 'bird', "Il plane des heures sans battre des ailes."],
  ['moulinvent', 'Moulinvent', 'vent/acier', '2', 'tank', 0, 'bird', "Il suit les courants d'air chaud au-dessus des falaises."],
  ['basaltin', 'Basaltin', 'roc/feu', '1', 'tank', 50, 'bug', "Sa carapace porte les traces de mille chutes."],
  ['basaltor', 'Basaltor', 'roc/feu', '2', 'tank', 78, 'bug', "Sa carapace porte les traces de mille chutes."],
  ['basaltitan', 'Basaltitan', 'roc/feu', '3', 'tank', 0, 'blob', "Il dort des semaines sans bouger."],
  ['obsidiane', 'Obsidiane', 'roc/ombre', 'u', 'tank', 0, 'quad', "Sa carapace porte les traces de mille chutes."],
  ['soufrelin', 'Soufrelin', 'feu/roc', '1', 'phys', 80, 'biped', "Il dort roulé en boule près des braises."],
  ['soufrebete', 'Soufrebête', 'feu/roc', '2', 'phys', 0, 'blob', "Il dort roulé en boule près des braises."],
  ['murenoire', 'Murenoire', 'eau/ombre', '1', 'phys', 80, 'fish', "Il nage à contre-courant pour se muscler."],
  ['murenide', 'Murénide', 'eau/ombre', '2', 'phys', 0, 'fish', "On l'entend chanter les soirs de pluie."],
  ['cendrabeille', 'Cendrabeille', 'feu/flore', 'u', 'fast', 0, 'quad', "Sa queue rougeoie quand il est content."],
  ['volcanuche', 'Volcanuche', 'feu/roc', '1', 'tank', 82, 'blob', "Sa queue rougeoie quand il est content."],
  ['volcanarque', 'Volcanarque', 'feu/roc', '2', 'tank', 0, 'serpent', "Il dort roulé en boule près des braises."],
  ['krakelin', 'Krakelin', 'eau/ombre', '1', 'phys', 82, 'fish', "On l'entend chanter les soirs de pluie."],
  ['krakenoir', 'Krakenoir', 'eau/ombre', '2', 'phys', 0, 'fish', "Il nage à contre-courant pour se muscler."],
  ['lavachon', 'Lavachon', 'feu/normal', '1', 'phys', 80, 'blob', "Sa queue rougeoie quand il est content."],
  ['lavaurochs', 'Lavaurochs', 'feu/normal', '2', 'phys', 0, 'serpent', "Sa queue rougeoie quand il est content."],
  ['aquoree', 'Aquorée', 'eau/lumiere', 'L', 'bal', 0, 'fish', "Il nage à contre-courant pour se muscler."],
  ['volcanis', 'Volcanis', 'feu/roc', 'L', 'phys', 0, 'biped', "Il dort roulé en boule près des braises."],
  ['givrael', 'Givraël', 'givre/vent', 'L', 'fast', 0, 'bird', "Son souffle givre les vitres en plein été."],
  ['tonnorage', 'Tonnorage', 'foudre/acier', 'L', 'tank', 0, 'biped', "Il recharge son corps en se postant sous les lignes électriques."],
  ['aubere', 'Aubéris', 'lumiere/dragon', 'L', 'spec', 0, 'bird', "Le gardien de l'aube. Dans les vieilles légendes, il réveille le monde chaque matin."],
  ['nocturne', 'Nocturnis', 'ombre/dragon', 'L', 'phys', 0, 'serpent', "Le gardien de la nuit. Il veille sur le sommeil du monde depuis mille ans."],
  ['auberis', 'Zénithar', 'lumiere/dragon', 'L', 'spec', 0, 'bird', "Gardien du Zénith. Autrefois, il tenait les Quatre Terres ensemble."],
  ['nocturnis', 'Germalis', 'lumiere/flore', 'L', 'phys', 0, 'serpent', "L'esprit de la Graine-Monde. Il est né la nuit de la Germination."],
  ['eveillon', 'Éveillon', 'esprit/lumiere', 'M', 'bal', 0, 'biped', "On dit qu'il n'apparaît qu'à ceux qui ont tout vu."],
];

const STATK = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
const STAT_NAME = { hp: 'PV', atk: 'Attaque', def: 'Défense', spa: 'Atq. Spé.', spd: 'Déf. Spé.', spe: 'Vitesse' };
const ROLES = {
  bal: [1, 1, 1, 1, 1, 1],
  phys: [1, 1.45, 1, 0.6, 0.8, 1.1],
  spec: [0.9, 0.6, 0.8, 1.45, 1.1, 1.1],
  tank: [1.3, 0.95, 1.5, 0.6, 1.05, 0.5],
  fast: [0.85, 1.1, 0.75, 0.95, 0.75, 1.5],
  sptank: [1.2, 0.6, 0.95, 1, 1.5, 0.7],
};
const SP = {};
const DEX = [];
(function buildSpecies() {
  let prev = null;
  SPECIES_LIST.forEach((row, i) => {
    const [id, n, types, stage, role, evo, plan, desc] = row;
    const s = { id, n, types: types.split('/'), stage, role, evo, plan, desc, num: i + 1 };
    s.line = (prev && prev.evo > 0) ? prev.line : id;
    s.next = evo > 0 ? SPECIES_LIST[i + 1][0] : null;
    s.prev = (prev && prev.evo > 0) ? prev.id : null;
    s.slow = ['L', 'M', 'P'].includes(stage) || s.line === 'dracolin';
    let bst;
    if (stage === '1') bst = 300;
    else if (stage === '2') bst = s.next ? 405 : 475;
    else if (stage === '3') bst = 525;
    else if (stage === 'u') bst = 455;
    else if (stage === 'P') bst = 570;
    else if (stage === 'L') bst = 630;
    else bst = 610;
    const r = rng(hashStr(id + ':stats'));
    const w = ROLES[role].map(v => v * (0.9 + r() * 0.2));
    const sum = w.reduce((a, b) => a + b, 0);
    s.base = {};
    STATK.forEach((k, j) => { s.base[k] = Math.max(20, Math.round(bst * w[j] / sum)); });
    s.bst = bst;
    s.yield = Math.round(bst * bst / 1600);
    s.rate = { '1': 190, '2': s.next ? 120 : 75, '3': 45, 'u': 90, 'P': 45, 'L': 25, 'M': 15 }[stage];
    SP[id] = s; DEX.push(id);
    prev = s;
  });
})();

// ---------- Apprentissage des capacités ----------
const MOVES_BY_TYPE = {};
for (const id in MOVES) {
  const m = MOVES[id];
  if (m.t === 'none') continue;
  (MOVES_BY_TYPE[m.t] = MOVES_BY_TYPE[m.t] || []).push(id);
}
function tierOf(pw) { return pw <= 50 ? 1 : pw <= 70 ? 2 : pw <= 90 ? 3 : pw <= 110 ? 4 : 5; }
function typeAttacks(t, pref) {
  const list = (MOVES_BY_TYPE[t] || []).filter(id => MOVES[id].pw);
  const out = [];
  for (let tier = 1; tier <= 5; tier++) {
    const c = list.filter(id => tierOf(MOVES[id].pw) === tier);
    if (!c.length) continue;
    out.push(c.find(id => MOVES[id].c === pref) || c[0]);
  }
  return out;
}
function typeStatus(t) { return (MOVES_BY_TYPE[t] || []).filter(id => MOVES[id].c === 'x' && !(MOVES[id].fx && MOVES[id].fx.heal)); }
function typeHeal(t) { return (MOVES_BY_TYPE[t] || []).filter(id => MOVES[id].fx && MOVES[id].fx.heal); }
const LEARN_CACHE = {};
function learnset(sp) {
  if (LEARN_CACHE[sp]) return LEARN_CACHE[sp];
  const s = SP[sp];
  const r = rng(hashStr(s.line + ':moves'));
  const [t1, t2] = s.types;
  const pref = (s.role === 'phys' || s.role === 'tank' || (s.role === 'bal' && r() < 0.5) || (s.role === 'fast' && r() < 0.6)) ? 'p' : 's';
  const A1 = typeAttacks(t1, pref);
  const A2 = t2 ? typeAttacks(t2, pref) : [];
  const S1 = typeStatus(t1), S2 = t2 ? typeStatus(t2) : [];
  const H = [...typeHeal(t1), ...(t2 ? typeHeal(t2) : [])];
  const ls = [];
  const add = (l, id) => { if (id && !ls.some(e => e[1] === id)) ls.push([l, id]); };
  add(1, r() < 0.5 ? 'charge' : 'griffe');
  add(1, r() < 0.5 ? 'grondement' : 'regard');
  add(4, A1[0]);
  add(8, S1[0] || 'elan');
  add(12, A2[0] || 'elan');
  add(15, A1[1]);
  add(19, 'coupdetete');
  add(23, A2[1] || A1[1]);
  if (s.role === 'tank' || s.role === 'sptank') add(27, H[0] || 'reposbref');
  else add(27, S1[1] || S2[0] || H[0]);
  add(31, A1[2]);
  add(36, A2[2] || 'ecrasement');
  add(42, A1[3]);
  add(48, A2[3] || 'assautfurieux');
  add(55, A1[4] || (t1 === 'normal' ? null : 'frappetotale'));
  ls.sort((a, b) => a[0] - b[0]);
  return (LEARN_CACHE[sp] = ls);
}
function defaultMoves(sp, lvl) {
  const ids = learnset(sp).filter(e => e[0] <= lvl).map(e => e[1]);
  return ids.slice(-4);
}
function movesLearnedAt(sp, lvl) { return learnset(sp).filter(e => e[0] === lvl).map(e => e[1]); }

// ---------- Créatures individuelles ----------
const LVL_CAP = 999;
function xpAt(sp, l) { const f = SP[sp].slow ? 1.25 : 1; if (l <= 1) return 0; if (l <= 100) return Math.floor(f * l * l * l); const k = l - 100; return Math.floor(f * (1e6 + 9000 * k + 40 * k * k)); }
function calcStats(m) {
  const s = SP[m.sp], L = m.lvl, st = {};
  for (const k of STATK) {
    const b = s.base[k], iv = m.iv[k];
    st[k] = k === 'hp' ? Math.floor((2 * b + iv) * L / 100) + L + 10 : Math.floor((2 * b + iv) * L / 100) + 5;
  }
  return st;
}
function maxHp(m) { return calcStats(m).hp; }
function makeMon(sp, lvl, opt = {}) {
  const iv = {};
  for (const k of STATK) iv[k] = opt.goodIv ? rnd(16, 31) : rnd(0, 31);
  const m = { sp, lvl, xp: xpAt(sp, lvl), iv, moves: [], status: null, shiny: opt.shiny != null ? opt.shiny : Math.random() < 1 / 512 };
  m.moves = defaultMoves(sp, lvl).map(id => ({ id, pp: MOVES[id].pp }));
  m.hp = maxHp(m);
  return m;
}
function evolveForLevel(sp, lvl) {
  while (SP[sp].next && lvl >= SP[sp].evo) sp = SP[sp].next;
  return sp;
}
function monName(m) { return m.nick || SP[m.sp].n; }
function healMon(m) { m.hp = maxHp(m); m.status = null; m.slp = 0; m.moves.forEach(mv => mv.pp = MOVES[mv.id].pp); }

// ---------- Objets ----------
const ITEMS = {
  sphere: { n: 'Sphère', p: 200, k: 'ball', m: 1, d: 'Une sphère pour capturer une créature sauvage.' },
  supersphere: { n: 'Super Sphère', p: 600, k: 'ball', m: 1.5, d: 'Capture mieux qu\'une Sphère.' },
  hypersphere: { n: 'Hyper Sphère', p: 1200, k: 'ball', m: 2, d: 'Une sphère très efficace.' },
  spherenuit: { n: 'Sphère Nuit', p: 1000, k: 'ball', m: 'night', d: 'Très efficace la nuit et dans les grottes.' },
  baume: { n: 'Baume', p: 300, k: 'heal', hp: 20, d: 'Rend 20 PV.' },
  superbaume: { n: 'Super Baume', p: 700, k: 'heal', hp: 60, d: 'Rend 60 PV.' },
  hyperbaume: { n: 'Hyper Baume', p: 1200, k: 'heal', hp: 150, d: 'Rend 150 PV.' },
  maxibaume: { n: 'Maxi Baume', p: 2500, k: 'heal', hp: 9999, d: 'Rend tous les PV.' },
  antidote: { n: 'Antidote', p: 100, k: 'cure', st: ['psn'], d: 'Soigne le poison.' },
  antipara: { n: 'Anti-Para', p: 200, k: 'cure', st: ['par'], d: 'Soigne la paralysie.' },
  reveil: { n: 'Réveil', p: 250, k: 'cure', st: ['slp'], d: 'Réveille une créature endormie.' },
  antibrule: { n: 'Anti-Brûle', p: 250, k: 'cure', st: ['brn'], d: 'Soigne une brûlure.' },
  antigel: { n: 'Antigel', p: 250, k: 'cure', st: ['frz'], d: 'Dégèle une créature.' },
  totalsoin: { n: 'Total Soin', p: 600, k: 'cure', st: ['psn', 'par', 'slp', 'brn', 'frz'], d: 'Soigne tous les problèmes de statut.' },
  rappel: { n: 'Rappel', p: 1500, k: 'revive', d: 'Ranime une créature K.O. avec la moitié de ses PV.' },
  ether: { n: 'Éther', p: 1200, k: 'pp', d: 'Rend 10 PP à chaque capacité.' },
  repousse: { n: 'Repousse', p: 350, k: 'repel', steps: 100, d: 'Éloigne les créatures faibles pendant 100 pas.' },
  superrepousse: { n: 'Super Repousse', p: 500, k: 'repel', steps: 200, d: 'Éloigne les créatures faibles pendant 200 pas.' },
  bonbon: { n: 'Bonbon Éveil', p: 0, k: 'candy', d: 'Fait monter une créature d\'un niveau.' },
  bonbonmax: { n: 'Bonbon Stellaire', p: 0, k: 'candy', lv: 10, d: 'Fait monter une créature de dix niveaux.' },
};
const ITEM_ORDER = Object.keys(ITEMS);
const SHOP_TIERS = [
  [0, ['sphere', 'baume', 'antidote', 'antipara', 'repousse']],
  [1, ['superbaume', 'reveil', 'antibrule', 'antigel']],
  [2, ['supersphere']],
  [3, ['totalsoin', 'rappel']],
  [4, ['hyperbaume', 'superrepousse']],
  [5, ['hypersphere']],
  [8, ['maxibaume', 'ether', 'spherenuit']],
];
const KEY_ITEMS = {
  chrono: { n: 'Chronoportail', d: 'Un éclat de la Faille du Temps. Permet de voyager vers n\'importe quelle époque ou monde déjà ouvert (menu Voyager).' },
  ampli: { n: 'Amplificateur de sève', d: 'Un cristal du Cœur. Triple l\'expérience gagnée par ton équipe.' },
  codex: { n: 'Codex', d: 'Répertorie les créatures vues et capturées.' },
  partage: { n: 'Partage Exp', d: 'Les créatures restées en réserve gagnent la moitié de l\'expérience.' },
  ticket: { n: 'Billet Éclosia', d: 'Un billet pour le ferry de Port-Corail vers Éclosia.' },
  bracelet: { n: "Bracelet d'Éclat", d: "Une fois par combat, libère l'attaque ultime d'un type dont tu possèdes l'Éclat." },
  pendentif: { n: 'Pendentif de Sève', d: "Le cadeau de Nova. Une fois par combat, une créature au stade final peut entrer en Floraison." },
  couronne: { n: 'Couronne Colossale', d: "Forgée par le premier dresseur. Une fois par combat, une créature devient colossale pendant trois tours." },
};
TYPES.forEach(t => { KEY_ITEMS['eclat_' + t] = { n: 'Éclat ' + TN[t], d: `Un cristal qui renferme la force du type ${TN[t]}. Il réagit au Bracelet d'Éclat.` }; });
const STATUS_NAME = { psn: 'PSN', par: 'PAR', slp: 'SOM', brn: 'BRÛ', frz: 'GEL' };
const STATUS_COLOR = { psn: '#a35cc6', par: '#d4a920', slp: '#8a8f9a', brn: '#e06a30', frz: '#5fb8d8' };

function fmtMoney(n) { return n.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' écus'; }
