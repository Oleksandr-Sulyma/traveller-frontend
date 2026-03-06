import SavedStories from '@/components/Profile/SavedStories/SavedStories';
import { getSavedStories } from '@/lib/api/serverApi';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import SavedClient from './Saved.client';

export default async function Saved() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['savedStories', 'story'],
    queryFn: () => getSavedStories(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SavedClient />
    </HydrationBoundary>
  );
}
