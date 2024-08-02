import React from 'react'

import styles from '../../Styles/listings.module.css'
import ProviderDoctorListings from '../../Components/Listings/ProviderDoctorListing'


function DoctorsList() {
  return (
   <div> 
      <div>
        <div className={styles.HeaderImage}>
       </div> 
      </div>

      <div className={styles.listingsContainer}>
          <div>
            <ProviderDoctorListings />
          </div>  
      </div>
    </div> 
  )
}

export default DoctorsList
