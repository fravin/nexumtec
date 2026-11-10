import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { Edit, ExternalLink, Image as ImageIcon, LayoutTemplate, Loader2, LogOut, Plus, Save, Trash2 } from "lucide-react";
import { lovable } from "@/integrations/lovable";
import "@lovable.dev/cloud-auth-js/styles.css";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useAdminAccess } from "@/hooks/useAdminAccess";
import { useWebsiteProjects } from "@/hooks/useWebsiteProjects";
import { useSignedProjectImage } from "@/hooks/useSignedProjectImage";
import { isExternalImage, projectKindLabel, type WebsiteProject, type WebsiteProjectKind } from "@/lib/websiteProjects";
import { ProjectEditor } from "@/components/admin/ProjectEditor";
import Seo from "@/components/Seo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

function GoogleLogo() {
  return <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"/></svg>;
}

function SignIn({ onSignIn, isSigningIn }: { onSignIn: (provider: "google" | "lovable") => void; isSigningIn: boolean }) {
  return <main className="min-h-screen bg-secondary flex items-center justify-center px-5 py-16">
    <section className="w-full max-w-md bg-background border border-border shadow-md p-7 sm:p-10">
      <div className="w-12 h-12 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-7"><LayoutTemplate className="h-6 w-6" /></div>
      <p className="text-xs uppercase font-semibold text-primary mb-3">Área administrativa</p>
      <h1 className="font-serif text-4xl text-foreground mb-4">Gerenciar a vitrine</h1>
      <p className="text-sm text-muted-foreground leading-relaxed mb-8">Entre com sua conta autorizada para adicionar modelos, publicar projetos reais e enviar suas próprias imagens.</p>
      <div className="space-y-3">
        <Button type="button" variant="outline" onClick={() => onSignIn("google")} disabled={isSigningIn} className="w-full min-h-12 font-medium tracking-normal" style={{ backgroundColor: "#FFFFFF", borderColor: "#747775", color: "#1F1F1F" }}>
          {isSigningIn ? <Loader2 className="animate-spin" /> : <GoogleLogo />}Entrar com Google
        </Button>
        <button type="button" className="lovable-auth-button" onClick={() => onSignIn("lovable")} disabled={isSigningIn}>Entrar com Lovable</button>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mt-7">Acesso exclusivo do administrador. Não há cadastro público nesta área.</p>
      <Button asChild variant="link" className="px-0 mt-5 tracking-normal"><Link to="/criacao-de-sites">Voltar para a vitrine</Link></Button>
    </section>
  </main>;
}

function ProjectThumbnail({ project }: { project: WebsiteProject }) {
  const image = useSignedProjectImage(project.image_url);
  return <div className="w-full sm:w-40 aspect-[45/32] shrink-0 bg-secondary border border-border flex items-center justify-center overflow-hidden">
    {image ? <img src={image} alt="" className="w-full h-full object-cover object-top" /> : <ImageIcon className="h-6 w-6 text-muted-foreground" />}
  </div>;
}

type DashboardProps = {
  user: User;
  profile: Tables<"profiles"> | null;
  onProfileSaved: (profile: Tables<"profiles">) => void;
};

