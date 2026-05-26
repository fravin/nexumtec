import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const Hero = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const metrics = [
    { value: "50+", label: "Projetos entregues" },
    { value: "87%", label: "Redução em tarefas manuais" },
    { value: "R$180k", label: "Em glosas recuperadas" },
    { value: "15+", label: "Anos de experiência" },
  ];

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 bg-ink"
    >
      {/* Grid + glow background */}
      <div className="absolute inset-0 hero-grid-bg" />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "900px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, hsl(36 45% 61% / 0.10) 0%, transparent 65%)",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center">
        <AnimatedSection animation="slideUp" delay={0}>
          <span className="inline-flex items-center gap-3 px-5 py-2 mb-10 font-mono text-[0.68rem] tracking-[0.22em] uppercase text-gold border border-gold/25 bg-gold/[0.04]">
            <span className="w-4 h-px bg-gold" />
            Agência de Transformação Digital — Rio de Janeiro
            <span className="w-4 h-px bg-gold" />
          </span>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={100}>
          <h1 className="serif-display text-white text-[3rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7rem] mb-8">
            Tecnologia que <em>escala</em>
            <br />o seu negócio.
          </h1>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={200}>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-12">
            Sistemas sob medida, inteligência artificial e automação de processos para
            empresas que precisam crescer com controle e previsibilidade — sem pagar
            preço de enterprise.
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
              onClick={() => scrollTo("#projetos")}
            >
              Ver Cases Reais
            </Button>
          </div>
        </AnimatedSection>

        {/* Metrics row */}
        <AnimatedSection animation="fadeIn" delay={500}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 max-w-3xl mx-auto">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`text-center px-4 ${
                  i > 0 ? "md:border-l md:border-white/10" : ""
                }`}
              >
                <div className="serif-display text-gold text-3xl md:text-4xl mb-1">
                  {m.value}
                </div>
                <div className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
