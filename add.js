// addProduct.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load local .env file
dotenv.config();

// Supabase client using Service Role Key
const supabaseUrl = 'https://jfrqimyghqdwsyiibifl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcnFpbXlnaHFkd3N5aWliaWZsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjYyOTY4MiwiZXhwIjoyMDg4MjA1NjgyfQ.mA2fd6ntpUfKwy-gvji2lmC1BeCh3P6eys3DT6NZ3PI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addProduct() {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
            id: "test-uuid",
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
          seller_email: "you@example.com"
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return;
    }

    console.log("Inserted product:", data);
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

addProduct();