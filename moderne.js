'use strict';
/* ============================================================
   ÉCLOSIA — modernisation de l'interface et du rythme
   1. Radar GPS circulaire et encart « Objectif actuel » dans l'écran
   2. Boîte PC façon 7G : équipe + boîte sur le même écran, glisser-déposer,
      toucher pour échanger, statistiques et attaques instantanées
   3. Événements entre les arènes : embuscades de Nova, sauvetages, enquêtes
   ============================================================ */

/* ---------- 1. Radar et objectif ---------- */
const HUDX = { obj: null, radar: null, open: true };
function hudxInit() {
  const screen = document.getElementById('screen'); if (!screen || HUDX.obj) return;
  try { const v = localStorage.getItem('eclosia_obj'); if (v != null) HUDX.open = v === '1'; } catch (e) { }
  const o = document.createElement('div'); o.id = 'objx'; o.setAttribute('role', 'button'); o.setAttribute('aria-label', 'Objectif actuel : afficher ou masquer');
  o.innerHTML = '<div class="oh"><i></i><span>Objectif actuel</span><b>−</b></div><div class="ot"></div><div class="od"></div>';
  o.addEventListener('pointerdown', e => { e.stopPropagation(); HUDX.open = !HUDX.open; try { localStorage.setItem('eclosia_obj', HUDX.open ? '1' : '0'); } catch (e2) { } hudxText(true); });
  screen.appendChild(o); HUDX.obj = o;
  const r = document.createElement('div'); r.id = 'radarx'; r.setAttribute('aria-label', 'Radar');
  r.innerHTML = '<canvas width="168" height="168"></canvas>';
  r.addEventListener('pointerdown', e => { e.stopPropagation(); if (RT.mode === 'overworld' && !RT.busy && typeof atlasScreen === 'function' && G) run(() => atlasScreen()); });
  screen.appendChild(r); HUDX.radar = r; HUDX.cv = r.querySelector('canvas');
  const c = document.createElement('div'); c.id = 'clockx'; screen.appendChild(c); HUDX.clock = c;
  const loop = () => { try { hudxTick(); } catch (e) { } setTimeout(() => requestAnimationFrame(loop), 50); };
  loop();
}
let HUDX_LAST = '';
function hudxText(force) {
  const I = (typeof GPS !== 'undefined' && GPS.info) || {}, o = HUDX.obj;
  const key = (I.txt || '') + '|' + (I.label || '') + '|' + HUDX.open;
  if (!force && key === HUDX_LAST) return; HUDX_LAST = key;
  o.classList.toggle('closed', !HUDX.open); o.querySelector('b').textContent = HUDX.open ? '−' : '+';
  o.querySelector('.ot').textContent = I.txt || 'Explore librement.';
  o.querySelector('.od').textContent = I.pt && I.label ? '→ ' + I.label : '';
}
function hudxTick() {
  const live = typeof G !== 'undefined' && G && RT.map && RT.P && RT.mode === 'overworld' && !(typeof STORY !== 'undefined' && STORY);
  const show = live && UI.stack.length === 0 && !document.querySelector('#ui .panel, #ui .menu');   // masqués pendant menus et dialogues
  HUDX.obj.style.display = HUDX.radar.style.display = HUDX.clock.style.display = show ? '' : 'none';
  const hb = document.getElementById('hd3dbtn'); if (hb) hb.style.display = (RT.mode === 'overworld' || RT.mode === 'battle') && !document.querySelector('#ui .panel, #ui .menu') ? '' : 'none';
  if (!show) return;
  const W = { clair: 'Ciel clair', pollen: 'Pollen', pluie: 'Pluie', brume: 'Brume', neige: 'Neige' }[window.H3D && H3D.mode && !H3D.failed ? H3D.weather : ''] || '';
  const tn = typeof TOD_NAME !== 'undefined' && typeof timeOfDay === 'function' ? TOD_NAME[timeOfDay()] : '';
  const ct = [tn, W].filter(Boolean).join(' · '); if (HUDX.clock.textContent !== ct) HUDX.clock.textContent = ct; HUDX.clock.style.display = ct ? '' : 'none';
  hudxText();
  // radar : mini-carte du GPS recadrée autour du joueur, dans un cercle
  const cv = HUDX.cv, x = cv.getContext('2d'), R = cv.width / 2, src = GPS.cv, P = RT.P, S = 4, Z = 1.9, I = GPS.info || {};
  x.clearRect(0, 0, cv.width, cv.height); x.save(); x.beginPath(); x.arc(R, R, R - 3, 0, 7); x.clip();
  x.fillStyle = '#16231d'; x.fillRect(0, 0, cv.width, cv.height);
  const px = P.px / TS + 0.5, py = P.py / TS + 0.5;
  if (src && src.width > 4) { x.imageSmoothingEnabled = false; x.globalAlpha = 0.95; x.drawImage(src, R - px * S * Z, R - py * S * Z, src.width * Z, src.height * Z); x.globalAlpha = 1; }
  const tod = typeof timeOfDay === 'function' ? timeOfDay() : 'day';
  if (tod === 'night' && RT.map.kind !== 'int') { x.fillStyle = 'rgba(10,16,48,.35)'; x.fillRect(0, 0, cv.width, cv.height); }
  // points d'intérêt : soin, boutique, arène
  const poi = (tx, ty, col, lab) => { const a = R + (tx + 0.5 - px) * S * Z, b = R + (ty + 0.5 - py) * S * Z; if ((a - R) ** 2 + (b - R) ** 2 > (R - 12) ** 2) return; x.fillStyle = col; x.beginPath(); x.arc(a, b, 7, 0, 7); x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 2; x.stroke(); x.fillStyle = '#fff'; x.font = 'bold 9px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(lab, a, b + 0.5); };
  for (const b of RT.map.buildings || []) { if (b.kind === 'center') poi(b.door[0], b.door[1], '#e0504a', '+'); else if (b.kind === 'mart' || b.kind === 'shop') poi(b.door[0], b.door[1], '#3a7ad0', '$'); else if (b.kind === 'gym') poi(b.door[0], b.door[1], '#7a4ad0', 'A'); }
  // objectif : cercle pulsant, ou flèche lumineuse sur le bord
  const t = performance.now() / 1000;
  if (I.pt) { const a = R + (I.pt[0] + 0.5 - px) * S * Z, b = R + (I.pt[1] + 0.5 - py) * S * Z, dx = a - R, dy = b - R, d = Math.hypot(dx, dy);
    if (d < R - 16) { x.strokeStyle = '#ffd86a'; x.lineWidth = 3; x.beginPath(); x.arc(a, b, 7 + Math.sin(t * 5) * 2, 0, 7); x.stroke(); }
    else { const an = Math.atan2(dy, dx); x.save(); x.translate(R + Math.cos(an) * (R - 15), R + Math.sin(an) * (R - 15)); x.rotate(an); x.shadowColor = '#ffd86a'; x.shadowBlur = 10; x.fillStyle = '#ffd86a'; x.beginPath(); x.moveTo(11, 0); x.lineTo(-7, -8); x.lineTo(-3, 0); x.lineTo(-7, 8); x.closePath(); x.fill(); x.restore(); } }
  x.restore();
  // joueur et nord
  x.save(); x.translate(R, R); x.rotate({ right: 0, down: Math.PI / 2, left: Math.PI, up: -Math.PI / 2 }[P.dir] || 0); x.fillStyle = '#fff'; x.strokeStyle = '#1a1424'; x.lineWidth = 2; x.beginPath(); x.moveTo(9, 0); x.lineTo(-6, -7); x.lineTo(-3, 0); x.lineTo(-6, 7); x.closePath(); x.stroke(); x.fill(); x.restore();
  x.strokeStyle = 'rgba(255,255,255,.7)'; x.lineWidth = 3; x.beginPath(); x.arc(R, R, R - 3, 0, 7); x.stroke();
  x.fillStyle = '#ff6f59'; x.font = 'bold 13px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('N', R, 13);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hudxInit); else hudxInit();

/* ---------- 2. Boîte PC façon 7G ---------- */
const PCX_PAGE = 30;
pcScreen = async function () {
  sfx('select');
  await say(`${G.name} allume le PC. Boîte de stockage ouverte.`, { auto: 500 });
  return new Promise(res => {
    const p = el('panel pcx', 0, 0, 240, 160);
    let page = 0, cur = { a: 'p', i: 0 }, held = null, msg = '';
    const pages = () => Math.max(1, Math.ceil((G.box.length + 1) / PCX_PAGE));
    const get = s => (s.a === 'p' ? G.party[s.i] : G.box[s.i]);
    const same = (a, b) => a && b && a.a === b.a && a.i === b.i;
    function moveMon(from, to) {
      if (same(from, to)) return true;
      const A = from.a === 'p' ? G.party : G.box, Bv = to.a === 'p' ? G.party : G.box, m = A[from.i], o = Bv[to.i]; if (!m) return false;
      const party = G.party.slice(), box = G.box.slice(), arr = a => (a === 'p' ? party : box);
      if (o) { arr(from.a)[from.i] = o; arr(to.a)[to.i] = m; }
      else { arr(from.a).splice(from.i, 1); arr(to.a).push(m); }
      if (!party.length || !party.some(mm => mm.hp > 0)) { msg = 'Il faut garder au moins une créature en forme dans l\'équipe.'; sfx('bump'); return false; }
      if (party.length > 6) { msg = 'L\'équipe est limitée à six créatures.'; sfx('bump'); return false; }
      for (const mm of box) if (G.box.indexOf(mm) < 0) healMon(mm);
      G.party.length = 0; party.forEach(mm => G.party.push(mm)); G.box.length = 0; box.forEach(mm => G.box.push(mm));
      msg = o ? `${monName(m)} et ${monName(o)} échangent leur place.` : to.a === 'p' ? `${monName(m)} rejoint l'équipe.` : `${monName(m)} est rangé dans la boîte.`;
      sfx('select'); return true;
    }
    const detail = m => {
      if (!m) return `<div class="pxd empty">Choisis une créature pour voir ses statistiques.<br><br>Toucher : choisir puis déposer. Glisser : déplacer. A : prendre ou poser, B : quitter.</div>`;
      const st = calcStats(m), L = { hp: 'PV', atk: 'Atq', def: 'Déf', spa: 'Atq.S', spd: 'Déf.S', spe: 'Vit' };
      return `<div class="pxd"><div class="pxdt"><img src="${monURL(m.sp, m.shiny)}" alt=""><div><div class="pxdn">${esc(monName(m))} <small>N.${m.lvl}</small></div><div>${SP[m.sp].types.map(typePill).join('')}</div>
        <div class="pxbar"><i style="width:${Math.max(0, m.hp / st.hp) * 100}%;background:${hpColor(m.hp / st.hp)}"></i></div><small>${m.hp} / ${st.hp} PV ${statusPill(m.status)}</small></div></div>
        <div class="pxst">${Object.keys(L).map(k => `<span>${L[k]}</span><b>${st[k]}</b><i><u style="width:${Math.min(100, st[k] / (m.lvl * 2.2 + 20) * 100)}%"></u></i>`).join('')}</div>
        <div class="pxmv">${m.moves.map(mv => { const M = MOVES[mv.id]; return M ? `<div style="--tc:${TC[M.t]}"><span>${esc(M.n)}</span><small>${TN[M.t]} · ${M.pw ? 'Puiss. ' + M.pw : 'Statut'} · PP ${mv.pp}/${M.pp}</small></div>` : ''; }).join('')}</div></div>`;
    };
    const slot = (a, i) => { const m = a === 'p' ? G.party[i] : G.box[i], s = { a, i }, on = same(cur, s), h = held && same(held, s);
      return `<div class="pxs${on ? ' cur' : ''}${h ? ' held' : ''}${m && m.hp <= 0 ? ' ko' : ''}" data-a="${a}" data-i="${i}">${m ? `<img src="${monURL(m.sp, m.shiny)}" alt="" draggable="false"><em>${m.lvl}</em>` : ''}</div>`; };
    const render = () => {
      if (page >= pages()) page = pages() - 1;
      const base = page * PCX_PAGE, focus = held ? get(held) : get(cur);
      p.innerHTML = `<div class="pxh"><b>Boîte PC</b><span class="pxpg"><i data-pg="-1">‹</i>Boîte ${page + 1}/${pages()}<i data-pg="1">›</i></span><span class="pxn">Équipe ${G.party.length}/6 · ${G.box.length} rangées</span><i class="pxclose" data-x="1">×</i></div>
        <div class="pxcols"><div class="pxparty"><small>Équipe</small>${[0, 1, 2, 3, 4, 5].map(i => slot('p', i)).join('')}</div>
        <div class="pxgrid">${Array.from({ length: PCX_PAGE }, (_, k) => slot('b', base + k)).join('')}</div>${detail(focus)}</div>
        <div class="pxmsg">${held ? `Tu tiens ${esc(monName(get(held)))} : choisis où le poser.` : esc(msg)}</div>`;
    };
    const act = s => {
      if (held) { if (moveMon(held, s)) { held = null; } else if (same(held, s)) held = null; }
      else if (get(s)) { held = s; msg = ''; sfx('select'); }
      cur = s; render();
    };
    const close = () => { uiPop(h); p.remove(); window.removeEventListener('pointermove', pmv); window.removeEventListener('pointerup', pup); res(); };
    const h = {
      press(b) {
        const col = cur.a === 'p' ? -1 : (cur.i - page * PCX_PAGE) % 6, row = cur.a === 'p' ? cur.i : Math.floor((cur.i - page * PCX_PAGE) / 6);
        if (b === 'b') { if (held) { held = null; render(); sfx('cancel'); } else { sfx('cancel'); close(); } return; }
        if (b === 'a') { act(cur); return; }
        if (cur.a === 'p') {
          if (b === 'up') cur = { a: 'p', i: (cur.i + 5) % 6 }; else if (b === 'down') cur = { a: 'p', i: (cur.i + 1) % 6 };
          else if (b === 'right') cur = { a: 'b', i: page * PCX_PAGE + Math.min(4, cur.i) * 6 };
          else if (b === 'left' && page > 0) { page--; }
        } else {
          let c = col, r = row;
          if (b === 'up') r = (r + 4) % 5; else if (b === 'down') r = (r + 1) % 5;
          else if (b === 'left') { if (c === 0) { cur = { a: 'p', i: Math.min(5, r) }; sfx('move'); render(); return; } c--; }
          else if (b === 'right') { if (c === 5) { if (page < pages() - 1) { page++; c = 0; } } else c++; }
          cur = { a: 'b', i: page * PCX_PAGE + r * 6 + c };
        }
        sfx('move'); render();
      },
    };
    // souris et doigt : toucher pour choisir/poser, ou glisser-déposer
    let drag = null; const ghost = document.createElement('div'); ghost.className = 'pxghost'; p.appendChild(ghost);
    p.addEventListener('pointerdown', e => {
      const pg = e.target.closest('[data-pg]'); if (pg) { e.preventDefault(); page = Math.max(0, Math.min(pages() - 1, page + +pg.dataset.pg)); sfx('move'); render(); p.appendChild(ghost); return; }
      if (e.target.closest('[data-x]')) { e.preventDefault(); close(); return; }
      const d = e.target.closest('[data-a]'); if (!d) return; e.preventDefault(); e.stopPropagation();
      const s = { a: d.dataset.a, i: +d.dataset.i };
      drag = { s, x: e.clientX, y: e.clientY, moved: false, m: get(s) };
    });
    const pmv = e => { if (!drag || !drag.m) return; if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 10 && !drag.moved) { drag.moved = true; held = drag.s; render(); p.appendChild(ghost); ghost.innerHTML = `<img src="${monURL(drag.m.sp, drag.m.shiny)}" alt="">`; ghost.style.display = 'block'; }
      if (drag.moved) { const r = p.getBoundingClientRect(); ghost.style.left = (e.clientX - r.left) + 'pxclose'; ghost.style.top = (e.clientY - r.top) + 'pxclose'; } };
    const pup = e => { if (!drag) return; const d0 = drag; drag = null; ghost.style.display = 'none';
      if (d0.moved) { const t = document.elementFromPoint(e.clientX, e.clientY), d = t && t.closest('[data-a]'); if (d) { const s = { a: d.dataset.a, i: +d.dataset.i }; if (!moveMon(d0.s, s)) { } held = null; cur = s; } else held = null; render(); p.appendChild(ghost); }
      else { act(d0.s); p.appendChild(ghost); } };
    window.addEventListener('pointermove', pmv); window.addEventListener('pointerup', pup);
    uiPush(h); render(); p.appendChild(ghost);
  });
};

/* ---------- 3. Événements entre les arènes ---------- */
const IEV_KINDS = ['embuscade', 'sauvetage', 'enquete'];
function ievLevel() { const ps = G.party.filter(m => m); return Math.max(5, Math.min(95, Math.round(ps.reduce((a, m) => a + m.lvl, 0) / Math.max(1, ps.length)) + 1)); }
function ievPending() {
  if (!G || !G.badges || !RT.map || RT.map.kind !== 'route' || RT.map.big) return null;
  const reg = REGION_OF[RT.map.id]; if (reg !== 'solvene' && reg !== 'brumaire') return null;
  if (G.era || (typeof STORY !== 'undefined' && STORY)) return null;
  const b = G.badges.filter(Boolean).length; if (b < 1 || b > 24) return null;
  const k = 'iev_' + b; if (G.flags[k]) return null;
  return { b, k, kind: IEV_KINDS[(b - 1) % 3] };
}
function ievFreeSpot(m, near) {
  const R0 = rng(hashStr(m.id + ':iev')), P = RT.P;
  for (let tries = 0; tries < 400; tries++) {
    const x = near ? P.x + Math.round((R0() - 0.5) * 10) : 1 + Math.floor(R0() * (m.w - 2)), y = near ? P.y + Math.round((R0() - 0.5) * 8) : 1 + Math.floor(R0() * (m.h - 2));
    if (x < 1 || y < 1 || x >= m.w - 1 || y >= m.h - 1) continue;
    const c = m.t[y][x]; if (c !== '.' && c !== ',' && c !== '"') continue;
    if (Math.abs(x - P.x) + Math.abs(y - P.y) < 2) continue;
    if (RT.npcs.some(n => n.x === x && n.y === y) || m.npcs.some(n => n.x === x && n.y === y)) continue;
    return [x, y];
  }
  return null;
}
async function ievRun(ev) {
  const m = RT.map, lvl = ievLevel(), nextGym = GYMS[ev.b] || GYMS[GYMS.length - 1], typ = (nextGym && nextGym.type) || 'normal';
  G.flags[ev.k] = 1;
  if (ev.kind === 'embuscade') {
    sfx('exclaim');
    await say(`${G.rival} : Hé ! Pas si vite. Tu crois filer vers la prochaine arène sans passer par moi ?`, { speaker: G.rival });
    await say(`${G.rival} : ${nextGym ? `On dit que ${nextGym.leader} aime le type ${TN[typ]}. ` : ''}Montre-moi que tu es prêt·e.`, { speaker: G.rival });
    const team = [['$S', lvl + 1]].concat(vetTeam(typ, lvl, 2, 'iev' + ev.b));
    const n = { kind: 'trainer', x: RT.P.x, y: RT.P.y, pal: PALS.rival, trainer: { cls: 'rival', name: G.rival, team, intro: "Pas de quartier !", lose: "Tch... Encore toi. D'accord, tu as progressé.", after: "La prochaine arène t'attend. Ne me fais pas honte.", flag: ev.k + '_win', money: 80 } };
    const r = await trainerBattle(n, false);
    if (r === 'win') { G.money += 300 + lvl * 20; addItem('superbaume', 2); sfx('item'); await say(`${G.rival} te lance deux Super Baumes et ${300 + lvl * 20} écus : « Pour ton prochain combat. »`); }
    return;
  }
  if (ev.kind === 'sauvetage') {
    sfx('exclaim');
    await say("À l'aide ! Quelqu'un ! Une créature sauvage a coincé mon petit frère près des hautes herbes !", { speaker: 'Voix paniquée' });
    const foeSp = evolveForLevel(pick(Math.random, vetTeam(typ, lvl + 2, 1, 'res' + ev.b).map(e => e[0])), lvl + 2);
    await say(`Un ${SP[foeSp].n} enragé barre le chemin ! Il faut le calmer.`);
    const res = await runBattle({ kind: 'wild', foes: [makeMon(foeSp, lvl + 2, { goodIv: true })], env: envHere(), noRun: true });
    if (res === 'lose') { await whiteout(); G.flags[ev.k] = 0; return; }
    await say("Le petit garçon court se réfugier dans les bras de sa sœur.");
    await say("Merci, merci ! Prends ça, c'est tout ce qu'on a de précieux.", { speaker: 'Grande sœur' });
    addItem('hypersphere', 2); addItem('superbaume', 1); sfx('item'); await say("Tu reçois 2 Hyper Sphères et 1 Super Baume !");
    return;
  }
  // enquête : trois indices à trouver sur la route, puis le coupable
  G.flags[ev.k] = 0;   // l'enquête se termine quand le coupable est vaincu
  if (G.flags[ev.k + '_open']) return;
  G.flags[ev.k + '_open'] = m.id; G.flags[ev.k + '_n'] = 0;
  await say("Un garde t'interpelle : « Des œufs de créatures ont disparu de la pension. Les traces mènent sur cette route. Tu veux bien jeter un œil ? »", { speaker: 'Garde' });
  ievPlaceClues(m, ev.k);
  await say("Trois indices brillent quelque part sur la route. Trouve-les tous.");
}
function ievPlaceClues(m, k) {
  if (m.npcs.some(n => n.iev === k)) return;
  for (let c = 0; c < 3; c++) { if (G.flags[k + '_c' + c]) continue; const sp = ievFreeSpot(m, false); if (!sp) continue;
    m.npcs.push({ kind: 'npc', x: sp[0], y: sp[1], dir: 'down', iev: k, clue: c, script: 'ievClue', cond: () => !G.flags[k + '_c' + c] && !G.flags[k],
      draw: (x, sx, sy) => { const t = RT.frame / 12; x.fillStyle = `rgba(255,216,106,${0.55 + 0.35 * Math.sin(t)})`; x.beginPath(); x.arc(sx + 8, sy + 10, 3.2 + Math.sin(t) * 0.8, 0, 7); x.fill(); x.fillStyle = '#fff'; x.fillRect(sx + 7, sy + 9, 2, 2); } }); }
  refreshNpcs();
}
const IEV_CLUES = ["Une coquille d'œuf brisée, encore tiède.", "Des empreintes de bottes, avec un symbole de racine gravé sur la semelle.", "Un bout de tissu lie-de-vin accroché à une branche. L'Ordre Racine…"];
SCRIPTS.ievClue = async function (n) {
  const k = n.iev; G.flags[k + '_c' + n.clue] = 1; G.flags[k + '_n'] = (G.flags[k + '_n'] || 0) + 1; sfx('item');
  await say(`Indice ${G.flags[k + '_n']}/3 : ${IEV_CLUES[n.clue]}`); refreshNpcs();
  if (G.flags[k + '_n'] < 3) return;
  await say("Les indices mènent à un buisson qui bouge…"); sfx('exclaim');
  const lvl = ievLevel(), b = +k.split('_')[1], typ = (GYMS[b] && GYMS[b].type) || 'ombre';
  const thief = { kind: 'trainer', x: RT.P.x, y: RT.P.y, pal: NPC_PALS[7] || NPC_PALS[0], trainer: { cls: 'mystique', name: 'Sbire Racine', team: vetTeam(typ, lvl, 2, 'thief' + b), intro: "Grillé·e ?! Ces œufs valent une fortune, je ne les rendrai pas !", lose: "D'accord, d'accord ! Les voilà, tes œufs !", after: "Le Commandant Épine ne va pas aimer ça…", flag: k + '_thief', money: 60 } };
  const r = await trainerBattle(thief, false);
  if (r !== 'win') { G.flags[k + '_n'] = 2; G.flags[k + '_c2'] = 0; refreshNpcs(); return; }
  G.flags[k] = 1; G.money += 500; addItem('maxibaume', 1); sfx('item');
  await say("Le garde récupère les œufs : « Beau travail ! La pension te remercie. » Tu reçois un Maxi Baume et 500 écus.", { speaker: 'Garde' });
};
// déclenchement à l'entrée d'une route, quand le joueur est libre
const _enterMapIev = enterMap;
enterMap = async function (...a) {
  const r = await _enterMapIev(...a);
  try {
    // une enquête en cours sur cette route : on replace les indices non trouvés (après un rechargement)
    for (const k in G.flags) if (/^iev_\d+_open$/.test(k) && G.flags[k] === RT.map.id) { const kk = k.replace('_open', ''); if (!G.flags[kk]) ievPlaceClues(RT.map, kk); }
    const ev = ievPending(); if (ev) { const map = RT.map;
      const go = () => { if (RT.map !== map) return; if (RT.busy || UI.stack.length || RT.mode !== 'overworld') return setTimeout(go, 400); run(() => ievRun(ev)); };
      setTimeout(go, 900); }
  } catch (e) { }
  return r;
};

/* ---------- 4. Menu principal moderne : grille de tuiles avec icônes ---------- */
const SM_ICONS = {
  'Codex': '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
  'Équipe': '<circle cx="8" cy="8" r="2.2"/><circle cx="16" cy="8" r="2.2"/><circle cx="5" cy="13" r="2"/><circle cx="19" cy="13" r="2"/><path d="M8 18c0-3 2-5 4-5s4 2 4 5c0 1.5-2 2-4 2s-4-.5-4-2z"/>',
  'Boîte': '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 10h16M10 4v16M15 10v10"/>',
  'Sac': '<path d="M6 9h12l-1 11H7z"/><path d="M9 9V7a3 3 0 0 1 6 0v2"/><path d="M9 13h6"/>',
  'Carte': '<path d="M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2z"/><path d="M9 4v14M15 6v14"/>',
  'Lien': '<rect x="7" y="3" width="10" height="18" rx="2.5"/><path d="M11 18h2"/>',
  'Voyager': '<circle cx="12" cy="12" r="8"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  'Temps': '<path d="M7 3h10M7 21h10M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9"/>',
  'Vélo': '<circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16l4-7h5l3 7M10 9l2 7h-6M14 6h3"/>',
  'Descendre': '<circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16l4-7h5l3 7M10 9l2 7h-6"/><path d="M3 4l18 16"/>',
  'Écrits': '<path d="M7 4h9l3 3v13H7z"/><path d="M10 10h6M10 14h6M10 18h4"/>',
  'Profil': '<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="11" r="2.3"/><path d="M5.5 16.5c.6-2 2-3 3.5-3s2.9 1 3.5 3M14 10h4M14 13h3"/>',
  'Sauver': '<path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>',
  'Options': '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
  'Fermer': '<path d="M6 6l12 12M18 6L6 18"/>',
};
const SM_COLORS = { 'Codex': '#e86a5a', 'Équipe': '#f2a33a', 'Boîte': '#5ab0e8', 'Sac': '#c98a4a', 'Carte': '#4ac08a', 'Lien': '#e86ab0', 'Voyager': '#8a7ae8', 'Temps': '#b07ae8',
  'Vélo': '#e8c84a', 'Descendre': '#e8c84a', 'Écrits': '#d8b890', 'Profil': '#6ab8d0', 'Sauver': '#7ad06a', 'Options': '#a8b0c0', 'Fermer': '#e07070' };
function startGrid(items, sel0) {
  // menu principal dans son style d'origine (liste en haut à droite), avec une icône par choix
  return new Promise(res => {
    const lh = 13, rows = Math.min(items.length, 11), w = 84, bh = rows * lh + 10;
    const box = el('menu smlist', 236 - w, 4, w, bh);
    let sel = Math.max(0, Math.min(items.length - 1, sel0 || 0)), top = 0;
    const label = k => (k === G.name ? 'Profil' : k);
    const render = () => {
      if (sel < top) top = sel; if (sel >= top + rows) top = sel - rows + 1;
      let h = '';
      for (let i = top; i < Math.min(items.length, top + rows); i++) { const k = items[i], L = label(k);
        h += `<div class="mi${i === sel ? ' sel' : ''}" data-i="${i}" style="height:calc(var(--px) * ${lh});--c:${SM_COLORS[L] || '#a8b0c0'}"><span><svg viewBox="0 0 24 24" aria-hidden="true">${SM_ICONS[L] || SM_ICONS.Options}</svg>${esc(k)}</span></div>`; }
      if (items.length > rows) h += `<div class="scroll">${top > 0 ? '<i class="up"></i>' : ''}${top + rows < items.length ? '<i class="dn"></i>' : ''}</div>`;
      box.innerHTML = h;
    };
    const close = v => { uiPop(hd); box.remove(); res(v); };
    const hd = { press(b) {
      if (b === 'up') { sel = (sel - 1 + items.length) % items.length; sfx('move'); render(); }
      else if (b === 'down') { sel = (sel + 1) % items.length; sfx('move'); render(); }
      else if (b === 'a') { sfx('select'); close(sel); }
      else if (b === 'b') { sfx('cancel'); close(-1); }
    } };
    // le toucher est géré par le module commun (tapToChoose) : déplacement puis A
    uiPush(hd); render();
  });
}
const _menuSM = menu;
menu = function (items, o = {}) {
  if (o && o.x === 164 && o.y === 4 && o.w === 72 && !o.cls && Array.isArray(items) && items.includes('Fermer') && items.includes('Sac')) return startGrid(items, o.sel);
  return _menuSM(items, o);
};

/* ---------- 5. Couleurs de la Boîte PC (une ambiance par boîte, modifiable) ---------- */
const PC_THEMES = [
  { n: 'Prairie', a: '#2f7d4f', b: '#9ad8a0', c: '#6ac08a' }, { n: 'Océan', a: '#1c4a7a', b: '#7ac0f0', c: '#5ab0e8' },
  { n: 'Volcan', a: '#6a1e1e', b: '#f0906a', c: '#ff7a4a' }, { n: 'Crépuscule', a: '#3a2160', b: '#c09af0', c: '#b07ae8' },
  { n: 'Désert', a: '#6a4a1e', b: '#f0d08a', c: '#e8b84a' }, { n: 'Givre', a: '#2a4a5a', b: '#d0f0ff', c: '#8ad8f0' },
  { n: 'Cerisier', a: '#6a2a4a', b: '#ffc0d8', c: '#f08ab0' }, { n: 'Nuit', a: '#0e1428', b: '#5a6a9a', c: '#ffd86a' },
  { n: 'Forêt', a: '#1e3a24', b: '#6aa05a', c: '#a8d86a' }, { n: 'Corail', a: '#5a2a2a', b: '#ffb0a0', c: '#ff8a70' },
];
function pcThemeOf(page) { const t = (G.flags.pcThemes || {})[page]; return PC_THEMES[(t != null ? t : page) % PC_THEMES.length]; }
const _pcScreen = pcScreen;
pcScreen = async function () {
  const done = _pcScreen();
  // habille la Boîte avec la couleur de la page affichée, et ajoute le bouton « Couleur »
  const apply = () => {
    const p = document.querySelector('#ui .pcx'); if (!p) return false;
    const pgEl = p.querySelector('.pxpg'), m = pgEl && pgEl.textContent.match(/(\d+)\s*\//), page = m ? +m[1] - 1 : 0, th = pcThemeOf(page);
    p.style.setProperty('--pca', th.a); p.style.setProperty('--pcb', th.b); p.style.setProperty('--pcc', th.c);
    const h = p.querySelector('.pxh');
    if (h && !h.querySelector('.pxcol')) { const b = document.createElement('i'); b.className = 'pxcol'; b.dataset.col = '1'; b.textContent = th.n; h.insertBefore(b, h.querySelector('.pxclose')); }
    else if (h) h.querySelector('.pxcol').textContent = th.n;
    return true;
  };
  const obs = new MutationObserver(() => { obs.disconnect(); apply(); const p = document.querySelector('#ui .pcx'); if (p) obs.observe(p, { childList: true }); });
  const wait = () => { const p = document.querySelector('#ui .pcx'); if (p) { apply(); obs.observe(p, { childList: true });
      p.addEventListener('pointerdown', e => { const b = e.target.closest('[data-col]'); if (!b) return; e.preventDefault(); e.stopPropagation();
        const pgEl = p.querySelector('.pxpg'), m = pgEl && pgEl.textContent.match(/(\d+)\s*\//), page = m ? +m[1] - 1 : 0;
        G.flags.pcThemes ||= {}; const cur = G.flags.pcThemes[page] != null ? G.flags.pcThemes[page] : page % PC_THEMES.length;
        G.flags.pcThemes[page] = (cur + 1) % PC_THEMES.length; sfx('select'); apply(); }, true); }
    else if (document.querySelector('#ui .dlg') || !wait.n || wait.n < 80) { wait.n = (wait.n || 0) + 1; setTimeout(wait, 100); } };
  wait.n = 0; wait();
  await done; obs.disconnect();
};

/* ---------- 6. Correctif : un seul Prof. Sauge ----------
   Le registre du Codex était tenu dehors par un second « Prof. Sauge » (même apparence),
   alors que le vrai professeur reste dans son labo. Le registre est désormais tenu par ses assistants. */
const REG_KEEPERS = { t0: { name: 'Assistante Myrte', pal: 4 }, u0: { name: 'Assistant Corin', pal: 6 } };
const _getMapReg = getMap;
getMap = function (id, ...a) {
  const m = _getMapReg(id, ...a);
  const k = REG_KEEPERS[id];
  if (k && m && m.npcs && !m._regFix) { m._regFix = 1;
    for (const n of m.npcs) if (n.script === 'registre') { n.speaker = k.name; n.pal = NPC_PALS[k.pal % NPC_PALS.length]; } }
  return m;
};
const _regScript = SCRIPTS.registre;
SCRIPTS.registre = async function (n) {
  if (!G.flags['regintro_' + RT.map.id]) { G.flags['regintro_' + RT.map.id] = 1;
    await say(RT.map.id === 'u0' ? "La Pr Ysée m'a confié le registre du Codex. Je note chacune de tes captures." : "Le Prof. Sauge m'a confié le registre du Codex pendant qu'il travaille au labo. Je note chacune de tes captures.", { speaker: n.speaker }); }
  return _regScript(n);
};
