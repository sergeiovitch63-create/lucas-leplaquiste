import Image from "next/image";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 bg-gradient-to-b from-white/10 via-white/5 to-white/[0.03] shadow-[0_22px_60px_rgba(0,0,0,0.75)] backdrop-blur-2xl ${className ?? ""}`}
    >
      {/* Internal image layer */}
      <div className="pointer-events-none select-none absolute inset-0 z-0">
        <Image
          src="/media/accueil/fond-ecran.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 420px"
          aria-hidden
        />
      </div>

      {/* Internal overlay + highlight */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-black/10" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/15 via-transparent to-black/25" />

      {/* Content */}
      <div className="relative z-30 p-6">{children}</div>
    </div>
  );
}


