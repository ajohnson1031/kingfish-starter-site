"use client";

import { CurrentStageDetailsProps } from "@/components/PresaleWindow";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ViewerProps {
  isViewingWallet: boolean;
  setIsViewingWallet: Dispatch<SetStateAction<boolean>>;
  isViewingPresale: boolean;
  setIsViewingPresale: Dispatch<SetStateAction<boolean>>;
  isViewingComingSoon: boolean;
  setIsViewingComingSoon: Dispatch<SetStateAction<boolean>>;
  currentStageDetails: CurrentStageDetailsProps | null;
  setCurrentStageDetails: Dispatch<SetStateAction<CurrentStageDetailsProps | null>>;
}

const ViewerContext = createContext<ViewerProps>({
  isViewingWallet: false,
  setIsViewingWallet: () => {},
  isViewingPresale: false,
  setIsViewingPresale: () => {},
  isViewingComingSoon: false,
  setIsViewingComingSoon: () => {},
  currentStageDetails: null,
  setCurrentStageDetails: () => {},
});

const ViewerProvider = ({ children }: { children: any }) => {
  const [isViewingWallet, setIsViewingWallet] = useState<boolean>(false);
  const [isViewingPresale, setIsViewingPresale] = useState<boolean>(false);
  const [isViewingComingSoon, setIsViewingComingSoon] = useState<boolean>(false);
  const [currentStageDetails, setCurrentStageDetails] = useState<CurrentStageDetailsProps | null>(null);

  return (
    <ViewerContext.Provider
      value={{
        isViewingWallet,
        setIsViewingWallet,
        isViewingPresale,
        setIsViewingPresale,
        isViewingComingSoon,
        setIsViewingComingSoon,
        currentStageDetails,
        setCurrentStageDetails,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
};

const useViewerContext = () => useContext(ViewerContext);

export { useViewerContext, ViewerProvider };
