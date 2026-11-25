'use strict';
/* ============================================================
   ÉCLOSIA — Les villes deviennent des cités
   Chaque ville des deux continents garde son vieux centre et gagne
   des quartiers neufs : au moins dix maisons, un grand centre commercial,
   une usine et un quartier d'affaires. Plus l'histoire avance (badges),
   plus la ville s'étend : nouveaux lotissements, tours, parc, entrepôt.
   ============================================================ */
const CITY_W = 54, CITY_H = 42;
function isCity(id) { const d = TOWNS[id], r = REGION_OF[id] || ''; return !!(d && !d.special && (r === 'solvene' || r === 'brumaire' || /^qt\d$/.test(r))); }
function cityDims(id) { return isCity(id) ? [CITY_W, CITY_H] : [28, 22]; }
function cityStage() { const b = G && G.badges ? G.badges.filter(Boolean).length : 0; return b >= 10 ? 3 : b >= 5 ? 2 : b >= 2 ? 1 : 0; }
const STAGE_NAME = ['un bourg en plein essor', 'une ville qui grandit', 'une vraie cité', 'une métropole'];

const FACTORY = {
  prairie: ['Usine de Sphères', "On fabrique ici les Sphères de tout le continent. Les Éclos des prairies viennent dormir sous les tapis roulants, c'est chaud et ça ronronne."],
  neige: ['Conserverie du Givre', "Le froid fait la moitié du travail : on conserve les baies dans la glace des glaciers. Les Éclos givre adorent les chambres froides."],
  volcan: ['Fonderie géothermique', "Toute l'énergie vient de la chaleur du volcan. Les Éclos de feu se réchauffent près des turbines, on les laisse faire."],
  plage: ['Usine de dessalement', "On transforme l'eau de mer en eau douce pour toute la côte. Le sel part ensuite vers les marchés de l'intérieur."],
  jungle: ['Distillerie de sève', "On récolte la sève des grands arbres sans les abattre. Une saignée par saison, pas plus : la jungle doit respirer."],
  montagne: ['Cimenterie de la Montagne', "La pierre de la montagne sert à bâtir les nouveaux quartiers. On replante un arbre pour chaque bloc taillé."],
  desert: ['Centrale solaire', "Le soleil du désert alimente les cités voisines. Sous les panneaux, l'ombre fait pousser une petite oasis."],
  marais: ["Station d'épuration", "Le marais filtre l'eau mieux que nos machines. On l'aide juste un peu, et les Éclos toxine nettoient le reste."],
  automne: ['Scierie des Érables', "On ne coupe que les arbres tombés. Le bois d'érable part vers les ateliers de tout Éclosia."],
};
const CITY_LINES = [
  "Avant, il n'y avait que la place et quelques maisons. Regarde ça maintenant !",
  "Les Galeries ont ouvert l'an dernier. On y trouve de tout, même des Sphères rares.",
  "Je travaille dans une tour du quartier d'affaires. D'en haut, on voit tout le continent.",
  "L'usine embauche. Mon frère y travaille depuis qu'il a eu son premier Éclos.",
  "Le soir, les tours s'allument une à une. C'est mon moment préféré.",
  "Chaque fois qu'un dresseur gagne un badge, on dirait que la ville pousse d'un quartier.",
];
const STAGE_LINES = [
  "Ils posent les fondations de nouveaux lotissements. Il paraît que la ville va doubler.",
  "Un nouveau quartier vient d'ouvrir au sud. Les familles arrivent de partout.",
  "Il y a un parc, maintenant, et un entrepôt près de l'usine. La ville ne dort plus.",
  "Une métropole ! Qui l'aurait cru, il y a quelques années ?",
];

