import { EMAIL_REGEX, FUCHSIA_GRADIENT } from "@/app/constants";
import { useViewerContext } from "@/app/context/ViewerContext";
import cuteIcon from "@/assets/cute-fish-icon-w-stroke.png";
import { Button, CustomTooltip, FishBowl, Img, MemberTierList } from "@/components";
import { ImgVariant } from "@/components/Img";
import { breakFishbowl, getTokenBalances, getUnprivilegedUserBalance } from "@/lib/utils/server";
import { toMbOrNone } from "@/lib/utils/static";
import { handleTxn } from "@/lib/utils/txn";
import { useWallet } from "@solana/wallet-adapter-react";
import cn from "classnames";
import { FC, useCallback, useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaInfo } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { PresaleWindowProps } from "./PresaleWindow.types";
import { buyMessages, txnErrorResponses } from "./constants";

const PresaleWindow: FC<PresaleWindowProps> = () => {
  const { publicKey, disconnect, wallet, sendTransaction } = useWallet();

  const { isViewingPresale, currentStageDetails, isViewingRankings, setIsViewingRankings, setIsViewingPresale, setIsViewingWallet } = useViewerContext();
  const [opacity, setOpacity] = useState("opacity-0");

  // ! priviliged addresses to be removed when presale is over
  const [privilegedAddresses] = useState<string[]>(process.env.NEXT_PUBLIC_PRIVILEGED_ADDRESSES!.split("?"));

  const [kfBalance, setkfBalance] = useState("0");
  const [usdcBalance, setusdcBalance] = useState(0);

  const [buyAmount, setBuyAmount] = useState<string>("");
  const [buyMessage, setBuyMessage] = useState<JSX.Element | null>(null);
  const [isTransmittingTxn, setIsTransmittingTxn] = useState<boolean>(false);
  const [confirmChecked, setConfirmChecked] = useState<boolean>(false);
  const [editStoredEmail, setEditStoredEmail] = useState<boolean>(false);
  const [walletEmail, setWalletEmail] = useState<string>("");

  const nextMsg = `Until ${currentStageDetails?.currentStage?.next_per_usdc ? `1 USDC = ${currentStageDetails?.currentStage.next_per_usdc} $KingFish` : "Presale Ends!"}`;

  const tm = <sup className="text-xs relative -top-2.5">™</sup>;

  const handleKFBalances = () => {
    if (publicKey) {
      // Get balance of privileged accounts
      const publicKeyString = publicKey.toBase58();

      if (privilegedAddresses.indexOf(publicKeyString) >= 0) {
        getTokenBalances(publicKey!).then((data) => {
          const convertedKfBal: string = toMbOrNone(data?.kfBalance);
          setkfBalance(convertedKfBal);
          setusdcBalance(data?.usdcBalance);
        });
      } else {
        getUnprivilegedUserBalance(publicKeyString).then((data) => {
          const { totalKfBought } = data;
          const convertedBal: string = toMbOrNone(totalKfBought);
          setkfBalance(convertedBal);
        });

        getTokenBalances(publicKey!).then((data) => {
          setusdcBalance(data?.usdcBalance);
        });
      }
    }
  };

  const handleBuyAmtChange = (e: any) => {
    const newValue = e.target.value;
    // Allow only digits (0-9)
    if (/^\d*$/.test(newValue) && newValue !== "0") {
      setBuyAmount(newValue);
      setBuyMessage(null);
    }
  };

  const toggleConfirmCheck = () => {
    const confirmSetting = localStorage.getItem("KF_TRADE_SETTING") || "";

    if (confirmSetting.length > 0) {
      const { email } = JSON.parse(confirmSetting);
      setWalletEmail(email);
      setEditStoredEmail(false);
    } else {
      setEditStoredEmail(true);
    }
    setConfirmChecked(!confirmChecked);
  };

  const handleEmailStore = (e: any) => {
    e.preventDefault();
    if (!walletEmail.match(EMAIL_REGEX)) {
      setBuyMessage(buyMessages.email);
      return;
    }
    const storeEmail = JSON.stringify({ email: walletEmail });
    localStorage.setItem("KF_TRADE_SETTING", storeEmail);
    setEditStoredEmail(false);
  };

  const onBuyClick = async (e: any) => {
    e.preventDefault();

    if (!buyAmount.length) {
      // if spend amount is empty
      setBuyMessage(buyMessages.invalid);
      return;
    }

    if (!/^[1-9]\d*$/.test(buyAmount)) {
      console.error("Invalid amount! Please enter a positive integer.");
      setBuyMessage(buyMessages.invalid);
      return;
    }

    // convert string values to numbers for comparison
    const spendNum = Number(buyAmount);
    const usdcNum = Number(usdcBalance);

    // if desired amount is greater than user usdc balance
    if (spendNum > usdcNum) {
      setBuyMessage(buyMessages.deficit);
      return;
    }

    if (wallet && publicKey) {
      setIsTransmittingTxn(true);

      try {
        // here's where the magic happens. await txn handler resolution. if txid returned, send details to microservice, send email, etc.
        const txn = await sendUSDC();
        if (!!txn?.txid) {
          setIsTransmittingTxn(false);
          const res = await breakFishbowl(publicKey.toBase58(), spendNum, txn.txid, wallet.adapter.name, walletEmail);

          const { message } = res;

          if (message === "SUCCESS") {
            handleKFBalances();
            setBuyAmount("");
            setBuyMessage(buyMessages.success);
          } else setBuyMessage(buyMessages.error);
        } else {
          setBuyMessage(txnErrorResponses[txn?.error!]);
          setIsTransmittingTxn(false);
        }
      } catch (error: any) {
        console.log(error.message);
        setBuyMessage(txnErrorResponses[error.message || "Default"]);
        setIsTransmittingTxn(false);
      }
    }
  };

  const sendUSDC = useCallback(() => handleTxn(publicKey!, sendTransaction, Number(buyAmount)), [publicKey, buyAmount, sendTransaction]);

  useEffect(() => {
    if (isViewingPresale) {
      setOpacity("opacity-100");
    } else setOpacity("opacity-0");
  }, [isViewingPresale]);

  useEffect(() => {
    handleKFBalances();
    const confirmSetting = localStorage.getItem("KF_TRADE_SETTING") || "";
    if (confirmSetting.length > 0) {
      const { email } = JSON.parse(confirmSetting);
      setConfirmChecked(true);
      setEditStoredEmail(false);
      setWalletEmail(email);
    }
  }, [publicKey]);

  useEffect(() => {
    const timeoutId = setTimeout(() => setBuyMessage(null), 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [buyMessage]);

  return (
    <div
      className={cn(
        "w-[100vw] h-[calc(100vh-81px)] md:h-[calc(100vh-97px)] fixed top-[81px] md:top-[97px] left-0 z-30 p-10 flex transition-opacity ease-in duration-300 bg-presale bg-cover",
        { hidden: !isViewingPresale },
        opacity
      )}
    >
      {/* Container Div */}
      <div className="flex flex-col w-full md:w-1/2 h-full rounded-3xl mx-auto">
        <div className="flex flex-col w-full h-full">
          <div
            className={`border-[3px] overflow-hidden border-gray-300 rounded-3xl flex flex-col justify-center text-center gap-2 p-0 sm:p-10 -mt-2 h-[80%] md:h-auto ${
              isTransmittingTxn ? "bg-vulcan-900/80 !p-0" : "bg-vulcan-500/80"
            }`}
          >
            <FaXmark
              className={cn(
                "w-11 h-11 text-white p-2 rounded-full box-border bg-red-400 hover:bg-red-500 ml-[76%] sm:ml-auto cursor-pointer relative z-10 -top-16 md:-top-5 left-6 block",
                {
                  hidden: isTransmittingTxn || isViewingRankings,
                }
              )}
              onClick={() => {
                setIsViewingPresale(false);
                setIsViewingRankings(false);
              }}
            />
            {isTransmittingTxn && (
              <div className="flex relative z-50 w-full h-[572px] top-0 left-0">
                <FishBowl />
              </div>
            )}

            {!isTransmittingTxn && (
              <>
                <div className="w-fit mx-auto">
                  <CustomTooltip title={!isViewingRankings ? "Click to View Tier List" : "Click to View Holder Stats"}>
                    {!isViewingRankings ? (
                      <div className="border-2 border-blue-500 rounded-full cursor-pointer w-fit relative z-10 ml-auto top-[76px]">
                        <Img
                          src={FaInfo}
                          type={ImgVariant.ICON}
                          color="white"
                          className="bg-blue-500 p-0.5 rounded-full overflow-hidden border-blue-500 border box-border w-fit"
                          size={12}
                          onClick={() => setIsViewingRankings(true)}
                        />
                      </div>
                    ) : (
                      <div className="border-2 border-red-500 rounded-full cursor-pointer w-fit relative z-10 ml-auto top-[116px]">
                        <Img
                          src={FaXmark}
                          type={ImgVariant.ICON}
                          color="white"
                          className="bg-red-500 rounded-full overflow-hidden border-red-500 border box-border w-fit"
                          size={16}
                          onClick={() => setIsViewingRankings(false)}
                        />
                      </div>
                    )}
                  </CustomTooltip>{" "}
                  <Img src={cuteIcon} alt="cute fish icon" size={120} className={cn("w-fit mx-auto -mt-10", { "mt-0": isViewingRankings })} />
                </div>

                <span className={`${isViewingRankings ? "hidden" : ""}`}>
                  <div className="flex justify-center items-center gap-2">
                    <p className={"text-2xl md:text-3xl font-black text-white"}>{currentStageDetails?.currentStage?.title || "Stage One"} has started!</p>
                  </div>
                  <p className={"text-2xl text-gray-300 font-semibold transition-opacity duration-100 $"}>
                    1 USDC = {currentStageDetails?.currentStage?.per_usdc} KingFish<sup className="text-xs relative -top-2.5">™</sup>
                  </p>
                </span>
                <div className={"rounded-3xl p-2 w-full mx-auto"}>
                  <div className="flex">
                    <div className="flex flex-col w-full">
                      {isViewingRankings && <MemberTierList />}
                      {!isViewingRankings && (
                        <>
                          {!publicKey ? (
                            <div className={cn("flex flex-col gap-2 w-full", { hidden: isViewingRankings })}>
                              <p className="text-2xl text-orange-600 font-semibold">{toMbOrNone(currentStageDetails?.remainBal || 0)}</p>
                              <p className="text-2xl text-orange-600 font-semibold">
                                KingFish<sup className="text-xs relative -top-2.5">™</sup> remaining
                              </p>
                              <p className="font-light text-gray-300">{nextMsg}</p>
                            </div>
                          ) : (
                            <div className={cn("flex flex-col gap-2 w-full text-center")}>
                              <p className="text-2xl text-white font-semibold mb-3 py-2 px-4 bg-vulcan-500/80 rounded-full">
                                You have <span className="text-orange-600">{kfBalance}</span> KingFish{tm}
                              </p>
                              <div className={cn("flex flex-col gap-2")}>
                                <p className="text-lg text-white font-bold">Connected Wallet</p>
                                <p className="text-lg text-orange-600 font-bold overflow-hidden text-ellipsis">{publicKey.toBase58()}</p>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      <div className="flex gap-3 items-center justify-center mt-6">
                        {publicKey && (
                          <div className="w-full">
                            <form onSubmit={onBuyClick} className="flex items-center h-fit w-full gap-3">
                              <input
                                type="text"
                                className="w-full rounded-sm text-right h-11 px-2 text-cyan-800 border-2 box-border outline-none"
                                value={buyAmount}
                                placeholder="Enter USDC spend amt. (e.g., 10, 20, 10000...)"
                                min="1"
                                step="1"
                                required
                                pattern="^[1-9]\d*$" // This pattern ensures only positive integers are allowed
                                onChange={handleBuyAmtChange}
                              />
                              <Button
                                className={`!text-sm w-fit !px-3 ml-auto py-2 h-11 min-w-[150px] flex items-center justify-center rounded-sm text-white bg-green-500 hover:bg-green-400 active:bg-green-600`}
                                label="PLACE BUY ORDER"
                              />
                            </form>
                          </div>
                        )}

                        {!isViewingRankings && (
                          <Button
                            className={cn(`flex !p-2.5 items-center !justify-center text-white`, {
                              "bg-red-400 hover:bg-red-500 rounded-sm": !!publicKey,
                              [`${FUCHSIA_GRADIENT} !rounded--full !px-6`]: !publicKey,
                            })}
                            label={!publicKey ? "Connect Wallet" : <BiLogOut color="white" size={24} className="relative right-0.5" />}
                            onClick={() => (!publicKey ? setIsViewingWallet(true) : disconnect())}
                          />
                        )}
                      </div>

                      {confirmChecked && editStoredEmail && (
                        <div className={cn("flex gap-3 items-center justify-center mt-6", { hidden: isViewingRankings })}>
                          <div className="w-full">
                            <form onSubmit={handleEmailStore} className="flex items-center h-fit w-full gap-3">
                              <input
                                type="text"
                                className="w-full rounded-sm text-right h-11 px-2 text-cyan-800 border-2 box-border outline-none"
                                value={walletEmail}
                                placeholder="Enter preferred email..."
                                min="1"
                                step="1"
                                onChange={(e) => setWalletEmail(e.target.value)}
                              />
                              <Button
                                className={`!text-sm  !px-3 ml-auto py-2 h-11 flex items-center rounded-sm text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-600`}
                                label="SUBMIT"
                              />
                            </form>
                          </div>
                        </div>
                      )}

                      <p className={cn(`text-sm h-4 mt-2`, { buyMessage: "h-0" })}>{buyMessage}</p>
                      {publicKey && (
                        <div className="flex justify-center items-center gap-2 mt-2">
                          <input className="w-4 h-4" name="confirmCheckBox" type="checkbox" checked={confirmChecked} onChange={toggleConfirmCheck} />
                          <label className="text-white text-sm" htmlFor="confirmCheckBox">
                            Send confirmation email on trade?
                          </label>
                          {walletEmail.length > 0 && editStoredEmail === false && (
                            <p
                              className="text-blue-400 hover:text-blue-300 text-sm underline cursor-pointer"
                              onClick={() => {
                                setConfirmChecked(true);
                                setEditStoredEmail(true);
                              }}
                            >
                              [Edit Stored Email]
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {!isTransmittingTxn && isViewingRankings && <div></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresaleWindow;
