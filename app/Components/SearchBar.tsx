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
   
      <div className={styles.SeachContainer}>
      <input
          className={styles.SearchInput}
          type="text"
          placeholder=" Location, condition or Specialty"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.SeachButton} onClick={handleSearch}>Search</button>
      </div>
      
    
  );
}

export default SearchBar;
