# Plano: Responsividade Mobile/Tablet

## Objetivo
Fazer uma varredura completa do site e melhorar a experiência em celular (≤640px) e tablet (641–1024px), mantendo o design Clinical Calm intacto no desktop.

## Escopo da auditoria
Revisar cada componente/página nos breakpoints `sm` (640), `md` (768), `lg` (1024):

**Home (`/`)**
- `Hero.tsx` — tamanho do título serif, padding-top do hero, CTAs empilhados, grid de fundo 3D em mobile (performance)
- `Verticals.tsx` — dupla Negócios/Saúde lado a lado vira stack
- `ImpactMetrics.tsx` — contadores em grid responsivo
- `Marquee.tsx` — velocidade/altura em telas pequenas
- `Services.tsx` — grid de cards
- `Projects.tsx` — carrossel: arrows, dots, tamanho dos cards, KPIs e stack chips
- `AboutSummary.tsx`, `CallToAction.tsx`, `Contact.tsx`, `Footer.tsx`

**Páginas internas**
- `Sobre.tsx` (About, Timeline, Skills)
- `Negocios.tsx` e `Saude.tsx` — hero, grid de cases (`md:grid-cols-2`), seções de serviços

**Globais**
- `Header.tsx` — menu mobile (já existe); revisar altura, espaçamento dos itens, área de toque
- `WhatsAppButton.tsx` e `AIChatbot.tsx` — posição não sobrepor CTAs/footer no mobile
- `ScrollToTop.tsx` — posição

## Ajustes que serão aplicados
1. **Tipografia fluida**: títulos serif com `clamp()` ou escala `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` consistente. Reduzir `serif-display` em mobile.
2. **Espaçamento de seções**: `py-16 sm:py-20 md:py-24 lg:py-32` (hoje muitas seções usam `py-24 md:py-32` fixo, ficando apertado/excessivo no mobile).
3. **Container**: `px-5 sm:px-6 lg:px-8` padronizado.
4. **Grids**: garantir `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` onde fizer sentido; revisar cards de Projects/Services/Cases para não estourar largura.
5. **Carrossel de Projetos**: ajustar `basis` por breakpoint, mover setas para dentro/baixo em mobile, garantir swipe touch.
6. **Header mobile**: revisar transição do menu, fechar ao navegar (já faz), aumentar área de toque dos itens.
7. **Botões flutuantes**: WhatsApp + Chatbot + ScrollToTop não podem se sobrepor. Reposicionar em mobile (empilhar verticalmente, `bottom` ajustado).
8. **Imagens**: garantir `max-w-full h-auto` e `loading="lazy"`; checar `flavio-professional-styled.png` no About.
9. **Tabelas/timeline**: Timeline vertical em mobile com marcadores menores.
10. **Formulário de Contato**: inputs `w-full`, labels acima, botão full-width em mobile.
11. **3D background do Hero**: confirmar que `dotted-surface` não trava em mobile (reduzir partículas ou desativar em `<md`).
12. **Overflow**: garantir `overflow-x-hidden` (já está em `body`) e checar elementos com `min-width` causando scroll horizontal.

## Verificação
Testar via `browser--view_preview` em 3 viewports: 375×812 (mobile), 768×1024 (tablet), 1366×768 (desktop) — em `/`, `/sobre`, `/negocios`, `/saude`.

## Fora do escopo
- Nenhuma mudança de conteúdo, copy, cores, fontes ou funcionalidade.
- Sem novos componentes; apenas ajustes de classes Tailwind e, se necessário, pequenos tweaks em `index.css`.

## Arquivos previstos para edição
`Hero.tsx`, `Verticals.tsx`, `ImpactMetrics.tsx`, `Services.tsx`, `Projects.tsx`, `AboutSummary.tsx`, `CallToAction.tsx`, `Contact.tsx`, `Footer.tsx`, `Header.tsx`, `About.tsx`, `Timeline.tsx`, `Skills.tsx`, `Negocios.tsx`, `Saude.tsx`, `Sobre.tsx`, `WhatsAppButton.tsx`, `AIChatbot.tsx`, `ScrollToTop.tsx`, `ui/dotted-surface.tsx` (condicional), `index.css` (ajustes finos).
