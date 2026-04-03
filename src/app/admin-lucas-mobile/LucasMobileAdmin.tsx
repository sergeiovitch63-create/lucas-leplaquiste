"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { IconKey, SiteConfig, SiteLink } from "@/config/site";
import { site } from "@/config/site";

type TabId = "home" | "profile" | "settings";
type ToastState = { type: "success" | "error"; text: string } | null;
type MobileLink = { id: string; label: string; href: string; emoji: string; active: boolean };
type PageContent = {
  title: string;
  subtitle: string;
  intro: string;
  paragraphs?: string[];
  listItems?: string[];
  thumbnail: string;
  gallery: string[];
  ctaLabel: string;
  ctaLink: string;
};
type SiteConfigWithPages = SiteConfig & { pagesConfig?: Record<string, PageContent>; slug?: string };
type MobileConfig = {
  name: string; tagline: string; slug: string; avatarUrl: string; telLink: string; whatsappLink: string;
  facebookLink: string; mapsLink: string; email: string; links: MobileLink[]; pagesConfig: Record<string, PageContent>;
};
type SheetState =
  | { mode: "closed" }
  | { mode: "edit-link"; linkId: string }
  | { mode: "add-link" }
  | { mode: "edit-page"; slug: string }
  | { mode: "edit-avatar" }
  | { mode: "edit-contacts" };

const EMOJIS = ["🔨", "🏠", "⭐", "📸", "📞", "💬", "📍", "ℹ️", "🎨", "🪚", "🪵", "📋"];
const DEFAULT_EMAIL = "lucasleplaquiste34@gmail.com";
const MANAGED_PAGES = ["/", "/avis", "/creation-decoration", "/faux-plafonds", "/doublages", "/cloisons", "/a-propos"];
const HOME_BG_FALLBACK = "/media/accueil/fond-ecrans.jpg";
const PAGE_LABELS: Record<string, string> = {
  "/": "Homepage", "/avis": "Avis", "/creation-decoration": "Création & Décoration",
  "/faux-plafonds": "Faux plafonds", "/doublages": "Doublages", "/cloisons": "Cloisons", "/a-propos": "À propos",
};
const DEFAULT_PAGE_LINK_META: Record<string, { emoji: string; label: string }> = {
  "/": { emoji: "🏠", label: "Accueil" },
  "/avis": { emoji: "⭐", label: "Mes avis" },
  "/creation-decoration": { emoji: "🎨", label: "Création déco" },
  "/faux-plafonds": { emoji: "🏠", label: "Faux plafonds" },
  "/doublages": { emoji: "🪵", label: "Doublages" },
  "/cloisons": { emoji: "🪚", label: "Cloisons" },
  "/a-propos": { emoji: "ℹ️", label: "À propos" },
};
const FRONT_LOGO_IMAGE = "/media/accueil/logo.png";
const FRONT_CALL_CARD_IMAGE = "/media/logo-centre.png";
const PAGE_FALLBACK_CONTENT: Record<string, { subtitle: string; intro: string; longDescription: string }> = {
  "/a-propos": {
    subtitle: "Présentation",
    intro: "Plaquiste formé chez les compagnons du devoir, avec une approche du métier fondée sur la rigueur, la précision et le respect des règles de l'art.",
    longDescription:
      "Chaque prestation est réalisée avec un souci constant du détail : supports soigneusement préparés, alignements précis et finitions propres, aussi bien en rénovation qu'en construction neuve.\n\nÀ l'écoute des clients, des conseils et un accompagnement personnalisé sont proposés afin d'apporter des solutions adaptées aux besoins et aux attentes de chaque projet.\n\nTravail sérieux, chantier propre en fin d'intervention. Devis gratuit.",
  },
  "/creation-decoration": {
    subtitle: "Création et Décoration sur mesure",
    intro:
      "Conception et réalisation d'éléments en plaques de plâtre entièrement sur mesure, pensés pour sublimer vos espaces intérieurs.",
    longDescription:
      "Chaque projet associe esthétisme, fonctionnalité et finitions soignées, afin de créer des aménagements durables, harmonieux et parfaitement intégrés à votre intérieur.",
  },
  "/faux-plafonds": {
    subtitle: "Faux plafonds",
    intro:
      "Réalisation de faux plafonds en plaques de plâtre, sous charpente ou structure existante, intégrant des solutions d'isolation thermique et acoustique adaptées.",
    longDescription:
      "Un travail minutieux qui garantit des volumes équilibrés, une finition nette et une mise en valeur optimale de vos espaces.",
  },
  "/doublages": {
    subtitle: "Doublages",
    intro:
      "Doublage de murs en plaques de plâtre avec intégration d'une isolation thermique et acoustique, permettant d'obtenir des surfaces parfaitement planes, propres et prêtes à recevoir tous types de finitions.",
    longDescription:
      "Une solution idéale pour améliorer l'esthétique, la régularité et le confort de vos espaces intérieurs.",
  },
  "/cloisons": {
    subtitle: "Cloisons",
    intro:
      "Pose de cloisons en plaques de plâtre pour structurer, séparer ou redistribuer vos espaces de vie, avec intégration de solutions d'isolation phonique adaptées.",
    longDescription:
      "Chaque installation est réalisée avec précision, dans le respect des alignements et des finitions, afin d'offrir un résultat propre, durable et fonctionnel.",
  },
  "/avis": {
    subtitle: "Avis clients",
    intro: "",
    longDescription: "",
  },
  "/": {
    subtitle: "Accueil",
    intro: "",
    longDescription: "",
  },
};
const AUTO_RESIZE = (el: HTMLTextAreaElement) => {
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
};

