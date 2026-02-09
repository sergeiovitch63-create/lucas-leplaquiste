import Image from "next/image";
import { getQuickActions, site } from "../config/site";
import { Icon } from "./icons";

const AVATAR_SIZE = 80;

export function ProfileHeader() {
  const quickActions = getQuickActions();

  const initials = site.brandName
    .split(" ")
    .filter((part) => part.length > 0)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/10 bg-white/10 shadow-lg ring-2 ring-white/20">
        <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold uppercase text-white/80">
          {initials}
        </div>
        <Image
          src="/media/accueil/logo.png"
          alt={site.brandName}
          fill
          sizes={`${AVATAR_SIZE}px`}
          className="object-cover scale-[1.08]"
        />
      </div>

      <div className="text-center">
        <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl text-shadow-soft">
          {site.brandName}
        </h1>
        <p className="mt-1 text-xs text-white/80 sm:text-sm text-shadow-soft">{site.tagline}</p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        {quickActions.map((action) => {
          const isExternal = action.id === "whatsapp" || action.id === "facebook";
          return (
            <a
              key={action.id}
              href={action.href}
              aria-label={action.title}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className="group inline-flex items-center justify-center transition-all duration-200 hover:-translate-y-[2px] hover:opacity-80 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <Icon name={action.iconKey} className="h-7 w-7 text-white" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

