'use client';
import { fetchStories } from '@/lib/api/clientApi';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Loader from '@/components/Loader/Loader';
import StoryCard from '@/components/StoryCard/StoryCard';
import GridContainer from '@/styles/components/GridContainer/GridContainer';
import Link from 'next/link';

export default function StoriesClient() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  const { data, isSuccess, error, isLoading } = useQuery({
    queryKey: ['stories', page],
    queryFn: () => fetchStories({ page, perPage }),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  if (isLoading) return <Loader color="#FFFFFF" size={50} />;

  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <section className={`container `}>
      <h2>Історії Мандрівників</h2>
      {isSuccess && (
        <GridContainer variant="stories">
          {data.stories.map(story => {
            return (
              <li key={story.id}>
                <StoryCard
                  id={story.id}
                  title={story.title}
                  img={story.img}
                  article={story.article}
                  category={story.category}
                  ownerId={story.ownerId}
                  formattedDate={story.formattedDate}
                  favoriteCount={story.favoriteCount}
                />
              </li>
            );
          })}
        </GridContainer>
      )}
      <div>
        <button
          type="button"
          onClick={() => setPage(prev => prev + 1)}
          className="btn btn-primary btn--default"
          style={{ width: '156px' }}
        >
          Дивитися всі
        </button>
      </div>
    </section>
  );
}
