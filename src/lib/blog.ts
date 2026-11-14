import type { Tables } from "@/integrations/supabase/types";
export type BlogPost = Tables<"blog_posts">;
export const blogTopics = [
  { value: "tecnologia", label: "Tecnologia" },
  { value: "ia", label: "Inteligência Artificial" },
  { value: "saude", label: "Saúde hospitalar" },
  { value: "autoral", label: "Artigos do Flávio" },
] as const;
export const topicLabel = (t: string) => blogTopics.find((x) => x.value === t)?.label ?? t;
export const coverUrl = (p: Pick<BlogPost, "id" | "cover_path">) =>
  p.cover_path ? `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/blog-image?id=${p.id}` : "";
export const slugify = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
export const formatDate = (d?: string | null) => d ? new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }) : "";
