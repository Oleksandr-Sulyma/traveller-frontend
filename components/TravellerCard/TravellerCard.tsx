import styles from './TravellerCard.module.css';
import type { User } from '../../types/user';

interface TravelerCardProps extends Pick<User, 'avatarUrl' | 'description' | 'name'> {
  photo: string;
  buttonText?: string;
  onViewProfile?: () => void;
}

export default function TravelerCard({
  photo,
  name,
  description,
  buttonText = 'Переглянути профіль',
  onViewProfile,
}: TravelerCardProps) {
  return (
    <div className={`traveler-card-text  ${styles.traveler_card} `}>
      <img src={photo} alt={name} className={styles.traveler_card_photo} />
      <div className={styles.traveler_card_content}>
        <h3 className={styles.traveler_card_name}>{name}</h3>
        <p className={styles.traveler_card_text}>{description}</p>

        <button
          className={`btn btn-secondary traveler-card-button  ${styles.traveler_card_button}`}
          onClick={onViewProfile}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
