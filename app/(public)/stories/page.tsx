import { fetchStories } from '@/lib/api/serverApi';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import StoriesClient from './Stories.client';

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stories'],
    queryFn: () => fetchStories({ page: 1, perPage: 6 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoriesClient />
    </HydrationBoundary>
  );
}
