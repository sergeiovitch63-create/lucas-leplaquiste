import type { Metadata } from "next";
import FincasAdminClient from "./FincasAdminClient";

export const metadata: Metadata = {
  title: "Publink Back Office | Fincas Canarias",
  description:
    "Back office Fincas Canarias : gestion des produits, catégories, images et descriptions multilingues.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Publink Back Office | Fincas Canarias",
    description:
      "Interface d'administration Fincas Canarias (produits, catégories, images).",
    siteName: "Publink Back Office",
  },
};

export default function FincasAdminPage() {
  return <FincasAdminClient />;
}




