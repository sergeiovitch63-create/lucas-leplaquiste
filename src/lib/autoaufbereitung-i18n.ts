/**
 * Autoaufbereitung Puerto de la Cruz — traductions DE, EN, ES, RU
 */

export type AutoaufbereitungLocale = "de" | "en" | "es" | "ru";

export const autoaufbereitungDefaultLocale: AutoaufbereitungLocale = "de";

export const autoaufbereitungLocales: {
  value: AutoaufbereitungLocale;
  label: string;
  flag: string;
}[] = [
  { value: "de", label: "Deutsch", flag: "🇩🇪" },
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "es", label: "Español", flag: "🇪🇸" },
  { value: "ru", label: "Русский", flag: "🇷🇺" },
];

const translations: Record<AutoaufbereitungLocale, Record<string, string>> = {
  de: {
    "our-services": "Unsere Leistungen",
    "section-detailing": "Detailing",
    "section-restoration": "Restoration",
    "section-pdr": "Paintless Dent Repair (PDR)",
    "contact": "Kontakt",
    "contact-whatsapp": "Kontakt per WhatsApp",
    "route": "Route",
    "choose-language": "Sprache",
    "gallery": "Galerie",
    "faq": "FAQ",
    "photos-placeholder": "Fotos werden hier hinzugefügt",
  },
  en: {
    "our-services": "Our services",
    "section-detailing": "Detailing",
    "section-restoration": "Restoration",
    "section-pdr": "Paintless Dent Repair (PDR)",
    "contact": "Contact",
    "contact-whatsapp": "Contact via WhatsApp",
    "route": "Get directions",
    "choose-language": "Language",
    "gallery": "Gallery",
    "faq": "FAQ",
    "photos-placeholder": "Photos will be added here",
  },
  es: {
    "our-services": "Nuestros servicios",
    "section-detailing": "Detailing",
    "section-restoration": "Restauración",
    "section-pdr": "Paintless Dent Repair (PDR)",
    "contact": "Contacto",
    "contact-whatsapp": "Contactar por WhatsApp",
    "route": "Cómo llegar",
    "choose-language": "Idioma",
    "gallery": "Galería",
    "faq": "Preguntas frecuentes",
    "photos-placeholder": "Las fotos se añadirán aquí",
  },
  ru: {
    "our-services": "Наши услуги",
    "section-detailing": "Detailing",
    "section-restoration": "Реставрация",
    "section-pdr": "Paintless Dent Repair (PDR)",
    "contact": "Контакт",
    "contact-whatsapp": "Связаться через WhatsApp",
    "route": "Маршрут",
    "choose-language": "Язык",
    "gallery": "Галерея",
    "faq": "Часто задаваемые вопросы",
    "photos-placeholder": "Фотографии будут добавлены здесь",
  },
};

interface CategoryTranslation {
  title: string;
  description: string;
  items?: string[];
}

const categoryTranslations: Record<
  AutoaufbereitungLocale,
  Record<string, CategoryTranslation>
