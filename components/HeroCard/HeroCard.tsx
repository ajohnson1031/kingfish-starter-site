"use client";

import { FUCHSIA_GRADIENT, KINGFISH_TOKEN_ADDY, OPACITY_FUCHSIA_GRADIENT, VIOLET_GRADIENT } from "@/app/constants";
import { useWalletViewerContext } from "@/app/context/ViewWallet";
import cuteIcon from "@/assets/cute-fish-icon.png";
import { Button, Img, Wallets } from "@/components";
import { ButtonVariant } from "@/components/Button";
import { useWallet } from "@solana/wallet-adapter-react";
import cn from "classnames";
import { FC, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { ImgVariant } from "../Img";
import { HeroCardProps } from "./HeroCard.types";

const HeroCard: FC<HeroCardProps> = () => {
  const { select, wallets, publicKey, disconnect } = useWallet();
  const { isViewing, setIsViewing } = useWalletViewerContext();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleClick = (url?: string) => {
    window.open(url, "_blank");
  };

  const copyKF = () => {
    navigator.clipboard.writeText(KINGFISH_TOKEN_ADDY);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <div className="h-[75vh] md:h-screen mt-40 mb-20">
      {isViewing && (
        <div className={`fixed right-10 top-28 z-50 p-4 bg-vulcan-200/30 rounded-sm flex  gap-4 ${!publicKey ? "flex-col" : "flex-row-reverse"}`}>
          <div className={`flex items-center text-white h-5 py-2 ${!publicKey ? "justify-between" : "justify-end"}`}>
            {!publicKey && <p>Available Wallets</p>}
            <FaXmark className="hover:text-red-400 transform duration-200 cursor-pointer" onClick={() => setIsViewing(false)} />
          </div>
          <Wallets select={select} wallets={wallets} publicKey={publicKey} disconnect={disconnect} />
        </div>
      )}
      <div className="px-0 lg:px-10 text-white text-center bg-vulcan-900">
        <h1 className="text-exo font-bold text-2xl md:text-4xl mb-4">
          The Happiest <span className="text-orange-500">Meme Coin</span> in the Seven Seas
        </h1>
        <p className="text-sm md:text-base mb-6">
          Inspired by the Solana Ecosystem & every fish in the world's oceans. <br className="hidden lg:block" /> A community-driven, uniquely rewarding system.
        </p>
        <div className="flex justify-center gap-3 md:gap-5">
          <Button className={FUCHSIA_GRADIENT} label="Buy Presale" onClick={() => handleClick(process.env.NEXT_PUBLIC_PINKSALE_URL)} />
          <Button className={VIOLET_GRADIENT} label="Whitepaper" onClick={() => handleClick("https://example.com")} />
        </div>
      </div>
      <div className="bg-herocard bg-85% md:bg-100% bg-[center_top_-2rem] bg-no-repeat h-[52.5%] md:h-3/4 w-full flex justify-center items-end">
        <div className={cn("w-fit max-h-24 flex items-center gap-4 relative bottom-0 rounded-lg p-6 text-white", OPACITY_FUCHSIA_GRADIENT)}>
          <Img src={cuteIcon} width={55} />
          <div className="hidden lg:block">
            <p>Solana Chain Address</p>
            <p>{KINGFISH_TOKEN_ADDY.slice(0, 17)}...</p>
          </div>
          <Button
            variant={ButtonVariant.SECONDARY}
            label={
              <div className="flex gap-0.5 md:gap-1 items-center">
                <Img src={HiOutlineClipboardDocumentList} type={ImgVariant.ICON} />
                <p className="hidden lg:block">Copy to Clipboard</p>
                <p className="block lg:hidden">Copy Solana Address</p>
                {isCopied && <Img src={FaCheck} type={ImgVariant.ICON} size={13} color="#4ADE80" className="ml-1" />}
              </div>
            }
            className="!text-sm"
            onClick={copyKF}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
