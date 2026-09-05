
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HERO_IMAGE } from "../data/projects";
import SmartImage from "./SmartImage";
import { useLenis } from "../lib/lenis-context";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Từng dòng tiêu đề trượt lên từ sau "tấm rèm" overflow-hidden. */
function TitleLine({
  children,
  delay,
  outline = false,
}: {
  children: string;
  delay: number;
  outline?: boolean;
}) {
  return (
    <div className="overflow-hidden">
      <motion.h1
        initial={{ y: "115%", rotate: 3 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 1.3, delay, ease: EASE }}
        className={
          outline
            ? "font-display text-outline leading-[0.95]"
            : "font-display text-bone leading-[0.95]"
        }
      >
        {children}
      </motion.h1>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();

  /* Parallax: ảnh trôi chậm hơn cuộn (y) và tối dần khi rời khỏi màn hình. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const dim = useTransform(scrollYProgress, [0, 1], [0.25, 0.75]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  const goToGallery = () =>
    lenis
      ? lenis.scrollTo("#cong-trinh", { duration: 1.8 })
      : document.getElementById("cong-trinh")?.scrollIntoView({ behavior: "smooth" });

  return (
<section ref={ref} className="relative flex min-h-svh flex-col overflow-hidden">      {/* ===== Ảnh Hero 4K — LCP nên dùng priority (eager + fetchpriority high) ===== */}
      <motion.div
  className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pb-10 pt-32 md:px-10"
  style={{ y: contentY }}
>
        <SmartImage
          src={HERO_IMAGE}
          alt="Biệt thự hiện đại bên hồ bơi lúc hoàng hôn — công trình tiêu biểu của Atelier Võ"
          priority
          className="h-full w-full"
          imgClassName="object-cover"
        />
        {/* Phủ tối để chữ nổi khối */}
        <motion.div
          className="absolute inset-0 bg-coal"
          style={{ opacity: dim }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-coal via-coal/30 to-coal/60"
          aria-hidden
        />
      </motion.div>

      {/* ===== Khung bản vẽ: 4 góc chữ L như tờ blueprint ===== */}
      <div className="pointer-events-none absolute inset-4 z-20 md:inset-7" aria-hidden>
        {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map(
          (pos) => (
            <span key={pos} className={`absolute h-6 w-6 border-bone/40 ${pos}`} />
          )
        )}
      </div>

      {/* ===== Nội dung chữ ===== */}
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pb-10 md:px-10"
        style={{ y: contentY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
          className="mb-5 flex items-center gap-3 text-[11px] font-medium tracking-[0.34em] text-brass uppercase"
        >
          <span className="h-px w-10 bg-brass" />
          Studio Kiến trúc Nhà ở — Từ 2009
        </motion.p>

        <div className="text-[clamp(3.4rem,11vw,10rem)]">
          <TitleLine delay={0.55}>KIẾN TẠO</TitleLine>
          <TitleLine delay={0.7} outline>
            KHÔNG GIAN
          </TitleLine>
          <TitleLine delay={0.85}>SỐNG</TitleLine>
        </div>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.15, ease: EASE }}
            className="max-w-md text-sm leading-relaxed font-light text-bone-dim"
          >
            Chúng tôi thiết kế những ngôi nhà để ánh sáng, vật liệu và ký ức
            cùng cư trú — nơi mỗi mét vuông đều có lý do tồn tại.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: EASE }}
            onClick={goToGallery}
            className="group flex cursor-pointer items-center gap-4 text-[11px] font-semibold tracking-[0.3em] text-bone uppercase"
          >
            <span className="link-sweep">Xem tuyển tập công trình</span>
            <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-bone/30 transition-colors duration-500 group-hover:border-brass">
              <span className="absolute inset-0 translate-y-full rounded-full bg-brass transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="relative text-bone transition-all duration-500 group-hover:translate-y-0.5 group-hover:text-coal"
              >
                <path d="M8 2 V13 M3 8.5 L8 13.5 L13 8.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
              </svg>
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* ===== Thanh metadata chân trang hero ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="relative z-10 border-t border-line/60"
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 overflow-x-auto px-5 py-4 md:px-10">
          {[
            ["Toạ độ", "10.8231° B — 106.6297° Đ"],
            ["Công trình", "68 dự án đã bàn giao"],
            ["Giải thưởng", "12 danh hiệu quốc tế"],
          ].map(([k, v]) => (
            <div key={k} className="flex shrink-0 items-baseline gap-3 whitespace-nowrap">
              <span className="text-[10px] font-semibold tracking-[0.3em] text-brass uppercase">{k}</span>
              <span className="text-xs font-light tracking-wide text-bone-dim">{v}</span>
            </div>
          ))}
          <span className="hidden shrink-0 items-center gap-2 text-[10px] tracking-[0.3em] text-ash uppercase md:flex">
            <motion.span
              animate={{ scaleY: [1, 1.9, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="inline-block h-3 w-px bg-brass origin-center"
            />
            Cuộn để khám phá
          </span>
        </div>
      </motion.div>
    </section>
  );
}
