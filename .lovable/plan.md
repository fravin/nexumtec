## Objetivo
Atualizar a `description` e `og:description` globais em `index.html` para destacar NFSe Nacional + automação, mantendo coerência com o CASE 04 e com o restante do portfólio. Também alinhar o nó `Service` do JSON-LD para citar a integração NFSe Nacional como serviço ofertado.

## Arquivo a alterar
- `index.html` — apenas tags de head e JSON-LD `Service`. Nenhum componente React é tocado.

## Mudanças

### 1. `<meta name="description">` e `<meta property="og:description">` / `twitter:description`
De:
```
🚀 Tecnologia que transforma gestão em resultados · 🧠 Sistemas • Dados • IA • Automação para empresas e clínicas.
```
Para:
```
Tecnologia que simplifica gestão: emissão de NFSe integrada à Nota Fiscal de Serviço Nacional, automação, IA, BI e sistemas sob medida para negócios e clínicas.
```
- `<meta name="description">` recebe a nova frase (≤160 chars).
- `og:description` e `twitter:description` espelham o mesmo texto, para o card de compartilhamento ficar consistente.

### 2. JSON-LD — nó `Service`
Acrescentar "Integração com NFSe Nacional" ao array `serviceType`, sem alterar os demais itens:
```
"serviceType": [
  "Automação empresarial",
  "Business Intelligence",
  "Inteligência Artificial aplicada",
  "Desenvolvimento de sistemas",
  "Integração com NFSe Nacional",
  "Gestão hospitalar e de clínicas"
]
```
E ajustar o campo `name` desse nó para incluir o serviço:
```
"name": "Automação inteligente, IA aplicada, BI, Desenvolvimento de Sistemas e Integração NFSe Nacional"
```

### 3. CASE 04 (referência, sem mudança de código)
O texto do card em `src/components/Projects.tsx` já reflete a mensagem nova (NFSe Nacional, conexão direta, menos retrabalho). Apenas confirmamos que o vocabulário do `og:description` e do JSON-LD passa a usar os mesmos termos: **NFSe Nacional**, **emissão simplificada**, **automação**.

## Mantidos
- `<title>`, `og:title`, `twitter:title` continuam institucionais (Nexum Tecnologia | Tecnologia para saúde e negócios) — o site não é uma landing de CASE 04.
- `og:image`, canonical, Organization e WebSite no JSON-LD permanecem inalterados.
- Nenhuma rota nova, nenhum Helmet adicional.

## Verificação
- Conferir `index.html` renderizado: `description`, `og:description` e `twitter:description` com o novo texto e ≤160 chars.
- Validar JSON-LD em https://search.google.com/test/rich-results.
- Avisar o usuário: LinkedIn, WhatsApp, Slack e Facebook cacheiam o card antigo; é preciso forçar refresh nos debuggers de preview (LinkedIn Post Inspector, Facebook Sharing Debugger) para o card novo aparecer imediatamente.

## Fora do escopo
- Não criar rota dedicada ao CASE 04.
- Não alterar `og:image`, layout, componentes ou outros cases.
