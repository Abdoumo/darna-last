import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Heart, Star, Check } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";

type Language = "en" | "ar" | "fr";

interface ProductDetailProps {
  language: Language;
}

interface Product {
  id: number | string;
  name: string;
  price: number;
  rating?: number;
  reviews?: number;
  seller: string;
  image?: string;
  category: string;
  description?: string;
  quantity?: number;
  sellerId?: string;
  sellerEmail?: string;
  createdAt?: string;
}

export default function ProductDetail({ language }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const translations = {
    en: {
      back: "Back to Shop",
      addToCart: "Add to Cart",
      favorite: "Add to Favorites",
      removeFavorite: "Remove from Favorites",
      quantity: "Quantity",
      price: "Price",
      seller: "Seller",
      category: "Category",
      description: "Description",
      rating: "Rating",
      reviews: "Reviews",
      inStock: "In Stock",
      notFound: "Product not found",
      quantityInStock: "Quantity in Stock",
    },
    ar: {
      back: "العودة إلى المتجر",
      addToCart: "أضف إلى السلة",
      favorite: "أضف إلى المفضلة",
      removeFavorite: "إزالة من المفضلة",
      quantity: "الكمية",
      price: "السعر",
      seller: "البائع",
      category: "الفئة",
      description: "الوصف",
      rating: "التقييم",
      reviews: "التقييمات",
      inStock: "متوفر",
      notFound: "المنتج غير موجود",
      quantityInStock: "الكمية المتوفرة",
    },
    fr: {
      back: "Retour à la boutique",
      addToCart: "Ajouter au panier",
      favorite: "Ajouter aux favoris",
      removeFavorite: "Supprimer des favoris",
      quantity: "Quantité",
      price: "Prix",
      seller: "Vendeur",
      category: "Catégorie",
      description: "Description",
      rating: "Évaluation",
      reviews: "Avis",
      inStock: "En stock",
      notFound: "Produit non trouvé",
      quantityInStock: "Quantité disponible",
    },
  };

  const t = translations[language];
  const isRtl = language === "ar";

  useEffect(() => {
    // Load product from mock data or localStorage
    const mockProducts = [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 129.99,
        rating: 4.5,
        reviews: 320,
        seller: "TechMart",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=500&fit=crop",
        category: "Electronics",
        description:
          "High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.",
        quantity: 50,
      },
      {
        id: 2,
        name: "Classic Cotton T-Shirt",
        price: 29.99,
        rating: 4.8,
        reviews: 150,
        seller: "Fashion Plus",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=500&fit=crop",
        category: "Fashion",
        description:
          "Comfortable and durable cotton t-shirt made from 100% organic cotton. Available in multiple colors and sizes.",
        quantity: 200,
      },
      {
        id: 3,
        name: "Smart Watch Pro",
        price: 299.99,
        rating: 4.7,
        reviews: 450,
        seller: "ElectroHub",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=500&fit=crop",
        category: "Electronics",
        description:
          "Advanced smartwatch with fitness tracking, heart rate monitor, and 7-day battery life. Compatible with iOS and Android.",
        quantity: 30,
      },
      {
        id: 4,
        name: "Organic Coffee Beans",
        price: 19.99,
        rating: 4.6,
        reviews: 280,
        seller: "CoffeeLovers",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=600&h=500&fit=crop",
        category: "Food",
        description:
          "Premium organic coffee beans sourced from fair-trade farms. Freshly roasted and delivered to your door.",
        quantity: 100,
      },
      {
        id: 5,
        name: "Yoga Mat Premium",
        price: 49.99,
        rating: 4.9,
        reviews: 190,
        seller: "FitLife",
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=500&fit=crop",
        category: "Sports",
        description:
          "Non-slip yoga mat with excellent cushioning. Eco-friendly and lightweight, perfect for home or studio practice.",
        quantity: 75,
      },
      {
        id: 6,
        name: "LED Desk Lamp",
        price: 39.99,
        rating: 4.4,
        reviews: 220,
        seller: "HomeStyle",
        image: "https://images.unsplash.com/photo-1565636192335-14ecf9f05e39?w=600&h=500&fit=crop",
        category: "Home",
        description:
          "Modern LED desk lamp with adjustable brightness and color temperature. Energy-efficient and stylish design.",
        quantity: 45,
      },
      {
        id: 7,
        name: "Running Sneakers",
        price: 89.99,
        rating: 4.7,
        reviews: 380,
        seller: "SportZone",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=500&fit=crop",
        category: "Fashion",
        description:
          "Comfortable and durable running shoes with advanced cushioning technology. Available in various sizes.",
        quantity: 120,
      },
      {
        id: 8,
        name: "Kitchen Knife Set",
        price: 59.99,
        rating: 4.8,
        reviews: 160,
        seller: "ChefPro",
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&h=500&fit=crop",
        category: "Home",
        description:
          "Professional-grade kitchen knife set with stainless steel blades. Includes storage case and sharpening stone.",
        quantity: 35,
      },
    ];

    // Check mock products first
    let found = mockProducts.find((p) => p.id.toString() === id);

    // If not found, check localStorage for seller products
    if (!found) {
      const allStoredProducts = localStorage.getItem("darna-all-products");
      if (allStoredProducts) {
        try {
          const parsed = JSON.parse(allStoredProducts);
          found = parsed.find((p: any) => p.id === id);
          if (found) {
            found = {
              ...found,
              rating: 4.5,
              reviews: 0,
              image: found.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=500&fit=crop",
            };
          }
        } catch (error) {
          console.error("Failed to load seller products:", error);
        }
      }
    }

    if (found) {
      setProduct(found);
    }
  }, [id]);

  if (!product) {
    return (
      <div className={`w-full min-h-screen bg-white py-12 px-4 ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">{t.notFound}</p>
          <Button onClick={() => navigate("/shop")} className="mt-6">
            {t.back}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full min-h-screen bg-white py-12 px-4 ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/shop")}
          className="gap-2 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.back}
        </Button>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="w-full h-96 md:h-full rounded-lg overflow-hidden relative bg-gray-100 flex items-center justify-center">
              {product.image && product.image.startsWith("http") ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`${product.image} w-full h-full`} />
              )}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-10"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.seller}: {product.seller}
              </p>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} {t.reviews})
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="border-b border-border pb-6">
              <p className="text-3xl font-bold text-primary">
                DZD {product.price.toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-semibold text-foreground mb-2">
                {t.description}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description || "No description available"}
              </p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 border-y border-border py-6">
              <div>
                <p className="text-sm text-muted-foreground">{t.category}</p>
                <p className="font-semibold text-foreground">
                  {product.category}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.quantityInStock}
                </p>
                <p className="font-semibold text-foreground">
                  {product.quantity}
                </p>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t.quantity}
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      setQuantity(Math.max(1, quantity - 1))
                    }
                    className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-all"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.quantity || 999, quantity + 1))
                    }
                    className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="gap-2"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                  {isFavorite ? t.removeFavorite : t.favorite}
                </Button>
                <Button
                  onClick={() => {
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: quantity,
                      seller: product.seller,
                      image: product.image,
                      category: product.category,
                    });
                    setIsAddedToCart(true);
                    setTimeout(() => setIsAddedToCart(false), 2000);
                  }}
                  className={`gap-2 transition-all ${
                    isAddedToCart
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  }`}
                >
                  {isAddedToCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      {t.addToCart}
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      {t.addToCart}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
