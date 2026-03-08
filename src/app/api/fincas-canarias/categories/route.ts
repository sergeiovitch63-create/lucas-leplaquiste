import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "fincas-canarias-categories.json");

export interface Category {
  id: string;
  key: string; // Clé technique (ex: "Sauces", "Biscuits")
  label: {
    es: string;
    en: string;
    de: string;
    fr?: string;
    it?: string;
    ru?: string;
    pl?: string;
  };
  order: number; // Ordre d'affichage
}

// Helper pour lire les catégories
async function readCategories(): Promise<Category[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    // Si le fichier n'existe pas, retourner les catégories par défaut
    return [
      { id: "1", key: "All", label: { es: "Todo", en: "All", de: "Alle" }, order: 0 },
      { id: "2", key: "Biscuits", label: { es: "Galletas y repostería", en: "Biscuits & Pastries", de: "Kekse & Gebäck" }, order: 1 },
      { id: "3", key: "Snacks", label: { es: "Snacks", en: "Snacks", de: "Snacks" }, order: 2 },
      { id: "4", key: "Confitures", label: { es: "Mermeladas y dulces", en: "Jams & Sweets", de: "Marmeladen & Süßes" }, order: 3 },
      { id: "5", key: "Miel", label: { es: "Miel", en: "Honey", de: "Honig" }, order: 4 },
      { id: "6", key: "Sauces", label: { es: "Salsas y condimentos", en: "Sauces & Condiments", de: "Saucen & Gewürze" }, order: 5 },
      { id: "7", key: "Conserves", label: { es: "Conservas", en: "Preserves", de: "Konserven" }, order: 6 },
      { id: "8", key: "Vins", label: { es: "Vinos, licores y zumos", en: "Wines, Liqueurs & Juices", de: "Weine, Liköre & Säfte" }, order: 7 },
      { id: "9", key: "Packs", label: { es: "Packs", en: "Packs", de: "Packs" }, order: 8 },
    ];
  }
}

// Helper pour écrire les catégories
async function writeCategories(categories: Category[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(categories, null, 2), "utf-8");
}

// GET: Récupérer toutes les catégories
export async function GET() {
  try {
    const categories = await readCategories();
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la lecture des catégories" },
      { status: 500 }
    );
  }
}

// POST: Créer une nouvelle catégorie
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const categories = await readCategories();
    
    // Vérifier si la clé existe déjà
    if (categories.some(c => c.key === body.key)) {
      return NextResponse.json(
        { error: "Une catégorie avec cette clé existe déjà" },
        { status: 400 }
      );
    }
    
    // Trouver le prochain ID
    const nextId = categories.length > 0 
      ? String(Math.max(...categories.map(c => parseInt(c.id))) + 1)
      : "1";
    
    // Trouver le prochain ordre
    const nextOrder = categories.length > 0
      ? Math.max(...categories.map(c => c.order)) + 1
      : categories.length;
    
    const newCategory: Category = {
      id: nextId,
      key: body.key || `Category_${nextId}`,
      label: body.label || { es: "", en: "", de: "" },
      order: body.order ?? nextOrder,
    };
    
    categories.push(newCategory);
    await writeCategories(categories);
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la création de la catégorie" },
      { status: 500 }
    );
  }
}

// PUT: Mettre à jour une catégorie
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: "ID de la catégorie requis" },
        { status: 400 }
      );
    }
    
    const categories = await readCategories();
    const index = categories.findIndex(c => c.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: "Catégorie non trouvée" },
        { status: 404 }
      );
    }
    
    // Vérifier si la clé est modifiée et si elle existe déjà
    if (updates.key && updates.key !== categories[index].key) {
      if (categories.some(c => c.key === updates.key && c.id !== id)) {
        return NextResponse.json(
          { error: "Une catégorie avec cette clé existe déjà" },
          { status: 400 }
        );
      }
    }
    
    categories[index] = { ...categories[index], ...updates };
    await writeCategories(categories);
    
    return NextResponse.json(categories[index]);
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la catégorie" },
      { status: 500 }
    );
  }
}

// DELETE: Supprimer une catégorie
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "ID de la catégorie requis" },
        { status: 400 }
      );
    }
    
    // Ne pas permettre la suppression de "All"
    if (id === "1" || id === "All") {
      return NextResponse.json(
        { error: "Impossible de supprimer la catégorie 'All'" },
        { status: 400 }
      );
    }
    
    const categories = await readCategories();
    const filtered = categories.filter(c => c.id !== id);
    
    if (filtered.length === categories.length) {
      return NextResponse.json(
        { error: "Catégorie non trouvée" },
        { status: 404 }
      );
    }
    
    await writeCategories(filtered);
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la catégorie" },
      { status: 500 }
    );
  }
}


