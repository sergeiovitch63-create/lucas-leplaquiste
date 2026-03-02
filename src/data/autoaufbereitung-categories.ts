/**
 * Catégories de services Autoaufbereitung — Auto detailing à Puerto de la Cruz
 * Basé sur les services typiques d'auto detailing (PUZ Fahrzeugaufbereitung, industrie)
 */

export interface AutoaufbereitungServiceFaq {
  question: string;
  answer: string;
}

export interface AutoaufbereitungServiceCategory {
  slug: string;
  title: string;
  description: string;
  items?: string[];
  images: string[];
  section?: string;
}

export const autoaufbereitungCategories: AutoaufbereitungServiceCategory[] = [
  {
    slug: "basic-package",
    title: "Basic Package",
    description:
      "💧 Notre forfait d'entrée pour une carrosserie propre et un intérieur frais. Lavage main professionnel, vitres intérieures et extérieures, nettoyage léger de l'habitacle et des surfaces. Idéal pour un entretien régulier.",
    items: [
      "Professional hand wash of the bodywork",
      "Cleaning of windows inside and outside",
      "Light interior cleaning",
      "Shaking out and vacuuming floor mats",
      "Cleaning of all surfaces",
      "Cleaning of wheels, rims, and wheel arches",
      "Wiping of door frames",
    ],
    images: ["/media/placeholder.svg", "/media/placeholder.svg"],
    section: "Detailing",
  },
  {
    slug: "medium-package",
    title: "Medium Package",
    description:
      "✨ Inclut tout du Basic Package + nettoyage intérieur profond, extérieur détaillé (insectes, résine), jantes et pneus soignés, entretien plastiques et caoutchouc, polissage léger de la carrosserie.",
    items: [
      "Everything from Basic Package",
      "Deep interior cleaning (floor mats, seats, upholstery)",
      "More detailed exterior cleaning (removal of insects and resin)",
      "Thorough cleaning of rims and tires",
      "Care of plastic and rubber elements",
      "Light professional polishing of the bodywork",
    ],
    images: ["/media/placeholder.svg", "/media/placeholder.svg"],
    section: "Detailing",
  },
  {
    slug: "luxury-package",
    title: "Luxury Package (Full Detailing)",
    description:
      "🏆 Notre forfait premium pour un detailing complet. Intérieur profond avec soin cuir, nettoyage chimique tapis et sièges, moteur, lavage main pro, polissage 2–3 passes (hologrammes et rayures moyennes), revêtement céramique haut de gamme.",
    items: [
      "Deep interior cleaning with leather care",
      "Chemical cleaning of carpets and seats",
      "Engine bay cleaning",
      "Professional hand wash removing stubborn dirt",
      "2–3 stage professional polishing of the bodywork (removal of holograms and medium scratches)",
      "Application of a high-quality ceramic coating",
    ],
    images: ["/media/placeholder.svg", "/media/placeholder.svg"],
    section: "Detailing",
  },
  {
    slug: "headlight-restoration",
    section: "Restoration",
    title: "Headlight Restoration",
    description:
      "💡 Restauration professionnelle des phares jaunis ou opaques. Ponçage progressif, polish et protection UV pour retrouver une visibilité optimale. À partir de 35€ par phare.",
    items: [
      "Professional restoration of yellowed or cloudy headlights",
      "Progressive sanding and polishing",
      "UV protection coating",
      "Improved visibility and safety",
      "From €35 per headlight",
    ],
    images: ["/media/placeholder.svg", "/media/placeholder.svg"],
  },
  {
    slug: "restoration-fabric-alcantara-carpets",
    section: "Restoration",
    title: "Restoration of Fabric Surfaces, Alcantara & Carpets",
    description:
      "🧵 Restauration et réparation des tissus d'habitacle, Alcantara et tapis. Élimination des traces de brûlure, réparation des coutures déchirées, retrait des taches tenaces.",
    items: [
      "Restoration of fabric surfaces and Alcantara",
      "Carpet restoration and cleaning",
      "Removal of burn marks",
      "Seam repairs",
      "Stain removal",
    ],
    images: ["/media/placeholder.svg", "/media/placeholder.svg"],
  },
  {
    slug: "restoration-repair-panels",
    section: "Restoration",
    title: "Restoration and Repair of Panels",
    description:
      "🔧 Réparation et restauration des panneaux intérieurs et extérieurs. Correction des rayures, retouches peinture, remplacement ou réparation de pièces endommagées.",
    items: [
      "Interior panel restoration",
      "Exterior panel repair",
      "Scratch correction",
      "Paint touch-ups",
      "Replacement or repair of damaged parts",
    ],
    images: ["/media/placeholder.svg", "/media/placeholder.svg"],
  },
  {
    slug: "restoration-leather-steering-wheel",
    section: "Restoration",
    title: "Restoration of Genuine Leather Steering Wheels",
    description:
      "🔄 Restauration professionnelle des volants en cuir véritable. Nettoyage, réhydratation, réparation des zones usées et application d'une protection pour retrouver un toucher agréable et une finition neuve.",
    items: [
      "Deep cleaning of leather steering wheel",
      "Leather rehydration and conditioning",
      "Repair of worn or cracked areas",
      "Protection coating",
      "Restoration of original appearance and touch",
    ],
    images: ["/media/placeholder.svg", "/media/placeholder.svg"],
  },
  {
    slug: "elimination-odours-interior-disinfection",
    section: "Restoration",
    title: "Elimination of Unpleasant Odours & Interior Disinfection",
    description:
      "🌿 Élimination des mauvaises odeurs (tabac, animaux, humidité…) et désinfection complète de l'habitacle. Traitement ozone ou produits professionnels. À partir de 80€.",
    items: [
      "Elimination of unpleasant odours (tobacco, pets, humidity)",
      "Full interior disinfection",
      "Ozone treatment or professional products",
      "Air conditioning system cleaning",
      "From €80",
    ],
    images: ["/media/placeholder.svg", "/media/placeholder.svg"],
  },
  {
    slug: "partial-restoration-leather-seats",
    section: "Restoration",
    title: "Partial Restoration of Leather Seats",
    description:
      "🪑 Restauration partielle des sièges en cuir : zones usées, fissures, décolorations. Nettoyage, réparation des zones abîmées et retouche couleur. À partir de 100€.",
    items: [
      "Restoration of worn or damaged seat areas",
      "Crack and scratch repair",
      "Colour touch-up",
      "Leather conditioning",
      "From €100",
    ],
    images: ["/media/placeholder.svg", "/media/placeholder.svg"],
  },
  {
    slug: "full-restoration-leather-seats",
    section: "Restoration",
    title: "Full Restoration of Leather Seats",
    description:
      "✨ Restauration complète des sièges en cuir : nettoyage profond, réparation des dégâts, retouche uniforme et protection durable. Rendu comme neuf.",
    items: [
      "Complete leather seat restoration",
      "Deep cleaning and conditioning",
      "Full damage repair (cracks, tears, discoloration)",
      "Uniform colour restoration",
      "Durable protection coating",
    ],
    images: ["/media/placeholder.svg", "/media/placeholder.svg"],
  },
  {
    slug: "small-dent-repair",
    section: "Paintless Dent Repair (PDR)",
    title: "Small Dent (2–3 cm, Easy Access)",
    description:
      "🔨 Réparation rapide des petites bosses : 2–3 cm, accès facile. Réparation paintless (sans peinture). 30–50€, intervention 20–40 min.",
    items: [
      "2–3 cm dent, easy access",
      "€30–50",
      "Quick repair (20–40 min)",
      "Paintless dent repair",
    ],
    images: ["/media/placeholder.svg", "/media/placeholder.svg"],
  },
  {
    slug: "medium-dent-repair",
    section: "Paintless Dent Repair (PDR)",
    title: "Medium Dent (3–10 cm)",
    description:
      "🔨 Bosses moyennes causées par choc de porte ou vandalisme. 3–10 cm, réparation paintless. 80–150€ selon difficulté.",
    items: [
      "3–10 cm dent",
      "€80–150",
      "Caused by door impact or vandalism",
      "Paintless dent repair",
    ],
    images: ["/media/placeholder.svg", "/media/placeholder.svg"],
  },
  {
    slug: "large-dent-full-door",
    section: "Paintless Dent Repair (PDR)",
    title: "Large Dent or Full Door",
    description:
      "🔨 Grosse bosse ou panneau complet (ex. porte entière). Accès difficile ou panneau entier. 100–200€, environ 230€ par porte selon modèle.",
    items: [
      "Large dent or full panel",
      "€100–200",
      "Difficult access or entire panel",
      "e.g. €230 per door",
    ],
    images: ["/media/placeholder.svg", "/media/placeholder.svg"],
  },
  {
    slug: "multiple-dents-hail",
    section: "Paintless Dent Repair (PDR)",
    title: "Multiple Dents (Hail Damage)",
    description:
      "🔨 Multiples bosses (grêle). Tarif selon quantité et surface. 100–1000€+, travail 1–2 jours.",
    items: [
      "€100–1000+",
      "Depends on quantity and surface",
      "1–2 days of work",
      "Paintless dent repair",
    ],
    images: ["/media/placeholder.svg", "/media/placeholder.svg"],
  },
  {
    slug: "full-car-hail-repair",
    section: "Paintless Dent Repair (PDR)",
    title: "Full Car Hail Repair",
    description:
      "🔨 Réparation complète véhicule endommagé par la grêle. 500–1500€ selon modèle et inspection.",
    items: [
      "€500–1500",
      "Depending on model and inspection",
      "Full vehicle hail damage repair",
      "Paintless dent repair",
    ],
    images: ["/media/placeholder.svg", "/media/placeholder.svg"],
  },
];
