'use strict';
/* ============================================================
   AWAKENING — combats
   ============================================================ */
let B = null;
const STG_NAME = { atk: "L'Attaque", def: 'La Défense', spa: "L'Attaque Spéciale", spd: 'La Défense Spéciale', spe: 'La Vitesse' };
function stageMul(s) { return s >= 0 ? (2 + s) / 2 : 2 / (2 - s); }
function newStages() { return { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }; }
function tween(ms, fn) {
  return new Promise(res => {
    const t0 = performance.now();
    const f = t => { const k = Math.min(1, (t - t0) / ms); fn(k); if (k < 1) requestAnimationFrame(f); else res(); };
    requestAnimationFrame(f);
  });
}
function pm() { return G.party[B.pi]; }
function fm() { return B.foes[B.fi]; }
function battleTextEl() { return B && B.ui ? B.ui.text : el('btext', 0, 112, 240, 48); }
function bsay(text, ms = 1300) { return say(text, { battle: true, auto: ms }); }
function powName(m) { return monName(m) + (m._bloom ? ' florissant' : '') + (m._giant > 0 ? ' colossal' : ''); }
function nm(side) {
  if (side === 'p') return powName(pm());
  const n = powName(fm());
  return B.kind === 'wild' ? `${n} sauvage` : `${n} ennemi`;
}
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function xpFrac(m) {
  if (m.lvl >= LVL_CAP) return 1;
  const a = xpAt(m.sp, m.lvl), b = xpAt(m.sp, m.lvl + 1);
  return Math.max(0, Math.min(1, (m.xp - a) / (b - a)));
}
function renderHud(side, hpv) {
  const m = side === 'me' ? pm() : fm();
  const box = side === 'me' ? B.ui.me : B.ui.foe;
  if (!m) { box.hidden = true; return; }
  box.hidden = false;
  const st = calcStats(m);
  const hp = hpv != null ? hpv : m.hp;
  const f = Math.max(0, hp / st.hp);
  const caught = side === 'foe' && B.kind === 'wild' && G.caught[m.sp] ? '<i class="ct"></i>' : '';
  box.innerHTML = `<div class="hn"><span>${caught}${esc(monName(m))}</span><span class="lv">N.${m.lvl}</span></div>
    <div class="hpl"><b>PV</b><div class="bar"><i style="width:${f * 100}%;background:${hpColor(f)}"></i></div></div>
    <div class="hrow">${statusPill(m.status)}${side === 'me' ? `<span class="hpn">${Math.ceil(hp)} / ${st.hp}</span>` : ''}</div>
    ${side === 'me' ? `<div class="xpb"><i style="width:${xpFrac(m) * 100}%"></i></div>` : ''}`;
}
async function animHp(side, from, to) {
  const ms = Math.min(900, 200 + Math.abs(from - to) * 12);
  await tween(ms, k => renderHud(side, from + (to - from) * k));
  renderHud(side);
}

