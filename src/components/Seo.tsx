import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.nexumtec.com.br";
const OG_IMAGE =
  "https://www.nexumtec.com.br/__l5e/assets-v1/187b0538-73df-4478-a896-1b2e18b5c0ae/og-nexum-social.jpg";

interface SeoProps {
  title: string;
  description: string;
  /** Route path starting with "/" (e.g. "/saude") */
  path: string;
  /** Optional extra JSON-LD nodes rendered inside the same Helmet */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

const Seo = ({ title, description, path, jsonLd, noindex }: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Nexum Tecnologia" />
      <meta property="og:image" content={OG_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