> = {
  de: {
    "basic-package": {
      title: "Basic Package",
      description:
        "💧 Unser Einstiegspaket für eine saubere Karosserie und frischen Innenraum. Professionelle Handwäsche, Innen- und Außenscheiben, leichte Innenraumreinigung und Oberflächenpflege. Ideal für die regelmäßige Wartung.",
      items: [
        "Professionelle Handwäsche der Karosserie",
        "Reinigung der Scheiben innen und außen",
        "Leichte Innenraumreinigung",
        "Fußmatten ausklopfen und saugen",
        "Reinigung aller Oberflächen",
        "Reinigung von Rädern, Felgen und Radkästen",
        "Abwischen der Türrahmen",
      ],
    },
    "medium-package": {
      title: "Medium Package",
      description:
        "✨ Enthält alles vom Basic Package plus Tiefeninnenreinigung, detailliertere Außenreinigung (Insekten, Harz), gründliche Felgen- und Reifenreinigung, Pflege von Kunststoff und Gummi sowie leichte professionelle Politur der Karosserie.",
      items: [
        "Alles vom Basic Package",
        "Tiefenreinigung Innenraum (Fußmatten, Sitze, Polster)",
        "Detailliertere Außenreinigung (Insekten- und Harzentfernung)",
        "Gründliche Reinigung von Felgen und Reifen",
        "Pflege von Kunststoff- und Gummielementen",
        "Leichte professionelle Politur der Karosserie",
      ],
    },
    "luxury-package": {
      title: "Luxury Package (Full Detailing)",
      description:
        "🏆 Unser Premium-Paket für komplettes Full Detailing. Tiefeninnenreinigung mit Lederpflege, chemische Reinigung von Teppichen und Sitzen, Motorraumreinigung, professionelle Handwäsche gegen hartnäckigen Schmutz, 2–3-stufige Politur (Hologramme und mittlere Kratzer entfernt), hochwertige Keramikversiegelung.",
      items: [
        "Tiefeninnenreinigung mit Lederpflege",
        "Chemische Reinigung von Teppichen und Sitzen",
        "Motorraumreinigung",
        "Professionelle Handwäsche gegen hartnäckigen Schmutz",
        "2–3-stufige professionelle Politur der Karosserie (Entfernung von Hologrammen und mittleren Kratzern)",
        "Auftrag einer hochwertigen Keramikversiegelung",
      ],
    },
    "headlight-restoration": {
      title: "Scheinwerfer-Restauration",
      description:
        "💡 Professionelle Wiederherstellung vergilbter oder trüber Scheinwerfer. Stufenweises Abschleifen, Polieren und UV-Schutz für optimale Sichtbarkeit. Ab 35€ pro Scheinwerfer.",
      items: [
        "Professionelle Restauration vergilbter/trüber Scheinwerfer",
        "Stufenweises Schleifen und Polieren",
        "UV-Schutzversiegelung",
        "Verbesserte Sicht und Sicherheit",
        "Ab 35€ pro Scheinwerfer",
      ],
    },
    "restoration-fabric-alcantara-carpets": {
      title: "Restauration Stoff, Alcantara & Teppiche",
      description:
        "🧵 Restauration und Reparatur von Stoffen, Alcantara und Teppichen. Entfernung von Brandflecken, Nahtreparaturen, Beseitigung hartnäckiger Flecken.",
      items: [
        "Restauration von Stoffen und Alcantara",
        "Teppichrestauration und -reinigung",
        "Entfernung von Brandflecken",
        "Nahtreparaturen",
        "Fleckentfernung",
      ],
    },
    "restoration-repair-panels": {
      title: "Restauration und Reparatur von Paneelen",
      description:
        "🔧 Reparatur und Restauration von Innen- und Außenpaneelen. Kratzerkorrektur, Lackretusche, Ersatz oder Reparatur beschädigter Teile.",
      items: [
        "Innenpaneel-Restauration",
        "Außenpaneel-Reparatur",
        "Kratzerkorrektur",
        "Lackretusche",
        "Ersatz oder Reparatur beschädigter Teile",
      ],
    },
    "restoration-leather-steering-wheel": {
      title: "Restauration Lederlenkrad",
      description:
        "🔄 Professionelle Restauration von Echtleder-Lenkraden. Reinigung, Rehydration, Reparatur abgenutzter Stellen und Schutzversiegelung für angenehmes Griffgefühl und neuwertiges Aussehen.",
      items: [
        "Tiefenreinigung des Lederlenkrads",
        "Leder-Rehydration und Pflege",
        "Reparatur abgenutzter oder rissiger Stellen",
        "Schutzversiegelung",
        "Wiederherstellung von Aussehen und Griffgefühl",
      ],
    },
    "elimination-odours-interior-disinfection": {
      title: "Geruchsbeseitigung & Innenraumdesinfektion",
      description:
        "🌿 Beseitigung unangenehmer Gerüche (Tabak, Tiere, Feuchtigkeit) und vollständige Innenraumdesinfektion. Ozontherapie oder professionelle Produkte. Ab 80€.",
      items: [
        "Beseitigung unangenehmer Gerüche (Tabak, Tiere, Feuchtigkeit)",
        "Vollständige Innenraumdesinfektion",
        "Ozontherapie oder professionelle Produkte",
        "Reinigung der Klimaanlage",
        "Ab 80€",
      ],
    },
    "partial-restoration-leather-seats": {
      title: "Teilrestauration Lederpolster",
      description:
        "🪑 Teilweise Restauration von Lederpolstern: abgenutzte Stellen, Risse, Verfärbungen. Reinigung, Reparatur und Farbretusche. Ab 100€.",
      items: [
        "Restauration abgenutzter oder beschädigter Sitzbereiche",
        "Reparatur von Rissen und Kratzern",
        "Farbretusche",
        "Lederpflege",
        "Ab 100€",
      ],
    },
    "full-restoration-leather-seats": {
      title: "Vollständige Restauration Lederpolster",
      description:
        "✨ Vollständige Restauration von Lederpolstern: Tiefenreinigung, Reparatur aller Schäden, einheitliche Farbretusche und dauerhafter Schutz. Wie neu.",
      items: [
        "Komplette Lederpolster-Restauration",
        "Tiefenreinigung und Pflege",
        "Vollständige Schadensreparatur (Risse, Einrisse, Verfärbungen)",
        "Einheitliche Farbwiederherstellung",
        "Dauerhafte Schutzversiegelung",
      ],
    },
    "small-dent-repair": {
      title: "Kleine Beule (2–3 cm, guter Zugang)",
      description:
        "🔨 Schnelle Reparatur kleiner Beulen: 2–3 cm, guter Zugang. Paintless Dent Repair (ohne Lackierung). 30–50€, 20–40 Min.",
      items: ["2–3 cm Beule, guter Zugang", "30–50€", "Schnellreparatur (20–40 Min)", "Paintless Dent Repair"],
    },
    "medium-dent-repair": {
      title: "Mittlere Beule (3–10 cm)",
      description:
        "🔨 Mittlere Beulen durch Türschlag oder Vandalismus. 3–10 cm, Paintless Dent Repair. 80–150€ je nach Schwierigkeit.",
      items: ["3–10 cm Beule", "80–150€", "Durch Türschlag oder Vandalismus", "Paintless Dent Repair"],
    },
    "large-dent-full-door": {
      title: "Große Beule oder ganze Tür",
      description:
        "🔨 Große Beule oder komplettes Paneel (z.B. ganze Tür). Schwerer Zugang oder ganzes Paneel. 100–200€, ca. 230€ pro Tür.",
      items: ["Große Beule oder ganzes Paneel", "100–200€", "Schwerer Zugang oder ganzes Paneel", "z.B. 230€ pro Tür"],
    },
    "multiple-dents-hail": {
      title: "Mehrere Beulen (Hagelschaden)",
      description:
        "🔨 Mehrere Beulen durch Hagel. Preis je nach Anzahl und Fläche. 100–1000€+, 1–2 Tage Arbeit.",
      items: ["100–1000€+", "Je nach Anzahl und Fläche", "1–2 Tage Arbeit", "Paintless Dent Repair"],
    },
    "full-car-hail-repair": {
      title: "Komplette Hagelschaden-Reparatur",
      description:
        "🔨 Vollständige Reparatur hagelgeschädigter Fahrzeuge. 500–1500€ je nach Modell und Inspektion.",
      items: ["500–1500€", "Je nach Modell und Inspektion", "Komplette Hagelschaden-Reparatur", "Paintless Dent Repair"],
    },
    aussenaufbereitung: {
      title: "Außenaufbereitung",
      description:
        "Lassen Sie Ihr Fahrzeug wieder in neuem Glanz erstrahlen. Gründliche Handwäsche, professionelle Reinigung der Außenbereiche für ein makelloses Erscheinungsbild.",
      items: [
        "Gründliche Handwäsche außen",
        "Felgenreinigung",
        "Scheibenreinigung außen",
        "Reifenreinigung inkl. Pflege",
        "Außenspiegel reinigen",
        "Auspuffrohre reinigen",
      ],
    },
    innenaufbereitung: {
      title: "Innenaufbereitung",
      description:
        "Vergessen Sie verdreckte Autositze und verklebte Armaturen. Wir reinigen Ihren Fahrzeug-Innenraum porentief.",
      items: [
        "Innenraumreinigung",
        "Scheibenreinigung innen",
        "Innenraumpflege",
        "Boden saugen",
        "Fußmatten saugen",
        "Kofferraum saugen",
        "Cockpit feucht wischen",
        "Einstiegsleisten feucht wischen",
        "Fußraum und Pedale reinigen",
      ],
    },
    "zubuchbare-leistungen": {
      title: "Zubuchbare Leistungen",
      description:
        "Ergänzen Sie Ihr Detailprogramm mit unseren Zusatzleistungen. Von der Tiefenreinigung bis zur Politur und Versiegelung.",
      items: [
        "Fußmatten Tiefenreinigung",
        "Sitzpolster Tiefenreinigung",
        "Lederpflege inkl. Reinigung",
        "Einstufige Politur",
        "Mehrstufige Politur",
        "Keramikversiegelung - Lack",
        "Wachsversiegelung - Lack",
      ],
    },
    keramikversiegelung: {
      title: "Keramikversiegelung",
      description:
        "Lang anhaltender Schutz und brillanter Glanz. Eine Keramikversiegelung schützt den Lack vor Frost, UV-Strahlung, Streusalz und anderen Umwelteinflüssen. Leichte Reinigung dank glatter Oberfläche — perfekte Werterhaltung für Ihr Fahrzeug.",
      items: undefined,
    },
    nanoversiegelung: {
      title: "Nanoversiegelung",
      description:
        "Ein langlebiges Schutzschild gegen diverse schädliche Umwelteinflüsse wie Frost, UV-Strahlung, Streusalz und mehr. Die perfekte Werterhaltung für Ihr Fahrzeug.",
      items: undefined,
    },
  },
  en: {
    "basic-package": {
      title: "Basic Package",
      description:
        "💧 Our entry package for a clean bodywork and fresh interior. Professional hand wash, inside and outside windows, light interior cleaning and surface care. Ideal for regular maintenance.",
      items: [
        "Professional hand wash of the bodywork",
        "Cleaning of windows inside and outside",
        "Light interior cleaning",
        "Shaking out and vacuuming floor mats",
        "Cleaning of all surfaces",
        "Cleaning of wheels, rims, and wheel arches",
        "Wiping of door frames",
      ],
    },
    "medium-package": {
      title: "Medium Package",
      description:
        "✨ Includes everything from the Basic Package plus deep interior cleaning, more detailed exterior cleaning (insect and resin removal), thorough rims and tires cleaning, care of plastic and rubber elements, and light professional polishing of the bodywork.",
      items: [
        "Everything from Basic Package",
        "Deep interior cleaning (floor mats, seats, upholstery)",
        "More detailed exterior cleaning (removal of insects and resin)",
        "Thorough cleaning of rims and tires",
        "Care of plastic and rubber elements",
        "Light professional polishing of the bodywork",
      ],
    },
    "luxury-package": {
      title: "Luxury Package (Full Detailing)",
      description:
        "🏆 Our premium package for complete full detailing. Deep interior cleaning with leather care, chemical cleaning of carpets and seats, engine bay cleaning, professional hand wash removing stubborn dirt, 2–3 stage polishing (holograms and medium scratches removed), high-quality ceramic coating.",
      items: [
        "Deep interior cleaning with leather care",
        "Chemical cleaning of carpets and seats",
        "Engine bay cleaning",
        "Professional hand wash removing stubborn dirt",
        "2–3 stage professional polishing of the bodywork (removal of holograms and medium scratches)",
        "Application of a high-quality ceramic coating",
      ],
    },
    "headlight-restoration": {
      title: "Headlight Restoration",
      description:
        "💡 Professional restoration of yellowed or cloudy headlights. Progressive sanding, polishing and UV protection for optimal visibility. From €35 per headlight.",
      items: [
        "Professional restoration of yellowed or cloudy headlights",
        "Progressive sanding and polishing",
        "UV protection coating",
        "Improved visibility and safety",
        "From €35 per headlight",
      ],
    },
    "restoration-fabric-alcantara-carpets": {
      title: "Restoration of Fabric Surfaces, Alcantara & Carpets",
      description:
        "🧵 Restoration and repair of interior fabrics, Alcantara and carpets. Removal of burn marks, seam repairs, stubborn stain removal.",
      items: [
        "Restoration of fabric surfaces and Alcantara",
        "Carpet restoration and cleaning",
        "Removal of burn marks",
        "Seam repairs",
        "Stain removal",
      ],
    },
    "restoration-repair-panels": {
      title: "Restoration and Repair of Panels",
      description:
        "🔧 Repair and restoration of interior and exterior panels. Scratch correction, paint touch-ups, replacement or repair of damaged parts.",
      items: [
        "Interior panel restoration",
        "Exterior panel repair",
        "Scratch correction",
        "Paint touch-ups",
        "Replacement or repair of damaged parts",
      ],
    },
    "restoration-leather-steering-wheel": {
      title: "Restoration of Genuine Leather Steering Wheels",
      description:
        "🔄 Professional restoration of genuine leather steering wheels. Cleaning, rehydration, repair of worn areas and protection coating for a pleasant touch and like-new finish.",
      items: [
        "Deep cleaning of leather steering wheel",
        "Leather rehydration and conditioning",
        "Repair of worn or cracked areas",
        "Protection coating",
        "Restoration of original appearance and touch",
      ],
    },
    "elimination-odours-interior-disinfection": {
      title: "Elimination of Unpleasant Odours & Interior Disinfection",
      description:
        "🌿 Elimination of unpleasant odours (tobacco, pets, humidity) and full interior disinfection. Ozone treatment or professional products. From €80.",
      items: [
        "Elimination of unpleasant odours (tobacco, pets, humidity)",
        "Full interior disinfection",
        "Ozone treatment or professional products",
        "Air conditioning system cleaning",
        "From €80",
      ],
    },
    "partial-restoration-leather-seats": {
      title: "Partial Restoration of Leather Seats",
      description:
        "🪑 Partial restoration of leather seats: worn areas, cracks, discolouration. Cleaning, repair and colour touch-up. From €100.",
      items: [
        "Restoration of worn or damaged seat areas",
        "Crack and scratch repair",
        "Colour touch-up",
        "Leather conditioning",
        "From €100",
      ],
    },
    "full-restoration-leather-seats": {
      title: "Full Restoration of Leather Seats",
      description:
        "✨ Complete restoration of leather seats: deep cleaning, full damage repair, uniform colour restoration and durable protection. Like new.",
      items: [
        "Complete leather seat restoration",
        "Deep cleaning and conditioning",
        "Full damage repair (cracks, tears, discolouration)",
        "Uniform colour restoration",
        "Durable protection coating",
      ],
    },
    "small-dent-repair": {
      title: "Small Dent (2–3 cm, Easy Access)",
      description:
        "🔨 Quick repair of small dents: 2–3 cm, easy access. Paintless Dent Repair. €30–50, 20–40 min.",
      items: ["2–3 cm dent, easy access", "€30–50", "Quick repair (20–40 min)", "Paintless Dent Repair"],
    },
    "medium-dent-repair": {
      title: "Medium Dent (3–10 cm)",
      description:
        "🔨 Medium dents caused by door impact or vandalism. 3–10 cm, Paintless Dent Repair. €80–150 depending on difficulty.",
      items: ["3–10 cm dent", "€80–150", "Caused by door impact or vandalism", "Paintless Dent Repair"],
    },
    "large-dent-full-door": {
      title: "Large Dent or Full Door",
      description:
        "🔨 Large dent or entire panel (e.g. full door). Difficult access or entire panel. €100–200, approx. €230 per door.",
      items: ["Large dent or full panel", "€100–200", "Difficult access or entire panel", "e.g. €230 per door"],
    },
    "multiple-dents-hail": {
      title: "Multiple Dents (Hail Damage)",
      description:
        "🔨 Multiple dents from hail. Price depends on quantity and surface. €100–1000+, 1–2 days of work.",
      items: ["€100–1000+", "Depends on quantity and surface", "1–2 days of work", "Paintless Dent Repair"],
    },
    "full-car-hail-repair": {
      title: "Full Car Hail Repair",
      description:
        "🔨 Complete repair of hail-damaged vehicles. €500–1500 depending on model and inspection.",
      items: ["€500–1500", "Depending on model and inspection", "Full vehicle hail damage repair", "Paintless Dent Repair"],
    },
    aussenaufbereitung: {
      title: "Exterior detailing",
      description:
        "Let your vehicle shine like new. Thorough hand wash and professional exterior cleaning for a flawless finish.",
      items: [
        "Thorough hand wash",
        "Alloy wheel cleaning",
        "Exterior window cleaning",
        "Tire cleaning and care",
        "Exterior mirror cleaning",
        "Exhaust pipe cleaning",
      ],
    },
    innenaufbereitung: {
      title: "Interior detailing",
      description:
        "Forget dirty seats and sticky dashboards. We deep-clean your vehicle interior.",
      items: [
        "Interior cabin cleaning",
        "Interior window cleaning",
        "Interior care",
        "Floor vacuuming",
        "Floor mat vacuuming",
        "Trunk vacuuming",
        "Dashboard wiping",
        "Door sill wiping",
        "Footwell and pedal cleaning",
      ],
    },
    "zubuchbare-leistungen": {
      title: "Additional services",
      description:
        "Enhance your detail package with our add-on services. From deep cleaning to polishing and sealing.",
      items: [
        "Deep floor mat cleaning",
        "Upholstery deep cleaning",
        "Leather care and cleaning",
        "Single-stage polishing",
        "Multi-stage polishing",
        "Ceramic coating - paint",
        "Wax sealing - paint",
      ],
    },
    keramikversiegelung: {
      title: "Ceramic coating",
      description:
        "Long-lasting protection and brilliant shine. Ceramic coating protects your paint from frost, UV rays, road salt and other environmental factors. Easy cleaning thanks to smooth surface — perfect value retention for your vehicle.",
      items: undefined,
    },
    nanoversiegelung: {
      title: "Nano sealing",
      description:
        "A durable shield against harmful environmental factors like frost, UV radiation, road salt and more. Perfect value retention for your vehicle.",
      items: undefined,
    },
  },
  es: {
    "basic-package": {
      title: "Paquete básico",
      description:
        "💧 Nuestro paquete de entrada para una carrocería limpia y un interior fresco. Lavado a mano profesional, cristales por dentro y por fuera, limpieza ligera del habitáculo y superficies. Ideal para el mantenimiento regular.",
      items: [
        "Lavado a mano profesional de la carrocería",
        "Limpieza de cristales interior y exterior",
        "Limpieza ligera del interior",
        "Sacudir y aspirar las alfombrillas",
        "Limpieza de todas las superficies",
        "Limpieza de ruedas, llantas y pasos de rueda",
        "Limpieza de los marcos de las puertas",
      ],
    },
    "medium-package": {
      title: "Paquete medio",
      description:
        "✨ Incluye todo del Paquete básico más limpieza interior profunda, limpieza exterior detallada (eliminación de insectos y resina), limpieza exhaustiva de llantas y neumáticos, cuidado de elementos de plástico y goma, y pulido ligero profesional de la carrocería.",
      items: [
        "Todo del Paquete básico",
        "Limpieza interior profunda (alfombrillas, asientos, tapicería)",
        "Limpieza exterior más detallada (eliminación de insectos y resina)",
        "Limpieza exhaustiva de llantas y neumáticos",
        "Cuidado de elementos de plástico y goma",
        "Pulido ligero profesional de la carrocería",
      ],
    },
    "luxury-package": {
      title: "Paquete Luxury (Full Detailing)",
      description:
        "🏆 Nuestro paquete premium para detailing completo. Limpieza interior profunda con cuidado de cuero, limpieza química de alfombras y asientos, limpieza del vano motor, lavado a mano profesional eliminando suciedad resistente, pulido profesional 2–3 etapas (eliminación de hologramas y rayas medias), aplicación de revestimiento cerámico de alta calidad.",
      items: [
        "Limpieza interior profunda con cuidado de cuero",
        "Limpieza química de alfombras y asientos",
        "Limpieza del vano motor",
        "Lavado a mano profesional eliminando suciedad resistente",
        "Pulido profesional 2–3 etapas de la carrocería (eliminación de hologramas y rayas medias)",
        "Aplicación de revestimiento cerámico de alta calidad",
      ],
    },
    "headlight-restoration": {
      title: "Restauración de faros",
      description:
        "💡 Restauración profesional de faros amarillentos o opacos. Lijado progresivo, pulido y protección UV para una visibilidad óptima. Desde 35€ por faro.",
      items: [
        "Restauración profesional de faros amarillentos/opacos",
        "Lijado y pulido progresivo",
        "Protección UV",
        "Mejor visibilidad y seguridad",
        "Desde 35€ por faro",
      ],
    },
    "restoration-fabric-alcantara-carpets": {
      title: "Restauración de tejidos, Alcantara y alfombras",
      description:
        "🧵 Restauración y reparación de tejidos, Alcantara y alfombras del habitáculo. Eliminación de marcas de quemadura, reparación de costuras, eliminación de manchas resistentes.",
      items: [
        "Restauración de tejidos y Alcantara",
        "Restauración y limpieza de alfombras",
        "Eliminación de marcas de quemadura",
        "Reparación de costuras",
        "Eliminación de manchas",
      ],
    },
    "restoration-repair-panels": {
      title: "Restauración y reparación de paneles",
      description:
        "🔧 Reparación y restauración de paneles interiores y exteriores. Corrección de rayaduras, retoques de pintura, sustitución o reparación de piezas dañadas.",
      items: [
        "Restauración de paneles interiores",
        "Reparación de paneles exteriores",
        "Corrección de rayaduras",
        "Retoques de pintura",
        "Sustitución o reparación de piezas dañadas",
      ],
    },
    "restoration-leather-steering-wheel": {
      title: "Restauración de volantes de cuero genuino",
      description:
        "🔄 Restauración profesional de volantes de cuero genuino. Limpieza, rehidratación, reparación de zonas desgastadas y protección para recuperar el tacto y el acabado original.",
      items: [
        "Limpieza profunda del volante de cuero",
        "Rehidratación y acondicionamiento del cuero",
        "Reparación de zonas desgastadas o agrietadas",
        "Protección del cuero",
        "Restauración del aspecto y tacto original",
      ],
    },
    "elimination-odours-interior-disinfection": {
      title: "Eliminación de olores & desinfección del interior",
      description:
        "🌿 Eliminación de olores desagradables (tabaco, mascotas, humedad) y desinfección completa del habitáculo. Tratamiento con ozono o productos profesionales. Desde 80€.",
      items: [
        "Eliminación de olores (tabaco, mascotas, humedad)",
        "Desinfección completa del interior",
        "Tratamiento con ozono o productos profesionales",
        "Limpieza del sistema de climatización",
        "Desde 80€",
      ],
    },
    "partial-restoration-leather-seats": {
      title: "Restauración parcial de asientos de cuero",
      description:
        "🪑 Restauración parcial de asientos de cuero: zonas desgastadas, grietas, decoloraciones. Limpieza, reparación y retoque de color. Desde 100€.",
      items: [
        "Restauración de zonas desgastadas o dañadas",
        "Reparación de grietas y rayaduras",
        "Retoque de color",
        "Acondicionamiento del cuero",
        "Desde 100€",
      ],
    },
    "full-restoration-leather-seats": {
      title: "Restauración completa de asientos de cuero",
      description:
        "✨ Restauración completa de asientos de cuero: limpieza profunda, reparación integral de daños, restauración uniforme del color y protección duradera. Como nuevos.",
      items: [
        "Restauración completa de asientos de cuero",
        "Limpieza profunda y acondicionamiento",
        "Reparación integral (grietas, desgarros, decoloración)",
        "Restauración uniforme del color",
        "Protección duradera",
      ],
    },
    "small-dent-repair": {
      title: "Pequeña abolladura (2–3 cm, acceso fácil)",
      description:
        "🔨 Reparación rápida de abolladuras pequeñas: 2–3 cm, acceso fácil. Paintless Dent Repair. 30–50€, 20–40 min.",
      items: ["2–3 cm, acceso fácil", "30–50€", "Reparación rápida (20–40 min)", "Paintless Dent Repair"],
    },
    "medium-dent-repair": {
      title: "Abolladura media (3–10 cm)",
      description:
        "🔨 Abolladuras medias por impacto de puerta o vandalismo. 3–10 cm, Paintless Dent Repair. 80–150€ según dificultad.",
      items: ["3–10 cm", "80–150€", "Impacto de puerta o vandalismo", "Paintless Dent Repair"],
    },
    "large-dent-full-door": {
      title: "Abolladura grande o puerta completa",
      description:
        "🔨 Abolladura grande o panel completo (ej. puerta entera). Acceso difícil o panel completo. 100–200€, aprox. 230€ por puerta.",
      items: ["Abolladura grande o panel completo", "100–200€", "Acceso difícil o panel completo", "ej. 230€ por puerta"],
    },
    "multiple-dents-hail": {
      title: "Múltiples abolladuras (daño por granizo)",
      description:
        "🔨 Múltiples abolladuras por granizo. Precio según cantidad y superficie. 100–1000€+, 1–2 días de trabajo.",
      items: ["100–1000€+", "Según cantidad y superficie", "1–2 días de trabajo", "Paintless Dent Repair"],
    },
    "full-car-hail-repair": {
      title: "Reparación completa por granizo",
      description:
        "🔨 Reparación completa de vehículos dañados por granizo. 500–1500€ según modelo e inspección.",
      items: ["500–1500€", "Según modelo e inspección", "Reparación completa por granizo", "Paintless Dent Repair"],
    },
    aussenaufbereitung: {
      title: "Limpieza exterior",
      description:
        "Deje que su vehículo brille como nuevo. Lavado a mano a fondo y limpieza exterior profesional para un acabado impecable.",
      items: [
        "Lavado a mano a fondo",
        "Limpieza de llantas",
        "Limpieza de ventanas exteriores",
        "Limpieza y cuidado de neumáticos",
        "Limpieza de retrovisores exteriores",
        "Limpieza de tubos de escape",
      ],
    },
    innenaufbereitung: {
      title: "Limpieza interior",
      description:
        "Olvide asientos sucios y salpicaderos pegajosos. Limpieza profunda del habitáculo.",
      items: [
        "Limpieza del habitáculo",
        "Limpieza de ventanas interiores",
        "Cuidado del interior",
        "Aspirado del suelo",
        "Aspirado de alfombrillas",
        "Aspirado del maletero",
        "Limpieza del salpicadero",
        "Limpieza de umbrales",
        "Limpieza de suelo y pedales",
      ],
    },
    "zubuchbare-leistungen": {
      title: "Servicios adicionales",
      description:
        "Complete su paquete de detailing con nuestros servicios extra. Desde limpieza profunda hasta pulido y sellado.",
      items: [
        "Limpieza profunda de alfombrillas",
        "Limpieza profunda de tapicería",
        "Cuidado y limpieza de cuero",
        "Pulido de una etapa",
        "Pulido multietapa",
        "Revestimiento cerámico - pintura",
        "Sellado con cera - pintura",
      ],
    },
    keramikversiegelung: {
      title: "Revestimiento cerámico",
      description:
        "Protección duradera y brillo intenso. El revestimiento cerámico protege la pintura del frío, rayos UV, sal y otros agentes ambientales. Fácil limpieza gracias a la superficie lisa — perfecta conservación del valor de su vehículo.",
      items: undefined,
    },
    nanoversiegelung: {
      title: "Sellado nano",
      description:
        "Un escudo duradero contra agentes ambientales nocivos como frío, radiación UV, sal, etc. Perfecta conservación del valor de su vehículo.",
      items: undefined,
    },
  },
  ru: {
    "basic-package": {
      title: "Базовый пакет",
      description:
        "💧 Наш базовый пакет для чистой кузова и свежего салона. Профессиональная ручная мойка, стёкла внутри и снаружи, лёгкая чистка салона и поверхностей. Идеально для регулярного ухода.",
      items: [
        "Профессиональная ручная мойка кузова",
        "Мойка стёкол внутри и снаружи",
        "Лёгкая чистка салона",
        "Вытряхивание и пылесос ковриков",
        "Чистка всех поверхностей",
        "Чистка колёс, дисков и арок",
        "Протирка дверных рам",
      ],
    },
    "medium-package": {
      title: "Средний пакет",
      description:
        "✨ Включает всё из Базового пакета плюс глубокую чистку салона, более детальную мойку снаружи (удаление насекомых и смолы), тщательную чистку дисков и шин, уход за пластиком и резиной, лёгкую профессиональную полировку кузова.",
      items: [
        "Всё из Базового пакета",
        "Глубокая чистка салона (коврики, сиденья, обивка)",
        "Более детальная наружная мойка (удаление насекомых и смолы)",
        "Тщательная чистка дисков и шин",
        "Уход за пластиковыми и резиновыми элементами",
        "Лёгкая профессиональная полировка кузова",
      ],
    },
    "luxury-package": {
      title: "Luxury пакет (Full Detailing)",
      description:
        "🏆 Наш премиум-пакет для полного detailing. Глубокая чистка салона с уходом за кожей, химическая чистка ковров и сидений, чистка моторного отсека, профессиональная ручная мойка с удалением стойкой грязи, 2–3-этапная полировка (удаление голограмм и средних царапин), нанесение качественной керамики.",
      items: [
        "Глубокая чистка салона с уходом за кожей",
        "Химическая чистка ковров и сидений",
        "Чистка моторного отсека",
        "Профессиональная ручная мойка с удалением стойкой грязи",
        "2–3-этапная профессиональная полировка кузова (удаление голограмм и средних царапин)",
        "Нанесение качественной керамической защиты",
      ],
    },
    "headlight-restoration": {
      title: "Реставрация фар",
      description:
        "💡 Профессиональная реставрация пожелтевших или мутных фар. Поэтапная шлифовка, полировка и UV-защита для оптимальной видимости. От 35€ за фару.",
      items: [
        "Профессиональная реставрация пожелтевших/мутных фар",
        "Поэтапная шлифовка и полировка",
        "UV-защита",
        "Улучшенная видимость и безопасность",
        "От 35€ за фару",
      ],
    },
    "restoration-fabric-alcantara-carpets": {
      title: "Реставрация тканей, Alcantara и ковров",
      description:
        "🧵 Реставрация и ремонт тканей, Alcantara и ковров салона. Удаление следов ожогов, ремонт швов, удаление стойких пятен.",
      items: [
        "Реставрация тканей и Alcantara",
        "Реставрация и чистка ковров",
        "Удаление следов ожогов",
        "Ремонт швов",
        "Удаление пятен",
      ],
    },
    "restoration-repair-panels": {
      title: "Реставрация и ремонт панелей",
      description:
        "🔧 Ремонт и реставрация внутренних и внешних панелей. Исправление царапин, подкраска, замена или ремонт повреждённых деталей.",
      items: [
        "Реставрация внутренних панелей",
        "Ремонт наружных панелей",
        "Исправление царапин",
        "Подкраска",
        "Замена или ремонт повреждённых деталей",
      ],
    },
    "restoration-leather-steering-wheel": {
      title: "Реставрация рулевых колёс из кожи",
      description:
        "🔄 Профессиональная реставрация рулевых колёс из натуральной кожи. Чистка, увлажнение, ремонт изношенных участков и защитное покрытие для приятного ощущения и нового вида.",
      items: [
        "Глубокая чистка кожаного руля",
        "Увлажнение и уход за кожей",
        "Ремонт изношенных или потрескавшихся участков",
        "Защитное покрытие",
        "Восстановление вида и ощущения",
      ],
    },
    "elimination-odours-interior-disinfection": {
      title: "Устранение запахов и дезинфекция салона",
      description:
        "🌿 Устранение неприятных запахов (табак, животные, влажность) и полная дезинфекция салона. Озонирование или профессиональные средства. От 80€.",
      items: [
        "Устранение неприятных запахов (табак, животные, влажность)",
        "Полная дезинфекция салона",
        "Озонирование или профессиональные средства",
        "Чистка системы кондиционера",
        "От 80€",
      ],
    },
    "partial-restoration-leather-seats": {
      title: "Частичная реставрация кожаных сидений",
      description:
        "🪑 Частичная реставрация кожаных сидений: изношенные участки, трещины, изменение цвета. Чистка, ремонт и подкраска. От 100€.",
      items: [
        "Реставрация изношенных или повреждённых участков",
        "Ремонт трещин и царапин",
        "Подкраска",
        "Уход за кожей",
        "От 100€",
      ],
    },
    "full-restoration-leather-seats": {
      title: "Полная реставрация кожаных сидений",
      description:
        "✨ Полная реставрация кожаных сидений: глубокая чистка, полный ремонт повреждений, единообразная подкраска и долговечная защита. Как новые.",
      items: [
        "Полная реставрация кожаных сидений",
        "Глубокая чистка и уход",
        "Полный ремонт (трещины, разрывы, изменение цвета)",
        "Восстановление однородного цвета",
        "Долговечная защита",
      ],
    },
    "small-dent-repair": {
      title: "Небольшая вмятина (2–3 см, лёгкий доступ)",
      description:
        "🔨 Быстрый ремонт небольших вмятин: 2–3 см, лёгкий доступ. Paintless Dent Repair (без покраски). 30–50€, 20–40 мин.",
      items: ["2–3 см, лёгкий доступ", "30–50€", "Быстрый ремонт (20–40 мин)", "Paintless Dent Repair"],
    },
    "medium-dent-repair": {
      title: "Средняя вмятина (3–10 см)",
      description:
        "🔨 Средние вмятины от удара двери или вандализма. 3–10 см, Paintless Dent Repair. 80–150€ в зависимости от сложности.",
      items: ["3–10 см", "80–150€", "Удар двери или вандализм", "Paintless Dent Repair"],
    },
    "large-dent-full-door": {
      title: "Большая вмятина или вся дверь",
      description:
        "🔨 Большая вмятина или вся панель (напр. вся дверь). Трудный доступ или вся панель. 100–200€, ок. 230€ за дверь.",
      items: ["Большая вмятина или вся панель", "100–200€", "Трудный доступ или вся панель", "напр. 230€ за дверь"],
    },
    "multiple-dents-hail": {
      title: "Множественные вмятины (град)",
      description:
        "🔨 Множественные вмятины от града. Цена зависит от количества и площади. 100–1000€+, 1–2 дня работы.",
      items: ["100–1000€+", "В зависимости от количества и площади", "1–2 дня работы", "Paintless Dent Repair"],
    },
    "full-car-hail-repair": {
      title: "Полный ремонт после града",
      description:
        "🔨 Полная реставрация автомобилей, повреждённых градом. 500–1500€ в зависимости от модели и осмотра.",
      items: ["500–1500€", "В зависимости от модели и осмотра", "Полный ремонт после града", "Paintless Dent Repair"],
    },
    aussenaufbereitung: {
      title: "Внешняя химчистка",
      description:
        "Верните автомобилю новый блеск. Тщательная ручная мойка и профессиональная наружная чистка для безупречного вида.",
      items: [
        "Тщательная ручная мойка",
        "Чистка дисков",
        "Мойка наружных стёкол",
        "Чистка и уход за шинами",
        "Чистка наружных зеркал",
        "Чистка выхлопных труб",
      ],
    },
    innenaufbereitung: {
      title: "Внутренняя химчистка",
      description:
        "Забудьте о грязных сиденьях и липкой панели. Глубокая чистка салона.",
      items: [
        "Чистка салона",
        "Мойка внутренних стёкол",
        "Уход за интерьером",
        "Пылесос пола",
        "Пылесос ковриков",
        "Пылесос багажника",
        "Протирка панели приборов",
        "Чистка порогов",
        "Чистка пола и педалей",
      ],
    },
    "zubuchbare-leistungen": {
      title: "Дополнительные услуги",
      description:
        "Дополните пакет услуг нашими опциями. От глубокой чистки до полировки и защиты.",
      items: [
        "Глубокая чистка ковриков",
        "Глубокая чистка обивки",
        "Уход и чистка кожи",
        "Одноэтапная полировка",
        "Многоэтапная полировка",
        "Керамическое покрытие — лак",
        "Восковая защита — лак",
      ],
    },
    keramikversiegelung: {
      title: "Керамическое покрытие",
      description:
        "Долговременная защита и насыщенный блеск. Керамика защищает лак от мороза, УФ-излучения, соли и других факторов. Лёгкая мойка благодаря гладкой поверхности — отличное сохранение стоимости автомобиля.",
      items: undefined,
    },
    nanoversiegelung: {
      title: "Нано-защита",
      description:
        "Долговечный щит от вредных факторов: мороз, УФ, соль и др. Отличное сохранение стоимости вашего автомобиля.",
      items: undefined,
    },
  },
};

