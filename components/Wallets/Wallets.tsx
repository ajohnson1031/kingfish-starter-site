import { useWalletViewerContext } from "@/app/context/ViewWallet";
import Img from "@/components/Img";
import { WalletsProps } from "./Wallets.types";

const Wallets = ({ select, wallets, publicKey, disconnect }: WalletsProps) => {
  const { setIsViewing } = useWalletViewerContext();

  return !publicKey ? (
    <div className="flex gap-4 flex-col w-72">
      {wallets.filter((wallet: any) => wallet.readyState === "Installed").length > 0 ? (
        wallets
          .filter((wallet: any) => wallet.readyState === "Installed")
          .map((wallet: any) => (
            <button
              className="w-full text-base flex gap-2 items-center justify-center bg-vulcan-300/60 py-2 rounded-sm hover:bg-vulcan-200/60 text-white"
              key={wallet.adapter.name}
              onClick={() => {
                select(wallet.adapter.name);
                setIsViewing(false);
              }}
            >
              <Img src={wallet.adapter.icon} alt={wallet.adapter.name} />
              {wallet.adapter.name}
            </button>
          ))
      ) : (
        <p>No wallet found. Please download a supported Solana wallet</p>
      )}
    </div>
  ) : (
    <button className="w-full text-base flex items-center justify-center bg-vulcan-300/60 py-2 px-5 rounded-sm hover:bg-vulcan-200/60 text-white" onClick={() => disconnect()}>
      Disconnect Wallet
    </button>
  );
};

export default Wallets;
