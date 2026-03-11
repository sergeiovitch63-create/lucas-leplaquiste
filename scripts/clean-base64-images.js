const fs = require('fs');
const path = require('path');

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${value.toFixed(2)} ${sizes[i]}`;
}

function main() {
  const projectRoot = process.cwd();
  const dataFile = path.join(projectRoot, 'data', 'fincas-canarias-products.json');
  const publicDir = path.join(projectRoot, 'public', 'fincas', 'products');

  if (!fs.existsSync(dataFile)) {
    console.error(`[clean-base64-images] ❌ File not found: ${dataFile}`);
    process.exit(1);
  }

  const beforeSize = getFileSize(dataFile);

  console.log(`[clean-base64-images] Reading ${dataFile} (${formatBytes(beforeSize)})`);
  const raw = fs.readFileSync(dataFile, 'utf-8');

  let products;
  try {
    products = JSON.parse(raw);
  } catch (err) {
    console.error('[clean-base64-images] ❌ Failed to parse JSON:', err);
    process.exit(1);
  }

  if (!Array.isArray(products)) {
    console.error('[clean-base64-images] ❌ JSON root is not an array');
    process.exit(1);
  }

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  let convertedCount = 0;

  products.forEach((product) => {
    if (!product || typeof product !== 'object') return;

    const { id, img } = product;
    if (!img || typeof img !== 'string') return;
    if (!img.startsWith('data:image')) return;

    const match = img.match(/^data:(image\/[\w+.-]+);base64,(.+)$/);
    if (!match) {
      console.warn(`[clean-base64-images] ⚠️ Skipping product id=${id} - invalid data URL format`);
      return;
    }

    const mime = match[1];
    const base64Data = match[2];
    const ext = mime.includes('png') ? 'png' : 'jpg';

    const safeId = typeof id === 'number' || typeof id === 'string' ? String(id) : 'unknown';
    const fileName = `product-${safeId}.jpg`;
    const filePath = path.join(publicDir, fileName);

    try {
      const buffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(filePath, buffer);
      product.img = `/fincas/products/${fileName}`;
      convertedCount += 1;
      console.log(`[clean-base64-images] ✅ Converted product id=${safeId} -> ${product.img}`);
    } catch (err) {
      console.error(`[clean-base64-images] ❌ Failed to write image for product id=${safeId}:`, err);
    }
  });

  try {
    fs.writeFileSync(dataFile, JSON.stringify(products, null, 2), 'utf-8');
  } catch (err) {
    console.error('[clean-base64-images] ❌ Failed to write updated JSON:', err);
    process.exit(1);
  }

  const afterSize = getFileSize(dataFile);

  console.log(`[clean-base64-images] ✅ Done. Converted ${convertedCount} image(s).`);
  console.log(`[clean-base64-images] Size before: ${formatBytes(beforeSize)}`);
  console.log(`[clean-base64-images] Size after : ${formatBytes(afterSize)}`);
}

main();

