import { FUCHSIA_GRADIENT } from "@/app/constants";
import { useViewerContext } from "@/app/context/ViewerContext";
import cuteIcon from "@/assets/cute-fish-icon-w-stroke.png";
import Button from "@/components/Button";
import Img from "@/components/Img";
import { getCurrentPresaleStageDetails, getKFBalance, getUnprivilegedUserBalance, toMbOrNone } from "@/lib/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import cn from "classnames";
import { FC, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { CurrentStageDetailsProps, PresaleWindowProps } from "./PresaleWindow.types";

const PresaleWindow: FC<PresaleWindowProps> = () => {
  const { isViewingPresale, setIsViewingPresale, setIsViewingWallet } = useViewerContext();
  const { publicKey, disconnect, wallet } = useWallet();
  const [opacity, setOpacity] = useState("opacity-0");
  const [privilegedAddresses, setPrivilegedAddresses] = useState<string[]>([]);
  const [kfBalance, setkfBalance] = useState("0");
  const [currentStageDetails, setCurrentStageDetails] = useState<CurrentStageDetailsProps | null>(null);

  const tm = <sup className="text-xs relative -top-2.5">™</sup>;

  useEffect(() => {
    if (isViewingPresale) {
      setOpacity("opacity-100");
      setPrivilegedAddresses(process.env.NEXT_PUBLIC_PRIVILEGED_ADDRESSES!.split("?"));
    } else setOpacity("opacity-0");
  }, [isViewingPresale]);

  useEffect(() => {
    if (publicKey) {
      // Get balance of privileged accounts
      if (privilegedAddresses.indexOf(publicKey.toBase58()) >= 0) {
        getKFBalance(publicKey!).then((r) => {
          const convertedBal: string = toMbOrNone(r);
          setkfBalance(convertedBal);
        });
      } else {
        getUnprivilegedUserBalance(publicKey.toBase58()).then((bal) => {
          const { totalKfBought } = bal;
          const convertedBal: string = toMbOrNone(totalKfBought);
          setkfBalance(convertedBal);
        });
      }
    } else {
      getCurrentPresaleStageDetails().then((data) => {
        setCurrentStageDetails({ ...data });
      });
    }
  }, [publicKey]);

  const pane = (
    <div className="flex">
      <div className="flex flex-col w-full">
        {!publicKey ? (
          <div className="flex flex-col gap-2 w-full">
            <p className="text-2xl text-orange-600 font-semibold">{toMbOrNone(currentStageDetails?.remainBal || 0)}</p>
            <p className="text-2xl text-orange-600 font-semibold">
              KingFish<sup className="text-xs relative -top-2.5">™</sup> remaining
            </p>
            <p className="font-light text-gray-300">Until 1 USDC = {currentStageDetails?.currentStage?.next_per_usdc} $KingFish</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full text-center">
            <p className="text-2xl text-white font-semibold mb-3 py-2 px-4 bg-vulcan-500/80 rounded-full">
              You have <span className="text-orange-600">{kfBalance}</span> KingFish{tm}
            </p>
            <p className="text-lg text-white font-bold">Connected Wallet</p>
            <p className="text-lg text-orange-600 font-bold overflow-hidden text-ellipsis">{publicKey.toBase58()}</p>
          </div>
        )}

        {publicKey && (
          <Button className={cn("flex mt-5 mx-auto items-center text-white", FUCHSIA_GRADIENT)} label={"Buy $KingFish"} onClick={() => alert("TODO: Add Buy Functionality")} />
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
        "w-[100vw] h-[calc(100vh-81px)] md:h-[calc(100vh-97px)] fixed top-[81px] md:top-[97px] left-0 z-30 p-10 flex transition-opacity ease-in duration-300 bg-presale bg-contain",
        { hidden: !isViewingPresale },
        opacity
      )}
    >
      {/* Container Div */}
      <div className="flex flex-col w-full md:w-1/2 h-full rounded-3xl mx-auto">
        <div className="flex flex-col w-full h-full">
          <FaXmark
            className={"w-14 h-14 text-white p-3 rounded-full box-border bg-red-400 hover:bg-red-500 ml-auto cursor-pointer relative z-10 top-6 left-6"}
            onClick={() => setIsViewingPresale(false)}
          />
          <div className="border-[3px] border-gray-300 rounded-3xl flex flex-col justify-center text-center gap-2 p-10 bg-vulcan-500/70 -mt-2">
            <Img src={cuteIcon} alt="cute fish icon" size={120} className="w-fit mx-auto" />
            <p className="text-3xl font-black text-white">{currentStageDetails?.currentStage?.title || "Stage One"} has started!</p>
            <p className="text-2xl text-gray-300 font-semibold">
              1 USDC = 20000 KingFish<sup className="text-xs relative -top-2.5">™</sup>
            </p>
            <div className="rounded-3xl p-2 w-full mx-auto">{pane}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresaleWindow;
