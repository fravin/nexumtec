import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { healthExamples, websiteExamples } from "@/content/websiteCreation";

const WHATSAPP = "5521981466912";
const DRAFT_KEY = "nexum-briefing-draft";

const projectTypes = ["Site institucional", "Landing page", "Site para clínica / profissional da saúde", "Loja / catálogo digital", "Sistema sob medida", "Automação / IA", "Outro"];
const siteTypes = projectTypes.slice(0, 4);
const segments = ["Fisioterapia", "Psicologia", "Educação física", "Personal trainer", "Nutrição", "Clínica médica / odontológica", "Arquitetura / engenharia", "Consultoria / serviços", "Comércio / varejo", "Indústria", "Outro"];
const sizes = ["Profissional autônomo", "2 a 10 pessoas", "11 a 50 pessoas", "Mais de 50 pessoas"];
const goals = ["Gerar mais contatos", "Receber agendamentos", "Vender online", "Passar mais credibilidade", "Reduzir tarefas manuais", "Organizar a gestão / dados"];
const sitePages = ["Início", "Sobre", "Serviços", "Equipe", "Blog", "Depoimentos", "Galeria / portfólio", "Contato", "Área do cliente"];
const integrations = ["WhatsApp", "Agenda online", "Pagamento", "Nota fiscal (NFSe)", "CRM", "Planilhas / ERP", "Instagram"];
const styles = ["Clean e minimalista", "Acolhedor e humano", "Moderno e tecnológico", "Sofisticado / premium", "Colorido e vibrante"];
const deadlines = ["O quanto antes", "Até 1 mês", "1 a 3 meses", "Sem pressa"];
const budgets = ["Prefiro conversar", "Até R$ 3 mil", "R$ 3 mil a R$ 8 mil", "R$ 8 mil a R$ 20 mil", "Acima de R$ 20 mil"];
const times = ["Manhã", "Tarde", "Noite", "Qualquer horário"];

type Data = Record<string, string | string[]>;
const initial: Data = { projectType: "", company: "", segment: "", city: "", years: "", size: "", hasSite: "", siteUrl: "", instagram: "", goals: [], audience: "", differentials: "", references: "", pages: [], integrations: [], hasLogo: "", hasContent: "", style: "", currentProcess: "", users: "", pains: "", name: "", email: "", phone: "", deadline: "", budget: "", contactTime: "" };

const stepTitles = ["Projeto", "Empresa", "Objetivos e público", "Escopo e conteúdo", "Contato e prazo"];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(8, "Informe seu WhatsApp").max(30),
});

const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v.join(", ") : v || "");

