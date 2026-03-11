import { promises as fs } from 'fs';
import path from 'path';

/**
 * Enregistre une image encodée en base64 dans le dossier public et retourne l'URL publique.
 * - subfolder: "products" | "carousel" pour organiser les fichiers
 * - filenameHint: préfix lisible (ex: "product-123")
 *
 * En environnement Vercel (read-only), on ne tente pas d'écrire sur le disque
 * et on renvoie simplement la chaîne d'origine pour ne rien casser.
 */
export async function saveBase64Image(
  base64: string,
  subfolder: 'products' | 'carousel',
  filenameHint?: string
): Promise<string> {
  const match = base64.match(/^data:(image\/[\w+.-]+);base64,(.+)$/);
  if (!match) {
    throw new Error('Format image base64 invalide');
  }

  const mime = match[1];   // ex: image/jpeg
  const data = match[2];   // partie après "base64,"
  const ext = mime.includes('png') ? 'png' : 'jpg';

  const safeName = (filenameHint || 'image')
    .toLowerCase()
    .replace(/[^a-z0-9\-]+/g, '-')
    .slice(0, 40);

  const fileName = `${safeName}-${Date.now()}.${ext}`;
  const publicDir = path.join(process.cwd(), 'public', 'fincas', subfolder);

  try {
    await fs.mkdir(publicDir, { recursive: true });
  } catch (err) {
    throw new Error(
      `Impossible de créer le dossier public pour enregistrer l'image (${publicDir}).` +
      ` Cela peut indiquer un système de fichiers en lecture seule (par ex. Vercel).` +
      ` Erreur originale: ${(err as Error).message}`
    );
  }

  const filePath = path.join(publicDir, fileName);
  try {
    await fs.writeFile(filePath, Buffer.from(data, 'base64'));
  } catch (err) {
    throw new Error(
      `Impossible d'écrire le fichier image à l'emplacement ${filePath}.` +
      ` Cela peut indiquer un système de fichiers en lecture seule (par ex. Vercel).` +
      ` Erreur originale: ${(err as Error).message}`
    );
  }

  // URL publique (Next sert /public à la racine du site)
  return `/fincas/${subfolder}/${fileName}`;
}

