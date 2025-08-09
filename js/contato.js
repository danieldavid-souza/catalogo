/* ============================================
   📩 FORMULÁRIO DE CONTATO – Validação e feedback
   ============================================ */

// 🔗 Adiciona evento ao formulário de contato
document.querySelector('.form-contato').addEventListener('submit', function(e) {
  // 🔍 Seleciona os campos do formulário
  const nome = document.querySelector('input[type="text"]');
  const email = document.querySelector('input[type="email"]');
  const mensagem = document.querySelector('textarea');
  const status = document.getElementById('mensagem-status');

  // 🔄 Impede envio padrão para simular resposta
  e.preventDefault();

  // 🛑 Verifica se todos os campos estão preenchidos
  if (!nome.value || !email.value || !mensagem.value) {
    status.textContent = 'Por favor, preencha todos os campos.';
    status.style.color = 'red';
    status.style.display = 'block';
    return;
  }

  // 📧 Validação simples de e-mail
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  if (!emailValido) {
    status.textContent = 'Digite um e-mail válido.';
    status.style.color = 'red';
    status.style.display = 'block';
    return;
  }

  // ✅ Simula envio bem-sucedido
  status.textContent = '✅ Sua mensagem foi enviada com sucesso!';
  status.style.color = 'green';
  status.style.display = 'block';

  // 🧹 Limpa os campos após envio
  nome.value = '';
  email.value = '';
  mensagem.value = '';
});