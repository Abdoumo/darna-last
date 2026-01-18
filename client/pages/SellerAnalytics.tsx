import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3 } from "lucide-react";

type Language = "en" | "ar" | "fr";

interface SellerAnalyticsProps {
  language: Language;
}

export default function SellerAnalytics({ language }: SellerAnalyticsProps) {
  const translations = {
    en: {
      title: "Analytics",
      subtitle: "Track sales and analytics",
      back: "Back to Dashboard",
      noData: "No analytics data",
      noDataDesc: "Analytics will appear here as you make sales",
    },
    ar: {
      title: "التحليلات",
      subtitle: "تتبع المبيعات والتحليلات",
      back: "العودة إلى لوحة التحكم",
      noData: "لا توجد بيانات تحليلات",
      noDataDesc: "ستظهر التحليلات هنا مع حدوث المبيعات",
    },
    fr: {
      title: "Analyses",
      subtitle: "Suivez les ventes et les analyses",
      back: "Retour au tableau de bord",
      noData: "Aucune donnée analytique",
      noDataDesc: "Les analyses apparaîtront ici au fur et à mesure de vos ventes",
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
          <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-bold text-foreground mb-2">{t.noData}</h3>
          <p className="text-muted-foreground">{t.noDataDesc}</p>
        </div>
      </div>
    </div>
  );
}
