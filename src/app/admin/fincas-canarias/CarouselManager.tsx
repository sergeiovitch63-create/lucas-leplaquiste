"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

export interface CarouselItem {
  id: number;
  img: string | null;
  name: {
    es: string;
    en: string;
    de: string;
    fr?: string;
    it?: string;
    ru?: string;
    pl?: string;
  };
  description: {
    es: string;
    en: string;
    de: string;
    fr?: string;
    it?: string;
    ru?: string;
    pl?: string;
  };
  order: number;
}

export interface CarouselConfig {
  title: {
    es: string;
    en: string;
    de: string;
    fr?: string;
    it?: string;
    ru?: string;
    pl?: string;
  };
  description: {
    es: string;
    en: string;
    de: string;
    fr?: string;
    it?: string;
    ru?: string;
    pl?: string;
  };
  items: CarouselItem[];
}

const inputStyle = {
  width: "100%",
  background: "var(--surface2)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  color: "var(--cream)",
  fontFamily: "'Lato',sans-serif",
  fontSize: ".88rem",
  padding: "10px 14px",
  outline: "none",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical" as const,
  minHeight: 90,
  lineHeight: 1.5,
};

const btnStyle = (variant: "gold" | "outline" | "danger" = "gold") => ({
  fontFamily: "'Lato',sans-serif",
  fontSize: ".75rem",
  fontWeight: 700,
  letterSpacing: ".1em",
  textTransform: "uppercase" as const,
  padding: "7px 16px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  transition: "all .2s",
  ...(variant === "gold"
    ? { background: "var(--gold)", color: "#1a0a02" }
    : variant === "outline"
    ? { background: "transparent", border: "1px solid var(--border)", color: "var(--muted)" }
    : variant === "danger"
    ? { background: "var(--danger-bg)", border: "1px solid rgba(192,57,43,.3)", color: "#e74c3c" }
    : {}),
});

