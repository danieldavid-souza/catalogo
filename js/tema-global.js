// 🌍 Componente de troca de tema global
document.addEventListener('DOMContentLoaded', () => {
  const seletor = document.getElementById('tema-select');
  const temas = [
    'claro', 'escuro', 'pastel', 'vaporwave',
    'oceano', 'aurora', 'azul', 'verde'
  ];

  // 🧠 Aplica tema salvo ao carregar
  const temaSalvo = localStorage.getItem('temaAtivo') || 'claro';
  document.documentElement.setAttribute('data-tema', temaSalvo);
  document.body.classList.add(`tema-${temaSalvo}`);
  seletor.value = temaSalvo;

  // 🖱️ Aplica novo tema ao selecionar
  seletor.addEventListener('change', () => {
    const tema = seletor.value;

    // Remove classes antigas
    temas.forEach(t => document.body.classList.remove(`tema-${t}`));

    // Aplica novo tema
    document.documentElement.setAttribute('data-tema', tema);
    document.body.classList.add(`tema-${tema}`);

    // Salva no localStorage
    localStorage.setItem('temaAtivo', tema);
  });
});