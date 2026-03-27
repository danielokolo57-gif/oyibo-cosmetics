import { X, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Product, getCurrencySymbol } from "@/lib/api";
import product1 from "@/assets/product1.jpg";

interface ProductDetailProps {
  product: Product | null;
  currency: string;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetail({ product, currency, onClose, onAddToCart }: ProductDetailProps) {
  if (!product) return null;

  const symbol = getCurrencySymbol(currency);
  const imgSrc = product.image_url || product.image || product1;

  const handleAdd = () => {
    onAddToCart(product);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 opacity-100"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl pointer-events-auto animate-scale-in"
          style={{ background: "hsl(var(--card))" }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
            style={{ background: "hsl(var(--secondary))", color: "hsl(var(--foreground))" }}
          >
            <X size={20} />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
              <img
                src={imgSrc}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = product1; }}
              />
              {product.isDemo && (
                <span
                  className="absolute top-4 left-4 text-[10px] font-body font-semibold px-3 py-1 rounded-full tracking-wide"
                  style={{ background: "hsl(var(--gold))", color: "hsl(var(--charcoal))" }}
                >
                  FEATURED
                </span>
              )}
              {product.in_stock === false && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "hsl(var(--charcoal) / 0.6)" }}
                >
                  <span className="font-display text-2xl" style={{ color: "hsl(var(--primary-foreground))" }}>
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                {/* Category */}
                {product.category && (
                  <p
                    className="tracking-luxury text-[10px] uppercase font-body font-medium mb-2"
                    style={{ color: "hsl(var(--gold))" }}
                  >
                    {product.category}
                  </p>
                )}

                {/* Name */}
                <h2
                  className="font-display text-3xl md:text-4xl leading-tight mb-3"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {product.name}
                </h2>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="hsl(var(--gold))" style={{ color: "hsl(var(--gold))" }} />
                  ))}
                  <span className="text-xs font-body ml-2" style={{ color: "hsl(var(--muted-foreground))" }}>
                    (4.8) · 124 reviews
                  </span>
                </div>

                {/* Price */}
                <p
                  className="font-display text-3xl font-medium mb-6"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {symbol}{Number(product.price).toLocaleString()}
                </p>

                {/* Description */}
                <div className="mb-6">
                  <h3
                    className="font-body font-semibold text-sm uppercase tracking-wider mb-2"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    Description
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {product.description || "A premium beauty product crafted with the finest ingredients to enhance your natural glow. Suitable for all skin types."}
                  </p>
                </div>

                {/* Details grid */}
                <div
                  className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl"
                  style={{ background: "hsl(var(--secondary))" }}
                >
                  <div>
                    <p className="text-[10px] font-body uppercase tracking-wider mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Category
                    </p>
                    <p className="font-body text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>
                      {product.category || "Beauty"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-body uppercase tracking-wider mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Availability
                    </p>
                    <p className="font-body text-sm font-medium" style={{ color: product.in_stock === false ? "hsl(var(--destructive))" : "hsl(16, 85%, 45%)" }}>
                      {product.in_stock === false ? "Out of Stock" : "In Stock"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Add to cart button */}
              <button
                onClick={handleAdd}
                disabled={product.in_stock === false}
                className="btn-primary w-full justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={18} />
                {product.in_stock === false ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
