## Reposicionamento Nexum — Tecnologia Humanizada para Negócios e Saúde

Mudança de identidade do tema escuro/dourado atual para um **tema claro, sereno e clínico** ("Clinical Calm"), com narrativa de marca empresa (Nexum) e equilíbrio 50/50 entre Negócios e Saúde.

### 1. Nova paleta (substitui ink/gold)

Tokens HSL no `index.css` e `tailwind.config.ts`:

- `--background` branco quente `#fafbfc`
- `--surface` azul gelo `#e8f0f8`
- `--foreground` ink `#0f172a` (texto principal)
- `--muted-foreground` cinza azulado `#64748b`
- `--primary` azul sereno `#3b82f6` (CTA principal, links, foco)
- `--accent` verde menta/teal `#5cbdb9` (saúde, sucesso, métricas)
- `--border` hairline `#e2e8f0`
- Remover `--ink`, `--gold` (ou redirecioná-los para os novos tokens via alias para não quebrar componentes existentes)

Tipografia: manter **Cormorant Garamond** para H1/H2 (humano, editorial) + **Inter** para corpo. Remover DM Mono dos labels mais visíveis — substituir por Inter uppercase tracking (menos "techy", mais consultivo). Manter cantos quase quadrados e bordas hairline (1px), mas com sombras suaves em cards-chave (estética clínica premium).

### 2. Hero reposicionado

- Eyebrow: "Nexum Tecnologia · Rio de Janeiro"
- H1: "Tecnologia humanizada para *negócios* e *saúde*." (itálico azul nas duas palavras-chave)
- Sub: "Automação inteligente, IA aplicada e gestão simples — para empresas que querem crescer e clínicas que querem cuidar melhor."
- CTAs: "Diagnóstico Gratuito" (primário azul) · "Ver Cases" (ghost)
- **4 pilares em grid abaixo** (substituem as métricas no topo): cada um com ícone outline, título curto e linha de descrição:
  1. Automação Inteligente + IA Aplicada
  2. Experiência do Paciente + Atendimento Humanizado
  3. Gestão Simples + Produtividade
  4. Treinamento de Equipes + Organização
- Métricas (50+ projetos, 87%, R$180k, 15+ anos) descem para uma faixa entre Hero e Serviços, em fundo `surface`.
- Background: gradiente sutil branco→azul gelo + grid azul muito leve (sem glow dourado).

### 3. Dupla vertical Negócios + Saúde

Nova seção **"Duas verticais, uma metodologia"** logo após o Hero, em 2 colunas:

```text
┌──────────────────────────┬──────────────────────────┐
│  NEGÓCIOS                │  SAÚDE                   │
│  (accent azul)           │  (accent teal)           │
│  Para empresas que       │  Para clínicas e         │
│  querem operar com       │  hospitais que querem    │
│  previsibilidade.        │  cuidar melhor.          │
│  • Sistemas sob medida   │  • Faturamento e glosas  │
│  • BI e dashboards       │  • Experiência paciente  │
│  • Automação RPA         │  • Indicadores clínicos  │
│  • Consultoria de dados  │  • TISS/TUSS, prontuário │
│  [Ver cases Negócios →]  │  [Ver cases Saúde →]     │
└──────────────────────────┴──────────────────────────┘
```

### 4. Serviços — manter 5 cards, refraseados em tom humano

Reescrever copy com viés humano/operacional (menos jargão técnico), mantendo a estrutura de grid hairline. Ícones outline em quadrado com borda azul (não dourada). Tags em chips arredondados suaves (não monospace).

### 5. Projetos / Cases

Separar a lista linear em duas faixas visuais: **Cases de Negócios** e **Cases de Saúde** (cada uma com 2–3 itens). Chip de vertical em cada card. KPIs em azul (negócios) ou teal (saúde).

### 6. Sobre — Nexum em destaque, Flávio como fundador

- H2: "Nexum Tecnologia"
- Sub: "Consultoria de transformação digital com DNA de saúde, fundada por Flávio Admilson em 2024."
- Bloco lateral: foto do Flávio + mini-bio "Flávio Admilson, fundador — 15+ anos entre tecnologia e gestão hospitalar."
- Manter ImpactMetrics com cores claras (números em primary).

### 7. CTA Final + Footer

- CTA final em fundo `surface` (azul gelo), título serif, botão primary azul + WhatsApp teal.
- Footer claro, com bloco "Atendemos: empresas · clínicas · hospitais".

### 8. Componentes utilitários a atualizar

- `button.tsx`: variantes `hero` (azul sólido + sombra suave), `glass` (borda azul clara), `outline` (azul). Remover dourado.
- `AIChatbot.tsx`: header azul, bolhas brancas com borda, input claro. Manter funcionalidade.
- `Header.tsx`: fundo `white/95` com blur, borda inferior hairline azul claro, CTA azul outline. Links em Inter (não mono).
- `Marquee.tsx`: faixa em fundo `surface`, dots em primary.
- `WhatsAppButton.tsx`: usar teal (`accent`) em vez de gold.
- `ImpactMetrics.tsx`: números em primary azul, label em cinza.

### 9. SEO + memória

- Atualizar `<title>` e meta description: "Nexum Tecnologia — Tecnologia humanizada para negócios e saúde · RJ".
- Atualizar memória `design/visual-identity-system` com a nova paleta clara.
- Atualizar Core memory: remover "Dark editorial" → "Light Clinical Calm theme: white #fafbfc base, blue #3b82f6 primary, teal #5cbdb9 accent".
- Atualizar `brand-identity-and-value-proposition` com novo posicionamento dual.

### Arquivos afetados

`src/index.css`, `tailwind.config.ts`, `index.html`, `Header.tsx`, `Hero.tsx`, `Services.tsx`, `Projects.tsx`, `AboutSummary.tsx`, `CallToAction.tsx`, `Contact.tsx`, `Footer.tsx`, `AIChatbot.tsx`, `Marquee.tsx`, `WhatsAppButton.tsx`, `ImpactMetrics.tsx`, `ui/button.tsx`, `pages/Index.tsx`, `pages/Sobre.tsx`. Novo: `Verticals.tsx` (seção dupla Negócios/Saúde).

### Fora de escopo

- Manter `Testimonials`/`SuccessCases` ocultos.
- Não adicionar quiz nem blog.
- Manter chatbot Nexum IA (só re-skin claro).
- Manter CV download e WhatsApp.