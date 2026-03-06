'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './StoryCard.module.css';
import { addToSave, removeFromSave, deleteStory as apiDeleteStory } from '@/lib/api/clientApi';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { StoryCategory, Owner } from '@/types/story'; // Імпортуємо створені раніше типи

interface StoryCardProps {
  id: string;
  title: string;
  article: string;
  img: string;
  category: StoryCategory; // Використовуємо об'єкт
  ownerId: Owner;           // Використовуємо об'єкт
  formattedDate: string;
  favoriteCount: number;
  currentUserId?: string;
  savedStoryIds?: string[]; // Може бути string[] або Story[] (якщо з беку)
  buttonText?: string;
  onDelete?: (id: string) => void;
}

export default function StoryCard({
  id,
  title,
  article,
  img,
  category,
  ownerId,
  formattedDate,
  favoriteCount,
  currentUserId,
  savedStoryIds,
  buttonText = 'Переглянути статтю',
  onDelete,
}: StoryCardProps) {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const queryClient = useQueryClient();
  const effectiveUserId = currentUserId ?? user?.id;
  const isOwner = Boolean(effectiveUserId && effectiveUserId === ownerId?.id);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Виправлена логіка ініціалізації: перевіряємо і як рядок, і як об'єкт
  const [saved, setSaved] = useState(() => {
    if (savedStoryIds) return savedStoryIds.includes(id);
    return false;
  });
  
  const [currentFavoriteCount, setCurrentFavoriteCount] = useState(favoriteCount);

  useEffect(() => {
    if (user === null) {
      setSaved(false);
      return;
    }

    if (savedStoryIds !== undefined) {
      setSaved(savedStoryIds.includes(id));
    } else if (user?.savedStories !== undefined) {
      // КРИТИЧНЕ ВИПРАВЛЕННЯ: savedStories може бути масивом об'єктів Story[]
      const isSaved = user.savedStories.some(s => 
        typeof s === 'string' ? s === id : s.id === id
      );
      setSaved(isSaved);
    }
  }, [savedStoryIds, user, id]);

  const handleSaveClick = async () => {
    if (!user) {
      router.push('/sign-in');
      return;
    }
    if (isSaving) return;
    setIsSaving(true);

    try {
      if (saved) {
        await removeFromSave(id);
        setSaved(false);
        setCurrentFavoriteCount(prev => prev - 1);
        if (user) {
          // Виправляємо фільтрацію для об'єктів
          const newSaved = user.savedStories.filter(s => 
            typeof s === 'string' ? s !== id : s.id !== id
          );
          setUser({ ...user, savedStories: newSaved as any });
        }
      } else {
        await addToSave(id);
        setSaved(true);
        setCurrentFavoriteCount(prev => prev + 1);
        if (user) {
          setUser({ ...user, savedStories: [...(user.savedStories ?? []), id] as any });
        }
      }
      queryClient.invalidateQueries({ queryKey: ['me'] });
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push('/sign-in');
      } else {
        console.error('Помилка при збереженні:', error);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = async () => {
    if (isDeleting) return;
    if (!confirm('Видалити цю історію?')) return;
    setIsDeleting(true);

    try {
      await apiDeleteStory(id);
      onDelete?.(id);
    } catch (error: any) {
      console.error('Помилка при видаленні:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`blog-card ${styles.story_card}`}>
      <div className={styles.image_container}>
        {/* Додано заповнення alt та обробку порожнього зображення */}
        <img src={img || '/placeholder.jpg'} alt={title} className={styles.story_card_img} />
      </div>

      <div className={styles.story_card_content}>
        <div className={styles.text_wrapper}>
          <p className={`tag-text ${styles.story_card_category}`}>
            {category?.name || 'Без категорії'}
          </p>
          <h3 className={styles.story_card_title}>{title}</h3>
          <p className={styles.story_card_text}>{article}</p>
        </div>

        <div className={styles.after_text_wrapper}>
          <div className={styles.story_card_author}>
            <img
              src={ownerId?.avatarUrl || '/images/default-avatar.png'}
              alt={ownerId?.name || 'Автор'}
              className={styles.story_card_author_avatar}
            />
            <div className={styles.story_card_author_text_block}>
              <span className={`author-info ${styles.story_card_author_name}`}>
                {ownerId?.name || 'Анонім'}
              </span>
              <div className={styles.story_card_author_data_block}>
                <span className={styles.story_card_date}>{formattedDate}</span>
                <span className={styles.story_card_separator}>●</span>
                <span className={styles.story_card_favorite}>
                  {currentFavoriteCount}
                  <svg width="20" height="20" aria-hidden="true" className={styles.icon}>
                    <use xlinkHref="/sprites/sprite.svg#icon-bookmark" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.story_card_footer}>
            <Link
              href={`/stories/${id}`}
              className={`btn btn-secondary ${styles.story_card_button}`}
            >
              {buttonText}
            </Link>

            <button
              className={`btn ${saved ? 'btn-primary' : 'btn-secondary'} btn-icon`}
              type="button"
              onClick={handleSaveClick}
              disabled={isSaving}
              title={saved ? 'Видалити з улюблених' : 'Додати в улюблені'}
            >
              <svg width="24" height="24" aria-hidden="true">
                <use xlinkHref="/sprites/sprite.svg#icon-bookmark" />
              </svg>
            </button>

            {isOwner && (
              <button
                className={`btn btn-icon ${styles.delete_btn}`}
                type="button"
                onClick={handleDeleteClick}
                disabled={isDeleting}
                title="Видалити історію"
              >
                <svg width="24" height="24" aria-hidden="true">
                  <use xlinkHref="/sprites/sprite.svg#icon-trash" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}