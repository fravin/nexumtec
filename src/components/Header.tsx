import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <AnimatedSection animation="slideInLeft" delay={0} duration={800}>
            <div className="flex items-center space-x-3">
              <img 
                src={nexumLogo} 
                alt="Nexum Technology Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold gradient-text">Nexum Tecnologia</span>
            </div>
          </AnimatedSection>

          {/* Desktop Navigation */}
          <AnimatedSection animation="slideInRight" delay={200} duration={800}>
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-primary transition-smooth font-medium"
                >
                  {item.label}
                </button>
              ))}
              <ThemeToggle />
              <Button 
                variant="hero" 
                size="sm"
                onClick={() => scrollToSection("#contato")}
              >
                Fale Comigo
              </Button>
            </div>
          </AnimatedSection>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-3 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-foreground hover:text-primary transition-smooth font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button 
                variant="hero" 
                size="sm" 
                className="mt-2 self-start"
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