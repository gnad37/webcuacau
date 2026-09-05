import React from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useLenis } from "../lib/lenis-context";

/** Chân trang — CTA khổng lồ kiểu bản tuyên ngôn + thông tin studio. */
export default function Footer() {
  const lenis = useLenis();

  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.8 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer id="lien-he" className="relative overflow-hidden bg-coal">
      {/* Vệt sáng đồng phía sau CTA */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 420px at 50% 100%, rgba(200,164,104,0.10), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 pt-24 pb-10 md:px-10 md:pt-32">
        {/* CTA chính */}
        <div className="border-b border-line pb-16 text-center md:pb-24">
          <Reveal variant="fade">
            <p className="mb-8 flex items-center justify-center gap-3 text-[11px] font-semibold tracking-[0.34em] text-brass uppercase">
              <span className="h-px w-10 bg-brass" /> 05 — Khởi đầu
              <span className="h-px w-10 bg-brass" />
            </p>
          </Reveal>
          <Reveal>
            <h2 className="font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.98] text-bone">
              Cùng kiến tạo
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="font-display text-outline text-[clamp(3rem,9vw,8.5rem)] leading-[0.98]">
              tổ ấm của bạn
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="0"
              className="group mt-12 inline-flex items-center gap-4"
            >
              <span className="link-sweep text-lg font-light tracking-wide text-bone-dim transition-colors duration-500 group-hover:text-brass md:text-2xl">
                BIM Design
              </span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                className="text-brass transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <path d="M5 17 L17 5 M8 5 H17 V14" stroke="currentColor" strokeWidth="1.4" fill="none" />
              </svg>
            </a>
          </Reveal>
          <Reveal delay={0.26}>
            <p className="mt-4 text-xs font-light tracking-[0.2em] text-ash uppercase">
              Phản hồi trong vòng 48 giờ làm việc
            </p>
          </Reveal>
        </div>

        {/* Ba cột thông tin */}
        <div className="grid gap-10 py-14 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 text-bone">
              <img 
                  src="/logo.png" 
                  alt="BIM Design Logo" 
                  className="h-12 w-auto object-contain"
                />
              <span className="font-display text-xl font-light tracking-[0.3em] text-bone uppercase mt-1">
        Design
      </span>            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed font-light text-ash">
              Studio kiến trúc nhà ở cao cấp — nơi bản vẽ được đối xử như một
              tác phẩm, và ngôi nhà được dựng nên như một lời hứa.
            </p>
          </div>

          {[
            {
              head: "Văn phòng",
              items: [
                "Nguyễn Huệ, Xuân Yên, Hà Tĩnh",
              ],
              links: false,
            },
            {
              head: "Liên hệ",
              items: [
                { label: "+84 0", href: "tel:0" },
                { label: "0", href: "0" },
                { label: "Thứ 2 – Thứ 6, 9:00 – 18:00" },
              ],
              links: true,
            },
            {
              head: "Theo dõi",
              items: [
                { label: "Instagram", href: "https://instagram.com" },
                { label: "Pinterest", href: "https://pinterest.com" },
                { label: "Behance", href: "https://behance.net" },
              ],
              links: true,
            },
          ].map((col) => (
            <div key={col.head}>
              <h4 className="text-[10px] font-semibold tracking-[0.3em] text-brass uppercase">
                {col.head}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((it: any) => (
                  <li key={it.label ?? it}>
                    {it.href ? (
                      <a
                        href={it.href}
                        target={it.href.startsWith("http") ? "_blank" : undefined}
                        rel={it.href.startsWith("http") ? "noreferrer" : undefined}
                        className="link-sweep text-sm font-light text-bone-dim transition-colors hover:text-brass"
                      >
                        {it.label}
                      </a>
                    ) : (
                      <span className="text-sm font-light text-bone-dim">
                        {typeof it === "string" ? it : it.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Đáy footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7">
          <p className="text-[10px] tracking-[0.22em] text-ash uppercase">
            © 2009–2026 BIM Design. Bảo lưu mọi quyền.
          </p>
          <button
            onClick={toTop}
            className="group flex cursor-pointer items-center gap-3 text-[10px] font-semibold tracking-[0.28em] text-bone-dim uppercase transition-colors hover:text-brass"
            aria-label="Về đầu trang"
          >
            Về đầu trang
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:-translate-y-1 group-hover:border-brass">
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M7 12 V2 M2.5 6 L7 1.5 L11.5 6" stroke="currentColor" strokeWidth="1.3" fill="none" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
