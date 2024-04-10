import { FUCHSIA_GRADIENT, OPACITY_SKY_GRADIENT, VIOLET_GRADIENT } from "@/app/constants";
import branding from "@/assets/branding.png";
import { Button, Img } from "@/components";
import cn from "classnames";
import { FC, useEffect, useState } from "react";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { FooterProps } from "./Footer.types";

const Footer: FC<FooterProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<JSX.Element | null>(null);
  const [messages] = useState<Record<string, JSX.Element>>({
    invalid: <p className="text-red-300">Please enter a valid email address.</p>,
    valid: <p className="text-green-300">Thanks for signing up! We'll be in touch.</p>,
    error: <p className="text-red-300">Sorry, there was an error. Please try again.</p>,
  });

  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const label = (
    <div className="flex gap-3 items-center justify-center">
      <PiPaperPlaneTilt size={20} /> Subscribe
    </div>
  );

  const handleEmail = ({ target: { value } }: any) => {
    setEmail(value);
    setMessage(null);
  };

  const onClick = () => {
    if (!email.match(regex)) setMessage(messages.invalid);

    try {
      // TODO: handle insertion of email into database.
    } catch (error) {
      setMessage(messages.error);
      console.error(error);
    }
  };

  useEffect(() => {
    if (!!message) setTimeout(() => setMessage(null), 4000);
  }, [message]);

  return (
    <div className="h-44 w-full bg-vulcan-500 p-5 md:px-10 relative bottom-0 left-0 z-50 mt-10 text-white">
      <div className="w-3/4 flex flex-col md:flex-row mx-auto justify-center items-center gap-8">
        <div className="branding flex flex-col gap-3 h-11/12 w-fit justify-between items-center">
          <Img src={branding} width={200} />
          <h2 className="h-0.5 rounded-full bg-gradient-to-r from-vulcan-300 w-60" />
          <Button className={`${VIOLET_GRADIENT} !text-sm`} label="BUY PRESALE" onClick={() => window.open(process.env.NEXT_PUBLIC_PINKSALE_URL, "_blank")} />
        </div>
        <div className={cn("email h-11/12 w-full rounded-lg px-5 py-3 hidden md:flex flex-col justify-center", OPACITY_SKY_GRADIENT)}>
          <p className="font-semibold">Sign up to receive regular updates.</p>
          <div className="flex items-center">
            <input type="text" className="w-full rounded-l-sm h-10 px-2 bg-transparent border-2 box-border outline-none my-2" value={email} onChange={handleEmail} />
            <Button className={`!text-sm w-1/4 ml-auto py-2 h-10 flex items-center rounded-l-none rounded-r-sm ${FUCHSIA_GRADIENT}`} label={label} onClick={onClick} />
          </div>
          <p className={cn(`text-sm h-4`, { message: "h-0" })}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
