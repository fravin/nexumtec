// Runs after `vite build`: writes dist/<route>/index.html with route-specific head tags
// and regenerates dist/sitemap.xml (static routes + published blog posts).
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";

const BASE = "https://www.nexumtec.com.br";
const routes = [
  { path: "/", title: "Nexum Tecnologia | Automação, IA e BI para clínicas e empresas", description: "Tecnologia humanizada para negócios e saúde: automação de processos, IA aplicada, BI e criação de sites para clínicas e empresas no Rio de Janeiro.", priority: "1.0" },
  { path: "/sobre", title: "Sobre a Nexum | Flávio de Souza, dados e tecnologia na saúde", description: "Conheça a história da Nexum Tecnologia e de Flávio de Souza: mais de 15 anos em saúde, dados e tecnologia aplicada para clínicas e empresas.", priority: "0.8" },
  { path: "/saude", title: "Tecnologia para Clínicas | Gestão de Glosas, IA e BI — Nexum", description: "Sistemas de faturamento, gestão de glosas, automação de atendimento com IA e BI para clínicas e hospitais. Menos retrabalho e mais receita recuperada.", priority: "0.9" },
  { path: "/negocios", title: "Automação de Processos e BI para Empresas | Nexum Tecnologia", description: "Automatize tarefas repetitivas, integre a NFSe Nacional e acompanhe indicadores em Power BI. Consultoria e desenvolvimento sob medida para sua operação.", priority: "0.9" },
  { path: "/criacao-de-sites", title: "Criação de Sites Profissionais no Rio de Janeiro | Nexum", description: "Sites institucionais, landing pages e sites para clínicas. Design responsivo e estrutura para SEO. Nexum Tecnologia no Rio de Janeiro, com atendimento remoto no Brasil.", priority: "0.9" },
  { path: "/contato", title: "Contato | Criação de Sites no Rio de Janeiro — Nexum", description: "Fale com a Nexum Tecnologia: criação de sites profissionais no Rio de Janeiro para empresas e clínicas. Solicite um orçamento pelo formulário ou WhatsApp.", priority: "0.8" },
  { path: "/briefing", title: "Briefing de Projeto | Nexum Tecnologia", description: "Conte sobre o seu negócio em poucos minutos e receba uma conversa estratégica da Nexum sobre criação de sites, sistemas e automações.", priority: "0.6" },
  { path: "/blog", title: "Blog | Tecnologia, IA e Saúde — Nexum Tecnologia", description: "Notícias e análises sobre tecnologia, inteligência artificial e saúde hospitalar privada, com artigos de Flávio de Souza sobre como as empresas podem evoluir.", priority: "0.8", changefreq: "daily" },
];

function loadEnv() {
  try {
    for (const line of readFileSync(".env", "utf8").split("\n")) {
      const m = line.match(/^([A-Z_]+)\s*=\s*"?([^"]*)"?$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {}
}

async function blogPosts() {
  loadEnv();
  const url = process.env.VITE_SUPABASE_URL, key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];
  try {
    const r = await fetch(`${url}/rest/v1/blog_posts?select=slug,title,excerpt,updated_at,published_at&status=eq.published&order=published_at.desc`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
    if (!r.ok) return [];
    return (await r.json()).map((p) => ({ path: `/blog/${p.slug}`, title: `${p.title} | Blog Nexum`, description: p.excerpt || p.title, lastmod: (p.updated_at || p.published_at || "").slice(0, 10), priority: "0.7", type: "article" }));
  } catch { return []; }
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function render(html, r) {
  const url = `${BASE}${r.path === "/" ? "/" : r.path}`;
  const t = esc(r.title), d = esc(r.description);
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${d}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${t}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${d}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${r.type || "website"}" />`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${t}" />`)
    .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${d}" />`)
    .replace(/<link rel="canonical"[^>]*>\s*/g, "")
    .replace("</head>", `  <link rel="canonical" href="${url}" />\n  </head>`);
}

const dist = resolve("dist");
const template = readFileSync(resolve(dist, "index.html"), "utf8");
const all = [...routes, ...(await blogPosts())];
for (const r of all) {
  const file = r.path === "/" ? resolve(dist, "index.html") : resolve(dist, `.${r.path}/index.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(template, r));
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${all.map((r) => `  <url>\n    <loc>${BASE}${r.path}</loc>\n${r.lastmod ? `    <lastmod>${r.lastmod}</lastmod>\n` : ""}    <changefreq>${r.changefreq || "weekly"}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`).join("\n")}\n</urlset>\n`;
writeFileSync(resolve(dist, "sitemap.xml"), sitemap);
console.log(`prerender-seo: ${all.length} pages`);
