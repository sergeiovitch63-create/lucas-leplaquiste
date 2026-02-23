/**
 * Taller El Salón — traductions FR, EN, ES
 */

export type TallerLocale = "fr" | "en" | "es";

export const tallerDefaultLocale: TallerLocale = "fr";

export const tallerLocales: { value: TallerLocale; label: string; flag: string }[] = [
  { value: "fr", label: "Français", flag: "🇫🇷" },
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "es", label: "Español", flag: "🇪🇸" },
];

const translations: Record<TallerLocale, Record<string, string>> = {
  fr: {
    "our-services": "Nos services",
    "our-reviews": "Nos avis",
    "contact": "Contact",
    "our-workshop": "Notre atelier",
    "your-garage": "Votre garage",
    "gallery": "Galerie",
    "faq": "FAQ",
    "photos-placeholder": "Les photos seront ajoutées ici",
    "close": "Fermer",
    "open": "Ouvrir",
    "back": "Retour",
    "choose-language": "Langue",
    "contact-us": "NOUS CONTACTER",
    "closed": "Fermé",
    "day-mon": "lun", "day-tue": "mar", "day-wed": "mer", "day-thu": "jeu", "day-fri": "ven", "day-sat": "sam", "day-sun": "dim",
  },
  en: {
    "our-services": "Our services",
    "our-reviews": "Our reviews",
    "contact": "Contact",
    "our-workshop": "Our workshop",
    "your-garage": "Your garage",
    "gallery": "Gallery",
    "faq": "FAQ",
    "photos-placeholder": "Photos will be added here",
    "close": "Close",
    "open": "Open",
    "back": "Back",
    "choose-language": "Language",
    "contact-us": "CONTACT US",
    "closed": "Closed",
    "day-mon": "Mon", "day-tue": "Tue", "day-wed": "Wed", "day-thu": "Thu", "day-fri": "Fri", "day-sat": "Sat", "day-sun": "Sun",
  },
  es: {
    "our-services": "Nuestros servicios",
    "our-reviews": "Nuestras opiniones",
    "contact": "Contacto",
    "our-workshop": "Nuestro taller",
    "your-garage": "Vuestro garage",
    "gallery": "Galería",
    "faq": "Preguntas frecuentes",
    "photos-placeholder": "Las fotos se añadirán aquí",
    "close": "Cerrar",
    "open": "Abrir",
    "back": "Volver",
    "choose-language": "Idioma",
    "contact-us": "CONTÁCTENOS",
    "closed": "Cerrado",
    "day-mon": "lun", "day-tue": "mar", "day-wed": "mié", "day-thu": "jue", "day-fri": "vie", "day-sat": "sáb", "day-sun": "dom",
  },
};

const categoryTranslations: Record<TallerLocale, Record<string, Record<string, string>>> = {
  fr: {
    "systeme-electrique-batterie": { title: "Système électrique batterie", description: "Contrôle, entretien et remplacement de batteries. Diagnostic du système électrique de votre véhicule." },
    "alignements-des-roues": { title: "Alignements des roues", description: "Parallélisme et géométrie des roues pour une conduite stable et une usure uniforme des pneus." },
    "vidange": { title: "Vidange", description: "Vidange moteur complète avec huile de qualité. Entretien essentiel pour la longévité de votre moteur." },
    "remplacement-filtres-air-habitacle": { title: "Remplacement de filtres d'air pour habitacle", description: "Nouveau filtre d'habitacle pour une meilleure qualité d'air et un système de climatisation performant." },
    "freins": { title: "Freins", description: "Contrôle, réparation et remplacement des plaquettes, disques et système de freinage." },
    "pneus": { title: "Pneus", description: "Montage, équilibrage et contrôle des pneus. Conseils pour le choix des pneumatiques." },
    "reparation-directions-suspensions": { title: "Réparation de directions et suspensions", description: "Réparation des systèmes de direction et de suspension pour une tenue de route optimale." },
    "reparation-boitiers-traction": { title: "Réparation de boîtiers de traction", description: "Réparation des boîtes de vitesses manuelles et automatiques, transmissions et différentiels." },
    "reparation-electrique": { title: "Réparation électrique", description: "Diagnostic et réparation des circuits électriques, équipements et calculateurs du véhicule." },
  },
  en: {
    "systeme-electrique-batterie": { title: "Electrical system and battery", description: "Battery check, maintenance and replacement. Full diagnostic of your vehicle's electrical system." },
    "alignements-des-roues": { title: "Wheel alignment", description: "Wheel alignment and geometry for stable handling and even tire wear." },
    "vidange": { title: "Oil change", description: "Complete engine oil change with quality oil. Essential maintenance for engine longevity." },
    "remplacement-filtres-air-habitacle": { title: "Cabin air filter replacement", description: "New cabin filter for better air quality and efficient climate control." },
    "freins": { title: "Brakes", description: "Inspection, repair and replacement of brake pads, discs and braking system." },
    "pneus": { title: "Tires", description: "Tire mounting, balancing and inspection. Expert advice for tire selection." },
    "reparation-directions-suspensions": { title: "Steering and suspension repair", description: "Repair of steering and suspension systems for optimal road handling." },
    "reparation-boitiers-traction": { title: "Transmission repair", description: "Repair of manual and automatic gearboxes, transmissions and differentials." },
    "reparation-electrique": { title: "Electrical repair", description: "Diagnosis and repair of electrical circuits, equipment and vehicle control units." },
  },
  es: {
    "systeme-electrique-batterie": { title: "Sistema eléctrico y batería", description: "Revisión, mantenimiento y sustitución de baterías. Diagnóstico del sistema eléctrico." },
    "alignements-des-roues": { title: "Alineación de ruedas", description: "Paralelismo y geometría para una conducción estable y desgaste uniforme de neumáticos." },
    "vidange": { title: "Cambio de aceite", description: "Cambio de aceite completo con aceite de calidad para la longevidad del motor." },
    "remplacement-filtres-air-habitacle": { title: "Sustitución de filtros de aire del habitáculo", description: "Nuevo filtro de habitáculo para mejor calidad de aire y climatización." },
    "freins": { title: "Frenos", description: "Revisión, reparación y sustitución de pastillas, discos y sistema de frenado." },
    "pneus": { title: "Neumáticos", description: "Montaje, equilibrado y revisión de neumáticos. Asesoramiento profesional." },
    "reparation-directions-suspensions": { title: "Reparación de dirección y suspensión", description: "Reparación de sistemas de dirección y suspensión para óptimo agarre." },
    "reparation-boitiers-traction": { title: "Reparación de cajas de cambios", description: "Reparación de cajas manuales y automáticas, transmisiones y diferenciales." },
    "reparation-electrique": { title: "Reparación eléctrica", description: "Diagnóstico y reparación de circuitos, equipos y centralitas del vehículo." },
  },
};

export function getTallerTranslation(locale: TallerLocale, key: string): string {
  return translations[locale][key] ?? translations[tallerDefaultLocale][key] ?? key;
}

export function getTallerCategoryTranslation(locale: TallerLocale, slug: string, field: string): string {
  const cat = categoryTranslations[locale]?.[slug];
  if (!cat) return categoryTranslations[tallerDefaultLocale]?.[slug]?.[field] ?? "";
  return cat[field] ?? categoryTranslations[tallerDefaultLocale]?.[slug]?.[field] ?? "";
}
