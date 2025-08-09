document.addEventListener("DOMContentLoaded", () => {
  // 🔗 Seleciona o botão de toggle e a lista do menu
  const toggleBtn = document.querySelector(".menu-toggle");
  const menuLista = document.querySelector(".menu-lista");

  // ✅ Verifica se os elementos existem antes de aplicar o evento
  if (toggleBtn && menuLista) {
    // 🔄 Alterna a classe 'mostrar' para exibir ou ocultar o menu
    toggleBtn.addEventListener("click", () => {
      menuLista.classList.toggle("mostrar");
    });
  }
});