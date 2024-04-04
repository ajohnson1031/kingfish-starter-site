import { ReactNode } from "react";

export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface ButtonProps {
  variant?: ButtonVariant;
  label: string | ReactNode;
  className?: string;
  onClick?: () => void;
}
