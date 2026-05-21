import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Cog,
  BarChart3,
  Bot,
  Map,
  HeartPulse,
  ArrowRight,
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const Services = () => {
  const services = [
    {
      icon: Cog,
      title: "Desenvolvimento de Sistemas",
      description:
        "Sistemas personalizados que automatizam processos internos, melhoram a gestão e eliminam dependência de planilhas.",
      tags: ["Sistemas Web", "Painéis Administrativos", "ERP", "APIs", "Integrações"],
    },
    {
      icon: BarChart3,
      title: "Business Intelligence & Power BI",
      description:
        "Dados brutos viram dashboards estratégicos. Sua liderança decide com base em indicadores reais, não em intuição.",
      tags: ["Dashboards", "Indicadores Gerenciais", "Relatórios Automáticos", "Controle Financeiro"],
    },
    {
      icon: Bot,
      title: "Inteligência Artificial & Automação",
      description:
        "Processos repetitivos automatizados com IA. Sua equipe para de fazer o que a máquina pode fazer melhor e mais rápido.",
      tags: ["Chatbots", "Automação de Processos", "IA para Saúde", "Integração WhatsApp"],
    },
    {
      icon: Map,
      title: "Consultoria em Processos",
      description:
        "Mapeamos onde está o gargalo e redesenhamos o fluxo para operar com menos esforço e mais previsibilidade.",
      tags: ["Diagnóstico Operacional", "Redesenho de Processos", "Padronização", "Otimização"],
    },
    {
      icon: HeartPulse,
      title: "Soluções para Saúde",
      description:
        "Especialização em hospitais e clínicas: faturamento, gestão de glosas, indicadores assistenciais e automação administrativa.",
      tags: ["Faturamento Hospitalar", "Glosas", "TISS/TUSS", "Dashboards Clínicos"],
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
              Soluções que geram <span className="gradient-text">eficiência real</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Não vendemos sistemas ou dashboards. Entregamos eficiência operacional, redução de custos e inteligência para tomada de decisão.
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
                  Agendar Consultoria
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
