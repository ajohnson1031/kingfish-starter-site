"use client";
import { imgLoader } from "@/lib/utils/imgLoader";
import cn from "classnames";
import Image from "next/image";
import { FC } from "react";
import { ImgProps, ImgVariant } from ".";

const Img: FC<ImgProps> = ({ src, type = ImgVariant.STATIC_IMAGE, width, height, size = 20, color, className = "", alt = "" }) => {
  let Component;
  if (type === ImgVariant.STATIC_IMAGE) {
    Component = <Image src={src} width={width || size} height={height || size} alt={alt} loader={imgLoader} />;
  }

  if (type === ImgVariant.ICON) {
    Component = src;
  }

  const renderedComponent = type === ImgVariant.STATIC_IMAGE ? Component : <Component size={size} color={color} title={alt} />;

  return <div className={cn(`!h-[${size}] !w-[${size}px]`, className)}>{renderedComponent}</div>;
};

export default Img;
