import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Brain, Workflow, TrendingUp, Database, Settings } from "lucide-react";

const Services = () => {
  const services = [
    {
      category: "Ciência de Dados Aplicada",
      icon: <BarChart3 className="h-8 w-8" />,
      services: [
        {
          title: "Análise e Visualização de Dados",
          description: "Transformo dados brutos em informações estratégicas através de dashboards interativos e relatórios claros, facilitando a tomada de decisão.",
          skills: ["Power BI", "Excel Avançado", "Python", "SQL"]
        },
        {
          title: "Modelagem Preditiva e Machine Learning",
          description: "Desenvolvo modelos para prever tendências, otimizar recursos e antecipar demandas, gerando uma vantagem competitiva para o seu negócio.",
          skills: ["Python", "Scikit-learn", "Pandas", "Machine Learning"]
        }
      ]
    },
    {
      category: "Gestão e Otimização de Processos",
      icon: <Workflow className="h-8 w-8" />,
      services: [
        {
          title: "Mapeamento e Análise de Processos",
          description: "Identifico gargalos, ineficiências e oportunidades de melhoria nos fluxos de trabalho da sua empresa.",
          skills: ["BPMN", "Análise de Processos", "Lean Six Sigma", "Documentação"]
        },
        {
          title: "Implementação de Melhorias e Aumento de Eficiência",
          description: "Desenvolvo e implemento soluções práticas que resultam em processos mais ágeis, organizados e com maior produtividade.",
          skills: ["Automação", "VBA", "Gestão de Projetos", "KPIs"]
        }
      ]
    }
  ];

  return (
    <section id="servicos" className="py-20 bg-gradient-to-br from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Como Posso Ajudar a <span className="gradient-text">Sua Empresa</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ofereço soluções especializadas em duas áreas principais para maximizar a eficiência e os resultados do seu negócio.
          </p>
        </div>

        <div className="space-y-12">
          {services.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-8">
              {/* Category Header */}
              <div className="flex items-center justify-center mb-8">
                <Card className="bg-gradient-hero text-white shadow-glow">
                  <CardContent className="flex items-center space-x-4 p-6">
                    {category.icon}
                    <h3 className="text-2xl font-bold">{category.category}</h3>
                  </CardContent>
                </Card>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {category.services.map((service, serviceIndex) => (
                  <Card 
                    key={serviceIndex}
                    className="group hover:shadow-glow transition-smooth h-full"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-start space-x-3">
                        <div className="bg-gradient-hero text-white p-3 rounded-lg">
                          {categoryIndex === 0 ? (
                            serviceIndex === 0 ? <Database className="h-6 w-6" /> : <Brain className="h-6 w-6" />
                          ) : (
                            serviceIndex === 0 ? <TrendingUp className="h-6 w-6" /> : <Settings className="h-6 w-6" />
                          )}
                        </div>
                        <span className="group-hover:text-primary transition-colors">
                          {service.title}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.skills.map((skill, skillIndex) => (
                          <Badge 
                            key={skillIndex} 
                            variant="secondary"
                            className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-card shadow-lg max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                Pronto para Transformar Seus Dados em Resultados?
              </h3>
              <p className="text-muted-foreground mb-6">
                Vamos conversar sobre como posso ajudar sua empresa a otimizar processos e tomar decisões mais inteligentes.
              </p>
              <button 
                onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-gradient-hero text-white px-8 py-3 rounded-lg font-semibold hover:shadow-glow transition-smooth transform hover:scale-105"
              >
                Fale Comigo Agora
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;