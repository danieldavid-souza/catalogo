/* ============================================
   🖼️ GALERIA COM LIGHTBOX INTERATIVO
   ============================================ */

// 🔹 Seleciona todos os elementos necessários
const imagens = document.querySelectorAll('.galeria-item');           // Imagens principais da galeria
const lightbox = document.getElementById('lightbox');                 // Container do lightbox
const lightboxImg = document.getElementById('lightbox-img');         // Imagem ampliada
const lightboxDescricao = document.getElementById('lightbox-caption'); // Descrição da imagem
const fechar = document.getElementById('fechar');                     // Botão de fechar
const anterior = document.getElementById('btn-prev');                 // Botão anterior
const proximo = document.getElementById('btn-next');                  // Botão próximo
const thumbnails = document.querySelectorAll('.thumb');              // Miniaturas clicáveis

let indiceAtual = 0; // Índice da imagem atualmente exibida

/* 🔍 Abre o lightbox com a imagem selecionada */
function abrirLightbox(indice) {
  const img = imagens[indice];
  lightboxImg.classList.remove('loaded'); // Remove classe de transição
  lightboxImg.src = img.src;              // Define imagem ampliada
  lightboxDescricao.textContent = img.dataset.descricao || img.alt; // Define legenda
  lightbox.style.display = 'flex';        // Exibe o lightbox
  indiceAtual = indice;                   // Atualiza índice atual

  // Aplica transição suave ao carregar imagem
  lightboxImg.onload = () => {
    lightboxImg.classList.add('loaded');
  };

  // Reseta zoom ao abrir nova imagem
  lightboxImg.style.transform = 'scale(1)';
}

/* 🖼️ Adiciona evento de clique em cada imagem da galeria */
imagens.forEach((img, i) => {
  img.addEventListener('click', () => abrirLightbox(i));
});

/* ❌ Fecha o lightbox ao clicar no botão "fechar" */
fechar.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

/* ⬅️ Navega para a imagem anterior */
anterior.addEventListener('click', () => {
  indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
  abrirLightbox(indiceAtual);
});

/* ➡️ Navega para a próxima imagem */
proximo.addEventListener('click', () => {
  indiceAtual = (indiceAtual + 1) % imagens.length;
  abrirLightbox(indiceAtual);
});

/* ⌨️ Suporte ao teclado: ESC para fechar, setas para navegar */
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'Escape') {
      lightbox.style.display = 'none';
    } else if (e.key === 'ArrowLeft') {
      indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
      abrirLightbox(indiceAtual);
    } else if (e.key === 'ArrowRight') {
      indiceAtual = (indiceAtual + 1) % imagens.length;
      abrirLightbox(indiceAtual);
    }
  }
});

/* 🔍 Zoom com scroll do mouse no lightbox */
lightboxImg.addEventListener('wheel', (e) => {
  e.preventDefault();

  // Obtém o valor atual de escala
  const currentTransform = lightboxImg.style.transform;
  let scale = 1;

  if (currentTransform && currentTransform.includes('scale')) {
    scale = parseFloat(currentTransform.match(/scale\(([^)]+)\)/)[1]);
  }

  // Define o delta do scroll
  const delta = e.deltaY < 0 ? 0.1 : -0.1;
  scale = Math.min(Math.max(scale + delta, 1), 3); // Limita entre 1x e 3x

  // Aplica o zoom
  lightboxImg.style.transform = `scale(${scale})`;
});

/* 📱 Swipe horizontal em dispositivos móveis */
let touchStartX = 0;

lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].clientX;
});

lightbox.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchEndX - touchStartX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // Swipe para a direita → imagem anterior
      indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
    } else {
      // Swipe para a esquerda → próxima imagem
      indiceAtual = (indiceAtual + 1) % imagens.length;
    }
    abrirLightbox(indiceAtual);
  }
});

/* 🖼️ Miniaturas clicáveis para navegação rápida */
thumbnails.forEach(thumb => {
  thumb.addEventListener('click', () => {
    const index = parseInt(thumb.dataset.index);
    abrirLightbox(index);
  });
});