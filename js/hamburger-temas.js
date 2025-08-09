/* ============================================
   🍔 MENU DE TEMAS – Toggle do painel de temas
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Seleciona os botões e o painel
  const botaoHamburger = document.getElementById("toggle-temas") || document.getElementById("btn-hamburger");
  const painelTemas = document.getElementById("painel-temas");

  // ✅ Verifica se os elementos existem antes de aplicar o evento
  if (botaoHamburger && painelTemas) {
    botaoHamburger.addEventListener("click", () => {
      painelTemas.classList.toggle("ativo"); // alterna visibilidade
    });
  }
});