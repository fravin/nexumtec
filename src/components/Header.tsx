import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Linkedin, Github, Mail } from "lucide-react";
import nexumLogo from "@/assets/nexum-logo.png";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AnimatedSection } from "@/components/AnimatedSection";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Início", href: "#inicio" },
    { label: "Sobre Mim", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Cases de Sucesso", href: "#cases-sucesso" },
    { label: "Projetos", href: "#projetos" },
    { label: "Contato", href: "#contato" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled ? "glass shadow-md" : "bg-background/95 backdrop-blur-sm shadow-sm"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <AnimatedSection animation="slideInLeft" delay={0} duration={800}>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src={nexumLogo} 
                alt="Nexum Technology Logo" 
                className="h-8 sm:h-10 w-auto"
                loading="eager"
              />
              <span className="text-lg sm:text-xl font-bold gradient-text">Nexum Tecnologia</span>
            </div>
          </AnimatedSection>

          {/* Desktop Navigation */}
          <AnimatedSection animation="slideInRight" delay={200} duration={800}>
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-primary transition-smooth font-medium text-sm xl:text-base"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Social Links */}
              <div className="flex items-center space-x-2">
                <a
                  href="https://www.linkedin.com/in/flaviodesouza10/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-primary/10 text-foreground hover:text-primary transition-smooth min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/flaviodesouza10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-primary/10 text-foreground hover:text-primary transition-smooth min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
              
              <ThemeToggle />
              <Button 
                variant="hero" 
                size="sm"
                onClick={() => scrollToSection("#contato")}
                className="min-h-[44px]"
              >
                Fale Comigo
              </Button>
            </div>
          </AnimatedSection>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <a
              href="https://www.linkedin.com/in/flaviodesouza10/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-primary/10 text-foreground hover:text-primary transition-smooth min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <ThemeToggle />
            <button
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-1 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-foreground hover:text-primary hover:bg-primary/5 transition-smooth font-medium py-3 px-2 rounded-lg min-h-[44px]"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center space-x-2 pt-2 px-2">
                <a
                  href="https://github.com/flaviodesouza10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-primary/10 text-foreground hover:text-primary transition-smooth min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="mailto:contato@nexumtec.com.br"
                  className="p-2 rounded-lg hover:bg-primary/10 text-foreground hover:text-primary transition-smooth min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
              <Button 
                variant="hero" 
                size="sm" 
                className="mt-2 self-start min-h-[44px]"
                onClick={() => scrollToSection("#contato")}
              >
                Fale Comigo
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;