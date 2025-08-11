/* ============================================
   🛍️ CATÁLOGO DE PRODUTOS – Filtros dinâmicos
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Elementos do DOM usados para filtrar os produtos
  const catalogo = document.getElementById("catalogo");
  const filtroCategoria = document.getElementById("filtro-categoria");
  const filtroDestaque = document.getElementById("filtro-destaque");
  const filtroPrecoMin = document.getElementById("filtro-preco-min");
  const filtroPrecoMax = document.getElementById("filtro-preco-max");
  const filtroBusca = document.getElementById("filtro-busca");

  // 🔹 Lista que armazenará todos os produtos carregados
  let todosProdutos = [];

  /* 🔄 Carrega os produtos do arquivo JSON */
  fetch("./js/produtos.json")
    .then(res => res.json())
    .then(produtos => {
      todosProdutos = produtos;
      gerarCategorias(produtos); // cria opções de categoria
      aplicarFiltros();          // renderiza todos os produtos inicialmente
    });

  /* 🧩 Gera categorias únicas para o filtro de categoria */
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

  /* 🎛️ Aplica os filtros selecionados e renderiza os produtos */
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

  /* 🔁 Adiciona eventos aos filtros para atualizar em tempo real */
  [
    filtroCategoria,
    filtroDestaque,
    filtroPrecoMin,
    filtroPrecoMax,
    filtroBusca
  ].forEach(el => {
    el.addEventListener("input", aplicarFiltros);
  });
});
