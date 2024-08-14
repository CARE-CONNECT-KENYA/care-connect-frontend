import React from 'react'
import styles from '../Styles/Searchbar.module.css'

function SearchBar() {
  return (
    <>
        
        <input 
            className={styles.SearchInput}
            type='text'
            placeholder='Search For Doctor'
        />
        <button>Search</button>
    </>
    
  )
}

export default SearchBar