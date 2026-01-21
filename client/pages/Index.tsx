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
              <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="assets/phone-darna.jpeg"
                  alt={t.premiumExperience}
                  className="w-full h-full object-cover"
                  style={{imageFit:'cover'}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-xl font-bold">{t.premiumExperience}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Slogans Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === "ar" ? "معنا دارنا" : language === "fr" ? "Avec darna" : "Our Mission"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {language === "ar" ? "نحن نحول أحلامك إلى واقع" : language === "fr" ? "Nous transformons vos rêves en réalité" : "We transform your dreams into reality"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Slogan 1 */}
            <div className="group relative rounded-xl overflow-hidden bg-white border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=300&fit=crop"
                  alt="renovation"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="p-6">
                <p className="text-lg font-semibold text-foreground leading-relaxed mb-3">
                  {language === "ar" ? "مع دارنا جديدك حبو ...و قديمك نقدرو" : language === "fr" ? "Avec darna, valorisez le nouveau et respectez l'ancien" : "With darna, love your new and appreciate your old"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "ar" ? "نحافظ على قيمة ممتلكاتك مع تحديثها بأحدث الأساليب" : language === "fr" ? "Préservez la valeur de votre propriété tout en la modernisant" : "Preserve your property value while modernizing it"}
                </p>
              </div>
            </div>

            {/* Slogan 2 */}
            <div className="group relative rounded-xl overflow-hidden bg-white border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop"
                  alt="selling"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="p-6">
                <p className="text-lg font-semibold text-foreground leading-relaxed mb-3">
                  {language === "ar" ? "مع دارنا انت تبيع و غيرك يشري" : language === "fr" ? "Avec darna, vous vendez et d'autres achètent" : "With darna, you sell and others buy"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "ar" ? "منصة آمنة وموثوقة للبيع والشراء" : language === "fr" ? "Une plateforme sûre et fiable pour vendre et acheter" : "A safe and reliable platform for selling and buying"}
                </p>
              </div>
            </div>

            {/* Slogan 3 */}
            <div className="group relative rounded-xl overflow-hidden bg-white border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop"
                  alt="profit"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="p-6">
                <p className="text-lg font-semibold text-foreground leading-relaxed mb-3">
                  {language === "ar" ? "مع دارنا جدد بيتك و اربح جيبك" : language === "fr" ? "Avec darna, rénovez votre maison et gagnez de l'argent" : "With darna, renovate your home and earn money"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "ar" ? "استثمر في بيتك وحقق أرباحاً حقيقية" : language === "fr" ? "Investissez dans votre maison et réalisez des profits réels" : "Invest in your home and achieve real profits"}
                </p>
              </div>
            </div>

            {/* Slogan 4 */}
            <div className="group relative rounded-xl overflow-hidden bg-white border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556909029-c2ca60007c5f?w=500&h=300&fit=crop"
                  alt="sustainability"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="p-6">
                <p className="text-lg font-semibold text-foreground leading-relaxed mb-3">
                  {language === "ar" ? "مع دارنا: لا شيء يُرمى، كل شيء يُحول" : language === "fr" ? "Rien ne se jette, tout se transforme" : "Nothing is wasted, everything is transformed"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "ar" ? "استدامة وتحويل ذكي للموارد" : language === "fr" ? "Durabilité et transformation intelligente des ressources" : "Sustainability and smart resource transformation"}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Slogans */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                  {language === "ar" ? "من دارك إلى دارنا" : language === "fr" ? "De votre maison à darna" : "From Your Home to darna"}
                </h3>
                <p className="text-lg text-white/90">
                  {language === "ar" ? "انطلق نحو التغيير والازدهار" : language === "fr" ? "Commencez votre voyage vers le changement et la prospérité" : "Start your journey toward change and prosperity"}
                </p>
                <Link to="/shop">
                  <Button className="bg-white text-primary hover:bg-white/90 font-semibold">
                    {t.shopNow}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                  {language === "ar" ? "سعر ذكي، اختيار واضح" : language === "fr" ? "Prix intelligent, choix évident" : "Smart Price, Perfect Choice"}
                </h3>
                <p className="text-lg text-white/90">
                  {language === "ar" ? "جودة بأفضل الأسعار" : language === "fr" ? "Qualité aux meilleurs prix" : "Quality at the best prices"}
                </p>
                <Link to="/shop">
                  <Button className="bg-white text-primary hover:bg-white/90 font-semibold">
                    {t.shopNow}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Premium Slogans */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-border p-8 text-center hover:shadow-lg transition-shadow">
              <p className="text-xl font-bold text-primary mb-2">
                {language === "ar" ? "جدد بدون جهد" : language === "fr" ? "Rénovez sans effort" : "Renovate Without Effort"}
              </p>
              <p className="text-sm text-muted-foreground">
                {language === "ar" ? "عملية تجديد سهلة وسريعة" : language === "fr" ? "Un processus de rénovation facile et rapide" : "Easy and quick renovation process"}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-border p-8 text-center hover:shadow-lg transition-shadow">
              <p className="text-xl font-bold text-primary mb-2">
                {language === "ar" ? "اكسب الراحة" : language === "fr" ? "Gagnez le confort" : "Gain the Comfort"}
              </p>
              <p className="text-sm text-muted-foreground">
                {language === "ar" ? "عيش في راحة واسترخاء" : language === "fr" ? "Vivez dans le confort et la détente" : "Live in comfort and relaxation"}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-border p-8 text-center hover:shadow-lg transition-shadow">
              <p className="text-xl font-bold text-primary mb-2">
                {language === "ar" ? "خيار ذكي" : language === "fr" ? "Choix évident" : "The Right Choice"}
              </p>
              <p className="text-sm text-muted-foreground">
                {language === "ar" ? "الاختيار الأول للملايين" : language === "fr" ? "Le premier choix pour les millions" : "The first choice for millions"}
              </p>
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
              <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop"
                  alt="Seller Dashboard"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
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
