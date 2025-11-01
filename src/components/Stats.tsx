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
      icon: <Clock className="h-10 w-10" />,
      value: "14+",
      label: "Anos de Experiência",
      description: "Otimizando processos no setor da saúde"
    },
    {
      icon: <CheckCircle2 className="h-10 w-10" />,
      value: "5+",
      label: "Projetos Entregues",
      description: "Soluções completas implementadas"
    },
    {
      icon: <TrendingUp className="h-10 w-10" />,
      value: "30%",
      label: "Redução de Custos",
      description: "Média de economia gerada aos clientes"
    },
    {
      icon: <Users className="h-10 w-10" />,
      value: "100%",
      label: "Satisfação",
      description: "Clientes satisfeitos com resultados"
    },
    {
      icon: <Target className="h-10 w-10" />,
      value: "0",
      label: "Erros de Estoque",
      description: "Após implementação de sistemas"
    },
    {
      icon: <Award className="h-10 w-10" />,
      value: "15+",
      label: "Certificações",
      description: "Em tecnologia e gestão"
    }
  ];

  return (
    <section id="stats" className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 fade-in-section">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Resultados que <span className="text-white drop-shadow-lg">Comprovam</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Números que refletem meu compromisso com excelência e resultados mensuráveis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="glass border-white/20 hover:border-white/40 transition-smooth hover:-translate-y-2 fade-in-section"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className="text-white mb-4 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="text-5xl font-bold mb-2 text-white animate-glow">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold mb-2 text-white">
                  {stat.label}
                </div>
                <div className="text-sm text-white/80">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center fade-in-section">
          <Card className="glass border-white/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <p className="text-lg text-white leading-relaxed">
                Cada número conta uma história de <span className="font-semibold">transformação digital</span>, 
                processos otimizados e <span className="font-semibold">decisões baseadas em dados</span> que 
                geraram impacto real nos negócios dos meus clientes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Stats;