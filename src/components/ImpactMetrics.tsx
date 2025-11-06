import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Award, Users, Clock } from "lucide-react";

const ImpactMetrics = () => {
  const metrics = [
    {
      icon: <Clock className="h-8 w-8" />,
      value: 14,
      suffix: "+",
      label: "Anos de Experiência",
      color: "text-blue-500"
    },
    {
      icon: <Award className="h-8 w-8" />,
      value: 50,
      suffix: "+",
      label: "Projetos Completados",
      color: "text-green-500"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: 85,
      suffix: "%",
      label: "Melhoria Média em Processos",
      color: "text-purple-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      value: 100,
      suffix: "%",
      label: "Satisfação dos Clientes",
      color: "text-orange-500"
    }
  ];

  const [counts, setCounts] = useState(metrics.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          metrics.forEach((metric, index) => {
            let start = 0;
            const end = metric.value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCounts(prev => {
                  const newCounts = [...prev];
                  newCounts[index] = end;
                  return newCounts;
                });
                clearInterval(timer);
              } else {
                setCounts(prev => {
                  const newCounts = [...prev];
                  newCounts[index] = Math.floor(start);
                  return newCounts;
                });
              }
            }, 16);
          });
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById("impact-metrics");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasAnimated]);

  return (
    <section id="impact-metrics" className="py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Impacto em Números
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Resultados mensuráveis que demonstram comprometimento e excelência
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card 
              key={index}
              className="group hover:shadow-glow transition-smooth hover:-translate-y-2 bg-gradient-card"
            >
              <CardContent className="p-6 text-center">
                <div className={`${metric.color} mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {metric.icon}
                </div>
                <div className="text-4xl font-bold mb-2 gradient-text">
                  {counts[index]}{metric.suffix}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
