export interface CommunityCardProps {
  title: string;
  url?: string;
  image: string;
  description: string | JSX.Element;
  buttonText: string;
  bgcolor: string;
  className?: string;
}
