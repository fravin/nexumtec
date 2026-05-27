import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Linkedin, Github, Download } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Serviços", href: "#servicos" },
    { label: "Projetos", href: "#projetos" },
    { label: "Diagnóstico", href: "#contato" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "#contato" },
  ];

  const go = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("/") && !href.startsWith("/#")) {
      navigate(href);
      window.scrollTo(0, 0);
      return;
    }
    if (location.pathname !== "/") {
      navigate(`/${href}`);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border"
          : "bg-background/80 backdrop-blur-md"
      }`}
    >
      <nav className="container mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => go("/")}
          className="nav-inline flex items-center gap-2 font-serif text-xl sm:text-2xl tracking-wide text-foreground"
          aria-label="Nexum Tecnologia"
        >
          <span className="font-semibold">Nexum</span>
          <em className="italic font-medium text-primary">Tecnologia</em>
        </button>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-9">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => go(item.href)}
                className="nav-inline font-mono text-[0.72rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/flaviodesouza10/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="nav-inline p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/flaviodesouza10"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="nav-inline p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
          <a href="/cv-flavio-admilson.pdf" download="CV-Flavio-Admilson.pdf">
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
              CV
            </Button>
          </a>
          <Button variant="outline" size="sm" onClick={() => go("#contato")}>
            Falar conosco
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto px-5 py-5 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => go(item.href)}
                className="text-left font-mono text-xs tracking-[0.18em] uppercase text-muted-foreground hover:text-primary py-3 px-2"
              >
                {item.label}
              </button>
            ))}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-border mt-3">
              <a href="/cv-flavio-admilson.pdf" download="CV-Flavio-Admilson.pdf">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" /> CV
                </Button>
              </a>
              <Button variant="outline" size="sm" onClick={() => go("#contato")}>
                Falar conosco
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
