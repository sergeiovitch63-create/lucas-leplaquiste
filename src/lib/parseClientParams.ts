export interface ClientLink {
  label: string;
  href: string;
  icon?: string;
}

export interface ClientParams {
  name: string;
  city: string;
  phone: string;
  whatsapp: string | null;
  maps: string | null;
  logo: string | null;
  primary: string | null;
  tagline: string | null;
  servicesCustom: { title: string; desc: string }[] | null;
  bg: string | null;
  zone: string | null;
  facebook: string | null;
  email: string | null;
  banner: string | null;
  primaryLabel: string | null;
  links: ClientLink[] | null;
}

const MAX_LEN_DEFAULT = 120;

function clampText(value: string | undefined | null, max: number): string {
  if (!value) return "";
  const trimmed = value.toString().trim();
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

function sanitizeUrl(value: string | undefined | null): string | null {
  if (!value) return null;
  const trimmed = value.toString().trim();
  if (!trimmed) return null;
  try {
    // Ensure it’s a valid URL; if protocol missing, prepend https
    const hasProtocol = /^https?:\/\//i.test(trimmed);
    const url = new URL(hasProtocol ? trimmed : `https://${trimmed}`);
    return url.toString();
  } catch {
    return null;
  }
}

function normalizePhone(phoneRaw: string | undefined | null): string {
  if (!phoneRaw) return "";
  const trimmed = phoneRaw.toString().trim();
  // Keep leading +, remove spaces and non digit chars (except +)
  const cleaned = trimmed.replace(/(?!^\+)[^\d]/g, "");
  return cleaned.slice(0, MAX_LEN_DEFAULT);
}

function buildWhatsappFromPhone(phone: string): string | null {
  const numeric = phone.replace(/[^\d]/g, "");
  if (!numeric) return null;
  return `https://wa.me/${numeric}`;
}

function parseServicesCustom(raw: string | undefined | null): { title: string; desc: string }[] | null {
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    const parsed = JSON.parse(decoded) as unknown;
    if (!Array.isArray(parsed)) return null;
    const mapped = parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const maybe = item as { title?: string; desc?: string };
        const title = clampText(maybe.title ?? "", 80);
        const desc = clampText(maybe.desc ?? "", 200);
        if (!title) return null;
        return { title, desc };
      })
      .filter((x): x is { title: string; desc: string } => x !== null);
    return mapped.length ? mapped : null;
  } catch {
    return null;
  }
}

function parseClientLinks(raw: string | undefined | null): ClientLink[] | null {
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    const parsed = JSON.parse(decoded) as unknown;
    if (!Array.isArray(parsed)) return null;

    const mapped = parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const maybe = item as { label?: string; href?: string; icon?: string };
        const label = clampText(maybe.label ?? "", 80);
        const href = clampText(maybe.href ?? "", 200);
        const icon = clampText(maybe.icon ?? "", 40) || undefined;
        if (!label || !href) return null;
        return { label, href, icon };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    return mapped.length ? (mapped as ClientLink[]) : null;
  } catch {
    return null;
  }
}

export function parseClientParams(searchParams: URLSearchParams): ClientParams {
  const name = clampText(searchParams.get("name"), 60);
  const city = clampText(searchParams.get("city"), 60);
  const tagline = clampText(searchParams.get("tagline"), 140) || null;

  const phoneRaw = searchParams.get("phone");
  const phone = normalizePhone(phoneRaw);

  const whatsappRaw = searchParams.get("whatsapp");
  let whatsapp: string | null = null;
  if (whatsappRaw) {
    const cleaned = whatsappRaw.toString().trim();
    // Accept full URL or bare phone
    if (/^https?:\/\//i.test(cleaned)) {
      whatsapp = sanitizeUrl(cleaned);
    } else {
      whatsapp = buildWhatsappFromPhone(cleaned);
    }
  } else if (phone) {
    whatsapp = buildWhatsappFromPhone(phone);
  }

  const maps = sanitizeUrl(searchParams.get("maps"));
  const logo = sanitizeUrl(searchParams.get("logo"));

  const primaryRaw = clampText(searchParams.get("primary"), 20);
  const primary = primaryRaw || null;

  const servicesCustom = parseServicesCustom(searchParams.get("services"));

  const bg = sanitizeUrl(searchParams.get("bg"));
  const zoneRaw = clampText(searchParams.get("zone"), 80);
  const zone = zoneRaw || null;
  const facebook = sanitizeUrl(searchParams.get("facebook"));
  const emailRaw = clampText(searchParams.get("email"), 120);
  const email = emailRaw || null;
  const banner = sanitizeUrl(searchParams.get("banner"));
  const primaryLabelRaw = clampText(searchParams.get("primaryLabel"), 40);
  const primaryLabel = primaryLabelRaw || null;
  const links = parseClientLinks(searchParams.get("links"));

  return {
    name,
    city,
    phone,
    whatsapp,
    maps,
    logo,
    primary,
    tagline,
    servicesCustom,
    bg,
    zone,
    facebook,
    email,
    banner,
    primaryLabel,
    links,
  };
}


