import { Img } from "@/components";
import { FC } from "react";
import { MemberTierListItemProps } from "./MemberTierListItem.types";

const MemberTierListItem: FC<MemberTierListItemProps> = ({ memberTier }) => {
  const { name, holdings, imgSrc: img } = memberTier;

  return (
    <div className="flex gap-2 items-center justify-center text-white text-md w-fit">
      <div className="flex justify-end gap-2 w-fit">
        <p className="w-fit min-w-[180px] text-right">{holdings}</p>
        <span className="mx-1">=</span>
      </div>
      <div className="text-left w-[50px]">{name}</div>
      <div className="w-[50px] justify-start">
        <Img src={img} alt={name} size={45} />
      </div>
    </div>
  );
};

export default MemberTierListItem;
