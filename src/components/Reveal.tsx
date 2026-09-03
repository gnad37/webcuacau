import React from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Kiểu reveal: trượt lên, mờ dần, hoặc kéo rèm dọc */
  variant?: "up" | "fade" | "curtain";
  once?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Bọc nội dung và cho nó "trồi lên" khi cuộn tới — dùng whileInView của Framer Motion. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  variant = "up",
  once = true,
}: RevealProps) {
  const hidden =
    variant === "fade"
      ? { opacity: 0 }
      : variant === "curtain"
        ? { clipPath: "inset(0 0 100% 0)" }
        : { opacity: 0, y };

  const visible =
    variant === "fade"
      ? { opacity: 1 }
      : variant === "curtain"
        ? { clipPath: "inset(0 0 0% 0)" }
        : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={cn(className)}
      initial={hidden}
      whileInView={visible}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
