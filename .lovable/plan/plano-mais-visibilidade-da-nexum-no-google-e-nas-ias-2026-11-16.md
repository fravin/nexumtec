# Plano: mais visibilidade da Nexum no Google e nas IAs

Revisei o site publicado (www.nexumtec.com.br). Abaixo, o que encontrei e o que vou corrigir. Quando você me enviar os pontos da sua análise, eu os incluo neste mesmo plano.

## O que encontrei no site ao vivo

1. **Todas as páginas mostram o mesmo título para o Google na primeira leitura.** /saude, /negocios, /criacao-de-sites etc. chegam com "Nexum Tecnologia | Tecnologia para saúde e negócios". O título certo só aparece depois que a página carrega no navegador. O Google às vezes lê depois; o WhatsApp, o LinkedIn e boa parte dos robôs de IA não leem.
2. **Google Search Console não está conectado.** Sem ele, não sabemos o que já aparece no Google nem conseguimos enviar o mapa do site.
3. **Mapa do site incompleto:** tem 7 endereços; faltam Contato, Briefing e cada artigo do blog.
4. **Detalhes no cabeçalho:** o perfil do X/Twitter aponta para "@lovable_dev", o texto principal ainda fala de NFSe em vez do posicionamento "Tecnologia humanizada para negócios e saúde", e falta marcar a Nexum como empresa local do Rio de Janeiro (endereço de atendimento, telefone, horário).
5. **Robôs de IA (ChatGPT, Gemini, Claude, Perplexity):** podem entrar no site, mas não há uma liberação explícita para cada um, e o resumo `llms.txt` não cita o blog nem a página de contato.

## O que vou fazer

1. **Página certa já na primeira leitura:** gerar, na hora de publicar, uma versão pronta de cada página pública, com título, descrição, link de compartilhamento e dados estruturados próprios. Assim o Google, as redes sociais e as IAs veem o conteúdo correto sem depender do carregamento.
2. **Conectar o Google Search Console**, confirmar que o site é seu e enviar o mapa do site.
3. **Mapa do site automático**, incluindo Contato, Briefing e todo artigo publicado do blog, atualizado a cada publicação.
4. **Ajustar cabeçalho e dados da empresa:** novo texto principal com o posicionamento, remover "@lovable_dev", adicionar dados de empresa local no Rio de Janeiro (com WhatsApp e e-mail de contato).
5. **Abrir as portas para as IAs:** liberar nominalmente os robôs de busca das IAs e atualizar o `llms.txt` com serviços, blog e contato.
6. **Artigos do blog** com dados de artigo (autor Flávio, data, tema) para aparecerem melhor em buscas de notícias.

## Preciso de você

- Os pontos da sua análise de SEO (pode colar aqui).
- Se quiser endereço físico nos dados da empresa ou só "atende Rio de Janeiro e online".
- Aprovar a conexão com o Google Search Console quando o cartão aparecer.
- Publicar o site no final, para as mudanças chegarem ao Google.

## Detalhes técnicos

- Pré-renderização estática no build (script pós-build com Playwright/rotas fixas + posts publicados buscados no banco), gerando `dist/<rota>/index.html` com head por rota; o `Seo.tsx` atual continua atualizando o head no navegador. Alternativa mais robusta: migrar para TanStack Start (SSR), se preferir.
- `scripts/generate-sitemap.ts` em `prebuild` lendo `blog_posts` com status `published`; sem `lastmod` artificial.
- `index.html`: description alinhada ao posicionamento, remover `twitter:site`, `ProfessionalService`/`LocalBusiness` no `@graph` vinculado ao Organization.
- `robots.txt`: blocos para GPTBot, OAI-SearchBot, ChatGPT-User, Google-Extended, ClaudeBot, PerplexityBot; `Disallow` para /gerenciar-modelos e /gerenciar-blog.
- `BlogPost.tsx`: JSON-LD `BlogPosting` + `BreadcrumbList`.
- GSC: verificação META no `index.html`, publicar, verificar, adicionar propriedade e enviar sitemap.
