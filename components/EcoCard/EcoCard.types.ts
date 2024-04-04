import { ReactNode } from "react";

export interface EcoCardProps {
  image?: any;
  title: string | ReactNode;
  message: string | ReactNode;
  className?: string;
}
