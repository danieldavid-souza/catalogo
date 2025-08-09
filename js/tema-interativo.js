// 🧠 Aplica o tema salvo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  const temaSalvo = localStorage.getItem('temaAtivo') || 'claro';

  // Aplica o tema salvo no <html> e no <body>
  document.documentElement.setAttribute('data-tema', temaSalvo);
  document.body.classList.add(`tema-${temaSalvo}`);
});

// 🔗 Importa função de aplicação de tema de outro módulo
import { aplicarTema } from './tema-aplicador.js';

// 🧠 Espera o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
  const temaSalvo = localStorage.getItem('temaAtivo') || 'claro';

  // Aplica o tema salvo visualmente
  document.documentElement.setAttribute('data-tema', temaSalvo);
  document.body.classList.add(`tema-${temaSalvo}`);
  aplicarTema(temaSalvo); // Aplica estilos e salva no localStorage

  // 🔧 Seleciona elementos da interface
  const botoes = document.querySelectorAll('.preview[data-tema]');
  const painel = document.getElementById('painel-temas');
  const toggle = document.getElementById('toggle-temas');
  const reset = document.getElementById('reset-tema');
  const notificacao = document.getElementById('notificacao-tema');

  // 🍔 Alterna visibilidade do painel de temas
  toggle.addEventListener('click', () => {
    painel.classList.toggle('oculto');
  });

  // 🎨 Configura comportamento dos botões de tema
  botoes.forEach(btn => {
    const tema = btn.dataset.tema;

    // Aplica tema ao clicar
    btn.addEventListener('click', () => {
      aplicarTema(tema);
      mostrarNotificacao(`Tema "${tema}" aplicado!`);
    });

    // Pré-visualiza tema ao passar o mouse
    btn.addEventListener('mouseenter', () => {
      document.documentElement.setAttribute('data-tema', tema);
    });

    // Restaura tema ativo ao sair do botão
    btn.addEventListener('mouseleave', () => {
      const temaAtual = localStorage.getItem('temaAtivo') || 'claro';
      document.documentElement.setAttribute('data-tema', temaAtual);
    });
  });

  // 🔄 Redefine tema para o padrão
  reset.addEventListener('click', () => {
    aplicarTema('claro');
    mostrarNotificacao('Tema redefinido para padrão.');
  });

  // 💬 Exibe notificação temporária
  function mostrarNotificacao(msg) {
    notificacao.textContent = msg;
    notificacao.classList.add('ativo');
    setTimeout(() => notificacao.classList.remove('ativo'), 3000);
  }
});

// 🖼️ Pré-visualização de temas com hover e clique
const botoesPreview = document.querySelectorAll('.preview');
const html = document.documentElement;
const body = document.body;
let temaAtual = localStorage.getItem('temaAtivo') || 'claro';

// Aplica tema salvo ao carregar
html.setAttribute('data-tema', temaAtual);
body.classList.add(`tema-${temaAtual}`);

// Adiciona eventos de hover e clique nos botões de tema
botoesPreview.forEach(botao => {
  const tema = botao.dataset.tema;

  // Hover: pré-visualiza tema
  botao.addEventListener('mouseenter', () => {
    html.setAttribute('data-tema', tema);
    body.className = '';
    body.classList.add(`tema-${tema}`);
  });

  // Mouse leave: restaura tema atual
  botao.addEventListener('mouseleave', () => {
    html.setAttribute('data-tema', temaAtual);
    body.className = '';
    body.classList.add(`tema-${temaAtual}`);
  });

  // Clique: aplica tema e salva
  botao.addEventListener('click', () => {
    temaAtual = tema;
    localStorage.setItem('temaAtivo', tema);
    html.setAttribute('data-tema', tema);
    body.className = '';
    body.classList.add(`tema-${tema}`);
  });
});

// 🔄 Atualiza botão ativo visualmente
function atualizarBotaoAtivo(tema) {
  botoesPreview.forEach(btn => btn.classList.remove('ativo'));
  const btnAtivo = document.querySelector(`[data-tema="${tema}"]`);
  if (btnAtivo) btnAtivo.classList.add('ativo');
}

// 🍔 Comportamento do painel de temas interativo
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-temas");
  const painelTemas = document.getElementById("painel-temas");

  // Verifica se os elementos existem
  if (!toggleBtn || !painelTemas) return;

  // Alterna visibilidade ao clicar no botão
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita fechamento imediato
    painelTemas.classList.toggle("visivel");
  });

  // Fecha o painel ao clicar fora
  document.addEventListener("click", (e) => {
    const clicouFora = !painelTemas.contains(e.target) && e.target !== toggleBtn;
    if (clicouFora && painelTemas.classList.contains("visivel")) {
      painelTemas.classList.remove("visivel");
    }
  });

  // Fecha o painel ao selecionar um tema
  const botoesTema = painelTemas.querySelectorAll(".preview");
  botoesTema.forEach(btn => {
    btn.addEventListener("click", () => {
      painelTemas.classList.remove("visivel");
    });
  });
});