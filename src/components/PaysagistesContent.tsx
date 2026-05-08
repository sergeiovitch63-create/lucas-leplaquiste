"use client";

import { useState } from "react";
import Image from "next/image";
import { BackgroundShell } from "./BackgroundShell";
import { PhoneFrame } from "./PhoneFrame";
import { Icon } from "./icons";
import { MadeByPublox } from "./MadeByPublox";
import type { PaysagistesCategory } from "@/data/paysagistes-categories";

const PHONE_DISPLAY = "06 12 34 56 78";
const PHONE = "+33612345678";
const WHATSAPP = "https://wa.me/33612345678";
const EMAIL = "contact@jardinsetpaysages.fr";

const QUICK_ACTIONS = [
  { id: "phone", href: `tel:${PHONE}`, iconKey: "phone" as const },
  { id: "whatsapp", href: WHATSAPP, iconKey: "whatsapp" as const },
  { id: "email", href: `mailto:${EMAIL}`, iconKey: "email" as const },
];

const THUMBNAILS: Record<string, string> = {
  "tonte-entretien":
    "https://images.unsplash.com/photo-1595228702420-f6ea0b27c2b5?w=200&q=80",
  "taille-haies":
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&q=80",
  "creation-amenagement":
    "https://images.unsplash.com/photo-1467293622093-9f15c96be70f?w=200&q=80",
  "elagage-abattage":
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&q=80",
  "massifs-plantation":
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=200&q=80",
  "terrassement-allee":
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80",
  "nettoyage-printemps":
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&q=80",
  avis: "https://images.unsplash.com/photo-1467293622093-9f15c96be70f?w=200&q=80",
};

function Logo({ className, title = "Jardins & Paysages" }: { className?: string; title?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 40"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="20" r="12" fill="none" stroke="#3a7d44" strokeWidth="2" />
      <path
        d="M18 8 Q24 14 18 20 Q12 14 18 8Z"
        fill="#3a7d44"
      />
      <path
        d="M8 20 Q14 14 20 20 Q14 26 8 20Z"
        fill="#5aaa6a"
        opacity="0.8"
      />
      <path
        d="M18 20 Q24 26 18 32 Q12 26 18 20Z"
        fill="#3a7d44"
        opacity="0.7"
      />
      <text
        x="36"
        y="17"
        fill="#3a7d44"
        fontSize="11"
        fontFamily="Georgia, serif"
        fontWeight="700"
        letterSpacing="0.5"
      >
        JARDINS
      </text>
      <text
        x="36"
        y="30"
        fill="#5aaa6a"
        fontSize="9"
        fontFamily="Georgia, serif"
        fontWeight="400"
        letterSpacing="1.5"
      >
        &amp; PAYSAGES
      </text>
    </svg>
  );
}

