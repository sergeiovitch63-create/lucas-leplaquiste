export function isHttpUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function normalizeUnsplash(url: string): string {
  if (!url.includes("images.unsplash.com")) return url;
  if (!isHttpUrl(url)) return url;

  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "images.unsplash.com") return url;

    const params = parsed.searchParams;

    if (!params.has("auto")) {
      params.set("auto", "format");
    }
    if (!params.has("fit")) {
      params.set("fit", "crop");
    }
    if (!params.has("w")) {
      params.set("w", "800");
    }
    if (!params.has("q")) {
      params.set("q", "80");
    }

    parsed.search = params.toString();
    return parsed.toString();
  } catch {
    return url;
  }
}

export function safeUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  if (!isHttpUrl(trimmed) && !trimmed.startsWith("/")) {
    return null;
  }

  // Local static asset path
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  // Remote URL
  let url = trimmed;
  if (url.includes("images.unsplash.com")) {
    url = normalizeUnsplash(url);
  }

  return url;
}

export function pickImage(
  ...candidates: Array<string | null | undefined>
): string {
  for (const candidate of candidates) {
    const safe = safeUrl(candidate);
    if (safe) return safe;
  }
  return "/media/placeholder.svg";
}



