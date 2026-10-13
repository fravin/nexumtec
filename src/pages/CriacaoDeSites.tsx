import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Monitor, Smartphone, Globe2, HeartPulse, LayoutTemplate, ShoppingBag, Briefcase, LockKeyhole, Check, Search, Gauge, Accessibility, ShieldCheck, ChartNoAxesCombined, Expand } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import AIChatbot from "@/components/AIChatbot";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { websiteExamples, websiteFaqs, websiteSchema } from "@/content/websiteCreation";
import clinicMobile from "@/assets/sites-clinica-mobile-demo.jpg";

const formats = [
  { icon: Globe2, title: "Site institucional", text: "Sua empresa, seus serviços e seus diferenciais apresentados com clareza. Uma base sólida para sua presença digital.", ideal: "Empresas e prestadores de serviços" },
  { icon: LayoutTemplate, title: "Landing page", text: "Uma oferta, um objetivo. Uma página para campanhas, lançamentos e conversas comerciais mais qualificadas.", ideal: "Campanhas e captação de leads" },
  { icon: HeartPulse, title: "Sites para clínicas", text: "Especialidades, equipe e informações de atendimento organizadas para transmitir confiança e facilitar o agendamento.", ideal: "Clínicas e profissionais de saúde" },
  { icon: ShoppingBag, title: "Catálogo digital", text: "Produtos e serviços bem organizados, com informações claras e solicitação de orçamento pelo canal certo.", ideal: "Comércio e negócios B2B" },
  { icon: Briefcase, title: "Portfólio profissional", text: "Projetos, trajetória e trabalhos em destaque para tornar sua experiência visível e fortalecer sua marca.", ideal: "Consultores e profissionais criativos" },
  { icon: LockKeyhole, title: "Portais e áreas restritas", text: "Conteúdo e serviços para clientes ou equipes, com acesso controlado e funcionalidades planejadas sob medida.", ideal: "Projetos com necessidades específicas" },
];
const deliverables = [
  { icon: Smartphone, title: "Bom em qualquer tela", text: "Layouts adaptados ao celular, tablet e computador, com navegação clara e contato fácil." },
  { icon: Search, title: "Conteúdo que pode ser encontrado", text: "Estrutura de páginas, títulos, descrições e dados do serviço organizados para buscadores." },
  { icon: Gauge, title: "Desempenho desde o início", text: "Imagens otimizadas e atenção ao carregamento para uma experiência mais ágil." },
  { icon: Accessibility, title: "Mais acessível", text: "Contraste, navegação por teclado e informações bem estruturadas para diferentes públicos." },
  { icon: ShieldCheck, title: "Segurança e privacidade", text: "Conexão segura, cuidado com formulários e tratamento de dados planejado conforme o projeto." },
  { icon: ChartNoAxesCombined, title: "Integrações que fazem sentido", text: "WhatsApp, formulários, métricas e conexões com sua operação, definidos no escopo." },
];
const steps = [
  ["Diagnóstico", "Entendemos seu público, sua oferta e o que o site precisa realizar."],
  ["Proposta e direção", "Combinamos escopo, conteúdo, investimento e cronograma com transparência."],
  ["Criação e revisão", "Desenhamos, desenvolvemos e ajustamos a experiência junto com você."],
  ["Publicação e evolução", "Validamos a entrega e definimos orientações, suporte e próximos passos."],
];
const whatsapp = `https://wa.me/5521981466912?text=${encodeURIComponent("Olá, Nexum! Gostaria de conversar sobre a criação de um site para o meu negócio.")}`;

function ContactActions({ compact = false }: { compact?: boolean }) {
  return <div className="flex flex-col sm:flex-row gap-3 justify-center">
    <Button asChild variant="hero" size="lg" className="h-auto min-h-12 whitespace-normal tracking-normal"><Link to="/#contato">{compact ? "Solicitar Diagnóstico Gratuito" : "Conversar sobre meu site"}<ArrowRight /></Link></Button>
    <Button asChild variant="glass" size="lg" className="h-auto min-h-12 whitespace-normal tracking-normal"><a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle />Falar no WhatsApp</a></Button>
  </div>;
}

