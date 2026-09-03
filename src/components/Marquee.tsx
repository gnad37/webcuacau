import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const WORDS = ["Kiến trúc", "Ánh sáng", "Vật liệu", "Tỷ lệ", "Cảnh quan", "Thủ công"];

/** Hình thoi nhỏ — ký hiệu tách từ mang hơi hướng bản vẽ kỹ thuật. */
function Diamond() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" className="mx-8 shrink-0 text-brass" aria-hidden>
      <rect x="2.2" y="2.2" width="5.6" height="5.6" transform="rotate(45 5 5)" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

function Row() {
  return (
    <>
      {WORDS.map((w, i) => (
        <span key={w} className="flex items-center">
          <span
            className={
              i % 2 === 0
                ? "font-display text-3xl text-bone md:text-5xl"
                : "font-display text-outline text-3xl md:text-5xl"
            }
          >
            {w}
          </span>
          <Diamond />
        </span>
      ))}
    </>
  );
}

/** Dải manifesto chạy ngang vô tận, nghiêng nhẹ theo nhịp cuộn để tạo chiều sâu. */
export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);

  return (
    <div ref={ref} className="relative overflow-hidden border-y border-line bg-graphite py-6 md:py-8">
      <motion.div style={{ x }}>
        <div className="marquee-track flex w-max items-center whitespace-nowrap">
          <Row />
          <Row />
        </div>
      </motion.div>
    </div>
  );
}
