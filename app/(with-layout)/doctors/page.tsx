import React from 'react'

import styles from '../../Styles/listings.module.css'
import ProvidersCard from '../../Components/ProvidersCard'

function DoctorsList() {
  return (
   <div> 
      <div>
        <div className={styles.HeaderImage}>
       </div> 
      </div>

      <div className={styles.listingsContainer}>
          <div>
            <ProvidersCard />
          </div>
          <div>
            <div>
              <h2>
                Side bar
              </h2>
            </div>
          </div>  
      </div>
    </div> 
  )
}

export default DoctorsList