interface FaqItem {
  question: string;
  answer: string;
}

const faqTranslations: Record<
  AutoaufbereitungLocale,
  Record<string, FaqItem[]>
> = {
  de: {
    "basic-package": [
      {
        question: "Wie lange dauert das Basic Package?",
        answer:
          "Je nach Fahrzeuggröße und Zustand etwa 1,5 bis 2 Stunden. Wir informieren Sie gerne bei der Buchung.",
      },
      {
        question: "Was ist im Basic Package enthalten?",
        answer:
          "Handwäsche, Innen- und Außenscheiben, leichte Innenraumreinigung, Fußmatten saugen, Reinigung aller Oberflächen, Räder und Radkästen sowie Türrahmen.",
      },
      {
        question: "Ist das Basic Package für alle Fahrzeuggrößen geeignet?",
        answer:
          "Ja, das Basic Package eignet sich für PKW aller Größen. Bei SUV oder Transportern können wir den Preis bei Bedarf anpassen.",
      },
      {
        question: "Wie werden die Preise berechnet?",
        answer:
          "💬 Die Preise variieren je nach Fahrzeuggröße, Lackzustand und Verschmutzungsgrad des Innenraums.",
      },
    ],
    "medium-package": [
      {
        question: "Wie lange dauert das Medium Package?",
        answer:
          "Je nach Fahrzeuggröße etwa 2,5 bis 4 Stunden, da Tiefenreinigung und Politur mehr Zeit erfordern.",
      },
      {
        question: "Was ist der Unterschied zum Basic Package?",
        answer:
          "Das Medium Package enthält alles vom Basic Package plus Tiefeninnenreinigung, detaillierte Außenreinigung (Insekten, Harz), gründliche Felgen- und Reifenreinigung, Pflege von Kunststoff und Gummi sowie leichte Politur der Karosserie.",
      },
      {
        question: "Wann ist das Medium Package sinnvoll?",
        answer:
          "Ideal nach längeren Fahrten, vor Verkauf oder bei stärkerer Verschmutzung. Empfohlen alle 3–6 Monate für optimalen Werterhalt.",
      },
      {
        question: "Wie werden die Preise berechnet?",
        answer:
          "💬 Die Preise variieren je nach Fahrzeuggröße, Lackzustand und Verschmutzungsgrad des Innenraums.",
      },
    ],
    "luxury-package": [
      {
        question: "Wie lange dauert das Luxury Package?",
        answer:
          "Je nach Fahrzeuggröße etwa 1–2 Tage, da Politur und Keramikversiegelung Trockenzeit und mehr Arbeit erfordern.",
      },
      {
        question: "Was unterscheidet das Luxury Package vom Medium Package?",
        answer:
          "Das Luxury Package ist Full Detailing: Tiefeninnenreinigung mit Lederpflege, chemische Teppich- und Sitzreinigung, Motorraumreinigung, 2–3-stufige Politur und hochwertige Keramikversiegelung.",
      },
      {
        question: "Wie lange hält die Keramikversiegelung?",
        answer:
          "Bei richtiger Pflege 2–5 Jahre. Wir beraten Sie gerne zur optimalen Nachsorge.",
      },
      {
        question: "Wie werden die Preise berechnet?",
        answer:
          "💬 Die Preise variieren je nach Fahrzeuggröße, Lackzustand und Verschmutzungsgrad des Innenraums.",
      },
    ],
    "headlight-restoration": [
      {
        question: "Wie lange dauert die Scheinwerfer-Restauration?",
        answer:
          "Pro Scheinwerfer etwa 1–1,5 Stunden. Bei stark vergilbten oder verkratzten Scheinwerfern kann es länger dauern.",
      },
      {
        question: "Wie lange hält die Restauration?",
        answer:
          "Mit UV-Schutzversiegelung 1–2 Jahre. Ohne Versiegelung empfehlen wir eine jährliche Nachbehandlung.",
      },
      {
        question: "Ab welchem Preis?",
        answer:
          "💡 Ab 35€ pro Scheinwerfer, je nach Zustand und Fahrzeugmodell.",
      },
      {
        question: "Wie werden die Preise berechnet?",
        answer:
          "💬 Die Preise variieren je nach Fahrzeuggröße, Lackzustand und Verschmutzungsgrad des Innenraums.",
      },
    ],
    "restoration-fabric-alcantara-carpets": [
      {
        question: "Können Brandflecken entfernt werden?",
        answer:
          "Ja, wir entfernen Brandflecken und reparieren gerissene Nähte. Der Erfolg hängt vom Zustand des Materials ab.",
      },
      {
        question: "Welche Stoffe behandeln Sie?",
        answer:
          "Stoff, Alcantara, Velours und Teppiche. Wir beraten Sie gerne zu den Möglichkeiten bei Ihrem Fahrzeug.",
      },
      {
        question: "Wie werden die Preise berechnet?",
        answer:
          "💬 Die Preise variieren je nach Fahrzeuggröße, Lackzustand und Verschmutzungsgrad des Innenraums.",
      },
    ],
    "restoration-repair-panels": [
      {
        question: "Welche Paneele können repariert werden?",
        answer:
          "Innen- und Außenpanele: Türverkleidungen, Armaturen, Kotflügel, Stoßstangen usw. Kratzerkorrektur und Lackretusche.",
      },
      {
        question: "Wann ist eine Ersatzteil notwendig?",
        answer:
          "Bei starken Beschädigungen oder wenn eine Reparatur nicht wirtschaftlich ist. Wir beraten Sie gerne vor Ort.",
      },
      {
        question: "Wie werden die Preise berechnet?",
        answer:
          "💬 Die Preise variieren je nach Fahrzeuggröße, Lackzustand und Verschmutzungsgrad des Innenraums.",
      },
    ],
    "restoration-leather-steering-wheel": [
      {
        question: "Wie lange dauert die Lenkrad-Restauration?",
        answer:
          "Etwa 2–3 Stunden je nach Zustand. Stark abgenutzte Lenkräder können mehr Zeit erfordern.",
      },
      {
        question: "Wie lange hält die Restauration?",
        answer:
          "Bei regelmäßiger Pflege 1–2 Jahre. Wir beraten Sie zur optimalen Lederpflege.",
      },
      {
        question: "Wie werden die Preise berechnet?",
        answer:
          "💬 Die Preise variieren je nach Fahrzeuggröße, Lackzustand und Verschmutzungsgrad des Innenraums.",
      },
    ],
    "elimination-odours-interior-disinfection": [
      {
        question: "Welche Gerüche können beseitigt werden?",
        answer:
          "Tabak, Tiergeruch, Feuchtigkeit, Schimmel, Essensgeruch u.a. Ozontherapie oder professionelle Produkte je nach Situation.",
      },
      {
        question: "Ab welchem Preis?",
        answer:
          "🌿 Ab 80€, je nach Geruchsart und Fahrzeuggröße.",
      },
      {
        question: "Wie werden die Preise berechnet?",
        answer:
          "💬 Die Preise variieren je nach Fahrzeuggröße, Lackzustand und Verschmutzungsgrad des Innenraums.",
      },
    ],
    "partial-restoration-leather-seats": [
      {
        question: "Wann ist eine Teilrestauration sinnvoll?",
        answer:
          "Bei lokalen Schäden (abgenutzte Kanten, Risse, Verfärbungen) ohne die komplette Sitzfläche zu betreffen.",
      },
      {
        question: "Ab welchem Preis?",
        answer:
          "🪑 Ab 100€ pro Sitz, je nach Schadensumfang.",
      },
      {
        question: "Wie werden die Preise berechnet?",
        answer:
          "💬 Die Preise variieren je nach Fahrzeuggröße, Lackzustand und Verschmutzungsgrad des Innenraums.",
      },
    ],
    "full-restoration-leather-seats": [
      {
        question: "Wann ist eine Vollrestauration sinnvoll?",
        answer:
          "Bei stark abgenutzten oder flächig beschädigten Lederpolstern. Wiederherstellung wie neu.",
      },
      {
        question: "Wie lange dauert die Vollrestauration?",
        answer:
          "Je nach Anzahl der Sitze etwa 1–2 Tage. Wir geben Ihnen eine Schätzung bei der Besichtigung.",
      },
      {
        question: "Wie werden die Preise berechnet?",
        answer:
          "💬 Die Preise variieren je nach Fahrzeuggröße, Lackzustand und Verschmutzungsgrad des Innenraums.",
      },
    ],
    "small-dent-repair": [
      {
        question: "Was ist Paintless Dent Repair?",
        answer:
          "Reparatur ohne Lackierung — die Beule wird von innen oder außen massiert. Schnell, günstig und ohne Lackschäden.",
      },
      {
        question: "Wie schnell geht die Reparatur?",
        answer:
          "20–40 Minuten bei kleinen Beulen. 30–50€ je nach Zugang.",
      },
      {
        question: "Wie werden die Preise berechnet?",
        answer:
          "💬 Die Preise variieren je nach Fahrzeuggröße, Lackzustand und Verschmutzungsgrad des Innenraums.",
      },
    ],
    "medium-dent-repair": [
      {
        question: "Wann entstehen mittlere Beulen?",
        answer:
          "Durch Türschlag (Parkplatz), Vandalismus oder leichte Unfälle. 3–10 cm, 80–150€.",
      },
      {
        question: "Wie werden die Preise berechnet?",
        answer:
          "💬 Die Preise variieren je nach Fahrzeuggröße, Lackzustand und Verschmutzungsgrad des Innenraums.",
      },
    ],
    "large-dent-full-door": [
      {
        question: "Wie viel kostet eine komplette Tür?",
        answer:
          "Ca. 230€ pro Tür je nach Modell. Schwerer Zugang oder ganzes Paneel: 100–200€.",
      },
      {
        question: "Wie werden die Preise berechnet?",
        answer:
          "💬 Die Preise variieren je nach Fahrzeuggröße, Lackzustand und Verschmutzungsgrad des Innenraums.",
      },
    ],
    "multiple-dents-hail": [
      {
        question: "Wie lange dauert die Hagelreparatur?",
        answer:
          "1–2 Tage je nach Anzahl und Fläche. 100–1000€+ je nach Schadensumfang.",
      },
      {
        question: "Wie werden die Preise berechnet?",
        answer:
          "💬 Die Preise variieren je nach Fahrzeuggröße, Lackzustand und Verschmutzungsgrad des Innenraums.",
      },
    ],
    "full-car-hail-repair": [
      {
        question: "Wie viel kostet eine komplette Hagelreparatur?",
        answer:
          "500–1500€ je nach Modell und Inspektion. Wir erstellen Ihnen gerne ein Angebot.",
      },
      {
        question: "Wie werden die Preise berechnet?",
        answer:
          "💬 Die Preise variieren je nach Fahrzeuggröße, Lackzustand und Verschmutzungsgrad des Innenraums.",
      },
    ],
  },
  en: {
    "basic-package": [
      {
        question: "How long does the Basic Package take?",
        answer:
          "Depending on vehicle size and condition, about 1.5 to 2 hours. We'll be happy to give you an estimate when booking.",
      },
      {
        question: "What's included in the Basic Package?",
        answer:
          "Hand wash, inside and outside windows, light interior cleaning, vacuuming floor mats, cleaning all surfaces, wheels and wheel arches, and door frame wiping.",
      },
      {
        question: "Is the Basic Package suitable for all vehicle sizes?",
        answer:
          "Yes, the Basic Package suits all car sizes. For SUVs or vans, we can adjust the price if needed.",
      },
      {
        question: "How are prices calculated?",
        answer:
          "💬 Prices vary depending on the size of the vehicle, the condition of the paint, and the level of interior dirt.",
      },
    ],
    "medium-package": [
      {
        question: "How long does the Medium Package take?",
        answer:
          "Depending on vehicle size, about 2.5 to 4 hours, as deep cleaning and polishing require more time.",
      },
      {
        question: "What's the difference from the Basic Package?",
        answer:
          "The Medium Package includes everything from Basic plus deep interior cleaning, detailed exterior (insects, resin), thorough rims and tires, plastic and rubber care, and light bodywork polishing.",
      },
      {
        question: "When is the Medium Package recommended?",
        answer:
          "Ideal after long trips, before selling, or for heavier soiling. Recommended every 3–6 months for best value retention.",
      },
      {
        question: "How are prices calculated?",
        answer:
          "💬 Prices vary depending on the size of the vehicle, the condition of the paint, and the level of interior dirt.",
      },
    ],
    "luxury-package": [
      {
        question: "How long does the Luxury Package take?",
        answer:
          "Depending on vehicle size, about 1–2 days, as polishing and ceramic coating require curing time and more work.",
      },
      {
        question: "What's the difference from the Medium Package?",
        answer:
          "The Luxury Package is full detailing: deep interior with leather care, chemical carpet and seat cleaning, engine bay cleaning, 2–3 stage polishing, and high-quality ceramic coating.",
      },
      {
        question: "How long does the ceramic coating last?",
        answer:
          "With proper care, 2–5 years. We'll advise you on optimal maintenance.",
      },
      {
        question: "How are prices calculated?",
        answer:
          "💬 Prices vary depending on the size of the vehicle, the condition of the paint, and the level of interior dirt.",
      },
    ],
    "headlight-restoration": [
      {
        question: "How long does headlight restoration take?",
        answer:
          "About 1–1.5 hours per headlight. Severely yellowed or scratched headlights may take longer.",
      },
      {
        question: "How long does the restoration last?",
        answer:
          "With UV protection coating, 1–2 years. Without coating, we recommend annual follow-up treatment.",
      },
      {
        question: "What's the starting price?",
        answer:
          "💡 From €35 per headlight, depending on condition and vehicle model.",
      },
      {
        question: "How are prices calculated?",
        answer:
          "💬 Prices vary depending on the size of the vehicle, the condition of the paint, and the level of interior dirt.",
      },
    ],
    "restoration-fabric-alcantara-carpets": [
      {
        question: "Can burn marks be removed?",
        answer:
          "Yes, we remove burn marks and repair torn seams. Success depends on the condition of the material.",
      },
      {
        question: "Which fabrics do you treat?",
        answer:
          "Fabric, Alcantara, velour and carpets. We'll be happy to advise on options for your vehicle.",
      },
      {
        question: "How are prices calculated?",
        answer:
          "💬 Prices vary depending on the size of the vehicle, the condition of the paint, and the level of interior dirt.",
      },
    ],
    "restoration-repair-panels": [
      {
        question: "Which panels can be repaired?",
        answer:
          "Interior and exterior panels: door cards, dashboards, fenders, bumpers, etc. Scratch correction and paint touch-ups.",
      },
      {
        question: "When is part replacement necessary?",
        answer:
          "For severe damage or when repair is not cost-effective. We'll advise you on site.",
      },
      {
        question: "How are prices calculated?",
        answer:
          "💬 Prices vary depending on the size of the vehicle, the condition of the paint, and the level of interior dirt.",
      },
    ],
    "restoration-leather-steering-wheel": [
      {
        question: "How long does steering wheel restoration take?",
        answer:
          "About 2–3 hours depending on condition. Heavily worn steering wheels may require more time.",
      },
      {
        question: "How long does the restoration last?",
        answer:
          "With regular care, 1–2 years. We'll advise you on optimal leather care.",
      },
      {
        question: "How are prices calculated?",
        answer:
          "💬 Prices vary depending on the size of the vehicle, the condition of the paint, and the level of interior dirt.",
      },
    ],
    "elimination-odours-interior-disinfection": [
      {
        question: "Which odours can be eliminated?",
        answer:
          "Tobacco, pet odour, humidity, mould, food odour, etc. Ozone treatment or professional products depending on the situation.",
      },
      {
        question: "What's the starting price?",
        answer:
          "🌿 From €80, depending on odour type and vehicle size.",
      },
      {
        question: "How are prices calculated?",
        answer:
          "💬 Prices vary depending on the size of the vehicle, the condition of the paint, and the level of interior dirt.",
      },
    ],
    "partial-restoration-leather-seats": [
      {
        question: "When is partial restoration recommended?",
        answer:
          "For localised damage (worn edges, cracks, discolouration) without affecting the entire seat surface.",
      },
      {
        question: "What's the starting price?",
        answer:
          "🪑 From €100 per seat, depending on extent of damage.",
      },
      {
        question: "How are prices calculated?",
        answer:
          "💬 Prices vary depending on the size of the vehicle, the condition of the paint, and the level of interior dirt.",
      },
    ],
    "full-restoration-leather-seats": [
      {
        question: "When is full restoration recommended?",
        answer:
          "For heavily worn or extensively damaged leather seats. Restored to like-new condition.",
      },
      {
        question: "How long does full restoration take?",
        answer:
          "About 1–2 days depending on number of seats. We'll give you an estimate on inspection.",
      },
      {
        question: "How are prices calculated?",
        answer:
          "💬 Prices vary depending on the size of the vehicle, the condition of the paint, and the level of interior dirt.",
      },
    ],
    "small-dent-repair": [
      {
        question: "What is Paintless Dent Repair?",
        answer:
          "Repair without painting — the dent is massaged from inside or outside. Quick, affordable and no paint damage.",
      },
      {
        question: "How quick is the repair?",
        answer:
          "20–40 minutes for small dents. €30–50 depending on access.",
      },
      {
        question: "How are prices calculated?",
        answer:
          "💬 Prices vary depending on the size of the vehicle, the condition of the paint, and the level of interior dirt.",
      },
    ],
    "medium-dent-repair": [
      {
        question: "When do medium dents occur?",
        answer:
          "From door impact (parking), vandalism or minor accidents. 3–10 cm, €80–150.",
      },
      {
        question: "How are prices calculated?",
        answer:
          "💬 Prices vary depending on the size of the vehicle, the condition of the paint, and the level of interior dirt.",
      },
    ],
    "large-dent-full-door": [
      {
        question: "How much for a full door?",
        answer:
          "Approx. €230 per door depending on model. Difficult access or entire panel: €100–200.",
      },
      {
        question: "How are prices calculated?",
        answer:
          "💬 Prices vary depending on the size of the vehicle, the condition of the paint, and the level of interior dirt.",
      },
    ],
    "multiple-dents-hail": [
      {
        question: "How long does hail repair take?",
        answer:
          "1–2 days depending on quantity and surface. €100–1000+ depending on extent of damage.",
      },
      {
        question: "How are prices calculated?",
        answer:
          "💬 Prices vary depending on the size of the vehicle, the condition of the paint, and the level of interior dirt.",
      },
    ],
    "full-car-hail-repair": [
      {
        question: "How much does full hail repair cost?",
        answer:
          "€500–1500 depending on model and inspection. We'll be happy to provide a quote.",
      },
      {
        question: "How are prices calculated?",
        answer:
          "💬 Prices vary depending on the size of the vehicle, the condition of the paint, and the level of interior dirt.",
      },
    ],
  },
  es: {
    "basic-package": [
      {
        question: "¿Cuánto dura el Paquete básico?",
        answer:
          "Según el tamaño y estado del vehículo, aproximadamente 1,5 a 2 horas. Le daremos una estimación al reservar.",
      },
      {
        question: "¿Qué incluye el Paquete básico?",
        answer:
          "Lavado a mano, cristales interior y exterior, limpieza ligera del interior, aspirado de alfombrillas, limpieza de superficies, ruedas y arcos, y limpieza de marcos de puertas.",
      },
      {
        question: "¿Es adecuado para todos los tamaños de vehículo?",
        answer:
          "Sí, el Paquete básico es adecuado para turismos de todos los tamaños. Para SUV o furgonetas podemos ajustar el precio si es necesario.",
      },
      {
        question: "¿Cómo se calculan los precios?",
        answer:
          "💬 Los precios varían según el tamaño del vehículo, el estado de la pintura y el nivel de suciedad del interior.",
      },
    ],
    "medium-package": [
      {
        question: "¿Cuánto dura el Paquete medio?",
        answer:
          "Según el tamaño del vehículo, unas 2,5 a 4 horas, ya que la limpieza profunda y el pulido requieren más tiempo.",
      },
      {
        question: "¿Cuál es la diferencia con el Paquete básico?",
        answer:
          "El Paquete medio incluye todo del básico más limpieza interior profunda, exterior detallado (insectos, resina), limpieza exhaustiva de llantas y neumáticos, cuidado de plástico y goma, y pulido ligero de la carrocería.",
      },
      {
        question: "¿Cuándo es recomendable el Paquete medio?",
        answer:
          "Ideal tras viajes largos, antes de vender o con suciedad más intensa. Recomendado cada 3–6 meses para óptima conservación del valor.",
      },
      {
        question: "¿Cómo se calculan los precios?",
        answer:
          "💬 Los precios varían según el tamaño del vehículo, el estado de la pintura y el nivel de suciedad del interior.",
      },
    ],
    "luxury-package": [
      {
        question: "¿Cuánto dura el Paquete Luxury?",
        answer:
          "Según el tamaño del vehículo, unas 1–2 jornadas, ya que el pulido y la cerámica requieren tiempo de secado y más trabajo.",
      },
      {
        question: "¿Cuál es la diferencia con el Paquete medio?",
        answer:
          "El Paquete Luxury es full detailing: limpieza interior profunda con cuidado de cuero, limpieza química de alfombras y asientos, vano motor, pulido 2–3 etapas y revestimiento cerámico de alta calidad.",
      },
      {
        question: "¿Cuánto dura la cerámica?",
        answer:
          "Con el cuidado adecuado, 2–5 años. Le asesoramos sobre el mantenimiento óptimo.",
      },
      {
        question: "¿Cómo se calculan los precios?",
        answer:
          "💬 Los precios varían según el tamaño del vehículo, el estado de la pintura y el nivel de suciedad del interior.",
      },
    ],
    "headlight-restoration": [
      {
        question: "¿Cuánto dura la restauración de faros?",
        answer:
          "Aproximadamente 1–1,5 horas por faro. Faros muy amarillentos o rayados pueden tardar más.",
      },
      {
        question: "¿Cuánto dura la restauración?",
        answer:
          "Con protección UV, 1–2 años. Sin protección, recomendamos un tratamiento anual.",
      },
      {
        question: "¿Desde qué precio?",
        answer:
          "💡 Desde 35€ por faro, según estado y modelo del vehículo.",
      },
      {
        question: "¿Cómo se calculan los precios?",
        answer:
          "💬 Los precios varían según el tamaño del vehículo, el estado de la pintura y el nivel de suciedad del interior.",
      },
    ],
    "restoration-fabric-alcantara-carpets": [
      {
        question: "¿Se pueden eliminar las marcas de quemadura?",
        answer:
          "Sí, eliminamos marcas de quemadura y reparamos costuras rotas. El éxito depende del estado del material.",
      },
      {
        question: "¿Qué tejidos tratan?",
        answer:
          "Tela, Alcantara, felpa y alfombras. Le asesoramos sobre las opciones para su vehículo.",
      },
      {
        question: "¿Cómo se calculan los precios?",
        answer:
          "💬 Los precios varían según el tamaño del vehículo, el estado de la pintura y el nivel de suciedad del interior.",
      },
    ],
    "restoration-repair-panels": [
      {
        question: "¿Qué paneles se pueden reparar?",
        answer:
          "Paneles interiores y exteriores: revestimientos de puertas, salpicaderos, aletas, parachoques, etc. Corrección de rayaduras y retoques de pintura.",
      },
      {
        question: "¿Cuándo es necesario sustituir piezas?",
        answer:
          "En caso de daños graves o cuando la reparación no es rentable. Le asesoramos en el lugar.",
      },
      {
        question: "¿Cómo se calculan los precios?",
        answer:
          "💬 Los precios varían según el tamaño del vehículo, el estado de la pintura y el nivel de suciedad del interior.",
      },
    ],
    "restoration-leather-steering-wheel": [
      {
        question: "¿Cuánto dura la restauración del volante?",
        answer:
          "Aproximadamente 2–3 horas según el estado. Volantes muy desgastados pueden tardar más.",
      },
      {
        question: "¿Cuánto dura la restauración?",
        answer:
          "Con cuidado regular, 1–2 años. Le asesoramos sobre el cuidado óptimo del cuero.",
      },
      {
        question: "¿Cómo se calculan los precios?",
        answer:
          "💬 Los precios varían según el tamaño del vehículo, el estado de la pintura y el nivel de suciedad del interior.",
      },
    ],
    "elimination-odours-interior-disinfection": [
      {
        question: "¿Qué olores se pueden eliminar?",
        answer:
          "Tabaco, mascotas, humedad, moho, olores de comida, etc. Ozono o productos profesionales según la situación.",
      },
      {
        question: "¿Desde qué precio?",
        answer:
          "🌿 Desde 80€, según tipo de olor y tamaño del vehículo.",
      },
      {
        question: "¿Cómo se calculan los precios?",
        answer:
          "💬 Los precios varían según el tamaño del vehículo, el estado de la pintura y el nivel de suciedad del interior.",
      },
    ],
    "partial-restoration-leather-seats": [
      {
        question: "¿Cuándo es recomendable la restauración parcial?",
        answer:
          "Con daños localizados (bordes desgastados, grietas, decoloración) sin afectar toda la superficie del asiento.",
      },
      {
        question: "¿Desde qué precio?",
        answer:
          "🪑 Desde 100€ por asiento, según el alcance del daño.",
      },
      {
        question: "¿Cómo se calculan los precios?",
        answer:
          "💬 Los precios varían según el tamaño del vehículo, el estado de la pintura y el nivel de suciedad del interior.",
      },
    ],
    "full-restoration-leather-seats": [
      {
        question: "¿Cuándo es recomendable la restauración completa?",
        answer:
          "Con asientos muy desgastados o extensamente dañados. Restaurados como nuevos.",
      },
      {
        question: "¿Cuánto dura la restauración completa?",
        answer:
          "Según el número de asientos, aproximadamente 1–2 días. Le daremos un presupuesto tras la inspección.",
      },
      {
        question: "¿Cómo se calculan los precios?",
        answer:
          "💬 Los precios varían según el tamaño del vehículo, el estado de la pintura y el nivel de suciedad del interior.",
      },
    ],
    "small-dent-repair": [
      {
        question: "¿Qué es Paintless Dent Repair?",
        answer:
          "Reparación sin pintar: la abolladura se corrige por dentro o fuera. Rápido, económico y sin dañar la pintura.",
      },
      {
        question: "¿Cuánto tarda la reparación?",
        answer:
          "20–40 minutos para abolladuras pequeñas. 30–50€ según el acceso.",
      },
      {
        question: "¿Cómo se calculan los precios?",
        answer:
          "💬 Los precios varían según el tamaño del vehículo, el estado de la pintura y el nivel de suciedad del interior.",
      },
    ],
    "medium-dent-repair": [
      {
        question: "¿Cuándo ocurren abolladuras medianas?",
        answer:
          "Por impacto de puerta (aparcamiento), vandalismo o pequeños accidentes. 3–10 cm, 80–150€.",
      },
      {
        question: "¿Cómo se calculan los precios?",
        answer:
          "💬 Los precios varían según el tamaño del vehículo, el estado de la pintura y el nivel de suciedad del interior.",
      },
    ],
    "large-dent-full-door": [
      {
        question: "¿Cuánto cuesta una puerta completa?",
        answer:
          "Aprox. 230€ por puerta según modelo. Acceso difícil o panel completo: 100–200€.",
      },
      {
        question: "¿Cómo se calculan los precios?",
        answer:
          "💬 Los precios varían según el tamaño del vehículo, el estado de la pintura y el nivel de suciedad del interior.",
      },
    ],
    "multiple-dents-hail": [
      {
        question: "¿Cuánto tarda la reparación por granizo?",
        answer:
          "1–2 días según cantidad y superficie. 100–1000€+ según el alcance del daño.",
      },
      {
        question: "¿Cómo se calculan los precios?",
        answer:
          "💬 Los precios varían según el tamaño del vehículo, el estado de la pintura y el nivel de suciedad del interior.",
      },
    ],
    "full-car-hail-repair": [
      {
        question: "¿Cuánto cuesta la reparación completa por granizo?",
        answer:
          "500–1500€ según modelo e inspección. Le haremos un presupuesto sin compromiso.",
      },
      {
        question: "¿Cómo se calculan los precios?",
        answer:
          "💬 Los precios varían según el tamaño del vehículo, el estado de la pintura y el nivel de suciedad del interior.",
      },
    ],
  },
  ru: {
    "basic-package": [
      {
        question: "Сколько времени занимает Базовый пакет?",
        answer:
          "В зависимости от размера и состояния автомобиля примерно 1,5–2 часа. При бронировании мы сообщим вам оценку.",
      },
      {
        question: "Что входит в Базовый пакет?",
        answer:
          "Ручная мойка, стёкла внутри и снаружи, лёгкая чистка салона, пылесос ковриков, чистка всех поверхностей, колёс и арок, протирка дверных рам.",
      },
      {
        question: "Подходит ли пакет для любых размеров автомобиля?",
        answer:
          "Да, Базовый пакет подходит для легковых автомобилей всех размеров. Для SUV или фургонов можем скорректировать цену.",
      },
      {
        question: "Как рассчитываются цены?",
        answer:
          "💬 Цены зависят от размера автомобиля, состояния лакокрасочного покрытия и степени загрязнения салона.",
      },
    ],
    "medium-package": [
      {
        question: "Сколько времени занимает Средний пакет?",
        answer:
          "В зависимости от размера автомобиля примерно 2,5–4 часа, так как глубокая чистка и полировка требуют больше времени.",
      },
      {
        question: "Чем отличается от Базового пакета?",
        answer:
          "Средний пакет включает всё из Базового плюс глубокую чистку салона, детальную наружную мойку (насекомые, смола), тщательную чистку дисков и шин, уход за пластиком и резиной, лёгкую полировку кузова.",
      },
      {
        question: "Когда рекомендуется Средний пакет?",
        answer:
          "Идеально после длительных поездок, перед продажей или при сильном загрязнении. Рекомендуется каждые 3–6 месяцев для сохранения стоимости.",
      },
      {
        question: "Как рассчитываются цены?",
        answer:
          "💬 Цены зависят от размера автомобиля, состояния лакокрасочного покрытия и степени загрязнения салона.",
      },
    ],
    "luxury-package": [
      {
        question: "Сколько времени занимает Luxury пакет?",
        answer:
          "В зависимости от размера автомобиля примерно 1–2 дня, так как полировка и керамика требуют времени высыхания и больше работы.",
      },
      {
        question: "Чем отличается от Среднего пакета?",
        answer:
          "Luxury пакет — это полный detailing: глубокая чистка салона с уходом за кожей, химическая чистка ковров и сидений, моторный отсек, 2–3-этапная полировка и качественная керамическая защита.",
      },
      {
        question: "Сколько держится керамика?",
        answer:
          "При правильном уходе 2–5 лет. Подберём оптимальный уход за покрытием.",
      },
      {
        question: "Как рассчитываются цены?",
        answer:
          "💬 Цены зависят от размера автомобиля, состояния лакокрасочного покрытия и степени загрязнения салона.",
      },
    ],
    "headlight-restoration": [
      {
        question: "Сколько времени занимает реставрация фар?",
        answer:
          "Примерно 1–1,5 часа на фару. Сильно пожелтевшие или поцарапанные фары могут потребовать больше времени.",
      },
      {
        question: "Сколько держится реставрация?",
        answer:
          "С UV-защитой 1–2 года. Без защиты рекомендуем ежегодную обработку.",
      },
      {
        question: "От какой цены?",
        answer:
          "💡 От 35€ за фару в зависимости от состояния и модели автомобиля.",
      },
      {
        question: "Как рассчитываются цены?",
        answer:
          "💬 Цены зависят от размера автомобиля, состояния лакокрасочного покрытия и степени загрязнения салона.",
      },
    ],
    "restoration-fabric-alcantara-carpets": [
      {
        question: "Можно ли удалить следы ожогов?",
        answer:
          "Да, удаляем следы ожогов и ремонтируем рваные швы. Результат зависит от состояния материала.",
      },
      {
        question: "Какие ткани обрабатываете?",
        answer:
          "Ткань, Alcantara, велюр и ковры. Проконсультируем по вариантам для вашего автомобиля.",
      },
      {
        question: "Как рассчитываются цены?",
        answer:
          "💬 Цены зависят от размера автомобиля, состояния лакокрасочного покрытия и степени загрязнения салона.",
      },
    ],
    "restoration-repair-panels": [
      {
        question: "Какие панели можно отремонтировать?",
        answer:
          "Внутренние и наружные: обивка дверей, панели, крылья, бамперы и т.д. Исправление царапин и подкраска.",
      },
      {
        question: "Когда нужна замена деталей?",
        answer:
          "При сильных повреждениях или когда ремонт нерентабелен. Проконсультируем на месте.",
      },
      {
        question: "Как рассчитываются цены?",
        answer:
          "💬 Цены зависят от размера автомобиля, состояния лакокрасочного покрытия и степени загрязнения салона.",
      },
    ],
    "restoration-leather-steering-wheel": [
      {
        question: "Сколько занимает реставрация руля?",
        answer:
          "Примерно 2–3 часа в зависимости от состояния. Сильно изношенные рули могут потребовать больше времени.",
      },
      {
        question: "Сколько держится реставрация?",
        answer:
          "При регулярном уходе 1–2 года. Подберём оптимальный уход за кожей.",
      },
      {
        question: "Как рассчитываются цены?",
        answer:
          "💬 Цены зависят от размера автомобиля, состояния лакокрасочного покрытия и степени загрязнения салона.",
      },
    ],
    "elimination-odours-interior-disinfection": [
      {
        question: "Какие запахи можно устранить?",
        answer:
          "Табак, запах животных, влажность, плесень, запах еды и др. Озонирование или профессиональные средства в зависимости от ситуации.",
      },
      {
        question: "От какой цены?",
        answer:
          "🌿 От 80€ в зависимости от типа запаха и размера автомобиля.",
      },
      {
        question: "Как рассчитываются цены?",
        answer:
          "💬 Цены зависят от размера автомобиля, состояния лакокрасочного покрытия и степени загрязнения салона.",
      },
    ],
    "partial-restoration-leather-seats": [
      {
        question: "Когда рекомендуется частичная реставрация?",
        answer:
          "При локальных повреждениях (изношенные края, трещины, изменение цвета) без поражения всей поверхности сиденья.",
      },
      {
        question: "От какой цены?",
        answer:
          "🪑 От 100€ за сиденье в зависимости от объёма повреждений.",
      },
      {
        question: "Как рассчитываются цены?",
        answer:
          "💬 Цены зависят от размера автомобиля, состояния лакокрасочного покрытия и степени загрязнения салона.",
      },
    ],
    "full-restoration-leather-seats": [
      {
        question: "Когда рекомендуется полная реставрация?",
        answer:
          "При сильно изношенных или обширно повреждённых кожаных сиденьях. Восстанавливаем как новые.",
      },
      {
        question: "Сколько занимает полная реставрация?",
        answer:
          "В зависимости от количества сидений примерно 1–2 дня. Дам оценку при осмотре.",
      },
      {
        question: "Как рассчитываются цены?",
        answer:
          "💬 Цены зависят от размера автомобиля, состояния лакокрасочного покрытия и степени загрязнения салона.",
      },
    ],
    "small-dent-repair": [
      {
        question: "Что такое Paintless Dent Repair?",
        answer:
          "Ремонт без покраски — вмятина устраняется массажем изнутри или снаружи. Быстро, дёшево и без повреждения лака.",
      },
      {
        question: "Как быстро ремонт?",
        answer:
          "20–40 минут для небольших вмятин. 30–50€ в зависимости от доступа.",
      },
      {
        question: "Как рассчитываются цены?",
        answer:
          "💬 Цены зависят от размера автомобиля, состояния лакокрасочного покрытия и степени загрязнения салона.",
      },
    ],
    "medium-dent-repair": [
      {
        question: "Когда возникают средние вмятины?",
        answer:
          "От удара двери (парковка), вандализма или лёгких аварий. 3–10 см, 80–150€.",
      },
      {
        question: "Как рассчитываются цены?",
        answer:
          "💬 Цены зависят от размера автомобиля, состояния лакокрасочного покрытия и степени загрязнения салона.",
      },
    ],
    "large-dent-full-door": [
      {
        question: "Сколько стоит вся дверь?",
        answer:
          "Ок. 230€ за дверь в зависимости от модели. Трудный доступ или вся панель: 100–200€.",
      },
      {
        question: "Как рассчитываются цены?",
        answer:
          "💬 Цены зависят от размера автомобиля, состояния лакокрасочного покрытия и степени загрязнения салона.",
      },
    ],
    "multiple-dents-hail": [
      {
        question: "Сколько занимает ремонт после града?",
        answer:
          "1–2 дня в зависимости от количества и площади. 100–1000€+ в зависимости от объёма повреждений.",
      },
      {
        question: "Как рассчитываются цены?",
        answer:
          "💬 Цены зависят от размера автомобиля, состояния лакокрасочного покрытия и степени загрязнения салона.",
      },
    ],
    "full-car-hail-repair": [
      {
        question: "Сколько стоит полный ремонт после града?",
        answer:
          "500–1500€ в зависимости от модели и осмотра. Подготовим для вас смету.",
      },
      {
        question: "Как рассчитываются цены?",
        answer:
          "💬 Цены зависят от размера автомобиля, состояния лакокрасочного покрытия и степени загрязнения салона.",
      },
    ],
  },
};

export function getAutoaufbereitungFaq(
  locale: AutoaufbereitungLocale,
  slug: string
): FaqItem[] {
  return (
    faqTranslations[locale]?.[slug] ??
    faqTranslations[autoaufbereitungDefaultLocale]?.[slug] ??
    []
  );
}

export function getAutoaufbereitungTranslation(
  locale: AutoaufbereitungLocale,
  key: string
): string {
  return (
    translations[locale][key] ??
    translations[autoaufbereitungDefaultLocale][key] ??
    key
  );
}

export function getAutoaufbereitungCategoryTranslation(
  locale: AutoaufbereitungLocale,
  slug: string,
  field: "title" | "description"
): string {
  const cat =
    categoryTranslations[locale]?.[slug] ??
    categoryTranslations[autoaufbereitungDefaultLocale]?.[slug];
  if (!cat) return "";
  return cat[field] ?? "";
}

export function getAutoaufbereitungCategoryItems(
  locale: AutoaufbereitungLocale,
  slug: string
): string[] {
  const cat =
    categoryTranslations[locale]?.[slug] ??
    categoryTranslations[autoaufbereitungDefaultLocale]?.[slug];
  return cat?.items ?? [];
}
