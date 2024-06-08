import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, createTransferInstruction } from "@solana/spl-token";
import { WalletAdapterProps } from "@solana/wallet-adapter-base";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

// Utility function to find associated token address
const findAssociatedTokenAddress = async (walletAddress: PublicKey, tokenMintAddress: PublicKey): Promise<PublicKey> => {
  const [address] = await PublicKey.findProgramAddress([walletAddress.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), tokenMintAddress.toBuffer()], ASSOCIATED_TOKEN_PROGRAM_ID);
  return address;
};

// Main function to handle transaction and provide user feedback
const handleTxn = async (publicKey: PublicKey, sendTransaction: WalletAdapterProps["sendTransaction"], amount: number): Promise<{ txid: string | null; error?: string }> => {
  if (!publicKey) {
    return { txid: null, error: "Wallet not connected!" };
  }

  const amountInSmallestUnit = amount * Math.pow(10, 6);

  const connStr = process.env.NEXT_PUBLIC_CUSTOM_RPC_HOST_URL!;
  const connection = new Connection(connStr);

  const USDC_MINT_ADDRESS = new PublicKey(process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS!);
  const recipientPublicKey = new PublicKey(process.env.NEXT_PUBLIC_PRESALE_WALLET!);

  try {
    const senderTokenAddress = await findAssociatedTokenAddress(publicKey, USDC_MINT_ADDRESS);
    const recipientTokenAddress = await findAssociatedTokenAddress(recipientPublicKey, USDC_MINT_ADDRESS);

    const transferInstruction = createTransferInstruction(senderTokenAddress, recipientTokenAddress, publicKey, amountInSmallestUnit, [], TOKEN_PROGRAM_ID);

    const transaction = new Transaction().add(transferInstruction);

    // Set the fee payer
    transaction.feePayer = publicKey;

    // Simulate the transaction
    const { value: simulationResult } = await connection.simulateTransaction(transaction);

    if (simulationResult.err) {
      console.error("Transaction simulation failed", simulationResult.err);
      return { txid: null, error: "Transaction simulation failed." };
    }

    // If simulation is successful, send the transaction
    const txid = await sendTransaction(transaction, connection);
    return { txid };
  } catch (error: any) {
    console.error("Transaction failed", error);
    return { txid: null, error: error.message };
  }
};

export { handleTxn };
