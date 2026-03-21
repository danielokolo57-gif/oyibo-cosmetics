import { useState, useEffect, useCallback, useRef } from "react";
import hero1 from "@/assets/hero1.jpg";
import hero2 from "@/assets/hero2.jpg";
import hero3 from "@/assets/hero3.jpg";
import hero4 from "@/assets/hero4.jpg";
import hero5 from "@/assets/hero5.jpg";

const SLIDES = [hero1, hero2, hero3, hero4, hero5];
const TYPING_PHRASES = [
  "Discover Beauty",
  "Glow With Confidence",
  "Premium Cosmetic Collection",
  "Reveal Your Best Self",
];
const INTERVAL = 5000;
const TYPE_SPEED = 80;
const DELETE_SPEED = 45;
const PAUSE_MS = 2000;

interface HeroProps {
  storeName: string;
  onShopNow: () => void;
}

export default function Hero({ storeName, onShopNow }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState<number | null>(null);
  const [typedText, setTypedText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Slide rotation
  const goToSlide = useCallback((idx: number) => {
    setNextSlide(idx);
    setTimeout(() => {
      setCurrentSlide(idx);
      setNextSlide(null);
    }, 1200);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const next = (currentSlide + 1) % SLIDES.length;
      goToSlide(next);
    }, INTERVAL);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [currentSlide, goToSlide]);

  // Typing effect
  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIdx];
    const schedule = (delay: number, fn: () => void) => {
      typingRef.current = setTimeout(fn, delay);
    };

    if (!isDeleting && typedText.length < phrase.length) {
      schedule(TYPE_SPEED, () => setTypedText(phrase.slice(0, typedText.length + 1)));
    } else if (!isDeleting && typedText.length === phrase.length) {
      schedule(PAUSE_MS, () => setIsDeleting(true));
    } else if (isDeleting && typedText.length > 0) {
      schedule(DELETE_SPEED, () => setTypedText(typedText.slice(0, -1)));
    } else if (isDeleting && typedText.length === 0) {
      setIsDeleting(false);
      setPhraseIdx((i) => (i + 1) % TYPING_PHRASES.length);
    }

    return () => { if (typingRef.current) clearTimeout(typingRef.current); };
  }, [typedText, isDeleting, phraseIdx]);

  return (
    <section id="home" className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      {SLIDES.map((src, i) => (
        <div
          key={i}
          className="hero-slide"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === currentSlide ? 1 : i === nextSlide ? 0.01 : 0,
            zIndex: i === currentSlide ? 1 : i === nextSlide ? 2 : 0,
          }}
        />
      ))}

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "linear-gradient(135deg, hsl(340 30% 8% / 0.72) 0%, hsl(20 15% 8% / 0.55) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Eyebrow */}
        <p
          className="tracking-luxury text-xs uppercase mb-6 font-body font-medium"
          style={{ color: "hsl(var(--gold))" }}
        >
          {storeName ? storeName : "Premium Beauty"}
        </p>

        {/* Typing headline */}
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6"
          style={{ color: "hsl(var(--primary-foreground))", lineHeight: 1.05, minHeight: "1.1em" }}
        >
          <span className="typing-cursor">{typedText}</span>
        </h1>

        {/* Sub */}
        <p
          className="max-w-md mx-auto text-base sm:text-lg font-body font-light mb-10 leading-relaxed"
          style={{ color: "hsl(var(--primary-foreground) / 0.82)" }}
        >
          Curated cosmetics that celebrate every shade of beauty
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button className="btn-primary" onClick={onShopNow}>
            Shop Collection
          </button>
          <button
            className="btn-outline"
            onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
          >
            Our Story
          </button>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); goToSlide(i); }}
              className="h-0.5 rounded-full transition-all duration-500"
              style={{
                width: i === currentSlide ? "32px" : "16px",
                background: i === currentSlide ? "hsl(var(--gold))" : "hsl(var(--primary-foreground) / 0.45)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