function AdminDashboard({ user, profile, onProfileSaved }: DashboardProps) {
  const { data: projects = [], isLoading, refetch } = useWebsiteProjects({ includeUnpublished: true });
  const [filter, setFilter] = useState<"all" | "demo" | "real" | "draft">("all");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorProject, setEditorProject] = useState<WebsiteProject | null>(null);
  const [editorKind, setEditorKind] = useState<WebsiteProjectKind>("demo");
  const [displayName, setDisplayName] = useState(profile?.display_name ?? "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? "");
  const [savingProfile, setSavingProfile] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    setDisplayName(profile?.display_name ?? user.user_metadata.full_name ?? "");
    setAvatarUrl(profile?.avatar_url ?? "");
  }, [profile, user]);

  const filteredProjects = useMemo(() => projects.filter(project => {
    if (filter === "draft") return !project.published;
    if (filter === "demo" || filter === "real") return project.kind === filter;
    return true;
  }), [projects, filter]);

  const refresh = async () => {
    await refetch();
    await queryClient.invalidateQueries({ queryKey: ["website-projects"] });
  };

  const openEditor = (kind: WebsiteProjectKind, project: WebsiteProject | null = null) => {
    setEditorKind(kind);
    setEditorProject(project);
    setEditorOpen(true);
  };

  const togglePublished = async (project: WebsiteProject, published: boolean) => {
    const { error } = await supabase.from("website_projects").update({ published }).eq("id", project.id);
    if (error) {
      toast({ title: "Não foi possível alterar a publicação", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: published ? "Item publicado" : "Item movido para rascunho" });
    await refresh();
  };

  const removeProject = async (project: WebsiteProject) => {
    const { error } = await supabase.from("website_projects").delete().eq("id", project.id);
    if (error) {
      toast({ title: "Não foi possível excluir", description: error.message, variant: "destructive" });
      return;
    }

    const storedImages = [project.image_url, project.mobile_image_url].filter((path): path is string => Boolean(path && !isExternalImage(path)));
    if (storedImages.length) await supabase.storage.from("website-project-images").remove(storedImages);
    toast({ title: "Item excluído da vitrine" });
    await refresh();
  };

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setSavingProfile(true);
    const { data, error } = await supabase.from("profiles").upsert({
      id: user.id,
      display_name: displayName.trim() || null,
      avatar_url: avatarUrl.trim() || null,
    }).select().single();
    setSavingProfile(false);

    if (error) {
      toast({ title: "Não foi possível salvar o perfil", description: error.message, variant: "destructive" });
      return;
    }
    onProfileSaved(data);
    toast({ title: "Perfil atualizado" });
  };

  const counts = {
    all: projects.length,
    demo: projects.filter(project => project.kind === "demo").length,
    real: projects.filter(project => project.kind === "real").length,
    draft: projects.filter(project => !project.published).length,
  };

  return <div className="min-h-screen bg-secondary">
    <header className="bg-background border-b border-border">
      <div className="container max-w-7xl mx-auto px-5 sm:px-8 min-h-20 py-4 flex flex-wrap items-center justify-between gap-4">
        <div><Link to="/" className="font-serif text-2xl text-foreground">Nexum Tecnologia</Link><p className="text-xs text-muted-foreground">Gerenciamento da vitrine</p></div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="glass" className="min-h-11"><Link to="/criacao-de-sites">Ver vitrine<ExternalLink /></Link></Button>
          <Button variant="ghost" onClick={() => void supabase.auth.signOut()} className="min-h-11"><LogOut />Sair</Button>
        </div>
      </div>
    </header>

    <main className="container max-w-7xl mx-auto px-5 sm:px-8 py-10 md:py-14">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div><p className="text-xs uppercase font-semibold text-primary mb-3">Conteúdo da página Criação de sites</p><h1 className="font-serif text-4xl md:text-5xl text-foreground">Modelos e projetos reais</h1><p className="text-sm text-muted-foreground mt-3 max-w-2xl leading-relaxed">Cadastre capturas próprias, organize a ordem e publique cada item quando estiver pronto.</p></div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="glass" onClick={() => openEditor("demo")} className="min-h-12"><Plus />Novo modelo</Button>
          <Button variant="hero" onClick={() => openEditor("real")} className="min-h-12"><Plus />Novo projeto real</Button>
        </div>
      </div>

      <section aria-labelledby="profile-title" className="bg-background border border-border p-6 sm:p-8 mb-10">
        <div className="flex items-start gap-4 mb-6"><Avatar className="h-12 w-12 rounded-sm"><AvatarImage src={avatarUrl || undefined} /><AvatarFallback className="rounded-sm">{(displayName || user.email || "N").slice(0, 1).toUpperCase()}</AvatarFallback></Avatar><div><h2 id="profile-title" className="font-serif text-2xl text-foreground">Seu perfil</h2><p className="text-xs text-muted-foreground break-all">{user.email}</p></div></div>
        <form onSubmit={saveProfile} className="grid md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
          <div className="space-y-2"><Label htmlFor="profile-name">Nome de exibição</Label><Input id="profile-name" value={displayName} onChange={event => setDisplayName(event.target.value)} className="min-h-11" /></div>
          <div className="space-y-2"><Label htmlFor="profile-avatar">Endereço da foto <span className="text-muted-foreground">(opcional)</span></Label><Input id="profile-avatar" type="url" value={avatarUrl} onChange={event => setAvatarUrl(event.target.value)} placeholder="https://..." className="min-h-11" /></div>
          <Button type="submit" variant="glass" disabled={savingProfile} className="min-h-11">{savingProfile ? <Loader2 className="animate-spin" /> : <Save />}Salvar perfil</Button>
        </form>
      </section>

      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filtrar conteúdo">
        {([ ["all", "Todos"], ["demo", "Modelos"], ["real", "Projetos reais"], ["draft", "Rascunhos"] ] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)} className={`min-h-11 px-4 text-xs border transition-colors ${filter === value ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:text-foreground"}`}>{label} ({counts[value]})</button>)}
      </div>

      {isLoading ? <div className="min-h-40 flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div> : <div className="space-y-4">
        {filteredProjects.map(project => <article key={project.id} className="bg-background border border-border p-4 sm:p-5 flex flex-col xl:flex-row gap-5 xl:items-center">
          <ProjectThumbnail project={project} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-2"><span className="text-[11px] uppercase font-semibold text-primary">{projectKindLabel(project.kind)}</span><span className={`text-[11px] uppercase ${project.published ? "text-accent" : "text-muted-foreground"}`}>{project.published ? "Publicado" : "Rascunho"}</span></div>
            <h2 className="font-serif text-2xl text-foreground">{project.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{project.category}{project.segment ? ` · ${project.segment}` : ""} · Ordem {project.sort_order}</p>
          </div>
          <div className="flex items-center gap-3 xl:border-l xl:border-border xl:pl-5">
            <Label htmlFor={`published-${project.id}`} className="text-xs">Publicado</Label>
            <Switch id={`published-${project.id}`} checked={project.published} onCheckedChange={value => void togglePublished(project, value)} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="glass" onClick={() => openEditor(project.kind as WebsiteProjectKind, project)} className="min-h-11"><Edit />Editar</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild><Button variant="ghost" size="icon" aria-label={`Excluir ${project.title}`} className="min-h-11 min-w-11 text-muted-foreground hover:text-destructive"><Trash2 /></Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader><AlertDialogTitle>Excluir “{project.title}”?</AlertDialogTitle><AlertDialogDescription>Esta ação remove o item da vitrine e não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
                <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => void removeProject(project)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Excluir</AlertDialogAction></AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </article>)}
        {filteredProjects.length === 0 && <div className="bg-background border border-border p-10 text-center"><ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-4" /><h2 className="font-serif text-2xl text-foreground mb-2">Nenhum item nesta visualização</h2><p className="text-sm text-muted-foreground">Adicione um modelo ou projeto real para começar.</p></div>}
      </div>}
    </main>

    <ProjectEditor open={editorOpen} onOpenChange={setEditorOpen} project={editorProject} defaultKind={editorKind} userId={user.id} onSaved={() => void refresh()} />
  </div>;
}

export default function GerenciarModelos() {
  const { user, profile, setProfile, isAdmin, isLoading } = useAdminAccess();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { toast } = useToast();

  const signIn = async (provider: "google" | "lovable") => {
    setIsSigningIn(true);
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
      extraParams: { login_hint: "flavio.de.souza10@gmail.com", prompt: "select_account" },
    });
    if (result.redirected) return;
    setIsSigningIn(false);
    if (result.error) toast({ title: "Não foi possível entrar", description: result.error instanceof Error ? result.error.message : "Tente novamente.", variant: "destructive" });
  };

  return <>
    <Seo title="Gerenciar modelos e projetos | Nexum" description="Área administrativa da vitrine de criação de sites da Nexum Tecnologia." path="/gerenciar-modelos" noindex />
    {isLoading ? <main className="min-h-screen bg-secondary flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /><span className="sr-only">Verificando acesso</span></main> : !user ? <SignIn onSignIn={signIn} isSigningIn={isSigningIn} /> : !isAdmin ? <main className="min-h-screen bg-secondary flex items-center justify-center px-5"><section className="max-w-md bg-background border border-border p-8 text-center"><h1 className="font-serif text-3xl text-foreground mb-4">Acesso não autorizado</h1><p className="text-sm text-muted-foreground mb-6">Esta conta não tem permissão para gerenciar a vitrine. Entre com a conta do administrador.</p><Button variant="glass" onClick={() => void supabase.auth.signOut()} className="min-h-11"><LogOut />Sair e trocar de conta</Button></section></main> : <AdminDashboard user={user} profile={profile} onProfileSaved={setProfile} />}
  </>;
}
