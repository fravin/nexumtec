import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useState } from "react";

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
        src: "/lovable-uploads/2f7340e6-ea0b-421d-8d8a-7ae210866e46.png",
        title: "Controle de Imobilizadores",
        description: "Dashboard específico para gestão de materiais ortopédicos"
      },
      {
        src: "/lovable-uploads/cf1acf7f-d7ed-4815-a9f7-7d0b5cd91483.png",
        title: "Análise de Convênios",
        description: "Relatório detalhado de procedimentos por convênio"
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

  // Dados específicos do projeto Alinhamento Estratégico
  const projectDetails = {
    "Alinhamento Estratégico e Otimização de Processos Intersetoriais": {
      fullTitle: "Projeto de Alinhamento Estratégico - Centro Trauma",
      challenge: "A comunicação entre os setores da clínica (Recepção, Enfermagem, Faturamento) apresentava ruídos, resultando em retrabalho, erros no faturamento e um fluxo de trabalho desalinhado, o que impactava a eficiência geral e o ambiente de trabalho.",
      solution: `Como Analista de TI e responsável pela otimização de processos, liderei a iniciativa de ponta a ponta. Minhas ações incluíram:

• Mapeamento completo dos fluxos de trabalho de cada setor para identificar gargalos.

• Criação e apresentação de um plano de ação para toda a equipe, focando nos benefícios da colaboração.

• Implementação de checklists padronizados e canais de comunicação diretos.

• Utilização do Trello como ferramenta central para gestão das tarefas e acompanhamento das melhorias propostas.`,
      results: `O projeto resultou em um ambiente de trabalho mais coeso e eficiente. Os principais impactos mensuráveis foram:

• Redução significativa de erros e necessidade de reprocessamento nas contas hospitalares.

• Maior agilidade na comunicação e resolução de pendências entre os setores.

• Criação de um ambiente com feedback contínuo, permitindo a identificação e correção rápida de novas falhas.`,
      tools: [
        "Trello (Gestão de Projetos)",
        "Microsoft PowerPoint (Apresentação e Comunicação)", 
        "Metodologias Ágeis (Organização e Execução)",
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
      fullTitle: "Pesquisa de Satisfação e Avaliação de Pacientes - Centro Trauma",
      challenge: "A clínica precisava de dados estruturados sobre a percepção dos pacientes para identificar pontos de melhoria no atendimento e elevar a qualidade dos serviços prestados.",
      solution: `Conduzi um projeto completo de pesquisa que envolveu:

• Criação de metodologia de pesquisa quantitativa

• Desenvolvimento de questionário estruturado

• Aplicação da pesquisa com amostra representativa

• Análise estatística dos dados coletados

• Transformação de feedback qualitativo em dados quantitativos`,
      results: `Os resultados geraram impactos mensuráveis:

• Identificação de 3 pontos-chave de melhoria no fluxo de atendimento

• Base sólida para projeto de otimização de processos

• Dados estruturados para tomada de decisão estratégica

• Melhoria comprovada na qualidade do atendimento`,
      tools: [
        "Google Forms",
        "Pesquisa Quantitativa",
        "Análise Estatística de Dados",
        "Relatórios Executivos"
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
            // Default layout for other projects
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left column - Image (40%) */}
              <div className="lg:col-span-2">
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-hero text-white">
                      {project.category}
                    </Badge>
                  </div>
                </div>
              </div>

            {/* Right column - Content (60%) */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Challenge Section */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">O Desafio</h3>
                <p className="text-foreground leading-relaxed">
                  {currentProject.challenge}
                </p>
              </div>

              {/* Solution Section */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">Minha Solução</h3>
                <div className="text-foreground leading-relaxed whitespace-pre-line">
                  {currentProject.solution}
                </div>
              </div>

              {/* Results Section */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">Resultados</h3>
                <div className="text-foreground leading-relaxed whitespace-pre-line">
                  {currentProject.results}
                </div>
              </div>

              {/* Tools Section */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">Ferramentas Utilizadas</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProject.tools.map((tool, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="bg-secondary/50 text-secondary-foreground"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Contact CTA */}
              <div className="pt-4 border-t border-border">
                <p className="text-muted-foreground mb-4">
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
                  className="w-full sm:w-auto"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Vamos Conversar
                </Button>
              </div>
            </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;