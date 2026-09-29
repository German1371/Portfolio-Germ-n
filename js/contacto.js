(() => {
  'use strict';

  const botonCopiar = document.querySelector('.boton-copiar');
  const aviso = document.querySelector('.contacto-aviso');
  if (!botonCopiar) return;

  const textoOriginal = botonCopiar.textContent;
  let temporizador;

  const copiarTexto = async (texto) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(texto);
      return;
    }
    // Respaldo para file:// o navegadores antiguos
    const campo = document.createElement('textarea');
    campo.value = texto;
    campo.setAttribute('readonly', '');
    campo.style.position = 'fixed';
    campo.style.opacity = '0';
    document.body.appendChild(campo);
    campo.select();
    const ok = document.execCommand('copy');
    campo.remove();
    if (!ok) throw new Error('No se pudo copiar');
  };

  botonCopiar.addEventListener('click', async () => {
    const texto = botonCopiar.dataset.copiar;
    try {
      await copiarTexto(texto);
      botonCopiar.textContent = '¡Copiado!';
      botonCopiar.classList.add('es-copiado');
      if (aviso) aviso.textContent = 'Dirección de email copiada al portapapeles.';
    } catch (_) {
      if (aviso) aviso.textContent = `No se pudo copiar. Mi email es ${texto}`;
    }
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
      botonCopiar.textContent = textoOriginal;
      botonCopiar.classList.remove('es-copiado');
      if (aviso) aviso.textContent = '';
    }, 2500);
  });
})();
