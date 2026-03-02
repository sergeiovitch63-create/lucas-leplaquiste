"use client";

import Image from "next/image";
import { Icon } from "./icons";
import type { AutoaufbereitungConfig } from "@/config/autoaufbereitung";
import type { AutoaufbereitungServiceCategory } from "@/data/autoaufbereitung-categories";
import {
  getAutoaufbereitungTranslation,
  getAutoaufbereitungCategoryTranslation,
  getAutoaufbereitungCategoryItems,
  getAutoaufbereitungFaq,
  type AutoaufbereitungLocale,
} from "@/lib/autoaufbereitung-i18n";
import { AutoaufbereitungLanguageAccordion } from "./AutoaufbereitungLanguageAccordion";
import { MadeByPublox } from "./MadeByPublox";

interface AutoaufbereitungContentProps {
  config: AutoaufbereitungConfig;
  locale: AutoaufbereitungLocale;
}

const AUTO_OPENING_HOURS = [
  { day: "mon", hours: "09:00-17:00" },
  { day: "tue", hours: "09:00-17:00" },
  { day: "wed", hours: "09:00-17:00" },
  { day: "thu", hours: "09:00-17:00" },
  { day: "fri", hours: "09:00-17:00" },
  { day: "sat", hours: "09:00-17:00" },
  { day: "sun", hours: "closed" },
];

function OpeningHours({ locale }: { locale: AutoaufbereitungLocale }) {
  const labels: Record<
    AutoaufbereitungLocale,
    { days: string[]; closed: string }
  > = {
    de: {
      days: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
      closed: "Geschlossen",
    },
    en: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      closed: "Closed",
    },
    es: {
      days: ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"],
      closed: "Cerrado",
    },
    ru: {
      days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      closed: "Закрыто",
    },
  };

  const { days, closed } = labels[locale];

  return (
    <div className="w-full max-w-[220px] mx-auto rounded-xl border border-white/10 bg-black/40 px-3 py-2.5">
      <div className="space-y-1 text-xs text-white/90">
        {AUTO_OPENING_HOURS.map(({ day, hours }, index) => (
          <div key={day} className="flex justify-between gap-6">
            <span className="text-white/80 shrink-0">{days[index]}</span>
            <span className={hours === "closed" ? "text-white/60" : "text-right"}>
              {hours === "closed" ? closed : hours}
            </span>
          </div>
        ))}
      </div>
    </div>
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

function ContactCard({
  logoUrl,
  fallbackLogoUrl,
  whatsappHref,
  locale,
}: {
  logoUrl?: string;
  fallbackLogoUrl: string;
  whatsappHref: string;
  locale: AutoaufbereitungLocale;
}) {
  const logoSrc = logoUrl || fallbackLogoUrl;
  const label = getAutoaufbereitungTranslation(locale, "contact-whatsapp");

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      className="block w-full"
      aria-label={label}
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
          <span className="text-sm font-medium text-white sm:text-base uppercase">
            {label}
          </span>
        </div>
      </div>
    </a>
  );
}

