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

function getRedis(): Redis {
  if (!redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    
    if (!url || !token) {
      throw new Error('UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set');
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
    // Fallback to file system if Redis is not configured (for local dev)
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      const { promises: fs } = await import('fs');
      const path = await import('path');
      const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-products.json');
      try {
        const data = await fs.readFile(dataFile, 'utf-8');
        return JSON.parse(data);
      } catch {
        return [];
      }
    }
    
    const data = await getRedis().get<Product[]>(PRODUCTS_KEY);
    return data || [];
  } catch {
    return [];
  }
}

export async function setProducts(products: Product[]): Promise<void> {
  try {
    // Fallback to file system if Redis is not configured (for local dev)
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      const { promises: fs } = await import('fs');
      const path = await import('path');
      const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-products.json');
      await fs.mkdir(path.dirname(dataFile), { recursive: true });
      await fs.writeFile(dataFile, JSON.stringify(products, null, 2), 'utf-8');
      return;
    }
    
    await getRedis().set(PRODUCTS_KEY, products);
  } catch (error) {
    console.error('Error setting products:', error);
    throw error;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    // Fallback to file system if Redis is not configured (for local dev)
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      const { promises: fs } = await import('fs');
      const path = await import('path');
      const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-categories.json');
      try {
        const data = await fs.readFile(dataFile, 'utf-8');
        return JSON.parse(data);
      } catch {
        return [];
      }
    }
    
    const data = await getRedis().get<Category[]>(CATEGORIES_KEY);
    return data || [];
  } catch {
    return [];
  }
}

export async function setCategories(categories: Category[]): Promise<void> {
  try {
    // Fallback to file system if Redis is not configured (for local dev)
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      const { promises: fs } = await import('fs');
      const path = await import('path');
      const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-categories.json');
      await fs.mkdir(path.dirname(dataFile), { recursive: true });
      await fs.writeFile(dataFile, JSON.stringify(categories, null, 2), 'utf-8');
      return;
    }
    
    await getRedis().set(CATEGORIES_KEY, categories);
  } catch (error) {
    console.error('Error setting categories:', error);
    throw error;
  }
}

export async function getCarousel(): Promise<CarouselConfig | null> {
  try {
    // Fallback to file system if Redis is not configured (for local dev)
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      const { promises: fs } = await import('fs');
      const path = await import('path');
      const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-carousel.json');
      try {
        const data = await fs.readFile(dataFile, 'utf-8');
        return JSON.parse(data);
      } catch {
        return null;
      }
    }
    
    const data = await getRedis().get<CarouselConfig>(CAROUSEL_KEY);
    return data || null;
  } catch {
    return null;
  }
}

export async function setCarousel(carousel: CarouselConfig): Promise<void> {
  try {
    // Fallback to file system if Redis is not configured (for local dev)
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      const { promises: fs } = await import('fs');
      const path = await import('path');
      const dataFile = path.join(process.cwd(), 'data', 'fincas-canarias-carousel.json');
      await fs.mkdir(path.dirname(dataFile), { recursive: true });
      await fs.writeFile(dataFile, JSON.stringify(carousel, null, 2), 'utf-8');
      return;
    }
    
    await getRedis().set(CAROUSEL_KEY, carousel);
  } catch (error) {
    console.error('Error setting carousel:', error);
    throw error;
  }
}

