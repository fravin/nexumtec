import { createClient } from "npm:@supabase/supabase-js@2";
const cors = { "Access-Control-Allow-Origin": "*" };
Deno.serve(async (req) => {
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!/^[0-9a-f-]{36}$/.test(id)) return new Response("Inválido", { status: 400, headers: cors });
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data } = await db.from("blog_posts").select("cover_path").eq("id", id).eq("status", "published").maybeSingle();
  if (!data?.cover_path) return new Response("Não encontrada", { status: 404, headers: cors });
  const { data: file } = await db.storage.from("blog-images").download(data.cover_path);
  if (!file) return new Response("Não encontrada", { status: 404, headers: cors });
  return new Response(file, { headers: { ...cors, "Content-Type": file.type || "image/jpeg", "Cache-Control": "public, max-age=3600", "X-Content-Type-Options": "nosniff" } });
});
