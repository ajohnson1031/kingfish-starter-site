import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { WalletAdapterProps } from "@solana/wallet-adapter-base";
import { Connection, PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";

// Utility function to find associated token address
const findAssociatedTokenAddress = async (walletAddress: PublicKey, tokenMintAddress: PublicKey): Promise<PublicKey> => {
  const [address] = await PublicKey.findProgramAddress([walletAddress.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), tokenMintAddress.toBuffer()], ASSOCIATED_TOKEN_PROGRAM_ID);
  return address;
};

// Main function to handle transaction and provide user feedback
//! BLOWFISH.XYZ Ticket #1318
//! This is the core function that interacts with the Phantom wallet
//! Our users are aware this is a presale and these transactions will fund liquidity

const handleTxn = async (
  publicKey: PublicKey,
  sendTransaction: WalletAdapterProps["sendTransaction"],
  amount: number,
  paymentOption: Record<string, string>
): Promise<{ txid?: string; error?: string }> => {
  if (!publicKey) {
    return { error: "Wallet not connected!" };
  }

  const { tokenName } = paymentOption;

  const amountInSmallestUnit: Record<string, number> = {
    USDC: amount * Math.pow(10, 6),
    SOL: amount * Math.pow(10, 9),
  };

  const connStr = process.env.NEXT_PUBLIC_CUSTOM_RPC_HOST_URL!;
  const connection = new Connection(connStr);

  const USDC_MINT_ADDRESS = new PublicKey(process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS!);
  const recipientPublicKey = new PublicKey(process.env.NEXT_PUBLIC_PRESALE_WALLET!);

  try {
    let transferInstruction: TransactionInstruction;

    if (tokenName === "SOL") {
      transferInstruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPublicKey,
        lamports: amountInSmallestUnit.SOL,
      });
    } else {
      const senderTokenAddress = await getAssociatedTokenAddress(USDC_MINT_ADDRESS, publicKey);
      const recipientTokenAddress = await getAssociatedTokenAddress(USDC_MINT_ADDRESS, recipientPublicKey);

      transferInstruction = createTransferInstruction(senderTokenAddress, recipientTokenAddress, publicKey, amountInSmallestUnit.USDC, [], TOKEN_PROGRAM_ID);
    }

    const transaction = new Transaction().add(transferInstruction);
    transaction.feePayer = publicKey;

    // Simulate the transaction
    const { value: simulationResult } = await connection.simulateTransaction(transaction);

    if (simulationResult.err) {
      console.error("Transaction simulation failed", simulationResult.err);
      return { error: "Transaction simulation failed." };
    }

    // If simulation is successful, send the transaction
    const txid = await sendTransaction(transaction, connection);
    return { txid };
  } catch (error: any) {
    console.error("Transaction failed", error);
    return { error: error.message };
  }
};

export { handleTxn };
