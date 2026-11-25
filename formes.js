'use strict';
/* ============================================================
   ÉCLOSIA — Formes régionales, temporelles et spéciales
   Des lignées entières adaptées à une époque ou à un monde :
   de Cendre (An 31), de l'Aube (Nouveau Monde), d'Unaë (mille
   ans avant), de l'Envers (monde parallèle), et une forme
   spéciale nocturne qui n'apparaît que la nuit dans la nature.
   ============================================================ */
const FORM_KINDS = {
  cendre: { suf: ' de Cendre', tag: 'cd', n: 6, label: 'Forme de Cendre', reg: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7'],
    retype: ts => [ts[0], ts[0] === 'ombre' ? 'feu' : ts[0] === 'feu' ? 'roc' : 'ombre'], stat: { atk: 1.12, def: 1.1, spe: 0.82 },
    pal: L => ({ c1: hueShift(L.c1, 0, -0.45, -0.12), c2: '#c8beb2', c3: '#ff7a3a' }), add: ['ash', 'embers', 'cracks'], eye: 'sharp',
    hab: "Les cendres tièdes des Terres Brûlées, an 31 après la Graine.",
    p: ["{n} est la forme que {b} a prise pour survivre à la Moisson. Sa peau s'est épaissie, grisée par la cendre, et des braises brillent encore dans les fissures de son corps.", "Les survivants d'Abri-Zéro racontent qu'il dort enfoui sous les statues pour se tenir chaud. Il ne fuit pas les humains : il a appris qu'ils étaient rares, désormais.", "Les savants de l'Observatoire Hadès pensent qu'il porte dans son sang une trace de la Moisson. Comme une cicatrice génétique, transmise à ses petits."] },
  aube: { suf: " de l'Aube", tag: 'ab', n: 6, label: "Forme de l'Aube", reg: ['o1', 'o2', 'o3', 'o4', 'o5', 'o6', 'o7'],
    retype: ts => [ts[0], ts[0] === 'lumiere' ? 'esprit' : 'lumiere'], stat: { spa: 1.12, spd: 1.12, atk: 0.85 },
    pal: L => ({ c1: hueShift(L.c1, 12, 0.05, 0.16), c2: '#ffffff', c3: '#ffd8a8' }), add: ['halo', 'gems'], eye: 'big',
    hab: "Les prairies lumineuses du Nouveau Monde, là où la sonde a semé sans reprendre.",
    p: ["{n} est né de la nouvelle directive de la Graine : « ensemencer sans moissonner ». Il ressemble à {b}, mais il n'a jamais connu la peur.", "Il vient manger dans la main des voyageurs et s'endort sur les genoux des enfants. Les échos du Nouveau Monde disent qu'il rêve de leurs anciennes vies à leur place.", "Sa lumière n'est pas une arme. C'est, selon Aïla, la première-née, « la façon qu'a la Graine de dire pardon »."] },
  unae: { suf: " d'Unaë", tag: 'un', n: 4, label: "Forme d'Unaë", reg: ['b1'],
    retype: ts => [ts[0], ts[0] === 'roc' ? 'dragon' : 'roc'], stat: { hp: 1.15, def: 1.12, spe: 0.85 },
    pal: L => ({ c1: hueShift(L.c1, -20, -0.1, -0.05), c2: '#f4e4b0', c3: '#c9a845' }), add: ['crest', 'bellymark'], eye: 'round',
    hab: "Le continent d'Unaë, mille ans avant la Graine, avant la séparation des terres.",
    p: ["{n} est l'ancêtre de {b}, tel qu'il vivait sur le continent d'Unaë. Plus massif, plus lent, il portait sur le ventre des marques que les deux peuples peignaient sur leurs boucliers.", "Les soldats de la Terre et ceux de l'Océan le respectaient tous deux : on ne se battait jamais là où il broutait.", "Quand Zénithar déchira le continent, ses troupeaux furent séparés. Les fresques de Mousselande le montrent, pleurant d'un côté de la faille."] },
  envers: { suf: " de l'Envers", tag: 'ev', n: 4, label: "Forme de l'Envers", reg: ['w1', 'w2', 'w3'],
    retype: ts => [ts[0], ts[0] === 'toxine' ? 'ombre' : 'toxine'], stat: { atk: 1.1, spe: 1.1, spd: 0.85 },
    pal: L => ({ c1: hueShift(L.c1, -30, -0.15, -0.18), c2: '#a89098', c3: '#c43a5a' }), add: ['thorns', 'mask'], eye: 'sharp',
    hab: "Le monde de l'Envers, où Maître Ronce a gagné et où rien ne pousse sans permission.",
    p: ["Dans l'Envers, {b} a été dressé par l'Ordre Racine pendant dix ans. {n} en est le résultat : plus dur, plus rapide, et incapable de jouer.", "Les résistants de Frimabri en recueillent parfois. Il faut des mois pour qu'un {n} accepte une caresse sans mordre. Mais quand il l'accepte, il ne la refuse plus jamais.", "La Lame Bleue en gardait un en secret. Personne ne savait qu'elle lui chantait des berceuses."] },
  nocturne: { suf: ' nocturne', tag: 'nc', n: 5, label: 'Forme spéciale nocturne', special: 'night',
    retype: ts => [ts[0], ts[0] === 'esprit' ? 'ombre' : 'esprit'], stat: { spe: 1.14, spa: 1.08, def: 0.86 },
    pal: L => ({ c1: hueShift('#2a3a7a', (hashStr(L.c1) % 40) - 20, 0, 0.02), c2: '#8a9ad8', c3: '#f2e14c' }), add: ['gems', 'glow'], eye: 'big',
    hab: "La nature des Quatre Terres et d'Éclosia, seulement la nuit, loin des villes.",
    p: ["{n} est une forme rare de {b} qui ne sort qu'à la nuit tombée. Sa peau garde la couleur du ciel nocturne et des points lumineux y dessinent des constellations.", "Les bergers disent que chaque {n} porte sur le dos la carte des étoiles du soir de sa naissance. Les cartographes ont essayé de vérifier. Ils n'ont pas réussi à réfuter.", "Au lever du jour, il pâlit et se cache. Personne n'en a jamais vu un en plein soleil. Madame Lune, des Lanternes Rouges, dit que c'est mieux ainsi."] },
};
const FORMS = {};          // id de forme -> { of, kind }
const FORMS_OF = {};       // id de base -> [ids de formes]
const FORM_LINES = {};     // kind -> [id de la forme de base de chaque lignée]
(function buildForms() {
  const used = new Set(['feuillon', 'brasille', 'clapotin']);
  const lineMembers = id => { const out = []; let c = id; while (c) { out.push(c); c = SP[c].next; } return out; };
  const starts = DEX.filter(id => SP[id].stage === '1' && SP[id].next && !used.has(id));
  let order = starts.slice().sort((a, b) => hashStr(a + ':form') - hashStr(b + ':form'));
  for (const kind in FORM_KINDS) {
    const K = FORM_KINDS[kind]; FORM_LINES[kind] = [];
    let n = 0;
    while (n < K.n && order.length) {
      const first = order.shift(); if (used.has(first)) continue; used.add(first);
      const mem = lineMembers(first), ids = mem.map(m => m + '_' + K.tag);
      mem.forEach((m, i) => {
        const b = SP[m], id = ids[i];
        const s = Object.assign({}, b, { id, n: b.n + K.suf, types: K.retype(b.types), num: DEX.length + 1, line: ids[0], next: b.next ? ids[i + 1] : null, prev: i ? ids[i - 1] : null, form: { of: m, kind } });
        s.desc = K.p[0].replace(/\{n\}/g, s.n).replace(/\{b\}/g, b.n);
        s.base = {}; let sum = 0;
        for (const k of STATK) { s.base[k] = Math.max(20, Math.round(b.base[k] * (K.stat[k] || 1))); sum += s.base[k]; }
        const f = b.bst / sum; for (const k of STATK) s.base[k] = Math.max(20, Math.round(s.base[k] * f));
        SP[id] = s; DEX.push(id); FORMS[id] = { of: m, kind }; (FORMS_OF[m] = FORMS_OF[m] || []).push(id);
        // apparence : même silhouette, palette et détails de l'époque
        const L0 = ELOOK[m] || autoLook(m), pal = K.pal(L0);
        ELOOK[id] = Object.assign({}, L0, pal, { x: [...new Set((L0.x || []).concat(K.add))], eye: K.eye, ei: kind === 'nocturne' ? '#f2e14c' : undefined });
        // fiche du Codex vivant
        const BL = (typeof DEX_LORE !== 'undefined' && DEX_LORE[m]) || { cm: 50, kg: 10, p: [b.desc] };
        if (typeof DEX_LORE !== 'undefined') DEX_LORE[id] = {
          h: K.hab, cm: Math.round(BL.cm * (kind === 'unae' ? 1.2 : kind === 'aube' ? 0.95 : 1.05)), kg: Math.round(BL.kg * (kind === 'unae' ? 1.4 : kind === 'cendre' ? 1.15 : 1) * 10) / 10,
          p: K.p.map(t => t.replace(/\{n\}/g, s.n).replace(/\{b\}/g, b.n)),
          soin: (BL.soin || '') + (kind === 'cendre' ? " Sa forme de Cendre réclame un bain de cendres chaudes chaque semaine." : kind === 'aube' ? " Sa forme de l'Aube se nourrit surtout de lumière : laissez-la au soleil." : kind === 'unae' ? " Sa forme d'Unaë mange trois fois plus et dort deux fois plus longtemps." : kind === 'envers' ? " Sa forme de l'Envers a besoin de patience avant tout le reste." : " Sa forme nocturne doit dormir le jour, au calme et dans le noir."),
          cb: BL.cb || '', tem: BL.tem ? BL.tem.replace(b.n, s.n) : '',
        };
      });
      FORM_LINES[kind].push(ids[0]); n++;
    }
  }
})();
/* ---------- Où les trouver ---------- */
for (const kind in FORM_KINDS) {
  const K = FORM_KINDS[kind]; if (!K.reg) continue;
  K.reg.forEach((rid, i) => {
    const def = ROUTES[rid]; if (!def || !def.enc || !def.enc.grass) return;
    const lo = Math.min(...def.enc.grass.map(e => e[1])), hi = Math.max(...def.enc.grass.map(e => e[2]));
    for (let k = 0; k < 2; k++) {
      const base = FORM_LINES[kind][(i * 2 + k) % FORM_LINES[kind].length]; if (!base) continue;
      def.enc.grass.push([evolveForLevel(base, lo), lo, hi, 14]);
    }
  });
}
// formes nocturnes : dans la nature des deux continents, la nuit seulement
const _genWorldForms = genWorld;
genWorld = function (id) {
  const m = _genWorldForms(id);
  const enc0 = m.encAt;
  if (enc0) m.encAt = (x, y) => {
    const E = enc0(x, y);
    if (timeOfDay() !== 'night' || !E.grass || !E.grass.length) return E;
    const lo = Math.min(...E.grass.map(e => e[1])), hi = Math.max(...E.grass.map(e => e[2]));
    const L = FORM_LINES.nocturne, base = L[(x + y) % L.length];
    return Object.assign({}, E, { grass: E.grass.concat([[evolveForLevel(base, lo), lo, hi, 10, 'n']]) });
  };
  return m;
};
