## Plano: Atualizar identidade do site para Nexum Tecnologia

### Objetivo
Reposicionar o site como empresa (Nexum Tecnologia), não como perfil pessoal.

### Alterações

**1. `index.html` — metadados SEO**
- `<title>`: "Nexum Tecnologia | Automação, BI e Inteligência Artificial para Empresas — Rio de Janeiro"
- `<meta name="description">`: "A Nexum Tecnologia transforma processos manuais em operações inteligentes. Automação, Business Intelligence, IA e Desenvolvimento de Sistemas para empresas que querem crescer com eficiência. Rio de Janeiro."
- `<meta name="author">`: "Nexum Tecnologia"
- `<meta name="keywords">`: "automação empresarial, business intelligence, power bi, inteligência artificial, desenvolvimento de sistemas, agência de tecnologia, transformação digital, automação saúde, rio de janeiro"
- `<meta property="og:title">`: "Nexum Tecnologia | Transformação Digital Estratégica"
- `<meta property="og:description">`: "Automação empresarial, Power BI, Inteligência Artificial e Desenvolvimento de Sistemas. A Nexum resolve o que trava a operação da sua empresa."
- `<meta name="apple-mobile-web-app-title">`: "Nexum Tecnologia"
- Atualizar também `<meta name="twitter:title">` e `<meta name="twitter:description">` com os mesmos valores do OG para manter consistência nas prévias sociais.

**2. `src/components/Header.tsx` — logo/navbar**
- Verificado: já exibe "Nexum Tecnologia" (linha do `<span>` ao lado do logo). Nenhuma alteração necessária; apenas confirmar.

### Arquivos alterados
| Arquivo | Alteração |
|---|---|
| `index.html` | Atualizar title, description, keywords, author, OG e Twitter tags |
| `src/components/Header.tsx` | Sem alteração (já correto) |
