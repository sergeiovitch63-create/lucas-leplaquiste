/**
 * Catégories de services Taller El Salón — garagiste à Los Realejos
 */

export interface TallerServiceFaq {
  question: string;
  answer: string;
}

export interface TallerServiceCategory {
  slug: string;
  title: string;
  description: string;
  faq: TallerServiceFaq[];
  images: string[];
}

export const tallerServiceCategories: TallerServiceCategory[] = [
  {
    slug: "systeme-electrique-batterie",
    title: "Système électrique batterie",
    description:
      "Contrôle, entretien et remplacement de batteries. Diagnostic du système électrique de votre véhicule.",
    faq: [
      { question: "Quand faire contrôler ma batterie ?", answer: "Un contrôle annuel ou dès les premiers signes de fatigue (démarrage lent, phares faibles) est recommandé." },
      { question: "Combien de temps dure une batterie ?", answer: "En moyenne 4 à 5 ans selon l'utilisation et les conditions climatiques." },
    ],
    images: ["/media/batterie.png"],
  },
  {
    slug: "alignements-des-roues",
    title: "Alignements des roues",
    description:
      "Parallélisme et géométrie des roues pour une conduite stable et une usure uniforme des pneus.",
    faq: [
      { question: "Quand faire un alignement ?", answer: "Après un choc, un changement de pneus, ou si le véhicule tire d'un côté." },
      { question: "Quels sont les signes d'un mauvais alignement ?", answer: "Usure inégale des pneus, volant qui tire, véhicule qui dérive." },
    ],
    images: ["/media/allignement.png"],
  },
  {
    slug: "vidange",
    title: "Vidange",
    description:
      "Vidange moteur complète avec huile de qualité. Entretien essentiel pour la longévité de votre moteur.",
    faq: [
      { question: "À quelle fréquence faire la vidange ?", answer: "Tous les 10 000 à 15 000 km ou une fois par an selon les préconisations constructeur." },
      { question: "Quelle huile utiliser ?", answer: "Nous utilisons des huiles adaptées à votre véhicule selon les spécifications constructeur." },
    ],
    images: ["/media/vidange.png"],
  },
  {
    slug: "remplacement-filtres-air-habitacle",
    title: "Remplacement de filtres d'air pour habitacle",
    description:
      "Nouveau filtre d'habitacle pour une meilleure qualité d'air et un système de climatisation performant.",
    faq: [
      { question: "À quoi sert le filtre d'habitacle ?", answer: "Il filtre pollen, poussière et particules pour un air plus sain dans l'habitacle." },
      { question: "Quand le remplacer ?", answer: "Tous les 15 000 à 30 000 km ou en cas d'odeurs ou de faible débit de climatisation." },
    ],
    images: ["/media/filtre-air.png"],
  },
  {
    slug: "freins",
    title: "Freins",
    description:
      "Contrôle, réparation et remplacement des plaquettes, disques et système de freinage.",
    faq: [
      { question: "Quand changer les plaquettes de frein ?", answer: "Lorsque l'épaisseur est insuffisante ou que le voyant/témoin d'usure s'allume." },
      { question: "Freins qui grincent, est-ce grave ?", answer: "Cela peut indiquer une usure. Nous effectuons un diagnostic gratuit pour vous conseiller." },
    ],
    images: ["/media/freins.png"],
  },
  {
    slug: "pneus",
    title: "Pneus",
    description:
      "Montage, équilibrage et contrôle des pneus. Conseils pour le choix des pneumatiques.",
    faq: [
      { question: "Quand changer les pneus ?", answer: "Quand la profondeur des sculptures est inférieure à 1,6 mm ou en cas de dommage." },
      { question: "Montage pneus été/hiver ?", answer: "Oui, nous assurons le montage et le stockage de vos pneus selon la saison." },
    ],
    images: ["/media/pneus.png"],
  },
  {
    slug: "reparation-directions-suspensions",
    title: "Réparation de directions et suspensions",
    description:
      "Réparation des systèmes de direction et de suspension pour une tenue de route optimale.",
    faq: [
      { question: "Quels sont les signes de suspension fatiguée ?", answer: "Rebonds excessifs, bruits de claquement, usure anormale des pneus." },
      { question: "Direction assistée défaillante ?", answer: "Nous diagnostiquons et réparons les problèmes de direction assistée (hydraulique ou électrique)." },
    ],
    images: ["/media/suspension .png"],
  },
  {
    slug: "reparation-boitiers-traction",
    title: "Réparation de boîtiers de traction",
    description:
      "Réparation des boîtes de vitesses manuelles et automatiques, transmissions et différentiels.",
    faq: [
      { question: "Boîte qui force ou craque ?", answer: "Un diagnostic permet d'identifier l'origine du problème (embrayage, boîte, etc.)." },
      { question: "Vous réparez les boîtes automatiques ?", answer: "Oui, nous intervenons sur les boîtes manuelles et automatiques." },
    ],
    images: ["/media/boitiers.png"],
  },
  {
    slug: "reparation-electrique",
    title: "Réparation électrique",
    description:
      "Diagnostic et réparation des circuits électriques, équipements et calculateurs du véhicule.",
    faq: [
      { question: "Problème électrique intermittent ?", answer: "Nous effectuons un diagnostic pour localiser les faux contacts ou câblages défectueux." },
      { question: "Voyants qui s'allument ?", answer: "Une lecture des codes défaut nous indique la cause. Venez nous voir pour un diagnostic." },
    ],
    images: ["/media/electrique.png"],
  },
];

export function getTallerServiceBySlug(slug: string): TallerServiceCategory | undefined {
  return tallerServiceCategories.find((s) => s.slug === slug);
}
