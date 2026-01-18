export interface Product {
  id: number;
  name: string;
  price: number;
  rating?: number;
  reviews?: number;
  seller: string;
  category: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 129.99,
    rating: 4.5,
    reviews: 320,
    seller: "TechMart",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Classic Cotton T-Shirt",
    price: 29.99,
    rating: 4.8,
    reviews: 150,
    seller: "Fashion Plus",
    category: "Fashion",
  },
  {
    id: 3,
    name: "Smart Watch Pro",
    price: 299.99,
    rating: 4.7,
    reviews: 450,
    seller: "ElectroHub",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Organic Coffee Beans",
    price: 19.99,
    rating: 4.6,
    reviews: 280,
    seller: "CoffeeLovers",
    category: "Food",
  },
  {
    id: 5,
    name: "Yoga Mat Premium",
    price: 49.99,
    rating: 4.9,
    reviews: 190,
    seller: "FitLife",
    category: "Sports",
  },
  {
    id: 6,
    name: "LED Desk Lamp",
    price: 39.99,
    rating: 4.4,
    reviews: 220,
    seller: "HomeStyle",
    category: "Home",
  },
  {
    id: 7,
    name: "Running Sneakers",
    price: 89.99,
    rating: 4.7,
    reviews: 380,
    seller: "SportZone",
    category: "Fashion",
  },
  {
    id: 8,
    name: "Kitchen Knife Set",
    price: 59.99,
    rating: 4.8,
    reviews: 160,
    seller: "ChefPro",
    category: "Home",
  },
];

export function getAllCategories(): string[] {
  const categories = new Set(mockProducts.map((p) => p.category));
  return Array.from(categories).sort();
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.seller.toLowerCase().includes(searchTerm)
  );
}

export function getProductsByCategory(category: string): Product[] {
  return mockProducts.filter(
    (product) =>
      product.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllProducts(): Product[] {
  return mockProducts;
}

export function detectUserIntent(message: string): {
  type: "search" | "category" | "all" | "general";
  query?: string;
  category?: string;
} {
  const lowerMessage = message.toLowerCase();

  const categoryKeywords = [
    "electronics",
    "fashion",
    "food",
    "sports",
    "home",
  ];
  const detectedCategory = categoryKeywords.find((cat) =>
    lowerMessage.includes(cat)
  );

  if (
    detectedCategory &&
    (lowerMessage.includes("show") ||
      lowerMessage.includes("what") ||
      lowerMessage.includes("have") ||
      lowerMessage.includes("find"))
  ) {
    return { type: "category", category: detectedCategory };
  }

  if (
    lowerMessage.includes("all products") ||
    lowerMessage.includes("show all") ||
    lowerMessage.includes("list all") ||
    (lowerMessage.includes("products") && lowerMessage.includes("show"))
  ) {
    return { type: "all" };
  }

  const searchKeywords = [
    "find",
    "show",
    "what",
    "have",
    "search",
    "looking",
    "want",
    "need",
  ];
  if (searchKeywords.some((keyword) => lowerMessage.includes(keyword))) {
    const query = message
      .replace(/find|show|what|have|search|looking|want|need|do you/gi, "")
      .replace(/[?.,!]/g, "")
      .trim();

    if (query && query.length > 2) {
      return { type: "search", query };
    }
  }

  return { type: "general" };
}

export function formatProductForDisplay(
  product: Product,
  language: "en" | "ar" | "fr" = "en"
): string {
  const rating = product.rating ? "⭐ " + product.rating.toFixed(1) : "";
  const reviewsText =
    language === "en"
      ? "reviews"
      : language === "ar"
        ? "تقييمات"
        : "avis";

  return `🛍️ **${product.name}**\n💰 DZD ${product.price.toFixed(2)}\n👤 ${product.seller}\n📁 ${product.category}\n${rating} ${product.reviews ? `(${product.reviews} ${reviewsText})` : ""}\n🔗 [View Product](/product/${product.id})`;
}
