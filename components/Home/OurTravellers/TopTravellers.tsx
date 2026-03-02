'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import css from './TopTravellers.module.css';
import Loader from '@/components/Loader/Loader';
import GridContainer from '@/styles/components/GridContainer/GridContainer';
import TravelerCard from '@/components/TravellerCard/TravellerCard';
import { fetchAllUsers } from '@/lib/api/clientApi';
import { User } from '@/types/user';

export default function TopTravellers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers({
          page: 1,
          perPage: 4,
          sortBy: 'articlesAmount',
          sortOrder: 'desc',
        });

        if (data && data.users) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error('Помилка при отриманні мандрівників:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Якщо даних ще немає або loading, показуємо скелетони
  const displayUsers = loading ? Array(4).fill({ id: 'skeleton' }) : users;

  return (
    <section className="container">
      <div className={css.wrapper}>
        <h2 className={css.title}>Наші Мандрівники</h2>

        <div className={css.content}>
          <GridContainer variant="travellers">
            {displayUsers.map((user, index) => {
              const isSkeleton = !user._id || user.id === 'skeleton';

              return (
                <li key={isSkeleton ? `skel-${index}` : user._id}>
                  {!isSkeleton ? (
                    <TravelerCard
                      avatarUrl={user.avatarUrl}
                      name={user.name}
                      description={user.description}
                      _id={user._id}
                    />
                  ) : (
                    <div className={css.loader_item}>
                      <Loader size={50} />
                    </div>
                  )}
                </li>
              );
            })}
          </GridContainer>

          <div className={`${css.action_wrapper} ${css.mobile_hidden}`}>
            <Link
              href="/travellers"
              className="btn btn-primary btn--default"
              style={{ width: '156px' }}
            >
              Переглянути всіх
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
