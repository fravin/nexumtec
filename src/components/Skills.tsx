import { Card, CardContent } from "@/components/ui/card";
import { 
  Database, 
  BarChart3, 
  Code2, 
  LineChart, 
  Users, 
  Target,
  Lightbulb,
  TrendingUp,
  GitBranch,
  FileSpreadsheet
} from "lucide-react";

const Skills = () => {
  const technicalSkills = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "SQL & Bancos de Dados",
      description: "Modelagem e consultas avançadas para análise de dados"
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Desenvolvimento Web",
      description: "HTML, CSS, JavaScript para soluções front-end"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Business Intelligence",
      description: "Power BI, dashboards e visualizações estratégicas"
    },
    {
      icon: <FileSpreadsheet className="h-8 w-8" />,
      title: "Excel Avançado",
      description: "VBA, fórmulas complexas e automações"
    },
    {
      icon: <LineChart className="h-8 w-8" />,
      title: "Análise de Dados",
      description: "Python, Pandas e técnicas de Data Science"
    },
    {
      icon: <GitBranch className="h-8 w-8" />,
      title: "Controle de Versão",
      description: "Git & GitHub para gestão de projetos"
    }
  ];

  const softSkills = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Foco em Resultados",
      description: "14+ anos otimizando processos e entregando valor"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Comunicação Efetiva",
      description: "Traduzindo complexidade técnica para negócios"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Resolução Criativa",
      description: "Pensamento analítico e soluções inovadoras"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Visão Estratégica",
      description: "Alinhando tecnologia com objetivos de negócio"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-section">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Minhas <span className="gradient-text">Competências</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma combinação única de habilidades técnicas e experiência prática 
            para transformar dados em decisões estratégicas
          </p>
        </div>

        {/* Technical Skills */}
        <div className="mb-16 fade-in-section">
          <h3 className="text-3xl font-bold text-center mb-12">
            Habilidades <span className="gradient-text">Técnicas</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalSkills.map((skill, index) => (
              <Card 
                key={index}
                className="group hover:shadow-glow transition-smooth hover:-translate-y-2 skill-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-hero text-white p-3 rounded-lg group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {skill.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="fade-in-section">
          <h3 className="text-3xl font-bold text-center mb-12">
            Habilidades <span className="gradient-text">Comportamentais</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {softSkills.map((skill, index) => (
              <Card 
                key={index}
                className="group hover:shadow-glow transition-smooth hover:-translate-y-2 skill-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-hero text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {skill.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;