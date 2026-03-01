'use client';
import css from './Team.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TravelerCard from '@/components/TravellerCard/TravellerCard';
import { User } from '@/types/user';
import Link from 'next/link';

interface RequestUser {
  users: User[];
  totalPages: number;
}

export default function Team() {
  const [users, setUsers] = useState<User[]>([]);
  const perPage = 4;

  const fetchUsers = async (perPage: number, nextPage: number) => {
    try {
      const { data } = await axios.get<RequestUser>(
        'https://traveller-backend-lia1.onrender.com/users',
        { params: { page: nextPage, perPage } }
      );

      setUsers([...data.users]);
    } catch (error) {
      console.error('Помилка при отриманні користувачів:', error);
    }
  };

  useEffect(() => {
    fetchUsers(perPage, 1);
  }, []);
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
                  description={user.description}
                  _id={user._id}
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
