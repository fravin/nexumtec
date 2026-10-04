# Teste automatizado de SEO por rota

## Objetivo
Adicionar um teste de navegador que visite `/`, `/sobre`, `/saude` e `/negocios` e impeça regressões nas tags SEO geradas após a navegação.

## Implementação
1. Adicionar Playwright como dependência de desenvolvimento e um comando dedicado para executar os testes SEO.
2. Criar a configuração do Playwright para iniciar/reutilizar o site local e executar o teste em Chromium.
3. Criar uma tabela de expectativas por rota contendo o `document.title`, a URL canonical e a quantidade esperada de blocos `script[type="application/ld+json"][data-seo="route"]`.
4. Para cada rota, aguardar a atualização do `head` e validar:
   - título exato;
   - um único canonical com a URL pública correta da página;
   - JSON-LD de rota conforme a configuração atual: dois blocos em `/saude` e `/negocios`; nenhum bloco marcado em `/` e `/sobre`, que hoje usam somente o JSON-LD global do HTML.
5. Validar também uma navegação sequencial no mesmo navegador para confirmar que os blocos de uma página são removidos antes dos blocos da próxima, evitando metadados duplicados ou residuais.
6. Executar o novo teste e conferir o resultado do build automático.

## Arquivos previstos
- `package.json` e arquivo de lock: dependência e comando de teste.
- `playwright.config.ts`: configuração do navegador e do site local.
- `tests/seo-routes.spec.ts`: verificações das quatro páginas.
- `AGENTS.md`: regra arquitetural curta registrando que o SEO por rota possui cobertura E2E.

## Fora de escopo
- Alterar textos, títulos, canonical ou dados estruturados atuais.
- Adicionar JSON-LD novo a `/` ou `/sobre`.
