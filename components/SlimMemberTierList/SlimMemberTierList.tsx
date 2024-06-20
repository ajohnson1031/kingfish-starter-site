import { MEMBER_TIERS as memberTiers } from "@/app/constants";
import { MemberTierListItem } from "@/components";
import { MemberTierListProps } from "@/components/MemberTierList";
import { FC } from "react";

const SlimMemberTierList: FC<MemberTierListProps> = () => {
  return (
    <div className="flex flex-col mx-auto gap-2 text-white px-4 md:px-0">
      <p className="mb-4 font-bold">
        Higher ranked King<span className="text-orange-500">Fish</span> holders receive more SolanaOcean during planned <span className="text-orange-500">SEADROPS</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {memberTiers.map((memberTier, i) => (
          <div className="bg-vulcan-300 py-1 rounded-[4px] flex justify-center">
            <MemberTierListItem key={`${memberTier.name}_${i}`} memberTier={memberTier} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlimMemberTierList;
