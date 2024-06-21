"use client";
import { VIOLET_GRADIENT } from "@/app/constants";
import { useViewerContext } from "@/app/context/ViewerContext";
import brandingIcon from "@/assets/branding.png";
import { Button, Img } from "@/components";
import { useWallet } from "@solana/wallet-adapter-react";
import cn from "classnames";
import { FC } from "react";
import { NavbarProps } from ".";
import { ButtonVariant } from "../Button";

const Navbar: FC<NavbarProps> = () => {
  const { setIsViewingWallet } = useViewerContext();
  const { publicKey } = useWallet();

  const navClass = "hover:text-orange-500";
  const navItems = [
    { val: "Home", offset: 0 },
    { val: "Ecosystem", offset: 150 },
    { val: "Tokenomics", offset: -150 },
    { val: "Roadmap", offset: -150 },
    { val: "Community", offset: -80 },
    { val: "Whitepaper", offset: 0 },
  ];

  const handleClick = (e: any, offset: number) => {
    e.preventDefault();
    if (e.target.name?.toLowerCase() !== "whitepaper")
      window.scrollTo({ top: document.getElementById(e.target?.name)?.getBoundingClientRect().top! + window.scrollY + offset, behavior: "smooth" });
    else window.open("./KINGFISH_Whitepaper.pdf", "_blank");
  };

  return (
    <div className="bg-vulcan-500 text-white font-bold grid grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-20 px-5 lg:px-10 py-4 items-center fixed top-0 left-0 z-50 w-full">
      <div className="col-span-1 lg:col-span-3">
        <a href="/" target="_blank" rel="noopener noreferrer">
          <Img src={brandingIcon} width={250} />
        </a>
      </div>
      <nav className="col-span-6 justify-between hidden lg:flex">
        {navItems.map((item, index) => (
          <button key={index} name={item.val.toLowerCase()} className={navClass} onClick={(e) => handleClick(e, item.offset)}>
            {item.val}
          </button>
        ))}
      </nav>
      <div className="flex-col col-span-1 lg:col-span-3 text-right">
        <Button
          className={cn("flex ml-auto items-center", { [VIOLET_GRADIENT]: !publicKey, "hover:bg-transparent": !!publicKey })}
          variant={!!publicKey ? ButtonVariant.SECONDARY : undefined}
          label={!!publicKey ? `${publicKey.toBase58().slice(0, 10)}...` : "Connect Wallet"}
          onClick={() => setIsViewingWallet(true)}
        />
      </div>
    </div>
  );
};

export default Navbar;
