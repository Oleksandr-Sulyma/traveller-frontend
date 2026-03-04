'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './StoryCard.module.css';
import { saveStory as apiSaveStory } from '@/lib/api/clientApi';

interface StoryCardProps {
  id: string;
  title: string;
  article: string;
  img: string;
  category: { id: string; name: string };
  ownerId: { id: string; name: string; avatarUrl: string };
  formattedDate: string;
  favoriteCount: number;
  buttonText?: string;
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
  buttonText = 'Переглянути статтю',
}: StoryCardProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentFavoriteCount, setCurrentFavoriteCount] = useState(favoriteCount);

  const handleSaveClick = async () => {
    if (isSaving || saved) return;
    setIsSaving(true);

    try {
      await apiSaveStory(id);
      setSaved(true);
      setCurrentFavoriteCount(prev => prev + 1);
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

  return (
    <div className={`blog-card ${styles.story_card}`}>
      <div className={styles.image_container}>
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
              alt={ownerId?.name}
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
              className={`btn btn-primary btn-icon ${saved ? styles.saved : ''}`}
              type="button"
              onClick={handleSaveClick}
              disabled={isSaving}
              title={saved ? 'В улюблених' : 'Додати в улюблені'}
            >
              <svg width="24" height="24" aria-hidden="true">
                <use xlinkHref={`/sprites/sprite.svg#icon-bookmark${saved ? '-active' : ''}`} />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
