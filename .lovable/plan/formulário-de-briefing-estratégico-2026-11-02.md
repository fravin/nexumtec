# Formulário de Briefing Estratégico

## Objetivo
Quando o visitante clicar em "Conversar sobre meu site" (ou sobre um sistema), ele abre um briefing guiado em etapas. As respostas ficam salvas, chegam por e-mail e seguem resumidas para o WhatsApp, já organizadas para a próxima conversa.

## Experiência do visitante
Nova página **/briefing** com um assistente em 5 etapas, barra de progresso e botões Voltar/Avançar. O tipo de projeto já vem marcado conforme o botão clicado (site ou sistema).

1. **Projeto:** site institucional, landing page, site para clínica/profissional da saúde, loja/catálogo, sistema sob medida, automação/IA, ou outro.
2. **Empresa:** nome, segmento (com opções de saúde e negócios), cidade, tempo de mercado, porte, se já tem site, link do site atual e do Instagram.
3. **Objetivos e público:** objetivo principal (gerar contatos, agendamentos, vender, passar credibilidade, reduzir tarefas manuais), público-alvo, diferenciais e concorrentes ou referências que admira.
4. **Escopo e conteúdo:** páginas ou funções desejadas (marcar várias), integrações (WhatsApp, agenda, pagamento, NFSe, CRM), se já tem logo, textos e fotos, e estilo visual preferido. Para sistemas, mostra perguntas sobre processo atual, usuários e dores.
5. **Contato e prazo:** nome, e-mail, WhatsApp, prazo desejado, faixa de investimento (opcional, com "prefiro conversar") e melhor horário para contato.

Ao enviar, aparece uma tela de confirmação com:
- um **resumo do briefing**;
- o botão **"Enviar resumo pelo WhatsApp"**, que abre o (21) 98146-6912 com o briefing já escrito;
- para pedidos de site, uma **prévia demonstrativa**: o modelo da nossa galeria que mais combina com o segmento e o formato escolhidos (por exemplo, fisioterapia + landing page), com o nome da empresa aplicado no título e o selo "Modelo demonstrativo".

## Para onde vão os dados
- **Salvo no site:** cada briefing fica guardado junto com as mensagens de contato, com todas as respostas.
- **E-mail:** usa o mesmo envio atual, com um e-mail organizado por seções. A entrega em contato@nexumtec.com.br continua dependendo da confirmação do domínio.
- **WhatsApp:** envio automático para o seu celular exige um serviço pago de WhatsApp. Por enquanto o caminho é o visitante tocar em "Enviar pelo WhatsApp" na tela final. Posso ligar o envio automático depois, se você contratar o serviço.

## Bônus opcional (IA)
No e-mail, um bloco **"Pontos para a próxima conversa"** gerado por IA: resumo do negócio, dores principais, sugestão de escopo e perguntas a fazer. Não inventa preços nem prazos.

## Onde os botões passam a levar
- "Conversar sobre meu site" em Criação de Sites → /briefing?tipo=site
- Botões de conversa em Negócios → /briefing?tipo=sistema
- A página Contato ganha um link "Prefere um briefing completo?" para /briefing.

## Detalhes técnicos
- Adicionar coluna `briefing jsonb` (nullable) em `contact_submissions`; `message` recebe um resumo em texto.
- Estender `send-contact-email` com um campo `briefing` opcional validado por zod (limites de tamanho por campo), e-mail HTML em seções e chamada opcional ao Lovable AI Gateway para os "pontos para a conversa".
- Nova página `src/pages/Briefing.tsx` com Seo (noindex não; title "Briefing de Projeto | Nexum"), validação zod por etapa, rascunho salvo no localStorage.
- Prévia demonstrativa reutiliza os dados de `src/content/websiteCreation.ts`, escolhendo o modelo por segmento e formato.
- Testar com um envio real, confirmar o registro salvo e apagar só esse registro de teste.
