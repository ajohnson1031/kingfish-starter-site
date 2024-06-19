import { PythHttpClient, getPythProgramKeyForCluster } from "@pythnetwork/client";
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

      const solBalanceLamports = await connection.getBalance(publicKey);
      const solBalance = solBalanceLamports / Math.pow(10, 9); // Convert lamports to SOL

      return { kfBalance, usdcBalance, solBalance };
    }
  } catch (error) {
    console.error("Could not get token accounts", error);
    return { kfBalance: 0, usdcBalance: 0, solBalance: 0 };
  }
};

const getCurrentPresaleStageDetails = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MICROSERVICE_URL}/presale/current-stage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
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
        Connection: "keep-alive",
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
const breakFishbowl = async (publicKey: string, tokenAmt: number, txid: string, walletName: string, email: string, paymentOption: string, pythPrice: any) => {
  try {
    const walletEmail = email.length > 0 ? email : null;
    const response = await fetch(`${process.env.NEXT_PUBLIC_MICROSERVICE_URL}/presale/break-fishbowl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
      },
      body: JSON.stringify({ publicKey, tokenAmt, txid, walletName, email: walletEmail, paymentOption, pythPrice }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getLastKnownPythPrice = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MICROSERVICE_URL}/presale/last-pyth-price`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getPythPrice = async () => {
  const connStr = `https://stylish-capable-fire.solana-mainnet.quiknode.pro/${process.env.NEXT_PUBLIC_CUSTOM_RPC_HOST_KEY}`;
  const connection = new Connection(connStr);

  const { pyth_price: lastKnownPythPrice } = await getLastKnownPythPrice();
  // Get the Pyth program key for the mainnet-beta cluster
  const pythProgramKey = getPythProgramKeyForCluster("mainnet-beta");

  // Initialize the PythHttpClient with the connection and program key
  const pythClient = new PythHttpClient(connection, pythProgramKey);
  const pythData = await pythClient.getData();

  // Fetch the SOL/USD price
  const solUsdcPriceInfo = pythData.productPrice.get("Crypto.SOL/USD");

  if (solUsdcPriceInfo) {
    const price = solUsdcPriceInfo.price;
    console.log(`Current SOL/USDC price: ${price}`);
    return price;
  } else {
    console.error("SOL/USDC price not found");
    return lastKnownPythPrice;
  }
};

export { breakFishbowl, getCurrentPresaleStageDetails, getPythPrice, getTokenBalances, getUnprivilegedUserBalance };
