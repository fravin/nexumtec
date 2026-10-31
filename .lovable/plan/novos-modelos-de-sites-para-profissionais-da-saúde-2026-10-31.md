# Novos modelos de sites para profissionais da saúde

## Objetivo
Ampliar a área de modelos em "Criação de Sites" com exemplos para o público da saúde. Cada segmento terá dois formatos: **site institucional** e **landing page de perfil profissional**. Todos aparecem claramente identificados como modelos demonstrativos, sem clientes, preços ou depoimentos inventados.

## Segmentos (10 novos modelos)
| Segmento | Institucional | Landing page de perfil |
|---|---|---|
| Fisioterapia | Clínica de fisioterapia e reabilitação | Perfil de fisioterapeuta (especialidades, agendamento) |
| Psicologia | Consultório ou clínica de psicologia | Perfil de psicóloga (abordagem, atendimento online) |
| Educação física | Estúdio de treinamento funcional | Perfil de educador físico (aulas, grupos) |
| Personal trainer | Assessoria de treino | Perfil de personal (planos de treino, contato) |
| Nutrição | Clínica de nutrição | Perfil de nutricionista (consultas, acompanhamento) |

Cada segmento terá identidade visual própria (nome fictício, cores e fotos coerentes), sempre com tom acolhedor e profissional.

## Como vai aparecer na página
- Novo bloco "Modelos para profissionais da saúde" dentro da seção de modelos.
- Filtros simples por **segmento** (Todos, Fisioterapia, Psicologia, Educação física, Personal, Nutrição) e por **formato** (Institucional, Landing page).
- Cada cartão mostra o nome do modelo, segmento, formato e o selo "Modelo demonstrativo".
- Ao clicar, abre ampliado no visualizador já existente, com setas para navegar entre os modelos visíveis no filtro.
- Os 3 modelos atuais continuam no lugar.

## SEO
- Textos curtos por segmento, com termos como "site para fisioterapeuta", "site para psicólogo", "site para personal trainer", "site para nutricionista".
- Uma pergunta nova no FAQ sobre sites para profissionais da saúde (sem prometer preço ou prazo).
- Atualizar o arquivo de descrição para buscas por IA com os novos segmentos.

## Detalhes técnicos
- Gerar 10 imagens de prévia (1440x1024) em `src/assets/`, carregadas sob demanda.
- Adicionar os modelos em `src/content/websiteCreation.ts` com campos `segment` e `format`.
- Em `src/pages/CriacaoDeSites.tsx`: filtros com estado local, grade responsiva, reaproveitar o visualizador ampliado passando a lista filtrada.
- Atualizar `public/llms.txt`; validar no navegador em desktop e celular.
