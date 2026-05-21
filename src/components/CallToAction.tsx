import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageCircle, Check } from "lucide-react";

const CallToAction = () => {
  const whatsappUrl =
    "https://wa.me/5521981466912?text=" +
    encodeURIComponent("Olá! Quero agendar um diagnóstico gratuito com a Nexum.");

  const guarantees = [
    "Sem compromisso",
    "Resposta em 24h",
    "Presencial ou remoto",
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-secondary/10 to-primary/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-hero text-white shadow-glow border-0 overflow-hidden">
            <CardContent className="p-12 md:p-16 relative">
              <div className="absolute inset-0 bg-[url('/tech-hero-bg.jpg')] bg-cover bg-center opacity-10"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  A primeira conversa é gratuita.
                </h2>
                <p className="text-xl leading-relaxed mb-8 text-white/90 max-w-3xl mx-auto">
                  30–45 minutos. Você sai com clareza sobre onde está perdendo
                  eficiência e o que pode ser automatizado — mesmo que não contrate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" })}
                    className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:shadow-glow transition-smooth transform hover:scale-105 flex items-center space-x-2 group min-h-[48px]"
                  >
                    <span>Agendar Diagnóstico Gratuito</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white/60 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-smooth flex items-center space-x-2 min-h-[48px]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
                <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-sm text-white/90">
                  {guarantees.map((g) => (
                    <li key={g} className="flex items-center gap-1.5">
                      <Check className="h-4 w-4 shrink-0" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
