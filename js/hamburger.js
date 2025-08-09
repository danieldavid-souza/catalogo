document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const lista = document.querySelector(".menu-lista");

  if (toggle && lista) {
    // 🔄 Alterna visibilidade do menu
    toggle.addEventListener("click", (e) => {
      e.stopPropagation(); // evita propagação para o listener global
      lista.classList.toggle("ativo");
    });

    // ❌ Fecha o menu ao clicar fora
    document.addEventListener("click", (e) => {
      if (!lista.contains(e.target)) {
        lista.classList.remove("ativo");
      }
    });

    // ✅ Fecha com tecla ESC (opcional)
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        lista.classList.remove("ativo");
      }
    });
  }
});