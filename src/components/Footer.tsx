import { Heart, Code, Zap } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-primary/10 to-accent/10 border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold gradient-text">Nexum Tecnologia</span>
            </div>
            <p className="text-muted-foreground max-w-xs mx-auto md:mx-0">
              Conectando pessoas, dados e processos para gerar resultados excepcionais.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Navegação</h3>
            <ul className="space-y-2">
              {[
                { label: "Início", href: "#inicio" },
                { label: "Sobre Mim", href: "#sobre" },
                { label: "Serviços", href: "#servicos" },
                { label: "Projetos", href: "#projetos" },
                { label: "Contato", href: "#contato" }
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })}
                    className="text-muted-foreground hover:text-primary transition-smooth"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contato</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <a 
                  href="mailto:contato@nexumtecnologia.com"
                  className="hover:text-primary transition-smooth"
                >
                  contato@nexumtecnologia.com
                </a>
              </p>
              <p>
                <a 
                  href="tel:+5521981466912"
                  className="hover:text-primary transition-smooth"
                >
                  +55 (21) 9 81466912
                </a>
              </p>
              <p>Rio de Janeiro, RJ</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>© {currentYear} Nexum Tecnologia. Feito com</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>e</span>
              <Code className="h-4 w-4 text-primary" />
              <span>por Flávio Admilson</span>
            </div>
            
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm">Transformando dados em resultados</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;