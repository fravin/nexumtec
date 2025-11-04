import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Target,
  Award,
  Clock
} from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: <Clock className="h-12 w-12" />,
      value: "14+",
      label: "Anos de Experiência",
      description: "Otimizando processos no setor da saúde",
      color: "from-primary to-primary-light"
    },
    {
      icon: <CheckCircle2 className="h-12 w-12" />,
      value: "5+",
      label: "Projetos Entregues",
      description: "Soluções completas implementadas",
      color: "from-accent to-purple-400"
    },
    {
      icon: <TrendingUp className="h-12 w-12" />,
      value: "30%",
      label: "Redução de Custos",
      description: "Média de economia gerada aos clientes",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Users className="h-12 w-12" />,
      value: "100%",
      label: "Satisfação",
      description: "Clientes satisfeitos com resultados",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Target className="h-12 w-12" />,
      value: "0",
      label: "Erros de Estoque",
      description: "Após implementação de sistemas",
      color: "from-orange-400 to-amber-500"
    },
    {
      icon: <Award className="h-12 w-12" />,
      value: "15+",
      label: "Certificações",
      description: "Em tecnologia e gestão",
      color: "from-pink-400 to-rose-500"
    }
  ];

  return (
    <section id="stats" className="py-20 bg-gradient-to-br from-background via-secondary to-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 fade-in-section">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Resultados que <span className="gradient-text">Comprovam</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Números que refletem meu compromisso com excelência e resultados mensuráveis
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="fade-in-section group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full border-2 hover:border-primary transition-smooth hover:shadow-glow hover:-translate-y-2 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  {/* Icon with gradient background */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} mb-6 group-hover:scale-110 transition-smooth`}>
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>
                  
                  {/* Value - Large and Bold */}
                  <div className="text-6xl font-bold mb-3 gradient-text">
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-xl font-semibold mb-3 text-foreground">
                    {stat.label}
                  </div>
                  
                  {/* Description */}
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Impact Statement */}
        <div className="fade-in-section max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-start gap-6">
                <div className="hidden md:block p-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 gradient-text">
                    Impacto Real nos Negócios
                  </h3>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Cada número conta uma história de <span className="font-semibold text-primary">transformação digital</span>, 
                    processos otimizados e <span className="font-semibold text-accent">decisões baseadas em dados</span> que 
                    geraram impacto real e mensurável nos negócios dos meus clientes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Stats;