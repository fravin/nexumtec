## Objetivo

Adicionar 3 cases reais aos espaços de cases — sem dados financeiros inventados, focando em ganhos qualitativos descritos pelo usuário:

1. **Automação de WhatsApp com Agente de IA** — atendimento automatizado que libera o funcionário das perguntas óbvias, agiliza resposta ao cliente e elimina erro de digitação.
2. **Sistema de Finanças Pessoais** — projeto pessoal que evoluiu para separar receitas pessoais e da empresa durante a transição profissional (apresentado como case de capacidade técnica + organização, não como produto comercial).
3. **Emissor de Nota Fiscal integrado à API NFSe** — simplifica a emissão de notas fiscais, eliminando etapas manuais no portal da prefeitura.

## Mudanças

### 1. `src/components/Projects.tsx` (home `/#projetos`)

Misturar com os cases atuais. Estado final, na ordem:

```
CASE 01 — Sistema de Faturamento e Gestão de Glosas        (mantém)
CASE 02 — Análise Preditiva de Vendas — R$77,5M analisados (mantém)
CASE 03 — Automação de WhatsApp com Agente de IA           (NOVO)
CASE 04 — Emissor de NFSe integrado à API da prefeitura    (NOVO)
CASE 05 — Gestão Completa para Clínica de Fisioterapia     (mantém)
CASE 06 — Estoque Hospitalar — Excel substituído           (mantém)
```

O case "Finanças Pessoais" **não entra na home** — é um projeto pessoal e a home é vitrine comercial; ele vai apenas na página `/negocios` com enquadramento adequado.

**Novos objetos `Case`** (mesmo shape `{ num, title, description, kpis, stack }`):

- **WhatsApp + IA**
  - description: "Agente de IA no WhatsApp atende dúvidas recorrentes 24/7, qualifica leads e passa para o humano só quando precisa — liberando a equipe das perguntas óbvias e agilizando o cliente."
  - kpis: `{ "24/7", "Atendimento sem pausa" }`, `{ "0", "Erro de digitação" }`, `{ "↑Agilidade", "Resposta ao cliente" }`
  - stack: `["WhatsApp API", "OpenAI", "Node.js", "Webhooks"]`

- **NFSe**
  - description: "Aplicação conectada à API oficial de NFSe que simplifica a emissão de notas fiscais de serviço — fim do passo a passo manual no portal, menos retrabalho e menos erro."
  - kpis: `{ "1 clique", "Emissão de NFSe" }`, `{ "↓Retrabalho", "Em emissão e cancelamento" }`, `{ "API oficial", "Integração direta" }`
  - stack: `["React", "TypeScript", "API NFSe", "Node.js"]`

### 2. `src/pages/Negocios.tsx` — array `casesNegocios`

Misturar: manter "Análise Preditiva R$77,5M" + adicionar os 3 novos cases reais, removendo "Estoque substituindo Excel" e "Faturamento/Glosas" (esses já aparecem na home e são mais saúde/hospitalar; a página `/negocios` precisa de cases que reforcem automação para qualquer nicho).

Estado final (4 cards no grid — ajustar layout para `md:grid-cols-2 lg:grid-cols-2` ou manter 3 colunas com o 4º quebrando linha; vamos usar `lg:grid-cols-2` para destaque):

1. **Tag "Automação + IA"** — Atendimento WhatsApp com Agente de IA
   - kpi: "24/7 · zero erro de digitação · equipe liberada"
   - desc: "Agente de IA conectado ao WhatsApp responde dúvidas recorrentes, qualifica clientes e só envolve o humano quando precisa. A equipe deixa de gastar energia com perguntas óbvias e o cliente é atendido na hora."

2. **Tag "Integração fiscal"** — Emissão de NFSe via API
   - kpi: "Emissão em 1 clique · menos retrabalho"
   - desc: "Sistema próprio conectado à API oficial de NFSe que simplifica drasticamente a emissão de notas fiscais de serviço. Fim do passo a passo manual no portal da prefeitura."

3. **Tag "Sistema próprio · uso pessoal"** — Gestão Financeira Pessoal
   - kpi: "Pessoa física + PJ separados · controle real"
   - desc: "Sistema criado para controlar minha vida financeira pessoal e, na transição para empreendedor, evoluiu para separar receitas e despesas da empresa das pessoais. Projeto pessoal que prova a capacidade de modelar fluxos financeiros sob medida."

4. **Tag "Business Intelligence"** — Análise Preditiva R$77,5M (mantém)

### 3. SEO / JSON-LD

Sem mudanças estruturais — os cases entram como conteúdo dentro das seções existentes. `serviceJsonLd` e `faqJsonLd` permanecem.

## Linguagem

- Sem números financeiros inventados nos cases novos.
- Para o case de Finanças Pessoais deixar explícito que é "projeto pessoal" / "uso pessoal" — evita parecer que estamos vendendo um produto que não está pronto.
- Tom direto, foco em ganho de tempo e redução de erro, conforme respostas do usuário.

## Arquivos
- **Editar**: `src/components/Projects.tsx`, `src/pages/Negocios.tsx`
