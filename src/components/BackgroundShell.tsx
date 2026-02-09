import type { ReactNode } from "react";

interface BackgroundShellProps {
  children: ReactNode;
  backgroundImage?: string;
}

export function BackgroundShell({
  children,
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

      {/* Global overlay for readability - soft gradient/vignette effect */}
      <div
        className="pointer-events-none fixed inset-0 z-10 bg-gradient-to-b from-black/20 via-black/10 to-black/30"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-20 flex min-h-[100dvh] w-full items-center justify-center px-4 pt-[calc(env(safe-area-inset-top)+3rem)] pb-[calc(env(safe-area-inset-bottom)+6rem)]">
        {children}
      </div>
    </div>
  );
}


