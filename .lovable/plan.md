

## Plano: Suavizar Rolagem do Carrossel de Projetos

### Problema Identificado

A rolagem está travada porque:
1. O auto-play foi feito com `setInterval` manual chamando `scrollNext()`, sem sincronização com o motor de animação do Embla
2. A detecção de hover usa `document.querySelector(':hover')` que é instável e causa pulos
3. Falta configuração de duração/easing para transições suaves
4. Sem plugin oficial de autoplay, não há pausa inteligente em interação do usuário

---

### Solução

#### Parte 1: Instalar plugin oficial de autoplay

**Pacote:** `embla-carousel-autoplay` (mesma versão do embla-carousel-react já instalado: `^8.6.0`)

Esse plugin é mantido pela mesma equipe e integra nativamente com o carrossel, garantindo:
- Transições suaves coordenadas com o motor do Embla
- Pausa automática ao passar o mouse (`stopOnInteraction`, `stopOnMouseEnter`)
- Retomada automática após interação
- Sem conflito com cliques nas setas/dots

---

#### Parte 2: Refatorar `src/components/Projects.tsx`

**Remover:**
- O `useEffect` com `setInterval` manual (linhas 38-46)
- O `useCallback` import não utilizado
- A classe `projects-carousel` usada apenas para o hack do hover

**Adicionar:**
```tsx
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

// Dentro do componente:
const autoplay = useRef(
  Autoplay({ 
    delay: 5000, 
    stopOnInteraction: false,
    stopOnMouseEnter: true 
  })
);
```

**Atualizar o `<Carousel>`:**
```tsx
<Carousel 
  setApi={setApi} 
  plugins={[autoplay.current]}
  opts={{ 
    align: "start", 
    loop: true,
    duration: 25,        // duração da transição (mais suave)
    skipSnaps: false,
    dragFree: false
  }}
  className="w-full"
>
```

**Parâmetros explicados:**
- `duration: 25` — transição de ~400ms (padrão é 25, mas explicito para clareza); valores maiores = mais lento e suave
- `stopOnMouseEnter: true` — pausa automaticamente ao passar mouse (substitui o hack atual)
- `stopOnInteraction: false` — retoma autoplay após o usuário clicar nas setas

---

#### Parte 3: Melhorar listener de eventos do carrossel

**Atualizar o `useEffect` de eventos:**
```tsx
useEffect(() => {
  if (!api) return;
  setCount(api.scrollSnapList().length);
  setCurrent(api.selectedScrollSnap());
  
  const onSelect = () => setCurrent(api.selectedScrollSnap());
  api.on("select", onSelect);
  api.on("reInit", onSelect);
  
  return () => {
    api.off("select", onSelect);
    api.off("reInit", onSelect);
  };
}, [api]);
```

Isso evita memory leak e garante atualização correta dos dots ao redimensionar.

---

### Resumo das Alterações

| Arquivo | Alteração |
|---------|-----------|
| `package.json` | Adicionar `embla-carousel-autoplay@^8.6.0` |
| `src/components/Projects.tsx` | Substituir setInterval manual pelo plugin Autoplay, adicionar `duration` no opts, corrigir cleanup de listeners |

---

### Resultado Esperado

- Transições fluidas entre slides (sem travamentos)
- Pausa imediata e confiável ao passar o mouse
- Retomada suave do autoplay após o mouse sair
- Cliques nas setas e dots não conflitam mais com o autoplay
- Performance melhor (sem `querySelector` rodando a cada 5s)

