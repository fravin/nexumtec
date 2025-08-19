import { Card, CardContent } from "@/components/ui/card";
import flavioGraduationPhoto from "@/assets/flavio-graduation-photo.png";

const About = () => {
  const philosophyItems = [
    {
      title: "Dados para Pessoas",
      description: "Acredito que a tecnologia deve servir para simplificar a vida das pessoas e tornar as empresas mais humanas e eficientes."
    },
    {
      title: "Eficiência com Alegria",
      description: "Trago a mesma energia e otimismo da feira para o ambiente corporativo. Um time motivado e com boa comunicação resolve qualquer desafio."
    },
    {
      title: "Soluções Simples para Problemas Complexos",
      description: "Minha meta é traduzir desafios complexos em soluções práticas e fáceis de implementar, seja em uma planilha de Excel ou em um modelo de dados."
    },
    {
      title: "A Curiosidade como Guia",
      description: "Estou sempre aprendendo, questionando e buscando novas formas de otimizar. Acredito que a pergunta certa é o primeiro passo para a inovação."
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Minha Jornada:</span> Da Feira à Análise de Dados
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Portrait */}
          <div className="text-center">
            <div className="relative inline-block">
              <img 
                src={flavioGraduationPhoto} 
                alt="Flávio Admilson - Analista de Sistemas"
                className="w-80 h-80 object-cover rounded-full shadow-glow mx-auto"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-hero opacity-20 animate-pulse"></div>
            </div>
          </div>

          {/* Story */}
          <div className="space-y-6">
            <Card className="glass shadow-md hover:shadow-lg transition-smooth">
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-foreground/90">
                  Minha carreira começou de uma forma que me ensinou o valor de cada negociação: em uma feira livre no Andaraí. 
                  Ali, entre laranjas, mangas e melancias, aprendi na prática os fundamentos do comércio. Minha rotina era ir ao 
                  CEASA RJ de madrugada para comprar as melhores mercadorias, gerenciar o estoque e, o mais importante, criar 
                  conexões genuínas com os clientes através de um contato sincero e alegre.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-primary/20 shadow-md">
              <CardContent className="p-6">
                <blockquote className="text-lg italic text-primary font-medium border-l-4 border-primary pl-4">
                  "Essa habilidade de negociação e de criar laços, aprendida na feira, é a mesma que aplico hoje ao lidar com 
                  planos de saúde e ao liderar equipes em projetos de inovação."
                </blockquote>
              </CardContent>
            </Card>

            <Card className="glass shadow-md hover:shadow-lg transition-smooth">
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-foreground/90">
                  Em 2011, essa jornada me levou à área da saúde, iniciando como estagiário na recepção da clínica Centro Trauma. 
                  A dedicação me abriu portas e, em 2012, fui contratado e direcionado para o setor de faturamento, onde mergulhei 
                  no universo do faturamento hospitalar, auditoria de glosas e gestão de estoque.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-accent/10 border-accent/30 shadow-md">
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-foreground/90">
                  A vida, então, me trouxe a maior de todas as motivações: em 2014, o nascimento da minha filha, 
                  <span className="font-semibold text-accent"> Ana Beatriz</span>, redefiniu minhas ambições e me impulsionou 
                  a retomar os estudos com mais força do que nunca.
                </p>
              </CardContent>
            </Card>

            <Card className="glass shadow-md hover:shadow-lg transition-smooth">
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-foreground/90">
                  Em 2017 fui crescendo dentro da empresa e fui de auxiliar de escritório virei assistente administrativo, 
                  após eu concluir minha graduação no final de 2024 assumi a posição de Analista de tecnologia, combinando 
                  minha experiência de negócio com a paixão por tecnologia. Hoje, graduado em Sistemas de Informação e 
                  pós-graduando em Ciência de Dados, meu objetivo é claro: usar toda essa bagagem para transformar dados 
                  em decisões inteligentes e processos em resultados mensuráveis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
            Minha Filosofia de Trabalho
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {philosophyItems.map((item, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-glow transition-smooth cursor-pointer h-full"
            >
              <CardContent className="p-6 h-full">
                <h4 className="text-lg font-semibold mb-4 gradient-text group-hover:scale-105 transition-transform">
                  {item.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;