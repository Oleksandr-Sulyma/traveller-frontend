'use client';

import Loader from '../Loader/Loader';
import { useEffect, useState } from 'react';

interface PaginationProps {
  onLoadMore: (perPage: number) => void;
  isLoading: boolean;
  hasMore: boolean;
  perPageMap: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  label?: string;
}

export default function Pagination({
  onLoadMore,
  isLoading,
  hasMore,
  label = 'Показати ще',
  perPageMap,
}: PaginationProps) {
  const [perPage, setPerPage] = useState(perPageMap.mobile);

  useEffect(() => {
    const updatePerPage = () => {
      const width = window.innerWidth;
      let nextPerPage = perPage;
      if (width >= 768) nextPerPage = perPageMap.tablet;
      if (width >= 1440) nextPerPage = perPageMap.desktop;
      setPerPage(nextPerPage);
    };
    updatePerPage();
    window.addEventListener('resize', updatePerPage);
    return () => window.removeEventListener('resize', updatePerPage);
  }, [perPageMap]);

  if (!hasMore) return null;

  return (
    <button
      type="button"
      onClick={() => onLoadMore(perPage)}
      className="btn btn--default btn-primary"
      disabled={isLoading}
    >
      {isLoading ? <Loader size={24} color="#ffffff" /> : label}
    </button>
  );
}
