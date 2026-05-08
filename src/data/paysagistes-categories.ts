export interface PaysagistesFaq {
  question: string;
  answer: string;
}

export interface PaysagistesReview {
  author: string;
  text: string;
  rating?: number;
}

export interface PaysagistesCategory {
  slug: string;
  label: string;
  short: string;
  body: string[];
  whyUs: string[];
  faq: PaysagistesFaq[];
  images: string[];
  reviews?: PaysagistesReview[];
  hideDevis?: boolean;
  hideGallery?: boolean;
}

export const paysagistesCategories: PaysagistesCategory[] = [
  {
    slug: "tonte-entretien",
    label: "Tonte et entretien",
    short: "Tonte reguliere, scarification et finitions soignees",
    body: [
      "Entretien complet de vos espaces verts: tonte, scarification, aeration et bordures nettes.",
      "Contrats saisonniers ou passages ponctuels selon vos besoins.",
    ],
    whyUs: [
      "Materiel professionnel adapte a toutes surfaces.",
      "Finitions impeccables bords et angles compris.",
      "Respect des rythmes de croissance saisonniers.",
    ],
    faq: [
      {
        question: "Combien de fois par mois intervenez-vous?",
        answer:
          "En periode de croissance active nous intervenons toutes les 1 a 2 semaines. En automne la frequence diminue.",
      },
      {
        question: "Evacuez-vous les dechets verts?",
        answer:
          "Oui, nous proposons le ramassage et l'evacuation des tontes ou le mulching selon votre preference.",
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
    slug: "taille-haies",
    label: "Taille de haies",
    short: "Haies, coniferes et arbustes en toutes saisons",
    body: [
      "Taille et mise en forme de haies de toutes essences: thuyas, lauriers, charmes, buis et autres.",
      "Nous intervenons dans le respect des periodes de floraison et de la biologie des vegetaux.",
    ],
    whyUs: [
      "Decoupe precise pour un rendu net et regulier.",
      "Respect de la sante et de la croissance des plantes.",
      "Ramassage des residus inclus.",
    ],
    faq: [
      {
        question: "A quelle periode faut-il tailler une haie de lauriers?",
        answer:
          "Generalement fin mai-juin apres la floraison, puis en aout-septembre pour une deuxieme coupe si necessaire.",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=800&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=800&q=80",
    ],
  },
  {
    slug: "creation-amenagement",
    label: "Creation et amenagement",
    short: "Conception de jardins sur mesure et amenagements",
    body: [
      "De la conception a la realisation: plans paysagers, choix des essences, circulation et volumes.",
      "Projets personnalises pour maisons individuelles, residences et espaces collectifs.",
    ],
    whyUs: [
      "Etude gratuite sur site.",
      "Vegetaux selectionnes pour leur adaptation au sol et au climat.",
      "Suivi post-plantation et conseils d'entretien.",
    ],
    faq: [
      {
        question: "Faites-vous les achats de vegetaux?",
        answer:
          "Oui, nous sourcons directement aupres de pepinieristes locaux pour garantir la qualite et la fraicheur.",
      },
      {
        question: "Combien coute la creation d'un jardin?",
        answer:
          "Tout depend de la superficie et des choix effectues. Nous etablissons un devis gratuit et detaille.",
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
    slug: "elagage-abattage",
    label: "Elagage et abattage",
    short: "Arbres, branches et souches: securite et proprete",
    body: [
      "Elagage d'entretien, reduction de couronne et abattage raisonne pour securiser vos espaces.",
      "Intervention avec equipements de securite et broyage des branches sur place.",
    ],
    whyUs: [
      "Travail en hauteur securise.",
      "Broyage des residus disponible.",
      "Respect des reglementations et des voisinages.",
    ],
    faq: [
      {
        question: "Peut-on abattre un arbre en zone habitee?",
        answer:
          "Oui, nous travaillons en technique de cordage en milieu contraint pour n'endommager aucune infrastructure.",
      },
      {
        question: "Que faire des souches apres abattage?",
        answer:
          "Nous proposons le dessouchage par fraisage ou manuel selon le type de terrain.",
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
    slug: "massifs-plantation",
    label: "Massifs et plantation",
    short: "Plantation de vivaces, arbustes et massifs fleuris",
    body: [
      "Mise en place de massifs floraux, vivaces, graminées et arbustes pour embellir durablement votre jardin.",
      "Conseils en association de plantes pour des massifs faciles a entretenir et attractifs toute l'annee.",
    ],
    whyUs: [
      "Choix des plantes adapte a votre sol et exposition.",
      "Massifs concus pour fleurir en plusieurs saisons.",
      "Paillage inclus pour limiter l'arrosage.",
    ],
    faq: [
      {
        question: "Proposez-vous des massifs sans entretien?",
        answer:
          "On ne peut pas garantir zero entretien, mais nous creeons des massifs a faible entretien avec des plantes robustes.",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
      "https://images.unsplash.com/photo-1467293622093-9f15c96be70f?w=800&q=80",
      "https://images.unsplash.com/photo-1598902468171-7c38408c3f97?w=800&q=80",
      "https://images.unsplash.com/photo-1560749003-f4b1e17e2dfd?w=800&q=80",
    ],
  },
  {
    slug: "terrassement-allee",
    label: "Terrassement et allees",
    short: "Nivellement, graviers, dallages et bordures",
    body: [
      "Preparation des sols, creation d'allees, poses de dalles et amenagements mineraux pour vos exterieurs.",
      "Travaux de terrassement soignes avant engazonnement ou creation de massifs.",
    ],
    whyUs: [
      "Deblaiement et nivellement de precision.",
      "Choix de materiaux locaux disponibles.",
      "Finitions durables et esthetiques.",
    ],
    faq: [
      {
        question: "Intervenez-vous pour une petite cour?",
        answer:
          "Absolument, nous adaptons notre materiel aux petites surfaces et aux acces difficiles.",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
  },
  {
    slug: "nettoyage-printemps",
    label: "Nettoyage et remise en etat",
    short: "Nettoyage de printemps, desherbage et remise en forme",
    body: [
      "Remise en etat complete apres l'hiver: desherbage, soufflage de feuilles, nettoyage de massifs et taille de printemps.",
      "Ideal pour un jardin propre et pret pour la belle saison en une seule intervention.",
    ],
    whyUs: [
      "Intervention rapide et complete.",
      "Evacuation de tous les dechets verts.",
      "Tarif fixe transparent, pas de surprise.",
    ],
    faq: [
      {
        question: "Pouvez-vous intervenir juste une fois pour le printemps?",
        answer:
          "Oui, nous proposons des interventions ponctuelles sans engagement de contrat annuel.",
      },
      {
        question: "Combien de temps prend un nettoyage de jardin?",
        answer:
          "Entre 2 et 6 heures selon la superficie et l'etat du jardin. Nous vous donnerons une estimation apres visite.",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
      "https://images.unsplash.com/photo-1590418606746-018840f9eda5?w=800&q=80",
      "https://images.unsplash.com/photo-1595228702420-f6ea0b27c2b5?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
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
        author: "Sophie L.",
        text: "Equipe serieuse et tres reactive. Le jardin est magnifique, on a enfin une belle haie bien taillee!",
        rating: 5,
      },
      {
        author: "Marc D.",
        text: "Tres bon rapport qualite-prix. Travail soigne pour la creation de nos massifs.",
        rating: 5,
      },
      {
        author: "Isabelle V.",
        text: "Je recommande sans hesiter, ponctuel et propre. Le jardin est impeccable apres leur passage.",
        rating: 5,
      },
    ],
  },
];
