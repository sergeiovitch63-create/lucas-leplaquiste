"use client";

import Image from "next/image";
import { Icon } from "./icons";
import type { TallerConfig, TallerLink } from "@/config/taller";
import type { TallerServiceCategory } from "@/data/taller-el-salon-categories";
import {
  getTallerTranslation,
  getTallerCategoryTranslation,
  type TallerLocale,
} from "@/lib/taller-i18n";
import { TallerLanguageAccordion } from "./TallerLanguageAccordion";
import { MadeByPublox } from "./MadeByPublox";

interface TallerElSalonContentProps {
  config: TallerConfig;
  categories: TallerServiceCategory[];
  locale: TallerLocale;
  whatsappHref: string;
}

function ContactCard({
  logoUrl,
  fallbackLogoUrl,
  locale,
  whatsappHref,
}: {
  logoUrl?: string;
  fallbackLogoUrl: string;
  locale: TallerLocale;
  whatsappHref: string;
}) {
  const logoSrc = logoUrl || fallbackLogoUrl;
  const label = getTallerTranslation(locale, "contact");

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      className="block w-full"
      aria-label={`${label} sur WhatsApp`}
    >
      <div className="animate-call-shake-burst relative w-full overflow-hidden rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-[1px] active:scale-[0.99]">
        <div className="relative h-[140px] w-full overflow-hidden rounded-t-2xl bg-black/40 sm:h-[160px]">
          <Image
            src={logoSrc}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 420px) 100vw, 420px"
            aria-hidden
            unoptimized
          />
        </div>
        <div className="flex h-[54px] w-full items-center justify-center rounded-b-2xl border-t border-white/10 bg-black/50 px-4 backdrop-blur-xl transition-all duration-200 hover:bg-black/60 active:scale-[0.99]">
          <span className="text-sm font-medium text-white sm:text-base uppercase">{label}</span>
        </div>
      </div>
    </a>
  );
}

