import { fetchStories } from '@/lib/api/serverApi';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import StoriesClient from './Stories.client';
import { userAgent } from 'next/server';
import { headers } from 'next/headers';

type FilteredStoriesProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function Page({ params }: FilteredStoriesProps) {
  const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();

  const { device } = userAgent({ headers: await headers() });
  const perPage = device.type === 'desktop' || device.type === 'mobile' ? 9 : 8;

  await queryClient.prefetchQuery({
    queryKey: ['stories', category, perPage],
    queryFn: () => fetchStories({ page: 1, perPage, category }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoriesClient category={category} perPages={perPage} />
    </HydrationBoundary>
  );
}
