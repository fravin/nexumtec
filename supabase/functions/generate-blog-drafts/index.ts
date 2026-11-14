import { createClient } from "npm:@supabase/supabase-js@2";
import { generateResponse } from "npm:@lovable.dev/ai-gateway";
import { authenticateCronRequest } from "../_shared/cron-auth.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });
const JOB = "generate-blog-drafts";

const TOPICS = [
  { topic: "tecnologia", label: "Tecnologia", query: "tecnologia transformação digital empresas notícias" },
  { topic: "ia", label: "Inteligência Artificial", query: "inteligência artificial novidades empresas notícias" },
  { topic: "saude", label: "Saúde hospitalar privada", query: "hospitais privados saúde suplementar tecnologia notícias Brasil" },
];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slugify = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);

async function search(query: string) {
  const res = await fetch("https://connector-gateway.lovable.dev/firecrawl/v2/search", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`, "X-Connection-Api-Key": Deno.env.get("FIRECRAWL_API_KEY")! },
    body: JSON.stringify({ query, limit: 6, lang: "pt", country: "br", tbs: "qdr:w" }),
  });
  if (!res.ok) throw Object.assign(new Error(`Busca falhou [${res.status}]: ${await res.text()}`), { status: res.status });
  const data = await res.json();
  return (data?.data?.web ?? []) as { url: string; title: string; description?: string }[];
}

async function write(label: string, results: { url: string; title: string; description?: string }[]) {
  const list = results.map((r, i) => `[${i + 1}] ${r.title}\n${r.url}\n${r.description ?? ""}`).join("\n\n");
  const res: any = await generateResponse({
    model: "openai/gpt-6-astra",
    instructions: `Você é editor do blog da Nexum Tecnologia (tecnologia humanizada para negócios e saúde). Escolha o assunto mais relevante entre os resultados e escreva um post informativo ORIGINAL em português do Brasil sobre "${label}", sem copiar trechos, sem inventar números ou fatos que não estejam nos resultados. Responda SOMENTE JSON válido: {"title": string, "excerpt": string (até 200 caracteres), "content": string (markdown, 400-700 palavras, com subtítulos ## e um parágrafo final "O que isso significa para sua empresa"), "sources": [índices usados], "instagram": string (legenda até 600 caracteres com 5-8 hashtags)}.`,
    input: list.slice(0, 8000),
  });
  const text = typeof res.output_text === "string" ? res.output_text : (res.output ?? []).flatMap((o: any) => o.content ?? []).filter((c: any) => c.type === "output_text").map((c: any) => c.text).join("");
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("Resposta da IA inválida");
  return JSON.parse(m[0]) as { title: string; excerpt: string; content: string; sources: number[]; instagram: string };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  // Admin (manual button) or scheduler
  let manual = false;
  const token = (req.headers.get("authorization") ?? "").replace(/^Bearer /, "");
  const { data: u } = await db.auth.getUser(token);
  if (u?.user) {
    const { data: isAdmin } = await db.rpc("has_role", { _user_id: u.user.id, _role: "admin" });
    if (!isAdmin) return json({ error: "Sem permissão" }, 403);
    manual = true;
  } else {
    const denied = authenticateCronRequest(req);
    if (denied) return denied;
  }

  const { data: state } = await db.from("blog_job_state").select("*").eq("id", JOB).single();
  if (state?.paused_reason && !manual) return json({ skipped: "paused", reason: state.paused_reason });
  const now = new Date();
  const { data: locked } = await db.from("blog_job_state")
    .update({ locked_until: new Date(now.getTime() + 10 * 60_000).toISOString() })
    .eq("id", JOB).or(`locked_until.is.null,locked_until.lt.${now.toISOString()}`).select("id");
  if (!locked?.length) return json({ skipped: "running" });

  const created: { title: string; excerpt: string; instagram: string; label: string; sources: { title: string; url: string }[] }[] = [];
  let pause: string | null = null;
  let lastError: string | null = null;
  try {
    for (const t of TOPICS) {
      try {
        const results = (await search(t.query)).filter((r) => r.url);
        if (!results.length) continue;
        const { data: used } = await db.from("blog_posts").select("source_key").in("source_key", results.map((r) => r.url));
        const fresh = results.filter((r) => !used?.some((x) => x.source_key === r.url));
        if (!fresh.length) continue;
        const post = await write(t.label, fresh);
        const sources = (post.sources ?? []).map((i) => fresh[i - 1]).filter(Boolean).map((r) => ({ title: r.title, url: r.url }));
        const key = sources[0]?.url ?? fresh[0].url;
        const slug = `${slugify(post.title)}-${now.toISOString().slice(0, 10)}`;
        const { error } = await db.from("blog_posts").insert({
          title: post.title.slice(0, 200), slug, excerpt: post.excerpt.slice(0, 300), content: post.content,
          topic: t.topic, kind: "auto", status: "draft", sources, source_key: key, instagram_caption: post.instagram,
        });
        if (error) { lastError = error.message; continue; }
        created.push({ title: post.title, excerpt: post.excerpt, instagram: post.instagram, label: t.label, sources });
      } catch (e: any) {
        const status = e?.status ?? e?.httpStatus;
        lastError = String(e?.message ?? e);
        if (status === 402 || status === 403) { pause = lastError; break; }
      }
    }

    const resend = Deno.env.get("RESEND_API_KEY");
    if (resend && created.length) {
      const html = `<div style="font-family:Arial,sans-serif;max-width:640px"><h2 style="color:#2563eb">Novos rascunhos do blog Nexum</h2><p>Revise e publique em <a href="https://www.nexumtec.com.br/gerenciar-blog">nexumtec.com.br/gerenciar-blog</a>.</p>` +
        created.map((p) => `<hr><p style="color:#0f766e;font-size:12px;text-transform:uppercase">${esc(p.label)}</p><h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p><p><b>Legenda para Instagram:</b></p><div style="white-space:pre-wrap;background:#f1f5f9;padding:12px">${esc(p.instagram)}</div><p style="font-size:12px">Fontes: ${p.sources.map((s) => `<a href="${esc(s.url)}">${esc(s.title)}</a>`).join(" · ")}</p>`).join("") + "</div>";
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${resend}` },
        body: JSON.stringify({ from: "Blog Nexum <onboarding@resend.dev>", to: ["flavio.de.souza10@gmail.com"], subject: `Blog Nexum: ${created.length} rascunho(s) para revisar`, html }),
      });
      if (!r.ok) console.error(`Resend failed [${r.status}]: ${await r.text()}`);
    }
  } finally {
    await db.from("blog_job_state").update({ locked_until: null, last_run_at: new Date().toISOString(), last_error: lastError, paused_reason: pause }).eq("id", JOB);
  }
  return json({ created: created.length, error: lastError, paused: pause });
});
