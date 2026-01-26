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
let products: Product[] = [
  {
    id: "1",
    name: "Modern Sofa",
    price: 129.99,
    rating: 4.5,
    reviews: 320,
    seller: "FurniturePro",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    category: "Home",
    description: "Comfortable modern sofa for living rooms",
    stock: 15,
  },
  {
    id: "2",
    name: "Wooden Dining Table",
    price: 299.99,
    rating: 4.8,
    reviews: 150,
    seller: "WoodWorks",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
    category: "Home",
    description: "Premium wooden dining table",
    stock: 8,
  },
  {
    id: "3",
    name: "Office Chair Pro",
    price: 199.99,
    rating: 4.7,
    reviews: 450,
    seller: "OfficeHub",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=300&fit=crop",
    category: "Home",
    description: "Ergonomic office chair",
    stock: 20,
  },
];

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
