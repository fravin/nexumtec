import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, ExternalLink, Loader2, LogOut, Plus, Sparkles, Trash2, Copy } from "lucide-react";
import { lovable } from "@/integrations/lovable";
import "@lovable.dev/cloud-auth-js/styles.css";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAccess } from "@/hooks/useAdminAccess";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { blogTopics, slugify, topicLabel, type BlogPost } from "@/lib/blog";

type Draft = Partial<BlogPost>;

function Editor({ post, onClose, onSaved }: { post: Draft | null; onClose: () => void; onSaved: () => void }) {
  const [d, setD] = useState<Draft>({});
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  useEffect(() => { setD(post ?? {}); setFile(null); }, [post]);
  const set = (k: keyof BlogPost, v: string) => setD((x) => ({ ...x, [k]: v }));

  const save = async (publish?: boolean) => {
    if (!d.title?.trim() || !d.content?.trim()) { toast({ title: "Preencha título e conteúdo", variant: "destructive" }); return; }
    setSaving(true);
    let cover_path = d.cover_path ?? null;
    if (file) {
      const path = `${crypto.randomUUID()}.${file.name.split(".").pop() || "jpg"}`;
      const { error } = await supabase.storage.from("blog-images").upload(path, file, { contentType: file.type });
      if (error) { setSaving(false); toast({ title: "Falha no envio da imagem", description: error.message, variant: "destructive" }); return; }
      cover_path = path;
    }
    const status = publish === undefined ? d.status ?? "draft" : publish ? "published" : "draft";
    const row = {
      title: d.title.trim(), slug: d.slug?.trim() || slugify(d.title), excerpt: d.excerpt?.trim() ?? "", content: d.content,
      topic: d.topic ?? "tecnologia", kind: d.kind ?? "autoral", status, cover_path, instagram_caption: d.instagram_caption ?? null,
      published_at: status === "published" ? d.published_at ?? new Date().toISOString() : d.published_at ?? null,
    };
    const { error } = d.id ? await supabase.from("blog_posts").update(row).eq("id", d.id) : await supabase.from("blog_posts").insert(row);
    setSaving(false);
    if (error) { toast({ title: "Não foi possível salvar", description: error.message, variant: "destructive" }); return; }
    toast({ title: status === "published" ? "Post publicado" : "Rascunho salvo" });
    onSaved(); onClose();
  };

  return <Dialog open={!!post} onOpenChange={(o) => !o && onClose()}>
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader><DialogTitle className="font-serif text-2xl">{d.id ? "Editar post" : "Novo artigo"}</DialogTitle></DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2"><Label htmlFor="b-title">Título</Label><Input id="b-title" value={d.title ?? ""} onChange={(e) => set("title", e.target.value)} /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2"><Label htmlFor="b-topic">Tema</Label><select id="b-topic" value={d.topic ?? "tecnologia"} onChange={(e) => set("topic", e.target.value)} className="w-full min-h-10 border border-input bg-background px-3 text-sm">{blogTopics.filter((t) => t.value !== "autoral").map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
          <div className="space-y-2"><Label htmlFor="b-slug">Endereço (opcional)</Label><Input id="b-slug" value={d.slug ?? ""} onChange={(e) => set("slug", e.target.value)} placeholder="gerado pelo título" /></div>
        </div>
        <div className="space-y-2"><Label htmlFor="b-excerpt">Resumo</Label><Textarea id="b-excerpt" rows={2} value={d.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} /></div>
        <div className="space-y-2"><Label htmlFor="b-content">Conteúdo <span className="text-muted-foreground">(use ## para subtítulos)</span></Label><Textarea id="b-content" rows={14} value={d.content ?? ""} onChange={(e) => set("content", e.target.value)} /></div>
        <div className="space-y-2"><Label htmlFor="b-ig">Legenda para Instagram</Label><Textarea id="b-ig" rows={4} value={d.instagram_caption ?? ""} onChange={(e) => set("instagram_caption", e.target.value)} /></div>
        <div className="space-y-2"><Label htmlFor="b-cover">Imagem de capa {d.cover_path && <span className="text-muted-foreground">(já enviada — escolha outra para trocar)</span>}</Label><Input id="b-cover" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></div>
        <div className="flex flex-wrap gap-2 justify-end pt-2">
          <Button variant="glass" disabled={saving} onClick={() => void save(false)} className="min-h-11">Salvar rascunho</Button>
          <Button variant="hero" disabled={saving} onClick={() => void save(true)} className="min-h-11">{saving && <Loader2 className="animate-spin" />}Publicar</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>;
}

function Dashboard() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [editing, setEditing] = useState<Draft | null>(null);
  const [filter, setFilter] = useState<"draft" | "published" | "all">("draft");
  const [generating, setGenerating] = useState(false);
  const { data: posts = [], isLoading, refetch } = useQuery({
    queryKey: ["blog-admin"],
    queryFn: async () => { const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false }); if (error) throw error; return data as BlogPost[]; },
  });
  const { data: job, refetch: refetchJob } = useQuery({ queryKey: ["blog-job"], queryFn: async () => (await supabase.from("blog_job_state").select("*").maybeSingle()).data });
  const refresh = () => { void refetch(); void refetchJob(); void qc.invalidateQueries({ queryKey: ["blog-posts"] }); };
  const list = posts.filter((p) => filter === "all" || p.status === filter);

  const setStatus = async (p: BlogPost, published: boolean) => {
    const { error } = await supabase.from("blog_posts").update({ status: published ? "published" : "draft", published_at: published ? p.published_at ?? new Date().toISOString() : p.published_at }).eq("id", p.id);
    if (error) toast({ title: "Erro", description: error.message, variant: "destructive" }); else { toast({ title: published ? "Publicado" : "Voltou para rascunho" }); refresh(); }
  };
  const remove = async (p: BlogPost) => {
    if (!confirm(`Excluir “${p.title}”?`)) return;
    await supabase.from("blog_posts").delete().eq("id", p.id);
    if (p.cover_path) await supabase.storage.from("blog-images").remove([p.cover_path]);
    refresh();
  };
  const generate = async () => {
    setGenerating(true);
    const { data, error } = await supabase.functions.invoke("generate-blog-drafts", { body: {} });
    setGenerating(false);
    if (error) toast({ title: "Falha ao gerar", description: error.message, variant: "destructive" });
    else toast({ title: `${data?.created ?? 0} rascunho(s) criado(s)`, description: data?.error ?? "Também enviados para seu e-mail." });
    refresh();
  };

  return <div className="min-h-screen bg-secondary">
    <header className="bg-background border-b border-border"><div className="container max-w-6xl mx-auto px-5 sm:px-8 py-4 flex flex-wrap justify-between gap-3 items-center">
      <div><Link to="/" className="font-serif text-2xl text-foreground">Nexum Tecnologia</Link><p className="text-xs text-muted-foreground">Gerenciamento do blog</p></div>
      <div className="flex flex-wrap gap-2"><Button asChild variant="glass" className="min-h-11"><Link to="/blog">Ver blog<ExternalLink /></Link></Button><Button asChild variant="ghost" className="min-h-11"><Link to="/gerenciar-modelos">Vitrine</Link></Button><Button variant="ghost" onClick={() => void supabase.auth.signOut()} className="min-h-11"><LogOut />Sair</Button></div>
    </div></header>
    <main className="container max-w-6xl mx-auto px-5 sm:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
        <div><h1 className="font-serif text-4xl text-foreground">Posts do blog</h1><p className="text-sm text-muted-foreground mt-2">Notícias automáticas chegam a cada 3 dias como rascunho. {job?.last_run_at && `Última rodada: ${new Date(job.last_run_at).toLocaleString("pt-BR")}.`}</p>{job?.paused_reason && <p className="text-sm text-destructive mt-1">Automação pausada: {job.paused_reason}</p>}</div>
        <div className="flex flex-wrap gap-2"><Button variant="glass" onClick={() => void generate()} disabled={generating} className="min-h-12">{generating ? <Loader2 className="animate-spin" /> : <Sparkles />}Gerar notícias agora</Button><Button variant="hero" onClick={() => setEditing({ kind: "autoral", topic: "tecnologia" })} className="min-h-12"><Plus />Novo artigo</Button></div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">{([["draft", "Rascunhos"], ["published", "Publicados"], ["all", "Todos"]] as const).map(([v, l]) => <button key={v} type="button" aria-pressed={filter === v} onClick={() => setFilter(v)} className={`min-h-11 px-4 text-xs border ${filter === v ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border"}`}>{l} ({posts.filter((p) => v === "all" || p.status === v).length})</button>)}</div>
      {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" /> : <div className="space-y-3">
        {list.map((p) => <article key={p.id} className="bg-background border border-border p-5 flex flex-col lg:flex-row gap-4 lg:items-center">
          <div className="flex-1 min-w-0"><p className="text-[11px] uppercase font-semibold text-primary">{p.kind === "auto" ? "Automático" : "Autoral"} · {topicLabel(p.topic)} · <span className={p.status === "published" ? "text-accent" : "text-muted-foreground"}>{p.status === "published" ? "Publicado" : "Rascunho"}</span></p><h2 className="font-serif text-xl text-foreground mt-1">{p.title}</h2><p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p></div>
          <div className="flex flex-wrap gap-2">
            {p.instagram_caption && <Button variant="ghost" className="min-h-11" onClick={() => { void navigator.clipboard.writeText(p.instagram_caption!); toast({ title: "Legenda copiada" }); }}><Copy />Legenda</Button>}
            <Button variant="glass" className="min-h-11" onClick={() => setEditing(p)}><Edit />Editar</Button>
            <Button variant={p.status === "published" ? "ghost" : "hero"} className="min-h-11" onClick={() => void setStatus(p, p.status !== "published")}>{p.status === "published" ? "Despublicar" : "Publicar"}</Button>
            <Button variant="ghost" size="icon" aria-label={`Excluir ${p.title}`} className="min-h-11 min-w-11 hover:text-destructive" onClick={() => void remove(p)}><Trash2 /></Button>
          </div>
        </article>)}
        {!list.length && <div className="bg-background border border-border p-10 text-center text-sm text-muted-foreground">Nada por aqui ainda.</div>}
      </div>}
    </main>
    <Editor post={editing} onClose={() => setEditing(null)} onSaved={refresh} />
  </div>;
}

export default function GerenciarBlog() {
  const { user, isAdmin, isLoading } = useAdminAccess();
  const signIn = (provider: "google" | "lovable") => void lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin + "/gerenciar-blog" });
  return <>
    <Seo title="Gerenciar blog | Nexum" description="Área administrativa do blog da Nexum Tecnologia." path="/gerenciar-blog" noindex />
    {isLoading ? <main className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></main>
      : !user ? <main className="min-h-screen bg-secondary flex items-center justify-center px-5"><section className="max-w-md w-full bg-background border border-border p-8 space-y-3"><h1 className="font-serif text-3xl text-foreground mb-4">Gerenciar o blog</h1><Button variant="outline" className="w-full min-h-12" onClick={() => signIn("google")}>Entrar com Google</Button><button type="button" className="lovable-auth-button" onClick={() => signIn("lovable")}>Entrar com Lovable</button></section></main>
      : !isAdmin ? <main className="min-h-screen flex items-center justify-center px-5"><section className="text-center"><h1 className="font-serif text-3xl mb-4">Acesso não autorizado</h1><Button variant="glass" onClick={() => void supabase.auth.signOut()}>Sair</Button></section></main>
      : <Dashboard />}
  </>;
}
