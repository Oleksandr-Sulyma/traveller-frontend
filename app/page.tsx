import { Suspense } from 'react';
import Loader from '@/components/Loader/Loader';

import Hero from '@/components/Home/Hero/Hero';
// import LatestStories from '@/components/Home/Blog/LatestStories';
// import TopTravellers from '@/components/Home/Team/TopTravellers';
// import Cta from '@/components/Home/Cta/Cta';

import PopularStoriesSection from '@/components/Home/PopularStoriesSection/PopularStoriesSection';
import Layout from '@/components/Home/Layouts/Layout';
import OurTravellers from '@/components/Home/OurTravellers/OurTravellers';
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

      <OurTravellers />

      <Join />
    </>
  );
}
