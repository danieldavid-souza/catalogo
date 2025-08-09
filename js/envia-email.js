/* ============================================
   📬 FORMULÁRIO COM ENVIO VIA FORMSPREE
   ============================================ */

// 🔗 Adiciona evento de envio ao formulário
document.getElementById("form-contato").addEventListener("submit", function(e) {
  e.preventDefault(); // impede envio padrão

  const form = e.target; // referência ao formulário
  const data = new FormData(form); // coleta os dados do formulário
  const resposta = document.getElementById("resposta"); // elemento para exibir feedback

  // 🚀 Envia os dados para o Formspree
  fetch("https://formspree.io/f/xjkorora", {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    resposta.style.display = "block"; // exibe a mensagem
    resposta.className = ""; // limpa classes anteriores

    if (response.ok) {
      // ✅ Sucesso no envio
      resposta.textContent = "✅ Mensagem enviada com sucesso!";
      resposta.classList.add("sucesso");
      form.reset(); // limpa os campos
    } else {
      // ❌ Erro no envio
      resposta.textContent = "❌ Erro ao enviar. Tente novamente.";
      resposta.classList.add("erro");
    }

    // ⏳ Oculta a mensagem após 5 segundos
    setTimeout(() => {
      resposta.style.opacity = "0"; // inicia transição
      setTimeout(() => {
        resposta.style.display = "none"; // oculta completamente
        resposta.style.opacity = "1"; // reseta opacidade
        resposta.className = ""; // limpa classes
        resposta.textContent = ""; // limpa texto
      }, 500); // tempo para a transição terminar
    }, 5000);
  })
  .catch(() => {
    // 🌐 Erro de conexão ou falha na requisição
    resposta.style.display = "block";
    resposta.textContent = "❌ Erro de conexão.";
    resposta.classList.add("erro");

    // ⏳ Oculta após 5 segundos
    setTimeout(() => {
      resposta.style.opacity = "0";
      setTimeout(() => {
        resposta.style.display = "none";
        resposta.style.opacity = "1";
        resposta.className = "";
        resposta.textContent = "";
      }, 500);
    }, 5000);
  });
});