// ---------- Rendu ----------
function drawBattle(x) {
  if (!B) return;
  x.drawImage(battleBG(B.env, B.tod, B.reg), 0, 0);
  const drawMon = (img, s, bx, by, sp) => {
    if (!s.vis || (s.flash && Math.floor(s.flash * 10) % 2 === 1)) return;
    const sc = s.scale * (1 + 0.08 * (s.pop || 0));
    x.globalAlpha = s.a;
    // respiration : léger gonflement vertical, décalé pour chaque côté
    const t = RT.frame / 60 + (s === B.spr.f ? 0.9 : 0), br = s.act || s.flash ? 0 : Math.sin(t * 2.4) * 0.028;
    const w = 80 * sc * (1 + br * 0.6), h = 80 * sc * (1 - br);
    if (sp && SP[sp] && typeof galAnim === 'function') galAnim(x, img, bx + s.x + 40 * (1 - sc), by + s.y + 80 * (1 - sc), 80 * sc, 80 * sc, t, { sp, act: s.act, pop: s.pop || 0, hurt: s.flash > 0, back: s === B.spr.p });
    else x.drawImage(img, bx + s.x + 40 * (1 - sc) - (w - 80 * sc) / 2, by + s.y + 80 * (1 - sc) + (80 * sc - h), w, h);
    x.globalAlpha = 1;
    if (s.white) { x.globalAlpha = s.white; x.globalCompositeOperation = 'source-atop'; x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1; }
  };
  const f = fm(), p = pm();
  const variant = (s, ph) => s.flash > 0 ? 'hurt' : s.act ? 'open' : ((RT.frame + ph) % 220) < 9 ? 'blink' : '';
  if (f) drawMon(battleMon(f.sp, f.shiny, false, variant(B.spr.f, 0)), B.spr.f, 138, -10, f.sp);
  if (p && B.spr.p.vis) drawMon(battleMon(p.sp, p.shiny, true, variant(B.spr.p, 97)), B.spr.p, 22, 34, p.sp);
  if (B.trainerShow) {
    const tp = (B.trainerPal === PALS.rival && typeof novaBust === 'function' && novaBust(192)) || (B.trainer && B.trainer.sprKey && typeof npcImgSprite === 'function' && npcImgSprite(B.trainer.sprKey, 'down', 0)) || personSprite(B.trainerPal || NPC_PALS[0], 'down', 0);
    x.drawImage(tp, 154 + B.trainerShow.x, 4, 48, 48);
  }
  const aura = (m, cx, cy) => {
    if (!m) return;
    if (m._bloom) { const g = x.createRadialGradient(cx, cy, 4, cx, cy, 46); g.addColorStop(0, 'rgba(255,240,150,0)'); g.addColorStop(0.7, `rgba(150,255,120,${0.18 + 0.08 * Math.sin(RT.frame / 6)})`); g.addColorStop(1, 'rgba(150,255,120,0)'); x.fillStyle = g; x.fillRect(cx - 46, cy - 46, 92, 92); for (let i = 0; i < 6; i++) { const a = RT.frame / 20 + i; x.fillStyle = '#ff9fc4'; x.fillRect(cx + Math.cos(a) * 34, cy + Math.sin(a) * 30, 2, 2); } }
    if (m._giant > 0) { x.fillStyle = `rgba(230,60,70,${0.16 + 0.06 * Math.sin(RT.frame / 5)})`; x.beginPath(); x.ellipse(cx, cy + 10, 56, 44, 0, 0, 7); x.fill(); }
  };
  aura(f, 178, 40); if (B.spr.p.vis) aura(p, 62, 84);
  if (B.ball) drawSphere(x, Math.round(B.ball.x), Math.round(B.ball.y), 5);
  if (B.sparkle > 0) {
    x.fillStyle = '#fff6b0';
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + B.sparkle * 4; x.fillRect(178 + Math.cos(a) * 30 * B.sparkle, 40 + Math.sin(a) * 26 * B.sparkle, 2, 2); }
  }
  if (B.screenFlash) { x.fillStyle = `rgba(255,255,255,${B.screenFlash})`; x.fillRect(0, 0, 240, 160); }
}
async function animAttack(side, mv) {
  const s = side === 'p' ? B.spr.p : B.spr.f;
  const dir = side === 'p' ? 1 : -1;
  s.act = 1; await tween(110, k => { s.pop = Math.sin(k * Math.PI); }); s.pop = 0;
  try { await animAttackBody(s, dir, mv); } finally { s.act = 0; }
}
async function animAttackBody(s, dir, mv) {
  if (mv.c === 'p') {
    await tween(120, k => { s.x = dir * 10 * k; s.y = -dir * 4 * k; });
    await tween(120, k => { s.x = dir * 10 * (1 - k); s.y = -dir * 4 * (1 - k); });
  } else if (mv.c === 's') {
    await tween(220, k => { B.screenFlash = 0.5 * Math.sin(k * Math.PI); });
    B.screenFlash = 0;
  } else {
    await tween(260, k => { s.y = -Math.sin(k * Math.PI * 2) * 3; });
    s.y = 0;
  }
}
async function animHit(side, eff) {
  const s = side === 'p' ? B.spr.p : B.spr.f;
  sfx(eff > 1 ? 'super' : eff < 1 ? 'weak' : 'hit');
  await tween(420, k => { s.flash = k < 1 ? k * 2.4 : 0; if (eff > 1) s.x = Math.sin(k * 40) * 3; });
  s.flash = 0; s.x = 0;
}
async function animFaint(side) {
  const s = side === 'p' ? B.spr.p : B.spr.f;
  sfx('faint');
  await tween(380, k => { s.y = k * 60; s.a = 1 - k; });
  s.vis = false; s.y = 0; s.a = 1;
}
async function animSend(side) {
  const s = side === 'p' ? B.spr.p : B.spr.f;
  s.vis = true; s.a = 1; s.x = 0; s.y = 0;
  await tween(260, k => { s.scale = 0.2 + 0.8 * k; });
  s.scale = 1;
  const m = side === 'p' ? pm() : fm();
  if (m && m.shiny) { await tween(600, k => { B.sparkle = k; }); B.sparkle = 0; }
}

