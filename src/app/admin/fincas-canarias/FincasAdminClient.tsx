"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product, Lang } from "@/app/fincas-canarias/data";
import CategoriesManager from "./CategoriesManager";
import CarouselManager from "./CarouselManager";

const CAT_KEYS = ["All","Biscuits","Snacks","Confitures","Miel","Sauces","Conserves","Vins","Packs"];
const CAT_LABEL: Record<string, string> = {
  All:"Tous", Biscuits:"Galletas & Repostería", Snacks:"Snacks",
  Confitures:"Confitures & Dulces", Miel:"Miel", Sauces:"Salsas & Condimentos",
  Conserves:"Conservas", Vins:"Vinos, Licores & Zumos", Packs:"Packs"
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;600;700&display=swap');
  :root {
    --bg:#0f0a06; --surface:#1c1108; --surface2:#261608;
    --border:rgba(201,150,58,0.2); --gold:#c9963a; --gold-light:#e8b85a;
    --gold-pale:#f5d98a; --cream:#f0e0c0; --muted:#7a5a3a;
    --danger:#c0392b; --danger-bg:rgba(192,57,43,0.12);
    --success:#27ae60; --success-bg:rgba(39,174,96,0.12); --text:#e0c898;
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  body{
    background:var(--bg);
    background-image:radial-gradient(ellipse at top, rgba(201,150,58,0.03) 0%, transparent 50%),
                      radial-gradient(ellipse at bottom, rgba(232,184,90,0.02) 0%, transparent 50%);
    color:var(--text);
    font-family:'Lato',sans-serif;
  }
  ::-webkit-scrollbar{width:6px;}
  ::-webkit-scrollbar-track{background:var(--bg);}
  ::-webkit-scrollbar-thumb{background:var(--gold);border-radius:3px;}
  ::-webkit-scrollbar-thumb:hover{background:var(--gold-light);}
  button:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(201,150,58,.2);}
  button:active{transform:translateY(0);}
`;

function PlaceholderImg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:18,height:18,color:"var(--muted)",opacity:.5}}>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  );
}

function Toast({ message, type, visible }: { message: string; type: "success" | "error"; visible: boolean }) {
  if (!visible) return null;
  return (
    <div style={{
      position:"fixed", bottom:24, right:24, zIndex:999,
      background:"var(--surface)", border:`1px solid ${type==="success" ? "rgba(39,174,96,.4)" : "rgba(192,57,43,.4)"}`,
      borderRadius:10, padding:"14px 20px", fontSize:".82rem",
      display:"flex", alignItems:"center", gap:10,
      boxShadow:"0 8px 32px rgba(0,0,0,.4)",
      animation:"toastIn .3s ease",
    }}>
      <div style={{width:8,height:8,borderRadius:"50%",background:type==="success"?"var(--success)":"var(--danger)",flexShrink:0}}/>
      <span style={{color:"var(--cream)"}}>{message}</span>
    </div>
  );
}

function FormTabs({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const tabs = [
    { id:"es", label:"🇪🇸 Español" },
    { id:"en", label:"🇬🇧 English" },
    { id:"de", label:"🇩🇪 Deutsch" },
    { id:"fr", label:"🇫🇷 Français" },
    { id:"it", label:"🇮🇹 Italiano" },
    { id:"ru", label:"🇷🇺 Русский" },
    { id:"pl", label:"🇵🇱 Polski" },
    { id:"img", label:"📷 Photo" },
    { id:"meta", label:"⚙ Infos" },
  ];
  return (
    <div style={{display:"flex",gap:2,marginBottom:20,background:"var(--surface2)",padding:4,borderRadius:8}}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onTabChange(t.id)} style={{
          flex:1, textAlign:"center", padding:"7px 4px", borderRadius:6,
          fontSize:".72rem", fontWeight:700, letterSpacing:".08em", cursor:"pointer",
          border:"none", transition:"all .2s",
          background: activeTab===t.id ? "var(--gold)" : "transparent",
          color: activeTab===t.id ? "#1a0a02" : "var(--muted)",
        }}>{t.label}</button>
      ))}
    </div>
  );
}

function FormGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{marginBottom:16}}>
      <label style={{fontSize:".7rem",letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted)",marginBottom:6,display:"block"}}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width:"100%", background:"var(--surface2)", border:"1px solid var(--border)",
  borderRadius:8, color:"var(--cream)", fontFamily:"'Lato',sans-serif", fontSize:".88rem",
  padding:"10px 14px", outline:"none",
};
const textareaStyle = { ...inputStyle, resize:"vertical" as const, minHeight:90, lineHeight:1.5 };
const selectStyle = { ...inputStyle };

function ProductForm({ product, onChange, imgData, onImgChange, onImgRemove }: {
  product: Product | null;
  onChange: (p: Product) => void;
  imgData: string | null;
  onImgChange: (data: string) => void;
  onImgRemove: () => void;
}) {
  const [activeTab, setActiveTab] = useState("es");
  const fileRef = useRef<HTMLInputElement>(null);

  const field = (lang: Lang, key: "name" | "subtitle" | "desc") => product?.[key]?.[lang] ?? "";
  const set = (lang: Lang, key: "name" | "subtitle" | "desc", val: string) => {
    if (!product) return;
    onChange({ ...product, [key]: { ...product[key], [lang]: val } });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onImgChange(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onImgChange(ev.target?.result as string);
    reader.readAsDataURL(file);
  }, [onImgChange]);

  const currentImg = imgData === "__remove__" ? null : imgData || product?.img || null;

  if (!product) return null;

  return (
    <div>
      <FormTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "es" && (
        <div>
          <FormGroup label="Nom (ES)"><input style={inputStyle} value={field("es","name")} onChange={e=>set("es","name",e.target.value)}/></FormGroup>
          <FormGroup label="Sous-titre (ES)"><input style={inputStyle} value={field("es","subtitle")} onChange={e=>set("es","subtitle",e.target.value)}/></FormGroup>
          <FormGroup label="Description (ES)"><textarea style={textareaStyle} value={field("es","desc")} onChange={e=>set("es","desc",e.target.value)}/></FormGroup>
        </div>
      )}
      {activeTab === "en" && (
        <div>
          <FormGroup label="Name (EN)"><input style={inputStyle} value={field("en","name")} onChange={e=>set("en","name",e.target.value)}/></FormGroup>
          <FormGroup label="Subtitle (EN)"><input style={inputStyle} value={field("en","subtitle")} onChange={e=>set("en","subtitle",e.target.value)}/></FormGroup>
          <FormGroup label="Description (EN)"><textarea style={textareaStyle} value={field("en","desc")} onChange={e=>set("en","desc",e.target.value)}/></FormGroup>
        </div>
      )}
      {activeTab === "de" && (
        <div>
          <FormGroup label="Name (DE)"><input style={inputStyle} value={field("de","name")} onChange={e=>set("de","name",e.target.value)}/></FormGroup>
          <FormGroup label="Untertitel (DE)"><input style={inputStyle} value={field("de","subtitle")} onChange={e=>set("de","subtitle",e.target.value)}/></FormGroup>
          <FormGroup label="Beschreibung (DE)"><textarea style={textareaStyle} value={field("de","desc")} onChange={e=>set("de","desc",e.target.value)}/></FormGroup>
        </div>
      )}
      {activeTab === "fr" && (
        <div>
          <FormGroup label="Nom (FR)"><input style={inputStyle} value={field("fr","name")} onChange={e=>set("fr","name",e.target.value)}/></FormGroup>
          <FormGroup label="Sous-titre (FR)"><input style={inputStyle} value={field("fr","subtitle")} onChange={e=>set("fr","subtitle",e.target.value)}/></FormGroup>
          <FormGroup label="Description (FR)"><textarea style={textareaStyle} value={field("fr","desc")} onChange={e=>set("fr","desc",e.target.value)}/></FormGroup>
        </div>
      )}
      {activeTab === "it" && (
        <div>
          <FormGroup label="Nome (IT)"><input style={inputStyle} value={field("it","name")} onChange={e=>set("it","name",e.target.value)}/></FormGroup>
          <FormGroup label="Sottotitolo (IT)"><input style={inputStyle} value={field("it","subtitle")} onChange={e=>set("it","subtitle",e.target.value)}/></FormGroup>
          <FormGroup label="Descrizione (IT)"><textarea style={textareaStyle} value={field("it","desc")} onChange={e=>set("it","desc",e.target.value)}/></FormGroup>
        </div>
      )}
      {activeTab === "ru" && (
        <div>
          <FormGroup label="Название (RU)"><input style={inputStyle} value={field("ru","name")} onChange={e=>set("ru","name",e.target.value)}/></FormGroup>
          <FormGroup label="Подзаголовок (RU)"><input style={inputStyle} value={field("ru","subtitle")} onChange={e=>set("ru","subtitle",e.target.value)}/></FormGroup>
          <FormGroup label="Описание (RU)"><textarea style={textareaStyle} value={field("ru","desc")} onChange={e=>set("ru","desc",e.target.value)}/></FormGroup>
        </div>
      )}
      {activeTab === "pl" && (
        <div>
          <FormGroup label="Nazwa (PL)"><input style={inputStyle} value={field("pl","name")} onChange={e=>set("pl","name",e.target.value)}/></FormGroup>
          <FormGroup label="Podtytuł (PL)"><input style={inputStyle} value={field("pl","subtitle")} onChange={e=>set("pl","subtitle",e.target.value)}/></FormGroup>
          <FormGroup label="Opis (PL)"><textarea style={textareaStyle} value={field("pl","desc")} onChange={e=>set("pl","desc",e.target.value)}/></FormGroup>
        </div>
      )}
      {activeTab === "img" && (
        <FormGroup label="Photo du produit">
          <div
            onDrop={handleDrop}
            onDragOver={e=>e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            style={{
              border:"2px dashed var(--border)", borderRadius:10,
              padding:24, textAlign:"center", cursor:"pointer",
              transition:"all .2s", position:"relative",
            }}
          >
            <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleFile}/>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:32,height:32,color:"var(--muted)",marginBottom:8}}>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <p style={{fontSize:".78rem",color:"var(--muted)"}}>Glisser-déposer ou <span style={{color:"var(--gold)"}}>cliquer pour choisir</span></p>
            <p style={{marginTop:4,fontSize:".7rem",color:"var(--muted)"}}>PNG, JPG, WEBP · Max 5MB</p>
          </div>
          {currentImg && (
            <div style={{textAlign:"center",marginTop:12,position:"relative",display:"inline-block",marginLeft:"50%",transform:"translateX(-50%)",width:120,height:120}}>
              <Image src={currentImg} alt="" fill style={{objectFit:"cover",borderRadius:10,border:"1px solid var(--border)"}} unoptimized/>
              <button onClick={onImgRemove} style={{
                position:"absolute",top:-8,right:-8,width:22,height:22,
                background:"var(--danger)",border:"none",borderRadius:"50%",color:"#fff",
                fontSize:".85rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1,
              }}>×</button>
            </div>
          )}
        </FormGroup>
      )}
      {activeTab === "meta" && (
        <FormGroup label="Catégorie">
          <select style={selectStyle} value={product?.category ?? "Sauces"} onChange={e=>onChange({...product,category:e.target.value as Product["category"]})}>
            {CAT_KEYS.filter(k=>k!=="All").map(k => (
              <option key={k} value={k} style={{background:"#1c1108"}}>{CAT_LABEL[k]}</option>
            ))}
          </select>
        </FormGroup>
      )}
    </div>
  );
}

export default function FincasAdminClient() {
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"id" | "name" | "category">("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editImgData, setEditImgData] = useState<string | null>(null);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [newProduct, setNewProduct] = useState<Product | null>(null);
  const [newImgData, setNewImgData] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [toast, setToast] = useState({ visible:false, message:"", type:"success" as "success" | "error" });
  const [syncing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"products" | "categories" | "carousel">("products");

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ visible:true, message, type });
    setTimeout(() => setToast(t => ({...t, visible:false})), 3000);
  };

  // ── LOAD PRODUCTS FROM API ──
  const loadProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/fincas-canarias/products");
      if (!res.ok) throw new Error("Erreur chargement");
      const data = await res.json();
      setProducts(data);
    } catch {
      showToast("Erreur lors du chargement des produits", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── LOAD ONCE AT MOUNT (les actions CRUD rechargent ensuite) ──
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // ── FILTER & SORT ──
  const filtered = products
    .filter(p => {
      const catOk = activeFilter === "All" || p.category === activeFilter;
      const q = search.toLowerCase().trim();
      const qOk = !q || [p.name.es, p.subtitle.es, p.category, p.name.en, p.name.de].join(" ").toLowerCase().includes(q);
      return catOk && qOk;
    })
    .sort((a, b) => {
      let aVal: string | number, bVal: string | number;
      if (sortBy === "id") {
        aVal = a.id;
        bVal = b.id;
      } else if (sortBy === "name") {
        aVal = a.name.es.toLowerCase();
        bVal = b.name.es.toLowerCase();
      } else {
        aVal = a.category;
        bVal = b.category;
      }
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const counts = Object.fromEntries(CAT_KEYS.map(k => [k, k==="All" ? products.length : products.filter(p=>p.category===k).length]));
  const withImg = products.filter(p=>p.img).length;

  // ── EDIT ──
  const openEdit = (p: Product) => {
    setEditProduct({...p, name:{...p.name}, subtitle:{...p.subtitle}, desc:{...p.desc}});
    setEditImgData(null);
  };
  const saveEdit = async () => {
    if (!editProduct) return;
    const img = editImgData === "__remove__" ? null : editImgData || editProduct.img;
    try {
      const res = await fetch("/api/fincas-canarias/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editProduct, img }),
      });
      if (!res.ok) throw new Error("Erreur mise à jour");
      await loadProducts();
      setEditProduct(null);
      setEditImgData(null);
      showToast("Produit mis à jour !");
    } catch {
      showToast("Erreur lors de la mise à jour", "error");
    }
  };

  // ── INLINE IMG UPLOAD ──
  const handleInlineImg = async (id: number, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async e => {
      const imgData = e.target?.result as string;
      try {
        const product = products.find(p => p.id === id);
        if (!product) return;
        const res = await fetch("/api/fincas-canarias/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...product, img: imgData }),
        });
        if (!res.ok) throw new Error("Erreur upload");
        await loadProducts();
        showToast("Photo mise à jour !");
      } catch {
        showToast("Erreur lors de l'upload", "error");
      }
    };
    reader.readAsDataURL(file);
  };

  // ── ADD ──
  const openAdd = () => {
    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setNewProduct({
      id: nextId,
      category:"Sauces",
      img:null,
      name:{es:"",en:"",de:""},
      subtitle:{es:"",en:"",de:""},
      desc:{es:"",en:"",de:""}
    });
    setNewImgData(null);
    setShowAddPanel(true);
  };
  const saveNew = async () => {
    if (!newProduct || !newProduct.name.es.trim()) {
      showToast("Le nom en espagnol est requis", "error");
      return;
    }
    const img = newImgData && newImgData!=="__remove__" ? newImgData : null;
    try {
      const res = await fetch("/api/fincas-canarias/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newProduct, img }),
      });
      if (!res.ok) throw new Error("Erreur création");
      await loadProducts();
      setShowAddPanel(false);
      setNewProduct(null);
      setNewImgData(null);
      showToast(`"${newProduct.name.es}" ajouté !`);
    } catch {
      showToast("Erreur lors de la création", "error");
    }
  };

  // ── DELETE ──
  const confirmDelete = async () => {
    if (!confirmId) return;
    const p = products.find(x=>x.id===confirmId);
    try {
      const res = await fetch(`/api/fincas-canarias/products?id=${confirmId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur suppression");
      await loadProducts();
      setConfirmId(null);
      showToast(`"${p?.name?.es}" supprimé`);
    } catch {
      showToast("Erreur lors de la suppression", "error");
    }
  };

  // ── EXPORT ──
  const exportJSON = () => {
    const json = JSON.stringify(products, null, 2);
    const a = document.createElement("a");
    a.href = "data:application/json;charset=utf-8," + encodeURIComponent(json);
    a.download = "fincas-canarias-products.json";
    a.click();
    showToast("Export JSON téléchargé !");
  };

  // ── BULK OPERATIONS ──
  const toggleSelect = (id: number) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
    setShowBulkActions(newSet.size > 0);
  };

  const selectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
      setShowBulkActions(false);
    } else {
      setSelectedIds(new Set(filtered.map(p => p.id)));
      setShowBulkActions(true);
    }
  };

  const bulkDelete = async () => {
    if (selectedIds.size === 0) return;
    const ids = Array.from(selectedIds);
    try {
      await Promise.all(ids.map(id => 
        fetch(`/api/fincas-canarias/products?id=${id}`, { method: "DELETE" })
      ));
      await loadProducts();
      setSelectedIds(new Set());
      setShowBulkActions(false);
      showToast(`${ids.length} produit${ids.length > 1 ? "s" : ""} supprimé${ids.length > 1 ? "s" : ""} !`);
    } catch {
      showToast("Erreur lors de la suppression en masse", "error");
    }
  };

  const btnStyle = (variant: "gold" | "outline" | "danger" = "gold") => ({
    fontFamily:"'Lato',sans-serif", fontSize:".75rem", fontWeight:700,
    letterSpacing:".1em", textTransform:"uppercase",
    padding:"7px 16px", borderRadius:6, border:"none", cursor:"pointer", transition:"all .2s",
    ...(variant==="gold" ? { background:"var(--gold)", color:"#1a0a02" } :
        variant==="outline" ? { background:"transparent", border:"1px solid var(--border)", color:"var(--muted)" } :
        variant==="danger" ? { background:"var(--danger-bg)", border:"1px solid rgba(192,57,43,.3)", color:"#e74c3c" } : {}),
  });
  const btnSm = (variant: "gold" | "outline" | "danger") => ({ ...btnStyle(variant), padding:"5px 10px", fontSize:".68rem" });
  const tableGridTemplate = "40px 60px minmax(240px,1fr) 180px 120px 110px";

  if (loading) {
    return (
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",color:"var(--text)"}}>
        <span>Chargement…</span>
      </div>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <style>{`
        @keyframes toastIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes modalIn{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
        input[type="checkbox"]{width:18px;height:18px;cursor:pointer;accent-color:var(--gold);}
        input[type="checkbox"]:checked{filter:drop-shadow(0 0 4px rgba(201,150,58,.5));}
      `}</style>

      {/* ── TOPBAR ── */}
      <div style={{
        background:"linear-gradient(135deg, rgba(10,6,2,.98), rgba(15,8,3,.98))",
        borderBottom:"1px solid var(--border)",
        padding:isMobile ? "10px 12px" : "0 24px",
        display:"flex",
        flexDirection:isMobile ? "column" : "row",
        alignItems:isMobile ? "stretch" : "center",
        justifyContent:"space-between",
        height:isMobile ? "auto" : 64,
        gap:isMobile ? 10 : 0,
        position:"sticky",
        top:0,
        zIndex:100,
        boxShadow:"0 2px 16px rgba(0,0,0,.3)",
        backdropFilter:"blur(20px)",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{
            width:36,
            height:36,
            borderRadius:8,
            background:"linear-gradient(135deg, var(--gold), var(--gold-light))",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            fontSize:"1.2rem",
            fontWeight:700,
            color:"#1a0a02",
            boxShadow:"0 2px 8px rgba(201,150,58,.3)",
          }}>FC</div>
          <div>
            <span style={{fontFamily:"'Playfair Display',serif",color:"var(--gold)",fontSize:"1.15rem",letterSpacing:".06em",fontWeight:700}}>Fincas Canarias</span>
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:2}}>
              <span style={{background:"var(--gold)",color:"#1a0a02",fontSize:".6rem",fontWeight:700,padding:"2px 8px",borderRadius:12,letterSpacing:".12em"}}>ADMIN</span>
              {syncing && <span style={{fontSize:".65rem",color:"var(--muted)",display:"flex",alignItems:"center",gap:4}}>
                <span style={{animation:"pulse 1.5s ease-in-out infinite"}}>🔄</span> Synchronisation…
              </span>}
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",width:isMobile?"100%":"auto"}}>
          <Link href="/fincas-canarias" target="_blank" style={{...btnStyle("outline"),textDecoration:"none"}}>👁 Voir le site</Link>
          <button style={btnStyle("outline")} onClick={exportJSON}>⬇ Exporter JSON</button>
          <button style={btnStyle("gold")} onClick={openAdd}>+ Ajouter produit</button>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{
        background:"var(--surface)",
        borderBottom:"1px solid var(--border)",
        padding:isMobile ? "0 8px" : "0 24px",
        display:"flex",
        gap:4,
        overflowX:"auto",
        whiteSpace:"nowrap",
      }}>
        {[
          { id: "products", label: "📦 Produits", icon: "📦" },
          { id: "categories", label: "🏷️ Catégories", icon: "🏷️" },
          { id: "carousel", label: "🎠 Carrousel", icon: "🎠" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            style={{
              padding:"12px 20px",
              background:activeTab===tab.id ? "var(--gold)" : "transparent",
              color:activeTab===tab.id ? "#1a0a02" : "var(--text)",
              border:"none",
              borderBottom:activeTab===tab.id ? "2px solid var(--gold)" : "2px solid transparent",
              fontFamily:"'Lato',sans-serif",
              fontSize:".8rem",
              fontWeight:activeTab===tab.id ? 700 : 400,
              letterSpacing:".08em",
              cursor:"pointer",
              transition:"all .2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── LAYOUT ── */}
      <div style={{display:"flex",flexDirection:isMobile?"column":"row",minHeight:"calc(100vh - 122px)"}}>

        {/* ── SIDEBAR (only for products) ── */}
        {activeTab === "products" && (
          <aside style={{
            width:isMobile ? "100%" : 240,
            flexShrink:0,
            background:"linear-gradient(180deg, var(--surface), var(--surface2))",
            borderRight:isMobile ? "none" : "1px solid var(--border)",
            borderBottom:isMobile ? "1px solid var(--border)" : "none",
            padding:isMobile ? "10px 0" : "24px 0",
            position:isMobile ? "static" : "sticky",
            top:isMobile ? 0 : 122,
            height:isMobile ? "auto" : "calc(100vh - 122px)",
            overflowY:isMobile ? "visible" : "auto",
            overflowX:isMobile ? "auto" : "visible",
            boxShadow:"2px 0 16px rgba(0,0,0,.2)",
          }}>
            <span style={{
              fontSize:".6rem",
              letterSpacing:".25em",
              textTransform:"uppercase",
              color:"var(--muted)",
              padding:"10px 24px 8px",
              display:"block",
              fontWeight:700,
            }}>Catégories</span>
            {CAT_KEYS.map(k => (
              <div key={k} onClick={() => setActiveFilter(k)}
                style={{
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"space-between",
                  padding:"10px 24px",
                  cursor:"pointer",
                  transition:"all .2s",
                  marginBottom:1,
                  background: activeFilter===k ? "linear-gradient(90deg, rgba(201,150,58,.2), rgba(201,150,58,.1))" : "transparent",
                  borderLeft: activeFilter===k ? "3px solid var(--gold)" : "3px solid transparent",
                  position:"relative",
                }}
                onMouseEnter={e=>{if(activeFilter!==k){(e.currentTarget as HTMLElement).style.background="rgba(201,150,58,.05)"}}}
                onMouseLeave={e=>{if(activeFilter!==k){(e.currentTarget as HTMLElement).style.background="transparent"}}}
              >
                <span style={{
                  fontSize:".85rem",
                  color:activeFilter===k?"var(--gold-light)":"var(--text)",
                  fontWeight:activeFilter===k?600:400,
                }}>{CAT_LABEL[k]}</span>
                <span style={{
                  background:activeFilter===k?"var(--gold)":"rgba(201,150,58,.25)",
                  color:activeFilter===k?"#1a0a02":"var(--gold)",
                  fontSize:".65rem",
                  fontWeight:700,
                  padding:"3px 8px",
                  borderRadius:12,
                  minWidth:28,
                  textAlign:"center",
                  boxShadow:activeFilter===k?"0 2px 4px rgba(201,150,58,.3)":"none",
                }}>{counts[k]}</span>
              </div>
            ))}
          </aside>
        )}

        {/* ── MAIN ── */}
        <main style={{flex:1,padding:isMobile ? 12 : 24,overflowY:"auto"}}>
          {activeTab === "categories" && <CategoriesManager showToast={showToast} />}
          {activeTab === "carousel" && <CarouselManager showToast={showToast} />}
          {activeTab === "products" && (
            <>

          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14,marginBottom:24}}>
            {[
              ["Produits total", products.length, "📦"],
              ["Avec photo", withImg, "📷"],
              ["Sans photo", products.length - withImg, "⚠️"],
              ["Catégories", CAT_KEYS.length - 1, "🏷️"],
              ["Taux photos", products.length > 0 ? `${Math.round((withImg / products.length) * 100)}%` : "0%", "📊"],
            ].map(([label, num, icon]) => (
              <div key={label} style={{
                background:"linear-gradient(135deg, var(--surface), var(--surface2))",
                border:"1px solid var(--border)",
                borderRadius:12,
                padding:"16px 18px",
                position:"relative",
                overflow:"hidden",
                transition:"all .3s",
                boxShadow:"0 2px 8px rgba(0,0,0,.2)",
              }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-2px)";(e.currentTarget as HTMLElement).style.boxShadow="0 4px 16px rgba(201,150,58,.2)";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(0)";(e.currentTarget as HTMLElement).style.boxShadow="0 2px 8px rgba(0,0,0,.2)";}}
              >
                <div style={{fontSize:"1.8rem",marginBottom:6,opacity:0.7}}>{icon}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.8rem",color:"var(--gold-light)",fontWeight:700,lineHeight:1}}>{num}</div>
                <div style={{fontSize:".7rem",letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted)",marginTop:4}}>{label}</div>
              </div>
            ))}
          </div>

          {/* Add panel */}
          {showAddPanel && newProduct && (
            <div style={{background:"var(--surface)",border:"1px solid rgba(201,150,58,.25)",borderRadius:12,padding:20,marginBottom:24}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:"var(--gold)",marginBottom:16}}>✦ Nouveau produit</div>
              <ProductForm product={newProduct} onChange={setNewProduct} imgData={newImgData} onImgChange={setNewImgData} onImgRemove={()=>setNewImgData("__remove__")}/>
              <div style={{display:"flex",gap:10,marginTop:16}}>
                <button style={btnStyle("outline")} onClick={()=>{setShowAddPanel(false);setNewProduct(null);}}>Annuler</button>
                <button style={btnStyle("gold")} onClick={saveNew}>Ajouter le produit</button>
              </div>
            </div>
          )}

          {/* Page header */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}}>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",color:"var(--cream)"}}>{activeFilter==="All"?"Tous les produits":CAT_LABEL[activeFilter]}</div>
              <div style={{fontSize:".75rem",color:"var(--muted)",marginTop:2}}>{filtered.length} produit{filtered.length!==1?"s":""}</div>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <button onClick={()=>setViewMode(viewMode==="table"?"grid":"table")} style={{
                ...btnStyle("outline"),
                padding:"6px 12px",
                fontSize:".7rem",
              }}>
                {viewMode==="table"?"📋":"🔲"} {viewMode==="table"?"Grille":"Tableau"}
              </button>
            </div>
          </div>

          {/* Search & Sort */}
          <div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
            <div style={{position:"relative",flex:1,minWidth:isMobile ? 0 : 280}}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",width:16,height:16,color:"var(--muted)",pointerEvents:"none"}}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Rechercher un produit…"
                style={{...inputStyle,paddingLeft:40}}
              />
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{fontSize:".7rem",color:"var(--muted)",letterSpacing:".1em",textTransform:"uppercase"}}>Trier:</span>
              <select value={sortBy} onChange={e=>setSortBy(e.target.value as typeof sortBy)} style={{...selectStyle,width:120,padding:"8px 12px"}}>
                <option value="id">ID</option>
                <option value="name">Nom</option>
                <option value="category">Catégorie</option>
              </select>
              <button onClick={()=>setSortOrder(sortOrder==="asc"?"desc":"asc")} style={{
                ...btnStyle("outline"),
                padding:"8px 12px",
                minWidth:40,
              }}>
                {sortOrder==="asc"?"↑":"↓"}
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {showBulkActions && (
            <div style={{
              background:"linear-gradient(135deg, rgba(201,150,58,.15), rgba(232,184,90,.1))",
              border:"1px solid rgba(201,150,58,.3)",
              borderRadius:10,
              padding:"12px 16px",
              marginBottom:16,
              display:"flex",
              alignItems:"center",
              justifyContent:"space-between",
              animation:"toastIn .3s ease",
            }}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:".8rem",color:"var(--gold)",fontWeight:700}}>
                  {selectedIds.size} produit{selectedIds.size > 1 ? "s" : ""} sélectionné{selectedIds.size > 1 ? "s" : ""}
                </span>
                <button onClick={selectAll} style={{...btnSm("outline"),padding:"4px 10px"}}>
                  {selectedIds.size === filtered.length ? "Désélectionner" : "Tout sélectionner"}
                </button>
              </div>
              <button onClick={bulkDelete} style={btnSm("danger")}>
                🗑 Supprimer ({selectedIds.size})
              </button>
            </div>
          )}

          {/* Table */}
          <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:12,overflowX:"auto",overflowY:"hidden"}}>
            <div style={{display:"grid",gridTemplateColumns:tableGridTemplate,minWidth:740,padding:"10px 16px",borderBottom:"1px solid var(--border)",fontSize:".65rem",letterSpacing:".15em",textTransform:"uppercase",color:"var(--muted)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <input type="checkbox" checked={selectedIds.size === filtered.length && filtered.length > 0} onChange={selectAll} style={{cursor:"pointer"}}/>
              </div>
              <div>Photo</div><div>Produit</div><div>Catégorie</div><div>Image</div><div>Actions</div>
            </div>

            {filtered.length === 0 && (
              <div style={{textAlign:"center",padding:"48px 20px",color:"var(--muted)",fontStyle:"italic"}}>Aucun produit trouvé</div>
            )}

            {filtered.map(p => (
              <div key={p.id} style={{display:"grid",gridTemplateColumns:tableGridTemplate,minWidth:740,padding:"12px 16px",borderBottom:"1px solid rgba(201,150,58,.08)",alignItems:"center",transition:"background .15s",background:selectedIds.has(p.id)?"rgba(201,150,58,.08)":"transparent"}}
                onMouseEnter={e=>{if(!selectedIds.has(p.id)){(e.currentTarget as HTMLElement).style.background="rgba(201,150,58,.04)"}}}
                onMouseLeave={e=>{if(!selectedIds.has(p.id)){(e.currentTarget as HTMLElement).style.background="transparent"}}}
              >
                {/* Checkbox */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <input type="checkbox" checked={selectedIds.has(p.id)} onChange={()=>toggleSelect(p.id)} style={{cursor:"pointer"}}/>
                </div>

                {/* Thumb */}
                <label style={{width:44,height:44,borderRadius:8,background:"var(--surface2)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",position:"relative",cursor:"pointer"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--gold)"}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--border)"}}
                >
                  {p.img
                    ? <Image src={p.img} alt="" fill style={{objectFit:"cover"}} onClick={()=>setPreviewImg(p.img || null)} unoptimized/>
                    : <PlaceholderImg/>
                  }
                  <div style={{position:"absolute",inset:0,background:"rgba(201,150,58,.85)",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity .2s",borderRadius:8}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.opacity="1"}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.opacity="0"}}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18,color:"#1a0a02"}}>
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  <input type="file" accept="image/*" style={{position:"absolute",inset:0,opacity:0,cursor:"pointer"}} onChange={e=>handleInlineImg(p.id, e.target.files?.[0] || null)}/>
                </label>

                {/* Info */}
                <div>
                  <div style={{fontSize:".88rem",color:"var(--cream)",fontWeight:600,lineHeight:1.3}}>{p.name.es}</div>
                  <div style={{fontSize:".72rem",color:"var(--muted)",marginTop:2,lineHeight:1.3}}>{p.subtitle.es}</div>
                </div>

                {/* Category */}
                <div>
                  <span style={{display:"inline-block",background:"rgba(201,150,58,.12)",border:"1px solid rgba(201,150,58,.25)",color:"var(--gold)",fontSize:".62rem",letterSpacing:".12em",textTransform:"uppercase",padding:"3px 8px",borderRadius:20,whiteSpace:"nowrap"}}>
                    {CAT_LABEL[p.category]}
                  </span>
                </div>

                {/* Img status */}
                <div style={{fontSize:".7rem",color:p.img?"var(--success)":"var(--muted)"}}>
                  {p.img ? "✓ Photo" : "— Aucune"}
                </div>

                {/* Actions */}
                <div style={{display:"flex",gap:6}}>
                  <button style={btnSm("outline")} onClick={()=>openEdit(p)}>✏ Modifier</button>
                  <button style={btnSm("danger")} onClick={()=>setConfirmId(p.id)}>🗑</button>
                </div>
              </div>
            ))}
          </div>
            </>
          )}
        </main>
      </div>

      {/* ── EDIT MODAL ── */}
      {editProduct && (
        <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(5,2,1,.92)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"var(--surface)",border:"1px solid rgba(201,150,58,.3)",borderRadius:16,width:"100%",maxWidth:680,maxHeight:"92vh",overflowY:"auto",position:"relative",animation:"modalIn .25s ease"}}>
            <div style={{padding:"20px 24px 16px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.15rem",color:"var(--cream)"}}>Modifier — {editProduct.name.es}</div>
              <button style={{background:"transparent",border:"none",color:"var(--muted)",fontSize:"1.4rem",cursor:"pointer",lineHeight:1}} onClick={()=>{setEditProduct(null);setEditImgData(null);}}>×</button>
            </div>
            <div style={{padding:24}}>
              <ProductForm product={editProduct} onChange={setEditProduct} imgData={editImgData} onImgChange={setEditImgData} onImgRemove={()=>setEditImgData("__remove__")}/>
            </div>
            <div style={{padding:"16px 24px",borderTop:"1px solid var(--border)",display:"flex",justifyContent:"flex-end",gap:10}}>
              <button style={btnStyle("outline")} onClick={()=>{setEditProduct(null);setEditImgData(null);}}>Annuler</button>
              <button style={btnStyle("gold")} onClick={saveEdit}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* ── CONFIRM DELETE ── */}
      {confirmId && (
        <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(5,2,1,.95)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:"var(--surface)",border:"1px solid rgba(192,57,43,.4)",borderRadius:14,padding:"28px 32px",maxWidth:400,width:"100%",textAlign:"center",animation:"modalIn .25s ease"}}>
            <div style={{fontSize:"2.2rem",marginBottom:12}}>🗑</div>
            <div style={{fontSize:".9rem",color:"var(--cream)",marginBottom:20,lineHeight:1.5}}>
              Supprimer « {products.find(p=>p.id===confirmId)?.name?.es} » définitivement ?
            </div>
            <div style={{display:"flex",gap:10,justifyContent:"center"}}>
              <button style={btnStyle("outline")} onClick={()=>setConfirmId(null)}>Annuler</button>
              <button style={btnStyle("danger")} onClick={confirmDelete}>Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {/* ── IMAGE PREVIEW MODAL ── */}
      {previewImg && (
        <div style={{position:"fixed",inset:0,zIndex:400,background:"rgba(5,2,1,.96)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setPreviewImg(null)}>
          <div style={{maxWidth:"90vw",maxHeight:"90vh",position:"relative"}} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setPreviewImg(null)} style={{
              position:"absolute",top:-40,right:0,
              background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,
              color:"var(--cream)",fontSize:"1.2rem",width:36,height:36,
              cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
            }}>×</button>
            <div style={{position:"relative",width:"100%",maxWidth:"90vw",height:"90vh",maxHeight:"90vh"}}>
              <Image src={previewImg} alt="Preview" fill style={{objectFit:"contain",borderRadius:12,border:"1px solid var(--border)"}} unoptimized/>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible}/>
    </>
  );
}

