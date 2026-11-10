import { useEffect, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import type { WebsiteProject, WebsiteProjectKind, WebsiteProjectSection } from "@/lib/websiteProjects";
import { useSignedProjectImage } from "@/hooks/useSignedProjectImage";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const draftSchema = z.object({
  title: z.string().trim().min(1, "Informe o nome do projeto.").max(120),
  kind: z.enum(["demo", "real"]),
  section: z.enum(["general", "health"]),
  category: z.string().trim().min(1, "Informe a categoria.").max(120),
  segment: z.string().trim().max(120),
  format: z.string().trim().max(120),
  description: z.string().trim().max(2000),
  features: z.string().trim().max(500),
  image_url: z.string().trim().min(1, "Envie uma imagem ou informe seu endereço."),
  mobile_image_url: z.string().trim(),
  project_url: z.string().trim().max(500).refine(value => !value || /^https?:\/\//.test(value), "Use um endereço iniciado por http:// ou https://."),
  published: z.boolean(),
  sort_order: z.number().int().min(0).max(9999),
});

type Draft = z.infer<typeof draftSchema>;

type ProjectEditorProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: WebsiteProject | null;
  defaultKind: WebsiteProjectKind;
  userId: string;
  onSaved: () => void;
};

function createDraft(project: WebsiteProject | null, defaultKind: WebsiteProjectKind): Draft {
  return {
    title: project?.title ?? "",
    kind: (project?.kind as WebsiteProjectKind | undefined) ?? defaultKind,
    section: (project?.section as WebsiteProjectSection | undefined) ?? "general",
    category: project?.category ?? "",
    segment: project?.segment ?? "",
    format: project?.format ?? "",
    description: project?.description ?? "",
    features: project?.features.join(", ") ?? "",
    image_url: project?.image_url ?? "",
    mobile_image_url: project?.mobile_image_url ?? "",
    project_url: project?.project_url ?? "",
    published: project?.published ?? false,
    sort_order: project?.sort_order ?? 0,
  };
}

async function uploadImage(file: File, userId: string) {
  if (!file.type.startsWith("image/")) throw new Error("Selecione um arquivo de imagem.");
  if (file.size > 10 * 1024 * 1024) throw new Error("A imagem deve ter no máximo 10 MB.");

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${userId}/${crypto.randomUUID()}-${safeName}`;
  const { error } = await supabase.storage.from("website-project-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return path;
}

export function ProjectEditor({ open, onOpenChange, project, defaultKind, userId, onSaved }: ProjectEditorProps) {
  const [draft, setDraft] = useState<Draft>(() => createDraft(project, defaultKind));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [mobileFile, setMobileFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const currentImage = useSignedProjectImage(draft.image_url);

  useEffect(() => {
    if (!open) return;
    setDraft(createDraft(project, defaultKind));
    setImageFile(null);
    setMobileFile(null);
  }, [open, project, defaultKind]);

  const update = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft(current => ({ ...current, [key]: value }));

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = draftSchema.safeParse({ ...draft, image_url: draft.image_url || (imageFile ? "upload" : "") });
    if (!parsed.success) {
      toast({ title: "Revise o formulário", description: parsed.error.issues[0]?.message, variant: "destructive" });
      return;
    }

    setIsSaving(true);
    try {
      const imageUrl = imageFile ? await uploadImage(imageFile, userId) : draft.image_url;
      const mobileImageUrl = mobileFile ? await uploadImage(mobileFile, userId) : draft.mobile_image_url || null;
      const payload = {
        title: parsed.data.title,
        kind: parsed.data.kind,
        section: parsed.data.kind === "real" ? "general" : parsed.data.section,
        category: parsed.data.category,
        segment: parsed.data.segment || null,
        format: parsed.data.format || null,
        description: parsed.data.description,
        features: parsed.data.features.split(",").map(item => item.trim()).filter(Boolean),
        image_url: imageUrl,
        mobile_image_url: mobileImageUrl,
        project_url: parsed.data.project_url || null,
        published: parsed.data.published,
        sort_order: parsed.data.sort_order,
        created_by: userId,
      };

      const result = project
        ? await supabase.from("website_projects").update(payload).eq("id", project.id)
        : await supabase.from("website_projects").insert(payload);
      if (result.error) throw result.error;

      toast({ title: project ? "Alterações salvas" : "Item adicionado", description: parsed.data.published ? "O conteúdo já está visível na vitrine." : "O rascunho foi salvo sem aparecer na vitrine." });
      onSaved();
      onOpenChange(false);
    } catch (error) {
      console.error("Project save failed:", error);
      toast({ title: "Não foi possível salvar", description: error instanceof Error ? error.message : "Tente novamente.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={nextOpen => { if (!isSaving) onOpenChange(nextOpen); }}>
      <DialogContent className="max-w-3xl max-h-[92dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Editar item da vitrine" : defaultKind === "real" ? "Novo projeto real" : "Novo modelo demonstrativo"}</DialogTitle>
          <DialogDescription>Preencha o conteúdo e escolha se ele ficará público ou salvo como rascunho.</DialogDescription>
        </DialogHeader>

        <form onSubmit={save} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="project-title">Nome</Label>
              <Input id="project-title" value={draft.title} onChange={event => update("title", event.target.value)} placeholder="Ex.: Clínica Aurora" className="min-h-11" />
            </div>
            <div className="space-y-2">
              <Label>Tipo de conteúdo</Label>
              <Select value={draft.kind} onValueChange={(value: WebsiteProjectKind) => update("kind", value)}>
                <SelectTrigger className="min-h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="demo">Modelo demonstrativo</SelectItem>
                  <SelectItem value="real">Projeto real</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {draft.kind === "demo" && <div className="space-y-2">
              <Label>Área da vitrine</Label>
              <Select value={draft.section} onValueChange={(value: WebsiteProjectSection) => update("section", value)}>
                <SelectTrigger className="min-h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Modelos principais</SelectItem>
                  <SelectItem value="health">Profissionais da saúde</SelectItem>
                </SelectContent>
              </Select>
            </div>}
            <div className="space-y-2">
              <Label htmlFor="project-category">Categoria</Label>
              <Input id="project-category" value={draft.category} onChange={event => update("category", event.target.value)} placeholder="Ex.: Site para clínica" className="min-h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-order">Ordem de exibição</Label>
              <Input id="project-order" type="number" min={0} max={9999} value={draft.sort_order} onChange={event => update("sort_order", Number(event.target.value))} className="min-h-11" />
            </div>
            {draft.kind === "demo" && <>
              <div className="space-y-2">
                <Label htmlFor="project-segment">Segmento <span className="text-muted-foreground">(opcional)</span></Label>
                <Input id="project-segment" value={draft.segment} onChange={event => update("segment", event.target.value)} placeholder="Ex.: Fisioterapia" className="min-h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-format">Formato <span className="text-muted-foreground">(opcional)</span></Label>
                <Input id="project-format" value={draft.format} onChange={event => update("format", event.target.value)} placeholder="Ex.: Site institucional" className="min-h-11" />
              </div>
            </>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description">Descrição</Label>
            <Textarea id="project-description" value={draft.description} onChange={event => update("description", event.target.value)} rows={4} placeholder="Apresente o objetivo e os principais recursos." />
          </div>

          {draft.kind === "demo" && <div className="space-y-2">
            <Label htmlFor="project-features">Recursos separados por vírgula <span className="text-muted-foreground">(opcional)</span></Label>
            <Input id="project-features" value={draft.features} onChange={event => update("features", event.target.value)} placeholder="Especialidades, Equipe, Agendamento" className="min-h-11" />
          </div>}

          {draft.kind === "real" && <div className="space-y-2">
            <Label htmlFor="project-url">Link do projeto publicado <span className="text-muted-foreground">(opcional)</span></Label>
            <Input id="project-url" type="url" value={draft.project_url} onChange={event => update("project_url", event.target.value)} placeholder="https://www.exemplo.com.br" className="min-h-11" />
          </div>}

          <div className="grid md:grid-cols-2 gap-5 border-t border-border pt-6">
            <div className="space-y-3">
              <Label htmlFor="project-image">Imagem principal</Label>
              {currentImage && <img src={currentImage} alt="Imagem atual do projeto" className="w-full aspect-[45/32] object-cover object-top border border-border bg-secondary" />}
              <Input id="project-image" type="file" accept="image/png,image/jpeg,image/webp" onChange={event => setImageFile(event.target.files?.[0] ?? null)} className="h-auto min-h-11 py-2 file:mr-3 file:rounded-sm file:border-0 file:bg-primary file:px-3 file:py-2 file:text-primary-foreground" />
              {imageFile && <p className="text-xs text-muted-foreground flex items-center gap-2"><Upload className="h-3.5 w-3.5" />{imageFile.name}</p>}
              <Label htmlFor="project-image-url" className="text-xs text-muted-foreground">Ou endereço/caminho da imagem</Label>
              <Input id="project-image-url" value={draft.image_url} onChange={event => update("image_url", event.target.value)} placeholder="https://... ou /modelos/imagem.jpg" className="min-h-11" />
            </div>
            <div className="space-y-3">
              <Label htmlFor="project-mobile-image">Imagem mobile <span className="text-muted-foreground">(opcional)</span></Label>
              <Input id="project-mobile-image" type="file" accept="image/png,image/jpeg,image/webp" onChange={event => setMobileFile(event.target.files?.[0] ?? null)} className="h-auto min-h-11 py-2 file:mr-3 file:rounded-sm file:border-0 file:bg-primary file:px-3 file:py-2 file:text-primary-foreground" />
              {mobileFile && <p className="text-xs text-muted-foreground flex items-center gap-2"><Upload className="h-3.5 w-3.5" />{mobileFile.name}</p>}
              <p className="text-xs text-muted-foreground leading-relaxed">Use capturas próprias em JPG, PNG ou WebP, de até 10 MB. A imagem principal é obrigatória.</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-y border-border py-4">
            <div><Label htmlFor="project-published">Publicar na vitrine</Label><p className="text-xs text-muted-foreground mt-1">Desative para manter como rascunho.</p></div>
            <Switch id="project-published" checked={draft.published} onCheckedChange={value => update("published", value)} />
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isSaving} className="min-h-11">Cancelar</Button>
            <Button type="submit" variant="hero" disabled={isSaving} className="min-h-11">
              {isSaving && <Loader2 className="animate-spin" />}{isSaving ? "Salvando..." : draft.published ? "Salvar e publicar" : "Salvar rascunho"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
