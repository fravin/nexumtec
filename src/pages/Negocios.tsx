import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  MessageCircle,
  Mail,
  Workflow,
  BarChart3,
  Database,
  Bot,
  Building2,
  Store,
  Briefcase,
  Factory,
  GraduationCap,
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
    icon: MessageCircle,
    title: "Automação de WhatsApp",
    desc: "Atendimento 24/7, follow-up de vendas, cobrança, agendamento e respostas automáticas com IA — sem perder o toque humano nos momentos certos.",
  },
  {
    icon: Mail,
    title: "Automação de e-mail",
    desc: "Disparos segmentados, respostas automáticas, fluxos de nutrição de leads e confirmações operacionais. O e-mail certo, na hora certa, sem ninguém apertando enviar.",
  },
  {
    icon: Workflow,
    title: "Processos repetitivos (RPA + IA)",
    desc: "Robôs que copiam, colam, conferem, geram relatórios e cadastram em sistemas. Tudo que sua equipe faz no automático, mas que toma horas todo dia.",
  },
  {
    icon: BarChart3,
    title: "Dashboards e Power BI",
    desc: "Visão única de vendas, financeiro, operação e marketing. Pare de montar relatório no fim do mês — tenha os números vivos, no celular ou no computador.",
  },
  {
    icon: Database,
    title: "Sistemas web sob medida",
    desc: "CRM, ERP leve, portais internos, áreas do cliente. Sistemas feitos para o seu processo — não o contrário. Sai a planilha, entra o controle de verdade.",
  },
  {
    icon: Bot,
    title: "IA aplicada ao negócio",
    desc: "Chatbots inteligentes, classificação de leads, análise de documentos, atendimento automático. IA prática, resolvendo problema real — não buzzword.",
  },
];

const antesDepois = [
  {
    antes: "Atendimento de WhatsApp manual, fora do horário, perdendo cliente.",
    depois: "Bot 24/7 que responde, qualifica e passa para humano só quando precisa.",
  },
  {
    antes: "Disparo de e-mail um a um, na mão, sem saber quem abriu.",
    depois: "Fluxos automáticos com segmentação e indicadores de abertura e clique.",
  },
  {
    antes: "Planilha consolidada toda sexta, sempre desatualizada.",
    depois: "Dashboard ao vivo, mesmo dado para todo mundo, no celular.",
  },
  {
    antes: "Cadastro repetitivo em sistema, horas de equipe administrativa.",
    depois: "Robô que executa em segundos, sem erro de digitação.",
  },
  {
    antes: "Relatório do mês montado no fim do mês — quando não dá mais tempo de reagir.",
    depois: "Indicadores diários que mostram o problema antes dele crescer.",
  },
];

const paraQuem = [
  {
    icon: Store,
    title: "Comércio e varejo",
    desc: "Automação de WhatsApp para vendas, recuperação de carrinho, pós-venda e fidelização. Mais conversa, menos atendente sobrecarregado.",
  },
  {
    icon: Briefcase,
    title: "Serviços e consultoria",
    desc: "CRM sob medida, agendamento, propostas automáticas e nutrição de leads por e-mail. Foco no cliente, não em controle.",
  },
  {
    icon: Factory,
    title: "Indústria e logística",
    desc: "Indicadores de produção, controle de estoque, ordens de serviço e dashboards operacionais. Operação visível em tempo real.",
  },
  {
    icon: GraduationCap,
    title: "Educação, jurídico e imobiliário",
    desc: "Captação de leads, follow-up de matrículas, contratos, agendamentos e atendimento automatizado — adaptado ao seu setor.",
  },
];

const casesNegocios = [
  {
    tag: "Business Intelligence",
    title: "Análise Preditiva — R$77,5M analisados",
    kpi: "40% mais eficiência · 204k produtos mapeados",
    desc: "Dashboard com BI e modelo preditivo deu à liderança visibilidade comercial e capacidade de antecipar tendências de venda.",
  },
  {
    tag: "Sistema web",
    title: "Estoque substituindo Excel",
    kpi: "↓100% erros · visão em tempo real",
    desc: "Migração de controle em planilha para aplicação web com banco SQL, autenticação e relatórios precisos.",
  },
  {
    tag: "Sistema sob medida",
    title: "Faturamento e Gestão de Glosas",
    kpi: "R$ 34k+/mês sob controle",
    desc: "Plataforma única e auditável substituindo planilhas, com rastreabilidade total — prova de sistema complexo entregue.",
  },
];

