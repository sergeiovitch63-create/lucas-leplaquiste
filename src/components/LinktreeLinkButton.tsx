import Link from "next/link";
import type { MarinaLink } from "@/config/marina";
import { Icon } from "./icons";

interface LinktreeLinkButtonProps {
  link: MarinaLink;
}

/** Bouton style Linktree : icône + texte (et optionnel sous-titre) */
export function LinktreeLinkButton({ link }: LinktreeLinkButtonProps) {
  const content = (
    <div className="flex w-full min-h-[52px] items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/20 px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/28 hover:border-white/25 active:scale-[0.98]">
      <Icon name={link.iconKey} className="h-5 w-5 shrink-0 text-white" />
      <span className="flex flex-col items-center text-center">
        <span className="text-sm font-medium text-white sm:text-base">
          {link.title}
        </span>
        {link.subtitle && (
          <span className="text-xs text-white/80 mt-0.5">{link.subtitle}</span>
        )}
      </span>
    </div>
  );

  const className =
    "w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl";

  if (link.type === "internal") {
    return (
      <Link href={link.href} className={className} aria-label={link.title}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className={className}
      aria-label={link.title}
    >
      {content}
    </a>
  );
}
