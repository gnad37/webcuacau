import React from "react";
import { useState } from "react";
import { cn } from "../lib/utils";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /**
   * Tương đương thuộc tính `priority` của Next.js <Image>:
   * ảnh LCP (Hero) tải EAGER + fetchpriority="high"; mọi ảnh khác
   * đều loading="lazy" + decoding="async" để tiết kiệm băng thông
   * và không chặn luồng render chính.
   */
  priority?: boolean;
  /** Tỷ lệ khung hình dự kiến — giữ chỗ đúng kích thước, chống layout shift (CLS). */
  aspectClass?: string;
}

/**
 * Bộ nạp ảnh hiệu năng cao mô phỏng cơ chế của Next.js <Image> trong môi trường Vite:
 *  1. Blur-up placeholder: khung shimmer + ảnh mờ dần hiện rõ khi giải mã xong.
 *  2. Lazy load cho ảnh below-the-fold, eager + high priority cho LCP.
 *  3. Giữ aspect-ratio cố định → không nhảy layout khi ảnh 4K về.
 */
export default function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  aspectClass,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        !loaded && "img-placeholder",
        aspectClass,
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        // @ts-expect-error — thuộc tính hợp lệ, TS chưa định nghĩa
        fetchpriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-[800ms] ease-out",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName
        )}
        draggable={false}
      />
    </div>
  );
}
