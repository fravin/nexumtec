import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { AnimatedSection } from '@/components/AnimatedSection';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Target, Zap, Brain } from 'lucide-react';

interface Metric {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  countTo?: number;
  suffix?: string;
}

interface Case {
  id: string;
  title: string;
  description: string;
  metrics: Metric[];
  chartData: any[];
  chartType: 'bar' | 'area' | 'pie';
  technologies: string[];
  icon: React.ReactNode;
}

const SuccessCases = () => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const cases: Case[] = [
    {
      id: 'demand-prediction',
      title: 'Previsão de Demanda com Machine Learning',
      description: 'Implementação de modelo de ML para previsão de demanda de materiais hospitalares, reduzindo custos e melhorando eficiência operacional.',
      metrics: [
        { value: '35', label: 'Redução de Custos', icon: <TrendingUp className="w-6 h-6" />, color: 'text-emerald-600 dark:text-emerald-400', countTo: 35, suffix: '%' },
        { value: '95', label: 'Acurácia do Modelo', icon: <Target className="w-6 h-6" />, color: 'text-blue-600 dark:text-blue-400', countTo: 95, suffix: '%' },
        { value: '250', label: 'ROI Alcançado', icon: <Zap className="w-6 h-6" />, color: 'text-purple-600 dark:text-purple-400', countTo: 250, suffix: '%' },
      ],
      chartData: [
        { mes: 'Jan', previsao: 85, real: 82 },
        { mes: 'Fev', previsao: 90, real: 88 },
        { mes: 'Mar', previsao: 95, real: 94 },
        { mes: 'Abr', previsao: 92, real: 93 },
        { mes: 'Mai', previsao: 97, real: 96 },
        { mes: 'Jun', previsao: 95, real: 95 }
      ],
      chartType: 'area',
      technologies: ['Python', 'Scikit-learn', 'Power BI', 'SQL'],
      icon: <Brain className="w-8 h-8" />
    },
    {
      id: 'automation-reports',
      title: 'Automação de Relatórios com IA',
      description: 'Sistema inteligente de geração automática de relatórios gerenciais, aumentando produtividade e confiabilidade dos dados.',
      metrics: [
        { value: '80', label: 'Redução de Tempo', icon: <Zap className="w-6 h-6" />, color: 'text-emerald-600 dark:text-emerald-400', countTo: 80, suffix: '%' },
        { value: '100', label: 'Confiabilidade', icon: <Target className="w-6 h-6" />, color: 'text-blue-600 dark:text-blue-400', countTo: 100, suffix: '%' },
        { value: '12', label: 'Horas Economizadas/Semana', icon: <TrendingUp className="w-6 h-6" />, color: 'text-purple-600 dark:text-purple-400', countTo: 12, suffix: 'h' },
      ],
      chartData: [
        { categoria: 'Tempo', antes: 8, depois: 1.5 },
        { categoria: 'Erros', antes: 45, depois: 5 },
        { categoria: 'Custo', antes: 100, depois: 65 }
      ],
      chartType: 'bar',
      technologies: ['Python', 'OpenAI API', 'Excel Automation', 'Power Automate'],
      icon: <Zap className="w-8 h-8" />
    },
    {
      id: 'sales-analytics',
      title: 'Análise Preditiva de Vendas',
      description: 'Dashboard com insights preditivos de vendas e análise de tendências, otimizando estratégias comerciais.',
      metrics: [
        { value: '40', label: 'Aumento em Eficiência', icon: <TrendingUp className="w-6 h-6" />, color: 'text-emerald-600 dark:text-emerald-400', countTo: 40, suffix: '%' },
        { value: '77.5', label: 'Milhões Analisados', icon: <Target className="w-6 h-6" />, color: 'text-blue-600 dark:text-blue-400', countTo: 77.5, suffix: 'M' },
        { value: '98', label: 'Satisfação do Cliente', icon: <Brain className="w-6 h-6" />, color: 'text-purple-600 dark:text-purple-400', countTo: 98, suffix: '%' },
      ],
      chartData: [
        { name: 'Eficiência', valor: 85, fill: 'hsl(var(--chart-1))' },
        { name: 'Precisão', valor: 95, fill: 'hsl(var(--chart-2))' },
        { name: 'ROI', valor: 250, fill: 'hsl(var(--chart-3))' }
      ],
      chartType: 'pie',
      technologies: ['Power BI', 'DAX', 'SQL Server', 'Azure'],
      icon: <Target className="w-8 h-8" />
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Animate all metrics
          cases.forEach(caseItem => {
            caseItem.metrics.forEach((metric, index) => {
              if (metric.countTo !== undefined) {
                const key = `${caseItem.id}-${index}`;
                const duration = 2000;
                const steps = 60;
                const increment = metric.countTo / steps;
                let currentCount = 0;

                const timer = setInterval(() => {
                  currentCount += increment;
                  if (currentCount >= metric.countTo) {
                    currentCount = metric.countTo;
                    clearInterval(timer);
                  }
                  setCounts(prev => ({ ...prev, [key]: currentCount }));
                }, duration / steps);
              }
            });
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const renderChart = (caseItem: Case) => {
    const chartConfig = {
      height: 300,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    switch (caseItem.chartType) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={chartConfig.height}>
            <AreaChart data={caseItem.chartData} margin={chartConfig.margin}>
              <defs>
                <linearGradient id="colorPrevisao" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="previsao" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorPrevisao)" name="Previsão" />
              <Area type="monotone" dataKey="real" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorReal)" name="Real" />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={chartConfig.height}>
            <BarChart data={caseItem.chartData} margin={chartConfig.margin}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="categoria" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="antes" fill="hsl(var(--chart-1))" name="Antes" radius={[8, 8, 0, 0]} />
              <Bar dataKey="depois" fill="hsl(var(--chart-2))" name="Depois" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={chartConfig.height}>
            <PieChart>
              <Pie
                data={caseItem.chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="hsl(var(--chart-1))"
                dataKey="valor"
              >
                {caseItem.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <section id="cases-sucesso" className="py-12 bg-gradient-to-b from-background to-secondary/20" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <AnimatedSection animation="fadeIn">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Cases de Sucesso em IA e Data Science
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Projetos reais com resultados mensuráveis em Inteligência Artificial e Ciência de Dados, 
              transformando dados em crescimento e eficiência operacional.
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-10">
          {cases.map((caseItem, idx) => (
            <AnimatedSection key={caseItem.id} animation="slideUp" delay={idx * 100}>
              <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    {caseItem.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{caseItem.title}</h3>
                    <p className="text-muted-foreground text-lg">{caseItem.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-8 mt-8">
                  {/* Metrics */}
                  <div className="md:col-span-4 space-y-4">
                    {caseItem.metrics.map((metric, metricIdx) => {
                      const key = `${caseItem.id}-${metricIdx}`;
                      const displayValue = metric.countTo !== undefined 
                        ? Math.round(counts[key] || 0) 
                        : metric.value;
                      
                      return (
                        <div 
                          key={metricIdx}
                          className="bg-gradient-to-br from-secondary/50 to-secondary/20 p-6 rounded-xl border border-border hover:scale-105 transition-transform duration-300"
                        >
                          <div className={`${metric.color} mb-2`}>
                            {metric.icon}
                          </div>
                          <div className="text-3xl font-bold mb-1">
                            {metric.suffix === '%' && '-'}
                            {displayValue}
                            {metric.suffix || ''}
                          </div>
                          <div className="text-sm text-muted-foreground font-medium">
                            {metric.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Chart */}
                  <div className="md:col-span-8">
                    <div className="bg-card p-6 rounded-xl border border-border">
                      {renderChart(caseItem)}
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold text-muted-foreground">Tecnologias:</span>
                    {caseItem.technologies.map((tech, techIdx) => (
                      <span 
                        key={techIdx}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessCases;