"use client";

import { useEffect, useRef } from "react";

interface AutoplayVideoProps {
  src: string;
  className?: string;
  poster?: string;
}

/** Vidéo en fond qui s'autoplay même sur mobile (muted + playsInline + play() au chargement) */
export function AutoplayVideo({ src, className, poster }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay bloqué par le navigateur — on ignore silencieusement
        });
      }
    };

    attemptPlay();

    // Réessayer quand la vidéo peut être lue (important pour mobile)
    video.addEventListener("loadeddata", attemptPlay);
    video.addEventListener("canplay", attemptPlay);
    const onVisible = () => {
      if (document.visibilityState === "visible") attemptPlay();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      video.removeEventListener("loadeddata", attemptPlay);
      video.removeEventListener("canplay", attemptPlay);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={className}
      src={src}
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
