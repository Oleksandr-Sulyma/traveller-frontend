import { getStoryById } from "@/lib/api/serverApi";
import StoryDetailsClient from "./StoryDetails.client";
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import type { Story } from "@/types/story";
import { Metadata } from "next";
import { BASE_URL } from "@/lib/constants/seo";


interface StoryDetailsPageProps {
  params: Promise<{ id: string }>
}


// export async function generateMetadata({ params }: StoryDetailsPageProps): Promise<Metadata> {
//   const { id } = await params;
//   try {

//     const story = await getStoryById(id);


//     if (!story) {
//       return { title: "Історія не знайдена | Подорожники" };
//     }


//     const description = story.article ? story.article.slice(0, 160) : "Подорожники — цікаві історії";


//     return {
//       title: `${story.title} | Подорожники`,
//       description,
//       openGraph: {
//         title: story.title,
//         description,
//         images: [{ url: story.img }],
//         url: `${BASE_URL}/stories/${id}`,
//       }
//     };
//   } catch (error) {
//     console.error("Metadata error:", error);
//     return { title: "Подорожники" };
//   }
// }


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

