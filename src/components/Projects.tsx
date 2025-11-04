import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BarChart3, Code, Workflow, Users, Globe } from "lucide-react";
import ProjectModal from "./ProjectModal";
import estoqueLogin from "@/assets/estoque-login.png";
import estoqueDashboard from "@/assets/estoque-dashboard.png";
import vendasDashboard from "@/assets/vendas-dashboard.png";

const Projects = () => {
  const projects = [
    {
      title: "Análise Global de Vendas - Pós-Graduação",
      description: "Projeto acadêmico de análise de dados de vendas globais com dashboard interativo em Power BI. Análise completa de 77,55 milhões em vendas, 204 mil produtos vendidos, identificando padrões de consumo por continente, país e período.",
      image: vendasDashboard,
      category: "Análise de Dados",
      technologies: ["Power BI", "SQL", "Modelagem de Dados", "Análise Estatística"],
      icon: <Globe className="h-6 w-6" />,
      challenge: "Analisar um extenso banco de dados de vendas globais para identificar padrões de consumo, tendências de mercado e gerar insights estratégicos que auxiliem gestores na tomada de decisão baseada em dados.",
      solution: "Desenvolvi um projeto completo de análise de dados, desde a modelagem do banco de dados relacional até a criação de dashboards interativos. Realizei tratamento e transformação de dados, criação de relacionamentos entre tabelas (Sales, Product, Region, Salesperson) e desenvolvimento de visualizações estratégicas em Power BI.",
      results: [
        "Análise de 77,55 milhões em vendas totalizando 204 mil produtos",
        "Identificação de padrões de consumo por continente e país",
        "Dashboard interativo com análise temporal de desempenho",
        "Insights valiosos para otimização de estratégias de vendas",
        "Modelo de dados robusto com relacionamentos estruturados"
      ]
    },
    {
      title: "Sistema Web de Gestão de Estoque Hospitalar",
      description: "Sistema web completo desenvolvido do zero para substituir planilhas Excel. Aplicação robusta com interface intuitiva, banco de dados SQL e tela de autenticação, em pleno funcionamento na clínica.",
      image: estoqueDashboard,
      category: "Desenvolvimento Web",
      technologies: ["JavaScript", "HTML5 & CSS3", "SQL", "Git & GitHub"],
      icon: <Code className="h-6 w-6" />,
      challenge: "O controle de estoque da clínica era feito em uma planilha de Excel que, devido ao grande volume de dados, se tornou suscetível a erros manuais, gerando retrabalho constante e imprecisão na análise de consumo.",
      solution: "Desenvolvi do zero um sistema web completo para substituir a planilha. Criei uma aplicação robusta com interface intuitiva utilizando HTML, CSS e JavaScript, conectada a um banco de dados SQL para garantir a integridade dos dados. O sistema possui tela de autenticação para segurança e está em pleno funcionamento na empresa.",
      results: [
        "Eliminação completa dos erros de lançamento manual",
        "Controle de estoque preciso e em tempo real",
        "Dados confiáveis para análise e otimização de compras",
        "Aumento significativo da eficiência operacional"
      ]
    },
    {
      title: "Sistema de Controle de Estoque com Dashboard Dinâmico",
      description: "Sistema completo em Excel com banco de dados centralizado, controle automatizado de entradas/saídas e dashboard interativo. Oferece visão em tempo real do estoque e análise estratégica.",
      image: "/lovable-uploads/b24acb9c-0aed-47f2-a007-54b657dd77db.png",
      category: "Análise de Dados",
      technologies: ["Excel Avançado", "VBA", "Dashboard", "Banco de Dados"],
      icon: <BarChart3 className="h-6 w-6" />,
      challenge: "A clínica necessitava de um controle preciso e visual do estoque de materiais ortopédicos para evitar faltas, otimizar compras e entender o padrão de consumo. O processo manual era suscetível a erros e não fornecia insights rápidos.",
      solution: "Desenvolvi uma solução completa em Excel com um banco de dados para cadastro de produtos, fornecedores e controle de entradas/saídas. O sistema culmina em um Dashboard dinâmico com gráficos interativos que mostram o valor total em estoque, a quantidade de itens, o status dos materiais e o histórico de movimentações.",
      results: [
        "Visão clara e em tempo real do estoque",
        "Gestão mais estratégica dos materiais",
        "Otimização do processo de compras",
        "Redução de custos e desperdícios"
      ]
    },
    {
      title: "Pesquisa de Satisfação e Avaliação de Pacientes",
      description: "Projeto de pesquisa de satisfação com metodologia quantitativa para avaliar a percepção dos pacientes. Utilizei Google Forms e análise estatística para gerar insights e recomendações estratégicas.",
      image: "/lovable-uploads/ede7c479-7ced-4377-a83f-bc56b6d8300d.png",
      category: "Pesquisa & Análise",
      technologies: ["Pesquisa Quantitativa", "Análise de Dados", "Google Forms", "Relatórios"],
      icon: <Workflow className="h-6 w-6" />,
      challenge: "A clínica precisava de dados estruturados sobre a percepção dos pacientes para identificar pontos de melhoria no atendimento.",
      solution: "Conduzi um projeto de extensão para criar, aplicar e analisar uma pesquisa de satisfação, transformando o feedback qualitativo em dados quantitativos.",
      results: [
        "Identificação de 3 pontos-chave de melhoria no fluxo de atendimento",
        "Base para projeto de otimização de processos",
        "Dados estruturados para tomada de decisão",
        "Melhoria na qualidade do atendimento"
      ]
    },
    {
      title: "Alinhamento Estratégico e Otimização de Processos Intersetoriais",
      description: "Projeto de alinhamento estratégico entre setores da clínica para otimizar comunicação e processos. Utilizei Trello para gestão, criando checklists padronizados e canais diretos de comunicação.",
      image: "/lovable-uploads/2f7340e6-ea0b-421d-8d8a-7ae210866e46.png",
      category: "Gestão de Processos",
      technologies: ["Trello", "Mapeamento de Processos", "Gestão de Projetos", "Treinamentos"],
      icon: <Users className="h-6 w-6" />,
      challenge: "A falta de uma comunicação fluida e de processos padronizados entre os setores (Recepção, Enfermagem, Faturamento) gerava retrabalho, erros no faturamento e impactava a agilidade do atendimento ao paciente.",
      solution: "Liderei um projeto de alinhamento estratégico para mapear e otimizar os fluxos de trabalho. Apresentei e implementei um plano de ação que incluía treinamentos periódicos, criação de checklists padronizados e a implementação de canais de comunicação diretos para agilizar a resolução de problemas. A gestão do projeto foi realizada através do Trello para garantir a transparência e o acompanhamento das melhorias.",
      results: [
        "Redução significativa de erros e retrabalho",
        "Maior agilidade nos processos internos",
        "Aumento na satisfação dos pacientes",
        "Ambiente de trabalho mais organizado e colaborativo"
      ]
    }
  ];

  return (
    <section id="projetos" className="py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Projetos em <span className="gradient-text">Destaque</span>: Soluções na Prática
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estudos de caso reais demonstrando como transformo desafios em soluções práticas através da análise de dados.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-glow transition-smooth overflow-hidden h-full flex flex-col"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-hero text-white">
                    {project.category}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-start space-x-3 group-hover:text-primary transition-colors">
                  <div className="bg-primary/10 text-primary p-2 rounded-lg flex-shrink-0">
                    {project.icon}
                  </div>
                  <span className="line-clamp-2">{project.title}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary"
                        className="bg-secondary/50 text-secondary-foreground"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-primary">Resultados Alcançados:</h4>
                    <ul className="space-y-1">
                      {project.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <ProjectModal project={project}>
                  <Button 
                    variant="outline" 
                    className="w-full group/btn hover:bg-primary hover:text-primary-foreground"
                  >
                    <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                    Ver Detalhes
                  </Button>
                </ProjectModal>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-card shadow-lg max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                Interessado em Saber Mais?
              </h3>
              <p className="text-muted-foreground mb-6">
                Quer conhecer mais detalhes sobre esses projetos ou discutir como posso ajudar sua empresa? 
                Vamos conversar!
              </p>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })}
              >
                Vamos Conversar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Projects;