import type { ReactNode } from "react";
import { AutoplayVideo } from "./AutoplayVideo";

interface BackgroundShellProps {
  children: ReactNode;
  backgroundImage?: string;
  /** Video en fond (boucle infinie, muet). Prioritaire sur backgroundImage si les deux sont fournis. */
  backgroundVideo?: string;
}

export function BackgroundShell({
  children,
  backgroundImage,
  backgroundVideo,
}: BackgroundShellProps) {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden text-white">
      {/* Background video (boucle continue, muet) */}
      {backgroundVideo && (
        <div className="pointer-events-none select-none fixed inset-0 z-0 bg-slate-950" aria-hidden>
          <AutoplayVideo
            src={backgroundVideo}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Background image (si pas de vidéo) */}
      {!backgroundVideo && backgroundImage && (
        <div
          className="pointer-events-none select-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
          aria-hidden
        />
      )}

      {/* Fallback gradient si ni vidéo ni image */}
      {!backgroundVideo && !backgroundImage && (
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


