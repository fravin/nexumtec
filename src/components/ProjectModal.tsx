import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, X } from "lucide-react";
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
          {/* Desktop: Two columns layout */}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;