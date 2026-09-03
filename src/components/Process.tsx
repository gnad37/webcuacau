import React from "react";
import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Lắng nghe & Khảo sát",
    duration: "2 – 4 tuần",
    body: "Chúng tôi ăn một bữa cơm tại khu đất, đo nắng gió bốn mùa và ghi lại nhịp sống của gia đình bạn trước khi vẽ bất kỳ nét nào.",
  },
  {
    n: "02",
    title: "Phác thảo ý niệm",
    duration: "4 – 6 tuần",
    body: "Ba phương án ý niệm bằng mô hình vật lý và phối cảnh — bạn được chạm tay vào ngôi nhà tương lai trước khi quyết định.",
  },
  {
    n: "03",
    title: "Hồ sơ kỹ thuật",
    duration: "8 – 12 tuần",
    body: "Bản vẽ thi công chi tiết tới từng mạch gạch, kèm hồ sơ MEP, kết cấu và dự toán minh bạch từng hạng mục.",
  },
  {
    n: "04",
    title: "Giám sát tác giả",
    duration: "Suốt thi công",
    body: "Kiến trúc sư chủ trì có mặt tại công trường mỗi tuần — vì ngôi nhà chỉ thực sự hoàn thành khi đúng như bản vẽ đã hứa.",
  },
];

/** Quy trình 4 bước — trình bày như các đợt duyệt bản vẽ, hover giãn dòng. */
export default function Process() {
  return (
    <section id="quy-trinh" className="relative overflow-hidden bg-graphite">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal variant="fade">
              <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold tracking-[0.34em] text-brass uppercase">
                <span className="h-px w-10 bg-brass" /> 04 — Quy trình
              </p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-5xl leading-[1.02] text-bone sm:text-6xl">
                Bốn đợt <span className="text-outline">duyệt bản vẽ</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-sm text-sm leading-relaxed font-light text-ash">
              Trung bình 18–24 tháng từ ý niệm đầu tiên đến ngày trao chìa khoá.
              Không rút ngắn, không đốt cháy — chất lượng cần đúng nhịp của nó.
            </p>
          </Reveal>
        </div>

        <div>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.07}>
              <div className="group grid cursor-default grid-cols-[auto_1fr] items-start gap-x-6 gap-y-3 border-t border-line py-8 transition-all duration-500 hover:border-brass/60 hover:pl-4 md:grid-cols-[140px_1fr_auto] md:items-center md:gap-10 md:py-10">
                <span className="font-display text-5xl text-bone/25 transition-all duration-500 group-hover:text-brass md:text-7xl">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-2xl text-bone transition-colors duration-400 group-hover:text-brass md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed font-light text-ash">
                    {s.body}
                  </p>
                </div>
                <span className="col-start-2 w-fit border border-line px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.22em] whitespace-nowrap text-bone-dim uppercase transition-colors duration-500 group-hover:border-brass/50 group-hover:text-brass md:col-start-3">
                  {s.duration}
                </span>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
