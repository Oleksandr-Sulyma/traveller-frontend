'use client';
import { useEffect, useState } from 'react';
import SavedStories from '@/components/Profile/SavedStories/SavedStories';
import { Story } from '@/types/story';
import { getSavedStories } from '@/lib/api/clientApi'; // функция запроса

interface SavedStoriesResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  stories: Story[];
}

const Saved = () => {
  // Храним сразу весь объект, а не только массив
  const [savedStoriesData, setSavedStoriesData] = useState<SavedStoriesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedStories = async () => {
      try {
        setLoading(true);
        const response: SavedStoriesResponse = await getSavedStories();
        setSavedStoriesData(response); // сохраняем весь объект
      } catch (err: any) {
        console.error('Помилка при завантаженні збережених історій:', err);
        setError('Не вдалося завантажити збережені історії.');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedStories();
  }, []);

  return (
    <>
      {loading && <p>Завантаження збережених історій...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && savedStoriesData && (
        <SavedStories stories={savedStoriesData.stories} page="profile" />
      )}
    </>
  );
};

export default Saved;
