import { ReactNode } from "react";

export interface RoadmapCardProps {
  roadmapItem: {
    title: string;
    items: {
      description: string | ReactNode;
      completed: boolean;
    }[];
  };
  index: number;
}
