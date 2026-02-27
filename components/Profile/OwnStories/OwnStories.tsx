import StoryCard from '@/components/StoryCard/StoryCard';
import { SavedStoriesProps } from '@/types/profile';
import Link from 'next/link';
import css from './OwnStories.module.css';

const OwnStories = ({ stories }: SavedStoriesProps) => {
  return (
    <section>
      <div className="container">
        {stories.length != 0 ? (
          stories.map(story => <StoryCard {...story} />)
        ) : (
          <div className={css.div}>
            <h2 className={css.title}>
              Ви ще нічого не публікували, поділіться своєю першою історією!
            </h2>
            <Link href="/stories/create" className={css.btn}>
              Опублікувати історію
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default OwnStories;