const passos = [
  {
    n: "01",
    title: "Conversa de diagnóstico",
    desc: "Bate-papo gratuito de 30 minutos para entender seu negócio, seus números e onde dói mais.",
  },
  {
    n: "02",
    title: "Mapeamento dos gargalos",
    desc: "Escuto sua equipe, mapeio os processos repetitivos e mostro em um documento simples o que dá para automatizar.",
  },
  {
    n: "03",
    title: "Implementação com a equipe",
    desc: "Não entrego só software. Treino quem opera, ajusto no dia a dia e respeito o tempo da empresa.",
  },
  {
    n: "04",
    title: "Acompanhamento e ajustes",
    desc: "Suporte próximo, ajustes finos e novos indicadores conforme a operação amadurece.",
  },
];

const faqs = [
  {
    q: "Atende empresa pequena?",
    a: "Sim. Começamos pelo que mais dói (geralmente atendimento ou planilha crítica) e crescemos junto com o negócio. Não cobramos por funcionalidade que você ainda não precisa.",
  },
  {
    q: "Funciona se eu já uso outros sistemas?",
    a: "Funciona. Em muitos casos a Nexum complementa o que já existe — conectando, automatizando e criando indicadores em cima do sistema que você já paga.",
  },
  {
    q: "WhatsApp oficial ou não oficial?",
    a: "Trabalho com as duas abordagens. Para volumes maiores e contas comerciais, recomendo a API oficial (WhatsApp Business). Para automações pontuais, há caminhos mais simples — explico tudo na conversa de diagnóstico.",
  },
  {
    q: "Em quanto tempo uma automação fica pronta?",
    a: "Automações simples (resposta de WhatsApp, disparo de e-mail) ficam prontas em 1 a 2 semanas. Sistemas sob medida e dashboards completos levam de 4 a 12 semanas, dependendo do escopo.",
  },
  {
    q: "Como é a cobrança?",
    a: "Trabalho por projeto fechado ou por mensalidade de uso e suporte, sempre com proposta transparente. Sem surpresa no fim do mês.",
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
  "@type": "ProfessionalService",
  name: "Nexum Tecnologia — Negócios",
  description:
    "Automações de WhatsApp e e-mail, RPA, sistemas web sob medida, dashboards Power BI e IA aplicada a negócios de qualquer nicho.",
  url: "https://www.nexumtec.com.br/negocios",
  areaServed: "BR",
};

const Negocios = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Automações e sistemas para empresas | Nexum Negócios</title>
        <meta
          name="description"
          content="Automação de WhatsApp, e-mail, processos repetitivos, sistemas web sob medida, Power BI e IA aplicada — para empresas de qualquer nicho que querem operar com previsibilidade."
        />
        <link rel="canonical" href="https://www.nexumtec.com.br/negocios" />
        <meta property="og:title" content="Automações e sistemas para empresas | Nexum Negócios" />
        <meta
          property="og:description"
          content="WhatsApp, e-mail, RPA, sistemas sob medida e BI para negócios que querem parar de depender de planilha."
        />
        <meta property="og:url" content="https://www.nexumtec.com.br/negocios" />
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
                "linear-gradient(180deg, hsl(210 33% 98%) 0%, hsl(210 30% 94%) 100%)",
            }}
          />
          <div className="relative container mx-auto px-4 sm:px-6 max-w-5xl text-center">
            <AnimatedSection animation="slideUp">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.08] px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
                <Building2 className="h-3.5 w-3.5" />
                Nexum Negócios
              </span>
            </AnimatedSection>
            <AnimatedSection animation="slideUp" delay={100}>
              <h1 className="serif-display mt-7 text-[2.1rem] leading-[1.15] sm:text-5xl md:text-6xl text-foreground">
                Menos <em>planilha</em>, menos <em>repetição</em> — mais tempo para crescer o negócio.
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="slideUp" delay={200}>
              <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Automações de WhatsApp e e-mail, sistemas sob medida, dashboards e IA aplicada — para empresas
                de qualquer nicho que ainda dependem de trabalho manual e querem operar com previsibilidade.
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

        {/* Eu entendo o seu dia a dia */}
        <section className="py-20 md:py-28 bg-card border-t border-border">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 items-start">
              <AnimatedSection animation="slideInLeft">
                <div className="section-label mb-4">Quem fala com você</div>
                <h2 className="serif-display text-3xl md:text-4xl text-foreground leading-tight">
                  Eu entendo o seu dia a dia porque <em>resolvo gargalos há mais de 13 anos</em>.
                </h2>
              </AnimatedSection>
              <AnimatedSection animation="slideInRight">
                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  <p>
                    Antes de a Nexum nascer, passei mais de uma década dentro de empresas resolvendo o mesmo
                    tipo de problema: planilha que ninguém atualiza, equipe sobrecarregada com tarefa repetitiva,
                    relatório que demora dias para ficar pronto, cliente esperando resposta no WhatsApp.
                  </p>
                  <p>
                    Hoje, formado em Sistemas de Informação e pós-graduado em Ciência de Dados, eu uso
                    automação, IA e desenvolvimento sob medida para resolver <em>exatamente</em> essas dores —
                    em qualquer nicho. Comércio, serviços, indústria, educação, jurídico, imobiliário.
                  </p>
                  <p className="text-primary font-medium">
                    A Nexum Tecnologia entrega tecnologia que cabe na sua operação — e respeita quem faz ela girar.
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
                  Seis frentes que <em>mudam a operação</em>
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {colaboracoes.map((c, i) => {
                const Icon = c.icon;
                return (
                  <AnimatedSection
                    key={c.title}
                    animation="slideUp"
                    delay={i * 80}
                  >
                    <div className="bg-card p-8 md:p-10 h-full">
                      <div className="w-12 h-12 flex items-center justify-center border border-primary/30 bg-primary/[0.06] text-primary mb-5">
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
                <div className="px-6 py-4 font-mono text-[0.65rem] tracking-[0.2em] uppercase text-primary">
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
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
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
                  Atendo <em>qualquer nicho</em> que quer profissionalizar a operação
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
              {paraQuem.map((p, i) => {
                const Icon = p.icon;
                return (
                  <AnimatedSection key={p.title} animation="slideUp" delay={i * 80}>
                    <div className="bg-card p-8 h-full">
                      <Icon className="h-6 w-6 text-primary mb-5" />
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

        {/* Cases */}
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-6 max-w-6xl">
            <AnimatedSection animation="slideUp">
              <div className="mb-12">
                <div className="section-label mb-4">Cases já entregues</div>
                <h2 className="serif-display text-3xl md:text-5xl text-foreground mb-3">
                  Resultados <em>reais</em>, contexto <em>real</em>
                </h2>
                <p className="text-muted-foreground max-w-2xl leading-relaxed">
                  Uma amostra de projetos da Nexum em negócios. Números medidos em produção,
                  não em apresentação.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
              {casesNegocios.map((c, i) => (
                <AnimatedSection key={c.title} animation="slideUp" delay={i * 80}>
                  <article className="bg-card p-8 h-full flex flex-col">
                    <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-primary mb-4">
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
                    <div className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-primary mb-3">
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
        <section className="py-20 md:py-28 bg-gradient-to-br from-primary/15 via-secondary to-accent/10 border-t border-border">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <AnimatedSection animation="scaleIn">
              <h2 className="serif-display text-3xl md:text-5xl text-foreground mb-5 leading-tight">
                Vamos conversar sobre o seu negócio?
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                30 minutos, sem compromisso. Você me conta sua operação, eu te mostro onde
                a Nexum pode automatizar, organizar ou medir — com honestidade, mesmo que a
                resposta seja "ainda não é hora".
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

export default Negocios;
