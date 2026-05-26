const items = [
  "Desenvolvimento de Sistemas",
  "Business Intelligence",
  "Inteligência Artificial",
  "Automação de Processos",
  "Power BI",
  "Soluções para Saúde",
  "Machine Learning",
  "Consultoria Estratégica",
];

const Marquee = () => {
  // Duplicate the list so the loop is seamless
  const all = [...items, ...items];

  return (
    <div className="relative z-10 border-y border-white/[0.06] bg-ink-2 py-4 overflow-hidden">
      <div className="marquee gap-16 px-8">
        {all.map((label, i) => (
          <div
            key={i}
            className="flex items-center gap-4 font-mono text-[0.72rem] tracking-[0.18em] uppercase text-muted-foreground whitespace-nowrap"
          >
            <span className="w-1 h-1 rounded-full bg-gold" aria-hidden />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
