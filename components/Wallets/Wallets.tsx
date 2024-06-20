import { useViewerContext } from "@/app/context/ViewerContext";
import Img from "@/components/Img";
import { WalletsProps } from "./Wallets.types";

const Wallets = ({ select, wallets, publicKey, disconnect }: WalletsProps) => {
  const { setIsViewingWallet } = useViewerContext();

  const availableWallets = wallets.filter((wallet: any) => wallet.readyState === "Installed" || wallet.readyState === "Loadable" || wallet.readyState === "NotDetected");

  return !publicKey ? (
    <div className="flex gap-4 flex-col w-72">
      {availableWallets.length > 0 ? (
        availableWallets.map((wallet: any) => {
          return (
            <button
              className="w-full text-base flex gap-2 items-center justify-center bg-vulcan-300/60 py-2 rounded-sm hover:bg-vulcan-200/60 text-white"
              key={wallet.adapter.name}
              onClick={() => {
                select(wallet.adapter.name);
                setIsViewingWallet(false);
              }}
            >
              <Img src={wallet.adapter.icon} alt={wallet.adapter.name} />
              {wallet.adapter.name}
            </button>
          );
        })
      ) : (
        <div className="text-gray-300">
          <span className="text-red-300">No supported wallet found.</span>
          <br />
          Please download or connect a crypto wallet that supports Solana.
        </div>
      )}
    </div>
  ) : (
    <button className="w-full text-base flex items-center justify-center bg-vulcan-300/60 py-2 px-5 rounded-sm hover:bg-vulcan-200/60 text-white" onClick={() => disconnect()}>
      Disconnect Wallet
    </button>
  );
};

export default Wallets;
