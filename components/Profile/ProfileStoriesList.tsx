'use client';

import StoryCard from '@/components/StoryCard/StoryCard';
import { Story } from '@/types/story';
import styles from './ProfileStoriesList.module.css';

interface ProfileStoriesListProps {
  stories: Story[];
  emptyMessage: string;
  onDelete?: (id: string) => void;
}

export default function ProfileStoriesList({ 
  stories, 
  emptyMessage, 
  onDelete 
}: ProfileStoriesListProps) {
  if (stories.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <div className={styles.stories_grid}>
      {stories.map((story) => (
        <StoryCard
          key={story.id}
          id={story.id}
          title={story.title}
          article={story.article}
          img={story.img}
          category={story.category}
          ownerId={story.ownerId}
          formattedDate={story.formattedDate}
          favoriteCount={story.favoriteCount}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}