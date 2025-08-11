/* ============================================
   🛍️ CATALOGO.JS – Lógica de exibição e filtros de produtos
   ============================================ */

// 🔹 Elementos do DOM usados nos filtros e catálogo
const catalogo = document.getElementById("catalogo");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroDestaque = document.getElementById("filtro-destaque");
const filtroPrecoMin = document.getElementById("filtro-preco-min");
const filtroPrecoMax = document.getElementById("filtro-preco-max");
const filtroBusca = document.getElementById("filtro-busca");

// 🔹 Número de WhatsApp da loja (formato internacional sem +)
const numeroWhatsApp = "5532991657472";

// 🔹 Variáveis globais
let todosProdutos = []; // armazena todos os produtos carregados
window.todosProdutos = todosProdutos; // ✅ agora com os dados reais
let imagens = [];       // imagens para o lightbox
let imagemAtual = 0;    // índice da imagem atual no lightbox

// 🔄 Carrega os produtos do arquivo JSON
fetch("./js/produtos.json")
  .then(res => res.json())
  .then(produtos => {
    todosProdutos = produtos;
    gerarCategorias(produtos); // gera opções únicas de categoria
    aplicarFiltros();          // aplica filtros iniciais
  });

/* 🧩 Gera categorias únicas para o filtro */
function gerarCategorias(produtos) {
  const categorias = [...new Set(produtos.map(p => p.categoria))].sort();
  filtroCategoria.innerHTML = `<option value="todos">Todos</option>`;
  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    filtroCategoria.appendChild(option);
  });
}

/* 🎛️ Aplica os filtros selecionados */
function aplicarFiltros() {
  const categoria = filtroCategoria.value;
  const destaque = filtroDestaque.checked;
  const precoMin = parseFloat(filtroPrecoMin.value) || 0;
  const precoMax = parseFloat(filtroPrecoMax.value) || Infinity;
  const busca = filtroBusca.value.toLowerCase();

  const filtrados = todosProdutos.filter(p => {
    const matchCategoria = categoria === "todos" || p.categoria === categoria;
    const matchDestaque = !destaque || p.destaque === true;
    const matchPreco = p.preco >= precoMin && p.preco <= precoMax;
    const matchBusca = p.nome.toLowerCase().includes(busca) || p.descricao.toLowerCase().includes(busca);
    return matchCategoria && matchDestaque && matchPreco && matchBusca;
  });

  renderizarProdutos(filtrados);
}

/* 🖼️ Renderiza os produtos filtrados no catálogo */
function renderizarProdutos(produtos) {
  catalogo.innerHTML = "";
  catalogo.className = "produtos"; // garante que o grid seja aplicado
  imagens = []; // limpa imagens anteriores

  produtos.forEach((produto, index) => {
    const card = document.createElement("div");
    card.className = "produto-card";

    // 🔗 Mensagem personalizada para WhatsApp
    const mensagem = `🛍️ *Olá Marli!* Gostaria de saber mais sobre o produto: *${produto.nome}*, que está por *R$ ${produto.preco.toFixed(2)}*.\n\n👉 Link da página: ${window.location.href}\n📷 Imagem: ${produto.imagem}`;
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    // 🧱 HTML do card de produto
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" class="zoom-img" onclick="abrirLightbox(${index})" />
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
      <span class="preco">R$ ${produto.preco.toFixed(2)}</span>
      <a href="${urlWhatsApp}" class="whatsapp-btn" target="_blank">
        <div class="whatsapp-content">
          <img src="./assets/icones/whatsapp.png" alt="WhatsApp" />
          <span>Fale no WhatsApp</span>
        </div>
      </a>
    `;

    catalogo.appendChild(card);
    imagens.push({ src: produto.imagem, alt: produto.nome });
  });
}
window.renderizarProdutos = renderizarProdutos;

/* 🧪 Eventos de filtro – atualiza catálogo em tempo real */
[
  filtroCategoria,
  filtroDestaque,
  filtroPrecoMin,
  filtroPrecoMax,
  filtroBusca
].forEach(el => {
  el.addEventListener("input", aplicarFiltros);
});

/* ============================================
   🔍 LIGHTBOX – Visualização ampliada de imagens
   ============================================ */

/* 🔹 Abre o lightbox com a imagem clicada */
function abrirLightbox(index) {
  imagemAtual = index;
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");

  lightbox.classList.add("ativo");
  lightboxImg.src = imagens[index].src;
  caption.textContent = imagens[index].alt;
}

/* ❌ Fecha o lightbox */
function fecharLightbox() {
  document.getElementById("lightbox").classList.remove("ativo");
}

/* ▶️ Vai para a próxima imagem */
function proximaImagem() {
  imagemAtual = (imagemAtual + 1) % imagens.length;
  abrirLightbox(imagemAtual);
}

/* ◀️ Volta para a imagem anterior */
function imagemAnterior() {
  imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length;
  abrirLightbox(imagemAtual);
}

/* ⌨️ Navegação por teclado no lightbox */
document.addEventListener("keydown", function (e) {
  const lightboxAtivo = document.getElementById("lightbox").classList.contains("ativo");
  if (!lightboxAtivo) return;

  switch (e.key) {
    case "ArrowRight":
      proximaImagem();
      break;
    case "ArrowLeft":
      imagemAnterior();
      break;
    case "Escape":
      fecharLightbox();
      break;
  }
});