// ---------- Combat ----------
async function runBattle(opts) {
  const lead = G.party.findIndex(m => m.hp > 0);
  B = Object.assign({ fi: 0, pi: lead, ps: newStages(), fs: newStages(), part: new Set([lead]), runs: 0, leveled: new Set(), spr: { f: { x: 0, y: 0, a: 1, vis: false, flash: 0, scale: 1 }, p: { x: 0, y: 0, a: 1, vis: false, flash: 0, scale: 1 } }, ball: null, sparkle: 0, screenFlash: 0, flinch: {}, tod: timeOfDay(), reg: RT.map ? RT.map.reg : 'solvene' }, opts);
  if (!B.env) B.env = 'grass';
  RT.mode = 'battle';
  B.ui = { foe: el('hud foe', 6, 6, 108, 28), me: el('hud me', 128, 75, 108, 36), text: el('btext', 0, 112, 240, 48) };
  B.ui.foe.hidden = true; B.ui.me.hidden = true;
  playMusic(B.music || (B.kind === 'wild' ? 'battle' : 'trainer'));
  sfx('encounter');
  for (let i = 0; i < 3; i++) { await fade(true, 70); await fade(false, 70); }
  let result;
  try { result = await battleMain(); }
  catch (e) { console.error(e); result = 'run'; }
  for (const k in B.ui) B.ui[k].remove();
  for (const m of G.party.concat(B.foes || [])) { if (m._giant > 0) m.hp = Math.ceil(m.hp / 2); delete m._giant; delete m._bloom; }
  const leveled = [...B.leveled];
  B = null;
  RT.mode = 'overworld';
  if (result !== 'lose') await evolveCheck(leveled);
  if (RT.map) playMusic(mapMusic(RT.map));
  return result;
}
async function battleMain() {
  const f0 = fm();
  G.seen[f0.sp] = 1;
  if (B.kind === 'wild') {
    B.spr.f.vis = true;
    await tween(400, k => { B.spr.f.x = 90 * (1 - k); });
    if (f0.shiny) { await tween(700, k => { B.sparkle = k; }); B.sparkle = 0; }
    await bsay(B.legend ? LEGENDS[B.legend].text : `Un ${monName(f0)} sauvage apparaît !${f0.shiny ? ' Il brille étrangement !' : ''}`, 1500);
  } else {
    B.trainerShow = { x: 0 };
    B.trainerPal = B.trainer.pal;
    await bsay(`${trName()} veut se battre !`, 1400);
    await tween(300, k => { B.trainerShow.x = 100 * k; });
    B.trainerShow = null;
    await animSend('f');
    await bsay(`${trName()} envoie ${monName(f0)} !`, 1000);
  }
  renderHud('foe');
  await animSend('p');
  await bsay(`Vas-y, ${monName(pm())} !`, 900);
  renderHud('me');
  while (true) {
    B.flinch = {};
    await foePower();
    const act = await chooseAction();
    let fMove = aiMove();
    if (act.t === 'run') {
      if (B.kind !== 'wild') { await bsay('Impossible de fuir un combat de dresseur !'); continue; }
      B.runs++;
      const ps = effStat(pm(), B.ps, 'spe'), fs = effStat(fm(), B.fs, 'spe');
      const ch = B.legend ? 0.25 : Math.min(1, (ps * 32 / Math.max(1, fs / 4 % 256) + 30 * B.runs) / 255 + (ps >= fs ? 1 : 0));
      if (Math.random() < ch) { sfx('cancel'); await bsay('Tu prends la fuite !', 900); return 'run'; }
      await bsay('Impossible de fuir !');
      const r = await doMove('f', fMove); if (r) return r;
    } else if (act.t === 'switch') {
      await switchTo(act.i, true);
      const r = await doMove('f', fMove); if (r) return r;
    } else if (act.t === 'item') {
      const it = ITEMS[act.item];
      if (it.k === 'ball') {
        const caught = await throwBall(act.item);
        if (caught) return 'caught';
      } else {
        const m = G.party[act.target];
        const msg = useItemOn(act.item, m);
        G.bag[act.item]--; if (!G.bag[act.item]) delete G.bag[act.item];
        sfx('heal');
        if (act.target === B.pi) renderHud('me');
        await bsay(msg);
      }
      const r = await doMove('f', fMove); if (r) return r;
    } else {
      if (B.bloomPending) { B.bloomPending = false; B.usedBloom = true; await doBloom('p'); }
      if (B.giantPending) { B.giantPending = false; B.usedGiant = true; await doGiant('p'); }
      if (act.pre === 'eclat') await eclatIntro();
      const pMove = act.id;
      const pp = (MOVES[pMove].pri || 0), fp = (MOVES[fMove].pri || 0);
      const ps = effStat(pm(), B.ps, 'spe'), fs = effStat(fm(), B.fs, 'spe');
      const pFirst = pp !== fp ? pp > fp : (ps !== fs ? ps > fs : Math.random() < 0.5);
      const order = pFirst ? [['p', pMove], ['f', fMove]] : [['f', fMove], ['p', pMove]];
      const actors = { p: pm(), f: fm() };
      let ended = null;
      for (let i = 0; i < 2; i++) {
        const [side, id] = order[i];
        const me = side === 'p' ? pm() : fm();
        if (me !== actors[side] || me.hp <= 0) continue;
        B.first = i === 0;
        ended = await doMove(side, id);
        if (ended) return ended;
      }
    }
    const r = await endOfTurn(); if (r) return r;
  }
}
function trName() { const t = B.trainer; if (!t) return ''; const c = TCLS[t.cls]; const cn = t.cls === 'rival' || t.cls === 'leader' ? '' : c.n; return (cn ? cn + ' ' : '') + fmt(t.name); }
function effStat(m, stg, k) {
  const v = calcStats(m)[k] * stageMul(stg[k]) * (m._bloom ? 1.3 : 1);
  return k === 'spe' && m.status === 'par' ? v * 0.5 : v;
}
async function chooseAction() {
  let last = B.lastAct || 0;
  while (true) {
    const me = pm();
    B.ui.text.innerHTML = `<div class="txt">Que doit faire ${esc(monName(me))} ?</div>`;
    const pw = powersFor(me);
    const top = [{ label: 'Attaque' }, { label: 'Sac' }, { label: 'Équipe' }, { label: 'Fuite' }];
    if (pw.length) top.push({ label: 'Pouvoir', color: '#f2c14e' });
    const a = await gridMenu(top, 128, 112, 112, 48, 2, last);
    if (a < 0) continue;
    B.lastAct = a; last = a;
    if (a === 0) {
      if (me.moves.every(mv => mv.pp <= 0)) { await bsay(`${monName(me)} n'a plus de capacités !`); return { t: 'move', id: 'lutte' }; }
      const mi = await moveMenu(me);
      if (mi < 0) continue;
      if (me.moves[mi].pp <= 0) { await bsay('Plus de PP pour cette capacité !'); continue; }
      return { t: 'move', id: me.moves[mi].id, idx: mi };
    }
    if (a === 1) {
      const r = await bagScreen('battle');
      if (!r) continue;
      if (ITEMS[r.item].k === 'ball' && B.kind !== 'wild') { await bsay("On ne capture pas la créature d'un autre dresseur !"); continue; }
      return Object.assign({ t: 'item' }, r);
    }
    if (a === 2) {
      const i = await partyScreen({ mode: 'pick', title: 'Envoyer quelle créature ?' });
      if (i < 0) continue;
      if (i === B.pi) { await bsay(`${monName(me)} est déjà au combat !`); continue; }
      if (G.party[i].hp <= 0) { await bsay(`${monName(G.party[i])} n'a plus la force de se battre !`); continue; }
      return { t: 'switch', i };
    }
    if (a === 3) return { t: 'run' };
    if (a === 4) {
      const k = await menu(pw.map(p => p.label), { x: 120, y: 110 - (pw.length * 13 + 10), w: 116 });
      if (k < 0) continue;
      const P = pw[k];
      if (P.k === 'eclat') {
        const opts = me.moves.filter(mv => MOVES[mv.id].pw && G.keys['eclat_' + MOVES[mv.id].t]);
        const j = await menu(opts.map(mv => eclatName(MOVES[mv.id])), { x: 92, y: 110 - (opts.length * 13 + 10), w: 144 });
        if (j < 0) continue;
        const base = MOVES[opts[j].id];
        MOVES._eclat = { n: eclatName(base), t: base.t, c: base.c === 'x' ? 's' : base.c, pw: Math.max(150, Math.round(base.pw * 1.9)), ac: 0, pp: 1, eclat: true, fx: {} };
        B.usedEclat = true;
        return { t: 'move', id: '_eclat', pre: 'eclat' };
      }
      if (P.k === 'bloom') { B.bloomPending = true; await bsay(`${monName(me)} vibre au rythme de la Graine... Choisis son attaque !`, 1000); continue; }
      if (P.k === 'giant') { B.giantPending = true; await bsay(`La Couronne Colossale s'illumine... Choisis l'attaque de ${monName(me)} !`, 1000); continue; }
    }
  }
}
function moveMenu(me) {
  const items = me.moves.map(mv => ({ label: MOVES[mv.id].n, color: TC[MOVES[mv.id].t] }));
  while (items.length < 4) items.push({ label: '-', disabled: true });
  const info = el('menu minfo', 168, 112, 72, 48);
  const onMove = i => {
    const mv = me.moves[i];
    if (!mv) { info.innerHTML = ''; return; }
    const M = MOVES[mv.id];
    const eff = M.pw ? typeEff(M.t, SP[fm().sp].types) : 1;
    info.innerHTML = `<div>PP <b>${mv.pp}/${M.pp}</b></div><div>${typePill(M.t)}</div><div class="cat">${CAT_NAME[M.c]}${M.pw ? ' · ' + M.pw : ''}</div>${M.pw && G.seen[fm().sp] && !(B.unknown && B.unknown.has(fm().sp)) ? `<div class="effh">${eff === 0 ? 'Aucun effet' : eff > 1 ? 'Super efficace' : eff < 1 ? 'Peu efficace' : 'Efficacité normale'}</div>` : ''}`;
  };
  return gridMenu(items, 0, 112, 168, 48, 2, B.lastMove || 0, onMove).then(r => { info.remove(); if (r >= 0) B.lastMove = r; return r; });
}
function aiMove() {
  const f = fm(), p = pm();
  const opts = f.moves.filter(mv => mv.pp > 0);
  if (!opts.length) return 'lutte';
  if (B.kind === 'wild' && !B.legend) return pick(Math.random, opts).id;
  const smart = B.trainer && (B.trainer.cls === 'leader' || B.trainer.cls === 'elite' || B.trainer.cls === 'champion' || B.trainer.cls === 'ancien' || B.trainer.cls === 'boss' || B.legend) ? 0.9 : 0.65;
  if (Math.random() > smart) return pick(Math.random, opts).id;
  const fst = calcStats(f);
  let best = null, bs = -1;
  for (const mv of opts) {
    const M = MOVES[mv.id];
    let s = 0;
    if (M.c === 'x') {
      const fx = M.fx || {};
      if (fx.heal) s = f.hp < fst.hp * 0.45 ? 140 : 0;
      else if (fx.st) s = p.status ? 0 : 45;
      else if (fx.self) s = fx.self.some(([k, v]) => v > 0 && B.fs[k] < 2) ? 35 : 0;
      else if (fx.foe) s = fx.foe.some(([k]) => B.ps[k] > -2) ? 25 : 0;
    } else {
      const eff = typeEff(M.t, SP[p.sp].types);
      const stab = SP[f.sp].types.includes(M.t) ? 1.5 : 1;
      const a = M.c === 'p' ? fst.atk : fst.spa;
      s = M.pw * eff * stab * (M.ac ? M.ac / 100 : 1) * a / 100;
    }
    s *= 0.9 + Math.random() * 0.2;
    if (s > bs) { bs = s; best = mv.id; }
  }
  return best || opts[0].id;
}
async function applyStages(side, list, fromFoe) {
  const stg = side === 'p' ? B.ps : B.fs;
  for (const [k, v] of list) {
    const before = stg[k];
    stg[k] = Math.max(-6, Math.min(6, stg[k] + v));
    const who = side === 'p' ? nm('p') : nm('f');
    if (stg[k] === before) { await bsay(`${STG_NAME[k]} de ${who} ne peut plus ${v > 0 ? 'augmenter' : 'baisser'} !`); continue; }
    sfx(v > 0 ? 'stat' : 'statdown');
    await bsay(`${STG_NAME[k]} de ${who} ${v > 0 ? (v > 1 ? 'augmente beaucoup' : 'augmente') : (v < -1 ? 'baisse beaucoup' : 'baisse')} !`, 1000);
  }
}
function canStatus(m, st) {
  const t = SP[m.sp].types;
  if (m.status) return false;
  if (st === 'brn' && t.includes('feu')) return false;
  if (st === 'psn' && (t.includes('toxine') || t.includes('acier'))) return false;
  if (st === 'par' && t.includes('foudre')) return false;
  if (st === 'frz' && t.includes('givre')) return false;
  return true;
}
const ST_MSG = { brn: 'est brûlé !', psn: 'est empoisonné !', par: "est paralysé ! Il aura du mal à attaquer.", slp: "s'endort !", frz: 'est gelé !' };
async function inflict(side, st) {
  const m = side === 'p' ? pm() : fm();
  m.status = st; if (st === 'slp') m.slp = rnd(1, 3);
  sfx('status');
  renderHud(side === 'p' ? 'me' : 'foe');
  await bsay(`${side === 'p' ? nm('p') : nm('f')} ${ST_MSG[st]}`);
}
async function doMove(side, id) {
  const user = side === 'p' ? pm() : fm();
  const tside = side === 'p' ? 'f' : 'p';
  const tgt = tside === 'p' ? pm() : fm();
  const M = MOVES[id];
  const uname = nm(side), tname = nm(tside);
  // statut empêchant d'agir
  if (user.status === 'slp') {
    user.slp = (user.slp || 1) - 1;
    if (user.slp <= 0) { user.status = null; renderHud(side === 'p' ? 'me' : 'foe'); await bsay(`${uname} se réveille !`); }
    else { await bsay(`${uname} dort profondément.`); return null; }
  }
  if (user.status === 'frz') {
    if (Math.random() < 0.2) { user.status = null; renderHud(side === 'p' ? 'me' : 'foe'); await bsay(`${uname} n'est plus gelé !`); }
    else { await bsay(`${uname} est gelé !`); return null; }
  }
  if (B.flinch[side]) { await bsay(`${uname} a peur et ne peut pas attaquer !`); return null; }
  if (user.status === 'par' && Math.random() < 0.25) { await bsay(`${uname} est paralysé ! Il ne peut pas attaquer !`); return null; }
  const slot = user.moves.find(mv => mv.id === id);
  if (slot) slot.pp = Math.max(0, slot.pp - 1);
  await bsay(`${uname} utilise ${M.n} !`, 900);
  await animAttack(side, M);
  const fx = M.fx || {};
  if (M.c === 'x') {
    if (M.tgt === 'self') {
      if (fx.heal) {
        const mx = maxHp(user);
        if (user.hp >= mx) { await bsay('Mais ça ne sert à rien !'); return null; }
        const from = user.hp; user.hp = Math.min(mx, user.hp + Math.floor(mx * fx.heal)); sfx('heal');
        await animHp(side === 'p' ? 'me' : 'foe', from, user.hp);
        await bsay(`${uname} récupère des PV !`);
      }
      if (fx.self) await applyStages(side, fx.self);
      return null;
    }
    if (M.ac && Math.random() * 100 >= M.ac) { await bsay(`${tname} évite l'attaque !`); return null; }
    if (fx.st) {
      if (!canStatus(tgt, fx.st)) { await bsay(`Ça n'a aucun effet sur ${tname}.`); return null; }
      await inflict(tside, fx.st);
    }
    if (fx.foe) await applyStages(tside, fx.foe);
    return null;
  }
  // capacité offensive
  if (M.ac && Math.random() * 100 >= M.ac) { await bsay(`L'attaque de ${uname} a raté !`); return null; }
  const eff = M.t === 'none' ? 1 : typeEff(M.t, SP[tgt.sp].types);
  if (eff === 0) { await bsay(`Ça n'affecte pas ${tname}...`); return null; }
  const crit = Math.random() < (fx.crit ? 1 / 8 : 1 / 16);
  const us = side === 'p' ? B.ps : B.fs, ts = side === 'p' ? B.fs : B.ps;
  const phys = M.c === 'p';
  let A = effStat(user, us, phys ? 'atk' : 'spa'), D = effStat(tgt, ts, phys ? 'def' : 'spd');
  if (crit) { if (us[phys ? 'atk' : 'spa'] < 0) A = calcStats(user)[phys ? 'atk' : 'spa']; if (ts[phys ? 'def' : 'spd'] > 0) D = calcStats(tgt)[phys ? 'def' : 'spd']; }
  let dmg = Math.floor(Math.floor(Math.floor(2 * user.lvl / 5 + 2) * M.pw * A / D) / 50) + 2;
  if (phys && user.status === 'brn') dmg = Math.floor(dmg / 2);
  if (user._giant > 0) dmg = Math.floor(dmg * 1.5);
  if (M.eclat) dmg = Math.floor(dmg * 1.15);
  const stab = SP[user.sp].types.includes(M.t) ? 1.5 : 1;
  dmg = Math.max(1, Math.floor(dmg * stab * eff * (crit ? 1.5 : 1) * (0.85 + Math.random() * 0.15)));
  dmg = Math.min(dmg, tgt.hp);
  await animHit(tside, eff);
  const from = tgt.hp; tgt.hp -= dmg;
  await animHp(tside === 'p' ? 'me' : 'foe', from, tgt.hp);
  if (crit) await bsay('Coup critique !', 900);
  if (eff > 1) await bsay("C'est super efficace !", 1000);
  else if (eff < 1) await bsay("Ce n'est pas très efficace...", 1000);
  if (fx.drain && user.hp > 0) {
    const h = Math.max(1, Math.floor(dmg * fx.drain)); const f0 = user.hp; user.hp = Math.min(maxHp(user), user.hp + h);
    await animHp(side === 'p' ? 'me' : 'foe', f0, user.hp); await bsay(`${tname} perd son énergie !`, 900);
  }
  if (fx.recoil) {
    const r = Math.max(1, Math.floor(dmg * fx.recoil)); const f0 = user.hp; user.hp = Math.max(0, user.hp - r);
    await animHp(side === 'p' ? 'me' : 'foe', f0, user.hp); await bsay(`${uname} subit le contrecoup !`, 900);
  }
  if (tgt.hp > 0) {
    if (fx.st && Math.random() * 100 < (fx.ch || 100) && canStatus(tgt, fx.st)) await inflict(tside, fx.st);
    if (fx.st === undefined && tgt.status === 'frz' && M.t === 'feu') { tgt.status = null; await bsay(`${tname} n'est plus gelé !`); }
    if (fx.foe && Math.random() * 100 < (fx.fch || 100)) await applyStages(tside, fx.foe);
    if (fx.flinch && B.first && Math.random() * 100 < fx.flinch) B.flinch[tside] = true;
  }
  if (fx.self && user.hp > 0 && Math.random() * 100 < (fx.sch || 100)) await applyStages(side, fx.self);
  return await checkFaints();
}
async function checkFaints() {
  const f = fm(), p = pm();
  if (f.hp <= 0) {
    await animFaint('f');
    B.ui.foe.hidden = true;
    await bsay(`${nm('f')} est K.O. !`, 1000);
    await awardXP(f);
    const next = B.foes.findIndex((m, i) => i > B.fi && m.hp > 0);
    if (next < 0) {
      if (B.kind === 'trainer') return await winTrainer();
      return 'win';
    }
    B.fi = next; B.fs = newStages();
    G.seen[fm().sp] = 1;
    B.part = new Set([B.pi]);
    if (p.hp > 0) {
      await animSend('f'); renderHud('foe');
      await bsay(`${trName()} envoie ${monName(fm())} !`, 1000);
    }
  }
  if (pm().hp <= 0) {
    await animFaint('p');
    B.ui.me.hidden = true;
    await bsay(`${monName(pm())} est K.O. !`, 1000);
    if (!G.party.some(m => m.hp > 0)) return await loseBattle();
    const i = await partyScreen({ mode: 'pick', force: true, title: 'Choisis la prochaine créature.' });
    await switchTo(i, false);
    if (fm().hp <= 0) return null;
    if (!B.spr.f.vis) { await animSend('f'); renderHud('foe'); if (B.kind === 'trainer') await bsay(`${trName()} envoie ${monName(fm())} !`, 1000); }
  }
  return null;
}
async function switchTo(i, voluntary) {
  if (pm()._giant > 0) { const m = pm(); m._giant = 0; m.hp = Math.ceil(m.hp / 2); B.spr.p.scale = 1; }
  if (voluntary) {
    await bsay(`Reviens, ${monName(pm())} !`, 800);
    await tween(200, k => { B.spr.p.scale = 1 - 0.8 * k; });
    B.spr.p.vis = false; B.spr.p.scale = 1;
  }
  B.pi = i; B.ps = newStages(); B.part.add(i);
  await animSend('p');
  await bsay(`Vas-y, ${monName(pm())} !`, 800);
  renderHud('me');
}
async function endOfTurn() {
  for (const side of ['p', 'f']) {
    const g = side === 'p' ? pm() : fm();
    if (g && g._giant > 0) { g._giant--; if (g._giant === 0) await endGiant(side); }
  }
  for (const side of ['p', 'f']) {
    const m = side === 'p' ? pm() : fm();
    if (!m || m.hp <= 0) continue;
    if (m.status === 'brn' || m.status === 'psn') {
      const d = Math.max(1, Math.floor(maxHp(m) / (m.status === 'brn' ? 16 : 8)));
      const from = m.hp; m.hp = Math.max(0, m.hp - d);
      sfx('weak');
      await animHp(side === 'p' ? 'me' : 'foe', from, m.hp);
      await bsay(`${side === 'p' ? nm('p') : nm('f')} souffre ${m.status === 'brn' ? 'de sa brûlure' : 'du poison'} !`, 900);
      const r = await checkFaints(); if (r) return r;
    }
  }
  return null;
}
async function awardXP(foe) {
  const base = SP[foe.sp].yield * foe.lvl / 7 * (B.kind === 'trainer' ? 1.5 : 1) * (G.keys.ampli ? 3 : 1);
  for (let i = 0; i < G.party.length; i++) {
    const m = G.party[i];
    if (m.hp <= 0 || m.lvl >= LVL_CAP) continue;
    let amt;
    if (B.part.has(i)) amt = Math.floor(base);
    else if (G.keys.partage && G.opts.share !== false) amt = Math.floor(base / 2);
    else continue;
    amt = Math.max(1, amt);
    await bsay(`${monName(m)} gagne ${amt} points d'expérience !`, 900);
    await gainXP(m, amt, i === B.pi);
  }
}
async function gainXP(m, amt, active) {
  m.xp += amt;
  if (active && B) renderHud('me');
  let lvMsgs = 0;
  while (m.lvl < LVL_CAP && m.xp >= xpAt(m.sp, m.lvl + 1)) {
    const oldMax = maxHp(m);
    m.lvl++;
    m.hp = Math.max(m.hp > 0 ? 1 : 0, m.hp + maxHp(m) - oldMax);
    sfx('level');
    if (active && B) renderHud('me');
    if (B) B.leveled.add(m); else RT.leveled = (RT.leveled || []).concat([m]);
    const lastLv = !(m.lvl < LVL_CAP && m.xp >= xpAt(m.sp, m.lvl + 1));
    if (lvMsgs++ < 2 || lastLv) await (B ? bsay(`${monName(m)} monte au niveau ${m.lvl} !`, 1300) : say(`${monName(m)} monte au niveau ${m.lvl} !`));
    for (const mv of movesLearnedAt(m.sp, m.lvl)) await learnMove(m, mv, !!B);
  }
  if (active && B) renderHud('me');
}
async function winTrainer() {
  const t = B.trainer;
  B.trainerShow = { x: 100 };
  await tween(300, k => { B.trainerShow.x = 100 * (1 - k); });
  playMusic('title');
  await bsay(`Tu as vaincu ${trName()} !`, 1400);
  await bsay(fmt(t.lose), 2600);
  const maxL = Math.max(...B.foes.map(m => m.lvl));
  const money = (t.money || TCLS[t.cls].m) * maxL;
  G.money += money;
  await bsay(`Tu remportes ${fmtMoney(money)}.`, 1200);
  return 'win';
}
async function loseBattle() {
  if (B.noLoss) { await bsay("Tu as perdu... mais ce n'était qu'un combat d'entraînement.", 1600); return 'lose'; }
  await bsay("Tu n'as plus de créature en état de se battre !", 1600);
  const lost = Math.floor(G.money / 2);
  G.money -= lost;
  await bsay(`Tu perds ${fmtMoney(lost)}... Tout devient flou.`, 1800);
  return 'lose';
}
async function throwBall(item) {
  G.bag[item]--; if (!G.bag[item]) delete G.bag[item];
  const f = fm();
  await bsay(`Tu lances une ${ITEMS[item].n} !`, 600);
  sfx('throw');
  B.ball = { x: 30, y: 100 };
  await tween(450, k => { B.ball.x = 30 + (178 - 30) * k; B.ball.y = 100 - Math.sin(k * Math.PI) * 70 + (40 - 100) * k; });
  await tween(250, k => { B.spr.f.scale = 1 - k; B.spr.f.a = 1 - k; });
  B.spr.f.vis = false; B.spr.f.scale = 1; B.spr.f.a = 1;
  await tween(250, k => { B.ball.y = 40 + 26 * k; });
  // formule de capture
  const st = calcStats(f);
  let mod = ITEMS[item].m;
  if (mod === 'night') mod = (timeOfDay() === 'night' || B.env === 'cave') ? 3 : 1;
  const rate = SP[f.sp].rate;
  const sb = f.status === 'slp' || f.status === 'frz' ? 2 : f.status ? 1.5 : 1;
  const a = ((3 * st.hp - 2 * f.hp) * rate * mod) / (3 * st.hp) * sb;
  let shakes = 0, caught = false;
  if (a >= 255) { caught = true; shakes = 3; }
  else {
    const b = 1048560 / Math.sqrt(Math.sqrt(16711680 / Math.max(1, a)));
    for (shakes = 0; shakes < 4; shakes++) if (Math.random() * 65536 >= b) break;
    caught = shakes >= 4; shakes = Math.min(3, shakes);
  }
  for (let i = 0; i < shakes; i++) {
    await wait(300); sfx('shake');
    await tween(300, k => { B.ball.x = 178 + Math.sin(k * Math.PI * 2) * 4; });
  }
  await wait(250);
  if (caught) {
    sfx('caught');
    await bsay(`Et voilà ! ${monName(f)} est capturé !`, 1600);
    const isNew = !G.caught[f.sp];
    G.caught[f.sp] = 1; G.seen[f.sp] = 1;
    if (isNew && G.keys.codex) await bsay(`Les données de ${monName(f)} sont ajoutées au Codex.`, 1500);
    if (typeof novaCapture === 'function') { const nl = novaCapture(f, isNew); if (nl) await bsay(nl, 2600); }
    f.status = f.status || null;
    f.moves.forEach(mv => mv.pp = mv.pp);
    if (G.party.length < 6) G.party.push(f);
    else { G.box.push(f); await bsay(`${monName(f)} est envoyé dans la boîte du PC.`, 1500); }
    if (B.legend) G.flags[LEGENDS[B.legend].flag] = 1;
    B.ball = null;
    return true;
  }
  B.ball = null;
  B.spr.f.vis = true;
  await tween(200, k => { B.spr.f.scale = k; });
  B.spr.f.scale = 1;
  await bsay(['Oh non ! La créature s\'est libérée !', 'Raah ! Elle y était presque !', 'Mince ! C\'était tout juste !', 'Si près du but !'][shakes], 1200);
  return false;
}

