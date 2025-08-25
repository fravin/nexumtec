import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BarChart3, Code, Workflow } from "lucide-react";
import projectExcel from "@/assets/project-excel.jpg";
import projectClinical from "@/assets/project-clinical.jpg";

const Projects = () => {
  const projects = [
    {
      title: "Sistema de Controle de Estoque e Análise de Materiais em Excel",
      description: "A clínica necessitava de um controle preciso e visual do estoque de materiais ortopédicos para evitar faltas, otimizar compras e entender o padrão de consumo. Desenvolvi uma solução completa em Excel com banco de dados para cadastro de produtos, fornecedores e controle de entradas/saídas, culminando em um Dashboard dinâmico com gráficos interativos.",
      image: projectExcel,
      category: "Análise de Dados",
      technologies: ["Excel Avançado", "VBA", "Dashboard", "Banco de Dados"],
      icon: <BarChart3 className="h-6 w-6" />,
      challenge: "Processo manual suscetível a erros e sem insights rápidos para gestão estratégica do estoque.",
      solution: "Solução completa em Excel com banco de dados para produtos e fornecedores, Dashboard dinâmico com gráficos interativos mostrando valor total, quantidade de itens, status e histórico de movimentações.",
      results: [
        "Visão clara e em tempo real do estoque",
        "Facilitação na tomada de decisão",
        "Otimização do processo de compras",
        "Redução de custos e desperdícios"
      ]
    },
    {
      title: "Pesquisa de Satisfação e Avaliação de Pacientes",
      description: "A clínica precisava de dados estruturados sobre a percepção dos pacientes para identificar pontos de melhoria no atendimento. Conduzi um projeto de extensão para criar, aplicar e analisar uma pesquisa de satisfação, transformando feedback qualitativo em dados quantitativos.",
      image: projectClinical,
      category: "Pesquisa & Análise",
      technologies: ["Pesquisa Quantitativa", "Análise de Dados", "Google Forms", "Relatórios"],
      icon: <Workflow className="h-6 w-6" />,
      challenge: "Necessidade de dados estruturados sobre percepção dos pacientes para melhorar o atendimento.",
      solution: "Projeto de extensão para criar, aplicar e analisar pesquisa de satisfação, transformando feedback qualitativo em dados quantitativos estruturados.",
      results: [
        "Identificação de 3 pontos-chave de melhoria",
        "Base para projeto de otimização de processos",
        "Dados estruturados para tomada de decisão",
        "Melhoria no fluxo de atendimento"
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

                <Button 
                  variant="outline" 
                  className="w-full group/btn hover:bg-primary hover:text-primary-foreground"
                  onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                  Ver Detalhes
                </Button>
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