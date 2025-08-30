import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonial = {
    text: "O Flávio tem uma capacidade única de entender os desafios do negócio e traduzi-los em soluções tecnológicas práticas. Sua proatividade na otimização de processos e sua habilidade em gerenciar o sistema ERP foram fundamentais para a nossa operação. Além de tudo, sua atitude positiva contagia a equipe.",
    author: "Wellington Xavier",
    position: "Centro Trauma",
    avatar: "/lovable-uploads/a541acc1-0504-4ec6-872c-8e79e5919821.png"
  };

  return (
    <section id="depoimentos" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            O que Dizem Sobre <span className="gradient-text">Meu Trabalho</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A confiança dos colegas e líderes é o reflexo do impacto real que gero nos projetos
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card shadow-glow border-0">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-start space-x-4">
                <Quote className="h-12 w-12 text-primary flex-shrink-0 mt-2" />
                <div className="flex-1">
                  <blockquote className="text-lg md:text-xl leading-relaxed text-foreground mb-6 italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div>
                      <h4 className="font-bold text-lg text-foreground">{testimonial.author}</h4>
                      <p className="text-muted-foreground">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;