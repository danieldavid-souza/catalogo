// 🎯 Aplica o tema selecionado à página
export function aplicarTema(tema) {
  const html = document.documentElement;
  const body = document.body;

  // 🎨 Lista de temas válidos
  const temasDisponiveis = [
    'claro', 'escuro', 'pastel', 'vaporwave',
    'oceano', 'aurora', 'azul', 'verde'
  ];

  // 🚫 Ignora temas inválidos
  if (!temasDisponiveis.includes(tema)) {
    console.warn(`Tema "${tema}" não é reconhecido.`);
    return;
  }

  // 🧼 Remove todas as classes de tema existentes do <body>
  temasDisponiveis.forEach(t => {
    body.classList.remove(`tema-${t}`);
  });

  // 🎨 Aplica o novo tema
  html.setAttribute('data-tema', tema);         // Define atributo no <html> para CSS global
  body.classList.add(`tema-${tema}`);           // Adiciona classe ao <body> para estilos específicos

  // 💾 Salva o tema no localStorage para persistência entre sessões
  localStorage.setItem('temaAtivo', tema);
}