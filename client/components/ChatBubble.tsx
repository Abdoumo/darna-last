import { useState } from "react";
import { MessageCircle, X, Send, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getChatResponse } from "@/lib/gemini";

type Language = "en" | "ar" | "fr";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatBubbleProps {
  language: Language;
}

export default function ChatBubble({ language }: ChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: language === "ar" 
        ? "مرحبا! كيف يمكنني مساعدتك؟ يمكنني الإجابة على أسئلة حول المنتجات والبائعين والمنصة."
        : language === "fr"
        ? "Bonjour! Comment puis-je vous aider? Je peux répondre à des questions sur les produits, les vendeurs et la plateforme."
        : "Hello! How can I help you? I can answer questions about products, sellers, and our platform.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      placeholder: "Ask a question...",
      send: "Send",
    },
    ar: {
      placeholder: "اسأل سؤالاً...",
      send: "إرسال",
    },
    fr: {
      placeholder: "Posez une question...",
      send: "Envoyer",
    },
  };

  const t = translations[language];
  const isRtl = language === "ar";

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const botResponseText = await getChatResponse(input);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting chat response:", error);
      const errorText = {
        en: "Sorry, I encountered an error. Please try again.",
        ar: "عذراً، واجهت خطأ. يرجى المحاولة مرة أخرى.",
        fr: "Désolé, j'ai rencontré une erreur. Veuillez réessayer.",
      };

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText[language],
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-2xl hover:shadow-2xl transition-all hover:scale-110 flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-40 w-96 h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span className="font-semibold">
            {language === "ar"
              ? "دعم darna"
              : language === "fr"
              ? "Support darna"
              : "darna Support"}
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-white/20 p-1 rounded-lg transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
                message.sender === "user"
                  ? "bg-primary text-white rounded-br-none shadow-md"
                  : "bg-blue-50 text-foreground rounded-bl-none border border-blue-100"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-blue-50 text-foreground px-4 py-2 rounded-xl rounded-bl-none flex items-center gap-2 border border-blue-100">
              <Loader className="w-4 h-4 animate-spin text-primary" />
            </div>
          </div>
        )}

        {/* Suggestion Buttons Inside Chat */}
        {messages.length <= 2 && !loading && (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-muted-foreground font-semibold px-1">
              {language === "ar" ? "اقترحات" : language === "fr" ? "Suggestions" : "Suggestions"}
            </p>
            {[
              language === "ar" ? "ما أفضل المنتجات؟" : language === "fr" ? "Quels sont les meilleurs produits?" : "What are the best products?",
              language === "ar" ? "كيف أصبح بائعاً؟" : language === "fr" ? "Comment devenir vendeur?" : "How to become a seller?",
              language === "ar" ? "ما طرق الدفع؟" : language === "fr" ? "Quels sont les modes de paiement?" : "What payment methods?",
              language === "ar" ? "كيف أتتبع طلبي؟" : language === "fr" ? "Comment suivre ma commande?" : "How to track order?",
            ].map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(suggestion)}
                className="w-full p-2 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-xs text-foreground text-left transition-all hover:border-primary/50"
              >
                <span className="text-primary font-semibold text-xs mr-1">→</span>
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-blue-200 p-3 flex gap-2 bg-gradient-to-r from-blue-50 to-indigo-50">
        <Input
          type="text"
          placeholder={t.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          disabled={loading}
          className="border-0 focus-visible:ring-0 text-sm rounded-lg bg-white"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!input.trim() || loading}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
