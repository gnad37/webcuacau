import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PROJECTS } from "../data/projects";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { useLenis } from "../lib/lenis-context";

/**
 * Dự án tiêu điểm — ảnh chạy parallax bên trong khung cố định
 * (ảnh cao hơn khung, translate ngược chiều cuộn) tạo chiều sâu như
 * đang nhìn qua một ô cửa sổ.
 */
export default function Featured() {

  const cloud = PROJECTS[0];
  const frameRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  if (!cloud) return null;

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section className="relative overflow-hidden bg-coal">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-16">
        {/* Cột chữ — sticky */}
        <div className="flex flex-col justify-center">
          <div className="lg:sticky lg:top-32">
            <Reveal variant="fade">
              <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold tracking-[0.34em] text-brass uppercase">
                <span className="h-px w-10 bg-brass" /> 03 — Tiêu điểm 2025
              </p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-5xl leading-[1.03] text-bone sm:text-6xl lg:text-7xl">
                {cloud.name}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-display mt-4 text-xl text-brass italic">
                “{cloud.tagline}”
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-md text-sm leading-relaxed font-light text-bone-dim md:text-[15px]">
                {cloud.description}
              </p>
            </Reveal>

            {/* 3 chỉ số đặc trưng của công trình */}
            <Reveal delay={0.22}>
              <div className="mt-10 flex divide-x divide-line border-y border-line">
                {[
                  ["1.600 m", "Cao độ đỉnh núi"],
                  ["9 m", "Sàn vươn không cột"],
                  ["360 m²", "Diện tích sàn"],
                ].map(([v, k]) => (
                  <div key={k} className="flex-1 px-4 py-5 first:pl-0 last:pr-0">
                    <p className="font-display text-2xl text-bone md:text-3xl">{v}</p>
                    <p className="mt-1.5 text-[9px] font-semibold tracking-[0.24em] text-ash uppercase">
                      {k}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <button
                onClick={() =>
                  lenis
                    ? lenis.scrollTo("#cong-trinh", { duration: 1.6 })
                    : document
                        .getElementById("cong-trinh")
                        ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group mt-10 flex cursor-pointer items-center gap-4 text-[11px] font-semibold tracking-[0.3em] text-bone uppercase"
              >
                <span className="link-sweep">Xem trong tuyển tập</span>
                <svg
                  width="26"
                  height="12"
                  viewBox="0 0 26 12"
                  className="text-brass transition-transform duration-500 group-hover:translate-x-2"
                >
                  <path d="M1 6 H24 M19 1 L24 6 L19 11" stroke="currentColor" strokeWidth="1.3" fill="none" />
                </svg>
              </button>
            </Reveal>
          </div>
        </div>

        {/* Cột ảnh parallax */}
        <div ref={frameRef} className="relative">
          <div className="relative overflow-hidden border border-line">
            <div className="aspect-[4/5] overflow-hidden">
              <motion.div className="h-[130%] w-full will-change-transform" style={{ y: imgY }}>
                <SmartImage
                  src={cloud.src}
                  alt="Nhà Trên Mây — khối đá và kính vươn ra khỏi mép núi giữa biển mây Sa Pa"
                  className="h-full w-full"
                />
              </motion.div>
            </div>
            {/* Nhãn tọa độ dán góc ảnh */}
            <div className="absolute bottom-4 left-4 border border-line bg-coal/70 px-4 py-2.5 backdrop-blur-sm">
              <p className="text-[9px] font-semibold tracking-[0.28em] text-brass uppercase">
                Tọa độ công trình
              </p>
              <p className="font-display mt-0.5 text-sm text-bone">
                22.3364° B — 103.8436° Đ
              </p>
            </div>
          </div>
          {/* Khung lệch tạo lớp */}
          <span
            aria-hidden
            className="absolute -right-3 -bottom-3 -z-10 h-full w-full border border-brass/30"
          />
        </div>
      </div>
    </section>
  );
}
