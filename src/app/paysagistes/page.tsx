import type { Metadata } from "next";
import { PaysagistesContent } from "@/components/PaysagistesContent";
import { paysagistesCategories } from "@/data/paysagistes-categories";

export const metadata: Metadata = {
  title: "Jardins & Paysages - Paysagiste Loire-Atlantique",
  description:
    "Paysagiste en Loire-Atlantique: tonte, taille de haies, creation de jardins, elagage, massifs et terrassement. Devis gratuit sur site.",
  openGraph: {
    title: "Jardins & Paysages - Paysagiste Loire-Atlantique",
    description:
      "Paysagiste en Loire-Atlantique: tonte, taille de haies, creation de jardins, elagage, massifs et terrassement. Devis gratuit sur site.",
    siteName: "Jardins & Paysages",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jardins & Paysages - Paysagiste Loire-Atlantique",
    description:
      "Paysagiste en Loire-Atlantique: tonte, taille de haies, creation de jardins, elagage, massifs et terrassement. Devis gratuit sur site.",
  },
};

export default function PaysagistesPage() {
  return <PaysagistesContent categories={paysagistesCategories} />;
}
