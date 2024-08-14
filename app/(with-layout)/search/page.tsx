import React from 'react';
import styles from '../../Styles/listings.module.css';
import SearchResultsList from '../../Components/Listings/SearchResultsList';

function SearchList() {
  return (
    <div> 
      <div>
        <div className={styles.HeaderImage}>
       </div> 
      </div>

      <div className={styles.listingsContainer}>
          <div>
            <SearchResultsList />
          </div>  
      </div>
    </div> 
  );
}

export default SearchList;
