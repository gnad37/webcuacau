
/** Ghép class name có điều kiện — nhẹ hơn clsx, đủ dùng cho dự án này. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Định dạng số kiểu Việt Nam: 1200 -> "1.200" */
export function formatNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
