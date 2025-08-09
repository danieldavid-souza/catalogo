/* ============================================
   🔤 APLICAÇÃO DE FONTE PERSONALIZADA
   ============================================ */

// 🕒 Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement; // 🌱 Referência ao elemento <html>

  // 🎨 Mapeamento das fontes disponíveis via CSS custom properties
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
    arimo: 'var(--fonte-arimo)'
  };

  // 📦 Recupera a fonte preferida salva no localStorage
  const fonteSalva = localStorage.getItem('fonte-preferida');

  // ✅ Se houver uma fonte válida salva, aplica ao CSS
  if (fonteSalva && fontes[fonteSalva]) {
    root.style.setProperty('--fonte-atual', fontes[fonteSalva]);
  }
});