function buildWhatsAppHref(categoryLabel: string): string {
  const message = encodeURIComponent(
    `Bonjour, je souhaite un devis pour ${categoryLabel.toLowerCase()}.`
  );
  return `${WHATSAPP}?text=${message}`;
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

function CategoryExpandableContent({ category }: { category: PaysagistesCategory }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const hasImages = category.images.length > 0;
  const visibleImages = showAllPhotos ? category.images : category.images.slice(0, 4);
  const hasMorePhotos = category.images.length > 4;
  const whatsappHref = buildWhatsAppHref(category.label);
  const showDevis = !category.hideDevis;

  if (category.reviews && category.reviews.length > 0) {
    return (
      <div className="space-y-4 pt-2 pb-1">
        <ul className="space-y-3">
          {category.reviews.map((r, i) => (
            <li
              key={i}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-medium text-white/95">{r.author}</span>
                {r.rating != null && (
                  <span className="text-sm text-amber-300">{"★".repeat(r.rating)}</span>
                )}
              </div>
              <p className="text-base leading-relaxed text-white/85">{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-2 pb-1">
      {category.body.map((p, i) => (
        <p key={i} className="text-base leading-relaxed text-white/85">
          {p}
        </p>
      ))}

      {category.whyUs.length > 0 && (
        <section>
          <h4 className="mb-2 text-base font-semibold text-white/95">
            Pourquoi nous choisir
          </h4>
          <ul className="space-y-2">
            {category.whyUs.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-base text-white/85">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {hasImages && !category.hideGallery && (
        <section>
          <h4 className="mb-2 text-base font-semibold text-white/95">Galerie</h4>
          <div className="grid grid-cols-2 gap-2">
            {visibleImages.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white/10"
              >
                <Image
                  src={src}
                  alt={`Photo de realisation: ${category.label}`}
                  fill
                  unoptimized={true}
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
          <h4 className="mb-2 text-base font-semibold text-white/95">
            Questions frequentes
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
  category: PaysagistesCategory;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const thumbnailSrc = THUMBNAILS[category.slug] || category.images[0];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-[60px] w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-all duration-200 hover:bg-white/10 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? `Fermer ${category.label}` : `Ouvrir ${category.label}`}
      >
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/10 ring-1 ring-white/15">
          <Image
            src={thumbnailSrc}
            alt={`Miniature categorie: ${category.label}`}
            fill
            unoptimized={true}
            className="object-cover"
            sizes="40px"
            aria-hidden
          />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <span className="block text-center text-lg font-semibold leading-tight text-white sm:text-xl">
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

interface PaysagistesContentProps {
  categories: PaysagistesCategory[];
}

export function PaysagistesContent({ categories }: PaysagistesContentProps) {
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
    <BackgroundShell backgroundImage="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80">
      <PhoneFrame>
        <div className="space-y-7 p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/10 shadow-lg ring-2 ring-white/20">
              <Logo className="h-9 w-[112px]" title="Logo Jardins & Paysages" />
            </div>
            <div className="text-center">
              <h1 className="text-shadow-soft text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Jardins &amp; Paysages
              </h1>
              <p className="text-shadow-soft mt-1.5 text-sm text-white/80 sm:text-base">
                Zones d&apos;intervention: Loire-Atlantique
              </p>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3">
              {QUICK_ACTIONS.map((action) => (
                <a
                  key={action.id}
                  href={action.href}
                  aria-label={
                    action.id === "phone"
                      ? "Appeler"
                      : action.id === "whatsapp"
                      ? "WhatsApp"
                      : "Email"
                  }
                  target={action.id !== "phone" ? "_blank" : undefined}
                  rel={action.id !== "phone" ? "noreferrer" : undefined}
                  className="group inline-flex items-center justify-center transition-all duration-200 hover:-translate-y-[2px] hover:opacity-80 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <Icon name={action.iconKey} className="h-7 w-7 text-white" />
                </a>
              ))}
            </div>

            <a
              href={`tel:${PHONE}`}
              className="block w-full"
              aria-label="Appeler pour un devis gratuit"
            >
              <div className="animate-call-shake-burst relative w-full overflow-hidden rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-[1px] active:scale-[0.99]">
                <div className="flex h-[155px] w-full items-center justify-center overflow-hidden rounded-t-2xl bg-white/10 sm:h-[178px]">
                  <Logo
                    className="h-12 w-[140px]"
                    title="Logo Jardins & Paysages dans la carte d'appel"
                  />
                </div>
                <div className="flex h-[60px] w-full items-center justify-center gap-2.5 rounded-b-2xl border-t border-white/10 bg-white/15 px-4 backdrop-blur-xl transition-all duration-200 hover:bg-white/20 active:scale-[0.99]">
                  <Icon name="phone" className="h-6 w-6 shrink-0 text-white" />
                  <span className="text-base font-medium text-white sm:text-lg">
                    Appeler - Devis gratuit ({PHONE_DISPLAY})
                  </span>
                </div>
              </div>
            </a>
          </div>

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

          <MadeByPublox />
        </div>
      </PhoneFrame>
    </BackgroundShell>
  );
}
