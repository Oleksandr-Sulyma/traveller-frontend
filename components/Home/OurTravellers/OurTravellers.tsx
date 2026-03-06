'use client';
import css from './OurTravellers.module.css';
import TravelerCard from '@/components/TravellerCard/TravellerCard';
import { User } from '@/types/user';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchAllUsers } from '@/lib/api/clientApi';

interface RequestUser {
  users: User[];
  totalPages: number;
}

export default function OurTravellers() {
  const perPage = 4;

  const { data, isLoading, isError, error } = useQuery<RequestUser>({
    queryKey: ['users', perPage],
    queryFn: () => fetchAllUsers({ perPage }),
  });

  if (isLoading) {
    return <p>Завантаження мандрівників... ✈️</p>;
  }

  if (isError) {
    return (
      <p>
        Вибачте, не вдалося завантажити список мандрівників. 😔 Спробуйте оновити сторінку трохи
        пізніше.
        <br />
        <small>{error?.message}</small>
      </p>
    );
  }

  console.log(data);

  if (!data || data.users.length === 0) {
    return <p>Мандрівників поки що немає. 🧳</p>;
  }
  return (
    <section className="container">
      <div className={css.wrapper}>
        <h2>Наші Мандрівники</h2>
        <div className={css.positionUlButton}>
          <ul className={css.wrapperUl}>
            {data.users.map(user => (
              <li key={user._id}>
                <TravelerCard
                  avatarUrl={user.avatarUrl}
                  name={user.name}
                  description={user.description}
                  id={user._id}
                />
              </li>
            ))}
          </ul>
          <Link
            className="btn btn-primary"
            style={{ height: '48px', width: '156px' }}
            href="/travellers"
          >
            Переглянути всіх
          </Link>
        </div>
      </div>
    </section>
  );
}
