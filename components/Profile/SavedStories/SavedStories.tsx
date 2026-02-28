import StoryCard from '@/components/StoryCard/StoryCard';
import { SavedStoriesProps } from '@/types/profile';
import Link from 'next/link';
import css from './SavedStories.module.css';

const SavedStories = ({ stories }: SavedStoriesProps) => {
  return (
    <section>
      <div className="container">
        {stories.length != 0 ? (
          stories.map(story => <StoryCard key={story.id} storyInf={story} />)
        ) : (
          <div className={css.div}>
            <h2 className={css.title}>
              У вас ще немає збережених історій, мершій збережіть вашу першу історію!
            </h2>
            <Link href="/stories" className={css.btn}>
              До історій
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedStories;
