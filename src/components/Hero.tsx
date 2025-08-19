import { Button } from "@/components/ui/button";
import { ChevronDown, Download, Mail } from "lucide-react";
import techHeroBg from "@/assets/tech-hero-bg.jpg";

const Hero = () => {
  const scrollToNext = () => {
    const element = document.querySelector("#sobre");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="inicio"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${techHeroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/80"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-float">
            Nexum Tecnologia
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 font-light">
            Conectando Pessoas, Dados e Processos para Gerar Resultados
          </p>

          {/* Introduction Quote */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-white/20">
            <p className="text-lg md:text-xl leading-relaxed text-white/95 italic">
              "Olá, sou <span className="font-semibold text-white">Flávio Admilson</span>. 
              Um Analista de Sistemas e futuro Cientista de Dados com uma jornada única: 
              da negociação na feira livre à otimização de processos no setor da saúde. 
              Meu propósito é usar a tecnologia para simplificar desafios complexos e 
              impulsionar o crescimento do seu negócio."
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              variant="glass" 
              size="lg"
              onClick={scrollToNext}
              className="group"
            >
              <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Conheça minha jornada
            </Button>
            <Button 
              variant="hero" 
              size="lg"
              onClick={scrollToContact}
              className="group"
            >
              <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Fale Comigo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-white">14+</div>
              <div className="text-white/80">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-white">100%</div>
              <div className="text-white/80">Foco em Resultados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-smooth animate-bounce"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;