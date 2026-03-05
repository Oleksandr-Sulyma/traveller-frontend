'use client';

import { useEffect, useState } from 'react';
import type { User } from '@/types/user';
import { fetchAllUsers } from '@/api/clientApi';
import TravelerCard from '@/components/TravellerCard/TravellerCard';
import Pagination from '@/components/Pagination/Pagination';
import css from './TravellersPage.module.css';

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getInitialPerPage = () => {
    if (typeof window === 'undefined') return 12;
    const w = window.innerWidth;
    return w >= 1440 ? 12 : 8;
  };

  const fetchUsers = async (limit: number) => {
    setIsLoading(true);

    try {
      const data = await fetchAllUsers({ page: 1, perPage: limit });

      setUsers(data.users);

      if (data.totalPages) {
         setTotal(data.totalPages); // Або інша логіка підрахунку загальної кількості
      }

    } catch (error) {
      console.error('Fetch users failed:', error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(getInitialPerPage());
  }, []);

  const hasMore = users.length > 0 && (!total || users.length < total * 10); 

  const handleLoadMore = async () => {
    await fetchUsers(users.length + 4);
  };

  return (
    <div className={css.page}>
      <div className="container">
        <h1 className={css.title}>Мандрівники</h1>

        <ul className={css.list}>
          {users.map((u) => (
            <li key={u.id} className={css.item}>
              <TravelerCard
                id={u.id}
                name={u.name}
                description={u.description}
                avatarUrl={u.avatarUrl ?? '/images/default-avatar.png'}
              />
            </li>
          ))}
        </ul>

        <div className={css.pagination}>
          <Pagination
            onLoadMore={handleLoadMore}
            isLoading={isLoading}
            hasMore={hasMore}
            perPageMap={{ mobile: 8, tablet: 8, desktop: 12 }}
            label="Показати ще"
          />
        </div>
      </div>
    </div>
  );
}
