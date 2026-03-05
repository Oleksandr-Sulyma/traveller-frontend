'use client';
import css from '../../Stories.module.css';
import { fetchStories, getMe } from '@/lib/api/clientApi';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Loader from '@/components/Loader/Loader';
import StoryCard from '@/components/StoryCard/StoryCard';
import GridContainer from '@/styles/components/GridContainer/GridContainer';
import Pagination from '@/components/Pagination/Pagination';

interface StoriesClientProps {
  category?: string;
  perPages: number;
}

export default function StoriesClient({ category, perPages }: StoriesClientProps) {
  const [perPage, setPerPage] = useState(perPages);

  const { data: me } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const { data, isSuccess, error, isLoading, isFetching } = useQuery({
    queryKey: ['stories', perPage, category],
    queryFn: () => fetchStories({ page: 1, perPage, category }),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const hasMore = isSuccess && 1 < (data?.totalPages || 0);

  const handleLoadMore = () => {
    const increment = window.innerWidth < 1024 ? 4 : 6; // mobile/tablet vs desktop
    setPerPage(prev => prev + increment);
  };

  if (isLoading) return <Loader color="#FFFFFF" size={50} />;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <section className={`${css.section} container`}>
      {isSuccess && (
        <>
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
                    currentUserId={me?.id}
                    savedStoryIds={me?.savedStories}
                  />
                </li>
              );
            })}
          </GridContainer>

          <div className={css.center}>
            <Pagination
              onLoadMore={handleLoadMore}
              isLoading={isFetching}
              hasMore={hasMore}
              perPageMap={{ mobile: 3, tablet: 4, desktop: 3 }}
              label="Показати ще"
            />
          </div>
        </>
      )}
    </section>
  );
}
