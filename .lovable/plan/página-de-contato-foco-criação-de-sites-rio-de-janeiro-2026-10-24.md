# Página de Contato — foco "criação de sites Rio de Janeiro"

## O que o visitante vê
Nova página `/contato` no estilo Clinical Calm:
- Título: "Fale com a Nexum — Criação de Sites no Rio de Janeiro", subtítulo sobre sites profissionais para empresas e clínicas no RJ (atendimento remoto para todo o Brasil).
- Formulário: nome, e-mail, telefone/WhatsApp, empresa, tipo de projeto (site institucional, landing page, clínica, catálogo, outro), mensagem.
- Ao enviar: a mensagem é salva, você recebe um e-mail em contato@nexumtec.com.br, e o visitante vê a confirmação com o botão "Enviar também pelo WhatsApp", que abre o WhatsApp (21) 98146-6912 com a mensagem já escrita.
- Ao lado: e-mail, telefone, WhatsApp, "Rio de Janeiro — RJ".
- Bloco curto de perguntas frequentes sobre criação de sites no RJ (sem preços/prazos inventados).
- Link "Contato" no menu e no rodapé passa a apontar para esta página.

## Onde as mensagens ficam
- Toda mensagem é guardada no banco do site (tabela de contatos), visível em Cloud → Database.
- E-mail: hoje o envio usa um remetente de teste e vai para o Gmail. Vou checar se o domínio nexumtec.com.br está verificado para e-mails; se estiver, você recebe o aviso em contato@nexumtec.com.br. Se não, as mensagens ficam salvas e eu aviso o passo que falta.

## SEO
- Title "Contato | Criação de Sites no Rio de Janeiro — Nexum", description com "criação de sites Rio de Janeiro".
- Dados estruturados ContactPage + LocalBusiness (Rio de Janeiro, telefone, e-mail) ligados à Organization.
- Adicionada ao sitemap e ao llms.txt; links internos a partir de /criacao-de-sites.

## Detalhes técnicos
- Rota `/contato` em App.tsx, componente Seo existente.
- Tabela `contact_submissions` com RLS (só inserção anônima, sem leitura pública); validação zod no cliente e na função.
- Reescrever `send-contact-email`: validar, escapar HTML, inserir no banco, enviar e-mail ao dono (app emails se domínio verificado).
- Formulário existente na home (`Contact.tsx`) reaproveita a mesma lógica.
- Teste: envio real, conferir linha no banco, apagar só o registro de teste.
