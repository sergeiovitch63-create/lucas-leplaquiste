import { NextResponse } from "next/server";
import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

// Essayer d’abord depuis la racine du projet (cwd), puis depuis le dossier de la route
function getMediaDirs(): string[] {
  const cwdDir = join(process.cwd(), "public", "media");
  const fromRoute = join(__dirname, "..", "..", "..", "..", "..", "public", "media");
  return [cwdDir, fromRoute];
}

const POSSIBLE_NAMES = [
  "fond-ecran-manna-masaje.mp4",
  "fond-ecran-manna-masaje",
  "fond-ecran-marina-masaje.mp4",
  "fond-ecran-marina-masaje",
];

export async function GET() {
  let path: string | null = null;
  const mediaDirs = getMediaDirs();

  for (const videoDir of mediaDirs) {
    for (const name of POSSIBLE_NAMES) {
      const p = join(videoDir, name);
      if (existsSync(p)) {
        path = p;
        break;
      }
    }
    if (path) break;

    try {
      const files = await readdir(videoDir);
      const mp4 = files.find((f) => f.toLowerCase().includes("fond") && (f.endsWith(".mp4") || f.toLowerCase().includes("masaje")));
      if (mp4) {
        path = join(videoDir, mp4);
        break;
      }
    } catch {
      // dossier inexistant ou pas lisible
    }
  }

  if (!path) {
    return new NextResponse("Video not found", { status: 404 });
  }

  const buffer = await readFile(path);

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "video/mp4",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
