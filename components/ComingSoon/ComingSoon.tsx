import cuteIcon from "@/assets/cute-fish-icon-w-stroke.png";
import { Img } from "@/components";
import cn from "classnames";
import { FC, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { ComingSoonProps } from "./ComingSoon.types";

const ComingSoon: FC<ComingSoonProps> = ({ isViewingComingSoon, setIsViewingComingSoon }) => {
  const [opacity, setOpacity] = useState("opacity-0");

  useEffect(() => {
    if (isViewingComingSoon) {
      setOpacity("opacity-100");
    } else setOpacity("opacity-0");
  }, [isViewingComingSoon]);

  return (
    <div
      className={cn(
        "w-[100vw] h-[calc(100vh-81px)] md:h-[calc(100vh-97px)] fixed top-[81px] md:top-[97px] left-0 z-30 p-10 transition-opacity ease-in duration-300 bg-presale bg-contain",
        { hidden: !isViewingComingSoon, flex: isViewingComingSoon },
        opacity
      )}
    >
      {/* Container Div */}
      <div className="flex flex-col w-full md:w-1/2 h-full rounded-3xl mx-auto">
        <div className="flex flex-col w-full h-full">
          <div className="border-[3px] border-gray-300 rounded-3xl flex flex-col justify-start text-center gap-2 p-10 -mt-2 transition-all duration-200 bg-vulcan-500/80 h-[578px]">
            <FaXmark
              className="w-11 h-11 text-white p-2 rounded-full box-border bg-red-400 hover:bg-red-500 ml-auto cursor-pointer relative z-10 -top-5 left-6"
              onClick={() => setIsViewingComingSoon(false)}
            />
            <Img src={cuteIcon} alt="cute fish icon" size={120} className={`w-fit mx-auto mt-16 mb-4`} />
            <p className="text-4xl text-white font-bold text-center">
              Stay Tuna'd
              <br />
              Coming Soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
