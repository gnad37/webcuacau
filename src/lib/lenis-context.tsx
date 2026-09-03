
import { createContext, useContext } from "react";
import type Lenis from "lenis";

/** Context chia sẻ instance Lenis để mọi component đều có thể scrollTo mượt. */
export const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}
