import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BarChart3, Code, Workflow, Users, Globe, Stethoscope, FileBarChart } from "lucide-react";
import ProjectModal from "./ProjectModal";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect, useRef } from "react";
import estoqueLogin from "@/assets/estoque-login.png";
import estoqueDashboard from "@/assets/estoque-dashboard.png";
import estoqueDashboardNovo from "@/assets/estoque-dashboard-novo.png";
import vendasDashboard from "@/assets/vendas-dashboard.png";
import fisiokimDashboard from "@/assets/fisiokim-dashboard.png";
import fisiokimAgenda from "@/assets/fisiokim-agenda.png";
import fisiokimPacientes from "@/assets/fisiokim-pacientes.png";
import fisiokimProntuario from "@/assets/fisiokim-prontuario.png";
import fisiokimLogin from "@/assets/fisiokim-login.png";
import faturamentoConvenios from "@/assets/faturamento-convenios.png";
import faturamentoAnalytics from "@/assets/faturamento-analytics.png";
import faturamentoGraficos from "@/assets/faturamento-graficos.png";
import faturamentoRecursos from "@/assets/faturamento-recursos.png";
import faturamentoGlosas from "@/assets/faturamento-glosas.png";
import faturamentoViscossuplementacao from "@/assets/faturamento-viscossuplementacao.png";
import { AnimatedSection } from "@/components/AnimatedSection";

