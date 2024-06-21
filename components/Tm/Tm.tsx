import { FC } from "react";
import { TmProps } from ".";

const Tm: FC<TmProps> = ({ color = "text-orange-600", size = "text-lg", top = "-top-2.5" }) => {
  return <sup className={`text-xs relative ${top}  ${color} ${size}`}>™</sup>;
};

export default Tm;
