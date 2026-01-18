import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Loader, Package, Tag } from "lucide-react";
import { getChatResponse } from "@/lib/gemini";
import {
  searchProducts,
  getProductsByCategory,
  getAllProducts,
  detectUserIntent,
  getAllCategories,
  type Product,
} from "@/lib/product-search";

type Language = "en" | "ar" | "fr";

interface ChatbotProps {
  language: Language;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  products?: Product[];
  category?: string;
}

export default function Chatbot({ language }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you today? I can answer questions about products, sellers, and our platform.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      title: "darna Assistant",
      subtitle: "Ask me about products, sellers, and more",
      placeholder: "Type your question...",
      send: "Send",
      viewProduct: "View",
      price: "Price",
      rating: "Rating",
      reviews: "reviews",
      seller: "by",
      category: "Category",
      noResults: "Sorry, I didn't find any products matching that search.",
      allProducts: "Here are all our products:",
      categoryProducts: "Here are our products in the {category} category:",
      suggestions: [
        "Show me electronics",
        "Find fashion products",
        "Show all products",
        "What sports items do you have?",
        "Find home products",
        "Show food items",
      ],
    },
    ar: {
      title: "مساعد darna",
      subtitle: "اسألني عن المنتجات والبائعين والمزيد",
      placeholder: "اكتب سؤالك...",
      send: "إرسال",
      viewProduct: "عرض",
      price: "السعر",
      rating: "التقييم",
      reviews: "تقييمات",
      seller: "من قبل",
      category: "الفئة",
      noResults: "عذراً، لم أجد أي منتجات تطابق بحثك.",
      allProducts: "إليك جميع منتجاتنا:",
      categoryProducts: "إليك منتجاتنا في فئة {category}:",
      suggestions: [
        "اعرض لي الأجهزة الإلكترونية",
        "البحث عن منتجات الموضة",
        "اعرض جميع المنتجات",
        "ما منتجات الرياضة لديكم؟",
        "عرض منتجات المنزل",
        "اعرض منتجات الطعام",
      ],
    },
    fr: {
      title: "Assistant darna",
      subtitle: "Posez-moi des questions sur les produits, vendeurs, et plus",
      placeholder: "Tapez votre question...",
      send: "Envoyer",
      viewProduct: "Voir",
      price: "Prix",
      rating: "Évaluation",
      reviews: "avis",
      seller: "par",
      category: "Catégorie",
      noResults: "Désolé, je n'ai pas trouvé de produits correspondant à votre recherche.",
      allProducts: "Voici tous nos produits:",
      categoryProducts: "Voici nos produits dans la catégorie {category}:",
      suggestions: [
        "Montrez-moi les produits électroniques",
        "Trouver des articles de mode",
        "Afficher tous les produits",
        "Quels articles de sport avez-vous?",
        "Afficher les produits de la maison",
        "Afficher les articles alimentaires",
      ],
    },
  };

  const t = translations[language];
  const isRtl = language === "ar";

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const intent = detectUserIntent(messageText);
      let botMessage: Message;

      if (intent.type === "all") {
        const products = getAllProducts();
        botMessage = {
          id: (Date.now() + 1).toString(),
          text: t.allProducts,
          sender: "bot",
          timestamp: new Date(),
          products: products,
        };
      } else if (intent.type === "category" && intent.category) {
        const products = getProductsByCategory(intent.category);
        botMessage = {
          id: (Date.now() + 1).toString(),
          text: t.categoryProducts.replace(
            "{category}",
            intent.category.charAt(0).toUpperCase() + intent.category.slice(1)
          ),
          sender: "bot",
          timestamp: new Date(),
          products: products,
          category: intent.category,
        };
      } else if (intent.type === "search" && intent.query) {
        const products = searchProducts(intent.query);
        if (products.length === 0) {
          botMessage = {
            id: (Date.now() + 1).toString(),
            text: t.noResults,
            sender: "bot",
            timestamp: new Date(),
          };
        } else {
          botMessage = {
            id: (Date.now() + 1).toString(),
            text: `Found ${products.length} product${products.length !== 1 ? "s" : ""}:`,
            sender: "bot",
            timestamp: new Date(),
            products: products,
          };
        }
      } else {
        const botResponseText = await getChatResponse(messageText);
        botMessage = {
          id: (Date.now() + 1).toString(),
          text: botResponseText,
          sender: "bot",
          timestamp: new Date(),
        };
      }

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting chat response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  return (
    <div className={`w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-16 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t.title}
              </h1>
              <p className="text-sm text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Messages */}
        <div className="flex-1 space-y-4 mb-6 overflow-y-auto min-h-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-full lg:max-w-2xl ${
                  message.sender === "user" ? "max-w-xs" : "w-full"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none shadow-md"
                      : "bg-white text-foreground border border-border rounded-bl-none shadow-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>

                {/* Product Cards */}
                {message.products && message.products.length > 0 && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {message.products.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="group bg-white border border-border rounded-lg p-4 shadow-sm hover:shadow-md hover:border-primary transition-all duration-200"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-sm text-foreground group-hover:text-primary line-clamp-2 transition-colors">
                              {product.name}
                            </h3>
                            <Package className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          </div>

                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">
                                {t.price}
                              </span>
                              <span className="font-bold text-primary">
                                DZD {product.price.toFixed(2)}
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">
                                {t.seller}
                              </span>
                              <span className="font-semibold text-foreground">
                                {product.seller}
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">
                                {t.category}
                              </span>
                              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded">
                                <Tag className="w-3 h-3" />
                                {product.category}
                              </span>
                            </div>

                            {product.rating && (
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">
                                  {t.rating}
                                </span>
                                <span className="font-semibold">
                                  ⭐ {product.rating.toFixed(1)} (
                                  {product.reviews} {t.reviews})
                                </span>
                              </div>
                            )}
                          </div>

                          <button className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg text-xs font-semibold transition-colors">
                            {t.viewProduct}
                          </button>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-foreground border border-border px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-2 shadow-sm">
                <Loader className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm">Typing...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggestion Buttons - Always Visible */}
        {!loading && (
          <div className="mb-6 w-full bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-primary/10">
            <p className="text-sm font-semibold mb-4 px-2 text-foreground">
              {language === "ar" ? "🔍 اقترحات" : language === "fr" ? "🔍 Suggestions" : "🔍 Suggestions"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.suggestions && t.suggestions.map((suggestion, idx) => (
                <div key={`suggestion-wrapper-${idx}`}>
                  <button
                    id={`suggestion-btn-${idx}`}
                    type="button"
                    onClick={(e) => {
                      console.log("Button clicked:", suggestion);
                      handleSendMessage(suggestion);
                    }}
                    className="w-full p-3 rounded-lg bg-white border-2 border-primary/20 hover:border-primary hover:bg-white hover:shadow-md text-sm text-foreground text-center font-medium cursor-pointer transition-all"
                  >
                    {suggestion}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex gap-2 bg-white rounded-2xl border border-border p-3 shadow-lg">
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
            className="border-0 focus-visible:ring-0 text-foreground"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || loading}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
