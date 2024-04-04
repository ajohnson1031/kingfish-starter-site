"use client";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PieChart } from "@mui/x-charts/PieChart";
import { FC, useEffect, useState } from "react";
import { TokenomicsProps } from ".";
import TokenomicsCard from "../TokenomicsCard";

const Tokenomics: FC<TokenomicsProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [pieMargin, setPieMargin] = useState(100);

  const tokenomics: Record<string, string>[] = [
    { label: "Token Name", value: "KingFish" },
    { label: "Token Symbol", value: "KFSH" },
    { label: "Decimals", value: "9" },
    { label: "Blockchain", value: "Solana Network" },
    { label: "Total Supply", value: "50,000,000,000" },
    { label: "Max Supply", value: "50,000,000,000" },
  ];

  const piedata: any = [
    { id: 1, value: 35, label: "Presale", color: "#FB923C" },
    { id: 2, value: 30, label: "Initial Liquidity", color: "#D946EF" },
    ,
    { id: 3, value: 10, label: "Rewards", color: "#22D3EE" },
    { id: 4, value: 25, label: "Marketing & Dev", color: "#A78BFA" },
  ];

  useEffect(() => {
    setPieMargin(isMobile ? 25 : 100);
  }, [isMobile]);

  return (
    <div className="flex flex-col items-center gap-8 text-white relative mt-10">
      <h2 className="text-4xl font-bold">Tokenomics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tokenomics.map((token, i) => (
          <div key={`${token.label}_${i}`}>
            <TokenomicsCard label={token.label} value={token.value} />
          </div>
        ))}
      </div>
      <h3 className="text-3xl font-semibold mt-4">Token Distribution</h3>
      <div className="w-full md:w-4/6 h-[400px] flex justify-center text-center">
        <PieChart
          series={[{ data: piedata, innerRadius: 85, outerRadius: 140, paddingAngle: 5, cornerRadius: 5, startAngle: -90, endAngle: 183, cx: 150, cy: 150 }]}
          margin={{ top: 0, right: pieMargin, bottom: 0, left: pieMargin }}
          skipAnimation
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              padding: 0,
              labelStyle: {
                fill: "white",
                fontFamily: "Exo Soft",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Tokenomics;
