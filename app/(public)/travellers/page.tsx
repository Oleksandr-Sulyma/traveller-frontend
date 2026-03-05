'use client';

import { useEffect, useState } from 'react';
import type { User } from '@/types/user';
import { fetchAllUsers } from '@/lib/api/clientApi'; // ПЕРЕВІРТЕ ЦЕЙ ШЛЯХ (можливо @/api/api)
import TravelerCard from '@/components/TravellerCard/TravellerCard';
import Pagination from '@/components/Pagination/Pagination';
import css from './TravellersPage.module.css';

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const getInitialPerPage = () => {
    if (typeof window === 'undefined') return 12;
    const w = window.innerWidth;
    if (w >= 1440) return 12;
    return 8;
  };

  const fetchUsers = async (limit: number) => {
    setIsLoading(true);
    try {
      const data = await fetchAllUsers({ 
        page: 1, 
        perPage: limit 
      });

      setUsers(data.users);
      setTotalPages(data.totalPages);
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

  const hasMore = users.length > 0 && totalPages > 1; 

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
