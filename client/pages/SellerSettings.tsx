import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

type Language = "en" | "ar" | "fr";

interface SellerSettingsProps {
  language: Language;
}

export default function SellerSettings({ language }: SellerSettingsProps) {
  const { user } = useAuth();

  const translations = {
    en: {
      title: "Settings",
      subtitle: "Manage your account settings",
      back: "Back to Dashboard",
      accountInfo: "Account Information",
      email: "Email",
      storeInfo: "Store Information",
      storeName: "Store Name",
      description: "Store Description",
      notifications: "Notifications",
      emailNotifications: "Email Notifications",
    },
    ar: {
      title: "الإعدادات",
      subtitle: "إدارة إعدادات حسابك",
      back: "العودة إلى لوحة التحكم",
      accountInfo: "معلومات الحساب",
      email: "البريد الإلكتروني",
      storeInfo: "معلومات المتجر",
      storeName: "اسم المتجر",
      description: "وصف المتجر",
      notifications: "الإشعارات",
      emailNotifications: "إشعارات البريد الإلكتروني",
    },
    fr: {
      title: "Paramètres",
      subtitle: "Gérez vos paramètres de compte",
      back: "Retour au tableau de bord",
      accountInfo: "Informations du compte",
      email: "E-mail",
      storeInfo: "Informations de la boutique",
      storeName: "Nom de la boutique",
      description: "Description de la boutique",
      notifications: "Notifications",
      emailNotifications: "Notifications par e-mail",
    },
  };

  const t = translations[language];
  const isRtl = language === "ar";

  return (
    <div className={`w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-2xl mx-auto">
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

        {/* Settings Cards */}
        <div className="space-y-6">
          {/* Account Information */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              {t.accountInfo}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground">{t.email}</label>
                <p className="text-muted-foreground">{user?.email || "Not set"}</p>
              </div>
            </div>
          </div>

          {/* Store Information */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">{t.storeInfo}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground">{t.storeName}</label>
                <p className="text-muted-foreground">Your store name will appear here</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground">{t.description}</label>
                <p className="text-muted-foreground">Your store description will appear here</p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">{t.notifications}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">{t.emailNotifications}</label>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
