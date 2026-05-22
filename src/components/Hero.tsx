import { ArrowRight, Leaf, ShieldCheck, Heart } from "lucide-react";
import heroMain from "@/assets/hero-main.jpg";

interface HeroProps {
  storeName: string;
  onShopNow: () => void;
}

export default function Hero({ storeName, onShopNow }: HeroProps) {
  return (
    <section
      id="home"
      className="relative pt-24 pb-12 md:pt-28 md:pb-20 overflow-hidden"
      style={{ background: "hsl(350 60% 94%)" }}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[520px]">
          {/* Left content */}
          <div className="relative z-10 text-center md:text-left order-2 md:order-1">
            <p
              className="tracking-luxury text-xs uppercase font-body font-semibold mb-5"
              style={{ color: "hsl(var(--primary))" }}
            >
              New Collection
            </p>
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl mb-6"
              style={{ color: "hsl(var(--charcoal))", lineHeight: 1.05 }}
            >
              Reveal Your{" "}
              <span style={{ color: "hsl(var(--primary))" }}>Natural</span>{" "}
              Glow
            </h1>
            <p
              className="max-w-md mx-auto md:mx-0 text-base md:text-lg font-body font-light mb-8 leading-relaxed"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {storeName ? `Discover ${storeName}'s` : "Discover"} skincare that enhances your natural beauty. Gentle, effective, and made for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start mb-10">
              <button
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-medium text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: "hsl(var(--charcoal))", color: "hsl(var(--ivory))" }}
                onClick={onShopNow}
              >
                Shop Now <ArrowRight size={16} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 sm:gap-7">
              {[
                { icon: Leaf, title: "Natural Ingredients", sub: "Safe & Organic" },
                { icon: ShieldCheck, title: "Dermatologist Tested", sub: "Clinically Proven" },
                { icon: Heart, title: "Cruelty Free", sub: "Loves Animals" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "hsl(var(--ivory))" }}
                  >
                    <b.icon size={18} style={{ color: "hsl(var(--primary))" }} />
                  </div>
                  <div className="text-left">
                    <p className="font-body text-xs font-semibold" style={{ color: "hsl(var(--charcoal))" }}>
                      {b.title}
                    </p>
                    <p className="font-body text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {b.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="relative order-1 md:order-2">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[5/6]">
              <img
                src={heroMain}
                alt="Premium skincare collection"
                className="absolute inset-0 w-full h-full object-cover"
                width={1600}
                height={1024}
              />
            </div>

            {/* Badge */}
            <div
              className="absolute top-4 right-4 md:top-6 md:-right-4 w-24 h-24 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center text-center shadow-xl animate-pulse"
              style={{ background: "hsl(var(--ivory))", animationDuration: "3s" }}
            >
              <p className="font-display text-lg md:text-xl font-semibold leading-none" style={{ color: "hsl(var(--primary))" }}>
                20% OFF
              </p>
              <p className="font-body text-[9px] md:text-[10px] mt-1 px-2" style={{ color: "hsl(var(--muted-foreground))" }}>
                For New Customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
