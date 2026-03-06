'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// Імпортуйте ваші хуки авторизації (наприклад, з Zustand або Context)
// import { useAuthStore } from '@/store/authStore'; 

export default function AuthNavigation() {
  const [mounted, setMounted] = useState(false);
  
  // Припустимо, у вас є стан авторизації
  // const { isAuthenticated, user } = useAuthStore();

  // useEffect спрацює ТІЛЬКИ на клієнті після того, як DOM буде готовий
  useEffect(() => {
    setMounted(true);
  }, []);

  // Поки компонент не "ожив" на клієнті, повертаємо "заглушку"
  // Це запобігає помилці Hydration
  if (!mounted) {
    return <div style={{ minWidth: '100px' }} />; // Або порожній div, щоб не "стрибав" хедер
  }

  const isAuthenticated = false; // Замініть на вашу реальну логіку

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <>
          <Link href="/profile">Мій профіль</Link>
          <button>Вийти</button>
        </>
      ) : (
        <>
          <Link href="/sign-in">Увійти</Link>
          <Link href="/sign-up" className="btn-primary">Реєстрація</Link>
        </>
      )}
    </div>
  );
}
