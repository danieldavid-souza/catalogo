// 📦 Carrega o menu.html e insere no DOM
fetch("../pages/menu.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("menu-container").innerHTML = html;

    // 🔗 Seleciona elementos do menu após inserção
    const toggle = document.getElementById("menu-toggle");
    const lista = document.getElementById("menu-lista");

    if (toggle && lista) {
      // 🍔 Toggle do menu hamburger
      toggle.addEventListener("click", () => {
        lista.classList.toggle("ativo");
      });

      // 📱 Fecha o menu ao clicar em um link (mobile)
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