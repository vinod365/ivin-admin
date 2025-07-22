"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import SearchIcon from "./assets/search.svg";

interface SearchProps {
  initialSearch?: string;
}

export default function Search({ initialSearch = '' }: SearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(initialSearch);

  useEffect(() => {
    const currentSearch = searchParams.get('query') || '';
    if (searchValue !== currentSearch) {
      setSearchValue(currentSearch);
    }
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      const currentQuery = current.get('query');

      if (searchValue && searchValue !== currentQuery) {
        current.set('query', searchValue);
        current.delete('page');
      } else if (!searchValue && currentQuery) {
        current.delete('query');
        current.delete('page');
      } else {
        return;
      }

      const search = current.toString();
      const query = search ? `?${search}` : '';

      router.push(`${window.location.pathname}${query}`);
    }, 500); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, router, searchParams]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="bg-white flex gap-2 px-8 py-4 border border-[#E4E4E4] rounded-full w-full">
      <SearchIcon />
      <input
        className="bg-white rounded-full w-full focus:outline-none"
        placeholder="Search.."
        value={searchValue}
        onChange={handleInputChange}
      />
    </div>
  );
}