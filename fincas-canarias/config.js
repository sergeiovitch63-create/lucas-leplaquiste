const UI = {
  es: {
    tagline:"Productos auténticos de las Islas Canarias",
    categories:"Categorías",
    searchPlaceholder:"Buscar entre todos los productos…",
    overlayLabel:"Buscar productos",
    overlayPlaceholder:"Mojo, miel, conservas…",
    results:(n)=>`<span>${n}</span> producto${n!==1?'s':''} encontrado${n!==1?'s':''}`,
    empty:"No se encontraron productos",
    photoSoon:"Foto próximamente"
  },
  en: {
    tagline:"Authentic products from the Canary Islands",
    categories:"Categories",
    searchPlaceholder:"Search all products…",
    overlayLabel:"Search products",
    overlayPlaceholder:"Mojo, honey, preserves…",
    results:(n)=>`<span>${n}</span> product${n!==1?'s':''} found`,
    empty:"No products found",
    photoSoon:"Photo coming soon"
  },
  de: {
    tagline:"Authentische Produkte von den Kanarischen Inseln",
    categories:"Kategorien",
    searchPlaceholder:"Alle Produkte durchsuchen…",
    overlayLabel:"Produkte suchen",
    overlayPlaceholder:"Mojo, Honig, Konserven…",
    results:(n)=>`<span>${n}</span> Produkt${n!==1?'e':''} gefunden`,
    empty:"Keine Produkte gefunden",
    photoSoon:"Foto folgt bald"
  }
};

const CAT_KEY = ["All","Biscuits","Snacks","Confitures","Miel","Sauces","Conserves","Vins","Packs"];
const CAT_LABEL = {
  es:{ All:"Todo", Biscuits:"Galletas y repostería", Snacks:"Snacks", Confitures:"Mermeladas y dulces", Miel:"Miel", Sauces:"Salsas y condimentos", Conserves:"Conservas", Vins:"Vinos, licores y zumos", Packs:"Packs" },
  en:{ All:"All", Biscuits:"Biscuits & Pastries", Snacks:"Snacks", Confitures:"Jams & Sweets", Miel:"Honey", Sauces:"Sauces & Condiments", Conserves:"Preserves", Vins:"Wines, Liqueurs & Juices", Packs:"Packs" },
  de:{ All:"Alle", Biscuits:"Kekse & Gebäck", Snacks:"Snacks", Confitures:"Marmeladen & Süßes", Miel:"Honig", Sauces:"Saucen & Gewürze", Conserves:"Konserven", Vins:"Weine, Liköre & Säfte", Packs:"Packs" }
};

