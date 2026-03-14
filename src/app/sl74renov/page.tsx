import type { Metadata } from "next";
import { Sl74RenovContent } from "@/components/Sl74RenovContent";
import { sl74RenovCategories } from "@/data/sl74renov-categories";

export const metadata: Metadata = {
  title: "SL74 Rénov | Lucas Le Plaquiste",
  description:
    "SL74 Rénov - Tableau électrique, portails électrique, chauffage électrique, borne de recharge automobile. Devis gratuit. Intervention Occitanie.",
  icons: {
    icon: "/media/jobs/electricien.svg",
  },
};

export default function Sl74RenovPage() {
  return <Sl74RenovContent categories={sl74RenovCategories} />;
}
