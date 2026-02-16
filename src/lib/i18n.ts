export type Locale = "fr" | "es";

export const defaultLocale: Locale = "fr";

export const translations = {
  fr: {
    "appeler-devis": "Appeler — Devis gratuit",
    "avis-clients": "Avis clients",
    "zones-intervention": "Zones d'intervention",
    "retour": "Retour",
    "demander-devis": "Demander un devis",
    "appel-immediat": "Appel immédiat",
    "reserver-whatsapp": "Réserver sur WhatsApp",
    "pourquoi-nous": "Pourquoi nous choisir",
    "en-images": "En images",
    "questions-frequentes": "Questions fréquentes",
    "avis-sur": "Avis sur",
    "note-globale": "Note globale",
    "base-sur": "Basé sur",
    "avis-google": "avis Google (données fictives)",
    "voir-google": "Voir sur Google",
    "votre": "Votre",
    "made-by": "Made by",
  },
  es: {
    "appeler-devis": "Llamar — Presupuesto gratuito",
    "avis-clients": "Opiniones de clientes",
    "zones-intervention": "Zonas de intervención",
    "retour": "Volver",
    "demander-devis": "Solicitar presupuesto",
    "appel-immediat": "Llamada inmediata",
    "reserver-whatsapp": "Reservar por WhatsApp",
    "pourquoi-nous": "Por qué elegirnos",
    "en-images": "En imágenes",
    "questions-frequentes": "Preguntas frecuentes",
    "avis-sur": "Opiniones sobre",
    "note-globale": "Nota global",
    "base-sur": "Basado en",
    "avis-google": "opiniones de Google (datos ficticios)",
    "voir-google": "Ver en Google",
    "votre": "",
    "made-by": "Hecho por",
  },
} as const;

export function getTranslation(locale: Locale, key: keyof typeof translations.fr): string {
  return translations[locale][key] || translations[defaultLocale][key];
}

export function detectLocale(pathname: string): Locale {
  if (pathname.startsWith("/es/")) {
    return "es";
  }
  return "fr";
}

