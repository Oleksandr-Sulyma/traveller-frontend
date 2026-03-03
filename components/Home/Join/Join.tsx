"use client"
import Link from 'next/link';
import css from './Join.module.css';
import { useAuthStore } from '@/lib/store/authStore';

export default function Join() {

const isAuth = useAuthStore();

  return (
    <section id="join" className="container">
      <div className={css.position}>
        <div className={css.wrapper}>
          <h2 className={css.title}>Приєднуйтесь до нашої спільноти</h2>
          <p className={css.description}>
            Долучайтеся до мандрівників, які діляться своїми історіями та надихають на нові пригоди.
          </p>

          {isAuth ? (
            <Link className="btn btn-primary" style={{ height: '48px' }} href="/profile/saved">
              Збережені
            </Link>
          ) : (
            <Link className="btn btn-primary" style={{ height: '48px' }} href="/sign-up">
              Зареєструватися
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
