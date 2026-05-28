import { Cog, BarChart3, Bot, Map, HeartPulse, FlaskConical } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const Services = () => {
  const services = [
    {
      num: "01",
      icon: Cog,
      title: "Desenvolvimento de Sistemas",
      desc: "Sistemas personalizados que automatizam processos internos, eliminam planilhas e integram todas as áreas da empresa em uma plataforma única.",
      tags: ["Sistemas Web", "ERP", "APIs REST", "Integrações"],
    },
    {
      num: "02",
      icon: BarChart3,
      title: "Business Intelligence & Power BI",
      desc: "Dados brutos se tornam dashboards estratégicos. Sua liderança toma decisões com base em fatos, não em intuição ou relatórios desatualizados.",
      tags: ["Dashboards", "KPIs", "Relatórios Automáticos", "Financeiro"],
    },
    {
      num: "03",
      icon: Bot,
      title: "Inteligência Artificial & Automação",
      desc: "Processos repetitivos automatizados com IA. Sua equipe foca no estratégico enquanto a máquina executa o operacional com zero erros.",
      tags: ["Chatbots IA", "RPA", "WhatsApp", "Power Automate"],
    },
    {
      num: "04",
      icon: HeartPulse,
      title: "Especialização em Saúde",
      desc: "15 anos na área: faturamento hospitalar, auditoria de glosas, indicadores assistenciais e automação administrativa. Domínio que poucos têm.",
      tags: ["Faturamento", "TISS/TUSS", "Glosas", "Dashboards Clínicos"],
    },
    {
      num: "05",
      icon: FlaskConical,
      title: "Machine Learning & Ciência de Dados",
      desc: "Modelos preditivos que antecipam demanda, identificam padrões e reduzem desperdício. Ciência de dados aplicada ao problema real do cliente.",
      tags: ["Python", "Scikit-learn", "Previsão de Demanda", "SQL"],
    },
    {
      num: "06",
      icon: Map,
      title: "Consultoria em Processos",
      desc: "Mapeamos onde está o gargalo e redesenhamos o fluxo para operar com menos esforço, menos erro e mais previsibilidade operacional.",
      tags: ["Diagnóstico", "BPM", "Padronização", "Otimização"],
    },
  ];

  return (
    <section id="servicos" className="py-24 md:py-32 bg-ink-2 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <AnimatedSection animation="slideUp">
          <div className="section-label mb-5">O que fazemos</div>
          <h2 className="serif-display text-4xl md:text-6xl text-foreground mb-5">
            Soluções que geram
            <br />
            <em>eficiência real</em>
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed mb-16">
            Não vendemos tecnologia por tecnologia. Cada projeto resolve um problema
            específico e entrega ROI mensurável.
          </p>
        </AnimatedSection>

        {/* Hairline grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <AnimatedSection
                key={s.num}
                animation="slideUp"
                delay={i * 60}
                className="bg-ink-2"
              >
                <article className="group relative p-9 h-full transition-colors hover:bg-ink-3">
                  <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mb-7">
                    {s.num} ——
                  </div>
                  <div className="w-12 h-12 mb-6 flex items-center justify-center border border-primary/25 bg-primary/[0.08] text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 tracking-tight">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {s.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[0.65rem] tracking-[0.08em] uppercase text-muted-foreground px-2.5 py-1 border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-gold-line opacity-0 group-hover:opacity-100 transition-opacity" />
                </article>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
