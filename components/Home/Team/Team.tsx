'use client';
import css from './Team.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TravelerCard from '@/components/TravellerCard/TravellerCard';
import { User } from '@/types/user';
import Pagination from '@/components/Pagination/Pagination';

interface RequestUser {
  users: User[];
  totalPages: number;
}

export default function Team() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const perPage = 4;

  const fetchUsers = async (perPage: number, nextPage: number) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<RequestUser>(
        'https://traveller-backend-lia1.onrender.com/users',
        { params: { page: nextPage, perPage } }
      );

      setUsers(prev => [...prev, ...data.users]);

      setHasMore(data.users.length === perPage);
    } catch (error) {
      console.error('Помилка при отриманні користувачів:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(perPage, 1);
  }, []);

  const handleLoadMore = (perPage: number) => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(perPage, nextPage);
  };

  return (
    <section className="container">
      <div className={css.wrapper}>
        <h2>Наші Мандрівники</h2>
        <div className={css.positionUlButton}>
          <ul className={css.wrapperUl}>
            {users.map(user => (
              <li key={user._id}>
                <TravelerCard
                  avatarUrl={user.avatarUrl}
                  name={user.name}
                  description={user.description ?? 'Без опису'}
                  _id={user._id}
                />
              </li>
            ))}
          </ul>
          {hasMore && (
            <Pagination
              onLoadMore={handleLoadMore}
              isLoading={isLoading}
              hasMore={hasMore}
              perPageMap={{ mobile: 4, tablet: 4, desktop: 4 }}
              label="Переглянути ще"
            />
          )}
        </div>
      </div>
    </section>
  );
}