function AccordionServiceRow({
  category,
  whatsappHref,
  locale,
  faqsForCategory,
}: {
  category: AutoaufbereitungServiceCategory;
  whatsappHref: string;
  locale: AutoaufbereitungLocale;
  faqsForCategory?: { question: string; answer: string }[];
}) {
  const thumbnailSrc = category.images[0] || "/media/placeholder.svg";
  const title =
    getAutoaufbereitungCategoryTranslation(locale, category.slug, "title") ||
    category.title;
  const description =
    getAutoaufbereitungCategoryTranslation(
      locale,
      category.slug,
      "description"
    ) || category.description;
  const items = getAutoaufbereitungCategoryItems(locale, category.slug);
  const displayItems = items.length > 0 ? items : category.items ?? [];
  const contactLabel = getAutoaufbereitungTranslation(
    locale,
    "contact-whatsapp"
  );
  const galleryLabel = getAutoaufbereitungTranslation(locale, "gallery");
  const faqLabel = getAutoaufbereitungTranslation(locale, "faq");
  const photosPlaceholder = getAutoaufbereitungTranslation(
    locale,
    "photos-placeholder"
  );
  const fallbackFaqItems = getAutoaufbereitungFaq(locale, category.slug);
  const faqItems = faqsForCategory && faqsForCategory.length > 0 ? faqsForCategory : fallbackFaqItems;
  const hasImages = category.images.length > 0;

  return (
    <details className="group rounded-2xl border border-white/10 bg-black/50 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <summary className="flex w-full min-h-[52px] cursor-pointer touch-manipulation select-none list-none items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200 hover:bg-black/30 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent [&::-webkit-details-marker]:hidden">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/10 ring-1 ring-white/15">
          <Image
            src={thumbnailSrc}
            alt=""
            fill
            className="object-cover"
            sizes="40px"
            unoptimized
            aria-hidden
          />
        </div>
        <span className="flex-1 text-sm font-medium text-white sm:text-base">
          {title}
        </span>
        <span className="shrink-0 text-white/90 transition-transform duration-200 group-open:rotate-180">
          <ChevronDown className="h-5 w-5" />
        </span>
      </summary>
      <div className="border-t border-white/10 bg-black/40 px-4">
        <div className="space-y-4 pt-4 pb-4">
          <p className="text-sm leading-relaxed text-white/85">{description}</p>
          {displayItems.length > 0 && (
            <ul className="space-y-1.5 text-sm text-white/80">
              {displayItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-white/60">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          <section>
            <h4 className="text-sm font-semibold text-white/95 mb-2">
              {galleryLabel}
            </h4>
            {hasImages ? (
              <div
                className={
                  category.images.length === 1
                    ? "flex justify-center"
                    : "grid grid-cols-2 gap-2"
                }
              >
                {category.images.map((src, i) => {
                  const imageSrc =
                    src.startsWith("http") || src.startsWith("/")
                      ? src
                      : `/media/autoaufbereitung/${category.slug}/${src}`;
                  return (
                    <div
                      key={i}
                      className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-white/10 ${
                        category.images.length === 1
                          ? "w-full max-w-[200px]"
                          : ""
                      }`}
                    >
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

          {faqItems.length > 0 && (
            <section>
              <h4 className="text-sm font-semibold text-white/95 mb-2">
                {faqLabel}
              </h4>
              <ul className="space-y-3">
                {faqItems.map((item, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-white/10 bg-black/30 p-2.5"
                  >
                    <p className="text-xs font-medium text-white/95">
                      {item.question}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/75">
                      {item.answer}
                    </p>
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
            aria-label={contactLabel}
          >
            {contactLabel}
          </a>
        </div>
      </div>
    </details>
  );
}

function LocationCard({
  address,
  mapsHref,
  locale,
}: {
  address: string;
  mapsHref: string;
  locale: AutoaufbereitungLocale;
}) {
  const routeLabel = getAutoaufbereitungTranslation(locale, "route");
  return (
    <a
      href={mapsHref}
      target="_blank"
      rel="noreferrer"
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl"
      aria-label={routeLabel}
    >
      <div className="flex w-full min-h-[52px] flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/60 hover:border-white/15 active:scale-[0.98]">
        <div className="flex items-center gap-2">
          <Icon name="map" className="h-5 w-5 shrink-0 text-white" />
          <span className="text-sm font-medium text-white sm:text-base">{routeLabel}</span>
        </div>
        <span className="text-xs text-white/80">{address}</span>
      </div>
    </a>
  );
}

export function AutoaufbereitungContent({ config, locale }: AutoaufbereitungContentProps) {
  const {
    brandName,
    location,
    avatarUrl,
    contactCardLogoUrl,
    quickActions,
    whatsappHref,
    mapsHref,
    address,
    phone,
    categories,
    faqs,
    uiLabels,
  } = config;
  const t = (key: string) =>
    uiLabels?.[locale]?.[key] ?? getAutoaufbereitungTranslation(locale, key);
  const ourServicesLabel = t("our-services");

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex w-full items-start justify-end">
            <div className="w-24 shrink-0">
              <AutoaufbereitungLanguageAccordion currentLocale={locale} />
            </div>
          </div>
          <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white shadow-lg ring-2 ring-white/20">
            <Image
              src={avatarUrl}
              alt={brandName}
              fill
              sizes="80px"
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl text-shadow-soft">
              {brandName}
            </h1>
            <p className="mt-1 text-xs text-white/80 sm:text-sm text-shadow-soft">
              {location}
            </p>
            <p className="mt-2 text-sm font-medium text-white text-shadow-soft">{phone}</p>
          </div>

          <OpeningHours locale={locale} />

          <div className="flex items-center justify-center gap-3">
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
            whatsappHref={whatsappHref}
            locale={locale}
          />
        </div>

        <LocationCard address={address} mapsHref={mapsHref} locale={locale} />

        <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-white/95 sm:text-base">
          {ourServicesLabel}
        </h2>

        <div className="flex flex-col gap-3">
          {categories.map((category, index) => {
            const prevSection = index > 0 ? categories[index - 1]?.section : null;
            const showSectionHeader =
              category.section && category.section !== prevSection;
            const sectionKey =
              category.section === "Detailing"
                ? "section-detailing"
                : category.section === "Restoration"
                  ? "section-restoration"
                  : category.section === "Paintless Dent Repair (PDR)"
                    ? "section-pdr"
                    : null;

            return (
              <div key={category.slug} className="flex flex-col gap-3">
                {showSectionHeader && sectionKey && (
                  <h3 className="text-center text-xs font-semibold uppercase tracking-wider text-white/90 sm:text-sm pt-1">
                    {getAutoaufbereitungTranslation(locale, sectionKey)}
                  </h3>
                )}
                <AccordionServiceRow
                  category={category}
                  whatsappHref={whatsappHref}
                  locale={locale}
                  faqsForCategory={faqs?.[category.slug]}
                />
              </div>
            );
          })}
        </div>

        <MadeByPublox />
      </div>
    </div>
  );
}
