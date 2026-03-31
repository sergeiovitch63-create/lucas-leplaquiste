import { NextResponse } from "next/server";
import { getLucasPagesConfig, getLucasSiteConfig } from "@/lib/lucas-site-store";

export async function GET() {
  const config = await getLucasSiteConfig();
  const pagesConfig = await getLucasPagesConfig(config);
  return NextResponse.json({ ...config, pagesConfig });
}

