export interface RoadmapProps {
  roadmapItems: {
    title: string;
    items: {
      description: string | JSX.Element;
      completed: boolean;
    }[];
  }[];
}
