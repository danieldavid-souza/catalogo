// 📦 Função principal para inicializar o lightbox
export function inicializarLightbox({
  seletor = '.zoom-img',       // Seletor das imagens que terão zoom
  overlayId = 'lightbox',      // ID do elemento overlay
  fecharAoClicar = true        // Define se o overlay fecha ao clicar fora da imagem
} = {}) {

  // ⛑️ Cria o overlay se ele ainda não existe no DOM
  let overlay = document.getElementById(overlayId);
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = overlayId;
    overlay.className = 'lightbox';

    // 🧱 Estrutura HTML do lightbox
    overlay.innerHTML = `
      <span class="fechar">&times;</span>               <!-- Botão de fechar -->
      <button class="nav anterior">&#10094;</button>    <!-- Navegar para imagem anterior -->
      <img id="lightbox-img" src="" alt="Imagem ampliada" /> <!-- Imagem ampliada -->
      <p id="lightbox-legenda"></p>                     <!-- Legenda da imagem -->
      <button class="nav proxima">&#10095;</button>     <!-- Navegar para próxima imagem -->
    `;
    document.body.appendChild(overlay); // Adiciona o overlay ao corpo da página
  }

  // 🔗 Referências aos elementos internos do overlay
  const imgEl = overlay.querySelector('#lightbox-img');
  const legendaEl = overlay.querySelector('#lightbox-legenda');
  const btnFechar = overlay.querySelector('.fechar');
  const btnAnterior = overlay.querySelector('.nav.anterior');
  const btnProxima = overlay.querySelector('.nav.proxima');

  let imagens = [];       // Array com todas as imagens selecionadas
  let indiceAtual = 0;    // Índice da imagem atualmente exibida

  // 🔁 Aplica os eventos de clique nas imagens
  function aplicarEventos() {
    imagens = Array.from(document.querySelectorAll(seletor));

    imagens.forEach((img, index) => {
      // Remove event listener anterior para evitar duplicação
      img.removeEventListener('click', img._lightboxClick);

      // Armazena a função de clique como propriedade personalizada
      img._lightboxClick = () => abrir(index);

      // Adiciona o evento de clique para abrir o lightbox
      img.addEventListener('click', img._lightboxClick);
    });
  }

  // 🔍 Abre o lightbox com a imagem e legenda correspondente
  function abrir(indice) {
    const img = imagens[indice];
    const src = img.src;

    // Busca título e descrição dentro do card do produto (se existir)
    const titulo = img.closest('.produto-card')?.querySelector('h3')?.textContent || "";
    const descricao = img.closest('.produto-card')?.querySelector('p')?.textContent || "";

    // Atualiza imagem e legenda no overlay
    imgEl.src = src;
    legendaEl.textContent = `${titulo} — ${descricao}`;

    // Exibe o overlay
    overlay.classList.add('mostrar');
    indiceAtual = indice;
  }

  // ❌ Fecha o lightbox e limpa os dados
  function fechar() {
    overlay.classList.remove('mostrar');
    imgEl.src = "";
    legendaEl.textContent = "";
  }

  // 🧭 Navega para imagem anterior ou próxima
  function navegar(direcao) {
    if (!imagens.length) return;

    // Calcula novo índice com rotação circular
    indiceAtual = (indiceAtual + direcao + imagens.length) % imagens.length;
    abrir(indiceAtual);
  }

  // 🧷 Eventos de interação com o overlay
  btnFechar.onclick = fechar; // Fecha ao clicar no botão "×"

  // Fecha ao clicar fora da imagem (se habilitado)
  if (fecharAoClicar) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) fechar();
    });
  }

  // Navegação por botões
  btnAnterior.onclick = () => navegar(-1);
  btnProxima.onclick = () => navegar(1);

  // ⌨️ Navegação por teclado
  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('mostrar')) return;

    if (e.key === 'Escape') fechar();           // Fecha com ESC
    else if (e.key === 'ArrowLeft') navegar(-1); // Imagem anterior
    else if (e.key === 'ArrowRight') navegar(1); // Próxima imagem
  });

  aplicarEventos(); // Aplica os eventos nas imagens ao inicializar
}