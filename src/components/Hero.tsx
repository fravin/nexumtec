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

      <div className="relative z-10 container mx-auto px-6 max-w-6xl text-center">
        <AnimatedSection animation="slideUp" delay={0}>
          <span className="inline-flex items-center gap-3 px-5 py-2 mb-10 text-[0.68rem] tracking-[0.22em] uppercase font-semibold text-primary border border-primary/25 bg-primary/[0.06] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Nexum Tecnologia · Rio de Janeiro
          </span>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={100}>
          <h1 className="serif-display text-foreground text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.25rem] mb-8 max-w-5xl mx-auto">
            Tecnologia humanizada
            <br />para <em>negócios</em> e <em>saúde</em>.
          </h1>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={200}>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
            Automação inteligente, IA aplicada e gestão simples — para empresas que
            querem crescer com previsibilidade e clínicas que querem cuidar melhor
            dos seus pacientes.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={300}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-20">
            <Button
              variant="hero"
              size="lg"
              onClick={() => scrollTo("#contato")}
              className="group"
            >
              Diagnóstico Gratuito
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={() => scrollTo("#verticais")}
            >
              Ver como funciona
            </Button>
          </div>
        </AnimatedSection>

        {/* Pillars grid */}
        <AnimatedSection animation="fadeIn" delay={500}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border max-w-6xl mx-auto text-left">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-card p-6 md:p-7 flex flex-col gap-3 hover:bg-secondary transition-colors"
                >
                  <div className="w-11 h-11 flex items-center justify-center border border-primary/25 bg-primary/[0.06] text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground leading-snug tracking-tight">
                    {p.title}
                  </h3>
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
