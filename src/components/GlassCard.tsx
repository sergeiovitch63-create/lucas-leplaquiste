import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  backgroundImage?: string;
}

export function GlassCard({ children, className, backgroundImage }: GlassCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 bg-gradient-to-b from-white/10 via-white/5 to-white/[0.03] shadow-[0_22px_60px_rgba(0,0,0,0.75)] backdrop-blur-2xl ${className ?? ""}`}
      style={{
        ...(backgroundImage && {
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }),
      }}
    >
      {/* Internal overlay + highlight */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-black/10" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/15 via-transparent to-black/25" />

      {/* Content */}
      <div className="relative z-30 p-6">{children}</div>
    </div>
  );
}


