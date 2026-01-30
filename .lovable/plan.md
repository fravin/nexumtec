

## Plano: Melhorar Filosofia de Trabalho e Atualizar Timeline

---

### Parte 1: Filosofia de Trabalho - Foco em Entrega de Valor

**Arquivo:** `src/components/About.tsx`

**Objetivo:** Transformar a secao de filosofia para mostrar claramente o retorno de valor que empresas terao ao contratar seus servicos, mantendo caracteristicas pessoais como diferencial.

#### Titulo Atualizado

**De:** "Minha Filosofia de Trabalho"

**Para:** "Por Que Me Contratar?"

#### Novos Cards de Filosofia (4 itens)

| Card | Titulo | Descricao (foco no valor para empresa) |
|------|--------|----------------------------------------|
| 1 | **ROI Comprovado** | Cada projeto que entrego gera economia real ou aumento de receita. Meu compromisso e transformar investimento em resultados mensuraveis para o seu negocio. |
| 2 | **Solucoes que Funcionam** | Traduzo desafios complexos em solucoes praticas e faceis de manter. Menos retrabalho, mais produtividade para sua equipe. |
| 3 | **Comunicacao Clara** | Trago a energia da feira para o ambiente corporativo: transparencia, agilidade e foco no cliente. Voce sempre sabera o andamento do projeto. |
| 4 | **Aprendizado Continuo** | Estou constantemente atualizado em IA, dados e automacao. Sua empresa tera acesso as solucoes mais modernas do mercado. |

#### Icones para os Cards

Adicionar icones para reforcar visualmente cada proposta de valor:
- ROI Comprovado: `TrendingUp`
- Solucoes que Funcionam: `CheckCircle`
- Comunicacao Clara: `MessageSquare`
- Aprendizado Continuo: `Lightbulb`

---

### Parte 2: Atualizacao da Timeline

**Arquivo:** `src/components/Timeline.tsx`

#### Alteracao 1: Evento de 2012

**Linha 33-39** - Atualizar descricao e adicionar badge

**De:**
```
year: "2012",
title: "Contratação - Setor de Faturamento",
description: "Efetivado e direcionado para faturamento hospitalar. Mergulho no universo de auditoria de glosas e gestão de estoque."
```

**Para:**
```
year: "2012",
title: "Contratação - Setor de Faturamento",
description: "Efetivado e direcionado para faturamento hospitalar. Período de intensa dedicação, conciliando dois empregos (clínica e feira) com os estudos em Administração de Empresas. Mergulho no universo de auditoria de glosas e gestão de estoque.",
badges: [{ label: "2 Empregos + Estudos", color: "bg-amber-500/20 text-amber-600 border-amber-500/30" }]
```

#### Alteracao 2: Evento de 2024

**Linha 56-62** - Atualizar descricao e adicionar badge sobre mudanca de mindset

**De:**
```
year: "2024",
title: "Graduação & Analista de Tecnologia",
description: "Conclusão da graduação em Sistemas de Informação. Promoção para Analista de Tecnologia, unindo experiência de negócio com paixão por tecnologia."
```

**Para:**
```
year: "2024",
title: "Graduação & Mudança de Mindset",
description: "Conclusão da graduação em Sistemas de Informação e promoção para Analista de Tecnologia. Momento de transformação: deixei de apenas executar tarefas para pensar estrategicamente em como a tecnologia pode gerar valor real para o negócio.",
badges: [{ label: "Mudança de Mindset", color: "bg-purple-500/20 text-purple-600 border-purple-500/30" }]
```

---

### Resumo das Alteracoes

| Arquivo | Alteracao |
|---------|-----------|
| `src/components/About.tsx` | Novo titulo "Por Que Me Contratar?", 4 cards focados em valor para empresas com icones |
| `src/components/Timeline.tsx` | 2012: adicionar badge "2 Empregos + Estudos" e mencao a Administracao |
| `src/components/Timeline.tsx` | 2024: novo titulo com "Mudanca de Mindset", badge e descricao atualizada |

---

### Detalhes Tecnicos

**Imports necessarios em About.tsx:**
```typescript
import { TrendingUp, CheckCircle, MessageSquare, Lightbulb } from "lucide-react";
```

**Estrutura atualizada do philosophyItems:**
```typescript
const philosophyItems = [
  {
    icon: TrendingUp,
    title: "ROI Comprovado",
    description: "..."
  },
  // ... demais itens
];
```

**Ajuste no JSX dos cards:**
- Adicionar renderizacao do icone antes do titulo
- Manter animacoes e estilos existentes

