import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight, Check, TrendingDown, Briefcase, DollarSign } from "lucide-react";
import techHeroBg from "@/assets/tech-hero-bg.jpg";
import { AnimatedSection } from "@/components/AnimatedSection";

const Hero = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const socialProof = [
    "Sem compromisso inicial",
    "Resposta em 24h",
    "Atendimento consultivo",
  ];

  const metrics = [
    { icon: Briefcase, value: "+50", label: "projetos entregues" },
    { icon: TrendingDown, value: "↓87%", label: "redução em tarefas manuais" },
    { icon: DollarSign, value: "R$180k", label: "em glosas recuperadas" },
  ];

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 sm:pt-24 pb-16"
      style={{
        backgroundImage: `url(${techHeroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/80"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-white">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Copy */}
          <div className="text-center lg:text-left">
            {/* Eyebrow */}
            <AnimatedSection animation="slideUp" delay={0}>
              <span className="inline-block px-4 py-1.5 mb-5 text-xs sm:text-sm font-medium tracking-wide uppercase rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white">
                Transformação Digital Estratégica — Rio de Janeiro
              </span>
            </AnimatedSection>

            {/* Headline */}
            <AnimatedSection animation="slideUp" delay={100}>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight">
                Pare de perder dinheiro com{" "}
                <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  processos manuais.
                </span>
              </h1>
            </AnimatedSection>

            {/* Subtitle */}
            <AnimatedSection animation="slideUp" delay={200}>
              <p className="text-base sm:text-lg md:text-xl mb-8 text-white/90 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A Nexum Tecnologia transforma operações ineficientes em sistemas
                inteligentes. Automação, BI, IA e Desenvolvimento — integrados para
                empresas que querem crescer com controle e previsibilidade.
              </p>
            </AnimatedSection>

            {/* CTAs */}
            <AnimatedSection animation="slideUp" delay={300}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center mb-6">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => scrollTo("#contato")}
                  className="group w-full sm:w-auto min-h-[48px]"
                >
                  Solicitar Diagnóstico Gratuito
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  onClick={() => scrollTo("#projetos")}
                  className="w-full sm:w-auto min-h-[48px]"
                >
                  Ver Cases
                </Button>
              </div>
            </AnimatedSection>

            {/* Social proof */}
            <AnimatedSection animation="fadeIn" delay={400}>
              <ul className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-white/90">
                {socialProof.map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-white shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          {/* Right: Floating metrics card */}
          <AnimatedSection animation="scaleIn" delay={300}>
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="absolute -inset-2 bg-white/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/25 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <div className="text-xs uppercase tracking-widest text-white/70 mb-5 text-center lg:text-left">
                  Resultados reais
                </div>
                <div className="space-y-5">
                  {metrics.map(({ icon: Icon, value, label }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/15 border border-white/20 shrink-0">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-bold leading-none">
                          {value}
                        </div>
                        <div className="text-sm text-white/80 mt-1">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Scroll Indicator */}
      <AnimatedSection animation="fadeIn" delay={500}>
        <button
          onClick={() => scrollTo("#servicos")}
          aria-label="Rolar para serviços"
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-smooth animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </AnimatedSection>
    </section>
  );
};

export default Hero;
