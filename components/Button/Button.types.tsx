export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface ButtonProps {
  variant?: ButtonVariant;
  label: string | JSX.Element;
  className?: string;
  onClick?: () => void;
}
