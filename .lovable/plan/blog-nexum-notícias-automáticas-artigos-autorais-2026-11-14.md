# Blog Nexum: notícias automáticas + artigos autorais

## O que você terá
- **Página pública `/blog`** com lista de posts, filtros por tema (Tecnologia, IA, Saúde hospitalar privada, Artigos do Flávio) e página individual `/blog/:slug` com SEO próprio (título, descrição, schema de artigo, link no menu, rodapé e sitemap).
- **Notícias automáticas a cada 3 dias**: 3 rascunhos por rodada, um por tema, escritos pela IA a partir dos assuntos mais comentados no momento, sempre citando as fontes originais.
- **Nada publica sozinho**: os rascunhos chegam no seu e-mail (com texto do post + sugestão de legenda e hashtags para Instagram) e ficam no painel aguardando aprovação.
- **Painel `/gerenciar-blog`** (mesmo login protegido de hoje): editar, aprovar/publicar, despublicar, excluir, enviar imagem de capa e escrever seus próprios artigos (o que está estudando, como ajuda empresas).

## Como funciona a automação
```text
a cada 3 dias -> busca notícias recentes (web) por tema
             -> IA resume em português com fontes + legenda Instagram
             -> salva como rascunho -> e-mail para você
você revisa no painel -> Publicar -> aparece no /blog
```

## Detalhes técnicos
- Tabela `blog_posts` (title, slug único, excerpt, content markdown, topic, kind auto|autoral, status draft|published, cover_url, sources jsonb, instagram_caption, published_at, timestamps). RLS: público lê só publicados; admin (has_role) faz tudo. GRANTs conforme regra.
- Capas em armazenamento privado com o mesmo padrão já usado na vitrine de modelos.
- Função de backend `generate-blog-drafts`: busca de notícias via conector de pesquisa web (Firecrawl/Perplexity — será pedido para conectar), redação com Lovable AI (`openai/gpt-6-astra`), trava de execução única, limite de 3 posts por rodada, deduplicação por URL da fonte, pausa em erro de crédito.
- Agendamento a cada 3 dias (1 execução a cada 3 dias, custo mínimo).
- E-mail de rascunho reaproveita o envio atual (chega no Gmail flavio.de.souza10@gmail.com até o domínio ser verificado).
- Renderização de markdown nos posts; registro da decisão em AGENTS.md.

## Pontos de atenção
- Textos de notícia serão resumos próprios com link para a fonte (sem copiar matérias).
- Imagens de capa automáticas: inicialmente sem imagem (capa padrão por tema); você pode enviar a sua no painel.
