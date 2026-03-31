import { Redis } from '@upstash/redis';
import type { Product } from '@/app/fincas-canarias/data';

// Types
export interface Category {
  id: string;
  key: string;
  label: {
    es: string;
    en: string;
    de: string;
    fr?: string;
    it?: string;
    ru?: string;
    pl?: string;
  };
  order: number;
}

export interface CarouselItem {
  id: number;
  img: string | null;
  name: {
    es: string;
    en: string;
    de: string;
    fr?: string;
    it?: string;
    ru?: string;
    pl?: string;
  };
  description: {
    es: string;
    en: string;
    de: string;
    fr?: string;
    it?: string;
    ru?: string;
    pl?: string;
  };
  order: number;
}

export interface CarouselConfig {
  title: {
    es: string;
    en: string;
    de: string;
    fr?: string;
    it?: string;
    ru?: string;
    pl?: string;
  };
  description: {
    es: string;
    en: string;
    de: string;
    fr?: string;
    it?: string;
    ru?: string;
    pl?: string;
  };
  items: CarouselItem[];
}

// Initialize Redis client
// These environment variables are automatically set by Vercel when you add Upstash Redis integration
let redis: Redis | null = null;

function getRedisCredentials() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return { url, token };
}

function hasRedisCredentials(): boolean {
  const { url, token } = getRedisCredentials();
  return Boolean(url && token);
}

function getRedis(): Redis {
  if (!redis) {
    const { url, token } = getRedisCredentials();
    
    if (!url || !token) {
      throw new Error(
        'Redis credentials missing. Set UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN or KV_REST_API_URL/KV_REST_API_TOKEN.'
      );
    }
    
    redis = new Redis({
      url,
      token,
    });
  }
  return redis;
}

// Helper functions for Fincas Canarias data
const PRODUCTS_KEY = 'fincas:products';
const CATEGORIES_KEY = 'fincas:categories';
const CAROUSEL_KEY = 'fincas:carousel';

export async function getProducts(): Promise<Product[]> {
  try {
    // Source principale en prod: Redis (si configuré)
    if (hasRedisCredentials()) {
      try {
        const data = await getRedis().get<Product[]>(PRODUCTS_KEY);
        if (data && data.length > 0) {
          console.log(`✅ ${data.length} produits chargés depuis Redis`);
          return data;
        }
        console.warn('⚠️  Redis vide, fallback vers JSON embarqué/fichier');
      } catch (error) {
        console.warn('⚠️  Erreur Redis, fallback vers JSON embarqué/fichier:', error);
      }
    }

    // Sur Vercel (prod), fallback JSON embarqué dans le bundle
    if (process.env.VERCEL === '1') {
      try {
        const mod = await import('../../data/fincas-canarias-products.json');
        const products =
          (mod as { default: Product[] }).default ||
          ((mod as unknown) as Product[]);

        if (Array.isArray(products) && products.length > 0) {
          console.log(`✅ ${products.length} produits chargés depuis PRODUCTS (bundle Vercel)`);
          return products;
        }

        console.warn('⚠️  PRODUCTS (bundle Vercel) vide ou non valide, fallback JSON fichier');
      } catch (error) {
        console.error('❌ Erreur chargement PRODUCTS (bundle Vercel):', error);
      }
    }
    
    // Fallback vers fichiers JSON
    const { promises: fs } = await import('fs');
    const path = await import('path');
    const cwd = process.cwd();
    const dataFile = path.join(cwd, 'data', 'fincas-canarias-products.json');
    
    console.log(`[getProducts] Tentative de lecture depuis: ${dataFile}`);
    console.log(`[getProducts] process.cwd(): ${cwd}`);
    
    try {
      // Vérifier si le fichier existe
      await fs.access(dataFile);
      console.log(`[getProducts] ✅ Fichier trouvé: ${dataFile}`);
      
      const data = await fs.readFile(dataFile, 'utf-8');
      console.log(`[getProducts] Fichier lu, taille: ${data.length} caractères`);
      
      const products = JSON.parse(data);
      console.log(`✅ ${products.length} produits chargés depuis ${dataFile}`);
      
      if (!Array.isArray(products)) {
        console.error(`❌ Les données ne sont pas un tableau:`, typeof products);
        return [];
      }
      
      return products;
    } catch (error) {
      console.error(`❌ Erreur lecture fichier ${dataFile}:`, error);
      if (error instanceof Error) {
        console.error(`   Message: ${error.message}`);
        console.error(`   Code: ${(error as NodeJS.ErrnoException).code}`);
      }
      return [];
    }
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des produits:', error);
    return [];
  }
}

export async function setProducts(products: Product[]): Promise<void> {
  try {
    // Source principale en prod: Redis (si configuré)
    if (hasRedisCredentials()) {
      try {
        await getRedis().set(PRODUCTS_KEY, products);
        return;
      } catch (error) {
        console.error('❌ Erreur écriture Redis produits:', error);
        if (process.env.VERCEL === '1') {
          throw new Error('Redis write failed for products in production.');
        }
      }
    }
    
    // Fallback vers fichiers JSON (non disponible sur Vercel en read-only)
    if (process.env.VERCEL === '1') {
      throw new Error('Redis credentials missing for products in production.');
    }

    // Écriture fichier uniquement en environnement avec disque en écriture (dev / self-hosted)
    const { promises: fs } = await import('fs');
    const path = await import('path');
    const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-products.json');
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(products, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error setting products:', error);
    throw error;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    // Source principale en prod: Redis (si configuré)
    if (hasRedisCredentials()) {
      try {
        const data = await getRedis().get<Category[]>(CATEGORIES_KEY);
        if (data && data.length > 0) {
          console.log(`✅ ${data.length} catégories chargées depuis Redis`);
          return data;
        }
        console.warn('⚠️  Redis catégories vide, fallback JSON embarqué/fichier');
      } catch (error) {
        console.warn('⚠️  Erreur Redis, fallback vers JSON embarqué/fichier:', error);
      }
    }
    
    // Sur Vercel (prod), fallback JSON embarqué dans le bundle
    if (process.env.VERCEL === '1') {
      try {
        const mod = await import('../../data/fincas-canarias-categories.json');
        const categories = (mod as { default: Category[] }).default || (mod as unknown as Category[]);
        console.log(`✅ ${categories.length} catégories chargées depuis le JSON embarqué (Vercel)`);
        return categories;
      } catch (error) {
        console.error('❌ Erreur chargement JSON embarqué catégories sur Vercel:', error);
      }
    }
    
    // Fallback vers fichiers JSON
    const { promises: fs } = await import('fs');
    const path = await import('path');
    const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-categories.json');
    try {
      const data = await fs.readFile(dataFile, 'utf-8');
      const categories = JSON.parse(data);
      console.log(`✅ ${categories.length} catégories chargées depuis ${dataFile}`);
      return categories;
    } catch (error) {
      console.warn(`⚠️  Fichier catégories non trouvé ou erreur: ${dataFile}`, error);
      return [];
    }
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des catégories:', error);
    return [];
  }
}

export async function setCategories(categories: Category[]): Promise<void> {
  try {
    // Source principale en prod: Redis (si configuré)
    if (hasRedisCredentials()) {
      try {
        await getRedis().set(CATEGORIES_KEY, categories);
        return;
      } catch (error) {
        console.error('❌ Erreur écriture Redis catégories:', error);
        if (process.env.VERCEL === '1') {
          throw new Error('Redis write failed for categories in production.');
        }
      }
    }

    // En production Vercel, on ne tente pas d'écrire sur le disque (read-only)
    if (process.env.VERCEL === '1') {
      throw new Error('Redis credentials missing for categories in production.');
    }
    
    // Fallback vers fichiers JSON
    const { promises: fs } = await import('fs');
    const path = await import('path');
    const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-categories.json');
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(categories, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error setting categories:', error);
    throw error;
  }
}

export async function getCarousel(): Promise<CarouselConfig | null> {
  try {
    // Source principale en prod: Redis (si configuré)
    if (hasRedisCredentials()) {
      try {
        const data = await getRedis().get<CarouselConfig>(CAROUSEL_KEY);
        if (data) {
          console.log('✅ Carrousel chargé depuis Redis');
          return data;
        }
        console.warn('⚠️  Redis carrousel vide, fallback JSON embarqué/fichier');
      } catch (error) {
        console.warn('⚠️  Erreur Redis, fallback vers JSON embarqué/fichier:', error);
      }
    }
    
    // Sur Vercel (prod), fallback JSON embarqué dans le bundle
    if (process.env.VERCEL === '1') {
      try {
        const mod = await import('../../data/fincas-canarias-carousel.json');
        const carousel = (mod as { default: CarouselConfig }).default || (mod as unknown as CarouselConfig);
        console.log('✅ Carrousel chargé depuis le JSON embarqué (Vercel)');
        return carousel;
      } catch (error) {
        console.error('❌ Erreur chargement JSON embarqué carrousel sur Vercel:', error);
      }
    }
    
    // Fallback vers fichiers JSON
    const { promises: fs } = await import('fs');
    const path = await import('path');
    const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-carousel.json');
    try {
      const data = await fs.readFile(dataFile, 'utf-8');
      const carousel = JSON.parse(data);
      console.log(`✅ Carrousel chargé depuis ${dataFile}`);
      return carousel;
    } catch (error) {
      console.warn(`⚠️  Fichier carrousel non trouvé ou erreur: ${dataFile}`, error);
      return null;
    }
  } catch (error) {
    console.error('❌ Erreur lors de la récupération du carrousel:', error);
    return null;
  }
}

export async function setCarousel(carousel: CarouselConfig): Promise<void> {
  try {
    // Source principale en prod: Redis (si configuré)
    if (hasRedisCredentials()) {
      try {
        await getRedis().set(CAROUSEL_KEY, carousel);
        return;
      } catch (error) {
        console.error('❌ Erreur écriture Redis carrousel:', error);
        if (process.env.VERCEL === '1') {
          throw new Error('Redis write failed for carousel in production.');
        }
      }
    }

    // En production Vercel, on ne tente pas d'écrire sur le disque (read-only)
    if (process.env.VERCEL === '1') {
      throw new Error('Redis credentials missing for carousel in production.');
    }
    
    // Fallback vers fichiers JSON
    const { promises: fs } = await import('fs');
    const path = await import('path');
    const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-carousel.json');
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(carousel, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error setting carousel:', error);
    throw error;
  }
}

