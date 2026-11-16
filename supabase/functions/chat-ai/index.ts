import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

import { z } from "npm:zod@3.23.8";
import { clientIp, corsFor, guardRequest, rateLimited } from "../_shared/guard.ts";

// Só papéis de conversa: o cliente não pode injetar mensagens "system".
const bodySchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().max(2000),
  })).min(1).max(60),
});

const MAX_HISTORY = 12; // mensagens enviadas ao modelo
const MAX_BODY_CHARS = 40_000;

serve(async (req) => {
  const blocked = guardRequest(req);
  if (blocked) return blocked;
  const corsHeaders = corsFor(req);
  const json = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  const ip = clientIp(req);
  if (rateLimited(`chat:m:${ip}`, 8, 60_000) || rateLimited(`chat:h:${ip}`, 40, 3_600_000)) {
    return json({ error: "Muitas mensagens em pouco tempo. Tente novamente em instantes." }, 429);
  }

  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_CHARS) return json({ error: "Mensagem muito longa" }, 413);
    let payload: unknown;
    try { payload = JSON.parse(raw); } catch { return json({ error: "Dados inválidos" }, 400); }
    const parsed = bodySchema.safeParse(payload);
    if (!parsed.success) return json({ error: "Dados inválidos" }, 400);
    const messages = parsed.data.messages.filter((m) => m.content.trim()).slice(-MAX_HISTORY);
    if (!messages.length || messages[messages.length - 1].role !== "user") {
      return json({ error: "Dados inválidos" }, 400);
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Você é o assistente virtual da Nexum Tecnologia, empresa de Flávio Admilson de Souza, um Analista de Sistemas e Cientista de Dados com mais de 15 anos de experiência no setor da saúde.

SOBRE FLÁVIO:
- Formação: Graduado em Sistemas de Informação (2024), Pós-graduando em Ciência de Dados
- Experiência: +13 anos no setor de saúde, começando na recepção até Analista de Tecnologia
- Especialidade: Transformar dados em decisões inteligentes

SERVIÇOS OFERECIDOS:
1. Consultoria em Otimização de Processos
   - Diagnóstico e mapeamento de processos
   - Desenvolvimento de estratégias de alinhamento
   - Implementação de ferramentas e metodologias

2. Análise de Dados para Tomada de Decisão
   - Criação de dashboards personalizados (Excel, Power BI)
   - Relatórios estratégicos
   - Estruturação de coleta de dados

PROJETOS REALIZADOS:
- Sistema Web de Gestão de Estoque Hospitalar
- Dashboard de Vendas e Análise Preditiva
- Automação de Relatórios com IA

CONTATO:
- Email: contato@nexumtec.com.br
- LinkedIn: linkedin.com/in/fláviodesouza10
- GitHub: github.com/flavioadmilson

INSTRUÇÕES:
- Responda sempre em português brasileiro correto e bem formatado
- Seja amigável, profissional e conciso (máximo 150 palavras por resposta)
- Use frases completas e bem estruturadas
- Se não souber algo específico, sugira que o usuário entre em contato diretamente pelo email contato@nexumtec.com.br
- Não invente informações que não estão neste contexto
- Foque em ajudar o visitante a conhecer os serviços e experiência do Flávio`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns instantes." }), 
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Por favor, contate o administrador." }), 
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Erro ao processar solicitação" }), 
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("chat-ai error:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao processar solicitação" }), 
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
