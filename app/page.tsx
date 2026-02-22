import Hero from '@/components/Home/Hero/Hero';
// import LatestStories from '@/components/Home/Blog/LatestStories';
// import TopTravellers from '@/components/Home/Team/TopTravellers';
// import CTA from '@/components/Home/CTA/CTA';

// Це функції, які ми прописали в Task 38 (Server API)
// Поки їх немає, можна закоментувати і передати пусті масиви
// import { getPopularStories, getTopTravellers } from '@/lib/api/serverApi';

export default async function HomePage() {
  // 1. Отримуємо дані для секцій (SSR)
  // const stories = await getPopularStories();
  // const travellers = await getTopTravellers();

  return (
    <main>
      {/* Секція 1: Головний банер (Task 19) */}
      <Hero />

      {/* Секція 2: Популярні історії (Task 20) */}
      {/* Передаємо дані всередину блоку */}
      {/* <LatestStories stories={[]} /> */}

      {/* Секція 3: Наші мандрівники (Task 21) */}
      {/* <TopTravellers users={[]} /> */}

      {/* Секція 4: Блок реєстрації (Task 22) */}
      {/* <CTA /> */}
    </main>
  );
}
