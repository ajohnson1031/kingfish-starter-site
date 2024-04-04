import { CYAN_GRADIENT } from "@/app/constants";
import { Img } from "@/components";
import cn from "classnames";
import { FC } from "react";
import { EcoCardProps } from ".";

const EcoCard: FC<EcoCardProps> = ({ image, title, message, className }) => {
  return (
    <div className={cn("flex flex-col items-center gap-4 text-white h-fit p-6 rounded-md", CYAN_GRADIENT, className)}>
      {image && <Img src={image} width={"100%"} height={"100%"} className="rounded-md overflow-hidden drop-shadow-md border-gradient-to-r" />}
      <p className="text-lg font-bold">{title}</p>
      <h2 className="h-0.5 w-full bg-gradient-to-r rounded-full" />
      <p className="text-md font-extralight">{message}</p>
    </div>
  );
};

export default EcoCard;
