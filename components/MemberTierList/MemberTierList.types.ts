import { StaticImageData } from "next/image";

export interface MemberTier {
  name: string;
  holdings: string;
  imgSrc: StaticImageData;
}

export interface MemberTierListProps {}
