## Objetivo
Refinar o CASE 04 em `src/components/Projects.tsx` para eliminar qualquer leitura de "API não oficial" e explicar com clareza como funciona a conexão com a emissão centralizada de notas fiscais via NFSe Nacional.

## Arquivo a alterar
- `src/components/Projects.tsx` — apenas o objeto do CASE 04.

## Alterações

### Descrição
De:
```
Aplicação conectada à NFSe (Nota Fiscal de Serviço eletrônica) nacional para centralizar e simplificar a emissão de notas fiscais de serviço — menos passos manuais, menos retrabalho e menos erro.
```
Para:
```
Aplicação integrada à NFSe Nacional — o padrão unificado que centraliza a emissão de notas fiscais de serviço em um único ambiente. A conexão direta com esse serviço elimina o passo a passo manual no portal, reduz retrabalho e simplifica a emissão e o cancelamento de notas.
```

Isso explicita:
- O que é a NFSe Nacional (padrão unificado de emissão centralizada).
- Como a conexão funciona (integração direta com o serviço nacional, sem operar manualmente no portal).
- O ganho prático (menos passos, menos retrabalho, emissão e cancelamento simplificados).

### Stack
Trocar o chip genérico `"API NFSe"` por `"NFSe Nacional"` para reforçar a integração oficial e remover qualquer ambiguidade de "API não oficial".

De:
```
stack: ["React", "TypeScript", "API NFSe", "Node.js"]
```
Para:
```
stack: ["React", "TypeScript", "NFSe Nacional", "Node.js"]
```

### Mantidos
- Título: "Emissor de NFSe integrado à Nota Fiscal de Serviço Nacional".
- KPIs: "Com poucos cliques" / "↓Retrabalho" / "NFSe Nacional".

## Fora do escopo
- Sem mudanças visuais, layout, cores, imagens ou outros cases.
- Sem nova rota, página ou componente.

## Verificação
- Conferir no preview o card do CASE 04: descrição legível, chips alinhados e nenhum texto remanescente sugerindo "API oficial" ou "API não oficial".
