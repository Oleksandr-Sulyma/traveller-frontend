import StoryForm from '@/components/StoryForm/StoryForm';
import { fetchCategories } from '@/lib/api/serverApi';

export default async function NewStoryPage() {
  const categories = await fetchCategories();

  return (
    <div>
      <StoryForm categories={categories} />
    </div>
  );
}
