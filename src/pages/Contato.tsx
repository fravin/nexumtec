import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Mail, Phone, MapPin, MessageCircle, Send, Loader2, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP = "5521981466912";
const SITE = "https://www.nexumtec.com.br";

const projectTypes = ["Site institucional", "Landing page", "Site para clínica", "Catálogo digital", "Portfólio profissional", "Automação / sistema", "Outro"];

const schema = z.object({
  name: z.string().trim().min(1, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().max(30),
  company: z.string().trim().max(120),
  projectType: z.string().trim().max(60),
  message: z.string().trim().min(1, "Escreva sua mensagem").max(2000),
});
type Form = z.infer<typeof schema>;
const empty: Form = { name: "", email: "", phone: "", company: "", projectType: "", message: "" };

const faqs = [
  ["A Nexum cria sites para empresas do Rio de Janeiro?", "Sim. A Nexum Tecnologia é do Rio de Janeiro e cria sites profissionais para empresas, clínicas e profissionais da cidade e do estado, com atendimento remoto para todo o Brasil."],
  ["Como recebo um orçamento de criação de site?", "Envie sua mensagem pelo formulário ou WhatsApp contando sobre seu negócio e objetivo. Retornamos para entender o escopo e apresentar uma proposta."],
  ["O site fica bom no celular e aparece no Google?", "Todo site é pensado para celular, tablet e computador, com estrutura de títulos, descrições e dados organizados para buscadores."],
  ["Vocês também fazem sites para clínicas?", "Sim. Temos experiência em saúde e criamos sites para clínicas com especialidades, equipe e informações de atendimento bem organizadas."],
];

const schemaLd = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contato — Criação de Sites no Rio de Janeiro",
    url: `${SITE}/contato`,
    about: { "@id": `${SITE}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE}/contato#localbusiness`,
    name: "Nexum Tecnologia — Criação de Sites no Rio de Janeiro",
    url: `${SITE}/criacao-de-sites`,
    email: "contato@nexumtec.com.br",
    telephone: "+55-21-98146-6912",
    address: { "@type": "PostalAddress", addressLocality: "Rio de Janeiro", addressRegion: "RJ", addressCountry: "BR" },
    areaServed: [{ "@type": "City", name: "Rio de Janeiro" }, { "@type": "Country", name: "Brasil" }],
    parentOrganization: { "@id": `${SITE}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  },
];

const Contato = () => {
  const { toast } = useToast();
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<Form | null>(null);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const waLink = (f: Form | null) => {
    const text = f
      ? `Olá, Nexum! Sou ${f.name}${f.company ? ` (${f.company})` : ""}. ${f.projectType ? `Interesse: ${f.projectType}. ` : ""}${f.message}`
      : "Olá, Nexum! Quero conversar sobre a criação de um site.";
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text.slice(0, 1500))}`;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Partial<Record<keyof Form, string>> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof Form] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);
    const { error } = await supabase.functions.invoke("send-contact-email", {
      body: { ...r.data, subject: r.data.projectType || "Contato pelo site", source: "pagina-contato" },
    });
    setSending(false);
    if (error) {
      toast({ title: "Erro ao enviar", description: "Tente novamente ou fale pelo WhatsApp.", variant: "destructive" });
      return;
    }
    setSent(r.data as Form);
    setForm(empty);
  };

  const input = "w-full min-h-11 px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors";
  const label = "block text-xs tracking-[0.14em] uppercase text-muted-foreground mb-2";
  const err = (k: keyof Form) => errors[k] && <p className="text-xs text-destructive mt-1">{errors[k]}</p>;

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Contato | Criação de Sites no Rio de Janeiro — Nexum"
        description="Fale com a Nexum Tecnologia: criação de sites profissionais no Rio de Janeiro para empresas e clínicas. Solicite um orçamento pelo formulário ou WhatsApp."
        path="/contato"
        jsonLd={schemaLd}
      />
      <Header />
      <main className="pt-28 md:pt-36 pb-24">
        <section className="container mx-auto px-5 sm:px-6 max-w-6xl">
          <div className="section-label mb-5">Contato · Rio de Janeiro — RJ</div>
          <h1 className="serif-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-5 max-w-4xl">
            Fale com a Nexum — <em>Criação de Sites no Rio de Janeiro</em>
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-12">
            Sites profissionais para empresas, clínicas e profissionais do Rio de Janeiro, com atendimento remoto para todo o Brasil.
            Conte sobre o seu projeto e retornamos com os próximos passos.
          </p>

          <div className="grid md:grid-cols-[1fr_1.5fr] gap-px bg-border border border-border">
            <aside className="bg-card p-6 sm:p-8 flex flex-col gap-4">
              <a href="mailto:contato@nexumtec.com.br" className="flex items-center gap-3 p-4 border border-border hover:border-primary/40 transition-colors">
                <Mail className="h-4 w-4 text-primary" /><span className="text-sm">contato@nexumtec.com.br</span>
              </a>
              <a href="tel:+5521981466912" className="flex items-center gap-3 p-4 border border-border hover:border-primary/40 transition-colors">
                <Phone className="h-4 w-4 text-primary" /><span className="text-sm">+55 (21) 98146-6912</span>
              </a>
              <div className="flex items-center gap-3 p-4 border border-border">
                <MapPin className="h-4 w-4 text-primary" /><span className="text-sm">Rio de Janeiro — RJ · atendimento remoto</span>
              </div>
              <a href={waLink(null)} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="lg" className="w-full"><MessageCircle className="h-4 w-4" />Falar no WhatsApp</Button>
              </a>
              <Link to="/criacao-de-sites" className="text-sm text-primary hover:underline mt-2">
                Veja formatos e modelos de sites →
              </Link>
            </aside>

            <div className="bg-background p-6 sm:p-8">
              {sent ? (
                <div className="flex flex-col items-start gap-4 py-6" role="status">
                  <CheckCircle2 className="h-10 w-10 text-accent" />
                  <h2 className="serif-display text-3xl text-foreground">Mensagem recebida!</h2>
                  <p className="text-muted-foreground">Obrigado, {sent.name}. Sua mensagem chegou à Nexum. Quer agilizar? Envie também pelo WhatsApp.</p>
                  <a href={waLink(sent)} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button variant="hero" size="lg" className="w-full"><MessageCircle className="h-4 w-4" />Enviar também pelo WhatsApp</Button>
                  </a>
                  <Button variant="outline" onClick={() => setSent(null)}>Enviar outra mensagem</Button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5" noValidate>
                  <h2 className="serif-display text-2xl md:text-3xl text-foreground">Solicite seu orçamento</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label htmlFor="name" className={label}>Nome *</label><input id="name" name="name" value={form.name} onChange={set} className={input} maxLength={100} />{err("name")}</div>
                    <div><label htmlFor="email" className={label}>E-mail *</label><input id="email" name="email" type="email" value={form.email} onChange={set} className={input} maxLength={255} />{err("email")}</div>
                    <div><label htmlFor="phone" className={label}>Telefone / WhatsApp</label><input id="phone" name="phone" type="tel" value={form.phone} onChange={set} className={input} maxLength={30} /></div>
                    <div><label htmlFor="company" className={label}>Empresa</label><input id="company" name="company" value={form.company} onChange={set} className={input} maxLength={120} /></div>
                  </div>
                  <div>
                    <label htmlFor="projectType" className={label}>Tipo de projeto</label>
                    <select id="projectType" name="projectType" value={form.projectType} onChange={set} className={input}>
                      <option value="">Selecione</option>
                      {projectTypes.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div><label htmlFor="message" className={label}>Mensagem *</label><textarea id="message" name="message" rows={5} value={form.message} onChange={set} className={`${input} resize-none`} maxLength={2000} placeholder="Conte sobre seu negócio e o que o site precisa fazer..." />{err("message")}</div>
                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={sending}>
                    {sending ? <><Loader2 className="h-4 w-4 animate-spin" />Enviando...</> : <><Send className="h-4 w-4" />Enviar mensagem</>}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-5 sm:px-6 max-w-4xl mt-24">
          <h2 className="serif-display text-3xl md:text-4xl text-foreground mb-8">Perguntas sobre criação de sites no Rio de Janeiro</h2>
          <Accordion type="single" collapsible>
            {faqs.map(([q, a]) => (
              <AccordionItem key={q} value={q}><AccordionTrigger className="text-left">{q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{a}</AccordionContent></AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default Contato;
