import { ReactNode } from "react";

export interface RoadmapProps {
  roadmapItems: {
    title: string;
    items: {
      description: string | ReactNode;
      completed: boolean;
    }[];
  }[];
}
