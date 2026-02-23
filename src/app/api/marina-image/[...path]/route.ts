import { NextResponse } from "next/server";
import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const MEDIA_DIR = join(process.cwd(), "public", "media");

async function findImageFile(dir: string, baseName: string): Promise<string | null> {
  const withoutExt = join(dir, baseName);
  const withJpg = join(dir, `${baseName}.jpg`);
  const withJpeg = join(dir, `${baseName}.jpeg`);
  const withJPG = join(dir, `${baseName}.JPG`);

  if (existsSync(withJpg)) return withJpg;
  if (existsSync(withJpeg)) return withJpeg;
  if (existsSync(withJPG)) return withJPG;
  if (existsSync(withoutExt)) return withoutExt;

  try {
    const files = await readdir(dir);
    const lower = baseName.toLowerCase();
    const found = files.find(
      (f) =>
        f.toLowerCase() === `${lower}.jpg` ||
        f.toLowerCase() === `${lower}.jpeg` ||
        f === baseName
    );
    if (found) return join(dir, found);
  } catch {
    // ignore
  }
  return null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params;
  if (pathSegments.length < 2) {
    return new NextResponse("Bad request", { status: 400 });
  }

  const slug = pathSegments[0];
  const requestedFile = pathSegments[pathSegments.length - 1];
  const baseName = requestedFile.replace(/\.(jpg|jpeg|png|webp)$/i, "");

  const dir = join(MEDIA_DIR, slug);
  if (!existsSync(dir)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = await findImageFile(dir, baseName);
  if (!filePath) {
    return new NextResponse("Image not found", { status: 404 });
  }

  const buffer = await readFile(filePath);
  const ext = filePath.toLowerCase().split(".").pop() || "jpg";
  const contentType =
    ext === "png"
      ? "image/png"
      : ext === "webp"
        ? "image/webp"
        : "image/jpeg";

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
