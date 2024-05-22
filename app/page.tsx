"use client";
import { Community, Ecosystem, Footer, HeroCard, Navbar, Roadmap, Socials, Tokenomics } from "@/components";
import PresaleWindow from "@/components/PresaleWindow";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  CoinbaseWalletAdapter,
  LedgerWalletAdapter,
  MathWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TrezorWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import Head from "next/head";
import { useMemo } from "react";
import { COMMUNITY_CARDS, ECO_CARDS, ROADMAP } from "./constants";
import { useViewerContext } from "./context/ViewerContext";

export default function Home() {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new MathWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new TrustWalletAdapter(),
      new TrezorWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), []);
  const { isViewingPresale } = useViewerContext();

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <Head>
          <title>KingFish HQ</title>
          <meta name="description" content="KingFish: the Happiest Meme Coin in the Seven Seas" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <main className="flex flex-col items-center px-5 lg:px-10 bg-vulcan-900 bg-no-repeat">
          <Navbar />
          <HeroCard />
          <Socials />
          <Ecosystem ecocards={ECO_CARDS} />
          <Tokenomics />
          <Roadmap roadmapItems={ROADMAP} />
          <Community communityItems={COMMUNITY_CARDS} />
        </main>
        {!isViewingPresale && <Footer />}
        <PresaleWindow />
      </WalletProvider>
    </ConnectionProvider>
  );
}
