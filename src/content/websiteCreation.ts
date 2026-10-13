import clinicDemo from "@/assets/sites-clinica-demo.jpg";
import companyDemo from "@/assets/sites-empresa-demo.jpg";
import landingDemo from "@/assets/sites-landing-demo.jpg";

export const websiteExamples = [
  { name: "Clínica Aurora", category: "Clínicas e saúde", image: clinicDemo, description: "Especialidades bem apresentadas, equipe em destaque e caminhos claros para agendamento.", features: ["Especialidades", "Equipe", "Agendamento"] },
  { name: "Forma Arquitetura", category: "Institucional e portfólio", image: companyDemo, description: "Uma presença editorial que valoriza os projetos e traduz a identidade do escritório.", features: ["Projetos", "Institucional", "Contato"] },
  { name: "Vértice Consultoria", category: "Landing page de serviços", image: landingDemo, description: "Uma página focada na proposta de valor, no serviço e na próxima conversa comercial.", features: ["Oferta", "Diferenciais", "Captação"] },
];

export const websiteFaqs = [
  { q: "Quanto custa criar um site profissional?", a: "O investimento depende do número de páginas, do conteúdo, das integrações e das funcionalidades. A Nexum prepara uma proposta personalizada após entender o objetivo do projeto, com escopo e condições definidos antes do início." },
  { q: "Qual a diferença entre site institucional e landing page?", a: "Um site institucional apresenta a empresa, seus serviços e sua história em várias páginas. Uma landing page concentra uma oferta e uma ação principal, como solicitar um orçamento ou agendar uma conversa. A escolha depende do seu objetivo comercial." },
  { q: "Vocês criam sites para clínicas e profissionais de saúde?", a: "Sim. Podemos organizar especialidades, apresentação da equipe, informações de atendimento e caminhos para agendamento. Conteúdo e funcionalidades são definidos com a clínica, considerando privacidade e as regras de comunicação da profissão." },
  { q: "A Nexum atende apenas no Rio de Janeiro?", a: "A Nexum Tecnologia atua no Rio de Janeiro e atende empresas de outras regiões do Brasil remotamente. Diagnóstico, revisões e acompanhamento podem ser realizados online." },
  { q: "Em quanto tempo o site fica pronto?", a: "O prazo é definido na proposta conforme o tamanho do site, a disponibilidade do conteúdo e as integrações necessárias. O cronograma inclui etapas de criação, revisão e validação antes da publicação." },
  { q: "Preciso ter textos, fotos, domínio e hospedagem?", a: "Se você já tiver esses materiais, podemos aproveitá-los. Caso contrário, definimos o que precisa ser produzido e orientamos a contratação do domínio e da hospedagem. Produção de conteúdo e custos de serviços externos são detalhados na proposta." },
  { q: "O site vai aparecer no Google, ChatGPT, Gemini e Claude?", a: "O projeto pode incluir organização do conteúdo, metadados, dados estruturados e boas práticas técnicas para facilitar a descoberta. Indexação, posição e recomendações dependem de cada plataforma, da concorrência e da autoridade da marca. Não garantimos primeira posição nem citação por assistentes de IA." },
  { q: "É possível atualizar o site e contratar manutenção?", a: "Sim. A forma de atualização e as opções de manutenção são combinadas no escopo. Podemos planejar edição de conteúdo, suporte, acompanhamento e novas funcionalidades conforme a necessidade da empresa." },
];

const base = "https://www.nexumtec.com.br";
export const websiteSchema = [
  { "@context": "https://schema.org", "@type": "Service", "@id": `${base}/criacao-de-sites#service`, name: "Criação de sites profissionais", serviceType: "Desenvolvimento de sites institucionais, landing pages e sites para clínicas", url: `${base}/criacao-de-sites`, description: "Criação de sites profissionais para empresas, clínicas e prestadores de serviços. Nexum Tecnologia, Rio de Janeiro, com atendimento remoto no Brasil.", provider: { "@id": `${base}/#organization` }, areaServed: { "@type": "Country", name: "Brasil" } },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Início", item: `${base}/` }, { "@type": "ListItem", position: 2, name: "Criação de sites", item: `${base}/criacao-de-sites` }] },
];