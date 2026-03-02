import css from './PopularStoriesSection.module.css';
import { fetchStories } from '@/lib/api/serverApi';
import StoryCard from '@/components/StoryCard/StoryCard';
import Loader from '@/components/Loader/Loader';
import GridContainer from '@/styles/components/GridContainer/GridContainer';
import Link from 'next/link';
import { Story } from '@/types/story';

export default async function PopularStoriesSection() {
  let stories: Story[] = [];

  try {
    const response = await fetchStories({
      perPage: 4,
      sortBy: 'favoriteCount',
    });
    stories = response?.stories || [];
  } catch (error) {
    console.error('Failed to fetch stories:', error);
  }

  const displayStories = stories.length > 0 ? stories : Array(4).fill({ id: 'skeleton' });

  return (
    <section className={`container ${css.section}`}>
      <h2 className={css.title}>Популярні історії</h2>
      <GridContainer variant="stories" className={css.popular_grid}>
        {displayStories.map((story, index) => {
          const isSkeleton = !story.id || story.id === 'skeleton';
          return (
            <li key={isSkeleton ? `skel-${index}` : story.id}>
              {!isSkeleton ? (
                <StoryCard
                  id={story.id}
                  title={story.title}
                  img={story.img}
                  article={story.article}
                  category={story.category}
                  // ЗМІНИ ТУТ:
                  ownerId={story.ownerId}
                  formattedDate={story.formattedDate}
                  favoriteCount={story.favoriteCount}
                />
              ) : (
                <div className={css.loader_wrapper}>
                  <Loader size={50} />
                </div>
              )}
            </li>
          );
        })}
      </GridContainer>
      <div className={css.btn}>
        <Link
          href="/stories"
          className="btn btn-primary"
          style={{ height: '48px', width: '156px' }}
        >
          Дивитися всі
        </Link>
      </div>
    </section>
  );
}
