import { Suspense } from 'react';
import Loader from '@/components/Loader/Loader';

import Hero from '@/components/Home/Hero/Hero';

import PopularStoriesSection from '@/components/Home/PopularStoriesSection/PopularStoriesSection';
import Layout from '@/components/Home/Layouts/Layout';
import OurTravellers from '@/components/Home/OurTravellers/OurTravellers';
import TopTravellers from '@/components/Home/OurTravellers/TopTravellers';
import Join from '@/components/Home/Join/Join';

// import { getPopularStories, getTopTravellers } from '@/lib/api/serverApi';

export default async function HomePage() {
  // 1. Отримуємо дані для секцій (SSR)
  // const stories = await getPopularStories();
  // const travellers = await getTopTravellers();

  return (
    <>
      <Hero />

      <Layout />

      {/* {<Suspense fallback={<Loader className="py-20" />}>} */}
      <PopularStoriesSection />
      {/* {</Suspense>} */}

      {/* <OurTravellers /> */}
      <TopTravellers />
      <Join />
    </>
  );
}
