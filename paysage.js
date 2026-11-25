'use strict';
/* ÉCLOSIA — mode paysage sur téléphone
   Le vrai paysage (téléphone tourné), ou un paysage forcé : si le navigateur ou l'application
   reste en portrait, le bouton PAYSAGE fait pivoter tout le jeu d'un quart de tour. */
(function () {
  const H = document.documentElement;
  const touch = () => (window.matchMedia && matchMedia('(pointer: coarse)').matches) || navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
  let force = false; try { force = localStorage.getItem('eclosia_rot') === '1'; } catch (e) { }
  let btn = null;
  const apply = () => {
    const w = window.innerWidth, h = window.innerHeight, t = touch(), land = w > h, rot = t && !land && force;
    H.classList.toggle('rot', rot);
    H.classList.toggle('land', t && (land || rot));
    const VW = rot ? h : w, VH = rot ? w : h;
    H.style.setProperty('--VW', VW + 'px'); H.style.setProperty('--VH', VH + 'px');
    H.classList.toggle('narrow', VW <= 720); H.classList.toggle('short', VH <= 340);
    if (btn) { btn.style.display = t && (!land || rot) ? '' : 'none'; btn.textContent = rot ? 'PORTRAIT' : 'PAYSAGE'; }
    if (typeof computeScale === 'function') setTimeout(computeScale, 80);
  };
  const init = () => {
    const mid = document.querySelector('#pad .mid');
    if (mid && !btn) {
      btn = document.createElement('button'); btn.className = 'btn small'; btn.type = 'button'; btn.textContent = 'PAYSAGE';
      btn.addEventListener('click', () => { force = !force; try { localStorage.setItem('eclosia_rot', force ? '1' : '0'); } catch (e) { } apply(); });
      mid.appendChild(btn);
    }
    apply();
  };
  window.addEventListener('resize', apply);
  window.addEventListener('orientationchange', () => setTimeout(apply, 120));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
