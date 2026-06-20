## Objetivo
Ajustar o texto do CASE 04 na seção de projetos para refletir a integração com a NFSe Nacional e a simplificação da emissão de notas fiscais.

## Arquivo a alterar
- `src/components/Projects.tsx` — objeto do CASE 04.

## Alterações exatas

### Título
De:
```
Emissor de NFSe integrado à API da prefeitura
```
Para:
```
Emissor de NFSe integrado à Nota Fiscal de Serviço Nacional
```

### Descrição
De:
```
Aplicação conectada à API oficial de NFSe que simplifica a emissão de notas fiscais de serviço — fim do passo a passo manual no portal, menos retrabalho e menos erro.
```
Para redação que deixe claro:
- A conexão é com a NFSe (Nota Fiscal de Serviço eletrônica) nacional.
- O serviço está centralizado para emissão de notas.
- A ferramenta simplifica o trabalho de emissão de notas fiscais.

Sugestão:
```
Aplicação conectada à NFSe (Nota Fiscal de Serviço eletrônica) nacional para centralizar e simplificar a emissão de notas fiscais de serviço — menos passos manuais, menos retrabalho e menos erro.
```

### KPIs
De:
```
{ value: "1 clique", label: "Emissão de NFSe" }
{ value: "API oficial", label: "Integração direta" }
```
Para:
```
{ value: "Com poucos cliques", label: "Emissão de NFSe" }
{ value: "NFSe Nacional", label: "Integração direta" }
```

Manter:
```
{ value: "↓Retrabalho", label: "Emissão e cancelamento" }
```

### Stack
Manter inalterada:
```
stack: ["React", "TypeScript", "API NFSe", "Node.js"]
```

## Fora do escopo
- Sem mudanças visuais, layout, cores, imagens ou outros cases.
- Sem alteração de página, rota ou componente novo.

## Verificação
- Revisar o card no preview para confirmar quebra de linha e legibilidade dos KPIs atualizados.
