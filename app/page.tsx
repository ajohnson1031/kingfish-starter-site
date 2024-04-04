import { Community, Ecosystem, HeroCard, Roadmap, Socials, Tokenomics } from "@/components";
import { COMMUNITY_CARDS, ROADMAP } from "./constants";
export default function Home() {
  return (
    <main className="flex flex-col items-center px-5 lg:px-10 bg-vulcan-900 bg-no-repeat">
      <HeroCard />
      <Socials />
      <Ecosystem />
      <Tokenomics />
      <Roadmap roadmapItems={ROADMAP} />
      <Community communityItems={COMMUNITY_CARDS} />
    </main>
  );
}
