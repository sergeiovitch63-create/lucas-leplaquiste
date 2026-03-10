import { NextRequest, NextResponse } from "next/server";
import { getProducts, setProducts } from "@/lib/redis";
import { saveBase64Image } from "@/lib/saveImage";
import type { Product } from "@/app/fincas-canarias/data";

// GET: Récupérer tous les produits
export async function GET() {
  try {
    console.log('[API GET /products] Début de la récupération...');
    console.log('[API GET /products] process.cwd():', process.cwd());
    console.log('[API GET /products] VERCEL:', process.env.VERCEL);
    console.log('[API GET /products] NODE_ENV:', process.env.NODE_ENV);
    console.log('[API GET /products] UPSTASH_REDIS_REST_URL:', process.env.UPSTASH_REDIS_REST_URL ? 'configuré' : 'non configuré');
    
    const products = await getProducts();
    console.log(`[API GET /products] ✅ ${products.length} produits récupérés`);
    
    if (products.length === 0) {
      console.warn('[API GET /products] ⚠️  Aucun produit trouvé!');
    }
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('[API GET /products] ❌ Erreur:', error);
    return NextResponse.json(
      { error: "Erreur lors de la lecture des produits", details: error instanceof Error ? error.message : String(error) },
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
    
    let img: string | null = body.img || null;

    // Si on reçoit une image en base64, on la sauvegarde comme fichier et on stocke l'URL
    if (img && typeof img === "string" && img.startsWith("data:image")) {
      try {
        img = await saveBase64Image(img, "products", `product-${nextId}`);
      } catch (error) {
        console.error("[API POST /products] Erreur saveBase64Image:", error);
        // En cas d'erreur, on garde la valeur d'origine pour ne pas casser le flux
      }
    }

    const newProduct: Product = {
      id: nextId,
      category: body.category || "Sauces",
      img,
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
    
    // Si on reçoit une nouvelle image en base64, la sauvegarder comme fichier et stocker l'URL
    if (
      updates.img &&
      typeof updates.img === "string" &&
      updates.img.startsWith("data:image")
    ) {
      try {
        updates.img = await saveBase64Image(
          updates.img,
          "products",
          `product-${id}`
        );
      } catch (error) {
        console.error("[API PUT /products] Erreur saveBase64Image:", error);
        // En cas d'erreur, on garde la valeur d'origine pour ne pas casser la mise à jour
      }
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


