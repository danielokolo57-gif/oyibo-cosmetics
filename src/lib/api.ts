// Shared API types
export interface StoreSettings {
  website_name: string;
  phone_number: string;
  email: string;
  location: string;
  country: string;
  currency: string;
}

export interface SiteSettings {
  branding: {
    logo_url: string;
    primary_color: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta_text: string;
    overlay: boolean;
    overlay_opacity: number;
  };
  about: {
    enabled: boolean;
    content: string;
  };
  store: {
    currency: string;
    delivery_fee: number;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    social_links: {
      facebook: string;
      instagram: string;
      twitter: string;
      tiktok: string;
    };
  };
  footer: {
    footer_text: string;
    copyright_text: string;
  };
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  image_url?: string;
  description?: string;
  category?: string;
  in_stock?: boolean;
  isDemo?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

const PROJECT_ID = "website-3-5701";
const BASE_URL = "https://ctzluwfqilwgelexslco.supabase.co/functions/v1";

export async function fetchStoreData(): Promise<{ store: StoreSettings; products: Product[] }> {
  const response = await fetch(`${BASE_URL}/products-api?project_id=${PROJECT_ID}`);
  if (!response.ok) throw new Error("Products API failed");
  const json = await response.json();
  return {
    store: {
      website_name: json.project?.website_name || "",
      phone_number: json.project?.phone_number || "",
      email: json.project?.email || "",
      location: json.project?.location || "",
      country: json.project?.country || "",
      currency: json.project?.currency || "USD",
    },
    products: json.data || [],
  };
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const response = await fetch(`${BASE_URL}/settings-api?project_id=${PROJECT_ID}`);
  if (!response.ok) throw new Error("Settings API failed");
  const json = await response.json();
  return json.settings as SiteSettings;
}

export function getCurrencySymbol(currency: string): string {
  const map: Record<string, string> = {
    NGN: "₦", USD: "$", EUR: "€", GBP: "£", GHS: "GH₵",
    KES: "KSh", ZAR: "R", CAD: "C$", AUD: "A$",
  };
  return map[currency?.toUpperCase()] || currency || "$";
}

// Cart helpers
export const CART_KEY = "luxe_cart";

export function getCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch { return []; }
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product: Product): CartItem[] {
  const cart = getCart();
  const idx = cart.findIndex((i) => i.id === product.id);
  if (idx > -1) {
    cart[idx].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(id: string | number): CartItem[] {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
  return cart;
}

export function updateQuantity(id: string | number, delta: number): CartItem[] {
  const cart = getCart().map((i) =>
    i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
  );
  saveCart(cart);
  return cart;
}
