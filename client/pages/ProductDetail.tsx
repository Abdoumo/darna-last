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
        name: "Modern Sofa",
        price: 129.99,
        rating: 4.5,
        reviews: 320,
        seller: "FurniturePro",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=500&fit=crop",
        category: "Home",
        description:
          "Comfortable modern sofa with premium upholstery and sturdy frame. Perfect for living rooms and lounges. Available in multiple colors and sizes.",
        quantity: 50,
      },
      {
        id: 2,
        name: "Wooden Dining Table",
        price: 299.99,
        rating: 4.8,
        reviews: 150,
        seller: "WoodWorks",
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=500&fit=crop",
        category: "Home",
        description:
          "Elegant wooden dining table crafted from fine hardwood. Seats up to 8 people. Features a polished finish and clean contemporary design.",
        quantity: 200,
      },
      {
        id: 3,
        name: "Office Chair Pro",
        price: 199.99,
        rating: 4.7,
        reviews: 450,
        seller: "OfficeHub",
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&h=500&fit=crop",
        category: "Home",
        description:
          "Ergonomic office chair with adjustable height and lumbar support. Perfect for long work sessions. Premium mesh back and cushioned seat.",
        quantity: 30,
      },
      {
        id: 4,
        name: "Glass Coffee Table",
        price: 89.99,
        rating: 4.6,
        reviews: 280,
        seller: "ModernHome",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=500&fit=crop",
        category: "Home",
        description:
          "Minimalist glass coffee table with metal frame. Adds elegance to any living room. Easy to clean and maintains a modern aesthetic.",
        quantity: 100,
      },
      {
        id: 5,
        name: "Bookshelf Premium",
        price: 149.99,
        rating: 4.9,
        reviews: 190,
        seller: "StorageStudio",
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=500&fit=crop",
        category: "Home",
        description:
          "Five-tier wooden bookshelf with ample storage. Sturdy construction supports heavy books and decorative items. Perfect for home libraries.",
        quantity: 75,
      },
      {
        id: 6,
        name: "Floor Lamp Elegant",
        price: 79.99,
        rating: 4.4,
        reviews: 220,
        seller: "LightDesign",
        image: "https://images.unsplash.com/photo-1565636192335-14ecf9f05e39?w=600&h=500&fit=crop",
        category: "Home",
        description:
          "Contemporary floor lamp with adjustable brightness. Energy-efficient LED bulb. Creates warm ambiance in any room. Easy to assemble.",
        quantity: 45,
      },
      {
        id: 7,
        name: "Wall Mirror Large",
        price: 59.99,
        rating: 4.7,
        reviews: 380,
        seller: "DecorHub",
        image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=600&h=500&fit=crop",
        category: "Home",
        description:
          "Large decorative wall mirror with elegant frame. Reflects light to brighten spaces. Perfect for bedrooms, hallways, and bathrooms.",
        quantity: 120,
      },
      {
        id: 8,
        name: "Decorative Vase Set",
        price: 69.99,
        rating: 4.8,
        reviews: 160,
        seller: "ArtDecor",
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=500&fit=crop",
        category: "Home",
        description:
          "Set of three decorative vases in complementary designs. Perfect for table arrangements and floral displays. Handcrafted with attention to detail.",
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
              image: found.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=500&fit=crop",
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
