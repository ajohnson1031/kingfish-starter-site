import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";

const imgLoader = ({ src }: { src: string }) => {
  return `./${src}`;
};

const getKFBalance = async (publicKey: PublicKey) => {
  try {
    const connStr = `https://stylish-capable-fire.solana-mainnet.quiknode.pro/${process.env.NEXT_PUBLIC_CUSTOM_RPC_HOST_KEY}`;
    console.log(connStr);
    const connection = new Connection(connStr);
    if (publicKey) {
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
        programId: TOKEN_PROGRAM_ID,
      });

      const tokenAccount = tokenAccounts.value.find((accountInfo) => accountInfo.account.data.parsed.info.mint === process.env.NEXT_PUBLIC_TOKEN_MINT_ADDRESS);

      const balance = tokenAccount ? tokenAccount.account.data.parsed.info.tokenAmount.uiAmount : 0;
      return balance;
    }
  } catch (error) {
    console.error("Could not get token accounts", error);
  }
};

export { getKFBalance, imgLoader };
