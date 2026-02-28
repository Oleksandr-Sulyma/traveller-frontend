import Hero from '@/components/Home/Hero/Hero';
// import LatestStories from '@/components/Home/Blog/LatestStories';
// import TopTravellers from '@/components/Home/Team/TopTravellers';
// import Cta from '@/components/Home/Cta/Cta';

import Blog from '@/components/Home/Blog/Blog';
import Layout from '@/components/Home/Layouts/Layout';
import Team from '@/components/Home/Team/Team';
import Cta from '@/components/Home/Cta/Cta';

// import { getPopularStories, getTopTravellers } from '@/lib/api/serverApi';

export default async function HomePage() {
  // 1. Отримуємо дані для секцій (SSR)
  // const stories = await getPopularStories();
  // const travellers = await getTopTravellers();

  return (
    <>
      <Hero />
      {/* Секція 2: Популярні історії (Task 19) */}
      <Layout />
      {/* Секція 2: Популярні історії (Task 20) */}
      {/* Передаємо дані всередину блоку */}
      {/* <LatestStories stories={[]} /> */}

      {/* Секція 3: Наші мандрівники (Task 21) */}
      {/* <TopTravellers users={[]} /> */}
      <Blog />

      {/* Секція 3: Наші мандрівники (Task 21) */}
      <Team />

      {/* Секція 4: Блок реєстрації (Task 22) */}
      <Cta />
    </>
  );
}
