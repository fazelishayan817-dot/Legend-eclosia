'use strict';
/* ============================================================
   ÉCLOSIA HD-2D : rendu 3D de tout le monde ouvert (Three.js r128)
   - chaque carte du jeu (villes, routes, grottes, intérieurs, grand continent) est
     reconstruite en 3D : sol en tuiles, blocs en relief, arbres, bâtiments, eau animée
   - joueur et PNJ en billboards (mêmes dessins que la 2D) avec ombres réelles
   - cycle jour/nuit, météo, lampadaires, post-traitement (profondeur de champ, lueur)
   - en cas de souci, retour automatique au rendu 2D d'origine
   ============================================================ */
(function () {
  const T = window.THREE;
  const H3 = window.H3D = { mode: 2, ok: false, failed: false, err: null, battle3D: false };   // 0 = 2D, 1 = 3D, 2 = 3D + effets
  try { const v = localStorage.getItem('eclosia_hd3d'); if (v != null) H3.mode = +v; } catch (e) { }
  if (!T) { H3.failed = true; H3.err = 'Three.js absent'; return; }

  const lerp = (a, b, k) => a + (b - a) * k;
  const h2r = h => { const n = parseInt(String(h).replace('#', ''), 16); return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; };
  const mix = (a, b, k) => { const A = h2r(a), B = h2r(b); return [lerp(A[0], B[0], k), lerp(A[1], B[1], k), lerp(A[2], B[2], k)]; };
  const std = o => new T.MeshStandardMaterial(o);
  function ctex(c, pixel) {
    const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding;
    if (pixel) { t.magFilter = T.NearestFilter; t.minFilter = T.NearestFilter; t.generateMipmaps = false; }
    else { t.anisotropy = 4; }
    return t;
  }

  /* ---------- Moteur ---------- */
  let R = null, scene, camera, glc, post, sun, hemi, amb, look, slots = [], lampLights = [], halo;
  let world = null;   // carte courante en 3D
  let BLOB_G = null, BLOB_M = null;
  let lastT = 0, envK = { night: 0, rain: 0, fog: 0, snow: 0, pollen: 0 };
  const CELLW = 40, CELLH = 48, NSLOT = 32, CHAR = 1.25;   // CHAR : taille des personnages par rapport aux cases (façon HD-2D)
  function init() {
    const screen = document.getElementById('screen'), cv = document.getElementById('cv'); if (!screen || !cv) return false;
    glc = document.createElement('canvas'); glc.id = 'gl3d';
    glc.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;z-index:0';
    screen.insertBefore(glc, cv); cv.style.position = 'relative'; cv.style.zIndex = '1';
    R = new T.WebGLRenderer({ canvas: glc, antialias: true, powerPreference: 'high-performance' });
    R.outputEncoding = T.sRGBEncoding; R.toneMapping = T.ACESFilmicToneMapping; R.toneMappingExposure = 1.0;
    R.shadowMap.enabled = true; R.shadowMap.type = T.PCFSoftShadowMap;
    scene = new T.Scene(); scene.background = new T.Color('#9fd0f0'); scene.fog = new T.FogExp2('#9fd0f0', 0.01);
    camera = new T.PerspectiveCamera(36, 1.5, 0.1, 300); look = new T.Vector3();
    amb = new T.AmbientLight('#8090b0', 0.12); hemi = new T.HemisphereLight('#cfe8ff', '#6a7a4a', 0.55);
    sun = new T.DirectionalLight('#fff3dc', 1.35); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.03;
    Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 60 }); sun.shadow.camera.updateProjectionMatrix();
    scene.add(amb, hemi, sun, sun.target);
    for (let i = 0; i < 6; i++) { const L = new T.PointLight('#ffc878', 0, 6, 2); scene.add(L); lampLights.push(L); }
    // personnages : une petite toile par emplacement, dessinée à la résolution d'origine des sprites
    // (hero_ow.png, npc_atlas.png, nova_ow.png…, 1 pixel du sprite = 1 pixel de texture), redessinée seulement quand l'image change
    slots.blobs = [];
    const bc = mkCanvas(32, 32), bx = bc.getContext('2d'), gr = bx.createRadialGradient(16, 16, 0, 16, 16, 16); gr.addColorStop(0, 'rgba(0,0,0,0.5)'); gr.addColorStop(0.7, 'rgba(0,0,0,0.18)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); bx.fillStyle = gr; bx.fillRect(0, 0, 32, 32);
    BLOB_G = new T.PlaneGeometry(0.85, 0.5); BLOB_G.rotateX(-Math.PI / 2); BLOB_M = new T.MeshBasicMaterial({ map: ctex(bc), transparent: true, depthWrite: false });
    const pg = new T.PlaneGeometry(CELLW / 16 * CHAR, CELLH / 16 * CHAR);
    for (let i = 0; i < NSLOT; i++) {
      const cv = mkCanvas(CELLW * 4, CELLH * 4), tx = new T.CanvasTexture(cv); tx.encoding = T.sRGBEncoding; tx.generateMipmaps = false; tx.minFilter = T.LinearFilter; tx.magFilter = T.NearestFilter;
      const mat = std({ map: tx, transparent: true, alphaTest: 0.3, roughness: 0.9 });
      const m = new T.Mesh(pg, mat); m.castShadow = true; m.customDepthMaterial = new T.MeshDepthMaterial({ depthPacking: T.RGBADepthPacking, map: tx, alphaTest: 0.5 });
      m.position.y = (CELLH / 32 - 6 / 16) * CHAR;
      const piv = new T.Group(); piv.add(m); piv.visible = false; scene.add(piv);
      piv.userData = { cv, ctx: cv.getContext('2d'), tx, mesh: m, sig: '' }; slots.push(piv);
      const bl = new T.Mesh(BLOB_G, BLOB_M); bl.visible = false; scene.add(bl); slots.blobs.push(bl);
    }
    halo = new T.Mesh(new T.RingGeometry(0.34, 0.47, 40), new T.MeshBasicMaterial({ color: '#fff8e0', transparent: true, depthWrite: false, toneMapped: false })); halo.rotation.x = -Math.PI / 2; scene.add(halo);
    buildWeather(); post = makePost();
    new ResizeObserver(resize).observe(screen); resize();
    H3.ok = true; return true;
  }
  function resize() {
    if (!R) return; const s = document.getElementById('screen'), w = s.clientWidth || 240, h = s.clientHeight || 160;
    R.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75)); R.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); post.resize(w, h);
  }

  /* ---------- Eau ---------- */
  const WU = { uT: { value: 0 }, uNight: { value: 0 }, uRain: { value: 0 } };
  const WATER = new T.ShaderMaterial({
    uniforms: WU, transparent: true, depthWrite: false,
    vertexShader: `varying vec3 vW; void main(){ vec4 p = vec4(position,1.0);
      #ifdef USE_INSTANCING
      p = instanceMatrix * p;
      #endif
      vec4 w = modelMatrix * p; vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: `uniform float uT, uNight, uRain; varying vec3 vW;
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
      void main(){ float w = sin(vW.x*3.1+uT*1.3)*sin(vW.z*2.7-uT*1.1) + 0.5*sin((vW.x+vW.z)*5.3+uT*2.2);
        float a = 0.34 + 0.1*w; vec3 c = mix(vec3(0.25,0.55,0.8), vec3(0.85,0.95,1.0), 0.35 + 0.25*w);
        float sp = smoothstep(1.05, 1.35, w); a += sp*0.45;
        if (uRain > 0.01) { vec2 cl = floor(vW.xz*1.5); float ph = fract(uT*0.9 + h(cl)); float d = length(fract(vW.xz*1.5)-0.5); a += smoothstep(0.04,0.0,abs(d-ph*0.45))*(1.0-ph)*uRain*0.6; }
        gl_FragColor = vec4(c * mix(1.0, 0.4, uNight), clamp(a, 0.0, 0.8)); }`,
  });

  /* ---------- Construction d'une carte en 3D ---------- */
  const CH = 16;
  const BLOCK_H = { w: 1.35, R: 0.95, r: 0.42, F: 0.5, b: 0.62, S: 0.55, c: 0.72, C: 0.75, B: 1.2, t: 0.56, p: 0.6, G: 0.9, V: 0.9 };
  const SKIP_BLOCK = new Set(['T', 'x', 'D', '~', 'L']);
  function instanced(geo, mat, items, cast = true, recv = true) {
    const m = new T.InstancedMesh(geo, mat, Math.max(1, items.length)); m.count = items.length; const O = new T.Object3D();
    items.forEach((it, i) => { O.position.set(it[0], it[1], it[2]); O.rotation.set(0, it[3] || 0, 0); const s = it[4] || 1; O.scale.set(s * (it[5] || 1), s * (it[6] || 1), s * (it[7] || 1)); O.updateMatrix(); m.setMatrixAt(i, O.matrix); });
    m.instanceMatrix.needsUpdate = true; m.castShadow = cast; m.receiveShadow = recv; return m;
  }
  const MAT_CACHE = {};
  function blockMats(ch, pal) {
    const k = pal + '|' + ch; if (MAT_CACHE[k]) return MAT_CACHE[k];
    const top = ctex(tileHD(ch, pal, 0, 0)), side = std({ map: top, color: '#b8b0a8', roughness: 0.9 }), tm = std({ map: top, roughness: 0.85 });
    return (MAT_CACHE[k] = [side, side, tm, side, side, side]);
  }
  function leafCanvas(P, snow) {
    const c = mkCanvas(32, 32), x = c.getContext('2d'), r = rng(7); x.fillStyle = P.tr; x.fillRect(0, 0, 32, 32);
    for (let i = 0; i < 170; i++) { x.fillStyle = [P.tr2, P.tr3, P.tr, P.tr2][Math.floor(r() * 4)]; x.fillRect(Math.floor(r() * 32), Math.floor(r() * 32), 2, 2); }
    if (snow) { for (let i = 0; i < 90; i++) { x.fillStyle = '#ffffff'; x.fillRect(Math.floor(r() * 32), Math.floor(r() * 14), 3, 2); } }
    return c;
  }
  // touffe d'herbe haute dessinée comme la tuile 2D (mêmes brins courbes), sur fond transparent
  function bladeCanvas(P) {
    const c = mkCanvas(64, 40), x = c.getContext('2d'), r = rng(9);
    x.scale(2, 2); x.lineCap = 'round';
    for (let q = 0; q < 4; q++) {
      const bx = 4 + q * 8 + r() * 2, by = 16 + r() * 2;
      for (let k = -2; k <= 2; k++) {
        x.strokeStyle = k === 0 ? lhex(P.tg, 0.25) : (k < 0 ? P.tg : P.tg2); x.lineWidth = 2.2;
        x.beginPath(); x.moveTo(bx + k * 1.6, by + 4); x.quadraticCurveTo(bx + k * 2.6, by - 4, bx + k * 3.2, by - 12 + Math.abs(k) * 1.5); x.stroke();
      }
    }
    return c;
  }
  function chunkGround(m, cx, cy) {
    const S = 2, c = mkCanvas(CH * TS * S, CH * TS * S), x = c.getContext('2d');
    x.scale(S, S); x.translate(-cx * CH * TS, -cy * CH * TS);
    const x0 = cx * CH, y0 = cy * CH, x1 = Math.min(m.w, x0 + CH), y1 = Math.min(m.h, y0 + CH);
    const base = m.kind === 'int' ? null : '.';
    for (let y = y0; y < y1; y++) for (let xx = x0; xx < x1; xx++) {
      let ch = m.t[y][xx]; if ((ch === 'T' || ch === 'L') && base) ch = base;
      x.drawImage(tileHD(ch, m.palAt ? m.palAt(xx, y) : m.pal, hashStr(xx + ',' + y) % 4, 0), xx * TS, y * TS, TS, TS);
    }
    if (m.kind !== 'int' && typeof softenEdges === 'function') { try {
      if (m.palAt) { for (let y = y0; y < y1; y++) for (let xx = x0; xx < x1; xx++) softenEdges(x, m, getPal(m.palAt(xx, y)), xx, y, xx + 1, y + 1); }
      else softenEdges(x, m, getPal(m.pal), x0, y0, x1, y1); } catch (e) { } }
    return c;
  }
  // relief doux : herbe un peu bombée, chemins plats, eau en creux (2 sommets par case)
  const TH = { '~': -0.3, ',': 0, '=': 0, 's': 0.0, 'D': 0, 'x': 0 };
  function tileH(m, x, y) { if (m.kind === 'int') return 0; x = Math.max(0, Math.min(m.w - 1, x)); y = Math.max(0, Math.min(m.h - 1, y)); const c = m.t[y][x]; return c in TH ? TH[c] : 0.035; }
  H3.groundAt = (x, y) => (RT.map ? Math.max(0, tileH(RT.map, Math.round(x), Math.round(y))) : 0);
  function reliefGeometry(m, x0, y0, cw, chh) {
    const g = new T.PlaneGeometry(cw, chh, cw * 2, chh * 2); g.rotateX(-Math.PI / 2); g.translate(x0 + cw / 2 - 0.5, 0, y0 + chh / 2 - 0.5);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const X = p.getX(i), Z = p.getZ(i), fx = X + 0.5, fz = Z + 0.5;
      const onX = Math.abs(fx - Math.round(fx)) < 1e-3, onZ = Math.abs(fz - Math.round(fz)) < 1e-3;
      const xs = onX ? [Math.round(fx) - 1, Math.round(fx)] : [Math.floor(fx)], zs = onZ ? [Math.round(fz) - 1, Math.round(fz)] : [Math.floor(fz)];
      let h = 0, n = 0, lo = 0; for (const a of xs) for (const b of zs) { const v = tileH(m, a, b); h += v; n++; lo = Math.min(lo, v); }
      p.setY(i, lo < -0.1 && (onX || onZ) ? (h / n + lo) / 2 : h / n);
    }
    g.computeVertexNormals(); return g;
  }
  function plankCanvas(base, carve) {
    const c = mkCanvas(64, 32), x = c.getContext('2d'), r = rng(31); x.fillStyle = base; x.fillRect(0, 0, 64, 32);
    for (let y = 0; y < 32; y += 8) { x.fillStyle = dhex(base, 0.18); x.fillRect(0, y + 7, 64, 1); x.fillStyle = lhex(base, 0.1); x.fillRect(0, y, 64, 1); }
    for (let i = 0; i < 40; i++) { x.fillStyle = dhex(base, 0.08 + r() * 0.1); x.fillRect(Math.floor(r() * 64), Math.floor(r() * 32), 3 + Math.floor(r() * 6), 1); }
    if (carve) { x.fillStyle = 'rgba(60,35,15,.75)'; [[10, 9, 44], [10, 15, 36], [10, 21, 40]].forEach(([a, b, w]) => x.fillRect(a, b, w, 2)); x.strokeStyle = dhex(base, 0.35); x.lineWidth = 2; x.strokeRect(1, 1, 62, 30); }
    return c;
  }
  function propMats(W) {
    if (W.res.props) return W.res.props;
    const bk = mkCanvas(64, 64), bx = bk.getContext('2d'), r = rng(5), cols = ['#c4553e', '#4a8fe0', '#58b35a', '#e9c43a', '#a35cc6', '#e8e0d0', '#3a6a8a'];
    bx.fillStyle = '#4a3020'; bx.fillRect(0, 0, 64, 64);
    for (const sy of [4, 24, 44]) { let xx = 3; while (xx < 60) { const w = 3 + Math.floor(r() * 4), h = 12 + Math.floor(r() * 6); bx.fillStyle = cols[Math.floor(r() * cols.length)]; bx.fillRect(xx, sy + 18 - h, w, h); bx.fillStyle = 'rgba(255,255,255,.25)'; bx.fillRect(xx, sy + 18 - h + 3, w, 1); xx += w + 1; } bx.fillStyle = '#6a4a30'; bx.fillRect(0, sy + 18, 64, 2); }
    const sc = mkCanvas(32, 32), sx = sc.getContext('2d'), gsc = sx.createLinearGradient(0, 0, 0, 32); gsc.addColorStop(0, '#9af0ff'); gsc.addColorStop(1, '#3aa8d0'); sx.fillStyle = gsc; sx.fillRect(0, 0, 32, 32); sx.fillStyle = 'rgba(255,255,255,.7)'; sx.fillRect(4, 6, 14, 2); sx.fillRect(4, 11, 20, 2); sx.fillRect(4, 16, 10, 2);
    const scr = ctex(sc);
    return (W.res.props = {
      darkWood: std({ map: ctex(plankCanvas('#6a4a30')), roughness: 0.85 }), lightWood: std({ map: ctex(plankCanvas('#b8885a')), roughness: 0.7 }),
      signBoard: std({ map: ctex(plankCanvas('#c89a62', true)), roughness: 0.8 }), counter: std({ map: ctex(plankCanvas('#8a5a3c')), roughness: 0.75 }),
      metal: std({ color: '#3a4450', metalness: 0.4, roughness: 0.45 }), screen: std({ map: scr, emissiveMap: scr, emissive: '#ffffff', emissiveIntensity: 0.9, toneMapped: false }),
      books: std({ map: ctex(bk), roughness: 0.85 }), pot: std({ color: '#b0603a', roughness: 0.8 }), plant: std({ color: '#3a9a48', roughness: 0.8, flatShading: true }),
      stone: std({ color: '#7a7a86', roughness: 0.9 }), stoneLight: std({ color: '#a8a8b4', roughness: 0.6, metalness: 0.1 }),
    });
  }
  function buildChunk(W, cx, cy) {
    const m = W.map, g = new T.Group();
    const x0 = cx * CH, y0 = cy * CH, x1 = Math.min(m.w, x0 + CH), y1 = Math.min(m.h, y0 + CH), cw = x1 - x0, chh = y1 - y0;
    const cpal = m.palAt ? m.palAt(Math.min(m.w - 1, x0 + (CH >> 1)), Math.min(m.h - 1, y0 + (CH >> 1))) : m.pal, P = getPal(cpal), RS = W.res[cpal] ||= {};
    const gt = ctex(chunkGround(m, cx, cy)); gt.repeat.set(cw / CH, chh / CH); gt.offset.set(0, 1 - chh / CH);
    const gm = std({ map: gt, roughness: 0.95 }); gm.userData.base = 0.95; W.groundMats.push(gm);
    const ground = new T.Mesh(reliefGeometry(m, x0, y0, cw, chh), gm); ground.receiveShadow = true; g.add(ground);
    const by = {}, trees = [], tall = [], water = [], lamps = [];
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      const ch = m.t[y][x];
      if (ch === 'T') trees.push([x, y]); else if (ch === '"') tall.push([x, y]); else if (ch === '~') water.push([x, y]); else if (ch === 'L') lamps.push([x, y]);
      else if (SOLID.has(ch) && !SKIP_BLOCK.has(ch)) (by[ch] ||= []).push([x, y]);
    }
    const box = W.res.box ||= new T.BoxGeometry(1, 1, 1), rr = rng(hashStr(m.id + ':props' + cx + ',' + cy));
    for (const ch in by) {
      const cells = by[ch];
      if (ch === 'r' || ch === 'R') { const big = ch === 'R', rm = RS['rock' + ch] ||= std({ color: P.rk, roughness: 0.95, flatShading: true });
        g.add(instanced(W.res.rockG ||= new T.DodecahedronGeometry(0.5, 0), rm, cells.map(([x, y]) => [x + (rr() - 0.5) * 0.1, big ? 0.38 : 0.18, y, rr() * 6, big ? 1.05 : 0.62, 1, big ? 0.85 : 0.7, 1]))); continue; }
      if (ch === 'b') { RS.bush ||= std({ map: ctex(leafCanvas(P, cpal === 'neige')), flatShading: true, roughness: 0.9 });
        g.add(instanced(W.res.bushG ||= new T.IcosahedronGeometry(0.42, 1), RS.bush, cells.map(([x, y]) => [x, 0.34, y, rr() * 6, 1, 1.1, 0.85, 1.1]))); continue; }
      if (ch === 'F') { const wd = W.res.wood ||= std({ color: '#9a7048', roughness: 0.85 }), isF = (x, y) => m.t[y] && m.t[y][x] === 'F', rails = [];
        g.add(instanced(W.res.postG ||= new T.BoxGeometry(0.12, 0.62, 0.12), wd, cells.map(([x, y]) => [x, 0.31, y])));
        cells.forEach(([x, y]) => { const hz = isF(x - 1, y) || isF(x + 1, y) || !(isF(x, y - 1) || isF(x, y + 1)); for (const yy of [0.22, 0.44]) rails.push(hz ? [x, yy, y, 0, 1, 1, 0.07, 0.06] : [x, yy, y, 0, 1, 0.06, 0.07, 1]); });
        g.add(instanced(box, wd, rails)); continue; }
      if (ch === 'S') { const M = propMats(W);
        // deux poteaux, panneau en planches légèrement incliné vers la caméra, petit toit
        g.add(instanced(box, M.darkWood, cells.flatMap(([x, y]) => [[x - 0.3, 0.36, y, 0, 1, 0.08, 0.72, 0.08], [x + 0.3, 0.36, y, 0, 1, 0.08, 0.72, 0.08]])));
        g.add(instanced(box, M.signBoard, cells.map(([x, y]) => [x, 0.66, y + 0.03, 0, 1, 0.86, 0.46, 0.07])));
        g.add(instanced(box, M.darkWood, cells.map(([x, y]) => [x, 0.93, y + 0.03, 0, 1, 0.96, 0.06, 0.16]))); continue; }
      if (ch === 'c') { const M = propMats(W);   // comptoir : caisson + plateau qui dépasse
        g.add(instanced(box, M.counter, cells.map(([x, y]) => [x, 0.33, y, 0, 1, 1, 0.66, 0.62])));
        g.add(instanced(box, M.lightWood, cells.map(([x, y]) => [x, 0.69, y, 0, 1, 1.04, 0.07, 0.74]))); continue; }
      if (ch === 'C') { const M = propMats(W);   // PC : bureau, écran lumineux, clavier
        g.add(instanced(box, M.lightWood, cells.map(([x, y]) => [x, 0.36, y, 0, 1, 0.9, 0.72, 0.6])));
        g.add(instanced(box, M.metal, cells.map(([x, y]) => [x, 0.98, y - 0.08, 0, 1, 0.62, 0.48, 0.12])));
        g.add(instanced(box, M.screen, cells.map(([x, y]) => [x, 0.98, y - 0.015, 0, 1, 0.52, 0.38, 0.01]), false));
        g.add(instanced(box, M.metal, cells.map(([x, y]) => [x, 0.74, y + 0.14, 0, 1, 0.5, 0.03, 0.16]))); W.screens.push(M.screen); continue; }
      if (ch === 'B') { const M = propMats(W);   // bibliothèque contre le mur du fond
        g.add(instanced(box, [M.darkWood, M.darkWood, M.darkWood, M.darkWood, M.books, M.darkWood], cells.map(([x, y]) => [x, 0.72, y - 0.22, 0, 1, 0.96, 1.44, 0.5]))); continue; }
      if (ch === 't') { const M = propMats(W);   // table : plateau + 4 pieds
        g.add(instanced(box, M.lightWood, cells.map(([x, y]) => [x, 0.52, y, 0, 1, 0.92, 0.07, 0.72])));
        g.add(instanced(box, M.darkWood, cells.flatMap(([x, y]) => [[-0.38, -0.28], [0.38, -0.28], [-0.38, 0.28], [0.38, 0.28]].map(([a, b2]) => [x + a, 0.25, y + b2, 0, 1, 0.07, 0.5, 0.07])))); continue; }
      if (ch === 'p') { const M = propMats(W);   // plante en pot
        g.add(instanced(W.res.potG ||= new T.CylinderGeometry(0.2, 0.15, 0.34, 10), M.pot, cells.map(([x, y]) => [x, 0.17, y])));
        g.add(instanced(W.res.leafG ||= new T.IcosahedronGeometry(0.3, 1), M.plant, cells.map(([x, y]) => [x, 0.55, y, rr() * 6, 1, 1, 1.15, 1]))); continue; }
      if (ch === 'G') { const M = propMats(W), em = W.res.gemM ||= std({ color: '#ffffff', emissive: P.gfl || '#e9c43a', emissiveIntensity: 0.9 });   // statue d'arène
        g.add(instanced(box, M.stone, cells.map(([x, y]) => [x, 0.15, y, 0, 1, 0.8, 0.3, 0.8])));
        g.add(instanced(W.res.colG ||= new T.CylinderGeometry(0.2, 0.24, 1.1, 8), M.stoneLight, cells.map(([x, y]) => [x, 0.85, y])));
        g.add(instanced(W.res.gemG ||= new T.OctahedronGeometry(0.2), em, cells.map(([x, y]) => [x, 1.6, y]), false)); W.spinMats.push(em); continue; }
      const h = BLOCK_H[ch] || 0.6; g.add(instanced(box, blockMats(ch, cpal), cells.map(([x, y]) => [x, h / 2, y, 0, 1, 1, h, 1])));
    }
    if (trees.length) {
      const r = rng(hashStr(m.id + cx + ',' + cy)), d = trees.map(([x, y]) => ({ x: x + (r() - 0.5) * 0.2, y: y + (r() - 0.5) * 0.2, s: 0.85 + r() * 0.35, a: r() * 6.28 }));
      const snow = cpal === 'neige', lt = ctex(leafCanvas(P, snow));
      RS.leaf ||= [std({ map: lt, flatShading: true, roughness: 0.9 }), std({ map: lt, flatShading: true, roughness: 0.9, color: snow ? '#ffffff' : '#e0f0d0' }), std({ color: P.trk, roughness: 1 })];
      const ico = W.res.ico ||= new T.IcosahedronGeometry(0.72, 1), trunk = W.res.trunk ||= new T.CylinderGeometry(0.1, 0.15, 0.9, 6);
      g.add(instanced(trunk, RS.leaf[2], d.map(t => [t.x, 0.45 * t.s, t.y, t.a, t.s])));
      g.add(instanced(ico, RS.leaf[0], d.map(t => [t.x, 1.2 * t.s, t.y, t.a, t.s * 0.85])));
      g.add(instanced(ico, RS.leaf[1], d.map(t => [t.x, 1.78 * t.s, t.y, t.a + 1, t.s * 0.55])));
    }
    if (tall.length) {
      RS.blade ||= (() => { const mt = std({ map: ctex(bladeCanvas(P)), side: T.DoubleSide, alphaTest: 0.4, roughness: 0.9 });
        mt.onBeforeCompile = sh => { sh.uniforms.uT = WU.uT; sh.vertexShader = 'uniform float uT;\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
          float sw = (position.y + 0.3) * 0.12; vec4 ip = instanceMatrix[3]; transformed.x += sin(uT*2.0 + ip.x*1.7 + ip.z) * sw;`); }; return mt; })();
      // deux rangées de cartes debout, tournées vers la caméra (effet 2.5D)
      const pg = W.res.pg ||= new T.PlaneGeometry(1.06, 0.66), r = rng(4 + cx * 7 + cy), it = [];
      tall.forEach(([x, y]) => { it.push([x + (r() - 0.5) * 0.12, 0.3, y - 0.18, 0, 1]); it.push([x + (r() - 0.5) * 0.12, 0.3, y + 0.22, 0, 1]); });
      g.add(instanced(pg, RS.blade, it, false));
    }
    if (water.length) { const wg = W.res.wg ||= (() => { const q = new T.PlaneGeometry(1, 1); q.rotateX(-Math.PI / 2); return q; })(); g.add(instanced(wg, WATER, water.map(([x, y]) => [x, -0.09, y]), false, false)); }
    if (lamps.length) {   // réverbère : socle, mât, lanterne vitrée lumineuse, chapeau
      W.res.lamp ||= [std({ color: '#2c2c34', metalness: 0.6, roughness: 0.4 }), std({ color: '#fff4d0', emissive: '#ffc46a', emissiveIntensity: 0.3, transparent: true, opacity: 0.92 })];
      W.lampHeads.push(W.res.lamp[1]);
      const bx = W.res.box ||= new T.BoxGeometry(1, 1, 1);
      g.add(instanced(bx, W.res.lamp[0], lamps.map(([x, y]) => [x, 0.08, y, 0, 1, 0.26, 0.16, 0.26])));
      g.add(instanced(W.res.post ||= new T.CylinderGeometry(0.04, 0.06, 1.6, 6), W.res.lamp[0], lamps.map(([x, y]) => [x, 0.9, y])));
      g.add(instanced(bx, W.res.lamp[1], lamps.map(([x, y]) => [x, 1.82, y, 0.78, 1, 0.22, 0.3, 0.22]), false));
      g.add(instanced(W.res.capG ||= new T.ConeGeometry(0.22, 0.16, 4), W.res.lamp[0], lamps.map(([x, y]) => [x, 2.04, y, 0.78])));
      lamps.forEach(l => W.lamps.push(l));
    }
    // bâtiments dont le coin est dans ce bloc
    for (const b of m.buildings) if (b.x >= x0 && b.x < x1 && b.y >= y0 && b.y < y1) g.add(buildBuilding(b, W));
    return g;
  }
  // Bâtiment : façade (murs + fenêtres du dessin 2D), vrai toit à deux pans couvert des tuiles du dessin,
  // fenêtres lumineuses la nuit, débord de toit et soubassement
  function buildBuilding(b, W) {
    if (b.flat) return buildFlat(b, W);
    const S = 2, cw = b.w * TS * S, chh = b.h * TS * S, full = mkCanvas(cw, chh), fx = full.getContext('2d');
    fx.scale(S, S); fx.translate(-b.x * TS, -b.y * TS); drawBuilding(fx, b);
    const roofPx = Math.round(b.h * TS * 0.52) * S;                       // même proportion que drawBuilding
    const wallC = mkCanvas(cw, chh - roofPx + 4 * S), wx = wallC.getContext('2d'); wx.drawImage(full, 0, roofPx - 4 * S, cw, wallC.height, 0, 0, cw, wallC.height);
    const roofC = mkCanvas(cw, roofPx), rx = roofC.getContext('2d'); rx.drawImage(full, 0, 0, cw, roofPx, 0, 0, cw, roofPx);
    // carte d'émission : seulement les vitres
    const em = mkCanvas(wallC.width, wallC.height), ex = em.getContext('2d'), id = wx.getImageData(0, 0, wallC.width, wallC.height), od = ex.createImageData(wallC.width, wallC.height);
    for (let i = 0; i < id.data.length; i += 4) { const r = id.data[i], g = id.data[i + 1], bl = id.data[i + 2]; const glass = bl > 180 && g > 150 && r < 190 && bl > r + 40; od.data[i] = glass ? 255 : 0; od.data[i + 1] = glass ? 200 : 0; od.data[i + 2] = glass ? 120 : 0; od.data[i + 3] = 255; }
    ex.putImageData(od, 0, 0);
    const wall = b.kind === 'gym' || b.kind === 'league' ? '#e8e2d8' : '#f2ead8';
    const front = std({ map: ctex(wallC), emissiveMap: ctex(em), emissive: '#ffffff', emissiveIntensity: 0, roughness: 0.85 }); W.windows.push(front);
    // côtés : mur uni avec soubassement
    const sideC = mkCanvas(64, 64), sx = sideC.getContext('2d'); sx.fillStyle = wall; sx.fillRect(0, 0, 64, 64); sx.fillStyle = '#d8ccb4'; sx.fillRect(0, 52, 64, 12); sx.fillStyle = 'rgba(0,0,0,.06)'; for (let y = 8; y < 52; y += 10) sx.fillRect(0, y, 64, 1);
    const side = std({ map: ctex(sideC), roughness: 0.9 });
    const depth = Math.max(1.2, b.h - 1.2), Hw = Math.max(1.1, b.h * 0.5), x0 = b.x - 0.5, cxm = b.x + b.w / 2 - 0.5, zf = b.y - 0.5 + depth, zb = b.y - 0.5;
    const g = new T.Group();
    const body = new T.Mesh(new T.BoxGeometry(b.w - 0.06, Hw, depth), [side, side, side, side, front, side]); body.position.set(cxm, Hw / 2, zb + depth / 2); body.castShadow = body.receiveShadow = true; g.add(body);
    // toit à deux pans (faîtage parallèle à la façade), débord de 0.25
    const ov = 0.25, rh = Math.min(1.6, 0.55 + depth * 0.32), L = x0 - ov + 0.03, R = x0 + b.w + ov - 0.03, F = zf + ov, Bk = zb - ov, Z = (zf + zb) / 2, Y0 = Hw, Y1 = Hw + rh;
    const pos = [], uv = [], q = (a, b2, c, d, ua) => { pos.push(...a, ...b2, ...c, ...a, ...c, ...d); uv.push(...ua[0], ...ua[1], ...ua[2], ...ua[0], ...ua[2], ...ua[3]); };
    q([L, Y0, F], [R, Y0, F], [R, Y1, Z], [L, Y1, Z], [[0, 0], [1, 0], [1, 1], [0, 1]]);           // pan avant
    q([R, Y0, Bk], [L, Y0, Bk], [L, Y1, Z], [R, Y1, Z], [[0, 0], [1, 0], [1, 1], [0, 1]]);         // pan arrière
    const rg = new T.BufferGeometry(); rg.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); rg.setAttribute('uv', new T.Float32BufferAttribute(uv, 2)); rg.computeVertexNormals();
    const roofMat = std({ map: ctex(roofC), roughness: 0.75, side: T.DoubleSide });
    const roof = new T.Mesh(rg, roofMat); roof.castShadow = true; roof.receiveShadow = true; g.add(roof);
    // pignons
    const gp = [], gl = (x) => gp.push(x, Y0, zf, x, Y0, zb, x, Y1, Z);
    gl(x0 + 0.03); gl(x0 + b.w - 0.03);
    const gg = new T.BufferGeometry(); gg.setAttribute('position', new T.Float32BufferAttribute(gp, 3)); gg.computeVertexNormals();
    g.add(Object.assign(new T.Mesh(gg, std({ color: wall, roughness: 0.9, side: T.DoubleSide })), { castShadow: true }));
    // marche devant la porte
    const step = new T.Mesh(W.res.box ||= new T.BoxGeometry(1, 1, 1), W.res.stepM ||= std({ color: '#b8ad9c', roughness: 0.9 })); step.scale.set(1.1, 0.08, 0.35); step.position.set(b.door[0], 0.04, zf + 0.18); step.receiveShadow = true; g.add(step);
    if (b.kind === 'gym' || b.kind === 'league') { const gem = new T.Mesh(new T.OctahedronGeometry(0.32), std({ color: '#ffffff', emissive: TC && b.type && TC[b.type] ? TC[b.type] : '#9a7aff', emissiveIntensity: 1.2 })); gem.position.set(cxm, Y1 + 0.5, Z); gem.userData.spin = 1; g.add(gem); W.spin.push(gem); }
    return g;
  }
  // tours de bureaux, centres commerciaux, usines : volume haut, toit plat, façade dessinée en 2D
  function buildFlat(b, W) {
    const S = 2, cw = b.w * TS * S, chh = b.h * TS * S, full = mkCanvas(cw, chh), fx = full.getContext('2d');
    fx.scale(S, S); fx.translate(-b.x * TS, -b.y * TS); drawBuilding(fx, b);
    const em = mkCanvas(cw, chh), ex = em.getContext('2d'), id = fx.getImageData(0, 0, cw, chh), od = ex.createImageData(cw, chh);
    for (let i = 0; i < id.data.length; i += 4) { const r = id.data[i], g = id.data[i + 1], bl = id.data[i + 2]; const glass = bl > 150 && bl > r + 30 && g > 110; od.data[i] = glass ? 255 : 0; od.data[i + 1] = glass ? 210 : 0; od.data[i + 2] = glass ? 140 : 0; od.data[i + 3] = 255; }
    ex.putImageData(od, 0, 0);
    const front = std({ map: ctex(full), emissiveMap: ctex(em), emissive: '#ffffff', emissiveIntensity: 0, roughness: b.kind === 'office' ? 0.35 : 0.8, metalness: b.kind === 'office' ? 0.25 : 0 }); W.windows.push(front);
    const side = std({ color: b.side || (b.kind === 'office' ? '#3e5878' : b.kind === 'factory' ? '#9a5242' : '#e6dccb'), roughness: 0.85 });
    const tc = mkCanvas(128, 128), tx = tc.getContext('2d'), tr = rng(hashStr(b.x + ':' + b.y));
    tx.fillStyle = b.kind === 'office' ? '#5a5e66' : b.kind === 'factory' ? '#74747c' : '#b8b2a6'; tx.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 60; i++) { tx.fillStyle = `rgba(0,0,0,${0.03 + tr() * 0.05})`; tx.fillRect(tr() * 128, tr() * 128, 6 + tr() * 10, 2); }
    if (b.kind === 'mall') { for (let k = 0; k < 4; k++) { tx.fillStyle = '#5a7a90'; tx.fillRect(14 + k * 28, 30, 18, 68); tx.fillStyle = '#9fd0f0'; tx.fillRect(16 + k * 28, 32, 14, 64); } }
    else if (b.kind === 'factory') { for (let y = 8; y < 128; y += 16) { tx.fillStyle = '#5e5e66'; tx.fillRect(0, y, 128, 6); tx.fillStyle = '#9fd0f0'; tx.fillRect(0, y + 6, 128, 2); } }
    else { tx.strokeStyle = '#e8e8e8'; tx.lineWidth = 5; tx.beginPath(); tx.arc(64, 64, 34, 0, 7); tx.stroke(); tx.fillStyle = '#e8e8e8'; tx.fillRect(48, 44, 7, 40); tx.fillRect(73, 44, 7, 40); tx.fillRect(48, 60, 32, 7); }
    for (let k = 0; k < 3; k++) { const ux = 10 + tr() * 100, uy = 6 + tr() * 16; tx.fillStyle = '#8a8e96'; tx.fillRect(ux, uy, 14, 10); tx.fillStyle = '#4a4e56'; tx.beginPath(); tx.arc(ux + 7, uy + 5, 3.5, 0, 7); tx.fill(); }
    const top = std({ map: ctex(tc), roughness: 0.9 });
    const depth = Math.max(1.2, b.h - 1.2), Hw = b.floors || Math.max(1.4, b.h * 0.55), cxm = b.x + b.w / 2 - 0.5, zb = b.y - 0.5, zf = zb + depth;
    const g = new T.Group();
    const body = new T.Mesh(new T.BoxGeometry(b.w - 0.06, Hw, depth), [side, side, top, side, front, side]); body.position.set(cxm, Hw / 2, zb + depth / 2); body.castShadow = body.receiveShadow = true; g.add(body);
    W.res.rimM ||= std({ color: '#5a5a62', roughness: 0.8 }); const bx3 = W.res.box ||= new T.BoxGeometry(1, 1, 1);
    for (const [sx, sz, px, pz] of [[b.w + 0.05, 0.1, cxm, zb], [b.w + 0.05, 0.1, cxm, zb + depth], [0.1, depth, cxm - b.w / 2 + 0.02, zb + depth / 2], [0.1, depth, cxm + b.w / 2 - 0.02, zb + depth / 2]]) { const r = new T.Mesh(bx3, W.res.rimM); r.scale.set(sx, 0.16, sz); r.position.set(px, Hw + 0.08, pz); g.add(r); }
    if (b.kind === 'factory') {   // cheminées
      const cm = W.res.chimM ||= std({ color: '#8a5a4a', roughness: 0.9 });
      for (const k of [0.25, 0.75]) { const ch = new T.Mesh(W.res.chimG ||= new T.CylinderGeometry(0.22, 0.28, 2.2, 10), cm); ch.position.set(b.x - 0.5 + b.w * k, Hw + 1.1, zb + depth * 0.35); ch.castShadow = true; g.add(ch); }
    }
    if (b.kind === 'office') {    // antenne et local technique sur le toit
      const ant = new T.Mesh(W.res.antG ||= new T.CylinderGeometry(0.03, 0.05, 1.2, 6), W.res.rimM); ant.position.set(cxm + b.w * 0.2, Hw + 0.7, zb + depth * 0.5); g.add(ant);
      const hut = new T.Mesh(W.res.box, W.res.rimM); hut.scale.set(b.w * 0.35, 0.45, depth * 0.35); hut.position.set(cxm - b.w * 0.15, Hw + 0.3, zb + depth * 0.45); hut.castShadow = true; g.add(hut);
    }
    const step = new T.Mesh(W.res.box ||= new T.BoxGeometry(1, 1, 1), W.res.stepM ||= std({ color: '#b8ad9c', roughness: 0.9 })); step.scale.set(1.1, 0.08, 0.35); step.position.set(b.door[0], 0.04, zf + 0.18); step.receiveShadow = true; g.add(step);
    return g;
  }
  function makeWorld(m) {
    const W = { map: m, layers: m.layers, group: new T.Group(), chunks: new Map(), res: {}, groundMats: [], windows: [], lampHeads: [], lamps: [], spin: [], spinMats: [], screens: [], building: false };
    scene.add(W.group);
    W.nx = Math.ceil(m.w / CH); W.ny = Math.ceil(m.h / CH); W.lazy = W.nx * W.ny > 20;
    try { buildBorder(W); } catch (e) { console.warn('bordure', e); }
    if (!W.lazy) for (let cy = 0; cy < W.ny; cy++) for (let cx = 0; cx < W.nx; cx++) { const c = buildChunk(W, cx, cy); W.chunks.set(cx + ',' + cy, c); W.group.add(c); }
    return W;
  }
  function buildBorder(W) {
    const m = W.map; if (m.kind === 'int') return;
    const P = getPal(m.pal), base = m.border === 'T' ? '.' : m.border === 'R' || m.border === 'V' ? 'R' : m.border;
    // sol au-delà de la carte (répété)
    const bt = new T.CanvasTexture(tileHD(base === 'R' ? '.' : base, m.pal, 0, 0)); bt.encoding = T.sRGBEncoding; bt.wrapS = bt.wrapT = T.RepeatWrapping; bt.repeat.set(m.w + 80, m.h + 80);
    const pl = new T.Mesh(new T.PlaneGeometry(m.w + 80, m.h + 80), std({ map: bt, roughness: 1, color: base === 'R' ? '#6a6270' : '#d8e8d0' })); pl.rotation.x = -Math.PI / 2; pl.position.set(m.w / 2 - 0.5, -0.02, m.h / 2 - 0.5); pl.receiveShadow = true; W.group.add(pl);
    if (m.big) return;
    const r = rng(hashStr(m.id + ':border')), ring = [], E = 7;
    for (let y = -E; y < m.h + E; y++) for (let x = -E; x < m.w + E; x++) { if (x >= 0 && y >= 0 && x < m.w && y < m.h) continue; ring.push([x + (r() - 0.5) * 0.5, y + (r() - 0.5) * 0.5, 0.85 + r() * 0.5, r() * 6]); }
    if (m.border === 'T') {
      const lt = ctex(leafCanvas(P, m.pal === 'neige')), lm = std({ map: lt, flatShading: true, roughness: 0.9 }), lm2 = std({ map: lt, flatShading: true, roughness: 0.9, color: '#c8dcc0' });
      const ico = W.res.ico ||= new T.IcosahedronGeometry(0.72, 1);
      W.group.add(instanced(W.res.trunk ||= new T.CylinderGeometry(0.1, 0.15, 0.9, 6), std({ color: P.trk }), ring.map(t => [t[0], 0.45 * t[2], t[1], t[3], t[2]]), false));
      W.group.add(instanced(ico, lm, ring.map(t => [t[0], 1.25 * t[2], t[1], t[3], t[2] * 0.95])));
      W.group.add(instanced(ico, lm2, ring.map(t => [t[0], 1.9 * t[2], t[1], t[3] + 1, t[2] * 0.62]), false));
    } else {
      const rm = std({ color: P.rk || '#7a7070', roughness: 0.95, flatShading: true });
      W.group.add(instanced(new T.DodecahedronGeometry(0.8, 0), rm, ring.map(t => [t[0], 0.6 * t[2], t[1], t[3], t[2], 1, 1.4, 1])));
    }
  }
  function disposeWorld(W) {
    scene.remove(W.group);
    W.group.traverse(o => { if (o.geometry && !Object.values(W.res).includes(o.geometry)) o.geometry.dispose(); if (o.material) [].concat(o.material).forEach(mt => { if (mt === WATER) return; if (mt.map && mt.map !== slots.atlas) mt.map.dispose(); mt.dispose(); }); });
  }
  function streamChunks(W, px, py) {
    if (!W.lazy) return;
    const ccx = Math.floor(px / CH), ccy = Math.floor(py / CH); let built = 0;
    for (let r = 0; r <= 1 && built < 1; r++) for (let dy = -r; dy <= r && built < 1; dy++) for (let dx = -r; dx <= r && built < 1; dx++) {
      const cx = ccx + dx, cy = ccy + dy, k = cx + ',' + cy; if (cx < 0 || cy < 0 || cx >= W.nx || cy >= W.ny || W.chunks.has(k)) continue;
      const c = buildChunk(W, cx, cy); W.chunks.set(k, c); W.group.add(c); built++;
    }
    for (const [k, c] of W.chunks) { const [cx, cy] = k.split(',').map(Number); if (Math.abs(cx - ccx) > 2 || Math.abs(cy - ccy) > 2) { W.group.remove(c); c.traverse(o => { if (o.geometry && !Object.values(W.res).includes(o.geometry)) o.geometry.dispose(); }); W.chunks.delete(k); } }
  }

  /* ---------- Météo ---------- */
  let rain, rainV, flakes, flakeV, pollen, pollenV;
  function pts(n, size, color, add) {
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(new Float32Array(n * 3), 3));
    const c = mkCanvas(32, 32), x = c.getContext('2d'), gr = x.createRadialGradient(16, 16, 0, 16, 16, 16); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, 32, 32);
    const p = new T.Points(g, new T.PointsMaterial({ size, color, map: ctex(c), transparent: true, depthWrite: false, blending: add ? T.AdditiveBlending : T.NormalBlending })); p.frustumCulled = false; scene.add(p); return p;
  }
  function buildWeather() {
    const N = 1200, g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(new Float32Array(N * 6), 3));
    rain = new T.LineSegments(g, new T.LineBasicMaterial({ color: '#cfe0ff', transparent: true, opacity: 0, depthWrite: false })); rain.frustumCulled = false; scene.add(rain);
    rainV = Array.from({ length: N }, () => [Math.random(), Math.random(), Math.random()]);
    flakes = pts(500, 0.12, '#ffffff', false); flakeV = Array.from({ length: 500 }, () => [Math.random(), Math.random(), Math.random(), Math.random() * 6]);
    pollen = pts(220, 0.08, '#fff2a8', true); pollenV = Array.from({ length: 220 }, () => [Math.random() * 28 - 14, Math.random() * 4, Math.random() * 28 - 14, Math.random() * 6]);
  }
  function weatherFor(m) {
    if (m.kind === 'int' || m.kind === 'cave' || m.outdoor === false) return 'none';
    if (m.pal === 'neige') return 'neige';
    if (!m.biomeAt) { const sl = Math.floor(((G && G.time) || 0) / 240) % 3; if (m.pal === 'volcan') return 'brume'; if (m.pal === 'desert' || m.pal === 'plage') return 'clair'; if (m.pal === 'marais') return sl ? 'brume' : 'pluie'; if (m.pal === 'jungle') return sl === 2 ? 'clair' : 'pluie'; }
    if (m.biomeAt && RT.P) { const b = m.biomeAt(RT.P.x, RT.P.y), sl = Math.floor(((G && G.time) || 0) / 240) % 3;
      if (b === 'neige') return 'neige'; if (b === 'marais') return sl ? 'brume' : 'pluie'; if (b === 'volcan') return 'brume';
      if (b === 'desert' || b === 'plage') return 'clair'; if (b === 'jungle') return sl === 2 ? 'clair' : 'pluie'; }
    const slot = Math.floor(((G && G.time) || 0) / 240), h = hashStr(m.reg + ':' + slot) % 10;
    return h < 5 ? 'clair' : h < 7 ? 'pollen' : h < 9 ? 'pluie' : 'brume';
  }

  /* ---------- Personnages (atlas dessiné avec les fonctions 2D du jeu) ---------- */
  function drawPlayerCell(x, P, sx, sy) {
    const camX = P.px - sx, camY = P.py - sy - 4;
    if (P.surf) { x.fillStyle = '#2a6aa8'; x.beginPath(); x.ellipse(sx + 8, sy + 14, 9, 5, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8ac8f2'; x.fillRect(sx + 1, sy + 12, 14, 2); }
    if (P.bike && !P.surf && typeof heroBike === 'function' && heroBike(P.dir, RT.frame)) { const bk = heroBike(P.dir, P.moving ? RT.frame : 0); x.drawImage(bk, sx - 5, sy - 7, 26, 26); }
    else if (!P.surf && typeof drawPlayerWalk === 'function') drawPlayerWalk(x, P, sx, sy, camX, camY);
    else { const fr = P.moving && P.prog >= 4 && P.prog < 12 ? (P.step ? 1 : 2) : 0; x.drawImage(personSprite(PALS[G.look] || PALS.player, P.dir, P.surf ? 0 : fr), sx, sy, 16, 16); }
  }
  function drawNpcCell(x, n, sx, sy) {
    if (n.kind === 'item') { drawSphere(x, sx + 8, sy + 9, 4); return; }
    if (n.kind === 'ball') { drawSphere(x, sx + 8, sy + 6, 4); return; }
    if (n.kind === 'legend') { if (typeof drawLegendLive === 'function' && drawLegendLive(x, n, sx, sy)) return; const img = monSprite(LEGENDS[n.legend].sp, false); x.globalAlpha = 0.9; x.drawImage(img, sx - 12, sy - 24 + Math.sin(RT.frame / 20) * 2, 40, 40); x.globalAlpha = 1; return; }
    if (n.kind === 'lore') { drawLoreObj(x, n, sx, sy); return; }
    if (n.draw) { n.draw(x, sx, sy); return; }
    if (!(typeof drawNpcLive === 'function' && drawNpcLive(x, n, sx, sy))) x.drawImage(personSprite(n.pal || NPC_PALS[0], n.dir, n.frame), sx, sy - 4, 16, 16);
    if (n.sleep != null && typeof drawSleep === 'function') drawSleep(x, n, sx, sy);
  }
  // signature de l'image : on ne redessine (et ne renvoie au GPU) que si elle change
  function sigOf(e, P) {
    if (e.p) { const g = typeof gaitOf === 'function' ? gaitOf(P.dist || 0, P.moving, typeof playerRunning === 'function' && playerRunning(P)).frame : 0;
      return 'p' + P.dir + g + (P.bike ? 'b' + (P.moving ? RT.frame : 0) : '') + (P.surf ? 's' : '') + (P.moving ? RT.frame >> 1 : RT.frame >> 3) + (G.look || ''); }
    const n = e.n;
    if (n.kind === 'npc' || n.kind === 'trainer' || !n.kind) { if (n.draw || n.sleep != null) return 'x' + RT.frame; const k = typeof npcKey === 'function' ? npcKey(n) : null; return 'n' + (k || n.src) + n.dir + (n.frame || 0); }
    return 'x' + RT.frame;
  }
  function drawSlot(slot, e, P) {
    const u = slot.userData, sc = u.cv.width / CELLW, x = u.ctx;
    x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, u.cv.width, u.cv.height);
    x.setTransform(sc, 0, 0, sc, 0, 0); x.imageSmoothingEnabled = false;
    const oldPS = typeof PS === 'number' ? PS : null; if (oldPS != null && oldPS < sc) PS = sc;   // sprites générés à pleine résolution (cache séparé de la 2D)
    try {
      if (e.p) drawPlayerCell(x, P, 12, 26);
      else { const n = e.n, k = (n.kind === 'npc' || n.kind === 'trainer' || !n.kind) && !n.draw && typeof npcKey === 'function' ? npcKey(n) : null, img = k && typeof npcImgSprite === 'function' ? npcImgSprite(k, n.dir, n.frame || 0) : null;
        if (img) x.drawImage(img, 12, 26, 16, 16); else drawNpcCell(x, n, 12, 30); }
    } catch (err) { }
    if (oldPS != null) PS = oldPS;
    u.tx.needsUpdate = true;
  }
  function drawActors() {
    const P = RT.P, sc = Math.max(4, Math.min(8, typeof PS === 'number' ? PS : 4));
    const list = [{ p: true, X: P.px / TS, Y: P.py / TS }];
    for (const n of RT.npcs) { const X = n.px / TS, Y = n.py / TS; if (Math.abs(X - list[0].X) < 16 && Math.abs(Y - list[0].Y) < 13) list.push({ n, X, Y }); }
    list.length = Math.min(list.length, NSLOT);
    list.forEach((e, i) => {
      const s = slots[i], u = s.userData;
      if (u.cv.width !== CELLW * sc) { u.cv.width = CELLW * sc; u.cv.height = CELLH * sc; u.tx.dispose(); u.sig = ''; }
      const sig = sigOf(e, P); if (sig !== u.sig) { u.sig = sig; drawSlot(s, e, P); }
      const gy = H3.groundAt(e.X, e.Y); s.visible = true; s.position.set(e.X, gy, e.Y); s.quaternion.copy(camera.quaternion);
      // respiration des PNJ immobiles (faite en 3D, sans redessiner)
      const br = !e.p && e.n && !e.n.mv && (e.n.kind === 'npc' || e.n.kind === 'trainer') ? 1 + Math.sin(RT.frame / 26 + (e.n.hx || 0) * 1.3 + (e.n.hy || 0)) * 0.012 : 1;
      s.scale.set(1 / br, br, 1);
      const bl = slots.blobs[i], nk = e.n && e.n.kind; bl.visible = !(e.p && P.surf) && nk !== 'legend'; bl.position.set(e.X, gy + 0.02, e.Y + 0.05);
    });
    for (let i = list.length; i < NSLOT; i++) { slots[i].visible = false; slots.blobs[i].visible = false; slots[i].userData.sig = ''; }
  }

  /* ---------- Image ---------- */
  function render3D() {
    const m = RT.map, P = RT.P, now = performance.now() / 1000, dt = Math.min(0.1, lastT ? now - lastT : 0.016); lastT = now;
    if (!world || world.map !== m || world.layers !== m.layers) { if (world) disposeWorld(world); world = makeWorld(m); look.set(P.px / TS, 0.4, P.py / TS); world.snap = true; }
    const px = P.px / TS, pz = P.py / TS; streamChunks(world, px, pz);
    // ambiance
    const tod = typeof timeOfDay === 'function' ? timeOfDay() : 'day', outdoor = m.kind !== 'int' && m.kind !== 'cave' && m.outdoor !== false;
    const nightT = !outdoor ? (m.kind === 'cave' ? 0.75 : 0.15) : tod === 'night' ? 1 : tod === 'evening' ? 0.45 : tod === 'morning' ? 0.15 : 0;
    const wx = weatherFor(m), k = Math.min(1, dt * 0.6); H3.weather = wx;
    envK.night = lerp(envK.night, nightT, world.snap ? 1 : k);
    for (const [key, on] of [['rain', wx === 'pluie'], ['fog', wx === 'brume' || wx === 'pluie'], ['snow', wx === 'neige'], ['pollen', wx === 'pollen' || wx === 'clair']]) envK[key] = lerp(envK[key], on ? (key === 'fog' && wx === 'pluie' ? 0.45 : key === 'pollen' && wx === 'clair' ? 0.35 : 1) : 0, world.snap ? 1 : k);
    const n = envK.night, dusk = tod === 'evening' ? 1 : tod === 'morning' ? 0.6 : 0;
    let sky = outdoor ? (n > 0.5 ? mix('#f09a6a', '#0b1330', (n - 0.5) * 2) : mix('#9fd0f0', '#f09a6a', Math.min(1, dusk * 0.7 + n))) : m.kind === 'cave' ? h2r('#0c0a10') : h2r('#141018');
    const gr = h2r('#8a9aa8'), wet = envK.rain * 0.5 + envK.fog * 0.45; if (outdoor) sky = sky.map((v, i) => lerp(v, gr[i] * (1 - n * 0.85), wet));
    scene.background.setRGB(...sky); scene.fog.color.setRGB(...sky);
    scene.fog.density = m.kind === 'int' ? 0.0 : m.kind === 'cave' ? 0.06 : 0.006 + envK.fog * 0.045 + envK.rain * 0.01 + envK.snow * 0.012;
    sun.position.set(px - 7 + dusk * -6, 16, pz + 9); sun.target.position.set(px, 0, pz);
    sun.color.setRGB(...(n > 0.8 ? h2r('#9fb4ff') : mix('#fff3dc', '#ffae6a', dusk)));
    sun.intensity = (outdoor ? lerp(1.35, 0.22, n) * (1 - envK.rain * 0.45) : m.kind === 'cave' ? 0.12 : 0.55); sun.castShadow = H3.mode === 2;
    hemi.intensity = outdoor ? lerp(0.6, 0.25, n) : m.kind === 'cave' ? 0.25 : 0.75;
    hemi.color.setRGB(...(outdoor ? mix('#cfe8ff', '#3a4a8a', n) : m.kind === 'cave' ? h2r('#5a5a8a') : h2r('#fff0d8')));
    hemi.groundColor.setRGB(...(outdoor ? mix('#6a7a4a', '#1a1a2a', n) : h2r('#4a3a2a')));
    amb.intensity = m.kind === 'cave' ? 0.08 : 0.12;
    WU.uT.value = now; WU.uNight.value = n; WU.uRain.value = envK.rain;
    world.windows.forEach(w => (w.emissiveIntensity = outdoor ? n * 1.6 : 0));
    world.spin.forEach(o => (o.rotation.y = now));
    world.spinMats.forEach(mt => (mt.emissiveIntensity = 0.7 + Math.sin(now * 2) * 0.3));
    world.screens.forEach(mt => (mt.emissiveIntensity = 0.8 + Math.sin(now * 7) * 0.05));
    world.lampHeads.forEach(h => (h.emissiveIntensity = 0.3 + n * 3));
    world.groundMats.forEach(g => { g.roughness = g.userData.base - envK.rain * 0.5; g.metalness = envK.rain * 0.15; g.color.setScalar(1 - envK.rain * 0.22); });
    // lampadaires (6 plus proches) et lanterne du joueur dans les grottes
    const near = world.lamps.map(l => [l, (l[0] - px) ** 2 + (l[1] - pz) ** 2]).sort((a, b) => a[1] - b[1]);
    lampLights.forEach((L, i) => {
      if (m.kind === 'cave' && i === 0) { L.position.set(px, 1.6, pz + 0.3); L.intensity = 1.6; L.distance = 9; L.color.set('#ffd8a0'); return; }
      const l = near[i]; L.distance = 6; L.color.set('#ffc878'); if (l) { L.position.set(l[0][0], 1.7, l[0][1]); L.intensity = n * 1.6; } else L.intensity = 0;
    });
    // météo
    const fx = px, fz = pz;
    rain.visible = envK.rain > 0.02; if (rain.visible) { const a = rain.geometry.attributes.position.array; rainV.forEach((v, i) => { v[1] -= dt * 1.6; if (v[1] < 0) { v[1] += 1; v[0] = Math.random(); v[2] = Math.random(); } const X = fx - 14 + v[0] * 28, Z = fz - 12 + v[2] * 24, Y = v[1] * 12; a.set([X, Y, Z, X - 0.05, Y - 0.4, Z + 0.02], i * 6); }); rain.geometry.attributes.position.needsUpdate = true; rain.material.opacity = envK.rain * 0.5; }
    flakes.visible = envK.snow > 0.02; if (flakes.visible) { const a = flakes.geometry.attributes.position.array; flakeV.forEach((v, i) => { v[1] -= dt * 0.12; v[3] += dt; if (v[1] < 0) { v[1] += 1; v[0] = Math.random(); v[2] = Math.random(); } a.set([fx - 14 + v[0] * 28 + Math.sin(v[3]) * 0.4, v[1] * 10, fz - 12 + v[2] * 24], i * 3); }); flakes.geometry.attributes.position.needsUpdate = true; flakes.material.opacity = envK.snow * 0.9; }
    pollen.visible = envK.pollen > 0.05 && envK.rain < 0.5; if (pollen.visible) { const a = pollen.geometry.attributes.position.array; pollenV.forEach((v, i) => { v[3] += dt * 0.5; a.set([fx + v[0] + Math.sin(v[3] + now * 0.3) * 0.8, 0.4 + v[1] + Math.sin(now * 0.7 + i) * 0.3, fz + v[2] + Math.cos(v[3]) * 0.6], i * 3); }); pollen.geometry.attributes.position.needsUpdate = true; pollen.material.opacity = envK.pollen * (0.5 + n * 0.4); }
    // personnages
    drawActors();
    // halo sous la case visée
    if (!H3.field && !P.moving && !RT.busy && !(UI.stack && UI.stack.length)) { const [dx, dy] = DXY[P.dir], tx = P.x + dx, ty = P.y + dy, t = tileAt(tx, ty);
      const inter = !!RT.npcs.find(nn => nn.x === tx && nn.y === ty) || 'SCB~btc'.includes(t);
      halo.visible = true; halo.position.set(tx, 0.04 + Math.max(H3.groundAt(tx, ty), t === '~' ? -0.08 : 0), ty); const kk = 0.5 + 0.5 * Math.sin(now * 4); halo.scale.setScalar(inter ? 1 + kk * 0.08 : 0.9); halo.material.opacity = inter ? 0.55 + kk * 0.35 : 0.2;
    } else halo.visible = false;
    // caméra : 45°, suivi doux
    if (H3.field) { const c = H3.field.cam(now, dt); camera.position.set(...c.pos); look.set(...c.look); camera.lookAt(look); H3.field.hook(dt, now); }
    else {
      const indoor = m.kind === 'int', dist = indoor ? 6.6 : 9.4, hgt = indoor ? 6.4 : 7.6;
      const tp = [px, hgt, pz + dist], kc = world.snap ? 1 : 1 - Math.exp(-dt * 5);
      camera.position.set(lerp(camera.position.x, tp[0], kc), lerp(camera.position.y, tp[1], kc), lerp(camera.position.z, tp[2], kc));
      look.set(lerp(look.x, px, kc), lerp(look.y, 0.4, kc), lerp(look.z, pz, kc)); camera.lookAt(look);
    }
    world.snap = false;
    if (H3.mode === 2 && post.ok) post.render(H3.field ? 0.45 : outdoor ? 1 : 0.6, 0.35 + n * 0.35); else { R.setRenderTarget(null); R.render(scene, camera); }
  }
  function project(wx, wy, wz) { const v = new T.Vector3(wx, wy, wz).project(camera); return [(v.x + 1) * 120, (1 - v.y) * 80]; }

  /* ---------- Post-traitement : flou de profondeur (maquette), lueur, vignette ---------- */
  function makePost() {
    const out = { ok: false, resize() { }, render() { } };
    try {
      const gl2 = R.capabilities.isWebGL2, RT_ = gl2 && T.WebGLMultisampleRenderTarget ? T.WebGLMultisampleRenderTarget : T.WebGLRenderTarget;
      const main = new RT_(4, 4), a = new T.WebGLRenderTarget(4, 4, { depthBuffer: false }), b = new T.WebGLRenderTarget(4, 4, { depthBuffer: false });
      const V = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';
      const blur = new T.ShaderMaterial({ uniforms: { tIn: { value: null }, uDir: { value: new T.Vector2() } }, vertexShader: V, depthTest: false, depthWrite: false,
        fragmentShader: `uniform sampler2D tIn; uniform vec2 uDir; varying vec2 vUv; void main(){ vec3 c = texture2D(tIn, vUv).rgb*0.227;
          c += (texture2D(tIn, vUv+uDir*1.3846).rgb + texture2D(tIn, vUv-uDir*1.3846).rgb)*0.3162; c += (texture2D(tIn, vUv+uDir*3.2308).rgb + texture2D(tIn, vUv-uDir*3.2308).rgb)*0.0703; gl_FragColor = vec4(c,1.0); }` });
      const comp = new T.ShaderMaterial({ uniforms: { tS: { value: main.texture }, tB: { value: b.texture }, uTilt: { value: 1 }, uBloom: { value: 0.4 } }, vertexShader: V, depthTest: false, depthWrite: false,
        fragmentShader: `uniform sampler2D tS, tB; uniform float uTilt, uBloom; varying vec2 vUv;
          vec3 srgb(vec3 c){ c = clamp(c,0.0,1.0); return mix(c*12.92, 1.055*pow(c, vec3(1.0/2.4))-0.055, step(0.0031308, c)); }
          void main(){ vec3 s = texture2D(tS, vUv).rgb, bl = texture2D(tB, vUv).rgb; float f = smoothstep(0.24, 0.0, vUv.y) + smoothstep(0.68, 1.0, vUv.y);
            vec3 c = mix(s, bl, clamp(f*uTilt, 0.0, 1.0)); c += max(bl - 0.7, 0.0) * uBloom; c *= mix(0.72, 1.0, smoothstep(0.9, 0.3, length(vUv-0.5)));
            gl_FragColor = vec4(srgb(c), 1.0); }` });
      const quad = new T.Mesh(new T.PlaneGeometry(2, 2), blur); quad.frustumCulled = false; const qs = new T.Scene(); qs.add(quad); const qc = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      out.resize = (w, h) => { const pr = R.getPixelRatio(), W = Math.max(4, Math.floor(w * pr)), H = Math.max(4, Math.floor(h * pr)); main.setSize(W, H); a.setSize(W >> 1, H >> 1); b.setSize(W >> 1, H >> 1); };
      out.render = (tilt, bloom, scn, cam) => {
        R.setRenderTarget(main); R.render(scn || scene, cam || camera);
        const pass = (s, d, dx, dy) => { quad.material = blur; blur.uniforms.tIn.value = s.texture; blur.uniforms.uDir.value.set(dx / d.width, dy / d.height); R.setRenderTarget(d); R.render(qs, qc); };
        pass(main, a, 1, 0); pass(a, b, 0, 1); pass(b, a, 2, 0); pass(a, b, 0, 2);
        comp.uniforms.uTilt.value = tilt; comp.uniforms.uBloom.value = bloom; quad.material = comp; R.setRenderTarget(null); R.render(qs, qc);
      };
      out.ok = true;
    } catch (e) { console.warn('post-traitement indisponible', e); }
    return out;
  }

  H3.debug = () => ({ atlas: slots[0] && slots[0].userData.cv, slots: () => slots.map(s => s.userData.cv), chunk: (cx, cy) => chunkGround(RT.map, cx, cy), building: b => { const c = mkCanvas(b.w * TS * 2, b.h * TS * 2), x = c.getContext('2d'); x.scale(2, 2); x.translate(-b.x * TS, -b.y * TS); drawBuilding(x, b); return c; } });
  /* ---------- Branchement sur le jeu ---------- */
  function fail(e) {
    console.error('Rendu 3D désactivé :', e); H3.failed = true; H3.err = String(e && e.message || e);
    if (glc) glc.style.display = 'none';
    try { if (typeof toast === 'function') toast('Rendu 3D indisponible : retour en 2D.'); } catch (e2) { }
  }
  const _draw = drawOverworld;
  drawOverworld = function (x) {
    if (H3.mode === 0 || H3.failed) { if (glc) glc.style.display = 'none'; return _draw(x); }
    try {
      if (!R && !init()) return _draw(x);
      glc.style.display = 'block'; H3.battleOn = false; H3.field = null; if (BS && BS.actors.parent === scene) scene.remove(BS.actors);
      if (!H3.shadow) { H3.shadow = mkCanvas(240, 160); H3.shadowCtx = H3.shadow.getContext('2d'); }
      H3.shadowCtx.setTransform(1, 0, 0, 1, 0, 0); H3.shadowCtx.imageSmoothingEnabled = false; _draw(H3.shadowCtx);
      render3D();
      x.clearRect(0, 0, 240, 160);
      if (RT.bubble) { const n = RT.bubble.npc, [sx0, sy0] = project(n.px / TS, 2.05, n.py / TS), sx = sx0 - 8, sy = sy0 - 6;
        x.fillStyle = '#ffffff'; x.fillRect(sx + 3, sy, 10, 11); x.strokeStyle = '#22202a'; x.strokeRect(sx + 3.5, sy + 0.5, 9, 10); x.fillStyle = '#d84a3a'; x.fillRect(sx + 7, sy + 2, 2, 5); x.fillRect(sx + 7, sy + 8, 2, 1); }
    } catch (e) { fail(e); return _draw(x); }
  };

  /* ============================================================
     COMBATS EN 2.5D : arène 3D, créatures animées (mêmes dessins), travellings,
     éclats de particules, tremblements sur les coups puissants
     ============================================================ */
  let BS = null;   // scène de combat
  function initBattle() {
    const sc = new T.Scene(); sc.fog = new T.FogExp2('#b8d8f0', 0.025); sc.background = new T.Color('#b8d8f0');
    const cam = new T.PerspectiveCamera(38, camera.aspect, 0.1, 200);
    const hemi2 = new T.HemisphereLight('#e8f4ff', '#6a7a4a', 0.7), sun2 = new T.DirectionalLight('#fff3dc', 1.25), amb2 = new T.AmbientLight('#8090b0', 0.15);
    sun2.position.set(-4, 9, 6); sun2.castShadow = true; sun2.shadow.mapSize.set(1024, 1024); Object.assign(sun2.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 30 }); sun2.shadow.camera.updateProjectionMatrix(); sun2.shadow.bias = -0.0006;
    sc.add(hemi2, sun2, amb2);
    const ground = new T.Mesh(new T.CircleGeometry(10, 48), std({ roughness: 1 })); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; sc.add(ground);
    const back = new T.Mesh(new T.CylinderGeometry(13, 13, 9, 48, 1, true, Math.PI * 0.62, Math.PI * 0.76), new T.MeshBasicMaterial({ side: T.BackSide, fog: false, toneMapped: false })); back.position.set(0, 3.2, 0); sc.add(back);
    const actors = new T.Group(); sc.add(actors);
    const plat = (x, z, r) => { const m = new T.Mesh(new T.CylinderGeometry(r, r * 1.05, 0.12, 40), std({ roughness: 0.95 })); m.position.set(x, 0.06, z); m.receiveShadow = true; sc.add(m); return m; };
    const pf = plat(2.1, -1.5, 1.35), pp = plat(-1.8, 1.9, 1.5);
    const mk = () => { const cv = mkCanvas(320, 320), tx = new T.CanvasTexture(cv); tx.encoding = T.sRGBEncoding;
      const mat = std({ map: tx, transparent: true, alphaTest: 0.25, roughness: 0.85, emissive: '#ffffff', emissiveMap: tx, emissiveIntensity: 0, side: T.DoubleSide });
      const mesh = new T.Mesh(new T.PlaneGeometry(1, 1), mat); mesh.castShadow = true; mesh.customDepthMaterial = new T.MeshDepthMaterial({ depthPacking: T.RGBADepthPacking, map: tx, alphaTest: 0.5 });
      const g = new T.Group(); g.add(mesh); actors.add(g); return { cv, ctx: cv.getContext('2d'), tx, mat, mesh, g }; };
    // particules
    const NP = 300, pg = new T.BufferGeometry(); pg.setAttribute('position', new T.BufferAttribute(new Float32Array(NP * 3), 3)); pg.setAttribute('color', new T.BufferAttribute(new Float32Array(NP * 3), 3));
    const dc = mkCanvas(32, 32), dx = dc.getContext('2d'), gr = dx.createRadialGradient(16, 16, 0, 16, 16, 16); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.45, 'rgba(255,255,255,.6)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); dx.fillStyle = gr; dx.fillRect(0, 0, 32, 32);
    const parts = new T.Points(pg, new T.PointsMaterial({ size: 0.22, vertexColors: true, map: ctex(dc), transparent: true, depthWrite: false, blending: T.AdditiveBlending, toneMapped: false })); parts.frustumCulled = false; actors.add(parts);
    const rim = new T.DirectionalLight('#9ac8ff', 0.55); rim.position.set(3, 4, -8); sc.add(rim);
    const deco = new T.Group(); sc.add(deco);
    const bc = mkCanvas(32, 32), bx2 = bc.getContext('2d'), bg2 = bx2.createRadialGradient(16, 16, 0, 16, 16, 16); bg2.addColorStop(0, 'rgba(0,0,0,.55)'); bg2.addColorStop(1, 'rgba(0,0,0,0)'); bx2.fillStyle = bg2; bx2.fillRect(0, 0, 32, 32);
    const blobM = new T.MeshBasicMaterial({ map: ctex(bc), transparent: true, depthWrite: false }), blobG = new T.PlaneGeometry(1, 1); blobG.rotateX(-Math.PI / 2);
    const bf = new T.Mesh(blobG, blobM), bp = new T.Mesh(blobG, blobM); bf.position.set(2.1, 0.13, -1.5); bp.position.set(-1.8, 0.13, 1.9); actors.add(bf, bp);
    BS = { actors, sc, cam, sun: sun2, hemi: hemi2, rim, deco, bf, bp, ground, back, pf, pp, f: mk(), p: mk(), parts, PV: Array.from({ length: NP }, () => ({ life: 0 })), pi: 0, key: '', b: null, t0: 0, shake: 0, look: new T.Vector3(), push: 0 };
  }
  const FPOS = [2.1, 0, -1.5], PPOS = [-1.8, 0, 1.9];   // positions courantes (terrain ou arène)
  function emit(at, color, n, mode) {
    const c = h2r(color || '#ffffff');
    for (let k = 0; k < n; k++) { const p = BS.PV[BS.pi = (BS.pi + 1) % BS.PV.length], a = Math.random() * 6.28, sp = mode === 'up' ? 0.5 : 1.8 + Math.random() * 2.6;
      Object.assign(p, { x: at[0] + (mode === 'up' ? (Math.random() - 0.5) * 1.6 : 0), y: (at[1] || 1.1) + (mode === 'up' ? -0.9 : 0), z: at[2], vx: Math.cos(a) * sp, vy: mode === 'up' ? 1.6 + Math.random() : (Math.random() - 0.15) * 3.2, vz: Math.sin(a) * sp * 0.6, life: 0.6 + Math.random() * 0.5, g: mode === 'up' ? -0.3 : 4.5, c }); }
  }
  // on suit les attaques du combat d'origine pour ajouter les effets 3D
  try {
    const _aa = animAttack; animAttack = async function (side, mv) {
      if (BS && H3.battleOn && mv) { const from = side === 'p' ? PPOS : FPOS, to = side === 'p' ? FPOS : PPOS, col = TC[mv.t] || '#ffffff';
        BS.push = side === 'p' ? 1 : -1; BS.lastCol = col;
        if (mv.c === 's') { BS.proj = { from: from.slice(), to: to.slice(), t: 0, col }; } else if (mv.c !== 'p') emit([from[0], from[1] + 1.2, from[2]], col, 26, 'up'); }
      return _aa(side, mv);
    };
    const _ah = animHit; animHit = async function (side, eff) {
      if (BS && H3.battleOn) { const at = side === 'p' ? PPOS : FPOS; emit([at[0], at[1] + 1.2, at[2]], BS.lastCol || '#ffffff', eff > 1 ? 70 : 38); BS.shake = Math.max(BS.shake, eff > 1 ? 0.55 : 0.2); }
      return _ah(side, eff);
    };
    const _as = animSend; animSend = async function (side) { if (BS && H3.battleOn) { const at = side === 'p' ? PPOS : FPOS; emit([at[0], at[1] + 1.1, at[2]], '#ffffff', 30); } return _as(side); };
  } catch (e) { }
  function battleEnvTex(key) {
    BS.cache ||= {}; if (BS.cache[key]) return BS.cache[key];
    const bg = battleBG(B.env, B.tod, B.reg);
    const sky = mkCanvas(480, 200), sx = sky.getContext('2d'); sx.imageSmoothingEnabled = true; sx.drawImage(bg, 0, 0, 240, 84, 0, 0, 480, 200);
    const gc = mkCanvas(128, 128), gx = gc.getContext('2d'); gx.imageSmoothingEnabled = true; gx.drawImage(bg, 0, 118, 240, 40, 0, 0, 128, 128);
    const st = gx.getImageData(64, 64, 1, 1).data, plat = bg.getContext('2d').getImageData(178, 72, 1, 1).data;
    const g = new T.CanvasTexture(gc); g.encoding = T.sRGBEncoding; g.wrapS = g.wrapT = T.RepeatWrapping; g.repeat.set(5, 5);
    const sk = new T.CanvasTexture(sky); sk.encoding = T.sRGBEncoding;
    return (BS.cache[key] = { g, sk, fog: [st[0] / 255, st[1] / 255, st[2] / 255], sky0: sx.getImageData(240, 4, 1, 1).data, plat: `rgb(${plat[0]},${plat[1]},${plat[2]})` });
  }
  function buildDeco(env) {
    const d = BS.deco; while (d.children.length) { const c = d.children.pop(); c.geometry && c.geometry.dispose(); }
    const r = rng(hashStr('deco' + env)), ring = (n, r0, r1, a0 = 0.5, a1 = 2.65) => Array.from({ length: n }, () => { const a = a0 + r() * (a1 - a0), rr = r0 + r() * (r1 - r0); return [Math.cos(a) * rr, -Math.sin(a) * rr, 0.8 + r() * 0.6, r() * 6]; });
    const put = (geo, mat, list, y, sy = 1) => d.add(instanced(geo, mat, list.map(t => [t[0], y * t[2], t[1], t[3], t[2], 1, sy, 1])));
    if (env === 'grass' || env === 'sacred') {
      const leaf = std({ color: env === 'sacred' ? '#8ac0a0' : '#4a8f3e', flatShading: true, roughness: 0.9 }), leaf2 = std({ color: '#5fa84a', flatShading: true, roughness: 0.9 }), trunk = std({ color: '#6a4a2e' });
      const tr = ring(16, 7.5, 10.5); put(new T.CylinderGeometry(0.12, 0.18, 1.2, 6), trunk, tr, 0.6); put(new T.IcosahedronGeometry(0.95, 1), leaf, tr, 1.6); put(new T.IcosahedronGeometry(0.65, 1), leaf2, tr, 2.4);
      const tufts = ring(40, 2.6, 7, -0.3, 3.4); put(new T.ConeGeometry(0.12, 0.45, 4), leaf2, tufts, 0.2);
      const fl = ring(24, 2.8, 6.5, -0.3, 3.4); put(new T.IcosahedronGeometry(0.07, 0), std({ color: '#ffd86a', emissive: '#ffb84a', emissiveIntensity: 0.3 }), fl, 0.2);
    } else if (env === 'cave') {
      const rock = std({ color: '#5a5262', flatShading: true, roughness: 0.95 });
      put(new T.DodecahedronGeometry(0.9, 0), rock, ring(18, 6.5, 10), 0.6, 1.6); put(new T.ConeGeometry(0.35, 1.6, 5), std({ color: '#8a7aa8', emissive: '#6a5aa8', emissiveIntensity: 0.6, flatShading: true }), ring(10, 5, 8), 0.8);
    } else if (env === 'snow') {
      const pine = std({ color: '#2f5a4a', flatShading: true }), snow = std({ color: '#ffffff', flatShading: true });
      const tr = ring(16, 7.5, 10.5); put(new T.ConeGeometry(0.9, 2.2, 7), pine, tr, 1.1); put(new T.ConeGeometry(0.55, 0.9, 7), snow, tr, 2.1);
      put(new T.DodecahedronGeometry(0.4, 0), snow, ring(20, 3, 7, -0.3, 3.4), 0.15, 0.5);
    } else if (env === 'water') {
      put(new T.CylinderGeometry(0.5, 0.6, 0.3, 8), std({ color: '#8a7a6a', flatShading: true }), ring(10, 4, 8), 0.1);
    } else if (env === 'indoor') {
      const col = std({ color: '#d8d0e8', roughness: 0.5 }); put(new T.CylinderGeometry(0.35, 0.4, 4, 12), col, ring(10, 7.5, 9), 2);
    }
  }
  const AF = [2.1, 0, -1.5], AP = [-1.8, 0, 1.9];
  // créatures, ombres, projectiles et particules (communs au terrain et à l'arène)
  function updateActors(cam, dt, now) {
    const t = RT.frame / 60, variant = (s, ph) => s.flash > 0 ? 'hurt' : s.act ? 'open' : ((RT.frame + ph) % 220) < 9 ? 'blink' : '';
    const right = new T.Vector3(1, 0, 0).applyQuaternion(cam.quaternion);
    const side = (S, m, back, pos, size, ph) => {
      const s = back ? B.spr.p : B.spr.f, show = m && s.vis && !(s.flash && Math.floor(s.flash * 10) % 2 === 1);
      S.g.visible = !!(m && s.vis); if (!m || !s.vis) return;
      const img = battleMon(m.sp, m.shiny, back, variant(s, ph)), x = S.ctx; x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, 320, 320);
      try { if (typeof galAnim === 'function' && SP[m.sp]) galAnim(x, img, 0, 0, 320, 320, t + (back ? 0 : 0.9), { sp: m.sp, act: s.act, pop: s.pop || 0, hurt: s.flash > 0, back }); else x.drawImage(img, 0, 0, 320, 320); } catch (e) { x.drawImage(img, 0, 0, 320, 320); }
      S.tx.needsUpdate = true;
      const sc = (s.scale || 1) * (1 + 0.08 * (s.pop || 0)) * size;
      S.g.position.set(pos[0] + right.x * s.x / 30, pos[1] - s.y / 30, pos[2] + right.z * s.x / 30);
      S.g.quaternion.copy(cam.quaternion); S.g.scale.set(sc, sc, sc); S.mesh.position.y = 0.5 - 0.06;
      S.mat.opacity = s.a == null ? 1 : s.a; S.mat.visible = !!show; S.mat.emissiveIntensity = s.flash > 0 ? 0.9 : 0; S.mat.emissive.set(s.flash > 0 && Math.floor(s.flash * 14) % 2 ? '#ff5a4a' : '#ffffff');
    };
    const field = !!H3.field;
    side(BS.f, fm(), false, FPOS, field ? 2.2 : 2.6, 0); side(BS.p, B.spr.p.vis ? pm() : null, true, PPOS, field ? 2.4 : 3.0, 97);
    BS.bf.visible = BS.f.g.visible; BS.bp.visible = BS.p.g.visible;
    BS.bf.position.set(BS.f.g.position.x, FPOS[1] + 0.04, BS.f.g.position.z); BS.bf.scale.set(field ? 1.8 : 2.2, 1, field ? 1.1 : 1.3);
    BS.bp.position.set(BS.p.g.position.x, PPOS[1] + 0.04, BS.p.g.position.z); BS.bp.scale.set(field ? 2 : 2.5, 1, field ? 1.2 : 1.4);
    if (BS.proj) { const P = BS.proj; P.t += dt * 2.2; const k = Math.min(1, P.t); const x = lerp(P.from[0], P.to[0], k), z = lerp(P.from[2], P.to[2], k), y = lerp(P.from[1], P.to[1], k) + 1.1 + Math.sin(k * Math.PI) * 0.8; emit([x, y, z], P.col, 6); if (k >= 1) BS.proj = null; }
    const pa = BS.parts.geometry.attributes.position.array, ca = BS.parts.geometry.attributes.color.array;
    BS.PV.forEach((p, i) => { if (p.life > 0) { p.life -= dt; p.vy -= p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt; const f = Math.max(0, Math.min(1, p.life * 2)); pa[i * 3] = p.x; pa[i * 3 + 1] = p.y; pa[i * 3 + 2] = p.z; ca[i * 3] = p.c[0] * f; ca[i * 3 + 1] = p.c[1] * f; ca[i * 3 + 2] = p.c[2] * f; } else pa[i * 3 + 1] = -99; });
    BS.parts.geometry.attributes.position.needsUpdate = true; BS.parts.geometry.attributes.color.needsUpdate = true;
  }
  // caméra de combat sur le terrain : part de la caméra d'exploration, s'écarte, se balance, suit les attaques
  function fieldCam(now, dt) {
    const e = Math.min(1, (now - BS.t0) / 1.3), ease = 1 - Math.pow(1 - e, 3); BS.push *= Math.pow(0.18, dt);
    const cx = (FPOS[0] + PPOS[0]) / 2 + 0.1, cz = (FPOS[2] + PPOS[2]) / 2, gy = H3.groundAt(cx, cz);
    const ang = 0.42 + Math.sin(now * 0.22) * 0.05 + BS.push * 0.12, rad = 9.2 - Math.abs(BS.push) * 1.1, hg = 4.4 - Math.abs(BS.push) * 0.4;
    const tp = [cx - Math.sin(ang) * rad, gy + hg, cz + Math.cos(ang) * rad], tl = [cx + BS.push * 0.9, gy + 1.0, cz - BS.push * 0.5];
    const pos = [lerp(BS.camFrom.x, tp[0], ease), lerp(BS.camFrom.y, tp[1], ease), lerp(BS.camFrom.z, tp[2], ease)], lk = [lerp(BS.lookFrom.x, tl[0], ease), lerp(BS.lookFrom.y, tl[1], ease), lerp(BS.lookFrom.z, tl[2], ease)];
    if (BS.shake > 0) { pos[0] += (Math.random() - 0.5) * BS.shake * 0.5; pos[1] += (Math.random() - 0.5) * BS.shake * 0.5; BS.shake = Math.max(0, BS.shake - dt * 1.6); }
    return { pos, look: lk };
  }
  function renderBattle3D() {
    if (!BS) initBattle();
    const now = performance.now() / 1000, dt = Math.min(0.1, BS.lt ? now - BS.lt : 0.016); BS.lt = now;
    // le combat se joue sur place, dans le vrai décor de la carte (façon HD-2D) ; l'arène ne sert que s'il n'y a pas de carte 3D
    const field = !!(world && world.map === RT.map && RT.P);
    if (BS.b !== B) { BS.b = B; BS.t0 = now; BS.shake = 0; BS.proj = null; BS.spots = null; BS.PV.forEach(p => (p.life = 0));
      if (field) { BS.A = [RT.P.px / TS, RT.P.py / TS]; BS.camFrom = camera.position.clone(); BS.lookFrom = look.clone(); } }
    if (field && BS.A && !BS.spots) {
      // emplacements libres (pas dans un arbre, un mur ou l'eau) pour les deux créatures
      const [ax, az] = BS.A, free = (x, z) => { const c = tileAt(Math.round(x), Math.round(z)); return c && !SOLID.has(c) && c !== 'x' && c !== 'D'; };
      const fc = [[1.1, -4.3], [-1.0, -4.2], [2.2, -3.4], [0.2, -3.6], [1.4, -2.8], [-1.6, -3.0], [0.4, -2.4]].find(([dx, dz]) => free(ax + dx, az + dz));
      const pc = [[-0.8, -1.2], [0.8, -1.1], [-1.2, -0.4], [0, -0.9]].find(([dx, dz]) => free(ax + dx, az + dz));
      BS.spots = fc && pc ? { f: fc, p: pc } : 'arena';
    }
    if (field && BS.A && BS.spots !== 'arena') {
      const [ax, az] = BS.A, { f: fc, p: pc } = BS.spots;
      FPOS[0] = ax + fc[0]; FPOS[2] = az + fc[1]; FPOS[1] = H3.groundAt(FPOS[0], FPOS[2]);
      PPOS[0] = ax + pc[0]; PPOS[2] = az + pc[1]; PPOS[1] = H3.groundAt(PPOS[0], PPOS[2]);
      if (BS.actors.parent !== scene) scene.add(BS.actors);
      H3.field = { cam: fieldCam, hook: (d, n) => updateActors(camera, d, n) };
      render3D(); return;
    }
    H3.field = null; for (let i = 0; i < 3; i++) { FPOS[i] = AF[i]; PPOS[i] = AP[i]; }
    if (BS.actors.parent !== BS.sc) BS.sc.add(BS.actors);
    const key = B.env + B.tod + B.reg;
    if (BS.key !== key) { BS.key = key; buildDeco(B.env); const E = battleEnvTex(key); BS.ground.material.map = E.g; BS.ground.material.needsUpdate = true; BS.back.material.map = E.sk; BS.back.material.needsUpdate = true;
      BS.pf.material.color.set(E.plat); BS.pp.material.color.set(E.plat); const s0 = E.sky0; BS.sc.background.setRGB(s0[0] / 255, s0[1] / 255, s0[2] / 255); BS.sc.fog.color.copy(BS.sc.background); }
    const night = B.tod === 'night' ? 1 : B.tod === 'evening' ? 0.4 : 0;
    BS.sun.intensity = lerp(1.25, 0.45, night); BS.hemi.intensity = lerp(0.7, 0.4, night); BS.sun.castShadow = H3.mode === 2;
    updateActors(BS.cam, dt, now);
    const e = Math.min(1, (now - BS.t0) / 1.4), ease = 1 - Math.pow(1 - e, 3);
    BS.push *= Math.pow(0.18, dt);
    const ang = lerp(1.35, 0.46, ease) + Math.sin(now * 0.22) * 0.06 + BS.push * 0.12, rad = lerp(16, 10.8, ease) - Math.abs(BS.push) * 1.2, hg = lerp(8, 3.9, ease) - Math.abs(BS.push) * 0.4;
    BS.cam.position.set(-Math.sin(ang) * rad, hg, Math.cos(ang) * rad); BS.look.set(0.25 + BS.push * 0.9, 0.95, -0.05 - BS.push * 0.5); BS.cam.lookAt(BS.look);
    if (BS.shake > 0) { BS.cam.position.x += (Math.random() - 0.5) * BS.shake * 0.5; BS.cam.position.y += (Math.random() - 0.5) * BS.shake * 0.5; BS.shake = Math.max(0, BS.shake - dt * 1.6); }
    BS.cam.aspect = camera.aspect; BS.cam.updateProjectionMatrix();
    if (H3.mode === 2 && post.ok) post.render(0.5, 0.45, BS.sc, BS.cam); else { R.setRenderTarget(null); R.render(BS.sc, BS.cam); }
  }
  function projB(v) { const p = new T.Vector3(...v).project(H3.field ? camera : BS.cam); return [(p.x + 1) * 120, (1 - p.y) * 80]; }
  const _drawB = drawBattle;
  drawBattle = function (x) {
    if (!H3.battle3D || H3.mode === 0 || H3.failed || !B) { H3.battleOn = false; if (glc) glc.style.display = 'none'; return _drawB(x); }   // combats en 2D (choix du joueur)
    try {
      if (!R && !init()) { H3.battleOn = false; return _drawB(x); }
      H3.battleOn = true; glc.style.display = 'block';
      renderBattle3D();
      x.clearRect(0, 0, 240, 160);
      // éléments 2D par-dessus : dresseur, sphère lancée, étincelles, flash
      const F = projB([FPOS[0], 1.2, FPOS[2]]), Pp = projB([PPOS[0], 1.3, PPOS[2]]);
      const map = (X, Y) => [Pp[0] + (X - 62) * (F[0] - Pp[0]) / (178 - 62), Pp[1] + (Y - 84) * (F[1] - Pp[1]) / (40 - 84)];
      if (B.trainerShow) { const tp = (B.trainerPal === PALS.rival && typeof novaBust === 'function' && novaBust(192)) || (B.trainer && B.trainer.sprKey && typeof npcImgSprite === 'function' && npcImgSprite(B.trainer.sprKey, 'down', 0)) || personSprite(B.trainerPal || NPC_PALS[0], 'down', 0); x.drawImage(tp, 154 + B.trainerShow.x, 4, 48, 48); }
      if (B.ball) { const [bx, by] = map(B.ball.x, B.ball.y); drawSphere(x, Math.round(bx), Math.round(by), 5); }
      if (B.sparkle > 0) { x.fillStyle = '#fff6b0'; for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + B.sparkle * 4; x.fillRect(F[0] + Math.cos(a) * 30 * B.sparkle, F[1] + Math.sin(a) * 26 * B.sparkle, 2, 2); } }
      if (B.screenFlash) { x.fillStyle = `rgba(255,255,255,${B.screenFlash})`; x.fillRect(0, 0, 240, 160); }
    } catch (e) { fail(e); H3.battleOn = false; return _drawB(x); }
  };

  // hors du monde et des combats (cinématiques, titre), le canvas 3D est masqué
  const hideGl = () => { if (glc && RT.mode !== 'overworld' && !(RT.mode === 'battle' && H3.battleOn)) glc.style.display = 'none'; requestAnimationFrame(hideGl); };
  requestAnimationFrame(hideGl);

  // bouton 2D / 3D / 3D + effets
  function modeLabel() { return ['2D', '3D', 'HD-2D'][H3.mode]; }
  window.addEventListener('DOMContentLoaded', () => {
    const s = document.getElementById('screen'); if (!s) return;
    const b = document.createElement('button'); b.id = 'hd3dbtn'; b.textContent = modeLabel();
    b.title = 'Changer de rendu : 2D, 3D, HD-2D (3D + effets)';
    b.addEventListener('click', e => { e.stopPropagation(); H3.mode = (H3.mode + 1) % 3; if (H3.mode) H3.failed = false; b.textContent = modeLabel(); try { localStorage.setItem('eclosia_hd3d', H3.mode); } catch (e2) { } });
    s.appendChild(b);
  });
})();
