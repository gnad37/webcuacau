
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react"
import { cn } from "../lib/utils";
import { useLenis } from "../lib/lenis-context";

const NAV = [
  { id: "cong-trinh", label: "Công trình" },
  { id: "triet-ly", label: "Triết lý" },
  { id: "quy-trinh", label: "Quy trình" },
  { id: "lien-he", label: "Liên hệ" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/** Logo nét vẽ mái nhà — vẽ tay bằng SVG để giữ đúng tinh thần bản vẽ. */
function Logo() {
  return (
    <span className="flex items-center gap-3">
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path
          d="M5 27 L16 6 L27 27 M10.5 20.5 H21.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="16" cy="6" r="1.4" fill="var(--color-brass)" />
      </svg>
      <span className="font-display text-xl tracking-[0.22em] text-bone">
        ATELIER&nbsp;VÕ
      </span>
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    setOpen(false);
    if (lenis) lenis.scrollTo(`#${id}`, { duration: 1.6 });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-line bg-coal/90 py-3 backdrop-blur-sm"
            : "border-b border-transparent bg-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 md:px-10">
          <button
            onClick={() => lenis?.scrollTo(0, { duration: 1.4 })}
            className="cursor-pointer text-bone"
            aria-label="Về đầu trang"
          >
            <Logo />
          </button>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map((item, i) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className="group relative cursor-pointer text-[11px] font-medium tracking-[0.28em] text-bone-dim uppercase transition-colors duration-300 hover:text-brass"
              >
                <span className="mr-1.5 font-display text-brass/60 text-[10px]">
                  0{i + 1}
                </span>
                <span className="link-sweep">{item.label}</span>
              </button>
            ))}
            <button
              onClick={() => goTo("lien-he")}
              className="group relative cursor-pointer overflow-hidden border border-brass/50 px-6 py-2.5 text-[11px] font-semibold tracking-[0.28em] text-brass uppercase transition-colors duration-500 hover:text-coal"
            >
              <span className="absolute inset-0 -translate-x-full bg-brass transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">Nhận tư vấn</span>
            </button>
          </nav>

          {/* Nút mở menu mobile */}
          <button
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[7px] lg:hidden"
            aria-label="Mở menu"
          >
            <span className="h-px w-7 bg-bone" />
            <span className="h-px w-5 self-end mr-2 bg-brass" />
            <span className="h-px w-7 bg-bone" />
          </button>
        </div>
      </motion.header>

      {/* Menu mobile toàn màn hình */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col bg-coal px-6 py-6"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                className="cursor-pointer p-2 text-bone hover:text-brass"
                aria-label="Đóng menu"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M5 5 L19 19 M19 5 L5 19" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-start justify-center gap-2">
              {NAV.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.7, ease: EASE }}
                  onClick={() => goTo(item.id)}
                  className="cursor-pointer py-2 text-left"
                >
                  <span className="font-display mr-4 text-sm text-brass">0{i + 1}</span>
                  <span className="font-display text-5xl text-bone sm:text-6xl">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>
            <div className="border-t border-line pt-5 text-[11px] tracking-[0.25em] text-ash uppercase">
              hello@ateliervo.vn — Sài Gòn · Hà Nội · Đà Nẵng
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
