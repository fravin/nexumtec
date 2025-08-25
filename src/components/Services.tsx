import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Brain, Workflow, TrendingUp, Database, Settings } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Consultoria em Otimização de Processos",
      icon: <Workflow className="h-8 w-8" />,
      target: "Para empresas que enfrentam gargalos operacionais, comunicação ineficiente entre setores, retrabalho constante e falta de padronização nos fluxos de trabalho.",
      offerings: [
        {
          title: "Diagnóstico e Mapeamento de Processos",
          description: "Análise completa dos seus fluxos de trabalho atuais para identificar pontos de atrito e oportunidades de melhoria."
        },
        {
          title: "Desenvolvimento de Estratégias de Alinhamento",
          description: "Criação de um plano de ação claro para alinhar equipes, definir responsabilidades e garantir que todos trabalhem em sinergia."
        },
        {
          title: "Implementação de Ferramentas e Metodologias",
          description: "Suporte na implementação de checklists, canais de comunicação eficientes e uma cultura de feedback contínuo para garantir mudanças duradouras."
        }
      ]
    },
    {
      title: "Análise de Dados para Tomada de Decisão",
      icon: <BarChart3 className="h-8 w-8" />,
      target: "Para gestores que precisam de uma visão clara dos seus dados, mas se sentem perdidos em planilhas complexas ou não conseguem extrair insights valiosos de suas operações.",
      offerings: [
        {
          title: "Criação de Dashboards Personalizados",
          description: "Transformo seus dados (estoque, vendas, satisfação do cliente, etc.) em painéis visuais e interativos em Excel ou outras ferramentas de BI, permitindo uma análise rápida e intuitiva."
        },
        {
          title: "Análise de Dados e Relatórios Estratégicos",
          description: "Gero relatórios que não apenas mostram 'o quê' está acontecendo, mas também ajudam a entender 'o porquê', fornecendo uma base sólida para decisões estratégicas."
        },
        {
          title: "Estruturação de Coleta de Dados",
          description: "Ajudo sua empresa a organizar a coleta de informações importantes, como pesquisas de satisfação, para garantir que você tenha os dados certos para crescer."
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
          <p className="text-xl text-muted-foreground mb-6">
            Transformando Desafios em Oportunidades com Soluções Sob Medida
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Com mais de uma década de experiência na otimização de processos no setor da saúde e uma especialização em Ciência de Dados, ofereço serviços de consultoria focados em gerar eficiência, clareza e resultados mensuráveis para o seu negócio.
          </p>
        </div>

        <div className="space-y-12">
          <h3 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h3>
          
          {services.map((service, serviceIndex) => (
            <div key={serviceIndex} className="space-y-8">
              {/* Service Header */}
              <div className="flex items-center justify-center mb-8">
                <Card className="bg-gradient-hero text-white shadow-glow max-w-4xl">
                  <CardContent className="flex items-center space-x-4 p-6">
                    {service.icon}
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-white/90 text-sm leading-relaxed">{service.target}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Offerings Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {service.offerings.map((offering, offeringIndex) => (
                  <Card 
                    key={offeringIndex}
                    className="group hover:shadow-glow transition-smooth h-full"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-start space-x-3">
                        <div className="bg-gradient-hero text-white p-3 rounded-lg">
                          {serviceIndex === 0 ? (
                            offeringIndex === 0 ? <TrendingUp className="h-6 w-6" /> :
                            offeringIndex === 1 ? <Settings className="h-6 w-6" /> : <Workflow className="h-6 w-6" />
                          ) : (
                            offeringIndex === 0 ? <Database className="h-6 w-6" /> :
                            offeringIndex === 1 ? <Brain className="h-6 w-6" /> : <BarChart3 className="h-6 w-6" />
                          )}
                        </div>
                        <span className="group-hover:text-primary transition-colors text-lg">
                          {offering.title}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {offering.description}
                      </p>
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
                Vamos Conversar?
              </h3>
              <p className="text-muted-foreground mb-6">
                Se você acredita que sua empresa pode se beneficiar de processos mais inteligentes e decisões baseadas em dados, entre em contato. Vamos agendar uma conversa para um diagnóstico inicial sem compromisso.
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