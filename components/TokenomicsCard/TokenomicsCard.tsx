import { TOKENOMICS_GRADIENT } from "@/app/constants";
import cn from "classnames";
import { FC } from "react";
import { TokenomicsCardProps } from ".";

const TokenomicsCard: FC<TokenomicsCardProps> = ({ label, value }) => {
  return (
    <div className={cn("flex flex-col col-span-1 items-center gap-1 w-60 p-4 rounded-md", TOKENOMICS_GRADIENT)}>
      <p className="text-lg font-bold">{label}</p>
      <h2 className="h-0.5 rounded-full bg-gradient-to-r w-3/5" />
      <p className="text-md font-bold text-orange-400">{value}</p>
    </div>
  );
};

export default TokenomicsCard;
