// 🚀 Aplica o tema salvo ao carregar qualquer página
document.addEventListener('DOMContentLoaded', () => {
  const temaSalvo = localStorage.getItem('temaAtivo') || 'claro';

  document.documentElement.setAttribute('data-tema', temaSalvo);
  document.body.classList.add(`tema-${temaSalvo}`);
});