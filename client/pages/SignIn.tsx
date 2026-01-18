import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/auth-context";

type Language = "en" | "ar" | "fr";

interface SignInProps {
  language: Language;
}

export default function SignIn({ language }: SignInProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      title: "Sign In",
      subtitle: "Welcome back to darna",
      email: "Email",
      password: "Password",
      signin: "Sign In",
      signup: "Sign Up",
      forgotPassword: "Forgot Password?",
      noAccount: "Don't have an account?",
      createOne: "Create one",
      buyer: "I'm a Buyer",
      seller: "I'm a Seller",
      selectRole: "Select your role",
      emailPlaceholder: "Enter your email",
      passwordPlaceholder: "Enter your password",
      signInSuccess: "Signing you in...",
      error: "Invalid email or password",
    },
    ar: {
      title: "تسجيل الدخول",
      subtitle: "مرحبا بعودتك إلى darna",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      signin: "تسجيل الدخول",
      signup: "إنشاء حساب",
      forgotPassword: "هل نسيت كلمة المرور؟",
      noAccount: "ليس لديك حساب؟",
      createOne: "أنشئ واحدا",
      buyer: "أنا مشتري",
      seller: "أنا بائع",
      selectRole: "اختر دورك",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      passwordPlaceholder: "أدخل كلمة المرور",
      signInSuccess: "جاري تسجيل دخولك...",
      error: "بريد إلكتروني أو كلمة مرور غير صحيحة",
    },
    fr: {
      title: "Connexion",
      subtitle: "Bienvenue sur darna",
      email: "E-mail",
      password: "Mot de passe",
      signin: "Connexion",
      signup: "Inscription",
      forgotPassword: "Mot de passe oublié?",
      noAccount: "Pas encore de compte?",
      createOne: "En créer un",
      buyer: "Je suis acheteur",
      seller: "Je suis vendeur",
      selectRole: "Sélectionnez votre rôle",
      emailPlaceholder: "Entrez votre e-mail",
      passwordPlaceholder: "Entrez votre mot de passe",
      signInSuccess: "Connexion en cours...",
      error: "Email ou mot de passe invalide",
    },
  };

  const t = translations[language];
  const isRtl = language === "ar";

  const handleSubmit = async (e: React.FormEvent, role: string) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError(t.error);
        setLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 800));
      login(email, password, role as "buyer" | "seller");
      navigate(`/dashboard/${role}`);
    } catch (err) {
      setError(t.error);
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
                  <Label htmlFor="buyer-email">{t.email}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="buyer-email"
                      type="email"
                      placeholder={t.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="buyer-password">{t.password}</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      {t.forgotPassword}
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="buyer-password"
                      type="password"
                      placeholder={t.passwordPlaceholder}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
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
                  {loading ? t.signInSuccess : t.signin}
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
                  <Label htmlFor="seller-email">{t.email}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="seller-email"
                      type="email"
                      placeholder={t.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="seller-password">{t.password}</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      {t.forgotPassword}
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="seller-password"
                      type="password"
                      placeholder={t.passwordPlaceholder}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
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
                  {loading ? t.signInSuccess : t.signin}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-muted-foreground">
              {t.noAccount}{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                {t.createOne}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
