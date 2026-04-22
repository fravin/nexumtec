import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const AboutSummary = () => {
  return (
    <section id="sobre-resumo" className="py-12 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <Card className="glass shadow-lg max-w-5xl mx-auto overflow-hidden">
          <CardContent className="p-6 md:p-10">
            <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
              {/* Photo */}
              <AnimatedSection animation="scaleIn" delay={0}>
                <div className="relative mx-auto">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full opacity-75 blur-sm"></div>
                  <img
                    src="/lovable-uploads/f99c685c-3957-4643-a4d6-0abf73d8f016.png"
                    alt="Flávio Admilson - Fundador da Nexum Tecnologia"
                    className="relative w-[200px] h-[200px] object-cover object-top rounded-full border-4 border-background shadow-xl mx-auto"
                    loading="lazy"
                  />
                </div>
              </AnimatedSection>

              {/* Text */}
              <AnimatedSection animation="slideInRight" delay={100}>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    Quem está por trás da <span className="gradient-text">Nexum</span>
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                    Mais de 15 anos transformando processos no setor de saúde. Da feira livre à
                    Análise de Dados, minha jornada uniu visão de negócio com tecnologia para
                    entregar resultados reais.
                  </p>

                  {/* Mini stats */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold gradient-text">15+</span>
                      <span className="text-muted-foreground">anos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold gradient-text">20+</span>
                      <span className="text-muted-foreground">projetos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold gradient-text">100%</span>
                      <span className="text-muted-foreground">foco em ROI</span>
                    </div>
                  </div>

                  <Link to="/sobre">
                    <Button variant="hero" size="lg" className="group">
                      Conheça minha jornada completa
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSummary;
