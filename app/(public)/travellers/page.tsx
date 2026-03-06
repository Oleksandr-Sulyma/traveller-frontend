// 'use client';

// import { useEffect, useState } from 'react';
// import type { User } from '@/types/user';
// import TravelerCard from '@/components/TravellerCard/TravellerCard';
// import Pagination from '@/components/Pagination/Pagination';
// import nextServer from '@/lib/api/api';
// import css from './TravellersPage.module.css';

// type UsersResponse =
//   | { users: User[]; total?: number; totalCount?: number; count?: number }
//   | { items: User[]; total?: number; totalCount?: number; count?: number }
//   | { data: User[]; total?: number; totalCount?: number; count?: number }
//   | User[];

// export default function Page() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [total, setTotal] = useState<number | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const getInitialPerPage = () => {
//     if (typeof window === 'undefined') return 12;
//     const w = window.innerWidth;
//     if (w >= 1440) return 12;
//     if (w >= 768) return 8;
//     return 8;
//   };

//   const extract = (data: any) => {
//     const list: User[] =
//       data?.users ?? data?.items ?? data?.data ?? (Array.isArray(data) ? data : []);

//     const nextTotal: number | null =
//       typeof data?.total === 'number'
//         ? data.total
//         : typeof data?.totalCount === 'number'
//           ? data.totalCount
//           : typeof data?.count === 'number'
//             ? data.count
//             : null;

//     return { list, nextTotal };
//   };

//   const fetchUsers = async (limit: number) => {
//     setIsLoading(true);

//     try {
//       const { data } = await nextServer.get('/users', { params: { page: 1, perPage: limit } });

//       const { list, nextTotal } = extract(data);
//       setUsers(list);

//       if (nextTotal !== null) {
//         setTotal(nextTotal);
//       } else if (list.length < limit) {
//         setTotal(list.length);
//       }
//     } catch (error) {
//       console.error('Fetch users failed:', error);
//       setUsers([]);
//       setTotal(0);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers(getInitialPerPage());
//   }, []);

//   const hasMore = total === null ? true : users.length < total;

//   const handleLoadMore = async (_perPageFromButton: number) => {
//     await fetchUsers(users.length + 4);
//   };

//   return (
//     <div className={css.page}>
//       <div className="container">
//         <h1 className={css.title}>Мандрівники</h1>

//         <ul className={css.list}>
//           {users.map(u => (
//             <li key={u.id} className={css.item}>
//               <TravelerCard
//                 id={u.id}
//                 name={u.name}
//                 description={u.description}
//                 avatarUrl={u.avatarUrl ?? '/images/default-avatar.png'}
//               />
//             </li>
//           ))}
//         </ul>

//         <div className={css.pagination}>
//           <Pagination
//             onLoadMore={handleLoadMore}
//             isLoading={isLoading}
//             hasMore={hasMore}
//             perPageMap={{ mobile: 8, tablet: 8, desktop: 12 }}
//             label="Показати ще"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import type { User } from '@/types/user';
import TravelerCard from '@/components/TravellerCard/TravellerCard';
import Pagination from '@/components/Pagination/Pagination';
import nextServer from '@/lib/api/api';
import css from './TravellersPage.module.css';

// Типізація відповіді для безпечної роботи з даними
type UsersResponse =
  | { users: User[]; total?: number; totalCount?: number; count?: number }
  | { items: User[]; total?: number; totalCount?: number; count?: number }
  | { data: User[]; total?: number; totalCount?: number; count?: number }
  | User[];

export default function TravellersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Визначення початкової кількості елементів залежно від екрану
  const getInitialPerPage = () => {
    if (typeof window === 'undefined') return 12;
    const w = window.innerWidth;
    if (w >= 1440) return 12;
    return 8;
  };

  // Функція витягування та нормалізації даних
  const extract = (data: any) => {
    const rawList: any[] =
      data?.users ?? data?.items ?? data?.data ?? (Array.isArray(data) ? data : []);

    // НОРМАЛІЗАЦІЯ ID: виправляємо проблему з undefined
    const list: User[] = rawList.map(u => ({
      ...u,
      id: u.id || u._id || String(Math.random()), // Пріоритет на реальні ID
    }));

    const nextTotal: number | null =
      typeof data?.total === 'number'
        ? data.total
        : typeof data?.totalCount === 'number'
          ? data.totalCount
          : typeof data?.count === 'number'
            ? data.count
            : null;

    return { list, nextTotal };
  };

  const fetchUsers = async (limit: number) => {
    setIsLoading(true);
    try {
      // Запит до нашого Route Handler
      const { data } = await nextServer.get<UsersResponse>('/users', { 
        params: { page: 1, perPage: limit } 
      });

      const { list, nextTotal } = extract(data);
      setUsers(list);

      if (nextTotal !== null) {
        setTotal(nextTotal);
      } else if (list.length < limit) {
        setTotal(list.length);
      }
    } catch (error) {
      console.error('Fetch users failed:', error);
      setUsers([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(getInitialPerPage());
  }, []);

  const hasMore = total === null ? true : users.length < total;

  const handleLoadMore = async () => {
    // Довантажуємо наступну порцію (+4 або +8)
    await fetchUsers(users.length + 4);
  };

  return (
    <div className={css.page}>
      <div className="container">
        <h1 className={css.title}>Мандрівники</h1>

        <ul className={css.list}>
          {users.map((u, index) => (
            // Використовуємо комбінований ключ для 100% унікальності
            <li key={`${u.id}-${index}`} className={css.item}>
              <TravelerCard
                id={u.id}
                name={u.name}
                description={u.description}
                avatarUrl={u.avatarUrl} 
                buttonText="Переглянути профіль"
              />
            </li>
          ))}
        </ul>

        {hasMore && (
          <div className={css.pagination}>
            <Pagination
              onLoadMore={handleLoadMore}
              isLoading={isLoading}
              hasMore={hasMore}
              perPageMap={{ mobile: 8, tablet: 8, desktop: 12 }}
              label="Показати ще"
            />
          </div>
        )}
      </div>
    </div>
  );
}