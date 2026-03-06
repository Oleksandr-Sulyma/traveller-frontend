'use client';

import { useQuery } from '@tanstack/react-query';

import StoryCard from '@/components/StoryCard/StoryCard';
import Loader from '@/components/Loader/Loader';

import { fetchStories, getUserById } from '@/lib/api/clientApi';

import css from './TravellerProfilePage.module.css';
import GridContainer from '@/styles/components/GridContainer/GridContainer';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';

type Props = {
  id: string;
  perPage: number;
};

export default function TravellerProfile({ id, perPage }: Props) {
  // USER QUERY
  const {
    data: traveller,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    error: userError,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    staleTime: 60 * 1000,
    enabled: !!id,
  });

  // STORIES QUERY
  const {
    data,
    isLoading: isStoriesLoading,
    isFetching: isStoriesFetching,

    error: storiesError,
  } = useQuery({
    queryKey: ['stories', id, perPage],
    queryFn: () => fetchStories({ page: 1, perPage, author: id }),
    staleTime: 60 * 1000,
    enabled: !!id,
  });

  const hasMore = 1 < (data?.totalPages || 0);

  const isFetching = isUserFetching || isStoriesFetching;
  const isLoading = isUserLoading || isStoriesLoading;
  const error = userError || storiesError;

  if (isLoading) {
    return (
      <div className={css.stateWrapper}>
        <Loader />
      </div>
    );
  }

  if (error || !traveller || !data) {
    return (
      <div className={css.errorWrapper}>
        <div className={css.errorCard}>
          <h2 className={css.errorTitle}>Щось пішло не так :</h2>
        </div>
      </div>
    );
  }

  const stories = data.stories ?? [];

  return (
    <section className="container">
      <div className={`${css.page}`}>
        {/* PROFILE */}
        <div className={css.profileCard}>
          <img
            className={css.avatar}
            src={traveller.avatarUrl ?? '/images/default-avatar.png'}
            alt={traveller.name}
          />

          <div className={css.profileInfo}>
            <h2 className={css.name}>{traveller.name}</h2>

            {traveller.description && <p className={css.description}>{traveller.description}</p>}
          </div>
        </div>

      
        <h2 className={css.subtitle}>Історії мандрівника</h2>
<div className={css.muted}>
        {stories.length === 0 && (
          
              <h4 className={css.title}>У цього мандрівника поки що немає історій.</h4>
          
          
        )}

        {stories.length > 0 ? (
          <>
            <GridContainer variant="stories">
              {stories.map(story => (
                <li key={story.id}>
                  <StoryCard {...story} />
                </li>
              ))}
            </GridContainer>

            <div className={css.center}>
              <Pagination
                onLoadMore={prev => prev + perPage}
                isLoading={isFetching}
                hasMore={hasMore}
                perPageMap={{ mobile: 3, tablet: 4, desktop: 3 }}
                label="Показати ще"
              />
            </div>
          </>
        ) : (
          <div className={css.div}>
           
            <Link href="/stories/filter/all" className="btn btn--default btn-primary">
              Назад до історій
            </Link>
          </div>
          
        )}
        </div>
      </div>
    </section>
  );
}
