

## Plano: Adicionar Projeto de Faturamento e Criar Carrossel de Projetos

### Contexto

O usuario quer adicionar um novo projeto (Sistema de Gestao de Faturamento e Glosas - Centro Trauma) usando as imagens enviadas como referencia visual, sem expor dados reais. Tambem quer transformar a grade de projetos em um carrossel para facilitar a adicao futura de mais projetos.

---

### Parte 1: Copiar Imagens para o Projeto

Copiar as 6 imagens enviadas para `src/assets/` com nomes descritivos:
- `image-20.png` → `src/assets/faturamento-convenios.png`
- `image-21.png` → `src/assets/faturamento-analytics.png`
- `image-22.png` → `src/assets/faturamento-graficos.png`
- `image-23.png` → `src/assets/faturamento-recursos.png`
- `image-24.png` → `src/assets/faturamento-glosas.png`
- `image-25.png` → `src/assets/faturamento-viscossuplementacao.png`

---

### Parte 2: Adicionar Novo Projeto no Array

**Arquivo:** `src/components/Projects.tsx`

Adicionar o projeto no topo do array (projeto mais robusto):

| Campo | Valor |
|-------|-------|
| **Titulo** | Sistema de Gestao de Faturamento e Glosas |
| **Categoria** | Desenvolvimento Web |
| **Icone** | `FileBarChart` (lucide) |
| **Descricao** | Sistema web completo para gestao de faturamento de convenios, controle de glosas, analytics avancado e viscossuplementacao. Solucao sob medida desenvolvida para otimizar processos financeiros na area da saude. |
| **Tecnologias** | React, TypeScript, Supabase, PostgreSQL, Tailwind CSS, Recharts |
| **Desafio** | Processos de faturamento e controle de glosas dependiam de planilhas, gerando atrasos e perda de receita. |
| **Solucao** | Sistema completo com modulos de faturamento por convenio, analytics com KPIs, controle de recursos de glosas com status e prazos, e modulo de viscossuplementacao com graficos analiticos. |
| **Resultados** | Controle de R$ 34 mil+ em faturamento mensal, Analytics com ticket medio e evolucao temporal, Gestao de recursos de glosas com alertas de vencimento, Dashboard executivo com taxa de recuperacao, Modulo completo de viscossuplementacao com 260+ procedimentos |

**Nota importante na descricao:** Incluir texto como "Sistema desenvolvido sob medida - dados ilustrativos por questoes de confidencialidade" para deixar claro que os dados sao protegidos.

---

### Parte 3: Transformar Grid em Carrossel

**Arquivo:** `src/components/Projects.tsx`

**Substituir** o grid atual (`grid lg:grid-cols-2 xl:grid-cols-3`) por um carrossel usando o componente `Carousel` ja existente em `src/components/ui/carousel.tsx`.

**Layout do carrossel:**
- Desktop: mostrar 3 cards por vez
- Tablet: 2 cards por vez
- Mobile: 1 card por vez
- Setas de navegacao nos lados
- Indicadores de pontos (dots) na base
- Auto-play opcional com pause on hover

**Imports necessarios:**
```typescript
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
```

**Estrutura JSX:**
```tsx
<Carousel opts={{ align: "start", loop: true }}>
  <CarouselContent>
    {projects.map((project, index) => (
      <CarouselItem key={index} className="md:basis-1/2 xl:basis-1/3">
        <Card>...</Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

Tambem adicionar indicadores de pagina (dots) abaixo do carrossel para navegacao visual.

---

### Parte 4: Atualizar ProjectModal com Galeria do Novo Projeto

**Arquivo:** `src/components/ProjectModal.tsx`

Adicionar entrada no `dashboardGallery` para o novo projeto com as 6 imagens:
- Faturamento de Convenios
- Analytics de Faturamento
- Graficos de Analise
- Controle de Recursos
- Dashboard Executivo de Glosas
- Viscossuplementacao

Cada imagem tera titulo e descricao generica sem dados sensiveis.

Adicionar tambem entrada no `projectDetails` com detalhes expandidos.

---

### Parte 5: Reordenar Projetos por Relevancia

Ordem final no carrossel (mais robustos primeiro):
1. Sistema de Gestao de Faturamento e Glosas (NOVO)
2. FISIOKIM - Clinica de Fisioterapia
3. Sistema Web de Gestao de Estoque Hospitalar
4. Analise Global de Vendas (Power BI)
5. Sistema de Controle de Estoque (Excel)
6. Pesquisa de Satisfacao
7. Alinhamento Estrategico

---

### Resumo das Alteracoes

| Arquivo | Alteracao |
|---------|-----------|
| `src/assets/faturamento-*.png` | 6 novas imagens do projeto |
| `src/components/Projects.tsx` | Novo projeto + grid vira carrossel + reordenacao |
| `src/components/ProjectModal.tsx` | Galeria e detalhes do novo projeto |

