import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, HeartPulse, Workflow, Users } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const Hero = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const pillars = [
    {
      icon: Bot,
      title: "Automação Inteligente + IA Aplicada",
      desc: "Tecnologia que executa o repetitivo para sua equipe focar no que importa.",
    },
    {
      icon: HeartPulse,
      title: "Experiência do Paciente + Atendimento Humanizado",
      desc: "Sistemas que respeitam o tempo de quem cuida e o tempo de quem é cuidado.",
    },
    {
      icon: Workflow,
      title: "Gestão Simples + Produtividade",
      desc: "Painéis e fluxos claros para decidir rápido — sem planilhas dispersas.",
    },
    {
      icon: Users,
      title: "Treinamento de Equipes + Organização",
      desc: "Implantação com pessoas, não só com software. Capacitamos quem opera.",
    },
  ];

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 bg-background"
    >
      {/* Soft blue gradient + subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, hsl(210 33% 98%) 0%, hsl(210 38% 95%) 100%)",
        }}
      />
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "900px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, hsl(217 91% 60% / 0.10) 0%, transparent 65%)",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl text-center">
        <AnimatedSection animation="slideUp" delay={0}>
          <span className="inline-flex max-w-full items-center justify-center gap-3 rounded-full border border-primary/25 bg-primary/[0.06] px-4 py-2 text-center text-[0.62rem] font-semibold uppercase leading-relaxed tracking-[0.18em] text-primary sm:px-5 sm:text-[0.68rem] sm:tracking-[0.22em]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Nexum Tecnologia · Rio de Janeiro
          </span>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={100}>
          <h1 className="serif-display mx-auto mb-8 max-w-5xl text-[2.2rem] leading-[1.14] text-foreground sm:text-[4rem] sm:leading-[1.04] md:text-[5.5rem] lg:text-[6.25rem]">
            Tecnologia humanizada para <em>clínicas</em> e <em>empresas</em> que querem crescer com inteligência.
          </h1>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={200}>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
            Automação, IA aplicada e gestão eficiente para reduzir falhas, otimizar
            processos e melhorar a experiência dos pacientes e clientes.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={300}>
          <div className="mb-20 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button
              variant="hero"
              size="lg"
              onClick={() => scrollTo("#contato")}
              className="group w-full max-w-sm self-center whitespace-normal text-center leading-tight sm:w-auto"
            >
              Diagnóstico Gratuito
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="glass"
              size="lg"
              onClick={() => scrollTo("#verticais")}
              className="w-full max-w-sm self-center whitespace-normal text-center leading-tight sm:w-auto"
            >
              Ver como funciona
            </Button>
          </div>
        </AnimatedSection>

        {/* Pillars grid */}
        <AnimatedSection animation="fadeIn" delay={500}>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-px border border-border bg-border text-left md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="flex flex-col gap-3 bg-card p-5 transition-colors hover:bg-secondary sm:p-6 md:p-7"
                >
                  <div className="w-11 h-11 flex items-center justify-center border border-primary/25 bg-primary/[0.06] text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-sm font-semibold text-foreground leading-snug tracking-tight">
                    {p.title}
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
