import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import pesquisaSatisfacaoGrafico from "@/assets/pesquisa-satisfacao-grafico.png";
import alinhamentoEstrategicoSlide from "@/assets/alinhamento-estrategico-slide.png";

interface ProjectModalProps {
  project: {
    title: string;
    description: string;
    image: string;
    category: string;
    technologies: string[];
    icon: React.ReactNode;
    challenge: string;
    solution: string;
    results: string[];
  };
  children: React.ReactNode;
}

const ProjectModal = ({ project, children }: ProjectModalProps) => {
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Galeria de dashboards para o projeto de controle de estoque
  const dashboardGallery = {
    "Sistema de Controle de Estoque com Dashboard Dinâmico": [
      {
        src: "/lovable-uploads/b24acb9c-0aed-47f2-a007-54b657dd77db.png",
        title: "Dashboard Principal - Controle de Estoque",
        description: "Visão geral do sistema com KPIs principais"
      },
      {
        src: "/lovable-uploads/33181e0a-fc74-4de3-bca7-dc7dcdfded9d.png", 
        title: "Análise de Procedimentos por Médicos",
        description: "Gráficos detalhados de procedimentos e análise por médico"
      },
      {
        src: "/lovable-uploads/0a58a768-7332-41b8-95b2-cebaa34e92a6.png",
        title: "Controle de Imobilizadores e Estoque Geral",
        description: "Dashboard completo para gestão de materiais ortopédicos e análise de procedimentos"
      },
      {
        src: "/lovable-uploads/4602f0c8-937d-46d3-8686-f814d89a8367.png",
        title: "Análise de Procedimentos por Convênios",
        description: "Estudo dinâmico com análise detalhada de procedimentos utilizados por convênios"
      }
    ]
  };

  const currentGallery = dashboardGallery[project.title as keyof typeof dashboardGallery];

  const nextImage = () => {
    if (currentGallery) {
      setCurrentImageIndex((prev) => (prev + 1) % currentGallery.length);
    }
  };

  const prevImage = () => {
    if (currentGallery) {
      setCurrentImageIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length);
    }
  };

  // Dados específicos dos projetos com imagens personalizadas
  const projectImages = {
    "Pesquisa de Satisfação e Avaliação de Pacientes": pesquisaSatisfacaoGrafico,
    "Alinhamento Estratégico e Otimização de Processos Intersetoriais": alinhamentoEstrategicoSlide
  };

  const projectDetails = {
    "Alinhamento Estratégico e Otimização de Processos Intersetoriais": {
      fullTitle: "Alinhamento Estratégico e Otimização de Processos Intersetoriais",
      challenge: "A falta de uma comunicação fluida e de processos padronizados entre os setores (Recepção, Enfermagem, Faturamento) gerava retrabalho, erros no faturamento e impactava a agilidade do atendimento ao paciente.",
      solution: "Liderei um projeto de alinhamento estratégico para mapear e otimizar os fluxos de trabalho. Apresentei e implementei um plano de ação que incluía treinamentos periódicos, criação de checklists padronizados e a implementação de canais de comunicação diretos. A gestão do projeto foi realizada através do Trello para garantir a transparência e o acompanhamento das melhorias.",
      results: "O projeto resultou em uma redução significativa de erros e retrabalho, maior agilidade nos processos internos e, consequentemente, um aumento na satisfação dos pacientes e um ambiente de trabalho mais organizado e colaborativo para os funcionários.",
      tools: [
        "Trello",
        "Microsoft PowerPoint", 
        "Metodologias Ágeis",
        "Análise de Processos"
      ]
    },
    "Sistema de Controle de Estoque com Dashboard Dinâmico": {
      fullTitle: "Sistema de Controle de Estoque com Dashboard Dinâmico - Centro Trauma",
      challenge: "A gestão de materiais ortopédicos era realizada de forma manual, o que dificultava a visibilidade em tempo real do estoque, gerava risco de falta de itens essenciais e não permitia uma análise estratégica do consumo. Era necessário um sistema que centralizasse as informações e fornecesse insights rápidos para otimizar as compras.",
      solution: `Desenvolvi uma solução completa e automatizada em Excel, que funciona como um verdadeiro sistema de gestão. A ferramenta inclui:

• Banco de Dados Centralizado: Para cadastro de produtos, fornecedores e controle de movimentações.

• Sistema de Entradas e Saídas Automatizado: Simplifica o registro diário, minimizando erros manuais.

• Dashboard Dinâmico e Interativo: O coração do projeto, que consolida todos os dados e apresenta, através de gráficos e cartões de KPI, métricas essenciais como:
  - Valor Total do Estoque
  - Quantidade de Itens e Produtos Únicos  
  - Histórico Mensal de Entradas e Saídas
  - Análise de Consumo por tipo de material`,
      results: `A implementação da ferramenta transformou a gestão de estoque em um processo orientado por dados. Os resultados foram:

• Visão Clara e em Tempo Real: A diretoria passou a ter acesso imediato ao status do estoque, permitindo uma tomada de decisão mais ágil.

• Gestão Estratégica: A análise do Dashboard permitiu identificar padrões de consumo, otimizar o processo de compras e negociar melhor com fornecedores.

• Redução de Custos: O controle preciso evitou compras desnecessárias e reduziu o desperdício de materiais, gerando economia para a clínica.`,
      tools: [
        "Excel Avançado",
        "VBA (Visual Basic for Applications)",
        "Dashboard Interativo",
        "Banco de Dados"
      ]
    },
    "Pesquisa de Satisfação e Avaliação de Pacientes": {
      fullTitle: "Pesquisa de Satisfação e Avaliação de Pacientes",
      challenge: "A clínica precisava de uma maneira estruturada de coletar e analisar a percepção dos pacientes para identificar, com precisão, os principais pontos de atrito e oportunidades de melhoria no fluxo de atendimento.",
      solution: "Como um projeto de extensão, liderei a iniciativa desde a concepção até a análise. Criei um questionário objetivo, supervisionei a coleta de dados e centralizei as respostas para análise, transformando feedbacks qualitativos e subjetivos em dados quantitativos e acionáveis.",
      results: "A análise dos dados revelou de forma clara os 3 principais pontos de melhoria no fluxo de atendimento. Esses insights foram cruciais e serviram como a base para justificar e orientar o \"Projeto de Alinhamento Estratégico\" subsequente.",
      tools: [
        "Análise de Dados",
        "Microsoft Excel",
        "Coleta de Feedback"
      ]
    }
  };

  const currentProject = projectDetails[project.title as keyof typeof projectDetails] || {
    fullTitle: project.title,
    challenge: project.challenge,
    solution: project.solution,
    results: project.results.join('\n• '),
    tools: project.technologies
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 bg-background border-0 shadow-2xl">
        {/* Header with close button */}
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl md:text-3xl font-bold gradient-text pr-8 leading-tight">
              {currentProject.fullTitle}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="p-6">
          {/* Full width layout with gallery for stock control project */}
          {currentGallery ? (
            <div className="space-y-8">
              {/* Gallery Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-primary">Dashboards do Sistema</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{currentImageIndex + 1} de {currentGallery.length}</span>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
                    <img 
                      src={currentGallery[currentImageIndex].src}
                      alt={currentGallery[currentImageIndex].title}
                      className="w-full h-96 lg:h-[500px] object-contain rounded-lg bg-white/90"
                    />
                    
                    {/* Navigation buttons */}
                    {currentGallery.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-6 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background text-foreground rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-6 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background text-foreground rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                    
                    {/* Image title overlay */}
                    <div className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="font-semibold text-foreground">{currentGallery[currentImageIndex].title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{currentGallery[currentImageIndex].description}</p>
                    </div>
                  </div>
                  
                  {/* Thumbnail navigation */}
                  {currentGallery.length > 1 && (
                    <div className="flex gap-2 mt-4 justify-center">
                      {currentGallery.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentImageIndex 
                              ? 'bg-primary' 
                              : 'bg-muted hover:bg-muted-foreground/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Content sections in cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Challenge Section */}
                <div className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border border-border/50 shadow-sm">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                    O Desafio
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {currentProject.challenge}
                  </p>
                </div>

                {/* Solution Section */}
                <div className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border border-border/50 shadow-sm">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-secondary to-secondary/50 rounded-full"></div>
                    Minha Solução
                  </h3>
                  <div className="text-foreground leading-relaxed whitespace-pre-line">
                    {currentProject.solution}
                  </div>
                </div>

                {/* Results Section */}
                <div className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border border-border/50 shadow-sm">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-accent to-accent/50 rounded-full"></div>
                    Resultados
                  </h3>
                  <div className="text-foreground leading-relaxed whitespace-pre-line">
                    {currentProject.results}
                  </div>
                </div>

                {/* Tools Section */}
                <div className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border border-border/50 shadow-sm">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                    Ferramentas Utilizadas
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {currentProject.tools.map((tool, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors px-3 py-1"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/20 text-center">
                <p className="text-muted-foreground mb-4 text-lg">
                  Interessado em discutir este projeto ou implementar soluções similares?
                </p>
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => {
                      document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
                    }, 300);
                  }}
                  className="px-8 py-3"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Vamos Conversar
                </Button>
              </div>
            </div>
          ) : (
            // Layout padrão para outros projetos (mesmo padrão do Sistema de Controle de Estoque)
            <div className="space-y-8">
              {/* Image Section */}
              <div className="space-y-4">
                <div className="relative group">
                  <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
                    <img 
                      src={projectImages[project.title as keyof typeof projectImages] || project.image} 
                      alt={project.title}
                      className="w-full h-96 lg:h-[500px] object-contain rounded-lg bg-white/90"
                    />
                    
                    {/* Category badge overlay */}
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-gradient-hero text-white">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content sections in cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Challenge Section */}
                <div className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border border-border/50 shadow-sm">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                    O Desafio
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    {currentProject.challenge}
                  </p>
                </div>

                {/* Solution Section */}
                <div className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border border-border/50 shadow-sm">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-secondary to-secondary/50 rounded-full"></div>
                    Minha Solução
                  </h3>
                  <div className="text-foreground leading-relaxed whitespace-pre-line">
                    {currentProject.solution}
                  </div>
                </div>

                {/* Results Section */}
                <div className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border border-border/50 shadow-sm">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-accent to-accent/50 rounded-full"></div>
                    Resultados
                  </h3>
                  <div className="text-foreground leading-relaxed whitespace-pre-line">
                    {currentProject.results}
                  </div>
                </div>

                {/* Tools Section */}
                <div className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border border-border/50 shadow-sm">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                    Ferramentas Utilizadas
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {currentProject.tools.map((tool, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors px-3 py-1"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/20 text-center">
                <p className="text-muted-foreground mb-4 text-lg">
                  Interessado em discutir este projeto ou implementar soluções similares?
                </p>
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => {
                      document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
                    }, 300);
                  }}
                  className="px-8 py-3"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Vamos Conversar
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;