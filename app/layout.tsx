import type { Metadata } from "next";
import { ViewerProvider } from "./context/ViewerContext";
import "./globals.css";
export const metadata: Metadata = {
  title: "KingFish HQ",
  description: "KingFish: the Happiest Meme Coin in the Seven Seas",
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
