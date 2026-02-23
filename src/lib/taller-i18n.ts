/**
 * Taller El Salón — traductions FR, EN, ES, DE
 */

export type TallerLocale = "fr" | "en" | "es" | "de";

export const tallerDefaultLocale: TallerLocale = "fr";

export const tallerLocales: { value: TallerLocale; label: string; flag: string }[] = [
  { value: "fr", label: "Français", flag: "🇫🇷" },
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "es", label: "Español", flag: "🇪🇸" },
  { value: "de", label: "Deutsch", flag: "🇩🇪" },
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
    "on-whatsapp": "sur WhatsApp",
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
    "on-whatsapp": "on WhatsApp",
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
    "on-whatsapp": "en WhatsApp",
    "closed": "Cerrado",
    "day-mon": "lun", "day-tue": "mar", "day-wed": "mié", "day-thu": "jue", "day-fri": "vie", "day-sat": "sáb", "day-sun": "dom",
  },
  de: {
    "our-services": "Unsere Leistungen",
    "our-reviews": "Bewertungen",
    "contact": "Kontakt",
    "our-workshop": "Unsere Werkstatt",
    "your-garage": "Ihre Werkstatt",
    "gallery": "Galerie",
    "faq": "FAQ",
    "photos-placeholder": "Fotos werden hier hinzugefügt",
    "close": "Schließen",
    "open": "Öffnen",
    "back": "Zurück",
    "choose-language": "Sprache",
    "contact-us": "KONTAKTIEREN SIE UNS",
    "on-whatsapp": "auf WhatsApp",
    "closed": "Geschlossen",
    "day-mon": "Mo", "day-tue": "Di", "day-wed": "Mi", "day-thu": "Do", "day-fri": "Fr", "day-sat": "Sa", "day-sun": "So",
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
  de: {
    "systeme-electrique-batterie": { title: "Batterie und Elektrik", description: "Batterieprüfung, Wartung und Austausch. Vollständige Diagnose des Bordnetzes." },
    "alignements-des-roues": { title: "Achseinstellung", description: "Spur und Geometrie für sichere Fahrweise und gleichmäßigen Reifenverschleiß." },
    "vidange": { title: "Ölwechsel", description: "Kompletter Motorölwechsel mit Qualitätsöl. Wichtig für die Langlebigkeit des Motors." },
    "remplacement-filtres-air-habitacle": { title: "Innenraumfilter", description: "Neuer Innenraumfilter für bessere Luftqualität und Klimaanlage." },
    "freins": { title: "Bremsen", description: "Prüfung, Reparatur und Austausch von Bremsbelägen, Scheiben und Bremssystem." },
    "pneus": { title: "Reifen", description: "Reifenmontage, Auswuchten und Kontrolle. Fachberatung für Reifen." },
    "reparation-directions-suspensions": { title: "Lenkung und Federung", description: "Reparatur von Lenk- und Federungssystemen für optimalen Fahrkomfort." },
    "reparation-boitiers-traction": { title: "Getriebe-Reparatur", description: "Reparatur von Schalt- und Automatikgetrieben, Antrieben und Differentialen." },
    "reparation-electrique": { title: "Elektrik-Reparatur", description: "Diagnose und Reparatur von elektrischen Leitungen, Geräten und Steuergeräten." },
  },
};

