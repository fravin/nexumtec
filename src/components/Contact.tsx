import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AnimatedSection } from "@/components/AnimatedSection";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Obrigado pelo contato. Retornarei em breve!",
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente ou entre em contato diretamente pelo email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      label: "E-mail",
      value: "flavio.de.souza10@gmail.com",
      href: "mailto:flavio.de.souza10@gmail.com"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      label: "Telefone",
      value: "+55 (21) 99999-9999",
      href: "tel:+5521999999999"
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="h-6 w-6" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/fl%C3%A1viodesouza10/",
      color: "hover:text-blue-600"
    },
    {
      icon: <Github className="h-6 w-6" />,
      label: "GitHub",
      href: "https://github.com/flavioadmilson",
      color: "hover:text-gray-800"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      label: "E-mail",
      href: "mailto:flavio.de.souza10@gmail.com",
      color: "hover:text-red-600"
    }
  ];

  return (
    <section id="contato" className="py-12 bg-gradient-to-br from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0}>
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Vamos <span className="gradient-text">Conversar</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Pronto para transformar seus dados em resultados? Entre em contato e vamos discutir como posso ajudar sua empresa.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Contact Information */}
          <div className="flex flex-col gap-8">
            <AnimatedSection animation="slideInLeft" delay={100} className="flex-1">
              <Card className="bg-gradient-card shadow-lg h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="bg-gradient-hero text-white p-3 rounded-lg">
                    <Send className="h-6 w-6" />
                  </div>
                  <span>Entre em Contato</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Estou sempre aberto a novas oportunidades e desafios. Se você tem um projeto interessante 
                  ou quer saber mais sobre meus serviços, não hesite em entrar em contato.
                </p>

                {/* Contact Details */}
                <div className="space-y-4">
                  {contactInfo.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.href}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-smooth group"
                    >
                      <div className="text-primary group-hover:scale-110 transition-transform">
                        {contact.icon}
                      </div>
                      <div>
                        <div className="font-medium">{contact.label}</div>
                        <div className="text-muted-foreground group-hover:text-primary transition-colors">
                          {contact.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-border">
                  <h4 className="font-semibold mb-4">Conecte-se Comigo</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-smooth ${social.color} group`}
                        title={social.label}
                      >
                        <div className="group-hover:scale-110 transition-transform">
                          {social.icon}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            </AnimatedSection>

            {/* Availability */}
            <AnimatedSection animation="slideInLeft" delay={200}>
              <Card className="bg-gradient-hero text-white shadow-glow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Disponibilidade</h3>
                <p className="text-white/90 mb-4">
                  Atualmente disponível para novos projetos e consultorias. 
                  Respondo em até 24 horas durante dias úteis.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Disponível para novos projetos</span>
                </div>
              </CardContent>
            </Card>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <AnimatedSection animation="slideInRight" delay={100} className="h-full">
            <Card className="shadow-lg hover:shadow-glow transition-smooth h-full flex flex-col">
              <CardHeader>
                <CardTitle>Envie uma Mensagem</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                      placeholder="Nome da sua empresa"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Assunto *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                      placeholder="Como posso ajudá-lo?"
                    />
                  </div>

                  <div className="flex-1">
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth resize-none"
                      placeholder="Conte-me mais sobre seu projeto ou necessidade..."
                    ></textarea>
                  </div>

                  <div className="mt-auto">
                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>

                    <p className="text-sm text-muted-foreground text-center mt-4">
                      * Campos obrigatórios. Seus dados são protegidos e não serão compartilhados.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
        </div>
    </section>
  );
};

export default Contact;