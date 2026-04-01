import { BackgroundShell } from "../components/BackgroundShell";
import { PhoneFrame } from "../components/PhoneFrame";
import { ProfileHeader } from "../components/ProfileHeader";
import { LinkList } from "../components/LinkList";
import { getLucasPagesConfig, getLucasSiteConfig } from "@/lib/lucas-site-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const siteConfig = await getLucasSiteConfig();
  const pagesConfig = await getLucasPagesConfig(siteConfig);
  const homeBackground = pagesConfig["/"]?.thumbnail || "/media/accueil/fond-ecrans.jpg";

  return (
    <BackgroundShell backgroundImage={homeBackground}>
      <PhoneFrame>
        <div className="space-y-7">
          <ProfileHeader />
          <LinkList />
        </div>
      </PhoneFrame>
    </BackgroundShell>
  );
}