const Projects = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  // Auto-play
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      if (!document.querySelector('.projects-carousel:hover')) {
        api.scrollNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  const projects = [
    {
      title: "Sistema de Gestão de Faturamento e Glosas",
      description: "Sistema web completo para gestão de faturamento de convênios, controle de glosas, analytics avançado e viscossuplementação. Solução sob medida para otimizar processos financeiros na área da saúde.",
      image: faturamentoConvenios,
      category: "Desenvolvimento Web",
      technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Recharts"],
      icon: <FileBarChart className="h-6 w-6" />,
      challenge: "Processos de faturamento e controle de glosas dependiam de planilhas, gerando atrasos, perda de receita e dificuldade no acompanhamento de recursos.",
      solution: "Desenvolvi um sistema completo com módulos de faturamento por convênio, analytics com KPIs em tempo real, controle de recursos de glosas com status e prazos, e módulo de viscossuplementação com gráficos analíticos.",
      results: [
        "Controle de R$ 34 mil+ em faturamento mensal",
        "Analytics com ticket médio e evolução temporal",
        "Gestão de recursos de glosas com alertas de vencimento",
        "Dashboard executivo com taxa de recuperação",
        "Módulo completo de viscossuplementação com 260+ procedimentos"
      ],
      confidential: true
    },
    {
      title: "Sistema de Gestão para Clínica de Fisioterapia - FISIOKIM",
      description: "Sistema web completo desenvolvido para gestão de clínicas de fisioterapia. Inclui controle de agenda, cadastro de pacientes, prontuário médico eletrônico, gestão de pacotes de sessões e relatórios gerenciais.",
      image: fisiokimDashboard,
      category: "Desenvolvimento Web",
      technologies: ["React", "TypeScript", "Supabase", "Tailwind CSS", "PostgreSQL"],
      icon: <Stethoscope className="h-6 w-6" />,
      challenge: "Clínicas de fisioterapia frequentemente dependem de sistemas fragmentados ou planilhas para gerenciar agendamentos, prontuários e pacotes de sessões.",
      solution: "Desenvolvi um sistema web completo e integrado para gestão da clínica, incluindo dashboard, calendário semanal, cadastro de pacientes, prontuário eletrônico com exportação para PDF e autenticação segura.",
      results: [
        "Sistema em produção e funcionamento",
        "Eliminação de planilhas e controles manuais",
        "Prontuário eletrônico completo com exportação para PDF",
        "Gestão de pacotes de sessões com alertas automáticos",
        "Agendamento visual e intuitivo por calendário semanal",
        "Controle de acesso seguro com autenticação de usuários"
      ],
      link: "https://sistemafisiokim.lovable.app"
    },
    {
      title: "Sistema Web de Gestão de Estoque Hospitalar",
      description: "Sistema web completo desenvolvido do zero para substituir planilhas Excel. Aplicação robusta com interface intuitiva, banco de dados SQL e tela de autenticação, em pleno funcionamento na clínica.",
      image: estoqueDashboardNovo,
      category: "Desenvolvimento Web",
      technologies: ["JavaScript", "HTML5 & CSS3", "SQL", "Git & GitHub"],
      icon: <Code className="h-6 w-6" />,
      challenge: "O controle de estoque da clínica era feito em uma planilha de Excel que, devido ao grande volume de dados, se tornou suscetível a erros manuais.",
      solution: "Desenvolvi do zero um sistema web completo para substituir a planilha. Criei uma aplicação robusta com interface intuitiva conectada a um banco de dados SQL.",
      results: [
        "Eliminação completa dos erros de lançamento manual",
        "Controle de estoque preciso e em tempo real",
        "Dados confiáveis para análise e otimização de compras",
        "Aumento significativo da eficiência operacional"
      ]
    },
    {
      title: "Análise Global de Vendas - Pós-Graduação",
      description: "Projeto acadêmico de análise de dados de vendas globais com dashboard interativo em Power BI. Análise completa de 77,55 milhões em vendas, 204 mil produtos vendidos.",
      image: vendasDashboard,
      category: "Análise de Dados",
      technologies: ["Power BI", "SQL", "Modelagem de Dados", "Análise Estatística"],
      icon: <Globe className="h-6 w-6" />,
      challenge: "Analisar um extenso banco de dados de vendas globais para identificar padrões de consumo e gerar insights estratégicos.",
      solution: "Desenvolvi um projeto completo de análise de dados, desde a modelagem do banco de dados relacional até a criação de dashboards interativos em Power BI.",
      results: [
        "Análise de 77,55 milhões em vendas totalizando 204 mil produtos",
        "Identificação de padrões de consumo por continente e país",
        "Dashboard interativo com análise temporal de desempenho",
        "Modelo de dados robusto com relacionamentos estruturados"
      ]
    },
    {
      title: "Sistema de Controle de Estoque com Dashboard Dinâmico",
      description: "Sistema completo em Excel com banco de dados centralizado, controle automatizado de entradas/saídas e dashboard interativo.",
      image: "/lovable-uploads/b24acb9c-0aed-47f2-a007-54b657dd77db.png",
      category: "Análise de Dados",
      technologies: ["Excel Avançado", "VBA", "Dashboard", "Banco de Dados"],
      icon: <BarChart3 className="h-6 w-6" />,
      challenge: "A clínica necessitava de um controle preciso e visual do estoque de materiais ortopédicos.",
      solution: "Desenvolvi uma solução completa em Excel com banco de dados, controle de entradas/saídas e Dashboard dinâmico com gráficos interativos.",
      results: [
        "Visão clara e em tempo real do estoque",
        "Gestão mais estratégica dos materiais",
        "Otimização do processo de compras",
        "Redução de custos e desperdícios"
      ]
    },
    {
      title: "Pesquisa de Satisfação e Avaliação de Pacientes",
      description: "Projeto de pesquisa de satisfação com metodologia quantitativa para avaliar a percepção dos pacientes.",
      image: "/lovable-uploads/ede7c479-7ced-4377-a83f-bc56b6d8300d.png",
      category: "Pesquisa & Análise",
      technologies: ["Pesquisa Quantitativa", "Análise de Dados", "Google Forms", "Relatórios"],
      icon: <Workflow className="h-6 w-6" />,
      challenge: "A clínica precisava de dados estruturados sobre a percepção dos pacientes.",
      solution: "Conduzi um projeto de extensão para criar, aplicar e analisar uma pesquisa de satisfação.",
      results: [
        "Identificação de 3 pontos-chave de melhoria",
        "Base para projeto de otimização de processos",
        "Dados estruturados para tomada de decisão",
        "Melhoria na qualidade do atendimento"
      ]
    },
    {
      title: "Alinhamento Estratégico e Otimização de Processos Intersetoriais",
      description: "Projeto de alinhamento estratégico entre setores da clínica para otimizar comunicação e processos.",
      image: "/lovable-uploads/2f7340e6-ea0b-421d-8d8a-7ae210866e46.png",
      category: "Gestão de Processos",
      technologies: ["Trello", "Mapeamento de Processos", "Gestão de Projetos", "Treinamentos"],
      icon: <Users className="h-6 w-6" />,
      challenge: "A falta de comunicação fluida e processos padronizados entre setores gerava retrabalho e erros.",
      solution: "Liderei um projeto de alinhamento estratégico para mapear e otimizar os fluxos de trabalho com treinamentos e checklists padronizados.",
      results: [
        "Redução significativa de erros e retrabalho",
        "Maior agilidade nos processos internos",
        "Aumento na satisfação dos pacientes",
        "Ambiente de trabalho mais organizado e colaborativo"
      ]
    }
  ];

  return (
    <section id="projetos" className="py-12 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0}>
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Projetos em <span className="gradient-text">Destaque</span>: Soluções na Prática
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Estudos de caso reais demonstrando como transformo desafios em soluções práticas através da análise de dados.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="scaleIn" delay={100}>
          <div className="projects-carousel relative px-12">
            <Carousel 
              setApi={setApi} 
              opts={{ align: "start", loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {projects.map((project, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 xl:basis-1/3">
                    <Card className="group hover:shadow-glow transition-smooth overflow-hidden h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                          decoding="async"
                          width={400}
                          height={192}
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-gradient-hero text-white">
                            {project.category}
                          </Badge>
                          {'confidential' in project && project.confidential && (
                            <Badge variant="outline" className="bg-background/80 text-xs">
                              Dados ilustrativos
                            </Badge>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>

                      <CardHeader className="flex-shrink-0">
                        <CardTitle className="flex items-start space-x-3 group-hover:text-primary transition-colors text-lg">
                          <div className="bg-primary/10 text-primary p-2 rounded-lg flex-shrink-0">
                            {project.icon}
                          </div>
                          <span className="line-clamp-2">{project.title}</span>
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-4">
                          <p className="text-muted-foreground leading-relaxed text-sm">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 4).map((tech, techIndex) => (
                              <Badge 
                                key={techIndex} 
                                variant="secondary"
                                className="bg-secondary/50 text-secondary-foreground text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 4 && (
                              <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground text-xs">
                                +{project.technologies.length - 4}
                              </Badge>
                            )}
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm text-primary">Resultados:</h4>
                            <ul className="space-y-1">
                              {project.results.slice(0, 3).map((result, resultIndex) => (
                                <li key={resultIndex} className="text-xs text-muted-foreground flex items-start">
                                  <span className="text-primary mr-2">•</span>
                                  {result}
                                </li>
                              ))}
                              {project.results.length > 3 && (
                                <li className="text-xs text-muted-foreground/60">
                                  +{project.results.length - 3} mais resultados...
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>

                        <ProjectModal project={project}>
                          <Button 
                            variant="outline" 
                            className="w-full group/btn hover:bg-primary hover:text-primary-foreground"
                          >
                            <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                            Ver Detalhes
                          </Button>
                        </ProjectModal>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
                  }`}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection animation="scaleIn" delay={400}>
          <div className="text-center mt-10">
            <Card className="bg-gradient-card shadow-lg max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 gradient-text">
                  Interessado em Saber Mais?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Quer conhecer mais detalhes sobre esses projetos ou discutir como posso ajudar sua empresa? 
                  Vamos conversar!
                </p>
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Vamos Conversar
                </Button>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Projects;
