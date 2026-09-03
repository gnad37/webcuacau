import React, { useEffect, useState } from "react"
import Lenis from "lenis";
import { LenisContext } from "./lib/lenis-context";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Manifesto from "./components/Manifesto";
import Gallery from "./components/Gallery";
import Featured from "./components/Featured";
import Process from "./components/Process";
import Footer from "./components/Footer";

/**
 * App — khung chính của portfolio kiến trúc.
 * Kiến trúc component tách bạch: Hero / Marquee / Manifesto / Gallery
 * (kèm ProjectCard + ProjectModal) / Featured / Process / Footer.
 * Lenis đảm nhiệm cuộn mượt toàn cục; tôn trọng prefers-reduced-motion.
 */
export default function App() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Người dùng giảm chuyển động → bỏ qua smooth scroll
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(instance);

    let rafId = 0;
    const raf = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {/* grain::after phủ lớp nhiễu hạt điện ảnh lên toàn trang */}
      <div className="grain bg-coal text-bone">
        <Header />
        <main>
          <Hero />
          <Marquee />
          <Manifesto />
          <Gallery />
          <Featured />
          <Process />
        </main>
        <Footer />
      </div>
    </LenisContext.Provider>
  );
}