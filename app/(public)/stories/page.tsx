import StoryCard from '@/components/StoryCard/StoryCard';
import { fetchStories } from '@/lib/api/serverApi';

export default async function Page() {
  const { stories } = await fetchStories({
    perPage: 10,
    sortOrder: 'desc',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Історії</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stories && stories.length > 0 ? (
          stories.map(story => <StoryCard key={story.id} {...story} />)
        ) : (
          <p>Історій поки що немає.</p>
        )}
      </div>
    </div>
  );
}