const faqTranslations: Record<TallerLocale, Record<string, { question: string; answer: string }[]>> = {
  fr: {
    "systeme-electrique-batterie": [
      { question: "Quand faire contrôler ma batterie ?", answer: "Un contrôle annuel ou dès les premiers signes de fatigue (démarrage lent, phares faibles) est recommandé." },
      { question: "Combien de temps dure une batterie ?", answer: "En moyenne 4 à 5 ans selon l'utilisation et les conditions climatiques." },
    ],
    "alignements-des-roues": [
      { question: "Quand faire un alignement ?", answer: "Après un choc, un changement de pneus, ou si le véhicule tire d'un côté." },
      { question: "Quels sont les signes d'un mauvais alignement ?", answer: "Usure inégale des pneus, volant qui tire, véhicule qui dérive." },
    ],
    "vidange": [
      { question: "À quelle fréquence faire la vidange ?", answer: "Tous les 10 000 à 15 000 km ou une fois par an selon les préconisations constructeur." },
      { question: "Quelle huile utiliser ?", answer: "Nous utilisons des huiles adaptées à votre véhicule selon les spécifications constructeur." },
    ],
    "remplacement-filtres-air-habitacle": [
      { question: "À quoi sert le filtre d'habitacle ?", answer: "Il filtre pollen, poussière et particules pour un air plus sain dans l'habitacle." },
      { question: "Quand le remplacer ?", answer: "Tous les 15 000 à 30 000 km ou en cas d'odeurs ou de faible débit de climatisation." },
    ],
    "freins": [
      { question: "Quand changer les plaquettes de frein ?", answer: "Lorsque l'épaisseur est insuffisante ou que le voyant/témoin d'usure s'allume." },
      { question: "Freins qui grincent, est-ce grave ?", answer: "Cela peut indiquer une usure. Nous effectuons un diagnostic gratuit pour vous conseiller." },
    ],
    "pneus": [
      { question: "Quand changer les pneus ?", answer: "Quand la profondeur des sculptures est inférieure à 1,6 mm ou en cas de dommage." },
      { question: "Montage pneus été/hiver ?", answer: "Oui, nous assurons le montage et le stockage de vos pneus selon la saison." },
    ],
    "reparation-directions-suspensions": [
      { question: "Quels sont les signes de suspension fatiguée ?", answer: "Rebonds excessifs, bruits de claquement, usure anormale des pneus." },
      { question: "Direction assistée défaillante ?", answer: "Nous diagnostiquons et réparons les problèmes de direction assistée (hydraulique ou électrique)." },
    ],
    "reparation-boitiers-traction": [
      { question: "Boîte qui force ou craque ?", answer: "Un diagnostic permet d'identifier l'origine du problème (embrayage, boîte, etc.)." },
      { question: "Vous réparez les boîtes automatiques ?", answer: "Oui, nous intervenons sur les boîtes manuelles et automatiques." },
    ],
    "reparation-electrique": [
      { question: "Problème électrique intermittent ?", answer: "Nous effectuons un diagnostic pour localiser les faux contacts ou câblages défectueux." },
      { question: "Voyants qui s'allument ?", answer: "Une lecture des codes défaut nous indique la cause. Venez nous voir pour un diagnostic." },
    ],
  },
  en: {
    "systeme-electrique-batterie": [
      { question: "When should I have my battery checked?", answer: "An annual check or at the first signs of weakness (slow starting, dim lights) is recommended." },
      { question: "How long does a battery last?", answer: "On average 4 to 5 years depending on use and climate." },
    ],
    "alignements-des-roues": [
      { question: "When to get an alignment?", answer: "After an impact, tire change, or if the vehicle pulls to one side." },
      { question: "Signs of poor alignment?", answer: "Uneven tire wear, steering pull, vehicle drift." },
    ],
    "vidange": [
      { question: "How often for an oil change?", answer: "Every 10,000 to 15,000 km or once a year as per manufacturer guidelines." },
      { question: "What oil to use?", answer: "We use oils suited to your vehicle per manufacturer specifications." },
    ],
    "remplacement-filtres-air-habitacle": [
      { question: "What does the cabin filter do?", answer: "It filters pollen, dust and particles for cleaner air inside." },
      { question: "When to replace it?", answer: "Every 15,000 to 30,000 km or with odors or weak AC flow." },
    ],
    "freins": [
      { question: "When to change brake pads?", answer: "When thickness is insufficient or the wear indicator light comes on." },
      { question: "Squeaking brakes, serious?", answer: "It can indicate wear. We offer a free diagnostic to advise you." },
    ],
    "pneus": [
      { question: "When to change tires?", answer: "When tread depth is below 1.6 mm or in case of damage." },
      { question: "Summer/winter tire fitting?", answer: "Yes, we fit and store your seasonal tires." },
    ],
    "reparation-directions-suspensions": [
      { question: "Signs of worn suspension?", answer: "Excessive bounce, knocking noises, abnormal tire wear." },
      { question: "Power steering failing?", answer: "We diagnose and repair power steering (hydraulic or electric)." },
    ],
    "reparation-boitiers-traction": [
      { question: "Gearbox grinding or stiff?", answer: "A diagnostic identifies the cause (clutch, gearbox, etc.)." },
      { question: "Do you repair automatic gearboxes?", answer: "Yes, we work on manual and automatic gearboxes." },
    ],
    "reparation-electrique": [
      { question: "Intermittent electrical fault?", answer: "We run diagnostics to find loose contacts or faulty wiring." },
      { question: "Warning lights on?", answer: "Reading fault codes shows the cause. Come in for a diagnostic." },
    ],
  },
  es: {
    "systeme-electrique-batterie": [
      { question: "¿Cuándo revisar la batería?", answer: "Revisión anual o ante los primeros signos de fatiga (arranque lento, luces débiles)." },
      { question: "¿Cuánto dura una batería?", answer: "De media 4 a 5 años según uso y condiciones climáticas." },
    ],
    "alignements-des-roues": [
      { question: "¿Cuándo hacer la alineación?", answer: "Tras un golpe, cambio de neumáticos o si el vehículo tira a un lado." },
      { question: "¿Signos de mala alineación?", answer: "Desgaste irregular de neumáticos, volante que tira, deriva." },
    ],
    "vidange": [
      { question: "¿Cada cuánto cambiar el aceite?", answer: "Cada 10 000 a 15 000 km o una vez al año según fabricante." },
      { question: "¿Qué aceite usar?", answer: "Usamos aceites adecuados a su vehículo según especificaciones." },
    ],
    "remplacement-filtres-air-habitacle": [
      { question: "¿Para qué sirve el filtro de habitáculo?", answer: "Filtra polen, polvo y partículas para un aire más sano." },
      { question: "¿Cuándo sustituirlo?", answer: "Cada 15 000 a 30 000 km o con olores o poco caudal de climatización." },
    ],
    "freins": [
      { question: "¿Cuándo cambiar pastillas de freno?", answer: "Cuando el grosor es insuficiente o se enciende el testigo de desgaste." },
      { question: "¿Frenos que chirrían, es grave?", answer: "Puede indicar desgaste. Hacemos diagnóstico gratuito para asesorarle." },
    ],
    "pneus": [
      { question: "¿Cuándo cambiar neumáticos?", answer: "Cuando la profundidad del dibujo es inferior a 1,6 mm o hay daños." },
      { question: "¿Montaje neumáticos verano/invierno?", answer: "Sí, montamos y almacenamos sus neumáticos estacionales." },
    ],
    "reparation-directions-suspensions": [
      { question: "¿Signos de suspensión desgastada?", answer: "Rebotes excesivos, ruidos de golpes, desgaste anormal de neumáticos." },
      { question: "¿Dirección asistida defectuosa?", answer: "Diagnosticamos y reparamos la dirección asistida (hidráulica o eléctrica)." },
    ],
    "reparation-boitiers-traction": [
      { question: "¿Caja que fuerza o cruje?", answer: "Un diagnóstico identifica el origen (embrague, caja, etc.)." },
      { question: "¿Reparan cajas automáticas?", answer: "Sí, intervenimos en cajas manuales y automáticas." },
    ],
    "reparation-electrique": [
      { question: "¿Problema eléctrico intermitente?", answer: "Realizamos diagnóstico para localizar falsos contactos o cables defectuosos." },
      { question: "¿Luces de advertencia encendidas?", answer: "La lectura de códigos indica la causa. Venga para un diagnóstico." },
    ],
  },
  de: {
    "systeme-electrique-batterie": [
      { question: "Wann Batterie prüfen lassen?", answer: "Jährliche Kontrolle oder bei ersten Anzeichen (schwacher Start, schwache Scheinwerfer)." },
      { question: "Wie lange hält eine Batterie?", answer: "Im Schnitt 4 bis 5 Jahre je nach Nutzung und Klima." },
    ],
    "alignements-des-roues": [
      { question: "Wann Achseinstellung?", answer: "Nach Unfall, Reifenwechsel oder wenn das Fahrzeug zur Seite zieht." },
      { question: "Anzeichen für Fehlstellung?", answer: "Unregelmäßiger Reifenverschleiß, Lenkrad zieht, Fahrzeug driftet." },
    ],
    "vidange": [
      { question: "Wie oft Ölwechsel?", answer: "Alle 10.000 bis 15.000 km oder einmal jährlich laut Hersteller." },
      { question: "Welches Öl verwenden?", answer: "Wir verwenden passendes Öl laut Herstellerangaben." },
    ],
    "remplacement-filtres-air-habitacle": [
      { question: "Wozu der Innenraumfilter?", answer: "Filtert Pollen, Staub und Partikel für bessere Luftqualität." },
      { question: "Wann austauschen?", answer: "Alle 15.000 bis 30.000 km oder bei Gerüchen oder schwachem Klima-Luftstrom." },
    ],
    "freins": [
      { question: "Wann Bremsbeläge wechseln?", answer: "Wenn die Stärke zu gering ist oder die Verschleißwarnung leuchtet." },
      { question: "Bremsen quietschen – ernst?", answer: "Kann auf Verschleiß hindeuten. Wir machen eine kostenlose Diagnose." },
    ],
    "pneus": [
      { question: "Wann Reifen wechseln?", answer: "Wenn die Profiltiefe unter 1,6 mm liegt oder Schäden vorliegen." },
      { question: "Sommer-/Winterreifen-Montage?", answer: "Ja, wir montieren und lagern Ihre Saisonreifen." },
    ],
    "reparation-directions-suspensions": [
      { question: "Anzeichen für verschlissene Federung?", answer: "Übermäßiges Federn, Klopfgeräusche, ungleichmäßiger Reifenverschleiß." },
      { question: "Lenkhilfe defekt?", answer: "Wir diagnostizieren und reparieren Servolenkung (hydraulisch oder elektrisch)." },
    ],
    "reparation-boitiers-traction": [
      { question: "Getriebe knirscht oder klemmt?", answer: "Eine Diagnose zeigt die Ursache (Kupplung, Getriebe usw.)." },
      { question: "Reparieren Sie Automatikgetriebe?", answer: "Ja, wir arbeiten an Schalt- und Automatikgetrieben." },
    ],
    "reparation-electrique": [
      { question: "Intermittierender Elektrikfehler?", answer: "Wir führen Diagnosen durch, um lose Kontakte oder defekte Leitungen zu finden." },
      { question: "Kontrollleuchten an?", answer: "Fehlercode-Auslesung zeigt die Ursache. Kommen Sie zur Diagnose." },
    ],
  },
};

