"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "./icons";
import type { MarinaConfig, MarinaLink } from "@/config/marina";
import type { MarinaMassageCategory } from "@/data/marina-massages";
import {
  getMarinaTranslation,
  getMarinaCategoryTranslation,
  type MarinaLocale,
} from "@/lib/marina-i18n";
import { MarinaLanguageAccordion } from "./MarinaLanguageAccordion";
import { MadeByPublox } from "./MadeByPublox";

/** Galerie : chemin direct /media/ (comme votre masseuse) ou sous dossier via API */
const MARINA_IMAGES_BASE = "/api/marina-image";

interface MarinaMasajeContentProps {
  config: MarinaConfig;
  categories: MarinaMassageCategory[];
  locale: MarinaLocale;
}

/** Card "Reserve now" style Lucas, animée (vibration), avec zone logo */
function ReserveNowCard({
  logoUrl,
  fallbackLogoUrl,
  locale,
}: {
  logoUrl?: string;
  fallbackLogoUrl: string;
  locale: MarinaLocale;
}) {
  const logoSrc = logoUrl || fallbackLogoUrl;
  const label = getMarinaTranslation(locale, "reserve-now");

  return (
    <a
      href="https://wa.me/34614202296"
      target="_blank"
      rel="noreferrer"
      className="block w-full"
      aria-label={`${label} on WhatsApp`}
    >
      <div className="animate-call-shake-burst relative w-full overflow-hidden rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-[1px] active:scale-[0.99]">
        <div className="relative h-[140px] w-full overflow-hidden rounded-t-2xl bg-white/10 sm:h-[160px]">
          <Image
            src={logoSrc}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 420px) 100vw, 420px"
            aria-hidden
          />
        </div>
        <div className="flex h-[54px] w-full items-center justify-center rounded-b-2xl border-t border-white/10 bg-white/15 px-4 backdrop-blur-xl transition-all duration-200 hover:bg-white/20 active:scale-[0.99]">
          <span className="text-sm font-medium text-white sm:text-base uppercase">
            {label}
          </span>
        </div>
      </div>
    </a>
  );
}

