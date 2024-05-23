import cn from "classnames";
import { FC } from "react";
import { BiCheckbox, BiCheckboxSquare } from "react-icons/bi";
import { RoadmapCardProps } from ".";

const RoadmapCard: FC<RoadmapCardProps> = ({ roadmapItem, index }) => {
  const { title, items } = roadmapItem;
  const isEven = index % 2 === 0;

  return (
    <div className={cn("flex flex-col items-center gap-1", { "md:justify-self-end": isEven, "md:justify-self-start": !isEven })}>
      <p className="text-xl font-bold">{title}</p>
      <div className="h-fit w-10/12 md:w-[350px] py-4 px-10 rounded-md bg-gradient-to-b from-cyan-200/30 to-fuchsia-500/20">
        {items.map((item, i) => {
          const { description, completed } = item;
          const checkbox = completed ? <BiCheckboxSquare size={20} /> : <BiCheckbox size={20} />;
          return (
            <div key={`${description}_${i}`} className="flex gap-2 items-center ">
              <div className="w-5 h-5"> {checkbox}</div>
              <p className={cn("font-semibold py-1 whitespace-pre-line", { "line-through text-gray-300": completed })}>{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapCard;
