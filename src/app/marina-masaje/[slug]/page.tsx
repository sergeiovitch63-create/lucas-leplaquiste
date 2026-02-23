import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackgroundShell } from "@/components/BackgroundShell";
import { PhoneFrame } from "@/components/PhoneFrame";
import { MarinaLanguageAccordion } from "@/components/MarinaLanguageAccordion";
import { MadeByPublox } from "@/components/MadeByPublox";
import {
  marinaMassageCategories,
  getMarinaMassageBySlug,
} from "@/data/marina-massages";
import {
  marinaDefaultLocale,
  getMarinaTranslation,
  getMarinaCategoryTranslation,
  type MarinaLocale,
} from "@/lib/marina-i18n";

const MARINA_IMAGES_BASE = "/api/marina-image";
const MARINA_BACKGROUND_VIDEO = "/media/fond-ecran-marina-masaje.MP4";

const VALID_LOCALES: MarinaLocale[] = ["fr", "en", "ru", "es", "de", "it"];
function parseLocale(value: string | undefined): MarinaLocale {
  if (value && VALID_LOCALES.includes(value as MarinaLocale)) return value as MarinaLocale;
  return marinaDefaultLocale;
}

export async function generateStaticParams() {
  return marinaMassageCategories.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { lang } = await searchParams;
  const locale = parseLocale(lang);
  const massage = getMarinaMassageBySlug(slug);
  if (!massage) return { title: "Marina Masaje" };
  const title = getMarinaCategoryTranslation(locale, slug, "title") || massage.title;
  const description = getMarinaCategoryTranslation(locale, slug, "description") || massage.description;
  return {
    title: `${title} | Marina Masaje`,
    description,
  };
}

export default async function MarinaMassageCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const locale = parseLocale(lang);
  const massage = getMarinaMassageBySlug(slug);
  if (!massage) notFound();

  const hasImages = massage.images.length > 0;
  const title = getMarinaCategoryTranslation(locale, slug, "title") || massage.title;
  const description = getMarinaCategoryTranslation(locale, slug, "description") || massage.description;
  const backLabel = getMarinaTranslation(locale, "back");
  const galleryLabel = getMarinaTranslation(locale, "gallery");
  const faqLabel = getMarinaTranslation(locale, "faq");
  const photosPlaceholder = getMarinaTranslation(locale, "photos-placeholder");
  const backHref = locale !== marinaDefaultLocale ? `/marina-masaje?lang=${locale}` : "/marina-masaje";

  return (
    <BackgroundShell backgroundVideo={MARINA_BACKGROUND_VIDEO}>
      <PhoneFrame>
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-3">
              <Link
                href={backHref}
                className="inline-flex items-center gap-1 text-xs font-medium text-white/80 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent shrink-0"
                aria-label={`${backLabel} Marina Masaje`}
              >
                <span aria-hidden>←</span>
                <span>{backLabel}</span>
              </Link>
              <div className="w-24 shrink-0">
                <Suspense fallback={null}>
                  <MarinaLanguageAccordion currentLocale={locale} />
                </Suspense>
              </div>
            </div>

                <div className="space-y-2">
                  <h1 className="text-xl font-semibold tracking-tight text-white text-shadow-soft sm:text-2xl">
                    {title}
                  </h1>
                  <p className="text-sm font-medium text-white/90">
                    {massage.durationMinutes} MIN – {massage.priceEur}€
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-white/85">{description}</p>

                {/* Images / Gallery */}
                <section aria-labelledby="gallery-heading">
                  <h2 id="gallery-heading" className="text-base font-semibold text-white text-shadow-soft mb-3">
                    {galleryLabel}
                  </h2>
                  {hasImages ? (
                    <div className="grid grid-cols-2 gap-3">
                      {massage.images.map((src, i) => {
                        const imageSrc = src.startsWith("/") ? src : `${MARINA_IMAGES_BASE}/${slug}/${src}`;
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
                    <div className="rounded-xl border border-dashed border-white/20 bg-white/5 py-10 text-center">
                      <p className="text-xs text-white/60 sm:text-sm">{photosPlaceholder}</p>
                    </div>
                  )}
                </section>

                {/* FAQ */}
                {massage.faq.length > 0 && (
                  <section aria-labelledby="faq-heading">
                    <h2 id="faq-heading" className="text-base font-semibold text-white text-shadow-soft mb-3">
                      {faqLabel}
                    </h2>
                    <ul className="space-y-4">
                      {massage.faq.map((item, i) => {
                        const q = getMarinaCategoryTranslation(locale, slug, `faq.${i}.q`) || item.question;
                        const a = getMarinaCategoryTranslation(locale, slug, `faq.${i}.a`) || item.answer;
                        return (
                          <li key={i} className="rounded-xl border border-white/10 bg-white/5 p-3">
                            <p className="text-sm font-medium text-white/95">{q}</p>
                            <p className="mt-1.5 text-xs leading-relaxed text-white/80">{a}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                )}

                {/* Made by Publox — tout en bas */}
                <MadeByPublox />
              </div>
            </div>
          </PhoneFrame>
    </BackgroundShell>
  );
}
