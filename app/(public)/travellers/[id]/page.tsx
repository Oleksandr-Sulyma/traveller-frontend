'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/app/api/api';
import type { User } from '@/types/user';

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get<User>(`/users/${id}`);
        setUser(data);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [id]);

  if (isLoading) return <div>Завантаження...</div>;
  if (!user) return <div>Немає даних</div>;

  return (
    <div>
      <img src={user.avatarUrl} alt={user.name} width={200} height={200} />
      <h1>{user.name}</h1>
      <p>{user.description}</p>
    </div>
  );
}