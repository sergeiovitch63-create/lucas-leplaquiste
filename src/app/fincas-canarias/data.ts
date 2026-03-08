export const UI = {
  es: {
    tagline: "Productos auténticos de las Islas Canarias",
    packTitle: "Pack hecho para ti",
    categories: "Categorías",
    searchPlaceholder: "Buscar entre todos los productos…",
    overlayLabel: "Buscar productos",
    overlayPlaceholder: "Mojo, miel, conservas…",
    results: (n: number) => `<span>${n}</span> producto${n !== 1 ? 's' : ''} encontrado${n !== 1 ? 's' : ''}`,
    empty: "No se encontraron productos",
    photoSoon: "Foto próximamente"
  },
  en: {
    tagline: "Authentic products from the Canary Islands",
    packTitle: "Pack made for you",
    categories: "Categories",
    searchPlaceholder: "Search all products…",
    overlayLabel: "Search products",
    overlayPlaceholder: "Mojo, honey, preserves…",
    results: (n: number) => `<span>${n}</span> product${n !== 1 ? 's' : ''} found`,
    empty: "No products found",
    photoSoon: "Photo coming soon"
  },
  de: {
    tagline: "Authentische Produkte von den Kanarischen Inseln",
    packTitle: "Pack für dich gemacht",
    categories: "Kategorien",
    searchPlaceholder: "Alle Produkte durchsuchen…",
    overlayLabel: "Produkte suchen",
    overlayPlaceholder: "Mojo, Honig, Konserven…",
    results: (n: number) => `<span>${n}</span> Produkt${n !== 1 ? 'e' : ''} gefunden`,
    empty: "Keine Produkte gefunden",
    photoSoon: "Foto folgt bald"
  },
  fr: {
    tagline: "Produits authentiques des Îles Canaries",
    packTitle: "Pack fait pour vous",
    categories: "Catégories",
    searchPlaceholder: "Rechercher parmi tous les produits…",
    overlayLabel: "Rechercher des produits",
    overlayPlaceholder: "Mojo, miel, conserves…",
    results: (n: number) => `<span>${n}</span> produit${n !== 1 ? 's' : ''} trouvé${n !== 1 ? 's' : ''}`,
    empty: "Aucun produit trouvé",
    photoSoon: "Photo bientôt disponible"
  },
  it: {
    tagline: "Prodotti autentici delle Isole Canarie",
    packTitle: "Pack fatto per te",
    categories: "Categorie",
    searchPlaceholder: "Cerca tra tutti i prodotti…",
    overlayLabel: "Cerca prodotti",
    overlayPlaceholder: "Mojo, miele, conserve…",
    results: (n: number) => `<span>${n}</span> prodotto${n !== 1 ? 'i' : ''} trovato${n !== 1 ? 'i' : ''}`,
    empty: "Nessun prodotto trovato",
    photoSoon: "Foto in arrivo"
  },
  ru: {
    tagline: "Аутентичные продукты с Канарских островов",
    packTitle: "Набор для вас",
    categories: "Категории",
    searchPlaceholder: "Поиск среди всех продуктов…",
    overlayLabel: "Поиск продуктов",
    overlayPlaceholder: "Мохо, мед, консервы…",
    results: (n: number) => {
      const lastDigit = n % 10;
      const lastTwoDigits = n % 100;
      let word = 'продукт';
      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        word = 'продуктов';
      } else if (lastDigit === 1) {
        word = 'продукт';
      } else if (lastDigit >= 2 && lastDigit <= 4) {
        word = 'продукта';
      } else {
        word = 'продуктов';
      }
      return `<span>${n}</span> ${word} найдено`;
    },
    empty: "Продукты не найдены",
    photoSoon: "Фото скоро"
  },
  pl: {
    tagline: "Autentyczne produkty z Wysp Kanaryjskich",
    packTitle: "Pakiet dla Ciebie",
    categories: "Kategorie",
    searchPlaceholder: "Szukaj wśród wszystkich produktów…",
    overlayLabel: "Szukaj produktów",
    overlayPlaceholder: "Mojo, miód, konserwy…",
    results: (n: number) => {
      if (n === 1) return `<span>${n}</span> produkt znaleziony`;
      if (n >= 2 && n <= 4) return `<span>${n}</span> produkty znalezione`;
      return `<span>${n}</span> produktów znalezionych`;
    },
    empty: "Nie znaleziono produktów",
    photoSoon: "Zdjęcie wkrótce"
  }
};

