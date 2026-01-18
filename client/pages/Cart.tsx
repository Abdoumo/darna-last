import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";

type Language = "en" | "ar" | "fr";

interface CartProps {
  language: Language;
}

export default function Cart({ language }: CartProps) {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const translations = {
    en: {
      shoppingCart: "Shopping Cart",
      back: "Back to Shop",
      product: "Product",
      seller: "Seller",
      price: "Price",
      quantity: "Quantity",
      subtotal: "Subtotal",
      total: "Total",
      remove: "Remove",
      checkout: "Proceed to Checkout",
      emptyCart: "Your cart is empty",
      continueShopping: "Continue Shopping",
      clearCart: "Clear Cart",
      confirmClear: "Are you sure you want to clear your cart?",
      cancel: "Cancel",
    },
    ar: {
      shoppingCart: "سلة التسوق",
      back: "العودة إلى المتجر",
      product: "المنتج",
      seller: "البائع",
      price: "السعر",
      quantity: "الكمية",
      subtotal: "الإجمالي الفرعي",
      total: "الإجمالي",
      remove: "إزالة",
      checkout: "المتابعة إلى الدفع",
      emptyCart: "سلتك فارغة",
      continueShopping: "متابعة التسوق",
      clearCart: "مسح السلة",
      confirmClear: "هل تريد بالتأكيد مسح سلتك؟",
      cancel: "إلغاء",
    },
    fr: {
      shoppingCart: "Panier",
      back: "Retour à la boutique",
      product: "Produit",
      seller: "Vendeur",
      price: "Prix",
      quantity: "Quantité",
      subtotal: "Sous-total",
      total: "Total",
      remove: "Supprimer",
      checkout: "Procéder au paiement",
      emptyCart: "Votre panier est vide",
      continueShopping: "Continuer vos achats",
      clearCart: "Vider le panier",
      confirmClear: "Êtes-vous sûr de vouloir vider votre panier ?",
      cancel: "Annuler",
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{t.shoppingCart}</h1>
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-6">{t.emptyCart}</p>
            <Button onClick={() => navigate("/shop")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t.continueShopping}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen bg-white py-12 px-4 ${isRtl ? "rtl" : "ltr"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/shop")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Button>
          <h1 className="text-3xl font-bold">{t.shoppingCart}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted p-4 grid grid-cols-5 gap-4 font-semibold text-sm">
                <div className="col-span-2">{t.product}</div>
                <div>{t.price}</div>
                <div>{t.quantity}</div>
                <div></div>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="border-t border-border p-4 grid grid-cols-5 gap-4 items-center"
                >
                  <div className="col-span-2">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.seller}</p>
                  </div>
                  <div className="text-foreground font-semibold">
                    DZD {item.price.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="px-2 py-1 border border-border rounded hover:bg-muted transition-all"
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-2 py-1 border border-border rounded hover:bg-muted transition-all"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-destructive hover:text-destructive/80 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="mt-4 flex gap-4">
              {showClearConfirm ? (
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      clearCart();
                      setShowClearConfirm(false);
                    }}
                  >
                    {t.clearCart}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowClearConfirm(false)}
                  >
                    {t.cancel}
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowClearConfirm(true)}
                >
                  {t.clearCart}
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">{t.total}</h2>

              <div className="space-y-4 border-b border-border pb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-muted-foreground"
                  >
                    <span>
                      {item.name} x {item.quantity}
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
                onClick={() => navigate("/checkout")}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
              >
                {t.checkout}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
