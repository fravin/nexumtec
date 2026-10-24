import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().default(""),
  company: z.string().trim().max(120).optional().default(""),
  projectType: z.string().trim().max(60).optional().default(""),
  subject: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(1).max(2000),
  source: z.string().trim().max(60).optional().default("site"),
});

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) return json({ error: "Dados inválidos" }, 400);
    const d = parsed.data;

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: row, error } = await supabase
      .from("contact_submissions")
      .insert({
        name: d.name, email: d.email, phone: d.phone || null, company: d.company || null,
        project_type: d.projectType || null, subject: d.subject || null, message: d.message, source: d.source,
      })
      .select("id")
      .single();
    if (error) {
      console.error("Insert failed:", error.message);
      return json({ error: "Não foi possível salvar a mensagem" }, 500);
    }

    let emailed = false;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      const html = `<div style="font-family:Arial,sans-serif;max-width:600px">
        <h2 style="color:#2563eb">Novo contato pelo site Nexum</h2>
        <p><b>Nome:</b> ${esc(d.name)}<br><b>E-mail:</b> ${esc(d.email)}<br>
        ${d.phone ? `<b>Telefone:</b> ${esc(d.phone)}<br>` : ""}
        ${d.company ? `<b>Empresa:</b> ${esc(d.company)}<br>` : ""}
        ${d.projectType ? `<b>Tipo de projeto:</b> ${esc(d.projectType)}<br>` : ""}
        ${d.subject ? `<b>Assunto:</b> ${esc(d.subject)}<br>` : ""}
        <b>Origem:</b> ${esc(d.source)}</p>
        <p style="white-space:pre-wrap">${esc(d.message)}</p></div>`;
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendApiKey}` },
        body: JSON.stringify({
          from: "Site Nexum <onboarding@resend.dev>",
          to: ["flavio.de.souza10@gmail.com"],
          reply_to: d.email,
          subject: `Novo contato: ${d.subject || d.projectType || d.name}`.slice(0, 150),
          html,
        }),
      });
      emailed = res.ok;
      if (!res.ok) console.error(`Resend failed [${res.status}]: ${await res.text()}`);
    }

    return json({ success: true, id: row.id, emailed });
  } catch (e) {
    console.error("send-contact-email error:", e);
    return json({ error: "Erro inesperado" }, 500);
  }
});
