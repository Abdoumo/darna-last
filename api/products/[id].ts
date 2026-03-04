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

  const id = req.query.id as string;

  if (req.method === "GET") {
    const product = products.find((p) => p.id === id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(product);
  }

  if (req.method === "PUT") {
    const { name, price, category, seller, image, description, stock } = req.body;

    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedProduct: Product = {
      ...products[productIndex],
      name: name || products[productIndex].name,
      price: price !== undefined ? price : products[productIndex].price,
      category: category || products[productIndex].category,
      seller: seller || products[productIndex].seller,
      image: image || products[productIndex].image,
      description: description !== undefined ? description : products[productIndex].description,
      stock: stock !== undefined ? stock : products[productIndex].stock,
    };

    products[productIndex] = updatedProduct;
    return res.status(200).json(updatedProduct);
  }

  if (req.method === "DELETE") {
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found" });
    }

    const deletedProduct = products[productIndex];
    products = products.filter((p) => p.id !== id);
    return res.status(200).json(deletedProduct);
  }

  res.status(405).json({ error: "Method not allowed" });
}