function iconKeyToEmoji(iconKey?: IconKey): string {
  if (iconKey === "phone") return "📞";
  if (iconKey === "whatsapp") return "💬";
  if (iconKey === "facebook") return "📘";
  if (iconKey === "stars") return "⭐";
  if (iconKey === "map") return "📍";
  if (iconKey === "info") return "ℹ️";
  if (iconKey === "paint") return "🎨";
  return "🔗";
}
function emojiToIconKey(emoji: string): IconKey | undefined {
  if (emoji === "📞") return "phone";
  if (emoji === "💬") return "whatsapp";
  if (emoji === "📘") return "facebook";
  if (emoji === "⭐") return "stars";
  if (emoji === "📍") return "map";
  if (emoji === "ℹ️") return "info";
  if (emoji === "🎨") return "paint";
  return undefined;
}
function parseMailto(mailto: string): string {
  if (!mailto.startsWith("mailto:")) return DEFAULT_EMAIL;
  return mailto.replace("mailto:", "").split("?")[0] || DEFAULT_EMAIL;
}
function ContactIcon({ type }: { type: "phone" | "whatsapp" | "facebook" | "mail" }) {
  if (type === "phone") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#e8b84b]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 3.18 2 2 0 0 1 4.11 1h2a2 2 0 0 1 2 1.72c.12.9.35 1.78.68 2.61a2 2 0 0 1-.45 2.11L7.1 8.68a16 16 0 0 0 6.23 6.23l1.24-1.24a2 2 0 0 1 2.11-.45c.83.33 1.71.56 2.61.68A2 2 0 0 1 22 16.92Z" />
      </svg>
    );
  }
  if (type === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#e8b84b]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.5 11.5A8.5 8.5 0 0 1 7 18.2L3 20l1.8-4A8.5 8.5 0 1 1 20.5 11.5Z" />
        <path d="M9.3 8.9c-.2-.5-.4-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.9 4.5 3.9 2.3.9 2.8.7 3.3.6.5-.1 1.6-.7 1.8-1.4.2-.7.2-1.3.2-1.4-.1-.1-.2-.2-.5-.3-.3-.1-1.7-.8-2-.9-.2-.1-.4-.1-.6.1-.2.2-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.4-.5-2.6-1.5-.9-.8-1.6-1.8-1.8-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9Z" />
      </svg>
    );
  }
  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#e8b84b]" fill="currentColor">
        <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.2c0-.9.3-1.5 1.6-1.5h1.7V5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2V11H8v3h2.4v8h3.1Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#e8b84b]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
function defaultPages(raw: SiteConfig): Record<string, PageContent> {
  return {
    "/": { title: raw.brandName, subtitle: raw.tagline, intro: "", thumbnail: HOME_BG_FALLBACK, gallery: [], ctaLabel: "Appeler", ctaLink: raw.telLink },
    "/avis": { title: "Avis clients", subtitle: "", intro: "", thumbnail: "/media/accueil/favicon-avis.png", gallery: [], ctaLabel: "Voir les avis", ctaLink: "/avis" },
    "/creation-decoration": { title: "Création et Décoration sur mesure", subtitle: "", intro: "", thumbnail: "/media/accueil/favicon-creation-decoration.jpg", gallery: [], ctaLabel: "Demander un devis", ctaLink: raw.telLink },
    "/faux-plafonds": { title: "Faux plafonds", subtitle: "", intro: "", thumbnail: "/media/accueil/favicon-faux-plafond.jpg", gallery: [], ctaLabel: "Demander un devis", ctaLink: raw.telLink },
    "/doublages": { title: "Doublages", subtitle: "", intro: "", thumbnail: "/media/accueil/favicon-doublage.jpg", gallery: [], ctaLabel: "Demander un devis", ctaLink: raw.telLink },
    "/cloisons": { title: "Cloisons", subtitle: "", intro: "", thumbnail: "/media/accueil/favicon-cloison.jpg", gallery: [], ctaLabel: "Demander un devis", ctaLink: raw.telLink },
    "/a-propos": { title: "À propos", subtitle: "", intro: "", thumbnail: "/media/accueil/logo.png", gallery: [], ctaLabel: "Contactez-nous", ctaLink: raw.telLink },
  };
}
function parseRaw(raw: SiteConfigWithPages): MobileConfig {
  return {
    name: raw.brandName,
    tagline: raw.tagline,
    slug: raw.slug ?? "lucasleplaquiste34",
    avatarUrl: raw.avatar || raw.og.image || FRONT_LOGO_IMAGE,
    telLink: raw.telLink,
    whatsappLink: raw.waLink,
    facebookLink: raw.facebookUrl ?? "",
    mapsLink: raw.googleMapsUrl,
    email: parseMailto("mailto:lucasleplaquiste34@gmail.com?subject=Demande%20de%20devis"),
    links: raw.links.map((l) => ({ id: l.id, label: l.title, href: l.href, emoji: iconKeyToEmoji(l.iconKey), active: l.enabled ?? true })),
    pagesConfig: { ...defaultPages(raw), ...(raw.pagesConfig ?? {}) },
  };
}
function rawFromMobile(prevRaw: SiteConfigWithPages, mobile: MobileConfig): SiteConfigWithPages {
  const byId = new Map(prevRaw.links.map((l) => [l.id, l]));
  return {
    ...prevRaw,
    slug: mobile.slug,
    brandName: mobile.name,
    tagline: mobile.tagline,
    avatar: mobile.avatarUrl,
    telLink: mobile.telLink,
    waLink: mobile.whatsappLink,
    facebookUrl: mobile.facebookLink || undefined,
    googleMapsUrl: mobile.mapsLink,
    og: { ...prevRaw.og, image: mobile.avatarUrl || prevRaw.og.image },
    pagesConfig: mobile.pagesConfig,
    links: mobile.links.map((l, i) => {
      const old = byId.get(l.id);
      const href = l.href.trim();
      const type = href.startsWith("http") ? "external" : href.startsWith("tel:") || href.startsWith("mailto:") ? "action" : "internal";
      return {
        id: l.id, title: l.label.trim(), href, type,
        iconKey: emojiToIconKey(l.emoji) ?? old?.iconKey,
        thumbnail: old?.thumbnail, enabled: l.active, order: i + 1,
      } as SiteLink;
    }),
  };
}

