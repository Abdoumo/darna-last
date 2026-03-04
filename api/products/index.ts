import { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

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
  sellerId?: string;
  sellerEmail?: string;
  createdAt?: string;
}

export default async function handler(
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

  try {
    if (req.method === "GET") {
      const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        return res.status(200).json([]);
      }
      return res.status(200).json(products || []);
    }

    if (req.method === "POST") {
      const { name, price, category, seller, image, description, stock, sellerId, sellerEmail, quantity } = req.body;

      if (!name || price === undefined || price === null || !category) {
        return res.status(400).json({ error: "Missing required fields: name, price, category" });
      }

      const newProduct = {
        id: `prod_${Date.now()}`,
        name: String(name).trim(),
        price: typeof price === "string" ? parseFloat(price) : Number(price),
        category: String(category).trim(),
        seller: seller ? String(seller).trim() : (sellerEmail ? String(sellerEmail).trim() : "Unknown Seller"),
        image: image ? String(image) : "https://via.placeholder.com/400x300",
        rating: 5,
        reviews: 0,
        description: description ? String(description).trim() : undefined,
        stock: stock !== undefined ? Number(stock) : (quantity !== undefined ? Number(quantity) : 10),
        seller_id: sellerId ? String(sellerId) : undefined,
        seller_email: sellerEmail ? String(sellerEmail) : undefined,
        created_at: new Date().toISOString(),
      };

      const { data: created, error } = await supabase
        .from("products")
        .insert([newProduct])
        .select()
        .single();

      if (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ error: "Failed to create product" });
      }
      return res.status(201).json(created);
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