/* ---------- Pouvoirs : Floraison, Éclats, Colosse ---------- */
const ECLAT_NAMES = { normal: 'Élan Absolu', feu: 'Brasier Primordial', eau: 'Déluge Originel', flore: 'Racines du Monde', foudre: 'Foudre du Zénith', roc: 'Fracture Tellurique', vent: 'Ouragan Céleste', givre: 'Hiver Éternel', esprit: 'Songe Infini', ombre: 'Nuit Sans Fin', lumiere: 'Aube Éclatante', toxine: 'Marée Toxique', acier: 'Forge Ultime', combat: 'Poing du Premier Dresseur', dragon: 'Rugissement Ancestral' };
function eclatName(M) { return ECLAT_NAMES[M.t] || ('Éclat ' + M.n); }
function powersFor(me) {
  const out = [];
  if (G.keys.pendentif && !B.usedBloom && !B.bloomPending && !me._bloom && (!SP[me.sp].next)) out.push({ k: 'bloom', label: 'Floraison' });
  if (G.keys.bracelet && !B.usedEclat && me.moves.some(mv => MOVES[mv.id].pw && G.keys['eclat_' + MOVES[mv.id].t])) out.push({ k: 'eclat', label: 'Éclat' });
  if (G.keys.couronne && !B.usedGiant && !B.giantPending && !(me._giant > 0)) out.push({ k: 'giant', label: 'Colosse' });
  return out;
}
async function doBloom(side) {
  const m = side === 'p' ? pm() : fm(), s = side === 'p' ? B.spr.p : B.spr.f;
  sfx('evolve'); await tween(500, k => { B.screenFlash = 0.6 * Math.sin(k * Math.PI); s.flash = k; }); s.flash = 0; B.screenFlash = 0;
  m._bloom = true;
  await bsay(`${monName(m)} entre en Floraison ! Des pétales de sève l'entourent.`, 1300);
}
async function doGiant(side) {
  const m = side === 'p' ? pm() : fm(), s = side === 'p' ? B.spr.p : B.spr.f;
  sfx('super'); const from = m.hp;
  await tween(600, k => { s.scale = 1 + 0.35 * k; B.screenFlash = 0.4 * Math.sin(k * Math.PI); }); B.screenFlash = 0;
  m._giant = 3; m.hp = Math.min(maxHp(m), m.hp * 2);
  await animHp(side === 'p' ? 'me' : 'foe', from, m.hp);
  await bsay(`${monName(m)} devient colossal ! Ses PV doublent pendant trois tours.`, 1300);
}
async function endGiant(side) {
  const m = side === 'p' ? pm() : fm(), s = side === 'p' ? B.spr.p : B.spr.f;
  const from = m.hp; m.hp = Math.ceil(m.hp / 2);
  await tween(400, k => { s.scale = 1.35 - 0.35 * k; }); s.scale = 1;
  await animHp(side === 'p' ? 'me' : 'foe', from, m.hp);
  await bsay(`${monName(m)} reprend sa taille normale.`, 1000);
}
async function eclatIntro() {
  sfx('badge');
  await tween(700, k => { B.screenFlash = 0.8 * Math.sin(k * Math.PI); }); B.screenFlash = 0;
  await bsay(`Le Bracelet d'Éclat brille ! ${monName(pm())} libère toute la puissance de son lien avec toi !`, 1400);
}
async function foePower() {
  const t = B.trainer; if (!t || !t.power || B.foePowerUsed) return;
  if (B.fi !== B.foes.length - 1) return;
  B.foePowerUsed = true;
  await bsay(`${trName()} active un pouvoir ancien !`, 1000);
  if (t.power === 'giant') await doGiant('f'); else await doBloom('f');
  renderHud('foe');
}
