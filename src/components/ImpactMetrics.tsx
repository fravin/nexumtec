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
    <section id="impact-metrics" className="py-12 sm:py-14 md:py-16 bg-ink relative z-10">
      <div className="container mx-auto px-5 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-border">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`p-5 sm:p-6 md:p-8 text-center bg-ink-2 ${
                i % 2 !== 0 ? "border-l border-border" : ""
              } ${i >= 2 ? "border-t md:border-t-0 border-border" : ""} ${
                i > 0 && "md:border-l md:border-border"
              }`}
            >
              <div className="serif-display text-primary text-3xl sm:text-4xl md:text-5xl mb-2 leading-none">
                {counts[i]}{m.suffix}
              </div>
              <div className="font-mono text-[0.58rem] sm:text-[0.62rem] tracking-[0.12em] sm:tracking-[0.14em] uppercase text-muted-foreground leading-tight">
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
