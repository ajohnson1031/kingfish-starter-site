import cn from "classnames";
import { FC } from "react";
import { ButtonProps } from "./Button.types";

const Button: FC<ButtonProps> = ({ variant = "primary", label, className, onClick }) => {
  let variantClass;

  switch (variant) {
    case "primary":
      variantClass = "bg-blue-400";
      break;
    case "secondary":
      variantClass = "border-2 box-border";
      break;
  }

  return (
    <button className={cn("px-8 py-3 rounded-full font-bold text-sm lg:text-xl max-h-12", variantClass, className)} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
