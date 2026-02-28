'use client';
import Link from 'next/link';
import styles from './Footer.module.css';
import '@/styles/components/links.css';
import Image from 'next/image';
import logo from '@/public/favicon.svg';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} style={{ background: 'var(--footer-background)' }}>
      <div className="container ">
        <div className={styles.mainRow}>
          <Link
            href="/"
            className={styles.logo + ' link-base link-text link-footer-pc link-footer-mobile'}
          >
            <Image
              src={logo}
              alt="Подорожники логотип"
              width={23}
              height={23}
              className="logoIcon"
            />
            <span>Подорожники</span>
          </Link>

          <div className={styles.social}>
            <a
              href="https://www.facebook.com/login"
              target="_blank"
              aria-label="Facebook"
              className="link-base link-icon"
            >
              <svg className={styles.icon} viewBox="0 0 32 32">
                <use href="/sprites/sprite.svg#icon-Facebook" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              aria-label="Instagram"
              className="link-base link-icon"
            >
              <svg className={styles.icon} viewBox="0 0 32 32">
                <use href="/sprites/sprite.svg#icon-Instagram" />
              </svg>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              aria-label="Twitter"
              className="link-base link-icon"
            >
              <svg className={styles.icon} viewBox="0 0 32 32">
                <use href="/sprites/sprite.svg#icon-X" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              aria-label="YouTube"
              className="link-base link-icon"
            >
              <svg className={styles.icon} viewBox="0 0 32 32">
                <use href="/sprites/sprite.svg#icon-Youtube" />
              </svg>
            </a>
          </div>

          <nav className={styles.nav}>
            <Link href="/" className="link-base link-text link-footer-pc link-footer-mobile ">
              Головна
            </Link>
            <Link
              href="/stories"
              className="link-base link-text link-footer-pc link-footer-mobile "
            >
              Історії
            </Link>
            <Link
              href="/travellers"
              className="link-base link-text link-footer-pc link-footer-mobile "
            >
              Мандрівники
            </Link>
          </nav>
        </div>

        <hr className={styles.divider} />

        <p className={styles.copyright}>© {year} Подорожники. Усі права захищені.</p>
      </div>
    </footer>
  );
}

// test with StoryCard component

// 'use client';
// import Link from 'next/link';
// import styles from './Footer.module.css';
// import '@/styles/components/links.css';
// import Image from 'next/image';
// import logo from '@/public/favicon.svg';

// // прибрати після тестування
// import StoryCard from '../StoryCard/StoryCard';
// import { useEffect, useState } from 'react';
// // прибрати після тестування

// export default function Footer() {
//   const year = new Date().getFullYear();

//   // Додаємо стан для історій прибрати після тестування
//   const [stories, setStories] = useState<any[]>([]);

//   // Тестова функція для отримання історій
//   useEffect(() => {
//     fetch('http://localhost:5000/stories') // змініть URL під свій бекенд
//       .then(res => res.json())
//       .then(data => setStories(data.stories || []));
//   }, []);
//   // прибрати після тестування

//   return (
//     <footer className={styles.footer} style={{ background: 'var(--footer-background)' }}>
//       <div className="container ">
//         <div className={styles.mainRow}>
//           <Link
//             href="/"
//             className={styles.logo + ' link-base link-text link-footer-pc link-footer-mobile'}
//           >
//             <Image
//               src={logo}
//               alt="Подорожники логотип"
//               width={23}
//               height={23}
//               className="logoIcon"
//             />
//             <span>Подорожники</span>
//           </Link>

//           <div className={styles.social}>
//             <a
//               href="https://www.facebook.com/login"
//               target="_blank"
//               aria-label="Facebook"
//               className="link-base link-icon"
//             >
//               <svg className={styles.icon} viewBox="0 0 32 32">
//                 <use href="/sprites/sprite.svg#icon-Facebook" />
//               </svg>
//             </a>
//             <a
//               href="https://www.instagram.com/"
//               target="_blank"
//               aria-label="Instagram"
//               className="link-base link-icon"
//             >
//               <svg className={styles.icon} viewBox="0 0 32 32">
//                 <use href="/sprites/sprite.svg#icon-Instagram" />
//               </svg>
//             </a>
//             <a
//               href="https://twitter.com/"
//               target="_blank"
//               aria-label="Twitter"
//               className="link-base link-icon"
//             >
//               <svg className={styles.icon} viewBox="0 0 32 32">
//                 <use href="/sprites/sprite.svg#icon-X" />
//               </svg>
//             </a>
//             <a
//               href="https://www.youtube.com/"
//               target="_blank"
//               aria-label="YouTube"
//               className="link-base link-icon"
//             >
//               <svg className={styles.icon} viewBox="0 0 32 32">
//                 <use href="/sprites/sprite.svg#icon-Youtube" />
//               </svg>
//             </a>
//           </div>

//           <nav className={styles.nav}>
//             <Link href="/" className="link-base link-text link-footer-pc link-footer-mobile ">
//               Головна
//             </Link>
//             <Link
//               href="/stories"
//               className="link-base link-text link-footer-pc link-footer-mobile "
//             >
//               Історії
//             </Link>
//             <Link
//               href="/travellers"
//               className="link-base link-text link-footer-pc link-footer-mobile "
//             >
//               Мандрівники
//             </Link>
//           </nav>
//         </div>

//         <hr className={styles.divider} />

//         <p className={styles.copyright}>© {year} Подорожники. Усі права захищені.</p>
//         {/* Тестова секція для відображення історій прибрати після тестування */}
//         <div
//           className={styles.testStories}
//           style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}
//         >
//           {stories.slice(0, 5).map(story => (
//             <StoryCard key={story._id} {...story} />
//           ))}
//         </div>
//         {/* Тестова секція для відображення історій прибрати після тестування */}
//       </div>
//     </footer>
//   );
// }
