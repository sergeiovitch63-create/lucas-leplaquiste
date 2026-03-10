/**
 * Script d'auto-traduction des produits Fincas Canarias.
 *
 * Objectif :
 *  - Compléter automatiquement name/subtitle/desc en FR, IT, RU, PL
 *    à partir des textes espagnols (ou anglais) existants.
 *
 * Utilisation (en local) :
 *  1) Ajouter une clé DeepL dans .env.local :
 *       DEEPL_API_KEY=xxxxxxxxxxxxxxxxxxxxx
 *  2) Lancer :
 *       npx ts-node scripts/translate-fincas.ts
 *
 * Remarques :
 *  - Aucun produit n'est supprimé.
 *  - On ne réécrit que les champs manquants pour chaque langue.
 *  - En cas d'erreur d'API, on log et on continue sans tout casser.
 */

import 'dotenv/config';
import { getProducts, setProducts } from '@/lib/redis';
import type { Product, Lang } from '@/app/fincas-canarias/data';

const TARGET_LANGS: Lang[] = ['fr', 'it', 'ru', 'pl'];

// Mapping Lang -> code DeepL
const DEEPL_CODES: Record<Lang, string> = {
  es: 'ES',
  en: 'EN',
  de: 'DE',
  fr: 'FR',
  it: 'IT',
  ru: 'RU',
  pl: 'PL',
};

async function translateWithDeepL(text: string, target: Lang): Promise<string> {
  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey) {
    throw new Error('DEEPL_API_KEY manquant dans .env.local');
  }

  const targetCode = DEEPL_CODES[target];
  const sourceCode = DEEPL_CODES.es; // on part de l'espagnol comme langue source principale

  const params = new URLSearchParams();
  params.append('text', text);
  params.append('target_lang', targetCode);
  params.append('source_lang', sourceCode);

  const res = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Erreur DeepL (${res.status}): ${body}`);
  }

  const data = (await res.json()) as {
    translations: { text: string }[];
  };

  return data.translations[0]?.text ?? text;
}

async function main() {
  console.log('🔍 Chargement des produits Fincas depuis Redis / fallback…');
  const products = await getProducts();
  console.log(`➡ ${products.length} produits trouvés`);

  let updatedCount = 0;

  for (const product of products) {
    let productChanged = false;

    for (const lang of TARGET_LANGS) {
      // Nom
      if (!product.name[lang] && product.name.es) {
        try {
          console.log(`🌐 [${lang}] Traduction du nom du produit #${product.id} (${product.name.es.slice(0, 40)}…)`);
          const translated = await translateWithDeepL(product.name.es, lang);
          product.name[lang] = translated;
          productChanged = true;
        } catch (error) {
          console.warn(`⚠️ Impossible de traduire le nom (#${product.id}) vers ${lang}:`, error);
        }
      }

      // Sous-titre
      if (!product.subtitle[lang] && product.subtitle.es) {
        try {
          console.log(`🌐 [${lang}] Traduction du sous-titre du produit #${product.id}`);
          const translated = await translateWithDeepL(product.subtitle.es, lang);
          product.subtitle[lang] = translated;
          productChanged = true;
        } catch (error) {
          console.warn(`⚠️ Impossible de traduire le sous-titre (#${product.id}) vers ${lang}:`, error);
        }
      }

      // Description
      if (!product.desc[lang] && product.desc.es) {
        try {
          console.log(`🌐 [${lang}] Traduction de la description du produit #${product.id}`);
          const translated = await translateWithDeepL(product.desc.es, lang);
          product.desc[lang] = translated;
          productChanged = true;
        } catch (error) {
          console.warn(`⚠️ Impossible de traduire la description (#${product.id}) vers ${lang}:`, error);
        }
      }
    }

    if (productChanged) {
      updatedCount += 1;
    }
  }

  if (updatedCount === 0) {
    console.log('✅ Aucune traduction manquante à remplir. Rien à sauvegarder.');
    return;
  }

  console.log(`💾 Sauvegarde des ${products.length} produits (dont ${updatedCount} mis à jour)…`);
  await setProducts(products);
  console.log('✅ Terminé. Les traductions FR/IT/RU/PL ont été complétées lorsque nécessaire.');
}

// Lancer le script
main().catch((error) => {
  console.error('❌ Erreur lors de la traduction automatique des produits:', error);
  process.exit(1);
});

