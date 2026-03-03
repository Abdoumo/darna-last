import { RequestHandler } from "express";
import * as fs from "fs";
import * as path from "path";

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
  quantity?: number;
}

const PRODUCTS_FILE = path.join(process.cwd(), "products.json");

// Helper functions to read/write products from JSON file
function readProducts(): Product[] {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const data = fs.readFileSync(PRODUCTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading products file:", error);
  }
  return [];
}

function writeProducts(products: Product[]): void {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing products file:", error);
  }
}

export const getProducts: RequestHandler = (_req, res) => {
  const products = readProducts();
  res.json(products);
};

export const getProductById: RequestHandler = (req, res) => {
  const products = readProducts();
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(product);
};

export const createProduct: RequestHandler = (req, res) => {
  const { name, price, category, seller, image, description, stock, sellerId, sellerEmail, quantity } = req.body;

  if (!name || !price || !category) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const products = readProducts();
  const newProduct: Product = {
    id: Math.random().toString(36).substr(2, 9),
    name,
    price: parseFloat(price),
    category,
    seller: seller || "Unknown Seller",
    image: image || "https://via.placeholder.com/400x300",
    rating: 5,
    reviews: 0,
    description,
    stock: stock || quantity || 10,
    sellerId,
    sellerEmail,
    createdAt: new Date().toISOString(),
    quantity: quantity || stock || 10,
  };

  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
};

export const updateProduct: RequestHandler = (req, res) => {
  const { id } = req.params;
  const { name, price, category, seller, image, description, stock, quantity } = req.body;

  const products = readProducts();
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex === -1) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const updatedProduct: Product = {
    ...products[productIndex],
    name: name || products[productIndex].name,
    price: price !== undefined ? parseFloat(price) : products[productIndex].price,
    category: category || products[productIndex].category,
    seller: seller || products[productIndex].seller,
    image: image || products[productIndex].image,
    description: description !== undefined ? description : products[productIndex].description,
    stock: stock !== undefined ? stock : products[productIndex].stock,
    quantity: quantity !== undefined ? quantity : products[productIndex].quantity,
  };

  products[productIndex] = updatedProduct;
  writeProducts(products);
  res.json(updatedProduct);
};

export const deleteProduct: RequestHandler = (req, res) => {
  const { id } = req.params;
  const products = readProducts();
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const deletedProduct = products[productIndex];
  const updatedProducts = products.filter((p) => p.id !== id);
  writeProducts(updatedProducts);
  res.json(deletedProduct);
};
