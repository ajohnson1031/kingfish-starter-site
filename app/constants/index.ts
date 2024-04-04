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
        description: "Launch KINGFISH website",
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
        description: "Airdrop Solana Ocean tokens to all existing KINGFISH token holders",
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
        description: "KINGFISH holders can meet, chat and send tokens to each other in live interactive Web3 environment",
        completed: false,
      },
      {
        description: "Fish grow/shrink in size depending on KINGFISH holdings",
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
    description: "The official home base of KingFish, the world's most popular fish-themed crypto token.",
    buttonText: "Join Discord",
    bgcolor: "bg-chetwode",
  },
  {
    title: "Telegram",
    url: process.env.NEXT_PUBLIC_TELEGRAM_URL,
    image: "telegram",
    description: "All-in-one KingFish chat & support group. Memes abound.",
    buttonText: "Join Telegram",
    bgcolor: "bg-picton",
  },
  {
    title: "X",
    url: process.env.NEXT_PUBLIC_TWITTER_URL,
    image: "twitter",
    description: "Stay up-to-date on the latest news and KingFish memes.",
    buttonText: "Follow",
    bgcolor: "bg-black",
  },
];

export { COMMUNITY_CARDS, CYAN_GRADIENT, FUCHSIA_GRADIENT, OPACITY_FUCHSIA_GRADIENT, ROADMAP, TOKENOMICS_GRADIENT, VIOLET_GRADIENT };
