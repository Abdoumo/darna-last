import { Link } from "react-router-dom";

type Language = "en" | "ar" | "fr";

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const translations = {
    en: {
      about: "About",
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      copyright: "© 2024 darna. All rights reserved.",
      company: "Company",
      support: "Support",
      legal: "Legal",
      helpCenter: "Help Center",
      chatSupport: "Chat Support",
    },
    ar: {
      about: "حول",
      contact: "اتصل بنا",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      copyright: "© 2024 darna. جميع الحقوق محفوظة.",
      company: "الشركة",
      support: "الدعم",
      legal: "القانوني",
      helpCenter: "مركز المساعدة",
      chatSupport: "دعم الدردشة",
    },
    fr: {
      about: "À propos",
      contact: "Contact",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      copyright: "© 2024 darna. Tous droits réservés.",
      company: "Entreprise",
      support: "Support",
      legal: "Légal",
      helpCenter: "Centre d'aide",
      chatSupport: "Support par chat",
    },
  };

  const t = translations[language];
  const isRtl = language === "ar";

  return (
    <footer
      className={`bg-slate-900 text-white mt-16 ${isRtl ? "rtl" : "ltr"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{t.company}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{t.support}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  {t.helpCenter}
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  {t.chatSupport}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{t.legal}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  {t.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <p className="text-gray-300 text-center">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
