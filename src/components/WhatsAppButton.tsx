import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const whatsappNumber = "5521981466912";
  const defaultMessage = "Olá! Vi seu portfólio e gostaria de conversar sobre uma oportunidade.";
  
  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      variant="hero"
      className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 shadow-glow hover:scale-110 transition-smooth z-50 animate-pulse hover:animate-none"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
};

export default WhatsAppButton;
