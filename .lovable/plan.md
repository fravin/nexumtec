# Lightbox de modelos demonstrativos em /criacao-de-sites

## Objetivo
Permitir que o visitante clique nos modelos demonstrativos de sites (Clínica Aurora, Forma Arquitetura, Vértice Consultoria) e os visualize em um visualizador em tela cheia, com navegação entre os modelos. A estrutura já aceita novos exemplos: hoje só os protótipos existentes ficam disponíveis.

## O que muda
1. **Visualizador (lightbox) com navegação**
   - Modal em tela cheia (Dialog) mostrando o modelo ampliado com:
     - Nome, categoria e legenda "Modelo demonstrativo · Marcas e projetos ilustrativos".
     - Botões anterior/próximo (setas) para navegar entre os modelos, voltando ao início no fim da lista.
     - Suporte a teclado (Esc fecha; setas navegam) e botão de fechar.
     - Indicador de posição (ex.: 01/03).
   - Novos modelos futuros aparecem automaticamente: a navegação é derivada da lista `websiteExamples` em `src/content/websiteCreation.ts`.

2. **Clique habilitado nos dois lugares**
   - Grade de 3 imagens no topo: a imagem inteira fica clicável (botão), com cursor e foco visível, abrindo o lightbox já no modelo clicado.
   - Seção "Possibilidades em perspectiva": a imagem inteira vira clicável (o botão de ampliar existente é removido, já que a imagem toda abre o visualizador).

3. **Acessibilidade e mobile**
   - `aria-label` em cada área clicável ("Ampliar modelo X").
   - Foco retornando à imagem que abriu o lightbox ao fechar.
   - Navegação por setas otimizada para toque no mobile (áreas de toque ≥ 44px).

## Detalhes técnicos
- Arquivo principal: `src/pages/CriacaoDeSites.tsx` (estado `selected` já existe; será estendido para navegação com índice anterior/próximo).
- Sem novas dependências: usa o `Dialog` do shadcn/ui já presente e ícones do lucide-react (`ChevronLeft`, `ChevronRight`).
- Sem alteração de conteúdo ou SEO: `src/content/websiteCreation.ts` permanece igual.
- Sem novas imagens: reaproveita as 3 imagens existentes.

## Validação
- Build OK.
- Playwright: abrir /criacao-de-sites, clicar nas duas áreas, navegar pelos 3 modelos com setas, fechar com Esc, verificar foco e ausência de erros no console, em desktop e mobile (390px).
