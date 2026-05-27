import { AnimatedSection } from "@/components/AnimatedSection";

type Case = {
  num: string;
  title: string;
  description: string;
  kpis: { value: string; label: string }[];
  stack: string[];
};

const Projects = () => {
  const cases: Case[] = [
    {
      num: "CASE 01",
      title: "Sistema de Faturamento e Gestão de Glosas",
      description:
        "Sistema web completo para gestão de faturamento de convênios, controle de glosas e analytics em tempo real. Substituiu planilhas e processos manuais por uma plataforma única e auditável.",
      kpis: [
        { value: "R$34k+", label: "Faturamento mensal sob controle" },
        { value: "260+", label: "Procedimentos catalogados" },
        { value: "100%", label: "Rastreabilidade de recursos" },
      ],
      stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Recharts"],
    },
    {
      num: "CASE 02",
      title: "Análise Preditiva de Vendas — R$77,5M analisados",
      description:
        "Rede de saúde sem visibilidade comercial e sem capacidade de antecipar tendências. Dashboard com BI e análise preditiva transformou a tomada de decisão da liderança.",
      kpis: [
        { value: "40%", label: "Ganho em eficiência" },
        { value: "R$77,5M", label: "Volume analisado" },
        { value: "204k", label: "Produtos mapeados" },
      ],
      stack: ["Power BI", "DAX", "SQL Server", "Modelagem de Dados"],
    },
    {
      num: "CASE 03",
      title: "Gestão Completa para Clínica de Fisioterapia",
      description:
        "Sistema de agenda, prontuário eletrônico, pacotes de sessões e relatórios gerenciais — em produção, eliminando planilhas e controles manuais da clínica.",
      kpis: [
        { value: "0", label: "Planilhas remanescentes" },
        { value: "PDF", label: "Prontuário exportável" },
        { value: "24/7", label: "Acesso seguro com auth" },
      ],
      stack: ["React", "TypeScript", "Supabase", "Tailwind"],
    },
    {
      num: "CASE 04",
      title: "Estoque Hospitalar — Excel substituído por sistema web",
      description:
        "Controle de materiais migrado de uma planilha Excel suscetível a erros para uma aplicação web robusta com banco SQL, autenticação e relatórios precisos.",
      kpis: [
        { value: "↓100%", label: "Erros de lançamento manual" },
        { value: "Tempo real", label: "Visão de estoque" },
        { value: "↑Eficiência", label: "Em compras e auditoria" },
      ],
      stack: ["JavaScript", "HTML5/CSS3", "SQL", "GitHub"],
    },
  ];

  return (
    <section id="projetos" className="py-24 md:py-32 bg-ink relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <AnimatedSection animation="slideUp">
          <div className="section-label mb-5">Resultados comprovados</div>
          <h2 className="serif-display text-4xl md:text-6xl text-foreground mb-5">
            Cases de <em>impacto real</em>
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed mb-16">
            Projetos entregues com ROI mensurável. Números reais, contexto real,
            impacto real.
          </p>
        </AnimatedSection>

        <div className="flex flex-col gap-px bg-border border border-border">
          {cases.map((c, i) => (
            <AnimatedSection key={c.num} animation="slideUp" delay={i * 80}>
              <article className="grid md:grid-cols-[1fr_1.4fr] bg-ink-2 transition-colors hover:bg-ink-3">
                {/* Left */}
                <div className="p-8 md:p-12 md:border-r border-border">
                  <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mb-4">
                    {c.num} ——
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4 leading-tight">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.description}
                  </p>
                </div>

                {/* Right */}
                <div className="p-8 md:p-12">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {c.kpis.map((k) => (
                      <div
                        key={k.label}
                        className="text-center p-4 bg-ink border border-border"
                      >
                        <div className="serif-display text-primary text-2xl md:text-3xl leading-none mb-2">
                          {k.value}
                        </div>
                        <div className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-muted-foreground leading-tight">
                          {k.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.stack.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[0.62rem] tracking-[0.06em] uppercase text-accent px-2.5 py-1 border border-accent/25 bg-accent/[0.06]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
