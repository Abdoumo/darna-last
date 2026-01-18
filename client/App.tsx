import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Sellers from "./pages/Sellers";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import SellerProducts from "./pages/SellerProducts";
import SellerOrders from "./pages/SellerOrders";
import SellerCustomers from "./pages/SellerCustomers";
import SellerAnalytics from "./pages/SellerAnalytics";
import SellerSettings from "./pages/SellerSettings";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Chatbot from "./pages/Chatbot";
import { AuthProvider } from "./lib/auth-context";
import { CartProvider, OrderProvider } from "./lib/cart-context";

type Language = "en" | "ar" | "fr";

const queryClient = new QueryClient();

const AppContent = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("darna-language");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("darna-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <Routes>
      {/* Pages with layout */}
      <Route
        path="/"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <Index language={language} />
          </Layout>
        }
      />
      <Route
        path="/shop"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <Shop language={language} />
          </Layout>
        }
      />
      <Route
        path="/product/:id"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <ProductDetail language={language} />
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <Cart language={language} />
          </Layout>
        }
      />
      <Route
        path="/checkout"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <Checkout language={language} />
          </Layout>
        }
      />
      <Route
        path="/order-confirmation/:orderId"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <OrderConfirmation language={language} />
          </Layout>
        }
      />
      <Route
        path="/chatbot"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <Chatbot language={language} />
          </Layout>
        }
      />
      <Route
        path="/sellers"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <Sellers language={language} />
          </Layout>
        }
      />

      {/* Auth pages (without main layout header/footer) */}
      <Route
        path="/signin"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <SignIn language={language} />
          </Layout>
        }
      />
      <Route
        path="/signup"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <SignUp language={language} />
          </Layout>
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard/:role"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <Dashboard language={language} />
          </Layout>
        }
      />

      {/* Seller Routes */}
      <Route
        path="/seller/products"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <SellerProducts language={language} />
          </Layout>
        }
      />
      <Route
        path="/seller/orders"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <SellerOrders language={language} />
          </Layout>
        }
      />
      <Route
        path="/seller/customers"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <SellerCustomers language={language} />
          </Layout>
        }
      />
      <Route
        path="/seller/analytics"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <SellerAnalytics language={language} />
          </Layout>
        }
      />
      <Route
        path="/seller/settings"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <SellerSettings language={language} />
          </Layout>
        }
      />

      {/* 404 Page */}
      <Route
        path="*"
        element={
          <Layout
            language={language}
            onLanguageChange={handleLanguageChange}
          >
            <NotFound language={language} />
          </Layout>
        }
      />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <AppContent />
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
