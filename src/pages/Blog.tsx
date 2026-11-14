import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Newspaper } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Seo from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";
import { blogTopics, coverUrl, formatDate, topicLabel, type BlogPost } from "@/lib/blog";

export const usePublishedPosts = () => useQuery({
  queryKey: ["blog-posts"],
  queryFn: async () => {
    const { data, error } = await supabase.from("blog_posts").select("*").eq("status", "published").order("published_at", { ascending: false });
    if (error) throw error;
    return data as BlogPost[];
  },
});

export default function Blog() {
  const { data: posts = [], isLoading } = usePublishedPosts();
  const [topic, setTopic] = useState<string>("all");
  const list = useMemo(() => posts.filter((p) => topic === "all" || (topic === "autoral" ? p.kind === "autoral" : p.topic === topic && p.kind !== "autoral")), [posts, topic]);

  return <>
    <Seo title="Blog | Tecnologia, IA e Saúde — Nexum Tecnologia" description="Notícias e análises sobre tecnologia, inteligência artificial e saúde hospitalar privada, com artigos de Flávio de Souza sobre como as empresas podem evoluir." path="/blog"
      jsonLd={[{ "@context": "https://schema.org", "@type": "Blog", name: "Blog Nexum Tecnologia", url: "https://www.nexumtec.com.br/blog", publisher: { "@id": "https://www.nexumtec.com.br/#organization" } }]} />
    <Header />
    <main className="bg-background pt-28">
      <section className="container max-w-6xl mx-auto px-5 sm:px-8 py-16 md:py-24">
        <p className="text-xs uppercase font-semibold text-primary mb-3">Blog Nexum</p>
        <h1 className="font-serif text-4xl md:text-6xl text-foreground max-w-3xl">Tecnologia, IA e saúde em linguagem de negócio</h1>
        <p className="text-muted-foreground mt-5 max-w-2xl leading-relaxed">O que está sendo falado no mercado e o que isso significa para clínicas, hospitais e empresas — além de artigos sobre o que estou estudando e aplicando.</p>
        <div className="flex flex-wrap gap-2 mt-10" role="group" aria-label="Filtrar por tema">
          {[{ value: "all", label: "Todos" }, ...blogTopics].map((t) => <button key={t.value} type="button" aria-pressed={topic === t.value} onClick={() => setTopic(t.value)} className={`min-h-11 px-4 text-xs border transition-colors ${topic === t.value ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:text-foreground"}`}>{t.label}</button>)}
        </div>
      </section>
      <section className="container max-w-6xl mx-auto px-5 sm:px-8 pb-24">
        {isLoading ? <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          : list.length === 0 ? <div className="border border-border p-12 text-center"><Newspaper className="h-8 w-8 mx-auto text-muted-foreground mb-4" /><p className="text-muted-foreground">Novos conteúdos em breve.</p></div>
          : <div className="grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => <Link key={p.id} to={`/blog/${p.slug}`} className="bg-background p-6 flex flex-col hover:bg-secondary transition-colors">
              {p.cover_path ? <img src={coverUrl(p)} alt="" loading="lazy" className="w-full aspect-video object-cover mb-5 border border-border" /> : <div className="w-full aspect-video mb-5 bg-gradient-to-br from-primary/10 to-accent/20 border border-border flex items-center justify-center"><span className="font-serif text-2xl text-primary">{topicLabel(p.kind === "autoral" ? "autoral" : p.topic)}</span></div>}
              <p className="text-[11px] uppercase font-semibold text-accent mb-2">{p.kind === "autoral" ? "Artigo" : topicLabel(p.topic)} · {formatDate(p.published_at)}</p>
              <h2 className="font-serif text-2xl text-foreground leading-tight">{p.title}</h2>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.excerpt}</p>
            </Link>)}
          </div>}
      </section>
    </main>
    <Footer />
    <WhatsAppButton />
  </>;
}
