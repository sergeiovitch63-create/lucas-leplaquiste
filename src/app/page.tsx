import { BackgroundShell } from "../components/BackgroundShell";
import { PhoneFrame } from "../components/PhoneFrame";
import { ProfileHeader } from "../components/ProfileHeader";
import { LinkList } from "../components/LinkList";
import { GlassCard } from "../components/GlassCard";
import { MadeByPublox } from "../components/MadeByPublox";

export default function Home() {
  return (
    <BackgroundShell priority>
      <PhoneFrame>
        <GlassCard>
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



