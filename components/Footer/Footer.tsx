'use client';
import Link from 'next/link';
import styles from './Footer.module.css';
import Image from 'next/image';
import logo from '@/public/favicon.svg';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainRow}>
          <Link href="/" className={styles.logo}>
            <Image src={logo} alt="Подорожники логотип" width={23} height={23} />
            <span>Подорожники</span>
          </Link>

          <div className={styles.social}>
            <a href="#" aria-label="Facebook">
              <svg className={styles.icon} viewBox="0 0 32 32">
                <use href="/sprites/sprite.svg#icon-Facebook" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg className={styles.icon} viewBox="0 0 32 32">
                <use href="/sprites/sprite.svg#icon-Instagram" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg className={styles.icon} viewBox="0 0 32 32">
                <use href="/sprites/sprite.svg#icon-X" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg className={styles.icon} viewBox="0 0 32 32">
                <use href="/sprites/sprite.svg#icon-Youtube" />
              </svg>
            </a>
          </div>

          <nav className={styles.nav}>
            <Link href="/">Головна</Link>
            <Link href="/stories">Історії</Link>
            <Link href="/travellers">Мандрівники</Link>
          </nav>
        </div>

        <hr className={styles.divider} />

        <p className={styles.copyright}>© {year} Подорожники. Усі права захищені.</p>
      </div>
    </footer>
  );
}
