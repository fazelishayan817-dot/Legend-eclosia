'use strict';
/* ============================================================
   ÉCLOSIA — huit arènes des Terres voisines
   Huit champions venus des Quatre Terres d'origine tiennent une
   arène dans les terres des Sceaux (Verdeval, Azurie, Ferrhaven,
   Givrecime). Leurs badges sont nécessaires pour entrer à la Ligue :
   seize badges en tout.
   ============================================================ */
const ARENES_VOISINES = [
  { town: 'q00', type: 'combat', leader: 'Bastien', badge: 'Badge Poigne', lvl: 13, n: 3, land: 0,
    intro: "Ormeval, c'est la ville des bras solides. Ici, on ne recule pas d'un pas. Toi non plus, j'espère !",
    lose: "Tu as tenu debout. C'est tout ce que je demande. Prends ce badge." },
  { town: 'q01', type: 'vent', leader: 'Aéla', badge: 'Badge Brise', lvl: 15, n: 3, land: 0,
    intro: "Le vent de Pré-Lumière porte mes créatures. Sauras-tu seulement les rattraper ?",
    lose: "Tu voles plus haut que moi... Le vent a choisi ton camp." },
  { town: 'q10', type: 'roc', leader: 'Sirocco', badge: 'Badge Dune', lvl: 22, n: 4, land: 1,
    intro: "Les dunes de Sablebrume avalent les imprudents. J'ai vu des caravanes entières disparaître. Avance avec prudence.",
    lose: "Le sable s'est retourné contre moi. Garde ce badge, il porte la chaleur du désert." },
  { town: 'q12', type: 'ombre', leader: 'Nérée', badge: 'Badge Récif', lvl: 24, n: 4, land: 1,
    intro: "Sous Île-Basse, les courants noirs ont englouti plus de bateaux que la tempête. Mes créatures viennent de là-dessous.",
    lose: "Tu remontes toujours à la surface, toi. Le récif te laisse passer." },
  { town: 'q30', type: 'foudre', leader: 'Kai', badge: 'Badge Orage', lvl: 31, n: 4, land: 2,
    intro: "J'ai grandi sur les îles, sous les plus beaux orages du monde. Ferrhaven m'a donné des machines pour les recharger !",
    lose: "Court-circuit ! Ha, c'était magnifique. Le badge est à toi." },
  { town: 'q31', type: 'acier', leader: 'Ulric', badge: 'Badge Rivet', lvl: 33, n: 5, land: 2,
    intro: "Je forge mes créatures comme des lames, dans la rouille de ce port. Prêt·e à plier ?",
    lose: "Du bel ouvrage. Le métal reconnaît un dresseur solide." },
  { town: 'q21', type: 'toxine', leader: 'Rosalie', badge: 'Badge Rose', lvl: 42, n: 5, land: 3,
    intro: "Mes créatures dansent au bord du Lac-Opale. Regarde-les bien... et sens ta défense s'endormir.",
    lose: "Tu n'as pas fermé les yeux. Bravo. Cette rose ne fanera pas." },
  { town: 'q22', type: 'lumiere', leader: 'Clarté', badge: 'Badge Aube', lvl: 46, n: 5, land: 3,
    intro: "À Neigebourg, la première lumière du jour se reflète sur la neige. Elle révèle les cœurs sincères. Voyons le tien.",
    lose: "Ton cœur est clair. Va. La Ligue t'attend, maintenant." },
];
const AV_FRAG = [0, 1, 2, 3];   // Verdeval, Azurie, Ferrhaven, Givrecime (index dans FRAG)
const AV_IDX = [];
const AV_TOWNS = new Set(ARENES_VOISINES.map(a => a.town));
ARENES_VOISINES.forEach(a => {
  if (!TOWNS[a.town]) return;
  const team = vetTeam(a.type, a.lvl, a.n, 'av:' + a.town);
  GYMS.push({ town: a.town, type: a.type, leader: a.leader, badge: a.badge, team, intro: a.intro, lose: a.lose, voisine: true });
  const i = GYMS.length - 1; GYMS[i].idx = i; TOWNS[a.town].gym = i; AV_IDX.push(i); a.idx = i;
});
const deV = w => (/^[AEIOUYÉÈÊÂÎÔaeiouyéèêh]/.test(w) ? "d'" : 'de ') + w;
const avBadges = () => AV_IDX.filter(i => G && G.badges[i]).length;

// ces villes ne bloquent pas leur sortie : on y arrive par le Passeur, dans n'importe quel ordre
const _genTownAV = genTown;
genTown = function (id) {
  const m = _genTownAV(id);
  if (AV_TOWNS.has(id)) { m.guards = []; m.npcs = m.npcs.filter(n => n.pal !== PALS.guard); }
  return m;
};

// la Ligue demande les seize badges
const _trainerBattleAV = trainerBattle;
trainerBattle = async function (n, spotted) {
  if (n && n.trainer && n.trainer.flag === 'st_elite1' && avBadges() < AV_IDX.length) {
    const miss = ARENES_VOISINES.filter(a => !G.badges[a.idx]).map(a => `${a.leader} (${TOWNS[a.town].name})`);
    await say(`Il te manque encore ${miss.length} badge${miss.length > 1 ? 's' : ''} des Terres voisines : ${miss.join(', ')}. Le Passeur des Coutures peut t'y emmener. La Ligue exige les seize badges.`, { speaker: 'Garde de la Ligue' });
    return 'gate';
  }
  return _trainerBattleAV(n, spotted);
};

// Chronique : chaque arène s'ajoute à son chapitre, et le guide passe par le Passeur
(function chroniqueAV() {
  if (typeof CHAPTERS === 'undefined') return;
  const step = a => ({
    t: () => `Badge ${/^[AEIOUYÉÈÊÂÎÔaeiouyéèêh]/.test(a.leader) ? "d'" : 'de '}${a.leader} (${TOWNS[a.town].name})`,
    done: () => !!G.badges[a.idx],
    goal: () => {
      const f = FRAG[AV_FRAG[a.land]];
      if (RT.map && RT.map.reg === f.reg) return { map: a.town, txt: `Arène ${deV(TOWNS[a.town].name)} : ${a.leader}, type ${TN[a.type]}.`, door: 'gym' };
      if (!f.unlock()) return null;
      return { map: '__frag', txt: `Arène ${deV(TOWNS[a.town].name)} (${f.land}) : le Passeur des Coutures, en ville, t'y emmène. ${a.leader} t'attend.`, npc: 'passeur', frag: f.i };
    },
  });
  const put = (ch, afterTest, list, h) => {
    const c = CHAPTERS[ch]; if (!c) return;
    let k = c.steps.findIndex(afterTest); k = k < 0 ? c.steps.length - 1 : k + 1;
    c.steps.splice(k, 0, ...list.map(step)); c.h += h;
  };
  const A = ARENES_VOISINES.filter(a => a.idx != null);
  put(0, s => s.frag === 0, A.filter(a => a.land === 0), 2);
  put(1, s => s.frag === 1, A.filter(a => a.land === 1), 2);
  put(1, s => s.frag === 2, A.filter(a => a.land === 2), 2);
  put(2, s => s.frag === 3, A.filter(a => a.land === 3), 2);
  if (typeof POSTGAME !== 'undefined') for (const q of POSTGAME) {
    if (q.t === 'Ligue des Échos') q.d = `Les ${GYMS.length} champions d'arène t'attendent pour une revanche.`;
    if (q.t === 'Codex') q.d = `${DEX.length} créatures. Les assistants du Prof. Sauge et de la Pr Ysée récompensent chaque palier.`;
  }
})();
