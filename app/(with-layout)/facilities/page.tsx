import React from 'react'
import styles from '../../Styles/listings.module.css'
import ProviderFacilityListing from '../../Components/Listings/ProviderFacilityListing'


function FacilityListing() {
  return (
    <div> 
      <div>
        <div className={styles.HeaderImage}>
       </div> 
      </div>

      <div className={styles.listingsContainer}>
          <div>
            <ProviderFacilityListing/>
          </div>  
      </div>
    </div> 

  )
}

export default FacilityListing
