export function inicializarLightbox({ seletor = '.zoom-img', overlayId = 'lightbox', fecharAoClicar = true } = {}) {
  const imagens = document.querySelectorAll(seletor);

  // Cria o overlay se não existir
  let overlay = document.getElementById(overlayId);
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = overlayId;
    overlay.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      cursor: zoom-out;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(overlay);
  }

  const imgZoom = document.createElement('img');
  imgZoom.style.maxWidth = '90%';
  imgZoom.style.maxHeight = '90%';
  overlay.appendChild(imgZoom);

  imagens.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      imgZoom.src = img.src;
      overlay.style.visibility = 'visible';
      overlay.style.opacity = '1';
    });
  });

  if (fecharAoClicar) {
    overlay.addEventListener('click', () => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.visibility = 'hidden';
        imgZoom.src = '';
      }, 300);
    });
  }
}