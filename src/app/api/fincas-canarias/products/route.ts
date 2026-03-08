import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Product } from "@/app/fincas-canarias/data";

const DATA_FILE = path.join(process.cwd(), "data", "fincas-canarias-products.json");

// Helper pour lire les produits depuis le fichier
async function readProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Si le fichier n'existe pas, retourner un tableau vide
    return [];
  }
}

// Helper pour écrire les produits dans le fichier
async function writeProducts(products: Product[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
}

// GET: Récupérer tous les produits
export async function GET() {
  try {
    const products = await readProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error reading products:", error);
    return NextResponse.json(
      { error: "Erreur lors de la lecture des produits" },
      { status: 500 }
    );
  }
}

// POST: Créer un nouveau produit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const products = await readProducts();
    
    // Trouver le prochain ID
    const nextId = products.length > 0 
      ? Math.max(...products.map(p => p.id)) + 1 
      : 1;
    
    const newProduct: Product = {
      id: nextId,
      category: body.category || "Sauces",
      img: body.img || null,
      name: body.name || { es: "", en: "", de: "" },
      subtitle: body.subtitle || { es: "", en: "", de: "" },
      desc: body.desc || { es: "", en: "", de: "" },
    };
    
    products.push(newProduct);
    await writeProducts(products);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du produit" },
      { status: 500 }
    );
  }
}

// PUT: Mettre à jour un produit
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: "ID du produit requis" },
        { status: 400 }
      );
    }
    
    const products = await readProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }
    
    products[index] = { ...products[index], ...updates };
    await writeProducts(products);
    
    return NextResponse.json(products[index]);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du produit" },
      { status: 500 }
    );
  }
}

// DELETE: Supprimer un produit
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "");
    
    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: "ID du produit requis" },
        { status: 400 }
      );
    }
    
    const products = await readProducts();
    const filtered = products.filter(p => p.id !== id);
    
    if (filtered.length === products.length) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }
    
    await writeProducts(filtered);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du produit" },
      { status: 500 }
    );
  }
}