/* ---------- Extension de la carte ---------- */
const _genTownCity = genTown;
genTown = function (id) {
  const m = _genTownCity(id);
  if (isCity(id) && m.kind === 'town' && m.w === 28) expandCity(id, m);
  return m;
};
function expandCity(id, m) {
  const def = TOWNS[id], W0 = m.w, H0 = m.h, W = CITY_W, H = CITY_H, st = cityStage(), bio = townBiome(id), R = rng(hashStr(id + ':cite'));
  const t = newGrid(W, H, '.');
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (y < H0 && x < W0) t[y][x] = m.t[y][x];
    else if (x < 2 || y < 2 || x >= W - 2 || y >= H - 2) t[y][x] = 'T';
  }
  // le vieux centre s'ouvre sur les nouveaux quartiers
  for (let y = 2; y < H0; y++) for (let x = W0 - 2; x < W0; x++) if (t[y][x] === 'T') t[y][x] = '.';
  for (let y = H0 - 2; y < H0; y++) for (let x = 2; x < W0; x++) if (t[y][x] === 'T') t[y][x] = '.';
  // un port garde son bassin : quai de sable autour de l'eau
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) if (t[y][x] === '.' && (x >= W0 || y >= H0)) {
    if ([[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => t[y + dy][x + dx] === '~')) t[y][x] = 's';
  }
  m.t = t; m.w = W; m.h = H; m.stage = st;
  const tp = townPal(id); if (tp) m.pal = tp;
  // déplacer les gardes et sorties prévus pour l'ancien bord
  for (const g of m.guards) g.cells = g.cells.map(([x, y]) => [x === W0 - 2 ? W - 2 : x, y === H0 - 2 ? H - 2 : y]);
  for (const n of m.npcs) { if (n.pal === PALS.guard && n.x === W0 - 3) n.x = W - 3; if (n.pal === PALS.guard && n.y === H0 - 3) n.y = H - 3; }
  const pave = (x, y) => { if (x < 1 || y < 1 || x >= W - 1 || y >= H - 1) return; const c = t[y][x]; if (c === 'x' || c === 'D' || c === 'S') return; t[y][x] = c === '~' ? '=' : ','; };
  const hline = (y, x0, x1) => { for (let x = x0; x <= x1; x++) pave(x, y); };
  const vline = (x, y0, y1) => { for (let y = y0; y <= y1; y++) pave(x, y); };
  // grandes avenues
  hline(10, W0 - 2, W - 3); hline(11, W0 - 2, W - 3);
  vline(13, H0 - 2, H - 3); vline(14, H0 - 2, H - 3);
  hline(31, 2, W - 3); hline(32, 2, W - 3);
  vline(40, 2, H - 3); vline(41, 2, H - 3);
  // sorties est et sud repoussées au nouveau bord (régions reliées par des routes)
  if (m.gates.e) for (let x = W - 3; x < W; x++) { t[10][x] = ','; t[11][x] = ','; }
  if (m.gates.s) for (let y = H - 3; y < H; y++) { t[y][13] = ','; t[y][14] = ','; }
  // bâtiments
  const cityName = def.name, accent = ['#e2703a', '#3a8fe0', '#c44a8a', '#2fa07a', '#e0b03a', '#7a5ac4'][hashStr(id) % 6];
  let resN = 0, offN = 0, facN = 0;
  const place = (kind, bx, by, bw, bh, o = {}) => {
    const dx = bx + Math.floor(bw / 2), dy = by + bh - 1;
    for (let y = by; y < by + bh; y++) for (let x = bx; x < bx + bw; x++) t[y][x] = 'x';
    t[dy][dx] = 'D'; pave(dx, dy + 1);
    const key = kind === 'res' ? 'res' + (++resN) : kind === 'office' ? 'office' + (++offN) : kind === 'factory' ? 'factory' + (++facN) : kind;
    const intId = `${id}~${key}`;
    const b = Object.assign({ kind: kind === 'res' ? 'house' : kind, x: bx, y: by, w: bw, h: bh, door: [dx, dy], accent, city: cityName, bio }, o);
    if (kind === 'res') b.roof = HOUSE_ROOFS[(hashStr(id) + resN * 3) % HOUSE_ROOFS.length];
    m.buildings.push(b);
    INT[intId] = { kind, parent: id, door: [dx, dy], sub: key, name: o.name };
    m.warps.push({ x: dx, y: dy, to: intId, enter: true });
    return b;
  };
  const sign = (x, y, text) => { if (t[y] && (t[y][x] === '.' || t[y][x] === 's')) { t[y][x] = 'S'; m.signs[x + ',' + y] = text; } };
  const site = (x0, y0, x1, y1, what) => {   // chantier du prochain agrandissement
    for (let x = x0; x <= x1; x++) for (const y of [y0, y1]) if (t[y][x] === '.') t[y][x] = 'F';
    for (let y = y0; y <= y1; y++) for (const x of [x0, x1]) if (t[y][x] === '.') t[y][x] = 'F';
    const sx = (x0 + x1) >> 1; t[y1][sx] = 'S'; m.signs[sx + ',' + y1] = `Chantier : ${what}. Ouverture prévue quand la région aura gagné en renommée.`;
  };
  const lot = (need, build, siteArgs) => { if (st >= need) build(); else if (st === need - 1 && siteArgs) site(...siteArgs); };
  const flat = { flat: 1 };
  // quartier d'affaires
  place('office', 29, 2, 4, 7, Object.assign({ floors: 4.6, name: `Tour ${cityName}` }, flat)); pave(31, 9);
  place('office', 34, 3, 5, 6, Object.assign({ floors: 3.6, name: `Centre des affaires de ${cityName}` }, flat)); pave(36, 9);
  sign(39, 9, `Quartier des affaires de ${cityName}.`);
  lot(1, () => { place('office', 43, 2, 4, 7, Object.assign({ floors: 5.2, name: `Tour du Commerce` }, flat)); pave(45, 9); }, [42, 2, 47, 8, 'une nouvelle tour de bureaux']);
  lot(3, () => { place('office', 48, 3, 4, 6, Object.assign({ floors: 6, name: `Tour Zénith-Affaires` }, flat)); pave(50, 9); }, [48, 3, 51, 8, 'la plus haute tour de la ville']);
  // centre commercial
  place('mall', 28, 13, 12, 6, Object.assign({ floors: 1.9, name: `Galeries de ${cityName}` }, flat));
  hline(19, 27, 39); sign(27, 12, `Galeries de ${cityName} : boutiques, café et tout pour les dresseurs.`);
  // maisons (10 dès le départ)
  const houseRows = (xs, rows, lane) => { for (const [ry, ly] of rows) { for (const hx of xs) place('res', hx, ry, 4, 3); if (ly != null) hline(ly, lane[0], lane[1]); } };
  houseRows([28, 33], [[20, 23], [24, 27], [28, null]], [27, 39]);                 // 6 maisons
  houseRows([2, 7], [[23, 26], [27, 30]], [2, 13]);                                  // 4 maisons
  lot(1, () => houseRows([16, 21], [[23, 26], [27, 30]], [14, 27]), [16, 23, 25, 29, 'un lotissement de quatre maisons']);
  lot(2, () => houseRows([42, 47], [[12, 15], [16, 19], [20, 23]], [41, 51]), [42, 12, 51, 22, 'le quartier des Jardins']);
  lot(3, () => houseRows([42, 47], [[24, 27], [28, null]], [41, 51]), [42, 24, 51, 30, 'un nouveau lotissement']);
  // usine et entrepôt
  const [fname] = FACTORY[bio] || FACTORY.prairie;
  place('factory', 17, 34, 9, 5, Object.assign({ floors: 2.2, name: fname }, flat)); hline(39, 14, 40);
  sign(15, 35, `${fname} de ${cityName}.`);
  lot(2, () => place('factory', 28, 34, 8, 5, Object.assign({ floors: 1.8, name: `Entrepôt de ${cityName}`, depot: 1 }, flat)), [28, 34, 35, 38, "l'entrepôt de l'usine"]);
  // parc
  lot(1, () => {
    for (let y = 34; y <= 37; y++) for (let x = 4; x <= 10; x++) t[y][x] = (y === 34 || y === 37 || x === 4 || x === 10) ? 's' : bio === 'volcan' ? ((x + y) % 3 ? 's' : 'R') : '~';
    for (const [x, y] of [[2, 34], [2, 37], [12, 34], [12, 37], [7, 39]]) if (t[y][x] === '.') t[y][x] = 'T';
    for (let i = 0; i < 10; i++) { const x = ri(R, 2, 12), y = ri(R, 33, 39); if (t[y][x] === '.') t[y][x] = 'f'; }
    sign(3, 33, `Parc de ${cityName}. Merci de ne pas nourrir les Éclos sauvages.`);
  });
  lot(3, () => { place('office', 43, 33, 4, 6, Object.assign({ floors: 4, name: `Tour Horizon` }, flat)); place('office', 48, 34, 3, 5, Object.assign({ floors: 3.2, name: `Tour Lumière` }, flat)); hline(39, 40, 51); }, [43, 33, 50, 38, 'deux tours de bureaux']);
  // réverbères le long des avenues
  for (let x = W0; x < W - 3; x += 5) for (const y of [9, 12]) if (t[y][x] === '.') t[y][x] = 'L';
  for (let y = H0; y < H - 3; y += 5) for (const x of [12, 15]) if (t[y][x] === '.') t[y][x] = 'L';
  for (let x = 4; x < W - 3; x += 6) for (const y of [30, 33]) if (t[y][x] === '.') t[y][x] = 'L';
  // un peu de verdure dans les espaces libres
  const isLane = (x, y) => [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => { const c = t[y + dy] && t[y + dy][x + dx]; return c === ',' || c === 'D' || c === '='; });
  for (let i = 0; i < 260; i++) {
    const x = ri(R, 2, W - 3), y = ri(R, 2, H - 3); if ((x < W0 && y < H0) || t[y][x] !== '.') continue;
    if (!isLane(x, y) && R() < 0.35) t[y][x] = 'T'; else if (R() < 0.5) t[y][x] = 'f';
  }
  // habitants des nouveaux quartiers
  const spots = [];
  for (let y = 3; y < H - 3; y++) for (let x = 3; x < W - 3; x++) if ((x >= W0 || y >= H0) && (t[y][x] === ',' || t[y][x] === '.') && !m.warps.some(w => w.x === x && w.y === y) && !m.warps.some(w => w.x === x && w.y === y - 1)) spots.push([x, y]);
  const lines = CITY_LINES.slice().concat([STAGE_LINES[st], (FACTORY[bio] || FACTORY.prairie)[1], `${cityName} est devenue ${STAGE_NAME[st]}.`]);
  lines.forEach((line, i) => {
    const s = spots.splice(Math.floor(R() * spots.length), 1)[0]; if (!s) return;
    m.npcs.push({ kind: 'npc', x: s[0], y: s[1], dir: pick(R, ['down', 'left', 'right', 'up']), pal: NPC_PALS[(hashStr(id) + i * 5 + 2) % NPC_PALS.length], text: line, wander: 2 });
  });
  m.signs['12,12'] = (m.signs['12,12'] || def.desc) + ` Aujourd'hui, ${STAGE_NAME[st]}.`;
}

