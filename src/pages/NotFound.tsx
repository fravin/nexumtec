import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <Helmet>
        <title>Página não encontrada | Nexum Tecnologia</title>
        <meta name="description" content="A página que você procura não existe ou foi movida. Volte à página inicial da Nexum Tecnologia." />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href="https://www.nexumtec.com.br/" />
        <meta property="og:title" content="Página não encontrada | Nexum Tecnologia" />
        <meta property="og:description" content="A página que você procura não existe ou foi movida." />
      </Helmet>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Página não encontrada</p>
        <a href="/" className="text-primary hover:underline">
          Voltar para a página inicial
        </a>
      </div>
    </main>
  );
};

export default NotFound;
