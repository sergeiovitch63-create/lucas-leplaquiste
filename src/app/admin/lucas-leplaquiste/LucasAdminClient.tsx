"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type {
  SiteConfig,
  SiteLink,
  SocialLink,
  SocialLinkType,
} from "@/config/site";
import { site } from "@/config/site";

function getAdminSecret(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("lucas_admin_secret") ?? "";
}

function setAdminSecret(value: string) {
  localStorage.setItem("lucas_admin_secret", value);
}

function normalizeLinks(links: SiteLink[]): SiteLink[] {
  return [...links]
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))
    .map((link, index) => ({
      ...link,
      enabled: link.enabled ?? true,
      order: index + 1,
    }));
}

const SOCIAL_TYPE_ORDER: SocialLinkType[] = [
  "phone",
  "whatsapp",
  "facebook",
  "instagram",
  "link",
  "email",
  "maps",
];

const SOCIAL_META: Record<SocialLinkType, { label: string; icon: string; placeholder: string }> = {
  phone: { label: "Phone", icon: "☎", placeholder: "tel:+336..." },
  whatsapp: { label: "WhatsApp", icon: "💬", placeholder: "https://wa.me/336..." },
  facebook: {
    label: "Facebook",
    icon: "f",
    placeholder: "https://www.facebook.com/...",
  },
  instagram: {
    label: "Instagram",
    icon: "📸",
    placeholder: "https://www.instagram.com/...",
  },
  link: { label: "Lien", icon: "🔗", placeholder: "https://..." },
  email: { label: "Email", icon: "✉", placeholder: "mailto:..." },
  maps: { label: "Maps", icon: "📍", placeholder: "https://maps.app.goo.gl/..." },
};

function buildLegacySocialLinks(config: SiteConfig): SocialLink[] {
  const next: SocialLink[] = [];
  if (config.telLink) {
    next.push({
      id: `social-phone-${Date.now()}`,
      type: "phone",
      url: config.telLink,
      enabled: true,
    });
  }
  if (config.waLink) {
    next.push({
      id: `social-whatsapp-${Date.now()}`,
      type: "whatsapp",
      url: config.waLink,
      enabled: true,
    });
  }
  if (config.facebookUrl) {
    next.push({
      id: `social-facebook-${Date.now()}`,
      type: "facebook",
      url: config.facebookUrl,
      enabled: true,
    });
  }
  return next;
}

function normalizeSocialLinks(config: SiteConfig): SocialLink[] {
  const source =
    config.socialLinks && config.socialLinks.length > 0
      ? config.socialLinks
      : buildLegacySocialLinks(config);
  return source
    .filter((item): item is SocialLink => Boolean(item?.id && item?.type))
    .map((item) => ({
      id: item.id,
      type: item.type,
      url: item.url ?? "",
      enabled: item.enabled ?? true,
    }))
    .sort(
      (a, b) =>
        SOCIAL_TYPE_ORDER.indexOf(a.type) - SOCIAL_TYPE_ORDER.indexOf(b.type)
    );
}

function normalizeConfig(config: SiteConfig): SiteConfig {
  return {
    ...config,
    avatar: config.avatar ?? config.og.image,
    socialLinks: normalizeSocialLinks(config),
    links: normalizeLinks(config.links),
  };
}

function createLinkId(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base ? `${base}-${Date.now()}` : `link-${Date.now()}`;
}

