

## Plano: Reestruturar Home com Foco em Serviços + Nova Página "Sobre"

### Objetivo
- **Home (`/`)**: foco comercial. Cliente entra e ja ve os servicos disponiveis (sites, sistemas sob medida, automacao WhatsApp, melhoria de processos, etc.).
- **Nova pagina (`/sobre`)**: jornada completa, timeline, filosofia e impacto.
- **Card principal da home**: virar um resumo curto com link "Conheca minha jornada".

---

### Parte 1: Nova pagina `/sobre`

**Arquivo novo:** `src/pages/Sobre.tsx`

Estrutura:
- `<Header />` (mesmo header do site)
- **Hero compacto** da pagina: titulo "Minha Jornada" + subtitulo curto
- Conteudo completo movido da home:
  - Conteudo atual de `<About />` (foto + 5 cards de historia + ImpactMetrics + filosofia "Por Que Me Contratar?")
  - `<Timeline />` completo
- **CTA final**: "Vamos transformar sua empresa?" -> botao volta para `/#servicos` e `/#contato`
- `<Footer />`, `<WhatsAppButton />`, `<ScrollToTop />`

**Roteamento (`src/App.tsx`):**
```tsx
<Route path="/sobre" element={<Sobre />} />
```

---

### Parte 2: Reformular Home (`src/pages/Index.tsx`)

**Nova ordem das secoes (foco comercial):**

```
1. Header
2. Hero (CTA principal -> Servicos)
3. Services EXPANDIDO (5+ servicos em destaque)  <- NOVO foco
4. Projects (carrossel ja existente)
5. AboutSummary (NOVO - resumo curto + link "/sobre")
6. CallToAction
7. Contact
8. Footer
```

**Removidos da home:**
- `<About />` completo (vai para /sobre)
- `<Timeline />` completo (vai para /sobre)
- `<Skills />` (mantido apenas em /sobre? — ver questao abaixo)

---

### Parte 3: Expandir `Services.tsx` com 5+ servicos comerciais

Substituir os 2 servicos atuais (com sub-cards de oferta) por **5 cards de servicos diretos**, formato grid 2-3 colunas, cada um com icone, titulo, descricao curta e CTA "Solicitar orcamento":

| # | Servico | Icone | Descricao curta |
|---|---------|-------|-----------------|
| 1 | **Criacao de Sites** | `Globe` | Sites profissionais, responsivos e otimizados para conversao. Landing pages, institucionais e e-commerce. |
| 2 | **Sistemas Sob Medida** | `Code2` | Aplicacoes web personalizadas para gestao, faturamento, controle de estoque e fluxos especificos da sua empresa. |
| 3 | **Automacao de WhatsApp** | `MessageCircle` | Chatbots inteligentes, atendimento 24/7, agendamentos e disparos automatizados integrados ao seu CRM. |
| 4 | **Melhoria de Processos** | `Workflow` | Diagnostico, mapeamento e otimizacao de fluxos operacionais. Reducao de retrabalho e ganho de produtividade. |
| 5 | **Analise de Dados & BI** | `BarChart3` | Dashboards personalizados, relatorios estrategicos e KPIs em tempo real para decisoes baseadas em dados. |
| 6 | **Integracao com IA** | `Brain` | Implementacao de IA generativa, chatbots, assistentes virtuais e automacoes inteligentes em seus sistemas. |

**Layout:**
- Grid: `grid md:grid-cols-2 lg:grid-cols-3 gap-6`
- Cada card: icone com gradiente, titulo, descricao, badge de tecnologias/area, botao "Solicitar orcamento" (rola para `#contato`)
- Header da secao: "Nossos Servicos" + subtitulo "Solucoes completas em tecnologia para sua empresa crescer"

Servicos ficam **logo apos o Hero** — primeira coisa que o visitante ve.

---

### Parte 4: Novo componente `AboutSummary.tsx` na home

**Arquivo novo:** `src/components/AboutSummary.tsx`

Bloco enxuto (1 secao curta, ~py-12):
- Foto pequena (a esquerda, redonda, ~200px)
- A direita: 
  - Titulo: "Quem esta por tras da Nexum"
  - Paragrafo unico: "Mais de 15 anos transformando processos no setor de saude. Da feira livre a Analise de Dados, minha jornada uniu visao de negocio com tecnologia para entregar resultados reais."
  - 3 mini-stats inline: `15+ anos` · `20+ projetos` · `100% foco em ROI`
  - Botao: **"Conheca minha jornada completa →"** -> `Link to="/sobre"`

---

### Parte 5: Atualizar Header (`src/components/Header.tsx`)

Atualizar `navItems`:
```tsx
const navItems = [
  { label: "Início", href: "/#inicio" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Sobre", href: "/sobre", isRoute: true },  // novo - rota
  { label: "Contato", href: "/#contato" },
];
```

`scrollToSection` precisa diferenciar:
- Se `isRoute` -> usa `navigate("/sobre")` do react-router
- Se ancora na home atual -> rola
- Se ancora vindo de `/sobre` -> `navigate("/")` e depois rola

Remover item "Cases de Sucesso" (ja oculto).

---

### Parte 6: Ajuste no Hero

CTA principal do Hero muda foco:
- Botao primario: **"Ver Servicos"** -> rola para `#servicos` (ao inves de "Fale Comigo")
- Botao secundario mantem "Fale Comigo"
- Indicador de scroll aponta para `#servicos` (nao mais `#sobre`)

---

### Resumo de alteracoes

| Arquivo | Tipo | Acao |
|---------|------|------|
| `src/pages/Sobre.tsx` | NOVO | Pagina completa: About + Timeline + Skills |
| `src/components/AboutSummary.tsx` | NOVO | Resumo curto na home com link para /sobre |
| `src/App.tsx` | EDITAR | Adicionar rota `/sobre` |
| `src/pages/Index.tsx` | EDITAR | Remover About/Timeline, adicionar AboutSummary, reordenar |
| `src/components/Services.tsx` | EDITAR | 6 servicos comerciais em grid (sites, sistemas, WhatsApp, processos, BI, IA) |
| `src/components/Header.tsx` | EDITAR | Nav com rota `/sobre`, ajustar scrollToSection cross-page |
| `src/components/Hero.tsx` | EDITAR | CTA primario aponta para `#servicos` |

**Skills (`Skills.tsx`)**: por padrao vai para `/sobre` (foco tecnico, combina com a jornada). Se preferir manter na home, basta dizer.

