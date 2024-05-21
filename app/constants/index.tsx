import community from "@/assets/community.jpg";
import lplocked from "@/assets/lp-locked.jpg";
import rewards from "@/assets/rewards.jpg";

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
        description: (
          <>
            Launch KINGFISH<sup className="text-[6px] relative -top-2">TM</sup> website
          </>
        ),
        completed: false,
      },
      {
        description: "Mint initial tokens",
        completed: false,
      },
      {
        description: "Smart contract created / audited",
        completed: false,
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

const KINGFISH_TOKEN_ADDY = "BhzhiA6Bkv8q7BZS9QnZUQnFUMrqDSdNdKZAhs6bFtcF";

const PRESALE_STAGES = {
  stage_one: {
    amt: Math.ceil(1375733411.2513287),
    title: "Stage One",
  },
  state_two: {
    amt: Math.ceil(1110192758.6113286),
    title: "Stage Two",
  },
  stage_three: {
    amt: Math.ceil(908381862.6049286),
    title: "Stage Three",
  },
  stage_four: {
    amt: Math.ceil(755005581.6400646),
    title: "Stage Four",
  },
  stage_five: {
    amt: Math.ceil(638439608.1067679),
    title: "Stage Five",
  },
};

export {
  COMMUNITY_CARDS,
  CYAN_GRADIENT,
  ECO_CARDS,
  FUCHSIA_GRADIENT,
  KINGFISH_TOKEN_ADDY,
  OPACITY_CYAN_GRADIENT,
  OPACITY_FUCHSIA_GRADIENT,
  OPACITY_SKY_GRADIENT,
  OPACITY_VIOLET_GRADIENT,
  PRESALE_STAGES,
  ROADMAP,
  TOKENOMICS_GRADIENT,
  VIOLET_GRADIENT,
};
