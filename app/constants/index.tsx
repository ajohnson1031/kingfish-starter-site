import community from "@/assets/community.jpg";
import lplocked from "@/assets/lp-locked.jpg";
import rewards from "@/assets/rewards.jpg";

const FUCHSIA_GRADIENT: string = "bg-gradient-to-r from-fuchsia-500 to-orange-400 hover:from-fuchsia-600 hover:to-orange-500";
const OPACITY_FUCHSIA_GRADIENT: string = "bg-gradient-to-r from-fuchsia-500/50 to-orange-400/50";
const VIOLET_GRADIENT: string = "bg-gradient-to-r from-violet-400 to-cyan-500 hover:from-violet-500 hover:to-cyan-600";
const CYAN_GRADIENT: string = "bg-gradient-to-b from-cyan-500 to-sky-950";
const TOKENOMICS_GRADIENT: string = "bg-gradient-to-b from-fuchsia-500 to-slate-950";

const ROADMAP = [
  {
    title: "Stage One: Initial Launch",
    items: [
      {
        description: (
          <p>
            Launch KINGFISH<sup className="text-[6px] relative -top-2">TM</sup> website
          </p>
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
          <p>
            Airdrop Solana Ocean tokens to all existing KINGFISH<sup className="text-[6px] relative -top-2">TM</sup> token holders
          </p>
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
          <p>
            KINGFISH<sup className="text-[6px] relative -top-2">TM</sup> holders can meet, chat and send tokens to each other in live interactive Web3 environment
          </p>
        ),
        completed: false,
      },
      {
        description: (
          <p>
            Fish grow/shrink in size depending on KINGFISH<sup className="text-[6px] relative -top-2">TM</sup> holdings
          </p>
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
      <p>
        The official home base of King<span className="text-orange-500">Fish</span>
        <sup className="text-[6px] text-orange-500 relative -top-2">TM</sup>, the world's most popular fish-themed crypto token.
      </p>
    ),
    buttonText: "Join Discord",
    bgcolor: "bg-chetwode",
  },
  {
    title: "Telegram",
    url: process.env.NEXT_PUBLIC_TELEGRAM_URL,
    image: "telegram",
    description: (
      <p>
        All-in-one King<span className="text-orange-500">Fish</span>
        <sup className="text-[6px] text-orange-500 relative -top-2">TM</sup> chat & support group. Memes abound.
      </p>
    ),
    buttonText: "Join Telegram",
    bgcolor: "bg-picton",
  },
  {
    title: "X",
    url: process.env.NEXT_PUBLIC_TWITTER_URL,
    image: "twitter",
    description: (
      <p>
        Stay up-to-date on the latest news and King<span className="text-orange-500">Fish</span>
        <sup className="text-[6px] text-orange-500 relative -top-2">TM</sup> memes.
      </p>
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
        </span>
        <sup className="text-[6px] text-orange-500 relative -top-2">TM</sup> tokens will be rewarded with an airdrop of our <span className="underline">utility token</span>,{" "}
        <span className="font-bold">SOLANAOCEAN</span>, when it launches. The more KF tokens you are holding the more SOLANAOCEAN you will receive.
      </>
    ),
    image: rewards,
  },
  {
    title: "Community",
    message: (
      <p>
        We're dedicated to empowering the Solana Ocean and{" "}
        <span className="font-bold">
          KING<span className="text-orange-500">FISH</span>
          <sup className="text-[6px] text-orange-500 relative -top-2">TM</sup>
        </span>{" "}
        community, positioning it as a leading entity in the crypto landscape through a spectrum of rewards, including airdrops, exclusive early access to specialized updates, and
        spontaneous random drops, alongside a suite of utilities like in-app communications and peer-to-peer sharing, all strategically outlined within our product roadmap.
      </p>
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

export { COMMUNITY_CARDS, CYAN_GRADIENT, ECO_CARDS, FUCHSIA_GRADIENT, OPACITY_FUCHSIA_GRADIENT, ROADMAP, TOKENOMICS_GRADIENT, VIOLET_GRADIENT };
