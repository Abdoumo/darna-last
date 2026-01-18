import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useOrders } from "@/lib/cart-context";

type Language = "en" | "ar" | "fr";

interface OrderConfirmationProps {
  language: Language;
}

export default function OrderConfirmation({ language }: OrderConfirmationProps) {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { getOrderById } = useOrders();

  const order = orderId ? getOrderById(orderId) : null;

  const translations = {
    en: {
      orderConfirmation: "Order Confirmation",
      success: "Thank you for your order!",
      orderNumber: "Order Number",
      orderDate: "Order Date",
      status: "Status",
      completed: "Completed",
      customerInformation: "Customer Information",
      name: "Name",
      email: "Email",
      phone: "Phone",
      shippingAddress: "Shipping Address",
      address: "Address",
      city: "City",
      postalCode: "Postal Code",
      orderItems: "Order Items",
      product: "Product",
      seller: "Seller",
      price: "Price",
      quantity: "Quantity",
      subtotal: "Subtotal",
      total: "Total",
      paymentMethod: "Payment Method",
      creditCard: "Credit Card",
      cashOnDelivery: "Cash on Delivery",
      cardEnding: "Card ending in",
      continueShop: "Continue Shopping",
      notFound: "Order not found",
      estimatedDelivery: "Estimated Delivery",
      days: "3-5 business days",
      confirmationEmail: "A confirmation email has been sent to",
      trackOrder: "Track Your Order",
    },
    ar: {
      orderConfirmation: "تأكيد الطلب",
      success: "شكراً على طلبك!",
      orderNumber: "رقم الطلب",
      orderDate: "تاريخ الطلب",
      status: "الحالة",
      completed: "مكتمل",
      customerInformation: "معلومات العميل",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      shippingAddress: "عنوان الشحن",
      address: "العنوان",
      city: "المدينة",
      postalCode: "الرمز البريدي",
      orderItems: "عناصر الطلب",
      product: "المنتج",
      seller: "البائع",
      price: "السعر",
      quantity: "الكمية",
      subtotal: "الإجمالي الفرعي",
      total: "الإجمالي",
      paymentMethod: "طريقة الدفع",
      creditCard: "بطاقة ائتمان",
      cashOnDelivery: "الدفع عند الاستلام",
      cardEnding: "البطاقة المنتهية برقم",
      continueShop: "متابعة التسوق",
      notFound: "الطلب غير موجود",
      estimatedDelivery: "التسليم المتوقع",
      days: "3-5 أيام عمل",
      confirmationEmail: "تم إرسال بريد تأكيد إلى",
      trackOrder: "تتبع طلبك",
    },
    fr: {
      orderConfirmation: "Confirmation de commande",
      success: "Merci pour votre commande!",
      orderNumber: "Numéro de commande",
      orderDate: "Date de commande",
      status: "Statut",
      completed: "Complétée",
      customerInformation: "Informations client",
      name: "Nom",
      email: "Email",
      phone: "Téléphone",
      shippingAddress: "Adresse de livraison",
      address: "Adresse",
      city: "Ville",
      postalCode: "Code postal",
      orderItems: "Articles de la commande",
      product: "Produit",
      seller: "Vendeur",
      price: "Prix",
      quantity: "Quantité",
      subtotal: "Sous-total",
      total: "Total",
      paymentMethod: "Mode de paiement",
      creditCard: "Carte de crédit",
      cashOnDelivery: "Paiement à la livraison",
      cardEnding: "Carte se terminant par",
      continueShop: "Continuer vos achats",
      notFound: "Commande non trouvée",
      estimatedDelivery: "Livraison estimée",
      days: "3-5 jours ouvrables",
      confirmationEmail: "Un email de confirmation a été envoyé à",
      trackOrder: "Suivre votre commande",
    },
  };

  const t = translations[language];
  const isRtl = language === "ar";

  if (!order) {
    return (
      <div
        className={`w-full min-h-screen bg-white py-12 px-4 ${isRtl ? "rtl" : "ltr"}`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-muted-foreground mb-6">{t.notFound}</p>
          <Button onClick={() => navigate("/shop")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t.continueShop}
          </Button>
        </div>
      </div>
    );
  }

  const orderDate = new Date(order.createdAt);
  const formattedDate = orderDate.toLocaleDateString(
    language === "en" ? "en-US" : language === "ar" ? "ar-SA" : "fr-FR",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div
      className={`w-full min-h-screen bg-white py-12 px-4 ${isRtl ? "rtl" : "ltr"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4">{t.orderConfirmation}</h1>
          <p className="text-lg text-muted-foreground mb-2">{t.success}</p>
          <p className="text-muted-foreground">
            {t.confirmationEmail} <span className="font-semibold">{order.customerEmail}</span>
          </p>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">{t.orderNumber}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t.orderNumber}</p>
                  <p className="font-semibold text-lg">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t.orderDate}</p>
                  <p className="font-semibold">{formattedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t.status}</p>
                  <p className="font-semibold text-green-600">{t.completed}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t.estimatedDelivery}</p>
                  <p className="font-semibold">{t.days}</p>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">{t.customerInformation}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t.name}</p>
                  <p className="font-semibold">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.phone}</p>
                  <p className="font-semibold">{order.customerPhone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">{t.email}</p>
                  <p className="font-semibold">{order.customerEmail}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">{t.shippingAddress}</h2>
              <div className="space-y-2">
                <p className="font-semibold">{order.address}</p>
                <p className="text-muted-foreground">
                  {order.city}, {order.postalCode}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">{t.orderItems}</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center pb-4 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.seller}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">DZD {item.price.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-lg p-6 sticky top-24 space-y-6">
              {/* Payment Method */}
              <div>
                <h3 className="font-bold mb-2">{t.paymentMethod}</h3>
                <div className="bg-muted p-3 rounded">
                  {order.paymentMethod === "cod" ? (
                    <p className="text-sm font-semibold">{t.cashOnDelivery}</p>
                  ) : (
                    <p className="text-sm font-semibold">
                      {t.creditCard}
                      {order.cardNumber && (
                        <span className="block text-xs text-muted-foreground mt-1">
                          {t.cardEnding} {order.cardNumber}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Total */}
              <div className="border-t border-border pt-6">
                <div className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                      </span>
                      <span>DZD {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                  <span>{t.total}</span>
                  <span className="text-primary">DZD {order.totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={() => navigate("/shop")}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {t.continueShop}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
