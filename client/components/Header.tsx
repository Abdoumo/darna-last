import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, Globe, LogOut, User, ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";

type Language = "en" | "ar" | "fr";

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Header({ language, onLanguageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  const translations = {
    en: {
      home: "Home",
      shop: "Shop",
      sellers: "For Sellers",
      cart: "Cart",
      chatbot: "Assistant",
      signin: "Sign In",
      signup: "Sign Up",
      seller: "Seller",
    },
    ar: {
      home: "الرئيسية",
      shop: "المتجر",
      sellers: "للبائعين",
      cart: "السلة",
      chatbot: "المساعد",
      signin: "تسجيل الدخول",
      signup: "إنشاء حساب",
      seller: "بائع",
    },
    fr: {
      home: "Accueil",
      shop: "Boutique",
      sellers: "Pour les vendeurs",
      cart: "Panier",
      chatbot: "Assistant",
      signin: "Connexion",
      signup: "Inscription",
      seller: "Vendeur",
    },
  };

  const t = translations[language];
  const isRtl = language === "ar";

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-border ${
        isRtl ? "rtl" : "ltr"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary hidden sm:inline">
              darna
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button variant="ghost" className="text-foreground">
                {t.home}
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="ghost" className="text-foreground">
                {t.shop}
              </Button>
            </Link>
            <Link to="/sellers">
              <Button variant="ghost" className="text-foreground">
                {t.sellers}
              </Button>
            </Link>
            <Link to="/chatbot">
              <Button variant="ghost" className="text-foreground gap-2">
                <MessageCircle className="w-4 h-4" />
                {t.chatbot}
              </Button>
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="gap-2">
                <ShoppingCart className="w-5 h-5" />
              </Button>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </Link>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-semibold">
                    {language.toUpperCase()}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRtl ? "start" : "end"}>
                <DropdownMenuItem onClick={() => onLanguageChange("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLanguageChange("ar")}>
                  العربية
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onLanguageChange("fr")}>
                  Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Links */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs font-semibold">
                      {user.email.split("@")[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRtl ? "start" : "end"}>
                  <DropdownMenuItem asChild>
                    <Link to={`/dashboard/${user.role}`} className="cursor-pointer">
                      {language === "ar" ? "لوحة التحكم" : language === "fr" ? "Tableau de bord" : "Dashboard"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {language === "ar" ? "تسجيل الخروج" : language === "fr" ? "Déconnexion" : "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/signin" className="hidden sm:block">
                  <Button variant="ghost" size="sm">
                    {t.signin}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {t.signup}
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-border py-4 space-y-2">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start">
                {t.home}
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="ghost" className="w-full justify-start">
                {t.shop}
              </Button>
            </Link>
            <Link to="/sellers">
              <Button variant="ghost" className="w-full justify-start">
                {t.sellers}
              </Button>
            </Link>
            <Link to="/chatbot">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <MessageCircle className="w-4 h-4" />
                {t.chatbot}
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <ShoppingCart className="w-4 h-4" />
                {t.cart}
                {cartItemCount > 0 && (
                  <span className="ml-auto bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            {!user && (
              <Link to="/signin" className="block sm:hidden">
                <Button variant="ghost" className="w-full justify-start">
                  {t.signin}
                </Button>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
