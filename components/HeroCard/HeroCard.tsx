"use client";

import { FUCHSIA_GRADIENT, MEMBER_TIERS, OPACITY_FUCHSIA_GRADIENT, VIOLET_GRADIENT } from "@/app/constants";
import { useViewerContext } from "@/app/context/ViewerContext";
import cuteIcon from "@/assets/cute-fish-icon.png";
import herocard from "@/assets/cute-fish.png";
import { Button, Img, Socials, Tm, Wallets } from "@/components";
import { ButtonVariant } from "@/components/Button";
import { getTokenBalances, getUnprivilegedUserBalance } from "@/lib/utils/server";
import { getCurrentTier, toMbOrNone } from "@/lib/utils/static";
import { useWallet } from "@solana/wallet-adapter-react";
import cn from "classnames";
import { FC, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { ImgVariant } from "../Img";
import { HeroCardProps } from "./HeroCard.types";

const HeroCard: FC<HeroCardProps> = () => {
  const { isViewingWallet, setIsViewingWallet, setIsViewingPresale, userWallets, setUserWallets } = useViewerContext();
  const { select, wallets, publicKey, disconnect } = useWallet();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [btnText, setBtnText] = useState("Join Presale");
  // ! priviliged addresses to be removed when presale is over
  const [privilegedAddresses] = useState<string[]>(process.env.NEXT_PUBLIC_PRIVILEGED_ADDRESSES!.split("?"));
  const [kfBalance, setkfBalance] = useState("0");
  const [currentTier, setCurrentTier] = useState(MEMBER_TIERS[0]);

  const handleClick = (url?: string) => {
    window.open(url, "_blank");
  };

  const copyKF = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_TOKEN_MINT_ADDRESS!);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const handleBtnText = () => {
    if (publicKey) {
      // Get balance of privileged accounts
      const publicKeyString = publicKey.toBase58();

      if (privilegedAddresses.indexOf(publicKeyString) >= 0) {
        getTokenBalances(publicKey!).then((data) => {
          const { kfBalance: myBal } = data!;
          if (Number(myBal) > 0) setBtnText("Get More $KFSH");
          setkfBalance(myBal);
          setCurrentTier(() => getCurrentTier(myBal.toString()));
        });
      } else {
        getUnprivilegedUserBalance(publicKeyString).then((data) => {
          const { totalKfBought } = data;
          if (Number(totalKfBought) > 0) setBtnText("Get More $KFSH");
          setkfBalance(totalKfBought);
        });
      }
    }
  };

  useEffect(() => {
    handleBtnText();
    setUserWallets(wallets);
  }, [publicKey, wallets]);

  return (
    <div className="h-[70vh] md:h-screen mt-40 mb-20">
      {isViewingWallet && (
        <div className={`fixed right-10 top-28 z-50 p-4 bg-vulcan-500/80 rounded-sm flex  gap-3 ${!publicKey ? "flex-col" : "flex-row-reverse"}`}>
          <div className={`flex items-center text-white h-5 py-2 ${!publicKey ? "justify-between" : "justify-end"}`}>
            {!publicKey && <p>Available Wallets</p>}
            <FaXmark className="hover:text-red-400 transition duration-200 cursor-pointer" onClick={() => setIsViewingWallet(false)} />
          </div>
          <Wallets select={select} wallets={userWallets} publicKey={publicKey} disconnect={disconnect} />
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
          <Button className={FUCHSIA_GRADIENT} label={btnText} onClick={() => setIsViewingPresale(true)} />
          <Button className={VIOLET_GRADIENT} label="Whitepaper" onClick={() => handleClick("./KINGFISH_Whitepaper.pdf")} />
        </div>
      </div>
      {/* bg-herocard bg-85% md:bg-100% bg-[center_top_-2rem] bg-no-repeat h-[58.5%] md:h-[70%] lg:h-[75%] w-full  */}
      <div className="flex flex-col items-center">
        <div>
          <Img src={herocard} alt={"KingFish on Throne"} width={"650"} height={"650"} className="!h-[58.5%] md:!h-[70%] lg:!h-[75%] w-full -mt-8" />
        </div>
        {publicKey && (
          <div className="w-[88%] md:w-[62.5%] border-2 border-white/50 p-4 rounded-lg flex flex-col gap-2 font-semibold -mt-5 md:-mt-8 mb-8">
            <p className="text-lg text-white text-center">
              Your Current King<span className="text-orange-500">Fish</span>
              <Tm top="-top-1.5" /> Tier
            </p>
            <div className="flex justify-center">
              <Img src={currentTier.imgSrcLg.src} alt={currentTier.name} width={currentTier.imgSrcLg.w} />
            </div>
            <p className="text-white text-center">"{currentTier.name}"</p>
            <p className="text-white text-lg text-center">
              <span className="text-orange-500">{toMbOrNone(Number(kfBalance))}</span> $KFSH Tokens
            </p>
          </div>
        )}

        <div className={cn("w-fit max-h-24 flex items-center gap-4 rounded-lg p-6 text-white mb-8", OPACITY_FUCHSIA_GRADIENT, { "-mt-4 md:-mt-8": !publicKey })}>
          <Img src={cuteIcon} width={55} />
          <div className="hidden lg:block">
            <p>Solana Chain Address</p>
            <p>{process.env.NEXT_PUBLIC_TOKEN_MINT_ADDRESS!.slice(0, 17)}...</p>
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
        <Socials />
      </div>
    </div>
  );
};

export default HeroCard;
