"use client";

import { FUCHSIA_GRADIENT, OPACITY_FUCHSIA_GRADIENT, VIOLET_GRADIENT } from "@/app/constants";
import cuteIcon from "@/assets/cute-fish-icon.png";
import { Button, Img } from "@/components";
import { ButtonVariant } from "@/components/Button";
import cn from "classnames";
import { FC } from "react";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { ImgVariant } from "../Img";
import { HeroCardProps } from "./HeroCard.types";

const handleClick = (url?: string) => {
  window.open(url, "_blank");
};

const HeroCard: FC<HeroCardProps> = () => {
  return (
    <div className="h-[75vh] md:h-screen mt-40 mb-20">
      <div className="px-0 lg:px-10 text-white text-center bg-vulcan-900">
        <h1 className="text-exo font-bold text-2xl md:text-4xl mb-4">
          The Happiest <span className="text-orange-500">Meme Coin</span> in the Seven Seas
        </h1>
        <p className="text-sm md:text-base mb-6">
          Inspired by the Solana Ecosystem & every fish in the world's oceans. <br className="hidden lg:block" /> A community-driven, uniquely rewarding system.
        </p>
        <div className="flex justify-center gap-3 md:gap-5">
          <Button className={FUCHSIA_GRADIENT} label="Buy on PinkSale" onClick={() => handleClick(process.env.NEXT_PUBLIC_PINKSALE_URL)} />
          <Button className={VIOLET_GRADIENT} label="Whitepaper" onClick={() => handleClick("https://example.com")} />
        </div>
      </div>
      <div className="bg-herocard bg-85% md:bg-100% bg-[center_top_-2rem] bg-no-repeat h-[52.5%] md:h-3/4 w-full flex justify-center items-end">
        <div className={cn("w-fit max-h-24 flex items-center gap-4 relative bottom-0 rounded-lg p-6 text-white", OPACITY_FUCHSIA_GRADIENT)}>
          <Img src={cuteIcon} width={55} />
          <div className="hidden lg:block">
            <p>Solana Chain Address</p>
            <p>0x000000000000000...</p>
          </div>
          <Button
            variant={ButtonVariant.SECONDARY}
            label={
              <div className="flex gap-0.5 md:gap-1">
                <Img src={HiOutlineClipboardDocumentList} type={ImgVariant.ICON} />
                <p className="hidden lg:block">Copy to Clipboard</p>
                <p className="block lg:hidden">Copy Solana Address</p>
              </div>
            }
            className="!text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
