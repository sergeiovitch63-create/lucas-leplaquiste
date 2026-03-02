import { NextRequest, NextResponse } from "next/server";
import type { AutoaufbereitungConfig } from "@/config/autoaufbereitung";
import {
  getAutoaufbereitungConfig,
  writeAutoaufbereitungStore,
} from "@/lib/autoaufbereitung-store";

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return true; // pas de secret = ouvert en dev
  const header = request.headers.get("x-admin-secret");
  return header === secret;
}

export async function GET() {
  const config = getAutoaufbereitungConfig();
  return NextResponse.json(config);
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as AutoaufbereitungConfig;
    if (!body.brandName || !Array.isArray(body.categories)) {
      return NextResponse.json(
        { error: "Données invalides (brandName, categories requis)" },
        { status: 400 }
      );
    }
    writeAutoaufbereitungStore(body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur serveur" },
      { status: 500 }
    );
  }
}
