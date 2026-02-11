"use client";

import Image, { type ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface SafeImageProps extends ImageProps {
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  alt,
  fallbackSrc = "/media/placeholder.svg",
  ...rest
}: SafeImageProps) {
  const initial = src || fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(
    typeof initial === "string" ? initial : fallbackSrc,
  );

  useEffect(() => {
    if (src && typeof src === "string") {
      setCurrentSrc(src);
    }
  }, [src]);

  return (
    <Image
      {...rest}
      src={currentSrc || fallbackSrc}
      alt={alt ?? ""}
      onError={() => setCurrentSrc(fallbackSrc)}
    />
  );
}



