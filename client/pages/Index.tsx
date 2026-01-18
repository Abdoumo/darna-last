import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Store,
  MessageSquare,
  Zap,
  ArrowRight,
  Globe,
} from "lucide-react";

type Language = "en" | "ar" | "fr";

interface IndexProps {
  language: Language;
}

export default function Index({ language }: IndexProps) {
  const translations = {
    en: {
      hero: "Welcome to darna",
      heroDesc:
        "The ultimate multivendor marketplace connecting buyers with trusted sellers worldwide",
      shopNow: "Shop Now",
      becomeSeller: "Become a Seller",
      whyChoose: "Why Choose darna?",
      features: [
        {
          icon: Store,
          title: "Multi-Vendor Platform",
          desc: "Shop from thousands of independent sellers in one place",
        },
        {
          icon: ShoppingBag,
          title: "Curated Products",
          desc: "Discover quality products from trusted vendors",
        },
        {
          icon: Zap,
          title: "Fast Checkout",
          desc: "Multiple payment options including online & cash on delivery",
        },
        {
          icon: MessageSquare,
          title: "Smart Support",
          desc: "Chat with AI assistant about products, sellers & more",
        },
        {
          icon: Globe,
          title: "Multi-Language",
          desc: "Shop in English, Arabic, or French",
        },
        {
          icon: ShoppingBag,
          title: "Secure Payments",
          desc: "Your transactions are protected with industry standards",
        },
      ],
      forSellers: "For Sellers",
      sellerTitle: "Grow Your Business",
      sellerDesc:
        "Reach millions of customers by joining VendorHub. Create your shop, manage products, and scale your business with ease.",
      startSelling: "Start Selling",
      categories: "Shop by Category",
      trending: "Trending Now",
      viewAll: "View All",
      premiumExperience: "Premium Shopping Experience",
    },
    ar: {
      hero: "مرحبا بك في darna",
      heroDesc:
        "سوق متعدد البائعين يربط المشترين مع البائعين الموثوقين في جميع أنحاء العالم",
      shopNow: "تسوق الآن",
      becomeSeller: "أصبح بائعاً",
      whyChoose: "لماذا تختار darna؟",
      features: [
        {
          icon: Store,
          title: "منصة متعددة البائعين",
          desc: "التسوق من آلاف البائعين المستقلين في مكان واحد",
        },
        {
          icon: ShoppingBag,
          title: "منتجات مختارة",
          desc: "اكتشف المنتجات عالية الجودة من البائعين الموثوقين",
        },
        {
          icon: Zap,
          title: "دفع سريع",
          desc: "خيارات دفع متعددة تشمل الدفع أون لاين والدفع عند الاستلام",
        },
        {
          icon: MessageSquare,
          title: "الدعم الذكي",
          desc: "الدردشة مع مساعد ذكي حول المنتجات والبائعين والمزيد",
        },
        {
          icon: Globe,
          title: "دعم متعدد اللغات",
          desc: "التسوق باللغة الإنجليزية أو العربية أو الفرنسية",
        },
        {
          icon: ShoppingBag,
          title: "دفع آمن",
          desc: "معاملاتك محمية بمعايير الصناعة",
        },
      ],
      forSellers: "للبائعين",
      sellerTitle: "نمّ عملك",
      sellerDesc:
        "اصل إلى ملايين العملاء من خلال الانضمام إلى VendorHub. أنشئ متجرك وأدر منتجاتك ووسّع عملك بسهولة.",
      startSelling: "ابدأ البيع",
      categories: "تصفح حسب الفئة",
      trending: "الاتجاهات الحالية",
      viewAll: "عرض الكل",
      premiumExperience: "تجربة تسوق ممتازة",
    },
    fr: {
      hero: "Bienvenue sur darna",
      heroDesc:
        "La place de marché multifournisseur ultime reliant les acheteurs aux vendeurs de confiance du monde entier",
      shopNow: "Acheter maintenant",
      becomeSeller: "Devenir vendeur",
      whyChoose: "Pourquoi choisir darna?",
      features: [
        {
          icon: Store,
          title: "Plateforme multi-fournisseurs",
          desc: "Achetez auprès de milliers de vendeurs indépendants en un seul endroit",
        },
        {
          icon: ShoppingBag,
          title: "Produits sélectionnés",
          desc: "Découvrez des produits de qualité auprès de vendeurs de confiance",
        },
        {
          icon: Zap,
          title: "Paiement rapide",
          desc: "Plusieurs options de paiement incluant le paiement en ligne et à la livraison",
        },
        {
          icon: MessageSquare,
          title: "Support intelligent",
          desc: "Chattez avec un assistant intelligent sur les produits, vendeurs et plus",
        },
        {
          icon: Globe,
          title: "Multilingue",
          desc: "Achetez en anglais, arabe ou français",
        },
        {
          icon: ShoppingBag,
          title: "Paiements sécurisés",
          desc: "Vos transactions sont protégées selon les normes de l'industrie",
        },
      ],
      forSellers: "Pour les vendeurs",
      sellerTitle: "Développez votre entreprise",
      sellerDesc:
        "Rejoignez des millions de clients en vous inscrivant sur VendorHub. Créez votre boutique, gérez vos produits et développez votre activité facilement.",
      startSelling: "Commencer à vendre",
      categories: "Parcourir par catégorie",
      trending: "Tendances",
      viewAll: "Voir tout",
      premiumExperience: "Expérience shopping premium",
    },
  };

  const t = translations[language];
  const isRtl = language === "ar";

  return (
    <div className={`w-full ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-primary/80 to-secondary text-white py-20 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t.hero}
              </h1>
              <p className="text-lg md:text-xl text-white/90">{t.heroDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/shop">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto font-semibold"
                  >
                    {t.shopNow}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/sellers">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 w-full sm:w-auto font-semibold"
                  >
                    {t.becomeSeller}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative w-full h-80 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <ShoppingBag className="w-32 h-32 mx-auto opacity-20 mb-4" />
                  <p className="text-white/60">{t.premiumExperience}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.whyChoose}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Sellers Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative w-full h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                <Store className="w-32 h-32 text-primary/30" />
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t.forSellers}
              </h2>
              <h3 className="text-2xl font-bold text-primary">
                {t.sellerTitle}
              </h3>
              <p className="text-lg text-muted-foreground">{t.sellerDesc}</p>
              <Link to="/sellers">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  {t.startSelling}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t.categories}
            </h2>
            <Link to="/shop">
              <Button variant="outline">{t.viewAll}</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Electronics",
              "Fashion",
              "Home & Garden",
              "Sports & Outdoors",
            ].map((category, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 border border-border hover:border-primary/50 cursor-pointer transition-all hover:shadow-md"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <p className="font-semibold text-foreground">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t.trending}
          </h2>
          <p className="text-lg text-white/90">
            Join thousands of happy customers shopping on darna
          </p>
          <Link to="/shop">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold"
            >
              {t.shopNow}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
