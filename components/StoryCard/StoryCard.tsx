'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './StoryCard.module.css';
import { addToSave, removeFromSave, deleteStory as apiDeleteStory } from '@/lib/api/clientApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { StoryCategory, Owner } from '@/types/story'; // Імпортуємо створені раніше типи

interface StoryCardProps {
  id: string;
  title: string;
  article: string;
  img: string;
  category: StoryCategory; // Використовуємо об'єкт
  ownerId: Owner; // Використовуємо об'єкт
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
  const queryClient = useQueryClient();

  const effectiveUserId = currentUserId ?? user?.id;
  const isOwner = Boolean(effectiveUserId && effectiveUserId === ownerId?.id);

  const [saved, setSaved] = useState(savedStoryIds?.includes(id) ?? false);
  const [count, setCount] = useState(favoriteCount);
  const [isDeleting, setIsDeleting] = useState(false);

  const saveMutation = useMutation({
    mutationFn: () => (!saved ? removeFromSave(id) : addToSave(id)),

    onMutate: () => {
      setSaved(prev => !prev);
      setCount(prev => (saved ? prev - 1 : prev + 1));
    },

    onError: (error: any) => {
      setSaved(prev => !prev);
      setCount(prev => (saved ? prev + 1 : prev - 1));

      if (error?.response?.status === 401) {
        router.push('/sign-in');
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedStories'] });
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });

  const handleDelete = async () => {
    if (isDeleting) return;
    if (!confirm('Видалити цю історію?')) return;

    setIsDeleting(true);

    try {
      await apiDeleteStory(id);
      onDelete?.(id);
    } catch (err) {
      console.error(err);
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
                  {count}
                  <svg width="20" height="20" className={styles.icon}>
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

            {isOwner ? (
              <>
                <Link href={`/stories/edit/${id}`} className="btn btn-secondary btn-icon">
                  <svg width="24" height="24">
                    <use xlinkHref="/sprites/sprite.svg#icon-edit" />
                  </svg>
                </Link>

                <button className="btn btn-icon" onClick={handleDelete} disabled={isDeleting}>
                  <svg width="24" height="24">
                    <use xlinkHref="/sprites/sprite.svg#icon-trash" />
                  </svg>
                </button>
              </>
            ) : (
              <button
                className={`btn ${saved ? 'btn-primary' : 'btn-secondary'} btn-icon`}
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
              >
                <svg width="24" height="24">
                  <use xlinkHref="/sprites/sprite.svg#icon-bookmark" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
