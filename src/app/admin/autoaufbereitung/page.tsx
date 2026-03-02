"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AutoaufbereitungConfig } from "@/config/autoaufbereitung";
import type { AutoaufbereitungServiceCategory } from "@/data/autoaufbereitung-categories";
import {
  autoaufbereitungDefaultLocale,
  getAutoaufbereitungFaq,
} from "@/lib/autoaufbereitung-i18n";

const ICON_KEYS = [
  "phone",
  "whatsapp",
  "facebook",
  "instagram",
  "map",
  "email",
  "paint",
  "ceiling",
  "layers",
  "walls",
  "info",
  "stars",
  "tiktok",
] as const;

function getAdminSecret(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("admin_secret") ?? "";
}

function setAdminSecret(value: string) {
  localStorage.setItem("admin_secret", value);
}

export default function AdminAutoaufbereitungPage() {
  const [config, setConfig] = useState<AutoaufbereitungConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [secret, setSecret] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadingBackground, setUploadingBackground] = useState(false);
  const [uploadingContactCard, setUploadingContactCard] = useState(false);
  const [mainUploadError, setMainUploadError] = useState<string | null>(null);

  useEffect(() => {
    setSecret(getAdminSecret());
  }, []);

  const load = async (adminSecret?: string) => {
    setLoading(true);
    setError(null);
    try {
      const headers: Record<string, string> = {};
      const s = adminSecret ?? getAdminSecret();
      if (s) headers["x-admin-secret"] = s;
      const res = await fetch("/api/admin/autoaufbereitung", { headers });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as AutoaufbereitungConfig;
      setConfig(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSaveSecret = () => {
    setAdminSecret(secret);
    load(secret);
  };

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      const s = getAdminSecret();
      if (s) headers["x-admin-secret"] = s;
      const res = await fetch("/api/admin/autoaufbereitung", {
        method: "PUT",
        headers,
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setMessage("Enregistré.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const updateConfig = (patch: Partial<AutoaufbereitungConfig>) => {
    setConfig((c) => (c ? { ...c, ...patch } : null));
  };

  const updateCategory = (index: number, patch: Partial<AutoaufbereitungServiceCategory>) => {
    setConfig((c) => {
      if (!c || !c.categories) return c;
      const next = [...c.categories];
      next[index] = { ...next[index], ...patch };
      return { ...c, categories: next };
    });
  };

  const updateCategoryItems = (index: number, items: string[]) => {
    updateCategory(index, { items });
  };

  const updateCategoryImages = (index: number, images: string[]) => {
    updateCategory(index, { images });
  };

  const updateQuickAction = (index: number, patch: Partial<AutoaufbereitungConfig["quickActions"][0]>) => {
    setConfig((c) => {
      if (!c) return c;
      const next = [...c.quickActions];
      next[index] = { ...next[index], ...patch };
      return { ...c, quickActions: next };
    });
  };

  const updateFaqForCategory = (
    slug: string,
    items: { question: string; answer: string }[]
  ) => {
    setConfig((c) => {
      if (!c) return c;
      const nextFaqs = { ...(c.faqs ?? {}) };
      if (items.length === 0) {
        delete nextFaqs[slug];
      } else {
        nextFaqs[slug] = items;
      }
      return { ...c, faqs: nextFaqs };
    });
  };

  const uploadSingleImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const headers: Record<string, string> = {};
    const s = getAdminSecret();
    if (s) headers["x-admin-secret"] = s;
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
      headers,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error ?? "Upload échoué");
    }
    return data.url as string;
  };

  const handleUploadBackground = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setMainUploadError(null);
    setUploadingBackground(true);
    try {
      const url = await uploadSingleImage(files[0]);
      updateConfig({ backgroundImageUrl: url });
    } catch (e) {
      setMainUploadError(e instanceof Error ? e.message : "Erreur upload fond");
    } finally {
      setUploadingBackground(false);
    }
  };

  const handleUploadContactCard = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setMainUploadError(null);
    setUploadingContactCard(true);
    try {
      const url = await uploadSingleImage(files[0]);
      updateConfig({ contactCardLogoUrl: url });
    } catch (e) {
      setMainUploadError(
        e instanceof Error ? e.message : "Erreur upload carte contact"
      );
    } finally {
      setUploadingContactCard(false);
    }
  };

  const handleUploadFiles = async (index: number, files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError(null);
    setUploadingIndex(index);
    try {
      const s = getAdminSecret();
      const uploadedUrls: string[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const headers: Record<string, string> = {};
        if (s) headers["x-admin-secret"] = s;
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
          headers,
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error ?? "Upload échoué");
        }
        uploadedUrls.push(data.url as string);
      }
      setConfig((c) => {
        if (!c || !c.categories) return c;
        const current = c.categories[index];
        const nextImages = [...(current.images ?? []), ...uploadedUrls];
        const nextCategories = [...c.categories];
        nextCategories[index] = { ...current, images: nextImages };
        return { ...c, categories: nextCategories };
      });
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Erreur upload");
    } finally {
      setUploadingIndex(null);
    }
  };

  if (loading && !config) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="text-slate-400">Chargement…</span>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="space-y-4">
        <p className="text-amber-400">
          Impossible de charger les données. Configurez éventuellement le secret admin.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="password"
            placeholder="Secret admin (env ADMIN_SECRET)"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-500"
          />
          <button
            type="button"
            onClick={handleSaveSecret}
            className="rounded bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
          >
            Valider
          </button>
        </div>
        <button
          type="button"
          onClick={() => load()}
          className="text-slate-400 hover:text-white"
        >
          Recharger sans secret
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">
          Autoaufbereitung — Puerto de la Cruz
        </h1>
        <div className="flex items-center gap-3">
          <Link
            href="/autoaufbereitung-puerto-de-la-cruz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:underline"
          >
            Voir la page
          </Link>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </div>

      {message && (
        <div className="rounded bg-emerald-900/50 px-4 py-2 text-emerald-300">
          {message}
        </div>
      )}
      {error && (
        <div className="rounded bg-red-900/50 px-4 py-2 text-red-300">{error}</div>
      )}

      {/* Secret (optionnel) */}
      <section className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
        <h2 className="mb-2 text-sm font-medium text-slate-400">
          Secret admin (optionnel)
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="password"
            placeholder="ADMIN_SECRET"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-500"
          />
          <button
            type="button"
            onClick={handleSaveSecret}
            className="rounded bg-slate-600 px-3 py-2 text-white hover:bg-slate-500"
          >
            Enregistrer
          </button>
        </div>
      </section>

      {/* Infos générales */}
      <section className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Infos générales
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm text-slate-400">Marque</span>
            <input
              type="text"
              value={config.brandName}
              onChange={(e) => updateConfig({ brandName: e.target.value })}
              className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-slate-400">Ville / Lieu</span>
            <input
              type="text"
              value={config.location}
              onChange={(e) => updateConfig({ location: e.target.value })}
              className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm text-slate-400">URL avatar / logo</span>
            <input
              type="text"
              value={config.avatarUrl}
              onChange={(e) => updateConfig({ avatarUrl: e.target.value })}
              className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm text-slate-400">
              URL logo carte de contact (optionnel)
            </span>
            <input
              type="text"
              value={config.contactCardLogoUrl ?? ""}
              onChange={(e) =>
                updateConfig({
                  contactCardLogoUrl: e.target.value || undefined,
                })
              }
              className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white"
            />
          </label>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-200">
                Image de fond de la page
              </span>
              {uploadingBackground && (
                <span className="text-xs text-sky-300">Upload…</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative h-24 w-40 overflow-hidden rounded border border-slate-600 bg-slate-900">
                {config.backgroundImageUrl ? (
                  <img
                    src={config.backgroundImageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                    Aucune image
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="bg-upload"
                  className="inline-flex cursor-pointer items-center justify-center rounded bg-slate-700 px-3 py-1.5 text-sm text-white hover:bg-slate-600"
                >
                  Changer l'image
                </label>
                <input
                  id="bg-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUploadBackground(e.target.files)}
                />
                <p className="text-xs text-slate-500">
                  Utilisée comme grand fond derrière le téléphone.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-200">
                Image de la carte WhatsApp
              </span>
              {uploadingContactCard && (
                <span className="text-xs text-sky-300">Upload…</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative h-24 w-40 overflow-hidden rounded border border-slate-600 bg-slate-900">
                {(config.contactCardLogoUrl || config.avatarUrl) ? (
                  <img
                    src={config.contactCardLogoUrl || config.avatarUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                    Aucune image
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-card-upload"
                  className="inline-flex cursor-pointer items-center justify-center rounded bg-slate-700 px-3 py-1.5 text-sm text-white hover:bg-slate-600"
                >
                  Changer l'image
                </label>
                <input
                  id="contact-card-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUploadContactCard(e.target.files)}
                />
                <p className="text-xs text-slate-500">
                  Affichée dans la carte « Contact WhatsApp ».
                </p>
              </div>
            </div>
          </div>
        </div>

        {mainUploadError && (
          <p className="mt-3 text-sm text-red-300">{mainUploadError}</p>
        )}
      </section>

      {/* Contact */}
      <section className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Contact</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm text-slate-400">Téléphone affiché</span>
            <input
              type="text"
              value={config.phone}
              onChange={(e) => updateConfig({ phone: e.target.value })}
              className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-slate-400">Adresse</span>
            <input
              type="text"
              value={config.address}
              onChange={(e) => updateConfig({ address: e.target.value })}
              className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm text-slate-400">Lien WhatsApp</span>
            <input
              type="url"
              value={config.whatsappHref}
              onChange={(e) => updateConfig({ whatsappHref: e.target.value })}
              className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-slate-400">Lien Google Maps</span>
            <input
              type="url"
              value={config.mapsHref}
              onChange={(e) => updateConfig({ mapsHref: e.target.value })}
              className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-slate-400">Instagram</span>
            <input
              type="url"
              value={config.instagramHref}
              onChange={(e) => updateConfig({ instagramHref: e.target.value })}
              className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-slate-400">Facebook</span>
            <input
              type="url"
              value={config.facebookHref}
              onChange={(e) => updateConfig({ facebookHref: e.target.value })}
              className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-white"
            />
          </label>
        </div>
      </section>

      {/* Quick actions */}
      <section className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Actions rapides</h2>
        <div className="space-y-4">
          {config.quickActions.map((qa, i) => (
            <div
              key={qa.id}
              className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-600 bg-slate-800/80 p-3"
            >
              <input
                type="text"
                placeholder="id"
                value={qa.id}
                onChange={(e) =>
                  updateQuickAction(i, { id: e.target.value })
                }
                className="w-28 rounded border border-slate-600 bg-slate-900 px-2 py-1.5 text-sm text-white"
              />
              <input
                type="text"
                placeholder="Titre"
                value={qa.title}
                onChange={(e) =>
                  updateQuickAction(i, { title: e.target.value })
                }
                className="min-w-[120px] flex-1 rounded border border-slate-600 bg-slate-900 px-2 py-1.5 text-white"
              />
              <input
                type="text"
                placeholder="Lien"
                value={qa.href}
                onChange={(e) =>
                  updateQuickAction(i, { href: e.target.value })
                }
                className="min-w-[180px] flex-1 rounded border border-slate-600 bg-slate-900 px-2 py-1.5 text-white"
              />
              <select
                value={qa.iconKey}
                onChange={(e) =>
                  updateQuickAction(i, {
                    iconKey: e.target.value as AutoaufbereitungConfig["quickActions"][0]["iconKey"],
                  })
                }
                className="rounded border border-slate-600 bg-slate-900 px-2 py-1.5 text-white"
              >
                {ICON_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-2 text-sm text-slate-400">
                <input
                  type="checkbox"
                  checked={qa.openInNewTab}
                  onChange={(e) =>
                    updateQuickAction(i, { openInNewTab: e.target.checked })
                  }
                />
                Nouvel onglet
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Catégories */}
      <section className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Catégories de services ({config.categories.length})
        </h2>
        <div className="space-y-2">
          {config.categories.map((cat, index) => (
            <div
              key={cat.slug}
              className="rounded-lg border border-slate-600 bg-slate-800/80 overflow-hidden"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedCategory(expandedCategory === index ? null : index)
                }
                className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-slate-700/50"
              >
                <span className="font-medium text-white">
                  {cat.section ? `[${cat.section}] ` : ""}
                  {cat.title}
                </span>
                <span className="text-slate-500">
                  {expandedCategory === index ? "▼" : "▶"}
                </span>
              </button>
              {expandedCategory === index && (
                <div className="space-y-4 border-t border-slate-600 p-4">
                  <label className="block">
                    <span className="mb-1 block text-sm text-slate-400">Slug</span>
                    <input
                      type="text"
                      value={cat.slug}
                      onChange={(e) =>
                        updateCategory(index, { slug: e.target.value })
                      }
                      className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm text-slate-400">Section</span>
                    <input
                      type="text"
                      value={cat.section ?? ""}
                      onChange={(e) =>
                        updateCategory(index, {
                          section: e.target.value || undefined,
                        })
                      }
                      className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm text-slate-400">Titre</span>
                    <input
                      type="text"
                      value={cat.title}
                      onChange={(e) =>
                        updateCategory(index, { title: e.target.value })
                      }
                      className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm text-slate-400">
                      Description
                    </span>
                    <textarea
                      value={cat.description}
                      onChange={(e) =>
                        updateCategory(index, { description: e.target.value })
                      }
                      rows={3}
                      className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-white"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm text-slate-400">
                      Points (un par ligne)
                    </span>
                    <textarea
                      value={(cat.items ?? []).join("\n")}
                      onChange={(e) =>
                        updateCategoryItems(
                          index,
                          e.target.value
                            .split("\n")
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      }
                      rows={4}
                      className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 font-mono text-sm text-white"
                    />
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        Images (déposer ou cliquer sur +)
                      </span>
                      {uploadingIndex === index && (
                        <span className="text-xs text-sky-300">
                          Upload en cours…
                        </span>
                      )}
                    </div>
                    <div
                      className="rounded-lg border border-dashed border-slate-600 bg-slate-900/70 p-3"
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleUploadFiles(index, e.dataTransfer.files);
                      }}
                    >
                      <div className="mb-3 flex flex-wrap gap-3">
                        {(cat.images ?? []).map((url, imgIndex) => (
                          <div
                            key={url + imgIndex}
                            className="relative h-20 w-28 overflow-hidden rounded border border-slate-700 bg-slate-800"
                          >
                            <img
                              src={url}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                updateCategoryImages(
                                  index,
                                  (cat.images ?? []).filter(
                                    (_, i2) => i2 !== imgIndex
                                  )
                                )
                              }
                              className="absolute right-1 top-1 rounded-full bg-black/60 px-1.5 text-xs text-slate-100 hover:bg-black/80"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <label
                          htmlFor={`file-${index}`}
                          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-500 bg-slate-800 text-xl text-slate-200 hover:bg-slate-700"
                        >
                          +
                        </label>
                        <p className="text-xs text-slate-400">
                          Glissez vos images ici ou cliquez sur + pour en
                          ajouter. Elles seront enregistrées dans le site.
                        </p>
                        <input
                          id={`file-${index}`}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) =>
                            handleUploadFiles(index, e.target.files)
                          }
                        />
                      </div>
                    </div>
                    {uploadError && (
                      <p className="text-xs text-red-300">{uploadError}</p>
                    )}
                  </div>

                  {/* FAQs pour cette catégorie */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        Questions / réponses (FAQ)
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          if (!config) return;
                          const fallbackFaqs = getAutoaufbereitungFaq(
                            autoaufbereitungDefaultLocale,
                            cat.slug
                          );
                          const current =
                            config.faqs?.[cat.slug] ?? fallbackFaqs;
                          updateFaqForCategory(cat.slug, [
                            ...current,
                            { question: "", answer: "" },
                          ]);
                        }}
                        className="rounded bg-slate-700 px-2 py-1 text-xs text-white hover:bg-slate-600"
                      >
                        Ajouter une question
                      </button>
                    </div>
                    <div className="space-y-3">
                      {(() => {
                        const fallbackFaqs = getAutoaufbereitungFaq(
                          autoaufbereitungDefaultLocale,
                          cat.slug
                        );
                        const currentFaqs =
                          config.faqs?.[cat.slug] ?? fallbackFaqs;
                        return currentFaqs.map((faq, faqIndex) => (
                          <div
                            key={faqIndex}
                            className="rounded-lg border border-slate-700 bg-slate-900/80 p-3 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-slate-300">
                                Question {faqIndex + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const current =
                                    config.faqs?.[cat.slug] ??
                                    fallbackFaqs;
                                  const next = current.filter(
                                    (_, i2) => i2 !== faqIndex
                                  );
                                  updateFaqForCategory(cat.slug, next);
                                }}
                                className="text-xs text-slate-400 hover:text-red-300"
                              >
                                Supprimer
                              </button>
                            </div>
                            <textarea
                              value={faq.question}
                              onChange={(e) => {
                                const current =
                                  config.faqs?.[cat.slug] ??
                                  fallbackFaqs;
                                const next = [...current];
                                next[faqIndex] = {
                                  ...next[faqIndex],
                                  question: e.target.value,
                                };
                                updateFaqForCategory(cat.slug, next);
                              }}
                              rows={2}
                              placeholder="Question"
                              className="w-full rounded border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500"
                            />
                            <textarea
                              value={faq.answer}
                              onChange={(e) => {
                                const current =
                                  config.faqs?.[cat.slug] ??
                                  fallbackFaqs;
                                const next = [...current];
                                next[faqIndex] = {
                                  ...next[faqIndex],
                                  answer: e.target.value,
                                };
                                updateFaqForCategory(cat.slug, next);
                              }}
                              rows={3}
                              placeholder="Réponse"
                              className="w-full rounded border border-slate-600 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500"
                            />
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}
