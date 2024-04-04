import { RoadmapCard } from "@/components";
import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { RoadmapProps } from ".";

const Roadmap: FC<RoadmapProps> = ({ roadmapItems }) => {
  return (
    <div className="w-full md:w-3/4 h-fit flex flex-col items-center gap-8 text-white relative mt-20">
      <h2 className="text-4xl font-bold">Roadmap</h2>
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 rounded-t-lg bg-gradient-to-b from-fuchsia-800/20 pt-6 md:pt-12">
        {roadmapItems.map((item, i) => {
          const uuid = uuidv4();
          return <RoadmapCard key={uuid} roadmapItem={item} index={i} />;
        })}
      </div>
    </div>
  );
};

export default Roadmap;
