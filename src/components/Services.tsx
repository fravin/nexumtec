import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Code2,
  MessageCircle,
  Workflow,
  BarChart3,
  Brain,
  ArrowRight,
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: "Criação de Sites",
      description:
        "Sites profissionais, responsivos e otimizados para conversão. Landing pages, institucionais e e-commerce com SEO e performance de ponta.",
      tags: ["Landing Pages", "SEO", "Responsivo"],
    },
    {
      icon: Code2,
      title: "Sistemas Sob Medida",
      description:
        "Aplicações web personalizadas para gestão, faturamento, controle de estoque e fluxos específicos da sua empresa.",
      tags: ["Web Apps", "Dashboards", "ERP"],
    },
    {
      icon: MessageCircle,
      title: "Automação de WhatsApp",
      description:
        "Chatbots inteligentes, atendimento 24/7, agendamentos e disparos automatizados integrados ao seu CRM.",
      tags: ["Chatbot", "CRM", "24/7"],
    },
    {
      icon: Workflow,
      title: "Melhoria de Processos",
      description:
        "Diagnóstico, mapeamento e otimização de fluxos operacionais. Redução de retrabalho e ganho de produtividade real.",
      tags: ["Diagnóstico", "Automação", "Eficiência"],
    },
    {
      icon: BarChart3,
      title: "Análise de Dados & BI",
      description:
        "Dashboards personalizados, relatórios estratégicos e KPIs em tempo real para decisões baseadas em dados.",
      tags: ["Power BI", "Excel", "KPIs"],
    },
    {
      icon: Brain,
      title: "Integração com IA",
      description:
        "Implementação de IA generativa, chatbots, assistentes virtuais e automações inteligentes em seus sistemas.",
      tags: ["IA Generativa", "GPT", "Assistentes"],
    },
  ];

  const scrollToContact = () => {
    document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="servicos" className="py-12 bg-gradient-to-br from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0}>
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nossos <span className="gradient-text">Serviços</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluções completas em tecnologia para sua empresa crescer com eficiência e inteligência.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <AnimatedSection
                key={index}
                animation="slideUp"
                delay={100 + index * 80}
              >
                <Card className="group hover:shadow-glow transition-smooth h-full flex flex-col border-primary/10 hover:border-primary/30">
                  <CardHeader>
                    <div className="bg-gradient-hero text-white p-3 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground leading-relaxed mb-4 flex-1">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full group/btn"
                      onClick={scrollToContact}
                    >
                      Solicitar orçamento
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Call to Action */}
        <AnimatedSection animation="scaleIn" delay={400}>
          <div className="text-center mt-12">
            <Card className="bg-gradient-card shadow-lg max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 gradient-text">
                  Não encontrou o que precisa?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Cada empresa é única. Vamos conversar sobre o seu desafio e desenhar uma solução sob medida para o seu negócio.
                </p>
                <Button variant="hero" size="lg" onClick={scrollToContact}>
                  Fale Comigo Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Services;
