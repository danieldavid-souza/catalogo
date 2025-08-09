// 🌈 Seletor de tema com preview visual
document.addEventListener('DOMContentLoaded', () => {
  const botoes = document.querySelectorAll('#seletor-tema-visual button');
  const temas = [
    'claro', 'escuro', 'pastel', 'vaporwave',
    'oceano', 'aurora', 'azul', 'verde'
  ];

  // 🚀 Aplica tema salvo ao carregar
  const temaSalvo = localStorage.getItem('temaAtivo') || 'claro';
  document.documentElement.setAttribute('data-tema', temaSalvo);
  document.body.classList.add(`tema-${temaSalvo}`);

  // 🎨 Configura botões
  botoes.forEach(btn => {
    const tema = btn.dataset.tema;

    // Aplica tema ao clicar
    btn.addEventListener('click', () => {
      temas.forEach(t => document.body.classList.remove(`tema-${t}`));
      document.documentElement.setAttribute('data-tema', tema);
      document.body.classList.add(`tema-${tema}`);
      localStorage.setItem('temaAtivo', tema);
    });

    // 👁️ Preview ao passar o mouse
    btn.addEventListener('mouseenter', () => {
      document.documentElement.setAttribute('data-tema', tema);
    });

    // 🔄 Restaura tema ativo ao sair
    btn.addEventListener('mouseleave', () => {
      const temaAtual = localStorage.getItem('temaAtivo') || 'claro';
      document.documentElement.setAttribute('data-tema', temaAtual);
    });
  });
});