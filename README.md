# 🛍️ Lima Calixto Personalizados - Catálogo Online

Este projeto é um catálogo online desenvolvido para a marca **Lima Calixto Personalizados**, com foco em apresentar produtos personalizados, contar a história da empresa e permitir que o usuário escolha temas visuais para a interface.

---

## 📌 Objetivo

Criar uma experiência digital acolhedora e personalizada, onde o visitante pode:
- Navegar por produtos com filtros e visualização ampliada.
- Conhecer a história, missão e valores da marca.
- Escolher temas visuais e fontes preferidas.
- Enviar mensagens via formulário de contato integrado ao WhatsApp.

---

## 🧱 Estrutura do Projeto

```plaintext
📁 raiz/
├── index.html               # Página inicial com widget de clima
├── produtos.html            # Catálogo com filtros e lightbox
├── galeria.html             # Galeria de imagens com navegação
├── contato.html             # Formulário de contato com feedback
├── sobre.html               # Página institucional "Sobre Nós"
├── temas.html               # Página de personalização de tema
├── menu.html                # Menu dinâmico reutilizável
│
├── js/
│   ├── catalogo.js          # Renderiza produtos e aplica filtros
│   ├── galeria.js           # Lightbox e navegação de imagens
│   ├── contato.js           # Validação e feedback do formulário
│   ├── envia-email.js       # Envio de dados via Formspree
│   ├── tema-aplicador.js    # Aplica tema visual
│   ├── tema-loader.js       # Carrega tema salvo
│   ├── tema-global.js       # Configurações globais
│   ├── tema-visual.js       # Efeitos visuais
│   ├── tema-interativo.js   # Interface interativa de temas
│   ├── fontes-aplicar.js    # Aplica fonte preferida
│   ├── fontes.js            # Configuração de fontes
│   ├── menu.js              # Comportamento do menu
│   ├── menu-loader.js       # Carrega menu.html dinamicamente
│   ├── clima.js             # Widget de previsão do tempo
│   ├── hamburger.js         # Toggle do menu responsivo
│
├── css/
│   ├── base/                # Estilos reutilizáveis e modulares
│   │   ├── core.css
│   │   ├── layout.css
│   │   ├── theme.css
│   │   ├── temas.css
│   │   ├── fontes.css
│   │   ├── menu.css
│   │   ├── rodape-paginas.css
│   └── paginas/             # Estilos específicos por página
│       ├── index.css
│       ├── produtos.css
│       ├── galeria.css
│       ├── contato.css
│       ├── sobre.css
│
├── assets/
│   ├── img_produtos/        # Imagens dos produtos
│   ├── img_galeria/         # Imagens da galeria
│   ├── icones/              # Ícones como WhatsApp
│
├── js/produtos.json         # Lista de produtos com dados estruturados
