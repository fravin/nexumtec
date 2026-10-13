# Página de criação de sites e presença nas buscas

## Objetivo
Criar uma página comercial dedicada à criação de sites profissionais, voltada a empresas, clínicas e prestadores de serviços. A página será preparada para buscas no Google e para facilitar a compreensão da Nexum por mecanismos de resposta como ChatGPT, Gemini e Claude, sem prometer posicionamento ou vendas garantidas.

## Nova página
Criar a rota `/criacao-de-sites` com a identidade Clinical Calm já usada pela Nexum e uma jornada focada em conversão:

1. **Abertura orientada ao cliente**
   - Oferta clara de criação de sites profissionais.
   - Destaque para credibilidade, geração de oportunidades, velocidade, experiência mobile e facilidade de contato.
   - Botões para solicitar diagnóstico e conversar pelo WhatsApp.

2. **Tipos de sites que a Nexum pode criar**
   - Site institucional.
   - Landing page para campanhas e captação de leads.
   - Site para clínicas e profissionais de saúde.
   - Catálogo de produtos ou serviços.
   - Portfólio profissional.
   - Portal ou área restrita, quando o projeto exigir.

3. **Vitrine demonstrativa**
   - Criar modelos visuais próprios para diferentes segmentos, claramente identificados como demonstrações conceituais, sem apresentá-los como clientes ou resultados reais.
   - Mostrar formatos desktop e mobile para comunicar qualidade e adaptação a diferentes telas.

4. **Entregáveis e diferenciais**
   - Estratégia de conteúdo, design responsivo, formulários, WhatsApp, desempenho, acessibilidade, segurança, métricas e estrutura técnica para SEO.
   - Explicar que cada projeto é planejado conforme o objetivo comercial, sem linguagem excessivamente técnica.

5. **Processo comercial**
   - Diagnóstico, proposta, criação, revisão, publicação e acompanhamento.
   - Perguntas frequentes sobre prazo, conteúdo, domínio, manutenção, alterações e investimento, sem inventar preços ou prazos fechados.

6. **Conversão**
   - Chamadas para ação ao longo da página e uma seção final conectada ao formulário de contato existente.

## SEO e descoberta por mecanismos de IA
- Definir título, descrição, canonical, Open Graph e Twitter específicos para `/criacao-de-sites`.
- Estruturar um único H1 e subtítulos descritivos, com linguagem natural para intenções como “criação de sites profissionais”, “desenvolvimento de sites no Rio de Janeiro”, “site para clínicas” e “landing page para empresas”.
- Adicionar dados estruturados adequados ao serviço, vinculados à organização Nexum Tecnologia, sem criar avaliações, preços ou cases fictícios.
- Incluir links internos para a nova página no menu, rodapé e áreas relacionadas de serviços/negócios; incluir também links contextuais de volta para Saúde, Negócios, Sobre e Contato.
- Atualizar `sitemap.xml` e `llms.txt` com a nova página e uma descrição objetiva da oferta.
- Manter conteúdo factual, autoria, dados de contato, localização e proposta de valor consistentes. Isso melhora a legibilidade para buscadores e assistentes de IA, mas a citação da empresa depende da indexação e dos critérios de cada plataforma.

## Implementação técnica
- Criar a página como componente React reutilizando cabeçalho, rodapé, animações, botões, SEO, WhatsApp e chatbot existentes.
- Registrar a nova rota no roteamento atual.
- Gerar imagens demonstrativas próprias para a vitrine e armazená-las no projeto, sem usar imagens externas.
- Preservar o design responsivo e os tokens visuais existentes.
- Registrar a nova organização de rota no `AGENTS.md`.

## Validação
- Conferir desktop, tablet e celular, incluindo ausência de cortes, sobreposições e rolagem horizontal.
- Testar links, botões, menu e navegação até o contato.
- Confirmar no navegador o título, descrição, canonical e JSON-LD da nova rota.
- Confirmar que sitemap e `llms.txt` contêm a URL e a descrição novas.
- Verificar o resultado do build automático e os erros de execução.

## Fora de escopo
- Publicação automática, campanhas pagas ou garantia de primeira posição no Google.
- Inventar clientes, depoimentos, métricas, preços ou projetos entregues.
- Alterar o posicionamento das páginas atuais além dos links necessários para integrar a nova oferta.
