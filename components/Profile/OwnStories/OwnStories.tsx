import StoryCard from '@/components/StoryCard/StoryCard';
import { SavedStoriesProps } from '@/types/profile';
import Link from 'next/link';
import css from './OwnStories.module.css';

const OwnStories = ({ stories, page }: SavedStoriesProps) => {
  return (
    <section>
      <div className="container">
        <div className={css.wrapDiv}>
          {stories.length != 0 ? (
            stories.map(story => <StoryCard key={story.id} {...story} />)
          ) : page === 'profile' ? (
            <div className={css.div}>
              <h4>Ви ще нічого не публікували, поділіться своєю першою історією!</h4>
              <Link href="/stories/create" className={`btn btn-primary btn--default ${css.btn}`}>
                Опублікувати історію
              </Link>
            </div>
          ) : (
            <div className={css.div}>
              <h4>Цей користувач ще не публікував історій</h4>
              <Link
                href="/stories/filter/all"
                className={`btn btn-primary btn--default ${css.btn}`}
              >
                Назад до історій
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OwnStories;
