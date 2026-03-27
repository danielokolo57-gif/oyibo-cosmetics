import { useState, useEffect, useCallback } from "react";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import ProductDetail from "@/components/ProductDetail";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import {
  fetchStoreData, fetchSiteSettings,
  getCart, addToCart, removeFromCart, updateQuantity,
  type StoreSettings, type SiteSettings, type Product, type CartItem,
} from "@/lib/api";

interface AppData {
  store: StoreSettings;
  site: SiteSettings | null;
  products: Product[];
}

const DEFAULT_STORE: StoreSettings = {
  website_name: "",
  phone_number: "",
  email: "",
  location: "",
  country: "",
  currency: "NGN",
};

export default function Index() {
  const [data, setData] = useState<AppData>({ store: DEFAULT_STORE, site: null, products: [] });
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>(getCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Fetch all data
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [storeData, siteSettings] = await Promise.allSettled([
          fetchStoreData(),
          fetchSiteSettings(),
        ]);

        if (!mounted) return;

        const store = storeData.status === "fulfilled" ? storeData.value.store : DEFAULT_STORE;
        const products = storeData.status === "fulfilled" ? storeData.value.products : [];
        const site = siteSettings.status === "fulfilled" ? siteSettings.value : null;

        setData({ store, site, products });
      } catch {
        // Silent fallback — page never blanks
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleAddToCart = useCallback((product: Product) => {
    const updated = addToCart(product);
    setCart(updated);
    setToast(`${product.name} added to cart`);
  }, []);

  const handleCartAdd = useCallback((id: string | number) => {
    const updated = updateQuantity(id, 1);
    setCart(updated);
  }, []);

  const handleCartRemove = useCallback((id: string | number) => {
    const updated = updateQuantity(id, -1);
    setCart(updated);
  }, []);

  const handleCartDelete = useCallback((id: string | number) => {
    const updated = removeFromCart(id);
    setCart(updated);
  }, []);

  const { store, site, products } = data;
  const currency = store.currency || site?.store?.currency || "NGN";
  const whatsapp = site?.contact?.whatsapp || store.phone_number || "";
  const storeName = store.website_name || "";
  const aboutContent = site?.about?.content || "";
  const socialLinks = site?.contact?.social_links;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(var(--background))" }}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="font-display text-3xl" style={{ color: "hsl(var(--primary))" }}>
            Loading…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      <Navbar
        storeName={storeName}
        cartItems={cart}
        onCartOpen={() => setCartOpen(true)}
      />

      <Hero
        storeName={storeName}
        onShopNow={() => document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" })}
      />

      <Products
        apiProducts={products}
        currency={currency}
        onAddToCart={handleAddToCart}
        onProductClick={(p) => setSelectedProduct(p)}
      />

      <About
        storeName={storeName}
        aboutContent={aboutContent}
        country={store.country}
        location={store.location}
      />

      <Contact
        email={store.email}
        phone={store.phone_number}
        whatsapp={whatsapp}
        location={store.location}
        country={store.country}
        storeName={storeName}
      />

      <Footer
        storeName={storeName}
        email={store.email}
        phone={store.phone_number}
        location={store.location}
        country={store.country}
        socialLinks={socialLinks}
      />

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          currency={currency}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p) => { handleAddToCart(p); setSelectedProduct(null); }}
        />
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        currency={currency}
        whatsapp={whatsapp}
        phone={store.phone_number}
        storeName={storeName}
        onAdd={handleCartAdd}
        onRemove={handleCartRemove}
        onDelete={handleCartDelete}
      />

      {/* Toast notification */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-full shadow-2xl animate-fade-in"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
        >
          <CheckCircle size={16} />
          <span className="font-body text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
}
