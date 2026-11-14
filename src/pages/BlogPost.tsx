import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { coverUrl, formatDate, topicLabel, type BlogPost as Post } from "@/lib/blog";
import NotFound from "./NotFound";

export default function BlogPost() {
  const { slug = "" } = useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
      if (error) throw error;
      return data as Post | null;
    },
  });
  if (isLoading) return <main className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></main>;
  if (!post) return <NotFound />;
  const sources = (Array.isArray(post.sources) ? post.sources : []) as { title: string; url: string }[];
  const url = `https://www.nexumtec.com.br/blog/${post.slug}`;

  return <>
    <Seo title={`${post.title} | Blog Nexum`} description={post.excerpt} path={`/blog/${post.slug}`}
      jsonLd={[{ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, datePublished: post.published_at, dateModified: post.updated_at, url, mainEntityOfPage: url, author: post.kind === "autoral" ? { "@type": "Person", name: "Flávio de Souza" } : { "@id": "https://www.nexumtec.com.br/#organization" }, publisher: { "@id": "https://www.nexumtec.com.br/#organization" }, ...(post.cover_path ? { image: coverUrl(post) } : {}) }]} />
    <Header />
    <main className="bg-background pt-28">
      <article className="container max-w-3xl mx-auto px-5 sm:px-8 py-16 md:py-24">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary min-h-11"><ArrowLeft className="h-4 w-4" />Voltar ao blog</Link>
        <p className="text-xs uppercase font-semibold text-accent mt-6 mb-3">{post.kind === "autoral" ? "Artigo de Flávio de Souza" : topicLabel(post.topic)} · {formatDate(post.published_at)}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">{post.title}</h1>
        <p className="text-lg text-muted-foreground mt-5 leading-relaxed">{post.excerpt}</p>
        {post.cover_path && <img src={coverUrl(post)} alt="" className="w-full mt-10 border border-border" />}
        <div className="prose prose-slate max-w-none mt-10 prose-headings:font-serif prose-headings:font-normal prose-a:text-primary">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
        {sources.length > 0 && <aside className="mt-12 border-t border-border pt-6"><h2 className="text-xs uppercase font-semibold text-muted-foreground mb-3">Fontes</h2><ul className="space-y-2 text-sm">{sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="text-primary hover:underline break-words">{s.title}</a></li>)}</ul></aside>}
        <div className="mt-14 bg-secondary border border-border p-8"><h2 className="font-serif text-2xl text-foreground mb-3">Quer aplicar isso na sua empresa?</h2><p className="text-sm text-muted-foreground mb-6">Conte seu cenário e receba um diagnóstico gratuito da Nexum.</p><Button asChild variant="hero" className="min-h-12"><Link to="/contato">Solicitar Diagnóstico Gratuito</Link></Button></div>
      </article>
    </main>
    <Footer />
    <WhatsAppButton />
  </>;
}
