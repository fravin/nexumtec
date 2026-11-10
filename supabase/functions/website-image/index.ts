import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const imageResponse = (body: BodyInit | null, status: number, headers: Record<string, string> = {}) =>
  new Response(body, { status, headers: { ...corsHeaders, ...headers } });

serve(async (req) => {
  if (req.method === "OPTIONS") return imageResponse(null, 204);
  if (req.method !== "GET") return imageResponse("Método não permitido", 405);

  const url = new URL(req.url);
  const id = z.string().uuid().safeParse(url.searchParams.get("id"));
  const variant = url.searchParams.get("variant") === "mobile" ? "mobile" : "desktop";
  if (!id.success) return imageResponse("Imagem inválida", 400);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: project, error } = await supabase
    .from("website_projects")
    .select("image_url, mobile_image_url")
    .eq("id", id.data)
    .eq("published", true)
    .maybeSingle();

  if (error || !project) return imageResponse("Imagem não encontrada", 404);

  const path = variant === "mobile" ? project.mobile_image_url : project.image_url;
  if (!path || /^(https?:)?\/\//.test(path) || path.startsWith("/")) {
    return imageResponse("Imagem não encontrada", 404);
  }

  const { data: file, error: downloadError } = await supabase.storage
    .from("website-project-images")
    .download(path);

  if (downloadError || !file) return imageResponse("Imagem não encontrada", 404);

  return imageResponse(file, 200, {
    "Content-Type": file.type || "image/jpeg",
    "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
    "X-Content-Type-Options": "nosniff",
  });
});
