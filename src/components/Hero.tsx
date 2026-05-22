import { useEffect, useState } from "react";
import { ArrowRight, Leaf, ShieldCheck, Heart } from "lucide-react";
import hero1 from "@/assets/hero1.jpg";
import hero2 from "@/assets/hero2.jpg";
import hero3 from "@/assets/hero3.jpg";
import hero4 from "@/assets/hero4.jpg";
import hero5 from "@/assets/hero5.jpg";

interface HeroProps {
  storeName: string;
  onShopNow: () => void;
}

const SLIDES = [hero1, hero2, hero3, hero4, hero5];
const WORDS = ["Natural", "Radiant", "Glowing", "Healthy", "Youthful"];

export default function Hero({ storeName, onShopNow }: HeroProps) {
  const [slide, setSlide] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Carousel rotation
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4500);
    return () => clearInterval(id);
  }, []);

  // Typing effect
  useEffect(() => {
    const word = WORDS[wordIdx];
    if (!deleting && typed === word) {
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    }
    if (deleting && typed === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % WORDS.length);
      return;
    }
    const t = setTimeout(() => {
      setTyped((cur) =>
        deleting ? word.slice(0, cur.length - 1) : word.slice(0, cur.length + 1)
      );
    }, deleting ? 60 : 110);
    return () => clearTimeout(t);
  }, [typed, deleting, wordIdx]);

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
              New Skincare Collection
            </p>
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl mb-6"
              style={{ color: "hsl(var(--charcoal))", lineHeight: 1.05 }}
            >
              Reveal Your{" "}
              <span style={{ color: "hsl(var(--primary))" }}>
                {typed}
                <span
                  aria-hidden
                  className="inline-block w-[3px] ml-1 align-middle animate-pulse"
                  style={{ height: "0.9em", background: "hsl(var(--primary))" }}
                />
              </span>
              <br />Glow
            </h1>
            <p
              className="max-w-md mx-auto md:mx-0 text-base md:text-lg font-body font-light mb-8 leading-relaxed"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {storeName ? `Discover ${storeName}'s` : "Discover"} clean skincare that nourishes, hydrates, and restores your natural radiance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start mb-10">
              <button
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-body font-medium text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: "hsl(var(--charcoal))", color: "hsl(var(--ivory))" }}
                onClick={onShopNow}
              >
                Shop Skincare <ArrowRight size={16} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 sm:gap-7">
              {[
                { icon: Leaf, title: "Clean Ingredients", sub: "Plant-Based" },
                { icon: ShieldCheck, title: "Dermatologist Tested", sub: "Skin Safe" },
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

          {/* Right image carousel */}
          <div className="relative order-1 md:order-2">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[5/6] shadow-2xl">
              {SLIDES.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Premium skincare collection"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                  style={{ opacity: i === slide ? 1 : 0 }}
                  width={1280}
                  height={1536}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ))}
            </div>
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === slide ? 24 : 8,
                    height: 8,
                    background: i === slide ? "hsl(var(--ivory))" : "hsl(var(--ivory) / 0.55)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
