import { FC } from "react";
import { AnimatedBGProps } from "./AnimatedBG.types";

const AnimatedBG: FC<AnimatedBGProps> = () => {
  return <div className="animated-bg absolute top-0 left-0 h-full w-full flex flex-col justify-center bg-orange-400/20 ">AnimatedBG</div>;
};

export default AnimatedBG;
