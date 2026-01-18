import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Language = "en" | "ar" | "fr";

interface NotFoundProps {
  language: Language;
}

export default function NotFound({ language }: NotFoundProps) {
  const translations = {
    en: {
      notfound: "Page Not Found",
      code: "404",
      description: "The page you're looking for doesn't exist or hasn't been implemented yet.",
      suggestion: "Continue prompting to add more pages and features to the application.",
      goHome: "Go to Homepage",
    },
    ar: {
      notfound: "الصفحة غير موجودة",
      code: "404",
      description: "الصفحة التي تبحث عنها غير موجودة أو لم يتم تطبيقها بعد.",
      suggestion: "استمر في الطلب لإضافة المزيد من الصفحات والميزات إلى التطبيق.",
      goHome: "الذهاب إلى الصفحة الرئيسية",
    },
    fr: {
      notfound: "Page Non Trouvée",
      code: "404",
      description: "La page que vous recherchez n'existe pas ou n'a pas encore été implémentée.",
      suggestion: "Continuez à demander pour ajouter plus de pages et de fonctionnalités à l'application.",
      goHome: "Aller à la page d'accueil",
    },
  };

  const t = translations[language];
  const isRtl = language === "ar";

  return (
    <div className={`w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
      <div className="text-center space-y-6 max-w-md">
        <div className="text-7xl font-bold text-primary">{t.code}</div>
        <h1 className="text-4xl font-bold text-foreground">{t.notfound}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t.description}
        </p>
        <p className="text-sm text-muted-foreground italic">
          {t.suggestion}
        </p>
        <Link to="/">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
          >
            {t.goHome}
          </Button>
        </Link>
      </div>
    </div>
  );
}
