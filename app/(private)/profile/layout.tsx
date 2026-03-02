'use client';

import ProfileNavigation from '@/components/Profile/ProfileNavigation/ProfileNavigation';
import TravellerInfo from '@/components/Profile/TravellerInfo/TravellerInfo';
import { useEffect, useState } from 'react';
import { getMe } from '@/lib/api/clientApi';
import { User } from '@/types/user';

const DEFAULT_AVATAR =
  'https://png.pngtree.com/thumb_back/fh260/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const data = await getMe();
        if (data) {
          setUserData(data); // без data.user
        } else {
          setError('Користувач не знайдений');
        }
      } catch (err: any) {
        console.error('Помилка при завантаженні даних користувача:', err);
        setError('Не вдалося завантажити дані користувача.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Завантаження профілю...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (!userData) return null; // просто на всякий випадок

  return (
    <div>
      <TravellerInfo
        imgLink={userData.avatarUrl || DEFAULT_AVATAR}
        name={userData.name || 'Без імені'}
        description={userData.description || 'Опис відсутній'}
      />
      <ProfileNavigation />
      <div>{children}</div>
    </div>
  );
}
