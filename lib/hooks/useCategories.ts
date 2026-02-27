import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCategoryStore } from '@/lib/store/categoryStore';
import { fetchCategories } from '@/lib/api/clientApi';

export function useCategories() {
  const { setCategories, categories, isLoaded } = useCategoryStore();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setCategories(data);
    }
  }, [isSuccess, data, setCategories]);

  return {
    categories,
    isLoaded,
    isLoading,
    isError,
    isSuccess,
  };
}
