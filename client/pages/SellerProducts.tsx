import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, Package, Edit2, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth-context";

type Language = "en" | "ar" | "fr";

interface SellerProductsProps {
  language: Language;
}

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  sellerId: string;
  sellerEmail: string;
  createdAt: string;
  image?: string;
}

export default function SellerProducts({ language }: SellerProductsProps) {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    category: "",
    image: "",
  });

  const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books", "Food", "Other"];
  const categoriesAr = ["إلكترونيات", "ملابس", "البيت والحديقة", "رياضة", "كتب", "طعام", "آخر"];
  const categoriesFr = ["Électronique", "Vêtements", "Maison & Jardin", "Sport", "Livres", "Nourriture", "Autre"];

  const translations = {
    en: {
      title: "My Products",
      subtitle: "Manage your products and inventory",
      addProduct: "Add New Product",
      back: "Back to Dashboard",
      noProducts: "No products yet",
      noProductsDesc: "Create your first product to get started",
      productName: "Product Name",
      price: "Price",
      quantity: "Quantity",
      description: "Description",
      category: "Category",
      save: "Save Product",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      addNewProduct: "Add New Product",
      productNamePlaceholder: "Enter product name",
      pricePlaceholder: "0.00",
      quantityPlaceholder: "0",
      descriptionPlaceholder: "Enter product description",
      deleteConfirm: "Product deleted",
      selectCategory: "Select a category",
      productImage: "Product Image",
      uploadImage: "Upload Image",
      chooseFile: "Choose File",
      editProduct: "Edit Product",
      updateProduct: "Update Product",
    },
    ar: {
      title: "منتجاتي",
      subtitle: "إدارة منتجاتك والمخزون",
      addProduct: "إضافة منتج جديد",
      back: "العودة إلى لوحة التحكم",
      noProducts: "لا توجد منتجات حتى الآن",
      noProductsDesc: "أنشئ منتجك الأول للبدء",
      productName: "اسم المنتج",
      price: "السعر",
      quantity: "الكمية",
      description: "الوصف",
      category: "الفئة",
      save: "حفظ المنتج",
      cancel: "إلغاء",
      edit: "تعديل",
      delete: "حذف",
      addNewProduct: "إضافة منتج جديد",
      productNamePlaceholder: "أدخل اسم المنتج",
      pricePlaceholder: "0.00",
      quantityPlaceholder: "0",
      descriptionPlaceholder: "أدخل وصف المنتج",
      deleteConfirm: "تم حذف المنتج",
      selectCategory: "اختر فئة",
      productImage: "صورة المنتج",
      uploadImage: "تحميل الصورة",
      chooseFile: "اختر ملف",
      editProduct: "تعديل المنتج",
      updateProduct: "تحديث المنتج",
    },
    fr: {
      title: "Mes produits",
      subtitle: "Gérez vos produits et votre inventaire",
      addProduct: "Ajouter un nouveau produit",
      back: "Retour au tableau de bord",
      noProducts: "Aucun produit pour le moment",
      noProductsDesc: "Créez votre premier produit pour commencer",
      productName: "Nom du produit",
      price: "Prix",
      quantity: "Quantité",
      description: "Description",
      category: "Catégorie",
      save: "Enregistrer le produit",
      cancel: "Annuler",
      edit: "Modifier",
      delete: "Supprimer",
      addNewProduct: "Ajouter un nouveau produit",
      productNamePlaceholder: "Entrez le nom du produit",
      pricePlaceholder: "0.00",
      quantityPlaceholder: "0",
      descriptionPlaceholder: "Entrez la description du produit",
      deleteConfirm: "Produit supprimé",
      selectCategory: "Sélectionner une catégorie",
      productImage: "Image du produit",
      uploadImage: "Télécharger une image",
      chooseFile: "Choisir un fichier",
      editProduct: "Modifier le produit",
      updateProduct: "Mettre à jour le produit",
    },
  };

  const getCategoryOptions = () => {
    if (language === "ar") return categoriesAr;
    if (language === "fr") return categoriesFr;
    return categories;
  };

  const t = translations[language];
  const isRtl = language === "ar";

  // Load products from global localStorage (sellers' products)
  useEffect(() => {
    const allProducts = localStorage.getItem("darna-all-products");
    if (allProducts) {
      try {
        const parsedProducts = JSON.parse(allProducts);
        // Filter to show only this seller's products
        const sellerProducts = user
          ? parsedProducts.filter((p: Product) => p.sellerId === user.id)
          : [];
        setProducts(sellerProducts);
      } catch (error) {
        console.error("Failed to parse products:", error);
      }
    }
  }, [user]);

  const saveProductGlobally = (newProduct: Product) => {
    // Load all products
    const allProducts = localStorage.getItem("darna-all-products");
    let products: Product[] = [];
    if (allProducts) {
      try {
        products = JSON.parse(allProducts);
      } catch (error) {
        console.error("Failed to parse products:", error);
      }
    }

    // Add new product
    products.push(newProduct);

    // Save back to global storage
    localStorage.setItem("darna-all-products", JSON.stringify(products));

    // Update local state
    setProducts((prev) => [...prev, newProduct]);

    // Notify shop page of changes
    window.dispatchEvent(new Event("storage-updated"));
  };

  const deleteProductGlobally = (id: string) => {
    // Load all products
    const allProducts = localStorage.getItem("darna-all-products");
    let products: Product[] = [];
    if (allProducts) {
      try {
        products = JSON.parse(allProducts);
      } catch (error) {
        console.error("Failed to parse products:", error);
      }
    }

    // Remove product
    products = products.filter((p) => p.id !== id);

    // Save back to global storage
    localStorage.setItem("darna-all-products", JSON.stringify(products));

    // Update local state
    setProducts((prev) => prev.filter((p) => p.id !== id));

    // Notify shop page of changes
    window.dispatchEvent(new Event("storage-updated"));
  };

  const updateProductGlobally = (updatedProduct: Product) => {
    // Load all products
    const allProducts = localStorage.getItem("darna-all-products");
    let products: Product[] = [];
    if (allProducts) {
      try {
        products = JSON.parse(allProducts);
      } catch (error) {
        console.error("Failed to parse products:", error);
      }
    }

    // Update product
    products = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));

    // Save back to global storage
    localStorage.setItem("darna-all-products", JSON.stringify(products));

    // Update local state
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );

    // Notify shop page of changes
    window.dispatchEvent(new Event("storage-updated"));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.quantity || !formData.category) {
      return;
    }

    if (!user) return;

    if (editingProductId) {
      // Update existing product
      const updatedProduct: Product = {
        id: editingProductId,
        name: formData.name,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        description: formData.description,
        category: formData.category,
        sellerId: user.id,
        sellerEmail: user.email,
        createdAt: products.find((p) => p.id === editingProductId)?.createdAt || new Date().toISOString(),
        image: formData.image || undefined,
      };
      updateProductGlobally(updatedProduct);
    } else {
      // Create new product
      const newProduct: Product = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        description: formData.description,
        category: formData.category,
        sellerId: user.id,
        sellerEmail: user.email,
        createdAt: new Date().toISOString(),
        image: formData.image || undefined,
      };
      saveProductGlobally(newProduct);
    }

    setFormData({
      name: "",
      price: "",
      quantity: "",
      description: "",
      category: "",
      image: "",
    });
    setEditingProductId(null);
    setIsOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    deleteProductGlobally(id);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      description: product.description,
      category: product.category,
      image: product.image || "",
    });
    setIsOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          image: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const ProductForm = () => (
    <form onSubmit={handleAddProduct} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{t.productName}</Label>
        <Input
          id="name"
          placeholder={t.productNamePlaceholder}
          value={formData.name}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, name: e.target.value }));
          }}
          required
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <Label>{t.category}</Label>
        <Select value={formData.category} onValueChange={(value) => {
          setFormData((prev) => ({ ...prev, category: value }));
        }}>
          <SelectTrigger>
            <SelectValue placeholder={t.selectCategory} />
          </SelectTrigger>
          <SelectContent>
            {getCategoryOptions().map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">{t.price}</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            placeholder={t.pricePlaceholder}
            value={formData.price}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, price: e.target.value }));
            }}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">{t.quantity}</Label>
          <Input
            id="quantity"
            type="number"
            placeholder={t.quantityPlaceholder}
            value={formData.quantity}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, quantity: e.target.value }));
            }}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t.description}</Label>
        <Input
          id="description"
          placeholder={t.descriptionPlaceholder}
          value={formData.description}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, description: e.target.value }));
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">{t.productImage}</Label>
        <div className="flex items-center gap-2">
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="flex-1"
          />
        </div>
        {formData.image && (
          <div className="mt-2">
            <img
              src={formData.image}
              alt="Product preview"
              className="w-24 h-24 object-cover rounded-lg border border-border"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(false)}
        >
          {t.cancel}
        </Button>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {editingProductId ? t.updateProduct : t.save}
        </Button>
      </div>
    </form>
  );

  return (
    <div className={`w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 ${isRtl ? "rtl" : "ltr"}`} dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link to="/dashboard/seller">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  {t.back}
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-foreground">{t.title}</h1>
            <p className="text-lg text-muted-foreground">{t.subtitle}</p>
          </div>
          <Button
            onClick={() => {
              setEditingProductId(null);
              setFormData({
                name: "",
                price: "",
                quantity: "",
                description: "",
                category: "",
                image: "",
              });
              setIsOpen(true);
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Plus className="w-4 h-4" />
            {t.addProduct}
          </Button>
        </div>

        {/* Products List or Empty State */}
        {products.length === 0 ? (
          <div className="bg-white rounded-lg border border-border p-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-2xl font-bold text-foreground mb-2">{t.noProducts}</h3>
            <p className="text-muted-foreground mb-6">{t.noProductsDesc}</p>
            <Button
              onClick={() => {
                setEditingProductId(null);
                setFormData({
                  name: "",
                  price: "",
                  quantity: "",
                  description: "",
                  category: "",
                  image: "",
                });
                setIsOpen(true);
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus className="w-4 h-4" />
              {t.addProduct}
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-border p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  {product.image && (
                    <div className="mr-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    <div className="flex gap-6 mb-3">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground">
                          {t.category}
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {product.category}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground">
                          {t.price}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          DZD {product.price.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground">
                          {t.quantity}
                        </p>
                        <p className="text-lg font-bold text-foreground">
                          {product.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Unified Dialog for Add/Edit */}
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setEditingProductId(null);
            setFormData({
              name: "",
              price: "",
              quantity: "",
              description: "",
              category: "",
              image: "",
            });
          }
        }}>
          <DialogContent className={isRtl ? "rtl" : "ltr"} dir={isRtl ? "rtl" : "ltr"}>
            <DialogHeader>
              <DialogTitle>{editingProductId ? t.editProduct : t.addNewProduct}</DialogTitle>
            </DialogHeader>
            <ProductForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