/** Carrousel "Your Masseuse" — défilement auto gauche → droite via animation CSS */
function MasseuseCarousel({
  images,
  locale,
}: {
  images: string[];
  locale: MarinaLocale;
}) {
  if (images.length === 0) return null;

  const itemWidth = 280;
  const gap = 12;
  const totalWidth = images.length * itemWidth + (images.length - 1) * gap;
  const heading = getMarinaTranslation(locale, "your-masseuse");

  return (
    <section aria-labelledby="your-masseuse-heading" className="w-full min-w-0 overflow-hidden">
      <h2
        id="your-masseuse-heading"
        className="text-center text-sm font-semibold uppercase tracking-wide text-white/95 sm:text-base mb-3"
      >
        {heading}
      </h2>
      <div className="relative h-44 w-full overflow-hidden">
        <div
          className="absolute left-0 top-0 flex h-full gap-3 py-2"
          style={{
            width: totalWidth * 2,
            animation: "marina-carousel-scroll 25s linear infinite",
          }}
        >
          {[...images, ...images].map((src, i) => (
            <div
              key={i}
              className="relative h-full w-[280px] shrink-0 overflow-hidden rounded-xl bg-white/10"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
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

function CategoryExpandableContent({
  category,
  locale,
}: {
  category: MarinaMassageCategory;
  locale: MarinaLocale;
}) {
  const hasImages = category.images.length > 0;
  const description = getMarinaCategoryTranslation(locale, category.slug, "description") || category.description;
  const galleryLabel = getMarinaTranslation(locale, "gallery");
  const faqLabel = getMarinaTranslation(locale, "faq");
  const photosPlaceholder = getMarinaTranslation(locale, "photos-placeholder");

  return (
    <div className="space-y-4 pt-2 pb-1">
      <p className="text-sm font-medium text-white/90">
        {category.durationMinutes} MIN – {category.priceEur}€
      </p>
      <p className="text-sm leading-relaxed text-white/85">{description}</p>

      <section>
        <h4 className="text-sm font-semibold text-white/95 mb-2">{galleryLabel}</h4>
        {hasImages ? (
          <div className="grid grid-cols-2 gap-2">
            {category.images.map((src, i) => {
              const imageSrc = src.startsWith("/") ? src : `${MARINA_IMAGES_BASE}/${category.slug}/${src}`;
              return (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white/10"
                >
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 420px) 50vw, 200px"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/20 bg-white/5 py-8 text-center">
            <p className="text-xs text-white/60">{photosPlaceholder}</p>
          </div>
        )}
      </section>

      {category.faq.length > 0 && (
        <section>
          <h4 className="text-sm font-semibold text-white/95 mb-2">{faqLabel}</h4>
          <ul className="space-y-3">
            {category.faq.map((item, i) => {
              const q = getMarinaCategoryTranslation(locale, category.slug, `faq.${i}.q`) || item.question;
              const a = getMarinaCategoryTranslation(locale, category.slug, `faq.${i}.a`) || item.answer;
              return (
                <li key={i} className="rounded-lg border border-white/10 bg-white/5 p-2.5">
                  <p className="text-xs font-medium text-white/95">{q}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/75">{a}</p>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}

function AccordionCategoryRow({
  link,
  category,
  locale,
  isExpanded,
  onToggle,
}: {
  link: MarinaLink;
  category: MarinaMassageCategory;
  locale: MarinaLocale;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const hasImage = category.images.length > 0;
  const thumbnailSrc = hasImage
    ? (category.images[0].startsWith("/")
        ? category.images[0]
        : `${MARINA_IMAGES_BASE}/${category.slug}/${category.images[0]}`)
    : null;
  const title = getMarinaCategoryTranslation(locale, category.slug, "title") || link.title;
  const closeLabel = getMarinaTranslation(locale, "close");
  const openLabel = getMarinaTranslation(locale, "open");

  return (
    <div className="rounded-2xl border border-white/15 bg-white/20 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full min-h-[52px] items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200 hover:bg-white/10 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? `${closeLabel} ${title}` : `${openLabel} ${title}`}
      >
        {thumbnailSrc ? (
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
        ) : (
          <Icon name={link.iconKey} className="h-5 w-5 shrink-0 text-white" />
        )}
        <span className="flex-1 text-sm font-medium text-white sm:text-base">
          {title}
        </span>
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
          <CategoryExpandableContent category={category} locale={locale} />
        </div>
      )}
    </div>
  );
}

function SimpleLinkButton({ link }: { link: MarinaLink }) {
  const content = (
    <div className="flex w-full min-h-[52px] items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/20 px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/28 hover:border-white/25 active:scale-[0.98]">
      <Icon name={link.iconKey} className="h-5 w-5 shrink-0 text-white" />
      <span className="flex flex-col items-center text-center">
        <span className="text-sm font-medium text-white sm:text-base">{link.title}</span>
        {link.subtitle && (
          <span className="text-xs text-white/80 mt-0.5">{link.subtitle}</span>
        )}
      </span>
    </div>
  );

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl block"
      aria-label={link.title}
    >
      {content}
    </a>
  );
}

export function MarinaMasajeContent({
  config,
  categories,
  locale,
}: MarinaMasajeContentProps) {
  const [expandedSlugs, setExpandedSlugs] = useState<Set<string>>(new Set());

  const toggleExpanded = (slug: string) => {
    setExpandedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const { brandName, location, avatarUrl, reserveCardLogoUrl, masseuseCarouselImages, quickActions, links } = config;
  const ourServicesLabel = getMarinaTranslation(locale, "our-services");

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex w-full items-start justify-end">
            <div className="w-24 shrink-0">
              <MarinaLanguageAccordion currentLocale={locale} />
            </div>
          </div>
          <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10 shadow-lg ring-2 ring-white/20">
            <Image
              src={avatarUrl}
              alt={brandName}
              fill
              sizes="80px"
              className="object-cover scale-150"
            />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl text-shadow-soft">
              {brandName}
            </h1>
            <p className="mt-1 text-xs text-white/80 sm:text-sm text-shadow-soft">
              {location}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-center gap-3">
            {quickActions.map((action) => (
              <a
                key={action.id}
                href={action.href}
                aria-label={action.title}
                target={action.openInNewTab ? "_blank" : undefined}
                rel={action.openInNewTab ? "noreferrer" : undefined}
                className="group inline-flex items-center justify-center transition-all duration-200 hover:-translate-y-[2px] hover:opacity-80 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <Icon name={action.iconKey} className="h-7 w-7 text-white" />
              </a>
            ))}
          </div>

          {/* Reserve now card (style Lucas, animée) — en dessous des icônes */}
          <ReserveNowCard
            logoUrl={reserveCardLogoUrl}
            fallbackLogoUrl={avatarUrl}
            locale={locale}
          />
        </div>

        {/* Titre avant la liste des services */}
        <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-white/95 sm:text-base">
          {ourServicesLabel}
        </h2>

        {/* List: catégories dépliables */}
        <div className="flex flex-col gap-3">
          {links.map((link) => {
            if (link.type === "internal") {
              const category = categories.find((c) => c.slug === link.id);
              if (!category) return null;
              return (
                <AccordionCategoryRow
                  key={link.id}
                  link={link}
                  category={category}
                  locale={locale}
                  isExpanded={expandedSlugs.has(link.id)}
                  onToggle={() => toggleExpanded(link.id)}
                />
              );
            }
            return <SimpleLinkButton key={link.id} link={link} />;
          })}
        </div>

        {/* Your Masseuse — en bas, après Maderotherapy, défilement auto gauche → droite */}
        <MasseuseCarousel images={masseuseCarouselImages} locale={locale} />

        {/* Made by Publox — tout en bas */}
        <MadeByPublox />
      </div>
    </div>
  );
}
