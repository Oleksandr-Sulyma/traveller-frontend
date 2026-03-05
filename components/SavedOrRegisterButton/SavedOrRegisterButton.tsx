'use client';
import { useAuthStore } from '@/lib/store/authStore';
import Link from 'next/link';

const SavedOrRegisterButton = () => {
  const { isAuthenticated = false } = useAuthStore();

  return (
    <>
      {isAuthenticated ? (
        <Link className="btn btn-primary" style={{ height: '48px' }} href="/profile/saved">
          Збережені
        </Link>
      ) : (
        <Link className="btn btn-primary" style={{ height: '48px' }} href="/sign-up">
          Зареєструватися
        </Link>
      )}
    </>
  );
};
export default SavedOrRegisterButton;
