# Fundo do Hero adaptado a celular, tablet e monitores

## Problema
No celular, os 4 cards ficam empilhados e a seção fica muito alta. O vídeo horizontal é esticado para cobrir toda essa altura, então fica muito ampliado, cortado e borrado atrás do texto.

## O que muda
1. **Vídeo vertical para celular**: gerar uma versão 9:16 da mesma cena (hospital digital, dados e IA, azul/teal), com o centro livre para o texto. O site escolhe automaticamente: vertical em telas em pé, horizontal em telas deitadas/monitores.
2. **Vídeo limitado à primeira tela**: o fundo cobre só a área visível inicial (título e botões); os cards abaixo ficam sobre o fundo claro com um degradê suave de transição, sem esticar o vídeo.
3. **Leitura do texto**: véu claro um pouco mais forte no celular para o título ficar nítido; em monitores grandes, mantém o vídeo mais visível.
4. **Monitores largos/ultrawide**: enquadramento centralizado e brilho radial proporcional à tela (hoje tem tamanho fixo de 900px).
5. **Economia de dados**: em conexões lentas ou modo de economia, e para quem prefere menos movimento, mostra só a imagem estática (poster) em vez do vídeo.

## Verificação
Capturas em 375px (celular), 768px (tablet), 1280px e 1920px para conferir enquadramento e legibilidade.

## Detalhes técnicos
- `src/components/Hero.tsx`: `<video>` com `<source media="(orientation: portrait)">` para o novo asset vertical + poster vertical; camada do vídeo com `h-[100svh]` no topo e máscara/gradiente para `background`; overlay `from-background/80` em mobile, `/55` em `md+`; glow com `vw`/`min()`; checagem de `navigator.connection.saveData` para não carregar vídeo.
- Novos assets em `src/assets/videos/` (vertical mp4 + poster webp).
