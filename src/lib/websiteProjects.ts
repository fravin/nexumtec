import type { Tables } from "@/integrations/supabase/types";

export type WebsiteProject = Tables<"website_projects">;
export type WebsiteProjectKind = "demo" | "real";
export type WebsiteProjectSection = "general" | "health";

export const isExternalImage = (path?: string | null) =>
  Boolean(path && (/^(https?:)?\/\//.test(path) || path.startsWith("/") || path.startsWith("blob:") || path.startsWith("data:")));

export function publicProjectImage(project: Pick<WebsiteProject, "id" | "image_url" | "mobile_image_url">, variant: "desktop" | "mobile" = "desktop") {
  const path = variant === "mobile" ? project.mobile_image_url : project.image_url;
  if (!path) return "";
  if (isExternalImage(path)) return path;

  const params = new URLSearchParams({ id: project.id, variant });
  return `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/website-image?${params.toString()}`;
}

export const projectKindLabel = (kind: string) => kind === "real" ? "Projeto real" : "Modelo demonstrativo";
