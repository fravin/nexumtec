import { Heart, Code, Zap, Linkedin, Github, MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = "5521981466912";
  const whatsappMessage = "Olá! Vi seu portfólio e gostaria de conversar sobre uma oportunidade.";
  
  return (
    <footer className="bg-gradient-to-br from-primary/10 to-accent/10 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold gradient-text">Nexum Tecnologia</span>
            </div>
            <p className="text-muted-foreground max-w-xs mx-auto sm:mx-0 text-sm sm:text-base">
              TI Estratégica: conectando tecnologia aos objetivos do seu negócio. Prepare a sua empresa para o futuro com inteligência artificial.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Navegação</h3>
            <ul className="space-y-2">
              {[{
                label: "Início",
                href: "#inicio"
              }, {
                label: "Sobre Mim",
                href: "#sobre"
              }, {
                label: "Serviços",
                href: "#servicos"
              }, {
                label: "Projetos",
                href: "#projetos"
              }].map(link => (
                <li key={link.label}>
                  <button 
                    onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })} 
                    className="text-muted-foreground hover:text-primary transition-smooth min-h-[44px] sm:min-h-0 py-1"
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
            <div className="space-y-3 text-muted-foreground">
              <a 
                href="mailto:contato@nexumtec.com.br" 
                className="flex items-center justify-center sm:justify-start space-x-2 hover:text-primary transition-smooth min-h-[44px] sm:min-h-0"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">contato@nexumtec.com.br</span>
              </a>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start space-x-2 hover:text-primary transition-smooth min-h-[44px] sm:min-h-0"
              >
                <MessageCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">+55 (21) 98146-6912</span>
              </a>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">Rio de Janeiro, RJ</span>
              </div>
            </div>
          </div>

          {/* Social Links & LinkedIn CTA */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Redes Sociais</h3>
            <div className="flex items-center justify-center sm:justify-start space-x-3">
              <a
                href="https://www.linkedin.com/in/flaviodesouza10/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/flaviodesouza10"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
            <Button 
              variant="hero" 
              size="sm" 
              className="w-full sm:w-auto min-h-[44px]"
              onClick={() => window.open("https://www.linkedin.com/in/flaviodesouza10/", "_blank")}
            >
              <Linkedin className="mr-2 h-4 w-4" />
              Meu LinkedIn
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 text-muted-foreground text-sm text-center sm:text-left">
              <span>© {currentYear} Nexum Tecnologia.</span>
              <span className="hidden sm:inline">|</span>
              <span className="flex items-center space-x-1">
                <span>Desenvolvido por</span>
                <span className="font-semibold text-foreground">Flávio de Souza</span>
              </span>
              <span className="hidden sm:inline">–</span>
              <span className="text-primary font-medium">Especialista em Dados e Automação em Saúde</span>
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