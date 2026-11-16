// Proteções compartilhadas das funções públicas (chat-ai, send-contact-email):
// lista de origens permitidas (CORS) e limite de requisições por IP.

const DEFAULT_ORIGINS = ["https://www.nexumtec.com.br", "https://nexumtec.com.br"];

// Pré-visualizações do Lovable e desenvolvimento local.
const DEV_ORIGIN_PATTERNS = [
  /^https:\/\/[a-z0-9-]+\.lovable\.app$/,
  /^https:\/\/[a-z0-9-]+\.lovableproject\.com$/,
  /^https:\/\/[a-z0-9-]+\.lovable\.dev$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
];

// ALLOWED_ORIGINS (opcional, separado por vírgula) substitui a lista inteira,
// inclusive os padrões de pré-visualização.
function isAllowedOrigin(origin: string | null): origin is string {
  if (!origin) return false;
  const custom = (Deno.env.get("ALLOWED_ORIGINS") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (custom.length) return custom.includes(origin);
  return DEFAULT_ORIGINS.includes(origin) || DEV_ORIGIN_PATTERNS.some((p) => p.test(origin));
}

export function corsFor(req: Request): Record<string, string> {
  const origin = req.headers.get("origin");
  return {
    "Access-Control-Allow-Origin": isAllowedOrigin(origin) ? origin : DEFAULT_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

export function clientIp(req: Request): string {
  return (
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "desconhecido"
  );
}

// Limite em memória: vale por instância da função, então é uma barreira de
// "melhor esforço" contra rajadas, não uma cota exata.
const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return false;
}

/**
 * Trata pré-flight, método e origem. Devolve uma Response quando a requisição
 * deve parar aqui, ou null quando pode seguir.
 */
export function guardRequest(req: Request): Response | null {
  const cors = corsFor(req);
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  const deny = (error: string, status: number) =>
    new Response(JSON.stringify({ error }), { status, headers: { ...cors, "Content-Type": "application/json" } });
  if (req.method !== "POST") return deny("Método não permitido", 405);
  if (!isAllowedOrigin(req.headers.get("origin"))) return deny("Origem não permitida", 403);
  return null;
}
