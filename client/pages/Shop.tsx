import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Language = "en" | "ar" | "fr";

interface ShopProps {
  language: Language;
}

const mockProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 129.99,
    rating: 4.5,
    reviews: 320,
    seller: "TechMart",
    image: "bg-gradient-to-br from-blue-400 to-blue-600",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Classic Cotton T-Shirt",
    price: 29.99,
    rating: 4.8,
    reviews: 150,
    seller: "Fashion Plus",
    image: "bg-gradient-to-br from-purple-400 to-pink-600",
    category: "Fashion",
  },
  {
    id: 3,
    name: "Smart Watch Pro",
    price: 299.99,
    rating: 4.7,
    reviews: 450,
    seller: "ElectroHub",
    image: "bg-gradient-to-br from-green-400 to-teal-600",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Organic Coffee Beans",
    price: 19.99,
    rating: 4.6,
    reviews: 280,
    seller: "CoffeeLovers",
    image: "bg-gradient-to-br from-yellow-400 to-orange-600",
    category: "Food",
  },
  {
    id: 5,
    name: "Yoga Mat Premium",
    price: 49.99,
    rating: 4.9,
    reviews: 190,
    seller: "FitLife",
    image: "bg-gradient-to-br from-red-400 to-red-600",
    category: "Sports",
  },
  {
    id: 6,
    name: "LED Desk Lamp",
    price: 39.99,
    rating: 4.4,
    reviews: 220,
    seller: "HomeStyle",
    image: "bg-gradient-to-br from-indigo-400 to-purple-600",
    category: "Home",
  },
  {
    id: 7,
    name: "Running Sneakers",
    price: 89.99,
    rating: 4.7,
    reviews: 380,
    seller: "SportZone",
    image: "bg-gradient-to-br from-cyan-400 to-blue-600",
    category: "Fashion",
  },
  {
    id: 8,
    name: "Kitchen Knife Set",
    price: 59.99,
    rating: 4.8,
    reviews: 160,
    seller: "ChefPro",
    image: "bg-gradient-to-br from-gray-400 to-gray-600",
    category: "Home",
  },
];

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

export default function Shop({ language }: ShopProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [favorites, setFavorites] = useState<(number | string)[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const translations = {
    en: {
      title: "Shop",
      subtitle: "Discover thousands of products from trusted sellers",
      searchPlaceholder: "Search products...",
      category: "Category",
      all: "All Categories",
      sort: "Sort By",
      popular: "Popular",
      newest: "Newest",
      pricelow: "Price: Low to High",
      pricehigh: "Price: High to Low",
      addToCart: "Add to Cart",
      viewDetails: "View Details",
      noResults: "No products found matching your search.",
      seller: "Seller:",
      rating: "Rating",
    },
    ar: {
      title: "المتجر",
      subtitle: "اكتشف آلاف المنتجات من البائعين الموثوقين",
      searchPlaceholder: "البحث عن المنتجات...",
      category: "الفئة",
      all: "جميع الفئات",
      sort: "الترتيب حسب",
      popular: "الأكثر شهرة",
      newest: "الأحدث",
      pricelow: "السعر: من الأقل إلى الأعلى",
      pricehigh: "السعر: من الأعلى إلى الأقل",
      addToCart: "أضف إلى السلة",
      viewDetails: "عرض التفاصيل",
      noResults: "لم يتم العثور على منتجات تطابق البحث.",
      seller: "البائع:",
      rating: "التقييم",
    },
    fr: {
      title: "Boutique",
      subtitle: "Découvrez des milliers de produits auprès de vendeurs de confiance",
      searchPlaceholder: "Rechercher des produits...",
      category: "Catégorie",
      all: "Toutes les catégories",
      sort: "Trier par",
      popular: "Populaire",
      newest: "Plus récent",
      pricelow: "Prix: du plus bas au plus haut",
      pricehigh: "Prix: du plus haut au plus bas",
      addToCart: "Ajouter au panier",
      viewDetails: "Voir les détails",
      noResults: "Aucun produit ne correspond à votre recherche.",
      seller: "Vendeur:",
      rating: "Évaluation",
    },
  };

  const t = translations[language];
  const isRtl = language === "ar";

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
    "Food",
    "Other",
    "Fashion",
    "Home",
  ];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (productId: number | string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Function to load products
  const loadProducts = () => {
    const mockProductsWithDefaults = mockProducts.map((p) => ({
      ...p,
      reviews: p.reviews || 0,
      rating: p.rating || 0,
    }));

    const sellerProducts: Product[] = [];
    const allStoredProducts = localStorage.getItem("darna-all-products");
    if (allStoredProducts) {
      try {
        const parsed = JSON.parse(allStoredProducts);
        sellerProducts.push(
          ...parsed.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            rating: 4.5,
            reviews: 0,
            seller: p.sellerEmail || "Seller",
            category: p.category,
            description: p.description,
            quantity: p.quantity,
            image: p.image || `bg-gradient-to-br from-cyan-400 to-blue-600`,
          }))
        );
      } catch (error) {
        console.error("Failed to load seller products:", error);
      }
    }

    setAllProducts([...mockProductsWithDefaults, ...sellerProducts]);
  };

  // Load products on mount and when page gains focus
  useEffect(() => {
    loadProducts();

    // Reload products when user returns to the shop page
    const handleFocus = () => {
      loadProducts();
    };

    window.addEventListener("focus", handleFocus);
    // Also listen for custom event from storage changes
    const handleStorageChange = () => {
      loadProducts();
    };
    window.addEventListener("storage-updated", handleStorageChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage-updated", handleStorageChange);
    };
  }, []);

  return (
    <div className={`w-full ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-lg text-white/90">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white border-b border-border py-6 px-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Search */}
          <Input
            type="search"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={t.category} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all}</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={t.sort} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">{t.popular}</SelectItem>
                <SelectItem value="newest">{t.newest}</SelectItem>
                <SelectItem value="price-low">{t.pricelow}</SelectItem>
                <SelectItem value="price-high">{t.pricehigh}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">{t.noResults}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Product Image */}
                  <div
                    className={`${product.image} w-full h-48 flex items-center justify-center relative group overflow-hidden`}
                  >
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t.seller} {product.seller}
                      </p>
                      <h3 className="font-semibold text-foreground line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <span className="font-bold text-lg text-primary">
                        DZD {product.price}
                      </span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        {t.viewDetails}
                      </Button>
                      <Button
                        size="sm"
                        className="w-full text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        {t.addToCart}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
