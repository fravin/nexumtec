## Objetivo

Criar uma nova página `/negocios` acessada pelo botão "Ver cases de negócios" do componente `Verticals`, com linguagem direta para empresários e gestores de qualquer nicho (não só saúde), destacando automações de WhatsApp, e-mail, processos repetitivos, sistemas sob medida e BI.

## Mudanças

### 1. Roteamento e navegação
- `src/App.tsx`: adicionar rota `/negocios` → componente `Negocios`.
- `src/components/Verticals.tsx`: trocar o card "Negócios" para usar `<Link to="/negocios">` em vez de scroll para `#projetos` (espelhando o que já foi feito no card "Saúde").

### 2. Nova página `src/pages/Negocios.tsx`

Mesma identidade visual da página `/saude` (Clinical Calm, Cormorant + Inter, hairline grids, tokens semânticos, `py-24 md:py-32`, `AnimatedSection`), SEO completo via `react-helmet-async` (title, description, canonical `https://www.nexumtec.com.br/negocios`, OG, JSON-LD `ProfessionalService` + `FAQPage`).

Estrutura:

1. **Header** + `<main>`.
2. **Hero**
   - Eyebrow "Negócios · Tecnologia que faz a operação girar sozinha"
   - H1: "Menos planilha, menos repetição — mais tempo para crescer o negócio"
   - Subtítulo: automações, sistemas e dashboards para qualquer nicho que ainda depende de trabalho manual.
   - CTAs: "Diagnóstico gratuito" (→ `/#contato`) + WhatsApp.
3. **"Eu entendo o seu dia a dia"** — bloco de credibilidade
   - 13+ anos resolvendo gargalos de operação dentro de empresas; foco em problema do cliente, não em tecnologia.
4. **Como posso colaborar** — grid de 6 cards (icons `MessageCircle`, `Mail`, `Workflow`, `BarChart3`, `Database`, `Bot`):
   - **Automação de WhatsApp** — atendimento, follow-up, cobrança, agendamento e respostas com IA.
   - **Automação de e-mail** — disparos, segmentação, respostas automáticas e fluxos de nutrição.
   - **Processos repetitivos (RPA + IA)** — robôs que copiam, colam, conferem, geram relatórios e cadastram.
   - **Dashboards e Power BI** — visão única de vendas, financeiro, operação e marketing.
   - **Sistemas web sob medida** — CRM, ERP leve, portais internos, áreas do cliente.
   - **IA aplicada ao negócio** — chatbots, classificação de leads, análise de documentos, atendimento.
5. **Para quem é** — 4 perfis em cards (linguagem por nicho, sem prometer setor exclusivo):
   - Comércio e varejo
   - Serviços e consultoria
   - Indústria e logística
   - Educação, jurídico e imobiliário
6. **O que muda na prática** — antes/depois em duas colunas:
   - Atendimento WhatsApp manual → bot 24/7 com handoff humano.
   - Disparo de e-mail um a um → fluxo automático com segmentação.
   - Planilha consolidada na mão → dashboard em tempo real.
   - Cadastro repetitivo em sistema → robô que executa em segundos.
   - Relatórios montados no fim do mês → indicadores ao vivo.
7. **Cases já entregues** — resumo com 2-3 cases de negócios (Análise Preditiva R$77,5M, Estoque substituindo Excel, Faturamento/Glosas como prova de sistemas complexos) + link "Ver todos os cases" para `/#projetos`.
8. **Como trabalhamos juntos** — 4 etapas: diagnóstico gratuito, mapeamento, implementação com a equipe, acompanhamento.
9. **FAQ** (accordion + JSON-LD `FAQPage`):
   - "Atende empresa pequena?"
   - "Funciona se eu já uso outros sistemas?"
   - "WhatsApp oficial ou não oficial?"
   - "Quanto tempo leva uma automação?"
   - "Como é a cobrança?"
10. **CTA final** com fundo `bg-secondary` e botões "Agendar diagnóstico gratuito" + WhatsApp.
11. **Footer** + `WhatsAppButton` + `AIChatbot` + `ScrollToTop`.

### 3. SEO
- Atualizar `public/sitemap.xml` adicionando `/negocios` com `priority 0.9`.

### 4. Linguagem
Direta, "você", sem jargão (evitar "stack", "deploy", "API" no corpo). Foco em tempo economizado, dinheiro recuperado e equipe menos sobrecarregada.

## Arquivos
- **Criar**: `src/pages/Negocios.tsx`
- **Editar**: `src/App.tsx`, `src/components/Verticals.tsx`, `public/sitemap.xml`
