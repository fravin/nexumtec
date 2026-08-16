import { useEffect } from "react";

const SITE_URL = "https://www.nexumtec.com.br";
const OG_IMAGE =
  "https://www.nexumtec.com.br/__l5e/assets-v1/187b0538-73df-4478-a896-1b2e18b5c0ae/og-nexum-social.jpg";

interface SeoProps {
  title: string;
  description: string;
  /** Route path starting with "/" (e.g. "/saude") */
  path: string;
  /** Optional extra JSON-LD nodes injected for this route */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const Seo = ({ title, description, path, jsonLd, noindex }: SeoProps) => {
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertLink("canonical", url);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:locale", "pt_BR");
    upsertMeta("property", "og:site_name", "Nexum Tecnologia");
    upsertMeta("property", "og:image", OG_IMAGE);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", OG_IMAGE);

    // robots
    let robotsEl: HTMLMetaElement | null = null;
    if (noindex) {
      robotsEl = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
      if (!robotsEl) {
        robotsEl = document.createElement("meta");
        robotsEl.setAttribute("name", "robots");
        document.head.appendChild(robotsEl);
      }
      robotsEl.setAttribute("content", "noindex");
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove();
    }

    // JSON-LD blocks owned by this route
    const parsed: Record<string, unknown>[] = jsonLdKey
      ? (() => {
          const value = JSON.parse(jsonLdKey);
          return Array.isArray(value) ? value : [value];
        })()
      : [];

    const scripts = parsed.map((block) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo", "route");
      script.textContent = JSON.stringify(block);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      scripts.forEach((s) => s.remove());
      if (noindex) {
        document.head.querySelector('meta[name="robots"]')?.remove();
      }
    };
  }, [title, description, path, noindex, jsonLdKey]);

  return null;
};

export default Seo;
