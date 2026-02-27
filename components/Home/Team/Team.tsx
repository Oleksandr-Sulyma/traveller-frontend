import Pagination from '@/components/Pagination/Pagination';
import css from './Team.module.css';

export default function Team() {
  return (
    <section className="container">
      <div className={css.wrapper}>
        <div className={css.positionH2Svg}>
          <h2>Наші Мандрівники</h2>
          <button type="button">
            <svg width="48" height="48">
              <use href="/sprites/sprite.svg#icon-close"></use>
            </svg>
          </button>
        </div>
        <div className={css.positionUlButton}>
          <ul className={css.wrapperUl}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <button style={{ height: '48px' }} type="button">
            Переглянути всіх
          </button>
        </div>
      </div>
    </section>
  );
}

//**============================Чернетка потім застосую коли буде Травел_Картка========================================== */

// 'use client';

// import { useState } from 'react';
// import css from './Team.module.css';
// import fetchStories from '@/lib/api/clientApi';
// import Pagination from '@/components/Pagination/Pagination';

// type Story = {
//   _id: string;
//   title: string;
// };

// type Props = {
//   initialStories: Story[];
// };

// export default function Team({ initialStories }: Props) {
//   const [stories, setStories] = useState(initialStories ?? []);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const loadMore = async (perPage: number) => {
//     try {
//       setLoading(true);
//       const nextPage = page + 1;
//       const data = await fetchStories('', nextPage);

//       setStories(prev => [...prev, ...data.stories]);
//       setPage(nextPage);

//       if (data.stories.length < perPage) {
//         setHasMore(false);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="container">
//       <div className={css.wrapper}>
//         <div className={css.positionH2Svg}>
//           <h2>Наші Мандрівники</h2>
//         </div>
//         <div className={css.positionUlButton}>
//           <ul className={css.wrapperUl}>
//             {stories.map(story => (
//               <li key={story._id}>{story.title}</li>
//             ))}
//           </ul>
//         </div>
//         <button className="btn btn-primary" style={{ height: '48px' }} type="button">
//           Переглянути всіх
//         </button>
//       </div>
//     </section>
//   );
// }
