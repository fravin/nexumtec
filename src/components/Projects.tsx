import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BarChart3, Code, Workflow } from "lucide-react";
import projectExcel from "@/assets/project-excel.jpg";
import projectClinical from "@/assets/project-clinical.jpg";

const Projects = () => {
  const projects = [
    {
      title: "Otimização do Controle de Estoque de Materiais Ortopédicos",
      description: "Desenvolvi um sistema de gerenciamento dinâmico em Excel, com dashboards e gráficos para análise visual do estoque, compras e consumo, solucionando problemas de controle manual.",
      image: projectExcel,
      category: "Análise de Dados",
      technologies: ["Excel Avançado", "VBA", "Dashboard", "Análise de Dados"],
      icon: <BarChart3 className="h-6 w-6" />,
      results: [
        "Redução de 30% no tempo de controle de estoque",
        "Eliminação de erros manuais",
        "Visualização em tempo real do consumo",
        "Otimização de compras e redução de custos"
      ]
    },
    {
      title: "Software de Gestão de Atendimentos Clínicos",
      description: "Desenvolvimento de sistema completo para gestão de atendimentos, agendamentos e controle de pacientes, otimizando o fluxo de trabalho da clínica.",
      image: projectClinical,
      category: "Desenvolvimento",
      technologies: ["Sistema Web", "Banco de Dados", "Gestão de Processos", "Interface de Usuário"],
      icon: <Code className="h-6 w-6" />,
      results: [
        "Automatização completa do agendamento",
        "Redução de 50% no tempo de atendimento",
        "Melhoria na experiência do paciente",
        "Controle eficiente de histórico médico"
      ]
    },
    {
      title: "Análise e Redução de Glosas Hospitalares",
      description: "Sistema de monitoramento e análise de glosas para identificar padrões, reduzir perdas financeiras e otimizar o faturamento hospitalar.",
      image: projectExcel,
      category: "Análise de Dados",
      technologies: ["Power BI", "SQL", "Excel", "Análise Estatística"],
      icon: <Workflow className="h-6 w-6" />,
      results: [
        "Redução de 40% nas glosas hospitalares",
        "Identificação de padrões críticos",
        "Melhoria no faturamento mensal",
        "Processo de auditoria otimizado"
      ]
    }
  ];

  return (
    <section id="projetos" className="py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Projetos em <span className="gradient-text">Destaque</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça os principais projetos que desenvolvi aplicando tecnologia e análise de dados para otimização de processos.
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