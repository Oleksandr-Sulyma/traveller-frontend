import css from './PopularStoriesSection.module.css';
import { fetchStories } from '@/lib/api/serverApi';
import StoryCard from '@/components/StoryCard/StoryCard';
import GridContainer from '@/styles/components/GridContainer/GridContainer';
import Link from 'next/link';
import { Story } from '@/types/story';

export default async function PopularStoriesSection() {
  let stories: Story[] = [];
  let isLoadingError = false;

  try {
    const response = await fetchStories({ perPage: 4 });
    stories = response?.stories || [];
    console.log("STORIES=", stories);
    
  } catch (error) {
    console.error("Failed to fetch stories:", error);
    isLoadingError = true;
    // Ми не робимо return null, а йдемо далі, щоб відрендерити структуру
  }

  // Створюємо масив "заглушок", якщо даних немає
  const displayStories = stories.length > 0 
    ? stories 
    : Array(4).fill({ id: 'skeleton' }); // Створюємо 4 фейкових об'єкти

    console.log("DEBUG: stories length ->", stories.length);
console.log("DEBUG: displayStories length ->", displayStories.length);
  return (
   <section className={`container ${css.section}`}>
  <h2 className={css.title}>Популярні історії</h2>

<GridContainer variant="stories">
  {displayStories.map((story, index) => {
    const isSkeleton = !story._id || story._id === 'skeleton';
    
    return (
      <li key={isSkeleton ? `skel-${index}` : story._id}>
        {!isSkeleton ? (
          <StoryCard 
            _id={story._id}
            title={story.title}
            img={story.img}
            article={story.article}
            category={story.category}
            // ЗМІНИ ТУТ:
            ownerId={story.ownerId}      // Передаємо весь об'єкт автора
            formattedDate={story.formattedDate} // Передаємо готову дату
            favoriteCount={story.favoriteCount}
          />
        ) : (
          <div className={css.skeleton_card}>Завантаження...</div>
        )}
      </li>
    );
  })}
</GridContainer>

  <Link
    href="/stories"
    className={`btn btn-primary ${css.btn}`}
    style={{ height: '48px', width: '156px' }}
  >
    Дивитися всі
  </Link>
</section>
  );
}