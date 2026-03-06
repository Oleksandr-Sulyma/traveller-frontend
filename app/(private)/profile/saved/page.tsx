'use client';

import { useQuery } from '@tanstack/react-query';
import { getSavedStories } from '@/lib/api/clientApi';
import SavedStories from '@/components/Profile/SavedStories/SavedStories';
import Loader from '@/components/Loader/Loader';

export default function SavedStoriesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['stories', 'saved'],
    queryFn: getSavedStories,
  });

  if (isLoading) return <Loader />;

  const stories = Array.isArray(data) ? data : (data as any)?.stories || [];

  return <SavedStories stories={stories} page="profile" />;
}