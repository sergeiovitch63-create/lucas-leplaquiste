import { Redis } from '@upstash/redis';
import type { Product } from '@/app/fincas-canarias/data';
import productsJson from '../../data/fincas-canarias-products.json';
import categoriesJson from '../../data/fincas-canarias-categories.json';
import carouselJson from '../../data/fincas-canarias-carousel.json';

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

function getRedis(): Redis {
  if (!redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    
    if (!url || !token) {
      throw new Error('UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set to use Redis');
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
    // En production (Vercel), utiliser les données JSON embarquées dans le bundle
    if (process.env.VERCEL === '1') {
      console.log('getProducts: utilisation du JSON embarqué (Vercel)');
      return (productsJson as Product[]) || [];
    }

    // Utiliser Redis si configuré, sinon utiliser les fichiers JSON
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      try {
        const data = await getRedis().get<Product[]>(PRODUCTS_KEY);
        if (data && data.length > 0) {
          console.log(`✅ ${data.length} produits chargés depuis Redis`);
          return data;
        }
        console.warn('⚠️  Redis vide, fallback vers fichiers JSON');
      } catch (error) {
        console.warn('⚠️  Erreur Redis, fallback vers fichiers JSON:', error);
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
    // Utiliser Redis si configuré, sinon utiliser les fichiers JSON
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      try {
        await getRedis().set(PRODUCTS_KEY, products);
        return;
      } catch (error) {
        console.warn('⚠️  Erreur Redis, fallback vers fichiers JSON:', error);
      }
    }
    
    // Fallback vers fichiers JSON
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
    // En production (Vercel), utiliser les données JSON embarquées dans le bundle
    if (process.env.VERCEL === '1') {
      console.log('getCategories: utilisation du JSON embarqué (Vercel)');
      return (categoriesJson as Category[]) || [];
    }

    // Utiliser Redis si configuré, sinon utiliser les fichiers JSON
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      try {
        const data = await getRedis().get<Category[]>(CATEGORIES_KEY);
        return data || [];
      } catch (error) {
        console.warn('⚠️  Erreur Redis, fallback vers fichiers JSON:', error);
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
    // Utiliser Redis si configuré, sinon utiliser les fichiers JSON
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      try {
        await getRedis().set(CATEGORIES_KEY, categories);
        return;
      } catch (error) {
        console.warn('⚠️  Erreur Redis, fallback vers fichiers JSON:', error);
      }
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
    // En production (Vercel), utiliser les données JSON embarquées dans le bundle
    if (process.env.VERCEL === '1') {
      console.log('getCarousel: utilisation du JSON embarqué (Vercel)');
      return (carouselJson as CarouselConfig) || null;
    }

    // Utiliser Redis si configuré, sinon utiliser les fichiers JSON
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      try {
        const data = await getRedis().get<CarouselConfig>(CAROUSEL_KEY);
        return data || null;
      } catch (error) {
        console.warn('⚠️  Erreur Redis, fallback vers fichiers JSON:', error);
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
    // Utiliser Redis si configuré, sinon utiliser les fichiers JSON
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      try {
        await getRedis().set(CAROUSEL_KEY, carousel);
        return;
      } catch (error) {
        console.warn('⚠️  Erreur Redis, fallback vers fichiers JSON:', error);
      }
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

