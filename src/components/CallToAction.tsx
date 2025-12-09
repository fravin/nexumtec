import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageCircle } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-secondary/10 to-primary/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-hero text-white shadow-glow border-0 overflow-hidden">
            <CardContent className="p-12 md:p-16 relative">
              <div className="absolute inset-0 bg-[url('/tech-hero-bg.jpg')] bg-cover bg-center opacity-10"></div>
              <div className="relative z-10">
                <MessageCircle className="h-16 w-16 mx-auto mb-6 text-white/80" />
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Vamos Transformar Seus Processos?
                </h2>
                <p className="text-xl leading-relaxed mb-8 text-white/90 max-w-3xl mx-auto">
                  Se você acredita que sua empresa pode se beneficiar de uma abordagem mais estratégica, 
                  organizada e baseada em dados, estou à disposição para uma conversa. Vamos encontrar 
                  juntos as melhores soluções para os seus desafios.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })}
                    className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:shadow-glow transition-smooth transform hover:scale-105 flex items-center space-x-2 group"
                  >
                    <span>Agende uma Conversa</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-white/80 text-sm">
                    Diagnóstico inicial sem compromisso
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;