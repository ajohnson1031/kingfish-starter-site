import { FC } from "react";
import { FishBowlProps } from ".";

const FishBowl: FC<FishBowlProps> = () => {
  return (
    <div className="container w-fit">
      <div className="bowl"></div>
      <div className="water">
        <div className="body">
          <div className="eye"></div>
          <div className="fin-center"></div>
          <div className="fin top"></div>
          <div className="fin bottom"></div>
          <div className="tail"></div>
        </div>
      </div>
      <style jsx>{`
        body {
          margin: 0;
          padding: 0;
          background: black;
        }
        .container {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .bowl {
          height: 200px;
          width: 200px;
          border-radius: 50%;
          border: 2px solid white;
          position: relative;
          animation: move 8s infinite;
        }
        @keyframes move {
          0% {
            transform: rotate(0);
          }
          33% {
            transform: rotate(-20deg);
          }
          67% {
            transform: rotate(20deg);
          }
          100% {
            transform: rotate(0);
          }
        }
        .bowl:after {
          content: "";
          position: absolute;
          width: 100px;
          height: 26px;
          border-radius: 50%;
          background: black;
          border: 2px solid white;
          left: 50%;
          top: -4px;
          transform: translatex(-50%);
          z-index: 100;
        }
        .water {
          height: 190px;
          width: 190px;
          background: linear-gradient(to bottom, black 0% 50%, #2389da 50% 100%);
          border-radius: 50%;
          position: absolute;
          top: 7px;
          left: 7px;
          animation: move1 8s infinite;
          z-index: -100;
        }
        @keyframes move1 {
          0% {
            transform: rotate(0);
          }
          33% {
            transform: rotate(20deg);
          }
          67% {
            transform: rotate(-20deg);
          }
          100% {
            transform: rotate(0);
          }
        }
        .water:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 30px;
          background: #0f5e9c;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .body {
          width: 70px;
          height: 36px;
          background: orange;
          border-radius: 40% 50% 50% 40%;
          bottom: 30px;
          right: 60px;
          position: absolute;
        }
        .fin {
          width: 40px;
          height: 24px;
          position: absolute;
          background: #ef8a1f;
          border-radius: 50%;
        }
        .fin.top {
          z-index: -100;
          transform: rotate(-20deg);
          left: 14px;
          bottom: 24px;
          border-radius: 50% 50% 0% 0%;
        }
        .fin.bottom {
          z-index: -100;
          transform: rotate(20deg);
          left: 14px;
          bottom: -12px;
          border-radius: 50% 0% 50% 50%;
        }
        .fin-center {
          height: 10px;
          width: 12px;
          background: #ef8a1f;
          border-radius: 50% 0 0 50%;
          position: absolute;
          left: 30px;
          top: 12px;
        }
        .eye {
          height: 16px;
          width: 16px;
          background: white;
          border-radius: 50%;
          position: absolute;
          left: 2px;
          top: 10px;
        }
        .eye:before {
          content: "";
          background: black;
          height: 8px;
          width: 8px;
          border-radius: 50%;
          position: absolute;
          left: 2px;
          top: 4px;
        }
        .eye:after {
          content: "";
          background: white;
          height: 4px;
          width: 4px;
          border-radius: 50%;
          position: absolute;
          left: 4px;
          top: 5px;
        }
        .tail {
          width: 32px;
          height: 72px;
          position: absolute;
          right: -10px;
          bottom: -42px;
          z-index: -200;
        }
        .tail::before {
          content: "";
          position: absolute;
          width: 32px;
          height: 20px;
          border-radius: 50%;
          background: #ef8a1f;
          transform: rotate(-30deg);
          top: -10px;
        }
        .tail::after {
          content: "";
          position: absolute;
          width: 32px;
          height: 20px;
          border-radius: 50%;
          background: #ef8a1f;
          transform: rotate(30deg);
          top: 10px;
        }
      `}</style>
    </div>
  );
};

export default FishBowl;