import { TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, createTransferInstruction } from "@solana/spl-token";
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

const handleTxn = async (publicKey: PublicKey, sendTransaction: WalletAdapterProps["sendTransaction"], amount: number) => {
  if (!publicKey) {
    console.log("Wallet not connected");
    return;
  }

  const connStr = `https://stylish-capable-fire.solana-mainnet.quiknode.pro/${process.env.NEXT_PUBLIC_CUSTOM_RPC_HOST_KEY}`;
  const connection = new Connection(connStr);

  // Token mint address for USDC on mainnet
  const USDC_MINT_ADDRESS = new PublicKey(process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS!);
  const toWalletPublicKey = new PublicKey(process.env.NEXT_PUBLIC_PRESALE_WALLET!);

  // Example adjustment for associated token account creation
  const fromWallet = publicKey; // Assuming this is the sender's wallet public key

  // Create associated token account for the sender if it doesn't exist
  const fromTokenAccountAddress = await PublicKey.findProgramAddressSync([fromWallet.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), USDC_MINT_ADDRESS.toBuffer()], TOKEN_PROGRAM_ID);

  const fromTokenAccount = fromTokenAccountAddress[0];

  // Create associated token account for the recipient if it doesn't exist
  const toTokenAccountAddress = await PublicKey.findProgramAddressSync([toWalletPublicKey.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), USDC_MINT_ADDRESS.toBuffer()], TOKEN_PROGRAM_ID);

  const toTokenAccount = toTokenAccountAddress[0];

  const transaction = new Transaction();

  // Create the sender's token account if it doesn't exist
  transaction.add(createAssociatedTokenAccountInstruction(fromWallet, fromTokenAccount, fromWallet, USDC_MINT_ADDRESS));

  // Create the recipient's token account if it doesn't exist
  transaction.add(createAssociatedTokenAccountInstruction(fromWallet, toTokenAccount, toWalletPublicKey, USDC_MINT_ADDRESS));

  // Transfer 5 USDC (5 * 10^6)
  const txnAmt = amount * Math.pow(10, 6);
  console.log("amount", amount, "txnAmt", txnAmt);

  transaction.add(createTransferInstruction(fromTokenAccount, toTokenAccount, fromWallet, txnAmt, [], TOKEN_PROGRAM_ID));

  try {
    const txid = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(txid, "confirmed");
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
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { breakFishbowl, getCurrentPresaleStageDetails, getTokenBalances, getUnprivilegedUserBalance, handleTxn };
