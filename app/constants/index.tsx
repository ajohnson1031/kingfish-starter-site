import community from "@/assets/community.jpg";
import danio from "@/assets/danio.png";
import guppy from "@/assets/guppy.png";
import lplocked from "@/assets/lp-locked.jpg";
import manta from "@/assets/manta.png";
import marlin from "@/assets/marlin.png";
import rewards from "@/assets/rewards.jpg";
import shark from "@/assets/shark.png";
import trout from "@/assets/trout.png";
import whale from "@/assets/whale.png";

import danioLg from "@/assets/danio-lg.png";
import guppyLg from "@/assets/guppy-lg.png";
import mantaLg from "@/assets/manta-lg.png";
import marlinLg from "@/assets/marlin-lg.png";
import sharkLg from "@/assets/shark-lg.png";
import troutLg from "@/assets/trout-lg.png";
import whaleLg from "@/assets/whale-lg.png";

const FUCHSIA_GRADIENT: string = "bg-gradient-to-r from-fuchsia-500 to-orange-400 hover:from-fuchsia-600 hover:to-orange-500";
const OPACITY_FUCHSIA_GRADIENT: string = "bg-gradient-to-r from-fuchsia-500/50 to-orange-400/50";
const VIOLET_GRADIENT: string = "bg-gradient-to-r from-violet-400 to-cyan-500 hover:from-violet-500 hover:to-cyan-600";
const OPACITY_VIOLET_GRADIENT: string = "bg-gradient-to-r from-violet-400/50 to-cyan-500/50";
const CYAN_GRADIENT: string = "bg-gradient-to-b from-cyan-500 to-sky-950";
const OPACITY_CYAN_GRADIENT: string = "bg-gradient-to-r from-cyan-500/50 to-sky-950/50";
const OPACITY_SKY_GRADIENT = "bg-gradient-to-r from-sky-500/50 to-violet-500/20";
const TOKENOMICS_GRADIENT: string = "bg-gradient-to-b from-fuchsia-500 to-slate-950";

