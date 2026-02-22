
import Blog from '@/components/Home/Blog/Blog';
import Layout from '@/components/Home/Layouts/Layout ';
import Team from '@/components/Home/Team/Team';
import CTA from '@/components/Home/CTA/CTA';


// Це функції, які ми прописали в Task 38 (Server API)
// Поки їх немає, можна закоментувати і передати пусті масиви
// import { getPopularStories, getTopTravellers } from '@/lib/api/serverApi';

export default async function HomePage() {
  // 1. Отримуємо дані для секцій (SSR)
  // const stories = await getPopularStories();
  // const travellers = await getTopTravellers();

  return (
    <main>
     
{/* Секція 2: Популярні історії (Task 19) */}
       <Layout/>
      {/* Секція 2: Популярні історії (Task 20) */}
      <Blog />
       
      {/* Секція 3: Наші мандрівники (Task 21) */}
      <Team />

      {/* Секція 4: Блок реєстрації (Task 22) */}
      <CTA />
    </main>
  );
}
