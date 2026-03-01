'use client';

import { useEffect, useState } from 'react';
import nextServer  from '@/lib/api/api';
import type { User } from '@/types/user';
import type { Story } from '@/types/story';
import StoryCard from '@/components/StoryCard/StoryCard';
import Loader from '@/components/Loader/Loader';
import css from './TravellerProfilePage.module.css';

type Props = { params: { id: string } };

export default function Page({ params }: Props) {
  const id = params.id;

  const [traveller, setTraveller] = useState<User | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [total, setTotal] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const perPage = 6;

  const hasMore = total === null ? true : stories.length < total;

  const getPayload = (data: any) => data?.data ?? data;

  const load = async (nextPage: number, append: boolean) => {
    append ? setLoadingMore(true) : setLoading(true);
    setError(null);

    try {
      const res = await nextServer.get(`/users/${id}`, {
        params: { page: nextPage, perPage, sortBy: 'createdAt', sortOrder: 'desc' },
      });

      const payload = getPayload(res.data);

      setTraveller(payload as User);

      const newStories = (payload?.stories ?? []) as Story[];
      const newTotal = typeof payload?.total === 'number' ? payload.total : null;

      setStories((prev) => (append ? [...prev, ...newStories] : newStories));
      if (newTotal !== null) setTotal(newTotal);
      else if (!append && newStories.length < perPage) setTotal(newStories.length);
    } catch (e) {
      console.error(e);
      if (!append) {
        setTraveller(null);
        setStories([]);
        setTotal(0);
      }
      setError('Мандрівника не знайдено або сталася помилка.');
    } finally {
      append ? setLoadingMore(false) : setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setStories([]);
    setTotal(null);
    load(1, false);
  }, [id]);

  const onLoadMore = async () => {
    const next = page + 1;
    setPage(next);
    await load(next, true);
  };

  if (loading && !traveller) {
    return (
    <div className={css.stateWrapper}>
      < Loader />
    </div>
  );
}
  if (error && !traveller) {
     return (
    <div className={css.errorWrapper}>
      <div className={css.errorCard}>
        <h2 className={css.errorTitle}>Щось пішло не так :(</h2>
        <p className={css.errorText}>
          Мандрівника не знайдено або сталася помилка.
        </p>
        <button
          className={css.retryBtn}
          onClick={() => window.location.reload()}
        >
          Спробувати ще раз
        </button>
      </div>
    </div>
  );
}

  return (
    <div className={css.page}>
      {}
      {traveller && (
        <div className={css.profileCard}>
          <img
            className={css.avatar}
            src={traveller.avatarUrl ?? '/images/default-avatar.png'}
            alt={traveller.name ?? 'Traveller'}
          />
          <div className={css.profileInfo}>
            <h2 className={css.name}>{traveller.name}</h2>
            {traveller.description && (
              <p className={css.description}>{traveller.description}</p>
            )}
          </div>
        </div>
      )}

      <h2 className={css.subtitle}>Історії мандрівника</h2>

      {stories.length === 0 && !error && (
        <p className={css.muted}>У цього мандрівника поки що немає історій.</p>
      )}

      {stories.length > 0 && (
        <ul className={css.storiesGrid}>
          {stories.map((story) => (
            <li key={story.id} className={css.storyItem}>
              <StoryCard {...story} />
            </li>
          ))}
        </ul>
      )}

      {stories.length > 0 && (
        <div className={css.actions}>
          <button
            className={css.loadMore}
            type="button"
            onClick={onLoadMore}
            disabled={loadingMore || !hasMore}
          >
            {loadingMore ? 'Завантаження…' : hasMore ? 'Показати ще' : 'Більше немає'}
          </button>
        </div>
      )}
    </div>
  );
}

