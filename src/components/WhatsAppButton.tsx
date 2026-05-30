import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const whatsappNumber = "5521981466912";
  const defaultMessage = "Olá! Vim do site da Nexum e gostaria de agendar um diagnóstico gratuito.";

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 rounded-full w-12 h-12 md:w-14 md:h-14 p-0 bg-accent hover:bg-accent/90 text-foreground shadow-lg hover:scale-110 transition-smooth z-50 normal-case tracking-normal"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
    </Button>
  );
};

export default WhatsAppButton;
