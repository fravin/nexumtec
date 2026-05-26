import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const AboutSummary = () => {
  const credentials = [
    { icon: "🎓", title: "Sistemas de Informação (2024)", desc: "Graduação completa com foco em desenvolvimento e arquitetura de sistemas." },
    { icon: "🔬", title: "Pós-graduando em Ciência de Dados", desc: "Machine learning, estatística aplicada e modelos preditivos em produção." },
    { icon: "🏥", title: "13 anos na área da Saúde", desc: "Faturamento hospitalar, TISS/TUSS, glosas e indicadores clínicos." },
    { icon: "📍", title: "Rio de Janeiro — RJ", desc: "Atendimento presencial no Rio e remoto para todo o Brasil." },
  ];

  return (
    <section id="sobre-resumo" className="relative z-10 py-24 md:py-32 bg-ink-2">
      <div className="container mx-auto px-6 max-w-6xl">
        <AnimatedSection animation="slideUp">
          <div className="section-label mb-5">Quem está por trás</div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 border border-white/[0.06]">
          {/* Left: narrative */}
          <AnimatedSection animation="slideInLeft">
            <div className="p-8 md:p-14 bg-ink-2 md:border-r border-white/[0.06]">
              <h2 className="serif-display text-3xl md:text-5xl text-white mb-6">
                Da feira livre à<br /><em>ciência de dados</em>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Flávio Admilson — analista de sistemas, graduado em Sistemas de
                Informação e pós-graduando em Ciência de Dados. Uma trajetória que
                começa de um lugar incomum para o mundo tech.
              </p>
              <blockquote className="serif-display italic text-lg md:text-xl text-gold-light border-l-2 border-gold pl-5 py-2 my-6 leading-relaxed">
                "Minhas primeiras lições de carreira vieram de uma feira livre no
                bairro da Tijuca-RJ, onde aprendi que o verdadeiro motor de qualquer
                negócio é o cliente."
              </blockquote>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Em 2011 entrou na área da saúde como estagiário, e em 2012 foi
                contratado para o setor de faturamento. Foram 13 anos imerso em
                glosas, auditoria, gestão de estoque e indicadores assistenciais.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Hoje a Nexum Tecnologia une essa experiência operacional real com as
                tecnologias mais modernas de IA, dados e automação. Soluções que
                funcionam porque foram desenhadas por quem viveu o problema por
                dentro.
              </p>
              <Link to="/sobre">
                <Button variant="outline" size="default" className="group">
                  Conheça a trajetória completa
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          {/* Right: credentials */}
          <AnimatedSection animation="slideInRight">
            <div className="p-8 md:p-14 flex flex-col gap-3 bg-ink">
              <h3 className="text-sm font-semibold text-white tracking-tight mb-2">
                Credenciais & Formação
              </h3>
              {credentials.map((c) => (
                <div
                  key={c.title}
                  className="flex gap-4 p-5 border border-white/[0.08] bg-ink-2 hover:border-gold/40 transition-colors"
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{c.icon}</span>
                  <div>
                    <strong className="block text-sm text-white mb-1">{c.title}</strong>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSummary;
