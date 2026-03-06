import StoryCard from '@/components/StoryCard/StoryCard';
import { SavedStoriesProps } from '@/types/profile';
import Link from 'next/link';
import css from './SavedStories.module.css';

const SavedStories = ({ stories }: Story[]) => {
  return (
    <section>
      <div className="container">
        <div className={css.wrapDiv}>
          {stories.length != 0 ? (
            stories.map(story => (
              <StoryCard key={story.id} {...story} savedStoryIds={stories.map(story => story.id)} />
            ))
          ) : (
            <div className={css.div}>
              <h4>У вас ще немає збережених історій, мершій збережіть вашу першу історію!</h4>
              <Link
                href="/stories/filter/all"
                className={`btn btn-primary btn--default ${css.btn}`}
              >
                До історій
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SavedStories;
