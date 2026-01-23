import { VercelRequest, VercelResponse } from "@vercel/node";
import { getProductById, updateProduct, deleteProduct } from "../../server/routes/products";

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

  // Convert Vercel req/res to Express-like format
  const expressReq = {
    params: { id: req.query.id as string },
    body: req.body,
  };

  if (req.method === "GET") {
    return getProductById(expressReq as any, res as any);
  }

  if (req.method === "PUT") {
    return updateProduct(expressReq as any, res as any);
  }

  if (req.method === "DELETE") {
    return deleteProduct(expressReq as any, res as any);
  }

  res.status(405).json({ error: "Method not allowed" });
}
