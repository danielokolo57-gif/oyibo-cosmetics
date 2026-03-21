import { useState, useEffect, useCallback } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { CartItem } from "@/lib/api";

interface NavbarProps {
  storeName: string;
  cartItems: CartItem[];
  onCartOpen: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ storeName, cartItems, onCartOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
            className="font-display text-2xl font-light tracking-widest transition-colors duration-200"
            style={{ color: scrolled ? "hsl(var(--primary))" : "hsl(var(--primary-foreground))" }}
          >
            {storeName || "Loading…"}
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="nav-link"
                  style={{ color: scrolled ? "hsl(var(--foreground))" : "hsl(var(--primary-foreground) / 0.9)" }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Cart + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onCartOpen}
              className="relative p-2 transition-transform duration-200 hover:scale-110 active:scale-95"
              aria-label="Open cart"
            >
              <ShoppingBag
                size={22}
                style={{ color: scrolled ? "hsl(var(--foreground))" : "hsl(var(--primary-foreground))" }}
              />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>
            <button
              className="md:hidden p-2 transition-transform active:scale-95"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X size={22} style={{ color: scrolled ? "hsl(var(--foreground))" : "hsl(var(--primary-foreground))" }} />
              ) : (
                <Menu size={22} style={{ color: scrolled ? "hsl(var(--foreground))" : "hsl(var(--primary-foreground))" }} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-card transition-all duration-400 flex flex-col items-center justify-center gap-10 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          className="absolute top-5 right-5 p-2"
          onClick={() => setMenuOpen(false)}
        >
          <X size={28} className="text-foreground" />
        </button>
        <span className="font-display text-3xl text-primary tracking-widest">{storeName}</span>
        {NAV_LINKS.map((link, i) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="font-display text-2xl tracking-widest text-foreground hover:text-primary transition-colors"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
}
