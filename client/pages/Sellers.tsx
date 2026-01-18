import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Store, ArrowRight } from "lucide-react";

type Language = "en" | "ar" | "fr";

interface SellersProps {
  language: Language;
}

export default function Sellers({ language }: SellersProps) {
  const translations = {
    en: {
      title: "For Sellers",
      subtitle: "Grow your business on darna",
      description:
        "Join thousands of successful sellers and reach millions of customers. Manage your shop, products, and payments all in one place.",
      getStarted: "Get Started",
      learnMore: "Learn More",
      whyLove: "Why Sellers Love darna",
      readyToStart: "Ready to Start Selling?",
      joinCommunity: "Join our community and start growing your business today",
      createAccount: "Create Seller Account",
      features: [
        {
          title: "Easy Shop Setup",
          description: "Create and customize your shop in minutes",
        },
        {
          title: "Product Management",
          description: "Manage thousands of products with ease",
        },
        {
          title: "Multiple Payment Options",
          description:
            "Accept online payments, COD, and more payment methods",
        },
        {
          title: "Analytics & Reports",
          description: "Track sales, revenue, and customer insights",
        },
        {
          title: "Marketing Tools",
          description: "Promote your products and grow your sales",
        },
        {
          title: "24/7 Support",
          description: "Get help whenever you need it",
        },
      ],
    },
    ar: {
      title: "للبائعين",
      subtitle: "نمّ عملك على darna",
      description:
        "انضم إلى آلاف البائعين الناجحين وادخل إلى ملايين العملاء. أدر متجرك ومنتجاتك ودفعاتك من مكان واحد.",
      getStarted: "ابدأ الآن",
      learnMore: "اعرف المزيد",
      whyLove: "لماذا يحب البائعون darna",
      readyToStart: "هل أنت مستعد لبدء البيع؟",
      joinCommunity: "انضم إلى مجتمعنا وابدأ في نمو عملك اليوم",
      createAccount: "إنشاء حساب بائع",
      features: [
        {
          title: "إعداد المتجر السهل",
          description: "أنشئ وخصص متجرك في دقائق",
        },
        {
          title: "إدارة المنتجات",
          description: "أدر آلاف المنتجات بسهولة",
        },
        {
          title: "خيارات دفع متعددة",
          description: "اقبل الدفع أون لاين والدفع عند الاستلام والمزيد",
        },
        {
          title: "التحليلات والتقارير",
          description: "تتبع المبيعات والإيرادات ورؤى العملاء",
        },
        {
          title: "أدوات التسويق",
          description: "روّج لمنتجاتك وزد مبيعاتك",
        },
        {
          title: "الدعم على مدار الساعة",
          description: "احصل على المساعدة عند الحاجة",
        },
      ],
    },
    fr: {
      title: "Pour les vendeurs",
      subtitle: "Développez votre entreprise sur darna",
      description:
        "Rejoignez des milliers de vendeurs réussis et accédez à des millions de clients. Gérez votre boutique, vos produits et vos paiements au même endroit.",
      getStarted: "Commencer",
      learnMore: "En savoir plus",
      whyLove: "Pourquoi les vendeurs aiment darna",
      readyToStart: "Prêt à commencer à vendre?",
      joinCommunity: "Rejoignez notre communauté et commencez à développer votre entreprise aujourd'hui",
      createAccount: "Créer un compte vendeur",
      features: [
        {
          title: "Configuration facile de la boutique",
          description: "Créez et personnalisez votre boutique en quelques minutes",
        },
        {
          title: "Gestion des produits",
          description: "Gérez facilement des milliers de produits",
        },
        {
          title: "Plusieurs options de paiement",
          description:
            "Acceptez les paiements en ligne, à la livraison et bien d'autres",
        },
        {
          title: "Analyses et rapports",
          description: "Suivez les ventes, revenus et insights clients",
        },
        {
          title: "Outils de marketing",
          description: "Promouvez vos produits et augmentez vos ventes",
        },
        {
          title: "Support 24/7",
          description: "Obtenez de l'aide quand vous en avez besoin",
        },
      ],
    },
  };

  const t = translations[language];
  const isRtl = language === "ar";

  return (
    <div className={`w-full ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">{t.title}</h1>
          <p className="text-xl text-white/90 max-w-2xl">{t.subtitle}</p>
          <p className="text-white/80 max-w-3xl text-lg leading-relaxed">
            {t.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold"
              >
                {t.getStarted}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold"
            >
              {t.learnMore}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16 text-center">
            {t.whyLove}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.map((feature, idx) => (
              <div key={idx} className="p-6 rounded-lg border border-border hover:border-primary/50 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Store className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t.readyToStart}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.joinCommunity}
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              {t.createAccount}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