export default function LucasMobileAdmin() {
  const [tab, setTab] = useState<TabId>("home");
  const [authSecret, setAuthSecret] = useState("");
  const [authInput, setAuthInput] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [rawConfig, setRawConfig] = useState<SiteConfigWithPages>(site);
  const [config, setConfig] = useState<MobileConfig>(parseRaw(site));
  const [sheet, setSheet] = useState<SheetState>({ mode: "closed" });
  const [draftLink, setDraftLink] = useState<MobileLink | null>(null);
  const [draftPage, setDraftPage] = useState<PageContent | null>(null);
  const [draftPageHref, setDraftPageHref] = useState("");
  const [draftPageEmoji, setDraftPageEmoji] = useState("📄");
  const [draftPageVisible, setDraftPageVisible] = useState(true);
  const [draftPageDescription, setDraftPageDescription] = useState("");
  const [draftPageSelectedImage, setDraftPageSelectedImage] = useState<number | null>(null);
  const [showReplaceImageSheet, setShowReplaceImageSheet] = useState(false);
  const [replaceImageUrl, setReplaceImageUrl] = useState("");
  const [replaceImageIndex, setReplaceImageIndex] = useState<number | null>(null);
  const [pageEditorSlug, setPageEditorSlug] = useState<string | null>(null);
  const [isPageEditorClosing, setIsPageEditorClosing] = useState(false);
  const [draftAvatar, setDraftAvatar] = useState("");
  const [draftContacts, setDraftContacts] = useState({ telLink: "", whatsappLink: "", facebookLink: "", mapsLink: "", email: "" });
  const [editingInline, setEditingInline] = useState<"name" | "tagline" | "slug" | null>(null);
  const galleryUploadRef = useRef<HTMLInputElement | null>(null);
  const homeBgUploadRef = useRef<HTMLInputElement | null>(null);
  const [homeBgDraft, setHomeBgDraft] = useState(HOME_BG_FALLBACK);

  const showToast = useCallback((type: "success" | "error", text: string) => {
    setToast({ type, text });
    window.setTimeout(() => setToast(null), 2500);
  }, []);

  const fetchConfig = useCallback(async (secret?: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/lucas-site", { headers: secret || authSecret ? { "x-admin-secret": secret || authSecret } : undefined });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as SiteConfigWithPages;
      setRawConfig(data);
      setConfig(parseRaw(data));
      return true;
    } catch {
      showToast("error", "Erreur");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [authSecret, showToast]);

  const putOptimistic = useCallback(async (next: MobileConfig) => {
    const prevRaw = rawConfig;
    const prevMobile = config;
    const nextRaw = rawFromMobile(prevRaw, next);
    setConfig(next);
    setRawConfig(nextRaw);
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/lucas-site", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-secret": authSecret },
        body: JSON.stringify(nextRaw),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || data?.details || "Erreur");
      showToast("success", "Enregistré ✓");
    } catch (error) {
      setConfig(prevMobile);
      setRawConfig(prevRaw);
      showToast("error", error instanceof Error ? error.message : "Erreur");
    } finally {
      setIsSaving(false);
    }
  }, [authSecret, config, rawConfig, showToast]);

  const fileToDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
      reader.onerror = () => reject(new Error("read-error"));
      reader.readAsDataURL(file);
    });

  const fileToOptimizedImage = (file: File, maxSide = 1600, quality = 0.82): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const src = typeof reader.result === "string" ? reader.result : "";
        if (!src) return reject(new Error("read-error"));
        const img = new window.Image();
        img.onload = () => {
          const ratio = Math.min(1, maxSide / Math.max(img.width, img.height));
          const width = Math.max(1, Math.round(img.width * ratio));
          const height = Math.max(1, Math.round(img.height * ratio));
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("canvas-error"));
          ctx.drawImage(img, 0, 0, width, height);
          const out = canvas.toDataURL("image/jpeg", quality);
          resolve(out);
        };
        img.onerror = () => reject(new Error("image-error"));
        img.src = src;
      };
      reader.onerror = () => reject(new Error("read-error"));
      reader.readAsDataURL(file);
    });

  const handleAddGalleryFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) {
      showToast("error", "Choisis une image");
      return;
    }
    try {
      const images = (await Promise.all(imageFiles.map((f) => fileToDataUrl(f)))).filter(Boolean);
      if (!images.length) return;
      setDraftPage((p) => (p ? { ...p, gallery: [...p.gallery, ...images] } : p));
      showToast("success", `${images.length} image(s) ajoutée(s)`);
    } catch {
      showToast("error", "Erreur upload image");
    }
  }, [showToast]);

  const handleHomeBgFile = useCallback(async (file: File | null) => {
    if (!file || !file.type.startsWith("image/")) {
      showToast("error", "Choisis une image");
      return;
    }
    try {
      const dataUrl = await fileToOptimizedImage(file);
      if (!dataUrl) return;
      if (dataUrl.length > 1_500_000) {
        showToast("error", "Image trop lourde, choisis une image plus légère");
        return;
      }
      setHomeBgDraft(dataUrl);
      showToast("success", "Image prête ✓");
    } catch {
      showToast("error", "Erreur upload image");
    }
  }, [showToast]);

  useEffect(() => {
    const envSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "";
    setAuthInput(envSecret);
    if (!envSecret) {
      setIsAuthLoading(false);
      return;
    }
    setAuthSecret(envSecret);
    setIsAuthed(true);
    setIsAuthLoading(false);
    void fetchConfig(envSecret);
  }, [fetchConfig]);

  useEffect(() => {
    setHomeBgDraft(config.pagesConfig["/"]?.thumbnail || HOME_BG_FALLBACK);
  }, [config.pagesConfig]);

  const handleLogin = useCallback(async () => {
    if (!authInput.trim()) return showToast("error", "Mot de passe requis");
    setAuthSecret(authInput.trim());
    setIsAuthed(true);
    await fetchConfig(authInput.trim());
  }, [authInput, fetchConfig, showToast]);

  const activeCount = config.links.filter((l) => l.active).length;
  const callCardThumbnail = FRONT_CALL_CARD_IMAGE;
  const closeSheet = () => {
    setSheet({ mode: "closed" });
    setDraftLink(null);
    setDraftPage(null);
  };
  if (isAuthLoading) return <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-2 border-[#e8b84b] border-t-transparent" /></div>;
  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-[#0f0f12] text-[#f0ede6] flex items-center justify-center p-5">
        <div className="w-full max-w-sm rounded-2xl bg-[#17171d] p-5 border border-white/[0.06]">
          <h1 className="text-xl font-semibold">Backoffice Mobile</h1>
          <input type="password" value={authInput} onChange={(e) => setAuthInput(e.target.value)} className="mt-4 h-12 w-full rounded-xl border border-white/[0.08] bg-[#0f0f12] px-4 text-base" />
          <button onClick={() => void handleLogin()} className="mt-3 h-12 w-full rounded-xl bg-[#e8b84b] text-black font-semibold active:scale-95">Accéder</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f12] text-[#f0ede6] pb-24 [overscroll-behavior:contain]">
      {toast && <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[70] rounded-full px-4 py-2 text-sm ${toast.type === "success" ? "bg-emerald-600" : "bg-red-600"}`}>{toast.text}</div>}
      <div className="mx-auto w-full max-w-md px-4 pt-4 space-y-4">
        {tab === "home" && (
          <>
            <section className="rounded-[14px] bg-[#17171d] p-4 border border-white/[0.06] space-y-3">
              <div className="flex items-start gap-3">
                <button onClick={() => { setDraftAvatar(config.avatarUrl); setSheet({ mode: "edit-avatar" }); }} className="active:scale-95">
                  <img
                    src={config.avatarUrl || FRONT_LOGO_IMAGE}
                    alt=""
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src.includes(FRONT_LOGO_IMAGE)) return;
                      img.src = FRONT_LOGO_IMAGE;
                    }}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </button>
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs text-[#888899]"><span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />En ligne</div>
                  {editingInline === "name" ? (
                    <div className="flex items-center gap-2">
                      <input value={config.name} onChange={(e) => setConfig((p) => ({ ...p, name: e.target.value }))} onBlur={() => void putOptimistic({ ...config })} className="h-11 w-full rounded-xl bg-[#0f0f12] px-3 text-base" autoFocus />
                      <button onClick={() => { setEditingInline(null); void putOptimistic({ ...config }); }} className="h-11 w-11 rounded-xl bg-[#e8b84b] text-black">✓</button>
                    </div>
                  ) : (
                    <button onClick={() => setEditingInline("name")} className="text-left text-lg font-semibold">{config.name}</button>
                  )}
                  {editingInline === "tagline" ? (
                    <div className="flex items-center gap-2">
                      <input value={config.tagline} onChange={(e) => setConfig((p) => ({ ...p, tagline: e.target.value }))} onBlur={() => void putOptimistic({ ...config })} className="h-11 w-full rounded-xl bg-[#0f0f12] px-3 text-base" autoFocus />
                      <button onClick={() => { setEditingInline(null); void putOptimistic({ ...config }); }} className="h-11 w-11 rounded-xl bg-[#e8b84b] text-black">✓</button>
                    </div>
                  ) : (
                    <button onClick={() => setEditingInline("tagline")} className="text-left text-sm text-[#888899]">{config.tagline}</button>
                  )}
                  {editingInline === "slug" ? (
                    <div className="flex items-center gap-2">
                      <input value={config.slug} onChange={(e) => setConfig((p) => ({ ...p, slug: e.target.value }))} onBlur={() => void putOptimistic({ ...config })} className="h-11 w-full rounded-xl bg-[#0f0f12] px-3 text-base" autoFocus />
                      <button onClick={() => { setEditingInline(null); void putOptimistic({ ...config }); }} className="h-11 w-11 rounded-xl bg-[#e8b84b] text-black">✓</button>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => window.open(window.location.origin, "_blank")} className="h-11 rounded-xl bg-[#0f0f12] active:scale-95">Voir la page</button>
                <button onClick={() => navigator.clipboard.writeText(window.location.origin).then(() => showToast("success", "Lien copié"))} className="h-11 rounded-xl bg-[#e8b84b] text-black font-semibold active:scale-95">Copier le lien</button>
              </div>
            </section>

            <section
              className="rounded-[14px] bg-[#17171d] p-3 border border-white/[0.06]"
              onContextMenu={(e) => { e.preventDefault(); setDraftContacts({ telLink: config.telLink, whatsappLink: config.whatsappLink, facebookLink: config.facebookLink, mapsLink: config.mapsLink, email: config.email }); setSheet({ mode: "edit-contacts" }); }}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">Contacts rapides</h3>
                <button
                  onClick={() => { setDraftContacts({ telLink: config.telLink, whatsappLink: config.whatsappLink, facebookLink: config.facebookLink, mapsLink: config.mapsLink, email: config.email }); setSheet({ mode: "edit-contacts" }); }}
                  className="h-9 w-9 rounded-full bg-[#0f0f12] active:scale-95"
                >
                  ✎
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { l: "Appel", h: config.telLink, icon: "phone" as const },
                  { l: "WhatsApp", h: config.whatsappLink, icon: "whatsapp" as const },
                  { l: "Facebook", h: config.facebookLink, icon: "facebook" as const },
                  { l: "Mail", h: `mailto:${config.email || DEFAULT_EMAIL}`, icon: "mail" as const },
                ].map((b) => (
                  <a key={b.l} href={b.h || "#"} target="_blank" rel="noreferrer" className="rounded-xl border border-white/[0.06] bg-[#0f0f12] p-2 text-center active:scale-95">
                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#2a2a33] to-[#17171d] shadow-[0_4px_12px_rgba(0,0,0,.35)]">
                      <ContactIcon type={b.icon} />
                    </div>
                    <div className="mt-1 text-[11px] text-[#b8b8c6]">{b.l}</div>
                  </a>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 gap-2">
              <div className="rounded-[14px] bg-[#17171d] p-3">
                <div className="text-xl font-semibold">{activeCount}</div>
                <div className="text-xs text-[#888899]">Nombre de sous-liens</div>
              </div>
            </section>

            <section className="rounded-[14px] bg-[#17171d] p-3 border border-white/[0.06]">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">Fond d&apos;écran accueil</h3>
                <button onClick={() => homeBgUploadRef.current?.click()} className="h-9 rounded-xl bg-[#0f0f12] px-3 text-xs active:scale-95">Upload</button>
              </div>
              <input
                ref={homeBgUploadRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  void handleHomeBgFile(e.currentTarget.files?.[0] ?? null);
                  e.currentTarget.value = "";
                }}
              />
              <img src={homeBgDraft || HOME_BG_FALLBACK} alt="" className="h-24 w-full rounded-xl object-cover" />
              <input
                value={homeBgDraft}
                onChange={(e) => setHomeBgDraft(e.target.value)}
                placeholder="URL fond d'écran"
                className="mt-2 h-11 w-full rounded-xl bg-[#0f0f12] px-3 text-base"
              />
              <button
                onClick={() =>
                  void putOptimistic({
                    ...config,
                    pagesConfig: {
                      ...config.pagesConfig,
                      "/": {
                        ...config.pagesConfig["/"],
                        thumbnail: homeBgDraft.trim() || HOME_BG_FALLBACK,
                      },
                    },
                  })
                }
                className="mt-2 h-11 w-full rounded-xl bg-[#e8b84b] text-black font-semibold active:scale-95"
              >
                Enregistrer le fond
              </button>
            </section>

            <section className="rounded-[14px] bg-[#17171d] p-3 border border-white/[0.06]">
              <h3 className="mb-2 font-medium">Mes pages</h3>
              <div className="space-y-2">
                {MANAGED_PAGES.map((slug) => {
                  const p = config.pagesConfig[slug];
                  const linked = config.links.find((l) => l.href === slug);
                  const emoji = linked?.emoji ?? DEFAULT_PAGE_LINK_META[slug]?.emoji ?? "📄";
                  const title = linked?.label || p?.title || DEFAULT_PAGE_LINK_META[slug]?.label || PAGE_LABELS[slug];
                  const visible = linked?.active ?? false;
                  return (
                    <button
                      key={slug}
                      onClick={() => {
                        setDraftPage({ ...p });
                        setDraftPageHref(slug);
                        setDraftPageEmoji(emoji);
                        setDraftPageVisible(visible);
                        setDraftPageDescription(
                          ([...(p?.paragraphs ?? []), PAGE_FALLBACK_CONTENT[slug]?.longDescription ?? ""]
                            .join("\n\n")
                            .trim())
                        );
                        setPageEditorSlug(slug);
                        setIsPageEditorClosing(false);
                        setSheet({ mode: "closed" });
                      }}
                      className={`w-full rounded-xl bg-[#0f0f12] p-2 active:scale-95 ${
                        visible ? "border-l-2 border-l-[#e8b84b]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {p?.thumbnail ? (
                          <img
                            src={p.thumbnail}
                            alt=""
                            onError={(e) => {
                              const img = e.currentTarget;
                              if (img.src.includes(FRONT_CALL_CARD_IMAGE)) return;
                              img.src = FRONT_CALL_CARD_IMAGE;
                            }}
                            className="h-14 w-14 rounded-[10px] bg-[#2a2a33] object-cover"
                          />
                        ) : (
                          <img
                            src={callCardThumbnail}
                            alt=""
                            onError={(e) => {
                              const img = e.currentTarget;
                              if (img.src.includes(FRONT_CALL_CARD_IMAGE)) return;
                              img.src = FRONT_CALL_CARD_IMAGE;
                            }}
                            className="h-14 w-14 rounded-[10px] bg-[#22222e] object-cover"
                          />
                        )}
                        <div className="min-w-0 flex-1 text-left">
                          <div className="text-[14px] font-medium">{title}</div>
                          <div className="truncate text-xs text-[#888899]">{slug}</div>
                        </div>
                        <label className="relative inline-flex h-6 w-11 items-center" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={visible}
                            onChange={(e) =>
                              void putOptimistic({
                                ...config,
                                links: config.links.some((l) => l.href === slug)
                                  ? config.links.map((l) =>
                                      l.href === slug ? { ...l, active: e.target.checked } : l
                                    )
                                  : [
                                      ...config.links,
                                      {
                                        id: `page-${slug}-${Date.now()}`,
                                        href: slug,
                                        label: title,
                                        emoji,
                                        active: e.target.checked,
                                      },
                                    ],
                              })
                            }
                          />
                          <span className="h-6 w-11 rounded-full bg-[#30303b] peer-checked:bg-green-500" />
                          <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white peer-checked:translate-x-5 transition" />
                        </label>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {tab === "profile" && (
          <div className="space-y-3 pb-20">
            <div className="rounded-[14px] bg-[#17171d] p-4"><input value={config.name} onChange={(e) => setConfig((p) => ({ ...p, name: e.target.value }))} className="h-11 w-full rounded-xl bg-[#0f0f12] px-3 text-base" /></div>
            <button onClick={() => void putOptimistic({ ...config })} className="h-12 w-full rounded-xl bg-[#e8b84b] text-black font-semibold">Enregistrer</button>
          </div>
        )}

        {tab === "settings" && (
          <div className="space-y-3">
            <div className="rounded-[14px] bg-[#17171d] p-4 space-y-2">
              <button onClick={() => showToast("success", "Modifiez NEXT_PUBLIC_ADMIN_SECRET dans .env")} className="h-11 w-full rounded-xl bg-[#0f0f12] text-left px-3">Changer mot de passe admin</button>
              <a href="/admin-lucas-leplaquiste" className="flex h-11 items-center rounded-xl bg-[#0f0f12] px-3">Voir le backoffice desktop</a>
              <a href="/" className="flex h-11 items-center rounded-xl bg-[#0f0f12] px-3">Voir la page publique</a>
              <button onClick={() => void fetchConfig()} className="h-11 w-full rounded-xl bg-[#0f0f12] text-left px-3">Recharger depuis Redis</button>
              <button onClick={() => { setIsAuthed(false); setAuthSecret(""); setAuthInput(""); }} className="h-11 w-full rounded-xl bg-red-600 text-left px-3">Se déconnecter</button>
            </div>
          </div>
        )}
      </div>

      {sheet.mode !== "closed" && (
        <div className="fixed inset-0 z-50">
          <button className="absolute inset-0 bg-black/50" onClick={closeSheet} />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-[#17171d] p-4 animate-[slideUp_.2s_ease-out]">
            <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-white/20" />
            {(sheet.mode === "add-link" || sheet.mode === "edit-link") && draftLink && (
              <>
                <h3 className="mb-3 text-base font-semibold">{sheet.mode === "add-link" ? "Nouveau lien" : "Modifier lien"}</h3>
                <div className="grid grid-cols-6 gap-2">{EMOJIS.map((e) => <button key={e} onClick={() => setDraftLink((p) => (p ? { ...p, emoji: e } : p))} className={`h-11 rounded-xl ${draftLink.emoji === e ? "bg-[#e8b84b] text-black" : "bg-[#0f0f12]"}`}>{e}</button>)}</div>
                <input value={draftLink.label} onChange={(e) => setDraftLink((p) => (p ? { ...p, label: e.target.value } : p))} placeholder="Titre" className="mt-2 h-11 w-full rounded-xl bg-[#0f0f12] px-3 text-base" />
                <input value={draftLink.href} onChange={(e) => setDraftLink((p) => (p ? { ...p, href: e.target.value } : p))} placeholder="URL" className="mt-2 h-11 w-full rounded-xl bg-[#0f0f12] px-3 text-base" />
                <label className="mt-2 inline-flex items-center gap-2"><input type="checkbox" checked={draftLink.active} onChange={(e) => setDraftLink((p) => (p ? { ...p, active: e.target.checked } : p))} />Actif</label>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button onClick={() => void putOptimistic({ ...config, links: sheet.mode === "add-link" ? [...config.links, draftLink] : config.links.map((l) => (l.id === sheet.linkId ? draftLink : l)) }).then(closeSheet)} className="h-12 rounded-xl bg-[#e8b84b] text-black">Enregistrer</button>
                  {sheet.mode === "edit-link" ? <button onClick={() => void putOptimistic({ ...config, links: config.links.filter((l) => l.id !== sheet.linkId) }).then(closeSheet)} className="h-12 rounded-xl bg-red-600">Supprimer</button> : <button onClick={closeSheet} className="h-12 rounded-xl bg-[#0f0f12]">Annuler</button>}
                </div>
              </>
            )}
            {sheet.mode === "edit-avatar" && (
              <>
                <h3 className="mb-3 font-semibold">Avatar</h3>
                <input value={draftAvatar} onChange={(e) => setDraftAvatar(e.target.value)} placeholder="URL avatar" className="h-11 w-full rounded-xl bg-[#0f0f12] px-3 text-base" />
                <img
                  src={draftAvatar || FRONT_LOGO_IMAGE}
                  alt=""
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.includes(FRONT_LOGO_IMAGE)) return;
                    img.src = FRONT_LOGO_IMAGE;
                  }}
                  className="mt-3 h-20 w-20 rounded-full object-cover"
                />
                <button onClick={() => void putOptimistic({ ...config, avatarUrl: draftAvatar }).then(closeSheet)} className="mt-3 h-12 w-full rounded-xl bg-[#e8b84b] text-black">Enregistrer</button>
              </>
            )}
            {sheet.mode === "edit-contacts" && (
              <>
                <h3 className="mb-3 font-semibold">Éditer contacts</h3>
                {(["telLink", "whatsappLink", "facebookLink", "mapsLink", "email"] as const).map((k) => (
                  <input key={k} value={draftContacts[k]} onChange={(e) => setDraftContacts((p) => ({ ...p, [k]: e.target.value }))} placeholder={k} className="mt-2 h-11 w-full rounded-xl bg-[#0f0f12] px-3 text-base" />
                ))}
                <button onClick={() => void putOptimistic({ ...config, ...draftContacts }).then(closeSheet)} className="mt-3 h-12 w-full rounded-xl bg-[#e8b84b] text-black">Save</button>
              </>
            )}
            {sheet.mode === "edit-page" && draftPage && null}
          </div>
        </div>
      )}

      {pageEditorSlug && draftPage && (
        <div
          className={`fixed inset-0 z-[55] bg-[#0f0f12] transition-transform duration-250 ease-out ${
            isPageEditorClosing ? "translate-x-full duration-200" : "translate-x-0"
          }`}
          style={{ transform: isPageEditorClosing ? "translateX(100%)" : "translateX(0)" }}
        >
          <div className="mx-auto h-full w-full max-w-md overflow-y-auto px-4 pb-28 pt-4 [overscroll-behavior:contain]">
            <header className="sticky top-0 z-20 mb-3 flex items-center justify-between bg-[#0f0f12]/95 py-2 backdrop-blur">
              <button
                onClick={() => {
                  setIsPageEditorClosing(true);
                  window.setTimeout(() => {
                    setPageEditorSlug(null);
                    setIsPageEditorClosing(false);
                  }, 200);
                }}
                className="h-11 px-2 text-sm active:scale-95"
              >
                ← Retour
              </button>
              <h3 className="text-sm font-semibold">{PAGE_LABELS[pageEditorSlug]}</h3>
              <button
                onClick={() =>
                  void putOptimistic({
                    ...config,
                    pagesConfig: { ...config.pagesConfig, [pageEditorSlug]: draftPage },
                    links: (() => {
                      const targetHref = draftPageHref.trim() || pageEditorSlug;
                      const existing = config.links.find((l) => l.href === pageEditorSlug || l.href === targetHref);
                      if (existing) {
                        return config.links.map((l) =>
                          l.id === existing.id
                            ? {
                                ...l,
                                href: targetHref,
                                label: draftPage.title,
                                emoji: draftPageEmoji,
                                active: draftPageVisible,
                              }
                            : l
                        );
                      }
                      return [
                        ...config.links,
                        {
                          id: `page-${targetHref}-${Date.now()}`,
                          href: targetHref,
                          label: draftPage.title,
                          emoji: draftPageEmoji,
                          active: draftPageVisible,
                        },
                      ];
                    })(),
                  }).then(() => {
                    showToast("success", "Page mise à jour ✓");
                    setIsPageEditorClosing(true);
                    window.setTimeout(() => {
                      setPageEditorSlug(null);
                      setIsPageEditorClosing(false);
                    }, 200);
                  })
                }
                className="h-11 px-2 text-sm text-[#e8b84b] active:scale-95"
              >
                Enregistrer ✓
              </button>
            </header>

            <section className="mt-3 rounded-xl bg-[#17171d] p-3">
              <div className="mb-2 text-xs text-[#888899]">INFOS DE LA PAGE</div>
              <input value={draftPage.title} onChange={(e) => setDraftPage((p) => (p ? { ...p, title: e.target.value } : p))} placeholder="Titre" className="h-11 w-full rounded-xl bg-[#0f0f12] px-3 text-base" />
              <div className="relative mt-2">
                      <textarea
                  value={draftPageDescription}
                        maxLength={300}
                        onInput={(e) => AUTO_RESIZE(e.currentTarget)}
                  onChange={(e) => setDraftPageDescription(e.target.value)}
                  placeholder="Description"
                        className="min-h-[88px] w-full rounded-xl bg-[#0f0f12] px-3 py-2 text-base"
                      />
                <span className="absolute bottom-2 right-3 text-[10px] text-[#888899]">{draftPageDescription.length}/300</span>
              </div>
            </section>

            {(pageEditorSlug !== "/" && pageEditorSlug !== "/avis") && (
              <section className="mt-3 rounded-xl bg-[#17171d] p-3">
                <div className="mb-2 text-xs text-[#888899]">Photos · {draftPage.gallery.length} images</div>
                <input
                  ref={galleryUploadRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    void handleAddGalleryFiles(e.currentTarget.files);
                    e.currentTarget.value = "";
                  }}
                />
                <div className="grid grid-cols-2 gap-2">
                  {draftPage.gallery.map((img, idx) => (
                    <button
                      key={`${img}-${idx}`}
                      onClick={() => setDraftPageSelectedImage(idx)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setReplaceImageIndex(idx);
                        setReplaceImageUrl(img);
                        setShowReplaceImageSheet(true);
                      }}
                      className={`relative rounded-xl bg-[#0f0f12] p-2 text-left ${draftPageSelectedImage === idx ? "ring-2 ring-[#e8b84b]" : ""}`}
                    >
                      <img src={img || ""} alt="" className="h-20 w-full rounded-lg object-cover bg-[#2a2a33]" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDraftPage((p) => p ? { ...p, gallery: p.gallery.filter((_, i) => i !== idx) } : p);
                        }}
                        className="absolute right-3 top-3 h-8 w-8 rounded-full bg-red-600 text-white"
                      >
                        ✕
                      </button>
                    </button>
                  ))}
                  <button
                    onClick={() => galleryUploadRef.current?.click()}
                    className="flex h-[104px] items-center justify-center rounded-xl border border-dashed border-[#e8b84b]/60 bg-[#0f0f12] text-[#e8b84b] active:scale-95"
                  >
                    <span className="text-2xl leading-none">+</span>
                  </button>
                </div>
                <button
                  onClick={() => galleryUploadRef.current?.click()}
                  className="mt-2 h-11 w-full rounded-xl bg-[#0f0f12] active:scale-95"
                >
                  + Ajouter depuis l&apos;appareil
                </button>
              </section>
            )}

            <section className="mt-3 rounded-xl bg-[#17171d] p-3">
              <div className="mb-2 text-xs text-[#888899]">CTA</div>
              <input value={draftPage.ctaLabel} onChange={(e) => setDraftPage((p) => (p ? { ...p, ctaLabel: e.target.value } : p))} placeholder="Texte du bouton" className="h-11 w-full rounded-xl bg-[#0f0f12] px-3 text-base" />
              <input value={draftPage.ctaLink} onChange={(e) => setDraftPage((p) => (p ? { ...p, ctaLink: e.target.value } : p))} placeholder="Lien" className="mt-2 h-11 w-full rounded-xl bg-[#0f0f12] px-3 text-base" />
            </section>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0f0f12]/95 p-4 backdrop-blur">
            <button
              onClick={() =>
                void putOptimistic({
                  ...config,
                  pagesConfig: {
                    ...config.pagesConfig,
                    [pageEditorSlug]: {
                      ...draftPage,
                      intro: draftPageDescription,
                      paragraphs: [draftPageDescription],
                      listItems: [],
                    },
                  },
                  links: (() => {
                    const targetHref = draftPageHref.trim() || pageEditorSlug;
                    const existing = config.links.find((l) => l.href === pageEditorSlug || l.href === targetHref);
                    if (existing) {
                      return config.links.map((l) =>
                        l.id === existing.id
                          ? { ...l, href: targetHref, label: draftPage.title, emoji: draftPageEmoji, active: draftPageVisible }
                          : l
                      );
                    }
                    return [
                      ...config.links,
                      {
                        id: `page-${targetHref}-${Date.now()}`,
                        href: targetHref,
                        label: draftPage.title,
                        emoji: draftPageEmoji,
                        active: draftPageVisible,
                      },
                    ];
                  })(),
                }).then(() => showToast("success", "Page mise à jour ✓"))
              }
              className="h-12 w-full rounded-xl bg-[#e8b84b] text-black font-semibold"
            >
              Enregistrer
            </button>
          </div>

          {showReplaceImageSheet && replaceImageIndex !== null && (
            <div className="fixed inset-0 z-[70]">
              <button className="absolute inset-0 bg-black/60" onClick={() => setShowReplaceImageSheet(false)} />
              <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-[#17171d] p-4">
                <h4 className="mb-2 font-medium">Remplacer la photo</h4>
                <input value={replaceImageUrl} onChange={(e) => setReplaceImageUrl(e.target.value)} className="h-11 w-full rounded-xl bg-[#0f0f12] px-3 text-base" />
                <div className="mt-2 h-20 overflow-hidden rounded-lg bg-[#2a2a33]">
                  {replaceImageUrl ? <img src={replaceImageUrl} alt="" className="h-full w-full object-cover" /> : null}
                </div>
                <button
                  onClick={() => {
                    setDraftPage((p) =>
                      p
                        ? {
                            ...p,
                            gallery: p.gallery.map((g, i) =>
                              i === replaceImageIndex ? replaceImageUrl : g
                            ),
                          }
                        : p
                    );
                    setShowReplaceImageSheet(false);
                  }}
                  className="mt-3 h-11 w-full rounded-xl bg-[#e8b84b] text-black"
                >
                  Remplacer
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {(isLoading || isSaving) && <div className="fixed inset-0 z-[60] bg-black/20 flex items-center justify-center pointer-events-none"><div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e8b84b] border-t-transparent" /></div>}

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.06] bg-[#0f0f12]/90 backdrop-blur-xl" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 8px)" }}>
        <div className="mx-auto grid max-w-md grid-cols-3 gap-1 px-2 pt-2">
          {[{ id: "home", label: "Home", icon: "🏠" }, { id: "profile", label: "Profil", icon: "👤" }, { id: "settings", label: "Paramètres", icon: "⚙️" }].map((item) => (
            <button key={item.id} onClick={() => setTab(item.id as TabId)} className={`h-12 rounded-xl text-xs active:scale-95 ${tab === item.id ? "bg-[#17171d] text-[#e8b84b]" : "text-[#888899]"}`}>
              <div>{item.icon}</div><div>{item.label}</div>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

