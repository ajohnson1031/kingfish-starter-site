import { FUCHSIA_GRADIENT } from "@/app/constants";
import { Button, Img } from "@/components";
import cn from "classnames";
import { FC } from "react";
import { IconType } from "react-icons";
import { FaDiscord, FaExternalLinkAlt, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ButtonVariant } from "../Button";
import { ImgVariant } from "../Img";
import { CommunityCardProps } from "./CommunityCard.types";

const CommunityCard: FC<CommunityCardProps> = ({ title, url, image, description, buttonText, bgcolor, className }) => {
  const icons: Record<string, IconType> = {
    ["discord"]: FaDiscord,
    ["telegram"]: FaTelegramPlane,
    ["twitter"]: FaXTwitter,
  };

  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <div className={cn("w-full bg-gradient-to-b from-slate-600 to-orange-950 p-6 rounded flex flex-col gap-4", className)}>
      {/* ICON, TITLE & URL */}
      <div className="flex gap-3 justify-items-start" onClick={handleClick}>
        <div className={`${bgcolor} p-1.5 rounded-xl`}>
          <Img src={icons[image]} type={ImgVariant.ICON} size={30} />
        </div>
        <div>
          <p className="text-lg font-bold -mb-1">{title}</p>
          <p className="text-sm font-thin cursor-pointer hover:text-cyan-200">{url}</p>
        </div>
      </div>

      <p className="font-bold">{description}</p>

      <Button
        variant={ButtonVariant.PRIMARY}
        label={
          <div className="flex gap-0.5 md:gap-1 items-center">
            {buttonText}
            <Img src={FaExternalLinkAlt} type={ImgVariant.ICON} size={15} className={"-mt-0.5 drop"} />
          </div>
        }
        className={cn("w-fit pr-10", FUCHSIA_GRADIENT)}
        onClick={handleClick}
      />
    </div>
  );
};

export default CommunityCard;
