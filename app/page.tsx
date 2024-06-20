"use client";
import { ComingSoon, Community, Ecosystem, Footer, HeroCard, Navbar, Roadmap, Socials, Tokenomics } from "@/components";
import PresaleWindow from "@/components/PresaleWindow";
import { getCurrentPresaleStageDetails } from "@/lib/utils/server";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { LedgerWalletAdapter, PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter, TrezorWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import Head from "next/head";
import { useEffect, useMemo } from "react";
import { COMMUNITY_CARDS, ECO_CARDS, ROADMAP } from "./constants";
import { useViewerContext } from "./context/ViewerContext";

export default function Home() {
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new LedgerWalletAdapter(), new TorusWalletAdapter(), new TrezorWalletAdapter()], []);

  const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), []);
  const { isViewingPresale, isViewingComingSoon, setIsViewingComingSoon, setCurrentStageDetails } = useViewerContext();

  useEffect(() => {
    getCurrentPresaleStageDetails().then((data) => {
      setCurrentStageDetails({ ...data });
    });
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <Head>
          <title>KingFish - The Breakout Meme Coin of 2024</title>
          <meta
            name="description"
            content="Discover KingFish, the breakout meme coin of 2024. Join our decentralized community and explore unique features, robust technology on the Solana blockchain, and exciting growth opportunities."
          />
          <meta name="keywords" content="KingFish, KFSH, meme coin, cryptocurrency, Solana blockchain, decentralized finance, crypto community, staking rewards, token exchange" />
          <meta name="author" content="KingFish Team" />

          <meta property="og:title" content="KingFish - The Breakout Meme Coin of 2024" />
          <meta
            property="og:description"
            content="Join KingFish and be part of a revolutionary community-driven cryptocurrency. Explore our features, robust technology, and potential for significant growth."
          />
          <meta property="og:image" content="https://kingfish.app/kingfish-logo.png" />
          <meta property="og:url" content="https://kingfish.app" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="KingFish - The Breakout Meme Coin of 2024" />
          <meta
            name="twitter:description"
            content="Discover KingFish, a revolutionary meme coin on the Solana blockchain. Join our community and explore unique features and growth opportunities."
          />
          <meta name="twitter:image" content="https://kingfish.app/kingfish-logo.png" />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="canonical" href="https://kingfish.app" />
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
        {!isViewingPresale && !isViewingComingSoon && <Footer />}
        {isViewingComingSoon && <ComingSoon isViewingComingSoon={isViewingComingSoon} setIsViewingComingSoon={setIsViewingComingSoon} />}
        {isViewingPresale && <PresaleWindow />}
      </WalletProvider>
    </ConnectionProvider>
  );
}
