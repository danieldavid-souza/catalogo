/* ============================================
   🎛️ FILTRO.JS – Aplicação dinâmica de filtros
   ============================================ */
// ✅ Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
  
  // 🔹 Captura os elementos de filtro do HTML pelo ID
  const filtroCategoria = document.getElementById("filtro-categoria");   // <select> de categorias
  const filtroDestaque = document.getElementById("filtro-destaque");     // <input type="checkbox"> para destaques
  const filtroPrecoMin = document.getElementById("filtro-preco-min");    // <input type="number"> para preço mínimo
  const filtroPrecoMax = document.getElementById("filtro-preco-max");    // <input type="number"> para preço máximo
  const filtroBusca = document.getElementById("filtro-busca");           // <input type="text"> para busca por nome ou descrição

  // 🔧 Função que aplica os filtros e atualiza o catálogo
  function aplicarFiltrosExternos() {
    // ⚠️ Verifica se os dados e a função de renderização estão disponíveis
    if (!window.todosProdutos || !window.renderizarProdutos) {
      console.warn("Produtos ou função de renderização não disponíveis.");
      return;
    }

    // 🔍 Obtém os valores atuais dos filtros
    const categoria = filtroCategoria?.value || "todos";
    const destaque = filtroDestaque?.checked || false;
    const precoMin = parseFloat(filtroPrecoMin?.value) || 0;
    const precoMax = parseFloat(filtroPrecoMax?.value) || Infinity;
    const busca = filtroBusca?.value.toLowerCase() || "";

    // 🧠 Filtra os produtos com base nos critérios selecionados
    const filtrados = window.todosProdutos.filter(produto => {
      const matchCategoria = categoria === "todos" || produto.categoria === categoria;
      const matchDestaque = !destaque || produto.destaque === true;
      const matchPreco = produto.preco >= precoMin && produto.preco <= precoMax;
      const matchBusca = produto.nome.toLowerCase().includes(busca) || produto.descricao.toLowerCase().includes(busca);
      return matchCategoria && matchDestaque && matchPreco && matchBusca;
    });

    // 🖼️ Exibe os produtos filtrados no catálogo
    console.log("Filtros aplicados:", filtrados.length, "produtos encontrados.");
    window.renderizarProdutos(filtrados);
  }

  // 🔁 Adiciona eventos aos elementos de filtro para aplicar os filtros em tempo real
  const filtros = [filtroCategoria, filtroDestaque, filtroPrecoMin, filtroPrecoMax, filtroBusca];
  filtros.forEach(el => {
    if (el) {
      el.addEventListener("input", aplicarFiltrosExternos); // Aplica filtros ao digitar ou alterar valores
    }
  });
});
