"use client";

import { useState, useEffect, useCallback } from "react";

export interface Category {
  id: string;
  key: string;
  label: {
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

export default function CategoriesManager({
  showToast,
}: {
  showToast: (message: string, type?: "success" | "error") => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<Category | null>(null);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/fincas-canarias/categories");
      if (!res.ok) throw new Error("Erreur chargement");
      const data = await res.json();
      setCategories(data.sort((a: Category, b: Category) => a.order - b.order));
    } catch {
      showToast("Erreur lors du chargement des catégories", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const saveCategory = async (category: Category, isNew: boolean) => {
    try {
      const res = await fetch("/api/fincas-canarias/categories", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      if (!res.ok) throw new Error("Erreur sauvegarde");
      await loadCategories();
      setEditCategory(null);
      setNewCategory(null);
      setShowAddPanel(false);
      showToast(`Catégorie ${isNew ? "ajoutée" : "modifiée"} !`);
    } catch {
      showToast("Erreur lors de la sauvegarde", "error");
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/fincas-canarias/categories?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur suppression");
      await loadCategories();
      setConfirmDeleteId(null);
      showToast("Catégorie supprimée !");
    } catch {
      showToast("Erreur lors de la suppression", "error");
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "40px", color: "var(--muted)" }}>Chargement…</div>;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", color: "var(--cream)" }}>
            Gestion des catégories
          </div>
          <div style={{ fontSize: ".75rem", color: "var(--muted)", marginTop: 2 }}>
            {categories.length} catégorie{categories.length !== 1 ? "s" : ""}
          </div>
        </div>
        <button style={btnStyle("gold")} onClick={() => {
          setNewCategory({
            id: "",
            key: "",
            label: { es: "", en: "", de: "" },
            order: categories.length,
          });
          setShowAddPanel(true);
        }}>
          + Ajouter une catégorie
        </button>
      </div>

      {showAddPanel && newCategory && (
        <div style={{
          background: "var(--surface)",
          border: "1px solid rgba(201,150,58,.25)",
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
        }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "var(--gold)", marginBottom: 16 }}>
            ✦ Nouvelle catégorie
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                Clé technique (ex: &quot;NouvelleCategorie&quot;)
              </label>
              <input
                style={inputStyle}
                value={newCategory.key}
                onChange={(e) => setNewCategory({ ...newCategory, key: e.target.value })}
                placeholder="NouvelleCategorie"
              />
            </div>
            <div>
              <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                Ordre
              </label>
              <input
                type="number"
                style={inputStyle}
                value={newCategory.order}
                onChange={(e) => setNewCategory({ ...newCategory, order: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
              Nom (ES)
            </label>
            <input
              style={inputStyle}
              value={newCategory.label.es}
              onChange={(e) => setNewCategory({ ...newCategory, label: { ...newCategory.label, es: e.target.value } })}
              placeholder="Nom en espagnol"
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                Nom (EN)
              </label>
              <input
                style={inputStyle}
                value={newCategory.label.en}
                onChange={(e) => setNewCategory({ ...newCategory, label: { ...newCategory.label, en: e.target.value } })}
                placeholder="Nom en anglais"
              />
            </div>
            <div>
              <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                Nom (DE)
              </label>
              <input
                style={inputStyle}
                value={newCategory.label.de}
                onChange={(e) => setNewCategory({ ...newCategory, label: { ...newCategory.label, de: e.target.value } })}
                placeholder="Nom en allemand"
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={btnStyle("outline")} onClick={() => { setShowAddPanel(false); setNewCategory(null); }}>
              Annuler
            </button>
            <button style={btnStyle("gold")} onClick={() => saveCategory(newCategory, true)}>
              Ajouter
            </button>
          </div>
        </div>
      )}

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "60px 1fr 200px 120px",
          padding: "10px 16px",
          borderBottom: "1px solid var(--border)",
          fontSize: ".65rem",
          letterSpacing: ".15em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}>
          <div>Ordre</div>
          <div>Catégorie</div>
          <div>Clé</div>
          <div>Actions</div>
        </div>

        {categories.map((cat) => (
          <div
            key={cat.id}
            style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr 200px 120px",
              padding: "12px 16px",
              borderBottom: "1px solid rgba(201,150,58,.08)",
              alignItems: "center",
            }}
          >
            <div style={{ color: "var(--muted)", fontSize: ".85rem" }}>{cat.order}</div>
            <div>
              <div style={{ fontSize: ".88rem", color: "var(--cream)", fontWeight: 600 }}>
                {cat.label.es}
              </div>
              <div style={{ fontSize: ".72rem", color: "var(--muted)", marginTop: 2 }}>
                {cat.label.en} / {cat.label.de}
              </div>
            </div>
            <div style={{ fontSize: ".75rem", color: "var(--gold)", fontFamily: "monospace" }}>
              {cat.key}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={btnStyle("outline")} onClick={() => setEditCategory({ ...cat })}>
                ✏ Modifier
              </button>
              {cat.key !== "All" && (
                <button style={btnStyle("danger")} onClick={() => setConfirmDeleteId(cat.id)}>
                  🗑
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {editCategory && (
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
            maxWidth: 600,
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
                Modifier — {editCategory.label.es}
              </div>
              <button
                style={{ background: "transparent", border: "none", color: "var(--muted)", fontSize: "1.4rem", cursor: "pointer", lineHeight: 1 }}
                onClick={() => setEditCategory(null)}
              >
                ×
              </button>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                  Clé technique
                </label>
                <input
                  style={inputStyle}
                  value={editCategory.key}
                  onChange={(e) => setEditCategory({ ...editCategory, key: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                  Ordre
                </label>
                <input
                  type="number"
                  style={inputStyle}
                  value={editCategory.order}
                  onChange={(e) => setEditCategory({ ...editCategory, order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                  Nom (ES)
                </label>
                <input
                  style={inputStyle}
                  value={editCategory.label.es}
                  onChange={(e) => setEditCategory({ ...editCategory, label: { ...editCategory.label, es: e.target.value } })}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                    Nom (EN)
                  </label>
                  <input
                    style={inputStyle}
                    value={editCategory.label.en}
                    onChange={(e) => setEditCategory({ ...editCategory, label: { ...editCategory.label, en: e.target.value } })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6, display: "block" }}>
                    Nom (DE)
                  </label>
                  <input
                    style={inputStyle}
                    value={editCategory.label.de}
                    onChange={(e) => setEditCategory({ ...editCategory, label: { ...editCategory.label, de: e.target.value } })}
                  />
                </div>
              </div>
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button style={btnStyle("outline")} onClick={() => setEditCategory(null)}>Annuler</button>
              <button style={btnStyle("gold")} onClick={() => saveCategory(editCategory, false)}>Enregistrer</button>
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
              Supprimer « {categories.find(c => c.id === confirmDeleteId)?.label?.es} » définitivement ?
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button style={btnStyle("outline")} onClick={() => setConfirmDeleteId(null)}>Annuler</button>
              <button style={btnStyle("danger")} onClick={() => deleteCategory(confirmDeleteId)}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


