import { Card, CardContent } from "@/components/ui/card";
import ImpactMetrics from "./ImpactMetrics";
import { AnimatedSection } from "@/components/AnimatedSection";

const About = () => {
  const philosophyItems = [{
    title: "Dados para Pessoas",
    description: "Acredito que a tecnologia deve servir para simplificar a vida das pessoas e tornar as empresas mais humanas e eficientes."
  }, {
    title: "Eficiência com Alegria",
    description: "Trago a mesma energia e otimismo da feira para o ambiente corporativo. Um time motivado e com boa comunicação resolve qualquer desafio."
  }, {
    title: "Soluções Simples para Problemas Complexos",
    description: "Minha meta é traduzir desafios complexos em soluções práticas e fáceis de implementar, seja em uma planilha de Excel ou em um modelo de dados."
  }, {
    title: "A Curiosidade como Guia",
    description: "Estou sempre aprendendo, questionando e buscando novas formas de otimizar. Acredito que a pergunta certa é o primeiro passo para a inovação."
  }];
  return <section id="sobre" className="py-12 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0}>
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Minha Jornada:</span> Da Feira à Análise de Dados
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          {/* Portrait */}
          <AnimatedSection animation="slideInLeft" delay={100}>
            <div className="text-center">
            <div className="relative inline-block group">
              {/* Animated ring border */}
              <div className="absolute -inset-6 bg-gradient-to-r from-primary via-accent to-primary rounded-lg opacity-75 group-hover:opacity-100 animate-pulse transition-opacity duration-1000"></div>
              
              {/* Static outer ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/50 via-transparent to-accent/50 rounded-lg"></div>
              
              {/* Inner glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-lg blur-sm"></div>
              
              {/* Main image */}
              <div className="relative">
                <img src="/lovable-uploads/f99c685c-3957-4643-a4d6-0abf73d8f016.png" alt="Flávio Admilson - Analista de Sistemas" className="w-full max-w-md h-[500px] object-cover object-top rounded-lg border-4 border-background shadow-2xl group-hover:scale-105 transition-transform duration-500 mx-auto relative z-10" />
                
                {/* Overlay effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-500"></div>
              </div>
            </div>
            </div>
          </AnimatedSection>

          {/* Story */}
          <div className="space-y-6">
            <AnimatedSection animation="slideInRight" delay={150}>
              <Card className="glass shadow-md hover:shadow-lg transition-smooth">
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-foreground/90 text-justify">Minhas primeiras lições de carreira vieram de uma feira livre no bairro da Tijuca-RJ, onde entendi que o verdadeiro motor de qualquer negócio é o cliente. Minha rotina não se resumia a comprar no CEASA-RJ e vender frutas, mas sim em criar conexões autênticas e proporcionar uma experiência de compra positiva. Essa vivência me ensinou que a confiança e a satisfação do cliente são a chave para a sustentabilidade e o crescimento.</p>
              </CardContent>
            </Card>
            </AnimatedSection>

            <AnimatedSection animation="slideInRight" delay={250}>
              <Card className="bg-gradient-card border-primary/20 shadow-md">
              <CardContent className="p-6">
                <blockquote className="text-lg italic text-primary font-medium border-l-4 border-primary pl-4">
                  "Essa habilidade de negociação e de criar laços, aprendida na feira, é a mesma que aplico hoje ao lidar com 
                  planos de saúde e ao liderar equipes em projetos de inovação."
                </blockquote>
              </CardContent>
            </Card>
            </AnimatedSection>

            <AnimatedSection animation="slideInRight" delay={350}>
              <Card className="glass shadow-md hover:shadow-lg transition-smooth">
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-foreground/90 text-justify">
                  Em 2011, essa jornada me levou à área da saúde, iniciando como estagiário na recepção da clínica Centro Trauma. 
                  A dedicação me abriu portas e, em 2012, fui contratado e direcionado para o setor de faturamento, onde mergulhei 
                  no universo do faturamento hospitalar, auditoria de glosas e gestão de estoque.
                </p>
              </CardContent>
            </Card>
            </AnimatedSection>

            <AnimatedSection animation="slideInRight" delay={450}>
              <Card className="bg-accent/10 border-accent/30 shadow-md">
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-foreground/90">
                  A vida, então, me trouxe a maior de todas as motivações: em 2014, o nascimento da minha filha, 
                  <span className="font-semibold text-accent"> Ana Beatriz</span>, redefiniu minhas ambições e me impulsionou 
                  a retomar os estudos com mais força do que nunca.
                </p>
              </CardContent>
            </Card>
            </AnimatedSection>

            <AnimatedSection animation="slideInRight" delay={550}>
              <Card className="glass shadow-md hover:shadow-lg transition-smooth">
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-foreground/90 text-justify">
                  Em 2017 fui crescendo dentro da empresa e fui de auxiliar de escritório virei assistente administrativo, 
                  após eu concluir minha graduação no final de 2024 assumi a posição de Analista de tecnologia, combinando 
                  minha experiência de negócio com a paixão por tecnologia. Hoje, graduado em Sistemas de Informação e 
                  pós-graduando em Ciência de Dados, meu objetivo é claro: usar toda essa bagagem para transformar dados 
                  em decisões inteligentes e processos em resultados mensuráveis.
                </p>
              </CardContent>
            </Card>
            </AnimatedSection>
          </div>
        </div>

        {/* Impact Metrics */}
        <ImpactMetrics />

        {/* Philosophy Section */}
        <AnimatedSection animation="slideUp" delay={100}>
          <div className="text-center mb-8 mt-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Minha Filosofia de Trabalho
            </h3>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophyItems.map((item, index) => (
            <AnimatedSection key={index} animation="scaleIn" delay={200 + index * 100}>
              <Card className="group hover:shadow-glow transition-smooth cursor-pointer h-full">
                <CardContent className="p-6 h-full">
                  <h4 className="text-lg font-semibold mb-4 gradient-text group-hover:scale-105 transition-transform">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>;
};
export default About;