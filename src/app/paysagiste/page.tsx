import type { Metadata } from "next";
import { PaysagisteContent } from "@/components/PaysagisteContent";
import { paysagisteCategories } from "@/data/paysagiste-categories";

export const metadata: Metadata = {
  title: "Paysagiste - Entretien et creation de jardins Haute-Savoie",
  description:
    "Paysagiste en Haute-Savoie: tonte, taille de haies, creation de jardins, engazonnement, terrassement, clotures et arrosage automatique. Devis gratuit.",
  icons: {
    icon: "/paysagiste/placeholder.jpg",
  },
  openGraph: {
    title: "Paysagiste - Entretien et creation de jardins Haute-Savoie",
    description:
      "Paysagiste en Haute-Savoie: tonte, taille de haies, creation de jardins, engazonnement, terrassement, clotures et arrosage automatique. Devis gratuit.",
    siteName: "Paysagiste",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paysagiste - Entretien et creation de jardins Haute-Savoie",
    description:
      "Paysagiste en Haute-Savoie: tonte, taille de haies, creation de jardins, engazonnement, terrassement, clotures et arrosage automatique. Devis gratuit.",
  },
};

export default function PaysagistePage() {
  return <PaysagisteContent categories={paysagisteCategories} />;
}
