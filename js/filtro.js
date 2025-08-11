/* ============================================
   🎛️ FILTRO DE PRODUTOS – filtro.js
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Referência aos elementos de filtro
  const filtroCategoria = document.getElementById("filtro-categoria");
  const filtroDestaque = document.getElementById("filtro-destaque");
  const filtroPrecoMin = document.getElementById("filtro-preco-min");
  const filtroPrecoMax = document.getElementById("filtro-preco-max");
  const filtroBusca = document.getElementById("filtro-busca");

  // 🔹 Função principal para aplicar os filtros
  function aplicarFiltros() {
    const categoria = filtroCategoria?.value || "todos";
    const destaque = filtroDestaque?.checked || false;
    const precoMin = parseFloat(filtroPrecoMin?.value) || 0;
    const precoMax = parseFloat(filtroPrecoMax?.value) || Infinity;
    const busca = filtroBusca?.value.toLowerCase() || "";

    const filtrados = window.todosProdutos.filter(produto => {
      const matchCategoria = categoria === "todos" || produto.categoria === categoria;
      const matchDestaque = !destaque || produto.destaque === true;
      const matchPreco = produto.preco >= precoMin && produto.preco <= precoMax;
      const matchBusca = produto.nome.toLowerCase().includes(busca) || produto.descricao.toLowerCase().includes(busca);
      return matchCategoria && matchDestaque && matchPreco && matchBusca;
    });

    window.renderizarProdutos(filtrados);
  }

  // 🔁 Adiciona eventos aos filtros
  const filtros = [filtroCategoria, filtroDestaque, filtroPrecoMin, filtroPrecoMax, filtroBusca];
  filtros.forEach(el => {
    if (el) {
      el.addEventListener("input", aplicarFiltros);
    }
  });
});
