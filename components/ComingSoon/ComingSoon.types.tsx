import { Dispatch, SetStateAction } from "react";

export interface ComingSoonProps {
  isViewingComingSoon: boolean;
  setIsViewingComingSoon: Dispatch<SetStateAction<boolean>>;
}
