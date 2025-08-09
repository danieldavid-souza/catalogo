document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("menu-container");

  // 🧭 Obtém o nome da página atual (sem extensão .html)
  const paginaAtual = window.location.pathname.split("/").pop().replace(".html", "");

  // 📦 Carrega o conteúdo do menu externo
  fetch("../pages/menu.html")
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html; // Insere o HTML do menu no container

      // 🚫 Oculta o item do menu correspondente à página atual
      const itens = container.querySelectorAll("li[data-pagina]");
      itens.forEach(item => {
        const pagina = item.getAttribute("data-pagina");
        if (pagina === paginaAtual) {
          item.style.display = "none";
        }
      });

      // 🍔 Ativa o botão hamburger para mostrar/ocultar o menu
      const toggle = container.querySelector("#menu-toggle");
      const lista = container.querySelector("#menu-lista");

      if (toggle && lista) {
        toggle.addEventListener("click", () => {
          lista.classList.toggle("ativo"); // Alterna visibilidade do menu
        });

        // 📱 Fecha o menu ao clicar em um link (somente em telas pequenas)
        const links = lista.querySelectorAll("a");
        links.forEach(link => {
          link.addEventListener("click", () => {
            if (window.innerWidth < 769) {
              lista.classList.remove("ativo");
            }
          });
        });
      }
    });
});