import { Instagram, Facebook, Twitter } from "lucide-react";

interface FooterProps {
  storeName: string;
  email: string;
  phone: string;
  location: string;
  country: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
  };
}

export default function Footer({ storeName, email, phone, location, country, socialLinks }: FooterProps) {
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="py-16 px-4"
      style={{ background: "hsl(var(--overlay-dark))", color: "hsl(var(--primary-foreground) / 0.8)" }}
    >
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-3xl mb-4" style={{ color: "hsl(var(--primary-foreground))" }}>
              {storeName || "Loading…"}
            </h3>
            <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "hsl(var(--primary-foreground) / 0.65)" }}>
              Premium beauty products curated to enhance your natural radiance.
              {location && country ? ` Based in ${location}, ${country}.` : ""}
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: <Instagram size={16} />, href: socialLinks?.instagram },
                { icon: <Facebook size={16} />, href: socialLinks?.facebook },
                { icon: <Twitter size={16} />, href: socialLinks?.twitter },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                  style={{ background: "hsl(var(--primary-foreground) / 0.1)", color: "hsl(var(--primary-foreground) / 0.7)" }}
                  onClick={!s.href ? (e) => e.preventDefault() : undefined}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body font-semibold text-sm tracking-luxury uppercase mb-5" style={{ color: "hsl(var(--gold))" }}>
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Home", href: "#home" },
                { label: "Products", href: "#products" },
                { label: "About Us", href: "#about" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="font-body text-sm hover:text-[hsl(var(--gold))] transition-colors duration-200"
                    style={{ color: "hsl(var(--primary-foreground) / 0.65)" }}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-sm tracking-luxury uppercase mb-5" style={{ color: "hsl(var(--gold))" }}>
              Contact Info
            </h4>
            <ul className="flex flex-col gap-3">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="font-body text-sm hover:text-[hsl(var(--gold))] transition-colors" style={{ color: "hsl(var(--primary-foreground) / 0.65)" }}>
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone}`} className="font-body text-sm hover:text-[hsl(var(--gold))] transition-colors" style={{ color: "hsl(var(--primary-foreground) / 0.65)" }}>
                    {phone}
                  </a>
                </li>
              )}
              {(location || country) && (
                <li className="font-body text-sm" style={{ color: "hsl(var(--primary-foreground) / 0.65)" }}>
                  {[location, country].filter(Boolean).join(", ")}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div
          className="pt-8 border-t text-center"
          style={{ borderColor: "hsl(var(--primary-foreground) / 0.1)" }}
        >
          <p className="font-body text-xs" style={{ color: "hsl(var(--primary-foreground) / 0.4)" }}>
            © {year} {storeName || "Premium Beauty"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
