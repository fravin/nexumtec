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
      className="fixed bottom-3 right-3 md:bottom-6 md:right-6 rounded-full h-11 w-11 md:h-14 md:w-14 p-0 bg-accent text-foreground shadow-lg transition-smooth hover:scale-110 hover:bg-accent/90 z-50 normal-case tracking-normal"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="h-4 w-4 md:h-6 md:w-6" />
    </Button>
  );
};

export default WhatsAppButton;
