import { Story } from "@/types/story";

type StoryCardProps = {
  storyInf: Story;
};

const StoryCard = ({ storyInf }: StoryCardProps) => {
  return (
    <div className="story-card">
      <h3>{storyInf.title}</h3>
    </div>
  );
};

export default StoryCard;