"use client";
import Img, { ImgVariant } from "@/components/Img";
import { FC } from "react";
import { FaDiscord, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { SocialsProps } from ".";

const Socials: FC<SocialsProps> = () => {
  return (
    <div className="flex flex-col gap-10 md:gap-12 text-white relative">
      {/* <div className="flex flex-col justify-center items-center">
        <p className="opacity-40 text-sm mb-3">CONTRACT AUDITED BY</p>
        <Img src={interfi} width={135} />
      </div> */}

      <div className="flex flex-col justify-center items-center">
        <p className="opacity-40 text-sm mb-3">COMMUNITY</p>
        <div className="flex gap-4">
          <a href={process.env.NEXT_PUBLIC_TWITTER_URL} target="_blank" rel="noopener noreferrer">
            <Img src={FaTwitter} type={ImgVariant.ICON} size={40} />
          </a>
          <a href={process.env.NEXT_PUBLIC_DISCORD_URL} target="_blank" rel="noopener noreferrer">
            <Img src={FaDiscord} type={ImgVariant.ICON} size={40} />
          </a>
          <a href={process.env.NEXT_PUBLIC_TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
            <Img src={FaTelegramPlane} type={ImgVariant.ICON} size={40} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Socials;