/* ---------- La ville se régénère quand elle change de taille ---------- */
const _getMapCity = getMap;
getMap = function (id) {
  const m = MAPS[id];
  if (m && m.stage != null && m.kind === 'town' && isCity(id) && m.stage !== cityStage() && !(RT.map && RT.map.id === id)) {
    delete MAPS[id];
    if (typeof CHUNK_CACHE !== 'undefined') for (const k of [...CHUNK_CACHE.keys()]) if (k.includes(':' + id + ':')) CHUNK_CACHE.delete(k);
  }
  return _getMapCity(id);
};

/* ---------- Intérieurs des nouveaux bâtiments ---------- */
const _genInteriorCity = genInterior;
genInterior = function (id, def) {
  if (!['res', 'mall', 'factory', 'office'].includes(def.kind)) return _genInteriorCity(id, def);
  const town = TOWNS[def.parent], reg = town.reg || REGION_OF[def.parent], R = rng(hashStr(id)), bio = townBiome(def.parent);
  const grid = rows => rows.map(r => r.split(''));
  let t, W, H, mat, name = def.name || town.name, music = reg === 'brumaire' ? 'town2' : 'town1';
  const npcs = [], P = i => NPC_PALS[(hashStr(id) + i * 3) % NPC_PALS.length];
  if (def.kind === 'res') {
    const tp = INT_TPL.house; W = tp.w; H = tp.h; t = grid(tp.rows); mat = tp.mat; name = `Maison · ${town.name}`;
    const L = [
      "On a emménagé il y a peu. La ville grandit si vite qu'on se perd encore dans les nouvelles rues !",
      "Mon grand-père a connu le village quand il n'y avait que la place. Il dit que ça lui donne le tournis.",
      "Depuis la fenêtre, on voit les tours du quartier d'affaires s'allumer le soir.",
      "Je fais mes courses aux Galeries. Les vendeurs connaissent tous les Éclos par leur nom.",
      `Je travaille à l'${(FACTORY[bio] || FACTORY.prairie)[0].replace(/^(Usine|Usine de) /, 'usine ')}. On rentre tard, mais on rentre fiers.`,
      "Les Éclos sauvages viennent parfois gratter à la porte. On leur laisse des baies.",
    ];
    npcs.push({ kind: 'npc', x: 6, y: 4, dir: 'left', pal: P(1), text: pick(R, L), wander: 1 });
    if (R() < 0.6) npcs.push({ kind: 'npc', x: 2, y: 5, dir: 'right', pal: P(4), text: pick(R, L.concat(CITY_LINES)), wander: 1 });
  } else if (def.kind === 'mall') {
    W = 15; H = 10; mat = [7, 9]; name = def.name;
    t = grid(['wwwwwwwwwwwwwww', 'wwwwwwwwwwwwwww', 'cccoBBBoBBBoccc', 'ooooooooooooooo', 'ooBBoopppooBBoo', 'ooooooooooooooo', 'ottoooooooootto', 'ooooooooooooooo', 'poooooooooooooop', 'oooooookooooooo'].map(r => r.slice(0, 15)));
    npcs.push({ kind: 'npc', x: 1, y: 1, dir: 'down', pal: PALS.clerk, script: 'shop', speaker: 'Vendeur' });
    npcs.push({ kind: 'npc', x: 13, y: 1, dir: 'down', pal: PALS.clerk, script: 'shop', speaker: 'Vendeuse' });
    npcs.push({ kind: 'npc', x: 4, y: 7, dir: 'up', pal: P(2), text: "Trois étages de boutiques ! Enfin, un seul pour l'instant, mais l'idée est là.", wander: 2 });
    npcs.push({ kind: 'npc', x: 11, y: 5, dir: 'left', pal: P(5), text: "Le café du fond fait le meilleur chocolat chaud du continent. Les Éclos ont droit à une tasse aussi.", wander: 2 });
    npcs.push({ kind: 'npc', x: 7, y: 3, dir: 'down', pal: P(7), text: pick(R, CITY_LINES), wander: 2 });
  } else if (def.kind === 'factory') {
    W = 13; H = 9; mat = [6, 8]; name = def.name;
    t = grid(['wwwwwwwwwwwww', 'wwwwwwwwwwwww', 'CBBBooooBBBCo', 'ooooooooooooo', 'occcccocccccc'.slice(0, 13), 'ooooooooooooo', 'oBBooootoooBo', 'ooooooooooooo', 'ooooookoooooo']);
    const [fn, fl] = FACTORY[bio] || FACTORY.prairie;
    npcs.push({ kind: 'npc', x: 6, y: 3, dir: 'down', pal: P(1), speaker: def.depot ? 'Magasinier' : 'Contremaître', text: def.depot ? "Ici, on stocke ce qui part vers les autres villes. Plus la région grandit, plus les étagères se remplissent." : fl });
    npcs.push({ kind: 'npc', x: 2, y: 5, dir: 'right', pal: P(3), text: "On travaille en équipe avec nos Éclos. Ils portent, on règle les machines, et tout le monde a sa pause.", wander: 1 });
    npcs.push({ kind: 'npc', x: 10, y: 7, dir: 'left', pal: P(6), text: `${fn} : zéro rejet dans la nature, c'est la règle. Les champions d'arène viennent vérifier chaque saison.`, wander: 1 });
  } else {
    W = 11; H = 9; mat = [5, 8]; name = def.name;
    t = grid(['wwwwwwwwwww', 'wwwwwwwwwww', 'CotoCotoCop', 'ooooooooooo', 'tCoootCoooo', 'ooooooooooo', 'poooootCooo', 'ooooooooooo', 'oooookooooo']);
    const L = [
      "Les échanges entre les deux continents ont triplé. Le ferry ne suffit plus, on parle d'un pont.",
      "Mon métier ? Je calcule combien de Sphères chaque ville va acheter l'an prochain. Passionnant, non ?",
      "Du dernier étage, on voit jusqu'aux autres régions. Les montagnes, la mer, et même la fumée du volcan.",
      "Chaque badge gagné par un dresseur attire des visiteurs. Les champions sont bons pour les affaires.",
      "On finance le nouveau parc et les lotissements du sud. La ville doit grandir sans abîmer la nature.",
    ];
    npcs.push({ kind: 'npc', x: 5, y: 3, dir: 'down', pal: P(2), speaker: 'Accueil', text: `Bienvenue ! ${name}, accueil. Les bureaux sont aux étages, mais l'ascenseur est réservé au personnel.` });
    npcs.push({ kind: 'npc', x: 2, y: 5, dir: 'right', pal: P(4), text: pick(R, L), wander: 1 });
    npcs.push({ kind: 'npc', x: 8, y: 7, dir: 'left', pal: P(8), text: pick(rng(hashStr(id) + 7), L), wander: 1 });
  }
  const map = { id, name, kind: 'int', reg, pal: 'int', w: W, h: H, t, border: 'w', buildings: [], warps: [], npcs, signs: {}, gates: {}, guards: [], enc: {}, music, outdoor: false, env: 'indoor', parent: def.parent, sub: def.kind };
  const [dx, dy] = def.door;
  map.warps.push({ x: mat[0], y: mat[1], to: def.parent, tx: dx, ty: dy + 1, dir: 'down', exit: true });
  map.entry = [mat[0], mat[1] - 1];
  return map;
};

