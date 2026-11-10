import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { healthExamples, websiteExamples } from "@/content/websiteCreation";
import type { WebsiteProject } from "@/lib/websiteProjects";

const now = new Date(0).toISOString();

export const fallbackWebsiteProjects: WebsiteProject[] = [
  ...websiteExamples.map((item, index): WebsiteProject => ({
    id: `legacy-general-${index}`,
    title: item.name,
    kind: "demo",
    section: "general",
    category: item.category,
    segment: null,
    format: null,
    description: item.description,
    features: item.features,
    image_url: item.image,
    mobile_image_url: index === 0 ? "/modelos/sites-clinica-mobile-demo.jpg" : null,
    project_url: null,
    published: true,
    sort_order: index + 1,
    created_by: null,
    created_at: now,
    updated_at: now,
  })),
  ...healthExamples.map((item, index): WebsiteProject => ({
    id: `legacy-health-${index}`,
    title: item.name,
    kind: "demo",
    section: "health",
    category: item.category,
    segment: item.segment,
    format: item.format,
    description: item.description,
    features: [],
    image_url: item.image,
    mobile_image_url: null,
    project_url: null,
    published: true,
    sort_order: index + 1,
    created_by: null,
    created_at: now,
    updated_at: now,
  })),
];

async function fetchWebsiteProjects(includeUnpublished: boolean) {
  let query = supabase
    .from("website_projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (!includeUnpublished) query = query.eq("published", true);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export function useWebsiteProjects(options: { includeUnpublished?: boolean } = {}) {
  const includeUnpublished = options.includeUnpublished ?? false;

  return useQuery({
    queryKey: ["website-projects", includeUnpublished ? "admin" : "public"],
    queryFn: () => fetchWebsiteProjects(includeUnpublished),
    placeholderData: includeUnpublished ? undefined : fallbackWebsiteProjects,
    staleTime: 30_000,
  });
}
