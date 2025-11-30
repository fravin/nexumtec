import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import SuccessCases from "@/components/SuccessCases";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Timeline />
      <Services />
      <Skills />
      <SuccessCases />
      <Projects />
      <Testimonials />
      <CallToAction />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default Index;
