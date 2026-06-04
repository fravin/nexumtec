import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Verticals from "@/components/Verticals";
import Marquee from "@/components/Marquee";
import ImpactMetrics from "@/components/ImpactMetrics";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import AboutSummary from "@/components/AboutSummary";
import CallToAction from "@/components/CallToAction";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import AIChatbot from "@/components/AIChatbot";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";



const Index = () => {
  const location = useLocation();

  // Handle hash navigation when arriving from another route (e.g. /sobre -> /#servicos)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // Wait a tick for sections to mount
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <link rel="canonical" href="https://www.nexumtec.com.br/" />
      </Helmet>
      <Header />
      <main>
        <Hero />
        <Verticals />
        <ImpactMetrics />
        <Marquee />
        <Services />
        <Projects />
        <AboutSummary />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <AIChatbot />
    </div>
  );
};

export default Index;
