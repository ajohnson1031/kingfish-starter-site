import community from "@/assets/community.jpg";
import lplocked from "@/assets/lp-locked.jpg";
import rewards from "@/assets/rewards.jpg";
import { EcoCard } from "@/components";
import { FC } from "react";
import { EcosystemProps } from ".";

const Ecosystem: FC<EcosystemProps> = () => {
  const ecocards: Record<string, any>[] = [
    {
      title: "Rewards",
      message: (
        <>
          Early holders of <span className="font-bold">KINGFISH</span> tokens will be rewarded with an airdrop of our <span className="underline">utility token</span>,{" "}
          <span className="font-bold">SOLANAOCEAN</span>, when it launches. The more KF tokens you are holding the more SOLANAOCEAN you will receive.
        </>
      ),
      image: rewards,
    },
    {
      title: "Community",
      message:
        "We're dedicated to empowering the Solana Ocean and KINGFISH community, positioning it as a leading entity in the crypto landscape through a spectrum of rewards, including airdrops, exclusive early access to specialized updates, and spontaneous random drops, alongside a suite of utilities like in-app communications and peer-to-peer sharing, all strategically outlined within our product roadmap.",
      image: community,
    },
    {
      title: "Locked LP",
      message:
        "In the Solana Ocean ecosystem, our liquidity is securely locked, serving as the cornerstone of stability. This personal safeguard shields our community from volatility, nurturing trust and sustainability in our decentralized finance journey.",
      image: lplocked,
    },
  ];

  return (
    <div id="ecosystem">
      <div className="md:w-3/4 flex justify-center py-6 md:py-12 relative mx-auto text-white mt-10">
        <div className="flex justify-end">
          <div className="py-6 px-4 md:px-0 md:pr-6">
            <h2 className="text-4xl font-bold">Ecosystem</h2>
            <p className="text-lg">
              KingFish <span className="text-cyan-400">Ecosystem</span>
            </p>
            <p className="font-extralight py-4">
              From humble goldfish to formidable shark, and finally, a majestic whale, "KINGFISH" dominates the waters of Solana Ocean, renowned for its insatiable appetite for KF
              coins.
            </p>
            <p className="font-extralight pb-4">
              As the shark, "KINGFISH" tirelessly patrolled the vast expanse, honing its skills in the art of coin collection, ultimately becoming the prominent collector in the
              realm.
            </p>
            <p className="font-bold">
              But the journey didn't end there. Transformed into a whale, "KINGFISH" continued its relentless pursuit as others, <span className="text-orange-400">LIKE YOU</span>,
              embarked on their own KF coin collecting odyssey.
            </p>
          </div>
        </div>
        <div className="hidden md:block bg-smallfish bg-contain bg-no-repeat w-6/12" />
      </div>
      <div className="md:w-3/4 flex flex-col md:flex-row justify-center py-6 md:py-12 relative mx-auto text-white gap-6 -mt-10 md:-mt-20">
        {ecocards.map((card, i) => (
          <EcoCard key={`${card.title}_${i}`} title={card.title} message={card.message} image={card.image || null} className="w-full md:w-1/3" />
        ))}
      </div>
    </div>
  );
};

export default Ecosystem;
