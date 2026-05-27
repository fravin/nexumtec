import { Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { label: "Serviços", href: "#servicos" },
    { label: "Projetos", href: "#projetos" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <footer className="relative z-10 border-t border-border bg-ink-2">
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <a href="/" className="nav-inline font-serif text-lg text-foreground tracking-wide">
          <span className="font-semibold">Nexum</span>{" "}
          <em className="italic font-medium text-primary">Tecnologia</em>
        </a>

        {/* Links */}
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="nav-inline font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
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
      <div className="border-t border-border/60 py-4">
        <p className="text-center font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground/80">
          © {year} Nexum Tecnologia · Flávio Admilson · Rio de Janeiro
        </p>
      </div>
    </footer>
  );
};

export default Footer;
