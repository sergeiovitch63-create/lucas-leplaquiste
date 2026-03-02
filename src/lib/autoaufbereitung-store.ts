/**
 * Store pour les données éditables Autoaufbereitung (back office).
 * Lit/écrit data/autoaufbereitung-store.json avec repli sur la config statique.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import type { AutoaufbereitungConfig } from "@/config/autoaufbereitung";
import { autoaufbereitungConfig } from "@/config/autoaufbereitung";

const STORE_DIR = "data";
const STORE_FILENAME = "autoaufbereitung-store.json";

function getStorePath(): string {
  return join(process.cwd(), STORE_DIR, STORE_FILENAME);
}

export function getAutoaufbereitungStore(): AutoaufbereitungConfig | null {
  const path = getStorePath();
  if (!existsSync(path)) return null;
  try {
    const raw = readFileSync(path, "utf-8");
    const data = JSON.parse(raw) as AutoaufbereitungConfig;
    if (!data.brandName || !Array.isArray(data.categories)) return null;
    return data;
  } catch {
    return null;
  }
}

export function getAutoaufbereitungConfig(): AutoaufbereitungConfig {
  const store = getAutoaufbereitungStore();
  return store ?? autoaufbereitungConfig;
}

export function writeAutoaufbereitungStore(config: AutoaufbereitungConfig): void {
  const dir = join(process.cwd(), STORE_DIR);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const path = getStorePath();
  writeFileSync(path, JSON.stringify(config, null, 2), "utf-8");
}
