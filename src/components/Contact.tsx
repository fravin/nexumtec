import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github, Send, Loader2, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AnimatedSection } from "@/components/AnimatedSection";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", subject: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", { body: formData });
      if (error) throw error;
      toast({ title: "Mensagem enviada com sucesso!", description: "Retornaremos em breve." });
      setFormData({ name: "", email: "", company: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou nos contate diretamente por e-mail.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl =
    "https://wa.me/5521981466912?text=" +
    encodeURIComponent("Olá! Vim do site da Nexum e quero agendar um diagnóstico.");

  const inputClass =
    "w-full px-4 py-3 bg-ink border border-white/[0.1] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40 transition-colors";

  return (
    <section id="contato" className="relative z-10 py-24 md:py-32 bg-ink-2">
      <div className="container mx-auto px-6 max-w-6xl">
        <AnimatedSection animation="slideUp">
          <div className="section-label mb-5">Vamos conversar</div>
          <h2 className="serif-display text-4xl md:text-6xl text-white mb-5">
            Solicite seu <em>diagnóstico</em>
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed mb-16">
            Conte sobre o desafio da sua operação. Respondemos em até 24h úteis.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-px bg-white/[0.06] border border-white/[0.06]">
          {/* Left: contact info */}
          <AnimatedSection animation="slideInLeft">
            <div className="bg-ink-2 p-8 md:p-10 h-full flex flex-col gap-7">
              <div>
                <h3 className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-gold mb-4">
                  Canais diretos
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:contato@nexumtec.com.br"
                    className="flex items-center gap-3 p-4 border border-white/[0.08] bg-ink hover:border-gold/40 transition-colors"
                  >
                    <Mail className="h-4 w-4 text-gold flex-shrink-0" />
                    <div>
                      <div className="font-mono text-[0.62rem] tracking-[0.15em] uppercase text-muted-foreground">E-mail</div>
                      <div className="text-sm text-white">contato@nexumtec.com.br</div>
                    </div>
                  </a>
                  <a
                    href="tel:+5521981466912"
                    className="flex items-center gap-3 p-4 border border-white/[0.08] bg-ink hover:border-gold/40 transition-colors"
                  >
                    <Phone className="h-4 w-4 text-gold flex-shrink-0" />
                    <div>
                      <div className="font-mono text-[0.62rem] tracking-[0.15em] uppercase text-muted-foreground">Telefone</div>
                      <div className="text-sm text-white">+55 (21) 98146-6912</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 p-4 border border-white/[0.08] bg-ink">
                    <MapPin className="h-4 w-4 text-gold flex-shrink-0" />
                    <div>
                      <div className="font-mono text-[0.62rem] tracking-[0.15em] uppercase text-muted-foreground">Localização</div>
                      <div className="text-sm text-white">Rio de Janeiro — RJ</div>
                    </div>
                  </div>
                </div>
              </div>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="lg" className="w-full">
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </Button>
              </a>

              <div className="border-t border-white/[0.06] pt-6">
                <h4 className="font-mono text-[0.68rem] tracking-[0.18em] uppercase text-muted-foreground mb-3">
                  Redes
                </h4>
                <div className="flex gap-2">
                  <a
                    href="https://www.linkedin.com/in/flaviodesouza10/"
                    target="_blank" rel="noopener noreferrer"
                    className="nav-inline p-3 border border-white/[0.08] text-muted-foreground hover:border-gold hover:text-gold transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="https://github.com/flaviodesouza10"
                    target="_blank" rel="noopener noreferrer"
                    className="nav-inline p-3 border border-white/[0.08] text-muted-foreground hover:border-gold hover:text-gold transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground">
                    Disponível para novos projetos
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: form */}
          <AnimatedSection animation="slideInRight">
            <div className="bg-ink p-8 md:p-10">
              <h3 className="serif-display text-2xl md:text-3xl text-white mb-6">
                Envie sua mensagem
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block font-mono text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground mb-2">
                      Nome *
                    </label>
                    <input id="name" name="name" required type="text" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Seu nome" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-mono text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground mb-2">
                      E-mail *
                    </label>
                    <input id="email" name="email" required type="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="seu@email.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block font-mono text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground mb-2">
                    Empresa
                  </label>
                  <input id="company" name="company" type="text" value={formData.company} onChange={handleChange} className={inputClass} placeholder="Nome da empresa" />
                </div>
                <div>
                  <label htmlFor="subject" className="block font-mono text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground mb-2">
                    Assunto *
                  </label>
                  <input id="subject" name="subject" required type="text" value={formData.subject} onChange={handleChange} className={inputClass} placeholder="Como podemos ajudar?" />
                </div>
                <div>
                  <label htmlFor="message" className="block font-mono text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground mb-2">
                    Mensagem *
                  </label>
                  <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Conte sobre seu desafio ou objetivo..." />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full group" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />Enviando...</>
                  ) : (
                    <><Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />Solicitar Diagnóstico</>
                  )}
                </Button>
                <p className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-muted-foreground/70 text-center">
                  * Campos obrigatórios · seus dados são protegidos
                </p>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
