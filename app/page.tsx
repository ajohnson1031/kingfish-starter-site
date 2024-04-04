"use client";
import { AnimatedBG, Community, Ecosystem, Footer, HeroCard, Navbar, Roadmap, Socials, Tokenomics } from "@/components";
import { COMMUNITY_CARDS, ECO_CARDS, ROADMAP } from "./constants";
export default function Home() {
  return (
    <>
      <main className="min-h-[400px] h-fit flex flex-col items-center px-5 lg:px-10 bg-vulcan-900 bg-no-repeat">
        <Navbar />
        <HeroCard />
        <Socials />
        <Ecosystem ecocards={ECO_CARDS} />
        <Tokenomics />
        <Roadmap roadmapItems={ROADMAP} />
        <Community communityItems={COMMUNITY_CARDS} />
        <AnimatedBG />
      </main>{" "}
      <Footer />
    </>
  );
}
