import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  MessageCircle,
  Stethoscope,
  ClipboardList,
  Activity,
  Pill,
  HeartPulse,
  ShieldCheck,
  Users,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import AIChatbot from "@/components/AIChatbot";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const colaboracoes = [
  {
    icon: ClipboardList,
    title: "Faturamento sem dor de cabeça",
    desc: "TISS/TUSS organizados, conferência de guias em tempo real e fechamento de mês mais rápido. Sua equipe para de correr atrás de papel e passa a acompanhar números.",
  },
  {
    icon: Activity,
    title: "Glosas que viram receita",
    desc: "Auditoria do que foi glosado, recursos no prazo e indicadores claros para você saber exatamente onde o convênio está deixando de pagar — e por quê.",
  },
  {
    icon: HeartPulse,
    title: "Agenda, prontuário e paciente",
    desc: "Sistema único para marcação, prontuário eletrônico exportável em PDF e lembretes automáticos. Menos falta, mais tempo de consulta de qualidade.",
  },
  {
    icon: Pill,
    title: "Estoque e compras sob controle",
    desc: "Fim das planilhas que ninguém atualiza. Alertas de validade, ponto de pedido automático e rastreabilidade de cada item — do recebimento ao uso no paciente.",
  },
];

const antesDepois = [
  {
    antes: "Planilha que ninguém atualiza no fim do dia.",
    depois: "Painel atualizado em tempo real, no celular ou no consultório.",
  },
  {
    antes: "Glosa só descoberta no fechamento do mês.",
    depois: "Alerta no momento do lançamento — antes de virar prejuízo.",
  },
  {
    antes: "Prontuário em papel, difícil de localizar.",
    depois: "Prontuário digital, com histórico completo e exportável em PDF.",
  },
  {
    antes: "Estoque com material vencendo na prateleira.",
    depois: "Alerta de validade e sugestão automática de compra.",
  },
  {
    antes: "Indicadores feitos no Excel, uma vez por mês.",
    depois: "Indicadores clínicos e financeiros sempre vivos.",
  },
];

const paraQuem = [
  {
    icon: Stethoscope,
    title: "Consultórios e clínicas pequenas",
    desc: "Que querem sair da planilha e profissionalizar a gestão sem complicar a rotina da recepção.",
  },
  {
    icon: Users,
    title: "Clínicas médias e redes",
    desc: "Que precisam padronizar unidades, controlar faturamento de convênios e ter visão única da operação.",
  },
  {
    icon: ShieldCheck,
    title: "Hospitais e operadoras",
    desc: "Que querem reduzir glosas, ter indicadores clínicos confiáveis e auditoria de ponta a ponta.",
  },
];

const casesSaude = [
  {
    tag: "Faturamento e glosas",
    title: "Sistema de Faturamento e Gestão de Glosas",
    kpi: "R$ 34k+/mês sob controle · 260+ procedimentos",
    desc: "Substituímos planilhas por uma plataforma única, auditável, com rastreabilidade total de recursos de glosa.",
  },
  {
    tag: "Análise preditiva",
    title: "Análise Preditiva de Vendas — Rede de Saúde",
    kpi: "R$ 77,5M analisados · 40% mais eficiência",
    desc: "Dashboard com BI e análise preditiva deu à liderança visibilidade comercial e capacidade de antecipar tendências.",
  },
  {
    tag: "Clínica em produção",
    title: "Gestão Completa para Clínica de Fisioterapia",
    kpi: "Agenda + prontuário + pacotes",
    desc: "Sistema em produção eliminando planilhas e controles manuais — prontuário exportável e acesso seguro 24/7.",
  },
];

const passos = [
  {
    n: "01",
    title: "Conversa de diagnóstico",
    desc: "Bate-papo gratuito de 30 minutos para entender sua rotina, seus números e onde dói mais.",
  },
  {
    n: "02",
    title: "Mapeamento dos gargalos",
    desc: "Visito (ou conecto remoto), escuto a equipe e mostro em um documento simples o que dá para melhorar.",
  },
  {
    n: "03",
    title: "Implementação com a equipe",
    desc: "Não entrego só o software. Treinamos quem opera, ajustamos no dia a dia e respeitamos o tempo da clínica.",
  },
  {
    n: "04",
    title: "Acompanhamento e ajustes",
    desc: "Suporte próximo, ajustes finos e novos indicadores conforme sua operação amadurece.",
  },
];

