import { Ecosystem, HeroCard, Roadmap, Socials, Tokenomics } from "@/components";
import { ROADMAP } from "./constants";
export default function Home() {
  return (
    <main className="flex flex-col items-center px-5 lg:px-10 bg-vulcan-900">
      <HeroCard />
      <Socials />
      <Ecosystem />
      <Tokenomics />
      <Roadmap roadmapItems={ROADMAP} />
    </main>
  );
}