/* ---------- Dessin des nouveaux bâtiments ---------- */
const _drawBuildingCity = drawBuilding;
drawBuilding = function (x, b) {
  if (b.kind !== 'office' && b.kind !== 'mall' && b.kind !== 'factory') return _drawBuildingCity(x, b);
  const X = b.x * TS, Y = b.y * TS, W = b.w * TS, H = b.h * TS, dc = b.door[0] - b.x, DX = X + dc * TS, ol = '#1e2028';
  const RR = (rx, ry, w, h, c, r) => { x.fillStyle = c; x.beginPath(); x.roundRect(rx, ry, w, h, r || 0); x.fill(); };
  x.fillStyle = 'rgba(0,0,0,0.22)'; x.beginPath(); x.ellipse(X + W / 2 + 2, Y + H, W / 2 + 3, 4, 0, 0, 7); x.fill();
  if (b.kind === 'office') {
    RR(X + 1, Y + 1, W - 2, H - 1, ol, 2);
    const g = x.createLinearGradient(X, 0, X + W, 0); g.addColorStop(0, '#4a6a9a'); g.addColorStop(0.5, '#3a5684'); g.addColorStop(1, '#2a4068');
    RR(X + 2, Y + 5, W - 4, H - 6, g, 1);
    RR(X + 1, Y + 1, W - 2, 5, '#8a8f98', 2); x.fillStyle = '#6a6f78'; x.fillRect(X + 1, Y + 5, W - 2, 1);
    const R = rng(hashStr(b.x + ',' + b.y));
    for (let yy = Y + 8; yy < Y + H - 18; yy += 6) for (let xx = X + 4; xx < X + W - 6; xx += 5) {
      x.fillStyle = R() < 0.3 ? '#d6ecff' : '#9fd0f0'; x.fillRect(xx, yy, 3.5, 4);
    }
    x.fillStyle = 'rgba(255,255,255,.12)'; x.fillRect(X + 3, Y + 6, 3, H - 10);
    // hall d'entrée vitré et auvent
    RR(X + 3, Y + H - 15, W - 6, 2.5, b.accent || '#e2703a', 1);
    RR(DX - 2, Y + H - 12, 20, 12, ol, 1); RR(DX - 1, Y + H - 11, 18, 11, '#9fd8ec'); x.fillStyle = '#4a7a90'; x.fillRect(DX + 7.5, Y + H - 11, 1, 11);
    RR(DX - 4, Y + H - 14, 24, 2.5, '#d8d8de', 1);
    return;
  }
  if (b.kind === 'mall') {
    RR(X + 1, Y + 2, W - 2, H - 2, ol, 3);
    RR(X + 2, Y + 3, W - 4, H - 4, '#efe6d6', 2);
    RR(X + 1, Y + 1, W - 2, 6, '#b8b0a4', 3); x.fillStyle = '#9a9286'; x.fillRect(X + 1, Y + 6, W - 2, 1);
    // bandeau d'enseigne coloré
    RR(X + 6, Y + 9, W - 12, 9, b.accent || '#e2703a', 2);
    x.fillStyle = '#ffffff'; for (let i = 0; i < 8; i++) x.fillRect(X + W / 2 - 26 + i * 7, Y + 12, 4.5, 3);
    // grande façade vitrée
    const gy = Y + 22, gh = H - 24;
    RR(X + 4, gy, W - 8, gh, '#5a7a90', 1);
    const gg = x.createLinearGradient(0, gy, 0, gy + gh); gg.addColorStop(0, '#c8ecff'); gg.addColorStop(1, '#7ac0e8');
    RR(X + 5, gy + 1, W - 10, gh - 2, gg);
    x.fillStyle = '#5a7a90'; for (let xx = X + 5 + 12; xx < X + W - 6; xx += 12) x.fillRect(xx, gy + 1, 1.2, gh - 2);
    x.fillStyle = 'rgba(255,255,255,.35)'; x.fillRect(X + 8, gy + 3, 2, gh - 8);
    // auvents rayés
    for (let k = 0; k < Math.floor((W - 10) / 6); k++) { x.fillStyle = k % 2 ? '#ffffff' : (b.accent || '#e2703a'); x.fillRect(X + 5 + k * 6, gy - 4, 6, 4); }
    RR(DX - 4, Y + H - 15, 24, 15, ol, 1); RR(DX - 3, Y + H - 14, 22, 14, '#9fd8ec'); x.fillStyle = '#4a7a90'; x.fillRect(DX + 7.5, Y + H - 14, 1, 14);
    return;
  }
  // usine : briques, toit en dents de scie, cheminées, grande porte roulante
  RR(X + 1, Y + 5, W - 2, H - 5, ol, 2);
  RR(X + 2, Y + 6, W - 4, H - 7, '#a85a44', 1);
  x.fillStyle = 'rgba(60,20,10,.35)'; for (let yy = Y + 9; yy < Y + H - 2; yy += 4) x.fillRect(X + 2, yy, W - 4, 0.8);
  for (let k = 0; k < Math.ceil((W - 2) / 12); k++) { const sx = X + 1 + k * 12; x.fillStyle = '#7a7a82'; x.beginPath(); x.moveTo(sx, Y + 7); x.lineTo(sx + 12, Y + 7); x.lineTo(sx + 12, Y + 1); x.closePath(); x.fill(); x.fillStyle = '#9fd0f0'; x.fillRect(sx + 10, Y + 2.5, 1.5, 4); }
  for (const k of [0.22, 0.78]) { const cx = X + W * k; RR(cx - 3, Y - 10, 6, 17, '#8a5a4a', 1); RR(cx - 3.5, Y - 11, 7, 2.5, '#3a2a24', 1); x.fillStyle = 'rgba(200,200,210,.55)'; x.beginPath(); x.arc(cx + 2, Y - 15, 4, 0, 7); x.arc(cx + 6, Y - 19, 3, 0, 7); x.fill(); }
  for (let xx = X + 6; xx < X + W - 8; xx += 10) if (Math.abs(xx - DX) > 14) { RR(xx, Y + 14, 7, 6, '#3a2a24', 1); RR(xx + 1, Y + 15, 5, 4, '#9fd0f0'); }
  RR(DX - 5, Y + H - 18, 26, 18, '#3a3a42', 1);
  x.fillStyle = '#8a8a94'; for (let yy = Y + H - 17; yy < Y + H - 1; yy += 2.5) x.fillRect(DX - 4, yy, 24, 1.4);
  RR(DX - 6, Y + H - 21, 28, 3, b.depot ? '#3a8fe0' : '#e2b03a', 1);
};
