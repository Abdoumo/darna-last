import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, Store, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth-context";

type Language = "en" | "ar" | "fr";

interface SignUpProps {
  language: Language;
}

export default function SignUp({ language }: SignUpProps) {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    storeName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const translations = {
    en: {
      title: "Create Account",
      subtitle: "Join darna today",
      name: "Full Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      storeName: "Store Name",
      signup: "Create Account",
      signin: "Sign In",
      haveAccount: "Already have an account?",
      buyer: "I'm a Buyer",
      seller: "I'm a Seller",
      namePlaceholder: "Enter your full name",
      emailPlaceholder: "Enter your email",
      passwordPlaceholder: "At least 8 characters",
      confirmPasswordPlaceholder: "Confirm your password",
      storeNamePlaceholder: "Your store name",
      agreeTerms: "I agree to the Terms of Service and Privacy Policy",
      agreeTermsRequired: "You must agree to the terms",
      passwordMismatch: "Passwords do not match",
      emailInUse: "Email already in use",
      signupSuccess: "Creating your account...",
      requiredField: "This field is required",
    },
    ar: {
      title: "إنشاء حساب",
      subtitle: "انضم إلى darna اليوم",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      storeName: "اسم المتجر",
      signup: "إنشاء حساب",
      signin: "تسجيل الدخول",
      haveAccount: "هل لديك حساب بالفعل؟",
      buyer: "أنا مشتري",
      seller: "أنا بائع",
      namePlaceholder: "أدخل اسمك الكامل",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      passwordPlaceholder: "على الأقل 8 أحرف",
      confirmPasswordPlaceholder: "تأكيد كلمة المرور",
      storeNamePlaceholder: "اسم متجرك",
      agreeTerms: "أوافق على شروط الخدمة وسياسة الخصوصية",
      agreeTermsRequired: "يجب أن توافق على الشروط",
      passwordMismatch: "كلمات المرور غير متطابقة",
      emailInUse: "البريد الإلكتروني قيد الاستخدام",
      signupSuccess: "جاري إنشاء حسابك...",
      requiredField: "هذا الحقل مطلوب",
    },
    fr: {
      title: "Créer un compte",
      subtitle: "Rejoignez darna aujourd'hui",
      name: "Nom complet",
      email: "E-mail",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      storeName: "Nom du magasin",
      signup: "Créer un compte",
      signin: "Connexion",
      haveAccount: "Vous avez déjà un compte?",
      buyer: "Je suis acheteur",
      seller: "Je suis vendeur",
      namePlaceholder: "Entrez votre nom complet",
      emailPlaceholder: "Entrez votre e-mail",
      passwordPlaceholder: "Au moins 8 caractères",
      confirmPasswordPlaceholder: "Confirmez votre mot de passe",
      storeNamePlaceholder: "Le nom de votre magasin",
      agreeTerms: "J'accepte les conditions d'utilisation et la politique de confidentialité",
      agreeTermsRequired: "Vous devez accepter les conditions",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      emailInUse: "L'e-mail est déjà utilisé",
      signupSuccess: "Création de votre compte...",
      requiredField: "Ce champ est requis",
    },
  };

  const t = translations[language];
  const isRtl = language === "ar";

  const handleSubmit = async (e: React.FormEvent, role: string) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError(t.requiredField);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    if (!agreedToTerms) {
      setError(t.agreeTermsRequired);
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      signup(formData.email, formData.password, formData.name, role as "buyer" | "seller");
      navigate(`/dashboard/${role}`);
    } catch (err) {
      setError(t.emailInUse);
      setLoading(false);
    }
  };

  return (
    <div className={`w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-md mx-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="buyer" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buyer">{t.buyer}</TabsTrigger>
              <TabsTrigger value="seller">{t.seller}</TabsTrigger>
            </TabsList>

            {/* Buyer Tab */}
            <TabsContent value="buyer" className="space-y-4 mt-6">
              <form
                onSubmit={(e) => handleSubmit(e, "buyer")}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="buyer-name">{t.name}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="buyer-name"
                      type="text"
                      placeholder={t.namePlaceholder}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buyer-email">{t.email}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="buyer-email"
                      type="email"
                      placeholder={t.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buyer-password">{t.password}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="buyer-password"
                      type="password"
                      placeholder={t.passwordPlaceholder}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buyer-confirm-password">
                    {t.confirmPassword}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="buyer-confirm-password"
                      type="password"
                      placeholder={t.confirmPasswordPlaceholder}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="buyer-terms"
                    checked={agreedToTerms}
                    onCheckedChange={() => setAgreedToTerms(!agreedToTerms)}
                  />
                  <Label htmlFor="buyer-terms" className="text-sm font-normal">
                    {t.agreeTerms}
                  </Label>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  disabled={loading}
                >
                  {loading ? t.signupSuccess : t.signup}
                </Button>
              </form>
            </TabsContent>

            {/* Seller Tab */}
            <TabsContent value="seller" className="space-y-4 mt-6">
              <form
                onSubmit={(e) => handleSubmit(e, "seller")}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="seller-name">{t.name}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="seller-name"
                      type="text"
                      placeholder={t.namePlaceholder}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seller-store-name">{t.storeName}</Label>
                  <div className="relative">
                    <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="seller-store-name"
                      type="text"
                      placeholder={t.storeNamePlaceholder}
                      value={formData.storeName}
                      onChange={(e) =>
                        setFormData({ ...formData, storeName: e.target.value })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seller-email">{t.email}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="seller-email"
                      type="email"
                      placeholder={t.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seller-password">{t.password}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="seller-password"
                      type="password"
                      placeholder={t.passwordPlaceholder}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seller-confirm-password">
                    {t.confirmPassword}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="seller-confirm-password"
                      type="password"
                      placeholder={t.confirmPasswordPlaceholder}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="seller-terms"
                    checked={agreedToTerms}
                    onCheckedChange={() => setAgreedToTerms(!agreedToTerms)}
                  />
                  <Label htmlFor="seller-terms" className="text-sm font-normal">
                    {t.agreeTerms}
                  </Label>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  disabled={loading}
                >
                  {loading ? t.signupSuccess : t.signup}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-muted-foreground">
              {t.haveAccount}{" "}
              <Link
                to="/signin"
                className="text-primary font-semibold hover:underline"
              >
                {t.signin}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
