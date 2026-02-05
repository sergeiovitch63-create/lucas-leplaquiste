import Image from "next/image";
import Link from "next/link";
import type { MouseEventHandler } from "react";
import type { SiteLink } from "../config/site";
import { Icon } from "./icons";

interface LinkButtonProps {
  link: SiteLink;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

function CallHeroCard({ link }: { link: SiteLink }) {
  const thumbnail = link.thumbnail || "/media/accueil/logo.png";
  
  return (
    <div className="animate-call-shake-burst group relative w-full overflow-hidden rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-[1px] active:scale-[0.99]">
      {/* ZONE 1: Image en haut (bloc distinct, coins arrondis en haut) */}
      <div className="relative h-[175px] w-full overflow-hidden rounded-t-2xl">
        <Image
          src={thumbnail}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 420px"
          aria-hidden
        />
      </div>

      {/* ZONE 2: Bouton en bas (bloc séparé, coins arrondis en bas) */}
      <div className="flex h-[54px] w-full items-center justify-center gap-2.5 rounded-b-2xl border-t border-white/10 bg-white/15 px-4 backdrop-blur-xl transition-all duration-200 hover:bg-white/20 active:scale-[0.99]">
        {link.iconKey && (
          <Icon
            name={link.iconKey}
            className="h-5 w-5 shrink-0 text-white"
          />
        )}
        <span className="text-sm font-medium text-white sm:text-base">
          {link.title}
        </span>
      </div>
    </div>
  );
}

// Thumbnail par défaut utilisé pour toutes les cards (identique à "Avis clients")
const DEFAULT_CARD_THUMBNAIL = "/media/avis/thumbnail.png";

function LinkContent({ link }: { link: SiteLink }) {
  // Utiliser le thumbnail du lien s'il existe, sinon le thumbnail par défaut
  const thumbnail = link.thumbnail || DEFAULT_CARD_THUMBNAIL;

  return (
    <div className="group relative flex w-full min-h-[56px] items-center gap-3 rounded-[18px] border border-white/10 bg-white/24 px-4 shadow-[0_10px_25px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all hover:translate-y-[-1px] hover:bg-white/28 active:scale-[0.99] active:bg-white/20">
      {/* Vignette à gauche */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl">
        <Image
          src={thumbnail}
          alt=""
          width={40}
          height={40}
          className="h-full w-full object-cover"
          aria-hidden
        />
      </div>

      {/* Texte centré */}
      <div className="flex flex-1 items-center justify-center">
        <span className="line-clamp-1 overflow-hidden text-ellipsis text-sm font-medium text-white/90">
          {link.title}
        </span>
      </div>

      {/* Trois points à droite */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center">
        <span className="text-lg leading-none text-white/45" aria-hidden>
          ⋯
        </span>
      </div>
    </div>
  );
}

export function LinkButton({ link, onClick }: LinkButtonProps) {
  const commonProps = {
    onClick,
    className:
      "w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-0",
    "aria-label": link.title,
  } as const;

  // Hero card pour le bouton "Appeler"
  const isHeroCard = link.id === "call";
  const ContentComponent = isHeroCard ? CallHeroCard : LinkContent;

  if (link.type === "internal") {
    return (
      <Link href={link.href} {...commonProps}>
        <ContentComponent link={link} />
      </Link>
    );
  }

  if (link.type === "external") {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer"
        {...commonProps}
      >
        <ContentComponent link={link} />
      </a>
    );
  }

  // action
  return (
    <a href={link.href} {...commonProps}>
      <ContentComponent link={link} />
    </a>
  );
}


