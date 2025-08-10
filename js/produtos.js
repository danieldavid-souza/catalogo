// 🧱 Seleciona o container onde os cards de produto serão inseridos
const catalogo = document.getElementById("catalogo");

// 🖼️ Array para armazenar imagens para o Lightbox
let imagens = [];
let imagemAtual = 0;

// 📞 Número de WhatsApp da loja (formato internacional sem o símbolo +)
const numeroWhatsApp = "5532991657472";

// 📦 Busca os dados dos produtos a partir do arquivo JSON
fetch("./js/produtos.json")
  .then(res => res.json())
  .then(produtos => {
    produtos.forEach((produto, index) => {
      // 🧩 Cria o card de produto
      const card = document.createElement("div");
      card.className = "produto-card";

      // 💬 Mensagem personalizada para o WhatsApp com nome, preço e imagem
      const mensagem = `🛍️ *Olá Marli!* Gostaria de saber mais sobre o produto: *${produto.nome}*, que está por *R$ ${produto.preco.toFixed(2)}*.\n\n👉 Link da página: ${window.location.href}\n📷 Imagem: ${produto.imagem}`;
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

      // 🖼️ Define o conteúdo HTML do card
      card.innerHTML = `
        <!-- Imagem com zoom e clique para abrir o Lightbox -->
        <img src="${produto.imagem}" alt="${produto.nome}" class="zoom-img" onclick="abrirLightbox(${index})" />
        
        <!-- Informações do produto -->
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <span class="preco">R$ ${produto.preco.toFixed(2)}</span>
        
        <!-- Botão do WhatsApp com ícone e mensagem dinâmica -->
        <a href="${urlWhatsApp}" class="whatsapp-btn" target="_blank">
          <div class="whatsapp-content">
          <img src="./assets/icones/whatsapp.png" alt="WhatsApp" />
          <span>Fale no WhatsApp</span>
          </div>
        </a>
      `;

      // 📥 Adiciona o card ao catálogo
      catalogo.appendChild(card);

      // 🧷 Armazena a imagem para uso posterior no Lightbox
      imagens.push({ src: produto.imagem, alt: produto.nome });
    });
  });

/* 🔍 Abre o Lightbox com a imagem clicada */
function abrirLightbox(index) {
  imagemAtual = index;

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");

  // 🖼️ Atualiza imagem e legenda
  lightbox.classList.add("ativo");
  lightboxImg.src = imagens[index].src;
  caption.textContent = imagens[index].alt;
}

/* ❌ Fecha o Lightbox */
function fecharLightbox() {
  document.getElementById("lightbox").classList.remove("ativo");
}

/* ▶️ Vai para a próxima imagem no Lightbox */
function proximaImagem() {
  imagemAtual = (imagemAtual + 1) % imagens.length;
  abrirLightbox(imagemAtual);
}

/* ◀️ Volta para a imagem anterior no Lightbox */
function imagemAnterior() {
  imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length;
  abrirLightbox(imagemAtual);
}

/* ⌨️ Navegação por teclado dentro do Lightbox */
document.addEventListener("keydown", function (e) {
  const lightboxAtivo = document.getElementById("lightbox").classList.contains("ativo");
  if (!lightboxAtivo) return;

  switch (e.key) {
    case "ArrowRight": // ▶️ Próxima imagem
      proximaImagem();
      break;
    case "ArrowLeft": // ◀️ Imagem anterior
      imagemAnterior();
      break;
    case "Escape": // ❌ Fechar com ESC
      fecharLightbox();
      break;
  }
});
