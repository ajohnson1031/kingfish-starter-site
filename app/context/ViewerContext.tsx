"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ViewerProps {
  isViewingWallet: boolean;
  setIsViewingWallet: Dispatch<SetStateAction<boolean>>;
  isViewingPresale: boolean;
  setIsViewingPresale: Dispatch<SetStateAction<boolean>>;
}

const ViewerContext = createContext<ViewerProps>({ isViewingWallet: false, setIsViewingWallet: () => {}, isViewingPresale: false, setIsViewingPresale: () => {} });

const ViewerProvider = ({ children }: { children: any }) => {
  const [isViewingWallet, setIsViewingWallet] = useState<boolean>(false);
  const [isViewingPresale, setIsViewingPresale] = useState<boolean>(false);

  return <ViewerContext.Provider value={{ isViewingWallet, setIsViewingWallet, isViewingPresale, setIsViewingPresale }}>{children}</ViewerContext.Provider>;
};

const useViewerContext = () => useContext(ViewerContext);

export { useViewerContext, ViewerProvider };