export default function CarouselManager({
  showToast,
}: {
  showToast: (message: string, type?: "success" | "error") => void;
}) {
  const [config, setConfig] = useState<CarouselConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<CarouselItem | null>(null);
  const [newItem, setNewItem] = useState<CarouselItem | null>(null);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"config" | "items">("config");
  const fileRef = useRef<HTMLInputElement>(null);

  const loadCarousel = useCallback(async () => {
    try {
      const res = await fetch("/api/fincas-canarias/carousel");
      if (!res.ok) throw new Error("Erreur chargement");
      const data = await res.json();
      setConfig(data);
    } catch {
      showToast("Erreur lors du chargement du carrousel", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadCarousel();
  }, [loadCarousel]);

  const saveConfig = async () => {
    if (!config) return;
    try {
      const res = await fetch("/api/fincas-canarias/carousel", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: config.title,
          description: config.description,
        }),
      });
      if (!res.ok) throw new Error("Erreur sauvegarde");
      await loadCarousel();
      showToast("Configuration sauvegardée !");
    } catch {
      showToast("Erreur lors de la sauvegarde", "error");
    }
  };

  const saveItem = async (item: CarouselItem, isNew: boolean) => {
    if (!config) return;
    try {
      if (isNew) {
        const res = await fetch("/api/fincas-canarias/carousel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        if (!res.ok) throw new Error("Erreur sauvegarde");
      } else {
        const updatedItems = config.items.map((i) => (i.id === item.id ? item : i));
        const res = await fetch("/api/fincas-canarias/carousel", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: updatedItems }),
        });
        if (!res.ok) throw new Error("Erreur sauvegarde");
      }
      await loadCarousel();
      setEditItem(null);
      setNewItem(null);
      setShowAddPanel(false);
      showToast(`Élément ${isNew ? "ajouté" : "modifié"} !`);
    } catch {
      showToast("Erreur lors de la sauvegarde", "error");
    }
  };

  const deleteItem = async (id: number) => {
    if (!config) return;
    try {
      const res = await fetch(`/api/fincas-canarias/carousel?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur suppression");
      await loadCarousel();
      setConfirmDeleteId(null);
      showToast("Élément supprimé !");
    } catch {
      showToast("Erreur lors de la suppression", "error");
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, item: CarouselItem | null, setItem: (item: CarouselItem) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (item) {
        setItem({ ...item, img: ev.target?.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  if (loading || !config) {
    return <div style={{ textAlign: "center", padding: "40px", color: "var(--muted)" }}>Chargement…</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "var(--cream)" }}>
            Gestion du carrousel
          </div>
          <div style={{ fontSize: ".75rem", color: "var(--muted)", marginTop: 2 }}>
            {config.items.length} élément{config.items.length !== 1 ? "s" : ""}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{ ...btnStyle(activeTab === "config" ? "gold" : "outline"), padding: "6px 12px", fontSize: ".7rem" }}
            onClick={() => setActiveTab("config")}
          >
            ⚙️ Configuration
          </button>
          <button
            style={{ ...btnStyle(activeTab === "items" ? "gold" : "outline"), padding: "6px 12px", fontSize: ".7rem" }}
            onClick={() => setActiveTab("items")}
          >
            📷 Éléments
          </button>
          {activeTab === "items" && (
            <button style={btnStyle("gold")} onClick={() => {
              setNewItem({
                id: 0,
                img: null,
                name: { es: "", en: "", de: "" },
                description: { es: "", en: "", de: "" },
                order: config.items.length,
              });
              setShowAddPanel(true);
            }}>
              + Ajouter un élément
            </button>
          )}
        </div>
      </div>

      {activeTab === "config" && (
        <div style={{
          background: "var(--surface)",
          border: "1px solid rgba(201,150,58,.25)",
          borderRadius: 12,
          padding: 24,
          marginBottom: 24,
        }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "var(--gold)", marginBottom: 20 }}>
            ✦ Titre et description du carrousel
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
              Titre (ES)
            </label>
            <input
              style={inputStyle}
              value={config.title.es}
              onChange={(e) => setConfig({ ...config, title: { ...config.title, es: e.target.value } })}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                Titre (EN)
              </label>
              <input
                style={inputStyle}
                value={config.title.en}
                onChange={(e) => setConfig({ ...config, title: { ...config.title, en: e.target.value } })}
              />
            </div>
            <div>
              <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                Titre (DE)
              </label>
              <input
                style={inputStyle}
                value={config.title.de}
                onChange={(e) => setConfig({ ...config, title: { ...config.title, de: e.target.value } })}
              />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
              Description (ES)
            </label>
            <textarea
              style={textareaStyle}
              value={config.description.es}
              onChange={(e) => setConfig({ ...config, description: { ...config.description, es: e.target.value } })}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                Description (EN)
              </label>
              <textarea
                style={textareaStyle}
                value={config.description.en}
                onChange={(e) => setConfig({ ...config, description: { ...config.description, en: e.target.value } })}
              />
            </div>
            <div>
              <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                Description (DE)
              </label>
              <textarea
                style={textareaStyle}
                value={config.description.de}
                onChange={(e) => setConfig({ ...config, description: { ...config.description, de: e.target.value } })}
              />
            </div>
          </div>
          <button style={btnStyle("gold")} onClick={saveConfig}>Enregistrer la configuration</button>
        </div>
      )}

      {activeTab === "items" && (
        <>
          {showAddPanel && newItem && (
            <div style={{
              background: "var(--surface)",
              border: "1px solid rgba(201,150,58,.25)",
              borderRadius: 12,
              padding: 20,
              marginBottom: 24,
            }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "var(--gold)", marginBottom: 16 }}>
                ✦ Nouvel élément
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8, display: "block" }}>
                  📷 Photo de la carte
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  style={{
                    border: "2px dashed var(--border)",
                    borderRadius: 10,
                    padding: newItem.img ? "12px" : "24px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: newItem.img ? "var(--surface2)" : "transparent",
                    transition: "all .2s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (newItem.img) {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (newItem.img) {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    }
                  }}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleFile(e, newItem, setNewItem)}
                  />
                  {newItem.img ? (
                    <>
                      <div style={{ position: "relative", width: "100%", height: 250, marginBottom: 8 }}>
                        <Image src={newItem.img} alt="" fill style={{ objectFit: "cover", borderRadius: 8 }} unoptimized />
                      </div>
                      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileRef.current?.click();
                          }}
                          style={{
                            ...btnStyle("outline"),
                            padding: "6px 12px",
                            fontSize: ".7rem",
                          }}
                        >
                          ✏️ Changer
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setNewItem({ ...newItem, img: null });
                          }}
                          style={{
                            ...btnStyle("danger"),
                            padding: "6px 12px",
                            fontSize: ".7rem",
                          }}
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 48, height: 48, color: "var(--muted)", marginBottom: 12, margin: "0 auto 12px" }}>
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <p style={{ fontSize: ".85rem", color: "var(--text)", marginBottom: 4, fontWeight: 600 }}>Cliquer pour ajouter une photo</p>
                      <p style={{ fontSize: ".72rem", color: "var(--muted)" }}>JPG, PNG ou GIF (max 5MB)</p>
                    </>
                  )}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                  Nom (ES)
                </label>
                <input
                  style={inputStyle}
                  value={newItem.name.es}
                  onChange={(e) => setNewItem({ ...newItem, name: { ...newItem.name, es: e.target.value } })}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                    Nom (EN)
                  </label>
                  <input
                    style={inputStyle}
                    value={newItem.name.en}
                    onChange={(e) => setNewItem({ ...newItem, name: { ...newItem.name, en: e.target.value } })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                    Nom (DE)
                  </label>
                  <input
                    style={inputStyle}
                    value={newItem.name.de}
                    onChange={(e) => setNewItem({ ...newItem, name: { ...newItem.name, de: e.target.value } })}
                  />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                  Description (ES)
                </label>
                <textarea
                  style={textareaStyle}
                  value={newItem.description.es}
                  onChange={(e) => setNewItem({ ...newItem, description: { ...newItem.description, es: e.target.value } })}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div>
                  <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                    Description (EN)
                  </label>
                  <textarea
                    style={textareaStyle}
                    value={newItem.description.en}
                    onChange={(e) => setNewItem({ ...newItem, description: { ...newItem.description, en: e.target.value } })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                    Description (DE)
                  </label>
                  <textarea
                    style={textareaStyle}
                    value={newItem.description.de}
                    onChange={(e) => setNewItem({ ...newItem, description: { ...newItem.description, de: e.target.value } })}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={btnStyle("outline")} onClick={() => { setShowAddPanel(false); setNewItem(null); }}>
                  Annuler
                </button>
                <button style={btnStyle("gold")} onClick={() => saveItem(newItem, true)}>
                  Ajouter
                </button>
              </div>
            </div>
          )}

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 2fr 120px",
              padding: "10px 16px",
              borderBottom: "1px solid var(--border)",
              fontSize: ".65rem",
              letterSpacing: ".15em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}>
              <div>Image</div>
              <div>Nom</div>
              <div>Description</div>
              <div>Actions</div>
            </div>

            {config.items.sort((a, b) => a.order - b.order).map((item) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 2fr 120px",
                  padding: "12px 16px",
                  borderBottom: "1px solid rgba(201,150,58,.08)",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ position: "relative" }}>
                  {item.img ? (
                    <div
                      style={{ 
                        width: 60, 
                        height: 60, 
                        position: "relative",
                        borderRadius: 8, 
                        border: "1px solid var(--border)",
                        cursor: "pointer",
                        overflow: "hidden",
                      }}
                      onClick={() => {
                        const w = window.open("");
                        if (w) {
                          // eslint-disable-next-line @next/next/no-img-element
                          w.document.write(`<img src="${item.img}" style="max-width: 90vw; max-height: 90vh; margin: auto; display: block;" alt="Preview" />`);
                        }
                      }}
                      title="Cliquer pour agrandir"
                    >
                      <Image src={item.img} alt="" fill style={{ objectFit: "cover" }} unoptimized />
                    </div>
                  ) : (
                    <div style={{ 
                      width: 60, 
                      height: 60, 
                      background: "var(--surface2)", 
                      borderRadius: 8, 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      color: "var(--muted)", 
                      fontSize: ".65rem",
                      border: "1px dashed var(--border)",
                      textAlign: "center",
                      padding: 4,
                    }}>
                      📷<br/>Aucune
                    </div>
                  )}
                </div>
                <div>
                  <div style={{ fontSize: ".88rem", color: "var(--cream)", fontWeight: 600 }}>
                    {item.name.es}
                  </div>
                  <div style={{ fontSize: ".72rem", color: "var(--muted)", marginTop: 2 }}>
                    {item.name.en}
                  </div>
                </div>
                <div style={{ fontSize: ".75rem", color: "var(--text)", lineHeight: 1.4 }}>
                  {item.description.es || "—"}
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={btnStyle("outline")} onClick={() => setEditItem({ ...item })}>
                    ✏ Modifier
                  </button>
                  <button style={btnStyle("danger")} onClick={() => setConfirmDeleteId(item.id)}>
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {editItem && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(5,2,1,.92)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}>
          <div style={{
            background: "var(--surface)",
            border: "1px solid rgba(201,150,58,.3)",
            borderRadius: 16,
            width: "100%",
            maxWidth: 700,
            maxHeight: "92vh",
            overflowY: "auto",
            position: "relative",
            animation: "modalIn .25s ease",
          }}>
            <div style={{
              padding: "20px 24px 16px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", color: "var(--cream)" }}>
                Modifier — {editItem.name.es}
              </div>
              <button
                style={{ background: "transparent", border: "none", color: "var(--muted)", fontSize: "1.4rem", cursor: "pointer", lineHeight: 1 }}
                onClick={() => setEditItem(null)}
              >
                ×
              </button>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8, display: "block" }}>
                  📷 Photo de la carte
                </label>
                <div
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (ev: Event) => {
                      const target = ev.target as HTMLInputElement;
                      handleFile({ target } as React.ChangeEvent<HTMLInputElement>, editItem, setEditItem);
                    };
                    input.click();
                  }}
                  style={{
                    border: "2px dashed var(--border)",
                    borderRadius: 10,
                    padding: editItem.img ? "12px" : "24px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: editItem.img ? "var(--surface2)" : "transparent",
                    transition: "all .2s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (editItem.img) {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (editItem.img) {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    }
                  }}
                >
                  {editItem.img ? (
                    <>
                      <div style={{ position: "relative", width: "100%", height: 250, marginBottom: 8 }}>
                        <Image src={editItem.img} alt="" fill style={{ objectFit: "cover", borderRadius: 8 }} unoptimized />
                      </div>
                      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "image/*";
                            input.onchange = (ev: Event) => {
                              const target = ev.target as HTMLInputElement;
                              handleFile({ target } as React.ChangeEvent<HTMLInputElement>, editItem, setEditItem);
                            };
                            input.click();
                          }}
                          style={{
                            ...btnStyle("outline"),
                            padding: "6px 12px",
                            fontSize: ".7rem",
                          }}
                        >
                          ✏️ Changer
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditItem({ ...editItem, img: null });
                          }}
                          style={{
                            ...btnStyle("danger"),
                            padding: "6px 12px",
                            fontSize: ".7rem",
                          }}
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 48, height: 48, color: "var(--muted)", marginBottom: 12, margin: "0 auto 12px" }}>
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <p style={{ fontSize: ".85rem", color: "var(--text)", marginBottom: 4, fontWeight: 600 }}>Cliquer pour ajouter une photo</p>
                      <p style={{ fontSize: ".72rem", color: "var(--muted)" }}>JPG, PNG ou GIF (max 5MB)</p>
                    </>
                  )}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                  Nom (ES)
                </label>
                <input
                  style={inputStyle}
                  value={editItem.name.es}
                  onChange={(e) => setEditItem({ ...editItem, name: { ...editItem.name, es: e.target.value } })}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                    Nom (EN)
                  </label>
                  <input
                    style={inputStyle}
                    value={editItem.name.en}
                    onChange={(e) => setEditItem({ ...editItem, name: { ...editItem.name, en: e.target.value } })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                    Nom (DE)
                  </label>
                  <input
                    style={inputStyle}
                    value={editItem.name.de}
                    onChange={(e) => setEditItem({ ...editItem, name: { ...editItem.name, de: e.target.value } })}
                  />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                  Description (ES)
                </label>
                <textarea
                  style={textareaStyle}
                  value={editItem.description.es}
                  onChange={(e) => setEditItem({ ...editItem, description: { ...editItem.description, es: e.target.value } })}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div>
                  <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                    Description (EN)
                  </label>
                  <textarea
                    style={textareaStyle}
                    value={editItem.description.en}
                    onChange={(e) => setEditItem({ ...editItem, description: { ...editItem.description, en: e.target.value } })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                    Description (DE)
                  </label>
                  <textarea
                    style={textareaStyle}
                    value={editItem.description.de}
                    onChange={(e) => setEditItem({ ...editItem, description: { ...editItem.description, de: e.target.value } })}
                  />
                </div>
              </div>
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button style={btnStyle("outline")} onClick={() => setEditItem(null)}>Annuler</button>
              <button style={btnStyle("gold")} onClick={() => saveItem(editItem, false)}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 300,
          background: "rgba(5,2,1,.95)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}>
          <div style={{
            background: "var(--surface)",
            border: "1px solid rgba(192,57,43,.4)",
            borderRadius: 14,
            padding: "28px 32px",
            maxWidth: 400,
            width: "100%",
            textAlign: "center",
            animation: "modalIn .25s ease",
          }}>
            <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>🗑</div>
            <div style={{ fontSize: ".9rem", color: "var(--cream)", marginBottom: 20, lineHeight: 1.5 }}>
              Supprimer cet élément définitivement ?
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button style={btnStyle("outline")} onClick={() => setConfirmDeleteId(null)}>Annuler</button>
              <button style={btnStyle("danger")} onClick={() => deleteItem(confirmDeleteId)}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


