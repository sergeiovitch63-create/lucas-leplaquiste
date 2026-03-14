export interface Sl74RenovFaq {
  question: string;
  answer: string;
}

export interface Sl74RenovReview {
  author: string;
  text: string;
  rating?: number;
}

export interface Sl74RenovCategory {
  slug: string;
  label: string;
  short: string;
  body: string[];
  whyUs: string[];
  faq: Sl74RenovFaq[];
  images: string[];
  /** Avis clients (pour catégorie avis) */
  reviews?: Sl74RenovReview[];
  /** Masquer le bouton devis (pour avis, à propos) */
  hideDevis?: boolean;
  /** Masquer la galerie (garder thumbnail uniquement) */
  hideGallery?: boolean;
}

export const sl74RenovCategories: Sl74RenovCategory[] = [
  {
    slug: "chauffage-electrique",
    label: "Chauffage électrique",
    short: "Radiateurs, convecteurs, chauffage au sol",
    body: [
      "Installation de radiateurs électriques, convecteurs, chauffage au sol ou solutions hybrides pour un confort thermique optimal.",
      "Nous vous conseillons sur le dimensionnement et le choix des équipements selon votre logement et vos habitudes de consommation.",
    ],
    whyUs: [
      "Dimensionnement adapté à votre logement.",
      "Équipements performants et économes.",
      "Respect des normes en vigueur.",
    ],
    faq: [
      { question: "Quel type de chauffage électrique choisir ?", answer: "Selon votre logement, vos besoins et votre budget, nous vous orientons vers des radiateurs à inertie, des convecteurs, du chauffage au sol ou une combinaison adaptée." },
      { question: "Faut-il modifier le tableau électrique ?", answer: "Souvent oui, car le chauffage électrique nécessite des circuits dédiés. Nous vérifions votre installation existante." },
      { question: "Peut-on associer chauffage électrique et solaire ?", answer: "Oui, des solutions combinées existent pour optimiser votre consommation." },
    ],
    images: [
      "/sl74/chauffage-electrique/photo_2026-03-14_22-16-11.jpg",
      "/sl74/chauffage-electrique/photo_2026-03-14_22-16-25.jpg",
      "/sl74/chauffage-electrique/photo_2026-03-14_22-16-29.jpg",
      "/sl74/chauffage-electrique/photo_2026-03-14_22-16-32.jpg",
      "/sl74/chauffage-electrique/photo_2026-03-14_22-16-34.jpg",
      "/sl74/chauffage-electrique/photo_2026-03-14_22-16-37.jpg",
      "/sl74/chauffage-electrique/photo_2026-03-14_22-16-40.jpg",
      "/sl74/chauffage-electrique/photo_2026-03-14_22-16-43.jpg",
      "/sl74/chauffage-electrique/photo_2026-03-14_22-16-45.jpg",
      "/sl74/chauffage-electrique/photo_2026-03-14_22-16-48.jpg",
      "/sl74/chauffage-electrique/photo_2026-03-14_22-16-51.jpg",
    ],
  },
  {
    slug: "portails-electrique",
    label: "Portails électrique",
    short: "Motorisation et installation",
    body: [
      "Nous assurons la motorisation de vos portails et barrières : installation complète, dépannage et maintenance.",
      "Qu'il s'agisse d'un portail battant ou coulissant, nous vous proposons des solutions adaptées à votre usage et à votre budget.",
    ],
    whyUs: [
      "Conseils personnalisés selon vos besoins.",
      "Installation dans les règles de l'art.",
      "Dépannage et maintenance sur le long terme.",
    ],
    faq: [
      { question: "Quel type de portail peut être motorisé ?", answer: "Portails battants, coulissants et barrières peuvent être motorisés. Nous étudions chaque projet pour proposer la solution adaptée." },
      { question: "Faut-il prévoir des travaux de maçonnerie ?", answer: "Selon l'existant, des fondations ou supports peuvent être nécessaires. Nous vous faisons un devis détaillé." },
      { question: "Proposez-vous la maintenance ?", answer: "Oui, nous intervenons pour la maintenance et le dépannage de votre installation." },
    ],
    images: [
      "/sl74/portails-electrique/photo_2026-03-14_21-57-49.jpg",
      "/sl74/portails-electrique/photo_2026-03-14_21-58-07.jpg",
      "/sl74/portails-electrique/photo_2026-03-14_21-58-11.jpg",
      "/sl74/portails-electrique/photo_2026-03-14_21-58-15.jpg",
      "/sl74/portails-electrique/photo_2026-03-14_21-58-18.jpg",
      "/sl74/portails-electrique/photo_2026-03-14_21-58-21.jpg",
      "/sl74/portails-electrique/photo_2026-03-14_21-58-24.jpg",
      "/sl74/portails-electrique/photo_2026-03-14_21-58-32.jpg",
      "/sl74/portails-electrique/photo_2026-03-14_21-58-35.jpg",
      "/sl74/portails-electrique/photo_2026-03-14_21-58-40.jpg",
    ],
  },
  {
    slug: "tableau-electrique",
    label: "Tableau électrique",
    short: "Installation, mise aux normes, dépannage",
    body: [
      "Le tableau électrique est le cœur de votre installation. Il regroupe les protections de chaque circuit et assure la coupure générale en cas de problème.",
      "Un remplacement ou une mise aux normes peut être l'occasion de mieux répartir vos circuits, d'ajouter des protections différentielles et de prévoir des réserves pour de futurs équipements (chauffage, recharge véhicule, etc.).",
    ],
    whyUs: [
      "Choix de matériel de marques reconnues.",
      "Câblage propre et lisible, avec repérage clair des circuits.",
      "Possibilité de prévoir des emplacements libres pour vos projets futurs.",
    ],
    faq: [
      { question: "Quand faut-il remplacer un tableau électrique ?", answer: "Un tableau trop ancien, mal protégé ou surchargé doit être remplacé pour garantir la sécurité de l'installation." },
      { question: "La coupure est-elle totale pendant les travaux ?", answer: "Oui, le courant est coupé le temps du remplacement, mais nous organisons l'intervention pour limiter la gêne." },
      { question: "Le nouveau tableau sera-t-il évolutif ?", answer: "Nous prévoyons systématiquement des emplacements libres pour de futurs ajouts si l'espace le permet." },
    ],
    images: [
      "/sl74/tableau-electrique/photo_2026-03-14_22-09-27.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-09-39.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-09-47.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-09-50.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-09-54.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-09-56.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-09-58.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-10-01.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-10-04.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-10-08.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-10-12.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-10-15.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-10-18.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-10-22.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-10-30.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-10-34.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-10-38.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-10-43.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-10-46.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-10-52.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-10-57.jpg",
      "/sl74/tableau-electrique/photo_2026-03-14_22-11-01.jpg",
    ],
  },
  {
    slug: "recharge-automobiles",
    label: "Borne de recharge",
    short: "Bornes pour véhicules électriques",
    body: [
      "Installation de bornes de recharge pour véhicules électriques et hybrides : wallbox, prises renforcées, gestion de la puissance.",
      "Nous réalisons l'étude, l'installation et la mise en service conformément aux normes et aux aides disponibles.",
    ],
    whyUs: [
      "Bornes certifiées et éligibles aux aides.",
      "Dimensionnement selon votre véhicule et usage.",
      "Possibilité de pilotage et optimisation des recharges.",
    ],
    faq: [
      { question: "Quelle puissance choisir pour ma borne ?", answer: "Selon votre véhicule et vos habitudes (recharge nocturne, quotidienne…), nous dimensionnons la borne adaptée, en général entre 7 et 22 kW." },
      { question: "Puis-je bénéficier d'aides ?", answer: "Oui, des aides (MaPrimeRénov', CEE, etc.) existent. Nous vous informons sur les démarches." },
      { question: "Faut-il une autorisation du syndic en copropriété ?", answer: "Oui, en copropriété une autorisation est généralement nécessaire. Nous pouvons vous accompagner sur le dossier." },
    ],
    images: [
      "/sl74/recharge-automobiles/photo_2026-03-14_22-19-33.jpg",
      "/sl74/recharge-automobiles/photo_2026-03-14_22-19-45.jpg",
    ],
  },
  {
    slug: "avis",
    label: "Avis",
    short: "",
    body: [],
    whyUs: [],
    faq: [],
    images: ["/media/accueil/favicon-avis.png"],
    hideDevis: true,
    hideGallery: true,
    reviews: [
      {
        author: "Marie L.",
        text: "Intervention rapide et professionnelle pour la mise aux normes de notre tableau électrique. Travail soigné, je recommande.",
        rating: 5,
      },
      {
        author: "Thomas D.",
        text: "Installation de notre borne de recharge impeccable. L'équipe est à l'écoute et les conseils ont été très utiles.",
        rating: 5,
      },
      {
        author: "Sophie M.",
        text: "Motorisation de notre portail réalisée dans les délais. Bon rapport qualité-prix. Très satisfaite.",
        rating: 5,
      },
      {
        author: "Jean-Pierre R.",
        text: "Pose de radiateurs électriques dans tout l'appartement. Propre et efficace. Devis respecté.",
        rating: 5,
      },
      {
        author: "Nathalie B.",
        text: "Artisan sérieux et compétent. Dépannage électrique effectué le jour même. Merci pour la réactivité.",
        rating: 5,
      },
    ],
  },
  {
    slug: "a-propos",
    label: "À propos",
    short: "",
    body: [
      "SL74 Rénov est une entreprise d'électricité générale et de rénovation basée en Occitanie.",
      "Nous intervenons pour tous vos projets : tableaux électriques, portails automatiques, chauffage électrique et bornes de recharge pour véhicules électriques.",
      "Notre priorité : la qualité du travail, le respect des normes et la satisfaction de nos clients.",
    ],
    whyUs: [],
    faq: [],
    images: ["/sl74/LOGO.jpg"],
    hideDevis: true,
    hideGallery: true,
  },
];
