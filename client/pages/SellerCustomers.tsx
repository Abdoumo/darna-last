import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users } from "lucide-react";

type Language = "en" | "ar" | "fr";

interface SellerCustomersProps {
  language: Language;
}

export default function SellerCustomers({ language }: SellerCustomersProps) {
  const translations = {
    en: {
      title: "Customers",
      subtitle: "Manage customer relationships",
      back: "Back to Dashboard",
      noCustomers: "No customers yet",
      noCustomersDesc: "Your customers will appear here once they make purchases",
    },
    ar: {
      title: "العملاء",
      subtitle: "إدارة علاقات العملاء",
      back: "العودة إلى لوحة التحكم",
      noCustomers: "لا يوجد عملاء حتى الآن",
      noCustomersDesc: "سيظهر عملاؤك هنا بمجرد أن يقوموا بعمليات الشراء",
    },
    fr: {
      title: "Clients",
      subtitle: "Gérer les relations clients",
      back: "Retour au tableau de bord",
      noCustomers: "Aucun client pour le moment",
      noCustomersDesc: "Vos clients apparaîtront ici une fois qu'ils auront effectué des achats",
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
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-bold text-foreground mb-2">{t.noCustomers}</h3>
          <p className="text-muted-foreground">{t.noCustomersDesc}</p>
        </div>
      </div>
    </div>
  );
}
