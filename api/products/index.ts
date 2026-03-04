import { VercelRequest, VercelResponse } from "@vercel/node";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  seller: string;
  image: string;
  rating: number;
  reviews: number;
  description?: string;
  stock?: number;
}

// In-memory storage for products
let products: Product[] = [];

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "GET") {
    // Return all products
    return res.status(200).json(products);
  }

  if (req.method === "POST") {
    const { name, price, category, seller, image, description, stock } = req.body;

    if (!name || !price || !category || !seller) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      price,
      category,
      seller,
      image: image || "https://via.placeholder.com/400x300",
      rating: 5,
      reviews: 0,
      description,
      stock: stock || 10,
    };

    products.push(newProduct);
    return res.status(201).json(newProduct);
  }

  res.status(405).json({ error: "Method not allowed" });
}
