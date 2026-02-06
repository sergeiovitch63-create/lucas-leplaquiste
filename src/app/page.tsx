import type { Metadata } from "next";
import { BackgroundShell } from "../components/BackgroundShell";
import { PhoneFrame } from "../components/PhoneFrame";
import { ProfileHeader } from "../components/ProfileHeader";
import { LinkList } from "../components/LinkList";
import { GlassCard } from "../components/GlassCard";
import { MadeByPublox } from "../components/MadeByPublox";

export const metadata: Metadata = {
  icons: {
    icon: "/media/accueil/logo.png",
  },
};

export default function Home() {
  return (
    <BackgroundShell>
      <PhoneFrame>
        <GlassCard backgroundImage="/media/accueil/fond-ecrans.jpg">
          <div className="space-y-7">
            <ProfileHeader />
            <LinkList />
            <MadeByPublox />
          </div>
        </GlassCard>
      </PhoneFrame>
    </BackgroundShell>
  );
}



