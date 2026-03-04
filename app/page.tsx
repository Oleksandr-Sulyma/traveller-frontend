import Hero from '@/components/Home/Hero/Hero';
import Layout from '@/components/Home/Layouts/Layout';
import PopularStoriesSection from '@/components/Home/PopularStoriesSection/PopularStoriesSection';
// import TopTravellers from '@/components/Home/OurTravellers/TopTravellers';
// import OurTravellers from '@/components/Home/OurTravellers/OurTravellers';
import Join from '@/components/Home/Join/Join';
import OurTravellers from '@/components/Home/OurTravellers/OurTravellers';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Layout />
      <PopularStoriesSection />
      <OurTravellers />
      {/* <TopTravellers /> */}
      <Join />
    </>
  );
}
