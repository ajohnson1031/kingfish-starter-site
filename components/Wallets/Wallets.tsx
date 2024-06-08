import { useViewerContext } from "@/app/context/ViewerContext";
import Img from "@/components/Img";
import { WalletsProps } from "./Wallets.types";

const Wallets = ({ select, wallets, publicKey, disconnect }: WalletsProps) => {
  const { setIsViewingWallet } = useViewerContext();

  return !publicKey ? (
    <div className="flex gap-4 flex-col w-72">
      {wallets.filter((wallet: any) => wallet.readyState === "Installed" && wallet.adapter.name === "Solflare").length > 0 ? (
        wallets
          .filter((wallet: any) => wallet.readyState === "Installed" && wallet.adapter.name === "Solflare")
          .map((wallet: any) => {
            console.log(wallet.adapter.name);
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
          Please download the&nbsp;
          <a href="https://solflare.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            Solflare Wallet
          </a>{" "}
          extension for your browser.
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
