/**
 * Script de migration des données JSON locales vers Upstash Redis
 * 
 * Usage:
 * 1. Configurez les variables d'environnement UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN
 * 2. Exécutez: npx tsx scripts/migrate-to-redis.ts
 */

import { promises as fs } from 'fs';
import path from 'path';
import { getProducts, setProducts, getCategories, setCategories, getCarousel, setCarousel } from '../src/lib/redis';

async function migrateProducts() {
  try {
    const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-products.json');
    const data = await fs.readFile(dataFile, 'utf-8');
    const products = JSON.parse(data);
    
    if (products && products.length > 0) {
      await setProducts(products);
      console.log(`✅ ${products.length} produits migrés vers Redis`);
    } else {
      console.log('⚠️  Aucun produit trouvé dans le fichier local');
    }
  } catch (error) {
    console.error('❌ Erreur lors de la migration des produits:', error);
  }
}

async function migrateCategories() {
  try {
    const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-categories.json');
    const data = await fs.readFile(dataFile, 'utf-8');
    const categories = JSON.parse(data);
    
    if (categories && categories.length > 0) {
      await setCategories(categories);
      console.log(`✅ ${categories.length} catégories migrées vers Redis`);
    } else {
      console.log('⚠️  Aucune catégorie trouvée dans le fichier local');
    }
  } catch (error) {
    console.error('❌ Erreur lors de la migration des catégories:', error);
  }
}

async function migrateCarousel() {
  try {
    const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-carousel.json');
    const data = await fs.readFile(dataFile, 'utf-8');
    const carousel = JSON.parse(data);
    
    if (carousel) {
      await setCarousel(carousel);
      console.log(`✅ Carrousel migré vers Redis (${carousel.items?.length || 0} items)`);
    } else {
      console.log('⚠️  Aucun carrousel trouvé dans le fichier local');
    }
  } catch (error) {
    console.error('❌ Erreur lors de la migration du carrousel:', error);
  }
}

async function main() {
  console.log('🚀 Début de la migration vers Redis...\n');
  
  // Vérifier les variables d'environnement
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.error('❌ Variables d\'environnement Redis non configurées!');
    console.error('   Configurez UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN');
    process.exit(1);
  }
  
  await migrateProducts();
  await migrateCategories();
  await migrateCarousel();
  
  console.log('\n✅ Migration terminée!');
}

main().catch(console.error);



