"use client";

import { useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { BackgroundShell } from "./BackgroundShell";
import { PhoneFrame } from "./PhoneFrame";
const SL74_PHONE = "+33695277901";
const SL74_WHATSAPP = "https://wa.me/33695277901";
const SL74_EMAIL = "sl74renov@gmail.com";

const SL74_QUICK_ACTIONS = [
  { id: "phone", href: `tel:${SL74_PHONE}`, iconKey: "phone" as const },
  { id: "whatsapp", href: SL74_WHATSAPP, iconKey: "whatsapp" as const },
  { id: "email", href: `mailto:${SL74_EMAIL}`, iconKey: "email" as const },
];
import { Icon } from "./icons";
import { MadeByPublox } from "./MadeByPublox";
import type { Sl74RenovCategory } from "@/data/sl74renov-categories";

function buildWhatsAppHref(categoryLabel: string): string {
  const message = encodeURIComponent(
    `Bonjour, je souhaite un devis pour ${categoryLabel.toLowerCase()}.`
  );
  return `${SL74_WHATSAPP}?text=${message}`;
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ChevronUp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

function CategoryExpandableContent({ category }: { category: Sl74RenovCategory }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const hasImages = category.images.length > 0;
  const visibleImages = showAllPhotos ? category.images : category.images.slice(0, 4);
  const hasMorePhotos = category.images.length > 4;
  const whatsappHref = buildWhatsAppHref(category.label);
  const showDevis = !category.hideDevis;

  if (category.slug === "avis") {
    return (
      <div className="space-y-4 pt-2 pb-1">
        <Script
          src="https://elfsightcdn.com/platform.js"
          strategy="lazyOnload"
        />
        <div
          className="elfsight-app-f28a825d-4f84-4ade-8813-13a5f51121da"
          data-elfsight-app-lazy
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-2 pb-1">
      {category.reviews && category.reviews.length > 0 ? (
        <ul className="space-y-3">
          {category.reviews.map((r, i) => (
            <li
              key={i}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-white/95">
                  {r.author}
                </span>
                {r.rating != null && (
                  <span className="text-sm text-amber-300">
                    {"★".repeat(r.rating)}
                  </span>
                )}
              </div>
              <p className="text-base leading-relaxed text-white/85">{r.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <>
          {category.body.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-white/85">
              {p}
            </p>
          ))}
        </>
      )}

      {category.whyUs.length > 0 && (
        <section>
          <h4 className="text-base font-semibold text-white/95 mb-2">
            Pourquoi nous choisir
          </h4>
          <ul className="space-y-2">
            {category.whyUs.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-base text-white/85"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {hasImages && !category.hideGallery && (
        <section>
          <h4 className="text-base font-semibold text-white/95 mb-2">
            Galerie
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {visibleImages.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white/10"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 420px) 50vw, 200px"
                />
              </div>
            ))}
          </div>
          {hasMorePhotos && !showAllPhotos && (
            <button
              type="button"
              onClick={() => setShowAllPhotos(true)}
              className="mt-3 w-full rounded-xl border border-white/20 bg-white/10 py-3 text-base font-medium text-white transition-all hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Voir toutes les photos
            </button>
          )}
        </section>
      )}

      {category.faq.length > 0 && (
        <section>
          <h4 className="text-base font-semibold text-white/95 mb-2">
            Questions fréquentes
          </h4>
          <ul className="space-y-3">
            {category.faq.map((item, i) => (
              <li
                key={i}
                className="rounded-lg border border-white/10 bg-white/5 p-3"
              >
                <p className="text-sm font-medium text-white/95">{item.question}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                  {item.answer}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {showDevis && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[52px] w-full items-center justify-center rounded-xl border border-white/20 bg-white/15 text-base font-medium text-white transition-all hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          aria-label={`Demander un devis pour ${category.label}`}
        >
          Demander un devis
        </a>
      )}
    </div>
  );
}

function AccordionCategoryRow({
  category,
  isExpanded,
  onToggle,
}: {
  category: Sl74RenovCategory;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const thumbnailSrc = category.images[0] || "/media/jobs/electricien.svg";

  return (
    <div className="rounded-2xl border border-white/15 bg-white/20 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full min-h-[60px] items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-all duration-200 hover:bg-white/10 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? `Fermer ${category.label}` : `Ouvrir ${category.label}`}
      >
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/10 ring-1 ring-white/15">
          <Image
            src={thumbnailSrc}
            alt=""
            fill
            className="object-cover"
            sizes="40px"
            aria-hidden
          />
        </div>
        <div className="flex-1 min-w-0 flex items-center justify-center">
          <span className="block text-lg font-semibold text-white text-center sm:text-xl leading-tight">
            {category.label}
          </span>
        </div>
        <span className="shrink-0 text-white/90">
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </span>
      </button>
      {isExpanded && (
        <div className="border-t border-white/10 bg-white/5 px-4">
          <CategoryExpandableContent category={category} />
        </div>
      )}
    </div>
  );
}

interface Sl74RenovContentProps {
  categories: Sl74RenovCategory[];
}

export function Sl74RenovContent({ categories }: Sl74RenovContentProps) {
  const [expandedSlugs, setExpandedSlugs] = useState<Set<string>>(new Set());

  const toggleExpanded = (slug: string) => {
    setExpandedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <BackgroundShell backgroundVideo="/sl74/fond-ecran.MP4" backgroundImage="/media/accueil/fond-ecrans.jpg">
      <PhoneFrame>
        <div className="space-y-7 p-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/10 bg-white/10 shadow-lg ring-2 ring-white/20">
              <Image
                src="/sl74/LOGO.jpg"
                alt="SL74 Rénov"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl text-shadow-soft">
                SL74 Rénov
              </h1>
              <p className="mt-1.5 text-sm text-white/80 sm:text-base text-shadow-soft">
                Zones d&apos;intervention: Haute Savoie
              </p>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3">
              {SL74_QUICK_ACTIONS.map((action) => (
                <a
                  key={action.id}
                  href={action.href}
                  aria-label={action.id === "phone" ? "Appeler" : action.id === "whatsapp" ? "WhatsApp" : "Email"}
                  target={action.id === "whatsapp" ? "_blank" : undefined}
                  rel={action.id === "whatsapp" ? "noreferrer" : undefined}
                  className="group inline-flex items-center justify-center transition-all duration-200 hover:-translate-y-[2px] hover:opacity-80 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <Icon name={action.iconKey} className="h-7 w-7 text-white" />
                </a>
              ))}
            </div>

            {/* Card Appeler — Devis gratuit */}
            <a
              href={`tel:${SL74_PHONE}`}
              className="block w-full"
              aria-label="Appeler pour un devis gratuit"
            >
              <div className="animate-call-shake-burst relative w-full overflow-hidden rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-[1px] active:scale-[0.99]">
                <div className="relative h-[155px] w-full overflow-hidden rounded-t-2xl sm:h-[178px]">
                  <Image
                    src="/sl74/LOGO.jpg"
                    alt=""
                    fill
                    className="object-cover object-[center_25%]"
                    sizes="(max-width: 420px) 100vw, 420px"
                    aria-hidden
                  />
                </div>
                <div className="flex h-[60px] w-full items-center justify-center gap-2.5 rounded-b-2xl border-t border-white/10 bg-white/15 px-4 backdrop-blur-xl transition-all duration-200 hover:bg-white/20 active:scale-[0.99]">
                  <Icon name="phone" className="h-6 w-6 shrink-0 text-white" />
                  <span className="text-base font-medium text-white sm:text-lg">
                    Appeler — Devis gratuit
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* Liste des catégories dépliables */}
          <div className="flex flex-col gap-3">
            {categories.map((category) => (
              <AccordionCategoryRow
                key={category.slug}
                category={category}
                isExpanded={expandedSlugs.has(category.slug)}
                onToggle={() => toggleExpanded(category.slug)}
              />
            ))}
          </div>

          {/* Made by Publox — tout en bas */}
          <MadeByPublox />
        </div>
      </PhoneFrame>
    </BackgroundShell>
  );
}
