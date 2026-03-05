'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/lib/api/clientApi';
import { useState, useEffect } from 'react';
import CustomSelect from '@/styles/components/CustomSelect/CustomSelect';

export default function Categories() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    setIsMobile(media.matches);

    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, []);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div>
      {!isMobile ? (
        <div className="container">
          <Swiper
            style={{ width: '500px' }}
            spaceBetween={3}
            slidesPerView={5}
            onSlideChange={() => console.log('slide change')}
            onSwiper={swiper => console.log(swiper)}
          >
            {categories && (
              <SwiperSlide key="all">
                <Link href="/stories/filter/all"> Всі історії</Link>
              </SwiperSlide>
            )}
            {categories &&
              categories.map(category => (
                <SwiperSlide key={category.id}>
                  <Link href={`/stories/filter/${category.id}`}> {category.name}</Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      ) : (
        <CustomSelect categories={categories} defaultValue={{ id: 'all', name: 'Всі історії' }} />
      )}
    </div>
  );
}
