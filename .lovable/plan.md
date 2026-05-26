## Proposta: Reposicionamento visual premium da Nexum Tecnologia

O HTML de referência define uma identidade muito diferente do site atual:
- **Atual:** tema claro, gradiente azul-roxo, sans-serif, glass effects, layout cards arredondados.
- **Referência:** tema escuro editorial (ink #080810), acento **dourado #c9a96e**, **Cormorant Garamond** (serif itálico) nos títulos, **Cabinet Grotesk** no corpo, **DM Mono** em labels, grid linear, bordas retas, animações sutis.

> ⚠️ Conflito com a memória do projeto ("Light theme default. Blue-purple gradient"). Esta proposta substitui essa diretriz — confirme se deseja seguir com a virada para escuro/dourado antes de implementar.

### O que muda

**1. Design System (`index.css` + `tailwind.config.ts`)**
- Novos tokens HSL: `--ink`, `--ink-2`, `--gold`, `--gold-light`, `--text`, `--muted`, `--line`, `--cyan-accent`.
- Fontes Google: Cormorant Garamond, Cabinet Grotesk, DM Mono.
- Classes utilitárias: `.serif-display`, `.mono-label`, `.gold-text`, `.section-label` (com traço dourado), bordas finas em vez de radius.
- Atualizar variantes do `Button` (`hero` = dourado sólido, `glass` = ghost com borda).

**2. Header**
- Fundo `ink/95` com blur, borda inferior fina.
- Logo "Nexum *Tecnologia*" (Tecnologia em itálico dourado, serif).
- Links em DM Mono uppercase tracking alto, hover dourado.
- CTA principal: botão outline dourado "Falar conosco".

**3. Hero**
- Remover imagem `tech-hero-bg.jpg`. Fundo ink com **grid dourado sutil** + **glow radial** central.
- Eyebrow em DM Mono entre traços: "— Agência de Transformação Digital · Rio de Janeiro —".
- H1 serif gigante centralizado: "Tecnologia que *escala* o seu negócio." (itálico dourado em "escala").
- Subtítulo curto em muted.
- CTAs: dourado sólido + ghost ("Diagnóstico Gratuito →" / "Ver Cases Reais").
- 4 métricas em linha com numeral serif dourado + label mono: 50+ projetos · 87% redução · R$180k glosas · 15+ anos.

**4. Marquee de competências**
- Faixa horizontal infinita entre seções (Desenvolvimento · BI · IA · Automação · ML · Saúde · Power BI · Consultoria).

**5. Serviços**
- Label "— O QUE FAZEMOS", h2 "Soluções que geram *eficiência real*".
- Grid 2 colunas com **bordas hairline** (sem gap, sem radius), numeração "01 ——", ícone em quadrado com borda dourada, tags mono.

**6. Cases / Projetos**
- Substituir carousel atual por **lista linear de cases** (linha por case): coluna esquerda com narrativa, coluna direita com 3 KPIs serif dourados + chips de stack.

**7. Sobre (strip)**
- Layout 2 colunas: esquerda com narrativa "Da feira livre à *ciência de dados*" + blockquote serif itálico com barra dourada; direita com cards de credenciais (formação, anos em saúde, localização, projetos entregues).

**8. Chatbot IA**
- Manter funcionalidade existente (Nexum IA), redesenhar UI: janela com borda hairline, topbar com avatar dourado, status "Online agora", bolhas escuras com borda fina, input + botão dourado.

**9. CTA Final**
- Bloco full-width, ink puro, glow dourado inferior. Título serif "Pronto para transformar sua operação *com dados e IA?*", 3 botões (WhatsApp dourado, Email ghost, LinkedIn ghost), linha de contato em mono.

**10. Footer**
- Minimal: logo + links mono uppercase + copyright.

### O que NÃO entra (respeitando memórias)
- **Sem** seção "Cases de Sucesso/Testimonials" como blocos separados (mantido como ocultos).
- **Sem** quiz interativo nem seção de Blog do HTML de referência (não existem no projeto e expandem escopo — posso adicionar em fase 2 se desejar).
- **Sem** cursor custom (`cursor: none` quebra UX mobile/acessibilidade).
- Mantém: AIChatbot (Lovable AI), formulário de contato, página /sobre, download de CV, WhatsApp button, métricas animadas.

### Estrutura técnica
- Edita: `index.css`, `tailwind.config.ts`, `index.html` (fonts), `Header.tsx`, `Hero.tsx`, `Services.tsx`, `Projects.tsx`, `About.tsx`/`AboutSummary.tsx`, `CallToAction.tsx`, `Contact.tsx`, `Footer.tsx`, `AIChatbot.tsx`, `button.tsx` (variantes).
- Adiciona: `Marquee.tsx` (componente novo).
- Remove referências ao `tech-hero-bg.jpg`.
- Atualiza memória de identidade visual para refletir nova paleta dark/dourada.

### Perguntas antes de implementar
1. Confirma a virada completa para **tema escuro dourado** (abandona azul/roxo claro atual)?
2. Quer que eu inclua o **quiz de diagnóstico** e a **seção de Blog** do HTML de referência, ou deixo fora desta fase?
3. Manter o **chatbot Nexum IA** já existente (só redesenhar UI) — confirma?
