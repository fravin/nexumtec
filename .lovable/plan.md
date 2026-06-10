## Objetivo

Criar uma nova página `/saude` acessada pelo botão "Ver cases de saúde", explicando em linguagem simples e direta para médicos e administradores da área da saúde como a Nexum Tecnologia pode colaborar com melhorias na rotina de clínicas e hospitais.

## Mudanças

### 1. Roteamento
- `src/App.tsx`: adicionar rota `/saude` → componente `Saude`.
- `src/components/Verticals.tsx`: no card "Saúde", trocar o `onClick` que faz scroll para `#projetos` por `<Link to="/saude">` (mantendo o card "Negócios" como está, fazendo scroll para `#projetos`).

### 2. Nova página `src/pages/Saude.tsx`

Seguindo a identidade visual atual (Clinical Calm, tipografia Cormorant + Inter, hairline grids, botões `hero`/`glass`, paddings `py-24 md:py-32`, tokens semânticos), com SEO completo via `react-helmet-async` (title, description, canonical `https://www.nexumtec.com.br/saude`, OG, JSON-LD `MedicalBusiness` + `Service`).

Estrutura de seções:

1. **Header reutilizado** (`<Header />`) + `<main>` landmark.
2. **Hero da página**
   - Eyebrow "Saúde · Tecnologia humanizada para quem cuida"
   - H1: "Sua clínica funcionando melhor — para a equipe e para o paciente"
   - Subtítulo curto explicando em linguagem simples: menos planilha, menos glosa, mais tempo para cuidar.
   - CTA primário "Diagnóstico gratuito" (link para `/#contato`) + CTA secundário "WhatsApp direto".
3. **"Eu entendo a sua rotina"** — bloco de credibilidade humanizado
   - 15+ anos dentro do hospital (faturamento, glosas, recepção, estoque) + formação em Sistemas + pós em Ciência de Dados.
   - Tom: "Não sou só TI. Já vivi a recepção lotada, o convênio glosando e o estoque que some."
4. **Como posso colaborar** — 4 cards em grid hairline, linguagem simples:
   - **Faturamento sem dor de cabeça** — TISS/TUSS, conferência de guias, fechamento mais rápido.
   - **Glosas que viram receita** — auditoria, recurso e indicadores para parar de perder dinheiro.
   - **Agenda, prontuário e paciente** — sistema único, prontuário eletrônico exportável, lembretes.
   - **Estoque e compras sob controle** — fim das planilhas, validade, ponto de pedido, rastreabilidade.
5. **O que muda na prática** — lista de "antes / depois" em duas colunas, explicando em frases curtas:
   - Antes: planilha que ninguém atualiza → Depois: painel atualizado em tempo real.
   - Antes: glosa descoberta no fim do mês → Depois: alerta no momento do lançamento.
   - Antes: prontuário em papel → Depois: prontuário digital exportável em PDF.
   - Antes: estoque vencendo → Depois: alerta de validade e ponto de pedido.
6. **Para quem é** — três perfis em cards:
   - Clínicas pequenas e médias que querem profissionalizar a gestão.
   - Consultórios que ainda dependem de planilhas.
   - Hospitais que precisam de indicadores e auditoria de glosas.
7. **Cases de saúde já entregues** — destaque resumido (sem duplicar Projects) com 2-3 cases relevantes (Faturamento/Glosas R$34k+, Análise Preditiva R$77,5M, Clínica de Fisioterapia) e link "Ver todos os cases" para `/#projetos`.
8. **Como trabalhamos juntos** — passo a passo em 4 etapas:
   1. Conversa de diagnóstico (gratuita)
   2. Mapeamento da rotina e dos gargalos
   3. Implementação com a equipe (não só software)
   4. Acompanhamento e ajustes
9. **Perguntas frequentes (FAQ)** — accordion curto:
   - "Preciso trocar meu sistema atual?"
   - "Funciona para clínica pequena?"
   - "Atende LGPD?"
   - "Como é a cobrança?"
   - "Em quanto tempo vejo resultado?"
   - JSON-LD `FAQPage` correspondente para SEO.
10. **CTA final** — bloco com fundo `bg-secondary`, frase de fechamento humanizada e botões "Agendar diagnóstico gratuito" + WhatsApp.
11. **Footer reutilizado** (`<Footer />`), `<WhatsAppButton />`, `<AIChatbot />`, `<ScrollToTop />`.

### 3. Detalhes técnicos
- Reaproveitar `AnimatedSection` para scroll animations.
- Reaproveitar tokens (`primary`, `accent`, `border`, `secondary`, `foreground`, `muted-foreground`) — sem cores hardcoded.
- Usar `Stethoscope`, `HeartPulse`, `Activity`, `ClipboardList`, `Pill`, `Users`, `ShieldCheck` do `lucide-react` nos cards.
- Mobile-first: grids `grid-cols-1 md:grid-cols-2`, botões `w-full sm:w-auto`, headings com `leading-tight` em mobile.
- Atualizar `public/sitemap.xml` adicionando `/saude`.

### 4. Linguagem
Tom direto, sem jargão técnico de TI. Frases curtas. Falando "você" para o médico/gestor. Foco em benefício prático: tempo, dinheiro, tranquilidade, experiência do paciente. Evitar termos como "stack", "deploy", "API" no corpo da página.

## Arquivos
- **Criar**: `src/pages/Saude.tsx`
- **Editar**: `src/App.tsx`, `src/components/Verticals.tsx`, `public/sitemap.xml`
