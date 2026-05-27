import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, X, Send, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const quickQuestions = [
    "Quais serviços a Nexum oferece?",
    "Qual a experiência do Flávio?",
    "Como posso entrar em contato?",
    "Me fale sobre os projetos realizados",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-ai`;
      
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Falha ao conectar com o assistente");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";
      let textBuffer = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const updateAssistantMessage = (content: string) => {
        assistantMessage += content;
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = assistantMessage;
          return newMessages;
        });
      };

      const processLine = (line: string): boolean => {
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") return true;
        if (!line.startsWith("data: ")) return true;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") return false;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            updateAssistantMessage(content);
          }
          return true;
        } catch {
          return false; // JSON incompleto
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          const line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (!processLine(line)) {
            // Se falhou no parse, tenta re-bufferizar
            const jsonStr = line.slice(6)?.trim();
            if (jsonStr && jsonStr !== "[DONE]") {
              try {
                JSON.parse(jsonStr);
              } catch {
                textBuffer = line + "\n" + textBuffer;
                break;
              }
            }
          }
        }
      }

      // Flush final - processa dados restantes no buffer
      if (textBuffer.trim()) {
        for (const raw of textBuffer.split("\n")) {
          if (!raw.trim()) continue;
          processLine(raw);
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Erro",
        description: "Não foi possível conectar ao assistente. Tente novamente.",
        variant: "destructive",
      });
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 h-14 w-14 rounded-full bg-primary text-ink shadow-glow hover:shadow-glow hover:-translate-y-0.5 transition-all z-50 ${
          isOpen ? "scale-0" : "scale-100"
        }`}
        size="icon"
        aria-label="Abrir assistente Nexum IA"
      >
        <Bot className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[380px] h-[600px] shadow-2xl bg-ink border border-border flex flex-col z-50 animate-in slide-in-from-bottom-5 duration-300 rounded-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-ink-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center bg-primary/15 border border-primary/30 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <h3 className="font-semibold text-sm text-foreground">Assistente Nexum</h3>
                <span className="flex items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Online agora
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="bg-ink-2 border border-border p-4 rounded-sm">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    Olá! Sou o assistente da <strong className="text-primary">Nexum Tecnologia</strong>. Posso ajudar com informações sobre serviços, cases, orçamentos ou como podemos automatizar sua operação.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-muted-foreground">
                    Perguntas rápidas
                  </p>
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(q)}
                      className="w-full text-left text-xs text-foreground/80 border border-border hover:border-primary/40 hover:bg-primary/[0.04] p-3 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 max-w-[85%] text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary/15 border border-primary/25 text-primary"
                      : "bg-ink-2 border border-border text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="font-mono text-[0.65rem] tracking-[0.14em] uppercase">Pensando...</span>
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-border">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua pergunta..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 h-12 px-4 text-sm"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="bg-primary text-ink rounded-none h-12 w-14 hover:bg-accent"
                aria-label="Enviar"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
};

export default AIChatbot;

