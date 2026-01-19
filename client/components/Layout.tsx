import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type Language = "en" | "ar" | "fr";

interface LayoutProps {
  children: ReactNode;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Layout({
  children,
  language,
  onLanguageChange,
}: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header language={language} onLanguageChange={onLanguageChange} />
      <main className="flex-1">{children}</main>
      <Footer language={language} />
    </div>
  );
}
