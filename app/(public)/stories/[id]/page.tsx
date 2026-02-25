import { fetchStoryByIdServer } from "@/lib/api/serverApi";
import StoryDetailsClient from "./StoryDetails.client";
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import type { Story } from "@/types/story";
import { Metadata } from "next";


interface StoryDetailsPageProps {
  params: Promise<{ id: string }>
}


export async function generateMetadata({ params }: StoryDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const story = await fetchStoryByIdServer(id);
  if (!story) {
    return {
      title: "Історія не знайдена | Подорожники",
    };
  }

  return {
    title: story.title,
    description: story.article.slice(0, 160),
    openGraph: {
      title: story.title,
      description: story.article.slice(0, 160),
      images: [{ url: "тут треба лінк" }],

      url: `тут треба лінк на деплой/stories/${id}`,
    }
  }
}

export default async function StoryDetailsPage(params: StoryDetailsPageProps) {
  const queryClient = new QueryClient()
  const { id } = await params.params;

  await queryClient.prefetchQuery<Story, Error>({
    queryKey: ["story", id],
    queryFn: async () => {
      const data = await fetchStoryByIdServer(id);
      if (!data) throw new Error("Story not found");
      console.log(data)
      return data;
    }

  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoryDetailsClient storyId={id} />
    </HydrationBoundary>
  )
}

