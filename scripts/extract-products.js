const fs = require('fs');
const path = require('path');

// Lire le fichier products.ts
const content = fs.readFileSync(
  path.join(__dirname, '../src/app/fincas-canarias/products.ts'),
  'utf-8'
);

// Extraire le tableau de produits
const match = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not extract products array');
  process.exit(1);
}

// Convertir le JavaScript en JSON valide
let productsStr = match[1];
// Remplacer null par null (déjà JSON valide)
// Remplacer les clés non-quotées par des clés quotées
productsStr = productsStr.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
// Évaluer pour obtenir l'objet JavaScript
const products = eval(`(${productsStr})`);

// Créer le dossier data s'il n'existe pas
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Écrire le fichier JSON
const jsonPath = path.join(dataDir, 'fincas-canarias-products.json');
fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), 'utf-8');

console.log(`✅ Created ${jsonPath} with ${products.length} products`);




