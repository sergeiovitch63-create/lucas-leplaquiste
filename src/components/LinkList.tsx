 "use client";

import { site, type SiteLink } from "../config/site";
import { trackClick } from "../lib/track";
import { LinkButton } from "./LinkButton";

export function LinkList() {
  const links: SiteLink[] = site.links;

  const handleClick = (link: SiteLink) => {
    trackClick({
      id: link.id,
      title: link.title,
      href: link.href,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <LinkButton
          key={link.id}
          link={link}
          onClick={() => handleClick(link)}
        />
      ))}
    </div>
  );
}


