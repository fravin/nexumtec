## Atualização do CV no site

Substituir o arquivo de currículo que é baixado nos botões "CV" (header desktop e mobile) pelo novo PDF enviado.

### Passos
1. Copiar `user-uploads://CV-Flavio-Admilson-v2_3_Atualizado.pdf` para `public/cv-flavio-admilson.pdf`, sobrescrevendo o atual (mantém o mesmo caminho já usado pelos botões de download e pelo atributo `download="CV-Flavio-Admilson.pdf"`).
2. Nenhuma alteração de código é necessária — o `Header.tsx` já aponta para `/cv-flavio-admilson.pdf`.

### Fora de escopo
- Não alterar timeline, seção Sobre, ou textos do site com base no conteúdo do novo CV (posso fazer isso depois se quiser — me diga quais trechos atualizar).
- Não renomear o arquivo público (evita quebrar links já compartilhados).
