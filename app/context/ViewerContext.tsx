"use client";

import { CurrentStageDetailsProps } from "@/components/PresaleWindow";
import { Wallet } from "@solana/wallet-adapter-react";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ViewerProps {
  isViewingWallet: boolean;
  setIsViewingWallet: Dispatch<SetStateAction<boolean>>;
  isViewingPresale: boolean;
  setIsViewingPresale: Dispatch<SetStateAction<boolean>>;
  isViewingComingSoon: boolean;
  setIsViewingComingSoon: Dispatch<SetStateAction<boolean>>;
  isViewingRankings: boolean;
  setIsViewingRankings: Dispatch<SetStateAction<boolean>>;
  currentStageDetails: CurrentStageDetailsProps | null;
  setCurrentStageDetails: Dispatch<SetStateAction<CurrentStageDetailsProps | null>>;
  userWallets: Wallet[];
  setUserWallets: Dispatch<SetStateAction<Wallet[]>>;
}

const ViewerContext = createContext<ViewerProps>({
  isViewingWallet: false,
  setIsViewingWallet: () => {},
  isViewingPresale: false,
  setIsViewingPresale: () => {},
  isViewingComingSoon: false,
  setIsViewingComingSoon: () => {},
  isViewingRankings: false,
  setIsViewingRankings: () => {},
  currentStageDetails: null,
  setCurrentStageDetails: () => {},
  userWallets: [],
  setUserWallets: () => {},
});

const ViewerProvider = ({ children }: { children: any }) => {
  const [isViewingWallet, setIsViewingWallet] = useState<boolean>(false);
  const [isViewingPresale, setIsViewingPresale] = useState<boolean>(false);
  const [isViewingComingSoon, setIsViewingComingSoon] = useState<boolean>(false);
  const [isViewingRankings, setIsViewingRankings] = useState<boolean>(false);
  const [currentStageDetails, setCurrentStageDetails] = useState<CurrentStageDetailsProps | null>(null);
  const [userWallets, setUserWallets] = useState<Wallet[]>([]);

  return (
    <ViewerContext.Provider
      value={{
        isViewingWallet,
        setIsViewingWallet,
        isViewingPresale,
        setIsViewingPresale,
        isViewingComingSoon,
        setIsViewingComingSoon,
        isViewingRankings,
        setIsViewingRankings,
        currentStageDetails,
        setCurrentStageDetails,
        userWallets,
        setUserWallets,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
};

const useViewerContext = () => useContext(ViewerContext);

export { useViewerContext, ViewerProvider };
