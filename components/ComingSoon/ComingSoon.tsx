import { EMAIL_REGEX, FUCHSIA_GRADIENT, OPACITY_SKY_GRADIENT } from "@/app/constants";
import { useViewerContext } from "@/app/context/ViewerContext";
import cuteIcon from "@/assets/cute-fish-icon-w-stroke.png";
import { Button, CustomTooltip, Img, MemberTierList } from "@/components";
import { messages } from "@/components/Footer/constants";
import { ImgVariant } from "@/components/Img";
import cn from "classnames";
import { FC, useEffect, useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";
import { HiArrowLongRight } from "react-icons/hi2";
import { ComingSoonProps } from "./ComingSoon.types";

const ComingSoon: FC<ComingSoonProps> = ({ isViewingComingSoon, setIsViewingComingSoon }) => {
  const { isViewingRankings, setIsViewingRankings } = useViewerContext();
  const [opacity, setOpacity] = useState("opacity-0");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<JSX.Element | null>(null);

  const [btnEnabled, setBtnEnabled] = useState<boolean>(true);

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

  useEffect(() => {
    if (!btnEnabled && message !== messages.submitting) {
      setTimeout(() => {
        setMessage(null);
        setBtnEnabled(true);
      }, 4000);
    }
  }, [message]);

  const label = (
    <div className="flex items-center justify-center">
      <HiArrowLongRight size={32} color="#FFF" />
    </div>
  );

  useEffect(() => {
    if (isViewingComingSoon) {
      setOpacity("opacity-100");
    } else setOpacity("opacity-0");
  }, [isViewingComingSoon]);

  return (
    <div
      className={cn(
        "w-[100vw] h-[calc(100vh-81px)] md:h-[calc(100vh-97px)] fixed top-[81px] md:top-[97px] left-0 z-30 p-10 transition-opacity ease-in duration-300 bg-presale bg-cover",
        { hidden: !isViewingComingSoon, flex: isViewingComingSoon },
        opacity
      )}
    >
      {/* Container Div */}
      <div className="flex flex-col w-full md:w-1/2 h-full rounded-3xl mx-auto">
        <div className="flex flex-col w-full h-full">
          <div className="border-[3px] border-gray-300 rounded-3xl flex flex-col justify-start text-center gap-2 p-10 -mt-2 transition-all duration-200 bg-vulcan-500/80 h-fit min-h-[578px]">
            {!isViewingRankings && (
              <FaXmark
                className="w-11 h-11 text-white p-2 rounded-full box-border bg-red-400 hover:bg-red-500 ml-auto cursor-pointer relative z-10 -top-5 left-6"
                onClick={() => setIsViewingComingSoon(false)}
              />
            )}
            <div className="w-fit mx-auto">
              <CustomTooltip title={isViewingRankings ? "Click to View Newsletter Signup" : "Click to View Presale Stats"}>
                {!isViewingRankings ? (
                  <div className="border-2 border-blue-500 rounded-full cursor-pointer w-fit relative z-10 ml-auto top-[76px]">
                    <Img
                      src={BsFillInfoCircleFill}
                      type={ImgVariant.ICON}
                      color="#3B82F6"
                      className="bg-white rounded-full overflow-hidden border-white border box-border w-fit"
                      size={16}
                      onClick={() => setIsViewingRankings(true)}
                    />
                  </div>
                ) : (
                  <div className="border-2 border-red-500 rounded-full cursor-pointer w-fit relative z-10 ml-auto top-[116px]">
                    <Img
                      src={FaXmark}
                      type={ImgVariant.ICON}
                      color="white"
                      className="bg-red-500 rounded-full overflow-hidden border-white border box-border w-fit"
                      size={16}
                      onClick={() => setIsViewingRankings(false)}
                    />
                  </div>
                )}
              </CustomTooltip>{" "}
              <Img src={cuteIcon} alt="cute fish icon" size={120} className={cn("w-fit mx-auto -mt-10", { "mt-0": isViewingRankings })} />
            </div>

            {isViewingRankings && <MemberTierList />}
            {!isViewingRankings && (
              <>
                <p className="text-4xl text-white font-bold text-center my-10">
                  Coming Soon
                  <br />
                  Stay Tuna'd...
                </p>

                <div className={cn("email h-11/12 w-3/4 rounded-lg px-5 py-3 flex flex-col justify-center mx-auto", OPACITY_SKY_GRADIENT)}>
                  <p className="font-medium text-white">
                    Sign up to receive regular{" "}
                    <span className="font-extrabold">
                      King
                      <span className="text-orange-500">
                        Fish<sup className="text-[6px] relative -top-2">TM</sup>
                      </span>
                    </span>{" "}
                    updates.
                  </p>
                  <form onSubmit={onClick} className="flex items-center">
                    <input type="text" className="w-full rounded-l-sm h-10 px-2 text-cyan-800 border-2 box-border outline-none my-2" value={email} onChange={handleEmail} />
                    <Button className={`!text-sm w-fit !px-5 ml-auto py-2 h-10 flex items-center rounded-l-none rounded-r-sm ${FUCHSIA_GRADIENT}`} label={label} />
                  </form>
                  <p className={cn(`text-sm h-4`, { message: "h-0" })}>{message}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
