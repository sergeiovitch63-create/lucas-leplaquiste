 "use client";

import { useEffect, useState } from "react";
import { site, type SiteLink } from "../config/site";
import { trackClick } from "../lib/track";
import { LinkButton } from "./LinkButton";

export function LinkList() {
  const [links, setLinks] = useState<SiteLink[]>(
    site.links
      .filter((link) => link.enabled ?? true)
      .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))
  );

  useEffect(() => {
    let cancelled = false;
    fetch("/api/lucas-site")
      .then((res) => (res.ok ? res.json() : site))
      .then((data) => {
        if (!cancelled && data?.links && Array.isArray(data.links)) {
          const normalized = (data.links as SiteLink[])
            .filter((link) => link.enabled ?? true)
            .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
          setLinks(normalized);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

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


