import StoryCard from "@/components/StoryCard/StoryCard";
import type { Story } from "@/types/story";

async function getStories(): Promise<Story[]> {
  const res = await fetch("/api/stories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch stories");
  }

  return res.json();
}

export default async function Page() {
  const stories = await getStories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Історії</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} {...story} />
        ))}
      </div>
    </div>
  );
}