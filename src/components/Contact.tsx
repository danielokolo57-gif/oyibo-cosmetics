import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

interface ContactProps {
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  country: string;
  storeName: string;
}

export default function Contact({ email, phone, whatsapp, location, country, storeName }: ContactProps) {
  const titleRef = useReveal();
  const cardsRef = useReveal();

  const waNumber = (whatsapp || phone || "").replace(/\D/g, "");
  const waMessage = encodeURIComponent(`Hello ${storeName}, I would like to get more information about your products.`);
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  const CARDS = [
    {
      icon: <Mail size={22} />,
      label: "Email Us",
      value: email || "—",
      href: email ? `mailto:${email}` : undefined,
    },
    {
      icon: <Phone size={22} />,
      label: "Call Us",
      value: phone || "—",
      href: phone ? `tel:${phone}` : undefined,
    },
    {
      icon: <MapPin size={22} />,
      label: "Location",
      value: [location, country].filter(Boolean).join(", ") || "—",
      href: undefined,
    },
    {
      icon: <MessageCircle size={22} />,
      label: "WhatsApp",
      value: whatsapp || phone || "—",
      href: waNumber ? waLink : undefined,
    },
  ];

  return (
    <section id="contact" className="py-24 px-4" style={{ background: "hsl(var(--background))" }}>
      <div className="container max-w-5xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="reveal text-center mb-16">
          <p className="tracking-luxury text-xs uppercase font-body font-medium mb-3" style={{ color: "hsl(var(--gold))" }}>
            Get in Touch
          </p>
          <h2 className="font-display text-5xl md:text-6xl mb-4" style={{ color: "hsl(var(--foreground))" }}>
            Contact Us
          </h2>
          <span className="gold-divider" />
          <p className="max-w-md mx-auto text-base font-body mt-4" style={{ color: "hsl(var(--muted-foreground))" }}>
            We'd love to hear from you. Reach out through any channel below.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="reveal grid grid-cols-2 md:grid-cols-4 gap-4">
          {CARDS.map((card) => (
            <div key={card.label}>
              {card.href ? (
                <a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
                  style={{ background: "hsl(var(--secondary))", boxShadow: "0 2px 12px hsl(var(--primary) / 0.04)" }}
                >
                  <span className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors duration-300"
                    style={{ background: "hsl(var(--rose-light))", color: "hsl(var(--primary))" }}>
                    {card.icon}
                  </span>
                  <p className="font-body font-semibold text-xs tracking-wide uppercase mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {card.label}
                  </p>
                  <p className="font-body text-sm font-medium break-all" style={{ color: "hsl(var(--foreground))" }}>
                    {card.value}
                  </p>
                </a>
              ) : (
                <div
                  className="flex flex-col items-center text-center p-6 rounded-2xl"
                  style={{ background: "hsl(var(--secondary))" }}
                >
                  <span className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{ background: "hsl(var(--rose-light))", color: "hsl(var(--primary))" }}>
                    {card.icon}
                  </span>
                  <p className="font-body font-semibold text-xs tracking-wide uppercase mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {card.label}
                  </p>
                  <p className="font-body text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>
                    {card.value}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        {waNumber && (
          <div className="mt-12 text-center reveal" style={{ transitionDelay: "200ms" }}>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
