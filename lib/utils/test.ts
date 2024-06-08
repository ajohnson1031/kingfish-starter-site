import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, createTransferInstruction } from "@solana/spl-token";
import { WalletAdapterProps } from "@solana/wallet-adapter-base";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

// Utility function to find associated token address
const findAssociatedTokenAddress = async (walletAddress: PublicKey, tokenMintAddress: PublicKey): Promise<PublicKey> => {
  const [address] = await PublicKey.findProgramAddress([walletAddress.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), tokenMintAddress.toBuffer()], ASSOCIATED_TOKEN_PROGRAM_ID);
  return address;
};

// Main function to handle transaction
const handleTxn = async (publicKey: PublicKey, sendTransaction: WalletAdapterProps["sendTransaction"], amount: number) => {
  if (!publicKey) {
    console.error("Wallet not connected!");
    return;
  }

  // Convert amount to smallest unit (e.g., lamports for SOL)
  const amountInSmallestUnit = amount * Math.pow(10, 6);

  // Use an environment variable for the RPC connection string
  const connStr = process.env.NEXT_PUBLIC_CUSTOM_RPC_HOST_URL!;
  const connection = new Connection(connStr);

  // Use an environment variable for the USDC mint address
  const USDC_MINT_ADDRESS = new PublicKey(process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS!);

  // Use an environment variable for the recipient wallet address
  const recipientPublicKey = new PublicKey(process.env.NEXT_PUBLIC_PRESALE_WALLET!);

  // Find associated token addresses
  const senderTokenAddress = await findAssociatedTokenAddress(publicKey, USDC_MINT_ADDRESS);
  const recipientTokenAddress = await findAssociatedTokenAddress(recipientPublicKey, USDC_MINT_ADDRESS);

  // Create transfer instruction
  const transferInstruction = createTransferInstruction(senderTokenAddress, recipientTokenAddress, publicKey, amountInSmallestUnit, [], TOKEN_PROGRAM_ID);

  // Create a new transaction
  const transaction = new Transaction().add(transferInstruction);

  try {
    // Send transaction
    const txid = await sendTransaction(transaction, connection);
    return { txid };
  } catch (error: any) {
    console.error("Transaction failed", error);
    return { txid: null, error: error.message };
  }
};

export { handleTxn };
