import { getStoryById } from "@/lib/api/serverApi";
import StoryDetailsClient from "./StoryDetails.client";
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import type { Story } from "@/types/story";
import { Metadata } from "next";
import { BASE_URL } from "@/lib/constants/seo";


interface StoryDetailsPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: StoryDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    
    const story = await getStoryById(id);

    
    const title = story?.title ? `${story.title} | Подорожники` : "Історія | Подорожники";
    const description = story?.article?.slice(0, 160) || "Подорожники — цікаві історії";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: story?.img ? [{ url: story.img }] : [],
      },
    };
  } catch (error) {
    
    return {
      title: "Подорожники - Історія",
      description: "Цікаві історії про подорожі"
    };
  }
}



export default async function StoryDetailsPage(params: StoryDetailsPageProps) {
  const queryClient = new QueryClient()
  const { id } = await params.params;

  await queryClient.prefetchQuery<Story, Error>({
    queryKey: ["story", id],
    queryFn: async () => {
      const data = await getStoryById(id);
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

