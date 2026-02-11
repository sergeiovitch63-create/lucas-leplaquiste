import type { ReactNode } from "react";
import { GlassCard } from "./GlassCard";

interface PhoneFrameProps {
  children: ReactNode;
  compact?: boolean;
  /**
   * Optional variant.
   * - "simple": legacy layout wrapper (no frame), used by existing pages.
   * - "template": phone frame + glass card, used by multi-métier pages.
   */
  variant?: "simple" | "template";
}

export function PhoneFrame({
  children,
  compact = false,
  variant = "simple",
}: PhoneFrameProps) {
  const paddingClass = compact ? "py-2" : "py-8 sm:py-12";

  if (variant === "template") {
    return (
      <div className={`flex w-full justify-center ${paddingClass}`}>
        <div className="w-full max-w-[420px]">
          <div className="relative rounded-[2.25rem] border border-white/10 bg-white/5/40 shadow-[0_24px_70px_rgba(0,0,0,0.65)] bg-noise-soft p-[6px]">
            <GlassCard className="glass-card">
              {children}
            </GlassCard>
          </div>
        </div>
      </div>
    );
  }

  // Simple legacy wrapper (used by home/services/avis)
  return (
    <div className={`flex w-full justify-center ${paddingClass}`}>
      <div className="w-full max-w-[420px]">{children}</div>
    </div>
  );
}


