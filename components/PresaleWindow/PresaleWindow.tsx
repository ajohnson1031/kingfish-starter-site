import { FUCHSIA_GRADIENT, PRESALE_STAGES } from "@/app/constants";
import { useViewerContext } from "@/app/context/ViewerContext";
import Button from "@/components/Button";

import { getKFBalance } from "@/lib/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import cn from "classnames";
import { FC, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { PresaleWindowProps } from "./PresaleWindow.types";

const PresaleWindow: FC<PresaleWindowProps> = () => {
  const { isViewingPresale, setIsViewingPresale, setIsViewingWallet } = useViewerContext();
  const { publicKey, disconnect, wallet } = useWallet();
  const [opacity, setOpacity] = useState("opacity-0");
  const { stage_one } = PRESALE_STAGES;
  const tm = <sup className="text-xs relative -top-2.5">™</sup>;

  useEffect(() => {
    if (isViewingPresale) setOpacity("opacity-100");
    else setOpacity("opacity-0");
  }, [isViewingPresale]);

  useEffect(() => {
    if (publicKey)
      (async () => {
        console.log(await getKFBalance(publicKey!));
      })();
  }, [publicKey]);

  const pane = (
    <div className="flex">
      <div className="flex flex-col w-full">
        {!publicKey ? (
          <div className="flex flex-col gap-2 w-full">
            {/* TODO: Make amount remaining dynamic */}
            <p className="text-2xl text-orange-600 font-semibold">{(stage_one.amt / 1000000000).toFixed(2)}B</p>
            <p className="text-2xl text-orange-600 font-semibold">
              KingFish<sup className="text-xs relative -top-2.5">™</sup> remaining
            </p>
            <p className="font-light">Until 1 USDC = 15000 $KingFish</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            {/* TODO: Add dynamic count of tokens here */}
            <p className="text-2xl text-orange-600 font-semibold mb-3">You have 0 KingFish{tm} tokens</p>
            <p className="text-md font-bold">Connected Wallet</p>
            <p className="text-sm">{publicKey.toBase58()}</p>
          </div>
        )}

        {publicKey && (
          <Button
            className={cn("flex mt-6 mx-auto items-center text-white", FUCHSIA_GRADIENT)}
            label={"Buy $KingFish"}
            onClick={!publicKey ? () => setIsViewingWallet(true) : () => disconnect()}
          />
        )}

        <Button
          className={cn("flex mt-6 mx-auto items-center text-white", FUCHSIA_GRADIENT)}
          label={!publicKey ? "Connect Wallet" : "Disconnect Wallet"}
          onClick={!publicKey ? () => setIsViewingWallet(true) : () => disconnect()}
        />
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "w-[100vw] h-[calc(100vh-97px)] fixed top-[97px] left-0 z-30 p-10 flex transition-opacity ease-in duration-300 bg-[#fedcaa]",
        { hidden: !isViewingPresale },
        opacity
      )}
    >
      {/* Container Div */}
      <div className="flex flex-1 flex-col w-full h-full rounded-3xl p-5 gap-5 bg-[#fffef5] shadow-lg">
        <FaXmark className={"w-12 h-12 text-red-400 ml-auto cursor-pointer"} onClick={() => setIsViewingPresale(false)} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full h-full px-3">
          <div className="border-[3px] border-gray-300 rounded-3xl flex flex-col justify-center text-center gap-2">
            <p className="text-5xl font-black text-black">
              {stage_one.title}
              <br />
              has started!
            </p>
            <p className="text-2xl text-gray-500 font-semibold">
              1 USDC = 20000 KingFish<sup className="text-xs relative -top-2.5">™</sup>
            </p>
            <div className="border-[3px] border-gray-300 rounded-3xl p-8 w-3/5 mx-auto mt-5">{pane}</div>
          </div>

          <div className="border border-red-400"></div>
        </div>
      </div>
    </div>
  );
};

export default PresaleWindow;
