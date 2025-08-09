/* ============================================
   🔤 SELETOR DE FONTES PERSONALIZADAS COM PREVIEW
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 🔗 Elementos do DOM
  const seletorFonte = document.getElementById('fonte-preferida'); // dropdown de fontes
  const previewInput = document.getElementById('preview-fonte');   // campo de texto para preview
  const root = document.documentElement;                           // referência ao <html>

  // 🎨 Mapeamento de fontes via variáveis CSS
  const fontes = {
    padrao: 'var(--fonte-padrao)',
    serif: 'var(--fonte-serif)',
    monospace: 'var(--fonte-monospace)',
    roboto: 'var(--fonte-roboto)',
    lora: 'var(--fonte-lora)',
    comic: 'var(--fonte-comic)',
    open: 'var(--fonte-open)',
    montserrat: 'var(--fonte-montserrat)',
    raleway: 'var(--fonte-raleway)',
    arimo: '"Arimo", sans-serif'
  };

  // 🧵 Font-family reais para aplicar no preview
  const fontesCSS = {
    padrao: 'sans-serif',
    serif: 'serif',
    monospace: 'monospace',
    roboto: 'Roboto, sans-serif',
    lora: 'Lora, serif',
    comic: '"Comic Sans MS", cursive',
    open: '"Open Sans", sans-serif',
    montserrat: 'Montserrat, sans-serif',
    raleway: 'Raleway, sans-serif',
    arimo: '"Arimo", sans-serif'
  };

  /* 🧩 Aplica a fonte selecionada */
  function aplicarFonte(valor) {
    if (fontes[valor]) {
      // Aplica ao site via CSS custom property
      root.style.setProperty('--fonte-atual', fontes[valor]);

      // Aplica ao campo de preview diretamente
      previewInput.style.fontFamily = fontesCSS[valor];

      // Salva a escolha no localStorage
      localStorage.setItem('fonte-preferida', valor);
    }
  }

  // 🔄 Carrega fonte e frase salvas anteriormente
  const fonteSalva = localStorage.getItem('fonte-preferida');
  const fraseSalva = localStorage.getItem('frase-preview');

  if (fonteSalva && fontes[fonteSalva]) {
    seletorFonte.value = fonteSalva;
    aplicarFonte(fonteSalva);
  }

  if (fraseSalva) {
    previewInput.value = fraseSalva;
  }

  // 🔁 Atualiza fonte ao mudar seleção
  seletorFonte.addEventListener('change', () => {
    aplicarFonte(seletorFonte.value);
  });

  // 💾 Salva frase digitada em tempo real
  previewInput.addEventListener('input', () => {
    localStorage.setItem('frase-preview', previewInput.value);
  });
});