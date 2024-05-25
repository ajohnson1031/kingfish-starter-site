"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ViewerProps {
  isViewingWallet: boolean;
  setIsViewingWallet: Dispatch<SetStateAction<boolean>>;
  isViewingPresale: boolean;
  setIsViewingPresale: Dispatch<SetStateAction<boolean>>;
  isViewingComingSoon: boolean;
  setIsViewingComingSoon: Dispatch<SetStateAction<boolean>>;
}

const ViewerContext = createContext<ViewerProps>({
  isViewingWallet: false,
  setIsViewingWallet: () => {},
  isViewingPresale: false,
  setIsViewingPresale: () => {},
  isViewingComingSoon: false,
  setIsViewingComingSoon: () => {},
});

const ViewerProvider = ({ children }: { children: any }) => {
  const [isViewingWallet, setIsViewingWallet] = useState<boolean>(false);
  const [isViewingPresale, setIsViewingPresale] = useState<boolean>(false);
  const [isViewingComingSoon, setIsViewingComingSoon] = useState<boolean>(false);

  return (
    <ViewerContext.Provider value={{ isViewingWallet, setIsViewingWallet, isViewingPresale, setIsViewingPresale, isViewingComingSoon, setIsViewingComingSoon }}>
      {children}
    </ViewerContext.Provider>
  );
};

const useViewerContext = () => useContext(ViewerContext);

export { useViewerContext, ViewerProvider };
