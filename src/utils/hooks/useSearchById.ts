import { useState, useRef } from 'react';
type FilteredItems<T> = {
  items: T[] | null | undefined;
  totalPages: number | null | undefined;
};

export const useSearchById = <T extends { id: string | number }>(
  dataToFilter: T[] | undefined,
  totalPages: number | undefined,
) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [filteredItems, setFilteredItems] = useState<FilteredItems<T>>({
    items: null,
    totalPages: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchValue = searchRef?.current?.value;
    if (searchValue && dataToFilter) {
      const filteredItems = {
        items: dataToFilter.filter((item) => item.id.toString() === searchValue),
        totalPages: totalPages,
      };
      setFilteredItems(filteredItems);
    }
    if (!searchValue) {
      setFilteredItems({ items: null, totalPages: null });
    }
  };

  return { filteredItems, searchRef, handleSubmit };
};
