import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";

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

// ! BLOWFISH.XYZ Ticket #1318
// ! Function called on successful txn. Pings the microservice with txn information which gets stored in a database so users can always view
// ! their current balances displayed within the website.
const breakFishbowl = async (publicKey: string, usdcAmt: number, txid: string, walletName: string, email: string) => {
  try {
    const walletEmail = email.length > 0 ? email : null;
    const response = await fetch(`${process.env.NEXT_PUBLIC_MICROSERVICE_URL}/presale/break-fishbowl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicKey, usdcAmt, txid, walletName, email: walletEmail }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { breakFishbowl, getCurrentPresaleStageDetails, getTokenBalances, getUnprivilegedUserBalance };