export const CAT_KEY = ["All", "Biscuits", "Snacks", "Confitures", "Miel", "Sauces", "Conserves", "Vins", "Packs"];

export const CAT_LABEL = {
  es: { All: "Todo", Biscuits: "Galletas y repostería", Snacks: "Snacks", Confitures: "Mermeladas y dulces", Miel: "Miel", Sauces: "Salsas y condimentos", Conserves: "Conservas", Vins: "Vinos, licores y zumos", Packs: "Packs" },
  en: { All: "All", Biscuits: "Biscuits & Pastries", Snacks: "Snacks", Confitures: "Jams & Sweets", Miel: "Honey", Sauces: "Sauces & Condiments", Conserves: "Preserves", Vins: "Wines, Liqueurs & Juices", Packs: "Packs" },
  de: { All: "Alle", Biscuits: "Kekse & Gebäck", Snacks: "Snacks", Confitures: "Marmeladen & Süßes", Miel: "Honig", Sauces: "Saucen & Gewürze", Conserves: "Konserven", Vins: "Weine, Liköre & Säfte", Packs: "Packs" },
  fr: { All: "Tout", Biscuits: "Biscuits & Pâtisseries", Snacks: "Snacks", Confitures: "Confitures & Sucreries", Miel: "Miel", Sauces: "Sauces & Condiments", Conserves: "Conserves", Vins: "Vins, Liqueurs & Jus", Packs: "Packs" },
  it: { All: "Tutto", Biscuits: "Biscotti & Pasticceria", Snacks: "Snack", Confitures: "Marmellate & Dolci", Miel: "Miele", Sauces: "Salse & Condimenti", Conserves: "Conserve", Vins: "Vini, Liquori & Succhi", Packs: "Pacchi" },
  ru: { All: "Все", Biscuits: "Печенье & Выпечка", Snacks: "Закуски", Confitures: "Джемы & Сладости", Miel: "Мёд", Sauces: "Соусы & Приправы", Conserves: "Консервы", Vins: "Вино, Ликёры & Соки", Packs: "Наборы" },
  pl: { All: "Wszystko", Biscuits: "Ciastka & Wyroby cukiernicze", Snacks: "Przekąski", Confitures: "Dżemy & Słodycze", Miel: "Miód", Sauces: "Sosy & Przyprawy", Conserves: "Konserwy", Vins: "Wina, Likier & Soki", Packs: "Pakiety" }
};

export type Lang = 'es' | 'en' | 'de' | 'fr' | 'it' | 'ru' | 'pl';

export const LANG_NAMES: Record<Lang, string> = {
  es: 'Español',
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  ru: 'Русский',
  pl: 'Polski'
};
export type Category = typeof CAT_KEY[number];

export interface Product {
  id: number;
  category: Category;
  img: string | null;
  name: Partial<Record<Lang, string>> & { es: string; en: string; de: string };
  subtitle: Partial<Record<Lang, string>> & { es: string; en: string; de: string };
  desc: Partial<Record<Lang, string>> & { es: string; en: string; de: string };
}

// Helper functions to get translations with fallback
export function getProductName(product: Product, lang: Lang): string {
  return product.name[lang] || product.name.en || product.name.es || product.name.de;
}

export function getProductSubtitle(product: Product, lang: Lang): string {
  return product.subtitle[lang] || product.subtitle.en || product.subtitle.es || product.subtitle.de;
}

export function getProductDesc(product: Product, lang: Lang): string {
  return product.desc[lang] || product.desc.en || product.desc.es || product.desc.de;
}

// Helper function to get category label with fallback
export function getCategoryLabel(category: Category, lang: Lang): string {
  return CAT_LABEL[lang]?.[category] || CAT_LABEL.en[category] || CAT_LABEL.es[category] || CAT_LABEL.de[category] || category;
}

