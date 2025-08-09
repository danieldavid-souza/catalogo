/* 🕒 Aplica tema automaticamente com base na hora do dia */
function aplicarTemaAutomatico() {
  const hora = new Date().getHours(); // Obtém a hora atual
  let tema;

  // ⏰ Define o tema conforme o horário
  if (hora >= 6 && hora < 12) tema = 'claro';       // Manhã
  else if (hora >= 12 && hora < 18) tema = 'pastel'; // Tarde
  else if (hora >= 18 && hora < 22) tema = 'oceano'; // Noite
  else tema = 'escuro';                              // Madrugada

  aplicarTema(tema); // Aplica o tema escolhido
}

/* 🎨 Aplica o tema visual ao site */
function aplicarTema(tema) {
  document.documentElement.setAttribute('data-tema', tema); // Define atributo para CSS
  document.body.className = '';                             // Remove classes anteriores
  document.body.classList.add(`tema-${tema}`);              // Adiciona classe do tema
  localStorage.setItem('temaAtivo', tema);                  // Salva tema no localStorage
  atualizarBotaoAtivo(tema);                                // Atualiza botão ativo (se houver)
}

/* 🔄 Verifica se o modo automático está ativado ao carregar a página */
document.addEventListener('DOMContentLoaded', () => {
  const modoAuto = localStorage.getItem('modoAutomatico') === 'true';
  document.getElementById('modo-automatico').checked = modoAuto;

  if (modoAuto) aplicarTemaAutomatico(); // Aplica tema automático se ativado
});

/* 🧠 Atualiza preferências de modo automático ao interagir com o checkbox */
document.getElementById('modo-automatico').addEventListener('change', e => {
  localStorage.setItem('modoAutomatico', e.target.checked); // Salva preferência
  if (e.target.checked) aplicarTemaAutomatico();            // Aplica tema se ativado
});

/* 🔤 Preferência de fonte */
const seletorFonte = document.getElementById('fonte-preferida');

/* 🎚️ Atualiza fonte ao selecionar uma nova opção */
seletorFonte.addEventListener('change', e => {
  const fonte = e.target.value;
  localStorage.setItem('fontePreferida', fonte); // Salva fonte escolhida
  atualizarFonte(fonte);                         // Aplica fonte
});

/* 🖋️ Aplica a fonte escolhida ao corpo da página */
function atualizarFonte(fonte) {
  document.body.classList.remove('fonte-serif', 'fonte-monospace'); // Remove fontes anteriores
  if (fonte !== 'padrao') {
    document.body.classList.add(`fonte-${fonte}`); // Adiciona nova fonte
  }
}

/* 🧠 Aplica fonte salva ao carregar a página */
document.addEventListener('DOMContentLoaded', () => {
  const fonteSalva = localStorage.getItem('fontePreferida') || 'padrao';
  seletorFonte.value = fonteSalva;
  atualizarFonte(fonteSalva);
});

/* 📏 Preferência de modo compacto */
const chkCompacto = document.getElementById('modo-compacto');

/* 🧠 Atualiza modo compacto ao interagir com o checkbox */
chkCompacto.addEventListener('change', e => {
  const ativo = e.target.checked;
  localStorage.setItem('modoCompacto', ativo); // Salva preferência
  document.body.classList.toggle('compacto', ativo); // Aplica ou remove classe
});

/* 🧠 Aplica modo compacto salvo ao carregar a página */
document.addEventListener('DOMContentLoaded', () => {
  const compacto = localStorage.getItem('modoCompacto') === 'true';
  chkCompacto.checked = compacto;
  document.body.classList.toggle('compacto', compacto);
});