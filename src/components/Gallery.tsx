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
                <span className="h-px w-10 bg-brass" /> Tuyển tập
              </p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-5xl leading-[1.02] text-bone sm:text-6xl lg:text-7xl">
                Tuyển tập công trình
                <br />
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
        {/* vat lieu*/}
    <Reveal variant="fade" delay={0.2}>
        {/* Đã giảm pt-16 xuống pt-4 và đổi mt-4 thành -mt-8 để kéo toàn bộ khối lên */}
        <div className="relative z-10 mx-auto -mt-8 max-w-[1440px] border-t border-line/40 px-5 pt-4 pb-20 md:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            
            {/* Cột Ảnh (Bên trái) - Lưới 4 ô (Bento) khoe chi tiết vật liệu */}
            <div className="relative order-2 lg:order-1 lg:col-span-7">
              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                
                {/* Vật liệu 1: Đá tự nhiên (Marble) */}
                <div className="group relative w-full overflow-hidden border border-line/20 bg-coal aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop"
                    alt="Đá Marble cao cấp"
                    className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-[10px] tracking-widest text-bone uppercase">Đá Tự Nhiên</span>
                </div>
                
                {/* Vật liệu 2: Gỗ (Wood) */}
                <div className="group relative w-full overflow-hidden border border-line/20 bg-coal aspect-square mt-5 sm:mt-10">
                  <img
                    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop"
                    alt="Gỗ tự nhiên"
                    className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-[10px] tracking-widest text-bone uppercase">Gỗ Nguyên Bản</span>
                </div>

                {/* Vật liệu 3: Kim loại (Metal/Brass) */}
                <div className="group relative w-full overflow-hidden border border-line/20 bg-coal aspect-square -mt-5 sm:-mt-10">
                  <img
                    src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop"
                    alt="Chi tiết kim loại"
                    className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-[10px] tracking-widest text-bone uppercase">Hợp Kim Sắc Nét</span>
                </div>

                {/* Vật liệu 4: Bê tông / Kính (Concrete/Glass) */}
                <div className="group relative w-full overflow-hidden border border-line/20 bg-coal aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=800&auto=format&fit=crop"
                    alt="Bề mặt kiến trúc"
                    className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-[10px] tracking-widest text-bone uppercase">Bề Mặt Thô</span>
                </div>

              </div>

              {/* Khung góc trang trí kiểu bản vẽ (Blueprint corners) */}
              <div className="absolute -bottom-4 -left-4 z-[-1] h-16 w-16 border-b border-l border-brass/40" />
              <div className="absolute -top-4 -right-4 z-[-1] h-16 w-16 border-r border-t border-brass/40" />
            </div>

            {/* Cột chữ (Bên phải) */}
            <div className="relative order-1 lg:order-2 lg:col-span-5 flex flex-col justify-center lg:pl-10">
              <p className="mb-6 flex items-center gap-3 text-[11px] font-medium tracking-[0.34em] text-brass uppercase">
                <span className="h-px w-8 bg-brass" />
                Chất lượng nguyên bản
              </p>

              <h2 className="font-display text-5xl leading-[1.05] text-bone sm:text-6xl lg:text-7xl mb-6">
                Vật liệu tinh tuyển <br className="hidden lg:block" />
                <span className="text-brass/90 italic">đạt chuẩn</span>
              </h2>

              <p className="mb-10 text-sm font-light leading-relaxed text-bone-dim max-w-md">
                Sự sang trọng thực thụ bắt nguồn từ những chi tiết chạm vào được. Tại BIM Design, chúng tôi khắt khe trong việc tuyển chọn vật liệu: từ vân đá tự nhiên tinh xảo, sớ gỗ ấm áp đến hệ khung kim loại chính xác tuyệt đối, đảm bảo độ bền bỉ và vẻ đẹp vượt thời gian.
              </p>

              <div className="flex gap-10 border-t border-line/30 pt-6">
                <div>
                  <div className="font-display text-3xl text-bone">100%</div>
                  <div className="mt-1 text-[10px] tracking-widest text-ash uppercase">
                    Chính hãng
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl text-bone">Top 1</div>
                  <div className="mt-1 text-[10px] tracking-widest text-ash uppercase">
                    Đối tác toàn cầu
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </Reveal>

      <Reveal variant="fade" delay={0.2}>
        <div className="relative z-10 mx-auto mt-4 max-w-[1440px] border-t border-line/40 px-5 pt-12 pb-20 md:px-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            
            {/* Cột chữ (Bên trái) */}
            <div className="lg:col-span-5 flex flex-col justify-center">

              <h2 className="font-display text-5xl leading-[1.05] text-bone sm:text-6xl lg:text-7xl mb-6">
                Đội ngũ thi công chuyên nghiệp<br className="hidden lg:block" />
              </h2>

              <p className="mb-10 text-sm font-light leading-relaxed text-bone-dim max-w-md">
                Bản vẽ xuất chúng mới chỉ là sự khởi đầu. Tại BIM Design, chúng
                tôi sở hữu đội ngũ kỹ sư và thợ thủ công lành nghề, cam kết biến
                từng đường nét kiến trúc thành không gian thực tế với kỷ luật
                thi công khắt khe và độ hoàn thiện tinh xảo nhất.
              </p>

              <div className="flex gap-10 border-t border-line/30 pt-6">
                <div>
                  <div className="font-display text-3xl text-bone">15+</div>
                  <div className="mt-1 text-[10px] tracking-widest text-ash uppercase">
                    Năm kinh nghiệm
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl text-bone">100%</div>
                  <div className="mt-1 text-[10px] tracking-widest text-ash uppercase">
                    Đội thợ In-house
                  </div>
                </div>
              </div>
            </div>

            {/* Cột Ảnh (Bên phải) - Lưới ghép 3 ảnh */}
            <div className="relative lg:col-span-7">
              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                
                {/* Ảnh 1: Ảnh dọc, chiếm trọn chiều cao bên trái */}
                <div className="group relative w-full overflow-hidden border border-line/20 bg-coal aspect-[3/4] sm:aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=1000&auto=format&fit=crop](https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=1000&auto=format&fit=crop"
                    className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/10 to-transparent" />
                </div>
                
                {/* Cột 2: Gồm 2 ảnh ngang xếp chồng lên nhau */}
                <div className="flex flex-col gap-3 sm:gap-5">
                  {/* Ảnh 2: Góc trên */}
                  <div className="group relative w-full flex-1 overflow-hidden border border-line/20 bg-coal">
                    <img
                      src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop](https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop"
                      alt="Công trường BIM Design 1"
                      className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  {/* Ảnh 3: Góc dưới */}
                  <div className="group relative w-full flex-1 overflow-hidden border border-line/20 bg-coal">
                    <img
                      src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop"
                      alt="Công trường BIM Design 2"
                      className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                
              </div>

              {/* Khung góc trang trí kiểu bản vẽ (Blueprint corners) */}
              <div className="absolute -bottom-4 -left-4 z-[-1] h-16 w-16 border-b border-l border-brass/40" />
              <div className="absolute -top-4 -right-4 z-[-1] h-16 w-16 border-r border-t border-brass/40" />
            </div>
          </div>
        </div>
      </Reveal>

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