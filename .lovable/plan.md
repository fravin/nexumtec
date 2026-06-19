## Objetivo
Atualizar o card de pré-visualização exibido quando o link `nexumtec.com.br` é compartilhado (WhatsApp, LinkedIn, Slack, Facebook), substituindo o logo/imagem antigos por uma nova imagem social e ajustando título e descrição.

## O que será alterado

**Arquivo:** `index.html`

1. **Título (og:title / twitter:title)** — manter "Nexum Tecnologia | Tecnologia para saúde e negócios" (usuário não pediu alteração).
2. **Descrição (og:description / twitter:description / meta description)** — atualizar para a versão fornecida pelo usuário:
   > 🚀 Tecnologia que transforma gestão em resultados · 🧠 Sistemas • Dados • IA • Automação
3. **og:image / twitter:image** — substituir a URL antiga (`social-1762007678906-logoNexumTec.png`) por uma nova imagem de card social que será gerada.

## Nova imagem de card social

- **Formato:** 1200×630 px (proporção 1.91:1 — padrão Open Graph/WhatsApp)
- **Conteúdo visual:**
  - Fundo escuro elegante com gradiente azul → teal alinhado à identidade Clinical Calm (#0f172a → #3b82f6 → #5cbdb9)
  - Logo da Nexum Tecnologia em destaque à esquerda
  - Título "Nexum Tecnologia" em serifa (Cormorant Garamond) à direita
  - Subtítulo: "Tecnologia humanizada para negócios e saúde"
  - Tagline inferior: "Sistemas • Dados • IA • Automação"
  - Pequeno acento gráfico (linha/hairline) reforçando a marca
- **Geração:** ferramenta `imagegen` em qualidade `premium` (legibilidade de texto)
- **Hospedagem:** salva em `src/assets/og-nexum-social.jpg` e publicada via `lovable-assets` para obter URL CDN absoluta utilizável em metatags

## Aviso importante ao usuário

O WhatsApp (e outras plataformas) faz **cache agressivo** dos cards. Mesmo após a publicação:
- O card antigo pode continuar aparecendo por horas/dias.
- Para forçar atualização imediata: usar o **Facebook Sharing Debugger** (https://developers.facebook.com/tools/debug/) colando a URL e clicando em "Scrape Again". O WhatsApp herda esse cache em muitos casos.
- Em alguns chats do WhatsApp, basta apagar mensagens antigas com o link e reenviar.

## Fora do escopo
- Sem mudanças de copy/conteúdo nas páginas do site.
- Sem mudanças nas tags por rota (Helmet em `/sobre`, `/negocios`, `/saude`) — mantidas como estão.
- Sem alteração no favicon.
