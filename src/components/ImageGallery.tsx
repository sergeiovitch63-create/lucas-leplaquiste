"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Lightbox, type LightboxImage } from "./Lightbox";

interface ImageGalleryProps {
  images: Array<{ src: string; alt: string }>;
  basePath?: string;
  className?: string;
  gridClassName?: string;
  imageClassName?: string;
}

export function ImageGallery({
  images,
  basePath = "",
  className = "",
  gridClassName = "",
  imageClassName = "",
}: ImageGalleryProps) {
  const pathname = usePathname();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [runtimeImages, setRuntimeImages] = useState<Array<{ src: string; alt: string }> | null>(null);

  const managedLucasSlugs = useMemo(
    () => new Set(["/a-propos", "/creation-decoration", "/faux-plafonds", "/doublages", "/cloisons"]),
    []
  );

  useEffect(() => {
    let cancelled = false;
    if (!pathname || !managedLucasSlugs.has(pathname)) {
      setRuntimeImages(null);
      return;
    }
    fetch("/api/lucas-site")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data?.pagesConfig) return;
        const gallery = data.pagesConfig?.[pathname]?.gallery;
        if (!Array.isArray(gallery) || gallery.length === 0) {
          setRuntimeImages(null);
          return;
        }
        const normalized = gallery
          .filter((src: unknown): src is string => typeof src === "string" && src.trim().length > 0)
          .map((src: string, index: number) => ({ src, alt: images[index]?.alt ?? `Photo ${index + 1}` }));
        setRuntimeImages(normalized.length > 0 ? normalized : null);
      })
      .catch(() => setRuntimeImages(null));
    return () => {
      cancelled = true;
    };
  }, [images, managedLucasSlugs, pathname]);

  const displayImages = runtimeImages && runtimeImages.length > 0 ? runtimeImages : images;

  // Prepare images for lightbox (with full path)
  const lightboxImages: LightboxImage[] = displayImages.map((img) => ({
    src: img.src.startsWith("data:image") || img.src.startsWith("http") || img.src.startsWith("/")
      ? img.src
      : basePath
      ? `${basePath}/${img.src}`
      : img.src,
    alt: img.alt,
  }));

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const handleClose = () => {
    setIsLightboxOpen(false);
  };

  const handleNavigate = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className={className}>
        <div className={`mx-auto grid max-w-[420px] grid-cols-2 gap-3 ${gridClassName}`}>
          {displayImages.map((image, index) => {
            const imageSrc = image.src.startsWith("data:image") || image.src.startsWith("http") || image.src.startsWith("/")
              ? image.src
              : basePath
              ? `${basePath}/${image.src}`
              : image.src;
            const isLast = index === displayImages.length - 1;

            return (
              <div
                key={index}
                onClick={() => handleImageClick(index)}
                className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-md cursor-zoom-in transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                  isLast ? "col-start-2" : ""
                } ${imageClassName}`}
              >
                <Image
                  src={imageSrc}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 420px) 50vw, 200px"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      <Lightbox
        images={lightboxImages}
        isOpen={isLightboxOpen}
        currentIndex={currentIndex}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    </>
  );
}

