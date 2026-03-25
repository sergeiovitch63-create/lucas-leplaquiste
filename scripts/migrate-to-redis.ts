/**
 * Script de migration des données JSON locales vers Upstash Redis
 * 
 * Usage:
 * 1. Configurez les variables d'environnement UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN
 * 2. Exécutez: npx tsx scripts/migrate-to-redis.ts
 */

import { promises as fs } from 'fs';
import path from 'path';
import {
  getProducts,
  setProducts,
  getCategories,
  setCategories,
  getCarousel,
  setCarousel,
} from "../src/lib/redis";

async function migrateProducts() {
  try {
    const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-products.json');
    const data = await fs.readFile(dataFile, 'utf-8');
    const products = JSON.parse(data);
    
    if (products && products.length > 0) {
      await setProducts(products);
      console.log(`[migrate] ${products.length} products migrated to Redis`);
    } else {
      console.log('[migrate] No products found in local JSON file');
    }
  } catch (error) {
    console.error('[migrate] Error migrating products:', error);
  }
}

async function migrateCategories() {
  try {
    const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-categories.json');
    const data = await fs.readFile(dataFile, 'utf-8');
    const categories = JSON.parse(data);
    
    if (categories && categories.length > 0) {
      await setCategories(categories);
      console.log(`[migrate] ${categories.length} categories migrated to Redis`);
    } else {
      console.log('[migrate] No categories found in local JSON file');
    }
  } catch (error) {
    console.error('[migrate] Error migrating categories:', error);
  }
}

async function migrateCarousel() {
  try {
    const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-carousel.json');
    const data = await fs.readFile(dataFile, 'utf-8');
    const carousel = JSON.parse(data);
    
    if (carousel) {
      await setCarousel(carousel);
      console.log(
        `[migrate] Carousel migrated to Redis (${carousel.items?.length || 0} items)`
      );
    } else {
      console.log('[migrate] No carousel found in local JSON file');
    }
  } catch (error) {
    console.error('[migrate] Error migrating carousel:', error);
  }
}

async function main() {
  console.log('[migrate] Starting migration to Redis...\n');
  
  // Vérifier les variables d'environnement
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    console.error('[migrate] Redis env vars not configured.');
    console.error(
      '  Set UPSTASH_REDIS_REST_URL/TOKEN or KV_REST_API_URL/TOKEN.'
    );
    process.exit(1);
  }
  
  await migrateProducts();
  await migrateCategories();
  await migrateCarousel();
  
  console.log('\n[migrate] Migration finished!');
}

main().catch(console.error);



