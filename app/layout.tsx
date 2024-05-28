import type { Metadata } from "next";
import { ViewerProvider } from "./context/ViewerContext";
import "./globals.css";
export const metadata: Metadata = {
  title: "KingFish - The Breakout Meme Coin of 2024",
  description:
    "Discover KingFish, the breakout meme coin of 2024. Join our decentralized community and explore unique features, robust technology on the Solana blockchain, and exciting growth opportunities.",
  applicationName: "KingFish™",
  generator: "NextJS",
  keywords: "KingFish, KFSH, meme coin, cryptocurrency, Solana blockchain, decentralized finance, crypto community, staking rewards, token exchange",
  viewport: { width: "device-width", initialScale: 1 },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ViewerProvider>{children}</ViewerProvider>
      </body>
    </html>
  );
}
