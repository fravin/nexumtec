# Vídeo 3D animado no fundo da seção principal

## O que muda
- O fundo parado da seção principal passa a ser um vídeo 3D em loop: esferas de vidro e linhas de luz em azul e verde-água, se movendo devagar sobre um fundo claro. O vídeo já foi gerado (10 s, sem som).
- Por cima do vídeo fica uma camada clara e suave, para que o título, o texto e os botões continuem fáceis de ler.
- Os textos, os botões ("Diagnóstico Gratuito" leva ao briefing) e os 4 cartões continuam iguais.
- O vídeo toca sozinho, sem som e em loop, também no celular. Ele não aparece para quem desativou animações no aparelho; essas pessoas veem o fundo atual.

## Como vou conferir
- Abrir a página inicial no computador e no celular e checar que o vídeo toca e que o texto continua fácil de ler.

## Detalhes técnicos
- Hero.tsx: um `<video autoPlay muted loop playsInline>` usando o `src/assets/videos/hero-3d-background.mp4.asset.json` já criado, mais uma sobreposição em gradiente com os tokens `background` e a grade com opacidade de 60%. O vídeo fica oculto com `motion-reduce:hidden`.
