import { MEMBER_TIERS as memberTiers } from "@/app/constants";
import { MemberTierListItem } from "@/components";
import { FC } from "react";
import { MemberTierListProps } from ".";

const MemberTierList: FC<MemberTierListProps> = () => {
  return (
    <div className="flex flex-col mt-4 mx-auto gap-2 text-white font-semibold">
      <p className="font-bold mb-4">
        Higher ranked King<span className="text-orange-500">Fish</span> holders receive
        <br />
        more SolanaOcean during planned <span className="text-orange-500">SEADROPS</span>
      </p>
      {memberTiers.map((memberTier, i) => (
        <MemberTierListItem key={`${memberTier.name}_${i}`} memberTier={memberTier} />
      ))}
    </div>
  );
};

export default MemberTierList;
