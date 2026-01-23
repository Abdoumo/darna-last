import { VercelRequest, VercelResponse } from "@vercel/node";
import { getProducts, createProduct } from "../../server/routes/products";

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

  if (req.method === "GET") {
    return getProducts(req, res);
  }

  if (req.method === "POST") {
    return createProduct(req, res);
  }

  res.status(405).json({ error: "Method not allowed" });
}
