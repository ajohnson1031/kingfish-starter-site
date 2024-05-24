import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Wallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";

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

const handleTxn = async (wallet: Wallet, signTransaction: any, senderPublicKey: string, amount: number) => {
  // Initialize connection to the Solana network
  const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

  // Example token mint address (replace with your token's actual mint address)
  const tokenMintAddress = new PublicKey(process.env.NEXT_PUBLIC_PRESALE_WALLET!);

  // Convert sender and receiver public keys to PublicKey instances
  const senderPublicKeyObj = new PublicKey(senderPublicKey);
  const receiverPublicKeyObj = new PublicKey(process.env.NEXT_PUBLIC_PRESALE_WALLET!);

  // Fetch token accounts for sender and receiver
  const senderTokenAccount = await connection.getTokenAccountBalance(senderPublicKeyObj);
  const receiverTokenAccount = await connection.getTokenAccountBalance(receiverPublicKeyObj);

  // Construct transfer instruction with amount
  const data = Buffer.alloc(8); // Buffer for 8 bytes (typically used for amount)
  data.writeInt32LE(amount, 0); // Write amount to buffer (adjust based on token decimals)

  const instruction = new TransactionInstruction({
    keys: [
      { pubkey: senderPublicKeyObj, isSigner: true, isWritable: true },
      { pubkey: receiverPublicKeyObj, isSigner: false, isWritable: true },
    ],
    programId: tokenMintAddress,
    data, // Include the amount data
  });

  // Create a new transaction
  const transaction = new Transaction().add(instruction);

  // Sign and send transaction
  if (wallet) {
    try {
      const signature = await signTransaction(transaction);
      const txid = await connection.sendRawTransaction(signature.serialize());
      console.log("Transaction ID:", txid);
      return { txid };
    } catch (error) {
      console.error(error);
      return { txid: null };
    }
  } else {
    console.error("Wallet not connected.");
  }
};

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

export { breakFishbowl, getCurrentPresaleStageDetails, getTokenBalances, getUnprivilegedUserBalance, handleTxn, imgLoader, toMbOrNone };
