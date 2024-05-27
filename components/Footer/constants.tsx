export const messages: Record<string, JSX.Element> = {
  invalid: <span className="text-red-300">Please enter a valid email address.</span>,
  valid: <span className="text-green-300">Thanks for signing up! We'll be in touch.</span>,
  error: <span className="text-red-300">Sorry, there was an error. Please try again.</span>,
  duplicate: <span className="text-gray-300">You've already signed up. We'll keep you posted.</span>,
  submitting: <span className="text-yellow-400">One moment, adding plankton...</span>,
};