export default function CriacaoDeSites() {
  const [selected, setSelected] = useState<number | null>(null);
  const example = selected === null ? undefined : websiteExamples[selected];
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return <div className="min-h-screen bg-background">
    <Seo title="Criação de Sites Profissionais no Rio de Janeiro | Nexum" description="Sites institucionais, landing pages e sites para clínicas. Design responsivo e estrutura para SEO. Nexum Tecnologia no Rio de Janeiro, com atendimento remoto no Brasil." path="/criacao-de-sites" jsonLd={websiteSchema} />
    <Header />
    <main>
      <section className="pt-28 sm:pt-36 pb-12 md:pb-16 border-b border-border">
        <div className="container max-w-6xl mx-auto px-5 sm:px-8">
          <nav aria-label="Localização na página" className="flex gap-2 items-center text-xs text-muted-foreground mb-8"><Link to="/" className="hover:text-primary">Nexum Tecnologia</Link><span aria-hidden="true">/</span><span>Criação de sites</span></nav>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase text-primary mb-5">Nexum Tecnologia · Rio de Janeiro e Brasil</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight text-foreground">Criação de sites profissionais.<br /><em className="font-medium text-primary">Sua próxima oportunidade começa aqui.</em></h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mt-6 mb-8">A Nexum Tecnologia cria sites para empresas, clínicas e profissionais que querem transmitir confiança e conquistar novas oportunidades. Estratégia, design e tecnologia a serviço do seu negócio.</p>
            <ContactActions />
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">{["Diagnóstico sem compromisso", "Projeto sob medida", "Atendimento consultivo"].map(text => <span key={text} className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-accent" />{text}</span>)}</div>
          </div>
          <div className="mt-10 md:mt-14 grid grid-cols-3 gap-2 sm:gap-5 items-start" aria-label="Modelos demonstrativos de sites">
            {websiteExamples.map((item, i) => <div key={item.name} className={i === 1 ? "mt-5 sm:mt-8" : ""}><img src={item.image} alt={`Modelo demonstrativo de site: ${item.name}`} width={1440} height={1024} loading="lazy" className="w-full aspect-[45/32] object-contain border border-border shadow-sm" /></div>)}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-5 px-10">Modelos demonstrativos · Marcas e projetos ilustrativos</p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container max-w-6xl mx-auto px-5 sm:px-8">
          <AnimatedSection><p className="text-xs uppercase font-semibold text-primary mb-4">O formato certo para o seu objetivo</p><h2 className="font-serif text-3xl md:text-5xl text-foreground mb-5">Não é só ter um site.<br /><em>É ter o site certo.</em></h2><p className="text-muted-foreground max-w-2xl leading-relaxed mb-12">Apresentar sua empresa, receber pedidos ou apoiar uma campanha: cada objetivo pede uma experiência diferente. Planejamos a estrutura antes de desenhar a primeira página.</p></AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">{formats.map(({ icon: Icon, title, text, ideal }) => <article key={title} className="bg-card p-7 sm:p-8 flex flex-col"><Icon className="h-6 w-6 text-primary mb-6" /><h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{text}</p><p className="text-xs text-primary border-t border-border pt-4">{ideal}</p></article>)}</div>
        </div>
      </section>

      <section id="modelos" className="py-24 md:py-32 bg-secondary border-y border-border">
        <div className="container max-w-6xl mx-auto px-5 sm:px-8">
          <AnimatedSection><div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12"><div><p className="text-xs uppercase font-semibold text-primary mb-4">Possibilidades em perspectiva</p><h2 className="font-serif text-3xl md:text-5xl text-foreground">Uma identidade.<br /><em>Muitas formas de se apresentar.</em></h2></div><p className="text-sm text-muted-foreground max-w-sm leading-relaxed">Exemplos conceituais para visualizar estilos e formatos. Não são cases de clientes ou produtos prontos.</p></div></AnimatedSection>
          <div className="space-y-12">{websiteExamples.map((item, i) => <article key={item.name} className="grid lg:grid-cols-[1.65fr_1fr] gap-7 lg:gap-12 items-center">
            <div className="relative"><img src={item.image} alt={`Exemplo ilustrativo de ${item.category}: ${item.name}`} width={1440} height={1024} loading="lazy" className="w-full aspect-[45/32] object-contain border border-border" /><Button variant="glass" size="icon" onClick={() => setSelected(i)} aria-label={`Ampliar modelo ${item.name}`} title={`Ampliar modelo ${item.name}`} className="absolute bottom-3 right-3"><Expand /></Button></div>
            <div><p className="text-xs text-primary font-semibold uppercase mb-3">Modelo demonstrativo · 0{i + 1}</p><h3 className="font-serif text-3xl text-foreground mb-2">{item.name}</h3><p className="font-medium text-foreground mb-4">{item.category}</p><p className="text-sm text-muted-foreground leading-relaxed mb-6">{item.description}</p><ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground mb-6">{item.features.map(f => <li key={f} className="flex items-center gap-1"><Check className="w-3 h-3 text-accent" />{f}</li>)}</ul><div className="flex gap-4 text-xs text-muted-foreground mb-6"><span className="flex gap-2 items-center"><Monitor className="w-4 h-4" />Desktop</span><span className="flex gap-2 items-center"><Smartphone className="w-4 h-4" />Adaptação mobile</span></div><Button asChild variant="link" className="px-0 tracking-normal"><a href={`${whatsapp}&`} target="_blank" rel="noopener noreferrer">Quero um site nessa direção<ArrowRight /></a></Button></div>
          </article>)}</div>
          <div className="mt-14 border-t border-border pt-10 grid md:grid-cols-[1fr_1.6fr] gap-8 items-center"><div><h3 className="font-serif text-2xl text-foreground mb-5">A mesma marca. Uma experiência pensada para cada tela.</h3><p className="text-sm text-muted-foreground leading-relaxed">No celular, conteúdo, imagens e caminhos de contato são reorganizados para uma leitura confortável. Não é apenas diminuir o site: é adaptar a navegação ao contexto de quem acessa.</p><p className="text-xs text-muted-foreground mt-4">Clínica Aurora · Demonstração conceitual</p></div><div className="grid grid-cols-[2.4fr_1fr] gap-4 items-center"><figure><img src={websiteExamples[0].image} width={1440} height={1024} loading="lazy" alt="Modelo demonstrativo da Clínica Aurora no desktop" className="w-full border border-border" /><figcaption className="text-xs text-muted-foreground mt-3 flex gap-2 items-center"><Monitor className="w-4 h-4" />Desktop</figcaption></figure><figure><img src={clinicMobile} width={720} height={1280} loading="lazy" alt="Modelo demonstrativo da Clínica Aurora adaptado ao celular" className="w-full border border-border" /><figcaption className="text-xs text-muted-foreground mt-3 flex gap-2 items-center"><Smartphone className="w-4 h-4" />Mobile</figcaption></figure></div></div>
        </div>
      </section>

      <section className="py-24 md:py-32"><div className="container max-w-6xl mx-auto px-5 sm:px-8"><AnimatedSection><p className="text-xs uppercase font-semibold text-primary mb-4">Além da aparência</p><h2 className="font-serif text-3xl md:text-5xl text-foreground mb-5">Bonito para olhar.<br /><em>Bem pensado para funcionar.</em></h2><p className="text-muted-foreground max-w-2xl leading-relaxed mb-12">Planejamos os recursos que fazem sentido para sua empresa. Conteúdo, integrações e acompanhamento são detalhados na proposta, sem surpresas.</p></AnimatedSection><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">{deliverables.map(({ icon: Icon, title, text }) => <div key={title} className="border-t border-border pt-6"><Icon className="w-5 h-5 text-primary mb-4" /><h3 className="font-semibold text-foreground mb-3">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{text}</p></div>)}</div></div></section>

      <section className="py-24 md:py-32 bg-card border-y border-border"><div className="container max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-12"><div><p className="text-xs uppercase font-semibold text-primary mb-4">Presença digital com clareza</p><h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Criação de sites no Rio de Janeiro.<br /><em>Conexão com todo o Brasil.</em></h2><p className="text-muted-foreground leading-relaxed">A Nexum Tecnologia, fundada por Flávio de Souza, combina desenvolvimento e visão de negócio. Atendemos no Rio de Janeiro e acompanhamos projetos remotamente em outras regiões do Brasil.</p><Button asChild variant="link" className="px-0 mt-4 tracking-normal"><Link to="/sobre">Conheça a Nexum<ArrowRight /></Link></Button></div><div><h3 className="font-serif text-2xl text-foreground mb-4">Como facilitamos a descoberta do seu negócio?</h3><p className="text-sm text-muted-foreground leading-relaxed mb-4">Organizamos informações sobre seus serviços, seu público e seus canais de contato. Títulos descritivos, respostas úteis e dados estruturados ajudam buscadores e assistentes de IA a compreender o que sua empresa oferece.</p><p className="text-sm text-muted-foreground leading-relaxed mb-5">SEO é um trabalho contínuo. A posição no Google e as recomendações no ChatGPT, Gemini ou Claude dependem da indexação, da concorrência e dos critérios de cada plataforma — não são resultados garantidos.</p><p className="text-sm text-muted-foreground">O site também pode se conectar à sua operação: conheça nossas soluções para <Link to="/negocios" className="text-primary underline underline-offset-4">empresas</Link> e para a <Link to="/saude" className="text-primary underline underline-offset-4">área da saúde</Link>.</p></div></div></section>

      <section className="py-24 md:py-32"><div className="container max-w-6xl mx-auto px-5 sm:px-8"><AnimatedSection><p className="text-xs uppercase font-semibold text-primary mb-4">Do primeiro contato à entrega</p><h2 className="font-serif text-3xl md:text-5xl text-foreground mb-12">Um processo próximo.<br /><em>Sem complicar o seu dia.</em></h2></AnimatedSection><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">{steps.map(([title, text], i) => <div key={title} className="border-t border-border pt-6"><span className="text-sm text-primary">0{i + 1}</span><h3 className="font-serif text-2xl text-foreground mt-4 mb-3">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{text}</p></div>)}</div></div></section>

      <section className="py-24 md:py-32 bg-secondary border-y border-border"><div className="container max-w-3xl mx-auto px-5 sm:px-8"><h2 className="font-serif text-3xl md:text-5xl text-foreground mb-10">Perguntas sobre <em>seu próximo site</em></h2><Accordion type="single" collapsible>{websiteFaqs.map((faq, i) => <AccordionItem key={faq.q} value={`faq-${i}`}><AccordionTrigger className="text-left text-foreground py-5 hover:no-underline">{faq.q}</AccordionTrigger><AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent></AccordionItem>)}</Accordion></div></section>

      <section className="py-24 md:py-32"><div className="container max-w-3xl mx-auto px-5 sm:px-8 text-center"><p className="text-xs uppercase font-semibold text-primary mb-4">Vamos construir sua presença digital</p><h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6">Seu negócio merece<br /><em>ser bem apresentado.</em></h2><p className="text-muted-foreground leading-relaxed mb-8">Conte para a Nexum o que você faz e quem quer alcançar. Começamos com uma conversa para entender o projeto e indicar o melhor caminho.</p><ContactActions compact /><a href="mailto:contato@nexumtec.com.br" className="inline-block mt-6 text-sm text-muted-foreground hover:text-primary break-all">contato@nexumtec.com.br</a></div></section>
    </main>
    <Footer /><WhatsAppButton /><ScrollToTop /><AIChatbot />
    <Dialog open={example !== undefined} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="max-w-5xl max-h-[90dvh] overflow-y-auto"><DialogHeader><DialogTitle>{example?.name}</DialogTitle><DialogDescription>Modelo demonstrativo · {example?.category}. Marca e projeto ilustrativos.</DialogDescription></DialogHeader>{example && <img src={example.image} alt={`Modelo ampliado: ${example.name}`} width={1440} height={1024} className="w-full h-auto" />}</DialogContent></Dialog>
  </div>;
}