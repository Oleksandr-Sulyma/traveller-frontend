'use client';

import { useQuery } from '@tanstack/react-query';
import { getOwnStories } from '@/lib/api/clientApi';
import OwnStories from '@/components/Profile/OwnStories/OwnStories';
import Loader from '@/components/Loader/Loader';

export default function MyStoriesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['stories', 'own'],
    queryFn: getOwnStories,
  });

  if (isLoading) return <Loader />;

  const stories = Array.isArray(data) ? data : (data as any)?.stories || [];

  return <OwnStories stories={stories} page="profile" />;
}