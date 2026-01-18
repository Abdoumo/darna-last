import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useCart, useOrders } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

type Language = "en" | "ar" | "fr";
type PaymentMethod = "card" | "cod";

interface CheckoutProps {
  language: Language;
}

export default function Checkout({ language }: CheckoutProps) {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  // Customer Information
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState(user?.email || "");
  const [customerPhone, setCustomerPhone] = useState("");

  // Shipping Address
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Card Information
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const translations = {
    en: {
      checkout: "Checkout",
      back: "Back to Cart",
      orderSummary: "Order Summary",
      total: "Total",
      customerInformation: "Customer Information",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      shippingAddress: "Shipping Address",
      address: "Street Address",
      city: "City",
      postalCode: "Postal Code",
      paymentMethod: "Payment Method",
      paymentOptions: "Payment Options",
      creditCard: "Credit Card",
      cashOnDelivery: "Cash on Delivery",
      cardDetails: "Card Details",
      cardNumber: "Card Number",
      expiryDate: "Expiry Date (MM/YY)",
      cvv: "CVV",
      placeOrder: "Place Order",
      processing: "Processing...",
      requiredField: "This field is required",
      invalidEmail: "Please enter a valid email",
      invalidPhone: "Phone number must be 10-12 digits",
      invalidCardNumber: "Card number must be 16 digits",
      invalidExpiry: "Expiry date must be in MM/YY format",
      invalidCvv: "CVV must be 3-4 digits",
      emptyCart: "Your cart is empty. Please add items before checkout.",
      confirmOrder: "Confirm Your Order",
    },
    ar: {
      checkout: "الدفع",
      back: "العودة إلى السلة",
      orderSummary: "ملخص الطلب",
      total: "الإجمالي",
      customerInformation: "معلومات العميل",
      name: "الاسم الكامل",
      email: "عنوان البريد الإلكتروني",
      phone: "رقم الهاتف",
      shippingAddress: "عنوان الشحن",
      address: "عنوان الشارع",
      city: "المدينة",
      postalCode: "الرمز البريدي",
      paymentMethod: "طريقة الدفع",
      paymentOptions: "خيارات الدفع",
      creditCard: "بطاقة ائتمان",
      cashOnDelivery: "الدفع عند الاستلام",
      cardDetails: "تفاصيل البطاقة",
      cardNumber: "رقم البطاقة",
      expiryDate: "تاريخ الانتهاء (MM/YY)",
      cvv: "CVV",
      placeOrder: "تأكيد الطلب",
      processing: "جاري المعالجة...",
      requiredField: "هذا الحقل مطلوب",
      invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
      invalidPhone: "يجب أن يحتوي رقم الهاتف على 10-12 رقم",
      invalidCardNumber: "يجب أن يحتوي رقم البطاقة على 16 رقم",
      invalidExpiry: "يجب أن يكون تاريخ الانتهاء بصيغة MM/YY",
      invalidCvv: "يجب أن يحتوي CVV على 3-4 أرقام",
      emptyCart: "سلتك فارغة. يرجى إضافة عناصر قبل الدفع.",
      confirmOrder: "تأكيد طلبك",
    },
    fr: {
      checkout: "Paiement",
      back: "Retour au panier",
      orderSummary: "Résumé de la commande",
      total: "Total",
      customerInformation: "Informations client",
      name: "Nom complet",
      email: "Adresse e-mail",
      phone: "Numéro de téléphone",
      shippingAddress: "Adresse de livraison",
      address: "Adresse postale",
      city: "Ville",
      postalCode: "Code postal",
      paymentMethod: "Mode de paiement",
      paymentOptions: "Options de paiement",
      creditCard: "Carte de crédit",
      cashOnDelivery: "Paiement à la livraison",
      cardDetails: "Détails de la carte",
      cardNumber: "Numéro de carte",
      expiryDate: "Date d'expiration (MM/YY)",
      cvv: "CVV",
      placeOrder: "Confirmer la commande",
      processing: "Traitement...",
      requiredField: "Ce champ est obligatoire",
      invalidEmail: "Veuillez entrer une adresse e-mail valide",
      invalidPhone: "Le numéro de téléphone doit contenir 10-12 chiffres",
      invalidCardNumber: "Le numéro de carte doit contenir 16 chiffres",
      invalidExpiry: "La date d'expiration doit être au format MM/YY",
      invalidCvv: "CVV doit contenir 3-4 chiffres",
      emptyCart: "Votre panier est vide. Veuillez ajouter des articles avant de payer.",
      confirmOrder: "Confirmer votre commande",
    },
  };

  const t = translations[language];
  const isRtl = language === "ar";

  if (items.length === 0) {
    return (
      <div
        className={`w-full min-h-screen bg-white py-12 px-4 ${isRtl ? "rtl" : "ltr"}`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-muted-foreground mb-6">{t.emptyCart}</p>
          <Button onClick={() => navigate("/shop")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Button>
        </div>
      </div>
    );
  }

  const validateForm = (): string | null => {
    if (!customerName.trim()) return "name";
    if (!customerEmail.trim()) return "email";
    if (!customerEmail.includes("@")) return t.invalidEmail;
    if (!customerPhone.trim()) return "phone";

    const phoneDigits = customerPhone.replace(/\D/g, "");
    if (phoneDigits.length < 9) return t.invalidPhone;

    if (!address.trim()) return "address";
    if (!city.trim()) return "city";
    if (!postalCode.trim()) return "postalCode";

    if (paymentMethod === "card") {
      if (!cardNumber.trim()) return "cardNumber";
      const cardDigits = cardNumber.replace(/\D/g, "");
      if (cardDigits.length !== 16) return t.invalidCardNumber;

      if (!expiryDate.trim()) return "expiryDate";
      if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return t.invalidExpiry;

      if (!cvv.trim()) return "cvv";
      if (!/^\d{3,4}$/.test(cvv)) return t.invalidCvv;
    }

    return null;
  };

  const handlePlaceOrder = async () => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const orderId = `ORD-${Date.now()}`;
      const newOrder = {
        id: orderId,
        items: items,
        totalPrice: getTotalPrice(),
        customerName,
        customerEmail,
        customerPhone,
        address,
        city,
        postalCode,
        paymentMethod,
        cardNumber: paymentMethod === "card" ? cardNumber.slice(-4).padStart(16, "*") : undefined,
        expiryDate: paymentMethod === "card" ? expiryDate : undefined,
        cvv: undefined,
        status: "completed" as const,
        createdAt: new Date().toISOString(),
      };

      addOrder(newOrder);
      clearCart();

      // Redirect to confirmation page
      navigate(`/order-confirmation/${orderId}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={`w-full min-h-screen bg-white py-12 px-4 ${isRtl ? "rtl" : "ltr"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/cart")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Button>
          <h1 className="text-3xl font-bold">{t.checkout}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information */}
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">{t.customerInformation}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.name} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={t.name}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.email} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder={t.email}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.phone} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder={t.phone}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">e.g., +213 555 123 4567</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">{t.shippingAddress}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {t.address} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t.address}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t.city} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={t.city}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t.postalCode} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder={t.postalCode}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">{t.paymentMethod}</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="w-4 h-4"
                  />
                  <span className="font-semibold">{t.cashOnDelivery}</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="w-4 h-4"
                  />
                  <span className="font-semibold">{t.creditCard}</span>
                </label>
              </div>

              {paymentMethod === "card" && (
                <div className="mt-6 space-y-4 pt-6 border-t border-border">
                  <h3 className="font-semibold">{t.cardDetails}</h3>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t.cardNumber} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
                        setCardNumber(digits);
                      }}
                      placeholder="1234567890123456"
                      maxLength={16}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{cardNumber.length}/16 digits</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t.expiryDate} <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "");
                          if (val.length >= 2) {
                            val = val.slice(0, 2) + "/" + val.slice(2, 4);
                          }
                          setExpiryDate(val);
                        }}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t.cvv} <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">{t.orderSummary}</h2>

              <div className="space-y-3 border-b border-border pb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                    </span>
                    <span>DZD {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-bold text-lg py-4">
                <span>{t.total}</span>
                <span className="text-primary">DZD {getTotalPrice().toFixed(2)}</span>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isProcessing ? t.processing : t.placeOrder}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
