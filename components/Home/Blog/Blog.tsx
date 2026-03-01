
export default function Blog() {
  return (
    <section className="container">
      <h2>Популярні історії</h2>
    </section>
  );
}

// 'use client';

// import css from './Blog.module.css';
// import StoryCard from '@/components/StoryCard/StoryCard';
// import 
// import { Story } from '@/types/story'; 
// import Link from 'next/link';

// interface BlogSectionProps {
//   stories: Story[];
//   title?: string;
// }

// export default function Blog({ stories, title = "Наші історії" }: BlogSectionProps) {
//   // Перевірка на випадок порожніх даних (щоб уникнути помилок рендерингу)
//   if (!stories || stories.length === 0) {
//     return (
//       <section className={css.blog_empty}>
//         <p>Наразі історій немає.</p>
//       </section>
//     );
//   }

//   return (
//     <section className={css.blog_container}>
//       <div className={css.header_wrapper}>
//         <h2 className={css.blog_title}>{title}</h2>
//         <Link href="/stories" className={css.view_all_link}>
//           Дивитися всі
//         </Link>
//       </div>

//       <ul className={css.blog_grid}>
//         {stories.map((story) => (
//           <li key={story.id} className={css.blog_item}>
//             {/* Використовуємо spread-оператор для передачі всіх полів Story як окремих пропсів */}
//             <StoryCard {...story} />
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }