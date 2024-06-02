import React from 'react'
import ProvidersCard from '../Components/ProvidersCard'
import styles from '../Styles/listings.module.css'

function DoctorsList() {
  return (
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
  )
}

export default DoctorsList