const faqs = [
  {
    q: "Preciso trocar todo o meu sistema atual?",
    a: "Não. Em muitos casos a Nexum complementa o que já existe — automatizando o que é planilha, organizando dados de faturamento e criando indicadores em cima do sistema que você já usa.",
  },
  {
    q: "Funciona para clínica pequena, com poucos profissionais?",
    a: "Sim. Começamos com o que é prioridade (geralmente agenda, prontuário e faturamento) e crescemos junto com a clínica, sem cobrar por funcionalidade que você ainda não precisa.",
  },
  {
    q: "Vocês atendem LGPD?",
    a: "Sim. Todos os sistemas são desenvolvidos com autenticação, controle de acesso por perfil, criptografia em trânsito e rastreabilidade — base para uma operação aderente à LGPD na saúde.",
  },
  {
    q: "Como é a cobrança?",
    a: "Trabalhamos por projeto fechado ou por mensalidade de uso e suporte, sempre com proposta transparente. Nada de surpresa no fim do mês.",
  },
  {
    q: "Em quanto tempo eu vejo resultado?",
    a: "Ganhos rápidos (organização de faturamento, fim de planilha crítica) aparecem nas primeiras semanas. Ganhos estruturais (queda de glosa, indicadores clínicos) maturam entre 60 e 90 dias.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Nexum Tecnologia — Saúde",
  description:
    "Tecnologia humanizada para clínicas e hospitais: faturamento, glosas, prontuário, estoque e indicadores.",
  url: "https://www.nexumtec.com.br/saude",
  areaServed: "BR",
};

const Saude = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Tecnologia para clínicas e hospitais | Nexum Saúde</title>
        <meta
          name="description"
          content="Soluções práticas para clínicas, consultórios e hospitais: faturamento, glosas, prontuário, agenda e indicadores. 15+ anos de saúde aplicados à tecnologia."
        />
        <link rel="canonical" href="https://www.nexumtec.com.br/saude" />
        <meta property="og:title" content="Tecnologia para clínicas e hospitais | Nexum Saúde" />
        <meta
          property="og:description"
          content="Faturamento, glosas, prontuário e indicadores — tecnologia humanizada para quem cuida."
        />
        <meta property="og:url" content="https://www.nexumtec.com.br/saude" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 bg-background">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, hsl(210 33% 98%) 0%, hsl(180 28% 95%) 100%)",
            }}
          />
          <div className="relative container mx-auto px-4 sm:px-6 max-w-5xl text-center">
            <AnimatedSection animation="slideUp">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
                <Stethoscope className="h-3.5 w-3.5" />
                Nexum Saúde
              </span>
            </AnimatedSection>
            <AnimatedSection animation="slideUp" delay={100}>
              <h1 className="serif-display mt-7 text-[2.1rem] leading-[1.15] sm:text-5xl md:text-6xl text-foreground">
                Sua clínica funcionando melhor — para a <em>equipe</em> e para o{" "}
                <em>paciente</em>.
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="slideUp" delay={200}>
              <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Menos planilha, menos glosa, mais tempo para cuidar. A Nexum
                Tecnologia ajuda médicos e gestores de saúde a transformar a rotina
                administrativa em um sistema simples, previsível e seguro.
              </p>
            </AnimatedSection>
            <AnimatedSection animation="slideUp" delay={300}>
              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link to="/#contato" className="w-full sm:w-auto">
                  <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                    Diagnóstico gratuito
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/5521981466912"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="glass" size="lg" className="w-full sm:w-auto">
                    <MessageCircle className="h-4 w-4" />
                    Falar no WhatsApp
                  </Button>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Eu entendo a sua rotina */}
        <section className="py-20 md:py-28 bg-card border-t border-border">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 items-start">
              <AnimatedSection animation="slideInLeft">
                <div className="section-label mb-4">Quem fala com você</div>
                <h2 className="serif-display text-3xl md:text-4xl text-foreground leading-tight">
                  Eu entendo a sua rotina porque <em>vivi ela</em>.
                </h2>
              </AnimatedSection>
              <AnimatedSection animation="slideInRight">
                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  <p>
                    Antes de programar uma linha de código, passei 15+ anos dentro do
                    hospital — recepção lotada, convênio glosando, estoque que some, equipe
                    cobrando relatório que ninguém tinha tempo de fazer. Eu conheço esse
                    barulho.
                  </p>
                  <p>
                    Hoje, formado em Sistemas de Informação e pós-graduado em Ciência de
                    Dados e Big Data Analytics, eu uso tecnologia para resolver
                    <em> exatamente</em> essas dores. Não falo "stack", não falo "deploy".
                    Falo de fechamento de mês, de glosa que voltou, de paciente que faltou.
                  </p>
                  <p className="text-accent font-medium">
                    A Nexum Tecnologia nasceu para entregar tecnologia que cabe na clínica
                    — e respeita quem cuida.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Como posso colaborar */}
        <section className="py-24 md:py-32 bg-secondary">
          <div className="container mx-auto px-6 max-w-6xl">
            <AnimatedSection animation="slideUp">
              <div className="text-center mb-14">
                <div className="section-label justify-center inline-flex mb-4">
                  Como posso colaborar
                </div>
                <h2 className="serif-display text-3xl md:text-5xl text-foreground">
                  Quatro frentes que <em>mudam o dia a dia</em>
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
              {colaboracoes.map((c, i) => {
                const Icon = c.icon;
                return (
                  <AnimatedSection
                    key={c.title}
                    animation="slideUp"
                    delay={i * 80}
                  >
                    <div className="bg-card p-8 md:p-10 h-full">
                      <div className="w-12 h-12 flex items-center justify-center border border-accent/30 bg-accent/[0.06] text-accent mb-5">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight">
                        {c.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {c.desc}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* Antes / Depois */}
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <AnimatedSection animation="slideUp">
              <div className="section-label mb-4">O que muda na prática</div>
              <h2 className="serif-display text-3xl md:text-5xl text-foreground mb-12">
                <em>Antes</em> e <em>depois</em> da Nexum
              </h2>
            </AnimatedSection>

            <div className="border border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 bg-secondary/40 border-b border-border">
                <div className="px-6 py-4 font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground border-b md:border-b-0 md:border-r border-border">
                  Antes
                </div>
                <div className="px-6 py-4 font-mono text-[0.65rem] tracking-[0.2em] uppercase text-accent">
                  Depois
                </div>
              </div>
              {antesDepois.map((row, i) => (
                <AnimatedSection key={row.antes} animation="fadeIn" delay={i * 60}>
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 ${
                      i < antesDepois.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="px-6 py-5 text-sm text-muted-foreground leading-relaxed border-b md:border-b-0 md:border-r border-border">
                      {row.antes}
                    </div>
                    <div className="px-6 py-5 text-sm text-foreground leading-relaxed flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{row.depois}</span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Para quem é */}
        <section className="py-24 md:py-32 bg-card border-y border-border">
          <div className="container mx-auto px-6 max-w-6xl">
            <AnimatedSection animation="slideUp">
              <div className="text-center mb-14">
                <div className="section-label justify-center inline-flex mb-4">
                  Para quem é
                </div>
                <h2 className="serif-display text-3xl md:text-5xl text-foreground">
                  Atendo quem <em>quer profissionalizar</em> a gestão
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
              {paraQuem.map((p, i) => {
                const Icon = p.icon;
                return (
                  <AnimatedSection key={p.title} animation="slideUp" delay={i * 80}>
                    <div className="bg-card p-8 h-full">
                      <Icon className="h-6 w-6 text-accent mb-5" />
                      <h3 className="text-lg font-semibold text-foreground mb-3 leading-tight">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* Cases de saúde */}
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-6 max-w-6xl">
            <AnimatedSection animation="slideUp">
              <div className="mb-12">
                <div className="section-label mb-4">Cases de saúde já entregues</div>
                <h2 className="serif-display text-3xl md:text-5xl text-foreground mb-3">
                  Resultados <em>reais</em>, contexto <em>real</em>
                </h2>
                <p className="text-muted-foreground max-w-2xl leading-relaxed">
                  Uma amostra de projetos da Nexum dentro da saúde. Números medidos em
                  produção, não em apresentação.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
              {casesSaude.map((c, i) => (
                <AnimatedSection key={c.title} animation="slideUp" delay={i * 80}>
                  <article className="bg-card p-8 h-full flex flex-col">
                    <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-accent mb-4">
                      {c.tag}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 leading-tight">
                      {c.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                      {c.desc}
                    </p>
                    <div className="border-t border-border pt-4 text-xs font-semibold text-primary">
                      {c.kpi}
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link to="/#projetos">
                <Button variant="glass" size="lg" className="group">
                  Ver todos os cases
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Como trabalhamos juntos */}
        <section className="py-24 md:py-32 bg-secondary">
          <div className="container mx-auto px-6 max-w-6xl">
            <AnimatedSection animation="slideUp">
              <div className="text-center mb-14">
                <div className="section-label justify-center inline-flex mb-4">
                  Como trabalhamos juntos
                </div>
                <h2 className="serif-display text-3xl md:text-5xl text-foreground">
                  Quatro passos, sem <em>mistério</em>
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
              {passos.map((p, i) => (
                <AnimatedSection key={p.n} animation="slideUp" delay={i * 80}>
                  <div className="bg-card p-8 h-full">
                    <div className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-accent mb-3">
                      Passo {p.n}
                    </div>
                    <h3 className="serif-display text-2xl text-foreground mb-3 leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-6 max-w-3xl">
            <AnimatedSection animation="slideUp">
              <div className="mb-10 text-center">
                <div className="section-label justify-center inline-flex mb-4">
                  Perguntas frequentes
                </div>
                <h2 className="serif-display text-3xl md:text-5xl text-foreground">
                  Antes de você <em>perguntar</em>
                </h2>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeIn">
              <Accordion type="single" collapsible className="border border-border">
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={f.q}
                    value={`item-${i}`}
                    className={i < faqs.length - 1 ? "border-b border-border" : "border-b-0"}
                  >
                    <AccordionTrigger className="px-5 py-4 text-left text-foreground hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-accent/15 via-secondary to-primary/10 border-t border-border">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <AnimatedSection animation="scaleIn">
              <h2 className="serif-display text-3xl md:text-5xl text-foreground mb-5 leading-tight">
                Vamos conversar sobre a sua clínica?
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                30 minutos, sem compromisso. Você me conta sua rotina, eu te mostro onde
                a Nexum pode colaborar — com honestidade, mesmo que a resposta seja
                "ainda não é hora".
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link to="/#contato" className="w-full sm:w-auto">
                  <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                    Agendar diagnóstico gratuito
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/5521981466912"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="glass" size="lg" className="w-full sm:w-auto">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp direto
                  </Button>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <AIChatbot />
      <ScrollToTop />
    </div>
  );
};

export default Saude;
