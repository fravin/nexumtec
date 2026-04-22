import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const Sobre = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Compact page hero */}
      <section className="pt-28 sm:pt-32 pb-12 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/80 text-white">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection animation="slideUp" delay={0}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Minha Jornada</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Da feira livre à Análise de Dados: a história por trás da Nexum Tecnologia.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <About />
      <Timeline />
      <Skills />

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-secondary/30 to-background">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection animation="scaleIn" delay={0}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Vamos transformar sua empresa?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Conheça os serviços que posso oferecer ou fale comigo diretamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#servicos">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Ver Serviços
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/#contato">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Fale Comigo
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default Sobre;
