import { EMAIL_REGEX, FUCHSIA_GRADIENT, OPACITY_SKY_GRADIENT, VIOLET_GRADIENT } from "@/app/constants";
import { useViewerContext } from "@/app/context/ViewerContext";
import branding from "@/assets/branding.png";
import { Button, Img } from "@/components";
import { getTokenBalances, getUnprivilegedUserBalance } from "@/lib/utils/server";
import { useWallet } from "@solana/wallet-adapter-react";
import cn from "classnames";
import { FC, useEffect, useState } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { FooterProps } from "./Footer.types";
import { messages } from "./constants";

const Footer: FC<FooterProps> = () => {
  const { setIsViewingPresale } = useViewerContext();
  const { publicKey } = useWallet();
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<JSX.Element | null>(null);
  const [btnEnabled, setBtnEnabled] = useState<boolean>(true);
  const [btnText, setBtnText] = useState("Join Presale");
  // ! priviliged addresses to be removed when presale is over
  const [privilegedAddresses] = useState<string[]>(process.env.NEXT_PUBLIC_PRIVILEGED_ADDRESSES!.split("?"));

  const label = (
    <div className="flex items-center justify-center">
      <HiArrowLongRight size={32} />
    </div>
  );

  const handleEmail = ({ target: { value } }: any) => {
    setEmail(value.toLowerCase());
    setMessage(null);
  };

  const onClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (btnEnabled) {
      setBtnEnabled(false);

      if (!email.match(EMAIL_REGEX)) {
        setMessage(messages.invalid);
        return;
      }

      try {
        setMessage(messages.submitting);
        const response = await fetch(`${process.env.NEXT_PUBLIC_MICROSERVICE_URL}/newsletter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Connection: "keep-alive",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        const { message } = data;

        switch (message) {
          case "SUBSCRIBER_EXISTS":
            setMessage(messages.duplicate);
            break;
          case "EMAIL_REQUIRED":
            setMessage(messages.invalid);
            break;
          case "EMAIL_ADDED":
            setMessage(messages.valid);
            setEmail("");
            break;
          default:
            setMessage(messages.error);
            break;
        }
      } catch (error) {
        console.error(error);
        setMessage(messages.error);
      }
    }
  };

  const handleBtnText = () => {
    if (publicKey) {
      // Get balance of privileged accounts
      const publicKeyString = publicKey.toBase58();

      if (privilegedAddresses.indexOf(publicKeyString) >= 0) {
        getTokenBalances(publicKey!).then((data) => {
          const { kfBalance: myBal } = data!;
          if (Number(myBal) > 0) setBtnText("Get More $KFSH");
        });
      } else {
        getUnprivilegedUserBalance(publicKeyString).then((data) => {
          const { totalKfBought } = data;
          if (Number(totalKfBought) > 0) setBtnText("Get More $KFSH");
        });
      }
    }
  };

  useEffect(() => {
    handleBtnText();
  }, [publicKey]);

  useEffect(() => {
    if (!btnEnabled && message !== messages.submitting) {
      setTimeout(() => {
        setMessage(null);
        setBtnEnabled(true);
      }, 4000);
    }
  }, [message]);

  return (
    <div className="h-[21rem] md:h-44 w-full bg-vulcan-500 p-5 md:px-10 relative bottom-0 left-0 z-50 mt-4 md:mt-10 text-white">
      <div className="w-full md:w-3/4 flex flex-col md:flex-row mx-auto justify-center items-center gap-8">
        <div className="branding flex flex-col gap-3 h-11/12 w-fit justify-between items-center">
          <Img src={branding} width={200} />
          <h2 className="h-0.5 rounded-full bg-gradient-to-r from-vulcan-300 w-60" />
          <Button className={`${VIOLET_GRADIENT} !text-sm`} label={btnText} onClick={() => setIsViewingPresale(true)} />
        </div>
        <div className={cn("email h-11/12 w-full rounded-lg px-5 py-3 flex flex-col justify-center", OPACITY_SKY_GRADIENT)}>
          <p className="font-medium">
            Sign up to stay tuna'd in with{" "}
            <span className="font-extrabold">
              King
              <span className="text-orange-500">
                Fish<sup className="text-[6px] relative -top-2">TM</sup>
              </span>
            </span>{" "}
            updates.
          </p>
          <form onSubmit={onClick} className="flex items-center">
            <input
              id="footer-input"
              type="text"
              className="w-full rounded-l-sm h-10 px-2 text-cyan-800 border-2 box-border outline-none my-2"
              required
              autoComplete="email"
              value={email}
              onChange={handleEmail}
            />
            <Button className={`!text-sm w-fit !px-5 ml-auto py-2 h-10 flex items-center rounded-l-none rounded-r-sm ${FUCHSIA_GRADIENT}`} label={label} />
          </form>
          <p className={cn(`text-sm h-4`, { message: "h-0" })}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
