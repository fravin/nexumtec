import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Linkedin } from "lucide-react";

const CallToAction = () => {
  const whatsappUrl =
    "https://wa.me/5521981466912?text=" +
    encodeURIComponent("Olá! Quero agendar um diagnóstico gratuito com a Nexum.");

  return (
    <section className="relative z-10 py-28 md:py-36 bg-ink overflow-hidden">
      {/* Gold radial glow at the bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, hsl(36 45% 61% / 0.10), transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
        <div className="section-label justify-center mb-6 inline-flex">
          Próximo passo
        </div>
        <h2 className="serif-display text-foreground text-4xl md:text-6xl mb-6">
          Pronto para transformar
          <br />sua operação <em>com dados e IA?</em>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          Diagnóstico gratuito de 30 a 45 minutos. Atendimento consultivo — sem SDR,
          sem enrolação. Você sai com clareza sobre onde está perdendo eficiência.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="lg">
              <MessageCircle className="h-4 w-4" />
              WhatsApp — resposta imediata
            </Button>
          </a>
          <a href="mailto:contato@nexumtec.com.br">
            <Button variant="glass" size="lg">
              <Mail className="h-4 w-4" />
              Enviar e-mail
            </Button>
          </a>
          <a
            href="https://www.linkedin.com/in/flaviodesouza10/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="glass" size="lg">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Button>
          </a>
        </div>
        <p className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-muted-foreground">
          contato@nexumtec.com.br &nbsp;·&nbsp; +55 (21) 98146-6912 &nbsp;·&nbsp; Rio de Janeiro — RJ
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
