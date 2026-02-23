import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackgroundShell } from "@/components/BackgroundShell";
import { PhoneFrame } from "@/components/PhoneFrame";
import { TallerLanguageAccordion } from "@/components/TallerLanguageAccordion";
import { MadeByPublox } from "@/components/MadeByPublox";
import {
  tallerServiceCategories,
  getTallerServiceBySlug,
} from "@/data/taller-el-salon-categories";
import {
  tallerDefaultLocale,
  getTallerTranslation,
  getTallerCategoryTranslation,
  type TallerLocale,
} from "@/lib/taller-i18n";

const VALID_LOCALES: TallerLocale[] = ["fr", "en", "es"];
function parseLocale(value: string | undefined): TallerLocale {
  if (value && VALID_LOCALES.includes(value as TallerLocale)) return value as TallerLocale;
  return tallerDefaultLocale;
}

export async function generateStaticParams() {
  return tallerServiceCategories.map((s) => ({ slug: s.slug }));
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
  const service = getTallerServiceBySlug(slug);
  if (!service) return { title: "Taller El Salón" };
  const title = getTallerCategoryTranslation(locale, slug, "title") || service.title;
  const description = getTallerCategoryTranslation(locale, slug, "description") || service.description;
  const ogTitle = `${title} | Taller El Salón`;
  const ogImage = "/media/placeholder.svg";

  return {
    title: ogTitle,
    description,
    openGraph: {
      title: ogTitle,
      description,
      type: "website",
      siteName: "Taller El Salón",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
  };
}

export default async function TallerServicePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const locale = parseLocale(lang);
  const service = getTallerServiceBySlug(slug);
  if (!service) notFound();

  const hasImages = service.images.length > 0;
  const title = getTallerCategoryTranslation(locale, slug, "title") || service.title;
  const description = getTallerCategoryTranslation(locale, slug, "description") || service.description;
  const backLabel = getTallerTranslation(locale, "back");
  const galleryLabel = getTallerTranslation(locale, "gallery");
  const faqLabel = getTallerTranslation(locale, "faq");
  const photosPlaceholder = getTallerTranslation(locale, "photos-placeholder");
  const backHref = locale !== tallerDefaultLocale ? `/taller-el-salon?lang=${locale}` : "/taller-el-salon";

  return (
    <BackgroundShell backgroundImage="/media/fond-los.png">
      <PhoneFrame>
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-3">
              <Link
                href={backHref}
                className="inline-flex items-center gap-1 text-xs font-medium text-white/80 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent shrink-0"
                aria-label={`${backLabel} Taller El Salón`}
              >
                <span aria-hidden>←</span>
                <span>{backLabel}</span>
              </Link>
              <div className="w-24 shrink-0">
                <Suspense fallback={null}>
                  <TallerLanguageAccordion currentLocale={locale} />
                </Suspense>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-semibold tracking-tight text-white text-shadow-soft sm:text-2xl">
                {title}
              </h1>
            </div>

            <p className="text-sm leading-relaxed text-white/85">{description}</p>

            <section aria-labelledby="gallery-heading">
              <h2 id="gallery-heading" className="text-base font-semibold text-white text-shadow-soft mb-3">
                {galleryLabel}
              </h2>
              {hasImages ? (
                <div className="grid grid-cols-2 gap-3">
                  {service.images.map((src, i) => {
                    const imageSrc = src.startsWith("http") ? src : src.startsWith("/") ? src : `/media/taller/${slug}/${src}`;
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
                          unoptimized
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

            {service.faq.length > 0 && (
              <section aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-base font-semibold text-white text-shadow-soft mb-3">
                  {faqLabel}
                </h2>
                <ul className="space-y-4">
                  {service.faq.map((item, i) => (
                    <li key={i} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className="text-sm font-medium text-white/95">{item.question}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/80">{item.answer}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <MadeByPublox />
          </div>
        </div>
      </PhoneFrame>
    </BackgroundShell>
  );
}
