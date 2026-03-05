'use client';

import { useEffect, useState } from 'react';
import type { User } from '@/types/user';
import { fetchAllUsers } from '@/lib/api/clientApi';
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
    return w >= 1440 ? 12 : 8;
  };

  const fetchUsers = async (limit: number) => {
    setIsLoading(true);
    try {
      // Використовуємо QueryParams: { page, perPage }
      const data = await fetchAllUsers({ 
        page: 1, 
        perPage: limit 
      });

      // Згідно з UsersHttpResponse, дані лежать у data.users
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

  // Логіка hasMore: якщо поточна кількість завантажених користувачів 
  // менша за загальну кількість (якщо б вона була) або якщо ми ще не на останній сторінці.
  // Оскільки ми просто збільшуємо perPage, логіка спрощується:
  const hasMore = users.length > 0 && totalPages > 1; 

  const handleLoadMore = async () => {
    // Збільшуємо кількість на сторінці (або реалізуйте справжню пагінацію по сторінках)
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
                id={u.id} // Використовуємо id (string) з вашого інтерфейсу User
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
  );
}
