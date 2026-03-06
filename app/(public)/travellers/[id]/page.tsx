import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchStories } from '@/lib/api/serverApi';
import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { userAgent } from 'next/server';
import { headers } from 'next/headers';
import { getUserById } from '@/lib/api/serverApi';
import TravellerProfile from './TravelerDetail.client';

type Props = { params: Promise<{ id: string }> };

const perPage = 6;

export default async function Page({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stories', id, perPage],
    queryFn: () => fetchStories({ page: 1, perPage, ownerId: id }),
  });

      if (newTotal !== null) {
        setTotal(newTotal);
      } else if (!append && newStories.length < perPage) {
        setTotal(newStories.length);
      }
    } catch (e: any) {
      console.error('Помилка завантаження профілю:', e);
      if (!append) {
        setTraveller(null);
        setStories([]);
        setTotal(0);
        setError('Мандрівника не знайдено або сталася помилка.');
      }
    } finally {
      if (append) setLoadingMore(false);
      else setLoading(false);
    }
  };

  // Скидаємо стан і завантажуємо дані при зміні ID
  useEffect(() => {
    if (!id) return;
    setPage(1);
    setStories([]);
    setTotal(null);
    load(1, false);
  }, [id]);

  const onLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    const next = page + 1;
    setPage(next);
    await load(next, true);
  };

  if (loading && !traveller) {
    return (
      <div className={css.stateWrapper}>
        <Loader />
      </div>
    );
  }

  if (error && !traveller) {
    return (
      <div className={css.errorWrapper}>
        <div className={css.errorCard}>
          <h2 className={css.errorTitle}>Щось пішло не так </h2>
          <p className={css.errorText}>{error}</p>
          <button className={css.retryBtn} onClick={() => window.location.reload()}>
            Спробувати ще раз
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${css.page} container`}>
      {traveller && (
        <div className={css.profileCard}>
          <img
            className={css.avatar}
            src={traveller.avatarUrl ?? '/images/default-avatar.png'}
            alt={traveller.name ?? 'Traveller'}
          />
          <div className={css.profileInfo}>
            <h2 className={css.name}>{traveller.name}</h2>
            {traveller.description && <p className={css.description}>{traveller.description}</p>}
          </div>
        </div>
      )}

      <div className={css.wrapperStories}>
        <h2 className={css.subtitle}>Історії мандрівника</h2>
        {stories.length === 0 && !loading && !error && (
          <p className={css.muted}>У цього мандрівника поки що немає історій.</p>
        )}
        {stories.length > 0 && (
          <ul className={css.storiesGrid}>
            {stories.map(story => (
              <li key={story.id} className={css.storyItem}>
                <StoryCard {...story} />
              </li>
            ))}
          </ul>
        )}
      </div>

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
