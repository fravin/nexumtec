import { Briefcase, GraduationCap, Heart, TrendingUp, Database, Building2, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Timeline = () => {
  const timelineEvents = [
    {
      year: "Início",
      title: "Feira Livre - Tijuca, RJ",
      description: "Primeiras lições de carreira: foco no cliente, negociação e criação de conexões autênticas. Aprendi que confiança e satisfação são a chave para o crescimento.",
      icon: ShoppingCart,
      color: "from-primary to-primary-dark"
    },
    {
      year: "2011",
      title: "Estagiário - Centro Trauma",
      description: "Início na área da saúde como estagiário na recepção da clínica Centro Trauma. Primeiro contato com o ambiente corporativo de saúde.",
      icon: Building2,
      color: "from-accent to-accent/80"
    },
    {
      year: "2012",
      title: "Contratação - Setor de Faturamento",
      description: "Efetivado e direcionado para faturamento hospitalar. Mergulho no universo de auditoria de glosas e gestão de estoque.",
      icon: TrendingUp,
      color: "from-primary to-primary-dark"
    },
    {
      year: "2014",
      title: "Nascimento da Ana Beatriz",
      description: "A maior de todas as motivações: o nascimento da minha filha redefiniu minhas ambições e me impulsionou a retomar os estudos com mais força.",
      icon: Heart,
      color: "from-destructive to-destructive/80",
      special: true
    },
    {
      year: "2017",
      title: "Promoção - Assistente Administrativo",
      description: "Crescimento dentro da empresa. De auxiliar de escritório para assistente administrativo, combinando experiência e desenvolvimento profissional.",
      icon: Briefcase,
      color: "from-accent to-accent/80"
    },
    {
      year: "2024",
      title: "Graduação & Analista de Tecnologia",
      description: "Conclusão da graduação em Sistemas de Informação. Promoção para Analista de Tecnologia, unindo experiência de negócio com paixão por tecnologia.",
      icon: GraduationCap,
      color: "from-primary to-primary-dark"
    },
    {
      year: "Atual",
      title: "Pós-Graduação em Ciência de Dados",
      description: "Especialização em análise de dados com foco em transformar dados em decisões inteligentes e processos em resultados mensuráveis.",
      icon: Database,
      color: "from-accent to-accent/80"
    }
  ];

  return (
    <section id="timeline" className="py-20 bg-gradient-to-br from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Linha do Tempo</span> Profissional
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma jornada de aprendizado contínuo, superação e conquistas
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Icon Circle */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${event.color} shadow-glow flex items-center justify-center animate-float`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-28 md:ml-0 ${
                    isLeft ? 'md:pr-16' : 'md:pl-16'
                  }`}>
                    <Card className={`group hover:shadow-glow transition-smooth ${
                      event.special ? 'border-destructive/50 bg-destructive/5' : ''
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-2xl font-bold bg-gradient-to-r ${event.color} bg-clip-text text-transparent`}>
                            {event.year}
                          </span>
                          {event.special && (
                            <span className="px-3 py-1 text-xs font-semibold bg-destructive/20 text-destructive rounded-full">
                              Marco Pessoal
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-card border-primary/30">
            <CardContent className="p-8">
              <p className="text-lg text-foreground/90 italic">
                "Cada etapa dessa jornada me trouxe aprendizados únicos. Da feira à tecnologia, 
                o foco sempre foi o mesmo: <span className="font-bold text-primary">entregar valor e fazer a diferença</span>."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Timeline;