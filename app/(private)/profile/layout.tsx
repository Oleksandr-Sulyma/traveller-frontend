'use client';

import ProfileNavigation from '@/components/Profile/ProfileNavigation/ProfileNavigation';
import TravellerInfo from '@/components/Profile/TravellerInfo/TravellerInfo';
import { useAuthStore } from '@/lib/store/authStore';
import css from './Layout.module.css';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore(state => state.user);

  if (!user) return null;

  return (
    <section className={css.section}>
      <TravellerInfo
        imgLink={user.avatarUrl ?? ''}
        name={user.name}
        description={user.description}
      />
      <ProfileNavigation />
      <div>{children}</div>
    </section>
  );
}
