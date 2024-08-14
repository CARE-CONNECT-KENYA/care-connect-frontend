'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../Styles/Searchbar.module.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <>
      <input
        className={styles.SearchInput}
        type="text"
        placeholder="Search For Doctor"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </>
  );
}

export default SearchBar;
