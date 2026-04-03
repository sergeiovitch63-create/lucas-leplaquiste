import { NextRequest, NextResponse } from "next/server";
import { getProducts, setProducts } from "@/lib/redis";
import type { Product } from "@/app/fincas-canarias/data";

export const runtime = "nodejs";

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.LUCAS_ADMIN_SECRET ?? process.env.ADMIN_SECRET;
  if (!secret) return true;
  const header = request.headers.get("x-admin-secret");
  return header === secret;
}

const IMG_PREVIEW_LEN = 50;

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const products = await getProducts();
    const cleaned: { id: number; previousImg: string }[] = [];

    const nextProducts: Product[] = products.map((p) => {
      const img = p.img;
      if (typeof img === "string" && img.startsWith("data:image")) {
        cleaned.push({
          id: p.id,
          previousImg: img.slice(0, IMG_PREVIEW_LEN),
        });
        return { ...p, img: null };
      }
      return p;
    });

    if (cleaned.length > 0) {
      await setProducts(nextProducts);
    }

    return NextResponse.json({
      cleanedCount: cleaned.length,
      cleaned,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur cleanup base64" },
      { status: 500 }
    );
  }
}
