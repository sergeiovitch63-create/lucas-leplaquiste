import type { ReactNode } from "react";

interface BackgroundShellProps {
  children: ReactNode;
  priority?: boolean;
  backgroundImage?: string;
}

export function BackgroundShell({
  children,
  priority = false,
  backgroundImage,
}: BackgroundShellProps) {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden text-white">
      {/* Background image (only if backgroundImage is provided) */}
      {backgroundImage && (
        <div
          className="pointer-events-none select-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
          aria-hidden
        />
      )}

      {/* Fallback gradient background if no image is provided */}
      {!backgroundImage && (
        <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-slate-900 via-zinc-950 to-black" />
      )}

      {/* Dark overlay + blur (always applied for readability) */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-black/40 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-20 flex min-h-[100dvh] w-full items-start justify-center px-4 pt-[calc(env(safe-area-inset-top)+3rem)] pb-[calc(env(safe-area-inset-bottom)+6rem)]">
        {children}
      </div>
    </div>
  );
}


