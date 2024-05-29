import fish from "@/assets/fish.svg";
import { Img } from "@/components";
import { FC } from "react";
import { FishBowlProps } from ".";

const FishBowl: FC<FishBowlProps> = () => {
  return (
    <div className="w-full h-full">
      <Img src={fish} alt="fish" width={"100%"} height={"100%"} />
      <p className={"text-2xl text-white text-center relative -top-[10%] font-bold transition ease-in duration-200 delay-300"}>
        One moment, searching reefs
        <br />
        for friendly KING
        <span className="text-orange-500">FISH...</span>
      </p>
    </div>
  );
};

export default FishBowl;
