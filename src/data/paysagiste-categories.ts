export interface PaysagisteFaq {
  question: string;
  answer: string;
}

export interface PaysagisteReview {
  author: string;
  text: string;
  rating?: number;
}

export interface PaysagisteCategory {
  slug: string;
  label: string;
  short: string;
  body: string[];
  whyUs: string[];
  faq: PaysagisteFaq[];
  images: string[];
  reviews?: PaysagisteReview[];
  hideDevis?: boolean;
  hideGallery?: boolean;
}

export const paysagisteCategories: PaysagisteCategory[] = [
  {
    slug: "tonte-entretien-pelouse",
    label: "Tonte et entretien de pelouse",
    short: "Tonte reguliere, bordures et remise en etat",
    body: [
      "Entretien de pelouses pour particuliers et professionnels: tonte, finitions et nettoyage des dechets verts.",
      "Interventions ponctuelles ou contrat annuel selon la saison et la frequence souhaitee.",
    ],
    whyUs: [
      "Passages reguliers et planning clair.",
      "Finitions soignees (bordures, zones difficiles).",
      "Materiel adapte a la surface du terrain.",
    ],
    faq: [
      {
        question: "A quelle frequence faut-il tondre?",
        answer:
          "En general toutes les 1 a 2 semaines en periode de croissance. Nous adaptons selon la meteo et la variete du gazon.",
      },
      {
        question: "Proposez-vous le ramassage?",
        answer:
          "Oui, nous pouvons evacuer les dechets verts ou faire du mulching selon vos preferences.",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1595228702420-f6ea0b27c2b5?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
      "https://images.unsplash.com/photo-1590418606746-018840f9eda5?w=800&q=80",
    ],
  },
  {
    slug: "taille-haies-arbustes",
    label: "Taille de haies et arbustes",
    short: "Taille d'entretien, de formation et remise en forme",
    body: [
      "Taille de haies, arbustes et massifs pour garder un jardin net, equilibre et harmonieux.",
      "Intervention dans le respect des periodes de taille et des essences vegetales.",
    ],
    whyUs: [
      "Taille precise et esthetique.",
      "Respect de la sante des vegetaux.",
      "Gestion propre des coupes et residus.",
    ],
    faq: [
      {
        question: "Quand tailler une haie?",
        answer:
          "Selon l'essence, generalement au printemps et/ou en fin d'ete. Nous vous conseillons le meilleur calendrier.",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=800&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    ],
  },
  {
    slug: "creation-jardins",
    label: "Creation de jardins",
    short: "Conception paysagere et amenagement exterieur",
    body: [
      "Creation complete de jardins: etude de l'espace, choix des vegetaux, organisation des zones et des circulations.",
      "Projet personnalise selon votre budget, l'exposition et le style recherche.",
    ],
    whyUs: [
      "Conception sur mesure.",
      "Palette vegetale adaptee au climat local.",
      "Approche durable et facile a entretenir.",
    ],
    faq: [
      {
        question: "Pouvez-vous concevoir un jardin moderne?",
        answer:
          "Oui, nous realisons des projets contemporains, naturels ou mediterraneens selon vos envies.",
      },
      {
        question: "Faites-vous aussi la plantation?",
        answer:
          "Oui, la mise en oeuvre complete est possible, de la preparation du sol a la plantation finale.",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1467293622093-9f15c96be70f?w=800&q=80",
      "https://images.unsplash.com/photo-1598902468171-7c38408c3f97?w=800&q=80",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=800&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    ],
  },
  {
    slug: "engazonnement",
    label: "Engazonnement",
    short: "Semis, preparation des sols et gazon en plaques",
    body: [
      "Creation ou renovation de pelouse: nivellement, amendement, semis ou pose de gazon en rouleaux.",
      "Solutions adaptees a l'usage (ornement, enfants, passage frequent).",
    ],
    whyUs: [
      "Preparation de sol rigoureuse.",
      "Choix des varietes adapte a l'usage.",
      "Conseils d'arrosage et d'entretien post-travaux.",
    ],
    faq: [
      {
        question: "Semis ou gazon en plaques?",
        answer:
          "Le semis est plus economique, le gazon en plaques offre un rendu immediat. Nous vous aidons a choisir.",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1560749003-f4b1e17e2dfd?w=800&q=80",
      "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&q=80",
      "https://images.unsplash.com/photo-1595228702420-f6ea0b27c2b5?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
  },
  {
    slug: "terrassement",
    label: "Terrassement",
    short: "Preparation de terrain et nivellement",
    body: [
      "Travaux de terrassement pour preparer vos amenagements exterieurs: decaissement, nivellement et evacuation.",
      "Base propre et stable pour pelouse, allees, massifs ou clotures.",
    ],
    whyUs: [
      "Materiel adapte aux acces difficiles.",
      "Mise a niveau precise.",
      "Chantier securise et propre.",
    ],
    faq: [
      {
        question: "Intervenez-vous sur petits terrains?",
        answer:
          "Oui, nous intervenons aussi bien sur petites surfaces que sur terrains plus etendus.",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    ],
  },
  {
    slug: "pose-clotures",
    label: "Pose de clotures",
    short: "Clotures rigides, souples et occultation",
    body: [
      "Installation de clotures pour securiser, delimiter et preserver l'intimite de votre exterieur.",
      "Etude des contraintes de terrain et pose durable avec finitions soignees.",
    ],
    whyUs: [
      "Choix de materiaux robustes.",
      "Alignement et tension maitrises.",
      "Solutions occultantes disponibles.",
    ],
    faq: [
      {
        question: "Quelle cloture choisir pour plus d'intimite?",
        answer:
          "Les panneaux rigides avec occultation sont souvent le meilleur compromis entre esthetique et durabilite.",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
    ],
  },
  {
    slug: "arrosage-automatique",
    label: "Arrosage automatique",
    short: "Systemes programmables et economies d'eau",
    body: [
      "Mise en place de systemes d'arrosage automatises pour pelouses, massifs et haies.",
      "Programmation par zones pour optimiser la consommation et la sante des plantations.",
    ],
    whyUs: [
      "Arrosage precis selon les besoins.",
      "Gain de temps au quotidien.",
      "Reduction du gaspillage d'eau.",
    ],
    faq: [
      {
        question: "Peut-on arroser la nuit automatiquement?",
        answer:
          "Oui, la programmation horaire est prevue pour arroser aux moments les plus efficaces.",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
      "https://images.unsplash.com/photo-1560749003-f4b1e17e2dfd?w=800&q=80",
    ],
  },
  {
    slug: "avis",
    label: "Avis clients",
    short: "",
    body: [],
    whyUs: [],
    faq: [],
    images: [
      "https://images.unsplash.com/photo-1467293622093-9f15c96be70f?w=800&q=80",
    ],
    hideDevis: true,
    hideGallery: true,
    reviews: [
      {
        author: "Camille R.",
        text: "Entretien du jardin impeccable, equipe ponctuelle et tres professionnelle.",
        rating: 5,
      },
      {
        author: "Julien M.",
        text: "Tres bon accompagnement pour la creation de nos massifs et de notre pelouse.",
        rating: 5,
      },
    ],
  },
];
