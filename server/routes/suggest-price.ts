import { GoogleGenerativeAI } from "@google/generative-ai";
import { RequestHandler } from "express";

// Fallback pricing for common categories in Algerian market (DZD)
const categoryBasePrices: { [key: string]: number } = {
  electronics: 15000,
  clothing: 3000,
  "home & garden": 25000,
  furniture: 45000,
  sofa: 50000,
  sports: 8000,
  books: 1500,
  food: 2000,
  other: 5000,
};

export const suggestPrice: RequestHandler = async (req, res) => {
  const { name, description, category } = req.body;

  if (!name || !category) {
    res.status(400).json({ error: "Product name and category are required" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Try to use Gemini API
  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

      const prompt = `You are a pricing expert for e-commerce products. Based on the following product information, suggest a reasonable market price in DZD (Algerian Dinar).

Product Name: ${name}
Category: ${category}
Description: ${description || "No description provided"}

Provide only a single number representing the suggested price in DZD. Do not include any text, currency symbols, or explanations. Just the price as a decimal number.`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();

      // Parse the price from the response
      const suggestedPrice = parseFloat(responseText);

      if (!isNaN(suggestedPrice) && suggestedPrice > 0) {
        res.json({ suggestedPrice });
        return;
      }
    } catch (error) {
      console.error("Error with Gemini API:", error);
      // Fall through to fallback pricing
    }
  }

  // Fallback: Use intelligent pricing based on category and product name
  let basePrice = categoryBasePrices[category.toLowerCase()] ||
                  categoryBasePrices[name.toLowerCase().split(' ').pop() || ''] ||
                  5000;

  // Adjust price based on quality indicators in product name
  const lowerName = name.toLowerCase();
  let qualityMultiplier = 1;

  // Check for premium keywords
  if (lowerName.includes("premium") || lowerName.includes("luxury") || lowerName.includes("deluxe")) {
    qualityMultiplier = 1.5;
  } else if (lowerName.includes("modern") || lowerName.includes("designer") || lowerName.includes("professional")) {
    qualityMultiplier = 1.3;
  } else if (lowerName.includes("basic") || lowerName.includes("standard")) {
    qualityMultiplier = 0.8;
  }

  // Add slight randomness (±10%)
  const randomFactor = 0.9 + Math.random() * 0.2;

  // Calculate final price
  const suggestedPrice = Math.round(basePrice * qualityMultiplier * randomFactor);

  res.json({
    suggestedPrice,
    note: "Using Algerian market pricing"
  });
};
