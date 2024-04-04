export interface RoadmapCardProps {
  roadmapItem: {
    title: string;
    items: {
      description: string | JSX.Element;
      completed: boolean;
    }[];
  };
  index: number;
}
