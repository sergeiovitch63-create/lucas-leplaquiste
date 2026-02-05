"use client";

import { useState } from "react";
import Image from "next/image";
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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Prepare images for lightbox (with full path)
  const lightboxImages: LightboxImage[] = images.map((img) => ({
    src: basePath ? `${basePath}/${img.src}` : img.src,
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
          {images.map((image, index) => {
            const imageSrc = basePath ? `${basePath}/${image.src}` : image.src;
            const isLast = index === images.length - 1;

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

