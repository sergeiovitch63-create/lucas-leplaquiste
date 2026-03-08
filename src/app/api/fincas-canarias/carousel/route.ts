import { NextRequest, NextResponse } from "next/server";
import { getCarousel, setCarousel, type CarouselConfig, type CarouselItem } from "@/lib/redis";

// Configuration par défaut du carrousel
const DEFAULT_CAROUSEL: CarouselConfig = {
  title: {
    es: "Pack hecho para ti",
    en: "Pack made for you",
    de: "Pack für dich gemacht",
    fr: "Pack fait pour vous",
    it: "Pack fatto per te",
    ru: "Набор для вас",
    pl: "Pakiet dla Ciebie",
  },
  description: {
    es: "Selección especial de productos canarios",
    en: "Special selection of Canarian products",
    de: "Spezialauswahl kanarischer Produkte",
    fr: "Sélection spéciale de produits canariens",
    it: "Selezione speciale di prodotti canari",
    ru: "Специальная подборка канарских продуктов",
    pl: "Specjalna selekcja produktów kanaryjskich",
  },
  items: [],
};

// GET: Récupérer la configuration du carrousel
export async function GET() {
  try {
    let carousel = await getCarousel();
    if (!carousel) {
      carousel = DEFAULT_CAROUSEL;
    }
    return NextResponse.json(carousel);
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la lecture du carrousel" },
      { status: 500 }
    );
  }
}

// PUT: Mettre à jour la configuration du carrousel
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    let carousel = await getCarousel();
    if (!carousel) {
      carousel = DEFAULT_CAROUSEL;
    }
    
    // Mettre à jour le titre et la description
    if (body.title) {
      carousel.title = { ...carousel.title, ...body.title };
    }
    if (body.description) {
      carousel.description = { ...carousel.description, ...body.description };
    }
    
    // Mettre à jour les items si fournis
    if (body.items) {
      carousel.items = body.items;
    }
    
    await setCarousel(carousel);
    
    return NextResponse.json(carousel);
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du carrousel" },
      { status: 500 }
    );
  }
}

// POST: Ajouter un élément au carrousel
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let carousel = await getCarousel();
    if (!carousel) {
      carousel = DEFAULT_CAROUSEL;
    }
    
    // Trouver le prochain ID
    const nextId = carousel.items.length > 0
      ? Math.max(...carousel.items.map(item => item.id)) + 1
      : 1;
    
    // Trouver le prochain ordre
    const nextOrder = carousel.items.length > 0
      ? Math.max(...carousel.items.map(item => item.order)) + 1
      : carousel.items.length;
    
    const newItem: CarouselItem = {
      id: nextId,
      img: body.img || null,
      name: body.name || { es: "", en: "", de: "" },
      description: body.description || { es: "", en: "", de: "" },
      order: body.order ?? nextOrder,
    };
    
    carousel.items.push(newItem);
    await setCarousel(carousel);
    
    return NextResponse.json(newItem, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'ajout de l'élément au carrousel" },
      { status: 500 }
    );
  }
}

// DELETE: Supprimer un élément du carrousel
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "");
    
    if (!id || isNaN(id)) {
      return NextResponse.json(
        { error: "ID de l'élément requis" },
        { status: 400 }
      );
    }
    
    let carousel = await getCarousel();
    if (!carousel) {
      carousel = DEFAULT_CAROUSEL;
    }
    const filtered = carousel.items.filter(item => item.id !== id);
    
    if (filtered.length === carousel.items.length) {
      return NextResponse.json(
        { error: "Élément non trouvé" },
        { status: 404 }
      );
    }
    
    carousel.items = filtered;
    await setCarousel(carousel);
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'élément" },
      { status: 500 }
    );
  }
}


