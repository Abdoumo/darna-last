import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";

type Language = "en" | "ar" | "fr";

interface SellerOrdersProps {
  language: Language;
}

export default function SellerOrders({ language }: SellerOrdersProps) {
  const translations = {
    en: {
      title: "My Orders",
      subtitle: "Track and manage customer orders",
      back: "Back to Dashboard",
      noOrders: "No orders yet",
      noOrdersDesc: "Once customers place orders, they will appear here",
    },
    ar: {
      title: "طلباتي",
      subtitle: "تتبع وإدارة طلبات العملاء",
      back: "العودة إلى لوحة التحكم",
      noOrders: "لا توجد طلبات حتى الآن",
      noOrdersDesc: "عندما يقوم العملاء بالطلب، ستظهر هنا",
    },
    fr: {
      title: "Mes commandes",
      subtitle: "Suivez et gérez les commandes des clients",
      back: "Retour au tableau de bord",
      noOrders: "Aucune commande pour le moment",
      noOrdersDesc: "Une fois que les clients passeront des commandes, elles apparaîtront ici",
    },
  };

  const t = translations[language];
  const isRtl = language === "ar";

  return (
    <div className={`w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8">
          <Link to="/dashboard/seller">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              {t.back}
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-lg border border-border p-12 text-center">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-bold text-foreground mb-2">{t.noOrders}</h3>
          <p className="text-muted-foreground">{t.noOrdersDesc}</p>
        </div>
      </div>
    </div>
  );
}
