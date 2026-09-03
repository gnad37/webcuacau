import React from "react";
import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { formatNumber } from "../lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Con số tự đếm lên khi cuộn tới — hiệu ứng "đang được đo đạc". */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {formatNumber(val)}
      {suffix}
    </span>
  );
}

const STATS: { value: number; suffix?: string; label: string }[] = [
  { value: 68, label: "Công trình bàn giao" },
  { value: 15, label: "Năm hành nghề" },
  { value: 12, label: "Giải thưởng kiến trúc" },
  { value: 98, suffix: "%", label: "Khách hàng giới thiệu" },
];

export default function Manifesto() {
  return (
    <section id="triet-ly" className="relative overflow-hidden bg-coal">
      {/* Chữ nền watermark khổng lồ */}
      <span
        aria-hidden
        className="font-display text-outline pointer-events-none absolute -top-8 right-0 text-[26vw] leading-none opacity-40 select-none"
      >
        VÕ
      </span>

      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        {/* Cột trái dính chặt khi cuộn — tiêu đề triết lý */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <Reveal variant="fade">
              <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold tracking-[0.34em] text-brass uppercase">
                <span className="h-px w-10 bg-brass" /> 02 — Triết lý
              </p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-5xl leading-[1.04] text-bone sm:text-6xl lg:text-7xl">
                Ngôi nhà là
                <br />
                <span className="text-outline">bản tự truyện</span>
                <br />
                của gia chủ
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-sm border-l-2 border-brass/60 pl-5 text-sm leading-relaxed font-light text-bone-dim">
                Không có hai gia đình nào giống nhau, nên không có hai bản vẽ nào
                lặp lại. Chúng tôi bắt đầu bằng việc lắng nghe — cách bạn pha trà
                buổi sáng, nơi bà nội ngồi nhặt rau, hướng nắng chiều bạn muốn né.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Cột phải: luận điểm + bộ đếm */}
        <div className="md:col-span-6 md:col-start-7">
          <div className="space-y-10">
            {[
              {
                n: "I.",
                title: "Ánh sáng là vật liệu số một",
                body: "Bê tông, gỗ hay đá đều chỉ lên tiếng khi được nắng chạm vào. Mọi mặt bằng của chúng tôi được vẽ ngược từ quỹ đạo mặt trời, để mỗi phòng nhận đúng thứ ánh sáng nó cần — phòng bếp hứng bình minh, phòng đọc tắm nắng xiên buổi chiều.",
              },
              {
                n: "II.",
                title: "Vật liệu phải già đi duyên dáng",
                body: "Chúng tôi chọn đồng hun sẽ lên patina, gỗ teak sẽ bạc màu, đá bazan sẽ nhẵn dấu chân. Một ngôi nhà đẹp không phải ngôi nhà trẻ mãi, mà là ngôi nhà biết kể thời gian bằng những vết đổi màu trung thực.",
              },
              {
                n: "III.",
                title: "Xa xỉ là sự vừa vặn",
                body: "Xa xỉ không nằm ở mét vuông hay thương hiệu nội thất. Xa xỉ là trần nhà cao vừa tầm giọng nói, là tay vịn cầu thang ôm đúng lòng bàn tay, là hành lang đủ rộng để hai cha con đi tránh nhau mà không ai phải nép mình.",
              },
            ].map((item, i) => (
              <Reveal key={item.n} delay={i * 0.08}>
                <div className="group border-t border-line pt-6 transition-colors duration-500 hover:border-brass/50">
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-lg text-brass">{item.n}</span>
                    <h3 className="font-display text-2xl text-bone transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-4 pl-12 text-sm leading-relaxed font-light text-ash md:text-[15px]">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Bộ số liệu studio */}
          <div className="mt-16 grid grid-cols-2 gap-px border border-line bg-line">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="group bg-coal p-6 transition-colors duration-500 hover:bg-graphite md:p-8"
              >
                <Reveal delay={i * 0.07} variant="fade">
                  <p className="font-display text-5xl text-bone transition-colors duration-500 group-hover:text-brass md:text-6xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-3 text-[10px] font-medium tracking-[0.28em] text-ash uppercase">
                    {s.label}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