const reviewTranslations: Record<TallerLocale, { author: string; text: string }[]> = {
  fr: [
    { author: "Marie L.", text: "Excellent garage, très professionnel. Ma vidange a été faite rapidement et le personnel est très accueillant. Je recommande vivement !" },
    { author: "Carlos M.", text: "J'ai fait réparer mes freins ici. Travail soigné, prix correct. Je reviendrai sans hésiter pour l'entretien de ma voiture." },
    { author: "Sophie R.", text: "Service impeccable pour le changement de pneus. Équipe sympathique et compétente. Merci pour votre professionnalisme !" },
  ],
  en: [
    { author: "Marie L.", text: "Excellent garage, very professional. My oil change was done quickly and the staff is very welcoming. Highly recommend!" },
    { author: "Carlos M.", text: "Had my brakes repaired here. Neat work, fair prices. I'll be back for my car maintenance." },
    { author: "Sophie R.", text: "Impeccable service for tire change. Friendly and competent team. Thank you for your professionalism!" },
  ],
  es: [
    { author: "Marie L.", text: "Excelente taller, muy profesional. Mi cambio de aceite fue rápido y el personal muy acogedor. ¡Lo recomiendo!" },
    { author: "Carlos M.", text: "Reparé los frenos aquí. Trabajo cuidado, precio correcto. Volveré sin dudar para el mantenimiento." },
    { author: "Sophie R.", text: "Servicio impecable para cambio de neumáticos. Equipo amable y competente. ¡Gracias por su profesionalismo!" },
  ],
  de: [
    { author: "Marie L.", text: "Ausgezeichnete Werkstatt, sehr professionell. Ölwechsel war schnell erledigt, freundliches Personal. Sehr empfehlenswert!" },
    { author: "Carlos M.", text: "Bremsen hier reparieren lassen. Sorgfältige Arbeit, faire Preise. Komme gerne wieder zur Wartung." },
    { author: "Sophie R.", text: "Einwandfreier Service beim Reifenwechsel. Freundliches und kompetentes Team. Vielen Dank!" },
  ],
};

export function getTallerTranslation(locale: TallerLocale, key: string): string {
  return translations[locale][key] ?? translations[tallerDefaultLocale][key] ?? key;
}

export function getTallerCategoryTranslation(locale: TallerLocale, slug: string, field: string): string {
  const cat = categoryTranslations[locale]?.[slug];
  if (!cat) return categoryTranslations[tallerDefaultLocale]?.[slug]?.[field] ?? "";
  return cat[field] ?? categoryTranslations[tallerDefaultLocale]?.[slug]?.[field] ?? "";
}

export function getTallerFaq(locale: TallerLocale, slug: string): { question: string; answer: string }[] {
  return faqTranslations[locale]?.[slug] ?? faqTranslations[tallerDefaultLocale]?.[slug] ?? [];
}

export function getTallerReviews(locale: TallerLocale): { author: string; text: string }[] {
  return reviewTranslations[locale] ?? reviewTranslations[tallerDefaultLocale] ?? [];
}
