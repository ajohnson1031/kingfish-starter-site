import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { FC } from "react";

const CustomTooltip: FC<TooltipProps> = (props) => {
  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} arrow placement="top" classes={{ popper: className }} />)(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));
  return <BootstrapTooltip title={props.title}>{props.children}</BootstrapTooltip>;
};

export default CustomTooltip;
