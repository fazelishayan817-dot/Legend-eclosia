'use strict';
/* Équipes ajustées après les familles d'évolution : chaque dresseur garde son type. */
(function(){ const P = [["GYMS", "7", "wyvernel", "org_sb21"], ["GYMS", "11", "ranaqua", "org_c43"], ["GYMS", "11", "lupaladin", "gal46"], ["GYMS", "11", "pantharcane", "org_e01"], ["GYMS", "14", "medusoraire", "org_c59"], ["GYMS", "16", "rouillemort", "org_c14"], ["GYMS", "19", "scarabolide", "gal19"], ["STORY_TRAINERS", "reve_oniris", "oursonge", "org_e22"], ["STORY_TRAINERS", "gaetan", "medusoraire", "gal77"]];
for (const [tbl, k, from, to] of P) { const o = tbl === 'GYMS' ? GYMS[+k] : STORY_TRAINERS[k]; if (!o || !SP[to]) continue; for (const m of o.team) if (m[0] === from) { m[0] = to; break; } }
})();
