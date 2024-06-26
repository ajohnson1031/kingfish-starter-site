import { EcoCard, SlimMemberTierList, Tm } from "@/components";
import { useWallet } from "@solana/wallet-adapter-react";
import cn from "classnames";
import { FC } from "react";
import { EcosystemProps } from ".";

const Ecosystem: FC<EcosystemProps> = ({ ecocards }) => {
  const { publicKey } = useWallet();
  return (
    <div id="ecosystem">
      <div className={cn("md:w-3/4 flex justify-center pt-6 md:pt-12 relative mx-auto text-white -mt-5 md:mt-10", { "mt-64 md:mt-60": publicKey })}>
        <div className="flex justify-end">
          <div className="py-6 px-4 md:px-0 md:pr-6">
            <h2 className="text-4xl font-bold">Ecosystem</h2>
            <p className="text-lg">
              Life as a King<span className="text-orange-500">Fish</span>
              <Tm top="-top-1.5" color="text-orange-500" />
            </p>
            <p className="font-extralight py-4">
              From humble goldfish to formidable shark, and finally, a majestic whale, "KINGFISH" dominates the waters of the Solana Ocean, renowned for its insatiable appetite for
              KF coins.
            </p>
            <p className="font-extralight pb-4">
              As the shark, "KINGFISH" tirelessly patrols the vast expanse, honing its skills in the art of coin collection, ultimately hoping to become the most prominent
              collector in the realm.
            </p>
            <p className="font-bold">
              But the journey doesn't end there. On his way to becoming a whale, "KINGFISH" continues its relentless pursuit as others,{" "}
              <span className="text-orange-500">LIKE YOU</span>, embark on their own KF coin collecting odyssey.
            </p>
          </div>
        </div>
        <div className="hidden md:block bg-smallfish bg-contain bg-no-repeat w-6/12" />
      </div>

      <div className="md:w-3/4 mx-auto">
        <SlimMemberTierList />
      </div>

      <div className="md:w-3/4 flex flex-col md:flex-row justify-center py-6 md:py-12 relative mx-auto text-white gap-6 mt-3 md:mt-0">
        {ecocards.map((card, i) => (
          <EcoCard key={`${card.title}_${i}`} title={card.title} message={card.message} image={card.image || null} className="w-full md:w-1/3" />
        ))}
      </div>
    </div>
  );
};

export default Ecosystem;
