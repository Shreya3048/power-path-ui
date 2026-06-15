import type { ReactNode } from "react";

/**
 * Centers the 375px mobile UI on larger screens and gives it a phone-like
 * container while letting it occupy the full screen on actual mobile.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background flex justify-center">
      <div className="relative w-full max-w-[420px] min-h-screen bg-background overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
