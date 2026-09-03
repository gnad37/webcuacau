import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { Project } from "../data/projects";
import { CATEGORY_LABEL } from "../data/projects";
import SmartImage from "./SmartImage";
import { useLenis } from "../lib/lenis-context";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  project: Project | null;
  position: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Lightbox xem ảnh 4K toàn màn hình:
 *  - Esc để đóng, ←/→ để chuyển công trình (điều hướng bàn phím đầy đủ).
 *  - Khoá cuộn Lenis + body khi mở, khôi phục khi đóng.
 *  - Ảnh đổi bằng AnimatePresence (fade + slide) mỗi lần prev/next.
 */
export default function ProjectModal({
  project,
  position,
  total,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const lenis = useLenis();

  useEffect(() => {
    if (!project) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, lenis, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[70] flex flex-col bg-coal/[0.97] backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={project.name}
        >
          {/* Thanh trên: chỉ mục + đóng */}
          <div className="flex items-center justify-between border-b border-line px-5 py-4 md:px-10">
            <span className="font-display text-sm tracking-[0.2em] text-bone-dim">
              <span className="text-brass">{String(position).padStart(2, "0")}</span>
              {" / "}
              {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={onClose}
              className="group flex cursor-pointer items-center gap-3 text-[10px] font-semibold tracking-[0.3em] text-bone-dim uppercase transition-colors hover:text-brass"
              aria-label="Đóng (Esc)"
            >
              Đóng
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="transition-transform duration-500 group-hover:rotate-90"
              >
                <path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>

          {/* Nội dung chính — key theo id để chạy transition khi chuyển dự án */}
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="grid flex-1 overflow-y-auto lg:grid-cols-[1.35fr_1fr]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ảnh 4K */}
            <div className="flex items-center justify-center p-5 md:p-10">
              <div className="relative w-full max-h-full">
                <SmartImage
                  src={project.src}
                  alt={`${project.name} — ảnh toàn cảnh chất lượng cao`}
                  className="w-full border border-line"
                  aspectClass={
                    project.ratio === "portrait"
                      ? "aspect-[3/4] max-h-[62vh] lg:max-h-[76vh]"
                      : "aspect-[4/3] max-h-[62vh] lg:max-h-[76vh]"
                  }
                />
                <span className="font-display absolute -top-3 -left-2 bg-brass px-3 py-1 text-sm text-coal">
                  {project.index}
                </span>
              </div>
            </div>

            {/* Hồ sơ công trình */}
            <div className="flex flex-col border-t border-line p-6 md:p-10 lg:border-t-0 lg:border-l">
              <span className="w-fit border border-brass/60 px-3 py-1 text-[10px] font-semibold tracking-[0.26em] text-brass uppercase">
                {CATEGORY_LABEL[project.category]}
              </span>
              <h3 className="font-display mt-5 text-4xl leading-tight text-bone md:text-5xl">
                {project.name}
              </h3>
              <p className="font-display mt-2 text-lg text-brass italic">
                “{project.tagline}”
              </p>
              <p className="mt-5 text-sm leading-relaxed font-light text-bone-dim md:text-[15px]">
                {project.description}
              </p>

              {/* Bảng thông số kiểu bản vẽ kỹ thuật */}
              <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line">
                {[
                  ["Địa điểm", project.location],
                  ["Năm", project.year],
                  ["Diện tích", project.area],
                  ["Chủ trì", project.architect],
                  ["Hạng mục", CATEGORY_LABEL[project.category]],
                  ["Tình trạng", project.status],
                ].map(([k, v]) => (
                  <div key={k} className="bg-graphite p-4">
                    <dt className="text-[9px] font-semibold tracking-[0.28em] text-ash uppercase">
                      {k}
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium text-bone">{v}</dd>
                  </div>
                ))}
              </dl>

              {/* Điều hướng prev / next */}
              <div className="mt-auto flex items-center justify-between pt-8">
                <button
                  onClick={onPrev}
                  className="group flex cursor-pointer items-center gap-3 text-[10px] font-semibold tracking-[0.28em] text-bone-dim uppercase transition-colors hover:text-brass"
                >
                  <svg width="22" height="12" viewBox="0 0 22 12" className="transition-transform duration-500 group-hover:-translate-x-1.5">
                    <path d="M21 6 H2 M7 1 L2 6 L7 11" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  </svg>
                  Trước
                </button>
                <span className="hidden text-[10px] tracking-[0.25em] text-ash uppercase sm:block">
                  ← → để chuyển · Esc để đóng
                </span>
                <button
                  onClick={onNext}
                  className="group flex cursor-pointer items-center gap-3 text-[10px] font-semibold tracking-[0.28em] text-bone-dim uppercase transition-colors hover:text-brass"
                >
                  Sau
                  <svg width="22" height="12" viewBox="0 0 22 12" className="transition-transform duration-500 group-hover:translate-x-1.5">
                    <path d="M1 6 H20 M15 1 L20 6 L15 11" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
