import { Building2, Stethoscope, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";

const Verticals = () => {

  const verticals = [
    {
      icon: Building2,
      tone: "primary" as const,
      eyebrow: "Negócios",
      title: "Para empresas que querem operar com previsibilidade",
      desc: "Implantamos sistemas, automações e dashboards que substituem planilhas, reduzem retrabalho e dão à liderança uma visão única da operação.",
      items: [
        "Sistemas web sob medida",
        "Business Intelligence & Power BI",
        "Automação de processos (RPA + IA)",
        "Consultoria de dados e processos",
      ],
    },
    {
      icon: Stethoscope,
      tone: "accent" as const,
      eyebrow: "Saúde",
      title: "Para clínicas e hospitais que querem cuidar melhor",
      desc: "13+ anos de experiência hospitalar aplicados a tecnologia: faturamento, glosas, indicadores e fluxos administrativos sem fricção para a equipe assistencial.",
      items: [
        "Faturamento e gestão de glosas",
        "Indicadores clínicos e operacionais",
        "Experiência do paciente",
        "TISS/TUSS, prontuário e estoque",
      ],
    },
  ];

  return (
    <section id="verticais" className="relative z-10 py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6 max-w-6xl">
        <AnimatedSection animation="slideUp">
          <div className="text-center mb-16">
            <div className="section-label justify-center inline-flex mb-5">
              Duas verticais, uma metodologia
            </div>
            <h2 className="serif-display text-4xl md:text-5xl text-foreground mb-4">
              Atendemos <em>empresas</em> e <em>clínicas</em>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Mesma abordagem consultiva, mesma engenharia de qualidade — adaptadas ao
              vocabulário e à regulação de cada mundo.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {verticals.map((v, i) => {
            const Icon = v.icon;
            const accent = v.tone === "accent" ? "text-accent border-accent/30 bg-accent/[0.06]" : "text-primary border-primary/30 bg-primary/[0.06]";
            const bar = v.tone === "accent" ? "bg-accent" : "bg-primary";
            return (
              <AnimatedSection
                key={v.eyebrow}
                animation={i === 0 ? "slideInLeft" : "slideInRight"}
              >
                <div className="bg-card p-8 md:p-12 h-full flex flex-col">
                  <div className={`w-14 h-14 flex items-center justify-center border ${accent} mb-7`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-[0.7rem] tracking-[0.22em] uppercase font-semibold text-muted-foreground mb-3">
                    {v.eyebrow}
                  </div>
                  <h3 className="serif-display text-2xl md:text-3xl text-foreground mb-4 leading-tight">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-7">
                    {v.desc}
                  </p>
                  <ul className="space-y-2 mb-8 flex-1">
                    {v.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-sm text-foreground/90">
                        <span className={`mt-2 w-1.5 h-1.5 ${bar} flex-shrink-0`} />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <Link to={v.tone === "accent" ? "/saude" : "/negocios"} className="self-start">
                    <Button variant="glass" size="default" className="group">
                      Ver cases de {v.eyebrow.toLowerCase()}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Verticals;