const ROADMAP = [
  {
    title: "Stage One: Initial Launch",
    items: [
      {
        description: "Mint initial tokens",
        completed: true,
      },
      {
        description: (
          <>
            Develop KINGFISH<sup className="text-[6px] relative -top-2">TM</sup> website
          </>
        ),
        completed: true,
      },
      {
        description: "Launch Presale",
        completed: true,
      },
    ],
  },
  {
    title: "Stage Two: Marketing",
    items: [
      {
        description: "CoinGecko listing",
        completed: false,
      },
      {
        description: "CoinMarketCap listing",
        completed: false,
      },
    ],
  },
  {
    title: "Stage Three: Solana Ocean Launch",
    items: [
      {
        description: "Solana Ocean project launch",
        completed: false,
      },
      {
        description: `Basic ocean is started\n(P2P Wallet Visibility)`,
        completed: false,
      },
    ],
  },
  {
    title: "Stage Four: Airdrop",
    items: [
      {
        description: (
          <>
            Airdrop Solana Ocean tokens to all existing KINGFISH<sup className="text-[6px] relative -top-2">TM</sup> token holders
          </>
        ),
        completed: false,
      },
    ],
  },
  {
    title: "Stage Five: Advanced Features",
    items: [
      {
        description: "Solana Ocean project development",
        completed: false,
      },
      {
        description: (
          <>
            KINGFISH<sup className="text-[6px] relative -top-2">TM</sup> holders can meet, chat and send tokens to each other in live interactive Web3 environment
          </>
        ),
        completed: false,
      },
      {
        description: (
          <>
            Fish grow/shrink in size depending on KINGFISH<sup className="text-[6px] relative -top-2">TM</sup> holdings
          </>
        ),
        completed: false,
      },
    ],
  },
  {
    title: "Stage Six: Viral Growth",
    items: [
      {
        description: "Organic viral growth is unleashed as more users find the platform and bring their friends to Solana Ocean",
        completed: false,
      },
    ],
  },
];
const COMMUNITY_CARDS = [
  {
    title: "Discord",
    url: process.env.NEXT_PUBLIC_DISCORD_URL,
    image: "discord",
    description: (
      <>
        The official home base of King<span className="text-orange-500">Fish</span>
        <sup className="text-[6px] text-orange-500 relative -top-2">TM</sup>, the world's most beloved fish-themed crypto token.
      </>
    ),
    buttonText: "Join Discord",
    bgcolor: "bg-chetwode",
  },
  {
    title: "Telegram",
    url: process.env.NEXT_PUBLIC_TELEGRAM_URL,
    image: "telegram",
    description: (
      <>
        All-in-one King<span className="text-orange-500">Fish</span>
        <sup className="text-[6px] text-orange-500 relative -top-2">TM</sup> chat & support group. Memes abound.
      </>
    ),
    buttonText: "Join Telegram",
    bgcolor: "bg-picton",
  },
  {
    title: "X",
    url: process.env.NEXT_PUBLIC_TWITTER_URL,
    image: "twitter",
    description: (
      <>
        Stay up-to-date on the latest news and King<span className="text-orange-500">Fish</span>
        <sup className="text-[6px] text-orange-500 relative -top-2">TM</sup> memes.
      </>
    ),
    buttonText: "Follow",
    bgcolor: "bg-black",
  },
];
const ECO_CARDS = [
  {
    title: "Rewards",
    message: (
      <>
        Early holders of{" "}
        <span className="font-bold">
          KING<span className="text-orange-500">FISH</span>
          <sup className="text-[6px] text-orange-500 relative -top-2">TM</sup>
        </span>{" "}
        tokens will be rewarded with an airdrop of our <span className="underline">utility token</span>, <span className="font-bold">SOLANAOCEAN</span>, when it launches. The more
        KF tokens you are holding the more SOLANAOCEAN you will receive.
      </>
    ),
    image: rewards,
  },
  {
    title: "Community",
    message: (
      <>
        We're dedicated to empowering the Solana Ocean and{" "}
        <span className="font-bold">
          KING<span className="text-orange-500">FISH</span>
          <sup className="text-[6px] text-orange-500 relative -top-2">TM</sup>
        </span>{" "}
        community, positioning it as a leading entity in the crypto landscape through a spectrum of rewards, including airdrops, exclusive early access to specialized updates, and
        spontaneous random drops, alongside a suite of utilities like in-app communications and peer-to-peer sharing, all strategically outlined within our product roadmap.
      </>
    ),
    image: community,
  },
  {
    title: "Locked LP",
    message:
      "In the Solana Ocean ecosystem, our liquidity is securely locked, serving as the cornerstone of stability. This personal safeguard shields our community from volatility, nurturing trust and sustainability in our decentralized finance journey.",
    image: lplocked,
  },
];

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const MEMBER_TIERS = [
  {
    name: "Danio",
    holdings: "0 - 99,999",
    holdingsNums: [1, 99999],
    imgSrc: danio,
    imgSrcLg: { src: danioLg, w: 100 },
  },
  {
    name: "Guppy",
    holdings: "100,000 - 499,999",
    holdingsNums: [100000, 499999],
    imgSrc: guppy,
    imgSrcLg: { src: guppyLg, w: 100 },
  },
  {
    name: "Trout",
    holdings: "500,000 - 999,999",
    holdingsNums: [500000, 999999],
    imgSrc: trout,
    imgSrcLg: { src: troutLg, w: 125 },
  },
  {
    name: "Manta",
    holdings: "1,000,000 - 1,499,999",
    holdingsNums: [1000000, 1499999],
    imgSrc: manta,
    imgSrcLg: { src: mantaLg, w: 125 },
  },
  {
    name: "Marlin",
    holdings: "1,500,000 - 1,999,999",
    holdingsNums: [1500000, 1999999],
    imgSrc: marlin,
    imgSrcLg: { src: marlinLg, w: 150 },
  },
  {
    name: "Shark",
    holdings: "2,000,000 - 4,999,999",
    holdingsNums: [2000000, 4999999],
    imgSrc: shark,
    imgSrcLg: { src: sharkLg, w: 175 },
  },
  {
    name: "Whale",
    holdings: "5,000,000 - 10,000,000",
    holdingsNums: [5000000, 10000000],
    imgSrc: whale,
    imgSrcLg: { src: whaleLg, w: 200 },
  },
];

const PAYMENT_OPTIONS: Record<string, string>[] = [
  { tokenName: "SOL", marketAddress: "4cX6sppKpds2ub4rjknc2cPbqQBDwZPYP2RQ9giAs8s9" },
  { tokenName: "USDC", marketAddress: "4cX6sppKpds2ub4rjknc2cPbqQBDwZPYP2RQ9giAs8s9" },
];

export {
  COMMUNITY_CARDS,
  CYAN_GRADIENT,
  ECO_CARDS,
  EMAIL_REGEX,
  FUCHSIA_GRADIENT,
  MEMBER_TIERS,
  OPACITY_CYAN_GRADIENT,
  OPACITY_FUCHSIA_GRADIENT,
  OPACITY_SKY_GRADIENT,
  OPACITY_VIOLET_GRADIENT,
  PAYMENT_OPTIONS,
  ROADMAP,
  TOKENOMICS_GRADIENT,
  VIOLET_GRADIENT,
};
