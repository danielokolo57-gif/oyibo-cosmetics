import { X, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { CartItem, getCurrencySymbol } from "@/lib/api";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: string;
  whatsapp: string;
  phone: string;
  storeName: string;
  onAdd: (id: string | number) => void;
  onRemove: (id: string | number) => void;
  onDelete: (id: string | number) => void;
}

export default function CartDrawer({
  open, onClose, items, currency, whatsapp, phone, storeName,
  onAdd, onRemove, onDelete,
}: CartDrawerProps) {
  const symbol = getCurrencySymbol(currency);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const waNumber = (whatsapp || phone || "").replace(/\D/g, "");

  const handleOrder = () => {
    if (!waNumber) {
      alert("WhatsApp number not configured yet.");
      return;
    }
    const lines = items.map(
      (i) => `• ${i.name} x${i.quantity} — ${symbol}${(i.price * i.quantity).toLocaleString()}`
    ).join("\n");
    const msg = `Hello ${storeName || "there"}, I want to order:\n\n${lines}\n\n*Total: ${symbol}${total.toLocaleString()}*`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-400 bg-black/40 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] flex flex-col transition-transform duration-500 cubic-bezier(0.16,1,0.3,1) ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ background: "hsl(var(--card))" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-display text-2xl" style={{ color: "hsl(var(--foreground))" }}>
            Your Cart
            {items.length > 0 && (
              <span className="ml-2 font-body text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                ({items.reduce((a, i) => a + i.quantity, 0)} items)
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
            style={{ background: "hsl(var(--secondary))" }}
          >
            <X size={18} style={{ color: "hsl(var(--foreground))" }} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                style={{ background: "hsl(var(--secondary))" }}>
                🛒
              </div>
              <p className="font-display text-xl" style={{ color: "hsl(var(--muted-foreground))" }}>
                Your cart is empty
              </p>
              <p className="font-body text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                Add products to get started
              </p>
              <button className="btn-primary mt-2" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => {
                const img = item.image_url || item.image;
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-xl"
                    style={{ background: "hsl(var(--secondary))" }}
                  >
                    {img && (
                      <img
                        src={img}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-body font-medium text-sm leading-tight" style={{ color: "hsl(var(--foreground))" }}>
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onDelete(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="font-display text-base font-medium mt-1" style={{ color: "hsl(var(--primary))" }}>
                        {symbol}{(item.price * item.quantity).toLocaleString()}
                      </p>
                      {/* Qty controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => item.quantity === 1 ? onDelete(item.id) : onRemove(item.id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                          style={{ background: "hsl(var(--border))", color: "hsl(var(--foreground))" }}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-body font-semibold text-sm w-6 text-center" style={{ color: "hsl(var(--foreground))" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onAdd(item.id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="font-body font-medium text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                Total
              </span>
              <span className="font-display text-2xl font-medium" style={{ color: "hsl(var(--primary))" }}>
                {symbol}{total.toLocaleString()}
              </span>
            </div>
            <button
              onClick={handleOrder}
              className="w-full btn-primary justify-center gap-2"
            >
              <MessageCircle size={18} />
              Order via WhatsApp
            </button>
            <p className="text-center text-[10px] font-body mt-3" style={{ color: "hsl(var(--muted-foreground))" }}>
              You'll be redirected to WhatsApp to complete your order
            </p>
          </div>
        )}
      </div>
    </>
  );
}
