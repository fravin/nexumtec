import { useEffect, useState } from "react";

const ImpactMetrics = () => {
  const metrics = [
    { value: 15, suffix: "+", label: "Anos de experiência" },
    { value: 50, suffix: "+", label: "Projetos completados" },
    { value: 85, suffix: "%", label: "Melhoria média em processos" },
    { value: 100, suffix: "%", label: "Satisfação dos clientes" },
  ];

  const [counts, setCounts] = useState(metrics.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          metrics.forEach((m, i) => {
            let start = 0;
            const duration = 2000;
            const inc = m.value / (duration / 16);
            const t = setInterval(() => {
              start += inc;
              if (start >= m.value) {
                setCounts((p) => { const n = [...p]; n[i] = m.value; return n; });
                clearInterval(t);
              } else {
                setCounts((p) => { const n = [...p]; n[i] = Math.floor(start); return n; });
              }
            }, 16);
          });
        }
      },
      { threshold: 0.5 }
    );
    const el = document.getElementById("impact-metrics");
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [hasAnimated]);

  return (
    <section id="impact-metrics" className="py-16 bg-ink relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-white/[0.06]">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`p-8 text-center bg-ink-2 ${
                i > 0 ? "border-l border-white/[0.06]" : ""
              }`}
            >
              <div className="serif-display text-gold text-4xl md:text-5xl mb-2 leading-none">
                {counts[i]}{m.suffix}
              </div>
              <div className="font-mono text-[0.62rem] tracking-[0.14em] uppercase text-muted-foreground">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
