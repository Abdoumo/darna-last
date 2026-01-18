import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  role: "buyer" | "seller";
  name?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "buyer" | "seller") => void;
  signup: (email: string, password: string, name: string, role: "buyer" | "seller") => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("darna-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("darna-user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string, role: "buyer" | "seller") => {
    // In a real app, this would validate against a server
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("darna-user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const signup = (email: string, password: string, name: string, role: "buyer" | "seller") => {
    // In a real app, this would validate and create account on server
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("darna-user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("darna-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
