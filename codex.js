'use strict';
/* ============================================================
   ÉCLOSIA — Codex vivant et Atlas interactif
   ============================================================ */
function habitatsOf(sp) {
  const out = [];
  for (const id in ROUTES) {
    const e = ROUTES[id].enc || {};
    for (const k in e) for (const r of e[k]) if (r[0] === sp) out.push({ id, where: ROUTES[id].name, how: k === 'water' ? 'dans l\'eau' : k === 'cave' ? 'en grotte' : 'dans les herbes', tod: r[4] === 'n' ? 'la nuit' : r[4] === 'd' ? 'le jour' : '' });
  }
  for (const k in LEGENDS) if (LEGENDS[k].sp === sp) out.push({ where: 'Lieu légendaire', how: '', tod: '' });
  return out;
}
function chainOf(sp) {
  let a = sp; while (SP[a].prev) a = SP[a].prev;
  const c = [a]; while (SP[c[c.length - 1]].next) c.push(SP[c[c.length - 1]].next);
  return c;
}
function playCry(sp) {
  if (!SND.ctx) return;
  const h = hashStr(sp), t = SND.ctx.currentTime + 0.02, base = 220 + (h % 500);
  const st = SP[sp].stage, low = st === '3' || st === 'L' ? 0.6 : st === '2' ? 0.8 : 1;
  const wv = ['square', 'sawtooth', 'triangle'][h % 3];
  tone(base * low, t, 0.12, wv, 0.08, SND.sfxGain || SND.master, base * low * 1.5);
  tone(base * low * 1.25, t + 0.11, 0.18, wv, 0.07, SND.sfxGain || SND.master, base * low * 0.7);
  if (h % 2) tone(base * low * 1.6, t + 0.28, 0.12, 'triangle', 0.05, SND.sfxGain || SND.master, base * low);
}
function livingCodex() {
  return new Promise(res => {
    const p = el('panel codex', 0, 0, 240, 160);
    let sel = 0, top = 0, mode = 'list', scroll = 0, raf = 0; const rows = 11;
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const renderList = () => {
      stop();
      if (sel < top) top = sel; if (sel >= top + rows) top = sel - rows + 1;
      const sp = DEX[sel], s = SP[sp], seen = G.seen[sp], caught = G.caught[sp];
      const nSeen = Object.keys(G.seen).length, nCaught = Object.keys(G.caught).length;
      p.className = 'panel codex';
      p.innerHTML = `<div class="cl"><div class="ptitle">Codex vivant · Vus ${nSeen} · Pris ${nCaught} / ${DEX.length}</div>${DEX.slice(top, top + rows).map((id, j) => `<div class="mi${top + j === sel ? ' sel' : ''}"><span>${String(SP[id].num).padStart(3, '0')} ${G.seen[id] ? esc(SP[id].n) : '-----'}</span><b>${G.caught[id] ? '●' : G.seen[id] ? '○' : ''}</b></div>`).join('')}</div>
        <div class="cr">${seen ? `<img class="bob" src="${monURL(sp)}" alt="">` : `<img class="sil" src="${silhouetteURL(sp)}" alt="">`}<div class="cn">${seen ? esc(s.n) : '???'}</div><div>${seen ? s.types.map(typePill).join('') : ''}</div><p>${seen ? 'A : ouvrir la fiche' : 'Aucune donnée.'}</p></div>`;
    };
    const renderDetail = () => {
      const sp = DEX[sel], s = SP[sp], L = DEX_LORE[sp] || { p: [s.desc], h: '', cm: 50, kg: 10 }, caught = G.caught[sp];
      const hab = habitatsOf(sp);
      const chain = chainOf(sp);
      const paras = caught ? L.p : [L.p[0].split('. ')[0] + '.', 'Capture-le pour compléter sa fiche.'];
      p.className = 'panel codexd';
      p.innerHTML = `<div class="cdl"><canvas width="384" height="384"></canvas>
        <div class="cn">${String(s.num).padStart(3, '0')} · ${esc(s.n)}</div><div>${s.types.map(typePill).join('')}</div>
        <div class="cst">${(L.cm / 100).toFixed(2).replace('.', ',')} m · ${String(L.kg).replace('.', ',')} kg</div>
        <div class="cev">${chain.map(c => `<img src="${G.seen[c] ? monURL(c) : silhouetteURL(c)}" class="${c === sp ? 'on' : ''}" alt="">`).join('<span>›</span>')}</div></div>
        <div class="cdr"><div class="ctx" style="transform:translateY(${-scroll}px)">
        <h4>Habitat</h4><p>${esc(cap1(L.h))}.</p>${hab.length ? `<p class="hab">${hab.slice(0, 5).map(x => esc(x.where + (x.how ? ', ' + x.how : '') + (x.tod ? ', ' + x.tod : ''))).join('<br>')}</p>` : ''}
        <h4>Notes</h4>${paras.map(t => `<p>${esc(t)}</p>`).join('')}
        ${caught && L.soin ? `<h4>Soins et dressage</h4><p>${esc(L.soin)}</p>` : ''}
        ${caught && L.cb ? `<h4>En combat</h4><p>${esc(L.cb)}${(w => w.length ? ' Méfie-toi des attaques ' + w.map(t => TN[t]).join(', ') + '.' : '')(TYPES.filter(t => typeEff(t, s.types) > 1).slice(0, 4))}</p>` : ''}
        ${caught && L.tem ? `<h4>Témoignage</h4><p class="hab">${esc(L.tem)}</p>` : ''}
        ${caught && G.flags.starter ? `<p class="nv">Nova : « ${esc(novaDexNote(sp))} »</p>` : ''}
        </div></div><div class="chint">↑↓ lire · A cri · B retour</div>`;
      const cv = p.querySelector('canvas'), g = cv.getContext('2d'), img = bigMon(sp, 384); g.scale(4, 4); g.imageSmoothingEnabled = true;
      const t0 = performance.now();
      const loop = () => {
        const t = (performance.now() - t0) / 1000;
        g.clearRect(0, 0, 96, 96); g.imageSmoothingEnabled = true;
        g.fillStyle = 'rgba(0,0,0,.18)'; g.beginPath(); g.ellipse(48, 88, 26 - Math.sin(t * 3) * 2, 5, 0, 0, 7); g.fill();
        const by = Math.sin(t * 3) * 3, sq = 1 + Math.sin(t * 6) * 0.025;
        if (SP[sp].gal && typeof galAnim === 'function') galAnim(g, img, 0, -6 + by, 96, 96, t, { sp, idle: 1 }); else { g.save(); g.translate(48, 88); g.scale(1 / sq, sq); g.drawImage(img, -48, -92 + by, 96, 96); g.restore(); }
        if (s.stage === 'L') { for (let i = 0; i < 6; i++) { const a = t + i; g.fillStyle = 'rgba(255,240,160,.8)'; g.fillRect(48 + Math.cos(a) * 40, 50 + Math.sin(a * 1.3) * 34, 2, 2); } }
        raf = requestAnimationFrame(loop);
      };
      stop(); loop();
    };
    renderList();
    const h = {
      press(b) {
        if (mode === 'list') {
          if (b === 'up') sel = (sel - 1 + DEX.length) % DEX.length;
          else if (b === 'down') sel = (sel + 1) % DEX.length;
          else if (b === 'left') sel = Math.max(0, sel - rows);
          else if (b === 'right') sel = Math.min(DEX.length - 1, sel + rows);
          else if (b === 'a') { if (!G.seen[DEX[sel]]) { sfx('cancel'); return; } mode = 'det'; scroll = 0; sfx('select'); renderDetail(); playCry(DEX[sel]); return; }
          else if (b === 'b') { sfx('cancel'); stop(); uiPop(h); p.remove(); res(); return; }
          sfx('move'); renderList();
        } else {
          if (b === 'b') { mode = 'list'; sfx('cancel'); renderList(); return; }
          if (b === 'a') { playCry(DEX[sel]); return; }
          if (b === 'down' || b === 'up') { const tx = p.querySelector('.ctx'), box = p.querySelector('.cdr'); const max = Math.max(0, tx.scrollHeight - box.clientHeight); const stepPx = box.clientHeight * 0.35; scroll = Math.max(0, Math.min(max, scroll + (b === 'down' ? stepPx : -stepPx))); tx.style.transform = `translateY(${-scroll}px)`; return; }
          if (b === 'left' || b === 'right') { let n = sel; do { n = (n + (b === 'right' ? 1 : -1) + DEX.length) % DEX.length; } while (!G.seen[DEX[n]] && n !== sel); sel = n; scroll = 0; sfx('move'); renderDetail(); playCry(DEX[sel]); }
        }
      },
    };
    uiPush(h);
  });
}
const cap1 = s => s.charAt(0).toUpperCase() + s.slice(1);
const NOVA_DEX = {
  flore: ["Celui-là sent l'herbe coupée. Mon père en avait un dans son atelier.", "Il fait pousser des fleurs partout. Tu devrais l'emmener à Graineval."],
  feu: ["Il me réchauffe les mains. Garde-le près de toi les nuits froides.", "Attention à tes sourcils quand il éternue."],
  eau: ["Il me rappelle la mer de mon enfance. La bonne mer, celle d'avant.", "Il nage comme si l'eau n'avait jamais fait de mal à personne."],
  foudre: ["Ses poils crépitent quand je l'approche. Je crois qu'il m'aime bien.", "Ne le laisse pas près de la console de Néo."],
  roc: ["Solide. Comme toi, quand je tombe.", "Il dort sur mon sac dès que je le pose."],
  vent: ["J'aimerais voler comme lui, parfois. Juste pour voir Éclosia d'en haut.", "Il a volé mon ruban. Deux fois."],
  givre: ["Il a froid au cœur, mais il est doux. Ça me rappelle quelqu'un.", "Il a gelé mon thé. Exprès, j'en suis sûre."],
  ombre: ["Il me fait peur et me rassure en même temps. C'est bizarre.", "Il me suit la nuit. Je crois qu'il veille sur moi."],
  lumiere: ["Sa lumière ressemble aux lanternes de Graineval.", "Avec lui, les nuits sont moins longues."],
  esprit: ["Il m'a regardée comme s'il savait ce que je pensais de toi. Gênant.", "Il rêve en plein jour. Moi aussi, parfois."],
  toxine: ["Pas touche. Mais il a de beaux yeux.", "Il nettoie les marais mieux que n'importe qui."],
  acier: ["Ilan en avait un, petit. Il le polissait tous les soirs.", "Il tinte quand il est content."],
  combat: ["Il m'a battue au bras de fer. Je ne veux pas en parler.", "Il te ressemble : il ne recule jamais."],
  normal: ["Simple et fidèle. Les meilleurs compagnons sont souvent comme ça.", "Il dort plus que moi. C'est un exploit."],
  dragon: ["Un dragon ! Tu te rends compte ? Néo va être vert de jalousie.", "Il me regarde de haut. Littéralement."],
};
function novaDexNote(sp) { const t = SP[sp].types[0], l = NOVA_DEX[t] || NOVA_DEX.normal; return l[hashStr(sp) % l.length]; }

