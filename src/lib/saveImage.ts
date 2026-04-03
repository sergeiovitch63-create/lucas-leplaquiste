import { put } from '@vercel/blob';

/**
 * Enregistre une image encodée en base64 sur Vercel Blob et retourne l’URL publique.
 * - subfolder: "products" | "carousel" pour organiser les fichiers (pathname `fincas/{subfolder}/…`)
 * - filenameHint: préfix lisible (ex: "product-123")
 *
 * Nécessite `BLOB_READ_WRITE_TOKEN` (injecté automatiquement sur Vercel si le Blob Store est lié au projet).
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

  const mime = match[1]; // ex: image/jpeg
  const data = match[2]; // partie après "base64,"
  const ext = mime.includes('png') ? 'png' : 'jpg';

  const safeName = (filenameHint || 'image')
    .toLowerCase()
    .replace(/[^a-z0-9\-]+/g, '-')
    .slice(0, 40);

  const fileName = `${safeName}-${Date.now()}.${ext}`;
  const pathname = `fincas/${subfolder}/${fileName}`;

  const buffer = Buffer.from(data, 'base64');

  const blob = await put(pathname, buffer, {
    access: 'public',
    contentType: mime,
  });

  return blob.url;
}
