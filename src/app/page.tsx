import type { Metadata } from "next";
import { BackgroundShell } from "../components/BackgroundShell";
import { PhoneFrame } from "../components/PhoneFrame";
import { ProfileHeader } from "../components/ProfileHeader";
import { LinkList } from "../components/LinkList";

export const metadata: Metadata = {
  icons: {
    icon: "/media/accueil/logo.png",
  },
};

export default function Home() {
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



