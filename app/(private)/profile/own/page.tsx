'use client';

import { useEffect, useState } from 'react';
import OwnStories from '@/components/Profile/OwnStories/OwnStories';
import { Story } from '@/types/story';
import { getOwnStories } from '@/lib/api/clientApi';

// Тип ответа API
interface OwnStoriesResponse {
  stories: Story[];
}

const Own = () => {
  const [ownUserStories, setOwnUserStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwnStories = async () => {
      try {
        setLoading(true);
        const response: Story[] = await getOwnStories(); // типизированный запрос
        setOwnUserStories(response.stories); // массив историй
      } catch (err: any) {
        console.error('Помилка при завантаженні власних історій:', err);
        setError('Не вдалося завантажити власні історії.');
      } finally {
        setLoading(false);
      }
    };

    fetchOwnStories();
  }, []);

  if (loading) return <p>Завантаження історій...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return <OwnStories stories={ownUserStories} page="profile" />;
};

export default Own;
