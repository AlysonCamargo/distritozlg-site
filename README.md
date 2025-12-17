# 🏙️ Distrito ZLG

<div align="center">

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite)

**E-commerce moderno de moda urbana com design premium e experiência de usuário excepcional**

[Demo ao Vivo](https://distritozlg-site.vercel.app) • [Reportar Bug](https://github.com/AlysonCamargo/distritozlg-site/issues) • [Solicitar Feature](https://github.com/AlysonCamargo/distritozlg-site/issues)

</div>

---

## 📋 Sobre o Projeto

**Distrito ZLG** é uma plataforma de e-commerce especializada em moda urbana streetwear, oferecendo uma experiência de compra moderna e intuitiva. O site foi desenvolvido com foco em performance, acessibilidade e design responsivo, proporcionando uma navegação fluida em todos os dispositivos.

### ✨ Principais Features

- 🛍️ **Catálogo Completo** - Navegação por categorias com filtros avançados
- 🔍 **Busca Inteligente** - Sistema de busca com normalização de texto e resultados instantâneos
- 🎯 **Filtros Dinâmicos** - Filtragem por categoria, tamanho, promoções e novidades
- 📱 **Design Responsivo** - Interface otimizada para desktop, tablet e mobile
- 🎨 **UI/UX Premium** - Design moderno com animações suaves e micro-interações
- 🛒 **Carrinho de Compras** - Gerenciamento completo de produtos com persistência local
- ❤️ **Lista de Desejos** - Salve seus produtos favoritos para comprar depois
- 📦 **Integração WhatsApp** - Finalização de pedidos via WhatsApp Business
- 🎄 **Temas Sazonais** - Decorações e animações especiais para datas comemorativas
- ⚡ **Performance Otimizada** - Carregamento rápido e paginação incremental
- 🔒 **SEO Otimizado** - Meta tags dinâmicas e URLs amigáveis para mecanismos de busca

---

## 🛠️ Tecnologias

### Core Stack

- **[React 18.3](https://react.dev/)** - Biblioteca JavaScript para construção de interfaces
- **[TypeScript 5.6](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Vite 5.4](https://vitejs.dev/)** - Build tool e dev server de alta performance
- **[React Router 7.1](https://reactrouter.com/)** - Roteamento declarativo para React

### Estilização & UI

- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes reutilizáveis e acessíveis
- **[Radix UI](https://www.radix-ui.com/)** - Primitivos de UI headless
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones moderna

### Ferramentas & Utilitários

- **[React Helmet Async](https://github.com/staylor/react-helmet-async)** - Gerenciamento de meta tags para SEO
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carrossel touch-friendly
- **[Recharts](https://recharts.org/)** - Biblioteca de gráficos para React
- **[Class Variance Authority](https://cva.style/)** - Gerenciamento de variantes de classes CSS

---

## 🚀 Começando

### Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 ou **pnpm** >= 8.0.0

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/AlysonCamargo/distritozlg-site.git
   cd distritozlg-site
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   pnpm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse o projeto**
   
   Abra [http://localhost:8080](http://localhost:8080) no seu navegador

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento na porta 8080 |
| `npm run build` | Gera o build otimizado para produção |
| `npm run preview` | Visualiza o build de produção localmente |
| `npm run lint` | Executa o ESLint para análise de código |

---

## 📁 Estrutura do Projeto

```
distritozlg-site/
├── public/                      # Arquivos estáticos públicos
│   ├── logo.png                # Logo da marca
│   └── ...                     # Outros assets públicos
├── src/
│   ├── components/             # Componentes React
│   │   ├── ui/                # Componentes base (shadcn/ui)
│   │   ├── About.tsx          # Seção sobre a loja
│   │   ├── CartDrawer.tsx     # Drawer do carrinho de compras
│   │   ├── Catalog.tsx        # Catálogo principal de produtos
│   │   ├── CatalogFilters.tsx # Filtros do catálogo
│   │   ├── CatalogGrid.tsx    # Grid de produtos
│   │   ├── Contact.tsx        # Seção de contato
│   │   ├── Footer.tsx         # Rodapé do site
│   │   ├── Hero.tsx           # Seção hero/banner principal
│   │   ├── Navigation.tsx     # Barra de navegação
│   │   ├── OrderForm.tsx      # Formulário de pedido
│   │   ├── ProductCard.tsx    # Card de produto
│   │   ├── ProductModal.tsx   # Modal de detalhes do produto
│   │   └── SEOProvider.tsx    # Provider de SEO
│   ├── data/
│   │   └── products.ts        # Dados dos produtos
│   ├── lib/
│   │   └── utils.ts           # Funções utilitárias
│   ├── App.tsx                # Componente principal
│   ├── main.tsx               # Ponto de entrada
│   └── index.css              # Estilos globais
├── .eslintrc.cjs              # Configuração ESLint
├── .gitignore                 # Arquivos ignorados pelo Git
├── index.html                 # HTML principal
├── package.json               # Dependências e scripts
├── postcss.config.js          # Configuração PostCSS
├── tailwind.config.ts         # Configuração Tailwind CSS
├── tsconfig.json              # Configuração TypeScript
├── vite.config.ts             # Configuração Vite
└── README.md                  # Este arquivo
```

---

## 🎨 Features Detalhadas

### Sistema de Catálogo

- **Categorias Dinâmicas**: Dryfit, Malha Egípcia, Oversized, Calça Cargo, Regatas, Surf, Peruana e mais
- **Contagem em Tempo Real**: Número de produtos por categoria atualizado dinamicamente
- **Ordenação Múltipla**: Por relevância, novidades, preço (crescente/decrescente) e nome
- **Paginação Incremental**: Carregamento progressivo de produtos para melhor performance

### Sistema de Filtros

- **Filtro por Tamanho**: P, M, G, GG com seleção múltipla
- **Filtro de Promoções**: Visualize apenas produtos em oferta
- **Busca por Nome**: Sistema de busca com normalização de acentos
- **Filtros Combinados**: Todos os filtros funcionam em conjunto

### Carrinho de Compras

- **Persistência Local**: Carrinho salvo no localStorage
- **Gerenciamento Completo**: Adicionar, remover e ajustar quantidades
- **Cálculo Automático**: Total atualizado em tempo real
- **Integração WhatsApp**: Envio de pedido formatado via WhatsApp

### SEO & Performance

- **Meta Tags Dinâmicas**: Título e descrição únicos por página/produto
- **URLs Amigáveis**: Rotas semânticas para melhor indexação
- **Lazy Loading**: Carregamento sob demanda de componentes
- **Otimização de Imagens**: Uso de CDN e formatos modernos

---

## 🌐 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Importe o projeto no [Vercel](https://vercel.com)
3. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy automático a cada push na branch `main`

### Netlify

1. Conecte seu repositório no [Netlify](https://netlify.com)
2. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Deploy automático configurado

### Build Manual

```bash
# Gerar build de produção
npm run build

# Os arquivos estarão em ./dist
# Faça upload para seu servidor de hospedagem
```

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Siga os passos abaixo:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature
   ```bash
   git checkout -b feature/MinhaNovaFeature
   ```
3. **Commit** suas mudanças
   ```bash
   git commit -m 'feat: Adiciona nova feature incrível'
   ```
4. **Push** para a branch
   ```bash
   git push origin feature/MinhaNovaFeature
   ```
5. Abra um **Pull Request**

### Convenções de Commit

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação, ponto e vírgula, etc
- `refactor:` Refatoração de código
- `test:` Adição de testes
- `chore:` Atualização de dependências, configurações, etc

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License

Copyright (c) 2025 Alyson Camargo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Autor

**Alyson Camargo**

- GitHub: [@AlysonCamargo](https://github.com/AlysonCamargo)
- LinkedIn: [Alyson Camargo](https://linkedin.com/in/alysoncamargo)

---

## 🙏 Agradecimentos

- [shadcn/ui](https://ui.shadcn.com/) pela incrível biblioteca de componentes
- [Tailwind CSS](https://tailwindcss.com/) pelo framework CSS excepcional
- [Vite](https://vitejs.dev/) pela ferramenta de build ultra-rápida
- Comunidade React por todo o suporte e recursos

---

<div align="center">

**Feito com ❤️ e ☕ por [Alyson Camargo](https://github.com/AlysonCamargo)**

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>
