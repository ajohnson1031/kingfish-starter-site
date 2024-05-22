import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";

const imgLoader = ({ src }: { src: string }) => {
  return `./${src}`;
};

const getKFBalance = async (publicKey: PublicKey) => {
  const connection = new Connection("https://api.mainnet-beta.solana.com");

  if (publicKey) {
    // Get token accounts by owner
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: TOKEN_PROGRAM_ID,
    });

    // Find the token account for the specified mint address
    const tokenAccount = tokenAccounts.value.find((accountInfo) => accountInfo.account.data.parsed.info.mint === process.env.NEXT_PUBLIC_TOKEN_MINT_ADDRESS);

    // Get the balance for the token account
    const balance = tokenAccount ? tokenAccount.account.data.parsed.info.tokenAmount.uiAmount : 0;

    return balance;
  }
};

export { getKFBalance, imgLoader };
