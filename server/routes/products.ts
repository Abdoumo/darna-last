import { RequestHandler } from "express";
import { supabase } from "../supabase";

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
  seller_id?: string;
  seller_email?: string;
  createdAt?: string;
  quantity?: number;
}

interface UserInfo {
  id?: string;
  email?: string;
  role?: "admin" | "seller" | "buyer";
}

// Helper to extract user from request headers
function getUserFromRequest(req: any): UserInfo | null {
  try {
    // Check Authorization header for user JSON
    const authHeader = req.headers["x-user"];
    if (authHeader) {
      return JSON.parse(authHeader);
    }
    // Check body for user info
    if (req.body.user) {
      return req.body.user;
    }
    return null;
  } catch (error) {
    return null;
  }
}

// Helper to check if user can create/delete products
function canModifyProducts(user: UserInfo | null): boolean {
  return user?.role === "admin" || user?.role === "seller";
}

// Helper to check if user can modify specific product
function canModifyProduct(user: UserInfo | null, product: Product): boolean {
  if (!user) return false;
  // Admin can modify any product
  if (user.role === "admin") return true;
  // Seller can only modify their own products
  if (user.role === "seller") {
    return user.id === product.seller_id || user.email === product.seller_email;
  }
  return false;
}

export const getProducts: RequestHandler = async (_req, res) => {
  try {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("Supabase error:", error);
      res.status(500).json({ error: "Failed to fetch products" });
      return;
    }

    res.json(data || []);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
};

export const getProductById: RequestHandler = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      console.error("Supabase error:", error);
      res.status(500).json({ error: "Failed to fetch product" });
      return;
    }

    res.json(data);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ error: "Failed to get product" });
  }
};

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9),
      name: "Test Product",
      price: 5,
      category: "Other",
      seller: "You",
      image: "",
      rating: 5,
      reviews: 0,
      description: "This is a test product",
      stock: 10,
      seller_id: "test-id",
      seller_email: "you@example.com",
    };

    const { data, error } = await supabase
      .from("products")
      .insert([newProduct])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      res.status(500).json({ error: "Failed to save product" });
      return;
    }

    res.status(201).json(data);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const user = getUserFromRequest(req);
    const { id } = req.params;
    const { name, price, category, seller, image, description, stock, quantity } = req.body;

    // First, check if product exists
    const { data: existingProduct, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !existingProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // Check if user has permission to update this product
    if (!canModifyProduct(user, existingProduct)) {
      res.status(403).json({ error: "You can only update your own products" });
      return;
    }

    const updatedProduct = {
      name: name !== undefined ? String(name).trim() : existingProduct.name,
      price: price !== undefined ? (typeof price === "string" ? parseFloat(price) : Number(price)) : existingProduct.price,
      category: category !== undefined ? String(category).trim() : existingProduct.category,
      seller: seller !== undefined ? String(seller).trim() : existingProduct.seller,
      image: image !== undefined ? String(image) : existingProduct.image,
      description: description !== undefined ? String(description).trim() : existingProduct.description,
      stock: stock !== undefined ? Number(stock) : existingProduct.stock,
      quantity: quantity !== undefined ? Number(quantity) : existingProduct.quantity,
      seller_id: existingProduct.seller_id,
      seller_email: existingProduct.seller_email,
    };

    const { data, error } = await supabase
      .from("products")
      .update(updatedProduct)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      res.status(500).json({ error: "Failed to update product" });
      return;
    }

    res.json(data);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const user = getUserFromRequest(req);
    const { id } = req.params;

    // First, fetch the product
    const { data: productToDelete, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !productToDelete) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // Check if user has permission to delete this product
    if (!canModifyProduct(user, productToDelete)) {
      res.status(403).json({ error: "You can only delete your own products" });
      return;
    }

    // Delete the product
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Supabase error:", deleteError);
      res.status(500).json({ error: "Failed to delete product" });
      return;
    }

    res.json(productToDelete);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
