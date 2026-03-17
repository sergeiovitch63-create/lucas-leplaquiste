import type { Metadata } from "next";
import { PlombierLyonContent } from "@/components/PlombierLyonContent";
import { plombierLyonCategories } from "@/data/plombier-lyon-categories";

export const metadata: Metadata = {
  title: "Les Plombiers Lyonnais - Plombier Lyon 24h/24",
  description:
    "Les Plombiers Lyonnais - Dépannage plomberie, fuites d’eau, débouchage, chauffe-eau. Intervention 24h/24 et 7j/7 sur Lyon et sa métropole.",
  icons: {
    icon: "/media/vidange.png",
  },
  openGraph: {
    title: "Les Plombiers Lyonnais - Plombier Lyon 24h/24",
    description:
      "Dépannage plomberie, fuites d’eau, débouchage, chauffe-eau. Intervention 24h/24 et 7j/7 sur Lyon et sa métropole.",
    siteName: "Les Plombiers Lyonnais",
  },
  twitter: {
    card: "summary_large_image",
    title: "Les Plombiers Lyonnais - Plombier Lyon 24h/24",
    description:
      "Dépannage plomberie, fuites d’eau, débouchage, chauffe-eau. Intervention 24h/24 et 7j/7 sur Lyon et sa métropole.",
  },
};

export default function PlombierLyonPage() {
  return <PlombierLyonContent categories={plombierLyonCategories} />;
}

