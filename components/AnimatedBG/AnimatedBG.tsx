import bubone from "@/assets/bub-1.png";
import bubtwo from "@/assets/bub-2.png";
import bubthree from "@/assets/bub-3.png";
import bubfour from "@/assets/bub-4.png";
// ? These lines are commented out instead of deleted because
// ? we're still not sure that not using the fish graphics is the final direction
// import fishone from "@/assets/ef-1.png";
// import fishtwo from "@/assets/ef-2.png";
// import fishthree from "@/assets/ef-3.png";
// import fishfour from "@/assets/ef-4.png";
// import fishfive from "@/assets/ef-5.png";
import { Img } from "@/components";
import { StaticImageData } from "next/image";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { AnimatedBGProps } from "./AnimatedBG.types";

const AnimatedBG: FC<AnimatedBGProps> = () => {
  const [bubg] = useState([bubone, bubtwo, bubthree, bubfour]);
  const [bubbles, setBubbles] = useState<any[]>([]);

  let randomTop = 0,
    randomLeft = 0;

  const generateGraphics = (graphics: StaticImageData[], setter: Dispatch<SetStateAction<any[]>>, amount: number, widths: number[]) => {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const output: any = [];

    for (var i = 0; i < amount; i++) {
      // get random numbers for each element
      randomTop = Math.floor(getRandomNumber(0, winHeight));
      randomLeft = Math.floor(getRandomNumber(0, winWidth));
      const width = Math.floor(getRandomNumber(widths[0], widths[1]));
      const top = `${randomTop}px`;
      const left = `${randomLeft}px`;

      // update top and left position
      output.push(<Img key={i} src={graphics[Math.floor(Math.random() * graphics.length)]} width={width} className={"relative"} style={{ top, left }} />);
    }

    setter((prevState) => [...prevState, ...output]);
  };

  const getRandomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  useEffect(() => {
    generateGraphics(bubg, setBubbles, 50, [5, 20]);
  }, []);

  return (
    <div className="animated-bg fixed top-0 left-0 h-full w-full -z-1">
      <div className="absolute top-0 left-0 w-full h-full">{bubbles.map((bubble) => bubble)}</div>
    </div>
  );
};

export default AnimatedBG;
