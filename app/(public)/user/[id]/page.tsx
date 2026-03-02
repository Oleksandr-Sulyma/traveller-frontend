'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TravellerInfo from '@/components/Profile/TravellerInfo/TravellerInfo';
import OwnStories from '@/components/Profile/OwnStories/OwnStories';
import { Story } from '@/types/story';
import { getUserById, getOwnStories } from '@/lib/api/clientApi';
import css from './userProfile.module.css';

const DEFAULT_AVATAR =
  'https://png.pngtree.com/thumb_back/fh260/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg';

const UserProfile = () => {
  const params = useParams();
  const userId = params.id;

  const [userData, setUserData] = useState<{
    avatarUrl: string;
    name: string;
    description: string;
  } | null>(null);

  const [userStories, setUserStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1️⃣ Получаем данные пользователя
        const responseUser = await getUserById(userId);
        const someUser = responseUser.user;
        console.log(someUser);
        setUserData({
          avatarUrl: someUser.avatarUrl,
          name: someUser.name || 'Без імені',
          description: someUser.description || 'Опис відсутній',
        });

        // 2️⃣ Получаем сторис пользователя
        // Здесь API нужно изменить, чтобы принимать userId
        const response = await getOwnStories(userId);
        setUserStories(response.stories || []);
      } catch (err: any) {
        console.error('Ошибка при загрузке профиля и историй:', err);
        setError('Не вдалося завантажити профіль або історії.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p>Завантаження профілю...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!userData) return null;

  return (
    <>
      <TravellerInfo {...userData} />
      <div className="container">
        <h2 className={css.title}>Історії Мандрівника</h2>
      </div>
      <OwnStories stories={userStories} page="user" />
    </>
  );
};

export default UserProfile;