function WorkshopCarousel({
  images,
  locale,
}: {
  images: string[];
  locale: TallerLocale;
}) {
  if (images.length === 0) return null;

  const itemWidth = 280;
  const gap = 12;
  const totalWidth = images.length * itemWidth + (images.length - 1) * gap;
  const heading = getTallerTranslation(locale, "your-garage");

  return (
    <section aria-labelledby="workshop-heading" className="w-full min-w-0 overflow-hidden">
      <h2
        id="workshop-heading"
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
                unoptimized
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
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ChevronUp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

function ServiceExpandableContent({
  category,
  locale,
  whatsappHref,
}: {
  category: TallerServiceCategory;
  locale: TallerLocale;
  whatsappHref: string;
}) {
  const hasImages = category.images.length > 0;
  const description = getTallerCategoryTranslation(locale, category.slug, "description") || category.description;
  const galleryLabel = getTallerTranslation(locale, "gallery");
  const faqLabel = getTallerTranslation(locale, "faq");
  const photosPlaceholder = getTallerTranslation(locale, "photos-placeholder");
  const contactUsLabel = getTallerTranslation(locale, "contact-us");

  return (
    <div className="space-y-4 pt-2 pb-1">
      <p className="text-sm leading-relaxed text-white/85">{description}</p>

      <section>
        <h4 className="text-sm font-semibold text-white/95 mb-2">{galleryLabel}</h4>
        {hasImages ? (
          <div className={category.images.length === 1 ? "flex justify-center" : "grid grid-cols-2 gap-2"}>
            {category.images.map((src, i) => {
              const imageSrc = src.startsWith("http") ? src : src.startsWith("/") ? src : `/media/taller/${category.slug}/${src}`;
              return (
                <div key={i} className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-white/10 ${category.images.length === 1 ? "w-full max-w-[200px]" : ""}`}>
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 420px) 50vw, 200px"
                    unoptimized
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/20 bg-black/30 py-8 text-center">
            <p className="text-xs text-white/60">{photosPlaceholder}</p>
          </div>
        )}
      </section>

      {category.faq.length > 0 && (
        <section>
          <h4 className="text-sm font-semibold text-white/95 mb-2">{faqLabel}</h4>
          <ul className="space-y-3">
            {category.faq.map((item, i) => (
              <li key={i} className="rounded-lg border border-white/10 bg-black/30 p-2.5">
                <p className="text-xs font-medium text-white/95">{item.question}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/75">{item.answer}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="block w-full py-2.5 text-center text-sm font-semibold uppercase tracking-wide text-white bg-black/50 rounded-xl border border-white/20 transition-all duration-200 hover:bg-black/60 hover:border-white/30 active:scale-[0.98]"
        aria-label={contactUsLabel}
      >
        {contactUsLabel}
      </a>
    </div>
  );
}

function AccordionServiceRow({
  link,
  category,
  locale,
  whatsappHref,
}: {
  link: TallerLink;
  category: TallerServiceCategory;
  locale: TallerLocale;
  whatsappHref: string;
}) {
  const hasImage = category.images.length > 0;
  const thumbnailSrc = hasImage
    ? (category.images[0].startsWith("http") ? category.images[0] : category.images[0].startsWith("/") ? category.images[0] : `/media/taller/${category.slug}/${category.images[0]}`)
    : null;
  const title = getTallerCategoryTranslation(locale, category.slug, "title") || link.title;

  return (
    <details className="group rounded-2xl border border-white/10 bg-black/50 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <summary className="flex w-full min-h-[52px] cursor-pointer touch-manipulation select-none list-none items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200 hover:bg-black/30 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent [&::-webkit-details-marker]:hidden">
        {thumbnailSrc ? (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/10 ring-1 ring-white/15">
            <Image src={thumbnailSrc} alt="" fill className="object-cover" sizes="40px" unoptimized aria-hidden />
          </div>
        ) : (
          <Icon name={link.iconKey} className="h-5 w-5 shrink-0 text-white" />
        )}
        <span className="flex-1 text-sm font-medium text-white sm:text-base">{title}</span>
        <span className="shrink-0 text-white/90 transition-transform duration-200 group-open:rotate-180">
          <ChevronDown className="h-5 w-5" />
        </span>
      </summary>
      <div className="border-t border-white/10 bg-black/40 px-4">
        <ServiceExpandableContent category={category} locale={locale} whatsappHref={whatsappHref} />
      </div>
    </details>
  );
}

const TALLER_REVIEWS = [
  { author: "Marie L.", rating: 5, text: "Excellent garage, très professionnel. Ma vidange a été faite rapidement et le personnel est très accueillant. Je recommande vivement !" },
  { author: "Carlos M.", rating: 5, text: "J'ai fait réparer mes freins ici. Travail soigné, prix correct. Je reviendrai sans hésiter pour l'entretien de ma voiture." },
  { author: "Sophie R.", rating: 5, text: "Service impeccable pour le changement de pneus. Équipe sympathique et compétente. Merci pour votre professionnalisme !" },
];

const OPENING_HOURS = [
  { day: "day-mon", hours: "09:00-15:30" },
  { day: "day-tue", hours: "09:00-15:30" },
  { day: "day-wed", hours: "09:00-15:30" },
  { day: "day-thu", hours: "09:00-15:30" },
  { day: "day-fri", hours: "09:00-14:00" },
  { day: "day-sat", hours: "closed" },
  { day: "day-sun", hours: "closed" },
];

function OpeningHours({ locale }: { locale: TallerLocale }) {
  const closedLabel = getTallerTranslation(locale, "closed");
  return (
    <div className="w-full max-w-[200px] mx-auto rounded-xl border border-white/10 bg-black/40 px-3 py-2.5">
      <div className="space-y-1 text-xs text-white/90">
        {OPENING_HOURS.map(({ day, hours }) => (
          <div key={day} className="flex justify-between gap-6">
            <span className="text-white/80 shrink-0">{getTallerTranslation(locale, day)}</span>
            <span className={hours === "closed" ? "text-white/60" : "text-right"}>
              {hours === "closed" ? closedLabel : hours}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsAccordion({ locale }: { locale: TallerLocale }) {
  const heading = getTallerTranslation(locale, "our-reviews");
  return (
    <details open className="group w-full rounded-2xl border border-white/10 bg-black/50 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <summary
        className="flex w-full min-h-[52px] cursor-pointer touch-manipulation select-none list-none items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200 hover:bg-black/30 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent [&::-webkit-details-marker]:hidden"
        aria-label={heading}
      >
        <span className="flex-1 text-sm font-medium text-white sm:text-base">{heading}</span>
        <span className="shrink-0 text-white/90 transition-transform duration-200 group-open:rotate-180">
          <ChevronDown className="h-5 w-5" />
        </span>
      </summary>
      <div className="border-t border-white/10 bg-black/40 px-4 py-3 space-y-4 max-h-[130px] overflow-y-auto">
        {TALLER_REVIEWS.map((review, i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-black/30 p-2.5">
            <p className="text-xs font-medium text-white/95 mb-1">
              {review.author} — {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
            </p>
            <p className="text-sm leading-relaxed text-white/85">{review.text}</p>
          </div>
        ))}
      </div>
    </details>
  );
}

function SimpleLinkButton({ link }: { link: TallerLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl block"
      aria-label={link.title}
    >
      <div className="flex w-full min-h-[52px] items-center justify-center gap-3 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/60 hover:border-white/15 active:scale-[0.98]">
        <Icon name={link.iconKey} className="h-5 w-5 shrink-0 text-white" />
        <span className="flex flex-col items-center text-center">
          <span className="text-sm font-medium text-white sm:text-base">{link.title}</span>
          {link.subtitle && <span className="text-xs text-white/80 mt-0.5">{link.subtitle}</span>}
        </span>
      </div>
    </a>
  );
}

export function TallerElSalonContent({ config, categories, locale, whatsappHref }: TallerElSalonContentProps) {
  const { brandName, location, avatarUrl, contactCardLogoUrl, carouselImages, quickActions, links } = config;
  const ourServicesLabel = getTallerTranslation(locale, "our-services");

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex w-full items-start justify-end">
            <div className="w-24 shrink-0">
              <TallerLanguageAccordion currentLocale={locale} />
            </div>
          </div>
          <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-black/40 shadow-lg ring-2 ring-white/20">
            <Image
              src={avatarUrl}
              alt={brandName}
              fill
              sizes="80px"
              className="object-cover scale-110"
              unoptimized
            />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl text-shadow-soft">{brandName}</h1>
            <p className="mt-1 text-xs text-white/80 sm:text-sm text-shadow-soft">{location}</p>
          </div>
          <OpeningHours locale={locale} />
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

          <ContactCard
            logoUrl={contactCardLogoUrl}
            fallbackLogoUrl={avatarUrl}
            locale={locale}
            whatsappHref={whatsappHref}
          />

          <ReviewsAccordion locale={locale} />
        </div>

        <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-white/95 sm:text-base">
          {ourServicesLabel}
        </h2>

        <div className="flex flex-col gap-3">
          {links.map((link) => {
            if (link.type === "internal") {
              const category = categories.find((c) => c.slug === link.id);
              if (!category) return null;
              return (
                <AccordionServiceRow
                  key={link.id}
                  link={link}
                  category={category}
                  locale={locale}
                  whatsappHref={whatsappHref}
                />
              );
            }
            return <SimpleLinkButton key={link.id} link={link} />;
          })}
        </div>

        <WorkshopCarousel images={carouselImages} locale={locale} />

        <MadeByPublox />
      </div>
    </div>
  );
}
