import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { BackgroundShell } from "../components/BackgroundShell";
import { PhoneFrame } from "../components/PhoneFrame";
import { ProfileHeader } from "../components/ProfileHeader";
import { LinkList } from "../components/LinkList";

export const metadata: Metadata = {
  icons: {
    icon: "/media/accueil/logo.png",
  },
};

export default async function Home() {
  // Détecter le domaine et rediriger vers ABN Revêtement si nécessaire
  const headersList = headers();
  const host = headersList.get("host");

  // Si c'est le domaine publink-teamplates, rediriger vers ABN Revêtement
  if (host?.includes("publink-teamplates")) {
    redirect("/m/abn-revetement");
  }

  // Sinon, afficher la page normale
  return (
    <BackgroundShell backgroundImage="/media/accueil/fond-ecrans.jpg">
      <PhoneFrame>
        <div className="space-y-7">
          <ProfileHeader />
          <LinkList />
        </div>
      </PhoneFrame>
    </BackgroundShell>
  );
}



