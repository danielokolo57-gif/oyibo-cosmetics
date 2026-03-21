import { useReveal } from "@/hooks/useReveal";
import hero5 from "@/assets/hero5.jpg";

interface AboutProps {
  storeName: string;
  aboutContent: string;
  country: string;
  location: string;
}

const FEATURES = [
  { icon: "✦", title: "Premium Quality", desc: "Every product is carefully selected for its quality and efficacy." },
  { icon: "✦", title: "Natural Ingredients", desc: "Formulated with botanical extracts and skin-loving actives." },
  { icon: "✦", title: "Cruelty Free", desc: "We are committed to ethical, cruelty-free beauty." },
];

export default function About({ storeName, aboutContent, country, location }: AboutProps) {
  const leftRef = useReveal();
  const rightRef = useReveal();

  const defaultContent = storeName
    ? `At ${storeName}, we are dedicated to providing premium cosmetic products that enhance natural beauty. Founded with a passion for quality and elegance, we curate only the finest skincare, makeup, and wellness products to help you look and feel your absolute best.`
    : "";

  const body = aboutContent && aboutContent.trim() !== ""
    ? aboutContent.replace(/\[STORE NAME\]/gi, storeName)
    : defaultContent;

  return (
    <section id="about" className="py-24 px-4 overflow-hidden" style={{ background: "hsl(var(--secondary))" }}>
      <div className="container max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — image */}
          <div ref={leftRef} className="reveal relative">
            <div className="relative rounded-2xl overflow-hidden" style={{ paddingBottom: "115%" }}>
              <img
                src={hero5}
                alt="About our beauty brand"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, hsl(var(--overlay-dark) / 0.4) 0%, transparent 60%)" }}
              />
            </div>
            {/* Badge */}
            <div
              className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full flex flex-col items-center justify-center text-center shadow-xl"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
            >
              <span className="font-display text-2xl leading-none">10+</span>
              <span className="font-body text-[10px] tracking-wider uppercase mt-1">Years of<br/>Beauty</span>
            </div>
          </div>

          {/* Right — text */}
          <div ref={rightRef} className="reveal">
            <p className="tracking-luxury text-xs uppercase font-body font-medium mb-4" style={{ color: "hsl(var(--gold))" }}>
              About Us
            </p>
            <h2 className="font-display text-4xl md:text-5xl mb-2" style={{ color: "hsl(var(--foreground))" }}>
              The Story Behind
            </h2>
            <h2 className="font-display text-4xl md:text-5xl mb-6 italic" style={{ color: "hsl(var(--primary))" }}>
              {storeName || "Our Brand"}
            </h2>
            <span className="gold-divider" style={{ marginLeft: 0 }} />

            <p className="font-body text-base leading-relaxed mt-6 mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
              {body || <span className="italic opacity-50">Loading brand story…</span>}
            </p>

            {location && country && (
              <p className="font-body text-sm mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
                📍 Proudly based in <strong style={{ color: "hsl(var(--foreground))" }}>{location}, {country}</strong>
              </p>
            )}

            {/* Feature pills */}
            <div className="flex flex-col gap-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <span style={{ color: "hsl(var(--gold))", fontSize: "10px", marginTop: "4px" }}>{f.icon}</span>
                  <div>
                    <p className="font-body font-semibold text-sm mb-0.5" style={{ color: "hsl(var(--foreground))" }}>{f.title}</p>
                    <p className="font-body text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
