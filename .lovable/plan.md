## Objetivo
Substituir o logo antigo da Nexum Tecnologia pelo novo lockup enviado (hexágono + "NEXUM TECNOLOGIA") em todos os pontos do site.

## Assets a criar (via Lovable Assets / CDN)

1. **Lockup completo** (imagem enviada, fundo branco) → `src/assets/nexum-logo-full.png.asset.json`
   - Usada no Footer e no JSON-LD (`Organization.logo`).
2. **Símbolo isolado** (recorte só do hexágono, fundo transparente) → `src/assets/nexum-symbol.png.asset.json`
   - Gerado a partir do logo enviado via `imagegen--edit_image` (crop + remoção de fundo).
   - Usado no Header, favicon e apple-touch-icon.
3. **Favicon 512×512** PNG quadrado com o símbolo → `public/favicon.png` (sobrescreve referência atual; remover `public/favicon.ico` se existir para não conflitar).
4. **Novo card social 1200×630** com o lockup oficial em fundo gradiente Clinical Calm → substitui `src/assets/og-nexum-social.jpg.asset.json` (deleta o antigo via `assets--delete_asset` e gera o novo).

## Arquivos a editar

- **`src/components/Header.tsx`** — adiciona o `<img>` do símbolo (h-8 sm:h-9) ao lado esquerdo do texto serif "Nexum Tecnologia". Mantém comportamento atual de navegação e responsividade.
- **`src/components/Footer.tsx`** — substitui o texto serif do logo pelo lockup completo (`<img>` com `h-10 md:h-12`, alt "Nexum Tecnologia"). Mantém links e redes sociais.
- **`index.html`**:
  - `<link rel="icon">` e `<link rel="apple-touch-icon">` → apontar para o novo favicon.
  - JSON-LD `Organization.logo` → URL CDN do lockup completo.
  - `og:image` / `twitter:image` (+ width/height) → novo card social.
- **Verificação por varredura** (`rg`) para garantir que nenhuma outra referência ao logo antigo `logoNexumTec.png` ou ao Storage Google permaneça.

## Detalhes técnicos

- Geração do símbolo isolado: `imagegen--edit_image` sobre a imagem enviada com prompt "isolate only the hexagonal N symbol on the left, transparent background, square crop", `transparent_background: true`, salvo como PNG.
- Geração do card social: `imagegen--generate_image` premium, 16:9, com o novo lockup centralizado sobre gradiente `#0f172a → #3b82f6 → #5cbdb9`, tagline "Sistemas • Dados • IA • Automação".
- Card antigo (`og-nexum-social.jpg.asset.json`) será removido com `assets--delete_asset` antes de criar o novo, para manter o repositório limpo.

## Fora do escopo
- Sem mudanças em conteúdo/copy das páginas.
- Sem alterações na paleta global ou tipografia.
- Sem novas rotas ou componentes.

## Aviso
WhatsApp/LinkedIn fazem cache agressivo do card social — a nova imagem pode levar horas/dias para aparecer; pode ser forçada via Facebook Sharing Debugger.
