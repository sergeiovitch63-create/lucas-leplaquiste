import { NextRequest, NextResponse } from "next/server";
import { getProducts, setProducts } from "@/lib/redis";
import type { Product } from "@/app/fincas-canarias/data";

// GET: Récupérer tous les produits
export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch {
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
    const products = await getProducts();
    
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
    await setProducts(products);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
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
    
    const products = await getProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }
    
    products[index] = { ...products[index], ...updates };
    await setProducts(products);
    
    return NextResponse.json(products[index]);
  } catch {
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
    
    const products = await getProducts();
    const filtered = products.filter(p => p.id !== id);
    
    if (filtered.length === products.length) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }
    
    await setProducts(filtered);
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la suppression du produit" },
      { status: 500 }
    );
  }
}