/* ---------- Atlas ---------- */
function atlasScreen() {
  return new Promise(res => {
    const regs = Object.keys(REGIONS).filter(r => REGIONS[r].chain.some(id => G.visited[id]) || r === RT.map.reg);
    let ri = Math.max(0, regs.indexOf(RT.map.reg));
    const here = RT.map.parent || (RT.map.id.startsWith('sanct') ? SPECIAL_RET[RT.map.id].map : RT.map.id);
    let cur = here;
    const p = el('panel atlas', 0, 0, 240, 160);
    const render = () => {
      const rk = regs[ri], R = REGIONS[rk], pos = regionLayout(rk);
      if (!R.chain.includes(cur)) cur = R.chain.find(id => id === here) || R.chain[0];
      const xs = Object.values(pos).map(q => q[0]), ys = Object.values(pos).map(q => q[1]);
      const minx = Math.min(...xs), maxx = Math.max(...xs), miny = Math.min(...ys), maxy = Math.max(...ys);
      const s = Math.min(120 / Math.max(1, maxx - minx), 96 / Math.max(1, maxy - miny));
      const P = id => [14 + (pos[id][0] - minx) * s + (120 - (maxx - minx) * s) / 2, 28 + (pos[id][1] - miny) * s + (96 - (maxy - miny) * s) / 2];
      let svg = `<svg viewBox="0 0 148 136"><defs><radialGradient id="sea"><stop offset="0" stop-color="#2a6a8a"/><stop offset="1" stop-color="#123a52"/></radialGradient></defs><rect x="0" y="0" width="148" height="136" rx="6" fill="url(#sea)"/>`;
      for (const id of R.chain) { const [x, y] = P(id); svg += `<ellipse cx="${x}" cy="${y}" rx="${14}" ry="${10}" fill="${['#8ccf6c', '#86bfa6', '#77685e', '#9ad86a'][ri % 4]}" opacity=".55"/>`; }
      for (let i = 0; i < R.chain.length - 1; i++) { const [x1, y1] = P(R.chain[i]), [x2, y2] = P(R.chain[i + 1]); svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#f2e2b0" stroke-width="2" stroke-dasharray="3 2"/>`; }
      R.chain.forEach((id, i) => { const [x, y] = P(id); const town = i % 2 === 0; const v = G.visited[id];
        svg += town ? `<rect x="${x - 4}" y="${y - 4}" width="8" height="8" rx="2" fill="${v ? '#fff6d8' : '#7a8a8a'}" stroke="#1c1424" stroke-width="1.2"/>` : `<circle cx="${x}" cy="${y}" r="2.2" fill="#f2e2b0"/>`;
        if (id === cur) svg += `<circle cx="${x}" cy="${y}" r="8" fill="none" stroke="#ff6f59" stroke-width="2"><animate attributeName="r" values="7;10;7" dur="1.2s" repeatCount="indefinite"/></circle>`;
        if (id === here) svg += `<circle cx="${x}" cy="${y - 9}" r="2.6" fill="#ff6f59"/>`; });
      svg += `</svg>`;
      const def = TOWNS[cur] || ROUTES[cur] || {}, v = G.visited[cur] || (ROUTES[cur] && 1);
      const gi = GYMS.findIndex(g => g.town === cur);
      const lore = (typeof LORE_TEXTS !== 'undefined') ? LORE_TEXTS.filter(l => l.map === cur) : [];
      const leg = Object.keys(LEGENDS).filter(k => POST_LEGENDS.some(q => q[0] === k && q[1] === cur));
      p.innerHTML = `<div class="ahead"><b>◀ ${esc(R.name)} ▶</b><span>${ri + 1}/${regs.length}</span></div><div class="amap">${svg}</div>
        <div class="acard"><div class="an">${esc(def.name || cur)}</div><div class="ad">${v ? esc(def.desc || (ROUTES[cur] ? 'Une route sauvage.' : '')) : 'Lieu inconnu.'}</div>
        ${gi >= 0 ? `<div class="ab">${esc(GYMS[gi].leader)} · ${esc(GYMS[gi].badge)} ${G.badges[gi] ? '✓' : ''}</div>` : ''}
        ${lore.length ? `<div class="al">Écrits : ${lore.filter(l => G.read && G.read[l.id]).length}/${lore.length}</div>` : ''}
        ${leg.length && G.flags.ending ? `<div class="al">Une présence légendaire...</div>` : ''}
        ${cur === here ? '<div class="ah">Tu es ici.</div>' : ''}
        ${canFly() && !REGIONS[regs[ri]].noFly && !REGIONS[RT.map.reg].noFly && TOWNS[cur] && G.visited[cur] && cur !== here ? '<div class="ah">A : s\'envoler</div>' : ''}</div>
        <div class="chint">↑↓ lieux · L/R ◀▶ régions · B fermer</div>`;
    };
    render();
    const h = {
      async press(b) {
        const R = REGIONS[regs[ri]], i = R.chain.indexOf(cur);
        if (b === 'up') { cur = R.chain[Math.min(R.chain.length - 1, i + 1)]; sfx('move'); render(); return; }
        if (b === 'down') { cur = R.chain[Math.max(0, i - 1)]; sfx('move'); render(); return; }
        if (b === 'left' || b === 'right') { ri = (ri + (b === 'right' ? 1 : -1) + regs.length) % regs.length; cur = null; sfx('move'); render(); return; }
        if (b === 'b') { sfx('cancel'); uiPop(h); p.remove(); res(false); return; }
        if (b === 'a' && canFly() && !REGIONS[regs[ri]].noFly && !REGIONS[RT.map.reg].noFly && TOWNS[cur] && G.visited[cur] && cur !== here) {
          uiPop(h); p.remove();
          const m = getMap(cur), bd = m.buildings.find(bb => bb.kind === 'center') || m.buildings[0];
          const flyer = G.party.find(mm => SP[mm.sp].types.includes('vent'));
          await say(`${monName(flyer)} s'envole vers ${TOWNS[cur].name} !`, { auto: 900 });
          if (bd) await warp(cur, bd.door[0], bd.door[1] + 1, 'down'); else await warp(cur, 13, 12, 'down');
          res(true);
        }
      },
    };
    uiPush(h);
  });
}
