import styles from './StoryCard.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Story } from '../../types/story';

interface StoryCardProps extends Pick<
  Story,
  'id' | 'title' | 'article' | 'img' | 'category' | 'ownerId' | 'date' | 'favoriteCount'
> {
  buttonText?: string;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function StoryCard({
  _id,
  title,
  article,
  img,
  category,
  ownerId,
  date,
  favoriteCount,
  buttonText = 'Переглянути статтю',
}: StoryCardProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function checkAuth(): Promise<boolean> {
    try {
      const res = await fetch('/auth/check', { credentials: 'include' });
      return res.ok;
    } catch {
      return false;
    }
  }

  async function saveStory(storyId: string): Promise<boolean> {
    try {
      const res = await fetch(`/stories/${storyId}/save`, {
        method: 'POST',
        credentials: 'include',
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  const handleSaveClick = async (): Promise<void> => {
    if (isSaving) return;
    setIsSaving(true);
    const isAuth = await checkAuth();
    if (!isAuth) {
      router.push('/sign-in');
      setIsSaving(false);
      return;
    }
    const ok = await saveStory(_id);
    if (ok) setSaved(true);
    setIsSaving(false);
  };

  const handleNavigate = (): void => {
    router.push(`/stories/${_id}`);
  };

  return (
    <div className={styles.story_card}>
      <img src={img} alt={title} className={styles.story_card_img} />
      <div className={styles.story_card_content}>
        <div className={styles.text_wrapper}>
          <p className={styles.story_card_category}>{category.name}</p>
          <p className={styles.story_card_title}>{title}</p>
          <p className={styles.story_card_text}>{article}</p>
        </div>
        <div className={styles.after_text_wrapper}>
          <div className={styles.story_card_author_info}>
            <div className={styles.story_card_author}>
              <img
                src={ownerId?.avatarUrl}
                alt={ownerId?.name}
                className={styles.story_card_author_avatar}
              />
              <div className={styles.story_card_author_text_block}>
                <span className={styles.story_card_author_name}>{ownerId?.name}</span>
                <div className={styles.story_card_author_data_block}>
                  <span className={styles.story_card_date}>{formatDate(date)}</span>
                  <span className={styles.story_card_separator}>●</span>
                  <span className={styles.story_card_favorite}>
                    {favoriteCount}
                    <svg width="24" height="24" aria-hidden="true">
                      <use xlinkHref="/sprites/sprite.svg#icon-bookmark" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.story_card_footer}>
            <button
              className={`btn btn-secondary ${styles.story_card_button}`}
              type="button"
              onClick={handleNavigate}
            >
              {buttonText}
            </button>

            <button
              className={`btn btn-primary btn-icon ${styles.story_card_icon_button}`}
              type="button"
              onClick={handleSaveClick}
              disabled={isSaving || saved}
              aria-pressed={saved}
              title={saved ? 'В улюблених' : 'Додати в улюблені'}
            >
              <svg width="24" height="24" aria-hidden="true">
                <use xlinkHref="/sprites/sprite.svg#icon-bookmark" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
