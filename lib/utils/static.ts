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

export { imgLoader, non, toMbOrNone };
