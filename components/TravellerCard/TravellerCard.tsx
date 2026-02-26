import styles from './TravellerCard.module.css';
import Link from 'next/link';
import type { User } from '../../types/user';

interface TravelerCardProps extends Pick<User, '_id' | 'avatarUrl' | 'description' | 'name'> {
  buttonText?: string;
}

export default function TravelerCard({
  _id,
  avatarUrl,
  name,
  description,
  buttonText = 'Переглянути профіль',
}: TravelerCardProps) {
  return (
    <div className={`traveler-card-text  ${styles.traveler_card} `}>
      <img src={avatarUrl} alt={name} className={styles.traveler_card_photo} />
      <div className={styles.traveler_card_content}>
        <h3 className={styles.traveler_card_name}>{name}</h3>
        <p className={styles.traveler_card_text}>{description}</p>

        <Link href={`/travellers/${_id}`}>
          <button className={`btn btn-secondary ${styles.traveler_card_button}`} type="button">
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
}
