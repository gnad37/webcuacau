import React from "react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { FILTERS, PROJECTS, type Category } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import Reveal from "./Reveal";
import { cn } from "../lib/utils";

/**
 * Showcase Gallery — lưới masonry (CSS columns) với bộ lọc hạng mục.
 * Khi đổi filter, container remount (key={filter}) để toàn bộ thẻ
 * chạy lại chuỗi stagger fade-up, tạo cảm giác "xếp lại bản vẽ".
 */
export default function Gallery() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === filter),
    [filter]
  );

  const selectedIndex = filtered.findIndex((p) => p.id === selectedId);
  const selected = selectedIndex >= 0 ? filtered[selectedIndex] : null;

  const step = (dir: 1 | -1) => {
    if (selectedIndex < 0) return;
    const next = (selectedIndex + dir + filtered.length) % filtered.length;
    setSelectedId(filtered[next].id);
  };

  const countOf = (value: Category | "all") =>
    value === "all"
      ? PROJECTS.length
      : PROJECTS.filter((p) => p.category === value).length;

  return (
    <section id="cong-trinh" className="relative overflow-hidden bg-graphite">
      {/* Nền lớp lang: vệt sáng kiến trúc + lưới blueprint mờ */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(900px 500px at 85% -10%, rgba(200,164,104,0.10), transparent 60%), radial-gradient(700px 500px at -10% 70%, rgba(200,164,104,0.06), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,228,216,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(233,228,216,0.5) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        {/* Đầu section */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8 md:mb-16">
          <div>
            <Reveal variant="fade">
              <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold tracking-[0.34em] text-brass uppercase">
                <span className="h-px w-10 bg-brass" /> 01 — Tuyển tập
              </p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-5xl leading-[1.02] text-bone sm:text-6xl lg:text-7xl">
                Tuyển tập
                <br />
                <span className="text-outline">công trình</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed font-light text-ash">
              Tám công trình tiêu biểu trong số 68 dự án đã bàn giao — mỗi ngôi
              nhà một cá tính, một khí hậu, một câu chuyện gia đình.
            </p>
          </Reveal>
        </div>

        {/* Bộ lọc hạng mục */}
        <Reveal variant="fade" delay={0.1}>
          <div className="mb-10 flex flex-wrap items-center gap-2 md:gap-3">
            {FILTERS.map((f) => {
              const active = filter === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    "group flex cursor-pointer items-center gap-2.5 border px-4 py-2.5 text-[11px] font-semibold tracking-[0.24em] uppercase transition-all duration-500 md:px-6",
                    active
                      ? "border-brass bg-brass text-coal"
                      : "border-line text-bone-dim hover:border-brass/60 hover:text-brass"
                  )}
                >
                  {f.label}
                  <span
                    className={cn(
                      "font-display text-sm",
                      active ? "text-coal/70" : "text-brass/70"
                    )}
                  >
                    {countOf(f.value)}
                  </span>
                </button>
              );
            })}
            <span className="ml-auto hidden text-[10px] tracking-[0.3em] text-ash uppercase md:block">
              Hiển thị {filtered.length} / {PROJECTS.length} dự án
            </span>
          </div>
        </Reveal>

        {/* Lưới masonry — remount theo filter để chạy lại stagger */}
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="columns-1 gap-5 sm:columns-2 md:gap-7 xl:columns-3"
        >
          {filtered.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              order={i}
              onOpen={() => setSelectedId(p.id)}
            />
          ))}
        </motion.div>
      </div>

      {/* Lightbox 4K */}
      <ProjectModal
        project={selected}
        position={selectedIndex >= 0 ? selectedIndex + 1 : 0}
        total={filtered.length}
        onClose={() => setSelectedId(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </section>
  );
}
