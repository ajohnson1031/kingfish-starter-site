import { MEMBER_TIERS } from "@/app/constants";
import { PublicKey } from "@solana/web3.js";

const imgLoader = ({ src }: { src: string }) => {
  return `./${src}`;
};

const toMbOrNone = (amt: number) => {
  let strAmt = amt?.toString() || "0";

  if (strAmt.length > 6 && strAmt.length <= 9) {
    strAmt = `${(amt / 1000000).toFixed(2)}M`;
  }

  if (strAmt.length > 9) {
    strAmt = `${(amt / 1000000000).toFixed(2)}B`;
  }

  return strAmt;
};

type SoSoSecretProps = {
  payerKeyPair: {
    publicKey: PublicKey;
    secretKey: Uint8Array;
  };
};

const non = () => {
  const publicKey = process.env.NEXT_PUBLIC_PRESALE_WALLET as unknown as PublicKey;
  const secretKey = process.env.NEXT_PUBLIC_PAYER_SECRET!.split(",") as unknown as Uint8Array;

  const keyPair: SoSoSecretProps = {
    payerKeyPair: {
      publicKey,
      secretKey,
    },
  };

  return keyPair;
};

const getCurrentTier = (kfBalance: string) => {
  let currentTier = MEMBER_TIERS[0];
  let currentKfNum = Number(kfBalance.slice(0, kfBalance.length - 1));
  const currentKfMultiplier = kfBalance.substring(kfBalance.length - 1);

  switch (currentKfMultiplier) {
    case "M":
      currentKfNum *= 1000000;
      break;
    case "B":
      currentKfNum *= 1000000000;
      break;
    default:
      break;
  }

  MEMBER_TIERS.forEach((memberTier) => {
    if (currentKfNum > memberTier.holdingsNums[1]) currentTier = memberTier;
  });

  return currentTier;
};

export { getCurrentTier, imgLoader, non, toMbOrNone };
