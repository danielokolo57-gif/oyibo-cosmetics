import { ShoppingCart, Star } from "lucide-react";
import { Product, getCurrencySymbol } from "@/lib/api";
import { useReveal } from "@/hooks/useReveal";
import product1 from "@/assets/product1.jpg";
import product2 from "@/assets/product2.jpg";
import product3 from "@/assets/product3.jpg";
import product4 from "@/assets/product4.jpg";
import product5 from "@/assets/product5.jpg";

const DEMO_PRODUCTS: Product[] = [
  { id: "demo-1", name: "Rose Water Skincare Set", price: 12500, image: product1, description: "Complete 4-piece routine", category: "Skincare", isDemo: true },
  { id: "demo-2", name: "Luxury Lip Collection", price: 8900, image: product2, description: "4-shade velvet finish", category: "Makeup", isDemo: true },
  { id: "demo-3", name: "Vitamin C Glow Serum", price: 15000, image: product3, description: "Anti-aging formula", category: "Skincare", isDemo: true },
  { id: "demo-4", name: "Rose Gold Eye Palette", price: 19500, image: product4, description: "5 warm bronze shades", category: "Makeup", isDemo: true },
  { id: "demo-5", name: "Premium Body Lotion", price: 7500, image: product5, description: "Rose & jasmine scent", category: "Body", isDemo: true },
];

interface ProductsProps {
  apiProducts: Product[];
  currency: string;
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, currency, onAddToCart }: { product: Product; currency: string; onAddToCart: (p: Product) => void }) {
  const symbol = getCurrencySymbol(currency);
  const imgSrc = product.image_url || product.image || product1;

  return (
    <div className="product-card group">
      {/* Image */}
      <div className="relative overflow-hidden bg-secondary" style={{ paddingBottom: "100%" }}>
        <img
          src={imgSrc}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = product1; }}
        />
        {product.isDemo && (
          <span className="absolute top-3 left-3 text-[10px] font-body font-semibold px-2 py-1 rounded-full tracking-wide"
            style={{ background: "hsl(var(--gold))", color: "hsl(var(--charcoal))" }}>
            FEATURED
          </span>
        )}
        {/* Quick add overlay */}
        <button
          onClick={() => onAddToCart(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] py-2.5 text-xs font-body font-semibold tracking-widest uppercase rounded-full opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
        >
          Quick Add
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        {product.category && (
          <p className="text-[10px] tracking-luxury uppercase font-body mb-1" style={{ color: "hsl(var(--gold))" }}>
            {product.category}
          </p>
        )}
        <h3 className="font-display text-lg leading-tight mb-1" style={{ color: "hsl(var(--foreground))" }}>
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs font-body mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
            {product.description}
          </p>
        )}
        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11} fill="hsl(var(--gold))" style={{ color: "hsl(var(--gold))" }} />
          ))}
          <span className="text-[10px] font-body ml-1" style={{ color: "hsl(var(--muted-foreground))" }}>(4.8)</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-medium" style={{ color: "hsl(var(--primary))" }}>
            {symbol}{Number(product.price).toLocaleString()}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="p-2.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ background: "hsl(var(--secondary))", color: "hsl(var(--primary))" }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products({ apiProducts, currency, onAddToCart }: ProductsProps) {
  const titleRef = useReveal();

  const displayProducts: Product[] =
    apiProducts.length >= 7 ? apiProducts : [...DEMO_PRODUCTS, ...apiProducts];

  return (
    <section id="products" className="py-24 px-4" style={{ background: "hsl(var(--background))" }}>
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="reveal text-center mb-16">
          <p className="tracking-luxury text-xs uppercase font-body font-medium mb-3" style={{ color: "hsl(var(--gold))" }}>
            Our Collection
          </p>
          <h2 className="font-display text-5xl md:text-6xl mb-4" style={{ color: "hsl(var(--foreground))" }}>
            Curated for You
          </h2>
          <span className="gold-divider" />
          <p className="max-w-md mx-auto text-base font-body mt-4" style={{ color: "hsl(var(--muted-foreground))" }}>
            Premium beauty essentials crafted to enhance your natural radiance
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayProducts.map((product, i) => {
            const ref = useRevealDelay(i);
            return (
              <div
                key={product.id}
                ref={ref}
                className="reveal"
                style={{ transitionDelay: `${(i % 4) * 80}ms` }}
              >
                <ProductCard product={product} currency={currency} onAddToCart={onAddToCart} />
              </div>
            );
          })}
        </div>

        {displayProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
              Products coming soon…
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Helper hook for staggered reveal (non-conditional usage workaround)
function useRevealDelay(i: number) {
  return useReveal();
}
