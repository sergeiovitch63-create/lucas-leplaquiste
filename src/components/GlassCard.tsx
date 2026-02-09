import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /**
   * Optional background image URL.
   * Pass the same value as the page background to make the card feel like a window.
   */
  backgroundImage?: string;
}

export function GlassCard({
  children,
  className,
  backgroundImage,
}: GlassCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm ${className ?? ""}`}
    >
      {/* Background image – fully visible, no opacity/filter applied */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
          aria-hidden
        />
      )}

      {/* Separate overlay layer for readability (does NOT affect the image itself) */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40"
        aria-hidden
      />

      {/* Content – always on top */}
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
}


