import React from "react";
import { motion } from "framer-motion";
import type { Project } from "../data/projects";
import { CATEGORY_LABEL } from "../data/projects";
import SmartImage from "./SmartImage";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  project: Project;
  onOpen: () => void;
  /** vị trí trong lưới — dùng để stagger reveal */
  order: number;
}

/**
 * Thẻ công trình trong lưới masonry.
 * Hover: ảnh zoom chậm 1.06x + tấm phủ tối trồi lên + nút xem chi tiết lộ diện.
 * Ảnh dùng SmartImage → lazy load + blur-up, chỉ tải 4K khi gần vào viewport.
 */
export default function ProjectCard({ project, onOpen, order }: Props) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 46 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24, transition: { duration: 0.3 } }}
      transition={{ duration: 0.9, delay: order * 0.07, ease: EASE }}
      className="group mb-5 break-inside-avoid md:mb-7"
    >
      <button
        onClick={onOpen}
        className="block w-full cursor-pointer text-left"
        aria-label={`Xem chi tiết ${project.name}`}
      >
        <div className="relative overflow-hidden border border-line transition-colors duration-500 group-hover:border-brass/50">
          {/* Khung ảnh giữ tỷ lệ cố định chống CLS */}
          <div
            className={
              project.ratio === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
            }
          >
            <SmartImage
              src={project.src}
              alt={`${project.name} — ${project.location}`}
              className="h-full w-full"
              imgClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              aspectClass="h-full"
            />
          </div>

          {/* Tấm phủ tối + CTA hiện khi hover */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal/90 via-coal/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex translate-y-4 items-center gap-3 border border-bone/40 px-5 py-3 text-[10px] font-semibold tracking-[0.3em] text-bone uppercase opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              Xem chi tiết
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7 H11 M7.5 3 L11.5 7 L7.5 11" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </span>
          </div>

          {/* Góc trên: chỉ mục + hạng mục */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="font-display text-sm text-bone/90">{project.index}</span>
            <span className="border border-brass/60 bg-coal/50 px-2.5 py-1 text-[9px] font-semibold tracking-[0.22em] text-brass uppercase backdrop-blur-[2px]">
              {CATEGORY_LABEL[project.category]}
            </span>
          </div>

          {/* Vạch đồng chạy ngang khi hover */}
          <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-brass transition-all duration-700 ease-out group-hover:w-full" />
        </div>

        {/* Meta dưới ảnh */}
        <div className="flex items-baseline justify-between gap-4 pt-4">
          <div>
            <h3 className="font-display text-xl text-bone transition-colors duration-400 group-hover:text-brass md:text-2xl">
              {project.name}
            </h3>
            <p className="mt-1 text-[11px] font-light tracking-[0.14em] text-ash uppercase">
              {project.location}
            </p>
          </div>
          <span className="font-display shrink-0 text-lg text-ash transition-colors duration-400 group-hover:text-brass">
            {project.year}
          </span>
        </div>
      </button>
    </motion.article>
  );
}
