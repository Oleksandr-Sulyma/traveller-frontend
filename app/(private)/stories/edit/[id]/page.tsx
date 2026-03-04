'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getStoryById } from '@/lib/api/clientApi';
import Loader from '@/components/Loader/Loader';
import toast from 'react-hot-toast';
import NotFound from '@/app/not-found';
import css from '@/components/StoryForm/StoryForm.module.css';
import EditStoryForm from '@/components/StoryForm/EditStoryForm';

const StoryDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: story,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['story', id],
    queryFn: () => getStoryById(id),
    refetchOnMount: false,
  });

  useEffect(() => {
    if (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong.');
    }
  }, [error]);

  if (isLoading) return <Loader />;

  if (error || !story) return <NotFound />;

  return (
    <div className={css.container}>
      <EditStoryForm story={story} />
    </div>
  );
};

export default StoryDetailsClient;
