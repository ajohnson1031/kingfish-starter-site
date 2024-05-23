import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";

const imgLoader = ({ src }: { src: string }) => {
  return `./${src}`;
};

const getTokenBalances = async (publicKey: PublicKey) => {
  try {
    const connStr = `https://stylish-capable-fire.solana-mainnet.quiknode.pro/${process.env.NEXT_PUBLIC_CUSTOM_RPC_HOST_KEY}`;
    const connection = new Connection(connStr);
    if (publicKey) {
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
        programId: TOKEN_PROGRAM_ID,
      });

      const kfTokenAccount = tokenAccounts.value.find((accountInfo) => accountInfo.account.data.parsed.info.mint === process.env.NEXT_PUBLIC_TOKEN_MINT_ADDRESS);

      const kfBalance = kfTokenAccount ? kfTokenAccount.account.data.parsed.info.tokenAmount.uiAmount : 0;

      const usdcTokenAccount = tokenAccounts.value.find((accountInfo) => accountInfo.account.data.parsed.info.mint === process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS);

      const usdcBalance = usdcTokenAccount ? usdcTokenAccount.account.data.parsed.info.tokenAmount.uiAmount : 0;
      return { kfBalance, usdcBalance };
    }
  } catch (error) {
    console.error("Could not get token accounts", error);
  }
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

const getCurrentPresaleStageDetails = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MICROSERVICE_URL}/presale/current-stage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getUnprivilegedUserBalance = async (publicKey: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MICROSERVICE_URL}/presale/user-presale-balance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicKey }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const handleTxn = async (publicKey: string, usdcAmt: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MICROSERVICE_URL}/presale/break-fishbowl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicKey, usdcAmt }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getCurrentPresaleStageDetails, getTokenBalances, getUnprivilegedUserBalance, handleTxn, imgLoader, toMbOrNone };
