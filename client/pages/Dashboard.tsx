import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, ShoppingCart, Users } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

type Language = "en" | "ar" | "fr";

interface DashboardProps {
  language: Language;
}

export default function Dashboard({ language }: DashboardProps) {
  const { role } = useParams<{ role: string }>();
  const { user } = useAuth();

  const translations = {
    en: {
      buyerTitle: "Your Dashboard",
      buyerSubtitle: "Welcome back! Here's your shopping overview",
      sellerTitle: "Your Seller Dashboard",
      sellerSubtitle: "Manage your shop, products, and orders",
      myOrders: "My Orders",
      myProducts: "My Products",
      sales: "Total Sales",
      customers: "Customers",
      inventory: "Inventory",
      analytics: "Analytics",
      settings: "Settings",
      addProduct: "Add New Product",
      viewAnalytics: "View Analytics",
      manageStore: "Manage Store",
      placeholder: "This dashboard is ready for full implementation",
      customize: "Customize your storefront",
      trackOrders: "Track your orders",
      viewProducts: "Browse all products",
      manageProducts: "Manage your products",
      trackSales: "Track sales and analytics",
      manageAccount: "Manage account settings",
      trackManageOrders: "Track and manage customer orders",
      viewOrders: "View Orders",
      manageCustomers: "Manage customer relationships",
      viewCustomers: "View Customers",
      configure: "Configure",
      wishlist: "Wishlist",
      savedProducts: "Your saved products",
      viewWishlist: "View Wishlist",
      accountSettings: "Account Settings",
      keepPrompting: "Keep prompting to add more features to your dashboard",
      goHome: "Go to Homepage",
    },
    ar: {
      buyerTitle: "لوحة التحكم الخاصة بك",
      buyerSubtitle: "مرحباً بعودتك! إليك نظرة عامة على التسوق الخاص بك",
      sellerTitle: "لوحة تحكم البائع",
      sellerSubtitle: "أدر متجرك ومنتجاتك وطلباتك",
      myOrders: "طلباتي",
      myProducts: "منتجاتي",
      sales: "إجمالي المبيعات",
      customers: "العملاء",
      inventory: "المخزون",
      analytics: "التحليلات",
      settings: "الإعدادات",
      addProduct: "إضافة منتج جديد",
      viewAnalytics: "عرض التحليلات",
      manageStore: "إدارة المتجر",
      placeholder: "لوحة التحكم هذه جاهزة للتطبيق الكامل",
      customize: "خصص واجهة متجرك",
      trackOrders: "تتبع طلباتك",
      viewProducts: "استعرض جميع المنتجات",
      manageProducts: "أدر منتجاتك",
      trackSales: "تتبع المبيعات والتحليلات",
      manageAccount: "إدارة إعدادات الحساب",
      trackManageOrders: "تتبع وإدارة طلبات العملاء",
      viewOrders: "عرض الطلبات",
      manageCustomers: "إدارة علاقات العملاء",
      viewCustomers: "عرض العملاء",
      configure: "تكوين",
      wishlist: "قائمة المفضلة",
      savedProducts: "منتجاتك المحفوظة",
      viewWishlist: "عرض المفضلة",
      accountSettings: "إعدادات الحساب",
      keepPrompting: "استمر في الطلب لإضافة المزيد من الميزات إلى لوحة التحكم الخاصة بك",
      goHome: "الذهاب إلى الصفحة الرئيسية",
    },
    fr: {
      buyerTitle: "Votre tableau de bord",
      buyerSubtitle: "Bienvenue! Voici un aperçu de vos achats",
      sellerTitle: "Tableau de bord du vendeur",
      sellerSubtitle: "Gérez votre boutique, vos produits et vos commandes",
      myOrders: "Mes commandes",
      myProducts: "Mes produits",
      sales: "Ventes totales",
      customers: "Clients",
      inventory: "Inventaire",
      analytics: "Analyses",
      settings: "Paramètres",
      addProduct: "Ajouter un produit",
      viewAnalytics: "Voir les analyses",
      manageStore: "Gérer la boutique",
      placeholder: "Ce tableau de bord est prêt pour une implémentation complète",
      customize: "Personnalisez votre vitrine",
      trackOrders: "Suivez vos commandes",
      viewProducts: "Parcourir tous les produits",
      manageProducts: "Gérez vos produits",
      trackSales: "Suivez les ventes et les analyses",
      manageAccount: "Gérer les paramètres du compte",
      trackManageOrders: "Suivez et gérez les commandes des clients",
      viewOrders: "Voir les commandes",
      manageCustomers: "Gérer les relations clients",
      viewCustomers: "Voir les clients",
      configure: "Configurer",
      wishlist: "Liste de souhaits",
      savedProducts: "Vos produits enregistrés",
      viewWishlist: "Voir la liste de souhaits",
      accountSettings: "Paramètres du compte",
      keepPrompting: "Continuez à demander pour ajouter plus de fonctionnalités à votre tableau de bord",
      goHome: "Aller à la page d'accueil",
    },
  };

  const t = translations[language];
  const isRtl = language === "ar";
  const isSeller = role === "seller";

  return (
    <div className={`w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {isSeller ? t.sellerTitle : t.buyerTitle}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isSeller ? t.sellerSubtitle : t.buyerSubtitle}
          </p>
          {user && (
            <p className="text-sm text-muted-foreground mt-4">
              {language === "ar" ? "تسجيل الدخول كـ: " : language === "fr" ? "Connecté en tant que: " : "Logged in as: "}
              <span className="font-semibold text-foreground">{user.email}</span>
            </p>
          )}
        </div>

        {/* Quick Stats */}
        {isSeller && (
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: ShoppingCart, label: t.sales, value: "DZD 0" },
              { icon: Users, label: t.customers, value: "0" },
              { icon: Package, label: t.inventory, value: "0" },
              { icon: Package, label: t.myOrders, value: "0" },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white rounded-lg p-6 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted-foreground text-sm font-semibold">
                      {stat.label}
                    </span>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Main Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isSeller ? (
            <>
              <DashboardCard
                icon={Package}
                title={t.myProducts}
                description={t.manageProducts}
                action={t.addProduct}
                actionIcon={<ArrowRight className="w-4 h-4" />}
                href="/seller/products"
              />
              <DashboardCard
                icon={ShoppingCart}
                title={t.myOrders}
                description={t.trackManageOrders}
                action={t.viewOrders}
                actionIcon={<ArrowRight className="w-4 h-4" />}
                href="/seller/orders"
              />
              <DashboardCard
                icon={Users}
                title={t.customers}
                description={t.manageCustomers}
                action={t.viewCustomers}
                actionIcon={<ArrowRight className="w-4 h-4" />}
                href="/seller/customers"
              />
              <DashboardCard
                icon={Package}
                title={t.analytics}
                description={t.trackSales}
                action={t.viewAnalytics}
                actionIcon={<ArrowRight className="w-4 h-4" />}
                href="/seller/analytics"
              />
              <DashboardCard
                icon={Package}
                title={t.manageStore}
                description={t.customize}
                action={t.configure}
                actionIcon={<ArrowRight className="w-4 h-4" />}
                href="/seller/settings"
              />
              <DashboardCard
                icon={Package}
                title={t.settings}
                description={t.manageAccount}
                action={t.settings}
                actionIcon={<ArrowRight className="w-4 h-4" />}
                href="/seller/settings"
              />
            </>
          ) : (
            <>
              <DashboardCard
                icon={ShoppingCart}
                title={t.myOrders}
                description={t.trackOrders}
                action={t.viewOrders}
                actionIcon={<ArrowRight className="w-4 h-4" />}
              />
              <DashboardCard
                icon={Package}
                title={t.wishlist}
                description={t.savedProducts}
                action={t.viewWishlist}
                actionIcon={<ArrowRight className="w-4 h-4" />}
              />
              <DashboardCard
                icon={Users}
                title={t.accountSettings}
                description={t.manageAccount}
                action={t.settings}
                actionIcon={<ArrowRight className="w-4 h-4" />}
                href="/seller/settings"
              />
            </>
          )}
        </div>

        {/* Placeholder Info */}
        <div className="mt-12 bg-white rounded-lg border border-border p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {t.placeholder}
          </h3>
          <p className="text-muted-foreground mb-6">
            {t.keepPrompting}
          </p>
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {t.goHome}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  icon: Icon,
  title,
  description,
  action,
  actionIcon,
  href,
}: {
  icon: any;
  title: string;
  description: string;
  action: string;
  actionIcon: React.ReactNode;
  href?: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-border p-6 hover:shadow-lg transition-all">
      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      {href ? (
        <Link to={href} className="block">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 w-full justify-center"
          >
            {action}
            {actionIcon}
          </Button>
        </Link>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="gap-2 w-full justify-center"
        >
          {action}
          {actionIcon}
        </Button>
      )}
    </div>
  );
}
