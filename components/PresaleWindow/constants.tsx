const contactSupport = (
  <a href="mailto:support@kingfish.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 no-underline">
    <span className="text-blue-300 no-underline">contact support</span>
  </a>
);

const txnErrorResponses: Record<string, JSX.Element> = {
  "Wallet not connected": <span className="text-red-300">Please connect your wallet.</span>,
  "Insufficient funds": <span className="text-red-300">Insufficient USDC to cover this txn. Please try again or {contactSupport}.</span>,
  "Transaction simulation failed": <span className="text-red-300">Transaction simulation failed. Please {contactSupport}.</span>,
  "Transaction rejected by network": <span className="text-red-300">Your txn was rejected by the network. Please try again.</span>,
  "Transaction confirmation timeout": <span className="text-red-300">Your txn timed out. Please try again.</span>,
  "Signature verification failed": <span className="text-red-300">Txn signature unverifiable. Please try again.</span>,
  "User rejected the request.": <span className="text-red-300">Txn rejected by user.</span>,
  "Account not found": <span className="text-red-300">Account not found.</span>,
  Default: <span className="text-red-300">Error in txn. Please try again or {contactSupport}.</span>,
};

const buyMessages: Record<string, JSX.Element> = {
  invalid: <span className="text-red-300">Spend amount is required.</span>,
  deficit: <span className="text-red-300">Spend amount exceeds USDC balance.</span>,
  success: <span className="text-green-300">Fishbowl busted to shards! Transaction sent!</span>,
  error: <span className="text-red-300">Sorry, there was an error. Please try again later.</span>,
  email: <span className="text-red-300">Please enter a valid email address.</span>,
};

export { buyMessages, txnErrorResponses };
