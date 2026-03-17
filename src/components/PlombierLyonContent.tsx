"use client";

import { useState } from "react";
import Image from "next/image";
import { BackgroundShell } from "./BackgroundShell";
import { PhoneFrame } from "./PhoneFrame";
import { Icon } from "./icons";
import { MadeByPublox } from "./MadeByPublox";
import type { Sl74RenovCategory } from "@/data/sl74renov-categories";

const PLOMBIER_LYON_QUICK_ACTIONS = [
  { id: "phone", href: "#", iconKey: "phone" as const },
  { id: "whatsapp", href: "#", iconKey: "whatsapp" as const },
  { id: "email", href: "#", iconKey: "email" as const },
];

interface PlombierLyonContentProps {
  categories: Sl74RenovCategory[];
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
  const showDevis = !category.hideDevis;

  return (
    <div className="space-y-5 pt-3 pb-2">
      {category.reviews && category.reviews.length > 0 ? (
        <ul className="space-y-3">
          {category.reviews.map((r, i) => (
            <li
              key={i}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base font-semibold text-white">
                  {r.author}
                </span>
                {r.rating != null && (
                  <span className="text-base text-amber-300">
                    {"★".repeat(r.rating)}
                  </span>
                )}
              </div>
              <p className="text-lg leading-relaxed text-white/90">{r.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <>
          {category.body.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-white/90">
              {p}
            </p>
          ))}
        </>
      )}

      {category.whyUs.length > 0 && (
        <section>
          <h4 className="text-lg font-semibold text-white mb-3">
            Pourquoi nous choisir
          </h4>
          <ul className="space-y-2">
            {category.whyUs.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-lg text-white/90"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white/90" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {category.faq.length > 0 && (
        <section>
          <h4 className="text-lg font-semibold text-white mb-3">
            Questions fréquentes
          </h4>
          <ul className="space-y-3">
            {category.faq.map((item, i) => (
              <li
                key={i}
                className="rounded-lg border border-white/10 bg-white/5 p-3"
              >
                <p className="text-base font-semibold text-white">
                  {item.question}
                </p>
                <p className="mt-1.5 text-base leading-relaxed text-white/85">
                  {item.answer}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {showDevis && (
        <button
          type="button"
          className="flex h-[56px] w-full items-center justify-center rounded-xl border border-white/20 bg-white/15 text-lg font-semibold text-white transition-all hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          Demander un devis
        </button>
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
  const thumbnailSrc = "/media/jobs/plombier.svg";

  return (
    <div className="rounded-2xl border border-white/15 bg-black/25 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full min-h-[70px] items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-200 hover:bg-white/10 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? `Fermer ${category.label}` : `Ouvrir ${category.label}`}
      >
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/20">
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
          <span className="block text-xl font-bold text-white text-center sm:text-2xl leading-tight tracking-wide">
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

export function PlombierLyonContent({ categories }: PlombierLyonContentProps) {
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
    <BackgroundShell backgroundVideo="/plombier-lyon.mp4" backgroundImage="/media/accueil/fond-ecrans.jpg">
      <PhoneFrame>
        <div className="space-y-8 p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border border-white/20 bg-white/10 shadow-lg ring-2 ring-white/40">
              <Image
                src="/media/jobs/plombier.svg"
                alt="Les Plombiers Lyonnais"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-shadow-soft">
                LES PLOMBIERS LYONNAIS
              </h1>
              <p className="mt-2 text-base text-white/85 sm:text-lg text-shadow-soft">
                Dépannage plomberie 24h/24 – 7j/7 à Lyon et alentours
              </p>
            </div>
            <div className="mt-4 flex items-center justify-center gap-4">
              {PLOMBIER_LYON_QUICK_ACTIONS.map((action) => (
                <a
                  key={action.id}
                  href={action.href}
                  aria-label={action.id === "phone" ? "Appeler" : action.id === "whatsapp" ? "WhatsApp" : "Email"}
                  className="group inline-flex items-center justify-center transition-all duration-200 hover:-translate-y-[2px] hover:opacity-80 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <Icon name={action.iconKey} className="h-8 w-8 text-white" />
                </a>
              ))}
            </div>

            <div className="block w-full mt-2">
              <div className="animate-call-shake-burst relative w-full overflow-hidden rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-[1px] active:scale-[0.99]">
                <div className="relative h-[155px] w-full overflow-hidden rounded-t-2xl sm:h-[178px]">
                  <Image
                    src="/plombier-lyon-card.jpg"
                    alt=""
                    fill
                    className="object-cover object-[center_25%]"
                    sizes="(max-width: 420px) 100vw, 420px"
                    aria-hidden
                  />
                </div>
                <div className="flex h-[64px] w-full items-center justify-center gap-3 rounded-b-2xl border-t border-white/10 bg-black/35 px-4 backdrop-blur-xl">
                  <Icon name="phone" className="h-7 w-7 shrink-0 text-white" />
                  <span className="text-lg font-semibold text-white sm:text-xl">
                    Appeler — Devis gratuit
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
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

