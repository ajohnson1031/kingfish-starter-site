import { VIOLET_GRADIENT } from "@/app/constants";
import branding from "@/assets/branding.png";
import { Button, Img } from "@/components";
import { FC } from "react";
import { FooterProps } from "./Footer.types";

const Footer: FC<FooterProps> = () => {
  return (
    <div className="h-44 w-full bg-vulcan-500 px-5 md:px-10 relative bottom-0 left-0 z-50 mt-10 text-white flex flex-col justify-center items-center gap-3">
      <Img src={branding} width={200} />
      <h2 className="h-0.5 rounded-full bg-gradient-to-r from-vulcan-300 w-60" />
      <Button className={`${VIOLET_GRADIENT} !text-sm`} label="BUY PRESALE" onClick={() => window.open(process.env.NEXT_PUBLIC_PINKSALE_URL, "_blank")} />
    </div>
  );
};

export default Footer;
