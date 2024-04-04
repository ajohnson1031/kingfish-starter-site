"use client";
import { VIOLET_GRADIENT } from "@/app/constants";
import brandingIcon from "@/assets/branding.png";
import { Button, Img } from "@/components";
import { FC } from "react";
import { NavbarProps } from ".";

const Navbar: FC<NavbarProps> = () => {
  const navClass = "hover:text-orange-500";
  const navItems = [
    { val: "Home", offset: 0 },
    { val: "Ecosystem", offset: -40 },
    { val: "Tokenomics", offset: -150 },
    { val: "Roadmap", offset: -150 },
    { val: "Community", offset: -80 },
    { val: "Whitepaper", offset: 0 },
  ];

  const handleClick = (e: any, offset: number) => {
    e.preventDefault();
    window.scrollTo({ top: document.getElementById(e.target?.name)?.getBoundingClientRect().top! + window.scrollY + offset, behavior: "smooth" });
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
        <Button className={VIOLET_GRADIENT} label="BUY PRESALE" onClick={() => window.open(process.env.NEXT_PUBLIC_PINKSALE_URL, "_blank")} />
      </div>
    </div>
  );
};

export default Navbar;
