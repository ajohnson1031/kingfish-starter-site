import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface WalletViewerProps {
  isViewing: boolean;
  setIsViewing: Dispatch<SetStateAction<boolean>>;
}

const WalletViewerContext = createContext<WalletViewerProps>({ isViewing: false, setIsViewing: () => {} });

const WalletViewerProvider = ({ children }: { children: any }) => {
  const [isViewing, setIsViewing] = useState<boolean>(false);

  return <WalletViewerContext.Provider value={{ isViewing, setIsViewing }}>{children}</WalletViewerContext.Provider>;
};

const useWalletViewerContext = () => useContext(WalletViewerContext);

export { useWalletViewerContext, WalletViewerProvider };
