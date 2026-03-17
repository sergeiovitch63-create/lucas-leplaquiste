import type { Sl74RenovCategory } from "@/data/sl74renov-categories";

export const plombierLyonCategories: Sl74RenovCategory[] = [
  {
    slug: "depannage-urgence",
    label: "Dépannage d’urgence 24h/24",
    short: "Intervention en moins de 30 minutes",
    body: [
      "Intervention rapide pour toute urgence plomberie : fuite importante, dégât des eaux, WC bouchés, absence totale d’eau, etc.",
      "Les Plombiers Lyonnais se déplacent 24h/24 et 7j/7 sur Lyon et sa métropole pour sécuriser votre installation.",
    ],
    whyUs: [
      "Disponibilité 24h/24 et 7j/7.",
      "Arrivée rapide sur place (souvent en moins de 30 minutes).",
      "Diagnostic clair avant chaque intervention.",
    ],
    faq: [
      {
        question: "En combien de temps pouvez-vous intervenir ?",
        answer:
          "En général, un plombier peut être sur place en moins de 30 minutes selon le secteur et la circulation.",
      },
      {
        question: "Intervenez-vous la nuit et le week-end ?",
        answer:
          "Oui, le service d’urgence est disponible 24h/24, 7j/7, y compris les jours fériés.",
      },
    ],
    images: ["/media/vidange.png"],
    hideGallery: true,
  },
  {
    slug: "fuite-eau",
    label: "Recherche et réparation de fuites",
    short: "Fuites apparentes et encastrées",
    body: [
      "Recherche de fuites sur vos canalisations, tuyaux encastrés, arrivées d’eau et évacuations.",
      "Réparation ciblée pour limiter les dégâts et éviter une surconsommation d’eau.",
    ],
    whyUs: [
      "Intervention rapide pour limiter les dégâts.",
      "Réparation durable et conforme aux règles de l’art.",
      "Conseils pour la prise en charge par l’assurance en cas de dégât des eaux.",
    ],
    faq: [
      {
        question: "Ma facture d’eau a explosé, que faire ?",
        answer:
          "Une fuite peut être en cause. Nous intervenons pour localiser et réparer la fuite, puis vous guider sur les démarches à effectuer.",
      },
      {
        question: "Pouvez-vous intervenir sans tout casser ?",
        answer:
          "Nous privilégions toujours les solutions les moins invasives possibles, selon l’accessibilité de la canalisation.",
      },
    ],
    images: [],
    hideGallery: true,
  },
  {
    slug: "debouchage",
    label: "Débouchage WC, éviers et canalisations",
    short: "WC bouchés, évier ou douche bloqués",
    body: [
      "Débouchage de WC, éviers, lavabos, douches et colonnes d’immeuble.",
      "Utilisation de matériels adaptés pour un débouchage efficace sans détériorer vos installations.",
    ],
    whyUs: [
      "Intervention rapide en cas de WC bouchés.",
      "Matériel professionnel (furet, pompe, haute pression selon le cas).",
      "Conseils pour éviter que le problème ne revienne.",
    ],
    faq: [
      {
        question: "Que faire en attendant le plombier ?",
        answer:
          "Évitez d’utiliser la chasse d’eau ou les arrivées d’eau concernées pour ne pas aggraver le bouchon. Nous intervenons rapidement.",
      },
    ],
    images: [],
    hideGallery: true,
  },
  {
    slug: "chauffe-eau",
    label: "Chauffe-eau et ballon d’eau chaude",
    short: "Panne d’eau chaude, remplacement de ballon",
    body: [
      "Diagnostic de panne sur votre chauffe-eau : plus d’eau chaude, température instable, odeurs ou bruits anormaux.",
      "Remplacement de ballon d’eau chaude avec conseils sur la capacité adaptée à votre foyer.",
    ],
    whyUs: [
      "Diagnostic précis avant tout remplacement.",
      "Propositions de modèles économiques et adaptés à votre consommation.",
      "Dépose de l’ancien appareil et mise en service du nouveau.",
    ],
    faq: [
      {
        question: "Quand faut-il remplacer un ballon d’eau chaude ?",
        answer:
          "En moyenne, un ballon tient 8 à 12 ans. Des fuites, bruits anormaux ou une eau qui ne chauffe plus peuvent indiquer qu’il est en fin de vie.",
      },
    ],
    images: ["/media/filtre-air.png"],
    hideGallery: true,
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
        author: "Client Google",
        text: "Intervention très rapide pour une fuite dans la salle de bain. Travail propre, plombier sympathique.",
        rating: 5,
      },
      {
        author: "Client satisfait",
        text: "WC débouchés en moins d’une heure après mon appel. Tarifs annoncés à l’avance.",
        rating: 5,
      },
    ],
  },
  {
    slug: "a-propos",
    label: "À propos",
    short: "",
    body: [
      "Les Plombiers Lyonnais interviennent sur Lyon et son agglomération pour tous vos besoins en plomberie.",
      "Dépannage d’urgence, recherche de fuites, débouchage, remplacement de chauffe-eau et travaux de plomberie générale.",
      "Disponibles 24h/24 et 7j/7, nous mettons la transparence des tarifs et la satisfaction client au centre de notre travail.",
    ],
    whyUs: [],
    faq: [],
    images: ["/media/vidange.png"],
    hideDevis: true,
    hideGallery: true,
  },
];

