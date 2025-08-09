/* ============================================
   🌦️ PREVISAO DO TEMPO – Integração com WeatherAPI
   ============================================ */

// 🔑 Sua chave da API do WeatherAPI
const chaveAPI = "e4617ae02dc843e1b7f22034250508";

// 📦 Container onde os cards de previsão serão inseridos
const diasContainer = document.querySelector("#dias-container");

/* 🚀 Função principal que busca os dados de previsão com base na cidade */
async function buscarPrevisao(cidade) {
  try {
    // 🔗 Requisição à API com cidade, número de dias e idioma
    const resposta = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${chaveAPI}&q=${cidade}&days=5&lang=pt`);
    const dados = await resposta.json();

    // 🖼️ Exibe os dados de previsão no DOM
    mostrarPrevisao(dados.forecast.forecastday);
  } catch (erro) {
    // ⚠️ Tratamento de erro em caso de falha na requisição
    console.error("Erro ao buscar previsão:", erro);
    diasContainer.innerHTML = "<p>Não foi possível carregar a previsão do tempo.</p>";
  }
}

/* 🎨 Função que retorna o caminho do ícone local com base na descrição do clima */
function selecionarIconeLocal(frase) {
  frase = frase.toLowerCase();

  if (frase.includes("chuva")) {
    return "./assets/clima/chuva2.png";
  } else if (frase.includes("nublado") || frase.includes("nuvem")) {
    return "./assets/clima/nublado4.png";
  } else if (frase.includes("sol") || frase.includes("ensolarado") || frase.includes("claro")) {
    return "./assets/clima/sol.png";
  } else if (frase.includes("neve")) {
    return "./assets/clima/neve.png";
  } else if (frase.includes("tempestade") || frase.includes("trovoada")) {
    return "./assets/clima/tempestade.png";
  } else if (frase.includes("vento")) {
    return "./assets/clima/vento.png";
  } else {
    return "./assets/clima/estavel.png"; // ícone padrão para condições não mapeadas
  }
}

/* 💬 Função que retorna uma frase personalizada com base na condição do tempo */
function gerarFrasePersonalizada(fraseOriginal) {
  const frase = fraseOriginal.toLowerCase();

  if (frase.includes("chuva")) {
    return "Não esqueça o guarda-chuva ☔";
  } else if (frase.includes("nublado") || frase.includes("nuvem")) {
    return "O céu está tímido hoje ☁️";
  } else if (frase.includes("sol") || frase.includes("ensolarado") || frase.includes("claro")) {
    return "Dia perfeito para sair e aproveitar o sol ☀️";
  } else if (frase.includes("neve")) {
    return "Prepare o chocolate quente, vem frio por aí ❄️";
  } else if (frase.includes("vento")) {
    return "Segure o chapéu, o vento está forte 💨";
  } else {
    return "Clima estável, aproveite o dia 🌤️";
  }
}

/* 📅 Função auxiliar para formatar a data em nome do dia da semana */
function formatarDia(dataString) {
  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const data = new Date(dataString);
  return diasSemana[data.getDay()];
}

/* 🧱 Função que recebe os dados da previsão e renderiza os cards */
function mostrarPrevisao(dados) {
  diasContainer.innerHTML = ""; // limpa previsões anteriores

  // 🔁 Itera sobre os dados de previsão (exclui o primeiro dia, que é o atual)
  dados.slice(1).forEach((diaInfo) => {
    const dia = formatarDia(diaInfo.date); // nome do dia da semana
    const min = Math.round(diaInfo.day.mintemp_c); // temperatura mínima
    const max = Math.round(diaInfo.day.maxtemp_c); // temperatura máxima
    const frase = diaInfo.day.condition.text; // descrição do clima
    const icone = selecionarIconeLocal(frase); // ícone correspondente

    // 🧱 Cria o card de previsão
    const card = document.createElement("div");
    card.classList.add("card-tempo");

    const titulo = document.createElement("p");
    titulo.innerHTML = `<strong>${dia}</strong>`;

    const iconeImg = document.createElement("img");
    iconeImg.setAttribute("src", icone);
    iconeImg.setAttribute("alt", frase);
    iconeImg.setAttribute("style", "width:60px;height:60px;display:block;margin:10px auto;");

    const temperatura = document.createElement("p");
    temperatura.textContent = `${min}°C / ${max}°C`;

    const fraseClima = document.createElement("p");
    fraseClima.textContent = gerarFrasePersonalizada(frase);

    // 🧩 Monta o card
    card.appendChild(titulo);
    card.appendChild(iconeImg);
    card.appendChild(temperatura);
    card.appendChild(fraseClima);

    // 📦 Adiciona o card ao container
    diasContainer.appendChild(card);
  });
}

// 🔄 Chamada inicial para buscar a previsão de uma cidade
buscarPrevisao("Juiz de Fora");
