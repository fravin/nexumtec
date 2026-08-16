import { Linkedin, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import nexumLogoFull from "@/assets/nexum-logo-full.png.asset.json";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { label: "Início", href: "/" },
    { label: "Saúde", href: "/saude" },
    { label: "Negócios", href: "/negocios" },
    { label: "Sobre", href: "/sobre" },
  ];

  return (
    <footer className="relative z-10 border-t border-border bg-ink-2">
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="nav-inline inline-flex items-center" aria-label="Nexum Tecnologia">
          <img
            src={nexumLogoFull.url}
            alt="Nexum Tecnologia"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Links */}
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.href}
                className="nav-inline font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="/#contato"
              className="nav-inline font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              Contato
            </a>
          </li>
        </ul>


        {/* Social */}
        <div className="flex items-center gap-2">
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
          <a
            href="mailto:contato@nexumtec.com.br"
            aria-label="E-mail"
            className="nav-inline p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 pb-20 md:pb-4">
        <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground/80 px-16 md:px-0">
          © {year} Nexum Tecnologia · Flávio Admilson · Rio de Janeiro
        </p>
      </div>
    </footer>
  );
};

export default Footer;
