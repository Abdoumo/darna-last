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

  const id = req.query.id as string;

  try {
    if (req.method === "GET") {
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.status(200).json(product);
    }

    if (req.method === "PUT") {
      const { name, price, category, seller, image, description, stock } = req.body;

      const { data: updated, error } = await supabase
        .from("products")
        .update({
          name: name || undefined,
          price: price !== undefined ? price : undefined,
          category: category || undefined,
          seller: seller || undefined,
          image: image || undefined,
          description: description !== undefined ? description : undefined,
          stock: stock !== undefined ? stock : undefined,
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      const { data: deleted, error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.status(200).json(deleted);
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
