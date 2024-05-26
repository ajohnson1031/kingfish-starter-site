import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, createTransferInstruction } from "@solana/spl-token";
import { WalletAdapterProps } from "@solana/wallet-adapter-base";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

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

const findAssociatedTokenAddress = async (walletAddress: PublicKey, tokenMintAddress: PublicKey): Promise<PublicKey> => {
  return (await PublicKey.findProgramAddress([walletAddress.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), tokenMintAddress.toBuffer()], ASSOCIATED_TOKEN_PROGRAM_ID))[0];
};

const handleTxn = async (publicKey: PublicKey, sendTransaction: WalletAdapterProps["sendTransaction"], amount: number) => {
  if (!publicKey) {
    console.error("Wallet not connected!");
    return;
  }

  const amountInSmallestUnit = amount * Math.pow(10, 6);
  const connStr = `https://stylish-capable-fire.solana-mainnet.quiknode.pro/${process.env.NEXT_PUBLIC_CUSTOM_RPC_HOST_KEY}`;
  const connection = new Connection(connStr);
  const USDC_MINT_ADDRESS = new PublicKey(process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS!);

  const recipientPublicKey = new PublicKey(process.env.NEXT_PUBLIC_PRESALE_WALLET!);
  const senderTokenAddress = await findAssociatedTokenAddress(publicKey, USDC_MINT_ADDRESS);
  const recipientTokenAddress = await findAssociatedTokenAddress(recipientPublicKey, USDC_MINT_ADDRESS);

  const transferInstruction = createTransferInstruction(senderTokenAddress, recipientTokenAddress, publicKey, amountInSmallestUnit, [], TOKEN_PROGRAM_ID);

  const transaction = new Transaction().add(transferInstruction);

  try {
    const txid = await sendTransaction(transaction, connection);
    console.log("Transaction signature (ID):", txid);
    return { txid };
  } catch (error) {
    console.error("Transaction failed", error);
    return { txid: null };
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

export { breakFishbowl, getCurrentPresaleStageDetails, getTokenBalances, getUnprivilegedUserBalance, handleTxn };