const Briefing = () => {
  const [params] = useSearchParams();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(() => {
    try { const d = localStorage.getItem(DRAFT_KEY); if (d) return { ...initial, ...JSON.parse(d) }; } catch { /* ignore */ }
    return initial;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = params.get("tipo");
    if (t && !data.projectType) setData(d => ({ ...d, projectType: t === "sistema" ? "Sistema sob medida" : "Site institucional" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { if (!done) localStorage.setItem(DRAFT_KEY, JSON.stringify(data)); }, [data, done]);

  const isSite = siteTypes.includes(str(data.projectType));
  const set = (k: string, v: string) => setData(d => ({ ...d, [k]: v }));
  const toggle = (k: string, v: string) => setData(d => { const a = (d[k] as string[]) || []; return { ...d, [k]: a.includes(v) ? a.filter(x => x !== v) : [...a, v] }; });

  const sections = useMemo(() => {
    const sec = (title: string, items: [string, string | string[]][]) => ({ title, items: items.map(([label, v]) => ({ label, value: str(v).slice(0, 1500) })).filter(i => i.value) });
    return [
      sec("Projeto", [["Tipo de projeto", data.projectType]]),
      sec("Empresa", [["Empresa", data.company], ["Segmento", data.segment], ["Cidade", data.city], ["Tempo de mercado", data.years], ["Porte", data.size], ["Já tem site", data.hasSite], ["Site atual", data.siteUrl], ["Instagram", data.instagram]]),
      sec("Objetivos e público", [["Objetivos", data.goals], ["Público-alvo", data.audience], ["Diferenciais", data.differentials], ["Concorrentes / referências", data.references]]),
      sec("Escopo e conteúdo", isSite
        ? [["Páginas desejadas", data.pages], ["Integrações", data.integrations], ["Tem logo", data.hasLogo], ["Tem textos e fotos", data.hasContent], ["Estilo visual", data.style]]
        : [["Processo atual", data.currentProcess], ["Quem vai usar", data.users], ["Principais dores", data.pains], ["Integrações", data.integrations]]),
      sec("Contato e prazo", [["Nome", data.name], ["E-mail", data.email], ["WhatsApp", data.phone], ["Prazo desejado", data.deadline], ["Investimento", data.budget], ["Melhor horário", data.contactTime]]),
    ].filter(s => s.items.length);
  }, [data, isSite]);

  const summaryText = sections.map(s => `*${s.title}*\n` + s.items.map(i => `• ${i.label}: ${i.value}`).join("\n")).join("\n\n");
  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá, Nexum! Acabei de preencher o briefing do meu projeto:\n\n${summaryText}`.slice(0, 3000))}`;

  const demo = useMemo(() => {
    if (!isSite) return null;
    const wantLp = str(data.projectType) === "Landing page";
    const health = healthExamples.filter(h => h.segment === data.segment);
    if (health.length) return health.find(h => (h.format === "Landing page de perfil") === wantLp) ?? health[0];
    if (str(data.projectType).includes("saúde") || str(data.segment).includes("Clínica")) return websiteExamples[0];
    return wantLp ? websiteExamples[2] : websiteExamples[1];
  }, [data, isSite]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 0 && !data.projectType) e.projectType = "Escolha o tipo de projeto";
    if (step === 1 && !str(data.company).trim()) e.company = "Informe o nome da empresa ou do negócio";
    if (step === 4) {
      const r = contactSchema.safeParse(data);
      if (!r.success) r.error.issues.forEach(i => (e[i.path[0] as string] = i.message));
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const next = () => { if (validate()) { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: "smooth" }); } };
  const back = () => { setErrors({}); setStep(s => s - 1); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const submit = async () => {
    if (!validate()) return;
    setSending(true);
    const { error } = await supabase.functions.invoke("send-contact-email", {
      body: {
        name: str(data.name), email: str(data.email), phone: str(data.phone), company: str(data.company).slice(0, 120),
        projectType: str(data.projectType).slice(0, 60), subject: `Briefing: ${str(data.projectType)} — ${str(data.company)}`.slice(0, 150),
        message: summaryText.slice(0, 2000), source: "briefing", briefing: sections,
      },
    });
    setSending(false);
    if (error) { toast({ title: "Erro ao enviar", description: "Tente novamente ou envie pelo WhatsApp.", variant: "destructive" }); return; }
    localStorage.removeItem(DRAFT_KEY);
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const input = "w-full min-h-11 px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors";
  const label = "block text-xs tracking-[0.14em] uppercase text-muted-foreground mb-2";
  const chip = (on: boolean) => `min-h-11 px-4 py-2 text-sm border transition-colors text-left ${on ? "border-primary bg-primary/10 text-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/50"}`;
  const err = (k: string) => errors[k] && <p className="text-xs text-destructive mt-1">{errors[k]}</p>;

  const Text = ({ k, l, ph, area, type = "text" }: { k: string; l: string; ph?: string; area?: boolean; type?: string }) => (
    <div>
      <label htmlFor={k} className={label}>{l}</label>
      {area
        ? <textarea id={k} rows={3} value={str(data[k])} onChange={e => set(k, e.target.value)} placeholder={ph} maxLength={1000} className={input} />
        : <input id={k} type={type} value={str(data[k])} onChange={e => set(k, e.target.value)} placeholder={ph} maxLength={k === "email" ? 255 : 200} className={input} />}
      {err(k)}
    </div>
  );
  const Single = ({ k, l, opts }: { k: string; l: string; opts: string[] }) => (
    <fieldset><legend className={label}>{l}</legend>
      <div className="flex flex-wrap gap-2">{opts.map(o => <button key={o} type="button" aria-pressed={data[k] === o} onClick={() => set(k, o)} className={chip(data[k] === o)}>{o}</button>)}</div>{err(k)}
    </fieldset>
  );
  const Multi = ({ k, l, opts }: { k: string; l: string; opts: string[] }) => (
    <fieldset><legend className={label}>{l} <span className="normal-case tracking-normal">(marque quantas quiser)</span></legend>
      <div className="flex flex-wrap gap-2">{opts.map(o => { const on = ((data[k] as string[]) || []).includes(o); return <button key={o} type="button" aria-pressed={on} onClick={() => toggle(k, o)} className={chip(on)}>{o}</button>; })}</div>
    </fieldset>
  );

  return (
    <div className="min-h-screen bg-background">
      <Seo title="Briefing de Projeto | Nexum Tecnologia" description="Conte sobre o seu negócio em poucos minutos e receba uma conversa estratégica da Nexum sobre criação de sites, sistemas e automações." path="/briefing" />
      <Header />
      <main className="pt-28 md:pt-36 pb-24">
        <section className="container mx-auto px-5 sm:px-6 max-w-4xl">
          <div className="section-label mb-5">Briefing estratégico</div>
          <h1 className="serif-display text-4xl sm:text-5xl text-foreground mb-4">{done ? "Briefing recebido." : <>Conte sobre o seu <em>projeto</em></>}</h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-10">
            {done ? `Obrigado, ${str(data.name).split(" ")[0]}. Já temos o que precisamos para preparar a próxima conversa.` : "Leva cerca de 5 minutos. Com essas respostas, chegamos à primeira conversa já entendendo o seu negócio."}
          </p>

          {done ? (
            <div className="space-y-px bg-border border border-border">
              <div className="bg-card p-6 sm:p-8">
                <CheckCircle2 className="h-8 w-8 text-accent mb-4" />
                <p className="text-foreground mb-5">Quer agilizar? Envie o resumo também pelo WhatsApp.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={waLink} target="_blank" rel="noopener noreferrer"><Button variant="hero" size="lg" className="w-full"><MessageCircle className="h-4 w-4" />Enviar resumo pelo WhatsApp</Button></a>
                  <Link to="/criacao-de-sites"><Button variant="outline" size="lg" className="w-full">Ver mais modelos</Button></Link>
                </div>
              </div>
              {demo && (
                <div className="bg-card p-6 sm:p-8">
                  <div className="section-label mb-3">Prévia demonstrativa</div>
                  <h2 className="serif-display text-2xl md:text-3xl text-foreground mb-2">Um ponto de partida para {str(data.company)}</h2>
                  <p className="text-sm text-muted-foreground mb-5">Modelo da nossa galeria que mais combina com o que você contou. O projeto final é criado do zero para a sua marca.</p>
                  <figure className="relative border border-border overflow-hidden">
                    <div className="absolute top-12 right-3 z-10 bg-background/90 border border-border px-3 py-1 text-xs text-foreground">Modelo demonstrativo</div>
                    <div className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">{str(data.company)} · {str(data.segment) || demo.category}</div>
                    <img src={demo.image} alt={`Modelo demonstrativo ${demo.name}`} loading="lazy" className="w-full h-auto" />
                  </figure>
                </div>
              )}
              <div className="bg-card p-6 sm:p-8">
                <h2 className="serif-display text-2xl text-foreground mb-4">Resumo do briefing</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {sections.map(s => (
                    <div key={s.title}><h3 className="text-sm font-semibold text-primary mb-2">{s.title}</h3>
                      <dl className="space-y-1 text-sm">{s.items.map(i => <div key={i.label}><dt className="inline text-muted-foreground">{i.label}: </dt><dd className="inline text-foreground">{i.value}</dd></div>)}</dl>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border p-6 sm:p-8">
              <div className="mb-8">
                <div className="flex justify-between text-xs text-muted-foreground mb-2"><span>Etapa {step + 1} de 5 · {stepTitles[step]}</span><span>{Math.round(((step + 1) / 5) * 100)}%</span></div>
                <div className="h-1 bg-muted"><div className="h-1 bg-primary transition-all" style={{ width: `${((step + 1) / 5) * 100}%` }} /></div>
              </div>

              <div className="space-y-6">
                {step === 0 && Single({ k: "projectType", l: "O que você quer criar?", opts: projectTypes })}
                {step === 1 && <>
                  {Text({ k: "company", l: "Nome da empresa ou negócio *" })}
                  {Single({ k: "segment", l: "Segmento", opts: segments })}
                  <div className="grid sm:grid-cols-2 gap-4">{Text({ k: "city", l: "Cidade", ph: "Rio de Janeiro" })}{Text({ k: "years", l: "Tempo de mercado", ph: "Ex.: 3 anos" })}</div>
                  {Single({ k: "size", l: "Porte", opts: sizes })}
                  {Single({ k: "hasSite", l: "Já tem site?", opts: ["Sim", "Não"] })}
                  <div className="grid sm:grid-cols-2 gap-4">{Text({ k: "siteUrl", l: "Site atual", ph: "www..." })}{Text({ k: "instagram", l: "Instagram", ph: "@seunegocio" })}</div>
                </>}
                {step === 2 && <>
                  {Multi({ k: "goals", l: "Objetivo principal", opts: goals })}
                  {Text({ k: "audience", l: "Quem é o seu público?", area: true, ph: "Ex.: mulheres de 30 a 50 anos na Zona Sul que buscam..." })}
                  {Text({ k: "differentials", l: "O que diferencia você da concorrência?", area: true })}
                  {Text({ k: "references", l: "Concorrentes ou sites que você admira", area: true, ph: "Links ou nomes" })}
                </>}
                {step === 3 && (isSite ? <>
                  {Multi({ k: "pages", l: "Páginas desejadas", opts: sitePages })}
                  {Multi({ k: "integrations", l: "Integrações", opts: integrations })}
                  {Single({ k: "hasLogo", l: "Já tem logo?", opts: ["Sim", "Não", "Quero renovar"] })}
                  {Single({ k: "hasContent", l: "Já tem textos e fotos?", opts: ["Sim", "Parcialmente", "Não"] })}
                  {Single({ k: "style", l: "Estilo visual preferido", opts: styles })}
                </> : <>
                  {Text({ k: "currentProcess", l: "Como o processo funciona hoje?", area: true, ph: "Ex.: controlamos tudo em planilhas e WhatsApp..." })}
                  {Text({ k: "users", l: "Quem vai usar o sistema e quantas pessoas?" })}
                  {Text({ k: "pains", l: "Quais as maiores dores ou retrabalhos?", area: true })}
                  {Multi({ k: "integrations", l: "Integrações", opts: integrations })}
                </>)}
                {step === 4 && <>
                  <div className="grid sm:grid-cols-2 gap-4">{Text({ k: "name", l: "Seu nome *" })}{Text({ k: "email", l: "E-mail *", type: "email" })}</div>
                  {Text({ k: "phone", l: "WhatsApp *", type: "tel", ph: "(21) 9..." })}
                  {Single({ k: "deadline", l: "Prazo desejado", opts: deadlines })}
                  {Single({ k: "budget", l: "Faixa de investimento (opcional)", opts: budgets })}
                  {Single({ k: "contactTime", l: "Melhor horário para contato", opts: times })}
                </>}
              </div>

              <div className="mt-10 flex flex-col-reverse sm:flex-row justify-between gap-3">
                {step > 0 ? <Button type="button" variant="outline" size="lg" onClick={back}><ArrowLeft className="h-4 w-4" />Voltar</Button> : <span />}
                {step < 4
                  ? <Button type="button" variant="hero" size="lg" onClick={next}>Avançar<ArrowRight className="h-4 w-4" /></Button>
                  : <Button type="button" variant="hero" size="lg" onClick={submit} disabled={sending}>{sending ? <><Loader2 className="h-4 w-4 animate-spin" />Enviando...</> : <><Send className="h-4 w-4" />Enviar briefing</>}</Button>}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default Briefing;