export default function LucasAdminClient() {
  const [config, setConfig] = useState<SiteConfig>(normalizeConfig(site));
  const [secret, setSecret] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [savedSnapshot, setSavedSnapshot] = useState(JSON.stringify(normalizeConfig(site)));
  const [editingBrand, setEditingBrand] = useState(false);
  const [editingTagline, setEditingTagline] = useState(false);
  const [activeSocialId, setActiveSocialId] = useState<string | null>(null);
  const [isSocialPickerOpen, setIsSocialPickerOpen] = useState(false);
  const [addingSocialType, setAddingSocialType] = useState<SocialLinkType | null>(null);
  const [addingSocialUrl, setAddingSocialUrl] = useState("");
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [editingHrefId, setEditingHrefId] = useState<string | null>(null);
  const [editingThumbId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [newLink, setNewLink] = useState({ title: "", href: "", enabled: true });
  const [clickStats] = useState<Record<string, number>>({});
  const [iframeKey, setIframeKey] = useState(0);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const linkFileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const currentSnapshot = useMemo(
    () => JSON.stringify(normalizeConfig(config)),
    [config]
  );
  const isDirty = currentSnapshot !== savedSnapshot;

  const load = async (adminSecret: string): Promise<boolean> => {
    setLoadingConfig(true);
    setError(null);
    try {
      const headers: Record<string, string> = {};
      if (adminSecret) headers["x-admin-secret"] = adminSecret;
      const res = await fetch("/api/admin/lucas-site", { headers });
      if (!res.ok) {
        throw new Error(res.status === 401 ? "Mot de passe invalide" : "Accès refusé");
      }
      const data = normalizeConfig((await res.json()) as SiteConfig);
      setConfig(data);
      setSavedSnapshot(JSON.stringify(data));
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de chargement");
      return false;
    } finally {
      setLoadingConfig(false);
    }
  };

  useEffect(() => {
    const stored = getAdminSecret();
    setSecret(stored);
    if (!stored) {
      setAuthLoading(false);
      return;
    }
    load(stored).then((ok) => {
      setIsAuthed(ok);
      setAuthLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(id);
  }, [toast]);

  const authenticate = async () => {
    setError(null);
    const s = secret.trim();
    setAdminSecret(s);
    const ok = await load(s);
    setIsAuthed(ok);
    if (!ok) setToast({ type: "error", text: "Mot de passe incorrect." });
  };

  const save = async (nextConfig?: SiteConfig) => {
    setSaving(true);
    setError(null);
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      const s = secret.trim() || getAdminSecret();
      if (s) headers["x-admin-secret"] = s;
      const payload = normalizeConfig(nextConfig ?? config);
      const res = await fetch("/api/admin/lucas-site", {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setSavedSnapshot(JSON.stringify(payload));
      setIframeKey((k) => k + 1);
      setToast({ type: "success", text: "Configuration enregistrée." });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erreur d'enregistrement";
      setError(msg);
      setToast({ type: "error", text: msg });
    } finally {
      setSaving(false);
    }
  };

  const patchConfig = (patch: Partial<SiteConfig>) => {
    setConfig((prev) => normalizeConfig({ ...prev, ...patch }));
  };

  const updateLink = (id: string, patch: Partial<SiteLink>) => {
    setConfig((prev) => {
      const nextLinks = prev.links.map((link) =>
        link.id === id ? { ...link, ...patch } : link
      );
      return normalizeConfig({ ...prev, links: nextLinks });
    });
  };

  const moveByDirection = (index: number, direction: -1 | 1) => {
    setConfig((prev) => {
      const next = [...prev.links];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      const temp = next[index];
      next[index] = next[target];
      next[target] = temp;
      return normalizeConfig({ ...prev, links: next });
    });
  };

  const removeLink = (id: string) => {
    setConfig((prev) => {
      const next = prev.links.filter((link) => link.id !== id);
      return normalizeConfig({ ...prev, links: next });
    });
    setDeleteConfirmId(null);
  };

  const addLink = async () => {
    if (!newLink.title.trim() || !newLink.href.trim()) return;
    const toAdd: SiteLink = {
      id: createLinkId(newLink.title),
      title: newLink.title.trim(),
      href: newLink.href.trim(),
      type:
        newLink.href.trim().startsWith("http") ||
        newLink.href.trim().startsWith("https")
          ? "external"
          : newLink.href.trim().startsWith("tel:")
            ? "action"
            : "internal",
      enabled: newLink.enabled,
      order: config.links.length + 1,
      thumbnail: "/media/accueil/logo.png",
    };
    const nextConfig = normalizeConfig({ ...config, links: [...config.links, toAdd] });
    setConfig(nextConfig);
    setNewLink({ title: "", href: "", enabled: true });
    setAdding(false);
    await save(nextConfig);
  };

  const onDropReorder = async (targetId: string) => {
    if (!draggingId || draggingId === targetId) return;
    setConfig((prev) => {
      const links = [...prev.links];
      const from = links.findIndex((l) => l.id === draggingId);
      const to = links.findIndex((l) => l.id === targetId);
      if (from < 0 || to < 0) return prev;
      const [moved] = links.splice(from, 1);
      links.splice(to, 0, moved);
      const next = normalizeConfig({ ...prev, links });
      setTimeout(() => {
        void save(next);
      }, 0);
      return next;
    });
    setDraggingId(null);
  };

  const updateAvatarFromFile = async (file: File) => {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("Lecture image impossible"));
      reader.readAsDataURL(file);
    });
    patchConfig({ avatar: dataUrl, og: { ...config.og, image: dataUrl } });
  };

  const updateLinkThumbFromFile = async (linkId: string, file: File) => {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("Lecture image impossible"));
      reader.readAsDataURL(file);
    });
    updateLink(linkId, { thumbnail: dataUrl });
  };

  const socialLinks = config.socialLinks ?? [];
  const activeSocial = socialLinks.find((item) => item.id === activeSocialId) ?? null;

  const updateSocialLink = (id: string, patch: Partial<SocialLink>) => {
    patchConfig({
      socialLinks: socialLinks.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });
  };

  const removeSocialLink = (id: string) => {
    patchConfig({ socialLinks: socialLinks.filter((item) => item.id !== id) });
    setActiveSocialId(null);
  };

  const addSocialLink = () => {
    if (!addingSocialType || !addingSocialUrl.trim()) return;
    const toAdd: SocialLink = {
      id: `social-${addingSocialType}-${Date.now()}`,
      type: addingSocialType,
      url: addingSocialUrl.trim(),
      enabled: true,
    };
    patchConfig({ socialLinks: [...socialLinks, toAdd] });
    setAddingSocialType(null);
    setAddingSocialUrl("");
    setIsSocialPickerOpen(false);
    setActiveSocialId(toAdd.id);
  };

  if (authLoading) {
    return <div className="py-10 text-center text-slate-500">Chargement…</div>;
  }

  if (!isAuthed) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#f9f9f9] p-4">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col items-center gap-3">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border border-slate-200">
              <Image
                src="/media/accueil/logo.png"
                alt="Lucas"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-slate-600">Backoffice Lucas</p>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Mot de passe"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-violet-200 focus:ring"
              onKeyDown={(e) => {
                if (e.key === "Enter") void authenticate();
              }}
            />
            <button
              type="button"
              onClick={() => void authenticate()}
              className="w-full rounded-xl bg-violet-500 px-4 py-2 font-medium text-white hover:bg-violet-600"
            >
              Acceder
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#f9f9f9] text-slate-900">
      {toast && (
        <div
          className={`fixed right-4 top-4 z-50 rounded-xl px-4 py-2 text-sm text-white shadow ${
            toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          {toast.text}
        </div>
      )}

      <div className="mx-auto flex max-w-[1240px] gap-6 px-3 pb-6 pt-3 md:px-5">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="sticky top-0 z-20 flex items-center justify-between rounded-xl border border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">Backoffice Lucas</h1>
              {isDirty && (
                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700">
                  Modifications non sauvegardees
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Link href="/" target="_blank" className="text-sm text-slate-600 underline">
                Voir la page
              </Link>
              <button
                type="button"
                onClick={() => void save()}
                disabled={saving || loadingConfig}
                className="rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-600 disabled:opacity-50"
              >
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </div>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-4">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white shadow"
                title="Changer avatar"
              >
                <Image
                  src={config.avatar || config.og.image || "/media/accueil/logo.png"}
                  alt={config.brandName}
                  fill
                  unoptimized={(config.avatar || config.og.image || "").startsWith("data:image")}
                  className="object-cover"
                />
                <div className="absolute inset-0 hidden items-center justify-center bg-black/45 text-white group-hover:flex">
                  ✏️
                </div>
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void updateAvatarFromFile(file);
                }}
              />

              <div className="min-w-0 flex-1">
                <div className="space-y-0.5">
                  {editingBrand ? (
                    <input
                      autoFocus
                      value={config.brandName}
                      onChange={(e) => patchConfig({ brandName: e.target.value })}
                      onBlur={() => setEditingBrand(false)}
                      className="w-full rounded border border-slate-300 px-2 py-1 text-3xl font-bold"
                    />
                  ) : (
                    <button
                      type="button"
                      className="text-left text-4xl font-bold leading-tight"
                      onClick={() => setEditingBrand(true)}
                    >
                      {config.brandName}
                    </button>
                  )}
                  {editingTagline ? (
                    <input
                      autoFocus
                      value={config.tagline}
                      onChange={(e) => patchConfig({ tagline: e.target.value })}
                      onBlur={() => setEditingTagline(false)}
                      className="w-full rounded border border-slate-300 px-2 py-1 text-sm text-slate-600"
                    />
                  ) : (
                    <button
                      type="button"
                      className="text-left text-sm text-slate-600"
                      onClick={() => setEditingTagline(true)}
                    >
                      {config.tagline}
                    </button>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {socialLinks.map((social) => (
                    <button
                      key={social.id}
                      type="button"
                      onClick={() => {
                        setIsSocialPickerOpen(false);
                        setAddingSocialType(null);
                        setActiveSocialId(social.id);
                      }}
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm text-white transition ${
                        social.enabled ? "bg-black hover:bg-slate-800" : "bg-slate-400 hover:bg-slate-500"
                      }`}
                      title={SOCIAL_META[social.type].label}
                    >
                      {SOCIAL_META[social.type].icon}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSocialId(null);
                      setAddingSocialType(null);
                      setIsSocialPickerOpen((v) => !v);
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg text-white hover:bg-slate-800"
                    title="Ajouter une icone"
                  >
                    +
                  </button>
                </div>

                {activeSocial && (
                  <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="mb-2 text-sm font-medium">
                      {SOCIAL_META[activeSocial.type].label}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        value={activeSocial.url}
                        onChange={(e) =>
                          updateSocialLink(activeSocial.id, { url: e.target.value })
                        }
                        placeholder={SOCIAL_META[activeSocial.type].placeholder}
                        className="min-w-[220px] flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                      <label className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
                        <input
                          type="checkbox"
                          checked={activeSocial.enabled}
                          onChange={(e) =>
                            updateSocialLink(activeSocial.id, { enabled: e.target.checked })
                          }
                        />
                        Actif
                      </label>
                      <button
                        type="button"
                        onClick={() => removeSocialLink(activeSocial.id)}
                        className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
                      >
                        Supprimer
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveSocialId(null)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                )}

                {isSocialPickerOpen && (
                  <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {SOCIAL_TYPE_ORDER.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setAddingSocialType(type);
                            setAddingSocialUrl("");
                          }}
                          className={`rounded-lg border px-3 py-2 text-left text-sm ${
                            addingSocialType === type
                              ? "border-violet-400 bg-violet-100"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {SOCIAL_META[type].icon} {SOCIAL_META[type].label}
                        </button>
                      ))}
                    </div>
                    {addingSocialType && (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <input
                          value={addingSocialUrl}
                          onChange={(e) => setAddingSocialUrl(e.target.value)}
                          placeholder={SOCIAL_META[addingSocialType].placeholder}
                          className="min-w-[220px] flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                        />
                        <button
                          type="button"
                          onClick={addSocialLink}
                          className="rounded-lg bg-violet-500 px-3 py-2 text-sm text-white hover:bg-violet-600"
                        >
                          Ajouter
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <input
                  value={config.avatar ?? ""}
                  onChange={(e) =>
                    patchConfig({
                      avatar: e.target.value,
                      og: { ...config.og, image: e.target.value || config.og.image },
                    })
                  }
                  placeholder="URL avatar"
                  className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <button
              type="button"
              onClick={() => setAdding((v) => !v)}
              className="w-full rounded-xl bg-violet-500 px-4 py-3 text-center font-medium text-white hover:bg-violet-600"
            >
              + Ajouter un lien
            </button>

            {adding && (
              <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                <div className="grid gap-2 md:grid-cols-[1fr_1fr_auto_auto]">
                  <input
                    value={newLink.title}
                    onChange={(e) => setNewLink((p) => ({ ...p, title: e.target.value }))}
                    placeholder="Titre du lien"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                  <input
                    value={newLink.href}
                    onChange={(e) => setNewLink((p) => ({ ...p, href: e.target.value }))}
                    placeholder="URL ou tel:"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                  <label className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                    <input
                      type="checkbox"
                      checked={newLink.enabled}
                      onChange={(e) =>
                        setNewLink((p) => ({ ...p, enabled: e.target.checked }))
                      }
                    />
                    Actif
                  </label>
                  <button
                    type="button"
                    onClick={() => void addLink()}
                    className="rounded-lg bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {config.links.map((link, index) => (
                <div
                  key={link.id}
                  className="group rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
                  draggable
                  onDragStart={() => setDraggingId(link.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => void onDropReorder(link.id)}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      className="mt-1 text-slate-400"
                      title="Glisser pour reordonner"
                    >
                      ⠿
                    </button>
                    <button
                      type="button"
                      className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-slate-200"
                      onClick={() =>
                        linkFileRefs.current[link.id]?.click()
                      }
                      title="Changer thumbnail"
                    >
                      <Image
                        src={link.thumbnail || "/media/accueil/logo.png"}
                        alt=""
                        fill
                        unoptimized={(link.thumbnail ?? "").startsWith("data:image")}
                        className="object-cover"
                      />
                    </button>
                    <input
                      ref={(el) => {
                        linkFileRefs.current[link.id] = el;
                      }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void updateLinkThumbFromFile(link.id, file);
                      }}
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      {editingTitleId === link.id ? (
                        <input
                          autoFocus
                          value={link.title}
                          onBlur={() => setEditingTitleId(null)}
                          onChange={(e) => updateLink(link.id, { title: e.target.value })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-sm font-medium"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setEditingTitleId(link.id)}
                          className="line-clamp-1 text-left text-sm font-semibold"
                        >
                          {link.title}
                        </button>
                      )}
                      {editingHrefId === link.id ? (
                        <input
                          autoFocus
                          value={link.href}
                          onBlur={() => setEditingHrefId(null)}
                          onChange={(e) => updateLink(link.id, { href: e.target.value })}
                          className="w-full rounded border border-slate-300 px-2 py-1 text-xs text-slate-600"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setEditingHrefId(link.id)}
                          className="w-full truncate text-left text-xs text-slate-500"
                        >
                          {link.href}
                        </button>
                      )}
                      {editingThumbId === link.id && (
                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            value={link.thumbnail ?? ""}
                            onChange={(e) =>
                              updateLink(link.id, { thumbnail: e.target.value || undefined })
                            }
                            placeholder="URL icone/thumbnail"
                            className="min-w-[220px] flex-1 rounded border border-slate-300 px-2 py-1 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => linkFileRefs.current[link.id]?.click()}
                            className="rounded border border-slate-300 bg-white px-2 py-1 text-xs"
                          >
                            Upload
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={link.enabled ?? true}
                          onChange={(e) => updateLink(link.id, { enabled: e.target.checked })}
                        />
                        <span className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-[#22c55e]" />
                        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5" />
                      </label>
                      <span className="text-xs text-slate-500">{clickStats[link.id] ?? 0} clicks</span>
                      {deleteConfirmId === link.id ? (
                        <div className="flex items-center gap-1 text-xs">
                          <span>Supprimer ?</span>
                          <button
                            type="button"
                            onClick={() => removeLink(link.id)}
                            className="rounded bg-red-500 px-2 py-0.5 text-white"
                          >
                            Oui
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            className="rounded border border-slate-300 px-2 py-0.5"
                          >
                            Non
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(link.id)}
                          className="text-red-500"
                        >
                          🗑
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 flex justify-end gap-1 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => moveByDirection(index, -1)}
                      className="rounded border border-slate-300 px-2 py-0.5 text-xs"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveByDirection(index, 1)}
                      className="rounded border border-slate-300 px-2 py-0.5 text-xs"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="hidden w-80 shrink-0 flex-col items-center justify-start pt-8 md:flex">
          <p className="mb-3 text-xs uppercase tracking-widest text-gray-400">Apercu live</p>
          <div className="relative h-[640px] w-[320px] overflow-hidden rounded-[40px] border-4 border-gray-700 bg-black shadow-2xl">
            <iframe
              key={iframeKey}
              src="/"
              className="h-full w-full"
              style={{ transform: "scale(1)", transformOrigin: "top left" }}
              title="Aperçu live Lucas Le Plaquiste"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

