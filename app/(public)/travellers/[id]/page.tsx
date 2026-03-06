import { fetchStories, getUserById } from '@/lib/api/serverApi';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import TravellerProfile from './TravelerDetail.client';

type Props = { params: Promise<{ id: string }> };

const perPage = 6;

export default async function Page({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stories', id, perPage],

    queryFn: () => fetchStories({ page: 1, perPage, author: id }),
  });

  await queryClient.prefetchQuery({
    queryKey: ['traveller', id],
    queryFn: () => getUserById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TravellerProfile id={id} perPage={perPage} />
    </HydrationBoundary>
  );
}
