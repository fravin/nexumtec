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
  Server,
  FileSpreadsheet
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const Skills = () => {
  const technicalSkills = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "SQL & Bancos de Dados",
      description: "Modelagem e consultas avançadas para análise de dados",
      proficiency: 90
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Desenvolvimento Web",
      description: "HTML, CSS, JavaScript para soluções front-end",
      proficiency: 75
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Business Intelligence",
      description: "Power BI, dashboards e visualizações estratégicas",
      proficiency: 95
    },
    {
      icon: <FileSpreadsheet className="h-8 w-8" />,
      title: "Excel Avançado",
      description: "VBA, fórmulas complexas e automações",
      proficiency: 95
    },
    {
      icon: <LineChart className="h-8 w-8" />,
      title: "Análise de Dados",
      description: "Python, Pandas e técnicas de Data Science",
      proficiency: 80
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Hospedagem e VPS",
      description: "Deploy de sites, gerenciamento de servidores e armazenamento em nuvem",
      proficiency: 85
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
    <section id="skills" className="py-12 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0}>
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Minhas <span className="gradient-text">Competências</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Uma combinação única de habilidades técnicas e experiência prática 
              para transformar dados em decisões estratégicas
            </p>
          </div>
        </AnimatedSection>

        {/* Technical Skills */}
        <div className="mb-10">
          <AnimatedSection animation="slideUp" delay={100}>
            <h3 className="text-3xl font-bold text-center mb-8">
              Habilidades <span className="gradient-text">Técnicas</span>
            </h3>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalSkills.map((skill, index) => (
              <AnimatedSection key={index} animation="scaleIn" delay={150 + index * 100}>
                <Card
                className="group hover:shadow-glow transition-smooth hover:-translate-y-2 h-full"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="bg-gradient-hero text-white p-3 rounded-lg group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {skill.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {skill.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Proficiência</span>
                          <span className="font-semibold gradient-text">{skill.proficiency}%</span>
                        </div>
                        <div className="w-full bg-secondary/30 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-hero h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <AnimatedSection animation="slideUp" delay={100}>
            <h3 className="text-3xl font-bold text-center mb-8">
              Habilidades <span className="gradient-text">Comportamentais</span>
            </h3>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {softSkills.map((skill, index) => (
              <AnimatedSection key={index} animation="scaleIn" delay={150 + index * 100}>
                <Card
                className="group hover:shadow-glow transition-smooth hover:-translate-y-2 h-full"
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
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;