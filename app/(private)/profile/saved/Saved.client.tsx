'use client';

import { useQuery } from '@tanstack/react-query';
import { getSavedStories } from '@/lib/api/clientApi';
import SavedStories from '@/components/Profile/SavedStories/SavedStories';

export default function SavedClient() {
  const { data } = useQuery({
    queryKey: ['savedStories'],
    queryFn: getSavedStories,
    staleTime: 5 * 60 * 1000,
  });
  console.log(data);

  if (!data) return;

  return <SavedStories stories={data.stories} page="profile" />;
}
