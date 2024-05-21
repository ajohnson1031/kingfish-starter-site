import { CYAN_GRADIENT } from "@/app/constants";
import { useViewerContext } from "@/app/context/ViewerContext";
import { useWallet } from "@solana/wallet-adapter-react";
import cn from "classnames";
import { FC, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { PresaleWindowProps } from "./PresaleWindow.types";

const PresaleWindow: FC<PresaleWindowProps> = () => {
  const { isViewingPresale, setIsViewingPresale } = useViewerContext();
  const { publicKey } = useWallet();

  const [opacity, setOpacity] = useState("opacity-0");

  useEffect(() => {
    if (isViewingPresale) setOpacity("opacity-100");
    else setOpacity("opacity-0");
  }, [isViewingPresale]);

  return (
    <div
      className={cn(
        "w-[100vw] h-[100vh] fixed top-0 left-0 z-50 p-10 flex flex-col gap-5 transition-opacity ease-in duration-300",
        { hidden: !isViewingPresale },
        CYAN_GRADIENT,
        opacity
      )}
    >
      {/* Container Div */}
      <div className="bg-gradient-to-b from-vulcan-500/70 to-transparent-100 flex flex-1 w-full h-full rounded-md p-5">
        <FaXmark className={"w-12 h-12 text-white ml-auto cursor-pointer"} onClick={() => setIsViewingPresale(false)} />
      </div>
    </div>
  );
};

export default PresaleWindow;
