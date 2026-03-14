import type { Metadata } from "next";
import { Sl74RenovContent } from "@/components/Sl74RenovContent";
import { sl74RenovCategories } from "@/data/sl74renov-categories";

export const metadata: Metadata = {
  title: "SL74 Rénov - Électricité Haute Savoie",
  description:
    "SL74 Rénov - Tableau électrique, portails électrique, chauffage électrique, borne de recharge. Devis gratuit. Intervention Haute Savoie.",
  icons: {
    icon: "/media/jobs/electricien.svg",
  },
  openGraph: {
    title: "SL74 Rénov - Électricité Haute Savoie",
    description:
      "SL74 Rénov - Tableau électrique, portails électrique, chauffage électrique, borne de recharge. Devis gratuit. Intervention Haute Savoie.",
    siteName: "SL74 Rénov",
  },
  twitter: {
    card: "summary_large_image",
    title: "SL74 Rénov - Électricité Haute Savoie",
    description:
      "SL74 Rénov - Tableau électrique, portails électrique, chauffage électrique, borne de recharge. Devis gratuit. Intervention Haute Savoie.",
  },
};

export default function Sl74RenovPage() {
  return <Sl74RenovContent categories={sl74RenovCategories} />;
}
