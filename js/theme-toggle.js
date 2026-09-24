(() => {
  'use strict';

  const CLAVE_TEMA = 'portfolio-theme';
  const raiz = document.documentElement;
  const botonTema = document.getElementById('boton-tema');
  const textoBotonTema = botonTema?.querySelector('.boton-tema-texto');

  const obtenerTemaPreferido = () => {
    try {
      const t = localStorage.getItem(CLAVE_TEMA);
      if (t === 'light' || t === 'dark') return t;
    } catch (_) { /* localStorage bloqueado */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const aplicarTema = (tema) => {
    raiz.dataset.theme = tema;
    if (botonTema) {
      const esOscuro = tema === 'dark';
      botonTema.setAttribute('aria-pressed', String(esOscuro));
      botonTema.setAttribute('aria-label', esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      if (textoBotonTema) {
        textoBotonTema.textContent = esOscuro ? 'Modo claro' : 'Modo oscuro';
      }
    }
  };

  aplicarTema(obtenerTemaPreferido());

  if (botonTema) {
    botonTema.addEventListener('click', () => {
      const siguiente = raiz.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(CLAVE_TEMA, siguiente); } catch (_) {}
      aplicarTema(siguiente);
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    try {
      if (localStorage.getItem(CLAVE_TEMA)) return;
    } catch (_) {}
    aplicarTema(e.matches ? 'dark' : 'light');
  });
})();
