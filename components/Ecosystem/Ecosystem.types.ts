import { StaticImageData } from "next/image";

export interface EcosystemProps {
  ecocards: {
    title: string;
    message: string | JSX.Element;
    image: StaticImageData;
  }[];
}
